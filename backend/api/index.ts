import "../src/config.js";
import app from "../src/app.js";
import { initDb } from "../src/db/init.js";

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
