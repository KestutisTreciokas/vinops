#!/usr/bin/env bash
set -euo pipefail

TZ="Europe/Warsaw"

OUT_DIR="/root/work/vinops.restore/backup"
mkdir -p "$OUT_DIR"

CA="/etc/vinops/pg/ca.crt"
PASS_FILE="/srv/vinops/secure/pg_etl_rw.password"
RECIPIENT="age14gzudn5k6vfsgqr70z30ky6q2k8597a00e52ulxs2qs2jm0dhprqpeypza"

HOSTADDR="192.168.0.5"
HOSTSNI="418a052549dc7dac1163fd68.twc1.net"
DB="vinops"
USER="etl_rw"

run_pg_dump () {
  local conn="$1"
  if [ -x /usr/lib/postgresql/17/bin/pg_dump ]; then
    PGPASSWORD="$PGPASSWORD" /usr/lib/postgresql/17/bin/pg_dump --format=plain --no-owner --no-privileges --schema=tg_bot --dbname="$conn"
  elif command -v pg_dump >/dev/null 2>&1 && pg_dump --version 2>/dev/null | grep -q " 17\\."; then
    PGPASSWORD="$PGPASSWORD" pg_dump --format=plain --no-owner --no-privileges --schema=tg_bot --dbname="$conn"
  elif command -v docker >/dev/null 2>&1; then
    docker run --rm --network host -e PGPASSWORD="$PGPASSWORD" -v /etc/vinops/pg:/etc/vinops/pg:ro postgres:17 \
      pg_dump --format=plain --no-owner --no-privileges --schema=tg_bot --dbname="$conn"
  else
    echo "[ERR] pg_dump 17 not available"; return 1
  fi
}

[ -s "$PASS_FILE" ] || { echo "[MISS] $PASS_FILE" >&2; exit 1; }

TS="$(date +%F_%H%M%S)"
PLAIN="/tmp/vinops_tg_bot_${TS}.sql"
GZ="${PLAIN}.gz"
AGE="${OUT_DIR}/vinops_tg_bot_${TS}.sql.gz.age"

CONN="hostaddr=${HOSTADDR} host=${HOSTSNI} port=5432 dbname=${DB} user=${USER} sslmode=verify-full sslrootcert=${CA}"
PGPASSWORD="$(cat "$PASS_FILE")"

run_pg_dump "$CONN" > "$PLAIN"
gzip -9 "$PLAIN"
age -r "$RECIPIENT" -o "$AGE" "$GZ"
rm -f "$GZ"

echo "[OK] backup: ${AGE}"
