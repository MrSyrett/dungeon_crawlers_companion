"use client";
// ── Kids on Bikes homebrew editor shell ──────────────────────────────────────
// Rendered by components/HomebrewEditor for the three kob-* kinds (/kob/tropes,
// /kob/strengths and /kob/homebrew): an accordion listing the user's entries
// with Edit/Delete, a builder + live preview, and per-campaign share
// checkboxes (KOB campaigns only). Same look and flow as the other systems'
// shells (accent: KOB's --sys-link lilac, deepened on light panels);
// the builders live beside this file and each documents its storage shape.
// lib/homebrew.ts normalizeKob* is the real validator.
import { campaignsFor } from "@/lib/homebrew-systems";
import { useState, type CSSProperties, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import TropeBuilder, { TropePreview, blankTrope, tropeFromData, tropePayload, tropeProblems, type TropeDraft } from "./TropeBuilder";
import { FlawBuilder, FlawPreview, StrengthBuilder, StrengthPreview, blankFlaw, blankStrength, flawFromData, flawPayload, strengthFromData, strengthPayload, type FlawDraft, type StrengthDraft } from "./StrengthFlawBuilder";
import { BOOK_LABEL, KOB_STATS, isBookKey } from "./rules";

type CampaignRef = { id: string; name: string; code: string; system?: string | null };
type HomebrewRecord = { id: string; type: string; name: string; campaignIds: string[]; data: Record<string, unknown>; updatedAt: string; owner: boolean };
type Data = Record<string, unknown>;
type Schema<D> = {
  title: string; noun: string; plural?: string;
  summary: (d: Data) => string;
  blank: () => D; fromData: (d: Data) => D; payload: (name: string, d: D) => Data;
  /** Rule problems that block saving (shown under the builder). */
  problems?: (d: D) => string[];
  Builder: (p: { value: D; onChange: (v: D) => void }) => ReactElement;
  Preview: (p: { name: string; value: D }) => ReactElement;
};
const sv = (d: Data, k: string) => (d[k] == null ? "" : String(d[k]));
const bookOf = (d: Data) => (isBookKey(d.book) ? BOOK_LABEL[d.book] : "");
const schema = <D,>(x: Schema<D>) => x as unknown as Schema<unknown>;
const diceLine = (d: Data) => {
  const dc = (d.dice && typeof d.dice === "object" ? d.dice : {}) as Record<string, unknown>;
  const hi = KOB_STATS.find((s) => dc[s] === 20), lo = KOB_STATS.find((s) => dc[s] === 4);
  return hi || lo ? `${hi ? hi + " d20" : ""}${hi && lo ? " / " : ""}${lo ? lo + " d4" : ""}` : "";
};

const SCHEMAS: Record<string, Schema<unknown>> = {
  "kob-trope": schema<TropeDraft>({
    title: "Homebrew Tropes", noun: "Trope",
    summary: (d) => [bookOf(d), diceLine(d), Array.isArray(d.ages) ? (d.ages as string[]).join(" / ") : ""].filter(Boolean).join(" · "),
    blank: blankTrope, fromData: tropeFromData, payload: tropePayload, problems: tropeProblems,
    Builder: (p) => <TropeBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <TropePreview name={p.name} t={p.value} />,
  }),
  "kob-strength": schema<StrengthDraft>({
    title: "Homebrew Strengths", noun: "Strength",
    summary: (d) => [bookOf(d), sv(d, "cost")].filter(Boolean).join(" · "),
    blank: blankStrength, fromData: strengthFromData, payload: strengthPayload,
    Builder: (p) => <StrengthBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <StrengthPreview name={p.name} x={p.value} />,
  }),
  "kob-flaw": schema<FlawDraft>({
    title: "Homebrew Flaws", noun: "Flaw",
    summary: (d) => bookOf(d),
    blank: blankFlaw, fromData: flawFromData, payload: flawPayload,
    Builder: (p) => <FlawBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <FlawPreview name={p.name} f={p.value} />,
  }),
};

const fieldBase = "rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
const labelCls = "mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]";
const btn = "rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)] disabled:opacity-50";
const btnAccent = "rounded border border-[var(--hb-accent)] bg-[var(--panel-2)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--hb-accent)] hover:bg-[var(--hb-accent)] hover:text-white disabled:opacity-50";
const ACCENT = { "--hb-accent": "var(--sys-link, var(--kob-ink))" } as CSSProperties; // KOB lilac; light mode deepens --kob-ink

export default function KobHomebrewEditor({ kind, campaigns: allCampaigns, initial }: { kind: string; campaigns: CampaignRef[]; initial: HomebrewRecord[] }) {
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

  if (!sc) return null;
  const active = editId !== null && draft !== null;

  const openNew = () => { setName(""); setDraft(sc.blank()); setCampaignIds([]); setEditId(""); setError(""); };
  const openEdit = (rec: HomebrewRecord) => { setName(rec.name); setDraft(sc.fromData(rec.data || {})); setCampaignIds(rec.campaignIds ?? []); setEditId(rec.id); setError(""); };
  const close = () => { setEditId(null); setDraft(null); setError(""); };
  const toggleCampaign = (id: string) => setCampaignIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));

  async function submit() {
    if (!name.trim()) { setError(`Give the ${sc.noun.toLowerCase()} a name.`); return; }
    const probs = sc.problems?.(draft) ?? [];
    if (probs.length) { setError(probs.join(" ")); return; }
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
            <button className={btnAccent} onClick={openNew}>+ New Homebrew {sc.noun}</button>
          )}
        </div>
      ) : null}
    </div>
  );
}
