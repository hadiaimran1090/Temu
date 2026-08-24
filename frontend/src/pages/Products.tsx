import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CategoryFilter } from "../components/CategoryFilter";
import { ProductSection } from "../components/ProductSection";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import { fetchProducts } from "../services/api";
import { useTranslation } from "../hooks/useTranslation";

export const categories = [
  "All",
  "Featured",
  "Home & Kitchen",
  "Women's Clothing",
  "Women's Shoes",
  "Men's Clothing",
  "Sports & Outdoors",
  "Beauty & Personal Care",
  "Toys & Games",
  "Accessories",
  "Cases, Holsters & Sleeves",
  "Office & School Supplies",
];

export function Products() {
  const [params] = useSearchParams();
  const requestedCategory = params.get("category") ?? "All";
  const [category, setCategory] = useState(requestedCategory);
  // Search is plain text. React renders it safely in the input, while the URL
  // layer handles its own encoding/decoding.
  const search = params.get("search") ?? "";
  const { t } = useTranslation();

  useEffect(() => setCategory(requestedCategory), [requestedCategory]);
  const debounced = useDebounce(search);
  const apiCategory = category === "Featured" ? "All" : category;

  const filters: { category?: string; search?: string } = {
    category: apiCategory,
  };
  if (debounced) {
    filters.search = debounced;
  }

  const { data, loading, error } = useFetch(
    (signal) =>
      fetchProducts(filters, signal),
    [apiCategory, debounced],
  );

  return (
    <>
      <div className="grid grid-cols-2 bg-[#14910a] text-white rounded-none overflow-hidden min-h-[68px] max-[1100px]:grid-cols-1 max-[720px]:min-h-[48px]">
        <div className="flex items-center justify-center gap-2.5 font-extrabold border-r border-white/20 max-[1100px]:justify-center max-[1100px]:p-[8px_12px] max-[1100px]:border-r-0 max-[1100px]:border-b max-[1100px]:border-white/15 max-[720px]:text-[0.75rem]">{t("taxStripBadge")}</div>
        <div className="flex items-center justify-center gap-2.5 font-extrabold max-[1100px]:justify-center max-[1100px]:p-[8px_12px] max-[720px]:text-[0.75rem]">{t("taxStripCopy")}</div>
      </div>
      <div className="text-center mt-20 mb-[18px] max-[720px]:mt-9">
        <span className="text-[#ff6538] font-black text-[1.25rem] block">{t("summerSale")}</span>
        <h1 className="m-0 text-[clamp(1.4rem,2vw,2rem)] text-[#050505] font-bold">{t("exploreInterests")}</h1>
      </div>
      <CategoryFilter
        categories={categories}
        selectedCategory={category}
        onSelectCategory={setCategory}
      />
      <ProductSection products={data ?? []} loading={loading} error={error} />
    </>
  );
}
