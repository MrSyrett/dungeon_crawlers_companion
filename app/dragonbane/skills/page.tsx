import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DB_SKILLS, DB_ATTRIBUTES, DB_CONDITIONS, DB_TABLES, DB_ADVANCEMENT, DB_PROFESSIONS } from "@/lib/data/db-data";
import type { DbSkill } from "@/lib/data/db-types";
import { DbHeader, ChipRow, SearchForm, CountLine, EmptyState, BackLink, SectionNav, RuleNote, Bullets, cardCls, nameCls, badge, eyebrow, sectionH, th, td, one, type RawQuery } from "@/components/DbRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/dragonbane/skills";
const TYPE_LABEL: Record<string, string> = { general: "General", weapon: "Weapon", secondary: "Magic school" };

function professionsWith(skill: string): string[] {
  return DB_PROFESSIONS.filter((p) => p.skills.includes(skill) || Object.values(p.schoolSkills ?? {}).some((l) => l.includes(skill))).map((p) => p.name);
}

export default async function DbSkillsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const pick = one(raw.s);
  const selected: DbSkill | null = pick ? DB_SKILLS.find((s) => s.id === pick || s.name === pick) ?? null : null;
  if (selected) {
    const profs = professionsWith(selected.name);
    const attr = DB_ATTRIBUTES.find((a) => a.id === selected.attribute);
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <DbHeader title="Skills" subtitle={`${selected.name} · ${selected.attribute}`} />
        <BackLink href={BASE} label="All skills" />
        <div className={`${cardCls} border-l-4`} style={{ borderLeftColor: "var(--db)" }}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h2 className="text-3xl text-[var(--sys-link)]">{selected.name}</h2>
            <span className="flex gap-1.5"><span className={badge}>{selected.attribute}</span><span className={badge}>{TYPE_LABEL[selected.type]}</span></span>
          </div>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--muted)]">{selected.text}</p>
          <dl className="mt-4 flex flex-col gap-1 text-[13px] text-[var(--muted)]">
            <div><dt className="inline font-semibold text-[var(--text)]">Attribute:</dt> <dd className="inline">{attr?.name ?? selected.attribute} — a condition on {attr?.condition ?? "it"} gives a bane on this skill.</dd></div>
            <div><dt className="inline font-semibold text-[var(--text)]">Base chance:</dt> <dd className="inline">{selected.type === "secondary" ? "none unless trained (a trained school starts at twice your INT base chance)" : "from the attribute (3–7); twice that when trained"}</dd></div>
            {profs.length ? <div><dt className="inline font-semibold text-[var(--text)]">Profession skill for:</dt> <dd className="inline">{profs.join(", ")}</dd></div> : null}
          </dl>
          <p className="mt-4 text-[12px] italic text-[var(--muted)]">Core Rules p.{selected.page}.</p>
        </div>
      </div>
    );
  }

  const q = one(raw.q).trim().toLowerCase();
  const attrs = DB_ATTRIBUTES.map((a) => a.id);
  const attr = (attrs as string[]).includes(one(raw.attr)) ? one(raw.attr) : "";
  const types = ["general", "weapon", "secondary"];
  const type = types.includes(one(raw.type)) ? one(raw.type) : "";
  const current = { q: one(raw.q), attr, type };
  const facets = (s: DbSkill) => ({ attr: s.attribute, type: s.type });
  const show = (s: DbSkill) => facetMatch(facets(s), current) && (!q || s.name.toLowerCase().includes(q) || s.text.toLowerCase().includes(q));
  const list = DB_SKILLS.slice().sort((a, b) => types.indexOf(a.type) - types.indexOf(b.type) || a.name.localeCompare(b.name));
  const shown = list.filter(show).length;
  const A = DB_ADVANCEMENT;

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <DbHeader title="Skills" subtitle={`${DB_SKILLS.filter((s) => s.type !== "secondary").length} core skills · 3 schools of magic`} />
      <SectionNav items={[{ id: "skills", label: "Skills" }, { id: "rolls", label: "Rolling Dice" }, { id: "conditions", label: "Conditions" }, { id: "advancement", label: "Advancement" }]} />
      <RuleNote title="Skill rolls">
        <p>Roll a D20: equal to or under your skill level succeeds. A 1 is a <span className="text-[var(--text)]">Dragon</span>, an especially good result; a 20 is a <span className="text-[var(--text)]">Demon</span>, which always fails and can&apos;t be pushed. When no skill fits, the GM may call for a roll against an attribute instead. NPCs use level 5 for any skill their stat block doesn&apos;t list.</p>
      </RuleNote>

      <section id="skills" className="scroll-mt-20">
        <InstantFilter>
          <SearchForm base={BASE} q={one(raw.q)} placeholder="Search skills…" hidden={{ attr, type }} />
          <ChipRow label="Type" base={BASE} current={current} param="type" options={types.map((t) => ({ key: t, label: TYPE_LABEL[t] }))} active={type} />
          <ChipRow label="Attribute" base={BASE} current={current} param="attr" options={attrs.map((a) => ({ key: a, label: a }))} active={attr} />
          <CountLine count={shown} noun="skill" base={BASE} filtered={!!(q || attr || type)} />
          <EmptyState noun="skill" base={BASE} hidden={shown > 0} />
          <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2 lg:grid-cols-3">
            {list.map((s) => (
              <li key={s.id} className={cardCls} hidden={!show(s)} data-f={facetAttr(facets(s))}>
                <a href={`${BASE}?s=${s.id}`} className="group block">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`${nameCls} group-hover:underline`}>{s.name}</h3>
                    <span className={badge}>{s.attribute}</span>
                  </div>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--muted)]">{s.text}</p>
                </a>
              </li>
            ))}
          </ul>
        </InstantFilter>
      </section>

      <section id="rolls" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Rolling dice</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className={cardCls}>
            <p className={eyebrow}>Boons &amp; banes</p>
            <Bullets className="mt-1" items={[
              DB_TABLES.rolls.boon, DB_TABLES.rolls.bane,
              "Each extra boon or bane adds another D20; boons and banes cancel one for one.",
              "One helper, declared before the roll, gives a boon. Helping in combat uses the helper's action.",
            ]} />
          </div>
          <div className={cardCls}>
            <p className={eyebrow}>Pushing &amp; opposed rolls</p>
            <Bullets className="mt-1" items={[
              "Push (optional rule): re-roll a failed roll that wasn't a Demon, then take a condition you don't already have and can explain.",
              "With all six conditions you can no longer push. NPCs and monsters never push.",
              "Opposed roll: if you fail you lose; if you succeed and they fail you win; if both succeed, the lower result wins (ties go to you).",
              "Only one try per goal outside combat — change the approach, wait for new circumstances, or let someone else try.",
            ]} />
          </div>
        </div>
        <h3 className={`${sectionH} mt-6`}>Base chance</h3>
        <table className="w-full max-w-md border-collapse">
          <thead><tr><th className={th}>Attribute score</th><th className={th}>Base chance</th><th className={th}>Trained start</th></tr></thead>
          <tbody>{DB_TABLES.baseChance.map((r) => <tr key={r.min}><td className={td}>{r.min}–{r.max}</td><td className={td}>{r.value}</td><td className={td}>{r.value * DB_TABLES.trainedMultiplier}</td></tr>)}</tbody>
        </table>
      </section>

      <section id="conditions" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Conditions</h2>
        <p className="mb-2 text-[13px] text-[var(--muted)]">Each condition gives a bane on rolls against its attribute and on every skill based on it. Gaining one you already have means choosing another; with all six you lose D6 WP instead (D6 HP if you&apos;re out of WP). A stretch rest heals one, a shift rest heals all.</p>
        <table className="w-full max-w-md border-collapse">
          <thead><tr><th className={th}>Condition</th><th className={th}>Attribute</th></tr></thead>
          <tbody>{DB_CONDITIONS.map((c) => <tr key={c.id}><td className={td}>{c.name}</td><td className={td}>{c.attribute}</td></tr>)}</tbody>
        </table>
      </section>

      <section id="advancement" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Advancement</h2>
        <p className="mb-3 text-[13px] text-[var(--muted)]">Dragonbane has no levels. Skills improve through use.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className={cardCls}>
            <p className={eyebrow}>Advancement marks</p>
            <Bullets className="mt-1" items={[A.markOn, "At the end of the session, mark one unmarked skill of your choice for each question you can answer “yes”:"]} />
            <ol className="mt-1 list-decimal pl-9 text-[12.5px] text-[var(--muted)] marker:text-[var(--db-ink)]">{A.sessionQuestions.map((x) => <li key={x}>{x}</li>)}</ol>
            <p className="mt-2 text-[12.5px] text-[var(--muted)]">{A.overcomeWeakness}</p>
          </div>
          <div className={cardCls}>
            <p className={eyebrow}>Advancement rolls &amp; heroic abilities</p>
            <Bullets className="mt-1" items={[A.roll, A.teacher, A.heroicAbility, A.newCharacter]} />
          </div>
        </div>
      </section>
    </div>
  );
}
