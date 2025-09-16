import type { Metadata } from 'next'

export type Lang = 'ru' | 'en'

const BASE =
  (process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
    'http://localhost:3002')

function abs(path: string = '/') {
  if (!path.startsWith('/')) path = '/' + path
  return `${BASE}${path}`
}

/**
 * Универсальная «база» для метаданных страницы.
 * Используй так: baseMetadata({ lang, title, description, path: `/vin/${vin}` })
 */
export function baseMetadata({
  lang,
  title,
  description = '',
  path = '/',
}: {
  lang: Lang
  title: string
  description?: string
  path?: string
}): Metadata {
  const canonical = abs(`/${lang}${path}`)
  return {
    title,
    description,
    metadataBase: new URL(BASE),
    alternates: {
      canonical,
      languages: {
        'ru-RU': abs(`/ru${path}`),
        'en-US': abs(`/en${path}`),
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'vinops',
      title,
      description,
      url: canonical,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
