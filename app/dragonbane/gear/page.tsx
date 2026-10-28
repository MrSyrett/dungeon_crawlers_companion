import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DB_WEAPONS, DB_ARMOR, DB_HELMETS, DB_GEAR, DB_WEAPON_FEATURES, DB_MASTERCRAFTED, DB_SUPPLY, DB_TABLES } from "@/lib/data/db-data";
import type { DbWeapon, DbArmor, DbGear } from "@/lib/data/db-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { DbHeader, ModeRow, ChipRow, SearchForm, CountLine, EmptyState, RuleNote, Bullets, cardCls, nameCls, badge, hbBadge, eyebrow, sectionH, th, td, one, isHb, srcKey, srcChips, costText, type RawQuery } from "@/components/DbRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/dragonbane/gear";
const SUPPLIES = ["Common", "Uncommon", "Rare", "Unique"];
const CATS = ["Clothes", "Musical Instruments", "Trade Goods", "Studies & Magic", "Light Sources", "Tools", "Containers", "Medicine", "Services", "Hunting & Fishing", "Means of Travel", "Animals", "Alchemy Ingredients", "Alchemical Substances", "Magic Items"];

const rangeText = (r: number | string) => (typeof r === "number" ? `${r}` : r);
const weightText = (w: number | null) => (w == null ? "—" : w === 0 ? "Tiny" : w === 0.25 ? "¼" : `${w}`);

export default async function DbGearPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const view = ["armor", "gear"].includes(one(raw.view)) ? one(raw.view) : "weapons";

  const [hbW, hbWOwn, hbA, hbAOwn, hbG, hbGOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "db-weapon" }), ownHomebrew(user.id, "db-weapon"),
    visibleHomebrew(user.id, { type: "db-armor" }), ownHomebrew(user.id, "db-armor"),
    visibleHomebrew(user.id, { type: "db-gear" }), ownHomebrew(user.id, "db-gear"),
    userCampaigns(user.id),
  ]);
  const weapons = [...hbW.map((h) => h.data as unknown as DbWeapon), ...DB_WEAPONS];
  const hbArmor = hbA.map((h) => h.data as unknown as DbArmor & { slot?: string });
  const armors = [...hbArmor.filter((a) => a.slot !== "helmet"), ...DB_ARMOR];
  const helmets = [...hbArmor.filter((a) => a.slot === "helmet"), ...DB_HELMETS];
  const gear = [...hbG.map((h) => h.data as unknown as DbGear), ...DB_GEAR];
  const q = one(raw.q).trim().toLowerCase();
  const supply = SUPPLIES.includes(one(raw.supply)) ? one(raw.supply) : "";
  const modes = [{ key: "weapons", label: "Weapons" }, { key: "armor", label: "Armor & Helmets" }, { key: "gear", label: "Equipment & Services" }];

  let body: React.ReactNode;
  if (view === "weapons") {
    const skills = [...new Set(weapons.map((w) => w.skill ?? "Any STR melee"))].sort();
    const skill = skills.includes(one(raw.skill)) ? one(raw.skill) : "";
    const kinds = [{ key: "melee", label: "Melee" }, { key: "ranged", label: "Ranged" }];
    const kind = kinds.some((k) => k.key === one(raw.kind)) ? one(raw.kind) : "";
    const srcOpts = srcChips(weapons.map((w) => w.source as string | undefined));
    const src = srcOpts.some((o) => o.key === one(raw.src)) ? one(raw.src) : "";
    const current = { q: one(raw.q), skill, kind, supply, src };
    const facets = (w: DbWeapon) => ({ skill: w.skill ?? "Any STR melee", kind: w.ranged ? "ranged" : "melee", supply: w.supply ?? "", src: srcKey(w.source as string | undefined) });
    const show = (w: DbWeapon) => facetMatch(facets(w), current) && (!q || w.name.toLowerCase().includes(q) || w.features.join(" ").toLowerCase().includes(q));
    const shown = weapons.filter(show).length;
    body = (
      <>
        <HomebrewEditor kind="db-weapon" campaigns={campaigns} initial={hbWOwn} />
        <InstantFilter>
          <SearchForm base={BASE} q={one(raw.q)} placeholder="Search weapons or features…" hidden={{ skill, kind, supply, src }} />
          <ChipRow label="Kind" base={BASE} current={current} param="kind" options={kinds} active={kind} />
          <ChipRow label="Skill" base={BASE} current={current} param="skill" options={skills.map((s) => ({ key: s, label: s }))} active={skill} />
          <ChipRow label="Supply" base={BASE} current={current} param="supply" options={SUPPLIES.filter((s) => weapons.some((w) => w.supply === s)).map((s) => ({ key: s, label: s }))} active={supply} />
          <ChipRow label="Source" base={BASE} current={current} param="src" options={srcOpts} active={src} />
          <CountLine count={shown} noun="weapon" base={BASE} filtered={!!(q || skill || kind || supply || src)} />
          <EmptyState noun="weapon" base={BASE} hidden={shown > 0} />
          <div className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--panel)]">
            <table className="w-full min-w-[760px] border-collapse">
              <thead><tr>{["Weapon", "Skill", "Grip", "STR", "Range", "Damage", "Durability", "Cost", "Supply", "Features"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
              <tbody>
                {weapons.map((w, i) => (
                  <tr key={`${w.id}-${i}`} hidden={!show(w)} data-f={facetAttr(facets(w))}>
                    <td className={`${td} font-semibold text-[var(--text)]`}>{w.name} {isHb(w) ? <span className={hbBadge}>HB</span> : null}</td>
                    <td className={td}>{w.skill ?? "Any STR melee"}</td>
                    <td className={td}>{w.grip ?? "—"}</td>
                    <td className={td}>{w.str ?? "—"}</td>
                    <td className={td}>{rangeText(w.range)}</td>
                    <td className={`${td} font-mono text-[var(--text)]`}>{w.damage}</td>
                    <td className={td}>{w.durability ?? "—"}</td>
                    <td className={td}>{costText(w.cost)}</td>
                    <td className={td}>{w.supply ?? "—"}</td>
                    <td className={td}>{w.features.join(", ")}{w.skillNote ? <span className="block text-[11px] italic">{String(w.skillNote)}</span> : null}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </InstantFilter>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className={cardCls}>
            <p className={eyebrow}>Weapon features</p>
            <dl className="mt-1 flex flex-col gap-0.5 text-[12.5px] text-[var(--muted)]">{Object.entries(DB_WEAPON_FEATURES).map(([k, v]) => <div key={k}><dt className="inline font-semibold text-[var(--text)]">{k}:</dt> <dd className="inline">{v}</dd></div>)}</dl>
          </div>
          <div className={cardCls}>
            <p className={eyebrow}>Using weapons</p>
            <Bullets className="mt-1" items={[
              "Up to three weapons at hand (shields count); drawing or swapping one is a free action, picking one up costs an action.",
              "Below the STR requirement: bane on attacks and parries. Below half of it: you can't use the weapon.",
              "A one-handed weapon held in both hands has its STR requirement lowered by 3.",
              "Parrying damage above the weapon's durability damages it (repair with Crafting); piercing attacks never damage a parrying weapon.",
              "Crossbows get no damage bonus. Ranged weapons can shoot up to twice their range with a bane.",
              `Mastercrafted: ${DB_MASTERCRAFTED.text}`,
            ]} />
          </div>
        </div>
      </>
    );
  } else if (view === "armor") {
    const row = (a: DbArmor, helm: boolean, i: number) => (
      <tr key={`${a.id}-${i}`}>
        <td className={`${td} font-semibold text-[var(--text)]`}>{a.name} {isHb(a) ? <span className={hbBadge}>HB</span> : null}</td>
        <td className={`${td} font-mono text-[var(--text)]`}>{helm ? `+${a.rating}` : a.rating}</td>
        <td className={td}>{costText(a.cost)}</td>
        <td className={td}>{a.supply}</td>
        <td className={td}>{a.banes.length ? `Bane on ${a.banes.join(", ")}` : "—"}{a.bonusVs ? <span className="block text-[11px] italic">+{Object.values(a.bonusVs as Record<string, number>)[0]} vs {Object.keys(a.bonusVs as Record<string, number>).join("/")} (optional damage types)</span> : null}</td>
        <td className={td}>{a.metal ? "Yes" : "—"}</td>
      </tr>
    );
    body = (
      <>
        <HomebrewEditor kind="db-armor" campaigns={campaigns} initial={hbAOwn} />
        <h2 className={sectionH}>Armor</h2>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--panel)]">
          <table className="w-full min-w-[620px] border-collapse">
            <thead><tr>{["Armor", "Rating", "Cost", "Supply", "Effect", "Metal"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
            <tbody>{armors.map((a, i) => row(a, false, i))}</tbody>
          </table>
        </div>
        <h2 className={`${sectionH} mt-6`}>Helmets</h2>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--panel)]">
          <table className="w-full min-w-[620px] border-collapse">
            <thead><tr>{["Helmet", "Rating", "Cost", "Supply", "Effect", "Metal"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
            <tbody>{helmets.map((a, i) => row(a, true, i))}</tbody>
          </table>
        </div>
        <RuleNote title="Armor in play">
          <p>Armor subtracts its rating from physical damage; if it stops a melee attack completely, the attacking weapon takes the damage instead. You wear one suit plus one helmet, and putting either on or off is an action. Worn armor doesn&apos;t count towards encumbrance. Mages can&apos;t cast while wearing metal armor (studded leather counts). You can&apos;t sleep in armor, and chainmail or plate gives a bane on Swimming.</p>
        </RuleNote>
      </>
    );
  } else {
    const cats = CATS.filter((c) => gear.some((g) => g.category === c));
    const cat = cats.includes(one(raw.cat)) ? one(raw.cat) : "";
    const srcOpts = srcChips(gear.map((g) => g.source as string | undefined));
    const src = srcOpts.some((o) => o.key === one(raw.src)) ? one(raw.src) : "";
    const current = { view: "gear", q: one(raw.q), cat, supply, src };
    const facets = (g: DbGear) => ({ cat: g.category, supply: g.supply, src: srcKey(g.source as string | undefined) });
    const show = (g: DbGear) => facetMatch(facets(g), { ...current, view: "" }) && (!q || g.name.toLowerCase().includes(q) || g.effect.toLowerCase().includes(q));
    const shown = gear.filter(show).length;
    body = (
      <>
        <HomebrewEditor kind="db-gear" campaigns={campaigns} initial={hbGOwn} />
        <RuleNote title="Encumbrance">
          <p>You can carry half your STR (rounded up) in items in your Inventory; a backpack adds {DB_TABLES.encumbrance.backpack}. Weapons at hand (up to {DB_TABLES.encumbrance.weaponsAtHand}) and worn armor and helmet don&apos;t count. Up to {DB_TABLES.encumbrance.rationsPerItem} food rations count as one item, a quiver is one item, tiny items don&apos;t count, and every {DB_TABLES.encumbrance.coinsPerItem} coins is one item. Heavy items count as their weight. Over the limit, roll STR to move in a combat round or walk a shift. Coins: 10 copper = 1 silver, 10 silver = 1 gold.</p>
        </RuleNote>
        <InstantFilter>
          <SearchForm base={BASE} q={one(raw.q)} placeholder="Search equipment…" hidden={{ view: "gear", cat, supply, src }} />
          <ChipRow label="Category" base={BASE} current={current} param="cat" options={cats.map((c) => ({ key: c, label: c }))} active={cat} />
          <ChipRow label="Supply" base={BASE} current={current} param="supply" options={SUPPLIES.filter((s) => gear.some((g) => g.supply === s)).map((s) => ({ key: s, label: s }))} active={supply} />
          <ChipRow label="Source" base={BASE} current={current} param="src" options={srcOpts} active={src} />
          <CountLine count={shown} noun="item" base={BASE} filtered={!!(q || cat || supply || src)} />
          <EmptyState noun="item" base={BASE} hidden={shown > 0} />
          <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2 lg:grid-cols-3">
            {gear.map((g, i) => (
              <li key={`${g.id}-${i}`} className={cardCls} hidden={!show(g)} data-f={facetAttr(facets(g))}>
                <div className="flex items-start justify-between gap-2">
                  <h3 className={nameCls}>{g.name} {isHb(g) ? <span className={hbBadge}>HB</span> : null}</h3>
                  <span className={badge}>{g.category}</span>
                </div>
                <p className="mt-1 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Cost:</span> {costText(g.cost)} · <span className="font-semibold text-[var(--text)]">Weight:</span> {weightText(g.weight)} · {g.supply}</p>
                {g.effect ? <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--muted)]">{g.effect}</p> : null}
              </li>
            ))}
          </ul>
        </InstantFilter>
      </>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <DbHeader title="Gear" subtitle={`${DB_WEAPONS.length} weapons · ${DB_ARMOR.length + DB_HELMETS.length} armor & helmets · ${DB_GEAR.length} items & services`} />
      <ModeRow base={BASE} current={{}} param="view" options={modes} active={view} />
      {body}
      <section className="mt-8">
        <p className={eyebrow}>Supply</p>
        <dl className="mt-1 grid gap-x-6 gap-y-0.5 text-[12.5px] text-[var(--muted)] md:grid-cols-2">{Object.entries(DB_SUPPLY).map(([k, v]) => <div key={k}><dt className="inline font-semibold text-[var(--text)]">{k}:</dt> <dd className="inline">{v}</dd></div>)}</dl>
      </section>
    </div>
  );
}
