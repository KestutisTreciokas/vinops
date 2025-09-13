# Vinops — где хранить секреты

## Храним ТОЛЬКО на сервере (в `.env`, не коммитим):
- DB_PASSWORD, DATABASE_URL (с паролем)
- SENTRY_DSN (при появлении)
- Любые ключи сторонних сервисов (Cloudflare, платежи и т.п.)

## Храним в GitHub Secrets (когда понадобятся в CI):
- SSH_PRIVATE_KEY / PROD_HOST / PROD_USER — только если включим автодеплой через SSH Action.
- Любые токены, которые нужны именно в CI (пока наш workflow использует только встроенный GITHUB_TOKEN).

## Никогда не коммитим:
- Реальные `.env` файлы с паролями
- Персональные токены (PAT), приватные ключи (`id_rsa`, `*.pem`)
- Дампы БД (`*.sql`, `*.dump`)
- Секреты из облаков/платежей

## Быстрая проверка перед пушем
- `git status` — убедись, что `.env` не в staged.
- Поиск возможных утечек: `grep -R --line-number -E '(SECRET|TOKEN|PASSWORD|DSN|API_KEY)' . --exclude-dir=.git || true`

## Ротация
- DB_PASSWORD: смени в `.env`, сделай `ALTER USER ... WITH PASSWORD ...` внутри Postgres и перезапусти API.
- GHCR PAT: `docker logout ghcr.io` → сгенерируй новый токен → `docker login ghcr.io`.
