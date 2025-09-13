import Timeline from './_Timeline'
import Specs from './_Specs'
import Script from 'next/script'

export default function VinPage({
  params,
}: {
  params: { lang: 'en' | 'ru'; vin: string }
}) {
  const { lang, vin } = params
  const t = (en: string, ru: string) => (lang === 'ru' ? ru : en)

  // Заглушка данных до подключения API (M3)
  const vehicle = {
    vin,
    year: null as number | null,
    make: null as string | null,
    model: null as string | null,
    mileage: null as number | null,
    fuel: null as string | null,
    transmission: null as string | null,
  }

  // JSON-LD Vehicle для SEO
  const ldVehicle = {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    vehicleIdentificationNumber: vin,
    ...(vehicle.make ? { brand: vehicle.make } : {}),
    ...(vehicle.model ? { model: vehicle.model } : {}),
    ...(vehicle.year ? { modelDate: String(vehicle.year) } : {}),
  }

  return (
    <>
      <Script
        id="ld-vehicle"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldVehicle) }}
      />
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">
          {t('Vehicle', 'Автомобиль')} — VIN {vin}
        </h1>
      </header>

      <section className="grid gap-6">
        {/* Характеристики */}\n<Specs t={t} items={[{label:t("Year","Год"),value:vehicle.year?String(vehicle.year):"—"},{label:t("Make","Марка"),value:vehicle.make||"—"},{label:t("Model","Модель"),value:vehicle.model||"—"},{label:t("Fuel","Топливо"),value:vehicle.fuel||"—"},{label:t("Transmission","КПП"),value:vehicle.transmission||"—"}]} />
        <div className="card">
          <h2 className="font-semibold mb-3">{t('Specifications', 'Характеристики')}</h2>
          <div className="text-sm text-fg-muted">
            {t(
              'Data will appear after the first import.',
              'Данные появятся после первого импорта.'
            )}
          </div>
        </div>

        {/* Галерея */}
        <div className="card">
          <h2 className="font-semibold mb-3">{t('Gallery', 'Галерея')}</h2>
          <div className="text-sm text-fg-muted">
            ⏳ {t('Photos will appear here.', 'Здесь появятся фото.')}
          </div>
        </div>

        {/* История продаж / таймлайн */}\n<Timeline t={t} />
        <div className="card">
          <h2 className="font-semibold mb-3">{t('Sale timeline', 'История продаж')}</h2>
          <div className="text-sm text-fg-muted">
            ⏳ {t(
              'Timeline will be generated when we detect sales.',
              'Таймлайн появится после определения исхода продажи.'
            )}
          </div>
        </div>

        {/* ОБЯЗАТЕЛЬНЫЙ блок Removal request */}
        <div className="card">
          <h2 className="font-semibold mb-3">{t('Removal request', 'Запрос на удаление')}</h2>
          <p className="text-sm mb-3">
            {t(
              'To request removal of this VIN page, contact us:',
              'Чтобы запросить удаление данной страницы VIN, свяжитесь с нами:'
            )}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a className="btn btn-secondary" href="mailto:request@vinops.online">request@vinops.online</a>
            <a className="btn btn-secondary" href="https://t.me/keustis" target="_blank" rel="noreferrer">@keustis</a>
          </div>
        </div>
      </section>
    </>
  )
}
