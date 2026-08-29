import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { NIMBLE_TABLES } from "@/lib/data/nimble-tables";
import { NIMBLE_CONDITIONS } from "@/lib/data/nimble-conditions";
import { NIMBLE_SKILLS } from "@/lib/data/nimble-skills";
import { NIMBLE_STATS } from "@/lib/data/nimble-types";
import { NimbleHeader, cardCls } from "@/components/NimbleRef";

export const dynamic = "force-dynamic";

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#9fe3bd]">{children}</h2>;
}
type Row = { name?: string; title?: string; text: string };
function Dl({ rows }: { rows: Row[] }) {
  return (
    <dl className="mt-2 grid gap-x-6 gap-y-2 md:grid-cols-2">
      {rows.map((r, i) => <div key={(r.name ?? r.title ?? "") + i}><dt className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--text)]">{r.name ?? r.title}</dt><dd className="text-[12px] leading-relaxed text-[var(--muted)]">{r.text}</dd></div>)}
    </dl>
  );
}

export default async function NimbleRulesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const T = NIMBLE_TABLES;
  const boonKinds = [...new Set(T.boons.map((b) => b.kind))];
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <NimbleHeader title="Rules" subtitle="Core rules, tables & GM reference" />
      <section className={`${cardCls} mb-4`}><H>Stats & skills</H>
        <ul className="mt-2 grid gap-2 md:grid-cols-2">{NIMBLE_STATS.map((s) => <li key={s} className="text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-bold text-[var(--text)]">{s}.</span> {T.statDescriptions[s]}</li>)}</ul>
        <ul className="mt-3 grid gap-2 md:grid-cols-2">{NIMBLE_SKILLS.map((s) => <li key={s.name} className="text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{s.name} ({s.stat}).</span> {s.description}</li>)}</ul>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <table className="w-full text-[12px]"><thead><tr className="text-left text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]"><th className="py-1">Difficulty</th><th className="py-1">DC</th><th className="py-1">Example</th></tr></thead><tbody>{T.difficulties.map((d) => <tr key={d.name} className="border-t border-[var(--border)] align-top"><td className="py-1 text-[var(--text)]">{d.name}</td><td className="py-1 font-mono text-[#9fe3bd]">{d.dc}</td><td className="py-1 text-[var(--muted)]">{d.example}</td></tr>)}</tbody></table>
          <div><table className="w-full text-[12px]"><thead><tr className="text-left text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]"><th className="py-1">Stat array</th><th className="py-1">Values</th></tr></thead><tbody>{T.statArrays.map((a) => <tr key={a.name} className="border-t border-[var(--border)]"><td className="py-1 text-[var(--text)]">{a.name}</td><td className="py-1 font-mono text-[#9fe3bd]">{a.values.map((v) => (v >= 0 ? "+" : "") + v).join(", ")}</td></tr>)}</tbody></table>
          <p className="mt-2 text-[12px] text-[var(--muted)]">{T.creation.skillPointsAtL1} skill points at level 1 (+1 per level, max +{T.creation.maxSkill}); {T.creation.inventorySlotsBase}+STR inventory slots; {T.creation.maxWounds} Wounds; Speed {T.creation.speed}; {T.creation.actions} actions; {T.creation.startingGold} gp.</p></div>
        </div>
      </section>
      <section className={`${cardCls} mb-4`}><H>Playing the game</H><Dl rows={T.quickRules.filter((r) => !/^GM|monster|minion|encounter|legendary/i.test(r.title))} /></section>
      <section className={`${cardCls} mb-4`}><H>Conditions</H><Dl rows={NIMBLE_CONDITIONS} /></section>
      <section className={`${cardCls} mb-4`}><H>Sizes & languages</H>
        <ul className="mt-2 grid gap-1 md:grid-cols-2">{T.sizes.map((s) => <li key={s.name} className="text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{s.name}.</span> {s.text}</li>)}</ul>
        <ul className="mt-3 grid gap-1 md:grid-cols-2">{T.languages.map((l) => <li key={l.name} className="text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{l.name}.</span> {l.spokenBy}</li>)}</ul>
      </section>
      <section className={`${cardCls} mb-4`}><H>Resting & downtime</H><Dl rows={T.rests} /><Dl rows={T.downtime} />
        <table className="mt-3 w-full text-[12px]"><tbody>{T.lodging.map((l) => <tr key={l.name} className="border-t border-[var(--border)]"><td className="py-1 text-[var(--text)]">{l.name}</td><td className="py-1 font-mono text-[#9fe3bd]">{l.cost}</td><td className="py-1 text-[var(--muted)]">{l.text}</td></tr>)}</tbody></table>
      </section>
      <section className={`${cardCls} mb-4`}><H>For the GM: monsters & encounters</H><Dl rows={T.quickRules.filter((r) => /^GM|monster|minion|encounter|legendary/i.test(r.title))} />
        <details className="mt-3"><summary className="cursor-pointer text-[11px] font-bold uppercase tracking-[0.15em] text-[#9fe3bd]">Encounter guidelines & monster builder ({T.encounters.length})</summary><Dl rows={T.encounters} /></details>
      </section>
      <section className={`${cardCls} mb-4`}><H>Rewards & boons</H>
        {boonKinds.map((k) => <details key={k} className="mt-2"><summary className="cursor-pointer text-[11px] font-bold uppercase tracking-[0.15em] text-[#9fe3bd]">{k} ({T.boons.filter((b) => b.kind === k).length})</summary><Dl rows={T.boons.filter((b) => b.kind === k)} /></details>)}
      </section>
    </div>
  );
}
