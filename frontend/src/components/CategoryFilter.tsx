import { useRef } from "react";

interface CategoryFilterProps {
  categories: readonly string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

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
              {category}
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
