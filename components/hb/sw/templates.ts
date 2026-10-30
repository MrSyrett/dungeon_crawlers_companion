// ─────────────────────────────────────────────────────────────────────────────
// Star Wars (WEG d6) template lists for the shared TemplatePicker (components/
// hb/TemplatePicker.tsx). Every sw-* kind STORES the book shape (lib/data/
// sw-types: SwWeapon, SwGear, SwForcePower, SwCharacter) — old records have no
// `build` — so a book row goes straight through the builders' xxxFromData()
// (weaponBuildFrom / gearBuildFrom / forceBuildFrom / charBuildFrom parse the
// printed damage, range bands, armor code, difficulty prose and "skill 4D"
// lines; anything that doesn't re-compose exactly stays as editable text). The
// loaders only add group/meta and drop the page bookkeeping (`page`, and the
// `superseded` core entry folded under a Rules Companion revision).
// Book arrays load with dynamic import() inside each loader.
// ─────────────────────────────────────────────────────────────────────────────
import type { TemplateOption } from "@/components/hb/TemplatePicker";

type Data = Record<string, unknown>;
const byName = (a: TemplateOption, b: TemplateOption) => a.name.localeCompare(b.name, "en");
const snip = (t: string, n = 90) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t);
const DROP = new Set(["page", "superseded", "homebrew"]);
const bookRow = (r: object): Data => Object.fromEntries(Object.entries(r).filter(([k]) => !DROP.has(k)));
/** Pips → "4D+2". */
const code = (p: number | null | undefined) => (p == null ? "" : `${Math.floor(p / 3)}D${p % 3 ? `+${p % 3}` : ""}`);
/** Group order = first appearance in the book list (the page builds its chips the same way). */
function inBookOrder(list: TemplateOption[]): TemplateOption[] {
  const order: string[] = [];
  for (const o of list) if (o.group && !order.includes(o.group)) order.push(o.group);
  return list.sort((a, b) => order.indexOf(a.group ?? "") - order.indexOf(b.group ?? "") || byName(a, b));
}
const RC = (book: string) => (book === "companion" ? "RC" : "");

async function weapons(): Promise<TemplateOption[]> {
  const { SW_WEAPONS } = await import("@/lib/data/sw-weapons");
  return inBookOrder(SW_WEAPONS.map((w, i): TemplateOption => ({
    key: `${w.name}#${w.kind}#${w.book}#${i}`,
    name: w.name,
    group: `${w.kind} weapons`,
    meta: [w.damageText || code(w.damage), w.range, w.skill, w.cost ? `${w.cost} cr` : "", RC(w.book)].filter(Boolean).join(" · "),
    data: bookRow(w),
  })));
}

async function gear(): Promise<TemplateOption[]> {
  const { SW_GEAR } = await import("@/lib/data/sw-gear");
  return inBookOrder(SW_GEAR.map((g, i): TemplateOption => ({
    key: `${g.name}#${g.category}#${g.book}#${i}`,
    name: g.name,
    group: g.category,
    meta: [g.stats, g.cost ? `${g.cost} cr` : "", snip(g.description, 60), RC(g.book)].filter(Boolean).join(" · "),
    data: bookRow(g),
  })));
}

const FORCE_ORDER = ["Control", "Sense", "Alter", "Control & Sense", "Control & Alter", "Sense & Alter", "Control, Sense & Alter"];
async function force(): Promise<TemplateOption[]> {
  const { SW_FORCE } = await import("@/lib/data/sw-force");
  const r = (g?: string) => (FORCE_ORDER.includes(g ?? "") ? FORCE_ORDER.indexOf(g ?? "") : FORCE_ORDER.length);
  return SW_FORCE.map((f, i): TemplateOption => ({
    key: `${f.name}#${f.book}#${i}`,
    name: f.name,
    group: f.attribute,
    meta: [snip(f.difficulty, 60), f.time, f.requires?.length ? `requires ${f.requires.join(", ")}` : "", RC(f.book)].filter(Boolean).join(" · "),
    data: bookRow(f),
  })).sort((a, b) => r(a.group) - r(b.group) || byName(a, b));
}

async function characters(): Promise<TemplateOption[]> {
  const { SW_CHARACTERS } = await import("@/lib/data/sw-characters");
  return inBookOrder(SW_CHARACTERS.map((c, i): TemplateOption => ({
    key: `${c.name}#${c.group}#${c.book}#${i}`,
    name: c.name,
    group: c.group,
    meta: [Object.entries(c.attributes).slice(0, 3).map(([k, v]) => `${k.slice(0, 3).toUpperCase()} ${code(v)}`).join(" "), c.skills.length ? `${c.skills.length} skills` : "", RC(c.book)].filter(Boolean).join(" · "),
    data: bookRow(c),
  })));
}

const LOADERS: Record<string, () => Promise<TemplateOption[]>> = {
  "sw-weapon": weapons,
  "sw-gear": gear,
  "sw-force": force,
  "sw-character": characters,
};

/** The book's entries for a sw-* kind (lazy), or null when the kind has none. */
export const swTemplates = (kind: string): (() => Promise<TemplateOption[]>) | null => LOADERS[kind] ?? null;
