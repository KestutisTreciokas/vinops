# OpenAPI v1 — мост

**Каноническая спецификация (текущий путь):** `../openapi.yaml`  
Формат: OpenAPI 3.x.

## Как проверить
- Файл существует: `test -f contracts/openapi.yaml`
- Версия формата: в первых строках есть `openapi: 3`
- Валидация выполняется workflow `.github/workflows/openapi-contracts.yml` (ручной запуск).

## Примечание
Перенос в `contracts/openapi/openapi.yaml` возможен отдельным CR/ADR с обратной совместимостью ссылок.
