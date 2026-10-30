// ─────────────────────────────────────────────────────────────────────────────
// VAESEN template lists for the shared TemplatePicker (components/hb/
// TemplatePicker.tsx). Each loader turns the book's tables (lib/data/
// vae-data.ts, the rows /vae/gear renders) into the STORED homebrew data shape
// (./rules.ts), so a template fills the builder through the same
// weaponFromData / gearFromData path an old record takes.
//
// Weapons and plain gear are already the legacy shapes ({bonus, cost, desc}:
// gearFromData reads "+2" + the skill named in the use text as a skill badge).
// Armor's "Agility -1, Cost 2 (e.g. …)" comment becomes Protection / penalty /
// cost; Items of Power lift a leading "+2 to resist Curses from trolls" into
// the resistance badges (the rest stays the effect); magic items keep effect +
// risk as written.
// The book arrays are pulled in with dynamic import() inside each loader.
// ─────────────────────────────────────────────────────────────────────────────
import type { TemplateOption } from "@/components/hb/TemplatePicker";
import { RESIST_AGAINST } from "./rules";

type Data = Record<string, unknown>;
const snip = (t: string, n = 80) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t);
const costTxt = (c: number | string) => (typeof c === "number" ? String(c) : /^\d+$/.test(c) ? c : "");
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

async function weapons(): Promise<TemplateOption[]> {
  const { VAE_MELEE_WEAPONS, VAE_RANGED_WEAPONS } = await import("@/lib/data/vae-data");
  const row = (group: string) => (w: { name: string; damage: number; range: number | string; bonus: string; cost: number | string; skill: string }, i: number): TemplateOption => {
    const features = /spear/i.test(w.name) ? ["Thrown"] : []; // the book's one thrown weapon
    const data: Data = { name: w.name, skill: w.skill, bonus: w.bonus, damage: w.damage, range: String(w.range), cost: costTxt(w.cost), desc: "" };
    if (features.length) data.features = features;
    return {
      key: `${group}:${w.name}#${i}`, name: w.name, group,
      meta: [w.skill, `${w.damage} dmg`, `range ${w.range}`, w.bonus !== "—" ? `bonus ${w.bonus}` : "", costTxt(w.cost) ? `cost ${w.cost}` : ""].filter(Boolean).join(" · "),
      data,
    };
  };
  return [...VAE_MELEE_WEAPONS.map(row("Melee")), ...VAE_RANGED_WEAPONS.map(row("Ranged"))];
}

/** "+2 to resist Curses from trolls. An arc-shaped pendant." → resist badge + the rest as effect. */
function powerData(name: string, effect: string): Data {
  const m = /^\+(\d)\s+(?:to resist|defense against)\s+(\w+)(?:\s+from\s+(\w+))?\s*\.?\s*([\s\S]*)$/i.exec(effect.trim());
  const against = m ? RESIST_AGAINST.find((a) => a.toLowerCase() === m[2].toLowerCase()) : undefined;
  if (!m || !against) return { name, kind: "power", bonus: "", cost: "", desc: "", skillBonus: [], effect };
  const out: Data = { name, kind: "power", bonus: "", cost: "", desc: "", skillBonus: [], effect: cap(m[4].trim()), resist: [{ against, amount: Number(m[1]) }] };
  if (m[3]) out.resistFrom = m[3];
  return out;
}

async function gear(): Promise<TemplateOption[]> {
  const { VAE_GEAR, VAE_ARMOR, VAE_MAGIC } = await import("@/lib/data/vae-data");
  const tools = VAE_GEAR.map((g, i): TemplateOption => ({
    key: `gear:${g.name}#${i}`, name: g.name, group: "Gear",
    meta: [g.bonus !== "—" ? g.bonus : "", costTxt(g.cost) ? `cost ${g.cost}` : "", g.comment].filter(Boolean).join(" · "),
    // Legacy shape on purpose (no kind): gearFromData turns "+2" + the skill in the use text into a badge.
    data: { name: g.name, bonus: g.bonus, cost: costTxt(g.cost), desc: g.comment },
  }));
  const armor = VAE_ARMOR.map((a, i): TemplateOption => {
    const pen = /Agility\s*[-−](\d)/i.exec(a.comment);
    const cost = /Cost\s*(\d)/i.exec(a.comment);
    const note = /\((.+)\)/.exec(a.comment);
    return {
      key: `armor:${a.name}#${i}`, name: a.name, group: "Armor", meta: `Protection ${a.protection} · ${a.comment}`,
      data: { name: a.name, kind: "armor", bonus: "", skillBonus: [], rating: a.protection, penalty: pen ? Number(pen[1]) : 0, cost: cost ? cost[1] : "", desc: note ? cap(note[1].trim()) : "" },
    };
  });
  const power = VAE_MAGIC.itemsOfPower.map((p, i): TemplateOption => ({
    key: `power:${p.name}#${i}`, name: p.name, group: "Items of Power", meta: snip(p.effect), data: powerData(p.name, p.effect),
  }));
  const magic = VAE_MAGIC.magicItems.map((m, i): TemplateOption => ({
    key: `magic:${m.name}#${i}`, name: m.name, group: "Magic Items", meta: snip(m.effect),
    data: { name: m.name, kind: "magic", bonus: "", cost: "", desc: "", skillBonus: [], effect: m.effect, risk: m.risk },
  }));
  return [...tools, ...armor, ...power, ...magic];
}

const LOADERS: Record<string, () => Promise<TemplateOption[]>> = { "vae-weapon": weapons, "vae-gear": gear };

/** The book's entries for a Vaesen homebrew kind, lazily loaded (see header). */
export function vaeTemplates(kind: string): (() => Promise<TemplateOption[]>) | null {
  return LOADERS[kind] ?? null;
}
