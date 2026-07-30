// SD character sheet — random-character / rules data (RC_CLASSES,
// RC_CLASS_INFO, RC_TITLES, RC_ANCESTRY, RC_BACKGROUNDS, RC_SPELL_DATA,
// RC_OPTIONAL_*, ...). Split out of sd_character_sheet.html (~60KB of static
// data) so the browser caches it. Loaded at the same point in the page;
// declaration order unchanged. NOTE: the homebrew sync mutates some of these
// (RC_CLASSES, RC_ANCESTRY) in place at runtime — that still works, the
// const binding lives in the shared script scope either way.
// scripts/extract-game-data.mjs reads the RC_* names from THIS file.
// ── Random Character Generator ─────────────────────────────────────────────
const RC_ANCESTRY = {
  table: [
    {w:4,v:'Human'},{w:2,v:'Elf'},{w:2,v:'Dwarf'},
    {w:2,v:'Halfling'},{w:1,v:'Half-Orc'},{w:1,v:'Goblin'},
    {w:1,v:'Kobold'}
  ],
  ability: {
    Human:    'Ambitious: +1 bonus talent roll at 1st level.',
    Elf:      'Farsight: +1 to ranged attack rolls OR +1 to spellcasting checks.',
    Dwarf:    'Stout: Start with +2 HP. Roll hit points with advantage.',
    Halfling: 'Stealthy: Once per day, become invisible for 3 rounds.',
    'Half-Orc': 'Mighty: +1 to attack and damage with melee weapons.',
    Goblin:   'Keen Senses: You cannot be surprised.',
    Kobold:   'Knack: +1 to spellcasting checks OR begin each session with a luck token.',
  },
  languages: {
    Human:    'Common + 1 additional common language',
    Elf:      'Common, Elvish, Sylvan',
    Dwarf:    'Common, Dwarvish',
    Halfling: 'Common',
    'Half-Orc': 'Common, Orcish',
    Goblin:   'Common, Goblin',
    Kobold:   'Common, Draconic',
  }
};

const RC_CLASSES = ['Fighter','Priest','Thief','Wizard','Bard','Ranger','Witch','Pit Fighter',"Knight of St. Ydris","Warlock","Desert Rider","Ras-Godai","Sea Wolf","Seer","Basilisk Warrior","Delver","Wyrdling","Duelist","Roustabout","Necromancer"];
// Display order for the 2-column Character Creation Wizard grid (row-major), so
// the left column reads Fighter / Thief / Ranger / Pit Fighter and the right
// column reads Priest / Wizard / Bard / Witch.
const CCW_CLASS_ORDER = ['Fighter','Priest','Thief','Wizard','Ranger','Bard','Pit Fighter','Witch',"Knight of St. Ydris","Warlock","Desert Rider","Ras-Godai","Sea Wolf","Seer","Basilisk Warrior","Delver","Wyrdling","Duelist","Roustabout","Necromancer"];
// Official-but-optional content (not part of the Shadowdark core rules). Used by
// the reference pages and creation to let players include/exclude these.
const RC_OPTIONAL_CLASSES = [
  'Pit Fighter','Witch',
  "Knight of St. Ydris","Warlock","Desert Rider","Ras-Godai","Sea Wolf","Seer","Basilisk Warrior","Delver","Wyrdling","Duelist","Roustabout","Necromancer"
];
const RC_OPTIONAL_ANCESTRIES = [
  'Kobold'
];
const RC_OPTIONAL_BACKGROUNDS = [
  "Hermit","Outcast","Woodborn","Amnesiac","Haunted","Fugitive","Feytouched","Witchborn","Forager","Redeemer","Marked","Sacrifice","Marooned","Fallen","Drawn","Ascetic","Wolfchild","Healer","Chosen","Demonborn","Freed","Displaced","Criminal","Drifter","Crop Farmer","Livestock Farmer","Hunter","Fisher","Enforcer","Trader","Crafter","Bowyer","Seer's Apprentice","Shipwright","Blacksmith","Far Traveler","Skald","Heroborn","Nobleborn","God's Blood"
];
// ── Ranger herbal remedies (Shadowdark, Ranger) ────────────────────────────
// One table drives the class feature text, the Talents box and the creation
// wizard's remedy picker, so the wording can't drift between them.
const SD_REMEDIES = [
  { name:'Salve',       dc:11, effect:'Heals 1 HP.' },
  { name:'Stimulant',   dc:12, effect:"You can't be surprised for 10 rounds." },
  { name:'Foebane',     dc:13, effect:'ADV on attacks and damage against one creature type you choose for 1d6 rounds.' },
  { name:'Restorative', dc:14, effect:'Ends one poison or disease.' },
  { name:'Curative',    dc:15, effect:'Equivalent to a Potion of Healing.' },
];
const remedyLine = r => r.name + ' (DC ' + r.dc + '): ' + r.effect;

const RC_CLASS_INFO = {
  Fighter: { hd:'1d8', weapons:'All weapons', armor:'All armor and shields',
    talent:['Gain Weapon Mastery with one additional weapon type','+1 to melee and ranged attacks','+1 to melee and ranged attacks','+1 to melee and ranged attacks','+1 to melee and ranged attacks','+2 to Strength, Dexterity, or Constitution stat','+2 to Strength, Dexterity, or Constitution stat','+2 to Strength, Dexterity, or Constitution stat','+2 to Strength, Dexterity, or Constitution stat','Choose one armor type, get +1 AC from it','Choose one armor type, get +1 AC from it','Choose a talent or +2 stat points'],
    features:['Hauler: Add CON modifier (if positive) to gear slots.','Weapon Mastery: Choose a weapon type; +1 to attack and damage. Add half your level to these rolls.','Grit: Choose STR or DEX; advantage on checks to overcome opposing force.'] },
  Priest: { hd:'1d6', weapons:'Club, crossbow, dagger, mace, longsword, staff, warhammer', armor:'All armor and shields',
    talent:['Gain advantage on casting one spell you know','+1 to melee or ranged attacks','+1 to melee or ranged attacks','+1 to melee or ranged attacks','+1 to melee or ranged attacks','+1 to priest spellcasting checks','+1 to priest spellcasting checks','+1 to priest spellcasting checks','+1 to priest spellcasting checks','+2 to Strength or Wisdom stat','+2 to Strength or Wisdom stat','Choose a talent or +2 stat points'],
    features:['Turn Undead (bonus spell, does not count toward spell limit).','Spellcasting (WIS). Know 2 tier 1 spells. Add spells per level.','Languages: Celestial, Diabolic, or Primordial.','Choose a Deity matching your alignment.'] },
  Thief: { hd:'1d4', weapons:'Club, crossbow, dagger, shortbow, shortsword', armor:'Leather armor, mithral chainmail',
    talent:['1/day, all attacks that would hit you this round miss instead',
            'Backstab deals +1 dice of damage','Backstab deals +1 dice of damage','Backstab deals +1 dice of damage','+2 to Strength, Dexterity, or Charisma stat','+2 to Strength, Dexterity, or Charisma stat','+2 to Strength, Dexterity, or Charisma stat','+2 to Strength, Dexterity, or Charisma stat','+2 to Strength, Dexterity, or Charisma stat','+1 to melee and ranged attacks','+1 to melee and ranged attacks','Choose a talent or +2 stat points'],
    features:['Backstab: Hit unaware target → extra weapon die damage + half level dice.','Thievery: Advantage on climbing, sneaking, disguises, traps, locks, pickpocketing.'] },
  Wizard: { hd:'1d4', weapons:'Dagger, staff', armor:'None',
    talent:['Make 1 random magic item (your choice of type)','+2 to Intelligence stat or +1 to spellcasting checks','+2 to Intelligence stat or +1 to spellcasting checks','+2 to Intelligence stat or +1 to spellcasting checks','+2 to Intelligence stat or +1 to spellcasting checks','+2 to Intelligence stat or +1 to spellcasting checks','Advantage on casting one spell you know','Advantage on casting one spell you know','Advantage on casting one spell you know','Learn one additional wizard spell of any tier you know','Learn one additional wizard spell of any tier you know','Choose a talent or +2 stat points'],
    features:['Spellcasting (INT). Know 3 tier 1 spells. Add spells per level.','Learning Spells: Study scroll 1 day, DC 15 INT check to learn permanently.','Languages: 2 additional common + 2 rare languages.'] },
  Bard: { hd:'1d6', weapons:'Crossbow, dagger, mace, shortbow, shortsword, spear, staff', armor:'Leather armor, chainmail, shields',
    // 12 slots; text is read from indices 0,1,6,9,11 (one per band).
    talent:['You find a random wand (you choose)',
            '+1 to melee/ranged attacks or +1 to Magical Dabbler rolls','+1 to melee/ranged attacks or +1 to Magical Dabbler rolls','+1 to melee/ranged attacks or +1 to Magical Dabbler rolls','+1 to melee/ranged attacks or +1 to Magical Dabbler rolls','+1 to melee/ranged attacks or +1 to Magical Dabbler rolls',
            '+2 points to any stats','+2 points to any stats','+2 points to any stats',
            'Presence effects become DC 9 to enact','Presence effects become DC 9 to enact',
            'Choose a talent'],
    features:['Bardic Arts: Advantage on oration, performing arts, lore, and diplomacy.','Magical Dabbler: Activate scrolls/wands using CHA. Critical fail = wizard mishap.','Presence (DC 12 CHA): Inspire (give luck token) or Fascinate (transfix targets ≤ lvl 4).','Prolific: +1d6 to learning rolls. Groups with bards +1d6 to carousing.','Languages: 4 additional common + 1 rare language.'] },
  Ranger: { hd:'1d8', weapons:'Dagger, longbow, longsword, shortbow, shortsword, spear, staff', armor:'Leather armor, chainmail',
    talent:['You deal d12 damage with one weapon type you choose','+1 to melee or ranged attacks and damage','+1 to melee or ranged attacks and damage','+1 to melee or ranged attacks and damage','+1 to melee or ranged attacks and damage','+2 to Strength, Dexterity, or Intelligence stat','+2 to Strength, Dexterity, or Intelligence stat','+2 to Strength, Dexterity, or Intelligence stat','+2 to Strength, Dexterity, or Intelligence stat','ADV on Herbalism checks for a remedy you choose','ADV on Herbalism checks for a remedy you choose','Choose a talent or +2 stat points'],
    features:['Wayfinder: Advantage on Navigation, Tracking, Bushcraft, Stealth, Wild animal checks.','Herbalism (INT check): Prepare a herbal remedy. Remedies expire in 3 rounds.', ...SD_REMEDIES.map(r => '  ' + remedyLine(r))] },
  Witch: { hd:'1d4', weapons:'Dagger, staff', armor:'Leather armor',
    // 12 slots; text is read from indices 0,1,6,9,11 (one per band).
    // Witch bands are 2 / 3-7 / 8-9 / 10-11 / 12 — see talentBands below.
    talent:["1/day, teleport to your familiar's location as a move",
            '+2 to Charisma stat or +1 to witch spellcasting checks','+2 to Charisma stat or +1 to witch spellcasting checks','+2 to Charisma stat or +1 to witch spellcasting checks','+2 to Charisma stat or +1 to witch spellcasting checks','+2 to Charisma stat or +1 to witch spellcasting checks',
            'Gain advantage on casting one spell you know','Gain advantage on casting one spell you know','Gain advantage on casting one spell you know',
            'Learn an additional witch spell of any tier you can cast','Learn an additional witch spell of any tier you can cast',
            'Choose a talent or +2 points to distribute to stats'],
    talentBands:[[2,2],[3,7],[8,9],[10,11],[12,12]],
    features:["Familiar: A small animal (raven, rat, frog) serves you loyally and speaks Common. It can be the source of your spells — treat it as you for spell ranges. If it dies, restore it by permanently sacrificing 1d4 HP.",'Spellcasting (CHA). Know 3 tier 1 witch spells. DC is 10 + spell tier. Add spells per level.','Languages: Diabolic, Primordial, Sylvan.'] },
  'Pit Fighter': { hd:'1d8', weapons:'All weapons', armor:'Leather armor, shields',
    // 12 slots; text is read from indices 0,1,6,9,11 (one per band).
    talent:['1/day, ignore all damage and effects from one attack',
            'You gain +1 to melee weapon damage','You gain +1 to melee weapon damage','You gain +1 to melee weapon damage','You gain +1 to melee weapon damage','You gain +1 to melee weapon damage',
            '+2 to Strength or Constitution stat, or +1 to melee attacks','+2 to Strength or Constitution stat, or +1 to melee attacks','+2 to Strength or Constitution stat, or +1 to melee attacks',
            'Increase the HP you gain from Flourish by 1d6','Increase the HP you gain from Flourish by 1d6',
            'Choose a talent or +2 points to distribute to stats'],
    features:['Flourish: 3/day, regain 1d6 HP when you hit an enemy with a melee attack.','Implacable: Advantage on Constitution checks to resist injury, poison, or endure extreme environments.','Last Stand: You get up from dying with 1 HP on a natural d20 roll of 18-20.','Relentless: 3/day, when reduced to 0 HP, make a DC 18 Constitution check (Implacable applies). On a success, you go to 1 HP instead.'] },
  "Knight of St. Ydris": { hd:"1d6", weapons:"All melee weapons, crossbow", armor:"All armor and shields",    talent:["Your Demonic Possession bonus increases by 1 point","+1 to melee or ranged attacks","+1 to melee or ranged attacks","+1 to melee or ranged attacks","+1 to melee or ranged attacks","+1 to melee or ranged attacks","+2 to Strength, Dexterity, or Constitution stat","+2 to Strength, Dexterity, or Constitution stat","+2 to Strength, Dexterity, or Constitution stat","+2 to Charisma stat or +1 to witch spellcasting checks","+2 to Charisma stat or +1 to witch spellcasting checks","Choose a talent or +2 points to distribute to stats"],    features:["Demonic Possession: 3/day, gain a +1 bonus to your damage rolls that lasts 3 rounds. In addition, add half your level to the damage bonus (round down).","Spellcasting (CHA): Cast witch spells you know. Beginning at level 3, learn new witch spells per the Witch Spells Known table. DC is 10 + the spell's tier.","Languages: Diabolic."], _caster:{ stat:"cha", list:"Witch", known:0 } },
  "Warlock": { hd:"1d6", weapons:"Club, crossbow, dagger, mace, longsword", armor:"Leather armor, chainmail, and shields",    talent:["Roll a Patron Boon from any patron; an unexplained gift","Add +1 point to two stats (they must be different)","Add +1 point to two stats (they must be different)","Add +1 point to two stats (they must be different)","Add +1 point to two stats (they must be different)","Add +1 point to two stats (they must be different)","+1 to melee or ranged attacks","+1 to melee or ranged attacks","+1 to melee or ranged attacks","Roll two Patron Boons and choose one to keep","Roll two Patron Boons and choose one to keep","Choose a talent or +2 points to distribute to stats"],    features:["Patron: Choose a patron to serve (Mugdulblub, Titania, or The Willowman) — the source of your supernatural gifts. Your patron may grant or withhold its gifts at any time.","Patron Boon: At 1st level, gain a random Patron Boon talent from your patron's table. Whenever you gain a new talent roll, you may roll on your Patron Boon table instead of the Warlock Talents table.","Languages: Choose one — Celestial, Diabolic, Draconic, Primordial, or Sylvan."] },
  "Desert Rider": { hd:"1d8", weapons:"Club, dagger, javelin, longsword, pike, shortbow, scimitar, spear, whip", armor:"Leather armor, shields",    talent:["You can use any rider-bearing creature as your mount","You gain +1 to attacks or damage","You gain +1 to attacks or damage","You gain +1 to attacks or damage","You gain +1 to attacks or damage","You gain +1 to attacks or damage","+2 to Strength or Dexterity stat, or +1 to melee attacks","+2 to Strength or Dexterity stat, or +1 to melee attacks","+2 to Strength or Dexterity stat, or +1 to melee attacks","Gain an additional use of your Charge talent each day","Gain an additional use of your Charge talent each day","Choose a talent or +2 points to distribute to stats"],    features:["Charge: 3/day, charge into combat by moving at least near before attacking; your melee attacks deal double damage that round.","Mount: You have a common camel or horse with a reliable or lovely demeanor. It comes when you call and never spooks. While riding, you and your mount gain a bonus to AC equal to half your level (round down); your mount has additional levels equal to half your level. You may leap on or off once per round."] },
  "Ras-Godai": { hd:"1d6", weapons:"Blowgun, bolas, dagger, razor chain, scimitar, shuriken, spear", armor:"Leather armor",    talent:["You are trained in the use of poisons","Roll an additional talent on the Black Lotus Talents table","Roll an additional talent on the Black Lotus Talents table","Roll an additional talent on the Black Lotus Talents table","Roll an additional talent on the Black Lotus Talents table","Roll an additional talent on the Black Lotus Talents table","+2 to Strength or Dexterity stat, or +1 to melee attacks","+2 to Strength or Dexterity stat, or +1 to melee attacks","+2 to Strength or Dexterity stat, or +1 to melee attacks","Gain an additional use of your Smoke Step talent","Gain an additional use of your Smoke Step talent","Choose a talent or +2 points to distribute to stats"],    features:["Assassin: Advantage on checks to sneak and hide. Your attacks deal double damage against targets that are unaware of your presence.","Smoke Step: 3/day, teleport to a location you can see within near. This does not use your action.","Black Lotus: Roll one talent on the Black Lotus Talents table (d12)."] },
  "Sea Wolf": { hd:"1d8", weapons:"Dagger, greataxe, handaxe, longbow, longsword, spear", armor:"Leather armor, chainmail, shields",    talent:["1/day, go berserk: immune to damage for 3 rounds","Your attacks deal +1 damage","Your attacks deal +1 damage","Your attacks deal +1 damage","Your attacks deal +1 damage","Your attacks deal +1 damage","+2 to Strength or Constitution stat, or +1 to attacks","+2 to Strength or Constitution stat, or +1 to attacks","+2 to Strength or Constitution stat, or +1 to attacks","Duality; choose two different Old Gods effects each day","Duality; choose two different Old Gods effects each day","Choose a talent or +2 points to distribute to stats"],    features:["Seafarer: Advantage on checks related to navigating and crewing boats.","Old Gods: After each rest, choose one — Odin (regain 1d4 HP each time you kill an enemy); Freya (once a day, gain a luck token if you have none; each luck token adds 1d6 to your roll); Loki (advantage on checks to lie, sneak, and hide).","Shield Wall: If you wield a shield, use your action to take a defensive stance; your AC becomes 20 until your next turn."] },
  "Seer": { hd:"1d6", weapons:"Dagger, stave, spear", armor:"Leather armor",    talent:["Learn an additional seer spell from any tier you can cast","Gain an additional use of your Omen talent each day","Gain an additional use of your Omen talent each day","Gain an additional use of your Omen talent each day","Gain an additional use of your Omen talent each day","Gain an additional use of your Omen talent each day","+2 to WIS or CHA stat, or +1 to spellcasting checks","+2 to WIS or CHA stat, or +1 to spellcasting checks","+2 to WIS or CHA stat, or +1 to spellcasting checks","Increase the die category of your Destined talent by one","Increase the die category of your Destined talent by one","Choose a talent or +2 points to distribute to stats"],    features:["Destined: Whenever you use a luck token, add 1d6 to the roll.","Omen: 3/day, make a DC 9 WIS check. On a success, gain a luck token (you can't have more than one at a time).","Spellcasting (WIS): Cast seer spells you know. Know one tier 1 seer spell to start; learn more per the Seer Spells Known table. DC is 10 + the spell's tier. On a natural 1, you can't cast that spell again until you complete Seer Penance."], _caster:{ stat:"wis", list:"Seer", known:1 } },
  "Basilisk Warrior": { hd:"1d8", weapons:"Boomerang, club, dagger, spear, spear-thrower", armor:"None",    talent:["You find a basilisk egg; a loyal hatchling emerges in 1d4 days","+1 to weapon attacks and damage","+1 to weapon attacks and damage","+1 to weapon attacks and damage","+1 to weapon attacks and damage","+1 to weapon attacks and damage","+2 to Strength, Dexterity, or Constitution stat","+2 to Strength, Dexterity, or Constitution stat","+2 to Strength, Dexterity, or Constitution stat","+1 use per day of Petrifying Gaze","+1 use per day of Petrifying Gaze","Choose a talent or +2 points to distribute to stats"],    features:["Basilisk Blood: Advantage on Constitution checks to avoid harmful maladies, poisons, or afflictions.","Petrifying Gaze: One creature of your level or less that meets your gaze must pass a DC 15 CON check or be petrified for 1d4 rounds (it still takes damage while petrified). Usable per day equal to your CON modifier (minimum 1).","Stone Skin: Add 3 + half your level (round down) to your AC while unarmored. Advantage on checks to hide in natural environments."] },
  "Delver": { hd:"1d6", weapons:"Club, crossbow, dagger, javelin, mace, shortbow, shortsword, spear, staff", armor:"Leather armor, chainmail, shields",    talent:["You gain 2 gear slots and an additional Trusty Gear","+1 to melee or ranged attacks and damage","+1 to melee or ranged attacks and damage","+1 to melee or ranged attacks and damage","+1 to melee or ranged attacks and damage","+1 to melee or ranged attacks and damage","+2 to Strength, Dexterity, or Constitution stat","+2 to Strength, Dexterity, or Constitution stat","+2 to Strength, Dexterity, or Constitution stat","Add one more point to your Scavenger success range","Add one more point to your Scavenger success range","Choose a talent or +2 points to distribute to stats"],    features:["Languages: You know two additional common languages.","Scavenger: When you expend the last of a consumable item carried since your last rest, roll a d6. On a 5 or 6, you regain one use of that item.","Trailblazer: Advantage on Climbing, Swimming, Foraging, understanding unknown languages, and avoiding or escaping natural terrain hazards.","Trusty Gear: Choose one type of gear or weapon you can wield. Gain 2 + half your level (round down) on checks or attack rolls made with that type."] },
  "Wyrdling": { hd:"1d6", weapons:"Club, crossbow, dagger, pseudopod, shortbow, shortsword, spear", armor:"Leather armor, chainmail, shields",    talent:["Gain two new Corruption talents","+2 to Strength, Dexterity, or Charisma stats","+2 to Strength, Dexterity, or Charisma stats","+2 to Strength, Dexterity, or Charisma stats","+2 to Strength, Dexterity, or Charisma stats","+2 to Strength, Dexterity, or Charisma stats","Gain a new Corruption talent","Gain a new Corruption talent","Gain a new Corruption talent","Gain +1 to attacks and damage rolls with your pseudopod","Gain +1 to attacks and damage rolls with your pseudopod","Choose a talent or +2 points to distribute to stats"],    features:["Languages: You know Primordial.","Corruption: Roll one talent on the Corruption table (d10).","Hideous Biology: You can stretch your body to fit through inch-wide cracks. It takes 3 rounds to pass through an obstacle this way.","Pseudopod: Sprout a clawed pseudopod — melee, near range, 1d6 damage, Finesse (use STR or DEX)."] },
  "Duelist": { hd:"1d8", weapons:"Dagger, all swords", armor:"Leather armor, mithral chainmail",    talent:["1/day, all attacks that would hit you this round miss instead","+1 to melee attacks and damage or +1 Parry per day","+1 to melee attacks and damage or +1 Parry per day","+1 to melee attacks and damage or +1 Parry per day","+1 to melee attacks and damage or +1 Parry per day","+1 to melee attacks and damage or +1 Parry per day","+2 to Strength, Dexterity, or Charisma stat","+2 to Strength, Dexterity, or Charisma stat","+2 to Strength, Dexterity, or Charisma stat","Deal +1d6 damage when you hit with a Taunt attack","Deal +1d6 damage when you hit with a Taunt attack","Choose a talent or +2 points to distribute to stats"],    features:["Parry: 1/day, an attack of your choice that would hit you misses instead.","Tale Spinner: Make a DC 15 CHA check; on a pass, strangers believe you are famous and important for the rest of your interaction. The same individual can't be fooled twice.","Taunt: When an enemy misses you with an attack, you have advantage on attacks against that enemy next round."] },
  "Roustabout": { hd:"1d4", weapons:"Club, dagger, hammer, staff", armor:"Leather armor",    talent:["+1 to any stat and roll another talent","Gain the ability to wield a new weapon or armor","Gain the ability to wield a new weapon or armor","Gain the ability to wield a new weapon or armor","Gain the ability to wield a new weapon or armor","Gain the ability to wield a new weapon or armor","+1 to any two stats (they can't be the same)","+1 to any two stats (they can't be the same)","+1 to any two stats (they can't be the same)","Roll an extra hit points die this level","Roll an extra hit points die this level","Learn any spell of a tier equal to half your level rounded down (min 1). Cast it using that class's spellcasting stat"],    features:["Knowaguy: Advantage on checks related to interacting with commoners and sourcing favors.","Lucksmith: Whenever another player uses your luck token, they have advantage on the new roll.","Surprising Guts: When reduced to half your HP or lower, make a DC 12 Wisdom check. On a success, you have advantage on your next roll."] },
  "Necromancer": { hd:"1d6", weapons:"Crossbow, dagger, longsword, scimitar, staff, stave", armor:"Leather armor, chainmail",    talentBands:[[2,2],[3,7],[8,9],[10,11],[12,12]],    talent:["The next time you die, you may return to life with full HP","+1 to your spellcasting checks or +1 to melee attacks","+1 to your spellcasting checks or +1 to melee attacks","+1 to your spellcasting checks or +1 to melee attacks","+1 to your spellcasting checks or +1 to melee attacks","+1 to your spellcasting checks or +1 to melee attacks","+2 to Strength, Constitution, or Charisma stat","+2 to Strength, Constitution, or Charisma stat","+2 to Strength, Constitution, or Charisma stat","Gain advantage on casting one spell you know","Gain advantage on casting one spell you know","Choose a talent or +2 points to distribute to stats"],    features:["Death Sense: Sense the location and general nature of undead and dying creatures within near.","River of Death: You do not die at 0 CON, and you roll a d6 for your death timer instead of a d4.","Spellcasting (CHA): Cast necromancer spells you know. Know two tier 1 necromancer spells to start; learn more per the Necromancer Spells Known table. DC is 10 + the spell's tier."], _caster:{ stat:"cha", list:"Necromancer", known:2 } }
};

const RC_TITLES = {
  Fighter: { Lawful:['Squire','Cavalier','Knight','Thane','Lord/Lady'], Chaotic:['Knave','Bandit','Slayer','Reaver','Warlord'], Neutral:['Warrior','Barbarian','Battlerager','Warchief','Chieftain'] },
  Priest:  { Lawful:['Acolyte','Crusader','Templar','Champion','Paladin'], Chaotic:['Initiate','Zealot','Cultist','Scourge','Chaos Knight'], Neutral:['Seeker','Invoker','Haruspex','Mystic','Oracle'] },
  Thief:   { Lawful:['Footpad','Burglar','Rook','Underboss','Boss'], Chaotic:['Thug','Cutthroat','Shadow','Assassin','Wraith'], Neutral:['Robber','Outlaw','Rogue','Renegade','Bandit King/Queen'] },
  Wizard:  { Lawful:['Apprentice','Conjurer','Arcanist','Mage','Archmage'], Chaotic:['Adept','Channeler','Witch/Warlock','Diabolist','Sorcerer'], Neutral:['Shaman','Seer','Warden','Sage','Druid'] },
  Bard:    { Lawful:['Storyteller','Balladeer','Philosopher','Poet','Master Poet'], Chaotic:['Guttersnipe','Charlatan','Satirist','Silvertongue','Doomspeaker'], Neutral:['Seeker','Witness','Speaker','Voice','Truthbearer'] },
  Ranger:  { Lawful:['Wanderer','Strider','Warden','Guardian','Sentinel'], Chaotic:['Hood','Outlaw','Fugitive','Exile','Pariah'], Neutral:['Stranger','Wayfarer','Outlander','Recluse','Hermit'] },
  Witch:   { Lawful:['Fortune Teller','Far Seer','Prophet','Wise One','Baba'], Chaotic:['Whisperer','Hexer','Hag/Elder','Crone/Uncle','Baba'], Neutral:['Shaman','Conjurer','Soothsayer','Conduit','Baba'] },
  'Pit Fighter': { Lawful:['Rookie','Gladiator','Hero','Champion','Legend'], Chaotic:['Ruffian','Brawler','Heel','Villain','Legend'], Neutral:['Underdog','Dark Horse','Wild Card','Victor','Legend'] },
  "Knight of St. Ydris": { Lawful:["Arbiter","Enforcer","Knight Marshal","Judge","Justiciar"], Chaotic:["Traitor","Fallen","Oathbreaker","Blackguard","Demonlord"], Neutral:["Brother/Sister","Exorcist","Reverend Knight","Inquisitor","Grand Inquisitor"] },
  "Warlock": { Lawful:["Favored","Herald","Eminent","Exalted","Incarnation"], Chaotic:["Marked","Zealot","Occultist","Champion","Harbinger"], Neutral:["Chosen","Channeler","Prophesied","Transcendent","Avatar"] },
  "Desert Rider": { Lawful:["Outrider","Sandrunner","Trailblazer","Swift Wind","Stormrunner"], Chaotic:["Bandit","Robber","Raider","Scourge","Bandit King/Queen"], Neutral:["Rat","Fox","Wolf","Tiger","Dragon"] },
  "Ras-Godai": { Lawful:["Acolyte","Mirror Path","Monk","Master","White Lotus"], Chaotic:["Acolyte","Shadow Path","Monk","Assassin","Black Lotus"], Neutral:["Acolyte","Fire Path","Monk","Demon Blade","Red Lotus"] },
  "Sea Wolf": { Lawful:["Freefolk","Shieldman/maiden","Thane","Jarl","King/Queen"], Chaotic:["Rabble","Raider","Reaver","Conqueror","Usurper"], Neutral:["Wanderer","Explorer","Adventurer","Renowned","Legendary"] },
  "Seer": { Lawful:["Guide","Chanter","Rune Reader","Wise One","Seer of Odin"], Chaotic:["Hedge Witch","Whisperer","Bone Reader","Dreaded One","Seer of Loki"], Neutral:["Fortune Teller","Singer","Star Reader","Blessed One","Seer of Freya"] },
  "Basilisk Warrior": { Lawful:["Stone Warrior","Strong Stone","Protector","Sun Serpent","Amber Basilisk"], Chaotic:["Stone Warrior","Sharp Stone","Slayer","Moon Serpent","Obsidian Basilisk"], Neutral:["Stone Warrior","Silent Stone","Watcher","Sky Serpent","Sapphire Basilisk"] },
  "Delver": { Lawful:["Explorer","Researcher","Antiquarian","Archaeologist","Professor"], Chaotic:["Intruder","Opportunist","Larcenist","Tomb Robber","Defiler"], Neutral:["Investigator","Observer","Pathfinder","Trailblazer","Pioneer"] },
  "Wyrdling": { Lawful:["Chosen One","Cursed","Haunted","Tortured","Crazed One"], Chaotic:["Chosen One","Blessed","Consecrated","Revered","Exalted One"], Neutral:["Chosen One","Seeker","Listener","Watcher","Learned One"] },
  "Duelist": { Lawful:["Fencer","Defender","Mongoose","Wolf","Swordmaster"], Chaotic:["Ruffian","Heckler","Viper","Cobra","Swordmaster"], Neutral:["Student","Challenger","Mouser","Panther","Swordmaster"] }
};

const RC_BACKGROUNDS = [
  'Urchin','Wanted','Cult Initiate','Thieves\' Guild','Banished','Orphaned',
  'Wizard\'s Apprentice','Jeweler','Herbalist','Barbarian','Mercenary','Sailor',
  'Acolyte','Soldier','Ranger','Scout','Minstrel','Scholar','Noble','Chirurgeon',
  "Hermit","Outcast","Woodborn","Amnesiac","Haunted","Fugitive","Feytouched","Witchborn","Forager","Redeemer","Marked","Sacrifice","Marooned","Fallen","Drawn","Ascetic","Wolfchild","Healer","Chosen","Demonborn","Freed","Displaced","Criminal","Drifter","Crop Farmer","Livestock Farmer","Hunter","Fisher","Enforcer","Trader","Crafter","Bowyer","Seer's Apprentice","Shipwright","Blacksmith","Far Traveler","Skald","Heroborn","Nobleborn","God's Blood"
];

const RC_NAMES = {
  Human:    ['Zali','Bram','Clara','Nattias','Rina','Denton','Mirena','Aran','Morgan','Giralt','Tamra','Oscar','Ishana','Rogar','Jasmin','Tarin','Yuri','Malchor','Lienna','Godfrey'],
  Elf:      ['Eliara','Ryarn','Sariel','Tirolas','Galira','Varos','Daeniel','Axidor','Hiralia','Cyrwin','Lothiel','Zaphiel','Nayra','Ithior','Amriel','Elyon','Jirwyn','Natinel','Fiora','Ruhiel'],
  Dwarf:    ['Hilde','Torbin','Marga','Bruno','Karina','Naugrim','Brenna','Darvin','Elga','Alric','Isolde','Gendry','Bruga','Junnor','Vidrid','Torson','Brielle','Ulfgar','Sarna','Grimm'],
  Halfling: ['Willow','Benny','Annie','Tucker','Marie','Hobb','Cora','Gordie','Rose','Ardo','Alma','Norbert','Jennie','Barvin','Tilly','Pike','Lydia','Marlow','Astrid','Jasper'],
  'Half-Orc':['Vara','Gralk','Ranna','Korv','Zasha','Hrogar','Klara','Tragan','Brolga','Drago','Yelena','Krull','Ulara','Tulk','Shiraal','Wulf','Ivara','Hirok','Aja','Zoraan'],
  Goblin:   ['Iggs','Tark','Nix','Lenk','Roke','Fitz','Tila','Riggs','Prim','Zeb','Finn','Borg','Yark','Deeg','Nibs','Brak','Fink','Rizzo','Squib','Grix'],
};

const RC_SPELL_DATA = {
  // Priest Tier 1
  'Cure Wounds':         { level:'1', range:'Close', duration:'Instant',   damage:'', heal:'scaling', desc:'Restore 1 + half your level (round down) d6 HP with touch.' },
  'Holy Weapon':         { level:'1', range:'Close', duration:'5 rounds',  damage:'', desc:'One touched weapon deals +1d6 damage (1d8 vs undead).' },
  'Light':               { level:'1', range:'Close', duration:'1 hour',    damage:'', desc:'One object glows bright, illuminating near distance for 1 hour.' },
  'Protection From Evil':{ level:'1', range:'Close', duration:'Focus',     damage:'', desc:'Chaotic creatures have disadvantage on attacks vs target.' },
  'Shield of Faith':     { level:'1', range:'Self',  duration:'5 rounds',  damage:'', desc:'Gain +2 bonus to AC for duration.' },
  'Turn Undead':         { level:'1', range:'Near',  duration:'Instant',   damage:'', desc:'Undead in near range flee (CHA check vs spell check). Fail by 10+ and ≤ your level = destroyed.' },
  // Wizard Tier 1
  'Alarm':               { level:'1', range:'Close', duration:'1 day',     damage:'', desc:'Ward a door/threshold. You are mentally alerted when a creature passes through it.' },
  'Burning Hands':       { level:'1', range:'Close', duration:'Instant',   damage:'2d6', desc:'Spread fingers and release a circle of flame roaring out to a close area.' },
  'Charm Person':        { level:'1', range:'Near',  duration:'1d8 days',  damage:'', desc:'Beguile one humanoid of level 2 or less. It regards you as a trusted friend.' },
  'Detect Magic':        { level:'1', range:'Near',  duration:'Focus',     damage:'', desc:'Sense magic within near range. Focus 2 rounds to discern general properties.' },
  'Hold Portal':         { level:'1', range:'Near',  duration:'10 rounds', damage:'', desc:'Magically hold a portal closed for the duration.' },
  'Magic Missile':       { level:'1', range:'Far',   duration:'Instant',   damage:'1d4', desc:'Advantage on cast check. A glowing bolt of force deals 1d4 damage to one target.' },
  'Sleep':               { level:'1', range:'Near',  duration:'Instant',   damage:'', desc:'Creatures level 2 or less in a near cube fall into deep sleep. Woken by damage or shaking.' },
  'Mage Armor':          { level:'1', range:'Self',  duration:'10 rounds', damage:'', desc:'Your AC becomes 14 (18 on critical success) for duration.' },
};

const RC_PRIEST_SPELLS_T1 = ['Cure Wounds','Holy Weapon','Light','Protection From Evil','Shield of Faith'];
const RC_WIZARD_SPELLS_T1 = ['Alarm','Burning Hands','Charm Person','Detect Magic','Hold Portal','Light','Magic Missile','Protection From Evil','Sleep'];
const RC_WITCH_SPELLS_T1  = ['Cauldron','Charm Person','Eyebite','Fog','Hypnotize','Oak, Ash, Thorn','Puppet','Shadowdance','Willowman','Witchlight'];
const RC_DRUID_SPELLS_T1  = ['Breath','Instill','Oxidize','Whisperwind'];
const RC_MAGE_SPELLS_T1   = ['Cleanse','Flare','Reveal','Ward'];
const RC_SORC_SPELLS_T1   = ['Blight','Eyebite','Mischief','Protection From Good'];
const RC_NECRO_SPELLS_T1  = ['First Gate','Protection From Evil','Seal Soul','Turn Undead','Undeath','Withermark'];
const RC_SEER_SPELLS_T1   = ['Chant','Evoke Rage','Potion','Trance'];

// ── Spell sources ─────────────────────────────────────────────────────────
// A caster defaults to its own list, but may tick other lists open and pick
// from them. 'Both' is an internal tag for spells shared by wizard + priest.
const SPELL_SOURCES = ['Wizard','Priest','Witch','Druid','Mage','Sorcerer','Necromancer','Seer','Homebrew'];
const RC_T1_BY_SOURCE = {
  Wizard: RC_WIZARD_SPELLS_T1,
  Priest: RC_PRIEST_SPELLS_T1,
  Witch:  RC_WITCH_SPELLS_T1,
  Druid:  RC_DRUID_SPELLS_T1,
  Mage:   RC_MAGE_SPELLS_T1,
  Sorcerer: RC_SORC_SPELLS_T1,
  Necromancer: RC_NECRO_SPELLS_T1,
  Seer:   RC_SEER_SPELLS_T1,
};

// Which lists are ticked by default for a class. Alignment plays no part in
// this — every other list can simply be ticked on.
function defaultSpellSources(cls) {
  const src = { Wizard:false, Priest:false, Witch:false, Druid:false, Mage:false, Sorcerer:false, Necromancer:false, Seer:false, Homebrew:false };
  if(cls==='Wizard')      src.Wizard = true;
  else if(cls==='Priest') src.Priest = true;
  else if(cls==='Witch')  src.Witch  = true;
  const ci = RC_CLASS_INFO[cls];
  if(ci && ci._caster && Object.prototype.hasOwnProperty.call(src, ci._caster.list)) src[ci._caster.list] = true;
  return src;
}

// Does a spell belong to any ticked source?
function spellInSources(s, src) {
  if(!src) return false;
  if(s.caster==='Both')   return !!(src.Wizard || src.Priest);
  if(s.caster==='Wizard') return !!src.Wizard;
  if(s.caster==='Priest') return !!src.Priest;
  if(s.caster==='Witch')  return !!src.Witch;
  if(s.caster==='Druid')  return !!src.Druid;
  if(s.caster==='Mage')   return !!src.Mage;
  if(s.caster==='Sorcerer') return !!src.Sorcerer;
  if(s.caster==='Necromancer') return !!src.Necromancer;
  if(s.caster==='Seer')   return !!src.Seer;
  if(s.caster==='Homebrew') return !!src.Homebrew;
  return false;
}

// Checkbox bar. `cls` drives which box is the "own" list (shown but locked on,
// so a caster can't accidentally cut themselves off from their own spells).
function spellSourceBar(src, cls, onToggle) {
  const own = { Wizard:'Wizard', Priest:'Priest', Witch:'Witch' }[cls] || '';
  // Styling lives in CSS (.spell-src-bar) so the row can stay on one line on
  // desktop but wrap onto as many lines as it needs on a phone.
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

const RC_DEITIES = {
  Lawful:  ['Saint Terragnis','Gede','Madeera the Covenant','Ord'],
  Neutral: ['Ord','Memnon'],
  Chaotic: ['Shune the Vile','Ramlaat','Memnon'],
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

