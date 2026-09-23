// src/app/api/admin/events/route.ts
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function isTiptapDoc(v: unknown): boolean {
  return !!v && typeof v === "object" && (v as { type?: unknown }).type === "doc";
}

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  const events = await prisma.event.findMany({
    include: { category: true },
    orderBy: { date: "desc" },
  });
  return NextResponse.json({ events });
}

export async function POST(request: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const title = str(body.title);
  const description = str(body.description);
  const cover = str(body.cover);
  const categoryId = str(body.categoryId);
  const location = str(body.location);
  const link = str(body.link);
  const content = body.content;
  const dateStr = str(body.date);
  const endDateStr = str(body.endDate);

  const errors: string[] = [];
  if (!title) errors.push("Title is required");
  if (!description) errors.push("Description is required");
  if (!cover) errors.push("Cover image is required");
  if (!categoryId) errors.push("Category is required");
  if (!location) errors.push("Location is required");
  if (!link) errors.push("Link is required");
  if (!dateStr) errors.push("Date is required");
  if (!isTiptapDoc(content)) errors.push("Content is required");
  if (errors.length) {
    return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
  }

  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const endDate = endDateStr ? new Date(endDateStr) : null;
  if (endDate && Number.isNaN(endDate.getTime())) {
    return NextResponse.json({ error: "Invalid end date" }, { status: 400 });
  }

  const category = await prisma.eventCategory.findUnique({
    where: { id: categoryId },
    select: { id: true },
  });
  if (!category) {
    return NextResponse.json(
      { error: "Selected category does not exist" },
      { status: 400 }
    );
  }

  const rawSlug = str(body.slug);
  const slug = slugify(rawSlug || title);
  if (!slug) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const isFeatured =
    typeof body.isFeatured === "boolean" ? body.isFeatured : false;
  const published = typeof body.published === "boolean" ? body.published : true;

  const existing = await prisma.event.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json(
      { error: `Slug "${slug}" is already in use` },
      { status: 409 }
    );
  }

  const event = await prisma.event.create({
    data: {
      title,
      slug,
      description,
      content: content as object,
      cover,
      categoryId,
      date,
      endDate,
      location,
      link,
      isFeatured,
      published,
    },
  });

  revalidatePath("/events");
  revalidatePath("/admin/events");
  revalidatePath("/");

  return NextResponse.json({ event }, { status: 201 });
}
