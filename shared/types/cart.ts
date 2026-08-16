import type { Product } from "./product";

export interface CartItem extends Product {
  quantity: number;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  createdAt: string;
}
