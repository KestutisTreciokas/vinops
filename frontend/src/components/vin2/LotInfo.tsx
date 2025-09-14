'use client'

type Lot = {
  lotNumber?: number | string
  auction?: string
  seller?: string
  date?: string
  odometer?: string | number
  status?: string
  finalBid?: string | number
  location?: string
}

function Row({ k, v }: { k: string; v?: string }) {
  return (
    <div className="contents">
      <dt className="text-sm text-fg-muted">{k}</dt>
      <dd className="text-sm">{v ?? '—'}</dd>
    </div>
  )
}

const toStr = (x: unknown): string | undefined => {
  if (x === null || x === undefined) return undefined
  return typeof x === 'string' ? (x.trim() || undefined) : String(x)
}

export default function LotInfo({
  lot,
  lang,
}: {
  lot?: Lot
  lang: 'ru' | 'en'
}) {
  const t = (ru: string, en: string) => (lang === 'ru' ? ru : en)
  const L: Lot = lot ?? {}

  return (
    <section className="rounded-2xl border border-border-muted bg-surface p-4">
      <h3 className="text-base font-semibold mb-3">
        {t('Информация о лоте', 'Lot info')}
      </h3>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
        <Row k={t('Номер лота', 'Lot number')} v={toStr(L.lotNumber)} />
        <Row k={t('Аукцион', 'Auction')} v={toStr(L.auction)} />
        <Row k={t('Продавец', 'Seller')} v={toStr(L.seller)} />
        <Row k={t('Дата', 'Date')} v={toStr(L.date)} />
        <Row k={t('Пробег', 'Odometer')} v={toStr(L.odometer)} />
        <Row k={t('Статус', 'Status')} v={toStr(L.status)} />
        <Row k={t('Итоговая ставка', 'Final bid')} v={toStr(L.finalBid)} />
        <Row k={t('Локация', 'Location')} v={toStr(L.location)} />
      </dl>
    </section>
  )
}
