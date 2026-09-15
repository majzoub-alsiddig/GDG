// app/home/components/UpcomingEvents.tsx
import type { EventItem } from "../types";
import EventCard from "./EventCard";
import SectionHeader from "./SectionHeader";
import EmptyState from "./EmptyState";
import { CalendarIcon } from "./icons";

export default function UpcomingEvents({ events }: { events: EventItem[] }) {
  return (
    <section className="bg-gray-50/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <SectionHeader
          eyebrow="What's happening"
          title="Upcoming events"
          description="Join our upcoming workshops, talks, and community activities."
          action={{ label: "View all events", href: "/events" }}
        />

        <div className="mt-10 sm:mt-12">
          {events.length === 0 ? (
            <EmptyState
              icon={<CalendarIcon className="h-6 w-6 text-[#1a73e8]" />}
              title="No upcoming events yet"
              message="Follow us to stay updated when the next event is announced."
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