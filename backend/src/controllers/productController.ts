import type { Request, Response } from "express";
import { query } from "../db";

export async function getProducts(request: Request, response: Response) {
  try {
    const category =
      typeof request.query.category === "string"
        ? request.query.category.trim()
        : "";
    const search =
      typeof request.query.search === "string"
        ? request.query.search.trim()
        : "";

    let sql = `SELECT id, title, price, old_price AS "oldPrice", image, category, sold, badge, palette FROM products WHERE 1=1`;
    const params: any[] = [];

    if (category && category !== "All") {
      params.push(category);
      sql += ` AND category = $${params.length}`;
    }

    if (search) {
      params.push(`%${search}%`);
      sql += ` AND LOWER(title) LIKE LOWER($${params.length})`;
    }

    sql += " ORDER BY id ASC";

    const result = await query(sql, params);
    response.json(result.rows);
  } catch (error) {
    console.error("getProducts error:", error);
    response.status(500).json({ message: "Internal server error" });
  }
}

export async function getProduct(request: Request, response: Response) {
  try {
    const id = Number(request.params.id);
    if (isNaN(id)) {
      return response.status(400).json({ message: "Invalid product ID" });
    }

    const result = await query(
      `SELECT id, title, price, old_price AS "oldPrice", image, category, sold, badge, palette 
       FROM products 
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return response.status(404).json({ message: "Product not found" });
    }

    response.json(result.rows[0]);
  } catch (error) {
    console.error("getProduct error:", error);
    response.status(500).json({ message: "Internal server error" });
  }
}
