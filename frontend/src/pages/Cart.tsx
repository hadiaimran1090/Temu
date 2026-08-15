import { useState } from "react";
import { Link } from "react-router-dom";
import { ConfirmModal } from "../components/ConfirmModal";
import { useAppContext } from "../contexts/AppContext";
const price = (value: string) => Number(value.replace(/[^\d]/g, ""));
const formatPrice = (amount: number) => `Rs. ${amount.toLocaleString()}`;
export function Cart() {
  const { cart, removeFromCart, token } = useAppContext();
  const [selected, setSelected] = useState<number | null>(null);
  const total = cart.reduce(
    (sum, item) => sum + price(item.price) * item.quantity,
    0,
  );
  return (
    <section className="cart-page">
      <div>
        <div className="checkout-banner">
          ✓ Free shipping special for you <span>Limited-time offer</span>
        </div>
        <h1>Your cart ({cart.length})</h1>
        {cart.length ? (
          <>
            <div className="cart-select">● Select all ({cart.length})</div>
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt="" />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.category}</p>
                  <b>{formatPrice(price(item.price) * item.quantity)}</b>{" "}
                  <del>{formatPrice(price(item.oldPrice) * item.quantity)}</del>
                  {item.quantity > 1 && (
                    <small className="cart-unit-price">{item.price} each</small>
                  )}
                </div>
                <span className="cart-quantity">Qty {item.quantity}</span>
                <button
                  className="remove-button"
                  onClick={() => setSelected(item.id)}
                >
                  Remove
                </button>
              </article>
            ))}
          </>
        ) : (
          <p>
            Your cart is empty. <Link to="/products">Browse products</Link>
          </p>
        )}
      </div>
      {cart.length > 0 && (
        <aside className="order-summary">
          <h2>Order Summary</h2>
          <div>
            <span>Item total:</span>
            <b>Rs.{total}</b>
          </div>
          <div>
            <span>Item discount:</span>
            <b className="discount">-Rs.0</b>
          </div>
          <hr />
          <div className="order-total">
            <span>Total</span>
            <b>Rs.{total}</b>
          </div>
          <p>Please refer to your final actual payment amount.</p>
          <Link className="checkout-button" to={token ? "/checkout" : "/login"}>
            {token ? `Checkout (${cart.length})` : "Sign in to checkout"}
          </Link>
          <p className="green">🔒 Safe Payment Options</p>
        </aside>
      )}
      {selected !== null && (
        <ConfirmModal
          onCancel={() => setSelected(null)}
          onConfirm={() => {
            removeFromCart(selected);
            setSelected(null);
          }}
        />
      )}
    </section>
  );
}
