# Rate-limit и бан-лист (MS-S2-04)

## ENV
- `RATELIMIT_CHAT_MAX` / `RATELIMIT_CHAT_WINDOW` — лимит команд в чате (шт / сек).
- `RATELIMIT_VIN_MAX`  / `RATELIMIT_VIN_WINDOW`  — лимит VIN-запросов (шт / сек).

## Поведение
- При превышении: бот отвечает подсказкой с временем ожидания (сек) и пишет в аудит:
  `RATE_LIMIT_HIT` c `{"kind":"chat_cmds"|"vin","retry":<secs>}` (время — Europe/Warsaw).
- Нормальный сценарий (редкие команды) не страдает.

## Бан
- `/banme` — добавляет пользователя в бан-лист.
- `/start`, `/lang`, `/vin` и т.д. — блокируются; `/help` доступен.
- Аудит: `USER_BANNED` / `USER_UNBANNED` и при попытке выполнить запрещённую команду — `BAN_BLOCK`.

## Регресс-смоки
- S2-01: `BOT_START` в аудите.
- S2-02: i18n (/lang ru|en), подписи клавиатуры из локалей.
- S2-03: VIN good/bad → `VIN_ENTERED` / `VIN_VALIDATION_FAILED{reason}`.
