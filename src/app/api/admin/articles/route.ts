// src/app/api/admin/articles/route.ts
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

  const articles = await prisma.article.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ articles });
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
  const author = str(body.author);
  const authorRole = str(body.authorRole);
  const cover = str(body.cover);
  const categoryId = str(body.categoryId);
  const content = body.content;

  const errors: string[] = [];
  if (!title) errors.push("Title is required");
  if (!description) errors.push("Description is required");
  if (!author) errors.push("Author is required");
  if (!cover) errors.push("Cover image is required");
  if (!categoryId) errors.push("Category is required");
  if (!isTiptapDoc(content)) errors.push("Content is required");
  if (errors.length) {
    return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
  }

  const category = await prisma.articleCategory.findUnique({
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

  const readingTime = Number(body.readingTime);
  const featured = typeof body.featured === "boolean" ? body.featured : false;
  const published = typeof body.published === "boolean" ? body.published : true;

  const existing = await prisma.article.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json(
      { error: `Slug "${slug}" is already in use` },
      { status: 409 }
    );
  }

  const article = await prisma.article.create({
    data: {
      title,
      slug,
      description,
      content: content as object,
      author,
      authorRole: authorRole || null,
      cover,
      categoryId,
      readingTime: Number.isFinite(readingTime) && readingTime > 0 ? readingTime : 5,
      featured,
      published,
    },
  });

  revalidatePath("/articles");
  revalidatePath("/admin/articles");
  revalidatePath(`/articles/${article.slug}`);

  return NextResponse.json({ article }, { status: 201 });
}
