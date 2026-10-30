// ─────────────────────────────────────────────────────────────────────────────
// Shadowdark template lists for the shared TemplatePicker (components/hb/
// TemplatePicker.tsx). Each loader turns the book's own entries (lib/data/*,
// the shape the reference pages render) into the STORED homebrew data shape
// for that type — the same shape HomebrewManager's formFromRecord() reads when
// it opens an old record, so a template fills the builder through the exact
// legacy→draft path (monsterFromData / spellFromData / gearFromData / the
// class/ancestry/background branches).
//
// The book arrays are pulled in with dynamic import() inside each loader, so
// they're only fetched (as a separate chunk) when someone opens the picker —
// pages don't carry a second copy of the book in their payload.
// ─────────────────────────────────────────────────────────────────────────────
import type { TemplateOption } from "@/components/hb/TemplatePicker";
import { SD_SPELL_LISTS } from "./rules";

type Data = Record<string, unknown>;
const byName = (a: TemplateOption, b: TemplateOption) => a.name.localeCompare(b.name, "en");
const snip = (t: string, n = 90) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t);
const core = (optional: boolean) => (optional ? "Optional" : "Core rules");

// ── Monsters ────────────────────────────────────────────────────────────────
// The book stat block already IS the legacy homebrew shape (ac/hp/atk/mv/lv/al/
// stat mods/notes); only the creature type is looked up.
async function monsters(): Promise<TemplateOption[]> {
  const [{ MONSTERS }, { MONSTER_TYPES, typeOf }] = await Promise.all([
    import("@/lib/data/monsters"),
    import("@/lib/data/monster-types"),
  ]);
  const order = MONSTER_TYPES as readonly string[];
  return MONSTERS.map((m, i): TemplateOption => {
    const ctype = typeOf(m.name);
    return {
      key: `${m.name}#${i}`,
      name: m.name,
      group: ctype,
      meta: `LV ${m.lv} · AC ${m.ac} · HP ${m.hp} · ${m.atk}`,
      data: { ...m, ctype } as Data,
    };
  }).sort((a, b) => order.indexOf(a.group ?? "") - order.indexOf(b.group ?? "") || byName(a, b));
}

// ── Spells ──────────────────────────────────────────────────────────────────
// Book `caster` becomes the builder's class lists ("Both" = wizard + priest).
async function spells(): Promise<TemplateOption[]> {
  const { SPELLS } = await import("@/lib/data/spells");
  const groupOf = (c: string) => (c === "Both" ? "Wizard & Priest" : c);
  const order = [...SD_SPELL_LISTS, "Wizard & Priest"];
  return SPELLS.map((s, i): TemplateOption => ({
    key: `${s.name}#${s.caster}#${s.tier}#${i}`,
    name: s.name,
    group: groupOf(s.caster),
    meta: `Tier ${s.tier} · ${s.caster === "Both" ? "Wizard, Priest" : s.caster} · ${s.range} · ${s.duration}${s.damage ? ` · ${s.damage}` : ""}`,
    data: {
      name: s.name,
      tier: s.tier,
      range: s.range,
      duration: s.duration,
      damage: s.damage,
      heal: s.heal ?? "",
      desc: s.desc,
      lists: s.caster === "Both" ? ["Wizard", "Priest"] : SD_SPELL_LISTS.filter((l) => l === s.caster),
    },
  })).sort((a, b) => order.indexOf(a.group ?? "") - order.indexOf(b.group ?? "") || (parseInt(String(a.data.tier)) || 0) - (parseInt(String(b.data.tier)) || 0) || byName(a, b));
}

// ── Gear ────────────────────────────────────────────────────────────────────
const GEAR_GROUP: Record<string, string> = { basic: "Basic gear", weapon: "Weapons", armor: "Armor & shields", ammo: "Ammo", magic: "Magic items" };
const WEAPON_PROPS = ["Finesse", "Loading", "Thrown", "Two-handed", "Versatile", "Reach"];

/** Book gear row → stored homebrew gear (kind, gp/sp/cp, slots, weapon/armor fields, note). */
export function sdGearData(g: {
  name: string; category: string; cost: string; qty?: string; weaponType?: string; range?: string; damage?: string; props?: string; desc: string;
}): Data {
  const d: Data = { name: g.name };
  const text = `${g.props ?? ""}, ${g.desc}`;
  const cost = g.cost.match(/(\d+)\s*(gp|sp|cp)/i);
  if (cost) d[cost[2].toLowerCase()] = parseInt(cost[1], 10);
  const slots = text.match(/(\d+)\s*slots?/i);
  d.slots = slots ? slots[1] : "1";
  if (g.qty) d.qty = g.qty;
  if (g.category === "weapon") {
    d.kind = "weapon";
    d.wtype = g.weaponType || "M";
    d.range = g.range || "Close";
    d.damage = g.damage || "1d4";
    d.props = (g.props ?? "")
      .split(",")
      .map((p) => WEAPON_PROPS.find((w) => w.toLowerCase() === p.trim().toLowerCase()))
      .filter(Boolean)
      .join(", ");
    d.note = g.desc;
  } else if (g.category === "armor") {
    const shield = /^\+\s*(\d+)\s*AC/i.exec(g.desc);
    if (shield) {
      d.kind = "shield";
      d.acBonus = parseInt(shield[1], 10);
    } else {
      const ac = /AC\s*(\d+)\s*(\+\s*DEX)?/i.exec(g.desc);
      d.kind = "armor";
      d.acBase = ac ? parseInt(ac[1], 10) : 11;
      d.acDex = !!ac?.[2];
    }
    d.note = g.desc;
  } else {
    d.kind = g.category === "basic" ? "gear" : g.category;
    d.note = g.desc;
  }
  return d;
}

async function gear(): Promise<TemplateOption[]> {
  const { GEAR } = await import("@/lib/data/gear");
  const order = Object.values(GEAR_GROUP);
  return GEAR.filter((g) => !/^strikes$/i.test(g.name))
    .map((g, i): TemplateOption => ({
      key: `${g.name}#${g.category}#${i}`,
      name: g.name,
      group: GEAR_GROUP[g.category] ?? "Basic gear",
      meta: [
        g.category === "weapon" ? [g.damage, g.range, g.props].filter(Boolean).join(" · ") : g.magicType ?? snip(g.desc, 70),
        g.cost,
      ].filter(Boolean).join(" · "),
      data: sdGearData(g),
    }))
    .sort((a, b) => order.indexOf(a.group ?? "") - order.indexOf(b.group ?? "") || byName(a, b));
}

// ── Classes ─────────────────────────────────────────────────────────────────
// Book talent tables are 12 strings collapsed into the 5 roll bands exactly as
// the /classes page shows them; proficiency prose is matched against the book's
// weapon/armor names (unmatched words are dropped — the builder is a picker).
const TALENT_TEXT_IDX = [0, 1, 6, 9, 11];
const CAST_STAT: Record<string, string> = {
  Wizard: "INT", Mage: "INT", Necromancer: "INT", Sorcerer: "CHA", Priest: "WIS", Seer: "WIS", Druid: "WIS", Witch: "CHA",
};

function matchNames(prose: string, options: string[], extra: (word: string) => string[] = () => []): string[] {
  const out = new Set<string>();
  for (const raw of prose.split(/,|\band\b/i)) {
    const w = raw.trim().toLowerCase();
    if (!w || w === "none") continue;
    const sing = w.replace(/s$/, "");
    const hit = options.find((o) => o.toLowerCase() === w || o.toLowerCase() === sing);
    if (hit) out.add(hit);
    else extra(w).forEach((x) => out.add(x));
  }
  return options.filter((o) => out.has(o));
}

async function classes(): Promise<TemplateOption[]> {
  const [{ SD_CLASSES }, { GEAR }, { SPELLS }] = await Promise.all([
    import("@/lib/data/classes"),
    import("@/lib/data/gear"),
    import("@/lib/data/spells"),
  ]);
  const weaponsAll = GEAR.filter((g) => g.category === "weapon");
  const weaponNames = weaponsAll.map((g) => g.name);
  const armorNames = GEAR.filter((g) => g.category === "armor").map((g) => g.name);
  const lists = new Set(SPELLS.map((s) => s.caster));
  return SD_CLASSES.map((c, i) => {
    const allW = /^all weapons$/i.test(c.weapons.trim());
    const allA = /^all armor/i.test(c.armor.trim());
    const weapons = allW
      ? []
      : matchNames(c.weapons, weaponNames, (w) =>
          /all melee/.test(w) ? weaponsAll.filter((g) => g.weaponType === "M").map((g) => g.name)
          : /all swords/.test(w) ? weaponNames.filter((n) => /sword/i.test(n))
          : [],
        );
    const armor = allA ? [] : matchNames(c.armor, armorNames);
    const split = c.talentBands && c.talentBands[1]?.[1] === 7 ? "hi" : "lo";
    const data: Data = {
      name: c.name,
      hd: c.hd,
      weaponsAll: allW,
      weapons,
      armorAll: allA,
      armor,
      talentSplit: split,
      talent: TALENT_TEXT_IDX.map((idx) => ({ text: c.talent[idx] ?? "", effects: [], choose: false })),
      features: c.features.map((f) => ({ text: f, effects: [], choose: false })),
    };
    if (c.caster) {
      const list = lists.has(c.name) ? c.name : "Homebrew";
      data.caster = { stat: CAST_STAT[c.name] ?? "INT", list, knownTier1: 2 };
    }
    if (c.titles) data.titles = c.titles;
    return {
      key: `${c.name}#${i}`,
      name: c.name,
      group: core(c.optional),
      meta: `HD ${c.hd} · ${c.caster ? "Spellcaster" : "Martial"} · ${c.weapons}`,
      data,
    };
  }).sort((a, b) => (a.group === b.group ? byName(a, b) : a.group === "Core rules" ? -1 : 1));
}

// ── Ancestries / backgrounds ────────────────────────────────────────────────
async function ancestries(): Promise<TemplateOption[]> {
  const { SD_ANCESTRIES } = await import("@/lib/data/ancestries");
  return SD_ANCESTRIES.map((a, i) => ({
    key: `${a.name}#${i}`,
    name: a.name,
    group: core(a.optional),
    meta: snip(a.trait),
    data: {
      name: a.name,
      languages: a.languages,
      // "X OR Y" traits are the book's choose-one traits (Elf Farsight).
      traits: [{ text: a.trait, effects: [], choose: /\bOR\b/.test(a.trait) }],
    },
  })).sort((a, b) => (a.group === b.group ? byName(a, b) : a.group === "Core rules" ? -1 : 1));
}

async function backgrounds(): Promise<TemplateOption[]> {
  const { SD_BACKGROUNDS } = await import("@/lib/data/backgrounds");
  return SD_BACKGROUNDS.map((b, i) => ({
    key: `${b.name}#${i}`,
    name: b.name,
    group: core(b.optional),
    meta: snip(b.desc),
    data: { name: b.name, desc: b.desc },
  })).sort((a, b) => (a.group === b.group ? byName(a, b) : a.group === "Core rules" ? -1 : 1));
}

const LOADERS: Record<string, () => Promise<TemplateOption[]>> = {
  monster: monsters, spell: spells, gear, class: classes, ancestry: ancestries, background: backgrounds,
};

/** The book's entries for an SD homebrew type, lazily loaded (see header). */
export function sdBookTemplates(type: string): (() => Promise<TemplateOption[]>) | null {
  return LOADERS[type] ?? null;
}
