import { ReactNode } from 'react'

export default function Row({ k, v }: { k: ReactNode; v?: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-[var(--fg-muted)] whitespace-nowrap">{k}</span>
      <span className="text-right break-words">{v ?? '—'}</span>
    </div>
  )
}
