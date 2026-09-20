import EventCard from "../home/components/EventCard";
import { prisma } from "@/lib/prisma";
import type { EventItem } from "../home/types";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const dbEvents = await prisma.event.findMany({
    where: { published: true },
    orderBy: { date: "asc" },
  });

  const events: EventItem[] = dbEvents.map((e) => ({
    id: e.slug,
    title: e.title,
    category: e.category as EventItem["category"],
    cover: e.cover,
    date: e.date.toISOString().split("T")[0],
    location: e.location,
    link: e.link,
  }));

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#1a73e8]">
            Community events
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Explore what&apos;s happening at GDG UofK
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            From workshops and talks to study jams and collaborations, we build learning experiences for students and developers.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </main>
  );
}
