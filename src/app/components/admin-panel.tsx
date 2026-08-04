"use client";

import { useEffect, useState } from "react";
import { GripVertical, Pencil, Plus, Trash2, X } from "lucide-react";
import type { HolonewsEvent } from "../lib/holonews";

const empty = { date: "", title: "", description: "", color: "#38bdf8", link: "", order_index: 0, published: true };

export default function AdminPanel({ open, onClose, onChanged }: { open: boolean; onClose: () => void; onChanged: () => Promise<void> }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [events, setEvents] = useState<HolonewsEvent[]>([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<number | null>(null);

  const load = async () => { const r = await fetch("/api/holonews?admin=1"); if (r.ok) { setEvents(await r.json()); setAuthenticated(true); } };
  useEffect(() => { if (open) void load(); }, [open]);
  if (!open) return null;

  const login = async (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    const r = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    if (!r.ok) {
      setPassword("");
      return setError(r.status === 503
        ? "La configuration administrateur manque sur ce serveur. Ajoutez les variables d’environnement puis redémarrez-le."
        : "Adresse e-mail ou mot de passe incorrect.");
    }
    setPassword(""); await load();
  };
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? "PATCH" : "POST";
    const r = await fetch("/api/holonews", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing ? { ...form, id: editing } : form) });
    if (!r.ok) return setError(r.status === 503
      ? "Stockage non configuré. Connectez un espace Vercel Blob au projet puis redéployez."
      : "Enregistrement impossible. Réessayez dans quelques instants.");
    setForm(empty); setEditing(null); await load(); await onChanged();
  };
  const remove = async (id: number) => { if (!confirm("Supprimer cet événement ?")) return; await fetch(`/api/holonews?id=${id}`, { method: "DELETE" }); await load(); await onChanged(); };
  const edit = (item: HolonewsEvent) => { setEditing(item.id); setForm({ date: item.date, title: item.title, description: item.description, color: item.color, link: item.link || "", order_index: item.order_index, published: item.published }); };

  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Administration Holonews"><div className="admin-modal"><button className="modal-close" onClick={onClose} aria-label="Fermer"><X /></button>
    {!authenticated ? <form className="login-form" onSubmit={login}><span className="eyebrow">Accès restreint</span><h2>Console Je’Daii</h2><label>Adresse e-mail<input autoFocus type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required /></label><label>Mot de passe<input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>{error && <p className="form-error">{error}</p>}<button className="primary-action" type="submit">S’identifier</button></form> : <>
      <div className="admin-header"><div><span className="eyebrow">Console sécurisée</span><h2>Holonews</h2></div></div>
      <form className="event-form" onSubmit={save}><input aria-label="Titre" placeholder="Titre" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /><input aria-label="Date" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required /><textarea aria-label="Description" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required /><input aria-label="Lien" type="url" placeholder="Lien (facultatif)" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} /><label>Couleur <input type="color" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} /></label><label>Ordre <input type="number" value={form.order_index} onChange={e => setForm({ ...form, order_index: Number(e.target.value) })} /></label><label className="check"><input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} /> Publié</label><button className="admin-save" type="submit">{editing ? <Pencil size={16} /> : <Plus size={16} />}{editing ? "Modifier" : "Ajouter"}</button></form>
      {error && <p className="form-error">{error}</p>}<div className="admin-list">{events.map(item => <div key={item.id}><GripVertical size={17} /><span><b>{item.title}</b><small>{item.date} · ordre {item.order_index}</small></span><button onClick={() => edit(item)} aria-label={`Modifier ${item.title}`}><Pencil size={17} /></button><button onClick={() => remove(item.id)} aria-label={`Supprimer ${item.title}`}><Trash2 size={17} /></button></div>)}</div>
    </>}
  </div></div>;
}
