"use client";

import { campaignsFor } from "@/lib/homebrew-systems";
import { useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { GEAR } from "@/lib/data/gear";
import { SPELLS } from "@/lib/data/spells";
import BonusBadges, { BadgeStrip } from "@/components/hb/BonusBadges";
import ChipPicker from "@/components/hb/ChipPicker";
import Preview from "@/components/hb/Preview";
import Stepper from "@/components/hb/Stepper";
import MonsterBuilder, { MonsterPreview, blankMonster, monsterFromData, monsterPayload, type MonsterDraft } from "@/components/hb/sd/MonsterBuilder";
import GearBuilder, { GearPreview, blankGear, gearFromData, gearPayload, type GearDraft } from "@/components/hb/sd/GearBuilder";
import SpellBuilder, { SpellPreview, blankSpell, spellFromData, spellPayload, type SpellDraft } from "@/components/hb/sd/SpellBuilder";
import {
  badgeToEffect, badgesToGearBonuses, effectKinds, effectToBadge, gearBonusKinds, gearBonusStats, gearBonusesToBadges,
  type Effect,
} from "@/components/hb/sd/effects";

// Shadowdark's homebrew editor (all six bare types). Monsters, gear and spells
// are built by the dedicated builders in components/hb/sd/ (each owns its
// draft shape, legacy→draft parsing and payload); classes, ancestries and
// backgrounds are built here. Every mechanical effect is a badge (shared kit in
// components/hb/) over SD's existing, already-automated storage.

// Weapons available to the shared Effect Builder (Weapon Damage Die). Derived
// from the same gear data everywhere, so every effect builder lists the same
// weapons regardless of which page renders it.
const EFFECT_WEAPONS = GEAR.filter((g) => g.category === "weapon" && !/^strikes$/i.test(g.name)).map((g) => g.name);
// Spell names for the Learn Spell / Advantage effect pickers (deduped, sorted).
const EFFECT_SPELLS = Array.from(new Set(SPELLS.map((s) => s.name))).sort((a, b) => a.localeCompare(b, "en"));

// Mirror of lib/homebrew's public shapes (kept local so this client component
// doesn't pull in the server module). Must stay in sync with lib/homebrew's HbType.
// The "dcc-*" types are served by the separate DCC homebrew components, never this
// SD manager, but the union must stay wide enough to accept the shared HomebrewRecord
// the pages pass.
type HbType =
  | "spell" | "gear" | "monster" | "class" | "ancestry" | "background"
  | "dcc-item" | "dcc-monster" | "dcc-skill" | "dcc-spell" | "dcc-class" | "dcc-race"
  | "dnd-equipment" | "dnd-feat" | "dnd-background" | "dnd-spell" | "dnd-species" | "dnd-monster" | "dnd-subclass"
  | "nimble-item" | "nimble-spell" | "nimble-monster" | "nimble-ancestry"
  | "sw-weapon" | "sw-gear" | "sw-force" | "sw-character"
  | "ace-role" | "ace-gear" | "ace-extra" | "ace-focus" | "ace-trait"
  | "kob-trope" | "kob-strength" | "kob-flaw"
  | "d62e-skill" | "d62e-gear" | "d62e-power" | "d62e-creature" | "d62e-trait" | "d62e-limitation"
  | "icrpg-type" | "icrpg-ability" | "icrpg-loot" | "icrpg-gear" | "icrpg-spell" | "icrpg-monster"
  | "co-ability" | "co-gear"
  | "yze-weapon" | "yze-gear"
  | "twd-weapon" | "twd-gear"
  | "myz-weapon" | "myz-gear"
  | "vae-weapon" | "vae-gear"
  | "lotr-virtue" | "lotr-background" | "lotr-weapon" | "lotr-gear" | "lotr-monster"
  | "db-ability" | "db-spell" | "db-weapon" | "db-armor" | "db-gear" | "db-monster" | "db-npc"
  | "pb-weapon" | "pb-armor" | "pb-gear" | "pb-relic" | "pb-ritual" | "pb-monster" | "pb-ship"
  | "mmrpg-power" | "mmrpg-trait" | "mmrpg-tag" | "mmrpg-iconic" | "mmrpg-hq" | "mmrpg-starship";
type CampaignRef = { id: string; name: string; code: string; system?: string | null };
type HomebrewRecord = {
  id: string;
  type: HbType;
  name: string;
  campaignIds: string[];
  data: Record<string, unknown>;
  updatedAt: string;
  owner: boolean;
};

// Mirrors HD_DICE / CAST_STATS in lib/homebrew.ts (kept local so this client
// component doesn't import the server module).
const HD_DICE = ["1d4", "1d6", "1d8", "1d10", "1d12"];
const CAST_STATS = ["INT", "WIS", "CHA"];
// The book's languages (common, then rare). Ancestries may add custom ones.
const SD_LANGUAGES = [
  "Common", "Dwarvish", "Elvish", "Giant", "Goblin", "Merran", "Orcish", "Reptilian", "Sylvan", "Thanian",
  "Celestial", "Diabolic", "Draconic", "Primordial",
];
const EFFECT_KINDS = effectKinds(EFFECT_SPELLS, ["Player Choice", ...EFFECT_WEAPONS]);

// One roll-band of a class talent table. Rows 1/4/5 are fixed (2 / 10-11 / 12);
// rows 2 & 3 shift with `talentSplit`. Each row carries up to 2 effects.
// One mechanical effect (an amount + a target, see components/hb/sd/effects).
// Shared by class talents, class features, and ancestry traits.
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
  // monster / gear / spell — owned by the builders in components/hb/sd/
  mon: MonsterDraft;
  gear: GearDraft;
  spell: SpellDraft;
  // background
  desc: string;
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
  // ancestry
  traits: AncestryTraitRow[];
  languages: string;
  bonuses: BonusRow[]; // flat ancestry bonuses (older records) — shown as badges
};

const s = (v: unknown): string => (typeof v === "string" ? v : v == null ? "" : String(v));

function blankForm(): Form {
  return {
    id: null,
    name: "",
    campaignIds: [],
    mon: blankMonster(),
    gear: blankGear(),
    spell: blankSpell(),
    desc: "",
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
    bonuses: [],
  };
}

function formFromRecord(rec: HomebrewRecord): Form {
  const d = rec.data || {};
  const base = blankForm();
  base.id = rec.id;
  base.name = rec.name;
  base.campaignIds = rec.campaignIds ?? [];
  if (rec.type === "monster") {
    base.mon = monsterFromData(d);
  } else if (rec.type === "spell") {
    base.spell = spellFromData(d);
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
    base.gear = gearFromData(d);
  }
  return base;
}

function payloadFromForm(type: HbType, f: Form): Record<string, unknown> {
  if (type === "monster") return monsterPayload(f.name, f.mon);
  if (type === "spell") return spellPayload(f.name, f.spell);
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
  return gearPayload(f.name, f.gear);
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
  "rounded border border-[var(--gold)] bg-[var(--panel-2)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--on-accent)] disabled:opacity-50";

// Shadowdark's accent drives the shared builder kit (components/hb/*).
const ACCENT = { "--hb-accent": "var(--gold)" } as CSSProperties;

export default function HomebrewManager({
  type,
  campaigns: allCampaigns,
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
  // Share only with campaigns running this system (the API enforces it too).
  const campaigns = campaignsFor(type, allCampaigns);
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

  // Shared "choose one" toggle — identical across features, talents, and traits.
  function chooseToggle(checked: boolean, onToggle: () => void) {
    return (
      <label className="flex items-center gap-2 text-[13px] text-[var(--text)]">
        <input type="checkbox" checked={checked} onChange={onToggle} />
        Choose One
      </label>
    );
  }

  // Shared effect badges — class features, class talents and ancestry traits
  // all author the same HbEffect rows (lib/effects vocabulary) through the
  // badge strip, so the stored shape the wizard applies is unchanged.
  function effectsEditor(effects: Effect[], setEffects: (next: Effect[]) => void, max = 6) {
    return (
      <BonusBadges
        value={effects.map(effectToBadge)}
        kinds={EFFECT_KINDS}
        max={max}
        addLabel="+ Effect"
        empty="No mechanical effect (flavour only)"
        onChange={(v) => setEffects(v.map(badgeToEffect))}
      />
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

  // Flat ancestry bonuses (applied at creation). Older records carry these;
  // new ancestries put bonuses on their traits instead, so the strip only
  // shows when a record already has some.
  function ancestryBonusEditor() {
    if (!form || !form.bonuses.length) return null;
    return (
      <div className="sm:col-span-2">
        <label className={label}>Ancestry bonuses (applied at creation)</label>
        <BonusBadges
          value={gearBonusesToBadges(form.bonuses)}
          kinds={gearBonusKinds}
          stats={gearBonusStats}
          max={12}
          onChange={(v) => set("bonuses", badgesToGearBonuses(v).map((b) => ({ amount: String(b.amount), target: b.target })))}
        />
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
          Describe the ability, then add effect badges — use <b>Uses / Day</b> for limited-use abilities
          (Rage, Luck); leave it without badges for passive flavor.
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
          Describe the trait, then add effect badges — bonuses (attack, AC, HP, stats…) apply at character
          creation; use <b>Uses / Day</b> for limited-use traits. Tick <b>Choose one</b> to make
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

  const preview = form ? <SdPreview type={type} f={form} /> : null;

  return (
    <div className="mb-6 rounded-lg border border-[var(--border)] bg-[var(--panel)]" style={ACCENT}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-sm font-bold uppercase tracking-[0.15em]">
          Homebrew{" "}
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
            <div className="grid gap-4 rounded border border-[var(--border)] bg-[var(--panel-2)] p-4 lg:grid-cols-[minmax(0,1fr)_300px]">
              <div className="min-w-0">
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
                          : type === "monster"
                            ? "Monster name"
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
                  <MonsterBuilder value={form.mon} monsterTypes={monsterTypes} onChange={(v) => set("mon", v)} />
                ) : type === "spell" ? (
                  <SpellBuilder value={form.spell} onChange={(v) => set("spell", v)} />
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
                          <Stepper value={parseInt(form.castKnown, 10) || 0} min={0} max={10} ariaLabel="spells known" onChange={(v) => set("castKnown", String(v ?? 2))} />
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
                        Each roll band can carry up to four effect badges.
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
                      <ChipPicker
                        options={SD_LANGUAGES}
                        value={form.languages.split(",").map((x) => x.trim()).filter(Boolean)}
                        custom
                        customPh="Other (e.g. +1 common language)"
                        onChange={(v) => set("languages", v.join(", "))}
                      />
                    </div>
                    {ancestryTraitEditor()}
                    {ancestryBonusEditor()}
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
                  <GearBuilder value={form.gear} ammoOptions={ammoOptions} onChange={(v) => set("gear", v)} />
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
              <div className="lg:sticky lg:top-20 lg:self-start">{preview}</div>
            </div>
          ) : (
            <button className={btnGold} onClick={() => setForm(blankForm())} disabled={busy}>
              + Add homebrew {noun}
            </button>
          )}

          {error && !form ? <p className="mt-3 text-[13px] text-[var(--red)]">{error}</p> : null}
        </div>
      ) : null}
    </div>
  );
}

// ── Live previews (classes / ancestries / backgrounds here; the rest live
// beside their builders in components/hb/sd/) ────────────────────────────────
function SdPreview({ type, f }: { type: HbType; f: Form }) {
  if (type === "monster") return <MonsterPreview name={f.name} m={f.mon} />;
  if (type === "spell") return <SpellPreview name={f.name} s={f.spell} />;
  if (type === "gear") return <GearPreview name={f.name} g={f.gear} />;
  const fx = (effects: Effect[]) =>
    effects.length ? <BadgeStrip value={effects.map(effectToBadge)} kinds={EFFECT_KINDS} /> : null;
  if (type === "class") {
    const allow = (all: boolean, list: string[]) => (all ? "All" : list.length ? list.join(", ") : "None");
    return (
      <Preview title={f.name || "Unnamed class"} subtitle={`Hit die ${f.hd}`}>
        <p className="text-[13px]"><b className="text-[var(--hb-accent)]">Weapons:</b> {allow(f.weaponsAll, f.weapons)}</p>
        <p className="text-[13px]"><b className="text-[var(--hb-accent)]">Armor:</b> {allow(f.armorAll, f.armor)}</p>
        {f.isCaster ? (
          <p className="text-[13px]"><b className="text-[var(--hb-accent)]">Spellcasting:</b> {f.castStat}, {f.castList} list, {f.castKnown} tier-1 known</p>
        ) : null}
        {f.features.filter((r) => r.text.trim()).map((r, i) => (
          <div key={i} className="mt-1.5 text-[13px]">
            {r.text}
            {r.choose ? <span className="ml-1 text-[11px] text-[var(--muted)]">(choose one)</span> : null}
            {fx(r.effects)}
          </div>
        ))}
        <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Talents (2d6)</div>
        {f.talents.map((t, i) => (
          <div key={i} className="flex gap-2 text-[12px]">
            <span className="w-10 shrink-0 font-bold text-[var(--hb-accent)]">{talentRollLabel(i, f.talentSplit)}</span>
            <span className="min-w-0">{t.text || (t.effects.length ? null : "—")}{fx(t.effects)}</span>
          </div>
        ))}
      </Preview>
    );
  }
  if (type === "ancestry") {
    return (
      <Preview title={f.name || "Unnamed ancestry"} subtitle={f.languages ? `Languages: ${f.languages}` : undefined}>
        {f.traits.filter((r) => r.text.trim()).map((r, i) => (
          <div key={i} className="mt-1.5 text-[13px]">
            {r.text}
            {r.choose ? <span className="ml-1 text-[11px] text-[var(--muted)]">(choose one)</span> : null}
            {fx(r.effects)}
          </div>
        ))}
        {f.bonuses.length ? <BadgeStrip value={gearBonusesToBadges(f.bonuses)} kinds={gearBonusKinds} stats={gearBonusStats} /> : null}
      </Preview>
    );
  }
  return (
    <Preview title={f.name || "Unnamed background"}>
      <p className="text-[13px] leading-relaxed">{f.desc || "—"}</p>
    </Preview>
  );
}
