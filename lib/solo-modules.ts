// SOLO PLAY — the solo adventures a new solo campaign can start with. Plain data
// (no server imports) so the client form can use it too. Each id must match a
// module file loaded by tools/templates/db_solo.html (window.DB_SOLO_MODULES).
// Part of the removable Solo Play feature — see SOLO-REMOVAL.md.
export const SOLO_MODULES: { id: string; title: string; label: string }[] = [
  { id: "db-deepfall", title: "Alone in Deepfall Breach", label: "Alone in Deepfall Breach (5 missions)" },
  { id: "db-sinking-tower", title: "The Sinking Tower", label: "The Sinking Tower (one-shot)" },
];
