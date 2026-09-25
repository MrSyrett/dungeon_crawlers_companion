"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Mirror of lib/homebrew's public shapes (kept local so this client component
// doesn't pull in the server module). Must stay in sync with lib/homebrew.
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

// Mirrors DCC_ITEM_CATEGORIES / DCC_ITEM_TIERS / DCC_ITEM_SLOTS in lib/homebrew.ts.
const CATEGORIES: [string, string][] = [
  ["consumable", "Consumable"], ["weapon", "Weapon"], ["armor", "Armor"],
  ["accessory", "Accessory"], ["scroll", "Scroll"], ["tome", "Tome"],
  ["mundane", "Mundane"], ["tool", "Tool"], ["material", "Material"],
];
const TIERS = ["Mundane", "Bronze", "Silver", "Gold", "Platinum", "Legendary", "Celestial"];
const SLOTS = ["Head", "Torso", "Arms", "Legs", "Feet", "Hands/Holding", "Accessory"];

// Structured, auto-applied benefits (mirror DCC_BENEFIT_KINDS / DCC_BENEFIT_STATS in lib/homebrew.ts).
const BENEFIT_KINDS: [string, string][] = [
  ["stat", "Stat"], ["skill", "Skill (rank)"], ["dr", "DR"],
  ["evade", "Evade"], ["move", "Move"], ["step", "Step"],
];
const BENEFIT_STATS: [string, string][] = [
  ["str", "STR"], ["int", "INT"], ["con", "CON"], ["dex", "DEX"], ["cha", "CHA"],
];
type Benefit = { kind: string; target: string; amount: string };

type Form = {
  id: string | null;
  name: string;
  category: string;
  tier: string;   // "" = none
  slot: string;
  price: string;
  effect: string;
  benefits: Benefit[];
  campaignIds: string[];
};

const fieldBase =
  "rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--red)]";
const label = "mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]";
const btn =
  "rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)] disabled:opacity-50";
const btnRed =
  "rounded border border-[var(--red)] bg-[var(--panel-2)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#f0a8a3] hover:bg-[var(--red)] hover:text-white disabled:opacity-50";

function blank(): Form {
  return { id: null, name: "", category: "mundane", tier: "", slot: "", price: "", effect: "", benefits: [], campaignIds: [] };
}

function benefitsFromData(v: unknown): Benefit[] {
  if (!Array.isArray(v)) return [];
  return (v as unknown[]).map((raw) => {
    const o = (raw ?? {}) as Record<string, unknown>;
    return {
      kind: typeof o.kind === "string" ? o.kind : "stat",
      target: o.target == null ? "" : String(o.target),
      amount: o.amount == null ? "" : String(o.amount),
    };
  });
}

function formFromRecord(rec: HomebrewRecord): Form {
  const d = rec.data || {};
  const s = (k: string) => (typeof d[k] === "string" ? (d[k] as string) : d[k] == null ? "" : String(d[k]));
  return {
    id: rec.id,
    name: rec.name,
    category: s("category") || "mundane",
    tier: s("tier"),
    slot: s("slot"),
    price: s("price"),
    effect: s("effect"),
    benefits: benefitsFromData(d.benefits),
    campaignIds: rec.campaignIds ?? [],
  };
}

function payloadFromForm(f: Form): Record<string, unknown> {
  const benefits = f.benefits
    .map((b) => {
      const amount = parseInt(String(b.amount).trim(), 10);
      if (!Number.isFinite(amount) || amount === 0) return null;
      const kind = b.kind;
      const out: { kind: string; target?: string; amount: number } = { kind, amount };
      if (kind === "stat") { if (!BENEFIT_STATS.some(([v]) => v === b.target)) return null; out.target = b.target; }
      else if (kind === "skill") { if (!b.target.trim()) return null; out.target = b.target.trim().slice(0, 60); }
      return out;
    })
    .filter((b): b is { kind: string; target?: string; amount: number } => b != null);
  return {
    name: f.name.trim(),
    category: f.category,
    tier: f.tier,
    slot: f.slot.trim(),
    price: f.price.trim(),
    effect: f.effect.trim(),
    benefits,
  };
}

export default function DccHomebrew({
  campaigns,
  initial,
}: {
  campaigns: CampaignRef[];
  initial: HomebrewRecord[];
}) {
  const router = useRouter();
  const [items, setItems] = useState<HomebrewRecord[]>(initial);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Form | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => (f ? { ...f, [k]: v } : f));
  const toggleCampaign = (id: string) =>
    setForm((f) =>
      f
        ? { ...f, campaignIds: f.campaignIds.includes(id) ? f.campaignIds.filter((x) => x !== id) : [...f.campaignIds, id] }
        : f,
    );
  const addBenefit = () =>
    setForm((f) => (f ? { ...f, benefits: [...f.benefits, { kind: "stat", target: "str", amount: "" }] } : f));
  const removeBenefit = (i: number) =>
    setForm((f) => (f ? { ...f, benefits: f.benefits.filter((_, j) => j !== i) } : f));
  const setBenefit = (i: number, patch: Partial<Benefit>) =>
    setForm((f) => {
      if (!f) return f;
      const benefits = f.benefits.map((b, j) => {
        if (j !== i) return b;
        const nb = { ...b, ...patch };
        // Default the target sensibly when the kind changes.
        if (patch.kind && patch.kind !== b.kind) nb.target = patch.kind === "stat" ? "str" : "";
        return nb;
      });
      return { ...f, benefits };
    });

  async function submit() {
    if (!form) return;
    if (!form.name.trim()) {
      setError("Give the item a name.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const body =
        form.id === null
          ? { type: "dcc-item", data: payloadFromForm(form), campaignIds: form.campaignIds }
          : { data: payloadFromForm(form), campaignIds: form.campaignIds };
      const res = await fetch(form.id === null ? "/api/homebrew" : `/api/homebrew/${form.id}`, {
        method: form.id === null ? "POST" : "PATCH",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        setError((await res.text()) || "Could not save.");
        return;
      }
      const { item } = (await res.json()) as { item: HomebrewRecord };
      setItems((prev) => {
        const without = prev.filter((p) => p.id !== item.id);
        return [item, ...without].sort((a, b) => a.name.localeCompare(b.name, "en"));
      });
      setForm(null);
      router.refresh(); // refresh the merged catalog on the page
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
      if (!res.ok) {
        setError("Could not delete.");
        return;
      }
      setItems((prev) => prev.filter((p) => p.id !== rec.id));
      if (form?.id === rec.id) setForm(null);
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
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-sm font-bold uppercase tracking-[0.15em]">
          My Homebrew Items {items.length ? <span className="text-[var(--muted)]">({items.length})</span> : null}
        </span>
        <span className="text-[var(--muted)]">{open ? "▾" : "▸"}</span>
      </button>

      {open ? (
        <div className="border-t border-[var(--border)] px-4 py-4">
          {/* Existing entries */}
          {items.length ? (
            <ul className="mb-4 flex flex-col gap-2">
              {items.map((rec) => (
                <li
                  key={rec.id}
                  className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2"
                >
                  <span className="font-bold text-[#f0a8a3]">{rec.name}</span>
                  <span className="text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">
                    {String(rec.data?.category ?? "")}
                    {rec.data?.tier ? ` · ${String(rec.data.tier)}` : ""}
                  </span>
                  {rec.campaignIds.length ? (
                    <span className="text-[10px] uppercase tracking-[0.08em] text-[var(--muted)]">
                      shared: {rec.campaignIds.map(campaignName).join(", ")}
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase tracking-[0.08em] text-[var(--muted)]">personal</span>
                  )}
                  <span className="ml-auto flex gap-2">
                    <button className={btn} disabled={busy} onClick={() => { setForm(formFromRecord(rec)); setError(""); }}>
                      Edit
                    </button>
                    <button className={btn} disabled={busy} onClick={() => remove(rec)}>
                      Delete
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mb-4 text-sm text-[var(--muted)]">
              No homebrew items yet. Create one below — it shows up in this catalog, and (once shared) for your campaign.
            </p>
          )}

          {/* Editor */}
          {form ? (
            <div className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className={label}>Name</label>
                  <input className={`${fieldBase} w-full`} value={form.name} maxLength={80}
                    onChange={(e) => set("name", e.target.value)} placeholder="Item name…" />
                </div>
                <div>
                  <label className={label}>Category</label>
                  <select className={`${fieldBase} w-full`} value={form.category} onChange={(e) => set("category", e.target.value)}>
                    {CATEGORIES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className={label}>Tier</label>
                  <select className={`${fieldBase} w-full`} value={form.tier} onChange={(e) => set("tier", e.target.value)}>
                    <option value="">— None —</option>
                    {TIERS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className={label}>Slot (optional)</label>
                  <input className={`${fieldBase} w-full`} value={form.slot} list="dcc-hb-slots" maxLength={60}
                    onChange={(e) => set("slot", e.target.value)} placeholder="e.g. Torso, Hands/Holding…" />
                  <datalist id="dcc-hb-slots">{SLOTS.map((s) => <option key={s} value={s} />)}</datalist>
                </div>
                <div>
                  <label className={label}>Price (gold, optional)</label>
                  <input className={`${fieldBase} w-full`} value={form.price} inputMode="numeric"
                    onChange={(e) => set("price", e.target.value.replace(/[^\d]/g, ""))} placeholder="e.g. 500" />
                </div>
                <div className="sm:col-span-2">
                  <label className={label}>Effect</label>
                  <textarea className={`${fieldBase} min-h-[70px] w-full`} value={form.effect} maxLength={4000}
                    onChange={(e) => set("effect", e.target.value)} placeholder="What it does…" />
                </div>

                <div className="sm:col-span-2">
                  <label className={label}>Mechanical Benefits</label>
                  <p className="mb-2 text-[11px] text-[var(--muted)]">
                    Auto-applied when the item is equipped on a character sheet (adds to the sheet’s stat, skill,
                    DR, Evade, or Speed). Leave empty for flavor-only items.
                  </p>
                  {form.benefits.length ? (
                    <div className="mb-2 flex flex-col gap-2">
                      {form.benefits.map((b, i) => (
                        <div key={i} className="flex flex-wrap items-center gap-2">
                          <input className={`${fieldBase} w-20`} value={b.amount} inputMode="numeric"
                            onChange={(e) => setBenefit(i, { amount: e.target.value.replace(/[^\d-]/g, "") })} placeholder="+N" />
                          <select className={fieldBase} value={b.kind} onChange={(e) => setBenefit(i, { kind: e.target.value })}>
                            {BENEFIT_KINDS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                          </select>
                          {b.kind === "stat" ? (
                            <select className={fieldBase} value={b.target} onChange={(e) => setBenefit(i, { target: e.target.value })}>
                              {BENEFIT_STATS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                            </select>
                          ) : b.kind === "skill" ? (
                            <input className={`${fieldBase} w-40`} value={b.target} maxLength={60}
                              onChange={(e) => setBenefit(i, { target: e.target.value })} placeholder="Skill name…" />
                          ) : null}
                          <button className={btn} type="button" onClick={() => removeBenefit(i)}>Remove</button>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <button className={btn} type="button" onClick={addBenefit}>Add Bonus</button>
                </div>

                {campaigns.length ? (
                  <div className="sm:col-span-2">
                    <label className={label}>Share with campaigns</label>
                    <div className="flex flex-wrap gap-3">
                      {campaigns.map((c) => (
                        <label key={c.id} className="flex items-center gap-2 text-[13px] text-[var(--text)]">
                          <input type="checkbox" checked={form.campaignIds.includes(c.id)} onChange={() => toggleCampaign(c.id)} />
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
                  {busy ? "Saving…" : form.id === null ? "Create Item" : "Save Changes"}
                </button>
                <button className={btn} disabled={busy} onClick={() => { setForm(null); setError(""); }}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button className={btnRed} onClick={() => { setForm(blank()); setError(""); }}>
              + New Homebrew Item
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}
