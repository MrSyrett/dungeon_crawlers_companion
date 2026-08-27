"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GEAR } from "@/lib/data/gear";
import { SPELLS } from "@/lib/data/spells";
import { TALENT_TARGETS } from "@/lib/effects";

// Weapons available to the shared Effect Builder (Weapon Damage Die). Derived
// from the same gear data everywhere, so every effect builder lists the same
// weapons regardless of which page renders it.
const EFFECT_WEAPONS = GEAR.filter((g) => g.category === "weapon" && !/^strikes$/i.test(g.name)).map((g) => g.name);
// Spell names for the Learn Spell / Advantage effect pickers (deduped, sorted).
const EFFECT_SPELLS = Array.from(new Set(SPELLS.map((s) => s.name))).sort((a, b) => a.localeCompare(b, "en"));

// Mirror of lib/homebrew's public shapes (kept local so this client component
// doesn't pull in the server module). Must stay in sync with lib/homebrew's HbType.
// "dcc-item" is served by the separate DccHomebrew component, never this SD manager,
// but the union must stay wide enough to accept the shared HomebrewRecord the pages pass.
type HbType = "spell" | "gear" | "monster" | "class" | "ancestry" | "background" | "dcc-item";
type CampaignRef = { id: string; name: string; code: string };
type HomebrewRecord = {
  id: string;
  type: HbType;
  name: string;
  campaignIds: string[];
  data: Record<string, unknown>;
  updatedAt: string;
  owner: boolean;
};

const BONUS_TARGETS: [string, string][] = [
  ["ac", "AC"], ["hp", "HP"], ["meleeAtk", "Melee Attack"], ["meleeDmg", "Melee Damage"],
  ["rangedAtk", "Ranged Attack"], ["rangedDmg", "Ranged Damage"], ["slots", "Gear Slots"],
  ["str", "Strength"], ["dex", "Dexterity"], ["con", "Constitution"],
  ["int", "Intelligence"], ["wis", "Wisdom"], ["cha", "Charisma"],
];
const GEAR_KINDS: [string, string][] = [
  ["gear", "Gear"], ["weapon", "Weapon"], ["armor", "Armor"],
  ["shield", "Shield"], ["magic", "Magic Item"], ["ammo", "Ammo"],
];
const TIERS = ["1", "2", "3", "4", "5"];
const ALIGNMENTS: [string, string][] = [["L", "Lawful"], ["N", "Neutral"], ["C", "Chaotic"]];
// Stored lowercase to match the book's stat blocks ("near"), shown capitalised.
const MOVEMENTS: [string, string][] = [["near", "Near"], ["close", "Close"], ["far", "Far"]];
const ABILITIES: [keyof Form, string][] = [
  ["mS", "STR"], ["mD", "DEX"], ["mC", "CON"], ["mI", "INT"], ["mW", "WIS"], ["mCh", "CHA"],
];
// Mirrors WEAPON_RANGES / SPELL_RANGES in lib/homebrew.ts (kept local so this
// client component doesn't import the server module).
const WEAPON_RANGES = ["Close", "Near", "Far", "Close/Near", "Close/Far"];
const SPELL_RANGES = [
  "Self", "Touch", "Close", "Near", "Far", "Double near", "1 mile", "Same plane", "Unlimited",
];
// Mirrors HD_DICE / CAST_STATS in lib/homebrew.ts (kept local so this client
// component doesn't import the server module). TALENT_TARGETS is imported from
// lib/effects, which is dependency-free and safe for a client component.
const HD_DICE = ["1d4", "1d6", "1d8", "1d10", "1d12"];
const CAST_STATS = ["INT", "WIS", "CHA"];

// The Effect Builder groups the granular targets above into simple categories.
// Combat picks a scope (Melee / Ranged / both) then a kind (Attack / Damage /
// both); Stat picks one ability or "Player Choice".
const EFFECT_CATEGORIES: [string, string][] = [
  ["melee", "Melee"],
  ["ranged", "Ranged"],
  ["mr", "Melee & Ranged"],
  ["ac", "AC"],
  ["hp", "HP"],
  ["gearSlots", "Gear Slots"],
  ["stat", "Stat"],
  ["spellKnown", "Learn Spell"],
  ["spellCheck", "Spellcasting Checks"],
  ["weaponDie", "Weapon Damage Die"],
  ["advSpell", "Advantage: Cast Spell"],
  ["featureCharges", "Charges"],
  ["playerTalent", "Player Choice"],
];
const COMBAT_KINDS: [string, string][] = [
  ["atk", "Attack"],
  ["dmg", "Damage"],
  ["atkdmg", "Attack and Damage"],
];
const COMBAT_MAP: Record<string, Record<string, string>> = {
  melee: { atk: "meleeAtk", dmg: "meleeDmg", atkdmg: "meleeAtkDmg" },
  ranged: { atk: "rangedAtk", dmg: "rangedDmg", atkdmg: "rangedAtkDmg" },
  mr: { atk: "mrAtk", dmg: "mrDmg", atkdmg: "mrAtkDmg" },
};
const STAT_OPTIONS: [string, string][] = [
  ["str", "Strength"],
  ["dex", "Dexterity"],
  ["con", "Constitution"],
  ["int", "Intelligence"],
  ["wis", "Wisdom"],
  ["cha", "Charisma"],
  ["statChoice", "Player Choice"],
];
const STAT_KEYS = STAT_OPTIONS.map(([k]) => k);
// Derive the category and combat-kind for a stored target.
function targetCategory(t: string): string {
  if (t === "meleeAtk" || t === "meleeDmg" || t === "meleeAtkDmg") return "melee";
  if (t === "rangedAtk" || t === "rangedDmg" || t === "rangedAtkDmg") return "ranged";
  if (t === "mrAtk" || t === "mrDmg" || t === "mrAtkDmg") return "mr";
  if (STAT_KEYS.includes(t)) return "stat";
  return t;
}
function targetKind(t: string): string {
  if (t.endsWith("AtkDmg")) return "atkdmg";
  if (t.endsWith("Dmg")) return "dmg";
  return "atk";
}

// One roll-band of a class talent table. Rows 1/4/5 are fixed (2 / 10-11 / 12);
// rows 2 & 3 shift with `talentSplit`. Each row carries up to 2 effects.
// One mechanical effect: an amount + a target. `weapon` is used only for the
// "weaponDie" target; `spell` for spell targets (Learn Spell / Advantage: Cast
// Spell). Shared by class talents, class features, and ancestry traits.
type Effect = { amount: string; target: string; weapon: string; spell: string; feature: string };
type TalentEffectRow = Effect; // alias kept for existing talent code
type TalentRow = { text: string; effects: Effect[]; choose: boolean };

// A trait/feature: descriptive text plus a list of effects (one Effect Builder).
// `choose` (on every builder) makes the player pick one effect at creation.
type FeatureRow = { text: string; effects: Effect[]; choose: boolean };
type AncestryTraitRow = { text: string; effects: Effect[]; choose: boolean };
// A trait or feature that can have limited uses/day (renders tick boxes).

// Roll-band label for talent row `i` given the 2 & 3 split.
function talentRollLabel(i: number, split: string): string {
  if (i === 0) return "2";
  if (i === 1) return split === "hi" ? "3–7" : "3–6";
  if (i === 2) return split === "hi" ? "8–9" : "7–9";
  if (i === 3) return "10–11";
  return "12";
}
const emptyTalents = (): TalentRow[] => Array.from({ length: 5 }, () => ({ text: "", effects: [], choose: false }));

// Title tiers as a character levels (matches the book's 5-tier title tables).
const TITLE_TIERS = ["Lvl 1–2", "Lvl 3–4", "Lvl 5–6", "Lvl 7–8", "Lvl 9–10"];
const emptyTitles = (): string[] => ["", "", "", "", ""];

type BonusRow = { amount: string; target: string };
type Form = {
  id: string | null; // null while creating
  name: string;
  campaignIds: string[]; // empty = personal
  // spell
  tier: string;
  range: string;
  duration: string;
  damage: string;
  desc: string;
  // gear
  kind: string;
  cost: string;
  costUnit: string;
  slots: string;
  qty: string;
  note: string;
  wtype: string;
  ammo: string; // "" = needs no ammo (explicit, outranks the sheet's name guess)
  acBase: string;
  acDex: boolean;
  acBonus: string;
  props: string;
  bonuses: BonusRow[];
  equippable: boolean;
  // monster
  ac: string;
  hp: string;
  atk: string;
  mv: string;
  lv: string;
  al: string;
  mS: string; mD: string; mC: string; mI: string; mW: string; mCh: string;
  notes: string;
  ctype: string;
  // class
  hd: string;
  weaponsAll: boolean;
  weapons: string[];
  armorAll: boolean;
  armor: string[];
  talentSplit: string; // "lo" | "hi"
  talents: TalentRow[]; // exactly 5 rows
  features: FeatureRow[];
  isCaster: boolean;
  castStat: string;
  castList: string;
  castKnown: string;
  hasTitles: boolean;
  titlesLawful: string[];
  titlesNeutral: string[];
  titlesChaotic: string[];
  // ancestry (also reuses `bonuses`)
  traits: AncestryTraitRow[];
  languages: string;
};

const s = (v: unknown): string => (typeof v === "string" ? v : v == null ? "" : String(v));

function blankForm(type: HbType): Form {
  return {
    id: null,
    name: "",
    campaignIds: [],
    tier: "1",
    range: type === "spell" ? "Close" : "",
    duration: "Instant",
    damage: "",
    desc: "",
    kind: "gear",
    cost: "",
    costUnit: "gp",
    slots: "",
    qty: "",
    note: "",
    wtype: "M",
    ammo: "",
    acBase: "11",
    acDex: true,
    acBonus: "2",
    props: "",
    bonuses: [],
    equippable: false,
    ac: "10",
    hp: "1",
    atk: "",
    mv: "near",
    lv: "1",
    al: "N",
    mS: "+0", mD: "+0", mC: "+0", mI: "+0", mW: "+0", mCh: "+0",
    notes: "",
    ctype: "Monster",
    hd: "1d6",
    weaponsAll: false,
    weapons: [],
    armorAll: false,
    armor: [],
    talentSplit: "lo",
    talents: emptyTalents(),
    features: [],
    isCaster: false,
    castStat: "INT",
    castList: "Wizard",
    castKnown: "2",
    hasTitles: false,
    titlesLawful: emptyTitles(),
    titlesNeutral: emptyTitles(),
    titlesChaotic: emptyTitles(),
    traits: [],
    languages: "",
  };
}

function formFromRecord(rec: HomebrewRecord): Form {
  const d = rec.data || {};
  const base = blankForm(rec.type);
  base.id = rec.id;
  base.name = rec.name;
  base.campaignIds = rec.campaignIds ?? [];
  if (rec.type === "monster") {
    base.ac = s(d.ac); base.hp = s(d.hp); base.atk = s(d.atk);
    base.mv = s(d.mv); base.lv = s(d.lv); base.al = s(d.al) || "N";
    base.mS = s(d.s); base.mD = s(d.d); base.mC = s(d.c);
    base.mI = s(d.i); base.mW = s(d.w); base.mCh = s(d.ch);
    base.notes = s(d.notes);
    base.ctype = s(d.ctype) || "Monster";
  } else if (rec.type === "spell") {
    base.tier = s(d.tier) || "1";
    base.range = s(d.range);
    base.duration = s(d.duration);
    base.damage = s(d.damage);
    base.desc = s(d.desc);
  } else if (rec.type === "class") {
    base.hd = s(d.hd) || "1d6";
    base.weaponsAll = !!d.weaponsAll;
    base.weapons = Array.isArray(d.weapons) ? (d.weapons as unknown[]).map(s) : [];
    base.armorAll = !!d.armorAll;
    base.armor = Array.isArray(d.armor) ? (d.armor as unknown[]).map(s) : [];
    base.talentSplit = s(d.talentSplit) === "hi" ? "hi" : "lo";
    base.talents = emptyTalents().map((row, i) => {
      const src = Array.isArray(d.talent) ? (d.talent[i] as Record<string, unknown> | undefined) : undefined;
      if (!src) return row;
      const effects = Array.isArray(src.effects)
        ? (src.effects as Record<string, unknown>[]).map((e) => ({ amount: s(e.amount), target: s(e.target), weapon: s(e.weapon), spell: s(e.spell), feature: s(e.feature) }))
        : [];
      return { text: s(src.text), effects, choose: !!src.choose };
    });
    base.features = Array.isArray(d.features)
      ? (d.features as unknown[]).map((f) => {
          const fo = (f ?? {}) as Record<string, unknown>;
          const effects: Effect[] = Array.isArray(fo.effects)
            ? (fo.effects as Record<string, unknown>[]).map((e) => ({ amount: s(e.amount), target: s(e.target), weapon: s(e.weapon), spell: s(e.spell), feature: s(e.feature) }))
            : [];
          return { text: s(fo.text), effects, choose: !!fo.choose };
        })
      : [];
    const caster = (d.caster ?? null) as Record<string, unknown> | null;
    if (caster) {
      base.isCaster = true;
      base.castStat = s(caster.stat) || "INT";
      base.castList = s(caster.list) || "Wizard";
      base.castKnown = caster.knownTier1 != null ? s(caster.knownTier1) : "2";
    }
    const titles = (d.titles ?? null) as Record<string, unknown> | null;
    if (titles) {
      const pad5 = (v: unknown): string[] => {
        const arr = Array.isArray(v) ? (v as unknown[]).map(s) : [];
        return emptyTitles().map((_, i) => arr[i] ?? "");
      };
      base.hasTitles = true;
      base.titlesLawful = pad5(titles.Lawful);
      base.titlesNeutral = pad5(titles.Neutral);
      base.titlesChaotic = pad5(titles.Chaotic);
    }
  } else if (rec.type === "ancestry") {
    base.languages = s(d.languages);
    base.traits = Array.isArray(d.traits)
      ? (d.traits as Record<string, unknown>[]).map((t) => {
          const effects: Effect[] = Array.isArray(t.effects)
            ? (t.effects as Record<string, unknown>[]).map((e) => ({ amount: s(e.amount), target: s(e.target), weapon: s(e.weapon), spell: s(e.spell), feature: s(e.feature) }))
            : [];
          return { text: s(t.text), effects, choose: !!t.choose };
        })
      : [];
    base.bonuses = Array.isArray(d.bonuses)
      ? (d.bonuses as Record<string, unknown>[]).map((b) => ({ amount: s(b.amount), target: s(b.target) }))
      : [];
  } else if (rec.type === "background") {
    base.desc = s(d.desc);
  } else {
    base.kind = s(d.kind) || "gear";
    const unit = ["gp", "sp", "cp"].find((u) => d[u] != null) || "gp";
    base.costUnit = unit;
    base.cost = d[unit] != null ? s(d[unit]) : "";
    base.slots = s(d.slots);
    base.qty = s(d.qty);
    base.note = s(d.note);
    base.wtype = s(d.wtype) || "M";
    base.ammo = s(d.ammo);
    base.range = s(d.range);
    base.damage = s(d.damage);
    base.props = s(d.props);
    base.acBase = d.acBase != null ? s(d.acBase) : "11";
    base.acDex = !!d.acDex;
    base.acBonus = d.acBonus != null ? s(d.acBonus) : "2";
    base.bonuses = Array.isArray(d.bonuses)
      ? (d.bonuses as Record<string, unknown>[]).map((b) => ({ amount: s(b.amount), target: s(b.target) }))
      : [];
    base.equippable = !!d.equippable;
  }
  return base;
}

function payloadFromForm(type: HbType, f: Form): Record<string, unknown> {
  if (type === "monster") {
    return {
      name: f.name, ac: f.ac, hp: f.hp, atk: f.atk, mv: f.mv, lv: f.lv, al: f.al,
      s: f.mS, d: f.mD, c: f.mC, i: f.mI, w: f.mW, ch: f.mCh,
      notes: f.notes, ctype: f.ctype,
    };
  }
  if (type === "spell") {
    return {
      name: f.name,
      tier: f.tier,
      range: f.range,
      duration: f.duration,
      damage: f.damage,
      desc: f.desc,
    };
  }
  if (type === "class") {
    const mapEffects = (effects: Effect[]) =>
      effects
        .filter((e) => e.target)
        .map((e) => {
          const base: Record<string, unknown> = { amount: Number(e.amount) || 0, target: e.target };
          if (e.target === "weaponDie") base.weapon = e.weapon || "";
          if (e.target === "spellKnown" || e.target === "advSpell") base.spell = e.spell || "";
          if (e.target === "featureCharges") base.feature = e.feature || "";
          return base;
        });
    const talent = f.talents.map((row) => ({ text: row.text, choose: !!row.choose, effects: mapEffects(row.effects) }));
    const features = f.features
      .filter((r) => r.text.trim())
      .map((r) => ({ text: r.text, choose: !!r.choose, effects: mapEffects(r.effects) }));
    const data: Record<string, unknown> = {
      name: f.name,
      hd: f.hd,
      weaponsAll: f.weaponsAll,
      weapons: f.weaponsAll ? [] : f.weapons,
      armorAll: f.armorAll,
      armor: f.armorAll ? [] : f.armor,
      talentSplit: f.talentSplit,
      talent,
      features,
    };
    if (f.isCaster) {
      data.caster = { stat: f.castStat, list: f.castList, knownTier1: Number(f.castKnown) || 2 };
    }
    if (f.hasTitles) {
      const clean = (arr: string[]) => arr.map((x) => x.trim());
      data.titles = {
        Lawful: clean(f.titlesLawful),
        Neutral: clean(f.titlesNeutral),
        Chaotic: clean(f.titlesChaotic),
      };
    }
    return data;
  }
  if (type === "ancestry") {
    const traits = f.traits
      .filter((r) => r.text.trim())
      .map((r) => ({
        text: r.text,
        choose: !!r.choose,
        effects: r.effects
          .filter((e) => e.target)
          .map((e) => {
            const base: Record<string, unknown> = { amount: Number(e.amount) || 0, target: e.target };
            if (e.target === "weaponDie") base.weapon = e.weapon || "";
            if (e.target === "spellKnown" || e.target === "advSpell") base.spell = e.spell || "";
            return base;
          }),
      }));
    return { name: f.name, traits, languages: f.languages, bonuses: f.bonuses };
  }
  if (type === "background") {
    return { name: f.name, desc: f.desc };
  }
  return {
    name: f.name,
    kind: f.kind,
    cost: f.cost,
    costUnit: f.costUnit,
    slots: f.slots,
    qty: f.qty,
    note: f.note,
    wtype: f.wtype,
    ammo: f.ammo,
    range: f.range,
    damage: f.damage,
    props: f.props,
    acBase: f.acBase,
    acDex: f.acDex,
    acBonus: f.acBonus,
    bonuses: f.bonuses,
    equippable: f.equippable,
  };
}

// `fieldBase` carries no width, so callers can set their own without fighting
// `w-full` (two width utilities on one element resolve by stylesheet order, not
// by the order they're written — which previously blew out the bonus amount box).
const fieldBase =
  "rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--gold)]";
const field = `w-full ${fieldBase}`;
const label = "block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)] mb-1";
const btn =
  "rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)] disabled:opacity-50";
const btnGold =
  "rounded border border-[var(--gold)] bg-[var(--panel-2)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black disabled:opacity-50";

export default function HomebrewManager({
  type,
  campaigns,
  initial,
  ammoOptions = [],
  monsterTypes = [],
  weaponOptions = [],
  armorOptions = [],
  spellListOptions = [],
}: {
  type: HbType;
  campaigns: CampaignRef[];
  initial: HomebrewRecord[];
  /** Ammo a homebrew weapon can require — book ammo plus any homebrew ammo. */
  ammoOptions?: string[];
  /** Creature types offered for homebrew monsters. */
  monsterTypes?: string[];
  /** Weapon names a homebrew class can allow at creation. */
  weaponOptions?: string[];
  /** Armor names a homebrew class can allow at creation. */
  armorOptions?: string[];
  /** Spell lists a homebrew caster class can draw from. */
  spellListOptions?: string[];
}) {
  const router = useRouter();
  const [items, setItems] = useState<HomebrewRecord[]>(initial);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Form | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const noun =
    type === "spell"
      ? "spell"
      : type === "monster"
        ? "monster"
        : type === "class"
          ? "class"
          : type === "ancestry"
            ? "ancestry"
            : type === "background"
              ? "background"
              : "item";
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => (f ? { ...f, [k]: v } : f));

  const patchTalent = (i: number, patch: Partial<TalentRow>) =>
    setForm((f) =>
      f ? { ...f, talents: f.talents.map((t, j) => (j === i ? { ...t, ...patch } : t)) } : f,
    );

  // Toggle a weapon/armor name in a class allow-list.
  const toggleAllowed = (field: "weapons" | "armor", name: string) =>
    setForm((f) => {
      if (!f) return f;
      const list = f[field];
      return { ...f, [field]: list.includes(name) ? list.filter((x) => x !== name) : [...list, name] };
    });

  const setTitle = (field: "titlesLawful" | "titlesNeutral" | "titlesChaotic", i: number, v: string) =>
    setForm((f) => (f ? { ...f, [field]: f[field].map((x, j) => (j === i ? v : x)) } : f));

  // Shared Effect Builder — one amount + target row (plus a weapon picker when
  // the target is Weapon Damage Die). Used by class features, class talents,
  // and ancestry traits so authoring is identical everywhere.
  // Shared "choose one" toggle — identical across features, talents, and traits.
  function chooseToggle(checked: boolean, onToggle: () => void) {
    return (
      <label className="flex items-center gap-2 text-[13px] text-[var(--text)]">
        <input type="checkbox" checked={checked} onChange={onToggle} />
        Choose One
      </label>
    );
  }

  function effectsEditor(effects: Effect[], setEffects: (next: Effect[]) => void, max = 6) {
    const patch = (k: number, p: Partial<Effect>) => setEffects(effects.map((e, m) => (m === k ? { ...e, ...p } : e)));
    const isSpell = (t: string) => t === "spellKnown" || t === "advSpell";
    const noAmount = (t: string) => isSpell(t) || t === "playerTalent";
    // Changing the top-level category recomputes the stored target.
    const changeCategory = (k: number, cat: string, cur: string) => {
      if (cat === "melee" || cat === "ranged" || cat === "mr") {
        patch(k, { target: COMBAT_MAP[cat][targetKind(cur)] || COMBAT_MAP[cat].atk });
      } else if (cat === "stat") {
        patch(k, { target: STAT_KEYS.includes(cur) ? cur : "str" });
      } else {
        patch(k, { target: cat });
      }
    };
    return (
      <div className="flex flex-col gap-2">
        {effects.map((e, k) => {
          const cat = targetCategory(e.target);
          const isCombat = cat === "melee" || cat === "ranged" || cat === "mr";
          return (
            <div key={k} className="flex flex-wrap gap-2">
              {noAmount(e.target) ? null : (
                <input
                  className={`${fieldBase} w-16 shrink-0`}
                  type="number"
                  value={e.amount}
                  placeholder={e.target === "perDay" ? "/day" : e.target === "weaponDie" ? "die" : "+1"}
                  onChange={(ev) => patch(k, { amount: ev.target.value })}
                />
              )}
              <select
                className={`${fieldBase} min-w-0 flex-1`}
                value={cat}
                onChange={(ev) => changeCategory(k, ev.target.value, e.target)}
              >
                {EFFECT_CATEGORIES.map(([key, lbl]) => (
                  <option key={key} value={key}>{lbl}</option>
                ))}
              </select>
              {isCombat ? (
                <select
                  className={`${fieldBase} min-w-0 flex-1`}
                  value={targetKind(e.target)}
                  onChange={(ev) => patch(k, { target: COMBAT_MAP[cat][ev.target.value] })}
                >
                  {COMBAT_KINDS.map(([key, lbl]) => (
                    <option key={key} value={key}>{lbl}</option>
                  ))}
                </select>
              ) : null}
              {cat === "stat" ? (
                <select
                  className={`${fieldBase} min-w-0 flex-1`}
                  value={e.target}
                  onChange={(ev) => patch(k, { target: ev.target.value })}
                >
                  {STAT_OPTIONS.map(([key, lbl]) => (
                    <option key={key} value={key}>{lbl}</option>
                  ))}
                </select>
              ) : null}
              {e.target === "weaponDie" ? (
                <select
                  className={`${fieldBase} min-w-0 flex-1`}
                  value={e.weapon}
                  onChange={(ev) => patch(k, { weapon: ev.target.value })}
                >
                  <option value="">Player Choice</option>
                  <option value="Strikes">Strikes (unarmed)</option>
                  {EFFECT_WEAPONS.map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              ) : null}
              {isSpell(e.target) ? (
                <>
                  <input
                    className={`${fieldBase} min-w-0 flex-1`}
                    list="hb-spell-list"
                    value={e.spell}
                    placeholder="Spell name, or Player Choice"
                    onChange={(ev) => patch(k, { spell: ev.target.value })}
                  />
                  <datalist id="hb-spell-list">
                    <option value="Player Choice" />
                    {EFFECT_SPELLS.map((sp) => (
                      <option key={sp} value={sp} />
                    ))}
                  </datalist>
                </>
              ) : null}
              {e.target === "featureCharges" ? (
                <input
                  className={`${fieldBase} min-w-0 flex-1`}
                  value={e.feature}
                  placeholder="Feature name (blank = this feature)"
                  onChange={(ev) => patch(k, { feature: ev.target.value })}
                />
              ) : null}
              <button className={`${btn} shrink-0`} onClick={() => setEffects(effects.filter((_, m) => m !== k))}>
                ✕
              </button>
            </div>
          );
        })}
        {effects.length < max ? (
          <button
            className={`${btn} self-start`}
            onClick={() => setEffects([...effects, { amount: "", target: TALENT_TARGETS[0][0], weapon: "", spell: "", feature: "" }])}
          >
            + Add effect
          </button>
        ) : null}
      </div>
    );
  }

  function shareLabel(rec: HomebrewRecord): string {
    const ids = rec.campaignIds ?? [];
    if (!ids.length) return "Personal";
    const names = ids.map((id) => campaigns.find((x) => x.id === id)?.name).filter(Boolean);
    if (!names.length) return `Shared · ${ids.length} campaign${ids.length === 1 ? "" : "s"}`;
    return `Shared · ${names.join(", ")}`;
  }

  function toggleCampaign(id: string) {
    setForm((f) =>
      f
        ? {
            ...f,
            campaignIds: f.campaignIds.includes(id)
              ? f.campaignIds.filter((x) => x !== id)
              : [...f.campaignIds, id],
          }
        : f,
    );
  }

  // Shared bonus editor — used by gear (applied when equipped) and ancestry
  // (applied at creation). Both validate against the same BONUS_TARGETS.
  function bonusEditor(labelText: string) {
    if (!form) return null;
    return (
      <div className="sm:col-span-2">
        <label className={label}>{labelText}</label>
        <div className="flex flex-col gap-2">
          {form.bonuses.map((b, i) => (
            <div key={i} className="flex gap-2">
              <input
                className={`${fieldBase} w-16 shrink-0`}
                type="number"
                value={b.amount}
                placeholder="+1"
                onChange={(e) =>
                  set(
                    "bonuses",
                    form.bonuses.map((x, j) => (j === i ? { ...x, amount: e.target.value } : x)),
                  )
                }
              />
              <select
                className={`${fieldBase} min-w-0 flex-1`}
                value={b.target}
                onChange={(e) =>
                  set(
                    "bonuses",
                    form.bonuses.map((x, j) => (j === i ? { ...x, target: e.target.value } : x)),
                  )
                }
              >
                {BONUS_TARGETS.map(([k, l]) => (
                  <option key={k} value={k}>{l}</option>
                ))}
              </select>
              <button
                className={`${btn} shrink-0`}
                onClick={() => set("bonuses", form.bonuses.filter((_, j) => j !== i))}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          className={`${btn} mt-2`}
          onClick={() => set("bonuses", [...form.bonuses, { amount: "", target: "ac" }])}
        >
          + Add bonus
        </button>
      </div>
    );
  }

  // Feature editor: descriptive text plus effects (Per Day sets tick boxes;
  // other effects are shown as the ability's mechanical hint).
  function featureEditor(field: "features", labelText: string, placeholder: string) {
    if (!form) return null;
    const rows = form[field];
    const setRows = (next: FeatureRow[]) => setForm((f) => (f ? { ...f, [field]: next } : f));
    return (
      <div className="sm:col-span-2">
        <label className={label}>{labelText}</label>
        <p className="mb-2 text-[11px] text-[var(--muted)]">
          Describe the ability, then add effects — use <b>Per Day (uses)</b> for limited-use abilities
          (Rage, Luck); leave effects empty for passive flavor.
        </p>
        <div className="flex flex-col gap-2">
          {rows.map((r, i) => (
            <div key={i} className="flex flex-col gap-2 rounded border border-[var(--border)] p-2">
              <div className="flex gap-2">
                <input
                  className={`${fieldBase} min-w-0 flex-1`}
                  value={r.text}
                  placeholder={placeholder}
                  onChange={(e) => setRows(rows.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)))}
                />
                <button className={`${btn} shrink-0`} onClick={() => setRows(rows.filter((_, j) => j !== i))}>
                  ✕
                </button>
              </div>
              {chooseToggle(!!r.choose, () => setRows(rows.map((x, j) => (j === i ? { ...x, choose: !x.choose } : x))))}
              <div className="sm:pl-4">
                {effectsEditor(r.effects, (next) => setRows(rows.map((x, j) => (j === i ? { ...x, effects: next } : x))))}
              </div>
            </div>
          ))}
        </div>
        <button className={`${btn} mt-2`} onClick={() => setRows([...rows, { text: "", effects: [], choose: false }])}>
          + Add
        </button>
      </div>
    );
  }

  // Ancestry traits editor: descriptive text plus effects (same builder as
  // features/talents). Per Day sets tick boxes; other effects apply at creation.
  function ancestryTraitEditor() {
    if (!form) return null;
    const rows = form.traits;
    const setRows = (next: AncestryTraitRow[]) => setForm((f) => (f ? { ...f, traits: next } : f));
    return (
      <div className="sm:col-span-2">
        <label className={label}>Traits</label>
        <p className="mb-2 text-[11px] text-[var(--muted)]">
          Describe the trait, then add effects — bonuses (attack, AC, HP, stats…) apply at character
          creation; use <b>Per Day (uses)</b> for limited-use traits. Tick <b>Choose one</b> to make
          the player pick a single effect at creation (Elf Farsight style).
        </p>
        <div className="flex flex-col gap-2">
          {rows.map((r, i) => (
            <div key={i} className="flex flex-col gap-2 rounded border border-[var(--border)] p-2">
              <div className="flex gap-2">
                <input
                  className={`${fieldBase} min-w-0 flex-1`}
                  value={r.text}
                  placeholder="Keen Senses: Advantage on checks to notice hidden creatures."
                  onChange={(e) => setRows(rows.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)))}
                />
                <button className={`${btn} shrink-0`} onClick={() => setRows(rows.filter((_, j) => j !== i))}>
                  ✕
                </button>
              </div>
              {chooseToggle(!!r.choose, () => setRows(rows.map((x, j) => (j === i ? { ...x, choose: !x.choose } : x))))}
              <div className="sm:pl-4">
                {effectsEditor(r.effects, (next) => setRows(rows.map((x, j) => (j === i ? { ...x, effects: next } : x))))}
              </div>
            </div>
          ))}
        </div>
        <button className={`${btn} mt-2`} onClick={() => setRows([...rows, { text: "", effects: [], choose: false }])}>
          + Add trait
        </button>
      </div>
    );
  }

  // Weapon/armor allow-list: an "All" checkbox plus a checkbox grid.
  function allowEditor(field: "weapons" | "armor", allField: "weaponsAll" | "armorAll", labelText: string, options: string[]) {
    if (!form) return null;
    const all = form[allField];
    return (
      <div className="sm:col-span-2">
        <label className={label}>{labelText}</label>
        <label className="mb-2 flex items-center gap-2 text-sm text-[var(--text)]">
          <input type="checkbox" checked={all} onChange={(e) => set(allField, e.target.checked)} />
          All {labelText.toLowerCase()}
        </label>
        {all ? null : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 sm:grid-cols-3">
            {options.map((name) => (
              <label key={name} className="flex items-center gap-2 text-[13px] text-[var(--text)]">
                <input
                  type="checkbox"
                  checked={form[field].includes(name)}
                  onChange={() => toggleAllowed(field, name)}
                />
                {name}
              </label>
            ))}
            {options.length === 0 ? (
              <p className="text-[11px] text-[var(--muted)]">No options available.</p>
            ) : null}
          </div>
        )}
      </div>
    );
  }

  async function submit() {
    if (!form) return;
    if (!form.name.trim()) {
      setError(`Give the ${noun} a name.`);
      return;
    }
    setBusy(true);
    setError("");
    try {
      const body =
        form.id === null
          ? { type, data: payloadFromForm(type, form), campaignIds: form.campaignIds }
          : { data: payloadFromForm(type, form), campaignIds: form.campaignIds };
      const res = await fetch(form.id === null ? "/api/homebrew" : `/api/homebrew/${form.id}`, {
        method: form.id === null ? "POST" : "PATCH",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        setError((await res.text()) || "Could not save.");
        return;
      }
      const { item } = (await res.json()) as { item: HomebrewRecord };
      setItems((prev) => {
        const without = prev.filter((p) => p.id !== item.id);
        return [item, ...without].sort((a, b) => a.name.localeCompare(b.name, "en"));
      });
      setForm(null);
      router.refresh(); // update the merged catalog on the page
    } catch {
      setError("Network error — try again.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(rec: HomebrewRecord) {
    if (!confirm(`Delete "${rec.name}"? This can't be undone.`)) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/homebrew/${rec.id}`, {
        method: "DELETE",
        credentials: "same-origin",
      });
      if (!res.ok) {
        setError("Could not delete.");
        return;
      }
      setItems((prev) => prev.filter((p) => p.id !== rec.id));
      if (form?.id === rec.id) setForm(null);
      router.refresh();
    } catch {
      setError("Network error — try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mb-6 rounded-lg border border-[var(--border)] bg-[var(--panel)]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-sm font-bold uppercase tracking-[0.15em]">
          My Homebrew{" "}
          {type === "spell"
            ? "Spells"
            : type === "monster"
              ? "Monsters"
              : type === "class"
                ? "Classes"
                : type === "ancestry"
                  ? "Ancestries"
                  : type === "background"
                    ? "Backgrounds"
                    : "Gear"}
          <span className="ml-2 text-[var(--muted)]">({items.length})</span>
        </span>
        <span className="text-[var(--muted)]">{open ? "▾" : "▸"}</span>
      </button>

      {open ? (
        <div className="border-t border-[var(--border)] px-4 py-4">
          {items.length === 0 ? (
            <p className="mb-3 text-[13px] text-[var(--muted)]">
              Nothing yet. Create a homebrew {noun} below — keep it personal, or share it with a
              campaign so every linked sheet can use it.
            </p>
          ) : (
            <ul className="mb-4 divide-y divide-[var(--border)]">
              {items.map((rec) => (
                <li key={rec.id} className="flex items-center justify-between gap-3 py-2">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-[var(--text)]">{rec.name}</div>
                    <div className="text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">
                      {shareLabel(rec)}
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button className={btn} onClick={() => setForm(formFromRecord(rec))} disabled={busy}>
                      Edit
                    </button>
                    <button className={btn} onClick={() => remove(rec)} disabled={busy}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {form ? (
            <div className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {type === "class" ? (
                  <div className="sm:col-span-2 flex gap-3">
                    <div className="min-w-0 flex-1">
                      <label className={label}>Name</label>
                      <input
                        className={field}
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder="Class name"
                      />
                    </div>
                    <div className="w-24 shrink-0">
                      <label className={label}>Hit die</label>
                      <select className={field} value={form.hd} onChange={(e) => set("hd", e.target.value)}>
                        {HD_DICE.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="sm:col-span-2">
                    <label className={label}>Name</label>
                    <input
                      className={field}
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder={
                        type === "spell"
                          ? "Spell name"
                          : type === "ancestry"
                            ? "Ancestry name"
                            : type === "background"
                              ? "Background name"
                              : "Item name"
                      }
                    />
                  </div>
                )}

                {type === "monster" ? (
                  <>
                    <div>
                      <label className={label}>Creature type</label>
                      <select className={field} value={form.ctype} onChange={(e) => set("ctype", e.target.value)}>
                        {(monsterTypes.length ? monsterTypes : ["Monster"]).map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={label}>Level</label>
                      <input className={field} value={form.lv} onChange={(e) => set("lv", e.target.value)} placeholder="1" />
                    </div>
                    <div>
                      <label className={label}>AC</label>
                      <input className={field} value={form.ac} onChange={(e) => set("ac", e.target.value)} placeholder="12" />
                    </div>
                    <div>
                      <label className={label}>HP</label>
                      <input className={field} value={form.hp} onChange={(e) => set("hp", e.target.value)} placeholder="8" />
                    </div>
                    <div>
                      <label className={label}>Movement</label>
                      <select className={field} value={form.mv} onChange={(e) => set("mv", e.target.value)}>
                        {MOVEMENTS.map(([v, l]) => (
                          <option key={v} value={v}>{l}</option>
                        ))}
                        {form.mv && !MOVEMENTS.some(([v]) => v === form.mv) ? (
                          <option value={form.mv}>{form.mv}</option>
                        ) : null}
                      </select>
                    </div>
                    <div>
                      <label className={label}>Alignment</label>
                      <select className={field} value={form.al} onChange={(e) => set("al", e.target.value)}>
                        {ALIGNMENTS.map(([k, l]) => (
                          <option key={k} value={k}>{l}</option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className={label}>Attacks</label>
                      <input
                        className={field}
                        value={form.atk}
                        onChange={(e) => set("atk", e.target.value)}
                        placeholder="1 claw +2 (1d6) or 1 bite +1 (1d8)"
                      />
                      <p className="mt-1 text-[11px] text-[var(--muted)]">
                        Written like the book — the GM screen turns each “+bonus (dice)” into a roll button.
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <label className={label}>Ability modifiers</label>
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                        {ABILITIES.map(([key, lbl]) => (
                          <div key={String(key)}>
                            <div className="mb-1 text-center text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{lbl}</div>
                            <input
                              className={`${field} text-center`}
                              value={String(form[key])}
                              onChange={(e) => set(key, e.target.value as never)}
                              placeholder="+0"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className={label}>Traits</label>
                      <textarea
                        className={field}
                        rows={3}
                        value={form.notes}
                        onChange={(e) => set("notes", e.target.value)}
                        placeholder="Fire Breath: Fills a near cube. DC 15 DEX or 4d6 damage."
                      />
                      <p className="mt-1 text-[11px] text-[var(--muted)]">
                        Use “Name: description.” for each trait. Any dice become roll buttons in the tracker.
                      </p>
                    </div>
                  </>
                ) : type === "spell" ? (
                  <>
                    <div>
                      <label className={label}>Tier</label>
                      <select className={field} value={form.tier} onChange={(e) => set("tier", e.target.value)}>
                        {TIERS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={label}>Range</label>
                      <select className={field} value={form.range} onChange={(e) => set("range", e.target.value)}>
                        {SPELL_RANGES.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={label}>Duration</label>
                      <input className={field} value={form.duration} onChange={(e) => set("duration", e.target.value)} placeholder="Instant / Focus / 5 rounds" />
                    </div>
                    <div>
                      <label className={label}>Damage / Healing (optional)</label>
                      <input className={field} value={form.damage} onChange={(e) => set("damage", e.target.value)} placeholder="e.g. 1d6" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={label}>Description</label>
                      <textarea className={field} rows={3} value={form.desc} onChange={(e) => set("desc", e.target.value)} />
                    </div>
                  </>
                ) : type === "class" ? (
                  <>
                    {allowEditor("weapons", "weaponsAll", "Weapons", weaponOptions)}
                    {allowEditor("armor", "armorAll", "Armor", armorOptions)}

                    {featureEditor(
                      "features",
                      "Features",
                      "Hard to Kill: You have advantage on rolls to stabilize.",
                    )}

                    <div className="sm:col-span-2">
                      <label className="flex items-center gap-2 text-sm text-[var(--text)]">
                        <input type="checkbox" checked={form.isCaster} onChange={(e) => set("isCaster", e.target.checked)} />
                        Spellcaster
                      </label>
                    </div>
                    {form.isCaster ? (
                      <>
                        <div>
                          <label className={label}>Casting stat</label>
                          <select className={field} value={form.castStat} onChange={(e) => set("castStat", e.target.value)}>
                            {CAST_STATS.map((st) => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className={label}>Spell list</label>
                          <select className={field} value={form.castList} onChange={(e) => set("castList", e.target.value)}>
                            {(spellListOptions.length ? spellListOptions : [form.castList]).map((l) => (
                              <option key={l} value={l}>{l}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className={label}>Spells known (tier 1)</label>
                          <input className={field} type="number" value={form.castKnown} onChange={(e) => set("castKnown", e.target.value)} placeholder="2" />
                        </div>
                        <div className="sm:col-span-2">
                          <p className="text-[11px] text-[var(--muted)]">Spellcasting DC is 10 + the spell’s tier.</p>
                        </div>
                      </>
                    ) : null}

                    <div className="sm:col-span-2">
                      <label className={label}>Talent table</label>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-[11px] text-[var(--muted)]">Rows 2 &amp; 3:</span>
                        <select
                          className={fieldBase}
                          value={form.talentSplit}
                          onChange={(e) => set("talentSplit", e.target.value)}
                        >
                          <option value="lo">3–6 / 7–9</option>
                          <option value="hi">3–7 / 8–9</option>
                        </select>
                      </div>
                      <p className="mb-2 text-[11px] text-[var(--muted)]">
                        Each roll band can carry up to four effects — the amount, then what it boosts.
                        Add a note for anything that isn’t a simple bonus.
                      </p>
                      <div className="flex flex-col gap-2">
                        {form.talents.map((t, i) => (
                          <div key={i} className="rounded border border-[var(--border)] p-2">
                            <div className="flex items-center gap-2">
                              <span className="w-14 shrink-0 text-center text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--gold)]">
                                {talentRollLabel(i, form.talentSplit)}
                              </span>
                              <input
                                className={`${fieldBase} min-w-0 flex-1`}
                                value={t.text}
                                placeholder="Note (optional)"
                                onChange={(e) => patchTalent(i, { text: e.target.value })}
                              />
                            </div>
                            <div className="mt-2 sm:pl-14">
                              {chooseToggle(!!t.choose, () => patchTalent(i, { choose: !t.choose }))}
                              <div className="mt-2">
                                {effectsEditor(t.effects, (next) => patchTalent(i, { effects: next }), 4)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="flex items-center gap-2 text-sm text-[var(--text)]">
                        <input type="checkbox" checked={form.hasTitles} onChange={(e) => set("hasTitles", e.target.checked)} />
                        Titles by alignment
                      </label>
                    </div>
                    {form.hasTitles ? (
                      <div className="sm:col-span-2">
                        <label className={label}>Titles</label>
                        <p className="mb-2 text-[11px] text-[var(--muted)]">
                          One title per tier as the character levels up. Leave a cell blank to skip that tier.
                        </p>
                        <div className="flex flex-col gap-2">
                          {TITLE_TIERS.map((tierLabel, i) => (
                            <div key={i} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                              <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--gold)] sm:w-20">
                                {tierLabel}
                              </span>
                              <input
                                className={`${fieldBase} min-w-0 flex-1`}
                                value={form.titlesLawful[i]}
                                placeholder="Lawful"
                                onChange={(e) => setTitle("titlesLawful", i, e.target.value)}
                              />
                              <input
                                className={`${fieldBase} min-w-0 flex-1`}
                                value={form.titlesNeutral[i]}
                                placeholder="Neutral"
                                onChange={(e) => setTitle("titlesNeutral", i, e.target.value)}
                              />
                              <input
                                className={`${fieldBase} min-w-0 flex-1`}
                                value={form.titlesChaotic[i]}
                                placeholder="Chaotic"
                                onChange={(e) => setTitle("titlesChaotic", i, e.target.value)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </>
                ) : type === "ancestry" ? (
                  <>
                    <div className="sm:col-span-2">
                      <label className={label}>Languages</label>
                      <input
                        className={field}
                        value={form.languages}
                        onChange={(e) => set("languages", e.target.value)}
                        placeholder="Common, Sylvan"
                      />
                    </div>
                    {ancestryTraitEditor()}
                  </>
                ) : type === "background" ? (
                  <>
                    <div className="sm:col-span-2">
                      <label className={label}>Description</label>
                      <textarea
                        className={field}
                        rows={3}
                        value={form.desc}
                        onChange={(e) => set("desc", e.target.value)}
                        placeholder="A short blurb — where this character came from and what they did before adventuring."
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className={label}>Kind</label>
                      <select className={field} value={form.kind} onChange={(e) => set("kind", e.target.value)}>
                        {GEAR_KINDS.map(([k, l]) => (
                          <option key={k} value={k}>{l}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className={label}>Cost</label>
                        <input className={field} type="number" value={form.cost} onChange={(e) => set("cost", e.target.value)} placeholder="0" />
                      </div>
                      <div className="w-20">
                        <label className={label}>Unit</label>
                        <select className={field} value={form.costUnit} onChange={(e) => set("costUnit", e.target.value)}>
                          <option value="gp">gp</option>
                          <option value="sp">sp</option>
                          <option value="cp">cp</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className={label}>Gear slots</label>
                      <input className={field} value={form.slots} onChange={(e) => set("slots", e.target.value)} placeholder="1" />
                    </div>
                    <div>
                      <label className={label}>Quantity per slot (optional)</label>
                      <input className={field} value={form.qty} onChange={(e) => set("qty", e.target.value)} placeholder="e.g. 20" />
                    </div>

                    {form.kind === "weapon" ? (
                      <>
                        <div>
                          <label className={label}>Weapon type</label>
                          <select className={field} value={form.wtype} onChange={(e) => set("wtype", e.target.value)}>
                            <option value="M">Melee</option>
                            <option value="R">Ranged</option>
                            <option value="M/R">Melee / Ranged</option>
                          </select>
                        </div>
                        <div>
                          <label className={label}>Range</label>
                          <select className={field} value={form.range} onChange={(e) => set("range", e.target.value)}>
                            {WEAPON_RANGES.map((r) => (
                              <option key={r} value={r}>{r}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className={label}>Requires ammo</label>
                          <select className={field} value={form.ammo} onChange={(e) => set("ammo", e.target.value)}>
                            <option value="">— None —</option>
                            {ammoOptions.map((a) => (
                              <option key={a} value={a}>{a}</option>
                            ))}
                            {form.ammo && !ammoOptions.includes(form.ammo) ? (
                              <option value={form.ammo}>{form.ammo} (missing)</option>
                            ) : null}
                          </select>
                        </div>
                        <div>
                          <label className={label}>Damage</label>
                          <input className={field} value={form.damage} onChange={(e) => set("damage", e.target.value)} placeholder="1d6" />
                        </div>
                        <div>
                          <label className={label}>Properties</label>
                          <input className={field} value={form.props} onChange={(e) => set("props", e.target.value)} placeholder="Finesse, Thrown" />
                        </div>
                      </>
                    ) : null}

                    {form.kind === "armor" ? (
                      <>
                        <div>
                          <label className={label}>Base AC</label>
                          <input className={field} type="number" value={form.acBase} onChange={(e) => set("acBase", e.target.value)} placeholder="11" />
                        </div>
                        <div className="flex items-end pb-2">
                          <label className="flex items-center gap-2 text-sm text-[var(--text)]">
                            <input type="checkbox" checked={form.acDex} onChange={(e) => set("acDex", e.target.checked)} />
                            Adds DEX modifier
                          </label>
                        </div>
                      </>
                    ) : null}

                    {form.kind === "shield" ? (
                      <div>
                        <label className={label}>AC bonus</label>
                        <input className={field} type="number" value={form.acBonus} onChange={(e) => set("acBonus", e.target.value)} placeholder="2" />
                      </div>
                    ) : null}

                    <div className="sm:col-span-2">
                      <label className={label}>Description</label>
                      <textarea className={field} rows={2} value={form.note} onChange={(e) => set("note", e.target.value)} />
                    </div>

                    {/* Bonuses + equippable — same system the sheet applies when the item is equipped */}
                    {bonusEditor("Bonuses (applied when equipped)")}
                    <div className="sm:col-span-2">
                      <label className="flex items-center gap-2 text-sm text-[var(--text)]">
                        <input type="checkbox" checked={form.equippable} onChange={(e) => set("equippable", e.target.checked)} />
                        Equippable (shows an equip checkbox in the gear list)
                      </label>
                    </div>
                  </>
                )}

                <div className="sm:col-span-2">
                  <label className={label}>Share with</label>
                  {campaigns.length === 0 ? (
                    <p className="text-[11px] text-[var(--muted)]">
                      Join or create a campaign to share homebrew with a party.
                    </p>
                  ) : (
                    <>
                      <div className="flex flex-col gap-1.5">
                        {campaigns.map((c) => (
                          <label key={c.id} className="flex items-center gap-2 text-sm text-[var(--text)]">
                            <input
                              type="checkbox"
                              checked={form.campaignIds.includes(c.id)}
                              onChange={() => toggleCampaign(c.id)}
                            />
                            {c.name}
                          </label>
                        ))}
                      </div>
                      <p className="mt-1.5 text-[11px] text-[var(--muted)]">
                        {form.campaignIds.length === 0
                          ? "Personal — only you can use this."
                          : `Every sheet linked to ${form.campaignIds.length} campaign${form.campaignIds.length === 1 ? "" : "s"} can use this.`}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {error ? <p className="mt-3 text-[13px] text-[var(--red)]">{error}</p> : null}

              <div className="mt-4 flex gap-2">
                <button className={btnGold} onClick={submit} disabled={busy}>
                  {busy ? "Saving…" : form.id === null ? "Create" : "Save changes"}
                </button>
                <button className={btn} onClick={() => setForm(null)} disabled={busy}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button className={btnGold} onClick={() => setForm(blankForm(type))} disabled={busy}>
              + Add homebrew {noun}
            </button>
          )}

          {error && !form ? <p className="mt-3 text-[13px] text-[var(--red)]">{error}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
