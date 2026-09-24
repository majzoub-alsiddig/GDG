// src/app/(Main)/events/components/EventsListContent.tsx
"use client";

import EventCard from "../../home/components/EventCard";
import type { EventItem } from "../../home/types";
import { useTranslations } from "@/i18n";

export default function EventsListContent({
  events,
}: {
  events: EventItem[];
}) {
  const { t } = useTranslations();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#1a73e8]">
          {t("events.list.eyebrow")}
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {t("events.list.title")}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600">
          {t("events.list.description")}
        </p>
      </div>

      {events.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-dashed border-gray-200 bg-gray-50/60 px-6 py-16 text-center">
          <h3 className="text-lg font-bold text-gray-900">
            {t("events.list.emptyTitle")}
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {t("events.list.emptyMessage")}
          </p>
        </div>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
