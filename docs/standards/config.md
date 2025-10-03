# ENV Contract — vinops-tg-bot (S0)

**TZ:** Europe/Warsaw

## Обязательные ключи (required)
| Key               | Тип/формат                                | Описание                                               | Примечание |
|-------------------|-------------------------------------------|--------------------------------------------------------|-----------|
| BOT_TOKEN         | `string` (Telegram token `\d+:[A-Za-z0-9_-]+`) | Токен **основного** Telegram-бота                      | секрет |
| POSTGRES_DSN      | `string` (`postgres://user:pass@host:port/db?sslmode=`) | Подключение к Postgres 17 (схема `tg_bot`)             | секрет |
| WEBAPP_BASE_URL   | `https URL`                               | База Mini App (Telegram WebApp)                        | фикс: `https://miniapp.vinops.online` |
| PAYMENTS_BASE_URL | `URL`                                     | База API payments-ingest                               | для S0/ранних спринтов: `MOCK` |
| NODE_ENV          | `enum` (`development`/`staging`/`production`) | Режим окружения                                        | влияет на логи/безопасность |

## Необязательные ключи (optional c дефолтами)
| Key            | Тип/формат   | Default | Описание                         |
|----------------|--------------|---------|----------------------------------|
| LOG_LEVEL      | `enum` (`error`/`warn`/`info`/`debug`) | `info` | Уровень логирования             |
| PORT           | `int` 1–65535| `8091`  | Локальный порт tg-bot + webapp   |
| RATELIMIT_QPS  | `int` ≥1     | `5`     | Лимит запросов/сек на входных API|
| ALERT_BOT_TOKEN| `string` (Telegram token) | _none_ | Токен alert-бота (вкл. в S4)    |

## Формальные правила значений
- `WEBAPP_BASE_URL` **обязательно https**; без слеша в конце; домен: `miniapp.vinops.online`.
- `PAYMENTS_BASE_URL` в S0–S3 допускает `MOCK` (строка); c S7 — реальный https-URL.
- `POSTGRES_DSN` — DSN без пробелов; Unicode в пароле допустим, рекомендуется URL-encode.
- `NODE_ENV` — строго из перечисления; для `production` запрещены debug-эндпоинты.

## Инварианты
- Отсутствие любого **required** ключа = **фатальная ошибка** запуска (см. `runtime-checks.md`).
- Любая правка/добавление ключей требует обновление этого файла и `env-matrix.md`.
