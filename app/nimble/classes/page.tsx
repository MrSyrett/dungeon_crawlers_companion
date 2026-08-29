import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { NIMBLE_CLASSES } from "@/lib/data/nimble-classes";
import { NimbleHeader, ChipRow, cardCls, nameCls, one, type RawQuery } from "@/components/NimbleRef";

export const dynamic = "force-dynamic";
const BASE = "/nimble/classes";

// One class at a time (they're long): a chip row picks the class, then the
// stat block, the full level table, the ability pools and the subclasses.
export default async function NimbleClassesPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const pick = one(raw.cls);
  const selected = NIMBLE_CLASSES.find((c) => c.name === pick) ?? null;
  const options = NIMBLE_CLASSES.map((c) => ({ key: c.name, label: c.name }));

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <NimbleHeader title="Classes" subtitle={`${NIMBLE_CLASSES.length} classes · levels 1–20`} />
      <ChipRow label="Class" base={BASE} current={{ cls: pick }} param="cls" options={options} active={pick} />
      {!selected ? (
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {NIMBLE_CLASSES.map((c) => (
            <li key={c.name} className={cardCls}>
              <a href={`${BASE}?cls=${encodeURIComponent(c.name)}`} className={nameCls}>{c.name}</a>
              <p className="mt-1 text-[12px] italic text-[var(--muted)]">{c.tagline}</p>
              <p className="mt-2 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Key:</span> {c.keyStats.join(", ")} · <span className="font-semibold text-[var(--text)]">Hit Die:</span> d{c.hitDie} · <span className="font-semibold text-[var(--text)]">HP:</span> {c.startingHp} · <span className="font-semibold text-[var(--text)]">Saves:</span> {c.saves.advantaged}+ {c.saves.disadvantaged}−</p>
              <p className="mt-1 text-[12px] text-[var(--muted)]">{c.armor} · {c.weapons}</p>
              <p className="mt-1 text-[11px] text-[var(--muted)]">Subclasses: {c.subclasses.map((s) => s.name).join(", ")}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col gap-4">
          <section className={cardCls}>
            <h2 className="text-xl font-bold uppercase tracking-[0.12em] text-[#9fe3bd]">{selected.name}</h2>
            <p className="mt-1 text-[12px] italic text-[var(--muted)]">{selected.tagline}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{selected.description}</p>
            <dl className="mt-3 grid gap-x-6 gap-y-1 text-[12px] text-[var(--muted)] md:grid-cols-2">
              <div><dt className="inline font-semibold text-[var(--text)]">Key stats:</dt> <dd className="inline">{selected.keyStats.join(", ")}</dd></div>
              <div><dt className="inline font-semibold text-[var(--text)]">Hit Die / HP:</dt> <dd className="inline">d{selected.hitDie} · {selected.startingHp}</dd></div>
              <div><dt className="inline font-semibold text-[var(--text)]">Saves:</dt> <dd className="inline">{selected.saves.advantaged} advantaged · {selected.saves.disadvantaged} disadvantaged</dd></div>
              <div><dt className="inline font-semibold text-[var(--text)]">Armor / weapons:</dt> <dd className="inline">{selected.armor} · {selected.weapons}</dd></div>
              <div className="md:col-span-2"><dt className="inline font-semibold text-[var(--text)]">Starting gear:</dt> <dd className="inline">{selected.startingGear.join(", ")}</dd></div>
              {selected.spellcasting ? <div className="md:col-span-2"><dt className="inline font-semibold text-[var(--text)]">Spellcasting:</dt> <dd className="inline">{selected.spellcasting}</dd></div> : null}
            </dl>
          </section>
          <section className={cardCls}>
            <h3 className="text-base font-bold uppercase tracking-[0.12em] text-[#9fe3bd]">Level features</h3>
            <div className="mt-2 flex flex-col">
              {selected.features.map((f, i) => (
                <div key={i} className="flex gap-3 border-t border-[var(--border)] py-1.5 text-[12px] leading-relaxed">
                  <span className="w-10 shrink-0 font-mono text-[var(--nimble)]">L{f.level}</span>
                  <span className="text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{f.name}.</span> {f.text}</span>
                </div>
              ))}
            </div>
          </section>
          {[selected.abilityPool, ...(selected.extraPools ?? [])].filter(Boolean).map((pool) => pool ? (
            <section key={pool.name} className={cardCls}>
              <h3 className="text-base font-bold uppercase tracking-[0.12em] text-[#9fe3bd]">{pool.name}</h3>
              {pool.note ? <p className="mt-1 text-[11px] italic text-[var(--muted)]">{pool.note}</p> : null}
              <ul className="mt-2 grid gap-2 md:grid-cols-2">{pool.abilities.map((a) => <li key={a.name} className="text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{a.name}.</span> {a.text}</li>)}</ul>
            </section>
          ) : null)}
          {selected.subclasses.map((s) => (
            <section key={s.name} className={cardCls}>
              <h3 className="text-base font-bold uppercase tracking-[0.12em] text-[#9fe3bd]">{s.name}{s.story ? <span className="ml-2 text-[10px] text-[var(--muted)]">story-based</span> : null}</h3>
              <p className="mt-1 text-[12px] text-[var(--muted)]">{s.description}</p>
              {s.story ? <p className="mt-1 text-[12px] italic text-[var(--muted)]">{s.story}</p> : null}
              <div className="mt-2 flex flex-col">{s.features.map((f, i) => <div key={i} className="flex gap-3 border-t border-[var(--border)] py-1.5 text-[12px] leading-relaxed"><span className="w-10 shrink-0 font-mono text-[var(--nimble)]">{f.level ? "L" + f.level : "—"}</span><span className="text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{f.name}.</span> {f.text}</span></div>)}</div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
