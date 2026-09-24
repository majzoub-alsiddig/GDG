// src/app/(Main)/events/page.tsx
import { prisma } from "@/lib/prisma";
import type { EventItem } from "../home/types";
import EventsListContent from "./components/EventsListContent";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const dbEvents = await prisma.event.findMany({
    where: { published: true },
    include: { category: true },
    orderBy: { date: "asc" },
  });

  const events: EventItem[] = dbEvents.map((e) => ({
    id: e.slug,
    title: e.title,
    category: e.category.name,
    cover: e.cover,
    date: e.date.toISOString().split("T")[0],
    location: e.location,
    link: e.link,
  }));

  return (
    <main className="min-h-screen bg-white">
      <EventsListContent events={events} />
    </main>
  );
}
