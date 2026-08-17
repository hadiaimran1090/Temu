import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch } from "../store";
import { addToCart } from "../store/slices/cartSlice";
import { useTranslation } from "../hooks/useTranslation";
import { useFetch } from "../hooks/useFetch";
import { fetchProduct } from "../services/api";

export function ProductDetail() {
  const { id = "" } = useParams();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);

  const {
    data: product,
    loading,
    error,
  } = useFetch((signal) => fetchProduct(id, signal), [id]);

  if (loading) return <p>{t("loadingProduct")}</p>;
  if (error || !product) return <p>{t("productNotFound")}</p>;

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
          {product.title} – {t("simpleElegant")}
        </p>
        <p>
          {product.sold} | {t("soldByTemu")} <b className="rating">4.8 ★★★★★</b>
        </p>
        <span className="detail-tag">#6 {t("topRated")}</span>
        <h1>
          {product.price} <del>{product.oldPrice}</del>
        </h1>
        <div className="shipping-note">
          ✓ {t("freeShipping")} &nbsp; | &nbsp; ✓ {t("creditDelay")}
        </div>
        <p>
          <b>{t("color")}:</b> 🔥 {product.palette}
        </p>
        <label>
          <b>{t("qty")}</b>{" "}
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
          onClick={() => dispatch(addToCart({ product, quantity }))}
        >
          {t("addToCart")}
        </button>
        <div className="delivery-info">
          <b>🚚 {t("deliveryInfo")}</b>
          <p>{t("deliveryDate")}</p>
          <b>🛡 {t("whyChooseTemu")}</b>
        </div>
        <p>
          <Link to="/products">{t("backToProducts")}</Link>
        </p>
      </div>
    </article>
  );
}
