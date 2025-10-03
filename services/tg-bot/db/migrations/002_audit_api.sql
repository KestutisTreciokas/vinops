-- 002_audit_api.sql — vinops-tg-bot S1-02
-- Создаёт API-функцию audit_log() и настраивает минимально-достаточные права.
-- Идемпотентно; безопасно к повторному прогону.
SET client_min_messages = WARNING;

-- 1) Функция: централизованный INSERT в tg_bot.audit
CREATE OR REPLACE FUNCTION tg_bot.audit_log(
  _tg_user_id BIGINT,
  _chat_id    BIGINT,
  _event      TEXT,
  _data       JSONB DEFAULT NULL
) RETURNS BIGINT
LANGUAGE plpgsql
AS $$
DECLARE
  _id BIGINT;
BEGIN
  INSERT INTO tg_bot.audit (tg_user_id, chat_id, event, data)
  VALUES (_tg_user_id, _chat_id, _event, COALESCE(_data, '{}'::jsonb))
  RETURNING id INTO _id;
  RETURN _id;
END;
$$;

COMMENT ON FUNCTION tg_bot.audit_log(BIGINT,BIGINT,TEXT,JSONB)
  IS 'Append-only audit insert API; returns inserted id';

-- 2) Роль для приложения (если ещё нет) — только для проверки политики в этом спринте
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname='tg_bot_rw') THEN
    CREATE ROLE tg_bot_rw NOLOGIN;
  END IF;
END $$;

-- 3) Минимальные права: USAGE на схему + выборочные привилегии на таблицу audit
GRANT USAGE ON SCHEMA tg_bot TO tg_bot_rw;

-- Снять лишние права и выставить требуемые
REVOKE ALL ON tg_bot.audit FROM PUBLIC;
GRANT  SELECT, INSERT ON tg_bot.audit TO tg_bot_rw;
REVOKE UPDATE, DELETE ON tg_bot.audit FROM tg_bot_rw;

-- Для будущих объектов в схеме — чтобы не протухали права
ALTER DEFAULT PRIVILEGES IN SCHEMA tg_bot
  GRANT SELECT, INSERT ON TABLES TO tg_bot_rw;

-- 4) Комментарии-вехи
COMMENT ON TABLE  tg_bot.audit IS 'Append-only dialog audit (events)';
COMMENT ON SCHEMA tg_bot       IS 'Vinops Telegram bot schema (users, sessions, audit)';
