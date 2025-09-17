import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export const runtime = "nodejs";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const sp = url.searchParams;

    const page = clamp(parseInt(sp.get("page") || "1", 10) || 1, 1, 1_000_000);
    const limit = clamp(parseInt(sp.get("limit") || "10", 10) || 10, 1, 50);
    const offset = (page - 1) * limit;

    const make = sp.get("make") || null;
    const model = sp.get("model") || null;
    const yearMin = sp.get("year_min") ? parseInt(sp.get("year_min")!, 10) : null;
    const yearMax = sp.get("year_max") ? parseInt(sp.get("year_max")!, 10) : null;

    const sort = (() => {
      const s = (sp.get("sort") || "").toLowerCase();
      if (s === "price_asc") return 'price_usd ASC NULLS LAST';
      if (s === "price_desc") return 'price_usd DESC NULLS LAST';
      return 'updated_at DESC NULLS LAST, vin DESC';
    })();

    const where: string[] = [];
    const args: any[] = [];
    const push = (sql: string, val: any) => { args.push(val); where.push(sql.replace(/\?/g, `$${args.length}`)); };

    if (make)  push("make = ?", make);
    if (model) push("model = ?", model);
    if (yearMin !== null) push("year >= ?", yearMin);
    if (yearMax !== null) push("year <= ?", yearMax);

    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

    const client = await pool.connect();
    try {
      const itemsQ = await client.query(
        `SELECT vin, make, model, year, status, price_usd
         FROM vehicles
         ${whereSql}
         ORDER BY ${sort}
         LIMIT $${args.length + 1}
         OFFSET $${args.length + 2}`,
         [...args, limit, offset]
      );
      // hasNext (без COUNT(*))
      const nextQ = await client.query(
        `SELECT 1 FROM vehicles ${whereSql} LIMIT 1 OFFSET $${args.length + 1}`,
        [...args, offset + limit]
      );

      return NextResponse.json({
        page,
        limit,
        hasNext: nextQ.rowCount > 0,
        items: itemsQ.rows,
      });
    } finally {
      client.release();
    }
  } catch (e) {
    console.error("catalog GET error", e);
    return NextResponse.json({ error: "INTERNAL" }, { status: 500 });
  }
}
