import { Router } from "express";
import { login, register } from "../controllers/authController.js";

const authRoutes = Router();

authRoutes.post("/auth/register", register); //http://localhost:3001/api/auth/login
authRoutes.post("/auth/login", login);

export default authRoutes;
