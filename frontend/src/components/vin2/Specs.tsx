import type { VinSpecs } from './types'

export default function Specs({ specs }: { specs: VinSpecs }) {
  const Row = ({label, value}:{label:string; value:string|number}) => (
    <div className="grid grid-cols-[120px_1fr] gap-3">
      <div className="text-fg-muted">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  )

  return (
    <section className="card p-4 md:p-5">
      <h3 className="text-lg font-semibold mb-4">Характеристики</h3>
      <div className="space-y-2">
        <Row label="Марка/модель" value={`${specs.make} ${specs.model}`} />
        <Row label="Год" value={specs.year} />
        <Row label="Кузов" value={specs.body} />
        <Row label="Топливо" value={specs.fuel} />
        <Row label="Двигатель" value={specs.engine} />
        <Row label="Трансмиссия" value={specs.transmission} />
        <Row label="Привод" value={specs.drive} />
      </div>
    </section>
  )
}
