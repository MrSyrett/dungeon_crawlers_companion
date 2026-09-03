import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DND_WEAPONS } from "@/lib/data/dnd-weapons";
import { DND_ARMOR } from "@/lib/data/dnd-armor";
import { DND_GEAR } from "@/lib/data/dnd-gear";
import { DND_MAGIC_ITEMS } from "@/lib/data/dnd-magic-items";
import type { DndWeapon, DndArmor, DndGear, DndMagicItem } from "@/lib/data/dnd-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import DndHomebrewEditor from "@/components/DndHomebrewEditor";
import { DndHeader, ModeRow, ChipRow, SearchForm, CountLine, EmptyState, cardCls, badge, one, type RawQuery } from "@/components/DndRef";

export const dynamic = "force-dynamic";
const BASE = "/dnd/equipment";
const th = "border-b border-[var(--border)] px-2 py-1 text-left text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]";
const td = "border-b border-[var(--border)] px-2 py-1 text-[12px] text-[var(--muted)]";
const rarityColor: Record<string, string> = { Common: "#a7a7ad", Uncommon: "#5fbf72", Rare: "#5aa0e8", "Very Rare": "#b07de0", Legendary: "#e8a838", Artifact: "#e06a5a" };
const hbBadge = "rounded border border-[var(--dnd)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#f0a37f]";
const isHb = (x: { source?: string }) => x.source === "Homebrew";
const srcOk = (x: { source?: string }, src: string) => (src === "hb" ? isHb(x) : src === "book" ? !isHb(x) : true);

export default async function DndEquipmentPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const mode = ["armor", "gear", "magic"].includes(one(raw.mode)) ? one(raw.mode) : "weapons";
  const q = one(raw.q).trim().toLowerCase();
  const src = ["book", "hb"].includes(one(raw.src)) ? one(raw.src) : "";

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "dnd-equipment" }),
    ownHomebrew(user.id, "dnd-equipment"),
    userCampaigns(user.id),
  ]);
  const rows = hbVisible.map((h) => h.data as Record<string, unknown>);
  const hbW = rows.filter((r) => r.hbKind === "weapon") as unknown as DndWeapon[];
  const hbA = rows.filter((r) => r.hbKind === "armor") as unknown as DndArmor[];
  const hbG = rows.filter((r) => r.hbKind === "gear") as unknown as DndGear[];
  const hbM = rows.filter((r) => r.hbKind === "magic") as unknown as DndMagicItem[];

  const modeOpts = [
    { key: "weapons", label: `Weapons (${DND_WEAPONS.length + hbW.length})` },
    { key: "armor", label: `Armor (${DND_ARMOR.length + hbA.length})` },
    { key: "gear", label: `Gear (${DND_GEAR.length + hbG.length})` },
    { key: "magic", label: `Magic Items (${DND_MAGIC_ITEMS.length + hbM.length})` },
  ];
  const current = { mode, q: one(raw.q), src };
  const head = () => (
    <>
      <DndHeader title="Equipment" subtitle="weapons · armor · gear · magic items" />
      <DndHomebrewEditor kind="dnd-equipment" campaigns={campaigns} initial={hbOwn} />
      <ModeRow base={BASE} current={{ q: "", src }} param="mode" options={modeOpts} active={mode} />
      <SearchForm base={BASE} q={one(raw.q)} placeholder={`Search ${mode}…`} hidden={{ mode, src }} />
      <ChipRow label="Source" base={BASE} current={current} param="src" options={[{ key: "book", label: "Official" }, { key: "hb", label: "Homebrew" }]} active={src} />
    </>
  );
  const wrap = (inner: React.ReactNode) => <div className="mx-auto w-full max-w-5xl px-5 py-10">{head()}{inner}</div>;
  const clearBase = `${BASE}?mode=${mode}`;

  if (mode === "weapons") {
    const list = [...hbW, ...DND_WEAPONS].filter((w) => srcOk(w, src) && (!q || w.name.toLowerCase().includes(q) || w.mastery.toLowerCase().includes(q) || w.properties.some((p) => p.toLowerCase().includes(q))));
    return wrap(<>
      <CountLine count={list.length} noun="weapon" base={clearBase} filtered={!!q || !!src} />
      {list.length === 0 ? <EmptyState noun="weapon" base={clearBase} /> : (
        <div className={`${cardCls} overflow-x-auto`}>
          <table className="w-full border-collapse">
            <thead><tr><th className={th}>Name</th><th className={th}>Category</th><th className={th}>Damage</th><th className={th}>Mastery</th><th className={th}>Properties</th><th className={th}>Cost</th><th className={th}>Weight</th></tr></thead>
            <tbody>{list.map((w, i) => (
              <tr key={`${w.name}-${i}`}>
                <td className={`${td} font-semibold text-[var(--text)]`}>{w.name} {isHb(w) ? <span className={hbBadge}>HB</span> : null}</td>
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
    const list = [...hbA, ...DND_ARMOR].filter((a) => srcOk(a, src) && (!q || a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)));
    return wrap(<>
      <CountLine count={list.length} noun="armor type" base={clearBase} filtered={!!q || !!src} />
      {list.length === 0 ? <EmptyState noun="armor type" base={clearBase} /> : (
        <div className={`${cardCls} overflow-x-auto`}>
          <table className="w-full border-collapse">
            <thead><tr><th className={th}>Name</th><th className={th}>Category</th><th className={th}>AC</th><th className={th}>Strength</th><th className={th}>Stealth</th><th className={th}>Cost</th><th className={th}>Weight</th></tr></thead>
            <tbody>{list.map((a, i) => (
              <tr key={`${a.name}-${i}`}>
                <td className={`${td} font-semibold text-[var(--text)]`}>{a.name} {isHb(a) ? <span className={hbBadge}>HB</span> : null}</td>
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
    const list = [...hbG, ...DND_GEAR].filter((g) => srcOk(g, src) && (!q || g.name.toLowerCase().includes(q) || (g.description ?? "").toLowerCase().includes(q)));
    return wrap(<>
      <CountLine count={list.length} noun="item" base={clearBase} filtered={!!q || !!src} />
      {list.length === 0 ? <EmptyState noun="item" base={clearBase} /> : (
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {list.map((g, i) => (
            <li key={`${g.name}-${i}`} className={cardCls}>
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#f0a37f]">{g.name} {isHb(g) ? <span className={hbBadge}>HB</span> : null}</h3>
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
  const list = [...hbM, ...DND_MAGIC_ITEMS].filter((m) => srcOk(m, src) && (!q || m.name.toLowerCase().includes(q) || m.type.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)));
  list.sort((a, b) => a.name.localeCompare(b.name));
  return wrap(<>
    <CountLine count={list.length} noun="magic item" base={clearBase} filtered={!!q || !!src} />
    {list.length === 0 ? <EmptyState noun="magic item" base={clearBase} /> : (
      <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
        {list.map((m, i) => (
          <li key={`${m.name}-${i}`} className={cardCls}>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#f0a37f]">{m.name} {isHb(m) ? <span className={hbBadge}>HB</span> : null}</h3>
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
