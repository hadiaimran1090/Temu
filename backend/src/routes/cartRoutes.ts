import { Router } from "express";
import { getCart, addItem, removeItem, clearCart, mergeCart, updateItem } from "../controllers/cartController.js";
import { authMiddleware } from "../middleware/auth.js";

const cartRoutes = Router();

// Apply authMiddleware to all cart routes
cartRoutes.use(authMiddleware);

cartRoutes.get("/cart", getCart);
cartRoutes.post("/cart/items", addItem);
cartRoutes.put("/cart/items", updateItem);
cartRoutes.delete("/cart/items/:productId", removeItem);
cartRoutes.delete("/cart", clearCart);
cartRoutes.post("/cart/merge", mergeCart);

export default cartRoutes;
