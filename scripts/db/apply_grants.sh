#!/usr/bin/env bash
set -euo pipefail

TZ="Europe/Warsaw"
CA="/etc/vinops/pg/ca.crt"
PASS_FILE="/srv/vinops/secure/pg_gen_user.password"
SQL="/root/work/vinops.restore/db/sql/grant_tg_bot_etl_rw.sql"
HOSTADDR="192.168.0.5"
HOSTSNI="418a052549dc7dac1163fd68.twc1.net"
DB="vinops"
USER="gen_user"

run_psql () {
  local conn="$1"; shift
  if [ -x /usr/lib/postgresql/17/bin/psql ]; then
    PGPASSWORD="$PGPASSWORD" /usr/lib/postgresql/17/bin/psql -X -v ON_ERROR_STOP=1 -P pager=off --dbname="$conn" "$@"
  elif command -v psql >/dev/null 2>&1 && psql --version 2>/dev/null | grep -q " 17\\."; then
    PGPASSWORD="$PGPASSWORD" psql -X -v ON_ERROR_STOP=1 -P pager=off --dbname="$conn" "$@"
  elif command -v docker >/dev/null 2>&1; then
    docker run --rm --network host -e PGPASSWORD="$PGPASSWORD" -v /etc/vinops/pg:/etc/vinops/pg:ro postgres:17 \
      psql -X -v ON_ERROR_STOP=1 -P pager=off --dbname="$conn" "$@"
  else
    echo "[ERR] psql 17 not available"; return 1
  fi
}

[ -s "$PASS_FILE" ] || { echo "[MISS] $PASS_FILE" >&2; exit 1; }
CONN="hostaddr=${HOSTADDR} host=${HOSTSNI} port=5432 dbname=${DB} user=${USER} sslmode=verify-full sslrootcert=${CA}"
PGPASSWORD="$(cat "$PASS_FILE")"

run_psql "$CONN" -f "$SQL"
echo "[OK] grants applied"
