import type { MetadataRoute } from 'next'

const siteUrl = 'https://vinops.online'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // служебные эндпоинты (паттерн для обоих языков)
        disallow: ['/*/health'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    // полезно для Яндекса
    host: 'vinops.online',
  }
}
