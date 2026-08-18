import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("neon.tech") || process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false,
});

export function query(text: string, params?: any[]) {
  return pool.query(text, params);
}
