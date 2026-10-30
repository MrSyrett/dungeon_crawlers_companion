// ─────────────────────────────────────────────────────────────────────────────
// Dragonbane template lists for the shared TemplatePicker (components/hb/
// TemplatePicker.tsx). Every db-* kind STORES the book shape (lib/data/db-types:
// DbHeroicAbility, DbSpell / DbMagicTrick, DbWeapon, DbArmor, DbGear, DbMonster,
// DbNpc, DbKin, DbProfession), so a book row is already a legacy record and goes straight through the
// builders' xxxFromData() (requirement → skill picks, damage/healing dice,
// cost {amount, unit}, attack table rows, NPC attributes derived the book's way).
// The loaders only add group/meta and fill the few fields the book spells
// differently:
//   - weapons: free text (note / magic effect / skill note) → `notes`
//   - helmets → slot "helmet" (armor and helmets share one kind)
//   - magic tricks → trick: true; alchemy recipes are left out (the spell
//     builder has no ingredients / product)
//   - common animals (NPC tab) → an NPC block {kind "Animal", skills, one weapon}
// db-data is big, so it loads with dynamic import() inside each loader.
// ─────────────────────────────────────────────────────────────────────────────
import type { TemplateOption } from "@/components/hb/TemplatePicker";

type Data = Record<string, unknown>;
const byName = (a: TemplateOption, b: TemplateOption) => a.name.localeCompare(b.name, "en");
const snip = (t: string, n = 90) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t);
const db = () => import("@/lib/data/db-data");
const DROP = new Set(["id", "source", "page", "corePage", "homebrew", "aliases"]);
const bookRow = (r: object): Data => Object.fromEntries(Object.entries(r).filter(([k]) => !DROP.has(k)));
const cost = (c: unknown) => {
  const x = c as { amount?: number; unit?: string } | null;
  return x && x.amount != null ? `${x.amount} ${x.unit ?? ""}`.trim() : "";
};
const inOrder = (order: readonly string[]) => (a: TemplateOption, b: TemplateOption) => {
  const r = (g?: string) => (order.includes(g ?? "") ? order.indexOf(g ?? "") : order.length);
  return r(a.group) - r(b.group) || byName(a, b);
};

const TIMING_LABEL: Record<string, string> = { action: "Action", free: "No action", reaction: "Reaction", passive: "Passive", downtime: "Downtime", roundStart: "Start of round" };
async function abilities(): Promise<TemplateOption[]> {
  const { DB_HEROIC_ABILITIES } = await db();
  return DB_HEROIC_ABILITIES.map((a, i): TemplateOption => ({
    key: `${a.id}#${i}`,
    name: a.name,
    group: TIMING_LABEL[a.timing] ?? a.timing,
    meta: [a.wp == null ? "no WP" : a.wp === "varies" ? "WP varies" : `${a.wp} WP`, snip(a.text, 70)].join(" · "),
    data: bookRow(a),
  })).sort(inOrder(Object.values(TIMING_LABEL)));
}

async function spells(): Promise<TemplateOption[]> {
  const { DB_SPELLS, DB_MAGIC_TRICKS, DB_MAGIC_RULES } = await db();
  const order = ["General", ...(DB_MAGIC_RULES.schools as string[])];
  const spells = DB_SPELLS.filter((s) => !s.recipe).map((s, i): TemplateOption => ({
    key: `s:${s.id}#${i}`,
    name: s.name,
    group: s.school,
    meta: [`Rank ${s.rank}`, s.castingTime, s.range, s.duration].filter(Boolean).join(" · "),
    data: bookRow(s),
  }));
  const tricks = DB_MAGIC_TRICKS.map((t, i): TemplateOption => ({
    key: `t:${t.id}#${i}`,
    name: t.name,
    group: t.school,
    meta: `Magic trick · ${snip(t.text, 70)}`,
    data: { ...bookRow(t), trick: true },
  }));
  // Within a school: rank order, tricks first (rank 0).
  const rank = (o: TemplateOption) => (o.data.trick ? 0 : Number(o.data.rank) || 1);
  const r = (g?: string) => (order.includes(g ?? "") ? order.indexOf(g ?? "") : order.length);
  return [...tricks, ...spells].sort((a, b) => r(a.group) - r(b.group) || (a.group ?? "").localeCompare(b.group ?? "", "en") || rank(a) - rank(b) || byName(a, b));
}

async function weapons(): Promise<TemplateOption[]> {
  const { DB_WEAPONS } = await db();
  return DB_WEAPONS.map((w, i): TemplateOption => {
    const notes = [w.note, w.effect, w.skillNote].filter((x) => typeof x === "string" && x).join(" ");
    return {
      key: `${w.id}#${i}`,
      name: w.name,
      group: w.shield ? "Shields" : w.ranged ? "Ranged" : w.skill ?? "Other",
      meta: [w.damage, w.grip, w.str ? `STR ${w.str}` : "", cost(w.cost), w.features.join(", ")].filter(Boolean).join(" · "),
      data: { ...bookRow(w), ...(notes ? { notes } : {}) },
    };
  }).sort(inOrder(["Brawling", "Knives", "Swords", "Axes", "Hammers", "Spears", "Staves", "Shields", "Ranged", "Other"]));
}

async function armor(): Promise<TemplateOption[]> {
  const { DB_ARMOR, DB_HELMETS } = await db();
  const row = (slot: "armor" | "helmet") => (a: (typeof DB_ARMOR)[number], i: number): TemplateOption => ({
    key: `${slot}:${a.id}#${i}`,
    name: a.name,
    group: slot === "helmet" ? "Helmets" : "Body armor",
    meta: [`Rating ${a.rating}`, a.banes.length ? `bane: ${a.banes.join(", ")}` : "", cost(a.cost)].filter(Boolean).join(" · "),
    data: { ...bookRow(a), slot, ...(typeof a.note === "string" && a.note ? { notes: a.note } : {}) },
  });
  return [...DB_ARMOR.map(row("armor")), ...DB_HELMETS.map(row("helmet"))];
}

const GEAR_CATS = ["Clothes", "Musical Instruments", "Trade Goods", "Studies & Magic", "Light Sources", "Tools", "Containers", "Medicine", "Services", "Hunting & Fishing", "Means of Travel", "Animals", "Alchemy Ingredients", "Alchemical Substances", "Magic Items"];
async function gear(): Promise<TemplateOption[]> {
  const { DB_GEAR } = await db();
  return DB_GEAR.map((g, i): TemplateOption => ({
    key: `${g.id}#${i}`,
    name: g.name,
    group: g.category,
    meta: [cost(g.cost), g.supply, g.effect ? snip(g.effect, 60) : ""].filter(Boolean).join(" · "),
    data: bookRow(g),
  })).sort(inOrder(GEAR_CATS));
}

const MON_CATS = ["Rare Kin", "Insectoids", "Trolls", "Giants", "Beasts", "Undead", "Dragons", "Demons", "Path of Glory", "Monsters"];
async function monsters(): Promise<TemplateOption[]> {
  const { DB_MONSTERS } = await db();
  return DB_MONSTERS.map((m, i): TemplateOption => ({
    key: `${m.id}#${i}`,
    name: m.name,
    group: String(m.category ?? "Monsters"),
    meta: `Ferocity ${m.ferocity} · ${m.size} · HP ${m.hp} · Armor ${m.armor ?? "—"} · Move ${m.movement}`,
    data: bookRow(m),
  })).sort(inOrder(MON_CATS));
}

const NPC_LABEL: Record<string, string> = { Typical: "Typical NPCs", Goblin: "Goblins", Hobgoblin: "Hobgoblins", Orc: "Orcs", Ogre: "Ogres", Skeleton: "Skeletons", Karkion: "Karkions", Satyr: "Satyrs" };
async function npcs(): Promise<TemplateOption[]> {
  const { DB_NPCS, DB_ANIMALS } = await db();
  const people = DB_NPCS.map((n, i): TemplateOption => ({
    key: `n:${n.id}#${i}`,
    name: n.name,
    group: NPC_LABEL[n.kind] ?? n.kind,
    meta: [`HP ${n.hp}`, n.wp != null ? `WP ${n.wp}` : "", n.boss ? "boss" : "", (n.weapons ?? []).map((w) => w.name).join(", ")].filter(Boolean).join(" · "),
    data: bookRow(n),
  })).sort((a, b) => (a.group === "Typical NPCs" ? -1 : b.group === "Typical NPCs" ? 1 : (a.group ?? "").localeCompare(b.group ?? "", "en")) || byName(a, b));
  const animals = DB_ANIMALS.map((a, i): TemplateOption => ({
    key: `a:${a.id}#${i}`,
    name: a.name,
    group: "Animals",
    meta: `HP ${a.hp} · Move ${a.movement} · ${a.attack.name} ${a.attack.damage}`,
    data: {
      name: a.name, kind: "Animal", movement: a.movement, hp: a.hp, wp: null, damageBonus: null, abilities: [],
      skills: a.skills, weapons: [{ name: a.attack.name, skill: a.attack.skill, damage: a.attack.damage }],
    },
  })).sort(byName);
  return [...people, ...animals];
}

const KIN_GROUP = (k: { source?: unknown; category?: unknown }) => ((k.source ?? "core") === "core" ? "Core kin" : String(k.category ?? "Bestiary kin"));
async function kin(): Promise<TemplateOption[]> {
  const { DB_KIN } = await db();
  return DB_KIN.map((k, i): TemplateOption => ({
    key: `${k.id}#${i}`,
    name: k.name,
    group: KIN_GROUP(k),
    meta: `Movement ${k.movement} · ${k.abilities.map((a) => a.name).join(", ")}`,
    data: bookRow(k),
  })).sort(inOrder(["Core kin", "Nightkin", "Rare Kin"]));
}

// A book mage lists ten schools; the builder makes a one-school caster, so the
// template keeps the first school's list (change the school in the builder).
async function professions(): Promise<TemplateOption[]> {
  const { DB_PROFESSIONS } = await db();
  return DB_PROFESSIONS.map((p, i): TemplateOption => ({
    key: `${p.id}#${i}`,
    name: p.name,
    group: p.mage ? "Casters" : "Professions",
    meta: `Key ${p.keyAttribute} · ${p.mage ? "school of magic" : p.heroicAbilities.join(p.heroicChoice ? " / " : ", ")}`,
    data: bookRow(p),
  })).sort(inOrder(["Professions", "Casters"]));
}

const LOADERS: Record<string, () => Promise<TemplateOption[]>> = {
  "db-ability": abilities,
  "db-spell": spells,
  "db-weapon": weapons,
  "db-armor": armor,
  "db-gear": gear,
  "db-monster": monsters,
  "db-npc": npcs,
  "db-kin": kin,
  "db-profession": professions,
};

/** The book's entries for a db-* kind (lazy), or null when the kind has none. */
export const dbTemplates = (kind: string): (() => Promise<TemplateOption[]>) | null => LOADERS[kind] ?? null;
