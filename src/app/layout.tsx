import type { Metadata } from "next";
import "./globals.css";

const title = "La Forge Je’Daii — Arts martiaux, mouvement et technologie";
const description = "Le hub officiel Je’Daii : Academy, arts martiaux, sabre laser, Animal Flow, technologies immersives et communauté.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jedaii.fr"), title, description,
  openGraph: { title, description, url: "/", siteName: "La Forge Je’Daii", locale: "fr_FR", type: "website", images: [{ url: "/images/both.png", width: 1200, height: 630, alt: "La Forge Je’Daii" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/images/both.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = { "@context": "https://schema.org", "@type": "Organization", name: "La Forge Je'Daii", url: "https://www.jedaii.fr", logo: "https://www.jedaii.fr/images/logojapanforge.png", sameAs: ["https://www.instagram.com/laforgejedaii/", "https://www.youtube.com/@ForgeJedaii"] };
  return <html lang="fr"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /></body></html>;
}
