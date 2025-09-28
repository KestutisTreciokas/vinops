#!/usr/bin/env bash
set +e +u
JSON="$1"
if [ ! -s "$JSON" ]; then echo "errors: PARSE_FAIL"; echo "warnings: PARSE_FAIL"; exit 0; fi
ERR=$(grep -o '"severity"[[:space:]]*:[[:space:]]*"error"' "$JSON" | wc -l | tr -d '[:space:]')
WRN=$(grep -o '"severity"[[:space:]]*:[[:space:]]*"warn"'  "$JSON" | wc -l | tr -d '[:space:]')
echo "errors: $ERR"; echo "warnings: $WRN"
