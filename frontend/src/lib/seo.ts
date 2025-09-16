export type Lang = 'ru' | 'en';

export const siteName = 'vinops';
export const siteUrl =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL) ||
  'http://localhost:3002';

export function canonical(path: string = ''): string {
  const base = siteUrl.replace(/\/+$/, '');
  const p = String(path || '').replace(/^\/+/, '');
  return p ? `${base}/${p}` : base;
}

export const baseMetadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: `%s • ${siteName}` },
  description:
    'Актуальная информация по лоту: фото, характеристики, статусы, цены продаж и история.',
  openGraph: {
    type: 'website',
    siteName,
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
  },
} as any;

export function vinPageTitle(vin: string, lang: Lang, make?: string, model?: string) {
  const name = [make, model].filter(Boolean).join(' ');
  if (lang === 'ru') {
    return name ? `${name} — VIN ${vin}` : `VIN ${vin}`;
  }
  return name ? `${name} — VIN ${vin}` : `VIN ${vin}`;
}

export function vehicleLdJson(params: { vin: string; make?: string; model?: string }) {
  const { vin, make, model } = params;
  const name = [make, model].filter(Boolean).join(' ').trim() || `VIN ${vin}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name,
    vehicleIdentificationNumber: vin,
    brand: make,
    model,
  };
}
