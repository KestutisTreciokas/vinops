# Операции — vinops-tg-bot (S1)

## Целевая БД
- Версия сервера: PostgreSQL 17.x
- DSN хранится в `infra/secrets/.env.sops.yaml` → ключ `POSTGRES_DSN` (sops/age).
- Схема приложения: `tg_bot` (единственная точка записи).

## Стратегия бэкапа (утверждено в S1)
**Ежедневный логический бэкап `pg_dump -Fc`** с шифрованием **age**.
- Время: ежедневно в 02:15 (Europe/Warsaw).
- Хранилище: `/srv/vinops/backups/postgres/vinops/%Y-%m-%d/`
- Имена файлов: `vinops_%Y%m%d.sqlc.age` (custom-формат внутри, затем age).
- Шифрование: получатель `age14gzudn5k6vfsgqr70z30ky6q2k8597a00e52ulxs2qs2jm0dhprqpeypza`
- Ретеншн: 7 daily, 4 weekly, 6 monthly.

### Скрипт бэкапа (не требует простоя)
```bash
#!/usr/bin/env bash
set -euo pipefail
export SOPS_AGE_KEY_FILE="/srv/vinops/age/keys.txt"
export APP_ROOT="/root/work/vinops.restore"
DSN="$(SOPS_AGE_KEY_FILE="$SOPS_AGE_KEY_FILE" sops -d "$APP_ROOT/infra/secrets/.env.sops.yaml" | awk -F': ' '/^POSTGRES_DSN:/{print $2}' | tr -d '"')"
DATE="$(date +%F)"
DST="/srv/vinops/backups/postgres/vinops/${DATE}"
RECIPIENT="age14gzudn5k6vfsgqr70z30ky6q2k8597a00e52ulxs2qs2jm0dhprqpeypza"
mkdir -p "$DST"
pg_dump -Fc "$DSN" -f "${DST}/vinops_$(date +%Y%m%d).sqlc"
age -r "$RECIPIENT" -o "${DST}/vinops_$(date +%Y%m%d).sqlc.age" "${DST}/vinops_$(date +%Y%m%d).sqlc"
shred -u "${DST}/vinops_$(date +%Y%m%d).sqlc"
# daily retention cleanup (7 days for example)
find /srv/vinops/backups/postgres/vinops -mindepth 1 -maxdepth 1 -type d -mtime +7 -name '20*' -exec rm -rf {} +
```

**Планировщик: cron (пример)**  
Добавьте в crontab (root):
```
15 2 * * * /usr/local/bin/backup_vinops.sh
```
