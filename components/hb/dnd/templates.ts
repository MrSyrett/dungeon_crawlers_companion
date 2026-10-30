// ─────────────────────────────────────────────────────────────────────────────
// D&D 2024 template lists for the shared TemplatePicker (components/hb/
// TemplatePicker.tsx). Every dnd-* homebrew kind stores the book's own record
// shape (DndSpell / DndMonster / DndFeat / DndBackground / DndSpecies /
// DndSubclass, and DndWeapon / DndArmor / DndGear / DndMagicItem + `hbKind` for
// dnd-equipment), so each loader hands the book row (minus `source`) to the
// builder's xxxFromData() — the same legacy→draft path an old record takes:
// spell casting time / range / components / duration strings parse into the
// pickers, monster actions into attack rows, feat prerequisites into the
// structured prerequisite, background equipment into items + gold.
//
// The books are pulled in with dynamic import() inside each loader, so they're
// only fetched (as a separate chunk) when someone opens the picker.
// ─────────────────────────────────────────────────────────────────────────────
import type { TemplateOption } from "@/components/hb/TemplatePicker";
import { FEAT_CATEGORIES } from "./rules";

type Data = Record<string, unknown>;
const snip = (t: string, n = 90) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t);
const bookRow = (row: object, extra: Data = {}): Data => {
  const { source: _source, ...rest } = row as Data;
  void _source;
  return { ...rest, ...extra };
};
const SRC_LABEL: Record<string, string> = { "arcana-unleashed": "Arcana Unleashed", eberron: "Eberron" };
const srcGroup = (source?: string) => SRC_LABEL[source ?? ""] ?? "Core";
const SRC_ORDER = ["Core", "Arcana Unleashed", "Eberron"];
const byOrder = (order: readonly string[]) => (a: TemplateOption, b: TemplateOption) =>
  (order.indexOf(a.group ?? "") + 1 || 99) - (order.indexOf(b.group ?? "") + 1 || 99) || a.name.localeCompare(b.name, "en");
const crVal = (cr: string) => (cr.includes("/") ? Number(cr.split("/")[0]) / Number(cr.split("/")[1]) : Number(cr) || 0);
const sizeText = (s: string | string[]) => ([] as string[]).concat(s).join(" or ");

// ── Equipment (one kind, four page views) ───────────────────────────────────
const EQUIP_GROUPS = ["Weapons", "Armor", "Gear", "Magic items"];
async function equipment(): Promise<TemplateOption[]> {
  const [{ DND_WEAPONS }, { DND_ARMOR }, { DND_GEAR }, { DND_MAGIC_ITEMS }] = await Promise.all([
    import("@/lib/data/dnd-weapons"), import("@/lib/data/dnd-armor"), import("@/lib/data/dnd-gear"), import("@/lib/data/dnd-magic-items"),
  ]);
  const out: TemplateOption[] = [
    ...DND_WEAPONS.map((w, i): TemplateOption => ({
      key: `w:${w.name}#${i}`, name: w.name, group: "Weapons",
      meta: [`${w.category} ${w.kind}`, `${w.damage} ${w.damageType}`, w.properties.join(", "), w.mastery, w.cost].filter(Boolean).join(" · "),
      data: bookRow(w, { hbKind: "weapon" }),
    })),
    ...DND_ARMOR.map((a, i): TemplateOption => ({
      key: `a:${a.name}#${i}`, name: a.name, group: "Armor",
      meta: [a.category, `AC ${a.baseAC}`, a.strength && a.strength !== "—" ? `STR ${a.strength}` : "", a.stealthDisadvantage ? "Stealth disadv." : "", a.cost].filter(Boolean).join(" · "),
      data: bookRow(a, { hbKind: "armor" }),
    })),
    ...DND_GEAR.map((g, i): TemplateOption => ({
      key: `g:${g.name}#${i}`, name: g.name, group: "Gear",
      meta: [g.category, g.cost, g.weight].filter(Boolean).join(" · "),
      data: bookRow(g, { hbKind: "gear" }),
    })),
    ...DND_MAGIC_ITEMS.map((m, i): TemplateOption => ({
      key: `m:${m.name}#${i}`, name: m.name, group: "Magic items",
      meta: [m.type, m.rarity, m.attunement ? "Attunement" : ""].filter(Boolean).join(" · "),
      data: bookRow(m, { hbKind: "magic" }),
    })),
  ];
  return out.sort(byOrder(EQUIP_GROUPS));
}

async function feats(): Promise<TemplateOption[]> {
  const { DND_FEATS } = await import("@/lib/data/dnd-feats");
  return DND_FEATS.map((f, i): TemplateOption => ({
    key: `${f.name}#${i}`, name: f.name, group: f.category,
    meta: [f.prerequisite, f.abilityScores?.length ? `+1 ${f.abilityScores.join("/")}` : "", f.benefits[0] ? snip(f.benefits[0], 70) : ""].filter(Boolean).join(" · "),
    data: bookRow(f),
  })).sort(byOrder(FEAT_CATEGORIES));
}

async function backgrounds(): Promise<TemplateOption[]> {
  const { DND_BACKGROUNDS } = await import("@/lib/data/dnd-backgrounds");
  return DND_BACKGROUNDS.map((b, i): TemplateOption => ({
    key: `${b.name}#${i}`, name: b.name, group: srcGroup(b.source),
    meta: [b.abilityScores.join("/"), b.feat, b.skillProficiencies.join(", ")].filter(Boolean).join(" · "),
    data: bookRow(b),
  })).sort(byOrder(SRC_ORDER));
}

async function spells(): Promise<TemplateOption[]> {
  const { DND_SPELLS } = await import("@/lib/data/dnd-spells");
  const lvl = (n: number) => (n ? `Level ${n}` : "Cantrips");
  return DND_SPELLS.map((s, i): TemplateOption => ({
    key: `${s.name}#${i}`, name: s.name, group: lvl(s.level),
    meta: [s.school, s.castingTime, s.range, s.classes.join(", ")].filter(Boolean).join(" · "),
    data: bookRow(s),
  })).sort((a, b) => (Number(a.data.level) || 0) - (Number(b.data.level) || 0) || a.name.localeCompare(b.name, "en"));
}

async function species(): Promise<TemplateOption[]> {
  const { DND_SPECIES } = await import("@/lib/data/dnd-species");
  return DND_SPECIES.map((s, i): TemplateOption => ({
    key: `${s.name}#${i}`, name: s.name, group: srcGroup(s.source),
    meta: [sizeText(s.size), `Speed ${s.speed} ft.`, s.darkvision ? `Darkvision ${s.darkvision} ft.` : "", s.creatureType].filter(Boolean).join(" · "),
    data: bookRow(s),
  })).sort(byOrder(SRC_ORDER));
}

const MONSTER_GROUPS = ["Humanoids", "Beasts", "Monstrosities", "Undead", "Fiends", "Celestials", "Fey", "Dragons", "Giants", "Elementals", "Constructs", "Aberrations", "Oozes", "Plants"];
async function monsters(): Promise<TemplateOption[]> {
  const { DND_MONSTERS } = await import("@/lib/data/dnd-monsters");
  return DND_MONSTERS.map((m, i): TemplateOption => ({
    key: `${m.name}#${i}`, name: m.name, group: m.group || "Other",
    meta: `CR ${m.cr} · AC ${m.ac} · HP ${m.hp} · ${m.size} ${m.type}`,
    data: bookRow(m),
  })).sort((a, b) =>
    (MONSTER_GROUPS.indexOf(a.group ?? "") + 1 || 99) - (MONSTER_GROUPS.indexOf(b.group ?? "") + 1 || 99)
    || crVal(String(a.data.cr)) - crVal(String(b.data.cr)) || a.name.localeCompare(b.name, "en"));
}

// Subclasses are nested under their class; the group is the base class.
async function subclasses(): Promise<TemplateOption[]> {
  const { DND_CLASSES } = await import("@/lib/data/dnd-classes");
  return DND_CLASSES.flatMap((c) =>
    c.subclasses.map((s, i): TemplateOption => {
      const lv = [...new Set(s.features.map((f) => f.level))].sort((a, b) => a - b);
      return {
        key: `${c.name}:${s.name}#${i}`, name: s.name, group: c.name,
        meta: [`${s.features.length} feature${s.features.length === 1 ? "" : "s"}`, lv.length ? `levels ${lv.join(", ")}` : "", srcGroup(s.source) !== "Core" ? srcGroup(s.source) : ""].filter(Boolean).join(" · "),
        data: bookRow(s, { className: s.className || c.name, features: s.features.map((f) => bookRow(f)) }),
      };
    }),
  );
}

const LOADERS: Record<string, () => Promise<TemplateOption[]>> = {
  "dnd-equipment": equipment, "dnd-feat": feats, "dnd-background": backgrounds, "dnd-spell": spells,
  "dnd-species": species, "dnd-monster": monsters, "dnd-subclass": subclasses,
};

/** The book's entries for a dnd-* homebrew kind, lazily loaded (see header). */
export function dndTemplates(kind: string): (() => Promise<TemplateOption[]>) | null {
  return LOADERS[kind] ?? null;
}
