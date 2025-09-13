import '../styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'vinops',
    template: '%s — vinops',
  },
  description: 'VIN lookup and auction history by vinops',
  applicationName: 'vinops',
  metadataBase: new URL('https://vinops.online'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
