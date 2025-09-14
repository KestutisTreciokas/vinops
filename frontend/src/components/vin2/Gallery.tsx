'use client'
import { useEffect, useMemo, useState } from 'react'

type Photo = { url: string; thumb?: string; alt?: string }

export default function Gallery({ photos }: { photos: Photo[] }) {
  const list = Array.isArray(photos) ? photos : []
  const [idx, setIdx] = useState(0)
  const [zoom, setZoom] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!list.length) return
      if (e.key === 'ArrowRight') setIdx(i => (i + 1) % list.length)
      if (e.key === 'ArrowLeft')  setIdx(i => (i - 1 + list.length) % list.length)
      if (e.key === 'Escape')     setZoom(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [list.length])

  const current = list[idx]

  if (!list.length) {
    return (
      <div className="card p-6 flex items-center justify-center text-[var(--fg-muted)]">
        <div className="flex flex-col items-center gap-2">
          <svg viewBox="0 0 24 24" className="w-8 h-8" aria-hidden>
            <path d="M4 8h4l2-2h4l2 2h4v10H4z" fill="currentColor" opacity=".12"/>
            <path d="M4 8h4l2-2h4l2 2h4v10H4zM12 11.5a3 3 0 1 0 0 6a3 3 0 0 0 0-6Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div>Нет изображений</div>
        </div>
      </div>
    )
  }

  return (
    <div className="card p-4">
      <div className="relative">
        <img
          src={current.url}
          alt={current.alt || ''}
          className={`w-full h-[340px] md:h-[420px] object-contain select-none transition-transform ${zoom ? 'scale-[1.5] cursor-zoom-out' : 'cursor-zoom-in'}`}
          onClick={() => setZoom(z => !z)}
          draggable={false}
        />
        {/* стрелки (кликабельные области) */}
        <button
          className="absolute inset-y-0 left-0 w-1/6 opacity-0 hover:opacity-40 transition"
          onClick={() => setIdx(i => (i - 1 + list.length) % list.length)}
          aria-label="Prev"
        />
        <button
          className="absolute inset-y-0 right-0 w-1/6 opacity-0 hover:opacity-40 transition"
          onClick={() => setIdx(i => (i + 1) % list.length)}
          aria-label="Next"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto mt-3 py-1">
        {list.map((p, i) => (
          <button
            key={i}
            onClick={() => { setIdx(i); setZoom(false) }}
            className={`shrink-0 rounded-md border ${i===idx ? 'border-[var(--brand)] ring-2 ring-[color-mix(in_hsl,var(--brand)_25%,transparent)]' : 'border-[var(--border-muted)]'}`}
          >
            <img
              src={p.thumb || p.url}
              alt=""
              className="w-20 h-14 object-cover rounded-[inherit] select-none"
              draggable={false}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
