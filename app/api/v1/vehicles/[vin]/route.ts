import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const normVin = (v: string) => (v || "").trim().toUpperCase();
const isValidVin = (v: string) => /^[A-HJ-NPR-Z0-9]{17}$/.test(v);

export async function GET(_req: Request, { params }: { params: { vin: string } }) {
  try {
    const vin = normVin(params.vin);
    if (!isValidVin(vin)) return NextResponse.json({ error: "BAD_VIN" }, { status: 400 });

    const client = await pool.connect();
    try {
      const veh = await client.query('SELECT * FROM vehicles WHERE vin = $1 LIMIT 1', [vin]);
      if (veh.rowCount === 0) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

      const images = await client.query(
        'SELECT url, COALESCE(seq,0) AS seq FROM images WHERE vin = $1 ORDER BY seq ASC, url ASC LIMIT 64',[vin]
      );
      const sales = await client.query(
        'SELECT sale_date, price_usd, mileage, source FROM sales WHERE vin = $1 ORDER BY sale_date DESC LIMIT 64',[vin]
      );

      const v = veh.rows[0];
      return NextResponse.json({
        vin: v.vin, make: v.make ?? null, model: v.model ?? null, year: v.year ?? null,
        status: v.status ?? null, priceUSD: v.price_usd ?? null, location: v.location ?? null,
        damage: v.damage ?? null, title: v.title ?? null, keys: v.keys ?? null, engine: v.engine ?? null,
        images: images.rows, sales: sales.rows,
      });
    } finally { client.release(); }
  } catch (e) {
    console.error("vehicles GET error", e);
    return NextResponse.json({ error: "INTERNAL" }, { status: 500 });
  }
}
