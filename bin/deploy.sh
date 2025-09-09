#!/usr/bin/env bash
set -euo pipefail
TAG="${1:-prod}"
ENV_FILE="${2:-.env}"
info() { printf "\033[1;34m[i]\033[0m %s\n" "$*"; }
warn() { printf "\033[1;33m[!]\033[0m %s\n" "$*"; }
err()  { printf "\033[1;31m[x]\033[0m %s\n" "$*" >&2; }
if [ ! -f "$ENV_FILE" ]; then err "ENV file not found: $ENV_FILE"; exit 1; fi
set -a; source "$ENV_FILE"; set +a
if [ "$TAG" != "prod" ]; then export WEB_IMAGE_TAG="$TAG"; export API_IMAGE_TAG="$TAG"; fi
info "Deploying vinops (web tag: ${WEB_IMAGE_TAG:-prod}, api tag: ${API_IMAGE_TAG:-prod}) using env: $ENV_FILE"
if ! docker login ghcr.io >/dev/null 2>&1; then warn "Not logged in to ghcr.io (ok if images are public)."; fi
info "Pull images..."
docker compose --env-file "$ENV_FILE" pull db || true
docker compose --env-file "$ENV_FILE" pull api web
info "Start/Update DB..."
docker compose --env-file "$ENV_FILE" up -d db
info "Start/Update API & WEB..."
docker compose --env-file "$ENV_FILE" up -d api web
info "Run migrations (if any)..."
docker compose --env-file "$ENV_FILE" exec -T api sh -lc '
  (npm run migrate) || \
  (npm run prisma:migrate-deploy) || \
  (npx --yes prisma migrate deploy) || \
  (node dist/migrate.js) || \
  true
'
info "Services status:"
docker compose --env-file "$ENV_FILE" ps
info "Done."
