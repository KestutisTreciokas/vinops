type Lang = 'ru'|'en'
type Lot = {
  lotNumber?: string|number
  auction?: string
  seller?: string
  date?: string
  odometer?: string
  status?: string
  finalBidUsd?: number
}
function fmtMoney(n?:number, lang:Lang='ru') {
  if (n==null) return '—'
  return new Intl.NumberFormat(lang==='ru'?'ru-RU':'en-US', { style:'currency', currency:'USD', maximumFractionDigits:0 }).format(n)
}
export default function LotInfo({ lang='ru', lot }: { lang?: Lang, lot: Lot }) {
  const t = (ru:string,en:string)=> lang==='ru'?ru:en
  const Row = ({k,v}:{k:string,v?:string}) => (
    <div className="grid grid-cols-[1fr_auto] gap-3">
      <div className="text-fg-muted">{k}</div>
      <div className="font-medium text-right">{v ?? '—'}</div>
    </div>
  )
  return (
    <section className="card p-4">
      <h3 className="card-title mb-3">{t('Информация о лоте','Lot info')}</h3>
      <div className="space-y-2 text-sm">
        <Row k={t('Номер лота','Lot number')} v={lot.lotNumber?.toString()} />
        <Row k={t('Аукцион','Auction')} v={lot.auction} />
        <Row k={t('Продавец','Seller')} v={lot.seller} />
        <Row k={t('Дата','Date')} v={lot.date} />
        <Row k={t('Пробег','Odometer')} v={lot.odometer} />
        <Row k={t('Статус','Status')} v={lot.status} />
        <Row k={t('Итоговая ставка','Final bid')} v={fmtMoney(lot.finalBidUsd, lang)} />
      </div>
    </section>
  )
}
