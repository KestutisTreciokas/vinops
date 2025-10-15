#!/usr/bin/env bash
set -euo pipefail
TZ="Europe/Warsaw"

HOSTADDR="192.168.0.5"
HOSTNAME="418a052549dc7dac1163fd68.twc1.net"
PORT="5432"
DBNAME="vinops"
OWNER_USER="gen_user"
OWNER_PASS_FILE="/srv/vinops/secure/pg_gen_user.password"
CA_FILE="/etc/vinops/pg/ca.crt"

# pick psql
if [[ -x /usr/lib/postgresql/17/bin/psql ]]; then PSQL="/usr/lib/postgresql/17/bin/psql"; else PSQL="$(command -v psql)"; fi

echo "[TS Warsaw] $(date '+%F %H:%M')]"
echo "[INFO] owner user: $OWNER_USER"
echo "[INFO] using CA: $CA_FILE"
if [[ ! -r "$OWNER_PASS_FILE" ]]; then echo "[ERR] owner password not found: $OWNER_PASS_FILE" >&2; exit 2; fi

OWNER_PASS="$(cat "$OWNER_PASS_FILE")"

# 1) Применяем необходимые права от имени владельца БД
PGPASSWORD="$OWNER_PASS" "$PSQL" -X -v ON_ERROR_STOP=1 -P pager=off \
  "hostaddr=$HOSTADDR host=$HOSTNAME port=$PORT dbname=$DBNAME user=$OWNER_USER sslmode=verify-full sslrootcert=$CA_FILE" <<'SQL'
-- базовый доступ к БД
GRANT CONNECT ON DATABASE vinops TO etl_rw;

-- доступ к объектам аудита (идемпотентно)
GRANT USAGE ON SCHEMA tg_bot TO etl_rw;
GRANT SELECT ON TABLE tg_bot.audit TO etl_rw;
GRANT USAGE, SELECT ON SEQUENCE tg_bot.audit_id_seq TO etl_rw;
SQL

# 2) Контроль: CONNECT появился?
PGPASSWORD="$OWNER_PASS" "$PSQL" -X -v ON_ERROR_STOP=1 -P pager=off \
  "hostaddr=$HOSTADDR host=$HOSTNAME port=$PORT dbname=$DBNAME user=$OWNER_USER sslmode=verify-full sslrootcert=$CA_FILE" \
  -c "select has_database_privilege('etl_rw', '$DBNAME', 'CONNECT') as etl_can_connect_after;"
