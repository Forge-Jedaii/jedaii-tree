import { readFile, writeFile } from "fs/promises";
import path from "path";
import { headers } from "next/headers";
import { fallbackEvents, type HolonewsEvent } from "./holonews";

const storePath = path.join(process.cwd(), "data", "holonews.json");
const blobPath = "holonews/events.json";

async function blobConfig() {
  const readWriteToken = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  const oidcToken = process.env.VERCEL_OIDC_TOKEN?.trim() || (await headers()).get("x-vercel-oidc-token")?.trim();
  const configuredStoreId = process.env.BLOB_READ_WRITE_TOKEN_STORE_ID || process.env.BLOB_STORE_ID;
  const token = readWriteToken || oidcToken;
  if (!token) return null;
  const storeId = (configuredStoreId || readWriteToken?.split("_")[3] || "").replace(/^store_/, "");
  if (!storeId) throw new Error("Vercel Blob store ID is missing");
  return { token, storeId };
}

export async function readEvents() {
  const blob = await blobConfig();
  if (blob) {
    try {
      const response = await fetch(`https://${blob.storeId}.public.blob.vercel-storage.com/${blobPath}?v=${Date.now()}`, { cache: "no-store" });
      if (response.ok) return (await response.json()) as HolonewsEvent[];
    } catch {
      // The bundled events are used until the first successful upload.
    }
  }
  try {
    return JSON.parse(await readFile(storePath, "utf8")) as HolonewsEvent[];
  } catch {
    return fallbackEvents;
  }
}

export async function writeEvents(events: HolonewsEvent[]) {
  const blob = await blobConfig();
  if (blob) {
    const body = JSON.stringify(events, null, 2) + "\n";
    const response = await fetch(`https://vercel.com/api/blob/?pathname=${encodeURIComponent(blobPath)}`, {
      method: "PUT",
      body,
      headers: {
        Authorization: `Bearer ${blob.token}`,
        "Content-Type": "application/json",
        "x-api-version": "12",
        "x-api-blob-request-id": `${blob.storeId}:${Date.now()}:holonews`,
        "x-vercel-blob-store-id": blob.storeId,
        "x-vercel-blob-access": "public",
        "x-content-type": "application/json",
        "x-add-random-suffix": "0",
        "x-allow-overwrite": "1",
        "x-cache-control-max-age": "60",
      },
    });
    if (!response.ok) throw new Error(`Vercel Blob write failed (${response.status})`);
    return;
  }
  if (process.env.VERCEL) throw new Error("BLOB_READ_WRITE_TOKEN is missing");
  await writeFile(storePath, JSON.stringify(events, null, 2) + "\n", "utf8");
}
