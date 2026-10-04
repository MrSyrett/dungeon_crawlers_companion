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
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/dnd/equipment";
const th = "border-b border-[var(--border)] px-2 py-1 text-left text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]";
const td = "border-b border-[var(--border)] px-2 py-1 text-[12px] text-[var(--muted)]";
const rarityColor: Record<string, string> = { Common: "#a7a7ad", Uncommon: "#5fbf72", Rare: "#5aa0e8", "Very Rare": "#b07de0", Legendary: "#e8a838", Artifact: "#e06a5a" };
const hbBadge = "rounded border border-[var(--dnd)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#f0a37f]";
const isHb = (x: { source?: string }) => x.source === "Homebrew";
// The only chip on every view is Source; each entry's facets are just that.
const facets = (x: { source?: string }) => ({ src: isHb(x) ? "hb" : "book" });

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
  // The ModeRow switches VIEWS (a server navigation); within a view, every
  // entry is rendered and the Source chip + search filter on the client
  // (InstantFilter). `cur` holds only the chip/search params the facets are
  // tested against; `show` applies them for the initial paint through the same
  // facet match the client uses.
  const cur = { q: one(raw.q), src };
  const head = () => (
    <>
      <DndHeader title="Equipment" subtitle="weapons · armor · gear · magic items" />
      <DndHomebrewEditor kind="dnd-equipment" campaigns={campaigns} initial={hbOwn} />
      <ModeRow base={BASE} current={{ q: "", src }} param="mode" options={modeOpts} active={mode} />
    </>
  );
  const wrap = (inner: React.ReactNode) => (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      {head()}
      <InstantFilter>
      <SearchForm base={BASE} q={one(raw.q)} placeholder={`Search ${mode}…`} hidden={{ mode, src }} />
      <ChipRow label="Source" base={BASE} current={current} param="src" options={[{ key: "book", label: "Official" }, { key: "hb", label: "Homebrew" }]} active={src} />
      {inner}
      </InstantFilter>
    </div>
  );
  const clearBase = `${BASE}?mode=${mode}`;

  if (mode === "weapons") {
    const list = [...hbW, ...DND_WEAPONS];
    const show = (w: DndWeapon) => facetMatch(facets(w), cur) && (!q || w.name.toLowerCase().includes(q) || w.mastery.toLowerCase().includes(q) || w.properties.some((p) => p.toLowerCase().includes(q)));
    const shown = list.filter(show).length;
    return wrap(<>
      <CountLine count={shown} noun="weapon" base={clearBase} filtered={!!q || !!src} />
      <EmptyState noun="weapon" base={clearBase} hidden={shown > 0} />
        <div className={`${cardCls} overflow-x-auto`}>
          <table className="w-full border-collapse">
            <thead><tr><th className={th}>Name</th><th className={th}>Category</th><th className={th}>Damage</th><th className={th}>Mastery</th><th className={th}>Properties</th><th className={th}>Cost</th><th className={th}>Weight</th></tr></thead>
            <tbody>{list.map((w, i) => (
              <tr key={`${w.name}-${i}`} hidden={!show(w)} data-f={facetAttr(facets(w))}>
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
    </>);
  }
  if (mode === "armor") {
    const list = [...hbA, ...DND_ARMOR];
    const show = (a: DndArmor) => facetMatch(facets(a), cur) && (!q || a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q));
    const shown = list.filter(show).length;
    return wrap(<>
      <CountLine count={shown} noun="armor type" base={clearBase} filtered={!!q || !!src} />
      <EmptyState noun="armor type" base={clearBase} hidden={shown > 0} />
        <div className={`${cardCls} overflow-x-auto`}>
          <table className="w-full border-collapse">
            <thead><tr><th className={th}>Name</th><th className={th}>Category</th><th className={th}>AC</th><th className={th}>Strength</th><th className={th}>Stealth</th><th className={th}>Cost</th><th className={th}>Weight</th></tr></thead>
            <tbody>{list.map((a, i) => (
              <tr key={`${a.name}-${i}`} hidden={!show(a)} data-f={facetAttr(facets(a))}>
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
    </>);
  }
  if (mode === "gear") {
    const list = [...hbG, ...DND_GEAR];
    const show = (g: DndGear) => facetMatch(facets(g), cur) && (!q || g.name.toLowerCase().includes(q) || (g.description ?? "").toLowerCase().includes(q));
    const shown = list.filter(show).length;
    return wrap(<>
      <CountLine count={shown} noun="item" base={clearBase} filtered={!!q || !!src} />
      <EmptyState noun="item" base={clearBase} hidden={shown > 0} />
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {list.map((g, i) => (
            <li key={`${g.name}-${i}`} className={cardCls} hidden={!show(g)} data-f={facetAttr(facets(g))}>
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#f0a37f]">{g.name} {isHb(g) ? <span className={hbBadge}>HB</span> : null}</h3>
                <span className={badge}>{g.category}</span>
              </div>
              <p className="mt-0.5 font-mono text-[11px] text-[var(--muted)]">{g.cost}{g.weight && g.weight !== "—" ? ` · ${g.weight}` : ""}</p>
              {g.description ? <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">{g.description}</p> : null}
            </li>
          ))}
        </ul>
    </>);
  }
  // magic items
  const list = [...hbM, ...DND_MAGIC_ITEMS].sort((a, b) => a.name.localeCompare(b.name));
  const show = (m: DndMagicItem) => facetMatch(facets(m), cur) && (!q || m.name.toLowerCase().includes(q) || m.type.toLowerCase().includes(q) || m.description.toLowerCase().includes(q));
  const shown = list.filter(show).length;
  return wrap(<>
    <CountLine count={shown} noun="magic item" base={clearBase} filtered={!!q || !!src} />
    <EmptyState noun="magic item" base={clearBase} hidden={shown > 0} />
      <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
        {list.map((m, i) => (
          <li key={`${m.name}-${i}`} className={cardCls} hidden={!show(m)} data-f={facetAttr(facets(m))}>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#f0a37f]">{m.name} {isHb(m) ? <span className={hbBadge}>HB</span> : null}</h3>
              <span className={badge} style={{ color: rarityColor[m.rarity] }}>{m.rarity}</span>
            </div>
            <p className="mt-0.5 text-[11px] italic text-[var(--muted)]">{m.type}{m.attunement ? ` · requires attunement${m.attunementNote ? " " + m.attunementNote : ""}` : ""}</p>
            <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">{m.description}</p>
          </li>
        ))}
      </ul>
  </>);
}
