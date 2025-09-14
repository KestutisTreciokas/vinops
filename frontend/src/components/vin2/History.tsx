'use client'
import { formatUsd, formatDateISO } from '@/src/lib/format'

export default function History({ rows, lang='ru' }: { rows?: any[]; lang?: 'ru'|'en' }) {
  const t = (ru: string, en: string) => (lang === 'ru' ? ru : en)
  const items = Array.isArray(rows) ? rows : []

  if (!items.length) {
    return (
      <div className="card p-4 text-sm text-[var(--fg-muted)]">
        {t('История пока пуста. Как только появятся продажи — покажем здесь.',
           'No sales yet. As soon as we find any, they will appear here.')}
      </div>
    )
  }

  return (
    <div className="card p-4">
      <h3 className="card-title mb-3">{t('История продаж','Sales history')}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-[var(--fg-muted)]">
            <tr>
              <th className="text-left py-2 pr-4">{t('Дата','Date')}</th>
              <th className="text-left py-2 pr-4">{t('Аукцион','Auction')}</th>
              <th className="text-left py-2 pr-4">{t('Лот','Lot')}</th>
              <th className="text-left py-2 pr-4">{t('Статус','Status')}</th>
              <th className="text-left py-2">{t('Цена','Price')}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((r, i) => (
              <tr key={i} className="border-t border-[var(--border-muted)]">
                <td className="py-2 pr-4">{formatDateISO(r?.date, lang)}</td>
                <td className="py-2 pr-4">{r?.auction ?? '—'}</td>
                <td className="py-2 pr-4">{r?.lot ?? r?.lotNumber ?? '—'}</td>
                <td className="py-2 pr-4">{r?.status ?? '—'}</td>
                <td className="py-2">{formatUsd(r?.price ?? r?.finalBid, lang as any)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
