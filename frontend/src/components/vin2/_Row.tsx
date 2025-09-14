'use client'
import { ReactNode } from 'react'

export default function Row({
  k, v, icon,
}: { k: ReactNode; v: ReactNode; icon?: ReactNode }) {
  return (
    <div className="grid grid-cols-[20px,1fr,auto] items-center gap-3 py-1">
      <div className="text-[var(--fg-muted)] flex items-center justify-center">
        {icon ?? null}
      </div>
      <div className="text-[var(--fg-muted)]">{k}</div>
      <div className="text-[var(--fg-default)]">{v}</div>
    </div>
  )
}
