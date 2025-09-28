#!/usr/bin/env bash
set +e +u
FILE="${1:-contracts/openapi.yaml}"
OUT_JSON="${2:-docs/merges/PR-84/openapi-lint.current.json}"
OUT_SUM="${3:-docs/merges/PR-84/openapi-lint.summary.txt}"
mkdir -p "$(dirname "$OUT_JSON")" || true
# Запуск в Node 20.19; убираем цвет/телеметрию; вырезаем чистый JSON между первой '{' и последней '}'
docker run --rm -t -v "$PWD:/work" -w /work \
  -e NO_COLOR=1 -e REDOCLY_TELEMETRY=off -e CI=1 \
  node:20.19-bullseye bash -lc '
    npx -y @redocly/cli@2.2.2 lint --format json '"$FILE"' \
      | awk "BEGIN{p=0} /^\{/ {p=1} p{print} END{if(p==0) exit 5}" \
      > '"$OUT_JSON"' ;
    npx -y @redocly/cli@2.2.2 lint --format summary '"$FILE"' > '"$OUT_SUM"'
  '
RC=$?
# Вывести итог по JSON (без jq)
if [ -s "$OUT_JSON" ]; then
  ERR=$(grep -o '"severity"[[:space:]]*:[[:space:]]*"error"' "$OUT_JSON" | wc -l | tr -d '[:space:]')
  WRN=$(grep -o '"severity"[[:space:]]*:[[:space:]]*"warn"'  "$OUT_JSON" | wc -l | tr -d '[:space:]')
  echo "errors: $ERR"
  echo "warnings: $WRN"
else
  echo "errors: PARSE_FAIL"
  echo "warnings: PARSE_FAIL"
fi
exit 0
