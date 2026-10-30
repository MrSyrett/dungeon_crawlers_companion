"use client";
// ── Pirate Borg homebrew editor shell ────────────────────────────────────────
// Rendered by components/HomebrewEditor for the seven pb-* kinds (the
// /pirate-borg reference pages + /pirate-borg/homebrew): an accordion listing
// the user's entries with Edit/Delete, a builder + live preview, and
// per-campaign share checkboxes (Pirate Borg campaigns only). Same look and flow
// as the other systems' shells (accent --pb-ink); the builders live beside this
// file and each documents its storage shape. lib/homebrew.ts normalizePb* is
// the real validator.
import { campaignsFor } from "@/lib/homebrew-systems";
import { useMemo, useState, type CSSProperties, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import TemplatePicker, { templateCopyName, type TemplateOption } from "@/components/hb/TemplatePicker";
import { pbTemplates } from "./templates";
import {
  WeaponBuilder, WeaponPreview, blankWeapon, weaponFromData, weaponPayload, ArmorBuilder, ArmorPreview, blankArmor, armorFromData, armorPayload,
  GearBuilder, GearPreview, blankGear, gearFromData, gearPayload, type WeaponDraft, type ArmorDraft, type GearDraft,
} from "./ItemBuilder";
import MagicBuilder, { MagicPreview, blankRelic, blankRitual, relicFromData, ritualFromData, magicPayload, type MagicDraft } from "./MagicBuilder";
import MonsterBuilder, { MonsterPreview, blankMonster, monsterFromData, monsterPayload, type MonsterDraft } from "./MonsterBuilder";
import ShipBuilder, { ShipPreview, blankShip, shipFromData, shipPayload, type ShipDraft } from "./ShipBuilder";

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
const bon = (d: Data) => { const b = cnt(d, "benefits"); return b ? `${b} bonus${b === 1 ? "" : "es"}` : ""; };
const sgn = (v: unknown) => { const n = typeof v === "number" ? v : NaN; return Number.isFinite(n) ? (n > 0 ? `+${n}` : n < 0 ? `−${-n}` : "±0") : "—"; };
const schema = <D,>(x: Schema<D>) => x as unknown as Schema<unknown>;

const SCHEMAS: Record<string, Schema<unknown>> = {
  "pb-weapon": schema<WeaponDraft>({
    title: "Homebrew Weapons", noun: "Weapon",
    summary: (d) => [sv(d, "damage") || "—", sv(d, "type"), d.blackPowder ? "black powder" : "", d.cost != null && d.cost !== "" ? `${sv(d, "cost")}s` : "", bon(d)].filter(Boolean).join(" · "),
    blank: blankWeapon, fromData: weaponFromData, payload: weaponPayload,
    Builder: (p) => <WeaponBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <WeaponPreview name={p.name} w={p.value} />,
  }),
  "pb-armor": schema<ArmorDraft>({
    title: "Homebrew Clothing, Armor & Hats", noun: "Armor or Hat",
    summary: (d) => [sv(d, "slot") === "hat" ? `Hat${d.damageReduction ? ` · −${sv(d, "damageReduction")} damage` : ""}` : `Tier ${sv(d, "tier") || 0}${d.armorDie ? ` · −${sv(d, "armorDie")}` : ""}`, bon(d)].filter(Boolean).join(" · "),
    blank: blankArmor, fromData: armorFromData, payload: armorPayload,
    Builder: (p) => <ArmorBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <ArmorPreview name={p.name} a={p.value} />,
  }),
  "pb-gear": schema<GearDraft>({
    title: "Homebrew Gear", noun: "Gear", plural: "gear",
    summary: (d) => [sv(d, "category") || "gear", sv(d, "costText") || "—", bon(d)].filter(Boolean).join(" · "),
    blank: blankGear, fromData: gearFromData, payload: gearPayload,
    Builder: (p) => <GearBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <GearPreview name={p.name} g={p.value} />,
  }),
  "pb-relic": schema<MagicDraft>({
    title: "Homebrew Ancient Relics", noun: "Relic",
    summary: (d) => sv(d, "duration") || "relic",
    blank: blankRelic, fromData: relicFromData, payload: magicPayload,
    Builder: (p) => <MagicBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <MagicPreview name={p.name} m={p.value} />,
  }),
  "pb-ritual": schema<MagicDraft>({
    title: "Homebrew Arcane Rituals", noun: "Ritual",
    summary: (d) => sv(d, "duration") || "ritual",
    blank: blankRitual, fromData: ritualFromData, payload: magicPayload,
    Builder: (p) => <MagicBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <MagicPreview name={p.name} m={p.value} />,
  }),
  "pb-monster": schema<MonsterDraft>({
    title: "Homebrew Creatures & NPCs", noun: "Creature",
    summary: (d) => `HP ${sv(d, "hpText") || sv(d, "hp")} · Morale ${d.morale == null ? "–" : sv(d, "morale")} · ${cnt(d, "attacks")} attack${cnt(d, "attacks") === 1 ? "" : "s"}${d.naval ? " · naval block" : ""}`,
    blank: blankMonster, fromData: monsterFromData, payload: monsterPayload,
    Builder: (p) => <MonsterBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <MonsterPreview name={p.name} m={p.value} />,
  }),
  "pb-ship": schema<ShipDraft>({
    title: "Homebrew Ships", noun: "Ship",
    summary: (d) => `HP ${sv(d, "hp")} · Speed ${sv(d, "speed")} · Skill ${sgn(d.skill)}`,
    blank: blankShip, fromData: shipFromData, payload: shipPayload,
    Builder: (p) => <ShipBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <ShipPreview name={p.name} s={p.value} />,
  }),
};

const fieldBase = "rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
const labelCls = "mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]";
const btn = "rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)] disabled:opacity-50";
const btnAccent = "rounded border border-[var(--hb-accent)] bg-[var(--panel-2)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--hb-accent)] hover:bg-[var(--hb-accent)] hover:text-white disabled:opacity-50";
const ACCENT = { "--hb-accent": "var(--pb-ink)" } as CSSProperties; // lifted blood: --pb is too dark for text on black

export default function PbHomebrewEditor({ kind, campaigns: allCampaigns, initial }: { kind: string; campaigns: CampaignRef[]; initial: HomebrewRecord[] }) {
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
  // entries (lazy-loaded — ./templates.ts). Memoised so the picker's per-source
  // cache survives re-renders (a save changes `items` → fresh list).
  const templates = useMemo(() => {
    const book = pbTemplates(kind);
    return async (): Promise<TemplateOption[]> => [
      ...items.map((r) => ({ key: `hb:${r.id}`, name: r.name, group: "Your homebrew", meta: "Homebrew", data: r.data || {} })),
      ...(book ? await book() : []),
    ];
  }, [items, kind]);

  if (!sc) return null;
  const active = editId !== null && draft !== null;

  const openNew = () => { setName(""); setDraft(sc.blank()); setCampaignIds([]); setEditId(""); setFromTemplate(""); setError(""); };
  const openEdit = (rec: HomebrewRecord) => { setName(rec.name); setDraft(sc.fromData(rec.data || {})); setCampaignIds(rec.campaignIds ?? []); setEditId(rec.id); setFromTemplate(""); setError(""); };
  // A template opens as a NEW, unsaved draft through the same legacy→draft
  // path a stored record takes (sc.fromData), named "<original> (copy)". Share
  // picks are kept only when a new draft was already open.
  const startFromTemplate = (opt: TemplateOption) => {
    if (editId !== "") setCampaignIds([]);
    setName(templateCopyName(opt.name)); setDraft(sc.fromData(opt.data || {})); setEditId(""); setFromTemplate(opt.name); setError("");
  };
  const templateButton = <TemplatePicker source={templates} onPick={startFromTemplate} noun={sc.noun.toLowerCase()} disabled={busy} className={btn} />;
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
              <div className="min-w-0">
                {editId === "" ? (
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-3">
                    <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                      {fromTemplate ? <>New {sc.noun.toLowerCase()} · from <b className="text-[var(--text)]">{fromTemplate}</b></> : `New ${sc.noun.toLowerCase()}`}
                    </span>
                    {templateButton}
                  </div>
                ) : null}
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
