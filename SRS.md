# SRS — vinops.online (MVP A)

## 1. Назначение
Витрина-агрегатор аукционов. Этап A: активные лоты Copart (каталог и карточка VIN). Этап B: исходы/цены (final bid). Публичный слой SSR (Next.js App Router) + API v1 (read-only). Данные — PostgreSQL 17 (managed). Медиа — Cloudflare R2 + CDN `img.vinops.online`.

## 2. Инварианты URL/SEO
Канон VIN: `/{lang}/vin/{VIN}`; обязательны `<link rel="canonical">`, `hreflang` (EN/RU + x-default), JSON-LD `Vehicle` + `BreadcrumbList`. VIN-sitemap — шардирование ≤50k URL/файл. `/` → 308 на `/en` (HSTS на редиректе включён в периметре).

## 3. API v1 (источник истины — OpenAPI 3.0.3)
- `GET /api/v1/vehicles/{vin}` — карточка VIN (200/404/410/422).
- `GET /api/v1/search` — каталог (пагинация keyset `nextCursor`, 200/400/422/429).
Breaking — только через `/api/v2`.

## 4. Данные/БД
PostgreSQL 17 (managed), роли: `db_admin`, `app_ro`, `etl_rw`. Обязательные расширения: `pg_stat_statements`, `pg_trgm`, `pgcrypto`, `citext`. Миграции по EMC: expand→migrate→contract. Соединения — только по TLS `verify-full`. VIN: нормализация UPPER, длина 11–17 (17 без I/O/Q), `vin_normalized UNIQUE`, `CHECK`.

## 5. Медиа
Ключ: `img/{source}/{vin}/{lot_id}/{variant}/{seq}.{webp|avif}`, варианты: `thumb/md/xl/orig`. Кэш: `thumb/md/xl` — 1y immutable; `orig` — 30d. Водяной знак только на `xl`. Lifecycle: `orig` T+60d от продажи, `xl` 9м.

## 6. Страницы
- `/{lang}` — главная, поиск VIN.
- `/{lang}/cars` — каталог (SSR), фильтры/сортировки, сложные query — `noindex,follow`.
- `/{lang}/vin/{VIN}` — карточка VIN: инфо, галерея (thumb→xl), таймлайн `SaleEvent[]`, блок удаления (410).
- `/{lang}/{contacts|about|terms}` — статические.

## 7. ETL A (Copart CSV → RAW → Core)
Периодичность ~15 мин: fetch CSV → RAW (R2, версионирование, sha256) → validate/map (таксономии/локации) → идемпотентный upsert в Core (`vehicles/lots/...`) по `lot_id` → события `LotUpserted`. Метрики: `ingest_count/lag_seconds/parse_errors/unknown_rate`.

## 8. Наблюдаемость/CI-CD
CI: линты/типы/юниты/сборка + контракт-тесты к OpenAPI; смоки `/health`, robots/sitemaps, 1 VIN `<head>`.  
CD: deploy (GH Actions) → purge CF → warm-up → SEO-smokes → авто-rollback при провале. KPI: p75 TTFB < 300 ms, LCP ≤ 2.5 s, INP ≤ 200 ms; удаление VIN (410+purge) ≤ 10 мин.

## 9. Безопасность/периметр
Origin — nginx (CF proxy ON). Заголовки: HSTS 1y preload, X-CTO, Referrer-Policy, CSP (RO). БД — приватная сеть, TLS `verify-full`. Секреты — только в ENV/secret-store.

## 10. Жёсткие решения (выдержка)
- Канон `/{lang}/vin/{VIN}`, VIN-sitemaps ≤50k/шард.  
- API v1 неизменяем, breaking → `/api/v2`.  
- Только Redis Streams для событий.  
- Шрифты — self-hosted (без Google Fonts).

(Полный SSOT и дорожная карта — в `/docs` и корневых `ARCHITECTURE.md`, `CI_CD.md`.)
