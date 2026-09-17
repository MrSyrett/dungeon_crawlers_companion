import { MMRPG_HQ_PROFILES } from "@/lib/data/mmrpg-hq-profiles";
import { MMRPG_HQ_TRAITS } from "@/lib/data/mmrpg-hq-traits";
import { MMRPG_HQ_TAGS } from "@/lib/data/mmrpg-hq-tags";
import HomebrewEditor, { type CampaignRef, type HomebrewRecord } from "@/components/HomebrewEditor";
import { SectionH, cardCls, badge, hbBadge } from "@/components/MmrpgRef";

// The Headquarters section of the Equipment page: a homebrew builder (kind
// "mmrpg-hq"), the user's saved HQs + the book's sample HQ profiles as cards, and
// a reference of every HQ trait (with its downtime activity) and tag.

type HqTrait = { name: string; n?: number };
type HqTag = { name: string; note?: string };
type Hq = {
  name: string; teamRank: number | string; blurb?: string; notes?: string;
  traits: HqTrait[]; tags: HqTag[];
  traitBudget?: number; traitsUsed?: number; warnings?: string[]; homebrew?: boolean;
};

const traitLabel = (t: HqTrait) => (t.n && t.n > 1 ? `${t.name} ×${t.n}` : t.name);
const tagLabel = (t: HqTag) => (t.note ? `${t.name} (${t.note})` : t.name);

function HqCard({ hq }: { hq: Hq }) {
  const rankNum = typeof hq.teamRank === "number" ? hq.teamRank : Number(hq.teamRank);
  const budget = hq.traitBudget ?? (Number.isFinite(rankNum) ? rankNum * 3 : null); // Rank X HQs have no fixed budget
  const used = hq.traitsUsed ?? hq.traits.reduce((s, t) => s + (t.n || 1), 0);
  const over = budget != null && used > budget;
  return (
    <article className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-base font-bold uppercase tracking-[0.12em] text-[#f4737a]">{hq.name}</h3>
        <span className="flex items-center gap-1.5">
          {hq.homebrew ? <span className={hbBadge}>Homebrew</span> : null}
          <span className={badge}>Rank {hq.teamRank}</span>
          <span className={badge} style={over ? { color: "var(--mmrpg)", borderColor: "var(--mmrpg)" } : undefined}>{budget != null ? `${used}/${budget}` : used} traits</span>
        </span>
      </div>
      {hq.blurb ? <p className="mt-1 text-[12px] italic leading-relaxed text-[var(--muted)]">{hq.blurb}</p> : null}
      {hq.traits.length ? (
        <p className="mt-2 text-[12px] leading-relaxed text-[var(--text)]"><span className="font-semibold text-[var(--mmrpg)]">Traits:</span> {hq.traits.map(traitLabel).join(", ")}</p>
      ) : null}
      {hq.tags.length ? (
        <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Tags:</span> {hq.tags.map(tagLabel).join(", ")}</p>
      ) : null}
      {hq.notes ? <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--muted)]">{hq.notes}</p> : null}
      {hq.warnings?.length ? (
        <p className="mt-1.5 text-[11px] leading-relaxed text-[var(--mmrpg)]">⚠ {hq.warnings.join(" · ")}</p>
      ) : null}
    </article>
  );
}

export default function MmrpgHeadquarters({ campaigns, own, visible }: { campaigns: CampaignRef[]; own: HomebrewRecord[]; visible: HomebrewRecord[] }) {
  const homebrew: Hq[] = visible.map((h) => ({ ...(h.data as unknown as Hq), name: h.name, homebrew: true }));
  const samples = MMRPG_HQ_PROFILES as unknown as Hq[];

  return (
    <section className={`${cardCls} mb-4`}>
      <SectionH>Headquarters</SectionH>
      <p className="mb-3 mt-2 text-[13px] leading-relaxed text-[var(--muted)]">A team&rsquo;s base. Its <b>team rank</b> is the average of the members&rsquo; ranks (top six), rounded up, and it can have <b>3 traits per team rank</b> plus as many <b>tags</b> as you like. Each trait grants a downtime activity; some tags can&rsquo;t be combined. Build your own below, then browse the book&rsquo;s famous headquarters for inspiration.</p>

      <div className="mb-5">
        <HomebrewEditor kind="mmrpg-hq" campaigns={campaigns} initial={own} />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {homebrew.map((hq) => <HqCard key={`hb-${hq.name}`} hq={hq} />)}
        {samples.map((hq) => <HqCard key={`bk-${hq.name}`} hq={hq} />)}
      </div>

      <details className="mt-5 rounded border border-[var(--border)] bg-[var(--panel-2)] p-3">
        <summary className="cursor-pointer text-[12px] font-bold uppercase tracking-[0.12em] text-[#f4737a]">Headquarters traits &amp; tags reference</summary>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <div>
            <h4 className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">Traits — downtime activity</h4>
            <ul className="space-y-2 text-[12px] leading-relaxed text-[var(--muted)]">
              {MMRPG_HQ_TRAITS.map((t) => (
                <li key={t.name}>
                  <span className="font-semibold text-[var(--text)]">{t.name}</span>
                  {t.stackable ? <span className="ml-1 text-[10px] uppercase text-[var(--mmrpg)]">×{t.maxStack}</span> : null}
                  {t.grants ? <span className="ml-1 text-[10px] uppercase text-[var(--muted)]">grants {t.grants}</span> : null}
                  <span className="mt-0.5 block">{t.downtime}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">Tags</h4>
            <ul className="space-y-2 text-[12px] leading-relaxed text-[var(--muted)]">
              {MMRPG_HQ_TAGS.map((t) => (
                <li key={t.name}>
                  <span className="font-semibold text-[var(--text)]">{t.name}</span>
                  {t.incompatibleWith?.length ? <span className="ml-1 text-[10px] uppercase text-[var(--mmrpg)]">not with {t.incompatibleWith.join(", ")}</span> : null}
                  <span className="mt-0.5 block">{t.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </details>
    </section>
  );
}
