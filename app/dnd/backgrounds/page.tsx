import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DND_BACKGROUNDS } from "@/lib/data/dnd-backgrounds";
import type { DndBackground } from "@/lib/data/dnd-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import DndHomebrewEditor from "@/components/DndHomebrewEditor";
import { DndHeader, ChipRow, SearchForm, CountLine, EmptyState, cardCls, one, type RawQuery } from "@/components/DndRef";

export const dynamic = "force-dynamic";
const BASE = "/dnd/backgrounds";
const hbBadge = "rounded border border-[var(--dnd)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#f0a37f]";

export default async function DndBackgroundsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const q = one(raw.q).trim().toLowerCase();
  const src = ["book", "hb"].includes(one(raw.src)) ? one(raw.src) : "";
  const srcOk = (x: { source?: string }) => (src === "hb" ? x.source === "Homebrew" : src === "book" ? x.source !== "Homebrew" : true);

  const [hbBgV, hbBgOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "dnd-background" }),
    ownHomebrew(user.id, "dnd-background"),
    userCampaigns(user.id),
  ]);
  const hbBgs = hbBgV.map((h) => h.data as unknown as DndBackground);
  const isHb = (x: { source?: string }) => x.source === "Homebrew";

  let list = [...hbBgs, ...DND_BACKGROUNDS].filter(srcOk);
  if (q) list = list.filter((b) => b.name.toLowerCase().includes(q) || b.feat.toLowerCase().includes(q));
  list.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <DndHeader title="Backgrounds" subtitle="2024 origins" />
      <DndHomebrewEditor kind="dnd-background" campaigns={campaigns} initial={hbBgOwn} />
      <SearchForm base={BASE} q={one(raw.q)} placeholder="Search backgrounds…" hidden={{ src }} />
      {hbBgs.length ? <ChipRow label="Source" base={BASE} current={{ q: one(raw.q), src }} param="src" options={[{ key: "book", label: "Official" }, { key: "hb", label: "Homebrew" }]} active={src} /> : null}
      <CountLine count={list.length} noun="background" base={BASE} filtered={!!q || !!src} />
      {list.length === 0 ? <EmptyState noun="background" base={BASE} /> : (
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {list.map((b, i) => (
            <li key={`${b.name}-${i}`} className={cardCls}>
              <h3 className="text-base font-bold uppercase tracking-[0.12em] text-[#f0a37f]">{b.name} {isHb(b) ? <span className={hbBadge}>HB</span> : null}</h3>
              <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">{b.description}</p>
              <dl className="mt-2 grid gap-y-0.5 text-[12px] text-[var(--muted)]">
                <div><dt className="inline font-semibold text-[var(--text)]">Ability Scores:</dt> <dd className="inline">{b.abilityScores.join(", ")}</dd></div>
                <div><dt className="inline font-semibold text-[var(--text)]">Feat:</dt> <dd className="inline text-[#f0a37f]">{b.feat}</dd></div>
                <div><dt className="inline font-semibold text-[var(--text)]">Skills:</dt> <dd className="inline">{b.skillProficiencies.join(", ")}</dd></div>
                <div><dt className="inline font-semibold text-[var(--text)]">Tool:</dt> <dd className="inline">{b.toolProficiencies.join(", ") || "—"}</dd></div>
                <div><dt className="inline font-semibold text-[var(--text)]">Equipment:</dt> <dd className="inline">{b.equipment.join(" — or — ")}</dd></div>
              </dl>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
