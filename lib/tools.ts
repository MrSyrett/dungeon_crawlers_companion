// Registry of the wrapped upstream Dungeon Desk tools (the original project
// this app wraps — not to be confused with this app's own name).
//
// `file`  — template under tools/templates served by the tool route.
// `keys`  — the localStorage key(s) that tool reads/writes. The serving route
//           seeds these from the document's saved data and the injected shim
//           persists changes back to the server.

import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import type { SystemKey } from "@/components/systemStore";

export type ToolId = "dcc-character" | "dcc-session" | "sd-character" | "sd-session" | "ace-character" | "kob-character" | "nimble-character" | "ace-session" | "kob-session" | "nimble-session" | "sw-character" | "sw-session" | "dnd-character" | "dnd-session" | "d62e-character" | "d62e-session" | "icrpg-character" | "icrpg-session" | "co-character" | "co-session" | "yze-character" | "yze-session" | "mmrpg-character" | "mmrpg-session" | "jlu-character" | "jlu-session" | "gb-character" | "gb-session";

export type ToolKind = "character" | "session";

export interface ToolDef {
  id: ToolId;
  system: SystemKey;
  systemName: string;
  kind: ToolKind;
  label: string;
  file: string;
  keys: string[];
}

export const TOOLS: Record<ToolId, ToolDef> = {
  "dcc-character": {
    id: "dcc-character",
    system: "DCC",
    systemName: "Dungeon Crawler Carl",
    kind: "character",
    label: "Character Sheet",
    file: "dcc_character_sheet.html",
    keys: ["dcc_sheet"],
  },
  "dcc-session": {
    id: "dcc-session",
    system: "DCC",
    systemName: "Dungeon Crawler Carl",
    kind: "session",
    label: "Adventure",
    file: "dcc_session_prep_builder.html",
    keys: ["dcc_session"],
  },
  "sd-character": {
    id: "sd-character",
    system: "SD",
    systemName: "Shadowdark",
    kind: "character",
    label: "Character Sheet",
    file: "sd_character_sheet.html",
    keys: ["sd_sheet"],
  },
  "sd-session": {
    id: "sd-session",
    system: "SD",
    systemName: "Shadowdark",
    kind: "session",
    label: "Adventure",
    file: "sd_session_prep_builder.html",
    keys: ["sd_session"],
  },
  "ace-character": {
    id: "ace-character",
    system: "ACE",
    systemName: "ACE!",
    kind: "character",
    label: "Hero ID Card",
    file: "ace_character_sheet.html",
    keys: ["ace_sheet"],
  },
  "kob-character": {
    id: "kob-character",
    system: "KOB",
    systemName: "Kids on Bikes",
    kind: "character",
    label: "Character Sheet",
    file: "kob_character_sheet.html",
    keys: ["kob_sheet"],
  },
  "nimble-character": {
    id: "nimble-character",
    system: "NIM",
    systemName: "Nimble",
    kind: "character",
    label: "Character Sheet",
    file: "nimble_character_sheet.html",
    keys: ["nimble_sheet"],
  },
  "sw-character": {
    id: "sw-character",
    system: "SW",
    systemName: "Star Wars",
    kind: "character",
    label: "Character Sheet",
    file: "sw_character_sheet.html",
    keys: ["sw_sheet"],
  },
  "dnd-character": {
    id: "dnd-character",
    system: "DND",
    systemName: "D&D",
    kind: "character",
    label: "Character Sheet",
    file: "dnd_character_sheet.html",
    keys: ["dnd_sheet"],
  },
  // The session-prep builders below are generated from the DCC one by
  // scripts/make-session-builders.mjs (same tool, re-themed + re-keyed).
  "ace-session": {
    id: "ace-session",
    system: "ACE",
    systemName: "ACE!",
    kind: "session",
    label: "Adventure",
    file: "ace_session_prep_builder.html",
    keys: ["ace_session"],
  },
  "kob-session": {
    id: "kob-session",
    system: "KOB",
    systemName: "Kids on Bikes",
    kind: "session",
    label: "Adventure",
    file: "kob_session_prep_builder.html",
    keys: ["kob_session"],
  },
  "nimble-session": {
    id: "nimble-session",
    system: "NIM",
    systemName: "Nimble",
    kind: "session",
    label: "Adventure",
    file: "nimble_session_prep_builder.html",
    keys: ["nimble_session"],
  },
  "sw-session": {
    id: "sw-session",
    system: "SW",
    systemName: "Star Wars",
    kind: "session",
    label: "Adventure",
    file: "sw_session_prep_builder.html",
    keys: ["sw_session"],
  },
  "dnd-session": {
    id: "dnd-session",
    system: "DND",
    systemName: "D&D",
    kind: "session",
    label: "Adventure",
    file: "dnd_session_prep_builder.html",
    keys: ["dnd_session"],
  },
  "d62e-character": {
    id: "d62e-character",
    system: "D62E",
    systemName: "D6 System 2e",
    kind: "character",
    label: "Character Sheet",
    file: "d62e_character_sheet.html",
    keys: ["d62e_sheet"],
  },
  "d62e-session": {
    id: "d62e-session",
    system: "D62E",
    systemName: "D6 System 2e",
    kind: "session",
    label: "Adventure",
    file: "d62e_session_prep_builder.html",
    keys: ["d62e_session"],
  },
  "icrpg-character": {
    id: "icrpg-character",
    system: "ICRPG",
    systemName: "Index Card RPG",
    kind: "character",
    label: "Character Sheet",
    file: "icrpg_character_sheet.html",
    keys: ["icrpg_sheet"],
  },
  "icrpg-session": {
    id: "icrpg-session",
    system: "ICRPG",
    systemName: "Index Card RPG",
    kind: "session",
    label: "Adventure",
    file: "icrpg_session_prep_builder.html",
    keys: ["icrpg_session"],
  },
  "co-character": {
    id: "co-character",
    system: "CO",
    systemName: "Candela Obscura",
    kind: "character",
    label: "Character Sheet",
    file: "co_character_sheet.html",
    keys: ["co_sheet"],
  },
  "co-session": {
    id: "co-session",
    system: "CO",
    systemName: "Candela Obscura",
    kind: "session",
    label: "Adventure",
    file: "co_session_prep_builder.html",
    keys: ["co_session"],
  },
  "yze-character": {
    id: "yze-character",
    system: "YZE",
    systemName: "Year Zero Engine",
    kind: "character",
    label: "Character Sheet",
    file: "yze_character_sheet.html",
    keys: ["yze_sheet"],
  },
  "yze-session": {
    id: "yze-session",
    system: "YZE",
    systemName: "Year Zero Engine",
    kind: "session",
    label: "Adventure",
    file: "yze_session_prep_builder.html",
    keys: ["yze_session"],
  },
  "mmrpg-character": {
    id: "mmrpg-character",
    system: "MMRPG",
    systemName: "Marvel Multiverse RPG",
    kind: "character",
    label: "Character Sheet",
    file: "mmrpg_character_sheet.html",
    keys: ["mmrpg_sheet"],
  },
  "mmrpg-session": {
    id: "mmrpg-session",
    system: "MMRPG",
    systemName: "Marvel Multiverse RPG",
    kind: "session",
    label: "Adventure",
    file: "mmrpg_session_prep_builder.html",
    keys: ["mmrpg_session"],
  },
  "jlu-character": {
    id: "jlu-character",
    system: "JLU",
    systemName: "Justice League Unlimited",
    kind: "character",
    label: "Hero Sheet",
    file: "jlu_character_sheet.html",
    keys: ["jlu_sheet"],
  },
  "jlu-session": {
    id: "jlu-session",
    system: "JLU",
    systemName: "Justice League Unlimited",
    kind: "session",
    label: "Adventure",
    file: "jlu_session_prep_builder.html",
    keys: ["jlu_session"],
  },
  "gb-character": {
    id: "gb-character",
    system: "GB",
    systemName: "Ghostbusters",
    kind: "character",
    label: "ID Card",
    file: "gb_character_sheet.html",
    keys: ["gb_sheet"],
  },
  "gb-session": {
    id: "gb-session",
    system: "GB",
    systemName: "Ghostbusters",
    kind: "session",
    label: "Adventure",
    file: "gb_session_prep_builder.html",
    keys: ["gb_session"],
  },
};

export const TOOL_ORDER: ToolId[] = ["dcc-character", "dcc-session", "sd-character", "sd-session", "ace-character", "ace-session", "kob-character", "kob-session", "nimble-character", "nimble-session", "sw-character", "sw-session", "dnd-character", "dnd-session", "d62e-character", "d62e-session", "icrpg-character", "icrpg-session", "co-character", "co-session", "yze-character", "yze-session", "mmrpg-character", "mmrpg-session", "jlu-character", "jlu-session", "gb-character", "gb-session"];

// Every character-sheet tool id — the set the campaign roster, VTT token access
// and the documents API treat as "a sheet" (they all carry a campaign link).
export const CHARACTER_TOOL_IDS: ToolId[] = TOOL_ORDER.filter((id) => TOOLS[id].kind === "character");

// The localStorage/blob key a character tool keeps its sheet JSON under
// (sd_sheet / dcc_sheet / ace_sheet). Null for non-character tools.
export function sheetKeyFor(tool: string): string | null {
  if (!isToolId(tool) || TOOLS[tool].kind !== "character") return null;
  return TOOLS[tool].keys[0] ?? null;
}

export function isToolId(value: string): value is ToolId {
  return Object.prototype.hasOwnProperty.call(TOOLS, value);
}

// ── Template loading ─────────────────────────────────────────────────────────
// The tool templates are large static HTML files (100 KB – 1 MB) that only
// change on deploy, so each is read from disk once per server process, SPLIT
// (below) and cached.
//
// The split: a template is >98% static code — the GM Screen carried 781 KB of
// inline <script> and 159 KB of inline <style> — but the page it's served in
// must be `no-store` (it has your saved state injected). So every open used to
// re-download and re-parse all of it. Now, at load time:
//
//   • every sizable inline <script> / <style> body is lifted into a content-
//     hashed asset (`/tool-assets/<sha1>.js|css`, served immutable from memory
//     by app/tool-assets/[name]/route.ts), and replaced by a <script src> /
//     <link>. The browser caches them and reuses its compiled-code cache;
//   • every template <script> gets `defer` — they all still run in document
//     order, just after parsing instead of blocking it, and before
//     DOMContentLoaded (the injected shims' boot handler still finds them);
//   • `/tools-data/*.js` and `/vendor/*` references get a `?v=<hash>` stamp from
//     the file's bytes, so next.config can cache /tools-data immutably and a
//     changed data file still shows up immediately (new URL).
//
// Repeat opens of the GM Screen go from ~288 KB (gzipped) of HTML to ~20 KB.
// The injected per-document pieces (state, shims, mini-bar) are NOT part of the
// template and stay inline — they're small and must run first.
const templateCache = new Map<string, string>();

// name (e.g. "3f9a…c2.js") → { body, type }
const assetStore = new Map<string, { body: string; type: string }>();
const fileHashCache = new Map<string, string>();

function sha1(s: string | Buffer): string {
  return createHash("sha1").update(s).digest("hex").slice(0, 20);
}

export function getToolAsset(name: string): { body: string; type: string } | undefined {
  return assetStore.get(name);
}

// Content hash of a file under public/ (for ?v= stamps); "" if unreadable.
async function publicFileHash(urlPath: string): Promise<string> {
  const hit = fileHashCache.get(urlPath);
  if (hit !== undefined) return hit;
  let h = "";
  try {
    const buf = await readFile(path.join(process.cwd(), "public", urlPath.replace(/^\//, "")));
    h = sha1(buf);
  } catch {
    h = "";
  }
  fileHashCache.set(urlPath, h);
  return h;
}

// EVERY inline JS script is lifted, however small. If a tiny one (e.g. a
// sheet's trailing `fillDatalists(); autoLoad();`) stayed inline it would run at
// parse time — BEFORE the deferred scripts it depends on. Uniform deferral is
// what keeps the original document order intact.
const MIN_SCRIPT_BYTES = 1;
const MIN_STYLE_BYTES = 800;
const JS_TYPES = new Set(["", "text/javascript", "application/javascript", "module"]);

async function splitTemplate(html: string): Promise<string> {
  // 1) inline <script> → hashed external, deferred
  html = html.replace(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/gi, (whole, attrsRaw: string | undefined, body: string) => {
    const attrs = attrsRaw || "";
    if (/\bsrc\s*=/i.test(attrs)) return whole;                 // external: handled below
    const typeM = /\btype\s*=\s*["']([^"']*)["']/i.exec(attrs);
    const type = (typeM ? typeM[1] : "").trim().toLowerCase();
    if (!JS_TYPES.has(type)) return whole;                        // templates / JSON stay
    if (body.length < MIN_SCRIPT_BYTES) return whole;
    const name = `${sha1(body)}.js`;
    if (!assetStore.has(name)) assetStore.set(name, { body, type: "text/javascript; charset=utf-8" });
    const keep = attrs.replace(/\s*\b(defer|async)\b/gi, "");
    return `<script${keep} src="/tool-assets/${name}" defer></script>`;
  });

  // 2) external template scripts → defer (keeps document order, unblocks parsing)
  html = html.replace(/<script(\s[^>]*\bsrc\s*=[^>]*)>\s*<\/script>/gi, (whole, attrs: string) => {
    if (/\b(defer|async)\b/i.test(attrs)) return whole;
    return `<script${attrs} defer></script>`;
  });

  // 3) inline <style> → hashed external stylesheet
  html = html.replace(/<style(\s[^>]*)?>([\s\S]*?)<\/style>/gi, (whole, attrsRaw: string | undefined, body: string) => {
    if (body.length < MIN_STYLE_BYTES) return whole;
    const attrs = attrsRaw || "";
    if (/\bmedia\s*=/i.test(attrs)) return whole;                 // keep media-scoped as-is
    const name = `${sha1(body)}.css`;
    if (!assetStore.has(name)) assetStore.set(name, { body, type: "text/css; charset=utf-8" });
    return `<link rel="stylesheet" href="/tool-assets/${name}">`;
  });

  // 4) ?v= content stamps on /tools-data and /vendor references
  const refs = new Set<string>();
  for (const m of html.matchAll(/\bsrc="(\/(?:tools-data|vendor)\/[^"?]+)"/g)) refs.add(m[1]);
  for (const m of html.matchAll(/\bsrc="(\/dungeon-engine\.js)"/g)) refs.add(m[1]);
  for (const ref of refs) {
    const h = await publicFileHash(ref);
    if (!h) continue;
    html = html.split(`src="${ref}"`).join(`src="${ref}?v=${h}"`);
  }
  return html;
}

export async function loadToolTemplate(file: string): Promise<string> {
  const hit = templateCache.get(file);
  if (hit !== undefined) return hit;
  const raw = await readFile(
    path.join(process.cwd(), "tools", "templates", file),
    "utf8",
  );
  const template = await splitTemplate(raw);
  templateCache.set(file, template);
  return template;
}
