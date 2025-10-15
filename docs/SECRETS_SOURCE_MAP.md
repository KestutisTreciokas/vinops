# SECRETS SOURCE MAP — v2 (S0Y-01)
_Generated: 2025-10-15 02:50 (Europe/Warsaw)_

Формат секции: **SoT**; **Runtime**; **Owner**; **Consumers**.  
Для URL ключей добавлена **URL (observed)** из ENV/PROC/TXT.

### CF_API_TOKEN
- **SoT:** Cloudflare Dashboard → API Tokens (scopes: Zone.DNS, R2.Read/Write)
- **Runtime:** CI/CD (deploy), backend интеграции с Cloudflare API
- **Owner:** Ops Lead (root@host)
- **Consumers:** infra/deploy, web

### CF_ZONE_ID
- **SoT:** Cloudflare Dashboard → Zones → зона проекта
- **Runtime:** CDN/DNS интеграции; CI sanity checks
- **Owner:** Ops Lead (root@host)
- **Consumers:** infra, web

### PUBLIC_IMG_DOMAIN
- **SoT:** Cloudflare DNS (CNAME/A public CDN)
- **Runtime:** web frontend, tg-bot ссылки
- **Owner:** Ops Lead (root@host)
- **Consumers:** web, tg-bot

### R2_ACCOUNT_ID
- **SoT:** Cloudflare R2 → Account details
- **Runtime:** web/ETL доступ к объектам
- **Owner:** Ops Lead (root@host)
- **Consumers:** web, ETL

### R2_ACCESS_KEY_ID
- **SoT:** Cloudflare R2 → Access Keys
- **Runtime:** web/ETL (ENV/secret-файл)
- **Owner:** Ops Lead (root@host)
- **Consumers:** web, ETL

### R2_SECRET_ACCESS_KEY
- **SoT:** Cloudflare R2 → Access Keys (secret)
- **Runtime:** web/ETL (ENV/secret-файл)
- **Owner:** Ops Lead (root@host)
- **Consumers:** web, ETL

### R2_BUCKET
- **SoT:** Cloudflare R2 → Buckets (имя)
- **Runtime:** web конфиг хранилища
- **Owner:** Ops Lead (root@host)
- **Consumers:** web, ETL

### POSTGRES_DSN
- **SoT:** secure ENV/секрет рантайма сервиса (tg-bot/web), согласовано с БД
- **Runtime:** tg-bot, web (pool подключений)
- **Owner:** DBA/Ops (root@host)
- **Consumers:** tg-bot, web

### APP_BASE_URL
- **SoT:** ingress/Caddy конфиг публичного сайта
- **Runtime:** web SSR; редиректы/линки
- **Owner:** Web Lead (ops)
- **Consumers:** web, tg-bot
- **URL (observed):** https://miniapp.vinops.online

### SENTRY_DSN
- **SoT:** Sentry Project → Settings → Client Keys (DSN)
- **Runtime:** web, tg-bot error reporting
- **Owner:** Web Lead (ops)
- **Consumers:** web, tg-bot

### BOT_TOKEN
- **SoT:** Telegram BotFather (основной бот); host: /srv/vinops/secure/bot_token.secret
- **Runtime:** tg-bot.service (BOT_TOKEN_FILE)
- **Owner:** Product/Ops (bot)
- **Consumers:** tg-bot

### BOT_TOKEN(Alert_bot)
- **SoT:** Telegram BotFather (alert бот, отдельный токен)
- **Runtime:** alerting/cron (если используется)
- **Owner:** SRE/Ops
- **Consumers:** alerts/monitoring

### WEBHOOK_PUBLIC_URL
- **SoT:** ingress/Caddy + публичный DNS
- **Runtime:** tg-bot вебхук (ENVFILE /proc)
- **Owner:** Ops Lead (root@host)
- **Consumers:** Telegram→tg-bot
- **URL (observed):** https://tg.vinops.online/tg-webhook

### WEBHOOK_SECRET
- **SoT:** /srv/vinops/secure/tg_webhook.secret
- **Runtime:** tg-bot.service (SECRET_PATH)
- **Owner:** Ops Lead (root@host)
- **Consumers:** tg-bot

### WEBAPP_BASE_URL
- **SoT:** ingress/Caddy Mini App host
- **Runtime:** tg-bot (линки), Mini App
- **Owner:** Web Lead (ops)
- **Consumers:** tg-bot, mini-app
- **URL (observed):** https://miniapp.vinops.online

### TELEGRAM_INITDATA_HMAC_KEY
- **SoT:** = BOT_TOKEN соответствующего бота (DL-2025-10-15-06); при override — secure файл/ENV
- **Runtime:** Mini App initData verify
- **Owner:** Product/Ops (bot)
- **Consumers:** web/mini-app

### CSRF_SECRET
- **SoT:** secure файл /srv/vinops/secure/csrf_secret (или ENV web)
- **Runtime:** web SSR
- **Owner:** Web Lead (ops)
- **Consumers:** web

### STATUS_WEBHOOK_HMAC_SECRET
- **SoT:** /srv/vinops/secure/status_webhook.secret
- **Runtime:** status hooks
- **Owner:** SRE/Ops
- **Consumers:** status/ops

### GH_PAT
- **SoT:** GitHub → Developer settings → Personal access tokens
- **Runtime:** CI/CD, GH API, GHCR login
- **Owner:** Org Admin / DevOps
- **Consumers:** CI, deploy

### REGISTRY_USER
- **SoT:** учётка контейнерного регистра (GHCR/внешний)
- **Runtime:** docker login (host/CI)
- **Owner:** DevOps
- **Consumers:** CI, deploy

### REGISTRY_PASSWORD
- **SoT:** пароль/токен регистра (CI secret/secure файл)
- **Runtime:** docker login
- **Owner:** DevOps
- **Consumers:** CI, deploy

### SSH_DEPLOY_HOST
- **SoT:** /root/.ssh/config или deploy inventory
- **Runtime:** деплой скрипты/CI
- **Owner:** Ops
- **Consumers:** deploy

### SSH_DEPLOY_USER
- **SoT:** /root/.ssh/config (User …) / CI
- **Runtime:** деплой скрипты/CI
- **Owner:** Ops
- **Consumers:** deploy

### SSH_DEPLOY_KEY
- **SoT:** /root/.ssh/id_ed25519 (найден) или /srv/vinops/secure/deploy_key (отсутствует)
- **Runtime:** ssh доступ при деплое
- **Owner:** Ops (root@host)
- **Consumers:** deploy

### SOPS_AGE_PRIVATE_KEY
- **SoT:** /root/.config/sops/age/keys.txt (найден)
- **Runtime:** sops decrypt секретов
- **Owner:** Ops (root@host)
- **Consumers:** ops/ci
