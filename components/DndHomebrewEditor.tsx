"use client";

import { useState, type ReactElement } from "react";
import { useRouter } from "next/navigation";

// ─────────────────────────────────────────────────────────────────────────────
// A single, schema-driven homebrew editor shared by every D&D 2024 reference
// page (equipment, feats & backgrounds, spells, species, bestiary, classes).
// Each page renders it with a `kind`; the schema for that kind describes the
// form, and the value it POSTs is handed straight to the matching
// lib/homebrew normaliser (the real validator), so this component carries no
// per-type sanitising of its own. It mirrors DccHomebrewEditor in look/flow —
// an accordion of the user's entries with Edit/Delete, an add/edit form, and
// per-campaign share checkboxes.
// ─────────────────────────────────────────────────────────────────────────────

type CampaignRef = { id: string; name: string; code: string };
type HomebrewRecord = {
  id: string;
  type: string;
  name: string;
  campaignIds: string[];
  data: Record<string, unknown>;
  updatedAt: string;
  owner: boolean;
};

type Data = Record<string, unknown>;
type Opt = readonly [string, string];
type BaseField = { key: string; label: string; full?: boolean; help?: string };
type ScalarField =
  | (BaseField & { type: "text"; placeholder?: string; maxLength?: number; datalist?: readonly string[] })
  | (BaseField & { type: "textarea"; placeholder?: string; maxLength?: number })
  | (BaseField & { type: "number"; placeholder?: string })
  | (BaseField & { type: "select"; options: readonly Opt[]; empty?: string })
  | (BaseField & { type: "checkbox" });
type Field =
  | ScalarField
  | (BaseField & { type: "stringList"; placeholder?: string; addLabel?: string })
  | (BaseField & { type: "objectList"; addLabel?: string; fields: readonly ScalarField[] })
  | (BaseField & { type: "chips"; options: readonly string[] })
  | (BaseField & { type: "abilities" });

type BodyProps = { form: Data; setForm: (u: Data | ((f: Data) => Data)) => void };
type Schema = {
  kind: string;
  title: string;
  noun: string;
  fields: readonly Field[];
  blank: () => Data;
  toForm: (data: Data) => Data;
  summary: (data: Data) => string;
  Body?: (props: BodyProps) => ReactElement;
};

// ── shared vocab ─────────────────────────────────────────────────────────────
const ABILITIES = ["STR", "DEX", "CON", "INT", "WIS", "CHA"] as const;
const DAMAGE_TYPES = ["acid", "bludgeoning", "cold", "fire", "force", "lightning", "necrotic", "piercing", "poison", "psychic", "radiant", "slashing", "thunder"] as const;
const MASTERIES = ["Cleave", "Graze", "Nick", "Push", "Sap", "Slow", "Topple", "Vex"] as const;
const RARITIES = ["Common", "Uncommon", "Rare", "Very Rare", "Legendary", "Artifact", "Varies"] as const;
const SCHOOLS = ["Abjuration", "Conjuration", "Divination", "Enchantment", "Evocation", "Illusion", "Necromancy", "Transmutation"] as const;
const SPELL_CLASSES = ["Bard", "Cleric", "Druid", "Paladin", "Ranger", "Sorcerer", "Warlock", "Wizard"] as const;
const SIZES = ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"] as const;
const FEAT_CATEGORIES = ["Origin", "General", "Fighting Style", "Epic Boon"] as const;
const CASTER_TYPES = ["none", "full", "half", "third", "pact", "artificer"] as const;
const MONSTER_GROUPS = ["Humanoids", "Beasts", "Monstrosities", "Undead", "Fiends", "Celestials", "Fey", "Dragons", "Giants", "Elementals", "Constructs", "Aberrations", "Oozes", "Plants"] as const;
// Mechanical bonuses a magic item can grant (each maps to a real sheet effect).
const ITEM_BONUS_OPTS: readonly Opt[] = [
  ["ac", "Armor Class"], ["save", "Saving Throws (all)"], ["hp", "Hit Point Max"],
  ["speed", "Walking Speed (ft.)"], ["init", "Initiative"],
  ["spellAtk", "Spell Attack"], ["spellDC", "Spell Save DC"], ["atk", "Weapon Attack & Damage"],
  ["str", "Strength"], ["dex", "Dexterity"], ["con", "Constitution"],
  ["int", "Intelligence"], ["wis", "Wisdom"], ["cha", "Charisma"],
];

const optsOf = (list: readonly string[]): readonly Opt[] => list.map((x) => [x, x] as Opt);
const s = (d: Data, k: string): string => { const v = d[k]; return typeof v === "string" ? v : v == null ? "" : String(v); };
const arr = (d: Data, k: string): string[] => (Array.isArray(d[k]) ? (d[k] as string[]) : []);

// ── per-kind schemas ─────────────────────────────────────────────────────────
const SCHEMAS: Record<string, Schema> = {
  "dnd-equipment": {
    kind: "dnd-equipment",
    title: "My Homebrew Equipment",
    noun: "Equipment",
    fields: [],
    Body: EquipmentBody,
    summary: (d) => {
      const k = s(d, "hbKind");
      if (k === "weapon") return `Weapon · ${s(d, "damage")} ${s(d, "damageType")}`;
      if (k === "armor") return `Armor · ${s(d, "category")}`;
      if (k === "magic") { const n = Array.isArray(d.bonuses) ? d.bonuses.length : 0; return `Magic · ${s(d, "rarity")}${n ? ` · ${n} bonus${n === 1 ? "" : "es"}` : ""}`; }
      return `Gear · ${s(d, "category")}`;
    },
    blank: () => ({ name: "", hbKind: "weapon", category: "Simple", kind: "Melee", cost: "", damage: "1d4", damageType: "bludgeoning", weight: "", properties: [], mastery: "", bonuses: [] }),
    toForm: (d) => ({ ...d, properties: arr(d, "properties"), bonuses: Array.isArray(d.bonuses) ? (d.bonuses as Data[]) : [] }),
  },
  "dnd-feat": {
    kind: "dnd-feat",
    title: "My Homebrew Feats",
    noun: "Feat",
    summary: (d) => s(d, "category") || "Feat",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, placeholder: "e.g. Shadow Touched" },
      { key: "category", label: "Category", type: "select", options: optsOf(FEAT_CATEGORIES) },
      { key: "prerequisite", label: "Prerequisite", type: "text", placeholder: "e.g. Level 4+" },
      { key: "abilityScores", label: "Ability Score increase (optional)", type: "chips", options: [...ABILITIES], full: true, help: "Which ability scores this feat may raise." },
      { key: "benefits", label: "Benefits", type: "stringList", full: true, placeholder: "One benefit per line…", addLabel: "+ Benefit" },
      { key: "repeatable", label: "Repeatable", type: "checkbox" },
    ],
    blank: () => ({ name: "", category: "General", prerequisite: "", abilityScores: [], benefits: [""], repeatable: false }),
    toForm: (d) => ({ ...d, abilityScores: arr(d, "abilityScores"), benefits: arr(d, "benefits") }),
  },
  "dnd-background": {
    kind: "dnd-background",
    title: "My Homebrew Backgrounds",
    noun: "Background",
    summary: (d) => (arr(d, "abilityScores").join("/") || "Background"),
    fields: [
      { key: "name", label: "Name", type: "text", full: true, placeholder: "e.g. Guild Cartographer" },
      { key: "abilityScores", label: "Ability Scores (choose 3)", type: "chips", options: [...ABILITIES], full: true },
      { key: "feat", label: "Origin Feat", type: "text", placeholder: "e.g. Tough" },
      { key: "skillProficiencies", label: "Skill Proficiencies", type: "stringList", placeholder: "e.g. Perception", addLabel: "+ Skill" },
      { key: "toolProficiencies", label: "Tool Proficiencies", type: "stringList", placeholder: "e.g. Cartographer's Tools", addLabel: "+ Tool" },
      { key: "equipment", label: "Starting Equipment (options)", type: "stringList", full: true, placeholder: "An equipment package…", addLabel: "+ Option" },
      { key: "description", label: "Description", type: "textarea", full: true, placeholder: "What this background represents…" },
    ],
    blank: () => ({ name: "", abilityScores: [], feat: "", skillProficiencies: [""], toolProficiencies: [], equipment: [""], description: "" }),
    toForm: (d) => ({ ...d, abilityScores: arr(d, "abilityScores"), skillProficiencies: arr(d, "skillProficiencies"), toolProficiencies: arr(d, "toolProficiencies"), equipment: arr(d, "equipment") }),
  },
  "dnd-spell": {
    kind: "dnd-spell",
    title: "My Homebrew Spells",
    noun: "Spell",
    summary: (d) => [`${s(d, "level") === "0" ? "Cantrip" : "Level " + s(d, "level")} · ${s(d, "school")}`, s(d, "damage") && `${s(d, "damage")} ${s(d, "damageType")}`.trim(), s(d, "heal") && `heal ${s(d, "heal")}`].filter(Boolean).join(" · "),
    fields: [
      { key: "name", label: "Name", type: "text", full: true, placeholder: "e.g. Ember Lash" },
      { key: "level", label: "Level (0 = cantrip)", type: "number", placeholder: "0–9" },
      { key: "school", label: "School", type: "select", options: optsOf(SCHOOLS) },
      { key: "castingTime", label: "Casting Time", type: "text", placeholder: "e.g. Action" },
      { key: "range", label: "Range", type: "text", placeholder: "e.g. 60 feet" },
      { key: "components", label: "Components", type: "text", placeholder: "e.g. V, S, M (a pinch of ash)" },
      { key: "duration", label: "Duration", type: "text", placeholder: "e.g. Instantaneous" },
      { key: "concentration", label: "Concentration", type: "checkbox" },
      { key: "ritual", label: "Ritual", type: "checkbox" },
      { key: "classes", label: "Class Lists", type: "chips", options: [...SPELL_CLASSES], full: true },
      { key: "description", label: "Description", type: "textarea", full: true, placeholder: "What the spell does…" },
      { key: "roll", label: "Rolls as (on the sheet)", type: "select", options: [["attack", "Spell Attack Roll"], ["save", "Saving Throw"]], empty: "— none / auto —", help: "How casting resolves on the character sheet." },
      { key: "saveAbility", label: "Save Ability (if a save)", type: "select", options: optsOf([...ABILITIES]), empty: "—" },
      { key: "damage", label: "Damage dice", type: "text", placeholder: "e.g. 3d6" },
      { key: "damageType", label: "Damage Type", type: "select", options: optsOf([...DAMAGE_TYPES]), empty: "— none —" },
      { key: "heal", label: "Healing dice", type: "text", placeholder: "e.g. 2d8 (+ your spell mod)" },
      { key: "upcast", label: "Upcast: extra dice / slot level", type: "text", placeholder: "e.g. 1d6", help: "Added per slot level above the spell's level (or per cantrip tier)." },
      { key: "higherLevels", label: "At Higher Levels (text, optional)", type: "textarea", full: true, placeholder: "Upcast / cantrip scaling text…" },
    ],
    blank: () => ({ name: "", level: "1", school: "Evocation", castingTime: "Action", range: "60 feet", components: "V, S", duration: "Instantaneous", concentration: false, ritual: false, classes: [], description: "", roll: "", saveAbility: "DEX", damage: "", damageType: "", heal: "", upcast: "", higherLevels: "" }),
    toForm: (d) => ({ ...d, level: s(d, "level"), classes: arr(d, "classes") }),
  },
  "dnd-species": {
    kind: "dnd-species",
    title: "My Homebrew Species",
    noun: "Species",
    summary: (d) => `${s(d, "size")} · Speed ${s(d, "speed")}`,
    fields: [
      { key: "name", label: "Name", type: "text", full: true, placeholder: "e.g. Ashfolk" },
      { key: "size", label: "Size", type: "select", options: optsOf(SIZES) },
      { key: "speed", label: "Speed (ft.)", type: "number", placeholder: "30" },
      { key: "darkvision", label: "Darkvision (ft., 0 = none)", type: "number", placeholder: "0" },
      { key: "creatureType", label: "Creature Type", type: "text", placeholder: "Humanoid" },
      { key: "flavor", label: "Flavor", type: "textarea", full: true, placeholder: "A sentence or two of description…" },
      { key: "traits", label: "Traits", type: "objectList", full: true, addLabel: "+ Trait", fields: [
        { key: "name", label: "Trait name", type: "text", full: true, placeholder: "e.g. Cinder Step" },
        { key: "description", label: "Description", type: "textarea", full: true, placeholder: "What the trait does…" },
      ] },
    ],
    blank: () => ({ name: "", size: "Medium", speed: "30", darkvision: "0", creatureType: "Humanoid", flavor: "", traits: [{ name: "", description: "" }] }),
    toForm: (d) => ({ ...d, speed: s(d, "speed"), darkvision: s(d, "darkvision"), traits: Array.isArray(d.traits) ? (d.traits as Data[]) : [] }),
  },
  "dnd-monster": {
    kind: "dnd-monster",
    title: "My Homebrew Creatures",
    noun: "Creature",
    fields: [],
    Body: MonsterBody,
    summary: (d) => `${s(d, "size")} ${s(d, "type")} · CR ${s(d, "cr")}`,
    blank: () => ({
      name: "", size: "Medium", type: "Humanoid", alignment: "Unaligned", group: "Humanoids",
      ac: "12", acNote: "", hp: "10", hpFormula: "", speed: "30 ft.",
      abilities: Object.fromEntries(ABILITIES.map((a) => [a, "10"])),
      savingThrows: "", skills: "", damageResistances: "", damageImmunities: "", damageVulnerabilities: "", conditionImmunities: "",
      senses: "Passive Perception 10", languages: "", cr: "1", xp: "200", proficiencyBonus: "2",
      traits: [], actions: [{ name: "", description: "" }], bonusActions: [], reactions: [], legendaryActions: [],
    }),
    toForm: (d) => {
      const ab = (d.abilities ?? {}) as Record<string, unknown>;
      const abilities: Data = {};
      for (const a of ABILITIES) abilities[a] = String(ab[a] ?? "10");
      const list = (k: string) => (Array.isArray(d[k]) ? (d[k] as Data[]) : []);
      return {
        ...d, abilities,
        ac: s(d, "ac"), hp: s(d, "hp"), xp: s(d, "xp"), proficiencyBonus: s(d, "proficiencyBonus") || "2",
        traits: list("traits"), actions: list("actions"), bonusActions: list("bonusActions"), reactions: list("reactions"), legendaryActions: list("legendaryActions"),
      };
    },
  },
  "dnd-class": {
    kind: "dnd-class",
    title: "My Homebrew Classes",
    noun: "Class",
    fields: [],
    Body: ClassBody,
    summary: (d) => `d${s(d, "hitDie")} · ${arr(d, "primaryAbility").join("/") || "—"}${s(d, "spellcasting") !== "none" ? " · " + s(d, "spellcasting") : ""}`,
    blank: () => ({
      name: "", hitDie: "8", primaryAbility: [], savingThrows: [],
      armor: [], weapons: [], tools: [], skillsChoose: "2", skillsFrom: [""],
      startingEquipment: [""], spellcasting: "none", spellcastingAbility: "",
      subclassLabel: "Subclass", subclassLevel: "3", flavor: "",
      features: [{ name: "", level: "1", description: "" }], subclasses: [{ name: "", flavor: "" }],
    }),
    toForm: (d) => {
      const p = (d.proficiencies ?? {}) as Record<string, unknown>;
      const list = (v: unknown) => (Array.isArray(v) ? (v as string[]) : []);
      return {
        ...d,
        hitDie: s(d, "hitDie") || "8",
        primaryAbility: arr(d, "primaryAbility"), savingThrows: arr(d, "savingThrows"),
        armor: list(p.armor), weapons: list(p.weapons), tools: list(p.tools),
        skillsChoose: String((p.skillsChoose ?? d.skillsChoose ?? "2")), skillsFrom: list(p.skillsFrom ?? d.skillsFrom),
        startingEquipment: arr(d, "startingEquipment"),
        subclassLevel: s(d, "subclassLevel") || "3",
        features: Array.isArray(d.features) ? (d.features as Data[]).map((f) => ({ ...f, level: String(f.level ?? "1") })) : [],
        subclasses: Array.isArray(d.subclasses) ? (d.subclasses as Data[]) : [],
      };
    },
  },
};

// ── styles ───────────────────────────────────────────────────────────────────
const fieldBase =
  "rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--dnd)]";
const labelCls = "mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]";
const btn =
  "rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--dnd)] hover:text-[var(--text)] disabled:opacity-50";
const btnRed =
  "rounded border border-[var(--dnd)] bg-[var(--panel-2)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#f0a37f] hover:bg-[var(--dnd)] hover:text-white disabled:opacity-50";
const miniBtn =
  "rounded border border-[var(--border)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--muted)] hover:border-[var(--dnd)] hover:text-[var(--text)]";
const chip = (on: boolean) =>
  `rounded border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${on ? "border-[var(--dnd)] bg-[var(--panel-2)] text-[#f0a37f]" : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--dnd)]"}`;

export default function DndHomebrewEditor({
  kind, campaigns, initial,
}: {
  kind: string;
  campaigns: CampaignRef[];
  initial: HomebrewRecord[];
}) {
  const schema = SCHEMAS[kind];
  const router = useRouter();
  const [items, setItems] = useState<HomebrewRecord[]>(initial);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null); // null = closed, "" = new
  const [form, setForm] = useState<Data>({});
  const [campaignIds, setCampaignIds] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (!schema) return null;

  const active = editId !== null;
  const setField = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const openNew = () => { setForm(schema.blank()); setCampaignIds([]); setEditId(""); setError(""); };
  const openEdit = (rec: HomebrewRecord) => { setForm(schema.toForm(rec.data || {})); setCampaignIds(rec.campaignIds ?? []); setEditId(rec.id); setError(""); };
  const close = () => { setEditId(null); setError(""); };
  const toggleCampaign = (id: string) => setCampaignIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));

  async function submit() {
    const name = String(form.name ?? "").trim();
    if (!name) { setError(`Give the ${schema.noun.toLowerCase()} a name.`); return; }
    setBusy(true); setError("");
    try {
      const isNew = editId === "";
      const body = isNew ? { type: kind, data: form, campaignIds } : { data: form, campaignIds };
      const res = await fetch(isNew ? "/api/homebrew" : `/api/homebrew/${editId}`, {
        method: isNew ? "POST" : "PATCH",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) { setError((await res.text()) || "Could not save."); return; }
      const { item } = (await res.json()) as { item: HomebrewRecord };
      setItems((prev) => [item, ...prev.filter((p) => p.id !== item.id)].sort((a, b) => a.name.localeCompare(b.name, "en")));
      close();
      router.refresh();
    } catch { setError("Network error — try again."); } finally { setBusy(false); }
  }

  async function remove(rec: HomebrewRecord) {
    if (!confirm(`Delete "${rec.name}"? This can't be undone.`)) return;
    setBusy(true); setError("");
    try {
      const res = await fetch(`/api/homebrew/${rec.id}`, { method: "DELETE", credentials: "same-origin" });
      if (!res.ok) { setError("Could not delete."); return; }
      setItems((prev) => prev.filter((p) => p.id !== rec.id));
      if (editId === rec.id) close();
      router.refresh();
    } catch { setError("Network error — try again."); } finally { setBusy(false); }
  }

  const campaignName = (id: string) => campaigns.find((c) => c.id === id)?.name ?? "a campaign";

  return (
    <div className="mb-6 rounded-lg border border-[var(--border)] bg-[var(--panel)]">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between px-4 py-3 text-left">
        <span className="text-sm font-bold uppercase tracking-[0.15em]">
          {schema.title} {items.length ? <span className="text-[var(--muted)]">({items.length})</span> : null}
        </span>
        <span className="text-[var(--muted)]">{open ? "▾" : "▸"}</span>
      </button>

      {open ? (
        <div className="border-t border-[var(--border)] px-4 py-4">
          {items.length ? (
            <ul className="mb-4 flex flex-col gap-2">
              {items.map((rec) => (
                <li key={rec.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2">
                  <span className="font-bold text-[#f0a37f]">{rec.name}</span>
                  <span className="text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">{schema.summary(rec.data || {})}</span>
                  {rec.campaignIds.length ? (
                    <span className="text-[10px] uppercase tracking-[0.08em] text-[var(--muted)]">shared: {rec.campaignIds.map(campaignName).join(", ")}</span>
                  ) : (
                    <span className="text-[10px] uppercase tracking-[0.08em] text-[var(--muted)]">personal</span>
                  )}
                  <span className="ml-auto flex gap-2">
                    <button className={btn} disabled={busy} onClick={() => openEdit(rec)}>Edit</button>
                    <button className={btn} disabled={busy} onClick={() => remove(rec)}>Delete</button>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mb-4 text-sm text-[var(--muted)]">
              No homebrew {schema.noun.toLowerCase()} yet. Create one below — it shows up in this list, and (once shared) for your campaign.
            </p>
          )}

          {active ? (
            <div className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-4">
              {schema.Body ? (
                <schema.Body form={form} setForm={setForm} />
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {schema.fields.map((f) => (
                    <FieldView key={f.key} field={f} value={form[f.key]} onChange={(v) => setField(f.key, v)} />
                  ))}
                </div>
              )}

              {campaigns.length ? (
                <div className="mt-3">
                  <label className={labelCls}>Share with campaigns</label>
                  <div className="flex flex-wrap gap-3">
                    {campaigns.map((c) => (
                      <label key={c.id} className="flex items-center gap-2 text-[13px] text-[var(--text)]">
                        <input type="checkbox" checked={campaignIds.includes(c.id)} onChange={() => toggleCampaign(c.id)} />
                        {c.name}
                      </label>
                    ))}
                  </div>
                  <p className="mt-1 text-[11px] text-[var(--muted)]">Unchecked = personal (only you see it).</p>
                </div>
              ) : null}

              {error ? <p className="mt-3 text-[13px] text-[#f0a8a3]">{error}</p> : null}

              <div className="mt-4 flex gap-2">
                <button className={btnRed} disabled={busy} onClick={submit}>
                  {busy ? "Saving…" : editId === "" ? `Create ${schema.noun}` : "Save Changes"}
                </button>
                <button className={btn} disabled={busy} onClick={close}>Cancel</button>
              </div>
            </div>
          ) : (
            <button className={btnRed} onClick={openNew}>+ New Homebrew {schema.noun}</button>
          )}
        </div>
      ) : null}
    </div>
  );
}

// ── field renderers ──────────────────────────────────────────────────────────
function FieldView({ field, value, onChange }: { field: Field; value: unknown; onChange: (v: unknown) => void }) {
  const cls = field.full ? "sm:col-span-2" : "";

  if (field.type === "chips") {
    const sel = Array.isArray(value) ? (value as string[]) : [];
    const toggle = (o: string) => onChange(sel.includes(o) ? sel.filter((x) => x !== o) : [...sel, o]);
    return (
      <div className={cls}>
        <label className={labelCls}>{field.label}</label>
        {field.help ? <p className="mb-1 text-[11px] text-[var(--muted)]">{field.help}</p> : null}
        <div className="flex flex-wrap gap-1.5">
          {field.options.map((o) => (
            <button key={o} type="button" className={chip(sel.includes(o))} onClick={() => toggle(o)}>{o}</button>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "abilities") {
    const av = (value ?? {}) as Record<string, unknown>;
    const set = (a: string, v: string) => onChange({ ...av, [a]: v });
    return (
      <div className={cls}>
        <label className={labelCls}>{field.label}</label>
        <div className="grid grid-cols-6 gap-1.5">
          {ABILITIES.map((a) => (
            <div key={a} className="rounded border border-[var(--border)] p-1.5">
              <div className="mb-1 text-center text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{a}</div>
              <input className={`${fieldBase} w-full px-1.5 py-1 text-center`} inputMode="numeric" value={String(av[a] ?? "10")}
                onChange={(e) => set(a, e.target.value.replace(/[^\d]/g, ""))} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "stringList") {
    const list = Array.isArray(value) ? (value as string[]) : [];
    return (
      <div className={cls}>
        <label className={labelCls}>{field.label}</label>
        {field.help ? <p className="mb-1 text-[11px] text-[var(--muted)]">{field.help}</p> : null}
        <div className="flex flex-col gap-1.5">
          {list.map((row, i) => (
            <div key={i} className="flex gap-1.5">
              <input className={`${fieldBase} min-w-0 flex-1`} value={row} placeholder={field.placeholder}
                onChange={(e) => { const n = [...list]; n[i] = e.target.value; onChange(n); }} />
              <button type="button" className={miniBtn} onClick={() => onChange(list.filter((_, j) => j !== i))}>✕</button>
            </div>
          ))}
        </div>
        <button type="button" className={`${miniBtn} mt-1.5`} onClick={() => onChange([...list, ""])}>{field.addLabel ?? "+ Add"}</button>
      </div>
    );
  }

  if (field.type === "objectList") {
    const list = Array.isArray(value) ? (value as Data[]) : [];
    const update = (i: number, k: string, v: unknown) => onChange(list.map((row, j) => (j === i ? { ...row, [k]: v } : row)));
    return (
      <div className={cls}>
        <label className={labelCls}>{field.label}</label>
        <div className="flex flex-col gap-2">
          {list.map((row, i) => (
            <div key={i} className="rounded border border-[var(--border)] bg-[var(--panel)] p-2.5">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {field.fields.map((sf) => (
                  <ScalarView key={sf.key} field={sf} value={row[sf.key]} onChange={(v) => update(i, sf.key, v)} />
                ))}
              </div>
              <button type="button" className={`${miniBtn} mt-2`} onClick={() => onChange(list.filter((_, j) => j !== i))}>Remove</button>
            </div>
          ))}
        </div>
        <button type="button" className={`${miniBtn} mt-1.5`} onClick={() => onChange([...list, {}])}>{field.addLabel ?? "+ Add"}</button>
      </div>
    );
  }

  return <ScalarView field={field} value={value} onChange={onChange} wrapClass={cls} />;
}

function ScalarView({
  field, value, onChange, wrapClass,
}: {
  field: ScalarField; value: unknown; onChange: (v: unknown) => void; wrapClass?: string;
}) {
  const cls = wrapClass ?? (field.full ? "sm:col-span-2" : "");
  const strVal = value == null ? "" : String(value);
  return (
    <div className={cls}>
      {field.type === "checkbox" ? (
        <label className="mt-5 flex items-center gap-2 text-[13px] text-[var(--text)]">
          <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
          {field.label}
        </label>
      ) : (
        <>
          <label className={labelCls}>{field.label}</label>
          {field.help ? <p className="mb-1 text-[11px] text-[var(--muted)]">{field.help}</p> : null}
          {field.type === "textarea" ? (
            <textarea className={`${fieldBase} min-h-[70px] w-full`} value={strVal} maxLength={field.maxLength}
              placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />
          ) : field.type === "select" ? (
            <select className={`${fieldBase} w-full`} value={strVal} onChange={(e) => onChange(e.target.value)}>
              {field.empty ? <option value="">{field.empty}</option> : null}
              {field.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          ) : field.type === "number" ? (
            <input className={`${fieldBase} w-full`} inputMode="numeric" value={strVal} placeholder={field.placeholder}
              onChange={(e) => onChange(e.target.value.replace(/[^\d+-]/g, ""))} />
          ) : (
            <>
              <input className={`${fieldBase} w-full`} value={strVal} maxLength={field.maxLength} placeholder={field.placeholder}
                list={field.datalist ? `dl-${field.key}` : undefined} onChange={(e) => onChange(e.target.value)} />
              {field.datalist ? <datalist id={`dl-${field.key}`}>{field.datalist.map((o) => <option key={o} value={o} />)}</datalist> : null}
            </>
          )}
        </>
      )}
    </div>
  );
}

// ── Equipment: one editor whose fields depend on the chosen kind ─────────────
function EquipmentBody({ form, setForm }: BodyProps) {
  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));
  const kind = String(form.hbKind ?? "weapon");
  const f = (field: Field) => <FieldView key={field.key} field={field} value={form[field.key]} onChange={(v) => set(field.key, v)} />;

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <FieldView field={{ key: "name", label: "Name", type: "text", full: true, placeholder: "Item name…" }} value={form.name} onChange={(v) => set("name", v)} />
        <div>
          <label className={labelCls}>Kind</label>
          <select className={`${fieldBase} w-full`} value={kind} onChange={(e) => set("hbKind", e.target.value)}>
            <option value="weapon">Weapon</option>
            <option value="armor">Armor / Shield</option>
            <option value="gear">Adventuring Gear</option>
            <option value="magic">Magic Item</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {kind === "weapon" ? <>
          {f({ key: "category", label: "Category", type: "select", options: optsOf(["Simple", "Martial"]) })}
          {f({ key: "kind", label: "Kind", type: "select", options: optsOf(["Melee", "Ranged"]) })}
          {f({ key: "damage", label: "Damage", type: "text", placeholder: "1d8" })}
          {f({ key: "damageType", label: "Damage Type", type: "select", options: optsOf([...DAMAGE_TYPES]) })}
          {f({ key: "mastery", label: "Weapon Mastery", type: "select", options: optsOf(["", ...MASTERIES]), empty: "— none —" })}
          {f({ key: "cost", label: "Cost", type: "text", placeholder: "15 GP" })}
          {f({ key: "weight", label: "Weight", type: "text", placeholder: "3 lb." })}
          {f({ key: "properties", label: "Properties", type: "stringList", full: true, placeholder: "e.g. Finesse", addLabel: "+ Property" })}
        </> : null}

        {kind === "armor" ? <>
          {f({ key: "category", label: "Category", type: "select", options: optsOf(["Light", "Medium", "Heavy", "Shield"]) })}
          {f({ key: "baseAC", label: "Base AC", type: "text", placeholder: "14 + Dex modifier (max 2)" })}
          {f({ key: "strength", label: "Strength Requirement", type: "text", placeholder: "e.g. Str 13" })}
          {f({ key: "cost", label: "Cost", type: "text", placeholder: "50 GP" })}
          {f({ key: "weight", label: "Weight", type: "text", placeholder: "20 lb." })}
          {f({ key: "stealthDisadvantage", label: "Stealth Disadvantage", type: "checkbox" })}
        </> : null}

        {kind === "gear" ? <>
          {f({ key: "category", label: "Category", type: "text", placeholder: "Adventuring Gear" })}
          {f({ key: "cost", label: "Cost", type: "text", placeholder: "5 GP" })}
          {f({ key: "weight", label: "Weight", type: "text", placeholder: "1 lb." })}
          {f({ key: "description", label: "Description", type: "textarea", full: true, placeholder: "What it is / does…" })}
        </> : null}

        {kind === "magic" ? <>
          {f({ key: "type", label: "Type", type: "text", placeholder: "Wondrous Item / Weapon (any)…" })}
          {f({ key: "rarity", label: "Rarity", type: "select", options: optsOf([...RARITIES]) })}
          {f({ key: "attunement", label: "Requires Attunement", type: "checkbox" })}
          {f({ key: "attunementNote", label: "Attunement Note", type: "text", placeholder: "e.g. by a spellcaster" })}
          {f({ key: "description", label: "Description", type: "textarea", full: true, placeholder: "What the item does…" })}
          {f({ key: "bonuses", label: "Mechanical bonuses", type: "objectList", full: true, addLabel: "+ Bonus",
            help: "Applied to the character sheet while the item is equipped (and attuned, if it requires attunement). Ability-score and HP bonuses adjust those values directly; the rest fold into the derived totals.",
            fields: [
              { key: "target", label: "Applies to", type: "select", options: ITEM_BONUS_OPTS },
              { key: "amount", label: "Amount (+/-)", type: "number", placeholder: "1" },
            ] })}
        </> : null}
      </div>
    </div>
  );
}

// ── Monster: identity + 6-ability grid + action lists ────────────────────────
function MonsterBody({ form, setForm }: BodyProps) {
  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));
  const f = (field: Field) => <FieldView key={field.key} field={field} value={form[field.key]} onChange={(v) => set(field.key, v)} />;
  const actionFields = [
    { key: "name", label: "Name", type: "text", full: true, placeholder: "e.g. Bite" },
    { key: "description", label: "Description", type: "textarea", full: true, placeholder: "Melee Attack Roll: +5, reach 5 ft. Hit: 7 (1d10 + 2) piercing…" },
  ] as const;
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {f({ key: "name", label: "Name", type: "text", full: true, placeholder: "Creature name…" })}
        {f({ key: "size", label: "Size", type: "select", options: optsOf([...SIZES]) })}
        {f({ key: "type", label: "Type", type: "text", placeholder: "e.g. Undead" })}
        {f({ key: "alignment", label: "Alignment", type: "text", placeholder: "e.g. Chaotic Evil" })}
        {f({ key: "group", label: "Bestiary Group", type: "select", options: optsOf([...MONSTER_GROUPS]) })}
        {f({ key: "ac", label: "Armor Class", type: "number", placeholder: "13" })}
        {f({ key: "acNote", label: "AC Note", type: "text", placeholder: "(natural armor)" })}
        {f({ key: "hp", label: "Hit Points", type: "number", placeholder: "22" })}
        {f({ key: "hpFormula", label: "HP Formula", type: "text", placeholder: "22 (4d8 + 4)" })}
        {f({ key: "speed", label: "Speed", type: "text", placeholder: "30 ft., Fly 60 ft." })}
        {f({ key: "cr", label: "Challenge Rating", type: "text", placeholder: "1/2, 1, 5…" })}
        {f({ key: "xp", label: "XP", type: "number", placeholder: "200" })}
        {f({ key: "proficiencyBonus", label: "Proficiency Bonus", type: "number", placeholder: "2" })}
      </div>
      {f({ key: "abilities", label: "Ability Scores", type: "abilities" })}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {f({ key: "savingThrows", label: "Saving Throws", type: "text", placeholder: "Dex +4, Con +3" })}
        {f({ key: "skills", label: "Skills", type: "text", placeholder: "Perception +4, Stealth +6" })}
        {f({ key: "senses", label: "Senses", type: "text", placeholder: "Darkvision 60 ft., Passive Perception 14" })}
        {f({ key: "languages", label: "Languages", type: "text", placeholder: "Common, Draconic" })}
        {f({ key: "damageResistances", label: "Damage Resistances", type: "text", placeholder: "" })}
        {f({ key: "damageImmunities", label: "Damage Immunities", type: "text", placeholder: "" })}
        {f({ key: "damageVulnerabilities", label: "Damage Vulnerabilities", type: "text", placeholder: "" })}
        {f({ key: "conditionImmunities", label: "Condition Immunities", type: "text", placeholder: "" })}
      </div>
      {f({ key: "traits", label: "Traits", type: "objectList", full: true, addLabel: "+ Trait", fields: actionFields })}
      {f({ key: "actions", label: "Actions", type: "objectList", full: true, addLabel: "+ Action", fields: actionFields })}
      {f({ key: "bonusActions", label: "Bonus Actions", type: "objectList", full: true, addLabel: "+ Bonus Action", fields: actionFields })}
      {f({ key: "reactions", label: "Reactions", type: "objectList", full: true, addLabel: "+ Reaction", fields: actionFields })}
      {f({ key: "legendaryActions", label: "Legendary Actions", type: "objectList", full: true, addLabel: "+ Legendary Action", fields: actionFields })}
    </div>
  );
}

// ── Class: identity + proficiencies + key features + subclasses ──────────────
function ClassBody({ form, setForm }: BodyProps) {
  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));
  const f = (field: Field) => <FieldView key={field.key} field={field} value={form[field.key]} onChange={(v) => set(field.key, v)} />;
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {f({ key: "name", label: "Name", type: "text", full: true, placeholder: "Class name…" })}
        {f({ key: "hitDie", label: "Hit Die", type: "select", options: optsOf(["6", "8", "10", "12"]) })}
        {f({ key: "spellcasting", label: "Spellcasting", type: "select", options: optsOf([...CASTER_TYPES]) })}
        {f({ key: "primaryAbility", label: "Primary Ability", type: "chips", options: [...ABILITIES], full: true })}
        {f({ key: "savingThrows", label: "Saving Throw Proficiencies", type: "chips", options: [...ABILITIES], full: true })}
        {f({ key: "spellcastingAbility", label: "Spellcasting Ability", type: "select", options: optsOf(["", ...ABILITIES]), empty: "— none —" })}
        {f({ key: "subclassLabel", label: "Subclass Label", type: "text", placeholder: "e.g. Sacred Oath" })}
        {f({ key: "subclassLevel", label: "Subclass Level", type: "number", placeholder: "3" })}
      </div>
      {f({ key: "flavor", label: "Flavor", type: "textarea", full: true, placeholder: "A sentence or two on the class…" })}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {f({ key: "armor", label: "Armor Proficiencies", type: "stringList", placeholder: "e.g. Light armor", addLabel: "+ Armor" })}
        {f({ key: "weapons", label: "Weapon Proficiencies", type: "stringList", placeholder: "e.g. Simple weapons", addLabel: "+ Weapon" })}
        {f({ key: "tools", label: "Tool Proficiencies", type: "stringList", placeholder: "e.g. Thieves' Tools", addLabel: "+ Tool" })}
        {f({ key: "skillsFrom", label: "Skill Choices", type: "stringList", placeholder: "e.g. Athletics", addLabel: "+ Skill" })}
        {f({ key: "skillsChoose", label: "Number of Skills", type: "number", placeholder: "2" })}
        {f({ key: "startingEquipment", label: "Starting Equipment (options)", type: "stringList", full: true, placeholder: "An equipment package…", addLabel: "+ Option" })}
      </div>
      {f({ key: "features", label: "Key Features", type: "objectList", full: true, addLabel: "+ Feature", fields: [
        { key: "name", label: "Feature name", type: "text", placeholder: "e.g. Second Wind" },
        { key: "level", label: "Level", type: "number", placeholder: "1" },
        { key: "description", label: "Description", type: "textarea", full: true, placeholder: "What the feature does…" },
      ] })}
      {f({ key: "subclasses", label: "Subclasses", type: "objectList", full: true, addLabel: "+ Subclass", fields: [
        { key: "name", label: "Subclass name", type: "text", full: true, placeholder: "e.g. Path of Embers" },
        { key: "flavor", label: "Flavor", type: "textarea", full: true, placeholder: "A sentence on the subclass…" },
      ] })}
    </div>
  );
}
