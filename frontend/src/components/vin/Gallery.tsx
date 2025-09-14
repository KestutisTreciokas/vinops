'use client'
import { useState } from 'react'

export default function Gallery({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0)
  const main = images[idx]
  return (
    <div className="card p-3 rounded-2xl bg-surface border border-border-muted">
      {main && (
        <div className="aspect-[4/3] overflow-hidden rounded-xl mb-3 bg-canvas-subtle">
          <img src={main} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              className={[
                'aspect-[4/3] overflow-hidden rounded-lg bg-canvas-subtle',
                i === idx ? 'ring-2 ring-brand' : 'ring-1 ring-border-muted'
              ].join(' ')}
              aria-label={`Photo ${i+1}`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
