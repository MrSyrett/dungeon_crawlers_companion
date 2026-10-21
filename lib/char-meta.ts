// Reads {name, class/equivalent, level/equivalent} out of a saved character
// sheet's JSON — the one place that knows where each of the fourteen systems
// keeps those three facts. The campaigns roster and the home-screen
// "My Characters" / "My Campaigns" sections both read sheets this way, so the
// extraction lives here rather than being copied into each page.
//
// Every system saves a flat object under its own `Document.data` key
// (sd_sheet, dcc_sheet, …). Level is a real number only where the system has
// levels (SD/DND/LOTR/Nimble/ICRPG/DCC, and MMRPG's Rank); elsewhere it is null and
// the system's "equivalent" (archetype, template, trope, role, tier …) is folded
// into `cls` instead. When adding a system, add its branch here — see
// `anthropic-skills:add-game-system`.

// Only the handful of fields we read out of a saved character sheet.
type SheetBlob = {
  name?: unknown;
  class?: unknown;
  level?: unknown;
};

export type CharMeta = { name: string; cls: string; level: number | null };

export function readCharMeta(data: unknown, fallbackTitle: string): CharMeta | null {
  const blob = (data ?? null) as Record<string, unknown> | null;
  try {
    const sd = blob?.sd_sheet;
    if (typeof sd === "string") {
      const s = JSON.parse(sd) as SheetBlob;
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls: typeof s.class === "string" ? s.class : "",
        level: typeof s.level === "number" ? s.level : null,
      };
    }
    // Candela Obscura: no levels — the roster shows role · specialty as the class.
    const co = blob?.co_sheet;
    if (typeof co === "string") {
      const s = JSON.parse(co) as { name?: unknown; role?: unknown; specialty?: unknown };
      const cls = [s.role, s.specialty].filter((v) => typeof v === "string" && v.trim()).join(" · ");
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls,
        level: null,
      };
    }
    // Year Zero Engine: no levels — the roster shows the archetype as the class.
    const yze = blob?.yze_sheet;
    if (typeof yze === "string") {
      const s = JSON.parse(yze) as { name?: unknown; archetype?: unknown; class?: unknown };
      const cls = (typeof s.archetype === "string" && s.archetype.trim()) ? s.archetype : (typeof s.class === "string" ? s.class : "");
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls,
        level: null,
      };
    }
    // The Walking Dead: no levels — the roster shows the archetype as the class.
    const twd = blob?.twd_sheet;
    if (typeof twd === "string") {
      const s = JSON.parse(twd) as { name?: unknown; archetype?: unknown; class?: unknown };
      const cls = (typeof s.archetype === "string" && s.archetype.trim()) ? s.archetype : (typeof s.class === "string" ? s.class : "");
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls,
        level: null,
      };
    }
    // Mutant: Year Zero: no levels — the roster shows the role as the class.
    const myz = blob?.myz_sheet;
    if (typeof myz === "string") {
      const s = JSON.parse(myz) as { name?: unknown; role?: unknown; class?: unknown };
      const cls = (typeof s.role === "string" && s.role.trim()) ? s.role : (typeof s.class === "string" ? s.class : "");
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls,
        level: null,
      };
    }
    // Vaesen: no levels — the roster shows the archetype as the class.
    const vae = blob?.vae_sheet;
    if (typeof vae === "string") {
      const s = JSON.parse(vae) as { name?: unknown; archetype?: unknown; class?: unknown };
      const cls = (typeof s.archetype === "string" && s.archetype.trim()) ? s.archetype : (typeof s.class === "string" ? s.class : "");
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls,
        level: null,
      };
    }
    // The Lord of the Rings: calling (+ its specialisation) as the class, level 1–10.
    const lotr = blob?.lotr_sheet;
    if (typeof lotr === "string") {
      const s = JSON.parse(lotr) as { name?: unknown; calling?: unknown; cls?: unknown; subclass?: unknown; level?: unknown };
      const callingName = typeof s.calling === "string" && s.calling.trim() ? s.calling : (typeof s.cls === "string" ? s.cls : "");
      const sub = typeof s.subclass === "string" && s.subclass.trim() ? `(${s.subclass.trim()})` : "";
      const lv = parseInt(String(s.level ?? ""), 10);
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls: [callingName, sub].filter(Boolean).join(" "),
        level: Number.isNaN(lv) ? null : lv,
      };
    }
    // Dragonbane: no levels — the class column shows profession (and kin).
    const dbs = blob?.db_sheet;
    if (typeof dbs === "string") {
      const s = JSON.parse(dbs) as { name?: unknown; profession?: unknown; kin?: unknown };
      const prof = typeof s.profession === "string" ? s.profession.trim() : "";
      const kin = typeof s.kin === "string" ? s.kin.trim() : "";
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls: [kin, prof].filter(Boolean).join(" "),
        level: null,
      };
    }
    // Pirate Borg: no levels — the class column shows the class.
    const pbs = blob?.pb_sheet;
    if (typeof pbs === "string") {
      const s = JSON.parse(pbs) as { name?: unknown; class?: unknown };
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls: typeof s.class === "string" ? s.class.trim() : "",
        level: null,
      };
    }
    // Marvel Multiverse RPG: "level" is Rank; the class column shows the origin.
    const mmrpg = blob?.mmrpg_sheet;
    if (typeof mmrpg === "string") {
      const s = JSON.parse(mmrpg) as { name?: unknown; origin?: unknown; occupation?: unknown; rank?: unknown };
      const cls = (typeof s.origin === "string" && s.origin.trim()) ? s.origin : (typeof s.occupation === "string" ? s.occupation : "");
      const rank = Number(s.rank);
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls,
        level: Number.isFinite(rank) && rank > 0 ? rank : null,
      };
    }
    const jlu = blob?.jlu_sheet;
    if (typeof jlu === "string") {
      const s = JSON.parse(jlu) as { name?: unknown; origin?: unknown; arch?: unknown; tier?: unknown };
      const bits = [
        typeof s.tier === "string" && s.tier ? `Tier ${s.tier}` : "",
        typeof s.origin === "string" ? s.origin : "",
        typeof s.arch === "string" ? s.arch : "",
      ].filter(Boolean);
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls: bits.join(" · "),
        level: null,
      };
    }
    const gb = blob?.gb_sheet;
    if (typeof gb === "string") {
      const s = JSON.parse(gb) as { name?: unknown; goal?: unknown };
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls: typeof s.goal === "string" ? s.goal : "Ghostbuster",
        level: null,
      };
    }
    const dcc = blob?.dcc_sheet;
    if (typeof dcc === "string") {
      const s = JSON.parse(dcc) as { header?: Record<string, unknown> };
      const h = s.header || {};
      const nm = h["f-name"], cl = h["f-class"];
      const lv = parseInt(String(h["f-level"] ?? ""), 10);
      return {
        name: (typeof nm === "string" && nm.trim()) || fallbackTitle || "Unnamed",
        cls: typeof cl === "string" ? cl : "",
        level: Number.isNaN(lv) ? null : lv,
      };
    }
    // Nimble: class + level like Shadowdark.
    const nim = blob?.nimble_sheet;
    if (typeof nim === "string") {
      const s = JSON.parse(nim) as { name?: unknown; cls?: unknown; level?: unknown; ancestry?: unknown };
      const lv = parseInt(String(s.level ?? ""), 10);
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls: [s.ancestry, s.cls].filter((v) => typeof v === "string" && v.trim()).join(" "),
        level: Number.isNaN(lv) ? null : lv,
      };
    }
    // Star Wars: no levels — the roster shows the template as the class.
    const sw = blob?.sw_sheet;
    if (typeof sw === "string") {
      const s = JSON.parse(sw) as { name?: unknown; template?: unknown; species?: unknown };
      const cls = [s.species, s.template].filter((v) => typeof v === "string" && v.trim()).join(" · ");
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls,
        level: null,
      };
    }
    // D62e: no levels — the roster shows the template (and genre) as the class.
    const d62e = blob?.d62e_sheet;
    if (typeof d62e === "string") {
      const s = JSON.parse(d62e) as { name?: unknown; template?: unknown; genre?: unknown };
      const cls = [s.template, s.genre].filter((v) => typeof v === "string" && v.trim()).join(" · ");
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls,
        level: null,
      };
    }
    // ICRPG: the roster shows the hero Type (and World) as the class; Milestones
    // are tracked on the sheet's level field.
    const icrpg = blob?.icrpg_sheet;
    if (typeof icrpg === "string") {
      const s = JSON.parse(icrpg) as { name?: unknown; type?: unknown; world?: unknown; level?: unknown };
      const world = { alfheim: "Alfheim", warpshell: "Warp Shell", ghostmountain: "Ghost Mountain", vigilantecity: "Vigilante City", bloodandsnow: "Blood & Snow" }[String(s.world ?? "")] ?? "";
      const cls = [typeof s.type === "string" ? s.type : "", world].filter((v) => v && String(v).trim()).join(" · ");
      const lv = parseInt(String(s.level ?? ""), 10);
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls,
        level: Number.isNaN(lv) ? null : lv,
      };
    }
    // Kids on Bikes: no levels — the roster shows the Trope (and book) as the class.
    const kob = blob?.kob_sheet;
    if (typeof kob === "string") {
      const s = JSON.parse(kob) as { name?: unknown; trope?: unknown; book?: unknown };
      const bookName = { bikes: "Bikes", brooms: "Brooms", capes: "Capes" }[String(s.book ?? "")] ?? "";
      const cls = [typeof s.trope === "string" ? s.trope : "", bookName].filter(Boolean).join(" · ");
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls,
        level: null,
      };
    }
    // ACE! Hero ID Card: no levels — the roster shows "Trait Role" as the class.
    const ace = blob?.ace_sheet;
    if (typeof ace === "string") {
      const s = JSON.parse(ace) as { name?: unknown; trait?: unknown; role?: unknown };
      const cls = [s.trait, s.role].filter((v) => typeof v === "string" && v.trim()).join(" ");
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls,
        level: null,
      };
    }
    // D&D (2024): class (+ subclass) as the class, character level as the level.
    const dnd = blob?.dnd_sheet;
    if (typeof dnd === "string") {
      const s = JSON.parse(dnd) as { name?: unknown; cls?: unknown; subclass?: unknown; level?: unknown };
      const sub = typeof s.subclass === "string" && s.subclass.trim() ? `(${s.subclass.trim()})` : "";
      const cls = [typeof s.cls === "string" ? s.cls : "", sub].filter(Boolean).join(" ");
      const lv = parseInt(String(s.level ?? ""), 10);
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls,
        level: Number.isNaN(lv) ? null : lv,
      };
    }
  } catch {
    return null;
  }
  return null;
}
