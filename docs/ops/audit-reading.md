# Чтение аудита «как сервис» (единый PROD-DSN)

**Зона:** bot/ops  
**Сервис:** `tg-webhook.service`  

## Откуда берётся DSN
Порядок приоритета:
1. `POSTGRES_DSN` или `DATABASE_URL` в `/etc/vinops/tg-webhook.env` (если есть).
2. Те же переменные из окружения процесса `tg-webhook.service`.
3. Если DSN не задан — собираем libpq-подключение из **тех же источников, что использует сервис**:
   - `hostaddr`, `dbname`, `user` и `port` — из `server.js`;
   - `sslrootcert` — `/etc/vinops/pg/ca.crt`;
   - пароль — из `/srv/vinops/secure/pg_etl_rw.password`;
   - проверка имени — через `host=<servername>` из `server.js` (verify-full).

## Быстрый старт
```bash
/root/work/vinops.restore/scripts/qa/audit_read_service_dsn.sh

