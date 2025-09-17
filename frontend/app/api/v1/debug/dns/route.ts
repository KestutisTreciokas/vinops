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

  // DNS db (docker internal)
  try {
    const addrs = await (dns as any).promises.lookup("db", { all: true })
    out.dns.lookup = { ok: true, addrs }
  } catch (e: any) {
    out.dns.lookup = { ok: false, error: e?.code || e?.message || String(e) }
  }
  try {
    const A = await (dns as any).promises.resolve4("db")
    out.dns.A = A
  } catch (e: any) {
    out.dns.A = { error: e?.code || e?.message || String(e) }
  }
  try {
    const AAAA = await (dns as any).promises.resolve6("db")
    out.dns.AAAA = AAAA
  } catch (e: any) {
    out.dns.AAAA = { error: e?.code || e?.message || String(e) }
  }

  // TCP to postgres
  out.tcp["db:5432"] = await tcpConnect("db", 5432, 1500)

  // DB query
  try {
    const pool = getPool()
    await pool.query("SELECT 1")
    out.db = { ok: true }
  } catch (e: any) {
    out.db = { ok: false, error: e?.code || e?.message || String(e) }
  }

  return NextResponse.json(out)
}
