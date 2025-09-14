'use client'

type Row = {
  date: string
  auction: string
  lot: string
  status: string
  price: string
}

function statusBadgeCls(statusRaw: string) {
  const s = statusRaw.toLowerCase()
  if (s.includes('sold') || s.includes('прод')) {
    return 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25'
  }
  if (s.includes('active') || s.includes('актив')) {
    return 'bg-indigo-500/15 text-indigo-400 ring-1 ring-indigo-500/25'
  }
  if (s.includes('pending') || s.includes('approval') || s.includes('ожид')) {
    return 'bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/25'
  }
  if (s.includes('cancel') || s.includes('fail') || s.includes('no sale') || s.includes('отмен')) {
    return 'bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/25'
  }
  return 'bg-zinc-500/15 text-zinc-400 ring-1 ring-zinc-500/25'
}

export default function History({
  lang,
  rows = [],
}: {
  lang: 'ru' | 'en'
  rows: Row[]
}) {
  const t =
    lang === 'ru'
      ? {
          title: 'История продаж',
          date: 'Дата',
          auction: 'Аукцион',
          lot: 'Лот',
          status: 'Статус',
          price: 'Цена',
        }
      : {
          title: 'Sales history',
          date: 'Date',
          auction: 'Auction',
          lot: 'Lot',
          status: 'Status',
          price: 'Price',
        }

  return (
    <section className="rounded-2xl border border-border-muted bg-surface p-4">
      <h3 className="text-base font-semibold">{t.title}</h3>

      <div className="mt-4">
        <table className="w-full table-fixed">
          <colgroup>
            <col className="w-[120px]" />
            <col className="w-[160px]" />
            <col className="w-[120px]" />
            <col className="w-[160px]" />
            <col />
          </colgroup>

        <thead className="text-sm text-fg-muted">
            <tr>
              <th className="py-2 text-left">{t.date}</th>
              <th className="text-left">{t.auction}</th>
              <th className="text-left">{t.lot}</th>
              <th className="text-left">{t.status}</th>
              <th className="text-right">{t.price}</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {rows?.length ? (
              rows.map((r, i) => (
                <tr key={i} className="border-t border-border-muted/60">
                  <td className="py-2">{r.date}</td>
                  <td>{r.auction}</td>
                  <td>{r.lot}</td>
                  <td>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ring-1 ${statusBadgeCls(r.status)}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="text-right">{r.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-3 text-fg-muted">
                  —
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
