import type { SystemKey } from "@/components/systemStore";

// ─────────────────────────────────────────────────────────────────────────────
// The game's title in its own face and colour, for the two bars that are plain
// HTML strings: the standalone bar (lib/sitenav.ts — sheets, builders, Map
// Maker) and the GM Screen / VTT bar (lib/minibar.ts). The Next navbar draws the
// same identity from app/globals.css (.nav-sys-title over the [data-sys] tile
// tokens); those tokens use next/font variables a standalone document doesn't
// have, so the faces are named here by the literal families public/tokens.css
// self-hosts. Keep the two in step.
// ─────────────────────────────────────────────────────────────────────────────

/** The game's title beside the logo, in that game's face and colour — the same
 *  identity the Next navbar draws from app/globals.css (.nav-sys-title over the
 *  [data-sys] tile tokens). Those tokens use next/font variables, which a
 *  standalone document doesn't have, so the faces are named here by the literal
 *  families public/tokens.css self-hosts. Keep the two in step. */
export const TITLE: Record<SystemKey, { f: string; c: string; x?: string }> = {
  SD: { f: '"JSL Blackletter"', c: "var(--text)" },
  ICRPG: { f: '"Permanent Marker"', c: "var(--icrpg)" },
  NIM: { f: '"Fraunces"', c: "#ffffff", x: "-webkit-text-stroke:.1em #000000;paint-order:stroke fill;text-shadow:.05em .06em 0 #000000,0 0 .22em rgba(142,201,236,.75);font-weight:700" },
  DND: { f: '"DnDC","Cinzel"', c: "var(--gold-ink)" },
  LOTR: { f: '"Ringbearer","EB Garamond"', c: "var(--lotr-ink)" },
  DCC: { f: '"Anton"', c: "var(--dcc-gold)" },
  KOB: { f: '"Dreadful"', c: "var(--kob)" },
  CO: { f: '"Cormorant Garamond"', c: "var(--candela-gold)" },
  MMRPG: { f: '"Marvel","Oswald"', c: "var(--text)", x: "text-transform:uppercase" },
  JLU: { f: '"Russo One"', c: "var(--jlu-gold)" },
  GB: { f: '"Ghostbusters","Anton"', c: "#ffffff", x: "text-shadow:0 0 2px rgba(255,255,255,.9),0 0 7px rgba(255,255,255,.45)" },
  SW: { f: '"Star Jedi","Archivo Black"', c: "var(--sw)", x: "text-transform:lowercase" },
  ACE: { f: '"Lilita One"', c: "var(--ace-yellow)" },
  D62E: { f: '"Saira Condensed"', c: "var(--d62e)" },
  YZE: { f: '"Archivo Narrow"', c: "var(--yze)" },
  TWD: { f: '"Dead Kansas","Oswald"', c: "var(--twd-bone)", x: "font-weight:400" },
  MYZ: { f: '"Anton"', c: "var(--myz)" },
  VAE: { f: '"Fraunces"', c: "var(--vae)" },
};
/** Two-colour wordmarks (SiteNav's NAME_PARTS). */
export const NAME_PARTS: Partial<Record<SystemKey, [string, string]>> = { DCC: ["Dungeon", "Crawler Carl"], MMRPG: ["Marvel", "Multiverse RPG"] };


/** Per-game face/colour rules (plus the two-colour wordmarks) for the title
 *  element `sel`, which carries data-sys="<KEY>". */
export function titleRules(sel: string): string {
  const per = (Object.keys(TITLE) as SystemKey[])
    .map((k) => `${sel}[data-sys="${k}"]{font-family:${TITLE[k].f},"Geist",ui-sans-serif,system-ui,sans-serif !important;color:${TITLE[k].c}${TITLE[k].x ? ";" + TITLE[k].x : ""}}`)
    .join("\n");
  const parts = `${sel}[data-sys="DCC"] .tn-1{color:var(--dcc-gold)}
${sel}[data-sys="DCC"] .tn-2{color:var(--dcc-ink)}
${sel}[data-sys="MMRPG"] .tn-1{display:inline-block;line-height:1;padding:.12em .18em .06em;margin-right:.08em;background:var(--mmrpg);color:#ffffff;border-radius:2px}
${sel}[data-sys="MMRPG"] .tn-2{color:var(--text,#e9edf2)}`;
  // Last, so it beats GB's plain-white line above where text-stroke exists.
  const gb = `@supports (-webkit-text-stroke:1px #fff){${sel}[data-sys="GB"]{color:var(--panel);-webkit-text-stroke:.04em #ffffff;paint-order:stroke fill}}`;
  return per + "\n" + parts + "\n" + gb;
}

/** The title's inner HTML: the two-colour wordmarks split into .tn-1 / .tn-2. */
export function titleHtml(key: SystemKey, name: string, esc: (s: string) => string): string {
  const p = NAME_PARTS[key];
  return p ? `<span class="tn-1">${esc(p[0])}</span> <span class="tn-2">${esc(p[1])}</span>` : esc(name);
}

/** Each game's second face — its skin's label font (--sys-label in
 *  public/tokens.css, which self-hosts every one). The GM Screen's campaign
 *  chip wears it, beside the title in the game's logo face. Keep in step with
 *  tokens.css. Shadowdark uses its old newspaper type instead. */
export const LABEL_FACE: Record<SystemKey, string> = {
  SD: '"Old Newspaper"',  // its second face (entry/creature names), not the skin's --sys-label
  DND: '"Cinzel"',
  DCC: '"Share Tech Mono"',
  SW: '"Libre Franklin"',
  MMRPG: '"Oswald"',
  ACE: '"Nunito"',
  KOB: '"Mulish"',
  D62E: '"Saira Condensed"',
  GB: '"Asap"',
  CO: '"Lora"',
  NIM: '"Figtree"',
  ICRPG: '"Archivo"',
  YZE: '"Archivo Narrow"',
  TWD: '"Oswald"',
  MYZ: '"Barlow Condensed"',
  VAE: '"Cormorant Garamond"',
  LOTR: '"Aniron"',
  JLU: '"Rubik"',
};

/** Rules giving `target` the label face of the game named by a preceding
 *  sibling title (`title`[data-sys] ~ target). */
export function labelRules(title: string, target: string): string {
  return (Object.keys(LABEL_FACE) as SystemKey[])
    .map((k) => `${title}[data-sys="${k}"] ~ ${target}{font-family:${LABEL_FACE[k]},"Geist",ui-sans-serif,system-ui,sans-serif}`)
    .join("\n");
}
