import cors from "cors";
import express from "express";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, response) => {
  response.json({
    message: "Temu backend is running"
  });
});

app.get("/api/support/whatsapp", (_, response) => {
  const phone = process.env.SUPPORT_WHATSAPP_NUMBER || "923001234567";
  const message = encodeURIComponent("Hello Temu Support, I need help with my order.");
  response.redirect(`https://wa.me/${phone}?text=${message}`);
});

app.get("/api/health", (_, response) => {
  response.json({ status: "ok" });
});

app.use("/api", productRoutes);
app.use("/api", authRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);

export default app;
