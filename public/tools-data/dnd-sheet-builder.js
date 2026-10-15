/* D&D 2024 Character Builder — window.DNDB.
   A step wizard: Class → Subclass → Species → Background → Ability Scores →
   Skills → Proficiencies → Class Choices → Advancement → Spells → Equipment →
   Review. Assembles a starting character and hands it to the sheet through
   applySheet()/saveSheet(). Uses the same window.DND_* data + the sheet's own
   .ov/.modal CSS classes. Level-gated class decisions (Fighting Style, Expertise,
   Divine Order, Invocations, Metamagic, Maneuvers, Weapon Mastery…) come from
   window.DNDCH.classChoiceSpecs, so the builder and the level-up wizard agree. */
(function () {
  "use strict";
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  const sgn = (n) => (n >= 0 ? "+" : "") + n;
  const mod = (s) => Math.floor((s - 10) / 2);
  const ABIL = ["STR","DEX","CON","INT","WIS","CHA"];
  const ABIL_NAME = { STR:"Strength", DEX:"Dexterity", CON:"Constitution", INT:"Intelligence", WIS:"Wisdom", CHA:"Charisma" };
  const ALIGNMENTS = ["Lawful Good","Neutral Good","Chaotic Good","Lawful Neutral","Neutral","Chaotic Neutral","Lawful Evil","Neutral Evil","Chaotic Evil","Unaligned"];
  const D = {
    classes: () => window.DND_CLASSES || [], species: () => window.DND_SPECIES || [],
    backgrounds: () => window.DND_BACKGROUNDS || [], skills: () => window.DND_SKILLS || [],
    feats: () => window.DND_FEATS || [], spells: () => window.DND_SPELLS || [],
    weapons: () => window.DND_WEAPONS || [], armor: () => window.DND_ARMOR || [],
    gear: () => window.DND_GEAR || [], magicItems: () => window.DND_MAGIC_ITEMS || [],
    tables: () => window.DND_TABLES || null,
  };
  const CALC = () => window.DNDCALC;
  const CH = () => window.DNDCH || null;
  // The catalog name a token resolves to (canonical), or "" if it isn't in the catalog.
  function canonRef(name){
    const names = [].concat(D.weapons(), D.armor(), D.gear(), D.magicItems()).map((x) => x.name);
    const n = String(name).trim().toLowerCase();
    let hit = names.find((x) => x.toLowerCase() === n) || names.find((x) => x.toLowerCase() === n.replace(/s$/, ""));
    if(!hit){ const s = n.replace(/\s+armor$/, ""); if(s !== n) hit = names.find((x) => x.toLowerCase() === s); }
    return hit || "";
  }
  // Turn a starting-equipment token into an inventory item {name, ref}. A ref keeps
  // it equippable even when renamed. "Arcane Focus (Quarterstaff)" → the item is a
  // Quarterstaff, shown as "Quarterstaff (Arcane Focus)".
  function resolveItem(raw){
    const t = String(raw).trim();
    const paren = t.match(/^(.+?)\s*\((.+)\)$/);
    if(paren){ const ref = canonRef(paren[2]); if(ref) return { name: ref + " (" + paren[1].trim() + ")", ref }; }
    const ref = canonRef(t);
    return ref ? { name: ref, ref } : { name: t, ref: "" };
  }
  const STEPS = ["Options","Class","Subclass","Species","Background","Abilities","Skills","Proficiencies","Choices","Advancement","Spells","Equipment","Review"];
  let st = null, step = 0;

  function fresh() {
    return { cls:"", level:1, subclass:"", species:"", lineage:"", size:"", background:"",
             method:"array", base:{ STR:8,DEX:8,CON:8,INT:8,WIS:8,CHA:8 }, arrayPick:{},
             bgMode:"21", bg2:"", bg1:"", classSkills:[], multiclass:[],
             name:"", alignment:"", eberron:true, au:true,
             classChoices:{},               // per class name → its DNDCH class-choice state (style, expertise, order, invocations…)
             advances:[],
             spChoices:{}, bgChoices:{},    // sub-choices: species traits / background Origin feat (window.DNDCH)
             tools:{}, langs:[],            // "of your choice" tool proficiencies + the two starting languages
             spellPicks:{},                 // per class name → { cantrips:[], spells:[] }
             spellsAvail:true, equipChoice:"gear", equipPkg:0, bgEquip:"gear", equipPicks:{} };
  }
  function clsData() { return D.classes().find((c) => c.name === st.cls) || null; }
  function classDataByName(n) { return D.classes().find((c) => c.name === n) || null; }
  function spData() { return D.species().find((s) => s.name === st.species) || null; }
  function bgData() { return D.backgrounds().find((b) => b.name === st.background) || null; }
  // Expansion gating: hide Eberron / Arcana Unleashed content when its box is off.
  function allowSrc(x) { return (!x || ((x.source !== "eberron" || st.eberron) && (x.source !== "arcana-unleashed" || st.au))); }
  function pruneDisallowed() {
    if (st.cls) { const c = D.classes().find((x) => x.name === st.cls); if (c && !allowSrc(c)) { st.cls = ""; st.subclass = ""; st.multiclass = []; st.classChoices = {}; st.spellPicks = {}; } }
    if (st.subclass) { const c = clsData(); const sub = c && (c.subclasses || []).find((x) => x.name === st.subclass); if (sub && !allowSrc(sub)) st.subclass = ""; }
    if (st.species) { const sp = D.species().find((x) => x.name === st.species); if (sp && !allowSrc(sp)) { st.species = ""; st.lineage = ""; } }
    if (st.background) { const b = D.backgrounds().find((x) => x.name === st.background); if (b && !allowSrc(b)) st.background = ""; }
    st.multiclass = (st.multiclass || []).filter((m) => { const c = D.classes().find((x) => x.name === m.cls); return c && allowSrc(c); });
    (st.advances || []).forEach((av) => { if (av.feat) { const f = D.feats().find((x) => x.name === av.feat); if (f && !allowSrc(f)) av.feat = ""; } });
    Object.keys(st.spellPicks || {}).forEach((k) => { const p = st.spellPicks[k]; p.spells = p.spells.filter((n) => { const sp = D.spells().find((x) => x.name === n); return !sp || allowSrc(sp); }); p.cantrips = p.cantrips.filter((n) => { const sp = D.spells().find((x) => x.name === n); return !sp || allowSrc(sp); }); });
    pruneStale();
  }
  // Multiclass: secondary classes take some of the total level; the primary keeps the rest.
  function secondaryTotal() { return (st.multiclass || []).reduce((s, m) => s + (num(m.level) || 0), 0); }
  function primaryLevel() { return Math.max(1, (num(st.level) || 1) - secondaryTotal()); }
  function classBreakdown() { return [{ cls: st.cls, subclass: st.subclass, level: primaryLevel() }].concat((st.multiclass || []).map((m) => ({ cls: m.cls, subclass: m.subclass || "", level: num(m.level) }))); }
  function num(v) { const n = parseInt(v, 10); return isNaN(n) ? 0 : n; }
  // Hit-dice pool string from the class breakdown, e.g. Fighter3/Wizard2 → "3d10 + 2d6".
  function hitDiceString() {
    const byDie = {};
    classBreakdown().forEach((cl) => { const cc = classDataByName(cl.cls); const hd = cc ? cc.hitDie : 8; byDie[hd] = (byDie[hd] || 0) + num(cl.level); });
    return Object.keys(byDie).map(Number).sort((a,b) => b-a).map((d) => byDie[d] + "d" + d).join(" + ");
  }
  // Number of ASI/feat choices earned by this build's levels (B1), summed per class.
  function asiSlots() { let n = 0; classBreakdown().forEach((cl) => { n += CALC().asiLevelsUpTo(cl.cls, cl.level).length; }); return n; }
  // Which classes get a subclass at this build's levels.
  function subclassEntries() { return classBreakdown().filter((cl) => { const c = classDataByName(cl.cls); return c && cl.level >= (c.subclassLevel || 3) && (c.subclasses || []).length; }); }
  function hasSubclass() { return subclassEntries().length > 0; }
  function setSubclass(cls, name) { if (cls === st.cls) st.subclass = name; else { const m = (st.multiclass || []).find((x) => x.cls === cls); if (m) m.subclass = name; } }

  // ── B1: keep the build consistent when the level / classes change ──────
  // Trim advancement slots, drop subclasses below their level, prune class-choice
  // picks and spell picks back to what the new levels allow.
  function pruneStale() {
    while (secondaryTotal() > num(st.level) - 1 && st.multiclass.length) st.multiclass.pop();
    const n = asiSlots(); if ((st.advances || []).length > n) st.advances.length = n;
    classBreakdown().forEach((cl) => { const c = classDataByName(cl.cls); if (c && cl.level < (c.subclassLevel || 3)) setSubclass(cl.cls, ""); });
    const names = classBreakdown().map((cl) => cl.cls);
    Object.keys(st.classChoices).forEach((k) => { if (names.indexOf(k) < 0) delete st.classChoices[k]; });
    if (CH()) classBreakdown().forEach((cl) => {
      const state = st.classChoices[cl.cls]; if (!state) return;
      const specs = classSpecsFor(cl); const keep = {};
      specs.forEach((sp) => { const v = CH().vals(state, sp.key); if (!v.length) return; keep[sp.key] = (sp.count || 1) > 1 ? v.slice(0, sp.count) : v[0]; });
      Object.keys(state).forEach((k) => delete state[k]); Object.assign(state, keep);
    });
    Object.keys(st.spellPicks).forEach((k) => { if (names.indexOf(k) < 0) delete st.spellPicks[k]; });
    casterEntries().forEach((cl) => { const p = picksFor(cl.cls); p.cantrips.length = Math.min(p.cantrips.length, cantripCountFor(cl)); p.spells.length = Math.min(p.spells.length, spellMaxFor(cl)); });
    classBreakdown().forEach((cl) => { if (!castingFor(cl) && st.spellPicks[cl.cls]) delete st.spellPicks[cl.cls]; });
  }
  function setLevel(n) { st.level = Math.max(1, Math.min(20, num(n) || 1)); pruneStale(); }

  // ── casting helpers (per class; a subclass may cast too — Eldritch Knight) ──
  function castingFor(cl) { const c = classDataByName(cl.cls); return c ? CALC().castingFor(c, cl.subclass) : null; }
  function casterEntries() { return classBreakdown().filter((cl) => !!castingFor(cl)); }
  function isCaster() { return casterEntries().length > 0; }
  function picksFor(cls) { return st.spellPicks[cls] || (st.spellPicks[cls] = { cantrips:[], spells:[] }); }
  function extraCantripsFor(cls) { const fx = classFxFor(cls); return fx ? fx.extraCantrips : 0; }
  function cantripCountFor(cl) { const cf = castingFor(cl); return cf ? cf.cantrips(cl.level) + extraCantripsFor(cl.cls) : 0; }
  function preparedFor(cl) { const cf = castingFor(cl); return cf ? cf.prepared(cl.level) : 0; }
  function isWizardEntry(cl) { return norm(cl.cls) === "wizard"; }
  // Spells to pick: a Wizard fills a spellbook (6 at level 1, +2 per level) and prepares
  // the table's count; everyone else picks exactly their prepared/known count.
  function spellMaxFor(cl) { if (isWizardEntry(cl)) return CALC().spellbookAt(classDataByName(cl.cls), cl.level); return preparedFor(cl); }
  function spellMinFor(cl) { if (isWizardEntry(cl)) return cl.level <= 1 ? spellMaxFor(cl) : Math.min(preparedFor(cl), spellMaxFor(cl)); return preparedFor(cl); }
  function maxSpellLevelFor(cl) { const cf = castingFor(cl); if (!cf) return 0; const m = cf.maxLevel(cl.level); return (m < 1 && cf.prepared(cl.level) > 0) ? 1 : m; }
  function spellInList(s, nm) { return CALC().spellInList(s, nm); }
  // The picker's spell list. "available to me" on → only this list's spells;
  // off → every class's spells in range (to browse), non-eligible ones shown but their +Add disabled.
  function spellsFor(minL, maxL, avail, list) {
    return D.spells().filter((s) => s.level >= minL && s.level <= maxL && allowSrc(s) && (avail === false ? true : spellInList(s, list)))
      .sort((a, b) => (a.level - b.level) || a.name.localeCompare(b.name));
  }

  // ── sub-choices (window.DNDCH): species traits, the background's Origin feat,
  //    every Advancement feat, tool picks, equipment picks and the level-gated
  //    class choices can each ask for further picks ───────────────────────
  function proficientSkills() { const b = bgData(); const bg = b ? (b.skillProficiencies || []) : []; const out = []; bg.concat(st.classSkills).concat(choiceEffects().skills).forEach((s) => { const r = matchSkill(s); if (r && out.indexOf(r) < 0) out.push(r); }); return out; }
  function allExpertise() { const out = []; classBreakdown().forEach((cl) => { const fx = classFxFor(cl.cls); if (fx) fx.expertise.forEach((s) => { if (out.indexOf(s) < 0) out.push(s); }); }); choiceEffects().expertise.forEach((s) => { if (out.indexOf(s) < 0) out.push(s); }); return out; }
  // Context for option lists: skills already proficient (so a feat can't re-pick
  // one, and Expertise offers only those), the build level, and expansion gating.
  function chCtx(excludeRoot) {
    const b = bgData(); const prof = [];
    const add = (n) => { const r = matchSkill(n); if (r && prof.indexOf(r) < 0) prof.push(r); };
    (b ? (b.skillProficiencies || []) : []).forEach(add); st.classSkills.forEach(add);
    // skills from OTHER choice roots count as taken; a root never blocks its own picks
    choiceRoots().forEach((r) => { if (r.root !== excludeRoot) r.fx().skills.forEach(add); });
    const expert = []; choiceRoots().forEach((r) => { if (r.root !== excludeRoot) r.fx().expertise.forEach((s) => expert.push(s)); });
    return { prof, expert, level: num(st.level), allowSrc };
  }
  function speciesSpecs() { return (CH() && st.species) ? CH().speciesSpecs(st.species, st.lineage, { level: num(st.level) }, st.spChoices) : []; }
  function bgFeatSpecs() { const b = bgData(); return (CH() && b && b.feat) ? CH().featSpecs(b.feat, st.bgChoices) : []; }
  function advFeatSpecs(av) { return (CH() && av && av.mode === "feat" && av.feat) ? CH().featSpecs(av.feat, av.choices || (av.choices = {})) : []; }
  // Weapon-proficiency tokens of every class (for Weapon Mastery eligibility / attack rows).
  function weaponTokens() { const out = []; classBreakdown().forEach((cl) => { const c = classDataByName(cl.cls); ((c && c.proficiencies && c.proficiencies.weapons) || []).forEach((t) => out.push(t)); const fx = classFxFor(cl.cls); if (fx) fx.profs.forEach((p) => String(p).split(/,\s*/).forEach((t) => out.push(t))); }); choiceEffects().profs.forEach((t) => out.push(t)); return out; }
  function armorTokens() { const out = []; classBreakdown().forEach((cl) => { const c = classDataByName(cl.cls); ((c && c.proficiencies && c.proficiencies.armor) || []).forEach((t) => out.push(t)); const fx = classFxFor(cl.cls); if (fx) fx.profs.forEach((p) => String(p).split(/,\s*/).forEach((t) => out.push(t))); }); return out; }
  function classState(cls) { return st.classChoices[cls] || (st.classChoices[cls] = {}); }
  function classSpecsFor(cl) { return CH() ? CH().classChoiceSpecs(cl.cls, cl.subclass, cl.level, { allowSrc, weaponTokens: safeWeaponTokens(), level: num(st.level) }, classState(cl.cls)) : []; }
  // weaponTokens() reads class effects, which read specs — guard the recursion for the mastery option list.
  function safeWeaponTokens() { if (weaponTokens._in) return []; weaponTokens._in = true; try { return weaponTokens(); } finally { weaponTokens._in = false; } }
  function classFxFor(cls) { if (!CH()) return null; const cl = classBreakdown().find((x) => x.cls === cls); if (!cl) return null; return CH().classChoiceEffects(classSpecsFor(cl), classState(cls)); }
  // Every choice root: { root, state, fx() } — fx() = its concrete effects.
  function choiceRoots() {
    const out = []; const ch = CH(); if (!ch) return out;
    const b = bgData();
    if (st.species) out.push({ root:"species", state: st.spChoices, fx: () => ch.speciesEffects(st.species, st.lineage, { level: num(st.level) }, st.spChoices) });
    if (b && b.feat) out.push({ root:"bg", state: st.bgChoices, fx: () => ch.featEffects(b.feat, st.bgChoices) });
    (st.advances || []).forEach((av, i) => { if (av.mode === "feat" && av.feat) out.push({ root:"adv:" + i, state: av.choices || (av.choices = {}), fx: () => ch.featEffects(av.feat, av.choices || {}) }); });
    classBreakdown().forEach((cl) => { if (!cl.cls) return; out.push({ root:"class:" + cl.cls, state: classState(cl.cls), fx: () => { const x = classFxFor(cl.cls) || { skills:[], expertise:[], profs:[] }; return { abil:{}, skills:x.skills, expertise:x.expertise, saves:[], spells:[], profs:x.profs, picks:[] }; } }); });
    out.push({ root:"tools", state: st.tools, fx: () => ({ abil:{}, skills:[], expertise:[], saves:[], spells:[], profs: toolPickNames(), picks:[] }) });
    out.push({ root:"equip", state: st.equipPicks, fx: () => ({ abil:{}, skills:[], expertise:[], saves:[], spells:[], profs:[], picks:[] }) });
    return out;
  }
  // Effects of the species / background / advancement-feat roots (not the class roots).
  function choiceEffects() {
    const out = { abil:{}, skills:[], expertise:[], saves:[], spells:[], profs:[], picks:[] };
    choiceRoots().forEach((r) => { if (r.root.indexOf("class:") === 0 || r.root === "tools" || r.root === "equip") return; const fx = r.fx(); Object.keys(fx.abil).forEach((k) => out.abil[k] = (out.abil[k] || 0) + fx.abil[k]); ["skills","expertise","saves","spells","profs","picks"].forEach((k) => out[k] = out[k].concat(fx[k])); });
    return out;
  }
  function choiceState(root) { const r = choiceRoots().find((x) => x.root === root); return r ? r.state : null; }
  function choicesHTML(specs, state, root) { return CH() ? CH().renderChoices(specs, state, chCtx(root), root) : ""; }

  // ── tools & languages (B7/B8) ──────────────────────────────────────────
  // Fixed tool proficiencies from the class(es) and background, plus the "of your
  // choice" ones as pick specs. A duplicate (Rogue + Criminal both Thieves' Tools)
  // offers a replacement pick.
  function toolSources() {
    const b = bgData(); const out = [];
    classBreakdown().forEach((cl) => { const c = classDataByName(cl.cls); if (c && c.proficiencies && c.proficiencies.tools && c.proficiencies.tools.length) out.push({ where: cl.cls, prefix: "c" + norm(cl.cls).replace(/\W/g, "") + "_", list: c.proficiencies.tools }); });
    if (b && b.toolProficiencies && b.toolProficiencies.length) out.push({ where: b.name + " background", prefix: "bg_", list: b.toolProficiencies });
    return out;
  }
  function toolSpecs() {
    if (!CH()) return { fixed: [], specs: [] };
    const fixed = [], specs = [], seen = {};
    toolSources().forEach((src) => {
      const r = CH().toolSpecs(src.list, src.prefix, src.where);
      r.specs.forEach((s) => specs.push(s));
      r.fixed.forEach((t) => { const k = norm(t); if (seen[k]) { specs.push({ key: "swap_" + k.replace(/\W/g, ""), kind: "pick", label: "Replacement for a duplicate " + t + " (" + src.where + ")", count: 1, hint: "You already have " + t + " proficiency from " + seen[k] + " — choose another tool instead.", options: CH().ARTISAN_TOOLS.concat(CH().OTHER_TOOLS.filter((x) => !/^(Gaming Set|Musical Instrument)$/.test(x)), CH().INSTRUMENTS, CH().GAMING_SETS).filter((x) => norm(x) !== k).map((x) => ({ v: x, label: x })), trait: "tool" }); } else { seen[k] = src.where; fixed.push(t); } });
    });
    return { fixed, specs };
  }
  function toolPickNames() { const out = []; const ts = toolSpecs(); ts.specs.forEach((s) => (CH() ? CH().vals(st.tools, s.key) : []).forEach((v) => { if (out.indexOf(v) < 0) out.push(v); })); return out; }
  function allToolNames() { const ts = toolSpecs(); const out = ts.fixed.slice(); toolPickNames().forEach((t) => { if (out.indexOf(t) < 0) out.push(t); }); return out; }
  function langSpec() { return CH() ? { key: "langs", kind: "pick", label: "Languages — you know Common plus", count: 2, hint: "2024: every character knows Common and two more languages of their choice (Standard languages are common across the world; Rare ones are exotic).", options: CH().languageOpts() } : null; }
  function allLanguages() { const out = ["Common"]; (st.langs || []).forEach((l) => { if (out.indexOf(l) < 0) out.push(l); }); classBreakdown().forEach((cl) => { const fx = classFxFor(cl.cls); if (fx) fx.languages.forEach((l) => { if (out.indexOf(l) < 0) out.push(l); }); }); return out; }

  // ── modal shell ────────────────────────────────────────────────────────
  function ensureModal() {
    if ($("dndb-overlay")) return;
    const ov = document.createElement("div");
    ov.className = "ov"; ov.id = "dndb-overlay";
    ov.innerHTML =
      '<div class="modal wide" style="max-width:720px;">' +
        '<div class="modal-hd"><div class="ttl">Character Builder <span id="dndb-step" style="color:#8ad4ff;font-size:12px;letter-spacing:.08em;margin-left:8px;"></span></div><button class="x" onclick="DNDB.close()">✕</button></div>' +
        '<div class="modal-bd" id="dndb-body"></div>' +
        '<div class="modal-ft"><div><button class="m-btn ghost" id="dndb-back" onclick="DNDB.back()">← Back</button></div>' +
        '<div style="display:flex;gap:8px;"><button class="m-btn ghost" onclick="DNDB.close()">Cancel</button><button class="m-btn" id="dndb-next" onclick="DNDB.next()">Next →</button></div></div>' +
      '</div>';
    // Backdrop click no longer closes the builder (prevents losing build progress) — use the ✕.
    document.body.appendChild(ov);
  }
  function launch() { ensureModal(); st = fresh(); step = 0; $("dndb-overlay").classList.add("open"); render(); }
  function close() { const ov = $("dndb-overlay"); if (ov) ov.classList.remove("open"); }

  function allClassSpecs() { const out = []; classBreakdown().forEach((cl) => { if (!cl.cls) return; const specs = classSpecsFor(cl); if (specs.length) out.push({ cl, specs }); }); return out; }
  function stepSkipped(name) {
    if (name === "Subclass") return !hasSubclass();
    if (name === "Choices") return allClassSpecs().length === 0;
    if (name === "Advancement") return asiSlots() === 0;
    if (name === "Spells") return !isCaster();
    return false;
  }
  function nextEnabled(from) { let s = from; while (s < STEPS.length - 1) { s++; if (!stepSkipped(STEPS[s])) return s; } return STEPS.length - 1; }
  function prevEnabled(from) { let s = from; while (s > 0) { s--; if (!stepSkipped(STEPS[s])) return s; } return 0; }
  function next() { if (!canProceed()) return; if (STEPS[step] === "Review") { apply(); return; } step = nextEnabled(step); render(); }
  function back() { if (step === 0) return; step = prevEnabled(step); render(); }

  // How many real (non-skipped) steps precede Review, for the "Step X of Y" label.
  function stepLabel() {
    if (step === 0) return "";
    let idx = 0, total = 0;
    for (let i = 1; i < STEPS.length; i++) { if (stepSkipped(STEPS[i])) continue; total++; if (i === step) idx = total; }
    return "Step " + idx + " of " + total + " — " + STEPS[step];
  }

  function render() {
    ensureModal();
    pruneStale();
    $("dndb-step").textContent = stepLabel();
    $("dndb-back").style.visibility = step === 0 ? "hidden" : "visible";
    $("dndb-next").textContent = STEPS[step] === "Review" ? "Build character ✓" : "Next →";
    const fn = { Options:rOptions, Class:rClass, Subclass:rSubclass, Species:rSpecies, Background:rBackground, Abilities:rAbilities, Skills:rSkills, Proficiencies:rProficiencies, Choices:rChoices, Advancement:rAdvancement, Spells:rSpells, Equipment:rEquipment, Review:rReview }[STEPS[step]];
    const body = $("dndb-body");
    // Keep the scroll position on in-step re-renders (e.g. picking a spell); reset only on a step change.
    const sameStep = render._step === step, prevScroll = body.scrollTop;
    body.innerHTML = fn();
    body.scrollTop = sameStep ? prevScroll : 0;
    render._step = step;
    wire();
  }

  const card = (attr, on, title, sub) =>
    '<div class="dndb-card' + (on ? " on" : "") + '" ' + attr + '>' +
      '<div class="dc-title">' + esc(title) + '</div>' + (sub ? '<div class="dc-sub">' + esc(sub) + '</div>' : "") + '</div>';

  // ── steps ──────────────────────────────────────────────────────────────
  function rOptions() {
    let h = '<p class="m-hint">Name your hero and set a starting level, then choose which content is available as you build.</p>';
    h += '<div style="display:flex;gap:14px;flex-wrap:wrap;align-items:flex-end;margin-bottom:16px;">' +
         '<label style="flex:1 1 220px;"><span class="m-lbl">Character name</span><input type="text" id="dndb-name" class="m-input" placeholder="Aelric Thornwood" value="' + esc(st.name) + '"></label>' +
         '<label><span class="m-lbl">Starting level</span> <select id="dndb-level" class="m-input" style="width:90px;">' + Array.from({ length: 20 }, (_, i) => '<option value="' + (i+1) + '"' + (num(st.level) === i+1 ? " selected" : "") + '>' + (i+1) + '</option>').join("") + '</select></label>' +
         '</div>';
    h += '<span class="m-lbl">Expansion content</span><p class="m-hint" style="margin:2px 0 8px;">Leave an expansion unchecked to hide its options — classes, subclasses, species, backgrounds, feats, and spells — throughout character creation.</p>';
    h += '<div class="dndb-opt' + (st.eberron ? " on" : "") + '" id="dndb-opt-eberron"><div class="dnb-main"><span class="dnb-check">' + (st.eberron ? "✓" : "") + '</span><div><div class="dnb-ttl">Eberron: Forge of the Artificer</div><div class="dnb-sub">The Artificer class; Changeling, Kalashtar, Khoravar, Shifter &amp; Warforged species; dragonmark backgrounds &amp; feats; and Eberron magic items.</div></div></div></div>';
    h += '<div class="dndb-opt' + (st.au ? " on" : "") + '" id="dndb-opt-au"><div class="dnb-main"><span class="dnb-check">' + (st.au ? "✓" : "") + '</span><div><div class="dnb-ttl">Arcana Unleashed</div><div class="dnb-sub">New subclasses, backgrounds, feats, spells, and magic items from the Arcana Unleashed expansion.</div></div></div></div>';
    return h;
  }
  function rClass() {
    let h = '<p class="m-hint">Pick your class. The sheet fills in its features, saving throws, and (for casters) spellcasting.</p>';
    h += '<div class="dndb-grid">';
    D.classes().filter(allowSrc).forEach((c) => {
      const cast = c.spellcasting && c.spellcasting !== "none" ? c.spellcasting + " caster" : "martial";
      h += card('data-cls="' + esc(c.name) + '"', st.cls === c.name, c.name, "d" + c.hitDie + " · " + (c.primaryAbility||[]).join("/") + " · " + cast);
    });
    h += "</div>";
    const c = clsData();
    if (c) h += CH() ? CH().classDetail(c, primaryLevel()) : '<div class="dndb-note">' + esc(c.flavor || "") + '</div>';
    // Multiclass allocator (only meaningful above level 1)
    if (st.cls && num(st.level) > 1) h += rMulticlass();
    return h;
  }
  function scoresAssigned() { return st.method !== "array" || ABIL.every((a) => st.arrayPick[a] != null); }
  function prereqNote(cls) {
    const p = CALC().multiclassPrereq ? CALC().multiclassPrereq(cls, finalScores()) : { text: "", met: true };
    if (!p.text) return "";
    return '<span class="dndb-mc-req' + (scoresAssigned() && !p.met ? " bad" : "") + '" title="Multiclass prerequisite">' + esc(p.text) + (scoresAssigned() && !p.met ? ' ⚠ not met' : '') + '</span>';
  }
  function rMulticlass(){
    let h = '<span class="m-lbl">Multiclass (optional)</span><p class="m-hint" style="margin:2px 0 6px;">Give some of your levels to other classes. Your primary <b>' + esc(st.cls) + '</b> keeps the remaining <b style="color:#8ad4ff;">' + primaryLevel() + '</b>. Multiclassing requires 13+ in the abilities shown (for your primary class too) — the builder flags an unmet prerequisite but won\'t block you.</p>';
    h += '<div class="dndb-mc-rows">';
    if ((st.multiclass || []).length) h += '<div class="dndb-mc-row"><span class="dndb-mc-name">' + esc(st.cls) + ' <small>(primary)</small></span>' + prereqNote(st.cls) + '</div>';
    (st.multiclass || []).forEach((m, i) => {
      h += '<div class="dndb-mc-row"><span class="dndb-mc-name">' + esc(m.cls) + '</span>' + prereqNote(m.cls) +
        '<button class="dndb-pm" data-mc="' + i + '" data-d="-1">−</button><span class="dar-val" style="min-width:22px;">' + num(m.level) + '</span><button class="dndb-pm" data-mc="' + i + '" data-d="1">+</button>' +
        '<button class="dndb-mc-x" data-mcx="' + i + '" title="Remove">✕</button></div>';
    });
    h += '</div>';
    const taken = new Set([norm(st.cls)].concat((st.multiclass || []).map((m) => norm(m.cls))));
    const others = D.classes().filter((c) => !taken.has(norm(c.name)) && allowSrc(c));
    if (others.length && secondaryTotal() < num(st.level) - 1){
      h += '<select id="dndb-mc-add" class="m-input" style="margin-top:6px;"><option value="">+ Add a class…</option>' +
        others.map((c) => '<option value="' + esc(c.name) + '">' + esc(c.name) + '</option>').join("") + '</select>';
    }
    return h;
  }
  // B4: every class whose level reaches its subclass level picks one.
  function rSubclass() {
    const ents = subclassEntries(); if (!ents.length) return "<p>Pick a class first.</p>";
    let h = "";
    ents.forEach((cl) => {
      const c = classDataByName(cl.cls);
      h += '<p class="m-hint" style="margin-top:' + (h ? '14px' : '0') + ';">Your ' + esc(c.name) + ' (level ' + cl.level + ') chooses a ' + esc(c.subclassLabel || "subclass") + ' at level ' + (c.subclassLevel||3) + '.</p><div class="dndb-grid">';
      (c.subclasses || []).filter(allowSrc).forEach((s) => h += card('data-sub="' + esc(s.name) + '" data-subcls="' + esc(c.name) + '"', cl.subclass === s.name, s.name, (s.source === "srd" ? "SRD" : (s.source||"").toUpperCase()) + (s.spellcasting ? " · " + s.spellcasting + " caster (" + (s.spellcastingAbility || "INT") + ")" : "")));
      h += "</div>";
      const sub = (c.subclasses||[]).find((s) => s.name === cl.subclass);
      if (sub) h += CH() ? CH().subclassDetail(c, sub, cl.level) : '<div class="dndb-note">' + esc(sub.flavor || "") + '</div>';
    });
    return h;
  }
  function rSpecies() {
    let h = '<p class="m-hint">Choose a species. Some have a lineage to pick as well.</p><div class="dndb-grid">';
    D.species().filter(allowSrc).forEach((s) => h += card('data-species="' + esc(s.name) + '"', st.species === s.name, s.name, "Speed " + s.speed + (s.darkvision ? " · Darkvision " + s.darkvision : "")));
    h += "</div>";
    const sp = spData();
    if (sp) h += CH() ? CH().speciesDetail(sp, "") : '<div class="dndb-note">' + esc(sp.flavor || "") + '</div>';
    if (sp && sp.lineages && sp.lineages.length) {
      h += '<span class="m-lbl">Lineage</span><div class="dndb-grid">';
      sp.lineages.forEach((l) => h += card('data-lin="' + esc(l.name) + '"', st.lineage === l.name, l.name, (l.traits || []).map((t) => t.name).join(" · ")));
      h += "</div>";
      const ln = sp.lineages.find((l) => l.name === st.lineage);
      if (ln && CH()) h += CH().lineageDetail(sp, ln);
    }
    // B9: species that come in two sizes
    if (sp && Array.isArray(sp.size) && sp.size.length > 1) {
      h += '<span class="m-lbl">Size</span><div class="dndb-grid">';
      sp.size.forEach((sz) => h += card('data-size="' + esc(sz) + '"', st.size === sz, sz, sz === "Small" ? "Can move through Medium creatures' spaces" : ""));
      h += "</div>";
    }
    // Trait choices (Human's skill + Origin feat, Keen Senses, Draconic Ancestry, a lineage's spellcasting ability…)
    if (sp) { const specs = speciesSpecs(); if (specs.length) h += '<span class="m-lbl" style="display:block;margin-top:12px;">Species choices</span>' + choicesHTML(specs, st.spChoices, "species"); }
    return h;
  }
  function rBackground() {
    let h = '<p class="m-hint">Your background grants two skills, a tool, an Origin feat, and three ability scores you can raise.</p><div class="dndb-grid">';
    D.backgrounds().filter(allowSrc).forEach((b) => h += card('data-bg="' + esc(b.name) + '"', st.background === b.name, b.name, (b.abilityScores||[]).join("/") + " · " + b.feat));
    h += "</div>";
    const b = bgData();
    if (b) h += CH() ? CH().backgroundDetail(b) : '<div class="dndb-note"><b>' + esc(b.name) + '.</b> ' + esc(b.description || "") + '<br>Skills: <b>' + esc((b.skillProficiencies||[]).join(", ")) + '</b> · Feat: <b>' + esc(b.feat) + '</b></div>';
    // The Origin feat's own picks (Magic Initiate's list + spells, Skilled's three skills, …)
    if (b) { const specs = bgFeatSpecs(); if (specs.length) h += '<span class="m-lbl" style="display:block;margin-top:12px;">' + esc(b.feat) + ' — your choices</span>' + choicesHTML(specs, st.bgChoices, "bg"); }
    return h;
  }
  function rAbilities() {
    const b = bgData();
    let h = '<p class="m-hint">Assign your ability scores, then apply your background\'s bonuses (2024: +2 and +1, or +1 to all three, among ' + (b ? esc((b.abilityScores||[]).join(", ")) : "your background\'s three abilities") + ').</p>';
    h += '<div class="dndb-seg">' +
      seg("array","Standard Array") + seg("pointbuy","Point Buy") + seg("manual","Manual") + '</div>';
    if (st.method === "array") h += arrayUI();
    else if (st.method === "pointbuy") h += pointBuyUI();
    else h += manualUI();
    if (b) {
      h += '<span class="m-lbl">Background bonus</span>';
      h += '<div class="dndb-seg" style="max-width:360px;margin:4px 0 8px;"><button class="dndb-seg-btn' + (st.bgMode !== "111" ? " on" : "") + '" data-bgmode="21">+2 and +1</button><button class="dndb-seg-btn' + (st.bgMode === "111" ? " on" : "") + '" data-bgmode="111">+1 to all three</button></div>';
      if (st.bgMode === "111") h += '<div class="dndb-note">+1 to <b>' + esc((b.abilityScores||[]).map((a) => ABIL_NAME[a]).join(", ")) + '</b>.</div>';
      else {
        h += '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;font-size:12px;color:#cdc3b6;">';
        h += '<label>+2 to <select id="dndb-bg2" class="m-input" style="width:auto;display:inline-block;">' + (b.abilityScores||[]).map((a) => '<option value="' + a + '"' + (st.bg2===a?" selected":"") + '>' + ABIL_NAME[a] + '</option>').join("") + '</select></label>';
        h += '<label>+1 to <select id="dndb-bg1" class="m-input" style="width:auto;display:inline-block;">' + (b.abilityScores||[]).map((a) => '<option value="' + a + '"' + (st.bg1===a?" selected":"") + '>' + ABIL_NAME[a] + '</option>').join("") + '</select></label>';
        h += '</div>';
      }
    }
    h += '<div class="dndb-totals" id="dndb-totals"></div>';
    return h;
  }
  function seg(v, label) { return '<button class="dndb-seg-btn' + (st.method===v?" on":"") + '" data-method="' + v + '">' + label + '</button>'; }
  function arrayUI() {
    const arr = (D.tables() && D.tables().standardArray) || [15,14,13,12,10,8];
    let h = '<div class="dndb-abil-rows">';
    ABIL.forEach((a) => {
      h += '<div class="dndb-abil-row"><span class="dar-name">' + ABIL_NAME[a] + '</span><select class="m-input dndb-array" data-abil="' + a + '"><option value="">—</option>' +
        arr.map((n, i) => '<option value="' + i + '"' + (st.arrayPick[a] === i ? " selected" : "") + '>' + n + '</option>').join("") + '</select></div>';
    });
    h += "</div>";
    return h;
  }
  function pointBuyUI() {
    const costs = (D.tables() && D.tables().pointBuyCosts) || {8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9};
    let spent = 0; ABIL.forEach((a) => spent += (costs[st.base[a]] || 0));
    const budget = (D.tables() && D.tables().pointBuyBudget) || 27;
    let h = '<div class="dndb-pb-head">Points: <b id="dndb-pb-spent">' + spent + '</b> / ' + budget + '</div><div class="dndb-abil-rows">';
    ABIL.forEach((a) => {
      h += '<div class="dndb-abil-row"><span class="dar-name">' + ABIL_NAME[a] + '</span>' +
        '<button class="dndb-pm" data-pb="' + a + '" data-d="-1">−</button>' +
        '<span class="dar-val" id="dndb-pb-' + a + '">' + st.base[a] + '</span>' +
        '<button class="dndb-pm" data-pb="' + a + '" data-d="1">+</button></div>';
    });
    h += "</div>";
    return h;
  }
  function manualUI() {
    let h = '<div class="dndb-abil-rows">';
    ABIL.forEach((a) => h += '<div class="dndb-abil-row"><span class="dar-name">' + ABIL_NAME[a] + '</span><input type="number" class="m-input dndb-manual" data-abil="' + a + '" min="1" max="20" value="' + st.base[a] + '" style="width:70px;"></div>');
    h += "</div>";
    return h;
  }
  // Base scores + the background bonus (before feats / advancement).
  function finalScores() {
    const out = {};
    if (st.method === "array") {
      const arr = (D.tables() && D.tables().standardArray) || [15,14,13,12,10,8];
      ABIL.forEach((a) => { const i = st.arrayPick[a]; out[a] = (i != null && arr[i] != null) ? arr[i] : 10; });
    } else { ABIL.forEach((a) => out[a] = st.base[a]); }
    const b = bgData();
    if (st.bgMode === "111" && b) (b.abilityScores || []).forEach((a) => { out[a] = (out[a] || 10) + 1; });
    else { if (st.bg2) out[st.bg2] = (out[st.bg2] || 10) + 2; if (st.bg1) out[st.bg1] = (out[st.bg1] || 10) + 1; }
    return out;
  }
  // B10: the running scores — background bonus, then species/background-feat +1s,
  // then each advancement in order (ASI capped at 20; a feat's +1 capped at 20, or 30
  // for an Epic Boon). `upto` = number of advancement slots to include (default all).
  function computeScores(upto) {
    const sc = finalScores();
    const bump = (a, n, cap) => { sc[a] = Math.min(cap, (sc[a] || 10) + n); };
    const fx0 = choiceEffects0();
    ABIL.forEach((a) => { if (fx0.abil[a]) bump(a, fx0.abil[a], 20); });
    (st.advances || []).slice(0, upto == null ? undefined : upto).forEach((av) => {
      if (av.mode === "feat") { if (!av.feat || !CH()) return; const f = D.feats().find((x) => x.name === av.feat); const cap = (f && f.category === "Epic Boon") ? 30 : 20; const fe = CH().featEffects(av.feat, av.choices || {}); ABIL.forEach((a) => { if (fe.abil[a]) bump(a, fe.abil[a], cap); }); }
      else ABIL.forEach((a) => { if ((av.asi || {})[a]) bump(a, av.asi[a], 20); });
    });
    return sc;
  }
  // species + background-feat effects only (their +1s apply before the advancement slots)
  function choiceEffects0() {
    const out = { abil:{}, skills:[], expertise:[], saves:[], spells:[], profs:[], picks:[] };
    choiceRoots().forEach((r) => { if (r.root !== "species" && r.root !== "bg") return; const fx = r.fx(); Object.keys(fx.abil).forEach((k) => out.abil[k] = (out.abil[k] || 0) + fx.abil[k]); });
    return out;
  }
  function rSkills() {
    const c = clsData(), b = bgData();
    const bgSkills = (b ? (b.skillProficiencies || []) : []).concat(choiceEffects().skills);
    let h = '<p class="m-hint">You are automatically proficient in your background skills' + (choiceEffects().skills.length ? ' and the skills your species/feat choices granted' : '') + '. Choose your class skills.</p>';
    if (bgSkills.length) h += '<div class="dndb-note">Already proficient: <b>' + esc(bgSkills.join(", ")) + '</b></div>';
    if (c) {
      let from = c.proficiencies && c.proficiencies.skillsFrom && c.proficiencies.skillsFrom.length ? c.proficiencies.skillsFrom : D.skills().map((s) => s.name);
      // "Any" means the class chooses from the full skill list (e.g. Bard). Expand it.
      if (from.some((s) => /^any$/i.test(String(s).trim()))) from = D.skills().map((s) => s.name);
      const n = c.proficiencies && c.proficiencies.skillsChoose ? c.proficiencies.skillsChoose : 2;
      h += '<span class="m-lbl">Choose ' + n + ' from ' + esc(c.name) + ' <span id="dndb-sk-count" style="color:#8ad4ff;"></span></span><div class="dndb-grid">';
      from.forEach((s) => { const dis = bgSkills.map((x)=>x.toLowerCase()).includes(s.toLowerCase()); h += '<div class="dndb-card small' + (st.classSkills.includes(s) ? " on" : "") + (dis ? " disabled" : "") + '" data-sk="' + esc(s) + '" data-max="' + n + '"><div class="dc-title">' + esc(s) + (dis ? " ✓bg" : "") + '</div></div>'; });
      h += "</div>";
    }
    return h;
  }
  // B7/B8: tool proficiencies "of your choice" + the two starting languages.
  function rProficiencies() {
    const ts = toolSpecs();
    let h = '<p class="m-hint">Resolve your "of your choice" tool proficiencies and pick the languages you know.</p>';
    if (ts.fixed.length) h += '<div class="dndb-note">Tool proficiencies: <b>' + esc(ts.fixed.join(", ")) + '</b></div>';
    if (ts.specs.length) h += '<span class="m-lbl" style="display:block;margin-top:10px;">Tools &amp; instruments</span>' + choicesHTML(ts.specs, st.tools, "tools");
    const ls = langSpec(); if (ls) h += '<span class="m-lbl" style="display:block;margin-top:12px;">Languages</span>' + choicesHTML([ls], { langs: st.langs }, "langs");
    return h;
  }
  // B12: every level-gated class choice up to the build level, for every class.
  function rChoices() {
    const groups = allClassSpecs();
    let h = '<p class="m-hint">Choices your class levels grant (Fighting Style, Expertise, Divine Order, Invocations, Metamagic, Maneuvers, Weapon Mastery…).</p>';
    groups.forEach((g) => {
      h += '<span class="m-lbl" style="display:block;margin-top:10px;">' + esc(g.cl.cls) + ' ' + g.cl.level + (g.cl.subclass ? ' · ' + esc(g.cl.subclass) : '') + '</span>';
      h += choicesHTML(g.specs.map((s) => Object.assign({}, s, { label: s.label + (s.level > 1 ? ' (level ' + s.level + ')' : '') })), classState(g.cl.cls), "class:" + g.cl.cls);
    });
    return h;
  }
  // Feat-prerequisite context for advancement slot i (scores as they stand before that slot).
  function ownedFeats(exceptSlot) {
    const b = bgData(); const out = [];
    if (b && b.feat && CH()) out.push(CH().featBase(b.feat).name);
    if (CH() && st.species) speciesSpecs().forEach((sp) => { if (sp.kind === "feat" && st.spChoices[sp.key]) out.push(st.spChoices[sp.key]); });
    classBreakdown().forEach((cl) => { const fx = classFxFor(cl.cls); if (fx) fx.feats.forEach((f) => out.push(f)); });
    (st.advances || []).forEach((av, i) => { if (i !== exceptSlot && av.mode === "feat" && av.feat) out.push(av.feat); });
    return out;
  }
  function featCtx(slot) {
    return { level: num(st.level), scores: computeScores(slot), armor: armorTokens(), weapons: weaponTokens(), caster: isCaster(), pact: classBreakdown().some((cl) => { const c = classDataByName(cl.cls); return c && c.spellcasting === "pact"; }), owned: ownedFeats(slot) };
  }
  // B1: characters built above level 1 allocate the ASIs / feats their levels earned.
  function rAdvancement() {
    const n = asiSlots();
    while (st.advances.length < n) st.advances.push({ mode:"asi", asi:{}, feat:"" });
    st.advances.length = n;
    let h = '<p class="m-hint">Your levels grant <b>' + n + '</b> Ability Score Improvement' + (n>1?"s":"") + ' (each can be a feat instead). Allocate them below — scores shown include your earlier improvements.</p>';
    st.advances.forEach((av, i) => {
      const base = computeScores(i);
      h += '<div style="border:1px solid #3a3a41;border-radius:6px;padding:8px 10px;margin-bottom:8px;">';
      h += '<span class="m-lbl">Improvement ' + (i+1) + '</span>';
      h += '<div class="dndb-seg" style="margin:4px 0 8px;"><button class="dndb-seg-btn' + (av.mode!=="feat"?" on":"") + '" data-advmode="asi" data-i="' + i + '">Ability Scores</button><button class="dndb-seg-btn' + (av.mode==="feat"?" on":"") + '" data-advmode="feat" data-i="' + i + '">Feat</button></div>';
      if (av.mode === "feat") {
        // B6: General feats (level 4+), Origin feats, Epic Boons at 19+; never Fighting Styles.
        // Ineligible feats stay listed but greyed with the unmet prerequisite.
        h += CH() ? CH().featSelectHTML('class="m-input dndb-adv-feat" data-i="' + i + '"', av.feat, featCtx(i), { allowSrc }) : '';   // greyed = unmet prerequisite
        const f = D.feats().find((x) => x.name === av.feat);
        if (f) { h += CH() ? CH().featDetail(f.name) : '<div class="dndb-note">' + esc((f.benefits||[]).join(" ") || "") + '</div>'; const specs = advFeatSpecs(av); if (specs.length) h += choicesHTML(specs, av.choices, "adv:" + i); }
      } else {
        const total = ABIL.reduce((s,a) => s + (av.asi[a]||0), 0);
        h += '<p class="m-hint" style="margin:0 0 6px;">+2 to one score, or +1 to two (max 20). <b style="color:#8ad4ff;">' + total + '/2</b></p><div class="dndb-abil-rows">';
        ABIL.forEach((a) => { const add = av.asi[a]||0; h += '<div class="dndb-abil-row"><span class="dar-name">' + ABIL_NAME[a] + ' <small style="color:#a99e90;">' + base[a] + (add?" +"+add:"") + '</small></span><button class="dndb-pm" data-advasi="' + a + '" data-i="' + i + '" data-d="-1">−</button><span class="dar-val">' + add + '</span><button class="dndb-pm" data-advasi="' + a + '" data-i="' + i + '" data-d="1">+</button></div>'; });
        h += "</div>";
      }
      h += "</div>";
    });
    return h;
  }
  // B4/B5/B13: one spell section per caster class (a subclass caster too).
  function rSpells() {
    if (!isCaster()) return '<p class="m-hint">This class doesn\'t cast spells at this level.</p>';
    const avail = st.spellsAvail !== false;
    let h = '<p class="m-hint">Choose your starting spells. You can change these on the sheet anytime.</p>';
    h += '<label class="brow-check spl-avail"><input type="checkbox" data-spavail' + (avail ? " checked" : "") + '> Spells available to me</label>';
    casterEntries().forEach((cl) => {
      const cf = castingFor(cl), p = picksFor(cl.cls), cCount = cantripCountFor(cl), sMin = spellMinFor(cl), sMax = spellMaxFor(cl), maxL = maxSpellLevelFor(cl);
      const who = cl.cls + (cf.source === "subclass" ? " (" + cl.subclass + ")" : "");
      h += '<div class="dndb-spsec"><span class="m-lbl" style="display:block;margin-top:10px;color:#8ad4ff;">' + esc(who) + ' ' + cl.level + ' — ' + esc(cf.list) + ' spell list · ' + esc(ABIL_NAME[cf.ability] || cf.ability) + '</span>';
      if (cCount > 0) {
        h += '<span class="m-lbl">Cantrips — choose ' + cCount + ' <span style="color:#8ad4ff;">(' + p.cantrips.length + '/' + cCount + ')</span></span>';
        h += CALC().spellPickerHTML(spellsFor(0, 0, avail, cf.list), {
          selected: (n) => p.cantrips.includes(n),
          disabledAdd: (s) => !spellInList(s, cf.list) || p.cantrips.length >= cCount,
          pickAttr: 'data-spcls="' + esc(cl.cls) + '" data-sp-pick',
          emptyHTML: '<p class="spl-empty">No cantrips available.</p>',
        });
      }
      if (sMax > 0 && maxL >= 1) {
        const lbl = isWizardEntry(cl) ? 'Spellbook — choose ' + (sMin === sMax ? sMax : sMin + '–' + sMax) + ' (you prepare ' + preparedFor(cl) + ')' : 'Spells — choose ' + sMax;
        h += '<span class="m-lbl">' + lbl + ' (up to level ' + maxL + ') <span style="color:#8ad4ff;">(' + p.spells.length + '/' + sMax + ')</span></span>';
        if (isWizardEntry(cl)) h += '<p class="m-hint" style="margin:2px 0 6px;">Your first ' + preparedFor(cl) + ' picks start prepared; the rest wait in your spellbook.</p>';
        h += CALC().spellPickerHTML(spellsFor(1, maxL, avail, cf.list), {
          selected: (n) => p.spells.includes(n),
          disabledAdd: (s) => !spellInList(s, cf.list) || p.spells.length >= sMax,
          pickAttr: 'data-spcls="' + esc(cl.cls) + '" data-sp-pick',
          emptyHTML: '<p class="spl-empty">No spells available.</p>',
        });
      }
      h += '</div>';
    });
    return h;
  }
  // startingEquipment is irregular across classes: sometimes one comma-joined package
  // string, sometimes a package spread over several array entries, sometimes multiple
  // alternative packages. Entries beginning with "or " start a new alternative; the
  // pure "N GP" entry is the gold option. Returns { packages:[[item,…],…], gold }.
  // Background `equipment` arrays use the same shape ("…, 8 GP", "or 50 GP").
  function parseEquip(eq) {
    eq = Array.isArray(eq) ? eq : ((eq && eq.startingEquipment) ? eq.startingEquipment : []);
    const groups = [];
    eq.forEach((raw) => {
      const s = String(raw).trim(), isAlt = /^or\s+/i.test(s), body = s.replace(/^or\s+/i, "");
      if (!groups.length || isAlt) groups.push([body]); else groups[groups.length - 1].push(body);
    });
    const packages = []; let gold = 0;
    groups.forEach((g) => {
      const items = [];
      g.forEach((part) => part.split(/,\s*(?![^()]*\))/).forEach((x) => { const t = x.trim(); if (t) items.push(t); }));
      if (items.length === 1 && /^\d+\s*GP$/i.test(items[0])) { const n = parseInt(items[0], 10) || 0; if (n > gold) gold = n; }
      else if (items.length) packages.push(items);
    });
    return { packages, gold };
  }
  // Equipment tokens that need a decision ("Gaming Set (one of your choice)", "Artisan's
  // Tools or Musical Instrument", "a Spellcasting Focus (any Artisan's Tools you're
  // proficient with)", "two Simple weapons") → pick specs keyed by package + index.
  function equipPickSpec(token, key) {
    const ch = CH(); if (!ch) return null;
    const t = String(token).trim();
    const nm = t.match(/^(\d+|one|two|three|four)\s+/i); const WORD = { one:1, two:2, three:3, four:4 };
    const n = nm ? (WORD[nm[1].toLowerCase()] || num(nm[1]) || 1) : 1;
    if (/spellcasting focus/i.test(t) && /artisan/i.test(t)) { const mine = allToolNames().filter((x) => ch.ARTISAN_TOOLS.some((a) => norm(a) === norm(x))); return { key, kind:"pick", label:"Spellcasting Focus — which Artisan's Tools", count:1, options:(mine.length ? mine : ch.ARTISAN_TOOLS).map((x) => ({ v:x, label:x })), hint:"“" + t + "”" }; }
    const isArt = /artisan'?s tools/i.test(t), isInst = /musical instrument/i.test(t), isGame = /gaming set/i.test(t);
    if ((isArt || isInst || isGame) && (/choice|choose|\bor\b|^(artisan'?s tools|musical instrument|gaming set)$/i.test(t))) {
      let options = [], what = [];
      if (isArt) { options = options.concat(ch.ARTISAN_TOOLS); what.push("Artisan's Tools"); }
      if (isInst) { options = options.concat(ch.INSTRUMENTS); what.push("Musical Instrument"); }
      if (isGame) { options = options.concat(ch.GAMING_SETS); what.push("Gaming Set"); }
      return { key, kind:"pick", label: what.join(" or ") + " (equipment)", count: n, options: options.map((x) => ({ v:x, label:x })), hint:"“" + t + "”" };
    }
    const wm = t.match(/^(\d+|one|two|three|four)\s+(Simple|Martial)\s+(Melee\s+|Ranged\s+)?weapons?$/i);
    if (wm) { const cat = wm[2].toLowerCase(), kind = (wm[3] || "").trim().toLowerCase(); return { key, kind:"pick", label: t, count: n, options: D.weapons().filter((w) => norm(w.category) === cat && (!kind || norm(w.kind) === kind) && allowSrc(w)).map((w) => ({ v:w.name, label:w.name, desc:w.damage + " " + w.damageType })), hint:"" }; }
    return null;
  }
  function chosenPackages() {
    const out = []; const c = clsData(), b = bgData();
    const pe = parseEquip(c); if (st.equipChoice !== "gold" && pe.packages.length) out.push({ prefix:"c", items: pe.packages[st.equipPkg || 0] || pe.packages[0] });
    const pb = parseEquip(b ? b.equipment : []); if (b && st.bgEquip !== "gold" && pb.packages.length) out.push({ prefix:"b", items: pb.packages[0] });
    return out;
  }
  function equipSpecs() { const specs = []; chosenPackages().forEach((pk) => pk.items.forEach((t, i) => { const s = equipPickSpec(t, pk.prefix + i); if (s) specs.push(s); })); return specs; }
  // Default an equipment pick to the matching tool proficiency the player already chose.
  function defaultEquipPicks() {
    const ch = CH(); if (!ch) return;
    equipSpecs().forEach((s) => { if (ch.vals(st.equipPicks, s.key).length) return; const mine = allToolNames().filter((t) => s.options.some((o) => o.v === t)); if (mine.length) st.equipPicks[s.key] = s.count > 1 ? mine.slice(0, s.count) : mine[0]; });
  }
  // The chosen packages → inventory rows (with refs) + gold. Picks replace their tokens.
  function resolvePackages() {
    const inv = []; let gp = 0; const ch = CH();
    chosenPackages().forEach((pk) => pk.items.forEach((t, i) => {
      const gold = t.match(/^(\d+)\s*GP$/i); if (gold) { gp += parseInt(gold[1], 10); return; }   // gold → coins, not an item
      const spec = equipPickSpec(t, pk.prefix + i);
      if (spec) { const picked = ch ? ch.vals(st.equipPicks, spec.key) : []; if (picked.length) { picked.forEach((n) => { const it = resolveItem(n); inv.push({ name: it.name, ref: it.ref, qty: 1 }); }); return; } }
      const m = t.match(/^(\d+)\s+(.*)/);
      const item = resolveItem(m ? m[2] : t);
      inv.push({ name: item.name, ref: item.ref, qty: m ? parseInt(m[1], 10) : 1 });
    }));
    return { inv, gp };
  }
  function rEquipment() {
    const c = clsData(), b = bgData(), pe = parseEquip(c), pb = parseEquip(b ? b.equipment : []);
    if (st.equipPkg == null || st.equipPkg >= pe.packages.length) st.equipPkg = 0;
    let h = '<p class="m-hint">Take your class\'s starting equipment package or its gold, and likewise for your background — two independent choices.</p>';
    h += '<span class="m-lbl">' + esc(c ? c.name : "Class") + ' equipment</span><div class="dndb-grid" style="grid-template-columns:1fr;">';
    pe.packages.forEach((items, i) => {
      h += '<div class="dndb-card' + (st.equipChoice === "gear" && st.equipPkg === i ? " on" : "") + '" data-equip="gear" data-pkg="' + i + '"><div class="dc-title">' + (pe.packages.length > 1 ? "Equipment Option " + (i + 1) : "Equipment Package") + '</div><div class="dc-sub dc-plain">' + esc(items.join(", ")) + '</div></div>';
    });
    if (pe.gold) h += '<div class="dndb-card' + (st.equipChoice === "gold" ? " on" : "") + '" data-equip="gold"><div class="dc-title">Starting Gold</div><div class="dc-sub dc-plain">' + pe.gold + ' GP to spend on your own gear</div></div>';
    h += "</div>";
    if (b && (pb.packages.length || pb.gold)) {
      h += '<span class="m-lbl">' + esc(b.name) + ' background equipment</span><div class="dndb-grid" style="grid-template-columns:1fr;">';
      pb.packages.forEach((items, i) => { h += '<div class="dndb-card' + (st.bgEquip === "gear" ? " on" : "") + '" data-bgequip="gear"><div class="dc-title">Background Package</div><div class="dc-sub dc-plain">' + esc(items.join(", ")) + '</div></div>'; });
      if (pb.gold) h += '<div class="dndb-card' + (st.bgEquip === "gold" ? " on" : "") + '" data-bgequip="gold"><div class="dc-title">' + pb.gold + ' GP instead</div><div class="dc-sub dc-plain">Take the gold rather than the package</div></div>';
      h += "</div>";
    }
    defaultEquipPicks();
    const specs = equipSpecs();
    if (specs.length) h += '<span class="m-lbl" style="display:block;margin-top:10px;">Equipment choices</span>' + choicesHTML(specs, st.equipPicks, "equip");
    return h;
  }
  // AC from the package's equipped armor (+ shield), else 10 + DEX.
  function acFromInventory(inv, sc) {
    let ac = 10 + mod(sc.DEX), shield = 0;
    inv.forEach((it) => {
      if (!it.ref || !it.equipped) return;
      const a = D.armor().find((x) => norm(x.name) === norm(it.ref)); if (!a) return;
      if (/shield/i.test(a.category || a.name)) { shield = 2; return; }
      const m = String(a.baseAC || "").match(/^(\d+)(?:\s*\+\s*Dex modifier(?:\s*\(max (\d+)\))?)?/i); if (!m) return;
      let dex = /Dex/i.test(a.baseAC) ? mod(sc.DEX) : 0; if (m[2]) dex = Math.min(dex, num(m[2]));
      ac = num(m[1]) + dex;
    });
    return ac + shield;
  }
  function rReview() {
    const sc = computeScores(), c = clsData(), b = bgData();
    const bgSkills = b ? (b.skillProficiencies || []) : [];
    let h = '<p class="m-hint">Here\'s your character. Building applies it to the sheet (replacing the current contents).</p>';
    h += '<div style="display:flex;gap:14px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">' +
         '<label style="flex:1 1 220px;"><span class="m-lbl">Character name</span><input type="text" id="dndb-name" class="m-input" placeholder="Aelric Thornwood" value="' + esc(st.name) + '"></label>' +
         '<label><span class="m-lbl">Alignment</span><select id="dndb-align" class="m-input" style="width:auto;">' +
           '<option value="">—</option>' + ALIGNMENTS.map((a) => '<option value="' + a + '"' + (st.alignment === a ? " selected" : "") + '>' + a + '</option>').join("") + '</select></label>' +
         '</div>';
    h += '<div class="dndb-review">';
    const clsLabel = classBreakdown().map((cl) => cl.cls + " " + cl.level + (cl.subclass ? " (" + cl.subclass + ")" : "")).join(" / ");
    h += '<div class="dr-line"><b>' + esc(st.name || "Unnamed") + '</b> — ' + esc(st.species || "—") + (st.lineage ? " (" + esc(st.lineage) + ")" : "") + (st.size ? " · " + esc(st.size) : "") + ' ' + esc(clsLabel) + ' · ' + esc(st.background || "—") + (st.alignment ? " · " + esc(st.alignment) : "") + '</div>';
    h += '<div class="dr-scores">' + ABIL.map((a) => '<div class="drs"><span class="drs-a">' + a + '</span><span class="drs-v">' + sc[a] + '</span><span class="drs-m">' + sgn(mod(sc[a])) + '</span></div>').join("") + '</div>';
    const built = buildCharacter();
    h += '<div class="dr-line">HP <b>' + built.hpMax + '</b> · AC <b>' + built.ac + '</b> · Hit dice <b>' + esc(built.hitdice) + '</b> · Proficiency bonus <b>' + sgn(CALC().profBonus(num(st.level))) + '</b> · Speed <b>' + built.speed + '</b></div>';
    if (c) h += '<div class="dr-line">Saves: <b>' + esc((c.savingThrows||[]).join(", ")) + '</b></div>';
    const expertise = allExpertise();
    h += '<div class="dr-line">Skills: <b>' + esc(proficientSkills().join(", ") || "—") + '</b>' + (expertise.length ? ' · Expertise: <b>' + esc(expertise.join(", ")) + '</b>' : "") + '</div>';
    h += '<div class="dr-line">Languages: <b>' + esc(allLanguages().join(", ")) + '</b>' + (allToolNames().length ? ' · Tools: <b>' + esc(allToolNames().join(", ")) + '</b>' : '') + '</div>';
    allClassSpecs().forEach((g) => { const s = CH().summary(g.specs, classState(g.cl.cls)); if (s) h += '<div class="dr-line">' + esc(g.cl.cls) + ' choices: <b>' + esc(s) + '</b></div>'; });
    if (b) h += '<div class="dr-line">Origin feat: <b>' + esc(b.feat) + '</b>' + (CH() && CH().summary(bgFeatSpecs(), st.bgChoices) ? ' — ' + esc(CH().summary(bgFeatSpecs(), st.bgChoices)) : '') + '</div>';
    if (CH() && st.species) { const ss = CH().storedSummary({ species: st.spChoices }, "species", st.species, st.lineage, { level: num(st.level) }); if (ss) h += '<div class="dr-line">Species choices: <b>' + esc(ss) + '</b></div>'; }
    if (st.advances && st.advances.length) {
      const advTxt = st.advances.map((av) => av.mode === "feat" ? ((av.feat || "—") + (CH() && av.feat && CH().summary(advFeatSpecs(av), av.choices) ? " (" + CH().summary(advFeatSpecs(av), av.choices) + ")" : "")) : ("ASI " + ABIL.filter((a)=>av.asi[a]).map((a)=>a+" +"+av.asi[a]).join(" ")) ).filter(Boolean).join(" · ");
      if (advTxt) h += '<div class="dr-line">Advancement: <b>' + esc(advTxt) + '</b></div>';
    }
    casterEntries().forEach((cl) => { const p = picksFor(cl.cls); h += '<div class="dr-line">' + esc(cl.cls) + ' spells: <b>' + esc(p.cantrips.concat(p.spells).join(", ") || "none chosen") + '</b></div>'; });
    const pe = parseEquip(c), pb = parseEquip(b ? b.equipment : []);
    h += '<div class="dr-line">Starting gear: <b>' + esc(st.equipChoice === "gold" ? (pe.gold + " GP") : (pe.packages.length > 1 ? "Equipment Option " + ((st.equipPkg || 0) + 1) : "Equipment package")) + '</b>' + (b ? ' · Background: <b>' + esc(st.bgEquip === "gold" ? (pb.gold + " GP") : "Background package") + '</b>' : '') + '</div>';
    h += '<div class="dr-line">Inventory: <b>' + esc(built.inventory.map((it) => (it.qty > 1 ? it.qty + " " : "") + it.name).join(", ") || "—") + '</b> · <b>' + built.gp + ' GP</b></div>';
    h += "</div>";
    return h;
  }

  // ── wiring ─────────────────────────────────────────────────────────────
  function wire() {
    const body = $("dndb-body");
    const lvl = $("dndb-level"); if (lvl) lvl.addEventListener("change", () => { setLevel(lvl.value); render(); });
    const nm = $("dndb-name"); if (nm) nm.addEventListener("input", () => { st.name = nm.value; });
    const al = $("dndb-align"); if (al) al.addEventListener("change", () => { st.alignment = al.value; });
    const ebx = $("dndb-opt-eberron"); if (ebx) ebx.addEventListener("click", () => { st.eberron = !st.eberron; pruneDisallowed(); render(); });
    const aux = $("dndb-opt-au"); if (aux) aux.addEventListener("click", () => { st.au = !st.au; pruneDisallowed(); render(); });
    body.querySelectorAll("[data-cls]").forEach((el) => el.addEventListener("click", () => { if (st.cls !== el.dataset.cls) { st.cls = el.dataset.cls; st.subclass = ""; st.multiclass = []; st.classChoices = {}; st.spellPicks = {}; st.classSkills = []; st.tools = {}; st.equipPicks = {}; st.equipPkg = 0; } render(); }));
    body.querySelectorAll("[data-mc]").forEach((el) => el.addEventListener("click", () => { const i = num(el.dataset.mc), d = num(el.dataset.d); const m = st.multiclass[i]; if(!m) return; const nv = num(m.level) + d; if(nv < 1){ st.multiclass.splice(i,1); } else if(secondaryTotal() - num(m.level) + nv <= num(st.level) - 1){ m.level = nv; } render(); }));
    body.querySelectorAll("[data-mcx]").forEach((el) => el.addEventListener("click", () => { st.multiclass.splice(num(el.dataset.mcx),1); render(); }));
    const mca = $("dndb-mc-add"); if (mca) mca.addEventListener("change", () => { if(mca.value){ st.multiclass.push({ cls: mca.value, level: 1, subclass: "" }); render(); } });
    body.querySelectorAll("[data-sub]").forEach((el) => el.addEventListener("click", () => { setSubclass(el.dataset.subcls || st.cls, el.dataset.sub); render(); }));
    // (species cards use data-species — the spell picker's rows carry data-sp, which must not select a species)
    body.querySelectorAll("[data-species]").forEach((el) => el.addEventListener("click", () => { if (st.species !== el.dataset.species) { st.spChoices = {}; st.size = ""; } st.species = el.dataset.species; st.lineage = ""; const sp = spData(); if (sp && !Array.isArray(sp.size)) st.size = sp.size || ""; render(); }));
    body.querySelectorAll("[data-lin]").forEach((el) => el.addEventListener("click", () => { st.lineage = el.dataset.lin; render(); }));
    body.querySelectorAll("[data-size]").forEach((el) => el.addEventListener("click", () => { st.size = el.dataset.size; render(); }));
    body.querySelectorAll("[data-bg]").forEach((el) => el.addEventListener("click", () => { const b = D.backgrounds().find((x)=>x.name===el.dataset.bg); if (st.background !== el.dataset.bg) { st.bgChoices = {}; st.tools = {}; st.equipPicks = {}; } st.background = el.dataset.bg; if (b) { st.bg2 = (b.abilityScores||[])[0] || ""; st.bg1 = (b.abilityScores||[])[1] || ""; } render(); }));
    body.querySelectorAll("[data-method]").forEach((el) => el.addEventListener("click", () => { st.method = el.dataset.method; render(); }));
    body.querySelectorAll("[data-bgmode]").forEach((el) => el.addEventListener("click", () => { st.bgMode = el.dataset.bgmode; render(); }));
    body.querySelectorAll(".dndb-array").forEach((el) => el.addEventListener("change", () => { const a = el.dataset.abil, v = el.value; ABIL.forEach((x) => { if (x !== a && String(st.arrayPick[x]) === String(v)) delete st.arrayPick[x]; }); if (v === "") delete st.arrayPick[a]; else st.arrayPick[a] = parseInt(v,10); render(); }));
    body.querySelectorAll(".dndb-manual").forEach((el) => el.addEventListener("input", () => { st.base[el.dataset.abil] = Math.max(1, Math.min(20, parseInt(el.value,10) || 8)); updTotals(); }));
    body.querySelectorAll(".dndb-pm").forEach((el) => el.addEventListener("click", () => { pbAdjust(el.dataset.pb, parseInt(el.dataset.d,10)); }));
    // The +2 and +1 must go to two DIFFERENT abilities (2024). If they collide, bump the other.
    const bgAbils = () => (bgData() || {}).abilityScores || [];
    const bg2 = $("dndb-bg2"); if (bg2) bg2.addEventListener("change", () => { st.bg2 = bg2.value; if (st.bg1 === st.bg2) st.bg1 = bgAbils().find((a) => a !== st.bg2) || ""; render(); });
    const bg1 = $("dndb-bg1"); if (bg1) bg1.addEventListener("change", () => { st.bg1 = bg1.value; if (st.bg2 === st.bg1) st.bg2 = bgAbils().find((a) => a !== st.bg1) || ""; render(); });
    body.querySelectorAll("[data-sk]").forEach((el) => el.addEventListener("click", () => {
      if (el.classList.contains("disabled")) return;
      const s = el.dataset.sk, max = parseInt(el.dataset.max,10);
      const i = st.classSkills.indexOf(s);
      if (i >= 0) st.classSkills.splice(i,1); else { if (st.classSkills.length >= max) st.classSkills.shift(); st.classSkills.push(s); }
      render();
    }));
    // Advancement (B1): ASI/feat mode toggle, ASI +/- (2-pt budget, cap 20 on the running score), feat pick
    body.querySelectorAll("[data-advmode]").forEach((el) => el.addEventListener("click", () => { const i = num(el.dataset.i); st.advances[i].mode = el.dataset.advmode; if (el.dataset.advmode === "asi") st.advances[i].feat = ""; else st.advances[i].asi = {}; render(); }));
    body.querySelectorAll("[data-advasi]").forEach((el) => el.addEventListener("click", () => {
      const i = num(el.dataset.i), a = el.dataset.advasi, d = num(el.dataset.d), av = st.advances[i];
      const cur = av.asi[a]||0, total = ABIL.reduce((s,x)=>s+(av.asi[x]||0),0), base = computeScores(i)[a], nv = cur + d;
      if (nv < 0 || nv > 2) return;
      if (d > 0 && total >= 2) return;
      if (d > 0 && base + nv > 20) return;
      av.asi[a] = nv; if (!nv) delete av.asi[a]; render();
    }));
    body.querySelectorAll(".dndb-adv-feat").forEach((el) => el.addEventListener("change", () => { const av = st.advances[num(el.dataset.i)]; if (av.feat !== el.value) av.choices = {}; av.feat = el.value; render(); }));
    // choice roots: species / bg feat / advancement feats / class choices / tools / equipment / languages
    if (CH()) CH().wireChoices(body, (root) => root === "langs" ? st : choiceState(root), render);   // the languages root writes st.langs directly
    // spells: "available to me" toggle, expand-on-click, +Add / −Remove (cap
    // enforced by the Add button being disabled when the pool is full).
    body.querySelectorAll("[data-spavail]").forEach((el) => el.addEventListener("change", () => { st.spellsAvail = el.checked; render(); }));
    body.querySelectorAll("[data-sp-exp]").forEach((el) => el.addEventListener("click", (e) => { e.stopPropagation(); const row = el.closest("[data-sp]"); if(row){ row.classList.toggle("open"); const d = row.querySelector(".spl-desc"); if(d) d.hidden = !row.classList.contains("open"); } }));
    body.querySelectorAll("[data-sp-pick]").forEach((el) => el.addEventListener("click", () => {
      if (el.disabled) return;
      const n = el.getAttribute("data-sp-pick"), sp = D.spells().find((x) => x.name === n);
      const p = picksFor(el.getAttribute("data-spcls") || st.cls);
      const arr = (sp && sp.level === 0) ? p.cantrips : p.spells;
      const i = arr.indexOf(n);
      if (i >= 0) arr.splice(i, 1); else if (arr.indexOf(n) < 0) arr.push(n);
      render();
    }));
    // equipment
    body.querySelectorAll("[data-equip]").forEach((el) => el.addEventListener("click", () => { st.equipChoice = el.dataset.equip; if (el.dataset.pkg != null) st.equipPkg = parseInt(el.dataset.pkg, 10) || 0; render(); }));
    body.querySelectorAll("[data-bgequip]").forEach((el) => el.addEventListener("click", () => { st.bgEquip = el.dataset.bgequip; render(); }));
    updTotals(); updSkillCount();
  }
  function pbAdjust(a, d) {
    const costs = (D.tables() && D.tables().pointBuyCosts) || {8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9};
    const budget = (D.tables() && D.tables().pointBuyBudget) || 27;
    const nx = st.base[a] + d;
    if (nx < 8 || nx > 15) return;
    let spent = 0; ABIL.forEach((x) => spent += (costs[x===a?nx:st.base[x]] || 0));
    if (spent > budget) return;
    st.base[a] = nx;
    const cell = $("dndb-pb-" + a); if (cell) cell.textContent = nx;
    const sp = $("dndb-pb-spent"); if (sp) sp.textContent = spent;
    updTotals();
  }
  function updTotals() {
    const box = $("dndb-totals"); if (!box) return;
    const sc = finalScores();
    box.innerHTML = ABIL.map((a) => '<div class="drs"><span class="drs-a">' + a + '</span><span class="drs-v">' + sc[a] + '</span><span class="drs-m">' + sgn(mod(sc[a])) + '</span></div>').join("");
  }
  function updSkillCount() {
    const el = $("dndb-sk-count"); const c = clsData(); if (!el || !c) return;
    const n = c.proficiencies && c.proficiencies.skillsChoose ? c.proficiencies.skillsChoose : 2;
    el.textContent = "(" + st.classSkills.length + "/" + n + ")";
  }
  // A spec is satisfied when its picks reach its count — or every option it could offer.
  function specsComplete(specs, state, root) {
    const ch = CH(); if (!ch) return true;
    const ctx = chCtx(root);
    return specs.every((s) => { const n = Math.min(s.count || 1, (s.kind === "expertise" || s.kind === "skill") ? ch.specOptions(s, ctx).filter((o) => !o.taken).length : Infinity); return ch.vals(state, s.key).length >= n; });
  }
  function canProceed() {
    switch (STEPS[step]) {
      case "Options": return true;
      case "Class": return !!st.cls;
      case "Subclass": return subclassEntries().every((cl) => !!cl.subclass);
      case "Species": { const sp = spData(); if (!st.species) return false; if (sp && sp.lineages && sp.lineages.length && !st.lineage) return false; if (sp && Array.isArray(sp.size) && sp.size.length > 1 && !st.size) return false; return !CH() || CH().complete(speciesSpecs(), st.spChoices); }
      case "Background": return !!st.background && (!CH() || CH().complete(bgFeatSpecs(), st.bgChoices));
      case "Abilities": {
        if (st.method === "array") return ABIL.every((a) => st.arrayPick[a] != null);
        if (st.method === "pointbuy") { const costs = (D.tables() && D.tables().pointBuyCosts) || {8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9}; const budget = (D.tables() && D.tables().pointBuyBudget) || 27; return ABIL.reduce((s,a) => s + (costs[st.base[a]] || 0), 0) <= budget; }
        return true;
      }
      case "Skills": { const c = clsData(); if (!c) return true; const n = (c.proficiencies && c.proficiencies.skillsChoose) ? c.proficiencies.skillsChoose : 2; return st.classSkills.length >= n; }
      case "Proficiencies": { if (!CH()) return true; const ts = toolSpecs(); return CH().complete(ts.specs, st.tools) && (st.langs || []).length >= 2; }
      case "Choices": return allClassSpecs().every((g) => specsComplete(g.specs, classState(g.cl.cls), "class:" + g.cl.cls));
      case "Advancement": {
        const n = asiSlots();
        for (let i = 0; i < n; i++) { const av = st.advances[i] || {}; if (av.mode === "feat") { if (!av.feat) return false; if (CH() && !CH().complete(advFeatSpecs(av), av.choices || {})) return false; } else { if (ABIL.reduce((s,a)=>s+((av.asi||{})[a]||0),0) !== 2) return false; } }
        return true;
      }
      case "Spells": {
        // exact counts: no surplus (prune guarantees it), no shortfall
        return casterEntries().every((cl) => { const p = picksFor(cl.cls); if (p.cantrips.length !== cantripCountFor(cl)) return false; if (maxSpellLevelFor(cl) >= 1 && spellMaxFor(cl) > 0 && (p.spells.length < spellMinFor(cl) || p.spells.length > spellMaxFor(cl))) return false; return true; });
      }
      case "Equipment": return !CH() || CH().complete(equipSpecs(), st.equipPicks);
      default: return true;
    }
  }

  // ── build + apply ──────────────────────────────────────────────────────
  // Everything the sheet needs, assembled from the wizard state (also used by Review).
  function buildCharacter() {
    const sc = computeScores(), c = clsData(), b = bgData(), sp = spData(), ch = CH();
    const saveProf = {}; if (c) (c.savingThrows || []).forEach((s) => saveProf[s] = true);
    const skillProf = {};
    if (b) (b.skillProficiencies || []).forEach((s) => { const real = matchSkill(s); if (real) skillProf[real] = 1; });
    st.classSkills.forEach((s) => { const real = matchSkill(s); if (real) skillProf[real] = 1; });
    // ── sub-choices (DNDCH): skills / expertise / saves / granted spells / proficiency text ──
    const fx = choiceEffects();
    fx.skills.forEach((s) => { const real = matchSkill(s); if (real && !skillProf[real]) skillProf[real] = 1; });
    fx.saves.forEach((a) => { saveProf[a] = true; });
    // ── level-gated class choices (DNDCH.classChoiceSpecs) ──
    const classFx = {}; classBreakdown().forEach((cl) => { if (cl.cls) classFx[cl.cls] = classFxFor(cl.cls) || { skills:[], expertise:[], languages:[], profs:[], feats:[], features:[], mastery:[], spells:[], extraCantrips:0, orders:{} }; });
    Object.keys(classFx).forEach((k) => classFx[k].skills.forEach((s) => { const real = matchSkill(s); if (real && !skillProf[real]) skillProf[real] = 1; }));
    allExpertise().forEach((s) => { const real = matchSkill(s); if (real) skillProf[real] = 2; });
    // ── feats: background origin feat + fighting styles + advancement (B1) ──
    const addedFeats = [];
    if (b && b.feat) addedFeats.push(b.feat);
    Object.keys(classFx).forEach((k) => classFx[k].feats.forEach((f) => { if (addedFeats.indexOf(f) < 0) addedFeats.push(f); }));
    (st.advances || []).forEach((av) => { if (av.mode === "feat" && av.feat) addedFeats.push(av.feat); });
    // the choices store the sheet keeps (so feature entries can show the picks and re-derive granted spells)
    const choices = {};
    if (st.species) choices.species = st.spChoices;
    if (b && b.feat) choices["feat:" + b.feat] = st.bgChoices;
    (st.advances || []).forEach((av) => { if (av.mode === "feat" && av.feat) choices["feat:" + av.feat] = av.choices || {}; });
    // a Human's Versatile feat is a real feat on the sheet too
    if (ch && st.species) speciesSpecs().forEach((s) => { if (s.kind === "feat" && st.spChoices[s.key]) { const fn = st.spChoices[s.key]; if (addedFeats.indexOf(fn) < 0) addedFeats.push(fn); choices["feat:" + fn] = ch.subState(st.spChoices, s.key); } });
    // B12/B14: class choice state under "class:<Class>" (orders, invocations, metamagic…); Weapon Mastery under choices.mastery
    const mastery = [];
    classBreakdown().forEach((cl) => { if (!cl.cls) return; const state = classState(cl.cls); if (Object.keys(state).length) choices["class:" + cl.cls] = JSON.parse(JSON.stringify(state)); classFx[cl.cls].mastery.forEach((w) => { if (mastery.indexOf(w) < 0) mastery.push(w); }); });
    if (mastery.length) choices.mastery = mastery;
    // HP: very first level = max die; every level after = its own class's average. (+ feat HP, e.g. Tough)
    let featHP = 0;
    addedFeats.forEach((fn) => { const fe = CALC().featEffects(fn, num(st.level)); featHP += fe.hpBonus; });
    let hp = 0; const conMod = mod(sc.CON); let firstLvl = true;
    classBreakdown().forEach((cl) => { const cc = classDataByName(cl.cls); const hd = cc ? cc.hitDie : 8; for (let L=1; L<=cl.level; L++){ hp += (firstLvl ? hd : Math.floor(hd/2)+1) + conMod; firstLvl = false; } });
    if (sp && (sp.traits || []).some((t) => /dwarven toughness/i.test(t.name))) hp += num(st.level);   // +1 HP per level
    hp = Math.max(1, hp + featHP);
    const speed = sp ? sp.speed : 30;
    // proficiency text: armor / weapons / tools per class, then tools, languages, choice-granted ones
    const profBits = [];
    classBreakdown().forEach((cl, i) => { const cc = classDataByName(cl.cls); if (!cc || !cc.proficiencies) return; const bits = []; ["armor","weapons"].forEach((k) => { if (cc.proficiencies[k] && cc.proficiencies[k].length) bits.push(cc.proficiencies[k].join(", ")); }); if (bits.length) profBits.push((i ? cl.cls + ": " : "") + bits.join(", ")); classFx[cl.cls].profs.forEach((p) => profBits.push(p)); });
    const tools = allToolNames(); if (tools.length) profBits.push("Tools: " + tools.join(", "));
    const languages = allLanguages(); profBits.push("Languages: " + languages.join(", "));
    if (fx.profs.length) profBits.push(fx.profs.join(", "));   // tools / instruments / weapons chosen through feats and traits
    // Species + lineage traits are populated by the sheet's autoFeatures() from the saved
    // species/lineage; class-choice features (orders, invocations, metamagic, maneuvers…) are custom entries.
    const customFeatures = [];
    Object.keys(classFx).forEach((k) => classFx[k].features.forEach((f) => customFeatures.push({ name: f.name, desc: f.desc || "", meta: f.meta || "Class Feature" })));
    // starting equipment (class package or gold, background package or gold)
    const r = resolvePackages(); const inv = r.inv; let gp = r.gp;
    if (st.equipChoice === "gold") gp += parseEquip(c).gold;
    if (b && st.bgEquip === "gold") gp += parseEquip(b.equipment).gold;
    // B11: equip armor/shield (the sheet computes AC from them) and weapons (attack rows).
    const armorNames = new Set((D.armor() || []).map((a) => String(a.name).toLowerCase()));
    const attacks = []; const wtok = weaponTokens();
    const ridBase = "rid_bld" + Date.now().toString(36);
    // Equip a sensible loadout, not every weapon in the pack: one melee weapon (one-handed if
    // the package has a shield), a second Light one for two-weapon fighting when there's no
    // shield, and one ranged weapon. The rest stay in the pack to equip later.
    const hasShieldPkg = inv.some((it) => it.ref && /^shield$/i.test(it.ref));
    const wOf = (it) => it.ref ? D.weapons().find((x) => norm(x.name) === norm(it.ref)) : null;
    const isLight = (w) => (w.properties || []).some((p) => /^light/i.test(p));
    const isTwoH = (w) => (w.properties || []).some((p) => /two-handed/i.test(p));
    const pick = new Set(); let melee = null, ranged = null, offhand = null;
    inv.forEach((it) => { const w = wOf(it); if (!w) return;
      if (w.kind === "Ranged") { if (!ranged && !(hasShieldPkg && isTwoH(w) && melee)) ranged = it; return; }
      if (!melee) { if (!(hasShieldPkg && isTwoH(w))) melee = it; }
      else if (!offhand && !hasShieldPkg && isLight(w) && isLight(wOf(melee)) && it !== melee) offhand = it;
    });
    [melee, offhand, ranged].forEach((it) => { if (it) pick.add(it); });
    inv.forEach((it, i) => {
      it.rid = it.rid || (ridBase + "_" + i);
      if (it.ref && armorNames.has(String(it.ref).toLowerCase())) it.equipped = true;
      const w = it.ref ? D.weapons().find((x) => norm(x.name) === norm(it.ref)) : null;
      if (w && pick.has(it) && !attacks.some((a) => a.weapon === w.name)) {
        it.equipped = true;
        const finesse = (w.properties || []).some((p) => /finesse/i.test(p));
        const abil = w.kind === "Ranged" ? "DEX" : (finesse ? (mod(sc.DEX) > mod(sc.STR) ? "DEX" : "STR") : "STR");
        attacks.push({ name: it.name, abil, prof: ch ? ch.weaponProficient(w, wtok) : true, bonus: 0, damage: w.damage, type: w.damageType, weapon: w.name, rid: it.rid, mastery: w.mastery || "" });
      }
    });
    const ac = acFromInventory(inv, sc);
    // spells: per caster class (a Wizard's spellbook: the first `prepared` picks start prepared)
    const spellsKnown = []; const profiles = [];
    casterEntries().forEach((cl) => {
      const cf = castingFor(cl), p = picksFor(cl.cls); profiles.push(cf);
      p.cantrips.forEach((n) => { if (!spellsKnown.some((x) => norm(x.name) === norm(n))) spellsKnown.push({ name:n, prepared:true, src:"class", ability: cf.ability, source: cl.cls }); });
      const prep = isWizardEntry(cl) ? preparedFor(cl) : Infinity;
      p.spells.forEach((n, i) => { if (!spellsKnown.some((x) => norm(x.name) === norm(n))) spellsKnown.push({ name:n, prepared: i < prep, src:"class", ability: cf.ability, source: cl.cls }); });
      classFx[cl.cls].spells.forEach((g) => { if (!spellsKnown.some((x) => norm(x.name) === norm(g.name))) spellsKnown.push({ name: g.name, prepared:true, granted:true, src:"class", ability: cf.ability, source: g.source || cl.cls }); });
    });
    // spells granted by feat/trait choices (Magic Initiate, Fey Touched…): always prepared, flagged granted
    fx.spells.forEach((g) => { if (!spellsKnown.some((x) => norm(x.name) === norm(g.name))) spellsKnown.push({ name: g.name, prepared:true, granted:true, src:"feat", ability: g.ability || "", source: g.source || "" }); });
    // B13: a subclass caster (Eldritch Knight / Arcane Trickster) needs the sheet told
    // to show spells with the subclass's ability when no class of its own casts.
    const onlySubclassCasters = profiles.length > 0 && profiles.every((p) => p.source === "subclass");
    const spellAbility = profiles.length === 1 ? profiles[0].ability : (onlySubclassCasters ? profiles[0].ability : "");
    const subclassCasting = casterEntries().filter((cl) => castingFor(cl).source === "subclass").map((cl) => ({ cls: cl.cls, subclass: cl.subclass, type: castingFor(cl).type, ability: castingFor(cl).ability, list: castingFor(cl).list }));
    return {
      system:"DND", v:1, name: st.name, cls: st.cls, level: st.level, subclass: st.subclass,
      classLevels: classBreakdown(),
      species: st.species, background: st.background, alignment: st.alignment,
      scores: sc, saveProf, skillProf,
      speed: String(speed), ac: String(ac), hpCur: hp, hpMax: hp, hpTemp:0,
      hitdice: hitDiceString(), hdLeft: num(st.level),
      attacks, inventory: inv, gp: gp, sp:0, cp:0,
      proficiencies: profBits.join(" · "), notes:"",
      customFeatures, addedFeats, choices, spellsKnown, slotUsed:{},
      forceSpells: onlySubclassCasters, spellAbility,
      subclassCasting,
      lineage: st.lineage, size: st.size || (sp ? [].concat(sp.size || [])[0] || "" : ""), languages,
      options: { eberron: !!st.eberron, au: !!st.au }, manaUsed: 0, actionsUsed: 0,
    };
  }
  function apply() {
    const data = buildCharacter();
    if (typeof window.applySheet === "function") window.applySheet(data);
    if (document.getElementById("f-lineage")) document.getElementById("f-lineage").value = st.lineage || "";
    // sheet-side hooks that may not exist yet (languages / size / subclass casting live in the payload too)
    if (typeof window.setLanguages === "function") window.setLanguages(data.languages);
    if (typeof window.setSize === "function") window.setSize(data.size);
    if (typeof window.renderFeatures === "function") window.renderFeatures();
    if (typeof window.renderSpells === "function") window.renderSpells();
    if (typeof window.saveSheet === "function") window.saveSheet(true);
    if (typeof window.addLog === "function") window.addLog("Character Built", "", (st.name || st.cls || "Character") + " — " + (st.cls || "") + " " + st.level, "normal");
    close();
  }
  function norm(s) { return String(s == null ? "" : s).trim().toLowerCase(); }
  function matchSkill(name) { const n = norm(name); const s = D.skills().find((x) => norm(x.name) === n); return s ? s.name : null; }

  window.DNDB = { launch, close, next, back, _state: () => st, _build: buildCharacter };

  // builder-only styles (scoped by dndb- prefix)
  const css = document.createElement("style");
  css.textContent =
    ".dndb-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;margin:8px 0;}" +
    ".dndb-card{border:1px solid #3a3a41;border-radius:6px;background:#28282e;padding:8px 10px;cursor:pointer;transition:.1s;}" +
    ".dndb-card:hover{border-color:#9b1b22;}" +
    ".dndb-card.on{border-color:#e08a70;background:#33333c;box-shadow:0 0 0 1px #e08a70 inset;}" +
    ".dndb-card.small{padding:6px 8px;}.dndb-card.disabled{opacity:.5;cursor:default;}" +
    ".dc-title{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:14px;color:#f0e0d6;letter-spacing:.02em;}" +
    ".dc-sub{font-size:10px;color:#a99e90;margin-top:2px;font-family:'Barlow Condensed',sans-serif;letter-spacing:.03em;text-transform:uppercase;}" +
    ".dc-sub.dc-plain{text-transform:none;letter-spacing:0;font-size:12px;color:#cdc3b6;line-height:1.4;}" +
    ".dndb-note{font-size:12px;color:#cdc3b6;line-height:1.5;margin-top:8px;border-left:3px solid #9b1b22;padding:4px 0 4px 10px;}" +
    ".dndb-seg{display:flex;gap:0;border:1px solid #3a3a41;border-radius:5px;overflow:hidden;margin-bottom:12px;}" +
    ".dndb-seg-btn{flex:1;padding:8px;background:#202027;color:#a99e90;border:none;cursor:pointer;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12px;letter-spacing:.06em;text-transform:uppercase;}" +
    ".dndb-seg-btn.on{background:#9b1b22;color:#fff;}" +
    ".dndb-abil-rows{display:flex;flex-direction:column;gap:6px;margin:8px 0;}" +
    ".dndb-abil-row{display:flex;align-items:center;gap:10px;}" +
    ".dar-name{flex:1;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:14px;color:#ece3d6;}" +
    ".dar-val{font-family:'Share Tech Mono',monospace;font-size:18px;font-weight:700;color:#e08a70;min-width:28px;text-align:center;}" +
    ".dndb-pm{width:30px;height:30px;background:#9b1b22;color:#fff;border:none;border-radius:4px;font-size:16px;cursor:pointer;}" +
    ".dndb-pb-head{font-size:13px;color:#cdc3b6;margin-bottom:6px;}.dndb-pb-head b{color:#e08a70;}" +
    ".dndb-totals,.dr-scores{display:flex;gap:6px;flex-wrap:wrap;margin-top:12px;}" +
    ".drs{border:1px solid #3a3a41;border-radius:6px;background:#28282e;padding:5px 8px;text-align:center;min-width:52px;}" +
    ".drs-a{display:block;font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:800;color:#a99e90;letter-spacing:.06em;}" +
    ".drs-v{display:block;font-family:'Share Tech Mono',monospace;font-size:18px;font-weight:700;color:#f0e0d6;}" +
    ".drs-m{display:block;font-family:'Share Tech Mono',monospace;font-size:11px;color:#e08a70;}" +
    ".dndb-review .dr-line{font-size:13px;color:#cdc3b6;line-height:1.6;margin-top:6px;}.dndb-review b{color:#f0e0d6;}" +
    ".dndb-mc-rows{display:flex;flex-direction:column;gap:6px;margin:6px 0;}" +
    ".dndb-mc-row{display:flex;align-items:center;gap:8px;}" +
    ".dndb-mc-name{flex:1;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:14px;color:#ece3d6;}.dndb-mc-name small{color:#a99e90;font-weight:600;}" +
    ".dndb-mc-req{font-size:11px;color:#a99e90;}.dndb-mc-req.bad{color:#e08a70;font-weight:700;}" +
    ".dndb-mc-x{background:transparent;border:none;color:#a99e90;cursor:pointer;font-size:13px;}.dndb-mc-x:hover{color:#e08a70;}" +
    ".dndb-spsec{border-top:1px solid #332c2c;margin-top:8px;}" +
    ".dndb-opt{border:1px solid #5a3f7a;border-radius:6px;background:#231a2e;padding:9px 11px;margin:0 0 12px;cursor:pointer;transition:.1s;}" +
    ".dndb-opt:hover{border-color:#7b4fb0;}" +
    ".dndb-opt.on{border-color:#a878e0;background:#2e2140;box-shadow:0 0 0 1px #a878e0 inset;}" +
    ".dndb-opt .dnb-main{display:flex;align-items:flex-start;gap:10px;}" +
    ".dnb-check{flex:0 0 20px;width:20px;height:20px;border:2px solid #7b4fb0;border-radius:4px;color:#fff;text-align:center;line-height:18px;font-size:13px;font-weight:800;margin-top:1px;}" +
    ".dndb-opt.on .dnb-check{background:#a878e0;border-color:#a878e0;}" +
    ".dnb-ttl{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:15px;color:#d9c2ff;letter-spacing:.02em;}" +
    ".dnb-sub{font-size:11px;color:#b7add0;line-height:1.45;margin-top:3px;}";
  document.head.appendChild(css);
})();
