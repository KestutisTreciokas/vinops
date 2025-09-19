'use client'
import { Row, IcCalendar, IcCar, IcEngine, IcGear, IcDrive } from './ui'

type Specs = {
  year?: number | string
  make?: string
  model?: string
  body?: string
  engine?: string
  transmission?: string
  drive?: string
}

export default function SpecsCard({ specs }: { specs?: Specs | null }) {
  const s = specs ?? {}
  return (
    <section className="card p-4">
      <h3 className="card-title mb-3">Характеристики</h3>
      <div className="space-y-2">
        <Row icon={<IcCalendar />} label="Год"          value={s.year} />
        <Row icon={<IcCar />}      label="Марка"        value={s.make} />
        <Row icon={<IcCar />}      label="Модель"       value={s.model} />
        <Row icon={<IcCar />}      label="Кузов"        value={s.body} />
        <Row icon={<IcEngine />}   label="Двигатель"    value={s.engine} />
        <Row icon={<IcGear />}     label="Трансмиссия"  value={s.transmission} />
        <Row icon={<IcDrive />}    label="Привод"       value={s.drive} />
      </div>
    </section>
  )
}
