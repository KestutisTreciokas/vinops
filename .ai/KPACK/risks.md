# KPACK — risks
- Блокирующие: DB schema break, CF/WAF/headers, prod secrets misuse.
- Митигаторы: Approval Gates, small patches, CI contract tests, auto-revert.
- SLA: удаление VIN ≤ 10 мин; ETL lag alert > 60 мин.
