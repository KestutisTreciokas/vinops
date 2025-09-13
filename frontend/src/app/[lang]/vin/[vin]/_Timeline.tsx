export default function Timeline({ t }: { t: (en:string,ru:string)=>string }) {
  const items = [
    { date: '2024-11-03', label: t('Listed at Copart','Выставлен в Copart') },
    { date: '2024-11-10', label: t('Sold','Продан') },
  ]
  return (
    <div className="card p-5">
      <h2 className="font-semibold mb-3">{t('Sale timeline','История продаж')}</h2>
      <ol className="relative ml-3">
        {items.map((it,idx)=>(
          <li key={idx} className="mb-4 pl-6">
            <span className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-brand"></span>
            <div className="text-xs text-fg-muted">{it.date}</div>
            <div className="text-sm font-medium">{it.label}</div>
          </li>
        ))}
      </ol>
    </div>
  )
}
