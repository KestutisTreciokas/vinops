export default function LoadingVin() {
  return (
    <div className="container py-8 animate-pulse">
      <div className="h-8 w-64 rounded bg-muted mb-3" />
      <div className="h-4 w-96 rounded bg-muted mb-8" />
      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-6">
          <div className="card p-4">
            <div className="h-5 w-40 bg-muted rounded mb-3" />
            <div className="aspect-video w-full rounded-2xl bg-muted/50" />
            <div className="mt-3 flex gap-2">{Array.from({length:8}).map((_,i)=>(
              <div key={i} className="h-9 w-9 rounded-xl bg-muted" />
            ))}</div>
          </div>
        </div>
        <div className="space-y-6">
          {[1,2,3].map(i=>(
            <div key={i} className="card p-4">
              <div className="h-5 w-48 bg-muted rounded mb-3" />
              {Array.from({length:6}).map((_,j)=>(
                <div key={j} className="h-4 w-full bg-muted rounded mb-2" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
