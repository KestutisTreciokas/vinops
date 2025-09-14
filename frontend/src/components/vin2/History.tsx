'use client'
import Badge from '@/components/common/Badge'
import { formatUsd, formatDateISO } from '@/lib/format'

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

  const badgeKind = (status?: string) => {
    const s = (status || '').toLowerCase()
    if (s.includes('sold')) return 'success' as const
    if (s.includes('active') || s.includes('live')) return 'warning' as const
    return 'neutral' as const
  }

  return (
    <div className="card p-4 overflow-x-auto">
      <h3 className="card-title mb-3">{t('История продаж', 'Sales history')}</h3>
      <table className="w-full text-sm">
        <thead className="text-[var(--fg-muted)]">
          <tr>
            <th className="text-left py-2">{t('Дата','Date')}</th>
            <th className="text-left py-2">{t('Аукцион','Auction')}</th>
            <th className="text-left py-2">{t('Лот','Lot')}</th>
            <th className="text-left py-2">{t('Статус','Status')}</th>
            <th className="text-left py-2">{t('Цена','Price')}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r, i) => (
            <tr key={i} className="border-t border-[var(--border-muted)]">
              <td className="py-2 whitespace-nowrap">{formatDateISO(r.date, lang as any)}</td>
              <td className="py-2">{r.auction ?? '—'}</td>
              <td className="py-2">{r.lot ?? '—'}</td>
              <td className="py-2">
                <Badge kind={badgeKind(r.status)}>{r.status ?? '—'}</Badge>
              </td>
              <td className="py-2 whitespace-nowrap">{formatUsd(r.price, lang as any)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
