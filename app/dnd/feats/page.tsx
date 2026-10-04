import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DND_FEATS } from "@/lib/data/dnd-feats";
import type { DndFeat } from "@/lib/data/dnd-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import DndHomebrewEditor from "@/components/DndHomebrewEditor";
import { DndHeader, ChipRow, SearchForm, CountLine, EmptyState, cardCls, badge, one, type RawQuery } from "@/components/DndRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/dnd/feats";
const CATS = ["Origin", "General", "Fighting Style", "Epic Boon"];
const hbBadge = "rounded border border-[var(--dnd)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#f0a37f]";

export default async function DndFeatsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const q = one(raw.q).trim().toLowerCase();
  const rawCat = one(raw.cat);
  const src = ["book", "hb"].includes(one(raw.src)) ? one(raw.src) : "";

  const [hbFeatV, hbFeatOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "dnd-feat" }),
    ownHomebrew(user.id, "dnd-feat"),
    userCampaigns(user.id),
  ]);
  const hbFeats = hbFeatV.map((h) => h.data as unknown as DndFeat);
  const isHb = (x: { source?: string }) => x.source === "Homebrew";

  // Every feat is rendered; the chips filter on the client (InstantFilter).
  // `show` applies the URL's filters for the initial paint, through the same
  // facet match the client uses.
  const list = [...hbFeats, ...DND_FEATS].sort((a, b) => a.name.localeCompare(b.name));
  const cats = CATS.filter((c) => [...hbFeats, ...DND_FEATS].some((f) => f.category === c));

  // Validated against the option lists the chips actually offer, the way every
  // other system does it. InstantFilter drops a value no chip offers, so an
  // unvalidated ?param= made the server and the client disagree: the first paint
  // hid everything and showed "Nothing found", and because apply() does not run
  // on mount it stayed wrong until the user clicked something.
  const cat = cats.includes(rawCat) ? rawCat : "";

  const current = { q: one(raw.q), cat, src };
  const facets = (f: DndFeat) => ({ cat: f.category, src: isHb(f) ? "hb" : "book" });
  const show = (f: DndFeat) => facetMatch(facets(f), current) && (!q || f.name.toLowerCase().includes(q) || f.benefits.some((x) => x.toLowerCase().includes(q)));
  const shown = list.filter(show).length;
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <DndHeader title="Feats" subtitle="2024 feats" />
      <DndHomebrewEditor kind="dnd-feat" campaigns={campaigns} initial={hbFeatOwn} />
      <InstantFilter>
      <SearchForm base={BASE} q={one(raw.q)} placeholder="Search feats…" hidden={{ cat, src }} />
      <ChipRow label="Category" base={BASE} current={current} param="cat" options={cats.map((c) => ({ key: c, label: c }))} active={cat} />
      {hbFeats.length ? <ChipRow label="Source" base={BASE} current={current} param="src" options={[{ key: "book", label: "Official" }, { key: "hb", label: "Homebrew" }]} active={src} /> : null}
      <CountLine count={shown} noun="feat" base={BASE} filtered={!!(q || cat || src)} />
      <EmptyState noun="feat" base={BASE} hidden={shown > 0} />
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {list.map((f, i) => (
            <li key={`${f.name}-${i}`} className={cardCls} hidden={!show(f)} data-f={facetAttr(facets(f))}>
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-bold uppercase tracking-[0.12em] text-[#f0a37f]">{f.name}{f.repeatable ? <span className="ml-1 text-[10px] text-[var(--muted)]">(repeatable)</span> : null} {isHb(f) ? <span className={hbBadge}>HB</span> : null}</h3>
                <span className={badge}>{f.category}</span>
              </div>
              {f.prerequisite ? <p className="mt-0.5 text-[11px] italic text-[var(--muted)]">Prerequisite: {f.prerequisite}</p> : null}
              {f.abilityScores?.length ? <p className="mt-0.5 text-[11px] text-[var(--muted)]">Ability increase: {f.abilityScores.join(" / ")}</p> : null}
              <ul className="mt-2 flex list-disc flex-col gap-1 pl-4 text-[12px] leading-relaxed text-[var(--muted)]">
                {f.benefits.map((x, i) => <li key={i}>{x}</li>)}
              </ul>
            </li>
          ))}
        </ul>
      </InstantFilter>
    </div>
  );
}
