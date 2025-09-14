import type { Specs } from './types';

function Row({ k, v }: { k: string; v: string|number }) {
  return (
    <div className="flex items-baseline justify-between py-1">
      <span className="text-fg-muted">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}

export default function SpecsCard({ specs }: { specs: Specs }) {
  const { year, make, model, body, engine, transmission, drive, fuel } = specs;
  return (
    <div className="card p-4">
      <h3 className="text-base font-semibold mb-2">Характеристики</h3>
      <div className="space-y-1">
        <Row k="Марка" v={make} />
        <Row k="Модель" v={model} />
        <Row k="Год" v={year} />
        <Row k="Кузов" v={body} />
        <Row k="Двигатель" v={engine} />
        <Row k="Трансмиссия" v={transmission} />
        <Row k="Привод" v={drive} />
        <Row k="Топливо" v={fuel} />
      </div>
    </div>
  );
}
