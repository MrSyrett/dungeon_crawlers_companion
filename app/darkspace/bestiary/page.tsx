import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DS_MONSTERS, type DsMonster } from "@/lib/data/darkspace-ref-data";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import {
  DarkSpaceHeader, SearchForm, ChipRow, CountLine, EmptyState, cardCls, nameCls, badge, hbBadge,
  one, type Query, type RawQuery,
} from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";
const BASE = "/darkspace/bestiary";

type Row = DsMonster & { homebrew?: boolean };
const AL: Record<string, string> = { L: "Lawful", N: "Neutral", C: "Chaotic" };
const ALIGN = [{ key: "L", label: "Lawful" }, { key: "N", label: "Neutral" }, { key: "C", label: "Chaotic" }];

function hbToMonster(data: Record<string, unknown>, name: string): Row {
  const s = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
  return {
    name, ac: s("ac"), hp: s("hp"), atk: s("atk"), mv: s("mv") || "near", lv: s("lv") || "1",
    al: s("al") || "N", s: s("s"), d: s("d"), c: s("c"), i: s("i"), w: s("w"), ch: s("ch"),
    notes: s("notes"), homebrew: true,
  };
}

export default async function Page({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "ds-monster" }),
    ownHomebrew(user.id, "ds-monster"),
    userCampaigns(user.id),
  ]);
  const hbRows: Row[] = hbVisible.map((h) => hbToMonster(h.data as Record<string, unknown>, h.name));
  const ALL: Row[] = [...hbRows, ...DS_MONSTERS.map((m) => ({ ...m }))];

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const al = ALIGN.some((a) => a.key === one(raw.al)) ? one(raw.al) : "";
  const current: Query = { q, al };
  const results = ALL.filter((m) =>
    (!al || m.al === al) &&
    (!needle || [m.name, m.atk, m.notes].join(" ").toLowerCase().includes(needle)),
  ).sort((a, b) => (Number(a.lv) - Number(b.lv)) || a.name.localeCompare(b.name));
  const filtered = Boolean(needle || al);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <DarkSpaceHeader title="Bestiary" subtitle={`DarkSpace · Frontier Hostiles${hbRows.length ? ` + ${hbRows.length} homebrew` : ""}`} />

      <div className="mb-6"><HomebrewEditor kind="ds-monster" campaigns={campaigns} initial={hbOwn} /></div>

      <SearchForm base={BASE} q={q} placeholder="Search hostiles…" hidden={{ al }} />
      <ChipRow label="Alignment" base={BASE} current={current} param="al" options={ALIGN} active={al} />
      <CountLine count={results.length} noun="creature" base={BASE} filtered={filtered} />

      {results.length === 0 ? (
        <EmptyState noun="creature" base={BASE} />
      ) : (
        <div className="space-y-3">
          {results.map((m) => (
            <div key={(m.homebrew ? "hb-" : "bk-") + m.name} className={cardCls}>
              <div className="flex flex-wrap items-center gap-2">
                <span className={nameCls}>{m.name}</span>
                <span className={badge}>LV {m.lv}</span>
                {m.ac ? <span className={badge}>AC {m.ac}</span> : null}
                {m.hp ? <span className={badge}>HP {m.hp}</span> : null}
                {m.homebrew ? <span className={hbBadge}>Homebrew</span> : null}
                <span className="ml-auto text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">{AL[m.al] || m.al}</span>
              </div>
              {m.atk || m.mv ? <p className="mt-2 text-[13px] text-[var(--text)]"><span className="font-semibold text-[var(--muted)]">Atk:</span> {m.atk} · <span className="font-semibold text-[var(--muted)]">Mv:</span> {m.mv}</p> : null}
              <p className="text-[12px] text-[var(--muted)]">STR {m.s} · DEX {m.d} · CON {m.c} · INT {m.i} · WIS {m.w} · CHA {m.ch}</p>
              {m.notes ? <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">{m.notes}</p> : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
