// src/app/api/admin/team/[id]/route.ts
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

const CATEGORIES = ["Core", "Technical", "Media", "Managment"] as const;

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  const member = await prisma.teamMember.findUnique({
    where: { id },
    include: {
      season: { select: { id: true, name: true, slug: true, isActive: true } },
    },
  });
  if (!member) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ member });
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

  // Partial update- only touch keys present in the body.
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

  takeStr("name");
  takeStr("role");
  takeStr("about");
  takeStr("photo");
  takeStr("category");
  takeOpt("github");
  takeOpt("linkedin");
  takeOpt("instagram");
  takeOpt("twitter");
  takeOpt("website");

  if ("order" in body) {
    const n = Number(body.order);
    data.order = Number.isFinite(n) ? n : 0;
  }

  if (typeof data.category === "string") {
    if (!CATEGORIES.includes(data.category as (typeof CATEGORIES)[number])) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }
  }

  // seasonId: nullable FK. Empty string / null => null (unassign).
  if ("seasonId" in body) {
    const raw = body.seasonId;
    if (raw === null || raw === "") {
      data.seasonId = null;
    } else if (typeof raw === "string") {
      const trimmed = raw.trim();
      data.seasonId = trimmed.length > 0 ? trimmed : null;
    } else {
      return NextResponse.json(
        { error: "Invalid seasonId" },
        { status: 400 }
      );
    }

    if (data.seasonId) {
      const season = await prisma.season.findUnique({
        where: { id: data.seasonId as string },
        select: { id: true },
      });
      if (!season) {
        return NextResponse.json(
          { error: "Season not found" },
          { status: 400 }
        );
      }
    }
  }

  try {
    const member = await prisma.teamMember.update({ where: { id }, data });
    revalidatePath("/team");
    revalidatePath("/admin/team");
    revalidatePath("/admin/seasons");
    return NextResponse.json({ member });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  try {
    await prisma.teamMember.delete({ where: { id } });
    revalidatePath("/team");
    revalidatePath("/admin/team");
    revalidatePath("/admin/seasons");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}