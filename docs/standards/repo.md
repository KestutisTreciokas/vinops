# Repository Structure — vinops-tg-bot (S0 baseline)

Цель: единообразная структура для ветки бота и мини-приложения.

## Дерево (уровень S0)
- `services/tg-bot/`
  - `bot/` — код Telegram-бота
  - `webapp/` — код Mini App (Telegram WebApp)
  - `README.md` — описание сервиса (эта ветка)
- `infra/`
  - `secrets/` — зашифрованные конфиги через sops/age
- `docs/`
  - `standards/` — стандарты (репо, конфиг, webapp и т. п.)
  - `decisions/` — Decision Log
- `evidence/`
  - `S0/` — артефакты и отчёты спринта S0

## Именование
- директории и файлы — kebab-case, документы — `.md`.
- отчёты/артефакты — под `evidence/<Sprint>/`.

## Таймзона
- Все даты/время документируем в `Europe/Warsaw` (YYYY-MM-DD HH:mm).
