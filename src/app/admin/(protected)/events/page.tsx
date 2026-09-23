// src/app/admin/(protected)/events/page.tsx
import { prisma } from "@/lib/prisma";
import EventManager from "./_components/EventManager";

export default async function AdminEventsPage() {
  const rows = await prisma.event.findMany({
    include: { category: true },
    orderBy: { date: "desc" },
  });

  const events = rows.map((e) => ({
    id: e.id,
    slug: e.slug,
    title: e.title,
    description: e.description,
    cover: e.cover,
    category: { id: e.category.id, name: e.category.name },
    date: e.date.toISOString(),
    location: e.location,
    isFeatured: e.isFeatured,
    published: e.published,
    createdAt: e.createdAt.toISOString(),
  }));

  return <EventManager initialEvents={events} />;
}
