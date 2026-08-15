export type ProductPalette =
  | "sunset"
  | "night"
  | "amber"
  | "mint"
  | "ocean"
  | "graphite";

export interface Product {
  id: number;
  title: string;
  price: string;
  oldPrice: string;
  image: string;
  category: string;
  sold: string;
  badge: string;
  palette: ProductPalette;
}
