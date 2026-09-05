import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { NIMBLE_ANCESTRIES } from "@/lib/data/nimble-ancestries";
import { NIMBLE_BACKGROUNDS } from "@/lib/data/nimble-backgrounds";
import { NIMBLE_MOTIVATIONS } from "@/lib/data/nimble-motivations";
import type { NimbleAncestry } from "@/lib/data/nimble-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { NimbleHeader, SearchForm, ChipRow, CountLine, EmptyState, cardCls, nameCls, badge, hbBadge, one, type Query, type RawQuery } from "@/components/NimbleRef";

export const dynamic = "force-dynamic";
const BASE = "/nimble/ancestries";
const KINDS = [{ key: "ancestry", label: "Ancestries" }, { key: "background", label: "Backgrounds" }, { key: "motivation", label: "Motivations" }];

type AncRow = NimbleAncestry & { homebrew?: boolean };

// A homebrew record's data blob → a NimbleAncestry-shaped display row.
function hbToAncestry(data: Record<string, unknown>, name: string): AncRow {
  const s = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
  const traits = (Array.isArray(data.traits) ? data.traits : []).map((r) => {
    const t = (r ?? {}) as Record<string, unknown>;
    return { name: typeof t.name === "string" ? t.name : "", text: typeof t.text === "string" ? t.text : "" };
  });
  return {
    name,
    group: (s("group") === "Exotic" ? "Exotic" : "Common"),
    size: s("size") || "Medium",
    description: s("description"),
    traits,
    page: 0,
    homebrew: true,
  };
}

export default async function NimbleAncestriesPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "nimble-ancestry" }),
    ownHomebrew(user.id, "nimble-ancestry"),
    userCampaigns(user.id),
  ]);
  const hbRows: AncRow[] = hbVisible.map((h) => hbToAncestry(h.data as Record<string, unknown>, h.name));
  const ALL_ANC: AncRow[] = [...hbRows, ...NIMBLE_ANCESTRIES.map((a) => ({ ...a }))];

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const kind = KINDS.some((k) => k.key === one(raw.kind)) ? one(raw.kind) : "";
  const current: Query = { q, kind };
  const anc = kind && kind !== "ancestry" ? [] : ALL_ANC.filter((a) => !needle || [a.name, a.description, ...a.traits.map((t) => t.name + " " + t.text)].join(" ").toLowerCase().includes(needle));
  const bg = kind && kind !== "background" ? [] : NIMBLE_BACKGROUNDS.filter((b) => !needle || (b.name + " " + b.description).toLowerCase().includes(needle));
  const mo = kind && kind !== "motivation" ? [] : NIMBLE_MOTIVATIONS.filter((m) => !needle || (m.name + " " + m.description).toLowerCase().includes(needle));
  const total = anc.length + bg.length + mo.length;
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <NimbleHeader title="Ancestries & Backgrounds" subtitle={`${NIMBLE_ANCESTRIES.length} ancestries${hbRows.length ? ` + ${hbRows.length} homebrew` : ""} · ${NIMBLE_BACKGROUNDS.length} backgrounds · ${NIMBLE_MOTIVATIONS.length} motivations`} />
      <p className="mb-5 text-sm leading-relaxed text-[var(--muted)]">Choose one ancestry (flavor is free — swap traits with the GM&rsquo;s blessing), one background, and optionally a reason your hero adventures.</p>
      <div className="mb-6"><HomebrewEditor kind="nimble-ancestry" campaigns={campaigns} initial={hbOwn} /></div>
      <SearchForm base={BASE} q={q} placeholder="Search…" hidden={{ kind }} />
      <ChipRow label="Show" base={BASE} current={current} param="kind" options={KINDS} active={kind} />
      <CountLine count={total} noun="entry" base={BASE} filtered={Boolean(needle || kind)} />
      {total === 0 ? <EmptyState noun="entry" base={BASE} /> : null}
      {anc.length ? <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">{anc.map((a) => (
        <li key={`${a.homebrew ? "hb" : "bk"}-${a.name}`} className={cardCls}>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1"><h2 className={nameCls}>{a.name}</h2><span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{a.size}</span>{a.homebrew ? <span className={hbBadge}>Homebrew</span> : <span className={badge}>{a.group} · p.{a.page}</span>}</div>
          <p className="mt-2 text-[12px] italic leading-relaxed text-[var(--muted)]">{a.description}</p>
          {a.traits.map((t) => <p key={t.name} className="mt-1 text-[13px] leading-relaxed text-[var(--text)]"><span className="font-semibold">{t.name}.</span> {t.text}</p>)}
        </li>))}</ul> : null}
      {bg.length ? <section className={`${cardCls} mt-4`}><h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#9fe3bd]">Backgrounds</h2><ul className="mt-2 grid gap-2 md:grid-cols-2">{bg.map((b) => <li key={b.name} className="text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{b.name}.</span> {b.description}</li>)}</ul></section> : null}
      {mo.length ? <section className={`${cardCls} mt-4`}><h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#9fe3bd]">Adventuring motivations</h2><ul className="mt-2 grid gap-2 md:grid-cols-2">{mo.map((m) => <li key={m.name} className="text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{m.name}.</span> {m.description}</li>)}</ul></section> : null}
    </div>
  );
}
