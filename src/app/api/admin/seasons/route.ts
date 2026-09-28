// src/app/api/admin/seasons/route.ts
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

  const seasons = await prisma.season.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    include: { _count: { select: { members: true } } },
  });

  return NextResponse.json({ seasons });
}

export async function POST(request: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  let body: { name?: unknown; order?: unknown; isActive?: unknown };
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
  const isActive = body.isActive === true;

  const existing = await prisma.season.findFirst({
    where: { OR: [{ name }, { slug }] },
    select: { name: true, slug: true },
  });
  if (existing) {
    return NextResponse.json(
      {
        error:
          existing.name === name
            ? `Season "${name}" already exists`
            : `Slug "${slug}" is already in use`,
      },
      { status: 409 }
    );
  }

  // Only one season may be active. Flip every other one off first, atomically.
  const season = await prisma.$transaction(async (tx) => {
    if (isActive) {
      await tx.season.updateMany({
        where: { isActive: true },
        data: { isActive: false },
      });
    }
    return tx.season.create({
      data: { name, slug, order: finalOrder, isActive },
    });
  });

  revalidatePath("/admin/seasons");
  revalidatePath("/admin/team");
  revalidatePath("/team");

  return NextResponse.json({ season }, { status: 201 });
}