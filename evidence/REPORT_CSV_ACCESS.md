# REPORT — Copart CSV Access (diagnostic)
- Generated: 2025-10-15 08:57 Europe/Warsaw
- Timestamp: 2025-10-15 08:36 
- Scope: MS-CSV-01…05 consolidated

## Executive Summary
- Как скачивается CSV: через кнопку **Download Sales Data** после логина Member; финальный прямой URL: `https://inventory.copart.io/FTPLSTDM/salesdata.cgi?authKey=YPYU91EI`.
- Авторизация: **cookie после интерактивного логина**; CSV 200 at 2025-10-15T06:07:23.908Z.
- User-Agent/Referer: FIXED UA — Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36; REQUIRED — observed on CSV request.
- Прокси (RU): NEEDED (RU-direct forbidden; proxy allows access) / Proxy: REQUIRED (для доступа к страницам сайта из RU; для прямого CSV — NOT REQUIRED). Обоснование: RU-direct для страниц даёт 403, а EU/US прокси на /downloadSalesData дают 302 — см. матрицу в REGION_ACCESS.md..
- URL природа: tokenized (query-param authKey=…); TTL: не установлен в MS-CSV-01 (проверяется в MS-CSV-02).
- Частота обновления: **~15 минут** (CSV_DIFF: updated=YES, Last-Modified=Wed, 15 Oct 2025 03:45:03 GMT).
- Статус готовности: **diagnostic-only** (без прод-автоматизации).

## Источник и URL-механика
- Финальный URL: `https://inventory.copart.io/FTPLSTDM/salesdata.cgi?authKey=YPYU91EI`
- Классификация URL: tokenized (query-param authKey=…)
- TTL/одноразовость: не установлен в MS-CSV-01 (проверяется в MS-CSV-02)
- Заголовки CSV ответа (из CSV_HEADERS.md): Content-Type=application/octet-stream, Content-Length=95989841, Content-Disposition=attachment; filename="salesdata.csv", Last-Modified=Wed, 15 Oct 2025 03:45:03 GMT, Cache-Control=отсутствует, ETag="68ef18bf-5b8b051"
- Ссылки: CSV_HAR_1.har, CSV_URLS.txt, CSV_HEADERS.md

Source URL: https://inventory.copart.io/FTPLSTDM/salesdata.cgi?authKey=YPYU91EI
URL classification: tokenized (query-param)
URL TTL: UNKNOWN — Как проверить: повторить GET этого же URL через ≥20 минут; зафиксировать код ответа и заголовки. Если 200 и Last-Modified меняется — URL многоразовый; если 403/redirect — одноразовый/с TTL.
## Авторизация
- Способ: cookie после интерактивного логина Member; CSV 200 at 2025-10-15T06:07:23.908
Authorization: COOKIE (Member login)
UA requirement: FIXED UA — Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36
Z
- Требования: FIXED UA — Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36; Referer: REQUIRED — observed on CSV request; CSRF: Login=PRESENT, CSV=NOT USED
- Ссылки: AUTH_FLOW.md, UA_REQUIREMENTS.md

## Частота обновления и эволюция URL
Frequency: ~15 min (observed)
- Интервалы и факт обновления: updated=YES по CSV_DIFF.md
- Поведение URL: SAME (run1=https://inventory.copart.io/FTPLSTDM/salesdata.cgi?authKey=YPYU91EI @ 2025-10-15T04:04:20.997
Observed update: YES
URL behavior: SAME (window 1380s)
Frequency: UNKNOWN — Как проверить: выполнить 4–6 скачиваний каждые 15 мин и подтвердить стабильные обновления.
Z; run2=https://inventory.copart.io/FTPLSTDM/salesdata.cgi?authKey=YPYU91EI @ 2025-10-15T04:27:20.510Z)
- Ссылки: run1.csv, run2.csv, CSV_DIFF.md, CSV_URL_EVOLUTION.md

## Объём/состав данных
- Колонки: 59 (см. CSV_SCHEMA.md)
- Покрытие категорий: ALL; Фильтры экспорта: NONE
- Валидация лотов: см. раздел Verification в CSV_VOLUME.md (итог: OK=3, MIXED=0, FAIL=0)
- Ссылки: CSV_SCHEMA.md, CSV_VOLUME.md

Columns: 59
Categories coverage: ALL
Filters in export: NONE
## Региональные ограничения
- Матрица: см. REGION_ACCESS.md
- Итоги: CSV verdict — NOT NEEDED (RU-direct csvurl=200); Site verdict — NEEDED (RU-direct forbidden; proxy allows access)
- Proxy recommendation: REQUIRED (для доступа к страницам сайта из RU; для прямого CSV — NOT REQUIRED). Обоснование: RU-direct для страниц даёт 403, а EU/US прокси на /downloadSalesData дают 302 — см. матрицу в REGION_ACCESS.md. (см. PROXY_NEED.md)

## Комплаенс/лицензия
- Используем только официальный механизм **Download Sales Data CSV** после логина; без скрейпинга/краулинга.
- Decision Log: **DL-009 — Copart CSV access (diagnostic-only, compliant flow)** — упомянут в отчёте; изменения политики допускаются, требуется периодическая ревалидация.

## Риски и ограничения
- Антибот/Imperva: возможны блокировки/капча, rate-limit.
- Истечение сессий/куки; требования к UA/Referer.
- Гео/санкции (RU): страницы сайта 403 без прокси; прямой CSV-URL доступен в текущих тестах, но политика может измениться.
- Отсутствие публичного API/SLAs; URL с параметром authKey.

## Рекомендация (Go/No-Go) и рабочий порядок
- **Recommendation:** Go (diagnostic-only). Для прод-интеграции — требуется юр.проверка ToS, антибот-стратегия и стабильный регламент продления сессий.
- **Регламент диагностики (ручной):**
  1) Войти под Member в браузере (EU/US exit при необходимости).
  2) Перейти на https://www.copart.com/downloadSalesData и нажать **Download CSV file**.
  3) Зафиксировать HAR и финальный URL; скачать CSV; выписать заголовки 200.
  4) Через ≥20 минут повторить шаг 2–3; сравнить обновление (CSV_DIFF.md).
  5) При необходимости использовать прокси (см. REGION_ACCESS.md/PROXY_NEED.md).

## Приложения — индекс артефактов (имя → SHA256, размер, дата)
- evidence/CSV_HAR_1.har: size=1212851 sha256=`0c9513d14ab0ce679a01f56977bbc5c4c023971a6cdf01774b2f93704cc47977` mtime=2025-10-15 05:48 
- evidence/CSV_URLS.txt: size=203 sha256=`fac7976d5d70f507764ce264ae24cb9d52b6dc986bb6fb6579902ac50500a783` mtime=2025-10-15 05:53 
- evidence/CSV_HEADERS.md: size=428 sha256=`25ccb9c256552d8e79ce7ea74bbc7c38c146c87ee51323686f74e3414cb8831b` mtime=2025-10-15 05:53 
- samples/run1.csv: size=95972917 sha256=`aa89b0ee7917c4efc382df0685d03ecd3f4e2aec6a135bfc51afcfc102e872be` mtime=2025-10-15 06:07 
- samples/run2.csv: size=95968112 sha256=`a3017cab8006dee4d11780ca6a1b428ef96c40d444d003ef70fbb62647e03d18` mtime=2025-10-15 06:29 
- evidence/CSV_DIFF.md: size=308 sha256=`a0938cb772fc2c914746c95a81c0a3a900733f9c04327fb7a7c005f5bb749458` mtime=2025-10-15 06:38 
- evidence/CSV_URL_EVOLUTION.md: size=441 sha256=`c499576f515ac2fb0a831deab0943eeb91682454c80ebba81a409f5121e22244` mtime=2025-10-15 06:38 
- evidence/CSV_SCHEMA.md: size=2387 sha256=`1c3fed946c8932f801ce70a59086d9cf531d51fec57fcde96c18229950cc5700` mtime=2025-10-15 07:08 
- evidence/CSV_VOLUME.md: size=5224 sha256=`242c669fdf501c12381032d320ed94c70da6784f663b340e851da07ba8b42ce8` mtime=2025-10-15 07:08 
- evidence/REGION_ACCESS.md: size=973 sha256=`a337ae3fe4db2231683c43345d5a91e6f201fc56e4f6a99b262b649cf2cca8f2` mtime=2025-10-15 07:48 
- evidence/PROXY_NEED.md: size=1363 sha256=`cdc52805bfc9236588eb4c8dc088f7d431c0854026d118e1afb4119429f54659` mtime=2025-10-15 07:48 
- evidence/AUTH_FLOW.md: size=3987 sha256=`0b0dc9edcb8b49ca568e6fdfe1dc5bacbf6c7669b15b71e3d311bf7b5d96070f` mtime=2025-10-15 08:17 
- evidence/UA_REQUIREMENTS.md: size=1890 sha256=`368c304dca3ff6c7aa66d37d9cde0a000338521c6ac5781c771b81916c1bc391` mtime=2025-10-15 08:24 

## DoD (встроенная проверка)
- Зависимости MS-CSV-01…05: проверены ссылками выше; отсутствующие помечены UNKNOWN + Как проверить.
- Однозначные ответы даны по: URL/природа/TTL; Авторизация+UA/Referer/CSRF/TTL; Частота+поведение URL; Объём/колонки; Регион/прокси; Комплаенс (DL-009); Рекомендация+регламент.
- Отчёт оформлен: evidence/REPORT_CSV_ACCESS.md @ 2025-10-15 08:36 .
## Приложения — индекс артефактов
- evidence/CSV_HAR_1.har: size=1212851 sha256=0c9513d14ab0ce679a01f56977bbc5c4c023971a6cdf01774b2f93704cc47977
- evidence/CSV_URLS.txt: size=203 sha256=fac7976d5d70f507764ce264ae24cb9d52b6dc986bb6fb6579902ac50500a783
- evidence/CSV_HEADERS.md: size=428 sha256=25ccb9c256552d8e79ce7ea74bbc7c38c146c87ee51323686f74e3414cb8831b
- samples/run1.csv: size=95972917 sha256=aa89b0ee7917c4efc382df0685d03ecd3f4e2aec6a135bfc51afcfc102e872be
- samples/run2.csv: size=95968112 sha256=a3017cab8006dee4d11780ca6a1b428ef96c40d444d003ef70fbb62647e03d18
- evidence/CSV_DIFF.md: size=308 sha256=a0938cb772fc2c914746c95a81c0a3a900733f9c04327fb7a7c005f5bb749458
- evidence/CSV_URL_EVOLUTION.md: size=441 sha256=c499576f515ac2fb0a831deab0943eeb91682454c80ebba81a409f5121e22244
- evidence/CSV_SCHEMA.md: size=2387 sha256=1c3fed946c8932f801ce70a59086d9cf531d51fec57fcde96c18229950cc5700
- evidence/CSV_VOLUME.md: size=5224 sha256=242c669fdf501c12381032d320ed94c70da6784f663b340e851da07ba8b42ce8
- evidence/REGION_ACCESS.md: size=973 sha256=a337ae3fe4db2231683c43345d5a91e6f201fc56e4f6a99b262b649cf2cca8f2
- evidence/PROXY_NEED.md: size=1363 sha256=cdc52805bfc9236588eb4c8dc088f7d431c0854026d118e1afb4119429f54659
- evidence/AUTH_FLOW.md: size=3987 sha256=0b0dc9edcb8b49ca568e6fdfe1dc5bacbf6c7669b15b71e3d311bf7b5d96070f
- evidence/UA_REQUIREMENTS.md: size=1890 sha256=368c304dca3ff6c7aa66d37d9cde0a000338521c6ac5781c771b81916c1bc391
