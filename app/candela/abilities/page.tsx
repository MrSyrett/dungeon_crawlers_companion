import { CO_ROLES } from "@/lib/data/candela-data";
import { RefShell, cardCls, nameCls, badge } from "@/components/CandelaRef";

export const dynamic = "force-dynamic";

export default function Page() {
  const total = CO_ROLES.reduce((n, r) => n + r.abilities.length + r.specialties.reduce((m, s) => m + s.abilities.length, 0), 0);
  return (
    <RefShell title="Abilities" subtitle="Candela Obscura · Role & Specialty" active="/candela/abilities" count={`${total} abilities · pick 1 role + 1 specialty at creation`}>
      <div className="space-y-6">
        {CO_ROLES.map((r) => (
          <div key={r.role} className={cardCls}>
            <div className="flex flex-wrap items-center gap-2">
              <span className={nameCls}>{r.role}</span>
              <span className={badge}>Role Abilities</span>
            </div>
            <ul className="mt-2 space-y-1.5">
              {r.abilities.map((a) => (
                <li key={a.name} className="text-[13px] leading-relaxed text-[var(--text)]">
                  <span className="font-semibold text-[#3fc2b0]">{a.name}.</span> {a.desc}
                </li>
              ))}
            </ul>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {r.specialties.map((sp) => (
                <div key={sp.name} className="rounded-lg border border-[var(--border)] bg-[var(--panel-2)] p-3">
                  <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--text)]">{sp.name}</p>
                  <ul className="mt-1.5 space-y-1.5">
                    {sp.abilities.map((a) => (
                      <li key={a.name} className="text-[12px] leading-relaxed text-[var(--muted)]">
                        <span className="font-semibold text-[#3fc2b0]">{a.name}.</span> {a.desc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </RefShell>
  );
}
