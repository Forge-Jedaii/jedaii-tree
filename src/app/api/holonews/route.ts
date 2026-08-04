import { NextResponse } from "next/server";
import { isAdmin } from "../../lib/admin-auth";
import { readEvents, writeEvents } from "../../lib/holonews-store";
import type { HolonewsEvent } from "../../lib/holonews";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const admin = new URL(request.url).searchParams.get("admin") === "1";
  if (admin && !(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const events = await readEvents();
  return NextResponse.json(events.filter((event) => admin || event.published).sort((a, b) => a.order_index - b.order_index || a.date.localeCompare(b.date)));
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const events = await readEvents();
  const event: HolonewsEvent = { ...body, id: events.reduce((max, item) => Math.max(max, item.id), 0) + 1, link: body.link || null, created_at: new Date().toISOString() };
  await writeEvents([...events, event]);
  return NextResponse.json(event, { status: 201 });
}

export async function PATCH(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...body } = await request.json();
  const events = await readEvents();
  const index = events.findIndex((item) => item.id === Number(id));
  if (index < 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  events[index] = { ...events[index], ...body, link: body.link || null };
  await writeEvents(events);
  return NextResponse.json(events[index]);
}

export async function DELETE(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = Number(new URL(request.url).searchParams.get("id"));
  const events = await readEvents();
  await writeEvents(events.filter((item) => item.id !== id));
  return NextResponse.json({ ok: true });
}
