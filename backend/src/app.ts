import cors from "cors";
import express from "express";
import { ensureDbInitialized } from "./db/init";
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Database auto-initialization middleware for Serverless environment
app.use(async (req, res, next) => {
  try {
    await ensureDbInitialized();
    next();
  } catch (error) {
    console.error("Database initialization failed:", error);
    res.status(500).json({ error: "Internal Server Error: Database initialization failed" });
  }
});

app.get("/api/health", (_, response) => {
  response.json({ status: "ok" });
});

app.use("/api", productRoutes);
app.use("/api", authRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);

export default app;
