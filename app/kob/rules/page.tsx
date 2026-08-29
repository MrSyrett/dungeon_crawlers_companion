import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { KOB_BOOKS } from "@/lib/data/kob-books";
import { KOB_TABLES } from "@/lib/data/kob-tables";
import { KOB_ITEMS } from "@/lib/data/kob-items";
import { KOB_STATS } from "@/lib/data/kob-types";
import { KobHeader, cardCls, chipBase, chipOff } from "@/components/KobRef";

export const dynamic = "force-dynamic";

// The shared engine on one page, then each book's own rule tweaks and lists.
export default async function KobRulesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const T = KOB_TABLES;
  const core = T.quickRules.filter((r) => r.book === null);
  const bikeColors = KOB_ITEMS.filter((i) => i.book === "bikes" && i.kind === "bike-color");
  const bikeAcc = KOB_ITEMS.filter((i) => i.book === "bikes" && i.kind === "bike-accessory");
  const aspects = KOB_ITEMS.filter((i) => i.book === "bikes" && i.kind === "aspect");

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <KobHeader title="Rules" subtitle="One engine · three books" />
      <p className="mb-6 text-sm leading-relaxed text-[var(--muted)]">
        Kids on Bikes, Kids on Brooms and Kids in Capes share one rules engine: six stats rated by die size, Tropes,
        Strengths and Flaws, Adversity Tokens and Lucky Breaks. Each book adds a genre layer — magic and school life,
        or powers and superhero combat.
      </p>

      <section className={`${cardCls} mb-4`}>
        <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#d9c2ff]">Stats &amp; dice</h2>
        <ul className="mt-2 grid gap-2 md:grid-cols-2">
          {KOB_STATS.map((s) => <li key={s} className="text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-bold uppercase tracking-[0.08em] text-[var(--text)]">{s}.</span> {T.statDescriptions[s].text} <span className="italic">{T.statDescriptions[s].verbs.join(", ")}</span></li>)}
        </ul>
        <table className="mt-3 w-full text-[12px]"><tbody>{T.dice.map((d) => <tr key={d.die} className="border-t border-[var(--border)]"><td className="py-1 font-mono text-[#d9c2ff]">d{d.die}</td><td className="py-1 font-semibold text-[var(--text)]">{d.label}</td><td className="py-1 text-[var(--muted)]">{d.text}</td></tr>)}</tbody></table>
      </section>

      <section className={`${cardCls} mb-4`}>
        <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#d9c2ff]">Checks, tokens &amp; lucky breaks</h2>
        <dl className="mt-3 grid gap-x-6 gap-y-3 md:grid-cols-2">
          {core.map((r) => <div key={r.title}><dt className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--text)]">{r.title}</dt><dd className="mt-0.5 text-[12px] leading-relaxed text-[var(--muted)]">{r.text}</dd></div>)}
        </dl>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <table className="w-full text-[12px]"><thead><tr className="text-left text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]"><th className="py-1">Difficulty</th><th className="py-1">Meaning</th><th className="py-1">Examples</th></tr></thead><tbody>{T.difficulties.map((d) => <tr key={d.range} className="border-t border-[var(--border)] align-top"><td className="py-1 font-mono text-[#d9c2ff]">{d.range}</td><td className="py-1 text-[var(--text)]">{d.text}</td><td className="py-1 text-[var(--muted)]">{d.examples}</td></tr>)}</tbody></table>
          <table className="w-full text-[12px]"><thead><tr className="text-left text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]"><th className="py-1">Adversity Tokens</th><th className="py-1"></th></tr></thead><tbody>{T.adversity.map((a) => <tr key={a.name} className="border-t border-[var(--border)] align-top"><td className="py-1 text-[var(--text)]">{a.name}</td><td className="py-1 text-[var(--muted)]">{a.text}</td></tr>)}</tbody></table>
        </div>
      </section>

      {KOB_BOOKS.map((b) => {
        const rules = T.quickRules.filter((r) => r.book === b.key);
        return (
          <section key={b.key} className={`${cardCls} mb-4`}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="text-lg font-bold uppercase tracking-[0.12em] text-[#d9c2ff]">{b.name}</h2>
              <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{b.tagline}</span>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{b.blurb}</p>
            <ul className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{b.ageGroups.map((a) => <li key={a.name}><span className="font-semibold text-[var(--text)]">{a.name}{a.range ? ` (${a.range})` : ""}:</span> +1 {a.statBonus.join(" & ")} · free {a.freeStrength}{a.notes ? ` · ${a.notes}` : ""}</li>)}</ul>
            <ul className="mt-3 flex flex-col gap-1">{b.rules.map((r, i) => <li key={i} className="flex gap-2 text-[12px] leading-relaxed text-[var(--muted)]"><span className="mt-[2px] shrink-0 text-[var(--kob)]">▸</span><span>{r}</span></li>)}</ul>
            {rules.length ? <dl className="mt-3 grid gap-x-6 gap-y-2 md:grid-cols-2">{rules.map((r) => <div key={r.title}><dt className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--text)]">{r.title}</dt><dd className="text-[12px] leading-relaxed text-[var(--muted)]">{r.text}</dd></div>)}</dl> : null}
            {b.key === "bikes" ? (
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div><div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#d9c2ff]">Bike colours</div><ul className="mt-1 text-[12px] text-[var(--muted)]">{bikeColors.map((c) => <li key={c.name}><span className="font-semibold text-[var(--text)]">{c.name}:</span> {c.benefit}</li>)}</ul></div>
                <div><div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#d9c2ff]">Accessories</div><ul className="mt-1 text-[12px] text-[var(--muted)]">{bikeAcc.map((c) => <li key={c.name}><span className="font-semibold text-[var(--text)]">{c.name}:</span> {c.benefit}</li>)}</ul></div>
              </div>
            ) : null}
            {b.key === "bikes" && aspects.length ? <p className="mt-3 text-[12px] text-[var(--muted)]">{aspects.length} Powered Character Aspects are curated in the data layer (Appendix K) for a future Powered Character card.</p> : null}
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Link href={`/kob/tropes?book=${b.key}`} className={`${chipBase} ${chipOff}`}>Tropes</Link>
              <Link href={`/kob/strengths?book=${b.key}`} className={`${chipBase} ${chipOff}`}>Strengths &amp; Flaws</Link>
              <Link href={`/kob/questions?book=${b.key}`} className={`${chipBase} ${chipOff}`}>Questions</Link>
              {b.key === "brooms" ? <Link href="/kob/magic" className={`${chipBase} ${chipOff}`}>Magic</Link> : null}
              {b.key === "capes" ? <Link href="/kob/capes" className={`${chipBase} ${chipOff}`}>Capes &amp; Powers</Link> : null}
            </div>
          </section>
        );
      })}
    </div>
  );
}
