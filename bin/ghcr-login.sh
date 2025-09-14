#!/usr/bin/env bash
set -euo pipefail
: "${GHCR_USER:=kestutistreciokas}"
read -s -p "GHCR_TOKEN (paste, hidden): " GHCR_TOKEN; echo
echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USER" --password-stdin
echo "[ok] Logged in as $GHCR_USER to ghcr.io"
