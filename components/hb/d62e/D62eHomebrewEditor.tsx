"use client";
// ── D6 System 2nd Edition homebrew editor shell ──────────────────────────────
// Rendered by components/HomebrewEditor for the six d62e-* kinds (the /d62e
// reference pages + /d62e/homebrew): an accordion listing the user's entries
// with Edit/Delete, a builder + live preview, and per-campaign share checkboxes
// (D6 2e campaigns only). Same look and flow as the other systems' shells
// (accent: the D62e ink); the builders live beside this file and each documents
// its storage shape. lib/homebrew.ts normalizeD62e* is the real validator.
import { campaignsFor } from "@/lib/homebrew-systems";
import { useState, type CSSProperties, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { SkillBuilder, SkillPreview, blankSkill, skillFromData, skillPayload, GearBuilder, GearPreview, blankGear, gearFromData, gearPayload, type SkillDraft, type GearDraft } from "./SkillGearBuilder";
import { TraitBuilder, TraitPreview, blankTrait, traitFromData, traitPayload, LimitBuilder, LimitPreview, blankLimit, limitFromData, limitPayload, type TraitDraft, type LimitDraft } from "./TraitBuilder";
import PowerBuilder, { PowerPreview, blankPower, powerFromData, powerPayload, type PowerDraft } from "./PowerBuilder";
import CreatureBuilder, { CreaturePreview, blankCreature, creatureFromData, creaturePayload, type CreatureDraft } from "./CreatureBuilder";

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
const cnt = (d: Data, k: string) => (Array.isArray(d[k]) ? (d[k] as unknown[]).length : 0);
const schema = <D,>(x: Schema<D>) => x as unknown as Schema<unknown>;
const GENRE: Record<string, string> = { core: "Core", fantasy: "Fantasy", scifi: "Sci-Fi", superhero: "Superhero" };
const g = (d: Data) => GENRE[sv(d, "genre")] ?? "";

const SCHEMAS: Record<string, Schema<unknown>> = {
  "d62e-skill": schema<SkillDraft>({
    title: "Homebrew Skills", noun: "Skill",
    summary: (d) => [sv(d, "attribute"), g(d)].filter(Boolean).join(" · "),
    blank: blankSkill, fromData: skillFromData, payload: skillPayload,
    Builder: (p) => <SkillBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <SkillPreview name={p.name} k={p.value} />,
  }),
  "d62e-gear": schema<GearDraft>({
    title: "Homebrew Gear", noun: "Gear", plural: "gear",
    summary: (d) => [sv(d, "category"), sv(d, "damage") || sv(d, "protection"), sv(d, "era"), g(d)].filter(Boolean).join(" · "),
    blank: blankGear, fromData: gearFromData, payload: gearPayload,
    Builder: (p) => <GearBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <GearPreview name={p.name} g={p.value} />,
  }),
  "d62e-trait": schema<TraitDraft>({
    title: "Homebrew Perks, Flaws & Talents", noun: "Trait",
    summary: (d) => [sv(d, "kind"), sv(d, "cost"), g(d)].filter(Boolean).join(" · "),
    blank: blankTrait, fromData: traitFromData, payload: traitPayload,
    Builder: (p) => <TraitBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <TraitPreview name={p.name} t={p.value} />,
  }),
  "d62e-power": schema<PowerDraft>({
    title: "Homebrew Powers", noun: "Power",
    summary: (d) => [sv(d, "kind"), sv(d, "cost") || (sv(d, "difficulty") ? `Diff ${sv(d, "difficulty")}` : ""), g(d)].filter(Boolean).join(" · "),
    blank: blankPower, fromData: powerFromData, payload: powerPayload,
    Builder: (p) => <PowerBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <PowerPreview name={p.name} p={p.value} />,
  }),
  "d62e-limitation": schema<LimitDraft>({
    title: "Homebrew Limitations", noun: "Limitation",
    summary: (d) => [`−${sv(d, "value") || "0"} cost`, g(d)].filter(Boolean).join(" · "),
    blank: blankLimit, fromData: limitFromData, payload: limitPayload,
    Builder: (p) => <LimitBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <LimitPreview name={p.name} l={p.value} />,
  }),
  "d62e-creature": schema<CreatureDraft>({
    title: "Homebrew Creatures", noun: "Creature",
    summary: (d) => [sv(d, "kind") || "Creature", `${cnt(d, "skills")} skill${cnt(d, "skills") === 1 ? "" : "s"}`, g(d)].filter(Boolean).join(" · "),
    blank: blankCreature, fromData: creatureFromData, payload: creaturePayload,
    Builder: (p) => <CreatureBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <CreaturePreview name={p.name} c={p.value} />,
  }),
};

const fieldBase = "rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
const labelCls = "mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]";
const btn = "rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)] disabled:opacity-50";
const btnAccent = "rounded border border-[var(--hb-accent)] bg-[var(--panel-2)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--hb-accent)] hover:bg-[var(--hb-accent)] hover:text-white disabled:opacity-50";
const ACCENT = { "--hb-accent": "var(--sys-link, var(--d62e-ink))" } as CSSProperties; // D62e ink (deepened on light panels)

export default function D62eHomebrewEditor({ kind, campaigns: allCampaigns, initial }: { kind: string; campaigns: CampaignRef[]; initial: HomebrewRecord[] }) {
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
                  <B value={draft} onChange={setDraft} />
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
