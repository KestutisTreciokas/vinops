export function getSiteUrl() {
  // prod: NEXT_PUBLIC_SITE_URL=https://vinops.online
  // dev fallback: IP:3002
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://185.200.243.100:3002'
}
