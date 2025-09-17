import { NextResponse } from "next/server";
import { query } from "@/lib/db";

function num(v: string | null, def: number) {
  const n = v ? parseInt(v, 10) : def;
  return Number.isFinite(n) && n > 0 ? n : def;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sp = url.searchParams;

  const make = sp.get("make")?.toUpperCase() || null;
  const model = sp.get("model")?.toUpperCase() || null;
  const yearMin = sp.get("year_min");
  const yearMax = sp.get("year_max");
  const page = Math.max(1, num(sp.get("page"), 1));
  const limit = Math.min(50, num(sp.get("limit"), 20));

  const sort = sp.get("sort");
  const sortSql =
    sort === "price_asc" ? "ll.retail_value_usd ASC NULLS LAST" :
    sort === "price_desc" ? "ll.retail_value_usd DESC NULLS LAST" :
    "ll.auction_datetime_utc DESC NULLS LAST";

  const where: string[] = [];
  const params: any[] = [];
  let p = 1;

  if (make)  { where.push(`v.make = $${p++}`);  params.push(make); }
  if (model) { where.push(`v.model = $${p++}`); params.push(model); }
  if (yearMin) { where.push(`v.year >= $${p++}`); params.push(parseInt(yearMin, 10)); }
  if (yearMax) { where.push(`v.year <= $${p++}`); params.push(parseInt(yearMax, 10)); }

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const offset = (page - 1) * limit;

  const itemsSql = `
    WITH latest_lot AS (
      SELECT l.*
      FROM lots l
      JOIN (
        SELECT vin, MAX(auction_datetime_utc) AS max_dt
        FROM lots
        GROUP BY vin
      ) mx ON mx.vin = l.vin AND mx.max_dt = l.auction_datetime_utc
    )
    SELECT v.vin, v.make, v.model, v.year,
           ll.id AS lot_id, ll.source, ll.auction_datetime_utc, ll.retail_value_usd, ll.status
    FROM vehicles v
    LEFT JOIN latest_lot ll ON ll.vin = v.vin
    ${whereSql}
    ORDER BY ${sortSql}
    LIMIT ${limit} OFFSET ${offset}
  `;

  const countSql = `SELECT COUNT(*)::int AS cnt FROM vehicles v ${whereSql}`;

  const [itemsRes, countRes] = await Promise.all([
    query(itemsSql, params),
    query(countSql, params),
  ]);

  const total = countRes.rows[0]?.cnt ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return NextResponse.json({ page, totalPages, items: itemsRes.rows });
}
