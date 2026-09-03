/* Shared D&D 2024 caster/spell/ASI math (window.DNDCALC).
   Pure helpers used by BOTH the character builder (dnd-sheet-builder.js) and the
   level-up wizard (dnd-levelup.js) so the two stay in step. No DOM; reads the
   window.DND_* data globals at call time. */
(function () {
  "use strict";
  if (typeof window === "undefined") return;

  const num = (v) => { const n = parseInt(v, 10); return isNaN(n) ? 0 : n; };
  const norm = (s) => String(s == null ? "" : s).trim().toLowerCase();
  const esc = (s) => String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  const CLASSES = () => window.DND_CLASSES || [];
  const TABLES = () => window.DND_TABLES || null;
  const classByName = (n) => CLASSES().find((c) => norm(c.name) === norm(n)) || null;
  const isCasterClass = (c) => !!(c && c.spellcasting && c.spellcasting !== "none");

  // ── ASI / feat levels ──────────────────────────────────────────────────
  const ASI_LEVELS = { Fighter: [4,6,8,12,14,16,19], Rogue: [4,8,10,12,16,19] };
  const ASI_DEFAULT = [4,8,12,16,19];
  const grantsASI = (cls, level) => (ASI_LEVELS[cls] || ASI_DEFAULT).includes(level);
  // Every ASI/feat level a class has gained by `level` (used to build above L1).
  const asiLevelsUpTo = (cls, level) => (ASI_LEVELS[cls] || ASI_DEFAULT).filter((l) => l <= level);

  // ── spell picker card (shared markup) ──────────────────────────────────
  const shortCastTime = (ct) => { ct = String(ct || ""); if (/bonus/i.test(ct)) return "Bonus"; if (/reaction/i.test(ct)) return "Reaction"; if (/^\s*action\s*$/i.test(ct)) return "Action"; return ct; };
  const spellDmgStr = (s) => { const m = String((s && s.description) || "").match(/(\d+d\d+)\s+([A-Za-z]+)\s+damage/i); return m ? (m[1] + " " + m[2].toLowerCase()) : ""; };
  function spellTags(s) {
    const tags = [s.level === 0 ? "Cantrip" : "Lvl " + s.level, s.school, shortCastTime(s.castingTime), s.range];
    if (s.duration && !/instant/i.test(s.duration)) tags.push(s.duration);
    const d = spellDmgStr(s); if (d) tags.push(d);
    if (s.concentration) tags.push("Conc.");
    if (s.ritual) tags.push("Ritual");
    return tags;
  }
  function spellCard(s, kind, max, on) {
    return '<div class="dndb-card small spellpick' + (on ? " on" : "") + '" data-spell="' + esc(s.name) + '" data-kind="' + kind + '" data-max="' + max + '">' +
      '<div class="sp-pick-hd"><span class="dc-title">' + esc(s.name) + '</span><button class="sp-pick-i" data-info="' + esc(s.name) + '" title="Show details">&#9432;</button></div>' +
      '<div class="dc-sub">' + esc(spellTags(s).join(" · ")) + '</div>' +
      '<div class="sp-pick-desc" hidden>' + esc(s.description || "") + (s.higherLevels ? '<br><b>At Higher Levels.</b> ' + esc(s.higherLevels) : "") + '</div>' +
    '</div>';
  }

  // ── class-table lookups ────────────────────────────────────────────────
  const tableRow = (c, level) => ((c && c.table) || []).find((r) => Number(r.level) === Number(level)) || null;
  function colAt(c, level, col) { const r = tableRow(c, level); if (!r || !r.columns) return 0; const n = parseInt(r.columns[col], 10); return isNaN(n) ? 0 : n; }
  function cantripsAt(c, level) { if (level < 1) return 0; const r = tableRow(c, level); return Math.max(colAt(c, level, "Cantrips"), r && r.cantripsKnown != null ? Number(r.cantripsKnown) : 0); }
  function preparedAt(c, level) { if (level < 1) return 0; return colAt(c, level, "Prepared Spells") || colAt(c, level, "Spells Known"); }

  // Highest spell level a single class of the given level can cast.
  function maxSpellLevelSingle(c, level) {
    const T = TABLES(); if (!c || !T) return 0;
    if (c.spellcasting === "pact") { const r = (T.pactMagic || [])[level-1]; return r ? r.level : 1; }
    const map = { full:"fullCasterSlots", half:"halfCasterSlots", third:"thirdCasterSlots", artificer:"artificerSlots" };
    const arr = (T[map[c.spellcasting]] || [])[level-1] || []; let m = 0; arr.forEach((n, i) => { if (n > 0) m = i+1; });
    if (m < 1 && preparedAt(c, level) > 0) m = 1;
    return m;
  }
  // Combined caster level for a multiclass set [{cls, level}] (RAW: full=lvl,
  // half=⌊/2⌋, third=⌊/3⌋, artificer=⌈/2⌉; Pact Magic excluded).
  function combinedCasterLevel(classLevels) {
    let lvl = 0;
    (classLevels || []).forEach((cl) => { const c = classByName(cl.cls); if (!c || !isCasterClass(c) || c.spellcasting === "pact") return; const L = num(cl.level);
      if (c.spellcasting === "full") lvl += L; else if (c.spellcasting === "artificer") lvl += Math.ceil(L/2); else if (c.spellcasting === "half") lvl += Math.floor(L/2); else if (c.spellcasting === "third") lvl += Math.floor(L/3); });
    return lvl;
  }
  // Highest spell level castable given a full multiclass set (uses the combined
  // full-caster table when more than one caster class is present — the C2 fix).
  function maxSpellLevelMulti(classLevels) {
    const T = TABLES(); if (!T) return 1;
    const casters = (classLevels || []).map((cl) => ({ cl, c: classByName(cl.cls) })).filter((x) => x.c && isCasterClass(x.c) && x.c.spellcasting !== "pact");
    if (casters.length <= 1) return casters.length ? maxSpellLevelSingle(casters[0].c, num(casters[0].cl.level)) : 0;
    const mcl = combinedCasterLevel(classLevels); const arr = (T.fullCasterSlots || [])[mcl-1] || []; let m = 0; arr.forEach((n, i) => { if (n > 0) m = i+1; });
    return m;
  }
  function profBonus(level) { const T = TABLES(); if (T && T.proficiencyByLevel && T.proficiencyByLevel[level-1]) return T.proficiencyByLevel[level-1]; return 2 + Math.floor((Math.max(1, level) - 1) / 4); }

  // Mechanical effects a feat applies, parsed from its free-text benefits.
  // Only the unambiguous ones (no player choice): Tough's HP, a single named
  // ability +1. Returns { hpBonus, abil:{STR:1,...} }; everything else is 0/{}.
  function featEffects(name, charLevel) {
    const out = { hpBonus: 0, abil: {} };
    const f = (window.DND_FEATS || []).find((x) => norm(x.name) === norm(name));
    if (!f) return out;
    const text = (f.benefits || []).join(" ") + " " + (f.description || "");
    if (/hit point maximum increases by an amount equal to twice your character level/i.test(text)) out.hpBonus = 2 * Math.max(1, charLevel || 1);
    const m = text.match(/increase your (Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) score by 1(?!\s*,)/i);
    if (m && !/or\s+(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)/i.test(text)) { const k = m[1].slice(0,3).toUpperCase(); out.abil[k] = (out.abil[k] || 0) + 1; }
    return out;
  }

  window.DNDCALC = {
    num, norm, esc, classByName, isCasterClass,
    ASI_LEVELS, ASI_DEFAULT, grantsASI, asiLevelsUpTo,
    shortCastTime, spellDmgStr, spellTags, spellCard,
    tableRow, colAt, cantripsAt, preparedAt,
    maxSpellLevelSingle, combinedCasterLevel, maxSpellLevelMulti, profBonus, featEffects,
  };
})();
