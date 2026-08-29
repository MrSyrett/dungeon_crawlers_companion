import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { KOB_CAPES } from "@/lib/data/kob-capes";
import { KOB_ITEMS } from "@/lib/data/kob-items";
import { KOB_TABLES } from "@/lib/data/kob-tables";
import { KobHeader, cardCls } from "@/components/KobRef";

export const dynamic = "force-dynamic";

// Kids in Capes: the six team roles and their skill trees, power categories,
// the Power Die ladder, stress and combat tables.
export default async function KobCapesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const powers = KOB_ITEMS.filter((i) => i.book === "capes" && i.kind === "power-category");
  const powerSkills = KOB_ITEMS.filter((i) => i.book === "capes" && i.kind === "power-skill");
  const T = KOB_TABLES.capes;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <KobHeader title="Capes & Powers" subtitle={`Kids in Capes · ${KOB_CAPES.length} capes · ${powers.length} power categories`} />
      <p className="mb-6 text-sm leading-relaxed text-[var(--muted)]">
        You don&rsquo;t start with powers, but you choose your eventual <strong className="text-[var(--text)]">Cape</strong> (your role on the
        team) and <strong className="text-[var(--text)]">Power</strong> at creation. When they manifest you gain a d4 Power Die,
        rolled alongside your stat die; Growth Points grow the die and unlock Cape and Power skills.
      </p>

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <section className={cardCls}>
          <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#d9c2ff]">Power categories</h2>
          <ul className="mt-2 flex flex-col gap-2">{powers.map((p) => <li key={p.name} className="text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{p.name}.</span> {p.description}</li>)}</ul>
        </section>
        <section className={cardCls}>
          <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#d9c2ff]">Power Die &amp; growth</h2>
          <table className="mt-2 w-full text-[12px]"><tbody>{T.powerDie.map((p) => <tr key={p.die} className="border-t border-[var(--border)]"><td className="py-1 font-mono text-[var(--text)]">d{p.die}</td><td className="py-1 text-[var(--muted)]">{p.cost}</td></tr>)}</tbody></table>
          <ul className="mt-3 flex flex-col gap-1">{T.growth.map((g) => <li key={g.name} className="text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{g.name}.</span> {g.text}</li>)}</ul>
          {powerSkills.length ? <ul className="mt-3 flex flex-col gap-1">{powerSkills.map((s, i) => <li key={i} className="text-[12px] leading-relaxed text-[var(--muted)]"><span className="text-[10px] uppercase tracking-[0.1em]">{s.tag}</span> <span className="font-semibold text-[var(--text)]">{s.name}</span> — {s.benefit}</li>)}</ul> : null}
        </section>
      </div>

      <h2 className="mb-3 text-[13px] font-bold uppercase tracking-[0.3em] text-[var(--muted)]">Capes</h2>
      <ul className="grid grid-cols-1 items-start gap-3 lg:grid-cols-2">
        {KOB_CAPES.map((c) => (
          <li key={c.name} className={cardCls}>
            <h3 className="text-base font-bold uppercase tracking-[0.12em] text-[#d9c2ff]">{c.name}</h3>
            <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">{c.description}</p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-[11px]">
                <thead><tr className="text-left text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]"><th className="py-1 pr-2">Skill</th><th className="py-1 pr-2">Starting</th><th className="py-1 pr-2">Intermediate</th><th className="py-1">Advanced</th></tr></thead>
                <tbody>{c.skills.map((s) => (
                  <tr key={s.name} className="border-t border-[var(--border)] align-top">
                    <td className="py-1.5 pr-2"><div className="font-semibold text-[var(--text)]">{s.name}</div><div className="text-[10px] uppercase tracking-[0.08em] text-[var(--muted)]">{s.kind}</div><div className="text-[var(--muted)]">{s.description}</div></td>
                    <td className="py-1.5 pr-2 text-[var(--muted)]">{s.tiers.starting}</td><td className="py-1.5 pr-2 text-[var(--muted)]">{s.tiers.intermediate}</td><td className="py-1.5 text-[var(--muted)]">{s.tiers.advanced}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <section className={cardCls}>
          <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#d9c2ff]">Stress</h2>
          <table className="mt-2 w-full text-[12px]"><tbody>{T.stress.map((r) => <tr key={r.range} className="border-t border-[var(--border)] align-top"><td className="py-1 font-mono text-[var(--text)]">{r.range}</td><td className="py-1 italic text-[var(--muted)]">{r.narrative}</td><td className="py-1 text-[var(--muted)]">{r.effect}</td></tr>)}</tbody></table>
          <h3 className="mt-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[#d9c2ff]">Fallout after combat</h3>
          <table className="mt-1 w-full text-[12px]"><tbody>{T.fallout.map((r) => <tr key={r.range} className="border-t border-[var(--border)] align-top"><td className="py-1 font-mono text-[var(--text)]">{r.range}</td><td className="py-1 text-[var(--muted)]">{r.text}</td></tr>)}</tbody></table>
        </section>
        <section className={cardCls}>
          <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#d9c2ff]">Combat</h2>
          <p className="mt-1 text-[12px] text-[var(--muted)]">{T.combatSequence.join(" → ")}</p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-[11px]">
              <thead><tr className="text-left text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]"><th className="py-1 pr-2">Roll − difficulty</th><th className="py-1 pr-2">Attacking</th><th className="py-1 pr-2">Take the hit</th><th className="py-1">Dodge</th></tr></thead>
              <tbody>{T.degrees.map((r) => <tr key={r.range} className="border-t border-[var(--border)] align-top"><td className="py-1 pr-2 text-[var(--text)]">{r.range}</td><td className="py-1 pr-2 text-[var(--muted)]">{r.attacking}</td><td className="py-1 pr-2 text-[var(--muted)]">{r.takeHit}</td><td className="py-1 text-[var(--muted)]">{r.dodge}</td></tr>)}</tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
