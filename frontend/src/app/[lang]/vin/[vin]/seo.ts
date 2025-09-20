import type { Metadata } from 'next'

// Ничего не навязываем: пустые экспорты на все случаи импорта.
export const metadata: Metadata = {}
export const seo: Metadata = {}
export const VIN_SEO: Metadata = {}
export function buildVinSeo(): Metadata { return {} }
export default {}
