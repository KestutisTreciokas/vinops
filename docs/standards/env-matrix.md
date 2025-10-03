# ENV Matrix — vinops-tg-bot (S0 Baseline)

**Окружения:**
- **dev** — локальная/интеграционная разработка (WebApp в Telegram, мок payments).
- **stage** — предпрод (rehearsal); домены prod, но тестовые токены.
- **prod** — продуктив.

> **Как проверить:** просмотреть `.github/workflows/*` на предмет `environment:`/`DEPLOY_ENV` и фактические job-миграции; сравнить с инфраструктурными плейбуками.

| Key               | dev                         | stage                         | prod                          |
|-------------------|-----------------------------|-------------------------------|-------------------------------|
| BOT_TOKEN         | **req** (dev-bot)           | **req** (stage-bot)           | **req** (prod-bot)            |
| POSTGRES_DSN      | **req** (dev DB)            | **req** (stage DB)            | **req** (prod DB)             |
| WEBAPP_BASE_URL   | **req** `https://miniapp.vinops.online` | **req** `https://miniapp.vinops.online` | **req** `https://miniapp.vinops.online` |
| PAYMENTS_BASE_URL | **req** `MOCK`              | **req** `MOCK` (до S7)        | **req** `MOCK` (до S7)        |
| NODE_ENV          | **req** = `development`     | **req** = `staging`           | **req** = `production`        |
| LOG_LEVEL         | opt = `debug`/`info`        | opt = `info`                  | opt = `info`                  |
| PORT              | opt = `8091`                | opt = `8091`                  | opt = `8091`                  |
| RATELIMIT_QPS     | opt = `5`                   | opt = `5`                     | opt = `5`                     |
| ALERT_BOT_TOKEN   | opt (до S4)                 | opt (до S4)                   | opt (до S4)                   |

**Примечания:**
- До включения алертов (S4) `ALERT_BOT_TOKEN` может отсутствовать; с S4 станет **req** на stage/prod.
- После интеграции с payments-ingest (S7–S8) `PAYMENTS_BASE_URL` станет https-URL (и останется **req**).

