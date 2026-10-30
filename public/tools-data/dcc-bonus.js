// Dungeon Crawler Carl — item bonuses ("benefits"): the ONE model for what a piece
// of loot grants, shared by every place loot is built, generated or worn:
//   • GM Screen Loot Box builder (build / enchant / roll a box)   — gm_screen.html
//   • the DCC character sheet (inventory badges + the equip engine) — dcc-sheet-equip.js
//   • the Homebrew item builder mirrors the same kinds in React        — components/DccHomebrew.tsx
//
// A benefit is { kind, target?, amount?, floor? }:
//   stat     +N to one Stat              target: str|int|con|dex|cha   amount: N
//   allstats +N to every Stat            amount
//   skill    +N ranks in a Skill (added to the sheet if missing)       target: skill name, amount
//            floor:true → Rank = Floor Number (Passive Skill at Rank = Floor)
//   spell    an Inherent Spell while worn: no Mana, `uses` charges per `reset`
//            (short | long | floor); a scroll/tome's spell has no charges
//   buff     a Buff while worn (added to the sheet's Buffs tracker)    target: buff name
//   dr | evade | move | step                                           amount
//   note     anything the sheet can't automate (Unique, resistances…)  target: the text
//
// The badges ARE the item: what you see is exactly what gets applied on equip, so
// there's no second copy of the bonuses hiding in a notes field to drift out of step.
(function () {
  "use strict";
  if (window.DCCBonus) return;

  var STATS = [["str", "STR"], ["int", "INT"], ["con", "CON"], ["dex", "DEX"], ["cha", "CHA"]];
  var STAT_ID = { strength: "str", str: "str", intelligence: "int", int: "int", constitution: "con", con: "con", dexterity: "dex", dex: "dex", charisma: "cha", cha: "cha" };
  var STAT_RE = "strength|intelligence|constitution|dexterity|charisma|str|int|con|dex|cha";
  var KINDS = [
    { k: "stat", label: "Stat", tip: "+N to a Stat" },
    { k: "allstats", label: "All Stats", tip: "+N to every Stat" },
    { k: "skill", label: "Skill", tip: "+N ranks in a Skill (added if the crawler doesn't have it)" },
    { k: "spell", label: "Spell", tip: "A Spell — gear lets you cast it while worn with no Mana, using charges (N uses per short rest / long rest / Floor); a scroll casts it once free, a tome teaches it" },
    { k: "buff", label: "Buff", tip: "A Buff while the item is worn" },
    { k: "dr", label: "DR", tip: "+N Damage Resistance" },
    { k: "evade", label: "Evade", tip: "+N Evade" },
    { k: "move", label: "Move", tip: "+N Move" },
    { k: "step", label: "Step", tip: "+N Step" },
    { k: "note", label: "Note", tip: "Anything the sheet can't automate (Unique, resistances…) — shown, not applied" },
  ];
  var KIND = {}; KINDS.forEach(function (x) { KIND[x.k] = x; });
  var AMT_KINDS = { stat: 1, allstats: 1, skill: 1, dr: 1, evade: 1, move: 1, step: 1 };

  function norm(s) { return String(s == null ? "" : s).trim(); }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function int(v) { var n = parseInt(String(v == null ? "" : v).replace(/[^0-9-]/g, ""), 10); return isNaN(n) ? 0 : n; }
  function arr(v) { return Array.isArray(v) ? v : []; }
  function g(name) { try { return window[name] !== undefined ? window[name] : (0, eval)("typeof " + name + "!=='undefined'?" + name + ":undefined"); } catch (e) { return undefined; } }

  function skillList() { return arr(g("DCC_SKILLS")).concat(arr(window.__DCC_HB_SKILLS)).filter(function (s) { return s && s.name; }); }
  function spellList() { return arr(g("DCC_SPELLS")).concat(arr(window.__DCC_HB_SPELLS)).filter(function (s) { return s && s.name; }); }
  function buffList() { return arr(g("DCC_BUFFS")).filter(function (s) { return s && s.name; }); }
  function find(list, name) {
    var t = norm(name).toLowerCase(); if (!t) return null;
    var strip = function (s) { return String(s).toLowerCase().replace(/[^a-z0-9]/g, ""); };
    return list.find(function (x) { return x.name.toLowerCase() === t; }) || list.find(function (x) { return strip(x.name) === strip(t); }) || null;
  }
  function findSkill(n) { return find(skillList(), n); }
  function findSpell(n) { return find(spellList(), n); }
  function findBuff(n) { return find(buffList(), n); }

  // ── normalise (accepts a JSON string, legacy shapes, junk) ──────────────────
  function one(b) {
    if (!b || typeof b !== "object") return null;
    var kind = norm(b.kind).toLowerCase();
    if (kind === "speed") kind = "move";
    // Stat percentages are gone (house rule: bonuses are plain numbers) — an old
    // "+5% CON" becomes "+5 CON".
    if (kind === "statpct") kind = "stat";
    if (!KIND[kind]) return null;
    var o = { kind: kind };
    if (kind === "stat") {
      var id = STAT_ID[norm(b.target).toLowerCase()]; if (!id) return null;
      o.target = id; o.amount = int(b.amount); if (!o.amount) return null;
    } else if (kind === "skill") {
      o.target = norm(b.target).slice(0, 60); if (!o.target) return null;
      if (b.floor) { o.floor = true; o.amount = 0; } else { o.amount = int(b.amount); if (!o.amount) return null; }
    } else if (kind === "spell" || kind === "buff" || kind === "note") {
      o.target = norm(b.target || b.text).slice(0, kind === "note" ? 160 : 60); if (!o.target) return null;
      if (kind === "spell" && int(b.amount) > 0) o.amount = int(b.amount);   // optional spell Rank
      // An item's Inherent Spell (Tables 39/41): no Mana — CHARGES instead, `uses`
      // casts that come back on a short rest, long rest or Floor change. Unset = the
      // sheet's default (1 per long rest). A scroll/tome's spell has none.
      if (kind === "spell" && int(b.uses) > 0) { o.uses = Math.min(20, int(b.uses)); o.reset = RESETS[b.reset] ? b.reset : "long"; }
    } else {
      o.amount = int(b.amount); if (!o.amount) return null;
    }
    return o;
  }
  function normalize(v) {
    if (typeof v === "string") { try { v = JSON.parse(v); } catch (e) { v = []; } }
    return arr(v).map(one).filter(Boolean).slice(0, 24);
  }

  var RESETS = { short: "short rest", long: "long rest", floor: "Floor" };
  function chargeText(b) { return b && b.uses ? b.uses + "/" + RESETS[b.reset || "long"] : ""; }
  function signed(n) { return (n >= 0 ? "+" : "") + n; }
  function statLabel(id) { var s = STATS.find(function (x) { return x[0] === id; }); return s ? s[1] : String(id || "").toUpperCase(); }
  function label(b) {
    if (!b) return "";
    switch (b.kind) {
      case "stat": return signed(b.amount) + " " + statLabel(b.target);
      case "allstats": return signed(b.amount) + " All Stats";
      case "skill": return b.floor ? b.target + " (Rank = Floor)" : signed(b.amount) + " " + b.target;
      case "spell": { var x = [b.amount ? "Rank " + b.amount : "", chargeText(b)].filter(Boolean).join(" · "); return "Spell: " + b.target + (x ? " (" + x + ")" : ""); }
      case "buff": return "Buff: " + b.target;
      case "dr": return signed(b.amount) + " DR";
      case "evade": return signed(b.amount) + " Evade";
      case "move": return signed(b.amount) + " Move";
      case "step": return signed(b.amount) + " Step";
      case "note": return b.target;
    }
    return "";
  }
  function summary(list) { return normalize(list).map(label).join(", "); }

  // ── text → benefits (book effect text, rolled perks, legacy loot notes) ─────
  function parsePart(p) {
    p = norm(p).replace(/^(?:bronze|silver|gold|platinum|legendary|celestial)\s+tier\s*[—–-]\s*/i, "");
    if (!p) return null;
    var m;
    // A bonus that only applies sometimes ("+3 Evade Buff with a novel accusation",
    // "+2 DR against fire") stays a note — applying it on equip would make it permanent.
    if (/^[+-]\s*\d/.test(p) && /\s(?:with|when|while|if|vs\.?|versus|against|during|after|once)\s/i.test(p)) return { kind: "note", target: p };
    // "Random Armor Piece (+1 DR)" / "… granting +2 Damage Resistance" — a DR bonus mid-sentence.
    if ((m = p.match(/(?:\(|\bgranting\s+|\bgives\s+)\+\s*(\d+)\s*(?:DR\b|Damage Resistance)\)?/i))) return { kind: "dr", amount: +m[1] };
    if ((m = p.match(new RegExp("^\\+?\\s*(\\d+)\\s*%\\s*(?:to\\s+)?(" + STAT_RE + ")\\b", "i")))) return { kind: "stat", target: STAT_ID[m[2].toLowerCase()], amount: +m[1] };   // "+5% CON" → "+5 CON"
    if ((m = p.match(/^\+\s*(\d+)\s*(?:to\s+)?all\s+stats\b/i))) return { kind: "allstats", amount: +m[1] };
    if ((m = p.match(new RegExp("^([+-]\\s*\\d+)\\s*(?:to\\s+)?(" + STAT_RE + ")\\b", "i")))) return { kind: "stat", target: STAT_ID[m[2].toLowerCase()], amount: int(m[1]) };
    if ((m = p.match(/^\+\s*(\d+)\s*(?:DR\b|Damage Resistance)/i))) return { kind: "dr", amount: +m[1] };
    if ((m = p.match(/^\+\s*(\d+)\s*Evade\b/i))) return { kind: "evade", amount: +m[1] };
    if ((m = p.match(/^\+\s*(\d+)\s*(?:ft\.?\s*)?(?:Move|Speed)\b/i))) return { kind: "move", amount: +m[1] };
    if ((m = p.match(/^\+\s*(\d+)\s*(?:ft\.?\s*)?Step\b/i))) return { kind: "step", amount: +m[1] };
    if ((m = p.match(/^Passive\s+(.+?)\s*\(\s*Rank\s*=\s*Floor(?:\s*Number)?\s*\)$/i))) return { kind: "skill", target: (findSkill(m[1]) || { name: m[1] }).name, floor: true, amount: 0 };
    if ((m = p.match(/^(?:Inherent\s+)?Spell\s*:\s*(.+?)(?:\s*\((?:Rank|no Mana|\d+\s*\/)[^)]*\))*$/i))) {
      var rk = p.match(/\bRank\s*(\d+)/i), ch = p.match(/(\d+)\s*\/\s*(short rest|long rest|floor)/i);
      var sb = { kind: "spell", target: (findSpell(m[1]) || { name: norm(m[1]) }).name, amount: rk ? +rk[1] : 0 };
      if (ch) { sb.uses = +ch[1]; sb.reset = /short/i.test(ch[2]) ? "short" : /floor/i.test(ch[2]) ? "floor" : "long"; }
      return sb;
    }
    if ((m = p.match(/^(?:Grants\s+(?:the\s+)?)?Buff\s*:\s*(.+)$/i))) return { kind: "buff", target: (findBuff(m[1]) || { name: norm(m[1]) }).name };
    if ((m = p.match(/^Resist(?:ance)?(?:\s+to)?\s+([A-Za-z]+)(?:\s+damage)?$/i))) return { kind: "buff", target: "Resistance: " + m[1].charAt(0).toUpperCase() + m[1].slice(1).toLowerCase() };
    // "+2 Warhammer Skill", "+2 to Athletics", "+1 Shield Block Skill Rank"
    if ((m = p.match(/^\+\s*(\d+)\s+(?:to\s+|in\s+)?([A-Za-z][A-Za-z'/\- ]*?)(?:\s+skill(?:\s+ranks?)?s?)?(?:\s*\(Skill Rank\))?$/i))) {
      var nm = norm(m[2]), sd = findSkill(nm);
      var vague = /\b(a|an|your|chosen|any|of)\b/i.test(nm);
      if (sd || (!vague && /skill/i.test(p))) return { kind: "skill", target: sd ? sd.name : nm, amount: +m[1] };
    }
    return { kind: "note", target: p };
  }
  // Split on commas/semicolons that aren't inside parentheses.
  function splitParts(s) {
    var out = [], depth = 0, cur = "";
    String(s || "").split("").forEach(function (c) {
      if (c === "(") depth++; else if (c === ")") depth = Math.max(0, depth - 1);
      if ((c === "," || c === ";") && depth === 0) { out.push(cur); cur = ""; } else cur += c;
    });
    out.push(cur);
    return out.map(norm).filter(Boolean);
  }
  function fromText(s, opts) {
    var list = splitParts(s).map(parsePart).map(one).filter(Boolean);
    if (opts && opts.automatableOnly) list = list.filter(function (b) { return b.kind !== "note"; });
    return list;
  }

  // ── CSS (themes off whatever page it's on: GM Screen or the sheet) ──────────
  function injectCss() {
    if (document.getElementById("dcbn-css")) return;
    var st = document.createElement("style"); st.id = "dcbn-css";
    st.textContent =
      ".dcbn{display:flex;flex-wrap:wrap;gap:4px;align-items:center;min-height:22px}" +
      ".dcbn-b{--c:#7f8a99;display:inline-flex;align-items:center;gap:3px;max-width:100%;padding:1px 3px 1px 7px;border-radius:999px;font-weight:600;font-size:11px;line-height:18px;font-family:var(--dcbn-font,inherit);letter-spacing:.01em;color:inherit;background:color-mix(in srgb,var(--c) 16%,transparent);border:1px solid color-mix(in srgb,var(--c) 55%,transparent);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
      ".dcbn-b.ro{padding-right:7px}" +
      ".dcbn-b>span{overflow:hidden;text-overflow:ellipsis}" +
      ".dcbn-k-stat,.dcbn-k-allstats{--c:#4a8fd8}.dcbn-k-skill{--c:#3aa86b}.dcbn-k-spell{--c:#9a62d8}.dcbn-k-buff{--c:#22a6a6}" +
      ".dcbn-k-dr,.dcbn-k-evade,.dcbn-k-move,.dcbn-k-step{--c:#c08a2a}.dcbn-k-note{--c:#8a8f98;font-weight:500}" +
      ".dcbn-x{all:unset;cursor:pointer;width:16px;height:16px;border-radius:50%;text-align:center;font:700 12px/16px system-ui,sans-serif;opacity:.65}" +
      ".dcbn-x:hover{opacity:1;background:color-mix(in srgb,#d33 30%,transparent)}" +
      ".dcbn-add{all:unset;cursor:pointer;padding:1px 8px;border-radius:999px;font-weight:700;font-size:11px;line-height:18px;font-family:var(--dcbn-font,inherit);border:1px dashed color-mix(in srgb,currentColor 45%,transparent);opacity:.8}" +
      ".dcbn-add:hover{opacity:1;border-style:solid}" +
      ".dcbn-empty{font-size:11px;opacity:.55;font-style:italic}" +
      ".dcbn-pop{position:fixed;z-index:2147483600;width:300px;max-width:calc(100vw - 16px);box-sizing:border-box;padding:10px;border-radius:8px;" +
        "background:var(--dcbn-pop-bg,var(--panel,var(--box,#1c1f24)));color:var(--dcbn-pop-fg,var(--text,var(--ink,#e9edf2)));border:1px solid var(--dcbn-pop-bd,var(--border,var(--rule,#3a3f47)));box-shadow:0 12px 36px rgba(0,0,0,.45);font-size:13px;line-height:1.35;font-family:var(--dcbn-font,system-ui,sans-serif)}" +
      ".dcbn-pop *{box-sizing:border-box}" +
      ".dcbn-kinds{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px}" +
      ".dcbn-kind{all:unset;cursor:pointer;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:700;border:1px solid color-mix(in srgb,currentColor 25%,transparent)}" +
      ".dcbn-kind.on{background:color-mix(in srgb,currentColor 18%,transparent);border-color:currentColor}" +
      ".dcbn-tip{font-size:11px;opacity:.7;margin:0 0 8px}" +
      ".dcbn-row{display:flex;gap:6px;align-items:center;margin-bottom:6px}" +
      ".dcbn-pop input[type=text],.dcbn-pop input[type=number],.dcbn-pop select{flex:1;min-width:0;padding:5px 7px;border-radius:5px;border:1px solid color-mix(in srgb,currentColor 25%,transparent);background:color-mix(in srgb,currentColor 6%,transparent);color:inherit;font:inherit}" +
      ".dcbn-pop select option{color:#111;background:#fff}" +
      ".dcbn-pop .dcbn-amt{flex:0 0 78px}" +
      ".dcbn-pop label.dcbn-chk{display:flex;gap:5px;align-items:center;font-size:12px;flex:0 0 auto}" +
      ".dcbn-sug{max-height:160px;overflow:auto;border:1px solid color-mix(in srgb,currentColor 18%,transparent);border-radius:5px;margin-bottom:6px}" +
      ".dcbn-sug:empty{display:none}" +
      ".dcbn-sug div{padding:4px 8px;cursor:pointer;font-size:12px;display:flex;justify-content:space-between;gap:8px}" +
      ".dcbn-sug div:hover,.dcbn-sug div.on{background:color-mix(in srgb,currentColor 12%,transparent)}" +
      ".dcbn-sug small{opacity:.6}" +
      ".dcbn-acts{display:flex;justify-content:flex-end;gap:6px;margin-top:4px}" +
      ".dcbn-btn{all:unset;cursor:pointer;padding:4px 12px;border-radius:5px;font-weight:700;font-size:12px;border:1px solid color-mix(in srgb,currentColor 30%,transparent)}" +
      ".dcbn-btn.go{background:var(--dcbn-acc,var(--accent,var(--gold,#c8a020)));color:var(--dcbn-on-acc,#111);border-color:transparent}" +
      ".dcbn-err{color:#e0574b;font-size:11px;min-height:14px}";
    (document.head || document.documentElement).appendChild(st);
  }

  // ── the popover: pick a kind, fill it in, Add ───────────────────────────────
  var pop = null, popClose = null, popMove = null;
  function closePop() { if (pop) { pop.remove(); pop = null; } if (popMove) { window.removeEventListener("scroll", popMove, true); window.removeEventListener("resize", popMove); popMove = null; } if (popClose) { document.removeEventListener("mousedown", popClose, true); document.removeEventListener("keydown", popClose, true); popClose = null; } }
  function openPop(anchor, onAdd, startKind, only, noCharges) {
    closePop(); injectCss();
    pop = document.createElement("div"); pop.className = "dcbn-pop";
    var kinds = (only && only.length) ? KINDS.filter(function (x) { return only.indexOf(x.k) >= 0; }) : KINDS;
    var kind = startKind || kinds[0].k;
    pop.innerHTML = '<div class="dcbn-kinds"' + (kinds.length < 2 ? ' style="display:none"' : "") + ">" + kinds.map(function (x) { return '<button type="button" class="dcbn-kind" data-k="' + x.k + '" title="' + esc(x.tip) + '">' + esc(x.label) + "</button>"; }).join("") + "</div>" +
      '<div class="dcbn-tip"></div><div class="dcbn-form"></div><div class="dcbn-err"></div>' +
      '<div class="dcbn-acts"><button type="button" class="dcbn-btn dcbn-cancel">Cancel</button><button type="button" class="dcbn-btn go dcbn-ok">Add</button></div>';
    document.body.appendChild(pop);
    // Theme hooks set on the strip (e.g. a dark modal on a light page) follow it into the popover.
    try { var cs = getComputedStyle(anchor); ["--dcbn-pop-bg", "--dcbn-pop-fg", "--dcbn-pop-bd", "--dcbn-acc", "--dcbn-on-acc", "--dcbn-font"].forEach(function (v) { var x = cs.getPropertyValue(v); if (x && x.trim()) pop.style.setProperty(v, x.trim()); }); } catch (e) {}
    var form = pop.querySelector(".dcbn-form"), tip = pop.querySelector(".dcbn-tip"), err = pop.querySelector(".dcbn-err");
    function statSel() { return '<select class="dcbn-stat">' + STATS.map(function (s) { return '<option value="' + s[0] + '">' + s[1] + "</option>"; }).join("") + "</select>"; }
    function amt(ph) { return '<input type="number" class="dcbn-amt" step="1" placeholder="' + (ph || "+N") + '">'; }
    function search(ph) { return '<div class="dcbn-row"><input type="text" class="dcbn-q" placeholder="' + ph + '" autocomplete="off"></div><div class="dcbn-sug"></div>'; }
    function listFor(k) { return k === "skill" ? skillList() : k === "spell" ? spellList() : k === "buff" ? buffList() : []; }
    function metaFor(k, x) {
      if (k === "skill") return [x.stat, x.passive ? "passive" : x.category].filter(Boolean).join(" · ");
      if (k === "spell") return [x.type, x.mana != null ? x.mana + " Mana" : ""].filter(Boolean).join(" · ");
      if (k === "buff") return x.kind || "";
      return "";
    }
    function render() {
      [].forEach.call(pop.querySelectorAll(".dcbn-kind"), function (b) { b.classList.toggle("on", b.dataset.k === kind); });
      tip.textContent = KIND[kind].tip; err.textContent = "";
      var h = "";
      if (kind === "stat") h = '<div class="dcbn-row">' + amt("+N") + statSel() + "</div>";
      else if (kind === "skill") h = search("Search skills…") + '<div class="dcbn-row">' + amt("ranks") + '<label class="dcbn-chk"><input type="checkbox" class="dcbn-floor"> Rank = Floor</label></div>';
      else if (kind === "spell") h = search("Search spells, or type any name…") + '<div class="dcbn-row">' + amt("Rank (optional)") + "</div>" +
        (noCharges ? "" : '<div class="dcbn-row"><input type="number" class="dcbn-uses" min="1" max="20" step="1" value="1" title="Casts before it needs to recharge" style="max-width:64px"> <span style="align-self:center">uses per</span> <select class="dcbn-reset"><option value="short">short rest</option><option value="long" selected>long rest</option><option value="floor">Floor</option></select></div>');
      else if (kind === "buff") h = search("Search buffs, or type any name…");
      else if (kind === "note") h = '<div class="dcbn-row"><input type="text" class="dcbn-q" placeholder="e.g. Resist Fire damage · Summons minions" maxlength="160"></div>';
      else h = '<div class="dcbn-row">' + amt() + "</div>";
      form.innerHTML = h;
      var q = form.querySelector(".dcbn-q"), sug = form.querySelector(".dcbn-sug");
      if (q && sug) {
        var paint = function () {
          var t = norm(q.value).toLowerCase();
          var hits = listFor(kind).filter(function (x) { return !t || x.name.toLowerCase().indexOf(t) >= 0; }).slice(0, 40);
          sug.innerHTML = hits.map(function (x) { return '<div data-n="' + esc(x.name) + '"><span>' + esc(x.name) + "</span><small>" + esc(metaFor(kind, x)) + "</small></div>"; }).join("");
        };
        q.addEventListener("input", paint); paint();
        sug.addEventListener("mousedown", function (e) { var d = e.target.closest("[data-n]"); if (!d) return; e.preventDefault(); q.value = d.getAttribute("data-n"); sug.innerHTML = ""; var a = form.querySelector(".dcbn-amt"); if (a) a.focus(); });
      }
      var fl = form.querySelector(".dcbn-floor"), am = form.querySelector(".dcbn-amt");
      if (fl && am) fl.addEventListener("change", function () { am.disabled = fl.checked; });
      var first = form.querySelector(".dcbn-q,.dcbn-amt"); if (first) setTimeout(function () { try { first.focus(); } catch (e) {} }, 0);
    }
    function collect() {
      var b = { kind: kind }, a = form.querySelector(".dcbn-amt"), q = form.querySelector(".dcbn-q"), s = form.querySelector(".dcbn-stat"), fl = form.querySelector(".dcbn-floor");
      if ((AMT_KINDS[kind] || kind === "spell") && !(fl && fl.checked)) b.amount = a ? int(a.value) : 0;
      if (s) b.target = s.value;
      if (q) b.target = norm(q.value);
      if (kind === "skill") { var sd = findSkill(b.target); if (sd) b.target = sd.name; if (fl && fl.checked) b.floor = true; }
      if (kind === "spell") {
        var sp = findSpell(b.target); if (sp) b.target = sp.name;
        var us = form.querySelector(".dcbn-uses"), rs = form.querySelector(".dcbn-reset");
        if (us && int(us.value) > 0) { b.uses = int(us.value); b.reset = rs ? rs.value : "long"; }
      }
      if (kind === "buff") { var bf = findBuff(b.target); if (bf) b.target = bf.name; }
      var o = one(b);
      if (!o) { err.textContent = AMT_KINDS[kind] && !(fl && fl.checked) && !(b.amount) ? "Enter an amount." : "Fill it in first."; return null; }
      return o;
    }
    pop.addEventListener("click", function (e) {
      var kb = e.target.closest(".dcbn-kind"); if (kb) { kind = kb.dataset.k; render(); if (popMove) popMove(); return; }
      if (e.target.closest(".dcbn-cancel")) { closePop(); return; }
      if (e.target.closest(".dcbn-ok")) { var o = collect(); if (o) { closePop(); onAdd(o); } }
    });
    pop.addEventListener("keydown", function (e) { if (e.key === "Enter" && !e.target.closest(".dcbn-kind")) { e.preventDefault(); var o = collect(); if (o) { closePop(); onAdd(o); } } });
    render();
    // place under (or above) the anchor, inside the viewport — and RE-place on any
    // scroll (capture phase, so an inner scrolling panel counts) or resize: the
    // picker is position:fixed, so otherwise it stayed put while the button moved.
    function place() {
      if (!pop) return;
      var r = anchor.getBoundingClientRect(), w = pop.offsetWidth, h = pop.offsetHeight;
      var x = Math.min(Math.max(8, r.left), window.innerWidth - w - 8);
      var y = r.bottom + 6; if (y + h > window.innerHeight - 8) y = Math.max(8, r.top - h - 6);
      pop.style.left = x + "px"; pop.style.top = y + "px";
    }
    place();
    var raf = 0;
    popMove = function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(place); };
    window.addEventListener("scroll", popMove, true);
    window.addEventListener("resize", popMove);
    popClose = function (e) {
      if (e.type === "keydown") { if (e.key === "Escape") closePop(); return; }
      if (pop && !pop.contains(e.target) && e.target !== anchor) closePop();
    };
    document.addEventListener("mousedown", popClose, true);
    document.addEventListener("keydown", popClose, true);
  }

  // ── the badge strip (editable or read-only) ─────────────────────────────────
  // editor(el, { benefits, onChange(list), readonly, empty, kinds: ['spell'], addLabel, extra: [{label,title,onClick}] })
  // Returns { get(), set(list) }.
  function editor(el, opts) {
    injectCss(); opts = opts || {};
    var list = normalize(opts.benefits);
    function paint() {
      var h = list.map(function (b, i) {
        return '<span class="dcbn-b dcbn-k-' + b.kind + (opts.readonly ? " ro" : "") + '" title="' + esc((KIND[b.kind] || {}).tip || "") + '"><span>' + esc(label(b)) + "</span>" +
          (opts.readonly ? "" : '<button type="button" class="dcbn-x" data-i="' + i + '" title="Remove this bonus" aria-label="Remove">×</button>') + "</span>";
      }).join("");
      if (!list.length && opts.empty) h += '<span class="dcbn-empty">' + esc(opts.empty) + "</span>";
      if (!opts.readonly) h += '<button type="button" class="dcbn-add" title="Add a bonus">' + esc(opts.addLabel || "+ Bonus") + "</button>";
      (opts.extra || []).forEach(function (x, i) { h += '<button type="button" class="dcbn-add dcbn-extra" data-x="' + i + '" title="' + esc(x.title || "") + '">' + esc(x.label) + "</button>"; });
      el.innerHTML = '<div class="dcbn">' + h + "</div>";
    }
    function changed() { paint(); if (opts.onChange) opts.onChange(list.slice()); }
    el.addEventListener("click", function (e) {
      var x = e.target.closest(".dcbn-x"); if (x) { list.splice(+x.dataset.i, 1); changed(); return; }
      var a = e.target.closest(".dcbn-add:not(.dcbn-extra)"); if (a) { openPop(a, function (b) { list.push(b); changed(); }, null, opts.kinds, opts.noCharges); return; }
      var ex = e.target.closest(".dcbn-extra"); if (ex) { var f = (opts.extra || [])[+ex.dataset.x]; if (f && f.onClick) f.onClick(); }
    });
    paint();
    return { get: function () { return list.slice(); }, set: function (v) { list = normalize(v); paint(); }, opts: opts, repaint: paint };
  }

  // ── rolling bonuses from the book's loot tables (Tables 39/40/41) ──────────
  // tier: Silver…Celestial (the X value + number of rolls); cat picks the table
  // (armor → 40 Clothing, accessory → 41, anything else → 39 Mundane/Weapon).
  // "Something Unique" (Table 42) is never rolled — a sheet can't apply it.
  var DMG_UNCOMMON = ["Acid", "Cold", "Fire", "Lightning", "Poison", "Necrotic", "Psychic", "Radiant", "Force", "Sonic"];
  function pick(a) { return a && a.length ? a[Math.floor(Math.random() * a.length)] : null; }
  function lootTable(n) { var L = g("DCC_LOOT"); return L ? (L.tables || []).find(function (t) { return new RegExp("Table " + n + "\\b").test(t.name || ""); }) || null : null; }
  function lootTier(t) { var L = g("DCC_LOOT"); var ts = L ? L.tiers || [] : []; return ts.find(function (x) { return x.tier === t; }) || null; }
  function rollRow(table) {
    if (!table || !table.rows || !table.rows.length) return null;
    var sides = parseInt(String(table.die || "d6").replace(/\D/g, ""), 10) || table.rows.length, r = 1 + Math.floor(Math.random() * sides);
    return table.rows.find(function (x) { var s = String(x.roll).replace(/[–—]/g, "-"), m = s.match(/^(\d+)\s*-\s*(\d+)$/); return m ? r >= +m[1] && r <= +m[2] : parseInt(s, 10) === r; }) || table.rows[table.rows.length - 1];
  }
  function rollX(tier, which) {   // which: 'skill' | 'stat' → a number from the tier's X guidance
    var t = lootTier(tier), x = String(t ? t.xValue : "").replace(/[–—]/g, "-");
    var m = x.match(/\+?(\d+)(?:-(\d+))?%?\s*Skill Rank\s*or\s*\+?(\d+)(?:-(\d+))?%?\s*Stat/i);
    if (!m) return 1;
    var a = which === "skill" ? +m[1] : +m[3], b = which === "skill" ? +(m[2] || m[1]) : +(m[4] || m[3]);
    return a + Math.floor(Math.random() * (b - a + 1));
  }
  function rollOne(tier, cat) {
    var table = lootTable(cat === "armor" ? 40 : cat === "accessory" ? 41 : 39), row, n = 0;
    do { row = rollRow(table); n++; } while (row && /something unique|table 42/i.test(row.result) && n < 12);
    var p = row ? String(row.result) : "+X Stat";
    if (/\bX\b/.test(p) && /skill/i.test(p)) { var sk = pick(skillList()); return { kind: "skill", target: sk ? sk.name : "Athletics", amount: rollX(tier, "skill") }; }
    if (/\bX\b/.test(p)) return { kind: "stat", target: pick(STATS)[0], amount: rollX(tier, "stat") };
    if (/damage resistance/i.test(p)) { var d = p.match(/(\d+)/); return { kind: "dr", amount: d ? +d[1] : 1 }; }
    if (/resistance to an uncommon/i.test(p)) return { kind: "buff", target: "Resistance: " + pick(DMG_UNCOMMON) };
    if (/external buff/i.test(p)) return { kind: "buff", target: Math.random() < 0.5 ? "Recovery" : "Restore" };
    if (/buff/i.test(p)) { var bf = pick(buffList()); return bf ? { kind: "buff", target: bf.name } : null; }
    if (/passive skill/i.test(p)) { var ps = pick(skillList().filter(function (x) { return x.passive; })) || pick(skillList()); return ps ? { kind: "skill", target: ps.name, floor: true, amount: 0 } : null; }
    if (/inherent spell/i.test(p)) { var sp = pick(spellList()); return sp ? { kind: "spell", target: sp.name, uses: 1, reset: "long" } : null; }
    return null;
  }
  function rollBonuses(tier, cat) {
    var t = lootTier(tier), n = Math.max(1, t && typeof t.gearRolls === "number" ? t.gearRolls : 1), out = [], seen = {};
    for (var i = 0; i < n; i++) {
      var b = null, tries = 0;
      do { b = one(rollOne(tier, cat)); tries++; } while ((!b || seen[label(b)]) && tries < 8);
      if (b && !seen[label(b)]) { seen[label(b)] = 1; out.push(b); }
    }
    return out;
  }
  function randomSpell() { var sp = pick(spellList()); return sp ? { kind: "spell", target: sp.name } : null; }

  window.DCCBonus = {
    rollBonuses: rollBonuses, randomSpell: randomSpell, TIERS: ["Silver", "Gold", "Platinum", "Legendary", "Celestial"],
    KINDS: KINDS, STATS: STATS, normalize: normalize, label: label, summary: summary, fromText: fromText,
    editor: editor, openPicker: openPop, closePicker: closePop, injectCss: injectCss,
    findSkill: findSkill, findSpell: findSpell, findBuff: findBuff, statLabel: statLabel,
  };
})();
