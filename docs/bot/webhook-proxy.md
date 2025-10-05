# Webhook proxy (Telegram) — tg.vinops.online

**Зона:** Europe/Warsaw  
**Цель:** Проксировать `/tg-webhook*` к локальному бэкенду `127.0.0.1:8091` **только** при наличии `X-Telegram-Bot-Api-Secret-Token`. Иначе — `401`.

## Топология
Cloudflare (TLS) → Caddy (origin TLS: `tls internal`) → `127.0.0.1:8091`

## Конфиг Caddy (фрагмент)
```caddyfile
# --- tg.vinops.online webhook (S2.5-02) ---
tg.vinops.online {
  tls internal
  encode zstd gzip

  @tg path /tg-webhook*
  @tgGood {
    path /tg-webhook*
    header X-Telegram-Bot-Api-Secret-Token *
  }

  route {
    reverse_proxy @tgGood 127.0.0.1:8091
    respond @tg 401
    respond 404
  }
}
# --- /tg.vinops.online webhook ---

