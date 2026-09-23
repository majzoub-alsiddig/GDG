// src/app/admin/(protected)/events/[id]/edit/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import type { JSONContent } from "@tiptap/core";
import { prisma } from "@/lib/prisma";
import EventForm, { type EventFormInitial } from "../../_components/EventForm";

type Params = { params: Promise<{ id: string }> };

function toLocalDatetimeString(d: Date | null): string {
  if (!d) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
    d.getDate()
  )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default async function EditEventPage({ params }: Params) {
  const { id } = await params;

  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) notFound();

  const categories = await prisma.eventCategory.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    select: { id: true, name: true },
  });

  const initial: EventFormInitial = {
    id: event.id,
    title: event.title,
    slug: event.slug,
    description: event.description,
    content: event.content as JSONContent,
    cover: event.cover,
    categoryId: event.categoryId,
    date: toLocalDatetimeString(event.date),
    endDate: toLocalDatetimeString(event.endDate),
    location: event.location,
    link: event.link,
    isFeatured: event.isFeatured,
    published: event.published,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <Link
        href="/admin/events"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
      >
        ← Back to events
      </Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
        Edit event
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Editing: <span className="font-medium text-gray-700">{event.title}</span>
      </p>
      <div className="mt-8">
        <EventForm mode="edit" initial={initial} categories={categories} />
      </div>
    </div>
  );
}
