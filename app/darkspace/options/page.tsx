import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DS_SPECIES, DS_TECH_SPECIES, DS_HUMAN_NOTE, DS_BACKGROUNDS, DS_MOTIVATIONS } from "@/lib/data/darkspace";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import { effectLabel, type EffectLike } from "@/lib/effects";
import HomebrewEditor from "@/components/HomebrewEditor";
import { DarkSpaceHeader, SearchForm, ChipRow, CountLine, EmptyState, cardCls, nameCls, hbBadge, one, type Query, type RawQuery } from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";
const BASE = "/darkspace/options";
// One page for the three "who is your Spacer" choices: Species Traits (Traits),
// Backgrounds, and Motivations.
const KINDS = [
  { key: "trait", label: "Traits" },
  { key: "background", label: "Backgrounds" },
  { key: "motivation", label: "Motivations" },
];

const s = (v: unknown): string => (typeof v === "string" ? v : v == null ? "" : String(v));

type Trait = { name: string; text: string; effects?: EffectLike[]; choose?: boolean };
type SpeciesRow = { n: number | null; name: string; text: string; traits?: Trait[]; bonuses?: EffectLike[]; languages?: string; homebrew: boolean };
type BgRow = { n: number | null; name: string; text: string; homebrew: boolean };
type MoRow = { code: string; name: string; text: string; startBonus: string; effect: string; homebrew: boolean };

function hbTraits(data: Record<string, unknown>): Trait[] {
  const raw = Array.isArray(data.traits) ? data.traits : [];
  return raw.map((t) => {
    const o = t as Record<string, unknown>;
    return { name: s(o.name), text: s(o.text), effects: Array.isArray(o.effects) ? (o.effects as EffectLike[]) : [], choose: o.choose === true };
  }).filter((t) => t.name || t.text);
}
function effSuffix(effects: EffectLike[] | undefined, choose?: boolean): string {
  if (!effects || !effects.length) return "";
  return ` (${choose ? "choose one: " : ""}${effects.map(effectLabel).join(choose ? " / " : ", ")})`;
}

export default async function DarkSpaceOptionsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [spVisible, spOwn, bgVisible, bgOwn, moVisible, moOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "ds-species" }),
    ownHomebrew(user.id, "ds-species"),
    visibleHomebrew(user.id, { type: "ds-background" }),
    ownHomebrew(user.id, "ds-background"),
    visibleHomebrew(user.id, { type: "ds-motivation" }),
    ownHomebrew(user.id, "ds-motivation"),
    userCampaigns(user.id),
  ]);

  const spHb: SpeciesRow[] = spVisible.map((h) => {
    const d = h.data as Record<string, unknown>;
    return { n: null, name: h.name, text: s(d.text), traits: hbTraits(d), bonuses: Array.isArray(d.bonuses) ? (d.bonuses as EffectLike[]) : [], languages: s(d.languages), homebrew: true };
  });
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

  const showTraits = !kind || kind === "trait";
  const showBg = !kind || kind === "background";
  const showMo = !kind || kind === "motivation";

  const traits: SpeciesRow[] = showTraits
    ? [...spHb, ...DS_SPECIES.map((sp) => ({ ...sp, homebrew: false }))].filter((sp) => !needle || (sp.name + " " + sp.text).toLowerCase().includes(needle))
    : [];
  const tech = showTraits ? DS_TECH_SPECIES.filter((t) => !needle || (t.name + " " + t.text).toLowerCase().includes(needle)) : [];
  const bg: BgRow[] = showBg
    ? [...bgHb, ...DS_BACKGROUNDS.map((b) => ({ ...b, homebrew: false }))].filter((b) => !needle || (b.name + " " + b.text).toLowerCase().includes(needle))
    : [];
  const mo: MoRow[] = showMo
    ? [...moHb, ...DS_MOTIVATIONS.map((m) => ({ ...m, homebrew: false }))].filter((m) => !needle || (m.name + " " + m.text + " " + m.startBonus + " " + m.effect).toLowerCase().includes(needle))
    : [];
  const total = traits.length + tech.length + bg.length + mo.length;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <DarkSpaceHeader title="Options" subtitle={`${DS_SPECIES.length} traits · ${DS_BACKGROUNDS.length} backgrounds · ${DS_MOTIVATIONS.length} motivations`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">
        The choices that define your Spacer. Roll or pick a <span className="font-semibold text-[var(--text)]">Trait</span> (d20; humans/analogues get Ambitious — {DS_HUMAN_NOTE} — and you may use any Shadowdark ancestry), a <span className="font-semibold text-[var(--text)]">Background</span> (advantage on checks where it plausibly applies), and a <span className="font-semibold text-[var(--text)]">Motivation</span>, which replaces alignment and grants a one-time starting bonus plus a recurring way to earn Luck Tokens.
      </p>

      <div className="mb-4"><HomebrewEditor kind="ds-species" campaigns={campaigns} initial={spOwn} /></div>
      <div className="mb-4"><HomebrewEditor kind="ds-background" campaigns={campaigns} initial={bgOwn} /></div>
      <div className="mb-6"><HomebrewEditor kind="ds-motivation" campaigns={campaigns} initial={moOwn} /></div>

      <SearchForm base={BASE} q={q} placeholder="Search traits, backgrounds, motivations…" hidden={{ kind }} />
      <ChipRow label="Show" base={BASE} current={current} param="kind" options={KINDS} active={kind} />
      <CountLine count={total} noun="entry" base={BASE} filtered={Boolean(needle || kind)} />
      {total === 0 ? <EmptyState noun="entry" base={BASE} /> : null}

      {traits.length || tech.length ? (
        <section className="mb-8">
          <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em] text-[#8fd6ea]">Traits</h2>
          {traits.length ? (
            <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
              {traits.map((sp, i) => (
                <li key={`trait-${sp.homebrew ? "hb" : "bk"}-${sp.name}-${i}`} className={cardCls}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className={nameCls}>{sp.name}</h3>
                    {sp.homebrew ? <span className={hbBadge}>Homebrew</span> : null}
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{sp.text}</p>
                  {sp.bonuses && sp.bonuses.length ? <p className="mt-2 text-[12px] text-[var(--text)]"><span className="font-semibold text-[#8fd6ea]">Bonuses:</span> {sp.bonuses.map(effectLabel).join(" · ")}</p> : null}
                  {sp.traits && sp.traits.length ? (
                    <ul className="mt-2 space-y-1">
                      {sp.traits.map((t, j) => (
                        <li key={j} className="text-[13px] leading-relaxed text-[var(--text)]">
                          {t.name ? <span className="font-semibold text-[#8fd6ea]">{t.name}: </span> : null}{t.text}<span className="text-[#8fd6ea]">{effSuffix(t.effects, t.choose)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {sp.languages ? <p className="mt-2 text-[12px] text-[var(--muted)]"><span className="font-semibold">Languages:</span> {sp.languages}</p> : null}
                </li>
              ))}
            </ul>
          ) : null}
          {tech.length ? (
            <>
              <h3 className="mb-3 mt-6 text-sm font-bold uppercase tracking-[0.12em] text-[#8fd6ea]">Tech Species</h3>
              <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
                {tech.map((t) => (
                  <li key={`tech-${t.name}`} className={cardCls}>
                    <h4 className={nameCls}>{t.name}</h4>
                    <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{t.text}</p>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </section>
      ) : null}

      {bg.length ? (
        <section className="mb-8">
          <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em] text-[#8fd6ea]">Backgrounds</h2>
          <ul className="grid grid-cols-1 items-start gap-2 md:grid-cols-2">
            {bg.map((b, i) => (
              <li key={`bg-${b.homebrew ? "hb" : "bk"}-${b.name}-${i}`} className="rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-[13px] leading-relaxed text-[var(--muted)]">
                {b.homebrew ? <span className={hbBadge}>HB</span> : null} <span className="font-semibold text-[var(--text)]">{b.name}.</span> {b.text}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {mo.length ? (
        <section className="mb-2">
          <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em] text-[#8fd6ea]">Motivations</h2>
          <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-3">
            {mo.map((m, i) => (
              <li key={`mo-${m.homebrew ? "hb" : "bk"}-${m.name}-${i}`} className={cardCls}>
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
