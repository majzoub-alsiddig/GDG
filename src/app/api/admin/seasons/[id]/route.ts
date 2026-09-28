// src/app/api/admin/seasons/[id]/route.ts
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

export async function GET(_request: Request, { params }: Params) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  const season = await prisma.season.findUnique({
    where: { id },
    include: { _count: { select: { members: true } } },
  });
  if (!season) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ season });
}

export async function PATCH(request: Request, { params }: Params) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;

  let body: { name?: unknown; order?: unknown; isActive?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const data: Record<string, unknown> = {};

  if (typeof body.name === "string") {
    const name = body.name.trim();
    if (!name) {
      return NextResponse.json(
        { error: "Name cannot be empty" },
        { status: 400 }
      );
    }
    const slug = slugify(name);
    if (!slug) {
      return NextResponse.json(
        { error: "Name must contain at least one letter or number" },
        { status: 400 }
      );
    }

    const collision = await prisma.season.findFirst({
      where: { NOT: { id }, OR: [{ name }, { slug }] },
      select: { name: true, slug: true },
    });
    if (collision) {
      return NextResponse.json(
        {
          error:
            collision.name === name
              ? `Season "${name}" already exists`
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

  const wantsActive = body.isActive === true;
  const wantsInactive = body.isActive === false;

  try {
    // Single-active enforcement: when turning a season on, flip the others
    // off in the same transaction so there is never a moment with two actives.
    const season = await prisma.$transaction(async (tx) => {
      if (wantsActive) {
        await tx.season.updateMany({
          where: { isActive: true, NOT: { id } },
          data: { isActive: false },
        });
        data.isActive = true;
      } else if (wantsInactive) {
        data.isActive = false;
      }
      return tx.season.update({ where: { id }, data });
    });

    revalidatePath("/admin/seasons");
    revalidatePath("/admin/team");
    revalidatePath("/team");
    return NextResponse.json({ season });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  const url = new URL(request.url);
  const force = url.searchParams.get("force") === "true";

  const season = await prisma.season.findUnique({
    where: { id },
    include: { _count: { select: { members: true } } },
  });
  if (!season) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const memberCount = season._count.members;

  // Two-step delete: block on the first call, only proceed when the client
  // re-issues with ?force=true. Explicit > implicit for destructive ops.
  if (!force) {
    if (season.isActive) {
      return NextResponse.json(
        {
          error:
            "This is the active season. Deleting it will leave the public site with no default season.",
          requiresConfirm: true,
          reason: "active",
          memberCount,
        },
        { status: 409 }
      );
    }
    if (memberCount > 0) {
      return NextResponse.json(
        {
          error: `${memberCount} team member${
            memberCount === 1 ? "" : "s"
          } belong to this season. They will become unassigned.`,
          requiresConfirm: true,
          reason: "members",
          memberCount,
        },
        { status: 409 }
      );
    }
  }

  await prisma.$transaction(async (tx) => {
    if (memberCount > 0) {
      // onDelete: SetNull already does this, but being explicit keeps the
      // intent visible and works even if the FK rule ever changes.
      await tx.teamMember.updateMany({
        where: { seasonId: id },
        data: { seasonId: null },
      });
    }
    await tx.season.delete({ where: { id } });
  });

  revalidatePath("/admin/seasons");
  revalidatePath("/admin/team");
  revalidatePath("/team");

  return NextResponse.json({ ok: true });
}