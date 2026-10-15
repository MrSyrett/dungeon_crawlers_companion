import { TWD_NPCS, TWD_ANIMALS } from "@/lib/data/twd-bestiary";
import { TwdHeader, ModeRow, SectionH, cardCls, nameCls, badge, one, type RawQuery } from "@/components/TwdRef";

export const dynamic = "force-dynamic";

const tableWrap = "overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--panel)]";
const thRow = "bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]";
const BASE = "/twd/npcs";

function Grid({ list }: { list: (typeof TWD_NPCS) }) {
  return (
    <ul className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
      {list.map((n, i) => (
        <li key={`${n.name}-${i}`} className={cardCls}>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className={nameCls}>{n.name}</h3>
            {n.role ? <span className={badge}>{n.role}</span> : null}
            {n.roll ? <span className="font-mono text-[11px] text-[var(--muted)]">D66 {n.roll}</span> : null}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[var(--muted)]">
            {n.expert.length ? <span><b className="text-[var(--text)]">Expert</b> {n.expert.join(", ")} <span className="opacity-70">(8 dice)</span></span> : null}
            {n.trained.length ? <span><b className="text-[var(--text)]">Trained</b> {n.trained.join(", ")} <span className="opacity-70">(5 dice)</span></span> : null}
          </div>
          {n.issue ? <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]"><b>Issue.</b> {n.issue}</p> : null}
          {n.secretIssue ? <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]"><b className="text-[var(--text)]">Secret.</b> {n.secretIssue}</p> : null}
          {n.gear ? <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]"><b className="text-[var(--text)]">Gear.</b> {n.gear}</p> : null}
        </li>
      ))}
    </ul>
  );
}

export default async function Page({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const raw = await searchParams;
  const mode = ["factions", "survivors", "animals"].includes(one(raw.mode)) ? one(raw.mode) : "encounters";

  const encounters = TWD_NPCS.filter((n) => n.category === "Encounter");
  const factions = TWD_NPCS.filter((n) => n.category === "Faction");
  const survivors = TWD_NPCS.filter((n) => n.category === "Survivor");
  const factionGroups = [...new Set(factions.map((n) => n.group))];
  const survivorGroups = [...new Set(survivors.map((n) => n.group))];

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <TwdHeader title="NPCs & Threats" subtitle="The Walking Dead · survivors, antagonists & animals" />
      <p className="mb-5 max-w-[72ch] text-[13px] leading-relaxed text-[var(--muted)]">
        People are the real danger. NPCs have no attributes or skill levels — just a dice pool: a base
        of <b className="text-[var(--text)]">4 dice</b>, <b className="text-[var(--text)]">5</b> for a skill
        they are <b className="text-[var(--sys-link)]">Trained</b> in, and <b className="text-[var(--text)]">8</b> for
        one they are an <b className="text-[var(--sys-link)]">Expert</b> in. They have 3 Health, never push, and
        never take stress. For the walkers themselves, see <b className="text-[var(--text)]">The Dead</b>.
      </p>
      <ModeRow base={BASE} current={{}} param="mode" active={mode} options={[
        { key: "encounters", label: `Encounters (${encounters.length})` },
        { key: "factions", label: "Factions" },
        { key: "survivors", label: "Survivors" },
        { key: "animals", label: `Animals (${TWD_ANIMALS.length})` },
      ]} />

      {mode === "encounters" && (
        <section>
          <p className="mb-3 max-w-[72ch] text-[12px] text-[var(--muted)]">Roll D66 (or pick) for a stranger the group runs into.</p>
          <Grid list={encounters} />
        </section>
      )}

      {mode === "factions" && (
        <section>
          {factionGroups.map((g) => (
            <div key={g} className="mb-7">
              <SectionH>{g}</SectionH>
              <Grid list={factions.filter((n) => n.group === g)} />
            </div>
          ))}
        </section>
      )}

      {mode === "survivors" && (
        <section>
          <p className="mb-3 max-w-[72ch] text-[12px] text-[var(--muted)]">Roll D6 for a ready-made starting group of five survivors.</p>
          {survivorGroups.map((g) => (
            <div key={g} className="mb-7">
              <SectionH>{g}</SectionH>
              <Grid list={survivors.filter((n) => n.group === g)} />
            </div>
          ))}
        </section>
      )}

      {mode === "animals" && (
        <section>
          <p className="mb-3 max-w-[72ch] text-[12px] text-[var(--muted)]">
            Animals are the only non-human threats with a stat line. Attack Dice is the pool they roll; Damage is
            dealt per hit; Health works like a PC&rsquo;s.
          </p>
          <div className={tableWrap}>
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className={thRow}><th className="p-2">Animal</th><th className="p-2">Attack Dice</th><th className="p-2">Damage</th><th className="p-2">Health</th><th className="p-2">Notes</th></tr>
              </thead>
              <tbody>
                {TWD_ANIMALS.map((a) => (
                  <tr key={a.name} className="border-t border-[var(--border)]">
                    <td className="p-2 font-semibold text-[var(--sys-link)]">{a.name}</td>
                    <td className="p-2 font-mono">{a.attackDice}</td>
                    <td className="p-2 font-mono">{a.damage}</td>
                    <td className="p-2 font-mono">{a.health}</td>
                    <td className="p-2 text-[var(--muted)]">{a.note || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
