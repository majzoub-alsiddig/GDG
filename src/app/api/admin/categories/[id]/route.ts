// src/app/api/admin/categories/[id]/route.ts
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

export async function PATCH(request: Request, { params }: Params) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;

  let body: { name?: unknown; order?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const data: Record<string, unknown> = {};

  if (typeof body.name === "string") {
    const name = body.name.trim();
    if (!name) {
      return NextResponse.json({ error: "Name cannot be empty" }, { status: 400 });
    }
    const slug = slugify(name);
    if (!slug) {
      return NextResponse.json(
        { error: "Name must contain at least one letter or number" },
        { status: 400 }
      );
    }

    // Check name / slug uniqueness (excluding this record)
    const collision = await prisma.courseCategory.findFirst({
      where: {
        NOT: { id },
        OR: [{ name }, { slug }],
      },
      select: { name: true, slug: true },
    });
    if (collision) {
      return NextResponse.json(
        {
          error:
            collision.name === name
              ? `Category "${name}" already exists`
              : `Slug "${slug}" is already in use`,
        },
        { status: 409 }
      );
    }

    data.name = name;
    data.slug = slug;
  }

  if ("order" in body) {
    const n = Number(body.order);
    data.order = Number.isFinite(n) ? n : 0;
  }

  try {
    const category = await prisma.courseCategory.update({
      where: { id },
      data,
    });
    revalidatePath("/courses");
    revalidatePath("/admin/categories");
    revalidatePath("/admin/courses");
    return NextResponse.json({ category });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;

  // Refuse to delete if any courses still use this category
  const count = await prisma.course.count({ where: { categoryId: id } });
  if (count > 0) {
    return NextResponse.json(
      {
        error: `Cannot delete: ${count} course${count === 1 ? "" : "s"} use this category. Reassign them first.`,
      },
      { status: 409 }
    );
  }

  try {
    await prisma.courseCategory.delete({ where: { id } });
    revalidatePath("/courses");
    revalidatePath("/admin/categories");
    revalidatePath("/admin/courses");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
