import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DB_PROFESSIONS, DB_HEROIC_ABILITIES, DB_TABLES, DB_WEAKNESSES, DB_MEMENTOS, DB_APPEARANCES } from "@/lib/data/db-data";
import type { DbProfession, DbKitItem } from "@/lib/data/db-types";
import { DbHeader, BackLink, RuleNote, DieTable, SectionNav, cardCls, nameCls, badge, eyebrow, sectionH, th, td, one, type RawQuery } from "@/components/DbRef";

export const dynamic = "force-dynamic";
const BASE = "/dragonbane/professions";

const itemText = (i: DbKitItem) => `${i.qty && i.qty > 1 ? `${i.qty}× ` : ""}${i.choice ? i.choice.join(" / ") : i.name ?? ""}${i.note ? ` (${i.note})` : ""}`;
const kitRoll = ["1–2", "3–4", "5–6"];

function abilityLine(name: string) {
  const a = DB_HEROIC_ABILITIES.find((x) => x.name === name);
  return a ? <a href={`/dragonbane/abilities?a=${a.id}`} className="text-[var(--sys-link)] hover:underline">{a.name}</a> : <span>{name}</span>;
}

function ProfessionDetail({ p }: { p: DbProfession }) {
  return (
    <div className={`${cardCls} border-l-4`} style={{ borderLeftColor: "var(--db)" }}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-3xl text-[var(--sys-link)]">{p.name}</h2>
        <span className={badge}>D10 {p.roll} · Key attribute {p.keyAttribute}</span>
      </div>
      <p className="mt-2 text-[14px] leading-relaxed text-[var(--muted)]">{p.text}</p>

      {p.schoolSkills ? (
        <>
          <h3 className={`${sectionH} mt-5`}>Skills by school</h3>
          <p className="mb-2 text-[12.5px] text-[var(--muted)]">Pick a school of magic: it becomes one of your trained skills (based on INT), and your profession skills come from its list.</p>
          <div className="grid gap-3 md:grid-cols-3">
            {Object.entries(p.schoolSkills).map(([school, skills]) => (
              <div key={school} className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-3">
                <p className="font-display text-lg text-[var(--text)]">{school}</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--muted)]">{skills.join(", ")}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h3 className={`${sectionH} mt-5`}>Profession skills</h3>
          <p className="text-[13px] leading-relaxed text-[var(--muted)]">{p.skills.map((s) => <a key={s} href={`/dragonbane/skills?s=${encodeURIComponent(s)}`} className="mr-2 inline-block hover:text-[var(--sys-link)] hover:underline">{s}</a>)}</p>
          <p className="mt-1 text-[12px] italic text-[var(--muted)]">Six of your trained starting skills must come from this list.</p>
        </>
      )}

      <h3 className={`${sectionH} mt-5`}>Heroic ability</h3>
      {p.mage ? (
        <p className="text-[13px] leading-relaxed text-[var(--muted)]">Mages start with no heroic ability — they get their magic instead: {p.magic?.startingSpells ?? 3} rank-{p.magic?.startingRank ?? 1} spells and {p.magic?.startingTricks ?? 3} magic tricks from {p.magic?.from ?? "their school or General Magic"}, plus a grimoire. See <a href="/dragonbane/magic" className="text-[var(--sys-link)] underline">Magic</a>.</p>
      ) : (
        <p className="text-[13px] leading-relaxed text-[var(--muted)]">{p.heroicChoice ? "Choose one: " : ""}{p.heroicAbilities.map((h, i) => <span key={h}>{i ? ", " : ""}{abilityLine(h)}</span>)}. Your starting heroic ability ignores its skill requirement.</p>
      )}

      <h3 className={`${sectionH} mt-5`}>Starting gear (D6)</h3>
      <div className="grid gap-3 md:grid-cols-3">
        {p.kits.map((k, i) => (
          <div key={i} className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-3">
            <p className="font-mono text-[11px] text-[var(--db-ink)]">{kitRoll[i]}</p>
            <ul className="mt-1 flex list-disc flex-col gap-0.5 pl-4 text-[12.5px] text-[var(--muted)] marker:text-[var(--db)]">
              {k.items.map((it, j) => <li key={j}>{itemText(it)}</li>)}
              <li>{k.food} food rations</li>
              <li>{k.silver} silver</li>
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-1 text-[12px] italic text-[var(--muted)]">Roll or pick one set. You also have simple clothes, and can spend your coins on more gear.</p>

      <h3 className={`${sectionH} mt-5`}>Nicknames (D6)</h3>
      <ol className="grid grid-cols-2 gap-x-6 gap-y-0.5 text-[13px] text-[var(--muted)] sm:grid-cols-3">
        {p.nicknames.map((n, i) => <li key={n}><span className="mr-2 font-mono text-[11px] text-[var(--db-ink)]">{i + 1}</span>{n}</li>)}
      </ol>
      <p className="mt-4 text-[12px] italic text-[var(--muted)]">Core Rules p.{p.page}.</p>
    </div>
  );
}

export default async function DbProfessionsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const pick = one(raw.p);
  const selected = pick ? DB_PROFESSIONS.find((p) => p.id === pick || p.name === pick) ?? null : null;
  if (selected) {
    return (
      <div className="mx-auto w-full max-w-4xl px-5 py-10">
        <DbHeader title="Professions" subtitle={`${selected.name} · ${selected.keyAttribute}`} />
        <BackLink href={BASE} label="All professions" />
        <ProfessionDetail p={selected} />
      </div>
    );
  }
  const T = DB_TABLES;

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <DbHeader title="Professions" subtitle={`${DB_PROFESSIONS.length} professions · roll D10 or choose`} />
      <SectionNav items={[{ id: "professions", label: "Professions" }, { id: "creation", label: "Creating a Character" }, { id: "age", label: "Age & Attributes" }, { id: "extras", label: "Weakness, Memento, Appearance" }]} />

      <section id="professions" className="scroll-mt-20">
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {DB_PROFESSIONS.map((p) => (
            <li key={p.id} className={cardCls}>
              <a href={`${BASE}?p=${p.id}`} className="group block">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`${nameCls} group-hover:underline`}>{p.name}</h3>
                  <span className="flex gap-1.5"><span className={badge}>{p.keyAttribute}</span><span className={badge}>D10 {p.roll}</span></span>
                </div>
                <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-[var(--muted)]">{p.text}</p>
                <p className="mt-2 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Heroic ability:</span> {p.mage ? "— (magic instead)" : p.heroicAbilities.join(p.heroicChoice ? " / " : ", ")}</p>
                <p className="text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Skills:</span> {p.schoolSkills ? "by school of magic" : p.skills.join(", ")}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="creation" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Creating a character</h2>
        <ol className="grid list-decimal gap-x-8 gap-y-0.5 pl-5 text-[13px] text-[var(--muted)] marker:text-[var(--db-ink)] md:grid-cols-2">
          {T.creationSteps.map((s) => <li key={s}>{s}</li>)}
        </ol>
      </section>

      <section id="age" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Age</h2>
        <table className="w-full border-collapse">
          <thead><tr><th className={th}>D6</th><th className={th}>Age</th><th className={th}>Trained skills</th><th className={th}>Attributes</th></tr></thead>
          <tbody>
            {T.ages.map((a) => (
              <tr key={a.id}>
                <td className={td}>{a.roll[0] === a.roll[1] ? a.roll[0] : `${a.roll[0]}–${a.roll[1]}`}</td>
                <td className={td}>{a.name}</td>
                <td className={td}>{a.trainedSkills} ({a.professionSkills} from profession + {a.freeSkills} free)</td>
                <td className={td}>{Object.entries(a.mods as Record<string, number>).map(([k, v]) => `${k} ${v > 0 ? "+" : ""}${v}`).join(", ") || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <RuleNote title="Attributes">
          <p>Roll {T.attributeRoll.dice} and drop the lowest die for each attribute (3–18), assigning each score as you roll it; once all six are placed you may swap two. Then apply your age, up to a maximum of {T.attributeMax}. HP equals CON and WP equals WIL. Each skill&apos;s base chance comes from its attribute, and a trained skill starts at twice its base chance.</p>
        </RuleNote>
        <div className="grid gap-4 md:grid-cols-2">
          <table className="w-full border-collapse">
            <thead><tr><th className={th}>Attribute</th><th className={th}>Base chance</th></tr></thead>
            <tbody>{T.baseChance.map((r) => <tr key={r.min}><td className={td}>{r.min}–{r.max}</td><td className={td}>{r.value}</td></tr>)}</tbody>
          </table>
          <table className="w-full border-collapse">
            <thead><tr><th className={th}>STR / AGL</th><th className={th}>Damage bonus</th></tr></thead>
            <tbody>{T.damageBonus.map((r) => <tr key={r.min}><td className={td}>{r.max >= 99 ? `${r.min}+` : r.min === 1 ? `≤${r.max}` : `${r.min}–${r.max}`}</td><td className={td}>{r.value ? `+${r.value}` : "—"}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section id="extras" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Weakness, memento &amp; appearance</h2>
        <p className={`${eyebrow} mb-3`}>Optional — roll D20 or choose</p>
        <div className="grid gap-6 md:grid-cols-3">
          <DieTable title="Weakness" die="D20" note="Playing to it earns an extra advancement mark; clearly acting against it earns two and overcomes it." rows={DB_WEAKNESSES} />
          <DieTable title="Memento" die="D20" note="A tiny keepsake: once per session it recovers an extra condition during a stretch rest." rows={DB_MEMENTOS} />
          <DieTable title="Appearance" die="D20" rows={DB_APPEARANCES} />
        </div>
      </section>
    </div>
  );
}
