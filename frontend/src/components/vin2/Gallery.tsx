'use client';
import { useState } from 'react';
import type { Photo } from './types';

export default function Gallery({ photos }: { photos: Photo[] }) {
  const [idx, setIdx] = useState(0);
  const current = photos[idx];

  return (
    <div className="card p-4">
      <div className="text-sm text-fg-muted mb-2">Главное фото #{current?.id}</div>
      <div className="aspect-video w-full rounded-2xl bg-muted/30 grid place-items-center overflow-hidden">
        {current?.url
          ? <img src={current.url} alt={current.title} className="w-full h-full object-contain" />
          : <div className="text-fg-muted">{current?.title}</div>}
      </div>

      <div className="mt-3 flex gap-2">
        {photos.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setIdx(i)}
            className={`h-9 w-9 rounded-xl grid place-items-center border
              ${i===idx ? 'border-brand ring-2 ring-brand/30' : 'border-muted hover:border-fg-muted'}`}
            aria-label={`thumb ${p.id}`}
          >
            <span className="text-xs text-fg-muted">{p.id}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
