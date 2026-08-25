export type PortalIcon = "shield" | "paw" | "mountain" | "atom" | "gamepad";

export type PortalPath = {
  id: string;
  title: string;
  description: string;
  href: string;
  accent: string;
  icon: PortalIcon;
  featured?: boolean;
  position: readonly [number, number, number];
  mobilePosition: readonly [number, number, number];
};

export const portalPaths: PortalPath[] = [
  {
    id: "jedaii-academy",
    title: "JE’DAII ACADEMY",
    description: "Votre espace membre, vos formations, vos grades et votre progression.",
    href: "https://forgejedaii.fr/",
    icon: "shield",
    accent: "#38bdf8",
    featured: true,
    position: [-3.25, 1.55, 0.15],
    mobilePosition: [-1.95, 2.35, 0],
  },
  {
    id: "animal-flow",
    title: "Animal Flow",
    description: "Bouger mieux. Respirer mieux.",
    href: "https://www.animalflow-jedaii.fr/",
    icon: "paw",
    accent: "#34d399",
    position: [3.25, 1.6, -0.1],
    mobilePosition: [1.95, 2.25, 0],
  },
  {
    id: "kengido-france",
    title: "Kengido France",
    description: "Communauté nationale.",
    href: "https://www.forgejedaii.fr/",
    icon: "mountain",
    accent: "#f59e0b",
    position: [-3.45, -1.15, -0.2],
    mobilePosition: [-1.95, -1.45, 0],
  },
  {
    id: "codatech-battle-sword",
    title: "CODATECH × BATTLE SWORD",
    description: "Technologies immersives et combat connecté.",
    href: "https://www.oark.io/",
    icon: "atom",
    accent: "#a78bfa",
    position: [3.45, -1.1, 0.1],
    mobilePosition: [1.95, -1.35, 0],
  },
  {
    id: "combat-sensei-compagnon",
    title: "COMBAT SENSEI COMPAGNON",
    description: "L’application officielle FJ pour l’arbitrage, les modes de jeu et la création d’événements.",
    href: "https://combat-sensei-compagnon-csc-next-js.vercel.app/",
    icon: "gamepad",
    accent: "#fb7185",
    position: [0, -2.75, 0.25],
    mobilePosition: [0, -2.85, 0],
  },
];
