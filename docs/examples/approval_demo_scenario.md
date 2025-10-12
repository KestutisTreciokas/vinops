# Demo сценарий: Gate + Secret Broker + Fast-Track + Merge-Queue + DP

## Цель
Показать на реальном PR:
1) Gate-блокировку до APPROVE и разблокировку после;
2) Secret Broker: deny без APPROVE → success c APPROVE;
3) Fast-Track auto-merge на зелёном PR;
4) Merge-Queue (вхождение в очередь);
5) Диагностический пролог (DP) — блокировка до закрытия Issue.

## Шаги (через GitHub Web UI):
1. Откройте репозиторий → вкладка **Code** → перейдите в файл `docs/PR_CONVENTION.md`.
2. Нажмите **Edit** (карандаш), измените малую строку (например, добавьте пустую строку в конец).
3. Внизу выберите **Create a new branch**, имя: `demo/gates-approval`, откройте **Pull request**.
4. В PR добавьте **комментарий** с Gate-запросом:

```yaml
gate_request:
  id: PROD_SECRETS_ACCESS
  pr: <номер PR>
  risk: HIGH
  area: release
  summary: "Trigger production deploy workflow with prod secrets"
  requested_by: "vinops-ai"
  timestamp: "<UTC ISO8601>"

