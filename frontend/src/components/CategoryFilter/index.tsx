import { useRef } from "react";
import { useTranslation } from "../../hooks/useTranslation";

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
    <section className="pt-[18px]" aria-label="Product categories">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-3 items-center mt-5">
        <button
          type="button"
          className="w-[42px] h-[42px] border-0 rounded-full bg-white text-[#2f3640] shadow-[0_8px_18px_rgba(15,23,42,0.12)] cursor-pointer text-[1.6rem] leading-none"
          aria-label="Scroll categories left"
          onClick={() => scroll(-1)}
        >
          ‹
        </button>
        <div className="flex gap-4 overflow-x-auto p-[8px_2px_18px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" ref={scrollerRef}>
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                className={`border border-[#cfd4dc] rounded-full p-[14px_20px] shadow-[0_8px_18px_rgba(15,23,42,0.05)] cursor-pointer shrink-0 font-bold transition-all duration-160 hover:text-white hover:bg-[#ff5b2e] hover:border-[#ff5b2e] hover:-translate-y-[2px] max-[720px]:min-w-[135px] max-[720px]:min-h-[60px] max-[720px]:p-2 ${
                  isActive
                    ? "text-white bg-[#ff5b2e] border-[#ff5b2e] -translate-y-[2px]"
                    : "bg-white text-[#2f3640]"
                }`}
                aria-pressed={isActive}
                onClick={() => onSelectCategory(category)}
              >
                {t(getCategoryKey(category))}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          className="w-[42px] h-[42px] border-0 rounded-full bg-white text-[#2f3640] shadow-[0_8px_18px_rgba(15,23,42,0.12)] cursor-pointer text-[1.6rem] leading-none"
          aria-label="Scroll categories right"
          onClick={() => scroll(1)}
        >
          ›
        </button>
      </div>
    </section>
  );
}
