import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { YZE_COVER } from "@/lib/data/yze-data";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { YzeHeader, SearchForm, CountLine, EmptyState, cardCls, nameCls, hbBadge, one, type RawQuery } from "@/components/YzeRef";

export const dynamic = "force-dynamic";
const BASE = "/yze/gear";

type Row = { name: string; weight: string; desc: string; homebrew?: boolean };

export default async function Page({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "yze-gear" }),
    ownHomebrew(user.id, "yze-gear"),
    userCampaigns(user.id),
  ]);

  const hbRows: Row[] = hbVisible.map((h) => {
    const d = h.data as Record<string, unknown>;
    return { name: h.name, weight: typeof d.weight === "string" ? d.weight : "1", desc: typeof d.desc === "string" ? d.desc : "", homebrew: true };
  });

  const raw = await searchParams;
  const q = one(raw.q).trim();
  const needle = q.toLowerCase();
  const results = hbRows.filter((g) => !needle || [g.name, g.desc].join(" ").toLowerCase().includes(needle));

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <YzeHeader title="Gear & Encumbrance" subtitle={`Year Zero Engine · SRD v1.0${hbRows.length ? ` · ${hbRows.length} homebrew` : ""}`} />

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em] text-[#e6a04a]">Encumbrance</h2>
        <p className="max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
          You can carry regular items up to your carry limit, equal to double your Strength score.
          Heavier items count as two or more; light items count as ½ or ¼. Tiny items (hideable in a
          closed fist) don&rsquo;t affect encumbrance. A backpack adds carry limit but gives −2 to
          Mobility rolls while worn.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em] text-[#e6a04a]">Armor & cover</h2>
        <p className="mb-3 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
          Body armor has a numeric rating; when hit, roll that many D6 and each 6 stops one point of
          damage. Cover works like armor but only against ranged attacks. Armor does nothing against
          damage from pushing a roll.
        </p>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]">
                <th className="p-2">Barrier</th><th className="p-2">Armor rating (dice pool)</th><th className="p-2">Step die</th>
              </tr>
            </thead>
            <tbody>
              {YZE_COVER.map((c) => (
                <tr key={c.barrier} className="border-t border-[var(--border)]">
                  <td className="p-2 font-semibold text-[#e6a04a]">{c.barrier}</td>
                  <td className="p-2 font-mono">{c.rating}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{c.die}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em] text-[#e6a04a]">Your homebrew gear</h2>
        <p className="mb-4 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
          The SRD ships no fixed gear list — gear is setting-specific. Add your own below; it shows in
          the character sheet&rsquo;s gear picker.
        </p>
        <div className="mb-6"><HomebrewEditor kind="yze-gear" campaigns={campaigns} initial={hbOwn} /></div>

        <SearchForm base={BASE} q={q} placeholder="Search your gear…" hidden={{}} />
        <CountLine count={results.length} noun="item" base={BASE} filtered={Boolean(needle)} />
        {results.length === 0 ? (
          hbRows.length === 0 ? (
            <p className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6 text-sm text-[var(--muted)]">No homebrew gear yet — add some above.</p>
          ) : (
            <EmptyState noun="item" base={BASE} />
          )
        ) : (
          <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
            {results.map((g, i) => (
              <li key={`${g.name}-${i}`} className={cardCls}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className={nameCls}>{g.name}</h3>
                  <span className={hbBadge}>{g.weight} wt</span>
                </div>
                {g.desc ? <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{g.desc}</p> : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
