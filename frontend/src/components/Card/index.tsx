import type { Product } from "../../types/product";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { addToCart } from "../../store/slices/cartSlice";
import { useTranslation } from "../../hooks/useTranslation";
import { Button } from "../Button";

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

export function Card(product: Product) {
  const { id, title, price, oldPrice, sold, badge, palette, image, category } = product;
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const { t } = useTranslation();

  const isInCart = cartItems.some((item) => item.id === id);

  return (
    <article className={`group flex flex-col min-w-0 rounded-[14px] border border-[#eceef1] bg-white overflow-hidden shadow-[0_8px_22px_rgba(15,23,42,0.07)] transition-all duration-180 hover:-translate-y-[5px] hover:border-[#ff5b2e]/35 hover:shadow-[0_18px_32px_rgba(15,23,42,0.14)] product-card-${palette}`}>
      <Link className="aspect-square min-h-0 relative overflow-hidden flex items-center justify-center bg-[#f6f6f6]" to={`/products/${id}`}>
        <img className="w-full h-full object-cover block transition-transform duration-260 group-hover:scale-[1.045]" src={image} alt={title} />
        {badge && <span className="absolute top-[10px] left-[10px] z-10 py-[6px] px-[10px] rounded-[5px] bg-[#ff5b2e] text-white text-[0.78rem] font-bold">{badge}</span>}
      </Link>
      <div className="flex flex-1 flex-col p-[13px_12px_14px]">
        <h3 className="line-clamp-2 mb-[6px] overflow-hidden text-[0.96rem] leading-[1.35] min-h-[2.7em] text-[#10233b] font-semibold">{title}</h3>
        <p className="m-0 mb-[8px] text-[#ff5b2e] text-[0.74rem] font-bold">{t(getCategoryKey(category))}</p>
        <div className="flex items-center gap-[10px] mt-[8px]">
          <strong className="text-[#151515] text-[1.3rem] leading-none font-bold">{price}</strong>
          <span className="line-through text-[#5b687a] text-[0.78rem]">{oldPrice}</span>
        </div>
        <div className="flex items-center justify-between gap-[8px] mt-auto">
          <p className="m-0 text-[#5b687a] text-[0.78rem]">{sold}</p>
          <Button
            label={isInCart ? t("alreadyInCart") : t("addToCart")}
            variant="secondary"
            disabled={isInCart}
            onClick={() => !isInCart && dispatch(addToCart({ product, quantity: 1 }))}
          />
        </div>
      </div>
    </article>
  );
}
