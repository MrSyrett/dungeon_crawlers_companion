import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { PB_CLASSES, PB_LANDLUBBER, PB_JOKER_TABLE, PB_CARD_DECK, PB_RULES } from "@/lib/data/pb-data";
import type { PbClass, PbClassWeapon } from "@/lib/data/pb-types";
import { PbHeader, BackLink, SectionNav, FeatureTable, AbilityGrid, DieTable, RuleNote, N, cardCls, nameCls, badge, dBadge, eyebrow, sectionH, th, td, tdNum, tableWrap, one, abilityLine, signed, rollText, num, type RawQuery } from "@/components/PbRef";

export const dynamic = "force-dynamic";
const BASE = "/pirate-borg/classes";
const ALL: PbClass[] = [...PB_CLASSES, PB_LANDLUBBER];

function weaponText(w: PbClassWeapon | null): string {
  if (!w) return "—";
  if (w.trusted) return "Trusted weapon (d6 table)";
  if (w.fixed?.length) return w.fixed.map((x) => x.replace(/-/g, " ")).join(", ").replace(/^./, (c) => c.toUpperCase());
  if (w.choice?.length) return w.note ?? w.choice.map((c) => `${c.name ?? c.weapon} ${c.damage}`).join(" or ");
  return w.die ? `${w.die} on the starting weapon table` : "—";
}
const dieOr = (d: string | null, none = "—") => d ?? none;
const featureSummary = (c: PbClass): string => {
  if (c.id === "landlubber") return "No class feature";
  if (c.variants) return c.text;
  const t = c.tables.map((x) => `${x.name} ${x.die}`);
  return t.join(" · ") || "—";
};

function Restrictions({ c }: { c: PbClass }) {
  const r = c.restrictions;
  if (!r) return null;
  const items: string[] = [];
  if (!r.rituals) items.push("Can't use arcane rituals.");
  if (r.magicArmorTier >= 2) items.push(`May use relics and rituals in armor up to tier ${r.magicArmorTier}.`);
  else items.push("Relics and rituals almost never work in tier 2 or 3 armor.");
  if (r.noColdIron || !r.metal) items.push("Magic fails near cold iron or while holding metal.");
  return <p className="mt-2 text-[12.5px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Magic:</span> {items.join(" ")}</p>;
}

function StatStrip({ c }: { c: PbClass }) {
  const cells: [string, string][] = [
    ["HP", c.hpDie ? `${c.hpDie} ± TOU` : "by class"],
    ["Devil's Luck", dieOr(c.luckDie, "by class")],
    ["Clothing", c.clothingDie ? `${c.clothingDie}` : c.id === "haunted-soul" || c.id === "tall-tale" ? "by class" : "—"],
    ["Hat", c.hatDie ? `${c.hatDie}` : c.id === "haunted-soul" || c.id === "tall-tale" ? "by class" : "none"],
  ];
  return (
    <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
      {cells.map(([k, v]) => (
        <div key={k} className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-1 py-1.5 text-center">
          <div className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{k}</div>
          <div className={`${num} text-[15px] font-semibold text-[var(--text)]`}>{v}</div>
        </div>
      ))}
    </div>
  );
}

function ClassDetail({ c }: { c: PbClass }) {
  const deck = c.usesCards;
  return (
    <div className={`${cardCls} border-l-4`} style={{ borderLeftColor: "var(--pb)" }}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-4xl text-[var(--sys-head)]">{c.name}</h2>
        <span className="flex flex-wrap gap-1.5">{c.roll ? <span className={dBadge}>{c.optional ? "d8" : "d6"} {c.roll}</span> : null}{c.optional ? <span className={badge}>Optional</span> : null}<span className={dBadge}>pg. {c.page}</span></span>
      </div>
      {c.tagline ? <p className="mt-1 text-[14px] italic text-[var(--sys-sub)]">{c.tagline}</p> : null}
      <p className="mt-2 text-[14px] leading-relaxed text-[var(--muted)]">{c.text}</p>

      {c.abilities ? <div className="mt-4"><p className={`${eyebrow} mb-1`}>Ability modifiers</p><AbilityGrid a={c.abilities} /></div> : null}
      {c.hpDie || c.luckDie || c.secondaryClass ? <div className="mt-3"><StatStrip c={c} /></div> : null}
      {c.weapon ? <p className="mt-3 text-[13px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Starting weapon:</span> {weaponText(c.weapon)}{c.startingAmmo ? <> and <N>{c.startingAmmo.qty}</N> {c.startingAmmo.item}</> : null}.</p> : null}
      {c.abilityRoll ? <p className="mt-1 text-[13px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Abilities:</span> may roll <N>{String(c.abilityRoll)}</N> for each.</p> : null}
      {c.secondaryClass ? <p className="mt-2 text-[13px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Additional class:</span> roll <N>{c.secondaryClass.die}</N> for a core class — it supplies abilities, HP, weapon, clothing, hat, Devil&apos;s Luck and features.</p> : null}
      {c.prayers ? <p className="mt-2 text-[13px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Prayers:</span> <N>{c.prayers.usesPerDay}</N> times a day, reset at {c.prayers.reset}; praying takes your action, no roll unless noted.</p> : null}
      {c.spells ? <p className="mt-2 text-[13px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Spells:</span> cast <N>{c.spells.castsPerDay}</N> a day, reset at {c.spells.reset}; casting takes your action, no roll unless noted. Spells start at rank I and rise to III.</p> : null}
      <Restrictions c={c} />

      {c.tables.length ? <div className="mt-5 flex flex-col gap-3">{c.tables.map((t) => <FeatureTable key={t.id} t={t} />)}</div> : null}

      {deck ? (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <RuleNote title="Playing cards" className=""><p>A <N>{PB_CARD_DECK.cards}</N>-card deck: <N>{PB_CARD_DECK.black}</N> black, <N>{PB_CARD_DECK.red}</N> red, <N>{PB_CARD_DECK.jokers}</N> jokers. {PB_CARD_DECK.note}</p></RuleNote>
          <div className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-3"><DieTable title={PB_JOKER_TABLE.name} die={PB_JOKER_TABLE.die} note={PB_JOKER_TABLE.note} rows={PB_JOKER_TABLE.rows ?? []} /></div>
        </div>
      ) : null}

      {c.variants ? (
        <div className="mt-5 flex flex-col gap-4">
          {c.variants.map((v) => (
            <section key={v.id} className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-3" id={`v-${v.id}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-[21px] text-[var(--text)]">{v.name}</h3>
                <span className={dBadge}>d6 {rollText(v.roll)}</span>
              </div>
              <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">{v.text}</p>
              {v.secondaryClass ? <p className="mt-1 text-[12.5px] italic text-[var(--muted)]">Then roll <N>{v.secondaryClass.die}</N> for an additional core class.</p> : <p className="mt-1 text-[12.5px] italic text-[var(--muted)]">No core class: the animal below sets abilities, HP, weapon and Devil&apos;s Luck.</p>}
              {v.table ? (
                <div className="mt-3">
                  <p className={eyebrow}>{v.table.name} <N className="ml-1 text-[var(--pb-ink)]">{v.table.die}</N></p>
                  {v.table.rows.some((r) => r.abilities) ? (
                    <div className={`${tableWrap} mt-1.5`}>
                      <table className="w-full min-w-[640px] border-collapse">
                        <thead><tr>{[v.table.die, "Animal", "STR", "AGI", "PRE", "TOU", "SPI", "HP", "Luck", "Attack", "Notes"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
                        <tbody>
                          {v.table.rows.map((r) => (
                            <tr key={r.id}>
                              <td className={`${tdNum} text-[var(--pb-ink)]`}>{rollText(r.roll)}</td>
                              <td className={`${td} font-semibold text-[var(--text)]`}>{r.name}</td>
                              {(["STRENGTH", "AGILITY", "PRESENCE", "TOUGHNESS", "SPIRIT"] as const).map((k) => <td key={k} className={tdNum}>{signed(r.abilities?.[k])}</td>)}
                              <td className={`${tdNum} whitespace-nowrap`}>{r.hpDie} ± TOU</td>
                              <td className={tdNum}>{r.luckDie}{r.luckDaily ? " daily" : ""}</td>
                              <td className={td}>{r.weapon ? <>{r.weapon.name} <N className="text-[var(--text)]">{r.weapon.damage}</N></> : "—"}</td>
                              <td className={td}>{r.text}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <DieTable rows={v.table.rows} />
                  )}
                </div>
              ) : null}
            </section>
          ))}
        </div>
      ) : null}
      <p className="mt-4 text-[12px] italic text-[var(--muted)]">Player&apos;s Guidebook pg. {c.page}.</p>
    </div>
  );
}

export default async function PbClassesPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const pick = one(raw.c);
  const selected = pick ? ALL.find((c) => c.id === pick || c.name === pick) ?? null : null;
  if (selected) {
    return (
      <div className="mx-auto w-full max-w-4xl px-5 py-10">
        <PbHeader title="Classes" subtitle={`${selected.name}${selected.optional ? " · optional class" : ""}`} />
        <BackLink href={BASE} label="All classes" />
        <ClassDetail c={selected} />
      </div>
    );
  }
  const core = PB_CLASSES.filter((c) => !c.optional), opt = PB_CLASSES.filter((c) => c.optional);
  const card = (c: PbClass) => (
    <li key={c.id} className={cardCls}>
      <a href={`${BASE}?c=${c.id}`} className="group block">
        <div className="flex items-start justify-between gap-2">
          <h3 className={`${nameCls} group-hover:underline`}>{c.name}</h3>
          <span className="flex shrink-0 gap-1.5">{c.roll ? <span className={dBadge}>{c.optional ? "d8" : "d6"} {c.roll}</span> : <span className={badge}>No class</span>}{c.optional ? <span className={badge}>Optional</span> : null}</span>
        </div>
        {c.tagline ? <p className="mt-1 text-[12.5px] italic text-[var(--sys-sub)]">{c.tagline}</p> : null}
        <p className="mt-1 line-clamp-3 text-[12.5px] leading-relaxed text-[var(--muted)]">{c.text}</p>
        {c.abilities && c.id !== "landlubber" ? <p className="mt-2 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Abilities:</span> <N>{abilityLine(c.abilities)}</N></p> : null}
        {c.hpDie ? <p className="text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">HP</span> <N>{c.hpDie} ± TOU</N> · <span className="font-semibold text-[var(--text)]">Luck</span> <N>{c.luckDie}</N></p> : null}
        <p className="text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Features:</span> <N>{featureSummary(c)}</N></p>
      </a>
    </li>
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <PbHeader title="Classes" subtitle={`${core.length} classes · ${opt.length} optional · or a landlubber with none`} />
      <SectionNav items={[{ id: "summary", label: "At a Glance" }, { id: "core", label: "Core Classes" }, { id: "optional", label: "Optional Classes" }, { id: "landlubber", label: "Landlubber" }, { id: "creation", label: "Making a Pirate" }]} />

      <section id="summary" className="scroll-mt-20">
        <h2 className={sectionH}>At a glance</h2>
        <div className={tableWrap}>
          <table className="w-full min-w-[860px] border-collapse">
            <thead><tr>{["d8", "Class", "STR", "AGI", "PRE", "TOU", "SPI", "HP", "Luck", "Weapon", "Clothing", "Hat", "Feature"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
            <tbody>
              {ALL.map((c) => (
                <tr key={c.id}>
                  <td className={`${tdNum} text-[var(--pb-ink)]`}>{c.roll ?? "—"}</td>
                  <td className={`${td} font-semibold`}><a href={`${BASE}?c=${c.id}`} className="text-[var(--sys-link)] hover:underline">{c.name}</a></td>
                  {(["STRENGTH", "AGILITY", "PRESENCE", "TOUGHNESS", "SPIRIT"] as const).map((k) => <td key={k} className={tdNum}>{c.abilities ? signed(c.abilities[k]) : "—"}</td>)}
                  <td className={`${tdNum} whitespace-nowrap`}>{c.hpDie ? `${c.hpDie} ± TOU` : "—"}</td>
                  <td className={tdNum}>{c.luckDie ?? "—"}</td>
                  <td className={td}>{weaponText(c.weapon)}</td>
                  <td className={tdNum}>{c.clothingDie ?? "—"}</td>
                  <td className={tdNum}>{c.hatDie ?? (c.weapon ? "none" : "—")}</td>
                  <td className={td}><N>{featureSummary(c)}</N></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[12px] italic text-[var(--muted)]">Haunted Souls and Merfolk / Aquatic Mutant Tall Tales also roll a core class, which supplies these stats. A weapon, clothing or hat die means &ldquo;roll that die on the d10 / d10 / d12 table&rdquo; — so a d6 weapon die only reaches entries 1–6.</p>
      </section>

      <section id="core" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Core classes <span className={`${num} text-[17px] text-[var(--muted)]`}>d6</span></h2>
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2 lg:grid-cols-3">{core.map(card)}</ul>
      </section>
      <section id="optional" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Optional classes <span className={`${num} text-[17px] text-[var(--muted)]`}>d8</span></h2>
        <p className="mb-3 text-[13px] text-[var(--muted)]">Roll d8 instead of d6 to include them. The GM may also let a dead pirate come back as a Haunted Soul.</p>
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">{opt.map(card)}</ul>
      </section>
      <section id="landlubber" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Landlubber</h2>
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">{card(PB_LANDLUBBER)}</ul>
      </section>
      <section id="creation" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Making a pirate</h2>
        <ol className="flex list-decimal flex-col gap-1 pl-5 text-[13px] leading-relaxed text-[var(--muted)] marker:text-[var(--pb-ink)]">
          {PB_RULES.creation.steps.map((s) => <li key={s.id}>{s.text}</li>)}
        </ol>
        <p className="mt-2 text-[12.5px] text-[var(--muted)]">Tables for every step are on <a href="/pirate-borg/backgrounds" className="text-[var(--sys-link)] underline">Backgrounds</a> and <a href="/pirate-borg/gear" className="text-[var(--sys-link)] underline">Gear</a>; abilities and HP on <a href="/pirate-borg/rules#abilities" className="text-[var(--sys-link)] underline">Rules</a>.</p>
      </section>
    </div>
  );
}
