export type HolonewsEvent = {
  id: number;
  date: string;
  title: string;
  description: string;
  color: string;
  link: string | null;
  created_at: string;
  order_index: number;
  published: boolean;
};

export const fallbackEvents: HolonewsEvent[] = [
  { id: 1, date: "2026-04-25", title: "Play Azur Festival — Nice", description: "Démonstrations, initiations et arène Battle Sword avec la Forge Je'Daii et CODATECH.", color: "#38bdf8", link: null, created_at: "2026-01-01T00:00:00Z", order_index: 1, published: true },
  { id: 2, date: "2026-05-16", title: "L'appel de la Forge", description: "Premier tournoi de combat réaliste au sabre laser, animations et partenaires.", color: "#f59e0b", link: null, created_at: "2026-01-01T00:00:00Z", order_index: 2, published: true },
  { id: 3, date: "2026-07-09", title: "Japan Expo Paris", description: "Retrouvez CODATECH × Forge Je'Daii pour quatre jours d'initiations et de combats connectés.", color: "#a78bfa", link: null, created_at: "2026-01-01T00:00:00Z", order_index: 3, published: true },
];

export async function getHolonews(): Promise<HolonewsEvent[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return fallbackEvents;
  try {
    const response = await fetch(`${url}/rest/v1/holonews?published=eq.true&select=*&order=order_index.asc,date.asc`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { revalidate: 60 },
    });
    if (!response.ok) return fallbackEvents;
    return (await response.json()) as HolonewsEvent[];
  } catch {
    return fallbackEvents;
  }
}
