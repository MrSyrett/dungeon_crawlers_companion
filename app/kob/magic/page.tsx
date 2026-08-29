import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { KOB_ITEMS } from "@/lib/data/kob-items";
import { KOB_TABLES } from "@/lib/data/kob-tables";
import { KobHeader, cardCls } from "@/components/KobRef";

export const dynamic = "force-dynamic";

// Kids on Brooms: wands, brooms, familiars, classes and the Spell Check math.
export default async function KobMagicPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const items = (kind: string) => KOB_ITEMS.filter((i) => i.book === "brooms" && i.kind === kind);
  const woods = items("wand-wood"), cores = items("wand-core"), brooms = items("broom"), familiars = items("familiar"), classes = items("class");
  const sp = KOB_TABLES.spell;
  const modTable = (title: string, rows: { name: string; mod: number; text: string }[]) => (
    <div>
      <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#d9c2ff]">{title}</div>
      <table className="mt-1 w-full text-[12px]"><tbody>
        {rows.map((r) => <tr key={r.name} className="border-t border-[var(--border)]"><td className="py-1 text-[var(--text)]">{r.name}</td><td className="py-1 font-mono text-[#d9c2ff]">+{r.mod}</td><td className="py-1 text-[var(--muted)]">{r.text}</td></tr>)}
      </tbody></table>
    </div>
  );
  const byStat = (arr: typeof woods) => {
    const m = new Map<string, string[]>();
    for (const w of arr) { const k = w.stat ?? "—"; m.set(k, [...(m.get(k) ?? []), w.name]); }
    return [...m.entries()];
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <KobHeader title="Magic" subtitle="Kids on Brooms · wands, brooms, familiars & spell checks" />
      <p className="mb-6 text-sm leading-relaxed text-[var(--muted)]">
        There are no spell lists. If it could be done with magic, you can try it: describe the spell, the GM picks the
        type of magic (a stat) and adds up a difficulty from the four tables below, then you roll that stat&rsquo;s die
        plus a d4 Magic Die and any bonuses. Failure has consequences — the GM narrates them.
      </p>

      <section className={`${cardCls} mb-4`}>
        <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#d9c2ff]">Types of magic</h2>
        <ul className="mt-2 grid gap-2 md:grid-cols-2">
          {sp.magicTypes.map((m) => <li key={m.stat} className="text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-bold uppercase tracking-[0.08em] text-[var(--text)]">{m.stat}.</span> {m.text}{m.classes ? <span className="italic"> {m.classes}</span> : null}</li>)}
        </ul>
      </section>

      <section className={`${cardCls} mb-4`}>
        <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#d9c2ff]">Spell difficulty</h2>
        <p className="mt-1 text-[12px] text-[var(--muted)]">Add one modifier from each table. The GM must tell you the difficulty before you decide to cast.</p>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {modTable("Magnitude of effect", sp.magnitude)}{modTable("Area of effect", sp.area)}{modTable("Duration", sp.duration)}{modTable("Experience", sp.experience)}
        </div>
        <div className="mt-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[#d9c2ff]">Results</div>
        <table className="mt-1 w-full text-[12px]"><tbody>
          {sp.failure.map((f) => <tr key={f.range} className="border-t border-[var(--border)]"><td className="py-1 font-mono text-[var(--text)]">{f.range}</td><td className="py-1 text-[var(--muted)]">{f.text}</td></tr>)}
        </tbody></table>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <section className={cardCls}>
          <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#d9c2ff]">Wand woods</h2>
          <p className="mt-1 text-[12px] text-[var(--muted)]">Each wood gives +1 to one type of magic.</p>
          <ul className="mt-2 text-[13px] text-[var(--text)]">{byStat(woods).map(([s, names]) => <li key={s}><span className="font-semibold">{s}:</span> {names.join(", ")}</li>)}</ul>
          <h3 className="mt-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[#d9c2ff]">Wand cores</h3>
          <ul className="mt-1 text-[13px] text-[var(--text)]">{byStat(cores).map(([s, names]) => <li key={s}><span className="font-semibold">{s}:</span> {names.join(", ")}</li>)}</ul>
        </section>
        <section className={cardCls}>
          <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#d9c2ff]">Brooms</h2>
          <p className="mt-1 text-[12px] text-[var(--muted)]">Benefits only apply while you&rsquo;re on the broom.</p>
          <ul className="mt-2 flex flex-col gap-1">{brooms.map((b) => <li key={b.name} className="text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{b.name}</span>{b.tag ? <span className="text-[10px] uppercase tracking-[0.1em]"> · {b.tag}</span> : null} — {b.benefit}</li>)}</ul>
        </section>
        <section className={cardCls}>
          <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#d9c2ff]">Familiars</h2>
          <p className="mt-1 text-[12px] text-[var(--muted)]">Small enough to carry; a one-way psychic bond; simple tasks decided narratively.</p>
          <ul className="mt-2 flex flex-wrap gap-2">{familiars.map((f) => <li key={f.name} className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-1.5 text-[13px] text-[var(--text)]" title={f.description ?? ""}>{f.name}</li>)}</ul>
        </section>
        <section className={cardCls}>
          <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#d9c2ff]">Classes</h2>
          <ul className="mt-2 flex flex-col gap-1">{classes.map((c) => <li key={c.name} className="text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{c.name}</span>{c.tag ? <span className="text-[10px] uppercase tracking-[0.1em]"> · {c.tag}</span> : null}{c.description ? ` — ${c.description}` : ""}</li>)}</ul>
        </section>
      </div>
    </div>
  );
}
