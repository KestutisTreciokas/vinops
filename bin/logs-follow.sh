#!/usr/bin/env bash
set -euo pipefail
SVC="${1:-all}"
case "$SVC" in
  all) docker compose logs -f;;
  api|web|db) docker compose logs -f "$SVC";;
  *) echo "Usage: $0 [api|web|db|all]"; exit 1;;
esac
