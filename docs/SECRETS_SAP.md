# Secrets Access Policy (SAP) — vinops

**Версия:** 1.0 · **Статус:** Active · **Область:** доступ агентов/CI к секретам (GitHub Environments, Cloudflare, SSH, DB, R2).

## 1. Принципы
- Секреты **не в коде** и не в PR. Только **GitHub Environments** (production/development) и переменные рантайма.
- **Prod-секреты** доступны **только** через Approval Gate `PROD_SECRETS_ACCESS`.
- Агенты могут читать/использовать секреты **через GitHub Actions**; прямого доступа из агентного рантайма к значениям нет.
- Логи/артефакты должны **редактировать** секреты (redaction).
- Любая ротация секретов — отдельный PR с записью в журнал.

## 2. Перечень секретов (канонический)
- **Cloudflare:** `CF_API_TOKEN` (минимум Purge Cache), `CF_ZONE_ID`.
- **GHCR:** `GHCR_PULL_USER`, `GHCR_PULL_TOKEN` (PAT: read:packages).
- **SSH deploy:** `PROD_SSH_HOST`, `PROD_SSH_USER`, `PROD_SSH_KEY` (prod); `DEV_*` — для dev.
- **Base URLs:** `PROD_BASE_URL`, `DEV_BASE_URL`.
- **R2:** `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`.
- **DB:** `DATABASE_URL` (prod/dev, TLS verify-full).
- **Observability:** `SENTRY_DSN` (опц.), `PROMETHEUS_*` (опц.).

## 3. Доступ агентов
- **Разрешено:** вызывать GitHub Actions, которые используют секреты сред (dev/prod).
- **Запрещено:** читать значения секретов напрямую, писать секреты в логи/комментарии/PR-описания.
- **Prod:** запуск workflows, использующих prod-секреты, допускается **только** при наличии одобренного Gate `PROD_SECRETS_ACCESS`.

## 4. Аудит и ротация
- Каждый запуск workflows с секретами фиксируется в журнале релиза (`/docs/releases/release-*.json`).
- Ротация: вносится в `docs/releases/secrets_rotation.log` с датой и ответственным.

## 5. KPACK (локальные ссылки)
- [Approval Gates](/.ai/APPROVAL_GATES.yaml)
- [Allowed Areas](/.ai/ALLOWED_AREAS.yaml)
- [PR Convention](/docs/PR_CONVENTION.md)
- [Agents Policy](/docs/AGENTS_POLICY.md)

