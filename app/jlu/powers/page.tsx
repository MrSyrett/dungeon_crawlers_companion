import { JLU_POWERS } from "@/lib/data/jlu-powers";
import { JluHeader, TabRow, cardCls, nameCls, catBadge, SectionH } from "@/components/JluRef";

export const dynamic = "force-dynamic";

const CATS = ["Superpower", "Martial Training", "Technology", "Kit Power"] as const;

export default function JluPowersPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <JluHeader title="Powers" subtitle="Justice League Unlimited · Quickstart · Grades 1–2" />
      <TabRow active="/jlu/powers" />
      <p className="mb-2 max-w-[70ch] text-[13px] leading-relaxed text-[var(--muted)]">
        Each Power costs PAX per Grade (double if bought outside your Origin&rsquo;s Power Kit; Humans
        cannot buy outside their kit). A Grade grants every ability listed at that Grade and below.
        Abilities note their Activation and Resolve Cost; Passive abilities are always on.
      </p>

      {CATS.map((cat) => {
        const list = JLU_POWERS.filter((p) => p.category === cat);
        if (!list.length) return null;
        return (
          <section key={cat}>
            <SectionH>{cat === "Kit Power" ? "Kit Powers (referenced, not fully detailed)" : cat}</SectionH>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {list.map((p) => (
                <div key={p.name} className={cardCls}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className={nameCls}>{p.name}</h3>
                    <span className="flex items-center gap-1.5">
                      {p.paxPerGrade ? <span className={catBadge}>{p.paxPerGrade} PAX / Grade</span> : null}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-[var(--text)]">{p.summary}</p>
                  {p.chooseElement ? <p className="mt-1 text-[12px] italic text-[var(--muted)]">Choose element: {p.chooseElement}</p> : null}
                  {p.damageAttr ? <p className="mt-1 text-[12px] italic text-[var(--muted)]">Damage: {p.damageAttr}.</p> : null}
                  {(p.grades || []).map((g) => (
                    <div key={g.grade} className="mt-2">
                      <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--jlu)]">
                        Grade {g.grade}{g.activationCost ? ` · Activation ${g.activationCost}` : ""}
                      </div>
                      <ul className="mt-1 space-y-1.5">
                        {(g.abilities || []).map((a) => {
                          const meta = [a.passive ? "Passive" : "", a.activation || "", a.cost ? `Cost ${a.cost}` : ""].filter(Boolean).join(" · ");
                          return (
                            <li key={a.name} className="text-[12.5px] leading-relaxed">
                              <span className="font-semibold text-[#5b8dfb]">{a.name}</span>
                              {meta ? <span className="ml-1 text-[10px] uppercase tracking-[0.05em] text-[var(--muted)]">{meta}</span> : null}
                              <br />
                              <span className="text-[var(--text)]">{a.text}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                  {p.note ? <p className="mt-2 text-[11px] leading-relaxed text-[var(--muted)]">{p.note}</p> : null}
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
