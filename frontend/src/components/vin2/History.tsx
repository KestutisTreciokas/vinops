'use client'

function t(ru: string, en: string, lang: 'ru'|'en') { return lang === 'ru' ? ru : en }

type HistoryItem = {
  date?: string
  auction?: string
  lot?: string | number
  status?: string
  price?: string | number
}

export default function History({
  items,
  lang = 'ru',
}: {
  items?: HistoryItem[] | null
  lang?: 'ru'|'en'
}) {
  const rows = Array.isArray(items) ? items : []

  return (
    <section className="card p-4">
      <h3 className="card-title mb-3">{t('История продаж', 'Sales history', lang)}</h3>
      <div className="overflow-hidden rounded-xl border border-border-muted">
        <table className="w-full text-sm">
          <thead className="bg-surface/60">
            <tr className="text-left">
              <th className="px-3 py-2 w-[22%]">{t('Дата','Date',lang)}</th>
              <th className="px-3 py-2 w-[26%]">{t('Аукцион','Auction',lang)}</th>
              <th className="px-3 py-2 w-[22%]">{t('Лот','Lot',lang)}</th>
              <th className="px-3 py-2 w-[14%]">{t('Статус','Status',lang)}</th>
              <th className="px-3 py-2 w-[16%]">{t('Цена','Price',lang)}</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td className="px-3 py-3 text-fg-muted" colSpan={5}>—</td></tr>
            ) : rows.map((r, i) => (
              <tr key={i} className={i % 2 ? 'bg-canvas/40' : ''}>
                <td className="px-3 py-2">{r.date ?? '—'}</td>
                <td className="px-3 py-2">{r.auction ?? '—'}</td>
                <td className="px-3 py-2">{r.lot ?? '—'}</td>
                <td className="px-3 py-2">{r.status ?? '—'}</td>
                <td className="px-3 py-2">{r.price ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
