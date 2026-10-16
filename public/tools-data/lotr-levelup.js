/* The Lord of the Rings Roleplaying — Level-Up Wizard (window.LOTRLU).
   Modelled on dnd-levelup.js. Adds one level (cap 10) to the hero's single calling:
   HP (roll or the fixed average, + CON, + Endurance of the Dwarves / Hardiness /
   Sterner Than Steel), the specialisation at 3rd, a virtue — or a craft slot + craft
   at the calling's craft-or-virtue levels — with its ability increase, a reward at
   3rd/5th/7th/9th attached to a chosen item, Expertise (Scholar 3/10, Treasure
   Hunter 9), the Warden's new favoured foes and warded lands, the Scholar's new craft,
   and new fighting styles. It reads the live sheet with collectSheet(), edits that
   record and hands it back through applySheet() — so the sheet's own automation
   re-derives everything else. Multicalling is not modelled (single calling only). */
(function () {
  "use strict";
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  const sgn = (n) => (n >= 0 ? "+" : "") + n;
  const num = (v) => { const n = parseInt(v, 10); return isNaN(n) ? 0 : n; };
  const norm = (s) => String(s == null ? "" : s).trim().toLowerCase();
  const mod = (s) => Math.floor((num(s) - 10) / 2);
  const ABIL = ["STR","DEX","CON","INT","WIS","CHA"];
  const C = () => window.LOTRCORE || {};
  const T = () => window.LOTR_TABLES || {};
  const MAX = () => num(T().maxLevel) || 10;

  let d = null, lu = null, ctx = null, step = 0, STEPS = [];

  function buildCtx() {
    const c = C().callingByName(d.calling || d.cls);
    const newLevel = num(d.level) + 1;
    const sub = lu.subclass || d.subclass || "";
    const needSub = !!(c && !d.subclass && newLevel >= (c.subclassLevel || 3) && (c.subclasses || []).length);
    const virtue = !!(c && (c.virtueLevels || []).indexOf(newLevel) >= 0);
    const canCraft = !!(c && (c.craftOrVirtueLevels || []).indexOf(newLevel) >= 0);
    const reward = (window.LOTR_REWARD_LEVELS || [3,5,7,9]).indexOf(newLevel) >= 0;
    const expertise = (C().expertiseSlots(c ? c.name : "", newLevel) || []).indexOf(newLevel) >= 0 ? 2 : 0;
    const prevStyles = C().styleSlots(c ? c.name : "", d.subclass || "", newLevel - 1).length;
    const styleNew = C().styleSlots(c ? c.name : "", sub, newLevel).slice(prevStyles);
    const foes = c && c.favouredFoeCount ? Math.max(0, num(c.favouredFoeCount[newLevel-1]) - (d.favouredFoes || []).length) : 0;
    const lands = c && c.wardedLandCount ? Math.max(0, num(c.wardedLandCount[newLevel-1]) - (d.wardedLands || []).length) : 0;
    const scholarCraft = c && Array.isArray(c.craftSlots) ? Math.max(0, num(c.craftSlots[newLevel-1]) - num(c.craftSlots[newLevel-2])) : 0;
    const specProf = needSub && lu.subclass ? (C().SPEC_PROFS[norm(lu.subclass)] || null) : null;
    const features = c ? (c.features || []).filter((f) => f.level === newLevel).map((f) => f.name) : [];
    const subD = c ? (c.subclasses || []).find((s) => norm(s.name) === norm(sub)) : null;
    if (subD) subD.features.filter((f) => f.level === newLevel).forEach((f) => features.push(f.name + " (" + subD.name + ")"));
    return { c, newLevel, sub, needSub, virtue, canCraft, reward, expertise, styleNew, foes, lands, scholarCraft, specProf, features, hitDie: c ? c.hitDie : 8 };
  }
  function computeSteps() {
    STEPS = ["HP"];
    if (ctx.needSub) STEPS.push("Specialisation");
    if (ctx.virtue || ctx.reward || ctx.expertise || ctx.styleNew.length || ctx.foes || ctx.lands || ctx.scholarCraft || (ctx.specProf && ctx.specProf.choose)) STEPS.push("Choices");
    STEPS.push("Review");
  }
  function refresh() { ctx = buildCtx(); computeSteps(); render(); }

  function ensureModal() {
    if ($("lotrlu-overlay")) return;
    const ov = document.createElement("div");
    ov.className = "ov"; ov.id = "lotrlu-overlay";
    ov.innerHTML = '<div class="modal wide" style="max-width:660px;">' +
      '<div class="modal-hd"><div class="ttl">Level Up <span id="lotrlu-step" class="lb-steplbl"></span></div><button class="x" onclick="LOTRLU.close()">✕</button></div>' +
      '<div class="modal-bd" id="lotrlu-body"></div>' +
      '<div class="modal-ft"><div><button class="m-btn ghost" id="lotrlu-back" onclick="LOTRLU.back()">← Back</button></div>' +
      '<div style="display:flex;gap:8px;align-items:center;"><span id="lotrlu-why" class="lb-why"></span><button class="m-btn ghost" onclick="LOTRLU.close()">Cancel</button><button class="m-btn" id="lotrlu-next" onclick="LOTRLU.next()">Next →</button></div></div></div>';
    document.body.appendChild(ov);
  }
  function launch() {
    if (!window.collectSheet) return;
    d = window.collectSheet();
    const log = (m) => { if (window.addLog) window.addLog("Level Up", "✗", m, "fumble"); };
    if (!C().callingByName(d.calling || d.cls)) { log("Choose a calling first (or use Create)"); return; }
    if (num(d.level) >= MAX()) { log("Already at level " + MAX() + " — heroes keep earning XP but gain no more levels"); return; }
    ensureModal();
    lu = { hpMethod: "avg", roll: null, subclass: "", pick: { mode: "virtue", virtue: "" }, craft: "", reward: "", rewardItem: "", expertise: [], styles: {}, foes: [], lands: [], specChoose: [] };
    ctx = buildCtx(); computeSteps(); step = 0;
    $("lotrlu-overlay").classList.add("open"); render();
  }
  function close() { const ov = $("lotrlu-overlay"); if (ov) ov.classList.remove("open"); }
  function next() { const why = blocker(); if (why) { $("lotrlu-why").textContent = why; return; } if (STEPS[step] === "Review") { apply(); return; } step = Math.min(STEPS.length - 1, step + 1); render(); }
  function back() { if (step === 0) return; step -= 1; render(); }
  function render() {
    ensureModal();
    $("lotrlu-step").textContent = "Step " + (step + 1) + " of " + STEPS.length + " — " + STEPS[step];
    $("lotrlu-back").style.visibility = step === 0 ? "hidden" : "visible";
    $("lotrlu-next").textContent = STEPS[step] === "Review" ? "Apply level ✓" : "Next →";
    $("lotrlu-why").textContent = "";
    const fn = { HP: rHP, Specialisation: rSpec, Choices: rChoices, Review: rReview }[STEPS[step]];
    const body = $("lotrlu-body"); const same = render._step === step, prev = body.scrollTop;
    body.innerHTML = fn(); body.scrollTop = same ? prev : 0; render._step = step;
    wire();
  }
  const card = (attr, on, title, sub) => '<div class="dndb-card' + (on ? " on" : "") + '" ' + attr + '><div class="dc-title">' + esc(title) + '</div>' + (sub ? '<div class="dc-sub">' + esc(sub) + '</div>' : "") + '</div>';
  const chip = (attr, on, label, dis) => '<span class="lb-chip' + (on ? " on" : "") + (dis ? " disabled" : "") + '" ' + attr + '>' + esc(label) + '</span>';

  // ── helpers ────────────────────────────────────────────────────────────
  function isDwarf() { return /^dwarves/i.test(d.culture || ""); }
  function hasVirtue(n) { return (d.virtues || []).some((v) => norm(v.name) === norm(n)); }
  function newVirtue() { return lu.pick.mode !== "craft" && ctx.virtue ? lu.pick.virtue : ""; }
  function scoresAfter() { const sc = Object.assign({}, d.scores); if (newVirtue()) { const fx = C().virtueEffects(lu.pick); Object.keys(fx.abil).forEach((k) => sc[k] = Math.min(20, num(sc[k]) + fx.abil[k])); } return sc; }
  function hpGain() {
    const con = mod(d.scores.CON), avg = Math.floor(ctx.hitDie / 2) + 1;
    const base = lu.hpMethod === "roll" && lu.roll != null ? lu.roll : avg;
    let n = Math.max(1, base + con); const bits = [(lu.hpMethod === "roll" && lu.roll != null ? "rolled " + lu.roll : "average " + avg) + " " + sgn(con) + " CON"];
    if (isDwarf()) { n += 1; bits.push("+1 Endurance of the Dwarves"); }
    if (hasVirtue("Hardiness")) { n += 1; bits.push("+1 Hardiness"); }
    if (/^hardiness$/i.test(newVirtue())) { n += ctx.newLevel; bits.push("+" + ctx.newLevel + " Hardiness (taken now)"); }
    const slayerNow = norm(lu.subclass || d.subclass) === "slayer";
    if (slayerNow && ctx.newLevel === 3) { n += 3; bits.push("+3 Sterner Than Steel"); }
    else if (slayerNow && ctx.newLevel > 3) { n += 1; bits.push("+1 Sterner Than Steel"); }
    const dCon = mod(scoresAfter().CON) - con;
    if (dCon > 0) { n += dCon * ctx.newLevel; bits.push("+" + (dCon * ctx.newLevel) + " higher CON (every level)"); }
    return { n, bits };
  }
  function profSkills() { return Object.keys(d.skillProf || {}).filter((k) => d.skillProf[k] > 0); }
  function invOf(kind) { return (d.inventory || []).filter((it) => { const ref = it.ref || it.name; if (kind === "Weapon") return !!C().weaponByName(ref); const a = (window.LOTR_ARMOR || []).find((x) => norm(x.name) === norm(ref)); return a && (kind === "Shield" ? a.category === "Shield" : a.category !== "Shield"); }); }

  // ── steps ──────────────────────────────────────────────────────────────
  function rHP() {
    const xp = num(d.xp), need = (T().xpByLevel || [])[ctx.newLevel - 1];
    let h = '<p class="m-hint">' + esc(d.name || "Your hero") + ' rises from <b>' + d.level + '</b> to <b>' + ctx.newLevel + '</b> as a ' + esc(ctx.c.name) + '. (Single calling — multicalling is not modelled.)</p>';
    if (need != null) h += '<div class="dndb-note">Experience: <b>' + xp + '</b> / ' + need + ' needed for level ' + ctx.newLevel + (xp < need ? ' — <span style="color:#e2a06b;">not yet earned; levelling anyway</span>' : ' ✓') + '</div>';
    if (ctx.features.length) h += '<div class="dndb-note">New at level ' + ctx.newLevel + ': <b>' + esc(ctx.features.join(", ")) + '</b></div>';
    const avg = Math.floor(ctx.hitDie / 2) + 1;
    h += '<span class="m-lbl" style="display:block;margin-top:10px;">Hit points (d' + ctx.hitDie + ')</span><div class="dndb-seg"><button class="dndb-seg-btn' + (lu.hpMethod === "avg" ? " on" : "") + '" data-hpm="avg">Fixed (' + avg + ')</button><button class="dndb-seg-btn' + (lu.hpMethod === "roll" ? " on" : "") + '" data-hpm="roll">Roll d' + ctx.hitDie + '</button></div>';
    if (lu.hpMethod === "roll") h += '<div style="text-align:center;margin:8px 0;"><button class="m-btn" data-roll="1">🎲 ' + (lu.roll == null ? "Roll" : "Rolled " + lu.roll + " — roll again") + '</button></div>';
    const g = hpGain();
    h += '<div class="dndb-note">+<b>' + g.n + '</b> HP (' + esc(g.bits.join(", ")) + ') → max <b>' + (num(d.hpMax) + g.n) + '</b></div>';
    return h;
  }
  function rSpec() {
    let h = '<p class="m-hint">At 3rd level your ' + esc(ctx.c.name) + ' chooses a ' + esc(ctx.c.subclassLabel) + '.</p><div class="dndb-grid">';
    (ctx.c.subclasses || []).forEach((s) => h += card('data-spec="' + esc(s.name) + '"', lu.subclass === s.name, s.name, s.flavor));
    h += "</div>";
    const sub = (ctx.c.subclasses || []).find((s) => s.name === lu.subclass);
    if (sub) h += '<div class="lb-traits">' + sub.features.map((f) => '<div><b>' + esc(f.name) + '</b> <span class="lb-mini">(' + f.level + ')</span> ' + esc(f.description) + '</div>').join("") + '</div>';
    return h;
  }
  function rChoices() {
    let h = '<p class="m-hint">What level ' + ctx.newLevel + ' grants.</p>';
    if (ctx.specProf && ctx.specProf.choose) h += '<span class="m-lbl">Bonus proficiencies — choose ' + ctx.specProf.choose + '</span><div class="lb-row">' + ctx.specProf.from.map((s) => chip('data-spc="' + esc(s) + '"', lu.specChoose.indexOf(s) >= 0, s + (profSkills().indexOf(s) >= 0 ? " (double)" : ""))).join("") + '</div>';
    ctx.styleNew.forEach((slot, i) => {
      h += '<span class="m-lbl">Fighting Style (' + esc(slot.src) + ')</span><div class="lb-row">' + slot.options.map((n) => chip('data-style="' + esc(n) + '" data-si="' + i + '"', lu.styles[i] === n, n, (d.fightingStyles || []).indexOf(n) >= 0)).join("") + '</div>';
    });
    if (ctx.virtue) {
      h += '<div class="lb-box"><span class="m-lbl">' + (ctx.canCraft ? 'Virtue — or a craft slot and a craft' : 'Virtue') + '</span>';
      if (ctx.canCraft) h += '<div class="dndb-seg" style="margin:4px 0 8px;"><button class="dndb-seg-btn' + (lu.pick.mode !== "craft" ? " on" : "") + '" data-pmode="virtue">Virtue</button><button class="dndb-seg-btn' + (lu.pick.mode === "craft" ? " on" : "") + '" data-pmode="craft">Craft slot + craft</button></div>';
      if (lu.pick.mode === "craft") h += craftSelect();
      else h += C().virtueHTML("lu", lu.pick, d.culture, (d.virtues || []).map((v) => v.name), d.scores, profSkills());
      h += '</div>';
    }
    if (ctx.scholarCraft) h += '<span class="m-lbl">A new craft slot — learn a craft</span>' + craftSelect();
    if (ctx.expertise) { const pool = profSkills().filter((s) => d.skillProf[s] < 2); h += '<span class="m-lbl">Expertise — choose ' + ctx.expertise + ' (' + lu.expertise.length + '/' + ctx.expertise + ')</span><div class="lb-row">' + pool.map((s) => chip('data-exp="' + esc(s) + '"', lu.expertise.indexOf(s) >= 0, s)).join("") + '</div>'; }
    if (ctx.foes) h += '<span class="m-lbl">New favoured foe</span><div class="lb-row">' + ctx.c.favouredFoes.map((f) => chip('data-foe="' + esc(f) + '"', lu.foes.indexOf(f) >= 0, f, (d.favouredFoes || []).indexOf(f) >= 0)).join("") + '</div>';
    if (ctx.lands) h += '<span class="m-lbl">New warded land</span><div class="lb-row">' + ctx.c.wardedLands.map((f) => chip('data-land="' + esc(f) + '"', lu.lands.indexOf(f) >= 0, f, (d.wardedLands || []).indexOf(f) >= 0)).join("") + '</div>';
    if (ctx.reward) {
      const rd = (window.LOTR_REWARDS || []).find((x) => x.name === lu.reward);
      const items = rd ? invOf(rd.item).filter((it) => (it.rewards || []).indexOf(rd.name) < 0) : [];
      h += '<span class="m-lbl" style="display:block;margin-top:10px;">Reward (level ' + ctx.newLevel + ')</span><div class="lb-row"><select class="m-input" id="lotrlu-reward" style="flex:1 1 180px;"><option value="">— reward —</option>' + (window.LOTR_REWARDS || []).map((x) => '<option value="' + esc(x.name) + '"' + (lu.reward === x.name ? " selected" : "") + '>' + esc(x.name) + ' (' + esc(x.item) + ')</option>').join("") + '</select>' +
        '<select class="m-input" id="lotrlu-rwitem" style="flex:1 1 180px;"><option value="">— on which item —</option>' + items.map((it) => '<option value="' + esc(it.rid) + '"' + (lu.rewardItem === it.rid ? " selected" : "") + '>' + esc(it.name) + ((it.rewards || []).length ? " [" + it.rewards.join(", ") + "]" : "") + '</option>').join("") + '</select></div>';
      if (rd) h += '<div class="lb-mini">' + esc(rd.description) + (rd && !items.length ? ' — no ' + esc(rd.item.toLowerCase()) + ' in your equipment without it; add one first or pick another.' : '') + '</div>';
    }
    return h;
  }
  function craftSelect() { const known = d.crafts || []; return '<select class="m-input" id="lotrlu-craft"><option value="">— choose a craft —</option>' + (window.LOTR_CRAFTS || []).map((x) => '<option' + (lu.craft === x.name ? " selected" : "") + (known.indexOf(x.name) >= 0 ? " disabled" : "") + '>' + esc(x.name) + '</option>').join("") + '</select>' + ((window.LOTR_CRAFTS || []).find((x) => x.name === lu.craft) ? '<div class="lb-note">' + esc(window.LOTR_CRAFTS.find((x) => x.name === lu.craft).description) + '</div>' : ""); }
  function rReview() {
    const g = hpGain();
    let h = '<div class="dndb-review"><div class="dr-line"><b>' + esc(ctx.c.name) + '</b> ' + d.level + ' → <b>' + ctx.newLevel + '</b>' + (lu.subclass ? ' · ' + esc(ctx.c.subclassLabel) + ': <b>' + esc(lu.subclass) + '</b>' : "") + '</div>';
    h += '<div class="dr-line">Hit points +<b>' + g.n + '</b> → ' + (num(d.hpMax) + g.n) + ' · Hit dice ' + ctx.newLevel + 'd' + ctx.hitDie + ' · Proficiency +' + C().profBonusAt(ctx.newLevel) + '</div>';
    if (ctx.features.length) h += '<div class="dr-line">New features: <b>' + esc(ctx.features.join(", ")) + '</b></div>';
    if (newVirtue()) { const fx = C().virtueEffects(lu.pick); h += '<div class="dr-line">Virtue: <b>' + esc(lu.pick.virtue) + '</b> (' + esc(Object.keys(fx.abil).map((k) => k + " +" + fx.abil[k]).join(", ")) + ')</div>'; }
    if (lu.craft) h += '<div class="dr-line">Craft: <b>' + esc(lu.craft) + '</b>' + (lu.pick.mode === "craft" ? " (+1 craft slot)" : "") + '</div>';
    Object.keys(lu.styles).forEach((k) => h += '<div class="dr-line">Fighting style: <b>' + esc(lu.styles[k]) + '</b></div>');
    if (lu.expertise.length) h += '<div class="dr-line">Expertise: <b>' + esc(lu.expertise.join(", ")) + '</b></div>';
    if (lu.foes.length || lu.lands.length) h += '<div class="dr-line">Favoured foe: <b>' + esc(lu.foes.join(", ") || "—") + '</b> · Warded land: <b>' + esc(lu.lands.join(", ") || "—") + '</b></div>';
    if (lu.reward) { const it = (d.inventory || []).find((x) => x.rid === lu.rewardItem); h += '<div class="dr-line">Reward: <b>' + esc(lu.reward) + '</b> on ' + esc(it ? it.name : "—") + '</div>'; }
    return h + '</div>';
  }
  function blocker() {
    switch (STEPS[step]) {
      case "HP": return lu.hpMethod === "roll" && lu.roll == null ? "Roll your hit die" : "";
      case "Specialisation": return lu.subclass ? "" : "Choose a " + ctx.c.subclassLabel;
      case "Choices": {
        if (ctx.specProf && ctx.specProf.choose && lu.specChoose.length < ctx.specProf.choose) return "Choose bonus proficiencies";
        if (ctx.styleNew.some((s, i) => !lu.styles[i])) return "Choose a fighting style";
        if (ctx.virtue && lu.pick.mode !== "craft" && !C().virtueComplete(lu.pick)) return "Finish your virtue";
        if ((ctx.virtue && lu.pick.mode === "craft" || ctx.scholarCraft) && !lu.craft) return "Choose a craft";
        if (ctx.expertise && lu.expertise.length < ctx.expertise) return "Choose Expertise";
        if (lu.foes.length < Math.min(1, ctx.foes) || lu.lands.length < Math.min(1, ctx.lands)) return "Choose a foe / land";
        if (ctx.reward && (!lu.reward || !lu.rewardItem)) return "Pick a reward and the item it goes on";
        return "";
      }
      default: return "";
    }
  }
  function toggleIn(arr, v, max) { const i = arr.indexOf(v); if (i >= 0) arr.splice(i, 1); else { if (arr.length >= max) arr.shift(); arr.push(v); } }
  function wire() {
    const body = $("lotrlu-body");
    const on = (sel, fn, ev) => body.querySelectorAll(sel).forEach((el) => el.addEventListener(ev || "click", () => { if (el.classList.contains("disabled")) return; fn(el); refresh(); }));
    on("[data-hpm]", (el) => { lu.hpMethod = el.dataset.hpm; if (lu.hpMethod === "avg") lu.roll = null; });
    on("[data-roll]", () => { lu.roll = 1 + Math.floor(Math.random() * ctx.hitDie); });
    on("[data-spec]", (el) => { lu.subclass = el.dataset.spec; lu.specChoose = []; lu.styles = {}; });
    on("[data-spc]", (el) => toggleIn(lu.specChoose, el.dataset.spc, ctx.specProf ? ctx.specProf.choose : 0));
    on("[data-style]", (el) => { lu.styles[el.dataset.si] = el.dataset.style; });
    on("[data-pmode]", (el) => { lu.pick = { mode: el.dataset.pmode, virtue: "" }; lu.craft = ""; });
    on("#lotrlu-craft", (el) => { lu.craft = el.value; }, "change");
    on("[data-exp]", (el) => toggleIn(lu.expertise, el.dataset.exp, ctx.expertise));
    on("[data-foe]", (el) => toggleIn(lu.foes, el.dataset.foe, ctx.foes));
    on("[data-land]", (el) => toggleIn(lu.lands, el.dataset.land, ctx.lands));
    on("#lotrlu-reward", (el) => { lu.reward = el.value; lu.rewardItem = ""; }, "change");
    on("#lotrlu-rwitem", (el) => { lu.rewardItem = el.value; }, "change");
    C().wireVirtue(body, () => lu.pick, refresh);
  }

  // ── apply: edit the sheet record and hand it back ───────────────────────
  function apply() {
    const g = hpGain();
    d.level = ctx.newLevel;
    if (lu.subclass) d.subclass = lu.subclass;
    d.hpMax = num(d.hpMax) + g.n; d.hpCur = num(d.hpCur) + g.n;
    d.skillProf = d.skillProf || {}; d.saveProf = d.saveProf || {};
    d.virtues = d.virtues || []; d.crafts = d.crafts || []; d.fightingStyles = d.fightingStyles || [];
    const profText = [];
    if (newVirtue()) {
      const fx = C().virtueEffects(lu.pick);
      Object.keys(fx.abil).forEach((k) => d.scores[k] = Math.min(20, num(d.scores[k]) + fx.abil[k]));
      fx.saves.forEach((a) => d.saveProf[a] = true);
      fx.skills.forEach((s) => { const dbl = /!$/.test(s); s = s.replace(/!$/, ""); const r = C().matchSkill(s); if (r) d.skillProf[r] = (d.skillProf[r] && dbl) ? 2 : Math.max(d.skillProf[r] || 0, 1); });
      fx.expertise.forEach((s) => { const r = C().matchSkill(s); if (r) d.skillProf[r] = 2; });
      fx.profText.forEach((t) => profText.push(t));
      d.virtues.push({ name: lu.pick.virtue, asi: fx.abil, pick: [lu.pick.save, lu.pick.prof, lu.pick.exp, lu.pick.skill].filter(Boolean).join(", ") });
      if (fx.companion && !(d.companions || []).some((c) => /pony/i.test(c.name || ""))) { d.companions = d.companions || []; d.companions.push(C().PONY(ctx.newLevel)); }
    }
    if (lu.craft && d.crafts.indexOf(lu.craft) < 0) d.crafts.push(lu.craft);
    if (ctx.virtue && lu.pick.mode === "craft") d.extraCraftSlots = num(d.extraCraftSlots) + 1;
    Object.keys(lu.styles).forEach((k) => { if (d.fightingStyles.indexOf(lu.styles[k]) < 0) d.fightingStyles.push(lu.styles[k]); });
    lu.expertise.forEach((s) => d.skillProf[s] = 2);
    if (ctx.specProf) { (ctx.specProf.skills || []).concat(lu.specChoose).forEach((s) => { d.skillProf[s] = d.skillProf[s] ? 2 : 1; }); (ctx.specProf.tools || []).forEach((t) => profText.push(t)); }
    if (/herald/i.test(lu.subclass)) profText.push("Medium armour, shields, martial weapons");
    d.favouredFoes = (d.favouredFoes || []).concat(lu.foes); d.wardedLands = (d.wardedLands || []).concat(lu.lands);
    if (lu.reward && lu.rewardItem) { const it = (d.inventory || []).find((x) => x.rid === lu.rewardItem); if (it) { it.rewards = it.rewards || []; if (it.rewards.indexOf(lu.reward) < 0) it.rewards.push(lu.reward); } }
    if (profText.length) d.proficiencies = (d.proficiencies ? d.proficiencies + " · " : "") + profText.join(", ");
    (d.companions || []).forEach((c) => { if (/bree-pony/i.test(c.name || "")) { const p = C().PONY(ctx.newLevel); c.ac = p.ac; c.hpMax = p.hpMax; c.note = p.note; } });
    if (window.applySheet) window.applySheet(d);
    if (window.saveSheet) window.saveSheet(true);
    if (window.addLog) window.addLog("Level Up", "⬆ " + ctx.newLevel, ctx.c.name + " " + ctx.newLevel + (d.subclass ? " (" + d.subclass + ")" : "") + " · +" + g.n + " HP" + (newVirtue() ? " · " + lu.pick.virtue : "") + (lu.craft ? " · " + lu.craft : "") + (lu.reward ? " · " + lu.reward : ""), "crit");
    close();
  }

  window.LOTRLU = { launch, close, next, back, _state: () => ({ d, lu, ctx, STEPS, step }), _blocker: () => blocker() };
})();
