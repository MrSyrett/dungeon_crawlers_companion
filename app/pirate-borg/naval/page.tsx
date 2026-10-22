import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import {
  PB_SHIPS, PB_SHIP_STATS, PB_NAVAL_RULES, PB_CREW_ACTIONS, PB_DERELICT, PB_SPECIALTY_CREW, PB_CREW_MODS,
  PB_SHANTY_RULES, PB_SHANTIES, PB_WIND, PB_POINT_OF_SAIL, PB_CHANGING_WINDS, PB_FOUL_WEATHER, PB_SHIPWRIGHT, PB_TRAVEL,
  PB_SHIP_TEMPLATES, PB_TRAVEL_EVENTS, PB_SHIPS_AT_SEA, PB_CARGO, PB_DERELICT_GEN, PB_MONSTERS, PB_CAPTAINS,
} from "@/lib/data/pb-data";
import type { PbShip, PbCrewMod, PbShipwrightRow, PbShipTemplate, PbRollEntry } from "@/lib/data/pb-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { dot, TableCard, chipBase, chipOff, badge, dBadge, sourceRefs, srcKeys, PbHeader, ChipRow, SearchForm, CountLine, EmptyState, BackLink, SectionNav, RuleNote, Bullets, DieTable, ShipBlock, N, cardCls, eyebrow, sectionH, th, td, tdNum, tableWrap, one, srcChips, shipTypeLabel, signed, type RawQuery } from "@/components/PbRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/pirate-borg/naval";
const TYPES = ["boat", "ship", "fortification"];

function modText(m: PbCrewMod): string {
  if (m.reset) return "reset";
  if (m.recover != null) return `recover ${m.recover}`;
  return `${signed(m.mod ?? 0)}${m.per ? ` / ${m.per}` : ""}`;
}
function WrightTable({ title, rows }: { title: string; rows: PbShipwrightRow[] }) {
  return (
    <div className={cardCls}>
      <p className={eyebrow}>{title}</p>
      <table className="mt-1 w-full border-collapse">
        <tbody>{rows.map((r) => <tr key={r.id}><td className={`${td} font-semibold text-[var(--text)]`}>{r.name}</td><td className={td}>{r.effect}</td><td className={`${tdNum} whitespace-nowrap`}>{r.cost}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

// Stat-block links for rows that name a monster, ship, ship template or captain.
type Ref = { key: string; label: string; href: string };
function rowRefs(rows: PbRollEntry[]): Ref[] {
  const out = new Map<string, Ref>();
  const add = (id: unknown) => {
    if (typeof id !== "string") return;
    const ship = PB_SHIPS.find((x) => x.id === id), tpl = PB_SHIP_TEMPLATES.find((x) => x.id === id), mon = PB_MONSTERS.find((x) => x.id === id);
    if (ship) out.set(id, { key: id, label: ship.name, href: `${BASE}?s=${encodeURIComponent(id)}` });
    else if (tpl) out.set(id, { key: id, label: tpl.name, href: `${BASE}#template-${id}` });
    else if (mon) out.set(id, { key: id, label: mon.name, href: `/pirate-borg/bestiary?m=${encodeURIComponent(id)}` });
  };
  for (const r of rows) {
    add(r.monster); add(r.ship); if (Array.isArray(r.ships)) r.ships.forEach(add);
    if (typeof r.captain === "string") { const c = PB_CAPTAINS.find((x) => x.id === r.captain); if (c) out.set(c.id, { key: c.id, label: c.name, href: `/pirate-borg/bestiary#captain-${c.id}` }); }
  }
  return [...out.values()];
}
function RefChips({ rows, label = "Stat blocks" }: { rows: PbRollEntry[]; label?: string }) {
  const refs = rowRefs(rows);
  if (!refs.length) return null;
  return <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{label}:</span>{refs.map((r) => <a key={r.key} href={r.href} className={`${chipBase} ${chipOff} !px-2 !py-0.5`}>{r.label}</a>)}</p>;
}
function TemplateCard({ t }: { t: PbShipTemplate }) {
  const base = t.template ? PB_SHIP_TEMPLATES.find((x) => x.id === t.template) : undefined;
  const cap = t.captain ? PB_CAPTAINS.find((c) => c.id === t.captain) : undefined;
  const mons = t.traits.flatMap((tr) => (Array.isArray(tr.monsters) ? tr.monsters : [])).map((x) => (typeof x === "string" ? { id: x, count: 0 } : (x as { id: string; count: number })));
  return (
    <article id={`template-${t.id}`} className={`${cardCls} scroll-mt-20`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-[20px] leading-tight text-[var(--sys-link)]">{t.name}</h3>
        <span className="flex gap-1.5">{t.undead ? <span className={badge}>Undead</span> : null}{cap ? <span className={badge}>Captain&apos;s fleet</span> : null}<span className={dBadge}>pg. {t.page}</span></span>
      </div>
      <p className="mt-1 text-[13px] italic leading-relaxed text-[var(--muted)]">{t.text}</p>
      {base ? <p className="mt-1.5 text-[12.5px] text-[var(--muted)]">Applies the <a href={`#template-${base.id}`} className="text-[var(--sys-link)] hover:underline">{base.name}</a> template, plus:</p> : null}
      <dl className="mt-1.5 flex flex-col gap-1 text-[13px] leading-relaxed text-[var(--muted)]">
        {t.traits.map((tr) => <div key={tr.name}><dt className="inline font-semibold italic text-[var(--text)]">{dot(tr.name)}</dt> <dd className="inline">{tr.text}</dd></div>)}
      </dl>
      {mons.length ? <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Stat blocks:</span>{mons.map((m) => { const x = PB_MONSTERS.find((y) => y.id === m.id); return x ? <a key={m.id} href={`/pirate-borg/bestiary?m=${encodeURIComponent(m.id)}`} className={`${chipBase} ${chipOff} !px-2 !py-0.5`}>{x.name}{m.count ? ` ×${m.count}` : ""}</a> : null; })}</p> : null}
      {t.baseShips?.length || cap ? (
        <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[12px] text-[var(--muted)]">
          {cap ? <><span className="font-semibold text-[var(--text)]">Captain:</span><a href={`/pirate-borg/bestiary#captain-${cap.id}`} className={`${chipBase} ${chipOff} !px-2 !py-0.5`}>{cap.name}</a></> : null}
          {t.baseShips?.length ? <><span className="font-semibold text-[var(--text)]">Base ships:</span>{t.baseShips.map((id) => { const b = PB_SHIPS.find((x) => x.id === id); return b ? <a key={id} href={`${BASE}?s=${encodeURIComponent(id)}`} className={`${chipBase} ${chipOff} !px-2 !py-0.5`}>{b.name}</a> : null; })}</> : <span>Use any vessel&apos;s base stats.</span>}
        </p>
      ) : <p className="mt-2 text-[12px] text-[var(--muted)]">Lay it over any vessel&apos;s base stats.</p>}
    </article>
  );
}

export default async function PbNavalPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;

  const [hbV, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "pb-ship" }),
    ownHomebrew(user.id, "pb-ship"),
    userCampaigns(user.id),
  ]);
  const hbShips = hbV.map((h) => h.data as unknown as PbShip);
  // Book order: smallest boat to ship of the line, then the forts.
  const ORDER = ["raft", "dinghy", "canoe", "longboat", "piragua", "tartane", "sloop", "brigantine", "fluyt", "galley", "frigate", "galleon", "man-of-war", "ship-of-the-line", "fort", "fort-amsterdam"];
  const rank = (s: PbShip) => { const i = ORDER.indexOf(s.id); return i < 0 ? ORDER.length : i; };
  const all = [...hbShips, ...PB_SHIPS.slice().sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name))];

  const pick = one(raw.s);
  const selected = pick ? all.find((s) => s.id === pick || s.name === pick) ?? null : null;
  if (selected) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <PbHeader title="Naval" subtitle={`${shipTypeLabel(selected.type)} · ${selected.source}`} />
        <BackLink href={BASE} label="All ships" />
        <ShipBlock s={selected} />
        {PB_SHIPS.includes(selected) && selected.type !== "fortification" ? (
          <div className={`${cardCls} mt-4`}>
            <p className={eyebrow}>Templates for this vessel</p>
            <p className="mt-1 flex flex-wrap gap-1.5">{PB_SHIP_TEMPLATES.filter((t) => !t.baseShips || t.baseShips.includes(selected.id)).map((t) => <a key={t.id} href={`${BASE}#template-${t.id}`} className={`${chipBase} ${chipOff} !px-2 !py-0.5`}>{t.name}</a>)}</p>
          </div>
        ) : null}
        <dl className={`${cardCls} mt-4 flex flex-col gap-1 text-[12.5px] text-[var(--muted)]`}>
          {PB_SHIP_STATS.map((st) => <div key={st.id}><dt className="inline font-semibold text-[var(--text)]">{st.name}:</dt> <dd className="inline">{st.text}</dd></div>)}
        </dl>
      </div>
    );
  }

  const q = one(raw.q).trim().toLowerCase();
  const types = [...TYPES, ...new Set(all.map((s) => s.type).filter((t) => !TYPES.includes(t)))].filter((t) => all.some((s) => s.type === t));
  const type = types.includes(one(raw.type)) ? one(raw.type) : "";
  const srcOpts = srcChips(all.flatMap((s) => sourceRefs(s).map((r) => r.source)));
  const src = srcOpts.some((o) => o.key === one(raw.src)) ? one(raw.src) : "";
  const current = { q: one(raw.q), type, src };
  const facets = (s: PbShip) => ({ type: s.type, src: srcKeys(s) });
  const show = (s: PbShip) => facetMatch(facets(s), current) && (!q || `${s.name} ${s.text} ${s.special ?? ""}`.toLowerCase().includes(q));
  const shown = all.filter(show).length;
  const N_ = PB_NAVAL_RULES;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <PbHeader title="Naval" subtitle={`${PB_SHIPS.length} vessels${hbShips.length ? ` + ${hbShips.length} homebrew` : ""} · broadsides, boarding & sinking`} />
      <HomebrewEditor kind="pb-ship" campaigns={campaigns} initial={hbOwn} />
      <SectionNav items={[
        { id: "ships", label: "Ships" }, { id: "templates", label: "Undead & Fleet Templates" }, { id: "stats", label: "Ship Stats" }, { id: "combat", label: "Naval Combat" }, { id: "actions", label: "Crew Actions" },
        { id: "sinking", label: "Sinking" }, { id: "crew", label: "Crew & Morale" }, { id: "shanties", label: "Sea Shanties" },
        { id: "wind", label: "Wind & Weather" }, { id: "shipwright", label: "Shipwright" }, { id: "travel", label: "Travel" },
        { id: "events", label: "Travel Events" }, { id: "at-sea", label: "Ships at Sea" }, { id: "cargo", label: "Cargo & Markets" }, { id: "derelict-gen", label: "Derelict Ships" },
      ]} />

      <section id="ships" className="scroll-mt-20">
        <p className="mb-3 max-w-[72ch] text-[13px] leading-relaxed text-[var(--muted)]">Every vessel from the Core Rules, from a raft to a ship of the line and the shore fort, plus Fort Amsterdam from <em>Trapped in the Tropics</em>. Ghost ships, ships of bone and the captains&apos; fleets are <a href="#templates" className="text-[var(--sys-link)] hover:underline">templates</a> laid over one of these. Add your own vessels with Homebrew above.</p>
        <InstantFilter>
          <SearchForm base={BASE} q={one(raw.q)} placeholder="Search ships…" hidden={{ type, src }} />
          <ChipRow label="Type" base={BASE} current={current} param="type" options={types.map((t) => ({ key: t, label: shipTypeLabel(t) }))} active={type} />
          <ChipRow label="Source" base={BASE} current={current} param="src" options={srcOpts} active={src} />
          <CountLine count={shown} noun="vessel" base={BASE} filtered={!!(q || type || src)} />
          <EmptyState noun="vessel" base={BASE} hidden={shown > 0} />
          <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2 lg:grid-cols-3">
            {all.map((s, i) => (
              <li key={`${s.id}-${i}`} hidden={!show(s)} data-f={facetAttr(facets(s))}>
                <ShipBlock s={s} compact href={`${BASE}?s=${encodeURIComponent(s.id)}`} />
              </li>
            ))}
          </ul>
        </InstantFilter>
      </section>

      <section id="templates" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Undead &amp; fleet templates</h2>
        <p className="mb-3 max-w-[80ch] text-[13px] leading-relaxed text-[var(--muted)]">These are not ships of their own: take another vessel&apos;s stat block and add the template&apos;s traits. The captains&apos; fleets name the vessels they sail.</p>
        <div className="grid items-start gap-4 md:grid-cols-2 lg:grid-cols-3">{PB_SHIP_TEMPLATES.map((t) => <TemplateCard key={t.id} t={t} />)}</div>
      </section>

      <section id="stats" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Ship stats</h2>
        <dl className="grid gap-x-6 gap-y-1 text-[13px] text-[var(--muted)] md:grid-cols-2">
          {PB_SHIP_STATS.map((st) => <div key={st.id}><dt className="inline font-semibold text-[var(--text)]">{st.name}:</dt> <dd className="inline">{st.text}</dd></div>)}
        </dl>
      </section>

      <section id="combat" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Naval combat</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <RuleNote title="Range, scale & rounds" className=""><p>{N_.range.text}</p><p className="mt-1.5">{N_.scaling.text}</p><p className="mt-1.5">{N_.round.text}</p></RuleNote>
          <RuleNote title="Movement & initiative" className=""><p>{N_.movement.text}</p><p className="mt-1.5">{N_.initiative.text}</p></RuleNote>
          <div className={cardCls}>
            <p className={eyebrow}>Each ship&apos;s turn</p>
            <ol className="mt-1 flex flex-col gap-1 text-[13px] leading-relaxed text-[var(--muted)]">
              {N_.turnOrder.map((t) => <li key={t.step} className="flex gap-2"><N className="w-5 shrink-0 font-semibold text-[var(--pb-ink)]">{t.step}</N><span>{t.text}</span></li>)}
            </ol>
          </div>
          <RuleNote title="Crew" className=""><p>{N_.crew}</p></RuleNote>
          <div className={cardCls}>
            <p className={eyebrow}>Critical &amp; fumble</p>
            <Bullets className="mt-1" items={[<><b className="text-[var(--text)]">Natural <N>{N_.critical.natural}</N>:</b> {N_.critical.text}</>, <><b className="text-[var(--text)]">Natural <N>{N_.fumble.natural}</N>:</b> {N_.fumble.text}</>]} />
          </div>
        </div>
      </section>

      <section id="actions" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Crew actions</h2>
        <p className="mb-3 max-w-[80ch] text-[13px] leading-relaxed text-[var(--muted)]">{N_.crewActionRules}</p>
        <div className={tableWrap}>
          <table className="w-full min-w-[620px] border-collapse">
            <thead><tr>{["Action", "Test", "Effect"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
            <tbody>
              {PB_CREW_ACTIONS.map((a) => (
                <tr key={a.id}>
                  <td className={`${td} whitespace-nowrap font-semibold text-[var(--text)]`}>{a.name}</td>
                  <td className={`${td} whitespace-nowrap`}>{a.test ? <>{a.test.ship === "skill" ? "Crew SKILL" : "Ship AGILITY"} (+{a.test.pc}) <N className="text-[var(--text)]">DR{a.test.dr}</N></> : "—"}</td>
                  <td className={td}>{a.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="sinking" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Sinking</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <RuleNote title="Derelict ships" className=""><p>{N_.sinking.text}</p><p className="mt-1.5">{N_.repairing}</p></RuleNote>
          <div className={cardCls}><DieTable title="Derelict" die="d8" rows={PB_DERELICT} /></div>
        </div>
      </section>

      <section id="crew" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Crew, skill &amp; morale</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className={cardCls}>
            <p className={eyebrow}>Specialty crew</p>
            <dl className="mt-1 flex flex-col gap-1 text-[13px] leading-relaxed text-[var(--muted)]">
              {PB_SPECIALTY_CREW.map((s) => <div key={s.id}><dt className="inline font-semibold text-[var(--text)]">{s.name}.</dt> <dd className="inline">{s.text}</dd></div>)}
            </dl>
          </div>
          <div className={cardCls}>
            <p className={eyebrow}>Crew skill modifiers</p>
            <table className="mt-1 w-full border-collapse">
              <tbody>{PB_CREW_MODS.map((m) => <tr key={m.condition}><td className={td}>{m.condition}{m.permanent ? <span className="text-[var(--pb-ink)]"> *</span> : null}</td><td className={`${tdNum} whitespace-nowrap`}>{modText(m)}</td></tr>)}</tbody>
            </table>
            <p className="mt-1.5 text-[12px] italic text-[var(--muted)]">Suggestions for the GM. * permanent.</p>
          </div>
          <RuleNote title="Testing crew morale" className="">
            <p>{N_.morale.text}</p>
            <p className="mt-1.5">Consider a test when {N_.morale.triggers.join(", ")}.</p>
          </RuleNote>
          <RuleNote title="Cargo, careening & plunder" className=""><p>{N_.cargo}</p><p className="mt-1.5">{N_.careening.text}</p><p className="mt-1.5">{N_.payingCrew}</p></RuleNote>
        </div>
      </section>

      <section id="shanties" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Sea shanties <N className="text-[20px] text-[var(--muted)]">d12</N></h2>
        <p className="mb-3 max-w-[80ch] text-[13px] leading-relaxed text-[var(--muted)]">{PB_SHANTY_RULES.text}</p>
        <div className={cardCls}><DieTable rows={PB_SHANTIES} cols={2} /></div>
      </section>

      <section id="wind" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Wind &amp; weather</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className={cardCls}>
            <p className={eyebrow}>Wind direction <N className="ml-1 text-[var(--pb-ink)]">d6</N> <span className="font-sans text-[11px] text-[var(--muted)]">(optional)</span></p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--muted)]">{PB_WIND.text}</p>
            <table className="mt-2 w-full border-collapse">
              <thead><tr><th className={th}>d6</th><th className={th}>Flat-top hexes</th><th className={th}>Pointed-top hexes</th></tr></thead>
              <tbody>{PB_WIND.flat.map((f, i) => <tr key={f.roll}><td className={`${tdNum} text-[var(--pb-ink)]`}>{f.roll}</td><td className={td}>{f.dir}</td><td className={td}>{PB_WIND.pointed[i]?.dir}</td></tr>)}</tbody>
            </table>
          </div>
          <div className={cardCls}>
            <p className={eyebrow}>Point of sail</p>
            <dl className="mt-1 flex flex-col gap-1 text-[13px] leading-relaxed text-[var(--muted)]">
              {PB_POINT_OF_SAIL.map((p) => <div key={p.id}><dt className="inline font-semibold text-[var(--text)]">{p.name}:</dt> <dd className="inline">{p.text}</dd></div>)}
            </dl>
            <p className="mt-2 text-[12px] italic text-[var(--muted)]">Set at the start of the ship&apos;s turn from the hex edge the wind blows from relative to the bow.</p>
          </div>
          <div className={cardCls}><DieTable title="Changing winds" die="2d6" rows={PB_CHANGING_WINDS} /></div>
          <div className={cardCls}><DieTable title="Foul weather" die="2d6" rows={PB_FOUL_WEATHER} /></div>
        </div>
      </section>

      <section id="shipwright" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Shipwright</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <WrightTable title="Crew repairs" rows={PB_SHIPWRIGHT.crewRepairs} />
          <WrightTable title="Shipwright services" rows={PB_SHIPWRIGHT.shipwright} />
          <div className="md:col-span-2"><WrightTable title="Upgrades (once per ship)" rows={PB_SHIPWRIGHT.upgrades} /></div>
        </div>
        <p className="mt-2 text-[12.5px] text-[var(--muted)]">{PB_SHIPWRIGHT.note}</p>
      </section>

      <section id="travel" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Maritime travel</h2>
        <RuleNote title="Days at sea"><p>{PB_TRAVEL.text} One hex is <N>{PB_TRAVEL.hexMiles}</N> miles.</p></RuleNote>
      </section>

      <section id="events" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Maritime travel events</h2>
        <p className="mb-3 max-w-[80ch] text-[13px] leading-relaxed text-[var(--muted)]">{PB_TRAVEL_EVENTS.note}</p>
        <div className="grid items-start gap-4 lg:grid-cols-3">
          <TableCard t={PB_TRAVEL_EVENTS.flotsam} cols={1} />
          <TableCard t={PB_TRAVEL_EVENTS.encounters} cols={1}><RefChips rows={PB_TRAVEL_EVENTS.encounters.rows ?? []} /></TableCard>
          <TableCard t={PB_TRAVEL_EVENTS.events} cols={1}><RefChips rows={PB_TRAVEL_EVENTS.events.rows ?? []} /></TableCard>
        </div>
      </section>

      <section id="at-sea" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Ships at sea</h2>
        <p className="mb-3 max-w-[80ch] text-[13px] leading-relaxed text-[var(--muted)]">{PB_SHIPS_AT_SEA.note} Roll the vessel class, its armament, how many crew it carries and how good they are, then name it. <span className={dBadge}>pg. {PB_SHIPS_AT_SEA.page}</span></p>
        <div className="grid items-start gap-4 md:grid-cols-2 lg:grid-cols-4">
          <TableCard t={PB_SHIPS_AT_SEA.vesselClass} cols={1}><RefChips rows={PB_SHIPS_AT_SEA.vesselClass.rows ?? []} label="Ships" /></TableCard>
          <TableCard t={PB_SHIPS_AT_SEA.armament} cols={1} />
          <TableCard t={PB_SHIPS_AT_SEA.crewQuantity} cols={1} />
          <TableCard t={PB_SHIPS_AT_SEA.crewQuality} cols={1} />
          <TableCard t={PB_SHIPS_AT_SEA.name} className="md:col-span-2 lg:col-span-4" cols={3} />
        </div>
      </section>

      <section id="cargo" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Cargo &amp; market rates</h2>
        <p className="mb-3 max-w-[80ch] text-[13px] leading-relaxed text-[var(--muted)]">{PB_CARGO.note}</p>
        <div className="grid items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
          <TableCard t={PB_CARGO.mundane} cols={1} />
          <TableCard t={PB_CARGO.special} cols={1} />
          <div className="flex flex-col gap-4">
            <TableCard t={PB_CARGO.plotTwist} cols={1} />
            <RuleNote title="Market rates" className="">
              <p>{PB_CARGO.marketRates.text}</p>
              <p className="mt-1.5">Swing: <N className="text-[var(--text)]">±{Math.round(PB_CARGO.marketSwing * 100)}%</N> · ASH: <N className="text-[var(--text)]">{PB_CARGO.marketRates.ashStandardRate}s</N> a dose.</p>
            </RuleNote>
          </div>
        </div>
      </section>

      <section id="derelict-gen" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Derelict ship generator</h2>
        <p className="mb-3 max-w-[80ch] text-[13px] leading-relaxed text-[var(--muted)]">{PB_DERELICT_GEN.note} <span className={dBadge}>pg. {PB_DERELICT_GEN.page}–{PB_DERELICT_GEN.page + 1}</span></p>
        <div className="grid items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(PB_DERELICT_GEN.tables).map(([k, t]) => <TableCard key={k} t={t} cols={1} />)}
        </div>
      </section>
    </div>
  );
}
