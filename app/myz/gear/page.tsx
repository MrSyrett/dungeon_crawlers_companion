import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { MYZ_MELEE_WEAPONS, MYZ_RANGED_WEAPONS, MYZ_ARMOR, MYZ_GEAR, MYZ_ARTIFACTS, MYZ_VALUES } from "@/lib/data/myz-data";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { cleanSkillBonus, fmtDev, cleanDevReq, cleanDevBonus, fmtSkillBonus, suggestValue } from "@/components/hb/myz/rules";
import { MyzHeader, ModeRow, cardCls, nameCls, hbBadge, one, type RawQuery } from "@/components/MyzRef";

export const dynamic = "force-dynamic";

type GearRow = { name: string; weight: string; desc: string; armor: boolean; rating: string; bonus: string; artifact: boolean; dev: string; value: number };
type WpRow = { name: string; skill: string; bonus: string; damage: string; range: string; weight: string; desc: string; tags: string; artifact: boolean; dev: string; value: number };

const panelCls = "rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4";
const tableWrap = "overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--panel)]";
const thRow = "bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]";
const hbHead = "mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]";
const BASE = "/myz/gear";

const slot = (n: number | string) => {
  const v = typeof n === "number" ? n : parseFloat(String(n));
  if (Number.isNaN(v)) return String(n);
  return v === 0 ? "—" : v === 0.5 ? "½" : v >= 99 ? "fixed" : String(v);
};
const val = (name: string, own?: number | null): string => {
  const v = own ?? (MYZ_VALUES as Record<string, number>)[name];
  return v != null ? `${v} ⦾` : "—";
};

export default async function Page({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const raw = await searchParams;
  const mode = ["ranged", "armor", "supplies", "artifacts"].includes(one(raw.mode)) ? one(raw.mode) : "melee";

  const [gVis, gOwn, wVis, wOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "myz-gear" }),
    ownHomebrew(user.id, "myz-gear"),
    visibleHomebrew(user.id, { type: "myz-weapon" }),
    ownHomebrew(user.id, "myz-weapon"),
    userCampaigns(user.id),
  ]);

  const gHb: GearRow[] = gVis.map((h) => {
    const d = h.data as Record<string, unknown>;
    const s = (k: string) => (typeof d[k] === "string" ? (d[k] as string) : "");
    const dev = d.artifact === true ? fmtDev(cleanDevReq(d.devReq), cleanDevBonus(d.devBonus)) : "";
    return { name: h.name, weight: s("weight") || "1", desc: s("desc"), armor: d.rating != null, rating: d.rating != null ? String(d.rating) : "", bonus: fmtSkillBonus(cleanSkillBonus(d.skillBonus)), artifact: d.artifact === true, dev,
      // Same price the sheet's Item Shop charges: its own value, else the builder's suggestion.
      value: Number(d.value) > 0 ? Number(d.value) : suggestValue({ artifact: d.artifact === true, rating: Number(d.rating) || 0, skillBonus: Math.max(0, ...cleanSkillBonus(d.skillBonus).map((x) => x.amount)) }) };
  });
  const wHb: WpRow[] = wVis.map((h) => {
    const d = h.data as Record<string, unknown>;
    const s = (k: string) => (typeof d[k] === "string" ? (d[k] as string) : "");
    const tags = [d.artifact === true ? "Artifact" : "", Number(d.blast) > 0 ? `Blast Power ${d.blast}` : "", s("ammo") ? `Ammo: ${s("ammo")}` : "", ...(Array.isArray(d.features) ? d.features.map(String) : [])].filter(Boolean).join(", ");
    const dev = d.artifact === true ? fmtDev(cleanDevReq(d.devReq), cleanDevBonus(d.devBonus)) : "";
    const b = Number(d.bonus);
    return { name: h.name, skill: s("skill") || "Fight", bonus: Number.isFinite(b) && d.bonus != null ? `+${b}` : "+0", damage: d.damage != null ? String(d.damage) : "1", range: s("range") || "Arm's Length", weight: s("weight") || "1", desc: s("desc"), tags, artifact: d.artifact === true, dev,
      value: Number(d.value) > 0 ? Number(d.value) : suggestValue({ artifact: d.artifact === true, bonus: Number(d.bonus) || 0, damage: d.damage != null ? Number(d.damage) || 0 : 1 }) };
  });
  const wHbMelee = wHb.filter((w) => w.skill !== "Shoot");
  const wHbRanged = wHb.filter((w) => w.skill === "Shoot");
  const gHbArmor = gHb.filter((g) => g.armor);
  const gHbGear = gHb.filter((g) => !g.armor);
  const hbArtifacts = [...wHb.filter((w) => w.artifact).map((w) => ({ name: w.name, value: w.value, effect: [w.skill === "Shoot" ? "Ranged weapon" : "Melee weapon", `bonus ${w.bonus}`, `damage ${w.damage}`, w.range, w.desc, w.dev].filter(Boolean).join(" · ") })),
    ...gHb.filter((g) => g.artifact).map((g) => ({ name: g.name, value: g.value, effect: [g.armor ? `Armor Rating ${g.rating}` : g.bonus, g.desc, g.dev].filter(Boolean).join(" · ") }))];

  const modeOpts = [
    { key: "melee", label: "Melee" },
    { key: "ranged", label: "Ranged" },
    { key: "armor", label: "Armor" },
    { key: "supplies", label: "Supplies" },
    { key: "artifacts", label: "Artifacts" },
  ];

  const wpHead = (
    <tr className={thRow}><th className="p-2">Weapon</th><th className="p-2">Bonus</th><th className="p-2">Dmg</th><th className="p-2">Range</th><th className="p-2">Slots</th><th className="p-2">Value</th><th className="p-2">Notes</th></tr>
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <MyzHeader title="Gear" subtitle="Mutant: Year Zero · scrap weapons, armor, supplies & artifacts" />
      <ModeRow base={BASE} current={{}} param="mode" options={modeOpts} active={mode} />


      {/* Melee */}
      {mode === "melee" && (
        <section>
          <div className={`${panelCls} mb-4`}>
            <h3 className={hbHead}>Your homebrew weapons</h3>
            <HomebrewEditor kind="myz-weapon" campaigns={campaigns} initial={wOwn} />
            {wHbMelee.length > 0 && (
              <div className={`${tableWrap} mt-3`}>
                <table className="w-full border-collapse text-[12px]"><thead>{wpHead}</thead>
                  <tbody>
                    {wHbMelee.map((w, i) => (
                      <tr key={`${w.name}-${i}`} className="border-t border-[var(--border)]">
                        <td className="p-2 font-semibold text-[var(--sys-link)]">{w.name}</td>
                        <td className="p-2 font-mono">{w.bonus}</td><td className="p-2 font-mono">{w.damage}</td>
                        <td className="p-2 text-[var(--muted)]">{w.range}</td><td className="p-2 font-mono text-[var(--muted)]">{slot(w.weight)}</td>
                        <td className="p-2 font-mono text-[var(--muted)]">{val(w.name, w.value)}</td><td className="p-2 text-[var(--muted)]">{[w.tags, w.desc, w.dev].filter(Boolean).join(" · ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className={tableWrap}>
            <table className="w-full border-collapse text-[12px]"><thead>{wpHead}</thead>
              <tbody>
                {MYZ_MELEE_WEAPONS.map((w) => (
                  <tr key={w.name} className="border-t border-[var(--border)]">
                    <td className="p-2 font-semibold text-[var(--sys-link)]">{w.name}</td>
                    <td className="p-2 font-mono">{w.bonus >= 0 ? `+${w.bonus}` : w.bonus}</td><td className="p-2 font-mono">{w.damage}</td>
                    <td className="p-2 text-[var(--muted)]">{w.range}</td><td className="p-2 font-mono text-[var(--muted)]">{slot(w.slots)}</td>
                    <td className="p-2 font-mono text-[var(--muted)]">{val(w.name)}</td><td className="p-2 text-[var(--muted)]">{w.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Ranged */}
      {mode === "ranged" && (
        <section>
          <div className={`${panelCls} mb-4`}>
            <h3 className={hbHead}>Your homebrew weapons</h3>
            <HomebrewEditor kind="myz-weapon" campaigns={campaigns} initial={wOwn} />
            {wHbRanged.length > 0 && (
              <div className={`${tableWrap} mt-3`}>
                <table className="w-full border-collapse text-[12px]"><thead>{wpHead}</thead>
                  <tbody>
                    {wHbRanged.map((w, i) => (
                      <tr key={`${w.name}-${i}`} className="border-t border-[var(--border)]">
                        <td className="p-2 font-semibold text-[var(--sys-link)]">{w.name}</td>
                        <td className="p-2 font-mono">{w.bonus}</td><td className="p-2 font-mono">{w.damage}</td>
                        <td className="p-2 text-[var(--muted)]">{w.range}</td><td className="p-2 font-mono text-[var(--muted)]">{slot(w.weight)}</td>
                        <td className="p-2 font-mono text-[var(--muted)]">{val(w.name, w.value)}</td><td className="p-2 text-[var(--muted)]">{[w.tags, w.desc, w.dev].filter(Boolean).join(" · ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className={tableWrap}>
            <table className="w-full border-collapse text-[12px]"><thead>{wpHead}</thead>
              <tbody>
                {MYZ_RANGED_WEAPONS.map((w) => (
                  <tr key={w.name} className="border-t border-[var(--border)]">
                    <td className="p-2 font-semibold text-[var(--sys-link)]">{w.name}</td>
                    <td className="p-2 font-mono">{w.bonus >= 0 ? `+${w.bonus}` : w.bonus}</td><td className="p-2 font-mono">{w.damage}</td>
                    <td className="p-2 text-[var(--muted)]">{w.range}</td><td className="p-2 font-mono text-[var(--muted)]">{slot(w.slots)}</td>
                    <td className="p-2 font-mono text-[var(--muted)]">{val(w.name)}</td><td className="p-2 text-[var(--muted)]">{w.comment}</td>
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
          <p className="mb-4 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
            When you take damage, roll dice equal to the Armor Rating; each 6 stops one point. Homebrew armor is
            gear built as &ldquo;Armor&rdquo;.
          </p>
          <div className={`${panelCls} mb-4`}>
            <h3 className={hbHead}>Your homebrew armor</h3>
            <HomebrewEditor kind="myz-gear" campaigns={campaigns} initial={gOwn} />
            {gHbArmor.length > 0 && (
              <div className={`${tableWrap} mt-3`}>
                <table className="w-full border-collapse text-[13px]">
                  <thead><tr className={thRow}><th className="p-2">Armor</th><th className="p-2">Rating</th><th className="p-2">Value</th><th className="p-2">Notes</th></tr></thead>
                  <tbody>
                    {gHbArmor.map((a, i) => (
                      <tr key={`${a.name}-${i}`} className="border-t border-[var(--border)]">
                        <td className="p-2 font-semibold text-[var(--sys-link)]">{a.name}</td>
                        <td className="p-2 font-mono">{a.rating}</td>
                        <td className="p-2 font-mono text-[var(--muted)]">{val(a.name, a.value)}</td>
                        <td className="p-2 text-[var(--muted)]">{[a.artifact ? "Artifact" : "", a.desc, a.dev].filter(Boolean).join(" · ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className={tableWrap}>
            <table className="w-full border-collapse text-[13px]">
              <thead><tr className={thRow}><th className="p-2">Armor</th><th className="p-2">Rating</th><th className="p-2">Value</th><th className="p-2">Notes</th></tr></thead>
              <tbody>
                {MYZ_ARMOR.map((a) => (
                  <tr key={a.name} className="border-t border-[var(--border)]">
                    <td className="p-2 font-semibold text-[var(--sys-link)]">{a.name}</td>
                    <td className="p-2 font-mono">{a.rating}</td>
                    <td className="p-2 font-mono text-[var(--muted)]">{val(a.name)}</td>
                    <td className="p-2 text-[var(--muted)]">{a.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Supplies */}
      {mode === "supplies" && (
        <section>
          <div className={`${panelCls} mb-4`}>
            <h3 className={hbHead}>Your homebrew gear</h3>
            <HomebrewEditor kind="myz-gear" campaigns={campaigns} initial={gOwn} />
            {gHbGear.length > 0 && (
              <ul className="mt-3 grid grid-cols-1 items-start gap-3 md:grid-cols-2">
                {gHbGear.map((g, i) => (
                  <li key={`${g.name}-${i}`} className={cardCls}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h4 className={nameCls}>{g.name}</h4>
                      <span className={hbBadge}>{slot(g.weight)} slots</span>
                      {g.bonus ? <span className={hbBadge}>{g.bonus}</span> : null}
                      {g.artifact ? <span className={hbBadge}>Artifact</span> : null}
                      <span className={hbBadge}>{val(g.name, g.value)}</span>
                    </div>
                    {g.desc ? <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{g.desc}</p> : null}
                    {g.dev ? <p className="mt-1 text-[12px] text-[var(--muted)]">{g.dev}</p> : null}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={tableWrap}>
            <table className="w-full border-collapse text-[13px]">
              <thead><tr className={thRow}><th className="p-2">Item</th><th className="p-2">Slots</th><th className="p-2">Value</th><th className="p-2">Notes</th></tr></thead>
              <tbody>
                {MYZ_GEAR.map((g) => (
                  <tr key={g.name} className="border-t border-[var(--border)]">
                    <td className="p-2 font-semibold text-[var(--sys-link)]">{g.name}</td>
                    <td className="p-2 text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">{g.slots}</td>
                    <td className="p-2 font-mono text-[var(--muted)]">{val(g.name)}</td>
                    <td className="p-2 text-[var(--muted)]">{g.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Artifacts */}
      {mode === "artifacts" && (
        <section>
          <p className="mb-4 max-w-[72ch] text-[13px] leading-relaxed text-[var(--muted)]">
            Relics of the world before. Find them in the Zone, or turn one in to the <b>Dawn Vault</b> to raise
            one of the Ark&rsquo;s Development Levels. They&rsquo;re also stocked in the character sheet&rsquo;s
            Item Shop and the GM Screen&rsquo;s gear generator.
          </p>
          <div className={tableWrap}>
            <table className="w-full border-collapse text-[13px]">
              <thead><tr className={thRow}><th className="p-2">Artifact</th><th className="p-2">D666</th><th className="p-2">Value</th><th className="p-2">Effect</th></tr></thead>
              <tbody>
                {hbArtifacts.map((a, i) => (
                  <tr key={`hb-${a.name}-${i}`} className="border-t border-[var(--border)]">
                    <td className="p-2 font-semibold text-[var(--sys-link)]">{a.name} <span className={hbBadge}>Homebrew</span></td>
                    <td className="p-2 font-mono text-[var(--muted)]">—</td>
                    <td className="p-2 font-mono text-[var(--muted)]">{val(a.name, a.value)}</td>
                    <td className="p-2 text-[var(--text)]">{a.effect}</td>
                  </tr>
                ))}
                {MYZ_ARTIFACTS.map((a) => (
                  <tr key={a.name} className="border-t border-[var(--border)]">
                    <td className="p-2 font-semibold text-[var(--sys-link)]">{a.name}</td>
                    <td className="p-2 font-mono text-[var(--muted)]">{a.roll}</td>
                    <td className="p-2 font-mono text-[var(--muted)]">{val(a.name)}</td>
                    <td className="p-2 text-[var(--text)]">{a.desc}</td>
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
