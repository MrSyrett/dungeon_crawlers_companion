"use client";

import { campaignsFor } from "@/lib/homebrew-systems";
import { useState, type CSSProperties, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { CLASS_POINTS, RACE_POINTS } from "@/lib/dcc-build-menu";
import MonsterBuilder, { MonsterPreview, blankMonster, monsterFromData, monsterPayload, type MonsterDraft } from "@/components/hb/dcc/MonsterBuilder";
import SkillBuilder, { SkillPreview, blankSkill, skillFromData, skillPayload, type SkillDraft } from "@/components/hb/dcc/SkillBuilder";
import SpellBuilder, { SpellPreview, blankSpell, spellFromData, spellPayload, type SpellDraft } from "@/components/hb/dcc/SpellBuilder";
import BuildBuilder, { BuildPreview, blankBuild, buildFromData, buildPayload, type BuildDraft } from "@/components/hb/dcc/BuildBuilder";
import { useDccNames, type DccNames } from "@/components/hb/dcc/data";

// ─────────────────────────────────────────────────────────────────────────────
// The shell every DCC reference page (bestiary, skills, spells, classes, races)
// and the Homebrew hub render with a `kind`: an accordion listing the user's
// entries with Edit/Delete, a builder + live preview, and per-campaign share
// checkboxes. The builders themselves live in components/hb/dcc/* (each file's
// header documents its storage shape); the value they POST is handed to the
// matching lib/homebrew normaliser, which is the real validator.
// Mirrors DccHomebrew.tsx (the items builder) in look and flow.
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
type BuilderProps<D> = { value: D; onChange: (v: D) => void; names: DccNames };
type Schema<D> = {
  title: string; // accordion header ("Homebrew Monsters")
  noun: string; // singular ("Monster")
  summary: (data: Data) => string; // right-hand meta on the list row
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
const schema = <D,>(x: Schema<D>) => x as unknown as Schema<unknown>;

const SCHEMAS: Record<string, Schema<unknown>> = {
  "dcc-monster": schema<MonsterDraft>({
    title: "Homebrew Monsters",
    noun: "Monster",
    summary: (d) => [s(d, "role"), `Lvl ${s(d, "level")}`].filter(Boolean).join(" · "),
    blank: blankMonster,
    fromData: monsterFromData,
    payload: monsterPayload,
    Builder: (p) => <MonsterBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <MonsterPreview name={p.name} m={p.value} />,
  }),
  "dcc-skill": schema<SkillDraft>({
    title: "Homebrew Skills",
    noun: "Skill",
    summary: (d) => [s(d, "category"), s(d, "group"), s(d, "stat")].filter(Boolean).join(" · "),
    blank: blankSkill,
    fromData: skillFromData,
    payload: skillPayload,
    Builder: (p) => <SkillBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <SkillPreview name={p.name} s={p.value} />,
  }),
  "dcc-spell": schema<SpellDraft>({
    title: "Homebrew Spells",
    noun: "Spell",
    summary: (d) => [s(d, "type"), `${s(d, "mana")} mana`, s(d, "stat")].filter(Boolean).join(" · "),
    blank: blankSpell,
    fromData: spellFromData,
    payload: spellPayload,
    Builder: (p) => <SpellBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <SpellPreview name={p.name} s={p.value} />,
  }),
  "dcc-class": schema<BuildDraft>({
    title: "Homebrew Classes",
    noun: "Class",
    summary: (d) => {
      const cats = Array.isArray(d.categories) ? (d.categories as string[]).join("/") : "";
      const pts = (d.build as { spent?: unknown })?.spent;
      return [cats, d.earthClass ? "Earth Class" : "", pts != null ? `${pts}/${CLASS_POINTS} pts` : ""].filter(Boolean).join(" · ");
    },
    blank: blankBuild,
    fromData: buildFromData,
    payload: (n, b) => buildPayload("dcc-class", n, b),
    Builder: (p) => <BuildBuilder kind="dcc-class" value={p.value} onChange={p.onChange} names={p.names} />,
    Preview: (p) => <BuildPreview kind="dcc-class" name={p.name} b={p.value} />,
  }),
  "dcc-race": schema<BuildDraft>({
    title: "Homebrew Races",
    noun: "Race",
    summary: (d) => {
      const pts = (d.build as { spent?: unknown })?.spent;
      return [s(d, "group"), `Size ${s(d, "size")}`, pts != null ? `${pts}/${RACE_POINTS} pts` : ""].filter(Boolean).join(" · ");
    },
    blank: blankBuild,
    fromData: buildFromData,
    payload: (n, b) => buildPayload("dcc-race", n, b),
    Builder: (p) => <BuildBuilder kind="dcc-race" value={p.value} onChange={p.onChange} names={p.names} />,
    Preview: (p) => <BuildPreview kind="dcc-race" name={p.name} b={p.value} />,
  }),
};

// ── styles (shared with DccHomebrew.tsx) ─────────────────────────────────────
const fieldBase =
  "rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--red)]";
const labelCls = "mb-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]";
const btn =
  "rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)] disabled:opacity-50";
const btnRed =
  "rounded border border-[var(--red)] bg-[var(--panel-2)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sys-link)] hover:bg-[var(--red)] hover:text-white disabled:opacity-50";
const ACCENT = { "--hb-accent": "var(--sys-link)" } as CSSProperties;

export default function DccHomebrewEditor({
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
  const names = useDccNames();
  const [items, setItems] = useState<HomebrewRecord[]>(initial);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null); // null = closed, "" = new
  const [name, setName] = useState("");
  const [draft, setDraft] = useState<unknown>(null);
  const [campaignIds, setCampaignIds] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (!sc) return null;

  const active = editId !== null && draft !== null;

  const openNew = () => {
    setName("");
    setDraft(sc.blank());
    setCampaignIds([]);
    setEditId("");
    setError("");
  };
  const openEdit = (rec: HomebrewRecord) => {
    setName(rec.name);
    setDraft(sc.fromData(rec.data || {}));
    setCampaignIds(rec.campaignIds ?? []);
    setEditId(rec.id);
    setError("");
  };
  const close = () => { setEditId(null); setDraft(null); setError(""); };

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
    <div className="mb-6 rounded-lg border border-[var(--border)] bg-[var(--panel)]">
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
              No homebrew {sc.noun.toLowerCase()}s yet. Create one below — it shows up in this list, and (once shared) for your campaign.
            </p>
          )}

          {active ? (
            <div style={ACCENT} className="grid gap-4 rounded border border-[var(--border)] bg-[var(--panel-2)] p-4 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div>
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
              <div className="lg:sticky lg:top-4 lg:self-start">
                <P name={name} value={draft} />
              </div>
            </div>
          ) : (
            <button className={btnRed} onClick={openNew}>+ New Homebrew {sc.noun}</button>
          )}
        </div>
      ) : null}
    </div>
  );
}
