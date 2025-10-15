# PIPELINE_PASSPORT — Паспорт билд/деплой пайплайна (Europe/Warsaw)
Дата/время фиксации: 2025-10-15 22:55 CEST
Ветка/коммит: HEAD на `work/ib-baseline` (см. `git log -1 --oneline`)

## 1) Обзор
- Цель: репродуцируемая сборка артефактов (в т.ч. контейнерных образов) и детерминированный деплой **без ручных шагов** вне Runbook.
- Оркестратор CI: **GitHub Actions**.
- Рантайм: Node 20.x (Next.js 14.2.x, TypeScript 5.6.x).
- Релизные образы: **GHCR** (`ghcr.io/<owner>/vinops-web`, `ghcr.io/<owner>/vinops-api`).
- Прод-оркестрация: Docker Compose c **только предсобранными образами**.

## 2) Workflows (назначение и триггеры)
- `build.yml` — проверка сборки на PR: checkout → setup-node 20 → `npm ci` → `npm run lint` → `npm run typecheck` → `npm run build`.
- `toolchain-check.yml` — печать версий и базовые проверки фронтенда.
- `openapi-contracts.yml` — валидация/линт/бандлинг OpenAPI, публикация артефактов.
- `api-smoke.yml` — локальный запуск API/Next и смоук-набор (422/200+ETag/304/404/429/CORS).
- `secrets-guard.yml` — валидация секретов (установка sops/age, запуск guard-скрипта).
- `cd.yml` — **сборка и публикация образов** в GHCR (`vinops-web`, `vinops-api`) с тегами `sha-<SHORT_SHA>` и стабильным тегом (например, `prod`).
- `deploy.yml` — деплой на сервер: передача скриптов `infra/server/bin/{deploy,smoke,rollback}`, валидация `.env`, запуск деплоя, pre-smoke (`/health`), Cloudflare purge, warm-up, SEO/SSR-смоуки.

## 3) Политика тегов/образов (GHCR)
- Каждый коммит main → push образов с тегом `sha-<SHORT_SHA>`.
- Промоция (retag) продового тега (`prod`) выполняется пайплайном по результатам проверок.
- **Инвариант**: владелец в GHCR везде в одном регистре (нижний), пример: `ghcr.io/kestutistreciokas/vinops-api`.

## 4) Compose-политика окружений
- `docker-compose.yml` (production): использовать образы:
  - `web`: `${GHCR_IMAGE_WEB}:${WEB_IMAGE_TAG}`
  - `api`: `${GHCR_IMAGE_API}:${API_IMAGE_TAG}`
- **Запрещено в прод-оркестрации**: `build:` внутри compose. Любые локальные билды — только в отдельном `docker-compose.local-build.yml` (dev-only).
- Переменные окружения для прод:
  - Сет API: `PORT_API_HOST`, `DATABASE_URL`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `SENTRY_DSN`, `NEXT_PUBLIC_SENTRY_DSN`.
  - Сет WEB: `NEXT_PUBLIC_API_URL`, `SENTRY_DSN`, `NEXT_PUBLIC_SENTRY_DSN`, и т.п.

## 5) Секреты и валидация
- Хранение: только зашифрованные артефакты версионируются (например, `.env.sops.yaml.enc`); плейны — в игноре.
- Guard: workflow `secrets-guard.yml` устанавливает sops/age и запускает `infra/server/bin/secrets-guard`.
- Проверка на проде: скрипт деплоя валидирует обязательные переменные до запуска приложения.

## 6) Проверки качества/готовности
- Frontend: `lint`, `typecheck`, `next build`.
- API-smoke: статусы и заголовки (ETag/304), CORS, 404/429, `/health`.
- SEO/SSR smoke после деплоя: canonical, hreflang, JSON-LD, ETag/304, списки sitemap/robots.

## 7) Runbook-границы ответственности
- **Ручные действия запрещены**: доступно только через запуск workflow (dispatch) или merge, все шаги автоматизированы.
- Runbook допускает **только**: выбор окружения/тега и запуск workflow из UI.

## 8) Точки внимания (для следующего PR)
- Удалить/переименовать локальные compose-файлы, которые содержат `build:` в продовом варианте.
- Унифицировать owner в GHCR (нижний регистр) во всех workflow.
- Добавить правило `.gitignore` для `**/*.tsbuildinfo` (см. MS-MIG-00-01).

