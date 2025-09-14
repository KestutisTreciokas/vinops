'use client'
import { useState } from 'react'

export default function CopyButton({
  text, title = 'Copy', className = ''
}: { text: string; title?: string; className?: string }) {
  const [ok, setOk] = useState(false)
  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setOk(true); setTimeout(() => setOk(false), 1200)
    } catch {/* ignore */}
  }
  return (
    <button
      onClick={onCopy}
      title={title}
      className={`copy-btn inline-flex items-center justify-center w-6 h-6 rounded-md border border-[var(--border-muted)] hover:bg-[color-mix(in_hsl,var(--brand)_10%,transparent)] ${className}`}
    >
      <span aria-hidden>{ok ? '✔' : '⧉'}</span>
    </button>
  )
}
