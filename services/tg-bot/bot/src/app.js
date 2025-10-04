// vinops-tg-bot — S2-02: grammY bot with webhook, DB audit, RU/EN i18n & reply menu (UPSERT fix)
process.env.TZ = process.env.TZ || 'Europe/Warsaw';

const fs = require('fs');
const path = require('path');
const http = require('http');
const { Bot, webhookCallback, Keyboard } = require('grammy');
const { Pool } = require('pg');

const PORT = parseInt(process.env.PORT || '8091', 10);
const HOST = '127.0.0.1';
const WEBHOOK_PATH = '/tg-webhook';
const DRY_RUN = process.env.DRY_RUN === '1';
const WEBHOOK_ONLY = process.env.WEBHOOK_ONLY === '1';
const PUBLIC = process.env.WEBHOOK_PUBLIC_URL || '';

const BOT_TOKEN = process.env.BOT_TOKEN;
const POSTGRES_DSN = process.env.POSTGRES_DSN || process.env.POSTGRES_URL || process.env.DATABASE_URL;
if (!POSTGRES_DSN) console.error('[FATAL] POSTGRES_DSN missing in env');
if (!BOT_TOKEN) console.error('[WARN] BOT_TOKEN missing — replies to Telegram will fail');

// SSL policy: only if PG_SSL_INSECURE=1 (explicit on this stand)
const sslInsecure = process.env.PG_SSL_INSECURE === '1';
if (sslInsecure) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  console.log('[ssl] NODE_TLS_REJECT_UNAUTHORIZED=0 (PG_SSL_INSECURE=1)');
}
function makePool(insecure) {
  return new Pool({ connectionString: POSTGRES_DSN, ssl: insecure ? { rejectUnauthorized: false } : undefined });
}
let pool = makePool(sslInsecure);

// --- i18n loader ---
function loadJSON(p){ return JSON.parse(fs.readFileSync(p,'utf8')); }
const LOCALES_DIR = path.resolve(__dirname, '../../locales');
const locales = {
  ru: loadJSON(path.join(LOCALES_DIR,'ru.json')),
  en: loadJSON(path.join(LOCALES_DIR,'en.json')),
};
function tmpl(s, vars){ return String(s).replace(/\{\{(\w+)\}\}/g, (_,k)=> (vars && (k in vars)) ? String(vars[k]) : ''); }
function get(obj, pathStr){ return pathStr.split('.').reduce((a,k)=> (a && Object.prototype.hasOwnProperty.call(a,k) ? a[k] : undefined), obj); }
function tFor(lang){ return (key, vars) => tmpl(get(locales[lang] || locales.ru, key) || key, vars); }

// --- audit wrapper ---
async function auditLog(tgUserId, chatId, event, data){
  try {
    await pool.query('SELECT tg_bot.audit_log($1,$2,$3,$4)', [tgUserId || null, chatId || null, event, data ? JSON.stringify(data) : null]);
    if (DRY_RUN) console.log('[audit_log ok]', event, 'chat=', chatId);
  } catch (e) {
    console.error('[audit_log error]', e.message);
  }
}

const bot = new Bot(BOT_TOKEN || 'dummy-token');

// --- per-update context: language from DB (default: ru) + t()
bot.use(async (ctx, next) => {
  const uid = ctx.from?.id || null;
  let lang = 'ru';
  try {
    if (uid) {
      const r = await pool.query('SELECT lang FROM tg_bot.users WHERE tg_user_id=$1', [uid]);
      if (r.rows[0]?.lang) lang = r.rows[0].lang;
    }
  } catch (e) { console.error('[lang lookup error]', e.message); }
  ctx.config = { lang, t: tFor(lang) };
  await next();
});

// --- helpers: reply menu from i18n ---
function buildReplyMenu(ctx){
  const t = ctx.config.t;
  const k = new Keyboard()
    .text(t('menu.delete_car')).text(t('menu.contacts')).row()
    .text(t('menu.lang'));
  return k.resized();
}

// /start
bot.command('start', async (ctx) => {
  const uid = ctx.from?.id || null;
  const cid = ctx.chat?.id || null;
  await auditLog(uid, cid, 'BOT_START', {});
  const t = ctx.config.t;
  const msg = t('start.welcome');
  const kb = buildReplyMenu(ctx);
  if (DRY_RUN) {
    console.log('[reply text]', msg);
    console.log('[reply keyboard]', JSON.stringify(kb.keyboard));
    return;
  }
  try { await ctx.reply(msg, { reply_markup: kb }); } catch (e) { console.error('[reply error]', e.message); }
});

// /lang ru|en — UPSERT: гарантированная фиксация языка в tg_bot.users
bot.command('lang', async (ctx) => {
  const uid = ctx.from?.id || null;
  const cid = ctx.chat?.id || null;
  const parts = (ctx.message?.text || '').trim().split(/\s+/);
  const target = (parts[1] || '').toLowerCase();
  if (!['ru','en'].includes(target)) {
    const txt = ctx.config.t('lang.usage');
    if (DRY_RUN) { console.log('[reply text]', txt); return; }
    try { await ctx.reply(txt); } catch (_) {}
    return;
  }
  try {
    const ins = await pool.query(
      "INSERT INTO tg_bot.users (tg_user_id, username, lang) VALUES ($1,$2,$3) \
       ON CONFLICT (tg_user_id) DO UPDATE SET lang=EXCLUDED.lang, username=COALESCE(EXCLUDED.username, tg_bot.users.username), updated_at=now()",
      [uid, ctx.from?.username || null, target]
    );
    if (DRY_RUN) console.log('[lang upsert]', 'uid=', uid, 'cmdTag=', ins.command, 'rowCount=', ins.rowCount);
    const check = await pool.query("SELECT lang, to_char(updated_at AT TIME ZONE 'Europe/Warsaw','YYYY-MM-DD HH24:MI:SS') updated_warsaw FROM tg_bot.users WHERE tg_user_id=$1",[uid]);
    console.log('[lang check]', 'uid=', uid, 'db.lang=', check.rows[0]?.lang, 'updated=', check.rows[0]?.updated_warsaw);
    await auditLog(uid, cid, 'LANG_SET', { to: target });
  } catch (e) { console.error('[lang set error]', e.message); }

  // Ответ формируем уже в целевой локали
  const name = locales[target]?.lang?.name?.[target] || target;
  const t = tFor(target);
  const ok = t('lang.set_ok', { lang: name });
  const usage = t('lang.usage');
  if (DRY_RUN) { console.log('[reply text]', ok); console.log('[reply text]', usage); return; }
  try { await ctx.reply(ok); await ctx.reply(usage); } catch (_) {}
});

// echo fallback
bot.on('message:text', async (ctx) => {
  if (DRY_RUN) return;
  try { await ctx.reply(ctx.config.t('generic.use_start')); } catch (_) {}
});

// --- HTTP server & webhook
const cb = webhookCallback(bot, 'http');
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ ok: true, ts: new Date().toISOString() }));
    return;
  }
  if (req.method === 'POST' && req.url === WEBHOOK_PATH) return cb(req, res);
  res.statusCode = 404; res.end('not found');
});

server.listen(PORT, HOST, () => {
  console.log(`[boot] HTTP on http://${HOST}:${PORT} (webhook ${WEBHOOK_PATH})`);
});

(async () => {
  try {
    if (WEBHOOK_ONLY) { console.log('[mode] WEBHOOK_ONLY — no polling, no setWebhook'); return; }
    if (PUBLIC) { const url = PUBLIC.replace(/\/+$/,'') + WEBHOOK_PATH; await bot.api.setWebhook(url); console.log('[mode] WEBHOOK via', url); return; }
    console.log('[mode] POLLING'); await bot.start({ allowed_updates: ['message'] });
  } catch (e) { console.error('[startup error]', e.message); }
})();
process.on('SIGINT', () => { server.close(()=>process.exit(0)); });
process.on('SIGTERM', () => { server.close(()=>process.exit(0)); });
