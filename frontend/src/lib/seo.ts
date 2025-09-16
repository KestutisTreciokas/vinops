import type { Metadata } from 'next'

export type Lang = 'ru' | 'en'
export const SUPPORTED_LANGS: Lang[] = ['ru','en']

export function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
}

export function canonicalFor(path: string) {
  const base = siteUrl().replace(/\/+$/,'')
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`
}

export function makeAlternates(path: string) {
  const clean = path.replace(/^\/(ru|en)\//, '/')
  return {
    canonical: canonicalFor(path),
    languages: {
      en: canonicalFor('/en' + clean),
      ru: canonicalFor('/ru' + clean),
    },
  } satisfies NonNullable<Metadata['alternates']>
}

export function baseMetadata(lang: Lang, {
  title,
  description,
  path,
}: { title: string; description: string; path: string }): Metadata {
  const url = canonicalFor(path)
  const siteName = 'vinops'
  return {
    title,
    description,
    metadataBase: new URL(siteUrl()),
    alternates: makeAlternates(path),
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: lang === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
