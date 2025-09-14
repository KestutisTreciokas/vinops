export type VinImage = { src: string; alt?: string }
export type VinSpecs = {
  make: string; model: string; year: number; body: string;
  fuel: string; engine: string; transmission: string; drive: string;
}
export type VinLot = {
  lotNumber: string; auction: string; seller: string;
  date: string; odometer: string; status: string; finalBid: string;
}
export type VinHistoryRow = { date: string; auction: string; lot: string; status: string; price: string }
export type VinData = { images: VinImage[]; specs: VinSpecs; lot: VinLot; history: VinHistoryRow[] }
