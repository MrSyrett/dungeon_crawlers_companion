"use client";

import { useState, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import {
  BENEFIT_TIERS, DETRIMENT_TIERS, menuEntry, selectionCost, selectionGrant,
  summarizeBuild, budgetFor, DETRIMENT_CAP, RACE_POINTS, CLASS_POINTS,
  STAT_IDS, STAT_ABBR,
  BOSS_SEVERITY, bossSeverity, damageDiceForLevel, dccStatMod,
  statBase, statBudget, hbSlotCount,
  type Selection, type MenuEntry,
} from "@/lib/dcc-build-menu";

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

type BodyProps = { form: Data; setForm: (u: Data | ((f: Data) => Data)) => void };
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
  Body?: (props: BodyProps) => ReactElement; // custom form body (point-buy builders)
};

const STATS = ["STR", "INT", "CON", "DEX", "CHA"] as const;

// ── shared vocab (skill/spell selects) ───────────────────────────────────────
const STAT_OPTS: readonly Opt[] = STATS.map((s) => [s, s] as Opt);
const RANK_OPTS: readonly Opt[] = [["5", "Rank 5"], ["10", "Rank 10"], ["15", "Rank 15"]];
const SKILL_CAT_OPTS: readonly Opt[] = [["utility", "Utility"], ["attack", "Attack"]];
const SPELL_TYPE_OPTS: readonly Opt[] = [["utility", "Utility"], ["attack", "Attack"], ["heal", "Heal"]];

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
    fields: [],
    Body: MonsterBody,
    blank: () => ({
      name: "", role: "Mob", size: "4", level: "1", floor: "1", tags: [],
      scores: Object.fromEntries(STATS.map((k) => [k.toLowerCase(), "1"])),
      slotCount: "", hpPerSlot: "", surprise: "", evade: "", move: "20+S", dr: "",
      stats: {}, attacks: [], notes: [],
    }),
    toForm: (d) => {
      const hb = Array.isArray(d.hbSlots) ? (d.hbSlots as unknown[]) : [];
      const sd = (d.stats ?? {}) as Record<string, { score?: unknown }>;
      const scores: Data = {};
      for (const k of STATS) scores[k.toLowerCase()] = String(sd[k]?.score ?? "1");
      const drStr = s(d, "dr");
      return {
        name: s(d, "name"),
        role: s(d, "role") || "Mob",
        size: s(d, "size") || "4",
        level: s(d, "level") || "1",
        floor: /^\d+$/.test(drStr) ? drStr : "1",
        tags: Array.isArray(d.tags) ? (d.tags as string[]) : [],
        scores,
        stats: d.stats ?? {},
        slotCount: String(hb.length || ""),
        hpPerSlot: String(hb[0] ?? ""),
        surprise: s(d, "surprise"),
        evade: s(d, "evade"),
        move: s(d, "move") || "20+S",
        dr: drStr,
        attacks: Array.isArray(d.attacks) ? (d.attacks as Data[]) : [],
        notes: Array.isArray(d.notes) ? (d.notes as string[]) : [],
      };
    },
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
      const pts = (d.build as { spent?: unknown })?.spent;
      return [cats, d.earthClass ? "Earth Class" : "", pts != null ? `${pts}/${CLASS_POINTS} pts` : ""].filter(Boolean).join(" · ");
    },
    fields: [],
    Body: (p) => <RaceClassBody kind="dcc-class" {...p} />,
    blank: () => ({ name: "", categories: [], earthClass: false, prerequisites: "", build: { selections: [] } }),
    toForm: (d) => ({
      name: s(d, "name"),
      categories: Array.isArray(d.categories) ? (d.categories as string[]) : [],
      earthClass: !!d.earthClass,
      prerequisites: s(d, "prerequisites"),
      build: { selections: buildSelections(d) },
    }),
  },

  "dcc-race": {
    kind: "dcc-race",
    title: "My Homebrew Races",
    noun: "Race",
    summary: (d) => {
      const pts = (d.build as { spent?: unknown })?.spent;
      return [s(d, "group"), `Size ${s(d, "size")}`, pts != null ? `${pts}/${RACE_POINTS} pts` : ""].filter(Boolean).join(" · ");
    },
    fields: [],
    Body: (p) => <RaceClassBody kind="dcc-race" {...p} />,
    blank: () => ({ name: "", group: "Earth", size: "4", prerequisites: "", build: { selections: [] } }),
    toForm: (d) => ({
      name: s(d, "name"),
      group: s(d, "group") || "Earth",
      size: s(d, "size") || "4",
      prerequisites: s(d, "prerequisites"),
      build: { selections: buildSelections(d) },
    }),
  },
};

// Reconstruct the builder's selection list from a stored entry. New entries carry
// `build.selections`; a legacy free-form entry has only `grants`, so we keep each
// grant as an unpriced custom benefit (0 pts) — nothing is lost and the same
// grants regenerate on save; the user can re-price them against the menu.
function buildSelections(d: Data): Selection[] {
  const b = d.build as { selections?: unknown } | undefined;
  if (Array.isArray(b?.selections)) return b!.selections as Selection[];
  const grants = Array.isArray(d.grants) ? (d.grants as unknown[]) : [];
  return grants.map((g) => ({ id: "custom", kind: "benefit" as const, tier: "Minor", cost: 0, text: String(g) }));
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

// ── Race / Class point-buy builder (Core Rulebook pp. 158–162) ───────────────
const chipTiny =
  "rounded border border-[var(--border)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]";

function getSelections(form: Data): Selection[] {
  const b = form.build as { selections?: unknown } | undefined;
  return Array.isArray(b?.selections) ? (b!.selections as Selection[]) : [];
}

function RaceClassBody({ kind, form, setForm }: BodyProps & { kind: "dcc-race" | "dcc-class" }) {
  const isRace = kind === "dcc-race";
  const selections = getSelections(form);
  const budget = budgetFor(kind);
  const sum = summarizeBuild(selections);
  const remaining = budget + sum.detrimentPoints - sum.benefitPoints;
  const over = remaining < 0;

  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));
  const setSel = (next: Selection[]) => setForm((f) => ({ ...f, build: { selections: next } }));
  const addEntry = (e: MenuEntry, k: "benefit" | "detriment", tier: string, cost: number) =>
    setSel([...selections, { id: e.id, kind: k, tier, cost, ...(e.repeatable ? { amount: 1 } : {}) }]);
  const addCustom = (k: "benefit" | "detriment", tier: string, cost: number) =>
    setSel([...selections, { id: "custom", kind: k, tier, cost, text: "" }]);
  const updateSel = (i: number, patch: Partial<Selection>) =>
    setSel(selections.map((s, j) => (j === i ? { ...s, ...patch } : s)));
  const removeSel = (i: number) => setSel(selections.filter((_, j) => j !== i));

  const categories = Array.isArray(form.categories) ? (form.categories as string[]) : [];

  return (
    <div className="flex flex-col gap-3">
      {/* identity */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelCls}>Name</label>
          <input className={`${fieldBase} w-full`} value={String(form.name ?? "")} maxLength={120}
            placeholder={isRace ? "Race name…" : "Class name…"} onChange={(e) => set("name", e.target.value)} />
        </div>
        {isRace ? (
          <>
            <div>
              <label className={labelCls}>Group</label>
              <select className={`${fieldBase} w-full`} value={String(form.group ?? "Earth")} onChange={(e) => set("group", e.target.value)}>
                <option value="Earth">Earth-born</option>
                <option value="Alien">Alien</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Size (1–8)</label>
              <input className={`${fieldBase} w-full`} inputMode="numeric" value={String(form.size ?? "4")}
                onChange={(e) => set("size", e.target.value.replace(/[^\d]/g, ""))} />
            </div>
          </>
        ) : (
          <>
            <div className="sm:col-span-2">
              <label className={labelCls}>Base categories</label>
              <input className={`${fieldBase} w-full`} value={categories.join(", ")} placeholder="e.g. Fighter, Rogue"
                onChange={(e) => set("categories", e.target.value.split(",").map((x) => x.trim()).filter(Boolean))} />
              <p className="mt-1 text-[11px] text-[var(--muted)]">Comma-separated. Blank = uses the class name.</p>
            </div>
            <label className="flex items-center gap-2 text-[13px] text-[var(--text)]">
              <input type="checkbox" checked={!!form.earthClass} onChange={(e) => set("earthClass", e.target.checked)} />
              Earth Class (grants a Silver Earth Box)
            </label>
          </>
        )}
        <div className="sm:col-span-2">
          <label className={labelCls}>Prerequisites (optional)</label>
          <input className={`${fieldBase} w-full`} value={String(form.prerequisites ?? "")} placeholder="e.g. Popularity 3+"
            onChange={(e) => set("prerequisites", e.target.value)} />
        </div>
      </div>

      {/* budget bar */}
      <div className={`rounded border ${over ? "border-[var(--red)]" : "border-[var(--border)]"} bg-[var(--panel)] px-3 py-2`}>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[12px]">
          <span className="font-bold uppercase tracking-[0.1em] text-[var(--muted)]">Build Points</span>
          <span>Budget <b className="text-[var(--text)]">{budget}</b></span>
          <span>Spent <b className="text-[var(--text)]">{sum.benefitPoints}</b></span>
          <span>Detriments <b className="text-[var(--text)]">+{sum.detrimentPoints}</b>{sum.detrimentPoints >= DETRIMENT_CAP ? <span className="text-[var(--muted)]"> (cap)</span> : null}</span>
          <span className={over ? "text-[#f0a8a3] font-bold" : ""}>Remaining <b>{remaining}</b></span>
        </div>
        {over ? <p className="mt-1 text-[11px] text-[#f0a8a3]">Over budget by {-remaining} — remove a benefit or add a detriment. The book says leftover points are lost and you can’t overspend.</p> : null}
      </div>

      {/* selected */}
      <div>
        <label className={labelCls}>This build ({selections.length})</label>
        {selections.length ? (
          <ul className="flex flex-col gap-1.5">
            {selections.map((sel, i) => {
              const entry = menuEntry(sel.id);
              const param = sel.id === "custom" ? "text" : entry?.param;
              const label = sel.id === "custom" ? `Custom ${sel.tier}` : entry?.label ?? sel.id;
              const cost = selectionCost(sel);
              return (
                <li key={i} className="rounded border border-[var(--border)] bg-[var(--panel)] p-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${sel.kind === "detriment" ? "text-[#8fce8f]" : "text-[#f0a8a3]"}`}>
                      {sel.kind === "detriment" ? `+${cost}` : `−${cost}`} pt
                    </span>
                    <span className="text-[12px] text-[var(--text)]">{label}</span>
                    <button type="button" className={`${miniBtn} ml-auto`} onClick={() => removeSel(i)}>✕</button>
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    {entry?.repeatable ? (
                      <label className="flex items-center gap-1 text-[11px] text-[var(--muted)]">
                        ×<input className={`${fieldBase} w-14 px-1.5 py-1`} inputMode="numeric" value={String(sel.amount ?? 1)}
                          onChange={(e) => updateSel(i, { amount: Math.max(1, parseInt(e.target.value.replace(/[^\d]/g, ""), 10) || 1) })} />
                      </label>
                    ) : null}
                    {param === "stat" ? (
                      <select className={`${fieldBase} px-2 py-1`} value={String(sel.stat ?? "")} onChange={(e) => updateSel(i, { stat: e.target.value })}>
                        <option value="">— stat —</option>
                        {STAT_IDS.map((s) => <option key={s} value={s}>{STAT_ABBR[s]}</option>)}
                      </select>
                    ) : null}
                    {param === "skill" ? (
                      <input className={`${fieldBase} min-w-0 flex-1 px-2 py-1`} value={String(sel.skill ?? "")} placeholder="Skill / Spell name"
                        onChange={(e) => updateSel(i, { skill: e.target.value })} />
                    ) : null}
                    {param === "damageType" ? (
                      <input className={`${fieldBase} px-2 py-1`} value={String(sel.damageType ?? "")} placeholder="damage type"
                        onChange={(e) => updateSel(i, { damageType: e.target.value })} />
                    ) : null}
                    {param === "text" ? (
                      <input className={`${fieldBase} min-w-0 flex-1 px-2 py-1`} value={String(sel.text ?? "")} placeholder={entry?.help || "detail…"}
                        onChange={(e) => updateSel(i, { text: e.target.value })} />
                    ) : null}
                  </div>
                  <p className="mt-1 text-[11px] text-[var(--muted)]">→ {selectionGrant(sel)}</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-[12px] text-[var(--muted)]">Nothing yet — add benefits from the menu below.</p>
        )}
      </div>

      {/* menu */}
      <MenuBox title="Benefits — spend points" tiers={BENEFIT_TIERS} onAdd={addEntry} onCustom={addCustom} />
      <MenuBox title="Detriments — refund points (max +5)" tiers={DETRIMENT_TIERS} onAdd={addEntry} onCustom={addCustom} />
    </div>
  );
}

function MenuBox({
  title, tiers, onAdd, onCustom,
}: {
  title: string;
  tiers: typeof BENEFIT_TIERS;
  onAdd: (e: MenuEntry, k: "benefit" | "detriment", tier: string, cost: number) => void;
  onCustom: (k: "benefit" | "detriment", tier: string, cost: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [customTier, setCustomTier] = useState(0);
  return (
    <div className="rounded border border-[var(--border)] bg-[var(--panel)]">
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between px-3 py-2 text-left">
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{title}</span>
        <span className="text-[var(--muted)]">{open ? "▾" : "▸"}</span>
      </button>
      {open ? (
        <div className="max-h-[280px] overflow-y-auto border-t border-[var(--border)] px-3 py-2">
          {tiers.map((t) => (
            <div key={t.tier} className="mb-2">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
                {t.tier} · {t.cost} pt{t.cost === 1 ? "" : "s"}
              </div>
              <div className="flex flex-col gap-1">
                {t.entries.map((e) => (
                  <div key={e.id} className="flex items-start gap-2">
                    <button type="button" className={`${chipTiny} shrink-0`} onClick={() => onAdd(e, t.kind, t.tier, t.cost)}>+ Add</button>
                    <span className="text-[12px] leading-snug text-[var(--text)]">
                      {e.label}
                      {e.help ? <span className="text-[var(--muted)]"> — {e.help}</span> : null}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="mt-2 flex items-center gap-2 border-t border-[var(--border)] pt-2">
            <span className="text-[11px] text-[var(--muted)]">Custom at</span>
            <select className={`${fieldBase} px-2 py-1`} value={customTier} onChange={(e) => setCustomTier(Number(e.target.value))}>
              {tiers.map((t, i) => <option key={t.tier} value={i}>{t.tier} ({t.cost})</option>)}
            </select>
            <button type="button" className={chipTiny}
              onClick={() => { const t = tiers[customTier]; onCustom(t.kind, t.tier, t.cost); }}>
              + Add custom
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

// ── Mob / Boss guided builder (Core Rulebook pp. 270–273) ────────────────────
function MonsterBody({ form, setForm }: BodyProps) {
  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));
  const role = String(form.role ?? "Mob");
  const level = Math.max(1, parseInt(String(form.level ?? "1"), 10) || 1);
  const floor = parseInt(String(form.floor ?? "1"), 10) || 0;
  const boss = bossSeverity(role);

  const scores = (form.scores ?? {}) as Record<string, unknown>;
  const scoreOf = (k: string) => Math.max(statBase(role), parseInt(String(scores[k] ?? statBase(role)), 10) || statBase(role));
  const spent = STAT_IDS.reduce((n, k) => n + (scoreOf(k) - statBase(role)), 0);
  const budget = statBudget(role, level);
  const statsLeft = budget - spent;

  const conMod = dccStatMod(scoreOf("con"));
  const intMod = dccStatMod(scoreOf("int"));
  const dexMod = dccStatMod(scoreOf("dex"));
  const slots = hbSlotCount(role, level, floor);
  const dice = damageDiceForLevel(level);

  const setScore = (k: string, v: string) => set("scores", { ...scores, [k]: v.replace(/[^\d]/g, "") });

  const applyDerived = () => {
    const st: Record<string, { score: number; mod: number }> = {};
    for (const k of STAT_IDS) { const sc = scoreOf(k); st[k.toUpperCase()] = { score: sc, mod: dccStatMod(sc) }; }
    setForm((f) => ({
      ...f,
      stats: st,
      slotCount: String(slots),
      hpPerSlot: String(Math.max(1, conMod)),
      surprise: `${10 + intMod}+F`,
      evade: `${10 + dexMod}+F`,
      dr: String(Math.max(1, floor)),
    }));
  };

  const tags = Array.isArray(form.tags) ? (form.tags as string[]) : [];
  const attacks = Array.isArray(form.attacks) ? (form.attacks as Data[]) : [];

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelCls}>Name</label>
          <input className={`${fieldBase} w-full`} value={String(form.name ?? "")} maxLength={120} placeholder="Monster name…"
            onChange={(e) => set("name", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Role</label>
          <select className={`${fieldBase} w-full`} value={role} onChange={(e) => set("role", e.target.value)}>
            <option value="Mob">Mob</option>
            {BOSS_SEVERITY.map((b) => <option key={b.role} value={b.role}>{b.role}</option>)}
            <option value="Rival Crawler">Rival Crawler</option>
            <option value="NPC">NPC</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Type tags</label>
          <input className={`${fieldBase} w-full`} value={tags.join(", ")} placeholder="e.g. Humanoid, Undead"
            onChange={(e) => set("tags", e.target.value.split(",").map((x) => x.trim()).filter(Boolean))} />
        </div>
        <div>
          <label className={labelCls}>Level</label>
          <input className={`${fieldBase} w-full`} inputMode="numeric" value={String(form.level ?? "1")}
            onChange={(e) => set("level", e.target.value.replace(/[^\d]/g, ""))} />
        </div>
        <div>
          <label className={labelCls}>Floor (F)</label>
          <input className={`${fieldBase} w-full`} inputMode="numeric" value={String(form.floor ?? "1")}
            onChange={(e) => set("floor", e.target.value.replace(/[^\d]/g, ""))} />
        </div>
        <div>
          <label className={labelCls}>Size (1–8)</label>
          <input className={`${fieldBase} w-full`} inputMode="numeric" value={String(form.size ?? "4")}
            onChange={(e) => set("size", e.target.value.replace(/[^\d]/g, ""))} />
        </div>
      </div>

      {/* stat point-buy */}
      <div className="rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2">
        <div className="mb-1 flex flex-wrap items-baseline gap-x-4 text-[12px]">
          <span className="font-bold uppercase tracking-[0.1em] text-[var(--muted)]">Stat points</span>
          <span>Base <b className="text-[var(--text)]">{statBase(role)}</b> each</span>
          <span>Budget <b className="text-[var(--text)]">{budget}</b> ({boss ? `${boss.statsPerLevel}/Level, Boss` : "3/Level, Mob"})</span>
          <span className={statsLeft < 0 ? "text-[#f0a8a3] font-bold" : ""}>Left <b>{statsLeft}</b></span>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {STAT_IDS.map((k) => {
            const sc = scoreOf(k);
            return (
              <div key={k} className="rounded border border-[var(--border)] p-1.5 text-center">
                <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{STAT_ABBR[k]}</div>
                <input className={`${fieldBase} w-full px-1 py-1 text-center`} inputMode="numeric" value={String(scores[k] ?? statBase(role))}
                  onChange={(e) => setScore(k, e.target.value)} />
                <div className="mt-0.5 text-[10px] text-[var(--muted)]">mod {dccStatMod(sc) >= 0 ? "+" : ""}{dccStatMod(sc)}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* derived */}
      <div className="rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-[12px]">
        <div className="mb-1 font-bold uppercase tracking-[0.1em] text-[var(--muted)]">Derived (from the rules)</div>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <span>HB slots <b className="text-[var(--text)]">{slots}</b> × {Math.max(1, conMod)} HP {boss ? "(Table 50 + F)" : "(Level, max 10)"}</span>
          <span>Surprise <b className="text-[var(--text)]">{10 + intMod}+F</b></span>
          <span>Evade <b className="text-[var(--text)]">{10 + dexMod}+F</b></span>
          <span>DR <b className="text-[var(--text)]">{Math.max(1, floor)}</b> (Floor)</span>
          <span>Main attack <b className="text-[var(--text)]">{dice}d</b>{boss ? " (build a row down for a Boss)" : ""} · area/rider −1d</span>
        </div>
        <button type="button" className={`${miniBtn} mt-2`} onClick={applyDerived}>Apply derived stats, HB & defences</button>
        <p className="mt-1 text-[11px] text-[var(--muted)]">Fills the stat block below; you can still hand-edit Move, DR, and any value.</p>
      </div>

      {/* editable stat block (Move/DR/HB overrides + attacks + notes) */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <FieldView field={{ key: "move", label: "Move", type: "text", placeholder: "e.g. 20+S" }} value={form.move} onChange={(v) => set("move", v)} />
        <FieldView field={{ key: "dr", label: "DR", type: "text", placeholder: 'number or "F"' }} value={form.dr} onChange={(v) => set("dr", v)} />
        <FieldView field={{ key: "slotCount", label: "Health-Bar slots", type: "number" }} value={form.slotCount} onChange={(v) => set("slotCount", v)} />
        <FieldView field={{ key: "hpPerSlot", label: "HP per slot", type: "number" }} value={form.hpPerSlot} onChange={(v) => set("hpPerSlot", v)} />
        <FieldView field={{ key: "surprise", label: "Surprise", type: "text", placeholder: "e.g. 12+F" }} value={form.surprise} onChange={(v) => set("surprise", v)} />
        <FieldView field={{ key: "evade", label: "Evade", type: "text", placeholder: "e.g. 13+F" }} value={form.evade} onChange={(v) => set("evade", v)} />
        <FieldView
          field={{ key: "attacks", label: `Attacks (main = ${dice}d, area/rider −1d)`, type: "objectList", full: true, addLabel: "+ Attack",
            fields: [
              { key: "name", label: "Name", type: "text", full: true, placeholder: "e.g. Claw" },
              { key: "toHit", label: "To hit", type: "text", placeholder: "e.g. 13+F" },
              { key: "damage", label: "Damage", type: "text", placeholder: `e.g. ${dice}d6+${Math.max(1, conMod)}` },
              { key: "damageType", label: "Damage type", type: "text", placeholder: "e.g. Slashing" },
              { key: "range", label: "Range", type: "text", placeholder: "e.g. 5ft range" },
              { key: "rider", label: "Rider / on-hit effect", type: "textarea", full: true, placeholder: "e.g. On an Evade Major Fail, the crawler gains…" },
            ] }}
          value={attacks} onChange={(v) => set("attacks", v)} />
        <FieldView field={{ key: "notes", label: "Notes (named abilities)", type: "stringList", full: true, placeholder: "Ability — rules text…", addLabel: "+ Note" }}
          value={form.notes} onChange={(v) => set("notes", v)} />
      </div>
    </div>
  );
}
