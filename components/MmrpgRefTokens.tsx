"use client";

// Renders reference names (tags, traits, powers, origins, occupations) as inline
// text where each recognised NAME is a button that opens a popup with its details —
// so a reader never has to flip to another page to see what something does. Accepts
// either a messy comma-separated `text` string (e.g. an origin's tag list) or a
// clean `items` array. Tag/trait/origin/occupation data is small and imported
// directly; power details are larger, so they're dynamic-imported on first click.

import { useState } from "react";
import { MMRPG_TAGS } from "@/lib/data/mmrpg-tags";
import { MMRPG_TRAITS } from "@/lib/data/mmrpg-traits";
import { MMRPG_ORIGINS } from "@/lib/data/mmrpg-origins";
import { MMRPG_OCCUPATIONS } from "@/lib/data/mmrpg-occupations";
import { MMRPG_POWER_NAMES } from "@/lib/data/mmrpg-power-names";
import type { MmrpgPowerDetail } from "@/lib/data/mmrpg-power-details";

type Kind = "tag" | "trait" | "power" | "origin" | "occupation";
type OccLike = { name: string; description?: string; tags?: string; traits?: string; powers?: string; occupation?: string; limitation?: string; examples?: string };

const tagMap = new Map(MMRPG_TAGS.map((t) => [t.name.toLowerCase(), t] as const));
const traitMap = new Map(MMRPG_TRAITS.map((t) => [t.name.toLowerCase(), t] as const));
const originMap = new Map((MMRPG_ORIGINS as OccLike[]).map((o) => [o.name.toLowerCase(), o] as const));
const occMap = new Map((MMRPG_OCCUPATIONS as OccLike[]).map((o) => [o.name.toLowerCase(), o] as const));
const powerNameSet = new Set(MMRPG_POWER_NAMES.map((n) => n.toLowerCase()));
let powerDetailMap: Map<string, MmrpgPowerDetail> | null = null;

function isKnown(name: string, kind: Kind): boolean {
  const k = name.toLowerCase();
  return kind === "tag" ? tagMap.has(k)
    : kind === "trait" ? traitMap.has(k)
    : kind === "origin" ? originMap.has(k)
    : kind === "occupation" ? occMap.has(k)
    : powerNameSet.has(k);
}

// From one comma-separated chunk, find the recognised name (if any) at its start
// and the leftover text (parentheticals, "Minimum Rank: 3", trailing prose, …).
function analyze(raw: string, kind: Kind): { name: string | null; rest: string } {
  const trimmed = raw.trim().replace(/\.+$/, "").trim();
  if (!trimmed) return { name: null, rest: "" };
  const candidates = [
    trimmed,
    trimmed.replace(/\s*\(.*$/, "").trim(),
    trimmed.split(".")[0].trim(),
    trimmed.split(":")[0].trim(),
  ];
  for (const c of candidates) {
    if (c && isKnown(c, kind)) return { name: c, rest: trimmed.slice(c.length) };
  }
  return { name: null, rest: trimmed };
}

type Detail = { title: string; body: string; meta?: string } | null;
function originDetail(o: OccLike, meta: string): Detail {
  const grants = [
    o.tags ? `Tags: ${o.tags}` : "",
    o.traits ? `Traits: ${o.traits}` : "",
    o.powers ? `Powers: ${o.powers}` : "",
    o.occupation ? `Suggested occupation: ${o.occupation}` : "",
    o.limitation ? `Limitation: ${o.limitation}` : "",
    o.examples ? `e.g. ${o.examples}` : "",
  ].filter(Boolean).join("\n");
  const body = [o.description || "", grants].filter(Boolean).join("\n\n");
  return { title: o.name, meta, body };
}
function detailFor(name: string, kind: Kind): Detail {
  const k = name.toLowerCase();
  if (kind === "tag") { const t = tagMap.get(k); return t ? { title: t.name, meta: "Tag", body: t.description } : null; }
  if (kind === "trait") { const t = traitMap.get(k); return t ? { title: t.name, meta: "Trait", body: t.description } : null; }
  if (kind === "origin") { const o = originMap.get(k); return o ? originDetail(o, "Origin") : null; }
  if (kind === "occupation") { const o = occMap.get(k); return o ? originDetail(o, "Occupation") : null; }
  const p = powerDetailMap?.get(k);
  if (!p) return null;
  const meta = [p.set, p.prereq ? `Prereq: ${p.prereq}` : "", p.action, p.duration, p.range ? `Range ${p.range}` : "", p.cost]
    .filter(Boolean).join(" · ");
  return { title: p.name, body: p.effect, meta };
}

export default function MmrpgRefTokens({ text, items, kind, sep = ", " }: { text?: string; items?: string[]; kind: Kind; sep?: string }) {
  const [active, setActive] = useState<{ name: string; kind: Kind } | null>(null);
  const [, force] = useState(0);
  if (!text && !(items && items.length)) return null;

  const open = async (name: string, k: Kind) => {
    if (k === "power" && !powerDetailMap) {
      const m = await import("@/lib/data/mmrpg-power-details");
      powerDetailMap = new Map(m.MMRPG_POWER_DETAILS.map((p) => [p.name.toLowerCase(), p] as const));
      force((n) => n + 1);
    }
    setActive({ name, kind: k });
  };

  const parts = items ?? (text ? text.split(",") : []);
  const detail = active ? detailFor(active.name, active.kind) : null;

  return (
    <>
      {parts.map((raw, i) => {
        const { name, rest } = analyze(raw, kind);
        const lead = i > 0 ? sep : "";
        if (!name) return <span key={i}>{lead}{raw.trim()}</span>;
        return (
          <span key={i}>
            {lead}
            <button
              type="button"
              onClick={() => open(name, kind)}
              className="border-b border-dotted border-[var(--mmrpg)] font-semibold text-[var(--mmrpg)] hover:text-[#f4737a]"
            >
              {name}
            </button>
            {rest}
          </span>
        );
      })}
      {active ? (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/60 p-4 sm:p-8" onClick={() => setActive(null)}>
          <div className="w-full max-w-md rounded-lg border border-[var(--border)] bg-[var(--panel)] shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 border-b border-[var(--border)] p-3">
              <h3 className="flex-1 text-[13px] font-bold uppercase tracking-[0.1em] text-[var(--mmrpg)]">{detail?.title ?? active.name}</h3>
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{active.kind}</span>
              <button type="button" className="text-[var(--muted)] hover:text-[var(--text)]" onClick={() => setActive(null)}>✕</button>
            </div>
            <div className="p-3">
              {detail?.meta ? <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted)]">{detail.meta}</p> : null}
              <p className="whitespace-pre-line text-[12px] leading-relaxed text-[var(--text)]">{detail?.body || "No description available."}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
