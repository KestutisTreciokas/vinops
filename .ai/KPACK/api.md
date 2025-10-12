# KPACK — api (public read)
## Scope
- /api/v1/vehicles/{vin}, /api/v1/search (OpenAPI 3.0.3).
## Inputs
- Read-only доступ к core (роль app_ro, TLS verify-full).
## Outputs
- DTO: VinCard, SearchPage (keyset), headers: ETag/Last-Modified/X-Api-Version.
## Gates
- Breaking-changes → /api/v2 + контракт-тесты (openapi-contracts.yml).
