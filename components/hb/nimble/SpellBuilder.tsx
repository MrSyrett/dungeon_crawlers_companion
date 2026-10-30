"use client";
// ── Nimble homebrew spell builder ────────────────────────────────────────────
// Storage (type "nimble-spell", the NIMBLE_SPELLS book shape the sheet's
// spellbook / Cast button and the spells page read):
//   composed: school, tier, actions, targeting, utility, text — "Range: 8.
//     Damage: 1d10 fire (ignoring armor). <effect> High Levels: +5 damage every
//     5 levels." (cantrips) / "… Upcast: +10 damage." (tiered). The sheet's Cast
//     rolls the Damage: dice and applies the High Levels scaling.
//   builder data: sb (./rules NimSpellBuild — requirement, concentration,
//     distance, damage dice + stat + type + flags, effect, scaling)
// Legacy text opens through parseNimSpellText; text that doesn't re-compose
// exactly lands whole in the effect box (nothing lost).
import ChipPicker from "../ChipPicker";
import DiceInput from "../DiceInput";
import Preview from "../Preview";
import Stepper from "../Stepper";
import {
  NIM_ACTIONS, NIM_CONCENTRATION, NIM_DAMAGE_TYPES, NIM_DICE, NIM_DIE_STEPS, NIM_SCHOOLS, NIM_SPELL_DIST, NIM_SPELL_STATS, NIM_TARGETING,
  blankSpellBuild, cleanSpellBuild, composeNimScale, composeNimSpellText, parseNimSpellText, type NimSpellBuild,
} from "./rules";
import { Cell, Select, Toggle, fieldCls, hint } from "./ui";

type Data = Record<string, unknown>;
export type SpellDraft = { school: string; tier: number; actions: string; targeting: string; utility: boolean; sb: NimSpellBuild };

export function blankSpell(): SpellDraft {
  return { school: "Fire", tier: 0, actions: "1 Action", targeting: "Single Target", utility: false, sb: blankSpellBuild() };
}
export function spellFromData(d: Data): SpellDraft {
  const tier = Math.max(0, Math.min(9, parseInt(String(d.tier ?? 0), 10) || 0));
  return {
    school: String(d.school || "Fire"), tier, actions: String(d.actions || "1 Action"), targeting: String(d.targeting ?? ""), utility: !!d.utility,
    sb: d.sb && typeof d.sb === "object" ? cleanSpellBuild(d.sb) : parseNimSpellText(tier, String(d.text ?? "")),
  };
}
export function spellPayload(name: string, x: SpellDraft): Data {
  return { name, school: x.school, tier: x.tier, actions: x.actions, targeting: x.targeting, utility: x.utility, sb: x.sb, text: composeNimSpellText(x.tier, x.sb) };
}

export default function SpellBuilder({ value: x, onChange }: { value: SpellDraft; onChange: (v: SpellDraft) => void }) {
  const set = (p: Partial<SpellDraft>) => onChange({ ...x, ...p });
  const sb = x.sb;
  const setSb = (p: Partial<NimSpellBuild>) => set({ sb: { ...sb, ...p } });
  const g = sb.dmg;
  const setG = (p: Partial<NimSpellBuild["dmg"]>) => setSb({ dmg: { ...g, ...p } });
  const sc = sb.scale;
  const setSc = (p: Partial<NimSpellBuild["scale"]>) => setSb({ scale: { ...sc, ...p } });
  const cantrip = x.tier === 0;
  const scaleKinds: [string, string][] = cantrip
    ? [["", "— none —"], ["dmg", "+N damage every 5 levels"], ["dice", "+NdX every 5 levels"], ["die", "Die size +1 step every 5 levels"], ["range", "+N Range/Reach every 5 levels"], ["custom", "Custom…"]]
    : [["", "— none —"], ["dmg", "+N damage"], ["dice", "+NdX damage"], ["range", "+N Range/Reach"], ["custom", "Custom…"]];

  return (
    <>
      <Cell label="School" className="sm:col-span-2">
        <ChipPicker single options={NIM_SCHOOLS} value={[x.school]} onChange={(v) => v[0] && set({ school: v[0] })} />
      </Cell>
      <div className="sm:col-span-2 flex flex-wrap items-start gap-x-5 gap-y-3">
        <Cell label="Tier" help="0 = cantrip (no mana)">
          <Stepper value={x.tier} min={0} max={9} ariaLabel="tier" onChange={(v) => set({ tier: v ?? 0, sb: { ...sb, scale: (v ?? 0) === 0 || sc.kind !== "die" ? sc : { ...sc, kind: "" } } })} />
        </Cell>
        <Cell label="Actions"><Select value={x.actions} options={NIM_ACTIONS} ariaLabel="actions" onChange={(v) => set({ actions: v })} /></Cell>
        <Cell label="Targeting"><Select value={x.targeting} options={[["", "—"], ...NIM_TARGETING.map((t) => [t, t] as [string, string])]} ariaLabel="targeting" onChange={(v) => set({ targeting: v })} /></Cell>
        <Cell label="Concentration"><Select value={sb.conc} options={[["", "— none —"], ...NIM_CONCENTRATION.map((c) => [c, c] as [string, string])]} ariaLabel="concentration" onChange={(v) => setSb({ conc: v })} /></Cell>
        <Cell label="Utility list"><div className="pt-2"><Toggle checked={x.utility} onChange={(v) => set({ utility: v })}>Utility spell</Toggle></div></Cell>
      </div>

      <Cell label="Distance">
        <span className="flex items-center gap-2">
          <Select value={sb.dist.kind} options={NIM_SPELL_DIST} ariaLabel="distance kind" onChange={(v) => setSb({ dist: { ...sb.dist, kind: v } })} />
          {sb.dist.kind ? <Stepper value={sb.dist.n} min={1} max={100} ariaLabel="distance" onChange={(v) => setSb({ dist: { ...sb.dist, n: v ?? 1 } })} /> : null}
        </span>
      </Cell>
      <Cell label="Requirement (optional)">
        <input className={fieldCls} value={sb.req} maxLength={200} placeholder="Shadowmancer only." onChange={(e) => setSb({ req: e.target.value })} />
      </Cell>

      <Cell label="Damage" className="sm:col-span-2">
        <div className="flex flex-col gap-2">
          <Toggle checked={g.on} onChange={(v) => setG({ on: v })}>Deals damage (rolled by the sheet&apos;s Cast)</Toggle>
          {g.on ? (
            <>
              <span className="flex flex-wrap items-center gap-2">
                <DiceInput value={g.dice} dice={[...NIM_DICE, 100]} minCount={1} maxCount={20} modMin={-10} modMax={100} ariaLabel="spell damage" onChange={(v) => setG({ dice: v })} />
                <Select value={g.stat} options={NIM_SPELL_STATS.map((v) => [v, v ? `+ ${v}` : "no stat"] as [string, string])} ariaLabel="damage stat" onChange={(v) => setG({ stat: v })} />
                <Select value={g.dtype} options={[["", "untyped"], ...NIM_DAMAGE_TYPES.map((t) => [t, t] as [string, string])]} ariaLabel="damage type" onChange={(v) => setG({ dtype: v })} />
              </span>
              <span className="flex flex-wrap items-center gap-4">
                <Toggle checked={g.ignoreArmor} onChange={(v) => setG({ ignoreArmor: v })}>Ignoring armor</Toggle>
                <Toggle checked={g.noMiss} onChange={(v) => setG({ noMiss: v })}>Does not miss</Toggle>
                <input className={`${fieldCls} min-w-[180px] flex-1`} value={g.note} maxLength={120} placeholder="Damage note (to a Smoldering target…)" onChange={(e) => setG({ note: e.target.value })} />
              </span>
            </>
          ) : null}
        </div>
      </Cell>

      <Cell label="Effect" className="sm:col-span-2" help="On hit / On crit riders, conditions, reactions — anything that isn't a number above.">
        <textarea className={`${fieldCls} min-h-[80px]`} value={sb.effect} maxLength={2500} placeholder="On crit: Smoldering." onChange={(e) => setSb({ effect: e.target.value })} />
      </Cell>

      <Cell label={cantrip ? "High Levels (cantrip scaling)" : "Upcast (per extra mana)"} className="sm:col-span-2">
        <span className="flex flex-wrap items-center gap-2">
          <Select value={sc.kind} options={scaleKinds} ariaLabel="scaling" onChange={(v) => setSc({ kind: v })} />
          {sc.kind === "dmg" || sc.kind === "dice" || sc.kind === "range" ? <Stepper value={sc.n} min={1} max={50} ariaLabel="scaling amount" onChange={(v) => setSc({ n: v ?? 1 })} /> : null}
          {sc.kind === "dice" ? <Select value={String(sc.d)} options={[4, 6, 8, 10, 12, 20].map((d) => [String(d), `d${d}`] as [string, string])} ariaLabel="scaling die" onChange={(v) => setSc({ d: parseInt(v, 10) })} /> : null}
          {sc.kind === "custom" ? <input className={`${fieldCls} min-w-[220px] flex-1`} value={sc.text} maxLength={300} placeholder="+1 Reach, +2 damage." onChange={(e) => setSc({ text: e.target.value })} /> : null}
        </span>
        {sc.kind ? <p className={hint}>{composeNimScale(x.tier, sc, sb.dist.kind)}</p> : null}
        {cantrip && sc.kind === "dice" && g.on && g.dice.d !== sc.d ? <p className={hint}>The sheet only scales extra dice that match the damage die (d{g.dice.d}).</p> : null}
        {sc.kind === "die" && !cantrip ? <p className={hint}>{NIM_DIE_STEPS} is cantrip-only.</p> : null}
      </Cell>
    </>
  );
}

export function SpellPreview({ name, x }: { name: string; x: SpellDraft }) {
  const tierTxt = x.tier ? `Tier ${x.tier}` : "Cantrip";
  return (
    <Preview title={name || "Unnamed spell"} subtitle={`${x.school}${x.utility ? " utility" : ""} · ${tierTxt} · ${x.actions}${x.targeting ? ` · ${x.targeting}` : ""}`}>
      <p className="text-[13px] leading-relaxed">{composeNimSpellText(x.tier, x.sb) || <span className="text-[var(--muted)]">No rules text yet.</span>}</p>
      {x.tier ? <p className={hint}>Costs {x.tier} mana.</p> : null}
    </Preview>
  );
}
