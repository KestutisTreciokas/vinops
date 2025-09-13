#!/usr/bin/env bash
set -euo pipefail
FORMAT="${1:-custom}"
set -a; source .env; set +a
mkdir -p backups
TS="$(date +%F-%H%M%S)"
FILE="backups/${DB_NAME}-${TS}.$([ "$FORMAT" = custom ] && echo dump || echo sql)"
echo "[i] Dumping $DB_NAME -> $FILE"
if [ "$FORMAT" = custom ]; then
  docker compose exec -T db pg_dump -U "$DB_USER" -d "$DB_NAME" -Fc > "$FILE"
else
  docker compose exec -T db pg_dump -U "$DB_USER" -d "$DB_NAME" > "$FILE"
fi
ls -lh "$FILE"
echo "[ok] Done"
