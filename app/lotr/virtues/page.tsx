import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { LOTR_VIRTUES, LOTR_CULTURES, LOTR_CALLINGS } from "@/lib/data/lotr-data";
import type { LotrVirtue } from "@/lib/data/lotr-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { LotrHeader, ChipRow, SearchForm, CountLine, EmptyState, Bullets, cardCls, nameCls, badge, hbBadge, eyebrow, one, isHb, srcKey, srcChips, type RawQuery } from "@/components/LotrRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/lotr/virtues";

function asiLabel(v: LotrVirtue): string {
  if (!v.asi) return "";
  if (v.asi.prowess) return "+2 to one score, or +1 to two";
  const ch = v.asi.choose ?? [];
  if (!ch.length) return "";
  return ch.length === 6 ? `+${v.asi.amount ?? 1} to any score` : `+${v.asi.amount ?? 1} ${ch.join(" or ")}`;
}
function usesLabel(u?: string): string {
  if (!u) return "";
  if (!/^\w+\/(long|short)$/.test(u)) return u;
  const [n, r] = u.split("/");
  const who = n === "PB" ? "Proficiency bonus" : n === "WIS" ? "Wisdom modifier" : `${n}×`;
  return `${who} per ${r === "long" ? "long rest" : r === "short" ? "short or long rest" : r ?? ""}`.trim();
}

export default async function LotrVirtuesPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const q = one(raw.q).trim().toLowerCase();

  const [hbV, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "lotr-virtue" }),
    ownHomebrew(user.id, "lotr-virtue"),
    userCampaigns(user.id),
  ]);
  const hbVirtues = hbV.map((h) => h.data as unknown as LotrVirtue);
  const all = [...hbVirtues, ...LOTR_VIRTUES];
  const cats = ["Common", ...LOTR_CULTURES.map((c) => c.name)].filter((c) => all.some((v) => v.category === c));
  // Group order: Common first, then each culture in book order; name order within.
  const order = (v: LotrVirtue) => Math.max(0, cats.indexOf(v.category));
  const list = all.slice().sort((a, b) => order(a) - order(b) || a.name.localeCompare(b.name));

  const cat = cats.includes(one(raw.cat)) ? one(raw.cat) : "";
  const srcOpts = srcChips(all.map((v) => v.source));
  const src = srcOpts.some((o) => o.key === one(raw.src)) ? one(raw.src) : "";
  const current = { q: one(raw.q), cat, src };
  const facets = (v: LotrVirtue) => ({ cat: v.category, src: srcKey(v.source) });
  const show = (v: LotrVirtue) => facetMatch(facets(v), current) && (!q || v.name.toLowerCase().includes(q) || (v.flavor ?? "").toLowerCase().includes(q) || v.benefits.some((x) => x.toLowerCase().includes(q)));
  const shown = list.filter(show).length;

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <LotrHeader title="Virtues" subtitle={`${LOTR_VIRTUES.length} virtues · common & cultural${hbVirtues.length ? ` · +${hbVirtues.length} homebrew` : ""}`} />
      <HomebrewEditor kind="lotr-virtue" campaigns={campaigns} initial={hbOwn} />

      <section className={`${cardCls} mb-6`}>
        <p className={eyebrow}>Virtues replace feats and ability increases</p>
        <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">At each of its virtue levels a hero takes one common virtue or one virtue of their own culture; every virtue also raises one of its listed ability scores by 1 (max 20). Some levels let the hero take a craft slot and a craft instead. Virtue levels by calling: {LOTR_CALLINGS.map((c) => `${c.name} ${c.virtueLevels.join(", ")}`).join(" · ")}.</p>
      </section>

      <InstantFilter>
        <SearchForm base={BASE} q={one(raw.q)} placeholder="Search virtues…" hidden={{ cat, src }} />
        <ChipRow label="Category" base={BASE} current={current} param="cat" options={cats.map((c) => ({ key: c, label: c }))} active={cat} />
        <ChipRow label="Source" base={BASE} current={current} param="src" options={srcOpts} active={src} />
        <CountLine count={shown} noun="virtue" base={BASE} filtered={!!(q || cat || src)} />
        <EmptyState noun="virtue" base={BASE} hidden={shown > 0} />
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {list.map((v, i) => (
            <li key={`${v.name}-${i}`} className={cardCls} hidden={!show(v)} data-f={facetAttr(facets(v))}>
              <div className="flex items-start justify-between gap-2">
                <h3 className={nameCls}>{v.name} {isHb(v) ? <span className={hbBadge}>HB</span> : null}</h3>
                <span className={badge}>{v.category}</span>
              </div>
              {v.flavor ? <p className="mt-0.5 text-[12.5px] italic text-[var(--muted)]">{v.flavor}</p> : null}
              <p className="mt-1 flex flex-wrap gap-x-3 text-[12px] text-[var(--muted)]">
                {asiLabel(v) ? <span><span className="font-semibold text-[var(--text)]">Ability:</span> {asiLabel(v)}</span> : null}
                {v.uses ? <span><span className="font-semibold text-[var(--text)]">Uses:</span> {usesLabel(v.uses)}</span> : null}
              </p>
              <Bullets items={v.benefits} className="mt-2" />
            </li>
          ))}
        </ul>
      </InstantFilter>
    </div>
  );
}
