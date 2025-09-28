#!/usr/bin/env bash
set -e
cd /work/frontend
npm ci
npx next telemetry disable || true
npm run build

# Запуск сервера в фоне (порт 3000 внутри контейнера)
(npm start -p 3000 >/work/docs/merges/PR-84/_tmp/next.log 2>&1 &)
# Ожидание готовности
for i in $(seq 1 60); do
  curl -fsS http://127.0.0.1:3000/healthz >/dev/null 2>&1 && break || sleep 1
done

# Съём страниц
curl -fsS http://127.0.0.1:3000/en                              -o /work/docs/merges/PR-84/html_en.html       || true
curl -fsS http://127.0.0.1:3000/en/vin/WBA3A5C5XDF123456        -o /work/docs/merges/PR-84/html_vin_en.html   || true
curl -fsS http://127.0.0.1:3000/robots.txt                      -o /work/docs/merges/PR-84/robots.txt         || true
curl -fsS http://127.0.0.1:3000/sitemap.xml                     -o /work/docs/merges/PR-84/sitemap.xml        || true

# Останавливаем next
pkill -f "next start" || true
