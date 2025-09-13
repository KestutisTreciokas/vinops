'use client'
import { useState } from 'react'
export default function Pill({
  children, active: a=false, onToggle
}: {children: React.ReactNode; active?: boolean; onToggle?: (v:boolean)=>void}) {
  const [active,setActive] = useState(a)
  const cls = `inline-flex items-center h-9 px-4 rounded-full border text-sm ${active
    ? 'bg-brand text-brand-fg border-transparent'
    : 'bg-bg-canvas border-border-muted text-fg-muted hover:text-fg-default'}`
  return <button type="button" className={cls} onClick={()=>{ setActive(!active); onToggle?.(!active) }}>{children}</button>
}
