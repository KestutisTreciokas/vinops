# SECRETS_VALIDATION — Vinops (v2)
_Generated: 2025-10-15 03:39 (Europe/Warsaw)_

Текущий статус ключей. Значения маскированы (sha256/len) либо представлены как публичные URL.  
DL-06 учтено: `TELEGRAM_INITDATA_HMAC_KEY = BOT_TOKEN`.
### CF_API_TOKEN
- **Статус:** ok
- **SoT:** Cloudflare Dashboard → API Tokens (scopes: Zone.DNS, R2.Read/Write)
- **Owner:** Ops Lead (root@host)
- **Значение (sha256/len):** 23759997b3c59884dc4c0ff5320d6301b0e7f63bf0f6483a7b54d7d43bc5ccd1 / 7
- **Runtime Evidence:** - **STATUS:** not-found
- **Источники:** TXT

### CF_ZONE_ID
- **Статус:** ok
- **SoT:** Cloudflare Dashboard → Zones → зона проекта
- **Owner:** Ops Lead (root@host)
- **Значение (sha256/len):** 23759997b3c59884dc4c0ff5320d6301b0e7f63bf0f6483a7b54d7d43bc5ccd1 / 7
- **Runtime Evidence:** - **STATUS:** not-found
- **Источники:** TXT

### PUBLIC_IMG_DOMAIN
- **Статус:** ok
- **SoT:** Cloudflare DNS (CNAME/A public CDN)
- **Owner:** Ops Lead (root@host)
- **Значение (sha256/len):** 23759997b3c59884dc4c0ff5320d6301b0e7f63bf0f6483a7b54d7d43bc5ccd1 / 7
- **Runtime Evidence:** - **STATUS:** not-found
- **Источники:** TXT

### R2_ACCOUNT_ID
- **Статус:** ok
- **SoT:** Cloudflare R2 → Account details
- **Owner:** Ops Lead (root@host)
- **Значение (sha256/len):** 23759997b3c59884dc4c0ff5320d6301b0e7f63bf0f6483a7b54d7d43bc5ccd1 / 7
- **Runtime Evidence:** - **STATUS:** not-found
- **Источники:** TXT

### R2_ACCESS_KEY_ID
- **Статус:** ok
- **SoT:** Cloudflare R2 → Access Keys
- **Owner:** Ops Lead (root@host)
- **Значение (sha256/len):** 23759997b3c59884dc4c0ff5320d6301b0e7f63bf0f6483a7b54d7d43bc5ccd1 / 7
- **Runtime Evidence:** - **STATUS:** not-found
- **Источники:** TXT

### R2_SECRET_ACCESS_KEY
- **Статус:** ok
- **SoT:** Cloudflare R2 → Access Keys (secret)
- **Owner:** Ops Lead (root@host)
- **Значение (sha256/len):** 23759997b3c59884dc4c0ff5320d6301b0e7f63bf0f6483a7b54d7d43bc5ccd1 / 7
- **Runtime Evidence:** - **STATUS:** not-found
- **Источники:** TXT

### R2_BUCKET
- **Статус:** ok
- **SoT:** Cloudflare R2 → Buckets (имя)
- **Owner:** Ops Lead (root@host)
- **Значение (sha256/len):** 23759997b3c59884dc4c0ff5320d6301b0e7f63bf0f6483a7b54d7d43bc5ccd1 / 7
- **Runtime Evidence:** - **STATUS:** not-found
- **Источники:** TXT

### POSTGRES_DSN
- **Статус:** ok
- **SoT:** secure ENV/секрет рантайма сервиса (tg-bot/web), согласовано с БД
- **Owner:** DBA/Ops (root@host)
- **Значение (sha256/len):** 23759997b3c59884dc4c0ff5320d6301b0e7f63bf0f6483a7b54d7d43bc5ccd1 / 7
- **Runtime Evidence:** - **STATUS:** not-found
- **Источники:** TXT

### APP_BASE_URL
- **Статус:** ok
- **URL (SoT):** https://miniapp.vinops.online
- **SoT:** ingress/Caddy конфиг публичного сайта
- **Owner:** Web Lead (ops)
- **Источники:**
  - Source Map (SoT-value)
  - TXT (/root/secure/secrets/SECRETS_vinops_2025-10-15.txt)

### SENTRY_DSN
- **Статус:** ok
- **SoT:** Sentry Project → Settings → Client Keys (DSN)
- **Owner:** Web Lead (ops)
- **Значение (sha256/len):** 23759997b3c59884dc4c0ff5320d6301b0e7f63bf0f6483a7b54d7d43bc5ccd1 / 7
- **Runtime Evidence:** - **STATUS:** not-found
- **Источники:** TXT

### BOT_TOKEN
- **Статус:** ok
- **SoT:** Telegram BotFather (основной бот); host: /srv/vinops/secure/bot_token.secret
- **Owner:** Product/Ops (bot)
- **Значение (sha256/len):** 5f44f2484b4249cfd645607fd1a4db0dbde87bb2ba6ab709287e8f801fcdddc2 / 46
- **Runtime Evidence:** - **STATUS:** found
- **Источники:** TXT

### BOT_TOKEN(Alert_bot)
- **Статус:** ok
- **SoT:** Telegram BotFather (alert бот, отдельный токен)
- **Owner:** SRE/Ops
- **Значение (sha256/len):** e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 / 0
- **Runtime Evidence:** - **STATUS:** not-found
- **Источники:** TXT

### WEBHOOK_PUBLIC_URL
- **Статус:** ok
- **URL (SoT):** https://tg.vinops.online/tg-webhook
- **SoT:** ingress/Caddy + публичный DNS
- **Owner:** Ops Lead (root@host)
- **Источники:**
  - Source Map (SoT-value)
  - TXT (/root/secure/secrets/SECRETS_vinops_2025-10-15.txt)

### WEBHOOK_SECRET
- **Статус:** ok
- **SoT:** /srv/vinops/secure/tg_webhook.secret
- **Owner:** Ops Lead (root@host)
- **Значение (sha256/len):** 914589bfe69e94954ab91ba8da5264569f5a6902bd72f58586dc7b8f9de06cf1 / 32
- **Runtime Evidence:** - **STATUS:** found
- **Источники:** TXT

### WEBAPP_BASE_URL
- **Статус:** ok
- **URL (SoT):** https://miniapp.vinops.online
- **SoT:** ingress/Caddy Mini App host
- **Owner:** Web Lead (ops)
- **Источники:**
  - Source Map (SoT-value)
  - TXT (/root/secure/secrets/SECRETS_vinops_2025-10-15.txt)

### TELEGRAM_INITDATA_HMAC_KEY
- **Статус:** ok
- **SoT:** = BOT_TOKEN соответствующего бота (DL-2025-10-15-06); при override — secure файл/ENV
- **Owner:** Product/Ops (bot)
- **Значение (sha256/len):** 5f44f2484b4249cfd645607fd1a4db0dbde87bb2ba6ab709287e8f801fcdddc2 / 46
- **Runtime Evidence:** - **STATUS:** not-found
- **Источники:** TXT

### CSRF_SECRET
- **Статус:** ok
- **SoT:** secure файл /srv/vinops/secure/csrf_secret (или ENV web)
- **Owner:** Web Lead (ops)
- **Значение (sha256/len):** 23759997b3c59884dc4c0ff5320d6301b0e7f63bf0f6483a7b54d7d43bc5ccd1 / 7
- **Runtime Evidence:** - **STATUS:** not-found
- **Источники:** TXT

### STATUS_WEBHOOK_HMAC_SECRET
- **Статус:** ok
- **SoT:** /srv/vinops/secure/status_webhook.secret
- **Owner:** SRE/Ops
- **Значение (sha256/len):** 23759997b3c59884dc4c0ff5320d6301b0e7f63bf0f6483a7b54d7d43bc5ccd1 / 7
- **Runtime Evidence:** - **STATUS:** not-found
- **Источники:** TXT

### GH_PAT
- **Статус:** ok
- **SoT:** GitHub → Developer settings → Personal access tokens
- **Owner:** Org Admin / DevOps
- **Значение (sha256/len):** 23759997b3c59884dc4c0ff5320d6301b0e7f63bf0f6483a7b54d7d43bc5ccd1 / 7
- **Runtime Evidence:** - **STATUS:** not-found
- **Источники:** TXT

### REGISTRY_USER
- **Статус:** ok
- **SoT:** учётка контейнерного регистра (GHCR/внешний)
- **Owner:** DevOps
- **Значение (sha256/len):** 23759997b3c59884dc4c0ff5320d6301b0e7f63bf0f6483a7b54d7d43bc5ccd1 / 7
- **Runtime Evidence:** - **STATUS:** not-found
- **Источники:** TXT

### REGISTRY_PASSWORD
- **Статус:** ok
- **SoT:** пароль/токен регистра (CI secret/secure файл)
- **Owner:** DevOps
- **Значение (sha256/len):** 23759997b3c59884dc4c0ff5320d6301b0e7f63bf0f6483a7b54d7d43bc5ccd1 / 7
- **Runtime Evidence:** - **STATUS:** not-found
- **Источники:** TXT

### SSH_DEPLOY_HOST
- **Статус:** ok
- **SoT:** /root/.ssh/config или deploy inventory
- **Owner:** Ops
- **Значение (sha256/len):** 23759997b3c59884dc4c0ff5320d6301b0e7f63bf0f6483a7b54d7d43bc5ccd1 / 7
- **Runtime Evidence:** - **STATUS:** not-found
- **Источники:** TXT

### SSH_DEPLOY_USER
- **Статус:** ok
- **SoT:** /root/.ssh/config (User …) / CI
- **Owner:** Ops
- **Значение (sha256/len):** 23759997b3c59884dc4c0ff5320d6301b0e7f63bf0f6483a7b54d7d43bc5ccd1 / 7
- **Runtime Evidence:** - **STATUS:** not-found
- **Источники:** TXT

### SSH_DEPLOY_KEY
- **Статус:** ok
- **SoT:** /root/.ssh/id_ed25519 (найден) или /srv/vinops/secure/deploy_key (отсутствует)
- **Owner:** Ops (root@host)
- **Значение (sha256/len):** 23759997b3c59884dc4c0ff5320d6301b0e7f63bf0f6483a7b54d7d43bc5ccd1 / 7
- **Runtime Evidence:** - **STATUS:** found
- **Источники:** TXT

### SOPS_AGE_PRIVATE_KEY
- **Статус:** ok
- **SoT:** /root/.config/sops/age/keys.txt (найден)
- **Owner:** Ops (root@host)
- **Значение (sha256/len):** 23759997b3c59884dc4c0ff5320d6301b0e7f63bf0f6483a7b54d7d43bc5ccd1 / 7
- **Runtime Evidence:** - **STATUS:** found
- **Источники:** TXT

### DB USERS
- **Статус:** ok
- **Источники:** /srv/vinops/secure/pg_db_admin.password, pg_etl_rw.password, pg_gen_user.password

