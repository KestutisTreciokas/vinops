#!/usr/bin/env sh
# Usage: extract_heads.sh <full.html> <head.out>
set +e
IN="$1"; OUT="$2"
[ -f "$IN" ] || { : > "${OUT:-/dev/null}"; exit 0; }
[ -n "$OUT" ] || { exit 0; }
START=$(grep -inm1 '<head[ >]' "$IN" | head -n1 | cut -d: -f1)
[ -z "$START" ] && { : > "$OUT"; exit 0; }
TAIL_START=$((START))
# ищем конец после START
END_REL=$(tail -n +"$TAIL_START" "$IN" | grep -inm1 '</head>' | head -n1 | cut -d: -f1)
[ -z "$END_REL" ] && { : > "$OUT"; exit 0; }
END=$((START + END_REL - 1))
sed -n "${START},${END}p" "$IN" > "$OUT"
exit 0
