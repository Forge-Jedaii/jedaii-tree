import { NextResponse } from "next/server";
import { createAdminSession, validCredentials } from "../../../lib/admin-auth";

export async function POST(request: Request) {
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json({ error: "Admin configuration missing" }, { status: 503 });
  }
  const { email, password } = await request.json();
  if (typeof email !== "string" || typeof password !== "string" || !validCredentials(email, password)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await createAdminSession();
  return NextResponse.json({ ok: true });
}
