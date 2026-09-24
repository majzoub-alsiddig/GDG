// src/app/api/admin/login/route.ts
import { NextResponse } from "next/server";

const SESSION_COOKIE = "admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(request: Request) {
  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const username = (body.username ?? "").trim();
  const password = body.password ?? "";

  // TODO: allow admins to save their data in the db, and allow the manager to add new admins-delete
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    // Soft delay to make brute-force attempts less pleasant
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
  return response;
}