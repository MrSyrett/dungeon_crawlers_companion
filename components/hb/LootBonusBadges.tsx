"use client";
// ── Homebrew builder kit · LootBonusBadges ───────────────────────────────────
// BonusBadges driven by a system's LootBonus config — the exact kinds, labels
// and validation the GM Screen loot builder and the character sheets use — so a
// homebrew item's `benefits` are in LootBonus format ({kind, target?, amount?})
// and the sheet's existing equip automation (LootBonus.effective) applies.
//
//   <LootBonusBadges sys="dnd" value={benefits} onChange={setBenefits} />
//   <LootBonusBadges sys="db" value={b} onChange={set}
//        scripts={["/tools-data/db-data.js"]} />   // data a cfg's lists read, loaded first
//
//   <LootBonusBadges sys="lotr" value={b} onChange={set}
//        cfgSrc="/tools-data/dnd-loot-bonus.js" />  // a cfg registered by another file
//
// It loads /tools-data/loot-bonus.js then /tools-data/<sys>-loot-bonus.js (each
// once per page), reads window.LootBonus.cfg(sys) and maps its kinds onto
// BonusBadges. Every change is passed through LootBonus.normalize(sys, …) so what
// you store is what the sheet accepts. Until the scripts load, the stored badges
// render read-only with a generic label (never dropped).
// Props: sys, value, onChange, readOnly, empty, only (kind keys), scripts, cfgSrc
// (overrides the /tools-data/<sys>-loot-bonus.js path).
// useLootBonus(sys, scripts, cfgSrc) is exported for builders that need labels/summary
// in a preview: returns { ready, kinds, stats, label(b), normalize(list) }.
// Server-side: re-validate with your own TS normaliser in lib/homebrew.ts
// (mirror the kind keys of public/tools-data/<sys>-loot-bonus.js).
import { useEffect, useMemo, useState } from "react";
import BonusBadges, { BadgeStrip, type Badge, type BadgeKind, type BadgeColor } from "./BonusBadges";

type LbKind = {
  k: string; label: string; color?: string; amount?: boolean; optAmount?: boolean; amountPh?: string;
  target?: string; choices?: string[]; targetPh?: string; tip?: string;
};
type LbCfg = { kinds: LbKind[]; stats?: [string, string, string?][]; lists?: Record<string, () => { name: string; meta?: string }[]> };
type LbApi = {
  cfg: (sys: string) => LbCfg | null;
  normalize: (sys: string, list: unknown) => Badge[];
  label: (sys: string, b: Badge) => string;
};
const lb = (): LbApi | null => ((globalThis as { LootBonus?: LbApi }).LootBonus ?? null);

const loading: Record<string, Promise<void>> = {};
function loadScript(src: string): Promise<void> {
  if (!loading[src]) {
    loading[src] = new Promise((resolve) => {
      if (document.querySelector(`script[data-hb-src="${src}"]`)) return resolve();
      const el = document.createElement("script");
      el.src = src;
      el.async = false;
      el.dataset.hbSrc = src;
      el.onload = () => resolve();
      el.onerror = () => resolve();
      document.head.appendChild(el);
    });
  }
  return loading[src];
}

const COLORS: BadgeColor[] = ["blue", "green", "purple", "teal", "gold", "red", "grey"];

export function useLootBonus(sys: string, scripts: string[] = [], cfgSrc?: string) {
  const [cfg, setCfg] = useState<LbCfg | null>(() => (typeof window !== "undefined" ? lb()?.cfg(sys) ?? null : null));
  const key = scripts.join("|");
  useEffect(() => {
    let live = true;
    (async () => {
      for (const s of key ? key.split("|") : []) await loadScript(s);
      await loadScript("/tools-data/loot-bonus.js");
      await loadScript(cfgSrc || `/tools-data/${sys}-loot-bonus.js`);
      if (live) setCfg(lb()?.cfg(sys) ?? null);
    })();
    return () => { live = false; };
  }, [sys, key, cfgSrc]);

  return useMemo(() => {
    const api = lb();
    const kinds: BadgeKind[] = (cfg?.kinds ?? []).map((k) => {
      const t = k.target ?? "";
      const listName = t.startsWith("list:") ? t.slice(5) : "";
      let list: { name: string; meta?: string }[] = [];
      if (listName) { try { list = (cfg?.lists?.[listName]?.() ?? []).filter((x) => x && x.name); } catch { list = []; } }
      return {
        k: k.k,
        label: k.label,
        color: (COLORS as string[]).includes(k.color ?? "") ? (k.color as BadgeColor) : "grey",
        amount: !!k.amount,
        optAmount: !!k.optAmount,
        amountPh: k.amountPh,
        target: t === "stat" ? "stat" : t === "choice" ? "choice" : listName ? "list" : t === "text" ? "text" : undefined,
        choices: k.choices,
        list,
        targetPh: k.targetPh,
        tip: k.tip,
        format: (b: Badge) => (api ? api.label(sys, b) : b.kind),
      };
    });
    const stats = (cfg?.stats ?? []).map((s) => [s[0], s[1]] as [string, string]);
    return {
      ready: !!cfg && !!api,
      kinds,
      stats,
      label: (b: Badge) => (api && cfg ? api.label(sys, b) : [b.amount != null ? (b.amount >= 0 ? "+" : "") + b.amount : "", b.kind, b.target ?? ""].filter(Boolean).join(" ")),
      normalize: (list: Badge[]) => (api && cfg ? api.normalize(sys, list) : list),
    };
  }, [cfg, sys]);
}

export default function LootBonusBadges({
  sys,
  value,
  onChange,
  readOnly = false,
  empty,
  only,
  scripts,
  cfgSrc,
}: {
  sys: string;
  value: Badge[];
  onChange: (v: Badge[]) => void;
  readOnly?: boolean;
  empty?: string;
  only?: string[];
  scripts?: string[];
  cfgSrc?: string;
}) {
  const L = useLootBonus(sys, scripts, cfgSrc);
  if (!L.ready) {
    const fallback: BadgeKind[] = value.map((b) => ({ k: b.kind, label: b.kind, format: L.label }));
    return <BadgeStrip value={value} kinds={fallback} empty={empty} />;
  }
  return (
    <BonusBadges
      value={value}
      kinds={L.kinds}
      stats={L.stats}
      readOnly={readOnly}
      empty={empty}
      only={only}
      onChange={(v) => onChange(L.normalize(v))}
    />
  );
}
