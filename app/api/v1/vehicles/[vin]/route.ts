import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isValidVin(v: string) {
  return /^[A-HJ-NPR-Z0-9]{17}$/.test(v.toUpperCase());
}

export async function GET(_req: Request, { params }: { params: { vin: string } }) {
  const vin = (params.vin || "").toUpperCase();
  if (!isValidVin(vin)) {
    return NextResponse.json({ error: "BAD_VIN" }, { status: 400 });
  }

  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `
      SELECT v.vin, v.make, v.model, v.year, v.status, v.price_usd, v.location,
             v.damage, v.title_status AS title, v.keys, v.engine,
             COALESCE((
               SELECT json_agg(json_build_object('url', i.url, 'seq', i.seq) ORDER BY i.seq)
               FROM images i WHERE i.vin = v.vin
             ), '[]'::json) AS images,
             COALESCE((
               SELECT json_agg(json_build_object('sale_date', s.sale_date, 'status', s.status, 'final_bid_usd', s.final_bid_usd, 'source', s.source) ORDER BY s.sale_date)
               FROM sales s WHERE s.vin = v.vin
             ), '[]'::json) AS sales
      FROM vehicles v
      WHERE v.vin = $1
      LIMIT 1
      `,
      [vin],
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    }
    return NextResponse.json(rows[0], { status: 200 });
  } finally {
    client.release();
  }
}
