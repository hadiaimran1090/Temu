import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchOrders, type OrderResponse } from "../services/api";

const amount = (price: string) => Number(price.replace(/[^\d]/g, ""));

export function Orders() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders().then(setOrders).catch((err) => setError(err.response?.data?.message || "Unable to load your orders.")).finally(() => setLoading(false));
  }, []);

  if (loading) return <section className="orders-page"><h1>Your orders</h1><p>Loading your orders…</p></section>;
  if (error) return <section className="orders-page"><h1>Your orders</h1><p>{error}</p></section>;
  if (!orders.length) return <section className="orders-page empty-orders"><h1>Your orders</h1><p>You have not placed any orders yet.</p><Link className="action-button action-button-primary" to="/products">Start shopping</Link></section>;

  return <section className="orders-page">
    <div className="orders-heading"><div><p className="eyebrow">YOUR ACCOUNT</p><h1>Order history</h1><span>Review your recent purchases and delivery status.</span></div><Link to="/products">Continue shopping</Link></div>
    {orders.map((order) => <article className="order-card" key={order.id}>
      <header><div><b>Placed on {new Date(order.createdAt).toLocaleDateString()}</b><span>{order.items.reduce((quantity, item) => quantity + item.quantity, 0)} item(s)</span></div><strong>{order.status}</strong></header>
      <div className="order-products">
        {order.items.map((item) => <div className="order-product" key={item.id}>
          {item.image && <img src={item.image} alt="" />}<span>{item.title}<small>Quantity: {item.quantity}</small></span><b>{item.price} × {item.quantity}</b>
        </div>)}
      </div>
      <footer>Total amount <b>Rs.{order.totalPrice || order.items.reduce((sum, item) => sum + amount(item.price) * item.quantity, 0)}</b></footer>
    </article>)}
  </section>;
}
