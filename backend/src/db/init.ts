import { query } from "../db";
import { products } from "../data/products";

export async function initDb() {
  console.log("Initializing database tables...");

  // 1. Create users table
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Create products table
  await query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      price VARCHAR(50) NOT NULL,
      old_price VARCHAR(50) NOT NULL,
      image VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      sold VARCHAR(50) NOT NULL,
      badge VARCHAR(50) NOT NULL,
      palette VARCHAR(50) NOT NULL
    );
  `);

  // 3. Create carts table
  await query(`
    CREATE TABLE IF NOT EXISTS carts (
      id SERIAL PRIMARY KEY,
      user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 4. Create cart_items table
  await query(`
    CREATE TABLE IF NOT EXISTS cart_items (
      id SERIAL PRIMARY KEY,
      cart_id INTEGER REFERENCES carts(id) ON DELETE CASCADE,
      product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
      quantity INTEGER NOT NULL DEFAULT 1,
      UNIQUE(cart_id, product_id)
    );
  `);

  // 5. Create orders table (includes status column)
  await query(`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      address TEXT NOT NULL,
      city VARCHAR(255) NOT NULL,
      postal_code VARCHAR(50) NOT NULL,
      total_price INTEGER NOT NULL,
      status VARCHAR(50) DEFAULT 'Processing',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Migrate existing orders table: add status column
  await query(`
    ALTER TABLE orders ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'Processing';
  `).catch(() => { /* column already exists */ });

  // 6. Create order_items table
  await query(`
    CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
      product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
      quantity INTEGER NOT NULL,
      price VARCHAR(50) NOT NULL
    );
  `);

  console.log("Database tables created successfully.");

  // Check if products exist, otherwise seed
  const result = await query("SELECT COUNT(*) FROM products");
  const count = parseInt(result.rows[0].count, 10);

  if (count === 0) {
    console.log("Seeding products...");
    for (const product of products) {
      await query(
        `INSERT INTO products (id, title, price, old_price, image, category, sold, badge, palette)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          product.id,
          product.title,
          product.price,
          product.oldPrice,
          product.image,
          product.category,
          product.sold,
          product.badge,
          product.palette,
        ]
      );
    }
    // Update the sequence for auto-increment IDs
    await query("SELECT setval('products_id_seq', (SELECT MAX(id) FROM products))");
    console.log(`Successfully seeded ${products.length} products.`);
  } else {
    console.log("Products table already seeded.");
  }
}

let isInitialized = false;
let initPromise: Promise<void> | null = null;

export async function ensureDbInitialized() {
  if (isInitialized) return;
  if (!initPromise) {
    initPromise = initDb().then(() => {
      isInitialized = true;
    }).catch(err => {
      initPromise = null;
      console.error("Failed to initialize database:", err);
      throw err;
    });
  }
  return initPromise;
}

