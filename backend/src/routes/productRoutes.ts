import { Router } from "express";
import { getProduct, getProducts } from "../controllers/productController.js";

const productRoutes = Router();

productRoutes.get("/products", getProducts);
productRoutes.get("/products/:id", getProduct);

export default productRoutes;
