"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Atom, ExternalLink, Instagram, Menu, Mountain, Network, PawPrint, Shield, Sparkles, Swords, X } from "lucide-react";
import Holonews from "./holonews";
import AdminPanel from "./admin-panel";
import { fallbackEvents, type HolonewsEvent } from "../lib/holonews";

const portals = [
  { title: "JE’DAII ACADEMY", description: "Votre espace membre, vos formations, vos grades et votre progression.", href: "https://academy.jedaii.fr", icon: Shield, accent: "#38bdf8", featured: true },
  { title: "Forge Je’Daii", description: "Arts martiaux et sabre laser.", href: "https://www.forgejedaii.fr/", icon: Swords, accent: "#22d3ee" },
  { title: "Animal Flow", description: "Bouger mieux. Respirer mieux.", href: "https://www.animalflow-jedaii.fr/", icon: PawPrint, accent: "#34d399" },
  { title: "Kengido France", description: "Communauté nationale.", href: "https://www.forgejedaii.fr/", icon: Mountain, accent: "#f59e0b" },
  { title: "CODATECH", description: "Technologies immersives.", href: "https://oark.io/", icon: Atom, accent: "#a78bfa" },
  { title: "Battle Sword", description: "Combat connecté.", href: "https://oark.io/", icon: Network, accent: "#fb7185" },
];

export default function HubPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [events, setEvents] = useState<HolonewsEvent[]>(fallbackEvents);
  const [logoClicks, setLogoClicks] = useState(0);

  const refreshEvents = async () => {
    const response = await fetch("/api/holonews");
    if (response.ok) setEvents(await response.json());
  };

  useEffect(() => { void refreshEvents(); }, []);
  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "j") {
        event.preventDefault(); setAdminOpen(true);
      }
    };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);
  useEffect(() => {
    if (!logoClicks) return;
    if (logoClicks >= 3) { setAdminOpen(true); setLogoClicks(0); return; }
    const timer = window.setTimeout(() => setLogoClicks(0), 650);
    return () => window.clearTimeout(timer);
  }, [logoClicks]);

  return (
    <main>
      <div className="stars" aria-hidden="true" />
      <nav className="top-nav" aria-label="Navigation principale">
        <a className="nav-brand" href="#top">JE’DAII <span>HUB</span></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Ouvrir le menu">{menuOpen ? <X /> : <Menu />}</button>
        <div className={menuOpen ? "nav-links is-open" : "nav-links"}>
          <a href="#portails" onClick={() => setMenuOpen(false)}>Portails</a>
          <a href="#holonews" onClick={() => setMenuOpen(false)}>Holonews</a>
          <a href="#a-propos" onClick={() => setMenuOpen(false)}>À propos</a>
        </div>
      </nav>

      <section id="top" className="hero">
        <motion.button className="logo-orbit" onClick={() => setLogoClicks((v) => v + 1)} aria-label="Logo de la Forge Je’Daii" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7 }}>
          <span className="logo-glow" />
          <Image src="/images/logojapanforge.png" width={220} height={220} priority alt="Logo de la Forge Je’Daii" />
        </motion.button>
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15, duration: .65 }}>
          <span className="eyebrow"><Sparkles size={15} /> Le portail de la communauté</span>
          <h1>La Forge <span>Je’Daii</span></h1>
          <p className="hero-lead">Choisissez votre voie.</p>
          <p className="hero-pillars">Arts martiaux. <b>Mouvement.</b> Technologie. <b>Communauté.</b></p>
          <a className="primary-action" href="#portails">Explorer les portails <ArrowRight size={18} /></a>
        </motion.div>
      </section>

      <section id="portails" className="section-shell scroll-mt-24" aria-labelledby="portals-title">
        <div className="section-heading"><span className="eyebrow">Six voies · une communauté</span><h2 id="portals-title">Portails Je’Daii</h2><p>Tout l’univers Je’Daii, accessible en un regard.</p></div>
        <div className="portal-grid">
          {portals.map((portal, index) => {
            const Icon = portal.icon;
            return <motion.a key={portal.title} href={portal.href} target="_blank" rel="noreferrer" className={`portal-card ${portal.featured ? "featured" : ""}`} style={{ "--accent": portal.accent } as React.CSSProperties} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }}>
              <div className="portal-visual"><Image src="/images/both.png" alt="" fill sizes="(max-width: 768px) 100vw, 33vw" /></div>
              <div className="portal-content"><span className="portal-icon"><Icon size={23} /></span>{portal.featured && <span className="featured-label">Portail principal</span>}<h3>{portal.title}</h3><p>{portal.description}</p><span className="enter">Entrer <ArrowRight size={17} /></span></div>
            </motion.a>;
          })}
        </div>
      </section>

      <Holonews events={events} />

      <section id="a-propos" className="section-shell about scroll-mt-24"><div><span className="eyebrow">心・技・体 · Shin Gi Tai</span><h2>Plus qu’un dojo.<br />Un écosystème.</h2></div><p>La Forge Je’Daii relie arts martiaux, mouvement et technologies immersives. Un espace pour apprendre, progresser, transmettre et rencontrer une communauté animée par la même énergie.</p></section>

      <footer>
        <div className="footer-mark">心・技・体</div>
        <div className="footer-links"><a href="#portails">Portails</a><a href="#holonews">Holonews</a><a href="https://discord.gg/AjKM9vduNS" target="_blank" rel="noreferrer">Discord <ExternalLink size={13} /></a><a href="https://www.instagram.com/laforgejedaii/" target="_blank" rel="noreferrer"><Instagram size={14} /> Instagram</a></div>
        <p>© 2026 Forge Je&apos;Daii - Développé avec ❤️ par <a href="https://www.linkedin.com/in/lococoanthony/" target="_blank" rel="noreferrer">@jedaiidev</a></p>
      </footer>
      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} onChanged={refreshEvents} />
    </main>
  );
}
