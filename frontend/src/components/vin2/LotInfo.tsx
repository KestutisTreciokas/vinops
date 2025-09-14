'use client'
import { Row, IcGavel, IcUser, IcCalendar, IcOdo, IcTag } from './ui'
import StatusBadge from './StatusBadge'

function t(ru: string, en: string, lang: 'ru'|'en') { return lang === 'ru' ? ru : en }

type Lot = {
  lotNumber?: string | number
  auction?: string
  seller?: string
  date?: string
  odometer?: string | number
  status?: string | null
  finalBid?: string | number
}

export default function LotInfo({
  lot,
  lang = 'ru'
}: {
  lot?: Lot | null
  lang?: 'ru'|'en'
}) {
  const l = lot ?? {}
  return (
    <section className="card p-4">
      <h3 className="card-title mb-3">{t('Информация о лоте','Lot info', lang)}</h3>
      <div className="space-y-2 text-sm">
        <Row icon={<IcTag />}     label={t('Номер лота','Lot number',lang)} value={l.lotNumber?.toString()} />
        <Row icon={<IcGavel />}   label={t('Аукцион','Auction',lang)}       value={l.auction} />
        <Row icon={<IcUser />}    label={t('Продавец','Seller',lang)}       value={l.seller} />
        <Row icon={<IcCalendar />}label={t('Дата','Date',lang)}             value={l.date} />
        <Row icon={<IcOdo />}     label={t('Пробег','Odometer',lang)}       value={l.odometer} />
        <Row icon={<IcTag />}     label={t('Статус','Status',lang)}         value={<StatusBadge status={l.status} lang={lang}/>} />
        <Row icon={<IcTag />}     label={t('Итоговая ставка','Final bid',lang)} value={l.finalBid} />
      </div>
    </section>
  )
}
