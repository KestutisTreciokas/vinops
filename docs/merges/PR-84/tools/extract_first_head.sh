#!/usr/bin/env bash
set +e +u
IN="$1"; OUT="$2"
[ -f "$IN" ] || { : > "$OUT"; exit 0; }
sed -n '/<head[ >]/I,/<\/head>/Ip' "$IN" > "$OUT" || : > "$OUT"
