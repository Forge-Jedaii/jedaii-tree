"use client";

import { CalendarDays, ChevronDown, ExternalLink, Radio, Satellite, ShieldCheck, Wifi } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { HolonewsEvent } from "../lib/holonews";

const DAY = 86_400_000;

function eventState(dateValue: string, createdAt: string) {
  const eventDate = new Date(`${dateValue}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.round((eventDate.getTime() - today.getTime()) / DAY);
  if (days < 0) return { label: "Passé", past: true };
  if (days === 0) return { label: "Aujourd’hui", past: false };
  if (days <= 7) return { label: "Cette semaine", past: false };
  if (Date.now() - new Date(createdAt).getTime() <= 7 * DAY) return { label: "Nouveau", past: false };
  return { label: null, past: false };
}

export default function Holonews({ events }: { events: HolonewsEvent[] }) {
  const [cursorPosition, setCursorPosition] = useState(0);
  const sorted = [...events].sort((a, b) => a.order_index - b.order_index || a.date.localeCompare(b.date));
  const upcoming = sorted.filter((event) => !eventState(event.date, event.created_at).past);
  const archived = sorted
    .filter((event) => eventState(event.date, event.created_at).past)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  useEffect(() => {
    const timer = window.setInterval(() => setCursorPosition((value) => (value + 1) % 4), 2800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="holonews" className="holonews-terminal scroll-mt-24" aria-labelledby="holonews-title">
      <div className="terminal-grid" aria-hidden="true" />
      <header className="terminal-header">
        <span className="terminal-kicker"><Radio size={14} /> Canal d’information // JDI-01</span>
        <h2 id="holonews-title">HOLO NEWS</h2>
        <p>Transmission réseau Je’Daii</p>
        <span className="terminal-beam" aria-hidden="true" />
      </header>

      <div className="terminal-status" aria-label="État du réseau">
        <span><i /> TRANSMISSION ACTIVE</span>
        <span><Wifi size={14} /> Réseau Je’Daii connecté</span>
        <span><ShieldCheck size={14} /> Signal sécurisé</span>
        <span className="sync">SYNC <b>100%</b></span>
      </div>

      <div className="terminal-prompt" aria-hidden="true">
        <motion.span animate={{ x: cursorPosition * 12 }} transition={{ duration: .35, ease: "easeOut" }}>&gt;</motion.span>
        <span> interrogation des transmissions</span><i>█</i>
      </div>

      <div className="transmission-timeline">
        {upcoming.map((event, index) => {
          const state = eventState(event.date, event.created_at);
          return (
            <motion.article
              key={event.id}
              className={`transmission ${state.past ? "is-past" : "is-upcoming"}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -28 : 28, filter: "blur(3px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: .55, delay: Math.min(index * .06, .24), ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="transmission-node" style={{ "--event-color": event.color } as React.CSSProperties}><i /></span>
              <div className="transmission-card" style={{ "--event-color": event.color } as React.CSSProperties}>
                <div className="transmission-topline"><span>TR-{String(event.id).padStart(4, "0")}</span><span>{state.past ? "ARCHIVE" : "REÇU"}</span></div>
                <div className="transmission-meta">
                  <span><CalendarDays size={15} />{new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${event.date}T12:00:00`))}</span>
                  {state.label && <strong>{state.label}</strong>}
                </div>
                <motion.span className="transmission-icon" whileHover={{ rotate: 8 }}><Satellite size={21} /></motion.span>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                {event.link ? <a href={event.link} target="_blank" rel="noreferrer">En savoir plus <ExternalLink size={14} /></a> : <span className="transmission-closed">Transmission complète</span>}
                <span className="corner-mark" aria-hidden="true" />
              </div>
            </motion.article>
          );
        })}
      </div>
      {archived.length > 0 && (
        <details className="archive-drawer">
          <summary>
            <span><Radio size={13} /> Archives récentes</span>
            <small>{archived.length} / 4 transmissions affichées</small>
            <ChevronDown className="archive-chevron" size={17} />
          </summary>
          <div className="archive-list">
            {archived.map((event, index) => (
              <motion.article key={event.id} className="archive-row" style={{ "--event-color": event.color } as React.CSSProperties} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .04 }}>
                <span className="archive-code">TR-{String(event.id).padStart(4, "0")}</span>
                <time dateTime={event.date}>{new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${event.date}T12:00:00`))}</time>
                <div><h3>{event.title}</h3><p>{event.description}</p></div>
                {event.link ? <a href={event.link} target="_blank" rel="noreferrer" aria-label={`En savoir plus sur ${event.title}`}><ExternalLink size={15} /></a> : <span className="archive-status">Passé</span>}
              </motion.article>
            ))}
          </div>
        </details>
      )}
      <div className="terminal-footerline"><span>JE’DAII NETWORK</span><span>{String(sorted.length).padStart(2, "0")} TRANSMISSION{sorted.length > 1 ? "S" : ""}</span></div>
    </section>
  );
}
