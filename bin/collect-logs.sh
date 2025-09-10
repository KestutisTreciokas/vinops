#!/usr/bin/env bash
set -euo pipefail
SVC="${1:-api}"
LINES="${2:-200}"
TS="$(date +%F-%H%M%S)"
OUT="context/${SVC}-logs-${TS}.log"
mkdir -p context
docker compose logs --tail "$LINES" "$SVC" | tee "$OUT"
echo "Saved logs: $OUT"
