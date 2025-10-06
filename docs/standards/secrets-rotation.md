# Secrets Rotation — vinops tg-bot (S2.9)

## Хранилища
- age private key: `/root/.config/sops/age/keys.txt` (600)
- прод-ENV файла бота: `/etc/vinops/tg-webhook.env` (600)
- sops-источник: `infra/secrets/.env.sops.yaml`

## Ротация (шаги)
1) Сгенерировать новый age-ключ (если требуется) и добавить **публичный** в `.sops.yaml`.
2) `sops -e infra/secrets/.env.sops.yaml > infra/secrets/.env.sops.yaml` (редактирование ключей).
3) На хосте: убедиться, что новый приватный ключ в `~/.config/sops/age/keys.txt`.
4) Деплой: `sops -d infra/secrets/.env.sops.yaml > /etc/vinops/tg-webhook.env.tmp && install -m600 /etc/vinops/tg-webhook.env.tmp /etc/vinops/tg-webhook.env`.
5) Проверить обязательные ключи: `NODE_ENV,BOT_MODE,REPLY_MODE,WEBHOOK_PUBLIC_URL,WEBHOOK_SECRET,WEBAPP_BASE_URL`.
6) `systemctl daemon-reload && systemctl restart tg-webhook.service`.
7) Валидация: `systemctl show tg-webhook.service -p Environment` (значения не логировать), `journalctl -u tg-webhook.service -n 50`.

## Инциденты
- Отсутствует ключ → восстановить бэкап `keys.txt`.
- Ошибка sops → проверить `~/.config/sops/age/keys.txt`.
