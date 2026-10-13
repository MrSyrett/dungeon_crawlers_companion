import { TWD_ARCHETYPES } from "@/lib/data/twd-data";
import { TwdHeader, cardCls, nameCls, badge } from "@/components/TwdRef";

export const dynamic = "force-dynamic";

export default function TwdArchetypesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <TwdHeader title="Archetypes" subtitle="The Walking Dead · twelve archetypes · pick one at character creation" />
      <p className="mb-6 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
        Your archetype sets your key attribute and a key skill, offers three signature talents (pick
        one to start), and suggests an Issue and a Drive. You also choose a PC Anchor and an NPC
        Anchor — the people who keep you human.
      </p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {TWD_ARCHETYPES.map((a) => (
          <div key={a.name} className={cardCls}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className={nameCls}>{a.name}</h3>
              <span className={badge}>Key {a.key}</span>
              <span className={badge}>{a.keySkill}</span>
            </div>
            <p className="mt-2 text-[12px] text-[var(--text)]"><b className="text-[var(--muted)]">Talents:</b> {a.talents.join(", ")}</p>
            <p className="mt-1 text-[12px] text-[var(--text)]"><b className="text-[var(--muted)]">Issues:</b> {a.issues.join(" · ")}</p>
            <p className="mt-1 text-[12px] text-[var(--text)]"><b className="text-[var(--muted)]">Drives:</b> {a.drives.join(" · ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
