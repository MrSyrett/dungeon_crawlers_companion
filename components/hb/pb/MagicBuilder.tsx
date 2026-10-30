"use client";
// ── Pirate Borg homebrew Ancient Relic / Arcane Ritual builder ───────────────
// Storage = the PB_RELICS / PB_RITUALS book shape (lib/data/pb-types PbRelic /
// PbRitual) the /pirate-borg/magic page and the PB sheet read: `text` (the
// effect, prose) plus the mechanics the sheet's useRelic / castRitual roll:
//   duration ("d6+SPIRIT rounds"), targets ("d2+SPIRIT") | target ("ally") |
//   area, targetTest {ability?, dr}, damage (+ ignoresArmor), heal, extraArmor
//   ("d4"), and for relics tempHp, singleUse / consumable.
// The builder posts `build` (rules PbMagicBuild); lib/homebrew.ts cleans it and
// composes those fields (rules composeMagic). Opening a record parses them
// back (rules magicFromData — all 40 book relics/rituals round-trip exactly).
// The user's own test is fixed by the rules: a relic tests SPIRIT DR12 after
// use, a ritual tests SPIRIT DR12 to cast — shown, not stored.
import Preview from "../Preview";
import ChipPicker from "../ChipPicker";
import { PB_EXTRA_ARMOR, blankMagic, composeMagic, magicFromData, magicLine, type PbMagicBuild } from "./rules";
import { Cell, DurationInput, SDiceInput, Select, TestInput, Toggle, fieldCls, smallBtn } from "./ui";

type Data = Record<string, unknown>;
export type MagicDraft = { kind: "relic" | "ritual"; text: string; build: PbMagicBuild };

export const blankRelic = (): MagicDraft => ({ kind: "relic", text: "", build: blankMagic() });
export const blankRitual = (): MagicDraft => ({ kind: "ritual", text: "", build: blankMagic() });
export const relicFromData = (d: Data): MagicDraft => ({ kind: "relic", text: String(d.text ?? ""), build: magicFromData(d) });
export const ritualFromData = (d: Data): MagicDraft => ({ kind: "ritual", text: String(d.text ?? ""), build: magicFromData(d) });
export const magicPayload = (name: string, m: MagicDraft): Data => ({ name, text: m.text, build: m.build, ...composeMagic(m.build, m.kind) });

export default function MagicBuilder({ value: m, onChange }: { value: MagicDraft; onChange: (v: MagicDraft) => void }) {
  const b = m.build;
  const set = (p: Partial<PbMagicBuild>) => onChange({ ...m, build: { ...b, ...p } });
  const relic = m.kind === "relic";
  return (
    <>
      <Cell label="Effect" className="sm:col-span-2" help={relic ? "Use your action to activate it, then test SPIRIT DR12: fail = stunned next round and unusable until dawn; fumble = destroyed and you lose d2 HP." : "Cast with your action (or a minute / an hour for −2 / −4 DR) and test SPIRIT DR12: fail = Mystical Mishap and no more casting it until dawn."}>
        <textarea className={`${fieldCls} min-h-[80px]`} value={m.text} maxLength={3000} placeholder={relic ? "One ally gets +1 to attack and damage for d6 turns." : "d6 creatures can breathe underwater for d4+SPIRIT hours."} onChange={(e) => onChange({ ...m, text: e.target.value })} />
      </Cell>
      <Cell label="Duration" className="sm:col-span-2" help="0 dice = instant / not timed. The sheet rolls it when used.">
        <DurationInput value={b.duration} onChange={(v) => set({ duration: v })} />
      </Cell>
      <Cell label="Targets" className="sm:col-span-2">
        <span className="flex flex-wrap items-center gap-2">
          <Select value={b.tgtMode} ariaLabel="targets" options={[["", "— not stated —"], ["self", "Self"], ["ally", "One ally"], ["creature", "One creature"], ["dice", "A number of creatures"], ["area", "An area / group"]]} onChange={(v) => set({ tgtMode: v as PbMagicBuild["tgtMode"] })} />
          {b.tgtMode === "dice" ? <SDiceInput value={b.tgtDice} ariaLabel="targets" onChange={(v) => set({ tgtDice: v })} /> : null}
          {b.tgtMode === "area" ? <input className={`${fieldCls} max-w-[260px]`} value={b.area} maxLength={80} placeholder="all who hear it" onChange={(e) => set({ area: e.target.value })} /> : null}
        </span>
      </Cell>
      <Cell label="Target tests" className="sm:col-span-2" help="The target's resist test (“any ability” = the GM picks).">
        <TestInput value={b.test} onChange={(v) => set({ test: v })} noneLabel="No resist test" />
      </Cell>
      <Cell label="Damage">
        {b.dmgText ? (
          <span className="flex flex-wrap items-center gap-2">
            <input className={`${fieldCls} max-w-[240px]`} value={b.dmgText} maxLength={60} onChange={(e) => set({ dmgText: e.target.value })} />
            <button type="button" className={smallBtn} onClick={() => set({ dmgText: "" })}>Use dice picker</button>
          </span>
        ) : <SDiceInput value={b.damage} ariaLabel="damage" onChange={(v) => set({ damage: v })} />}
        <div className="mt-2"><Toggle checked={b.ignoresArmor} onChange={(v) => set({ ignoresArmor: v })}>Ignores armor</Toggle></div>
      </Cell>
      <Cell label="Heals" help="0 dice = no healing.">
        <SDiceInput value={b.heal} ariaLabel="heal" onChange={(v) => set({ heal: v })} />
      </Cell>
      <Cell label="Extra armor" help="An extra die subtracted from damage while it lasts.">
        <ChipPicker single options={[["", "None"], ...PB_EXTRA_ARMOR.map((d) => [d, `−${d}`] as [string, string])]} value={[b.extraArmor]} onChange={(v) => set({ extraArmor: v[0] ?? "" })} />
      </Cell>
      {relic ? (
        <>
          <Cell label="Temporary HP" help="0 dice = none (the Jade Die: d8).">
            <SDiceInput value={b.tempHp} spirit={false} ariaLabel="temporary HP" onChange={(v) => set({ tempHp: v })} />
          </Cell>
          <Cell label="Uses" className="sm:col-span-2">
            <ChipPicker single options={[["", "Reusable (SPIRIT test after use)"], ["single", "Single use — then gone"], ["consumable", "Consumed (one of several)"]]}
              value={[b.singleUse ? "single" : b.consumable ? "consumable" : ""]} onChange={(v) => set({ singleUse: v[0] === "single", consumable: v[0] === "consumable" })} />
          </Cell>
        </>
      ) : null}
    </>
  );
}

export function MagicPreview({ name, m }: { name: string; m: MagicDraft }) {
  const f = composeMagic(m.build, m.kind);
  const line = magicLine(f);
  return (
    <Preview title={name || (m.kind === "relic" ? "Unnamed relic" : "Unnamed ritual")} subtitle={m.kind === "relic" ? "Ancient Relic · SPIRIT DR12 after use" : "Arcane Ritual · SPIRIT DR12 to cast"}>
      {line ? <p className="font-mono text-[13px]">{line}</p> : null}
      {m.text ? <p className="mt-2 whitespace-pre-line text-[13px] leading-relaxed">{m.text}</p> : <p className="mt-2 text-[12px] text-[var(--muted)]">Describe the effect.</p>}
      <p className="mt-2 text-[11px] text-[var(--muted)]">{m.kind === "relic" ? "Almost never works in tier 2–3 armor or with cold iron." : "Almost always fails if the caster carries cold iron or touches metal."}</p>
    </Preview>
  );
}
