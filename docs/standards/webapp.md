# Telegram WebApp — стандарты (заметка для S0)

Mini App (Telegram WebApp) работает внутри клиента Telegram. SEO/robots/sitemap к нему не применяются. Требования безопасности:
- Верификация подписи `initData` на backend каждого запроса.
- CSP: запрещены внешние произвольные скрипты.
- Явный timezone: Europe/Warsaw в UI.

Подробные требования UI/данных — в спринтах S2–S3.
