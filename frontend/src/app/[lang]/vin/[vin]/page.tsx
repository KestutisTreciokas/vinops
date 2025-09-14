import { fetchVin } from '@/lib/api-vin'
import sample from '@/mock/vin-sample'
import Gallery from '@/components/vin2/Gallery'
import Specs from '@/components/vin2/Specs'
import LotInfo from '@/components/vin2/LotInfo'
import History from '@/components/vin2/History'

export default async function VinPage({ params }: { params: { lang: 'ru'|'en', vin: string } }) {
  const { lang, vin } = params
  let data = sample

  try {
    const apiData = await fetchVin(vin, lang)
    // если API вернул валидные данные — используем их
    if (apiData?.photos?.length || apiData?.specs?.make) data = apiData
  } catch {
    // молча падаем на мок
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-semibold mb-2">VIN: {vin}</h1>
      <p className="text-fg-muted mb-8">Актуальная информация по лоту, фото и спецификации.</p>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-6">
          <Gallery photos={data.photos} />
        </div>
        <div className="space-y-6">
          <Specs specs={data.specs} />
          <LotInfo lot={data.lot} />
          <History items={data.history} />
        </div>
      </div>
    </div>
  )
}
