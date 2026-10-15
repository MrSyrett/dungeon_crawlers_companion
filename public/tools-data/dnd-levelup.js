/* D&D 2024 Level-Up Wizard — window.DNDLU.
   Adds one level to an existing character (continue a class or multiclass into a
   new one), walking through HP, subclass, the level's class choices (Fighting
   Style, Expertise, Divine Order, Invocations, Metamagic, Maneuvers, Weapon
   Mastery…), ASI/feat, and new spells. Reads/writes the live sheet via
   window.getClassLevels/setClassLevels and the sheet helpers. */
(function () {
  "use strict";
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  const sgn = (n) => (n >= 0 ? "+" : "") + n;
  const num = (v) => { const n = parseInt(v, 10); return isNaN(n) ? 0 : n; };
  const norm = (s) => String(s == null ? "" : s).trim().toLowerCase();
  const ABIL = ["STR","DEX","CON","INT","WIS","CHA"];
  const ABIL_NAME = { STR:"Strength", DEX:"Dexterity", CON:"Constitution", INT:"Intelligence", WIS:"Wisdom", CHA:"Charisma" };
  // Shared caster/spell/ASI math (window.DNDCALC, loaded before this script).
  const RULES = () => window.DNDCALC || {};
  // Match a spell to a spell list, honoring aliases (Artificer→Wizard).
  const _spellInList = (s, listName) => RULES().spellInList
    ? RULES().spellInList(s, listName)
    : (s.classes || []).some((n) => norm(n) === norm(listName));

  const D = {
    classes: () => window.DND_CLASSES || [], feats: () => window.DND_FEATS || [],
    spells: () => window.DND_SPELLS || [], tables: () => window.DND_TABLES || {},
  };
  const classByName = (n) => D.classes().find((c) => norm(c.name) === norm(n)) || null;

  let lu = null, ctx = null, step = 0, STEPS = [];

  function curClasses(){
    let cur = (window.getClassLevels && window.getClassLevels()) || [];
    if(!cur.length){ const n = ($("f-class").value || "").trim(); if(n) cur = [{ cls:n, subclass:($("f-subclass").value || "").trim(), level: Math.max(1, num($("f-level").value) || 1) }]; }
    return cur.map((c) => ({ cls:c.cls, subclass:c.subclass || "", level: num(c.level) || 1 }));
  }
  const totalOf = (arr) => arr.reduce((s,c) => s + num(c.level), 0);
  const summaryOf = (arr) => arr.map((c) => c.cls + " " + c.level).join(" / ");
  // Hit-dice pool string from a class breakdown, grouped by die size (C1).
  function hitDiceStr(classLevels){
    const byDie = {};
    (classLevels||[]).forEach((cl) => { const c = classByName(cl.cls); const die = c ? c.hitDie : 8; byDie[die] = (byDie[die]||0) + num(cl.level); });
    return Object.keys(byDie).map(Number).sort((a,b)=>b-a).map((d)=>byDie[d]+"d"+d).join(" + ");
  }

  // ── class-table helpers (delegated to the shared module) ────────────────
  const grantsASI = (cls, newLevel) => RULES().grantsASI(cls, newLevel);
  function knownSpellSet(){ try { return new Set((window.getSpellsKnown ? window.getSpellsKnown() : []).map((s) => norm(s.name))); } catch(e){ return new Set(); } }
  const CH = () => window.DNDCH || null;
  // The sheet's stored choice state for a class ("class:<Class>"), copied.
  function storedClassState(cls){ try { const all = window.getChoices ? window.getChoices() : {}; return JSON.parse(JSON.stringify(all["class:" + cls] || {})); } catch(e){ return {}; } }
  function storedMastery(){ try { const all = window.getChoices ? window.getChoices() : {}; return Array.isArray(all.mastery) ? all.mastery.slice() : []; } catch(e){ return []; } }
  // Weapon / armor proficiency tokens from every class the character has (plus the new one).
  function profTokens(kind){ const out = []; const all = curClasses().map((c) => c.cls); if(all.indexOf(lu.targetCls) < 0) all.push(lu.targetCls); all.forEach((n) => { const c = classByName(n); ((c && c.proficiencies && c.proficiencies[kind]) || []).forEach((t) => out.push(t)); }); try { const txt = ($("f-proficiencies") || {}).value || ""; txt.split(/\s*[·,]\s*/).forEach((t) => { if(t) out.push(t.trim()); }); } catch(e){} return out; }

  // Build the context for the chosen class: what this level grants.
  function buildCtx(){
    const cur = curClasses();
    const existing = cur.find((c) => norm(c.cls) === norm(lu.targetCls));
    const c = classByName(lu.targetCls);
    const isNew = !existing;
    const newLevel = isNew ? 1 : existing.level + 1;
    const hitDie = c ? c.hitDie : 8;
    const sub = lu.subclass || (existing ? existing.subclass : "");
    const needSub = !!(c && !(existing && existing.subclass) && newLevel >= (c.subclassLevel || 3) && (c.subclasses||[]).length);
    // Casting profile: the class's own, or its subclass's (Eldritch Knight / Arcane Trickster — B13).
    const cf = c && RULES().castingFor ? RULES().castingFor(c, sub) : null;
    // This level's class choices (B12): specs whose count grew at the new level. Earlier
    // picks come from the sheet's stored state and are locked in the picker.
    const stored = storedClassState(lu.targetCls);
    let specs = [];
    if(CH() && c){
      const all = CH().classChoiceSpecs(c.name, sub, newLevel, { allowSrc: () => true, weaponTokens: profTokens("weapons"), level: totalOf(cur) + 1, stored }, lu.choices);
      specs = all.filter((s) => (s.count || 1) > (s.prev || 0)).map((s) => Object.assign({}, s, { locked: CH().vals(stored, s.key) }));
    }
    // an Order chosen this level (Thaumaturge / Magician) adds a cantrip
    let extraCantrip = 0;
    if(CH() && c){ const fx = CH().classChoiceEffects(specs, lu.choices); extraCantrip = fx.extraCantrips; }
    const newCantrips = cf ? Math.max(0, cf.cantrips(newLevel) - cf.cantrips(newLevel-1)) + extraCantrip : 0;
    // Wizards fill their spellbook (6 at level 1, +2 every level after); other casters pick
    // the delta in their prepared/known count.
    const newSpells = !cf ? 0
      : (norm(lu.targetCls) === "wizard" ? (RULES().spellbookAt(c, newLevel) - RULES().spellbookAt(c, newLevel-1)) : Math.max(0, cf.prepared(newLevel) - cf.prepared(newLevel-1)));
    // Spell LEVEL you can learn is capped by THIS class's own level (not the combined
    // multiclass caster level, which only governs how many slots you get).
    const maxSL = cf ? cf.maxLevel(newLevel) : 0;
    return { c, isNew, newLevel, hitDie, sub, needSub, cf, specs, asi: grantsASI(lu.targetCls, newLevel), newCantrips, newSpells, maxSL };
  }
  function computeSteps(){
    STEPS = ["Class"];
    if(ctx.needSub) STEPS.push("Subclass");
    STEPS.push("HP");
    if(ctx.specs.length) STEPS.push("Choices");
    if(ctx.asi) STEPS.push("ASI");
    if(ctx.newCantrips > 0 || ctx.newSpells > 0) STEPS.push("Spells");
    STEPS.push("Review");
  }
  function refresh(){ ctx = buildCtx(); computeSteps(); render(); }

  // ── modal shell ────────────────────────────────────────────────────────
  function ensureModal(){
    if($("dndlu-overlay")) return;
    const ov = document.createElement("div");
    ov.className = "ov"; ov.id = "dndlu-overlay";
    ov.innerHTML =
      '<div class="modal wide" style="max-width:640px;">' +
        '<div class="modal-hd"><div class="ttl">⬆ Level Up <span id="dndlu-step" style="color:#8ad4ff;font-size:12px;letter-spacing:.08em;margin-left:8px;"></span></div><button class="x" onclick="DNDLU.close()">✕</button></div>' +
        '<div class="modal-bd" id="dndlu-body"></div>' +
        '<div class="modal-ft"><div><button class="m-btn ghost" id="dndlu-back" onclick="DNDLU.back()">← Back</button></div>' +
        '<div style="display:flex;gap:8px;"><button class="m-btn ghost" onclick="DNDLU.close()">Cancel</button><button class="m-btn" id="dndlu-next" onclick="DNDLU.next()">Next →</button></div></div>' +
      '</div>';
    // Backdrop click does NOT close the wizard (B15) — losing a half-built level is worse than an extra click on ✕.
    document.body.appendChild(ov);
  }
  function launch(){
    ensureModal();
    const cur = curClasses();
    if(!cur.length){ if(window.addLog) window.addLog("Level Up","✗","Build or set a class first","fumble"); return; }
    if(totalOf(cur) >= 20){ if(window.addLog) window.addLog("Level Up","✗","Already at level 20","fumble"); return; }
    // ensure the character is in managed mode so classLevels drives the engine
    if(window.setClassLevels) window.setClassLevels(cur);
    lu = { targetCls: cur[0].cls, subclass:"", hp:null, hpMethod:"avg", asiMode:"asi", asi:{}, feat:"", featChoices:{}, choices:{}, pickedCantrips:[], pickedSpells:[], spellsAvail:true };
    lu.choices = storedClassState(lu.targetCls);
    ctx = buildCtx(); computeSteps(); step = 0;
    $("dndlu-overlay").classList.add("open"); render();
  }
  function close(){ const ov = $("dndlu-overlay"); if(ov) ov.classList.remove("open"); }
  function next(){ if(!canProceed()) return; if(STEPS[step] === "Review"){ apply(); return; } step = Math.min(STEPS.length-1, step+1); render(); }
  function back(){ if(step === 0) return; step -= 1; render(); }

  function render(){
    ensureModal();
    $("dndlu-step").textContent = step === 0 ? "" : "Step " + step + " of " + (STEPS.length-1) + " — " + STEPS[step];
    $("dndlu-back").style.visibility = step === 0 ? "hidden" : "visible";
    $("dndlu-next").textContent = STEPS[step] === "Review" ? "Apply level ✓" : "Next →";
    const fn = { Class:rClass, Subclass:rSubclass, HP:rHP, Choices:rChoices, ASI:rASI, Spells:rSpells, Review:rReview }[STEPS[step]];
    const body = $("dndlu-body");
    // Keep scroll on in-step re-renders (picking a spell/ASI); reset only on step change.
    const sameStep = render._step === step, prevScroll = body.scrollTop;
    body.innerHTML = fn();
    body.scrollTop = sameStep ? prevScroll : 0;
    render._step = step; wire();
  }
  const card = (attr, on, title, sub) => '<div class="dndb-card' + (on?" on":"") + '" ' + attr + '><div class="dc-title">' + esc(title) + '</div>' + (sub?'<div class="dc-sub">' + esc(sub) + '</div>':"") + '</div>';

  // ── steps ──────────────────────────────────────────────────────────────
  function rClass(){
    const cur = curClasses();
    let h = '<p class="m-hint">You\'re level ' + totalOf(cur) + ' (' + esc(summaryOf(cur)) + '). Add a level to a class you already have, or multiclass into a new one.</p>';
    h += '<span class="m-lbl">Continue a class</span><div class="dndb-grid">';
    cur.forEach((cl) => { const c = classByName(cl.cls); h += card('data-cls="' + esc(cl.cls) + '"', norm(lu.targetCls)===norm(cl.cls) && !lu._new, cl.cls, 'Level ' + cl.level + ' → ' + (cl.level+1) + (c?' · d'+c.hitDie:'')); });
    h += "</div>";
    // multiclass options: classes not yet taken (13+ prerequisites shown, flagged when unmet, never blocked)
    const taken = new Set(cur.map((c) => norm(c.cls)));
    const others = D.classes().filter((c) => !taken.has(norm(c.name)));
    if(others.length){
      h += '<span class="m-lbl">Multiclass (new class, level 1)</span><div class="dndb-grid">';
      others.forEach((c) => { const on = lu._new && norm(lu.targetCls)===norm(c.name); const p = RULES().multiclassPrereq ? RULES().multiclassPrereq(c.name, curScores()) : { text:"", met:true }; h += card('data-newcls="' + esc(c.name) + '"', on, c.name, 'd' + c.hitDie + ' · ' + (p.text ? p.text + (p.met ? "" : " ⚠") : (c.primaryAbility||[]).join("/"))); });
      h += "</div>";
      h += '<p class="m-hint" style="margin-top:6px;">Multiclassing requires 13+ in the abilities shown (⚠ = not met with your current scores) — the wizard won\'t block you, so mind the prerequisites.</p>';
    }
    return h;
  }
  function rSubclass(){
    const c = ctx.c;
    let h = '<p class="m-hint">Your ' + esc(lu.targetCls) + ' chooses a ' + esc(c.subclassLabel || "subclass") + ' at level ' + ctx.newLevel + '.</p><div class="dndb-grid">';
    (c.subclasses||[]).forEach((s) => h += card('data-sub="' + esc(s.name) + '"', norm(lu.subclass)===norm(s.name), s.name, (s.source||"").toUpperCase() + (s.spellcasting ? " · " + s.spellcasting + " caster (" + (s.spellcastingAbility || "INT") + ")" : "")));
    h += "</div>";
    const sub = (c.subclasses||[]).find((s) => norm(s.name)===norm(lu.subclass));
    if(sub) h += CH() ? CH().subclassDetail(c, sub, ctx.newLevel) : '<div class="dndb-note">' + esc(sub.flavor || "") + '</div>';
    return h;
  }
  function rHP(){
    const con = conMod(), avg = Math.floor(ctx.hitDie/2) + 1, extra = hpExtras();
    let h = '<p class="m-hint">Gain Hit Points for your new ' + esc(lu.targetCls) + ' level (d' + ctx.hitDie + ' + Constitution' + (extra.label ? ' + ' + esc(extra.label) : '') + ').</p>';
    h += '<div class="dndb-seg">' +
      '<button class="dndb-seg-btn' + (lu.hpMethod==="avg"?" on":"") + '" data-hpm="avg">Average (' + (avg + con + extra.n) + ')</button>' +
      '<button class="dndb-seg-btn' + (lu.hpMethod==="roll"?" on":"") + '" data-hpm="roll">Roll d' + ctx.hitDie + '</button></div>';
    if(lu.hpMethod === "roll"){
      h += '<div style="text-align:center;margin:10px 0;">';
      if(lu.hp == null) h += '<button class="m-btn" data-roll="1">🎲 Roll d' + ctx.hitDie + '</button>';
      else h += '<div class="dndb-pb-head" style="font-size:15px;">Rolled <b>' + (lu.hp - con) + '</b> ' + sgn(con) + ' CON' + (extra.n ? ' + ' + extra.n : '') + ' = <b>' + (lu.hp + extra.n) + ' HP</b></div><button class="m-btn ghost" data-roll="1" style="margin-top:6px;">Roll again</button>';
      h += '</div>';
    }
    const gain = hpGain();
    h += '<div class="dndb-note">New max HP: <b>' + curMaxHP() + '</b> + <b>' + gain + '</b> = <b>' + (curMaxHP() + gain) + '</b></div>';
    return h;
  }
  // B12: the class choices this level grants.
  function rChoices(){
    let h = '<p class="m-hint">Level ' + ctx.newLevel + ' ' + esc(lu.targetCls) + (ctx.sub ? ' (' + esc(ctx.sub) + ')' : '') + ' choices. Picks from earlier levels are shown locked.</p>';
    h += CH().renderChoices(ctx.specs.map((s) => Object.assign({}, s, { label: s.label + ((s.prev || 0) > 0 ? ' — choose ' + ((s.count || 1) - (s.prev || 0)) + ' more' : '') })), lu.choices, chCtx(), "class");
    return h;
  }
  function rASI(){
    let h = '<p class="m-hint">This level grants an Ability Score Improvement or a feat.</p>';
    h += '<div class="dndb-seg"><button class="dndb-seg-btn' + (lu.asiMode==="asi"?" on":"") + '" data-asimode="asi">Ability Scores</button><button class="dndb-seg-btn' + (lu.asiMode==="feat"?" on":"") + '" data-asimode="feat">Feat</button></div>';
    if(lu.asiMode === "asi"){
      const total = ABIL.reduce((s,a) => s + (lu.asi[a]||0), 0);
      h += '<p class="m-hint">Add +2 to one score, or +1 to two (max 20). Assigned <b style="color:#8ad4ff;">' + total + '/2</b>.</p><div class="dndb-abil-rows">';
      ABIL.forEach((a) => {
        const base = curScore(a), add = lu.asi[a]||0;
        h += '<div class="dndb-abil-row"><span class="dar-name">' + ABIL_NAME[a] + ' <small style="color:#a99e90;">' + base + (add?' +'+add:'') + '</small></span>' +
          '<button class="dndb-pm" data-asi="' + a + '" data-d="-1">−</button><span class="dar-val">' + add + '</span><button class="dndb-pm" data-asi="' + a + '" data-d="1">+</button></div>';
      });
      h += "</div>";
    } else {
      // B6: General (level 4+) / Origin / Epic Boon (19+) feats; never Fighting Styles; owned
      // non-repeatable feats drop out; unmet prerequisites are greyed with the reason.
      h += '<span class="m-lbl">Choose a feat</span>' + (CH() ? CH().featSelectHTML('id="dndlu-feat" class="m-input"', lu.feat, featCtx(), {}) : '');
      const f = D.feats().find((x) => x.name === lu.feat);
      if(f){
        h += CH() ? CH().featDetail(f.name) : '<div class="dndb-note">' + esc((f.benefits||[]).join(" ") || f.description || "") + '</div>';
        // the feat's own picks (ability +1, spells, skills, …) happen right here
        const specs = featSpecs(); if(specs.length) h += CH().renderChoices(specs, lu.featChoices, chCtx(), "feat");
      }
    }
    return h;
  }
  function rSpells(){
    const cf = ctx.cf, known = knownSpellSet();
    const avail = lu.spellsAvail !== false, lists = RULES().listsFor ? RULES().listsFor(cf.list, ctx.newLevel) : [cf.list], inList = (s) => lists.some((l) => _spellInList(s, l));   // Bard 10+: Magical Secrets
    // Spells the character already knows are left out entirely — you only choose
    // from what's new — so spells added freely from the sheet's Spellbook don't
    // count toward this level's "choose N".
    let h = '<p class="m-hint">Your ' + esc(lu.targetCls) + (cf.source === "subclass" ? ' (' + esc(ctx.sub) + ')' : '') + ' learns new magic at this level — ' + esc(cf.list) + ' spell list, ' + esc(ABIL_NAME[cf.ability] || cf.ability) + '.</p>';
    h += '<label class="brow-check spl-avail"><input type="checkbox" data-spavail' + (avail ? " checked" : "") + '> Spells available to me</label>';
    if(ctx.newCantrips > 0){
      h += '<span class="m-lbl">New cantrips — choose ' + ctx.newCantrips + ' <span style="color:#8ad4ff;">(' + lu.pickedCantrips.length + '/' + ctx.newCantrips + ')</span></span>';
      const cs = D.spells().filter((s) => s.level===0 && !known.has(norm(s.name)) && (avail ? inList(s) : true)).sort((a,b)=>a.name.localeCompare(b.name));
      h += RULES().spellPickerHTML(cs, {
        selected: (n) => lu.pickedCantrips.includes(n),
        disabledAdd: (s) => !inList(s) || lu.pickedCantrips.length >= ctx.newCantrips,
        emptyHTML: '<p class="spl-empty">No new cantrips available.</p>',
      });
    }
    if(ctx.newSpells > 0 && ctx.maxSL >= 1){
      const wiz = norm(lu.targetCls) === "wizard";
      h += '<span class="m-lbl">' + (wiz ? 'Spellbook — add ' + ctx.newSpells : 'New spells — choose ' + ctx.newSpells) + ' (up to level ' + ctx.maxSL + ') <span style="color:#8ad4ff;">(' + lu.pickedSpells.length + '/' + ctx.newSpells + ')</span></span>';
      const ss = D.spells().filter((s) => s.level>=1 && s.level<=ctx.maxSL && !known.has(norm(s.name)) && (avail ? inList(s) : true)).sort((a,b)=>(a.level-b.level)||a.name.localeCompare(b.name));
      h += RULES().spellPickerHTML(ss, {
        selected: (n) => lu.pickedSpells.includes(n),
        disabledAdd: (s) => !inList(s) || lu.pickedSpells.length >= ctx.newSpells,
        emptyHTML: '<p class="spl-empty">No new spells available.</p>',
      });
    }
    return h;
  }
  function rReview(){
    const cur = curClasses();
    let h = '<p class="m-hint">Confirm your new level.</p><div class="dndb-review">';
    h += '<div class="dr-line">' + (ctx.isNew ? 'Multiclass into <b>' + esc(lu.targetCls) + '</b> (level 1)' : '<b>' + esc(lu.targetCls) + '</b> ' + (ctx.newLevel-1) + ' → <b>' + ctx.newLevel + '</b>') + ' · new total level <b>' + (totalOf(cur)+1) + '</b></div>';
    if(lu.subclass) h += '<div class="dr-line">Subclass: <b>' + esc(lu.subclass) + '</b></div>';
    h += '<div class="dr-line">Hit Points: +<b>' + hpGain() + '</b> (→ ' + (curMaxHP()+hpGain()) + ')</div>';
    if(ctx.specs.length && CH()){ const s = CH().summary(ctx.specs, lu.choices); if(s) h += '<div class="dr-line">Class choices: <b>' + esc(s) + '</b></div>'; }
    if(ctx.asi){ h += '<div class="dr-line">' + (lu.asiMode==="feat" ? 'Feat: <b>' + esc(lu.feat || "—") + '</b>' + (CH() && lu.feat && CH().summary(featSpecs(), lu.featChoices) ? ' — ' + esc(CH().summary(featSpecs(), lu.featChoices)) : '') : 'Ability Scores: <b>' + (ABIL.filter((a)=>lu.asi[a]).map((a)=>a+" +"+lu.asi[a]).join(", ") || "—") + '</b>') + '</div>'; }
    const spells = lu.pickedCantrips.concat(lu.pickedSpells);
    if(spells.length) h += '<div class="dr-line">New spells: <b>' + esc(spells.join(", ")) + '</b></div>';
    h += "</div>";
    return h;
  }

  // ── helpers reading the live sheet ──────────────────────────────────────
  function curScore(a){ const el = $("sc-" + a); return el ? (num(el.value) || 10) : 10; }
  function curScores(){ const o = {}; ABIL.forEach((a) => o[a] = curScore(a)); return o; }
  function conMod(){ return Math.floor((curScore("CON") - 10) / 2); }
  // Max HP on the sheet is a contenteditable <span> (not an input): read/write textContent.
  const fieldGet = (el) => el ? ("value" in el ? el.value : el.textContent) : "";
  const fieldSet = (el, v) => { if(!el) return; if("value" in el) el.value = String(v); else el.textContent = String(v); };
  function curMaxHP(){ return num(fieldGet($("f-hp-max"))); }
  // ── sub-choices for the chosen feat (window.DNDCH) ───────────────────────
  function featSpecs(){ return (CH() && lu.asiMode === "feat" && lu.feat) ? CH().featSpecs(lu.feat, lu.featChoices) : []; }
  function chCtx(){
    const prof = [], expert = []; try { const sk = window.getSkillProf ? window.getSkillProf() : {}; Object.keys(sk).forEach((k) => { if(sk[k] > 0) prof.push(k); if(sk[k] > 1) expert.push(k); }); } catch(e){}
    // skills granted by this level's own picks (Primal Knowledge) count for Expertise too
    if(CH() && ctx && ctx.specs.length) CH().classChoiceEffects(ctx.specs, lu.choices).skills.forEach((s) => { if(prof.indexOf(s) < 0) prof.push(s); });
    return { prof, expert, level: totalOf(curClasses()) + 1 };
  }
  // Feat-prerequisite context from the live sheet (B6).
  function featCtx(){
    const owned = D.feats().filter((f) => { try { return window.hasFeature && window.hasFeature(f.name); } catch(e){ return false; } }).map((f) => f.name);
    const all = curClasses().map((c) => c.cls); if(all.indexOf(lu.targetCls) < 0) all.push(lu.targetCls);
    const caster = all.some((n) => { const c = classByName(n); return c && RULES().isCasterClass(c); }) || !!ctx.cf;
    const pact = all.some((n) => { const c = classByName(n); return c && c.spellcasting === "pact"; });
    return { level: totalOf(curClasses()) + 1, scores: curScores(), armor: profTokens("armor"), weapons: profTokens("weapons"), caster, pact, owned };
  }
  // Per-level HP riders the character already has: Tough (+2/level) and Dwarven Toughness (+1/level).
  // (Tough taken THIS level is covered by featEffects in apply, which adds every level at once.)
  function hpExtras(){
    let n = 0; const bits = [];
    const toughOwned = !!(window.hasFeature && window.hasFeature("Tough"));
    const choosingTough = ctx && ctx.asi && lu.asiMode === "feat" && norm(lu.feat || "") === "tough";
    if(toughOwned && !choosingTough){ n += 2; bits.push("Tough"); }
    if(window.hasFeature && window.hasFeature("Dwarven Toughness")){ n += 1; bits.push("Dwarven Toughness"); }
    return { n, label: bits.join(" + ") };
  }
  function hpGain(){ const base = lu.hpMethod === "roll" ? (lu.hp != null ? lu.hp : (Math.floor(ctx.hitDie/2)+1 + conMod())) : (Math.floor(ctx.hitDie/2) + 1 + conMod()); return Math.max(1, base) + hpExtras().n; }  // always at least 1 HP per level

  function wire(){
    const body = $("dndlu-body");
    const pickTarget = (cls, isNew) => { lu.targetCls = cls; lu._new = isNew; lu.subclass=""; lu.asi={}; lu.feat=""; lu.featChoices={}; lu.pickedCantrips=[]; lu.pickedSpells=[]; lu.choices = storedClassState(cls); refresh(); };
    body.querySelectorAll("[data-cls]").forEach((el) => el.addEventListener("click", () => pickTarget(el.dataset.cls, false)));
    body.querySelectorAll("[data-newcls]").forEach((el) => el.addEventListener("click", () => pickTarget(el.dataset.newcls, true)));
    // a subclass can change this level's choices (Battle Master maneuvers) and casting (Eldritch Knight)
    body.querySelectorAll("[data-sub]").forEach((el) => el.addEventListener("click", () => { lu.subclass = el.dataset.sub; lu.pickedCantrips=[]; lu.pickedSpells=[]; refresh(); }));
    body.querySelectorAll("[data-hpm]").forEach((el) => el.addEventListener("click", () => { lu.hpMethod = el.dataset.hpm; if(lu.hpMethod==="avg") lu.hp=null; render(); }));
    body.querySelectorAll("[data-roll]").forEach((el) => el.addEventListener("click", () => { lu.hp = Math.max(1, (1 + Math.floor(Math.random()*ctx.hitDie)) + conMod()); render(); }));
    body.querySelectorAll("[data-asimode]").forEach((el) => el.addEventListener("click", () => { lu.asiMode = el.dataset.asimode; render(); }));
    body.querySelectorAll("[data-asi]").forEach((el) => el.addEventListener("click", () => {
      const a = el.dataset.asi, d = num(el.dataset.d), cur = lu.asi[a]||0, total = ABIL.reduce((s,x)=>s+(lu.asi[x]||0),0);
      const nv = cur + d;
      if(nv < 0 || nv > 2) return;
      if(d > 0 && total >= 2) return;
      if(d > 0 && curScore(a) + nv > 20) return;
      lu.asi[a] = nv; if(!nv) delete lu.asi[a]; render();
    }));
    const fs = $("dndlu-feat"); if(fs) fs.addEventListener("change", () => { if(lu.feat !== fs.value) lu.featChoices = {}; lu.feat = fs.value; render(); });
    // "feat" root → the feat's picks; "class" root → this level's class choices (changing an Order can add a cantrip → rebuild ctx)
    if(CH()) CH().wireChoices(body, (root) => root === "feat" ? lu.featChoices : (root === "class" ? lu.choices : null), () => { if(STEPS[step] === "Choices") refresh(); else render(); });
    body.querySelectorAll("[data-spavail]").forEach((el) => el.addEventListener("change", () => { lu.spellsAvail = el.checked; render(); }));
    body.querySelectorAll("[data-sp-exp]").forEach((el) => el.addEventListener("click", (e) => { e.stopPropagation(); const row = el.closest("[data-sp]"); if(row){ row.classList.toggle("open"); const d = row.querySelector(".spl-desc"); if(d) d.hidden = !row.classList.contains("open"); } }));
    body.querySelectorAll("[data-sp-pick]").forEach((el) => el.addEventListener("click", () => {
      if(el.disabled) return;
      const n = el.getAttribute("data-sp-pick"), sp = D.spells().find((x) => x.name === n);
      const arr = (sp && sp.level === 0) ? lu.pickedCantrips : lu.pickedSpells;
      const i = arr.indexOf(n); if(i>=0) arr.splice(i,1); else arr.push(n);
      render();
    }));
  }
  function canProceed(){
    switch(STEPS[step]){
      case "Subclass": return !!lu.subclass;
      case "HP": return lu.hpMethod === "avg" || lu.hp != null;
      case "Choices": { if(!CH()) return true; const c = chCtx(); return ctx.specs.every((s) => { const n = Math.min(s.count || 1, (s.kind === "expertise" || s.kind === "skill") ? CH().specOptions(s, c).filter((o) => !o.taken).length : Infinity); return CH().vals(lu.choices, s.key).length >= n; }); }
      case "ASI": return lu.asiMode === "feat" ? (!!lu.feat && (!CH() || CH().complete(featSpecs(), lu.featChoices))) : ABIL.reduce((s,a)=>s+(lu.asi[a]||0),0) === 2;
      case "Spells": return lu.pickedCantrips.length >= ctx.newCantrips && lu.pickedSpells.length >= (ctx.maxSL>=1 ? ctx.newSpells : 0);
      default: return true;
    }
  }

  // Add a feature entry to the sheet's Features tab. The sheet's own addCustomFeature()
  // reads its input box, so a parameterised hook is needed: window.addCustomFeatureEntry(name, desc, meta).
  function addFeature(name, desc, meta){
    if(typeof window.addCustomFeatureEntry === "function") return window.addCustomFeatureEntry(name, desc, meta);
    if(typeof window.addCustomFeature === "function" && window.addCustomFeature.length >= 2) return window.addCustomFeature(name, desc, meta);
    if(window.addLog) window.addLog("Level Up", "", "Record on your sheet: " + name + (meta ? " (" + meta + ")" : ""), "normal");
  }

  // ── apply ──────────────────────────────────────────────────────────────
  function apply(){
    const cur = curClasses();
    if(ctx.isNew){ cur.push({ cls: lu.targetCls, subclass: lu.subclass || "", level: 1 }); }
    else { const e = cur.find((c) => norm(c.cls) === norm(lu.targetCls)); e.level += 1; if(lu.subclass) e.subclass = lu.subclass; }
    if(window.setClassLevels) window.setClassLevels(cur);
    // HP + a gained Hit Die (hpGain already includes Tough / Dwarven Toughness riders — B15)
    const gain = hpGain();
    const hpMax = $("f-hp-max"), hpCur = $("f-hp-cur");
    const bumpHP = (n) => { fieldSet(hpMax, num(fieldGet(hpMax)) + n); fieldSet(hpCur, num(fieldGet(hpCur)) + n); };
    bumpHP(gain);
    const hd = $("f-hd-left"); if(hd) hd.value = num(hd.value) + 1;
    // C1: rebuild the hit-dice pool string from the class breakdown (e.g. 3d10 + 2d6).
    const hdField = $("f-hitdice"); if(hdField) hdField.value = hitDiceStr(cur);
    // B12: this level's class choices → stored state + their effects
    if(ctx.specs.length && CH()){
      const before = storedClassState(lu.targetCls);
      const fxNew = CH().classChoiceEffects(ctx.specs, lu.choices);
      const fxOld = CH().classChoiceEffects(ctx.specs, before);
      const fresh = (list, key) => list.filter((x) => !fxOld[key].some((y) => (y.name || y) === (x.name || x)));
      fresh(fxNew.feats, "feats").forEach((f) => {
        const key = window.addFeatByName ? window.addFeatByName(f) : null;
        // a feat granted by a class choice (Lessons of the First Ones) applies its own picks too
        const fst = (fxNew.featStates || {})[f];
        if(fst && CH()){
          const fx2 = CH().featEffects(f, fst);
          ABIL.forEach((a) => { if(fx2.abil[a]){ const el = $("sc-" + a); if(el) el.value = Math.min(20, (num(el.value)||10) + fx2.abil[a]); } });
          fx2.skills.forEach((n) => { if(window.grantSkillProf) window.grantSkillProf(n, 1); });
          fx2.expertise.forEach((n) => { if(window.grantSkillProf) window.grantSkillProf(n, 2); });
          if(fx2.profs.length && window.appendProficiencies) window.appendProficiencies(fx2.profs.join(", "));
          fx2.spells.forEach((g) => { if(window.addGrantedSpell) window.addGrantedSpell(g.name, g.ability, g.source); });
          if(window.setChoice) window.setChoice(typeof key === "string" ? key : "feat:" + f, fst);
        }
      });
      fresh(fxNew.skills, "skills").forEach((n) => { if(window.grantSkillProf) window.grantSkillProf(n, 1); });
      fresh(fxNew.expertise, "expertise").forEach((n) => { if(window.grantSkillProf) window.grantSkillProf(n, 2); });
      const langs = fresh(fxNew.languages, "languages"); if(langs.length){ if(typeof window.addLanguages === "function") window.addLanguages(langs); else if(window.appendProficiencies) window.appendProficiencies("Languages: " + langs.join(", ")); }
      const profs = fresh(fxNew.profs, "profs"); if(profs.length && window.appendProficiencies) window.appendProficiencies(profs.join(", "));
      fresh(fxNew.features, "features").forEach((f) => addFeature(f.name, f.desc, f.meta));
      fresh(fxNew.spells, "spells").forEach((g) => { if(window.addGrantedSpell && ctx.cf) window.addGrantedSpell(g.name, ctx.cf.ability, "class"); else if(window.addSpellByName) window.addSpellByName(g.name); });
      if(fxNew.mastery.length && window.setChoice){ const m = storedMastery(); fxNew.mastery.forEach((w) => { if(m.indexOf(w) < 0) m.push(w); }); window.setChoice("mastery", m); }
      if(window.setChoice) window.setChoice("class:" + lu.targetCls, Object.assign({}, before, lu.choices));
    }
    // ASI / feat
    if(ctx.asi){
      const oldCon = conMod();
      if(lu.asiMode === "asi"){ ABIL.forEach((a) => { if(lu.asi[a]){ const el = $("sc-" + a); if(el) el.value = Math.min(20, (num(el.value)||10) + lu.asi[a]); } }); }
      else if(lu.feat && window.addFeatByName){
        const featKey = window.addFeatByName(lu.feat);   // "feat:<Name>" or "feat:<Name>#2" for a repeated feat
        // C4: apply the feat's structured effects (Tough HP) to the live sheet.
        const fe = RULES().featEffects(lu.feat, totalOf(cur));
        if(fe.hpBonus) bumpHP(fe.hpBonus);
        // The feat's chosen/fixed +1, skills, expertise, saves, proficiencies and granted spells.
        if(CH()){
          const fx = CH().featEffects(lu.feat, lu.featChoices);
          const f = D.feats().find((x) => x.name === lu.feat); const cap = (f && f.category === "Epic Boon") ? 30 : 20;   // B10: boons may raise a score to 30
          ABIL.forEach((a) => { if(fx.abil[a]){ const el = $("sc-" + a); if(el) el.value = Math.min(cap, (num(el.value)||10) + fx.abil[a]); } });
          fx.skills.forEach((n) => { if(window.grantSkillProf) window.grantSkillProf(n, 1); });
          fx.expertise.forEach((n) => { if(window.grantSkillProf) window.grantSkillProf(n, 2); });
          fx.saves.forEach((a) => { if(window.grantSaveProf) window.grantSaveProf(a); });
          if(fx.profs.length && window.appendProficiencies) window.appendProficiencies(fx.profs.join(", "));
          fx.spells.forEach((g) => { if(window.addGrantedSpell) window.addGrantedSpell(g.name, g.ability, g.source); else if(window.addSpellByName) window.addSpellByName(g.name); });
          if(window.setChoice) window.setChoice(typeof featKey === "string" ? featKey : "feat:" + lu.feat, lu.featChoices);
        }
      }
      // A CON increase (from the ASI or a feat) raises HP for EVERY level, retroactively.
      const dCon = conMod() - oldCon;
      if(dCon > 0) bumpHP(dCon * totalOf(cur));
    }
    // spells (a subclass caster's spells carry its ability so the sheet uses INT for an Eldritch Knight)
    lu.pickedCantrips.concat(lu.pickedSpells).forEach((n) => { if(window.addSpellByName) window.addSpellByName(n, lu.targetCls); });
    if(ctx.cf && ctx.cf.source === "subclass"){
      try { (window.getSpellsKnown ? window.getSpellsKnown() : []).forEach((sk) => { if(lu.pickedCantrips.concat(lu.pickedSpells).some((n) => norm(n) === norm(sk.name))){ sk.ability = ctx.cf.ability; sk.src = "class"; } }); } catch(e){}
      if(typeof window.setSubclassCasting === "function") window.setSubclassCasting(lu.targetCls, ctx.sub, { type: ctx.cf.type, ability: ctx.cf.ability, list: ctx.cf.list });
    }
    // refresh everything
    ["renderFeatures","renderResources","renderSlots","renderSpells","recalc","updateHitDiceUI"].forEach((fn) => { if(typeof window[fn] === "function") window[fn](); });
    if(window.saveSheet) window.saveSheet(true);
    if(window.addLog) window.addLog("Level Up", "⬆ " + (totalOf(cur)), summaryOf(cur) + (lu.subclass ? " · " + lu.subclass : ""), "crit");
    close();
  }

  window.DNDLU = { launch, close, next, back, _state: () => ({ lu, ctx, STEPS }) };
})();
