import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { TWD_CLOSE_WEAPONS, TWD_RANGED_WEAPONS } from "@/lib/data/twd-data";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { TwdHeader, type RawQuery } from "@/components/TwdRef";

export const dynamic = "force-dynamic";

type HbRow = { name: string; kind: string; bonus: string; damage: string; range: string; slots: string };

export default async function Page({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "twd-weapon" }),
    ownHomebrew(user.id, "twd-weapon"),
    userCampaigns(user.id),
  ]);
  void (await searchParams);

  const hbRows: HbRow[] = hbVisible.map((h) => {
    const d = h.data as Record<string, unknown>;
    const s = (k: string) => (typeof d[k] === "string" ? (d[k] as string) : "");
    return { name: h.name, kind: s("kind") || "Close", bonus: s("bonus") || "0", damage: d.damage != null ? String(d.damage) : "1", range: s("range") || "Short", slots: s("slots") || "1" };
  });

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <TwdHeader title="Weapons" subtitle="The Walking Dead · Core Rules" />
      <p className="mb-6 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
        DAMAGE is the base damage on a hit; each extra success adds one more. BONUS is the gear dice
        the weapon adds to your attack pool. SLOTS is how much of your carry limit it takes. BP is the
        Blast Power of an explosive.
      </p>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Close combat weapons</h2>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]">
                <th className="p-2">Weapon</th><th className="p-2">Damage</th><th className="p-2">Bonus</th><th className="p-2">Slots</th>
              </tr>
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
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Ranged weapons</h2>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]">
                <th className="p-2">Weapon</th><th className="p-2">Damage</th><th className="p-2">Bonus</th><th className="p-2">Range</th><th className="p-2">Slots</th>
              </tr>
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

      <section>
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Your homebrew weapons</h2>
        <div className="mb-6"><HomebrewEditor kind="twd-weapon" campaigns={campaigns} initial={hbOwn} /></div>
        {hbRows.length === 0 ? (
          <p className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6 text-sm text-[var(--muted)]">No homebrew weapons yet — add some above.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]">
                  <th className="p-2">Weapon</th><th className="p-2">Type</th><th className="p-2">Damage</th><th className="p-2">Bonus</th><th className="p-2">Range</th><th className="p-2">Slots</th>
                </tr>
              </thead>
              <tbody>
                {hbRows.map((w, i) => (
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
      </section>
    </div>
  );
}
