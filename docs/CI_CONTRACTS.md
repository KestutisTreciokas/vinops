# OpenAPI v1 — контрактные проверки в CI

**Источник истины:** `contracts/openapi.yaml`  
**Workflow:** “Contract tests (OpenAPI v1)” в GitHub Actions.

Шаги:
- Validate — `@apidevtools/swagger-parser`
- Lint — `@redocly/cli`
- Bundle (dereference) — `@redocly/cli`

Артефакты ранa:
- `oas-validate.txt`
- `oas-lint.txt`
- `contracts/openapi.bundled.yaml`

Критерий GREEN: workflow завершён **Success** и артефакты присутствуют.
