'use client'
import Row from './_Row'
import CopyButton from '@/components/common/CopyButton'
import { formatDateISO, formatMiles, formatUsd } from '@/lib/format'

export default function LotInfo({ lot, lang='ru' }: { lot: any; lang?: 'ru'|'en' }) {
  const t = (ru: string, en: string) => (lang === 'ru' ? ru : en)

  const number = lot?.lotNumber
  const auction = lot?.auction ?? '—'
  const seller  = lot?.seller ?? '—'
  const date    = formatDateISO(lot?.date, lang)
  const odo     = lot?.odometer != null ? formatMiles(lot.odometer, lang) : '—'
  const status  = lot?.status ?? '—'
  const final   = formatUsd(lot?.finalBid, lang)

  return (
    <div className="card p-4">
      <h3 className="card-title mb-3">{t('Информация о лоте', 'Lot info')}</h3>
      <div className="space-y-2 text-sm">
        <Row
          k={t('Номер лота','Lot number')}
          v={
            number
              ? <span className="inline-flex items-center gap-2">
                  {String(number)}
                  <CopyButton text={String(number)} title={t('Скопировать номер','Copy number')} />
                </span>
              : '—'
          }
        />
        <Row k={t('Аукцион','Auction')} v={auction} />
        <Row k={t('Продавец','Seller')} v={seller} />
        <Row k={t('Дата','Date')} v={date} />
        <Row k={t('Пробег','Odometer')} v={odo} />
        <Row k={t('Статус','Status')} v={status} />
        <Row k={t('Итоговая ставка','Final bid')} v={final} />
      </div>
    </div>
  )
}
