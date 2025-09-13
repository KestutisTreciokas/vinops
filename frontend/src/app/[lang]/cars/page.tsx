import CatalogCard from '../../../components/CatalogCard'
import Filters from './_Filters'
export default function Catalog({ params }: { params: { lang: 'en' | 'ru' } }) {
  const t = (en: string, ru: string) => (params.lang === 'ru' ? ru : en)

  return (
    <section className="grid gap-6">\n      <Filters lang={params.lang} />
      <h1 className="text-2xl font-semibold">{t('Cars', 'Каталог')}</h1>

      <div className="card">
        <div className="text-sm text-fg-muted">
           {t('Catalog will be here soon.', 'Каталог скоро будет.')}
        </div>
      </div>
    
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({length:6}).map((_,i)=>(
          <CatalogCard key={i} vin="WAUZZZAAAAAAAAAAA" year={2019} make="Audi" model="A4" primaryDamage="FRONT END" status={i%3===0?'sold':'active'} />
        ))}
      </div>

    </section>
  )
}
