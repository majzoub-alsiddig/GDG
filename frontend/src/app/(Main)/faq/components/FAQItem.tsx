// app/faq/components/FAQItem.tsx
"use client";

import { useId, useState } from "react";
import type { FAQItem as FAQItemType } from "../types";
import { ChevronDownIcon } from "@/components/icons";

type Props = {
  item: FAQItemType;
  defaultOpen?: boolean;
};

export default function FAQItem({ item, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();
  const buttonId = useId();

  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
        open ? "border-gray-300" : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={contentId}
          className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-gray-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-inset sm:px-6"
        >
          <span className="text-base font-semibold leading-snug text-gray-900 sm:text-[17px]">
            {item.question}
          </span>
          <ChevronDownIcon
            className={`h-5 w-5 flex-shrink-0 text-gray-500 transition-transform duration-300 ${
              open ? "rotate-180 text-[#1a73e8]" : ""
            }`}
          />
        </button>
      </h3>

      {/* Grid-rows trick: animates to any content height, no max-h clipping */}
      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-gray-100 px-5 pb-5 pt-4 sm:px-6">
            <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}