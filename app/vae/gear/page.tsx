import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { VAE_MELEE_WEAPONS, VAE_RANGED_WEAPONS, VAE_ARMOR, VAE_GEAR, VAE_MAGIC, VAE_RESOURCES } from "@/lib/data/vae-data";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { VaesenHeader, ModeRow, cardCls, nameCls, hbBadge, one, type RawQuery } from "@/components/VaesenRef";

export const dynamic = "force-dynamic";

type GearRow = { name: string; bonus: string; cost: string; desc: string };
type WpRow = { name: string; skill: string; bonus: string; damage: string; range: string; cost: string; desc: string };

const panelCls = "rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4";
const tableWrap = "overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--panel)]";
const thRow = "bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]";
const hbHead = "mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]";
const secH = "mb-3 text-base font-bold uppercase tracking-[0.12em] text-[var(--sys-link)]";
const BASE = "/vae/gear";

export default async function Page({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const raw = await searchParams;
  const mode = ["melee", "ranged", "armor", "power", "magic"].includes(one(raw.mode)) ? one(raw.mode) : "gear";

  const [gVis, gOwn, wVis, wOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "vae-gear" }),
    ownHomebrew(user.id, "vae-gear"),
    visibleHomebrew(user.id, { type: "vae-weapon" }),
    ownHomebrew(user.id, "vae-weapon"),
    userCampaigns(user.id),
  ]);

  const gHb: GearRow[] = gVis.map((h) => {
    const d = h.data as Record<string, unknown>;
    const s = (k: string) => (typeof d[k] === "string" ? (d[k] as string) : "");
    return { name: h.name, bonus: s("bonus"), cost: s("cost"), desc: s("desc") };
  });
  const wHb: WpRow[] = wVis.map((h) => {
    const d = h.data as Record<string, unknown>;
    const s = (k: string) => (typeof d[k] === "string" ? (d[k] as string) : "");
    return { name: h.name, skill: s("skill") || "Close Combat", bonus: s("bonus") || "0", damage: d.damage != null ? String(d.damage) : "1", range: s("range") || "0", cost: s("cost"), desc: s("desc") };
  });
  const wHbMelee = wHb.filter((w) => w.skill !== "Ranged Combat");
  const wHbRanged = wHb.filter((w) => w.skill === "Ranged Combat");

  const modeOpts = [
    { key: "gear", label: "Gear" },
    { key: "melee", label: "Melee" },
    { key: "ranged", label: "Ranged" },
    { key: "armor", label: "Armor" },
    { key: "power", label: "Items of Power" },
    { key: "magic", label: "Magic Items" },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <VaesenHeader title="Weapons & Gear" subtitle="Vaesen · arms, armor, tools and relics of the 1800s" />
      <ModeRow base={BASE} current={{}} param="mode" options={modeOpts} active={mode} />

      {/* Gear & Tools */}
      {mode === "gear" && (
        <section>
          <div className={`${panelCls} mb-4`}>
            <h3 className={hbHead}>Your homebrew gear</h3>
            <HomebrewEditor kind="vae-gear" campaigns={campaigns} initial={gOwn} />
            {gHb.length > 0 && (
              <ul className="mt-3 grid grid-cols-1 items-start gap-3 md:grid-cols-2">
                {gHb.map((g, i) => (
                  <li key={`${g.name}-${i}`} className={cardCls}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h4 className={nameCls}>{g.name}</h4>
                      {g.bonus ? <span className={hbBadge}>{g.bonus}</span> : null}
                      {g.cost ? <span className="text-[12px] text-[var(--muted)]">cost {g.cost}</span> : null}
                    </div>
                    {g.desc ? <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{g.desc}</p> : null}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={tableWrap}>
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className={thRow}><th className="p-2">Item</th><th className="p-2">Bonus</th><th className="p-2">Cost</th><th className="p-2">Use</th></tr>
              </thead>
              <tbody>
                {VAE_GEAR.map((g) => (
                  <tr key={g.name} className="border-t border-[var(--border)]">
                    <td className="p-2 font-semibold text-[var(--sys-link)]">{g.name}</td>
                    <td className="p-2 font-mono">{g.bonus}</td>
                    <td className="p-2 font-mono text-[var(--muted)]">{g.cost}</td>
                    <td className="p-2 text-[var(--muted)]">{g.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className={`${secH} mb-3 mt-8`}>Resources & Capital</h2>
          <p className="mb-3 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
            A character&rsquo;s Resources rating sets their living standard. In the preparation phase each player
            rolls dice equal to their Resources; every success pays one point of an item&rsquo;s cost (a cost-3 item
            takes three successes), and successes can be pooled. Capital is extra spending power for each mystery —
            spent instead of, or on top of, successes and used up until the next mystery. The Bonus is added to
            Manipulation when bartering for an item.
          </p>
          <div className={tableWrap}>
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className={thRow}><th className="p-2">Resources</th><th className="p-2">Living Standard</th><th className="p-2">Bonus</th><th className="p-2">Capital</th></tr>
              </thead>
              <tbody>
                {VAE_RESOURCES.map((r) => (
                  <tr key={r.level} className="border-t border-[var(--border)]">
                    <td className="p-2 font-mono font-semibold text-[var(--sys-link)]">{r.level}</td>
                    <td className="p-2">{r.name}</td>
                    <td className="p-2 font-mono text-[var(--muted)]">{r.bonus >= 0 ? `+${r.bonus}` : r.bonus}</td>
                    <td className="p-2 font-mono text-[var(--muted)]">{r.capital}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Melee weapons */}
      {mode === "melee" && (
        <section>
          <div className={`${panelCls} mb-4`}>
            <h3 className={hbHead}>Your homebrew weapons</h3>
            <HomebrewEditor kind="vae-weapon" campaigns={campaigns} initial={wOwn} />
            {wHbMelee.length > 0 && (
              <div className={`${tableWrap} mt-3`}>
                <table className="w-full border-collapse text-[13px]">
                  <thead>
                    <tr className={thRow}><th className="p-2">Weapon</th><th className="p-2">Dmg</th><th className="p-2">Bonus</th><th className="p-2">Cost</th><th className="p-2">Skill</th></tr>
                  </thead>
                  <tbody>
                    {wHbMelee.map((w, i) => (
                      <tr key={`${w.name}-${i}`} className="border-t border-[var(--border)]">
                        <td className="p-2 font-semibold text-[var(--sys-link)]">{w.name}</td>
                        <td className="p-2 font-mono">{w.damage}</td>
                        <td className="p-2 font-mono">{w.bonus}</td>
                        <td className="p-2 font-mono text-[var(--muted)]">{w.cost}</td>
                        <td className="p-2 text-[var(--muted)]">{w.skill}</td>
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
                <tr className={thRow}><th className="p-2">Weapon</th><th className="p-2">Dmg</th><th className="p-2">Bonus</th><th className="p-2">Cost</th><th className="p-2">Skill</th></tr>
              </thead>
              <tbody>
                {VAE_MELEE_WEAPONS.map((w) => (
                  <tr key={w.name} className="border-t border-[var(--border)]">
                    <td className="p-2 font-semibold text-[var(--sys-link)]">{w.name}</td>
                    <td className="p-2 font-mono">{w.damage}</td>
                    <td className="p-2 font-mono">{w.bonus}</td>
                    <td className="p-2 font-mono text-[var(--muted)]">{w.cost}</td>
                    <td className="p-2 text-[var(--muted)]">{w.skill}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Ranged weapons */}
      {mode === "ranged" && (
        <section>
          <div className={`${panelCls} mb-4`}>
            <h3 className={hbHead}>Your homebrew weapons</h3>
            <HomebrewEditor kind="vae-weapon" campaigns={campaigns} initial={wOwn} />
            {wHbRanged.length > 0 && (
              <div className={`${tableWrap} mt-3`}>
                <table className="w-full border-collapse text-[13px]">
                  <thead>
                    <tr className={thRow}><th className="p-2">Weapon</th><th className="p-2">Dmg</th><th className="p-2">Range</th><th className="p-2">Bonus</th><th className="p-2">Cost</th></tr>
                  </thead>
                  <tbody>
                    {wHbRanged.map((w, i) => (
                      <tr key={`${w.name}-${i}`} className="border-t border-[var(--border)]">
                        <td className="p-2 font-semibold text-[var(--sys-link)]">{w.name}</td>
                        <td className="p-2 font-mono">{w.damage}</td>
                        <td className="p-2">{w.range}</td>
                        <td className="p-2 font-mono">{w.bonus}</td>
                        <td className="p-2 font-mono text-[var(--muted)]">{w.cost}</td>
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
                <tr className={thRow}><th className="p-2">Weapon</th><th className="p-2">Dmg</th><th className="p-2">Range</th><th className="p-2">Bonus</th><th className="p-2">Cost</th></tr>
              </thead>
              <tbody>
                {VAE_RANGED_WEAPONS.map((w) => (
                  <tr key={w.name} className="border-t border-[var(--border)]">
                    <td className="p-2 font-semibold text-[var(--sys-link)]">{w.name}</td>
                    <td className="p-2 font-mono">{w.damage}</td>
                    <td className="p-2">{w.range}</td>
                    <td className="p-2 font-mono">{w.bonus}</td>
                    <td className="p-2 font-mono text-[var(--muted)]">{w.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Armor */}
      {mode === "armor" && (
        <section>
          <div className={tableWrap}>
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className={thRow}><th className="p-2">Armor</th><th className="p-2">Protection</th><th className="p-2">Notes</th></tr>
              </thead>
              <tbody>
                {VAE_ARMOR.map((a) => (
                  <tr key={a.name} className="border-t border-[var(--border)]">
                    <td className="p-2 font-semibold text-[var(--sys-link)]">{a.name}</td>
                    <td className="p-2 font-mono">{a.protection}</td>
                    <td className="p-2 text-[var(--muted)]">{a.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Items of Power */}
      {mode === "power" && (
        <section>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {VAE_MAGIC.itemsOfPower.map((i) => (
              <div key={i.name} className={cardCls}>
                <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-[var(--sys-link)]">{i.name}</h3>
                <p className="mt-1 text-[12px] leading-relaxed text-[var(--text)]">{i.effect}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Magic Items */}
      {mode === "magic" && (
        <section>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {VAE_MAGIC.magicItems.map((i) => (
              <div key={i.name} className={cardCls}>
                <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-[var(--sys-link)]">{i.name}</h3>
                <p className="mt-1 text-[12px] leading-relaxed text-[var(--text)]">{i.effect}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]"><b className="text-[var(--text)]">Risk:</b> {i.risk}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
