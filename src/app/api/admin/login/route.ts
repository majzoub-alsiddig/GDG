// src/app/api/admin/login/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/passwords";
import { SESSION_COOKIE, SESSION_MAX_AGE, signAdminId } from "@/lib/session";

// A well-formed dummy hash to keep timing consistent when the username doesn't exist.
const DUMMY_HASH =
  "scrypt$00000000000000000000000000000000$" +
  "0".repeat(128);

export async function POST(request: Request) {
  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const username = (body.username ?? "").trim();
  const password = body.password ?? "";

  if (!username || !password) {
    return NextResponse.json(
      { error: "Username and password are required" },
      { status: 400 }
    );
  }

  const admin = await prisma.admin.findUnique({ where: { username } });
  const ok = await verifyPassword(password, admin?.passwordHash ?? DUMMY_HASH);

  if (!admin || !admin.active || !ok) {
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  }

  await prisma.admin.update({
    where: { id: admin.id },
    data: { lastLoginAt: new Date() },
  });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, signAdminId(admin.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
  return response;
}
