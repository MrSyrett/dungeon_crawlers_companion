import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DS_SHIP } from "@/lib/data/darkspace";
import { DarkSpaceHeader, DarkSpaceNav, DataTable, cardCls, nameCls } from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";

export default async function DarkSpaceStarshipsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const s = DS_SHIP;
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <DarkSpaceHeader title="Starships" subtitle="A ship is built like a Spacer" />
      <DarkSpaceNav active="Starships" />

      <section className={cardCls}>
        <h2 className={`${nameCls} mb-2`}>Building a Ship</h2>
        <ol className="ml-4 list-decimal space-y-1.5 text-[13px] leading-relaxed text-[var(--text)]">
          {s.design.map((d, i) => <li key={i}>{d}</li>)}
        </ol>
      </section>

      <section className={`${cardCls} mt-4`}>
        <h2 className={`${nameCls} mb-1`}>Classifications</h2>
        <p className="text-[13px] text-[var(--text)]">{s.classes.join(" · ")}</p>
        <ul className="mt-3 grid gap-2 md:grid-cols-2">
          {s.stockClasses.map((c) => (
            <li key={c.name} className="text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{c.name}.</span> {c.text}</li>
          ))}
        </ul>
      </section>

      <section className={`${cardCls} mt-4`}>
        <h2 className={`${nameCls} mb-2`}>Ship Weapons</h2>
        <DataTable head={["Weapon", "Cost", "Range", "Damage", "Properties"]} rows={s.weapons.map((w) => [w.name, w.cost + "cr", w.range, w.dmg, w.props])} />
      </section>

      <section className={`${cardCls} mt-4`}>
        <h2 className={`${nameCls} mb-2`}>Ship Armor</h2>
        <DataTable head={["Armor", "Cost", "AC", "Properties"]} rows={s.armor.map((a) => [a.name, a.cost + "cr", a.ac, a.props])} />
      </section>
    </div>
  );
}
