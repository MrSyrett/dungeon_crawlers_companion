import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { TWD_ARMOR, TWD_GEAR } from "@/lib/data/twd-data";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { TwdHeader, cardCls, nameCls, hbBadge, type RawQuery } from "@/components/TwdRef";

export const dynamic = "force-dynamic";

type Row = { name: string; slots: string; bonus: string; desc: string };

export default async function Page({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "twd-gear" }),
    ownHomebrew(user.id, "twd-gear"),
    userCampaigns(user.id),
  ]);
  void (await searchParams);

  const hbRows: Row[] = hbVisible.map((h) => {
    const d = h.data as Record<string, unknown>;
    const s = (k: string) => (typeof d[k] === "string" ? (d[k] as string) : "");
    return { name: h.name, slots: s("slots") || "1", bonus: s("bonus"), desc: s("desc") };
  });

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <TwdHeader title="Gear & Armor" subtitle="The Walking Dead · scavenged supplies and protection" />

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Encumbrance</h2>
        <p className="max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
          You can carry items up to a carry limit equal to double your Strength. Items cost slots
          (heavy ones more, light ones ½ or ¼; tiny items are free). Most gear grants a bonus to one
          skill — you may use the bonus from only one item on a given roll.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Armor</h2>
        <p className="mb-3 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
          When you&rsquo;re hit, roll a number of dice equal to the Armor Level; each success stops
          one point of damage. The penalty is subtracted from Mobility rolls while you wear it.
        </p>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]">
                <th className="p-2">Armor</th><th className="p-2">Armor Level</th><th className="p-2">Mobility penalty</th>
              </tr>
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

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">General gear</h2>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]">
                <th className="p-2">Item</th><th className="p-2">Slots</th><th className="p-2">Bonus</th>
              </tr>
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

      <section>
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Your homebrew gear</h2>
        <div className="mb-6"><HomebrewEditor kind="twd-gear" campaigns={campaigns} initial={hbOwn} /></div>
        {hbRows.length === 0 ? (
          <p className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6 text-sm text-[var(--muted)]">No homebrew gear yet — add some above.</p>
        ) : (
          <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
            {hbRows.map((g, i) => (
              <li key={`${g.name}-${i}`} className={cardCls}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className={nameCls}>{g.name}</h3>
                  <span className={hbBadge}>{g.slots} slots</span>
                  {g.bonus ? <span className="text-[12px] text-[var(--muted)]">{g.bonus}</span> : null}
                </div>
                {g.desc ? <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{g.desc}</p> : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
