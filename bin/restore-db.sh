#!/usr/bin/env bash
set -euo pipefail
FILE="${1:-}"
[ -f "$FILE" ] || { echo "[x] File not found: $FILE"; exit 1; }
set -a; source .env; set +a
echo "[! ] WARNING: restoring into $DB_NAME will overwrite objects."
read -p "Type YES to continue: " A; [ "$A" = "YES" ] || { echo "Aborted"; exit 1; }
EXT="${FILE##*.}"
if [ "$EXT" = "dump" ]; then
  docker compose exec -T db pg_restore -U "$DB_USER" -d "$DB_NAME" --clean --if-exists < "$FILE"
else
  docker compose exec -T db psql -U "$DB_USER" -d "$DB_NAME" < "$FILE"
fi
echo "[ok] Restore completed"
