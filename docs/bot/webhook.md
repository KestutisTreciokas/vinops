# Webhook — vinops-tg-bot (MS-S2-01)

- Внутренний endpoint: `http://127.0.0.1:8091/tg-webhook`
- Порт/хост: `127.0.0.1:8091`
- Путь: `/tg-webhook` (D-012).
- Внешняя публикация — через reverse proxy (Caddy/Nginx) на утверждённом домене (зафиксировать в Decision Log).

## Caddy (пример)
```caddyfile
tg.vinops.online {
  encode zstd gzip
  reverse_proxy 127.0.0.1:8091
}
```

## Nginx (пример)
```nginx
server {
  listen 443 ssl http2;
  server_name tg.vinops.online;

  location / {
    proxy_pass http://127.0.0.1:8091;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto https;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

## Установка вебхука в Telegram
```bash
curl -s "https://api.telegram.org/bot${BOT_TOKEN}/setWebhook" \
  -d "url=https://tg.vinops.online/tg-webhook"
```

## Режимы запуска
- `WEBHOOK_ONLY=1` — только локальный HTTP (для QA имитацией POST), без вызова `setWebhook`, без polling.
- `WEBHOOK_PUBLIC_URL=https://tg.vinops.online` — включит `setWebhook` и примет апдейты от Telegram.
- Без переменных — polling.

## Проверка здоровья
`GET /health` → `{"ok": true, "ts": ISO8601}`.

## Примечание: SSL / node-postgres
В приватном сегменте (192.168.0.0/24) БД использует self-signed сертификат.  
`node-postgres` по умолчанию проверяет CA и отклоняет подключение. Для S2 используем:
- DSN с `?sslmode=require` **и** пул с `ssl: { rejectUnauthorized: false }` (реализовано в `bot/src/app.js`);
- дополнительный флаг окружения `PG_SSL_INSECURE=1` — на случай смены DSN (дублирует поведение).

Для прод-валидации с реальным CA — завести `PGSSLROOTCERT` и убрать `PG_SSL_INSECURE`.
