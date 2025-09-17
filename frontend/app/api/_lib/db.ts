import { Pool } from "pg"

// единый пул (не завязываемся на типы @types/pg)
declare global {
  // eslint-disable-next-line no-var
  var __pgPool: any | undefined
}

const DEFAULT_URL = "postgres://vinops:vinops@db:5432/vinops"
const connectionString = process.env.DATABASE_URL || DEFAULT_URL

export function getPool() {
  if (!globalThis.__pgPool) {
    globalThis.__pgPool = new Pool({
      connectionString,
      max: 5,
      idleTimeoutMillis: 30_000,
    })
  }
  return globalThis.__pgPool as any
}

// совместимость со старым кодом
export const pool = getPool()

export async function query(text: string, params?: any[]) {
  const p = getPool()
  return p.query(text, params)
}
