# Политика секретов — sops/age (S0)

## 1) Инварианты
- Все секреты в репозитории — **только** в зашифрованном виде (sops/age).
- Ключ age хранится по пути: **`/srv/vinops/age/keys.txt`** (root-owned, `0600`). Бэкап — офлайн-носитель/парольный сейф по регламенту Ops.
- Под S0 шифруются файлы с расширением `*.sops.yaml` в **`infra/secrets/**`**. Для будущих секретов сервисов зарезервировано правило на `services/tg-bot/**/secrets/**` (см. `.sops.yaml`).
- Любое добавление новых ключей конфигурации сопровождается обновлением `docs/standards/env-matrix.md` и этого документа.

## 2) Реестр секретов (S0)
| Ключ                | Назначение                               | Владелец     | Хранение/ротация                                  | Аварийный доступ |
|---------------------|-------------------------------------------|--------------|---------------------------------------------------|------------------|
| `BOT_TOKEN`         | Токен Telegram бота (prod/stage/dev)      | **UNKNOWN**  | `infra/secrets/.env.sops.yaml` (sops/age)         | Через Ops + `/srv/vinops/age/keys.txt` |
| `ALERT_BOT_TOKEN`   | Токен alert-бота                          | **UNKNOWN**  | `infra/secrets/.env.sops.yaml`                    | То же            |
| `POSTGRES_DSN`      | Подключение к Postgres 17                 | **UNKNOWN**  | `infra/secrets/.env.sops.yaml`                    | То же            |
| `WEBAPP_BASE_URL`   | База Mini App (константа)                 | Strateg/Dev  | конфиг (может быть публичен)                      | не требуется     |
| `PAYMENTS_BASE_URL` | База payments-ingest (mock/real)          | **UNKNOWN**  | `infra/secrets/.env.sops.yaml` (prod — секрет)    | Через Ops        |
| `NODE_ENV`          | Режим окружения                           | DevOps       | конфиг                                            | не требуется     |
| `LOG_LEVEL`         | Уровень логирования                       | DevOps       | конфиг                                            | не требуется     |
| `PORT`              | Порт приложения                           | DevOps       | конфиг                                            | не требуется     |
| `RATELIMIT_QPS`     | Лимиты запросов                           | DevOps       | конфиг                                            | не требуется     |

> **UNKNOWN → Как проверить:** предоставить список ответственных (ФИО/ник) с ролями: владелец секрета (ротация), заместитель, аудит.

## 3) Процедура **disaster-rekey** (двухфазная, без простоя)
**Цель:** перевыпустить age-ключ и перевооружить все шифрованные файлы на новый ключ.

**Предпосылки:** доступ root на хосте, установлен `sops/age`, актуальный репозиторий.

### Фаза A — Выпуск нового ключа и совместная валидность
1. Сгенерировать новый ключ:
   ```bash
   umask 177
   age-keygen -o /srv/vinops/age/keys.txt.new
   chmod 0600 /srv/vinops/age/keys.txt.new
   chown root:root /srv/vinops/age/keys.txt.new
   ```
2. Проверить новый public:
   ```bash
   age-keygen -y /srv/vinops/age/keys.txt.new
   ```
3. Добавить новый recipient во все секректы (временный период совместной валидности):
   ```bash
   export SOPS_AGE_KEY_FILE=/srv/vinops/age/keys.txt
   sops -r -i infra/secrets/.env.sops.yaml
   # при наличии других *.sops.yaml в целевых путях — аналогично
   ```
4. Переключить default ключ:
   ```bash
   export SOPS_AGE_KEY_FILE=/srv/vinops/age/keys.txt.new
   sops -d infra/secrets/.env.sops.yaml >/dev/null
   mv /srv/vinops/age/keys.txt /srv/vinops/age/keys.txt.old
   mv /srv/vinops/age/keys.txt.new /srv/vinops/age/keys.txt
   chmod 0600 /srv/vinops/age/keys.txt
   ```
5. Финальная проверка и санитария:
   ```bash
   export SOPS_AGE_KEY_FILE=/srv/vinops/age/keys.txt
   sops -d infra/secrets/.env.sops.yaml > /tmp/vinops.env.yaml
   # Не коммитить, удалить после использования
   shred -u /tmp/vinops.env.yaml
   ```
