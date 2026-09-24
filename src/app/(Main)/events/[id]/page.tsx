// src/app/(Main)/events/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { JSONContent } from "@tiptap/core";
import { prisma } from "@/lib/prisma";
import ArticleBody from "../../articles/components/ArticleBody";
import EventCard from "../../home/components/EventCard";
import type { EventItem } from "../../home/types";
import { ArrowLeftIcon, CalendarIcon, PinIcon } from "@/components/icons";

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

type PublicEvent = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: JSONContent;
  cover: string;
  categoryName: string;
  categoryId: string;
  date: string;
  endDate: string | null;
  location: string;
  link: string;
};

async function getEventBySlug(slug: string): Promise<PublicEvent | null> {
  const e = await prisma.event.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (!e || !e.published) return null;
  return {
    id: e.id,
    slug: e.slug,
    title: e.title,
    description: e.description,
    content: e.content as JSONContent,
    cover: e.cover,
    categoryName: e.category.name,
    categoryId: e.categoryId,
    date: e.date.toISOString(),
    endDate: e.endDate ? e.endDate.toISOString() : null,
    location: e.location,
    link: e.link,
  };
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
    description: event.description,
  };
}

export default async function FullEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventBySlug(id);
  if (!event) notFound();

  // Related events - same category, upcoming, excluding this one
  const relatedDb = await prisma.event.findMany({
    where: {
      published: true,
      categoryId: event.categoryId,
      NOT: { slug: event.slug },
    },
    include: { category: true },
    orderBy: { date: "asc" },
    take: 3,
  });

  const related: EventItem[] = relatedDb.map((e) => ({
    id: e.slug,
    title: e.title,
    category: e.category.name,
    cover: e.cover,
    date: e.date.toISOString().split("T")[0],
    location: e.location,
    link: e.link,
  }));

  const isPast = new Date(event.date).getTime() < Date.now();
  const isExternal = /^https?:\/\//i.test(event.link);

  return (
    <main className="bg-white pb-20">
      {/* BREADCRUMB */}
      <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 lg:px-8">
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          All events
        </Link>
      </div>

      {/* HEADER */}
      <header className="mx-auto max-w-3xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em]">
          <span className="text-[#1a73e8]">{event.categoryName}</span>
          {isPast && (
            <>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gray-300" />
              <span className="text-gray-400">Past event</span>
            </>
          )}
        </div>

        <h1 className="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          {event.title}
        </h1>

        <p className="mt-5 text-base leading-relaxed text-gray-600 sm:text-lg">
          {event.description}
        </p>

        {/* Meta bar */}
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-gray-100 py-5 text-sm">
          <span className="inline-flex items-center gap-2 text-gray-600">
            <CalendarIcon className="h-4 w-4 text-gray-400" />
            {formatDate(event.date)} · {formatTime(event.date)}
          </span>
          <span className="inline-flex items-center gap-2 text-gray-600">
            <PinIcon className="h-4 w-4 text-gray-400" />
            {event.location}
          </span>
        </div>
      </header>

      {/* COVER */}
      <figure className="mx-auto mt-10 max-w-3xl px-4 sm:px-6 lg:px-8">
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
        <ArticleBody content={event.content} />
      </article>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-4">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              More {event.categoryName} events
            </h2>
            <span aria-hidden="true" className="h-px flex-1 bg-gray-100" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {related.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
