// DarkSpace character sheet — random-character / rules data. A sci-fi reskin of
// Shadowdark (mechanics identical; only names/flavor differ). Fork of
// sd-sheet-rc-data.js, trimmed to CORE content only (6 archetypes, no optional
// classes/ancestries/backgrounds). DarkSpace decouples Traits: your Species is
// free-text and you pick ONE Trait from DS_TRAITS. Loaded before the sheet
// script; declaration order mirrors the Shadowdark file so the engine fork
// finds every RC_* name in the same shared scope.
// ── Random Character Generator ─────────────────────────────────────────────
// Flavor species for the random roller only. In DarkSpace, Species grants NO
// trait (decoupled) — the trait is chosen separately from DS_TRAITS. `ability`
// is kept empty so any engine code that reads it stays harmless.
const RC_ANCESTRY = {
  table: [
    {w:4,v:'Human'},{w:2,v:'Voidkin'},{w:2,v:'Ferrix'},
    {w:2,v:'Zeph'},{w:1,v:'Greldan'},{w:1,v:'Synthetic'},
    {w:1,v:'Kastellan'}
  ],
  ability: {
    Human:'', Voidkin:'', Ferrix:'', Zeph:'', Greldan:'', Synthetic:'', Kastellan:'',
  },
  languages: {
    Human:     'Common + 1 additional common language',
    Voidkin:   'Common, High Voidkin, Xeno-cant',
    Ferrix:    'Common, Ferrix',
    Zeph:      'Common',
    Greldan:   'Common, Raider-cant',
    Synthetic: 'Common, Machine-code',
    Kastellan: 'Common, Machine-code',
  }
};

// ── Decoupled Traits ───────────────────────────────────────────────────────
// Pick ONE. Effects are Shadowdark's ancestry/DarkSpace traits, unchanged.
const DS_TRAITS = [
  // core six (from the Shadowdark ancestries)
  { name:'Ambitious',      effect:'+1 bonus talent roll at 1st level.' },
  { name:'Keen Optics',    effect:'+1 to ranged attack rolls OR +1 to power checks.' },
  { name:'Reinforced',     effect:'Start with +2 HP. Roll hit points with advantage.' },
  { name:'Cloaked',        effect:'Once per day, become invisible for 3 rounds.' },
  { name:'Augmented',      effect:'+1 to attack and damage with melee weapons.' },
  { name:'Motion Sense',   effect:'You cannot be surprised.' },
  // additional (from DarkSpace — The Triad excluded)
  { name:'Armored Hide',   effect:'+1 AC when unarmored.' },
  { name:'Longsight',      effect:'+1 to ranged attack and damage.' },
  { name:'Natural Weapon', effect:'You have a natural weapon dealing 1d6 damage (you are proficient with it).' },
  { name:'Flight',         effect:'You can fly and/or walk.' },
  { name:'Sneaky',         effect:'Advantage on deception checks.' },
  { name:'Amphibious',     effect:'You breathe water and air; swim at full speed.' },
  { name:'Tracking Sense', effect:'1/session, mark a quarry; advantage to track it.' },
  { name:'Heat Adapted',   effect:'Survive hot environments; take half fire/heat damage.' },
  { name:'Cold Adapted',   effect:'Survive cold environments; take half ice/cold damage.' },
  { name:'Rad-Shielded',   effect:'Survive radioactive environments; take half radiation/electric damage.' },
  { name:'Filtration',     effect:'Survive toxic environments; take half poison damage.' },
  { name:'Technical Knack',effect:'+1 to checks working with technology and machines.' },
  { name:'Beast Affinity', effect:'+1 to checks working with creatures and xenofauna.' },
  { name:'Natural Climber',effect:'Climb at full speed; reduce the DC of climbing checks by one category.' },
  { name:'Covert Comms',   effect:'You can communicate secretly with others of your own kind.' },
  { name:'Extra Arms',     effect:'One extra non-attack action per turn; +2 gear slots.' },
  { name:'Extra Legs',     effect:'Move up to double near in addition to your action; +1 category on checks to resist being tripped.' },
  { name:'Mechanical',     effect:'Synthetic body: you need no food, drink, or air; you recharge on a rest.' },
  { name:'Life Support',   effect:'Sealed suit: no food, drink, or air needed while powered; you still rest to recharge.' },
];

// Archetypes = the six Shadowdark core classes, reskinned.
const RC_CLASSES = ['Soldier','Mystic','Scoundrel','Engineer','Scout','Diplomat'];
// Display order for the 2-column Character Creation Wizard grid (row-major).
const CCW_CLASS_ORDER = ['Soldier','Scoundrel','Scout','Mystic','Engineer','Diplomat'];
// Core only — no optional content in DarkSpace.
const RC_OPTIONAL_CLASSES = [];
const RC_OPTIONAL_ANCESTRIES = [];
const RC_OPTIONAL_BACKGROUNDS = [];

// ── Scout stims (Ranger's herbal remedies, reskinned; effects unchanged) ────
const SD_REMEDIES = [
  { name:'Medgel',      dc:11, effect:'Heals 1 HP.' },
  { name:'Combat Stim', dc:12, effect:"You can't be surprised for 10 rounds." },
  { name:'Target Lock', dc:13, effect:'ADV on attacks and damage against one creature type you choose for 1d6 rounds.' },
  { name:'Antitox',     dc:14, effect:'Ends one poison or disease.' },
  { name:'Medkit',      dc:15, effect:'Restores HP as a healing stimpack (Potion of Healing equivalent).' },
];
const remedyLine = r => r.name + ' (DC ' + r.dc + '): ' + r.effect;

const RC_CLASS_INFO = {
  Soldier: { hd:'1d8', weapons:'All weapons', armor:'All armor and deflectors',
    talent:['Gain Weapon Specialization with one additional weapon type','+1 to melee and ranged attacks','+1 to melee and ranged attacks','+1 to melee and ranged attacks','+1 to melee and ranged attacks','+2 to Strength, Dexterity, or Constitution stat','+2 to Strength, Dexterity, or Constitution stat','+2 to Strength, Dexterity, or Constitution stat','+2 to Strength, Dexterity, or Constitution stat','Choose one armor type, get +1 AC from it','Choose one armor type, get +1 AC from it','Choose a talent or +2 stat points'],
    features:['Hauler: Add CON modifier (if positive) to gear slots.','Weapon Specialization: Choose a weapon type; +1 to attack and damage. Add half your level to these rolls.','Grit: Choose STR or DEX; advantage on checks to overcome opposing force.'] },
  Mystic: { hd:'1d6', weapons:'Stun baton, slug rifle, combat knife, shock maul, vibroblade, power staff, breaching hammer', armor:'All armor and deflectors',
    talent:['Gain advantage on casting one power you know','+1 to melee or ranged attacks','+1 to melee or ranged attacks','+1 to melee or ranged attacks','+1 to melee or ranged attacks','+1 to Mystic power checks','+1 to Mystic power checks','+1 to Mystic power checks','+1 to Mystic power checks','+2 to Strength or Wisdom stat','+2 to Strength or Wisdom stat','Choose a talent or +2 stat points'],
    features:['Banish (bonus power, does not count toward power limit).','Power Channeling (WIS). Know 2 tier 1 powers. Add powers per level.','Languages: Ascendant, Void-cant, or Machine-code.','Choose an Allegiance matching your alignment.'] },
  Scoundrel: { hd:'1d4', weapons:'Stun baton, slug rifle, combat knife, blaster pistol, vibro-shortblade', armor:'Flak weave, reinforced combat weave',
    talent:['1/day, all attacks that would hit you this round miss instead',
            'Ambush deals +1 dice of damage','Ambush deals +1 dice of damage','Ambush deals +1 dice of damage','+2 to Strength, Dexterity, or Charisma stat','+2 to Strength, Dexterity, or Charisma stat','+2 to Strength, Dexterity, or Charisma stat','+2 to Strength, Dexterity, or Charisma stat','+2 to Strength, Dexterity, or Charisma stat','+1 to melee and ranged attacks','+1 to melee and ranged attacks','Choose a talent or +2 stat points'],
    features:['Ambush: Hit unaware target → extra weapon die damage + half level dice.','Infiltration: Advantage on climbing, sneaking, disguises, traps, locks, pickpocketing.'] },
  Engineer: { hd:'1d4', weapons:'Combat knife, power staff', armor:'None',
    talent:['Make 1 random tech gadget (your choice of type)','+2 to Intelligence stat or +1 to power checks','+2 to Intelligence stat or +1 to power checks','+2 to Intelligence stat or +1 to power checks','+2 to Intelligence stat or +1 to power checks','+2 to Intelligence stat or +1 to power checks','Advantage on casting one power you know','Advantage on casting one power you know','Advantage on casting one power you know','Learn one additional Engineer power of any tier you know','Learn one additional Engineer power of any tier you know','Choose a talent or +2 stat points'],
    features:['Power Channeling (INT). Know 3 tier 1 powers. Add powers per level.','Reverse-Engineering: Study a datachip 1 day, DC 15 INT check to learn permanently.','Languages: 2 additional common + 2 rare languages.'] },
  Scout: { hd:'1d8', weapons:'Combat knife, blaster rifle, vibroblade, blaster pistol, vibro-shortblade, shock lance, power staff', armor:'Flak weave, combat weave',
    talent:['You deal d12 damage with one weapon type you choose','+1 to melee or ranged attacks and damage','+1 to melee or ranged attacks and damage','+1 to melee or ranged attacks and damage','+1 to melee or ranged attacks and damage','+2 to Strength, Dexterity, or Intelligence stat','+2 to Strength, Dexterity, or Intelligence stat','+2 to Strength, Dexterity, or Intelligence stat','+2 to Strength, Dexterity, or Intelligence stat','ADV on Field Medicine checks for a stim you choose','ADV on Field Medicine checks for a stim you choose','Choose a talent or +2 stat points'],
    features:['Wayfinder: Advantage on Navigation, Tracking, Survival, Stealth, and Xeno-handling checks.','Field Medicine (INT check): Prepare a stim. Stims expire in 3 rounds.', ...SD_REMEDIES.map(r => '  ' + remedyLine(r))] },
  Diplomat: { hd:'1d6', weapons:'Slug rifle, combat knife, shock maul, blaster pistol, vibro-shortblade, shock lance, power staff', armor:'Flak weave, combat weave, deflectors',
    // 12 slots; text is read from indices 0,1,6,9,11 (one per band).
    talent:['You find a random gadget (you choose)',
            '+1 to melee/ranged attacks or +1 to Tech Dabbler rolls','+1 to melee/ranged attacks or +1 to Tech Dabbler rolls','+1 to melee/ranged attacks or +1 to Tech Dabbler rolls','+1 to melee/ranged attacks or +1 to Tech Dabbler rolls','+1 to melee/ranged attacks or +1 to Tech Dabbler rolls',
            '+2 points to any stats','+2 points to any stats','+2 points to any stats',
            'Presence effects become DC 9 to enact','Presence effects become DC 9 to enact',
            'Choose a talent'],
    features:['Silver Tongue: Advantage on oration, performing arts, lore, and diplomacy.','Tech Dabbler: Activate datachips/gadgets using CHA. Critical fail = tech mishap.','Presence (DC 12 CHA): Inspire (give luck token) or Fascinate (transfix targets ≤ lvl 4).','Networker: +1d6 to learning rolls. Groups with Diplomats +1d6 to carousing.','Languages: 4 additional common + 1 rare language.'] },
};

// Ranks (Shadowdark titles), reworked for the sci-fi archetype names.
const RC_TITLES = {
  Soldier:   { Lawful:['Recruit','Trooper','Sergeant','Lieutenant','Commander'], Chaotic:['Grunt','Gun','Enforcer','Warlord','Butcher'], Neutral:['Fighter','Veteran','Hardcase','Warchief','Legend'] },
  Mystic:    { Lawful:['Acolyte','Adept','Seer','Oracle','Ascendant'], Chaotic:['Initiate','Channeler','Cultist','Void-touched','Herald'], Neutral:['Seeker','Wanderer','Sage','Elder','Enlightened'] },
  Scoundrel: { Lawful:['Runner','Fixer','Operator','Handler','Boss'], Chaotic:['Thug','Cutthroat','Ghost','Assassin','Kingpin'], Neutral:['Grifter','Hustler','Rogue','Renegade','Legend'] },
  Engineer:  { Lawful:['Apprentice','Technician','Engineer','Chief','Architect'], Chaotic:['Hacker','Breaker','Saboteur','Ghost','Zero'], Neutral:['Tinker','Mechanic','Specialist','Savant','Mastermind'] },
  Scout:     { Lawful:['Tracker','Pathfinder','Ranger','Warden','Sentinel'], Chaotic:['Stalker','Hunter','Poacher','Killer','Reaper'], Neutral:['Wayfarer','Rover','Outlander','Nomad','Ghost'] },
  Diplomat:  { Lawful:['Attaché','Liaison','Diplomat','Ambassador','Envoy'], Chaotic:['Grifter','Charlatan','Silvertongue','Manipulator','Kingmaker'], Neutral:['Talker','Broker','Mediator','Speaker','Voice'] },
};

// Core 20 backgrounds, reskinned to sci-fi.
const RC_BACKGROUNDS = [
  'Station Rat','Wanted','Cult Initiate','Syndicate','Exiled','Orphaned',
  'Engineer Trainee','Tech','Medic','Frontier-born','Merc','Void Sailor',
  'Devotee','Soldier','Scout','Recon','Broadcaster','Scholar','Corporate','Field Surgeon',
];

const RC_NAMES = {
  Human:     ['Zali','Bram','Clara','Nattias','Rina','Denton','Mirena','Aran','Morgan','Giralt','Tamra','Oscar','Ishana','Rogar','Jasmin','Tarin','Yuri','Malchor','Lienna','Godfrey'],
  Voidkin:   ['Eliara','Ryarn','Sariel','Tirolas','Galira','Varos','Daeniel','Axidor','Hiralia','Cyrwin','Lothiel','Zaphiel','Nayra','Ithior','Amriel','Elyon','Jirwyn','Natinel','Fiora','Ruhiel'],
  Ferrix:    ['Hilde','Torbin','Marga','Bruno','Karina','Naugrim','Brenna','Darvin','Elga','Alric','Isolde','Gendry','Bruga','Junnor','Vidrid','Torson','Brielle','Ulfgar','Sarna','Grimm'],
  Zeph:      ['Willow','Benny','Annie','Tucker','Marie','Hobb','Cora','Gordie','Rose','Ardo','Alma','Norbert','Jennie','Barvin','Tilly','Pike','Lydia','Marlow','Astrid','Jasper'],
  Greldan:   ['Vara','Gralk','Ranna','Korv','Zasha','Hrogar','Klara','Tragan','Brolga','Drago','Yelena','Krull','Ulara','Tulk','Shiraal','Wulf','Ivara','Hirok','Aja','Zoraan'],
  Synthetic: ['Unit-9','Tark','Nix','Lenk','Roke','Fitz','Tila','Riggs','Prim','Zeb','Cass','Vex','Yark','Delta','Nibs','Brak','Fink','Echo','Squib','Grix'],
};

const RC_SPELL_DATA = {
  // Mystic Tier 1 (Priest)
  'Mend':               { level:'1', range:'Close', duration:'Instant',   damage:'', heal:'scaling', desc:'Restore 1 + half your level (round down) d6 HP with touch.' },
  'Psi-Edge':           { level:'1', range:'Close', duration:'5 rounds',  damage:'', desc:'One touched weapon deals +1d6 damage (1d8 vs reanimated).' },
  'Force of Will':      { level:'1', range:'Self',  duration:'5 rounds',  damage:'', desc:'Gain +2 bonus to AC for duration.' },
  'Banish':             { level:'1', range:'Near',  duration:'Instant',   damage:'', desc:'Reanimated and synthetic hostiles in near range flee (CHA check vs power check). Fail by 10+ and ≤ your level = destroyed.' },
  // Engineer Tier 1 (Wizard) — re-themed as tech/gadgets
  'Proximity Sensor':   { level:'1', range:'Close', duration:'1 day',     damage:'', desc:'Ward a door/threshold. You are mentally alerted when a creature passes through it.' },
  'Flame Projector':    { level:'1', range:'Close', duration:'Instant',   damage:'2d6', desc:'Release a roaring jet of flame across a close area.' },
  'Neural Override':    { level:'1', range:'Near',  duration:'1d8 days',  damage:'', desc:'Override one humanoid of level 2 or less. It regards you as a trusted friend.' },
  'Diagnostic Scan':    { level:'1', range:'Near',  duration:'Focus',     damage:'', desc:'Sense powered tech and active powers within near range. Focus 2 rounds to discern general properties.' },
  'Mag-Seal':           { level:'1', range:'Near',  duration:'10 rounds', damage:'', desc:'Magnetically seal a portal closed for the duration.' },
  'Micro-Missile':      { level:'1', range:'Far',   duration:'Instant',   damage:'1d4', desc:'Advantage on cast check. A guided micro-missile deals 1d4 damage to one target.' },
  'Sedation Field':     { level:'1', range:'Near',  duration:'Instant',   damage:'', desc:'Creatures level 2 or less in a near cube fall unconscious. Woken by damage or shaking.' },
  'Nano-Weave':         { level:'1', range:'Self',  duration:'10 rounds', damage:'', desc:'Your AC becomes 14 (18 on critical success) for duration.' },
  // Shared (Priest + Wizard) — one entry, both lists reference it
  'Floodlight':         { level:'1', range:'Close', duration:'1 hour',    damage:'', desc:'One object glows bright, illuminating near distance for 1 hour.' },
  'Deflector Field':    { level:'1', range:'Close', duration:'Focus',     damage:'', desc:'Chaotic creatures have disadvantage on attacks vs the warded target.' },
};

const RC_PRIEST_SPELLS_T1 = ['Mend','Psi-Edge','Floodlight','Deflector Field','Force of Will'];
const RC_WIZARD_SPELLS_T1 = ['Proximity Sensor','Flame Projector','Neural Override','Diagnostic Scan','Mag-Seal','Floodlight','Micro-Missile','Deflector Field','Sedation Field'];

// ── Power sources ──────────────────────────────────────────────────────────
// DarkSpace has two power lists: Engineer (tech) and Mystic (psychic).
const SPELL_SOURCES = ['Engineer','Mystic','Homebrew'];
const RC_T1_BY_SOURCE = {
  Engineer: RC_WIZARD_SPELLS_T1,
  Mystic:   RC_PRIEST_SPELLS_T1,
};

// Which lists are ticked by default for an archetype.
function defaultSpellSources(cls) {
  const src = { Engineer:false, Mystic:false, Homebrew:false };
  if(cls==='Engineer')    src.Engineer = true;
  else if(cls==='Mystic') src.Mystic = true;
  const ci = RC_CLASS_INFO[cls];
  if(ci && ci._caster && Object.prototype.hasOwnProperty.call(src, ci._caster.list)) src[ci._caster.list] = true;
  return src;
}

// Does a power belong to any ticked source?
function spellInSources(s, src) {
  if(!src) return false;
  if(s.caster==='Both')     return !!(src.Engineer || src.Mystic);
  if(s.caster==='Engineer') return !!src.Engineer;
  if(s.caster==='Mystic')   return !!src.Mystic;
  if(s.caster==='Homebrew') return !!src.Homebrew;
  return false;
}

// Checkbox bar. `cls` drives which box is the "own" list (shown but locked on,
// so a caster can't accidentally cut themselves off from their own powers).
function spellSourceBar(src, cls, onToggle) {
  const own = { Engineer:'Engineer', Mystic:'Mystic' }[cls] || '';
  let h = '<div class="spell-src-bar">';
  SPELL_SOURCES.forEach(name=>{
    const isOwn = (name===own);
    const on = !!src[name];
    const dis = isOwn ? ' disabled' : '';
    const col = isOwn ? '#c8a020' : (on ? '#eee' : '#777');
    h += '<label class="spell-src-opt" title="'+name+'" style="cursor:'+(isOwn?'default':'pointer')+';color:'+col+';">'
       + '<input type="checkbox"'+(on?' checked':'')+dis
       + ' onchange="'+onToggle+'(\''+name+'\', this.checked)" style="cursor:'+(isOwn?'default':'pointer')+';">'
       + name
       + '</label>';
  });
  h += '</div>';
  return h;
}

// Allegiances (Shadowdark deities), reskinned to sci-fi orders/creeds.
const RC_DEITIES = {
  Lawful:  ['The Ascendancy','The Concord','The Machine Choir','The Vanguard'],
  Neutral: ['The Vanguard','The Freeholds'],
  Chaotic: ['The Void Cult','The Reavers','The Freeholds'],
};

function _rc_3d6() { return [0,0,0].reduce(s=>s+Math.ceil(Math.random()*6),0); }
function _rc_mod(v) {
  if(v<=3)return -4;if(v<=5)return -3;if(v<=7)return -2;if(v<=9)return -1;
  if(v<=11)return 0;if(v<=13)return 1;if(v<=15)return 2;if(v<=17)return 3;return 4;
}
function _rc_roll(pool) { return pool[Math.floor(Math.random()*pool.length)]; }
function _rc_weighted(table) {
  const total = table.reduce((s,e)=>s+e.w,0);
  let r = Math.floor(Math.random()*total);
  for(const e of table){ r-=e.w; if(r<0) return e.v; }
  return table[table.length-1].v;
}
