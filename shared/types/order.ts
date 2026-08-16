import type { Product } from "./product";

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  product?: Product;
  quantity: number;
  price: string;
}

export interface Order {
  id: number;
  userId: number | null;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  totalPrice: number;
  createdAt: string;
  items?: OrderItem[];
}
