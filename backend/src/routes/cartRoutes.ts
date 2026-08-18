import { Router } from "express";
import { getCart, addItem, removeItem, clearCart, mergeCart } from "../controllers/cartController.js";
import { authMiddleware } from "../middleware/auth.js";

const cartRoutes = Router();

// Apply authMiddleware to all cart routes
cartRoutes.use(authMiddleware);

cartRoutes.get("/cart", getCart);
cartRoutes.post("/cart/items", addItem);
cartRoutes.delete("/cart/items/:productId", removeItem);
cartRoutes.delete("/cart", clearCart);
cartRoutes.post("/cart/merge", mergeCart);

export default cartRoutes;
