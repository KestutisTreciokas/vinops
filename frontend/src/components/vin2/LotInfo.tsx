import type { LotInfo } from './types';

function Row({ k, v }: { k: string; v: string|number }) {
  return (
    <div className="grid grid-cols-2 gap-2 py-1">
      <span className="text-fg-muted">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}

export default function LotInfoCard({ lot }: { lot: LotInfo }) {
  const { lotNumber, auction, seller, date, odometer, status, finalBid } = lot;
  return (
    <div className="card p-4">
      <h3 className="text-base font-semibold mb-2">Информация о лоте</h3>
      <Row k="Номер лота" v={lotNumber} />
      <Row k="Аукцион" v={auction} />
      <Row k="Продавец" v={seller} />
      <Row k="Дата" v={date} />
      <Row k="Пробег" v={odometer} />
      <Row k="Статус" v={status} />
      <Row k="Итоговая ставка" v={`$${finalBid.toLocaleString()}`} />
    </div>
  );
}
