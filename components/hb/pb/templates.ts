// ─────────────────────────────────────────────────────────────────────────────
// Pirate Borg template lists for the shared TemplatePicker (components/hb/
// TemplatePicker.tsx). Every pb-* kind STORES the book shape (lib/data/pb-types:
// PbWeapon, PbClothing / PbHat, PbGear, PbRelic / PbRitual, PbMonster, PbShip),
// so a book row is already a legacy record: the builders' xxxFromData() parse
// it the same way they open an old homebrew row (damage strings → dice, armor
// tier → DRs, relic/ritual text → magic build, attacks → attack rows, hull die
// → tier). The loaders only add group/meta, tag hats with slot "hat" (clothing
// and hats share one kind) and drop the "no hat" placeholder row.
//
// pb-data is big, so it loads with dynamic import() inside each loader (one
// shared chunk, fetched only when a picker opens).
// ─────────────────────────────────────────────────────────────────────────────
import type { TemplateOption } from "@/components/hb/TemplatePicker";

type Data = Record<string, unknown>;
const byName = (a: TemplateOption, b: TemplateOption) => a.name.localeCompare(b.name, "en");
const snip = (t: string, n = 90) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t);
const silver = (c: unknown) => (typeof c === "number" ? `${c}s` : "");
const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);
const pb = () => import("@/lib/data/pb-data");
/** Book rows carry page bookkeeping the builders ignore; keep the stored shape tidy. */
const DROP = new Set(["id", "source", "page", "homebrew", "aliases"]);
const bookRow = (r: object): Data => Object.fromEntries(Object.entries(r).filter(([k]) => !DROP.has(k)));

async function weapons(): Promise<TemplateOption[]> {
  const { PB_WEAPONS } = await pb();
  return PB_WEAPONS.map((w, i): TemplateOption => ({
    key: `${w.id}#${i}`,
    name: w.name,
    group: w.type === "ranged" ? "Ranged" : "Melee",
    meta: [w.damage ?? "—", w.blackPowder ? "black powder" : "", w.hands === 2 ? "two-handed" : "", silver(w.cost), w.special ? snip(w.special, 50) : ""].filter(Boolean).join(" · "),
    data: bookRow(w),
  })).sort((a, b) => (a.group === b.group ? byName(a, b) : a.group === "Melee" ? -1 : 1));
}

async function armor(): Promise<TemplateOption[]> {
  const { PB_CLOTHING, PB_HATS } = await pb();
  const clothes = PB_CLOTHING.map((c, i): TemplateOption => ({
    key: `c:${c.id}#${i}`,
    name: c.name,
    group: "Clothing & armor",
    meta: [`Tier ${c.tier}`, c.armorDie ? `−${c.armorDie}` : "", silver(c.cost), c.special ? snip(c.special, 50) : ""].filter(Boolean).join(" · "),
    data: { ...bookRow(c), slot: "clothing" },
  }));
  const hats = PB_HATS.filter((h) => !h.none).map((h, i): TemplateOption => ({
    key: `h:${h.id}#${i}`,
    name: h.name,
    group: "Hats",
    meta: [h.damageReduction ? `−${h.damageReduction} damage` : "", h.sacrifice ? "sacrifice" : "", silver(h.cost), h.special ? snip(h.special, 50) : ""].filter(Boolean).join(" · ") || "Hat",
    data: { ...bookRow(h), slot: "hat" },
  }));
  return [...clothes, ...hats];
}

const GEAR_GROUP: Record<string, string> = { gear: "Gear", container: "Containers", vessel: "Vessels" };
async function gear(): Promise<TemplateOption[]> {
  const { PB_GEAR } = await pb();
  const order = Object.values(GEAR_GROUP);
  return PB_GEAR.map((g, i): TemplateOption => ({
    key: `${g.id}#${i}`,
    name: g.name,
    group: GEAR_GROUP[g.category] ?? cap(g.category),
    meta: [g.costText || silver(g.cost), g.effect ? snip(g.effect, 60) : ""].filter(Boolean).join(" · "),
    data: bookRow(g),
  })).sort((a, b) => order.indexOf(a.group ?? "") - order.indexOf(b.group ?? "") || byName(a, b));
}

async function magic(kind: "relic" | "ritual"): Promise<TemplateOption[]> {
  const { PB_RELICS, PB_RITUALS } = await pb();
  const rows = kind === "relic" ? PB_RELICS : PB_RITUALS;
  return rows.map((r, i): TemplateOption => ({
    key: `${r.id}#${i}`,
    name: r.name,
    meta: [`d20 ${r.roll}`, r.duration, snip(r.text, 70)].filter(Boolean).join(" · "),
    data: bookRow(r),
  }));
}

const MON_CATS = ["npc", "undead", "beast", "spirit", "monster", "flora", "construct"];
const MON_LABEL: Record<string, string> = { npc: "NPC" };
async function monsters(): Promise<TemplateOption[]> {
  const { PB_MONSTERS } = await pb();
  const rank = (c: string) => (MON_CATS.includes(c) ? MON_CATS.indexOf(c) : MON_CATS.length);
  // A block printed in several books is listed once per source on the page; one template is enough.
  const seen = new Set<string>();
  return PB_MONSTERS.filter((m) => (seen.has(m.name) ? false : (seen.add(m.name), true)))
    .map((m, i): TemplateOption => ({
      key: `${m.id}#${i}`,
      name: m.name,
      group: MON_LABEL[m.category] ?? cap(m.category),
      meta: [`HP ${typeof m.hpText === "string" && m.hpText ? m.hpText : m.hp}`, `Morale ${m.morale ?? "–"}`, m.armor ? `−${m.armor.die}` : "", m.attacks[0] ? `${m.attacks[0].name}${m.attacks[0].damage ? ` ${m.attacks[0].damage}` : ""}` : ""].filter(Boolean).join(" · "),
      data: bookRow(m),
    }))
    .sort((a, b) => rank(String(a.data.category)) - rank(String(b.data.category)) || byName(a, b));
}

const SHIP_TYPES = ["boat", "ship", "fortification"];
async function ships(): Promise<TemplateOption[]> {
  const { PB_SHIPS } = await pb();
  const rank = (t: string) => (SHIP_TYPES.includes(t) ? SHIP_TYPES.indexOf(t) : SHIP_TYPES.length);
  return PB_SHIPS.map((s, i): TemplateOption => ({
    key: `${s.id}#${i}`,
    name: s.name,
    group: cap(s.type),
    meta: [`HP ${s.hp}`, s.hull ? `Hull −${s.hull.die}` : "", `Speed ${s.speed}`, s.broadsides ? `Broadsides ${s.broadsides}` : ""].filter(Boolean).join(" · "),
    data: bookRow(s),
  })).sort((a, b) => rank(String(a.data.type)) - rank(String(b.data.type)) || byName(a, b));
}

const LOADERS: Record<string, () => Promise<TemplateOption[]>> = {
  "pb-weapon": weapons,
  "pb-armor": armor,
  "pb-gear": gear,
  "pb-relic": () => magic("relic"),
  "pb-ritual": () => magic("ritual"),
  "pb-monster": monsters,
  "pb-ship": ships,
};

/** The book's entries for a pb-* kind (lazy), or null when the kind has none. */
export const pbTemplates = (kind: string): (() => Promise<TemplateOption[]>) | null => LOADERS[kind] ?? null;
