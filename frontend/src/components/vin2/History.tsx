'use client'
import { formatUsd } from '@/src/lib/format'

export default function History({ rows, lang='ru' }: { rows?: any[]; lang?: 'ru'|'en' }) {
  const t = (ru: string, en: string) => lang === 'ru' ? ru : en
  const list = Array.isArray(rows) ? rows : []

  return (
    <section className="card p-4">
      <h3 className="card-title mb-3">{t('История продаж', 'Sale history')}</h3>
      <div className="overflow-auto">
        <table className="table-vin w-full">
          <thead>
            <tr>
              <th className="w-[18%]">{t('Дата','Date')}</th>
              <th className="w-[22%]">{t('Аукцион','Auction')}</th>
              <th className="w-[18%] text-right">{t('Лот','Lot')}</th>
              <th className="w-[18%]">{t('Статус','Status')}</th>
              <th className="w-[24%] text-right">{t('Цена','Price')}</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && (
              <tr><td colSpan={5} className="py-3 text-center text-fg-muted">—</td></tr>
            )}
            {list.map((r, i) => (
              <tr key={i}>
                <td>{r?.date ?? '—'}</td>
                <td>{r?.auction ?? '—'}</td>
                <td className="text-right">{r?.lotNumber ?? '—'}</td>
                <td>{r?.status ?? '—'}</td>
                <td className="text-right">{formatUsd(r?.priceUSD)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
