import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { LOTR_MONSTERS, LOTR_ADVERSARY_TRAITS, LOTR_NAMELESS } from "@/lib/data/lotr-data";
import type { LotrMonster } from "@/lib/data/lotr-types";
import type { DndMonsterAction } from "@/lib/data/dnd-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import CompendiumHomebrew from "@/components/hb/CompendiumHomebrew";
import { LotrHeader, ChipRow, SearchForm, CountLine, EmptyState, BackLink, SectionNav, cardCls, nameCls, badge, hbBadge, eyebrow, sectionH, th, td, one, withParams, isHb, srcKey, srcChips, type RawQuery } from "@/components/LotrRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/lotr/bestiary";
const GROUP_ORDER = ["Evil Men", "Orcs", "Trolls", "Undead", "Wolves", "Folk of Eriador", "Beasts", "Other"];

function crVal(cr: string): number {
  if (cr.includes("/")) { const [a, b] = cr.split("/").map(Number); return a / b; }
  return Number(cr) || 0;
}
const mod = (n: number) => Math.floor((n - 10) / 2);
const sgn = (n: number) => (n >= 0 ? `+${n}` : `${n}`);

function ActionList({ title, items }: { title: string; items?: DndMonsterAction[] }) {
  if (!items || !items.length) return null;
  return (
    <section className="mt-3">
      <h4 className="font-label mb-1 border-b border-[var(--border)] pb-1 text-[13px] tracking-[0.06em] text-[var(--sys-link)]">{title}</h4>
      <div className="flex flex-col gap-1.5">
        {items.map((a, i) => (
          <p key={i} className="text-[13px] leading-relaxed text-[var(--muted)]"><span className="font-semibold italic text-[var(--text)]">{a.name}.</span> {a.description}</p>
        ))}
      </div>
    </section>
  );
}

function StatBlock({ m }: { m: LotrMonster }) {
  const line = (label: string, val?: string) => (val ? <div><span className="font-semibold text-[var(--text)]">{label}:</span> <span className="text-[var(--muted)]">{val}</span></div> : null);
  return (
    <div className={`${cardCls} border-l-4 border-r-4`} style={{ borderLeftColor: "var(--lotr)", borderRightColor: "var(--lotr)" }}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-2xl text-[var(--sys-link)]">{m.name}</h2>
          <p className="text-[12.5px] italic text-[var(--muted)]">{m.size} {m.type}{m.alignment ? `, ${m.alignment}` : ""}</p>
        </div>
        <span className={badge}>CR {m.cr} · {m.xp.toLocaleString()} XP</span>
      </div>
      {m.description ? <p className="mt-2 text-[13px] italic leading-relaxed text-[var(--muted)]">{m.description}</p> : null}
      <div className="mt-3 grid gap-x-6 gap-y-0.5 text-[13px] md:grid-cols-2">
        {line("Armour Class", `${m.ac}${m.acNote ? " " + m.acNote : ""}`)}
        {line("Hit Points", m.hpFormula)}
        {line("Speed", m.speed)}
        {line("Proficiency Bonus", sgn(m.proficiencyBonus))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1 text-center sm:grid-cols-6">
        {(["STR", "DEX", "CON", "INT", "WIS", "CHA"] as const).map((a) => (
          <div key={a} className="rounded border border-[var(--border)] bg-[var(--panel-2)] py-1">
            <div className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{a}</div>
            <div className="font-mono text-sm font-bold text-[var(--text)]">{m.abilities[a]}</div>
            <div className="font-mono text-[10px] text-[var(--sys-link)]">{sgn(mod(m.abilities[a]))}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-col gap-0.5 text-[12.5px]">
        {line("Saving Throws", m.savingThrows)}
        {line("Skills", m.skills)}
        {line("Damage Resistances", m.damageResistances)}
        {line("Damage Immunities", m.damageImmunities)}
        {line("Damage Vulnerabilities", m.damageVulnerabilities)}
        {line("Condition Immunities", m.conditionImmunities)}
        {line("Senses", m.senses)}
        {line("Languages", m.languages || "—")}
      </div>
      <ActionList title="Traits" items={m.traits} />
      <ActionList title="Actions" items={m.actions} />
      <ActionList title="Bonus Actions" items={m.bonusActions} />
      <ActionList title="Reactions" items={m.reactions} />
      <ActionList title="Legendary Actions" items={m.legendaryActions} />
    </div>
  );
}

function D12({ title, rows }: { title: string; rows: string[] }) {
  // Many of these d12 columns pair results (1–2, 3–4…); collapse identical neighbours.
  const out: { from: number; to: number; text: string }[] = [];
  rows.forEach((t, i) => { const last = out[out.length - 1]; if (last && last.text === t) last.to = i + 1; else out.push({ from: i + 1, to: i + 1, text: t }); });
  return (
    <div className="min-w-0">
      <p className={eyebrow}>{title}</p>
      <ol className="mt-1 flex flex-col gap-0.5 text-[12.5px] text-[var(--muted)]">
        {out.map((r) => <li key={r.from}><span className="inline-block w-10 font-mono text-[11px] text-[var(--lotr)]">{r.from === r.to ? r.from : `${r.from}–${r.to}`}</span>{r.text}</li>)}
      </ol>
    </div>
  );
}

export default async function LotrBestiaryPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const q = one(raw.q).trim();
  const pick = one(raw.m);

  const [hbV, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "lotr-monster" }),
    ownHomebrew(user.id, "lotr-monster"),
    userCampaigns(user.id),
  ]);
  const hbMonsters = hbV.map((h) => h.data as unknown as LotrMonster);
  const all = [...hbMonsters, ...LOTR_MONSTERS];

  const selected = pick ? all.find((m) => m.name === pick) ?? null : null;
  if (selected) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <LotrHeader title="Bestiary" subtitle={`${selected.group} · CR ${selected.cr}`} />
        <BackLink href={BASE} label="All adversaries" />
        <StatBlock m={selected} />
      </div>
    );
  }

  const groups = GROUP_ORDER.filter((g) => all.some((m) => m.group === g));
  const crs = [...new Set(all.map((m) => m.cr))].sort((a, b) => crVal(a) - crVal(b));
  const group = groups.includes(one(raw.group)) ? one(raw.group) : "";
  const cr = crs.includes(one(raw.cr)) ? one(raw.cr) : "";
  const srcOpts = srcChips(all.map((m) => m.source));
  const src = srcOpts.some((o) => o.key === one(raw.src)) ? one(raw.src) : "";

  const list = all.slice().sort((a, b) => GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group) || crVal(a.cr) - crVal(b.cr) || a.name.localeCompare(b.name));
  const current = { q, group, cr, src };
  const facets = (m: LotrMonster) => ({ group: m.group, cr: m.cr, src: srcKey(m.source) });
  const n = q.toLowerCase();
  const show = (m: LotrMonster) => facetMatch(facets(m), current) && (!n || m.name.toLowerCase().includes(n) || m.type.toLowerCase().includes(n));
  const shown = list.filter(show).length;
  const N = LOTR_NAMELESS;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <LotrHeader title="Bestiary" subtitle={`${LOTR_MONSTERS.length} adversaries${hbMonsters.length ? ` + ${hbMonsters.length} homebrew` : ""} · servants of the Shadow & folk of Eriador`} />
      <SectionNav items={[{ id: "adversaries", label: "Adversaries" }, { id: "traits", label: "Adversary Traits" }, { id: "nameless", label: "Nameless Things" }]} />
      <CompendiumHomebrew><HomebrewEditor kind="lotr-monster" campaigns={campaigns} initial={hbOwn} /></CompendiumHomebrew>

      <section id="adversaries" className="scroll-mt-20">
        <InstantFilter>
          <SearchForm base={BASE} q={q} placeholder="Search adversaries by name or type…" hidden={{ group, cr, src }} />
          <ChipRow label="Group" base={BASE} current={current} param="group" options={groups.map((g) => ({ key: g, label: g }))} active={group} />
          <ChipRow label="CR" base={BASE} current={current} param="cr" options={crs.map((c) => ({ key: c, label: c }))} active={cr} />
          <ChipRow label="Source" base={BASE} current={current} param="src" options={srcOpts} active={src} />
          <CountLine count={shown} noun="adversary" plural="adversaries" base={BASE} filtered={!!(q || group || cr || src)} />
          <EmptyState noun="adversary" base={BASE} hidden={shown > 0} />
          <ul className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((m, i) => (
              <li key={`${m.name}-${i}`} className={cardCls} hidden={!show(m)} data-f={facetAttr(facets(m))}>
                <div className="flex items-start justify-between gap-2">
                  <a href={withParams(BASE, {}, { m: m.name })} className={`${nameCls} hover:underline`}>{m.name} {isHb(m) ? <span className={hbBadge}>HB</span> : null}</a>
                  <span className={`${badge} shrink-0`}>{m.group}</span>
                </div>
                <p className="mt-0.5 text-[12px] italic text-[var(--muted)]">{m.size} {m.type}</p>
                <p className="mt-1.5 flex flex-wrap gap-3 text-[12px] text-[var(--muted)]">
                  <span><span className="font-semibold text-[var(--text)]">CR</span> {m.cr}</span>
                  <span><span className="font-semibold text-[var(--text)]">AC</span> {m.ac}</span>
                  <span><span className="font-semibold text-[var(--text)]">HP</span> {m.hp}</span>
                  <span><span className="font-semibold text-[var(--text)]">Speed</span> {m.speed}</span>
                </p>
                {m.description ? <p className="mt-1.5 line-clamp-3 text-[12px] leading-relaxed text-[var(--muted)]">{m.description}</p> : null}
              </li>
            ))}
          </ul>
        </InstantFilter>
      </section>

      <section id="traits" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Adversary Traits</h2>
        <p className="mb-3 text-[13px] text-[var(--muted)]">Bolt-on traits the Loremaster can add to any adversary — several Revelation episodes of the Eye of Mordor grant them too.</p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {LOTR_ADVERSARY_TRAITS.map((t) => (
            <div key={t.name} className={cardCls}>
              <h3 className="text-lg text-[var(--sys-link)]">{t.name}</h3>
              <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--muted)]">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="nameless" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Nameless Things</h2>
        <p className="mb-3 text-[13px] leading-relaxed text-[var(--muted)]">Roll up an ancient horror from the deep places of the world: a three-part title, a form and an aspect, what heralds it and what is seen first — then its size and statistics, attacks and special traits.</p>
        <div className={cardCls}>
          <h3 className="text-lg text-[var(--sys-link)]">Name &amp; Appearance (d12)</h3>
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <D12 title="Title — first part" rows={N.title1} />
            <D12 title="Title — second part" rows={N.title2} />
            <D12 title="Title — known…" rows={N.title3} />
            <D12 title="Form" rows={N.form} />
            <D12 title="Aspect" rows={N.aspect} />
            <D12 title="Heralded by" rows={N.before} />
            <D12 title="First seen" rows={N.first} />
          </div>
        </div>

        <div className={`${cardCls} mt-4`}>
          <h3 className="text-lg text-[var(--sys-link)]">Statistics (d20)</h3>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse">
              <thead><tr><th className={th}>d20</th><th className={th}>Size</th><th className={th}>AC</th><th className={th}>Hit Points</th><th className={th}>Physical</th><th className={th}>CR (PB)</th></tr></thead>
              <tbody>{N.stats.map((s) => (
                <tr key={s.d20}><td className={`${td} font-mono text-[var(--sys-link)]`}>{s.d20}</td><td className={td}>{s.size}</td><td className={`${td} font-mono`}>{s.ac}</td><td className={`${td} font-mono`}>{s.hp}</td><td className={td}>{s.abilities}</td><td className={`${td} font-mono`}>{s.cr}</td></tr>
              ))}</tbody>
            </table>
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">All Nameless Things:</span> {N.base}</p>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className={cardCls}>
            <h3 className="text-lg text-[var(--sys-link)]">Natural Weapons</h3>
            <div className="mt-2 flex flex-col gap-1.5">
              {N.attacks.map((a) => <p key={a.name} className="text-[12.5px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{a.name}.</span> {a.text}</p>)}
            </div>
          </div>
          <div className={cardCls}>
            <h3 className="text-lg text-[var(--sys-link)]">Special Traits (d20)</h3>
            <div className="mt-2 flex flex-col gap-1.5">
              {N.traits.map((t) => <p key={t.name} className="text-[12.5px] leading-relaxed text-[var(--muted)]"><span className="inline-block w-10 font-mono text-[11px] text-[var(--lotr)]">{t.min === t.max ? t.min : `${t.min}–${t.max}`}</span><span className="font-semibold text-[var(--text)]">{t.name}.</span> {t.text}</p>)}
            </div>
            <p className="mt-2 text-[12px] italic text-[var(--muted)]">{N.traitNote}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
