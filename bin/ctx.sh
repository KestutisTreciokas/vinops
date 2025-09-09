#!/usr/bin/env bash
set -euo pipefail
TS="$(date +%F-%H%M%S)"
OUT="context/context-${TS}.txt"
mkdir -p context
{
  echo "== VINOPS CONTEXT (${TS}) =="; echo
  echo "== GIT =="; git rev-parse --short HEAD 2>/dev/null || true
  git status -sb 2>/dev/null || true; git log --oneline -n 10 2>/dev/null || true
  echo; echo "== TREE (L2) =="
  if command -v tree >/dev/null 2>&1; then tree -L 2; else find . -maxdepth 2 -type d -print; fi
  echo; echo "== DOCKER COMPOSE (resolved) =="
  docker compose --env-file .env config 2>/dev/null || true
  echo; echo "== DOCKER IMAGES (top) =="
  docker images | head -n 20
  echo; echo "== DOCKER PS =="
  docker compose ps
  echo; echo "== API last 50 lines =="
  docker compose logs --tail 50 api 2>/dev/null || true
  echo; echo "== WEB last 50 lines =="
  docker compose logs --tail 50 web 2>/dev/null || true
} > "$OUT"
echo "Saved: $OUT"
