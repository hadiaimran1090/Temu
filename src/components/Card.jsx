import { Button } from './Button'

export function Card({ title, price, oldPrice, sold, badge, palette, image }) {
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
        <Button label="Add to cart" variant="secondary" onClick={() => window.console.log(title)} />
      </div>
    </article>
  )
}