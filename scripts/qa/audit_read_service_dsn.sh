#!/usr/bin/env bash
set -euo pipefail

TZ="Europe/Warsaw"
ENV_FILE="/etc/vinops/tg-webhook.env"
SRV_JS="/srv/vinops/tg-webhook/server.js"

mask_dsn() { printf '%s' "$1" | sed -E 's#(postgres://)[^:/]+:[^@]+@#\1***:***@#'; }

pick_psql() {
  if [[ -x /usr/lib/postgresql/17/bin/psql ]]; then echo /usr/lib/postgresql/17/bin/psql
  else command -v psql || true
  fi
}

# 0) Инициализация
SRC=""
DSN=""

# 1) Пробуем env-file
if [[ -f "$ENV_FILE" ]]; then
  # shellcheck disable=SC1090
  . "$ENV_FILE"
  [[ -n "${POSTGRES_DSN:-}" ]] && { DSN="$POSTGRES_DSN"; SRC="env-file:$ENV_FILE"; }
  [[ -z "$DSN" && -n "${DATABASE_URL:-}" ]] && { DSN="$DATABASE_URL"; SRC="env-file:$ENV_FILE"; }
fi

# 2) Если пусто — пробуем окружение процесса сервиса
if [[ -z "$DSN" ]]; then
  MPID="$(systemctl show tg-webhook.service -p MainPID --value 2>/dev/null || true)"
  if [[ -n "$MPID" && -r "/proc/$MPID/environ" ]]; then
    KVS="$(tr '\0' '\n' < "/proc/$MPID/environ")"
    DSN="$(printf '%s\n' "$KVS" | awk -F= '/^POSTGRES_DSN=/{sub(/^POSTGRES_DSN=/,"");print;exit}')"
    [[ -z "$DSN" ]] && DSN="$(printf '%s\n' "$KVS" | awk -F= '/^DATABASE_URL=/{sub(/^DATABASE_URL=/,"");print;exit}')"
    [[ -n "$DSN" ]] && SRC="proc:/proc/$MPID/environ"
  fi
fi

# 3) Если всё ещё пусто — строим conn из тех же источников, что в server.js
if [[ -z "$DSN" ]]; then
  # Жёсткие источники из server.js
  HOSTADDR="$(sed -n "s/.*host:[[:space:]]*'\\([^']\\+\\)'.*/\\1/p" "$SRV_JS" | head -n1)"
  PORT="$(sed -n 's/.*port:[[:space:]]*\\([0-9]\\+\\).*/\\1/p' "$SRV_JS" | head -n1)"
  DBNAME="$(sed -n "s/.*database:[[:space:]]*'\\([^']\\+\\)'.*/\\1/p" "$SRV_JS" | head -n1)"
  DBUSER="$(sed -n "s/.*user:[[:space:]]*'\\([^']\\+\\)'.*/\\1/p" "$SRV_JS" | head -n1)"
  PASS_FILE="$(sed -n "s/.*safeRead('\\([^']\\+pg_.*\\.password\\)').*/\\1/p" "$SRV_JS" | head -n1)"
  CA_FILE="$(sed -n "s/.*safeRead('\\([^']\\+\\/pg\\/ca\\.crt\\)').*/\\1/p" "$SRV_JS" | head -n1)"
  SNI_HOST="$(sed -n "s/.*servername:[[:space:]]*'\\([^']\\+\\)'.*/\\1/p" "$SRV_JS" | head -n1)"

  [[ -z "$HOSTADDR" || -z "$DBNAME" || -z "$DBUSER" || -z "$PASS_FILE" || -z "$CA_FILE" || -z "$SNI_HOST" ]] && {
    echo "[ERR] Не удалось распарсить DB-конфиг из $SRV_JS" >&2; exit 2; }

  [[ -r "$PASS_FILE" ]] || { echo "[ERR] нет доступа к паролю $PASS_FILE" >&2; exit 2; }
  [[ -r "$CA_FILE"   ]] || { echo "[ERR] нет доступа к CA $CA_FILE" >&2; exit 2; }

  # psql/libpq: пароль лучше через env, а строку — в kv-формате
  export PGPASSWORD="$(cat "$PASS_FILE")"
  DSN="hostaddr=$HOSTADDR host=$SNI_HOST port=${PORT:-5432} dbname=$DBNAME user=$DBUSER sslmode=verify-full sslrootcert=$CA_FILE"
  SRC="derived:$SRV_JS + $PASS_FILE + $CA_FILE"
fi

[[ -z "$DSN" ]] && { echo "[ERR] DSN не найден/не собран" >&2; exit 2; }

PSQL="$(pick_psql)"; [[ -n "$PSQL" ]] || { echo "[ERR] psql не найден" >&2; exit 3; }

echo "[TS Warsaw] $(date '+%F %H:%M')]"
echo "[INFO] источник DSN: $SRC"
echo "[INFO] DSN(libpq kv): $(printf '%s' "$DSN" | sed -E "s/(user=)[^ ]+/\1***/; s/(sslrootcert=)\\S+/\\1.../")"

# Q1: агрегат DoD-событий за 24ч
echo "[Q1] counts by expected events (24h)"
"$PSQL" -X -v ON_ERROR_STOP=1 -P pager=off --dbname="$DSN" \
  -c "select event, count(*) as cnt
      from tg_bot.audit
      where at >= now() - interval '24 hours'
        and event in ('BOT_START','VIN_ENTERED','VIN_VALIDATION_FAILED','INVOICE_OPENED')
      group by 1 order by 1;"

# Q2: последние 12 записей
echo "[Q2] last 12 rows"
"$PSQL" -X -v ON_ERROR_STOP=1 -P pager=off --dbname="$DSN" \
  -c "select id, at, event, chat_id,
             nullif(data->>'vin','')       as vin,
             nullif(data->>'invoice_id','') as invoice_id
      from tg_bot.audit
      order by id desc limit 12;"
