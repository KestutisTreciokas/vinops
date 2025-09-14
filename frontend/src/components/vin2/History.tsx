type Lang = 'ru'|'en'
type Row = { date?: string; auction?: string; lot?: string|number; status?: string; priceUsd?: number }
export default function History({ lang='ru', rows=[] }: { lang?:Lang, rows: Row[] }) {
  const t = (ru:string,en:string)=> lang==='ru'?ru:en
  const fmt = (n?:number) => n==null ? '—' :
    new Intl.NumberFormat(lang==='ru'?'ru-RU':'en-US', { style:'currency', currency:'USD', maximumFractionDigits:0 }).format(n)
  return (
    <section className="card p-4">
      <h3 className="card-title mb-3">{t('История продаж','Sale history')}</h3>
      <div className="text-sm overflow-x-auto">
        <table className="min-w-[420px] w-full">
          <thead className="text-fg-muted">
            <tr className="text-left">
              <th className="py-2 pr-4">{t('Дата','Date')}</th>
              <th className="py-2 pr-4">{t('Аукцион','Auction')}</th>
              <th className="py-2 pr-4">{t('Лот','Lot')}</th>
              <th className="py-2 pr-4">{t('Статус','Status')}</th>
              <th className="py-2 text-right">{t('Цена','Price')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={5} className="py-4 text-center text-fg-muted">—</td></tr>
            )}
            {rows.map((r,idx)=>(
              <tr key={idx} className="border-t border-border-muted">
                <td className="py-2 pr-4">{r.date ?? '—'}</td>
                <td className="py-2 pr-4">{r.auction ?? '—'}</td>
                <td className="py-2 pr-4">{r.lot ?? '—'}</td>
                <td className="py-2 pr-4">{r.status ?? '—'}</td>
                <td className="py-2 text-right">{fmt(r.priceUsd)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
