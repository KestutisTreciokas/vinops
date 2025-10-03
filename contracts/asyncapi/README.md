# AsyncAPI — мост

Статус: **пока не используется** в продовом контуре.

## UNKNOWN и как проверить
- Брокер/шина: **UNKNOWN** → Как проверить: см. ADR по событиям (будет добавлен), обсуждение в `docs/ARCHITECTURE.md`.
- Спеки: отсутствуют. Проверка: `git ls-files | grep -Ei 'asyncapi\.(ya?ml|json)$'` → пусто.

## План
Ввести AsyncAPI, когда зафиксируем события `LotUpserted`, `SaleRecorded`, `VinHidden`.
