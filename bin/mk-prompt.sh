#!/usr/bin/env bash
set -euo pipefail
SVC="${1:-api}"
LINES="${2:-200}"
SHA="$(git rev-parse --short HEAD 2>/dev/null || echo UNKNOWN)"
TS="$(date +%F-%H%M%S)"
OUT="context/ai-request-${SVC}-${TS}.md"
mkdir -p context

LOGS="$(docker compose logs --tail "$LINES" "$SVC" 2>/dev/null || true)"
LOGS_TRIM="$(echo "$LOGS" | tail -n 60)"

# Пишем файл промпта
cat > "$OUT" <<EOP
Commit/Tag: $SHA
Сервис: $SVC
Ошибка (20–50 строк логов):
\`\`\`
$LOGS_TRIM
\`\`\`
Структура модуля (опционально): (вставь результат \`tree -L 2 <папка>\`)
Что нужно починить + критерии приёмки (чётко)
Верни unified diff патчи по конкретным файлам, шагами, каждый шаг компилируемый
EOP

echo "Draft prompt saved: $OUT"
