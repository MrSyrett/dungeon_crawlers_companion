import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { YZE_WEAPONS } from "@/lib/data/yze-data";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { YzeHeader, SearchForm, CountLine, EmptyState, one, type RawQuery } from "@/components/YzeRef";

export const dynamic = "force-dynamic";
const BASE = "/yze/weapons";

type Row = { name: string; grip: string; bonus: string; damage: string; range: string; weight: string; skill: string; homebrew?: boolean };

export default async function Page({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "yze-weapon" }),
    ownHomebrew(user.id, "yze-weapon"),
    userCampaigns(user.id),
  ]);

  const book: Row[] = YZE_WEAPONS.map((w) => ({
    name: w.name, grip: w.grip, bonus: w.bonus, damage: String(w.damage), range: w.range, weight: w.weight, skill: w.skill,
  }));
  const hbRows: Row[] = hbVisible.map((h) => {
    const d = h.data as Record<string, unknown>;
    const s = (k: string) => (typeof d[k] === "string" ? (d[k] as string) : "");
    return { name: h.name, grip: s("grip") || "—", bonus: s("bonus") || "—", damage: d.damage != null ? String(d.damage) : "1", range: s("range") || "Engaged", weight: s("weight") || "1", skill: s("skill") || "Melee", homebrew: true };
  });
  const ALL = [...hbRows, ...book];

  const raw = await searchParams;
  const q = one(raw.q).trim();
  const needle = q.toLowerCase();
  const results = ALL.filter((w) => !needle || [w.name, w.range, w.skill].join(" ").toLowerCase().includes(needle));

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <YzeHeader title="Weapons" subtitle={`Year Zero Engine · SRD examples${hbRows.length ? ` + ${hbRows.length} homebrew` : ""}`} />
      <p className="mb-5 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
        Bonus dice add to your attack pool; damage is the base rating, +1 per extra success. Weight
        is how many inventory slots the weapon takes. Homebrew you create below is merged in.
      </p>

      <div className="mb-6"><HomebrewEditor kind="yze-weapon" campaigns={campaigns} initial={hbOwn} /></div>

      <SearchForm base={BASE} q={q} placeholder="Search weapons…" hidden={{}} />
      <CountLine count={results.length} noun="weapon" base={BASE} filtered={Boolean(needle)} />

      {results.length === 0 ? (
        <EmptyState noun="weapon" base={BASE} />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]">
                <th className="p-2">Weapon</th><th className="p-2">Grip</th><th className="p-2">Bonus</th><th className="p-2">Dmg</th><th className="p-2">Range</th><th className="p-2">Skill</th><th className="p-2">Wt</th>
              </tr>
            </thead>
            <tbody>
              {results.map((w, i) => (
                <tr key={`${w.homebrew ? "hb" : "bk"}-${w.name}-${i}`} className="border-t border-[var(--border)]">
                  <td className="p-2 font-semibold text-[#e6a04a]">{w.name}{w.homebrew ? <span className="ml-2 rounded border border-[var(--yze)] px-1 py-0.5 text-[8px] uppercase tracking-[0.1em] text-[#e6a04a]">HB</span> : null}</td>
                  <td className="p-2 text-[var(--muted)]">{w.grip}</td>
                  <td className="p-2 font-mono">{w.bonus}</td>
                  <td className="p-2 font-mono">{w.damage}</td>
                  <td className="p-2">{w.range}</td>
                  <td className="p-2 text-[var(--muted)]">{w.skill}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{w.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
