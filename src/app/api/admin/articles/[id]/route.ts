// src/app/api/admin/articles/[id]/route.ts
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

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

function isTiptapDoc(v: unknown): boolean {
  return !!v && typeof v === "object" && (v as { type?: unknown }).type === "doc";
}

export async function GET(_request: Request, { params }: Params) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  const article = await prisma.article.findUnique({
    where: { id },
    include: { category: true },
  });
  if (!article) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ article });
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
  const takeOpt = (k: string) => {
    if (k in body) {
      const v = body[k];
      data[k] = typeof v === "string" && v.trim() ? v.trim() : null;
    }
  };

  takeStr("title");
  takeStr("description");
  takeStr("author");
  takeOpt("authorRole");
  takeStr("cover");

  if ("categoryId" in body && typeof body.categoryId === "string") {
    const categoryId = body.categoryId.trim();
    if (!categoryId) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );
    }
    const exists = await prisma.articleCategory.findUnique({
      where: { id: categoryId },
      select: { id: true },
    });
    if (!exists) {
      return NextResponse.json(
        { error: "Selected category does not exist" },
        { status: 400 }
      );
    }
    data.categoryId = categoryId;
  }

  if ("slug" in body) {
    const raw = typeof body.slug === "string" ? body.slug : "";
    const slug = slugify(raw);
    if (slug) data.slug = slug;
  }

  if ("content" in body) {
    if (!isTiptapDoc(body.content)) {
      return NextResponse.json({ error: "Invalid content" }, { status: 400 });
    }
    data.content = body.content as object;
  }

  if ("readingTime" in body) {
    const n = Number(body.readingTime);
    data.readingTime = Number.isFinite(n) && n > 0 ? n : 5;
  }

  if ("featured" in body) data.featured = Boolean(body.featured);
  if ("published" in body) data.published = Boolean(body.published);

  if (typeof data.slug === "string") {
    const collision = await prisma.article.findFirst({
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
    const article = await prisma.article.update({ where: { id }, data });
    revalidatePath("/articles");
    revalidatePath("/admin/articles");
    revalidatePath(`/articles/${article.slug}`);
    return NextResponse.json({ article });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  try {
    const article = await prisma.article.delete({ where: { id } });
    revalidatePath("/articles");
    revalidatePath("/admin/articles");
    revalidatePath(`/articles/${article.slug}`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
