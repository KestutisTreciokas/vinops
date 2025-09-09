#!/usr/bin/env bash
# Использование: ./bin/deploy.sh [TAG|SHA] [ENV_FILE]
set -euo pipefail

TAG="${1:-prod}"
ENV_FILE="${2:-.env}"

info() { printf "\033[1;34m[i]\033[0m %s\n" "$*"; }
warn() { printf "\033[1;33m[!]\033[0m %s\n" "$*"; }
err()  { printf "\033[1;31m[x]\033[0m %s\n" "$*" >&2; }

[ -f "$ENV_FILE" ] || { err "ENV file not found: $ENV_FILE"; exit 1; }
set -a; source "$ENV_FILE"; set +a

# Переключаем теги, если передали SHA/TAG
if [ "$TAG" != "prod" ]; then
  export WEB_IMAGE_TAG="$TAG"
  export API_IMAGE_TAG="$TAG"
fi

info "Deploying vinops (web tag: ${WEB_IMAGE_TAG:-prod}, api tag: ${API_IMAGE_TAG:-prod}) using env: $ENV_FILE"

# Не критично, если не залогинены (для public)
docker login ghcr.io >/dev/null 2>&1 || warn "Not logged in to ghcr.io (ok if images are public)."

# Pull образов. Если их ещё нет в GHCR — НЕ падаем.
info "Pull images..."
MISSING=0
docker compose --env-file "$ENV_FILE" pull db || true
docker compose --env-file "$ENV_FILE" pull api web || { warn "Images not found yet (ok before first CI build)"; MISSING=1; }

# База всегда поднимается
info "Start/Update DB..."
docker compose --env-file "$ENV_FILE" up -d db

# API/WEB поднимаем только если образы есть
if [ "$MISSING" -eq 0 ]; then
  info "Start/Update API & WEB..."
  docker compose --env-file "$ENV_FILE" up -d api web

  # Миграции (если есть скрипт)
  info "Run migrations (if any)..."
  docker compose --env-file "$ENV_FILE" exec -T api sh -lc '
    (npm run migrate) || \
    (npm run prisma:migrate-deploy) || \
    (npx --yes prisma migrate deploy) || \
    (node dist/migrate.js) || \
    true
  '
else
  warn "Skip API/WEB start: no images yet. Run this script again after CI builds."
fi

info "Services status:"
docker compose --env-file "$ENV_FILE" ps
info "Done."
