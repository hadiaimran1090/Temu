import { Router } from "express";
import { getOrders, placeOrder } from "../controllers/orderController";
import { authMiddleware } from "../middleware/auth";

const orderRoutes = Router();

orderRoutes.post("/orders", authMiddleware, placeOrder);
orderRoutes.get("/orders", authMiddleware, getOrders);

export default orderRoutes;
