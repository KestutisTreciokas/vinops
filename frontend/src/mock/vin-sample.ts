export default {
  vin: 'WAUZZZAAAAAAAAAAA',
  gallery: {
    mainIndex: 2,
    items: Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      url: `/placeholder/${i + 1}.jpg`,
    })),
  },
  specs: {
    make: 'Toyota',
    model: 'Camry',
    year: 2019,
    body: 'Sedan',
    engine: '2.5L',
    drive: 'FWD',
    transmission: 'AT',
  },
  lot: {
    number: '80103945',
    auction: 'Copart',
    seller: 'Progressive Casualty Insurance',
    date: '2025-05-12',
    odometer: '49 792 mi',
    status: 'Sold',
    finalBid: '$11,500',
  },
  history: [
    // Пример строки истории:
    // { date: '2024-11-05', auction: 'Copart', lot: '71234567', status: 'Sold', price: '$8,900' },
  ],
};
