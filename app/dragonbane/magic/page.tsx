import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DB_SPELLS, DB_MAGIC_TRICKS, DB_SUMMONS, DB_SUMMONS_EXTRA, DB_MAGIC_RULES, DB_MAGIC_RULES_EXTRA, DB_MAGIC_SCHOOLS, DB_FAMILIAR_RULES, DB_ALCHEMY, DB_ENCHANTING, DB_GM_TABLES, DB_ADVANCEMENT } from "@/lib/data/db-data";
import type { DbSpell, DbMagicTrick, DbSummon, DbMagicSchool, DbNamedText } from "@/lib/data/db-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import CompendiumHomebrew from "@/components/hb/CompendiumHomebrew";
import { DbHeader, ChipRow, SearchForm, CountLine, EmptyState, BackLink, SectionNav, DieTable, Bullets, cardCls, nameCls, badge, hbBadge, eyebrow, sectionH, th, td, one, isHb, srcKey, srcChips, srcPage, type RawQuery } from "@/components/DbRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
// Core Rules magic (General + Animism, Elementalism, Mentalism) and the Book of Magic:
// nine more schools (Demonology, Harmonism, Illusionism, Necromancy, Symbolism, Witchcraft,
// Alchemy, Enchanting, Dracomancy), new spells for the old ones, and six revised spells.
// `?sp=` opens a spell, `?sc=` a school (its familiar, study, starting skills, rules and
// spell tree — plus the alchemy and enchanting reference for those two).
const BASE = "/dragonbane/magic";
const SCHOOLS = ["General", ...DB_MAGIC_RULES.schools];
const SCHOOL_LABEL: Record<string, string> = Object.fromEntries(SCHOOLS.map((s) => [s, s === "General" ? "General Magic" : s]));
const schoolRec = (s: string): DbMagicSchool | undefined => DB_MAGIC_SCHOOLS.find((x) => x.name === (s === "General" ? "General Magic" : s));
const CAST_LABEL: Record<string, string> = { action: "Action", reaction: "Reaction", round: "Round", stretch: "Stretch", shift: "Shift", "stretch/shift": "Stretch or shift", "action/stretch/shift": "Action, stretch or shift" };
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
type Rec = Record<string, unknown>;
const str = (v: unknown) => (v == null ? "" : String(v));

function costText(s: DbSpell): string {
  const per = Number(s.wpPerPowerLevel) || DB_MAGIC_RULES.wpPerPowerLevel;
  if (s.recipe) return `${DB_MAGIC_RULES.wpPerPowerLevel} WP per dose (power level = doses)`;
  return s.powerLevels ? `${per} WP per power level (1–3)` : `${DB_MAGIC_RULES.fixedCost} WP`;
}
function scaleText(s: DbSpell): string {
  const d = s.damage, h = s.healing;
  const parts: string[] = [];
  if (d?.base) parts.push(`${d.base} damage${d.perLevel ? `, +${d.perLevel} per extra power level` : ""}${d.chain?.length ? ` · chains ${d.chain.join(" → ")}` : ""}`);
  if (h?.base) parts.push(`heals ${h.base}${h.perLevel ? `, +${h.perLevel} per extra power level` : ""}`);
  return parts.join(" · ");
}
function reqText(s: DbSpell): string {
  return s.requirements.map(cap).join(", ") + (s.requirementDetail ? ` (${s.requirementDetail})` : "");
}
function srcBadge(x: object) {
  const r = x as { source?: string; revised?: unknown; updated?: unknown };
  if (srcKey(r.source) === "magic") return <span className={badge} title={r.revised ? "Officially revised in the Book of Magic" : r.updated ? "Core spell as reprinted in the Book of Magic" : undefined}>{r.revised ? "Revised" : r.updated ? "Updated" : "Book of Magic"}</span>;
  return null;
}

function SpellCard({ s, full }: { s: DbSpell; full?: boolean }) {
  const line = (label: string, val?: string) => (val ? <div><dt className="inline font-semibold text-[var(--text)]">{label}:</dt> <dd className="inline">{val}</dd></div> : null);
  return (
    <>
      <div className="flex items-start justify-between gap-2">
        {full ? <h2 className="text-3xl text-[var(--sys-link)]">{s.name} {isHb(s) ? <span className={hbBadge}>HB</span> : null}</h2> : <h3 className={nameCls}>{s.name} {isHb(s) ? <span className={hbBadge}>HB</span> : null}</h3>}
        <span className="flex shrink-0 flex-wrap justify-end gap-1.5">{srcBadge(s)}<span className={badge}>{SCHOOL_LABEL[s.school] ?? s.school}</span><span className={badge}>{s.recipe ? "Recipe" : "Rank"} {s.rank}</span></span>
      </div>
      <dl className="mt-1.5 grid gap-x-4 gap-y-0.5 text-[12.5px] text-[var(--muted)] sm:grid-cols-2">
        {line("Prerequisite", s.prerequisite)}
        {line(s.recipe ? "Ingredients" : "Requirement", s.recipe ? str(s.requirementDetail) : reqText(s))}
        {line(s.recipe ? "Brewing" : "Casting time", s.recipe ? "A shift, then an Alchemy roll" : CAST_LABEL[s.castingTime] ?? s.castingTime)}
        {s.recipe ? null : line("Range", s.range)}
        {line("Duration", s.duration)}
        {line("Cost", costText(s))}
      </dl>
      {scaleText(s) ? <p className="mt-1.5 text-[12.5px] text-[var(--text)]">{scaleText(s)}</p> : null}
      <p className={`mt-1.5 leading-relaxed text-[var(--muted)] ${full ? "text-[14px]" : "text-[12.5px]"}`}>{s.text}</p>
      <p className="mt-1.5 text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">{[s.dodge ? "Can be dodged" : "", s.parry ? "Can be parried" : "", s.page ? srcPage(s) : "", s.corePage ? `Core p.${str(s.corePage)}` : ""].filter(Boolean).join(" · ")}</p>
    </>
  );
}

function SummonCard({ m }: { m: DbSummon | Rec }) {
  const r = m as Rec;
  const atk = r.attack as { name?: string; damage?: string; type?: string; note?: string } | string | undefined;
  const list = (k: string) => (Array.isArray(r[k]) ? (r[k] as string[]) : []);
  const stats = [r.movement != null ? `Movement ${str(r.movement)}` : "", r.hpPerLevel != null ? `HP ${str(r.hpPerLevel)} per power level` : r.hp != null ? `HP ${str(r.hp)}` : "", r.armor != null ? `Armor ${str(r.armor)}` : ""].filter(Boolean).join(" · ");
  return (
    <div className={cardCls}>
      <div className="flex items-start justify-between gap-2"><h3 className={nameCls}>{str(r.name)}</h3><span className="flex gap-1.5">{srcBadge(r)}<span className={badge}>{str(r.spell || r.trick)}</span></span></div>
      {r.text ? <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--muted)]">{str(r.text)}</p> : null}
      {stats ? <p className="mt-1 text-[12.5px] text-[var(--muted)]">{stats}</p> : null}
      {atk ? <p className="mt-1 text-[12.5px] text-[var(--muted)]">{typeof atk === "string" ? atk : <><span className="font-semibold text-[var(--text)]">{atk.name}.</span> {atk.damage} {atk.type}. {atk.note}</>}</p> : null}
      {r.statsFrom ? <p className="mt-1 text-[12.5px] text-[var(--muted)]">Stats: {str(r.statsFrom)}</p> : null}
      {r.control ? <p className="mt-1 text-[12.5px] text-[var(--muted)]">{str(r.control)}</p> : null}
      <Bullets className="mt-1" items={[...list("abilities"), ...list("resistances").map((x) => `Resistance: ${x}`), ...list("immunities").map((x) => `Immunity: ${x}`), ...list("weaknesses").map((x) => `Weakness: ${x}`)]} />
      {Array.isArray(r.attacks) && r.attacks.length ? <p className="mt-1 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Monster attacks:</span> {(r.attacks as { name: string }[]).map((a) => a.name).join(" · ")}</p> : null}
    </div>
  );
}

function NamedList({ items }: { items: DbNamedText[] | Rec[] }) {
  return (
    <dl className="flex flex-col gap-1 text-[12.5px] leading-relaxed text-[var(--muted)]">
      {(items as Rec[]).map((r, i) => <div key={`${str(r.name)}-${i}`}><dt className="inline font-semibold text-[var(--text)]">{str(r.name)}.</dt> <dd className="inline">{str(r.text)}{r.requirement || r.requirements ? <span className="italic"> Wants: {str(r.requirement || r.requirements)}</span> : null}</dd></div>)}
    </dl>
  );
}

function SchoolDetail({ sc, spells, tricks }: { sc: DbMagicSchool; spells: DbSpell[]; tricks: DbMagicTrick[] }) {
  const key = sc.name === "General Magic" ? "General" : sc.name;
  const mine = spells.filter((s) => s.school === key);
  const tr = tricks.filter((t) => t.school === key);
  const recipe = key === "Alchemy";
  const ranks = [...new Set(mine.map((s) => s.rank))].sort((a, b) => a - b);
  const fam = sc.familiar as (Rec & { text?: string; creatures?: Rec[]; abilities?: Rec[]; ability?: unknown }) | null | undefined;
  const people = (sc.masters ?? sc.demonLords ?? sc.teachers) as Rec[] | undefined;
  const peopleLabel = sc.demonLords ? "Demon lords" : sc.teachers ? "Teachers" : "Masters";
  const study = (sc.study ?? {}) as Record<string, string>;
  const STUDY_LABEL: Record<string, string> = { ranks12: "Ranks 1–2", ranks34: "Ranks 3–4", rank5: "Rank 5", other: "Also" };
  return (
    <div className={`${cardCls} border-l-4 border-r-4`} style={{ borderLeftColor: "var(--db)", borderRightColor: "var(--db)" }}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-3xl text-[var(--sys-link)]">{sc.name}</h2>
        <span className="flex flex-wrap gap-1.5">
          {sc.title ? <span className={badge}>{sc.title}</span> : null}
          <span className={badge}>{sc.skill && sc.skill !== sc.name ? `Cast with ${sc.skill}` : `${sc.attribute} skill`}</span>
          <span className={badge}>{sc.creation ? `New ${(sc.professions ?? ["Mage"]).join(" / ").toLowerCase()} can take it` : "Learned in play only"}</span>
          <span className={badge}>Book of Magic p.{sc.page}</span>
        </span>
      </div>
      <p className="mt-2 text-[14px] leading-relaxed text-[var(--muted)]">{sc.summary}</p>
      {sc.prevalence ? <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--muted)]">{sc.prevalence}</p> : null}
      {sc.types?.length ? <><h3 className={`${sectionH} mt-5`}>Practitioners</h3><NamedList items={sc.types} /></> : null}
      {sc.startingSkills?.length ? <><h3 className={`${sectionH} mt-5`}>Starting skills</h3><p className="text-[13px] text-[var(--muted)]">A new {(sc.title ?? "mage").toLowerCase()} picks the six profession skills from: {sc.startingSkills.join(", ")}.</p></> : null}
      {Object.keys(study).length ? (
        <><h3 className={`${sectionH} mt-5`}>Studying {key === "General" ? "general magic" : sc.name.toLowerCase()}</h3>
          <dl className="flex flex-col gap-1 text-[12.5px] leading-relaxed text-[var(--muted)]">{Object.entries(study).map(([k, v]) => <div key={k}><dt className="inline font-semibold text-[var(--text)]">{STUDY_LABEL[k] ?? cap(k)}:</dt> <dd className="inline">{v}</dd></div>)}</dl></>
      ) : null}
      {people?.length ? <><h3 className={`${sectionH} mt-5`}>{peopleLabel}</h3><NamedList items={people} /></> : null}
      {sc.rules?.length ? <><h3 className={`${sectionH} mt-5`}>School rules</h3><NamedList items={sc.rules} /></> : null}
      {fam ? (
        <><h3 className={`${sectionH} mt-5`}>Familiar</h3>
          <p className="text-[12.5px] leading-relaxed text-[var(--muted)]">{fam.text}</p>
          {fam.ability ? <p className="mt-1 text-[12.5px] text-[var(--muted)]">{typeof fam.ability === "string" ? fam.ability : <><span className="font-semibold text-[var(--text)]">{str((fam.ability as Rec).name)}.</span> {str((fam.ability as Rec).text)}</>}</p> : null}
          {fam.abilities?.length ? <div className="mt-1"><NamedList items={fam.abilities} /></div> : null}
          {fam.creatures?.length ? (
            <div className="mt-2 overflow-x-auto"><table className="w-full min-w-[480px] border-collapse">
              <thead><tr>{["Creature", "Mov", "HP", "Attack", "Skills"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
              <tbody>{fam.creatures.map((c) => <tr key={str(c.name)}><td className={`${td} font-semibold text-[var(--text)]`}>{str(c.name)}</td><td className={td}>{str(c.movement)}</td><td className={td}>{str(c.hp)}</td><td className={td}>{str(c.attack)}{c.note ? ` — ${str(c.note)}` : ""}</td><td className={td}>{str(c.skills)}</td></tr>)}</tbody>
            </table></div>
          ) : null}</>
      ) : null}
      <h3 className={`${sectionH} mt-5`}>{recipe ? "Recipes" : "Spells"} by rank</h3>
      {ranks.length ? (
        <dl className="flex flex-col gap-1 text-[13px] text-[var(--muted)]">
          {ranks.map((r) => <div key={r}><dt className="inline font-semibold text-[var(--text)]">Rank {r}:</dt> <dd className="inline">{mine.filter((s) => s.rank === r).map((s, i) => <span key={s.id}>{i ? ", " : ""}<a className="underline" href={`${BASE}?sp=${encodeURIComponent(s.id)}`}>{s.name}</a></span>)}</dd></div>)}
        </dl>
      ) : <p className="text-[13px] text-[var(--muted)]">—</p>}
      <p className="mt-2 text-[12.5px]"><a className="text-[var(--sys-link)] underline" href={`${BASE}?school=${encodeURIComponent(key)}#spells`}>Browse {sc.name} {recipe ? "recipes" : "spells"} with full text →</a></p>
      {tr.length ? <><h3 className={`${sectionH} mt-5`}>Magic tricks</h3><NamedList items={tr as unknown as Rec[]} /></> : null}
      {recipe ? <AlchemyRef /> : null}
      {key === "Enchanting" ? <EnchantingRef /> : null}
    </div>
  );
}

function AlchemyRef() {
  const A = DB_ALCHEMY as unknown as { rules: DbNamedText[]; substances: Rec[]; ingredients: Rec[]; foraging?: Rec; extraction?: Rec };
  const costTxt = (c: unknown) => { const x = c as { amount?: number; unit?: string } | null; return x?.amount != null ? `${x.amount} ${x.unit}` : "—"; };
  return (
    <>
      <h3 className={`${sectionH} mt-5`}>Brewing</h3>
      <NamedList items={A.rules} />
      {A.substances?.length ? <div className="mt-2"><NamedList items={A.substances} /></div> : null}
      <h3 className={`${sectionH} mt-5`}>Ingredients</h3>
      <div className="overflow-x-auto"><table className="w-full min-w-[420px] border-collapse">
        <thead><tr>{["Ingredient", "Cost per dose", "Supply"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
        <tbody>{A.ingredients.map((i) => <tr key={str(i.name)}><td className={`${td} text-[var(--text)]`}>{str(i.name)}</td><td className={td}>{costTxt(i.cost)}</td><td className={td}>{str(i.supply) || "—"}</td></tr>)}</tbody>
      </table></div>
      <p className="mt-2 text-[12px] italic text-[var(--muted)]">Ingredients and simpler substances are in the <a className="underline" href="/dragonbane/gear">Gear</a> lists and the sheet&apos;s shop. On the sheet, an alchemist&apos;s recipes sit with their spells: <b>Brew</b> rolls Alchemy, uses up the ingredients in your inventory and adds the doses.</p>
    </>
  );
}

function EnchantingRef() {
  const E = DB_ENCHANTING as unknown as { rules: DbNamedText[]; drawbacks: Rec[]; artifacts: Rec[]; materials: Rec[] };
  return (
    <>
      <h3 className={`${sectionH} mt-5`}>Crafting &amp; using magic items</h3>
      <NamedList items={E.rules} />
      <h3 className={`${sectionH} mt-5`}>Materials</h3>
      <NamedList items={E.materials} />
      <h3 className={`${sectionH} mt-5`}>Drawbacks</h3>
      <p className="mb-1 text-[12.5px] text-[var(--muted)]">Each drawback bound to an item adds one enchanting spell to it without a WP cost or a roll.</p>
      <NamedList items={E.drawbacks.map((d) => ({ ...d, text: `${str(d.text)}${d.condition ? ` (${str(d.condition)})` : ""}` }))} />
      <h3 className={`${sectionH} mt-5`}>Legendary artifacts</h3>
      <div className="grid gap-3 md:grid-cols-2">
        {E.artifacts.map((a) => (
          <div key={str(a.name)} className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-3">
            <div className="flex items-start justify-between gap-2"><p className="font-display text-lg text-[var(--text)]">{str(a.name)}</p><span className={badge}>p.{str(a.page)}</span></div>
            {a.base ? <p className="text-[11.5px] uppercase tracking-[0.08em] text-[var(--muted)]">{str(a.base)}{a.material ? ` · ${str(a.material)}` : ""}</p> : null}
            <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--muted)]">{str(a.text)}</p>
            {Array.isArray(a.powers) ? <Bullets className="mt-1" items={(a.powers as unknown[]).map((p) => (typeof p === "string" ? p : `${str((p as Rec).name)}: ${str((p as Rec).text)}`))} /> : null}
            {a.clues ? <p className="mt-1 text-[12px] italic text-[var(--muted)]">Where it may be: {str(a.clues)}</p> : null}
          </div>
        ))}
      </div>
    </>
  );
}

export default async function DbMagicPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;

  const [hbV, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "db-spell" }),
    ownHomebrew(user.id, "db-spell"),
    userCampaigns(user.id),
  ]);
  const hbData = hbV.map((h) => h.data as Record<string, unknown>);
  const hbSpells = hbData.filter((d) => !d.trick) as unknown as DbSpell[];
  const hbTricks = hbData.filter((d) => d.trick) as unknown as DbMagicTrick[];
  const spells = [...hbSpells, ...DB_SPELLS];
  const tricks = [...hbTricks, ...DB_MAGIC_TRICKS];

  const pick = one(raw.sp);
  const selected = pick ? spells.find((s) => s.id === pick || s.name === pick) ?? null : null;
  if (selected) {
    const leadsTo = spells.filter((s) => s.prerequisite.split(/ and | or |, /).map((x) => x.trim()).includes(selected.name)).map((s) => s.name);
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <DbHeader title="Magic" subtitle={`${SCHOOL_LABEL[selected.school] ?? selected.school} · ${selected.recipe ? "recipe" : "rank"} ${selected.rank}`} />
        <BackLink href={BASE} label="All spells" />
        <div className={`${cardCls} border-l-4 border-r-4`} style={{ borderLeftColor: "var(--db)", borderRightColor: "var(--db)" }}>
          <SpellCard s={selected} full />
          {leadsTo.length ? <p className="mt-3 text-[12.5px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Prerequisite for:</span> {leadsTo.join(", ")}</p> : null}
          {schoolRec(selected.school) ? <p className="mt-2 text-[12.5px]"><a className="text-[var(--sys-link)] underline" href={`${BASE}?sc=${schoolRec(selected.school)!.id}`}>About {SCHOOL_LABEL[selected.school]} →</a></p> : null}
        </div>
      </div>
    );
  }
  const scPick = one(raw.sc);
  const scSel = scPick ? DB_MAGIC_SCHOOLS.find((s) => s.id === scPick || s.name === scPick) ?? null : null;
  if (scSel) {
    return (
      <div className="mx-auto w-full max-w-4xl px-5 py-10">
        <DbHeader title="Magic" subtitle={`School of magic · ${scSel.name}`} />
        <BackLink href={`${BASE}#schools`} label="All schools" />
        <SchoolDetail sc={scSel} spells={spells} tricks={tricks} />
      </div>
    );
  }

  const q = one(raw.q).trim().toLowerCase();
  const school = SCHOOLS.includes(one(raw.school)) ? one(raw.school) : "";
  const ranks = [...new Set(spells.map((s) => s.rank))].sort((a, b) => a - b).map(String);
  const rank = ranks.includes(one(raw.rank)) ? one(raw.rank) : "";
  const casts = Object.keys(CAST_LABEL).filter((c) => spells.some((s) => s.castingTime === c));
  const cast = casts.includes(one(raw.cast)) ? one(raw.cast) : "";
  const srcOpts = srcChips([...spells, ...tricks].map((s) => s.source as string | undefined));
  const src = srcOpts.some((o) => o.key === one(raw.src)) ? one(raw.src) : "";
  const current = { q: one(raw.q), school, rank, cast, src };
  const facets = (s: DbSpell) => ({ school: s.school, rank: String(s.rank), cast: s.castingTime, src: srcKey(s.source as string | undefined) });
  const show = (s: DbSpell) => facetMatch(facets(s), current) && (!q || s.name.toLowerCase().includes(q) || s.text.toLowerCase().includes(q));
  const list = spells.slice().sort((a, b) => SCHOOLS.indexOf(a.school) - SCHOOLS.indexOf(b.school) || a.rank - b.rank || a.name.localeCompare(b.name));
  const shown = list.filter(show).length;
  const R = DB_MAGIC_RULES;
  const L = DB_ADVANCEMENT.magic;
  const F = DB_FAMILIAR_RULES as unknown as { text: string; abilities: DbNamedText[]; creatures?: Rec[]; page?: number };
  const nRecipes = DB_SPELLS.filter((s) => s.recipe).length;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <DbHeader title="Magic" subtitle={`${DB_SPELLS.length - nRecipes} spells · ${nRecipes} alchemy recipes · ${DB_MAGIC_TRICKS.length} magic tricks · ${R.schools.length} schools + General Magic${hbData.length ? ` · +${hbData.length} homebrew` : ""}`} />
      <SectionNav items={[{ id: "casting", label: "Casting Rules" }, { id: "schools", label: "Schools" }, { id: "spells", label: "Spells" }, { id: "tricks", label: "Magic Tricks" }, { id: "familiars", label: "Familiars" }, { id: "summons", label: "Summoned Creatures" }, { id: "learning", label: "Learning Magic" }, { id: "mishaps", label: "Magical Mishaps" }]} />
      <CompendiumHomebrew>
        <HomebrewEditor kind="db-spell" campaigns={campaigns} initial={hbOwn} />
      </CompendiumHomebrew>

      <section id="casting" className="scroll-mt-20">
        <div className="grid gap-4 md:grid-cols-2">
          <div className={cardCls}>
            <p className={eyebrow}>Casting a spell</p>
            <Bullets className="mt-1" items={[
              "Spend WP and roll your skill in the spell's school (any school but Harmonism can cast General Magic). On a failure the WP is still spent.",
              `Power level 1–${R.maxPowerLevel} costs ${R.wpPerPowerLevel} WP per level (Dracomancy: 6 per level); spells without power levels cost ${R.fixedCost} WP. Magic tricks cost ${R.trickCost} WP and always work.`,
              `Prepared spells: ${R.preparedLimit}. Preparing takes a shift with your grimoire.`,
              R.grimoire,
              R.metal,
              R.powerFromBody.text,
            ]} />
          </div>
          <div className={cardCls}>
            <p className={eyebrow}>Dragons, Demons &amp; durations</p>
            <p className="mt-1 text-[12.5px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Dragon:</span> the target needs a Dragon to resist, dodge or parry, and you choose one:</p>
            <Bullets className="mt-1" items={R.dragon} />
            <p className="mt-1.5 text-[12.5px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Demon:</span> {R.demon}</p>
            <p className="mt-1.5 text-[12.5px] text-[var(--muted)]">{R.aoe}</p>
            <dl className="mt-1.5 flex flex-col gap-0.5 text-[12.5px] text-[var(--muted)]">
              {Object.entries(R.durations).map(([k, v]) => <div key={k}><dt className="inline font-semibold text-[var(--text)]">{k}:</dt> <dd className="inline">{v}</dd></div>)}
            </dl>
          </div>
        </div>
        <div className={`${cardCls} mt-4`}>
          <p className={eyebrow}>Book of Magic clarifications</p>
          <div className="mt-1"><NamedList items={(DB_MAGIC_RULES_EXTRA as unknown as { rules: DbNamedText[] }).rules} /></div>
        </div>
        <p className="mt-3 text-[12.5px] text-[var(--muted)]">Spell ranks 1–5 show how complex a spell is; they have no mechanical effect (Dracomancy&apos;s spells are rank 6). Requirements: <span className="text-[var(--text)]">Word</span> (spoken aloud), <span className="text-[var(--text)]">Gesture</span>, <span className="text-[var(--text)]">Focus</span> (an item held in hand), <span className="text-[var(--text)]">Ingredient</span> (used up), and from the Book of Magic <span className="text-[var(--text)]">Melody</span> (Harmonism: sung or played), <span className="text-[var(--text)]">Symbol</span> (Symbolism: traced, drawn or carved) and <span className="text-[var(--text)]">Tools</span> (Enchanting).</p>
      </section>

      <section id="schools" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Schools of magic</h2>
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2 lg:grid-cols-3">
          {DB_MAGIC_SCHOOLS.map((sc) => {
            const key = sc.name === "General Magic" ? "General" : sc.name;
            const n = DB_SPELLS.filter((s) => s.school === key).length, t = DB_MAGIC_TRICKS.filter((x) => x.school === key).length;
            return (
              <li key={sc.id} className={cardCls}>
                <a href={`${BASE}?sc=${sc.id}`} className="group block">
                  <div className="flex items-start justify-between gap-2"><h3 className={`${nameCls} group-hover:underline`}>{sc.name}</h3><span className="flex gap-1.5">{sc.existing ? null : <span className={badge}>Book of Magic</span>}{sc.creation ? null : <span className={badge}>In play only</span>}</span></div>
                  <p className="mt-1 line-clamp-3 text-[12.5px] leading-relaxed text-[var(--muted)]">{sc.summary}</p>
                  <p className="mt-1.5 text-[11.5px] text-[var(--muted)]">{[sc.title, `${n} ${key === "Alchemy" ? "recipes" : "spells"}`, t ? `${t} tricks` : "", sc.skill && sc.skill !== sc.name ? `cast with ${sc.skill}` : ""].filter(Boolean).join(" · ")}</p>
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      <section id="spells" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Spells &amp; recipes</h2>
        <InstantFilter>
          <SearchForm base={BASE} q={one(raw.q)} placeholder="Search spells…" hidden={{ school, rank, cast, src }} />
          <ChipRow label="School" base={BASE} current={current} param="school" options={SCHOOLS.map((s) => ({ key: s, label: SCHOOL_LABEL[s] }))} active={school} />
          <ChipRow label="Rank" base={BASE} current={current} param="rank" options={ranks.map((r) => ({ key: r, label: `Rank ${r}` }))} active={rank} />
          <ChipRow label="Casting" base={BASE} current={current} param="cast" options={casts.map((c) => ({ key: c, label: CAST_LABEL[c] }))} active={cast} />
          <ChipRow label="Source" base={BASE} current={current} param="src" options={srcOpts} active={src} />
          <CountLine count={shown} noun="spell" base={BASE} filtered={!!(q || school || rank || cast || src)} />
          <EmptyState noun="spell" base={BASE} hidden={shown > 0} />
          <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
            {list.map((s, i) => (
              <li key={`${s.id}-${i}`} className={cardCls} hidden={!show(s)} data-f={facetAttr(facets(s))}>
                <a href={`${BASE}?sp=${encodeURIComponent(s.id)}`} className="block hover:[&_h3]:underline"><SpellCard s={s} /></a>
              </li>
            ))}
          </ul>
        </InstantFilter>
      </section>

      <section id="tricks" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Magic tricks</h2>
        <p className="mb-3 text-[13px] text-[var(--muted)]">Minor spells: always prepared (they don&apos;t count against the limit), always need a gesture, cost 1 WP and succeed automatically. Alchemy and Enchanting have none of their own.</p>
        <div className="grid gap-4 md:grid-cols-2">
          {SCHOOLS.map((sc) => {
            const t = tricks.filter((x) => x.school === sc);
            if (!t.length) return null;
            return (
              <div key={sc} className={cardCls}>
                <p className="font-display text-lg text-[var(--text)]">{SCHOOL_LABEL[sc]}</p>
                <dl className="mt-1 flex flex-col gap-1 text-[12.5px] leading-relaxed text-[var(--muted)]">
                  {t.map((x) => <div key={x.id}><dt className="inline font-semibold text-[var(--text)]">{x.name}{isHb(x) ? " (HB)" : ""}{x.revised ? " (revised)" : x.updated ? " (updated)" : ""}.</dt> <dd className="inline">{x.text}</dd></div>)}
                </dl>
              </div>
            );
          })}
        </div>
      </section>

      <section id="familiars" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Familiars</h2>
        <div className={cardCls}>
          <p className="text-[13px] leading-relaxed text-[var(--muted)]">{F.text}</p>
          <p className={`${eyebrow} mt-3`}>Familiar abilities (choose two)</p>
          <div className="mt-1"><NamedList items={F.abilities} /></div>
          <p className="mt-2 text-[12px] italic text-[var(--muted)]">Each school&apos;s familiar forms and its own familiar ability are on the school&apos;s page. General Magic, Book of Magic p.{F.page ?? 9}.</p>
        </div>
      </section>

      <section id="summons" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Summoned &amp; raised creatures</h2>
        <p className="mb-3 text-[13px] text-[var(--muted)]">Elementals (Elementalism rank 3, core), and from the Book of Magic the demons of Demonology, the dead raised by Necromancy and the golems of Symbolism. Each obeys its caster and must stay within sight unless its spell says otherwise.</p>
        <div className="grid gap-3 md:grid-cols-2">{[...DB_SUMMONS, ...DB_SUMMONS_EXTRA].map((m) => <SummonCard key={str((m as Rec).id ?? (m as Rec).name)} m={m as Rec} />)}</div>
      </section>

      <section id="learning" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Learning magic</h2>
        <div className={cardCls}>
          <Bullets items={[L.spellFromTeacher, L.spellFromGrimoire, L.trick, L.school,
            "A newly created mage chooses a school (any but Dracomancy), three rank 1 spells and three magic tricks from that school or General Magic, and gets a grimoire. An alchemist's rank 1 recipes count as spells.",
            "A bard may give up Musician for Harmonism: three rank 1 Harmonism spells, three Harmonism tricks and a grimoire. Harmonism is cast with Performance, and harmonists can't learn general magic.",
            "Enchanting needs Crafting 12 or higher, also for a new character. Dracomancy is learned only in play, once you know a rank 5 spell.",
            "Each school's page says where to find teachers and what they ask for each rank."]} />
        </div>
      </section>

      <section id="mishaps" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Magical mishaps</h2>
        <DieTable die={DB_GM_TABLES.magicalMishaps.die} note={DB_GM_TABLES.magicalMishaps.note} rows={DB_GM_TABLES.magicalMishaps.rows ?? []} />
      </section>
    </div>
  );
}
