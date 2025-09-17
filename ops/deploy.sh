#!/usr/bin/env bash
set -euo pipefail
cd /root/work/vinops.restore
git pull
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml ps
