// ─────────────────────────────────────────────────────────────────────────────
// Dungeon Crawler Carl template lists for the shared TemplatePicker
// (components/hb/TemplatePicker.tsx). Every dcc-* homebrew kind stores the
// book's own record shape (DccMonster / DccSkill / DccSpell / DccItem, and
// DccRace / DccClass with `grants`), so each loader hands the book row (minus
// `source` / `page`, which describe the book, not the copy) to the builder's
// xxxFromData() — the same legacy→draft path an old record takes: monster
// attacks parse into attack rows and auto-flags, skill / spell upgrades into
// rank rows, item benefits into badges. A book race / class has no point-buy
// selections, so its `grants` open as unpriced custom benefits (exactly how a
// legacy free-form homebrew race / class opens).
//
// The books are pulled in with dynamic import() inside each loader, so they're
// only fetched (as a separate chunk) when someone opens the picker.
// ─────────────────────────────────────────────────────────────────────────────
import type { TemplateOption } from "@/components/hb/TemplatePicker";

type Data = Record<string, unknown>;
const snip = (t: string, n = 90) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t);
const bookRow = (row: object): Data => {
  const { source: _source, page: _page, ...rest } = row as Data;
  void _source;
  void _page;
  return rest;
};
const byOrder = (order: readonly string[]) => (a: TemplateOption, b: TemplateOption) =>
  (order.indexOf(a.group ?? "") + 1 || 99) - (order.indexOf(b.group ?? "") + 1 || 99) || a.name.localeCompare(b.name, "en");
const SIZE_NAMES: Record<number, string> = { 1: "Tiny", 2: "Small", 3: "Petite", 4: "Medium", 5: "Large", 6: "Huge", 7: "Colossal", 8: "Gargantuan" };

// ── Bestiary: the page's role filters (Mobs / Bosses / Crawlers / NPCs) ──────
const roleGroup = (r: string) =>
  r === "Mob" ? "Mobs" : r.endsWith("Boss") || r === "Elite" ? "Bosses" : r === "Crawler" || r === "Rival Crawler" ? "Crawlers" : r === "NPC" ? "NPCs" : "Other";
async function monsters(): Promise<TemplateOption[]> {
  const { DCC_MONSTERS } = await import("@/lib/data/dcc-monsters");
  return DCC_MONSTERS.map((m, i): TemplateOption => ({
    key: `${m.name}#${i}`, name: m.name, group: roleGroup(m.role),
    meta: [m.role, `Lvl ${m.level}`, SIZE_NAMES[m.size] ?? "", m.attacks[0] ? `${m.attacks[0].name} ${m.attacks[0].damage}` : ""].filter(Boolean).join(" · "),
    data: bookRow(m),
  })).sort((a, b) => byOrder(["Mobs", "Bosses", "Crawlers", "NPCs", "Other"])(a, b) || 0);
}

async function skills(): Promise<TemplateOption[]> {
  const { DCC_SKILLS } = await import("@/lib/data/dcc-skills");
  const groupOf = (c: string) => (c === "attack" ? "Attack skills" : "Utility skills");
  return DCC_SKILLS.map((s, i): TemplateOption => ({
    key: `${s.name}#${s.category}#${i}`, name: s.name, group: groupOf(s.category),
    meta: [s.group, s.stat ?? (s.passive ? "Passive" : ""), s.damage ? `${s.damage}${s.damageType ? ` ${s.damageType}` : ""}` : "", s.range, s.desc ? snip(s.desc, 60) : ""].filter(Boolean).join(" · "),
    data: bookRow(s),
  })).sort(byOrder(["Attack skills", "Utility skills"]));
}

const SPELL_GROUPS: Record<string, string> = { attack: "Attack", heal: "Healing", utility: "Utility" };
async function spells(): Promise<TemplateOption[]> {
  const { DCC_SPELLS } = await import("@/lib/data/dcc-spells");
  return DCC_SPELLS.map((s, i): TemplateOption => ({
    key: `${s.name}#${i}`, name: s.name, group: SPELL_GROUPS[s.type] ?? "Utility",
    meta: [`${s.mana} mana`, s.stat, s.passive ? "Passive" : "", snip(s.desc, 60)].filter(Boolean).join(" · "),
    data: bookRow(s),
  })).sort(byOrder(Object.values(SPELL_GROUPS)));
}

const CLASS_ORDER = ["Arcanist", "Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Mage", "Monk", "Paladin", "Rogue"];
async function classes(): Promise<TemplateOption[]> {
  const { DCC_CLASSES } = await import("@/lib/data/dcc-classes");
  return DCC_CLASSES.map((c, i): TemplateOption => ({
    key: `${c.name}#${i}`, name: c.name, group: c.categories[0] || "Other",
    meta: [c.categories.join(" / "), c.earthClass ? "Earth Class" : "", `${c.grants.length} grant${c.grants.length === 1 ? "" : "s"}`, c.prerequisites ?? ""].filter(Boolean).join(" · "),
    data: bookRow(c),
  })).sort(byOrder(CLASS_ORDER));
}

async function races(): Promise<TemplateOption[]> {
  const { DCC_RACES } = await import("@/lib/data/dcc-races");
  return DCC_RACES.map((r, i): TemplateOption => ({
    key: `${r.name}#${i}`, name: r.name, group: r.group,
    meta: [`Size ${r.size}${SIZE_NAMES[r.size] ? ` (${SIZE_NAMES[r.size]})` : ""}`, r.grants[0] ? snip(r.grants[0], 70) : ""].filter(Boolean).join(" · "),
    data: bookRow(r),
  })).sort(byOrder(["Earth", "Alien"]));
}

// ── Loot: the page's category order ─────────────────────────────────────────
const ITEM_GROUPS: Record<string, string> = {
  consumable: "Consumables", weapon: "Weapons", armor: "Armor", accessory: "Accessories", scroll: "Scrolls",
  tome: "Tomes", mundane: "Mundane", tool: "Tools", material: "Materials",
};
async function items(): Promise<TemplateOption[]> {
  const { DCC_ITEMS } = await import("@/lib/data/dcc-items");
  return DCC_ITEMS.map((it, i): TemplateOption => ({
    key: `${it.name}#${it.category}#${i}`, name: it.name, group: ITEM_GROUPS[it.category] ?? "Mundane",
    meta: [it.tier, it.slot, it.price != null ? `${it.price} gp` : "", it.effect ? snip(it.effect, 60) : ""].filter(Boolean).join(" · "),
    data: bookRow(it),
  })).sort(byOrder(Object.values(ITEM_GROUPS)));
}

const LOADERS: Record<string, () => Promise<TemplateOption[]>> = {
  "dcc-monster": monsters, "dcc-skill": skills, "dcc-spell": spells, "dcc-class": classes, "dcc-race": races, "dcc-item": items,
};

/** The book's entries for a dcc-* homebrew kind, lazily loaded (see header). */
export function dccTemplates(kind: string): (() => Promise<TemplateOption[]>) | null {
  return LOADERS[kind] ?? null;
}
