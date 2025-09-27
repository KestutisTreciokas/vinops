# REQ-2025-09-23 — Enable pg_stat_statements on vinops cluster
**Cluster:** FQDN `418a052549dc7dac1163fd68.twc1.net` (PG 17).  
**DB:** `vinops`.  
**Reason:** Observability (query stats) per SSOT.

**Please do:**
1. Add `pg_stat_statements` to `shared_preload_libraries` for the cluster; reload/restart as required.
2. In DB `vinops` run: `CREATE EXTENSION IF NOT EXISTS pg_stat_statements;`
3. (Optional) Grant roles `pg_read_all_settings`, `pg_monitor`, `pg_read_all_stats` to `db_admin` and `gen_user` for read-only visibility.

**Acceptance:**
- `SHOW shared_preload_libraries;` includes `pg_stat_statements`.
- `SELECT * FROM pg_extension WHERE extname='pg_stat_statements';` returns one row.
- `SELECT 1 FROM pg_stat_statements LIMIT 1;` works.
