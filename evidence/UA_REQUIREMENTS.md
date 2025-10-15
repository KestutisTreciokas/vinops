# UA / REFERER / CSRF — MS-CSV-05
- Timestamp: 2025-10-15T06:07:23.909Z

## User-Agent
- Observed on CSV request: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36`
- Requirement (internal policy): **REQUIRED** — отправлять правдоподобный desktop User-Agent. Основание: антибот/Imperva.

## Referer



- Observed on CSV request: `https://www.copart.com/`

- Requirement: REQUIRED — observed on CSV request.
## CSRF
- Login POST: PRESENT
- CSV GET: **NOT USED** (CSRF не применялся к GET для salesdata.cgi по HAR).
- Observed CSRF headers:
  - x-xsrf-token @ https://www.copart.com/public/data/userConfig?_=1760507768007
  - x-xsrf-token @ https://www.copart.com/public/data/referenceDataByObject/countries
  - x-xsrf-token @ https://www.copart.com/public/fetchDirective.html?directive=modal/modal&agent=007
  - x-xsrf-token @ https://www.copart.com/public/data/quickPickCounts/HOME
  - x-xsrf-token @ https://www.copart.com/public/data/envconfig/properties
  - x-xsrf-token @ https://www.copart.com/public/data/locations/retrieveLocationsListBySite
  - x-xsrf-token @ https://www.copart.com/CMS/en/Content/us/en/Title-Description
  - x-xsrf-token @ https://www.copart.com/CMS/en/Content/us/en/User/GlobalAlerts.html
  - x-xsrf-token @ https://www.copart.com/public/data/envconfig/properties
  - x-xsrf-token @ https://www.copart.com/public/home/content?userLang=en&initialPageLayout=HOME_PAGE

## Summary
- CSV 200 observed: YES
- UA requirement: FIXED UA — Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36
- Referer requirement: REQUIRED — observed on CSV request

- CSV 200 observed: YES
- UA requirement: REQUIRED
- Referer requirement: UNKNOWN
- CSRF requirement: Login=PRESENT, CSV=NOT USED
