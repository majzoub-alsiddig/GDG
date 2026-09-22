// src/app/api/admin/courses/[id]/route.ts
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

type Params = { params: Promise<{ id: string }> };

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET(_request: Request, { params }: Params) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  const course = await prisma.course.findUnique({ where: { id } });
  if (!course) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ course });
}

export async function PATCH(request: Request, { params }: Params) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const data: Record<string, unknown> = {};

  const takeStr = (k: string) => {
    if (k in body && typeof body[k] === "string") {
      data[k] = (body[k] as string).trim();
    }
  };

  takeStr("title");
  takeStr("description");
  takeStr("cover");
  takeStr("link");
  takeStr("category");

  if ("slug" in body) {
    const raw = typeof body.slug === "string" ? body.slug : "";
    const slug = slugify(raw);
    if (slug) data.slug = slug;
  }

  if ("order" in body) {
    const n = Number(body.order);
    data.order = Number.isFinite(n) ? n : 0;
  }

  if ("published" in body) {
    data.published = Boolean(body.published);
  }

  if (typeof data.category === "string") {
    if (!CATEGORIES.includes(data.category as (typeof CATEGORIES)[number])) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }
  }

  // Unique slug check (exclude this record)
  if (typeof data.slug === "string") {
    const collision = await prisma.course.findFirst({
      where: { slug: data.slug, NOT: { id } },
      select: { id: true },
    });
    if (collision) {
      return NextResponse.json(
        { error: `Slug "${data.slug}" is already in use` },
        { status: 409 }
      );
    }
  }

  try {
    const course = await prisma.course.update({ where: { id }, data });
    revalidatePath("/courses");
    revalidatePath("/admin/courses");
    return NextResponse.json({ course });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  try {
    await prisma.course.delete({ where: { id } });
    revalidatePath("/courses");
    revalidatePath("/admin/courses");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

