# Паспорт сети и доступа к БД — vinops.online (актуально)
Зона времени: Europe/Warsaw

## Узлы
- VPS (App/ETL): 185.200.243.100 (pub), 192.168.0.4 (priv)
- DB (PostgreSQL 17): 92.255.110.134 (pub — закрыт), 192.168.0.5 (priv), FQDN: 418a052549dc7dac1163fd68.twc1.net

## Инварианты
- Трафик App/ETL → PG только по приватной сети 192.168.0.0/24.
- Prod-подключения всегда с TLS: `sslmode=verify-full` (см. security/tls-postgres.md).
- Публичный 5432 закрыт; IPv6 к БД отключён.

## Firewall
- DB-FW (inbound): allow TCP/5432 из 192.168.0.4/32; reject остальное.
- VPS-FW (inbound): allow 80/443 из всех; 22 — только админ IP. (outbound: allow TCP/5432 → 192.168.0.5/32; allow 443)

## Смоки
- `nc -zvw2 192.168.0.5 5432` → OK
- `nc -zvw2 92.255.110.134 5432` → FAIL

FQDN: 418a052549dc7dac1163fd68.twc1.net
