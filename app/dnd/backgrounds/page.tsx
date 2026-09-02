import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DND_BACKGROUNDS } from "@/lib/data/dnd-backgrounds";
import { DND_FEATS } from "@/lib/data/dnd-feats";
import { DndHeader, ModeRow, ChipRow, SearchForm, CountLine, EmptyState, cardCls, badge, one, type RawQuery } from "@/components/DndRef";

export const dynamic = "force-dynamic";
const BASE = "/dnd/backgrounds";
const CATS = ["Origin", "General", "Fighting Style", "Epic Boon"];

export default async function DndBackgroundsFeatsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const mode = one(raw.mode) === "feats" ? "feats" : "backgrounds";
  const q = one(raw.q).trim().toLowerCase();
  const cat = one(raw.cat);

  const modeOpts = [{ key: "backgrounds", label: `Backgrounds (${DND_BACKGROUNDS.length})` }, { key: "feats", label: `Feats (${DND_FEATS.length})` }];

  if (mode === "backgrounds") {
    let list = DND_BACKGROUNDS.slice();
    if (q) list = list.filter((b) => b.name.toLowerCase().includes(q) || b.feat.toLowerCase().includes(q));
    list.sort((a, b) => a.name.localeCompare(b.name));
    return (
      <div className="mx-auto w-full max-w-5xl px-5 py-10">
        <DndHeader title="Backgrounds & Feats" subtitle="2024 origins" />
        <ModeRow base={BASE} current={{ q: "", cat: "" }} param="mode" options={modeOpts} active={mode} />
        <SearchForm base={BASE} q={one(raw.q)} placeholder="Search backgrounds…" hidden={{ mode }} />
        <CountLine count={list.length} noun="background" base={`${BASE}?mode=backgrounds`} filtered={!!q} />
        {list.length === 0 ? <EmptyState noun="background" base={`${BASE}?mode=backgrounds`} /> : (
          <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
            {list.map((b) => (
              <li key={b.name} className={cardCls}>
                <h3 className="text-base font-bold uppercase tracking-[0.12em] text-[#f0a37f]">{b.name}</h3>
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

  // Feats
  let list = DND_FEATS.slice();
  if (cat) list = list.filter((f) => f.category === cat);
  if (q) list = list.filter((f) => f.name.toLowerCase().includes(q) || f.benefits.some((x) => x.toLowerCase().includes(q)));
  list.sort((a, b) => a.name.localeCompare(b.name));
  const cats = CATS.filter((c) => DND_FEATS.some((f) => f.category === c));
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <DndHeader title="Backgrounds & Feats" subtitle="2024 origins" />
      <ModeRow base={BASE} current={{ q: "", cat: "" }} param="mode" options={modeOpts} active={mode} />
      <SearchForm base={BASE} q={one(raw.q)} placeholder="Search feats…" hidden={{ mode, cat }} />
      <ChipRow label="Category" base={BASE} current={{ mode, q: one(raw.q), cat }} param="cat" options={cats.map((c) => ({ key: c, label: c }))} active={cat} />
      <CountLine count={list.length} noun="feat" base={`${BASE}?mode=feats`} filtered={!!(q || cat)} />
      {list.length === 0 ? <EmptyState noun="feat" base={`${BASE}?mode=feats`} /> : (
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {list.map((f) => (
            <li key={f.name} className={cardCls}>
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-bold uppercase tracking-[0.12em] text-[#f0a37f]">{f.name}{f.repeatable ? <span className="ml-1 text-[10px] text-[var(--muted)]">(repeatable)</span> : null}</h3>
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
