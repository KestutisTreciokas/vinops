# Операции БД: бэкап/восстановление (TZ: Europe/Warsaw)

## Инструменты
- Клиент PostgreSQL 17.x (`pg_dump`, `psql`)
- `gzip`
- `age` (recipient: `age14gzudn5k6vfsgqr70z30ky6q2k8597a00e52ulxs2qs2jm0dhprqpeypza`), identity на хосте: `/srv/vinops/age/keys.txt`.

## Бэкап схемы `tg_bot`
Скрипт: `scripts/db/backup_tg_bot.sh` (пользователь подключения: `etl_rw`).
Результат: `${APP_ROOT}/backup/vinops_tg_bot_<YYYY-MM-DD_HHMMSS>.sql.gz.age`.

## Восстановление (smoke) в temp-БД
Скрипт: `scripts/db/restore_tg_bot_to_tempdb.sh /path/to/backup.sql.gz.age`

1. Создаётся temp-БД `vinops_restore_tg_bot_<YYYYMMDD_HHMMSS>` под `db_admin` (owner — `db_admin`).
2. Выдаётся `GRANT CONNECT, CREATE, TEMP` для `gen_user`.
3. Расшифровка `age -d` и распаковка `gzip -d`.
4. Импорт под `gen_user` (`ON_ERROR_STOP=1`).
5. Смоки:
   - `select count(*) from tg_bot.audit;`
   - последние 5 записей из `tg_bot.audit`;
   - наличие схемы `tg_bot` и последовательности `tg_bot.audit_id_seq`.

Смоки выполняются пользователем `gen_user` (тот же DSN, что у сервиса). См. чек-лист в `docs/db/signature.md`.

## Ретеншн
- Ежедневные бэкапы, хранение: 14 дней.
- Формат: `.sql.gz.age`.
