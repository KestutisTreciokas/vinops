import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://vinops.online';
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/en', '/ru',
          '/en/cars', '/ru/cars',
          '/en/contacts', '/ru/contacts',
          '/en/about', '/ru/about',
          '/en/terms', '/ru/terms'
        ],
        disallow: [
          '/api', '/_next', '/favicon.ico', '/static', '/images'
        ]
      }
    ],
    sitemap: [`${base}/sitemap.xml`],
    host: base.replace(/^https?:\/\//, '')
  };
}
