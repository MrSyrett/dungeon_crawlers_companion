// ─────────────────────────────────────────────────────────────────────────────
// ICRPG template lists for the shared TemplatePicker (components/hb/
// TemplatePicker.tsx). The book rows (lib/data/icrpg-*) are already the LEGACY
// stored homebrew shape for every icrpg-* kind — the builders' xxxFromData()
// read them directly (startingLoot "Name: desc" strings, loot desc leads + uses,
// effects → bonus badges, monster attack strings → attack rows, the first
// "+5 STR, +3 all others" ability line → stat bonuses). So each loader only
// adds group/meta and fixes the few casing differences.
//
// Book arrays load with dynamic import() inside each loader (a separate chunk,
// fetched only when the picker opens).
// ─────────────────────────────────────────────────────────────────────────────
import type { TemplateOption } from "@/components/hb/TemplatePicker";
import { ICRPG_WORLDS } from "./rules";

type Data = Record<string, unknown>;
const byName = (a: TemplateOption, b: TemplateOption) => a.name.localeCompare(b.name, "en");
const snip = (t: string, n = 90) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t);
const worldName = (k?: string) => ICRPG_WORLDS.find(([w]) => w === k)?.[1] ?? k ?? "Core";
const WORLD_ORDER = ICRPG_WORLDS.map(([, n]) => n);
const inOrder = (order: readonly string[]) => (a: TemplateOption, b: TemplateOption) =>
  order.indexOf(a.group ?? "") - order.indexOf(b.group ?? "") || byName(a, b);
const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

async function types(): Promise<TemplateOption[]> {
  const { ICRPG_TYPES } = await import("@/lib/data/icrpg-hero-types");
  return ICRPG_TYPES.map((t, i): TemplateOption => ({
    key: `${t.name}#${t.world}#${i}`,
    name: t.name,
    group: worldName(t.world),
    meta: [t.statFocus, t.abilities?.length ? `${t.abilities.length} abilities` : "", snip(t.desc, 70)].filter(Boolean).join(" · "),
    data: { ...t } as Data,
  })).sort(inOrder(WORLD_ORDER));
}

const ABILITY_ORDER = ["Ability", "Power", "Augment", "Mastery"];
async function abilities(): Promise<TemplateOption[]> {
  const { ICRPG_ABILITIES } = await import("@/lib/data/icrpg-abilities");
  return ICRPG_ABILITIES.filter((a) => !/^(Abilities|Powers|Augments)$/.test(a.name)).map((a, i): TemplateOption => {
    const kind = cap(a.kind);
    return {
      key: `${a.name}#${a.world}#${i}`,
      name: a.name,
      group: kind,
      meta: `${worldName(a.world)} · ${snip(a.desc, 70)}`,
      data: { ...a, kind } as Data,
    };
  }).sort(inOrder(ABILITY_ORDER));
}

async function loot(): Promise<TemplateOption[]> {
  const { ICRPG_LOOT } = await import("@/lib/data/icrpg-loot");
  return ICRPG_LOOT.map((l, i): TemplateOption => ({
    key: `${l.name}#${l.table}#${l.roll ?? ""}#${i}`,
    name: l.name,
    group: l.table,
    meta: [l.roll ? `#${l.roll}` : "", snip(l.desc, 80)].filter(Boolean).join(" · "),
    data: { ...l } as Data,
  })).sort((a, b) => (a.group ?? "").localeCompare(b.group ?? "", "en") || (parseInt(String(a.data.roll)) || 0) - (parseInt(String(b.data.roll)) || 0) || byName(a, b));
}

const GEAR_ORDER = ["gear", "tool", "weapon", "firearm", "armor"];
async function gear(): Promise<TemplateOption[]> {
  const { ICRPG_GEAR } = await import("@/lib/data/icrpg-gear");
  return ICRPG_GEAR.map((g, i): TemplateOption => ({
    key: `${g.name}#${g.world}#${i}`,
    name: g.name,
    group: cap(g.category),
    meta: `${worldName(g.world)} · ${snip(g.desc, 70)}`,
    data: { ...g } as Data,
  })).sort((a, b) => GEAR_ORDER.indexOf(String(a.data.category)) - GEAR_ORDER.indexOf(String(b.data.category)) || byName(a, b));
}

async function spells(): Promise<TemplateOption[]> {
  const { ICRPG_SPELLS } = await import("@/lib/data/icrpg-spells");
  return ICRPG_SPELLS.map((s, i): TemplateOption => ({
    key: `${s.name}#${s.school}#${i}`,
    name: s.name,
    group: s.school,
    meta: [s.target, s.effort, snip(s.desc, 60)].filter(Boolean).join(" · "),
    data: { ...s } as Data,
  })).sort((a, b) => (a.group ?? "").localeCompare(b.group ?? "", "en") || byName(a, b));
}

async function monsters(): Promise<TemplateOption[]> {
  const { ICRPG_MONSTERS } = await import("@/lib/data/icrpg-monsters");
  return ICRPG_MONSTERS.map((m, i): TemplateOption => ({
    key: `${m.name}#${m.world ?? ""}#${i}`,
    name: m.name,
    group: worldName(m.world),
    meta: [m.tier, m.hearts != null ? `${m.hearts} ♥` : "", m.attacks?.[0] ? snip(m.attacks[0], 50) : ""].filter(Boolean).join(" · "),
    data: { ...m } as Data,
  })).sort(inOrder(WORLD_ORDER));
}

const LOADERS: Record<string, () => Promise<TemplateOption[]>> = {
  "icrpg-type": types,
  "icrpg-ability": abilities,
  "icrpg-loot": loot,
  "icrpg-gear": gear,
  "icrpg-spell": spells,
  "icrpg-monster": monsters,
};

/** The book's entries for an icrpg-* kind (lazy), or null when the kind has none. */
export const icrpgTemplates = (kind: string): (() => Promise<TemplateOption[]>) | null => LOADERS[kind] ?? null;
