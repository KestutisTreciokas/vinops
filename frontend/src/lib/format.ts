export type Lang = 'ru' | 'en';
const loc = (l: Lang) => (l === 'ru' ? 'ru-RU' : 'en-US');

export function formatUsd(v: number | null | undefined, lang: Lang = 'ru') {
  if (v == null || Number.isNaN(v)) return '—';
  return new Intl.NumberFormat(loc(lang), { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);
}

export function formatMiles(v: number | null | undefined, lang: Lang = 'ru') {
  if (v == null || Number.isNaN(v)) return '—';
  const n = new Intl.NumberFormat(loc(lang), { maximumFractionDigits: 0 }).format(v);
  return lang === 'ru' ? `${n} миль` : `${n} mi`;
}

export function formatDateISO(iso: string | null | undefined, lang: Lang = 'ru') {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(+d)) return '—';
  return new Intl.DateTimeFormat(loc(lang), { year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
}

export function formatPlain(v: unknown) {
  return v == null || v === '' ? '—' : String(v);
}
