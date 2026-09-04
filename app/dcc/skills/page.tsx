import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DCC_SKILLS } from "@/lib/data/dcc-skills";
import type { DccSkill } from "@/lib/data/dcc-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import DccHomebrewEditor from "@/components/DccHomebrewEditor";

export const dynamic = "force-dynamic";

type Query = { q?: string; cat?: string; group?: string; src?: string };
type RawQuery = { [K in keyof Query]?: string | string[] };
const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));

// Attack skills lead (they carry damage), then utility; A–Z within each.
const CAT_RANK: Record<DccSkill["category"], number> = { attack: 0, utility: 1 };
const bySkill = (a: DccSkill, b: DccSkill) =>
  CAT_RANK[a.category] - CAT_RANK[b.category] || a.name.localeCompare(b.name, "en");

const CATEGORIES: { key: DccSkill["category"]; label: string; noun: string; plural: string }[] = [
  { key: "attack", label: "Attack", noun: "attack skill", plural: "attack skills" },
  { key: "utility", label: "Utility", noun: "utility skill", plural: "utility skills" },
];

// Weapon/effect groups, only meaningful for attack skills — surfaced as a
// second filter row. Ordered by how the book groups them.
const GROUP_ORDER = [
  "Hand-to-Hand",
  "Damage Effect",
  "Edged",
  "Bashing",
  "Reach",
  "Ranged",
  "Animal/Pet Strike",
];

function withParams(current: Query, patch: Query): string {
  const next = { ...current, ...patch };
  const sp = new URLSearchParams();
  if (next.q) sp.set("q", next.q);
  if (next.cat) sp.set("cat", next.cat);
  if (next.group) sp.set("group", next.group);
  if (next.src) sp.set("src", next.src);
  const s = sp.toString();
  return s ? `/dcc/skills?${s}` : "/dcc/skills";
}

function matches(s: DccSkill, q: string, cat: string, group: string, src: string): boolean {
  if (cat && s.category !== cat) return false;
  if (group && s.group !== group) return false;
  if (src === "hb" && s.source !== "Homebrew") return false;
  if (src === "book" && s.source === "Homebrew") return false;
  if (!q) return true;
  return (
    s.name.toLowerCase().includes(q) ||
    s.desc.toLowerCase().includes(q) ||
    (s.group ?? "").toLowerCase().includes(q)
  );
}

const chipBase =
  "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
const chipOff =
  "border-[var(--border)] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]";
const chipOn = "border-[var(--red)] bg-[var(--panel-2)] text-[#f0a8a3]";
const badge =
  "rounded border border-[var(--border)] px-2 py-1 text-[11px] font-semibold tracking-[0.08em] text-[var(--muted)]";
const hbBadge =
  "rounded border border-[var(--red)] px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#f0a8a3]";

function Badge({ label, value }: { label: string; value: string }) {
  return (
    <span className={badge}>
      {label} <span className="text-[var(--text)]">{value}</span>
    </span>
  );
}

export default async function DccSkillsPage({
  searchParams,
}: {
  searchParams: Promise<RawQuery>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "dcc-skill" }),
    ownHomebrew(user.id, "dcc-skill"),
    userCampaigns(user.id),
  ]);
  const hbRows = hbVisible.map((h) => h.data as unknown as DccSkill);
  const ALL_SKILLS = [...hbRows, ...DCC_SKILLS].sort(bySkill);
  const homebrewCount = hbRows.length;

  // Groups from both book and homebrew skills, ordered by the book's grouping.
  const GROUPS = [...new Set(ALL_SKILLS.map((s) => s.group).filter((g): g is string => !!g))].sort((a, b) => {
    const ia = GROUP_ORDER.indexOf(a);
    const ib = GROUP_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b, "en");
  });

  const raw = await searchParams;
  const q = one(raw.q);
  const cat = one(raw.cat);
  const group = one(raw.group);
  const src = one(raw.src);
  const needle = q.trim().toLowerCase();
  const activeCat = CATEGORIES.some((c) => c.key === cat) ? cat : "";
  // The group filter only makes sense alongside attack skills; ignore it otherwise.
  const activeGroup = GROUPS.includes(group) && activeCat !== "utility" ? group : "";
  const activeSrc = src === "hb" || src === "book" ? src : "";

  const results = ALL_SKILLS.filter((s) => matches(s, needle, activeCat, activeGroup, activeSrc));
  const filtered = Boolean(needle || activeCat || activeGroup || activeSrc);
  const current: Query = { q: q.trim(), cat: activeCat, group: activeGroup, src: activeSrc };
  const activeMeta = CATEGORIES.find((c) => c.key === activeCat);
  const noun = activeMeta?.noun ?? "skill";
  const plural = activeMeta?.plural ?? "skills";

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-display text-3xl font-black tracking-wide">Skills</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--red)] sm:text-[11px] sm:tracking-[0.35em]">
            {DCC_SKILLS.length} skills{homebrewCount ? ` + ${homebrewCount} homebrew` : ""}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Link href="/dcc/homebrew" className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]">My Homebrew</Link>
          <Link
          href="/dashboard"
          className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]"
        >
          ← Home
        </Link>
        </div>
      </header>

      <DccHomebrewEditor kind="dcc-skill" campaigns={campaigns} initial={hbOwn} />

      <form method="get" action="/dcc/skills" className="mb-4 flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search name or effect…"
          className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--red)]"
        />
        {activeCat ? <input type="hidden" name="cat" value={activeCat} /> : null}
        {activeGroup ? <input type="hidden" name="group" value={activeGroup} /> : null}
        {activeSrc ? <input type="hidden" name="src" value={activeSrc} /> : null}
        <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]">
          Search
        </button>
      </form>

      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
          Category
        </span>
        <Link
          href={withParams(current, { cat: "", group: "" })}
          className={`${chipBase} ${activeCat ? chipOff : chipOn}`}
        >
          All
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.key}
            href={withParams(current, { cat: c.key, group: c.key === "utility" ? "" : current.group })}
            className={`${chipBase} ${activeCat === c.key ? chipOn : chipOff}`}
          >
            {c.label}
          </Link>
        ))}
      </div>

      {activeCat !== "utility" && GROUPS.length ? (
        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
            Weapon group
          </span>
          <Link
            href={withParams(current, { group: "" })}
            className={`${chipBase} ${activeGroup ? chipOff : chipOn}`}
          >
            Any
          </Link>
          {GROUPS.map((g) => (
            <Link
              key={g}
              href={withParams({ ...current, cat: "attack" }, { group: g })}
              className={`${chipBase} ${activeGroup === g ? chipOn : chipOff}`}
            >
              {g}
            </Link>
          ))}
        </div>
      ) : null}

      <div className="mb-6 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Source</span>
        <Link href={withParams(current, { src: "" })} className={`${chipBase} ${activeSrc ? chipOff : chipOn}`}>All</Link>
        <Link href={withParams(current, { src: "book" })} className={`${chipBase} ${activeSrc === "book" ? chipOn : chipOff}`}>Official</Link>
        <Link href={withParams(current, { src: "hb" })} className={`${chipBase} ${activeSrc === "hb" ? chipOn : chipOff}`}>Homebrew</Link>
      </div>

      <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
        <span>
          {results.length} {results.length === 1 ? noun : plural}
        </span>
        {filtered ? (
          <Link href="/dcc/skills" className="text-[var(--red)] hover:underline">
            Clear filters
          </Link>
        ) : null}
      </div>

      {results.length === 0 ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6">
          <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            No skill matches those filters. Try a broader search or{" "}
            <Link href="/dcc/skills" className="text-[var(--red)] underline">
              clear them
            </Link>
            .
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 items-start">
          {results.map((s, i) => {
            const catLabel = CATEGORIES.find((c) => c.key === s.category)?.label ?? s.category;
            const metaBits = [catLabel, s.group, s.stat ?? undefined].filter(Boolean).join(" · ");
            const hb = s.source === "Homebrew";
            return (
              <li key={`${hb ? "hb" : "bk"}-${s.name}-${i}`} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#f0a8a3]">{s.name}</h2>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{metaBits}</span>
                </div>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {hb ? <span className={hbBadge}>Homebrew</span> : null}
                  {s.passive ? <span className={badge}><span className="text-[var(--text)]">Passive</span></span> : null}
                  {s.interrupt ? <span className={badge}><span className="text-[var(--text)]">Interrupt</span></span> : null}
                  {s.damage ? <Badge label="Damage" value={s.damage + (s.damageType ? ` ${s.damageType}` : "")} /> : null}
                  {s.range ? <Badge label="Range" value={s.range} /> : null}
                  {s.cooldown ? <Badge label="Cooldown" value={s.cooldown} /> : null}
                  {s.limitations ? <Badge label="Limits" value={s.limitations} /> : null}
                </div>

                {s.desc ? (
                  <p className="mt-3 text-[13px] leading-relaxed text-[var(--muted)]">{s.desc}</p>
                ) : null}

                {s.upgrades.length ? (
                  <dl className="mt-3 flex flex-col gap-1.5 border-t border-[var(--border)] pt-3">
                    {s.upgrades.map((u) => (
                      <div key={u.rank} className="flex gap-2 text-[12px] leading-relaxed">
                        <dt className="shrink-0 font-bold uppercase tracking-[0.1em] text-[var(--muted)]">
                          Rank {u.rank}
                        </dt>
                        <dd className="text-[var(--muted)]">{u.text}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
