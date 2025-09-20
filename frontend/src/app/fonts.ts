// MS-02.1: PT Sans + PT Mono, self-hosted (Next.js downloads at build, serves locally at runtime)
import { PT_Sans, PT_Mono } from 'next/font/google'

export const ptSans = PT_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400','700'],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['system-ui','-apple-system','Segoe UI','Roboto','Arial','Noto Sans','Liberation Sans','sans-serif'],
})

export const ptMono = PT_Mono({
  subsets: ['latin', 'cyrillic'],
  weight: ['400'],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['ui-monospace','SFMono-Regular','Menlo','Monaco','Consolas','Liberation Mono','Courier New','monospace'],
})

// Сохраняем совместимость существующих импортов:
export const inter = ptSans
export const mono  = ptMono
// (jetbrains ранее был alias моно — больше не нужен)
