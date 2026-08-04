import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "jedaii_admin";
const maxAge = 60 * 60 * 8;

function signature(value: string) {
  const secret = process.env.ADMIN_SESSION_SECRET || "";
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function validPassword(value: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || value.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
}

export async function createAdminSession() {
  const expires = String(Date.now() + maxAge * 1000);
  (await cookies()).set(COOKIE, `${expires}.${signature(expires)}`, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge });
}

export async function isAdmin() {
  if (!process.env.ADMIN_SESSION_SECRET) return false;
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  const [expires, supplied] = value.split(".");
  const expected = signature(expires);
  return Number(expires) > Date.now() && supplied?.length === expected.length && timingSafeEqual(Buffer.from(supplied), Buffer.from(expected));
}
