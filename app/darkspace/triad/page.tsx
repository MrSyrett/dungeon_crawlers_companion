import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DS_TRIAD } from "@/lib/data/darkspace";
import { DarkSpaceHeader, DarkSpaceNav, DataTable, cardCls, nameCls, badge } from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";

export default async function DarkSpaceTriadPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-10">
      <DarkSpaceHeader title="The Triad" subtitle="Metaphysical powers — Body · Mind · Soul" />
      <DarkSpaceNav active="The Triad" />
      <p className="mb-6 text-sm leading-relaxed text-[var(--muted)]">{DS_TRIAD.intro}</p>

      <div className="grid gap-3 md:grid-cols-3">
        {DS_TRIAD.powers.map((p) => (
          <section key={p.name} className={cardCls}>
            <div className="flex items-baseline justify-between">
              <h2 className={nameCls}>{p.name}</h2>
              <span className={badge}>{p.stat}</span>
            </div>
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
