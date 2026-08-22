import { useState } from "react";
import { Link } from "react-router-dom";
import { ConfirmModal } from "../components/ConfirmModal";
import { useAppDispatch, useAppSelector } from "../store";
import { removeFromCart, updateCartItemQuantity } from "../store/slices/cartSlice";
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
    <section className="grid grid-cols-[1.15fr_0.85fr] gap-[28px] max-w-[1200px] mx-auto items-start max-[900px]:grid-cols-1">
      <div>
        <div className="p-[10px_14px] rounded-lg bg-red-100 border border-red-200 text-red-800 text-[0.86rem] font-bold flex items-center justify-between">
          {t("freeShippingSpecial")} <span className="text-[#ef4444] text-[0.76rem] uppercase font-bold">{t("limitedTimeOffer")}</span>
        </div>
        <h1 className="m-[0_0_18px] text-[2.15rem] text-[#10233b] font-bold">
          {t("myCart")} ({cart.length})
        </h1>
        {cart.length ? (
          <>
            <div className="p-[12px_14px] bg-[#f8fafc] border border-[#e2e8f0] rounded-lg my-3 text-[0.88rem] font-bold text-[#1e293b]">● {t("selectAll")} ({cart.length})</div>
            {cart.map((item) => (
              <article className="grid grid-cols-[80px_1fr_auto_auto] gap-[18px] p-[18px] border border-[#cfd4dc] rounded-xl mb-3 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.02)] items-start" key={item.id}>
                <img className="w-20 h-20 rounded-lg object-cover" src={item.image} alt="" />
                <div className="flex flex-col gap-1">
                  <strong className="text-[0.94rem] text-[#0f172a] font-bold">{item.title}</strong>
                  <p className="m-0 text-[0.74rem] font-semibold text-[#ff5b2e]">{t(getCategoryKey(item.category))}</p>
                  <b className="text-[1.1rem] text-[#1e293b] font-bold">{formatPrice(price(item.price) * item.quantity)}</b>{" "}
                  <del className="text-[0.82rem] text-[#94a3b8] line-through">{formatPrice(price(item.oldPrice) * item.quantity)}</del>
                  {item.quantity > 1 && (
                    <small className="text-[0.72rem] text-[#64748b] mt-0.5">{item.price} each</small>
                  )}
                </div>
                <select
                  className="text-[0.82rem] font-bold text-[#334155] p-[6px_12px] border border-[#cfd4dc] rounded-md bg-white focus:outline-none cursor-pointer"
                  value={item.quantity}
                  onChange={(e) => {
                    const newQty = Number(e.target.value);
                    dispatch(updateCartItemQuantity({ productId: item.id, quantity: newQty }));
                  }}
                >
                  {[...Array(99).keys()].map((n) => (
                    <option key={n + 1} value={n + 1}>
                      {t("qty")} {n + 1}
                    </option>
                  ))}
                </select>
                <button
                  className="border-0 bg-transparent text-[#b91c1c] text-[0.82rem] font-bold cursor-pointer"
                  onClick={() => setSelected(item.id)}
                >
                  {t("remove")}
                </button>
              </article>
            ))}
          </>
        ) : (
          <p className="text-sm text-[#5b687a]">
            {t("cartEmpty")} <Link className="text-[#4ea5e6] no-underline font-semibold hover:underline" to="/products">{t("browseProducts")}</Link>
          </p>
        )}
      </div>
      {cart.length > 0 && (
        <aside className="p-6 rounded-2xl border border-[rgba(82,143,191,0.15)] bg-white shadow-[0_12px_32px_rgba(15,23,42,0.06)] flex flex-col gap-3.5">
          <h2 className="m-[0_0_4px] text-[1.25rem] text-[#10233b] font-bold">{t("orderSummary")}</h2>
          <div className="flex justify-between text-[0.88rem] text-[#475569]">
            <span>{t("itemTotal")}:</span>
            <b className="text-[#0f172a] font-bold">Rs.{total}</b>
          </div>
          <div className="flex justify-between text-[0.88rem] text-[#475569]">
            <span>{t("itemDiscount")}:</span>
            <b className="text-[#16a34a] font-bold">-Rs.0</b>
          </div>
          <hr className="border-0 border-t border-[#e2e8f0] my-1" />
          <div className="flex justify-between text-[1.15rem] text-[#10233b] font-black">
            <span>{t("total")}</span>
            <b>Rs.{total}</b>
          </div>
          <p className="m-0 text-[0.78rem] text-[#475569]">{t("paymentFinalAmount")}</p>
          <Link className="block w-full border-0 rounded-full p-[13px] text-center no-underline font-bold text-base cursor-pointer text-white bg-gradient-to-br from-[#ff8c1a] to-[#ff5f28] shadow-[0_12px_28px_rgba(255,111,31,0.3)] transition-all duration-180 hover:-translate-y-[1px]" to={token ? "/checkout" : "/login"}>
            {token ? `${t("checkoutBtn")} (${cart.length})` : t("signInToCheckout")}
          </Link>
          <p className="text-[#15803d] font-bold mt-0.5 text-center text-[0.78rem]">{t("safePayments")}</p>
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
