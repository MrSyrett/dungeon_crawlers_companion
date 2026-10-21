import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import {
  PB_SHIPS, PB_SHIP_STATS, PB_NAVAL_RULES, PB_CREW_ACTIONS, PB_DERELICT, PB_SPECIALTY_CREW, PB_CREW_MODS,
  PB_SHANTY_RULES, PB_SHANTIES, PB_WIND, PB_POINT_OF_SAIL, PB_CHANGING_WINDS, PB_FOUL_WEATHER, PB_SHIPWRIGHT, PB_TRAVEL,
} from "@/lib/data/pb-data";
import type { PbShip, PbCrewMod, PbShipwrightRow } from "@/lib/data/pb-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { PbHeader, ChipRow, SearchForm, CountLine, EmptyState, BackLink, SectionNav, RuleNote, Bullets, DieTable, ShipBlock, N, cardCls, eyebrow, sectionH, th, td, tdNum, tableWrap, one, srcKey, srcChips, shipTypeLabel, signed, type RawQuery } from "@/components/PbRef";
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
  const all = [...hbShips, ...PB_SHIPS];

  const pick = one(raw.s);
  const selected = pick ? all.find((s) => s.id === pick || s.name === pick) ?? null : null;
  if (selected) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <PbHeader title="Naval" subtitle={`${shipTypeLabel(selected.type)} · ${selected.source}`} />
        <BackLink href={BASE} label="All ships" />
        <ShipBlock s={selected} />
        <dl className={`${cardCls} mt-4 flex flex-col gap-1 text-[12.5px] text-[var(--muted)]`}>
          {PB_SHIP_STATS.map((st) => <div key={st.id}><dt className="inline font-semibold text-[var(--text)]">{st.name}:</dt> <dd className="inline">{st.text}</dd></div>)}
        </dl>
      </div>
    );
  }

  const q = one(raw.q).trim().toLowerCase();
  const types = [...TYPES, ...new Set(all.map((s) => s.type).filter((t) => !TYPES.includes(t)))].filter((t) => all.some((s) => s.type === t));
  const type = types.includes(one(raw.type)) ? one(raw.type) : "";
  const srcOpts = srcChips(all.map((s) => s.source));
  const src = srcOpts.some((o) => o.key === one(raw.src)) ? one(raw.src) : "";
  const current = { q: one(raw.q), type, src };
  const facets = (s: PbShip) => ({ type: s.type, src: srcKey(s.source) });
  const show = (s: PbShip) => facetMatch(facets(s), current) && (!q || `${s.name} ${s.text} ${s.special ?? ""}`.toLowerCase().includes(q));
  const shown = all.filter(show).length;
  const N_ = PB_NAVAL_RULES;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <PbHeader title="Naval" subtitle={`${PB_SHIPS.length} vessels${hbShips.length ? ` + ${hbShips.length} homebrew` : ""} · broadsides, boarding & sinking`} />
      <HomebrewEditor kind="pb-ship" campaigns={campaigns} initial={hbOwn} />
      <SectionNav items={[
        { id: "ships", label: "Ships" }, { id: "stats", label: "Ship Stats" }, { id: "combat", label: "Naval Combat" }, { id: "actions", label: "Crew Actions" },
        { id: "sinking", label: "Sinking" }, { id: "crew", label: "Crew & Morale" }, { id: "shanties", label: "Sea Shanties" },
        { id: "wind", label: "Wind & Weather" }, { id: "shipwright", label: "Shipwright" }, { id: "travel", label: "Travel" },
      ]} />

      <section id="ships" className="scroll-mt-20">
        <p className="mb-3 max-w-[72ch] text-[13px] leading-relaxed text-[var(--muted)]">The Player&apos;s Guidebook gives the ship rules but no ship stat blocks; these come from <em>Trapped in the Tropics</em>. Add your own vessels with Homebrew above.</p>
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
    </div>
  );
}
