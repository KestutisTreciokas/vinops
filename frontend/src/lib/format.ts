export type Lang = 'ru' | 'en'
const locale = (lang: Lang) => (lang === 'ru' ? 'ru-RU' : 'en-US')

export function formatUsd(v: number | null | undefined, lang: Lang = 'en') {
  if (v == null || Number.isNaN(Number(v))) return '—'
  return new Intl.NumberFormat(locale(lang), { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
    .format(Number(v))
}

export function formatMiles(v: number | null | undefined, lang: Lang = 'en') {
  if (v == null || Number.isNaN(Number(v))) return '—'
  const n = new Intl.NumberFormat(locale(lang), { maximumFractionDigits: 0 }).format(Number(v))
  return lang === 'ru' ? `${n} миль` : `${n} mi`
}

export function formatDateISO(iso: string | null | undefined, lang: Lang = 'en') {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(+d)) return '—'
  return new Intl.DateTimeFormat(locale(lang), { year: 'numeric', month: '2-digit', day: '2-digit' }).format(d)
}

export function formatPlain(v: string | number | null | undefined) {
  return (v ?? '—').toString()
}
