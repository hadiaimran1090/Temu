import type { Product } from "../../../../shared/types/product";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { addToCart } from "../../store/slices/cartSlice";
import { useTranslation } from "../../hooks/useTranslation";
import { Button } from "../Button";
import "./Card.css";

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
  const { t } = useTranslation();

  return (
    <article className={`product-card product-card-${palette}`}>
      <Link className="product-art" to={`/products/${id}`}>
        <img className="product-image" src={image} alt={title} />
        {badge && <span>{badge}</span>}
      </Link>
      <div className="product-body">
        <h3>{title}</h3>
        <p className="product-category">{t(getCategoryKey(category))}</p>
        <div className="product-meta">
          <strong>{price}</strong>
          <span>{oldPrice}</span>
        </div>
        <div className="product-card-footer">
          <p className="product-sold">{sold}</p>
          <Button
            label={t("addToCart")}
            variant="secondary"
            onClick={() => dispatch(addToCart({ product, quantity: 1 }))}
          />
        </div>
      </div>
    </article>
  );
}
