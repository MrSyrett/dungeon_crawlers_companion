import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { SW_TABLES } from "@/lib/data/sw-tables";
import { SwHeader, cardCls, BookTag } from "@/components/SwRef";

export const dynamic = "force-dynamic";

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#f0c020]">{children}</h2>;
}
type Row = { name?: string; title?: string; text: string; book?: "core" | "sourcebook" | "companion" };
function Dl({ rows }: { rows: Row[] }) {
  return (
    <dl className="mt-2 grid gap-x-6 gap-y-2 md:grid-cols-2">
      {rows.map((r, i) => <div key={(r.name ?? r.title ?? "") + i}><dt className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--text)]">{r.name ?? r.title}{r.book && r.book !== "core" ? <BookTag book={r.book} /> : null}</dt><dd className="text-[12px] leading-relaxed text-[var(--muted)]">{r.text}</dd></div>)}
    </dl>
  );
}
function Sup({ label, rows }: { label: string; rows?: { name?: string; range?: string; modifier?: string; text: string }[] }) {
  if (!rows?.length) return null;
  return <details className="mt-3"><summary className="cursor-pointer text-[10px] uppercase tracking-[0.12em] text-[var(--sw)]">{label} — core rulebook version</summary><table className="mt-2 w-full text-[12px]"><tbody>{rows.map((r, i) => <tr key={i} className="border-t border-[var(--border)] align-top"><td className="py-1 pr-3 text-[var(--text)]">{r.name ?? r.range ?? ""}</td><td className="py-1 pr-3 font-mono text-[#f0c020]">{r.range && r.name ? r.range : r.modifier ?? ""}</td><td className="py-1 text-[var(--muted)]">{r.text}</td></tr>)}</tbody></table></details>;
}

export default async function SwRulesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const T = SW_TABLES;
  const core = T.quickRules.filter((r) => r.book === "core");
  const sb = T.quickRules.filter((r) => r.book === "sourcebook");
  const rc = T.quickRules.filter((r) => r.book === "companion");
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <SwHeader title="Rules" subtitle="Core rulebook & Sourcebook (1987) with the Rules Companion (1989) revisions" />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Where the Companion replaces a core table, the Companion version is shown and the original is folded underneath. Entries tagged <span className="text-[var(--sw)]">RC</span> come from the Companion, <span className="text-[var(--muted)]">SB</span> from the Sourcebook.</p>
      <section className={`${cardCls} mb-4`}><H>Attributes</H>
        <ul className="mt-2 grid gap-2 md:grid-cols-2">{T.attributes.map((a) => <li key={a.name} className="text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-bold text-[var(--text)]">{a.name}.</span> {a.description}</li>)}</ul>
        <p className="mt-3 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Creating a character.</span> {T.creation.templateNote} Attributes: {T.creation.attributeDice.toLowerCase()}. {T.creation.forcePoints} Force Point to start. {T.creation.skillPointsNote}</p>
      </section>
      <section className={`${cardCls} mb-4`}><H>Difficulty & range</H>
        <div className="mt-2 grid gap-4 md:grid-cols-2">
          <table className="w-full text-[12px]"><thead><tr className="text-left text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]"><th className="py-1">Difficulty</th><th className="py-1">Number</th><th className="py-1">Example</th></tr></thead><tbody>{T.difficulties.map((d) => <tr key={d.name} className="border-t border-[var(--border)] align-top"><td className="py-1 text-[var(--text)]">{d.name}</td><td className="py-1 font-mono text-[#f0c020]">{d.range}</td><td className="py-1 text-[var(--muted)]">{d.text}</td></tr>)}</tbody></table>
          <table className="w-full text-[12px]"><thead><tr className="text-left text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]"><th className="py-1">Range</th><th className="py-1">To hit</th><th className="py-1">Notes</th></tr></thead><tbody>{T.ranges.map((r) => <tr key={r.name} className="border-t border-[var(--border)] align-top"><td className="py-1 text-[var(--text)]">{r.name}</td><td className="py-1 font-mono text-[#f0c020]">{r.modifier}</td><td className="py-1 text-[var(--muted)]">{r.text}</td></tr>)}</tbody></table>
        </div>
        <Sup label="Difficulty" rows={T.superseded.difficulties} /><Sup label="Range" rows={T.superseded.ranges} />
      </section>
      <section className={`${cardCls} mb-4`}><H>Combat modifiers</H><Dl rows={T.combatModifiers} /><Sup label="Combat modifiers" rows={T.superseded.combatModifiers} /></section>
      <section className={`${cardCls} mb-4`}><H>Damage & wounds</H>
        <table className="mt-2 w-full text-[12px]"><thead><tr className="text-left text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]"><th className="py-1">Damage roll vs Strength roll</th><th className="py-1">Result</th></tr></thead><tbody>{T.damageResults.map((d) => <tr key={d.range} className="border-t border-[var(--border)] align-top"><td className="py-1 font-mono text-[#f0c020]">{d.range}</td><td className="py-1 text-[var(--muted)]">{d.text}</td></tr>)}</tbody></table>
        <Sup label="Damage results" rows={T.superseded.damageResults} />
        <Dl rows={T.woundLevels} />
      </section>
      <section className={`${cardCls} mb-4`}><H>Playing the game — core rulebook</H><Dl rows={core} /></section>
      <section className={`${cardCls} mb-4`}><H>Sourcebook — ships, gear & the galaxy</H><Dl rows={sb} /></section>
      <section className={`${cardCls} mb-4`}><H>Rules Companion revisions</H><Dl rows={rc} /></section>
      <section className={`${cardCls} mb-4`}><H>Advancement</H><Dl rows={T.advancement} /></section>
      <section className={`${cardCls} mb-4`}><H>Starships</H><Dl rows={T.starship} /><Sup label="Starship rules" rows={T.superseded.starship} /></section>
    </div>
  );
}
