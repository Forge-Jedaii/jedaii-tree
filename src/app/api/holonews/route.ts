import { NextResponse } from "next/server";
import { isAdmin } from "../../lib/admin-auth";
import { fallbackEvents } from "../../lib/holonews";

const config = () => ({ url: process.env.NEXT_PUBLIC_SUPABASE_URL, key: process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY });
const headers = (key: string) => ({ apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=representation" });

export async function GET(request: Request) {
  const admin = new URL(request.url).searchParams.get("admin") === "1";
  if (admin && !(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { url, key } = config();
  if (!url || !key) return NextResponse.json(admin ? [] : fallbackEvents);
  const filter = admin ? "" : "published=eq.true&";
  const response = await fetch(`${url}/rest/v1/holonews?${filter}select=*&order=order_index.asc,date.asc`, { headers: headers(key), cache: "no-store" });
  if (!response.ok) return NextResponse.json(admin ? [] : fallbackEvents);
  return NextResponse.json(await response.json());
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { url, key } = config(); if (!url || !key) return NextResponse.json({ error: "Supabase missing" }, { status: 503 });
  const body = await request.json();
  const response = await fetch(`${url}/rest/v1/holonews`, { method: "POST", headers: headers(key), body: JSON.stringify(body) });
  return NextResponse.json(await response.json(), { status: response.ok ? 201 : response.status });
}

export async function PATCH(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { url, key } = config(); if (!url || !key) return NextResponse.json({ error: "Supabase missing" }, { status: 503 });
  const { id, ...body } = await request.json();
  const response = await fetch(`${url}/rest/v1/holonews?id=eq.${Number(id)}`, { method: "PATCH", headers: headers(key), body: JSON.stringify(body) });
  return NextResponse.json(await response.json(), { status: response.status });
}

export async function DELETE(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { url, key } = config(); if (!url || !key) return NextResponse.json({ error: "Supabase missing" }, { status: 503 });
  const id = Number(new URL(request.url).searchParams.get("id"));
  const response = await fetch(`${url}/rest/v1/holonews?id=eq.${id}`, { method: "DELETE", headers: headers(key) });
  return response.ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Delete failed" }, { status: response.status });
}
