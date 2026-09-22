import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SESSION_COOKIE = "admin_session";

export async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.has(SESSION_COOKIE);
}

export async function requireAdmin(): Promise<NextResponse | null> {
  if (await isAdmin()) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}