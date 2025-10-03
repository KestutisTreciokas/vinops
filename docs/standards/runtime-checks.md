# Runtime Checks — vinops-tg-bot

## Политика фатальных ошибок
При старте процесс **обязан** валидировать обязательные ключи (см. `config.md`). Отсутствие или невалидный формат любого **required** ключа → немедленный `process.exit(1)` с однозначным сообщением в stderr и метрикой `startup_config_failure{key=...}`.

## Обязательные проверки на старте
1. `BOT_TOKEN` — непустая строка; матч по `^\d+:[A-Za-z0-9_-]{20,}$`.
2. `POSTGRES_DSN` — непустая строка; начинается с `postgres://`.
3. `WEBAPP_BASE_URL` — https-URL к домену `miniapp.vinops.online` (без завершающего `/`).
4. `PAYMENTS_BASE_URL` — строка; в S0–S3 допускается `MOCK`; начиная с S7 — https-URL.
5. `NODE_ENV` — одно из `development|staging|production`.

## Нефатальные проверки (warning)
- `LOG_LEVEL` — одно из `error|warn|info|debug` (иначе принудительно `info` + warning).
- `PORT` — целое 1–65535 (иначе принудительно `8091` + warning).
- `RATELIMIT_QPS` — целое ≥1 (иначе принудительно `5` + warning).
- `ALERT_BOT_TOKEN` — при `NODE_ENV=production|staging` с S4 должно быть установлено (иначе warning до S4; после S4 — fatal).

## Трассировка и аудит
- На старте логировать **только факт** успешной валидации (без значений).
- Метрики Prometheus: `startup_config_ok=1` при успехе; при провале — `startup_config_failure{key}`.

## Протокол изменений
Любое добавление/перенос ключей сопровождается синхронным обновлением: `config.md` + `env-matrix.md` + CI-проверок.
