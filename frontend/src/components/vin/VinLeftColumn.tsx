import VinGallery from './VinGallery'
import VinSpecs from './VinSpecs'
import VinLot from './VinLot'
import VinHistory from './VinHistory'

export default function VinLeftColumn() {
  return (
    <div className="lg:col-span-8 space-y-6">
      <VinGallery />
      <VinSpecs />
      <VinLot />
      <VinHistory />
    </div>
  )
}
