import { ALIEN_BESTIARY } from "@/lib/data/yze-alien-data";
import { ALIEN_ATTACKS } from "@/lib/data/yze-alien-attacks";
import { YzeHeader, SectionH, cardCls, nameCls, badge } from "@/components/YzeRef";

export const dynamic = "force-dynamic";

const GROUPS = ["Xenomorph XX121", "Neomorph", "Other Species"] as const;

export default function YzeBestiaryPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <YzeHeader title="Bestiary" subtitle="ALIEN RPG · Xenomorphs & other threats" />

      {GROUPS.map((g) => (
        <section key={g} className="mb-8">
          <SectionH>{g}</SectionH>
          <ul className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
            {ALIEN_BESTIARY.filter((c) => c.group === g).map((c) => (
              <li key={c.name} className={cardCls}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className={nameCls}>{c.name}</h3>
                  {c.stage ? <span className={badge}>{c.stage}</span> : null}
                </div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[var(--muted)]">
                  <span><b className="text-[var(--text)]">Speed</b> {c.speed}</span>
                  <span><b className="text-[var(--text)]">Health</b> {c.health}</span>
                  {c.skills !== "—" ? <span><b className="text-[var(--text)]">Skills</b> {c.skills}</span> : null}
                  <span><b className="text-[var(--text)]">Armor</b> {c.armor}</span>
                  {c.acid !== "—" ? <span><b className="text-[var(--text)]">Acid Splash</b> {c.acid}</span> : null}
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{c.notes}</p>
                {ALIEN_ATTACKS[c.name] ? (
                  <div className="mt-3">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-[var(--muted)]">Signature Attacks <span className="font-normal">(D6)</span></div>
                    <ul className="mt-1 space-y-1">
                      {ALIEN_ATTACKS[c.name].map((a, i) => (
                        <li key={i} className="text-[12px] leading-relaxed text-[var(--text)]">
                          <span className="inline-block min-w-[2.2em] font-mono text-[var(--muted)]">{a.roll}</span>
                          <b>{a.name}.</b> {a.effect}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
