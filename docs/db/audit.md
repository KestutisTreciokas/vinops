# Audit Events — vinops-tg-bot (S1)

Все события пишутся функцией `tg_bot.audit_log(_tg_user_id BIGINT, _chat_id BIGINT, _event TEXT, _data JSONB DEFAULT NULL) RETURNS BIGINT`.
Временные метки в БД — `timestamptz`. Для вывода в доказательствах используем форматирование в **Europe/Warsaw**.

## Словарь событий (минимально достаточный для MVP)

| Event | Назначение | Типовые ключи `data` |
|---|---|---|
| **BOT_START** | Пользователь запустил бота / нажал *Start* | `version`, `start_param` |
| **VIN_ENTERED** | Пользователь ввёл VIN | `vin` |
| **INVOICE_CREATED** *(mock\|real)* | Создан счёт | `mode` = `"mock"`\|`"real"`, `invoice_id`, `amount`, `currency` |
| **INVOICE_OPENED** | Открытие Mini App/счёта | `via` (`"qa"`, `"deeplink"`, `"menu"` и т.п.) |
| **PAYMENT_CONFIRMED** | Подтверждение оплаты | `invoice_id`, `amount`, `provider`, `tx_id` |
| **DELETE_LOT_STARTED** | Начато удаление лота | `lot_id`, `by` |
| **DELETE_LOT_SUCCEEDED** | Удаление лота завершено | `lot_id`, `duration_ms` |
| **DELETE_LOT_FAILED** | Ошибка при удалении лота | `lot_id`, `error_code`, `error_message` |

### Примечания
- `INVOICE_CREATED` всегда содержит `mode` (`mock` до интеграции; `real` после S7–S8).
- Таблица `tg_bot.audit` — append-only для прикладной роли `tg_bot_rw` (запрещены `UPDATE/DELETE`).
- Для новых событий — отдельная заявка (CR) и миграция/обновление документа.

