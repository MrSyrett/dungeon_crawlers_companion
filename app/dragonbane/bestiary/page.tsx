import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DB_MONSTERS, DB_MONSTER_RULES, DB_NPCS, DB_ANIMALS, DB_NPC_TRAITS, DB_NPC_ATTRIBUTES, DB_GM_TABLES, DB_BESTIARY_CHAPTERS, DB_KIN_LORE, DB_NPC_GROUPS } from "@/lib/data/db-data";
import type { DbMonster, DbMonsterAttack, DbNpc } from "@/lib/data/db-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { DbHeader, ModeRow, ChipRow, SearchForm, CountLine, EmptyState, BackLink, SectionNav, Bullets, cardCls, nameCls, badge, hbBadge, eyebrow, sectionH, th, td, one, isHb, srcKey, srcChips, srcPage, rollText, type RawQuery } from "@/components/DbRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
// Monsters and NPCs share one page as two tabs (`?tab=npcs`). The tab switch is a
// real navigation (two differently-shaped views, each with its own homebrew
// editor and filters); within a tab the chips and search filter on the client
// (InstantFilter), which carries `tab` through untouched. Only the active tab
// renders and fetches its homebrew. The old /dragonbane/npcs route redirects
// here (next.config.ts).
const BASE = "/dragonbane/bestiary";
const NPC_BASE = `${BASE}?tab=npcs`;
const TABS = [{ key: "monsters", label: "Monsters" }, { key: "npcs", label: "NPCs" }];
const SIZES = ["Small", "Normal", "Large", "Huge", "Swarm"];
const KIND_ORDER = ["Typical", "Goblin", "Hobgoblin", "Orc", "Ogre", "Skeleton", "Cat People", "Frog People", "Karkion", "Lizard People", "Satyr"];
const KIND_LABEL: Record<string, string> = { Typical: "Typical NPCs", Goblin: "Goblins", Hobgoblin: "Hobgoblins", Orc: "Orcs", Ogre: "Ogres", Skeleton: "Skeletons", Karkion: "Karkions", Satyr: "Satyrs" };
// Monster families: the Bestiary's chapters (core monsters are filed under the same ones).
const CATEGORIES = ["Rare Kin", "Insectoids", "Trolls", "Giants", "Beasts", "Undead", "Dragons", "Demons", "Path of Glory", "Monsters"];
const catOf = (m: DbMonster) => String(m.category ?? "Monsters");

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
  if (!a.dodge) t.push("can't be dodged"); else if (a.dodge === "bane") t.push("dodge with a bane");
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
        <span className="flex flex-wrap gap-1.5"><span className={badge}>{catOf(m)}</span>{m.page ? <span className={badge}>{srcPage(m)}{m.corePage ? ` · Core p.${String(m.corePage)}` : ""}</span> : null}</span>
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
      {m.encounter || m.seed ? (
        <>
          <h3 className={`${sectionH} mt-5`}>For the GM</h3>
          {m.encounter ? <p className="text-[13px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Random encounter.</span> {String(m.encounter)}</p> : null}
          {m.seed ? <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Adventure seed.</span> {String(m.seed)}</p> : null}
        </>
      ) : null}
    </div>
  );
}

const dmgText = (d: DbNpc["damageBonus"]) => (d && Object.keys(d).length ? Object.entries(d).map(([k, v]) => `${k} +${v}`).join(", ") : "—");

function NpcCard({ n }: { n: DbNpc }) {
  const skills = Object.entries(n.skills).map(([k, v]) => `${k} ${v}`).join(", ");
  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <h3 className={nameCls}>{n.name} {isHb(n) ? <span className={hbBadge}>HB</span> : null}</h3>
        <span className="flex shrink-0 gap-1.5">{n.boss ? <span className={badge}>Boss</span> : null}<span className={badge}>{n.kind}</span></span>
      </div>
      <div className="mt-2 grid grid-cols-4 gap-1 text-center">
        {[["Mov", n.movement ?? "—"], ["Dmg bonus", dmgText(n.damageBonus)], ["HP", n.hp], ["WP", n.wp ?? "—"]].map(([k, v]) => (
          <div key={String(k)} className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-1 py-1">
            <div className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{k}</div>
            <div className="font-mono text-[12.5px] font-bold text-[var(--text)]">{v}</div>
          </div>
        ))}
      </div>
      <dl className="mt-2 flex flex-col gap-0.5 text-[12.5px] text-[var(--muted)]">
        {n.armor ? <div><dt className="inline font-semibold text-[var(--text)]">Armor:</dt> <dd className="inline">{n.armor.name} ({n.armor.rating})</dd></div> : null}
        {skills ? <div><dt className="inline font-semibold text-[var(--text)]">Skills:</dt> <dd className="inline">{skills}</dd></div> : null}
        {n.abilities.length ? <div><dt className="inline font-semibold text-[var(--text)]">Heroic abilities:</dt> <dd className="inline">{n.abilities.join(", ")}</dd></div> : null}
        {n.kinAbility ? <div><dt className="inline font-semibold text-[var(--text)]">Kin ability:</dt> <dd className="inline"><a className="underline" href={`/dragonbane/kin?k=${encodeURIComponent(n.kind)}`}>{String(n.kinAbility)}</a></dd></div> : null}
        {n.spells?.length ? <div><dt className="inline font-semibold text-[var(--text)]">Spells:</dt> <dd className="inline">{n.spells.join(", ")}</dd></div> : null}
        {Array.isArray(n.tricks) && n.tricks.length ? <div><dt className="inline font-semibold text-[var(--text)]">Tricks:</dt> <dd className="inline">{(n.tricks as string[]).join(", ")}</dd></div> : null}
        {n.weapons?.length ? <div><dt className="inline font-semibold text-[var(--text)]">Weapons:</dt> <dd className="inline">{n.weapons.map((w) => `${w.qty && w.qty > 1 ? `${w.qty}× ` : ""}${w.name} (skill ${w.skill}, ${w.damage})`).join("; ")}</dd></div> : null}
        {n.gear?.length ? <div><dt className="inline font-semibold text-[var(--text)]">Gear:</dt> <dd className="inline">{n.gear.join(", ")}</dd></div> : null}
      </dl>
      {n.traits?.length ? <Bullets className="mt-1.5" items={n.traits.map((t) => DB_NPC_TRAITS[t as keyof typeof DB_NPC_TRAITS] ? `${t}: ${DB_NPC_TRAITS[t as keyof typeof DB_NPC_TRAITS]}` : t)} /> : null}
    </>
  );
}

export default async function DbBestiaryPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const tab = one(raw.tab) === "npcs" ? "npcs" : "monsters";
  return tab === "npcs" ? <NpcsTab userId={user.id} raw={raw} /> : <MonstersTab userId={user.id} raw={raw} />;
}

function Tabs({ active }: { active: string }) {
  return <ModeRow base={BASE} current={{}} param="tab" options={TABS} active={active} />;
}

async function MonstersTab({ userId, raw }: { userId: string; raw: RawQuery }) {

  const [hbV, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(userId, { type: "db-monster" }),
    ownHomebrew(userId, "db-monster"),
    userCampaigns(userId),
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
  const cats = CATEGORIES.filter((c) => all.some((m) => catOf(m) === c));
  const cat = cats.includes(one(raw.cat)) ? one(raw.cat) : "";
  const current = { q: one(raw.q), cat, size, fer, src };
  const facets = (m: DbMonster) => ({ cat: catOf(m), size: m.size, fer: String(m.ferocity), src: srcKey(m.source) });
  const show = (m: DbMonster) => facetMatch(facets(m), current) && (!q || m.name.toLowerCase().includes(q) || m.text.toLowerCase().includes(q));
  const list = all.slice().sort((a, b) => CATEGORIES.indexOf(catOf(a)) - CATEGORIES.indexOf(catOf(b)) || Number(a.page ?? 0) - Number(b.page ?? 0) || a.name.localeCompare(b.name));
  const shown = list.filter(show).length;
  const R = DB_MONSTER_RULES;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <DbHeader title="Bestiary" subtitle={`${DB_MONSTERS.length} monsters${hbMonsters.length ? ` + ${hbMonsters.length} homebrew` : ""} · Core Rules + Bestiary · dragons, demons & worse`} />
      <Tabs active="monsters" />
      <HomebrewEditor kind="db-monster" campaigns={campaigns} initial={hbOwn} />
      <SectionNav items={[{ id: "monsters", label: "Stat Blocks" }, { id: "rules", label: "Fighting Monsters" }, { id: "families", label: "Monster Families" }]} />

      <section id="monsters" className="scroll-mt-20">
        <InstantFilter>
          <SearchForm base={BASE} q={one(raw.q)} placeholder="Search monsters…" hidden={{ cat, size, fer, src }} />
          <ChipRow label="Family" base={BASE} current={current} param="cat" options={cats.map((c) => ({ key: c, label: c }))} active={cat} />
          <ChipRow label="Size" base={BASE} current={current} param="size" options={sizes.map((s) => ({ key: s, label: s }))} active={size} />
          <ChipRow label="Ferocity" base={BASE} current={current} param="fer" options={fers.map((f) => ({ key: f, label: f }))} active={fer} />
          <ChipRow label="Source" base={BASE} current={current} param="src" options={srcOpts} active={src} />
          <CountLine count={shown} noun="monster" base={BASE} filtered={!!(q || cat || size || fer || src)} />
          <EmptyState noun="monster" base={BASE} hidden={shown > 0} />
          <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2 lg:grid-cols-3">
            {list.map((m, i) => (
              <li key={`${m.id}-${i}`} className={cardCls} hidden={!show(m)} data-f={facetAttr(facets(m))}>
                <a href={`${BASE}?m=${encodeURIComponent(m.id)}`} className="group block">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`${nameCls} group-hover:underline`}>{m.name} {isHb(m) ? <span className={hbBadge}>HB</span> : null}</h3>
                    <span className="flex shrink-0 gap-1.5">{srcKey(m.source) === "bestiary" ? <span className={badge}>Bestiary</span> : srcKey(m.source) === "pathofglory" ? <span className={badge}>Path of Glory</span> : null}<span className={badge}>{m.size}</span></span>
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
            <p className="mt-2 text-[12.5px] text-[var(--muted)]">Goblins, hobgoblins, orcs, ogres, skeletons and the Bestiary&apos;s playable kin are not monsters — they fight as ordinary NPCs. See the <a href={NPC_BASE} className="text-[var(--sys-link)] underline">NPCs</a> tab.</p>
          </div>
        </div>
      </section>

      <section id="families" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Monster families</h2>
        <p className="mb-3 text-[13px] text-[var(--muted)]">The Bestiary files its creatures in chapters. Rules shared across a family are noted here; each creature&apos;s own rules are in its stat block.</p>
        <div className="grid gap-4 md:grid-cols-2">
          {DB_BESTIARY_CHAPTERS.map((c) => (
            <div key={c.category} className={cardCls}>
              <div className="flex items-start justify-between gap-2"><a href={`${BASE}?cat=${encodeURIComponent(c.category)}`} className={`${nameCls} hover:underline`}>{c.category}</a><span className={badge}>Bestiary p.{c.page}</span></div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--muted)]">{c.text}</p>
              {c.rules.length ? <dl className="mt-1.5 flex flex-col gap-0.5 text-[12.5px] text-[var(--muted)]">{c.rules.map((r) => <div key={r.name}><dt className="inline font-semibold text-[var(--text)]">{r.name}.</dt> <dd className="inline">{r.text}</dd></div>)}</dl> : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

async function NpcsTab({ userId, raw }: { userId: string; raw: RawQuery }) {

  const [hbV, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(userId, { type: "db-npc" }),
    ownHomebrew(userId, "db-npc"),
    userCampaigns(userId),
  ]);
  const hbNpcs = hbV.map((h) => h.data as unknown as DbNpc);
  const all = [...hbNpcs, ...DB_NPCS];

  const q = one(raw.q).trim().toLowerCase();
  const kinds = [...KIND_ORDER.filter((k) => all.some((n) => n.kind === k)), ...[...new Set(all.map((n) => n.kind))].filter((k) => !KIND_ORDER.includes(k)).sort()];
  const kind = kinds.includes(one(raw.kind)) ? one(raw.kind) : "";
  const roles = [{ key: "minion", label: "Minions" }, { key: "boss", label: "Bosses" }];
  const role = roles.some((r) => r.key === one(raw.role)) ? one(raw.role) : "";
  const srcOpts = srcChips(all.map((n) => n.source));
  const src = srcOpts.some((o) => o.key === one(raw.src)) ? one(raw.src) : "";
  const current = { q: one(raw.q), kind, role, src };
  const links = { tab: "npcs", ...current }; // chip hrefs keep the tab
  const facets = (n: DbNpc) => ({ kind: n.kind, role: n.boss ? "boss" : "minion", src: srcKey(n.source) });
  const show = (n: DbNpc) => facetMatch(facets(n), current) && (!q || n.name.toLowerCase().includes(q));
  const list = all.slice().sort((a, b) => (kinds.indexOf(a.kind) - kinds.indexOf(b.kind)) || Number(!!a.boss) - Number(!!b.boss) || a.name.localeCompare(b.name));
  const shown = list.filter(show).length;
  const gen = DB_GM_TABLES.npc;
  const A = DB_NPC_ATTRIBUTES;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <DbHeader title="Bestiary" subtitle={`${DB_NPCS.length} NPC stat blocks · ${DB_ANIMALS.length} animals${hbNpcs.length ? ` · +${hbNpcs.length} homebrew` : ""}`} />
      <Tabs active="npcs" />
      <HomebrewEditor kind="db-npc" campaigns={campaigns} initial={hbOwn} />
      <SectionNav items={[{ id: "npcs", label: "Stat Blocks" }, { id: "encounters", label: "Encounters & Seeds" }, { id: "running", label: "Running NPCs" }, { id: "animals", label: "Common Animals" }, { id: "generator", label: "Random NPCs" }]} />

      <section id="npcs" className="scroll-mt-20">
        <InstantFilter>
          <SearchForm base={BASE} q={one(raw.q)} placeholder="Search NPCs…" hidden={{ tab: "npcs", kind, role, src }} />
          <ChipRow label="Group" base={BASE} current={links} param="kind" options={kinds.map((k) => ({ key: k, label: KIND_LABEL[k] ?? k }))} active={kind} />
          <ChipRow label="Role" base={BASE} current={links} param="role" options={roles} active={role} />
          <ChipRow label="Source" base={BASE} current={links} param="src" options={srcOpts} active={src} />
          <CountLine count={shown} noun="NPC" base={NPC_BASE} filtered={!!(q || kind || role || src)} />
          <EmptyState noun="NPC" base={NPC_BASE} hidden={shown > 0} />
          <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2 lg:grid-cols-3">
            {list.map((n, i) => <li key={`${n.id}-${i}`} className={cardCls} hidden={!show(n)} data-f={facetAttr(facets(n))}><NpcCard n={n} /></li>)}
          </ul>
        </InstantFilter>
      </section>

      <section id="encounters" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Encounters &amp; adventure seeds</h2>
        <p className="mb-3 text-[13px] text-[var(--muted)]">From the Bestiary: a random encounter and an adventure seed for each NPC people.</p>
        <div className="grid gap-4 md:grid-cols-2">
          {[...DB_KIN_LORE.map((l) => ({ kind: l.kin, page: l.page, text: l.text, encounter: l.encounter, seed: l.seed, kin: true })),
            ...DB_NPC_GROUPS.map((g) => ({ kind: String(g.kind), page: Number(g.page), text: String(g.text ?? ""), encounter: g.encounter as string | null | undefined, seed: g.seed as string | null | undefined, kin: false }))].map((l) => (
            <div key={l.kind} className={cardCls}>
              <div className="flex items-start justify-between gap-2"><p className={nameCls}>{KIND_LABEL[l.kind] ?? l.kind}</p><span className={badge}>Bestiary p.{l.page}</span></div>
              {l.encounter ? <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Encounter.</span> {l.encounter}</p> : null}
              {l.seed ? <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Seed.</span> {l.seed}</p> : null}
              {l.kin ? <p className="mt-1.5 text-[12px]"><a className="text-[var(--sys-link)] underline" href={`/dragonbane/kin?k=${encodeURIComponent(l.kind)}`}>Playable kin →</a></p> : null}
            </div>
          ))}
        </div>
      </section>

      <section id="running" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Running NPCs</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className={cardCls}>
            <p className={eyebrow}>Minions &amp; bosses</p>
            <Bullets className="mt-1" items={[A.minions, A.bosses, "Roll for NPCs only when what they do affects a player character directly; an unlisted skill is level 5. At zero HP an NPC makes no death rolls — the GM decides."]} />
          </div>
          <div className={cardCls}>
            <p className={eyebrow}>NPC attributes</p>
            <dl className="mt-1 flex flex-col gap-0.5 text-[12.5px] text-[var(--muted)]">{(["STR", "AGL", "CON", "WIL", "INT", "CHA"] as const).map((k) => <div key={k}><dt className="inline font-semibold text-[var(--text)]">{k}:</dt> <dd className="inline">{A[k]}</dd></div>)}</dl>
          </div>
        </div>
      </section>

      <section id="animals" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Common animals</h2>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--panel)]">
          <table className="w-full min-w-[560px] border-collapse">
            <thead><tr>{["Animal", "Movement", "HP", "Attack", "Skills"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
            <tbody>{DB_ANIMALS.map((a) => (
              <tr key={a.id}>
                <td className={`${td} font-semibold text-[var(--text)]`}>{a.name}</td><td className={td}>{a.movement}</td><td className={td}>{a.hp}</td>
                <td className={td}>{a.attack.name} (skill {a.attack.skill}, {a.attack.damage})</td>
                <td className={td}>{Object.entries(a.skills).map(([k, v]) => `${k} ${v}`).join(", ")}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>

      <section id="generator" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Random NPCs</h2>
        <p className="mb-3 text-[13px] text-[var(--muted)]">{gen.note} The name column lists three options per roll — pick one.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(gen.columns ?? []).map((c) => (
            <div key={c.die} className={cardCls}>
              <p className="font-label text-[13px] tracking-[0.06em] text-[var(--sys-sub)]">{c.name}<span className="ml-2 font-mono text-[11px] text-[var(--db-ink)]">{c.die}</span></p>
              <ol className="mt-1.5 flex flex-col gap-0.5 text-[12.5px] text-[var(--muted)]">
                {c.values.map((v, i) => <li key={i}><span className="mr-2 inline-block w-6 font-mono text-[11px] text-[var(--db-ink)]">{i + 1}</span>{v}</li>)}
              </ol>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
