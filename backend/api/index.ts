import "../src/config";
import app from "../src/app";
import { initDb } from "../src/db/init";

let isDbInitialized = false;

export default async function handler(req: any, res: any) {
  if (!isDbInitialized) {
    try {
      await initDb();
      isDbInitialized = true;
    } catch (err) {
      console.error("Database connection failed", err);
    }
  }
  return app(req, res);
}
