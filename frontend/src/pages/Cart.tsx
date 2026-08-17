import { useState } from "react";
import { Link } from "react-router-dom";
import { ConfirmModal } from "../components/ConfirmModal";
import { useAppDispatch, useAppSelector } from "../store";
import { removeFromCart } from "../store/slices/cartSlice";
import { useTranslation } from "../hooks/useTranslation";

const price = (value: string) => Number(value.replace(/[^\d]/g, ""));
const formatPrice = (amount: number) => `Rs. ${amount.toLocaleString()}`;

const getCategoryKey = (category: string) => {
  const map: Record<string, string> = {
    "Featured": "cat_Featured",
    "Home & Kitchen": "cat_HomeKitchen",
    "Women's Clothing": "cat_WomensClothing",
    "Women's Shoes": "cat_WomensShoes",
    "Men's Clothing": "cat_MensClothing",
    "Men's Underwear & Sleepwear": "cat_MensUnderwearSleepwear",
    "Sports & Outdoors": "cat_SportsOutdoors",
    "Women's Jewelry": "cat_WomensJewelry",
    "Beauty & Personal Care": "cat_BeautyPersonalCare",
    "Toys & Games": "cat_ToysGames",
    "Accessories": "cat_Accessories",
    "Cases, Holsters & Sleeves": "cat_CasesHolstersSleeves",
    "Office & School Supplies": "cat_OfficeSchoolSupplies",
    "All": "cat_All",
  };
  return (map[category] || "cat_All") as any;
};

export function Cart() {
  const cart = useAppSelector((state) => state.cart.items);
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [selected, setSelected] = useState<number | null>(null);
  const total = cart.reduce(
    (sum, item) => sum + price(item.price) * item.quantity,
    0,
  );

  return (
    <section className="cart-page">
      <div>
        <div className="checkout-banner">
          {t("freeShippingSpecial")} <span>{t("limitedTimeOffer")}</span>
        </div>
        <h1>
          {t("myCart")} ({cart.length})
        </h1>
        {cart.length ? (
          <>
            <div className="cart-select">● {t("selectAll")} ({cart.length})</div>
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt="" />
                <div>
                  <strong>{item.title}</strong>
                  <p>{t(getCategoryKey(item.category))}</p>
                  <b>{formatPrice(price(item.price) * item.quantity)}</b>{" "}
                  <del>{formatPrice(price(item.oldPrice) * item.quantity)}</del>
                  {item.quantity > 1 && (
                    <small className="cart-unit-price">{item.price} each</small>
                  )}
                </div>
                <span className="cart-quantity">
                  {t("qty")} {item.quantity}
                </span>
                <button
                  className="remove-button"
                  onClick={() => setSelected(item.id)}
                >
                  {t("remove")}
                </button>
              </article>
            ))}
          </>
        ) : (
          <p>
            {t("cartEmpty")} <Link to="/products">{t("browseProducts")}</Link>
          </p>
        )}
      </div>
      {cart.length > 0 && (
        <aside className="order-summary">
          <h2>{t("orderSummary")}</h2>
          <div>
            <span>{t("itemTotal")}:</span>
            <b>Rs.{total}</b>
          </div>
          <div>
            <span>{t("itemDiscount")}:</span>
            <b className="discount">-Rs.0</b>
          </div>
          <hr />
          <div className="order-total">
            <span>{t("total")}</span>
            <b>Rs.{total}</b>
          </div>
          <p>{t("paymentFinalAmount")}</p>
          <Link className="checkout-button" to={token ? "/checkout" : "/login"}>
            {token ? `${t("checkoutBtn")} (${cart.length})` : t("signInToCheckout")}
          </Link>
          <p className="green">{t("safePayments")}</p>
        </aside>
      )}
      {selected !== null && (
        <ConfirmModal
          onCancel={() => setSelected(null)}
          onConfirm={() => {
            dispatch(removeFromCart(selected));
            setSelected(null);
          }}
        />
      )}
    </section>
  );
}
