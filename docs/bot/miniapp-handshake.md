# Mini App Handshake (Mock) — S2-06

**Base URL:** `https://miniapp.vinops.online`

Бот формирует ссылку для кнопки `web_app`:
https://miniapp.vinops.online/invoice?chat={CHAT_ID}&lang={ru|en}

markdown
Skopiuj kod

Где:
- `CHAT_ID` — `ctx.chat.id` (fallback: `ctx.from.id`).
- `lang` — текущая локаль бота из БД (`ru`/`en`).

## Телеграм (mock)
- Команда: `/invoice` → ответ с InlineKeyboard (кнопка **Open invoice (Mini App)** / **Открыть счёт (Mini App)**).
- При выдаче кнопки бот пишет аудит:
INVOICE_OPENED { url: ".../invoice?chat=9101&lang=en", via: "command" }

bash
Skopiuj kod
- **Нет** сетевых вызовов к payments-ingest (mock-режим).

## Проверки (локально)
1) `/lang en` → `/invoice` → в логе:
 - `[reply inline_keyboard] ... "web_app":{"url":"https://miniapp.vinops.online/invoice?chat=9101&lang=en"}`
 - `[miniapp url] https://miniapp.vinops.online/invoice?chat=9101&lang=en`
 - `INVOICE_OPENED` (в audit).
2) `/lang ru` → `/invoice` → аналогично с `lang=ru`.

