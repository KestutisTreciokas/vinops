# SECRETS_VALIDATION — Vinops
_Generated: 2025-10-15 02:16 (Europe/Warsaw)_

**Статусы:** ok — формат допустим; unknown — значение = 'UNKNOWN'; format-fail — найдено, но не прошло формат-чек.

### CF_API_TOKEN
- **Статус:** unknown
- **Потребители:**
  (из MAP: блок «Потребители» отсутствует/неточный)
- **Как проверить/исправить:**
  1) Открой источники (по MAP/этот ключ):
     - (из MAP: блок «Источники» отсутствует/неточный)
  2) Если источник /etc/vinops/tg-webhook.env — проверь строку:
     - grep -n "^CF_API_TOKEN=" /etc/vinops/tg-webhook.env || echo "[MISS] CF_API_TOKEN"
  3) Если источник — рантайм (systemd tg-webhook):
     - PID=$(systemctl show -p MainPID --value tg-webhook.service); tr '\0' '\n' </proc/$PID/environ | grep -n "^CF_API_TOKEN=" || echo '[MISS runtime]'
  4) Если источник — файл /srv/vinops/secure/*.secret — проверь, что не пустой:
     - test -s /srv/vinops/secure/<file>.secret && wc -c /srv/vinops/secure/<file>.secret
  5) Если SoT — репозиторий/CI, следуй приоритету SoT в MAP-секции ключа.

### CF_ZONE_ID
- **Статус:** unknown
- **Потребители:**
  (из MAP: блок «Потребители» отсутствует/неточный)
- **Как проверить/исправить:**
  1) Открой источники (по MAP/этот ключ):
     - (из MAP: блок «Источники» отсутствует/неточный)
  2) Если источник /etc/vinops/tg-webhook.env — проверь строку:
     - grep -n "^CF_ZONE_ID=" /etc/vinops/tg-webhook.env || echo "[MISS] CF_ZONE_ID"
  3) Если источник — рантайм (systemd tg-webhook):
     - PID=$(systemctl show -p MainPID --value tg-webhook.service); tr '\0' '\n' </proc/$PID/environ | grep -n "^CF_ZONE_ID=" || echo '[MISS runtime]'
  4) Если источник — файл /srv/vinops/secure/*.secret — проверь, что не пустой:
     - test -s /srv/vinops/secure/<file>.secret && wc -c /srv/vinops/secure/<file>.secret
  5) Если SoT — репозиторий/CI, следуй приоритету SoT в MAP-секции ключа.

### PUBLIC_IMG_DOMAIN
- **Статус:** unknown
- **Потребители:**
  (из MAP: блок «Потребители» отсутствует/неточный)
- **Как проверить/исправить:**
  1) Открой источники (по MAP/этот ключ):
     - (из MAP: блок «Источники» отсутствует/неточный)
  2) Если источник /etc/vinops/tg-webhook.env — проверь строку:
     - grep -n "^PUBLIC_IMG_DOMAIN=" /etc/vinops/tg-webhook.env || echo "[MISS] PUBLIC_IMG_DOMAIN"
  3) Если источник — рантайм (systemd tg-webhook):
     - PID=$(systemctl show -p MainPID --value tg-webhook.service); tr '\0' '\n' </proc/$PID/environ | grep -n "^PUBLIC_IMG_DOMAIN=" || echo '[MISS runtime]'
  4) Если источник — файл /srv/vinops/secure/*.secret — проверь, что не пустой:
     - test -s /srv/vinops/secure/<file>.secret && wc -c /srv/vinops/secure/<file>.secret
  5) Если SoT — репозиторий/CI, следуй приоритету SoT в MAP-секции ключа.

### R2_ACCOUNT_ID
- **Статус:** unknown
- **Потребители:**
  (из MAP: блок «Потребители» отсутствует/неточный)
- **Как проверить/исправить:**
  1) Открой источники (по MAP/этот ключ):
     - (из MAP: блок «Источники» отсутствует/неточный)
  2) Если источник /etc/vinops/tg-webhook.env — проверь строку:
     - grep -n "^R2_ACCOUNT_ID=" /etc/vinops/tg-webhook.env || echo "[MISS] R2_ACCOUNT_ID"
  3) Если источник — рантайм (systemd tg-webhook):
     - PID=$(systemctl show -p MainPID --value tg-webhook.service); tr '\0' '\n' </proc/$PID/environ | grep -n "^R2_ACCOUNT_ID=" || echo '[MISS runtime]'
  4) Если источник — файл /srv/vinops/secure/*.secret — проверь, что не пустой:
     - test -s /srv/vinops/secure/<file>.secret && wc -c /srv/vinops/secure/<file>.secret
  5) Если SoT — репозиторий/CI, следуй приоритету SoT в MAP-секции ключа.

### R2_ACCESS_KEY_ID
- **Статус:** unknown
- **Потребители:**
  (из MAP: блок «Потребители» отсутствует/неточный)
- **Как проверить/исправить:**
  1) Открой источники (по MAP/этот ключ):
     - (из MAP: блок «Источники» отсутствует/неточный)
  2) Если источник /etc/vinops/tg-webhook.env — проверь строку:
     - grep -n "^R2_ACCESS_KEY_ID=" /etc/vinops/tg-webhook.env || echo "[MISS] R2_ACCESS_KEY_ID"
  3) Если источник — рантайм (systemd tg-webhook):
     - PID=$(systemctl show -p MainPID --value tg-webhook.service); tr '\0' '\n' </proc/$PID/environ | grep -n "^R2_ACCESS_KEY_ID=" || echo '[MISS runtime]'
  4) Если источник — файл /srv/vinops/secure/*.secret — проверь, что не пустой:
     - test -s /srv/vinops/secure/<file>.secret && wc -c /srv/vinops/secure/<file>.secret
  5) Если SoT — репозиторий/CI, следуй приоритету SoT в MAP-секции ключа.

### R2_SECRET_ACCESS_KEY
- **Статус:** unknown
- **Потребители:**
  (из MAP: блок «Потребители» отсутствует/неточный)
- **Как проверить/исправить:**
  1) Открой источники (по MAP/этот ключ):
     - (из MAP: блок «Источники» отсутствует/неточный)
  2) Если источник /etc/vinops/tg-webhook.env — проверь строку:
     - grep -n "^R2_SECRET_ACCESS_KEY=" /etc/vinops/tg-webhook.env || echo "[MISS] R2_SECRET_ACCESS_KEY"
  3) Если источник — рантайм (systemd tg-webhook):
     - PID=$(systemctl show -p MainPID --value tg-webhook.service); tr '\0' '\n' </proc/$PID/environ | grep -n "^R2_SECRET_ACCESS_KEY=" || echo '[MISS runtime]'
  4) Если источник — файл /srv/vinops/secure/*.secret — проверь, что не пустой:
     - test -s /srv/vinops/secure/<file>.secret && wc -c /srv/vinops/secure/<file>.secret
  5) Если SoT — репозиторий/CI, следуй приоритету SoT в MAP-секции ключа.

### R2_BUCKET
- **Статус:** unknown
- **Потребители:**
  (из MAP: блок «Потребители» отсутствует/неточный)
- **Как проверить/исправить:**
  1) Открой источники (по MAP/этот ключ):
     - (из MAP: блок «Источники» отсутствует/неточный)
  2) Если источник /etc/vinops/tg-webhook.env — проверь строку:
     - grep -n "^R2_BUCKET=" /etc/vinops/tg-webhook.env || echo "[MISS] R2_BUCKET"
  3) Если источник — рантайм (systemd tg-webhook):
     - PID=$(systemctl show -p MainPID --value tg-webhook.service); tr '\0' '\n' </proc/$PID/environ | grep -n "^R2_BUCKET=" || echo '[MISS runtime]'
  4) Если источник — файл /srv/vinops/secure/*.secret — проверь, что не пустой:
     - test -s /srv/vinops/secure/<file>.secret && wc -c /srv/vinops/secure/<file>.secret
  5) Если SoT — репозиторий/CI, следуй приоритету SoT в MAP-секции ключа.

### POSTGRES_DSN
- **Статус:** unknown
- **Потребители:**
  (из MAP: блок «Потребители» отсутствует/неточный)
- **Как проверить/исправить:**
  1) Открой источники (по MAP/этот ключ):
     - (из MAP: блок «Источники» отсутствует/неточный)
  2) Если источник /etc/vinops/tg-webhook.env — проверь строку:
     - grep -n "^POSTGRES_DSN=" /etc/vinops/tg-webhook.env || echo "[MISS] POSTGRES_DSN"
  3) Если источник — рантайм (systemd tg-webhook):
     - PID=$(systemctl show -p MainPID --value tg-webhook.service); tr '\0' '\n' </proc/$PID/environ | grep -n "^POSTGRES_DSN=" || echo '[MISS runtime]'
  4) Если источник — файл /srv/vinops/secure/*.secret — проверь, что не пустой:
     - test -s /srv/vinops/secure/<file>.secret && wc -c /srv/vinops/secure/<file>.secret
  5) Если SoT — репозиторий/CI, следуй приоритету SoT в MAP-секции ключа.

### APP_BASE_URL
- **Статус:** unknown
- **Потребители:**
  (из MAP: блок «Потребители» отсутствует/неточный)
- **Как проверить/исправить:**
  1) Открой источники (по MAP/этот ключ):
     - (из MAP: блок «Источники» отсутствует/неточный)
  2) Если источник /etc/vinops/tg-webhook.env — проверь строку:
     - grep -n "^APP_BASE_URL=" /etc/vinops/tg-webhook.env || echo "[MISS] APP_BASE_URL"
  3) Если источник — рантайм (systemd tg-webhook):
     - PID=$(systemctl show -p MainPID --value tg-webhook.service); tr '\0' '\n' </proc/$PID/environ | grep -n "^APP_BASE_URL=" || echo '[MISS runtime]'
  4) Если источник — файл /srv/vinops/secure/*.secret — проверь, что не пустой:
     - test -s /srv/vinops/secure/<file>.secret && wc -c /srv/vinops/secure/<file>.secret
  5) Если SoT — репозиторий/CI, следуй приоритету SoT в MAP-секции ключа.

### SENTRY_DSN
- **Статус:** unknown
- **Потребители:**
  (из MAP: блок «Потребители» отсутствует/неточный)
- **Как проверить/исправить:**
  1) Открой источники (по MAP/этот ключ):
     - (из MAP: блок «Источники» отсутствует/неточный)
  2) Если источник /etc/vinops/tg-webhook.env — проверь строку:
     - grep -n "^SENTRY_DSN=" /etc/vinops/tg-webhook.env || echo "[MISS] SENTRY_DSN"
  3) Если источник — рантайм (systemd tg-webhook):
     - PID=$(systemctl show -p MainPID --value tg-webhook.service); tr '\0' '\n' </proc/$PID/environ | grep -n "^SENTRY_DSN=" || echo '[MISS runtime]'
  4) Если источник — файл /srv/vinops/secure/*.secret — проверь, что не пустой:
     - test -s /srv/vinops/secure/<file>.secret && wc -c /srv/vinops/secure/<file>.secret
  5) Если SoT — репозиторий/CI, следуй приоритету SoT в MAP-секции ключа.

### BOT_TOKEN
- **Статус:** unknown
- **Потребители:**
  (из MAP: блок «Потребители» отсутствует/неточный)
- **Как проверить/исправить:**
  1) Открой источники (по MAP/этот ключ):
     - (из MAP: блок «Источники» отсутствует/неточный)
  2) Если источник /etc/vinops/tg-webhook.env — проверь строку:
     - grep -n "^BOT_TOKEN=" /etc/vinops/tg-webhook.env || echo "[MISS] BOT_TOKEN"
  3) Если источник — рантайм (systemd tg-webhook):
     - PID=$(systemctl show -p MainPID --value tg-webhook.service); tr '\0' '\n' </proc/$PID/environ | grep -n "^BOT_TOKEN=" || echo '[MISS runtime]'
  4) Если источник — файл /srv/vinops/secure/*.secret — проверь, что не пустой:
     - test -s /srv/vinops/secure/<file>.secret && wc -c /srv/vinops/secure/<file>.secret
  5) Если SoT — репозиторий/CI, следуй приоритету SoT в MAP-секции ключа.

### BOT_TOKEN(Alert_bot)
- **Статус:** unknown
- **Потребители:**
  (из MAP: блок «Потребители» отсутствует/неточный)
- **Как проверить/исправить:**
  1) Открой источники (по MAP/этот ключ):
     - (из MAP: блок «Источники» отсутствует/неточный)
  2) Если источник /etc/vinops/tg-webhook.env — проверь строку:
     - grep -n "^BOT_TOKEN(Alert_bot)=" /etc/vinops/tg-webhook.env || echo "[MISS] BOT_TOKEN(Alert_bot)"
  3) Если источник — рантайм (systemd tg-webhook):
     - PID=$(systemctl show -p MainPID --value tg-webhook.service); tr '\0' '\n' </proc/$PID/environ | grep -n "^BOT_TOKEN(Alert_bot)=" || echo '[MISS runtime]'
  4) Если источник — файл /srv/vinops/secure/*.secret — проверь, что не пустой:
     - test -s /srv/vinops/secure/<file>.secret && wc -c /srv/vinops/secure/<file>.secret
  5) Если SoT — репозиторий/CI, следуй приоритету SoT в MAP-секции ключа.

### WEBHOOK_PUBLIC_URL
- **Статус:** unknown
- **Потребители:**
  (из MAP: блок «Потребители» отсутствует/неточный)
- **Как проверить/исправить:**
  1) Открой источники (по MAP/этот ключ):
     - (из MAP: блок «Источники» отсутствует/неточный)
  2) Если источник /etc/vinops/tg-webhook.env — проверь строку:
     - grep -n "^WEBHOOK_PUBLIC_URL=" /etc/vinops/tg-webhook.env || echo "[MISS] WEBHOOK_PUBLIC_URL"
  3) Если источник — рантайм (systemd tg-webhook):
     - PID=$(systemctl show -p MainPID --value tg-webhook.service); tr '\0' '\n' </proc/$PID/environ | grep -n "^WEBHOOK_PUBLIC_URL=" || echo '[MISS runtime]'
  4) Если источник — файл /srv/vinops/secure/*.secret — проверь, что не пустой:
     - test -s /srv/vinops/secure/<file>.secret && wc -c /srv/vinops/secure/<file>.secret
  5) Если SoT — репозиторий/CI, следуй приоритету SoT в MAP-секции ключа.

### WEBHOOK_SECRET
- **Статус:** unknown
- **Потребители:**
  (из MAP: блок «Потребители» отсутствует/неточный)
- **Как проверить/исправить:**
  1) Открой источники (по MAP/этот ключ):
     - (из MAP: блок «Источники» отсутствует/неточный)
  2) Если источник /etc/vinops/tg-webhook.env — проверь строку:
     - grep -n "^WEBHOOK_SECRET=" /etc/vinops/tg-webhook.env || echo "[MISS] WEBHOOK_SECRET"
  3) Если источник — рантайм (systemd tg-webhook):
     - PID=$(systemctl show -p MainPID --value tg-webhook.service); tr '\0' '\n' </proc/$PID/environ | grep -n "^WEBHOOK_SECRET=" || echo '[MISS runtime]'
  4) Если источник — файл /srv/vinops/secure/*.secret — проверь, что не пустой:
     - test -s /srv/vinops/secure/<file>.secret && wc -c /srv/vinops/secure/<file>.secret
  5) Если SoT — репозиторий/CI, следуй приоритету SoT в MAP-секции ключа.

### WEBAPP_BASE_URL
- **Статус:** unknown
- **Потребители:**
  (из MAP: блок «Потребители» отсутствует/неточный)
- **Как проверить/исправить:**
  1) Открой источники (по MAP/этот ключ):
     - (из MAP: блок «Источники» отсутствует/неточный)
  2) Если источник /etc/vinops/tg-webhook.env — проверь строку:
     - grep -n "^WEBAPP_BASE_URL=" /etc/vinops/tg-webhook.env || echo "[MISS] WEBAPP_BASE_URL"
  3) Если источник — рантайм (systemd tg-webhook):
     - PID=$(systemctl show -p MainPID --value tg-webhook.service); tr '\0' '\n' </proc/$PID/environ | grep -n "^WEBAPP_BASE_URL=" || echo '[MISS runtime]'
  4) Если источник — файл /srv/vinops/secure/*.secret — проверь, что не пустой:
     - test -s /srv/vinops/secure/<file>.secret && wc -c /srv/vinops/secure/<file>.secret
  5) Если SoT — репозиторий/CI, следуй приоритету SoT в MAP-секции ключа.

### TELEGRAM_INITDATA_HMAC_KEY
- **Статус:** unknown
- **Потребители:**
  (из MAP: блок «Потребители» отсутствует/неточный)
- **Как проверить/исправить:**
  1) Открой источники (по MAP/этот ключ):
     - (из MAP: блок «Источники» отсутствует/неточный)
  2) Если источник /etc/vinops/tg-webhook.env — проверь строку:
     - grep -n "^TELEGRAM_INITDATA_HMAC_KEY=" /etc/vinops/tg-webhook.env || echo "[MISS] TELEGRAM_INITDATA_HMAC_KEY"
  3) Если источник — рантайм (systemd tg-webhook):
     - PID=$(systemctl show -p MainPID --value tg-webhook.service); tr '\0' '\n' </proc/$PID/environ | grep -n "^TELEGRAM_INITDATA_HMAC_KEY=" || echo '[MISS runtime]'
  4) Если источник — файл /srv/vinops/secure/*.secret — проверь, что не пустой:
     - test -s /srv/vinops/secure/<file>.secret && wc -c /srv/vinops/secure/<file>.secret
  5) Если SoT — репозиторий/CI, следуй приоритету SoT в MAP-секции ключа.

### CSRF_SECRET
- **Статус:** unknown
- **Потребители:**
  (из MAP: блок «Потребители» отсутствует/неточный)
- **Как проверить/исправить:**
  1) Открой источники (по MAP/этот ключ):
     - (из MAP: блок «Источники» отсутствует/неточный)
  2) Если источник /etc/vinops/tg-webhook.env — проверь строку:
     - grep -n "^CSRF_SECRET=" /etc/vinops/tg-webhook.env || echo "[MISS] CSRF_SECRET"
  3) Если источник — рантайм (systemd tg-webhook):
     - PID=$(systemctl show -p MainPID --value tg-webhook.service); tr '\0' '\n' </proc/$PID/environ | grep -n "^CSRF_SECRET=" || echo '[MISS runtime]'
  4) Если источник — файл /srv/vinops/secure/*.secret — проверь, что не пустой:
     - test -s /srv/vinops/secure/<file>.secret && wc -c /srv/vinops/secure/<file>.secret
  5) Если SoT — репозиторий/CI, следуй приоритету SoT в MAP-секции ключа.

### STATUS_WEBHOOK_HMAC_SECRET
- **Статус:** unknown
- **Потребители:**
  (из MAP: блок «Потребители» отсутствует/неточный)
- **Как проверить/исправить:**
  1) Открой источники (по MAP/этот ключ):
     - (из MAP: блок «Источники» отсутствует/неточный)
  2) Если источник /etc/vinops/tg-webhook.env — проверь строку:
     - grep -n "^STATUS_WEBHOOK_HMAC_SECRET=" /etc/vinops/tg-webhook.env || echo "[MISS] STATUS_WEBHOOK_HMAC_SECRET"
  3) Если источник — рантайм (systemd tg-webhook):
     - PID=$(systemctl show -p MainPID --value tg-webhook.service); tr '\0' '\n' </proc/$PID/environ | grep -n "^STATUS_WEBHOOK_HMAC_SECRET=" || echo '[MISS runtime]'
  4) Если источник — файл /srv/vinops/secure/*.secret — проверь, что не пустой:
     - test -s /srv/vinops/secure/<file>.secret && wc -c /srv/vinops/secure/<file>.secret
  5) Если SoT — репозиторий/CI, следуй приоритету SoT в MAP-секции ключа.

### GH_PAT
- **Статус:** unknown
- **Потребители:**
  (из MAP: блок «Потребители» отсутствует/неточный)
- **Как проверить/исправить:**
  1) Открой источники (по MAP/этот ключ):
     - (из MAP: блок «Источники» отсутствует/неточный)
  2) Если источник /etc/vinops/tg-webhook.env — проверь строку:
     - grep -n "^GH_PAT=" /etc/vinops/tg-webhook.env || echo "[MISS] GH_PAT"
  3) Если источник — рантайм (systemd tg-webhook):
     - PID=$(systemctl show -p MainPID --value tg-webhook.service); tr '\0' '\n' </proc/$PID/environ | grep -n "^GH_PAT=" || echo '[MISS runtime]'
  4) Если источник — файл /srv/vinops/secure/*.secret — проверь, что не пустой:
     - test -s /srv/vinops/secure/<file>.secret && wc -c /srv/vinops/secure/<file>.secret
  5) Если SoT — репозиторий/CI, следуй приоритету SoT в MAP-секции ключа.

### REGISTRY_USER
- **Статус:** unknown
- **Потребители:**
  (из MAP: блок «Потребители» отсутствует/неточный)
- **Как проверить/исправить:**
  1) Открой источники (по MAP/этот ключ):
     - (из MAP: блок «Источники» отсутствует/неточный)
  2) Если источник /etc/vinops/tg-webhook.env — проверь строку:
     - grep -n "^REGISTRY_USER=" /etc/vinops/tg-webhook.env || echo "[MISS] REGISTRY_USER"
  3) Если источник — рантайм (systemd tg-webhook):
     - PID=$(systemctl show -p MainPID --value tg-webhook.service); tr '\0' '\n' </proc/$PID/environ | grep -n "^REGISTRY_USER=" || echo '[MISS runtime]'
  4) Если источник — файл /srv/vinops/secure/*.secret — проверь, что не пустой:
     - test -s /srv/vinops/secure/<file>.secret && wc -c /srv/vinops/secure/<file>.secret
  5) Если SoT — репозиторий/CI, следуй приоритету SoT в MAP-секции ключа.

### REGISTRY_PASSWORD
- **Статус:** unknown
- **Потребители:**
  (из MAP: блок «Потребители» отсутствует/неточный)
- **Как проверить/исправить:**
  1) Открой источники (по MAP/этот ключ):
     - (из MAP: блок «Источники» отсутствует/неточный)
  2) Если источник /etc/vinops/tg-webhook.env — проверь строку:
     - grep -n "^REGISTRY_PASSWORD=" /etc/vinops/tg-webhook.env || echo "[MISS] REGISTRY_PASSWORD"
  3) Если источник — рантайм (systemd tg-webhook):
     - PID=$(systemctl show -p MainPID --value tg-webhook.service); tr '\0' '\n' </proc/$PID/environ | grep -n "^REGISTRY_PASSWORD=" || echo '[MISS runtime]'
  4) Если источник — файл /srv/vinops/secure/*.secret — проверь, что не пустой:
     - test -s /srv/vinops/secure/<file>.secret && wc -c /srv/vinops/secure/<file>.secret
  5) Если SoT — репозиторий/CI, следуй приоритету SoT в MAP-секции ключа.

### SSH_DEPLOY_HOST
- **Статус:** unknown
- **Потребители:**
  (из MAP: блок «Потребители» отсутствует/неточный)
- **Как проверить/исправить:**
  1) Открой источники (по MAP/этот ключ):
     - (из MAP: блок «Источники» отсутствует/неточный)
  2) Если источник /etc/vinops/tg-webhook.env — проверь строку:
     - grep -n "^SSH_DEPLOY_HOST=" /etc/vinops/tg-webhook.env || echo "[MISS] SSH_DEPLOY_HOST"
  3) Если источник — рантайм (systemd tg-webhook):
     - PID=$(systemctl show -p MainPID --value tg-webhook.service); tr '\0' '\n' </proc/$PID/environ | grep -n "^SSH_DEPLOY_HOST=" || echo '[MISS runtime]'
  4) Если источник — файл /srv/vinops/secure/*.secret — проверь, что не пустой:
     - test -s /srv/vinops/secure/<file>.secret && wc -c /srv/vinops/secure/<file>.secret
  5) Если SoT — репозиторий/CI, следуй приоритету SoT в MAP-секции ключа.

### SSH_DEPLOY_USER
- **Статус:** unknown
- **Потребители:**
  (из MAP: блок «Потребители» отсутствует/неточный)
- **Как проверить/исправить:**
  1) Открой источники (по MAP/этот ключ):
     - (из MAP: блок «Источники» отсутствует/неточный)
  2) Если источник /etc/vinops/tg-webhook.env — проверь строку:
     - grep -n "^SSH_DEPLOY_USER=" /etc/vinops/tg-webhook.env || echo "[MISS] SSH_DEPLOY_USER"
  3) Если источник — рантайм (systemd tg-webhook):
     - PID=$(systemctl show -p MainPID --value tg-webhook.service); tr '\0' '\n' </proc/$PID/environ | grep -n "^SSH_DEPLOY_USER=" || echo '[MISS runtime]'
  4) Если источник — файл /srv/vinops/secure/*.secret — проверь, что не пустой:
     - test -s /srv/vinops/secure/<file>.secret && wc -c /srv/vinops/secure/<file>.secret
  5) Если SoT — репозиторий/CI, следуй приоритету SoT в MAP-секции ключа.

### SSH_DEPLOY_KEY
- **Статус:** unknown
- **Потребители:**
  (из MAP: блок «Потребители» отсутствует/неточный)
- **Как проверить/исправить:**
  1) Открой источники (по MAP/этот ключ):
     - (из MAP: блок «Источники» отсутствует/неточный)
  2) Если источник /etc/vinops/tg-webhook.env — проверь строку:
     - grep -n "^SSH_DEPLOY_KEY=" /etc/vinops/tg-webhook.env || echo "[MISS] SSH_DEPLOY_KEY"
  3) Если источник — рантайм (systemd tg-webhook):
     - PID=$(systemctl show -p MainPID --value tg-webhook.service); tr '\0' '\n' </proc/$PID/environ | grep -n "^SSH_DEPLOY_KEY=" || echo '[MISS runtime]'
  4) Если источник — файл /srv/vinops/secure/*.secret — проверь, что не пустой:
     - test -s /srv/vinops/secure/<file>.secret && wc -c /srv/vinops/secure/<file>.secret
  5) Если SoT — репозиторий/CI, следуй приоритету SoT в MAP-секции ключа.

### SOPS_AGE_PRIVATE_KEY
- **Статус:** unknown
- **Потребители:**
  (из MAP: блок «Потребители» отсутствует/неточный)
- **Как проверить/исправить:**
  1) Открой источники (по MAP/этот ключ):
     - (из MAP: блок «Источники» отсутствует/неточный)
  2) Если источник /etc/vinops/tg-webhook.env — проверь строку:
     - grep -n "^SOPS_AGE_PRIVATE_KEY=" /etc/vinops/tg-webhook.env || echo "[MISS] SOPS_AGE_PRIVATE_KEY"
  3) Если источник — рантайм (systemd tg-webhook):
     - PID=$(systemctl show -p MainPID --value tg-webhook.service); tr '\0' '\n' </proc/$PID/environ | grep -n "^SOPS_AGE_PRIVATE_KEY=" || echo '[MISS runtime]'
  4) Если источник — файл /srv/vinops/secure/*.secret — проверь, что не пустой:
     - test -s /srv/vinops/secure/<file>.secret && wc -c /srv/vinops/secure/<file>.secret
  5) Если SoT — репозиторий/CI, следуй приоритету SoT в MAP-секции ключа.

### DB USERS
- **Статус:** ok
- **admin:** ok
- **etl_rw:** ok
- **gen_user:** ok
- **Источники:**
  - /srv/vinops/secure/pg_db_admin.password
  - /srv/vinops/secure/pg_etl_rw.password
  - /srv/vinops/secure/pg_gen_user.password
- **Как проверить/исправить:**
  1) test -s /srv/vinops/secure/pg_*.password && wc -c /srv/vinops/secure/pg_*.password
  2) синхронизируй с DSN/ролями БД (значения не выводить в логи).

