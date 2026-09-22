// src/app/api/admin/logout/route.ts
import { NextResponse } from "next/server";

const SESSION_COOKIE = "admin_session";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(SESSION_COOKIE);
  return response;
}