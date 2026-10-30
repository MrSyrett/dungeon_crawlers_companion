import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { PB_WEAPONS, PB_AMMO, PB_BOMBS, PB_BOMB_RULES, PB_CLOTHING, PB_CLOTHING_RULES, PB_HATS, PB_GEAR, PB_HOSPITALITY, PB_ARMOR_REPAIR, PB_RULES } from "@/lib/data/pb-data";
import type { PbWeapon, PbClothing, PbHat, PbGear } from "@/lib/data/pb-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import CompendiumHomebrew from "@/components/hb/CompendiumHomebrew";
import { PbHeader, ModeRow, ChipRow, SearchForm, CountLine, EmptyState, RuleNote, Bullets, WeaponTable, ClothingTable, HatTable, HbBadge, N, cardCls, nameCls, badge, eyebrow, sectionH, th, td, tdNum, tableWrap, one, srcKey, srcChips, silver, armorDie, type RawQuery } from "@/components/PbRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/pirate-borg/gear";
const CAT_LABEL: Record<string, string> = { gear: "Gear", container: "Containers", vessel: "Vessels" };

export default async function PbGearPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const view = ["armor", "gear"].includes(one(raw.view)) ? one(raw.view) : "weapons";

  const [hbW, hbWOwn, hbA, hbAOwn, hbG, hbGOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "pb-weapon" }), ownHomebrew(user.id, "pb-weapon"),
    visibleHomebrew(user.id, { type: "pb-armor" }), ownHomebrew(user.id, "pb-armor"),
    visibleHomebrew(user.id, { type: "pb-gear" }), ownHomebrew(user.id, "pb-gear"),
    userCampaigns(user.id),
  ]);
  const weapons = [...hbW.map((h) => h.data as unknown as PbWeapon), ...PB_WEAPONS];
  const hbArmor = hbA.map((h) => h.data as Record<string, unknown>);
  const clothing = [...(hbArmor.filter((a) => a.slot !== "hat") as unknown as PbClothing[]), ...PB_CLOTHING];
  const hats = [...(hbArmor.filter((a) => a.slot === "hat") as unknown as PbHat[]), ...PB_HATS];
  const gear = [...hbG.map((h) => h.data as unknown as PbGear), ...PB_GEAR];
  const q = one(raw.q).trim().toLowerCase();
  const modes = [{ key: "weapons", label: "Weapons & Bombs" }, { key: "armor", label: "Clothing, Armor & Hats" }, { key: "gear", label: "Gear & Hospitality" }];

  let body: React.ReactNode;
  if (view === "weapons") {
    const kinds = [{ key: "melee", label: "Melee" }, { key: "ranged", label: "Ranged" }];
    const kind = kinds.some((k) => k.key === one(raw.kind)) ? one(raw.kind) : "";
    const powderOpts = [{ key: "yes", label: "Black powder" }, { key: "no", label: "No powder" }];
    const powder = powderOpts.some((k) => k.key === one(raw.powder)) ? one(raw.powder) : "";
    const srcOpts = srcChips(weapons.map((w) => w.source as string | undefined));
    const src = srcOpts.some((o) => o.key === one(raw.src)) ? one(raw.src) : "";
    const current = { q: one(raw.q), kind, powder, src };
    const facets = (w: PbWeapon) => ({ kind: w.type, powder: w.blackPowder ? "yes" : "no", src: srcKey(w.source as string | undefined) });
    const show = (w: PbWeapon) => facetMatch(facets(w), current) && (!q || `${w.name} ${w.special ?? ""}`.toLowerCase().includes(q));
    const shown = weapons.filter(show).length;
    body = (
      <>
        <CompendiumHomebrew>
          <HomebrewEditor kind="pb-weapon" campaigns={campaigns} initial={hbWOwn} />
        </CompendiumHomebrew>
        <InstantFilter>
          <SearchForm base={BASE} q={one(raw.q)} placeholder="Search weapons…" hidden={{ kind, powder, src }} />
          <ChipRow label="Kind" base={BASE} current={current} param="kind" options={kinds} active={kind} />
          <ChipRow label="Powder" base={BASE} current={current} param="powder" options={powderOpts} active={powder} />
          <ChipRow label="Source" base={BASE} current={current} param="src" options={srcOpts} active={src} />
          <CountLine count={shown} noun="weapon" base={BASE} filtered={!!(q || kind || powder || src)} />
          <EmptyState noun="weapon" base={BASE} hidden={shown > 0} />
          <WeaponTable rows={weapons} attrs={(i) => ({ hidden: !show(weapons[i]), "data-f": facetAttr(facets(weapons[i])) })} />
        </InstantFilter>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className={cardCls}>
            <p className={eyebrow}>Ammunition</p>
            <table className="mt-1 w-full border-collapse">
              <thead><tr>{["Ammo", "Damage", "Cost", "Effect"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
              <tbody>{PB_AMMO.map((a) => <tr key={a.id}><td className={`${td} font-semibold text-[var(--text)]`}>{a.name}</td><td className={tdNum}>{a.damage ?? "—"}</td><td className={tdNum}>{silver(a.cost)}</td><td className={td}>{a.effect ?? "For pistols, blunderbusses and muskets."}</td></tr>)}</tbody>
            </table>
          </div>
          <div className={cardCls}>
            <p className={eyebrow}>Using weapons</p>
            <Bullets className="mt-1" items={[
              <>Melee attacks test STRENGTH, ranged attacks PRESENCE — both <N>DR12</N> as standard.</>,
              <>{PB_RULES.violence.reload.text}</>,
              "Black powder weapons ignore armor. Fumbling an attack with one rolls on the Misfire table (see Rules).",
              "Guns from the starting weapon table come with 10 + PRESENCE rounds of shot.",
              "Darts are fired from a blowpipe; their damage and effect replace the blowpipe's.",
            ]} />
          </div>
        </div>
        <section className="mt-6">
          <h2 className={sectionH}>Bombs <N className="text-[20px] text-[var(--muted)]">d6</N></h2>
          <p className="mb-3 max-w-[75ch] text-[13px] leading-relaxed text-[var(--muted)]">{PB_BOMB_RULES.text}</p>
          <div className={tableWrap}>
            <table className="w-full min-w-[480px] border-collapse">
              <thead><tr>{["d6", "Bomb", "Damage", "Cost", "Effect"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
              <tbody>{PB_BOMBS.map((b) => <tr key={b.id}><td className={`${tdNum} text-[var(--pb-ink)]`}>{b.roll}</td><td className={`${td} font-semibold text-[var(--text)]`}>{b.name}</td><td className={tdNum}>{b.damage ?? "—"}</td><td className={tdNum}>{silver(b.cost)}</td><td className={td}>{b.effect ?? "—"}</td></tr>)}</tbody>
            </table>
          </div>
        </section>
      </>
    );
  } else if (view === "armor") {
    body = (
      <>
        <CompendiumHomebrew>
          <HomebrewEditor kind="pb-armor" campaigns={campaigns} initial={hbAOwn} />
        </CompendiumHomebrew>
        <RuleNote title="Pirates & armor"><p>{PB_CLOTHING_RULES.text}</p></RuleNote>
        <h2 className={sectionH}>Clothing &amp; armor <N className="text-[20px] text-[var(--muted)]">d10</N></h2>
        <ClothingTable rows={clothing} />
        <h2 className={`${sectionH} mt-8`}>Hats <N className="text-[20px] text-[var(--muted)]">d12</N></h2>
        <HatTable rows={hats} />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className={cardCls}>
            <p className={eyebrow}>Armor tiers</p>
            <table className="mt-1 w-full border-collapse">
              <thead><tr>{["Tier", "", "Damage", "AGILITY", "Defense"].map((h, i) => <th key={i} className={th}>{h}</th>)}</tr></thead>
              <tbody>{PB_RULES.armor.tiers.map((t) => <tr key={t.tier}><td className={tdNum}>{t.tier}</td><td className={td}>{t.name}</td><td className={tdNum}>{armorDie(t.die)}</td><td className={tdNum}>{t.agilityDR ? `DR +${t.agilityDR}` : "—"}</td><td className={tdNum}>{t.defenseDR ? `DR +${t.defenseDR}` : "—"}</td></tr>)}</tbody>
            </table>
          </div>
          <div className={cardCls}>
            <p className={eyebrow}>Armor repair</p>
            <table className="mt-1 w-full border-collapse">
              <tbody>{PB_ARMOR_REPAIR.rows.map((r) => <tr key={r.from}><td className={td}>{r.text}</td><td className={tdNum}>{silver(r.cost)}</td></tr>)}</tbody>
            </table>
            <p className="mt-2 text-[12.5px] text-[var(--muted)]">{PB_ARMOR_REPAIR.note}</p>
          </div>
        </div>
      </>
    );
  } else {
    const cats = ["gear", "container", "vessel"].filter((c) => gear.some((g) => g.category === c));
    const cat = cats.includes(one(raw.cat)) ? one(raw.cat) : "";
    const srcOpts = srcChips(gear.map((g) => g.source as string | undefined));
    const src = srcOpts.some((o) => o.key === one(raw.src)) ? one(raw.src) : "";
    const current = { view: "gear", q: one(raw.q), cat, src };
    const facets = (g: PbGear) => ({ cat: g.category, src: srcKey(g.source as string | undefined) });
    const show = (g: PbGear) => facetMatch(facets(g), { ...current, view: "" }) && (!q || `${g.name} ${g.effect ?? ""}`.toLowerCase().includes(q));
    const list = gear.slice().sort((a, b) => Number(isHbG(b)) - Number(isHbG(a)) || a.name.localeCompare(b.name));
    const shown = list.filter(show).length;
    body = (
      <>
        <CompendiumHomebrew>
          <HomebrewEditor kind="pb-gear" campaigns={campaigns} initial={hbGOwn} />
        </CompendiumHomebrew>
        <RuleNote title="Carrying"><p>{PB_RULES.carrying.text}</p></RuleNote>
        <InstantFilter>
          <SearchForm base={BASE} q={one(raw.q)} placeholder="Search gear…" hidden={{ view: "gear", cat, src }} />
          <ChipRow label="Category" base={BASE} current={current} param="cat" options={cats.map((c) => ({ key: c, label: CAT_LABEL[c] ?? c }))} active={cat} />
          <ChipRow label="Source" base={BASE} current={current} param="src" options={srcOpts} active={src} />
          <CountLine count={shown} noun="item" base={`${BASE}?view=gear`} filtered={!!(q || cat || src)} />
          <EmptyState noun="item" base={`${BASE}?view=gear`} hidden={shown > 0} />
          <ul className="grid grid-cols-1 items-start gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((g, i) => (
              <li key={`${g.id}-${i}`} className={`${cardCls} !p-3`} hidden={!show(g)} data-f={facetAttr(facets(g))}>
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`${nameCls} !text-[17px]`}>{g.name} <HbBadge x={g} /></h3>
                  <N className="shrink-0 text-[15px] font-semibold text-[var(--text)]">{g.costText}</N>
                </div>
                {g.category !== "gear" || g.capacity || g.uses || g.heal || g.effect ? (
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-[var(--muted)]">
                    {g.category !== "gear" ? <span className={`${badge} mr-1.5`}>{CAT_LABEL[g.category] ?? g.category}</span> : null}
                    {g.capacity ? <>Holds <N>{g.capacity}</N>{g.small ? " small" : ""} items. </> : null}
                    {g.uses ? <>Uses: <N>{g.uses}</N>. </> : null}
                    {g.heal && !g.effect ? <>Heals <N>{g.heal}</N> HP. </> : null}
                    {g.duration ? <><N>{g.duration}</N>. </> : null}
                    {g.effect}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </InstantFilter>
        <section className="mt-8">
          <h2 className={sectionH}>Hospitality</h2>
          <div className={`${tableWrap} max-w-xl`}>
            <table className="w-full border-collapse">
              <tbody>{PB_HOSPITALITY.map((h) => <tr key={h.name}><td className={td}>{h.name}</td><td className={tdNum}>{h.costText}</td></tr>)}</tbody>
            </table>
          </div>
        </section>
      </>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <PbHeader title="Gear" subtitle={`${PB_WEAPONS.length} weapons · ${PB_CLOTHING.length} clothing & armor · ${PB_HATS.length} hats · ${PB_GEAR.length} items · prices in silver`} />
      <ModeRow base={BASE} current={{}} param="view" options={modes} active={view} />
      {body}
      <p className="mt-8 text-[12px] italic text-[var(--muted)]">Starting gear tables (container, cheap and fancy gear, starting weapon <N>d10</N>) are on <a href="/pirate-borg/backgrounds#gear" className="text-[var(--sys-link)] underline">Backgrounds</a>.</p>
    </div>
  );
}

function isHbG(g: PbGear): boolean { return g.source === "Homebrew"; }
