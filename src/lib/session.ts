// src/lib/session.ts
import { createHmac, timingSafeEqual } from "crypto";

const SECRET = process.env.SESSION_SECRET ?? "dev-secret-change-me";

export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

/** Returns "<adminId>.<hmac>" */
export function signAdminId(id: string): string {
  const sig = createHmac("sha256", SECRET).update(id).digest("hex");
  return `${id}.${sig}`;
}

/** Returns the admin id if the signature is valid, else null. */
export function verifySessionCookie(value: string): string | null {
  const idx = value.lastIndexOf(".");
  if (idx === -1) return null;

  const id = value.slice(0, idx);
  const sig = value.slice(idx + 1);
  if (!id || !sig) return null;

  const expected = createHmac("sha256", SECRET).update(id).digest("hex");
  const a = Buffer.from(sig, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length) return null;
  if (!timingSafeEqual(a, b)) return null;

  return id;
}

