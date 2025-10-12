# KPACK — fe/seo (SSR + индекс)
## Scope
- Next.js (App Router) SSR: /{lang}/vin/{VIN}, /cars, robots/sitemaps.
## Inputs
- API v1 DTO, Images CDN (`img.vinops.online`).
## Outputs
- Каноникал/hreflang/JSON-LD Vehicle + BreadcrumbList; VIN-sitemaps (≤50k/файл).
## Gates
- Нельзя ломать URL-канон `/{lang}/vin/{VIN}`; / → 308 → /en; self-hosted fonts.
