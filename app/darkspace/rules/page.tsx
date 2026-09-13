import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DS_QUICK_RULES, DS_CREDITS, DS_CITIZEN_GEAR, DS_SPACERS_KIT, DS_TERMS } from "@/lib/data/darkspace";
import { DarkSpaceHeader, DarkSpaceNav, cardCls, nameCls } from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";

export default async function DarkSpaceRulesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const termPairs = Object.entries(DS_TERMS);
  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-10">
      <DarkSpaceHeader title="Rules" subtitle="DarkSpace quick reference" />
      <DarkSpaceNav active="Rules" />

      <section className={cardCls}>
        <h2 className={`${nameCls} mb-2`}>Quick Rules</h2>
        <div className="flex flex-col gap-3">
          {DS_QUICK_RULES.map((r) => (
            <div key={r.title}>
              <h3 className="text-[12px] font-black uppercase tracking-[0.1em] text-[#8fd6ea]">{r.title}</h3>
              <p className="mt-0.5 text-[13px] leading-relaxed text-[var(--text)]">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${cardCls} mt-4`}>
        <h2 className={`${nameCls} mb-2`}>Starting a Spacer</h2>
        <p className="text-[13px] leading-relaxed text-[var(--text)]">{DS_CREDITS.note}</p>
        <h3 className="mt-3 text-[11px] font-black uppercase tracking-[0.1em] text-[#8fd6ea]">Citizen Starting Gear (d12)</h3>
        <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">{DS_CITIZEN_GEAR.join(" · ")}</p>
        <h3 className="mt-3 text-[11px] font-black uppercase tracking-[0.1em] text-[#8fd6ea]">Spacer&rsquo;s Kit</h3>
        <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">{DS_SPACERS_KIT.note} Contains: {DS_SPACERS_KIT.items.join(", ")}.</p>
      </section>

      <section className={`${cardCls} mt-4`}>
        <h2 className={`${nameCls} mb-2`}>Terminology</h2>
        <p className="mb-2 text-[12px] text-[var(--muted)]">DarkSpace is 100% compatible with Shadowdark — only some terms are renamed.</p>
        <ul className="grid gap-1 md:grid-cols-2">
          {termPairs.map(([sd, ds]) => (
            <li key={sd} className="text-[12px] text-[var(--text)]"><span className="capitalize text-[var(--muted)]">{sd}</span> → <span className="font-semibold text-[#8fd6ea]">{ds}</span></li>
          ))}
        </ul>
      </section>
    </div>
  );
}
