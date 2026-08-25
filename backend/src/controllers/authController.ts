import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "../db.js";

const JWT_SECRET = process.env.JWT_SECRET || "temu-secret-key-12345";

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const userCheck = await query("SELECT id FROM users WHERE email = $1", [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const insertUserResult = await query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
      [email, passwordHash]
    );

    const user = insertUserResult.rows[0];

    await query("INSERT INTO carts (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING", [user.id]);

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

    return res.status(201).json({ token, email: user.email });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const userResult = await query("SELECT id, email, password_hash FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    await query("INSERT INTO carts (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING", [user.id]);

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

    return res.json({ token, email: user.email });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function checkEmail(req: Request, res: Response) {
  const { email } = req.query;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ message: "Email parameter is required" });
  }

  try {
    const userCheck = await query("SELECT id FROM users WHERE email = $1", [email.toLowerCase().trim()]);
    return res.json({ exists: userCheck.rows.length > 0 });
  } catch (error) {
    console.error("checkEmail error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

