# SECRETS_RUNTIME_EVIDENCE — Vinops
_Generated: 2025-10-15 02:57 (Europe/Warsaw)_

Ниже — наблюдаемые значения из рантайма с маскировкой (sha256/len), статусы `found/not-found`, и возможные конфликты между источниками.

### CF_API_TOKEN
- ENVFILE: NOT_FOUND
- /proc/22164: NOT_FOUND
- container:caddy : NOT_FOUND
- container:web   : NOT_FOUND
- container:dev   : NOT_FOUND
- **STATUS:** not-found
- **CONFLICTS:** none

### CF_ZONE_ID
- ENVFILE: NOT_FOUND
- /proc/22164: NOT_FOUND
- container:caddy : NOT_FOUND
- container:web   : NOT_FOUND
- container:dev   : NOT_FOUND
- **STATUS:** not-found
- **CONFLICTS:** none

### PUBLIC_IMG_DOMAIN
- ENVFILE: NOT_FOUND
- /proc/22164: NOT_FOUND
- container:caddy : NOT_FOUND
- container:web   : NOT_FOUND
- container:dev   : NOT_FOUND
- **STATUS:** not-found
- **CONFLICTS:** none

### R2_ACCOUNT_ID
- ENVFILE: NOT_FOUND
- /proc/22164: NOT_FOUND
- container:caddy : NOT_FOUND
- container:web   : NOT_FOUND
- container:dev   : NOT_FOUND
- **STATUS:** not-found
- **CONFLICTS:** none

### R2_ACCESS_KEY_ID
- ENVFILE: NOT_FOUND
- /proc/22164: NOT_FOUND
- container:caddy : NOT_FOUND
- container:web   : NOT_FOUND
- container:dev   : NOT_FOUND
- **STATUS:** not-found
- **CONFLICTS:** none

### R2_SECRET_ACCESS_KEY
- ENVFILE: NOT_FOUND
- /proc/22164: NOT_FOUND
- container:caddy : NOT_FOUND
- container:web   : NOT_FOUND
- container:dev   : NOT_FOUND
- **STATUS:** not-found
- **CONFLICTS:** none

### R2_BUCKET
- ENVFILE: NOT_FOUND
- /proc/22164: NOT_FOUND
- container:caddy : NOT_FOUND
- container:web   : NOT_FOUND
- container:dev   : NOT_FOUND
- **STATUS:** not-found
- **CONFLICTS:** none

### POSTGRES_DSN
- ENVFILE: NOT_FOUND
- /proc/22164: NOT_FOUND
- container:caddy : NOT_FOUND
- container:web   : NOT_FOUND
- container:dev   : NOT_FOUND
- **STATUS:** not-found
- **CONFLICTS:** none

### APP_BASE_URL
- ENVFILE: NOT_FOUND
- /proc/22164: NOT_FOUND
- container:caddy : NOT_FOUND
- container:web   : NOT_FOUND
- container:dev   : NOT_FOUND
- URL probe: url=EMPTY
- **STATUS:** not-found
- **CONFLICTS:** none

### SENTRY_DSN
- ENVFILE: NOT_FOUND
- /proc/22164: NOT_FOUND
- container:caddy : NOT_FOUND
- container:web   : NOT_FOUND
- container:dev   : NOT_FOUND
- **STATUS:** not-found
- **CONFLICTS:** none

### BOT_TOKEN
- ENVFILE: NOT_FOUND
- /proc/22164: NOT_FOUND
- container:caddy : NOT_FOUND
- container:web   : NOT_FOUND
- container:dev   : NOT_FOUND

- secure:/srv/vinops/secure/bot_token.secret sha256=a933b15ec816154419f6a1591fec7a919f91f1f5481701c8694538abc92230ca len=47
- **STATUS:** found
- **CONFLICTS:** none

### BOT_TOKEN(Alert_bot)
- ENVFILE: NOT_FOUND
- /proc/22164: NOT_FOUND
- container:caddy : NOT_FOUND
- container:web   : NOT_FOUND
- container:dev   : NOT_FOUND
- **STATUS:** not-found
- **CONFLICTS:** none

### WEBHOOK_PUBLIC_URL
- ENVFILE: sha256=5227011b5d2f7ac3d742c8c3c6462079b38a5c81959158dc4be73785a083caf1 len=35
- /proc/22164: sha256=5227011b5d2f7ac3d742c8c3c6462079b38a5c81959158dc4be73785a083caf1 len=35
- container:caddy : NOT_FOUND
- container:web   : NOT_FOUND
- container:dev   : NOT_FOUND
- URL probe: dns=[2606:4700:3030::6815:196d 2606:4700:3033::ac43:8608] http_code=403
- **STATUS:** found
- **CONFLICTS:** none

### WEBHOOK_SECRET
- ENVFILE: sha256=914589bfe69e94954ab91ba8da5264569f5a6902bd72f58586dc7b8f9de06cf1 len=32
- /proc/22164: sha256=914589bfe69e94954ab91ba8da5264569f5a6902bd72f58586dc7b8f9de06cf1 len=32
- container:caddy : NOT_FOUND
- container:web   : NOT_FOUND
- container:dev   : NOT_FOUND

- secure:/srv/vinops/secure/tg_webhook.secret sha256=914589bfe69e94954ab91ba8da5264569f5a6902bd72f58586dc7b8f9de06cf1 len=32
- **STATUS:** found
- **CONFLICTS:** none

### WEBAPP_BASE_URL
- ENVFILE: sha256=e8fe8d46193aaf4fb7f9de778a3e705125084db93c05ca2af8f6ca16f1d671c0 len=29
- /proc/22164: sha256=e8fe8d46193aaf4fb7f9de778a3e705125084db93c05ca2af8f6ca16f1d671c0 len=29
- container:caddy : NOT_FOUND
- container:web   : NOT_FOUND
- container:dev   : NOT_FOUND
- URL probe: dns=[2606:4700:3033::ac43:8608 2606:4700:3030::6815:196d] http_code=404
- **STATUS:** found
- **CONFLICTS:** none

### TELEGRAM_INITDATA_HMAC_KEY
- ENVFILE: NOT_FOUND
- /proc/22164: NOT_FOUND
- container:caddy : NOT_FOUND
- container:web   : NOT_FOUND
- container:dev   : NOT_FOUND
- **STATUS:** not-found
- **CONFLICTS:** none

### CSRF_SECRET
- ENVFILE: NOT_FOUND
- /proc/22164: NOT_FOUND
- container:caddy : NOT_FOUND
- container:web   : NOT_FOUND
- container:dev   : NOT_FOUND
- **STATUS:** not-found
- **CONFLICTS:** none

### STATUS_WEBHOOK_HMAC_SECRET
- ENVFILE: NOT_FOUND
- /proc/22164: NOT_FOUND
- container:caddy : NOT_FOUND
- container:web   : NOT_FOUND
- container:dev   : NOT_FOUND
- **STATUS:** not-found
- **CONFLICTS:** none

### GH_PAT
- ENVFILE: NOT_FOUND
- /proc/22164: NOT_FOUND
- container:caddy : NOT_FOUND
- container:web   : NOT_FOUND
- container:dev   : NOT_FOUND
- **STATUS:** not-found
- **CONFLICTS:** none

### REGISTRY_USER
- ENVFILE: NOT_FOUND
- /proc/22164: NOT_FOUND
- container:caddy : NOT_FOUND
- container:web   : NOT_FOUND
- container:dev   : NOT_FOUND
- **STATUS:** not-found
- **CONFLICTS:** none

### REGISTRY_PASSWORD
- ENVFILE: NOT_FOUND
- /proc/22164: NOT_FOUND
- container:caddy : NOT_FOUND
- container:web   : NOT_FOUND
- container:dev   : NOT_FOUND
- **STATUS:** not-found
- **CONFLICTS:** none

### SSH_DEPLOY_HOST
- ENVFILE: NOT_FOUND
- /proc/22164: NOT_FOUND
- container:caddy : NOT_FOUND
- container:web   : NOT_FOUND
- container:dev   : NOT_FOUND
- **STATUS:** not-found
- **CONFLICTS:** none

### SSH_DEPLOY_USER
- ENVFILE: NOT_FOUND
- /proc/22164: NOT_FOUND
- container:caddy : NOT_FOUND
- container:web   : NOT_FOUND
- container:dev   : NOT_FOUND
- **STATUS:** not-found
- **CONFLICTS:** none

### SSH_DEPLOY_KEY
- ENVFILE: NOT_FOUND
- /proc/22164: NOT_FOUND
- container:caddy : NOT_FOUND
- container:web   : NOT_FOUND
- container:dev   : NOT_FOUND

- secure:/srv/vinops/secure/deploy_key NOT_FOUND
- secure:/root/.ssh/id_ed25519 sha256=b79805158388f2218695cfb5e3068f0683f4e03fcf7a6f1bab797ead250c37b7 len=411
- **STATUS:** found
- **CONFLICTS:** none

### SOPS_AGE_PRIVATE_KEY
- ENVFILE: NOT_FOUND
- /proc/22164: NOT_FOUND
- container:caddy : NOT_FOUND
- container:web   : NOT_FOUND
- container:dev   : NOT_FOUND

- secure:/root/.config/sops/age/keys.txt sha256=c43222cc0aebba0d70e74d3492f95720f4880b57610b23a19a3426ca93d7bf1d len=189
- secure:/root/.age/key.txt NOT_FOUND
- secure:/srv/vinops/secure/age.key NOT_FOUND
- **STATUS:** found
- **CONFLICTS:** none

### DB USERS
- admin    : sha256=dbf7fcefc07e78c3c2b43831152535ff88b4bb9cb604cf162db4fd5da70a2b92 len=14
- etl_rw   : sha256=ee77bf595c577547795884b931114c54c9671e84e54dafdaadb5df575cfd4ca4 len=15
- gen_user : sha256=7529a2d2fb062a66839db7e8c70087aa7489b15c138aa5b83b273170cb9bb8a1 len=14
- **STATUS:** found
- **CONFLICTS:** none

