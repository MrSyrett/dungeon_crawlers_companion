import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DS_SHIP } from "@/lib/data/darkspace";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { DarkSpaceHeader, DataTable, cardCls, nameCls, hbBadge } from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";

const s = (v: unknown): string => (typeof v === "string" ? v : v == null ? "" : String(v));

export default async function DarkSpaceStarshipsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "ds-ship-item" }),
    ownHomebrew(user.id, "ds-ship-item"),
    userCampaigns(user.id),
  ]);
  const hb: Record<string, unknown>[] = hbVisible.map((h) => ({ name: h.name, ...(h.data as Record<string, unknown>) }));
  const hbBy = (cat: string) => hb.filter((r) => s(r.category) === cat);

  const ship = DS_SHIP;
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <DarkSpaceHeader title="Starships" subtitle="A ship is built like a Spacer" />
      <div className="mb-6"><HomebrewEditor kind="ds-ship-item" campaigns={campaigns} initial={hbOwn} /></div>

      <section className={cardCls}>
        <h2 className={`${nameCls} mb-2`}>Building a Ship</h2>
        <ol className="ml-4 list-decimal space-y-1.5 text-[13px] leading-relaxed text-[var(--text)]">
          {ship.design.map((d, i) => <li key={i}>{d}</li>)}
        </ol>
      </section>

      <section className={`${cardCls} mt-4`}>
        <h2 className={`${nameCls} mb-1`}>Classifications</h2>
        <p className="text-[13px] text-[var(--text)]">{ship.classes.join(" · ")}</p>
        <ul className="mt-3 grid gap-2 md:grid-cols-2">
          {ship.stockClasses.map((c) => (
            <li key={c.name} className="text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{c.name}.</span> {c.text}</li>
          ))}
        </ul>
      </section>

      <section className={`${cardCls} mt-4`}>
        <h2 className={`${nameCls} mb-2`}>Ship Weapons</h2>
        <DataTable head={["Weapon", "Cost", "Range", "Damage", "Properties"]} rows={ship.weapons.map((w) => [w.name, w.cost + "cr", w.range, w.dmg, w.props])} />
        {hbBy("weapon").length ? (
          <div className="mt-3">
            <h3 className="mb-1 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-[#8fd6ea]">Homebrew <span className={hbBadge}>HB</span></h3>
            <DataTable head={["Weapon", "Cost", "Range", "Damage", "Properties"]} rows={hbBy("weapon").map((w) => [s(w.name), s(w.cost) + "cr", s(w.range), s(w.dmg), s(w.props)])} />
          </div>
        ) : null}
      </section>

      <section className={`${cardCls} mt-4`}>
        <h2 className={`${nameCls} mb-2`}>Ship Armor</h2>
        <DataTable head={["Armor", "Cost", "AC", "Properties"]} rows={ship.armor.map((a) => [a.name, a.cost + "cr", a.ac, a.props])} />
        {hbBy("armor").length ? (
          <div className="mt-3">
            <h3 className="mb-1 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-[#8fd6ea]">Homebrew <span className={hbBadge}>HB</span></h3>
            <DataTable head={["Armor", "Cost", "AC", "Properties"]} rows={hbBy("armor").map((a) => [s(a.name), s(a.cost) + "cr", s(a.ac), s(a.props)])} />
          </div>
        ) : null}
      </section>

      {(hbBy("system").length || hbBy("feature").length) ? (
        <section className={`${cardCls} mt-4`}>
          <h2 className={`${nameCls} mb-2`}>Homebrew Systems & Features</h2>
          <ul className="flex flex-col gap-2">
            {[...hbBy("system"), ...hbBy("feature")].map((r, i) => (
              <li key={i} className="text-[13px] leading-relaxed text-[var(--text)]">
                <span className="font-semibold text-[#8fd6ea]">{s(r.name)}</span> <span className="text-[var(--muted)]">({s(r.category)}{s(r.cost) ? `, ${s(r.cost)}cr` : ""})</span>{s(r.desc) ? ` — ${s(r.desc)}` : ""}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
