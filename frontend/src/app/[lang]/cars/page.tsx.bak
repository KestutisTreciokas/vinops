'use client'
import { useState } from 'react'
import PillTabs from '@/components/PillTabs'
import VehicleCard, { VehicleLite } from '@/components/VehicleCard'

export default function CatalogPage({ params }: { params: { lang: 'en'|'ru' } }) {
  const lang = params.lang
  const t = (en:string, ru:string)=> lang==='ru'?ru:en

  const tabs = [
    { id:'auto', label: t('Auto','Авто') },
    { id:'moto', label: t('Moto','Мото') },
    { id:'atv',  label: 'ATV' },
    { id:'more', label: t('More','Еще') },
  ]
  const [tab, setTab] = useState('auto')

  const rows: VehicleLite[] = Array.from({length:9}).map((_,i)=>({
    year: 2019, make:'Toyota', model:'Camry',
    damage:'Front End', title:'Salvage', location:'Dallas, TX',
    vin: `4T1B11HK0000${3456+i}`,
    status: i % 3 === 0 ? 'SOLD' : 'ACTIVE',
    price: i % 3 === 0 ? '$8,900' : '$12,300'
  }))

  return (
    <main>
      <section className="container catalog-head">
        <h1 className="text-xl font-semibold mb-1">{t('Catalog • VIN', 'Каталог • VIN')}</h1>
        <p className="text-fg-muted">{t(
          'Live lots: photos, specs, statuses, sale prices and history.',
          'Актуальные лоты: фото, характеристики, статусы, цены продаж и история.'
        )}</p>
      </section>

      {/* sticky */}
      <div className="filters-sticky">
        <section className="container">
          <PillTabs items={tabs} value={tab} onChange={setTab} className="mb-3" />
          <div className="filters-bar">
            <div className="select-wrap">
              <select className="select" defaultValue="">
                <option value="">{t('All makes','Все марки')}</option>
              </select>
              <span className="chev">▾</span>
            </div>
            <div className="select-wrap">
              <select className="select" defaultValue="">
                <option value="">{t('All models','Все модели')}</option>
              </select>
              <span className="chev">▾</span>
            </div>
            <div className="select-wrap">
              <select className="select" defaultValue="">
                <option value="">{t('All generations','Все поколения')}</option>
              </select>
              <span className="chev">▾</span>
            </div>
            <div className="select-wrap" data-size="sm">
              <select className="select" defaultValue="">
                <option value="">{t('Year from','От')}</option>
              </select>
              <span className="chev">▾</span>
            </div>
            <div className="select-wrap" data-size="sm">
              <select className="select" defaultValue="">
                <option value="">{t('Year to','До')}</option>
              </select>
              <span className="chev">▾</span>
            </div>
            <div className="flex gap-2">
              <button className="btn">{t('Reset','Сбросить')}</button>
              <button className="btn btn-primary">{t('Apply','Применить')}</button>
            </div>
          </div>
        </section>
      </div>

      <section className="container mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rows.map((v,idx)=>(<VehicleCard key={idx} v={v}/>))}
        </div>

        <nav className="pager">
          <button className="pager-btn">{t('Prev','Prev')}</button>
          <button className="pager-btn pager-btn-active">1</button>
          <button className="pager-btn">2</button>
          <button className="pager-btn">{t('Next','Next')}</button>
        </nav>
      </section>
    </main>
  )
}
