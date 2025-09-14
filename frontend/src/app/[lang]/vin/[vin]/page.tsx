import Gallery from '@/components/vin2/Gallery'
import Specs from '@/components/vin2/Specs'
import LotInfo from '@/components/vin2/LotInfo'
import History from '@/components/vin2/History'
import sample from '@/mock/vin-sample'

export default function VinPage({ params }: { params: { lang: 'ru'|'en', vin: string } }) {
  const data = sample   // временно всегда мокаем

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-semibold mb-2">VIN: {params.vin}</h1>
      <p className="text-fg-muted mb-6">Актуальная информация по лоту, фото и спецификации.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Gallery images={data.images} />
          <History rows={data.history} />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Specs specs={data.specs} />
          <LotInfo lot={data.lot} />
        </div>
      </div>
    </div>
  )
}
