#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${DOMAIN:-https://vinops.online}"
LANGS="${LANGS:-en ru}"

RED=$'\e[31m'; GREEN=$'\e[32m'; YELLOW=$'\e[33m'; NC=$'\e[0m'
fail(){ echo "${RED}FAIL${NC}: $*"; exit 1; }
ok(){   echo "${GREEN}OK${NC}: $*"; }

echo "Smoke: home features, headers, self-hosted fonts"
echo "Domain: $DOMAIN"
echo

for lang in $LANGS; do
  URL="$DOMAIN/$lang"
  echo "=== $URL ==="

  # 1) HEAD 200
  code="$(curl -ksSI "$URL" -o >(sed -n '1,1p' >&2) -w '%{http_code}')"
  [ "$code" = "200" ] || fail "HTTP $code for $URL"
  ok "HEAD 200"

  # 2) no external Google Fonts in HTML
  html="$(curl -ksS "$URL")"
  if grep -q 'fonts.googleapis.com' <<<"$html"; then
    fail "found external Google Fonts on $URL"
  fi
  ok "no external Google Fonts"

  # 3) exactly one <section id="home-features"> within <main> (ignore inline scripts)
  cnt="$(
    printf '%s' "$html" \
    | sed -E 's#.*<main#<main#g; s#</main>.*#</main>#g' \
    | sed -E 's#<script[^>]*>.*?</script>##g' \
    | grep -o '<section id="home-features"' \
    | wc -l | tr -d ' '
  )"
  [ "$cnt" = "1" ] || fail "expected 1 #home-features in <main>, got $cnt on $URL"
  ok "one <section id=\"home-features\"> in <main>"

  # 4) at least one preloaded woff2 in headers (robust: >=1)
  preload_cnt="$(
    curl -ksSI "$URL" \
      | awk 'BEGIN{IGNORECASE=1}/^link:/{print}' \
      | grep -o 'type="font/woff2"' | wc -l | tr -d ' '
  )"
  if [ "${preload_cnt:-0}" -lt 1 ]; then
    echo "${YELLOW}WARN${NC}: no woff2 preload detected in Link: headers (not fatal)"
  else
    ok "woff2 preload present in headers ($preload_cnt)"
  fi

  echo
done

ok "smoke passed for: $LANGS"
