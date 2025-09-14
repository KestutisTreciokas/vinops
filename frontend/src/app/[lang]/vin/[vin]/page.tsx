import VinGallery from '@/components/vin2/VinGallery'
import VinSpecs from '@/components/vin2/VinSpecs'
import LotInfo from '@/components/vin2/LotInfo'
import History from '@/components/vin2/History'
import sample from '@/mock/vin-sample'

export default function VinPage({ params }: { params: { lang: 'ru'|'en', vin: string } }) {
  const { lang, vin } = params
  // пока мокаем одной и той же структурой
  const data = sample

  return (
    <main className="container mx-auto px-4 lg:px-6" data-page="vin">
      <header className="py-6">
        <h1 className="text-3xl font-semibold">VIN: {vin}</h1>
        <p className="text-fg-muted mt-1">
          {lang === 'ru' ? 'Актуальная информация по лоту, фото, характеристики и история.'
                         : 'Actual lot info with photos, specs and sale history.'}
        </p>
      </header>

      {/* Лэйаут: 3 колонки на xl, две на md */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
        {/* Галерея — растягиваемся на 2 колонки для удобного просмотра */}
        <div className="md:col-span-2">
          <VinGallery images={data.images} title={lang==='ru'?'Главное фото':'Main photo'} />
        </div>

        {/* Правая колонка (карточки) */}
        <div className="space-y-6">
          <VinSpecs lang={lang} specs={data.specs} />
          <LotInfo lang={lang} lot={data.lot} />
          <History lang={lang} rows={data.history} />
        </div>
      </div>
    </main>
  )
}
