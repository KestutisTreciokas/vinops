-- 003_roles.sql — vinops-tg-bot S1-03 (roles & privileges)
-- Goal: minimal sufficient privileges for tg_bot_rw.
-- Idempotent; safe to re-run.

SET client_min_messages = WARNING;

-- 0) Ensure role exists (group role, NOLOGIN)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname='tg_bot_rw') THEN
    CREATE ROLE tg_bot_rw NOLOGIN;
  END IF;
END$$;

-- 1) Schema privileges
GRANT USAGE ON SCHEMA tg_bot TO tg_bot_rw;

-- 2) Table privileges (explicit)
-- Users & sessions: SELECT, INSERT, UPDATE
GRANT SELECT, INSERT, UPDATE ON tg_bot.users    TO tg_bot_rw;
GRANT SELECT, INSERT, UPDATE ON tg_bot.sessions TO tg_bot_rw;

-- Audit: SELECT, INSERT only (no UPDATE/DELETE)
GRANT  SELECT, INSERT ON tg_bot.audit TO tg_bot_rw;
REVOKE UPDATE, DELETE ON tg_bot.audit FROM tg_bot_rw;

-- 3) Sequences needed for INSERT defaults (e.g., audit_id_seq)
DO $wrap$
DECLARE seqname text := 'tg_bot.audit_id_seq';
BEGIN
  IF EXISTS (SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
             WHERE n.nspname='tg_bot' AND c.relkind='S' AND c.relname='audit_id_seq') THEN
    EXECUTE 'GRANT USAGE, SELECT ON SEQUENCE '|| seqname ||' TO tg_bot_rw';
  END IF;
END
$wrap$;

-- 4) Default privileges for future objects in schema tg_bot.
--   Determine schema owner dynamically to alter their default ACL.
DO $acl$
DECLARE owner_name text;
BEGIN
  SELECT pg_get_userbyid(nspowner) INTO owner_name FROM pg_namespace WHERE nspname='tg_bot';
  IF owner_name IS NOT NULL THEN
    -- Tables: SELECT, INSERT, UPDATE for tg_bot_rw
    EXECUTE format('ALTER DEFAULT PRIVILEGES FOR ROLE %I IN SCHEMA tg_bot GRANT SELECT, INSERT, UPDATE ON TABLES TO tg_bot_rw', owner_name);
    -- Sequences: USAGE, SELECT
    EXECUTE format('ALTER DEFAULT PRIVILEGES FOR ROLE %I IN SCHEMA tg_bot GRANT USAGE, SELECT ON SEQUENCES TO tg_bot_rw', owner_name);
  END IF;
END
$acl$;

-- 5) Comments (documentation hints)
COMMENT ON ROLE tg_bot_rw IS 'Vinops tg-bot app role (group), minimal CRUD on tg_bot; audit is append-only';

-- End of 003_roles.sql
