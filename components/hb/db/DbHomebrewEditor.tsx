"use client";
// ── Dragonbane homebrew editor shell ─────────────────────────────────────────
// Rendered by components/HomebrewEditor for the seven db-* kinds (the
// /dragonbane reference pages + /dragonbane/homebrew): an accordion listing the
// user's entries with Edit/Delete, a builder + live preview, and per-campaign
// share checkboxes (Dragonbane campaigns only). Same look and flow as the other
// systems' shells (accent --db); the builders live beside this file and each
// documents its storage shape. lib/homebrew.ts normalizeDb* is the real validator.
import { campaignsFor } from "@/lib/homebrew-systems";
import { useState, type CSSProperties, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import AbilityBuilder, { AbilityPreview, abilityFromData, abilityPayload, blankAbility, type AbilityDraft } from "./AbilityBuilder";
import SpellBuilder, { SpellPreview, blankSpell, spellFromData, spellPayload, type SpellDraft } from "./SpellBuilder";
import {
  WeaponBuilder, WeaponPreview, blankWeapon, weaponFromData, weaponPayload, ArmorBuilder, ArmorPreview, blankArmor, armorFromData, armorPayload,
  GearBuilder, GearPreview, blankGear, gearFromData, gearPayload, type WeaponDraft, type ArmorDraft, type GearDraft,
} from "./ItemBuilder";
import MonsterBuilder, { MonsterPreview, blankMonster, monsterFromData, monsterPayload, type MonsterDraft } from "./MonsterBuilder";
import NpcBuilder, { NpcPreview, blankNpc, npcFromData, npcPayload, type NpcDraft } from "./NpcBuilder";

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
const schema = <D,>(x: Schema<D>) => x as unknown as Schema<unknown>;

const cost = (d: Data) => { const c = (d.cost ?? null) as Data | null; return c && c.amount != null ? `${sv(c, "amount")} ${sv(c, "unit")}` : ""; };

const SCHEMAS: Record<string, Schema<unknown>> = {
  "db-ability": schema<AbilityDraft>({
    title: "Homebrew Heroic Abilities", noun: "Heroic Ability",
    summary: (d) => [d.wp == null || d.wp === "" ? "no WP" : `${sv(d, "wp")} WP`, sv(d, "timing"), bon(d)].filter(Boolean).join(" · "),
    blank: blankAbility, fromData: abilityFromData, payload: abilityPayload,
    Builder: (p) => <AbilityBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <AbilityPreview name={p.name} a={p.value} />,
  }),
  "db-spell": schema<SpellDraft>({
    title: "Homebrew Spells & Tricks", noun: "Spell",
    summary: (d) => (d.trick ? `${sv(d, "school")} trick` : `${sv(d, "school")} · rank ${sv(d, "rank") || 1} · ${sv(d, "castingTime")}`),
    blank: blankSpell, fromData: spellFromData, payload: spellPayload,
    Builder: (p) => <SpellBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <SpellPreview name={p.name} s={p.value} />,
  }),
  "db-weapon": schema<WeaponDraft>({
    title: "Homebrew Weapons", noun: "Weapon",
    summary: (d) => [sv(d, "damage") || "D6", d.shield ? "shield" : sv(d, "skill"), cost(d), bon(d)].filter(Boolean).join(" · "),
    blank: blankWeapon, fromData: weaponFromData, payload: weaponPayload,
    Builder: (p) => <WeaponBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <WeaponPreview name={p.name} w={p.value} />,
  }),
  "db-armor": schema<ArmorDraft>({
    title: "Homebrew Armor & Helmets", noun: "Armor",
    summary: (d) => [`${sv(d, "slot") === "helmet" ? "Helmet" : "Armor"} ${sv(d, "rating")}`, cost(d), bon(d)].filter(Boolean).join(" · "),
    blank: blankArmor, fromData: armorFromData, payload: armorPayload,
    Builder: (p) => <ArmorBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <ArmorPreview name={p.name} a={p.value} />,
  }),
  "db-gear": schema<GearDraft>({
    title: "Homebrew Gear", noun: "Gear", plural: "gear",
    summary: (d) => [sv(d, "category"), cost(d), bon(d)].filter(Boolean).join(" · "),
    blank: blankGear, fromData: gearFromData, payload: gearPayload,
    Builder: (p) => <GearBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <GearPreview name={p.name} g={p.value} />,
  }),
  "db-monster": schema<MonsterDraft>({
    title: "Homebrew Monsters", noun: "Monster",
    summary: (d) => `Ferocity ${sv(d, "ferocity")} · ${sv(d, "size")} · HP ${sv(d, "hp")} · ${cnt(d, "attacks")} attacks`,
    blank: blankMonster, fromData: monsterFromData, payload: monsterPayload,
    Builder: (p) => <MonsterBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <MonsterPreview name={p.name} m={p.value} />,
  }),
  "db-npc": schema<NpcDraft>({
    title: "Homebrew NPCs", noun: "NPC",
    summary: (d) => `${sv(d, "kind") || "NPC"} · HP ${sv(d, "hp")}${d.boss ? " · boss" : ""} · ${cnt(d, "weapons")} weapon${cnt(d, "weapons") === 1 ? "" : "s"}`,
    blank: blankNpc, fromData: npcFromData, payload: npcPayload,
    Builder: (p) => <NpcBuilder value={p.value} onChange={p.onChange} />,
    Preview: (p) => <NpcPreview name={p.name} n={p.value} />,
  }),
};

const fieldBase = "rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
const labelCls = "mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]";
const btn = "rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)] disabled:opacity-50";
const btnAccent = "rounded border border-[var(--hb-accent)] bg-[var(--panel-2)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--hb-accent)] hover:bg-[var(--hb-accent)] hover:text-white disabled:opacity-50";
const ACCENT = { "--hb-accent": "var(--db-ink)" } as CSSProperties; // --db is the deep book green; --db-ink is its text-safe lift (light + dark)

export default function DbHomebrewEditor({ kind, campaigns: allCampaigns, initial }: { kind: string; campaigns: CampaignRef[]; initial: HomebrewRecord[] }) {
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
