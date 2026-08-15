import type { Product } from "../../../shared/types/product";
import { Card } from "./Card";

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
  return (
    <section className="section-block" id="products">
      <div className="section-heading">
        <div>
          <h2>Lightning deals and clearance deals</h2>
        </div>
      </div>
      {loading && (
        <div className="card-grid">
          {Array.from({ length: 5 }, (_, index) => (
            <div className="skeleton-card" key={index} />
          ))}
        </div>
      )}
      {error && <p className="api-status api-status-offline">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="api-status">No products found in this category.</p>
      )}
      {!loading && !error && products.length > 0 && (
        <div className="card-grid">
          {products.map((product) => (
            <Card key={product.id} {...product} />
          ))}
        </div>
      )}
    </section>
  );
}
