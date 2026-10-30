"use client";

import { campaignsFor } from "@/lib/homebrew-systems";
import { useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import ItemBuilder, { ItemPreview, blankItem, itemFromData, itemPayload, type ItemDraft } from "@/components/hb/dcc/ItemBuilder";
import { useDccNames } from "@/components/hb/dcc/data";

// Mirror of lib/homebrew's public shapes (kept local so this client component
// doesn't pull in the server module). Must stay in sync with lib/homebrew.
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

// The builder itself (category / tier chips, bonus badges, live preview) lives in
// components/hb/dcc/ItemBuilder.tsx; this file is the list + save shell.
type Form = { id: string | null; name: string; item: ItemDraft; campaignIds: string[] };

const fieldBase =
  "rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--red)]";
const label = "mb-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]";
const btn =
  "rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)] disabled:opacity-50";
const btnRed =
  "rounded border border-[var(--red)] bg-[var(--panel-2)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sys-link)] hover:bg-[var(--red)] hover:text-white disabled:opacity-50";
const ACCENT = { "--hb-accent": "var(--sys-link)" } as CSSProperties;

function blank(): Form {
  return { id: null, name: "", item: blankItem(), campaignIds: [] };
}

function formFromRecord(rec: HomebrewRecord): Form {
  return { id: rec.id, name: rec.name, item: itemFromData(rec.data || {}), campaignIds: rec.campaignIds ?? [] };
}

const payloadFromForm = (f: Form) => itemPayload(f.name, f.item);

export default function DccHomebrew({
  campaigns: allCampaigns,
  initial,
}: {
  campaigns: CampaignRef[];
  initial: HomebrewRecord[];
}) {
  // Share only with campaigns running this system (the API enforces it too).
  const campaigns = campaignsFor("dcc-item", allCampaigns);
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
  const names = useDccNames();

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
          Homebrew Items {items.length ? <span className="text-[var(--muted)]">({items.length})</span> : null}
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
                  <span className="font-bold text-[var(--sys-link)]">{rec.name}</span>
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
            <div style={ACCENT} className="grid gap-4 rounded border border-[var(--border)] bg-[var(--panel-2)] p-4 lg:grid-cols-[minmax(0,1fr)_300px]">
              <div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className={label}>Name</label>
                  <input className={`${fieldBase} w-full`} value={form.name} maxLength={80}
                    onChange={(e) => set("name", e.target.value)} placeholder="Item name…" />
                </div>
                <ItemBuilder value={form.item} names={names} onChange={(v) => set("item", v)} />

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

              {error ? <p className="mt-3 text-[13px] text-[var(--bad)]">{error}</p> : null}

              <div className="mt-4 flex gap-2">
                <button className={btnRed} disabled={busy} onClick={submit}>
                  {busy ? "Saving…" : form.id === null ? "Create Item" : "Save Changes"}
                </button>
                <button className={btn} disabled={busy} onClick={() => { setForm(null); setError(""); }}>
                  Cancel
                </button>
              </div>
              </div>
              <div className="lg:sticky lg:top-4 lg:self-start">
                <ItemPreview name={form.name} it={form.item} names={names} />
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
