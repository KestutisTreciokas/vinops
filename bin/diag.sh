#!/usr/bin/env bash
set -Eeuo pipefail

# ==============================================================================
# vinops.restore — сбор диагностического контекста (read-only)
# Сохраняет системную/репозитории/докер/Next/SEO/БД/логи в context/context-<TS>-Europe_Warsaw/
# Никаких перезапусков, билдов, миграций или записей в БД — только чтение.
# ==============================================================================

# --- Ошибки и подсказки -------------------------------------------------------
on_err() {
  local exit_code=$?
  echo "[ERROR] Script failed at line ${BASH_LINENO[0]} with exit code ${exit_code}." >&2
  echo "        Tip: run with '--help' to see options; check that Docker/Compose/Node are installed." >&2
  exit "$exit_code"
}
trap on_err ERR

# --- Опции --------------------------------------------------------------------
REPO_ROOT=""
HOST_URL=""
LOG_LINES="300"
SHOW_HELP="false"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --repo) REPO_ROOT="${2:-}"; shift 2 ;;
    --host) HOST_URL="${2:-}"; shift 2 ;;
    --logs) LOG_LINES="${2:-300}"; shift 2 ;;
    -h|--help) SHOW_HELP="true"; shift ;;
    *) echo "[WARN] Unknown argument: $1" >&2; shift ;;
  esac
done

if [[ "$SHOW_HELP" == "true" ]]; then
  cat <<'HLP'
Usage: bash bin/diag.sh [--repo /path/to/repo] [--host https://domain] [--logs N]

Options:
  --repo PATH    : Явно указать корень репозитория.
  --host URL     : Публичный хост/домен (например, https://vinops.online или http://localhost:3000).
  --logs N       : Сколько строк логов сохранять (по умолчанию 300).
  -h, --help     : Показать помощь.

Скрипт read-only. Все артефакты — в context/context-<YYYY-MM-DD_HHMMSS>-Europe_Warsaw/.
HLP
  exit 0
fi

# --- Утилиты и проверки -------------------------------------------------------
has() { command -v "$1" >/dev/null 2>&1; }
nullifempty() { [[ -n "${1-}" ]] && echo "$1" || echo ""; }

# --- Поиск корня репозитория --------------------------------------------------
find_repo_root() {
  if [[ -n "${REPO_ROOT}" ]]; then
    echo "$REPO_ROOT"
    return 0
  fi
  # 1) если запускают из bin/
  local here; here="$(pwd)"
  if [[ -d ".git" ]]; then echo "$here"; return 0; fi
  # 2) поднимаемся вверх до 6 уровней
  local d="$here"
  for _ in {1..6}; do
    d="$(dirname "$d")"
    if [[ -d "$d/.git" ]]; then echo "$d"; return 0; fi
  done
  # 3) эвристика из истории чата
  if [[ -d "/root/work/vinops.restore/.git" ]]; then echo "/root/work/vinops.restore"; return 0; fi
  echo "[FATAL] Can't detect repo root. Use --repo /path/to/repo" >&2
  exit 2
}

REPO_ROOT="$(find_repo_root)"
cd "$REPO_ROOT"

# --- Таймстемпы и директории --------------------------------------------------
TS="$(TZ=Europe/Warsaw date '+%Y-%m-%d_%H%M%S-Europe_Warsaw')"
CTX_DIR="$REPO_ROOT/context/context-${TS}"
mkdir -p "$CTX_DIR"

# Короткий README в контекст
cat > "$CTX_DIR/README.md" <<EOF
# Snapshot: ${TS}

This folder contains read-only diagnostics of the repo and runtime:
- Git state, system info, timezones, Node/Next versions
- Docker Compose config, running containers, ports, images, redacted inspect
- Next.js artifacts: routes tree, manifests (if present)
- Public endpoints (HEAD/GET), SEO tags (canonical/hreflang)
- Database (Postgres) schema overview (tables only) — if accessible
- Cron/timers — host & containers (read-only)
- Logs: last ${LOG_LINES} lines per key services
- Configs: docker-compose*.yml, Dockerfile*, .env*.masked
EOF

# --- Хелперы вывода/маскировки ------------------------------------------------
secdir() { mkdir -p "$CTX_DIR/$1"; echo "$CTX_DIR/$1"; }

mask_env_stream() {
  # Маскируем чувствительные ключи вида KEY=VALUE
  # Совпадения по ключу (без учёта регистра): secret, password, passwd, pwd, token, key, api, dsn, url, connection, auth, cookie, session
  awk -F= 'BEGIN{IGNORECASE=1}
    $1 ~ /(secret|password|passwd|pwd|token|key|api|dsn|url|connection|auth|cookie|session)/ {
      print $1"=***REDACTED***"; next
    }
    { print $0 }'
}

mask_docker_inspect_json() {
  # Если есть jq — аккуратно маскируем .Config.Env
  if has jq; then
    jq 'if .[]?.Config?.Env then
          .[].Config.Env |= (map( capture("(?<k>^[^=]+)=(?<v>.*)") | .k as $k |
            if ($k|ascii_downcase) | test("(secret|password|passwd|pwd|token|key|api|dsn|url|connection|auth|cookie|session)")
            then "\($k)=***REDACTED***" else "\($k)=***" + (.v|tostring|gsub(".+";"REDACTED")) + "***" end
          ))
        else . end'
  else
    cat
  fi
}

hr() { printf -- "================================================================================\n"; }

note() {
  printf -- "\n## %s\n" "$1"
  [[ $# -gt 1 ]] && printf -- "# %s\n" "$2"
}

# --- 01: Git ------------------------------------------------------------------
{
  note "GIT — branch, last 10 commits, status, tags" "Подтверждаем актуальную ветку и незакоммиченные изменения"
  echo "[repo] $REPO_ROOT"
  git rev-parse --is-inside-work-tree >/dev/null 2>&1 || { echo "Not a git repo"; exit 0; }
  echo "branch: $(git rev-parse --abbrev-ref HEAD)"
  echo
  echo "[last 10 commits]"
  git --no-pager log --oneline -n 10
  echo
  echo "[status]"
  git status -s
  echo
  echo "[tags]"
  git tag --list | tail -n 50
} > "$(secdir 01_git)/git.txt" 2>&1 || true

# --- 02: System ---------------------------------------------------------------
{
  note "SYSTEM — OS/Kernel/CPU/RAM/Disk" "Базовые ресурсы"
  echo "[lsb_release]"; (lsb_release -a 2>/dev/null || true)
  echo; echo "[uname -a]"; uname -a || true
  echo; echo "[lscpu]"; (lscpu 2>/dev/null || true)
  echo; echo "[free -h]"; (free -h 2>/dev/null || true)
  echo; echo "[df -h]"; df -h || true
} > "$(secdir 02_system)/system.txt" 2>&1 || true

# --- 03: Timezones ------------------------------------------------------------
{
  note "TIME — local & Europe/Warsaw" "Фиксируем абсолютные временные метки"
  echo "Local:        $(date -Iseconds)"
  echo "Europe/Warsaw: $(TZ=Europe/Warsaw date -Iseconds)"
} > "$(secdir 03_time)/time.txt" 2>&1 || true

# --- 04: Node & Next ----------------------------------------------------------
{
  note "RUNTIME — Node/Package managers/Next" "Версии инструментов"
  echo "[node]"; (node -v 2>/dev/null || echo "node: not found")
  echo "[pnpm]"; (pnpm -v 2>/dev/null || echo "pnpm: not found")
  echo "[npm ]"; (npm -v  2>/dev/null || echo "npm : not found")
  echo "[yarn]"; (yarn -v 2>/dev/null || echo "yarn: not found")
  echo "[npx ]"; (npx -v  2>/dev/null || echo "npx : not found")
  echo "[next]"; (next -v 2>/dev/null || echo "next: not found")
} > "$(secdir 04_runtime)/node_next.txt" 2>&1 || true

# --- 05: Repo layout ----------------------------------------------------------
{
  note "REPO LAYOUT — дерево ключевых каталогов" "Что участвует в сборке"
  echo "[tree: frontend/src/app (если есть)]"
  if [[ -d "$REPO_ROOT/frontend/src/app" ]]; then
    (cd "$REPO_ROOT/frontend/src/app" && find . -maxdepth 4 -type d | sort)
    echo "participates: YES (Next.js App Router expected)"
  else
    echo "not found: $REPO_ROOT/frontend/src/app"
  fi
  echo
  echo "[tree: app (если есть)]"
  if [[ -d "$REPO_ROOT/app" ]]; then
    (cd "$REPO_ROOT/app" && find . -maxdepth 3 -type d | sort)
    echo "participates: UNKNOWN (check Dockerfile/build context)"
  else
    echo "not found: $REPO_ROOT/app"
  fi
  echo
  echo "[infra/docker/* if present]"
  (ls -la "$REPO_ROOT/docker" 2>/dev/null || echo "no docker/ dir")
  echo
  echo "[Dockerfile(s) at repo root]"
  (ls -la "$REPO_ROOT"/Dockerfile* 2>/dev/null || echo "no Dockerfile* at root")
} > "$(secdir 05_layout)/layout.txt" 2>&1 || true

# --- 06: Docker & Compose -----------------------------------------------------
DC_DIR="$(secdir 06_docker)"
{
  note "DOCKER COMPOSE — config" "Собираем единую конфигурацию (-f для всех известных файлов)"
  COMPOSE_FILES=()
  for f in docker-compose.prod.yml docker-compose.db.yml docker-compose.hostfix.yml docker-compose.health.yml docker-compose.yml; do
    [[ -f "$REPO_ROOT/$f" ]] && COMPOSE_FILES+=("-f" "$REPO_ROOT/$f")
  done
  if has docker && has docker compose && [[ ${#COMPOSE_FILES[@]} -gt 0 ]]; then
    echo "[compose files] ${COMPOSE_FILES[*]}"
    docker compose "${COMPOSE_FILES[@]}" config 2>&1 | tee "$DC_DIR/compose.config.yml" >/dev/null || true
    echo
    echo "[services]"
    (docker compose "${COMPOSE_FILES[@]}" config --services || true)
  else
    echo "docker compose not available or compose files missing"
  fi
} > "$DC_DIR/compose.txt" 2>&1 || true

{
  note "DOCKER — ps / images / ports" "Что запущено и на каких портах слушает"
  echo "[docker ps]"
  (docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}' 2>/dev/null || true)
  echo
  echo "[docker images]"
  (docker images --format 'table {{.Repository}}\t{{.Tag}}\t{{.ID}}\t{{.Size}}\t{{.CreatedSince}}' 2>/dev/null || true)
  echo
  echo "[ss -tulpn | grep LISTEN]"
  (ss -tulpn 2>/dev/null | grep LISTEN || true)
} > "$DC_DIR/runtime.txt" 2>&1 || true

# docker inspect (редакция env)
if has docker; then
  for cname in $(docker ps --format '{{.Names}}'); do
    docker inspect "$cname" 2>/dev/null | mask_docker_inspect_json > "$DC_DIR/inspect-${cname}.json" || true
  done
fi

# --- 07: Next.js — артефакты и маршруты --------------------------------------
NX_DIR="$(secdir 07_next)"
{
  note "NEXT ARTIFACTS — .next, manifests" "Проверяем, что собрано/развёрнуто"
  for root in "$REPO_ROOT/frontend" "$REPO_ROOT"; do
    if [[ -d "$root/.next" ]]; then
      echo "[found] $root/.next"
      ls -la "$root/.next" || true
      [[ -d "$root/.next/server" ]] && ls -la "$root/.next/server" || true
      [[ -f "$root/.next/server/app-paths-manifest.json" ]] && cp -f "$root/.next/server/app-paths-manifest.json" "$NX_DIR/app-paths-manifest.json" || true
      [[ -f "$root/.next/server/server.js" ]] && cp -f "$root/.next/server/server.js" "$NX_DIR/server.js" || true
    fi
  done

  echo
  note "NEXT ROUTES — файловая иерархия app/*" "Ищем page.tsx/layout.tsx/head.tsx и динамические сегменты"
  if [[ -d "$REPO_ROOT/frontend/src/app" ]]; then
    (cd "$REPO_ROOT/frontend/src/app" && \
      find . -type f \( -name 'page.tsx' -o -name 'layout.tsx' -o -name 'head.tsx' \) \
        -printf '%p\n' | sort)
    echo
    echo "[dynamic segments]"
    (cd "$REPO_ROOT/frontend/src/app" && \
      find . -type d -regex '.*/\[.*\].*' -printf '%p\n' | sort)
  else
    echo "No frontend/src/app directory"
  fi
} > "$NX_DIR/next.txt" 2>&1 || true

# --- 08: Public endpoints -----------------------------------------------------
PUB_DIR="$(secdir 08_public)"
guess_host() {
  if [[ -n "$HOST_URL" ]]; then echo "$HOST_URL"; return 0; fi
  # попробуем угадать из Caddyfile
  if [[ -f "$REPO_ROOT/caddy/Caddyfile" ]]; then
    local h
    h="$(grep -Eo 'vinops\.online' "$REPO_ROOT/caddy/Caddyfile" || true)"
    [[ -n "$h" ]] && echo "https://vinops.online" && return 0
  fi
  # дефолт из контекста
  echo "https://vinops.online"
}
HOST_URL="$(guess_host)"

curl_smart_head() {
  local url="$1"
  echo "[HEAD] $url"
  curl -k -sS -I "$url" || true
}

curl_smart_get() {
  local url="$1"
  echo "[GET-SNIPPET] $url"
  curl -k -sS "$url" | sed -n '1,160p' || true
}

{
  note "PUBLIC — HEAD / GET (snippet)" "Фиксируем коды и ключевые заголовки"
  echo "Host: $HOST_URL"
  for p in "/" "/en" "/ru" "/en/cars" "/ru/cars" "/en/contacts" "/ru/contacts" "/en/terms" "/ru/terms" "/robots.txt" "/sitemap.xml"; do
    curl_smart_head "${HOST_URL}${p}"
    echo
  done
} > "$PUB_DIR/http-head.txt" 2>&1 || true

{
  for p in "/en" "/ru" "/en/cars" "/ru/cars" "/en/contacts" "/ru/contacts" "/en/terms" "/ru/terms"; do
    curl_smart_get "${HOST_URL}${p}"
    echo
  done
} > "$PUB_DIR/http-get-snippets.txt" 2>&1 || true

# --- 09: SEO checks -----------------------------------------------------------
SEO_DIR="$(secdir 09_seo)"
{
  note "SEO — robots.txt / sitemap.xml" "Сохраняем как есть"
  curl -k -sS "${HOST_URL}/robots.txt" -o "$SEO_DIR/robots.txt" || true
  curl -k -sS "${HOST_URL}/sitemap.xml" -o "$SEO_DIR/sitemap.xml" || echo "no sitemap" > "$SEO_DIR/sitemap.missing.txt"
} >/dev/null 2>&1 || true

extract_links() { grep -Eo '<link[^>]+rel="(canonical|alternate)"[^>]*>' | sed -E 's/^[[:space:]]+//'; }

{
  note "SEO — canonical/hreflang scan" "Проверяем на ключевых страницах (grep)"
  for p in "/en" "/ru" "/en/cars" "/ru/cars" "/en/contacts" "/ru/contacts" "/en/terms" "/ru/terms"; do
    echo "[scan] ${HOST_URL}${p}"
    body="$(curl -k -sS "${HOST_URL}${p}" || true)"
    canon=$(printf "%s" "$body" | grep -c 'rel="canonical"')
    alt=$(printf "%s"  "$body" | grep -c 'rel="alternate"')
    echo "counts: canonical=${canon} alternate=${alt}"
    printf "%s" "$body" | extract_links | head -n 8
    echo
  done
} > "$SEO_DIR/canonical_hreflang.txt" 2>&1 || true

{
  note "SEO — JSON-LD templates in repo" "Ищем *.json ld и *.JsonLd.tsx"
  (cd "$REPO_ROOT" && \
    grep -RIl --exclude-dir='.git' -E '(application/ld\+json|JsonLd)' 2>/dev/null || true)
} > "$SEO_DIR/jsonld_scan.txt" 2>&1 || true

# --- 10: Database (Postgres — схемы, без данных) ------------------------------
DB_DIR="$(secdir 10_db)"
if has docker; then
  DB_CANDIDATES=$(docker ps --format '{{.Names}} {{.Image}}' | awk '/postgres/ {print $1}')
  for c in $DB_CANDIDATES; do
    {
      note "DB — $c : psql meta" "conninfo, список таблиц, размеры (если доступно)"
      docker exec "$c" sh -lc 'psql -At -U "${POSTGRES_USER:-postgres}" -d "${POSTGRES_DB:-postgres}" -c "\conninfo" 2>&1' || true
      docker exec "$c" sh -lc 'psql -At -U "${POSTGRES_USER:-postgres}" -d "${POSTGRES_DB:-postgres}" -c "\dt" 2>&1' || true
      docker exec "$c" sh -lc 'psql -At -U "${POSTGRES_USER:-postgres}" -d "${POSTGRES_DB:-postgres}" -c "SELECT schemaname||\'.\'||relname AS table, pg_size_pretty(pg_total_relation_size(relid)) AS size FROM pg_catalog.pg_statio_user_tables ORDER BY pg_total_relation_size(relid) DESC;" 2>&1' || true
    } > "$DB_DIR/${c}.txt" 2>&1 || true
  done
fi

# --- 11: ETL / Cron / Timers (read-only) --------------------------------------
CRON_DIR="$(secdir 11_cron)"
{
  note "HOST CRON" "crontab -l; systemd timers (если доступны)"
  (crontab -l 2>/dev/null || echo "no crontab for current user") || true
  echo
  if has systemctl; then
    systemctl list-timers --all 2>/dev/null || true
  else
    echo "systemctl not available"
  fi
} > "$CRON_DIR/host_cron.txt" 2>&1 || true

if has docker; then
  for c in $(docker ps --format '{{.Names}}'); do
    {
      note "CONTAINER CRON — $c" "Ищем крон и периодические задания"
      docker exec "$c" sh -lc 'crontab -l 2>/dev/null || true' || true
      docker exec "$c" sh -lc 'ls -la /etc/cron* 2>/dev/null || true' || true
      docker exec "$c" sh -lc 'ps aux 2>/dev/null | grep -E "cron|crond|node|python" | grep -v grep || true' || true
    } > "$CRON_DIR/cron-${c}.txt" 2>&1 || true
  done
fi

# --- 12: Logs (compose services) ----------------------------------------------
LOG_DIR="$(secdir 12_logs)"
if has docker && has docker compose; then
  COMPOSE_FILES=()
  for f in docker-compose.prod.yml docker-compose.db.yml docker-compose.hostfix.yml docker-compose.health.yml docker-compose.yml; do
    [[ -f "$REPO_ROOT/$f" ]] && COMPOSE_FILES+=("-f" "$REPO_ROOT/$f")
  done
  if [[ ${#COMPOSE_FILES[@]} -gt 0 ]]; then
    SERVICES=$(docker compose "${COMPOSE_FILES[@]}" config --services 2>/dev/null || true)
    for s in $SERVICES; do
      docker compose "${COMPOSE_FILES[@]}" logs --no-color --tail "$LOG_LINES" "$s" > "$LOG_DIR/${s}.log" 2>&1 || true
    done
  fi
fi

# --- 13: Configs & .env (masked) ----------------------------------------------
CFG_DIR="$(secdir 13_configs)"
{
  note "COPY CONFIGS" "docker-compose*, Dockerfile*, next.config*, Caddyfile"
  (cp -f "$REPO_ROOT"/docker-compose*.yml "$CFG_DIR"/ 2>/dev/null || true)
  (cp -f "$REPO_ROOT"/Dockerfile* "$CFG_DIR"/ 2>/dev/null || true)
  (cp -f "$REPO_ROOT/frontend/next.config.mjs" "$CFG_DIR"/ 2>/dev/null || true)
  (cp -f "$REPO_ROOT/caddy/Caddyfile" "$CFG_DIR"/ 2>/dev/null || true)
} > "$CFG_DIR/_copy.log" 2>&1 || true

# .env* (masked)
{
  note ".env MASKED" "значения секретов скрыты"
  for envf in $(find "$REPO_ROOT" -maxdepth 2 -type f -name ".env*" 2>/dev/null | sort); do
    echo "[mask] $envf"
    (cat "$envf" | mask_env_stream) > "$CFG_DIR/$(basename "$envf").masked.txt" || true
  done
} > "$CFG_DIR/env_masking.txt" 2>&1 || true

# Также снимем текущие переменные окружения (masked)
(printenv 2>/dev/null | mask_env_stream) > "$CFG_DIR/printenv.masked.txt" || true

# --- 14: Static / public ------------------------------------------------------
STAT_DIR="$(secdir 14_static)"
{
  note "PUBLIC STATIC" "карта крупных файлов"
  PUB="$REPO_ROOT/frontend/public"
  if [[ -d "$PUB" ]]; then
    echo "[dir] $PUB"
    # top-50 по размеру
    (cd "$PUB" && find . -type f -printf '%s\t%p\n' | sort -nr | head -n 50) > "$STAT_DIR/public_top50.txt" || true
  else
    echo "no frontend/public"
  fi
} > "$STAT_DIR/static.txt" 2>&1 || true

# --- Индекс секций ------------------------------------------------------------
{
  echo "Sections:"
  find "$CTX_DIR" -maxdepth 2 -type f -printf '%P\n' | sort
} > "$CTX_DIR/INDEX.txt" || true

# --- Архивация ----------------------------------------------------------------
cd "$REPO_ROOT/context"
TAR="context-${TS}.tar.gz"
tar -czf "$TAR" "context-${TS}" || true
echo "Saved: $REPO_ROOT/context/${TAR}"
