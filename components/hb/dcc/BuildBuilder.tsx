"use client";
// ── Dungeon Crawler Carl race / class point-buy builder (Core pp. 158–162) ───
// Identity chips + steppers, the benefit / detriment menu with a live points
// bar, per-selection parameter pickers (stat, skill or spell from the book +
// homebrew, damage type), and a live preview of the grants. Storage (types
// "dcc-race" / "dcc-class") is unchanged — lib/homebrew.ts dccBuild re-derives
// costs and composes the book-shaped `grants` bullets the reference pages and
// creation wizard read from `build.selections`:
//   race:  name, group, size, prerequisites?, build {selections…}, grants
//   class: name, categories, earthClass, prerequisites?, build, grants
// A legacy free-form entry (grants only) opens as unpriced custom benefits.
import { useState } from "react";
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import {
  BENEFIT_TIERS, DETRIMENT_TIERS, menuEntry, selectionCost, selectionGrant, summarizeBuild, budgetFor, DETRIMENT_CAP,
  STAT_IDS, STAT_ABBR, type Selection, type MenuEntry,
} from "@/lib/dcc-build-menu";
import { DCC_DAMAGE_TYPES, sizeName } from "./rules";
import type { DccNames } from "./data";

export const DCC_CLASS_CATEGORIES = ["Fighter", "Rogue", "Bard", "Mage", "Arcanist", "Druid", "Monk", "Barbarian", "Paladin", "Cleric", "Necromancer", "Merchant"];
type Kind = "dcc-race" | "dcc-class";

export type BuildDraft = {
  group: string;
  size: number;
  categories: string[];
  earthClass: boolean;
  prerequisites: string;
  selections: Selection[];
};

export const blankBuild = (): BuildDraft => ({ group: "Earth", size: 4, categories: [], earthClass: false, prerequisites: "", selections: [] });

export function buildFromData(d: Record<string, unknown>): BuildDraft {
  const b = d.build as { selections?: unknown } | undefined;
  const selections = Array.isArray(b?.selections)
    ? (b!.selections as Selection[])
    : (Array.isArray(d.grants) ? (d.grants as unknown[]) : []).map((g) => ({ id: "custom", kind: "benefit" as const, tier: "Minor", cost: 0, text: String(g) }));
  return {
    group: d.group === "Alien" ? "Alien" : "Earth",
    size: Math.min(8, Math.max(1, parseInt(String(d.size ?? "4"), 10) || 4)),
    categories: Array.isArray(d.categories) ? (d.categories as unknown[]).map(String) : [],
    earthClass: !!d.earthClass,
    prerequisites: String(d.prerequisites ?? ""),
    selections,
  };
}

export function buildPayload(kind: Kind, name: string, b: BuildDraft): Record<string, unknown> {
  const common = { name: name.trim(), prerequisites: b.prerequisites.trim(), build: { selections: b.selections } };
  return kind === "dcc-race"
    ? { ...common, group: b.group, size: b.size }
    : { ...common, categories: b.categories, earthClass: b.earthClass };
}

const lbl = "block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)] mb-1";
const fieldCls =
  "rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
const selCls =
  "h-[30px] rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 text-[13px] text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
const miniBtn =
  "rounded border border-[var(--border)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)]";

export default function BuildBuilder({ kind, value: b, onChange, names }: { kind: Kind; value: BuildDraft; onChange: (b: BuildDraft) => void; names: DccNames }) {
  const isRace = kind === "dcc-race";
  const set = <K extends keyof BuildDraft>(k: K, v: BuildDraft[K]) => onChange({ ...b, [k]: v });
  const sel = b.selections;
  const budget = budgetFor(kind);
  const sum = summarizeBuild(sel);
  const remaining = budget + sum.detrimentPoints - sum.benefitPoints;
  const over = remaining < 0;
  const setSel = (next: Selection[]) => set("selections", next);
  const addEntry = (e: MenuEntry, k: "benefit" | "detriment", tier: string, cost: number) =>
    setSel([...sel, { id: e.id, kind: k, tier, cost, ...(e.repeatable ? { amount: 1 } : {}) }]);
  const addCustom = (k: "benefit" | "detriment", tier: string, cost: number) => setSel([...sel, { id: "custom", kind: k, tier, cost, text: "" }]);
  const updateSel = (i: number, p: Partial<Selection>) => setSel(sel.map((s, j) => (j === i ? { ...s, ...p } : s)));
  const listId = `dcc-hb-skillspell-${kind}`;

  return (
    <>
      {isRace ? (
        <>
          <div>
            <label className={lbl}>Group</label>
            <ChipPicker single options={[["Earth", "Earth-born"], ["Alien", "Alien"]]} value={[b.group]} onChange={(v) => set("group", v[0] ?? "Earth")} />
          </div>
          <div>
            <label className={lbl}>Size</label>
            <div className="flex items-center gap-2">
              <Stepper value={b.size} min={1} max={8} width="2.4em" ariaLabel="size" onChange={(v) => set("size", v ?? 4)} />
              <span className="text-[13px] text-[var(--text)]">{sizeName(b.size)}</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="sm:col-span-2">
            <label className={lbl}>Base categories</label>
            <ChipPicker options={DCC_CLASS_CATEGORIES} value={b.categories} custom customPh="Other…" onChange={(v) => set("categories", v.slice(0, 6))} />
            <p className="mt-1 text-[11px] text-[var(--muted)]">None picked = the class name is its category.</p>
          </div>
          <label className="sm:col-span-2 flex items-center gap-2 text-[13px] text-[var(--text)]">
            <input type="checkbox" checked={b.earthClass} onChange={(e) => set("earthClass", e.target.checked)} />
            Earth Class (grants a Silver Earth Box)
          </label>
        </>
      )}
      <div className="sm:col-span-2">
        <label className={lbl}>Prerequisites (optional)</label>
        <input className={`${fieldCls} w-full`} value={b.prerequisites} maxLength={300} placeholder="e.g. Popularity 3+" onChange={(e) => set("prerequisites", e.target.value)} />
      </div>

      <div className={`sm:col-span-2 rounded border ${over ? "border-[var(--bad)]" : "border-[var(--border)]"} bg-[var(--panel)] px-3 py-2`}>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[12px]">
          <span className="font-bold uppercase tracking-[0.1em] text-[var(--muted)]">Build points</span>
          <span>Budget <b>{budget}</b></span>
          <span>Spent <b>{sum.benefitPoints}</b></span>
          <span>Detriments <b>+{sum.detrimentPoints}</b>{sum.detrimentPoints >= DETRIMENT_CAP ? <span className="text-[var(--muted)]"> (cap)</span> : null}</span>
          <span className={over ? "font-bold text-[var(--bad)]" : ""}>Remaining <b>{remaining}</b></span>
        </div>
        {over ? <p className="mt-1 text-[11px] text-[var(--bad)]">Over budget by {-remaining} — remove a benefit or add a detriment. Leftover points are lost and you can’t overspend.</p> : null}
      </div>

      <div className="sm:col-span-2">
        <label className={lbl}>This build ({sel.length})</label>
        <datalist id={listId}>{[...names.skills, ...names.spells].map((x) => <option key={x.name} value={x.name} />)}</datalist>
        {sel.length ? (
          <ul className="flex flex-col gap-1.5">
            {sel.map((s, i) => {
              const entry = menuEntry(s.id);
              const param = s.id === "custom" ? "text" : entry?.param;
              const label = s.id === "custom" ? `Custom ${s.tier}` : entry?.label ?? s.id;
              const cost = selectionCost(s);
              return (
                <li key={i} className="rounded border border-[var(--border)] border-l-[3px] border-l-[var(--hb-accent)] bg-[var(--panel)] p-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${s.kind === "detriment" ? "text-[var(--good)]" : "text-[var(--bad)]"}`}>
                      {s.kind === "detriment" ? `+${cost}` : `−${cost}`} pt
                    </span>
                    <span className="text-[12px] text-[var(--text)]">{label}</span>
                    <button type="button" className={`${miniBtn} ml-auto`} title="Remove" onClick={() => setSel(sel.filter((_, j) => j !== i))}>✕</button>
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    {entry?.repeatable ? (
                      <span className="flex items-center gap-1 text-[11px] text-[var(--muted)]">×
                        <Stepper value={s.amount ?? 1} min={1} max={20} width="2em" ariaLabel="times" onChange={(v) => updateSel(i, { amount: v ?? 1 })} />
                      </span>
                    ) : null}
                    {param === "stat" ? (
                      <ChipPicker single options={STAT_IDS.map((k) => [k, STAT_ABBR[k]] as [string, string])} value={s.stat ? [s.stat] : []} onChange={(v) => updateSel(i, { stat: v[0] ?? "" })} />
                    ) : null}
                    {param === "skill" ? (
                      <input className={`${fieldCls} min-w-0 flex-1 px-2 py-1`} list={listId} value={String(s.skill ?? "")} maxLength={60} placeholder="Skill / Spell name (pick or type)"
                        onChange={(e) => updateSel(i, { skill: e.target.value })} />
                    ) : null}
                    {param === "damageType" ? (
                      <select className={selCls} value={String(s.damageType ?? "")} onChange={(e) => updateSel(i, { damageType: e.target.value })}>
                        <option value="">— damage type —</option>
                        {(s.damageType && !DCC_DAMAGE_TYPES.includes(s.damageType) ? [...DCC_DAMAGE_TYPES, s.damageType] : DCC_DAMAGE_TYPES).map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    ) : null}
                    {param === "text" ? (
                      <input className={`${fieldCls} min-w-0 flex-1 px-2 py-1`} value={String(s.text ?? "")} maxLength={300} placeholder={entry?.help || "detail…"}
                        onChange={(e) => updateSel(i, { text: e.target.value })} />
                    ) : null}
                  </div>
                  <p className="mt-1 text-[11px] text-[var(--muted)]">→ {selectionGrant(s)}</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-[12px] text-[var(--muted)]">Nothing yet — add benefits from the menu below.</p>
        )}
      </div>

      <div className="sm:col-span-2 flex flex-col gap-2">
        <MenuBox title="Benefits — spend points" tiers={BENEFIT_TIERS} onAdd={addEntry} onCustom={addCustom} />
        <MenuBox title={`Detriments — refund points (max +${DETRIMENT_CAP})`} tiers={DETRIMENT_TIERS} onAdd={addEntry} onCustom={addCustom} />
      </div>
    </>
  );
}

function MenuBox({
  title, tiers, onAdd, onCustom,
}: {
  title: string;
  tiers: typeof BENEFIT_TIERS;
  onAdd: (e: MenuEntry, k: "benefit" | "detriment", tier: string, cost: number) => void;
  onCustom: (k: "benefit" | "detriment", tier: string, cost: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [customTier, setCustomTier] = useState(0);
  return (
    <div className="rounded border border-[var(--border)] bg-[var(--panel)]">
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between px-3 py-2 text-left">
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{title}</span>
        <span className="text-[var(--muted)]">{open ? "▾" : "▸"}</span>
      </button>
      {open ? (
        <div className="max-h-[280px] overflow-y-auto border-t border-[var(--border)] px-3 py-2">
          {tiers.map((t) => (
            <div key={t.tier} className="mb-2">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">{t.tier} · {t.cost} pt{t.cost === 1 ? "" : "s"}</div>
              <div className="flex flex-col gap-1">
                {t.entries.map((e) => (
                  <div key={e.id} className="flex items-start gap-2">
                    <button type="button" className={`${miniBtn} shrink-0`} onClick={() => onAdd(e, t.kind, t.tier, t.cost)}>+ Add</button>
                    <span className="text-[12px] leading-snug text-[var(--text)]">
                      {e.label}
                      {e.help ? <span className="text-[var(--muted)]"> — {e.help}</span> : null}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="mt-2 flex items-center gap-2 border-t border-[var(--border)] pt-2">
            <span className="text-[11px] text-[var(--muted)]">Custom at</span>
            <select className={selCls} value={customTier} onChange={(e) => setCustomTier(Number(e.target.value))}>
              {tiers.map((t, i) => <option key={t.tier} value={i}>{t.tier} ({t.cost})</option>)}
            </select>
            <button type="button" className={miniBtn} onClick={() => { const t = tiers[customTier]; onCustom(t.kind, t.tier, t.cost); }}>+ Add custom</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function BuildPreview({ kind, name, b }: { kind: Kind; name: string; b: BuildDraft }) {
  const sum = summarizeBuild(b.selections);
  const budget = budgetFor(kind);
  const sub = kind === "dcc-race"
    ? `${b.group === "Alien" ? "Alien" : "Earth-born"} · ${sizeName(b.size)} (${b.size})`
    : [(b.categories.length ? b.categories : [name || "—"]).join(" / "), b.earthClass ? "Earth Class" : ""].filter(Boolean).join(" · ");
  return (
    <Preview title={name || (kind === "dcc-race" ? "Unnamed race" : "Unnamed class")} subtitle={sub}>
      {b.prerequisites ? <p className="text-[12px]"><b className="text-[var(--hb-accent)]">Prerequisites:</b> {b.prerequisites}</p> : null}
      {sum.grants.length ? (
        <ul className="mt-1 list-disc pl-4 text-[13px] leading-snug">
          {sum.grants.map((g, i) => <li key={i}>{g}</li>)}
        </ul>
      ) : <p className="text-[12px] italic text-[var(--muted)]">No grants yet.</p>}
      <p className="mt-2 text-[11px] text-[var(--muted)]">{sum.benefitPoints} / {budget + sum.detrimentPoints} points spent</p>
    </Preview>
  );
}
