import { MYZ_BESTIARY, MYZ_FACTIONS, MYZ_NPCS, MYZ_PHENOMENA } from "@/lib/data/myz-data";
import { MyzHeader, SectionH, cardCls, nameCls, badge } from "@/components/MyzRef";

export const dynamic = "force-dynamic";

const attrLine = (f: { str: number | null; agi: number | null; wit: number | null; emp: number | null }) =>
  [["STR", f.str], ["AGI", f.agi], ["WIT", f.wit], ["EMP", f.emp]]
    .filter(([, v]) => v != null)
    .map(([k, v]) => `${k} ${v}`)
    .join(" · ");

export default function MyzBestiaryPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <MyzHeader title="Bestiary" subtitle="Mutant: Year Zero · the monsters, people and hazards of the Zone" />

      <SectionH>Monsters</SectionH>
      <div className="mb-10 grid grid-cols-1 gap-3 md:grid-cols-2">
        {MYZ_BESTIARY.map((m) => (
          <div key={m.name} className={cardCls}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className={nameCls}>{m.name}</h3>
              <span className="font-mono text-[11px] text-[var(--muted)]">{m.mod}</span>
            </div>
            <p className="mt-1 font-mono text-[11px] leading-relaxed text-[var(--muted)]">{m.stats}</p>
            <p className="mt-1 text-[12px] leading-relaxed text-[var(--text)]"><b className="text-[var(--muted)]">Attack:</b> {m.attack}</p>
            <p className="mt-1 text-[12px] leading-relaxed text-[var(--text)]">{m.desc}</p>
          </div>
        ))}
      </div>

      <SectionH>Humanoid Factions</SectionH>
      <div className="mb-10 grid grid-cols-1 gap-3 md:grid-cols-2">
        {MYZ_FACTIONS.map((f) => (
          <div key={f.name} className={cardCls}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className={nameCls}>{f.name}</h3>
              <span className="font-mono text-[11px] text-[var(--muted)]">{f.mod}</span>
            </div>
            {attrLine(f) ? <p className="mt-1 font-mono text-[11px] text-[var(--muted)]">{attrLine(f)}</p> : null}
            <p className="mt-1 text-[12px] text-[var(--muted)]">
              <b className="text-[var(--text)]">Skills</b> {f.skills}
              {f.mutations && f.mutations !== "none" ? <> · <b className="text-[var(--text)]">Mutations</b> {f.mutations}{f.mp ? ` (${f.mp} MP)` : ""}</> : null}
            </p>
            <p className="mt-1 text-[12px] text-[var(--text)]"><b className="text-[var(--muted)]">Weapons:</b> {f.weapons}</p>
            <p className="mt-1 text-[12px] leading-relaxed text-[var(--text)]">{f.desc}</p>
            {f.special ? <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]"><b className="text-[var(--text)]">Special.</b> {f.special}</p> : null}
          </div>
        ))}
      </div>

      <SectionH>NPC Templates</SectionH>
      <p className="mb-3 text-[12px] text-[var(--muted)]">Baseline attributes &amp; skills for a quick role-based NPC (one random mutation, 3 MP). No attribute above 5.</p>
      <div className="mb-10 overflow-x-auto rounded-lg border border-[var(--border)]">
        <table className="w-full border-collapse text-[13px]">
          <thead><tr className="bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]"><th className="p-2">Role</th><th className="p-2">STR</th><th className="p-2">AGI</th><th className="p-2">WIT</th><th className="p-2">EMP</th><th className="p-2">Skills</th></tr></thead>
          <tbody>
            {MYZ_NPCS.map((n) => (
              <tr key={n.role} className="border-t border-[var(--border)]">
                <td className="p-2 font-semibold text-[var(--sys-link)]">{n.role}</td>
                <td className="p-2 font-mono">{n.str}</td>
                <td className="p-2 font-mono">{n.agi}</td>
                <td className="p-2 font-mono">{n.wit}</td>
                <td className="p-2 font-mono">{n.emp}</td>
                <td className="p-2 text-[var(--text)]">{n.skills}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionH>Zone Phenomena</SectionH>
      <p className="mb-3 text-[12px] text-[var(--muted)]">Non-living Zone hazards — rolled on the same Threat tables as creatures.</p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {MYZ_PHENOMENA.map((p) => (
          <div key={p.name} className={cardCls}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className={nameCls}>{p.name}</h3>
              <span className="font-mono text-[11px] text-[var(--muted)]">{p.mod}</span>
            </div>
            <p className="mt-1 text-[12px] leading-relaxed text-[var(--text)]">{p.effect}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
