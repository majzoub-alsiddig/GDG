// src/app/admin/(protected)/events/new/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import EventForm, { type EventFormInitial } from "../_components/EventForm";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";


// Helper: returns YYYY-MM-DDTHH:mm suitable for datetime-local
function toLocalDatetimeString(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
    d.getDate()
  )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default async function NewEventPage() {
  const categories = await prisma.eventCategory.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    select: { id: true, name: true },
  });

  const now = new Date();
  now.setMinutes(0, 0, 0);
  const defaultDate = toLocalDatetimeString(now);

  const initial: EventFormInitial = {
    title: "",
    slug: "",
    description: "",
    content: { type: "doc", content: [{ type: "paragraph" }] },
    cover: "",
    categoryId: categories[0]?.id ?? "",
    date: defaultDate,
    endDate: "",
    location: "",
    link: "",
    isFeatured: false,
    published: true,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <Link
        href="/admin/events"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to events
      </Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
        Add event
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Fill in the details and write the content. Open the preview to check how
        it will appear.
      </p>

      {categories.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
          You need at least one event category before creating an event.{" "}
          <Link
            href="/admin/categories"
            className="font-semibold underline hover:no-underline"
          >
            Add a category 
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-8">
          <EventForm mode="create" initial={initial} categories={categories} />
        </div>
      )}
    </div>
  );
}

