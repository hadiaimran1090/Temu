import cors from "cors";
import express from "express";
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (_, response) => {
  response.json({ status: "ok" });
});

app.use("/api", productRoutes);
app.use("/api", authRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);

export default app;
