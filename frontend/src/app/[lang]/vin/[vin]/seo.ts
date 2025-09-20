import type { Metadata } from 'next'

type Lang = 'en' | 'ru'

/**
 * Layout ждёт эти функции. Возвращаем пустые метаданные,
 * чтобы НИЧЕГО не переопределять на уровне layout.
 */
export function buildVinMeta(_: { lang: Lang; vin: string }): Metadata {
  return {}
}

/**
 * Если layout пытается отрендерить JSON-LD из seo.ts —
 * отдаём пустую строку (ничего не выводится).
 */
export function buildVehicleJsonLd(_: { lang: Lang; vin: string }): string {
  return ''
}

/** Доп. заглушки — на случай других импортов */
export const metadata: Metadata = {}
export const seo: Metadata = {}
export const VIN_SEO: Metadata = {}
export function buildVinSeo(): Metadata { return {} }
export default {}
