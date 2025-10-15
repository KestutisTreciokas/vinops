# GIT_SYNC — Инвентаризация и дрейф (Europe/Warsaw)
Дата/время фиксации: 2025-10-15 22:36 CEST  
Коммит ветки: `e6b2a89` (HEAD `work/ib-baseline`, upstream `origin/work/ib-baseline`, ahead=0/behind=0)

## Источники данных
- Прологи/пост-проверки в этой ветке Исполнителя: маркеры `[STS]`, `[UNTR]`, `[IGNCHK]`, `[WF]`, `[DC]`, `[LS]`, `[NEXT]`, `[VERS]`.
- Обнаруженные файлы и состояние: выводы `git status --porcelain=v2 --branch`, `git fetch --dry-run`, `find`, `ls`.

## Таблица отличий и решений
| Путь/объект | Источник (лог-метка) | Статус (Tracked/Untracked/Ignored/UNKNOWN) | Наблюдение | Решение | Статус исполнения | Как проверить/закрыть |
|---|---|---|---|---|---|---|
| `RUNBOOKS.md` (top-level) | `[STS] ? RUNBOOKS.md` | **Untracked** | Операционная документация присутствует локально | **Внести в Git** | Pending PR | `git status -- RUNBOOKS.md` |
| `docs/GIT_SYNC.md` | `[STS] ? docs/GIT_SYNC.md` | **Untracked** | Отчёт об инвентаризации в `docs/` | **Внести в Git** | Pending PR | `git status -- docs/GIT_SYNC.md` |
| `frontend/tsconfig.tsbuildinfo` | `[STS] .M frontend/tsconfig.tsbuildinfo` | **Tracked (modified)** | Билд-артефакт TypeScript, попал в индекс | **Исключить**: добавить `**/*.tsbuildinfo` в `.gitignore` и `git rm --cached` | Pending PR | `git status -- frontend/tsconfig.tsbuildinfo` |
| `infra/server/.env` | `[IGNCHK] .gitignore:6:.env` | **Ignored** | Локальные секреты | **Исключить** (оставить игнор) | Done | `git check-ignore -v infra/server/.env` |
| `infra/secrets/.env.sops.yaml` | `[IGNCHK] .gitignore:7:.env.*` | **Ignored** | SOPS-исходник/плейн | **Исключить** (игнор), версионировать только защищённые артефакты | Done | `git check-ignore -v infra/secrets/.env.sops.yaml` |
| `infra/secrets/.env.sops.yaml.enc` | (нет метки) | **UNKNOWN (tracked?)** | Защищённый артефакт | **Должен быть единственным версионируемым секретным манифестом** | UNKNOWN | `git ls-files infra/secrets/.env.sops.yaml.enc` |
| `frontend/.env.smoke` | `[IGNCHK] .gitignore:7:.env.*` | **Ignored** | Тестовые ENV | **Исключить** (игнор оставить) | Done | `git check-ignore -v frontend/.env.smoke` |
| `frontend/.env.example` | `[IGNCHK] .gitignore:7:.env.*` | **Ignored (сейчас)** | Образец ENV должен быть в репо | **Внести в Git** и добавить `!frontend/.env.example` в `.gitignore` | Pending PR | `git ls-files frontend/.env.example` + правка `.gitignore` |
| `docker-compose.prod.yml.bak` | `[LS] … docker-compose.prod.yml.bak` | **Вероятно Tracked** | Исторический бэкап в корне | **Удалить из репо** (шум) | Pending PR | `git ls-files docker-compose.prod.yml.bak` |
| `.github/workflows/toolchain-check.yml.bak.20250930025914` | `[WF] … .bak.…` | **Tracked** | Бэкап workflow | **Удалить из репо** | Pending PR | `git ls-files .github/workflows/toolchain-check.yml.bak.20250930025914` |
| `caddy/Caddyfile.bak.*` | `[RECENT] … Caddyfile.bak.*` | **Tracked** | Бэкапы конфигов | **Удалить/перенести** в `_logs/` вне Git | Pending PR | `git ls-files 'caddy/Caddyfile.bak.*'` |
| `backup/`, `backup_*` (top-level) | `[LS] backup*` | **Tracked** | Исторические резервные копии | **Перенести** в объектное хранилище (R2/S3), исключить из Git | Pending PR | `git ls-files backup*` |
| `evidence/**` | `[LS]/[RECENT] evidence/*` | **Tracked** | Артефакты аудита/диагностики | **Оставить** (требование SSOT) | Keep | ссылки в `docs/` |

## Путь «чистой сборки» (репродуцируемость)
- Фронтенд: `frontend/package.json` (скрипты подтверждены): `build`, `lint`, `typecheck`, `ci:versions`.  
- Использованные версии (см. протокол сборки): Node **v20.17.0**, Next **14.2.5**, TypeScript **5.6.2**.
- Compose-манифесты используют **предсобранные образы** (`${GHCR_IMAGE_API}:${API_IMAGE_TAG}`, `${GHCR_IMAGE_WEB}:${WEB_IMAGE_TAG}`) — локальная сборка образов не требуется.

## Дальнейшие шаги (под PR)
1) Добавить в `.gitignore`:  
   - `**/*.tsbuildinfo`  
   - `!frontend/.env.example` (снять игнор конкретно для примера ENV)  
2) Удалить из индекса: `frontend/tsconfig.tsbuildinfo`.  
3) Удалить мусорные бэкапы: `docker-compose.prod.yml.bak`, `.github/workflows/*.bak.*`, `caddy/Caddyfile.bak.*`.  
4) Вынести `backup*` из репозитория в объектное хранилище; добавить в `.gitignore`.  
5) Проверить наличие `infra/secrets/.env.sops.yaml.enc` в индексе и утвердить стратегию версионирования секретов.

> Примечание: до подтверждения закрытия Git-операции **не выполнялись**; все артефакты расположены в `docs/` и будут закоммичены в следующем шаге по протоколу закрытия.

