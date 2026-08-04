import { NextResponse } from "next/server";
import { createAdminSession, validCredentials } from "../../../lib/admin-auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (typeof email !== "string" || typeof password !== "string" || !validCredentials(email, password)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await createAdminSession();
  return NextResponse.json({ ok: true });
}
