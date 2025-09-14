import type { VinData } from '@/components/vin2/types'

const data: VinData = {
  images: Array.from({length:8}, (_,i)=>({ src: `/vin-sample/${i+1}.svg`, alt: `Photo #${i+1}`})),
  specs: {
    make: 'Toyota', model: 'Camry', year: 2019, body: 'Sedan',
    fuel: 'Gasoline', engine: '2.5L', transmission: 'AT', drive: 'FWD',
  },
  lot: {
    lotNumber: '80103945', auction: 'Copart', seller: 'Progressive Casualty Insurance',
    date: '2025-05-12', odometer: '49 792 mi', status: 'Sold', finalBid: '$11,500',
  },
  history: [
    { date: '2025-05-12', auction: 'Copart', lot: '80103945', status: 'Sold',  price: '$11,500' },
    { date: '2024-11-03', auction: 'IAAI',   lot: '73822011', status: 'Sold',  price: '$10,900' },
    { date: '2024-07-18', auction: 'Copart', lot: '70112208', status: 'Offered', price: '—' },
  ],
}
export default data
