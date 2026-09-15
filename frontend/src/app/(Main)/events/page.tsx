import EventCard from "../home/components/EventCard";
import { featuredEvents } from "../home/data/content";

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#1a73e8]">
            Community events
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Explore what's happening at GDG UofK
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            From workshops and talks to study jams and collaborations, we build learning experiences for students and developers.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </main>
  );
}
