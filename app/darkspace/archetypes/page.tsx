import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DS_ARCHETYPES, type DsArchetype } from "@/lib/data/darkspace-rules-data";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import {
  DarkSpaceHeader, SearchForm, CountLine, EmptyState, EffectChips, cardCls, nameCls, badge, accentBadge, hbBadge,
  one, type Effectish, type RawQuery,
} from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";
const BASE = "/darkspace/archetypes";

type EffRow = { text: string; effects: Effectish[]; choose?: boolean };
type Row = DsArchetype & { homebrew?: boolean; featureRows?: EffRow[]; talentRows?: EffRow[] };

function effRows(v: unknown): EffRow[] {
  return (Array.isArray(v) ? v : [])
    .map((r) => {
      const o = (r ?? {}) as Record<string, unknown>;
      return { text: typeof o.text === "string" ? o.text : "", effects: Array.isArray(o.effects) ? (o.effects as Effectish[]) : [], choose: o.choose === true };
    })
    .filter((r) => r.text || r.effects.length);
}

function hbToArchetype(data: Record<string, unknown>, name: string): Row {
  const s = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
  const caster = s("caster");
  const featureRows = effRows(data.features);
  const talentRows = effRows(data.talent);
  const t = (data.titles ?? null) as Record<string, unknown> | null;
  const strList = (v: unknown) => (Array.isArray(v) ? (v as unknown[]).map((x) => String(x)) : []);
  const ranks = t && [t.Lawful, t.Neutral, t.Chaotic].some((c) => strList(c).some((x) => x.trim()))
    ? { Lawful: strList(t.Lawful), Neutral: strList(t.Neutral), Chaotic: strList(t.Chaotic) }
    : null;
  return {
    name, hd: s("hd") || "1d6", weapons: s("weapons"), armor: s("armor"),
    caster: caster && caster !== "None" ? caster : null,
    features: featureRows.map((f) => f.text), featureRows, talentRows, ranks, homebrew: true,
  };
}

export default async function Page({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "ds-class" }),
    ownHomebrew(user.id, "ds-class"),
    userCampaigns(user.id),
  ]);
  const hbRows: Row[] = hbVisible.map((h) => hbToArchetype(h.data as Record<string, unknown>, h.name));
  const ALL: Row[] = [...hbRows, ...DS_ARCHETYPES.map((a) => ({ ...a }))];

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const results = ALL.filter((a) => !needle || [a.name, a.weapons, a.armor, a.caster ?? "", a.features.join(" ")].join(" ").toLowerCase().includes(needle));

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <DarkSpaceHeader title="Classes" subtitle={`HeroDark · Classes${hbRows.length ? ` + ${hbRows.length} homebrew` : ""}`} />

      <div className="mb-6"><HomebrewEditor kind="ds-class" campaigns={campaigns} initial={hbOwn} /></div>

      <SearchForm base={BASE} q={q} placeholder="Search classes…" hidden={{}} />
      <CountLine count={results.length} noun="class" base={BASE} filtered={Boolean(needle)} />

      {results.length === 0 ? (
        <EmptyState noun="class" base={BASE} />
      ) : (
        <div className="grid items-start gap-4 md:grid-cols-2">
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
              {a.featureRows && a.featureRows.length ? (
                <ul className="mt-2 space-y-2">
                  {a.featureRows.map((f, i) => (
                    <li key={i} className="text-[13px] leading-relaxed text-[var(--text)]">
                      {f.text}{f.choose ? <span className="ml-1 text-[11px] text-[var(--muted)]">(choose one)</span> : null}
                      <EffectChips items={f.effects} kind="effect" />
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="mt-2 space-y-1">
                  {a.features.map((f, i) => (
                    <li key={i} className="text-[13px] leading-relaxed text-[var(--text)]">{f}</li>
                  ))}
                </ul>
              )}
              {a.talentRows && a.talentRows.length ? (
                <details className="mt-3 border-t border-[var(--border)] pt-3">
                  <summary className="cursor-pointer text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)] hover:text-[var(--text)]">Talents (2d6)</summary>
                  <div className="mt-2 space-y-2">
                    {a.talentRows.map((t, i) => (
                      <div key={i} className="text-[13px] leading-relaxed text-[var(--text)]">
                        {t.text}{t.choose ? <span className="ml-1 text-[11px] text-[var(--muted)]">(choose one)</span> : null}
                        <EffectChips items={t.effects} kind="effect" />
                      </div>
                    ))}
                  </div>
                </details>
              ) : null}
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
