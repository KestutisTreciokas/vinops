import VinGallery from '@/src/components/vin/VinGallery'
import VinSpecs from '@/src/components/vin/VinSpecs'
import VinLot from '@/src/components/vin/VinLot'
import VinHistory from '@/src/components/vin/VinHistory'

export default function VinLeftColumn({ lang }: { lang: 'ru'|'en' }) {
  return (
    <div className="lg:col-span-8 space-y-6">
      <VinGallery lang={lang} />
      <VinSpecs   lang={lang} />
      <VinLot     lang={lang} />
      <VinHistory lang={lang} />
    </div>
  )
}
