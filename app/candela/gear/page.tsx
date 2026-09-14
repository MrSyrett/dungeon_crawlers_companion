import { CO_GEAR, CO_ROLES, CO_MARKS } from "@/lib/data/candela-data";
import { RefShell, cardCls, nameCls, badge, accentBadge } from "@/components/CandelaRef";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <RefShell title="Gear & Harm" subtitle="Candela Obscura · Equipment" active="/candela/gear" count="3 gear slots per assignment">
      <p className="mb-5 text-[13px] leading-relaxed text-[var(--muted)]">
        Gear stays narrative. Each investigator has up to three gear slots per assignment, declared as
        needed rather than chosen in advance. Standard-issue gear is available to any member; each
        specialty also carries its own personalized equipment.
      </p>

      <div className={cardCls}>
        <div className="flex flex-wrap items-center gap-2">
          <span className={nameCls}>Standard Candela Gear</span>
          <span className={badge}>Any member</span>
        </div>
        <ul className="mt-2 space-y-1.5">
          {CO_GEAR.map((g) => (
            <li key={g.name} className="text-[13px] leading-relaxed text-[var(--text)]">
              <span className="font-semibold text-[#3fc2b0]">{g.name}.</span> {g.desc}
            </li>
          ))}
        </ul>
      </div>

      <div className={`${cardCls} mt-4`}>
        <span className={nameCls}>Specialty Gear (examples)</span>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {CO_ROLES.flatMap((r) => r.specialties).map((sp) => (
            <p key={sp.name} className="text-[12px] text-[var(--muted)]">
              <span className="font-semibold text-[var(--text)]">{sp.name}:</span> {sp.gear.join(", ")}
            </p>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-[var(--muted)]">Tailor gear with your GM to fit your character and the investigation.</p>
      </div>

      <div className={`${cardCls} mt-4`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className={nameCls}>Marks &amp; Scars</span>
          <span className={accentBadge}>3 marks → scar</span>
        </div>
        <ul className="mt-2 space-y-1.5">
          {CO_MARKS.map((m) => (
            <li key={m.name} className="text-[13px] leading-relaxed text-[var(--text)]">
              <span className="font-semibold text-[#3fc2b0]">{m.name}.</span> {m.desc}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[12px] text-[var(--muted)]">
          A category holds 3 marks; a 4th drops you incapacitated and becomes a scar — clear the track,
          note the scar, and shift one action point. Some gear and abilities soak marks.
        </p>
      </div>
    </RefShell>
  );
}
