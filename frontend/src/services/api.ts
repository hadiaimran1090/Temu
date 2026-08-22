import axios from "axios";
import type { Product } from "../types/product";
import type { CartItem } from "../types/cart";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "/api", timeout: 8000 });

api.interceptors.request.use((config) => {
  const tokenVal = localStorage.getItem("temu-token");
  if (tokenVal) {
    try {
      const parsedToken = JSON.parse(tokenVal);
      config.headers.Authorization = `Bearer ${parsedToken}`;
    } catch {
      config.headers.Authorization = `Bearer ${tokenVal}`;
    }
  }
  return config;
});

export async function fetchProducts(
  filters: { category?: string; search?: string } = {},
  signal?: AbortSignal,
) {
  const { data } = await api.get<Product[]>("/products", {
    params: filters,
    signal,
  });
  return data;
}

export async function fetchProduct(id: string, signal?: AbortSignal) {
  const { data } = await api.get<Product>(`/products/${id}`, { signal });
  return data;
}

export async function loginUser(credentials: any) {
  const { data } = await api.post<{ token: string; email: string }>("/auth/login", credentials);
  return data;
}

export async function registerUser(credentials: any) {
  const { data } = await api.post<{ token: string; email: string }>("/auth/register", credentials);
  return data;
}

export async function fetchCart() {
  const { data } = await api.get<CartItem[]>("/cart");
  return data;
}

export async function addToCartApi(productId: number, quantity = 1) {
  const { data } = await api.post<CartItem[]>("/cart/items", { productId, quantity });
  return data;
}

export async function removeFromCartApi(productId: number) {
  const { data } = await api.delete<CartItem[]>(`/cart/items/${productId}`);
  return data;
}

export async function updateCartItemApi(productId: number, quantity: number) {
  const { data } = await api.put<CartItem[]>("/cart/items", { productId, quantity });
  return data;
}

export async function clearCartApi() {
  const { data } = await api.delete<CartItem[]>("/cart");
  return data;
}

export async function mergeCartApi(items: { productId: number; quantity: number }[]) {
  const { data } = await api.post<CartItem[]>("/cart/merge", { items });
  return data;
}

export async function placeOrderApi(orderDetails: any) {
  const { data } = await api.post<{ success: boolean; orderId: number }>("/orders", orderDetails);
  return data;
}

export interface OrderResponse {
  id: number;
  totalPrice: number;
  status: string;
  createdAt: string;
  items: { id: number; productId: number; quantity: number; price: string; title: string; image?: string }[];
}

export async function fetchOrders() {
  const { data } = await api.get<OrderResponse[]>("/orders");
  return data;
}

export default api;
