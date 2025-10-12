#!/usr/bin/env sh
# Usage: ./test_gate_parse.sh <markdown-file> <gate_request|gate_response>
set -eu

file="${1:-}"
kind="${2:-}"

if [ -z "${file}" ] || [ -z "${kind}" ]; then
  echo "usage: $0 <file.md> <gate_request|gate_response>"
  exit 3
fi

if [ ! -f "${file}" ]; then
  echo "file not found: ${file}"
  exit 1
fi

tmp="$(mktemp)"
# Извлекаем содержимое между первой парой ```yaml ... ```
# 1) взять блок от строчки с ```yaml до строки с ``` (включительно)
# 2) убрать первую и последнюю строки (сами заборы ```)
# 3) удалить CR, если файл в CRLF
sed -n '/^```yaml[[:space:]]*$/,/^```[[:space:]]*$/p' "${file}" \
  | sed '1d;$d' \
  | tr -d '\r' > "${tmp}"

if [ ! -s "${tmp}" ]; then
  echo "no fenced yaml block"
  rm -f "${tmp}"
  exit 2
fi

# Мини-проверка нужного root-ключа
if ! grep -q -E "^${kind}:" "${tmp}"; then
  echo "no ${kind} block"
  rm -f "${tmp}"
  exit 2
fi

echo "parsed:${kind}"
rm -f "${tmp}"
exit 0
