import type { Metadata } from 'next'

export default function CarsLayout({ children }: { children: React.ReactNode }) {
  return children
}

export async function generateMetadata(
  { params }: { params: { lang: 'en'|'ru' } }
): Promise<Metadata> {
  const BASE = 'https://vinops.online'
  const PATH = '/cars'
  const canonical = `${BASE}/${params.lang}${PATH}`

  return {
    // дублируем на всякий случай; у вас он также задан в [lang]/layout.tsx
    metadataBase: new URL(BASE),
    alternates: {
      canonical,
      languages: {
        en: `${BASE}/en${PATH}`,
        ru: `${BASE}/ru${PATH}`,
        'x-default': `${BASE}/en${PATH}`,
      },
    },
  }
}
