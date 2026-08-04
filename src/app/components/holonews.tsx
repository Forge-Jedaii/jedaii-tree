"use client";

import { CalendarDays, ExternalLink, Radio } from "lucide-react";
import { motion } from "motion/react";
import type { HolonewsEvent } from "../lib/holonews";

const DAY = 86_400_000;

function eventState(dateValue: string, createdAt: string) {
  const eventDate = new Date(`${dateValue}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.round((eventDate.getTime() - today.getTime()) / DAY);
  if (days === 0) return { label: "Aujourd’hui", past: false };
  if (days > 0 && days <= 7) return { label: "Cette semaine", past: false };
  if (Date.now() - new Date(createdAt).getTime() <= 7 * DAY) return { label: "Nouveau", past: days < 0 };
  return { label: null, past: days < 0 };
}

export default function Holonews({ events }: { events: HolonewsEvent[] }) {
  const sorted = [...events].sort((a, b) => a.order_index - b.order_index || a.date.localeCompare(b.date));
  return (
    <section id="holonews" className="section-shell scroll-mt-24" aria-labelledby="holonews-title">
      <div className="section-heading">
        <span className="eyebrow"><Radio size={15} /> Transmission active</span>
        <h2 id="holonews-title">Holonews</h2>
        <p>Les prochains rendez-vous de la communauté Je’Daii.</p>
      </div>
      <div className="timeline">
        {sorted.map((event, index) => {
          const state = eventState(event.date, event.created_at);
          return (
            <motion.article
              key={event.id}
              className={`timeline-item ${state.past ? "is-past" : ""}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.07, 0.25) }}
            >
              <span className="timeline-dot" style={{ "--event-color": event.color } as React.CSSProperties} />
              <div className="event-card" style={{ "--event-color": event.color } as React.CSSProperties}>
                <div className="event-meta">
                  <span><CalendarDays size={16} />{new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${event.date}T12:00:00`))}</span>
                  {state.label && <strong>{state.label}</strong>}
                </div>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                {event.link && <a href={event.link} target="_blank" rel="noreferrer">En savoir plus <ExternalLink size={15} /></a>}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
