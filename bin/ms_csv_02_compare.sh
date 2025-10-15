#!/usr/bin/env bash
set +e +u
APP_ROOT="/root/work/vinops.restore"
HAR1="$APP_ROOT/evidence/CSV_HAR_run1.har"
HAR2="$APP_ROOT/evidence/CSV_HAR_run2.har"
CSV1="$APP_ROOT/samples/run1.csv"
CSV2="$APP_ROOT/samples/run2.csv"
OUT_EVOL="$APP_ROOT/evidence/CSV_URL_EVOLUTION.md"
OUT_DIFF="$APP_ROOT/evidence/CSV_DIFF.md"

ts(){ TZ="Europe/Warsaw" date '+%F %H:%M %Z'; }

echo "[TS $(ts)] ms_csv_02_compare: start"

# Проверки наличия
for f in "$HAR1" "$HAR2" "$CSV1" "$CSV2"; do
  if [ ! -s "$f" ]; then
    echo "[ERR] Missing file: $f"
  fi
done

# Извлекаем данные из HAR
J1="$(node "$APP_ROOT/bin/csv_har_extract2.js" "$HAR1" 2>/dev/null)"
J2="$(node "$APP_ROOT/bin/csv_har_extract2.js" "$HAR2" 2>/dev/null)"
URL1="$(echo "$J1" | jq -r '.final.url // "UNKNOWN"')"
URL2="$(echo "$J2" | jq -r '.final.url // "UNKNOWN"')"
CLS1="$(echo "$J1" | jq -r '.final.classification // "UNKNOWN"')"
CLS2="$(echo "$J2" | jq -r '.final.classification // "UNKNOWN"')"
T1="$(echo "$J1" | jq -r '.final.t // "UNKNOWN"')"
T2="$(echo "$J2" | jq -r '.final.t // "UNKNOWN"')"

SAME_URL="UNKNOWN"
if [ "$URL1" != "UNKNOWN" ] && [ "$URL2" != "UNKNOWN" ]; then
  if [ "$URL1" = "$URL2" ]; then SAME_URL="SAME"; else SAME_URL="DIFFERENT"; fi
fi

{
  echo "# CSV URL Evolution — $(ts)"
  echo "- run1.final_url: \`$URL1\`"
  echo "- run1.classification: $CLS1"
  echo "- run1.time: $T1"
  echo "- run2.final_url: \`$URL2\`"
  echo "- run2.classification: $CLS2"
  echo "- run2.time: $T2"
  echo "- URL behavior: **$SAME_URL**"
} > "$OUT_EVOL"

# Сводка по CSV-файлам
sha1="$(command -v sha256sum >/dev/null && echo sha256sum || echo shasum -a 256)"
H1="$($sha1 "$CSV1" 2>/dev/null | awk '{print $1}')"
H2="$($sha1 "$CSV2" 2>/dev/null | awk '{print $1}')"
B1="$(wc -c < "$CSV1" 2>/dev/null || echo 0)"
B2="$(wc -c < "$CSV2" 2>/dev/null || echo 0)"
L1="$(wc -l < "$CSV1" 2>/dev/null || echo 0)"
L2="$(wc -l < "$CSV2" 2>/dev/null || echo 0)"

UPDATED="UNKNOWN"
if [ -n "$H1" ] && [ -n "$H2" ]; then
  if [ "$H1" != "$H2" ] || [ "$B1" != "$B2" ] || [ "$L1" != "$L2" ]; then
    UPDATED="YES"
  else
    UPDATED="NO (content identical by hash/size/lines)"
  fi
fi

{
  echo "# CSV DIFF — $(ts)"
  echo "## Files"
  echo "- run1.csv: bytes=$B1 lines=$L1 sha256=$H1"
  echo "- run2.csv: bytes=$B2 lines=$L2 sha256=$H2"
  echo "## Observed update"
  echo "- updated: **$UPDATED**"
} > "$OUT_DIFF"

echo "[OK] Written: $OUT_EVOL, $OUT_DIFF"
echo "[TS $(ts)] ms_csv_02_compare: done"
