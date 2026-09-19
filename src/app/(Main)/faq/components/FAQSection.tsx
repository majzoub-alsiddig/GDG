// app/faq/components/FAQSection.tsx
"use client";

import { useMemo, useState } from "react";
import type { FAQCategory } from "../types";
import { faqData } from "../data/faq";
import FAQItem from "./FAQItem";

const ALL = "All" as const;

const CATEGORY_ORDER: FAQCategory[] = [
  "About GDG",
  "Joining",
  "Events & Activities",
  "Community",
];

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<typeof ALL | FAQCategory>(ALL);

  const categories = useMemo(() => {
    const unique = new Set(faqData.map((item) => item.category));
    if (unique.size <= 1) return [];
    return [ALL, ...CATEGORY_ORDER.filter((c) => unique.has(c))];
  }, []);

  const visibleItems = useMemo(
    () =>
      activeCategory === ALL
        ? faqData
        : faqData.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  // Group visible items by category, preserving category order
  const grouped = useMemo(() => {
    const map = new Map<FAQCategory, typeof faqData>();
    for (const item of visibleItems) {
      const list = map.get(item.category) ?? [];
      list.push(item);
      map.set(item.category, list);
    }
    return CATEGORY_ORDER.filter((c) => map.has(c)).map((category) => ({
      category,
      items: map.get(category)!,
    }));
  }, [visibleItems]);

  const showCategoryHeadings = grouped.length > 1;

  return (
    <section
      id="faq"
      className="scroll-mt-24 px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8 lg:pb-24 lg:pt-16"
    >
      <div className="mx-auto max-w-3xl">
        {/* Section header */}
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1a73e8]">
            Help Center
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Answers to common questions
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base">
            Short, direct answers to the things people ask us most often.
          </p>
        </div>

        {/* Category filter  -  hidden when only one category */}
        {categories.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2 ${
                    isActive
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        )}

        {/* Grouped list */}
        <div className="mt-10 flex flex-col gap-10 sm:mt-12 sm:gap-12">
          {grouped.map(({ category, items }) => (
            <div key={category}>
              {showCategoryHeadings && (
                <div className="mb-4 flex items-center gap-4 sm:mb-5">
                  <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-gray-500">
                    {category}
                  </h3>
                  <span aria-hidden="true" className="h-px flex-1 bg-gray-100" />
                </div>
              )}

              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <FAQItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}