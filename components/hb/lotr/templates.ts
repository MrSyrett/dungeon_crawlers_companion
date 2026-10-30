// ─────────────────────────────────────────────────────────────────────────────
// The Lord of the Rings 5E template lists for the shared TemplatePicker
// (components/hb/TemplatePicker.tsx). The book rows (lib/data/lotr-data) are
// the very shapes the lotr-* homebrew kinds store (LotrVirtue / LotrBackground
// / LotrWeapon / LotrGear / LotrMonster), so each loader hands the row (minus
// its `source`) to the builder's xxxFromData() — the same legacy→draft path an
// old record takes: monster actions parse into attack rows / Strike Fear,
// weapon "Versatile (1d10)" / "5 SP" / "3 lb" strings into the pickers, virtue
// mods / grants into effect badges.
//
// lotr-data is one big module; it is pulled in with dynamic import() inside
// the loaders so it's only fetched (as a separate chunk) when the picker opens.
// ─────────────────────────────────────────────────────────────────────────────
import type { TemplateOption } from "@/components/hb/TemplatePicker";

type Data = Record<string, unknown>;
const snip = (t: string, n = 90) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t);
const bookRow = (row: object): Data => {
  const { source: _source, ...rest } = row as Data;
  void _source;
  return rest;
};
const byOrder = (order: readonly string[]) => (a: TemplateOption, b: TemplateOption) =>
  (order.indexOf(a.group ?? "") + 1 || 99) - (order.indexOf(b.group ?? "") + 1 || 99) || a.name.localeCompare(b.name, "en");
const crVal = (cr: string) => (cr.includes("/") ? Number(cr.split("/")[0]) / Number(cr.split("/")[1]) : Number(cr) || 0);

// The /lotr pages' own facet orders.
const MONSTER_GROUPS = ["Evil Men", "Orcs", "Trolls", "Undead", "Wolves", "Folk of Eriador", "Beasts", "Other"];
const WEAPON_GROUPS = ["Simple Melee", "Simple Ranged", "Martial Melee", "Martial Ranged"];
const GEAR_GROUPS = ["Adventuring Gear", "Artisan's Tools", "Gaming Set", "Musical Instrument", "Other Tools", "Pipe-weed"];

async function virtues(): Promise<TemplateOption[]> {
  const { LOTR_VIRTUES, LOTR_CULTURES } = await import("@/lib/data/lotr-data");
  const order = ["Common", ...LOTR_CULTURES.map((c) => c.name)];
  return LOTR_VIRTUES.map((v, i): TemplateOption => ({
    key: `${v.name}#${v.category}#${i}`,
    name: v.name,
    group: v.category,
    meta: [v.uses, v.asi?.choose?.length ? `+1 ${v.asi.choose.join("/")}` : "", snip(v.benefits[0] ?? "", 70)].filter(Boolean).join(" · "),
    data: bookRow(v),
  })).sort(byOrder(order));
}

async function backgrounds(): Promise<TemplateOption[]> {
  const { LOTR_BACKGROUNDS, LOTR_CULTURES } = await import("@/lib/data/lotr-data");
  const order = LOTR_CULTURES.map((c) => c.name);
  return LOTR_BACKGROUNDS.map((b, i): TemplateOption => ({
    key: `${b.name}#${b.culture}#${i}`,
    name: b.name,
    group: b.culture,
    meta: [b.skillProficiencies.join(", ") || (b.skillChoice ? `Choose ${b.skillChoice.count}` : ""), b.toolProficiencies[0] ?? "", b.distinctiveFeatures.join(", ")].filter(Boolean).join(" · "),
    data: bookRow(b),
  })).sort(byOrder(order));
}

async function weapons(): Promise<TemplateOption[]> {
  const { LOTR_WEAPONS } = await import("@/lib/data/lotr-data");
  return LOTR_WEAPONS.map((w, i): TemplateOption => ({
    key: `${w.name}#${i}`,
    name: w.name,
    group: `${w.category} ${w.kind}`,
    meta: [`${w.damage} ${w.damageType}`, w.properties.join(", "), w.cost].filter(Boolean).join(" · "),
    data: bookRow(w),
  })).sort(byOrder(WEAPON_GROUPS));
}

async function gear(): Promise<TemplateOption[]> {
  const { LOTR_GEAR } = await import("@/lib/data/lotr-data");
  return LOTR_GEAR.map((g, i): TemplateOption => ({
    key: `${g.name}#${g.category}#${i}`,
    name: g.name,
    group: g.category,
    meta: [g.cost, g.weight, g.description ? snip(g.description, 60) : ""].filter(Boolean).join(" · "),
    data: bookRow(g),
  })).sort(byOrder(GEAR_GROUPS));
}

async function monsters(): Promise<TemplateOption[]> {
  const { LOTR_MONSTERS } = await import("@/lib/data/lotr-data");
  return LOTR_MONSTERS.map((m, i): TemplateOption => ({
    key: `${m.name}#${i}`,
    name: m.name,
    group: m.group || "Other",
    meta: `CR ${m.cr} · AC ${m.ac} · HP ${m.hp} · ${m.size} ${m.type}`,
    data: bookRow(m),
  })).sort((a, b) =>
    (MONSTER_GROUPS.indexOf(a.group ?? "") + 1 || 99) - (MONSTER_GROUPS.indexOf(b.group ?? "") + 1 || 99)
    || crVal(String(a.data.cr)) - crVal(String(b.data.cr)) || a.name.localeCompare(b.name, "en"));
}

const LOADERS: Record<string, () => Promise<TemplateOption[]>> = {
  "lotr-virtue": virtues, "lotr-background": backgrounds, "lotr-weapon": weapons, "lotr-gear": gear, "lotr-monster": monsters,
};

/** The book's entries for a lotr-* homebrew kind, lazily loaded (see header). */
export function lotrTemplates(kind: string): (() => Promise<TemplateOption[]>) | null {
  return LOADERS[kind] ?? null;
}
