import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DS_ARCHETYPES, type DsArchetype } from "@/lib/data/darkspace-rules-data";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import {
  DarkSpaceHeader, SearchForm, CountLine, EmptyState, cardCls, nameCls, badge, accentBadge, hbBadge,
  one, type RawQuery,
} from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";
const BASE = "/darkspace/archetypes";

type Row = DsArchetype & { homebrew?: boolean };

function hbToArchetype(data: Record<string, unknown>, name: string): Row {
  const s = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
  const list = (k: string) => (Array.isArray(data[k]) ? (data[k] as unknown[]) : []).filter((x): x is string => typeof x === "string");
  const caster = s("caster");
  return {
    name, hd: s("hd") || "1d6", weapons: s("weapons"), armor: s("armor"),
    caster: caster && caster !== "None" ? caster : null,
    features: list("features"), ranks: null, homebrew: true,
  };
}

export default async function Page({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "ds-archetype" }),
    ownHomebrew(user.id, "ds-archetype"),
    userCampaigns(user.id),
  ]);
  const hbRows: Row[] = hbVisible.map((h) => hbToArchetype(h.data as Record<string, unknown>, h.name));
  const ALL: Row[] = [...hbRows, ...DS_ARCHETYPES.map((a) => ({ ...a }))];

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const results = ALL.filter((a) => !needle || [a.name, a.weapons, a.armor, a.caster ?? "", a.features.join(" ")].join(" ").toLowerCase().includes(needle));

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <DarkSpaceHeader title="Archetypes" subtitle={`DarkSpace · Character Roles${hbRows.length ? ` + ${hbRows.length} homebrew` : ""}`} />

      <div className="mb-6"><HomebrewEditor kind="ds-archetype" campaigns={campaigns} initial={hbOwn} /></div>

      <SearchForm base={BASE} q={q} placeholder="Search archetypes…" hidden={{}} />
      <CountLine count={results.length} noun="archetype" base={BASE} filtered={Boolean(needle)} />

      {results.length === 0 ? (
        <EmptyState noun="archetype" base={BASE} />
      ) : (
        <div className="space-y-4">
          {results.map((a) => (
            <div key={(a.homebrew ? "hb-" : "bk-") + a.name} className={cardCls}>
              <div className="flex flex-wrap items-center gap-2">
                <span className={nameCls}>{a.name}</span>
                <span className={badge}>HD {a.hd}</span>
                {a.caster ? <span className={accentBadge}>Caster · {a.caster}</span> : null}
                {a.homebrew ? <span className={hbBadge}>Homebrew</span> : null}
              </div>
              {a.weapons ? <p className="mt-2 text-[13px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Weapons:</span> {a.weapons}</p> : null}
              {a.armor ? <p className="text-[13px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Armor:</span> {a.armor}</p> : null}
              <ul className="mt-2 space-y-1">
                {a.features.map((f, i) => (
                  <li key={i} className="text-[13px] leading-relaxed text-[var(--text)]">{f}</li>
                ))}
              </ul>
              {a.ranks ? (
                <div className="mt-3 space-y-1 border-t border-[var(--border)] pt-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">Ranks</p>
                  {Object.entries(a.ranks).map(([align, tiers]) => (
                    <p key={align} className="text-[12px] text-[var(--muted)]">
                      <span className="font-semibold text-[#24c3d6]">{align}:</span> {tiers.join(" · ")}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
