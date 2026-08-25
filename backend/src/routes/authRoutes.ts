import { Router } from "express";
import { login, register, checkEmail } from "../controllers/authController.js";

const authRoutes = Router();

authRoutes.post("/auth/register", register);
authRoutes.post("/auth/login", login);
authRoutes.get("/auth/check-email", checkEmail);

export default authRoutes;

