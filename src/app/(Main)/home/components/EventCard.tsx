"use client";

import type { EventItem } from "../types";
import { CalendarIcon, PinIcon } from "@/components/icons";
import { useTranslations, LOCALE_TAGS } from "@/i18n";

export default function EventCard({ event }: { event: EventItem }) {
  const { t, locale } = useTranslations();

  const formattedDate = new Date(event.date).toLocaleDateString(
    LOCALE_TAGS[locale],
    { day: "numeric", month: "short", year: "numeric" }
  );

  return (
    <a
      href={event.link}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        <img
          src={event.cover}
          alt={t("home.upcomingEvents.cardCoverAlt", { title: event.title })}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        />
        <span className="absolute start-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-800 shadow-sm backdrop-blur-sm">
          {event.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-[#1a73e8] sm:text-[17px]">
          {event.title}
        </h3>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-gray-500">
          <span className="inline-flex items-center gap-1.5">
            <CalendarIcon className="h-3.5 w-3.5" />
            {formattedDate}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <PinIcon className="h-3.5 w-3.5" />
            {event.location}
          </span>
        </div>
      </div>
    </a>
  );
}
