// src/app/api/admin/team/route.ts
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

// TODO: complete the teams categories
const CATEGORIES = ["Leadership", "Technical", "Media", "Operations"] as const;

type Payload = {
  name?: unknown;
  role?: unknown;
  about?: unknown;
  photo?: unknown;
  category?: unknown;
  github?: unknown;
  linkedin?: unknown;
  instagram?: unknown;
  twitter?: unknown;
  website?: unknown;
  order?: unknown;
};

function validate(body: Payload) {
  const errors: string[] = [];
  const out: Record<string, string | number | null> = {};

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const opt = (v: unknown) => {
    const s = str(v);
    return s.length > 0 ? s : null;
  };

  const name = str(body.name);
  const role = str(body.role);
  const about = str(body.about);
  const photo = str(body.photo);
  const category = str(body.category);

  if (!name) errors.push("Name is required");
  if (!role) errors.push("Role is required");
  if (!about) errors.push("About is required");
  if (!photo) errors.push("Photo URL is required");
  if (!CATEGORIES.includes(category as (typeof CATEGORIES)[number])) {
    errors.push("Invalid category");
  }

  out.name = name;
  out.role = role;
  out.about = about;
  out.photo = photo;
  out.category = category;
  out.github = opt(body.github);
  out.linkedin = opt(body.linkedin);
  out.instagram = opt(body.instagram);
  out.twitter = opt(body.twitter);
  out.website = opt(body.website);

  const order = Number(body.order);
  out.order = Number.isFinite(order) ? order : 0;

  return { errors, data: out };
}

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  const members = await prisma.teamMember.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
  return NextResponse.json({ members });
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

  const member = await prisma.teamMember.create({
    data: data as Parameters<typeof prisma.teamMember.create>[0]["data"],
  });

  // Refresh the public team page so changes go live immediately
  revalidatePath("/team");
  revalidatePath("/admin/team");

  return NextResponse.json({ member }, { status: 201 });
}