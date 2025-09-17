import { Pool } from "pg";
const { DATABASE_URL } = process.env;
if (!DATABASE_URL) console.warn("DATABASE_URL is not set — API routes will fail to connect.");
export const pg = new Pool({ connectionString: DATABASE_URL, max: 5 });
export async function query<T = any>(sql: string, params: any[] = []) {
  const client = await pg.connect();
  try { return await client.query<T>(sql, params); }
  finally { client.release(); }
}
