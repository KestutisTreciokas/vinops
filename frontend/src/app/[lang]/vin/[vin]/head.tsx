// VIN <head>: гарантированные canonical / hreflang / JSON-LD
export default function Head({ params }: { params: { lang: 'en'|'ru'; vin: string } }) {
  const { lang, vin } = params;
  const base = 'https://vinops.online';
  const path = `/${lang}/vin/${vin}`;
  const hrefCanonical = `${base}${path}`;
  const hrefEn = `${base}/en/vin/${vin}`;
  const hrefRu = `${base}/ru/vin/${vin}`;

  const vehicle = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    "vehicleIdentificationNumber": vin
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": lang === "ru" ? "Главная" : "Home", "item": `${base}/${lang}` },
      { "@type": "ListItem", "position": 2, "name": `VIN ${vin}`, "item": hrefCanonical }
    ]
  };

  return (
    <>
      <link rel="canonical" href={hrefCanonical} />
      <link rel="alternate" href={hrefEn} hrefLang="en" />
      <link rel="alternate" href={hrefRu} hrefLang="ru" />
      <link rel="alternate" href={hrefEn} hrefLang="x-default" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicle) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
    </>
  );
}
