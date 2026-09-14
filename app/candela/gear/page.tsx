import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { CO_GEAR, CO_ROLES, CO_MARKS } from "@/lib/data/candela-data";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import {
  CandelaHeader, SearchForm, CountLine, EmptyState, cardCls, nameCls, badge, hbBadge,
  one, type RawQuery,
} from "@/components/CandelaRef";

export const dynamic = "force-dynamic";
const BASE = "/candela/gear";

type Row = { name: string; type: string; desc: string; homebrew?: boolean };

export default async function Page({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "co-gear" }),
    ownHomebrew(user.id, "co-gear"),
    userCampaigns(user.id),
  ]);

  const book: Row[] = CO_GEAR.map((g) => ({ name: g.name, type: g.type, desc: g.desc }));
  // Specialty gear examples, listed so they're searchable too.
  for (const r of CO_ROLES) for (const sp of r.specialties) for (const g of sp.gear) book.push({ name: g, type: `${sp.name} gear`, desc: "" });
  const hbRows: Row[] = hbVisible.map((h) => {
    const d = h.data as Record<string, unknown>;
    return { name: h.name, type: typeof d.type === "string" ? d.type : "Gear", desc: typeof d.desc === "string" ? d.desc : "", homebrew: true };
  });
  const ALL = [...hbRows, ...book];

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const results = ALL.filter((g) => !needle || [g.name, g.type, g.desc].join(" ").toLowerCase().includes(needle));

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <CandelaHeader title="Gear & Harm" subtitle={`Candela Obscura · Equipment${hbRows.length ? ` + ${hbRows.length} homebrew` : ""}`} />
      <p className="mb-5 text-[13px] leading-relaxed text-[var(--muted)]">
        Up to three gear slots per assignment, declared as needed. Standard gear is available to any
        member; each specialty also carries its own. Homebrew you create below is merged in.
      </p>

      <div className="mb-6"><HomebrewEditor kind="co-gear" campaigns={campaigns} initial={hbOwn} /></div>

      <SearchForm base={BASE} q={q} placeholder="Search gear…" hidden={{}} />
      <CountLine count={results.length} noun="item" base={BASE} filtered={Boolean(needle)} />

      {results.length === 0 ? (
        <EmptyState noun="item" base={BASE} />
      ) : (
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {results.map((g, i) => (
            <li key={`${g.homebrew ? "hb" : "bk"}-${g.name}-${i}`} className={cardCls}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className={nameCls}>{g.name}</h2>
                {g.homebrew ? <span className={hbBadge}>Homebrew</span> : <span className={badge}>{g.type}</span>}
              </div>
              {g.desc ? <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{g.desc}</p> : null}
            </li>
          ))}
        </ul>
      )}

      <div className={`${cardCls} mt-6`}>
        <span className={nameCls}>Marks &amp; Scars</span>
        <ul className="mt-2 space-y-1.5">
          {CO_MARKS.map((m) => (
            <li key={m.name} className="text-[13px] leading-relaxed text-[var(--text)]">
              <span className="font-semibold text-[#3fc2b0]">{m.name}.</span> {m.desc}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[12px] text-[var(--muted)]">
          A category holds 3 marks; a 4th drops you incapacitated and becomes a scar — clear the track,
          note the scar, and shift one action point. Some gear and abilities soak marks.
        </p>
      </div>
    </div>
  );
}
