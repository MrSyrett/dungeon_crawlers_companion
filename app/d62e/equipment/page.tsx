import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { D62E_EQUIPMENT } from "@/lib/data/d62e-equipment";
import { D62E_VEHICLES } from "@/lib/data/d62e-vehicles";
import type { D62eEquipment } from "@/lib/data/d62e-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";
import {
  D62eHeader, SearchForm, ChipRow, CountLine, EmptyState, SectionH, cardCls, hbBadge,
  genreBadge, genreName, one, type Query, type RawQuery,
} from "@/components/D62eRef";

export const dynamic = "force-dynamic";
const BASE = "/d62e/equipment";

const CATS = [
  { key: "weapon", label: "Weapons" },
  { key: "armor", label: "Armor" },
  { key: "gear", label: "Gear" },
  { key: "vehicle", label: "Vehicles" },
];
// Equipment is organized by era (matching the item labels and the sheet's
// picker); a game's genre draws from the relevant eras — Fantasy from Medieval
// & Magical, Sci-Fi from Science Fiction, Modern/Superhero from Modern.
const ERAS = [
  { key: "Medieval", label: "Medieval" },
  { key: "Modern", label: "Modern" },
  { key: "Science Fiction", label: "Science Fiction" },
  { key: "Magical", label: "Magical" },
];
const CAT_HEADING: Record<string, string> = { weapon: "Weapons", armor: "Armor", gear: "Gear" };

type Row = D62eEquipment & { homebrew?: boolean };

function hbToGear(data: Record<string, unknown>, name: string): Row {
  const s = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
  return {
    name,
    category: s("category") || "gear",
    genre: (s("genre") || "core") as Row["genre"],
    era: s("era") || undefined,
    damage: s("damage") || null,
    protection: s("protection") || null,
    range: s("range") || null,
    skill: s("skill") || null,
    cost: s("cost") || null,
    description: s("description"),
    page: 0,
    homebrew: true,
  };
}

export default async function D62eEquipmentPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "d62e-gear" }),
    ownHomebrew(user.id, "d62e-gear"),
    userCampaigns(user.id),
  ]);
  const hbRows: Row[] = hbVisible.map((h) => hbToGear(h.data as Record<string, unknown>, h.name));
  const ALL: Row[] = [...hbRows, ...D62E_EQUIPMENT.map((e) => ({ ...e }))];

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const era = ERAS.some((e) => e.key === one(raw.era)) ? one(raw.era) : "";
  const cat = CATS.some((c) => c.key === one(raw.cat)) ? one(raw.cat) : "";
  const current: Query = { q, era, cat };

  // Every item is rendered; the chips filter on the client (InstantFilter).
  // `showGear` / `showVehicle` apply the URL's filters for the initial paint,
  // through the same facet match the client uses.
  const gear = ALL;
  const gearFacets = (e: Row) => ({ era: e.era, cat: e.category });
  const showGear = (e: Row) =>
    facetMatch(gearFacets(e), current) &&
    (!needle || [e.name, e.category, e.era ?? "", e.damage ?? "", e.protection ?? "", e.skill ?? "", e.description ?? ""].join(" ").toLowerCase().includes(needle));
  // Vehicles carry no era; treat starships as Science Fiction so they appear in
  // the unfiltered and Sci-Fi views. Their facets are therefore the chip values
  // they answer to, as arrays: the "vehicle" type and the Science Fiction era.
  const vehicles = D62E_VEHICLES;
  const vehicleFacets = { era: ["Science Fiction"], cat: ["vehicle"] };
  const showVehicle = (v: (typeof D62E_VEHICLES)[number]) =>
    facetMatch(vehicleFacets, current) &&
    (!needle || [v.name, v.kind, v.description ?? ""].join(" ").toLowerCase().includes(needle));
  // Gear is drawn in one section per category; an item of any other category
  // (homebrew can invent one) has no section, so it is not counted either.
  const gearCats = ["weapon", "armor", "gear"].filter((k) => gear.some((e) => e.category === k));
  const shown = gear.filter((e) => gearCats.includes(e.category) && showGear(e)).length + vehicles.filter(showVehicle).length;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <D62eHeader title="Equipment" subtitle={`${D62E_EQUIPMENT.length} items of gear · ${D62E_VEHICLES.length} starships & vehicles${hbRows.length ? ` + ${hbRows.length} homebrew` : ""}`} />

      <div className="mb-6"><HomebrewEditor kind="d62e-gear" campaigns={campaigns} initial={hbOwn} /></div>

      <InstantFilter>
      <SearchForm base={BASE} q={q} placeholder="Search gear & vehicles…" hidden={{ era, cat }} />
      <ChipRow label="Era" base={BASE} current={current} param="era" options={ERAS} active={era} />
      <ChipRow label="Type" base={BASE} current={current} param="cat" options={CATS} active={cat} />
      <CountLine count={shown} noun="item" base={BASE} filtered={Boolean(needle || era || cat)} />

      <EmptyState noun="item" base={BASE} hidden={shown > 0} />

      {gearCats.map((k) => (
        <section key={k} className={`${cardCls} mb-4`} data-section hidden={!gear.some((e) => e.category === k && showGear(e))}>
          <SectionH>{CAT_HEADING[k]}</SectionH>
          <div className="mt-2 overflow-x-auto"><table className="w-full text-[12px]">
            <thead><tr className="text-left text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]"><th className="py-1 pr-3">Item</th>{k === "weapon" ? <><th className="py-1 pr-3">Damage</th><th className="py-1 pr-3">Range</th><th className="py-1 pr-3">Skill</th></> : k === "armor" ? <th className="py-1 pr-3">Protection</th> : null}<th className="py-1 pr-3">Description</th><th className="py-1">Cost</th></tr></thead>
            <tbody>{gear.filter((e) => e.category === k).map((e) => (
              <tr key={`${e.homebrew ? "hb" : "bk"}-${e.name}`} className="border-t border-[var(--border)] align-top" hidden={!showGear(e)} data-f={facetAttr(gearFacets(e))} data-s={e.category}>
                <td className="py-1.5 pr-3 font-semibold text-[var(--text)]">{e.name}{e.homebrew ? <span className={`${hbBadge} ml-2`}>Homebrew</span> : e.genre !== "core" ? <span className={`${genreBadge} ml-2`}>{genreName(e.genre)}</span> : null}{e.era ? <span className="ml-2 text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">{e.era}</span> : null}</td>
                {k === "weapon" ? <><td className="py-1.5 pr-3 whitespace-nowrap font-mono text-[#ef9455]">{e.damage ?? "—"}</td><td className="py-1.5 pr-3 font-mono text-[var(--muted)]">{e.range ?? ""}</td><td className="py-1.5 pr-3 text-[var(--muted)]">{e.skill ?? ""}</td></> : k === "armor" ? <td className="py-1.5 pr-3 font-mono text-[#ef9455]">{e.protection ?? "—"}</td> : null}
                <td className="py-1.5 pr-3 text-[var(--muted)]">{e.description}</td>
                <td className="py-1.5 whitespace-nowrap text-[var(--muted)]">{e.cost ?? ""}</td>
              </tr>
            ))}</tbody>
          </table></div>
        </section>
      ))}

      <section className={`${cardCls} mb-4`} data-section hidden={!vehicles.some(showVehicle)}>
        <SectionH>Starships & Vehicles</SectionH>
        <ul className="mt-3 grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {vehicles.map((v) => (
            <li key={v.name} className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-3" hidden={!showVehicle(v)} data-f={facetAttr(vehicleFacets)}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#ef9455]">{v.name}</span>
                <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{v.kind}</span>
                {v.genre !== "core" ? <span className={genreBadge}>{genreName(v.genre)}</span> : null}
              </div>
              <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
                {([["Scale", v.scale], ["Crew", v.crew], ["Passengers", v.passengers], ["Cargo", v.cargo], ["Speed", v.speed], ["Maneuver", v.maneuver], ["Body", v.body], ["Shields", v.shields], ["Cost", v.cost]] as [string, string | undefined][]).filter(([, val]) => val).map(([lab, val]) => (
                  <div key={lab}><dt className="text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{lab}</dt><dd className="font-mono text-[12px] text-[var(--text)]">{val}</dd></div>
                ))}
              </dl>
              {v.weapons?.length ? (
                <p className="mt-2 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Weapons:</span> {v.weapons.map((w) => `${w.name}${w.damage ? " (" + w.damage + ")" : ""}${w.fireControl ? ", FC " + w.fireControl : ""}${w.range ? ", " + w.range : ""}`).join("; ")}</p>
              ) : null}
              {v.description ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{v.description}</p> : null}
            </li>
          ))}
        </ul>
      </section>
      </InstantFilter>
    </div>
  );
}
