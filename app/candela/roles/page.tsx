import { CO_ROLES } from "@/lib/data/candela-data";
import { CandelaHeader, cardCls, nameCls, badge, hbBadge, gildBadge } from "@/components/CandelaRef";

export const dynamic = "force-dynamic";

function fmt(obj: Record<string, number>): string {
  return Object.entries(obj).map(([k, v]) => `${k} ${v}`).join(" · ");
}

export default function Page() {
  const specCount = CO_ROLES.reduce((n, r) => n + r.specialties.length, 0);
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <CandelaHeader title="Roles & Specialties" subtitle="Candela Obscura · Playbooks" />
      <p className="mb-5 text-sm leading-relaxed text-[var(--muted)]">
        {CO_ROLES.length} roles · {specCount} specialties. A character is a Role and a Specialty; together
        they set your starting actions, drives, gilded action, abilities, and gear.
      </p>
      <div className="space-y-6">
        {CO_ROLES.map((r) => (
          <div key={r.role} className={cardCls}>
            <div className="flex flex-wrap items-center gap-2">
              <span className={nameCls}>{r.role}</span>
              <span className={badge}>Mastery of {r.mastery}</span>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">{r.desc}</p>

            <div className="mt-3 border-t border-[var(--border)] pt-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">Role Abilities</p>
              <ul className="mt-1 space-y-1">
                {r.abilities.map((a) => (
                  <li key={a.name} className="text-[13px] leading-relaxed text-[var(--text)]">
                    <span className="font-semibold text-[#3fc2b0]">{a.name}.</span> {a.desc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {r.specialties.map((sp) => (
                <div key={sp.name} className="rounded-lg border border-[var(--border)] bg-[var(--panel-2)] p-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-[var(--text)]">{sp.name}</span>
                    <span className={hbBadge}>{sp.primaryDrive}</span>
                    <span className={gildBadge}>Gild {sp.gilded}</span>
                  </div>
                  <p className="mt-1 text-[12px] text-[var(--muted)]">{sp.focus}</p>
                  <p className="mt-2 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Actions:</span> {fmt(sp.starting.actions)}</p>
                  <p className="text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Drives:</span> {fmt(sp.starting.drives)}</p>
                  <p className="text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Illumination:</span> {sp.illumination.join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
