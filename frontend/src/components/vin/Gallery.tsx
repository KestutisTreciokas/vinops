export default function Gallery({ images }: { images: string[] }) {
  const main = images[0]
  const thumbs = images.slice(1, 5)
  return (
    <div className="card p-3 rounded-2xl bg-surface border border-border-muted">
      {main && (
        <div className="aspect-[4/3] overflow-hidden rounded-xl mb-3 bg-canvas-subtle">
          <img src={main} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      {thumbs.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {thumbs.map((src, i) => (
            <div key={i} className="aspect-[4/3] overflow-hidden rounded-lg bg-canvas-subtle">
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
