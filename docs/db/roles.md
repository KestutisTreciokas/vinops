# Roles & Privileges — vinops-tg-bot (S1-03)

## Цель
Минимально-достаточные права для прикладной роли **tg_bot_rw**:
- **Schema (`tg_bot`)**: USAGE
- **Tables**:
  - `users`, `sessions`: SELECT, INSERT, UPDATE
  - `audit`: SELECT, INSERT (без UPDATE/DELETE)
- **Sequences**: USAGE, SELECT (для `audit_id_seq` и будущих)
- **Default privileges**: для новых таблиц/секвенсов в `tg_bot` автоматически выдаются права как выше.

## Модель
`tg_bot_rw` — групповая роль (NOLOGIN). Рабочие учётки (например, `gen_user`) включаются в неё через `GRANT tg_bot_rw TO <user>;`.

## Проверка
- `information_schema.role_table_grants` показывает фактические привилегии.
- Попытка `UPDATE/DELETE` по таблице `tg_bot.audit` от имени роли приводит к `permission denied for table audit`.

## Операции
- Ротация: не требуется (роль без пароля).
- Удаление прав: через `REVOKE` на конкретные объекты + обновление default privileges.
