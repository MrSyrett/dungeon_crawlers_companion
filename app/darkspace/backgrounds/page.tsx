import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DS_BACKGROUNDS, DS_MOTIVATIONS } from "@/lib/data/darkspace";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { DarkSpaceHeader, SearchForm, ChipRow, CountLine, EmptyState, cardCls, nameCls, badge, hbBadge, one, type Query, type RawQuery } from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";
const BASE = "/darkspace/backgrounds";
const KINDS = [{ key: "background", label: "Backgrounds" }, { key: "motivation", label: "Motivations" }];

const s = (v: unknown): string => (typeof v === "string" ? v : v == null ? "" : String(v));
type BgRow = { n: number | null; name: string; text: string; homebrew: boolean };
type MoRow = { code: string; name: string; text: string; startBonus: string; effect: string; homebrew: boolean };

export default async function DarkSpaceBackgroundsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [bgVisible, bgOwn, moVisible, moOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "ds-background" }),
    ownHomebrew(user.id, "ds-background"),
    visibleHomebrew(user.id, { type: "ds-motivation" }),
    ownHomebrew(user.id, "ds-motivation"),
    userCampaigns(user.id),
  ]);
  const bgHb: BgRow[] = bgVisible.map((h) => ({ n: null, name: h.name, text: s((h.data as Record<string, unknown>).text), homebrew: true }));
  const moHb: MoRow[] = moVisible.map((h) => {
    const d = h.data as Record<string, unknown>;
    return { code: "HB", name: h.name, text: s(d.text), startBonus: s(d.startBonus), effect: s(d.effect), homebrew: true };
  });

  const raw = await searchParams;
  const q = one(raw.q).trim();
  const needle = q.toLowerCase();
  const kind = KINDS.some((k) => k.key === one(raw.kind)) ? one(raw.kind) : "";
  const current: Query = { q, kind };
  const bg: BgRow[] = kind && kind !== "background" ? [] : [...bgHb, ...DS_BACKGROUNDS.map((b) => ({ ...b, homebrew: false }))].filter((b) => !needle || (b.name + " " + b.text).toLowerCase().includes(needle));
  const mo: MoRow[] = kind && kind !== "motivation" ? [] : [...moHb, ...DS_MOTIVATIONS.map((m) => ({ ...m, homebrew: false }))].filter((m) => !needle || (m.name + " " + m.text + " " + m.startBonus + " " + m.effect).toLowerCase().includes(needle));
  const total = bg.length + mo.length;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <DarkSpaceHeader title="Backgrounds & Motivations" subtitle={`${DS_BACKGROUNDS.length} backgrounds · ${DS_MOTIVATIONS.length} motivations`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">
        Choose a Background (roll d20) — you have advantage on checks where it plausibly applies — and a Motivation, which replaces alignment and grants a one-time starting bonus plus a recurring way to earn Luck Tokens.
      </p>
      <div className="mb-4"><HomebrewEditor kind="ds-background" campaigns={campaigns} initial={bgOwn} /></div>
      <div className="mb-6"><HomebrewEditor kind="ds-motivation" campaigns={campaigns} initial={moOwn} /></div>
      <SearchForm base={BASE} q={q} placeholder="Search…" hidden={{ kind }} />
      <ChipRow label="Show" base={BASE} current={current} param="kind" options={KINDS} active={kind} />
      <CountLine count={total} noun="entry" base={BASE} filtered={Boolean(needle || kind)} />
      {total === 0 ? <EmptyState noun="entry" base={BASE} /> : null}

      {bg.length ? (
        <ul className="grid grid-cols-1 items-start gap-2 md:grid-cols-2">
          {bg.map((b, i) => (
            <li key={`${b.homebrew ? "hb" : "bk"}-${b.name}-${i}`} className="rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-[13px] leading-relaxed text-[var(--muted)]">
              {b.homebrew ? <span className={hbBadge}>HB</span> : null} <span className="font-semibold text-[var(--text)]">{b.name}.</span> {b.text}
            </li>
          ))}
        </ul>
      ) : null}

      {mo.length ? (
        <section className="mt-6">
          <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em] text-[#8fd6ea]">Motivations</h2>
          <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-3">
            {mo.map((m, i) => (
              <li key={`${m.homebrew ? "hb" : "bk"}-${m.name}-${i}`} className={cardCls}>
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <h3 className={nameCls}>{m.name}</h3>
                  {m.homebrew ? <span className={hbBadge}>Homebrew</span> : null}
                </div>
                <p className="mt-2 text-[12px] italic leading-relaxed text-[var(--muted)]">{m.text}</p>
                {m.startBonus ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--text)]"><span className="font-semibold text-[#8fd6ea]">Start:</span> {m.startBonus}</p> : null}
                {m.effect ? <p className="mt-1 text-[12px] leading-relaxed text-[var(--text)]"><span className="font-semibold text-[#8fd6ea]">Luck:</span> {m.effect}</p> : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
