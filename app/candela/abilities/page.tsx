import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { CO_ROLES } from "@/lib/data/candela-data";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import {
  CandelaHeader, SearchForm, ChipRow, CountLine, EmptyState, cardCls, nameCls, badge, hbBadge,
  one, type Query, type RawQuery,
} from "@/components/CandelaRef";

export const dynamic = "force-dynamic";
const BASE = "/candela/abilities";

type Row = { name: string; source: string; owner: string; desc: string; homebrew?: boolean };

const SOURCES = [{ key: "Role", label: "Role" }, { key: "Specialty", label: "Specialty" }];

export default async function Page({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "co-ability" }),
    ownHomebrew(user.id, "co-ability"),
    userCampaigns(user.id),
  ]);

  const book: Row[] = [];
  for (const r of CO_ROLES) {
    for (const a of r.abilities) book.push({ name: a.name, source: "Role", owner: r.role, desc: a.desc });
    for (const sp of r.specialties) for (const a of sp.abilities) book.push({ name: a.name, source: "Specialty", owner: sp.name, desc: a.desc });
  }
  const hbRows: Row[] = hbVisible.map((h) => {
    const d = h.data as Record<string, unknown>;
    return { name: h.name, source: typeof d.source === "string" ? d.source : "Role", owner: typeof d.owner === "string" ? d.owner : "", desc: typeof d.desc === "string" ? d.desc : "", homebrew: true };
  });
  const ALL = [...hbRows, ...book];

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const source = SOURCES.some((s) => s.key === one(raw.source)) ? one(raw.source) : "";
  const current: Query = { q, source };
  const results = ALL.filter((a) =>
    (!source || a.source === source) &&
    (!needle || [a.name, a.owner, a.desc].join(" ").toLowerCase().includes(needle)),
  );
  const filtered = Boolean(needle || source);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <CandelaHeader title="Abilities" subtitle={`Candela Obscura · Role & Specialty${hbRows.length ? ` + ${hbRows.length} homebrew` : ""}`} />
      <p className="mb-5 text-[13px] leading-relaxed text-[var(--muted)]">Choose one role ability and one specialty ability at character creation. Homebrew you create below is merged in.</p>

      <div className="mb-6"><HomebrewEditor kind="co-ability" campaigns={campaigns} initial={hbOwn} /></div>

      <SearchForm base={BASE} q={q} placeholder="Search abilities…" hidden={{ source }} />
      <ChipRow label="Source" base={BASE} current={current} param="source" options={SOURCES} active={source} />
      <CountLine count={results.length} noun="ability" base={BASE} filtered={filtered} />

      {results.length === 0 ? (
        <EmptyState noun="ability" base={BASE} />
      ) : (
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {results.map((a, i) => (
            <li key={`${a.homebrew ? "hb" : "bk"}-${a.name}-${i}`} className={cardCls}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className={nameCls}>{a.name}</h2>
                {a.homebrew ? <span className={hbBadge}>Homebrew</span> : <span className={badge}>{a.source}{a.owner ? ` · ${a.owner}` : ""}</span>}
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{a.desc}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
