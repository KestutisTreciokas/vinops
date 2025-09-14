'use client'
import { useState } from 'react'
import type { VinImage } from './types'

export default function Gallery({ images }: { images: VinImage[] }) {
  const [idx, setIdx] = useState(0)
  const current = images[idx] ?? images[0]

  return (
    <section className="card p-4 md:p-5">
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted flex items-center justify-center">
        {current ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={current.src} alt={current.alt ?? ''} className="w-full h-full object-contain" />
        ) : <div className="text-fg-muted">No photo</div>}
      </div>

      <div className="mt-4 grid grid-cols-8 gap-2">
        {images.map((im, i) => (
          <button
            key={i}
            aria-label={`preview ${i+1}`}
            onClick={() => setIdx(i)}
            className={`aspect-[4/3] rounded-lg overflow-hidden bg-muted ring-1 ring-inset ${
              i===idx ? 'ring-brand' : 'ring-border-muted'
            }`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={im.src} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </section>
  )
}
