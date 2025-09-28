# DB Passport — PostgreSQL 17 (Timeweb VPS)

## Идентификация
- Хост (DB): 192.168.0.5 (приватный), 92.255.110.134 (публичный — закрыт фаерволом)
- Версия PostgreSQL: **UNKNOWN**  
  _Как проверить:_ `psql -V` и `SHOW server_version;`
- ОС/дистрибутив: **UNKNOWN**  
  _Как проверить:_ `/etc/os-release`
- Data directory: **UNKNOWN**  
  _Как проверить:_ `SHOW data_directory;`
- Locale/Encoding: **UNKNOWN**  
  _Как проверить:_ `SHOW lc_collate; SHOW lc_ctype; SHOW server_encoding;`
- Timezone: **Europe/Warsaw** (цель)  
  _Как проверить:_ `SHOW TimeZone;`

## Расширения (целевое состояние, включить)
- **pg_stat_statements**, **pg_trgm**, **pgcrypto**, **citext**  
  _Как проверить:_ `SELECT * FROM pg_available_extensions WHERE name IN ('pg_stat_statements','pg_trgm','pgcrypto','citext');`

## Роли и доступ (см. roles_policy.md)
- `admin` — DDL/DML полный (локально/по SSH), без рутины суперпользователя
- `etl_rw` — INSERT/UPDATE/DELETE в core-таблицы, без DDL
- `app_ro` — SELECT-только (API/SSR)
- `backup` — операции бэкапа/restore (локально)

## Параметры (базовый профиль — целевое состояние)
- WAL/autovacuum/work_mem/shared_buffers/effective_cache_size — документировать в `infra/db/parameters.md` (MS-03-02)
- Аутентификация: **scram-sha-256**
- Сеть: см. `infra/network/access.md`

## Бэкап/Восстановление
- Локальные бэкапы на VPS (S-03), offsite в R2 (S-04/S-05)
- RPO/RTO — см. документы MS-03-05

## Журнал применённых миграций
- См. `db/migrations/.applied.log` (MS-03-04)

