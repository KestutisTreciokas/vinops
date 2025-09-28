import Script from 'next/script'

export default function VinLayout({
  params, children,
}: {
  params: { lang: 'en'|'ru'; vin: string },
  children: React.ReactNode
}) {
  const vehicle = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    "vehicleIdentificationNumber": params.vin
  }
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": params.lang === "ru" ? "Главная" : "Home" },
      { "@type": "ListItem", "position": 2, "name": "VIN " + params.vin }
    ]
  }

  return (
    <>
      {/* Вставляем JSON-LD именно в <head> через beforeInteractive */}
      <Script
        id="ld-vehicle"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicle) }}
      />
      <Script
        id="ld-breadcrumbs"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {children}
    </>
  )
}
