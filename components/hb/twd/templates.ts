// ─────────────────────────────────────────────────────────────────────────────
// THE WALKING DEAD UNIVERSE RPG template lists for the shared TemplatePicker
// (components/hb/TemplatePicker.tsx). Each loader turns the book's tables
// (lib/data/twd-data.ts, the rows /twd/gear renders) into the STORED homebrew
// data shape (./rules.ts), so a template fills the builder through the same
// weaponFromData / gearFromData path an old record takes (gear's "Scout +2"
// bonus text is parsed back into skill badges there).
//
// The book tables carry no noise / feature columns; the few the rulebook's
// weapon notes make obvious (thrown, automatic fire, scope, fire, loud guns)
// are filled in, the rest is left for the user.
// The book arrays are pulled in with dynamic import() inside each loader.
// ─────────────────────────────────────────────────────────────────────────────
import type { TemplateOption } from "@/components/hb/TemplatePicker";
import { SLOTS } from "./rules";

type Data = Record<string, unknown>;
const slotOr = (s: string) => ((SLOTS as readonly string[]).includes(s) ? s : "1");

function weaponExtras(name: string): Data {
  const n = name.toLowerCase();
  const features: string[] = [];
  if (/throwing|molotov|grenade/.test(n)) features.push("Thrown");
  if (/molotov/.test(n)) features.push("Fire");
  if (/machine gun|assault rifle/.test(n)) features.push("Automatic fire");
  if (/sniper/.test(n)) features.push("Scope");
  const out: Data = {};
  if (features.length) out.features = features;
  if (/pistol|revolver|gun|rifle|shotgun|launcher|cannon|grenade/.test(n)) out.noise = "Loud";
  else if (/bow|throwing knife/.test(n)) out.noise = "Quiet";
  return out;
}

async function weapons(): Promise<TemplateOption[]> {
  const { TWD_CLOSE_WEAPONS, TWD_RANGED_WEAPONS } = await import("@/lib/data/twd-data");
  const close = TWD_CLOSE_WEAPONS.map((w, i): TemplateOption => ({
    key: `close:${w.name}#${i}`,
    name: w.name,
    group: "Close combat",
    meta: `${w.damage} dmg · bonus ${w.bonus} · ${w.slots} slots`,
    data: { name: w.name, kind: "Close", bonus: w.bonus, damage: w.damage, range: "Close", slots: slotOr(w.slots), desc: "", ...weaponExtras(w.name) },
  }));
  const ranged = TWD_RANGED_WEAPONS.map((w, i): TemplateOption => ({
    key: `ranged:${w.name}#${i}`,
    name: w.name,
    group: "Ranged",
    meta: `${w.damage} dmg · bonus ${w.bonus} · ${w.range} · ${w.slots} slots`,
    data: { name: w.name, kind: "Ranged", bonus: w.bonus, damage: /^\d+$/.test(w.damage) ? Number(w.damage) : w.damage, range: w.range, slots: slotOr(w.slots), desc: "", ...weaponExtras(w.name) },
  }));
  return [...close, ...ranged];
}

async function gear(): Promise<TemplateOption[]> {
  const { TWD_GEAR, TWD_ARMOR } = await import("@/lib/data/twd-data");
  const items = TWD_GEAR.map((g, i): TemplateOption => ({
    key: `gear:${g.name}#${i}`,
    name: g.name,
    group: "General gear",
    meta: `${g.bonus === "—" ? "no bonus" : g.bonus} · ${g.slots} slots`,
    data: {
      name: g.name, kind: "gear", slots: slotOr(g.slots), bonus: g.bonus === "—" ? "" : g.bonus,
      desc: slotOr(g.slots) === g.slots ? "" : `Slots: ${g.slots}.`,
    },
  }));
  const armor = TWD_ARMOR.map((a, i): TemplateOption => ({
    key: `armor:${a.name}#${i}`,
    name: a.name,
    group: "Armor",
    meta: `Armor Level ${a.level} · Mobility ${a.penalty}`,
    data: { name: a.name, kind: "armor", slots: "1", bonus: "", desc: "", level: a.level, penalty: a.penalty },
  }));
  return [...items, ...armor];
}

const LOADERS: Record<string, () => Promise<TemplateOption[]>> = { "twd-weapon": weapons, "twd-gear": gear };

/** The book's entries for a TWD homebrew kind, lazily loaded (see header). */
export function twdTemplates(kind: string): (() => Promise<TemplateOption[]>) | null {
  return LOADERS[kind] ?? null;
}
