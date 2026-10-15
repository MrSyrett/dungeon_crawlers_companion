/* Shared D&D 2024 "choices within choices" + detail panels (window.DNDCH).
   Used by the character builder (dnd-sheet-builder.js), the level-up wizard
   (dnd-levelup.js) and the sheet itself (dnd_character_sheet.html).

   • Sub-choices: a feat or species trait that says "of your choice" exposes a
     list of choice SPECS; the wizards render them inline, the player's picks
     live in a small STATE object ({ key: value | [values] }), and effects()
     turns the picks into concrete sheet changes (ability +1, skill/save
     proficiency, expertise, granted spells, proficiency text).
   • Detail panels: richer, mechanics-first HTML for a class / subclass /
     species / lineage / background / feat so players can compare options.
   Pure helpers (no DOM state); reads the window.DND_* data globals at call time. */
(function () {
  "use strict";
  if (typeof window === "undefined") return;
  const norm = (s) => String(s == null ? "" : s).trim().toLowerCase();
  const esc = (s) => String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  const ABIL = ["STR","DEX","CON","INT","WIS","CHA"];
  const ABIL_NAME = { STR:"Strength", DEX:"Dexterity", CON:"Constitution", INT:"Intelligence", WIS:"Wisdom", CHA:"Charisma" };
  const D = {
    feats: () => window.DND_FEATS || [], spells: () => window.DND_SPELLS || [],
    skills: () => window.DND_SKILLS || [], weapons: () => window.DND_WEAPONS || [],
    classes: () => window.DND_CLASSES || [], species: () => window.DND_SPECIES || [],
  };
  const ARTISAN_TOOLS = ["Alchemist's Supplies","Brewer's Supplies","Calligrapher's Supplies","Carpenter's Tools","Cartographer's Tools","Cobbler's Tools","Cook's Utensils","Glassblower's Tools","Jeweler's Tools","Leatherworker's Tools","Mason's Tools","Painter's Supplies","Potter's Tools","Smith's Tools","Tinker's Tools","Weaver's Tools","Woodcarver's Tools"];
  const OTHER_TOOLS = ["Disguise Kit","Forgery Kit","Herbalism Kit","Navigator's Tools","Poisoner's Kit","Thieves' Tools","Gaming Set","Musical Instrument"];
  const INSTRUMENTS = ["Bagpipes","Drum","Dulcimer","Flute","Horn","Lute","Lyre","Pan Flute","Shawm","Viol"];
  const LIST_ABILITY = { cleric:"WIS", druid:"WIS", wizard:"INT" };
  const skillNames = () => D.skills().map((s) => s.name);
  const martialWeapons = () => D.weapons().filter((w) => /martial/i.test(w.category || "")).map((w) => w.name);
  const opt = (v, desc) => ({ v, label: v, desc: desc || "" });
  const abilOpts = (list) => (list || ABIL).map((a) => ({ v: a, label: ABIL_NAME[a] || a }));

  // "Magic Initiate (Cleric)" → { feat: <Magic Initiate data>, name:"Magic Initiate", preset:"Cleric" }
  function featBase(name) {
    const raw = String(name || "").trim();
    let f = D.feats().find((x) => norm(x.name) === norm(raw));
    let preset = "";
    if (!f) { const m = raw.match(/^(.+?)\s*\((.+)\)$/); if (m) { f = D.feats().find((x) => norm(x.name) === norm(m[1])); preset = m[2].trim(); } }
    return { feat: f || null, name: f ? f.name : raw, preset };
  }

  // ── spec builders ──────────────────────────────────────────────────────
  // kinds: abil (one ability +1) · pick (one/many from options) · skill (N skills)
  //        expertise (N of your proficient skills) · spell (N spells by filter) · feat (an Origin feat → its own specs)
  const S = {
    abil: (key, opts, label) => ({ key, kind:"abil", label: label || "Ability Score +1", count:1, options: abilOpts(opts) }),
    pick: (key, label, options, count, hint, trait) => ({ key, kind:"pick", label, count: count || 1, options: options.map((o) => typeof o === "string" ? opt(o) : o), hint: hint || "", trait: trait || "" }),
    skill: (key, label, count, from, hint, trait) => ({ key, kind:"skill", label, count: count || 1, from: from || null, hint: hint || "", trait: trait || "" }),
    expertise: (key, label, count) => ({ key, kind:"expertise", label, count: count || 1 }),
    spell: (key, label, count, filter, hint) => ({ key, kind:"spell", label, count: count || 1, filter: filter || {}, hint: hint || "" }),
    feat: (key, label, category, trait) => ({ key, kind:"feat", label, count:1, category: category || "Origin", trait: trait || "" }),
  };
  const DMG_TYPES = ["Acid","Cold","Fire","Lightning","Thunder"];
  const ALL_DMG = ["Acid","Cold","Fire","Lightning","Necrotic","Poison","Psychic","Radiant","Thunder"];
  const SPELL_LISTS = ["Cleric","Druid","Wizard"];

  // Per-feat extra choices beyond the generic "+1 to one of …". `preset` is the
  // parenthetical from a background ("Magic Initiate (Cleric)") and fixes the list.
  // Each entry may also declare fixed `grants` (spells the feat always gives).
  const FEAT_RULES = {
    "Magic Initiate": (p, state) => {
      const list = p.preset || state.list;
      const specs = [];
      if (!p.preset) specs.push(S.pick("list", "Spell list", SPELL_LISTS, 1, "That list's ability (Cleric/Druid: Wisdom, Wizard: Intelligence) is your spellcasting ability for these spells."));
      if (list) {
        specs.push(S.spell("cantrips", "Cantrips from the " + list + " list", 2, { levels:[0], lists:[list] }));
        specs.push(S.spell("spell", "Level 1 spell from the " + list + " list (always prepared; one free cast per Long Rest)", 1, { levels:[1], lists:[list] }));
      }
      return specs;
    },
    "Skilled": () => [S.skill("skills", "Skill or tool proficiencies", 3, null, "Any combination of three skills or tools.")],
    "Skill Expert": () => [S.skill("skill", "Skill proficiency", 1), S.expertise("expertise", "Expertise in a skill you're proficient with", 1)],
    "Resilient": () => [],   // the ability pick doubles as the saving-throw proficiency
    "Elemental Adept": () => [S.pick("dmg", "Damage type", DMG_TYPES)],
    "Weapon Master": () => [S.pick("weapons", "Martial weapon proficiencies", martialWeapons(), 2)],
    "Musician": () => [S.pick("instruments", "Musical instrument proficiencies", INSTRUMENTS, 3)],
    "Crafter": () => [S.pick("tools", "Artisan's Tools proficiencies", ARTISAN_TOOLS, 3)],
    "Fey Touched": () => [S.spell("spell", "Level 1 Divination or Enchantment spell", 1, { levels:[1], schools:["Divination","Enchantment"] })],
    "Shadow-Touched": () => [S.spell("spell", "Level 1 Illusion or Necromancy spell", 1, { levels:[1], schools:["Illusion","Necromancy"] })],
    "Ritual Caster": () => [S.spell("spells", "Level 1 Ritual spells for your ritual book", 2, { levels:[1], ritual:true, lists:SPELL_LISTS })],
    "Boon of Skill": () => [S.expertise("expertise", "Expertise", 2)],
    "Boon of Energy Resistance": () => [S.pick("dmg", "Resistances", ALL_DMG, 2)],
    "Observant": () => [S.skill("skill", "Skill proficiency", 1, ["Insight","Investigation","Perception"])],
    "Arcane Artist": () => [S.pick("abilityUse", "Spellcasting ability for Minor Illusion", abilOpts(["INT","WIS","CHA"]))],
    "Familiar Friend": () => [S.pick("abilityUse", "Spellcasting ability for Find Familiar", abilOpts(["INT","WIS","CHA"]))],
    "Magic Connoisseur": () => [S.pick("list", "Same list as your Magic Initiate feat", SPELL_LISTS)].concat([]),
  };
  const FEAT_GRANTS = {
    "Fey Touched": ["Misty Step"], "Shadow-Touched": ["Invisibility"], "Telekinetic": ["Mage Hand"],
    "Telepathic": ["Detect Thoughts"], "Arcane Artist": ["Minor Illusion"], "Familiar Friend": ["Find Familiar"],
  };
  function featSpecs(name, state) {
    state = state || {};
    const p = featBase(name); if (!p.feat) return [];
    const f = p.feat, specs = [];
    const abils = f.abilityScores || [];
    if (abils.length > 1) specs.push(S.abil("abil", abils, f.name === "Resilient" ? "Ability Score +1 (and saving-throw proficiency in it)" : "Ability Score +1"));
    const extra = FEAT_RULES[f.name]; if (extra) extra(p, state).forEach((s) => specs.push(s));
    if (f.name === "Magic Connoisseur" && state.list) {
      specs.push(S.spell("spell1", "Level 1 spell from the " + state.list + " list", 1, { levels:[1], lists:[state.list] }));
      specs.push(S.spell("spell2", "Level 2 spell from the " + state.list + " list", 1, { levels:[2], lists:[state.list] }));
    }
    return specs;
  }
  // Choices a species / lineage asks for. `state` is needed because Human's
  // Versatile feat expands into that feat's own specs (keys prefixed "feat.").
  const SPECIES_RULES = {
    "Human": () => [S.skill("skill", "Skillful — skill proficiency", 1, null, "", "Skillful"), S.feat("feat", "Versatile — Origin feat", "Origin", "Versatile")],
    "Elf": () => [S.skill("skill", "Keen Senses — skill proficiency", 1, ["Insight","Perception","Survival"], "", "Keen Senses"), S.pick("castAbil", "Elven Lineage — spellcasting ability", abilOpts(["INT","WIS","CHA"]), 1, "", "Elven Lineage")],
    "Gnome": () => [S.pick("castAbil", "Gnomish Lineage — spellcasting ability", abilOpts(["INT","WIS","CHA"]), 1, "", "Gnomish Lineage")],
    "Tiefling": () => [S.pick("castAbil", "Fiendish Legacy — spellcasting ability", abilOpts(["INT","WIS","CHA"]), 1, "", "Fiendish Legacy")],
    "Dragonborn": () => [S.pick("ancestry", "Draconic Ancestry", [opt("Black","Acid"),opt("Blue","Lightning"),opt("Brass","Fire"),opt("Bronze","Lightning"),opt("Copper","Acid"),opt("Gold","Fire"),opt("Green","Poison"),opt("Red","Fire"),opt("Silver","Cold"),opt("White","Cold")], 1, "Sets your Breath Weapon damage type and your Damage Resistance.", "Draconic Ancestry")],
    "Goliath": () => [S.pick("ancestry", "Giant Ancestry", [opt("Cloud's Jaunt","Bonus Action: teleport 30 ft."),opt("Fire's Burn","Extra 1d10 Fire damage on a hit."),opt("Frost's Chill","Extra 1d6 Cold damage on a hit and reduce the target's Speed by 10 ft."),opt("Hill's Tumble","Knock a Large-or-smaller creature Prone on a hit."),opt("Stone's Endurance","Reaction: reduce damage by 1d12 + CON mod."),opt("Storm's Thunder","Reaction: 1d8 Thunder damage to a creature that hit you.")], 1, "Uses per Long Rest equal your proficiency bonus.", "Giant Ancestry")],
    "Aasimar": (ctx) => (ctx && ctx.level >= 3) ? [S.pick("revelation", "Celestial Revelation — form", [opt("Heavenly Wings","Fly Speed equal to your Speed; extra Radiant damage."),opt("Inner Radiance","Shed light; Radiant damage to creatures that end their turn near you."),opt("Necrotic Shroud","Frighten nearby creatures; extra Necrotic damage.")], 1, "", "Celestial Revelation")] : [],
    "Changeling": () => [S.skill("skills", "Changeling Instincts — skill proficiencies", 2, ["Deception","Insight","Intimidation","Performance","Persuasion"], "", "Changeling Instincts")],
    "Shifter": () => [S.skill("skill", "Bestial Instincts — skill proficiency", 1, ["Acrobatics","Athletics","Intimidation","Survival"], "", "Bestial Instincts")],
    "Warforged": () => [S.skill("skill", "Specialized Design — skill proficiency", 1, null, "", "Specialized Design"), S.pick("tool", "Specialized Design — tool proficiency", ARTISAN_TOOLS.concat(OTHER_TOOLS), 1, "", "Specialized Design")],
    "Khoravar": () => [S.skill("skill", "Skill Versatility — skill or tool proficiency", 1, null, "You can swap it after a Long Rest.", "Skill Versatility"), S.pick("castAbil", "Fey Gift — spellcasting ability", abilOpts(["INT","WIS","CHA"]), 1, "", "Fey Gift")],
  };
  function speciesSpecs(speciesName, lineage, ctx, state) {
    state = state || {};
    const sp = D.species().find((x) => norm(x.name) === norm(speciesName)); if (!sp) return [];
    const rule = SPECIES_RULES[sp.name]; let specs = rule ? rule(ctx || {}) : [];
    // expand a chosen feat (Human Versatile) into its own specs
    specs.slice().forEach((s) => { if (s.kind === "feat" && state[s.key]) featSpecs(state[s.key], subState(state, s.key)).forEach((fs) => specs.push(Object.assign({}, fs, { key: s.key + "." + fs.key, parentFeat: state[s.key], trait: s.trait }))); });
    return specs;
  }
  // The nested state object for a feat chosen inside a species choice.
  function subState(state, key) { const out = {}; Object.keys(state).forEach((k) => { if (k.indexOf(key + ".") === 0) out[k.slice(key.length + 1)] = state[k]; }); return out; }

  // ── options for a spec (resolved against data + context) ───────────────
  // ctx: { prof: [skill names already proficient], level, allowSrc(x) }
  function specOptions(spec, ctx) {
    ctx = ctx || {};
    const prof = ctx.prof || [];
    if (spec.kind === "abil" || spec.kind === "pick") return spec.options || [];
    if (spec.kind === "skill") {
      const from = spec.from || skillNames().concat(/tool/i.test(spec.label) ? ARTISAN_TOOLS.concat(OTHER_TOOLS) : []);
      return from.map((n) => ({ v: n, label: n, taken: prof.some((p) => norm(p) === norm(n)) }));
    }
    if (spec.kind === "expertise") return prof.map((n) => ({ v: n, label: n }));
    if (spec.kind === "feat") return D.feats().filter((f) => (f.category || "") === spec.category && (!ctx.allowSrc || ctx.allowSrc(f))).map((f) => ({ v: f.name, label: f.name }));
    if (spec.kind === "spell") return spellsFor(spec.filter, ctx);
    return [];
  }
  function spellsFor(filter, ctx) {
    const f = filter || {}, lists = (f.lists || []).map(norm), schools = (f.schools || []).map(norm);
    const inList = (s) => !lists.length || lists.some((l) => (window.DNDCALC && window.DNDCALC.spellInList) ? window.DNDCALC.spellInList(s, l) : (s.classes || []).some((c) => norm(c) === l));
    return D.spells().filter((s) => (!f.levels || f.levels.includes(s.level)) && inList(s) && (!schools.length || schools.includes(norm(s.school))) && (!f.ritual || s.ritual) && (!ctx || !ctx.allowSrc || ctx.allowSrc(s)))
      .sort((a, b) => (a.level - b.level) || a.name.localeCompare(b.name));
  }
  const vals = (state, key) => { const v = state[key]; return v == null || v === "" ? [] : (Array.isArray(v) ? v : [v]); };
  function complete(specs, state) {
    state = state || {};
    return specs.every((s) => vals(state, s.key).length >= (s.count || 1));
  }

  // ── rendering ──────────────────────────────────────────────────────────
  // Renders one block of choice controls. `root` names the state object the
  // wiring will mutate (e.g. "feat:Magic Initiate (Cleric)" or "species").
  function renderChoices(specs, state, ctx, root) {
    state = state || {}; ctx = ctx || {};
    if (!specs.length) return "";
    let h = '<div class="dch" data-ch-root="' + esc(root) + '">';
    specs.forEach((spec) => {
      const picked = vals(state, spec.key), n = spec.count || 1;
      h += '<div class="dch-blk" data-max="' + n + '"><span class="m-lbl">' + esc(spec.label) + (n > 1 ? ' — choose ' + n : '') + ' <span class="dch-cnt' + (picked.length >= n ? ' ok' : '') + '">(' + picked.length + '/' + n + ')</span></span>';
      if (spec.hint) h += '<p class="m-hint" style="margin:2px 0 6px;">' + esc(spec.hint) + '</p>';
      if (spec.kind === "spell") {
        const opts = specOptions(spec, ctx);
        h += (window.DNDCALC && window.DNDCALC.spellPickerHTML) ? window.DNDCALC.spellPickerHTML(opts, {
          selected: (nm) => picked.includes(nm),
          disabledAdd: () => n > 1 && picked.length >= n,
          pickAttr: 'data-ch-sp="' + esc(spec.key) + '" data-v', expAttr: "data-ch-exp",
          emptyHTML: '<p class="spl-empty">No matching spells.</p>',
        }) : "";
      } else if (spec.kind === "feat") {
        const opts = specOptions(spec, ctx);
        h += '<select class="m-input" data-ch-sel="' + esc(spec.key) + '"><option value="">Select a feat…</option>' + opts.map((o) => '<option value="' + esc(o.v) + '"' + (picked[0] === o.v ? " selected" : "") + '>' + esc(o.label) + '</option>').join("") + '</select>';
        if (picked[0]) h += featDetail(picked[0]);
      } else {
        const opts = specOptions(spec, ctx);
        if (!opts.length) h += '<p class="m-hint">Nothing to choose from yet' + (spec.kind === "expertise" ? ' — pick your skills first.' : '.') + '</p>';
        h += '<div class="dndb-grid dch-grid">';
        opts.forEach((o) => { const on = picked.includes(o.v); const dis = !on && (o.taken || (n > 1 && picked.length >= n)); h += '<div class="dndb-card small' + (on ? " on" : "") + (dis ? " disabled" : "") + '" data-ch-opt="' + esc(spec.key) + '" data-v="' + esc(o.v) + '" title="' + esc(o.desc || "") + '"><div class="dc-title">' + esc(o.label) + (o.taken ? ' ✓' : '') + '</div>' + (o.desc ? '<div class="dc-sub dc-plain">' + esc(o.desc) + '</div>' : '') + '</div>'; });
        h += '</div>';
      }
      h += '</div>';
    });
    return h + '</div>';
  }
  // Wires every choice block under `body`. `getState(root)` returns the live
  // state object for a root; `onChange()` re-renders.
  function wireChoices(body, getState, onChange) {
    const stateFor = (el) => { const r = el.closest("[data-ch-root]"); return r ? getState(r.getAttribute("data-ch-root")) : null; };
    const specFor = (el) => el.getAttribute("data-ch-opt") || el.getAttribute("data-ch-sp") || el.getAttribute("data-ch-sel");
    const toggle = (st, key, v, max) => {
      const cur = vals(st, key);
      const i = cur.indexOf(v);
      if (max <= 1) { st[key] = (i >= 0) ? "" : v; }   // single pick: click to choose, click again to clear
      else { if (i >= 0) cur.splice(i, 1); else { if (cur.length >= max) return false; cur.push(v); } st[key] = cur; }
      // invalidate dependent picks (e.g. a new spell list clears the spells; a new feat clears its sub-picks)
      if (key === "list") Object.keys(st).forEach((k) => { if (k !== "list" && /spell|cantrip/.test(k)) delete st[k]; });
      Object.keys(st).forEach((k) => { if (k.indexOf(key + ".") === 0) delete st[k]; });
      return true;
    };
    const maxOf = (el) => { const blk = el.closest(".dch-blk"); return blk ? (parseInt(blk.getAttribute("data-max"), 10) || 1) : 1; };
    body.querySelectorAll("[data-ch-opt]").forEach((el) => el.addEventListener("click", () => {
      if (el.classList.contains("disabled") && !el.classList.contains("on")) return;
      const st = stateFor(el); if (!st) return;
      if (toggle(st, specFor(el), el.getAttribute("data-v"), maxOf(el))) onChange();
    }));
    body.querySelectorAll("[data-ch-sp]").forEach((el) => el.addEventListener("click", () => {
      if (el.disabled) return;
      const st = stateFor(el); if (!st) return;
      if (toggle(st, specFor(el), el.getAttribute("data-v"), maxOf(el))) onChange();
    }));
    body.querySelectorAll("[data-ch-sel]").forEach((el) => el.addEventListener("change", () => {
      const st = stateFor(el); if (!st) return; const key = specFor(el);
      Object.keys(st).forEach((k) => { if (k.indexOf(key + ".") === 0) delete st[k]; });
      st[key] = el.value; onChange();
    }));
    body.querySelectorAll("[data-ch-exp]").forEach((el) => el.addEventListener("click", (e) => { e.stopPropagation(); const row = el.closest("[data-sp]"); if (row) { row.classList.toggle("open"); const d = row.querySelector(".spl-desc"); if (d) d.hidden = !row.classList.contains("open"); } }));
  }

  // ── effects + summaries ────────────────────────────────────────────────
  // { abil:{STR:1}, skills:[], expertise:[], saves:[], spells:[{name, ability, source}], profs:[text], picks:[{label, value}] }
  function effects(specs, state, opts) {
    state = state || {}; opts = opts || {};
    const out = { abil:{}, skills:[], expertise:[], saves:[], spells:[], profs:[], picks:[] };
    const source = opts.source || "";
    // spellcasting ability for feat spells: Magic Initiate → the list's ability;
    // otherwise the ability the feat raised, else the generic castAbil pick.
    const list = state.list || opts.preset || "";
    const abilPick = state.abil || "";
    const castAbil = state.castAbil || state.abilityUse || (list ? LIST_ABILITY[norm(list)] : "") || abilPick || "";
    specs.forEach((spec) => {
      const v = vals(state, spec.key); if (!v.length) return;
      if (spec.kind === "abil") { out.abil[v[0]] = (out.abil[v[0]] || 0) + 1; if (/saving-throw/i.test(spec.label)) out.saves.push(v[0]); }
      else if (spec.kind === "skill") v.forEach((n) => { if (skillNames().some((s) => norm(s) === norm(n))) out.skills.push(n); else out.profs.push(n); });
      else if (spec.kind === "expertise") v.forEach((n) => out.expertise.push(n));
      else if (spec.kind === "spell") v.forEach((n) => out.spells.push({ name: n, ability: castAbil, source }));
      else if (spec.kind === "pick") {
        if (/weapon|tool|instrument/i.test(spec.label)) v.forEach((n) => out.profs.push(n));
        else out.picks.push({ label: spec.label, value: v.join(", ") });
      }
      else if (spec.kind === "feat") out.picks.push({ label: spec.label, value: v[0] });
    });
    // fixed grants (Fey Touched → Misty Step, …)
    (opts.grants || []).forEach((n) => out.spells.push({ name: n, ability: castAbil, source }));
    return out;
  }
  // Short human summary of the picks, e.g. "Spell list: Cleric · Cantrips: Guidance, Light · +1 WIS".
  function summary(specs, state, filterTrait) {
    state = state || {};
    const bits = [];
    specs.forEach((spec) => {
      if (filterTrait && spec.trait !== filterTrait) return;
      const v = vals(state, spec.key); if (!v.length) return;
      if (spec.kind === "abil") bits.push("+1 " + (ABIL_NAME[v[0]] || v[0]));
      else bits.push(spec.label.replace(/\s*—.*$/, "").replace(/\s*\(.*\)$/, "") + ": " + v.join(", "));
    });
    return bits.join(" · ");
  }
  // Everything a feat (by stored name) contributes given its saved state.
  function featEffects(name, state) {
    const p = featBase(name); const specs = featSpecs(name, state);
    const out = effects(specs, state, { source: p.name, preset: p.preset, grants: FEAT_GRANTS[p.name] || [] });
    // A feat that raises exactly one named ability (Durable → CON, Keen Mind → INT) needs no pick.
    const abils = p.feat ? (p.feat.abilityScores || []) : [];
    if (abils.length === 1) out.abil[abils[0]] = (out.abil[abils[0]] || 0) + 1;
    return out;
  }
  function speciesEffects(speciesName, lineage, ctx, state) {
    const specs = speciesSpecs(speciesName, lineage, ctx, state);
    const out = effects(specs.filter((s) => !s.parentFeat), state, { source: speciesName });
    // nested Human feat
    specs.filter((s) => s.kind === "feat" && state[s.key]).forEach((s) => {
      const fe = featEffects(state[s.key], subState(state, s.key));
      merge(out, fe);
    });
    return out;
  }
  function merge(a, b) { Object.keys(b.abil).forEach((k) => a.abil[k] = (a.abil[k] || 0) + b.abil[k]); ["skills","expertise","saves","spells","profs","picks"].forEach((k) => a[k] = a[k].concat(b[k])); return a; }
  // Spells granted by every stored choice set. store = { "feat:<name>": state, "species": state }
  function grantedSpells(store, speciesName, lineage, ctx) {
    const out = [];
    Object.keys(store || {}).forEach((k) => {
      if (k.indexOf("feat:") === 0) featEffects(k.slice(5), store[k]).spells.forEach((s) => out.push(s));
      else if (k === "species" && speciesName) speciesEffects(speciesName, lineage, ctx, store[k]).spells.forEach((s) => out.push(s));
    });
    return out;
  }
  // Summary for a stored root, optionally limited to one species trait.
  function storedSummary(store, key, speciesName, lineage, ctx, trait) {
    const st = (store || {})[key]; if (!st) return "";
    if (key.indexOf("feat:") === 0) return summary(featSpecs(key.slice(5), st), st);
    if (key === "species") {
      const specs = speciesSpecs(speciesName, lineage, ctx, st);
      const top = summary(specs.filter((s) => !s.parentFeat), st, trait);
      const nested = specs.filter((s) => s.kind === "feat" && st[s.key] && (!trait || s.trait === trait)).map((s) => summary(featSpecs(st[s.key], subState(st, s.key)), subState(st, s.key))).filter(Boolean).join(" · ");
      return [top, nested].filter(Boolean).join(" · ");
    }
    return "";
  }

  // ── detail panels ──────────────────────────────────────────────────────
  const row = (label, val) => val ? '<div class="dtl-row"><span class="dtl-k">' + esc(label) + '</span><span class="dtl-v">' + val + '</span></div>' : "";
  const featList = (feats) => feats.map((f) => '<div class="dtl-feat"><b>' + esc(f.name) + (f.level ? ' <small>(level ' + f.level + ')</small>' : '') + '.</b> ' + esc(f.description || "") + '</div>').join("");
  function featDetail(name) {
    const p = featBase(name); if (!p.feat) return "";
    const f = p.feat;
    let h = '<div class="dtl dtl-feat-box"><div class="dtl-ttl">' + esc(f.name) + (p.preset ? ' (' + esc(p.preset) + ')' : '') + ' <small>' + esc(f.category || "") + ' feat' + (f.prerequisite ? ' · ' + esc(f.prerequisite) : '') + (f.repeatable ? ' · repeatable' : '') + '</small></div>';
    (f.benefits || []).forEach((b) => { const m = String(b).match(/^([^:]{2,40}):\s*(.*)$/); h += '<div class="dtl-ben">' + (m ? '<b>' + esc(m[1]) + '.</b> ' + esc(m[2]) : esc(b)) + '</div>'; });
    if (f.description) h += '<div class="dtl-ben">' + esc(f.description) + '</div>';
    return h + '</div>';
  }
  function classDetail(c, level) {
    if (!c) return "";
    level = level || 1;
    const pr = c.proficiencies || {};
    let h = '<div class="dtl"><div class="dtl-ttl">' + esc(c.name) + '</div>';
    if (c.flavor) h += '<div class="dtl-flavor">' + esc(c.flavor) + '</div>';
    h += row("Hit Die", "d" + c.hitDie + " <small>(" + c.hitDie + " + CON at level 1, then " + (Math.floor(c.hitDie/2)+1) + " + CON per level)</small>");
    h += row("Primary ability", esc((c.primaryAbility || []).join(" / ")));
    h += row("Saving throws", esc((c.savingThrows || []).join(", ")));
    h += row("Armor", esc((pr.armor || []).join(", ") || "None"));
    h += row("Weapons", esc((pr.weapons || []).join(", ") || "None"));
    if (pr.tools && pr.tools.length) h += row("Tools", esc(pr.tools.join(", ")));
    h += row("Skills", "Choose " + (pr.skillsChoose || 2) + " from " + esc((pr.skillsFrom && pr.skillsFrom.length ? pr.skillsFrom : ["any skill"]).join(", ")));
    if (c.spellcasting && c.spellcasting !== "none") h += row("Spellcasting", esc(c.spellcasting === "pact" ? "Pact Magic" : c.spellcasting === "full" ? "Full caster" : c.spellcasting === "half" ? "Half caster" : c.spellcasting === "third" ? "Third caster" : c.spellcasting) + (c.spellcastingAbility ? " · " + esc(c.spellcastingAbility) : ""));
    h += row("Subclass", esc(c.subclassLabel || "Subclass") + " at level " + (c.subclassLevel || 3));
    const feats = (c.features || []).filter((f) => !f.subclass && f.level <= level);
    if (feats.length) h += '<div class="dtl-sec">Features through level ' + level + '</div>' + featList(feats);
    return h + '</div>';
  }
  function subclassDetail(c, sub, level) {
    if (!sub) return "";
    let h = '<div class="dtl"><div class="dtl-ttl">' + esc(sub.name) + ' <small>' + esc(c ? c.name : "") + ' ' + esc(c ? (c.subclassLabel || "subclass") : "") + '</small></div>';
    if (sub.flavor) h += '<div class="dtl-flavor">' + esc(sub.flavor) + '</div>';
    const all = (sub.features || []).slice().sort((a, b) => a.level - b.level);
    const now = all.filter((f) => f.level <= (level || 20)), later = all.filter((f) => f.level > (level || 20));
    if (now.length) h += '<div class="dtl-sec">' + (level ? 'Features through level ' + level : 'Features') + '</div>' + featList(now);
    if (later.length) h += '<div class="dtl-sec">Later features</div><div class="dtl-later">' + later.map((f) => esc(f.name) + ' (' + f.level + ')').join(" · ") + '</div>';
    return h + '</div>';
  }
  function speciesDetail(sp, lineageName) {
    if (!sp) return "";
    let h = '<div class="dtl"><div class="dtl-ttl">' + esc(sp.name) + '</div>';
    if (sp.flavor) h += '<div class="dtl-flavor">' + esc(sp.flavor) + '</div>';
    h += row("Size", esc([].concat(sp.size || []).join(" or "))) + row("Speed", sp.speed + " ft.") + row("Darkvision", sp.darkvision ? sp.darkvision + " ft." : "") + row("Type", esc(sp.creatureType || ""));
    if ((sp.traits || []).length) h += '<div class="dtl-sec">Traits</div>' + featList(sp.traits);
    const ln = (sp.lineages || []).find((l) => norm(l.name) === norm(lineageName));
    if (ln) h += '<div class="dtl-sec">' + esc(ln.name) + '</div>' + featList(ln.traits || []);
    return h + '</div>';
  }
  function lineageDetail(sp, ln) {
    if (!sp || !ln) return "";
    return '<div class="dtl"><div class="dtl-ttl">' + esc(ln.name) + ' <small>' + esc(sp.name) + ' lineage</small></div>' + featList(ln.traits || []) + '</div>';
  }
  function backgroundDetail(b) {
    if (!b) return "";
    let h = '<div class="dtl"><div class="dtl-ttl">' + esc(b.name) + '</div>';
    if (b.description) h += '<div class="dtl-flavor">' + esc(b.description) + '</div>';
    h += row("Ability scores", esc((b.abilityScores || []).map((a) => ABIL_NAME[a] || a).join(", ")) + " <small>(+2 to one and +1 to another, or +1 to all three)</small>");
    h += row("Skills", esc((b.skillProficiencies || []).join(", ")));
    h += row("Tool", esc((b.toolProficiencies || []).join(", ")));
    h += row("Equipment", esc((b.equipment || []).join(" — ")));
    h += row("Origin feat", esc(b.feat));
    h += featDetail(b.feat);
    return h + '</div>';
  }

  const CSS =
    ".dtl{font-size:12px;color:#cdc3b6;line-height:1.5;margin-top:8px;border-left:3px solid #9b1b22;padding:4px 0 4px 10px;}" +
    ".dtl-ttl{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:15px;color:#f0e0d6;letter-spacing:.02em;}" +
    ".dtl-ttl small,.dtl-feat small{font-weight:600;font-size:11px;color:#a99e90;letter-spacing:.04em;text-transform:uppercase;margin-left:4px;}" +
    ".dtl-flavor{font-style:italic;color:#a99e90;margin:2px 0 6px;}" +
    ".dtl-row{display:flex;gap:8px;line-height:1.45;}.dtl-k{flex:0 0 108px;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#8ad4ff;padding-top:2px;}.dtl-v{flex:1;}.dtl-v small{color:#a99e90;}" +
    ".dtl-sec{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#ec4456;margin:8px 0 2px;border-bottom:1px solid #332c2c;padding-bottom:2px;}" +
    ".dtl-feat{margin:3px 0;}.dtl-feat b{color:#f0e0d6;}.dtl-later{color:#a99e90;}" +
    ".dtl-feat-box{margin-top:6px;border-left-color:#5a3f7a;}.dtl-ben{margin:3px 0;}.dtl-ben b{color:#f0e0d6;}" +
    ".dch{margin-top:8px;border:1px dashed #5a3f7a;border-radius:6px;padding:4px 10px 8px;background:#1d1824;}" +
    ".dch-blk{margin-bottom:4px;}.dch-cnt{color:#e08a70;font-weight:700;}.dch-cnt.ok{color:#7fc97f;}" +
    ".dch-grid{grid-template-columns:repeat(auto-fill,minmax(130px,1fr));}";
  if (typeof document !== "undefined") { const s = document.createElement("style"); s.textContent = CSS; document.head.appendChild(s); }

  window.DNDCH = {
    ABIL, ABIL_NAME, featBase, featSpecs, speciesSpecs, specOptions, spellsFor, complete,
    renderChoices, wireChoices, effects, summary, featEffects, speciesEffects, grantedSpells, storedSummary, subState,
    featDetail, classDetail, subclassDetail, speciesDetail, lineageDetail, backgroundDetail,
    FEAT_GRANTS, ARTISAN_TOOLS, INSTRUMENTS,
  };
})();
