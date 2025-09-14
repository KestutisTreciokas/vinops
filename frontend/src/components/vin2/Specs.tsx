'use client'

type Specs = {
  year?: string | number
  make?: string
  model?: string
  body?: string
  engine?: string
  transmission?: string
  drive?: string
  fuel?: string
}

export default function SpecsCard({
  specs,
  lang,
}: {
  specs?: Specs
  lang: 'ru' | 'en'
}) {
  const t =
    lang === 'ru'
      ? {
          title: 'Характеристики',
          make: 'Марка',
          model: 'Модель',
          year: 'Год',
          body: 'Кузов',
          engine: 'Двигатель',
          transmission: 'Трансмиссия',
          drive: 'Привод',
          fuel: 'Топливо',
          dash: '—',
        }
      : {
          title: 'Specifications',
          make: 'Make',
          model: 'Model',
          year: 'Year',
          body: 'Body',
          engine: 'Engine',
          transmission: 'Transmission',
          drive: 'Drive',
          fuel: 'Fuel',
          dash: '—',
        }

  const s: Specs = specs ?? {}

  const rows: Array<[string, string | number | undefined]> = [
    [t.make, s.make],
    [t.model, s.model],
    [t.year, s.year],
    [t.body, s.body],
    [t.engine, s.engine],
    [t.transmission, s.transmission],
    [t.drive, s.drive],
    [t.fuel, s.fuel],
  ]

  return (
    <section className="rounded-2xl border border-border-muted bg-surface p-4">
      <h3 className="text-base font-semibold">{t.title}</h3>
      <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
        {rows.map(([label, value], i) => (
          <div key={i} className="contents">
            <dt className="text-sm text-fg-muted">{label}</dt>
            <dd className="text-sm">{value ?? t.dash}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
