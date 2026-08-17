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
  "Men's Underwear & Sleepwear",
  "Sports & Outdoors",
  "Women's Jewelry",
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
  const search = params.get("search") ?? "";
  const { t } = useTranslation();

  useEffect(() => setCategory(requestedCategory), [requestedCategory]);
  const debounced = useDebounce(search);
  const apiCategory = category === "Featured" ? "All" : category;

  const { data, loading, error } = useFetch(
    (signal) =>
      fetchProducts({ category: apiCategory, search: debounced }, signal),
    [apiCategory, debounced],
  );

  return (
    <section>
      <div className="tax-strip">
        <div className="tax-badge">{t("taxStripBadge")}</div>
        <div className="tax-copy">{t("taxStripCopy")}</div>
      </div>
      <div className="interest-heading">
        <span>{t("summerSale")}</span>
        <h1>{t("exploreInterests")}</h1>
      </div>
      <CategoryFilter
        categories={categories}
        selectedCategory={category}
        onSelectCategory={setCategory}
      />
      <ProductSection products={data ?? []} loading={loading} error={error} />
    </section>
  );
}
