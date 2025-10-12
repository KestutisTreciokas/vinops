# KPACK — release (CI/CD, deploy, smokes)
## Scope
- Build → push GHCR → deploy(dev/prod) → CF purge → warm-up → SEO smokes.
## Inputs
- Secrets из Environments (через Actions).
## Outputs
- docs/releases/release-*.json, current.json (prod_sha/prod_prev_sha).
## Gates
- PROD_SECRETS_ACCESS approve обязателен для prod.
- Fast-Track auto-merge только на полностью зелёных PR с меткой auto-merge:fast-track.
