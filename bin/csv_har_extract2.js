const fs = require('fs');
const { URL } = require('url');

function headersMap(arr){ const m={}; (arr||[]).forEach(h=>{ const k=String(h.name||'').toLowerCase(); if(k) m[k]=String(h.value||''); }); return m; }

const harPath = process.argv[2];
if(!harPath){ console.error("usage: node csv_har_extract2.js <HAR_PATH>"); process.exit(1); }
const har = JSON.parse(fs.readFileSync(harPath,'utf8'));
const entries = (((har||{}).log||{}).entries)||[];
const candidates = [];
for(const e of entries){
  const res = e.response||{};
  if(Number(res.status)!==200) continue;
  const url = (e.request||{}).url || '';
  try{
    const u = new URL(url);
    const hostOk = u.hostname==='inventory.copart.io';
    const pathOk = u.pathname.endsWith('/salesdata.cgi');
    if(hostOk && pathOk){
      candidates.push({t:e.startedDateTime,url,headers:headersMap(res.headers||[])});
    }
  }catch{}
}
let final = null;
if(candidates.length){
  final = candidates[candidates.length-1];
  const u = new URL(final.url);
  final.classification = u.searchParams.has('authKey')
    ? 'tokenized (query-param authKey=…)'
    : (u.search ? 'query (non-authKey)' : 'static (no query)');
}
console.log(JSON.stringify({final, count:candidates.length}, null, 2));
