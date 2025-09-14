'use client'
import { useState, useMemo } from 'react'

type Photo = { url: string; alt?: string; id?: string }

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export default function Gallery({
  photos,
  items,
  mainIndex = 0,
  lang,
}: {
  lang: 'ru' | 'en'
  photos?: Photo[]
  items?: Photo[]   // алиас на всякий случай
  mainIndex?: number
}) {
  // Берём либо photos, либо items; по умолчанию — пустой массив
  const list: Photo[] = useMemo(() => (photos ?? items ?? []).filter(Boolean) as Photo[], [photos, items])

  const [idx, setIdx] = useState(() =>
    list.length ? clamp(mainIndex, 0, list.length - 1) : 0
  )

  // На случай, если пропсы поменялись в рантайме и индекс вышел за пределы
  const safeIdx = list.length ? clamp(idx, 0, list.length - 1) : 0
  const current = list[safeIdx]

  if (!list.length) {
    return (
      <div className="rounded-2xl border border-border-muted bg-surface p-6 text-center text-fg-muted">
        {lang === 'ru' ? 'Нет изображений' : 'No images'}
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border-muted bg-surface p-4">
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-border-muted/60 bg-canvas">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current?.url}
          alt={current?.alt || ''}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto">
        {list.map((ph, i) => (
          <button
            key={ph.id || ph.url || i}
            type="button"
            onClick={() => setIdx(i)}
            className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border ${i === safeIdx ? 'border-[color:var(--brand)] ring-2 ring-[color:var(--brand)]/20' : 'border-border-muted hover:border-border-muted/80'}`}
            aria-label={`preview ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ph.url} alt={ph.alt || ''} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
