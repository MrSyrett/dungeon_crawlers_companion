import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DND_FEATS } from "@/lib/data/dnd-feats";
import type { DndFeat } from "@/lib/data/dnd-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import DndHomebrewEditor from "@/components/DndHomebrewEditor";
import { DndHeader, ChipRow, SearchForm, CountLine, EmptyState, cardCls, badge, one, type RawQuery } from "@/components/DndRef";

export const dynamic = "force-dynamic";
const BASE = "/dnd/feats";
const CATS = ["Origin", "General", "Fighting Style", "Epic Boon"];
const hbBadge = "rounded border border-[var(--dnd)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#f0a37f]";

export default async function DndFeatsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const q = one(raw.q).trim().toLowerCase();
  const cat = one(raw.cat);
  const src = ["book", "hb"].includes(one(raw.src)) ? one(raw.src) : "";
  const srcOk = (x: { source?: string }) => (src === "hb" ? x.source === "Homebrew" : src === "book" ? x.source !== "Homebrew" : true);

  const [hbFeatV, hbFeatOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "dnd-feat" }),
    ownHomebrew(user.id, "dnd-feat"),
    userCampaigns(user.id),
  ]);
  const hbFeats = hbFeatV.map((h) => h.data as unknown as DndFeat);
  const isHb = (x: { source?: string }) => x.source === "Homebrew";

  let list = [...hbFeats, ...DND_FEATS].filter(srcOk);
  if (cat) list = list.filter((f) => f.category === cat);
  if (q) list = list.filter((f) => f.name.toLowerCase().includes(q) || f.benefits.some((x) => x.toLowerCase().includes(q)));
  list.sort((a, b) => a.name.localeCompare(b.name));
  const cats = CATS.filter((c) => [...hbFeats, ...DND_FEATS].some((f) => f.category === c));
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <DndHeader title="Feats" subtitle="2024 feats" />
      <DndHomebrewEditor kind="dnd-feat" campaigns={campaigns} initial={hbFeatOwn} />
      <SearchForm base={BASE} q={one(raw.q)} placeholder="Search feats…" hidden={{ cat, src }} />
      <ChipRow label="Category" base={BASE} current={{ q: one(raw.q), cat, src }} param="cat" options={cats.map((c) => ({ key: c, label: c }))} active={cat} />
      {hbFeats.length ? <ChipRow label="Source" base={BASE} current={{ q: one(raw.q), cat, src }} param="src" options={[{ key: "book", label: "Official" }, { key: "hb", label: "Homebrew" }]} active={src} /> : null}
      <CountLine count={list.length} noun="feat" base={BASE} filtered={!!(q || cat || src)} />
      {list.length === 0 ? <EmptyState noun="feat" base={BASE} /> : (
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {list.map((f, i) => (
            <li key={`${f.name}-${i}`} className={cardCls}>
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
      )}
    </div>
  );
}
