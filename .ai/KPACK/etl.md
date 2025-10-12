# KPACK — etl (CSV→RAW→Core)
## Scope
- Fetch CSV Copart каждые ~15 мин → RAW (R2 ver), normalize/map → upsert(core).
## Inputs
- CSV маппинг (CSV_MAPPING_COPART.md), golden-сэмплы, RAW архивы.
## Outputs
- Метрики ingest_count/lag/parse_errors/unknown_rate.
## Gates
- Любые правки маппинга требуют golden-тестов и реплея RAW (mismatches=0).
