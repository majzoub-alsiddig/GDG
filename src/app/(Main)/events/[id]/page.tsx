// src/app/(Main)/events/[id]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { JSONContent } from "@tiptap/core";
import { prisma } from "@/lib/prisma";
import ArticleBody from "../../articles/components/ArticleBody";
import type { EventItem } from "../../home/types";
import EventDetailChrome from "../components/EventDetailChrome";
import RelatedEventsSection from "../components/RelatedEventsSection";

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

  // Related events — same category, excluding this one
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

  return (
    <main className="bg-white pb-20">
      <EventDetailChrome
        title={event.title}
        description={event.description}
        categoryName={event.categoryName}
        date={event.date}
        location={event.location}
        cover={event.cover}
      />

      <article className="mx-auto mt-12 max-w-3xl px-4 sm:px-6 lg:px-8">
        <ArticleBody content={event.content} />
      </article>

      <RelatedEventsSection
        related={related}
        categoryName={event.categoryName}
      />
    </main>
  );
}
