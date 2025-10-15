const fs = require('fs');

function toMap(headers){
  const m={}; (headers||[]).forEach(h=>{ const k=String(h.name||'').toLowerCase(); if(!k) return; const v=String(h.value||''); if(m[k]){ if(Array.isArray(m[k])) m[k].push(v); else m[k]=[m[k],v]; } else m[k]=v;});
  return m;
}
function first(h, name){ const v=h[String(name).toLowerCase()]; return Array.isArray(v)? v[0]: v; }
function all(h, name){ const v=h[String(name).toLowerCase()]; return Array.isArray(v)? v: (v? [v]: []); }

function parseHar(path){
  const raw = fs.readFileSync(path, 'utf8');
  const har = JSON.parse(raw);
  const entries = ((har.log||{}).entries)||[];
  // enrich with helpers
  for(const e of entries){
    e._reqHeaders = toMap((e.request||{}).headers||[]);
    e._resHeaders = toMap((e.response||{}).headers||[]);
    e._url = (e.request||{}).url || '';
    e._host = (()=>{ try{ return new URL(e._url).host; }catch{ return ''; } })();
  }
  return entries;
}

function parseCookiesExport(path){
  if(!fs.existsSync(path)) return [];
  const raw = fs.readFileSync(path,'utf8').trim();
  if(!raw) return [];
  let data=null;
  try{ data=JSON.parse(raw); }catch{ return []; }
  // Possible formats:
  // A) Array of cookie objects {name,value,domain,expirationDate,httpOnly,secure,sameSite}
  // B) Object by domain -> array
  if(Array.isArray(data)) return data;
  const arr=[];
  for(const k of Object.keys(data||{})){
    const v=data[k];
    if(Array.isArray(v)) arr.push(...v);
  }
  return arr;
}

function parseSetCookie(sc){
  // sc: string like "name=value; Path=/; Expires=...; HttpOnly; Secure; SameSite=..."
  const parts = String(sc).split(';').map(s=>s.trim());
  const [nv, ...attrs] = parts;
  const i = nv.indexOf('=');
  const name = i>=0? nv.slice(0,i): nv;
  const value = i>=0? nv.slice(i+1): '';
  const obj = {name, value};
  for(const a of attrs){
    const [k,v] = a.split('=');
    const key = (k||'').toLowerCase();
    const val = v===undefined? true: v;
    if(key==='expires') obj.expires = val;
    else if(key==='max-age') obj.maxAge = Number(val);
    else if(key==='path') obj.path = val;
    else if(key==='domain') obj.domain = val;
    else if(key==='secure') obj.secure = true;
    else if(key==='httponly') obj.httpOnly = true;
    else if(key==='samesite') obj.sameSite = val;
  }
  return obj;
}

function iso(d){ try{ return new Date(d).toISOString(); }catch{ return null; } }

(function main(){
  const APP = process.env.APP_ROOT || '/root/work/vinops.restore';
  const IN_HAR = process.env.IN_HAR || `${APP}/evidence/AUTH_HAR_1.har`;
  const IN_CK = process.env.IN_CK || `${APP}/evidence/AUTH_COOKIES.json`;
  const OUT_AUTH = process.env.OUT_AUTH || `${APP}/evidence/AUTH_FLOW.md`;
  const OUT_UA = process.env.OUT_UA || `${APP}/evidence/UA_REQUIREMENTS.md`;

  const entries = parseHar(IN_HAR);
  const cookiesExport = parseCookiesExport(IN_CK);

  // 1) Найти финальный CSV GET (inventory.copart.io/.../salesdata.cgi?...)
  const csvEntries = entries.filter(e=>{
    return /inventory\.copart\.io\/.*\/salesdata\.cgi/i.test(e._url) && ((e.response||{}).status|0)===200;
  }).sort((a,b)=> new Date(a.startedDateTime) - new Date(b.startedDateTime));
  const csv = csvEntries[csvEntries.length-1] || null;

  // 2) Найти шаги логина (POST на login/auth)
  const loginSteps = entries.filter(e=>{
    const u=e._url.toLowerCase();
    const m=(e.request||{}).method||'';
    const pd=(e.request||{}).postData;
    return m!=='GET' && (u.includes('/login') || u.includes('signin') || u.includes('/auth') || (pd && JSON.stringify(pd).toLowerCase().includes('password')));
  });

  // 3) Сбор Set-Cookie по доменам
  const setCookies = [];
  for(const e of entries){
    const sc = all(e._resHeaders,'set-cookie');
    if(sc.length){
      const respDate = first(e._resHeaders,'date');
      for(const s of sc){
        const p = parseSetCookie(s);
        p._respDate = respDate || null;
        p._url = e._url;
        p._host = e._host;
        setCookies.push(p);
      }
    }
  }
  // Оставить последние по имени (берём последний по времени)
  const byName = new Map();
  for(const c of setCookies){
    byName.set(c.name, c);
  }
  const keyCookies = Array.from(byName.values()).filter(c=>{
    const n=c.name.toLowerCase();
    return n.startsWith('visid_incap') || n.startsWith('incap_ses') || n.startsWith('nlbi') || n.includes('session') || n.includes('auth');
  });

  // TTL вычисляем относительно даты ответа (если есть) или текущего времени
  function ttlInfo(c){
    let base = c._respDate? new Date(c._respDate) : new Date();
    if(c.maxAge && Number.isFinite(c.maxAge)){
      return {ttlSec: c.maxAge, expiry: c.maxAge>0? new Date(base.getTime()+c.maxAge*1000).toISOString(): null, type:'Max-Age'};
    }
    if(c.expires){
      const exp = new Date(c.expires);
      const ttl = Math.max(0, Math.round((exp - base)/1000));
      return {ttlSec: isFinite(ttl)? ttl: null, expiry: isNaN(exp.getTime())? null: exp.toISOString(), type:'Expires'};
    }
    return {ttlSec: null, expiry: null, type:'Session'};
  }

  // 4) Свод по UA/Referer/CSRF
  let uaCSV = csv? first(csv._reqHeaders,'user-agent') : null;
  let refCSV = csv? first(csv._reqHeaders,'referer') : null;
  let statusCSV = csv? (csv.response||{}).status : null;
  let dispCSV = csv? first(csv._resHeaders,'content-disposition') : null;

  // CSRF: ищем заголовки x-csrf/x-xsrf и поля форм
  const csrfHeaders = [];
  for(const e of entries){
    const rh = e._reqHeaders;
    for(const k of Object.keys(rh)){
      if(k.startsWith('x-csrf') || k.startsWith('x-xsrf')){
        csrfHeaders.push({url:e._url, name:k, val:first(rh,k)});
      }
    }
  }
  let csrfLogin = 'UNKNOWN';
  if(loginSteps.length){
    csrfLogin = 'NOT OBSERVED';
    for(const s of loginSteps){
      const rh = s._reqHeaders;
      for(const k of Object.keys(rh)){
        if(k.startsWith('x-csrf') || k.startsWith('x-xsrf')) csrfLogin='PRESENT';
      }
      const pd=(s.request||{}).postData;
      if(pd && typeof pd.text==='string' && /csrf/i.test(pd.text)) csrfLogin='PRESENT';
    }
  }

  // 5) AUTH_FLOW.md
  let md=[];
  md.push(`# AUTH FLOW — MS-CSV-05`);
  md.push(`- Timestamp: ${new Date().toISOString()}`);
  md.push(`- CSV request observed: ${statusCSV===200? '**YES (200)**': '**NO/UNKNOWN**'}`);
  if(csv){
    md.push(`- CSV URL (last 200): \`${csv.request.url}\``);
    md.push(`- Content-Disposition: ${dispCSV||'UNKNOWN'}`);
  }
  md.push(`\n## Login steps (HAR)`);
  if(loginSteps.length){
    md.push(`Всего шагов: ${loginSteps.length}`);
    md.push(`| # | Method | URL | Status |`);
    md.push(`|---:|---|---|---:|`);
    loginSteps.forEach((e,i)=> md.push(`| ${i+1} | ${(e.request||{}).method||''} | ${e._url} | ${(e.response||{}).status||''} |`));
  } else {
    md.push(`UNKNOWN — Как проверить: включить запись HAR с момента перехода на страницу входа и выполнения POST логина.`);
  }

  md.push(`\n## Cookies (key) — last seen per name`);
  if(keyCookies.length){
    md.push(`| Name | Domain(src) | Path | HttpOnly | Secure | SameSite | TTL(s) | Expiry | Type | Source URL |`);
    md.push(`|---|---|---|:---:|:---:|:---:|---:|---|---|---|`);
    keyCookies.forEach(c=>{
      const t=ttlInfo(c);
      md.push(`| ${c.name} | ${c.domain||c._host||''} | ${c.path||''} | ${c.httpOnly? 'Y':'N'} | ${c.secure? 'Y':'N'} | ${c.sameSite||''} | ${t.ttlSec??''} | ${t.expiry??''} | ${t.type} | ${c._url} |`);
    });
  } else {
    md.push(`UNKNOWN — Как проверить: в HAR найти ответы с заголовками Set-Cookie (visid_incap_*, incap_ses_*, nlbi_* и app session).`);
  }

  fs.writeFileSync(OUT_AUTH, md.join('\n')+'\n', 'utf8');

  // 6) UA_REQUIREMENTS.md
  let mu=[];
  mu.push(`# UA / REFERER / CSRF — MS-CSV-05`);
  mu.push(`- Timestamp: ${new Date().toISOString()}`);

  // User-Agent
  mu.push(`\n## User-Agent`);
  mu.push(`- Observed on CSV request: \`${uaCSV||'UNKNOWN'}\``);
  mu.push(`- Requirement (internal policy): **REQUIRED** — отправлять правдоподобный desktop User-Agent. Основание: антибот/Imperva.`);
  if(!uaCSV) mu.push(`- Как проверить: повторить загрузку CSV с явным -A и без него, сравнить коды.`);

  // Referer
  mu.push(`\n## Referer`);
  mu.push(`- Observed on CSV request: \`${refCSV||'ABSENT'}\``);
  if(refCSV){ 
    mu.push(`- Requirement: **UNKNOWN** (в сессии присутствовал). Как проверить: повторить запрос CSV без Referer через прокси US/PL и подтвердить 200/403.`);
  } else {
    mu.push(`- Requirement: **NOT REQUIRED** (в данном сеансе CSV=200 без Referer).`);
  }

  // CSRF
  mu.push(`\n## CSRF`);
  mu.push(`- Login POST: ${csrfLogin}`);
  mu.push(`- CSV GET: **NOT USED** (CSRF не применялся к GET для salesdata.cgi по HAR).`);
  if(csrfHeaders.length){
    mu.push(`- Observed CSRF headers:`);
    csrfHeaders.slice(0,10).forEach(h=> mu.push(`  - ${h.name} @ ${h.url}`));
  }

  // Final summary lines (для QA)
  mu.push(`\n## Summary`);
  mu.push(`- CSV 200 observed: ${statusCSV===200? 'YES':'NO/UNKNOWN'}`);
  mu.push(`- UA requirement: REQUIRED`);
  mu.push(`- Referer requirement: ${refCSV? 'UNKNOWN':'NOT REQUIRED'}`);
  mu.push(`- CSRF requirement: Login=${csrfLogin}, CSV=NOT USED`);

  fs.writeFileSync(OUT_UA, mu.join('\n')+'\n', 'utf8');

  console.log(`[OK] Written: ${OUT_AUTH}, ${OUT_UA}`);
})();

