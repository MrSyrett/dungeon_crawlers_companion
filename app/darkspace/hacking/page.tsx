import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DS_HACKING } from "@/lib/data/darkspace";
import { DarkSpaceHeader, DataTable, cardCls, nameCls } from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";

export default async function DarkSpaceHackingPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const hk = DS_HACKING;
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <DarkSpaceHeader title="Hacking" subtitle="Breaking into networks with the Interface" />

      <section className={cardCls}>
        <p className="text-[13px] leading-relaxed text-[var(--text)]">{hk.intro}</p>
      </section>

      <section className={`${cardCls} mt-4`}>
        <h2 className={`${nameCls} mb-2`}>The Interface</h2>
        <p className="mb-3 text-[13px] leading-relaxed text-[var(--muted)]">{hk.interface.intro}</p>
        <ul className="flex flex-col gap-2">
          {hk.interface.functions.map((f) => (
            <li key={f.key} className="text-[13px] leading-relaxed text-[var(--text)]">
              <span className="font-semibold text-[#8fd6ea]">{f.name} ({f.key}).</span> <span className="text-[var(--muted)]">{f.text}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 rounded-md border border-[var(--border)] bg-[var(--panel-2)] p-2 text-center text-[12px] font-semibold tracking-[0.05em] text-[#8fd6ea]">{hk.interface.derived}</p>
      </section>

      <section className={`${cardCls} mt-4`}>
        <h2 className={`${nameCls} mb-2`}>Hacking Actions</h2>
        <p className="mb-3 text-[13px] leading-relaxed text-[var(--muted)]">{hk.actions.intro}</p>
        <DataTable head={["Action", "Function"]} rows={hk.actions.list.map((a) => [a.action, a.stat])} />
      </section>

      <section className={`${cardCls} mt-4`}>
        <h2 className={`${nameCls} mb-2`}>Hacking Dice Rolls</h2>
        <p className="mb-3 text-[13px] leading-relaxed text-[var(--muted)]">When a hacking action creates a die roll (malware damage, number of targets), the DC it beats sets the die.</p>
        <DataTable head={["Difficulty", "Die"]} rows={hk.diceRolls.map((d) => [d.dc, d.die])} />
      </section>

      <section className={`${cardCls} mt-4`}>
        <h2 className={`${nameCls} mb-2`}>Rules of Engagement</h2>
        <ul className="flex flex-col gap-2">
          {hk.rules.map((r) => (
            <li key={r.title} className="text-[13px] leading-relaxed text-[var(--text)]">
              <span className="font-semibold text-[#8fd6ea]">{r.title}.</span> <span className="text-[var(--muted)]">{r.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${cardCls} mt-4`}>
        <h2 className={`${nameCls} mb-2`}>Programs &amp; Malware</h2>
        <p className="mb-3 text-[13px] leading-relaxed text-[var(--muted)]">Programs are helpful software (defensive or utilitarian); Malware is offensive. What they look like is up to the player — these examples are here to inspire your own.</p>
        <div className="flex flex-col gap-3">
          {hk.programs.map((p) => (
            <div key={p.name} className="rounded-md border border-[var(--border)] bg-[var(--panel-2)] p-3">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-[13px] font-black uppercase tracking-[0.1em] text-[#8fd6ea]">{p.name}</h3>
                <span className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{p.kind}</span>
                {p.persistence ? <span className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Persistence</span> : null}
              </div>
              <p className="mt-1 text-[12px] italic leading-relaxed text-[var(--muted)]">{p.flavor}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-[var(--text)]"><span className="font-semibold text-[#8fd6ea]">Deploy:</span> {p.deploy} · <span className="font-semibold text-[#8fd6ea]">Effect:</span> {p.effect}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
