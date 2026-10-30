"use client";
// ── Dungeon Crawler Carl homebrew item builder ───────────────────────────────
// Category / tier / slot chips, a price stepper and the item's bonuses as
// badges. Storage (type "dcc-item", DccItem shape) is unchanged:
//   name, category, tier?, slot?, price?, effect,
//   benefits: [{kind, target?, amount?, floor?}] — the DCCBonus model
//     (public/tools-data/dcc-bonus.js) the GM Screen loot box and the DCC sheet
//     use; the sheet's inventory picker copies them onto the row and the equip
//     engine (dcc-sheet-equip.js) applies them while worn.
// The badges are the UI over that list: "skill with floor:true" shows as its
// own "Skill = Floor" kind (dccKinds / toBadges / fromBadges).
import BonusBadges, { BadgeStrip, type Badge, type BadgeKind } from "../BonusBadges";
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import { DCC_RESETS, benefitLabel, type DccBonus } from "@/lib/dcc-bonus";
import type { DccNames } from "./data";

// Mirrors DCC_ITEM_CATEGORIES / DCC_ITEM_TIERS / DCC_ITEM_SLOTS in lib/homebrew.ts.
export const DCC_ITEM_CATEGORIES: [string, string][] = [
  ["consumable", "Consumable"], ["weapon", "Weapon"], ["armor", "Armor"],
  ["accessory", "Accessory"], ["scroll", "Scroll"], ["tome", "Tome"],
  ["mundane", "Mundane"], ["tool", "Tool"], ["material", "Material"],
];
const TIERS = ["Mundane", "Bronze", "Silver", "Gold", "Platinum", "Legendary", "Celestial"];
const SLOTS = ["Head", "Torso", "Arms", "Legs", "Feet", "Hands/Holding", "Accessory"];
const STATS: [string, string][] = [["str", "STR"], ["int", "INT"], ["con", "CON"], ["dex", "DEX"], ["cha", "CHA"]];
const KNOWN = ["stat", "allstats", "skill", "spell", "buff", "dr", "evade", "move", "step", "note"];

const asBonus = (b: Badge): DccBonus => (b.kind === "skillFloor" ? { kind: "skill", target: b.target, floor: true } : b);
const fmt = (b: Badge) => benefitLabel(asBonus(b));

export function dccKinds(n: DccNames): BadgeKind[] {
  return [
    { k: "stat", label: "Stat", color: "blue", amount: true, target: "stat", tip: "+N to a Stat", format: fmt },
    { k: "allstats", label: "All Stats", color: "blue", amount: true, tip: "+N to every Stat", format: fmt },
    { k: "skill", label: "Skill", color: "green", amount: true, amountPh: "ranks", target: "list", list: n.skills, targetPh: "Skill name…", tip: "+N ranks in a Skill (added if the crawler doesn't have it)", format: fmt },
    { k: "skillFloor", label: "Skill = Floor", color: "green", target: "list", list: n.skills, targetPh: "Skill name…", tip: "A Passive Skill whose Rank equals the Floor Number", format: fmt },
    { k: "spell", label: "Spell", color: "purple", amount: true, optAmount: true, amountPh: "Rank", target: "list", list: n.spells, targetPh: "Spell name…", tip: "An Inherent Spell while worn: cast with no Mana, using charges (set below). On a scroll it casts once free; a tome teaches it. Rank optional.", format: fmt },
    { k: "buff", label: "Buff", color: "teal", target: "list", list: n.buffs, targetPh: "Buff name…", tip: "A Buff while the item is worn", format: fmt },
    { k: "dr", label: "DR", color: "gold", amount: true, tip: "+N Damage Resistance", format: fmt },
    { k: "evade", label: "Evade", color: "gold", amount: true, tip: "+N Evade", format: fmt },
    { k: "move", label: "Move", color: "gold", amount: true, tip: "+N Move", format: fmt },
    { k: "step", label: "Step", color: "gold", amount: true, tip: "+N Step", format: fmt },
    { k: "note", label: "Note", color: "grey", target: "text", targetPh: "e.g. Resist Fire damage", tip: "Anything the sheet can't automate — shown on the item, not applied", format: fmt },
  ];
}

export function toBadges(v: unknown): Badge[] {
  if (!Array.isArray(v)) return [];
  return (v as unknown[]).flatMap((raw) => {
    const o = (raw ?? {}) as Record<string, unknown>;
    let kind = typeof o.kind === "string" ? o.kind : "";
    if (kind === "statpct") kind = "stat";
    if (kind === "speed") kind = "move";
    if (!KNOWN.includes(kind)) return [];
    if (kind === "skill" && o.floor === true) return [{ kind: "skillFloor", target: String(o.target ?? "") }];
    const b: Badge = { kind };
    if (o.target != null && o.target !== "") b.target = String(o.target);
    if (o.amount != null && Number.isFinite(Number(o.amount)) && Number(o.amount) !== 0) b.amount = Number(o.amount);
    if (kind === "spell" && Number(o.uses) > 0) Object.assign(b, { uses: Number(o.uses), reset: String(o.reset ?? "long") });
    return [b];
  });
}
export const fromBadges = (list: Badge[]): DccBonus[] => list.map(asBonus);

/** `skill` = the attack skill a WEAPON is wielded with (a homebrew "Big Bertha"
 *  swung as a Baseball Bat) — the sheet adds it to the Skills list when the weapon
 *  is picked up or equipped. Empty = the sheet works it out from the name. */
export type ItemDraft = { category: string; tier: string; slot: string; price: number | null; effect: string; benefits: Badge[]; skill: string };

export const blankItem = (): ItemDraft => ({ category: "mundane", tier: "", slot: "", price: null, effect: "", benefits: [], skill: "" });

export function itemFromData(d: Record<string, unknown>): ItemDraft {
  const p = parseInt(String(d.price ?? ""), 10);
  return {
    category: String(d.category || "mundane"),
    tier: String(d.tier ?? ""),
    slot: String(d.slot ?? ""),
    price: Number.isFinite(p) && p > 0 ? p : null,
    effect: String(d.effect ?? ""),
    benefits: toBadges(d.benefits),
    skill: String(d.skill ?? ""),
  };
}

export function itemPayload(name: string, it: ItemDraft): Record<string, unknown> {
  return {
    name: name.trim(),
    category: it.category,
    tier: it.tier,
    slot: it.slot.trim(),
    price: it.price ?? "",
    effect: it.effect.trim(),
    benefits: fromBadges(it.benefits),
    skill: it.category === "weapon" ? it.skill.trim() : "",
  };
}

const lbl = "block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)] mb-1";
const fieldCls =
  "w-full rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";

export default function ItemBuilder({ value: it, onChange, names }: { value: ItemDraft; onChange: (v: ItemDraft) => void; names: DccNames }) {
  const set = <K extends keyof ItemDraft>(k: K, v: ItemDraft[K]) => onChange({ ...it, [k]: v });
  const slotOpts = it.slot && !SLOTS.includes(it.slot) ? [...SLOTS, it.slot] : SLOTS;
  return (
    <>
      <div className="sm:col-span-2">
        <label className={lbl}>Category</label>
        <ChipPicker single options={DCC_ITEM_CATEGORIES} value={[it.category]} onChange={(v) => set("category", v[0] ?? "mundane")} />
      </div>
      <div className="sm:col-span-2">
        <label className={lbl}>Loot tier</label>
        <ChipPicker single options={TIERS} value={it.tier ? [it.tier] : []} onChange={(v) => set("tier", v[0] ?? "")} />
      </div>
      <div className="sm:col-span-2 flex flex-wrap gap-x-6 gap-y-3">
        <div>
          <label className={lbl}>Equip slot (optional)</label>
          <ChipPicker single custom customPh="Other slot…" options={slotOpts} value={it.slot ? [it.slot] : []} onChange={(v) => set("slot", v[0] ?? "")} />
        </div>
        <div>
          <label className={lbl}>Price (gold)</label>
          <Stepper value={it.price} min={1} max={10000000} nullable width="6em" ariaLabel="price" onChange={(v) => set("price", v)} />
        </div>
      </div>
      {it.category === "weapon" ? (
        <div className="sm:col-span-2">
          <label className={lbl}>Weapon skill</label>
          <select className="h-[34px] w-full max-w-sm rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]"
            value={it.skill} onChange={(e) => set("skill", e.target.value)} aria-label="weapon skill">
            <option value="">Work it out from the name</option>
            {(it.skill && !names.attacks.some((a) => a.name === it.skill) ? [{ name: it.skill }, ...names.attacks] : names.attacks).map((a) => (
              <option key={a.name} value={a.name}>{a.name}{a.meta ? ` — ${a.meta}` : ""}</option>
            ))}
          </select>
          <p className="mt-1 text-[11px] text-[var(--muted)]">The attack skill it&apos;s wielded with. A crawler who picks it up gets this skill (Rank 0) if they don&apos;t have it.</p>
        </div>
      ) : null}
      <div className="sm:col-span-2">
        <label className={lbl}>Bonuses (applied while equipped)</label>
        <BonusBadges value={it.benefits} kinds={dccKinds(names)} stats={STATS} max={20} empty="No bonuses — flavour-only item" onChange={(v) => set("benefits", v)} />
        {!/^(scroll|tome)$/.test(it.category) && it.benefits.some((b) => b.kind === "spell") ? (
          <div className="mt-2 flex flex-col gap-1.5 rounded border border-[var(--border)] bg-[var(--panel-2)] p-2">
            <span className={lbl}>Spell charges (no Mana while worn)</span>
            {it.benefits.map((b, i) => {
              if (b.kind !== "spell") return null;
              const c = b as Badge & { uses?: number; reset?: string };
              const setC = (patch: { uses?: number; reset?: string }) => set("benefits", it.benefits.map((x, j) => (j === i ? ({ ...x, ...patch } as Badge) : x)));
              return (
                <div key={i} className="flex flex-wrap items-center gap-2 text-[13px] text-[var(--text)]">
                  <b className="min-w-[8em]">{b.target}</b>
                  <Stepper value={c.uses ?? 1} min={1} max={20} width="2.6em" ariaLabel={`${b.target} uses`} onChange={(v) => setC({ uses: v ?? 1, reset: c.reset ?? "long" })} />
                  <span className="text-[var(--muted)]">uses per</span>
                  <select className="h-[30px] rounded border border-[var(--border)] bg-[var(--panel)] px-2 text-sm text-[var(--text)]" value={c.reset ?? "long"} aria-label={`${b.target} recharge`}
                    onChange={(e) => setC({ uses: c.uses ?? 1, reset: e.target.value })}>
                    {DCC_RESETS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                  </select>
                </div>
              );
            })}
          </div>
        ) : null}
        <p className="mt-1 text-[11px] text-[var(--muted)]">
          Stats, skill ranks, spells, buffs, DR, Evade, Move and Step are applied by the character sheet when the item is equipped. Notes show on the item only.
        </p>
      </div>
      <div className="sm:col-span-2">
        <label className={lbl}>Effect / description</label>
        <textarea className={`${fieldCls} min-h-[70px]`} value={it.effect} maxLength={4000} placeholder="What it does, how it looks…" onChange={(e) => set("effect", e.target.value)} />
      </div>
    </>
  );
}

const CAT: Record<string, string> = Object.fromEntries(DCC_ITEM_CATEGORIES);

export function ItemPreview({ name, it, names }: { name: string; it: ItemDraft; names: DccNames }) {
  const sub = [it.tier, CAT[it.category] ?? it.category, it.slot, it.category === "weapon" && it.skill ? `${it.skill} skill` : ""].filter(Boolean).join(" · ");
  return (
    <Preview title={name || "Unnamed item"} subtitle={sub}>
      {it.benefits.length ? <BadgeStrip value={it.benefits} kinds={dccKinds(names)} stats={STATS} /> : null}
      {it.effect ? <p className="mt-2 text-[13px] leading-relaxed">{it.effect}</p> : null}
      {it.price ? <p className="mt-2 text-[12px] text-[var(--muted)]"><b className="text-[var(--hb-accent)]">Price</b> {it.price.toLocaleString("en")} gold</p> : null}
    </Preview>
  );
}
