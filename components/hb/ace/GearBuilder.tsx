"use client";
// ── ACE! homebrew Gear builder ───────────────────────────────────────────────
// Storage = AceGear (lib/data/ace-types.ts): setting, category, tier, tn,
// damage (weapons), defence (armor), description — plus the new optional
// `attack` ("melee" | "ranged") for anything with damage. Read by /ace/gear,
// the character sheet's Gear Store (a Weapon also gets a linked attack row with
// its damage; `attack` sets that row's Melee/Ranged), the creation wizard's
// gear step, and the GM Screen / prep loot lists (desc + TN).
// The TN follows the tier (Normal 10 … Impossible 40) unless overridden.
import Preview from "../Preview";
import Stepper from "../Stepper";
import ChipPicker from "../ChipPicker";
import { ACE_SETTINGS, ACE_TIERS, BOOK_WEAPONS, GEAR_CATEGORIES, TIER_BUY, TIER_TN, settingLabel, type AceTier } from "./rules";
import { Cell, OpenSelect, Select, Toggle, fieldCls, hint } from "./ui";

type Data = Record<string, unknown>;
const sv = (d: Data, k: string) => (d[k] == null ? "" : String(d[k]));
const nn = (v: unknown): number | null => { const n = parseInt(String(v ?? ""), 10); return Number.isFinite(n) ? n : null; };
const WEAPONISH = /\branged\b|thrown|pistol|rifle|bow|gun|blaster|blazer|bazooka|grenade|thrower|laser|rocket|crossbow|sling|machine/i;

export type GearDraft = { setting: string; category: string; tier: AceTier; tnAuto: boolean; tn: number | null; damage: number | null; attack: "" | "melee" | "ranged"; defence: number | null; description: string };

export const blankGear = (): GearDraft => ({ setting: "core", category: "Gadget", tier: "Normal", tnAuto: true, tn: 10, damage: null, attack: "", defence: null, description: "" });
export function gearFromData(d: Data): GearDraft {
  const tier = ((ACE_TIERS as readonly string[]).includes(sv(d, "tier")) ? sv(d, "tier") : "Normal") as AceTier;
  const tn = nn(d.tn), damage = nn(d.damage);
  const atk = sv(d, "attack");
  return {
    setting: sv(d, "setting") || "core", category: sv(d, "category") || "Gadget", tier, tnAuto: tn === TIER_TN[tier], tn, damage,
    // Legacy rows have no `attack`: show what the sheet's name heuristic would pick.
    attack: atk === "melee" || atk === "ranged" ? atk : damage != null ? (WEAPONISH.test(sv(d, "name") + " " + sv(d, "description")) ? "ranged" : "melee") : "",
    defence: nn(d.defence), description: sv(d, "description"),
  };
}
export function gearPayload(name: string, g: GearDraft): Data {
  const out: Data = { name, setting: g.setting, category: g.category, tier: g.tier, tn: g.tnAuto ? TIER_TN[g.tier] : g.tn, description: g.description };
  if (g.damage != null) { out.damage = g.damage; if (g.attack) out.attack = g.attack; }
  if (g.defence != null) out.defence = g.defence;
  return out;
}
const tnOf = (g: GearDraft) => (g.tnAuto ? TIER_TN[g.tier] : g.tn);

export default function GearBuilder({ value: g, onChange }: { value: GearDraft; onChange: (v: GearDraft) => void }) {
  const set = (p: Partial<GearDraft>) => onChange({ ...g, ...p });
  const isWeapon = g.category === "Weapon" || g.category === "Starship Weapon" || g.damage != null;
  const isArmor = g.category === "Armor" || g.defence != null;
  return (
    <>
      <Cell label="Category"><OpenSelect value={g.category} options={GEAR_CATEGORIES} ariaLabel="category" onChange={(v) => set({ category: v, ...(v === "Weapon" && g.damage == null ? { damage: 2, attack: g.attack || "melee" } : {}), ...(v === "Armor" && g.defence == null ? { defence: 2 } : {}) })} /></Cell>
      <Cell label="Setting"><Select value={g.setting} options={ACE_SETTINGS} ariaLabel="setting" onChange={(v) => set({ setting: v })} /></Cell>
      <Cell label="Tier" className="sm:col-span-2" help={`Buy it with a Style roll (+ Wealth) and 1 Karma: ${TIER_BUY[g.tier]}.`}>
        <ChipPicker single options={[...ACE_TIERS]} value={[g.tier]} onChange={(v) => { const t = (v[0] ?? g.tier) as AceTier; set({ tier: t, ...(g.tnAuto ? { tn: TIER_TN[t] } : {}) }); }} />
      </Cell>
      <Cell label="Target number">
        <span className="flex flex-wrap items-center gap-3">
          {g.tnAuto ? <span className="font-mono text-sm font-bold">{TIER_TN[g.tier] ?? "—"}</span> : <Stepper value={g.tn} min={0} max={60} nullable ariaLabel="target number" onChange={(n) => set({ tn: n })} />}
          <Toggle checked={g.tnAuto} onChange={(v) => set({ tnAuto: v, tn: v ? TIER_TN[g.tier] : g.tn ?? TIER_TN[g.tier] })} title="TN from the tier">Auto</Toggle>
        </span>
      </Cell>
      <Cell label="Defence (armor)" help={isArmor ? "Added to the wearer's Defence." : "Leave blank unless it protects."}>
        <Stepper value={g.defence} min={0} max={20} nullable signed ariaLabel="defence" onChange={(n) => set({ defence: n })} />
      </Cell>
      <Cell label="Damage" className="sm:col-span-2" help={isWeapon ? "Flat damage on a hit. Melee rolls Brawn (+ Brawling); ranged rolls Moves (+ Shooting)." : "Set damage to make it usable as a weapon."}>
        <div className="flex flex-wrap items-center gap-3">
          <Stepper value={g.damage} min={0} max={20} nullable ariaLabel="damage" onChange={(n) => set({ damage: n, ...(n != null && !g.attack ? { attack: "melee" } : {}) })} />
          {g.damage != null ? (
            <ChipPicker single options={[["melee", "Melee"], ["ranged", "Ranged"]]} value={g.attack ? [g.attack] : []} onChange={(v) => set({ attack: (v[0] as GearDraft["attack"]) ?? "" })} />
          ) : null}
          <select className="h-[34px] rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 text-sm text-[var(--text)]" value="" aria-label="weapon table" onChange={(e) => { const w = BOOK_WEAPONS.find((x) => x.name === e.target.value); if (w) set({ damage: w.damage, attack: w.ranged ? "ranged" : "melee" }); }}>
            <option value="">Like a…</option>
            {BOOK_WEAPONS.map((w) => <option key={w.name} value={w.name}>{w.name} ({w.damage})</option>)}
          </select>
        </div>
      </Cell>
      <Cell label="Description" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[80px]`} value={g.description} maxLength={2000} placeholder="Think a smartphone, but without any apps. But it can reach space." onChange={(e) => set({ description: e.target.value })} />
        {g.category === "Weapon" && g.damage == null ? <p className={hint}>A Weapon without damage adds an attack row with no damage on the sheet.</p> : null}
      </Cell>
    </>
  );
}

export function GearPreview({ name, g }: { name: string; g: GearDraft }) {
  const tn = tnOf(g);
  const meta = [g.category, g.tier !== "Normal" ? g.tier : "", g.damage != null ? `${g.damage} dmg${g.attack ? ` (${g.attack})` : ""}` : "", g.defence != null ? `+${g.defence} Defence` : ""].filter(Boolean).join(" · ");
  return (
    <Preview title={name || "Unnamed Gear"} subtitle={settingLabel(g.setting)}>
      <div className="flex flex-wrap items-baseline justify-between gap-2 text-[12px]">
        <span className="text-[var(--muted)]">{meta}</span>
        <span className="font-mono font-bold">{tn != null ? `TN ${tn}` : "Free"}</span>
      </div>
      <p className="mt-2 whitespace-pre-line text-[13px]">{g.description || <span className="text-[var(--muted)]">No description yet.</span>}</p>
      <p className="mt-2 text-[11px] text-[var(--muted)]">{g.tier} · {TIER_BUY[g.tier]}</p>
    </Preview>
  );
}
