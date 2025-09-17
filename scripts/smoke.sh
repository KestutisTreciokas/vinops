#!/usr/bin/env bash
set -euo pipefail

DOMAIN="vinops.online"
HOSTIP="127.0.0.1"

echo "== HTTP -> HTTPS redirect (308) =="
curl -sS -D- -o /dev/null -H "Host: ${DOMAIN}" "http://127.0.0.1/en" | sed -n '1,20p'

echo
echo "== HTTPS /en through Caddy (expect 200) =="
curl -k --resolve "${DOMAIN}:443:${HOSTIP}" -sS -D- -o /dev/null "https://${DOMAIN}/en" | sed -n '1,20p'

echo
echo "== HTTPS /sitemap.xml (expect 200) =="
curl -k --resolve "${DOMAIN}:443:${HOSTIP}" -sS -D- -o /dev/null "https://${DOMAIN}/sitemap.xml" | sed -n '1,20p'

echo
echo "== Upstream caddy -> web:3000 (expect 200) =="
docker compose -f docker-compose.prod.yml -p vinopsrestore exec -T caddy wget -S -qO- http://web:3000/en 2>&1 | sed -n '1,20p' || true

echo
echo "== In-container web port 3000 listener =="
docker compose -f docker-compose.prod.yml -p vinopsrestore exec -T web sh -lc 'netstat -ltnp 2>/dev/null | grep :3000 || ss -ltnp 2>/dev/null | grep :3000 || true'
