export type VehicleLite = {
  year: number
  make: string
  model: string
  damage: string
  title: string
  location: string
  vin: string
  image?: string | null
}
const shortVin = (vin:string) => (vin.length>10 ? `${vin.slice(0,8)}…${vin.slice(-4)}` : vin)

export default function VehicleCard({v}:{v:VehicleLite}) {
  return (
    <article className="vehicle-card">
      <div className="vimg">{/* позже поставим реальное изображение */}</div>
      <div className="vbody">
        <div className="vtitle">{v.year} {v.make} {v.model}</div>
        <div className="vmeta">{v.damage} • {v.title} • {v.location}</div>
        <div className="vvin">VIN {shortVin(v.vin)}</div>
      </div>
    </article>
  )
}
