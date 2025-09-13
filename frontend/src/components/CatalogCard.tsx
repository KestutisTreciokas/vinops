import Badge from './ui/Badge'

export type CatalogCardProps = {
  vin: string
  year?: number|null
  make?: string|null
  model?: string|null
  primaryDamage?: string|null
  status?: 'active'|'sold'|'upcoming'|null
  previewUrl?: string|null
}

export default function CatalogCard(props: CatalogCardProps) {
  const { vin, year, make, model, primaryDamage, status='active', previewUrl } = props
  const title = [year, make, model].filter(Boolean).join(' ') || '—'
  const damage = primaryDamage || '—'

  const tone = status==='sold' ? 'success' : status==='upcoming' ? 'warning' : 'brand'
  const statusText = status==='sold' ? 'SOLD' : status==='upcoming' ? 'UPCOMING' : 'ACTIVE'

  return (
    <article className="card overflow-hidden">
      <div className="aspect-[16/9] bg-bg-muted">
        {previewUrl ? <img src={previewUrl} alt="" className="w-full h-full object-cover" /> : null}
      </div>
      <div className="p-4 grid gap-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold truncate">{title}</h3>
          <Badge tone={tone}>{statusText}</Badge>
        </div>
        <div className="text-sm text-fg-muted">{vin}</div>
        <div className="text-sm"><span className="text-fg-muted">Damage: </span>{damage}</div>
      </div>
    </article>
  )
}
