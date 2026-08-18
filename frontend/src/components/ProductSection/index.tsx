import type { Product } from "../../types/product";
import { Card } from "../Card";
import { useTranslation } from "../../hooks/useTranslation";

interface ProductSectionProps {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function ProductSection({
  products,
  loading,
  error,
}: ProductSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="mt-[28px]" id="products">
      <div className="flex items-end justify-between gap-[18px] mb-[18px] max-[1100px]:flex-col max-[1100px]:items-start">
        <div>
          <h2 className="m-0 text-[1.6rem] text-[#10233b] font-bold">{t("lightningDeals")}</h2>
        </div>
      </div>
      {loading && (
        <div className="grid gap-4 grid-cols-5 max-[1100px]:grid-cols-3 max-[720px]:grid-cols-2 max-[720px]:gap-3">
          {Array.from({ length: 5 }, (_, index) => (
            <div className="animate-pulse bg-slate-200 aspect-[1/1.35] rounded-[14px]" key={index} />
          ))}
        </div>
      )}
      {error && <p className="api-status api-status-offline">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="api-status">{t("noProducts")}</p>
      )}
      {!loading && !error && products.length > 0 && (
        <div className="grid gap-4 grid-cols-5 max-[1100px]:grid-cols-3 max-[720px]:grid-cols-2 max-[720px]:gap-3">
          {products.map((product) => (
            <Card key={product.id} {...product} />
          ))}
        </div>
      )}
    </section>
  );
}
