#!/usr/bin/env bash
set -euo pipefail
curl -sI https://vinops.online | sed -n '1p;/strict-transport-security/p'
curl -sI https://vinops.online/en | sed -n '1p;/cache-control/p'
docker compose -f /root/work/vinops.restore/docker-compose.prod.yml ps
docker compose -f /root/work/vinops.restore/docker-compose.prod.yml logs --since 5m --tail=50 web caddy | tail -n +1
