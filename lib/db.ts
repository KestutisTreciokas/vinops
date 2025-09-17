import { Pool } from "pg";
declare global { var __pgPool: Pool | undefined; }
const DEFAULT_URL = "postgres://vinops:vinops@db:5432/vinops";
const connectionString = process.env.DATABASE_URL || DEFAULT_URL;
export const pool =
  global.__pgPool ??
  (global.__pgPool = new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
    allowExitOnIdle: false,
  }));
