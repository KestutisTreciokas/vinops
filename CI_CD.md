# CI/CD — минимальные требования и фактический пайплайн (Europe/Warsaw)

## Инварианты инструментария
- Node: **20.x** (`.nvmrc` = `v20`), Next: **14.2.x**, TypeScript: **5.6.x**.
- Команды контроля качества: `npm --prefix frontend run lint`, `npm --prefix frontend run typecheck`, `npm --prefix frontend run build`, `npm --prefix frontend run ci:versions`.

## Фактический пайплайн (сводно)
1) **PR** → `build.yml`: checkout → setup-node 20 → `npm ci` → `lint` → `typecheck` → `build`.  
2) **Контракты API** → `openapi-contracts.yml`: validate/lint/bundle, артефакты.  
3) **Guard секретов** → `secrets-guard.yml`: sops/age + проверка секретов.  
4) **Сборка и публикация образов** (main) → `cd.yml`: GHCR (`vinops-web`, `vinops-api`) с тегами `sha-<SHORT_SHA>` и стабильным тегом (`prod`).  
5) **Деплой** → `deploy.yml`: передача `infra/server/bin/{deploy,smoke,rollback}`, валидация `.env`, деплой, pre-smoke `/health`, Cloudflare purge, warm-up, SEO/SSR смоуки.  
6) **API-smoke (CI)** → `api-smoke.yml`: статусы 422/200+ETag/304/404/429, CORS.

## Политика Compose (production)
- **Только** предсобранные образы:  
  `web: ${GHCR_IMAGE_WEB}:${WEB_IMAGE_TAG}`, `api: ${GHCR_IMAGE_API}:${API_IMAGE_TAG}`.  
- `build:` в продовых compose-файлах **запрещён**. Локальные сборки — в `docker-compose.local-build.yml` (dev-only).

## Отсутствие ручных шагов
- Любые действия выполняются workflow (merge/dispatch).  
- Единственно допустимые ручные действия — *вызов workflow* из UI GitHub.  
- Любые секреты/переменные — только через зашифрованные хранилища/vars, без правки на сервере.

## Ссылки
- Подробности: `docs/PIPELINE_PASSPORT.md`.

