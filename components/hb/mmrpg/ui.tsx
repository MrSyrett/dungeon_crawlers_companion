"use client";
// ── MMRPG homebrew builder UI bits ──────────────────────────────────────────
// Cell (label + control + hint), AsWritten (legacy text kept until the user
// switches to pickers), and the searchable "Browse & pick" multi-picker with its
// rich option modal (moved here from components/HomebrewEditor, unchanged in
// behaviour): chips of the picked values, a quick-add box backed by a datalist
// and a modal listing every option with its group + description. `lazyDetails`
// "mmrpg-powers" dynamic-imports the power details only when the modal opens.
import { useState, type ReactNode } from "react";

export type RichOpt = { value: string; group?: string; detail?: string };

export const lbl = "block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)] mb-1";
export const fieldCls = "w-full rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
export const selCls = "h-[34px] rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
export const hint = "mt-1 text-[11px] text-[var(--muted)]";
export const miniBtn = "rounded border border-[var(--border)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)]";
export const statK = "text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]";
export const rowBox = "rounded border border-[var(--border)] border-l-[3px] border-l-[var(--hb-accent)] bg-[var(--panel)] p-2";

export function Cell({ label, children, className = "", help }: { label: ReactNode; children: ReactNode; className?: string; help?: ReactNode }) {
  return (
    <div className={className}>
      <label className={lbl}>{label}</label>
      {children}
      {help ? <p className={hint}>{help}</p> : null}
    </div>
  );
}
export function Stat({ k, v }: { k: string; v: ReactNode }) {
  return <span><span className={statK}>{k}</span> <span className="font-semibold">{v}</span></span>;
}
/** Legacy text that doesn't parse: shown as editable text with a "Use pickers" button. */
export function AsWritten({ value, onChange, onPickers, placeholder }: { value: string; onChange: (v: string) => void; onPickers: () => void; placeholder?: string }) {
  return (
    <div className="flex gap-1.5">
      <input className={fieldCls} value={value} placeholder={placeholder} maxLength={200} onChange={(e) => onChange(e.target.value)} />
      <button type="button" className={`${miniBtn} whitespace-nowrap`} title="Replace this text with the pickers" onClick={onPickers}>Use pickers</button>
    </div>
  );
}

// ── Browse & pick ───────────────────────────────────────────────────────────
type PickerProps = {
  label: ReactNode; help?: ReactNode; className?: string; dlId: string;
  value: string[]; onChange: (v: string[]) => void;
  options: readonly string[]; richOptions?: readonly RichOpt[]; lazyDetails?: "mmrpg-powers";
  allowCustom?: boolean; placeholder?: string; addLabel?: string; browseLabel?: string; modalTitle?: string;
};
export function PickerField({ label, help, className, dlId, value, onChange, options, richOptions, lazyDetails, allowCustom, placeholder, addLabel, browseLabel, modalTitle }: PickerProps) {
  const list = value;
  const [open, setOpen] = useState(false);
  const [rich, setRich] = useState<RichOpt[] | null>(richOptions ? [...richOptions] : null);
  const [loading, setLoading] = useState(false);
  const [t, setT] = useState("");

  const add = (raw: string) => {
    const v = raw.trim();
    if (!v || list.includes(v)) return;
    if (!allowCustom && !options.includes(v)) return;
    onChange([...list, v]);
  };
  const toggle = (v: string) => onChange(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  const openModal = async () => {
    setOpen(true);
    if (!rich && lazyDetails === "mmrpg-powers") {
      setLoading(true);
      try {
        const m = await import("@/lib/data/mmrpg-power-details");
        setRich(m.MMRPG_POWER_DETAILS.map((p) => ({
          value: p.name, group: p.set,
          detail: [p.prereq ? `Prereq: ${p.prereq}` : "", [p.action, p.duration, p.range && `Range ${p.range}`, p.cost].filter(Boolean).join(" · "), p.effect].filter(Boolean).join(" — "),
        })));
      } finally { setLoading(false); }
    }
  };
  const richList: RichOpt[] = rich ?? options.map((o) => ({ value: o }));
  const commit = () => { add(t); setT(""); };

  return (
    <div className={className}>
      <label className={lbl}>{label}</label>
      {list.length ? (
        <div className="mb-1.5 flex flex-wrap gap-1.5">
          {list.map((v, i) => (
            <span key={i} className="inline-flex items-center gap-1 rounded border border-[var(--hb-accent)] bg-[var(--panel-2)] px-2 py-0.5 text-[12px] text-[var(--text)]">
              {v}
              <button type="button" aria-label={`Remove ${v}`} className="text-[var(--muted)] hover:text-[var(--hb-accent)]" onClick={() => onChange(list.filter((_, j) => j !== i))}>✕</button>
            </span>
          ))}
        </div>
      ) : null}
      <div className="flex flex-wrap items-center gap-1.5">
        <button type="button" className={miniBtn} onClick={openModal}>{browseLabel ?? "Browse…"}</button>
        {allowCustom ? <span className="text-[11px] text-[var(--muted)]">or quick-add below</span> : null}
      </div>
      {allowCustom ? (
        <>
          <div className="mt-1.5 flex gap-1.5">
            <input list={dlId} className={`${fieldCls} min-w-0 flex-1`} value={t} placeholder={placeholder}
              onChange={(e) => setT(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); commit(); } }} />
            <button type="button" className={miniBtn} onClick={commit}>{addLabel ?? "+ Add"}</button>
          </div>
          <datalist id={dlId}>{options.map((o) => <option key={o} value={o} />)}</datalist>
        </>
      ) : null}
      {help ? <p className={hint}>{help}</p> : null}
      {open ? (
        <PickerModal title={modalTitle ?? String(label)} options={richList} loading={loading} selected={list} allowCustom={allowCustom}
          onToggle={toggle} onAddCustom={add} onClose={() => setOpen(false)} />
      ) : null}
    </div>
  );
}

export function PickerModal({ title, options, loading, selected, allowCustom, onToggle, onAddCustom, onClose }: {
  title: string; options: RichOpt[]; loading: boolean; selected: string[]; allowCustom?: boolean;
  onToggle: (v: string) => void; onAddCustom: (v: string) => void; onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const [custom, setCustom] = useState("");
  const needle = q.trim().toLowerCase();
  const filtered = options.filter((o) => !needle || o.value.toLowerCase().includes(needle) || (o.group ?? "").toLowerCase().includes(needle) || (o.detail ?? "").toLowerCase().includes(needle));
  const groups: { group: string; items: RichOpt[] }[] = [];
  filtered.forEach((o) => {
    const g = o.group ?? "";
    let bucket = groups.find((x) => x.group === g);
    if (!bucket) { bucket = { group: g, items: [] }; groups.push(bucket); }
    bucket.items.push(o);
  });
  const commitCustom = () => { const v = custom.trim(); if (v) { onAddCustom(v); setCustom(""); } };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/60 p-4 sm:p-8" onClick={onClose}>
      <div className="w-full max-w-2xl rounded-lg border border-[var(--border)] bg-[var(--panel)] shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-[var(--border)] p-3">
          <h3 className="flex-1 text-[13px] font-bold uppercase tracking-[0.1em] text-[var(--hb-accent)]">{title}</h3>
          <span className="text-[11px] text-[var(--muted)]">{selected.length} selected</span>
          <button type="button" aria-label="Close" className="text-[var(--muted)] hover:text-[var(--text)]" onClick={onClose}>✕</button>
        </div>
        <div className="border-b border-[var(--border)] p-3">
          <input autoFocus className={fieldCls} placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-3">
          {loading ? <p className="py-6 text-center text-[12px] text-[var(--muted)]">Loading details…</p> : null}
          {!loading && filtered.length === 0 ? <p className="py-6 text-center text-[12px] text-[var(--muted)]">No matches.</p> : null}
          {!loading && groups.map((grp) => (
            <div key={grp.group} className="mb-3">
              {grp.group ? <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{grp.group}</div> : null}
              <div className="flex flex-col gap-1.5">
                {grp.items.map((o) => {
                  const on = selected.includes(o.value);
                  return (
                    <button type="button" key={o.value} onClick={() => onToggle(o.value)}
                      className={`rounded border p-2 text-left transition-colors ${on ? "border-[var(--hb-accent)] bg-[var(--panel-2)]" : "border-[var(--border)] hover:border-[var(--hb-accent)]"}`}>
                      <div className="flex items-center gap-2">
                        <span className={`flex h-4 w-4 flex-none items-center justify-center rounded border text-[10px] ${on ? "border-[var(--hb-accent)] bg-[var(--hb-accent)] text-[var(--panel)]" : "border-[var(--muted)] text-transparent"}`}>✓</span>
                        <span className="text-[13px] font-semibold text-[var(--text)]">{o.value}</span>
                      </div>
                      {o.detail ? <p className="mt-1 pl-6 text-[11px] leading-relaxed text-[var(--muted)]">{o.detail}</p> : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t border-[var(--border)] p-3">
          {allowCustom ? (
            <div className="flex min-w-0 flex-1 gap-1.5">
              <input className={`${fieldCls} min-w-0 flex-1`} placeholder="Add a custom entry…" value={custom}
                onChange={(e) => setCustom(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); commitCustom(); } }} />
              <button type="button" className={miniBtn} onClick={commitCustom}>+ Add</button>
            </div>
          ) : <span className="flex-1" />}
          <button type="button" className={miniBtn} onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
