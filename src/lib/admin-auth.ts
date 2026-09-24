// src/lib/admin-auth.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "./prisma";
import { SESSION_COOKIE, verifySessionCookie } from "./session";

export type CurrentAdmin = {
  id: string;
  username: string;
  name: string;
  active: boolean;
};

export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;
  if (!raw) return null;

  const adminId = verifySessionCookie(raw);
  if (!adminId) return null;

  const admin = await prisma.admin.findUnique({
    where: { id: adminId },
    select: { id: true, username: true, name: true, active: true },
  });

  if (!admin || !admin.active) return null;
  return admin;
}

export async function isAdmin(): Promise<boolean> {
  return (await getCurrentAdmin()) !== null;
}

export async function requireAdmin(): Promise<NextResponse | null> {
  if (await isAdmin()) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function requireCurrentAdmin(): Promise<
  { admin: CurrentAdmin } | { response: NextResponse }
> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return {
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  return { admin };
}
