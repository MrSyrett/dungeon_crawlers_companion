import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ALIEN_ARMOR, ALIEN_WEAPONS, ALIEN_GEAR, ALIEN_VEHICLES, ALIEN_VEHICLE_WEAPONS } from "@/lib/data/yze-alien-data";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { YzeHeader, ModeRow, cardCls, nameCls, hbBadge, one, type RawQuery } from "@/components/YzeRef";

export const dynamic = "force-dynamic";

type GearRow = { name: string; weight: string; desc: string; category: string; cost: string; supply: string };
type ArmorRow = { name: string; rating: string; air: string; weight: string; cost: string; desc: string };
type WpRow = { name: string; cls: string; bonus: string; damage: string; range: string; ammo: string; weight: string; cost: string; special: string };

const panelCls = "rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4";
const tableWrap = "overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--panel)]";
const thRow = "bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]";
const hbHead = "mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]";
const BASE = "/yze/gear";

export default async function Page({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const raw = await searchParams;
  const mode = ["weapons", "armor", "vehicles"].includes(one(raw.mode)) ? one(raw.mode) : "general";

  const [gVis, gOwn, wVis, wOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "yze-gear" }),
    ownHomebrew(user.id, "yze-gear"),
    visibleHomebrew(user.id, { type: "yze-weapon" }),
    ownHomebrew(user.id, "yze-weapon"),
    userCampaigns(user.id),
  ]);

  const gs = (d: Record<string, unknown>, k: string) => (typeof d[k] === "string" ? (d[k] as string) : "");
  // yze-gear built as armor (kind "armor") lists under Armor; the rest is general gear.
  const gHb: GearRow[] = gVis.filter((h) => (h.data as Record<string, unknown>).kind !== "armor").map((h) => {
    const d = h.data as Record<string, unknown>;
    return { name: h.name, weight: gs(d, "weight") || "1", desc: gs(d, "desc"), category: gs(d, "category"), cost: gs(d, "cost"), supply: gs(d, "supply") };
  });
  const aHb: ArmorRow[] = gVis.filter((h) => (h.data as Record<string, unknown>).kind === "armor").map((h) => {
    const d = h.data as Record<string, unknown>;
    return { name: h.name, rating: d.rating != null ? String(d.rating) : "0", air: gs(d, "air") || "—", weight: gs(d, "weight") || "1", cost: gs(d, "cost") || "—", desc: gs(d, "desc") };
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

  const modeOpts = [
    { key: "general", label: "General" },
    { key: "weapons", label: "Weapons" },
    { key: "armor", label: "Armor" },
    { key: "vehicles", label: "Vehicles" },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <YzeHeader title="Gear" subtitle="ALIEN RPG · general gear · weapons · armor · vehicles" />
      <ModeRow base={BASE} current={{}} param="mode" options={modeOpts} active={mode} />

      {mode === "general" && (
        <section>
          <div className={`${panelCls} mb-4`}>
            <h3 className={hbHead}>Your homebrew gear</h3>
            <HomebrewEditor kind="yze-gear" campaigns={campaigns} initial={gOwn} />
            {gHb.length > 0 && (
              <ul className="mt-3 grid grid-cols-1 items-start gap-3 md:grid-cols-2">
                {gHb.map((g, i) => (
                  <li key={`${g.name}-${i}`} className={cardCls}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h4 className={nameCls}>{g.name}</h4>
                      <span className={hbBadge}>{g.weight} wt</span>
                      {g.category ? <span className={hbBadge}>{g.category}</span> : null}
                      {g.cost ? <span className={hbBadge}>{g.cost}</span> : null}
                      {g.supply ? <span className={hbBadge}>{g.supply}</span> : null}
                    </div>
                    {g.desc ? <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{g.desc}</p> : null}
                  </li>
                ))}
              </ul>
            )}
          </div>
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
        </section>
      )}

      {mode === "weapons" && (
        <section>
          <div className={`${panelCls} mb-4`}>
            <h3 className={hbHead}>Your homebrew weapons</h3>
            <HomebrewEditor kind="yze-weapon" campaigns={campaigns} initial={wOwn} />
            {wHb.length > 0 && (
              <div className={`${tableWrap} mt-3`}>
                <table className="w-full border-collapse text-[13px]">
                  <thead>
                    <tr className={thRow}><th className="p-2">Weapon</th><th className="p-2">Class</th><th className="p-2">Dmg</th><th className="p-2">Mod</th><th className="p-2">Range</th><th className="p-2">Ammo</th><th className="p-2">Wt</th><th className="p-2">Cost</th><th className="p-2">Special</th></tr>
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
                        <td className="p-2 font-mono text-[var(--muted)]">{w.cost}</td>
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
      )}

      {mode === "armor" && (
        <section>
          <div className={`${panelCls} mb-4`}>
            <h3 className={hbHead}>Your homebrew armor</h3>
            <p className="mb-3 text-[12px] text-[var(--muted)]">Build a suit below: open the gear editor and pick Kind: Armor / suit.</p>
            <HomebrewEditor kind="yze-gear" campaigns={campaigns} initial={gOwn} />
            {aHb.length > 0 && (
              <div className={`${tableWrap} mt-3`}>
                <table className="w-full border-collapse text-[13px]">
                  <thead>
                    <tr className={thRow}><th className="p-2">Suit</th><th className="p-2">Armor</th><th className="p-2">Air</th><th className="p-2">Wt</th><th className="p-2">Cost</th><th className="p-2">Notes</th></tr>
                  </thead>
                  <tbody>
                    {aHb.map((a, i) => (
                      <tr key={`${a.name}-${i}`} className="border-t border-[var(--border)]">
                        <td className="p-2 font-semibold text-[var(--sys-link)]">{a.name} <span className={hbBadge}>Homebrew</span></td>
                        <td className="p-2 font-mono">{a.rating}</td>
                        <td className="p-2 font-mono text-[var(--muted)]">{a.air}</td>
                        <td className="p-2 font-mono text-[var(--muted)]">{a.weight}</td>
                        <td className="p-2 font-mono text-[var(--muted)]">{a.cost}</td>
                        <td className="p-2 text-[var(--muted)]">{a.desc}</td>
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
      )}

      {mode === "vehicles" && (
        <section>
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
      )}
    </div>
  );
}
