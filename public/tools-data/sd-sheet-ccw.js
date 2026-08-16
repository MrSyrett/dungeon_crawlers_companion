// SD character sheet — Character Creation wizard (+ CCW_BG_DESC,
// CCW_KIT_ITEMS data). Split out of sd_character_sheet.html (~119KB only
// used when the creation modal opens) so the browser caches it. Loaded at
// the same point in the page; declaration order unchanged.
// scripts/extract-game-data.mjs reads CCW_BG_DESC from THIS file.
// ═══ CHARACTER CREATION WIZARD ═══════════════════════════════════════════
const CCW_BG_DESC = {
  'Urchin': 'You grew up in the merciless streets of a large city',
  'Wanted': "There's a price on your head, but you have allies",
  'Cult Initiate': 'You know blasphemous secrets and rituals',
  "Thieves' Guild": 'You have connections, contacts, and debts',
  'Banished': 'Your people cast you out for supposed crimes',
  'Orphaned': 'An unusual guardian rescued and raised you',
  "Wizard's Apprentice": 'You have a knack and eye for magic',
  'Jeweler': 'You can easily appraise value and authenticity',
  'Herbalist': 'You know plants, medicines, and poisons',
  'Barbarian': 'You left the horde, but it never quite left you',
  'Mercenary': 'You fought friend and foe alike for your coin',
  'Sailor': 'Pirate, privateer, or merchant — the seas are yours',
  'Acolyte': "You're well trained in religious rites and doctrines",
  'Soldier': 'You served as a fighter in an organized army',
  'Ranger': 'The woods and wilds are your true home',
  'Scout': 'You survived on stealth, observation, and speed',
  'Minstrel': "You've traveled far with your charm and talent",
  'Scholar': 'You know much about ancient history and lore',
  'Noble': 'A famous name has opened many doors for you',
  'Chirurgeon': 'You know anatomy, surgery, and first aid',
  "Hermit": "The wilds (and its creatures) are your family",
  "Outcast": "You were thrown out for real or supposed crimes",
  "Woodborn": "They found you in the hollow of an oak tree",
  "Amnesiac": "Your past is a haze, but some memories return",
  "Haunted": "A restless spirit wants something from you",
  "Fugitive": "An anonymous savior helped you disappear",
  "Feytouched": "A fairy befriended you in your childhood",
  "Witchborn": "They burned your mother, but spared you",
  "Forager": "You know how to find the edible and the deadly",
  "Redeemer": "You must redeem the name of your kin",
  "Marked": "You carry an eldritch mark. Is it a curse, or a gift?",
  "Sacrifice": "You were to be ritually sacrificed, but escaped",
  "Marooned": "They left you behind, but you refused to die",
  "Fallen": "You fell from grace. Will you atone, or embrace it?",
  "Drawn": "You hear a whispered call and follow it",
  "Ascetic": "People fear you, but seek out your guidance",
  "Wolfchild": "Long ago, you walked into town wearing pelts",
  "Healer": "You understand how life and death intertwine",
  "Chosen": "An eldritch being selected you for a purpose",
  "Demonborn": "An ancestor of yours is a powerful demon",
  "Freed": "You were a thrall, but escaped or won your freedom",
  "Displaced": "You fled after a rival jarl attacked your village",
  "Criminal": "You were exiled from your village for a crime",
  "Drifter": "You have not yet found a jarl worthy of your loyalty",
  "Crop Farmer": "You toil in the earth and know all plants",
  "Livestock Farmer": "You have intuition about all animals",
  "Hunter": "You know how to move quietly in the wilds",
  "Fisher": "You know all the sea creatures and legends",
  "Enforcer": "You enforce the jarl's law in your village",
  "Trader": "You have mercantile connections in every village",
  "Crafter": "You can make and fix any utilitarian item",
  "Bowyer": "You can make and fix any bow or arrow",
  "Seer's Apprentice": "You know some of the mystic arts",
  "Shipwright": "You know how to build and repair longboats",
  "Blacksmith": "Weapons, armor, horseshoes; you do it all",
  "Far Traveler": "You know many distant people and customs",
  "Skald": "You are a poet and know all the ancient ballads",
  "Heroborn": "You are the descendant of a famous warrior",
  "Nobleborn": "You are the child of a 1d6: 1-5 jarl, 6 king",
  "God's Blood": "You are descended from a god; it marks you",
};

const CCW_COMMON_LANGS = ['Dwarvish','Elvish','Giant','Goblin','Merran','Orcish','Reptilian','Sylvan','Thanian'];
const CCW_RARE_LANGS   = ['Celestial','Diabolic','Draconic','Primordial'];
const CCW_ARMOR_TYPES  = ['Leather armor','Chainmail','Plate mail','Shield'];
const CCW_REMEDIES     = SD_REMEDIES.map(r => r.name);
const CCW_ALL_STATS    = ['STR','DEX','CON','INT','WIS','CHA'];

// ── Talent choice resolver ─────────────────────────────────────────────────
// Analyzes talent text and returns a "pending" object describing needed choices
function ccwAnalyzeTalent(text, cls) {
  const p = { text: text, cls: cls, kind: 'none', options: [], picked: null, picked2: null, final: text, statBoost: {}, sub: null };
  if(!text) return p;
  // Homebrew classes resolve their talents through the effect-based pickers
  // (choose-one, learn spell, and the Choices step). Skip the official text
  // parser so choices aren't offered twice.
  if(RC_CLASS_INFO[cls] && RC_CLASS_INFO[cls]._hb) return p;

  if(/^Choose a talent/i.test(text)) {
    p.kind = 'meta';
    p.hasStatAlt = /\+2/.test(text);
    p.final = null;
    return p;
  }
  if(/\+2 points? to (distribute to )?(any )?stats/i.test(text)) {
    p.kind = 'distribute'; p.final = null; return p;
  }
  // Roustabout: "+1 to any stat and roll another talent" — +1 to a chosen stat,
  // then a second talent from the table.
  if(/\+1 to any stat and roll another talent/i.test(text)) { p.kind = 'statplustalent'; p.final = null; return p; }
  // Roustabout / Warlock: "+1 to any two stats" / "Add +1 point to two stats (must be different)".
  if(/\+1 (point )?to (any )?two stats/i.test(text) || /two stats \(they (can't be the same|must be different)\)/i.test(text)) { p.kind = 'twostats'; p.final = null; return p; }
  // Roustabout: "Gain the ability to wield a new weapon or armor" (must precede
  // the generic " or " catch-all, which would otherwise split "weapon or armor").
  if(/wield a new weapon or armor/i.test(text)) { p.kind = 'wieldnew'; p.final = null; return p; }
  // Roustabout: "Roll an extra hit points die this level" — no pick; the HP step reads it.
  if(/extra hit points? die/i.test(text)) { p.kind = 'extrahd'; p.final = text; return p; }
  // Pit Fighter: "+2 to Strength or Constitution stat, or +1 to melee attacks" — 3-way pick
  if(/^\+2 to Strength or Constitution stat, or \+1 to melee attacks/i.test(text)) {
    p.kind = 'ortwo';
    p.options = ['+2 to Strength stat', '+2 to Constitution stat', '+1 to melee attacks'];
    p.final = null; return p;
  }
  // Mixed "<stat option> or <flat bonus>" rows — "+2 to Intelligence stat or +1
  // to spellcasting checks", "+2 to Strength or Constitution stat, or +1 to
  // attacks". Split at the " or " that introduces the bonus (the one followed by
  // a number) rather than at every " or ", so a two-stat list survives as one
  // option and ccwOptionChoice can turn it into its own picker. Works with or
  // without the comma, which is the only thing that varies between classes.
  const mixed = / stat/i.test(text) ? text.match(/,?\s+or\s+\+\d/i) : null;
  if(mixed && mixed.index > 0) {
    p.kind = 'ortwo';
    p.options = [text.slice(0, mixed.index).trim(), text.slice(mixed.index).replace(/^,?\s*or\s+/i, '').trim()];
    p.final = null; return p;
  }
  if(/attacks or \+1 to Magical Dabbler/i.test(text)) {
    const parts = text.split(/ or /);
    p.kind = 'ortwo'; p.options = [parts[0].trim(), parts.slice(1).join(' or ').trim()];
    p.final = null; return p;
  }
  const statMatch = text.match(/\+2 to ([A-Za-z, ]+?) stat/);
  if(statMatch && /,| or /.test(statMatch[1]) && !/ stat,? or \+?\d/i.test(text)) {
    // Pure stat pick (e.g. "+2 to Strength, Dexterity, or Constitution stat").
    // The guard skips mixed talents like "+2 to WIS or CHA stat, or +1 to
    // spellcasting checks", which the generic picker below handles as a whole.
    p.kind = 'statpick';
    p.options = statMatch[1].split(/,| or /).map(s=>s.trim()).filter(Boolean);
    p.final = null; return p;
  }
  if(/melee or ranged/i.test(text)) {
    p.kind = 'meleeranged'; p.final = null; return p;
  }
  if(/weapon type/i.test(text)) {
    p.kind = 'weapon'; p.final = null; return p;
  }
  if(/one spell you know/i.test(text)) {
    p.kind = 'spellknown'; p.final = null; return p;
  }
  if(/^Learn (an|one) additional .*spell/i.test(text)) {
    // Wizard / Witch / Seer "learn an additional spell" rows: resolved on the
    // Learn Spells step (the same rich picker homebrew classes use).
    p.kind = 'learnspell'; return p;
  }
  if(/armor type/i.test(text)) {
    p.kind = 'armor'; p.final = null; return p;
  }
  if(/remedy you choose/i.test(text)) {
    p.kind = 'remedy'; p.final = null; return p;
  }
  if(/priest or wizard wand/i.test(text)) {
    p.kind = 'wand'; p.final = null; return p;
  }
  // Generic either/or catch-all: any talent that still contains " or " is an
  // unresolved choice, so offer the options as a pick and write only the
  // selected one. Handles class talents the specific parsers above don't name
  // individually (e.g. "+1 to your spellcasting checks or +1 to melee attacks"),
  // so the Talents box never keeps the full "A or B" prose. A top-level ", or "
  // separates options, so we split on that first and only fall back to a bare
  // " or " when there's no comma — that keeps a phrase like "WIS or CHA stat"
  // intact as a single option instead of shredding it.
  if(/,? or /i.test(text)) {
    const opts = (/, or /i.test(text) ? text.split(/, or /i) : text.split(/ or /i))
      .map(s=>s.trim()).filter(Boolean);
    if(opts.length >= 2) {
      // "You gain +1 to attacks or damage" splits into "…attacks" and a bare
      // "damage", which is meaningless on its own in the Talents box and matches
      // no effect parser. When a later option carries no bonus of its own, hand
      // it the leading "<verb> +N to " from the first one so both options read
      // as full talents.
      const lead = opts[0].match(/^(.*?\+\d+\s+to\s+)\S/i);
      if(lead) for(let i=1;i<opts.length;i++) if(!/\+\d/.test(opts[i])) opts[i] = lead[1] + opts[i];
      p.kind = 'ortwo'; p.options = opts; p.final = null; return p;
    }
  }
  return p;
}

// A picked either/or option can itself still hide a choice — the Sea Wolf's
// "+2 to Strength or Constitution stat, or +1 to attacks" splits at the top-level
// ", or " into an option that STILL needs a stat named. Re-analyze the chosen
// option and hand back a nested pending object when one is needed, so no class's
// wording has to be special-cased the way the Pit Fighter's row was.
// Returns null when the option is already final.
function ccwOptionChoice(text, cls) {
  if(!text) return null;
  const sub = ccwAnalyzeTalent(text, cls);
  if(!sub || sub.kind === 'none') return null;
  // Refuse a split that made no progress (an option that re-analyzes to itself),
  // which is what would let the nesting recurse forever.
  if(sub.kind === 'ortwo' && (sub.options.length < 2 || sub.options.some(o => o === text))) return null;
  return sub;
}

// Renders the choice UI for a pending talent. stateRef is the JS path string to the pending object.
function ccwTalentChoiceUI(p, stateRef, knownSpells, cls) {
  if(!p || p.kind==='none') return '';
  if(p.kind==='learnspell') return '';   // resolved on the Learn Spells step
  let h = '<div style="background:#0f0f0f;border:1px solid #7a5a00;padding:10px 12px;margin-top:8px;">';
  h += '<div style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.12em;color:#c8a020;margin-bottom:6px;"><svg class="dcc-ico" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="display:inline-block;vertical-align:-0.14em"><path d="M6 3a1 1 0 0 1 1 1v16a1 1 0 0 1-2 0V4a1 1 0 0 1 1-1Z"/><path d="M8 4.4h10.6a.8.8 0 0 1 .6 1.3L16.8 9l2.4 3.3a.8.8 0 0 1-.6 1.3H8Z"/></svg> Choose your option</div>';

  const setPick  = (v) => stateRef+".picked='"+String(v).replace(/'/g,"\\'")+"';ccwResolve("+stateRef+");";
  const selStyle = 'width:100%;background:#141414;border:1px solid #2a2a2a;color:#eee;font-family:Montserrat,sans-serif;font-size:11px;padding:5px 8px;outline:none;';

  if(p.kind==='ortwo') {
    h += '<select style="'+selStyle+'" onchange="'+stateRef+'.picked=this.value;ccwResolve('+stateRef+');ccwRerender()">';
    h += '<option value="">— choose —</option>';
    p.options.forEach(opt=>{ h += '<option value="'+String(opt).replace(/"/g,'&quot;')+'"'+(p.picked===opt?' selected':'')+'>'+String(opt).replace(/</g,'&lt;')+'</option>'; });
    h += '</select>';
    // The chosen option may need a choice of its own ("+2 to Strength or
    // Constitution stat") — ccwResolve builds it, we just draw it here.
    if(p.sub) h += ccwTalentChoiceUI(p.sub, stateRef+'.sub', knownSpells, cls);
  }
  else if(p.kind==='statpick') {
    h += '<select style="'+selStyle+'" onchange="'+stateRef+'.picked=this.value;ccwResolve('+stateRef+');ccwRerender()">';
    h += '<option value="">— choose —</option>';
    p.options.forEach(st=>{ h += '<option value="'+st+'"'+(p.picked===st?' selected':'')+'>+2 '+st+'</option>'; });
    h += '</select>';
  }
  else if(p.kind==='distribute') {
    h += '<p class="ccw-hint" style="font-size:10px;">Distribute 2 points (pick two — the same stat twice = +2):</p>';
    for(let n=1;n<=2;n++){
      const cur = n===1 ? p.picked : p.picked2;
      h += '<select style="'+selStyle+'margin-bottom:4px;" onchange="'+stateRef+'.'+(n===1?'picked':'picked2')+'=this.value;ccwResolve('+stateRef+');ccwRerender()">';
      h += '<option value="">— +1 to... —</option>';
      CCW_ALL_STATS.forEach(st=>{ h += '<option value="'+st+'"'+(cur===st?' selected':'')+'>'+st+'</option>'; });
      h += '</select>';
    }
  }
  else if(p.kind==='meleeranged') {
    h += '<select style="'+selStyle+'" onchange="'+stateRef+'.picked=this.value;ccwResolve('+stateRef+');ccwRerender()">';
    h += '<option value="">— choose —</option>';
    ['melee','ranged'].forEach(m=>{ h += '<option value="'+m+'"'+(p.picked===m?' selected':'')+'>'+m.charAt(0).toUpperCase()+m.slice(1)+'</option>'; });
    h += '</select>';
  }
  else if(p.kind==='weapon') {
    h += '<select style="'+selStyle+'" onchange="'+stateRef+'.picked=this.value;ccwResolve('+stateRef+');ccwRerender()">';
    h += '<option value="">— Choose weapon type —</option>';
    (typeof SD_WEAPONS!=='undefined'?SD_WEAPONS:[]).forEach(w=>{ h += '<option value="'+w.name+'"'+(p.picked===w.name?' selected':'')+'>'+w.name+' ('+w.damage+')</option>'; });
    h += '</select>';
  }
  else if(p.kind==='spellknown') {
    h += '<select style="'+selStyle+'" onchange="'+stateRef+'.picked=this.value;ccwResolve('+stateRef+');ccwRerender()">';
    h += '<option value="">— Choose a spell you know —</option>';
    (knownSpells||[]).filter(sp=>sp!=='Magic Missile').forEach(sp=>{ h += '<option value="'+sp+'"'+(p.picked===sp?' selected':'')+'>'+sp+'</option>'; });
    h += '</select>';
    if(!(knownSpells||[]).length) h += '<p class="ccw-hint" style="font-size:9px;color:#df6a6a;">No known spells yet — you can note this later.</p>';
  }
  else if(p.kind==='armor') {
    h += '<select style="'+selStyle+'" onchange="'+stateRef+'.picked=this.value;ccwResolve('+stateRef+');ccwRerender()">';
    h += '<option value="">— choose —</option>';
    CCW_ARMOR_TYPES.forEach(a=>{ h += '<option value="'+a+'"'+(p.picked===a?' selected':'')+'>'+a+'</option>'; });
    h += '</select>';
  }
  else if(p.kind==='remedy') {
    h += '<select style="'+selStyle+'" onchange="'+stateRef+'.picked=this.value;ccwResolve('+stateRef+');ccwRerender()">';
    h += '<option value="">— choose —</option>';
    SD_REMEDIES.forEach(r=>{ h += '<option value="'+r.name+'"'+(p.picked===r.name?' selected':'')+'>'+r.name+' (DC '+r.dc+')</option>'; });
    h += '</select>';
  }
  else if(p.kind==='wand') {
    h += '<select style="'+selStyle+'" onchange="'+stateRef+'.picked=this.value;ccwResolve('+stateRef+');ccwRerender()">';
    h += '<option value="">— choose —</option>';
    ['Priest wand','Wizard wand'].forEach(w=>{ h += '<option value="'+w+'"'+(p.picked===w?' selected':'')+'>'+w+'</option>'; });
    h += '</select>';
  }
  else if(p.kind==='twostats') {
    h += '<p class="ccw-hint" style="font-size:10px;">Pick two different stats (+1 each):</p>';
    for(let n=1;n<=2;n++){
      const cur = n===1 ? p.picked : p.picked2;
      h += '<select style="'+selStyle+'margin-bottom:4px;" onchange="'+stateRef+'.'+(n===1?'picked':'picked2')+'=this.value;ccwResolve('+stateRef+');ccwRerender()">';
      h += '<option value="">— +1 to... —</option>';
      CCW_ALL_STATS.forEach(st=>{ h += '<option value="'+st+'"'+(cur===st?' selected':'')+'>'+st+'</option>'; });
      h += '</select>';
    }
  }
  else if(p.kind==='statplustalent') {
    h += '<p class="ccw-hint" style="font-size:10px;">+1 to a stat:</p>';
    h += '<select style="'+selStyle+'margin-bottom:6px;" onchange="'+stateRef+'.picked=this.value;ccwResolve('+stateRef+');ccwRerender()">';
    h += '<option value="">— +1 to... —</option>';
    CCW_ALL_STATS.forEach(st=>{ h += '<option value="'+st+'"'+(p.picked===st?' selected':'')+'>'+st+'</option>'; });
    h += '</select>';
    const rows = (RC_CLASS_INFO[cls]?.talent||[]);
    const opts = [rows[1], rows[6], rows[9]].filter(Boolean);   // skip self (row 0) to avoid recursion
    h += '<p class="ccw-hint" style="font-size:10px;">Then roll/choose another talent:</p>';
    h += '<select style="'+selStyle+'" onchange="'+stateRef+'.sub=this.value?ccwAnalyzeTalent(this.value,\''+cls.replace(/'/g,"\\\\'")+'\'):null;ccwResolve('+stateRef+');ccwRerender()">';
    h += '<option value="">— choose —</option>';
    opts.forEach(opt=>{ h += '<option value="'+String(opt).replace(/"/g,'&quot;')+'"'+(p.sub&&p.sub.text===opt?' selected':'')+'>'+String(opt).replace(/</g,'&lt;')+'</option>'; });
    h += '</select>';
    if(p.sub) h += ccwTalentChoiceUI(p.sub, stateRef+'.sub', knownSpells, cls);
  }
  else if(p.kind==='wieldnew') {
    h += '<select style="'+selStyle+'" onchange="'+stateRef+'.picked=this.value;ccwResolve('+stateRef+');ccwRerender()">';
    h += '<option value="">— Choose a weapon or armor —</option><optgroup label="Weapon">';
    (typeof SD_WEAPONS!=='undefined'?SD_WEAPONS:[]).filter(w=>w.name!=='Strikes').forEach(w=>{ const v='weapon:'+w.name; h += '<option value="'+v+'"'+(p.picked===v?' selected':'')+'>'+w.name+' ('+w.damage+')</option>'; });
    h += '</optgroup><optgroup label="Armor">';
    CCW_ARMOR_TYPES.forEach(a=>{ const v='armor:'+a; h += '<option value="'+v+'"'+(p.picked===v?' selected':'')+'>'+a+'</option>'; });
    h += '</optgroup></select>';
  }
  else if(p.kind==='extrahd') {
    h += '<p class="ccw-hint" style="font-size:10px;">You’ll roll an extra Hit Die for this level’s HP.</p>';
  }
  else if(p.kind==='meta') {
    h += '<select style="'+selStyle+'" onchange="var v=this.value;'+stateRef+'.picked=v;'+stateRef+'.sub=null;ccwResolve('+stateRef+');ccwRerender()">';
    h += '<option value="">\u2014 choose \u2014</option>';
    h += '<option value="talent"'+(p.picked==='talent'?' selected':'')+'>Choose a talent</option>';
    if(p.hasStatAlt) h += '<option value="stats"'+(p.picked==='stats'?' selected':'')+'>+2 stat points</option>';
    h += '</select>';
    if(p.picked==='talent') {
      const rows = (RC_CLASS_INFO[cls]?.talent||[]);
      const opts = [rows[0], rows[1], rows[6], rows[9]].filter(Boolean);
      h += '<p class="ccw-hint" style="font-size:10px;margin-top:6px;">Pick any talent from the table:</p>';
      h += '<select style="'+selStyle+'" onchange="'+stateRef+'.sub=this.value?ccwAnalyzeTalent(this.value,\''+cls.replace(/'/g,"\\\\'")+'\'):null;ccwResolve('+stateRef+');ccwRerender()">';
      h += '<option value="">\u2014 choose \u2014</option>';
      opts.forEach(opt=>{ h += '<option value="'+String(opt).replace(/"/g,'&quot;')+'"'+(p.sub&&p.sub.text===opt?' selected':'')+'>'+String(opt).replace(/</g,'&lt;')+'</option>'; });
      h += '</select>';
      if(p.sub) h += ccwTalentChoiceUI(p.sub, stateRef+'.sub', knownSpells, cls);
    }
    if(p.picked==='stats') {
      h += '<p class="ccw-hint" style="font-size:10px;margin-top:6px;">Distribute 2 points:</p>';
      for(let n=1;n<=2;n++){
        const cur = n===1 ? p.pickedA : p.pickedB;
        h += '<select style="'+selStyle+'margin-bottom:4px;" onchange="'+stateRef+'.'+(n===1?'pickedA':'pickedB')+'=this.value;ccwResolve('+stateRef+');ccwRerender()">';
        h += '<option value="">— +1 to... —</option>';
        CCW_ALL_STATS.forEach(st=>{ h += '<option value="'+st+'"'+(cur===st?' selected':'')+'>'+st+'</option>'; });
        h += '</select>';
      }
    }
  }
  if(p.final) h += '<div class="ccw-result" style="margin-top:6px;border-left-color:#4caf7d;">✓ '+p.final+'</div>';
  h += '</div>';
  return h;
}

// Computes .final and .statBoost from picks
function ccwResolve(p) {
  if(!p) return;
  p.statBoost = {};
  p.final = null;
  switch(p.kind) {
    case 'none': p.final = p.text; break;
    case 'ortwo':
      if(p.picked) {
        // Rebuild the nested choice whenever the pick changes, then defer to it.
        // final stays null until the sub is answered, so Next still blocks and
        // the stat boost isn't silently dropped.
        if(!p.sub || p.sub.text !== p.picked) p.sub = ccwOptionChoice(p.picked, p.cls);
        if(p.sub) {
          ccwResolve(p.sub);
          if(p.sub.final) { p.final = p.sub.final; p.statBoost = Object.assign({}, p.sub.statBoost||{}); }
          break;
        }
        p.final = p.picked;
        const m = p.picked.match(/\+2 to (\w+) stat/);
        if(m) { const st = m[1].slice(0,3).toUpperCase(); p.statBoost[st] = 2; }
      } else { p.sub = null; }
      break;
    case 'statpick':
      if(p.picked) { p.final = '+2 to '+p.picked+' stat'; p.statBoost[p.picked.slice(0,3).toUpperCase()] = 2; }
      break;
    case 'distribute':
      if(p.picked && p.picked2) {
        p.final = '+1 '+p.picked+', +1 '+p.picked2;
        p.statBoost[p.picked] = (p.statBoost[p.picked]||0)+1;
        p.statBoost[p.picked2] = (p.statBoost[p.picked2]||0)+1;
      }
      break;
    case 'meleeranged':
      if(p.picked) p.final = p.text.replace(/melee or ranged/i, p.picked);
      break;
    case 'learnspell':
      p.final = p.text;   // spell itself is picked on the Learn Spells step
      break;
    case 'weapon': case 'spellknown': case 'armor': case 'remedy': case 'wand':
      if(p.picked) p.final = p.text + ' — ' + p.picked;
      break;
    case 'twostats':
      if(p.picked && p.picked2 && p.picked !== p.picked2) {
        p.final = '+1 '+p.picked+', +1 '+p.picked2;
        p.statBoost[p.picked] = (p.statBoost[p.picked]||0)+1;
        p.statBoost[p.picked2] = (p.statBoost[p.picked2]||0)+1;
      }
      break;
    case 'statplustalent':
      if(p.picked && p.sub) {
        ccwResolve(p.sub);
        if(p.sub.final) {
          p.statBoost[p.picked] = (p.statBoost[p.picked]||0)+1;
          Object.entries(p.sub.statBoost||{}).forEach(([k,v])=>{ p.statBoost[k]=(p.statBoost[k]||0)+v; });
          p.final = '+1 '+p.picked+' and '+p.sub.final;
        }
      }
      break;
    case 'wieldnew':
      if(p.picked) { const i=p.picked.indexOf(':'); p.final = 'Gain the ability to wield '+(i>0?p.picked.slice(i+1):p.picked); }
      break;
    case 'extrahd':
      p.final = p.text;
      break;
    case 'meta':
      if(p.picked==='talent' && p.sub) {
        ccwResolve(p.sub);
        if(p.sub.final) { p.final = p.sub.final; p.statBoost = p.sub.statBoost; }
      } else if(p.picked==='stats' && p.pickedA && p.pickedB) {
        p.final = '+1 '+p.pickedA+', +1 '+p.pickedB;
        p.statBoost[p.pickedA] = (p.statBoost[p.pickedA]||0)+1;
        p.statBoost[p.pickedB] = (p.statBoost[p.pickedB]||0)+1;
      }
      break;
  }
}

function ccwRerender() { if(_ccw) ccwRender(); else if(_lvl) lvlRender(); }

// ── Gear data ──────────────────────────────────────────────────────────────
const CCW_WEAPON_COSTS = {
  'Bastard Sword':{gp:10}, 'Club':{cp:5}, 'Crossbow':{gp:8}, 'Dagger':{gp:1},
  'Greataxe':{gp:10}, 'Greatsword':{gp:12}, 'Javelin':{sp:5}, 'Longbow':{gp:8},
  'Longsword':{gp:9}, 'Mace':{gp:5}, 'Shortbow':{gp:6}, 'Shortsword':{gp:7},
  'Spear':{sp:5}, 'Staff':{sp:5}, 'Warhammer':{gp:10},
  // Cursed Scroll Compilation
  'Blowgun':{gp:5}, 'Bolas':{gp:2}, 'Morningstar':{gp:5}, 'Pike':{gp:10},
  'Razor Chain':{gp:12}, 'Scimitar':{gp:8}, 'Shuriken':{gp:1}, 'Sling':{sp:5}, 'Whip':{gp:10},
};
const CCW_ARMOR_SHOP = [
  {name:'Leather armor', gp:10, ac:'11 + DEX'},
  {name:'Chainmail',     gp:60, ac:'13 + DEX'},
  {name:'Plate mail',    gp:130,ac:'15'},
  {name:'Shield',        gp:10, ac:'+2'},
];
const CCW_KIT_ITEMS = [
  {name:'Backpack', qty:'1'}, {name:'Flint & Steel', qty:'1'}, {name:'Torch', qty:'2'},
  {name:'Rations', qty:'3'}, {name:'Iron Spikes', qty:'10'}, {name:'Grappling Hook', qty:'1'},
  {name:'Rope (60 ft)', qty:'1'},
];
function ccwCostGp(c) { return (c.gp||0) + (c.sp||0)/10 + (c.cp||0)/100; }
function ccwFmtCost(c) { return c.gp ? c.gp+' gp' : c.sp ? c.sp+' sp' : c.cp+' cp'; }

// Which weapons a class may use. Understands category grants ("all weapons",
// "all melee weapons", "all ranged weapons", "all swords") as well as weapons
// listed by name — so e.g. the Knight of St. Ydris ("All melee weapons,
// crossbow") and the Duelist ("Dagger, all swords") get their full arsenals
// instead of only the one weapon whose name literally appeared in the string.
function ccwClassWeapons(cls) {
  const w = (RC_CLASS_INFO[cls]?.weapons||'').toLowerCase();
  const all = SD_WEAPONS.filter(x=>x.name!=='Strikes');   // Strikes (unarmed) isn't gear you buy
  const names = all.map(x=>x.name);
  if(w.includes('all weapons')) return names;
  const isMelee  = x => String(x.type||'').includes('M');
  const isRanged = x => String(x.type||'').includes('R');
  // Every bladed sword in the list, including the curved Scimitar.
  const isSword  = x => /sword/i.test(x.name) || x.name === 'Scimitar';
  const allowed = new Set();
  if(w.includes('all melee weapons'))  all.filter(isMelee).forEach(x=>allowed.add(x.name));
  if(w.includes('all ranged weapons')) all.filter(isRanged).forEach(x=>allowed.add(x.name));
  if(w.includes('all swords'))         all.filter(isSword).forEach(x=>allowed.add(x.name));
  names.forEach(n=>{ if(w.includes(n.toLowerCase())) allowed.add(n); });   // individually named
  (_charExtraWeapons||[]).forEach(n=>{ if(names.includes(n)) allowed.add(n); });   // Roustabout "wield new weapon"
  return names.filter(n=>allowed.has(n));                                  // keep SD_WEAPONS order
}
// Which armor a class may wear
function ccwClassArmor(cls) {
  const a = (RC_CLASS_INFO[cls]?.armor||'').toLowerCase();
  const order = ['Leather armor','Chainmail','Plate mail','Shield'];
  let out;
  if(a.includes('all armor')) {
    out = a.includes('shield') ? ['Leather armor','Chainmail','Plate mail','Shield'] : ['Leather armor','Chainmail','Plate mail'];
  } else {
    out = [];
    if(a.includes('leather')) out.push('Leather armor');
    if(a.includes('chainmail')) out.push('Chainmail');
    if(a.includes('plate')) out.push('Plate mail');
    if(a.includes('shield')) out.push('Shield');
  }
  (_charExtraArmor||[]).forEach(n=>{ if(!out.includes(n)) out.push(n); });   // Roustabout "wield new armor"
  return order.filter(n=>out.includes(n));
}

// ── Step: Gear & Weapons ──
function ccwGearSpent() {
  let spent = 0;
  if(_ccw.buyKit) spent += 7;
  _ccw.buyWeapons.forEach(n=>{ spent += ccwCostGp(CCW_WEAPON_COSTS[n]||{}); });
  _ccw.buyArmor.forEach(n=>{ const a=CCW_ARMOR_SHOP.find(x=>x.name===n); if(a) spent += a.gp; });
  return spent;
}
// The Choices step: resolve every "player choice" effect (stat / advantage /
// weapon damage die) into a concrete pick before finishing.
function ccwChoices(){
  const list=_hbExpandChoices(_ccw, _hbGatherChoices(_ccw));
  if(!_ccw.hbChoices)_ccw.hbChoices={};
  const weapons=[['Strikes','Strikes (unarmed)']].concat((_ccw.buyWeapons||[]).filter(w=>!/^strikes$/i.test(w)).map(w=>[w,w]));
  const spells=_hbKnownSpellsCreation(_ccw).filter(s=>s!=='Magic Missile').map(s=>[s,s]);
  const talents=_hbTalentRowOptions(_ccw.cls);
  let h='<p class="ccw-hint">A few of your abilities let you choose. Pick each one.</p>';
  if(!list.some(ch=>!ch.fromChoose)) return h+'<p class="ccw-hint">Nothing left to choose.</p>';
  list.forEach(ch=>{
    if(ch.fromChoose) return;
    h+='<div style="margin-bottom:12px;"><div style="font-family:Montserrat,sans-serif;font-size:11px;font-weight:700;color:#c8a020;margin-bottom:4px;">'+_hbChoiceLabel(ch)+'</div>';
    const cur=_ccw.hbChoices[ch.key]||'';
    if(ch.kind==='stat') h+=_hbChoiceSelect(ch.key,cur,_HB_STAT_OPTS,'ccwSetChoice');
    else if(ch.kind==='advSpell') h+= spells.length?_hbChoiceSelect(ch.key,cur,spells,'ccwSetChoice'):'<p class="ccw-hint" style="color:#df6a6a;">You know no spells to gain advantage on — this choice is skipped.</p>';
    else if(ch.kind==='weaponDie') h+=_hbChoiceSelect(ch.key,cur,weapons,'ccwSetChoice');
    else if(ch.kind==='talent') h+=_hbChoiceControl('talent',ch.key,cur,talents,'ccwSetChoice');
    else if(ch.kind==='oneOf') h+=_hbChoiceControl('oneOf',ch.key,cur,_hbTraitDistinctOpts(ch.effects).map(o=>[String(o.oi),_hbEffOne(o.eff)]),'ccwSetChoice');
    h+='</div>';
  });
  return h;
}
function ccwSetChoice(key,val){ if(!_ccw.hbChoices)_ccw.hbChoices={}; _ccw.hbChoices[key]=val; Object.keys(_ccw.hbChoices).forEach(k=>{ if(k.indexOf(key+'>')===0) delete _ccw.hbChoices[k]; }); ccwRender(); }
function _ccwClearChoiceKeys(prefix){ if(_ccw && _ccw.hbChoices) Object.keys(_ccw.hbChoices).forEach(k=>{ if(k.indexOf(prefix)===0) delete _ccw.hbChoices[k]; }); }

const CCW_DICE_ICO = '<svg class="dcc-ico" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="display:inline-block;vertical-align:-0.14em"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.2h14a1.8 1.8 0 0 1 1.8 1.8v14a1.8 1.8 0 0 1-1.8 1.8H5A1.8 1.8 0 0 1 3.2 19V5A1.8 1.8 0 0 1 5 3.2Zm3 3.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM12 10.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm-4 4.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg>';
function ccwGear() {
  if(_ccw.gold===null) {
    return '<p class="ccw-hint">Roll 2d6 × 5 for your starting gold, or take the flat 35 gp, then buy your gear.</p>'
      + '<div style="display:flex;gap:6px;">'
      + '<button class="ccw-roll-btn" style="flex:1;margin:0;" onclick="ccwRollGold()">' + CCW_DICE_ICO + ' Roll 2d6 × 5 gp</button>'
      + '<button style="flex:0 0 auto;margin:0;padding:0 14px;background:#1a3a4a;border:1px solid #2d6a7a;color:#8ad4e0;cursor:pointer;font-family:Montserrat,sans-serif;font-weight:700;font-size:10px;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;" onclick="ccwTakeGold()" title="Take the average instead of rolling">Take 35 gp</button>'
      + '</div>';
  }
  const spent = ccwGearSpent();
  const left = Math.round((_ccw.gold - spent)*100)/100;
  let h = '<p class="ccw-hint">Starting gold: <b style="color:#c8a020;">'+_ccw.gold+' gp</b> · Spent: '+(Math.round(spent*100)/100)+' gp · <b style="color:'+(left<0?'#df6a6a':'#4caf7d')+';">Remaining: '+left+' gp</b></p>';
  if(left<0) h += '<p class="ccw-hint" style="color:#df6a6a;">You\'ve overspent — remove something.</p>';

  // Rolling gold used to be one-way: once _ccw.gold was set the roll / take-35
  // buttons vanished with the rest of the pre-roll block. Keep them here so a
  // roll can always be redone or swapped for the flat 35 gp. Spending is left
  // alone — the Remaining line turns red and Next blocks if a reroll goes low.
  h += '<div style="display:flex;gap:6px;margin:-4px 0 10px;">'
    + '<button class="ccw-roll-btn" style="flex:1;margin:0;padding:5px;font-size:10px;" onclick="ccwRollGold()" title="Roll your starting gold again">' + CCW_DICE_ICO + ' Reroll 2d6 × 5</button>'
    + '<button style="flex:0 0 auto;margin:0;padding:0 14px;background:'+(_ccw.gold===35?'#241f10':'#1a3a4a')+';border:1px solid '+(_ccw.gold===35?'#7a5a00':'#2d6a7a')+';color:'+(_ccw.gold===35?'#c8a020':'#8ad4e0')+';cursor:pointer;font-family:Montserrat,sans-serif;font-weight:700;font-size:10px;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;" onclick="ccwTakeGold()" title="Take the average instead of rolling">Take 35 gp</button>'
    + '</div>';

  // Crawling kit
  h += '<button class="ccw-choice'+(_ccw.buyKit?' selected':'')+'" style="width:100%;margin-bottom:8px;" onclick="_ccw.buyKit=!_ccw.buyKit;ccwRender()"><div class="ccw-choice-name" style="font-size:11px;">Crawling Kit — 7 gp '+(_ccw.buyKit?'✓':'')+'</div><div class="ccw-choice-desc">Backpack, flint & steel, 2 torches, 3 rations, 10 iron spikes, grappling hook, 60\' rope</div></button>';

  // Weapons
  h += '<p class="ccw-hint" style="color:#c8a020;font-weight:700;margin-top:6px;">Weapons</p>';
  h += '<div class="ccw-choice-grid">';
  ccwClassWeapons(_ccw.cls).forEach(n=>{
    const w = SD_WEAPONS.find(x=>x.name===n);
    const cost = CCW_WEAPON_COSTS[n]||{};
    const count = _ccw.buyWeapons.filter(x=>x===n).length;
    h += '<button class="ccw-choice'+(count?' selected':'')+'" onclick="ccwToggleWeapon(\''+n+'\')"><div class="ccw-choice-name" style="font-size:10px;">'+n+(count>1?' ×'+count:'')+' — '+ccwFmtCost(cost)+'</div><div class="ccw-choice-desc">'+w.damage+' · '+w.range+(w.props?' · '+w.props:'')+'</div></button>';
  });
  h += '</div>';

  // Armor
  const allowedArmor = ccwClassArmor(_ccw.cls);
  if(allowedArmor.length) {
    h += '<p class="ccw-hint" style="color:#c8a020;font-weight:700;margin-top:10px;">Armor</p>';
    h += '<div class="ccw-choice-grid">';
    allowedArmor.forEach(n=>{
      const a = CCW_ARMOR_SHOP.find(x=>x.name===n);
      const sel = _ccw.buyArmor.includes(n) ? ' selected' : '';
      h += '<button class="ccw-choice'+sel+'" onclick="ccwToggleArmor(\''+n+'\')"><div class="ccw-choice-name" style="font-size:10px;">'+n+' — '+a.gp+' gp</div><div class="ccw-choice-desc">AC '+a.ac+'</div></button>';
    });
    h += '</div>';
  } else {
    h += '<p class="ccw-hint" style="margin-top:8px;">'+_ccw.cls+'s wear no armor.</p>';
  }
  return h;
}
// Take the flat 35 gp (the average of 2d6 × 5) instead of rolling
function ccwTakeGold() {
  _ccw.gold = 35;
  ccwRender();
}

function ccwRollGold() {
  _ccw.gold = (Math.ceil(Math.random()*6)+Math.ceil(Math.random()*6)) * 5;
  ccwRender();
}
function ccwToggleWeapon(n) {
  const i = _ccw.buyWeapons.indexOf(n);
  if(i >= 0) _ccw.buyWeapons.splice(i,1);
  else _ccw.buyWeapons.push(n);
  ccwRender();
}
function ccwToggleArmor(n) {
  const i = _ccw.buyArmor.indexOf(n);
  if(i >= 0) _ccw.buyArmor.splice(i,1);
  else {
    // Only one body armor; shield stacks
    if(n !== 'Shield') _ccw.buyArmor = _ccw.buyArmor.filter(x=>x==='Shield');
    _ccw.buyArmor.push(n);
  }
  ccwRender();
}

let _ccw = null;

function startCharWizard() {
  const hasContent = (document.getElementById('f-name')?.value.trim()) ||
    (document.getElementById('str-val')?.value.trim());
  if(hasContent && !confirm('Start guided character creation? This will overwrite the current sheet when finished.')) return;
  _ccw = { step: 0, stats: null, rolled: null, statMode: 'order', assign: [0,1,2,3,4,5],
           ancestry: null, cls: null, background: null,
           alignment: null, deity: '', talent: null, talent2: null,
           talentRoll: null, talent2Roll: null, tres: null, tres2: null, hbTalentChoice: null, hbTalentChoice2: null, hbTalentSpells: [], hbChoices: {},
           langCommon: [], langRare: [], langPriest: '', elfFarsight: null, koboldKnack: null, hbChoice: {},
           inclOptional: true, inclHomebrew: true,
           spells: [], spellSrc: null, spellSrcOf: {}, gold: null, buyKit: true, buyWeapons: [], buyArmor: [],
           name: '', hp: null };
  document.getElementById('ccw-overlay').style.display = 'flex';
  ccwRender();
  // Pull the latest shared homebrew so freshly-authored classes/ancestries/
  // backgrounds show up; it re-renders the wizard when it lands.
  try { if(typeof syncSharedHomebrew === 'function') syncSharedHomebrew(); } catch(e) {}
}

function ccwClose() {
  document.getElementById('ccw-overlay').style.display = 'none';
  _ccw = null;
}

// ── Language choices for current ancestry+class ──
function ccwLangChoices() {
  const c = { common: 0, rare: 0, priest: false };
  if(_ccw.ancestry==='Human') c.common += 1;
  if(_ccw.cls==='Priest') c.priest = true;
  if(_ccw.cls==='Wizard') { c.common += 2; c.rare += 2; }
  if(_ccw.cls==='Bard')   { c.common += 4; c.rare += 1; }
  return c;
}

// Caster config for the current class — official or homebrew. Null = non-caster.
// Homebrew casters carry {stat, list, known} on RC_CLASS_INFO[cls]._caster.
function ccwCasterInfo() {
  const ci = RC_CLASS_INFO[_ccw.cls] || {};
  if(ci._caster) return ci._caster;
  if(_ccw.cls==='Wizard') return { stat:'int', list:'Wizard', known:3 };
  if(_ccw.cls==='Priest') return { stat:'wis', list:'Priest', known:2 };
  if(_ccw.cls==='Witch')  return { stat:'cha', list:'Witch',  known:3 };
  return null;
}
function ccwSpellsNeeded() { const i = ccwCasterInfo(); return (i ? i.known : 0) + _hbAncFeatLearnPicks(_ccw); }

// Caster vs martial for the class picker's two-column layout. Mirrors the
// caster logic above but works for any class name (including homebrew, which
// carries its caster config on RC_CLASS_INFO[c]._caster). A class counts as a
// caster if it has a spell list — the three core casters, or anything flagged
// with _caster — plus the Bard, who uses scrolls and wands via Magical Dabbler.
function _ccwIsCaster(c) {
  if(c==='Wizard' || c==='Priest' || c==='Witch' || c==='Bard') return true;
  return !!(RC_CLASS_INFO[c] && RC_CLASS_INFO[c]._caster);
}

function ccwStepList() {
  const steps = ['Method','Ability Scores','Ancestry','Class','Background','Alignment & Deity'];
  if(ccwSpellsNeeded() > 0) steps.push('Spells');
  steps.push('Talent');
  if(_hbTalentLearnCount(_ccw) > 0) steps.push('Learn Spells');
  const lc = _ccw.ancestry && _ccw.cls ? ccwLangChoices() : {common:0,rare:0,priest:false};
  if(lc.common || lc.rare || lc.priest) steps.push('Languages');
  steps.push('Gear & Weapons');
  if(_hbGatherChoices(_ccw).some(ch=>!ch.fromChoose)) steps.push('Choices');
  steps.push('Name & Finish');
  return steps;
}

function ccwRender() {
  const steps = ccwStepList();
  if(_ccw.step >= steps.length) _ccw.step = steps.length - 1;
  const name = steps[_ccw.step];
  document.getElementById('ccw-step').textContent = 'Step ' + (_ccw.step+1) + ' of ' + steps.length + ' — ' + name;
  const body = document.getElementById('ccw-body');
  if(name==='Method') body.innerHTML = ccwMethod();
  else if(name==='Ability Scores') body.innerHTML = ccwStats();
  else if(name==='Ancestry') body.innerHTML = ccwAncestry();
  else if(name==='Class') body.innerHTML = ccwClass();
  else if(name==='Background') body.innerHTML = ccwBackground();
  else if(name==='Alignment & Deity') body.innerHTML = ccwAlign();
  else if(name==='Talent') body.innerHTML = ccwTalent();
  else if(name==='Languages') body.innerHTML = ccwLangs();
  else if(name==='Spells') body.innerHTML = ccwSpells();
  else if(name==='Gear & Weapons') body.innerHTML = ccwGear();
  else if(name==='Choices') body.innerHTML = ccwChoices();
  else if(name==='Learn Spells') body.innerHTML = ccwLearnSpells();
  else body.innerHTML = ccwFinish();
  document.getElementById('ccw-back').style.visibility = _ccw.step > 0 ? 'visible' : 'hidden';
  const nb = document.getElementById('ccw-next');
  nb.textContent = name==='Name & Finish' ? '✦ Create Character' : 'Next →';
  nb.style.visibility = name==='Method' ? 'hidden' : 'visible';
}

// Whether optional / homebrew content is included (Step 1 toggles; default on).
function _ccwInclOptional(){ return _ccw.inclOptional !== false; }
function _ccwInclHomebrew(){ return _ccw.inclHomebrew !== false; }
function _ccwClassAllowed(n){ if(_hbInjected.classes.indexOf(n)>=0) return _ccwInclHomebrew(); if(RC_OPTIONAL_CLASSES.indexOf(n)>=0) return _ccwInclOptional(); return true; }
function _ccwAncestryAllowed(n){ if(_hbInjected.ancestries.indexOf(n)>=0) return _ccwInclHomebrew(); if(RC_OPTIONAL_ANCESTRIES.indexOf(n)>=0) return _ccwInclOptional(); return true; }
function _ccwBgAllowed(n){ if(_hbInjected.backgrounds.indexOf(n)>=0) return _ccwInclHomebrew(); if(RC_OPTIONAL_BACKGROUNDS.indexOf(n)>=0) return _ccwInclOptional(); return true; }
// Filtered random pools honoring the Step 1 toggles.
function _ccwRandomAncestry(){
  const pool = RC_ANCESTRY.table.filter(t=>_ccwAncestryAllowed(t.v))
    .concat(_ccwInclHomebrew() ? (_hbAncestryNames||[]).map(n=>({w:1,v:n})) : []);
  return pool.length ? _rc_weighted(pool) : 'Human';
}
function _ccwRandomClass(){
  const pool = CCW_CLASS_ORDER.filter(_ccwClassAllowed);
  return pool.length ? pool[Math.floor(Math.random()*pool.length)] : 'Fighter';
}
function _ccwRandomBackground(){
  const pool = RC_BACKGROUNDS.filter(_ccwBgAllowed);
  return pool.length ? pool[Math.floor(Math.random()*pool.length)] : RC_BACKGROUNDS[0];
}

function ccwMethod() {
  let h = '<p class="ccw-hint">How do you want to make your character?</p>';
  h += '<div style="display:flex;gap:16px;justify-content:center;margin:0 0 12px;padding:8px 10px;background:#0f0f0f;border:1px solid #2a2a2a;">';
  h += '<label style="display:flex;align-items:center;gap:6px;font-family:Montserrat,sans-serif;font-size:11px;font-weight:700;color:#ccc;cursor:pointer;"><input type="checkbox" '+(_ccwInclOptional()?'checked':'')+' onchange="_ccw.inclOptional=this.checked;ccwRender()"> Optional Content</label>';
  h += '<label style="display:flex;align-items:center;gap:6px;font-family:Montserrat,sans-serif;font-size:11px;font-weight:700;color:#ccc;cursor:pointer;"><input type="checkbox" '+(_ccwInclHomebrew()?'checked':'')+' onchange="_ccw.inclHomebrew=this.checked;ccwRender()"> Homebrew</label>';
  h += '</div>';
  h += '<button class="ccw-choice" style="width:100%;margin-bottom:8px;padding:14px;" onclick="ccwGoRandom()"><div class="ccw-choice-name"><svg class="dcc-ico" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="display:inline-block;vertical-align:-0.14em"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.2h14a1.8 1.8 0 0 1 1.8 1.8v14a1.8 1.8 0 0 1-1.8 1.8H5A1.8 1.8 0 0 1 3.2 19V5A1.8 1.8 0 0 1 5 3.2Zm3 3.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM12 10.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm-4 4.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg> Random Character</div><div class="ccw-choice-desc">Instantly generate a complete character — stats, class, gear, everything rolled for you.</div></button>';
  h += '<button class="ccw-choice" style="width:100%;padding:14px;" onclick="_ccw.step++;ccwRender()"><div class="ccw-choice-name"><svg class="dcc-ico" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="display:inline-block;vertical-align:-0.14em"><path d="M5.5 4.2h9a1.3 1.3 0 0 1 1.3 1.3v2.2a1.3 1.3 0 0 1-1.3 1.3h-9a1.3 1.3 0 0 1-1.3-1.3V5.5a1.3 1.3 0 0 1 1.3-1.3Z"/><path d="M8.7 9h2.6l-.5 10.4a.8.8 0 0 1-1.6 0Z"/></svg> Design Your Own</div><div class="ccw-choice-desc">Walk through each step and make every roll and choice yourself.</div></button>';
  return h;
}
function ccwGoRandom() {
  ccwRandomize();
}

// ── Randomly resolve a pending talent choice ──
function ccwRandResolve(p, cls, knownSpells) {
  if(!p || p.kind==='none') return;
  const rand = (arr) => arr[Math.floor(Math.random()*arr.length)];
  switch(p.kind) {
    case 'ortwo':
      p.picked = rand(p.options);
      p.sub = ccwOptionChoice(p.picked, cls);
      if(p.sub) ccwRandResolve(p.sub, cls, knownSpells);
      break;
    case 'statpick':   p.picked = rand(p.options); break;
    case 'distribute': p.picked = rand(CCW_ALL_STATS); p.picked2 = rand(CCW_ALL_STATS); break;
    case 'meleeranged':p.picked = rand(['melee','ranged']); break;
    case 'weapon':     p.picked = rand(SD_WEAPONS.map(w=>w.name)); break;
    case 'spellknown': {
      const eligible = (knownSpells||[]).filter(sp=>sp!=='Magic Missile');
      if(eligible.length) p.picked = rand(eligible);
      else { p.final = p.text; return; }
      break;
    }
    case 'learnspell': {
      const own = (ccwCasterInfo()||{}).list || '';
      const pool = (RC_T1_BY_SOURCE[own]||[]).filter(sp=>!(knownSpells||[]).includes(sp)&&!(_ccw.hbTalentSpells||[]).includes(sp));
      if(!_ccw.hbTalentSpells) _ccw.hbTalentSpells = [];
      if(pool.length) _ccw.hbTalentSpells.push(rand(pool));
      break;
    }
    case 'armor':      p.picked = rand(CCW_ARMOR_TYPES); break;
    case 'remedy':     p.picked = rand(CCW_REMEDIES); break;
    case 'wand':       p.picked = rand(['Priest wand','Wizard wand']); break;
    case 'twostats': { const a=rand(CCW_ALL_STATS); let b=rand(CCW_ALL_STATS); if(b===a) b=CCW_ALL_STATS[(CCW_ALL_STATS.indexOf(a)+1)%CCW_ALL_STATS.length]; p.picked=a; p.picked2=b; break; }
    case 'statplustalent': { p.picked=rand(CCW_ALL_STATS); const rows=(RC_CLASS_INFO[cls]?.talent||[]); const opts=[rows[1],rows[6],rows[9]].filter(Boolean); p.sub=ccwAnalyzeTalent(rand(opts),cls); ccwRandResolve(p.sub,cls,knownSpells); break; }
    case 'wieldnew':   p.picked='weapon:'+rand(SD_WEAPONS.filter(w=>w.name!=='Strikes').map(w=>w.name)); break;
    case 'extrahd':    break;
    case 'meta':
      if(p.hasStatAlt && Math.random()<0.5) {
        p.picked = 'stats'; p.pickedA = rand(CCW_ALL_STATS); p.pickedB = rand(CCW_ALL_STATS);
      } else {
        p.picked = 'talent';
        const rows = (RC_CLASS_INFO[cls]?.talent||[]);
        const opts = [rows[0], rows[1], rows[6], rows[9]].filter(Boolean);
        p.sub = ccwAnalyzeTalent(rand(opts), cls);
        ccwRandResolve(p.sub, cls, knownSpells);
      }
      break;
  }
  ccwResolve(p);
}

// ── Fully random character through the wizard pipeline ──
function ccwRandomize() {
  const rand = (arr) => arr[Math.floor(Math.random()*arr.length)];
  const roll2d6 = () => Math.ceil(Math.random()*6)+Math.ceil(Math.random()*6);

  // Stats (3d6 in order)
  _ccw.rolled = [0,0,0,0,0,0].map(()=>_rc_3d6());
  _ccw.statMode = 'order';
  _ccw.assign = [0,1,2,3,4,5];
  ccwSyncStats();

  // Ancestry / class / background / alignment / deity
  _ccw.ancestry  = _ccwRandomAncestry();
  _ccw.elfFarsight = _ccw.ancestry==='Elf' ? rand(['ranged','spell']) : null;
  _ccw.koboldKnack  = _ccw.ancestry==='Kobold' ? rand(['spell','luck']) : null;
  // Homebrew ancestry "choose one" traits: roll a distinct option, resolving a
  // stat/weapon player-choice inside it with a random pick as well.
  _ccw.hbChoice = {}; _ccw.hbChoices = {}; _ccw.hbTalentSpells = [];
  const _randAnc = RC_ANCESTRY._hb && RC_ANCESTRY._hb[_ccw.ancestry];
  if(_randAnc && Array.isArray(_randAnc.traits)) {
    _randAnc.traits.forEach((t,ti)=>{
      if(!_hbTraitIsChoice(t)) return;
      const dopts=_hbTraitDistinctOpts(_hbTraitEffects(t));
      if(!dopts.length) return;
      const pick = rand(dopts);
      _ccw.hbChoice[ti]=pick.oi;
      const nested=_hbChoiceFromEffect('at'+ti+'_'+pick.oi, pick.eff, _ccw.cls);
      if(nested && nested.kind==='stat') _ccw.hbChoices[nested.key]=rand(['str','dex','con','int','wis','cha']);
      else if(nested && nested.kind==='weaponDie') _ccw.hbChoices[nested.key]='Strikes';
    });
  }
  // Class follows the highest stat so builds make sense
  const CLASS_BY_STAT = {
    STR: ['Fighter','Ranger','Pit Fighter'],
    DEX: ['Ranger','Thief'],
    CON: ['Fighter','Pit Fighter'],
    INT: ['Wizard'],
    WIS: ['Priest'],
    CHA: ['Bard','Witch'],
  };
  const maxVal = Math.max(...CCW_ALL_STATS.map(k=>_ccw.stats[k]));
  const topStats = CCW_ALL_STATS.filter(k=>_ccw.stats[k]===maxVal);
  const _clsPool = (CLASS_BY_STAT[rand(topStats)]||[]).filter(_ccwClassAllowed);
  _ccw.cls = _clsPool.length ? rand(_clsPool) : _ccwRandomClass();
  _ccw.grit = _ccw.cls==='Fighter' ? rand(['Strength','Dexterity']) : null;
  _ccw.mastery = _ccw.cls==='Fighter' ? rand(SD_WEAPONS).name : null;
  _ccw.background= _ccwRandomBackground();
  _ccw.alignment = rand(['Lawful','Neutral','Chaotic']);
  const deities  = RC_DEITIES[_ccw.alignment] || [];
  _ccw.deity     = (_ccw.cls==='Priest' && deities.length) ? rand(deities)
                 : (deities.length && Math.random()<0.5 ? rand(deities) : '');

  // Spells first (so talent "spell you know" has options)
  _ccw.spells = [];
  let spellPool = _ccw.cls==='Priest' ? RC_PRIEST_SPELLS_T1 : _ccw.cls==='Wizard' ? RC_WIZARD_SPELLS_T1 : _ccw.cls==='Witch' ? RC_WITCH_SPELLS_T1 : null;
  if(_ccw.cls==='Wizard' && _ccw.alignment==='Neutral') spellPool = [...spellPool, ...RC_DRUID_SPELLS_T1];
  if(spellPool) {
    const needed = _ccw.cls==='Priest' ? 2 : 3;
    const pool = [...spellPool];
    while(_ccw.spells.length < needed && pool.length) {
      const i = Math.floor(Math.random()*pool.length);
      _ccw.spells.push(pool.splice(i,1)[0]);
    }
  }

  // Talent (+ Human bonus), randomly resolving choices
  const pickRow = (roll) => { const r = ccwTalentRows().find(x=>roll>=x.lo && roll<=x.hi); return r ? r.text : ''; };
  _ccw.talentRoll = roll2d6();
  _ccw.talent = pickRow(_ccw.talentRoll);
  _ccw.tres = ccwAnalyzeTalent(_ccw.talent, _ccw.cls);
  ccwRandResolve(_ccw.tres, _ccw.cls, _ccw.spells);
  if(_ccw.ancestry==='Human') {
    _ccw.talent2Pick = null;
    _ccw.talent2Roll = roll2d6();
    _ccw.talent2 = pickRow(_ccw.talent2Roll);
    _ccw.tres2 = ccwAnalyzeTalent(_ccw.talent2, _ccw.cls);
    ccwRandResolve(_ccw.tres2, _ccw.cls, _ccw.spells);
  } else { _ccw.talent2 = null; _ccw.tres2 = null; _ccw.talent2Roll = null; }

  // Languages
  _ccw.langCommon = []; _ccw.langRare = []; _ccw.langPriest = '';
  const lc = ccwLangChoices();
  { const pool = [...CCW_COMMON_LANGS];
    while(_ccw.langCommon.length < lc.common && pool.length) _ccw.langCommon.push(pool.splice(Math.floor(Math.random()*pool.length),1)[0]); }
  { const pool = [...CCW_RARE_LANGS];
    while(_ccw.langRare.length < lc.rare && pool.length) _ccw.langRare.push(pool.splice(Math.floor(Math.random()*pool.length),1)[0]); }
  if(lc.priest) _ccw.langPriest = rand(['Celestial','Diabolic','Primordial']);

  // Gear: roll 2d6 × 5 gp and shop within the budget like a designed character
  _ccw.gold = roll2d6() * 5;
  _ccw.buyWeapons = [];
  _ccw.buyArmor = [];
  let remaining = _ccw.gold;
  // Crawling kit first (7 gp) if affordable
  _ccw.buyKit = remaining >= 7;
  if(_ccw.buyKit) remaining -= 7;
  // One random affordable class weapon
  const affordableWeapons = ccwClassWeapons(_ccw.cls).filter(n => ccwCostGp(CCW_WEAPON_COSTS[n]||{}) <= remaining);
  if(affordableWeapons.length) {
    const wpick = rand(affordableWeapons);
    _ccw.buyWeapons.push(wpick);
    remaining -= ccwCostGp(CCW_WEAPON_COSTS[wpick]||{});
  }
  // Leather armor if allowed and affordable
  const allowedArmor = ccwClassArmor(_ccw.cls);
  if(allowedArmor.includes('Leather armor') && remaining >= 10) {
    _ccw.buyArmor.push('Leather armor');
    remaining -= 10;
  }
  // Shield 50% of the time if allowed and affordable
  if(allowedArmor.includes('Shield') && remaining >= 10 && Math.random() < 0.5) {
    _ccw.buyArmor.push('Shield');
    remaining -= 10;
  }

  // Name & HP
  _ccw.name = _rc_roll(RC_NAMES[_ccw.ancestry] || RC_NAMES.Human);
  const eff = ccwEffStats();
  const hdNum = parseInt(RC_CLASS_INFO[_ccw.cls].hd.split('d')[1]);
  let hp = Math.ceil(Math.random()*hdNum) + _rc_mod(eff.CON);
  if(_ccw.ancestry==='Dwarf') hp += 2;
  _ccw.hp = Math.max(1, hp);

  ccwApply();
}

function ccwBack() { if(_ccw.step > 0) { _ccw.step--; ccwRender(); } }

function ccwNext() {
  const steps = ccwStepList();
  const name = steps[_ccw.step];
  if(name==='Method') { alert('Choose Random or Design to continue.'); return; }
  if(name==='Ability Scores' && !_ccw.stats) { alert('Roll your ability scores first.'); return; }
  if(name==='Ancestry') {
    if(!_ccw.ancestry) { alert('Choose an ancestry.'); return; }
    if(_ccw.ancestry==='Elf' && !_ccw.elfFarsight) { alert('Choose your Farsight option.'); return; }
    if(_ccw.ancestry==='Kobold' && !_ccw.koboldKnack) { alert('Choose your Knack option.'); return; }
    const _hbA = RC_ANCESTRY._hb && RC_ANCESTRY._hb[_ccw.ancestry];
    if(_hbA && Array.isArray(_hbA.traits)) {
      _hbAutoPickAncChoices(_ccw);
      for(let ti=0; ti<_hbA.traits.length; ti++){
        if(_hbTraitIsChoice(_hbA.traits[ti]) && !(_ccw.hbChoice && _ccw.hbChoice[ti]!=null)) {
          alert('Choose an option for ' + (String(_hbA.traits[ti].text||'your ancestry trait').split(':')[0]) + '.'); return;
        }
      }
    }
  }
  if(name==='Class') {
    if(!_ccw.cls) { alert('Choose a class.'); return; }
    if(_ccw.cls==='Fighter' && !_ccw.mastery) { alert('Fighters must choose a weapon type for Weapon Mastery.'); return; }
    if(_ccw.cls==='Fighter' && !_ccw.grit) { alert('Fighters must choose Grit: Strength or Dexterity.'); return; }
    {
      const casterList=(ccwCasterInfo()||{}).list;
      const haveSpells = casterList ? ((RC_T1_BY_SOURCE[casterList]||[]).length>0) : true;
      for(const ch of _hbExpandChoices(_ccw, _hbGatherFeatureChoices(_ccw))){
        if(ch.kind==='advSpell' && !haveSpells) continue;
        if(!(_ccw.hbChoices && _ccw.hbChoices[ch.key])) { alert('Make a feature choice: ' + _hbChoiceLabel(ch)); return; }
      }
    }
  }
  if(name==='Background' && !_ccw.background) { alert('Choose a background.'); return; }
  if(name==='Alignment & Deity' && !_ccw.alignment) { alert('Choose an alignment.'); return; }
  if(name==='Talent') {
    if(!_ccw.talent) { alert('Roll or choose your talent first.'); return; }
    if(_ccw.ancestry==='Human' && !_ccw.talent2) { alert('Humans gain a bonus talent (Ambitious) — roll or choose it.'); return; }
    if(_ccw.tres) ccwResolve(_ccw.tres);
    if(_ccw.tres2) ccwResolve(_ccw.tres2);
    if(_ccw.tres && _ccw.tres.kind!=='none' && !_ccw.tres.final) { alert('Resolve your talent choice first.'); return; }
    if(_ccw.tres2 && _ccw.tres2.kind!=='none' && !_ccw.tres2.final) { alert('Resolve your bonus talent choice first.'); return; }
    if(_hbTalentChooseInfo(_ccw.cls, _ccw.talentRoll, _ccw.talentPick) && _ccw.hbTalentChoice==null) { alert('Choose one effect for your talent.'); return; }
    if(_ccw.ancestry==='Human' && _hbTalentChooseInfo(_ccw.cls, _ccw.talent2Roll, _ccw.talent2Pick) && _ccw.hbTalentChoice2==null) { alert('Choose one effect for your bonus talent.'); return; }
    {
      const need = _hbExpandChoices(_ccw, _hbGatherTalentChoices(_ccw.cls,_ccw.talentRoll,_ccw.talentPick,_ccw.hbTalentChoice,'tm'))
        .concat(_ccw.ancestry==='Human' ? _hbExpandChoices(_ccw, _hbGatherTalentChoices(_ccw.cls,_ccw.talent2Roll,_ccw.talent2Pick,_ccw.hbTalentChoice2,'tb')) : []);
      const haveSpells = _hbKnownSpellsCreation(_ccw).length > 0;
      for(const ch of need){
        if(ch.kind==='advSpell' && !haveSpells) continue;
        if(!(_ccw.hbChoices && _ccw.hbChoices[ch.key])) { alert('Make a choice: ' + _hbChoiceLabel(ch)); return; }
      }
    }
  }
  if(name==='Languages') {
    const lc = ccwLangChoices();
    if(_ccw.langCommon.length < lc.common) { alert('Choose '+lc.common+' common language'+(lc.common>1?'s':'')+'.'); return; }
    if(_ccw.langRare.length < lc.rare) { alert('Choose '+lc.rare+' rare language'+(lc.rare>1?'s':'')+'.'); return; }
    if(lc.priest && !_ccw.langPriest) { alert('Choose your priest language.'); return; }
  }
  if(name==='Spells') {
    const needed = ccwSpellsNeeded();
    if(_ccw.spells.length < needed) { alert('Choose ' + needed + ' spells.'); return; }
  }
  if(name==='Gear & Weapons') {
    if(_ccw.gold===null) { alert('Roll your starting gold first.'); return; }
    if(ccwGearSpent() > _ccw.gold) { alert('You have overspent your gold — remove something.'); return; }
  }
  if(name==='Learn Spells') {
    const n = _hbTalentLearnCount(_ccw);
    if((_ccw.hbTalentSpells||[]).length < n) { alert('Choose ' + n + ' spell' + (n>1?'s':'') + ' to learn.'); return; }
  }
  if(name==='Choices') {
    const list=_hbExpandChoices(_ccw, _hbGatherChoices(_ccw));
    const haveSpells = _hbKnownSpellsCreation(_ccw).length > 0;
    for(const ch of list){
      if(ch.kind==='advSpell' && !haveSpells) continue;   // nothing to advantage; skipped
      if(!(_ccw.hbChoices && _ccw.hbChoices[ch.key])) { alert('Make a choice: ' + _hbChoiceLabel(ch)); return; }
    }
  }
  if(name==='Name & Finish') { ccwApply(); return; }
  _ccw.step++;
  ccwRender();
}

// ── Step: Stats ──
function ccwStats() {
  let h = '<p class="ccw-hint">Roll 3d6 six times, or take the standard array. Assign in order (classic) or place each value where you want.</p>';
  h += '<div style="display:flex;gap:6px;margin-bottom:10px;">';
  h += '<button class="ccw-roll-btn" style="flex:1;margin:0;" onclick="ccwRollStats()"><svg class="dcc-ico" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="display:inline-block;vertical-align:-0.14em"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.2h14a1.8 1.8 0 0 1 1.8 1.8v14a1.8 1.8 0 0 1-1.8 1.8H5A1.8 1.8 0 0 1 3.2 19V5A1.8 1.8 0 0 1 5 3.2Zm3 3.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM12 10.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm-4 4.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg> Roll 3d6 × 6</button>';
  h += '<button class="ccw-roll-btn" style="flex:1;margin:0;background:#1a3a4a;border-color:#2d6a7a;color:#8ad4e0;" onclick="ccwStandardArray()"><svg class="dcc-ico" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="display:inline-block;vertical-align:-0.14em"><path d="M9 3.4h6a1 1 0 0 1 1 1v.6h1.6a1.4 1.4 0 0 1 1.4 1.4v13.2a1.4 1.4 0 0 1-1.4 1.4H6.4A1.4 1.4 0 0 1 5 20.6V6.4A1.4 1.4 0 0 1 6.4 5H8v-.6a1 1 0 0 1 1-1Zm.6 1.8v1.4h4.8V5.2Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8 10h8v1.6H8zM8 13.2h8v1.6H8zM8 16.4h5v1.6H8z" opacity=".5"/></svg> Standard Array</button>';
  h += '</div>';
  if(_ccw.rolled) {
    if(!_ccw.isArray) {
      h += '<div style="display:flex;gap:6px;margin-bottom:10px;">';
      h += '<button class="ccw-choice'+(_ccw.statMode==='order'?' selected':'')+'" style="flex:1;text-align:center;" onclick="ccwSetStatMode(\'order\')"><div class="ccw-choice-name" style="font-size:10px;">In Order (as rolled)</div></button>';
      h += '<button class="ccw-choice'+(_ccw.statMode==='assign'?' selected':'')+'" style="flex:1;text-align:center;" onclick="ccwSetStatMode(\'assign\')"><div class="ccw-choice-name" style="font-size:10px;">Assign Manually</div></button>';
      h += '</div>';
    }
    if(_ccw.statMode==='assign') {
      const poolLabel = _ccw.isArray ? 'Standard array' : 'Rolled pool';
      h += '<p class="ccw-hint" style="font-size:10px;">'+poolLabel+': <b style="color:#c8a020;">'+_ccw.rolled.join(' · ')+'</b>. Pick a value for each stat (selecting a used value swaps them).</p>';
      h += '<div class="ccw-stat-grid">';
      CCW_ALL_STATS.forEach((n,si)=>{
        const idx = _ccw.assign[si];
        const v = _ccw.rolled[idx];
        const m = _rc_mod(v);
        h += '<div class="ccw-stat"><div class="ccw-stat-name">'+n+'</div>';
        h += '<select onchange="ccwAssignStat('+si+',this.value)" style="width:100%;background:#0f0f0f;border:1px solid #2a2a2a;color:#eee;font-family:Montserrat,sans-serif;font-size:15px;font-weight:900;text-align:center;padding:3px 0;outline:none;">';
        _ccw.rolled.forEach((rv,ri)=>{ h += '<option value="'+ri+'"'+(ri===idx?' selected':'')+'>'+rv+'</option>'; });
        h += '</select>';
        h += '<div class="ccw-stat-mod">'+(m>=0?'+':'')+m+'</div></div>';
      });
      h += '</div>';
    } else {
      h += '<div class="ccw-stat-grid">';
      CCW_ALL_STATS.forEach((n,si)=>{
        const v = _ccw.rolled[si];
        const m = _rc_mod(v);
        h += '<div class="ccw-stat"><div class="ccw-stat-name">'+n+'</div><div class="ccw-stat-val">'+v+'</div><div class="ccw-stat-mod">'+(m>=0?'+':'')+m+'</div></div>';
      });
      h += '</div>';
    }
    if(!_ccw.isArray) {
      const has14 = _ccw.rolled.some(v=>v>=14);
      if(!has14) h += '<p class="ccw-hint" style="color:#df6a6a;margin-top:8px;">No score is 14+ — you may reroll!</p>';
    }
  }
  return h;
}
const CCW_STANDARD_ARRAY = [15,14,13,12,10,8];
function ccwRollStats() {
  _ccw.rolled = [0,0,0,0,0,0].map(()=>_rc_3d6());
  _ccw.isArray = false;
  _ccw.statMode = _ccw.statMode==='assign' ? 'assign' : 'order';
  _ccw.assign = [0,1,2,3,4,5];
  ccwSyncStats();
  ccwRender();
}
function ccwStandardArray() {
  _ccw.rolled = CCW_STANDARD_ARRAY.slice();
  _ccw.isArray = true;
  _ccw.statMode = 'assign';   // an array is only meaningful when you place it
  _ccw.assign = [0,1,2,3,4,5];
  ccwSyncStats();
  ccwRender();
}
function ccwSetStatMode(m) { _ccw.statMode = m; ccwSyncStats(); ccwRender(); }
function ccwAssignStat(statIdx, poolIdxStr) {
  const poolIdx = parseInt(poolIdxStr);
  const other = _ccw.assign.indexOf(poolIdx);
  const cur = _ccw.assign[statIdx];
  if(other >= 0 && other !== statIdx) _ccw.assign[other] = cur;
  _ccw.assign[statIdx] = poolIdx;
  ccwSyncStats();
  ccwRender();
}
function ccwSyncStats() {
  if(!_ccw.rolled) { _ccw.stats = null; return; }
  _ccw.stats = {};
  const order = _ccw.statMode==='assign' ? _ccw.assign : [0,1,2,3,4,5];
  CCW_ALL_STATS.forEach((n,i)=>{ _ccw.stats[n] = _ccw.rolled[order[i]]; });
}
// Effective stats = base + talent boosts
function ccwEffStats() {
  const out = {..._ccw.stats};
  [_ccw.tres, _ccw.tres2].forEach(p=>{
    if(p && p.statBoost) Object.entries(p.statBoost).forEach(([k,v])=>{ if(out[k]!==undefined) out[k]+=v; });
  });
  return out;
}

// ── Step: Ancestry ──
function ccwAncestry() {
  let h = '<p class="ccw-hint">Choose your ancestry, or roll randomly.</p>';
  h += '<button class="ccw-roll-btn" onclick="ccwRandAncestry()"><svg class="dcc-ico" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="display:inline-block;vertical-align:-0.14em"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.2h14a1.8 1.8 0 0 1 1.8 1.8v14a1.8 1.8 0 0 1-1.8 1.8H5A1.8 1.8 0 0 1 3.2 19V5A1.8 1.8 0 0 1 5 3.2Zm3 3.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM12 10.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm-4 4.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg> Random</button>';
  h += '<div class="ccw-choice-grid">';
  ['Human','Elf','Dwarf','Halfling','Half-Orc','Goblin','Kobold'].concat(_hbAncestryNames).filter(_ccwAncestryAllowed).forEach(a=>{
    const sel = _ccw.ancestry===a ? ' selected' : '';
    h += '<button class="ccw-choice'+sel+'" onclick="ccwPickAncestry(\''+a+'\')"><div class="ccw-choice-name">'+a+'</div><div class="ccw-choice-desc">'+RC_ANCESTRY.ability[a]+'</div></button>';
  });
  h += '</div>';
  const ancChoice = (title, field, opts)=>{
    let x = '<div style="background:#0f0f0f;border:1px solid #7a5a00;padding:10px 12px;margin-top:10px;">';
    x += '<div style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.12em;color:#c8a020;margin-bottom:6px;"><svg class="dcc-ico" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="display:inline-block;vertical-align:-0.14em"><path d="M6 3a1 1 0 0 1 1 1v16a1 1 0 0 1-2 0V4a1 1 0 0 1 1-1Z"/><path d="M8 4.4h10.6a.8.8 0 0 1 .6 1.3L16.8 9l2.4 3.3a.8.8 0 0 1-.6 1.3H8Z"/></svg> '+title+' — choose one</div>';
    let o = '<option value="">— choose —</option>';
    opts.forEach(([v,label])=>{ o += '<option value="'+v+'"'+(_ccw[field]===v?' selected':'')+'>'+String(label).replace(/</g,'&lt;')+'</option>'; });
    x += '<select onchange="_ccw.'+field+'=this.value||null;ccwRender()" style="width:100%;padding:8px 10px;background:#141414;border:1px solid #2a2a2a;color:#eee;font-family:Montserrat,sans-serif;font-size:12px;outline:none;">'+o+'</select>';
    return x + '</div>';
  };
  if(_ccw.ancestry==='Elf')
    h += ancChoice('Farsight','elfFarsight',[['ranged','+1 to ranged attack rolls'],['spell','+1 to spellcasting checks']]);
  if(_ccw.ancestry==='Kobold')
    h += ancChoice('Knack','koboldKnack',[['spell','+1 to spellcasting checks'],['luck','Luck token each session']]);
  // Homebrew ancestries: render a picker for each "choose one" trait.
  const _hbAnc = RC_ANCESTRY._hb && RC_ANCESTRY._hb[_ccw.ancestry];
  if(_hbAnc && Array.isArray(_hbAnc.traits)) {
    _hbAutoPickAncChoices(_ccw);
    _hbAnc.traits.forEach((t, ti) => {
      if(!_hbTraitIsChoice(t)) return;
      const effs = _hbTraitEffects(t);
      const dopts = _hbTraitDistinctOpts(effs);
      const title = String((t && t.text) || 'Choose').split(':')[0];
      let x = '<div style="background:#0f0f0f;border:1px solid #7a5a00;padding:10px 12px;margin-top:10px;">';
      if(dopts.length > 1) {
        x += '<div style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.12em;color:#c8a020;margin-bottom:6px;">\u2691 '+title+' \u2014 choose one</div>';
        x += _hbChoiceSelect('_anc'+ti, (_ccw.hbChoice&&_ccw.hbChoice[ti]!=null)?String(_ccw.hbChoice[ti]):'', dopts.map(o=>[String(o.oi), _hbEffOne(o.eff)||'Effect']), '_ccwPickHbChoiceSel');
      } else {
        // Only one distinct option \u2014 nothing to pick between, so show it
        // resolved (any player-choice inside it still gets its control below).
        x += '<div style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.12em;color:#c8a020;margin-bottom:6px;">\u2691 '+title+'</div>';
        if(dopts.length===1) x += '<div style="font-family:Montserrat,sans-serif;font-size:11px;color:#ccc;">'+(_hbEffOne(dopts[0].eff)||'Effect')+'</div>';
      }
      // If the chosen option is itself a player-choice, resolve it inline here so
      // the whole trait is decided in one place (not split to the Choices step).
      const _oi = _ccw.hbChoice && _ccw.hbChoice[ti];
      if(_oi!=null && effs[_oi]){
        const nested=_hbChoiceFromEffect('at'+ti+'_'+_oi, effs[_oi], _ccw.cls);
        if(nested){
          const cur=(_ccw.hbChoices||{})[nested.key]||'';
          const weapons=[['Strikes','Strikes (unarmed)']].concat((_ccw.buyWeapons||[]).filter(w=>!/^strikes$/i.test(w)).map(w=>[w,w]));
          const spells=_hbKnownSpellsCreation(_ccw).filter(s=>s!=='Magic Missile').map(s=>[s,s]);
          let ctl='';
          if(nested.kind==='stat') ctl=_hbChoiceSelect(nested.key,cur,_HB_STAT_OPTS,'ccwSetChoice');
          else if(nested.kind==='advSpell') ctl= spells.length?_hbChoiceSelect(nested.key,cur,spells,'ccwSetChoice'):'<p class="ccw-hint" style="font-size:9px;color:#df6a6a;margin:6px 0 0;">You know no spells to gain advantage on \u2014 skipped.</p>';
          else if(nested.kind==='weaponDie') ctl=_hbChoiceSelect(nested.key,cur,weapons,'ccwSetChoice');
          else if(nested.kind==='talent') ctl=_hbChoiceControl('talent',nested.key,cur,_hbTalentRowOptions(_ccw.cls),'ccwSetChoice');
          if(ctl) x += '<div style="margin-top:8px;"><div style="font-family:Montserrat,sans-serif;font-size:9px;color:#9a9a8a;margin-bottom:4px;">'+_hbChoiceLabel(nested)+'</div>'+ctl+'</div>';
        }
      }
      h += x + '</div>';
    });
  }
  return h;
}
function ccwPickHbChoice(ti, oi) { if(!_ccw.hbChoice) _ccw.hbChoice={}; _ccw.hbChoice[ti]=oi; ccwRender(); }
function _ccwPickHbChoiceSel(key, val){ const ti=parseInt(key.slice(4)); if(val===''){ if(_ccw.hbChoice) delete _ccw.hbChoice[ti]; ccwRender(); } else ccwPickHbChoice(ti, parseInt(val)); }
function ccwClearAncestryChoices() { _ccw.langCommon=[]; _ccw.langRare=[]; _ccw.elfFarsight=null; _ccw.koboldKnack=null; _ccw.hbChoice={}; }
function ccwPickAncestry(a) { _ccw.ancestry = a; ccwClearAncestryChoices(); ccwRender(); }
function ccwRandAncestry() { _ccw.ancestry = _ccwRandomAncestry(); ccwClearAncestryChoices(); ccwRender(); }

// ── Step: Class ──
function ccwSetClass(c){
  _ccw.cls = c;
  _ccw.spells = []; _ccw.langCommon = []; _ccw.langRare = []; _ccw.langPriest = '';
  _ccw.spellSrc = null; _ccw.spellSrcOf = {};
  _ccw.tres = null; _ccw.tres2 = null; _ccw.talent = null; _ccw.grit = null; _ccw.mastery = null; _ccw.trusty = null;
  _ccw.talentRoll = null; _ccw.talent2Roll = null; _ccw.talentPick = null;
  _ccw.hbTalentChoice = null; _ccw.hbTalentChoice2 = null; _ccw.hbTalentSpells = [];
  _ccwClearChoiceKeys('cf'); _ccwClearChoiceKeys('tm'); _ccwClearChoiceKeys('tb');
  ccwRender();
}
function ccwClass() {
  let h = '<p class="ccw-hint">Choose your class, or roll randomly.</p>';
  h += '<button class="ccw-roll-btn" onclick="ccwSetClass(_ccwRandomClass())"><svg class="dcc-ico" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="display:inline-block;vertical-align:-0.14em"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.2h14a1.8 1.8 0 0 1 1.8 1.8v14a1.8 1.8 0 0 1-1.8 1.8H5A1.8 1.8 0 0 1 3.2 19V5A1.8 1.8 0 0 1 5 3.2Zm3 3.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM12 10.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm-4 4.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg> Random</button>';
  const _allowed = CCW_CLASS_ORDER.filter(_ccwClassAllowed);
  const _martial = _allowed.filter(c=>!_ccwIsCaster(c));
  const _casters = _allowed.filter(_ccwIsCaster);
  const _classBtn = c => {
    const sel = _ccw.cls===c ? ' selected' : '';
    return '<button class="ccw-choice'+sel+'" onclick="ccwSetClass(\''+c+'\')"><div class="ccw-choice-name">'+c+'</div></button>';
  };
  const _classCol = (title, list) =>
    '<div class="ccw-class-group"><div class="ccw-class-grouphdr">'+title+'</div>'
    + '<div class="ccw-choice-grid ccw-class-grid">' + list.map(_classBtn).join('') + '</div></div>';
  h += '<div class="ccw-class-cols">';
  h += _classCol('Martial', _martial);
  h += _classCol('Casters', _casters);
  h += '</div>';
  let classChoicesH = "";
  // Fighter: Weapon Mastery — choose a weapon type
  if(_ccw.cls === 'Fighter') {
    classChoicesH += '<div style="background:#0f0f0f;border:1px solid #7a5a00;padding:8px 10px;margin-top:10px;">';
    classChoicesH += '<div style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;color:#c8a020;margin-bottom:4px;">Weapon Mastery — choose one</div>';
    classChoicesH += '<p class="ccw-hint" style="margin:0 0 6px;font-size:10px;">+1 to attack and damage with that weapon type, plus half your level (round down) to those rolls.</p>';
    classChoicesH += '<select onchange="_ccw.mastery=this.value;ccwRender()" style="width:100%;padding:7px 8px;background:#141414;border:1px solid #2a2a2a;color:#eee;font-family:Montserrat,sans-serif;font-size:11px;font-weight:700;outline:none;cursor:pointer;">';
    classChoicesH += '<option value="">— Choose a weapon type —</option>';
    SD_WEAPONS.forEach(w=>{
      const sel = _ccw.mastery === w.name ? ' selected' : '';
      classChoicesH += '<option value="'+w.name+'"'+sel+'>'+w.name+' ('+w.damage+')</option>';
    });
    classChoicesH += '</select></div>';
  }
  // Fighter: Grit — choose Strength or Dexterity
  if(_ccw.cls === 'Fighter') {
    classChoicesH += '<div style="background:#0f0f0f;border:1px solid #7a5a00;padding:8px 10px;margin-top:10px;">';
    classChoicesH += '<div style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;color:#c8a020;margin-bottom:4px;">Grit — choose one</div>';
    classChoicesH += '<p class="ccw-hint" style="margin:0 0 6px;font-size:10px;">Advantage on checks of that type to overcome an opposing force — kicking open a stuck door (Strength) or slipping free of rusty chains (Dexterity).</p>';
    classChoicesH += '<select onchange="_ccw.grit=this.value;ccwRender()" style="width:100%;padding:7px 8px;background:#141414;border:1px solid #2a2a2a;color:#eee;font-family:Montserrat,sans-serif;font-size:11px;font-weight:700;outline:none;cursor:pointer;"><option value="">— Choose one —</option>';
    ['Strength','Dexterity'].forEach(g=>{
      const sel = _ccw.grit===g ? ' selected' : '';
      classChoicesH += '<option value="'+g+'"'+sel+'>'+g+'</option>';
    });
    classChoicesH += '</select></div>';
  }
  // Delver: Trusty Gear — choose one weapon (gains a scaling attack bonus) OR a
  // gear type (noted in Talents). Value is "weapon:<name>" or "gear:<name>".
  if(_ccw.cls === 'Delver') {
    const trustyGear = ['Backpack','Rope (60 ft)','Torch','Lantern','Grappling Hook','Iron Spikes','Crowbar','Caltrops','Flint & Steel','Rations','Mirror','Pole (10 ft)'];
    const curKind = _ccw.trusty ? _ccw.trusty.kind : '';
    const curVal  = _ccw.trusty ? _ccw.trusty.value : '';
    classChoicesH += '<div style="background:#0f0f0f;border:1px solid #7a5a00;padding:8px 10px;margin-top:10px;">';
    classChoicesH += '<div style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;color:#c8a020;margin-bottom:4px;">Trusty Gear — choose one</div>';
    classChoicesH += '<p class="ccw-hint" style="margin:0 0 6px;font-size:10px;">A weapon gains +2 to attack rolls at level 1 (+1 per even level); gear gets the same bonus on related checks.</p>';
    classChoicesH += '<select onchange="ccwSetTrusty(this.value)" style="width:100%;padding:7px 8px;background:#141414;border:1px solid #2a2a2a;color:#eee;font-family:Montserrat,sans-serif;font-size:11px;font-weight:700;outline:none;cursor:pointer;"><option value="">— Choose one —</option>';
    classChoicesH += '<optgroup label="Weapon">';
    ccwClassWeapons('Delver').forEach(n=>{ const v='weapon:'+n; const sel=(curKind==='weapon'&&curVal===n)?' selected':''; classChoicesH += '<option value="'+v+'"'+sel+'>'+n+'</option>'; });
    classChoicesH += '</optgroup><optgroup label="Gear">';
    trustyGear.forEach(n=>{ const v='gear:'+n; const sel=(curKind==='gear'&&curVal===n)?' selected':''; classChoicesH += '<option value="'+v+'"'+sel+'>'+n+'</option>'; });
    classChoicesH += '</optgroup></select></div>';
  }
  // Details panel always visible, following the selected class
  const infoCls = _ccw.cls || null;
  h += '<div style="background:#0f0f0f;border:1px solid #7a5a00;padding:10px 12px;margin-top:10px;min-height:120px;">';
  if(infoCls && RC_CLASS_INFO[infoCls]) {
    const ci = RC_CLASS_INFO[infoCls];
    h += '<div style="font-family:Montserrat,sans-serif;font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:.12em;color:#c8a020;margin-bottom:6px;">'+infoCls+'</div>';
    h += '<div style="font-family:Montserrat,sans-serif;font-size:10px;color:#ccc;line-height:1.5;">';
    h += '<div><b style="color:#eee;">Hit Die:</b> '+ci.hd+' per level</div>';
    h += '<div><b style="color:#eee;">Weapons:</b> '+ci.weapons+'</div>';
    h += '<div><b style="color:#eee;">Armor:</b> '+ci.armor+'</div>';
    h += '<div style="margin-top:5px;"><b style="color:#eee;">Features:</b></div>';
    (ci.features||[]).forEach(f=>{
      const sub = /^[ \t]{2,}/.test(f);
      h += '<div style="padding-left:' + (sub ? '26px' : '8px') + ';'
         + (sub ? 'color:#b9b9b9;font-size:10px;' : '') + '">'
         + (sub ? '– ' : '• ') + f.trim() + '</div>';
    });
    h += '</div>';
  } else {
    h += '<div style="font-family:Montserrat,sans-serif;font-size:10px;color:#666;font-style:italic;">Select a class to see its full details.</div>';
  }
  h += '</div>';
  h += classChoicesH;
  if(_ccw.cls) h += _hbFeatureChoicesHtml();
  return h;
}

// ── Step: Background ──
function ccwBackground() {
  let h = '<p class="ccw-hint">Choose a background, or roll d20.</p>';
  h += '<button class="ccw-roll-btn" onclick="ccwRollBackground()"><svg class="dcc-ico" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="display:inline-block;vertical-align:-0.14em"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.2h14a1.8 1.8 0 0 1 1.8 1.8v14a1.8 1.8 0 0 1-1.8 1.8H5A1.8 1.8 0 0 1 3.2 19V5A1.8 1.8 0 0 1 5 3.2Zm3 3.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM12 10.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm-4 4.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg> Roll d20</button>';
  h += '<div class="ccw-choice-grid">';
  RC_BACKGROUNDS.filter(_ccwBgAllowed).forEach(b=>{
    const sel = _ccw.background===b ? ' selected' : '';
    const id = _ccw.background===b ? ' id="ccw-bg-selected"' : '';
    const desc = CCW_BG_DESC[b] || '';
    h += '<button class="ccw-choice'+sel+'"'+id+' onclick="_ccw.background=\''+b.replace(/'/g,"\\'")+'\';ccwRender()"><div class="ccw-choice-name" style="font-size:11px;">'+b+'</div><div class="ccw-choice-desc">'+desc+'</div></button>';
  });
  h += '</div>';
  return h;
}

// Roll a random background, then bring the rolled card into view — with this
// many backgrounds the winner is often well below the fold.
function ccwRollBackground() {
  _ccw.background = _ccwRandomBackground();
  ccwRender();
  const el = document.getElementById('ccw-bg-selected');
  if(el && el.scrollIntoView) el.scrollIntoView({ behavior:'smooth', block:'center' });
}

// Alignment drives which bonus spell list a wizard gets (Druid = neutral,
// Alignment only drives the deity list; it does not gate any spell list.
function ccwSetAlignment(a) {
  // Alignment sets the deity list only — spell lists are independent of it.
  _ccw.alignment = a;
  _ccw.deity = '';
  ccwRender();
}

// ── Step: Alignment & Deity ──
function ccwAlign() {
  let h = '<p class="ccw-hint">Choose your alignment. Priests must serve a deity matching their alignment.</p>';
  h += '<div class="ccw-choice-grid" style="grid-template-columns:repeat(3,1fr);">';
  ['Lawful','Neutral','Chaotic'].forEach(a=>{
    const sel = _ccw.alignment===a ? ' selected' : '';
    h += '<button class="ccw-choice'+sel+'" onclick="ccwSetAlignment(\''+a+'\')"><div class="ccw-choice-name">'+a+'</div></button>';
  });
  h += '</div>';
  if(_ccw.alignment) {
    const deities = RC_DEITIES[_ccw.alignment] || [];
    h += '<p class="ccw-hint" style="margin-top:10px;">Deity '+(_ccw.cls==='Priest'?'(required for Priests)':'(optional)')+':</p>';
    h += '<div class="ccw-choice-grid" style="grid-template-columns:repeat(2,1fr);">';
    h += '<button class="ccw-choice'+(_ccw.deity===''?' selected':'')+'" onclick="_ccw.deity=\'\';ccwRender()"><div class="ccw-choice-name" style="font-size:10px;">None</div></button>';
    deities.forEach(d=>{
      const sel = _ccw.deity===d ? ' selected' : '';
      h += '<button class="ccw-choice'+sel+'" onclick="_ccw.deity=\''+d.replace(/'/g,"\\'")+'\';ccwRender()"><div class="ccw-choice-name" style="font-size:10px;">'+d+'</div></button>';
    });
    h += '</div>';
  }
  return h;
}

// ── Step: Talent ──
// Talent tables: most classes roll 2 / 3-6 / 7-9 / 10-11 / 12, but some (the
// Witch) use different bands. A class can override via RC_CLASS_INFO.talentBands.
// Row text always comes from these fixed slots in the 12-entry talent array.
const CCW_DEFAULT_BANDS = [[2,2],[3,6],[7,9],[10,11],[12,12]];
const CCW_TALENT_TEXT_IDX = [0, 1, 6, 9, 11];
function ccwBuildTalentRows(cls) {
  const info = RC_CLASS_INFO[cls] || {};
  const t = info.talent || [];
  const bands = info.talentBands || CCW_DEFAULT_BANDS;
  return bands.map((b, i) => {
    const lo = b[0], hi = b[1];
    return {
      range: (lo === hi) ? String(lo) : (lo + '\u2013' + hi),
      lo: lo,
      hi: hi,
      text: t[CCW_TALENT_TEXT_IDX[i]] || '',   // '' guard: never let .slice() throw
    };
  });
}

function ccwTalentRows() {
  return ccwBuildTalentRows(_ccw.cls);
}
// Renders a "choose one effect" picker for a homebrew choose talent (which=1
// main talent, 2 = Human bonus talent).
function _hbTalentPickerHtml(which){
  const roll = which===2 ? _ccw.talent2Roll : _ccw.talentRoll;
  const pick = which===2 ? _ccw.talent2Pick : _ccw.talentPick;
  const chosen = which===2 ? _ccw.hbTalentChoice2 : _ccw.hbTalentChoice;
  const info = _hbTalentChooseInfo(_ccw.cls, roll, pick);
  if(!info) return '';
  let x = '<div style="background:#0f0f0f;border:1px solid #7a5a00;padding:10px 12px;margin-top:10px;">';
  x += '<div style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.12em;color:#c8a020;margin-bottom:6px;">\u2691 Choose one effect</div>';
  x += _hbChoiceSelect('_tp'+which, chosen==null?'':String(chosen), info.effs.map((e,oi)=>[String(oi), _hbEffOne(e)||'Effect']), '_ccwPickTalentEffectSel'+which);
  return x+'</div>';
}
// Delver Trusty Gear picker → { kind, value } (value string is "weapon:<name>"
// or "gear:<name>").
function ccwSetTrusty(v){
  const i = String(v||'').indexOf(':');
  _ccw.trusty = (i > 0) ? { kind: v.slice(0,i), value: v.slice(i+1) } : null;
  ccwRender();
}
function _ccwPickTalentEffectSel1(key, val){ ccwPickTalentEffect(1, val===''?null:parseInt(val)); }
function _ccwPickTalentEffectSel2(key, val){ ccwPickTalentEffect(2, val===''?null:parseInt(val)); }
function ccwPickTalentEffect(which, oi){ if(which===2){ _ccw.hbTalentChoice2=oi; } else { _ccw.hbTalentChoice=oi; } _ccw.hbTalentSpells=[]; _ccwClearChoiceKeys(which===2?"tb":"tm"); ccwRender(); }

// Feature choices (choose-one + player-choice effects) shown at the Class step,
// under the class that grants them. Weapons use the full list and spells the
// caster's accessible list, since gear/spells aren't chosen yet at this step.
function _hbFeatureChoicesHtml(){
  const list=_hbExpandChoices(_ccw, _hbGatherFeatureChoices(_ccw));
  if(!list.length)return '';
  if(!_ccw.hbChoices)_ccw.hbChoices={};
  const casterList=(ccwCasterInfo()||{}).list;
  const spellNames = casterList ? (RC_T1_BY_SOURCE[casterList]||[]) : (typeof allSpells==='function'?allSpells().map(s=>s.name):[]);
  const spells = spellNames.filter((v,i,a)=>v&&v!=='Magic Missile'&&a.indexOf(v)===i).map(s=>[s,s]);
  const weapons=_hbAllWeaponOpts();
  const talents=_hbTalentRowOptions(_ccw.cls);
  let x='<div style="background:#0f0f0f;border:1px solid #7a5a00;padding:10px 12px;margin-top:10px;">';
  x+='<div style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;color:#c8a020;margin-bottom:4px;">Feature Choices</div>';
  list.forEach(ch=>{
    x+='<div style="font-family:Montserrat,sans-serif;font-size:10px;font-weight:700;color:#c8a020;margin:6px 0 4px;">'+_hbChoiceLabel(ch)+'</div>';
    const cur=_ccw.hbChoices[ch.key]||'';
    if(ch.kind==='stat') x+=_hbChoiceSelect(ch.key,cur,_HB_STAT_OPTS,'ccwSetChoice');
    else if(ch.kind==='advSpell') x+= spells.length?_hbChoiceSelect(ch.key,cur,spells,'ccwSetChoice'):'<p style="color:#df6a6a;font-size:11px;margin:0;">No spells available.</p>';
    else if(ch.kind==='weaponDie') x+=_hbChoiceSelect(ch.key,cur,weapons,'ccwSetChoice');
    else if(ch.kind==='talent') x+=_hbChoiceControl('talent',ch.key,cur,talents,'ccwSetChoice');
    else if(ch.kind==='oneOf') x+=_hbChoiceControl('oneOf',ch.key,cur,_hbTraitDistinctOpts(ch.effects).map(o=>[String(o.oi),_hbEffOne(o.eff)]),'ccwSetChoice');
  });
  return x+'</div>';
}

// Stat / advantage / weapon-die / choose-a-talent pickers for a creation talent
// slot (which=1 main, 2 bonus) — shown right under the talent that grants them.
function _hbTalentChoicesHtml(which){
  const roll = which===2?_ccw.talent2Roll:_ccw.talentRoll;
  const pick = which===2?_ccw.talent2Pick:_ccw.talentPick;
  const cidx = which===2?_ccw.hbTalentChoice2:_ccw.hbTalentChoice;
  const list=_hbExpandChoices(_ccw, _hbGatherTalentChoices(_ccw.cls,roll,pick,cidx,which===2?'tb':'tm'));
  if(!list.length)return '';
  if(!_ccw.hbChoices)_ccw.hbChoices={};
  const spells=_hbKnownSpellsCreation(_ccw).filter(s=>s!=='Magic Missile').map(s=>[s,s]);
  const weapons=_hbAllWeaponOpts();
  const talents=_hbTalentRowOptions(_ccw.cls);
  let x='<div style="background:#0f0f0f;border:1px solid #7a5a00;padding:10px 12px;margin-top:8px;">';
  list.forEach(ch=>{
    x+='<div style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.12em;color:#c8a020;margin:2px 0 6px;">'+_hbChoiceLabel(ch)+'</div>';
    const cur=_ccw.hbChoices[ch.key]||'';
    if(ch.kind==='stat') x+=_hbChoiceSelect(ch.key,cur,_HB_STAT_OPTS,'ccwSetChoice');
    else if(ch.kind==='advSpell') x+= spells.length?_hbChoiceSelect(ch.key,cur,spells,'ccwSetChoice'):'<p style="color:#df6a6a;font-size:11px;margin:0;">You know no spells yet.</p>';
    else if(ch.kind==='weaponDie') x+=_hbChoiceSelect(ch.key,cur,weapons,'ccwSetChoice');
    else if(ch.kind==='talent') x+=_hbChoiceControl('talent',ch.key,cur,talents,'ccwSetChoice');
    else if(ch.kind==='oneOf') x+=_hbChoiceControl('oneOf',ch.key,cur,_hbTraitDistinctOpts(ch.effects).map(o=>[String(o.oi),_hbEffOne(o.eff)]),'ccwSetChoice');
  });
  return x+'</div>';
}

function ccwTalent() {
  if(_ccw.tres) ccwResolve(_ccw.tres);
  if(_ccw.tres2) ccwResolve(_ccw.tres2);
  let h = '<p class="ccw-hint">Roll 2d6 on the <b>'+_ccw.cls+'</b> talent table.' + (_ccw.ancestry==='Human'?' Humans roll twice (Ambitious).':'') + '</p>';
  h += '<table style="width:100%;border-collapse:collapse;margin-bottom:10px;">';
  h += '<tr><th style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;color:#c8a020;text-align:left;padding:4px 8px;border-bottom:1px solid #2a2a2a;width:50px;">2d6</th><th style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;color:#c8a020;text-align:left;padding:4px 8px;border-bottom:1px solid #2a2a2a;">Effect</th></tr>';
  ccwTalentRows().forEach(r=>{
    const hit1 = _ccw.talentRoll  && _ccw.talentRoll  >= r.lo && _ccw.talentRoll  <= r.hi;
    const hit2 = _ccw.talent2Roll && _ccw.talent2Roll >= r.lo && _ccw.talent2Roll <= r.hi;
    const bg = (hit1||hit2) ? 'background:#241f10;border-left:3px solid #c8a020;' : '';
    h += '<tr style="'+bg+'"><td style="font-family:Montserrat,sans-serif;font-size:11px;font-weight:900;color:#eee;padding:5px 8px;border-bottom:1px solid #1e1e1e;vertical-align:top;">'+r.range+(hit1?' <svg class="dcc-ico" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="display:inline-block;vertical-align:-0.14em"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.2h14a1.8 1.8 0 0 1 1.8 1.8v14a1.8 1.8 0 0 1-1.8 1.8H5A1.8 1.8 0 0 1 3.2 19V5A1.8 1.8 0 0 1 5 3.2Zm3 3.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM12 10.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm-4 4.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg>':'')+(hit2?' <svg class="dcc-ico" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="display:inline-block;vertical-align:-0.14em"><path d="M12 2.5c.6 3.9 2.6 5.9 6.5 6.5-3.9.6-5.9 2.6-6.5 6.5-.6-3.9-2.6-5.9-6.5-6.5 3.9-.6 5.9-2.6 6.5-6.5Z"/><path d="M18.5 14c.3 2 1.3 3 3.3 3.3-2 .3-3 1.3-3.3 3.2-.3-1.9-1.3-2.9-3.2-3.2 1.9-.3 2.9-1.3 3.2-3.3Z" opacity=".75"/></svg>':'')+'</td><td style="font-family:Montserrat,sans-serif;font-size:10px;color:#ccc;padding:5px 8px;border-bottom:1px solid #1e1e1e;line-height:1.4;">'+r.text+'</td></tr>';
  });
  h += '</table>';
  h += '<div style="display:flex;gap:6px;margin-bottom:10px;">';
  h += '<button class="ccw-roll-btn" style="flex:1;margin:0;" onclick="ccwRollTalent()"><svg class="dcc-ico" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="display:inline-block;vertical-align:-0.14em"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.2h14a1.8 1.8 0 0 1 1.8 1.8v14a1.8 1.8 0 0 1-1.8 1.8H5A1.8 1.8 0 0 1 3.2 19V5A1.8 1.8 0 0 1 5 3.2Zm3 3.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM12 10.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm-4 4.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg> Roll Talent</button>';
  h += '<select onchange="ccwPickTalent(this.value)" style="flex:1;padding:8px 10px;background:#141414;border:1px solid #2a2a2a;color:#eee;font-family:Montserrat,sans-serif;font-size:11px;font-weight:700;outline:none;cursor:pointer;">';
  h += '<option value="">— Choose a Talent —</option>';
  ccwTalentRows().forEach((r,i)=>{
    const sel = (_ccw.talentPick === String(i)) ? ' selected' : '';
    h += '<option value="'+i+'"'+sel+'>'+r.range+': '+r.text.slice(0,60)+(r.text.length>60?'…':'')+'</option>';
  });
  h += '</select></div>';
  if(_ccw.talent) {
    h += '<div class="ccw-result">'+(_ccw.talentRoll ? '<svg class="dcc-ico" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="display:inline-block;vertical-align:-0.14em"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.2h14a1.8 1.8 0 0 1 1.8 1.8v14a1.8 1.8 0 0 1-1.8 1.8H5A1.8 1.8 0 0 1 3.2 19V5A1.8 1.8 0 0 1 5 3.2Zm3 3.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM12 10.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm-4 4.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg> Rolled '+_ccw.talentRoll : '✔ Chosen')+': '+_ccw.talent+'</div>';
    h += ccwTalentChoiceUI(_ccw.tres, '_ccw.tres', _ccw.spells, _ccw.cls);
    h += _hbTalentPickerHtml(1);
    h += _hbTalentChoicesHtml(1);
    if(_ccw.ancestry==='Human') {
      h += '<div style="display:flex;gap:6px;margin:10px 0;">';
      h += '<button class="ccw-roll-btn" style="flex:1;margin:0;background:#241f10;border-color:#7a5a00;color:#c8a020;" onclick="ccwRollTalent2()"><svg class="dcc-ico" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="display:inline-block;vertical-align:-0.14em"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.2h14a1.8 1.8 0 0 1 1.8 1.8v14a1.8 1.8 0 0 1-1.8 1.8H5A1.8 1.8 0 0 1 3.2 19V5A1.8 1.8 0 0 1 5 3.2Zm3 3.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM12 10.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm-4 4.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg> Roll Bonus Talent</button>';
      h += '<select onchange="ccwPickTalent2(this.value)" style="flex:1;padding:8px 10px;background:#141414;border:1px solid #7a5a00;color:#eee;font-family:Montserrat,sans-serif;font-size:11px;font-weight:700;outline:none;cursor:pointer;">';
      h += '<option value="">— Choose Bonus Talent —</option>';
      ccwTalentRows().forEach((r,i)=>{
        const sel = (_ccw.talent2Pick === String(i)) ? ' selected' : '';
        h += '<option value="'+i+'"'+sel+'>'+r.range+': '+r.text.slice(0,60)+(r.text.length>60?'…':'')+'</option>';
      });
      h += '</select></div>';
    }
    if(_ccw.talent2) {
      h += '<div class="ccw-result" style="border-left-color:#c8a020;"><svg class="dcc-ico" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="display:inline-block;vertical-align:-0.14em"><path d="M12 2.5c.6 3.9 2.6 5.9 6.5 6.5-3.9.6-5.9 2.6-6.5 6.5-.6-3.9-2.6-5.9-6.5-6.5 3.9-.6 5.9-2.6 6.5-6.5Z"/><path d="M18.5 14c.3 2 1.3 3 3.3 3.3-2 .3-3 1.3-3.3 3.2-.3-1.9-1.3-2.9-3.2-3.2 1.9-.3 2.9-1.3 3.2-3.3Z" opacity=".75"/></svg> Bonus (Human) '+(_ccw.talent2Roll ? 'rolled '+_ccw.talent2Roll : 'chosen')+': '+_ccw.talent2+'</div>';
      h += ccwTalentChoiceUI(_ccw.tres2, '_ccw.tres2', _ccw.spells, _ccw.cls);
      h += _hbTalentPickerHtml(2);
      h += _hbTalentChoicesHtml(2);
    }
  }
  return h;
}
// Roll only the Human bonus (Ambitious) talent
function ccwRollTalent2() {
  _ccw.hbTalentChoice2 = null;
  _ccw.hbTalentSpells = [];
  _ccwClearChoiceKeys("tb");
  const roll2d6 = () => Math.ceil(Math.random()*6)+Math.ceil(Math.random()*6);
  const roll = roll2d6();
  const r = ccwTalentRows().find(x=>roll>=x.lo && roll<=x.hi);
  _ccw.talent2Roll = roll;
  _ccw.talent2Pick = null;
  _ccw.talent2 = r ? r.text : '';
  _ccw.tres2 = ccwAnalyzeTalent(_ccw.talent2, _ccw.cls);
  ccwResolve(_ccw.tres2);
  ccwRender();
}

// Pick a talent directly instead of rolling (GM's discretion / point-buy tables)
function ccwPickTalent(idx) {
  if(idx === '') return;
  _ccw.hbTalentChoice = null;
  _ccw.hbTalentSpells = [];
  _ccwClearChoiceKeys("tm");
  const rows = ccwTalentRows();
  const r = rows[parseInt(idx)];
  if(!r) return;
  _ccw.talentPick = String(idx);
  _ccw.talentRoll = null;   // chosen, not rolled
  _ccw.talent = r.text;
  _ccw.tres = ccwAnalyzeTalent(_ccw.talent, _ccw.cls);
  ccwResolve(_ccw.tres);
  // Humans still get their second (Ambitious) talent — let them choose it too
  if(_ccw.ancestry === 'Human' && !_ccw.talent2) {
    _ccw.talent2 = '';
    _ccw.tres2 = null;
  }
  ccwRender();
}
function ccwPickTalent2(idx) {
  if(idx === '') return;
  _ccw.hbTalentChoice2 = null;
  _ccw.hbTalentSpells = [];
  _ccwClearChoiceKeys("tb");
  const r = ccwTalentRows()[parseInt(idx)];
  if(!r) return;
  _ccw.talent2Pick = String(idx);
  _ccw.talent2Roll = null;
  _ccw.talent2 = r.text;
  _ccw.tres2 = ccwAnalyzeTalent(_ccw.talent2, _ccw.cls);
  ccwResolve(_ccw.tres2);
  ccwRender();
}

function ccwRollTalent() {
  _ccw.hbTalentChoice = null;
  _ccw.hbTalentSpells = [];
  _ccwClearChoiceKeys("tm");
  const roll2d6 = () => Math.ceil(Math.random()*6)+Math.ceil(Math.random()*6);
  const pick = (roll) => {
    const r = ccwTalentRows().find(x=>roll>=x.lo && roll<=x.hi);
    return r ? r.text : '';
  };
  _ccw.talentPick = null;
  _ccw.talentRoll = roll2d6();
  _ccw.talent = pick(_ccw.talentRoll);
  _ccw.tres = ccwAnalyzeTalent(_ccw.talent, _ccw.cls);
  ccwResolve(_ccw.tres);
  if(_ccw.ancestry==='Human') {
    _ccw.talent2Pick = null;
    _ccw.talent2Roll = roll2d6();
    _ccw.talent2 = pick(_ccw.talent2Roll);
    _ccw.tres2 = ccwAnalyzeTalent(_ccw.talent2, _ccw.cls);
    ccwResolve(_ccw.tres2);
  } else { _ccw.talent2Roll = null; _ccw.talent2 = null; _ccw.tres2 = null; }
  ccwRender();
}

// ── Step: Languages ──
function ccwLangs() {
  const lc = ccwLangChoices();
  let h = '<p class="ccw-hint">Your fixed languages: <b style="color:#c8a020;">'+RC_ANCESTRY.languages[_ccw.ancestry]+'</b></p>';

  if(lc.priest) {
    h += '<p class="ccw-hint" style="margin-top:8px;color:#c8a020;font-weight:700;">Priest: choose one holy language</p>';
    h += '<div style="display:flex;gap:4px;">';
    ['Celestial','Diabolic','Primordial'].forEach(l=>{
      const sel = _ccw.langPriest===l ? ' selected' : '';
      h += '<button class="ccw-choice'+sel+'" style="flex:1;text-align:center;" onclick="_ccw.langPriest=\''+l+'\';ccwRender()"><div class="ccw-choice-name" style="font-size:10px;">'+l+'</div></button>';
    });
    h += '</div>';
  }

  if(lc.common) {
    h += '<p class="ccw-hint" style="margin-top:10px;color:#c8a020;font-weight:700;">Choose '+lc.common+' common language'+(lc.common>1?'s':'')+' ('+_ccw.langCommon.length+'/'+lc.common+')</p>';
    h += '<div style="display:flex;gap:4px;flex-wrap:wrap;">';
    CCW_COMMON_LANGS.forEach(l=>{
      const sel = _ccw.langCommon.includes(l) ? ' selected' : '';
      h += '<button class="ccw-choice'+sel+'" style="flex:1;min-width:30%;text-align:center;" onclick="ccwToggleLang(\'common\',\''+l+'\','+lc.common+')"><div class="ccw-choice-name" style="font-size:10px;">'+l+'</div></button>';
    });
    h += '</div>';
  }

  if(lc.rare) {
    h += '<p class="ccw-hint" style="margin-top:10px;color:#c8a020;font-weight:700;">Choose '+lc.rare+' rare language'+(lc.rare>1?'s':'')+' ('+_ccw.langRare.length+'/'+lc.rare+')</p>';
    h += '<div style="display:flex;gap:4px;flex-wrap:wrap;">';
    CCW_RARE_LANGS.forEach(l=>{
      const sel = _ccw.langRare.includes(l) ? ' selected' : '';
      h += '<button class="ccw-choice'+sel+'" style="flex:1;min-width:22%;text-align:center;" onclick="ccwToggleLang(\'rare\',\''+l+'\','+lc.rare+')"><div class="ccw-choice-name" style="font-size:10px;">'+l+'</div></button>';
    });
    h += '</div>';
  }
  return h;
}
function ccwToggleLang(pool, lang, max) {
  const arr = pool==='common' ? _ccw.langCommon : _ccw.langRare;
  const i = arr.indexOf(lang);
  if(i >= 0) arr.splice(i,1);
  else if(arr.length < max) arr.push(lang);
  ccwRender();
}

// One-line ancestry feature, resolving any choice the player made.
function ancestryLine(c) {
  if(c.ancestry==='Elf' && c.elfFarsight)
    return 'Farsight: +1 to ' + (c.elfFarsight==='ranged' ? 'ranged attack rolls' : 'spellcasting checks') + '.';
  if(c.ancestry==='Kobold' && c.koboldKnack)
    return c.koboldKnack==='spell'
      ? 'Knack: +1 to spellcasting checks.'
      : 'Knack: You begin each session with a luck token.';
  const hb = RC_ANCESTRY._hb && RC_ANCESTRY._hb[c.ancestry];
  if(hb && Array.isArray(hb.traits)) {
    // Build the line trait-by-trait so a resolved choice shows ONLY the pick
    // ("Natural Selection: AC +1"), not the full options prompt followed by the
    // pick. Non-choice traits keep their descriptive text (with any per-day
    // suffix), matching how the ability summary is written elsewhere.
    const parts = [];
    hb.traits.forEach((t, ti) => {
      const txt = String(t && t.text || '').trim();
      if(_hbTraitIsChoice(t)) {
        const oi = c.hbChoice && c.hbChoice[ti];
        const effs = _hbTraitEffects(t);
        if(oi != null && effs[oi]) {
          const title = txt.split(':')[0];
          parts.push((title ? title + ': ' : '') + _hbEffOne(effs[oi]));
        }
        // An unresolved choice contributes nothing to the written line.
      } else if(txt) {
        const effs = Array.isArray(t && t.effects) ? t.effects : [];
        const per = effs.find(e => e && e.target === 'perDay');
        const u = per ? (Number(per.amount) || 0) : 0;
        parts.push(u > 0 ? txt + ' (' + u + '/day)' : txt);
      }
    });
    if(parts.length) return parts.join(' \u00b7 ');
  }
  return RC_ANCESTRY.ability[c.ancestry] || '';
}

// ── Step: Spells ──
// A rich picker (like the Spells step) for spells granted by a "Learn Spell →
// Player Choice" talent, so players see only accessible spells and their details.
function ccwLearnSpells() {
  const cls = _ccw.cls;
  const needed = _hbTalentLearnCount(_ccw);
  if(!_ccw.hbTalentSpells) _ccw.hbTalentSpells = [];
  if(!_ccw.spellSrc) _ccw.spellSrc = defaultSpellSources(cls);
  const pool = [], seen = new Set();
  const own = (ccwCasterInfo() || {}).list || '';
  const order = [own, ...SPELL_SOURCES.filter(s=>s!==own)].filter(Boolean);
  order.forEach(srcName=>{
    if(!_ccw.spellSrc[srcName]) return;
    const srcNames = (srcName === 'Homebrew')
      ? _homebrewSpells.filter(x=>String(x.tier)==='1').map(x=>x.name)
      : (RC_T1_BY_SOURCE[srcName]||[]);
    srcNames.forEach(sp=>{ if(seen.has(sp)) return; seen.add(sp); pool.push({ name: sp, src: srcName }); });
  });
  let h = '<p class="ccw-hint">Your talent lets you learn '+needed+' extra tier 1 spell'+(needed>1?'s':'')+'. ('+_ccw.hbTalentSpells.length+'/'+needed+' selected)</p>';
  h += spellSourceBar(_ccw.spellSrc, cls, 'ccwToggleSpellSrc');
  if(!pool.length) return h + '<p class="ccw-hint">No spell lists selected.</p>';
  h += '<div class="ccw-choice-grid">';
  pool.forEach(item=>{
    const sp = item.name;
    if((_ccw.spells||[]).includes(sp)) return;   // already known from the main Spells step
    const sel = _ccw.hbTalentSpells.includes(sp) ? ' selected' : '';
    const data = findSpell(sp, item.src) || RC_SPELL_DATA[sp] || {};
    const meta = [data.range?'Range: '+data.range:'', data.duration?'Dur: '+data.duration:'', data.damage?'Dmg: '+data.damage:''].filter(Boolean).join(' · ');
    const tag = (item.src !== own) ? '<span style="color:#8a7ac8;font-size:8px;font-weight:700;"> · '+item.src+'</span>' : '';
    h += '<button class="ccw-choice'+sel+'" onclick="ccwToggleTalentSpell(\''+sp.replace(/'/g,"\\\\'")+'\')"><div class="ccw-choice-name" style="font-size:11px;">'+sp+tag+'</div>'+(meta?'<div class="ccw-choice-desc" style="color:#c8a020;font-size:8px;">'+meta+'</div>':'')+'<div class="ccw-choice-desc">'+(data.desc||'')+'</div></button>';
  });
  h += '</div>';
  return h;
}
function ccwToggleTalentSpell(sp){
  if(!_ccw.hbTalentSpells) _ccw.hbTalentSpells = [];
  const needed = _hbTalentLearnCount(_ccw);
  const i = _ccw.hbTalentSpells.indexOf(sp);
  if(i>=0) _ccw.hbTalentSpells.splice(i,1);
  else if(_ccw.hbTalentSpells.length < needed) _ccw.hbTalentSpells.push(sp);
  ccwRender();
}

function ccwSpells() {
  const cls = _ccw.cls;
  const needed = ccwSpellsNeeded();
  if(!_ccw.spellSrc) _ccw.spellSrc = defaultSpellSources(cls);

  // Build the tier-1 pool from every ticked list. If a name appears on two
  // lists (e.g. Charm Person is both wizard and witch), the character's own
  // list wins so a selection is never ambiguous.
  const pool = [];
  const seen = new Set();
  const own = (ccwCasterInfo() || {}).list || '';
  const order = [own, ...SPELL_SOURCES.filter(s=>s!==own)].filter(Boolean);
  order.forEach(srcName=>{
    if(!_ccw.spellSrc[srcName]) return;
    const srcNames = (srcName === 'Homebrew')
      ? _homebrewSpells.filter(x=>String(x.tier)==='1').map(x=>x.name)
      : (RC_T1_BY_SOURCE[srcName]||[]);
    srcNames.forEach(sp=>{
      if(seen.has(sp)) return;
      seen.add(sp);
      pool.push({ name: sp, src: srcName });
    });
  });

  let h = '<p class="ccw-hint">Choose '+needed+' tier 1 spells.'+(cls==='Priest'?' Turn Undead is free.':'')+' ('+_ccw.spells.length+'/'+needed+' selected)</p>';
  h += spellSourceBar(_ccw.spellSrc, cls, 'ccwToggleSpellSrc');
  if(!pool.length) return h + '<p class="ccw-hint">No spell lists selected.</p>';
  h += '<div class="ccw-choice-grid">';
  pool.forEach(item=>{
    const sp = item.name;
    const sel = _ccw.spells.includes(sp) ? ' selected' : '';
    const data = findSpell(sp, item.src) || RC_SPELL_DATA[sp] || {};
    const meta = [data.range?'Range: '+data.range:'', data.duration?'Dur: '+data.duration:'', data.damage?'Dmg: '+data.damage:''].filter(Boolean).join(' · ');
    const tag = (item.src !== own)
      ? '<span style="color:#8a7ac8;font-size:8px;font-weight:700;"> · '+item.src+'</span>' : '';
    h += '<button class="ccw-choice'+sel+'" onclick="ccwToggleSpell(\''+sp.replace(/'/g,"\\'")+'\',\''+item.src+'\')"><div class="ccw-choice-name" style="font-size:11px;">'+sp+tag+'</div>'+(meta?'<div class="ccw-choice-desc" style="color:#c8a020;font-size:8px;">'+meta+'</div>':'')+'<div class="ccw-choice-desc">'+(data.desc||'')+'</div></button>';
  });
  h += '</div>';
  return h;
}
function ccwToggleSpellSrc(name, on) {
  if(!_ccw.spellSrc) _ccw.spellSrc = defaultSpellSources(_ccw.cls);
  _ccw.spellSrc[name] = !!on;
  // Drop any picked spell that no longer belongs to a ticked list
  _ccw.spells = _ccw.spells.filter(sp=>{
    const src = _ccw.spellSrcOf[sp];
    if(src && !_ccw.spellSrc[src]) { delete _ccw.spellSrcOf[sp]; return false; }
    return true;
  });
  ccwRender();
}
function ccwToggleSpell(sp, src) {
  const needed = ccwSpellsNeeded();
  const i = _ccw.spells.indexOf(sp);
  if(i >= 0) { _ccw.spells.splice(i,1); delete _ccw.spellSrcOf[sp]; }
  else if(_ccw.spells.length < needed) {
    _ccw.spells.push(sp);
    if(src) _ccw.spellSrcOf[sp] = src;
  }
  ccwRender();
}

// ── Step: Name & Finish ──
function ccwFinish() {
  const eff = ccwEffStats();
  const conMod = _rc_mod(eff.CON);
  let h = '<p class="ccw-hint">Name your character (or roll a random '+_ccw.ancestry+' name), then roll HP.</p>';
  h += '<div style="display:flex;gap:6px;margin-bottom:10px;">';
  h += '<input type="text" id="ccw-name-input" placeholder="Character name..." value="'+(_ccw.name||'').replace(/"/g,'&quot;')+'" oninput="_ccw.name=this.value" style="flex:1;padding:8px 10px;background:#141414;border:1px solid #2a2a2a;color:#eee;font-family:Montserrat,sans-serif;font-size:13px;outline:none;">';
  h += '<button class="ccw-roll-btn" style="margin:0;" onclick="_ccw.name=_rc_roll(RC_NAMES[_ccw.ancestry]||RC_NAMES.Human);ccwRender()"><svg class="dcc-ico" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="display:inline-block;vertical-align:-0.14em"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.2h14a1.8 1.8 0 0 1 1.8 1.8v14a1.8 1.8 0 0 1-1.8 1.8H5A1.8 1.8 0 0 1 3.2 19V5A1.8 1.8 0 0 1 5 3.2Zm3 3.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM12 10.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm-4 4.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg> Name</button>';
  h += '</div>';
  h += '<div style="display:flex;gap:6px;align-items:stretch;margin-bottom:10px;">';
  h += '<button class="ccw-roll-btn" style="flex:1;margin:0;" onclick="ccwRollHP()"><svg class="dcc-ico" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="display:inline-block;vertical-align:-0.14em"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.2h14a1.8 1.8 0 0 1 1.8 1.8v14a1.8 1.8 0 0 1-1.8 1.8H5A1.8 1.8 0 0 1 3.2 19V5A1.8 1.8 0 0 1 5 3.2Zm3 3.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM12 10.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm-4 4.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg> Roll HP (1'+RC_CLASS_INFO[_ccw.cls].hd.slice(1)+' '+(conMod>=0?'+':'')+conMod+' CON'+(_ccw.ancestry==='Dwarf'?' +2 Stout':'')+')</button>';
  h += '<button style="flex:0 0 auto;margin:0;padding:0 12px;background:#1a3a4a;border:1px solid #2d6a7a;color:#8ad4e0;cursor:pointer;font-family:Montserrat,sans-serif;font-weight:700;font-size:10px;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;" onclick="ccwMaxHP()" title="Take the maximum die result">⬆ Max</button>';
  h += '<div style="display:flex;align-items:center;gap:5px;background:#141414;border:1px solid #2a2a2a;padding:0 8px;">';
  h += '<span style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#888;">HP</span>';
  h += '<input type="number" id="ccw-hp-input" min="1" value="'+(_ccw.hp||'')+'" placeholder="—" oninput="_ccw.hp=Math.max(1,parseInt(this.value)||0)" style="width:46px;background:transparent;border:none;color:#eee;font-family:Montserrat,sans-serif;font-size:16px;font-weight:900;text-align:center;outline:none;">';
  h += '</div></div>';
  if(_ccw.hp) h += '<div class="ccw-result">Max HP: '+_ccw.hp+'</div>';
  h += '<div class="ccw-summary"><div class="ccw-summary-title">Summary</div>';
  h += '<div>'+(_ccw.name||'(unnamed)')+' — '+_ccw.ancestry+' '+_ccw.cls+'</div>';
  h += '<div>'+_ccw.alignment+(_ccw.deity?' · '+_ccw.deity:'')+' · '+_ccw.background+'</div>';
  h += '<div>STR '+eff.STR+' DEX '+eff.DEX+' CON '+eff.CON+' INT '+eff.INT+' WIS '+eff.WIS+' CHA '+eff.CHA+'</div>';
  if(_ccw.mastery) h += '<div>Weapon Mastery: '+_ccw.mastery+'</div>';
  if(_ccw.trusty) h += '<div>Trusty Gear: '+_ccw.trusty.value+'</div>';
  if(_ccw.grit) h += '<div>Grit: '+_ccw.grit+'</div>';
  if(_ccw.tres && _ccw.tres.final) h += '<div>Talent: '+_ccw.tres.final+'</div>';
  if(_ccw.tres2 && _ccw.tres2.final) h += '<div>Bonus Talent: '+_ccw.tres2.final+'</div>';
  const langs = [..._ccw.langCommon, ..._ccw.langRare, ...(_ccw.langPriest?[_ccw.langPriest]:[])];
  if(langs.length) h += '<div>Extra Languages: '+langs.join(', ')+'</div>';
  if(_ccw.spells.length) h += '<div>Spells: '+_ccw.spells.join(', ')+'</div>';
  const gearBits = [...(_ccw.buyKit?['Crawling Kit']:[]), ..._ccw.buyWeapons, ..._ccw.buyArmor];
  if(gearBits.length) h += '<div>Gear: '+gearBits.join(', ')+'</div>';
  h += '<div>Gold remaining: '+(Math.round((_ccw.gold - ccwGearSpent())*100)/100)+' gp</div>';
  h += '</div>';
  return h;
}
// Take the maximum hit die result instead of rolling
function ccwMaxHP() {
  const hdNum = parseInt(RC_CLASS_INFO[_ccw.cls].hd.split('d')[1]);
  const eff = ccwEffStats();
  let hp = hdNum + _rc_mod(eff.CON);
  if(_ccw.ancestry==='Dwarf') hp += 2;
  _ccw.hp = Math.max(1, hp);
  ccwRender();
}

function ccwRollHP() {
  const hdNum = parseInt(RC_CLASS_INFO[_ccw.cls].hd.split('d')[1]);
  const eff = ccwEffStats();
  let hp = Math.ceil(Math.random()*hdNum) + _rc_mod(eff.CON);
  if(_ccw.ancestry==='Dwarf') hp += 2;
  _ccw.hp = Math.max(1, hp);
  ccwRender();
}

// ── Gear slots: available = max(10, STR); disable slots above that ──


// ── Apply to sheet ──
function ccwApply() {
  if(!_ccw.hp) ccwRollHP();
  if(!_ccw.name) _ccw.name = _rc_roll(RC_NAMES[_ccw.ancestry]||RC_NAMES.Human);
  const c = _ccw;
  const eff = ccwEffStats();
  const hbEff = _hbEmptyEff();
  _hbFillAncestry(hbEff, c);
  _hbFillTalent(hbEff, c);
  _hbFillFeatures(hbEff, c);
  // Resolve player-choice effects (stat / advantage / weapon die / talent), expanding
  // any "Choose a talent" pick into the chosen row's own choices.
  _hbExpandChoices(c, _hbGatherChoices(c)).forEach(ch => _hbApplyChoice(hbEff, ch, (c.hbChoices||{})[ch.key]));
  _hbExpandChoices(c, _hbGatherFeatureChoices(c)).forEach(ch => _hbApplyChoice(hbEff, ch, (c.hbChoices||{})[ch.key]));
  _hbExpandChoices(c, _hbGatherTalentChoices(c.cls, c.talentRoll, c.talentPick, c.hbTalentChoice, 'tm')).forEach(ch => _hbApplyChoice(hbEff, ch, (c.hbChoices||{})[ch.key]));
  if(c.ancestry==='Human') _hbExpandChoices(c, _hbGatherTalentChoices(c.cls, c.talent2Roll, c.talent2Pick, c.hbTalentChoice2, 'tb')).forEach(ch => _hbApplyChoice(hbEff, ch, (c.hbChoices||{})[ch.key]));
  const set = (id,v) => { const el=document.getElementById(id); if(el) el.value=v; };

  document.querySelectorAll('#spells-list .spell-row').forEach(row => row.remove());
  _spellCount = 0;
  _trackers = [];   // a freshly built character starts with no trackers
  if(typeof renderTrackers === 'function') renderTrackers();
  const tbody = document.getElementById('attacks-body');
  if(tbody) tbody.innerHTML = '';

  set('f-name', c.name);
  set('f-class', c.cls);
  set('f-ancestry', c.ancestry);
  set('f-title', (RC_TITLES[c.cls]?.[c.alignment]||[])[0]||'');
  set('f-alignment', c.alignment);
  set('f-background', c.background);
  set('f-deity', c.deity||'');
  set('f-level', '1');
  refreshXpNext();                // XP-to-next = 10 × level
  set('spell-stat', c.cls==='Wizard' ? 'int' : c.cls==='Priest' ? 'wis' : (c.cls==='Bard' || c.cls==='Witch') ? 'cha' : '');
  const _hbCaster = RC_CLASS_INFO[c.cls] && RC_CLASS_INFO[c.cls]._caster;
  if(_hbCaster && _hbCaster.stat) set('spell-stat', _hbCaster.stat);

  const statIds = {STR:'str-val',DEX:'dex-val',CON:'con-val',INT:'int-val',WIS:'wis-val',CHA:'cha-val'};
  Object.entries(statIds).forEach(([k,id])=>{ set(id, eff[k] + (hbEff[k.toLowerCase()]||0)); });
  document.querySelectorAll('.stat-val').forEach(el=>el.dispatchEvent(new Event('input')));

  // Roustabout "roll an extra hit points die this level" — rare at level 1 (only
  // via a "roll another talent" sub-pick), but honor it if present.
  let _extraHp = 0;
  [c.tres, c.tres2].forEach(function chk(p){ if(!p) return; if(p.kind==='extrahd'){ const hd=parseInt((RC_CLASS_INFO[c.cls]?.hd||'1d4').split('d')[1])||4; _extraHp += Math.max(1, Math.ceil(Math.random()*hd)); } if(p.sub) chk(p.sub); });
  set("hp-current", c.hp + hbEff.hp + _extraHp); set("hp-max", c.hp + hbEff.hp + _extraHp);

  // AC: base 10 + DEX; armor/shield contribution goes into the bonus box, toggled on.
  // Innate AC from homebrew effects — not gear, so it can't be taken off.
  const _natAC = hbEff.ac || 0;

  // Languages line
  const extraLangs = [...c.langCommon, ...c.langRare, ...(c.langPriest?[c.langPriest]:[])];
  const langLine = RC_ANCESTRY.languages[c.ancestry] + (extraLangs.length ? ', ' + extraLangs.join(', ') : '');

  const ci = RC_CLASS_INFO[c.cls];
  const _isHb = ci && ci._hb;
  const talentFinal  = _isHb
    ? _hbTalentResolvedText(c.cls, c.talentRoll, c.talentPick, c.hbTalentChoice, c.talent)
    : ((c.tres && c.tres.final) || c.talent);
  const talent2Final = _isHb
    ? _hbTalentResolvedText(c.cls, c.talent2Roll, c.talent2Pick, c.hbTalentChoice2, c.talent2)
    : ((c.tres2 && c.tres2.final) || c.talent2);
  // Fighter's Grit names the chosen stat
  const features = (ci.features || []).map(f => {
    if(c.cls === 'Fighter' && c.grit && /^Grit[:.]/i.test(f))
      return 'Grit (' + c.grit + '): Advantage on ' + c.grit + ' checks to overcome an opposing force.';
    if(c.cls === 'Fighter' && c.mastery && /^Weapon Mastery[:.]/i.test(f))
      return 'Weapon Mastery (' + c.mastery + '): +1 to attack and damage, plus half your level (round down).';
    if(c.cls === 'Delver' && c.trusty && c.trusty.value && /^Trusty Gear[:.]/i.test(f))
      return 'Trusty Gear (' + c.trusty.value + '): Gain 2 + half your level (round down) on '
        + (c.trusty.kind === 'weapon' ? 'attack rolls' : 'checks') + ' made with it.';
    return f;
  });
  const lines = ['— Class Features —', ...features, '',
    '— Ancestry: '+c.ancestry+' —',
    ancestryLine(c), '',
    '— Languages —', langLine, '',
    '— Talent Roll —', talentFinal,
    ...(talent2Final?['','— Bonus Talent (Human) —',talent2Final]:[])];
  set('talents-text', lines.join('\n'));
  renderTalentsView();

  const allSpells = [...c.spells];
  // Homebrew "Learn Spell" talent/trait effects add named spells.
  (hbEff.learnSpells||[]).forEach(sp => { if(sp && !allSpells.includes(sp)) allSpells.push(sp); });
  // Player-chosen spells from "Learn Spell → Player Choice" talents (Learn Spells step).
  (c.hbTalentSpells||[]).forEach(sp => { sp = (sp||'').trim(); if(sp && !allSpells.includes(sp)) allSpells.push(sp); });
  if(c.cls==='Priest') allSpells.push('Turn Undead');
  allSpells.forEach(sp=>{
    _spellCount++;
    const row = addSpellRow(_spellCount);
    if(!row) return;
    const picked = (c.spellSrcOf && c.spellSrcOf[sp]) || null;
    const data = (picked ? findSpell(sp, picked)
                : c.cls==='Witch' ? findSpell(sp,'Witch')
                : RC_DRUID_SPELLS_T1.includes(sp) ? findSpell(sp,'Druid')
                : RC_MAGE_SPELLS_T1.includes(sp) ? findSpell(sp,'Mage')
                : RC_SORC_SPELLS_T1.includes(sp) ? findSpell(sp,'Sorcerer')
                : (RC_SPELL_DATA[sp] || findSpell(sp, c.cls))) || {};
    const q = (cl)=>row.querySelector(cl);
    const inp=q('.spell-input'); if(inp) inp.value=sp;
    const lvl=q('.spell-level'); if(lvl&&(data.level||data.tier)) lvl.value=data.level||data.tier;
    const rng=q('.spell-range'); if(rng&&data.range) rng.value=data.range;
    const dur=q('.spell-duration'); if(dur&&data.duration) dur.value=data.duration;
    const dmg=q('.spell-damage'); if(dmg){const _d=spellRollDice(data); if(_d) dmg.value=_d;}
    const dsc=q('.spell-desc'); if(dsc&&data.desc){dsc.value=data.desc;autoResizeDesc(dsc);}
  });

  // Auto-toggle advantage: talent-chosen spells + Magic Missile (always adv)
  const advSpells = new Set(['Magic Missile']);
  // Homebrew "Advantage: Cast Spell" effects grant advantage on those spells.
  (hbEff.advSpells||[]).forEach(sp => { if(sp) advSpells.add(sp); });
  [c.tres, c.tres2, c.tres && c.tres.sub, c.tres2 && c.tres2.sub].forEach(p=>{
    if(p && p.kind==='spellknown' && p.picked) advSpells.add(p.picked);
  });
  document.querySelectorAll('#spells-list .spell-row').forEach(row=>{
    const nm = row.querySelector('.spell-input')?.value.trim();
    if(nm && advSpells.has(nm)) {
      const ab = row.querySelector('.spell-adv-btn');
      if(ab) ab.classList.add('on');
    }
  });

  // Gold remaining after purchases
  const goldLeft = Math.max(0, Math.round((c.gold - ccwGearSpent())*100)/100);
  set('coin-gp', String(Math.floor(goldLeft)));
  const spRemainder = Math.round((goldLeft - Math.floor(goldLeft))*10);
  if(spRemainder > 0) set('coin-sp', String(spRemainder));

  // Gear list from purchases
  document.querySelectorAll('#gear-list .gear-name').forEach(el=>el.value='');
  document.querySelectorAll('#gear-list .gear-qty').forEach(el=>el.value='');
  const gearItems = [];
  if(c.buyKit) CCW_KIT_ITEMS.forEach(k=>{ if(k.name!=='Backpack') gearItems.push(k); });
  c.buyArmor.forEach(a=>gearItems.push({name:a, qty:'1'}));
  c.buyWeapons.forEach(w=>{
    const existing = gearItems.find(g=>g.name===w);
    if(existing) existing.qty = String(parseInt(existing.qty)+1);
    else gearItems.push({name:w, qty:'1'});
  });
  // Expand bulky items (2-slot weapons, chainmail, plate) into continuation rows
  const gearRows = [];
  gearItems.forEach(g=>{
    const qty = parseInt(g.qty) || 1;
    const cost = itemSlotCost(g.name);
    gearRows.push({name:g.name, qty:g.qty});
    // one item of N slots takes N-1 extra rows; multiples multiply that
    const extras = (cost - 1) * qty;
    // Continuation rows just reserve slots — they carry no quantity of their own
    for(let s = 0; s < extras; s++) gearRows.push({name:'↳ ' + g.name, qty:''});
  });
  const gn=document.querySelectorAll('#gear-list .gear-name');
  const gq=document.querySelectorAll('#gear-list .gear-qty');
  gearRows.forEach((g,i)=>{ if(gn[i])gn[i].value=g.name; if(gq[i])gq[i].value=(g.qty===''?'':(g.qty||'1')); });
  const fc=document.getElementById('free-carry'); if(fc) fc.value=c.buyKit?'Backpack':'';

  // Gear slots: max(10, STR) available; disable the rest from slot 20 downward
  ccwSetGearSlots(eff.STR);

  // NB: armor is equipped and weapon attacks are linked at the END of this
  // function — after the attack rows below are generated — so that equipping a
  // weapon links the (correct) generated row instead of creating a second,
  // bonus-less one. Weapons don't affect AC, so deferring costs nothing here.

  // Talent/ancestry attack + spell bonuses (stat mod comes from the Stat dropdown, not here)
  const atkBonus = { melee:0, ranged:0, meleeDmg:0, rangedDmg:0 };
  const masterySet = new Set();   // Weapon Mastery: +1 atk/dmg with weapon
  const d12Set = new Set();       // Ranger: d12 damage with weapon
  let spellChkBonus = 0;
  let backstabExtraDice = 0;
  const armorTalentArmors = [];
  if(c.cls==='Fighter' && c.mastery) masterySet.add(c.mastery);  // Weapon Mastery (class feature)
  if(c.ancestry==='Half-Orc') { atkBonus.melee += 1; atkBonus.meleeDmg += 1; } // Mighty
  if(c.elfFarsight==='ranged') atkBonus.ranged += 1;      // Farsight
  if(c.elfFarsight==='spell')  spellChkBonus += 1;        // Farsight
  if(c.koboldKnack==='spell')  spellChkBonus += 1;        // Kobold: Knack
  // Homebrew ancestry: flat bonuses + chosen "choose one" option effects
  // Homebrew ancestry + talent: attack, damage, and spellcasting-check bonuses
  atkBonus.melee += hbEff.meleeAtk; atkBonus.meleeDmg += hbEff.meleeDmg;
  atkBonus.ranged += hbEff.rangedAtk; atkBonus.rangedDmg += hbEff.rangedDmg;
  spellChkBonus += hbEff.spellCheck;
  [c.tres, c.tres2].forEach(p=>{
    const f = (p && p.final) || '';
    const e = (typeof talentLineEffects==='function') ? talentLineEffects(f)
            : {melee:0,ranged:0,meleeDmg:0,rangedDmg:0,spellCheck:0};
    atkBonus.melee += e.melee; atkBonus.ranged += e.ranged;
    atkBonus.meleeDmg += e.meleeDmg; atkBonus.rangedDmg += e.rangedDmg;
    spellChkBonus += e.spellCheck;
    if(/Backstab deals \+1 dice/i.test(f)) backstabExtraDice += 1;
    let m = f.match(/Weapon Mastery with one additional weapon type — (.+)$/i);
    if(m) masterySet.add(m[1].trim());
    m = f.match(/d12 damage with one weapon type you choose — (.+)$/i);
    if(m) d12Set.add(m[1].trim());
    m = f.match(/Choose one armor type, get \+1 AC from it — (.+)$/i);
    if(m && c.buyArmor.includes(m[1].trim())) armorTalentArmors.push(m[1].trim());
  });
  // Fighter armor talent: apply +1 to the CHOSEN armor by renaming that gear item
  // "+1 <type>" — so it's tied to the armor being equipped (unequip removes it).
  armorTalentArmors.forEach(armorName => {
    const slot = [...document.querySelectorAll('#gear-list .gear-slot')].find(r => {
      const v = (r.querySelector('.gear-name')?.value || '').trim();
      return v === armorName || v === '↳ ' + armorName;
    });
    if(slot) {
      const el = slot.querySelector('.gear-name');
      if(el && !/^\+\d+\s/.test(el.value)) el.value = '+1 ' + el.value.trim();
    }
  });
  // Innate AC from homebrew ancestry/class effects (truly not gear).
  _innateAC = _natAC;
  _charTrusty = (c.trusty && c.trusty.value) ? c.trusty : null;   // Delver Trusty Gear
  _charExtraWeapons = []; _charExtraArmor = [];                    // Roustabout "wield new weapon/armor"
  collectWieldNew([c.tres, c.tres2]);
  _hbBonusSlots = hbEff.gearSlots || 0;
  _hbFeatureChargeBonus = Object.assign({}, hbEff.featureCharges || {});
  // Base per-day uses for this class's homebrew features (structured, not prose).
  _hbFeatureBaseUses = Object.assign({}, (RC_CLASS_INFO[c.cls] && RC_CLASS_INFO[c.cls]._featureUses) || {});
  if(typeof refreshGearSlots === 'function') refreshGearSlots();
  if(typeof renderTalentsView === 'function') renderTalentsView();
  // Global spell check bonus field
  set('spell-gbonus', spellChkBonus > 0 ? '+'+spellChkBonus : '');

  // Attack rows for purchased weapons
  const _fillAtkRow = (name, w, dmgOverride) => {
    addAttackRow();
    const tbody2 = document.getElementById('attacks-body');
    const row = tbody2.lastElementChild;
    if(!row) return;
    const f2 = atkFields(row);
    const isFinesse = w.props.toLowerCase().includes('finesse');
    const useDex = (w.type==='R') || (isFinesse && _rc_mod(eff.DEX) > _rc_mod(eff.STR));
    const isRangedWeapon = w.type==='R';
    let bonus = isRangedWeapon ? atkBonus.ranged : atkBonus.melee;
    let dmgBonus = isRangedWeapon ? atkBonus.rangedDmg : atkBonus.meleeDmg;
    if(masterySet.has(w.name)) { const mb = masteryBonus(1); bonus += mb; dmgBonus += mb; }
    bonus += trustyWeaponAtkBonus(w.name);   // Delver Trusty Gear (to-hit only)
    let dmg = dmgOverride || w.damage;
    if(d12Set.has(w.name)) dmg = dmg.replace(/d\d+/g, 'd12');
    dmg = _hbWeaponDamage(dmg, w.name, hbEff);
    if(dmgBonus > 0) dmg = dmg.split('/').map(d=>d+'+'+dmgBonus).join('/');
    if(f2.name)   f2.name.value   = name;
    if(f2.bonus)  f2.bonus.value  = bonus > 0 ? '+'+bonus : '';
    if(f2.damage) f2.damage.value = dmg;
    if(f2.stat)   f2.stat.value   = useDex ? 'DEX' : 'STR';
    if(f2.range)  { const parts=w.range.split('/'); f2.range.value = parts[parts.length-1].trim(); }
    if(typeof refreshAtkDamageToggle === 'function') refreshAtkDamageToggle(row);
  };
  // Strikes (unarmed) attack row — every character gets one.
  const _unarmed = SD_WEAPONS.find(x=>x.name==='Strikes');
  const hasUnarmed = true;
  const unarmedDie = _unarmed ? _unarmed.damage : '1d4';
  _fillAtkRow('Strikes', _unarmed, unarmedDie);
  // keep Strikes as the first attack row
  const _atkBody = document.getElementById('attacks-body');
  if(_atkBody && _atkBody.lastElementChild) _atkBody.insertBefore(_atkBody.lastElementChild, _atkBody.firstChild);
  const uniqueWeapons = [...new Set(c.buyWeapons)];
  uniqueWeapons.forEach(wname=>{
    const w = SD_WEAPONS.find(x=>x.name===wname);
    if(w) _fillAtkRow(w.name, w);
  });
  // Thief: Backstab attack for every chosen weapon (extra weapon die vs unaware
  // targets, +talent dice) — including natural/mastered unarmed strikes.
  if(c.cls==='Thief') {
    const bsDice = 1 + 1 + Math.floor(1/2) + backstabExtraDice;   // weapon die + extra die + half level
    const bsList = [...(hasUnarmed ? ['Strikes'] : []), ...uniqueWeapons];
    bsList.forEach(wname=>{
      const bw = SD_WEAPONS.find(x=>x.name===wname);
      if(!bw) return;
      const baseDmg = (wname==='Strikes') ? unarmedDie : bw.damage;
      let bsDmg = d12Set.has(bw.name) ? baseDmg.replace(/d\d+/g,'d12') : baseDmg;
      bsDmg = _hbWeaponDamage(bsDmg, bw.name, hbEff);
      bsDmg = bsDmg.replace(/1d/g, bsDice+'d');
      _fillAtkRow('Backstab ('+bw.name+')', bw, bsDmg);
    });
  }

  _charMastery = [...masterySet];

  // Wyrdling gets its Pseudopod natural attack (reads the pseudopod talent bonus
  // from the Talents box set above). No-op for every other class.
  if(typeof ensurePseudopodAttack === 'function') ensurePseudopodAttack();

  // Attack rows are now generated. Equip the purchased armor (for AC) and link
  // each generated weapon/backstab row to its gear slot. Running this AFTER
  // generation is what prevents the duplicate, bonus-less attack rows.
  if(typeof autoEquipArmorFromGear === 'function') autoEquipArmorFromGear();
  if(typeof refreshAutoAC === 'function') refreshAutoAC();

  // Remember every list the player ticked on (their own list is always implied)
  _charSpellSources = c.spellSrc
    ? Object.keys(c.spellSrc).filter(k => c.spellSrc[k])
    : [];

  saveSheet(false);
  addLog('Character Created','<svg class="dcc-ico" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="display:inline-block;vertical-align:-0.14em"><path d="M5.5 4.2h9a1.3 1.3 0 0 1 1.3 1.3v2.2a1.3 1.3 0 0 1-1.3 1.3h-9a1.3 1.3 0 0 1-1.3-1.3V5.5a1.3 1.3 0 0 1 1.3-1.3Z"/><path d="M8.7 9h2.6l-.5 10.4a.8.8 0 0 1-1.6 0Z"/></svg>',c.name+' the '+c.ancestry+' '+c.cls,'normal');
  ccwClose();
  if(typeof updateHeaderButton==='function') updateHeaderButton();
}

