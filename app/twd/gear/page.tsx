import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { TWD_ARMOR, TWD_GEAR, TWD_CLOSE_WEAPONS, TWD_RANGED_WEAPONS } from "@/lib/data/twd-data";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { TwdHeader, ModeRow, SectionH, cardCls, nameCls, hbBadge, one, type RawQuery } from "@/components/TwdRef";

export const dynamic = "force-dynamic";

type GearRow = { name: string; slots: string; bonus: string; desc: string };
type WpRow = { name: string; kind: string; bonus: string; damage: string; range: string; slots: string };

const panelCls = "rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4";
const tableWrap = "overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--panel)]";
const thRow = "bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]";
const hbHead = "mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]";
const BASE = "/twd/gear";

export default async function Page({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const raw = await searchParams;
  const mode = ["weapons", "armor"].includes(one(raw.mode)) ? one(raw.mode) : "general";

  const [gVis, gOwn, wVis, wOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "twd-gear" }),
    ownHomebrew(user.id, "twd-gear"),
    visibleHomebrew(user.id, { type: "twd-weapon" }),
    ownHomebrew(user.id, "twd-weapon"),
    userCampaigns(user.id),
  ]);

  const gHb: GearRow[] = gVis.map((h) => {
    const d = h.data as Record<string, unknown>;
    const s = (k: string) => (typeof d[k] === "string" ? (d[k] as string) : "");
    return { name: h.name, slots: s("slots") || "1", bonus: s("bonus"), desc: s("desc") };
  });
  const wHb: WpRow[] = wVis.map((h) => {
    const d = h.data as Record<string, unknown>;
    const s = (k: string) => (typeof d[k] === "string" ? (d[k] as string) : "");
    return { name: h.name, kind: s("kind") || "Close", bonus: s("bonus") || "0", damage: d.damage != null ? String(d.damage) : "1", range: s("range") || "Short", slots: s("slots") || "1" };
  });

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <TwdHeader title="Gear" subtitle="The Walking Dead · general gear · weapons · armor" />
      <ModeRow base={BASE} current={{}} param="mode" options={[{ key: "general", label: "General" }, { key: "weapons", label: "Weapons" }, { key: "armor", label: "Armor" }]} active={mode} />

      {/* General gear */}
      {mode === "general" && (
      <section className="mb-8">
        <p className="mb-4 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
          Your carry limit is your Strength + 2 slots (Strength 2 carries four). Most items take one slot; heavy ones take more, light ones
          (a knife, a ration) take ½, and tiny items are free. Most gear grants a bonus to one skill — you may use the bonus from
          only one item on a given roll.
        </p>
        <div className={`${panelCls} mb-4`}>
          <h3 className={hbHead}>Your homebrew gear</h3>
          <HomebrewEditor kind="twd-gear" campaigns={campaigns} initial={gOwn} />
          {gHb.length > 0 && (
            <ul className="mt-3 grid grid-cols-1 items-start gap-3 md:grid-cols-2">
              {gHb.map((g, i) => (
                <li key={`${g.name}-${i}`} className={cardCls}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h4 className={nameCls}>{g.name}</h4>
                    <span className={hbBadge}>{g.slots} slots</span>
                    {g.bonus ? <span className="text-[12px] text-[var(--muted)]">{g.bonus}</span> : null}
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
              <tr className={thRow}><th className="p-2">Item</th><th className="p-2">Slots</th><th className="p-2">Bonus</th></tr>
            </thead>
            <tbody>
              {TWD_GEAR.map((g) => (
                <tr key={g.name} className="border-t border-[var(--border)]">
                  <td className="p-2 font-semibold text-[var(--sys-link)]">{g.name}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{g.slots}</td>
                  <td className="p-2">{g.bonus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      )}

      {/* Weapons */}
      {mode === "weapons" && (
      <section className="mb-8">
        <SectionH>Weapons</SectionH>
        <p className="mb-3 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
          DAMAGE is the base damage on a hit; each extra success adds one more. BONUS is the gear dice the
          weapon adds to your attack pool. SLOTS is how much of your carry limit it takes.
        </p>
        <div className={`${panelCls} mb-4`}>
          <h3 className={hbHead}>Your homebrew weapons</h3>
          <HomebrewEditor kind="twd-weapon" campaigns={campaigns} initial={wOwn} />
          {wHb.length > 0 && (
            <div className={`${tableWrap} mt-3`}>
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr className={thRow}><th className="p-2">Weapon</th><th className="p-2">Type</th><th className="p-2">Damage</th><th className="p-2">Bonus</th><th className="p-2">Range</th><th className="p-2">Slots</th></tr>
                </thead>
                <tbody>
                  {wHb.map((w, i) => (
                    <tr key={`${w.name}-${i}`} className="border-t border-[var(--border)]">
                      <td className="p-2 font-semibold text-[var(--sys-link)]">{w.name}</td>
                      <td className="p-2 text-[var(--muted)]">{w.kind}</td>
                      <td className="p-2 font-mono">{w.damage}</td>
                      <td className="p-2 font-mono">{w.bonus}</td>
                      <td className="p-2">{w.range}</td>
                      <td className="p-2 font-mono text-[var(--muted)]">{w.slots}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <h3 className="mb-2 text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--text)]">Close combat weapons</h3>
        <div className={tableWrap}>
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className={thRow}><th className="p-2">Weapon</th><th className="p-2">Damage</th><th className="p-2">Bonus</th><th className="p-2">Slots</th></tr>
            </thead>
            <tbody>
              {TWD_CLOSE_WEAPONS.map((w) => (
                <tr key={w.name} className="border-t border-[var(--border)]">
                  <td className="p-2 font-semibold text-[var(--sys-link)]">{w.name}</td>
                  <td className="p-2 font-mono">{w.damage}</td>
                  <td className="p-2 font-mono">{w.bonus}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{w.slots}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="mb-2 mt-4 text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--text)]">Ranged weapons</h3>
        <div className={tableWrap}>
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className={thRow}><th className="p-2">Weapon</th><th className="p-2">Damage</th><th className="p-2">Bonus</th><th className="p-2">Range</th><th className="p-2">Slots</th></tr>
            </thead>
            <tbody>
              {TWD_RANGED_WEAPONS.map((w) => (
                <tr key={w.name} className="border-t border-[var(--border)]">
                  <td className="p-2 font-semibold text-[var(--sys-link)]">{w.name}</td>
                  <td className="p-2 font-mono">{w.damage}</td>
                  <td className="p-2 font-mono">{w.bonus}</td>
                  <td className="p-2">{w.range}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{w.slots}</td>
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
        <SectionH>Armor</SectionH>
        <p className="mb-3 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
          When you&rsquo;re hit, roll a number of dice equal to the Armor Level; each success stops one
          point of damage. The penalty is subtracted from Mobility rolls while you wear it. (Homebrew armor
          shares the general-gear editor above.)
        </p>
        <div className={tableWrap}>
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className={thRow}><th className="p-2">Armor</th><th className="p-2">Armor Level</th><th className="p-2">Mobility penalty</th></tr>
            </thead>
            <tbody>
              {TWD_ARMOR.map((a) => (
                <tr key={a.name} className="border-t border-[var(--border)]">
                  <td className="p-2 font-semibold text-[var(--sys-link)]">{a.name}</td>
                  <td className="p-2 font-mono">{a.level}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{a.penalty}</td>
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
