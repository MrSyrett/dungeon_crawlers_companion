// SOLO PLAY — the solo adventures a new solo campaign can start with. Plain data
// (no server imports) so the client form can use it too. Each id must match a
// module file loaded by the system's solo page: tools/templates/db_solo.html
// (window.DB_SOLO_MODULES) for Dragonbane, tools/templates/sd_solo.html
// (window.SD_SOLO_MODULES) for Shadowdark.
// Part of the removable Solo Play feature — see SOLO-REMOVAL.md.
export type SoloSystem = "DB" | "SD";
export const SOLO_MODULES: { id: string; title: string; label: string; system: SoloSystem }[] = [
  { id: "db-deepfall", title: "Alone in Deepfall Breach", label: "Alone in Deepfall Breach (5 missions)", system: "DB" },
  { id: "db-sinking-tower", title: "The Sinking Tower", label: "The Sinking Tower (one-shot)", system: "DB" },
  { id: "sd-dusk-queen", title: "Tomb of the Dusk Queen", label: "Tomb of the Dusk Queen (1st level)", system: "SD" },
];
// The character sheet tool each system's heroes come from.
export const SOLO_CHAR_TOOL: Record<SoloSystem, string> = { DB: "db-character", SD: "sd-character" };
export const SOLO_SYSTEM_NAME: Record<SoloSystem, string> = { DB: "Dragonbane", SD: "Shadowdark" };
export function soloSystemOfModule(id: string): SoloSystem {
  return SOLO_MODULES.find((m) => m.id === id)?.system ?? (/^sd-/.test(id) ? "SD" : "DB");
}
