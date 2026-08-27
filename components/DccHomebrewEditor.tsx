"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ─────────────────────────────────────────────────────────────────────────────
// A single, schema-driven homebrew editor shared by every DCC reference page
// (bestiary, skills, spells, classes, races). Each page renders it with a
// `kind`; the schema for that kind describes the form, and the value it POSTs is
// handed straight to the matching lib/homebrew normaliser (which is the real
// validator), so this component carries no per-type sanitising of its own.
//
// It deliberately mirrors DccHomebrew.tsx (the items editor) in look and flow —
// an accordion listing the user's entries with Edit/Delete, plus an add/edit
// form and per-campaign share checkboxes.
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
  | (BaseField & { type: "stats" })
  | (BaseField & { type: "statBonuses" });

type Schema = {
  kind: string;
  title: string; // accordion header ("My Homebrew Monsters")
  noun: string; // singular ("Monster")
  fields: readonly Field[];
  blank: () => Data;
  toForm: (data: Data) => Data;
  summary: (data: Data) => string; // right-hand meta on the list row
  derive?: (f: Data) => Data; // optional: fill computed defaults (monsters)
  deriveLabel?: string;
};

const STATS = ["STR", "INT", "CON", "DEX", "CHA"] as const;

// ── shared vocab (mirrors lib/homebrew's exported constants) ─────────────────
const MONSTER_ROLES: readonly Opt[] = [
  ["Mob", "Mob"], ["Neighborhood Boss", "Neighborhood Boss"], ["Borough Boss", "Borough Boss"],
  ["City Boss", "City Boss"], ["Province Boss", "Province Boss"], ["Country Boss", "Country Boss"],
  ["Floor Boss", "Floor Boss"], ["Quest Boss", "Quest Boss"], ["Elite", "Elite"],
  ["Rival Crawler", "Rival Crawler"], ["NPC", "NPC"],
];
const BOSS_HB_BASE: Record<string, number> = {
  "Neighborhood Boss": 10, "Borough Boss": 15, "City Boss": 20,
  "Province Boss": 25, "Country Boss": 30, "Floor Boss": 40,
};
const STAT_OPTS: readonly Opt[] = STATS.map((s) => [s, s] as Opt);
const RANK_OPTS: readonly Opt[] = [["5", "Rank 5"], ["10", "Rank 10"], ["15", "Rank 15"]];
const SKILL_CAT_OPTS: readonly Opt[] = [["utility", "Utility"], ["attack", "Attack"]];
const SPELL_TYPE_OPTS: readonly Opt[] = [["utility", "Utility"], ["attack", "Attack"], ["heal", "Heal"]];
const RACE_GROUP_OPTS: readonly Opt[] = [["Earth", "Earth-born"], ["Alien", "Alien"]];

const s = (d: Data, k: string): string => {
  const v = d[k];
  return typeof v === "string" ? v : v == null ? "" : String(v);
};

// ── per-kind schemas ─────────────────────────────────────────────────────────
const SCHEMAS: Record<string, Schema> = {
  "dcc-monster": {
    kind: "dcc-monster",
    title: "My Homebrew Monsters",
    noun: "Monster",
    summary: (d) => [s(d, "role"), `Lvl ${s(d, "level")}`].filter(Boolean).join(" · "),
    blank: () => ({
      name: "", role: "Mob", size: "4", level: "1", tags: [],
      slotCount: "1", hpPerSlot: "1",
      surprise: "", evade: "", move: "20+S", dr: "2",
      stats: Object.fromEntries(STATS.map((k) => [k, { score: "1", mod: "0" }])),
      attacks: [], notes: [], page: "",
    }),
    toForm: (d) => {
      const hb = Array.isArray(d.hbSlots) ? (d.hbSlots as unknown[]) : [];
      const stats: Data = {};
      const sd = (d.stats ?? {}) as Record<string, unknown>;
      for (const k of STATS) {
        const c = (sd[k] ?? {}) as Record<string, unknown>;
        stats[k] = { score: c.score == null ? "1" : String(c.score), mod: c.mod == null ? "0" : String(c.mod) };
      }
      return {
        name: s(d, "name"),
        role: s(d, "role") || "Mob",
        size: s(d, "size") || "4",
        level: s(d, "level") || "1",
        tags: Array.isArray(d.tags) ? (d.tags as string[]) : [],
        slotCount: String(hb.length || 1),
        hpPerSlot: String(hb[0] ?? 1),
        surprise: s(d, "surprise"),
        evade: s(d, "evade"),
        move: s(d, "move") || "20+S",
        dr: s(d, "dr") || "2",
        stats,
        attacks: Array.isArray(d.attacks) ? (d.attacks as Data[]) : [],
        notes: Array.isArray(d.notes) ? (d.notes as string[]) : [],
        page: s(d, "page"),
      };
    },
    derive: (f) => {
      const role = s(f, "role");
      const level = parseInt(s(f, "level"), 10) || 1;
      const stats = (f.stats ?? {}) as Record<string, { score?: unknown; mod?: unknown }>;
      const conMod = parseInt(String(stats.CON?.mod ?? "0"), 10) || 0;
      const base = BOSS_HB_BASE[role];
      // Mob: one slot per Level, capped at 10 (p.270). Boss: Table 50 base by
      // tier (the +F floor bonus is left for the GM to add). Each slot = CON Mod.
      const count = base != null ? base : Math.min(level, 10);
      return { ...f, slotCount: String(count), hpPerSlot: String(Math.max(1, conMod)) };
    },
    deriveLabel: "Derive Health Bar (Mob = Level, Boss = Table 50; HP = CON mod)",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, placeholder: "Monster name…", maxLength: 120 },
      { key: "role", label: "Role", type: "select", options: MONSTER_ROLES },
      { key: "size", label: "Size (1–8)", type: "number" },
      { key: "level", label: "Level", type: "number" },
      { key: "tags", label: "Type tags", type: "stringList", placeholder: "e.g. Humanoid", addLabel: "+ Tag" },
      { key: "slotCount", label: "Health-Bar slots", type: "number", help: "Mob = Level (max 10); Boss = Table 50 by tier." },
      { key: "hpPerSlot", label: "HP per slot", type: "number", help: "The book uses the monster's CON modifier." },
      { key: "surprise", label: "Surprise", type: "text", placeholder: "e.g. 12+F" },
      { key: "evade", label: "Evade", type: "text", placeholder: "e.g. 13+F" },
      { key: "move", label: "Move", type: "text", placeholder: "e.g. 20+S" },
      { key: "dr", label: "DR", type: "text", placeholder: 'number, or "F"' },
      { key: "stats", label: "Stats", type: "stats", full: true },
      {
        key: "attacks", label: "Attacks", type: "objectList", full: true, addLabel: "+ Attack",
        fields: [
          { key: "name", label: "Name", type: "text", full: true, placeholder: "e.g. Claw" },
          { key: "toHit", label: "To hit", type: "text", placeholder: "e.g. 13+F" },
          { key: "damage", label: "Damage", type: "text", placeholder: "e.g. 2d6+3" },
          { key: "damageType", label: "Damage type", type: "text", placeholder: "e.g. Slashing" },
          { key: "range", label: "Range", type: "text", placeholder: "e.g. 5ft range" },
          { key: "rider", label: "Rider / on-hit effect", type: "textarea", full: true, placeholder: "e.g. On an Evade Major Fail, the crawler gains…" },
        ],
      },
      { key: "notes", label: "Notes (named abilities)", type: "stringList", full: true, placeholder: "Ability — rules text…", addLabel: "+ Note" },
      { key: "page", label: "Page (optional)", type: "number" },
    ],
  },

  "dcc-skill": {
    kind: "dcc-skill",
    title: "My Homebrew Skills",
    noun: "Skill",
    summary: (d) => [s(d, "category"), s(d, "group"), s(d, "stat")].filter(Boolean).join(" · "),
    blank: () => ({
      name: "", category: "utility", stat: "", group: "",
      passive: false, interrupt: false,
      damage: "", damageType: "", range: "", cooldown: "", limitations: "",
      desc: "", upgrades: [], page: "",
    }),
    toForm: (d) => ({
      name: s(d, "name"),
      category: s(d, "category") || "utility",
      stat: s(d, "stat"),
      group: s(d, "group"),
      passive: !!d.passive,
      interrupt: !!d.interrupt,
      damage: s(d, "damage"),
      damageType: s(d, "damageType"),
      range: s(d, "range"),
      cooldown: s(d, "cooldown"),
      limitations: s(d, "limitations"),
      desc: s(d, "desc"),
      upgrades: upgradesToForm(d.upgrades),
      page: s(d, "page"),
    }),
    fields: [
      { key: "name", label: "Name", type: "text", full: true, placeholder: "Skill name…", maxLength: 120 },
      { key: "category", label: "Category", type: "select", options: SKILL_CAT_OPTS },
      { key: "stat", label: "Stat", type: "select", options: STAT_OPTS, empty: "— None (pure passive) —" },
      { key: "group", label: "Group (optional)", type: "text", placeholder: "e.g. Edged, Ranged, Damage Effect" },
      { key: "passive", label: "Passive (never rolls)", type: "checkbox" },
      { key: "interrupt", label: "Interrupt", type: "checkbox" },
      { key: "damage", label: "Damage (attack only)", type: "text", placeholder: "e.g. 1d6" },
      { key: "damageType", label: "Damage type (attack only)", type: "text", placeholder: "e.g. Slashing" },
      { key: "range", label: "Range (attack only)", type: "text", placeholder: "e.g. Melee, 60 ft" },
      { key: "cooldown", label: "Cooldown (attack only)", type: "text", placeholder: "e.g. 1/combat" },
      { key: "limitations", label: "Limitations (optional)", type: "text", full: true, placeholder: "e.g. Class-only, magic-only" },
      { key: "desc", label: "Description", type: "textarea", full: true, placeholder: "What the skill does…", maxLength: 4000 },
      {
        key: "upgrades", label: "Rank upgrades", type: "objectList", full: true, addLabel: "+ Upgrade",
        fields: [
          { key: "rank", label: "Rank", type: "select", options: RANK_OPTS },
          { key: "text", label: "Effect", type: "textarea", full: true, placeholder: "What improves at this rank…" },
        ],
      },
      { key: "page", label: "Page (optional)", type: "number" },
    ],
  },

  "dcc-spell": {
    kind: "dcc-spell",
    title: "My Homebrew Spells",
    noun: "Spell",
    summary: (d) => [s(d, "type"), `${s(d, "mana")} mana`, s(d, "stat")].filter(Boolean).join(" · "),
    blank: () => ({
      name: "", mana: "1", type: "utility", stat: "INT",
      passive: false, aiFavor: "", desc: "", upgrades: [], page: "",
    }),
    toForm: (d) => ({
      name: s(d, "name"),
      mana: s(d, "mana") || "1",
      type: s(d, "type") || "utility",
      stat: s(d, "stat") || "INT",
      passive: !!d.passive,
      aiFavor: s(d, "aiFavor"),
      desc: s(d, "desc"),
      upgrades: upgradesToForm(d.upgrades),
      page: s(d, "page"),
    }),
    fields: [
      { key: "name", label: "Name", type: "text", full: true, placeholder: "Spell name…", maxLength: 120 },
      { key: "mana", label: "Mana cost", type: "number" },
      { key: "type", label: "Type", type: "select", options: SPELL_TYPE_OPTS },
      { key: "stat", label: "Stat", type: "select", options: STAT_OPTS },
      { key: "passive", label: "Passive", type: "checkbox" },
      { key: "aiFavor", label: "AI Favor (optional)", type: "number" },
      { key: "desc", label: "Description", type: "textarea", full: true, placeholder: "What the spell does…", maxLength: 4000 },
      {
        key: "upgrades", label: "Rank upgrades", type: "objectList", full: true, addLabel: "+ Upgrade",
        fields: [
          { key: "rank", label: "Rank", type: "select", options: RANK_OPTS },
          { key: "text", label: "Effect", type: "textarea", full: true, placeholder: "What improves at this rank…" },
        ],
      },
      { key: "page", label: "Page (optional)", type: "number" },
    ],
  },

  "dcc-class": {
    kind: "dcc-class",
    title: "My Homebrew Classes",
    noun: "Class",
    summary: (d) => {
      const cats = Array.isArray(d.categories) ? (d.categories as string[]).join("/") : "";
      return [cats, d.earthClass ? "Earth Class" : ""].filter(Boolean).join(" · ");
    },
    blank: () => ({ name: "", categories: [], statBonuses: { str: "", int: "", con: "", dex: "", cha: "" }, grants: [], earthClass: false, prerequisites: "", page: "" }),
    toForm: (d) => {
      const split = splitStatGrants(d.grants);
      return {
        name: s(d, "name"),
        categories: Array.isArray(d.categories) ? (d.categories as string[]) : [],
        statBonuses: split.bonuses,
        grants: split.grants,
        earthClass: !!d.earthClass,
        prerequisites: s(d, "prerequisites"),
        page: s(d, "page"),
      };
    },
    fields: [
      { key: "name", label: "Name", type: "text", full: true, placeholder: "Class name…", maxLength: 120 },
      { key: "categories", label: "Base categories", type: "stringList", full: true, placeholder: "e.g. Fighter", addLabel: "+ Category", help: "Blank = uses the class name. Two+ = a hybrid." },
      { key: "earthClass", label: "Earth Class (grants a Silver Earth Box)", type: "checkbox" },
      { key: "prerequisites", label: "Prerequisites (optional)", type: "text", full: true, placeholder: "e.g. Race must be…" },
      { key: "statBonuses", label: "Stat bonuses", type: "statBonuses", full: true, help: "Applied to a crawler's stats at creation, like a book class. Leave blank for none." },
      { key: "grants", label: "Other grants", type: "stringList", full: true, placeholder: "A mechanical benefit…", addLabel: "+ Grant" },
      { key: "page", label: "Page (optional)", type: "number" },
    ],
  },

  "dcc-race": {
    kind: "dcc-race",
    title: "My Homebrew Races",
    noun: "Race",
    summary: (d) => [s(d, "group"), `Size ${s(d, "size")}`].filter(Boolean).join(" · "),
    blank: () => ({ name: "", group: "Earth", size: "4", statBonuses: { str: "", int: "", con: "", dex: "", cha: "" }, grants: [], prerequisites: "", page: "" }),
    toForm: (d) => {
      const split = splitStatGrants(d.grants);
      return {
        name: s(d, "name"),
        group: s(d, "group") || "Earth",
        size: s(d, "size") || "4",
        statBonuses: split.bonuses,
        grants: split.grants,
        prerequisites: s(d, "prerequisites"),
        page: s(d, "page"),
      };
    },
    fields: [
      { key: "name", label: "Name", type: "text", full: true, placeholder: "Race name…", maxLength: 120 },
      { key: "group", label: "Group", type: "select", options: RACE_GROUP_OPTS },
      { key: "size", label: "Size (1–8)", type: "number" },
      { key: "prerequisites", label: "Prerequisites (optional)", type: "text", full: true, placeholder: "e.g. GM approval…" },
      { key: "statBonuses", label: "Stat bonuses", type: "statBonuses", full: true, help: "Applied to a crawler's stats at creation, like a book race. Leave blank for none." },
      { key: "grants", label: "Other grants", type: "stringList", full: true, placeholder: "A mechanical benefit…", addLabel: "+ Grant" },
      { key: "page", label: "Page (optional)", type: "number" },
    ],
  },
};

// Split a stored grants list (book style) into the structured stat-bonus control
// and the remaining free-text grants. A single-stat bonus bullet like
// "+2 Strength" / "-1 DEX" becomes a stat-bonus value; compound or non-stat
// grants ("+1 Strength and Dexterity", "Darkvision") stay as free-text grants.
const BONUS_TOKEN: Record<string, string> = {
  str: "str", strength: "str", int: "int", intelligence: "int", con: "con", constitution: "con",
  dex: "dex", dexterity: "dex", cha: "cha", charisma: "cha",
};
function splitStatGrants(v: unknown): { bonuses: Data; grants: string[] } {
  const bonuses: Data = { str: "", int: "", con: "", dex: "", cha: "" };
  const grants: string[] = [];
  (Array.isArray(v) ? (v as unknown[]) : []).forEach((g) => {
    const s = typeof g === "string" ? g : String(g ?? "");
    const m = s.match(/^\s*([+-]\d+)\s+([A-Za-z]+)\s*$/);
    const id = m ? BONUS_TOKEN[m[2].toLowerCase()] : undefined;
    if (m && id) {
      const prev = parseInt(String(bonuses[id] || "0"), 10) || 0;
      bonuses[id] = String(prev + parseInt(m[1], 10));
    } else if (s.trim()) {
      grants.push(s);
    }
  });
  return { bonuses, grants };
}

function upgradesToForm(v: unknown): Data[] {
  return Array.isArray(v)
    ? (v as unknown[]).map((u) => {
        const o = (u ?? {}) as Record<string, unknown>;
        return { rank: o.rank == null ? "5" : String(o.rank), text: typeof o.text === "string" ? o.text : "" };
      })
    : [];
}

// ── styles (shared with DccHomebrew.tsx) ─────────────────────────────────────
const fieldBase =
  "rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--red)]";
const labelCls = "mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]";
const btn =
  "rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)] disabled:opacity-50";
const btnRed =
  "rounded border border-[var(--red)] bg-[var(--panel-2)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#f0a8a3] hover:bg-[var(--red)] hover:text-white disabled:opacity-50";
const miniBtn =
  "rounded border border-[var(--border)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]";

export default function DccHomebrewEditor({
  kind,
  campaigns,
  initial,
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

  const openNew = () => {
    setForm(schema.blank());
    setCampaignIds([]);
    setEditId("");
    setError("");
  };
  const openEdit = (rec: HomebrewRecord) => {
    setForm(schema.toForm(rec.data || {}));
    setCampaignIds(rec.campaignIds ?? []);
    setEditId(rec.id);
    setError("");
  };
  const close = () => { setEditId(null); setError(""); };

  const toggleCampaign = (id: string) =>
    setCampaignIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));

  async function submit() {
    const name = String(form.name ?? "").trim();
    if (!name) { setError(`Give the ${schema.noun.toLowerCase()} a name.`); return; }
    setBusy(true);
    setError("");
    try {
      const isNew = editId === "";
      const body = isNew
        ? { type: kind, data: form, campaignIds }
        : { data: form, campaignIds };
      const res = await fetch(isNew ? "/api/homebrew" : `/api/homebrew/${editId}`, {
        method: isNew ? "POST" : "PATCH",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) { setError((await res.text()) || "Could not save."); return; }
      const { item } = (await res.json()) as { item: HomebrewRecord };
      setItems((prev) => {
        const without = prev.filter((p) => p.id !== item.id);
        return [item, ...without].sort((a, b) => a.name.localeCompare(b.name, "en"));
      });
      close();
      router.refresh();
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
      const res = await fetch(`/api/homebrew/${rec.id}`, { method: "DELETE", credentials: "same-origin" });
      if (!res.ok) { setError("Could not delete."); return; }
      setItems((prev) => prev.filter((p) => p.id !== rec.id));
      if (editId === rec.id) close();
      router.refresh();
    } catch {
      setError("Network error — try again.");
    } finally {
      setBusy(false);
    }
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
                  <span className="font-bold text-[#f0a8a3]">{rec.name}</span>
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
              No homebrew {schema.noun.toLowerCase()}s yet. Create one below — it shows up in this list, and (once shared) for your campaign.
            </p>
          )}

          {active ? (
            <div className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-4">
              {schema.derive ? (
                <button className={`${miniBtn} mb-3`} type="button" onClick={() => setForm((f) => schema.derive!(f))}>
                  {schema.deriveLabel ?? "Derive defaults"}
                </button>
              ) : null}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {schema.fields.map((f) => (
                  <FieldView key={f.key} field={f} value={form[f.key]} onChange={(v) => setField(f.key, v)} />
                ))}

                {campaigns.length ? (
                  <div className="sm:col-span-2">
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
              </div>

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
  if (field.type === "stats") {
    const sv = (value ?? {}) as Record<string, { score?: unknown; mod?: unknown }>;
    const setStat = (st: string, part: "score" | "mod", v: string) => {
      const cur = (sv[st] ?? {}) as { score?: unknown; mod?: unknown };
      onChange({ ...sv, [st]: { ...cur, [part]: v } });
    };
    return (
      <div className={cls}>
        <label className={labelCls}>{field.label} <span className="normal-case tracking-normal">(score & modifier)</span></label>
        <div className="grid grid-cols-5 gap-1.5">
          {STATS.map((st) => (
            <div key={st} className="rounded border border-[var(--border)] p-1.5">
              <div className="mb-1 text-center text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{st}</div>
              <input className={`${fieldBase} w-full px-1.5 py-1 text-center`} inputMode="numeric" placeholder="score"
                value={String(sv[st]?.score ?? "")} onChange={(e) => setStat(st, "score", e.target.value.replace(/[^\d]/g, ""))} />
              <input className={`${fieldBase} mt-1 w-full px-1.5 py-1 text-center`} placeholder="mod"
                value={String(sv[st]?.mod ?? "")} onChange={(e) => setStat(st, "mod", e.target.value.replace(/[^\d+-]/g, ""))} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "statBonuses") {
    const sv = (value ?? {}) as Record<string, unknown>;
    const set = (st: string, v: string) => onChange({ ...sv, [st]: v });
    return (
      <div className={cls}>
        <label className={labelCls}>{field.label}</label>
        {field.help ? <p className="mb-1 text-[11px] text-[var(--muted)]">{field.help}</p> : null}
        <div className="grid grid-cols-5 gap-1.5">
          {STATS.map((st) => {
            const k = st.toLowerCase();
            return (
              <div key={st} className="rounded border border-[var(--border)] p-1.5">
                <div className="mb-1 text-center text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{st}</div>
                <input className={`${fieldBase} w-full px-1.5 py-1 text-center`} placeholder="+0" inputMode="numeric"
                  value={String(sv[k] ?? "")} onChange={(e) => set(k, e.target.value.replace(/[^\d+-]/g, ""))} />
              </div>
            );
          })}
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
    const update = (i: number, k: string, v: unknown) => {
      const n = list.map((row, j) => (j === i ? { ...row, [k]: v } : row));
      onChange(n);
    };
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
