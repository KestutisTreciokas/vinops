import StatRow from '../../../../components/ui/StatRow'
export default function Specs({
  items, t,
}: {
  t: (en:string,ru:string)=>string
  items: { label: string; value: string }[]
}) {
  return (
    <div className="card p-5">
      <h2 className="font-semibold mb-3">{t('Specifications','Характеристики')}</h2>
      <div className="grid md:grid-cols-2 gap-2">
        {items.map((it,idx)=>(<StatRow key={idx} label={it.label} value={it.value} />))}
      </div>
    </div>
  )
}
