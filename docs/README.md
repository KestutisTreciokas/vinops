# /docs — навигация и каркас

Актуальная ветка: **rebase/pr-84-consolidated**.  
Инвентарь снимков лежит в `docs/_inventory/`.

## Быстрые ссылки (ядро)
- Root docs: [SRS.md](../SRS.md) · [ARCHITECTURE.md](../ARCHITECTURE.md) · [CI_CD.md](../CI_CD.md)
- [DECISION_LOG.md](./DECISION_LOG.md)
- [SEO.md](./SEO.md) · [FRONTEND.md](./FRONTEND.md) · [RUNBOOKS.md](./RUNBOOKS.md) · [TOOLCHAIN.md](./TOOLCHAIN.md)
- Releases: [`docs/releases/`](./releases/) · Seed/Smoke/CF purge: [`docs/release/*.json`](./release/)
- Evidence (S0/S1…): [`docs/evidence/`](./evidence/)

## Шаблоны артефактов
- ADR: [`docs/templates/ADR.md`](./templates/ADR.md)
- RFC: [`docs/templates/RFC.md`](./templates/RFC.md)
- CR:  [`docs/templates/CR.md`](./templates/CR.md)
- MS:  [`docs/templates/MS.md`](./templates/MS.md)
- QA:  [`docs/templates/QA.md`](./templates/QA.md)

## ADR
- Каталог ADR: [`docs/adr/`](./adr/)
- Принятый пример: [`ADR-20250930-origin-hsts-and-locale-redirect.md`](./adr/ADR-20250930-origin-hsts-and-locale-redirect.md)


## Сводки по мерджам
- PR-84: [`docs/merges/PR-84/`](./merges/PR-84/) (SMOKE_REPORT, OPENAPI diffs, HTML/HEAD срезы)

## Как пользоваться шаблонами
- Новое решение архитектуры — копия `templates/ADR.md` → `docs/adr/ADR-YYYYMMDD-<slug>.md`.
- Обсуждаемая фича — `templates/RFC.md` → `docs/rfc/RFC-YYYYMMDD-<slug>.md`.
- Входящий запрос — `templates/CR.md` → `docs/cr/CR-YYYYMMDD-<seq>.md` (регистрируем у Стратега).
- План мини-спринта — `templates/MS.md` → `docs/ms/MS-<Sprint>-<NN>.md`.
- Карта приёмки — `templates/QA.md` → `docs/qa/QA-MS-<id>.md`.

> Важно: шаблоны не меняют код и не должны триггерить прод-деплой. Деплой выполняется вручную через `deploy.yml`.

## Правила
- Плейсхолдеры избегаем — пишем факты или ставим **UNKNOWN** + "Как проверить".
- Инварианты из закрытых спринтов **не ломаем**; миграции — только через ADR/CR.
