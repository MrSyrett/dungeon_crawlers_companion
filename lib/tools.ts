// Registry of the wrapped upstream Dungeon Desk tools (the original project
// this app wraps — not to be confused with this app's own name).
//
// `file`  — template under tools/templates served by the tool route.
// `keys`  — the localStorage key(s) that tool reads/writes. The serving route
//           seeds these from the document's saved data and the injected shim
//           persists changes back to the server.

export type ToolId = "dcc-character" | "dcc-session" | "sd-character" | "sd-session";

export type ToolKind = "character" | "session";

export interface ToolDef {
  id: ToolId;
  system: "DCC" | "SD";
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
};

export const TOOL_ORDER: ToolId[] = ["dcc-character", "dcc-session", "sd-character", "sd-session"];

export function isToolId(value: string): value is ToolId {
  return Object.prototype.hasOwnProperty.call(TOOLS, value);
}
