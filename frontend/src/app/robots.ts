import type { MetadataRoute } from 'next'
import { VIN_SITEMAP, SHARD_SIZE } from '@/data/vin-sitemap'

const siteUrl = 'https://vinops.online'
const langs = ['en','ru'] as const

export default function robots(): MetadataRoute.Robots {
  const vinShardUrls: string[] = []
  for (const lang of langs) {
    const total = VIN_SITEMAP[lang].length
    const count = Math.max(1, Math.ceil(total / SHARD_SIZE))
    for (let i = 0; i < count; i++) {
      vinShardUrls.push(`${siteUrl}/sitemaps/vin/${lang}-${i}.xml`)
    }
  }
  const sitemap: string[] = [
    `${siteUrl}/sitemap.xml`,
    `${siteUrl}/sitemaps/vin.xml`,
    ...vinShardUrls,
  ]
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // служебные эндпоинты (паттерн для обоих языков)
        disallow: ['/*/health'],
      },
    ],
    sitemap,
    // полезно для Яндекса
    host: 'vinops.online',
  }
}
