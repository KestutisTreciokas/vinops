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
    </section>
  )
}
