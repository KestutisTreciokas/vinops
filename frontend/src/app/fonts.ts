import localFont from 'next/font/local'

export const ptSans = localFont({
  src: [
    { path: '../../public/fonts/pt-sans/pt-sans-latin-400-normal.woff2',    weight: '400', style: 'normal' },
    { path: '../../public/fonts/pt-sans/pt-sans-cyrillic-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/pt-sans/pt-sans-latin-700-normal.woff2',    weight: '700', style: 'normal' },
    { path: '../../public/fonts/pt-sans/pt-sans-cyrillic-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui','-apple-system','Segoe UI','Roboto','Arial','Noto Sans','Liberation Sans','sans-serif'],
})

export const ptMono = localFont({
  src: [
    { path: '../../public/fonts/pt-mono/pt-mono-latin-400-normal.woff2',    weight: '400', style: 'normal' },
    { path: '../../public/fonts/pt-mono/pt-mono-cyrillic-400-normal.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace','SFMono-Regular','Menlo','Monaco','Consolas','Liberation Mono','Courier New','monospace'],
})

// Совместимость существующих импортов:
export const inter = ptSans
export const mono  = ptMono
