# PR Convention — vinops

## Ветки
- `feat/<area>-<slug>`, `fix/<area>-<slug>`, `chore/<slug>`, `docs/<slug>`, `bot/<slug>`
- `staging` — для интеграции и быстрых авто-правок агентов.
- `main` — защищена: merge-queue + обязательные статусы.

## Коммиты (Conventional Commits)
`<type>(<scope>): <subject>`

Типы: `feat|fix|perf|refactor|docs|test|build|chore|ci`.  
Scope: `frontend|api|etl|domain|images|seo|infra|admin|observability`.

## Заголовок PR
`[AGENT] <type>(<scope>): <subject> [RISK:<LOW|MED|HIGH>] [AREA:<module>]`

## Чек-лист PR (минимум)
- [ ] Соответствует `/.ai/ALLOWED_AREAS.yaml`
- [ ] При превышении лимитов/чувствительных зонах — приложена `gate_request` и получен `gate_response: approve`
- [ ] Пройдены CI/контракты/смоки

## Метки (labels)
`agent`, `risk:high|med|low`, `module:<...>`, `gate:req|approved|denied`.

## KPACK
- [Agents Policy](/docs/AGENTS_POLICY.md)
- [Approval Gates](/.ai/APPROVAL_GATES.yaml)
- [Allowed Areas](/.ai/ALLOWED_AREAS.yaml)
