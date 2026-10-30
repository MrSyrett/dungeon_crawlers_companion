"use client";
// ── D&D builder data: names for the pickers ──────────────────────────────────
// Loads the same /tools-data globals the sheet uses (DND_SPELLS, DND_FEATS,
// DND_WEAPONS, DND_ARMOR, DND_GEAR — `const` globals read with an indirect eval) plus the
// user's own homebrew spells / feats / equipment, once per page, only when a
// builder that needs them opens. Keeps ~400 KB of rulebook data out of the
// homebrew page bundle.
import { useEffect, useState } from "react";

export type NameMeta = { name: string; meta?: string };
export type DndNames = { spells: NameMeta[]; feats: NameMeta[]; originFeats: string[]; weapons: NameMeta[]; armor: NameMeta[]; gear: NameMeta[] };

const EMPTY: DndNames = { spells: [], feats: [], originFeats: [], weapons: [], armor: [], gear: [] };
let cache: Promise<DndNames> | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve) => {
    if (document.querySelector(`script[data-hb-src="${src}"]`)) return resolve();
    const el = document.createElement("script");
    el.src = src;
    el.async = false;
    el.dataset.hbSrc = src;
    el.onload = () => resolve();
    el.onerror = () => resolve();
    document.head.appendChild(el);
  });
}
function global(name: string): unknown {
  try { return (0, eval)(`typeof ${name} !== "undefined" ? ${name} : undefined`); } catch { return undefined; }
}
type Row = Record<string, unknown>;
const rows = (v: unknown): Row[] => (Array.isArray(v) ? (v as Row[]).filter((x) => x && x.name) : []);
async function hb(type: string): Promise<Row[]> {
  try {
    const r = await fetch(`/api/homebrew?type=${type}`, { credentials: "same-origin" });
    if (!r.ok) return [];
    const j = (await r.json()) as { items?: { data?: Row }[] };
    return rows((j.items ?? []).map((x) => x.data));
  } catch { return []; }
}
const uniq = (list: NameMeta[]) => list.filter((x, i) => list.findIndex((y) => y.name.toLowerCase() === x.name.toLowerCase()) === i);
const lvl = (s: Row) => (Number(s.level) ? `Level ${s.level}` : "Cantrip") + (s.school ? ` · ${s.school}` : "");

function load(): Promise<DndNames> {
  if (!cache) {
    cache = (async () => {
      await Promise.all(["/tools-data/dnd-spells.js", "/tools-data/dnd-feats.js", "/tools-data/dnd-weapons.js", "/tools-data/dnd-armor.js", "/tools-data/dnd-gear.js"].map(loadScript));
      const [hs, hf, he] = await Promise.all([hb("dnd-spell"), hb("dnd-feat"), hb("dnd-equipment")]);
      const feats: Row[] = [...hf.map((f) => ({ ...f, _hb: true })), ...rows(global("DND_FEATS"))];
      return {
        spells: uniq([...hs.map((s) => ({ name: String(s.name), meta: "homebrew · " + lvl(s) })), ...rows(global("DND_SPELLS")).map((s) => ({ name: String(s.name), meta: lvl(s) }))]),
        feats: uniq(feats.map((f) => ({ name: String(f.name), meta: (f._hb ? "homebrew · " : "") + String(f.category ?? "") }))),
        originFeats: uniq(feats.filter((f) => f.category === "Origin").map((f) => ({ name: String(f.name) }))).map((f) => f.name),
        weapons: uniq([...he.filter((e) => e.hbKind === "weapon").map((w) => ({ name: String(w.name), meta: "homebrew" })), ...rows(global("DND_WEAPONS")).map((w) => ({ name: String(w.name), meta: `${w.category} ${w.kind}` }))]),
        gear: uniq([...he.filter((e) => e.hbKind === "gear").map((g) => ({ name: String(g.name), meta: "homebrew" })), ...rows(global("DND_GEAR")).map((g) => ({ name: String(g.name), meta: String(g.category ?? "") }))]),
        armor: uniq([...he.filter((e) => e.hbKind === "armor" && e.category !== "Shield").map((a) => ({ name: String(a.name), meta: "homebrew" })), ...rows(global("DND_ARMOR")).filter((a) => a.category !== "Shield").map((a) => ({ name: String(a.name), meta: String(a.category) }))]),
      };
    })();
  }
  return cache;
}

export function useDndNames(): DndNames {
  const [v, setV] = useState<DndNames>(EMPTY);
  useEffect(() => {
    let live = true;
    load().then((x) => live && setV(x));
    return () => { live = false; };
  }, []);
  return v;
}
