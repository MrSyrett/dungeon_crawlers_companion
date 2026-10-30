"use client";
// ── ACE! homebrew Role builder ───────────────────────────────────────────────
// Storage = AceRole (lib/data/ace-types.ts): category, setting, ability (prose),
// power, statMods, healthBonus, grantsFocus — plus the new optional
// startingGear (gear names). Read by /ace/roles, the character sheet's Role
// datalist + hint, and the creation wizard (public/tools-data/ace-sheet-builder.js),
// which applies power / statMods / healthBonus / grantsFocus and now pre-ticks
// startingGear. The mechanical effects are edited as bonus badges.
import BonusBadges, { BadgeStrip, type BadgeKind } from "../BonusBadges";
import Preview from "../Preview";
import { ACE_SETTINGS, ACE_STATS, ROLE_CATEGORIES, roleBadges, roleFx, settingLabel, type AceStat, type RoleBadge } from "./rules";
import { Cell, OpenSelect, PickList, Select, fieldCls, useAceData, type AceData } from "./ui";

type Data = Record<string, unknown>;
const sv = (d: Data, k: string) => (d[k] == null ? "" : String(d[k]));
const strs = (v: unknown) => (Array.isArray(v) ? v.map((x) => String(x ?? "").trim()).filter(Boolean) : []);
const STAT_PAIRS = ACE_STATS.map((s) => [s, s] as const);

export type RoleDraft = { category: string; setting: string; ability: string; badges: RoleBadge[]; startingGear: string[] };

const kinds = (d: AceData | null): BadgeKind[] => [
  { k: "stat", label: "Stat", color: "blue", amount: true, target: "stat", fmt: "{t} {n}", tip: "Added to the Stat when the creation wizard builds the Hero (Ogre: Brawn +1). −3…+3." },
  { k: "health", label: "Health", color: "green", amount: true, fmt: "{n} Health", tip: "Flat Health bonus on top of Brawn (Ogre +2). −5…+10." },
  { k: "power", label: "Power Stat", color: "purple", format: () => "Grants Power", tip: "The Role has the fifth Stat, Power (costs 1 Karma per use)." },
  { k: "focus", label: "Free Focus", color: "teal", target: "list", list: (d?.focuses ?? []).map((f) => ({ name: f.name, meta: f.stat })), fmt: "Focus: {t}", tip: "A Focus the Role grants for free; the wizard places it on its Stat." },
];

export const blankRole = (): RoleDraft => ({ category: "Species", setting: "core", ability: "", badges: [], startingGear: [] });
export function roleFromData(d: Data): RoleDraft {
  const sm = (d.statMods && typeof d.statMods === "object" ? d.statMods : {}) as Record<string, unknown>;
  const statMods: Partial<Record<AceStat, number>> = {};
  for (const st of ACE_STATS) { const n = Number(sm[st] ?? d["mod" + st]); if (Number.isFinite(n) && n) statMods[st] = Math.trunc(n); }
  const hb = Number(d.healthBonus);
  return {
    category: sv(d, "category") || "Species", setting: sv(d, "setting") || "core", ability: sv(d, "ability"),
    badges: roleBadges({ power: d.power === true || d.power === "true", statMods, healthBonus: Number.isFinite(hb) ? Math.trunc(hb) : 0, grantsFocus: strs(d.grantsFocus) }),
    startingGear: strs(d.startingGear),
  };
}
export function rolePayload(name: string, r: RoleDraft): Data {
  const fx = roleFx(r.badges);
  return { name, category: r.category, setting: r.setting, ability: r.ability, power: fx.power, statMods: fx.statMods, healthBonus: fx.healthBonus, grantsFocus: fx.grantsFocus, startingGear: r.startingGear };
}

export default function RoleBuilder({ value: r, onChange }: { value: RoleDraft; onChange: (v: RoleDraft) => void }) {
  const data = useAceData();
  const set = (p: Partial<RoleDraft>) => onChange({ ...r, ...p });
  const gearNames = [...new Set((data?.gear ?? []).map((g) => g.name))].sort((a, b) => a.localeCompare(b));
  return (
    <>
      <Cell label="Category"><OpenSelect value={r.category} options={ROLE_CATEGORIES} ariaLabel="category" onChange={(v) => set({ category: v })} /></Cell>
      <Cell label="Setting"><Select value={r.setting} options={ACE_SETTINGS} ariaLabel="setting" onChange={(v) => set({ setting: v })} /></Cell>
      <Cell label="Ability" className="sm:col-span-2" help="A Role grants one special ability, in plain words. Mechanical bits go in the badges below.">
        <textarea className={`${fieldCls} min-h-[90px]`} value={r.ability} maxLength={4000} placeholder="You can fly. That's good, isn't it?" onChange={(e) => set({ ability: e.target.value })} />
      </Cell>
      <Cell label="Effects" className="sm:col-span-2" help="Applied by the character sheet's creation wizard: Power Stat, Stat mods, Health and free Focuses.">
        <BonusBadges value={r.badges} onChange={(b) => set({ badges: b })} kinds={kinds(data)} stats={STAT_PAIRS} empty="No mechanical effects" addLabel="+ Effect" />
      </Cell>
      <Cell label="Starting gear" className="sm:col-span-2" help="What the Role suggests you carry. The wizard pre-ticks these; weapons get an attack row.">
        <PickList value={r.startingGear} options={gearNames} placeholder="+ Gear from the list…" onChange={(v) => set({ startingGear: v })} />
      </Cell>
    </>
  );
}

export function RolePreview({ name, r }: { name: string; r: RoleDraft }) {
  const data = useAceData();
  const fx = roleFx(r.badges);
  return (
    <Preview title={name || "Unnamed Role"} subtitle={`${r.category || "Role"} · ${settingLabel(r.setting)}`}>
      <p className="whitespace-pre-line text-[13px]">{r.ability || <span className="text-[var(--muted)]">No ability yet.</span>}</p>
      <div className="mt-2"><BadgeStrip value={r.badges} kinds={kinds(data)} stats={STAT_PAIRS} /></div>
      {r.startingGear.length ? <p className="mt-2 text-[12px]"><b>Gear:</b> {r.startingGear.join(", ")}</p> : null}
      <p className="mt-2 text-[11px] text-[var(--muted)]">
        {fx.power ? "Grants a Power Stat. " : ""}{fx.grantsFocus.length ? `Free Focus: ${focusLine(fx.grantsFocus, data)}. ` : ""}{fx.healthBonus ? `${fx.healthBonus > 0 ? "+" : ""}${fx.healthBonus} Health. ` : ""}
      </p>
    </Preview>
  );
}
const focusLine = (names: string[], d: AceData | null) => names.map((n) => { const st = d?.focuses.find((f) => f.name.toLowerCase() === n.toLowerCase())?.stat; return st ? `${n} (${st})` : n; }).join(", ");
