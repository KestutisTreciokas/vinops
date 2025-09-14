type Props = {
  vin: string
  priceUSD?: number
  status?: 'active' | 'sold'
  ctaHref?: string
}

export default function AsideSummary({ vin, priceUSD, status = 'active', ctaHref = '#' }: Props) {
  return (
    <aside className="sticky top-24">
      <div className="card p-4 rounded-2xl bg-surface shadow-sm border border-border-muted">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-fg-muted text-sm">VIN</span>
          <code className="font-mono text-fg-default">{vin}</code>
        </div>

        <div className="mb-4">
          <div className="text-fg-muted text-sm mb-1">Current price</div>
          <div className="text-2xl font-semibold text-fg-default" data-price>
            {priceUSD ? `$${priceUSD.toLocaleString()}` : '—'}
          </div>
          {status === 'sold' && <div className="mt-1 text-xs text-fg-muted">Sold</div>}
        </div>

        <a href={ctaHref} className="btn btn-primary btn-lg w-full">Get full report</a>
      </div>
    </aside>
  )
}
