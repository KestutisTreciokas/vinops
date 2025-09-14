'use client'
import Row from './_Row'
import CopyButton from '@/components/common/CopyButton'
import { formatDateISO, formatMiles, formatUsd } from '@/lib/format'

/** маленькие одноцветные иконки (inline SVG), чтобы не тянуть библиотеки */
const stroke = { stroke: 'currentColor', strokeWidth: 2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' } as any
const IHash = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24"><path {...stroke} d="M9 3L7 21M17 3l-2 18M4 8h16M3 16h16"/></svg>
)
const IGavel = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24"><path {...stroke} d="M12 6l3 3m-6 0l3-3m-6 12h14M5 14l6-6"/></svg>
)
const IUser = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24"><path {...stroke} d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"/><path {...stroke} d="M4 20a8 8 0 0116 0"/></svg>
)
const ICalendar = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24"><rect {...stroke} x="3" y="5" width="18" height="16" rx="2"/><path {...stroke} d="M16 3v4M8 3v4M3 11h18"/></svg>
)
const ISpeed = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24"><path {...stroke} d="M21 12a9 9 0 10-18 0 9 9 0 0018 0z"/><path {...stroke} d="M12 12l4-2"/></svg>
)
const IStatus = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24"><circle {...stroke} cx="12" cy="12" r="6"/></svg>
)
const IMoney = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24"><path {...stroke} d="M12 3v18M7 7c0-2 2-4 5-3 3 .8 3 4.2 0 5-3 .8-3 4.2 0 5 3 .8 5-1 5-3"/></svg>
)

export default function LotInfo({
  lot, lang = 'ru',
}: {
  lot: any; lang?: 'ru'|'en'
}) {
  const t = (ru: string, en: string) => (lang === 'ru' ? ru : en)

  const lotNumber =
    lot?.lotNumber
      ? (
        <span className="inline-flex items-center gap-2">
          {String(lot.lotNumber)}
          <CopyButton text={String(lot.lotNumber)} title={t('Скопировать номер', 'Copy number')} />
        </span>
      )
      : '—'

  const date = formatDateISO(lot?.date, lang as any)
  const odo  = lot?.odometer != null ? formatMiles(lot.odometer, lang as any) : '—'
  const bid  = formatUsd(lot?.finalBid, lang as any)

  return (
    <div className="card p-4">
      <h3 className="card-title mb-3">{t('Информация о лоте', 'Lot info')}</h3>
      <div className="text-sm">
        <Row icon={<IHash />}     k={t('Номер лота', 'Lot number')} v={lotNumber} />
        <Row icon={<IGavel />}    k={t('Аукцион',   'Auction')}     v={lot?.auction ?? '—'} />
        <Row icon={<IUser />}     k={t('Продавец',  'Seller')}      v={lot?.seller ?? '—'} />
        <Row icon={<ICalendar />} k={t('Дата',      'Date')}        v={date} />
        <Row icon={<ISpeed />}    k={t('Пробег',    'Odometer')}    v={odo} />
        <Row icon={<IStatus />}   k={t('Статус',    'Status')}      v={lot?.status ?? '—'} />
        <Row icon={<IMoney />}    k={t('Итоговая ставка', 'Final bid')} v={bid} />
      </div>
    </div>
  )
}
