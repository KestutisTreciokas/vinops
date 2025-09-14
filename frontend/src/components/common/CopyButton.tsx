'use client'
import { useState } from 'react'

export default function CopyButton({ text, title = 'Copy' }: { text: string; title?: string }) {
  const [ok, setOk] = useState(false)
  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setOk(true); setTimeout(() => setOk(false), 1000)
    } catch {
      // fallback для старых браузеров
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setOk(true); setTimeout(() => setOk(false), 1000)
    }
  }
  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={title}
      title={ok ? 'Copied' : title}
      className="copy-btn inline-flex items-center rounded-md border border-[var(--border-muted)] px-2 h-7 text-xs hover:bg-[color-mix(in_hsl,var(--brand)_10%,transparent)]"
    >
      {ok ? '✓' : '⧉'}
    </button>
  )
}
