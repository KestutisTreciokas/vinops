# Env (prod) — vinops-tg-bot

Часовой пояс: Europe/Warsaw

## Обязательные для PROD
- NODE_ENV=production
- BOT_MODE=webhook
- WEBHOOK_PUBLIC_URL=https://tg.vinops.online/tg-webhook    # D-013
- WEBHOOK_SECRET=... (32–64 b64url)                          # D-016
- BOT_TOKEN=...                                              # секрет
- POSTGRES_DSN=...                                           # секрет
- WEBAPP_BASE_URL=https://miniapp.vinops.online              # D-001
- REPLY_MODE=telegram                                        # D-014/D-015

## Разрешённые доп. ключи
- PROMETHEUS=on
- LOG_LEVEL=info|debug

## Депрециировано (BC-слой)
- DRY_RUN → REPLY_MODE=log (prod: ЗАПРЕЩЕНО)
- WEBHOOK_ONLY=1 → BOT_MODE=webhook (prod: ТРЕБУЕТ WEBHOOK_PUBLIC_URL)

## Политики
1) В PROD запуск без BOT_MODE/WEBHOOK_PUBLIC_URL/WEBHOOK_SECRET — **фатал**.
2) В PROD **запрещено** DRY_RUN/REPLY_MODE≠telegram.
3) Проверка сигнатуры Telegram (X-Telegram-Bot-Api-Secret-Token) — в другом MS.
