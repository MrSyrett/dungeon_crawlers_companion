// ─────────────────────────────────────────────────────────────────────────────
// D6 System 2e template lists for the shared TemplatePicker (components/hb/
// TemplatePicker.tsx). Each loader turns the book's own entries (lib/data/
// d62e-*, the rows the /d62e reference pages render) into the STORED homebrew
// data shape for that kind — what the pages read back from a record — so a
// template fills the builder through the same legacy→draft path an old record
// takes (skillFromData / gearFromData / traitFromData / powerFromData /
// limitFromData / creatureFromData, whose *BuildFrom() parse the printed text
// — damage codes, costs, skill lines, Dodge/Parry — into the builder's pickers
// and keep anything they can't parse "as written"). The book rows already are
// that shape; only the page number is dropped (nulls become absent).
//
// Book arrays load with dynamic import() inside each loader (a separate chunk,
// fetched only when the picker opens).
// ─────────────────────────────────────────────────────────────────────────────
import type { TemplateOption } from "@/components/hb/TemplatePicker";
import { D62E_ALL_ATTRS, d6Code } from "./rules";

type Data = Record<string, unknown>;
const byName = (a: TemplateOption, b: TemplateOption) => a.name.localeCompare(b.name, "en");
const snip = (t: string, n = 70) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t);
const GENRE: Record<string, string> = { core: "Core", fantasy: "Fantasy", scifi: "Sci-Fi", superhero: "Superhero" };
const genre = (g: string) => GENRE[g] ?? g;
const cap = (t: string) => (t ? t[0].toUpperCase() + t.slice(1) : t);
/** Book row → stored data: drop the printed page and null/empty fields. */
const strip = (row: object): Data => {
  const out: Data = {};
  for (const [k, v] of Object.entries(row)) if (k !== "page" && v != null) out[k] = Array.isArray(v) ? [...v] : v && typeof v === "object" ? { ...v } : v;
  return out;
};
const inOrder = (list: TemplateOption[], order: string[]) =>
  list.sort((a, b) => order.indexOf(a.group ?? "") - order.indexOf(b.group ?? "") || byName(a, b));
const line = (...parts: (string | null | undefined)[]) => parts.filter(Boolean).join(" · ");

async function skills(): Promise<TemplateOption[]> {
  const { D62E_SKILLS } = await import("@/lib/data/d62e-skills");
  return inOrder(
    D62E_SKILLS.map((s, i): TemplateOption => ({
      key: `${s.name}#${s.attribute}#${s.genre}#${i}`, name: s.name, group: s.attribute,
      meta: line(s.attribute, genre(s.genre), s.time), data: strip(s),
    })),
    [...D62E_ALL_ATTRS],
  );
}

async function gear(): Promise<TemplateOption[]> {
  const { D62E_EQUIPMENT } = await import("@/lib/data/d62e-equipment");
  const LABEL: Record<string, string> = { weapon: "Weapons", armor: "Armor", gear: "Gear" };
  return inOrder(
    D62E_EQUIPMENT.map((e, i): TemplateOption => ({
      key: `${e.name}#${e.category}#${i}`, name: e.name, group: LABEL[e.category] ?? cap(e.category),
      meta: line(e.damage, e.protection, e.range, e.era, genre(e.genre), e.cost), data: strip(e),
    })),
    ["Weapons", "Armor", "Gear"],
  );
}

const KIND_LABEL: Record<string, string> = { perk: "Perks", flaw: "Flaws", talent: "Talents", asset: "Assets", trouble: "Troubles", superpower: "Superpowers", magic: "Magic", psionic: "Psionics" };

async function traits(): Promise<TemplateOption[]> {
  const { D62E_PERKS } = await import("@/lib/data/d62e-perks");
  return inOrder(
    D62E_PERKS.map((p, i): TemplateOption => ({
      key: `${p.name}#${p.kind}#${i}`, name: p.name, group: KIND_LABEL[p.kind] ?? cap(p.kind),
      meta: line(p.cost, genre(p.genre), snip(p.description, 50)), data: strip(p),
    })),
    ["Perks", "Flaws", "Talents", "Assets", "Troubles"],
  );
}

async function powers(): Promise<TemplateOption[]> {
  const { D62E_POWERS } = await import("@/lib/data/d62e-powers");
  return inOrder(
    D62E_POWERS.map((p, i): TemplateOption => ({
      key: `${p.name}#${p.kind}#${i}`, name: p.name, group: KIND_LABEL[p.kind] ?? cap(p.kind),
      meta: line(p.cost, p.skill, p.difficulty ? `Diff ${p.difficulty}` : "", genre(p.genre)), data: strip(p),
    })),
    ["Superpowers", "Magic", "Psionics"],
  );
}

async function limitations(): Promise<TemplateOption[]> {
  const { D62E_LIMITATIONS } = await import("@/lib/data/d62e-limitations");
  return D62E_LIMITATIONS.map((l, i): TemplateOption => ({
    key: `${l.name}#${i}`, name: l.name,
    meta: line(`−${l.value} cost`, snip(l.description, 60)), data: strip(l),
  })).sort(byName);
}

async function creatures(): Promise<TemplateOption[]> {
  const { D62E_CREATURES } = await import("@/lib/data/d62e-creatures");
  return inOrder(
    D62E_CREATURES.map((c, i): TemplateOption => {
      const attrs = Object.entries(c.attributes).slice(0, 4).map(([a, p]) => `${a.slice(0, 3)} ${d6Code(p)}`).join(" ");
      return { key: `${c.name}#${c.genre}#${i}`, name: c.name, group: genre(c.genre), meta: line(c.kind, attrs, c.move ? `Move ${c.move}` : ""), data: strip(c) };
    }),
    ["Core", "Fantasy", "Sci-Fi", "Superhero"],
  );
}

const LOADERS: Record<string, () => Promise<TemplateOption[]>> = {
  "d62e-skill": skills,
  "d62e-gear": gear,
  "d62e-trait": traits,
  "d62e-power": powers,
  "d62e-limitation": limitations,
  "d62e-creature": creatures,
};

/** The book's template loader for a d62e-* kind, or null when it has none. */
export const d62eBookTemplates = (kind: string): (() => Promise<TemplateOption[]>) | null => LOADERS[kind] ?? null;
