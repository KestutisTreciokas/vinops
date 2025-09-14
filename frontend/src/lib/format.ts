export const formatNumber = (n?: number | string, locale='ru-RU') =>
  (n ?? n === 0) ? new Intl.NumberFormat(locale).format(Number(n)) : '—'

export const formatMiles = (n?: number | string, locale='ru-RU') =>
  (n ?? n === 0) ? `${new Intl.NumberFormat(locale).format(Number(n))} mi` : '—'

export const formatUsd = (n?: number | string, locale='en-US') =>
  (n ?? n === 0) ? new Intl.NumberFormat(locale, { style:'currency', currency:'USD', maximumFractionDigits:0 }).format(Number(n)) : '—'
