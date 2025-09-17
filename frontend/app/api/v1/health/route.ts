import { NextResponse } from "next/server"
import { getPool } from "../../_lib/db"

// Не кешировать — всегда живой чек
export const dynamic = "force-dynamic"

export async function GET() {
  const started = Date.now()
  const db = { up: false as boolean, latencyMs: null as number | null, error: null as string | null }

  try {
    const pool = getPool()
    await pool.query("SELECT 1")
    db.up = true
    db.latencyMs = Date.now() - started
  } catch (e: any) {
    db.error = e?.message ?? String(e)
  }

  return NextResponse.json({ ok: true, ts: Date.now(), db })
}
