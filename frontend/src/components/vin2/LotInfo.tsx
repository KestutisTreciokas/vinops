import Row from './_Row'
import CopyButton from '@/components/common/CopyButton'
import { formatDateISO, formatMiles, formatPlain, formatUsd } from '@/src/lib/format'

export default function LotInfo({ lot, lang='ru' }: { lot?: any; lang?: 'ru'|'en' }) {
  const t = (ru: string, en: string) => (lang === 'ru' ? ru : en)
  const L = lot ?? {}

  return (
    <div className="card p-4">
      <h3 className="card-title mb-3">{t('Информация о лоте', 'Lot info')}</h3>
      <div className="space-y-2 text-sm">
        <Row
          k={t('Номер лота','Lot number')}
          v={
            L?.lotNumber
              ? <span className="inline-flex items-center gap-2">
                  {String(L.lotNumber)}
                  <CopyButton text={String(L.lotNumber)} title={t('Скопировать номер','Copy number')} />
                </span>
              : '—'
          }
        />
        <Row k={t('Аукцион','Auction')} v={formatPlain(L?.auction)} />
        <Row k={t('Продавец','Seller')} v={formatPlain(L?.seller)} />
        <Row k={t('Дата','Date')} v={formatDateISO(L?.date, lang)} />
        <Row k={t('Пробег','Odometer')} v={L?.odometer ? formatMiles(L.odometer, lang) : '—'} />
        <Row k={t('Статус','Status')} v={formatPlain(L?.status)} />
        <Row k={t('Итоговая ставка','Final bid')} v={formatUsd(L?.finalBid ?? L?.price, lang as any)} />
      </div>
    </div>
  )
}
