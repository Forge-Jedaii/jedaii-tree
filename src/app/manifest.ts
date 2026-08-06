import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "La Forge Je’Daii — Hub officiel",
    short_name: "Je’Daii Hub",
    description: "Arts martiaux, mouvement, technologie et communauté Je’Daii.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#030910",
    theme_color: "#030910",
    lang: "fr",
    categories: ["sports", "education", "lifestyle"],
    icons: [
      {
        src: "/images/logojapanforge.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/logojapanforge.png",
        sizes: "any",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
