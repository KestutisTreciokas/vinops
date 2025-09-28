#!/usr/bin/env bash
set -e
# Ставим утилиты
npm -g i @redocly/cli@latest @apidevtools/swagger-cli@4 >/dev/null 2>&1
# Валидация обоих файлов
swagger-cli validate -q /work/contracts/openapi.yaml \
  && echo "SWAGGER_VALIDATE:PR=OK" \
  || echo "SWAGGER_VALIDATE:PR=FAIL"
swagger-cli validate -q /work/docs/merges/PR-84/_tmp/openapi.main.yaml \
  && echo "SWAGGER_VALIDATE:MAIN=OK" \
  || echo "SWAGGER_VALIDATE:MAIN=FAIL"
# Lint PR-спека
redocly lint --format=json /work/contracts/openapi.yaml > /work/docs/merges/PR-84/openapi-lint.json || true
# Diff (breaking/non-breaking) main -> PR
redocly diff --format=json /work/docs/merges/PR-84/_tmp/openapi.main.yaml /work/contracts/openapi.yaml \
  > /work/docs/merges/PR-84/openapi-diff.json || true
