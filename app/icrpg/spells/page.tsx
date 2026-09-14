import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ICRPG_SPELLS } from "@/lib/data/icrpg-spells";
import type { IcrpgSpell } from "@/lib/data/icrpg-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import {
  IcrpgHeader, SearchForm, ChipRow, CountLine, EmptyState, cardCls, nameCls, badge, hbBadge,
  one, type Query, type RawQuery,
} from "@/components/IcrpgRef";

export const dynamic = "force-dynamic";
const BASE = "/icrpg/spells";

type Row = IcrpgSpell & { homebrew?: boolean };

function hbToSpell(data: Record<string, unknown>, name: string): Row {
  const s = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
  return { name, school: s("school") || "Magic", desc: s("desc"), target: s("target") || undefined, effort: s("effort") || undefined, homebrew: true };
}

export default async function IcrpgSpellsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "icrpg-spell" }),
    ownHomebrew(user.id, "icrpg-spell"),
    userCampaigns(user.id),
  ]);
  const hbRows: Row[] = hbVisible.map((h) => hbToSpell(h.data as Record<string, unknown>, h.name));
  const ALL: Row[] = [...hbRows, ...ICRPG_SPELLS.map((s) => ({ ...s }))];

  // Schools are data-driven so homebrew schools appear as chips too.
  const schoolSet = Array.from(new Set(ALL.map((s) => s.school).filter(Boolean))).sort((a, b) => a.localeCompare(b, "en"));
  const SCHOOLS = schoolSet.map((k) => ({ key: k, label: k }));

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const school = schoolSet.includes(one(raw.school)) ? one(raw.school) : "";
  const current: Query = { q, school };
  const results = ALL.filter((s) =>
    (!school || s.school === school) &&
    (!needle || [s.name, s.school, s.desc, s.target ?? "", s.effort ?? ""].join(" ").toLowerCase().includes(needle)),
  ).sort((a, b) => a.name.localeCompare(b.name, "en"));
  const filtered = Boolean(needle || school);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <IcrpgHeader title="Spells" subtitle={`${ICRPG_SPELLS.length} spells${hbRows.length ? ` + ${hbRows.length} homebrew` : ""}`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Casting is a d20 + stat roll vs the TARGET; success unleashes the effect, often with Magic EFFORT (d10). A natural 1 can backfire — the GM decides how the magic turns on you.</p>

      <div className="mb-6"><HomebrewEditor kind="icrpg-spell" campaigns={campaigns} initial={hbOwn} /></div>

      <SearchForm base={BASE} q={q} placeholder="Search spells…" hidden={{ school }} />
      {SCHOOLS.length > 1 ? <ChipRow label="School" base={BASE} current={current} param="school" options={SCHOOLS} active={school} /> : null}
      <CountLine count={results.length} noun="spell" base={BASE} filtered={filtered} />

      {results.length === 0 ? (
        <EmptyState noun="spell" base={BASE} />
      ) : (
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {results.map((s) => (
            <li key={`${s.homebrew ? "hb" : "bk"}-${s.name}`} className={cardCls}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className={nameCls}>{s.name}</h2>
                {s.homebrew ? <span className={hbBadge}>Homebrew</span> : <span className={badge}>{s.school}</span>}
                {s.target ? <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{s.target}</span> : null}
              </div>
              {s.effort ? <p className="mt-2 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Effort:</span> {s.effort}</p> : null}
              {s.desc ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{s.desc}</p> : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
