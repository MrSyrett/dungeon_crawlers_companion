import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { MMRPG_POWERS } from "@/lib/data/mmrpg-powers";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import {
  MmrpgHeader, SearchForm, ChipRow, CountLine, EmptyState, SectionH, cardCls, nameCls, badge, hbBadge,
  one, type Query, type RawQuery,
} from "@/components/MmrpgRef";

export const dynamic = "force-dynamic";
const BASE = "/mmrpg/powers";
const sd = (o: Record<string, unknown>, k: string) => (typeof o[k] === "string" ? (o[k] as string) : "");

type Row = {
  name: string; powerSet: string; prerequisites?: string; action?: string; duration?: string;
  range?: string; cost?: string; trigger?: string; effect: string; fantastic?: string; homebrew?: boolean;
};

export default async function MmrpgPowersPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "mmrpg-power" }),
    ownHomebrew(user.id, "mmrpg-power"),
    userCampaigns(user.id),
  ]);
  const hbRows: Row[] = hbVisible.map((h) => {
    const d = h.data as Record<string, unknown>;
    return { name: h.name, powerSet: sd(d, "powerSet") || "None", prerequisites: sd(d, "prerequisites"), action: sd(d, "action"), duration: sd(d, "duration"), range: sd(d, "range"), cost: sd(d, "cost"), trigger: sd(d, "trigger"), effect: sd(d, "effect"), fantastic: sd(d, "fantastic"), homebrew: true };
  });
  const ALL: Row[] = [...hbRows, ...MMRPG_POWERS.map((p) => ({ ...p }) as Row)];

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const sets = Array.from(new Set(ALL.map((p) => p.powerSet))).sort((a, b) => (a === "None" ? -1 : b === "None" ? 1 : a.localeCompare(b)));
  const setOpts = sets.map((s) => ({ key: s, label: s === "None" ? "Basic" : s }));
  const set = sets.includes(one(raw.set)) ? one(raw.set) : "";
  const current: Query = { q, set };
  const results = ALL.filter((p) =>
    (!set || p.powerSet === set) &&
    (!needle || [p.name, p.powerSet, p.effect, p.prerequisites ?? ""].join(" ").toLowerCase().includes(needle)),
  );
  const groups = sets.filter((s) => results.some((p) => p.powerSet === s));

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <MmrpgHeader title="Powers" subtitle={`${MMRPG_POWERS.length} powers across the power sets${hbRows.length ? ` + ${hbRows.length} homebrew` : ""}`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Powers are grouped into power sets. A basic power (set &ldquo;None&rdquo;) is available to anyone; the rest require the power set and any listed prerequisites. Numbered powers (Mighty 1, 2, 3…) upgrade in place. Each lists its action, duration, cost and effect.</p>

      <div className="mb-6"><HomebrewEditor kind="mmrpg-power" campaigns={campaigns} initial={hbOwn} /></div>

      <SearchForm base={BASE} q={q} placeholder="Search powers…" hidden={{ set }} />
      <ChipRow label="Power set" base={BASE} current={current} param="set" options={setOpts} active={set} />
      <CountLine count={results.length} noun="power" base={BASE} filtered={Boolean(needle || set)} />

      {results.length === 0 ? <EmptyState noun="power" base={BASE} /> : null}
      {groups.map((s) => (
        <section key={s} className={`${cardCls} mb-4`}>
          <SectionH>{s === "None" ? "Basic Powers" : s}</SectionH>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {results.filter((p) => p.powerSet === s).map((p) => (
              <article key={`${p.homebrew ? "hb" : "bk"}-${p.name}`} className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className={nameCls}>{p.name}</h3>
                  {p.homebrew ? <span className={hbBadge}>Homebrew</span> : null}
                </div>
                <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--muted)]">
                  {p.action ? <span><span className="font-semibold text-[var(--text)]">Action:</span> {p.action}</span> : null}
                  {p.duration ? <span><span className="font-semibold text-[var(--text)]">Duration:</span> {p.duration}</span> : null}
                  {p.cost ? <span className={badge}>{p.cost}</span> : null}
                  {p.prerequisites && p.prerequisites !== "None" ? <span><span className="font-semibold text-[var(--text)]">Prereq:</span> {p.prerequisites}</span> : null}
                </p>
                {p.effect ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{p.effect}</p> : null}
                {p.fantastic ? <p className="mt-2 text-[11px] leading-relaxed text-[#f4737a]"><span className="font-semibold">Fantastic:</span> {p.fantastic}</p> : null}
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
