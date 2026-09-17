import { MMRPG_STARSHIP_TRAITS } from "@/lib/data/mmrpg-starship-traits";
import { MMRPG_STARSHIP_TAGS } from "@/lib/data/mmrpg-starship-tags";
import { MMRPG_STARSHIP_PROFILES } from "@/lib/data/mmrpg-starship-profiles";
import HomebrewEditor, { type CampaignRef, type HomebrewRecord } from "@/components/HomebrewEditor";
import { SectionH, cardCls, badge, hbBadge } from "@/components/MmrpgRef";

// The Starships section of the Equipment page: a homebrew builder (kind
// "mmrpg-starship"), the user's saved ships + the book's sample starship profiles
// as cards, and a reference of the ship-specific traits (with downtime) and tags.
// Large starships use a Headquarters profile plus the ship-specific systems below.

type ShipTrait = { name: string; n?: number };
type ShipTag = { name: string; note?: string };
type Ship = {
  name: string; teamRank: number | string; blurb?: string;
  health?: number; size?: string; passengers?: number; damageReduction?: string; flightSpeed?: number;
  traits: ShipTrait[]; tags: ShipTag[];
  traitBudget?: number; traitsUsed?: number; warnings?: string[]; homebrew?: boolean;
};

// Team rank -> Size / passengers / Health (Secret Wars p183).
const SIZE_TABLE = [
  { rank: 1, size: "Average", passengers: 1, health: 100 },
  { rank: 2, size: "Big", passengers: 2, health: 200 },
  { rank: 3, size: "Huge", passengers: 5, health: 300 },
  { rank: 4, size: "Gigantic", passengers: 20, health: 400 },
  { rank: 5, size: "Titanic", passengers: 80, health: 600 },
  { rank: 6, size: "Gargantuan", passengers: 320, health: 1000 },
];

const traitLabel = (t: ShipTrait) => (t.n && t.n > 1 ? `${t.name} ×${t.n}` : t.name);
const tagLabel = (t: ShipTag) => (t.note ? `${t.name} (${t.note})` : t.name);

function ShipCard({ s }: { s: Ship }) {
  const rankNum = typeof s.teamRank === "number" ? s.teamRank : Number(s.teamRank);
  const budget = s.traitBudget ?? (Number.isFinite(rankNum) ? rankNum * 3 : null);
  const used = s.traitsUsed ?? s.traits.reduce((a, t) => a + (t.n || 1), 0);
  const over = budget != null && used > budget;
  return (
    <article className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-base font-bold uppercase tracking-[0.12em] text-[#f4737a]">{s.name}</h3>
        <span className="flex items-center gap-1.5">
          {s.homebrew ? <span className={hbBadge}>Homebrew</span> : null}
          <span className={badge}>Rank {s.teamRank}</span>
          <span className={badge} style={over ? { color: "var(--mmrpg)", borderColor: "var(--mmrpg)" } : undefined}>{budget != null ? `${used}/${budget}` : used} traits</span>
        </span>
      </div>
      {s.blurb ? <p className="mt-1 text-[12px] italic leading-relaxed text-[var(--muted)]">{s.blurb}</p> : null}
      <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--muted)]">
        {s.size ? <span><span className="font-semibold text-[var(--text)]">Size:</span> {s.size}</span> : null}
        {s.health != null ? <span><span className="font-semibold text-[var(--text)]">Health:</span> {s.health}</span> : null}
        {s.damageReduction && s.damageReduction !== "—" ? <span><span className="font-semibold text-[var(--text)]">DR:</span> {s.damageReduction}</span> : null}
        {s.passengers != null ? <span><span className="font-semibold text-[var(--text)]">Passengers:</span> {s.passengers}</span> : null}
        {s.flightSpeed != null ? <span><span className="font-semibold text-[var(--text)]">Flight:</span> {s.flightSpeed}</span> : null}
      </p>
      {s.traits.length ? (
        <p className="mt-2 text-[12px] leading-relaxed text-[var(--text)]"><span className="font-semibold text-[var(--mmrpg)]">Traits:</span> {s.traits.map(traitLabel).join(", ")}</p>
      ) : null}
      {s.tags.length ? (
        <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Tags:</span> {s.tags.map(tagLabel).join(", ")}</p>
      ) : null}
      {s.warnings?.length ? (
        <p className="mt-1.5 text-[11px] leading-relaxed text-[var(--mmrpg)]">⚠ {s.warnings.join(" · ")}</p>
      ) : null}
    </article>
  );
}

export default function MmrpgStarships({ campaigns, own, visible }: { campaigns: CampaignRef[]; own: HomebrewRecord[]; visible: HomebrewRecord[] }) {
  const homebrew: Ship[] = visible.map((h) => ({ ...(h.data as unknown as Ship), name: h.name, homebrew: true }));
  const samples = MMRPG_STARSHIP_PROFILES as unknown as Ship[];

  return (
    <section className={`${cardCls} mb-4`}>
      <SectionH>Starships</SectionH>
      <p className="mb-3 mt-2 text-[13px] leading-relaxed text-[var(--muted)]">A starfaring ship works like a mobile headquarters. Larger craft use a <b>Headquarters profile</b> (3 traits per team rank) plus ship-specific systems — <b>Shields</b>, <b>Plasma Cannons</b>, <b>Mines</b>, <b>Star Drive</b>, <b>Boarding Equipment</b> — and the <b>FTL Drive</b> / <b>Spaceworthy</b> tags. A ship&rsquo;s team rank sets its Size, Health and passenger capacity. Build your own below, then browse the famous ships of the Multiverse.</p>

      <div className="mb-4 overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-[12px]">
          <thead>
            <tr className="border-b border-[var(--border)] text-left text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
              <th className="py-1 pr-3">Team Rank</th><th className="py-1 pr-3">Size</th><th className="py-1 pr-3">Passengers</th><th className="py-1">Health</th>
            </tr>
          </thead>
          <tbody>
            {SIZE_TABLE.map((r) => (
              <tr key={r.rank} className="border-b border-[var(--border)]/50 text-[var(--muted)]">
                <td className="py-1 pr-3 font-semibold text-[var(--text)]">{r.rank}</td><td className="py-1 pr-3">{r.size}</td><td className="py-1 pr-3">{r.passengers}</td><td className="py-1">{r.health}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-5">
        <HomebrewEditor kind="mmrpg-starship" campaigns={campaigns} initial={own} />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {homebrew.map((s) => <ShipCard key={`hb-${s.name}`} s={s} />)}
        {samples.map((s) => <ShipCard key={`bk-${s.name}`} s={s} />)}
      </div>

      <details className="mt-5 rounded border border-[var(--border)] bg-[var(--panel-2)] p-3">
        <summary className="cursor-pointer text-[12px] font-bold uppercase tracking-[0.12em] text-[#f4737a]">Starship systems &amp; tags reference</summary>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <div>
            <h4 className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">Ship systems (traits) — downtime activity</h4>
            <ul className="space-y-2 text-[12px] leading-relaxed text-[var(--muted)]">
              {MMRPG_STARSHIP_TRAITS.map((t) => (
                <li key={t.name}>
                  <span className="font-semibold text-[var(--text)]">{t.name}</span>
                  {t.stackable ? <span className="ml-1 text-[10px] uppercase text-[var(--mmrpg)]">×{t.maxStack}</span> : null}
                  <span className="mt-0.5 block">{t.description}</span>
                  <span className="mt-0.5 block text-[11px] italic">Downtime: {t.downtime}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">Ship tags</h4>
            <ul className="space-y-2 text-[12px] leading-relaxed text-[var(--muted)]">
              {MMRPG_STARSHIP_TAGS.map((t) => (
                <li key={t.name}>
                  <span className="font-semibold text-[var(--text)]">{t.name}</span>
                  <span className="mt-0.5 block">{t.description}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] leading-relaxed text-[var(--muted)]">Starships can also take any <b>Headquarters</b> trait or tag. See the Headquarters tab for those.</p>
          </div>
        </div>
      </details>
    </section>
  );
}
