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
  // Some classes prepare/learn spells from another class's list — Artificer draws
  // from the Wizard spell list. Spells in the data are tagged by class in their
  // `classes` array, so we resolve the picker's class to the list it should read.
  const SPELL_LIST_ALIAS = { artificer: "wizard" };
  const spellListName = (className) => SPELL_LIST_ALIAS[norm(className)] || norm(className);
  const spellInList = (spell, className) => (spell && spell.classes || []).some((n) => norm(n) === spellListName(className));
  // The spell lists a class prepares from at a given class level. 2024 Magical Secrets (Bard 10+)
  // opens the Cleric, Druid and Wizard lists to the Bard's own prepared spells.
  const listsFor = (className, level) => (norm(className) === "bard" && Number(level) >= 10) ? ["Bard","Cleric","Druid","Wizard"] : [className];
  const spellInLists = (spell, lists) => [].concat(lists || []).some((l) => spellInList(spell, l));

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
  // ── Unified spell picker (shared by the sheet Spellbook, the creation
  //    builder, and the level-up wizard) ───────────────────────────────────
  // One collapsed row per spell (click the row to expand its description), the
  // rows grouped into sections by spell level with a sticky header, and a
  // +Add / −Remove control on each row. Pure markup: each caller wires the two
  // data hooks (`[data-sp-exp]` to expand, `[data-sp-pick]` to add/remove) and
  // supplies the selection + add-gating predicates through `opts`.
  const spellLevelLabel = (L) => L === 0 ? "Cantrips" : "Level " + L;
  function spellRow(s, opts) {
    const name = s.name;
    const sel = opts.selected(name);
    const blocked = !sel && opts.disabledAdd(s);
    const label = sel ? (opts.removeLabel || "− Remove") : (opts.addLabel || "+ Add");
    const cls = "spl-pick" + (sel ? " on" : "") + (blocked ? " disabled" : "");
    const pickAttr = opts.pickAttr || "data-sp-pick", expAttr = opts.expAttr || "data-sp-exp";
    return '<div class="spl-row" data-sp="' + esc(name) + '">' +
      '<button class="spl-head" ' + expAttr + ' type="button">' +
        '<span class="spl-caret">▸</span>' +
        '<span class="spl-hd-txt"><span class="spl-name">' + esc(name) + '</span>' +
        '<span class="spl-tags">' + esc(spellTags(s).join(" · ")) + '</span></span>' +
      '</button>' +
      '<button class="' + cls + '" type="button" ' + pickAttr + '="' + esc(name) + '"' + (blocked ? " disabled" : "") + '>' + label + '</button>' +
      '<div class="spl-desc" hidden>' + esc(s.description || "") + (s.higherLevels ? '<br><b>At Higher Levels.</b> ' + esc(s.higherLevels) : "") + '</div>' +
    '</div>';
  }
  // `spells` is already filtered + sorted by the caller. opts: { selected(name),
  // disabledAdd(spell), addLabel, removeLabel, emptyHTML, pickAttr, expAttr }.
  function spellPickerHTML(spells, opts) {
    opts = opts || {};
    const o = {
      selected: opts.selected || (() => false),
      disabledAdd: opts.disabledAdd || (() => false),
      addLabel: opts.addLabel, removeLabel: opts.removeLabel,
      pickAttr: opts.pickAttr, expAttr: opts.expAttr,   // alternate data hooks (the choices module uses its own)
    };
    if (!spells || !spells.length) return opts.emptyHTML || '<p class="spl-empty">No spells match.</p>';
    const byLevel = {};
    spells.forEach((s) => { const L = s.level || 0; (byLevel[L] = byLevel[L] || []).push(s); });
    return Object.keys(byLevel).map(Number).sort((a, b) => a - b).map((L) =>
      '<div class="spl-sec"><div class="spl-sec-hd">' + spellLevelLabel(L) + '</div>' +
      byLevel[L].map((s) => spellRow(s, o)).join("") + '</div>'
    ).join("");
  }

  // ── class-table lookups ────────────────────────────────────────────────
  const tableRow = (c, level) => ((c && c.table) || []).find((r) => Number(r.level) === Number(level)) || null;
  function colAt(c, level, col) { const r = tableRow(c, level); if (!r || !r.columns) return 0; const n = parseInt(r.columns[col], 10); return isNaN(n) ? 0 : n; }
  function cantripsAt(c, level) { if (level < 1) return 0; const r = tableRow(c, level); return Math.max(colAt(c, level, "Cantrips"), r && r.cantripsKnown != null ? Number(r.cantripsKnown) : 0); }
  function preparedAt(c, level) { if (level < 1) return 0; return colAt(c, level, "Prepared Spells") || colAt(c, level, "Spells Known"); }
  // A Wizard's spellbook: 6 level-1 spells at level 1, +2 every Wizard level after.
  const WIZARD_BOOK_START = 6, WIZARD_BOOK_PER_LEVEL = 2;
  function spellbookAt(c, level) { if (!c || norm(c.name) !== "wizard" || level < 1) return 0; return WIZARD_BOOK_START + WIZARD_BOOK_PER_LEVEL * (level - 1); }

  // ── subclass spellcasting (Eldritch Knight / Arcane Trickster) ─────────
  // A subclass object may carry spellcasting:"third" (+ spellcastingAbility, spellList);
  // the character then casts as a third-caster from the subclass level, using the 2024
  // third-caster table below (cantrips 2 at 3 / 3 at 10; prepared 3 at 3 then +1 at
  // 4,7,8,10,11,13,14,16,19,20).
  const THIRD_PREPARED = [0,0,3,4,4,4,5,6,6,7,8,8,9,10,10,11,11,11,12,13];
  const THIRD_CANTRIPS = [0,0,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3];
  function subclassOf(c, subName) { return (c && subName) ? ((c.subclasses || []).find((s) => norm(s.name) === norm(subName)) || null) : null; }
  // { type, ability, list, level } when the subclass casts on its own, else null.
  function subclassCasting(c, subName) {
    const sub = subclassOf(c, subName);
    if (!sub || !sub.spellcasting || sub.spellcasting === "none") return null;
    return { type: sub.spellcasting, ability: sub.spellcastingAbility || "INT", list: sub.spellList || "Wizard", level: c.subclassLevel || 3 };
  }
  // Casting profile for a class entry {cls, subclass, level}: the class's own casting,
  // else its subclass's. { type, ability, list, cantrips(L), prepared(L), maxLevel(L) } or null.
  function castingFor(c, subName) {
    if (isCasterClass(c)) return { type: c.spellcasting, ability: c.spellcastingAbility || "INT", list: c.name, source: "class",
      cantrips: (L) => cantripsAt(c, L), prepared: (L) => preparedAt(c, L), maxLevel: (L) => maxSpellLevelSingle(c, L) };
    const sc = subclassCasting(c, subName); if (!sc) return null;
    const T = TABLES();
    return { type: sc.type, ability: sc.ability, list: sc.list, source: "subclass",
      cantrips: (L) => L >= sc.level ? (THIRD_CANTRIPS[L-1] || 0) : 0,
      prepared: (L) => L >= sc.level ? (THIRD_PREPARED[L-1] || 0) : 0,
      maxLevel: (L) => { if (L < sc.level || !T) return 0; const arr = (T.thirdCasterSlots || [])[L-1] || []; let m = 0; arr.forEach((n, i) => { if (n > 0) m = i+1; }); return m; } };
  }
  const isCasterEntry = (c, subName) => !!castingFor(c, subName);

  // Highest spell level a single class of the given level can cast.
  function maxSpellLevelSingle(c, level) {
    const T = TABLES(); if (!c || !T) return 0;
    if (c.spellcasting === "pact") { const r = (T.pactMagic || [])[level-1]; return r ? r.level : 1; }
    const map = { full:"fullCasterSlots", half:"halfCasterSlots", third:"thirdCasterSlots", artificer:"artificerSlots" };
    const arr = (T[map[c.spellcasting]] || [])[level-1] || []; let m = 0; arr.forEach((n, i) => { if (n > 0) m = i+1; });
    if (m < 1 && preparedAt(c, level) > 0) m = 1;
    return m;
  }
  // ── multiclass prerequisites (2024: 13+ in the listed abilities) ─────────
  // "any" = at least one of them; "all" = every one.
  const MC_PREREQ = { barbarian:{all:["STR"]}, bard:{all:["CHA"]}, cleric:{all:["WIS"]}, druid:{all:["WIS"]}, fighter:{any:["STR","DEX"]}, monk:{all:["DEX","WIS"]}, paladin:{all:["STR","CHA"]}, ranger:{all:["DEX","WIS"]}, rogue:{all:["DEX"]}, sorcerer:{all:["CHA"]}, warlock:{all:["CHA"]}, wizard:{all:["INT"]}, artificer:{all:["INT"]} };
  // { text:"Strength 13 or Dexterity 13", met:true|false } for the class against the scores.
  function multiclassPrereq(className, scores) {
    const p = MC_PREREQ[norm(className)]; if (!p) return { text: "", met: true };
    const names = { STR:"Strength", DEX:"Dexterity", CON:"Constitution", INT:"Intelligence", WIS:"Wisdom", CHA:"Charisma" };
    const list = p.any || p.all, ok = (a) => num((scores || {})[a]) >= 13;
    const met = p.any ? list.some(ok) : list.every(ok);
    return { text: list.map((a) => names[a] + " 13").join(p.any ? " or " : " and "), met };
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
    const all = (classLevels || []).map((cl) => ({ cl, c: classByName(cl.cls) })).filter((x) => x.c && isCasterClass(x.c));
    const nonPact = all.filter((x) => x.c.spellcasting !== "pact");
    // All casters are Pact Magic (e.g. a pure Warlock): use the highest single Pact level,
    // not the combined full-caster table (which would return 0 and hide every leveled spell).
    if (nonPact.length === 0) { let m = 0; all.forEach((x) => { m = Math.max(m, maxSpellLevelSingle(x.c, num(x.cl.level))); }); return m; }
    if (nonPact.length === 1) return maxSpellLevelSingle(nonPact[0].c, num(nonPact[0].cl.level));
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
    num, norm, esc, classByName, isCasterClass, spellListName, spellInList, listsFor, spellInLists,
    ASI_LEVELS, ASI_DEFAULT, grantsASI, asiLevelsUpTo,
    shortCastTime, spellDmgStr, spellTags, spellLevelLabel, spellRow, spellPickerHTML,
    tableRow, colAt, cantripsAt, preparedAt, spellbookAt,
    subclassOf, subclassCasting, castingFor, isCasterEntry, multiclassPrereq,
    maxSpellLevelSingle, combinedCasterLevel, maxSpellLevelMulti, profBonus, featEffects,
  };
})();
