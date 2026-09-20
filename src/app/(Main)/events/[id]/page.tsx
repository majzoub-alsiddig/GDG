import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  ClockIcon,
  PinIcon,
} from "@/components/icons";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

async function getEventBySlug(slug: string) {
  const e = await prisma.event.findUnique({ where: { slug } });
  if (!e || !e.published) return null;
  return e;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = await getEventBySlug(id);
  if (!event) return {};
  return {
    title: `${event.title} - GDG UofK`,
    description: event.description ?? undefined,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventBySlug(id);

  if (!event) {
    notFound();
  }

  // Related events: same category, future, excluding this one
  const related = await prisma.event.findMany({
    where: {
      published: true,
      category: event.category,
      NOT: { slug: event.slug },
      date: { gte: new Date() },
    },
    orderBy: { date: "asc" },
    take: 3,
  });

  const dateIso = event.date.toISOString();
  const endIso = event.endDate?.toISOString() ?? null;

  // If `link` starts with http, treat it as an external registration URL.
  // Otherwise fall back to the /team page for "join the community".
  const isExternalLink = /^https?:\/\//i.test(event.link);

  return (
    <main className="bg-white pb-20">
      {/* BREADCRUMB */}
      <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 lg:px-8">
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          All events
        </Link>
      </div>

      {/* HEADER */}
      <header className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#1a73e8]">
            {event.category}
          </span>
          {event.isFeatured && (
            <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-amber-700">
              Featured
            </span>
          )}
        </div>

        <h1 className="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          {event.title}
        </h1>

        {event.description && (
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
            {event.description}
          </p>
        )}

        {/* Meta strip */}
        <div className="mt-8 grid grid-cols-1 gap-4 border-y border-gray-100 py-6 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1a73e8]">
              <CalendarIcon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                Date
              </p>
              <p className="mt-0.5 text-sm font-medium text-gray-900">
                {formatDate(dateIso)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#34A853]">
              <ClockIcon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                Time
              </p>
              <p className="mt-0.5 text-sm font-medium text-gray-900">
                {formatTime(dateIso)}
                {endIso && ` – ${formatTime(endIso)}`}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#EA4335]">
              <PinIcon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                Location
              </p>
              <p className="mt-0.5 text-sm font-medium text-gray-900">
                {event.location}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* COVER */}
      <figure className="mx-auto mt-10 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-black/5">
          <img
            src={event.cover}
            alt={`Cover image for ${event.title}`}
            className="h-full w-full object-cover"
          />
        </div>
      </figure>

      {/* BODY */}
      <article className="mx-auto mt-12 max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900">
            About this event
          </h2>
          <p className="mt-3 text-base leading-relaxed text-gray-700">
            {event.description ??
              "More details about this event will be shared soon."}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {isExternalLink ? (
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
              >
                Register now
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            ) : (
              <Link
                href="/team"
                className="group inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
              >
                Contact us to register
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}

            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 transition hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2"
            >
              See more events
            </Link>
          </div>
        </div>
      </article>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-4">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              More {event.category} events
            </h2>
            <span aria-hidden="true" className="h-px flex-1 bg-gray-100" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((e) => (
              <Link
                key={e.slug}
                href={`/events/${e.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                  <img
                    src={e.cover}
                    alt={`Cover image for ${e.title}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-800 shadow-sm backdrop-blur-sm">
                    {e.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-[#1a73e8]">
                    {e.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-gray-500">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarIcon className="h-3.5 w-3.5" />
                      {new Date(e.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <PinIcon className="h-3.5 w-3.5" />
                      {e.location}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}