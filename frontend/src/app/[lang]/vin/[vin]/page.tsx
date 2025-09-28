import type { Metadata } from 'next'

export async function generateMetadata(
  { params }: { params: { lang: 'en'|'ru', vin: string } }
): Promise<Metadata> {
  const { lang, vin } = params
  const base = new URL('https://vinops.online')
  const path = `/${lang}/vin/${vin}`

  return {
    metadataBase: base,
    alternates: {
      canonical: path,
      languages: {
        en: `/en/vin/${vin}`,
        ru: `/ru/vin/${vin}`,
        'x-default': `/en/vin/${vin}`,
      },
    },
    robots: { index: true, follow: true },
  }
}

// Страница (минимальная заглушка — реальный контент уже есть в проекте)
export default function VinPageWrapper({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}
