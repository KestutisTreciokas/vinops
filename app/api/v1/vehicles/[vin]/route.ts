import { NextResponse } from "next/server";
import { isValidVin } from "@/lib/seo";
import { query } from "@/lib/db";

export async function GET(_: Request, { params }: { params: { vin: string } }) {
  const vin = (params.vin || "").toUpperCase();
  if (!isValidVin(vin)) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const vehRes = await query(
    `SELECT v.vin, v.make, v.model, v.year, v.body, v.fuel, v.transmission, v.drive, v.engine
     FROM vehicles v WHERE v.vin = $1`, [vin]
  );
  if (vehRes.rowCount === 0) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  const v = vehRes.rows[0];

  const lotRes = await query(
    `SELECT l.*
       FROM lots l
      WHERE l.vin = $1
      ORDER BY l.auction_datetime_utc DESC NULLS LAST
      LIMIT 1`, [vin]
  );
  const lot = lotRes.rows[0] || null;

  const imgRes = await query(
    `SELECT i.seq, i.variant, i.storage_key, i.width, i.height, i.bytes
       FROM images i
      WHERE i.vin = $1
      ORDER BY i.seq ASC
      LIMIT 12`, [vin]
  );

  const salesRes = await query(
    `SELECT s.sale_date, s.status, s.final_bid_usd, s.currency
       FROM sale_events s
      WHERE s.vin = $1
      ORDER BY s.sale_date DESC NULLS LAST`, [vin]
  );

  return NextResponse.json({
    vin: v.vin, make: v.make, model: v.model, year: v.year,
    specs: { body: v.body, fuel: v.fuel, transmission: v.transmission, drive: v.drive, engine: v.engine },
    lot: lot ? {
      id: lot.id, source: lot.source, siteCode: lot.site_code,
      location: { city: lot.city, region: lot.region, country: lot.country, tz: lot.tz },
      auctionDateUTC: lot.auction_datetime_utc, retailValueUSD: lot.retail_value_usd, status: lot.status
    } : null,
    images: imgRes.rows,
    sales: salesRes.rows
  });
}
