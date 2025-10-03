# S1.V — Baseline (MS-S1V-01)
**Timestamp (Europe/Warsaw):** 2025-09-30 02:01

## Repository
- Default branch: **main**
- origin/main: `e3aefa40971b82e0300e07a109d75e5fd7995201`  (author:KestutisTreciokas  date:2025-09-29 00:03:41 +0300  subject:Merge pull request #90 from KestutisTreciokas/rebase/pr-84-consolidated)

## Manager & Lockfile
- Manager: **npm**
- Lockfile: `frontend/package-lock.json` (единственный)

## Node / Next / TypeScript / Engines
- `.nvmrc`: **20**
- `engines.node`: **>=20.14 <21**
- `engines.npm`: **>=10 <11**

## CI — последняя сборка
- repo: **KestutisTreciokas/vinops**
- workflow: **toolchain-check**
- branch: **main**
- source: **[api]**
- run_id: **18079769316**
- status/conclusion: **completed / failure**
- head_sha: **e3aefa40971b82e0300e07a109d75e5fd7995201**
- created_at: **2025-09-28T21:03:44Z**
- url: **https://github.com/KestutisTreciokas/vinops/actions/runs/18079769316**

## Scripts (frontend/package.json)
```
dev, build, start, lint, typecheck, ci:versions, ci:lint, ci:typecheck
```

## ENV keys (.env.example) ↔ GitHub Environments
### ENV mapping (.env.example ↔ GitHub Environments)

| KEY | in .env.example | in DEV env | in PROD env |
|-----|------------------|------------|-------------|
| API_SMOKE_STUB_ENABLE | yes | no | no |
| API_SMOKE_SUPPRESS_VIN | yes | no | no |
| API_SMOKE_WHITELIST_VIN | yes | no | no |
| BOOK_LANG | yes | no | no |
| DATABASE_URL | yes | no | no |
| HOST | yes | no | no |
| NEXT_PUBLIC_API_BASE | yes | no | no |
| NEXT_PUBLIC_CONTACT_EMAIL | yes | no | no |
| NEXT_PUBLIC_SITE_URL | yes | no | no |
| NEXT_PUBLIC_TELEGRAM | yes | no | no |
| NODE_ENV | yes | no | no |
| NODE_PG_FORCE_NATIVE | yes | no | no |
| PGCONNECT_TIMEOUT | yes | no | no |
| PG_IDLE_TIMEOUT_MS | yes | no | no |
| PG_IDLE_TX_MS | yes | no | no |
| PGPOOL_MAX | yes | no | no |
| PGSSL_DISABLE | yes | no | no |
| PGSSLMODE | yes | no | no |
| PG_STMT_MS | yes | no | no |
| PORT | yes | no | no |
| VIN_SAMPLE | yes | no | no |
