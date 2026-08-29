// Registry of the wrapped upstream Dungeon Desk tools (the original project
// this app wraps — not to be confused with this app's own name).
//
// `file`  — template under tools/templates served by the tool route.
// `keys`  — the localStorage key(s) that tool reads/writes. The serving route
//           seeds these from the document's saved data and the injected shim
//           persists changes back to the server.

import { readFile } from "node:fs/promises";
import path from "node:path";
import type { SystemKey } from "@/components/systemStore";

export type ToolId = "dcc-character" | "dcc-session" | "sd-character" | "sd-session" | "ace-character" | "kob-character" | "nimble-character" | "ace-session" | "kob-session" | "nimble-session";

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
    label: "Session Prep",
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
    label: "Session Prep",
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
  // The three session-prep builders below are generated from the DCC one by
  // scripts/make-session-builders.mjs (same tool, re-themed + re-keyed).
  "ace-session": {
    id: "ace-session",
    system: "ACE",
    systemName: "ACE!",
    kind: "session",
    label: "Session Prep",
    file: "ace_session_prep_builder.html",
    keys: ["ace_session"],
  },
  "kob-session": {
    id: "kob-session",
    system: "KOB",
    systemName: "Kids on Bikes",
    kind: "session",
    label: "Session Prep",
    file: "kob_session_prep_builder.html",
    keys: ["kob_session"],
  },
  "nimble-session": {
    id: "nimble-session",
    system: "NIM",
    systemName: "Nimble",
    kind: "session",
    label: "Session Prep",
    file: "nimble_session_prep_builder.html",
    keys: ["nimble_session"],
  },
};

export const TOOL_ORDER: ToolId[] = ["dcc-character", "dcc-session", "sd-character", "sd-session", "ace-character", "ace-session", "kob-character", "kob-session", "nimble-character", "nimble-session"];

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
// The tool templates are large static HTML files (100–660 KB) that only change
// on deploy, so each is read from disk once per server process and cached.
const templateCache = new Map<string, string>();

export async function loadToolTemplate(file: string): Promise<string> {
  const hit = templateCache.get(file);
  if (hit !== undefined) return hit;
  const template = await readFile(
    path.join(process.cwd(), "tools", "templates", file),
    "utf8",
  );
  templateCache.set(file, template);
  return template;
}
