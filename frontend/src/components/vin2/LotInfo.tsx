import type { VinLot } from './types'

export default function LotInfo({ lot }: { lot: VinLot }) {
  const Row = ({label, value}:{label:string; value:string}) => (
    <div className="grid grid-cols-[120px_1fr] gap-3">
      <div className="text-fg-muted">{label}</div>
      <div className="font-medium">{value || '—'}</div>
    </div>
  )

  return (
    <section className="card p-4 md:p-5">
      <h3 className="text-lg font-semibold mb-4">Информация о лоте</h3>
      <div className="space-y-2">
        <Row label="Номер лота" value={lot.lotNumber} />
        <Row label="Аукцион"   value={lot.auction} />
        <Row label="Продавец"  value={lot.seller} />
        <Row label="Дата"      value={lot.date} />
        <Row label="Пробег"    value={lot.odometer} />
        <Row label="Статус"    value={lot.status} />
        <Row label="Итог. ставка" value={lot.finalBid} />
      </div>
    </section>
  )
}
