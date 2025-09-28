#!/usr/bin/env bash
set -euo pipefail

APP_ROOT="${APP_ROOT:-/root/work/vinops.restore}"
FRONT="${FRONT:-$APP_ROOT/frontend}"
APP="${APP:-$FRONT/src/app}"
DOMAIN="${DOMAIN:-https://vinops.online}"
LANGS="${LANGS:-en ru}"

RED=$'\e[31m'; GREEN=$'\e[32m'; YELLOW=$'\e[33m'; NC=$'\e[0m'
fail(){ echo "${RED}FAIL${NC}: $*"; exit 1; }
ok(){   echo "${GREEN}OK${NC}: $*"; }

echo "Smoke: /[lang]/cars (HTTP, query stability, fonts) + source guards"
echo "Domain: $DOMAIN"
echo

# ---- 1) PROD side checks for each lang
for lang in $LANGS; do
  URL="$DOMAIN/$lang/cars"
  echo "=== $URL ==="

  # 1.1 HEAD 200
  code="$(curl -ksSI "$URL" -o >(sed -n '1,1p' >&2) -w '%{http_code}')"
  [ "$code" = "200" ] || fail "HTTP $code for $URL"
  ok "HEAD 200"

  # 1.2 No external Google Fonts in HTML
  html="$(curl -ksS "$URL")"
  if grep -q 'fonts.googleapis.com' <<<"$html"; then
    fail "found external Google Fonts on $URL"
  fi
  ok "no external Google Fonts"

  # 1.3 Query variants must stay on same path and return 200
  for q in \
      "type=cars" \
      "type=moto&page=2" \
      "make=Toyota&model=Camry&page=3" \
      "gen=&yfrom=2015&yto=2020" \
  ; do
    eff="$(curl -ksSIL -o /dev/null -w '%{http_code} %{url_effective}' -L "$URL?$q")"
    http="${eff%% *}"; url="${eff#* }"
    path="$(sed -E 's#https?://[^/]+##' <<<"$url")"
    [ "$http" = "200" ] || fail "GET $URL?$q -> HTTP $http"
    [[ "$path" == "/$lang/cars"* ]] || fail "redirected off /$lang/cars for ?$q (got $path)"
  done
  ok "query updates keep path + HTTP 200"

  echo
done

# ---- 2) SOURCE side guards

cars_file="$APP/[lang]/cars/page.tsx"
[ -f "$cars_file" ] || fail "missing $cars_file"

# 2.1 Every router.replace( is preceded by our ts-expect-error line
awk '
  /router\.replace\(/ {
    if (prev !~ /@ts-expect-error .*href is narrowed/) {
      printf("missing ts-expect-error before router.replace at line %d\n", NR) > "/dev/stderr";
      err++
    }
  }
  { prev=$0 }
  END { if (err) exit 1 }
' "$cars_file" || fail "ts-expect-error guard missing before some router.replace()"

ok "ts-expect-error present before each router.replace() in cars/page.tsx"

# 2.2 Banlist: no typedRoutes/Route tokens in active .tsx (excluding backups)
if grep -RnoE 'typedRoutes|as unknown as Route\b|\bRoute\b' "$APP" --include='*.tsx' 2>/dev/null | grep -v '\.bak\.'; then
  fail "banlist tokens present in active .tsx (see above)"
fi
ok "no typedRoutes/Route in active .tsx"

echo
ok "smoke passed for /[lang]/cars"
