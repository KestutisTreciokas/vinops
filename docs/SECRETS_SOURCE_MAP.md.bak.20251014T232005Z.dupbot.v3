# SECRETS_SOURCE_MAP — Vinops (Europe/Warsaw)
Updated: 2025-10-15 03:10

Формат записи для каждого ключа:
- **Источники (Repo/Host/Runtime/CI)** — фактические места хранения/упоминания без значений.
- **Потребители (process/service/code)** — кто читает.
- **Приоритет (SoT)** — порядок источников.
- **Статус** — FOUND/UNKNOWN по каждой зоне.
- **Конфликты** — если в разных местах может отличаться.
- **Как проверить** — точные шаги/команды (read-only).

---

## Общие источники рантайма
- **systemd unit:** `/etc/systemd/system/tg-webhook.service`  
  - `EnvironmentFile=-/etc/vinops/tg-webhook.env`  
  - Основной PID: `systemctl show -p MainPID --value tg-webhook.service`
- **Host secure:** `/srv/vinops/secure/` (`bot_token.secret`, `tg_webhook.secret`, `pg_*.password`)
- **Repo:** `/root/work/vinops.restore`
- **CI:** GitHub Actions — `.github/workflows/*`

---

## Cloudflare / CDN

### CF_API_TOKEN
- Источники:
  - Repo: `infra/server/bin/deploy`, `infra/server/bin/cf-dev`, `infra/server/bin/deploy.bak.*`
  - CI: `.github/workflows/deploy.yml` — `secrets.CF_API_TOKEN`
  - Host/Runtime: **UNKNOWN**
- Потребители: deploy-скрипты (`purge_cache`), утилита `cf-dev`, GitHub Actions.
- Приоритет (SoT): CI Secrets → ручной ENV при локальном деплое.
- Статус: FOUND (Repo/CI) / UNKNOWN (Host/Runtime)
- Конфликты: не выявлены.
- Как проверить:
  - Repo: `grep -R -n "CF_API_TOKEN" /root/work/vinops.restore`
  - CI: `grep -n "CF_API_TOKEN" /root/work/vinops.restore/.github/workflows/deploy.yml`
  - Host/Runtime: `grep -R -n "CF_API_TOKEN" /etc /srv/vinops 2>/dev/null || true`

### CF_ZONE_ID
- Источники:
  - Repo: `infra/server/bin/deploy` (использует `CF_ZONE_ID_DEV/CF_ZONE_ID_PROD`), `infra/server/bin/cf-dev`
  - CI: `.github/workflows/deploy.yml` — `secrets.CF_ZONE_ID`
  - Host/Runtime: **UNKNOWN**
- Потребители: deploy-скрипты, GitHub Actions.
- Приоритет: для PROD — `CF_ZONE_ID_PROD`, для DEV — `CF_ZONE_ID_DEV`.
- Статус: FOUND (Repo/CI) / UNKNOWN (Host/Runtime)
- Конфликты: dev/prod значения — ожидаемо.
- Как проверить:
  - `grep -R -n "CF_ZONE_ID" /root/work/vinops.restore`
  - `grep -n "CF_ZONE_ID" /root/work/vinops.restore/.github/workflows/deploy.yml`
  - `grep -R -n "CF_ZONE_ID" /etc 2>/dev/null || true`

### PUBLIC_IMG_DOMAIN
- Источники: **UNKNOWN**
- Потребители: **UNKNOWN**
- Приоритет: n/a
- Статус: UNKNOWN
- Конфликты: н/д
- Как проверить:
  - `grep -R -n "PUBLIC_IMG_DOMAIN" /root/work/vinops.restore`
  - `grep -R -n "PUBLIC_IMG_DOMAIN" /etc /srv/vinops 2>/dev/null || true`

---

## R2 (объектное хранилище)

### R2_ACCOUNT_ID
- Источники: Docs: `docs/SECRETS_SAP.md`; Repo/Host/Runtime: **UNKNOWN**
- Потребители: **UNKNOWN**
- Приоритет: `.env.sops.yaml` (если появится) → Runtime ENV.
- Статус: UNKNOWN
- Конфликты: н/д
- Как проверить:
  - `grep -R -n "R2_ACCOUNT_ID" /root/work/vinops.restore`
  - `grep -R -n "R2_ACCOUNT_ID" /etc /srv/vinops 2>/dev/null || true`

### R2_ACCESS_KEY_ID
- Источники: Docs: `docs/SECRETS_SAP.md`; Repo/Host/Runtime: **UNKNOWN**
- Потребители: **UNKNOWN**
- Приоритет: `.env.sops.yaml` → Runtime ENV.
- Статус: UNKNOWN
- Конфликты: н/д
- Как проверить:
  - `grep -R -n "R2_ACCESS_KEY_ID" /root/work/vinops.restore`
  - `grep -R -n "R2_ACCESS_KEY_ID" /etc /srv/vinops 2>/dev/null || true`

### R2_SECRET_ACCESS_KEY
- Источники: Docs: `docs/SECRETS_SAP.md`; Repo/Host/Runtime: **UNKNOWN**
- Потребители: **UNKNOWN**
- Приоритет: `.env.sops.yaml` → Runtime ENV.
- Статус: UNKNOWN
- Конфликты: н/д
- Как проверить:
  - `grep -R -n "R2_SECRET_ACCESS_KEY" /root/work/vinops.restore`
  - `grep -R -n "R2_SECRET_ACCESS_KEY" /etc /srv/vinops 2>/dev/null || true`

### R2_BUCKET
- Источники: Docs: `docs/SECRETS_SAP.md`; Repo/Host/Runtime: **UNKNOWN**
- Потребители: **UNKNOWN**
- Приоритет: `.env.sops.yaml` → Runtime ENV.
- Статус: UNKNOWN
- Конфликты: н/д
- Как проверить:
  - `grep -R -n "R2_BUCKET" /root/work/vinops.restore`
  - `grep -R -n "R2_BUCKET" /etc /srv/vinops 2>/dev/null || true`

---

## База данных

### POSTGRES_DSN
- Источники:
  - Repo: `services/tg-bot/bot/src/app.js`, `services/tg-bot/bot/src/env.js`
  - Runtime: возможен в `/etc/vinops/tg-webhook.env` (не подтвержден)
  - Host: **UNKNOWN**
- Потребители: сервис `tg-webhook.service` (Node на `:8091`).
- Приоритет: `.env.sops.yaml` (если используется) → `/etc/vinops/tg-webhook.env` → ENV процесса.
- Статус: FOUND (Repo) / UNKNOWN (Runtime/Host)
- Конфликты: не выявлены.
- Как проверить:
  - Repo: `grep -R -n "POSTGRES_DSN" /root/work/vinops.restore/services/tg-bot`
  - Runtime: `grep -n '^POSTGRES_DSN=' /etc/vinops/tg-webhook.env || true`
  - Процесс: `PID="$(systemctl show -p MainPID --value tg-webhook.service)"; tr '\0' '\n' </proc/$PID/environ | grep '^POSTGRES_DSN=' || true`

### DB_USERS (пароли ролей)
- Источники (Host files):  
  - `/srv/vinops/secure/pg_db_admin.password`  
  - `/srv/vinops/secure/pg_etl_rw.password`  
  - `/srv/vinops/secure/pg_gen_user.password`
- Потребители: скрипты БД/ETL (**UNKNOWN** конкретные скрипты).
- Приоритет: Host files.
- Статус: FOUND (Host)
- Конфликты: не выявлены.
- Как проверить: `ls -l /srv/vinops/secure/pg_*.password`

---

## Приложение / Mini App / Telegram

### APP_BASE_URL
- Источники: **UNKNOWN** (в проекте применяется `WEBAPP_BASE_URL`)
- Потребители: **UNKNOWN**
- Приоритет: n/a
- Статус: UNKNOWN
- Конфликты: н/д
- Как проверить:
  - `grep -R -n "APP_BASE_URL" /root/work/vinops.restore`
  - `grep -n '^APP_BASE_URL=' /etc/vinops/tg-webhook.env || true`

### SENTRY_DSN
- Источники:
  - Repo/Compose: `docker-compose.yml` (поля `SENTRY_DSN`, `NEXT_PUBLIC_SENTRY_DSN`)
  - Runtime/Host: по логам — не задан
- Потребители: фронтенд/SSR (опционально).
- Приоритет: `.env.sops.yaml` → Runtime → Compose.
- Статус: FOUND (потребление) / NOT SET (по логам)
- Конфликты: нет.
- Как проверить:
  - `grep -R -n "SENTRY_DSN" /root/work/vinops.restore`
  - `printenv SENTRY_DSN || true`

### BOT_TOKEN
- Источники:
  - Host file: `/srv/vinops/secure/bot_token.secret`
  - Runtime: может прокладываться через `BOT_TOKEN_FILE` (см. unit)
- Потребители: `tg-webhook.service` (Node на `:8091`).
- Приоритет: Host file → Runtime ENV.
- Статус: FOUND (Host)
- Конфликты: нет.
- Как проверить:
  - Host: `test -s /srv/vinops/secure/bot_token.secret && echo OK || echo MISSING`
  - Unit: `systemctl cat tg-webhook.service | grep -n "BOT_TOKEN_FILE"`

### BOT_TOKEN(Alert_bot)
- Источники: **UNKNOWN**
- Потребители: **UNKNOWN** (второй бот/алерты)
- Приоритет: n/a
- Статус: UNKNOWN
- Конфликты: н/д
- Как проверить:
  - `grep -R -n "Alert_bot\|ALERT" /root/work/vinops.restore`
  - `grep -R -n "BOT_TOKEN_ALERT\|ALERT_BOT" /etc /srv/vinops 2>/dev/null || true`

### WEBHOOK_PUBLIC_URL
- Источники:
  - Runtime: `/etc/vinops/tg-webhook.env` (обязателен в PROD — ExecStartPre)
  - Процесс: присутствует в ENV процесса Node (подтверждено)
- Потребители: `tg-webhook.service` — настройка setWebhook.
- Приоритет: Runtime ENV.
- Статус: FOUND (Runtime/Process)
- Конфликты: нет.
- Как проверить:
  - `grep -n '^WEBHOOK_PUBLIC_URL=' /etc/vinops/tg-webhook.env || true`
  - `PID="$(systemctl show -p MainPID --value tg-webhook.service)"; tr '\0' '\n' </proc/$PID/environ | grep '^WEBHOOK_PUBLIC_URL=' || true`

### WEBHOOK_SECRET
- Источники:
  - Host file: `/srv/vinops/secure/tg_webhook.secret`
  - Runtime: может быть как ENV (в коде предусмотрено), но unit передаёт путь через `SECRET_PATH`
- Потребители: `tg-webhook.service` — проверка заголовка/секрета вебхука.
- Приоритет: Host file → Runtime ENV (если используется).
- Статус: FOUND (Host); Runtime как ENV — UNKNOWN
- Конфликты: два механизма (файл vs ENV) — требуется консистентность.
- Как проверить:
  - Host: `test -s /srv/vinops/secure/tg_webhook.secret && echo OK || echo MISSING`
  - Unit: `systemctl cat tg-webhook.service | grep -nE 'SECRET_PATH|WEBHOOK_SECRET'`

### WEBAPP_BASE_URL
- Источники:
  - Repo (зашифр.): `infra/secrets/.env.sops.yaml`
  - Docs/Standards: фикс-домен `https://miniapp.vinops.online`
- Потребители: сервис `tg-bot` (формирование ссылок/редиректов).
- Приоритет: `.env.sops.yaml` → Runtime ENV.
- Статус: FOUND (Repo encrypted/Docs)
- Конфликты: старый бэкап содержал `example.org` — считать устаревшим.
- Как проверить:
  - `grep -R -n "WEBAPP_BASE_URL" /root/work/vinops.restore/infra/secrets /root/work/vinops.restore/docs`
  - `grep -n '^WEBAPP_BASE_URL=' /etc/vinops/tg-webhook.env || true`

### TELEGRAM_INITDATA_HMAC_KEY
- Источники: **UNKNOWN**
- Потребители: проверка `initData` Telegram.
- Приоритет: Runtime ENV.
- Статус: UNKNOWN
- Конфликты: н/д
- Как проверить:
  - `grep -R -n "TELEGRAM_INITDATA_HMAC_KEY" /root/work/vinops.restore`
  - `grep -n '^TELEGRAM_INITDATA_HMAC_KEY=' /etc/vinops/tg-webhook.env || true`

### CSRF_SECRET
- Источники: **UNKNOWN**
- Потребители: backend CSRF (если используется).
- Приоритет: Runtime ENV.
- Статус: UNKNOWN
- Конфликты: н/д
- Как проверить:
  - `grep -R -n "CSRF_SECRET" /root/work/vinops.restore`
  - `grep -n '^CSRF_SECRET=' /etc/vinops/tg-webhook.env || true`

### STATUS_WEBHOOK_HMAC_SECRET
- Источники: **UNKNOWN**
- Потребители: внешние статус-вебхуки (если включены).
- Приоритет: Runtime ENV.
- Статус: UNKNOWN
- Конфликты: н/д
- Как проверить:
  - `grep -R -n "STATUS_WEBHOOK_HMAC_SECRET" /root/work/vinops.restore`
  - `grep -n '^STATUS_WEBHOOK_HMAC_SECRET=' /etc/vinops/tg-webhook.env || true`

---

## CI / Registry / Deploy / SOPS

### GH_PAT
- Источники: **UNKNOWN** (ожидаемо GitHub Secrets)
- Потребители: CI шаги (pull/push/репо).
- Приоритет: CI Secrets.
- Статус: UNKNOWN
- Конфликты: н/д
- Как проверить:
  - `grep -R -n "GH_PAT" /root/work/vinops.restore/.github/workflows || true`

### REGISTRY_USER
- Источники: **UNKNOWN** (ожидаемо GitHub/Container Registry Secrets)
- Потребители: `docker login`.
- Приоритет: CI Secrets.
- Статус: UNKNOWN
- Конфликты: н/д
- Как проверить:
  - `grep -R -n "REGISTRY_USER" /root/work/vinops.restore/.github/workflows || true`

### REGISTRY_PASSWORD
- Источники: **UNKNOWN**
- Потребители: `docker login`.
- Приоритет: CI Secrets.
- Статус: UNKNOWN
- Конфликты: н/д
- Как проверить:
  - `grep -R -n "REGISTRY_PASSWORD" /root/work/vinops.restore/.github/workflows || true`

### SSH_DEPLOY_HOST
- Источники: **UNKNOWN**
- Потребители: скрипты деплоя по SSH.
- Приоритет: Host/CI Secrets.
- Статус: UNKNOWN
- Конфликты: н/д
- Как проверить:
  - Repo: `grep -R -n "SSH_DEPLOY_HOST" /root/work/vinops.restore/infra/server/bin || true`
  - Host: `grep -R -n "Host " /root/.ssh/config 2>/dev/null || true`

### SSH_DEPLOY_USER
- Источники: **UNKNOWN**
- Потребители: SSH-деплой.
- Приоритет: Host/CI Secrets.
- Статус: UNKNOWN
- Конфликты: н/д
- Как проверить:
  - `grep -R -n "SSH_DEPLOY_USER" /root/work/vinops.restore/infra/server/bin || true`

### SSH_DEPLOY_KEY
- Источники: **UNKNOWN** (обычно keyfile, напр. `/root/.ssh/id_ed25519`)
- Потребители: SSH-деплой.
- Приоритет: Host keyfile.
- Статус: UNKNOWN
- Конфликты: н/д
- Как проверить:
  - `ls -l /root/.ssh/id_* 2>/dev/null || true`
  - `grep -R -n "IdentityFile" /root/.ssh/config 2>/dev/null || true`

### SOPS_AGE_PRIVATE_KEY
- Источники:
  - Host keyfile: `/root/.config/sops/age/keys.txt` **или**
  - Runtime ENV: `SOPS_AGE_PRIVATE_KEY`/`SOPS_AGE_KEY_FILE`
- Потребители: расшифровка `infra/secrets/.env.sops.yaml`.
- Приоритет: keyfile → ENV.
- Статус: UNKNOWN (факт наличия не проверен)
- Конфликты: н/д
- Как проверить:
  - `test -r /root/.config/sops/age/keys.txt && echo FOUND || echo MISSING`
  - `printenv SOPS_AGE_PRIVATE_KEY | wc -c`

---

## Runtime EnvironmentFile (systemd)
**Источник рантайм-переменных:** `/etc/vinops/tg-webhook.env` (подключён через `EnvironmentFile=-/etc/vinops/tg-webhook.env`).  
**Обязательные ключи для PROD (ExecStartPre):** `NODE_ENV`, `BOT_MODE`, `REPLY_MODE`, `WEBHOOK_PUBLIC_URL`, `WEBHOOK_SECRET`, `WEBAPP_BASE_URL`.  
**Ожидаемые по коду `tg-bot`:** `BOT_TOKEN`, `POSTGRES_DSN`.  
**Потребитель:** `tg-webhook.service` (Node HTTP, порт 8091).  
**Приоритет:** Host secure (`/srv/vinops/secure/*`) → EnvironmentFile → ENV процесса.

