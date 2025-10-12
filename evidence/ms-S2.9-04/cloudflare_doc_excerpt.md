# Cloudflare → Origin (Webhook) — POST-матрица tg.vinops.online

**TZ:** Europe/Warsaw

## Цель
Защитить вебхук Telegram: пропускать только `POST /tg-webhook` с заголовком
`x-telegram-bot-api-secret-token`. Остальное — блокируется на CF или отдаётся
`401/404` на origin.

## Инварианты (ожидаемая матрица)
| Запрос | Ожидаемый ответ | Где срабатывает |
|---|---:|---|
| **GET** `/tg-webhook[/]` | **403** | **Cloudflare (WAF: block non-POST)** |
| **POST** `/tg-webhook` **без** `x-telegram-bot-api-secret-token` | **403** | **Cloudflare (WAF: missing header)** |
| **POST** `/tg-webhook` **с неверным секретом** | **401** | **Origin (бот)** |
| **POST** любой **другой путь** (`/not-a-hook`) | **404** | **Origin (бот)** |

> Примечание: CF **не хранит** секрет; правило лишь требует **наличия** заголовка.
Проверка значения происходит на origin.

## Примеры `curl` (фиксируйте `CF-Ray`)
```bash
# 1) GET /tg-webhook -> 403 CF
curl -i https://tg.vinops.online/tg-webhook?xid=get_hook_$(date +%s)

# 2) POST без заголовка -> 403 CF
curl -i -X POST https://tg.vinops.online/tg-webhook?xid=post_nohdr_$(date +%s) \
  -H 'Content-Type: application/json' --data '{}'

# 3) POST с неверным секретом -> 401 origin
curl -i -X POST https://tg.vinops.online/tg-webhook?xid=post_badsec_$(date +%s) \
  -H 'Content-Type: application/json' \
  -H 'x-telegram-bot-api-secret-token: bad' \
  --data '{"ok":true}'

# 4) POST другой путь -> 404 origin
curl -i -X POST https://tg.vinops.online/not-a-hook?xid=post_404_$(date +%s) \
  -H 'Content-Type: application/json' --data '{}'

