# Cloudflare — Evidence & Runbook (vinops.online)

**Zone:** `vinops.online` (`cada0a021d91eb29fac9b94f9e64fdf2`)  
**Last updated (Europe/Warsaw):** 2025-10-12 16:05

## 1. Минимально необходимые права API-токена
Для полноценной проверки безопасности и выборок GQL/REST используем *zone-scoped* токен с правами:
- **Zone Analytics: Read**
- **Zone Firewall Services: Read**
- **Zone Rulesets: Read**
- (Опционально для удобства) **Zone: Read**

Создание: *Dashboard → My Profile → API Tokens → Create Token → Custom Token*  
Permissions (выше) → *Zone Resources: Include → Specific zone → `vinops.online`* → Create.

## 2. Матрица проверок и ожидаемые коды
| Проверка | Путь | Условия | Ожидаемо |
|---|---|---|---|
| CF блокировка GET | `/tg-webhook` | GET | **403 (CF)** |
| CF блокировка POST без заголовка | `/tg-webhook` | POST, **нет** `x-telegram-bot-api-secret-token` | **403 (CF)** |
| Origin отказ по неверному секрету | `/tg-webhook` | POST, `x-telegram-bot-api-secret-token: bad` | **401 (origin)** |
| Origin 404-маркер | `/__not-a-hook__-<RUN_ID>?run=<RUN_ID>` | POST | **404 (origin)** + строка в journald |
| GQL по пути | `/tg-webhook` | `edgeResponseStatus:403` | ≥1 запись `block 403` |
| GQL по Ray | Ray из заголовка CF | - | **Может отсутствовать** (sampling в Adaptive) |

## 3. Где смотреть артефакты
Все артефакты: `/root/work/vinops.restore/evidence/ms-S2.9-04/`
- `get_hook_*.hdr/body`, `post_nohdr_*.hdr/body` — CF 403.
- `post_badsec_*_origin401.hdr/body` — **401 от origin (этот кейс должен быть всегда)**.
- `post_404_*_*.hdr/body` + `journal_last15m_404_*.log` — 404-маркер и строка journald.
- `cf_gql_*`, `cf_firewall_events_*.json` — выгрузки CF GQL/REST (по пути надёжнее, чем по Ray).

## 4. Почему GQL по Ray может быть пустой
`firewallEventsAdaptive` и `httpRequestsAdaptiveGroups` — адаптивные, выборка по конкретному Ray не гарантирована.  
Для приёмки используем **GQL по пути** (`clientRequestPath:"/tg-webhook" AND edgeResponseStatus:403`) — стабильно отражает блокировки.

## 5. Быстрые one-liners (read-only)
```bash
# Последние Ray из матрицы 403 (артефакты уже сохранены):
ls -1t /root/work/vinops.restore/evidence/ms-S2.9-04/get_hook_*.hdr | head -n1 | xargs -I{} awk -F': ' 'tolower($1)=="cf-ray"{print $2}' {}
ls -1t /root/work/vinops.restore/evidence/ms-S2.9-04/post_nohdr_*.hdr | head -n1 | xargs -I{} awk -F': ' 'tolower($1)=="cf-ray"{print $2}' {}

# Проверка наличия 401-артефакта origin:
ls -1 /root/work/vinops.restore/evidence/ms-S2.9-04/post_badsec_*_origin401.hdr | head -n1

