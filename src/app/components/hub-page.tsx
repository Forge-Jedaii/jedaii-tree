"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, Instagram, Menu, Sparkles, X } from "lucide-react";
import Holonews from "./holonews";
import AdminPanel from "./admin-panel";
import HeroTree from "./tree/hero-tree";
import { fallbackEvents, type HolonewsEvent } from "../lib/holonews";

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
          <a href="#holonews" onClick={() => setMenuOpen(false)}>Holonews</a>
          <a href="#a-propos" onClick={() => setMenuOpen(false)}>À propos</a>
        </div>
      </nav>

      <section id="top" className="hero">
        <motion.div className="hero-intro" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
          <button className="hero-brand-mark" onClick={() => setLogoClicks((v) => v + 1)} aria-label="Logo de la Forge Je’Daii">
            <Image src="/images/logojapanforge.png" width={72} height={72} priority alt="Logo de la Forge Je’Daii" />
          </button>
          <span className="eyebrow"><Sparkles size={15} /> Le portail de la communauté</span>
          <h1>Je’Daii <span>Tree</span></h1>
          <p className="hero-force">Plusieurs voies, une seule force.</p>
          <p className="hero-pillars">Arts martiaux. <b>Mouvement.</b> Technologie. <b>Communauté.</b></p>
        </motion.div>
        <HeroTree />
      </section>

      <Holonews events={events} />

      <section id="a-propos" className="section-shell about scroll-mt-24"><div><span className="eyebrow">心・技・体 · Shin Gi Tai</span><h2>Plus qu’un dojo.<br />Un écosystème.</h2></div><p>La Forge Je’daii relie arts martiaux, mouvement et technologies immersives. Un espace pour apprendre, progresser, transmettre et rencontrer une communauté animée par la même énergie.</p></section>

      <footer>
        <div className="footer-mark">心・技・体</div>
        <div className="footer-links"><a href="#holonews">Holonews</a><a href="https://discord.gg/AjKM9vduNS" target="_blank" rel="noreferrer">Discord <ExternalLink size={13} /></a><a href="https://www.instagram.com/forgejedaii/" target="_blank" rel="noreferrer"><Instagram size={14} /> Instagram</a></div>
        <p>© 2026 Forge Je&apos;daii - Développé avec ❤️ par <a href="https://www.linkedin.com/in/lococoanthony/" target="_blank" rel="noreferrer">@jedaiidev</a></p>
      </footer>
      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} onChanged={refreshEvents} />
    </main>
  );
}
