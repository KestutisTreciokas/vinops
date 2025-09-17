import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sp = url.searchParams;

  const make = sp.get("make")?.trim() || null;
  const model = sp.get("model")?.trim() || null;
  const yMin = sp.get("year_min") ? Number(sp.get("year_min")) : null;
  const yMax = sp.get("year_max") ? Number(sp.get("year_max")) : null;
  const sort = (sp.get("sort") || "date_desc").toLowerCase();
  const page = Math.max(1, parseInt(sp.get("page") || "1", 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(sp.get("limit") || "20", 10) || 20));
  const offset = (page - 1) * limit;

  const sorts: Record<string, string> = {
    price_asc: "price_usd ASC NULLS LAST, year DESC",
    price_desc: "price_usd DESC NULLS LAST, year DESC",
    date_desc: "updated_at DESC, year DESC",
  };
  const orderBy = sorts[sort] ?? sorts.date_desc;

  const where: string[] = [];
  const params: any[] = [];
  const add = (sql: string, val: any) => { params.push(val); where.push(sql.replace("?", `$${params.length}`)); };

  if (make)  add("make ILIKE ?", make);
  if (model) add("model ILIKE ?", model);
  if (yMin !== null) add("year >= ?", yMin);
  if (yMax !== null) add("year <= ?", yMax);

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const client = await pool.connect();
  try {
    const countSql = `SELECT COUNT(*)::int AS cnt FROM vehicles ${whereSql}`;
    const { rows: cntRows } = await client.query(countSql, params);
    const total = cntRows[0]?.cnt ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    const listSql = `
      SELECT vin, make, model, year, status, price_usd, location
      FROM vehicles
      ${whereSql}
      ORDER BY ${orderBy}
      LIMIT ${limit} OFFSET ${offset}
    `;
    const { rows } = await client.query(listSql, params);

    return NextResponse.json({ items: rows, page, totalPages }, { status: 200 });
  } finally {
    client.release();
  }
}
