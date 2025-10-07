-- GRANTs для etl_rw (выполнять под владельцем схемы: gen_user). TZ: Europe/Warsaw
BEGIN;

GRANT CONNECT ON DATABASE vinops TO etl_rw;

GRANT USAGE ON SCHEMA tg_bot TO etl_rw;

GRANT SELECT, INSERT ON ALL TABLES IN SCHEMA tg_bot TO etl_rw;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA tg_bot TO etl_rw;

-- На будущее: дефолтные привилегии для новых таблиц/последовательностей, создаваемых gen_user
ALTER DEFAULT PRIVILEGES FOR ROLE gen_user IN SCHEMA tg_bot
  GRANT SELECT, INSERT ON TABLES TO etl_rw;

ALTER DEFAULT PRIVILEGES FOR ROLE gen_user IN SCHEMA tg_bot
  GRANT USAGE, SELECT ON SEQUENCES TO etl_rw;

COMMIT;
