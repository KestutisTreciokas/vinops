// /root/work/vinops.restore/frontend/next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: { typedRoutes: true },
  output: 'standalone',
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
    localeDetection: false, // <— было true
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
}

export default nextConfig
