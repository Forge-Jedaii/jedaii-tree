import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fallbackEvents, type HolonewsEvent } from "./holonews";

const storePath = path.join(process.cwd(), "data", "holonews.json");

export async function readEvents() {
  try {
    return JSON.parse(await readFile(storePath, "utf8")) as HolonewsEvent[];
  } catch {
    return fallbackEvents;
  }
}

export async function writeEvents(events: HolonewsEvent[]) {
  await writeFile(storePath, JSON.stringify(events, null, 2) + "\n", "utf8");
}
