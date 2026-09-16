import { ALIEN_SKILLS, ALIEN_CAREERS, ALIEN_TALENTS, ALIEN_WEAPONS, ALIEN_ARMOR } from "@/lib/data/yze-alien-data";
import { YzeHeader, cardCls, nameCls, badge } from "@/components/YzeRef";

export const dynamic = "force-dynamic";

export default function YzeAlienPage() {
  const careerTalents = ALIEN_TALENTS.filter((t) => t.career !== "General");
  const generalTalents = ALIEN_TALENTS.filter((t) => t.career === "General");
  const weaponClasses = ["Pistol", "Rifle", "Heavy", "Close Combat"];
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <YzeHeader title="ALIEN RPG" subtitle="Year Zero Engine variant · Free League · pick it at character creation" />

      <section className="mb-8 rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4">
        <p className="text-[13px] leading-relaxed text-[var(--text)]">
          ALIEN is a variant of the Year Zero Engine — choose it in the character sheet&rsquo;s
          Create wizard. It keeps the four attributes and d6 dice pools but swaps in its own twelve
          skills and three signature changes: <b className="text-[#3fd0e6]">Health = your Strength score</b>,
          <b className="text-[#3fd0e6]"> Stress replaces Resolve</b> (it counts up; you add Stress Dice
          equal to your Stress Level to every roll, and a <b>1</b> on a Stress Die forces a Panic Roll
          and blocks pushing), and characters take a <b className="text-[#3fd0e6]">career</b>, a starting
          <b className="text-[#3fd0e6]"> talent</b>, and a <b className="text-[#3fd0e6]">signature item</b>.
          Pushing a roll raises your Stress by one.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em] text-[#3fd0e6]">Skills</h2>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {ALIEN_SKILLS.map((s) => (
            <div key={s.name} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-3">
              <div className="flex items-baseline gap-2">
                <span className="text-[14px] font-bold text-[#3fd0e6]">{s.name}</span>
                <span className={badge}>{s.attr}</span>
              </div>
              <p className="mt-0.5 text-[12px] text-[var(--muted)]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em] text-[#3fd0e6]">Careers</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {ALIEN_CAREERS.map((c) => (
            <div key={c.name} className={cardCls}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className={nameCls}>{c.name}</h3>
                <span className={badge}>Key {c.key}</span>
              </div>
              <p className="mt-2 text-[12px] text-[var(--text)]"><b className="text-[var(--muted)]">Skills:</b> {c.skills.join(", ")}</p>
              <p className="mt-1 text-[12px] text-[var(--text)]"><b className="text-[var(--muted)]">Talents:</b> {c.talents.join(", ")}</p>
              <p className="mt-1 text-[12px] text-[var(--text)]"><b className="text-[var(--muted)]">Signature:</b> {c.signature.join(" · ")}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]"><b>Gear:</b> {c.gear}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em] text-[#3fd0e6]">Career talents</h2>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {careerTalents.map((t) => (
            <div key={t.name} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-3">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-[13px] font-bold text-[#3fd0e6]">{t.name}</span>
                <span className={badge}>{t.career}</span>
              </div>
              <p className="mt-0.5 text-[12px] leading-relaxed text-[var(--text)]">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em] text-[#3fd0e6]">General talents</h2>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {generalTalents.map((t) => (
            <div key={t.name} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-3">
              <span className="text-[13px] font-bold text-[#3fd0e6]">{t.name}</span>
              <p className="mt-0.5 text-[12px] leading-relaxed text-[var(--text)]">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em] text-[#3fd0e6]">Weapons</h2>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]">
                <th className="p-2">Weapon</th><th className="p-2">Class</th><th className="p-2">Bonus</th><th className="p-2">Dmg</th><th className="p-2">Range</th><th className="p-2">Wt</th><th className="p-2">Special</th>
              </tr>
            </thead>
            <tbody>
              {weaponClasses.map((cls) => ALIEN_WEAPONS.filter((w) => w.class === cls).map((w, i) => (
                <tr key={`${cls}-${w.name}-${i}`} className="border-t border-[var(--border)]">
                  <td className="p-2 font-semibold text-[#3fd0e6]">{w.name}</td>
                  <td className="p-2 text-[var(--muted)]">{w.class}</td>
                  <td className="p-2 font-mono">{w.bonus}</td>
                  <td className="p-2 font-mono">{w.damage || "—"}</td>
                  <td className="p-2">{w.range}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{w.weight}</td>
                  <td className="p-2 text-[var(--muted)]">{w.special || "—"}</td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em] text-[#3fd0e6]">Suits &amp; armor</h2>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]">
                <th className="p-2">Suit</th><th className="p-2">Armor</th><th className="p-2">Air</th><th className="p-2">Wt</th><th className="p-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {ALIEN_ARMOR.map((a) => (
                <tr key={a.name} className="border-t border-[var(--border)]">
                  <td className="p-2 font-semibold text-[#3fd0e6]">{a.name}</td>
                  <td className="p-2 font-mono">{a.rating}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{a.air}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{a.weight}</td>
                  <td className="p-2 text-[var(--muted)]">{a.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
