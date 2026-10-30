"use client";

import { campaignsFor } from "@/lib/homebrew-systems";
import { useMemo, useState, type CSSProperties, type ReactElement } from "react";
import TemplatePicker, { templateCopyName, type TemplateOption } from "@/components/hb/TemplatePicker";
import { dndTemplates } from "@/components/hb/dnd/templates";
import { useRouter } from "next/navigation";
import MonsterBuilder, { MonsterPreview, blankMonster, monsterFromData, monsterPayload, type MonsterDraft } from "@/components/hb/dnd/MonsterBuilder";
import EquipmentBuilder, { EquipPreview, blankEquip, equipFromData, equipPayload, type EquipDraft } from "@/components/hb/dnd/EquipmentBuilder";
import SpellBuilder, { SpellPreview, blankSpell, spellFromData, spellPayload, type SpellDraft } from "@/components/hb/dnd/SpellBuilder";
import FeatBuilder, { FeatPreview, blankFeat, featFromData, featPayload, type FeatDraft } from "@/components/hb/dnd/FeatBuilder";
import BackgroundBuilder, { BackgroundPreview, blankBackground, backgroundFromData, backgroundPayload, type BackgroundDraft } from "@/components/hb/dnd/BackgroundBuilder";
import SpeciesBuilder, { SpeciesPreview, blankSpecies, speciesFromData, speciesPayload, type SpeciesDraft } from "@/components/hb/dnd/SpeciesBuilder";
import SubclassBuilder, { SubclassPreview, blankSubclass, subclassFromData, subclassPayload, type SubclassDraft } from "@/components/hb/dnd/SubclassBuilder";
import { useDndNames, type DndNames } from "@/components/hb/dnd/data";

// ─────────────────────────────────────────────────────────────────────────────
// The shell every D&D 2024 reference page (equipment, feats, backgrounds,
// spells, species, bestiary, classes) and the Homebrew hub render with a
// `kind`: an accordion listing the user's entries with Edit/Delete, a builder +
// live preview, and per-campaign share checkboxes (D&D campaigns only). The
// builders live in components/hb/dnd/* (each file's header documents its
// storage shape); the value they POST goes to the matching lib/homebrew
// normaliser, which is the real validator. Mirrors DccHomebrewEditor.
// ─────────────────────────────────────────────────────────────────────────────

type CampaignRef = { id: string; name: string; code: string; system?: string | null };
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
type BuilderProps<D> = { value: D; onChange: (v: D) => void; names: DndNames };
type Schema<D> = {
  title: string;
  noun: string;
  plural?: string;
  summary: (data: Data) => string;
  blank: () => D;
  fromData: (data: Data) => D;
  payload: (name: string, d: D) => Data;
  Builder: (p: BuilderProps<D>) => ReactElement;
  Preview: (p: { name: string; value: D }) => ReactElement;
};

const s = (d: Data, k: string): string => {
  const v = d[k];
  return typeof v === "string" ? v : v == null ? "" : String(v);
};
const n = (d: Data, k: string) => (Array.isArray(d[k]) ? (d[k] as unknown[]).length : 0);
const schema = <D,>(x: Schema<D>) => x as unknown as Schema<unknown>;

const SCHEMAS: Record<string, Schema<unknown>> = {
  "dnd-equipment": schema<EquipDraft>({
    title: "Homebrew Equipment", noun: "Equipment", plural: "equipment",
    summary: (d) => {
      const k = s(d, "hbKind");
      if (k === "weapon") return `Weapon · ${s(d, "damage")} ${s(d, "damageType")}`;
      if (k === "armor") return `Armor · ${s(d, "category")}`;
      if (k === "magic") { const b = n(d, "benefits") || n(d, "bonuses"); return `Magic · ${s(d, "rarity")}${b ? ` · ${b} bonus${b === 1 ? "" : "es"}` : ""}`; }
      return `Gear · ${s(d, "category")}`;
    },
    blank: blankEquip, fromData: equipFromData, payload: equipPayload,
    Builder: (p) => <EquipmentBuilder value={p.value} onChange={p.onChange} names={p.names} />,
    Preview: (p) => <EquipPreview name={p.name} e={p.value} />,
  }),
  "dnd-feat": schema<FeatDraft>({
    title: "Homebrew Feats", noun: "Feat",
    summary: (d) => [s(d, "category") || "Feat", s(d, "prerequisite")].filter(Boolean).join(" · "),
    blank: blankFeat, fromData: featFromData, payload: featPayload,
    Builder: (p) => <FeatBuilder value={p.value} onChange={p.onChange} names={p.names} />,
    Preview: (p) => <FeatPreview name={p.name} f={p.value} />,
  }),
  "dnd-background": schema<BackgroundDraft>({
    title: "Homebrew Backgrounds", noun: "Background",
    summary: (d) => [(Array.isArray(d.abilityScores) ? (d.abilityScores as string[]).join("/") : "") || "Background", s(d, "feat")].filter(Boolean).join(" · "),
    blank: blankBackground, fromData: backgroundFromData, payload: backgroundPayload,
    Builder: (p) => <BackgroundBuilder value={p.value} onChange={p.onChange} names={p.names} />,
    Preview: (p) => <BackgroundPreview name={p.name} b={p.value} />,
  }),
  "dnd-spell": schema<SpellDraft>({
    title: "Homebrew Spells", noun: "Spell",
    summary: (d) => [`${s(d, "level") === "0" ? "Cantrip" : "Level " + s(d, "level")} · ${s(d, "school")}`, s(d, "damage") && `${s(d, "damage")} ${s(d, "damageType")}`.trim(), s(d, "heal") && `heal ${s(d, "heal")}`].filter(Boolean).join(" · "),
    blank: blankSpell, fromData: spellFromData, payload: spellPayload,
    Builder: (p) => <SpellBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <SpellPreview name={p.name} x={p.value} />,
  }),
  "dnd-species": schema<SpeciesDraft>({
    title: "Homebrew Species", noun: "Species", plural: "species",
    summary: (d) => `${([] as unknown[]).concat(d.size ?? "").join("/")} · Speed ${s(d, "speed")}`,
    blank: blankSpecies, fromData: speciesFromData, payload: speciesPayload,
    Builder: (p) => <SpeciesBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <SpeciesPreview name={p.name} s={p.value} />,
  }),
  "dnd-monster": schema<MonsterDraft>({
    title: "Homebrew Creatures", noun: "Creature",
    summary: (d) => `${s(d, "size")} ${s(d, "type")} · CR ${s(d, "cr")}`,
    blank: blankMonster, fromData: monsterFromData, payload: monsterPayload,
    Builder: (p) => <MonsterBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <MonsterPreview name={p.name} m={p.value} />,
  }),
  "dnd-subclass": schema<SubclassDraft>({
    title: "Homebrew Subclasses", noun: "Subclass", plural: "subclasses",
    summary: (d) => { const k = n(d, "features"); return `${s(d, "className") || "—"} · ${k} feature${k === 1 ? "" : "s"}`; },
    blank: blankSubclass, fromData: subclassFromData, payload: subclassPayload,
    Builder: (p) => <SubclassBuilder value={p.value} onChange={p.onChange} names={p.names} />,
    Preview: (p) => <SubclassPreview name={p.name} s={p.value} />,
  }),
};

// ── styles (as the old D&D editor: crimson focus, link-coloured names) ───────
const fieldBase =
  "rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--dnd)]";
const labelCls = "mb-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]";
const btn =
  "rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--dnd)] hover:text-[var(--text)] disabled:opacity-50";
const btnRed =
  "rounded border border-[var(--dnd)] bg-[var(--panel-2)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sys-link)] hover:bg-[var(--dnd)] hover:text-white disabled:opacity-50";
const ACCENT = { "--hb-accent": "var(--sys-link)" } as CSSProperties;

export default function DndHomebrewEditor({
  kind,
  campaigns: allCampaigns,
  initial,
}: {
  kind: string;
  campaigns: CampaignRef[];
  initial: HomebrewRecord[];
}) {
  // Share only with campaigns running this system (the API enforces it too).
  const campaigns = campaignsFor(kind, allCampaigns);
  const sc = SCHEMAS[kind];
  const router = useRouter();
  const names = useDndNames();
  const [items, setItems] = useState<HomebrewRecord[]>(initial);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null); // null = closed, "" = new
  const [name, setName] = useState("");
  const [draft, setDraft] = useState<unknown>(null);
  const [campaignIds, setCampaignIds] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  // Name of the entry a new draft was started from (Template), for the strip.
  const [fromTemplate, setFromTemplate] = useState("");
  // Template list: your own homebrew of this kind first, then the book's
  // entries (lazy-loaded — see the templates module beside the builders).
  const templates = useMemo(() => {
    const book = dndTemplates(kind);
    return async (): Promise<TemplateOption[]> => [
      ...items.map((r) => ({ key: `hb:${r.id}`, name: r.name, group: "Your homebrew", meta: "Homebrew", data: r.data || {} })),
      ...(book ? await book() : []),
    ];
  }, [items, kind]);

  if (!sc) return null;

  const active = editId !== null && draft !== null;

  const openNew = () => { setFromTemplate("");
    setName("");
    setDraft(sc.blank());
    setCampaignIds([]);
    setEditId("");
    setError("");
  };
  const openEdit = (rec: HomebrewRecord) => { setFromTemplate("");
    setName(rec.name);
    setDraft(sc.fromData(rec.data || {}));
    setCampaignIds(rec.campaignIds ?? []);
    setEditId(rec.id);
    setError("");
  };
  const close = () => { setEditId(null); setDraft(null); setError(""); };

  // A template opens as a NEW, unsaved draft through the same legacy→draft
  // path a stored record takes (sc.fromData), named "<original> (copy)".
  const noun = sc.noun.toLowerCase();
  const startFromTemplate = (opt: TemplateOption) => {
    const keepShare = editId === "" && draft !== null; // a new draft was already open
    setName(templateCopyName(opt.name));
    setDraft(sc.fromData(opt.data || {}));
    if (!keepShare) setCampaignIds([]);
    setEditId("");
    setFromTemplate(opt.name);
    setError("");
  };
  const templateButton = <TemplatePicker source={templates} onPick={startFromTemplate} noun={noun} disabled={busy} className={btn} />;

  const toggleCampaign = (id: string) =>
    setCampaignIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));

  async function submit() {
    if (!name.trim()) { setError(`Give the ${sc.noun.toLowerCase()} a name.`); return; }
    setBusy(true);
    setError("");
    try {
      const isNew = editId === "";
      const data = sc.payload(name, draft);
      const body = isNew ? { type: kind, data, campaignIds } : { data, campaignIds };
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
  const B = sc.Builder;
  const P = sc.Preview;

  return (
    <div className="mb-6 rounded-lg border border-[var(--border)] bg-[var(--panel)]" style={ACCENT}>
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between px-4 py-3 text-left">
        <span className="text-sm font-bold uppercase tracking-[0.15em]">
          {sc.title} {items.length ? <span className="text-[var(--muted)]">({items.length})</span> : null}
        </span>
        <span className="text-[var(--muted)]">{open ? "▾" : "▸"}</span>
      </button>

      {open ? (
        <div className="border-t border-[var(--border)] px-4 py-4">
          {items.length ? (
            <ul className="mb-4 flex flex-col gap-2">
              {items.map((rec) => (
                <li key={rec.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2">
                  <span className="font-bold text-[var(--sys-link)]">{rec.name}</span>
                  <span className="text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">{sc.summary(rec.data || {})}</span>
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
              No homebrew {sc.plural ?? sc.noun.toLowerCase() + "s"} yet. Create one below — it shows up in this list, and (once shared) for your campaign.
            </p>
          )}

          {active ? (
            <div style={ACCENT} className="grid gap-4 rounded border border-[var(--border)] bg-[var(--panel-2)] p-4 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div>
                {editId === "" ? (
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-3">
                    <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                      {fromTemplate ? <>New {noun} · from <b className="text-[var(--text)]">{fromTemplate}</b></> : `New ${noun}`}
                    </span>
                    {templateButton}
                  </div>
                ) : null}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Name</label>
                    <input className={`${fieldBase} w-full`} value={name} maxLength={120} placeholder={`${sc.noun} name…`} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <B value={draft} onChange={setDraft} names={names} />
                </div>

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

                {error ? <p className="mt-3 text-[13px] text-[var(--bad)]">{error}</p> : null}

                <div className="mt-4 flex gap-2">
                  <button className={btnRed} disabled={busy} onClick={submit}>
                    {busy ? "Saving…" : editId === "" ? `Create ${sc.noun}` : "Save Changes"}
                  </button>
                  <button className={btn} disabled={busy} onClick={close}>Cancel</button>
                </div>
              </div>
              <div className="lg:sticky lg:top-20 lg:self-start">
                <P name={name} value={draft} />
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <button className={btnRed} onClick={openNew}>+ New Homebrew {sc.noun}</button>
              {templateButton}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
