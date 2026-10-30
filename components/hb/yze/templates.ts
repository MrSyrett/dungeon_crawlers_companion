// ─────────────────────────────────────────────────────────────────────────────
// ALIEN RPG template lists for the shared TemplatePicker (components/hb/
// TemplatePicker.tsx). Each loader turns the book's entries (lib/data/
// yze-alien-data.ts, the rows /yze/gear renders) into the STORED homebrew data
// shape (./rules.ts), so a template fills the builder through the same
// weaponFromData / gearFromData path an old record takes.
//
// Book weapons already are the stored yze-weapon shape. Gear and armor become
// yze-gear with `text` + `skillBonus`: an unconditional skill bonus written in
// the book's wording ("(Comtech +2)", "Electronic Tools: Comtech +1.", a suit's
// "−1 to Mobility" clause) becomes a bonus badge and leaves the text; anything
// situational ("Medical Aid +2 for giving first aid") stays as text.
// The book array is pulled in with dynamic import() inside each loader, so it
// is only fetched (as a separate chunk) when someone opens the picker.
// ─────────────────────────────────────────────────────────────────────────────
import type { TemplateOption } from "@/components/hb/TemplatePicker";
import { ALIEN_SKILLS, GEAR_CATEGORIES, type SkillBonus } from "./rules";

type Data = Record<string, unknown>;
const byName = (a: TemplateOption, b: TemplateOption) => a.name.localeCompare(b.name, "en");
const snip = (t: string, n = 80) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t);
const skillOf = (s: string) => ALIEN_SKILLS.find((k) => k.toLowerCase() === s.trim().toLowerCase());
const amt = (sign: string, n: string) => (sign === "+" ? 1 : -1) * Number(n);

/** "Comtech +2" / "Observation and Command +2" / "+2 to Mobility" / "−1 to Mobility" → bonuses, or null. */
function bonusClause(c: string): SkillBonus[] | null {
  const t = c.trim().replace(/\.$/, "");
  let m = /^(.+?)\s+([+\-−])(\d)$/.exec(t);
  if (m) {
    const skills = m[1].split(/\s*(?:,|\band\b)\s*/).map(skillOf);
    if (skills.length && skills.every(Boolean)) return skills.map((skill) => ({ skill: skill!, amount: amt(m![2], m![3]) }));
  }
  m = /^([+\-−])(\d)\s+to\s+(.+)$/.exec(t);
  const skill = m ? skillOf(m[3]) : undefined;
  return m && skill ? [{ skill, amount: amt(m[1], m[2]) }] : null;
}

/** Book effect text → builder text + bonus badges (only the plain, always-on bonuses). */
export function splitGearText(effect: string): { text: string; skillBonus: SkillBonus[] } {
  const e = effect.trim();
  const whole = bonusClause(e);
  if (whole) return { text: "", skillBonus: whole };
  const paren = /^([\s\S]*?)\s*\(([^()]+)\)(\.?)$/.exec(e);
  if (paren) {
    const b = bonusClause(paren[2]);
    if (b) return { text: paren[1] + paren[3], skillBonus: b };
  }
  // Comma-listed features (suit comments): lift the clauses that are a bare bonus.
  const parts = e.split(/\s*,\s*/);
  const bonuses: SkillBonus[] = [];
  const rest = parts.filter((p) => {
    const b = bonusClause(p);
    if (b) bonuses.push(...b);
    return !b;
  });
  return bonuses.length ? { text: rest.join(", "), skillBonus: bonuses } : { text: e, skillBonus: [] };
}

async function weapons(): Promise<TemplateOption[]> {
  const { ALIEN_WEAPONS } = await import("@/lib/data/yze-alien-data");
  const order = ["Pistol", "Rifle", "Heavy", "Close Combat"];
  return ALIEN_WEAPONS.map((w, i): TemplateOption => ({
    key: `${w.name}#${i}`,
    name: w.name,
    group: w.class || "Other",
    meta: [`${w.damage} dmg`, w.bonus ? `bonus ${w.bonus}` : "", w.range, w.special, w.cost].filter(Boolean).join(" · "),
    data: { name: w.name, class: w.class, skill: w.skill, bonus: w.bonus, damage: w.damage, range: w.range, ammo: w.ammo, special: w.special, cost: w.cost, weight: w.weight, desc: "" },
  })).sort((a, b) => (order.indexOf(a.group ?? "") + 1 || 99) - (order.indexOf(b.group ?? "") + 1 || 99));
}

async function gear(): Promise<TemplateOption[]> {
  const { ALIEN_GEAR, ALIEN_ARMOR } = await import("@/lib/data/yze-alien-data");
  const order: string[] = [...GEAR_CATEGORIES];
  const items = ALIEN_GEAR.map((g, i): TemplateOption => ({
    key: `${g.name}#${g.category}#${i}`,
    name: g.name,
    group: g.category,
    meta: [g.cost, g.supply, snip(g.effect)].filter(Boolean).join(" · "),
    data: { name: g.name, kind: "gear", category: g.category, weight: g.weight, cost: g.cost, supply: g.supply ?? "", ...splitGearText(g.effect) } as Data,
  })).sort((a, b) => (order.indexOf(a.group ?? "") + 1 || 99) - (order.indexOf(b.group ?? "") + 1 || 99) || byName(a, b));
  const armor = ALIEN_ARMOR.map((a, i): TemplateOption => ({
    key: `armor:${a.name}#${i}`,
    name: a.name,
    group: "Armor",
    meta: [`Armor ${a.rating}`, a.air !== "—" ? `Air ${a.air}` : "", a.cost, a.comment ? snip(a.comment, 60) : ""].filter(Boolean).join(" · "),
    data: { name: a.name, kind: "armor", category: "", weight: a.weight, cost: a.cost, supply: "", rating: a.rating, air: a.air, ...splitGearText(a.comment) } as Data,
  }));
  return [...items, ...armor];
}

const LOADERS: Record<string, () => Promise<TemplateOption[]>> = { "yze-weapon": weapons, "yze-gear": gear };

/** The book's entries for an Alien homebrew kind, lazily loaded (see header). */
export function yzeTemplates(kind: string): (() => Promise<TemplateOption[]>) | null {
  return LOADERS[kind] ?? null;
}
