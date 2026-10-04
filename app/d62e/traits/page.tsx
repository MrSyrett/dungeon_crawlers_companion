import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { D62E_PERKS } from "@/lib/data/d62e-perks";
import { D62E_POWERS } from "@/lib/data/d62e-powers";
import { D62E_LIMITATIONS } from "@/lib/data/d62e-limitations";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";
import {
  D62eHeader, SearchForm, ChipRow, CountLine, EmptyState, SectionH, cardCls, nameCls, badge, hbBadge,
  genreBadge, genreName, one, type Query, type RawQuery,
} from "@/components/D62eRef";

export const dynamic = "force-dynamic";
const BASE = "/d62e/traits";

// Every character option the D6 book offers, in one place. Perks/Flaws/Talents/
// Assets/Troubles come from the perks data; Superpowers, Magic and Psionics all
// come from the powers data; Limitations are the flaws for superpowers.
//
// Magic and Psionics used to live on /d62e/powers, which was never listed in
// navConfig — so the only page carrying them was unreachable and that content was
// invisible. They are folded in here instead, and the page is titled Options
// rather than Traits now that it covers more than traits.
const KINDS = [
  { key: "perk", label: "Perks" },
  { key: "flaw", label: "Flaws" },
  { key: "talent", label: "Talents" },
  { key: "asset", label: "Assets" },
  { key: "trouble", label: "Troubles" },
  { key: "superpower", label: "Superpowers" },
  { key: "limitation", label: "Limitations" },
  { key: "magic", label: "Magic" },
  { key: "psionic", label: "Psionics" },
];
const KIND_HEADING: Record<string, string> = {
  perk: "Perks", flaw: "Flaws", talent: "Talents", asset: "Assets", trouble: "Troubles",
  superpower: "Superpowers", limitation: "Limitations", magic: "Magic", psionic: "Psionics",
};
const KIND_INTRO: Record<string, string> = {
  perk: "Advantages bought with skill dice (or character points), representing edges, connections, and boons.",
  flaw: "Drawbacks taken for extra dice; the more disruptive the flaw, the greater the return.",
  talent: "Special knacks and trained abilities a character can learn, each with a point cost.",
  asset: "Resources and heroic reputations a character can invoke twice per session for +3D or a Hero Point.",
  trouble: "Complications the character can willingly trigger for a Hero Point while the GM springs a complication.",
  superpower: "Extraordinary abilities — an extension of Talents — bought in ranks from a Superpower Dice pool.",
  limitation: "The flaws for superpowers: each grants Superpower Dice back to the pool.",
  magic: "Spells from the magic system — each rolled with its skill against a difficulty.",
  psionic: "Psionic powers — each rolled with its skill against a difficulty.",
};

type Row = {
  name: string;
  kind: string;
  genre: string;
  cost?: string;
  skill?: string;
  difficulty?: string;
  description: string;
  /** Magic/psionic rows carry a list of options; the powers page rendered these
   *  and dropping them would lose content in the merge. */
  options?: string[];
  homebrew?: boolean;
};

const sd = (o: Record<string, unknown>, k: string) => (typeof o[k] === "string" ? (o[k] as string) : "");

export default async function D62eTraitsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbTrait, hbTraitOwn, hbPower, hbPowerOwn, hbLim, hbLimOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "d62e-trait" }),
    ownHomebrew(user.id, "d62e-trait"),
    visibleHomebrew(user.id, { type: "d62e-power" }),
    ownHomebrew(user.id, "d62e-power"),
    visibleHomebrew(user.id, { type: "d62e-limitation" }),
    ownHomebrew(user.id, "d62e-limitation"),
    userCampaigns(user.id),
  ]);

  // Built-in rows.
  const perkRows: Row[] = D62E_PERKS.map((p) => ({
    name: p.name, kind: p.kind, genre: p.genre, cost: p.cost ?? undefined, description: p.description,
  }));
  // Every power kind — superpower, magic and psionic — keeping each row's own
  // kind so it lands in its own section.
  const powerRows: Row[] = D62E_POWERS.map((p) => ({
    name: p.name, kind: p.kind, genre: p.genre, cost: p.cost ?? undefined,
    skill: p.skill ?? undefined, difficulty: p.difficulty ?? undefined, description: p.description,
    options: p.options ?? undefined,
  }));
  const limRows: Row[] = D62E_LIMITATIONS.map((l) => ({
    name: l.name, kind: "limitation", genre: l.genre, cost: `+${l.value}D back`, description: l.description,
  }));

  // Homebrew rows.
  const hbTraitRows: Row[] = hbTrait.map((h) => {
    const d = h.data as Record<string, unknown>;
    return { name: h.name, kind: sd(d, "kind") || "perk", genre: sd(d, "genre") || "core", cost: sd(d, "cost") || undefined, description: sd(d, "description"), homebrew: true };
  });
  const hbPowerRows: Row[] = hbPower.map((h) => {
    const d = h.data as Record<string, unknown>;
    const kind = sd(d, "kind") || "magic";
    const opts = (Array.isArray(d.options) ? d.options : []).filter((x): x is string => typeof x === "string");
    return { name: h.name, kind, genre: sd(d, "genre") || (kind === "superpower" ? "superhero" : "fantasy"), cost: sd(d, "cost") || undefined, skill: sd(d, "skill") || undefined, difficulty: sd(d, "difficulty") || undefined, description: sd(d, "description"), options: opts.length ? opts : undefined, homebrew: true };
  });
  const hbLimRows: Row[] = hbLim.map((h) => {
    const d = h.data as Record<string, unknown>;
    const v = typeof d.value === "number" ? d.value : Number(d.value) || 0;
    return { name: h.name, kind: "limitation", genre: sd(d, "genre") || "superhero", cost: `+${v}D back`, description: sd(d, "description"), homebrew: true };
  });

  const ALL: Row[] = [...hbTraitRows, ...hbPowerRows, ...hbLimRows, ...perkRows, ...powerRows, ...limRows];
  const builtinCount = perkRows.length + powerRows.length + limRows.length;
  const hbCount = hbTraitRows.length + hbPowerRows.length + hbLimRows.length;

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const kind = KINDS.some((k) => k.key === one(raw.kind)) ? one(raw.kind) : "";
  const current: Query = { q, kind };
  // Every trait is rendered; the chips filter on the client (InstantFilter).
  // `show` applies the URL's filters for the initial paint, through the same
  // facet match the client uses.
  const list = ALL;
  const facets = (p: Row) => ({ kind: p.kind });
  const show = (p: Row) =>
    facetMatch(facets(p), current) &&
    (!needle || [p.name, p.kind, p.description, p.cost ?? "", p.skill ?? ""].join(" ").toLowerCase().includes(needle));
  const shown = list.filter(show).length;
  // Every kind that has rows gets its section; a section hides (data-section)
  // when all of its entries are hidden.
  const groups = KINDS.map((k) => k.key).filter((k) => list.some((p) => p.kind === k));

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <D62eHeader title="Options" subtitle={`${builtinCount} perks, flaws, talents, assets, troubles, superpowers, limitations, magic & psionics${hbCount ? ` + ${hbCount} homebrew` : ""}`} />

      <div className="mb-6 flex flex-col gap-4">
        <HomebrewEditor kind="d62e-trait" campaigns={campaigns} initial={hbTraitOwn} />
        <HomebrewEditor kind="d62e-power" campaigns={campaigns} initial={hbPowerOwn} />
        <HomebrewEditor kind="d62e-limitation" campaigns={campaigns} initial={hbLimOwn} />
      </div>

      <InstantFilter>
      <SearchForm base={BASE} q={q} placeholder="Search options…" hidden={{ kind }} />
      <ChipRow label="Kind" base={BASE} current={current} param="kind" options={KINDS} active={kind} />
      <CountLine count={shown} noun="option" base={BASE} filtered={Boolean(needle || kind)} />

      <EmptyState noun="option" base={BASE} hidden={shown > 0} />
      {groups.map((k) => (
        <section key={k} className={`${cardCls} mb-4`} data-section hidden={!list.some((p) => p.kind === k && show(p))}>
          <SectionH>{KIND_HEADING[k]}</SectionH>
          <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">{KIND_INTRO[k]}</p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {list.filter((p) => p.kind === k).map((p) => (
              <article key={`${p.homebrew ? "hb" : "bk"}-${p.kind}-${p.name}`} className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-3" hidden={!show(p)} data-f={facetAttr(facets(p))} data-s={p.kind}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className={nameCls}>{p.name}</h3>
                  {p.cost ? <span className={badge}>{p.cost}</span> : null}
                  {p.homebrew ? <span className={hbBadge}>Homebrew</span> : p.genre !== "core" ? <span className={genreBadge}>{genreName(p.genre)}</span> : null}
                </div>
                {(p.skill || p.difficulty) ? (
                  <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--muted)]">
                    {p.skill ? <span><span className="font-semibold text-[var(--text)]">Skill:</span> {p.skill}</span> : null}
                    {p.difficulty ? <span><span className="font-semibold text-[var(--text)]">Difficulty:</span> {p.difficulty}</span> : null}
                  </p>
                ) : null}
                <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{p.description}</p>
                {p.options?.length ? <p className="mt-2 text-[11px] text-[var(--muted)]">{p.options.join(" · ")}</p> : null}
              </article>
            ))}
          </div>
        </section>
      ))}
      </InstantFilter>
    </div>
  );
}
