// src/app/api/admin/courses/route.ts
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

type Payload = {
  title?: unknown;
  slug?: unknown;
  description?: unknown;
  cover?: unknown;
  link?: unknown;
  categoryId?: unknown;
  order?: unknown;
  published?: unknown;
};

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

  const courses = await prisma.course.findMany({
    include: { category: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
  return NextResponse.json({ courses });
}

export async function POST(request: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const title = str(body.title);
  const description = str(body.description);
  const cover = str(body.cover);
  const link = str(body.link);
  const categoryId = str(body.categoryId);

  const errors: string[] = [];
  if (!title) errors.push("Title is required");
  if (!description) errors.push("Description is required");
  if (!cover) errors.push("Cover image is required");
  if (!link) errors.push("Link is required");
  if (!categoryId) errors.push("Category is required");

  if (errors.length) {
    return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
  }

  // Validate that the category exists
  const category = await prisma.courseCategory.findUnique({
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

  const order = Number(body.order);
  const published = typeof body.published === "boolean" ? body.published : true;

  // Unique slug check
  const existing = await prisma.course.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json(
      { error: `Slug "${slug}" is already in use` },
      { status: 409 }
    );
  }

  const course = await prisma.course.create({
    data: {
      title,
      slug,
      description,
      cover,
      link,
      categoryId,
      order: Number.isFinite(order) ? order : 0,
      published,
    },
  });

  revalidatePath("/courses");
  revalidatePath("/admin/courses");

  return NextResponse.json({ course }, { status: 201 });
}
