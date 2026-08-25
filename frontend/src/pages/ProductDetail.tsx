import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { addToCart } from "../store/slices/cartSlice";
import { useTranslation } from "../hooks/useTranslation";
import { useFetch } from "../hooks/useFetch";
import { fetchProduct } from "../services/api";

export function ProductDetail() {
  const { id = "" } = useParams();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);

  const {
    data: product,
    loading,
    error,
  } = useFetch((signal) => fetchProduct(id, signal), [id]);

  const isInCart = product ? cartItems.some((item) => item.id === product.id) : false;

  if (loading) return <p>{t("loadingProduct")}</p>;
  if (error || !product) return <p>{t("productNotFound")}</p>;

  return (
    <article className="grid gap-6 items-start bg-white rounded-[20px] shadow-[0_12px_32px_rgba(15,23,42,0.06)] p-5 grid-cols-[80px_minmax(280px,1.2fr)_minmax(310px,1fr)] max-w-[1300px] mx-auto max-[1100px]:grid-cols-[70px_minmax(280px,1.1fr)_minmax(310px,1fr)] max-[1100px]:max-w-[1500px] max-[720px]:m-0 max-[720px]:p-3 max-[720px]:grid-cols-[48px_1fr] max-[720px]:gap-2.5">
      <aside className="grid gap-2.5">
        <img className="w-[80px] h-[80px] rounded-lg object-cover border-2 border-transparent cursor-pointer max-[1100px]:w-[70px] max-[1100px]:h-[70px] max-[720px]:w-[48px] max-[720px]:h-[48px]" src={product.image} alt="" />
        <img className="w-[80px] h-[80px] rounded-lg object-cover border-2 border-transparent cursor-pointer max-[1100px]:w-[70px] max-[1100px]:h-[70px] max-[720px]:w-[48px] max-[720px]:h-[48px]" src={product.image} alt="" />
        <img className="w-[80px] h-[80px] rounded-lg object-cover border-2 border-transparent cursor-pointer max-[1100px]:w-[70px] max-[1100px]:h-[70px] max-[720px]:w-[48px] max-[720px]:h-[48px]" src={product.image} alt="" />
      </aside>
      <img
        className="w-full aspect-square rounded-[14px] object-cover"
        src={product.image}
        alt={product.title}
      />
      <div className="p-[14px_0_20px] flex flex-col gap-4 max-[1100px]:py-2 max-[720px]:col-span-full">
        <p className="text-[1.45rem] font-bold text-[#1e293b] leading-[1.25] m-0">
          {product.title} – {t("simpleElegant")}
        </p>
        <p className="text-sm text-[#5b687a]">
          {product.sold} | {t("soldByTemu")} <b className="float-right text-[#ff5b2e] font-bold max-[720px]:float-none max-[720px]:block max-[720px]:mt-1.5">4.8 ★★★★★</b>
        </p>
        <span className="self-start p-[6px_12px] bg-[#fff3c4] text-[#b45309] rounded-full text-[0.8rem] font-black">#6 {t("topRated")}</span>
        <h1 className="my-2 text-[2.15rem] text-[#10233b] font-bold flex items-baseline gap-2.5">
          {product.price} <del className="text-[1rem] text-[#94a3b8] font-normal no-underline line-through">{product.oldPrice}</del>
        </h1>
        <div className="p-[10px_14px] rounded-lg bg-[#f8fafc] border border-[#e2e8f0] text-[0.86rem] text-[#1e293b] font-semibold inline-flex items-center justify-start">
          ✓ {t("freeShipping")} &nbsp; | &nbsp; ✓ {t("creditDelay")}
        </div>
        <p className="m-0 text-sm text-[#5b687a]">
          <b className="text-[#0f172a] font-bold">{t("color")}:</b> 🔥 {product.palette}
        </p>
        <label className="flex items-center gap-2 text-sm text-[#5b687a]">
          <b className="text-[#0f172a] font-bold">{t("qty")}</b>{" "}
          <select
            className="border border-[#cfd4dc] rounded-md p-1 bg-white text-sm"
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
            disabled={isInCart}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>
        <button
          className={`w-full border-0 rounded-full p-[14px_20px] font-bold text-[1.05rem] transition-all duration-180 ${
            isInCart
              ? "bg-[#e2e8f0] text-[#64748b] cursor-not-allowed shadow-none"
              : "cursor-pointer text-white bg-gradient-to-br from-[#ff8c1a] to-[#ff5f28] shadow-[0_12px_28px_rgba(255,111,31,0.35)] hover:-translate-y-[1px]"
          }`}
          disabled={isInCart}
          onClick={() => !isInCart && dispatch(addToCart({ product, quantity }))}
        >
          {isInCart ? t("alreadyInCart") : t("addToCart")}
        </button>
        <div className="p-[18px] rounded-xl bg-[#fafafa] border border-[#eceef1] flex flex-col gap-2.5 text-[0.86rem]">
          <b className="text-[#0f172a] font-bold">🚚 {t("deliveryInfo")}</b>
          <p className="m-0 text-[#475569]">{t("deliveryDate")}</p>
          <b className="text-[#0f172a] font-bold">🛡 {t("whyChooseTemu")}</b>
        </div>
        <p>
          <Link className="text-[#4ea5e6] no-underline font-semibold hover:underline" to="/products">{t("backToProducts")}</Link>
        </p>
      </div>
    </article>
  );
}
