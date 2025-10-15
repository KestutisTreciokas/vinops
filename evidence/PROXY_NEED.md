# PROXY NEED — MS-CSV-04
- Timestamp: 2025-10-15 07:45 CEST

## Conclusions
- For CSV direct download: **NOT NEEDED (CSV_URL reachable with RU-direct)**
- For site pages (root/downloadSalesData): **NEEDED (RU-direct forbidden; proxy allows access)**

## Risks / ToS
- Использование прокси для обхода гео-блокировок может **нарушать условия использования (ToS)** Copart; требуется юридическая проверка.
- Imperva/Incapsula может детектировать прокси/бота → **риск блокировок**, капчи, rate-limit.
- Изменения политики доступа со стороны Copart возможны без уведомления → потребуется **повторная валидация** перед прод-пайплайном.
- Хранение токенов/ключей в URL требует контроля секретов; не делиться третьим сторонам.

Proxy recommendation: REQUIRED (для доступа к страницам сайта из RU; для прямого CSV — NOT REQUIRED). Обоснование: RU-direct для страниц даёт 403, а EU/US прокси на /downloadSalesData дают 302 — см. матрицу в REGION_ACCESS.md.
