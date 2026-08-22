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
  }, []);

  if (loading)
    return (
      <section className="max-w-[1000px] mx-auto flex flex-col gap-5">
        <h1 className="m-0 text-[2.15rem] text-[#10233b] font-bold">{t("yourOrders")}</h1>
        <p className="text-[#5b687a]">{t("loadingOrders")}</p>
      </section>
    );

  if (error)
    return (
      <section className="max-w-[1000px] mx-auto flex flex-col gap-5">
        <h1 className="m-0 text-[2.15rem] text-[#10233b] font-bold">{t("yourOrders")}</h1>
        <p className="text-[#b91c1c] font-semibold">{error}</p>
      </section>
    );

  if (!orders.length)
    return (
      <section className="max-w-[1000px] mx-auto flex flex-col gap-5 text-center items-center justify-center py-12">
        <h1 className="m-0 text-[2.15rem] text-[#10233b] font-bold">{t("yourOrders")}</h1>
        <p className="text-[#5b687a]">{t("noOrdersYet")}</p>
        <Link className="inline-block no-underline border-0 rounded-full py-[13px] px-[20px] font-bold cursor-pointer transition-all duration-180 hover:-translate-y-[1px] text-white bg-gradient-to-br from-[#ff8c1a] to-[#ff5f28] shadow-[0_12px_28_rgba(255,111,31,0.3)] text-center" to="/products">
          {t("startShopping")}
        </Link>
      </section>
    );

  return (
    <section className="max-w-[1000px] mx-auto flex flex-col gap-5">
      <div className="flex justify-between items-end border-b-2 border-[#f1f5f9] pb-[18px] mb-2.5 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-3.5">
        <div>
          <p className="m-0 mb-2 text-[#ff7a00] font-extrabold uppercase tracking-[0.12em] text-[0.82rem]">{t("yourAccount")}</p>
          <h1 className="m-0 text-[2.15rem] text-[#10233b] font-bold">{t("orderHistory")}</h1>
          <span className="text-sm text-[#5b687a]">{t("orderHistorySub")}</span>
        </div>
        <Link className="font-bold text-[#4ea5e6] no-underline hover:underline" to="/products">{t("continueShopping")}</Link>
      </div>
      {orders.map((order) => (
        <article className="rounded-2xl border border-[rgba(82,143,191,0.15)] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] overflow-hidden" key={order.id}>
          <header className="p-[14px_20px] bg-[#f8fafc] border-b border-[#e2e8f0] flex justify-between items-center max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-2.5">
            <div>
              <b className="text-[#0f172a] text-[0.88rem] font-bold">
                {t("placedOn")} {new Date(order.createdAt).toLocaleDateString()}
              </b>
              <span className="text-[0.82rem] text-[#64748b] ml-2.5 rtl:ml-0 rtl:mr-2.5">
                {order.items.reduce((quantity, item) => quantity + item.quantity, 0)} {t("itemsCount")}
              </span>
            </div>
            <strong className="text-[#16a34a] text-[0.88rem] font-bold uppercase tracking-wider">{order.status}</strong>
          </header>
          <div className="p-[10px_20px] flex flex-col">
            {order.items.map((item) => (
              <div className="grid grid-cols-[48px_1fr_auto] gap-4 items-center py-3 border-b border-[#f1f5f9] last:border-b-0" key={item.id}>
                {item.image && <img className="w-12 h-12 rounded-lg object-cover" src={item.image} alt="" />}
                <span className="text-[0.88rem] text-[#1e293b] font-bold flex flex-col gap-0.5">
                  {item.title}
                  <small className="text-[0.74rem] font-semibold text-[#64748b]">
                    {t("quantityLabel")}: {item.quantity}
                  </small>
                </span>
                <b className="text-[0.94rem] text-[#334155] font-bold">
                  {item.price} × {item.quantity}
                </b>
              </div>
            ))}
          </div>
          <footer className="p-[14px_20px] border-t border-[#e2e8f0] text-right font-medium text-[0.94rem] text-[#475569] rtl:text-left">
            {t("totalAmount")}{" "}
            <b className="text-[1.15rem] text-[#0f172a] font-extrabold ml-1.5 rtl:ml-0 rtl:mr-1.5">
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
