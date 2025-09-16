export type Lang = 'ru' | 'en';

export const SITE = {
  name: 'vinops',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002',
};

export function absUrl(path: string = '/'): string {
  try {
    return new URL(path, SITE.url).toString();
  } catch {
    return `${SITE.url}${path.startsWith('/') ? '' : '/'}${path}`;
  }
}

/**
 * Базовый набор меты (OG/Twitter/Canonical).
 * Возвращаем plain-object, чтобы не тащить типы Next из этой утилиты.
 */
export function baseMetadata({
  title,
  description,
  path = '/',
  images = [],
  lang = 'ru',
}: {
  title: string;
  description?: string;
  path?: string;
  images?: string[];
  lang?: Lang;
}) {
  const canonical = absUrl(path);

  return {
    title,
    description,
    metadataBase: new URL(SITE.url),
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE.name,
      locale: lang === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
  };
}
