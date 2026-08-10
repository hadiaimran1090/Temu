import type { Product } from '../../../shared/types/product'
import { Button } from './Button'

interface CardProps extends Product {
  onAddToCart?: (product: Product) => void
}

export function Card({ id, title, price, oldPrice, sold, badge, palette, image, category, onAddToCart }: CardProps) {
  return (
    <article className={`product-card product-card-${palette}`}>
      <div className="product-art">
        <img className="product-image" src={image} alt={title} />
        <span>{badge}</span>
      </div>
      <div className="product-body">
        <h3>{title}</h3>
        <div className="product-meta">
          <strong>{price}</strong>
          <span>{oldPrice}</span>
        </div>
        <p className="product-sold">{sold}</p>
        <Button
          label="Add to cart"
          variant="secondary"
          onClick={() => onAddToCart?.({ id, title, price, oldPrice, sold, badge, palette, image, category })}
        />
      </div>
    </article>
  )
}
