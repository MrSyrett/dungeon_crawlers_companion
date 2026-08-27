// Dungeon Crawler Carl — Loot Box roller
// Loaded by tools/templates/dcc_character_sheet.html as <script src>, after
// /tools-data/dcc-loot.js + dcc-items.js (DCC_LOOT / DCC_ITEMS) and the sheet.
//
// Rolls a loot box of a chosen tier: gold (per the tier's formula), a consumable or
// two, and the tier's gear, all drawn from the item catalog. You review the roll and
// add the checked results to your Inventory; gold is folded into a single Gold slot.
// The magic-item *generator* tables (38–42) stay in the data layer for later GM tools.

(function () {
  "use strict";

  function haveData() { return typeof DCC_LOOT !== "undefined" && typeof DCC_ITEMS !== "undefined"; }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function attr(s) { return esc(s).replace(/'/g, "&#39;"); }
  var d = function (n) { return Math.floor(Math.random() * n) + 1; };

  var tier = "Bronze";
  var result = null;    // { gold, items:[{name,category,notes,on}] }

  function tierData(t) { return DCC_LOOT.tiers.find(function (x) { return x.tier === t; }) || DCC_LOOT.tiers[0]; }
  function itemsOfTier(t, cats) {
    return DCC_ITEMS.filter(function (it) { return it.tier === t && cats.indexOf(it.category) >= 0; });
  }
  function pickN(arr, n) {
    var pool = arr.slice(), out = [];
    while (out.length < n && pool.length) { out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]); }
    return out;
  }
  // Parse a gold formula like "1d10 ×100", "2d6 ×1000", "1d10 ×10,000", "none".
  function rollGold(formula) {
    var f = String(formula || "");
    if (/none/i.test(f)) return 0;
    var m = f.match(/(\d+)\s*d\s*(\d+)/i);
    if (!m) return 0;
    var num = parseInt(m[1], 10), sides = parseInt(m[2], 10), total = 0;
    for (var i = 0; i < num; i++) total += d(sides);
    var mult = f.match(/[x×]\s*([\d,]+)/i);
    if (mult) total *= parseInt(mult[1].replace(/,/g, ""), 10) || 1;
    return total;
  }

  function roll() {
    var td = tierData(tier);
    var consumables = itemsOfTier(tier, ["consumable", "scroll", "tome", "material", "mundane"]);
    var gear = itemsOfTier(tier, ["weapon", "armor", "accessory"]);
    var items = [];
    pickN(consumables, 1 + (d(2) === 2 ? 1 : 0)).forEach(function (it) { items.push({ name: it.name, category: it.category, notes: it.effect, on: true }); });
    var g = pickN(gear, td.gearRolls);
    g.forEach(function (it) { items.push({ name: it.name, category: it.category, notes: (it.slot ? it.slot + " — " : "") + it.effect, on: true }); });
    // Celestial (and any tier with no catalog gear) leaves a GM-discretion note.
    if (td.gearRolls > g.length) {
      var missing = td.gearRolls - g.length;
      for (var i = 0; i < missing; i++) items.push({ name: td.tier + " item (GM's discretion)", category: "special", notes: "Enchant guideline: " + td.xValue, on: true });
    }
    result = { gold: rollGold(td.gold), items: items };
    render();
  }

  // ── inventory writes ─────────────────────────────────────────────────────────
  function fire(el) { if (!el) return; try { var Ev = (el.ownerDocument && el.ownerDocument.defaultView && el.ownerDocument.defaultView.Event) || Event; el.dispatchEvent(new Ev("input", { bubbles: true })); } catch (e) {} }
  function addInvItem(name, qty, notes) {
    if (typeof addInvRow !== "function") return;
    addInvRow();
    var body = document.getElementById("inv-body");
    var tr = body ? body.lastElementChild : null;
    if (!tr) return;
    var ins = tr.querySelectorAll('input[type="text"]');   // [item, qty, notes]
    if (ins[0]) ins[0].value = name;
    if (ins[1]) ins[1].value = String(qty == null ? "1" : qty);
    if (ins[2]) ins[2].value = notes || "";
    fire(ins[0]);
  }
  function addGold(amount) {
    if (!amount) return;
    var rows = [].slice.call(document.querySelectorAll("#inv-body tr"));
    for (var i = 0; i < rows.length; i++) {
      var ins = rows[i].querySelectorAll('input[type="text"]');
      if (ins[0] && ins[0].value.trim().toLowerCase() === "gold") {
        var cur = parseInt(String(ins[1] ? ins[1].value : "0").replace(/[^\d]/g, ""), 10) || 0;
        if (ins[1]) { ins[1].value = String(cur + amount); fire(ins[1]); }
        return;
      }
    }
    addInvItem("Gold", amount, "Currency (all gold fits one slot).");
  }
  function add() {
    if (!result) return;
    var added = 0;
    result.items.forEach(function (it) { if (it.on) { addInvItem(it.name, "1", it.notes); added++; } });
    if (result.gold) addGold(result.gold);
    try { if (window.DCCHotlist) window.DCCHotlist.refresh(); } catch (e) {}
    try {
      if (typeof addLog === "function") addLog(tier + " Loot Box", (result.gold ? "+" + result.gold.toLocaleString("en") + " g" : "opened"), added + " item(s) added to Inventory", "normal");
    } catch (e) {}
    close();
  }

  // ── CSS ────────────────────────────────────────────────────────────────────────
  function injectCss() {
    if (document.getElementById("dccl-css")) return;
    var st = document.createElement("style");
    st.id = "dccl-css";
    st.textContent = [
      ".dccl-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:10000;display:flex;align-items:flex-start;justify-content:center;padding:32px 12px;overflow:auto;}",
      ".dccl-modal{background:#141416;color:#ece9e1;border:1px solid #2a2a2e;border-radius:12px;max-width:560px;width:100%;box-shadow:0 24px 60px rgba(0,0,0,.5);font-family:'Barlow',sans-serif;}",
      ".dccl-head{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 18px;border-bottom:1px solid #2a2a2e;}",
      ".dccl-head h3{margin:0;font-size:15px;text-transform:uppercase;letter-spacing:.03em;color:#fff;}",
      ".dccl-x{background:transparent;border:1px solid #333;color:#888;border-radius:6px;width:28px;height:28px;cursor:pointer;}",
      ".dccl-x:hover{border-color:#c8892a;color:#e6c15a;}",
      ".dccl-bar{display:flex;gap:8px;align-items:center;padding:12px 18px;}",
      ".dccl-bar select{flex:1;background:#0e0e10;border:1px solid #2a2a2e;border-radius:6px;color:#ece9e1;padding:8px 10px;font-size:13px;font-family:inherit;}",
      ".dccl-btn{border:1px solid #2a2a2e;background:#3a2a14;color:#e6c15a;border-radius:6px;padding:8px 14px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;cursor:pointer;}",
      ".dccl-btn:hover{border-color:#c8892a;}",
      ".dccl-btn.primary{background:#8a5a2f;color:#fff;border-color:#8a5a2f;}",
      ".dccl-btn.primary:hover{background:#a06a38;}",
      ".dccl-list{padding:4px 18px 8px;max-height:52vh;overflow:auto;}",
      ".dccl-gold{color:#e6c15a;font-weight:700;font-size:14px;padding:6px 0 4px;}",
      ".dccl-item{display:flex;gap:8px;align-items:flex-start;border-top:1px solid #2a2a2e;padding:8px 0;}",
      ".dccl-item input{margin-top:3px;}",
      ".dccl-item .nm{font-weight:700;color:#f0a8a3;font-size:13px;}",
      ".dccl-item .nt{color:#8a8a93;font-size:12px;line-height:1.4;margin-top:2px;}",
      ".dccl-empty{color:#8a8a93;font-size:12px;padding:10px 0;}",
      ".dccl-foot{display:flex;justify-content:flex-end;gap:8px;padding:12px 18px 16px;border-top:1px solid #2a2a2e;}",
    ].join("\n");
    document.head.appendChild(st);
  }

  // ── render ─────────────────────────────────────────────────────────────────────
  function open() {
    if (!haveData()) { alert("The loot data didn't load. Open this sheet from the app so /tools-data/dcc-loot.js and dcc-items.js are available."); return; }
    injectCss();
    result = null;
    var ov = document.getElementById("dccl-overlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "dccl-overlay"; ov.className = "dccl-overlay";
      ov.addEventListener("mousedown", function (e) { if (e.target === ov) close(); });
      document.body.appendChild(ov);
    }
    ov.style.display = "flex";
    render();
  }
  function close() { var ov = document.getElementById("dccl-overlay"); if (ov) ov.style.display = "none"; }
  function render() {
    var ov = document.getElementById("dccl-overlay");
    if (!ov) return;
    var opts = DCC_LOOT.tiers.map(function (t) {
      return '<option value="' + attr(t.tier) + '" ' + (t.tier === tier ? "selected" : "") + '>' + esc(t.tier) + ' — ' + esc(t.gearRolls + " gear · " + t.gold) + '</option>';
    }).join("");
    var body;
    if (!result) {
      body = '<div class="dccl-list"><p class="dccl-empty">Pick a tier and roll. Gold, a consumable or two, and the tier’s gear are drawn from the catalog.</p></div>';
    } else {
      var rows = result.items.map(function (it, i) {
        return '<label class="dccl-item"><input type="checkbox" ' + (it.on ? "checked" : "") + ' onchange="DCCLoot.toggle(' + i + ',this.checked)">' +
          '<span><span class="nm">' + esc(it.name) + '</span><span class="nt">' + esc(it.notes || "") + '</span></span></label>';
      }).join("") || '<p class="dccl-empty">No catalog items at this tier — see the gold and GM notes.</p>';
      body = '<div class="dccl-list">' +
        (result.gold ? '<div class="dccl-gold">' + result.gold.toLocaleString("en") + ' gold</div>' : "") +
        rows + '</div>';
    }
    ov.innerHTML =
      '<div class="dccl-modal" role="dialog" aria-label="Loot Box">' +
        '<div class="dccl-head"><h3>🎁 Loot Box</h3><button class="dccl-x" onclick="DCCLoot.close()" aria-label="Close">✕</button></div>' +
        '<div class="dccl-bar"><select onchange="DCCLoot.setTier(this.value)">' + opts + '</select>' +
          '<button class="dccl-btn primary" onclick="DCCLoot.roll()">🎲 Roll</button></div>' +
        body +
        '<div class="dccl-foot"><button class="dccl-btn" onclick="DCCLoot.close()">Close</button>' +
          '<button class="dccl-btn primary" onclick="DCCLoot.add()"' + (result ? "" : " disabled style=\"opacity:.4;cursor:not-allowed;\"") + '>Add to Inventory</button></div>' +
      '</div>';
  }

  window.DCCLoot = {
    open: open,
    close: close,
    setTier: function (t) { tier = t; },
    roll: roll,
    toggle: function (i, on) { if (result && result.items[i]) result.items[i].on = on; },
    add: add,
  };
})();
