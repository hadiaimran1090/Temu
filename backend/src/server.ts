import "./config.js";
import app from "./app.js";
import { initDb } from "./db/init.js";

const port = Number(process.env.PORT) || 3001;

async function startServer() {
  try {
    await initDb();
    app.listen(port, () => {
      console.log(`Express API running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
}

startServer();
