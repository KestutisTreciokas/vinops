export default function Features({ t }: { t:(en:string,ru:string)=>string }) {
  const items = [
    { title: t('Photos','Фото'), desc: t('Full-size images with zoom','Полноразмерные изображения с масштабированием') },
    { title: t('Specifications','Характеристики'), desc: t('Make, model, year, fuel, transmission, etc.','Марка, модель, год, топливо, КПП и др.') },
    { title: t('Sale history','История продаж'), desc: t('Auction prices and statuses','Цены и статусы аукционов') },
  ]
  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold mb-4">{t('What you get','Что вы получите')}</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((it, idx)=>(
          <div key={idx} className="card p-5">
            <div className="w-9 h-9 rounded-xl bg-brand-10 flex items-center justify-center mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-brand"></div>
            </div>
            <div className="font-medium">{it.title}</div>
            <div className="text-sm text-fg-muted mt-1">{it.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
