# Knowledge Sources (Vinops)

## Репозиторий (локальные источники)
- `docs/AGENTS/` — текущие роли/шаблоны/HOWTO (этот раздел).
- `docs/AGENTS_POLICY.md` — политика агентов.
- `docs/PR_CONVENTION.md` — правила PR/коммитов.
- `docs/SECRETS_SAP.md` — модель секретов (секреты доступны ТОЛЬКО через GitHub Actions).
- `docs/SEO.md`, `docs/standards/*.md`, `docs/RUNBOOKS.md` — стандарты и операционные регламенты.
- `docs/templates/ADR.md`, `docs/templates/CR.md`, `docs/templates/MS.md` — канонические шаблоны.
- `docs/SPRINTS.md`, `docs/DECISION_LOG.md` (или `docs/decisions/decision-log.md`) — дорожная карта и реестр решений.
- `docs/bot/*.md` — контур Telegram/Mini App.
- `docs/infra/cloudflare.md` — CF/WAF/правила.

## Внешние/SSOT (включаются в базу знаний Agent Builder)
- PASSPORT_WEB / PASSPORT_TECH / PASSPORT_TG / PASSPORT_PAYMENTS / HANGOVER / SPRINTS_MAIN_PROJECT / SPRINTS_TG_BOT_AND_PAYMENTS — **UNKNOWN (реплика в репозитории отсутствует)**.  
  **Как проверить:** наличие одноимённых файлов в `docs/` или в подключённой базе знаний Agent Builder; при отсутствии — добавить в Knowledge из утверждённого источника.

## Правила пополнения Knowledge
1. Любая новая спецификация/паспорт после merge — попадает в Knowledge в течение 1 часа (DocSync).
2. Конфликты версий решаются приоритетом: repo(main) > утверждённые паспорта SSOT > черновики.
3. Источники без физической копии в repo — отражаются ссылкой/хешом и временем последней индексации.
