import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DS_TRIAD } from "@/lib/data/darkspace";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { DarkSpaceHeader, DataTable, cardCls, nameCls, badge, hbBadge } from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";

const s = (v: unknown): string => (typeof v === "string" ? v : v == null ? "" : String(v));

export default async function DarkSpaceTriadPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "ds-triad" }),
    ownHomebrew(user.id, "ds-triad"),
    userCampaigns(user.id),
  ]);
  const powers = [
    ...DS_TRIAD.powers.map((p) => ({ name: p.name, stat: p.stat, text: p.text, homebrew: false })),
    ...hbVisible.map((h) => ({ name: h.name, stat: s((h.data as Record<string, unknown>).stat), text: s((h.data as Record<string, unknown>).text), homebrew: true })),
  ];

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-10">
      <DarkSpaceHeader title="The Triad" subtitle="Metaphysical powers — Body · Mind · Soul" />
      <p className="mb-6 text-sm leading-relaxed text-[var(--muted)]">{DS_TRIAD.intro}</p>
      <div className="mb-6"><HomebrewEditor kind="ds-triad" campaigns={campaigns} initial={hbOwn} /></div>

      <div className="grid gap-3 md:grid-cols-3">
        {powers.map((p, i) => (
          <section key={`${p.name}-${i}`} className={cardCls}>
            <div className="flex items-baseline justify-between gap-2">
              <h2 className={nameCls}>{p.name}</h2>
              {p.homebrew ? <span className={hbBadge}>HB</span> : <span className={badge}>{p.stat}</span>}
            </div>
            {p.homebrew ? <div className="mt-1"><span className={badge}>{p.stat}</span></div> : null}
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{p.text}</p>
          </section>
        ))}
      </div>

      <section className={`${cardCls} mt-6`}>
        <h2 className="mb-2 text-base font-bold uppercase tracking-[0.12em] text-[#8fd6ea]">Feat Difficulty</h2>
        <DataTable head={["Difficulty", "DC", "Die"]} rows={DS_TRIAD.feats.map((f) => [f.diff, f.dc, f.die])} />
        <p className="mt-3 text-[12px] leading-relaxed text-[var(--muted)]">{DS_TRIAD.notes}</p>
      </section>
    </div>
  );
}
