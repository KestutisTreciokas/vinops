#!/usr/bin/env bash
set -euo pipefail
TZ="Europe/Warsaw"

CA="/etc/vinops/pg/ca.crt"
HOSTADDR="192.168.0.5"
HOSTSNI="418a052549dc7dac1163fd68.twc1.net"
PORT=5432

PASS_GEN="/srv/vinops/secure/pg_gen_user.password"
PASS_DBA="/srv/vinops/secure/pg_db_admin.password"

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
    echo "[ERR] psql 17 not available" >&2; exit 1
  fi
}

choose_identity () {
  for p in "${AGE_KEY_FILE:-}" "/root/.config/age/keys.txt" "/root/.config/sops/age/keys.txt" "/srv/vinops/age/keys.txt"; do
    if [ -n "${p:-}" ] && [ -s "$p" ]; then echo "$p"; return 0; fi
  done
  return 1
}

AGE_FILE="${1:-}"
[ -n "$AGE_FILE" ] && [ -s "$AGE_FILE" ] || { echo "[ERR] usage: $0 /path/to/vinops_tg_bot_<TS>.sql.gz.age" >&2; exit 1; }

TS="$(date +%Y%m%d_%H%M%S)"                 # безопасный TS без дефисов
DB="vinops_restore_tg_bot_${TS}"            # имя новой temp-БД

# 1) создаём БД под db_admin с явным OWNER db_admin
[ -s "$PASS_DBA" ] || { echo "[ERR] $PASS_DBA missing" >&2; exit 1; }
CONN_ADMIN="hostaddr=${HOSTADDR} host=${HOSTSNI} port=${PORT} dbname=vinops user=db_admin sslmode=verify-full sslrootcert=${CA}"
PGPASSWORD="$(cat "$PASS_DBA")"
run_psql "$CONN_ADMIN" -c "CREATE DATABASE ${DB} WITH OWNER db_admin TEMPLATE template0"
# Базовая гигиена ACL: PUBLIC без CONNECT
run_psql "$CONN_ADMIN" -c "REVOKE ALL ON DATABASE ${DB} FROM PUBLIC"
# Даем доступ участникам процесса
run_psql "$CONN_ADMIN" -c "GRANT CONNECT, CREATE, TEMP ON DATABASE ${DB} TO gen_user"
run_psql "$CONN_ADMIN" -c "GRANT CONNECT ON DATABASE ${DB} TO db_admin"

# 2) дешифруем дамп
ID="$(choose_identity)" || { echo "[ERR] age identity not found" >&2; exit 1; }
TMP_GZ="/tmp/restore_${TS}.sql.gz"
TMP_SQL="/tmp/restore_${TS}.sql"
age -d -i "$ID" -o "$TMP_GZ" "$AGE_FILE"
gzip -d "$TMP_GZ"

# 3) восстанавливаем под gen_user в созданную БД (объекты получат владельца gen_user)
[ -s "$PASS_GEN" ] || { echo "[ERR] $PASS_GEN missing" >&2; exit 1; }
CONN_RESTORE="hostaddr=${HOSTADDR} host=${HOSTSNI} port=${PORT} dbname=${DB} user=gen_user sslmode=verify-full sslrootcert=${CA}"
PGPASSWORD="$(cat "$PASS_GEN")"
run_psql "$CONN_RESTORE" -f "$TMP_SQL"
rm -f "$TMP_SQL"

# 4) smoke
run_psql "$CONN_RESTORE" -c "select count(*) as audit_rows from tg_bot.audit"
run_psql "$CONN_RESTORE" -c "select id, chat_id, event, at from tg_bot.audit order by id desc limit 5"

echo "[OK] restored into ${DB}"
