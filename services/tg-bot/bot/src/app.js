// vinops-tg-bot — S2-01: grammY bot with webhook & DB audit (JS, SSL robust)
process.env.TZ = process.env.TZ || 'Europe/Warsaw';

const http = require('http');
const { Bot, webhookCallback } = require('grammy');
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

// SSL policy: insecure when DSN has sslmode=require OR env PG_SSL_INSECURE=1
const needRequire = /[?&]sslmode=require\b/i.test(String(POSTGRES_DSN));
const envInsecure = process.env.PG_SSL_INSECURE === '1';
const INSECURE_SSL = needRequire || envInsecure;

// Global override to bypass self-signed chain (scoped to this process)
if (INSECURE_SSL) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  console.log('[ssl] NODE_TLS_REJECT_UNAUTHORIZED=0 (INSECURE_SSL=true)');
}

function makePool(insecure) {
  const cfg = { connectionString: POSTGRES_DSN };
  if (insecure) cfg.ssl = { rejectUnauthorized: false };
  return new Pool(cfg);
}
let pool = makePool(INSECURE_SSL);

// DB audit
async function auditLog(tgUserId, chatId, event, data) {
  try {
    await pool.query('SELECT tg_bot.audit_log($1,$2,$3,$4)', [
      tgUserId || null,
      chatId || null,
      event,
      data ? JSON.stringify(data) : null,
    ]);
    console.log('[audit_log ok]', event, 'chat=', chatId);
  } catch (e) {
    console.error('[audit_log error]', e.message);
  }
}

// Bot
const bot = new Bot(BOT_TOKEN || 'dummy-token');

bot.command('start', async (ctx) => {
  const uid = ctx.from?.id || null;
  const cid = ctx.chat?.id || null;
  await auditLog(uid, cid, 'BOT_START', {});
  if (DRY_RUN) {
    console.log(`[DRY_RUN] /start handled for chat=${cid}, user=${uid}`);
    return;
  }
  try { await ctx.reply('Vinops bot is alive. /help'); } catch (e) { console.error('[reply error]', e.message); }
});

bot.on('message:text', async (ctx) => {
  if (DRY_RUN) return;
  try { await ctx.reply('Got it. Use /start.'); } catch (_) {}
});

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
    if (PUBLIC) {
      const url = PUBLIC.replace(/\/+$/,'') + WEBHOOK_PATH;
      await bot.api.setWebhook(url);
      console.log('[mode] WEBHOOK via', url);
      return;
    }
    console.log('[mode] POLLING');
    await bot.start({ allowed_updates: ['message'] });
  } catch (e) {
    console.error('[startup error]', e.message);
  }
})();

process.on('SIGINT', () => { server.close(()=>process.exit(0)); });
process.on('SIGTERM', () => { server.close(()=>process.exit(0)); });
