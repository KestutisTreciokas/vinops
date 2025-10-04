# Миграции — vinops-tg-bot (S1)

## TL;DR
- Формат: `services/tg-bot/db/migrations/NNN_name.sql` (трёхзначный номер, монотонно).
- Каждая миграция **идемпотентна**: `IF NOT EXISTS`, `CREATE OR REPLACE`, `DO $$ BEGIN ... EXCEPTION WHEN duplicate_object ... END $$`.
- Применение: `psql "$POSTGRES_DSN" -X -v ON_ERROR_STOP=1 -f services/tg-bot/db/migrations/NNN_*.sql`.
- Повторный прогон **обязан** завершаться без ошибок.

## Правила
1. **DDL только миграциями.** Ручные изменения запрещены.  
2. **Идемпотентность.** Таблицы/индексы — `IF NOT EXISTS`; функции — `CREATE OR REPLACE`; триггеры — через `DO $$ ... IF NOT EXISTS ... CREATE TRIGGER ... $$`.  
3. **TZ/типы.** Все `timestamptz`; форматирование в UI/логах — Europe/Warsaw (см. S1 инвариант).  
4. **Rollback.** Разрушающие откаты запрещены. Исправления — следующей миграцией `NNN_fix_*.sql`.  
5. **Порядок.** Номера: `001_init.sql` → `002_audit_api.sql` → `003_roles.sql` → …  
6. **Проверки (DoD).** После применения:
   - `\dt tg_bot.*` — ожидаются таблицы и индексы по спекам.
   - Триггеры `updated_at` на `users/sessions` срабатывают (`BEFORE`/`AFTER` сравнение).
   - `tg_bot.audit_log(...)` вставляет запись.

## Ссылки на текущие миграции (S1)
- `001_init.sql` — схема/таблицы/индексы/триггеры.  
- `002_audit_api.sql` — `audit_log(...)`, политика read-only для `audit`.  
- `003_roles.sql` — `tg_bot_rw`: USAGE на схему, нужные CRUD, default privileges.
