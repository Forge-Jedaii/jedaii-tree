import { NextResponse } from "next/server";
import { createAdminSession, validPassword } from "../../../lib/admin-auth";

export async function POST(request: Request) {
  const { password } = await request.json();
  if (typeof password !== "string" || !validPassword(password)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await createAdminSession();
  return NextResponse.json({ ok: true });
}
