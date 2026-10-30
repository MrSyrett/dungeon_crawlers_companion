"use client";
// ── DCC builder data: skill / spell / buff names for the pickers ─────────────
// Loads the same /tools-data globals the sheet uses (DCC_SKILLS, DCC_SPELLS,
// DCC_BUFFS — `const` globals, read with an indirect eval like dcc-bonus.js)
// plus the user's own homebrew skills/spells, once per page, only when a
// builder that needs them opens. Keeps 200 KB of rulebook text out of the
// homebrew page bundle.
import { useEffect, useState } from "react";

export type NameMeta = { name: string; meta?: string };
/** `attacks` = every attack skill (book + homebrew) a weapon can use or a Damage
 *  Effect can work with — Damage Effects themselves excluded; meta = its group. */
export type DccNames = { skills: NameMeta[]; spells: NameMeta[]; buffs: NameMeta[]; attacks: NameMeta[] };

const EMPTY: DccNames = { skills: [], spells: [], buffs: [], attacks: [] };
let cache: Promise<DccNames> | null = null;

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
  try {
    return (0, eval)(`typeof ${name} !== "undefined" ? ${name} : undefined`);
  } catch {
    return undefined;
  }
}
const rows = (v: unknown): Record<string, unknown>[] => (Array.isArray(v) ? (v as Record<string, unknown>[]).filter((x) => x && x.name) : []);
async function hb(type: string): Promise<Record<string, unknown>[]> {
  try {
    const r = await fetch(`/api/homebrew?type=${type}`, { credentials: "same-origin" });
    if (!r.ok) return [];
    const j = (await r.json()) as { items?: { data?: Record<string, unknown> }[] };
    return rows((j.items ?? []).map((x) => x.data));
  } catch {
    return [];
  }
}

function load(): Promise<DccNames> {
  if (!cache) {
    cache = (async () => {
      await Promise.all(["/tools-data/dcc-skills.js", "/tools-data/dcc-spells.js", "/tools-data/dcc-buffs.js"].map(loadScript));
      const [hs, hp] = await Promise.all([hb("dcc-skill"), hb("dcc-spell")]);
      const uniq = (list: NameMeta[]) => list.filter((x, i) => list.findIndex((y) => y.name.toLowerCase() === x.name.toLowerCase()) === i);
      return {
        skills: uniq([...hs.map((s) => ({ name: String(s.name), meta: "homebrew" })), ...rows(global("DCC_SKILLS")).map((s) => ({ name: String(s.name), meta: String(s.stat ?? "") || undefined }))]),
        spells: uniq([...hp.map((s) => ({ name: String(s.name), meta: "homebrew" })), ...rows(global("DCC_SPELLS")).map((s) => ({ name: String(s.name), meta: s.mana != null ? `${s.mana} mana` : undefined }))]),
        buffs: uniq(rows(global("DCC_BUFFS")).map((s) => ({ name: String(s.name), meta: String(s.kind ?? "") || undefined }))),
        attacks: uniq([...hs, ...rows(global("DCC_SKILLS"))]
          .filter((s) => s.category === "attack" && String(s.group ?? "") !== "Damage Effect")
          .map((s) => ({ name: String(s.name), meta: String(s.group ?? "") || undefined }))),
      };
    })();
  }
  return cache;
}

export function useDccNames(): DccNames {
  const [v, setV] = useState<DccNames>(EMPTY);
  useEffect(() => {
    let live = true;
    load().then((x) => live && setV(x));
    return () => { live = false; };
  }, []);
  return v;
}
