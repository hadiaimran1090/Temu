import type { Product } from "../../../shared/types/product";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { Button } from "./Button";

export function Card({
  id,
  title,
  price,
  oldPrice,
  sold,
  badge,
  palette,
  image,
  category,
}: Product) {
  const { addToCart } = useAppContext();
  return (
    <article className={`product-card product-card-${palette}`}>
      <Link className="product-art" to={`/products/${id}`}>
        <img className="product-image" src={image} alt={title} />
        <span>{badge}</span>
      </Link>
      <div className="product-body">
        <h3>{title}</h3>
        <p className="product-category">{category}</p>
        <div className="product-meta">
          <strong>{price}</strong>
          <span>{oldPrice}</span>
        </div>
        <div className="product-card-footer">
          <p className="product-sold">{sold}</p>
          <Button
            label="Add to cart"
            variant="secondary"
            onClick={() =>
              addToCart({
                id,
                title,
                price,
                oldPrice,
                sold,
                badge,
                palette,
                image,
                category,
              })
            }
          />
        </div>
      </div>
    </article>
  );
}
