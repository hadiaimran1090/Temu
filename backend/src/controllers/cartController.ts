import { Response } from "express";
import { AuthRequest } from "../middleware/auth.js";
import { query } from "../db.js";

async function getUserCartItems(userId: number) {
  const result = await query(
    `SELECT p.id, p.title, p.price, p.old_price AS "oldPrice", p.image, p.category, p.sold, p.badge, p.palette, ci.quantity
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     JOIN carts c ON ci.cart_id = c.id
     WHERE c.user_id = $1
     ORDER BY ci.id ASC`,
    [userId]
  );
  return result.rows;
}

async function getOrCreateUserCartId(userId: number): Promise<number> {
  let cartResult = await query("SELECT id FROM carts WHERE user_id = $1", [userId]);
  if (cartResult.rows.length === 0) {
    cartResult = await query("INSERT INTO carts (user_id) VALUES ($1) RETURNING id", [userId]);
  }
  return cartResult.rows[0].id;
}

export async function getCart(req: AuthRequest, res: Response) {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const items = await getUserCartItems(user.id);
    return res.json(items);
  } catch (error) {
    console.error("getCart error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function addItem(req: AuthRequest, res: Response) {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const { productId, quantity } = req.body;
  if (!productId || typeof productId !== "number") {
    return res.status(400).json({ message: "Valid productId is required" });
  }

  const qty = typeof quantity === "number" ? Math.max(1, Math.floor(quantity)) : 1;

  try {
    const prodResult = await query("SELECT id FROM products WHERE id = $1", [productId]);
    if (prodResult.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cartId = await getOrCreateUserCartId(user.id);

    await query(
      `INSERT INTO cart_items (cart_id, product_id, quantity)
       VALUES ($1, $2, $3)
       ON CONFLICT (cart_id, product_id)
       DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity`,
      [cartId, productId, qty]
    );

    const items = await getUserCartItems(user.id);
    return res.json(items);
  } catch (error) {
    console.error("addItem error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function removeItem(req: AuthRequest, res: Response) {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const productId = Number(req.params.productId);
  if (isNaN(productId)) {
    return res.status(400).json({ message: "Invalid productId" });
  }

  try {
    const cartId = await getOrCreateUserCartId(user.id);

    await query("DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2", [cartId, productId]);

    const items = await getUserCartItems(user.id);
    return res.json(items);
  } catch (error) {
    console.error("removeItem error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function clearCart(req: AuthRequest, res: Response) {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const cartId = await getOrCreateUserCartId(user.id);
    await query("DELETE FROM cart_items WHERE cart_id = $1", [cartId]);
    return res.json([]);
  } catch (error) {
    console.error("clearCart error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function mergeCart(req: AuthRequest, res: Response) {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const { items } = req.body;
  if (!Array.isArray(items)) {
    return res.status(400).json({ message: "Items array is required" });
  }

  try {
    const cartId = await getOrCreateUserCartId(user.id);

    for (const item of items) {
      const { productId, quantity } = item;
      if (typeof productId !== "number" || typeof quantity !== "number") continue;

      const qty = Math.max(1, Math.floor(quantity));

      const prodResult = await query("SELECT id FROM products WHERE id = $1", [productId]);
      if (prodResult.rows.length === 0) continue;

      await query(
        `INSERT INTO cart_items (cart_id, product_id, quantity)
         VALUES ($1, $2, $3)
         ON CONFLICT (cart_id, product_id)
         DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity`,
        [cartId, productId, qty]
      );
    }

    const mergedItems = await getUserCartItems(user.id);
    return res.json(mergedItems);
  } catch (error) {
    console.error("mergeCart error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
