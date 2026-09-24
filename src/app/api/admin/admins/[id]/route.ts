// src/app/api/admin/admins/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin, requireAdmin } from "@/lib/admin-auth";
import { hashPassword } from "@/lib/passwords";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const current = await getCurrentAdmin();
  const { id } = await params;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const existing = await prisma.admin.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const data: Record<string, unknown> = {};

  if ("name" in body) {
    const name = typeof body.name === "string" ? body.name.trim() : "";
    if (!name) {
      return NextResponse.json({ error: "Name cannot be empty" }, { status: 400 });
    }
    data.name = name;
  }

  if ("username" in body) {
    const username = typeof body.username === "string" ? body.username.trim() : "";
    if (!username) {
      return NextResponse.json({ error: "Username cannot be empty" }, { status: 400 });
    }
    if (!/^[a-zA-Z0-9._-]+$/.test(username)) {
      return NextResponse.json(
        { error: "Username may only contain letters, numbers, ., _, -" },
        { status: 400 }
      );
    }
    if (username !== existing.username) {
      const taken = await prisma.admin.findUnique({ where: { username } });
      if (taken) {
        return NextResponse.json(
          { error: `Username "${username}" is already taken` },
          { status: 409 }
        );
      }
    }
    data.username = username;
  }

  if ("password" in body) {
    const password = typeof body.password === "string" ? body.password : "";
    if (password) {
      if (password.length < 6) {
        return NextResponse.json(
          { error: "Password must be at least 6 characters" },
          { status: 400 }
        );
      }
      data.passwordHash = await hashPassword(password);
    }
  }

  if ("active" in body) {
    const active = Boolean(body.active);

    // Don't allow deactivating the last active admin
    if (!active) {
      const activeCount = await prisma.admin.count({ where: { active: true } });
      if (activeCount <= 1 && existing.active) {
        return NextResponse.json(
          { error: "Cannot deactivate the last active admin" },
          { status: 409 }
        );
      }
      if (current && current.id === id) {
        return NextResponse.json(
          { error: "You cannot deactivate your own account" },
          { status: 409 }
        );
      }
    }
    data.active = active;
  }

  const admin = await prisma.admin.update({
    where: { id },
    data,
    select: {
      id: true,
      username: true,
      name: true,
      active: true,
      lastLoginAt: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ admin });
}

export async function DELETE(_request: Request, { params }: Params) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const current = await getCurrentAdmin();
  const { id } = await params;

  if (current && current.id === id) {
    return NextResponse.json(
      { error: "You cannot delete your own account" },
      { status: 409 }
    );
  }

  const existing = await prisma.admin.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const total = await prisma.admin.count();
  if (total <= 1) {
    return NextResponse.json(
      { error: "Cannot delete the last admin" },
      { status: 409 }
    );
  }

  await prisma.admin.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
