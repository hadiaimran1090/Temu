import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useFetch } from "../hooks/useFetch";
import { fetchProduct } from "../services/api";
export function ProductDetail() {
  const { id = "" } = useParams();
  const { addToCart } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const {
    data: product,
    loading,
    error,
  } = useFetch((signal) => fetchProduct(id, signal), [id]);
  if (loading) return <p>Loading product...</p>;
  if (error || !product) return <p>Product not found.</p>;
  return (
    <article className="detail">
      <aside className="detail-thumbs">
        <img src={product.image} alt="" />
        <img src={product.image} alt="" />
        <img src={product.image} alt="" />
      </aside>
      <img
        className="detail-main-image"
        src={product.image}
        alt={product.title}
      />
      <div className="detail-info">
        <p className="detail-title">
          {product.title} – Simple, elegant, perfect for everyday wear
        </p>
        <p>
          {product.sold} | Sold by Temu <b className="rating">4.8 ★★★★★</b>
        </p>
        <span className="detail-tag">#6 Top Rated</span>
        <h1>
          {product.price} <del>{product.oldPrice}</del>
        </h1>
        <div className="shipping-note">
          ✓ Free shipping &nbsp; | &nbsp; ✓ Rs.280 credit for delay
        </div>
        <p>
          <b>Color:</b> 🔥 {product.palette}
        </p>
        <label>
          <b>Qty</b>{" "}
          <select
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </label>
        <button
          className="detail-cart-button"
          onClick={() => addToCart(product, quantity)}
        >
          Add to cart
        </button>
        <div className="delivery-info">
          <b>🚚 Free shipping on all orders ›</b>
          <p>Delivery: Aug 23–Sep 4</p>
          <b>🛡 Why choose Temu? ›</b>
        </div>
        <p>
          <Link to="/products">← Back to products</Link>
        </p>
      </div>
    </article>
  );
}
