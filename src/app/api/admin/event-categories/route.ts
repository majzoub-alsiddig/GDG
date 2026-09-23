// src/app/api/admin/event-categories/route.ts
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

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  const categories = await prisma.eventCategory.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    include: { _count: { select: { events: true } } },
  });

  return NextResponse.json({ categories });
}

export async function POST(request: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  let body: { name?: unknown; order?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  const slug = slugify(name);
  if (!slug) {
    return NextResponse.json(
      { error: "Name must contain at least one letter or number" },
      { status: 400 }
    );
  }

  const order = Number(body.order);
  const finalOrder = Number.isFinite(order) ? order : 0;

  const existing = await prisma.eventCategory.findFirst({
    where: { OR: [{ name }, { slug }] },
    select: { name: true, slug: true },
  });
  if (existing) {
    return NextResponse.json(
      {
        error:
          existing.name === name
            ? `Category "${name}" already exists`
            : `Slug "${slug}" is already in use`,
      },
      { status: 409 }
    );
  }

  const category = await prisma.eventCategory.create({
    data: { name, slug, order: finalOrder },
  });

  revalidatePath("/events");
  revalidatePath("/admin/categories");
  revalidatePath("/admin/events");

  return NextResponse.json({ category }, { status: 201 });
}
