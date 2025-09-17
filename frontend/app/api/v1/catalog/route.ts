import { NextResponse } from "next/server"
import { getPool } from "../../_lib/db"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10))
  const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get("limit") ?? "20", 10)))

  // Пингуем БД, но не падаем — возвращаем пустой список как мок
  let dbUp = false
  try {
    const pool = getPool()
    await pool.query("SELECT 1")
    dbUp = true
  } catch {
    dbUp = false
  }

  return NextResponse.json({
    items: [],
    page,
    totalPages: 0,
    dbUp,
    limit,
  })
}
