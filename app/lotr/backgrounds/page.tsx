import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { LOTR_BACKGROUNDS, LOTR_CULTURES, LOTR_DISTINCTIVE_FEATURES } from "@/lib/data/lotr-data";
import type { LotrBackground } from "@/lib/data/lotr-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import CompendiumHomebrew from "@/components/hb/CompendiumHomebrew";
import { LotrHeader, ChipRow, SearchForm, CountLine, EmptyState, Field, cardCls, nameCls, badge, hbBadge, eyebrow, one, isHb, srcKey, srcChips, type RawQuery } from "@/components/LotrRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/lotr/backgrounds";

export default async function LotrBackgroundsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const q = one(raw.q).trim().toLowerCase();

  const [hbV, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "lotr-background" }),
    ownHomebrew(user.id, "lotr-background"),
    userCampaigns(user.id),
  ]);
  const hbBgs = hbV.map((h) => h.data as unknown as LotrBackground);
  const list = [...hbBgs, ...LOTR_BACKGROUNDS];

  // Culture chips in book order; homebrew may add "Any".
  const cultures = [...LOTR_CULTURES.map((c) => c.name), ...(hbBgs.some((b) => b.culture === "Any") ? ["Any"] : [])];
  const cul = cultures.includes(one(raw.cul)) ? one(raw.cul) : "";
  const srcOpts = srcChips(list.map((b) => b.source));
  const src = srcOpts.some((o) => o.key === one(raw.src)) ? one(raw.src) : "";

  const current = { q: one(raw.q), cul, src };
  const facets = (b: LotrBackground) => ({ cul: b.culture, src: srcKey(b.source) });
  const show = (b: LotrBackground) => facetMatch(facets(b), current) && (!q || b.name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q) || b.skillProficiencies.some((s) => s.toLowerCase().includes(q)) || b.distinctiveFeatures.some((s) => s.toLowerCase().includes(q)));
  const shown = list.filter(show).length;

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <LotrHeader title="Backgrounds" subtitle={`${LOTR_BACKGROUNDS.length} backgrounds · six per culture${hbBgs.length ? ` · +${hbBgs.length} homebrew` : ""}`} />
      <CompendiumHomebrew><HomebrewEditor kind="lotr-background" campaigns={campaigns} initial={hbOwn} /></CompendiumHomebrew>

      <section className={`${cardCls} mb-6`}>
        <p className={eyebrow}>How backgrounds work</p>
        <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">Each background, chosen from your hero&rsquo;s culture, grants two skill proficiencies, one tool proficiency (and you start with that tool), and two distinctive features — personality traits that earn inspiration when played true. Backgrounds give no feat and no ability increase.</p>
        <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Customising a background.</span> You may swap one or both distinctive features for any others, and pick any two skills and any one tool proficiency instead of the listed ones.</p>
        <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Distinctive features:</span> {LOTR_DISTINCTIVE_FEATURES.join(", ")}.</p>
      </section>

      <InstantFilter>
        <SearchForm base={BASE} q={one(raw.q)} placeholder="Search backgrounds, skills, features…" hidden={{ cul, src }} />
        <ChipRow label="Culture" base={BASE} current={current} param="cul" options={cultures.map((c) => ({ key: c, label: c }))} active={cul} />
        <ChipRow label="Source" base={BASE} current={current} param="src" options={srcOpts} active={src} />
        <CountLine count={shown} noun="background" base={BASE} filtered={!!(q || cul || src)} />
        <EmptyState noun="background" base={BASE} hidden={shown > 0} />
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {list.map((b, i) => (
            <li key={`${b.culture}-${b.name}-${i}`} className={cardCls} hidden={!show(b)} data-f={facetAttr(facets(b))}>
              <div className="flex items-start justify-between gap-2">
                <h3 className={nameCls}>{b.name} {isHb(b) ? <span className={hbBadge}>HB</span> : null}</h3>
                <span className={badge}>{b.culture}</span>
              </div>
              <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">{b.description}</p>
              <dl className="mt-2 grid gap-y-0.5 text-[12.5px] text-[var(--muted)]">
                <Field label="Skills">{b.skillProficiencies.join(", ")}{b.skillChoice ? `${b.skillProficiencies.length ? "; " : ""}choose ${b.skillChoice.count} of ${b.skillChoice.from.join(", ")}` : ""}{!b.skillProficiencies.length && !b.skillChoice ? "—" : ""}</Field>
                <Field label="Tool">{b.toolProficiencies.join(", ") || "—"}</Field>
                <Field label="Distinctive Features"><span className="text-[var(--sys-link)]">{b.distinctiveFeatures.join(", ") || "—"}</span></Field>
              </dl>
            </li>
          ))}
        </ul>
      </InstantFilter>
      <p className="mt-8 text-[12px] text-[var(--muted)]">See also: <a href="/lotr/cultures" className="text-[var(--sys-link)] underline">Heroic Cultures</a>.</p>
    </div>
  );
}
