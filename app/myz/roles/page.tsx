import { MYZ_ROLES } from "@/lib/data/myz-data";
import { MyzHeader, cardCls, nameCls, badge } from "@/components/MyzRef";

export const dynamic = "force-dynamic";

export default function MyzRolesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <MyzHeader title="Roles" subtitle="Mutant: Year Zero · the eight roles · pick one at character creation" />
      <p className="mb-6 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
        Your role sets your key attribute (which may start at 5) and gives you a <b>specialist skill</b>
        {" "}no one else can use, plus three signature talents — pick one to start. In play your role is
        your place in the People of the Ark.
      </p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {MYZ_ROLES.map((r) => (
          <div key={r.name} className={cardCls}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className={nameCls}>{r.name}</h3>
              <span className={badge}>Key {r.key}</span>
              <span className={badge}>Specialist: {r.specialist}</span>
            </div>
            <p className="mt-2 text-[12px] text-[var(--text)]"><b className="text-[var(--muted)]">Talents:</b> {r.talents.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
