-- 001_init.sql — vinops-tg-bot S1 (schema, tables, indexes, triggers)
-- Idempotent: safe to re-run. Target: PostgreSQL 14+ (server 17 planned).
SET client_min_messages = WARNING;

-- 0) Schema
CREATE SCHEMA IF NOT EXISTS tg_bot;

-- 1) Tables
CREATE TABLE IF NOT EXISTS tg_bot.users (
  tg_user_id   BIGINT PRIMARY KEY,
  username     TEXT NULL,
  lang         TEXT NOT NULL DEFAULT 'ru',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tg_bot.sessions (
  chat_id         BIGINT PRIMARY KEY,
  last_invoice_id BIGINT NULL,
  last_vin        TEXT NULL,
  state           JSONB NULL,
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tg_bot.audit (
  id         BIGSERIAL PRIMARY KEY,
  at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  tg_user_id BIGINT NULL,
  chat_id    BIGINT NULL,
  event      TEXT NOT NULL,
  data       JSONB NULL
);

-- 2) Trigger function (updated_at)
CREATE OR REPLACE FUNCTION tg_bot.tg_set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

-- 3) Triggers (create only if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'trg_users_updated_at'
      AND tgrelid = 'tg_bot.users'::regclass
  ) THEN
    CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON tg_bot.users
    FOR EACH ROW
    EXECUTE FUNCTION tg_bot.tg_set_updated_at();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'trg_sessions_updated_at'
      AND tgrelid = 'tg_bot.sessions'::regclass
  ) THEN
    CREATE TRIGGER trg_sessions_updated_at
    BEFORE UPDATE ON tg_bot.sessions
    FOR EACH ROW
    EXECUTE FUNCTION tg_bot.tg_set_updated_at();
  END IF;
END
$$;

-- 4) Indexes (IF NOT EXISTS)
CREATE INDEX IF NOT EXISTS idx_users_lang ON tg_bot.users (lang);
CREATE INDEX IF NOT EXISTS idx_sessions_updated_at ON tg_bot.sessions (updated_at);
CREATE INDEX IF NOT EXISTS idx_audit_at ON tg_bot.audit (at);
CREATE INDEX IF NOT EXISTS idx_audit_tg_user_id ON tg_bot.audit (tg_user_id);
CREATE INDEX IF NOT EXISTS idx_audit_chat_id ON tg_bot.audit (chat_id);
CREATE INDEX IF NOT EXISTS idx_audit_at_brin ON tg_bot.audit USING BRIN (at);

-- 5) Comments (useful for psql \d+)
COMMENT ON SCHEMA tg_bot IS 'Vinops Telegram bot schema (users, sessions, audit)';
COMMENT ON TABLE tg_bot.users IS 'Telegram users profile';
COMMENT ON TABLE tg_bot.sessions IS 'Dialog sessions and last actions';
COMMENT ON TABLE tg_bot.audit IS 'Append-only dialog audit (events)';

-- End of 001_init.sql
