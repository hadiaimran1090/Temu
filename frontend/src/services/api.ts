import axios from "axios";
import type { Product } from "../../../shared/types/product";
const api = axios.create({ baseURL: "/api", timeout: 8000 });
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
export default api;
