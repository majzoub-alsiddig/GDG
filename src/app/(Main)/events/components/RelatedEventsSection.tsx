// src/app/(Main)/events/components/RelatedEventsSection.tsx
"use client";

import EventCard from "../../home/components/EventCard";
import type { EventItem } from "../../home/types";
import { useTranslations } from "@/i18n";

export default function RelatedEventsSection({
  related,
  categoryName,
}: {
  related: EventItem[];
  categoryName: string;
}) {
  const { t } = useTranslations();

  if (related.length === 0) return null;

  return (
    <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-4">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
          {t("events.detail.relatedTitle", { category: categoryName })}
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-gray-100" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {related.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </section>
  );
}
