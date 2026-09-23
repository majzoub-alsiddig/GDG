// src/app/admin/(protected)/events/_components/EventManager.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AdminButton,
  AdminEmptyState,
  AdminErrorBanner,
  AdminPageHeader,
} from "@/app/admin/_components/AdminUI";
import AdminContentCard from "@/app/admin/_components/AdminContentCard";
import { CalendarIcon } from "@/components/icons";

export type AdminEventRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover: string;
  category: { id: string; name: string };
  date: string;
  location: string;
  isFeatured: boolean;
  published: boolean;
  createdAt: string;
};

type Props = { initialEvents: AdminEventRow[] };

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function EventManager({ initialEvents }: Props) {
  const router = useRouter();
  const [events, setEvents] = useState(initialEvents);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setBusyId(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setEvents((prev) => prev.filter((e) => e.id !== id));
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <AdminPageHeader
        eyebrow="Content"
        title="Events"
        description="Changes are published to the public events page immediately."
      >
        <AdminButton href="/admin/categories" variant="outline">
          Manage categories
        </AdminButton>
        <AdminButton href="/admin/events/new">+ Add event</AdminButton>
      </AdminPageHeader>

      <AdminErrorBanner message={error} />

      {events.length === 0 ? (
        <AdminEmptyState
          title="No events yet"
          message="Click “Add event” to create the first one."
          action={{ label: "Add event", href: "/admin/events/new" }}
        />
      ) : (
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => (
            <AdminContentCard
              key={e.id}
              cover={e.cover}
              title={e.title}
              slug={e.slug}
              description={e.description}
              categoryLabel={e.category.name}
              topRightBadges={[
                ...(e.isFeatured
                  ? [{ label: "Featured", className: "bg-[#FBBC05] text-white" }]
                  : []),
                ...(!e.published
                  ? [{ label: "Draft", className: "bg-gray-900 text-white" }]
                  : []),
              ]}
              meta={
                <>
                  <span className="inline-flex items-center gap-1">
                    <CalendarIcon className="h-3.5 w-3.5" />
                    {formatDate(e.date)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    {e.location}
                  </span>
                </>
              }
              editHref={`/admin/events/${e.id}/edit`}
              onDelete={() => handleDelete(e.id, e.title)}
              deleting={busyId === e.id}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
