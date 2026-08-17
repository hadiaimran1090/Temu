import { useRef } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import "./CategoryFilter.css";

interface CategoryFilterProps {
  categories: readonly string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

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

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();

  const scroll = (direction: number) => {
    scrollerRef.current?.scrollBy({
      left: direction * 280,
      behavior: "smooth",
    });
  };

  return (
    <section className="interest-section" aria-label="Product categories">
      <div className="interest-carousel">
        <button
          type="button"
          className="interest-arrow"
          aria-label="Scroll categories left"
          onClick={() => scroll(-1)}
        >
          ‹
        </button>
        <div className="interest-chips" ref={scrollerRef}>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className="interest-chip"
              aria-pressed={selectedCategory === category}
              onClick={() => onSelectCategory(category)}
            >
              {t(getCategoryKey(category))}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="interest-arrow"
          aria-label="Scroll categories right"
          onClick={() => scroll(1)}
        >
          ›
        </button>
      </div>
    </section>
  );
}
