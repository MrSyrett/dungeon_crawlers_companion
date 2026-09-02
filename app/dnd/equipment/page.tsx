import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DND_WEAPONS } from "@/lib/data/dnd-weapons";
import { DND_ARMOR } from "@/lib/data/dnd-armor";
import { DND_GEAR } from "@/lib/data/dnd-gear";
import { DND_MAGIC_ITEMS } from "@/lib/data/dnd-magic-items";
import { DndHeader, ModeRow, SearchForm, CountLine, EmptyState, cardCls, badge, one, type RawQuery } from "@/components/DndRef";

export const dynamic = "force-dynamic";
const BASE = "/dnd/equipment";
const th = "border-b border-[var(--border)] px-2 py-1 text-left text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]";
const td = "border-b border-[var(--border)] px-2 py-1 text-[12px] text-[var(--muted)]";
const rarityColor: Record<string, string> = { Common: "#a7a7ad", Uncommon: "#5fbf72", Rare: "#5aa0e8", "Very Rare": "#b07de0", Legendary: "#e8a838", Artifact: "#e06a5a" };

export default async function DndEquipmentPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const mode = ["armor", "gear", "magic"].includes(one(raw.mode)) ? one(raw.mode) : "weapons";
  const q = one(raw.q).trim().toLowerCase();
  const modeOpts = [
    { key: "weapons", label: `Weapons (${DND_WEAPONS.length})` },
    { key: "armor", label: `Armor (${DND_ARMOR.length})` },
    { key: "gear", label: `Gear (${DND_GEAR.length})` },
    { key: "magic", label: `Magic Items (${DND_MAGIC_ITEMS.length})` },
  ];
  const head = () => (
    <>
      <DndHeader title="Equipment" subtitle="weapons · armor · gear · magic items" />
      <ModeRow base={BASE} current={{ q: "" }} param="mode" options={modeOpts} active={mode} />
      <SearchForm base={BASE} q={one(raw.q)} placeholder={`Search ${mode}…`} hidden={{ mode }} />
    </>
  );
  const wrap = (inner: React.ReactNode) => <div className="mx-auto w-full max-w-5xl px-5 py-10">{head()}{inner}</div>;
  const clearBase = `${BASE}?mode=${mode}`;

  if (mode === "weapons") {
    const list = DND_WEAPONS.slice().filter((w) => !q || w.name.toLowerCase().includes(q) || w.mastery.toLowerCase().includes(q) || w.properties.some((p) => p.toLowerCase().includes(q)));
    return wrap(<>
      <CountLine count={list.length} noun="weapon" base={clearBase} filtered={!!q} />
      {list.length === 0 ? <EmptyState noun="weapon" base={clearBase} /> : (
        <div className={`${cardCls} overflow-x-auto`}>
          <table className="w-full border-collapse">
            <thead><tr><th className={th}>Name</th><th className={th}>Category</th><th className={th}>Damage</th><th className={th}>Mastery</th><th className={th}>Properties</th><th className={th}>Cost</th><th className={th}>Weight</th></tr></thead>
            <tbody>{list.map((w) => (
              <tr key={w.name}>
                <td className={`${td} font-semibold text-[var(--text)]`}>{w.name}</td>
                <td className={td}>{w.category} {w.kind}</td>
                <td className={`${td} font-mono`}>{w.damage} {w.damageType}</td>
                <td className={td}><span className="text-[#f0a37f]">{w.mastery}</span></td>
                <td className={td}>{w.properties.join(", ") || "—"}</td>
                <td className={`${td} font-mono`}>{w.cost}</td>
                <td className={`${td} font-mono`}>{w.weight}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </>);
  }
  if (mode === "armor") {
    const list = DND_ARMOR.slice().filter((a) => !q || a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q));
    return wrap(<>
      <CountLine count={list.length} noun="armor type" base={clearBase} filtered={!!q} />
      {list.length === 0 ? <EmptyState noun="armor type" base={clearBase} /> : (
        <div className={`${cardCls} overflow-x-auto`}>
          <table className="w-full border-collapse">
            <thead><tr><th className={th}>Name</th><th className={th}>Category</th><th className={th}>AC</th><th className={th}>Strength</th><th className={th}>Stealth</th><th className={th}>Cost</th><th className={th}>Weight</th></tr></thead>
            <tbody>{list.map((a) => (
              <tr key={a.name}>
                <td className={`${td} font-semibold text-[var(--text)]`}>{a.name}</td>
                <td className={td}>{a.category}</td>
                <td className={`${td} font-mono`}>{a.baseAC}</td>
                <td className={td}>{a.strength || "—"}</td>
                <td className={td}>{a.stealthDisadvantage ? <span className="text-[#e06a5a]">Disadvantage</span> : "—"}</td>
                <td className={`${td} font-mono`}>{a.cost}</td>
                <td className={`${td} font-mono`}>{a.weight}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </>);
  }
  if (mode === "gear") {
    const list = DND_GEAR.slice().filter((g) => !q || g.name.toLowerCase().includes(q) || (g.description ?? "").toLowerCase().includes(q));
    return wrap(<>
      <CountLine count={list.length} noun="item" base={clearBase} filtered={!!q} />
      {list.length === 0 ? <EmptyState noun="item" base={clearBase} /> : (
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {list.map((g) => (
            <li key={g.name} className={cardCls}>
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#f0a37f]">{g.name}</h3>
                <span className={badge}>{g.category}</span>
              </div>
              <p className="mt-0.5 font-mono text-[11px] text-[var(--muted)]">{g.cost}{g.weight && g.weight !== "—" ? ` · ${g.weight}` : ""}</p>
              {g.description ? <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">{g.description}</p> : null}
            </li>
          ))}
        </ul>
      )}
    </>);
  }
  // magic items
  const list = DND_MAGIC_ITEMS.slice().filter((m) => !q || m.name.toLowerCase().includes(q) || m.type.toLowerCase().includes(q) || m.description.toLowerCase().includes(q));
  list.sort((a, b) => a.name.localeCompare(b.name));
  return wrap(<>
    <CountLine count={list.length} noun="magic item" base={clearBase} filtered={!!q} />
    {list.length === 0 ? <EmptyState noun="magic item" base={clearBase} /> : (
      <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
        {list.map((m) => (
          <li key={m.name} className={cardCls}>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#f0a37f]">{m.name}</h3>
              <span className={badge} style={{ color: rarityColor[m.rarity] }}>{m.rarity}</span>
            </div>
            <p className="mt-0.5 text-[11px] italic text-[var(--muted)]">{m.type}{m.attunement ? ` · requires attunement${m.attunementNote ? " " + m.attunementNote : ""}` : ""}</p>
            <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">{m.description}</p>
          </li>
        ))}
      </ul>
    )}
  </>);
}
