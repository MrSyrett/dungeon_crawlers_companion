// Registry of the wrapped upstream Dungeon Desk tools (the original project
// this app wraps — not to be confused with this app's own name).
//
// `file`  — template under tools/templates served by the tool route.
// `keys`  — the localStorage key(s) that tool reads/writes. The serving route
//           seeds these from the document's saved data and the injected shim
//           persists changes back to the server.

import { readFile } from "node:fs/promises";
import path from "node:path";

export type ToolId =
  | "dcc-character"
  | "dcc-session"
  | "sd-character"
  | "sd-session"
  | "dungeon-map";

export type ToolKind = "character" | "session" | "map";

export interface ToolDef {
  id: ToolId;
  // "GEN" = system-neutral (a dungeon map isn't tied to a ruleset); it shows on
  // both system tabs and carries no system badge.
  system: "DCC" | "SD" | "GEN";
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
  "dungeon-map": {
    id: "dungeon-map",
    system: "GEN",
    systemName: "Dungeon",
    kind: "map",
    label: "Dungeon Map",
    file: "dungeon_map_maker.html",
    keys: ["dcc_map"],
  },
};

export const TOOL_ORDER: ToolId[] = [
  "dcc-character",
  "dcc-session",
  "sd-character",
  "sd-session",
  "dungeon-map",
];

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
