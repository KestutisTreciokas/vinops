# KPACK — core (domain/data invariants)
## Scope
- Таблицы: vehicles, lots, sale_events, images (+ справочники).
- Инварианты: VIN 11–17 (17 без I/O/Q), idempotent upsert(lot_id), EMC миграции.
## Inputs (from etl)
- Normalized DTO: Vehicle, Lot, DamageTitle, Location (см. DATA_DICTIONARY.md).
## Outputs (to api/ssr)
- Read-only проекции для VinCard/Search (не ломать без /api/v2).
## Contracts
- OpenAPI v1 для публичного чтения; изменения только add-only.
