# Сигнатура БД — tg_bot

## Быстрая сверка
```sql
-- всего строк аудита:
select count(*) as audit_rows from tg_bot.audit;

-- последние 5 событий:
select id, chat_id, event, created_at
from tg_bot.audit
order by id desc
limit 5;

-- наличие последовательности:
select relname as seq
from pg_class c join pg_namespace n on n.oid=c.relnamespace
where n.nspname='tg_bot' and c.relkind='S';

