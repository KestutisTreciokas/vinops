import type { VinData } from '@/components/vin2/types';

const sample: VinData = {
  photos: Array.from({length: 8}, (_,i)=>({
    id: i+1,
    title: `Фото #${i+1}`,
    // можно заменить на реальные URL позже
    url: '/icon.svg'
  })),
  specs: {
    year: 2019, make: 'Toyota', model: 'Camry',
    body: 'Sedan', engine: '2.5L', transmission: 'AT',
    drive: 'FWD', fuel: 'Gasoline'
  },
  lot: {
    lotNumber: '80103945', auction: 'Copart',
    seller: 'Progressive Casualty Insurance',
    date: '2025-05-12', odometer: '49 792 mi',
    status: 'Sold', finalBid: 11500
  },
  history: [
    { date: '2025-05-12', auction: 'Copart', lot: '80103945', status: 'Sold', price: 11500 },
    { date: '2025-03-01', auction: 'IAAI',   lot: '6988777',  status: 'Listed', price: 11200 }
  ]
};

export default sample;
