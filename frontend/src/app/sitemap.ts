import type { MetadataRoute } from 'next'

const langs = ['ru','en'] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/+$/,'')
  const urls: MetadataRoute.Sitemap = []

  // базовые страницы
  for (const lang of langs) {
    urls.push(
      { url: `${base}/${lang}`, changeFrequency: 'weekly', priority: 0.8 },
      { url: `${base}/${lang}/cars`, changeFrequency: 'daily', priority: 0.9 },
    )
  }

  // при появлении БД сюда легко добавить VIN-ы/пагинацию
  // пример демо-VIN (необязательно):
  // for (const lang of langs) urls.push({ url: `${base}/${lang}/vin/WAUZZZAAAAAAAAAAA`, changeFrequency: 'monthly', priority: 0.6 })

  return urls
}
