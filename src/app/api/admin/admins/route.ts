// src/app/api/admin/admins/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { hashPassword } from "@/lib/passwords";

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  const admins = await prisma.admin.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      username: true,
      name: true,
      active: true,
      lastLoginAt: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ admins });
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
  const username = str(body.username);
  const name = str(body.name);
  const password = typeof body.password === "string" ? body.password : "";
  const active = typeof body.active === "boolean" ? body.active : true;

  const errors: string[] = [];
  if (!username) errors.push("Username is required");
  if (!/^[a-zA-Z0-9._-]+$/.test(username)) {
    errors.push("Username may only contain letters, numbers, ., _, -");
  }
  if (!name) errors.push("Name is required");
  if (password.length < 6) errors.push("Password must be at least 6 characters");
  if (errors.length) {
    return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
  }

  const existing = await prisma.admin.findUnique({ where: { username } });
  if (existing) {
    return NextResponse.json(
      { error: `Username "${username}" is already taken` },
      { status: 409 }
    );
  }

  const passwordHash = await hashPassword(password);
  const admin = await prisma.admin.create({
    data: { username, name, passwordHash, active },
    select: { id: true, username: true, name: true, active: true, lastLoginAt: true, createdAt: true },
  });

  return NextResponse.json({ admin }, { status: 201 });
}
