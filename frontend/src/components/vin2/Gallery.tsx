'use client'
import { useState, useMemo } from 'react'
import StatusBadge from './StatusBadge'

export type Photo = { url: string; thumb?: string; alt?: string }

export default function Gallery({
  photos,
  status,
  lang = 'ru',
}: {
  photos?: Photo[] | null
  status?: string | null
  lang?: 'ru' | 'en'
}) {
  const list = useMemo(() => (Array.isArray(photos) ? photos.filter(Boolean) : []), [photos])
  const [idx, setIdx] = useState(0)

  if (!list.length) {
    return (
      <section className="relative rounded-2xl border border-border-muted bg-surface p-4 min-h-[220px] flex items-center justify-center">
        <div className="absolute left-4 top-4"><StatusBadge status={status} lang={lang} /></div>
        <div className="text-sm text-fg-muted">{lang === 'ru' ? 'Нет изображений' : 'No images'}</div>
      </section>
    )
  }

  const current = list[Math.min(idx, list.length - 1)]

  return (
    <section className="relative rounded-2xl border border-border-muted bg-surface p-3">
      <div className="absolute left-3 top-3 z-10">
        <StatusBadge status={status} lang={lang} />
      </div>

      <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-canvas/60">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.url}
          alt={current.alt ?? ''}
          className="h-full w-full object-contain select-none"
          draggable={false}
        />
      </div>

      <div className="mt-3 grid grid-flow-col auto-cols-[56px] gap-2 overflow-x-auto pb-1">
        {list.map((p, i) => (
          <button
            key={p.url + i}
            onClick={() => setIdx(i)}
            className={`h-14 w-14 overflow-hidden rounded-lg border ${i === idx ? 'border-brand ring-2 ring-brand/30' : 'border-border-muted'}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.thumb ?? p.url} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </section>
  )
}
