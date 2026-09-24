"use client";

import type { EventItem } from "../types";
import EventCard from "./EventCard";
import SectionHeader from "./SectionHeader";
import EmptyState from "./EmptyState";
import { CalendarIcon } from "@/components/icons";
import { useTranslations } from "@/i18n";

export default function UpcomingEvents({ events }: { events: EventItem[] }) {
  const { t } = useTranslations();

  return (
    <section className="bg-gray-50/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <SectionHeader
          eyebrow={t("home.upcomingEvents.eyebrow")}
          title={t("home.upcomingEvents.title")}
          description={t("home.upcomingEvents.description")}
          action={{
            label: t("home.upcomingEvents.action"),
            href: "/events",
          }}
        />

        <div className="mt-10 sm:mt-12">
          {events.length === 0 ? (
            <EmptyState
              icon={<CalendarIcon className="h-6 w-6 text-[#1a73e8]" />}
              title={t("home.upcomingEvents.emptyTitle")}
              message={t("home.upcomingEvents.emptyMessage")}
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
