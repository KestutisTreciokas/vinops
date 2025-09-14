import CopyButton from '@/components/common/CopyButton'
import { formatDateISO, formatMiles, formatPlain, formatUsd } from '@/lib/format'

export default function LotInfo({ lot, lang = 'ru' }: { lot: any, lang?: 'ru'|'en' }) {
  const t = (ru: string, en: string) => (lang === 'ru' ? ru : en)

  const stroke = { stroke: 'currentColor', strokeWidth: 2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' } as any

  const Icon = {
    id:      <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 4v16"/><path d="M6 8h2"/><path d="M6 12h2"/><path d="M6 16h2"/></svg>,
    hammer:  <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}><path d="M14 4l6 6"/><path d="M13 5l-3 3 6 6 3-3"/><path d="M2 22l7-7"/></svg>,
    user:    <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}><path d="M20 21a8 8 0 1 0-16 0"/><circle cx="12" cy="7" r="4"/></svg>,
    calendar:<svg width="20" height="20" viewBox="0 0 24 24" {...stroke}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
    odo:     <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}><path d="M20 13A8 8 0 1 0 4 13"/><path d="M12 13l4-4"/></svg>,
    status:  <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}><circle cx="12" cy="12" r="9"/><path d="M8 12l2 2 4-4"/></svg>,
    price:   <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}><path d="M20 12V7a2 2 0 0 0-2-2h-5l-9 9 7 7 9-9z"/><circle cx="16" cy="8" r="1.5"/></svg>,
  }

  const Row = ({ icon, k, v }: { icon: React.ReactNode; k: string; v: React.ReactNode }) => (
    <div className="grid grid-cols-[20px,1fr,auto] items-center gap-3">
      <div className="text-[var(--fg-muted)]">{icon}</div>
      <div className="text-sm text-[var(--fg-muted)]">{k}</div>
      <div className="text-sm">{v}</div>
    </div>
  )

  return (
    <div className="card p-4">
      <h3 className="card-title mb-3">{t('Информация о лоте', 'Lot info')}</h3>
      <div className="space-y-2">
        <Row
          icon={Icon.id}
          k={t('Номер лота', 'Lot number')}
          v={
            lot?.lotNumber
              ? <span className="inline-flex items-center gap-2">
                  {String(lot.lotNumber)}
                  <CopyButton text={String(lot.lotNumber)} title={t('Скопировать номер','Copy number')} />
                </span>
              : '—'
          }
        />
        <Row icon={Icon.hammer}  k={t('Аукцион','Auction')}         v={formatPlain(lot?.auction)} />
        <Row icon={Icon.user}    k={t('Продавец','Seller')}          v={formatPlain(lot?.seller)} />
        <Row icon={Icon.calendar}k={t('Дата','Date')}               v={formatDateISO(lot?.date, lang)} />
        <Row icon={Icon.odo}     k={t('Пробег','Odometer')}          v={typeof lot?.odometer === 'number' ? formatMiles(lot.odometer, lang) : formatPlain(lot?.odometer)} />
        <Row icon={Icon.status}  k={t('Статус','Status')}            v={formatPlain(lot?.status)} />
        <Row icon={Icon.price}   k={t('Итоговая ставка','Final bid')}v={typeof lot?.finalBid === 'number' ? formatUsd(lot.finalBid, lang) : formatPlain(lot?.finalBid)} />
      </div>
    </div>
  )
}
