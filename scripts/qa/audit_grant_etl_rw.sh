#!/usr/bin/env bash
set -euo pipefail
TZ="Europe/Warsaw"

# Коннект «как у сервиса», но админским пользователем
HOSTADDR="192.168.0.5"
HOSTNAME="418a052549dc7dac1163fd68.twc1.net"
PORT="5432"
DBNAME="vinops"
ADMIN_USER="db_admin"
CA_FILE="/etc/vinops/pg/ca.crt"

# Где искать пароль админа (жёсткие пути)
PASS_FILES=(
  "/srv/vinops/secure/pg_db_admin.password"
  "/srv/vinops/secure/db_admin.password"
)

pick_psql() {
  if [[ -x /usr/lib/postgresql/17/bin/psql ]]; then
    echo /usr/lib/postgresql/17/bin/psql
  else
    command -v psql || true
  fi
}

main() {
  echo "[TS Warsaw] $(date '+%F %H:%M')]"

  if [[ ! -r "$CA_FILE" ]]; then
    echo "[ERR] missing CA: $CA_FILE" >&2
    exit 2
  fi

  local PASS=""
  for f in "${PASS_FILES[@]}"; do
    if [[ -r "$f" ]]; then PASS="$(cat "$f")"; break; fi
  done
  if [[ -z "$PASS" ]]; then
    echo "[ERR] admin password file not found: ${PASS_FILES[*]}" >&2
    exit 3
  fi

  local PSQL; PSQL="$(pick_psql)"
  if [[ -z "${PSQL}" ]]; then
    echo "[ERR] psql not found" >&2
    exit 4
  fi

  echo "[INFO] using CA: $CA_FILE"
  echo "[INFO] admin user: $ADMIN_USER"
  echo "[INFO] connecting verify-full to $HOSTADDR ($HOSTNAME)"

  # Применяем привилегии (идемпотентно). Важно: sequence для INSERT default.
  PGPASSWORD="$PASS" "$PSQL" -X -v ON_ERROR_STOP=1 -P pager=off \
    "hostaddr=$HOSTADDR host=$HOSTNAME port=$PORT dbname=$DBNAME user=$ADMIN_USER sslmode=verify-full sslrootcert=$CA_FILE" <<'SQL'
SET client_min_messages=WARNING;
GRANT CONNECT ON DATABASE vinops TO etl_rw;
GRANT USAGE   ON SCHEMA tg_bot TO etl_rw;
GRANT SELECT, INSERT ON tg_bot.audit TO etl_rw;
GRANT USAGE ON SEQUENCE tg_bot.audit_id_seq TO etl_rw;
SQL

  echo "[OK] grants applied for role etl_rw"
}
main "$@"
