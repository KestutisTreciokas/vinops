# BUILD_PROTOCOL — Протокол «чистой сборки» (Europe/Warsaw)
Дата/время запуска: 2025-10-15 22:35–22:36 CEST  
Коммит: `e6b2a89` (ветка `work/ib-baseline`)

## Среда и версии
- Node: `v20.17.0`
- npm: `10.8.2`
- Next.js: `14.2.5`
- TypeScript: `5.6.2`

## Команды и результаты
1. Установка зависимостей (frontend):
```bash
npm ci --no-audit --no-fund
```
Результат: **успех** (added 414 packages in ~7s)

2. Печать версий:
```bash
npm run ci:versions
```
Результат: `Node v20.17.0`, `Next.js v14.2.5`, `TypeScript 5.6.2`

3. Линт:
```bash
npm run lint
```
Результат: **warnings only** (см. вывод — рекомендации по `next/image`, `react-hooks/exhaustive-deps`).

4. Проверка типов:
```bash
npm run typecheck
```
Результат: **успех**.

5. Сборка:
```bash
npm run build
```
Результат: **успех**. Сгенерированы страницы (SSG/static/ƒ). Каталог артефактов: `frontend/.next` (~69 MB).

## Пост-условия
- Git-статус после сборки: единственный tracked-дрейф — `frontend/tsconfig.tsbuildinfo` (Modified).  
- Артефакт отчёта: `docs/GIT_SYNC.md`.  
- Настоящий протокол: `docs/BUILD_PROTOCOL.md`.

## План фикса дрейфа (под PR)
- Добавить `**/*.tsbuildinfo` в `.gitignore`, выполнить `git rm --cached frontend/tsconfig.tsbuildinfo`.
