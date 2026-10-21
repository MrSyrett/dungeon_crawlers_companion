import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DB_MONSTERS, DB_MONSTER_RULES } from "@/lib/data/db-data";
import type { DbMonster, DbMonsterAttack } from "@/lib/data/db-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { DbHeader, ChipRow, SearchForm, CountLine, EmptyState, BackLink, SectionNav, Bullets, cardCls, nameCls, badge, hbBadge, eyebrow, sectionH, one, isHb, srcKey, srcChips, rollText, type RawQuery } from "@/components/DbRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/dragonbane/bestiary";
const SIZES = ["Small", "Normal", "Large", "Huge", "Swarm"];

const armorText = (a: DbMonster["armor"]) => (a == null || a === "" ? "—" : `${a}`);
const perText = (m: DbMonster, v: number, key: string) => `${v}${m[key] ? `/${String(m[key])}` : ""}`;

function attackTags(a: DbMonsterAttack): string[] {
  const t: string[] = [];
  if (a.damage) t.push(`${a.damage}${a.type ? ` ${a.type}` : ""}`);
  if (a.fear) t.push(a.fear === "bane" ? "fear (bane)" : "fear");
  if (a.prone) t.push("knocks down");
  if (a.conditions?.length) t.push(a.conditions.join(", "));
  const p = a.poison as { type?: string; potency?: number } | undefined;
  if (p?.type) t.push(`${p.type} poison ${p.potency ?? ""}`.trim());
  if (a.ignoresArmor) t.push("armor no effect");
  t.push(a.parry ? "can be parried" : "no parry");
  if (!a.dodge) t.push("can't be dodged");
  return t;
}

function AttackTable({ m }: { m: DbMonster }) {
  return (
    <ol className="flex flex-col gap-2">
      {m.attacks.map((a, i) => (
        <li key={i} className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-3">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="w-8 shrink-0 font-mono text-[12px] text-[var(--db-ink)]">{rollText((a.rolls as [number, number] | undefined) ?? a.roll)}</span>
            <span className="font-display text-[17px] text-[var(--text)]">{a.name}!</span>
            <span className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">{attackTags(a).join(" · ")}</span>
          </div>
          <p className="mt-1 pl-10 text-[13px] leading-relaxed text-[var(--muted)]">{a.text}</p>
          {Array.isArray(a.curses) && a.curses.length ? (
            <ol className="mt-1 list-decimal pl-14 text-[12.5px] text-[var(--muted)] marker:text-[var(--db-ink)]">{(a.curses as string[]).map((c) => <li key={c}>{c}</li>)}</ol>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function StatLine({ m }: { m: DbMonster }) {
  return (
    <div className="grid grid-cols-2 gap-1 text-center sm:grid-cols-5">
      {[["Ferocity", perText(m, m.ferocity, "ferocityPer")], ["Size", m.size], ["Movement", `${m.movement}${m.flying ? " (flies)" : ""}`], ["Armor", armorText(m.armor)], ["HP", perText(m, m.hp, "hpPer")]].map(([k, v]) => (
        <div key={k} className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-1 py-1.5">
          <div className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{k}</div>
          <div className="font-mono text-sm font-bold text-[var(--text)]">{v}</div>
        </div>
      ))}
    </div>
  );
}

function MonsterDetail({ m }: { m: DbMonster }) {
  const extra: string[] = [
    ...((m.resistances as string[] | undefined) ?? []).map((r) => `Resistance: ${r}`),
    ...((m.immunities as string[] | undefined) ?? []).map((r) => `Immunity: ${r}`),
  ];
  return (
    <div className={`${cardCls} border-l-4`} style={{ borderLeftColor: "var(--db)" }}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-3xl text-[var(--sys-link)]">{m.name} {isHb(m) ? <span className={hbBadge}>HB</span> : null}</h2>
        {m.page ? <span className={badge}>p.{m.page}</span> : null}
      </div>
      <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--muted)]">{m.text}</p>
      <div className="mt-3"><StatLine m={m} /></div>
      {m.traits.length || extra.length || m.persuadable ? (
        <dl className="mt-3 flex flex-col gap-1 text-[13px] text-[var(--muted)]">
          {m.traits.map((t) => <div key={t.name}><dt className="inline font-semibold italic text-[var(--text)]">{t.name}.</dt> <dd className="inline">{t.text}</dd></div>)}
          {m.persuadable && !m.traits.some((t) => /persuad/i.test(t.name)) ? <div><dt className="inline font-semibold italic text-[var(--text)]">Persuadable.</dt> <dd className="inline">Can usually be persuaded, with a bane.</dd></div> : null}
        </dl>
      ) : null}
      {extra.length ? <Bullets className="mt-2" items={extra} /> : null}
      <h3 className={`${sectionH} mt-5`}>Monster attacks (D6)</h3>
      <p className="mb-2 text-[12px] italic text-[var(--muted)]">Roll or choose each turn. Monster attacks always hit; never the same attack twice in a row (a repeat becomes the next entry, 6 wraps to 1).</p>
      <AttackTable m={m} />
    </div>
  );
}

export default async function DbBestiaryPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;

  const [hbV, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "db-monster" }),
    ownHomebrew(user.id, "db-monster"),
    userCampaigns(user.id),
  ]);
  const hbMonsters = hbV.map((h) => h.data as unknown as DbMonster);
  const all = [...hbMonsters, ...DB_MONSTERS];

  const pick = one(raw.m);
  const selected = pick ? all.find((m) => m.id === pick || m.name === pick) ?? null : null;
  if (selected) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <DbHeader title="Bestiary" subtitle={`${selected.size} monster · Ferocity ${selected.ferocity}`} />
        <BackLink href={BASE} label="All monsters" />
        <MonsterDetail m={selected} />
      </div>
    );
  }

  const q = one(raw.q).trim().toLowerCase();
  const sizes = SIZES.filter((s) => all.some((m) => m.size === s));
  const size = sizes.includes(one(raw.size)) ? one(raw.size) : "";
  const fers = [...new Set(all.map((m) => String(m.ferocity)))].sort();
  const fer = fers.includes(one(raw.fer)) ? one(raw.fer) : "";
  const srcOpts = srcChips(all.map((m) => m.source));
  const src = srcOpts.some((o) => o.key === one(raw.src)) ? one(raw.src) : "";
  const current = { q: one(raw.q), size, fer, src };
  const facets = (m: DbMonster) => ({ size: m.size, fer: String(m.ferocity), src: srcKey(m.source) });
  const show = (m: DbMonster) => facetMatch(facets(m), current) && (!q || m.name.toLowerCase().includes(q) || m.text.toLowerCase().includes(q));
  const list = all.slice().sort((a, b) => a.name.localeCompare(b.name));
  const shown = list.filter(show).length;
  const R = DB_MONSTER_RULES;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <DbHeader title="Bestiary" subtitle={`${DB_MONSTERS.length} monsters${hbMonsters.length ? ` + ${hbMonsters.length} homebrew` : ""} · dragons, demons & worse`} />
      <HomebrewEditor kind="db-monster" campaigns={campaigns} initial={hbOwn} />
      <SectionNav items={[{ id: "monsters", label: "Monsters" }, { id: "rules", label: "Fighting Monsters" }]} />

      <section id="monsters" className="scroll-mt-20">
        <InstantFilter>
          <SearchForm base={BASE} q={one(raw.q)} placeholder="Search monsters…" hidden={{ size, fer, src }} />
          <ChipRow label="Size" base={BASE} current={current} param="size" options={sizes.map((s) => ({ key: s, label: s }))} active={size} />
          <ChipRow label="Ferocity" base={BASE} current={current} param="fer" options={fers.map((f) => ({ key: f, label: f }))} active={fer} />
          <ChipRow label="Source" base={BASE} current={current} param="src" options={srcOpts} active={src} />
          <CountLine count={shown} noun="monster" base={BASE} filtered={!!(q || size || fer || src)} />
          <EmptyState noun="monster" base={BASE} hidden={shown > 0} />
          <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2 lg:grid-cols-3">
            {list.map((m, i) => (
              <li key={`${m.id}-${i}`} className={cardCls} hidden={!show(m)} data-f={facetAttr(facets(m))}>
                <a href={`${BASE}?m=${encodeURIComponent(m.id)}`} className="group block">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`${nameCls} group-hover:underline`}>{m.name} {isHb(m) ? <span className={hbBadge}>HB</span> : null}</h3>
                    <span className={badge}>{m.size}</span>
                  </div>
                  <p className="mt-1 text-[12px] text-[var(--muted)]">Ferocity {perText(m, m.ferocity, "ferocityPer")} · Mov {m.movement}{m.flying ? " (flies)" : ""} · Armor {armorText(m.armor)} · HP {perText(m, m.hp, "hpPer")}</p>
                  <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-[var(--muted)]">{m.text}</p>
                  <p className="mt-1.5 text-[11.5px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Attacks:</span> {m.attacks.map((a) => a.name).join(" · ")}</p>
                </a>
              </li>
            ))}
          </ul>
        </InstantFilter>
      </section>

      <section id="rules" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Fighting monsters</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className={cardCls}>
            <p className={eyebrow}>How monsters act</p>
            <Bullets className="mt-1" items={[R.ferocity, R.attacks, R.defense, R.topple, R.resistance, R.other]} />
          </div>
          <div className={cardCls}>
            <p className={eyebrow}>Size</p>
            <dl className="mt-1 flex flex-col gap-0.5 text-[12.5px] text-[var(--muted)]">{Object.entries(R.sizes).map(([k, v]) => <div key={k}><dt className="inline font-semibold text-[var(--text)]">{k}:</dt> <dd className="inline">{v}</dd></div>)}</dl>
            <p className="mt-2 text-[12.5px] text-[var(--muted)]">Goblins, orcs and skeletons are not monsters — they fight as ordinary NPCs. See <a href="/dragonbane/npcs" className="text-[var(--sys-link)] underline">NPCs</a>.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
