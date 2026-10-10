import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DCC_SKILLS } from "@/lib/data/dcc-skills";
import { DCC_SPELLS } from "@/lib/data/dcc-spells";
import type { DccSkill, DccSpell } from "@/lib/data/dcc-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import DccHomebrewEditor from "@/components/DccHomebrewEditor";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

// Skills and Spells share one page (two sub-tabs) so the DCC toolbar fits on a
// single row. Each sub-tab keeps its own homebrew editor, filters, and cards —
// the logic is ported verbatim from the old /dcc/skills and /dcc/spells pages,
// with the form/link base pointed here and a `tab` param threaded through. Only
// the active sub-tab renders (and fetches its homebrew), so their filter query
// params never collide. The tab switch is a real navigation (two different
// views); within a tab the chips and search filter on the client
// (InstantFilter), which carries `tab` through untouched.

export const dynamic = "force-dynamic";

const BASE = "/dcc/skills-and-spells";
const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));

type Raw = { [k: string]: string | string[] | undefined };

// ── shared styles ────────────────────────────────────────────────────────────
const chipBase =
  "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
const chipOff =
  "border-[var(--border)] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]";
const chipOn = "border-[var(--red)] bg-[var(--panel-2)] text-[var(--gold)]";
const badge =
  "rounded border border-[var(--border)] px-2 py-1 text-[11px] font-semibold tracking-[0.08em] text-[var(--muted)]";
const hbBadge =
  "rounded border border-[var(--red)] px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--gold)]";
const srcBadge =
  "rounded border border-[var(--border)] px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]";

function Badge({ label, value }: { label: string; value: string }) {
  return (
    <span className={badge}>
      {label} <span className="text-[var(--text)]">{value}</span>
    </span>
  );
}

// ── SKILLS section ───────────────────────────────────────────────────────────
type SkillQuery = { q?: string; cat?: string; group?: string; src?: string; sort?: string };

const SKILL_CAT_RANK: Record<DccSkill["category"], number> = { attack: 0, utility: 1 };
const bySkill = (a: DccSkill, b: DccSkill) =>
  SKILL_CAT_RANK[a.category] - SKILL_CAT_RANK[b.category] || a.name.localeCompare(b.name, "en");
const dieVal = (d?: string) => {
  const m = String(d ?? "").match(/(\d*)d(\d+)/i);
  return m ? parseInt(m[2], 10) * 100 + parseInt(m[1] || "1", 10) : -1;
};
const bySkillName = (a: DccSkill, b: DccSkill) => a.name.localeCompare(b.name, "en");
const bySkillDamage = (a: DccSkill, b: DccSkill) => dieVal(b.damage) - dieVal(a.damage) || a.name.localeCompare(b.name, "en");
const SKILL_SORTS: { key: string; label: string; cmp: (a: DccSkill, b: DccSkill) => number }[] = [
  { key: "", label: "Category", cmp: bySkill },
  { key: "name", label: "Name", cmp: bySkillName },
  { key: "damage", label: "Damage", cmp: bySkillDamage },
];
const SKILL_CATEGORIES: { key: DccSkill["category"]; label: string; noun: string; plural: string }[] = [
  { key: "attack", label: "Attack", noun: "attack skill", plural: "attack skills" },
  { key: "utility", label: "Utility", noun: "utility skill", plural: "utility skills" },
];
const SKILL_GROUP_ORDER = ["Hand-to-Hand", "Damage Effect", "Edged", "Bashing", "Reach", "Ranged", "Animal/Pet Strike"];

function withSkill(current: SkillQuery, patch: SkillQuery): string {
  const next = { ...current, ...patch };
  const sp = new URLSearchParams();
  sp.set("tab", "skills");
  if (next.q) sp.set("q", next.q);
  if (next.cat) sp.set("cat", next.cat);
  if (next.group) sp.set("group", next.group);
  if (next.src) sp.set("src", next.src);
  if (next.sort) sp.set("sort", next.sort);
  return `${BASE}?${sp.toString()}`;
}

// The facets the chips test, per skill — the same object the client reads back
// from `data-f` (lib/facets), so server and client always agree.
const skillFacets = (s: DccSkill) => ({ cat: s.category, group: s.group, src: s.source === "Homebrew" ? "hb" : "book" });

function matchesSkill(s: DccSkill, q: string, cat: string, group: string, src: string): boolean {
  if (!facetMatch(skillFacets(s), { cat, group, src })) return false;
  if (!q) return true;
  return s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q) || (s.group ?? "").toLowerCase().includes(q);
}

function validSkill(s: unknown): s is DccSkill {
  const x = s as Record<string, unknown>;
  return !!x && typeof x.name === "string" && Array.isArray(x.upgrades);
}

async function SkillsSection({ userId, raw }: { userId: string; raw: Raw }) {
  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(userId, { type: "dcc-skill" }),
    ownHomebrew(userId, "dcc-skill"),
    userCampaigns(userId),
  ]);
  const hbRows = hbVisible.map((h) => h.data as unknown as DccSkill).filter(validSkill);
  const ALL_SKILLS = [...hbRows, ...DCC_SKILLS];

  const GROUPS = [...new Set(ALL_SKILLS.map((s) => s.group).filter((g): g is string => !!g))].sort((a, b) => {
    const ia = SKILL_GROUP_ORDER.indexOf(a);
    const ib = SKILL_GROUP_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b, "en");
  });

  const q = one(raw.q);
  const cat = one(raw.cat);
  const group = one(raw.group);
  const src = one(raw.src);
  const needle = q.trim().toLowerCase();
  const activeCat = SKILL_CATEGORIES.some((c) => c.key === cat) ? cat : "";
  const activeGroup = GROUPS.includes(group) && activeCat !== "utility" ? group : "";
  const activeSrc = src === "hb" || src === "book" ? src : "";
  const sort = one(raw.sort);
  const activeSort = SKILL_SORTS.some((s) => s.key === sort && s.key) ? sort : "";
  const cmp = (SKILL_SORTS.find((s) => s.key === activeSort) ?? SKILL_SORTS[0]).cmp;

  // Every skill is rendered; the chips and the search filter on the client
  // (InstantFilter). `show` applies the URL's filters for the initial paint.
  const list = ALL_SKILLS.slice().sort(cmp);
  const show = (s: DccSkill) => matchesSkill(s, needle, activeCat, activeGroup, activeSrc);
  const shown = list.filter(show).length;
  const filtered = Boolean(needle || activeCat || activeGroup || activeSrc);
  const current: SkillQuery = { q: q.trim(), cat: activeCat, group: activeGroup, src: activeSrc, sort: activeSort };
  const activeMeta = SKILL_CATEGORIES.find((c) => c.key === activeCat);
  const noun = activeMeta?.noun ?? "skill";
  const plural = activeMeta?.plural ?? "skills";

  // The weapon-group row only applies to attack skills, so it shows while the
  // category is "All" or "Attack" and goes away under "Utility". The client
  // can only tie a panel to ONE chip value (data-when), so the row is rendered
  // once per value it shows under; a group chip also sets cat=attack.
  const groupRow = (when: string, hidden: boolean) => (
    <div className="mb-3 flex flex-wrap items-center gap-1.5" data-chiprow data-base={chipBase} data-on={chipOn} data-off={chipOff} data-when={`cat:${when}`} hidden={hidden}>
      <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Weapon group</span>
      <a href={withSkill(current, { group: "" })} data-chip="group:" aria-pressed={!activeGroup} className={`${chipBase} ${activeGroup ? chipOff : chipOn}`}>Any</a>
      {GROUPS.map((g) => (
        <a key={g} href={withSkill({ ...current, cat: "attack" }, { group: g })} data-chip={`group:${g};cat:attack`} aria-pressed={activeGroup === g} className={`${chipBase} ${activeGroup === g ? chipOn : chipOff}`}>{g}</a>
      ))}
    </div>
  );

  return (
    <>
      <DccHomebrewEditor kind="dcc-skill" campaigns={campaigns} initial={hbOwn} />

      <InstantFilter>
      <form method="get" action={BASE} className="mb-4 flex gap-2" data-search>
        <input type="hidden" name="tab" value="skills" />
        <input
          type="search"
          name="q"
          defaultValue={q}
          aria-label="Search skills"
          placeholder="Search name or effect…"
          className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--red)]"
        />
        {activeCat ? <input type="hidden" name="cat" value={activeCat} /> : null}
        {activeGroup ? <input type="hidden" name="group" value={activeGroup} /> : null}
        {activeSrc ? <input type="hidden" name="src" value={activeSrc} /> : null}
        {activeSort ? <input type="hidden" name="sort" value={activeSort} /> : null}
        <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]">
          Search
        </button>
      </form>

      <div className="mb-3 flex flex-wrap items-center gap-1.5" data-chiprow data-base={chipBase} data-on={chipOn} data-off={chipOff}>
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Category</span>
        <a href={withSkill(current, { cat: "", group: "" })} data-chip="cat:;group:" aria-pressed={!activeCat} className={`${chipBase} ${activeCat ? chipOff : chipOn}`}>All</a>
        {SKILL_CATEGORIES.map((c) => (
          <a
            key={c.key}
            href={withSkill(current, { cat: c.key, group: c.key === "utility" ? "" : current.group })}
            data-chip={c.key === "utility" ? "cat:utility;group:" : `cat:${c.key}`}
            aria-pressed={activeCat === c.key}
            className={`${chipBase} ${activeCat === c.key ? chipOn : chipOff}`}
          >
            {c.label}
          </a>
        ))}
      </div>

      {GROUPS.length ? groupRow("", activeCat !== "") : null}
      {GROUPS.length ? groupRow("attack", activeCat !== "attack") : null}

      <div className="mb-6 flex flex-wrap items-center gap-1.5" data-chiprow data-base={chipBase} data-on={chipOn} data-off={chipOff}>
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Source</span>
        <a href={withSkill(current, { src: "" })} data-chip="src:" aria-pressed={!activeSrc} className={`${chipBase} ${activeSrc ? chipOff : chipOn}`}>All</a>
        <a href={withSkill(current, { src: "book" })} data-chip="src:book" aria-pressed={activeSrc === "book"} className={`${chipBase} ${activeSrc === "book" ? chipOn : chipOff}`}>Official</a>
        <a href={withSkill(current, { src: "hb" })} data-chip="src:hb" aria-pressed={activeSrc === "hb"} className={`${chipBase} ${activeSrc === "hb" ? chipOn : chipOff}`}>Homebrew</a>
      </div>

      {/* Sorting re-orders on the server, so these stay real navigations;
          data-nav keeps their hrefs in step with the live filters. */}
      <div className="mb-6 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Sort</span>
        {SKILL_SORTS.map((s) => (
          <Link key={s.key || "cat"} href={withSkill(current, { sort: s.key })} data-nav={`sort:${s.key}`} className={`${chipBase} ${activeSort === s.key ? chipOn : chipOff}`}>{s.label}</Link>
        ))}
      </div>

      {/* The noun follows the active category ("attack skills"), so there is
          one count line per category, shown only while that category is set. */}
      <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
        <span data-count data-noun="skill" aria-live="polite" data-when="cat:" hidden={activeCat !== ""}>{shown} {shown === 1 ? noun : plural}</span>
        {SKILL_CATEGORIES.map((c) => (
          <span key={c.key} data-count data-noun={c.noun} data-plural={c.plural} aria-live="polite" data-when={`cat:${c.key}`} hidden={activeCat !== c.key}>{shown} {shown === 1 ? noun : plural}</span>
        ))}
        <Link href={`${BASE}?tab=skills`} data-clear hidden={!filtered} className="text-[var(--red)] hover:underline">Clear filters</Link>
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6" data-empty hidden={shown > 0}>
        <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          No skill matches those filters. Try a broader search or{" "}
          <Link href={`${BASE}?tab=skills`} data-clear className="text-[var(--red)] underline">clear them</Link>.
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 items-start">
        {list.map((s, i) => {
          const catLabel = SKILL_CATEGORIES.find((c) => c.key === s.category)?.label ?? s.category;
          const metaBits = [catLabel, s.group, s.stat ?? undefined].filter(Boolean).join(" · ");
          const hb = s.source === "Homebrew";
          return (
            <li key={`${hb ? "hb" : "bk"}-${s.name}-${i}`} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4" hidden={!show(s)} data-f={facetAttr(skillFacets(s))}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[var(--gold)]">{s.name}</h2>
                <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{metaBits}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {hb ? <span className={hbBadge}>Homebrew</span> : <span className={srcBadge}>{s.source}{s.page ? ` · p.${s.page}` : ""}</span>}
                {s.passive ? <span className={badge}><span className="text-[var(--text)]">Passive</span></span> : null}
                {s.interrupt ? <span className={badge}><span className="text-[var(--text)]">Interrupt</span></span> : null}
                {s.damage ? <Badge label="Damage" value={s.damage + (s.damageType ? ` ${s.damageType}` : "")} /> : null}
                {s.range ? <Badge label="Range" value={s.range} /> : null}
                {s.cooldown ? <Badge label="Cooldown" value={s.cooldown} /> : null}
                {s.limitations ? <Badge label="Limits" value={s.limitations} /> : null}
              </div>
              {s.desc ? <p className="mt-3 text-[13px] leading-relaxed text-[var(--muted)]">{s.desc}</p> : null}
              {s.upgrades.length ? (
                <dl className="mt-3 flex flex-col gap-1.5 border-t border-[var(--border)] pt-3">
                  {s.upgrades.map((u) => (
                    <div key={u.rank} className="flex gap-2 text-[12px] leading-relaxed">
                      <dt className="shrink-0 font-bold uppercase tracking-[0.1em] text-[var(--muted)]">Rank {u.rank}</dt>
                      <dd className="text-[var(--muted)]">{u.text}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </li>
          );
        })}
      </ul>
      </InstantFilter>
    </>
  );
}

// ── SPELLS section ───────────────────────────────────────────────────────────
type SpellQuery = { q?: string; type?: string; stat?: string; src?: string; sort?: string };

const SPELL_TYPES: { key: DccSpell["type"]; label: string; noun: string; plural: string }[] = [
  { key: "attack", label: "Attack", noun: "attack spell", plural: "attack spells" },
  { key: "heal", label: "Healing", noun: "healing spell", plural: "healing spells" },
  { key: "utility", label: "Utility", noun: "utility spell", plural: "utility spells" },
];
const SPELL_SORTS: { key: string; label: string; cmp: (a: DccSpell, b: DccSpell) => number }[] = [
  { key: "", label: "Name", cmp: (a, b) => a.name.localeCompare(b.name, "en") },
  { key: "mana", label: "Mana", cmp: (a, b) => a.mana - b.mana || a.name.localeCompare(b.name, "en") },
  { key: "type", label: "Type", cmp: (a, b) => a.type.localeCompare(b.type, "en") || a.name.localeCompare(b.name, "en") },
];

function withSpell(current: SpellQuery, patch: SpellQuery): string {
  const next = { ...current, ...patch };
  const sp = new URLSearchParams();
  sp.set("tab", "spells");
  if (next.q) sp.set("q", next.q);
  if (next.type) sp.set("type", next.type);
  if (next.stat) sp.set("stat", next.stat);
  if (next.src) sp.set("src", next.src);
  if (next.sort) sp.set("sort", next.sort);
  return `${BASE}?${sp.toString()}`;
}

// The facets the chips test, per spell — the same object the client reads back
// from `data-f` (lib/facets), so server and client always agree.
const spellFacets = (s: DccSpell) => ({ type: s.type, stat: s.stat, src: s.source === "Homebrew" ? "hb" : "book" });

function matchesSpell(s: DccSpell, q: string, type: string, stat: string, src: string): boolean {
  if (!facetMatch(spellFacets(s), { type, stat, src })) return false;
  if (!q) return true;
  return s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q);
}

function validSpell(s: unknown): s is DccSpell {
  const x = s as Record<string, unknown>;
  return !!x && typeof x.name === "string" && Array.isArray(x.upgrades);
}

async function SpellsSection({ userId, raw }: { userId: string; raw: Raw }) {
  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(userId, { type: "dcc-spell" }),
    ownHomebrew(userId, "dcc-spell"),
    userCampaigns(userId),
  ]);
  const hbRows = hbVisible.map((h) => h.data as unknown as DccSpell).filter(validSpell);
  const ALL_SPELLS = [...hbRows, ...DCC_SPELLS];

  const STATS = [...new Set(ALL_SPELLS.map((s) => s.stat))].sort();

  const q = one(raw.q);
  const type = one(raw.type);
  const stat = one(raw.stat);
  const src = one(raw.src);
  const needle = q.trim().toLowerCase();
  const activeType = SPELL_TYPES.some((t) => t.key === type) ? type : "";
  const activeStat = STATS.includes(stat as DccSpell["stat"]) ? stat : "";
  const activeSrc = src === "hb" || src === "book" ? src : "";
  const sort = one(raw.sort);
  const activeSort = SPELL_SORTS.some((s) => s.key === sort && s.key) ? sort : "";
  const cmp = (SPELL_SORTS.find((s) => s.key === activeSort) ?? SPELL_SORTS[0]).cmp;

  // Every spell is rendered; the chips and the search filter on the client
  // (InstantFilter). `show` applies the URL's filters for the initial paint.
  const list = ALL_SPELLS.slice().sort(cmp);
  const show = (s: DccSpell) => matchesSpell(s, needle, activeType, activeStat, activeSrc);
  const shown = list.filter(show).length;
  const filtered = Boolean(needle || activeType || activeStat || activeSrc);
  const current: SpellQuery = { q: q.trim(), type: activeType, stat: activeStat, src: activeSrc, sort: activeSort };
  const activeMeta = SPELL_TYPES.find((t) => t.key === activeType);
  const noun = activeMeta?.noun ?? "spell";
  const plural = activeMeta?.plural ?? "spells";

  return (
    <>
      <DccHomebrewEditor kind="dcc-spell" campaigns={campaigns} initial={hbOwn} />

      <InstantFilter>
      <form method="get" action={BASE} className="mb-4 flex gap-2" data-search>
        <input type="hidden" name="tab" value="spells" />
        <input
          type="search"
          name="q"
          defaultValue={q}
          aria-label="Search spells"
          placeholder="Search name or effect…"
          className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--red)]"
        />
        {activeType ? <input type="hidden" name="type" value={activeType} /> : null}
        {activeStat ? <input type="hidden" name="stat" value={activeStat} /> : null}
        {activeSrc ? <input type="hidden" name="src" value={activeSrc} /> : null}
        {activeSort ? <input type="hidden" name="sort" value={activeSort} /> : null}
        <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]">
          Search
        </button>
      </form>

      <div className="mb-3 flex flex-wrap items-center gap-1.5" data-chiprow data-base={chipBase} data-on={chipOn} data-off={chipOff}>
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Type</span>
        <a href={withSpell(current, { type: "" })} data-chip="type:" aria-pressed={!activeType} className={`${chipBase} ${activeType ? chipOff : chipOn}`}>All</a>
        {SPELL_TYPES.map((t) => (
          <a key={t.key} href={withSpell(current, { type: t.key })} data-chip={`type:${t.key}`} aria-pressed={activeType === t.key} className={`${chipBase} ${activeType === t.key ? chipOn : chipOff}`}>{t.label}</a>
        ))}
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-1.5" data-chiprow data-base={chipBase} data-on={chipOn} data-off={chipOff}>
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Stat</span>
        <a href={withSpell(current, { stat: "" })} data-chip="stat:" aria-pressed={!activeStat} className={`${chipBase} ${activeStat ? chipOff : chipOn}`}>Any</a>
        {STATS.map((st) => (
          <a key={st} href={withSpell(current, { stat: st })} data-chip={`stat:${st}`} aria-pressed={activeStat === st} className={`${chipBase} ${activeStat === st ? chipOn : chipOff}`}>{st}</a>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-1.5" data-chiprow data-base={chipBase} data-on={chipOn} data-off={chipOff}>
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Source</span>
        <a href={withSpell(current, { src: "" })} data-chip="src:" aria-pressed={!activeSrc} className={`${chipBase} ${activeSrc ? chipOff : chipOn}`}>All</a>
        <a href={withSpell(current, { src: "book" })} data-chip="src:book" aria-pressed={activeSrc === "book"} className={`${chipBase} ${activeSrc === "book" ? chipOn : chipOff}`}>Official</a>
        <a href={withSpell(current, { src: "hb" })} data-chip="src:hb" aria-pressed={activeSrc === "hb"} className={`${chipBase} ${activeSrc === "hb" ? chipOn : chipOff}`}>Homebrew</a>
      </div>

      {/* Sorting re-orders on the server, so these stay real navigations;
          data-nav keeps their hrefs in step with the live filters. */}
      <div className="mb-6 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Sort</span>
        {SPELL_SORTS.map((s) => (
          <Link key={s.key || "name"} href={withSpell(current, { sort: s.key })} data-nav={`sort:${s.key}`} className={`${chipBase} ${activeSort === s.key ? chipOn : chipOff}`}>{s.label}</Link>
        ))}
      </div>

      {/* The noun follows the active type ("healing spells"), so there is one
          count line per type, shown only while that type is set. */}
      <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
        <span data-count data-noun="spell" aria-live="polite" data-when="type:" hidden={activeType !== ""}>{shown} {shown === 1 ? noun : plural}</span>
        {SPELL_TYPES.map((t) => (
          <span key={t.key} data-count data-noun={t.noun} data-plural={t.plural} aria-live="polite" data-when={`type:${t.key}`} hidden={activeType !== t.key}>{shown} {shown === 1 ? noun : plural}</span>
        ))}
        <Link href={`${BASE}?tab=spells`} data-clear hidden={!filtered} className="text-[var(--red)] hover:underline">Clear filters</Link>
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6" data-empty hidden={shown > 0}>
        <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          No spell matches those filters. Try a broader search or{" "}
          <Link href={`${BASE}?tab=spells`} data-clear className="text-[var(--red)] underline">clear them</Link>.
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 items-start">
        {list.map((s, i) => {
          const typeLabel = SPELL_TYPES.find((t) => t.key === s.type)?.label ?? s.type;
          const hb = s.source === "Homebrew";
          return (
            <li key={`${hb ? "hb" : "bk"}-${s.name}-${i}`} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4" hidden={!show(s)} data-f={facetAttr(spellFacets(s))}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[var(--gold)]">{s.name}</h2>
                <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{typeLabel} · {s.mana} Mana · {s.stat}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {hb ? <span className={hbBadge}>Homebrew</span> : <span className={srcBadge}>{s.source}{s.page ? ` · p.${s.page}` : ""}</span>}
                {s.passive ? <span className={badge}><span className="text-[var(--text)]">Passive</span></span> : null}
                {typeof s.aiFavor === "number" ? <span className={badge}>AI Favor <span className="text-[var(--text)]">{s.aiFavor}</span></span> : null}
              </div>
              {s.desc ? <p className="mt-3 text-[13px] leading-relaxed text-[var(--muted)]">{s.desc}</p> : null}
              {s.upgrades.length ? (
                <dl className="mt-3 flex flex-col gap-1.5 border-t border-[var(--border)] pt-3">
                  {s.upgrades.map((u) => (
                    <div key={u.rank} className="flex gap-2 text-[12px] leading-relaxed">
                      <dt className="shrink-0 font-bold uppercase tracking-[0.1em] text-[var(--muted)]">Rank {u.rank}</dt>
                      <dd className="text-[var(--muted)]">{u.text}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </li>
          );
        })}
      </ul>
      </InstantFilter>
    </>
  );
}

// ── page ─────────────────────────────────────────────────────────────────────
const TABS = [
  { key: "skills", label: "Skills", count: DCC_SKILLS.length },
  { key: "spells", label: "Spells", count: DCC_SPELLS.length },
] as const;

export default async function DccSkillsSpellsPage({ searchParams }: { searchParams: Promise<Raw> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const raw = await searchParams;
  const tab = one(raw.tab) === "spells" ? "spells" : "skills";

  const tabBtn = (active: boolean) =>
    `rounded border px-3.5 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors ${
      active
        ? "border-[var(--red)] bg-[var(--panel-2)] text-[var(--gold)]"
        : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]"
    }`;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <PageHeader title="Skills &amp; Spells" subtitle={<>{DCC_SKILLS.length} skills · {DCC_SPELLS.length} spells</>} />

      {/* Sub-section toggle — same look as the Options page's section bar */}
      <div className="mb-6 flex flex-wrap gap-2 border-b border-[var(--border)] pb-4">
        {TABS.map((t) => (
          <Link key={t.key} href={`${BASE}?tab=${t.key}`} className={tabBtn(tab === t.key)}>
            {t.label} <span className="opacity-60">{t.count}</span>
          </Link>
        ))}
      </div>

      {tab === "skills" ? <SkillsSection userId={user.id} raw={raw} /> : <SpellsSection userId={user.id} raw={raw} />}
    </div>
  );
}
