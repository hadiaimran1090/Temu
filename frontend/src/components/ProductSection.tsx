import type { Product } from '../../../shared/types/product'
import { Card } from './Card'

type ProductRequestStatus = 'loading' | 'success' | 'error'

interface ProductSectionProps {
  products: Product[]
  status: ProductRequestStatus
}

export function ProductSection({ products, status }: ProductSectionProps) {
  return (
    <section className="section-block" id="products">
      <div className="section-heading"><div><h2>Lightning deals and clearance deals</h2></div></div>
      {status === 'loading' && <p className="api-status api-status-loading">Loading products...</p>}
      {status === 'error' && <p className="api-status api-status-offline">Failed to load products. Please try again.</p>}
      {status === 'success' && products.length === 0 && <p className="api-status">No products found in this category.</p>}
      {status === 'success' && products.length > 0 && (
        <div className="card-grid">
          {products.map((product) => <Card key={product.id} {...product} onAddToCart={(selectedProduct) => window.console.info('Added to cart', selectedProduct.title)} />)}
        </div>
      )}
    </section>
  )
}
