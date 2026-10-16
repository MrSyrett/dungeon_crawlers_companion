// GENERATED FILE - do not edit by hand.
// Source: data/lotr/parts/*.mjs - regenerate with: node scripts/build-lotr-data.mjs
// The Lord of the Rings Roleplaying (5E). Mechanics are game facts; descriptive
// text is original paraphrase written for this app.
(function(){
var LOTR_ABILITIES = [
 "STR",
 "DEX",
 "CON",
 "INT",
 "WIS",
 "CHA"
];
window.LOTR_ABILITIES = LOTR_ABILITIES;
var LOTR_ADVERSARY_TRAITS = [
 {
  "name": "Hatred (subject)",
  "text": "Recharges after a short or long rest. Bonus action: advantage on attacks against the hated folk until the start of its next turn."
 },
 {
  "name": "Reckless Hate",
  "text": "At the start of its turn it may gain advantage on melee attacks that turn; attacks against it have advantage until its next turn."
 },
 {
  "name": "Aggressive",
  "text": "Bonus action: move up to its speed toward a hostile creature it can see."
 },
 {
  "name": "Horrible Strength",
  "text": "Its melee weapons deal one extra die of damage."
 },
 {
  "name": "Hideous Toughness",
  "text": "Once per short or long rest, damage of 7 or less (14 for greater beasts) that would drop it to 0 leaves it at 1 HP."
 },
 {
  "name": "Strike Fear",
  "text": "Non-undead creatures within 60 ft. that are aware of it gain Shadow from Dread (Charisma save); failures are frightened for 1 minute (stunned too if failing by 5+), saving each turn; successes are immune for 24 hours."
 },
 {
  "name": "Deathless",
  "text": "When reduced to 0 HP it makes a CON save (DC 5 + damage taken) to drop to 1 HP instead — unless the damage was radiant, a critical hit, or from a weapon bearing the Bane of the Undead."
 },
 {
  "name": "Sunlight Sensitivity",
  "text": "In sunlight: disadvantage on attack rolls and sight-based Perception."
 },
 {
  "name": "Yell of Triumph",
  "text": "Recharges after a short or long rest. Allies within 30 ft. who hear it gain advantage on attacks and Intimidation until its next turn; it then makes one attack as a bonus action."
 }
];
window.LOTR_ADVERSARY_TRAITS = LOTR_ADVERSARY_TRAITS;
var LOTR_ARMOR = [
 {
  "name": "Leather shirt",
  "category": "Light",
  "cost": "10 SP",
  "baseAC": "11 + Dex modifier (max 4)",
  "strength": "—",
  "stealthDisadvantage": false,
  "fatigueDisadvantage": false,
  "weight": "8 lb",
  "source": "core"
 },
 {
  "name": "Leather corslet",
  "category": "Light",
  "cost": "45 SP",
  "baseAC": "12 + Dex modifier (max 3)",
  "strength": "—",
  "stealthDisadvantage": false,
  "fatigueDisadvantage": false,
  "weight": "10 lb",
  "source": "core"
 },
 {
  "name": "Hide",
  "category": "Medium",
  "cost": "10 SP",
  "baseAC": "12 + Dex modifier (max 2)",
  "strength": "—",
  "stealthDisadvantage": false,
  "fatigueDisadvantage": false,
  "weight": "12 lb",
  "source": "core"
 },
 {
  "name": "Mail-shirt",
  "category": "Medium",
  "cost": "50 SP",
  "baseAC": "13 + Dex modifier (max 2)",
  "strength": "—",
  "stealthDisadvantage": false,
  "fatigueDisadvantage": false,
  "weight": "20 lb",
  "source": "core"
 },
 {
  "name": "Scale Armour",
  "category": "Medium",
  "cost": "50 SP",
  "baseAC": "14 + Dex modifier (max 2)",
  "strength": "—",
  "stealthDisadvantage": true,
  "fatigueDisadvantage": true,
  "weight": "40 lb",
  "source": "core"
 },
 {
  "name": "Ring-mail",
  "category": "Heavy",
  "cost": "50 SP",
  "baseAC": "15",
  "strength": "—",
  "stealthDisadvantage": true,
  "fatigueDisadvantage": true,
  "weight": "50 lb",
  "source": "core"
 },
 {
  "name": "Coat of Mail",
  "category": "Heavy",
  "cost": "75 SP",
  "baseAC": "16",
  "strength": "—",
  "stealthDisadvantage": true,
  "fatigueDisadvantage": true,
  "weight": "55 lb",
  "source": "core"
 },
 {
  "name": "Mail Hauberk",
  "category": "Heavy",
  "cost": "20 GP",
  "baseAC": "17",
  "strength": "—",
  "stealthDisadvantage": true,
  "fatigueDisadvantage": true,
  "weight": "60 lb",
  "source": "core"
 },
 {
  "name": "Shield",
  "category": "Shield",
  "cost": "10 SP",
  "baseAC": "+2",
  "strength": "—",
  "stealthDisadvantage": false,
  "fatigueDisadvantage": false,
  "weight": "6 lb",
  "source": "core"
 }
];
window.LOTR_ARMOR = LOTR_ARMOR;
var LOTR_ARMOR_NOTE = "Armour marked with fatigue disadvantage gives disadvantage on Dexterity (Stealth) checks, and on journey fatigue saving throws if worn for at least half the journey's days (rounded up; need not be consecutive).";
window.LOTR_ARMOR_NOTE = LOTR_ARMOR_NOTE;
var LOTR_BACKGROUNDS = [
 {
  "culture": "Bardings",
  "name": "Dragon Stories",
  "skillProficiencies": [
   "Explore",
   "Old Lore"
  ],
  "toolProficiencies": [
   "A musical instrument of your choice"
  ],
  "distinctiveFeatures": [
   "Eager",
   "Proud"
  ],
  "description": "Raised on tales of Smaug and of the day your family reclaimed its home in Dale. Now the only dragons left are painted on inn-signs, so you went looking for adventure.",
  "source": "core"
 },
 {
  "culture": "Bardings",
  "name": "By Hammer and Anvil",
  "skillProficiencies": [
   "Insight",
   "Intimidation"
  ],
  "toolProficiencies": [
   "Smith's tools"
  ],
  "distinctiveFeatures": [
   "Proud",
   "Wilful"
  ],
  "description": "Apprenticed at great cost to a stern Dwarf-smith, you learned that a masterpiece needs your heart as well as your hammer.",
  "source": "core"
 },
 {
  "culture": "Bardings",
  "name": "Healing Hands",
  "skillProficiencies": [
   "Medicine",
   "Travel"
  ],
  "toolProficiencies": [
   "Herbalism kit or water vehicles"
  ],
  "distinctiveFeatures": [
   "Bold",
   "Generous"
  ],
  "description": "A boat-hand from Esgaroth who fell sick in far Dorwinion and was nursed back by a stranger — who taught you to save others in turn.",
  "source": "core"
 },
 {
  "culture": "Bardings",
  "name": "Gifted Senses",
  "skillProficiencies": [
   "Investigation",
   "Perception"
  ],
  "toolProficiencies": [
   "Brewer's supplies or cook's utensils"
  ],
  "distinctiveFeatures": [
   "Generous",
   "Wilful"
  ],
  "description": "You always notice when something is out of place, and folk began asking for your help — which carried you much farther from home than you expected.",
  "source": "core"
 },
 {
  "culture": "Bardings",
  "name": "A Patient Hunter",
  "skillProficiencies": [
   "Hunting",
   "Nature"
  ],
  "toolProficiencies": [
   "Leatherworker's tools or woodcarver's tools"
  ],
  "distinctiveFeatures": [
   "Bold",
   "Fierce"
  ],
  "description": "Your family kept the old ways of hunting rather than trading, and as the Desolation heals the game returns each spring.",
  "source": "core"
 },
 {
  "culture": "Bardings",
  "name": "Wordweaver",
  "skillProficiencies": [
   "Deception",
   "Riddle"
  ],
  "toolProficiencies": [
   "A gaming set of your choice"
  ],
  "distinctiveFeatures": [
   "Eager",
   "Fair-spoken"
  ],
  "description": "Not Bard's arrow but the halfling who matched wits with Smaug fired your imagination — you mean to win renown by cunning.",
  "source": "core"
 },
 {
  "culture": "Dwarves of Durin's Folk",
  "name": "Bitter Exile",
  "skillProficiencies": [
   "Explore",
   "Old Lore"
  ],
  "toolProficiencies": [
   "A musical instrument of your choice"
  ],
  "distinctiveFeatures": [
   "Fierce",
   "Proud"
  ],
  "description": "Raised on stories of halls lost to Orcs and Dragons in the far North, you mean to go back and set things right.",
  "source": "core"
 },
 {
  "culture": "Dwarves of Durin's Folk",
  "name": "Eloquent Orator",
  "skillProficiencies": [
   "Persuasion",
   "Riddle"
  ],
  "toolProficiencies": [
   "Calligrapher's supplies"
  ],
  "distinctiveFeatures": [
   "Cunning",
   "Lordly"
  ],
  "description": "You prefer the songs of cunning to the songs of valour, and seek to bring down your foes by wit.",
  "source": "core"
 },
 {
  "culture": "Dwarves of Durin's Folk",
  "name": "Far Trader",
  "skillProficiencies": [
   "Deception",
   "Travel"
  ],
  "toolProficiencies": [
   "Land vehicles"
  ],
  "distinctiveFeatures": [
   "Cunning",
   "Proud"
  ],
  "description": "A mere stripling by Dwarf-reckoning when you followed your kin along the trading roads, you long to see more of the world.",
  "source": "core"
 },
 {
  "culture": "Dwarves of Durin's Folk",
  "name": "The Grief of Azanulbizar",
  "skillProficiencies": [
   "Hunting",
   "Intimidation"
  ],
  "toolProficiencies": [
   "Smith's tools"
  ],
  "distinctiveFeatures": [
   "Fierce",
   "Stern"
  ],
  "description": "Your elders remember the horrors of the War of the Dwarves and Orcs; you have sworn justice on all Orc-kind.",
  "source": "core"
 },
 {
  "culture": "Dwarves of Durin's Folk",
  "name": "A Life of Toil",
  "skillProficiencies": [
   "Athletics",
   "Perception"
  ],
  "toolProficiencies": [
   "Mason's tools"
  ],
  "distinctiveFeatures": [
   "Secretive",
   "Wilful"
  ],
  "description": "You labour in the mines for base ore while the ancient holds lie in ruin — and watch the dark for any gleam of gold.",
  "source": "core"
 },
 {
  "culture": "Dwarves of Durin's Folk",
  "name": "A Penetrating Gaze",
  "skillProficiencies": [
   "Insight",
   "Investigation"
  ],
  "toolProficiencies": [
   "Pipes"
  ],
  "distinctiveFeatures": [
   "Wary",
   "Wilful"
  ],
  "description": "Taught to judge folk by deeds rather than fair words, you have learned to trust your own instincts; liars cannot meet your eye.",
  "source": "core"
 },
 {
  "culture": "Elves of Lindon",
  "name": "The Call of the Sea",
  "skillProficiencies": [],
  "toolProficiencies": [
   "A musical instrument of your choice"
  ],
  "distinctiveFeatures": [
   "Patient",
   "Subtle"
  ],
  "description": "The sea is your second heartbeat, yet you feel some purpose binds you to Middle-earth a while longer.",
  "source": "core",
  "skillChoice": {
   "count": 2,
   "from": [
    "Nature",
    "Old Lore",
    "Performance"
   ]
  }
 },
 {
  "culture": "Elves of Lindon",
  "name": "Maker of Ships",
  "skillProficiencies": [
   "Acrobatics",
   "Athletics"
  ],
  "toolProficiencies": [
   "Carpenter's tools"
  ],
  "distinctiveFeatures": [
   "Eager",
   "Lordly"
  ],
  "description": "Trained among Círdan's shipwrights, you have lived at the world's edge and now want to go where no ship can take you.",
  "source": "core"
 },
 {
  "culture": "Elves of Lindon",
  "name": "A Merchant Family",
  "skillProficiencies": [
   "Persuasion",
   "Travel"
  ],
  "toolProficiencies": [
   "Water vehicles"
  ],
  "distinctiveFeatures": [
   "Fair-spoken",
   "Lordly"
  ],
  "description": "Your kin traded by ship with Gondor's ports; as the Corsairs grow bolder the ships sail south no more, and you turned your feet elsewhere.",
  "source": "core"
 },
 {
  "culture": "Elves of Lindon",
  "name": "Sky-Watcher",
  "skillProficiencies": [
   "Explore",
   "Nature"
  ],
  "toolProficiencies": [
   "Navigator's tools"
  ],
  "distinctiveFeatures": [
   "Patient",
   "Wary"
  ],
  "description": "You read the weather from shipboard, and lately sense ill movements in the air coming out of the south-east.",
  "source": "core"
 },
 {
  "culture": "Elves of Lindon",
  "name": "Tower Guard",
  "skillProficiencies": [
   "Investigation",
   "Stealth"
  ],
  "toolProficiencies": [
   "Cartographer's tools"
  ],
  "distinctiveFeatures": [
   "Subtle",
   "Wary"
  ],
  "description": "You guard the Tower Hills — and, at Mithrandir's word, keep a secret watch over the borders of the Shire.",
  "source": "core"
 },
 {
  "culture": "Elves of Lindon",
  "name": "Visitor to the Mountains",
  "skillProficiencies": [
   "Insight",
   "Old Lore"
  ],
  "toolProficiencies": [
   "Jeweller's tools or smith's tools"
  ],
  "distinctiveFeatures": [
   "Fair-spoken",
   "Inquisitive"
  ],
  "description": "Drawn to the Blue Mountains, you won the grudging trust of a few Dwarves and learned to love their craft.",
  "source": "core"
 },
 {
  "culture": "Hobbits of the Shire",
  "name": "Bucklander",
  "skillProficiencies": [
   "Hunting",
   "Perception"
  ],
  "toolProficiencies": [
   "Carpenter's tools or water vehicles"
  ],
  "distinctiveFeatures": [
   "Rustic",
   "Wary"
  ],
  "description": "Raised on the 'wrong side' of the Brandywine, you share your family's queerness and unusual fighting spirit.",
  "source": "core"
 },
 {
  "culture": "Hobbits of the Shire",
  "name": "On Patrol",
  "skillProficiencies": [
   "Investigation",
   "Travel"
  ],
  "toolProficiencies": [
   "Brewer's supplies"
  ],
  "distinctiveFeatures": [
   "Inquisitive",
   "Wary"
  ],
  "description": "You tagged along when your Shirriff aunt went beating the bounds — and heard the best stories at the Ivy Bush.",
  "source": "core"
 },
 {
  "culture": "Hobbits of the Shire",
  "name": "Restless Farmer",
  "skillProficiencies": [
   "Animal Handling",
   "Nature"
  ],
  "toolProficiencies": [
   "Cook's utensils or herbalism kit"
  ],
  "distinctiveFeatures": [
   "Faithful",
   "Rustic"
  ],
  "description": "A Southfarthing farmer's child who sometimes longs to sleep under the stars in the open fields.",
  "source": "core"
 },
 {
  "culture": "Hobbits of the Shire",
  "name": "Too Many Paths to Tread",
  "skillProficiencies": [
   "Athletics",
   "Explore"
  ],
  "toolProficiencies": [
   "Mason's tools"
  ],
  "distinctiveFeatures": [
   "Eager",
   "Merry"
  ],
  "description": "Meant to inherit your father's workshop at 33, you wandered off for months instead — and he secretly approves.",
  "source": "core"
 },
 {
  "culture": "Hobbits of the Shire",
  "name": "Tookish Blood",
  "skillProficiencies": [
   "Deception",
   "Riddle"
  ],
  "toolProficiencies": [
   "Potter's tools"
  ],
  "distinctiveFeatures": [
   "Eager",
   "Honourable"
  ],
  "description": "One night you saw Dwarves round a campfire, and something Tookish stirred; you have shunned well-trodden paths ever since.",
  "source": "core"
 },
 {
  "culture": "Hobbits of the Shire",
  "name": "Witty Gentlehobbit",
  "skillProficiencies": [
   "Insight",
   "Persuasion"
  ],
  "toolProficiencies": [
   "A gaming set of your choice"
  ],
  "distinctiveFeatures": [
   "Fair-spoken",
   "Merry"
  ],
  "description": "Westfarthing gentry with a family legend of a giant Tree-man — rumours you deflect with a quick joke.",
  "source": "core"
 },
 {
  "culture": "Men of Bree",
  "name": "Crossroads of the North",
  "skillProficiencies": [
   "Explore",
   "Persuasion"
  ],
  "toolProficiencies": [
   "Cobbler's, leatherworker's, or weaver's tools"
  ],
  "distinctiveFeatures": [
   "Faithful",
   "Generous"
  ],
  "description": "Your family's tailoring trade serves all who pass through Bree; you finally followed the Road to see where they come from.",
  "source": "core"
 },
 {
  "culture": "Men of Bree",
  "name": "Forest-Dweller",
  "skillProficiencies": [
   "Nature",
   "Stealth"
  ],
  "toolProficiencies": [
   "Herbalism kit"
  ],
  "distinctiveFeatures": [
   "Cunning",
   "Rustic"
  ],
  "description": "Raised among the Chetwood near Archet, where old trees whisper and, some nights, Elven voices sing on the wind.",
  "source": "core"
 },
 {
  "culture": "Men of Bree",
  "name": "Gate-Warden",
  "skillProficiencies": [
   "Intimidation",
   "Perception"
  ],
  "toolProficiencies": [
   "Carpenter's tools or woodcarver's tools"
  ],
  "distinctiveFeatures": [
   "Inquisitive",
   "Patient"
  ],
  "description": "A woodworker by day, you served long cold nights as one of Bree's gate-wardens.",
  "source": "core"
 },
 {
  "culture": "Men of Bree",
  "name": "No Longer Free from Care and Fear",
  "skillProficiencies": [
   "Deception",
   "Investigation"
  ],
  "toolProficiencies": [
   "A gaming set or a musical instrument of your choice"
  ],
  "distinctiveFeatures": [
   "Inquisitive",
   "Rustic"
  ],
  "description": "You have heard the Rangers' stories and know Bree is an island among unseen foes; soon you will go and seek them.",
  "source": "core"
 },
 {
  "culture": "Men of Bree",
  "name": "Off with Dwarves",
  "skillProficiencies": [
   "Animal Handling",
   "Travel"
  ],
  "toolProficiencies": [
   "Land vehicles"
  ],
  "distinctiveFeatures": [
   "Fair-spoken",
   "Faithful"
  ],
  "description": "You once minded ponies for Dwarves bound for the Blue Mountains, and came home with a wanderlust that won't let you rest.",
  "source": "core"
 },
 {
  "culture": "Men of Bree",
  "name": "Up the Greenway",
  "skillProficiencies": [
   "Old Lore",
   "Riddle"
  ],
  "toolProficiencies": [
   "Mason's, potter's, or smith's tools"
  ],
  "distinctiveFeatures": [
   "Fair-spoken",
   "True-hearted"
  ],
  "description": "Your grandfather came north from beyond the Isen, and his tales of fierce southern kings still stir you.",
  "source": "core"
 },
 {
  "culture": "Rangers of the North",
  "name": "Counsellor",
  "skillProficiencies": [
   "Insight",
   "Riddle"
  ],
  "toolProficiencies": [
   "Pipes"
  ],
  "distinctiveFeatures": [
   "Secretive",
   "Subtle"
  ],
  "description": "You were taught that the Enemy thrives on secrets and lies, and you have a knack for seeing through them.",
  "source": "core"
 },
 {
  "culture": "Rangers of the North",
  "name": "Far-Reaching Herald",
  "skillProficiencies": [
   "Athletics",
   "Travel"
  ],
  "toolProficiencies": [
   "Land vehicles"
  ],
  "distinctiveFeatures": [
   "Bold",
   "True-hearted"
  ],
  "description": "A tireless wanderer of the North from childhood, now a carrier of tidings among the scattered Rangers.",
  "source": "core"
 },
 {
  "culture": "Rangers of the North",
  "name": "Hunter of Orcs",
  "skillProficiencies": [
   "Hunting",
   "Stealth"
  ],
  "toolProficiencies": [
   "Leatherworker's tools or woodcarver's tools"
  ],
  "distinctiveFeatures": [
   "Bold",
   "Stern"
  ],
  "description": "You drive Orc raiders back to their holes — and fear there will never be an end to it.",
  "source": "core"
 },
 {
  "culture": "Rangers of the North",
  "name": "Keeper of Lore",
  "skillProficiencies": [
   "Investigation",
   "Old Lore"
  ],
  "toolProficiencies": [
   "Calligrapher's supplies"
  ],
  "distinctiveFeatures": [
   "Honourable",
   "True-hearted"
  ],
  "description": "You keep alive the tale of lost Arnor, and Elrond has let you study in the Last Homely House.",
  "source": "core"
 },
 {
  "culture": "Rangers of the North",
  "name": "Protector of the Land",
  "skillProficiencies": [
   "Nature",
   "Medicine"
  ],
  "toolProficiencies": [
   "Herbalism kit"
  ],
  "distinctiveFeatures": [
   "Honourable",
   "Subtle"
  ],
  "description": "Your people's realms are gone; only the land remains — keep it safe, and it keeps you.",
  "source": "core"
 },
 {
  "culture": "Rangers of the North",
  "name": "Watcher on the Border",
  "skillProficiencies": [
   "Explore",
   "Perception"
  ],
  "toolProficiencies": [
   "Cartographer's tools"
  ],
  "distinctiveFeatures": [
   "Secretive",
   "Stern"
  ],
  "description": "Sent to watch the edges of your folk's lands, you have seen the Shadow's reach grow — and simple folk stand firm.",
  "source": "core"
 }
];
window.LOTR_BACKGROUNDS = LOTR_BACKGROUNDS;
var LOTR_CALLINGS = [
 {
  "name": "Captain",
  "flavor": "A valiant fighter and leader of others, who wants folk to follow out of trust rather than fear.",
  "primaryAbility": [
   "STR",
   "CHA"
  ],
  "hitDie": 10,
  "savingThrows": [
   "CON",
   "CHA"
  ],
  "proficiencies": {
   "armor": [
    "Light",
    "Medium",
    "Heavy",
    "Shield"
   ],
   "weapons": [
    "Simple",
    "Martial"
   ],
   "tools": [],
   "skillsChoose": 2,
   "skillsFrom": [
    "Animal Handling",
    "Athletics",
    "Insight",
    "Intimidation",
    "Persuasion",
    "Travel"
   ]
  },
  "startingEquipment": [
   "(a) ring-mail or (b) hide armour",
   "(a) a martial melee weapon and a shield or (b) a martial melee weapon and a simple melee weapon",
   "(a) a bow and 20 arrows or (b) two simple melee weapons"
  ],
  "equipmentChoices": [
   [
    [
     "Ring-mail"
    ],
    [
     "Hide"
    ]
   ],
   [
    [
     "Martial melee weapon",
     "Shield"
    ],
    [
     "Martial melee weapon",
     "Simple melee weapon"
    ]
   ],
   [
    [
     "Bow",
     "Arrows (20)",
     "Quiver"
    ],
    [
     "Simple melee weapon",
     "Simple melee weapon"
    ]
   ]
  ],
  "spellcasting": "none",
  "shadowPath": "Lure of Power",
  "virtueLevels": [
   2,
   4,
   6,
   8,
   10
  ],
  "craftOrVirtueLevels": [
   2,
   6,
   10
  ],
  "fightingStyles": [
   "Defence",
   "Duelling",
   "Great Weapon Fighting",
   "Protection"
  ],
  "subclassLevel": 3,
  "subclassLabel": "Captain Title",
  "table": [
   {
    "level": 1,
    "profBonus": 2,
    "features": [
     "Leadership"
    ]
   },
   {
    "level": 2,
    "profBonus": 2,
    "features": [
     "Craft or Virtue",
     "Fighting Style"
    ]
   },
   {
    "level": 3,
    "profBonus": 2,
    "features": [
     "Captain Title",
     "Valiant",
     "Reward"
    ]
   },
   {
    "level": 4,
    "profBonus": 2,
    "features": [
     "Virtue"
    ]
   },
   {
    "level": 5,
    "profBonus": 3,
    "features": [
     "Extra Attack",
     "Reward"
    ]
   },
   {
    "level": 6,
    "profBonus": 3,
    "features": [
     "Aura of Valour",
     "Craft or Virtue"
    ]
   },
   {
    "level": 7,
    "profBonus": 3,
    "features": [
     "Captain Title feature",
     "Reward"
    ]
   },
   {
    "level": 8,
    "profBonus": 3,
    "features": [
     "Virtue"
    ]
   },
   {
    "level": 9,
    "profBonus": 4,
    "features": [
     "Reward"
    ]
   },
   {
    "level": 10,
    "profBonus": 4,
    "features": [
     "Aura of Courage",
     "Craft or Virtue"
    ]
   }
  ],
  "features": [
   {
    "level": 1,
    "name": "Leadership",
    "description": "Action in combat: choose up to twice your proficiency bonus friendly creatures (you included) within 30 ft. who can see or hear and understand you. Each gains temporary HP equal to your Captain level + your Charisma modifier, lasting until spent or a short/long rest. Once per short or long rest.",
    "source": "core",
    "uses": "1/short",
    "tempHp": "level+CHA"
   },
   {
    "level": 2,
    "name": "Fighting Style",
    "description": "Choose Defence, Duelling, Great Weapon Fighting or Protection.",
    "source": "core"
   },
   {
    "level": 2,
    "name": "Virtue",
    "description": "At 2nd, 4th, 6th, 8th and 10th level take a common or cultural virtue (each only once). At 2nd, 6th and 10th you may instead gain a craft slot and a craft.",
    "source": "core"
   },
   {
    "level": 3,
    "name": "Valiant",
    "description": "Add half your proficiency bonus (rounded down) to any saving throw that doesn't already include your proficiency bonus.",
    "source": "core"
   },
   {
    "level": 5,
    "name": "Extra Attack",
    "description": "You attack twice whenever you take the Attack action.",
    "source": "core"
   },
   {
    "level": 6,
    "name": "Aura of Valour",
    "description": "When you or a friendly creature within 10 ft. hits with a melee weapon attack, it can add your Charisma modifier to the damage. Not while you are frightened or unconscious.",
    "source": "core"
   },
   {
    "level": 10,
    "name": "Aura of Courage",
    "description": "You and friendly creatures within 10 ft. can't be frightened while you are conscious (Shadow from Dread still accrues).",
    "source": "core"
   }
  ],
  "subclasses": [
   {
    "name": "Chieftain",
    "className": "Captain",
    "flavor": "A leader and weaponmaster who is first into the fight.",
    "source": "core",
    "features": [
     {
      "level": 3,
      "name": "Challenge",
      "description": "Bonus action: challenge a creature you can see within 10 ft. You have advantage on melee attacks against it for 1 minute (or until it drops). It makes a Wisdom (Insight) check vs DC 8 + proficiency bonus + Charisma modifier; on a failure it has disadvantage on attacks against anyone but you — ending if you attack another creature, an ally attacks it, or you end your turn more than 30 ft. away. Once per short or long rest.",
      "source": "core",
      "uses": "1/short"
     },
     {
      "level": 7,
      "name": "Pursuer of Foes",
      "description": "Creatures provoke opportunity attacks from you even if they Disengage, and a creature you hit with an opportunity attack has speed 0 for the rest of the turn.",
      "source": "core"
     }
    ]
   },
   {
    "name": "Thane",
    "className": "Captain",
    "flavor": "A sworn warrior of a King, standing ready to protect the innocent.",
    "source": "core",
    "features": [
     {
      "level": 3,
      "name": "Bright Blade",
      "description": "Bonus action: for 1 minute add your Charisma modifier (minimum +1) to attack rolls with a melee weapon you hold. While it lasts, when you hit a creature the next attack against it by someone else before your next turn has advantage. Ends if you let go of the weapon or fall unconscious. Once per short or long rest.",
      "source": "core",
      "uses": "1/short"
     },
     {
      "level": 7,
      "name": "Tireless Leader",
      "description": "You and friendly creatures within 10 ft. suffer exhaustion as if it were one level lower.",
      "source": "core"
     }
    ]
   }
  ],
  "source": "core"
 },
 {
  "name": "Champion",
  "flavor": "A fierce warrior skilled with every weapon and armour, who believes the Shadow is best answered by strength of arms.",
  "primaryAbility": [
   "STR",
   "DEX"
  ],
  "hitDie": 10,
  "savingThrows": [
   "STR",
   "CON"
  ],
  "proficiencies": {
   "armor": [
    "Light",
    "Medium",
    "Heavy",
    "Shield"
   ],
   "weapons": [
    "Simple",
    "Martial"
   ],
   "tools": [],
   "skillsChoose": 2,
   "skillsFrom": [
    "Acrobatics",
    "Animal Handling",
    "Athletics",
    "Hunting",
    "Intimidation",
    "Perception"
   ]
  },
  "startingEquipment": [
   "(a) ring-mail or (b) hide armour or (c) leather shirt, great bow and 20 arrows",
   "(a) a martial melee weapon and a shield or (b) a martial melee weapon and a simple melee weapon",
   "(a) a bow and 20 arrows or (b) two simple melee weapons"
  ],
  "equipmentChoices": [
   [
    [
     "Ring-mail"
    ],
    [
     "Hide"
    ],
    [
     "Leather shirt",
     "Great Bow",
     "Arrows (20)",
     "Quiver"
    ]
   ],
   [
    [
     "Martial melee weapon",
     "Shield"
    ],
    [
     "Martial melee weapon",
     "Simple melee weapon"
    ]
   ],
   [
    [
     "Bow",
     "Arrows (20)",
     "Quiver"
    ],
    [
     "Simple melee weapon",
     "Simple melee weapon"
    ]
   ]
  ],
  "spellcasting": "none",
  "shadowPath": "Curse of Vengeance",
  "virtueLevels": [
   2,
   4,
   6,
   8
  ],
  "craftOrVirtueLevels": [
   2,
   6
  ],
  "fightingStyles": [
   "Archery",
   "Defence",
   "Duelling",
   "Great Weapon Fighting",
   "Protection",
   "Two-Weapon Fighting"
  ],
  "subclassLevel": 3,
  "subclassLabel": "Champion Way",
  "table": [
   {
    "level": 1,
    "profBonus": 2,
    "features": [
     "Fighting Style",
     "Surge of Vigour"
    ]
   },
   {
    "level": 2,
    "profBonus": 2,
    "features": [
     "Craft or Virtue"
    ]
   },
   {
    "level": 3,
    "profBonus": 2,
    "features": [
     "Champion Way",
     "Reward"
    ]
   },
   {
    "level": 4,
    "profBonus": 2,
    "features": [
     "Virtue"
    ]
   },
   {
    "level": 5,
    "profBonus": 3,
    "features": [
     "Extra Attack",
     "Reward"
    ]
   },
   {
    "level": 6,
    "profBonus": 3,
    "features": [
     "Craft or Virtue"
    ]
   },
   {
    "level": 7,
    "profBonus": 3,
    "features": [
     "Champion Way feature",
     "Reward"
    ]
   },
   {
    "level": 8,
    "profBonus": 3,
    "features": [
     "Virtue"
    ]
   },
   {
    "level": 9,
    "profBonus": 4,
    "features": [
     "Indomitable",
     "Reward"
    ]
   },
   {
    "level": 10,
    "profBonus": 4,
    "features": [
     "Extra Attack (2)"
    ]
   }
  ],
  "features": [
   {
    "level": 1,
    "name": "Fighting Style",
    "description": "Choose Archery, Defence, Duelling, Great Weapon Fighting, Protection or Two-Weapon Fighting.",
    "source": "core"
   },
   {
    "level": 1,
    "name": "Surge of Vigour",
    "description": "Bonus action: take the Attack, Dash, Disengage or Dodge action, or regain 1d8 + your Champion level + your Constitution modifier HP. Once per short or long rest.",
    "source": "core",
    "uses": "1/short",
    "heal": "1d8+level+CON"
   },
   {
    "level": 2,
    "name": "Virtue",
    "description": "At 2nd, 4th, 6th and 8th level take a common or cultural virtue (each only once). At 2nd and 6th you may instead gain a craft slot and a craft.",
    "source": "core"
   },
   {
    "level": 5,
    "name": "Extra Attack",
    "description": "You attack twice when you take the Attack action — three times from 10th level.",
    "source": "core"
   },
   {
    "level": 9,
    "name": "Indomitable",
    "description": "You are immune to being charmed or frightened (Shadow from Dread and Sorcery still accrues).",
    "source": "core"
   }
  ],
  "subclasses": [
   {
    "name": "Sharp-Shooter",
    "className": "Champion",
    "flavor": "Following King Bard, you have mastered the bow.",
    "source": "core",
    "features": [
     {
      "level": 3,
      "name": "Bonus Proficiency",
      "description": "Proficiency in Perception (double proficiency if already proficient).",
      "source": "core"
     },
     {
      "level": 3,
      "name": "Mighty Shot",
      "description": "Before a ranged weapon attack, you may roll the weapon's damage die and subtract it from the attack roll; on a hit, add two extra weapon damage dice. Once per turn.",
      "source": "core"
     },
     {
      "level": 7,
      "name": "True Shot",
      "description": "Once per turn when you take the Attack action with a ranged weapon, forgo one attack to make your next ranged hit this turn a critical hit.",
      "source": "core"
     }
    ]
   },
   {
    "name": "Slayer",
    "className": "Champion",
    "flavor": "A brutal path, perhaps for vengeance — battle is a joyful call to you.",
    "source": "core",
    "features": [
     {
      "level": 3,
      "name": "Sterner Than Steel",
      "description": "Your hit point maximum increases by 3, and by 1 more each time you gain a Champion level.",
      "source": "core"
     },
     {
      "level": 3,
      "name": "Battle-Fury",
      "description": "On your first attack of a turn you may attack recklessly: advantage on Strength melee weapon attacks, + half your proficiency bonus to damage, and resistance to bludgeoning, piercing and slashing until your next turn — but attacks against you have advantage until then.",
      "source": "core"
     },
     {
      "level": 7,
      "name": "War-Hardened",
      "description": "Advantage on initiative, Strength checks and Strength saves, and you can't be surprised — unless blinded, deafened or incapacitated.",
      "source": "core"
     }
    ]
   }
  ],
  "source": "core"
 },
 {
  "name": "Messenger",
  "flavor": "A seasoned traveller and advisor who carries tidings to distant lands so the Free Peoples may stand as one.",
  "primaryAbility": [
   "DEX",
   "CHA"
  ],
  "hitDie": 8,
  "savingThrows": [
   "DEX",
   "CHA"
  ],
  "proficiencies": {
   "armor": [
    "Light"
   ],
   "weapons": [
    "Simple",
    "Short sword",
    "Sword"
   ],
   "tools": [
    "One tool of your choice"
   ],
   "skillsChoose": 4,
   "skillsFrom": [
    "Animal Handling",
    "Explore",
    "Hunting",
    "Insight",
    "Intimidation",
    "Old Lore",
    "Perception",
    "Performance",
    "Persuasion",
    "Riddle",
    "Stealth",
    "Travel"
   ]
  },
  "startingEquipment": [
   "Any one tool and any simple melee weapon",
   "(a) a short sword or (b) a sword",
   "(a) leather shirt or (b) a bow and 20 arrows"
  ],
  "equipmentChoices": [
   [
    [
     "Simple melee weapon"
    ]
   ],
   [
    [
     "Sword, Short"
    ],
    [
     "Sword"
    ]
   ],
   [
    [
     "Leather shirt"
    ],
    [
     "Bow",
     "Arrows (20)",
     "Quiver"
    ]
   ]
  ],
  "spellcasting": "none",
  "shadowPath": "Wandering-Madness",
  "virtueLevels": [
   2,
   4,
   6,
   8,
   10
  ],
  "craftOrVirtueLevels": [
   2,
   6,
   10
  ],
  "fightingStyles": [],
  "subclassLevel": 3,
  "subclassLabel": "Messenger Path",
  "table": [
   {
    "level": 1,
    "profBonus": 2,
    "features": [
     "Folk-lore",
     "Tireless and Swift",
     "Unarmoured Defence"
    ],
    "columns": {
     "Sneak Attack": "—"
    }
   },
   {
    "level": 2,
    "profBonus": 2,
    "features": [
     "Craft or Virtue",
     "Sneak Attack"
    ],
    "columns": {
     "Sneak Attack": "1d6"
    }
   },
   {
    "level": 3,
    "profBonus": 2,
    "features": [
     "Errand Runner",
     "Messenger Path",
     "Reward"
    ],
    "columns": {
     "Sneak Attack": "1d6"
    }
   },
   {
    "level": 4,
    "profBonus": 2,
    "features": [
     "Virtue"
    ],
    "columns": {
     "Sneak Attack": "1d6"
    }
   },
   {
    "level": 5,
    "profBonus": 3,
    "features": [
     "Uncanny Dodge",
     "Reward"
    ],
    "columns": {
     "Sneak Attack": "2d6"
    }
   },
   {
    "level": 6,
    "profBonus": 3,
    "features": [
     "Craft or Virtue",
     "Tireless and Swift improvement"
    ],
    "columns": {
     "Sneak Attack": "2d6"
    }
   },
   {
    "level": 7,
    "profBonus": 3,
    "features": [
     "Messenger Path feature",
     "Reward"
    ],
    "columns": {
     "Sneak Attack": "2d6"
    }
   },
   {
    "level": 8,
    "profBonus": 3,
    "features": [
     "Virtue"
    ],
    "columns": {
     "Sneak Attack": "2d6"
    }
   },
   {
    "level": 9,
    "profBonus": 4,
    "features": [
     "Reward"
    ],
    "columns": {
     "Sneak Attack": "3d6"
    }
   },
   {
    "level": 10,
    "profBonus": 4,
    "features": [
     "Craft or Virtue",
     "Tireless and Swift improvement"
    ],
    "columns": {
     "Sneak Attack": "3d6"
    }
   }
  ],
  "sneakAttack": [
   0,
   1,
   1,
   1,
   2,
   2,
   2,
   2,
   3,
   3
  ],
  "features": [
   {
    "level": 1,
    "name": "Folk-lore",
    "description": "On Intelligence checks about the customs, beliefs and stories of the Free Peoples you count as proficient in Old Lore with double proficiency.",
    "source": "core"
   },
   {
    "level": 1,
    "name": "Tireless and Swift",
    "description": "+5 ft. speed when not in heavy armour, and add your Messenger level to fatigue saving throws during journeys. +10 ft. at 6th level; +15 ft. at 10th, when each short rest also removes one level of exhaustion.",
    "source": "core"
   },
   {
    "level": 1,
    "name": "Unarmoured Defence",
    "description": "With no armour and no shield, your AC is 10 + Dexterity modifier + Charisma modifier.",
    "source": "core",
    "unarmoredAC": "DEX+CHA"
   },
   {
    "level": 2,
    "name": "Virtue",
    "description": "At 2nd, 4th, 6th, 8th and 10th level take a common or cultural virtue. At 2nd, 6th and 10th you may instead gain a craft slot and a craft.",
    "source": "core"
   },
   {
    "level": 2,
    "name": "Sneak Attack",
    "description": "Once per turn deal extra damage (see table) to a creature you hit with a finesse or ranged weapon if you have advantage — or if another enemy of the target is within 5 ft. of it and you don't have disadvantage.",
    "source": "core"
   },
   {
    "level": 3,
    "name": "Errand Runner",
    "description": "Add half your proficiency bonus (rounded down) to any ability check that doesn't already include your proficiency bonus.",
    "source": "core"
   },
   {
    "level": 5,
    "name": "Uncanny Dodge",
    "description": "Reaction when an attacker you can see hits you: halve the damage.",
    "source": "core"
   }
  ],
  "subclasses": [
   {
    "name": "Counsellor",
    "className": "Messenger",
    "flavor": "You oppose the Shadow by bringing wise counsel to all who need it.",
    "source": "core",
    "features": [
     {
      "level": 3,
      "name": "Bonus Proficiencies",
      "description": "Proficiency in two of Deception, Insight, Intimidation, Performance, Persuasion, Riddle (double proficiency if already proficient).",
      "source": "core"
     },
     {
      "level": 3,
      "name": "Words of Guard and Guiding",
      "description": "Bonus action: make a Charisma check or take the Help action. When you Help an ally attack, the target can be up to 30 ft. from you if the ally can hear and understand you.",
      "source": "core"
     },
     {
      "level": 7,
      "name": "A Dangerous Gift",
      "description": "Advantage on Intelligence (Riddle) and Wisdom (Insight) checks, and you can reroll one failed check during a council's Interaction stage.",
      "source": "core"
     }
    ]
   },
   {
    "name": "Herald",
    "className": "Messenger",
    "flavor": "Wise words need strength to back them.",
    "source": "core",
    "features": [
     {
      "level": 3,
      "name": "Forth to Battle",
      "description": "Proficiency with medium armour, shields and martial weapons, and you may add your Charisma modifier to initiative.",
      "source": "core"
     },
     {
      "level": 3,
      "name": "Fighting Style",
      "description": "Choose Archery, Defence, Duelling or Two-Weapon Fighting.",
      "source": "core"
     },
     {
      "level": 7,
      "name": "Extra Attack",
      "description": "You attack twice when you take the Attack action.",
      "source": "core"
     }
    ]
   }
  ],
  "source": "core"
 },
 {
  "name": "Scholar",
  "flavor": "A master of learning, ancient lore and the healing arts, for whom knowledge makes the wild world less fearsome.",
  "primaryAbility": [
   "INT",
   "WIS"
  ],
  "hitDie": 8,
  "savingThrows": [
   "INT",
   "WIS"
  ],
  "proficiencies": {
   "armor": [
    "Light"
   ],
   "weapons": [
    "Simple"
   ],
   "tools": [
    "Two of: calligrapher's supplies, cartographer's tools, herbalism kit, a musical instrument, navigator's tools, pipes"
   ],
   "skillsChoose": 3,
   "skillsFrom": [
    "Animal Handling",
    "Insight",
    "Investigation",
    "Medicine",
    "Nature",
    "Old Lore",
    "Performance",
    "Riddle",
    "Travel"
   ]
  },
  "startingEquipment": [
   "A healer's kit, any simple melee weapon, and any two tools",
   "(a) leather shirt or (b) a bow and 20 arrows"
  ],
  "equipmentChoices": [
   [
    [
     "Healer's kit",
     "Simple melee weapon"
    ]
   ],
   [
    [
     "Leather shirt"
    ],
    [
     "Bow",
     "Arrows (20)",
     "Quiver"
    ]
   ]
  ],
  "spellcasting": "none",
  "shadowPath": "Lure of Secrets",
  "virtueLevels": [
   4,
   6,
   8
  ],
  "craftOrVirtueLevels": [],
  "fightingStyles": [],
  "subclassLevel": 3,
  "subclassLabel": "Scholar Tradition",
  "table": [
   {
    "level": 1,
    "profBonus": 2,
    "features": [
     "Crafts",
     "Rhymes of Lore (d6)",
     "Unarmoured Defence"
    ],
    "columns": {
     "Craft Slots": "1",
     "Lore Die": "d6"
    }
   },
   {
    "level": 2,
    "profBonus": 2,
    "features": [
     "Cunning Mind",
     "Hands of a Healer (d6)"
    ],
    "columns": {
     "Craft Slots": "1",
     "Lore Die": "d6"
    }
   },
   {
    "level": 3,
    "profBonus": 2,
    "features": [
     "Expertise",
     "Scholar Tradition",
     "Reward"
    ],
    "columns": {
     "Craft Slots": "2",
     "Lore Die": "d6"
    }
   },
   {
    "level": 4,
    "profBonus": 2,
    "features": [
     "Virtue"
    ],
    "columns": {
     "Craft Slots": "2",
     "Lore Die": "d6"
    }
   },
   {
    "level": 5,
    "profBonus": 3,
    "features": [
     "Rhymes of Lore (d8)",
     "Unending Rhymes",
     "Reward"
    ],
    "columns": {
     "Craft Slots": "3",
     "Lore Die": "d8"
    }
   },
   {
    "level": 6,
    "profBonus": 3,
    "features": [
     "Virtue"
    ],
    "columns": {
     "Craft Slots": "3",
     "Lore Die": "d8"
    }
   },
   {
    "level": 7,
    "profBonus": 3,
    "features": [
     "Scholar Tradition feature",
     "Reward"
    ],
    "columns": {
     "Craft Slots": "4",
     "Lore Die": "d8"
    }
   },
   {
    "level": 8,
    "profBonus": 3,
    "features": [
     "Virtue"
    ],
    "columns": {
     "Craft Slots": "4",
     "Lore Die": "d8"
    }
   },
   {
    "level": 9,
    "profBonus": 4,
    "features": [
     "Hands of a Healer (d8)",
     "Reward"
    ],
    "columns": {
     "Craft Slots": "5",
     "Lore Die": "d8"
    }
   },
   {
    "level": 10,
    "profBonus": 4,
    "features": [
     "Expertise",
     "Rhymes of Lore (d10)",
     "Unfailing Rhymes"
    ],
    "columns": {
     "Craft Slots": "5",
     "Lore Die": "d10"
    }
   }
  ],
  "craftSlots": [
   1,
   1,
   2,
   2,
   3,
   3,
   4,
   4,
   5,
   5
  ],
  "features": [
   {
    "level": 1,
    "name": "Crafts",
    "description": "You know crafts — obscure, almost-magical lore (see Crafts). Spend a craft slot to use one; slots return on a short or long rest. You know one craft, and learn another each time you gain a craft slot.",
    "source": "core"
   },
   {
    "level": 1,
    "name": "Rhymes of Lore",
    "description": "Bonus action: a creature within 30 ft. (you included) who can hear and understand you gains a Lore die (d6; d8 at 5th, d10 at 10th). Within the next minute it can add the die to one ability check, attack roll or saving throw, deciding after the roll but before the outcome. One Lore die per creature. Uses = Intelligence modifier (min 1), regained on a long rest.",
    "source": "core",
    "uses": "INT/long",
    "die": "lore"
   },
   {
    "level": 1,
    "name": "Unarmoured Defence",
    "description": "With no armour and no shield, your AC is 10 + Dexterity modifier + Wisdom modifier.",
    "source": "core",
    "unarmoredAC": "DEX+WIS"
   },
   {
    "level": 2,
    "name": "Cunning Mind",
    "description": "Bonus action each turn in combat: make an Intelligence or Wisdom check, or take the Help action.",
    "source": "core"
   },
   {
    "level": 2,
    "name": "Hands of a Healer",
    "description": "At the end of a short rest, up to twice your proficiency bonus friendly creatures who spent Hit Dice regain an extra 1d6 HP per Hit Die spent (1d8 from 9th level).",
    "source": "core"
   },
   {
    "level": 3,
    "name": "Expertise",
    "description": "Choose two skill or tool proficiencies: double your proficiency bonus with them. Two more at 10th level.",
    "source": "core"
   },
   {
    "level": 4,
    "name": "Virtue",
    "description": "At 4th, 6th and 8th level take a common or cultural virtue.",
    "source": "core"
   },
   {
    "level": 5,
    "name": "Unending Rhymes",
    "description": "You regain all uses of Rhymes of Lore on a short or long rest.",
    "source": "core"
   },
   {
    "level": 10,
    "name": "Unfailing Rhymes",
    "description": "If a creature adds your Lore die and still fails, it keeps the Lore die.",
    "source": "core"
   }
  ],
  "subclasses": [
   {
    "name": "Healing",
    "className": "Scholar",
    "flavor": "Your skill mends body, mind and spirit.",
    "source": "core",
    "features": [
     {
      "level": 3,
      "name": "Bonus Proficiencies",
      "description": "Proficiency in Medicine and with the herbalism kit (double if already proficient).",
      "source": "core"
     },
     {
      "level": 3,
      "name": "Wise Leechcraft",
      "description": "Add your Wisdom modifier (min +1) to Intelligence (Medicine) checks, to HP regained per Hit Die from your Hands of a Healer, and to your Rhymes of Lore uses (those extra Lore dice only work on Medicine checks). A Lore die from you used on a Medicine check counts as its maximum.",
      "source": "core"
     },
     {
      "level": 7,
      "name": "A Cure for Weariness",
      "description": "During a short rest, reduce a creature's exhaustion by one level. Uses = Wisdom modifier (min 1) per long rest.",
      "source": "core",
      "uses": "WIS/long"
     }
    ]
   },
   {
    "name": "Lore",
    "className": "Scholar",
    "flavor": "Lore-masters risk knowledge without wisdom — you will prove them wrong.",
    "source": "core",
    "features": [
     {
      "level": 3,
      "name": "Bonus Proficiencies",
      "description": "Proficiency in Old Lore and with calligrapher's supplies (double if already proficient).",
      "source": "core"
     },
     {
      "level": 3,
      "name": "Lore-Master",
      "description": "A creature rolling a Lore die from you may reroll it and use either result.",
      "source": "core"
     },
     {
      "level": 7,
      "name": "Words of Command",
      "description": "When you add a Lore die to an ability check with any skill but Medicine, you can obtain a magical success. Uses = Intelligence modifier (min 1) per long rest.",
      "source": "core",
      "uses": "INT/long"
     }
    ]
   }
  ],
  "source": "core"
 },
 {
  "name": "Treasure Hunter",
  "flavor": "A cunning adventurer who braves Orc-holes and Dragon-hoards to recover what was lost.",
  "primaryAbility": [
   "DEX"
  ],
  "hitDie": 8,
  "savingThrows": [
   "DEX",
   "INT"
  ],
  "proficiencies": {
   "armor": [
    "Light"
   ],
   "weapons": [
    "Simple",
    "Short sword",
    "Sword"
   ],
   "tools": [
    "One of: cartographer's tools, a gaming set, thieves' tools"
   ],
   "skillsChoose": 4,
   "skillsFrom": [
    "Acrobatics",
    "Athletics",
    "Deception",
    "Insight",
    "Investigation",
    "Old Lore",
    "Perception",
    "Persuasion",
    "Riddle",
    "Sleight of Hand",
    "Stealth",
    "Travel"
   ]
  },
  "startingEquipment": [
   "Leather shirt, any simple melee weapon, and any one tool",
   "(a) a short sword or (b) a sword",
   "(a) a bow and 20 arrows or (b) any simple melee weapon"
  ],
  "equipmentChoices": [
   [
    [
     "Leather shirt",
     "Simple melee weapon"
    ]
   ],
   [
    [
     "Sword, Short"
    ],
    [
     "Sword"
    ]
   ],
   [
    [
     "Bow",
     "Arrows (20)",
     "Quiver"
    ],
    [
     "Simple melee weapon"
    ]
   ]
  ],
  "spellcasting": "none",
  "shadowPath": "Dragon-Sickness",
  "virtueLevels": [
   4,
   6,
   8
  ],
  "craftOrVirtueLevels": [
   6
  ],
  "fightingStyles": [],
  "subclassLevel": 3,
  "subclassLabel": "Treasure Hunter Speciality",
  "table": [
   {
    "level": 1,
    "profBonus": 2,
    "features": [
     "Expertise",
     "Sneak Attack"
    ],
    "columns": {
     "Sneak Attack": "1d6"
    }
   },
   {
    "level": 2,
    "profBonus": 2,
    "features": [
     "Cunning Action"
    ],
    "columns": {
     "Sneak Attack": "1d6"
    }
   },
   {
    "level": 3,
    "profBonus": 2,
    "features": [
     "Treasure Hunter Speciality",
     "Reward"
    ],
    "columns": {
     "Sneak Attack": "2d6"
    }
   },
   {
    "level": 4,
    "profBonus": 2,
    "features": [
     "Virtue"
    ],
    "columns": {
     "Sneak Attack": "2d6"
    }
   },
   {
    "level": 5,
    "profBonus": 3,
    "features": [
     "Uncanny Dodge",
     "Reward"
    ],
    "columns": {
     "Sneak Attack": "3d6"
    }
   },
   {
    "level": 6,
    "profBonus": 3,
    "features": [
     "Craft or Virtue"
    ],
    "columns": {
     "Sneak Attack": "3d6"
    }
   },
   {
    "level": 7,
    "profBonus": 3,
    "features": [
     "Treasure Hunter Speciality feature",
     "Reward"
    ],
    "columns": {
     "Sneak Attack": "4d6"
    }
   },
   {
    "level": 8,
    "profBonus": 3,
    "features": [
     "Virtue"
    ],
    "columns": {
     "Sneak Attack": "4d6"
    }
   },
   {
    "level": 9,
    "profBonus": 4,
    "features": [
     "Expertise",
     "Reward"
    ],
    "columns": {
     "Sneak Attack": "5d6"
    }
   },
   {
    "level": 10,
    "profBonus": 4,
    "features": [
     "Reliable Talent"
    ],
    "columns": {
     "Sneak Attack": "5d6"
    }
   }
  ],
  "sneakAttack": [
   1,
   1,
   2,
   2,
   3,
   3,
   4,
   4,
   5,
   5
  ],
  "features": [
   {
    "level": 1,
    "name": "Expertise",
    "description": "Choose two skill or tool proficiencies: double your proficiency bonus with them. Two more at 9th level.",
    "source": "core"
   },
   {
    "level": 1,
    "name": "Sneak Attack",
    "description": "Once per turn deal extra damage (see table) to a creature you hit with a finesse or ranged weapon if you have advantage — or if another enemy of the target is within 5 ft. of it and you don't have disadvantage.",
    "source": "core"
   },
   {
    "level": 2,
    "name": "Cunning Action",
    "description": "Bonus action each turn: Dash, Disengage or Hide.",
    "source": "core"
   },
   {
    "level": 4,
    "name": "Virtue",
    "description": "At 4th, 6th and 8th level take a common or cultural virtue. At 6th you may instead gain a craft slot and a craft.",
    "source": "core"
   },
   {
    "level": 5,
    "name": "Uncanny Dodge",
    "description": "Reaction when an attacker you can see hits you: halve the damage.",
    "source": "core"
   },
   {
    "level": 10,
    "name": "Reliable Talent",
    "description": "On an ability check that adds your proficiency bonus, treat a d20 roll of 9 or lower as a 10.",
    "source": "core"
   }
  ],
  "subclasses": [
   {
    "name": "Burglar",
    "className": "Treasure Hunter",
    "flavor": "The venerable arts of pockets, locks and places you shouldn't be.",
    "source": "core",
    "features": [
     {
      "level": 3,
      "name": "Clever-Handed",
      "description": "Your Cunning Action can also make a Dexterity (Sleight of Hand) check or take the Use an Object action.",
      "source": "core"
     },
     {
      "level": 3,
      "name": "Tree-Climber",
      "description": "Climbing costs no extra movement, and you add your Dexterity modifier to Strength (Athletics) checks to climb or jump and to running-jump distance.",
      "source": "core"
     },
     {
      "level": 7,
      "name": "Quiet-Footed",
      "description": "Advantage on Sleight of Hand and Stealth checks if you move no more than half your speed that turn.",
      "source": "core"
     }
    ]
   },
   {
    "name": "Spy",
    "className": "Treasure Hunter",
    "flavor": "You watch the Enemy's agents among the Free Peoples.",
    "source": "core",
    "features": [
     {
      "level": 3,
      "name": "Cunning Eye",
      "description": "Add your Intelligence modifier to Wisdom (Insight) and (Perception) checks; your Cunning Action can also take the Search action.",
      "source": "core"
     },
     {
      "level": 3,
      "name": "Weak Spot",
      "description": "Bonus action: Investigation or Perception vs the Dexterity (Stealth) of a creature you can see within 30 ft. If you win, you can Sneak Attack it without advantage (but not with disadvantage) for 1 minute or until you use this on another target.",
      "source": "core"
     },
     {
      "level": 7,
      "name": "Sharp-Eyed",
      "description": "Advantage on Investigation and Perception checks if you move no more than half your speed that turn.",
      "source": "core"
     }
    ]
   }
  ],
  "source": "core"
 },
 {
  "name": "Warden",
  "flavor": "A protector of the weak who blends martial prowess with knowledge of the land, often seen as a grim stranger by the very folk they guard.",
  "primaryAbility": [
   "DEX",
   "WIS"
  ],
  "hitDie": 10,
  "savingThrows": [
   "STR",
   "WIS"
  ],
  "proficiencies": {
   "armor": [
    "Light",
    "Medium",
    "Shield"
   ],
   "weapons": [
    "Simple",
    "Martial"
   ],
   "tools": [],
   "skillsChoose": 3,
   "skillsFrom": [
    "Animal Handling",
    "Athletics",
    "Explore",
    "Hunting",
    "Insight",
    "Investigation",
    "Nature",
    "Perception",
    "Travel"
   ]
  },
  "startingEquipment": [
   "(a) hide armour or (b) leather shirt",
   "(a) a martial weapon and a shield or (b) a martial melee weapon and a simple melee weapon",
   "(a) a great bow and 20 arrows or (b) two simple melee weapons"
  ],
  "equipmentChoices": [
   [
    [
     "Hide"
    ],
    [
     "Leather shirt"
    ]
   ],
   [
    [
     "Martial melee weapon",
     "Shield"
    ],
    [
     "Martial melee weapon",
     "Simple melee weapon"
    ]
   ],
   [
    [
     "Great Bow",
     "Arrows (20)",
     "Quiver"
    ],
    [
     "Simple melee weapon",
     "Simple melee weapon"
    ]
   ]
  ],
  "spellcasting": "none",
  "shadowPath": "Path of Despair",
  "virtueLevels": [
   2,
   4,
   6,
   8,
   10
  ],
  "craftOrVirtueLevels": [
   2,
   6,
   10
  ],
  "fightingStyles": [
   "Archery",
   "Duelling",
   "Protection",
   "Two-Weapon Fighting"
  ],
  "favouredFoes": [
   "Beasts",
   "Evil Men",
   "Giants",
   "Monstrosities",
   "Orcs",
   "Undead"
  ],
  "wardedLands": [
   "Arthedain",
   "Cardolan",
   "Enedwaith",
   "Eregion",
   "Lindon",
   "Rhudaur"
  ],
  "subclassLevel": 3,
  "subclassLabel": "Warden Oath",
  "table": [
   {
    "level": 1,
    "profBonus": 2,
    "features": [
     "Shadow-lore",
     "Warded Lands"
    ]
   },
   {
    "level": 2,
    "profBonus": 2,
    "features": [
     "Craft or Virtue",
     "Fighting Style"
    ]
   },
   {
    "level": 3,
    "profBonus": 2,
    "features": [
     "Warden Oath",
     "Rumour of the Earth",
     "Reward"
    ]
   },
   {
    "level": 4,
    "profBonus": 2,
    "features": [
     "Virtue",
     "Warded Lands improvement"
    ]
   },
   {
    "level": 5,
    "profBonus": 3,
    "features": [
     "Extra Attack",
     "Reward"
    ]
   },
   {
    "level": 6,
    "profBonus": 3,
    "features": [
     "Craft or Virtue",
     "Shadow-lore and Warded Lands improvements"
    ]
   },
   {
    "level": 7,
    "profBonus": 3,
    "features": [
     "Warden Oath feature",
     "Reward"
    ]
   },
   {
    "level": 8,
    "profBonus": 3,
    "features": [
     "Virtue",
     "Warded Lands improvement"
    ]
   },
   {
    "level": 9,
    "profBonus": 4,
    "features": [
     "Long Stride",
     "Reward"
    ]
   },
   {
    "level": 10,
    "profBonus": 4,
    "features": [
     "Craft or Virtue",
     "Shadow-lore and Warded Lands improvements"
    ]
   }
  ],
  "favouredFoeCount": [
   1,
   1,
   1,
   1,
   1,
   2,
   2,
   2,
   2,
   3
  ],
  "wardedLandCount": [
   1,
   1,
   1,
   2,
   2,
   3,
   3,
   4,
   4,
   5
  ],
  "features": [
   {
    "level": 1,
    "name": "Shadow-lore",
    "description": "Choose a favoured foe: Beasts, Evil Men, Giants, Monstrosities, Orcs or Undead. Add your Wisdom modifier to damage against them and to saves against their special abilities; advantage on Hunting and Perception checks to find them and on Intelligence checks to recall lore about them; learn one of their languages. Another foe at 6th and 10th level.",
    "source": "core"
   },
   {
    "level": 1,
    "name": "Warded Lands",
    "description": "Choose a warded land (Arthedain, Cardolan, Enedwaith, Eregion, Lindon, Rhudaur). Double proficiency on proficient INT/WIS checks about it. Journeying there: cover several roles without penalty; advantage on fatigue saves if the whole path lies within it; move stealthily at normal pace and ignore difficult-terrain slowdowns; learn the number, size and age of tracks you follow. A Company with a Warden resting there gets Gather Rumours as a free undertaking. Another land at 4th, 6th, 8th and 10th.",
    "source": "core"
   },
   {
    "level": 2,
    "name": "Fighting Style",
    "description": "Choose Archery, Duelling, Protection or Two-Weapon Fighting.",
    "source": "core"
   },
   {
    "level": 2,
    "name": "Virtue",
    "description": "At 2nd, 4th, 6th, 8th and 10th level take a common or cultural virtue. At 2nd, 6th and 10th you may instead gain a craft slot and a craft.",
    "source": "core"
   },
   {
    "level": 3,
    "name": "Rumour of the Earth",
    "description": "Action: sense whether (and which of) your favoured foes are within a number of miles equal to your Wisdom modifier (min 1; doubled in your warded lands) — not where or how many. Once per short or long rest.",
    "source": "core",
    "uses": "1/short"
   },
   {
    "level": 5,
    "name": "Extra Attack",
    "description": "You attack twice when you take the Attack action.",
    "source": "core"
   },
   {
    "level": 9,
    "name": "Long Stride",
    "description": "+10 ft. speed when not in heavy armour, and difficult terrain costs you no extra movement.",
    "source": "core"
   }
  ],
  "subclasses": [
   {
    "name": "Forayer",
    "className": "Warden",
    "flavor": "You patrol ceaselessly to ambush the Enemy's servants.",
    "source": "core",
    "features": [
     {
      "level": 3,
      "name": "Bonus Proficiency",
      "description": "Proficiency in Stealth (double if already proficient, or while in your warded lands).",
      "source": "core"
     },
     {
      "level": 3,
      "name": "Ambusher",
      "description": "Add your Wisdom modifier to initiative; advantage on attacks against creatures that haven't yet taken a turn; and you gain Sneak Attack (1d6, 2d6 from 7th level).",
      "source": "core"
     },
     {
      "level": 7,
      "name": "Harrier",
      "description": "You can take the Hide action as a bonus action.",
      "source": "core"
     }
    ]
   },
   {
    "name": "Hunter",
    "className": "Warden",
    "flavor": "You prey on the enemies of the Free Peoples as a hunter stalks dangerous quarry.",
    "source": "core",
    "features": [
     {
      "level": 3,
      "name": "Bonus Proficiency",
      "description": "Proficiency in Hunting (double if already proficient, or when tracking favoured foes).",
      "source": "core"
     },
     {
      "level": 3,
      "name": "Hunter's Prey",
      "description": "Choose one: Foe-Hammer (once per turn, +1 weapon damage die against a creature below its HP maximum); Goblin-Cleaver (once per turn, a second attack against a different creature within 5 ft. of the first target); Troll-Killer (once per turn, a second attack against the same Large or larger creature).",
      "source": "core"
     },
     {
      "level": 7,
      "name": "Defensive Tactics",
      "description": "Choose one: Multiattack Defence (after a creature attacks you, add your proficiency bonus to AC against it for the rest of the turn); Stout Resistance (proficiency in a saving throw of your choice); Swift to Fly (Disengage as a bonus action).",
      "source": "core"
     }
    ]
   }
  ],
  "source": "core"
 }
];
window.LOTR_CALLINGS = LOTR_CALLINGS;
var LOTR_CONDITIONS = [
 {
  "name": "Blinded",
  "description": "You can't see; checks needing sight fail. Attacks against you have advantage; your attacks have disadvantage."
 },
 {
  "name": "Charmed",
  "description": "You can't attack the charmer or target it with harmful effects; it has advantage on social checks with you."
 },
 {
  "name": "Deafened",
  "description": "You can't hear; checks needing hearing fail."
 },
 {
  "name": "Frightened",
  "description": "Disadvantage on ability checks and attacks while the source of fear is in sight; you can't willingly move closer to it."
 },
 {
  "name": "Grappled",
  "description": "Speed 0. Ends if the grappler is incapacitated or you are moved out of its reach."
 },
 {
  "name": "Incapacitated",
  "description": "You can't take actions or reactions."
 },
 {
  "name": "Invisible",
  "description": "You can't be seen without special senses; attacks against you have disadvantage and yours have advantage."
 },
 {
  "name": "Paralyzed",
  "description": "Incapacitated; can't move or speak. Fail STR and DEX saves. Attacks against you have advantage; hits within 5 ft. are critical."
 },
 {
  "name": "Petrified",
  "description": "Turned to stone: incapacitated, unaware, resistant to all damage, immune to poison and disease."
 },
 {
  "name": "Poisoned",
  "description": "Disadvantage on attack rolls and ability checks."
 },
 {
  "name": "Prone",
  "description": "Crawl only; disadvantage on attacks. Melee attacks within 5 ft. have advantage against you, ranged attacks disadvantage."
 },
 {
  "name": "Restrained",
  "description": "Speed 0; attacks against you have advantage, yours have disadvantage; disadvantage on DEX saves."
 },
 {
  "name": "Stunned",
  "description": "Incapacitated, can't move, speak only falteringly. Fail STR and DEX saves; attacks against you have advantage."
 },
 {
  "name": "Unconscious",
  "description": "Incapacitated, prone, unaware; drop what you hold. Fail STR and DEX saves; attacks have advantage and hits within 5 ft. are critical."
 },
 {
  "name": "Exhaustion",
  "description": "Six cumulative levels: 1 disadvantage on checks · 2 speed halved · 3 disadvantage on attacks and saves · 4 HP max halved · 5 speed 0 · 6 death. A long rest removes one level."
 },
 {
  "name": "Miserable",
  "lotr": true,
  "description": "Shadow points ≥ half your Wisdom score (rounded up). The Company's Fellowship rating drops by 1 while you are miserable, and any d20 roll of 1 or 2 on an ability check, attack roll or saving throw is an automatic failure."
 },
 {
  "name": "Anguished",
  "lotr": true,
  "description": "Shadow points ≥ your full Wisdom score. Disadvantage on all ability checks, attack rolls and saving throws. Only a bout of madness (during the current Adventuring Phase) clears it."
 }
];
window.LOTR_CONDITIONS = LOTR_CONDITIONS;
var LOTR_COUNCIL = {
 "sequence": [
  "1. Introduction — the spokesperson makes a DC 15 Charisma check. Success: one failed Interaction check may be rerolled (two if by 5+). Failure by 5+: disadvantage on all Interaction checks.",
  "2. Set required successes — Reasonable request 1, Bold 2, Outrageous 3.",
  "3. Interaction — checks against the audience's DC: Friendly 10, Open 15, Reluctant 20. Speeches that touch what matters to the audience gain advantage."
 ],
 "intro": [
  {
   "skill": "Intimidation",
   "use": "Impress quickly or set the terms — but reveal much about the Company."
  },
  {
   "skill": "Persuasion",
   "use": "Smooth the way before asking for help; best with friends, may sound false to the unfriendly."
  },
  {
   "skill": "Deception",
   "use": "Learn much while revealing little — a poor showing breeds mistrust."
  }
 ],
 "interaction": [
  {
   "skill": "Deception",
   "counts": true,
   "note": "Favours or information by half-truths. May be a Misdeed; any failure is a Disaster."
  },
  {
   "skill": "Intimidation",
   "counts": true,
   "note": "Rouse a crowd or a downcast leader — the aim must be obvious or it doesn't count."
  },
  {
   "skill": "Persuasion",
   "counts": true,
   "note": "Win minds — can be used discreetly in any interaction."
  },
  {
   "skill": "Performance",
   "counts": false,
   "note": "Doesn't count as a success, but gives +5 (+10 on a magical success) to the Company's next check."
  },
  {
   "skill": "Riddle",
   "counts": false,
   "note": "Play the riddle-game (counts) or glean tidbits (+5 / +10 to the next check)."
  },
  {
   "skill": "Insight",
   "counts": false,
   "note": "Read the audience: +5 (+10 on a magical success) to the next check."
  }
 ],
 "outcomes": [
  {
   "name": "Success",
   "text": "Reach the required successes — the Company gets what it asked for."
  },
  {
   "name": "Failure, or Success with Woe",
   "text": "A failed check (after rerolls): accept refusal, or with the Loremaster's approval succeed at a steeper price — less than hoped, or new enemies."
  },
  {
   "name": "Disaster",
   "text": "A check fails by 10+ (or by 5+ on an outrageous request): the Company is seen as a threat — imprisonment or attack may follow."
  }
 ],
 "attitudes": [
  {
   "name": "Friendly",
   "dc": 10
  },
  {
   "name": "Open",
   "dc": 15
  },
  {
   "name": "Reluctant",
   "dc": 20
  }
 ],
 "requests": [
  {
   "name": "Reasonable",
   "successes": 1
  },
  {
   "name": "Bold",
   "successes": 2
  },
  {
   "name": "Outrageous",
   "successes": 3
  }
 ],
 "xp": [
  {
   "audience": "Friendly",
   "reasonable": "25 (0)",
   "bold": "50 (0)",
   "outrageous": "100 (25)"
  },
  {
   "audience": "Open",
   "reasonable": "100 (10)",
   "bold": "200 (25)",
   "outrageous": "450 (100)"
  },
  {
   "audience": "Reluctant",
   "reasonable": "200 (50)",
   "bold": "700 (100)",
   "outrageous": "1,800 (450)"
  }
 ],
 "xpNote": "Split among all heroes present; only when the council carried real risk. Bracketed values are for a success with woe."
};
window.LOTR_COUNCIL = LOTR_COUNCIL;
var LOTR_CRAFTS = [
 {
  "name": "Beast-Craft",
  "description": "You can speak with beasts and learn what they have seen in the last day, or ask small favours. Action + craft slot: Wisdom (Animal Handling) vs a beast's Wisdom (Insight) within 30 ft.; win and it is charmed 24 hours (a magical success on a CR 1/8 or lower beast charms it permanently until dismissed). Beasts with INT 4+ automatically win. One extra beast at 5th level, two at 9th."
 },
 {
  "name": "Hand-Craft",
  "description": "During a Fellowship Phase, spend a craft slot to improve one non-magical item you own whose tools you're proficient with (two items if you have double proficiency). Armour/shield: gains a reward (+1 AC at 5th level). Weapon: gains a reward (+1 attack and damage at 5th level; a magical success can make it magical). Other item: grants a Blessing die on checks with a related skill (a magical success can make it a Marvellous Artefact). The slot is regained only at the next Fellowship Phase, when you may withdraw the upgrade."
 },
 {
  "name": "Leech-Craft",
  "description": "Action + craft slot: tend a creature within 5 ft. with a DC 10 Intelligence (Medicine) check (spend a healer's kit use to treat the d20 as 10). On a success it regains HP equal to your result − 10 (minimum 1). From 5th level a success may instead cure one disease or neutralise one poison."
 },
 {
  "name": "Rune-Craft",
  "description": "You read and write runes and can pass secret messages. After a rest, spend a slot and make an Intelligence (Old Lore) check (DC 10 Marvellous Artefact, 15 Wondrous Item, 20 Famous Weapon/Armour) to learn all of an item's qualities and curses. During a Fellowship Phase spend a slot to inscribe runes on a non-magical item (two at 5th): +1 to saving throws while held/worn, or for a weapon/shield a bane (Evil Men, Orcs, Spiders, Trolls, Undead or Wolves) that doubles its rewards' effects against bane creatures."
 },
 {
  "name": "Song-Craft",
  "description": "Action + craft slot: Charisma (Performance) contested by the Intelligence (Riddle) of chosen creatures within 30 ft. who can hear you. For each you beat, choose: suppress charmed/frightened until the end of your next turn; make it indifferent to creatures of your choice (and worse at noticing others); or a d4 it adds (if friendly) or subtracts (if hostile) on attacks and saves. From 5th level a bonus action each turn extends the effects, up to 1 minute."
 },
 {
  "name": "Speech-Craft",
  "description": "You study Sindarin and Quenya: advantage on Charisma checks with Elves. Action + craft slot vs a non-Elf, non-Wizard creature within 30 ft.: either Charisma (Intimidation) contested by its Intimidation to frighten it for 1 minute, or Intimidation/Persuasion vs its Insight to speak a one-word command (Fall! Flee! Halt!) it obeys next turn. One extra target at 5th level, two at 9th. Commands may count as a Misdeed."
 },
 {
  "name": "Weapon-Craft",
  "description": "Choose a weapon type; gain proficiency. With a finesse or ranged weapon of that type you may use INT, WIS or CHA for attack and damage. When you hit with it you can spend a craft slot to roll extra weapon damage dice equal to your proficiency bonus."
 },
 {
  "name": "Wood-Craft",
  "description": "You may use Intelligence (Nature) in place of Wisdom (Explore) or (Hunting). Spend 1 hour + a craft slot on a Nature, Explore or Hunting check vs the local terrain DC (disadvantage in autumn/winter). Success: give (result − DC, min 1) creatures +5 Stealth for 1 hour, or +5 passive Perception for 8 hours (+10 at 5th level; a magical success adds no tracks / 60 ft. tremorsense); or forage (result − DC) lb of food and gallons of water."
 }
];
window.LOTR_CRAFTS = LOTR_CRAFTS;
var LOTR_CULTURES = [
 {
  "name": "Bardings",
  "flavor": "Northmen of noble blood from Dale in Wilderland, who rebuilt their city after Bard slew the Dragon and now trade far and wide. Adventurers often carry gear of superior make; they favour the sword and, after their King, the bow.",
  "size": "Medium",
  "speed": 30,
  "darkvision": 0,
  "creatureType": "Humanoid",
  "asi": {
   "STR": 1,
   "CHA": 1
  },
  "age": "18–40",
  "standardOfLiving": "Prosperous",
  "languages": [
   "Westron",
   "Dalish"
  ],
  "startingVirtue": true,
  "traits": [
   {
    "name": "Ability Score Increase",
    "description": "Strength +1 and Charisma +1."
   },
   {
    "name": "Adventuring Age",
    "description": "18–40. Bardings seldom set out before 18 and usually go home to their families in their forties."
   },
   {
    "name": "Size & Speed",
    "description": "Medium, 5–6 ft. tall. Walking speed 30 ft."
   },
   {
    "name": "Archers of Dale",
    "description": "You are proficient with the great bow."
   },
   {
    "name": "Starting Virtue",
    "description": "You gain one cultural virtue of your choice (Virtues of the Bardings)."
   },
   {
    "name": "Trading People",
    "description": "You are proficient in Persuasion."
   },
   {
    "name": "Languages",
    "description": "Westron and Dalish (an archaic form of the Common Speech)."
   },
   {
    "name": "Standard of Living",
    "description": "Prosperous."
   }
  ],
  "grants": {
   "skills": [
    "Persuasion"
   ],
   "weapons": [
    "Great Bow"
   ]
  },
  "names": {
   "female": "Aldrif, Asfrid, Bera, Dagny, Eydis, Frida, Gerda, Gunnhild, Halla, Hild, Ingrith, Kelda, Ragna, Runa, Signy, Solveig, Thora, Una, Vigdis, Walda",
   "male": "Aegir, Arn, Brandulf, Erland, Gautarr, Hjalmar, Ingolf, Kol, Leiknir, Lodin, Magni, Munan, Oddmarr, Ottarr, Runolf, Sigmund, Skefill, Steinarr, Ulfarr, Valbrand",
   "family": "Patronymic — e.g. Lifstan, son of Leiknir."
  },
  "lineages": [],
  "source": "core"
 },
 {
  "name": "Dwarves of Durin's Folk",
  "flavor": "An ancient, proud and dwindling people who have lately regained some of their greatness, with a King once more under the Lonely Mountain. Many tramp the East-West Road between Erebor and the Blue Mountains. They favour axes and swords; their eastern kin swing great mattocks.",
  "size": "Medium",
  "speed": 25,
  "darkvision": 0,
  "creatureType": "Humanoid",
  "asi": {
   "CON": 2
  },
  "age": "50–100",
  "standardOfLiving": "Prosperous",
  "languages": [
   "Westron",
   "Khuzdul"
  ],
  "startingVirtue": false,
  "traits": [
   {
    "name": "Ability Score Increase",
    "description": "Constitution +2."
   },
   {
    "name": "Adventuring Age",
    "description": "50–100."
   },
   {
    "name": "Size & Speed",
    "description": "Medium, 4–5 ft. tall. Walking speed 25 ft."
   },
   {
    "name": "Axes of the Dwarves",
    "description": "You are proficient with the battle axe, great axe and mattock."
   },
   {
    "name": "Endurance of the Dwarves",
    "description": "Your hit point maximum increases by 1, and by 1 more each time you gain a level."
   },
   {
    "name": "Make Light of Burdens",
    "description": "Armour never gives you disadvantage on fatigue saving throws, and your carrying capacity (including encumbrance thresholds and push/drag/lift) is doubled."
   },
   {
    "name": "Tool Proficiency",
    "description": "Choose one: jeweller's tools, mason's tools, or smith's tools."
   },
   {
    "name": "Languages",
    "description": "Westron and Khuzdul, the secret tongue of the Dwarves."
   },
   {
    "name": "Standard of Living",
    "description": "Prosperous."
   }
  ],
  "grants": {
   "weapons": [
    "Axe, Battle",
    "Axe, Great",
    "Mattock"
   ],
   "hpPerLevel": 1,
   "toolChoice": [
    "Jeweller's tools",
    "Mason's tools",
    "Smith's tools"
   ]
  },
  "names": {
   "female": "Adís, Agda, Bersa, Birna, Dagrún, Dís, Edda, Fenja, Hadda, Ida, Jóra, Kára, Mist, Oda, Ósk, Rán, Tóra, Yrr",
   "male": "Anar, Beli, Bláin, Borin, Burin, Farin, Flói, Frár, Frerin, Gróin, Hanar, Lóni, Náli, Nár, Nói, Núr, Póri, Regin, Vidar",
   "family": "Dwarves keep a secret true name and take an outer name; great deeds may earn a title (Oakenshield, Ironfoot)."
  },
  "lineages": [
   {
    "name": "Dwarf of Erebor",
    "asi": {
     "CHA": 1
    },
    "traits": [
     {
      "name": "Ability Score Increase",
      "description": "Charisma +1."
     },
     {
      "name": "Wrights of the Mountain",
      "description": "Gain proficiency with jeweller's, mason's or smith's tools (if already proficient, double your proficiency bonus with them). On INT checks about the origin of jewellery, metal-work or stone-work you count as proficient in Old Lore with double proficiency."
     },
     {
      "name": "Extra Language",
      "description": "Dalish."
     }
    ]
   },
   {
    "name": "Dwarf of the Blue Mountains",
    "asi": {
     "INT": 1
    },
    "traits": [
     {
      "name": "Ability Score Increase",
      "description": "Intelligence +1."
     },
     {
      "name": "Songs of the Halls",
      "description": "Proficiency in Old Lore and with one musical instrument."
     }
    ],
    "grants": {
     "skills": [
      "Old Lore"
     ]
    }
   },
   {
    "name": "Dwarf of the Iron Hills",
    "asi": {
     "STR": 1
    },
    "traits": [
     {
      "name": "Ability Score Increase",
      "description": "Strength +1."
     },
     {
      "name": "Shod with Iron",
      "description": "Proficiency with all armour and shields."
     }
    ],
    "grants": {
     "armor": [
      "Light",
      "Medium",
      "Heavy",
      "Shield"
     ]
    }
   },
   {
    "name": "Wandering Dwarf",
    "asi": {
     "WIS": 1
    },
    "traits": [
     {
      "name": "Ability Score Increase",
      "description": "Wisdom +1."
     },
     {
      "name": "Wandering People",
      "description": "Proficiency in Travel."
     }
    ],
    "grants": {
     "skills": [
      "Travel"
     ]
    }
   }
  ],
  "source": "core"
 },
 {
  "name": "Elves of Lindon",
  "flavor": "The Firstborn of the Grey Havens under Círdan the Shipwright, dwelling by the western coasts in the fading years of their kind. Wandering companies are sometimes seen on the roads beyond the Tower Hills. They favour bows and spears, many carry swords, and some keep to the old tradition of the axe.",
  "size": "Medium",
  "speed": 30,
  "darkvision": 0,
  "creatureType": "Humanoid",
  "asi": {
   "WIS": 2
  },
  "age": "100–500",
  "standardOfLiving": "Frugal",
  "languages": [
   "Westron",
   "Sindarin"
  ],
  "startingVirtue": false,
  "traits": [
   {
    "name": "Ability Score Increase",
    "description": "Wisdom +2."
   },
   {
    "name": "Adventuring Age",
    "description": "100–500. Elves older than 300 are rare on the road — the sea-longing takes them."
   },
   {
    "name": "Size & Speed",
    "description": "Medium, over 6 ft. tall and slender. Walking speed 30 ft."
   },
   {
    "name": "Elvish Dreams",
    "description": "You don't sleep; 4 hours of semiconscious meditation gives the benefit of 8 hours' sleep."
   },
   {
    "name": "Elven-skill",
    "description": "When you are not miserable and make an ability check that adds your proficiency bonus, you can obtain a magical success. Uses = proficiency bonus; regain on a long rest."
   },
   {
    "name": "Immortal Folk",
    "description": "Immune to ageing and disease."
   },
   {
    "name": "Keen Eyes of the Elves",
    "description": "Proficiency in Perception; dim light doesn't impose disadvantage on your sight-based Wisdom (Perception) checks."
   },
   {
    "name": "Languages",
    "description": "Westron and Sindarin."
   },
   {
    "name": "Standard of Living",
    "description": "Frugal."
   }
  ],
  "grants": {
   "skills": [
    "Perception"
   ]
  },
  "names": {
   "female": "Aranel, Arbereth, Calanril, Celenneth, Elnîth, Eraniel, Finduilas, Gilraeth, Idril, Ioreth, Lothíriel, Luindîs, Meneloth, Moriel, Narieth, Tarandîs",
   "male": "Amras, Beleganor, Belegon, Calanhir, Carmagor, Dagorhir, Durandir, Edrahil, Fincalan, Fuindor, Galdor, Hallas, Ithildir, Linaith, Mablin, Malanor, Nauros, Orgalad, Pelegorn",
   "family": "Elves bear Sindarin names."
  },
  "lineages": [
   {
    "name": "Elves of Lindon",
    "asi": {
     "DEX": 1,
     "INT": 1
    },
    "traits": [
     {
      "name": "Ability Score Increase",
      "description": "Dexterity +1 and Intelligence +1."
     },
     {
      "name": "Elven-lore",
      "description": "Proficiency in one of Nature, Old Lore or Performance."
     },
     {
      "name": "Shipwrights and Singers",
      "description": "Proficiency with carpenter's tools, water vehicles, or one musical instrument (your choice)."
     }
    ]
   }
  ],
  "source": "core"
 },
 {
  "name": "Hobbits of the Shire",
  "flavor": "A small, merry folk who love tradition and respectability — though since Mr Bilbo Baggins came home, a bolder sort slip away each year to see Elves and mountains. Gentle-seeming but surprisingly tough; when they must fight they choose short swords and hunting bows.",
  "size": "Small",
  "speed": 25,
  "darkvision": 0,
  "creatureType": "Humanoid",
  "asi": {
   "DEX": 2
  },
  "age": "25–60",
  "standardOfLiving": "Common",
  "languages": [
   "Westron"
  ],
  "startingVirtue": false,
  "traits": [
   {
    "name": "Ability Score Increase",
    "description": "Dexterity +2."
   },
   {
    "name": "Adventuring Age",
    "description": "25–60 (coming of age is 33; a reckless tween may go sooner)."
   },
   {
    "name": "Size & Speed",
    "description": "Small, about 3 ft. tall. Walking speed 25 ft."
   },
   {
    "name": "Hobbit Elusiveness",
    "description": "Proficiency in Stealth."
   },
   {
    "name": "Hobbit-sense",
    "description": "Advantage on Intelligence, Wisdom and Charisma saving throws against Shadow."
   },
   {
    "name": "Pipe-weed Lore",
    "description": "Proficiency with pipes."
   },
   {
    "name": "Unobtrusive",
    "description": "You can move through the space of any creature larger than you."
   },
   {
    "name": "Languages",
    "description": "Westron, with a few words of a forgotten older tongue."
   },
   {
    "name": "Standard of Living",
    "description": "Common."
   }
  ],
  "grants": {
   "skills": [
    "Stealth"
   ],
   "tools": [
    "Pipe"
   ]
  },
  "names": {
   "female": "Adaldrida, Amaranth, Asphodel, Belba, Bell, Camellia, Daisy, Eglantine, Estella, Lily, Marigold, May, Melilot, Myrtle, Pearl, Peony, Primula, Rosamunda, Ruby",
   "male": "Andwise, Berilac, Bungo, Doderic, Dudo, Fastred, Ferumbras, Folco, Griffo, Halfred, Isembold, Longo, Marmadas, Mungo, Odo, Otho, Posco, Robin, Sadoc, Tobold, Tolman",
   "family": "Baggins, Boffin, Bolger, Bracegirdle, Brandybuck, Brownlock, Burrows, Cotton, Gamgee, Goodbody, Grubb, Hornblower, Maggot, Proudfoot, Sackville, Smallburrow, Took"
  },
  "lineages": [
   {
    "name": "Fallohide",
    "asi": {
     "CHA": 1
    },
    "traits": [
     {
      "name": "Ability Score Increase",
      "description": "Charisma +1."
     },
     {
      "name": "Skill in Language and Song",
      "description": "Proficiency with calligrapher's supplies, cartographer's tools, or a musical instrument (your choice)."
     }
    ]
   },
   {
    "name": "Harfoot",
    "asi": {
     "WIS": 1
    },
    "traits": [
     {
      "name": "Ability Score Increase",
      "description": "Wisdom +1."
     },
     {
      "name": "Skilful with Tools",
      "description": "Proficiency with a herbalism kit, mason's tools, or weaver's tools (your choice)."
     }
    ]
   },
   {
    "name": "Stoor",
    "asi": {
     "CON": 1
    },
    "traits": [
     {
      "name": "Ability Score Increase",
      "description": "Constitution +1."
     },
     {
      "name": "Riverside Dweller",
      "description": "Proficiency with carpenter's tools, water vehicles, or woodcarver's tools (your choice)."
     }
    ]
   }
  ],
  "source": "core"
 },
 {
  "name": "Men of Bree",
  "flavor": "Descendants of the oldest Men of Eriador, living in the four villages around Bree-hill where the Great Road meets the Greenway. Short, stocky, cheerful and shrewd; not warlike, they favour simple weapons that began life as tools and hunting gear.",
  "size": "Medium",
  "speed": 30,
  "darkvision": 0,
  "creatureType": "Humanoid",
  "asi": {
   "WIS": 1,
   "CHA": 1
  },
  "age": "18–40",
  "standardOfLiving": "Common",
  "languages": [
   "Westron"
  ],
  "startingVirtue": true,
  "traits": [
   {
    "name": "Ability Score Increase",
    "description": "Wisdom +1 and Charisma +1."
   },
   {
    "name": "Adventuring Age",
    "description": "18–40."
   },
   {
    "name": "Size & Speed",
    "description": "Medium, rarely much over 5 ft. and broad. Walking speed 30 ft."
   },
   {
    "name": "Pipe-weed Lore",
    "description": "Proficiency with pipes."
   },
   {
    "name": "See Through a Brick Wall in Time",
    "description": "Proficiency in Insight."
   },
   {
    "name": "Starting Virtue",
    "description": "You gain one cultural virtue of your choice (Virtues of the Men of Bree)."
   },
   {
    "name": "Languages",
    "description": "Westron (in the local dialect)."
   },
   {
    "name": "Standard of Living",
    "description": "Common."
   }
  ],
  "grants": {
   "skills": [
    "Insight"
   ],
   "tools": [
    "Pipe"
   ]
  },
  "names": {
   "female": "Daisy, Emma, Etta, Fay, Fern, Flora, Gert, Holly, Lily, Myrtle, Poppy, Rose, Sage, Tilly, Violet",
   "male": "Alfred, Artie, Bill, Bob, Carl, Ed, Fred, Giles, Harry, Herb, Larry, Nob, Oswald, Percy, Perry, Sid, Tom",
   "family": "Appledore, Asterfire, Bellsap, Butterbur, Cherryborn, Ferny, Foxglow, Goatleaf, Heathertoes, Mugworts, Oakstout, Pickthorn, Rushlight, Sweetroot, Thistlewool, Wayward"
  },
  "lineages": [],
  "source": "core"
 },
 {
  "name": "Rangers of the North",
  "flavor": "The last Dúnedain of the North, heirs of Arnor, who walk in disguise among the ruins of their lost kingdom guarding the folk of Eriador from things that come out of the dark. Tall, grim, weather-worn, wise beyond their years; grey or green cloaks over worn helms.",
  "size": "Medium",
  "speed": 35,
  "darkvision": 0,
  "creatureType": "Humanoid",
  "asi": {
   "STR": 1,
   "CON": 1,
   "WIS": 1
  },
  "asiChoice": {
   "count": 1,
   "amount": 1
  },
  "age": "20–50",
  "standardOfLiving": "Frugal",
  "languages": [
   "Westron",
   "Sindarin"
  ],
  "startingVirtue": false,
  "traits": [
   {
    "name": "Ability Score Increase",
    "description": "Strength, Constitution and Wisdom +1 each, then +1 to one ability of your choice."
   },
   {
    "name": "Adventuring Age",
    "description": "20–50."
   },
   {
    "name": "Size & Speed",
    "description": "Medium, well over 6 ft. Walking speed 35 ft. (long-shanked Dúnedain)."
   },
   {
    "name": "Wandering Folk",
    "description": "Proficiency in two of: Explore, Hunting, Old Lore, Perception, Stealth, Travel."
   },
   {
    "name": "Languages",
    "description": "Westron and Sindarin."
   },
   {
    "name": "Standard of Living",
    "description": "Frugal."
   }
  ],
  "grants": {
   "skillChoice": {
    "count": 2,
    "from": [
     "Explore",
     "Hunting",
     "Old Lore",
     "Perception",
     "Stealth",
     "Travel"
    ]
   }
  },
  "names": {
   "female": "Anwen, Arbereth, Baraniel, Calanril, Elnîth, Finduilas, Gilraen, Idril, Ioreth, Ivorwen, Lothíriel, Meneloth, Morwen, Narniel, Tarandîs",
   "male": "Adrahil, Amlaith, Arvegil, Baranor, Belecthor, Bergil, Celepharn, Cirion, Damrod, Dírhael, Eradan, Forlong, Hallas, Hirluin, Ingold, Malvegil, Ohtar, Orodreth, Tarannon, Targon",
   "family": "Rangers give their children Sindarin names."
  },
  "lineages": [],
  "source": "core"
 }
];
window.LOTR_CULTURES = LOTR_CULTURES;
var LOTR_DISTINCTIVE_FEATURES = [
 "Bold",
 "Cunning",
 "Eager",
 "Fair-spoken",
 "Faithful",
 "Fierce",
 "Generous",
 "Honourable",
 "Inquisitive",
 "Lordly",
 "Merry",
 "Patient",
 "Proud",
 "Rustic",
 "Secretive",
 "Stern",
 "Subtle",
 "True-hearted",
 "Wary",
 "Wilful"
];
window.LOTR_DISTINCTIVE_FEATURES = LOTR_DISTINCTIVE_FEATURES;
var LOTR_ENCHANTED_REWARDS = [
 {
  "name": "Ancient Close Fitting",
  "craftsmanship": [
   "Elven",
   "Dwarven"
  ],
  "item": "Armour",
  "bane": false,
  "description": "+1 AC; critical hits against you become normal hits."
 },
 {
  "name": "Ancient Cunning Make",
  "craftsmanship": [
   "Elven",
   "Dwarven"
  ],
  "item": "Armour",
  "bane": false,
  "description": "+1 AC; half weight; no fatigue disadvantage (or +1 maximum Dexterity bonus)."
 },
 {
  "name": "Superior Fell",
  "craftsmanship": [
   "Elven",
   "Númenórean"
  ],
  "item": "Any weapon",
  "bane": "if Númenórean",
  "description": "+1 attack and damage; two extra damage dice on a critical (three if Elven, four against bane creatures if Númenórean)."
 },
 {
  "name": "Superior Grievous",
  "craftsmanship": [
   "Dwarven",
   "Númenórean"
  ],
  "item": "Any weapon",
  "bane": "if Númenórean",
  "description": "+1 attack and damage (+2 damage if Dwarven, +3 against bane creatures if Númenórean)."
 },
 {
  "name": "Superior Keen",
  "craftsmanship": [
   "Dwarven",
   "Elven"
  ],
  "item": "Any weapon",
  "bane": "if Elven",
  "description": "+1 attack and damage; critical on 19–20 (18–20 against bane creatures if Elven)."
 },
 {
  "name": "Superior Reinforced",
  "craftsmanship": [
   "Any"
  ],
  "item": "Shield",
  "bane": "if Númenórean",
  "description": "+1 AC on top of the shield (+2 if Dwarven or Elven, +3 against bane creatures if Númenórean)."
 },
 {
  "name": "Biting Dart",
  "craftsmanship": [
   "Elven"
  ],
  "item": "Ranged weapon",
  "bane": true,
  "description": "+1 attack and damage; a bane creature you hit has disadvantage on attacks until the end of your next turn."
 },
 {
  "name": "Cleaving",
  "craftsmanship": [
   "Any"
  ],
  "item": "Melee weapon",
  "bane": false,
  "description": "Make one melee attack with it as a bonus action each turn."
 },
 {
  "name": "Flame of Hope",
  "craftsmanship": [
   "Dwarven"
  ],
  "item": "Melee weapon",
  "bane": false,
  "description": "While drawn, you and friends within 10 ft. add your Charisma modifier (min +1) to saving throws in combat."
 },
 {
  "name": "Foe-Slaying",
  "craftsmanship": [
   "Elven",
   "Númenórean"
  ],
  "item": "Any weapon",
  "bane": true,
  "description": "Hitting a bane creature adds one extra weapon damage die (two if Elven)."
 },
 {
  "name": "Gleam of Terror",
  "craftsmanship": [
   "Dwarven"
  ],
  "item": "Melee weapon",
  "bane": false,
  "description": "+1 attack and damage; bonus action to shed dim sunlight and deal radiant damage until your next turn."
 },
 {
  "name": "Hammering",
  "craftsmanship": [
   "Any"
  ],
  "item": "Melee weapon",
  "bane": false,
  "description": "+1 attack and damage; a creature you hit must make a Strength save (DC 8 + PB + STR) or fall prone."
 },
 {
  "name": "Hollow Steel",
  "craftsmanship": [
   "Númenórean"
  ],
  "item": "Ranged weapon",
  "bane": false,
  "description": "Make one ranged attack with it as a bonus action each turn."
 },
 {
  "name": "Luminescence",
  "craftsmanship": [
   "Elven"
  ],
  "item": "Melee weapon",
  "bane": true,
  "description": "+1 attack and damage; glows when bane creatures are within 500 ft. — while it glows, you and allies within 30 ft. who can see you can't be surprised by them and have advantage on initiative."
 },
 {
  "name": "Mithril Armour",
  "craftsmanship": [
   "Dwarven"
  ],
  "item": "Mail-shirt",
  "bane": false,
  "description": "Half weight, wearable under clothes; base AC 14 + Dex (max 4) and counts as light armour for proficiency."
 },
 {
  "name": "Rune-Scored Armour",
  "craftsmanship": [
   "Dwarven"
  ],
  "item": "Armour",
  "bane": false,
  "description": "+1 AC and +1 to saving throws."
 },
 {
  "name": "Rune-Scored Shield",
  "craftsmanship": [
   "Dwarven"
  ],
  "item": "Shield",
  "bane": false,
  "description": "+1 AC (on top of the shield) and +1 to saving throws."
 },
 {
  "name": "Rune-Scored Weapon",
  "craftsmanship": [
   "Dwarven"
  ],
  "item": "Melee weapon",
  "bane": false,
  "description": "+1 attack and damage; +1 to saving throws while carried."
 },
 {
  "name": "Straight Flight",
  "craftsmanship": [
   "Any"
  ],
  "item": "Ranged weapon",
  "bane": false,
  "description": "+1 attack and damage; ignore all but total cover and no disadvantage at long range."
 }
];
window.LOTR_ENCHANTED_REWARDS = LOTR_ENCHANTED_REWARDS;
var LOTR_EXPENSES = [
 {
  "item": "Ale or mead, cup",
  "cost": "1 c"
 },
 {
  "item": "Ale or mead, jug",
  "cost": "6 c"
 },
 {
  "item": "Bread, loaf",
  "cost": "1 c"
 },
 {
  "item": "Cheese, hunk",
  "cost": "5 c"
 },
 {
  "item": "Feast (per person)",
  "cost": "10 s"
 },
 {
  "item": "Meat, chunk",
  "cost": "3 c"
 },
 {
  "item": "Inn stay, Frugal (per person/day)",
  "cost": "1 c"
 },
 {
  "item": "Inn stay, Common (per room/day)",
  "cost": "5 c"
 },
 {
  "item": "Inn stay, Prosperous (per room/day)",
  "cost": "8 c"
 },
 {
  "item": "Inn stay, Rich (per room/day)",
  "cost": "2 s"
 },
 {
  "item": "Inn stay, Very Rich (per room/day)",
  "cost": "4 s"
 },
 {
  "item": "Meals, Frugal (per day)",
  "cost": "1 c"
 },
 {
  "item": "Meals, Common (per day)",
  "cost": "3 c"
 },
 {
  "item": "Meals, Prosperous (per day)",
  "cost": "5 c"
 },
 {
  "item": "Meals, Rich (per day)",
  "cost": "8 c"
 },
 {
  "item": "Meals, Very Rich (per day)",
  "cost": "2 s"
 },
 {
  "item": "Stabling, Common (per mount/day, with feed)",
  "cost": "5 c"
 },
 {
  "item": "Wine, cup",
  "cost": "2 c"
 },
 {
  "item": "Wine, cup (Elven or Dorwinion)",
  "cost": "2 s"
 },
 {
  "item": "Wine, bottle (Elven or Dorwinion)",
  "cost": "10 s"
 }
];
window.LOTR_EXPENSES = LOTR_EXPENSES;
var LOTR_EYE = {
 "starting": [
  {
   "company": "Only Hobbits or Men",
   "score": 0
  },
  {
   "company": "One or more Dwarves",
   "score": 1
  },
  {
   "company": "One or more Dúnedain or Elves",
   "score": 2
  },
  {
   "company": "One or more High Elves",
   "score": 3
  }
 ],
 "startingNote": "Use the highest applicable row, +1 per hero with proficiency bonus +4 or more, +1 per Famous Weapon or Armour carried. Recalculate at the start of each Adventuring Phase.",
 "increases": [
  "+1 whenever an ability check's d20 shows a 1 (more in grave moments; none in truly safe places).",
  "+X whenever a hero gains X Shadow points.",
  "Blatant magic by a Wizard or similar: +1 lesser effect, +2 major spell, +3 powerful spell."
 ],
 "thresholds": [
  {
   "region": "Border Land",
   "hunt": 18
  },
  {
   "region": "Wild Land",
   "hunt": 16
  },
  {
   "region": "Dark Land",
   "hunt": 14
  }
 ],
 "modifiers": [
  {
   "mod": "+4",
   "text": "Protected by the blessing of a Wizard or other great power"
  },
  {
   "mod": "+2",
   "text": "False names, little-used paths, or other care to stay unobtrusive"
  },
  {
   "mod": "−2",
   "text": "Great renown in the area from an exceptional deed"
  },
  {
   "mod": "−4",
   "text": "The Enemy is actively hunting them, or knows their mission"
  }
 ],
 "revelationNote": "When Eye Awareness reaches the Hunt threshold the Company is revealed: run a Revelation episode that grows naturally out of play and smells of dark forces, then reset Awareness to its starting value.",
 "revelations": [
  {
   "name": "Out of the Frying Pan…",
   "text": "Every check to resolve the current situation has disadvantage — a journey leg, or the next encounter."
  },
  {
   "name": "Láthspell",
   "text": "Their arrival is taken as ill news: a council's request is one step harder (reasonable → bold → outrageous)."
  },
  {
   "name": "Do Not Tempt Me!",
   "text": "A hero gains 3 Shadow from Greed, shaped by their Shadow Path."
  },
  {
   "name": "Lies and Threats",
   "text": "An ally turns enemy — by coercion, betrayal or sorcery."
  },
  {
   "name": "A Weariness of the Heart",
   "text": "Every hero gains a level of exhaustion until the Loremaster lifts it."
  },
  {
   "name": "A Will That Lends Speed",
   "text": "A prisoner or quarry escapes as if aided, or pursuers suddenly catch up."
  },
  {
   "name": "Guided by Sinister Purpose",
   "text": "A threat they could have avoided now waits for them, wide awake."
  },
  {
   "name": "Reckless Hate",
   "text": "The next enemy type they fight gains the Reckless Hate trait."
  },
  {
   "name": "Deadly Strife",
   "text": "The next enemy type they fight gains the Aggressive trait."
  },
  {
   "name": "We Come to Kill",
   "text": "The next enemy type they fight gains Horrible Strength."
  }
 ]
};
window.LOTR_EYE = LOTR_EYE;
var LOTR_FELLOWSHIP = [
 "Fellowship is a pool shared by the whole Company. Its starting rating equals the number of Player-heroes, plus the patron's bonus and any virtues (Dwarf-Friend, Three is Company, Friendly and Familiar).",
 "Each miserable hero lowers the rating by 1.",
 "Spend 1 point (with the Company's agreement) for advantage on an ability check, attack roll or saving throw — or to trigger the patron's special advantage, or to borrow a companion's rewarded/magical item.",
 "Every hero tracks the current pool on their sheet. Points refresh fully at the end of each Fellowship Phase."
];
window.LOTR_FELLOWSHIP = LOTR_FELLOWSHIP;
var LOTR_FELLOWSHIP_PHASE = {
 "structure": [
  "1. Set duration — at least a week, up to a season (Yule takes the whole winter).",
  "2. Choose destination — a safe haven or any place already visited, within reasonable reach.",
  "3. Spiritual recovery — remove Shadow: 1 if the Company at least hindered the Shadow, up to 2 if they actively damaged the Enemy, up to 3 for deeds that drew the Dark Lord's (or a great servant's) eye.",
  "4. Choose undertakings — ordinary phase: one for the Company plus one free; Yule: one per hero plus one free."
 ],
 "yule": [
  "Roughly every third Fellowship Phase is Yule; the Company often disbands so heroes can go home.",
  "Every hero ages a year. Heroes who don't take Heal Scars gain bonus XP = 10 × Intelligence score × current level.",
  "The Loremaster shares the year's news from the wider world."
 ],
 "undertakings": [
  {
   "name": "Gather Rumours",
   "yule": false,
   "free": "A Warden in a warded land, or someone proficient in Investigation",
   "effect": "Receive a rumour; advantage on Intelligence checks about it until the next Fellowship Phase."
  },
  {
   "name": "Heal Scars",
   "yule": true,
   "free": "",
   "effect": "Remove 1 Shadow Scar — but earn no Yule bonus XP this year."
  },
  {
   "name": "Meet Patron",
   "yule": false,
   "free": "A Messenger, or someone proficient with calligrapher's supplies",
   "effect": "Meet a patron present at this location; heroes of the patron's favoured callings start the next Adventuring Phase with inspiration. Also how a main patron is chosen."
  },
  {
   "name": "Ponder Storied and Figured Maps",
   "yule": false,
   "free": "A Scholar, or someone proficient with cartographer's tools",
   "effect": "Advantage on pathfinding checks until the next Fellowship Phase."
  },
  {
   "name": "Raise an Heir",
   "yule": true,
   "free": "",
   "effect": "Spend 50 s on your heir's training (record the running total and name the heir). On death or retirement the heir gets XP = total × level (max half yours, rounded up) and up to three magic items as heirlooms."
  },
  {
   "name": "Recount a Story",
   "yule": true,
   "free": "",
   "effect": "Replace a distinctive feature with one you showed in the tale, or swap a tool proficiency, an Expertise choice, or a Fighting Style."
  },
  {
   "name": "Strengthen Fellowship",
   "yule": false,
   "free": "A Captain, or someone proficient with brewer's supplies or a gaming set",
   "effect": "+1 Fellowship rating until the next Fellowship Phase."
  },
  {
   "name": "Study Magical Items",
   "yule": false,
   "free": "A Treasure Hunter, or someone proficient in Old Lore",
   "effect": "Learn all qualities of every magical item the Company holds."
  },
  {
   "name": "Write a Song",
   "yule": false,
   "free": "Someone proficient in Performance or a musical instrument",
   "effect": "Add a Lay, Song of Victory or Walking-Song to the Company's song list."
  }
 ],
 "songs": [
  {
   "name": "Lay",
   "effect": "During a council: all who hear gain advantage on their first ability check before the council ends."
  },
  {
   "name": "Song of Victory",
   "effect": "In combat: all who hear gain advantage on their first attack roll before the end of their next turn."
  },
  {
   "name": "Walking-Song",
   "effect": "On a journey: all who hear gain advantage on their next fatigue saving throw."
  }
 ],
 "songNote": "Bonus action: DC 15 Charisma (Performance). Each song can be used once per Adventuring Phase — it's spent whether the check succeeds or not.",
 "gearNote": "During any Fellowship Phase heroes may freely buy and sell gear available at their destination."
};
window.LOTR_FELLOWSHIP_PHASE = LOTR_FELLOWSHIP_PHASE;
var LOTR_FIGHTING_STYLES = [
 {
  "name": "Archery",
  "description": "+2 to attack rolls with ranged weapons."
 },
 {
  "name": "Defence",
  "description": "+1 AC while wearing armour."
 },
 {
  "name": "Duelling",
  "description": "+2 damage with a one-handed melee weapon when you wield no other weapon."
 },
 {
  "name": "Great Weapon Fighting",
  "description": "Treat any damage die roll of 4 or less as a 5 with a two-handed or versatile melee weapon wielded in two hands."
 },
 {
  "name": "Protection",
  "description": "Reaction when a creature you can see hits you or an ally within 5 ft. with a melee attack: add your proficiency bonus to the target's AC for that attack. Requires a shield or finesse weapon."
 },
 {
  "name": "Two-Weapon Fighting",
  "description": "Add your ability modifier to the damage of your off-hand attack."
 }
];
window.LOTR_FIGHTING_STYLES = LOTR_FIGHTING_STYLES;
var LOTR_GEAR = [
 {
  "name": "Arrows (20)",
  "category": "Adventuring Gear",
  "cost": "1 SP",
  "weight": "1 lb",
  "source": "core"
 },
 {
  "name": "Backpack",
  "category": "Adventuring Gear",
  "cost": "2 SP",
  "weight": "5 lb",
  "source": "core"
 },
 {
  "name": "Barrel",
  "category": "Adventuring Gear",
  "cost": "2 SP",
  "weight": "70 lb",
  "source": "core"
 },
 {
  "name": "Basket",
  "category": "Adventuring Gear",
  "cost": "4 CP",
  "weight": "2 lb",
  "source": "core"
 },
 {
  "name": "Bedroll",
  "category": "Adventuring Gear",
  "cost": "1 SP",
  "weight": "7 lb",
  "source": "core"
 },
 {
  "name": "Bell",
  "category": "Adventuring Gear",
  "cost": "1 SP",
  "weight": "—",
  "source": "core"
 },
 {
  "name": "Blanket",
  "category": "Adventuring Gear",
  "cost": "5 CP",
  "weight": "3 lb",
  "source": "core"
 },
 {
  "name": "Block and tackle",
  "category": "Adventuring Gear",
  "cost": "1 SP",
  "weight": "5 lb",
  "source": "core"
 },
 {
  "name": "Book",
  "category": "Adventuring Gear",
  "cost": "25 SP",
  "weight": "5 lb",
  "source": "core"
 },
 {
  "name": "Bottle, glass",
  "category": "Adventuring Gear",
  "cost": "2 SP",
  "weight": "2 lb",
  "source": "core"
 },
 {
  "name": "Bucket",
  "category": "Adventuring Gear",
  "cost": "1 CP",
  "weight": "2 lb",
  "source": "core"
 },
 {
  "name": "Candle (set of 10)",
  "category": "Adventuring Gear",
  "cost": "1 CP",
  "weight": "—",
  "source": "core"
 },
 {
  "name": "Case, map or scroll",
  "category": "Adventuring Gear",
  "cost": "1 SP",
  "weight": "1 lb",
  "source": "core"
 },
 {
  "name": "Chain (10 feet)",
  "category": "Adventuring Gear",
  "cost": "5 SP",
  "weight": "10 lb",
  "source": "core"
 },
 {
  "name": "Chalk (10 pieces)",
  "category": "Adventuring Gear",
  "cost": "1 CP",
  "weight": "—",
  "source": "core"
 },
 {
  "name": "Chest",
  "category": "Adventuring Gear",
  "cost": "5 SP",
  "weight": "25 lb",
  "source": "core"
 },
 {
  "name": "Climber's kit",
  "category": "Adventuring Gear",
  "cost": "25 SP",
  "weight": "12 lb",
  "source": "core"
 },
 {
  "name": "Clothes, common",
  "category": "Adventuring Gear",
  "cost": "5 CP",
  "weight": "3 lb",
  "source": "core"
 },
 {
  "name": "Clothes, fine",
  "category": "Adventuring Gear",
  "cost": "15 SP",
  "weight": "6 lb",
  "source": "core"
 },
 {
  "name": "Clothes, traveller's",
  "category": "Adventuring Gear",
  "cost": "2 SP",
  "weight": "4 lb",
  "source": "core"
 },
 {
  "name": "Fishing tackle",
  "category": "Adventuring Gear",
  "cost": "1 SP",
  "weight": "4 lb",
  "source": "core"
 },
 {
  "name": "Flask or tankard",
  "category": "Adventuring Gear",
  "cost": "1 CP",
  "weight": "1 lb",
  "source": "core"
 },
 {
  "name": "Healer's kit",
  "category": "Adventuring Gear",
  "cost": "5 SP",
  "weight": "3 lb",
  "description": "Ten uses. Spend a use to stabilise a dying creature; Leech-Craft can spend one to treat the d20 as a 10.",
  "source": "core"
 },
 {
  "name": "Hourglass",
  "category": "Adventuring Gear",
  "cost": "25 SP",
  "weight": "1 lb",
  "source": "core"
 },
 {
  "name": "Ink (1 ounce bottle)",
  "category": "Adventuring Gear",
  "cost": "10 SP",
  "weight": "—",
  "source": "core"
 },
 {
  "name": "Ink pen",
  "category": "Adventuring Gear",
  "cost": "1 CP",
  "weight": "—",
  "source": "core"
 },
 {
  "name": "Jug or pitcher",
  "category": "Adventuring Gear",
  "cost": "1 CP",
  "weight": "4 lb",
  "source": "core"
 },
 {
  "name": "Ladder (10 feet)",
  "category": "Adventuring Gear",
  "cost": "1 CP",
  "weight": "25 lb",
  "source": "core"
 },
 {
  "name": "Lamp",
  "category": "Adventuring Gear",
  "cost": "5 CP",
  "weight": "1 lb",
  "source": "core"
 },
 {
  "name": "Lantern, bullseye",
  "category": "Adventuring Gear",
  "cost": "10 SP",
  "weight": "2 lb",
  "source": "core"
 },
 {
  "name": "Lantern, hooded",
  "category": "Adventuring Gear",
  "cost": "5 SP",
  "weight": "2 lb",
  "source": "core"
 },
 {
  "name": "Lock",
  "category": "Adventuring Gear",
  "cost": "10 SP",
  "weight": "1 lb",
  "source": "core"
 },
 {
  "name": "Magnifying Glass",
  "category": "Adventuring Gear",
  "cost": "10 GP",
  "weight": "—",
  "source": "core"
 },
 {
  "name": "Manacles",
  "category": "Adventuring Gear",
  "cost": "2 SP",
  "weight": "6 lb",
  "source": "core"
 },
 {
  "name": "Mess kit",
  "category": "Adventuring Gear",
  "cost": "2 CP",
  "weight": "1 lb",
  "source": "core"
 },
 {
  "name": "Mirror, steel",
  "category": "Adventuring Gear",
  "cost": "5 SP",
  "weight": "½ lb",
  "source": "core"
 },
 {
  "name": "Oil (flask)",
  "category": "Adventuring Gear",
  "cost": "1 CP",
  "weight": "1 lb",
  "source": "core"
 },
 {
  "name": "Parchment (one sheet)",
  "category": "Adventuring Gear",
  "cost": "1 CP",
  "weight": "—",
  "source": "core"
 },
 {
  "name": "Pick, miner's",
  "category": "Adventuring Gear",
  "cost": "2 SP",
  "weight": "10 lb",
  "source": "core"
 },
 {
  "name": "Pole (10-foot)",
  "category": "Adventuring Gear",
  "cost": "1 CP",
  "weight": "7 lb",
  "source": "core"
 },
 {
  "name": "Pocket-handkerchief",
  "category": "Adventuring Gear",
  "cost": "1 CP",
  "weight": "—",
  "description": "Never leave home without one.",
  "source": "core"
 },
 {
  "name": "Pot or pan, iron",
  "category": "Adventuring Gear",
  "cost": "2 SP",
  "weight": "10 lb",
  "source": "core"
 },
 {
  "name": "Pouch",
  "category": "Adventuring Gear",
  "cost": "5 CP",
  "weight": "1 lb",
  "source": "core"
 },
 {
  "name": "Quiver",
  "category": "Adventuring Gear",
  "cost": "1 SP",
  "weight": "1 lb",
  "source": "core"
 },
 {
  "name": "Rations (1 day)",
  "category": "Adventuring Gear",
  "cost": "5 CP",
  "weight": "2 lb",
  "source": "core"
 },
 {
  "name": "Rations, cram (1 day)",
  "category": "Adventuring Gear",
  "cost": "1 SP",
  "weight": "1 lb",
  "description": "Barding journey-cake that keeps forever: 1 lb counts as 2 lb of food. A Barding (or one taught the recipe) proficient with cook's utensils can bake 5 × proficiency bonus rations each Fellowship Phase (10 × at Yule; double with double proficiency).",
  "source": "core"
 },
 {
  "name": "Robes",
  "category": "Adventuring Gear",
  "cost": "1 SP",
  "weight": "4 lb",
  "source": "core"
 },
 {
  "name": "Rope, hempen (50 feet)",
  "category": "Adventuring Gear",
  "cost": "1 SP",
  "weight": "10 lb",
  "source": "core"
 },
 {
  "name": "Rope, silk (50 feet)",
  "category": "Adventuring Gear",
  "cost": "10 SP",
  "weight": "5 lb",
  "source": "core"
 },
 {
  "name": "Sack",
  "category": "Adventuring Gear",
  "cost": "1 CP",
  "weight": "½ lb",
  "source": "core"
 },
 {
  "name": "Saddlebags",
  "category": "Adventuring Gear",
  "cost": "4 SP",
  "weight": "8 lb",
  "source": "core"
 },
 {
  "name": "Saddle",
  "category": "Adventuring Gear",
  "cost": "5 SP",
  "weight": "15 lb",
  "source": "core"
 },
 {
  "name": "Scale, merchant's",
  "category": "Adventuring Gear",
  "cost": "5 SP",
  "weight": "3 lb",
  "source": "core"
 },
 {
  "name": "Sealing wax",
  "category": "Adventuring Gear",
  "cost": "5 CP",
  "weight": "—",
  "source": "core"
 },
 {
  "name": "Shovel",
  "category": "Adventuring Gear",
  "cost": "2 SP",
  "weight": "5 lb",
  "source": "core"
 },
 {
  "name": "Signal whistle",
  "category": "Adventuring Gear",
  "cost": "1 CP",
  "weight": "—",
  "source": "core"
 },
 {
  "name": "Signet ring",
  "category": "Adventuring Gear",
  "cost": "5 SP",
  "weight": "—",
  "source": "core"
 },
 {
  "name": "Soap",
  "category": "Adventuring Gear",
  "cost": "1 CP",
  "weight": "—",
  "source": "core"
 },
 {
  "name": "Tent, two-person",
  "category": "Adventuring Gear",
  "cost": "2 SP",
  "weight": "20 lb",
  "source": "core"
 },
 {
  "name": "Tinderbox",
  "category": "Adventuring Gear",
  "cost": "5 CP",
  "weight": "1 lb",
  "source": "core"
 },
 {
  "name": "Torches (bundle of 10)",
  "category": "Adventuring Gear",
  "cost": "1 CP",
  "weight": "10 lb",
  "source": "core"
 },
 {
  "name": "Vial",
  "category": "Adventuring Gear",
  "cost": "1 SP",
  "weight": "—",
  "source": "core"
 },
 {
  "name": "Waterskin",
  "category": "Adventuring Gear",
  "cost": "2 CP",
  "weight": "5 lb (full)",
  "source": "core"
 },
 {
  "name": "Whetstone",
  "category": "Adventuring Gear",
  "cost": "1 CP",
  "weight": "1 lb",
  "source": "core"
 },
 {
  "name": "Brewer's supplies",
  "category": "Artisan's Tools",
  "cost": "20 SP",
  "weight": "9 lb",
  "source": "core"
 },
 {
  "name": "Calligrapher's supplies",
  "category": "Artisan's Tools",
  "cost": "10 SP",
  "weight": "5 lb",
  "source": "core"
 },
 {
  "name": "Carpenter's tools",
  "category": "Artisan's Tools",
  "cost": "8 SP",
  "weight": "6 lb",
  "source": "core"
 },
 {
  "name": "Cartographer's tools",
  "category": "Artisan's Tools",
  "cost": "15 SP",
  "weight": "6 lb",
  "source": "core"
 },
 {
  "name": "Cobbler's tools",
  "category": "Artisan's Tools",
  "cost": "5 SP",
  "weight": "5 lb",
  "source": "core"
 },
 {
  "name": "Cook's utensils",
  "category": "Artisan's Tools",
  "cost": "1 SP",
  "weight": "8 lb",
  "source": "core"
 },
 {
  "name": "Glassblower's tools",
  "category": "Artisan's Tools",
  "cost": "30 SP",
  "weight": "5 lb",
  "source": "core"
 },
 {
  "name": "Jeweller's tools",
  "category": "Artisan's Tools",
  "cost": "25 SP",
  "weight": "2 lb",
  "source": "core"
 },
 {
  "name": "Leatherworker's tools",
  "category": "Artisan's Tools",
  "cost": "5 SP",
  "weight": "5 lb",
  "source": "core"
 },
 {
  "name": "Mason's tools",
  "category": "Artisan's Tools",
  "cost": "10 SP",
  "weight": "8 lb",
  "source": "core"
 },
 {
  "name": "Painter's supplies",
  "category": "Artisan's Tools",
  "cost": "10 SP",
  "weight": "5 lb",
  "source": "core"
 },
 {
  "name": "Potter's tools",
  "category": "Artisan's Tools",
  "cost": "10 SP",
  "weight": "3 lb",
  "source": "core"
 },
 {
  "name": "Smith's tools",
  "category": "Artisan's Tools",
  "cost": "20 SP",
  "weight": "8 lb",
  "source": "core"
 },
 {
  "name": "Weaver's tools",
  "category": "Artisan's Tools",
  "cost": "1 SP",
  "weight": "5 lb",
  "source": "core"
 },
 {
  "name": "Woodcarver's tools",
  "category": "Artisan's Tools",
  "cost": "1 SP",
  "weight": "5 lb",
  "source": "core"
 },
 {
  "name": "Chess",
  "category": "Gaming Set",
  "cost": "1 SP",
  "weight": "½ lb",
  "source": "core"
 },
 {
  "name": "Bowls",
  "category": "Gaming Set",
  "cost": "1 CP",
  "weight": "8 lb",
  "source": "core"
 },
 {
  "name": "Darts",
  "category": "Gaming Set",
  "cost": "3 CP",
  "weight": "1½ lb",
  "source": "core"
 },
 {
  "name": "Quoits",
  "category": "Gaming Set",
  "cost": "2 CP",
  "weight": "4 lb",
  "source": "core"
 },
 {
  "name": "Clarinet",
  "category": "Musical Instrument",
  "cost": "12 SP",
  "weight": "2 lb",
  "source": "core"
 },
 {
  "name": "Drum",
  "category": "Musical Instrument",
  "cost": "6 SP",
  "weight": "3 lb",
  "source": "core"
 },
 {
  "name": "Fiddle",
  "category": "Musical Instrument",
  "cost": "25 SP",
  "weight": "1 lb",
  "source": "core"
 },
 {
  "name": "Flute",
  "category": "Musical Instrument",
  "cost": "2 SP",
  "weight": "1 lb",
  "source": "core"
 },
 {
  "name": "Harp",
  "category": "Musical Instrument",
  "cost": "30 SP",
  "weight": "2 lb",
  "source": "core"
 },
 {
  "name": "Horn",
  "category": "Musical Instrument",
  "cost": "3 SP",
  "weight": "2 lb",
  "source": "core"
 },
 {
  "name": "Trumpet",
  "category": "Musical Instrument",
  "cost": "35 SP",
  "weight": "2 lb",
  "source": "core"
 },
 {
  "name": "Viol",
  "category": "Musical Instrument",
  "cost": "30 SP",
  "weight": "1 lb",
  "source": "core"
 },
 {
  "name": "Herbalism kit",
  "category": "Other Tools",
  "cost": "5 SP",
  "weight": "3 lb",
  "description": "If proficient, each Fellowship Phase gather herbs for remedies equal to your proficiency bonus (double with double proficiency). Spend a remedy for advantage on an Intelligence (Medicine) check, or drink one (action) for advantage on saves vs disease and poison for 1 hour.",
  "source": "core"
 },
 {
  "name": "Navigator's tools",
  "category": "Other Tools",
  "cost": "25 SP",
  "weight": "2 lb",
  "source": "core"
 },
 {
  "name": "Pipe",
  "category": "Other Tools",
  "cost": "1 SP",
  "weight": "½ lb",
  "description": "If proficient, spend one use of pipe-weed and an hour smoking to gain inspiration — once per long rest.",
  "source": "core"
 },
 {
  "name": "Thieves' tools",
  "category": "Other Tools",
  "cost": "25 SP",
  "weight": "1 lb",
  "source": "core"
 },
 {
  "name": "Pipe-weed, Longbottom Leaf (10 uses)",
  "category": "Pipe-weed",
  "cost": "3 SP",
  "weight": "—",
  "source": "core"
 },
 {
  "name": "Pipe-weed, Old Toby (10 uses)",
  "category": "Pipe-weed",
  "cost": "2 SP",
  "weight": "—",
  "source": "core"
 },
 {
  "name": "Pipe-weed, Southern Star (10 uses)",
  "category": "Pipe-weed",
  "cost": "2 SP",
  "weight": "—",
  "source": "core"
 },
 {
  "name": "Pipe-weed, Southlinch (10 uses)",
  "category": "Pipe-weed",
  "cost": "1 SP",
  "weight": "—",
  "source": "core"
 }
];
window.LOTR_GEAR = LOTR_GEAR;
var LOTR_JOURNEY = {
 "roles": [
  {
   "name": "Guide",
   "task": "Route, rests and supplies. Makes the pathfinding checks. Only one Guide.",
   "skill": "Travel"
  },
  {
   "name": "Hunter",
   "task": "Finding food in the wild.",
   "skill": "Hunting"
  },
  {
   "name": "Look-out",
   "task": "Keeping watch.",
   "skill": "Perception"
  },
  {
   "name": "Scout",
   "task": "Making camp and opening new trails.",
   "skill": "Explore"
  }
 ],
 "sequence": [
  "1. Set the journey path — trace the route on the map; the Loremaster counts the hexes (split journeys over 20 hexes into legs).",
  "2. Pathfinding: the Guide makes a DC 15 Wisdom (Travel) check (or cartographer's tools with a map; navigator's tools at sea; −5 if the Guide covers other roles). Fail by 5+: event 1 hex away · fail: 2 hexes · success: 3 hexes · succeed by 5+: 4 hexes. After each event, check again.",
  "3. Ending: when a pathfinding count reaches the destination the journey ends. Each hero makes a fatigue saving throw: DC 10 Constitution + the event modifiers. Fail: 1 level of exhaustion · fail by 5+: 2 · fail by 10+: 3. A mount ridden for half the journey adds its CON modifier."
 ],
 "pace": [
  "Each hex takes 1 day (2 days at speed 15 ft. or less). Speed 50+ ft.: 2 hexes a day; 80+ ft.: 3 hexes a day.",
  "Hard-terrain hexes (hills, marsh, woods) can't be ridden and are crossed at half speed.",
  "Forced march: double speed for pace, but a DC 15 fatigue save at the end of each day.",
  "Passive Perception notices threats; heroes doubling roles or force-marching take −5 to it.",
  "Moving at no more than half speed lets the Company travel stealthily when not in the open.",
  "Perilous Areas: entering one stops the Company until it has faced as many events as the area's Peril rating."
 ],
 "eventTarget": [
  {
   "roll": 1,
   "role": "Scouts",
   "check": "Wisdom (Explore)"
  },
  {
   "roll": 2,
   "role": "Look-outs",
   "check": "Wisdom (Perception)"
  },
  {
   "roll": 3,
   "role": "Hunters",
   "check": "Wisdom (Hunting)"
  }
 ],
 "regionMod": "Border Land: roll d20 with advantage · Wild Land: normal · Dark Land: with disadvantage.",
 "terrainDC": [
  {
   "terrain": "Road",
   "dc": 10
  },
  {
   "terrain": "Open terrain",
   "dc": 15
  },
  {
   "terrain": "Hard terrain",
   "dc": 20
  }
 ],
 "seasonNote": "Event checks — and the saves they call for — have disadvantage in autumn and winter. One companion in the same role (not covering other roles) may help for advantage.",
 "events": [
  {
   "min": 1,
   "max": 2,
   "name": "Terrible Misfortune",
   "fatigue": 3,
   "effect": "Fatigue DC +3. If the check fails, the target makes a Dexterity save (same DC): fail and they drop to 0 HP; succeed and they lose half their maximum HP."
  },
  {
   "min": 3,
   "max": 4,
   "name": "Despair",
   "fatigue": 2,
   "effect": "Fatigue DC +2. If the check fails, everyone in the Company gains 2 (1d3) Shadow points (Charisma save to resist)."
  },
  {
   "min": 5,
   "max": 6,
   "name": "Ill Choices",
   "fatigue": 2,
   "effect": "Fatigue DC +2. If the check fails, the target gains 1 Shadow point (Wisdom save to resist)."
  },
  {
   "min": 7,
   "max": 14,
   "name": "Mishap",
   "fatigue": 1,
   "effect": "Fatigue DC +1. If the check fails, +2 instead and the journey takes 1 day longer."
  },
  {
   "min": 15,
   "max": 17,
   "name": "Short Cut",
   "fatigue": 1,
   "effect": "Fatigue DC +1. If the check succeeds, the journey is 1 day shorter (minimum 1)."
  },
  {
   "min": 18,
   "max": 19,
   "name": "Chance-meeting",
   "fatigue": 1,
   "effect": "Fatigue DC +1 — unless the check succeeds, in which case no increase and the Loremaster improvises a helpful encounter."
  },
  {
   "min": 20,
   "max": 20,
   "name": "Joyful Sight",
   "fatigue": 0,
   "effect": "If the check succeeds, everyone in the Company gains inspiration."
  }
 ],
 "eventIdeas": {
  "Terrible Misfortune": [
   "A prey turns on the Hunters and gores one badly",
   "A Scout is caught by a killing cold on an exposed ridge",
   "The Look-out falls from a tree in the dark",
   "A river crossing goes wrong and the current takes someone"
  ],
  "Despair": [
   "Stumbling into a blighted, poisoned dell",
   "The grisly remains of travellers slain by Orcs",
   "The chill presence of an evil spirit by night",
   "Something huge and terrible passes in the dark"
  ],
  "Ill Choices": [
   "The Scout agonises over the way and loses a night's sleep",
   "The Hunter frets over dwindling food",
   "The Look-out jumps at every sound and wakes the camp"
  ],
  "Mishap": [
   "Wrong gear, not enough food — a day lost to fishing and foraging",
   "A flooded ford forces a long detour",
   "A lamed pony slows everyone down",
   "Fog — the Company walks in a circle"
  ],
  "Short Cut": [
   "The Look-out spots a hidden path",
   "The Scout opens a clean trail through brush",
   "A bountiful hunt means no stop to forage"
  ],
  "Chance-meeting": [
   "Friendly travellers share food and news",
   "Local folk give accurate directions",
   "A familiar face — perhaps a patron — on the road"
  ],
  "Joyful Sight": [
   "A company of wandering Elves passing under the stars",
   "Great Eagles wheeling high above",
   "A benevolent presence in a glade or waterfall",
   "A glimpse of one of the Wise"
  ]
 },
 "xp": [
  {
   "hex": "Along a road",
   "border": 0,
   "wild": 10,
   "dark": 25
  },
  {
   "hex": "In open terrain",
   "border": 10,
   "wild": 25,
   "dark": 50
  },
  {
   "hex": "In hard terrain",
   "border": 25,
   "wild": 50,
   "dark": 100
  }
 ],
 "xpNote": "Award journey XP only for real risk, a deadline, or poor conditions. Sum each hex's value (a Perilous Area counts as many hexes as its Peril rating) and divide among the heroes."
};
window.LOTR_JOURNEY = LOTR_JOURNEY;
var LOTR_LANGUAGES = [
 "Westron",
 "Dalish",
 "Khuzdul",
 "Sindarin",
 "Quenya",
 "Dunlendish",
 "Orkish",
 "Black Speech",
 "Warg-speech"
];
window.LOTR_LANGUAGES = LOTR_LANGUAGES;
var LOTR_MONSTERS = [
 {
  "alignment": "",
  "source": "core",
  "xp": 50,
  "proficiencyBonus": 2,
  "name": "Southerner Raider",
  "size": "Medium",
  "type": "Humanoid (Evil Man)",
  "group": "Evil Men",
  "ac": 15,
  "acNote": "(hide armour, shield)",
  "hp": 16,
  "hpFormula": "16 (3d8 + 3)",
  "speed": "30 ft.",
  "abilities": {
   "STR": 14,
   "DEX": 12,
   "CON": 12,
   "INT": 9,
   "WIS": 11,
   "CHA": 9
  },
  "skills": "Intimidation +1",
  "senses": "Passive Perception 10",
  "languages": "Dunlendish, Westron",
  "cr": "1/4",
  "traits": [
   {
    "name": "Reckless Hate",
    "description": "At the start of its turn it may take advantage on all its melee weapon attacks that turn; attacks against it then have advantage until its next turn."
   }
  ],
  "actions": [
   {
    "name": "Axe",
    "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage, or 6 (1d8 + 2) two-handed."
   },
   {
    "name": "Spear",
    "description": "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 5 (1d6 + 2) piercing damage, or 6 (1d8 + 2) two-handed in melee."
   }
  ],
  "description": "Hungry raiders out of the south and Dunland who fall on lonely homesteads after a hard winter, then vanish back into the mists."
 },
 {
  "alignment": "",
  "source": "core",
  "xp": 450,
  "proficiencyBonus": 2,
  "name": "Southerner Champion",
  "size": "Medium",
  "type": "Humanoid (Evil Man)",
  "group": "Evil Men",
  "ac": 17,
  "acNote": "(scale armour, shield)",
  "hp": 58,
  "hpFormula": "58 (9d8 + 18)",
  "speed": "30 ft.",
  "abilities": {
   "STR": 16,
   "DEX": 12,
   "CON": 14,
   "INT": 9,
   "WIS": 11,
   "CHA": 13
  },
  "skills": "Intimidation +3",
  "senses": "Passive Perception 10",
  "languages": "Dunlendish, Westron",
  "cr": "2",
  "traits": [
   {
    "name": "Reckless Hate",
    "description": "At the start of its turn it may take advantage on all its melee weapon attacks that turn; attacks against it then have advantage until its next turn."
   }
  ],
  "actions": [
   {
    "name": "Multiattack",
    "description": "Two melee attacks, or one melee and one ranged attack."
   },
   {
    "name": "Battle Axe",
    "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) two-handed."
   },
   {
    "name": "Spear",
    "description": "Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 6 (1d6 + 3) piercing damage, or 7 (1d8 + 3) two-handed in melee."
   }
  ],
  "description": "A Dunlending chieftain, a bandit lord who binds quarrelsome warriors into a war-band, or simply a very vicious brigand."
 },
 {
  "alignment": "",
  "source": "core",
  "xp": 25,
  "proficiencyBonus": 2,
  "name": "Footpad",
  "size": "Medium",
  "type": "Humanoid (Evil Man)",
  "group": "Evil Men",
  "ac": 11,
  "acNote": "(leather shirt)",
  "hp": 11,
  "hpFormula": "11 (2d8 + 2)",
  "speed": "30 ft.",
  "abilities": {
   "STR": 13,
   "DEX": 11,
   "CON": 12,
   "INT": 10,
   "WIS": 10,
   "CHA": 10
  },
  "senses": "Passive Perception 10",
  "languages": "Westron",
  "cr": "1/8",
  "traits": [
   {
    "name": "Gang Tactics",
    "description": "Advantage on an attack roll if an ally that isn't incapacitated is within 5 ft. of the target."
   }
  ],
  "actions": [
   {
    "name": "Great Club",
    "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) bludgeoning damage."
   },
   {
    "name": "Dagger",
    "description": "Melee or Ranged Weapon Attack: +3 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 3 (1d4 + 1) piercing damage."
   }
  ],
  "description": "A cowardly robber who preys on the defenceless — and on lone travellers, with friends at hand."
 },
 {
  "alignment": "",
  "source": "core",
  "xp": 100,
  "proficiencyBonus": 2,
  "name": "Ruffian Leader",
  "size": "Medium",
  "type": "Humanoid (Evil Man)",
  "group": "Evil Men",
  "ac": 11,
  "acNote": "(leather shirt)",
  "hp": 32,
  "hpFormula": "32 (5d8 + 10)",
  "speed": "30 ft.",
  "abilities": {
   "STR": 15,
   "DEX": 11,
   "CON": 14,
   "INT": 10,
   "WIS": 10,
   "CHA": 11
  },
  "skills": "Intimidation +2",
  "senses": "Passive Perception 10",
  "languages": "Westron",
  "cr": "1/2",
  "traits": [
   {
    "name": "Gang Tactics",
    "description": "Advantage on an attack roll if an ally that isn't incapacitated is within 5 ft. of the target."
   }
  ],
  "actions": [
   {
    "name": "Multiattack",
    "description": "Two melee attacks."
   },
   {
    "name": "Great Club",
    "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) bludgeoning damage."
   },
   {
    "name": "Dagger",
    "description": "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d4 + 2) piercing damage."
   },
   {
    "name": "Yell of Triumph (Recharges after a Short or Long Rest)",
    "description": "Each chosen creature within 30 ft. that hears it gains advantage on attack rolls and Charisma (Intimidation) checks until the start of its next turn; it then makes one attack as a bonus action."
   }
  ],
  "description": "Tougher, fiercer or cleverer than the rest — the one the gang follows."
 },
 {
  "alignment": "",
  "source": "core",
  "xp": 200,
  "proficiencyBonus": 2,
  "name": "Highway Robber",
  "size": "Medium",
  "type": "Humanoid (Evil Man)",
  "group": "Evil Men",
  "ac": 15,
  "acNote": "(leather corslet)",
  "hp": 22,
  "hpFormula": "22 (4d8 + 4)",
  "speed": "30 ft.",
  "abilities": {
   "STR": 12,
   "DEX": 16,
   "CON": 12,
   "INT": 10,
   "WIS": 11,
   "CHA": 10
  },
  "skills": "Perception +2, Stealth +5",
  "senses": "Passive Perception 12",
  "languages": "Westron",
  "cr": "1",
  "traits": [
   {
    "name": "Ambusher",
    "description": "In the first round of combat, advantage on attacks against any creature it surprised."
   },
   {
    "name": "Surprise Attack",
    "description": "If it surprises a creature and hits it in the first round, the target takes an extra 7 (2d6) damage."
   }
  ],
  "actions": [
   {
    "name": "Multiattack",
    "description": "Two melee or two ranged attacks."
   },
   {
    "name": "Short Sword",
    "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage."
   },
   {
    "name": "Bow",
    "description": "Ranged Weapon Attack: +5 to hit, range 80/320 ft., one target. Hit: 6 (1d6 + 3) piercing damage."
   }
  ],
  "description": "A brigand at home in the Wild who knows how to deal with armed victims."
 },
 {
  "alignment": "",
  "source": "core",
  "xp": 1100,
  "proficiencyBonus": 2,
  "name": "Great Orc Chief",
  "size": "Medium",
  "type": "Humanoid (Orc)",
  "group": "Orcs",
  "ac": 18,
  "acNote": "(heavy orc-mail, shield)",
  "hp": 85,
  "hpFormula": "85 (10d8 + 40)",
  "speed": "30 ft.",
  "abilities": {
   "STR": 18,
   "DEX": 12,
   "CON": 18,
   "INT": 10,
   "WIS": 12,
   "CHA": 16
  },
  "skills": "Insight +3, Intimidation +5",
  "senses": "Darkvision 120 ft., Passive Perception 11",
  "languages": "Orkish, Westron",
  "cr": "4",
  "traits": [
   {
    "name": "Aggressive",
    "description": "Bonus action: move up to its speed toward a hostile creature it can see."
   },
   {
    "name": "Horrible Strength",
    "description": "Its melee weapons deal one extra die of damage (included below)."
   },
   {
    "name": "Sunlight Sensitivity",
    "description": "In sunlight: disadvantage on attack rolls and sight-based Wisdom (Perception) checks."
   }
  ],
  "actions": [
   {
    "name": "Multiattack",
    "description": "Two melee attacks, or one melee and one ranged."
   },
   {
    "name": "Heavy Scimitar",
    "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage, or 15 (2d10 + 4) two-handed."
   },
   {
    "name": "Spear",
    "description": "Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) piercing damage, or 13 (2d8 + 4) two-handed in melee."
   },
   {
    "name": "Shield Bash",
    "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 9 (2d4 + 4) bludgeoning damage; a Medium or smaller target must succeed on a DC 15 Strength save or be knocked prone."
   },
   {
    "name": "Yell of Triumph (Recharges after a Short or Long Rest)",
    "description": "Each chosen creature within 30 ft. that hears it gains advantage on attack rolls and Charisma (Intimidation) checks until the start of its next turn; it then makes one attack as a bonus action."
   }
  ],
  "reactions": [
   {
    "name": "Parry",
    "description": "Adds 2 to its AC against one melee attack that would hit it, if it can see the attacker and wields a melee weapon."
   },
   {
    "name": "Redirect Attack",
    "description": "When a creature it can see hits it, it swaps places with an Orc within 5 ft., which becomes the target instead."
   }
  ],
  "description": "Of the breed of Azog and Bolg — a great Orc with an iron-clad head, leader of its weaker kin."
 },
 {
  "alignment": "",
  "source": "core",
  "xp": 700,
  "proficiencyBonus": 2,
  "name": "Great Orc Bodyguard",
  "size": "Medium",
  "type": "Humanoid (Orc)",
  "group": "Orcs",
  "ac": 18,
  "acNote": "(heavy orc-mail, shield)",
  "hp": 60,
  "hpFormula": "60 (8d8 + 24)",
  "speed": "30 ft.",
  "abilities": {
   "STR": 16,
   "DEX": 12,
   "CON": 16,
   "INT": 8,
   "WIS": 10,
   "CHA": 10
  },
  "skills": "Intimidation +2, Perception +2",
  "senses": "Darkvision 120 ft., Passive Perception 12",
  "languages": "Orkish, Westron",
  "cr": "3",
  "traits": [
   {
    "name": "Aggressive",
    "description": "Bonus action: move up to its speed toward a hostile creature it can see."
   },
   {
    "name": "Hideous Toughness (Recharges after a Short or Long Rest)",
    "description": "If it takes 7 damage or less that would reduce it to 0 HP, it drops to 1 HP instead."
   },
   {
    "name": "Horrible Strength",
    "description": "Its melee weapons deal one extra die of damage (included below)."
   },
   {
    "name": "Sunlight Sensitivity",
    "description": "In sunlight: disadvantage on attack rolls and sight-based Wisdom (Perception) checks."
   }
  ],
  "actions": [
   {
    "name": "Multiattack",
    "description": "Two melee attacks, or one melee and one ranged."
   },
   {
    "name": "Battle Axe",
    "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) slashing damage, or 14 (2d10 + 3) two-handed."
   },
   {
    "name": "Spear",
    "description": "Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 10 (2d6 + 3) piercing damage, or 12 (2d8 + 3) two-handed in melee."
   }
  ],
  "description": "Less cunning than its masters, it guards their lives with its own."
 },
 {
  "alignment": "",
  "source": "core",
  "xp": 50,
  "proficiencyBonus": 2,
  "name": "Goblin Archer",
  "size": "Small",
  "type": "Humanoid (Orc)",
  "group": "Orcs",
  "ac": 13,
  "acNote": "(orc-leather)",
  "hp": 9,
  "hpFormula": "9 (2d6 + 2)",
  "speed": "30 ft.",
  "abilities": {
   "STR": 11,
   "DEX": 14,
   "CON": 12,
   "INT": 10,
   "WIS": 10,
   "CHA": 8
  },
  "skills": "Perception +2, Stealth +6",
  "senses": "Darkvision 120 ft., Passive Perception 12",
  "languages": "Orkish, Westron",
  "cr": "1/4",
  "traits": [
   {
    "name": "Nimble Escape",
    "description": "Disengage or Hide as a bonus action on each of its turns."
   },
   {
    "name": "Sneak Attack (1/Turn)",
    "description": "Deals an extra 3 (1d6) damage when it hits with a weapon attack while it has advantage, or when an ally of it that isn't incapacitated is within 5 ft. of the target and it doesn't have disadvantage."
   },
   {
    "name": "Sunlight Sensitivity",
    "description": "In sunlight: disadvantage on attack rolls and sight-based Wisdom (Perception) checks."
   }
  ],
  "actions": [
   {
    "name": "Jagged Knife",
    "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) slashing damage."
   },
   {
    "name": "Bow of Horn",
    "description": "Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage, and the target must succeed on a Constitution save or be poisoned for 1 hour (failing by 5+: it can't regain HP and has disadvantage on death saves while poisoned)."
   }
  ],
  "description": "Picked for keen eyes, it shoots true by night or day."
 },
 {
  "alignment": "",
  "source": "core",
  "xp": 450,
  "proficiencyBonus": 2,
  "name": "Orc-chieftain",
  "size": "Medium",
  "type": "Humanoid (Orc)",
  "group": "Orcs",
  "ac": 17,
  "acNote": "(orc-mail, shield)",
  "hp": 39,
  "hpFormula": "39 (6d8 + 12)",
  "speed": "30 ft.",
  "abilities": {
   "STR": 16,
   "DEX": 14,
   "CON": 14,
   "INT": 10,
   "WIS": 10,
   "CHA": 12
  },
  "skills": "Intimidation +3",
  "senses": "Darkvision 120 ft., Passive Perception 10",
  "languages": "Orkish, Westron",
  "cr": "2",
  "traits": [
   {
    "name": "Sneak Attack (1/Turn)",
    "description": "Deals an extra 7 (2d6) damage when it hits with a weapon attack while it has advantage, or when an ally of it that isn't incapacitated is within 5 ft. of the target and it doesn't have disadvantage."
   },
   {
    "name": "Sunlight Sensitivity",
    "description": "In sunlight: disadvantage on attack rolls and sight-based Wisdom (Perception) checks."
   }
  ],
  "actions": [
   {
    "name": "Multiattack",
    "description": "Two melee attacks, or one melee and one ranged."
   },
   {
    "name": "Scimitar",
    "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage."
   },
   {
    "name": "Shield Bash",
    "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 5 (1d4 + 3) bludgeoning damage; a Medium or smaller target must succeed on a DC 13 Strength save or be knocked prone."
   },
   {
    "name": "Spear",
    "description": "Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 6 (1d6 + 3) piercing damage, or 7 (1d8 + 3) two-handed in melee."
   },
   {
    "name": "Yell of Triumph (Recharges after a Short or Long Rest)",
    "description": "Each chosen creature within 30 ft. that hears it gains advantage on attack rolls and Charisma (Intimidation) checks until the start of its next turn; it then makes one attack as a bonus action."
   }
  ],
  "reactions": [
   {
    "name": "Parry",
    "description": "Adds 2 to its AC against one melee attack that would hit it, if it can see the attacker and wields a melee weapon."
   }
  ],
  "description": "Only the cruellest Orcs live to lead — biggest of the band, with the meanest blade and the best armour, scarred by long service."
 },
 {
  "alignment": "",
  "source": "core",
  "xp": 200,
  "proficiencyBonus": 2,
  "name": "Orc Guard",
  "size": "Medium",
  "type": "Humanoid (Orc)",
  "group": "Orcs",
  "ac": 17,
  "acNote": "(orc-mail, shield)",
  "hp": 26,
  "hpFormula": "26 (4d8 + 8)",
  "speed": "30 ft.",
  "abilities": {
   "STR": 15,
   "DEX": 14,
   "CON": 14,
   "INT": 8,
   "WIS": 10,
   "CHA": 10
  },
  "skills": "Perception +2",
  "senses": "Darkvision 120 ft., Passive Perception 12",
  "languages": "Orkish, Westron",
  "cr": "1",
  "traits": [
   {
    "name": "Sneak Attack (1/Turn)",
    "description": "Deals an extra 3 (1d6) damage when it hits with a weapon attack while it has advantage, or when an ally of it that isn't incapacitated is within 5 ft. of the target and it doesn't have disadvantage."
   },
   {
    "name": "Sunlight Sensitivity",
    "description": "In sunlight: disadvantage on attack rolls and sight-based Wisdom (Perception) checks."
   }
  ],
  "actions": [
   {
    "name": "Multiattack",
    "description": "Two melee attacks, or one melee and one ranged."
   },
   {
    "name": "Scimitar",
    "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage."
   },
   {
    "name": "Spear",
    "description": "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 5 (1d6 + 2) piercing damage, or 6 (1d8 + 2) two-handed in melee."
   }
  ],
  "description": "The strongest and boldest, set to watch with sword and sturdy shield."
 },
 {
  "alignment": "",
  "source": "core",
  "xp": 50,
  "proficiencyBonus": 2,
  "name": "Orc Soldier",
  "size": "Medium",
  "type": "Humanoid (Orc)",
  "group": "Orcs",
  "ac": 15,
  "acNote": "(orc-leather, shield)",
  "hp": 11,
  "hpFormula": "11 (2d8 + 2)",
  "speed": "30 ft.",
  "abilities": {
   "STR": 13,
   "DEX": 14,
   "CON": 12,
   "INT": 9,
   "WIS": 10,
   "CHA": 9
  },
  "senses": "Darkvision 120 ft., Passive Perception 10",
  "languages": "Orkish, Westron",
  "cr": "1/4",
  "traits": [
   {
    "name": "Sneak Attack (1/Turn)",
    "description": "Deals an extra 3 (1d6) damage when it hits with a weapon attack while it has advantage, or when an ally of it that isn't incapacitated is within 5 ft. of the target and it doesn't have disadvantage."
   },
   {
    "name": "Sunlight Sensitivity",
    "description": "In sunlight: disadvantage on attack rolls and sight-based Wisdom (Perception) checks."
   }
  ],
  "actions": [
   {
    "name": "Scimitar",
    "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage."
   },
   {
    "name": "Spear",
    "description": "Melee or Ranged Weapon Attack: +3 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d6 + 1) piercing damage, or 5 (1d8 + 1) two-handed in melee."
   }
  ],
  "description": "Loud, undisciplined, with bent swords — kept in line only by a chieftain's whip."
 },
 {
  "alignment": "",
  "source": "core",
  "xp": 700,
  "proficiencyBonus": 2,
  "name": "Búrzgul",
  "size": "Medium",
  "type": "Undead (Orc)",
  "group": "Orcs",
  "ac": 17,
  "acNote": "(orc-mail, shield)",
  "hp": 52,
  "hpFormula": "52 (8d8 + 16)",
  "speed": "30 ft.",
  "abilities": {
   "STR": 16,
   "DEX": 14,
   "CON": 14,
   "INT": 10,
   "WIS": 10,
   "CHA": 14
  },
  "skills": "Insight +2, Intimidation +4",
  "senses": "Darkvision 120 ft., Passive Perception 10",
  "languages": "Orkish, Westron",
  "cr": "3",
  "traits": [
   {
    "name": "Sneak Attack (1/Turn)",
    "description": "Deals an extra 10 (3d6) damage when it hits with a weapon attack while it has advantage, or when an ally of it that isn't incapacitated is within 5 ft. of the target and it doesn't have disadvantage."
   },
   {
    "name": "Sunlight Sensitivity",
    "description": "In sunlight: disadvantage on attack rolls and sight-based Wisdom (Perception) checks."
   }
  ],
  "actions": [
   {
    "name": "Multiattack",
    "description": "Two melee attacks, or one melee and one ranged."
   },
   {
    "name": "Scimitar",
    "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage."
   },
   {
    "name": "Shield Bash",
    "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 5 (1d4 + 3) bludgeoning damage; a Medium or smaller target must succeed on a DC 13 Strength save or be knocked prone."
   },
   {
    "name": "Spear",
    "description": "Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 6 (1d6 + 3) piercing damage, or 7 (1d8 + 3) two-handed in melee."
   },
   {
    "name": "Yell of Triumph (Recharges after a Long Rest)",
    "description": "Each chosen creature within 30 ft. that hears it gains advantage on attack rolls and Charisma (Intimidation) checks until the start of its next turn; it then makes one attack as a bonus action."
   }
  ],
  "reactions": [
   {
    "name": "Parry",
    "description": "Adds 2 to its AC against one melee attack that would hit it, if it can see the attacker and wields a melee weapon."
   }
  ],
  "description": "An Orc war-leader of the Howling Hollows on the South Downs (Chapter 9)."
 },
 {
  "alignment": "",
  "source": "core",
  "xp": 2300,
  "proficiencyBonus": 3,
  "name": "Great Cave-troll",
  "size": "Large",
  "type": "Giant (Troll)",
  "group": "Trolls",
  "ac": 14,
  "acNote": "(natural armour)",
  "hp": 105,
  "hpFormula": "105 (10d10 + 50)",
  "speed": "40 ft.",
  "abilities": {
   "STR": 21,
   "DEX": 8,
   "CON": 20,
   "INT": 5,
   "WIS": 9,
   "CHA": 7
  },
  "savingThrows": "Str +8, Con +8",
  "skills": "Intimidation +4",
  "damageResistances": "poison; bludgeoning, piercing, and slashing from non-magical weapons",
  "conditionImmunities": "poisoned",
  "senses": "Darkvision 120 ft., Passive Perception 9",
  "languages": "—",
  "cr": "6",
  "traits": [
   {
    "name": "Hideous Toughness (Recharges after a Short or Long Rest)",
    "description": "If it takes 14 damage or less that would reduce it to 0 HP, it drops to 1 HP instead."
   }
  ],
  "actions": [
   {
    "name": "Multiattack",
    "description": "Two melee attacks, only one of which can be its bite; it can use Strike Fear in place of the bite."
   },
   {
    "name": "Bite",
    "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) piercing damage."
   },
   {
    "name": "Slam",
    "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 10 (2d4 + 5) bludgeoning damage; a Medium or smaller target is grappled (escape DC 16), and a Small one is also restrained. While grappling it has advantage on attacks against that target and can't slam others."
   },
   {
    "name": "Strike Fear",
    "description": "Each non-undead creature it chooses within 60 ft. that is aware of it gains 2 Shadow points from Dread, resisted by a DC 16 Charisma saving throw. On a failure the target is frightened for 1 minute (also stunned if it fails by 5 or more), repeating the save at the end of each of its turns. A creature that succeeds or recovers is immune to this creature's Strike Fear for 24 hours."
   }
  ],
  "description": "Dark-skinned with greenish scales, hunched and knuckle-walking; Orcs unleash it on the foes they fear most — and fear it themselves."
 },
 {
  "alignment": "",
  "source": "core",
  "xp": 700,
  "proficiencyBonus": 2,
  "name": "Cave-troll Slinker",
  "size": "Large",
  "type": "Giant (Troll)",
  "group": "Trolls",
  "ac": 15,
  "acNote": "(natural armour)",
  "hp": 34,
  "hpFormula": "34 (4d10 + 12)",
  "speed": "40 ft.",
  "abilities": {
   "STR": 17,
   "DEX": 10,
   "CON": 16,
   "INT": 5,
   "WIS": 9,
   "CHA": 7
  },
  "savingThrows": "Str +5, Con +5",
  "skills": "Intimidation +2, Stealth +2",
  "damageResistances": "poison; bludgeoning, piercing, and slashing from non-magical weapons",
  "conditionImmunities": "poisoned",
  "senses": "Darkvision 120 ft., Passive Perception 9 (14 by smell)",
  "languages": "—",
  "cr": "3",
  "traits": [
   {
    "name": "Hideous Toughness (Recharges after a Short or Long Rest)",
    "description": "If it takes 7 damage or less that would reduce it to 0 HP, it drops to 1 HP instead."
   },
   {
    "name": "Keen Smell",
    "description": "Advantage on Wisdom (Perception) checks that rely on smell."
   }
  ],
  "actions": [
   {
    "name": "Multiattack",
    "description": "One bite and one great club attack."
   },
   {
    "name": "Bite",
    "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (2d4 + 3) piercing damage."
   },
   {
    "name": "Great Club",
    "description": "Melee Weapon Attack: +5 to hit, reach 10 ft., one target. Hit: 12 (2d8 + 3) bludgeoning damage; a Medium or smaller target must succeed on a DC 15 Strength save or be knocked prone."
   }
  ],
  "description": "A smaller cave-troll that hunts alone in the deep dark by smell."
 },
 {
  "alignment": "",
  "source": "core",
  "xp": 1100,
  "proficiencyBonus": 2,
  "name": "Stone-troll Robber",
  "size": "Large",
  "type": "Giant (Troll)",
  "group": "Trolls",
  "ac": 14,
  "acNote": "(natural armour)",
  "hp": 57,
  "hpFormula": "57 (6d10 + 24)",
  "speed": "40 ft.",
  "abilities": {
   "STR": 19,
   "DEX": 8,
   "CON": 18,
   "INT": 7,
   "WIS": 7,
   "CHA": 7
  },
  "savingThrows": "Str +6, Con +6",
  "skills": "Intimidation +2",
  "damageResistances": "poison; bludgeoning, piercing, and slashing from non-magical weapons",
  "conditionImmunities": "poisoned",
  "senses": "Darkvision 120 ft., Passive Perception 8",
  "languages": "Westron",
  "cr": "4",
  "traits": [
   {
    "name": "Hideous Toughness (Recharges after a Short or Long Rest)",
    "description": "If it takes 7 damage or less that would reduce it to 0 HP, it drops to 1 HP instead."
   },
   {
    "name": "Sunlight Curse",
    "description": "Turns to stone (petrified) if it ends its turn in sunlight."
   }
  ],
  "actions": [
   {
    "name": "Multiattack",
    "description": "Two melee attacks; it can't use its great club while grappling."
   },
   {
    "name": "Great Club",
    "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage; a Medium or smaller target must succeed on a DC 14 Strength save or be knocked prone."
   },
   {
    "name": "Slam",
    "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (2d4 + 4) bludgeoning damage; a Medium or smaller target is grappled (escape DC 14), a Small one restrained. While grappling it has advantage on attacks against that target and can't slam others."
   }
  ],
  "description": "Filthy cave-dwelling predators who wear rough clothes, cook their meat and drink from barrels — ancient, and doomed by the dawn."
 },
 {
  "alignment": "",
  "source": "core",
  "xp": 1800,
  "proficiencyBonus": 3,
  "name": "Stone-troll Chief",
  "size": "Large",
  "type": "Giant (Troll)",
  "group": "Trolls",
  "ac": 14,
  "acNote": "(natural armour)",
  "hp": 76,
  "hpFormula": "76 (8d10 + 32)",
  "speed": "40 ft.",
  "abilities": {
   "STR": 20,
   "DEX": 8,
   "CON": 18,
   "INT": 7,
   "WIS": 7,
   "CHA": 8
  },
  "savingThrows": "Str +8, Con +7",
  "skills": "Intimidation +5",
  "damageResistances": "poison; bludgeoning, piercing, and slashing from non-magical weapons",
  "conditionImmunities": "poisoned",
  "senses": "Darkvision 120 ft., Passive Perception 8",
  "languages": "Westron",
  "cr": "5",
  "traits": [
   {
    "name": "Hideous Toughness (Recharges after a Short or Long Rest)",
    "description": "If it takes 14 damage or less that would reduce it to 0 HP, it drops to 1 HP instead."
   },
   {
    "name": "Sunlight Curse",
    "description": "Turns to stone (petrified) if it ends its turn in sunlight."
   }
  ],
  "actions": [
   {
    "name": "Multiattack",
    "description": "Two melee attacks; it can't use its great club while grappling."
   },
   {
    "name": "Great Club",
    "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 14 (2d8 + 5) bludgeoning damage; a Medium or smaller target must succeed on a DC 16 Strength save or be knocked prone."
   },
   {
    "name": "Slam",
    "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 10 (2d4 + 5) bludgeoning damage; a Medium or smaller target is grappled (escape DC 16), a Small one restrained."
   },
   {
    "name": "Yell of Triumph (Recharges after a Short or Long Rest)",
    "description": "Each chosen creature within 30 ft. that hears it gains advantage on attack rolls and Charisma (Intimidation) checks until the start of its next turn; it then makes one attack as a bonus action."
   }
  ],
  "description": "The strongest of a troll-band that raids caravans and lonely farms."
 },
 {
  "alignment": "",
  "source": "core",
  "xp": 700,
  "proficiencyBonus": 2,
  "name": "Barrow-wight",
  "size": "Medium",
  "type": "Undead",
  "group": "Undead",
  "ac": 15,
  "acNote": "(ring-mail)",
  "hp": 45,
  "hpFormula": "45 (6d8 + 18)",
  "speed": "30 ft.",
  "abilities": {
   "STR": 15,
   "DEX": 10,
   "CON": 16,
   "INT": 10,
   "WIS": 14,
   "CHA": 16
  },
  "skills": "Intimidation +5, Stealth +2",
  "damageResistances": "cold, necrotic; bludgeoning, piercing, and slashing from non-magical weapons",
  "damageImmunities": "poison",
  "conditionImmunities": "charmed, exhaustion, poisoned",
  "senses": "Truesight 120 ft., Passive Perception 12",
  "languages": "Black Speech, Westron",
  "cr": "3",
  "traits": [
   {
    "name": "Deathless",
    "description": "When damage drops it to 0 HP it makes a Constitution save (DC 5 + damage taken) to drop to 1 HP instead — unless the damage was radiant, a critical hit, or from a weapon bearing the Bane of the Undead."
   },
   {
    "name": "Sunlight Sensitivity",
    "description": "In sunlight: disadvantage on attack rolls and sight-based Wisdom (Perception) checks."
   }
  ],
  "actions": [
   {
    "name": "Multiattack",
    "description": "Uses Strike Fear or Wight Song, then makes two long sword attacks (Icy Touch may replace one)."
   },
   {
    "name": "Long Sword",
    "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) slashing damage, or 7 (1d10 + 2) two-handed."
   },
   {
    "name": "Icy Touch",
    "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) necrotic damage, and a DC 13 Constitution save or take 5 (1d10) more necrotic damage."
   },
   {
    "name": "Strike Fear",
    "description": "Each non-undead creature it chooses within 60 ft. that is aware of it gains 1 Shadow point from Dread, resisted by a DC 13 Charisma saving throw. On a failure the target is frightened for 1 minute (also stunned if it fails by 5 or more), repeating the save at the end of each of its turns. A creature that succeeds or recovers is immune to this creature's Strike Fear for 24 hours."
   },
   {
    "name": "Wight Song",
    "description": "Chants a chilling song at one creature (not an Elf or Wizard) within 30 ft. that can hear it: 2 Shadow points from Sorcery, resisted by a DC 13 Intelligence save. On a failure the target falls into a magical slumber for 1 minute (until damaged or shaken awake as an action); failing by 5+ means 1 hour and it can't be woken. On a success the target is stunned until the end of the singer's next turn unless it succeeded by 5+. Either way it is immune to the song for 24 hours."
   }
  ],
  "description": "A tall dark shape with pale-lit eyes, rings on its bony fingers and gold about its neck — sent by the Witch-king to haunt the barrows of Tyrn Gorthad."
 },
 {
  "alignment": "",
  "source": "core",
  "xp": 1800,
  "proficiencyBonus": 3,
  "name": "The Wight-king",
  "size": "Medium",
  "type": "Undead",
  "group": "Undead",
  "ac": 17,
  "acNote": "(mail hauberk)",
  "hp": 68,
  "hpFormula": "68 (8d8 + 32)",
  "speed": "30 ft.",
  "abilities": {
   "STR": 17,
   "DEX": 10,
   "CON": 18,
   "INT": 12,
   "WIS": 14,
   "CHA": 18
  },
  "savingThrows": "Con +7",
  "skills": "Intimidation +7, Stealth +3",
  "damageResistances": "cold, necrotic; bludgeoning, piercing, and slashing from non-magical weapons",
  "damageImmunities": "poison",
  "conditionImmunities": "charmed, exhaustion, poisoned",
  "senses": "Truesight 120 ft., Passive Perception 12",
  "languages": "Black Speech, Westron",
  "cr": "5",
  "traits": [
   {
    "name": "Darker than Darkness (Recharge 6)",
    "description": "Bonus action: magical darkness fills a 30-ft.-radius sphere centred where it chooses for 1 minute; it spreads round corners and no mundane light pierces it."
   },
   {
    "name": "Deathless",
    "description": "When damage drops it to 0 HP it makes a Constitution save (DC 5 + damage taken) to drop to 1 HP instead — unless the damage was radiant, a critical hit, or from a weapon bearing the Bane of the Undead."
   },
   {
    "name": "Sunlight Sensitivity",
    "description": "In sunlight: disadvantage on attack rolls and sight-based Wisdom (Perception) checks."
   }
  ],
  "actions": [
   {
    "name": "Multiattack",
    "description": "Uses Strike Fear or Wight Song, then makes two long sword attacks (Icy Touch may replace one)."
   },
   {
    "name": "Long Sword",
    "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) two-handed."
   },
   {
    "name": "Icy Touch",
    "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) necrotic damage, and a DC 15 Constitution save or take 6 (1d12) more necrotic damage."
   },
   {
    "name": "Strike Fear",
    "description": "Each non-undead creature it chooses within 60 ft. that is aware of it gains 2 Shadow points from Dread, resisted by a DC 15 Charisma saving throw. On a failure the target is frightened for 1 minute (also stunned if it fails by 5 or more), repeating the save at the end of each of its turns. A creature that succeeds or recovers is immune to this creature's Strike Fear for 24 hours."
   },
   {
    "name": "Wight Song",
    "description": "Chants a chilling song at one creature (not an Elf or Wizard) within 30 ft. that can hear it: 3 Shadow points from Sorcery, resisted by a DC 15 Intelligence save. On a failure the target falls into a magical slumber for 1 minute (until damaged or shaken awake as an action); failing by 5+ means 1 hour and it can't be woken. On a success the target is stunned until the end of the singer's next turn unless it succeeded by 5+. Either way it is immune to the song for 24 hours."
   }
  ],
  "description": "Lord of the Great Barrow: a fleshless warrior in blackened noble raiment, eyes burning behind a cracked helm. All that is dead yet lives by sorcery answers to him."
 },
 {
  "alignment": "",
  "source": "core",
  "xp": 200,
  "proficiencyBonus": 2,
  "name": "Fell Wraith",
  "size": "Medium",
  "type": "Undead",
  "group": "Undead",
  "ac": 13,
  "hp": 26,
  "hpFormula": "26 (4d8 + 8)",
  "speed": "fly 30 ft. (hover)",
  "abilities": {
   "STR": 1,
   "DEX": 16,
   "CON": 14,
   "INT": 10,
   "WIS": 12,
   "CHA": 14
  },
  "skills": "Stealth +7",
  "damageVulnerabilities": "radiant",
  "damageResistances": "bludgeoning, piercing, and slashing from weapons not bearing the Bane of the Undead",
  "damageImmunities": "cold, necrotic, poison",
  "conditionImmunities": "charmed, exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained",
  "senses": "Truesight 120 ft., Passive Perception 11",
  "languages": "Black Speech, Westron",
  "cr": "1",
  "traits": [
   {
    "name": "Deathless",
    "description": "When damage drops it to 0 HP it makes a Constitution save (DC 5 + damage taken) to drop to 1 HP instead — unless the damage was radiant, a critical hit, or from a weapon bearing the Bane of the Undead."
   },
   {
    "name": "Sunlight Weakness",
    "description": "In sunlight: disadvantage on attack rolls, ability checks and saving throws."
   }
  ],
  "actions": [
   {
    "name": "Multiattack",
    "description": "Uses Strike Fear, then makes a melee attack."
   },
   {
    "name": "Sword",
    "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage, or 7 (1d8 + 3) two-handed."
   },
   {
    "name": "Strike Fear",
    "description": "Each non-undead creature it chooses within 60 ft. that is aware of it gains 1 Shadow point from Dread, resisted by a DC 12 Charisma saving throw. On a failure the target is frightened for 1 minute (also stunned if it fails by 5 or more), repeating the save at the end of each of its turns. A creature that succeeds or recovers is immune to this creature's Strike Fear for 24 hours."
   }
  ],
  "description": "Victims of the Black Shadow of the Angmar wars, half-faded into the wraith-world: cloaked, crooked wanderers among old ruins with ember eyes and hissing voices."
 },
 {
  "alignment": "",
  "source": "core",
  "xp": 100,
  "proficiencyBonus": 2,
  "name": "Marsh-dweller",
  "size": "Medium",
  "type": "Undead",
  "group": "Undead",
  "ac": 12,
  "hp": 22,
  "hpFormula": "22 (4d8 + 4)",
  "speed": "30 ft.",
  "abilities": {
   "STR": 13,
   "DEX": 15,
   "CON": 12,
   "INT": 7,
   "WIS": 10,
   "CHA": 6
  },
  "skills": "Intimidation +0, Stealth +4",
  "damageResistances": "necrotic",
  "damageImmunities": "poison",
  "conditionImmunities": "charmed, exhaustion, poisoned",
  "senses": "Darkvision 120 ft., Passive Perception 10",
  "languages": "Westron",
  "cr": "1/2",
  "traits": [
   {
    "name": "Deathless",
    "description": "When damage drops it to 0 HP it makes a Constitution save (DC 5 + damage taken) to drop to 1 HP instead — unless the damage was radiant, a critical hit, or from a weapon bearing the Bane of the Undead."
   },
   {
    "name": "Sunlight Sensitivity",
    "description": "In sunlight: disadvantage on attack rolls and sight-based Wisdom (Perception) checks."
   }
  ],
  "actions": [
   {
    "name": "Multiattack",
    "description": "One bite and one claws attack."
   },
   {
    "name": "Bite",
    "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
   },
   {
    "name": "Claws",
    "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) slashing damage; a Medium or smaller target is grappled (escape DC 11) and it can't claw another target."
   }
  ],
  "description": "Shambling, corpse-pale things by stagnant pools in ruined places, that drag the unwary into cellars full of stolen gold."
 },
 {
  "alignment": "",
  "source": "core",
  "xp": 200,
  "proficiencyBonus": 2,
  "name": "Lady Elwen",
  "size": "Medium",
  "type": "Undead (Fell Wraith)",
  "group": "Undead",
  "ac": 13,
  "hp": 26,
  "hpFormula": "26 (4d8 + 8)",
  "speed": "fly 35 ft. (hover)",
  "abilities": {
   "STR": 2,
   "DEX": 16,
   "CON": 15,
   "INT": 10,
   "WIS": 13,
   "CHA": 15
  },
  "skills": "Intimidation +4, Perception +3, Stealth +7",
  "damageVulnerabilities": "radiant",
  "damageResistances": "bludgeoning, piercing, and slashing from weapons not bearing the Bane of the Undead",
  "damageImmunities": "cold, necrotic, poison",
  "conditionImmunities": "charmed, exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained",
  "senses": "Truesight 120 ft., Passive Perception 13",
  "languages": "Sindarin, Westron",
  "cr": "1",
  "traits": [
   {
    "name": "Deathless",
    "description": "When damage drops it to 0 HP it makes a Constitution save (DC 5 + damage taken) to drop to 1 HP instead — unless the damage was radiant, a critical hit, or from a weapon bearing the Bane of the Undead."
   },
   {
    "name": "Sunlight Weakness",
    "description": "In sunlight: disadvantage on attack rolls, ability checks and saving throws."
   }
  ],
  "actions": [
   {
    "name": "Multiattack",
    "description": "Uses Strike Fear, then makes one melee attack."
   },
   {
    "name": "Sword",
    "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage, or 7 (1d8 + 3) two-handed."
   },
   {
    "name": "Strike Fear",
    "description": "Each non-undead creature it chooses within 60 ft. that is aware of it gains 1 Shadow point from Dread, resisted by a DC 12 Charisma saving throw. On a failure the target is frightened for 1 minute (also stunned if it fails by 5 or more), repeating the save at the end of each of its turns. A creature that succeeds or recovers is immune to this creature's Strike Fear for 24 hours."
   }
  ],
  "description": "Once a valiant Dúnadan lady, consumed by grief and the Witch-king's curse; she haunts the ruin of her fallen castle (The Star of the Mist)."
 },
 {
  "alignment": "",
  "source": "core",
  "xp": 50,
  "proficiencyBonus": 2,
  "name": "Wild Wolf",
  "size": "Medium",
  "type": "Beast (Warg)",
  "group": "Wolves",
  "ac": 13,
  "acNote": "(natural armour)",
  "hp": 16,
  "hpFormula": "16 (3d8 + 3)",
  "speed": "50 ft.",
  "abilities": {
   "STR": 14,
   "DEX": 14,
   "CON": 12,
   "INT": 5,
   "WIS": 12,
   "CHA": 7
  },
  "skills": "Intimidation +0, Perception +5, Stealth +4",
  "senses": "Darkvision 60 ft., Passive Perception 15 (20 by hearing or smell)",
  "languages": "Warg-speech",
  "cr": "1/4",
  "traits": [
   {
    "name": "Fear of Fire",
    "description": "If it takes fire or radiant damage it must succeed on a Charisma (Intimidation) check (DC 10 + damage taken) or be frightened until the end of its next turn."
   },
   {
    "name": "Keen Hearing and Smell",
    "description": "Advantage on Perception checks that rely on hearing or smell."
   },
   {
    "name": "Pack Tactics",
    "description": "Advantage on an attack roll if an ally that isn't incapacitated is within 5 ft. of the target."
   }
  ],
  "actions": [
   {
    "name": "Bite",
    "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage; the target must succeed on a DC 12 Strength save or be knocked prone."
   }
  ],
  "description": "The common Warg — bigger and crueller than any natural wolf. Orcs ride them like horses."
 },
 {
  "alignment": "",
  "source": "core",
  "xp": 200,
  "proficiencyBonus": 2,
  "name": "Wolf-chieftain",
  "size": "Large",
  "type": "Beast (Warg)",
  "group": "Wolves",
  "ac": 14,
  "acNote": "(natural armour)",
  "hp": 37,
  "hpFormula": "37 (5d10 + 10)",
  "speed": "50 ft.",
  "abilities": {
   "STR": 16,
   "DEX": 14,
   "CON": 14,
   "INT": 7,
   "WIS": 12,
   "CHA": 8
  },
  "skills": "Intimidation +3, Perception +5, Stealth +4",
  "senses": "Darkvision 60 ft., Passive Perception 15 (20 by hearing or smell)",
  "languages": "Warg-speech",
  "cr": "1",
  "traits": [
   {
    "name": "Fear of Fire",
    "description": "If it takes fire or radiant damage it must succeed on a Charisma (Intimidation) check (DC 10 + damage taken) or be frightened until the end of its next turn."
   },
   {
    "name": "Keen Hearing and Smell",
    "description": "Advantage on Perception checks that rely on hearing or smell."
   },
   {
    "name": "Pack Tactics",
    "description": "Advantage on an attack roll if an ally that isn't incapacitated is within 5 ft. of the target."
   }
  ],
  "actions": [
   {
    "name": "Bite",
    "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage; the target must succeed on a DC 13 Strength save or be knocked prone."
   }
  ],
  "description": "Greater in size, cruelty and cunning, called by its pack to deal with real threats — never met alone."
 },
 {
  "alignment": "",
  "source": "core",
  "xp": 1100,
  "proficiencyBonus": 2,
  "name": "Hound of Sauron",
  "size": "Large",
  "type": "Beast (Werewolf)",
  "group": "Wolves",
  "ac": 15,
  "acNote": "(natural armour)",
  "hp": 52,
  "hpFormula": "52 (7d10 + 14)",
  "speed": "50 ft.",
  "abilities": {
   "STR": 18,
   "DEX": 15,
   "CON": 15,
   "INT": 8,
   "WIS": 12,
   "CHA": 10
  },
  "skills": "Intimidation +4, Perception +5, Stealth +4",
  "damageResistances": "bludgeoning, piercing, and slashing from non-magical weapons",
  "conditionImmunities": "charmed",
  "senses": "Darkvision 60 ft., Passive Perception 15 (20 by hearing or smell)",
  "languages": "Warg-speech",
  "cr": "4",
  "traits": [
   {
    "name": "Keen Hearing and Smell",
    "description": "Advantage on Perception checks that rely on hearing or smell."
   },
   {
    "name": "Pack Tactics",
    "description": "Advantage on an attack roll if an ally that isn't incapacitated is within 5 ft. of the target."
   }
  ],
  "actions": [
   {
    "name": "Multiattack",
    "description": "One bite and one claws attack."
   },
   {
    "name": "Bite",
    "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) piercing damage; the target must succeed on a DC 14 Strength save or be knocked prone."
   },
   {
    "name": "Claws",
    "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (2d4 + 4) slashing damage; a Medium or smaller target is grappled (escape DC 14) and it can't claw another target."
   }
  ],
  "description": "A devouring spirit in wolf-shape, sent on the Dark Lord's errands — to muster, to hunt a quarry, or to spy."
 },
 {
  "alignment": "",
  "source": "core",
  "xp": 450,
  "proficiencyBonus": 2,
  "name": "Arin and Beinion",
  "size": "Medium",
  "type": "Humanoid (Dúnadan)",
  "group": "Folk of Eriador",
  "ac": 15,
  "acNote": "(mail-shirt)",
  "hp": 52,
  "hpFormula": "52 (8d8 + 16)",
  "speed": "35 ft.",
  "abilities": {
   "STR": 16,
   "DEX": 14,
   "CON": 14,
   "INT": 10,
   "WIS": 14,
   "CHA": 9
  },
  "savingThrows": "Con +4, Cha +3",
  "skills": "Athletics +5, Explore +6, Hunting +6, Intimidation +1, Perception +6, Stealth +4, Travel +6",
  "senses": "Passive Perception 16",
  "languages": "Sindarin, Westron",
  "cr": "2",
  "traits": [
   {
    "name": "Strength of Will",
    "description": "Advantage on saves against being frightened, adding their Wisdom modifier (included)."
   }
  ],
  "actions": [
   {
    "name": "Multiattack",
    "description": "Two melee attacks, or one melee and one ranged."
   },
   {
    "name": "Long Sword",
    "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) two-handed."
   },
   {
    "name": "Spear",
    "description": "Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 6 (1d6 + 3) piercing damage, or 7 (1d8 + 3) two-handed in melee."
   }
  ],
  "reactions": [
   {
    "name": "Parry",
    "description": "Adds 2 to its AC against one melee attack that would hit it, if it can see the attacker and wields a melee weapon."
   }
  ],
  "description": "A pair of Rangers who watch the hills of Evendim. Use for any seasoned Ranger of the North."
 },
 {
  "alignment": "",
  "source": "core",
  "xp": 200,
  "proficiencyBonus": 2,
  "name": "Fitch Talltree",
  "size": "Medium",
  "type": "Humanoid (Man of Bree)",
  "group": "Folk of Eriador",
  "ac": 14,
  "acNote": "(hide armour)",
  "hp": 19,
  "hpFormula": "19 (3d8 + 6)",
  "speed": "30 ft.",
  "abilities": {
   "STR": 14,
   "DEX": 12,
   "CON": 14,
   "INT": 10,
   "WIS": 16,
   "CHA": 9
  },
  "savingThrows": "Cha +1",
  "skills": "Hunting +7, Insight +5, Intimidation +1, Nature +4, Perception +7",
  "senses": "Passive Perception 17",
  "languages": "Westron",
  "cr": "1",
  "traits": [
   {
    "name": "Defiance",
    "description": "Bonus action: spend one Hit Die to heal himself."
   }
  ],
  "actions": [
   {
    "name": "Multiattack",
    "description": "Two melee or two ranged attacks."
   },
   {
    "name": "Archet Hunting Bow",
    "description": "Ranged Weapon Attack: +5 to hit, range 80/320 ft., one target. Hit: 6 (1d6 + 3) piercing damage; on a critical hit roll the damage dice three times."
   },
   {
    "name": "Dagger",
    "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage."
   }
  ],
  "description": "The Forester of Archet, keeper of the Chetwood. Use for any hardy woodsman or hunter of Bree-land."
 }
];
window.LOTR_MONSTERS = LOTR_MONSTERS;
var LOTR_MOUNTS = [
 {
  "name": "Horse, draught",
  "cost": "50 SP",
  "speed": "40 ft.",
  "capacity": "540 lb",
  "constitution": "13 (+1)"
 },
 {
  "name": "Horse, riding",
  "cost": "75 SP",
  "speed": "60 ft.",
  "capacity": "480 lb",
  "constitution": "12 (+1)"
 },
 {
  "name": "Pony",
  "cost": "12 SP",
  "speed": "40 ft.",
  "capacity": "225 lb",
  "constitution": "13 (+1)"
 }
];
window.LOTR_MOUNTS = LOTR_MOUNTS;
var LOTR_MOUNT_NOTE = "Riding a mount for at least half a journey's days adds its Constitution modifier to your fatigue saving throw. Horses can't be ridden through hard-terrain hexes.";
window.LOTR_MOUNT_NOTE = LOTR_MOUNT_NOTE;
var LOTR_MULTICALLING = [
 {
  "calling": "Captain",
  "requirement": "STR 13 and CHA 13",
  "gains": "Light, medium and heavy armour, shields, simple and martial weapons"
 },
 {
  "calling": "Champion",
  "requirement": "STR 13 or DEX 13",
  "gains": "Light, medium and heavy armour, shields, simple and martial weapons"
 },
 {
  "calling": "Messenger",
  "requirement": "DEX 13 and CHA 13",
  "gains": "Light armour, simple weapons, one calling skill, one tool"
 },
 {
  "calling": "Scholar",
  "requirement": "INT 13",
  "gains": "Light armour, simple weapons, one calling skill, one calling tool"
 },
 {
  "calling": "Treasure Hunter",
  "requirement": "DEX 13",
  "gains": "Light armour, simple weapons, one calling skill, one calling tool"
 },
 {
  "calling": "Warden",
  "requirement": "WIS 13",
  "gains": "Light and medium armour, shields, simple and martial weapons"
 }
];
window.LOTR_MULTICALLING = LOTR_MULTICALLING;
var LOTR_NAMELESS = {
 "title1": [
  "The Bane",
  "The Scourge",
  "The Horror",
  "The Terror",
  "The Defiler",
  "The Devourer",
  "The Stalker",
  "The Hunter",
  "The Watcher",
  "The Crawler",
  "The Lurker",
  "The Creeper"
 ],
 "title2": [
  "in the Dark",
  "in the Dark",
  "of the Abyss",
  "of the Abyss",
  "in the Shadows",
  "in the Shadows",
  "of the Pit",
  "of the Pit",
  "in the Water",
  "in the Water",
  "of the Deep",
  "of the Deep"
 ],
 "title3": [
  "by Men",
  "by Men",
  "by Elves",
  "by Elves",
  "by Dwarves",
  "by Dwarves",
  "by Orcs",
  "by Orcs",
  "by the Wise",
  "by the Wise",
  "in ancient lore",
  "in ancient lore"
 ],
 "form": [
  "Bat-like",
  "Spider-like",
  "Fish-like",
  "Slug-like",
  "Worm-like",
  "Centipede-like",
  "Insect-like",
  "Crustacean-like",
  "Octopus-like",
  "Mole-like",
  "Toad-like",
  "Troll-like"
 ],
 "aspect": [
  "with remorseless eyes",
  "with remorseless eyes",
  "with great horns",
  "with great horns",
  "with luminous skin",
  "with luminous skin",
  "with a huge head",
  "with a huge head",
  "with a swollen body",
  "with a swollen body",
  "yet greater",
  "yet greater"
 ],
 "before": [
  "a deadly silence",
  "a sinister hissing",
  "a low growl",
  "the bones of its victims",
  "your skin crawling",
  "a deafening roar",
  "its tracks",
  "a terrifying scream",
  "a hideous stench",
  "a violent gust of air",
  "a piping sound",
  "a terrible cold"
 ],
 "first": [
  "a great shadow with a dark form at its heart",
  "its great claws",
  "its eyes glowing in the dark",
  "a flaccid, translucent, jelly-like body",
  "a gaping mouth gasping open and shut",
  "a huge maw of eerily human teeth",
  "swarms of vermin crawling before it",
  "a long, sinuous tentacle slithering near",
  "fangs too long to let its mouth close",
  "wide, blind eyes",
  "twisted horns of stained ivory",
  "a beautiful phantom — a vision of the mind"
 ],
 "stats": [
  {
   "d20": "15–20",
   "size": "Huge",
   "ac": 13,
   "hp": "105 (10d12 + 40)",
   "abilities": "STR 19, DEX 12, CON 18",
   "cr": "4 (+2)"
  },
  {
   "d20": "10–14",
   "size": "Huge",
   "ac": 14,
   "hp": "138 (12d12 + 60)",
   "abilities": "STR 21, DEX 10, CON 20",
   "cr": "5 (+3)"
  },
  {
   "d20": "6–9",
   "size": "Huge",
   "ac": 15,
   "hp": "175 (14d12 + 84)",
   "abilities": "STR 23, DEX 8, CON 22",
   "cr": "7 (+3)"
  },
  {
   "d20": "4–5",
   "size": "Huge",
   "ac": 16,
   "hp": "216 (16d12 + 112)",
   "abilities": "STR 25, DEX 6, CON 24",
   "cr": "9 (+4)"
  },
  {
   "d20": "3",
   "size": "Gargantuan",
   "ac": 17,
   "hp": "296 (16d20 + 128)",
   "abilities": "STR 27, DEX 4, CON 26",
   "cr": "13 (+5)"
  },
  {
   "d20": "2",
   "size": "Gargantuan",
   "ac": 18,
   "hp": "351 (18d20 + 162)",
   "abilities": "STR 29, DEX 2, CON 28",
   "cr": "15 (+5)"
  },
  {
   "d20": "1",
   "size": "Gargantuan",
   "ac": 19,
   "hp": "410 (20d20 + 200)",
   "abilities": "STR 30, DEX 1, CON 30",
   "cr": "17 (+6)"
  }
 ],
 "base": "INT 1, WIS 7, CHA 3. Speed 20 ft., burrow 10 ft., climb 20 ft., swim 20 ft. Immune to charmed, exhaustion, frightened, paralyzed, petrified, poisoned. Blindsight 120 ft., passive Perception 8. Amphibious; Sunlight Sensitivity. Multiattack: one primary and one secondary natural weapon.",
 "attacks": [
  {
   "name": "Slam, tail, or tentacle",
   "text": "Reach 15 ft. (Huge) / 20 ft. (Gargantuan); 3d4 / 4d4 + STR bludgeoning; a Large or smaller target is grappled and restrained."
  },
  {
   "name": "Beak, bite, or horns",
   "text": "Reach 5 ft. / 10 ft.; 3d8 / 4d8 + STR piercing; a Large or smaller target makes a Strength save or is knocked prone."
  },
  {
   "name": "Claws, talons, or tusks",
   "text": "Reach 10 ft. / 15 ft.; 3d6 / 4d6 + STR slashing; a Large or smaller target is grappled."
  }
 ],
 "traits": [
  {
   "min": 1,
   "max": 2,
   "name": "Hideous Toughness",
   "text": "Damage of 14 or less (21 at CR 11–16, 28 at CR 17+) that would drop it to 0 leaves it at 1 HP instead."
  },
  {
   "min": 3,
   "max": 4,
   "name": "Foul Reek",
   "text": "Creatures starting a turn within 5 ft. make a CON save or are poisoned until their next turn (immune for an hour on a success)."
  },
  {
   "min": 5,
   "max": 6,
   "name": "Horrible Strength",
   "text": "Its attacks deal one extra damage die."
  },
  {
   "min": 7,
   "max": 8,
   "name": "Poison",
   "text": "Primary attack adds 3d4 (4d4) poison and a CON save or poisoned for an hour (fail by 5+: can't regain HP, disadvantage on death saves)."
  },
  {
   "min": 9,
   "max": 10,
   "name": "Multiattack",
   "text": "One additional attack with its primary or secondary weapon."
  },
  {
   "min": 11,
   "max": 12,
   "name": "Snake-like Speed",
   "text": "Dash or Disengage as a bonus action."
  },
  {
   "min": 13,
   "max": 14,
   "name": "Strike Fear",
   "text": "Creatures within 120 ft. gain half its proficiency bonus in Shadow (Dread), resisted by a Charisma save; failures are frightened (stunned too on a fail by 5+)."
  },
  {
   "min": 15,
   "max": 16,
   "name": "Denizen of the Dark",
   "text": "In dim light or darkness: advantage on Stealth and Hide as a bonus action."
  },
  {
   "min": 17,
   "max": 18,
   "name": "Thick Hide",
   "text": "Resistance to non-magical bludgeoning, piercing and slashing."
  },
  {
   "min": 19,
   "max": 20,
   "name": "Regeneration",
   "text": "Regains 10 HP at the start of each turn while above 0."
  }
 ],
 "traitNote": "Each extra special trait raises the Thing's challenge rating by 1."
};
window.LOTR_NAMELESS = LOTR_NAMELESS;
var LOTR_PATRONS = [
 {
  "name": "Balin, son of Fundin",
  "race": "Dwarf",
  "callings": [
   "Captain",
   "Champion"
  ],
  "fellowship": 1,
  "advantage": "Balin's Counsel",
  "advantageText": "Spend 1 Fellowship point to roll an extra d20 after an attack roll (before the outcome is known) and use either die.",
  "agenda": "Reclaim lost strongholds, eliminate enemy leaders.",
  "where": "On the road between Erebor and the Blue Mountains, at wayside inns, or visiting Bilbo in the Shire.",
  "description": "Eldest son of Fundin and Thorin's old counsellor, now an envoy of King Dáin. Humble, kindly, woodcrafty for a Dwarf — and quietly obsessed with Moria."
 },
 {
  "name": "Bilbo Baggins",
  "race": "Hobbit",
  "callings": [
   "Scholar",
   "Treasure Hunter"
  ],
  "fellowship": 2,
  "advantage": "Bilbo's Hospitality",
  "advantageText": "Choosing Meet Patron to visit Bilbo also raises the Fellowship rating by +1 until the next Fellowship Phase.",
  "agenda": "Recover lost lore and lost things.",
  "where": "Bag End, Hobbiton — usually at tea or smoking on the step.",
  "description": "A wealthy, eccentric Hobbit who gathers rumours, maps and lore for his book, and gladly finances anyone brave enough to go and have adventures."
 },
 {
  "name": "Círdan the Shipwright",
  "race": "Elf",
  "callings": [
   "Messenger",
   "Scholar"
  ],
  "fellowship": 1,
  "advantage": "The Shipwright's Foresight",
  "advantageText": "Spend 1 Fellowship point to roll an extra d20 after an ability check and use either die. Meeting him also yields a rumour from the Loremaster.",
  "agenda": "Rekindle hope, preserve the lore of the Ages.",
  "where": "The Grey Havens in Lindon.",
  "description": "The ancient lord of the Havens, keeper of the grey ships, patient and far-seeing."
 },
 {
  "name": "Gandalf the Grey",
  "race": "Wizard",
  "callings": [
   "Captain",
   "Messenger"
  ],
  "fellowship": 2,
  "advantage": "Wisdom of the Grey Pilgrim",
  "advantageText": "Spend 1 Fellowship point to roll an extra d20 after a saving throw and use either die.",
  "agenda": "Warn the Free Peoples, inspire them to action.",
  "where": "Anywhere and nowhere — Bree, the Shire, Rivendell, on the road.",
  "description": "The Grey Pilgrim, ever wandering, who kindles the hearts of the Free Peoples against the Shadow."
 },
 {
  "name": "Gilraen the Fair",
  "race": "Dúnadan",
  "callings": [
   "Champion",
   "Warden"
  ],
  "fellowship": 0,
  "advantage": "Gilraen's Folk",
  "advantageText": "At the start of a journey, spend 1 Fellowship point: while within the bounds of old Arnor, after each Journey Events roll you may roll a d20 and choose which result is used. Meeting her also yields a rumour.",
  "agenda": "Fight the Enemy, defend the weak.",
  "where": "Among the hidden homes of the Dúnedain of the North.",
  "description": "Mother of Aragorn, widow of Arathorn: grim, wary, with a measure of foresight."
 },
 {
  "name": "Tom Bombadil and Lady Goldberry",
  "race": "—",
  "callings": [
   "Treasure Hunter",
   "Warden"
  ],
  "fellowship": 2,
  "advantage": "Master of Wood, Water and Hill",
  "advantageText": "Spend all remaining Fellowship to call on Tom's or Goldberry's aid anywhere within Tom's country.",
  "agenda": "Protect the land, find and preserve what was buried.",
  "where": "Their house at the edge of the Old Forest.",
  "description": "The eldest Master, merry and unfathomable, and the River-daughter his lady."
 }
];
window.LOTR_PATRONS = LOTR_PATRONS;
var LOTR_REWARDS = [
 {
  "name": "Close-fitting",
  "item": "Armour",
  "description": "Any critical hit against you becomes a normal hit while you wear it."
 },
 {
  "name": "Cunning-make",
  "item": "Armour",
  "description": "Half weight. If it imposed disadvantage on fatigue saves it no longer does; otherwise its maximum Dexterity bonus to AC rises by 1."
 },
 {
  "name": "Fell",
  "item": "Weapon",
  "description": "On a critical hit, roll two extra weapon damage dice. For ammunition-weapons, apply it to one piece of ammunition instead (choose to use it after rolling the attack, before the result; always recovered after the fight)."
 },
 {
  "name": "Grievous",
  "item": "Weapon",
  "description": "+1 to damage rolls with this weapon."
 },
 {
  "name": "Keen",
  "item": "Weapon",
  "description": "Scores a critical hit on a roll of 19–20."
 },
 {
  "name": "Reinforced",
  "item": "Shield",
  "description": "+1 AC on top of the shield's normal bonus."
 }
];
window.LOTR_REWARDS = LOTR_REWARDS;
var LOTR_REWARD_LEVELS = [
 3,
 5,
 7,
 9
];
window.LOTR_REWARD_LEVELS = LOTR_REWARD_LEVELS;
var LOTR_REWARD_NOTES = [
 "Rewards are fine war gear awarded for deeds — they cannot be bought. Choose one at 3rd, 5th, 7th and 9th level.",
 "Each reward applies only once per item, and never to a Famous Weapon or Armour.",
 "Rewarded items have 'plot immunity': never lost, broken or sold. With the Company's agreement, spend 1 Fellowship point to borrow a companion's rewarded or magical item until the end of the Adventuring Phase."
];
window.LOTR_REWARD_NOTES = LOTR_REWARD_NOTES;
var LOTR_SAFE_HAVENS = [
 "Bree (The Prancing Pony)",
 "Rivendell",
 "Tharbad",
 "The Grey Havens",
 "Bag End / the Shire",
 "Thorin's Halls (Blue Mountains)"
];
window.LOTR_SAFE_HAVENS = LOTR_SAFE_HAVENS;
var LOTR_SHADOW = {
 "rules": [
  "Shadow points are tracked on the sheet; you can't have more than your Wisdom score.",
  "Dread, Greed and Sorcery may be resisted with a saving throw: success reduces the gain by 1; success by 5 or more reduces it by 2.",
  "Misdeeds can never be resisted.",
  "Miserable when Shadow ≥ half your Wisdom (rounded up); Anguished when Shadow ≥ your Wisdom.",
  "Harden Will: while Shadow is still below your Wisdom, you may clear all your Shadow and take a single Shadow Scar instead. Scars count as Shadow points but only Heal Scars (Yule) removes them.",
  "Spiritual Recovery at each Fellowship Phase removes 1–3 Shadow, depending on how badly the Company hurt the Enemy."
 ],
 "sources": [
  {
   "name": "Dread",
   "save": "CHA",
   "description": "Witnessing horror, terrible foes, cursed places, the power of the Enemy."
  },
  {
   "name": "Greed",
   "save": "WIS",
   "description": "Laying hands on tainted hoards and precious things long held in the dark."
  },
  {
   "name": "Misdeeds",
   "save": "—",
   "description": "Doing (or attempting) something wrong — automatic Shadow, no save. The Loremaster should warn first."
  },
  {
   "name": "Sorcery",
   "save": "INT",
   "description": "Falling victim to the dark spells of the Enemy and his servants."
  }
 ],
 "dread": [
  {
   "points": 1,
   "source": "Unexpected tragedy or grievous occurrence",
   "example": "A serious accident, a death in the family, a natural disaster"
  },
  {
   "points": 2,
   "source": "Gruesome killing, dreadful experience, Orc-work",
   "example": "Finding villagers savagely mutilated; experiencing slavery"
  },
  {
   "points": 3,
   "source": "Harrowing ordeal, physical and spiritual torment",
   "example": "Torture; being haunted by a Wight"
  },
  {
   "points": 4,
   "source": "Directly experiencing the power of the Enemy",
   "example": "Seeing a Shadow army muster; the Eye in a Palantír"
  }
 ],
 "misdeeds": [
  {
   "points": "1",
   "action": "Violent threats and malicious lies; heedless cruelty"
  },
  {
   "points": "2",
   "action": "Manipulating others; abusing authority; deliberate cruelty"
  },
  {
   "points": "3",
   "action": "Theft or plunder; oathbreaking or cowardice; treachery"
  },
  {
   "points": "4",
   "action": "Torment or torture; killing or crippling a surrendered foe or harmless folk"
  },
  {
   "points": "4 + 1 Scar",
   "action": "Murder; willingly serving the Enemy"
  }
 ],
 "misdeedIntention": "Attempting a misdeed counts even if it fails. An unknowing misdeed (later shown to be wrong) only costs Shadow if the hero makes no amends; earnest contrition allows a DC 15 Wisdom save to resist.",
 "madness": [
  "An anguished hero must play out a bout of madness in the current Adventuring Phase — losing control and doing something they'll regret, shaped by the last Shadow source, their Shadow Path, or a flaw.",
  "Typical bouts: Betrayal (fail a duty), Fear (flee all danger), Lust (seize what isn't yours), Rage (lash out at a perceived wrong).",
  "Afterwards: no longer anguished, all current Shadow cleared, and advance one step along your Shadow Path (gain its next flaw).",
  "Ending an Adventuring Phase still anguished means the hero leaves the Company and retires.",
  "With all four flaws, the next time Shadow reaches Wisdom the hero is lost — to madness (Men, Hobbits, Dwarves) or sails West (Elves).",
  "Flaws: when one plausibly hampers an ability check, that check has disadvantage."
 ],
 "paths": [
  {
   "name": "Curse of Vengeance",
   "calling": "Champion",
   "flaws": [
    "Spiteful",
    "Brutal",
    "Cruel",
    "Murderous"
   ],
   "description": "Those who live by the sword are ever tempted to draw it when thwarted or insulted."
  },
  {
   "name": "Dragon-Sickness",
   "calling": "Treasure Hunter",
   "flaws": [
    "Grasping",
    "Mistrustful",
    "Deceitful",
    "Thieving"
   ],
   "description": "The age-old disease that turns enchanted gold to bitter ashes and shrinks the world to a guarded hoard."
  },
  {
   "name": "Lure of Power",
   "calling": "Captain",
   "flaws": [
    "Resentful",
    "Arrogant",
    "Overconfident",
    "Tyrannical"
   ],
   "description": "Authority tempts its holder to mistake their own aggrandisement for the good of those they lead."
  },
  {
   "name": "Lure of Secrets",
   "calling": "Scholar",
   "flaws": [
    "Haughty",
    "Scornful",
    "Scheming",
    "Traitorous"
   ],
   "description": "The hunger for hidden knowledge breeds contempt for the 'ignorant'."
  },
  {
   "name": "Path of Despair",
   "calling": "Warden",
   "flaws": [
    "Troubled",
    "Wavering",
    "Guilt-ridden",
    "Fearful"
   ],
   "description": "Self-doubt: is my strength enough, or will I drag the innocent down with me?"
  },
  {
   "name": "Wandering-Madness",
   "calling": "Messenger",
   "flaws": [
    "Idle",
    "Forgetful",
    "Uncaring",
    "Cowardly"
   ],
   "description": "The Road goes ever on — but a messenger with nothing to fight for may wander forever."
  }
 ],
 "flawText": {
  "Spiteful": "Repays slights with vicious rudeness.",
  "Brutal": "Reacts violently, with little restraint.",
  "Cruel": "Indifferent to the suffering caused; savage to foes.",
  "Murderous": "Sees killing as a natural way to get what you want.",
  "Grasping": "Hoards gold and precious things for their own sake.",
  "Mistrustful": "Suspects even friends' advice of hidden motives.",
  "Deceitful": "Lies and schemes without shame.",
  "Thieving": "Simply takes whatever you desire.",
  "Resentful": "Bitter at those who won't heed your wisdom.",
  "Arrogant": "Belittles companions to stress your own importance.",
  "Overconfident": "Blind to your limits and to the cost to others.",
  "Tyrannical": "Any dissent is betrayal; any means justify your cause.",
  "Haughty": "Brushes aside others' wisdom and offers of help.",
  "Scornful": "Mocks others' ideas as inadequate.",
  "Scheming": "Keeps your own counsel, agrees only to go your own way.",
  "Traitorous": "Will betray friends when it pays.",
  "Troubled": "Disquiet clouds your judgement and counsel.",
  "Wavering": "Vacillates, unable to choose quickly.",
  "Guilt-ridden": "Remorse makes you refuse any daring course.",
  "Fearful": "So beset by worry you won't risk anything.",
  "Idle": "Easily distracted; must be cajoled into action.",
  "Forgetful": "Absent-minded, forgets even important things.",
  "Uncaring": "Loses compassion and interest in others' troubles.",
  "Cowardly": "Saves yourself above all else."
 }
};
window.LOTR_SHADOW = LOTR_SHADOW;
var LOTR_SKILLS = [
 {
  "name": "Acrobatics",
  "ability": "DEX",
  "description": "Keep your footing, tumble, balance on narrow ledges or slippery ground."
 },
 {
  "name": "Animal Handling",
  "ability": "WIS",
  "description": "Calm, ride, or read the mood of beasts — ponies, horses, hounds."
 },
 {
  "name": "Athletics",
  "ability": "STR",
  "description": "Climb, jump, swim, and other feats of raw physical effort."
 },
 {
  "name": "Deception",
  "ability": "CHA",
  "description": "Mislead others with half-truths, disguises, or outright lies."
 },
 {
  "name": "Explore",
  "ability": "WIS",
  "description": "Find your way through unfamiliar wild country, cope with weather and natural hazards, blaze trails, and pick good campsites.",
  "lotr": true
 },
 {
  "name": "Hunting",
  "ability": "WIS",
  "description": "Track and take game (or fish, or set snares); read spoor and identify a quarry — even Orcs, Spiders, or Wargs.",
  "lotr": true
 },
 {
  "name": "Insight",
  "ability": "WIS",
  "description": "Read a person's true intentions, mood, or honesty."
 },
 {
  "name": "Intimidation",
  "ability": "CHA",
  "description": "Sway others by threats, presence, or sheer force of personality."
 },
 {
  "name": "Investigation",
  "ability": "INT",
  "description": "Search for clues, deduce how something happened, find what is hidden."
 },
 {
  "name": "Medicine",
  "ability": "INT",
  "description": "Tend wounds and sickness. In Middle-earth this is an Intelligence skill.",
  "lotr": true
 },
 {
  "name": "Nature",
  "ability": "INT",
  "description": "Know plants, beasts, weather, and the ways of the natural world."
 },
 {
  "name": "Old Lore",
  "ability": "INT",
  "description": "Recall the history of bygone days — tales of the Elder Days, lines of kings, lost places and deeds. (Replaces History.)",
  "lotr": true
 },
 {
  "name": "Perception",
  "ability": "WIS",
  "description": "Notice danger, spot hidden things, hear what others miss."
 },
 {
  "name": "Performance",
  "ability": "CHA",
  "description": "Sing, recite, play, or tell a tale to move an audience."
 },
 {
  "name": "Persuasion",
  "ability": "CHA",
  "description": "Win others over with tact, courtesy, and good argument."
 },
 {
  "name": "Riddle",
  "ability": "INT",
  "description": "Pose or solve riddles, and piece together conclusions from scattered scraps of information by deduction and intuition.",
  "lotr": true
 },
 {
  "name": "Sleight of Hand",
  "ability": "DEX",
  "description": "Pick pockets, palm objects, perform deft manual tricks."
 },
 {
  "name": "Stealth",
  "ability": "DEX",
  "description": "Move unseen and unheard; hide from watchful eyes."
 },
 {
  "name": "Travel",
  "ability": "WIS",
  "description": "Judge the length of a journey, read a map, and size up strangers met on the road. Used by the Guide for pathfinding checks.",
  "lotr": true
 }
];
window.LOTR_SKILLS = LOTR_SKILLS;
var LOTR_STANDARDS = [
 {
  "name": "Frugal",
  "cultures": [
   "Elves of Lindon",
   "Rangers of the North"
  ],
  "gear": [
   "Backpack",
   "Bedroll",
   "Mess kit",
   "Tinderbox",
   "Rations (1 day) ×10",
   "Waterskin"
  ],
  "coin": "10 s",
  "weight": "40 lb"
 },
 {
  "name": "Common",
  "cultures": [
   "Hobbits of the Shire",
   "Men of Bree"
  ],
  "gear": [
   "Backpack",
   "Bedroll",
   "Mess kit",
   "Tinderbox",
   "Torches (bundle of 10)",
   "Rations (1 day) ×10",
   "Waterskin",
   "Rope, hempen (50 feet)"
  ],
  "coin": "15 s",
  "weight": "60 lb"
 },
 {
  "name": "Prosperous",
  "cultures": [
   "Bardings",
   "Dwarves of Durin's Folk"
  ],
  "gear": [
   "Backpack",
   "Bedroll",
   "Mess kit",
   "Tinderbox",
   "Lantern, hooded",
   "Oil (flask) ×3",
   "Rations, cram (1 day) ×10",
   "Waterskin",
   "Rope, silk (50 feet)",
   "Tent, two-person"
  ],
  "coin": "20 s",
  "weight": "60 lb"
 },
 {
  "name": "Rich",
  "cultures": [],
  "gear": [],
  "coin": "",
  "weight": ""
 },
 {
  "name": "Very Rich",
  "cultures": [],
  "gear": [],
  "coin": "",
  "weight": ""
 }
];
window.LOTR_STANDARDS = LOTR_STANDARDS;
var LOTR_TABLES = {
 "maxLevel": 10,
 "standardArray": [
  15,
  14,
  13,
  12,
  10,
  8
 ],
 "pointBuyCosts": {
  "8": 0,
  "9": 1,
  "10": 2,
  "11": 3,
  "12": 4,
  "13": 5,
  "14": 7,
  "15": 9
 },
 "pointBuyBudget": 27,
 "proficiencyByLevel": [
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4
 ],
 "xpByLevel": [
  0,
  300,
  900,
  2700,
  6500,
  14000,
  23000,
  34000,
  48000,
  64000
 ],
 "beyondTenth": "Past 10th level a hero keeps earning XP: for every 10,000 XP beyond 64,000, choose one of — a Craft (slot + craft), a Fighting Style, a Hit Die (d6, +1d6 or 4 + CON max HP; repeatable), a Reward (repeatable), Sneak Attack (1d6), or a Virtue.",
 "coinage": "1 gold piece (g) = 10 silver pennies (s); 1 silver penny = 10 copper coins (c). Silver and copper circulate; gold is rare and hoarded.",
 "encumbrance": [
  "Carrying more than 5 × STR (lb): encumbered — speed −10 ft., disadvantage on Strength (Athletics), Dexterity (Acrobatics) checks and fatigue saving throws.",
  "Carrying more than 10 × STR (lb), up to maximum capacity: heavily encumbered — speed −20 ft., disadvantage on ability checks, attack rolls and saving throws using STR, DEX or CON.",
  "Maximum carrying capacity and push/drag/lift are figured as usual (15 × STR)."
 ],
 "resting": [
  "Long rests can only be taken in a sheltered, safe refuge — a safe haven, a friendly town, or (Loremaster's call) a well-hidden spot in the wild. Not on the road.",
  "During a journey a short rest takes at least 8 hours of sleep or light activity. After the Company stops travelling for 24 hours, short rests return to 1 hour."
 ],
 "magicalSuccess": [
  "Some talents, virtues and artefacts let a hero obtain a magical success on an ability check: an automatic success regardless of the DC, ignoring conditions.",
  "In a contest, a magical success wins unless the other side also scores one.",
  "If an exact roll is needed, a magical success counts as a natural 20.",
  "It lets a hero attempt deeds nearly impossible without supernatural aid — the result should read as plainly uncanny."
 ],
 "inspiration": "Loremasters grant inspiration as usual — especially when a hero is played true to the distinctive features of their background.",
 "exhaustion": [
  {
   "level": 1,
   "effect": "Disadvantage on ability checks"
  },
  {
   "level": 2,
   "effect": "Speed halved"
  },
  {
   "level": 3,
   "effect": "Disadvantage on attack rolls and saving throws"
  },
  {
   "level": 4,
   "effect": "Hit point maximum halved"
  },
  {
   "level": 5,
   "effect": "Speed reduced to 0"
  },
  {
   "level": 6,
   "effect": "Death"
  }
 ]
};
window.LOTR_TABLES = LOTR_TABLES;
var LOTR_TREASURE = {
 "hoards": [
  {
   "rating": "Lesser",
   "examples": "A solitary Troll's loot, Goblin plunder, a bandits' hoard",
   "value": "2d8",
   "avg": 9,
   "magicRolls": 1,
   "greedDC": 10
  },
  {
   "rating": "Greater",
   "examples": "An old hoard, a Dwarf-hoard",
   "value": "3d10",
   "avg": 16,
   "magicRolls": 2,
   "greedDC": 15
  },
  {
   "rating": "Marvellous",
   "examples": "An ancient hoard, a Dwarf-city's treasury, a Dragon-hoard",
   "value": "4d12",
   "avg": 26,
   "magicRolls": 3,
   "greedDC": 20
  }
 ],
 "hoardNote": "At most two hoards per Adventuring Phase — a lesser and a greater, or one marvellous. Value is in gold pieces; split among the Company. Roll the magic d20s: each 15+ is a piece of magical treasure. Greed: the hoard's Shadow is resisted with a Wisdom save at the hoard's DC.",
 "magical": [
  {
   "min": 1,
   "max": 14,
   "result": "No magical treasure",
   "shadow": "1d4−2 (min 0)"
  },
  {
   "min": 15,
   "max": 17,
   "result": "Marvellous Artefact (one blessing)",
   "shadow": "1d6−3 (min 0)"
  },
  {
   "min": 18,
   "max": 19,
   "result": "Wondrous Item (two blessings)",
   "shadow": "1d8−4 (min 0)"
  },
  {
   "min": 20,
   "max": 20,
   "result": "Famous Weapon or Armour",
   "shadow": "1d8−4 (min 0)"
  }
 ],
 "blessings": [
  {
   "roll": 1,
   "skill": "Acrobatics",
   "objects": "boots, cloak, ring"
  },
  {
   "roll": 2,
   "skill": "Animal Handling",
   "objects": "circlet, ring, staff"
  },
  {
   "roll": 3,
   "skill": "Athletics",
   "objects": "belt, boots, ring"
  },
  {
   "roll": 4,
   "skill": "Deception",
   "objects": "amulet, circlet, ring"
  },
  {
   "roll": 5,
   "skill": "Explore",
   "objects": "boots, ring, staff"
  },
  {
   "roll": 6,
   "skill": "Hunting",
   "objects": "boots, cloak, ring"
  },
  {
   "roll": 7,
   "skill": "Insight",
   "objects": "circlet, pipe, ring"
  },
  {
   "roll": 8,
   "skill": "Intimidation",
   "objects": "cloak, horn, ring"
  },
  {
   "roll": 9,
   "skill": "Investigation",
   "objects": "amulet, circlet, ring"
  },
  {
   "roll": 10,
   "skill": "Medicine",
   "objects": "healer's kit, herbalism kit, ring"
  },
  {
   "roll": 11,
   "skill": "Nature",
   "objects": "book, circlet, ring"
  },
  {
   "roll": 12,
   "skill": "Old Lore",
   "objects": "book, circlet, ring"
  },
  {
   "roll": 13,
   "skill": "Perception",
   "objects": "amulet, circlet, ring"
  },
  {
   "roll": 14,
   "skill": "Performance",
   "objects": "musical instrument, pipe, ring"
  },
  {
   "roll": 15,
   "skill": "Persuasion",
   "objects": "amulet, circlet, ring"
  },
  {
   "roll": 16,
   "skill": "Riddle",
   "objects": "circlet, pipe, ring"
  },
  {
   "roll": 17,
   "skill": "Sleight of Hand",
   "objects": "cloak, gloves, ring"
  },
  {
   "roll": 18,
   "skill": "Stealth",
   "objects": "boots, cloak, ring"
  },
  {
   "roll": 19,
   "skill": "Travel",
   "objects": "boots, ring, staff"
  },
  {
   "roll": 20,
   "skill": "Roll twice and choose",
   "objects": ""
  }
 ],
 "blessingDie": [
  {
   "pb": 2,
   "die": "1d4"
  },
  {
   "pb": 3,
   "die": "1d6"
  },
  {
   "pb": 4,
   "die": "1d8"
  }
 ],
 "blessingRules": [
  "A Marvellous Artefact carries one blessing; a Wondrous Item two. Each blessing names a skill.",
  "The bearer adds a Blessing die (1d4 at PB +2, 1d6 at +3, 1d8 at +4) to checks with a blessed skill — only one Blessing die per check.",
  "The bearer can also obtain a magical success with a blessed skill: half proficiency bonus times per long rest (Artefact) or proficiency bonus times (Wondrous Item)."
 ],
 "famousRules": [
  "Design: choose item type → craftsmanship (Elven, Dwarven, Númenórean) → banes (Elven: one of Orcs, Wolves, Spiders; Númenórean: two of Orcs, Trolls, Wolves, Evil Men, Undead) → up to 3 qualities, at least one enchanted reward → name it.",
  "Qualities wake with the bearer: one at levels 1–4, two at 5–8, three at 9+ (in Treasure Index order unless studied).",
  "Magical treasure is personal — it is meant for its finder and shouldn't be passed around."
 ],
 "precious": {
  "form": [
   "Jewel (single gem)",
   "Brooch",
   "Necklace",
   "Circlet or crown",
   "Belt, chain, or armband",
   "Ring"
  ],
  "material": [
   "Pearl",
   "Sapphire",
   "Ruby",
   "Amethyst",
   "Adamant / white gem / clear crystal",
   "Emerald / green gem / green crystal"
  ],
  "craft": [
   "Mannish, Westernesse",
   "Elven, Eregion",
   "Dwarven, Khazad-dûm",
   "Dwarven, Erebor",
   "Dwarven, Beleriand (Nogrod or Belegost)",
   "Elven, Beleriand"
  ]
 },
 "curses": [
  {
   "name": "Curse of Weakness",
   "text": "The bearer shows the worst flaw of their own Shadow Path (temporary; doesn't count toward succumbing)."
  },
  {
   "name": "Darken",
   "text": "When revealed, light dims within 30 ft. — bright becomes dim, dim becomes dark."
  },
  {
   "name": "Hunted",
   "text": "One kind of enemy senses the item nearby; journey events may revolve around the hunt."
  },
  {
   "name": "Ill-Luck",
   "text": "Whenever the bearer rolls a natural 20, they must reroll and keep the new roll."
  },
  {
   "name": "Ill-Omen",
   "text": "+5 to the DC of all the bearer's checks during councils."
  },
  {
   "name": "Malice",
   "text": "The bearer takes −2 on saving throws."
  },
  {
   "name": "Owned",
   "text": "In its true owner's presence the item's powers fail entirely."
  },
  {
   "name": "Shadow Taint",
   "text": "While carried, the bearer's Shadow is raised (1 per blessing, or 1 + enchanted rewards for war gear) — unhealable until lifted."
  },
  {
   "name": "Weakening",
   "text": "Disadvantage on all checks and saves with one chosen ability."
  }
 ],
 "curseNote": "A curse may lie dormant until triggered (leaving the place it was found, moonlight, first blood, a certain foe, entering a Dark Land). Lifting it should be an adventure in itself."
};
window.LOTR_TREASURE = LOTR_TREASURE;
var LOTR_VIRTUES = [
 {
  "name": "Confidence",
  "category": "Common",
  "asi": {
   "choose": [
    "INT",
    "WIS",
    "CHA"
   ],
   "amount": 1
  },
  "benefits": [
   "Gain proficiency in Intelligence, Wisdom or Charisma saving throws (your choice)."
  ],
  "source": "core",
  "flavor": "Hardship overcome has renewed your faith in a brighter future.",
  "grants": {
   "saveChoice": [
    "INT",
    "WIS",
    "CHA"
   ]
  }
 },
 {
  "name": "Dour-Handed",
  "category": "Common",
  "asi": {
   "choose": [
    "STR"
   ],
   "amount": 1
  },
  "benefits": [
   "+1 to weapon damage rolls that use Strength."
  ],
  "source": "core",
  "flavor": "Your blows land harder and your aim is steadier.",
  "mods": {
   "strDamage": 1
  }
 },
 {
  "name": "Hardiness",
  "category": "Common",
  "asi": {
   "choose": [
    "CON"
   ],
   "amount": 1
  },
  "benefits": [
   "Your hit point maximum rises by your current level, and by 1 more each time you gain a level."
  ],
  "source": "core",
  "flavor": "Toil and hardship have toughened you.",
  "mods": {
   "hpPerLevel": 1
  }
 },
 {
  "name": "Mastery",
  "category": "Common",
  "asi": {
   "choose": [
    "STR",
    "DEX",
    "CON",
    "INT",
    "WIS",
    "CHA"
   ],
   "amount": 1
  },
  "benefits": [
   "Gain one skill, tool or weapon proficiency.",
   "Choose a skill or tool you're proficient in: gain Expertise (double proficiency) with it."
  ],
  "source": "core",
  "flavor": "Practice has made some skills second nature.",
  "grants": {
   "profChoice": 1,
   "expertiseChoice": 1
  }
 },
 {
  "name": "Nimbleness",
  "category": "Common",
  "asi": {
   "choose": [
    "DEX"
   ],
   "amount": 1
  },
  "benefits": [
   "+1 AC — lost while incapacitated or wielding a shield."
  ],
  "source": "core",
  "flavor": "Skill — or luck — keeps you out of harm's way.",
  "mods": {
   "acNoShield": 1
  }
 },
 {
  "name": "Prowess",
  "category": "Common",
  "asi": {
   "prowess": true
  },
  "benefits": [
   "Increase one ability score by 2, or two ability scores by 1 (maximum 20)."
  ],
  "source": "core",
  "flavor": "Adventuring has honed your inborn talents."
 },
 {
  "name": "Dragon-Slayer",
  "category": "Bardings",
  "asi": {
   "choose": [
    "STR",
    "DEX"
   ],
   "amount": 1
  },
  "benefits": [
   "Advantage on attack rolls against Large or larger creatures."
  ],
  "source": "core",
  "flavor": "Inspired by Bard, you have long studied how to bring down great monsters."
 },
 {
  "name": "Dwarf-Friend",
  "category": "Bardings",
  "asi": {
   "choose": [
    "CHA"
   ],
   "amount": 1
  },
  "benefits": [
   "Double proficiency on Charisma (Persuasion) checks, with advantage when dealing with Dwarves.",
   "The Company's Fellowship rating +1.",
   "Within 5 ft. of a friendly Dwarf (one of you not incapacitated): spend 1 Fellowship point to impose disadvantage on an attack against either of you."
  ],
  "source": "core",
  "flavor": "The days of the Dragon forged a lasting friendship between Dale and Erebor.",
  "mods": {
   "fellowship": 1
  }
 },
 {
  "name": "Fierce Shot",
  "category": "Bardings",
  "asi": {
   "choose": [
    "STR",
    "DEX"
   ],
   "amount": 1
  },
  "benefits": [
   "Use Strength or Dexterity for ranged weapon attack and damage rolls (same for both).",
   "If you moved no more than half your speed and hit with a ranged weapon, a bonus action adds 1d4 damage of the weapon's type."
  ],
  "source": "core",
  "flavor": "Your grip is steady and your aim true."
 },
 {
  "name": "High Destiny",
  "category": "Bardings",
  "asi": {
   "choose": [
    "CON"
   ],
   "amount": 1
  },
  "benefits": [
   "Advantage on death saving throws.",
   "Whenever you become stable you also regain 1 hit point."
  ],
  "source": "core",
  "flavor": "Those of Girion's line are said to be destined for greatness."
 },
 {
  "name": "Stout-Hearted",
  "category": "Bardings",
  "asi": {
   "choose": [
    "WIS",
    "CHA"
   ],
   "amount": 1
  },
  "benefits": [
   "Advantage on Charisma saving throws.",
   "You can't be frightened by creatures that aren't Undead."
  ],
  "source": "core",
  "flavor": "Living in the shadow of Smaug made your folk brave."
 },
 {
  "name": "The Language of Birds",
  "category": "Bardings",
  "asi": {
   "choose": [
    "INT",
    "WIS"
   ],
   "amount": 1
  },
  "benefits": [
   "Speak with birds; magical success on bird-related Nature and Animal Handling checks.",
   "Outdoors, gain advantage on an ability check, attack or save — uses = proficiency bonus per long rest."
  ],
  "source": "core",
  "flavor": "The wise of Dale can understand the speech of birds.",
  "uses": "PB/long"
 },
 {
  "name": "Baruk Khazâd!",
  "category": "Dwarves of Durin's Folk",
  "asi": {
   "choose": [
    "STR",
    "CHA"
   ],
   "amount": 1
  },
  "benefits": [
   "Bonus action: each hostile creature within 30 ft. that can see and hear you makes a Charisma (Intimidation) check vs DC 8 + proficiency bonus + STR or CHA modifier, or is frightened until the end of your next turn; attacks against creatures frightened this way have advantage. Once per short or long rest."
  ],
  "source": "core",
  "flavor": "The Dwarves' battle-cry is known and feared by their foes.",
  "uses": "1/short"
 },
 {
  "name": "Broken Spells",
  "category": "Dwarves of Durin's Folk",
  "asi": {
   "choose": [
    "STR",
    "DEX",
    "CON",
    "INT",
    "WIS",
    "CHA"
   ],
   "amount": 1
  },
  "benefits": [
   "Choose three skills or tools you're proficient with: you can obtain a magical success on checks with them. Uses = proficiency bonus per long rest."
  ],
  "source": "core",
  "flavor": "You know fragments of the mighty spells of old.",
  "uses": "PB/long"
 },
 {
  "name": "Dark for Dark Business",
  "category": "Dwarves of Durin's Folk",
  "asi": {
   "choose": [
    "WIS"
   ],
   "amount": 1
  },
  "benefits": [
   "Dim light doesn't impose disadvantage on your sight-based Perception.",
   "In dim light, darkness or underground, gain advantage on a check, attack or save — uses = proficiency bonus per long rest."
  ],
  "source": "core",
  "flavor": "You are at ease in the cold embrace of the dark.",
  "uses": "PB/long"
 },
 {
  "name": "Durin's Way",
  "category": "Dwarves of Durin's Folk",
  "asi": {
   "choose": [
    "DEX"
   ],
   "amount": 1
  },
  "benefits": [
   "With half or three-quarters cover, an extra +1 to AC and Dexterity saves.",
   "Creatures don't gain advantage on attacks against you for being unseen by you."
  ],
  "source": "core",
  "flavor": "You were taught to fight among corners, dark and stone."
 },
 {
  "name": "Stone-Hard",
  "category": "Dwarves of Durin's Folk",
  "asi": {
   "choose": [
    "CON"
   ],
   "amount": 1
  },
  "benefits": [
   "When reduced to 0 HP but not killed outright, drop to 1 HP instead. Once per short or long rest."
  ],
  "source": "core",
  "flavor": "Made to endure in an evil age.",
  "uses": "1/short"
 },
 {
  "name": "Untameable Spirit",
  "category": "Dwarves of Durin's Folk",
  "asi": {
   "choose": [
    "INT",
    "WIS"
   ],
   "amount": 1
  },
  "benefits": [
   "Immune to being charmed.",
   "Advantage on Intelligence saving throws."
  ],
  "source": "core",
  "flavor": "Dwarves were made to resist domination."
 },
 {
  "name": "Against the Unseen",
  "category": "Elves of Lindon",
  "asi": {
   "choose": [
    "WIS",
    "CHA"
   ],
   "amount": 1
  },
  "benefits": [
   "Advantage on Charisma saving throws.",
   "You can't be frightened by Undead."
  ],
  "source": "core",
  "flavor": "You perceive the wraith-world and steel your heart against it."
 },
 {
  "name": "Deadly Archery",
  "category": "Elves of Lindon",
  "asi": {
   "choose": [
    "DEX"
   ],
   "amount": 1
  },
  "benefits": [
   "Bonus action, if you haven't moved this turn: advantage on your next ranged weapon attack this turn; your speed becomes 0 until the end of the turn."
  ],
  "source": "core",
  "flavor": "Your arrows find their mark with uncanny precision."
 },
 {
  "name": "Elbereth Gilthoniel!",
  "category": "Elves of Lindon",
  "asi": {
   "choose": [
    "INT",
    "WIS",
    "CHA"
   ],
   "amount": 1
  },
  "benefits": [
   "When not miserable, gain advantage on an ability check, attack or save — uses = proficiency bonus per long rest."
  ],
  "source": "core",
  "flavor": "In great need you call upon the Queen of the Stars.",
  "uses": "PB/long"
 },
 {
  "name": "Elvish Spirit",
  "category": "Elves of Lindon",
  "asi": {
   "choose": [
    "CON"
   ],
   "amount": 1
  },
  "benefits": [
   "After meditating at least 4 hours: reduce exhaustion by 1 and regain all lost HP. Not if you had a long rest in the last 24 hours or are at 0 HP. Once per long rest."
  ],
  "source": "core",
  "flavor": "Your body recovers swiftly in the secret repose of your folk.",
  "uses": "1/long"
 },
 {
  "name": "Gleam of Wrath",
  "category": "Elves of Lindon",
  "asi": {
   "choose": [
    "STR",
    "DEX"
   ],
   "amount": 1
  },
  "benefits": [
   "Bonus action: a melee weapon you wield sheds dim sunlight (radius = its reach) until your next turn and deals radiant damage.",
   "On a critical hit with a weapon attack, roll one weapon damage die again as extra radiant damage."
  ],
  "source": "core",
  "flavor": "Your kindred's wrath gleams on your blade like chill flame."
 },
 {
  "name": "Memory of Ancient Days",
  "category": "Elves of Lindon",
  "asi": {
   "choose": [
    "INT",
    "WIS"
   ],
   "amount": 1
  },
  "benefits": [
   "Add your Intelligence modifier (min +1) to pathfinding checks.",
   "When you're the target of a journey event, roll on the table as if a Wild Land were a Border Land, and a Dark Land a Wild Land."
  ],
  "source": "core",
  "flavor": "You remember Eriador before it fell desolate."
 },
 {
  "name": "Art of Disappearing",
  "category": "Hobbits of the Shire",
  "asi": {
   "choose": [
    "DEX"
   ],
   "amount": 1
  },
  "benefits": [
   "Double proficiency on Dexterity (Stealth) checks.",
   "You can try to hide while only lightly obscured."
  ],
  "source": "core",
  "flavor": "Hobbits vanish quickly and quietly when big folk blunder by."
 },
 {
  "name": "Brave at a Pinch",
  "category": "Hobbits of the Shire",
  "asi": {
   "choose": [
    "STR",
    "DEX",
    "CON",
    "INT",
    "WIS",
    "CHA"
   ],
   "amount": 1
  },
  "benefits": [
   "Gain inspiration whenever a hostile creature or harmful effect imposes a condition on you, you gain a level of exhaustion, or you drop to half your HP maximum or less."
  ],
  "source": "core",
  "flavor": "Put a Hobbit in a tight place and see what is in them."
 },
 {
  "name": "Small Folk",
  "category": "Hobbits of the Shire",
  "asi": {
   "choose": [
    "DEX"
   ],
   "amount": 1
  },
  "benefits": [
   "Medium or larger creatures can't gain advantage on attacks against you while you aren't incapacitated.",
   "You don't provoke opportunity attacks from Medium or larger creatures."
  ],
  "source": "core",
  "flavor": "You have learned to use your size to advantage."
 },
 {
  "name": "Sure at the Mark",
  "category": "Hobbits of the Shire",
  "asi": {
   "choose": [
    "DEX"
   ],
   "amount": 1
  },
  "benefits": [
   "Proficient with improvised weapons; use STR or DEX for improvised ranged attacks.",
   "Bonus action, if you've taken no reactions this turn: advantage on your next ranged attack this turn; you can't take reactions until your next turn."
  ],
  "source": "core",
  "flavor": "Stoop for a stone and you are armed."
 },
 {
  "name": "Three is Company",
  "category": "Hobbits of the Shire",
  "asi": {
   "choose": [
    "CHA"
   ],
   "amount": 1
  },
  "benefits": [
   "The Company's Fellowship rating +1.",
   "Whenever you or a companion you can see spends a Fellowship point, up to your proficiency bonus companions (you included) who can see or hear you gain inspiration."
  ],
  "source": "core",
  "flavor": "You trust your friends more than great wisdom.",
  "mods": {
   "fellowship": 1
  }
 },
 {
  "name": "Tough as Old Tree-Roots",
  "category": "Hobbits of the Shire",
  "asi": {
   "choose": [
    "CON"
   ],
   "amount": 1
  },
  "benefits": [
   "When you roll Hit Dice to regain HP, use the maximum on each die instead."
  ],
  "source": "core",
  "flavor": "Hobbits recover wonderfully — if painfully — from falls and bruises.",
  "mods": {
   "maxHitDice": true
  }
 },
 {
  "name": "Bree-Pony",
  "category": "Men of Bree",
  "asi": {
   "choose": [
    "WIS"
   ],
   "amount": 1
  },
  "benefits": [
   "Your brave, clever pony uses your proficiency bonus and adds it to its ability scores, AC, checks and saves; it has Hit Dice equal to your level (min 2).",
   "It obeys you and acts on your initiative (Dash, Disengage or Dodge unless you spend an action to command otherwise). If it dies, find a new one at the next Yule."
  ],
  "source": "core",
  "flavor": "Like their owners, Bree-ponies are more than they seem.",
  "companion": "Pony"
 },
 {
  "name": "Defiance",
  "category": "Men of Bree",
  "asi": {
   "choose": [
    "CON"
   ],
   "amount": 1
  },
  "benefits": [
   "Bonus action: spend one Hit Die to heal yourself."
  ],
  "source": "core",
  "flavor": "The Bree-folk have outlasted many realms."
 },
 {
  "name": "Desperate Courage",
  "category": "Men of Bree",
  "asi": {
   "choose": [
    "STR",
    "DEX",
    "CON",
    "INT",
    "WIS",
    "CHA"
   ],
   "amount": 1
  },
  "benefits": [
   "Whenever you gain Shadow points, you also gain inspiration."
  ],
  "source": "core",
  "flavor": "You will stand against the Shadow, whatever it costs."
 },
 {
  "name": "Friendly and Familiar",
  "category": "Men of Bree",
  "asi": {
   "choose": [
    "CHA"
   ],
   "amount": 1
  },
  "benefits": [
   "The Company's Fellowship rating +1.",
   "Double proficiency on Wisdom (Insight) checks; advantage on your first Persuasion check with Dwarves, Elves, Hobbits and Men (not Dúnedain)."
  ],
  "source": "core",
  "flavor": "Your easy manners win friends among strangers.",
  "mods": {
   "fellowship": 1
  }
 },
 {
  "name": "Strange as News from Bree",
  "category": "Men of Bree",
  "asi": {
   "choose": [
    "INT",
    "WIS"
   ],
   "amount": 1
  },
  "benefits": [
   "Proficiency in Investigation (double if already proficient).",
   "Receive a rumour from the Loremaster during each Fellowship Phase."
  ],
  "source": "core",
  "flavor": "You know that travellers' tales can be precious."
 },
 {
  "name": "The Art of Smoking",
  "category": "Men of Bree",
  "asi": {
   "choose": [
    "INT",
    "WIS",
    "CHA"
   ],
   "amount": 1
  },
  "benefits": [
   "Double proficiency on checks with pipes.",
   "Use your pipe to gain inspiration a number of times equal to your proficiency bonus per long rest (instead of once)."
  ],
  "source": "core",
  "flavor": "Your pipe brings patience and clarity.",
  "uses": "PB/long"
 },
 {
  "name": "Endurance of the Ranger",
  "category": "Rangers of the North",
  "asi": {
   "choose": [
    "CON"
   ],
   "amount": 1
  },
  "benefits": [
   "Advantage on Constitution saving throws."
  ],
  "source": "core",
  "flavor": "A Ranger on a clear trail never wearies."
 },
 {
  "name": "Foresight of their Kindred",
  "category": "Rangers of the North",
  "asi": {
   "choose": [
    "WIS"
   ],
   "amount": 1
  },
  "benefits": [
   "Foresight points = Wisdom modifier (min 1), regained on a long rest. When you or a creature you can see makes a check, attack or save, spend one to reroll the d20 (must use the new roll). Or spend one after a Journey Events roll: roll a d20 and choose which result the Loremaster uses."
  ],
  "source": "core",
  "flavor": "A measure of the Númenórean foresight still warns you of danger to come.",
  "uses": "WIS/long"
 },
 {
  "name": "Heir of Arnor",
  "category": "Rangers of the North",
  "asi": {
   "choose": [
    "STR",
    "DEX",
    "CON",
    "INT",
    "WIS",
    "CHA"
   ],
   "amount": 1
  },
  "benefits": [
   "With the Loremaster, create a Wondrous Item or a Famous Weapon with one enchanted reward (it may take up to two ordinary rewards as normal), usually of Númenórean make."
  ],
  "source": "core",
  "flavor": "An heirloom of Lost Arnor has passed into your keeping."
 },
 {
  "name": "Royalty Revealed",
  "category": "Rangers of the North",
  "asi": {
   "choose": [
    "STR",
    "CHA"
   ],
   "amount": 1
  },
  "benefits": [
   "Bonus action: reveal your lineage. Up to twice your proficiency bonus friendly creatures (you included) within 30 ft. gain advantage on attacks and Intimidation checks and immunity to fear until the end of your next turn, plus temporary HP equal to your STR or CHA modifier (min 1). Once per short or long rest."
  ],
  "source": "core",
  "flavor": "Shout an ancestral cry or draw a blade of high lineage, and your allies' doubts fall away.",
  "uses": "1/short"
 },
 {
  "name": "Strength of Will",
  "category": "Rangers of the North",
  "asi": {
   "choose": [
    "WIS",
    "CHA"
   ],
   "amount": 1
  },
  "benefits": [
   "Advantage on Charisma saving throws, and add your Wisdom modifier (min +1) to them."
  ],
  "source": "core",
  "flavor": "You have heard the dead whisper from lonely barrows and are not dismayed."
 },
 {
  "name": "Ways of the Wild",
  "category": "Rangers of the North",
  "asi": {
   "choose": [
    "WIS"
   ],
   "amount": 1
  },
  "benefits": [
   "Take on several journey roles without penalty.",
   "Proficiency in Explore, Hunting or Travel (or Expertise in one if you have all three).",
   "On a Wisdom check with a proficient skill you can obtain a magical success — uses = proficiency bonus per long rest."
  ],
  "source": "core",
  "flavor": "The Wild is as familiar to you as the road home is to a Hobbit.",
  "uses": "PB/long"
 }
];
window.LOTR_VIRTUES = LOTR_VIRTUES;
var LOTR_WEAPONS = [
 {
  "name": "Axe",
  "category": "Simple",
  "kind": "Melee",
  "cost": "5 SP",
  "damage": "1d6",
  "damageType": "slashing",
  "weight": "3 lb",
  "properties": [
   "Versatile (1d8)"
  ],
  "mastery": "",
  "source": "core"
 },
 {
  "name": "Club",
  "category": "Simple",
  "kind": "Melee",
  "cost": "1 CP",
  "damage": "1d4",
  "damageType": "bludgeoning",
  "weight": "2 lb",
  "properties": [
   "Light"
  ],
  "mastery": "",
  "source": "core"
 },
 {
  "name": "Club, Great",
  "category": "Simple",
  "kind": "Melee",
  "cost": "2 CP",
  "damage": "1d8",
  "damageType": "bludgeoning",
  "weight": "10 lb",
  "properties": [
   "Two-Handed"
  ],
  "mastery": "",
  "source": "core"
 },
 {
  "name": "Dagger",
  "category": "Simple",
  "kind": "Melee",
  "cost": "2 SP",
  "damage": "1d4",
  "damageType": "piercing",
  "weight": "1 lb",
  "properties": [
   "Finesse",
   "Light",
   "Thrown (20/60)"
  ],
  "mastery": "",
  "source": "core"
 },
 {
  "name": "Hammer",
  "category": "Simple",
  "kind": "Melee",
  "cost": "2 SP",
  "damage": "1d6",
  "damageType": "bludgeoning",
  "weight": "3 lb",
  "properties": [],
  "mastery": "",
  "source": "core"
 },
 {
  "name": "Hatchet",
  "category": "Simple",
  "kind": "Melee",
  "cost": "5 SP",
  "damage": "1d6",
  "damageType": "slashing",
  "weight": "2 lb",
  "properties": [
   "Light",
   "Thrown (20/60)"
  ],
  "mastery": "",
  "source": "core"
 },
 {
  "name": "Spear",
  "category": "Simple",
  "kind": "Melee",
  "cost": "1 SP",
  "damage": "1d6",
  "damageType": "piercing",
  "weight": "3 lb",
  "properties": [
   "Thrown (20/60)",
   "Versatile (1d8)"
  ],
  "mastery": "",
  "source": "core"
 },
 {
  "name": "Spear, Short",
  "category": "Simple",
  "kind": "Melee",
  "cost": "5 CP",
  "damage": "1d6",
  "damageType": "piercing",
  "weight": "2 lb",
  "properties": [
   "Thrown (30/120)"
  ],
  "mastery": "",
  "source": "core"
 },
 {
  "name": "Staff",
  "category": "Simple",
  "kind": "Melee",
  "cost": "2 CP",
  "damage": "1d4",
  "damageType": "bludgeoning",
  "weight": "2 lb",
  "properties": [
   "Versatile (1d6)"
  ],
  "mastery": "",
  "source": "core"
 },
 {
  "name": "Bow",
  "category": "Simple",
  "kind": "Ranged",
  "cost": "25 SP",
  "damage": "1d6",
  "damageType": "piercing",
  "weight": "2 lb",
  "properties": [
   "Ammunition (80/320)",
   "Two-Handed"
  ],
  "mastery": "",
  "source": "core"
 },
 {
  "name": "Axe, Battle",
  "category": "Martial",
  "kind": "Melee",
  "cost": "10 SP",
  "damage": "1d8",
  "damageType": "slashing",
  "weight": "4 lb",
  "properties": [
   "Heavy",
   "Versatile (1d10)"
  ],
  "mastery": "",
  "source": "core"
 },
 {
  "name": "Axe, Great",
  "category": "Martial",
  "kind": "Melee",
  "cost": "30 SP",
  "damage": "1d12",
  "damageType": "slashing",
  "weight": "7 lb",
  "properties": [
   "Heavy",
   "Two-Handed"
  ],
  "mastery": "",
  "source": "core"
 },
 {
  "name": "Hammer, Heavy",
  "category": "Martial",
  "kind": "Melee",
  "cost": "10 SP",
  "damage": "1d8",
  "damageType": "bludgeoning",
  "weight": "4 lb",
  "properties": [
   "Heavy",
   "Versatile (1d10)"
  ],
  "mastery": "",
  "source": "core"
 },
 {
  "name": "Mattock",
  "category": "Martial",
  "kind": "Melee",
  "cost": "10 SP",
  "damage": "1d12",
  "damageType": "piercing",
  "weight": "10 lb",
  "properties": [
   "Heavy",
   "Two-Handed"
  ],
  "mastery": "",
  "source": "core"
 },
 {
  "name": "Spear, Great",
  "category": "Martial",
  "kind": "Melee",
  "cost": "20 SP",
  "damage": "1d10",
  "damageType": "piercing",
  "weight": "6 lb",
  "properties": [
   "Heavy",
   "Reach",
   "Two-Handed"
  ],
  "mastery": "",
  "source": "core"
 },
 {
  "name": "Sword",
  "category": "Martial",
  "kind": "Melee",
  "cost": "15 SP",
  "damage": "1d6",
  "damageType": "slashing",
  "weight": "2 lb",
  "properties": [
   "Finesse",
   "Versatile (1d8)"
  ],
  "mastery": "",
  "source": "core"
 },
 {
  "name": "Sword, Long",
  "category": "Martial",
  "kind": "Melee",
  "cost": "20 SP",
  "damage": "1d8",
  "damageType": "slashing",
  "weight": "3 lb",
  "properties": [
   "Heavy",
   "Versatile (1d10)"
  ],
  "mastery": "",
  "source": "core"
 },
 {
  "name": "Sword, Short",
  "category": "Martial",
  "kind": "Melee",
  "cost": "10 SP",
  "damage": "1d6",
  "damageType": "piercing",
  "weight": "2 lb",
  "properties": [
   "Finesse",
   "Light"
  ],
  "mastery": "",
  "source": "core"
 },
 {
  "name": "Great Bow",
  "category": "Martial",
  "kind": "Ranged",
  "cost": "50 SP",
  "damage": "1d8",
  "damageType": "piercing",
  "weight": "3 lb",
  "properties": [
   "Ammunition (150/600)",
   "Heavy",
   "Two-Handed"
  ],
  "mastery": "",
  "source": "core"
 }
];
window.LOTR_WEAPONS = LOTR_WEAPONS;
})();
