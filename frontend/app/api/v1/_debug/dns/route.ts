import { NextResponse } from "next/server"
import * as dns from "node:dns"
import * as net from "node:net"
import { getPool } from "../../../_lib/db"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function tcpConnect(host: string, port: number, timeoutMs = 1500) {
  return new Promise<{ ok: boolean; error?: string }>((resolve) => {
    const sock = new (net as any).Socket()
    let finished = false
    const done = (ok: boolean, err?: any) => {
      if (finished) return
      finished = true
      try { sock.destroy() } catch {}
      resolve(ok ? { ok } : { ok, error: err?.code || err?.message || String(err) })
    }
    try {
      sock.setTimeout(timeoutMs, () => done(false, new Error("ETIMEDOUT")))
      sock.once("connect", () => done(true))
      sock.once("error", (e: any) => done(false, e))
      sock.connect(port, host)
    } catch (e: any) {
      done(false, e)
    }
  })
}

export async function GET() {
  const out: any = { dns: {}, tcp: {}, db: {} }

  // DNS "db" в docker-сети
  try {
    const addrs = await (dns as any).promises.lookup("db", { all: true })
    out.dns = { ok: true, addrs }
  } catch (e: any) {
    out.dns = { ok: false, error: e?.code || e?.message || String(e) }
  }

  // TCP к 5432
  out.tcp = await tcpConnect("db", 5432, 1500)

  // Проба запроса к БД
  try {
    const pool = getPool()
    await pool.query("SELECT 1")
    out.db = { ok: true }
  } catch (e: any) {
    out.db = { ok: false, error: e?.code || e?.message || String(e) }
  }

  return NextResponse.json(out)
}
