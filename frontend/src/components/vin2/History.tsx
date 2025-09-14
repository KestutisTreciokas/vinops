import type { HistoryItem } from './types';

export default function HistoryCard({ items }: { items: HistoryItem[] }) {
  return (
    <div className="card p-4">
      <h3 className="text-base font-semibold mb-3">История продаж</h3>
      <div className="grid grid-cols-5 text-sm text-fg-muted pb-2 border-b border-muted">
        <div>Дата</div><div>Аукцион</div><div>Лот</div><div>Статус</div><div className="text-right">Цена</div>
      </div>
      <div className="divide-y divide-muted">
        {items.map((it, i)=>(
          <div key={i} className="grid grid-cols-5 py-2 text-sm">
            <div>{it.date}</div>
            <div>{it.auction}</div>
            <div>{it.lot}</div>
            <div>{it.status}</div>
            <div className="text-right font-medium">${it.price.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
