# vinops-tg-bot — Service Skeleton (S0)

Цель: Telegram-бот + Mini App (WebApp) «Invoice». В S0 фиксируется **структура** и стандарты. Бизнес-логика и интеграции — в следующих спринтах.

## Директории
- `bot/` — исходники бота (Node.js 20, grammY), webhook `/tg-webhook`.
- `webapp/` — исходники Mini App (Telegram WebApp), backend API `/webapp/api/*`.

## Константы окружения (реестр ключей описан в docs/standards/env-matrix.md)
- `WEBAPP_BASE_URL=https://miniapp.vinops.online` (фиксируется как стандарт)
- Остальные ключи — см. S0 (MS-S0-03) и S2–S3.

## Инварианты
- Секреты — только через **sops/age**.
- Таймзона — **Europe/Warsaw**.
