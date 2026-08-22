import { Response } from "express";
import { AuthRequest } from "../middleware/auth.js";
import { query, pool } from "../db.js";

export async function placeOrder(req: AuthRequest, res: Response) {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const { name, email, phone, address, city, postalCode } = req.body;

  if (!name || !email || !phone || !address || !city || !postalCode) {
    return res.status(400).json({ message: "All shipping details are required" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Lock the cart to prevent concurrent checkouts for this user
    await client.query(
      "SELECT id FROM carts WHERE user_id = $1 FOR UPDATE",
      [user.id]
    );

    const cartResult = await client.query(
      `SELECT ci.product_id, ci.quantity, p.price 
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       JOIN carts c ON ci.cart_id = c.id
       WHERE c.user_id = $1`,
      [user.id]
    );

    const cartItems = cartResult.rows;
    if (cartItems.length === 0) {
      await client.query("ROLLBACK");
      return res.status(400).json({ message: "Your cart is empty" });
    }

    const parsePrice = (val: string) => Number(val.replace(/[^\d]/g, ""));
    let total = 0;
    for (const item of cartItems) {
      total += parsePrice(item.price) * item.quantity;
    }

    const orderInsertResult = await client.query(
      `INSERT INTO orders (user_id, name, email, phone, address, city, postal_code, total_price)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id`,
      [user.id, name, email, phone, address, city, postalCode, total]
    );

    const orderId = orderInsertResult.rows[0].id;

    for (const item of cartItems) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    const cartIdResult = await client.query("SELECT id FROM carts WHERE user_id = $1", [user.id]);
    const cartId = cartIdResult.rows[0].id;
    await client.query("DELETE FROM cart_items WHERE cart_id = $1", [cartId]);

    await client.query("COMMIT");
    return res.status(201).json({ success: true, orderId });
  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch (rbError) {
      console.error("Rollback error:", rbError);
    }
    console.error("placeOrder error:", error);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    client.release();
  }
}

export async function getOrders(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  try {
    const result = await query(
      `SELECT o.id, o.total_price AS "totalPrice", o.status, o.created_at AS "createdAt",
              oi.id AS "itemId", oi.product_id AS "productId", oi.quantity, oi.price,
              p.title, p.image
       FROM orders o LEFT JOIN order_items oi ON oi.order_id = o.id
       LEFT JOIN products p ON p.id = oi.product_id
       WHERE o.user_id = $1 ORDER BY o.created_at DESC, oi.id ASC`,
      [req.user.id],
    );
    const grouped = new Map<number, any>();
    for (const row of result.rows) {
      if (!grouped.has(row.id)) grouped.set(row.id, { id: row.id, totalPrice: row.totalPrice, status: row.status, createdAt: row.createdAt, items: [] });
      if (row.itemId) grouped.get(row.id).items.push({ id: row.itemId, productId: row.productId, quantity: row.quantity, price: row.price, title: row.title ?? "Unavailable product", image: row.image });
    }
    return res.json([...grouped.values()]);
  } catch (error) {
    console.error("getOrders error:", error);
    return res.status(500).json({ message: "Unable to load orders" });
  }
}
