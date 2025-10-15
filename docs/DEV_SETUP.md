# DEV_SETUP — Vinops (Claude Code)
_Updated: 2025-10-15 18:14 (Europe/Warsaw)_

## 1) Node / npm / nvm (статус)
- Node.js: **v20.17.0**
- npm: **10.8.2**
- nvm: **0.39.7**

Проверки:
```bash
node -v
npm -v
nvm --version
```

## 2) Установка Claude Code (CLI)

Глобальная установка в префиксе nvm:
```bash
npm i -g @anthropic-ai/claude-code
```

Проверка:
```bash
which claude
claude --version
```

## 3) Политика безопасности

Запрещено передавать секреты/токены в промптах и диффах.

Режим --dangerously-skip-permissions запрещён на хосте разработки; разрешён только в sandbox-контейнере (см. S-CC-05).

Работать под учёткой с минимально необходимыми правами.

## 4) Быстрая диагностика сети npm
```bash
curl -I https://registry.npmjs.org/
npm ping
```

## 5) Что делать при сбоях установки

- Ошибка прав записи в глобальный prefix: убедиться, что используется префикс nvm (npm config get prefix), переоткрыть shell с nvm.
- Временные сетевые ошибки: повторить установку позже, проверить DNS/прокси.
- При повторяющихся ошибках — создать CR с полным логом установки.
