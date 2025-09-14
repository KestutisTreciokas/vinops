'use client'
import StatusBadge from '@/components/vin2/Badge'
import { formatNumber, formatMiles, formatUsd } from '@/lib/format'

function Row({ k, v }: { k: string; v?: string }) {
  return (
    <div className="kv">
      <div className="k">{k}</div>
      <div className="v">{v ?? '—'}</div>
    </div>
  )
}

export default function LotInfo({ lot, lang='ru' }: { lot?: any; lang?: 'ru'|'en' }) {
  const t = (ru: string, en: string) => lang === 'ru' ? ru : en
  const lotNumber = lot?.lotNumber ? String(lot.lotNumber) : '—'
  const auction   = lot?.auction || '—'
  const seller    = lot?.seller || '—'
  const date      = lot?.date || '—'
  const odo       = formatMiles(lot?.odometer, lang === 'ru' ? 'ru-RU' : 'en-US')
  const status    = lot?.status
  const finalBid  = formatUsd(lot?.finalBidUSD)

  return (
    <section className="card p-4">
      <h3 className="card-title mb-3">{t('Информация о лоте', 'Lot info')}</h3>
      <div className="space-y-2">
        <Row k={t('Номер лота', 'Lot number')} v={lotNumber} />
        <Row k={t('Аукцион', 'Auction')} v={auction} />
        <Row k={t('Продавец', 'Seller')} v={seller} />
        <Row k={t('Дата', 'Date')} v={date} />
        <Row k={t('Пробег', 'Odometer')} v={odo} />
        <div className="kv">
          <div className="k">{t('Статус', 'Status')}</div>
          <div className="v"><StatusBadge status={status} lang={lang} /></div>
        </div>
        <Row k={t('Итоговая ставка', 'Final bid')} v={finalBid} />
      </div>
    </section>
  )
}
