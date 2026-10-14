import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ALIEN_ARMOR, ALIEN_WEAPONS, ALIEN_GEAR, ALIEN_VEHICLES, ALIEN_VEHICLE_WEAPONS } from "@/lib/data/yze-alien-data";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { YzeHeader, SectionH, cardCls, nameCls, hbBadge, type RawQuery } from "@/components/YzeRef";

export const dynamic = "force-dynamic";

type GearRow = { name: string; weight: string; desc: string };
type WpRow = { name: string; cls: string; bonus: string; damage: string; range: string; ammo: string; weight: string; cost: string; special: string };

const panelCls = "rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4";
const tableWrap = "overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--panel)]";
const thRow = "bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]";
const hbHead = "mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]";

export default async function Page({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [gVis, gOwn, wVis, wOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "yze-gear" }),
    ownHomebrew(user.id, "yze-gear"),
    visibleHomebrew(user.id, { type: "yze-weapon" }),
    ownHomebrew(user.id, "yze-weapon"),
    userCampaigns(user.id),
  ]);
  void (await searchParams);

  const gHb: GearRow[] = gVis.map((h) => {
    const d = h.data as Record<string, unknown>;
    return { name: h.name, weight: typeof d.weight === "string" ? d.weight : "1", desc: typeof d.desc === "string" ? d.desc : "" };
  });
  const wHb: WpRow[] = wVis.map((h) => {
    const d = h.data as Record<string, unknown>;
    const s = (k: string) => (typeof d[k] === "string" ? (d[k] as string) : "");
    return { name: h.name, cls: s("class") || s("skill") || "—", bonus: s("bonus") || "—", damage: d.damage != null ? String(d.damage) : "1", range: s("range") || "Adjacent", ammo: s("ammo") || "—", weight: s("weight") || "1", cost: s("cost") || "—", special: s("special") || "—" };
  });

  const book: WpRow[] = ALIEN_WEAPONS.map((w) => ({
    name: w.name, cls: w.class, bonus: w.bonus, damage: String(w.damage), range: w.range, ammo: w.ammo, weight: w.weight, cost: w.cost, special: w.special || "—",
  }));

  const gearCategories = [...new Set(ALIEN_GEAR.map((g) => g.category))];

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <YzeHeader title="Gear" subtitle="ALIEN RPG · general gear, weapons & armor" />
      <p className="mb-6 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
        You can carry items up to a carry limit equal to double your Strength. Heavier items count as
        two or more; light items count as ½ or ¼. Tiny items don&rsquo;t affect encumbrance. A backpack
        adds carry limit but gives −2 to Mobility rolls while worn.
      </p>

      {/* General gear */}
      <section className="mb-8">
        <SectionH>General Gear</SectionH>
        <p className="mb-3 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
          The Evolved Edition equipment appendix. Many items grant a skill-roll bonus (shown in Effect);
          some carry a Power supply rating. Costs are in W-Y dollars.
        </p>
        {gearCategories.map((cat) => (
          <div key={cat} className="mb-4">
            <h3 className={hbHead}>{cat}</h3>
            <div className={tableWrap}>
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr className={thRow}><th className="p-2">Item</th><th className="p-2">Wt</th><th className="p-2">Cost</th><th className="p-2">Power</th><th className="p-2">Effect</th></tr>
                </thead>
                <tbody>
                  {ALIEN_GEAR.filter((g) => g.category === cat).map((g) => (
                    <tr key={g.name} className="border-t border-[var(--border)]">
                      <td className="p-2 font-semibold text-[var(--sys-link)]">{g.name}</td>
                      <td className="p-2 font-mono text-[var(--muted)]">{g.weight}</td>
                      <td className="p-2 font-mono text-[var(--muted)]">{g.cost}</td>
                      <td className="p-2 font-mono text-[var(--muted)]">{g.supply || "—"}</td>
                      <td className="p-2 text-[var(--muted)]">{g.effect}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
        <div className={`${panelCls} mt-4`}>
          <h3 className={hbHead}>Your homebrew gear</h3>
          <p className="mb-3 text-[12px] leading-relaxed text-[var(--muted)]">
            Add your own equipment here; it shows in the character sheet&rsquo;s gear picker alongside the list above.
          </p>
          <HomebrewEditor kind="yze-gear" campaigns={campaigns} initial={gOwn} />
          {gHb.length > 0 && (
            <ul className="mt-3 grid grid-cols-1 items-start gap-3 md:grid-cols-2">
              {gHb.map((g, i) => (
                <li key={`${g.name}-${i}`} className={cardCls}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h4 className={nameCls}>{g.name}</h4>
                    <span className={hbBadge}>{g.weight} wt</span>
                  </div>
                  {g.desc ? <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{g.desc}</p> : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Weapons */}
      <section className="mb-8">
        <SectionH>Weapons</SectionH>
        <p className="mb-3 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
          DAMAGE is the base damage on a hit; each extra success adds one more. MODIFIER is the gear dice the
          weapon adds to your attack pool. RANGE is the min–max band — firing closer than the minimum takes
          −2 dice per band below it. AMMO is the weapon&rsquo;s supply rating (Power for energy weapons).
        </p>
        <div className={`${panelCls} mb-4`}>
          <h3 className={hbHead}>Your homebrew weapons</h3>
          <HomebrewEditor kind="yze-weapon" campaigns={campaigns} initial={wOwn} />
          {wHb.length > 0 && (
            <div className={`${tableWrap} mt-3`}>
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr className={thRow}><th className="p-2">Weapon</th><th className="p-2">Class</th><th className="p-2">Dmg</th><th className="p-2">Mod</th><th className="p-2">Range</th><th className="p-2">Ammo</th><th className="p-2">Wt</th><th className="p-2">Special</th></tr>
                </thead>
                <tbody>
                  {wHb.map((w, i) => (
                    <tr key={`${w.name}-${i}`} className="border-t border-[var(--border)]">
                      <td className="p-2 font-semibold text-[var(--sys-link)]">{w.name}</td>
                      <td className="p-2 text-[var(--muted)]">{w.cls}</td>
                      <td className="p-2 font-mono">{w.damage}</td>
                      <td className="p-2 font-mono">{w.bonus}</td>
                      <td className="p-2">{w.range}</td>
                      <td className="p-2 font-mono text-[var(--muted)]">{w.ammo}</td>
                      <td className="p-2 font-mono text-[var(--muted)]">{w.weight}</td>
                      <td className="p-2 text-[var(--muted)]">{w.special}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className={tableWrap}>
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className={thRow}><th className="p-2">Weapon</th><th className="p-2">Class</th><th className="p-2">Dmg</th><th className="p-2">Mod</th><th className="p-2">Range</th><th className="p-2">Ammo</th><th className="p-2">Wt</th><th className="p-2">Cost</th><th className="p-2">Special</th></tr>
            </thead>
            <tbody>
              {book.map((w) => (
                <tr key={w.name} className="border-t border-[var(--border)]">
                  <td className="p-2 font-semibold text-[var(--sys-link)]">{w.name}</td>
                  <td className="p-2 text-[var(--muted)]">{w.cls}</td>
                  <td className="p-2 font-mono">{w.damage}</td>
                  <td className="p-2 font-mono">{w.bonus}</td>
                  <td className="p-2">{w.range}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{w.ammo}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{w.weight}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{w.cost}</td>
                  <td className="p-2 text-[var(--muted)]">{w.special}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Armor */}
      <section>
        <SectionH>Suits &amp; Armor</SectionH>
        <p className="mb-3 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
          Armor has a numeric rating; when hit, roll that many D6 and each 6 stops one point of damage.
          Many suits also carry an Air Supply rating. Armor does nothing against damage from pushing a roll.
          (Homebrew armor shares the general-gear editor above.)
        </p>
        <div className={tableWrap}>
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className={thRow}><th className="p-2">Suit</th><th className="p-2">Armor</th><th className="p-2">Air</th><th className="p-2">Wt</th><th className="p-2">Cost</th><th className="p-2">Notes</th></tr>
            </thead>
            <tbody>
              {ALIEN_ARMOR.map((a) => (
                <tr key={a.name} className="border-t border-[var(--border)]">
                  <td className="p-2 font-semibold text-[var(--sys-link)]">{a.name}</td>
                  <td className="p-2 font-mono">{a.rating}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{a.air}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{a.weight}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{a.cost}</td>
                  <td className="p-2 text-[var(--muted)]">{a.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Vehicles */}
      <section className="mt-8">
        <SectionH>Vehicles</SectionH>
        <p className="mb-3 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
          Maneuverability is a modifier to Piloting rolls. Hull is the vehicle&rsquo;s damage track; Armor
          reduces incoming damage like body armor.
        </p>
        <div className={`${tableWrap} mb-6`}>
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className={thRow}><th className="p-2">Vehicle</th><th className="p-2">Pass.</th><th className="p-2">Man.</th><th className="p-2">Spd</th><th className="p-2">Hull</th><th className="p-2">Armor</th><th className="p-2">Cost</th><th className="p-2">Weapons</th></tr>
            </thead>
            <tbody>
              {ALIEN_VEHICLES.map((v) => (
                <tr key={v.name} className="border-t border-[var(--border)]">
                  <td className="p-2 font-semibold text-[var(--sys-link)]">{v.name}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{v.passengers}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{v.maneuver}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{v.speed}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{v.hull}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{v.armor}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{v.cost}</td>
                  <td className="p-2 text-[var(--muted)]">{v.weapons || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className={hbHead}>Vehicle Weapons</h3>
        <div className={tableWrap}>
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className={thRow}><th className="p-2">Weapon</th><th className="p-2">Mod</th><th className="p-2">Dmg</th><th className="p-2">Range</th><th className="p-2">Ammo</th><th className="p-2">Cost</th><th className="p-2">Special</th></tr>
            </thead>
            <tbody>
              {ALIEN_VEHICLE_WEAPONS.map((w) => (
                <tr key={w.name} className="border-t border-[var(--border)]">
                  <td className="p-2 font-semibold text-[var(--sys-link)]">{w.name}</td>
                  <td className="p-2 font-mono">{w.bonus}</td>
                  <td className="p-2 font-mono">{w.damage}</td>
                  <td className="p-2">{w.range}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{w.ammo}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{w.cost}</td>
                  <td className="p-2 text-[var(--muted)]">{w.special}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
