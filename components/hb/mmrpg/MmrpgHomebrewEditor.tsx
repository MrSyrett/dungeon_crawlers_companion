"use client";
// ── MARVEL MULTIVERSE RPG (key "mmrpg") homebrew editor shell ───────────────
// Rendered by components/HomebrewEditor for the six mmrpg-* kinds (power,
// trait, tag, iconic item, headquarters, starship) on /mmrpg/homebrew and the
// reference pages (powers, traits, tags, equipment → iconic / HQ / starships):
// an accordion listing the user's entries with Edit/Delete, a builder + live
// preview, and per-campaign share checkboxes (Marvel campaigns only). Same look
// and flow as the other systems' shells; accent --mmrpg-ink (the lifted red,
// readable on black and on paper). The builders live beside this file;
// ./rules.ts documents the storage. lib/homebrew.ts normalizeMmrpg* validates.
import { campaignsFor } from "@/lib/homebrew-systems";
import { useMemo, useState, type CSSProperties, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import TemplatePicker, { templateCopyName, type TemplateOption } from "@/components/hb/TemplatePicker";
import { mmrpgTemplates } from "./templates";
import { PowerBuilder, PowerPreview, blankPower, powerFromData, powerPayload, type PowerDraft } from "./PowerBuilder";
import { LabelBuilder, LabelPreview, blankLabel, labelFromData, labelPayload, type LabelDraft } from "./LabelBuilder";
import { IconicBuilder, IconicPreview, blankIconic, iconicFromData, iconicPayload, type IconicDraft } from "./IconicBuilder";
import { BaseBuilder, BasePreview, baseFromData, basePayload, blankBase, type BaseDraft } from "./BaseBuilder";

type CampaignRef = { id: string; name: string; code: string; system?: string | null };
type HomebrewRecord = { id: string; type: string; name: string; campaignIds: string[]; data: Record<string, unknown>; updatedAt: string; owner: boolean };
type Data = Record<string, unknown>;
type Schema<D> = {
  title: string; noun: string; plural?: string;
  summary: (d: Data) => string;
  blank: () => D; fromData: (d: Data) => D; payload: (name: string, d: D) => Data;
  Builder: (p: { value: D; onChange: (v: D) => void }) => ReactElement;
  Preview: (p: { name: string; value: D }) => ReactElement;
};
const sv = (d: Data, k: string) => (d[k] == null ? "" : String(d[k]));
const schema = <D,>(x: Schema<D>) => x as unknown as Schema<unknown>;
const fxCount = (d: Data) => (Array.isArray(d.effects) ? d.effects.length : 0) + (Array.isArray(d.situational) ? d.situational.length : 0);
const rankSummary = (d: Data) => `Rank ${sv(d, "teamRank") || "?"}${Array.isArray(d.traits) ? ` · ${(d.traits as { n?: number }[]).reduce((s, t) => s + (Number(t.n) || 1), 0)} traits` : ""}${sv(d, "size") ? ` · ${sv(d, "size")}` : ""}`;

const SCHEMAS: Record<string, Schema<unknown>> = {
  "mmrpg-power": schema<PowerDraft>({
    title: "Homebrew Powers", noun: "Power",
    summary: (d) => [sv(d, "powerSet") || "None", sv(d, "action"), sv(d, "cost"), sv(d, "prerequisites") && sv(d, "prerequisites") !== "None" ? `prereq ${sv(d, "prerequisites")}` : ""].filter(Boolean).join(" · "),
    blank: blankPower, fromData: powerFromData, payload: powerPayload,
    Builder: (p) => <PowerBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <PowerPreview name={p.name} p={p.value} />,
  }),
  "mmrpg-trait": schema<LabelDraft>({
    title: "Homebrew Traits", noun: "Trait",
    summary: (d) => (fxCount(d) ? `trait · ${fxCount(d)} effect${fxCount(d) === 1 ? "" : "s"}` : "trait"),
    blank: blankLabel, fromData: labelFromData, payload: (n, l) => labelPayload("trait", n, l),
    Builder: (p) => <LabelBuilder noun="trait" value={p.value} onChange={p.onChange} />,
    Preview: (p) => <LabelPreview noun="trait" name={p.name} l={p.value} />,
  }),
  "mmrpg-tag": schema<LabelDraft>({
    title: "Homebrew Tags", noun: "Tag",
    summary: (d) => (fxCount(d) ? `tag · ${fxCount(d)} effect${fxCount(d) === 1 ? "" : "s"}` : "tag"),
    blank: blankLabel, fromData: labelFromData, payload: (n, l) => labelPayload("tag", n, l),
    Builder: (p) => <LabelBuilder noun="tag" value={p.value} onChange={p.onChange} />,
    Preview: (p) => <LabelPreview noun="tag" name={p.name} l={p.value} />,
  }),
  "mmrpg-iconic": schema<IconicDraft>({
    title: "Homebrew Iconic Items", noun: "Iconic Item",
    summary: (d) => `${sv(d, "type") || "Item"}${sv(d, "powerValue") ? " · PV " + sv(d, "powerValue") : ""}`,
    blank: blankIconic, fromData: iconicFromData, payload: iconicPayload,
    Builder: (p) => <IconicBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <IconicPreview name={p.name} it={p.value} />,
  }),
  "mmrpg-hq": schema<BaseDraft>({
    title: "Homebrew Headquarters", noun: "Headquarters", plural: "headquarters",
    summary: rankSummary,
    blank: blankBase, fromData: baseFromData, payload: basePayload,
    Builder: (p) => <BaseBuilder kind="hq" value={p.value} onChange={p.onChange} />,
    Preview: (p) => <BasePreview kind="hq" name={p.name} b={p.value} />,
  }),
  "mmrpg-starship": schema<BaseDraft>({
    title: "Homebrew Starships", noun: "Starship",
    summary: rankSummary,
    blank: blankBase, fromData: baseFromData, payload: basePayload,
    Builder: (p) => <BaseBuilder kind="ship" value={p.value} onChange={p.onChange} />,
    Preview: (p) => <BasePreview kind="ship" name={p.name} b={p.value} />,
  }),
};

const fieldBase = "rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
const labelCls = "mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]";
const btn = "rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)] disabled:opacity-50";
const btnAccent = "rounded border border-[var(--hb-accent)] bg-[var(--panel-2)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--hb-accent)] hover:bg-[var(--hb-accent)] hover:text-white disabled:opacity-50";
const ACCENT = { "--hb-accent": "var(--mmrpg-ink)" } as CSSProperties;

export default function MmrpgHomebrewEditor({ kind, campaigns: allCampaigns, initial }: { kind: string; campaigns: CampaignRef[]; initial: HomebrewRecord[] }) {
  // Share only with campaigns running this system (the API enforces it too).
  const campaigns = campaignsFor(kind, allCampaigns);
  const sc = SCHEMAS[kind];
  const router = useRouter();
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
  // entries (lazy-loaded — see ./templates.ts).
  const templates = useMemo(() => {
    const book = mmrpgTemplates(kind);
    return async (): Promise<TemplateOption[]> => [
      ...items.map((r) => ({ key: `hb:${r.id}`, name: r.name, group: "Your homebrew", meta: "Homebrew", data: r.data || {} })),
      ...(book ? await book() : []),
    ];
  }, [items, kind]);

  if (!sc) return null;
  const active = editId !== null && draft !== null;

  const openNew = () => { setFromTemplate(""); setName(""); setDraft(sc.blank()); setCampaignIds([]); setEditId(""); setError(""); };
  const openEdit = (rec: HomebrewRecord) => { setFromTemplate(""); setName(rec.name); setDraft(sc.fromData(rec.data || {})); setCampaignIds(rec.campaignIds ?? []); setEditId(rec.id); setError(""); };
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
  const toggleCampaign = (id: string) => setCampaignIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));

  async function submit() {
    if (!name.trim()) { setError(`Give the ${sc.noun.toLowerCase()} a name.`); return; }
    setBusy(true); setError("");
    try {
      const isNew = editId === "";
      const data = sc.payload(name.trim(), draft);
      const body = isNew ? { type: kind, data, campaignIds } : { data, campaignIds };
      const res = await fetch(isNew ? "/api/homebrew" : `/api/homebrew/${editId}`, {
        method: isNew ? "POST" : "PATCH", credentials: "same-origin",
        headers: { "content-type": "application/json" }, body: JSON.stringify(body),
      });
      if (!res.ok) { setError((await res.text()) || "Could not save."); return; }
      const { item } = (await res.json()) as { item: HomebrewRecord };
      setItems((prev) => [item, ...prev.filter((p) => p.id !== item.id)].sort((a, b) => a.name.localeCompare(b.name, "en")));
      close(); router.refresh();
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
  const B = sc.Builder, P = sc.Preview;

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
                  <span className="font-bold text-[var(--hb-accent)]">{rec.name}</span>
                  <span className="text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">{sc.summary(rec.data || {})}</span>
                  <span className="text-[10px] uppercase tracking-[0.08em] text-[var(--muted)]">{rec.campaignIds.length ? `shared: ${rec.campaignIds.map(campaignName).join(", ")}` : "personal"}</span>
                  <span className="ml-auto flex gap-2">
                    <button className={btn} disabled={busy} onClick={() => openEdit(rec)}>Edit</button>
                    <button className={btn} disabled={busy} onClick={() => remove(rec)}>Delete</button>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mb-4 text-sm text-[var(--muted)]">No homebrew {sc.plural ?? sc.noun.toLowerCase() + "s"} yet. Create one below — it shows up in this list, and (once shared) for your campaign.</p>
          )}

          {active ? (
            <div className="grid gap-4 rounded border border-[var(--border)] bg-[var(--panel-2)] p-4 lg:grid-cols-[minmax(0,1fr)_320px]">
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
                    <input className={`${fieldBase} w-full`} value={name} maxLength={80} placeholder={`${sc.noun} name…`} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <B value={draft} onChange={(v) => { setDraft(v); if (error) setError(""); }} />
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
                  <button className={btnAccent} disabled={busy} onClick={submit}>{busy ? "Saving…" : editId === "" ? `Create ${sc.noun}` : "Save Changes"}</button>
                  <button className={btn} disabled={busy} onClick={close}>Cancel</button>
                </div>
              </div>
              <div className="lg:sticky lg:top-20 lg:self-start"><P name={name} value={draft} /></div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <button className={btnAccent} onClick={openNew}>+ New Homebrew {sc.noun}</button>
              {templateButton}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
