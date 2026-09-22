// src/app/api/admin/courses/route.ts
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

const CATEGORIES = [
  "Web",
  "Android",
  "AI",
  "Flutter",
  "Google Workspace",
  "Career",
] as const;

type Payload = {
  title?: unknown;
  slug?: unknown;
  description?: unknown;
  cover?: unknown;
  link?: unknown;
  category?: unknown;
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

function validate(body: Payload) {
  const errors: string[] = [];
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const title = str(body.title);
  const description = str(body.description);
  const cover = str(body.cover);
  const link = str(body.link);
  const category = str(body.category);

  if (!title) errors.push("Title is required");
  if (!description) errors.push("Description is required");
  if (!cover) errors.push("Cover image is required");
  if (!link) errors.push("Link is required");
  if (!CATEGORIES.includes(category as (typeof CATEGORIES)[number])) {
    errors.push("Invalid category");
  }

  // slug: use what was provided, else derive from title
  const rawSlug = str(body.slug);
  const slug = slugify(rawSlug || title);
  if (!slug) errors.push("Slug is required");

  const order = Number(body.order);
  const published = typeof body.published === "boolean" ? body.published : true;

  return {
    errors,
    data: {
      title,
      slug,
      description,
      cover,
      link,
      category,
      order: Number.isFinite(order) ? order : 0,
      published,
    },
  };
}

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  const courses = await prisma.course.findMany({
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

  const { errors, data } = validate(body);
  if (errors.length) {
    return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
  }

  // Unique slug check
  const existing = await prisma.course.findUnique({ where: { slug: data.slug } });
  if (existing) {
    return NextResponse.json(
      { error: `Slug "${data.slug}" is already in use` },
      { status: 409 }
    );
  }

  const course = await prisma.course.create({ data });

  revalidatePath("/courses");
  revalidatePath("/admin/courses");

  return NextResponse.json({ course }, { status: 201 });
}
