import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchOrders, type OrderResponse } from "../services/api";
import { useTranslation } from "../hooks/useTranslation";

const amount = (price: string) => Number(price.replace(/[^\d]/g, ""));

export function Orders() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .catch((err) => setError(err.response?.data?.message || t("loadingOrders")))
      .finally(() => setLoading(false));
  }, [t]);

  if (loading)
    return (
      <section className="orders-page">
        <h1>{t("yourOrders")}</h1>
        <p>{t("loadingOrders")}</p>
      </section>
    );

  if (error)
    return (
      <section className="orders-page">
        <h1>{t("yourOrders")}</h1>
        <p>{error}</p>
      </section>
    );

  if (!orders.length)
    return (
      <section className="orders-page empty-orders">
        <h1>{t("yourOrders")}</h1>
        <p>{t("noOrdersYet")}</p>
        <Link className="action-button action-button-primary" to="/products">
          {t("startShopping")}
        </Link>
      </section>
    );

  return (
    <section className="orders-page">
      <div className="orders-heading">
        <div>
          <p className="eyebrow">{t("yourAccount")}</p>
          <h1>{t("orderHistory")}</h1>
          <span>{t("orderHistorySub")}</span>
        </div>
        <Link to="/products">{t("continueShopping")}</Link>
      </div>
      {orders.map((order) => (
        <article className="order-card" key={order.id}>
          <header>
            <div>
              <b>
                {t("placedOn")} {new Date(order.createdAt).toLocaleDateString()}
              </b>
              <span>
                {order.items.reduce((quantity, item) => quantity + item.quantity, 0)} {t("itemsCount")}
              </span>
            </div>
            <strong>{order.status}</strong>
          </header>
          <div className="order-products">
            {order.items.map((item) => (
              <div className="order-product" key={item.id}>
                {item.image && <img src={item.image} alt="" />}
                <span>
                  {item.title}
                  <small>
                    {t("quantityLabel")}: {item.quantity}
                  </small>
                </span>
                <b>
                  {item.price} × {item.quantity}
                </b>
              </div>
            ))}
          </div>
          <footer>
            {t("totalAmount")}{" "}
            <b>
              Rs.
              {order.totalPrice ||
                order.items.reduce((sum, item) => sum + amount(item.price) * item.quantity, 0)}
            </b>
          </footer>
        </article>
      ))}
    </section>
  );
}
