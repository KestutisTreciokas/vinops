# Правила миграций (PostgreSQL) — vinops (TZ: Europe/Warsaw)

## Именование
`YYYYMMDDThhmm_area_action.sql` (локальное время Europe/Warsaw).
Пример: `20251007T0115_tg_bot_grants.sql`.

## Идемпотентность
- `CREATE SCHEMA IF NOT EXISTS tg_bot;`
- Объекты — через `IF NOT EXISTS` либо `DO $$ BEGIN ... EXCEPTION WHEN duplicate_object THEN NULL; END $$;`
- Права — отдельными миграциями `<...>_grants.sql`.

## Матрица объектов (фрагмент)
- `schema tg_bot` (owner: gen_user)
- `table tg_bot.audit (id bigserial pk, chat_id bigint, event text, data jsonb, created_at timestamptz default now())`
- `sequence tg_bot.audit_id_seq` (по умолчанию к столбцу `audit.id`)
