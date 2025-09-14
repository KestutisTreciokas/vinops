import type { VinHistoryRow } from './types'

export default function History({ rows }: { rows: VinHistoryRow[] }) {
  return (
    <section className="card p-4 md:p-5">
      <h3 className="text-lg font-semibold mb-4">История продаж</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-fg-muted">
            <tr className="border-b border-border-muted">
              <th className="py-2 pr-4">Дата</th>
              <th className="py-2 pr-4">Аукцион</th>
              <th className="py-2 pr-4">Лот</th>
              <th className="py-2 pr-4">Статус</th>
              <th className="py-2 pr-2">Цена</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-border-muted/50 last:border-0">
                <td className="py-2 pr-4">{r.date}</td>
                <td className="py-2 pr-4">{r.auction}</td>
                <td className="py-2 pr-4">{r.lot}</td>
                <td className="py-2 pr-4">{r.status}</td>
                <td className="py-2 pr-2 font-medium">{r.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
