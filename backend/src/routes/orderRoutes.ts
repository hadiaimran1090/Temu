import { Router } from "express";
import { placeOrder } from "../controllers/orderController";
import { authMiddleware } from "../middleware/auth";

const orderRoutes = Router();

orderRoutes.post("/orders", authMiddleware, placeOrder);

export default orderRoutes;
