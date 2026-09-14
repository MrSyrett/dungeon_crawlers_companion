import { DS_GEAR } from "@/lib/data/darkspace-ref-data";
import { RefShell, cardCls, nameCls, badge } from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";

const CATS: { key: string; label: string }[] = [
  { key: "weapon", label: "Weapons" },
  { key: "armor", label: "Armor & Deflectors" },
  { key: "ammo", label: "Ammo" },
  { key: "basic", label: "Adventuring Gear" },
];

export default function Page() {
  return (
    <RefShell title="Gear" subtitle="DarkSpace · Equipment" active="/darkspace/gear" count={`${DS_GEAR.length} items`}>
      {CATS.map((cat) => {
        const items = DS_GEAR.filter((g) => g.category === cat.key);
        if (!items.length) return null;
        return (
          <section key={cat.key} className="mb-6">
            <h2 className="mb-3 text-[12px] font-bold uppercase tracking-[0.2em] text-[#24c3d6]">{cat.label}</h2>
            <div className="space-y-2">
              {items.map((g) => (
                <div key={g.name} className={cardCls}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={nameCls}>{g.name}</span>
                    {g.qty ? <span className={badge}>×{g.qty}</span> : null}
                    <span className="ml-auto text-[12px] font-semibold text-[var(--muted)]">{g.cost}</span>
                  </div>
                  <p className="mt-1 text-[13px] text-[var(--muted)]">{g.desc}</p>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </RefShell>
  );
}
