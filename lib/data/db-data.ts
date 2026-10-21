// GENERATED FILE - do not edit by hand.
// Source: data/db/parts/*.mjs - regenerate with: node scripts/build-db-data.mjs
// Dragonbane (Free League Publishing). Mechanics and table values are game facts;
// descriptive text is original paraphrase written for this app.
import type { DbAnimal, DbArmor, DbAttribute, DbCondition, DbGear, DbHeroicAbility, DbKin, DbMagicTrick, DbMonster, DbNpc, DbProfession, DbRollEntry, DbSkill, DbSpell, DbSummon, DbTable, DbWeapon } from "./db-types";

export const DB_ADVANCEMENT = {
 "markOn": "Roll a Dragon or a Demon with a skill and tick its advancement box.",
 "sessionQuestions": [
  "Did you take part in the game session?",
  "Did you explore a new location?",
  "Did you defeat one or more dangerous adversaries?",
  "Did you overcome an obstacle without using force?",
  "Did you give in to your weakness? (optional rule)"
 ],
 "overcomeWeakness": "Clearly acting against your weakness gives two marks instead, and the weakness is overcome — remove it, play a full session without one, then you may pick a new one.",
 "roll": "Roll a D20 for each marked skill; if the result is higher than the current level, the skill rises by 1 (max 18). Then erase all marks.",
 "teacher": "A shift of training with a teacher whose level is 15+ and above yours gives an immediate extra advancement roll; a teacher can raise a skill only one step before you must improve it yourself again.",
 "heroicAbility": "Gain a heroic ability of your choice whenever a skill reaches 18 (again each time it climbs back to 18), or as a rare GM reward for a grand deed (at most once per standard adventure). You must meet its requirement.",
 "newCharacter": "A replacement character gets an extra advancement roll per session played so far and as many heroic abilities as the other player characters.",
 "magic": {
  "spellFromTeacher": "A shift with a teacher; at the end of the session spend the school's advancement mark instead of an advancement roll, then roll INT with a boon — success learns the spell.",
  "spellFromGrimoire": "As with a teacher, but roll Languages instead of INT and without the boon.",
  "trick": "A stretch with a teacher or grimoire; no mark or roll needed.",
  "school": "Take the Magic Talent heroic ability, study a week with a teacher of the school, then roll INT — success gives your INT base chance as the school's level (retry after another week)."
 }
};

export const DB_ANIMALS: DbAnimal[] = [
 {
  "id": "cat",
  "name": "Cat",
  "movement": 12,
  "hp": 4,
  "attack": {
   "name": "Bite",
   "skill": 8,
   "damage": "D3"
  },
  "skills": {
   "Awareness": 12,
   "Evade": 14,
   "Sneaking": 16
  },
  "page": 99
 },
 {
  "id": "dog",
  "name": "Dog",
  "movement": 14,
  "hp": 8,
  "attack": {
   "name": "Bite",
   "skill": 12,
   "damage": "D8"
  },
  "skills": {
   "Awareness": 14,
   "Evade": 10,
   "Sneaking": 12
  },
  "page": 99
 },
 {
  "id": "goat",
  "name": "Goat",
  "movement": 10,
  "hp": 6,
  "attack": {
   "name": "Horns",
   "skill": 10,
   "damage": "D6"
  },
  "skills": {
   "Awareness": 10,
   "Evade": 12
  },
  "page": 99
 },
 {
  "id": "donkey",
  "name": "Donkey",
  "movement": 14,
  "hp": 12,
  "attack": {
   "name": "Kick",
   "skill": 10,
   "damage": "D10"
  },
  "skills": {
   "Awareness": 10,
   "Evade": 6
  },
  "page": 99
 },
 {
  "id": "horse",
  "name": "Horse",
  "movement": 20,
  "hp": 16,
  "attack": {
   "name": "Kick",
   "skill": 10,
   "damage": "2D4"
  },
  "skills": {
   "Awareness": 12,
   "Evade": 8
  },
  "page": 99
 },
 {
  "id": "wild-boar",
  "name": "Wild Boar",
  "movement": 12,
  "hp": 14,
  "attack": {
   "name": "Tusks",
   "skill": 12,
   "damage": "2D6"
  },
  "skills": {
   "Awareness": 10,
   "Evade": 8
  },
  "page": 99
 },
 {
  "id": "deer",
  "name": "Deer",
  "movement": 18,
  "hp": 12,
  "attack": {
   "name": "Horns",
   "skill": 10,
   "damage": "D8"
  },
  "skills": {
   "Awareness": 12,
   "Evade": 12
  },
  "page": 99
 },
 {
  "id": "moose",
  "name": "Moose",
  "movement": 16,
  "hp": 18,
  "attack": {
   "name": "Horns",
   "skill": 10,
   "damage": "2D6"
  },
  "skills": {
   "Awareness": 10,
   "Evade": 8
  },
  "page": 99
 },
 {
  "id": "fox",
  "name": "Fox",
  "movement": 10,
  "hp": 6,
  "attack": {
   "name": "Bite",
   "skill": 12,
   "damage": "D6"
  },
  "skills": {
   "Awareness": 12,
   "Evade": 10,
   "Sneaking": 14
  },
  "page": 99
 },
 {
  "id": "wolf",
  "name": "Wolf",
  "movement": 16,
  "hp": 10,
  "attack": {
   "name": "Bite",
   "skill": 14,
   "damage": "2D6"
  },
  "skills": {
   "Awareness": 14,
   "Evade": 12,
   "Sneaking": 14
  },
  "page": 99
 },
 {
  "id": "bear",
  "name": "Bear",
  "movement": 12,
  "hp": 20,
  "attack": {
   "name": "Bite",
   "skill": 12,
   "damage": "2D8"
  },
  "skills": {
   "Awareness": 10,
   "Evade": 8
  },
  "page": 99
 }
];

export const DB_APPEARANCES: DbRollEntry[] = [
 {
  "roll": 1,
  "text": "Ugly scar across your cheek"
 },
 {
  "roll": 2,
  "text": "Strange headgear"
 },
 {
  "roll": 3,
  "text": "Abnormally pale and pasty"
 },
 {
  "roll": 4,
  "text": "A constant smile on your lips"
 },
 {
  "roll": 5,
  "text": "Icy, penetrating gaze"
 },
 {
  "roll": 6,
  "text": "A bit of extra weight around the middle"
 },
 {
  "roll": 7,
  "text": "Thin and wiry"
 },
 {
  "roll": 8,
  "text": "Abnormal amounts of body hair (depending on kin)"
 },
 {
  "roll": 9,
  "text": "Balding (depending on kin)"
 },
 {
  "roll": 10,
  "text": "Prominent tattoo"
 },
 {
  "roll": 11,
  "text": "Foul body odor"
 },
 {
  "roll": 12,
  "text": "Glorious hairstyle"
 },
 {
  "roll": 13,
  "text": "Limp"
 },
 {
  "roll": 14,
  "text": "Filthy"
 },
 {
  "roll": 15,
  "text": "Honest blue eyes"
 },
 {
  "roll": 16,
  "text": "Silver tooth"
 },
 {
  "roll": 17,
  "text": "Heavily perfumed"
 },
 {
  "roll": 18,
  "text": "Different-colored eyes"
 },
 {
  "roll": 19,
  "text": "Hissing voice"
 },
 {
  "roll": 20,
  "text": "Weathered face"
 }
];

export const DB_ARMOR: DbArmor[] = [
 {
  "id": "leather",
  "name": "Leather",
  "rating": 1,
  "cost": {
   "amount": 2,
   "unit": "gold"
  },
  "supply": "Common",
  "banes": [],
  "metal": false,
  "bonusVs": {
   "bludgeoning": 2
  },
  "page": 73
 },
 {
  "id": "studded-leather",
  "name": "Studded Leather",
  "rating": 2,
  "cost": {
   "amount": 10,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "banes": [
   "Sneaking"
  ],
  "metal": true,
  "bonusVs": {
   "bludgeoning": 2
  },
  "page": 73
 },
 {
  "id": "chainmail",
  "name": "Chainmail",
  "rating": 4,
  "cost": {
   "amount": 50,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "banes": [
   "Evade",
   "Sneaking"
  ],
  "metal": true,
  "bonusVs": {
   "slashing": 2
  },
  "swimBane": true,
  "page": 73
 },
 {
  "id": "plate-armor",
  "name": "Plate Armor",
  "rating": 6,
  "cost": {
   "amount": 500,
   "unit": "gold"
  },
  "supply": "Rare",
  "banes": [
   "Acrobatics",
   "Evade",
   "Sneaking"
  ],
  "metal": true,
  "swimBane": true,
  "page": 73
 }
];

export const DB_ATTRIBUTES: DbAttribute[] = [
 {
  "id": "STR",
  "name": "Strength",
  "condition": "Exhausted",
  "text": "Raw muscle power."
 },
 {
  "id": "CON",
  "name": "Constitution",
  "condition": "Sickly",
  "text": "Physical fitness and staying power."
 },
 {
  "id": "AGL",
  "name": "Agility",
  "condition": "Dazed",
  "text": "Body control, speed and fine motor control."
 },
 {
  "id": "INT",
  "name": "Intelligence",
  "condition": "Angry",
  "text": "Sharpness of mind, reasoning and intellect."
 },
 {
  "id": "WIL",
  "name": "Willpower",
  "condition": "Scared",
  "text": "Self-discipline and focus."
 },
 {
  "id": "CHA",
  "name": "Charisma",
  "condition": "Disheartened",
  "text": "Force of personality and empathy."
 }
];

export const DB_CONDITIONS: DbCondition[] = [
 {
  "id": "exhausted",
  "name": "Exhausted",
  "attribute": "STR"
 },
 {
  "id": "sickly",
  "name": "Sickly",
  "attribute": "CON"
 },
 {
  "id": "dazed",
  "name": "Dazed",
  "attribute": "AGL"
 },
 {
  "id": "angry",
  "name": "Angry",
  "attribute": "INT"
 },
 {
  "id": "scared",
  "name": "Scared",
  "attribute": "WIL"
 },
 {
  "id": "disheartened",
  "name": "Disheartened",
  "attribute": "CHA"
 }
];

export const DB_GEAR: DbGear[] = [
 {
  "id": "boots",
  "category": "Clothes",
  "name": "Boots",
  "cost": {
   "amount": 2,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": 1,
  "effect": "Protects against some journey mishaps."
 },
 {
  "id": "cloak",
  "category": "Clothes",
  "name": "Cloak",
  "cost": {
   "amount": 8,
   "unit": "silver"
  },
  "supply": "Uncommon",
  "weight": 1,
  "effect": "Protects against some journey mishaps."
 },
 {
  "id": "fine-garments",
  "category": "Clothes",
  "name": "Fine Garments",
  "cost": {
   "amount": 10,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": 1,
  "effect": "Boon on CHA-based skills when the GM finds it fitting."
 },
 {
  "id": "fur",
  "category": "Clothes",
  "name": "Fur",
  "cost": {
   "amount": 1,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": 1,
  "effect": "Boon on Bushcraft rolls to resist cold."
 },
 {
  "id": "rags",
  "category": "Clothes",
  "name": "Rags",
  "cost": {
   "amount": 5,
   "unit": "copper"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Bane on CHA-based skills when the GM finds it fitting."
 },
 {
  "id": "simple-clothes",
  "category": "Clothes",
  "name": "Simple Clothes",
  "cost": {
   "amount": 5,
   "unit": "silver"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Needed to avoid a bane on CHA-based skills. Every character starts with a set (not recorded)."
 },
 {
  "id": "bagpipe",
  "category": "Musical Instruments",
  "name": "Bagpipe",
  "cost": {
   "amount": 30,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": 1,
  "effect": "Musician costs 1 WP and reaches 50 m.",
  "musician": {
   "wp": 1,
   "range": 50
  }
 },
 {
  "id": "drum",
  "category": "Musical Instruments",
  "name": "Drum",
  "cost": {
   "amount": 4,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Musician reaches 20 m.",
  "musician": {
   "range": 20
  }
 },
 {
  "id": "flute",
  "category": "Musical Instruments",
  "name": "Flute",
  "cost": {
   "amount": 2,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Musician costs 2 WP.",
  "musician": {
   "wp": 2
  }
 },
 {
  "id": "harp",
  "category": "Musical Instruments",
  "name": "Harp",
  "cost": {
   "amount": 8,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": 2,
  "effect": "Musician costs 1 WP.",
  "musician": {
   "wp": 1
  }
 },
 {
  "id": "horn",
  "category": "Musical Instruments",
  "name": "Horn",
  "cost": {
   "amount": 6,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Musician reaches 100 m.",
  "musician": {
   "range": 100
  }
 },
 {
  "id": "lyre",
  "category": "Musical Instruments",
  "name": "Lyre",
  "cost": {
   "amount": 20,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": 1,
  "effect": "Musician costs 1 WP.",
  "musician": {
   "wp": 1
  }
 },
 {
  "id": "abacus",
  "category": "Trade Goods",
  "name": "Abacus",
  "cost": {
   "amount": 2,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Boon on INT rolls for maths problems."
 },
 {
  "id": "blanket",
  "category": "Trade Goods",
  "name": "Blanket",
  "cost": {
   "amount": 5,
   "unit": "silver"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Needed to avoid a bane on rolls against cold."
 },
 {
  "id": "chess-set",
  "category": "Trade Goods",
  "name": "Chess Set",
  "cost": {
   "amount": 1,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Opposed INT roll decides the winner."
 },
 {
  "id": "dice",
  "category": "Trade Goods",
  "name": "Dice",
  "cost": {
   "amount": 1,
   "unit": "silver"
  },
  "supply": "Common",
  "weight": 0,
  "effect": "Chance decides the winner."
 },
 {
  "id": "field-kitchen",
  "category": "Trade Goods",
  "name": "Field Kitchen",
  "cost": {
   "amount": 4,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 2,
  "effect": "Boon on Bushcraft rolls for cooking."
 },
 {
  "id": "field-ration",
  "category": "Trade Goods",
  "name": "Field Ration",
  "cost": {
   "amount": 1,
   "unit": "silver"
  },
  "supply": "Common",
  "weight": 0.25,
  "effect": "Eat one a day or go hungry. Four rations count as one item.",
  "food": true
 },
 {
  "id": "grappling-hook",
  "category": "Trade Goods",
  "name": "Grappling Hook",
  "cost": {
   "amount": 3,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Secures a rope; thrown and caught with an Acrobatics roll up to STR metres (STR×2 with a bane)."
 },
 {
  "id": "lockpicks-advanced",
  "category": "Trade Goods",
  "name": "Lockpicks, Advanced",
  "cost": {
   "amount": 20,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 1,
  "effect": "Boon on Sleight of Hand to pick locks."
 },
 {
  "id": "lockpicks-simple",
  "category": "Trade Goods",
  "name": "Lockpicks, Simple",
  "cost": {
   "amount": 1,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": 1,
  "effect": "Needed to avoid a bane on Sleight of Hand to pick locks."
 },
 {
  "id": "magnifying-glass",
  "category": "Trade Goods",
  "name": "Magnifying Glass",
  "cost": {
   "amount": 30,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": 1,
  "effect": "Boon on Spot Hidden."
 },
 {
  "id": "map",
  "category": "Trade Goods",
  "name": "Map",
  "cost": {
   "amount": 5,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": 0,
  "effect": "Needed to avoid a bane on Bushcraft when leading the way on a journey."
 },
 {
  "id": "marbles",
  "category": "Trade Goods",
  "name": "Marbles",
  "cost": {
   "amount": 1,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Thrown at a humanoid within 10 m as an action; next turn it must pass Evade (not an action) to move.",
  "usable": "action"
 },
 {
  "id": "padlock",
  "category": "Trade Goods",
  "name": "Padlock",
  "cost": {
   "amount": 10,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 0,
  "effect": "Locks a door or chest; 20 HP, armor 5."
 },
 {
  "id": "perfume-10-doses",
  "category": "Trade Goods",
  "name": "Perfume (10 doses)",
  "cost": {
   "amount": 5,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Boon on CHA-based rolls when the GM finds it fitting.",
  "doses": 10
 },
 {
  "id": "playing-cards",
  "category": "Trade Goods",
  "name": "Playing Cards",
  "cost": {
   "amount": 5,
   "unit": "silver"
  },
  "supply": "Uncommon",
  "weight": 0,
  "effect": "Opposed Bluffing roll decides the winner."
 },
 {
  "id": "quiver-of-arrows-iron-head",
  "category": "Trade Goods",
  "name": "Quiver of Arrows, Iron Head",
  "cost": {
   "amount": 2,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Needed to shoot bows or crossbows.",
  "quiver": true,
  "metal": true
 },
 {
  "id": "quiver-of-arrows-wooden-head",
  "category": "Trade Goods",
  "name": "Quiver of Arrows, Wooden Head",
  "cost": {
   "amount": 5,
   "unit": "silver"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Needed to shoot bows or crossbows; armor counts double against these arrows.",
  "quiver": true
 },
 {
  "id": "rope-hemp",
  "category": "Trade Goods",
  "name": "Rope, Hemp",
  "cost": {
   "amount": 1,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "10 metres. Boon on Acrobatics for climbing when secured."
 },
 {
  "id": "rope-silk",
  "category": "Trade Goods",
  "name": "Rope, Silk",
  "cost": {
   "amount": 10,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": 0,
  "effect": "10 metres. Boon on Acrobatics for climbing when secured."
 },
 {
  "id": "saddle",
  "category": "Trade Goods",
  "name": "Saddle",
  "cost": {
   "amount": 10,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Needed to avoid a bane when fighting on horseback."
 },
 {
  "id": "sleeping-fur",
  "category": "Trade Goods",
  "name": "Sleeping Fur",
  "cost": {
   "amount": 1,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Needed to avoid a bane on Bushcraft when making camp. (Kits call it a sleeping pelt.)"
 },
 {
  "id": "spyglass",
  "category": "Trade Goods",
  "name": "Spyglass",
  "cost": {
   "amount": 50,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 1,
  "effect": "Boon on Bushcraft when leading the way on a journey."
 },
 {
  "id": "tent-small",
  "category": "Trade Goods",
  "name": "Tent, Small",
  "cost": {
   "amount": 2,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 2,
  "effect": "Sleeps two; boon on Bushcraft to make camp (one rolls, others may help)."
 },
 {
  "id": "tent-large",
  "category": "Trade Goods",
  "name": "Tent, Large",
  "cost": {
   "amount": 4,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 4,
  "effect": "Sleeps six; boon on Bushcraft to make camp (one rolls, others may help)."
 },
 {
  "id": "whistle",
  "category": "Trade Goods",
  "name": "Whistle",
  "cost": {
   "amount": 5,
   "unit": "silver"
  },
  "supply": "Common",
  "weight": 0,
  "effect": "Heard up to 100 m away."
 },
 {
  "id": "amulet",
  "category": "Studies & Magic",
  "name": "Amulet",
  "cost": {
   "amount": 3,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": 0,
  "effect": "A focus for spells.",
  "focus": true
 },
 {
  "id": "book",
  "category": "Studies & Magic",
  "name": "Book",
  "cost": {
   "amount": 25,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": 1,
  "effect": "Boon on skill rolls in its subject; price varies by subject."
 },
 {
  "id": "brooch",
  "category": "Studies & Magic",
  "name": "Brooch",
  "cost": {
   "amount": 5,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": 0,
  "effect": "A focus for spells.",
  "focus": true
 },
 {
  "id": "chalk",
  "category": "Studies & Magic",
  "name": "Chalk",
  "cost": {
   "amount": 1,
   "unit": "copper"
  },
  "supply": "Common",
  "weight": 0,
  "effect": "A focus for spells.",
  "focus": true
 },
 {
  "id": "grimoire",
  "category": "Studies & Magic",
  "name": "Grimoire",
  "cost": {
   "amount": 50,
   "unit": "gold"
  },
  "supply": "Unique",
  "weight": 1,
  "effect": "Holds a mage's spells; price varies with its contents and may be far higher.",
  "grimoire": true
 },
 {
  "id": "hourglass",
  "category": "Studies & Magic",
  "name": "Hourglass",
  "cost": {
   "amount": 25,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 1,
  "effect": "A focus for spells.",
  "focus": true
 },
 {
  "id": "notebook",
  "category": "Studies & Magic",
  "name": "Notebook",
  "cost": {
   "amount": 5,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Blank; can serve as a grimoire."
 },
 {
  "id": "orbuculum",
  "category": "Studies & Magic",
  "name": "Orbuculum",
  "cost": {
   "amount": 18,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": 1,
  "effect": "A focus for spells.",
  "focus": true
 },
 {
  "id": "paper-sheet",
  "category": "Studies & Magic",
  "name": "Paper (sheet)",
  "cost": {
   "amount": 2,
   "unit": "silver"
  },
  "supply": "Uncommon",
  "weight": 0,
  "effect": "Spells can be written on it."
 },
 {
  "id": "parchment-sheet",
  "category": "Studies & Magic",
  "name": "Parchment (sheet)",
  "cost": {
   "amount": 1,
   "unit": "silver"
  },
  "supply": "Common",
  "weight": 0,
  "effect": "Spells can be written on it."
 },
 {
  "id": "quill-and-ink",
  "category": "Studies & Magic",
  "name": "Quill & Ink",
  "cost": {
   "amount": 10,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": 1,
  "effect": "For writing down spells."
 },
 {
  "id": "reliquary",
  "category": "Studies & Magic",
  "name": "Reliquary",
  "cost": {
   "amount": 5,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": 1,
  "effect": "A focus for spells.",
  "focus": true
 },
 {
  "id": "wand",
  "category": "Studies & Magic",
  "name": "Wand",
  "cost": {
   "amount": 10,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": 1,
  "effect": "A focus for spells.",
  "focus": true
 },
 {
  "id": "flint-and-tinder",
  "category": "Light Sources",
  "name": "Flint & Tinder",
  "cost": {
   "amount": 5,
   "unit": "silver"
  },
  "supply": "Common",
  "weight": 0,
  "effect": "Needed to light torches, candles and lanterns and to make fire."
 },
 {
  "id": "lamp-oil",
  "category": "Light Sources",
  "name": "Lamp Oil",
  "cost": {
   "amount": 3,
   "unit": "silver"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Ten doses; each keeps a lamp or lantern burning for up to a shift.",
  "doses": 10
 },
 {
  "id": "lantern",
  "category": "Light Sources",
  "name": "Lantern",
  "cost": {
   "amount": 10,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Lights a 10 m radius for up to a shift; roll D8 after each stretch — on a 1 it goes out and must be refilled and relit (an action).",
  "light": {
   "radius": 10,
   "die": "D8"
  }
 },
 {
  "id": "oil-lamp",
  "category": "Light Sources",
  "name": "Oil Lamp",
  "cost": {
   "amount": 1,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Lights a 10 m radius for up to a shift; roll D6 after each stretch — on a 1 it goes out and must be refilled and relit (an action).",
  "light": {
   "radius": 10,
   "die": "D6"
  }
 },
 {
  "id": "tallow-candle",
  "category": "Light Sources",
  "name": "Tallow Candle",
  "cost": {
   "amount": 1,
   "unit": "copper"
  },
  "supply": "Common",
  "weight": 0,
  "effect": "Lights a 4 m radius for up to a shift; roll D4 after each stretch or when its bearer attacks or is attacked — a 1 puts it out.",
  "light": {
   "radius": 4,
   "die": "D4"
  }
 },
 {
  "id": "torch",
  "category": "Light Sources",
  "name": "Torch",
  "cost": {
   "amount": 5,
   "unit": "copper"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Lights a 10 m radius for up to a shift; roll D6 after each stretch or when used as a weapon — a 1 puts it out. Can be swung as a small wooden club dealing fire damage.",
  "light": {
   "radius": 10,
   "die": "D6"
  }
 },
 {
  "id": "crowbar",
  "category": "Tools",
  "name": "Crowbar",
  "cost": {
   "amount": 2,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "2D6 damage to a door or wall, hitting automatically without risk to itself."
 },
 {
  "id": "hammer",
  "category": "Tools",
  "name": "Hammer",
  "cost": {
   "amount": 1,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "2D4 damage to a door or wall, hitting automatically without risk to itself."
 },
 {
  "id": "needle-and-thread",
  "category": "Tools",
  "name": "Needle & Thread",
  "cost": {
   "amount": 3,
   "unit": "silver"
  },
  "supply": "Common",
  "weight": 0,
  "effect": "Mends clothes with a Crafting roll."
 },
 {
  "id": "pickaxe",
  "category": "Tools",
  "name": "Pickaxe",
  "cost": {
   "amount": 3,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "2D8 damage to a door or wall, hitting automatically without risk to itself."
 },
 {
  "id": "saw",
  "category": "Tools",
  "name": "Saw",
  "cost": {
   "amount": 5,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": 1,
  "effect": "Cuts metal or wood in a stretch."
 },
 {
  "id": "shovel",
  "category": "Tools",
  "name": "Shovel",
  "cost": {
   "amount": 2,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Halves digging time."
 },
 {
  "id": "sledgehammer",
  "category": "Tools",
  "name": "Sledgehammer",
  "cost": {
   "amount": 3,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 2,
  "effect": "2D10 damage to a door or wall, hitting automatically without risk to itself."
 },
 {
  "id": "blacksmithing-tools",
  "category": "Tools",
  "name": "Blacksmithing Tools",
  "cost": {
   "amount": 20,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": 1,
  "effect": "Used for Crafting (needed for Master Blacksmith)."
 },
 {
  "id": "carpentry-tools",
  "category": "Tools",
  "name": "Carpentry Tools",
  "cost": {
   "amount": 8,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": 1,
  "effect": "Used for Crafting (needed for Master Carpenter)."
 },
 {
  "id": "tanning-tools",
  "category": "Tools",
  "name": "Tanning Tools",
  "cost": {
   "amount": 5,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": 1,
  "effect": "Used for Crafting (needed for Master Tanner)."
 },
 {
  "id": "backpack",
  "category": "Containers",
  "name": "Backpack",
  "cost": {
   "amount": 3,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 0,
  "effect": "Carrying capacity +2; one per person.",
  "capacity": 2
 },
 {
  "id": "barrel",
  "category": "Containers",
  "name": "Barrel",
  "cost": {
   "amount": 2,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 2,
  "effect": "Holds 15 weight units; 10 HP, armor 3."
 },
 {
  "id": "basket",
  "category": "Containers",
  "name": "Basket",
  "cost": {
   "amount": 4,
   "unit": "silver"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Holds 10 weight units."
 },
 {
  "id": "bottle",
  "category": "Containers",
  "name": "Bottle",
  "cost": {
   "amount": 1,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Holds 1 unit of liquid."
 },
 {
  "id": "bucket",
  "category": "Containers",
  "name": "Bucket",
  "cost": {
   "amount": 5,
   "unit": "copper"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Holds up to 5 units of liquid."
 },
 {
  "id": "chest",
  "category": "Containers",
  "name": "Chest",
  "cost": {
   "amount": 5,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 3,
  "effect": "Holds 20 weight units; 25 HP, armor 5."
 },
 {
  "id": "clay-jug",
  "category": "Containers",
  "name": "Clay Jug",
  "cost": {
   "amount": 5,
   "unit": "silver"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Holds 1 unit of liquid."
 },
 {
  "id": "saddle-bag",
  "category": "Containers",
  "name": "Saddle Bag",
  "cost": {
   "amount": 6,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 0,
  "effect": "An animal's carrying capacity +2; at most two per animal."
 },
 {
  "id": "poison-lethal",
  "category": "Medicine",
  "name": "Poison, Lethal",
  "cost": {
   "amount": 2,
   "unit": "gold",
   "note": "× potency, per dose"
  },
  "supply": "Uncommon",
  "weight": 1,
  "effect": "Lethal poison (see Poison).",
  "poison": "lethal"
 },
 {
  "id": "poison-paralyzing",
  "category": "Medicine",
  "name": "Poison, Paralyzing",
  "cost": {
   "amount": 12,
   "unit": "silver",
   "note": "× potency, per dose"
  },
  "supply": "Uncommon",
  "weight": 1,
  "effect": "Paralyzing poison (see Poison).",
  "poison": "paralyzing"
 },
 {
  "id": "poison-sleeping",
  "category": "Medicine",
  "name": "Poison, Sleeping",
  "cost": {
   "amount": 6,
   "unit": "silver",
   "note": "× potency, per dose"
  },
  "supply": "Uncommon",
  "weight": 1,
  "effect": "Sleeping poison (see Poison).",
  "poison": "sleeping"
 },
 {
  "id": "herbal-concoction",
  "category": "Medicine",
  "name": "Herbal Concoction",
  "cost": {
   "amount": 1,
   "unit": "gold",
   "note": "per dose"
  },
  "supply": "Uncommon",
  "weight": 1,
  "effect": "Boon on Healing rolls to fight disease.",
  "consumable": true
 },
 {
  "id": "healing-potion",
  "category": "Medicine",
  "name": "Healing Potion",
  "cost": {
   "amount": 50,
   "unit": "gold",
   "note": "per dose"
  },
  "supply": "Rare",
  "weight": 1,
  "effect": "Instantly heals 2D6 HP. Stronger potions heal more and cost more.",
  "consumable": true,
  "heal": "2D6",
  "usable": "action"
 },
 {
  "id": "bandages-10",
  "category": "Medicine",
  "name": "Bandages (10)",
  "cost": {
   "amount": 5,
   "unit": "silver"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Needed to avoid a bane on Healing rolls to save a life; each attempt uses one.",
  "doses": 10
 },
 {
  "id": "surgical-instruments",
  "category": "Medicine",
  "name": "Surgical Instruments",
  "cost": {
   "amount": 15,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": 1,
  "effect": "Boon on Healing rolls to save a life."
 },
 {
  "id": "bath-at-an-inn",
  "category": "Services",
  "name": "Bath at an Inn",
  "cost": {
   "amount": 6,
   "unit": "copper"
  },
  "supply": "Common",
  "weight": null,
  "effect": "Heals a condition of your choice in a stretch; once per day."
 },
 {
  "id": "bodyguard",
  "category": "Services",
  "name": "Bodyguard",
  "cost": {
   "amount": 2,
   "unit": "gold",
   "per": "day"
  },
  "supply": "Uncommon",
  "weight": null,
  "effect": "Stats as a typical guard."
 },
 {
  "id": "bowl-of-stew",
  "category": "Services",
  "name": "Bowl of Stew",
  "cost": {
   "amount": 5,
   "unit": "copper"
  },
  "supply": "Common",
  "weight": null,
  "effect": "Covers a day's food."
 },
 {
  "id": "clothes-repair",
  "category": "Services",
  "name": "Clothes Repair",
  "cost": {
   "amount": 5,
   "unit": "silver"
  },
  "supply": "Common",
  "weight": null,
  "effect": "Undoes the effect of torn clothes."
 },
 {
  "id": "courier",
  "category": "Services",
  "name": "Courier",
  "cost": {
   "amount": 1,
   "unit": "silver",
   "per": "kilometer"
  },
  "supply": "Common",
  "weight": null,
  "effect": "Delivers a message."
 },
 {
  "id": "feast",
  "category": "Services",
  "name": "Feast",
  "cost": {
   "amount": 2,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": null,
  "effect": "Covers a day's food."
 },
 {
  "id": "goblet-of-wine",
  "category": "Services",
  "name": "Goblet of Wine",
  "cost": {
   "amount": 2,
   "unit": "silver"
  },
  "supply": "Uncommon",
  "weight": null,
  "effect": "After two goblets in a shift, each further goblet gives a condition of your choice."
 },
 {
  "id": "haircut",
  "category": "Services",
  "name": "Haircut",
  "cost": {
   "amount": 2,
   "unit": "silver"
  },
  "supply": "Common",
  "weight": null,
  "effect": "Heals a chosen condition in a stretch; once per week."
 },
 {
  "id": "healing",
  "category": "Services",
  "name": "Healing",
  "cost": {
   "amount": 5,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": null,
  "effect": "Healing rolls succeed automatically."
 },
 {
  "id": "lodging-at-inn-separate-room",
  "category": "Services",
  "name": "Lodging at Inn, Separate Room",
  "cost": {
   "amount": 5,
   "unit": "silver"
  },
  "supply": "Common",
  "weight": null,
  "effect": "A shift rest without a Bushcraft roll."
 },
 {
  "id": "lodging-at-inn-dormitory",
  "category": "Services",
  "name": "Lodging at Inn, Dormitory",
  "cost": {
   "amount": 1,
   "unit": "silver"
  },
  "supply": "Common",
  "weight": null,
  "effect": "A shift rest without a Bushcraft roll, but roll D4 each shift — on a 1 someone's snoring keeps the room awake."
 },
 {
  "id": "lodging-at-inn-luxury-suite",
  "category": "Services",
  "name": "Lodging at Inn, Luxury Suite",
  "cost": {
   "amount": 2,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": null,
  "effect": "A shift rest without a Bushcraft roll."
 },
 {
  "id": "meal-at-an-inn",
  "category": "Services",
  "name": "Meal at an Inn",
  "cost": {
   "amount": 3,
   "unit": "silver"
  },
  "supply": "Common",
  "weight": null,
  "effect": "Covers a day's food."
 },
 {
  "id": "road-toll",
  "category": "Services",
  "name": "Road Toll",
  "cost": {
   "amount": 2,
   "unit": "copper"
  },
  "supply": "Common",
  "weight": null,
  "effect": "Lets you pass."
 },
 {
  "id": "stagecoach",
  "category": "Services",
  "name": "Stagecoach",
  "cost": {
   "amount": 3,
   "unit": "copper",
   "per": "kilometer"
  },
  "supply": "Common",
  "weight": null,
  "effect": "Travel to a set destination."
 },
 {
  "id": "tankard-of-mead",
  "category": "Services",
  "name": "Tankard of Mead",
  "cost": {
   "amount": 4,
   "unit": "copper"
  },
  "supply": "Common",
  "weight": null,
  "effect": "After three tankards in a shift, each further tankard gives a condition of your choice."
 },
 {
  "id": "teacher",
  "category": "Services",
  "name": "Teacher",
  "cost": {
   "amount": 5,
   "unit": "gold",
   "per": "shift or more"
  },
  "supply": "Uncommon",
  "weight": null,
  "effect": "A shift of teaching grants an extra advancement roll."
 },
 {
  "id": "bear-trap",
  "category": "Hunting & Fishing",
  "name": "Bear Trap",
  "cost": {
   "amount": 3,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": 1,
  "effect": "Used for hunting."
 },
 {
  "id": "fishing-rod",
  "category": "Hunting & Fishing",
  "name": "Fishing Rod",
  "cost": {
   "amount": 8,
   "unit": "silver"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "D4 food rations when fishing."
 },
 {
  "id": "fishing-net",
  "category": "Hunting & Fishing",
  "name": "Fishing Net",
  "cost": {
   "amount": 2,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": 2,
  "effect": "D6 food rations when fishing."
 },
 {
  "id": "snare",
  "category": "Hunting & Fishing",
  "name": "Snare",
  "cost": {
   "amount": 5,
   "unit": "copper"
  },
  "supply": "Common",
  "weight": 1,
  "effect": "Used for hunting; one use only."
 },
 {
  "id": "canoe",
  "category": "Means of Travel",
  "name": "Canoe",
  "cost": {
   "amount": 6,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": null,
  "effect": "Carries two people and 10 weight units.",
  "carries": {
   "people": 2,
   "weight": 10
  }
 },
 {
  "id": "cart",
  "category": "Means of Travel",
  "name": "Cart",
  "cost": {
   "amount": 15,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": null,
  "effect": "Pulled by one horse or donkey; carries two people and 50 weight units.",
  "carries": {
   "people": 2,
   "weight": 50
  }
 },
 {
  "id": "rowing-boat",
  "category": "Means of Travel",
  "name": "Rowing Boat",
  "cost": {
   "amount": 15,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": null,
  "effect": "Carries four people and 50 weight units.",
  "carries": {
   "people": 4,
   "weight": 50
  }
 },
 {
  "id": "sailing-boat",
  "category": "Means of Travel",
  "name": "Sailing Boat",
  "cost": {
   "amount": 40,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": null,
  "effect": "Carries six people and 100 weight units.",
  "carries": {
   "people": 6,
   "weight": 100
  }
 },
 {
  "id": "wagon",
  "category": "Means of Travel",
  "name": "Wagon",
  "cost": {
   "amount": 30,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": null,
  "effect": "Pulled by two horses or donkeys; carries four people and 100 weight units.",
  "carries": {
   "people": 4,
   "weight": 100
  }
 },
 {
  "id": "chicken",
  "category": "Animals",
  "name": "Chicken",
  "cost": {
   "amount": 4,
   "unit": "silver"
  },
  "supply": "Common",
  "weight": null,
  "effect": "One ration of food when slaughtered (cook the meat)."
 },
 {
  "id": "combat-trained-horse",
  "category": "Animals",
  "name": "Combat Trained Horse",
  "cost": {
   "amount": 400,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": null,
  "effect": "Carries one rider and 10 weight units, or two riders. Needed to fight mounted.",
  "carries": {
   "riders": 1,
   "weight": 10
  },
  "mount": true,
  "combatTrained": true
 },
 {
  "id": "cow",
  "category": "Animals",
  "name": "Cow",
  "cost": {
   "amount": 10,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": null,
  "effect": "D4 rations of milk a day, 2D10 rations when slaughtered (cook the meat)."
 },
 {
  "id": "donkey",
  "category": "Animals",
  "name": "Donkey",
  "cost": {
   "amount": 12,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": null,
  "effect": "Carries 10 weight units; can't be ridden.",
  "carries": {
   "weight": 10
  }
 },
 {
  "id": "guard-dog",
  "category": "Animals",
  "name": "Guard Dog",
  "cost": {
   "amount": 15,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": null,
  "effect": "Protects its owner (dog stats)."
 },
 {
  "id": "homing-pigeon-in-cage",
  "category": "Animals",
  "name": "Homing Pigeon in Cage",
  "cost": {
   "amount": 2,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": null,
  "effect": "Flies home to its dovecote when released."
 },
 {
  "id": "pig",
  "category": "Animals",
  "name": "Pig",
  "cost": {
   "amount": 2,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": null,
  "effect": "2D6 rations when slaughtered (cook the meat)."
 },
 {
  "id": "riding-horse",
  "category": "Animals",
  "name": "Riding Horse",
  "cost": {
   "amount": 60,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": null,
  "effect": "Carries one rider and 10 weight units, or two riders.",
  "carries": {
   "riders": 1,
   "weight": 10
  },
  "mount": true
 },
 {
  "id": "sheep",
  "category": "Animals",
  "name": "Sheep",
  "cost": {
   "amount": 3,
   "unit": "gold"
  },
  "supply": "Common",
  "weight": null,
  "effect": "2D4 rations when slaughtered (cook the meat)."
 }
];

export const DB_GM_TABLES: Record<string, DbTable> = {
 "severeInjuries": {
  "id": "severeInjuries",
  "name": "Severe Injuries",
  "die": "D20",
  "page": 51,
  "note": "After surviving zero HP, roll CON; on a failure roll here. Healing time halves with a shift of daily medical care from someone who passes a Healing roll. Permanently lost skill levels can be re-learned.",
  "rows": [
   {
    "roll": [
     1,
     2
    ],
    "name": "Broken nose",
    "text": "Bane on all Awareness rolls.",
    "heal": "D6 days",
    "banes": [
     "Awareness"
    ]
   },
   {
    "roll": [
     3,
     4
    ],
    "name": "Scarred face",
    "text": "Bane on all Performance and Persuasion rolls.",
    "heal": "2D6 days",
    "banes": [
     "Performance",
     "Persuasion"
    ]
   },
   {
    "roll": [
     5,
     6
    ],
    "name": "Teeth knocked out",
    "text": "Performance and Persuasion permanently −2 (to a minimum of 3).",
    "permanent": {
     "Performance": -2,
     "Persuasion": -2
    }
   },
   {
    "roll": [
     7,
     8
    ],
    "name": "Broken ribs",
    "text": "Bane on all skills based on STR or AGL.",
    "heal": "D6 days",
    "banesAttr": [
     "STR",
     "AGL"
    ]
   },
   {
    "roll": [
     9,
     10
    ],
    "name": "Concussion",
    "text": "Bane on all skills based on INT.",
    "heal": "D6 days",
    "banesAttr": [
     "INT"
    ]
   },
   {
    "roll": [
     11,
     12
    ],
    "name": "Deep wounds",
    "text": "Bane on all STR- and AGL-based skills, and every such roll deals you D6 damage.",
    "heal": "2D6 days",
    "banesAttr": [
     "STR",
     "AGL"
    ]
   },
   {
    "roll": 13,
    "name": "Broken leg",
    "text": "Movement halved.",
    "heal": "3D6 days"
   },
   {
    "roll": 14,
    "name": "Broken arm",
    "text": "No two-handed weapons or dual wielding, and a bane on other actions that need both arms, like climbing.",
    "heal": "3D6 days"
   },
   {
    "roll": 15,
    "name": "Severed toe",
    "text": "Movement permanently −2 (to a minimum of 4).",
    "permanent": {
     "movement": -2
    }
   },
   {
    "roll": 16,
    "name": "Severed finger",
    "text": "All weapon skills permanently −1 (to a minimum of 3).",
    "permanent": {
     "weaponSkills": -1
    }
   },
   {
    "roll": 17,
    "name": "Gouged eye",
    "text": "Spot Hidden permanently −2 (to a minimum of 3).",
    "permanent": {
     "Spot Hidden": -2
    }
   },
   {
    "roll": 18,
    "name": "Nightmares",
    "text": "Roll to resist fear each shift you sleep; on a failure the shift doesn't count as sleep.",
    "heal": "2D6 days"
   },
   {
    "roll": 19,
    "name": "Changed personality",
    "text": "Randomly generate a new weakness."
   },
   {
    "roll": 20,
    "name": "Amnesia",
    "text": "You can't remember who you or the other player characters are — roleplay it.",
    "heal": "D6 days"
   }
  ]
 },
 "fear": {
  "id": "fear",
  "name": "Fear",
  "die": "D8",
  "page": 53,
  "note": "A failed WIL roll against a fear attack (pushable, not an action).",
  "rows": [
   {
    "roll": 1,
    "name": "Enfeebled",
    "text": "Lose 2D6 WP (to zero at least) and become Disheartened.",
    "conditions": [
     "Disheartened"
    ],
    "wpLoss": "2D6"
   },
   {
    "roll": 2,
    "name": "Shaken",
    "text": "You become Scared.",
    "conditions": [
     "Scared"
    ]
   },
   {
    "roll": 3,
    "name": "Panting",
    "text": "Out of breath with terror: you become Exhausted.",
    "conditions": [
     "Exhausted"
    ]
   },
   {
    "roll": 4,
    "name": "Pale",
    "text": "You turn white as a sheet — you and every player character within 10 m who can see you become Scared.",
    "conditions": [
     "Scared"
    ]
   },
   {
    "roll": 5,
    "name": "Scream",
    "text": "Your scream gives every player character who hears it a fear attack too (each rolls only once per fear attack)."
   },
   {
    "roll": 6,
    "name": "Rage",
    "text": "Fear turns to fury: become Angry and attack the source on your next turn, in melee if you can.",
    "conditions": [
     "Angry"
    ]
   },
   {
    "roll": 7,
    "name": "Paralyzed",
    "text": "Frozen with terror: no action or movement next turn; roll WIL each following turn (not an action) to break free."
   },
   {
    "roll": 8,
    "name": "Wild Panic",
    "text": "You flee: dash away from the source on your next turn, and roll WIL each following turn (not an action) to stop."
   }
  ]
 },
 "magicalMishaps": {
  "id": "magicalMishaps",
  "name": "Magical Mishaps",
  "die": "D20",
  "page": 60,
  "note": "Optional rule: rolled when you roll a Demon casting a spell.",
  "rows": [
   {
    "roll": 1,
    "text": "The magic leaves you Dazed.",
    "conditions": [
     "Dazed"
    ]
   },
   {
    "roll": 2,
    "text": "The casting leaves you Exhausted.",
    "conditions": [
     "Exhausted"
    ]
   },
   {
    "roll": 3,
    "text": "The energies make you Sickly.",
    "conditions": [
     "Sickly"
    ]
   },
   {
    "roll": 4,
    "text": "You lose control and become very Angry.",
    "conditions": [
     "Angry"
    ]
   },
   {
    "roll": 5,
    "text": "Demonic visions leave you Scared.",
    "conditions": [
     "Scared"
    ]
   },
   {
    "roll": 6,
    "text": "A glimpse beyond the veil leaves you Disheartened.",
    "conditions": [
     "Disheartened"
    ]
   },
   {
    "roll": 7,
    "text": "The magic tears at your body: D6 damage per power level."
   },
   {
    "roll": 8,
    "text": "Your willpower drains away: lose D6 WP per power level."
   },
   {
    "roll": 9,
    "text": "A magical disease (virulence 3D6) — you and everyone you touch in the next shift are exposed."
   },
   {
    "roll": 10,
    "text": "A different random spell of yours fires instead, at the same target and power level."
   },
   {
    "roll": 11,
    "text": "You vomit a frog whenever you lie. Roll D4 each morning; a 1 ends it. Dispel lifts it."
   },
   {
    "roll": 12,
    "text": "Gold or silver you touch crumbles to dust. Roll D4 each morning; a 1 ends it. Dispel lifts it."
   },
   {
    "roll": 13,
    "text": "You are blinded, as in total darkness. Roll D4 each morning; a 1 ends it. Dispel lifts it."
   },
   {
    "roll": 14,
    "text": "Amnesia — you forget who you and your companions are (roleplay it). Roll D4 each morning; a 1 ends it."
   },
   {
    "roll": 15,
    "text": "The spell also hits a friend or another unintended target; a healing or helping spell affects an enemy."
   },
   {
    "roll": 16,
    "text": "Backfire: an offensive spell hits you instead; a protective or healing spell deals damage instead."
   },
   {
    "roll": 17,
    "text": "You turn into an animal (D6: cat, fox, goat, wolf, deer, bear) — animal stats, no speech, your mind intact. Roll D4 each morning; a 1 changes you back."
   },
   {
    "roll": 18,
    "text": "You become one age category younger (attributes change, skills don't); a young mage becomes a child (−2 STR and CON, minimum 3). Permanent."
   },
   {
    "roll": 19,
    "text": "You become one age category older (attributes change, skills don't); an old mage becomes frail (−2 STR and CON). Permanent."
   },
   {
    "roll": 20,
    "text": "Your magic draws a demon from another dimension; it turns up within the shift to attack or cause trouble."
   }
  ]
 },
 "demonMelee": {
  "id": "demonMelee",
  "name": "Demon Roll in Melee",
  "die": "D6",
  "page": 46,
  "note": "Rolling a Demon on a melee attack: you miss, can't push, and may suffer a mishap.",
  "rows": [
   {
    "roll": 1,
    "text": "You drop your weapon at your feet; picking it up is an action."
   },
   {
    "roll": 2,
    "text": "You leave yourself open: the enemy gets a free attack that can't be dodged or parried."
   },
   {
    "roll": 3,
    "text": "Your weapon sticks fast in something; pulling it free takes a STR roll (an action)."
   },
   {
    "roll": 4,
    "text": "Your weapon flies D3+3 m away; you must move and then use an action to pick it up."
   },
   {
    "roll": 5,
    "text": "You slam your weapon into something hard and damage it — bane on every use until an artisan repairs it."
   },
   {
    "roll": 6,
    "text": "You hit yourself — roll damage normally, without your damage bonus."
   }
  ]
 },
 "demonRanged": {
  "id": "demonRanged",
  "name": "Demon Roll in Ranged Combat",
  "die": "D6",
  "page": 49,
  "note": "Rolling a Demon on a ranged attack: you miss, can't push, and may suffer a mishap.",
  "rows": [
   {
    "roll": 1,
    "text": "You drop your weapon at your feet; picking it up is an action."
   },
   {
    "roll": 2,
    "text": "You're out of arrows and must restock before shooting again (re-roll for slings and thrown weapons)."
   },
   {
    "roll": 3,
    "text": "You hit something valuable or important nearby — the GM decides what."
   },
   {
    "roll": 4,
    "text": "Your weapon breaks — bane on every use until an artisan repairs it."
   },
   {
    "roll": 5,
    "text": "You hit a random player character or friendly NPC — roll damage normally, with your damage bonus."
   },
   {
    "roll": 6,
    "text": "You hit yourself — roll damage normally, without your damage bonus."
   }
  ]
 },
 "journeyMishaps": {
  "id": "journeyMishaps",
  "name": "Journey Mishaps",
  "die": "D12",
  "page": 102,
  "note": "When the pathfinder fails the Bushcraft roll for the shift.",
  "rows": [
   {
    "roll": 1,
    "name": "Fog",
    "text": "Thick fog halves the distance covered this shift."
   },
   {
    "roll": 2,
    "name": "Blocking Terrain",
    "text": "Rocks, fallen trees, thickets or floods block the way: everyone rolls Acrobatics to keep going (those who succeed can help); failures make no progress this shift."
   },
   {
    "roll": 3,
    "name": "Torn Clothes",
    "text": "Thorns, rocks or bog wreck a random character's clothes — they now count as rags."
   },
   {
    "roll": 4,
    "name": "Lost",
    "text": "Walking in circles: no progress this shift, and the pathfinder must roll Bushcraft (no help) to find the way again."
   },
   {
    "roll": 5,
    "name": "Dropped Item",
    "text": "A random character drops or breaks an item of the GM's choice."
   },
   {
    "roll": 6,
    "name": "Mosquito Swarm",
    "text": "Biting insects drive everyone mad: everyone without a cloak becomes Angry."
   },
   {
    "roll": 7,
    "name": "Sprained Ankle",
    "text": "A random character missteps and takes D6 damage; armor doesn't help, boots reduce it by 2."
   },
   {
    "roll": 8,
    "name": "Downpour",
    "text": "Rain or a blizzard: everyone without a cloak rolls to withstand cold, and the group must shelter — no progress this shift."
   },
   {
    "roll": 9,
    "name": "Wasps",
    "text": "The pathfinder treads on a nest: everyone rolls Evade; failures take D6 damage and a condition of their choice."
   },
   {
    "roll": 10,
    "name": "Landslide",
    "text": "The ground gives way: everyone rolls Evade or takes D10 damage."
   },
   {
    "roll": 11,
    "name": "Savage Animal",
    "text": "A frightened wolf, bear or other wild animal attacks (see common animals)."
   },
   {
    "roll": 12,
    "name": "Quicksand",
    "text": "Each character rolls Bushcraft; failures take a condition and must roll again. Someone who already has every condition and fails is lost for good. Those who are free can help."
   }
  ]
 },
 "hunting": {
  "id": "hunting",
  "name": "Hunting",
  "die": "D6",
  "page": 103,
  "note": "After a successful Hunting & Fishing roll to track game; killing it needs a second roll (weapon, or Hunting & Fishing with a trap).",
  "rows": [
   {
    "roll": 1,
    "name": "Squirrel",
    "text": "Weapon or trap",
    "rations": "1"
   },
   {
    "roll": 2,
    "name": "Crow",
    "text": "Weapon",
    "rations": "1"
   },
   {
    "roll": 3,
    "name": "Rabbit",
    "text": "Weapon or trap",
    "rations": "D3"
   },
   {
    "roll": 4,
    "name": "Fox",
    "text": "Weapon or trap",
    "rations": "D4"
   },
   {
    "roll": 5,
    "name": "Boar",
    "text": "Weapon — attacks if the hunting roll fails",
    "rations": "2D6"
   },
   {
    "roll": 6,
    "name": "Deer",
    "text": "Weapon",
    "rations": "2D8"
   }
  ]
 },
 "leavingSite": {
  "id": "leavingSite",
  "name": "Leaving the Adventure Site",
  "die": "D6",
  "page": 107,
  "note": "If the player characters leave an adventure site for at least a shift.",
  "rows": [
   {
    "roll": 1,
    "text": "Enemies at the site follow and attack at a good moment."
   },
   {
    "roll": 2,
    "text": "Enemies get reinforcements — fallen enemies are replaced twice over."
   },
   {
    "roll": 3,
    "text": "Someone else arrives and clears out the treasure before the player characters return."
   },
   {
    "roll": [
     4,
     6
    ],
    "text": "Nothing happens."
   }
  ]
 },
 "traps": {
  "id": "traps",
  "name": "Typical Traps",
  "die": null,
  "page": 108,
  "rows": [
   {
    "name": "Spike Trap",
    "text": "Snaps shut on whoever opens the chest or door: 2D6 piercing damage.",
    "damage": "2D6"
   },
   {
    "name": "Trapdoor",
    "text": "A hatch drops open under a character: Evade with a bane or take 3D6 falling damage.",
    "damage": "3D6"
   },
   {
    "name": "Poison Dart Trap",
    "text": "Poisoned darts hit everyone nearby who fails an Awareness roll; the GM sets the poison type and potency."
   }
  ]
 },
 "npc": {
  "id": "npc",
  "name": "Creating NPCs",
  "page": 106,
  "note": "Roll one die of each type.",
  "columns": [
   {
    "die": "D4",
    "name": "Attitude",
    "values": [
     "Hostile",
     "Evasive",
     "Indifferent",
     "Friendly"
    ]
   },
   {
    "die": "D6",
    "name": "Kin",
    "values": [
     "Human",
     "Dwarf",
     "Elf",
     "Halfling",
     "Wolfkin",
     "Mallard"
    ]
   },
   {
    "die": "D8",
    "name": "Motivation",
    "values": [
     "Sweet, glittering gold",
     "Knowledge of the world",
     "Deep and eternal love",
     "A lifelong oath",
     "An injustice that demands retribution",
     "A life of joy and song",
     "Blood ties that can never be severed",
     "Escaping a dark past"
    ]
   },
   {
    "die": "D10",
    "name": "Profession",
    "values": [
     "Bard",
     "Artisan",
     "Hunter",
     "Fighter",
     "Scholar",
     "Mage",
     "Merchant",
     "Knight",
     "Mariner",
     "Thief"
    ]
   },
   {
    "die": "D12",
    "name": "Trait",
    "values": [
     "Talks too much",
     "Strange clothes",
     "Wild-eyed",
     "Smells bad",
     "Joker",
     "Cultist",
     "A bit childish",
     "Quiet and difficult",
     "Demon worshiper",
     "Obstinate",
     "Very touchy",
     "Highly romantic"
    ]
   },
   {
    "die": "D20",
    "name": "Name (choose one)",
    "values": [
     "Agnar, Jorid, Dareios",
     "Ragnfast, Ask, Euanthe",
     "Arnulf, Tyra, Xanthos",
     "Atle, Liv, Athalia",
     "Guthorm, Embla, Kleitos",
     "Botvid, Ragna, Astara",
     "Kale, Turid, Priamus",
     "Egil, Jorunn, Galyna",
     "Ingemund, Borghild, Taras",
     "Gudmund, Gylla, Zenais",
     "Grim, Tora, Hesiod",
     "Brand, Edda, Liene",
     "Folkvid, Sigrun, Eupraxia",
     "Germund, Dagrun, Taras",
     "Algot, Bolla, Lysandra",
     "Tolir, Yrsa, Kallias",
     "Hjorvald, Estrid, Isidora",
     "Ambjorn, Signe, Athos",
     "Grunn, Tilde, Larysa",
     "Olgrid, Idun, Nikias"
    ]
   }
  ]
 },
 "quest": {
  "id": "quest",
  "name": "The Quest",
  "page": 109,
  "columns": [
   {
    "die": "D4",
    "name": "One day,",
    "values": [
     "in the gloom of a tavern",
     "at the first light of dawn",
     "around the warmth of the campfire",
     "in the bustle of the marketplace"
    ]
   },
   {
    "die": "D6",
    "name": "the characters come across",
    "values": [
     "a messenger",
     "a letter",
     "a rumor",
     "gossip",
     "an encounter",
     "an omen"
    ]
   },
   {
    "die": "D8",
    "name": "from/about/with",
    "values": [
     "Karvago, a mysterious mage",
     "Bode, a one-eyed fighter",
     "Smolla, a sad halfling bard",
     "Malkar, a curious wolfkin mariner",
     "Rudbul, a greedy but humorous mallard merchant",
     "Davanor, a secretive elven hunter",
     "Veruna, an obsessive female dwarf scholar",
     "Roena of the Vale, a haughty knight"
    ]
   },
   {
    "die": "D10",
    "name": "who wants to",
    "values": [
     "examine",
     "seek revenge for",
     "hide",
     "destroy",
     "return",
     "claim",
     "replace",
     "protect",
     "steal",
     "find"
    ]
   },
   {
    "die": "D12",
    "name": "a",
    "values": [
     "magical artifact",
     "family heirloom",
     "sword",
     "treasure",
     "piece of jewelry",
     "ring",
     "stone",
     "case",
     "helmet",
     "book",
     "grimoire",
     "pet"
    ]
   },
   {
    "die": "D20",
    "name": "called",
    "values": [
     "the Blue Zurak",
     "the Eye of Kalmander",
     "Sylrod's Treachery",
     "the Heart of Ardana",
     "Gildengrip",
     "Nighteye",
     "Brother Gray",
     "Sira's Enigma",
     "The Crown of Hjalti",
     "The Deceiver",
     "Gringul's Secret",
     "Windtamer",
     "The Whetstone of Helox",
     "Stoltzenkranz",
     "Wintermoon",
     "Hallowbane",
     "Jommelkud",
     "The Silver Star",
     "Malkor's Wrath",
     "Ironside"
    ]
   }
  ]
 },
 "journey": {
  "id": "journey",
  "name": "The Journey",
  "page": 110,
  "columns": [
   {
    "die": "D4",
    "name": "The journey is",
    "values": [
     "easy with plenty of time for song and camaraderie",
     "eventful with unexpected encounters and challenges",
     "arduous with unpredictable weather and inaccessible roads",
     "hard and miserable"
    ]
   },
   {
    "die": "D6",
    "name": "and ends",
    "values": [
     "in the shadow of a mountain",
     "in the darkness of the forest",
     "in a soggy bog",
     "at a black lake",
     "at the foot of a hill",
     "on the bank of a river"
    ]
   },
   {
    "die": "D8",
    "name": "There is a/an",
    "values": [
     "ancient",
     "abandoned",
     "forgotten",
     "overgrown",
     "dilapidated",
     "hidden",
     "strangely shaped",
     "destroyed"
    ]
   },
   {
    "die": "D10",
    "name": "",
    "values": [
     "tower ruin",
     "catacomb",
     "tomb",
     "village",
     "cave",
     "castle ruin",
     "farm",
     "hill",
     "pond",
     "chasm"
    ]
   },
   {
    "die": "D12",
    "name": "surrounded by",
    "values": [
     "a swamp",
     "thick fog",
     "dark gnarled trees",
     "heavy rain clouds",
     "icy gales",
     "a lingering stench",
     "the remains of dead animals",
     "a scorched wasteland",
     "standing stones",
     "strange symbols",
     "a field of ruins",
     "swaying reeds"
    ]
   },
   {
    "die": "D20",
    "name": "The place is called",
    "values": [
     "Bark's Blood",
     "Barrenstone",
     "Nightpit",
     "Melka's Gift",
     "Gurge's Den",
     "Stonehand's Watch",
     "Vidergard",
     "Frost's Sphere",
     "Oakenhand",
     "Herod's Water",
     "Kil's Shore",
     "Feris' Demise",
     "the Bridge of Saar",
     "Birchholm",
     "Witherland",
     "Beaver's Howl",
     "Coppergate",
     "Barra's Grove",
     "Ashencleft",
     "Stormhaven"
    ]
   }
  ]
 },
 "site": {
  "id": "site",
  "name": "The Adventure Site",
  "page": 111,
  "columns": [
   {
    "die": "D4",
    "name": "The way in is",
    "values": [
     "easy – no one locked the door",
     "hidden and hard to find",
     "challenging – something is lurking here",
     "dangerous – a trap has been set"
    ]
   },
   {
    "die": "D6",
    "name": "There is",
    "values": [
     "a flooded chamber",
     "a blockage of rubble",
     "a winding stairway leading down into the darkness",
     "a somber tomb",
     "a remarkable statue",
     "a strange mural"
    ]
   },
   {
    "die": "D8",
    "name": "but also unexpected guests in the form of",
    "values": [
     "2D8 goblins and",
     "D6 adventurers and",
     "D6 wolfkin and",
     "D8 bandits and",
     "2D6 orcs and",
     "D8 cultists and",
     "D6 dwarves and",
     "D4 elves and"
    ]
   },
   {
    "die": "D10",
    "name": "",
    "values": [
     "a ravenous giant spider",
     "a curious manticore",
     "an ill-tempered giant",
     "D6 jeering harpies",
     "2D6 patrolling skeletons",
     "an enigmatic demon",
     "a flock of vampire bats",
     "a restless ghost",
     "an angry troll",
     "a large minotaur"
    ]
   },
   {
    "die": "D12",
    "name": "There is a deadly challenge in the form of",
    "values": [
     "a trapdoor",
     "a strong poison",
     "a cave-in",
     "a dart trap",
     "a tricky riddle",
     "a curse that must be lifted",
     "a jar of toxic gas",
     "rising water",
     "a giant boulder",
     "crushing walls",
     "a raging fire",
     "a magic mirror"
    ]
   },
   {
    "die": "D20",
    "name": "Finally, the player characters must defeat",
    "values": [
     "Kazan Murg – a mad wizard",
     "The Devastator – a powerful minotaur",
     "Princess Nadilara – a terrible wraith",
     "Zurgush the Red – a tall orc chieftain",
     "Nightclaw – an evil elf warrior",
     "Frosch – an undead mallard knight",
     "Vinjia – an ancient ghost",
     "Burgos Bloodtooth – a deranged thief king",
     "Lanja Blackgrip – a cunning goblin chief",
     "Greenleg – a foul-smelling troll",
     "Laval Bluestaff – a mysterious sorcerer",
     "Crag Broadbeard – an aggressive dwarf warrior",
     "Belsor Bonebreaker – a wicked knight",
     "Orgog the Defiler – a touchy giant",
     "Lord Aleyn – a brutal noble",
     "Hugo of the Vale – a renegade knight",
     "Bloodwing – a murderous griffin",
     "The Spike Beast – a bloodthirsty manticore",
     "Haxenflaugrsten – a corrupting demon",
     "Orlaugr the Red – a greedy dragon"
    ]
   }
  ]
 }
};

export const DB_HELMETS: DbArmor[] = [
 {
  "id": "open-helmet",
  "name": "Open Helmet",
  "rating": 1,
  "cost": {
   "amount": 12,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "banes": [
   "Awareness"
  ],
  "metal": true,
  "page": 73
 },
 {
  "id": "great-helm",
  "name": "Great Helm",
  "rating": 2,
  "cost": {
   "amount": 100,
   "unit": "gold"
  },
  "supply": "Rare",
  "banes": [
   "Awareness",
   "Ranged attacks"
  ],
  "metal": true,
  "page": 73
 }
];

export const DB_HEROIC_ABILITIES: DbHeroicAbility[] = [
 {
  "id": "assassin",
  "name": "Assassin",
  "requirement": {
   "skills": [
    "Knives"
   ],
   "level": 12
  },
  "wp": 3,
  "timing": "free",
  "page": 35,
  "tags": [
   "damage"
  ],
  "damage": "D8",
  "text": "Your sneak attack deals an extra D8 damage. Activate after the attack roll hits, before rolling damage. Can be combined with Backstabbing."
 },
 {
  "id": "backstabbing",
  "name": "Backstabbing",
  "requirement": {
   "skills": [
    "Knives"
   ],
   "level": 12
  },
  "wp": 3,
  "timing": "free",
  "page": 35,
  "tags": [
   "attack"
  ],
  "text": "When making a melee attack against an enemy who is also within 2 m of another player character, the attack counts as a sneak attack: it can't be dodged or parried, you get a boon, and the weapon rolls one extra damage die. Only with a subtle weapon. Not an action."
 },
 {
  "id": "battle-cry",
  "name": "Battle Cry",
  "requirement": null,
  "wp": 3,
  "timing": "action",
  "page": 36,
  "tags": [
   "support"
  ],
  "text": "As your action in combat, let out a cry that lets every other player character within earshot heal a condition of their choice. Only usable in combat."
 },
 {
  "id": "berserker",
  "name": "Berserker",
  "requirement": {
   "any": "melee",
   "level": 12
  },
  "wp": 3,
  "timing": "action",
  "page": 36,
  "tags": [
   "attack"
  ],
  "text": "Become Angry (or take another condition if already Angry) and immediately attack the nearest foe in melee. You must fight on until every enemy in sight is defeated or you hit zero HP. You get a boon on melee attacks but can neither parry nor dodge, and you are Exhausted afterwards."
 },
 {
  "id": "catlike",
  "name": "Catlike",
  "requirement": {
   "skills": [
    "Acrobatics"
   ],
   "level": 12
  },
  "wp": "varies",
  "timing": "free",
  "page": 36,
  "tags": [
   "defense"
  ],
  "text": "Each WP spent removes one D6 from the damage of a fall. You may roll Acrobatics first and then decide."
 },
 {
  "id": "companion",
  "name": "Companion",
  "requirement": {
   "skills": [
    "Hunting & Fishing"
   ],
   "level": 12
  },
  "wp": 3,
  "timing": "downtime",
  "page": 36,
  "tags": [
   "utility"
  ],
  "text": "Spend a stretch to bond with a nearby animal (not a monster); you can have one companion at a time. It follows you while you stay in its natural surroundings and scouts for free; 3 more WP orders it to attack (a free action for you)."
 },
 {
  "id": "contortionist",
  "name": "Contortionist",
  "requirement": {
   "skills": [
    "Evade"
   ],
   "level": 12
  },
  "wp": 1,
  "timing": "free",
  "page": 36,
  "tags": [
   "utility"
  ],
  "text": "Slip free of bonds or squeeze through a narrow gap without rolling."
 },
 {
  "id": "defensive",
  "name": "Defensive",
  "requirement": {
   "any": "melee",
   "level": 12
  },
  "wp": 3,
  "timing": "reaction",
  "page": 36,
  "tags": [
   "defense"
  ],
  "text": "Parry an attack without using up your action for the round — at any point in the round, as many times as you have WP for. You can't parry the same attack twice or both dodge and parry it."
 },
 {
  "id": "deflect-arrow",
  "name": "Deflect Arrow",
  "requirement": {
   "any": "melee",
   "level": 12
  },
  "wp": 1,
  "timing": "reaction",
  "page": 36,
  "tags": [
   "defense"
  ],
  "text": "Parry a ranged attack with a melee weapon instead of a shield."
 },
 {
  "id": "disguise",
  "name": "Disguise",
  "requirement": {
   "skills": [
    "Bluffing"
   ],
   "level": 12
  },
  "wp": 2,
  "timing": "downtime",
  "page": 36,
  "tags": [
   "social"
  ],
  "text": "After a stretch of work you can take on the looks, voice and manner of another person of your kin. Anyone who knows that person and sees you within 10 m may roll Awareness to see through it."
 },
 {
  "id": "double-slash",
  "name": "Double Slash",
  "requirement": {
   "skills": [
    "Axes",
    "Swords"
   ],
   "level": 12
  },
  "wp": 3,
  "timing": "free",
  "page": 37,
  "tags": [
   "attack"
  ],
  "text": "With a slashing weapon, strike two enemies within 2 m with one attack roll. Each may parry or dodge separately and damage is rolled separately. Combines with Dual Wield."
 },
 {
  "id": "dragonslayer",
  "name": "Dragonslayer",
  "requirement": {
   "any": "weapon",
   "level": 12
  },
  "wp": 3,
  "timing": "free",
  "page": 37,
  "tags": [
   "damage"
  ],
  "damage": "D8",
  "text": "An attack against a monster (not an ordinary NPC) deals an extra D8 damage. Activate after the hit, before rolling damage."
 },
 {
  "id": "dual-wield",
  "name": "Dual Wield",
  "requirement": {
   "any": "melee",
   "level": 12
  },
  "wp": 3,
  "timing": "free",
  "page": 37,
  "tags": [
   "attack"
  ],
  "text": "With a one-handed weapon in each hand, make an extra attack with the off-hand weapon on your turn, at a bane. The off-hand weapon's STR requirement rises by 3. Resolve the first attack (including damage) before the second. Combines with Double Slash."
 },
 {
  "id": "eagle-eye",
  "name": "Eagle Eye",
  "requirement": {
   "skills": [
    "Awareness"
   ],
   "level": 12
  },
  "wp": 2,
  "timing": "free",
  "page": 37,
  "tags": [
   "utility"
  ],
  "text": "See a person or object up to 200 m away in fine detail for a stretch. In combat you may also shoot past your weapon's effective range without a bane — activate again for each new target."
 },
 {
  "id": "fast-footwork",
  "name": "Fast Footwork",
  "requirement": {
   "skills": [
    "Evade"
   ],
   "level": 12
  },
  "wp": 3,
  "timing": "reaction",
  "page": 37,
  "tags": [
   "defense"
  ],
  "text": "Dodge an attack without using up your action for the round — at any point, as many times as you have WP for. Not the same attack twice, and not both dodge and parry."
 },
 {
  "id": "fast-healer",
  "name": "Fast Healer",
  "requirement": null,
  "wp": 2,
  "timing": "downtime",
  "page": 37,
  "tags": [
   "healing"
  ],
  "text": "Heal an extra D6 HP during a stretch rest. Doesn't affect WP or conditions."
 },
 {
  "id": "fearless",
  "name": "Fearless",
  "requirement": null,
  "wp": 2,
  "timing": "free",
  "page": 37,
  "tags": [
   "defense"
  ],
  "text": "Resist a fear attack automatically, with no WIL roll."
 },
 {
  "id": "focused",
  "name": "Focused",
  "requirement": null,
  "wp": null,
  "timing": "passive",
  "page": 37,
  "repeatable": true,
  "tags": [
   "passive"
  ],
  "wpMax": 2,
  "text": "Your maximum WP permanently increases by 2. Can be taken any number of times."
 },
 {
  "id": "guardian",
  "name": "Guardian",
  "requirement": {
   "skills": [
    "Axes",
    "Hammers",
    "Swords"
   ],
   "level": 12
  },
  "wp": 2,
  "timing": "reaction",
  "page": 37,
  "tags": [
   "defense"
  ],
  "text": "When you and another player character are both within 2 m of the same enemy and it attacks them, force it to attack you instead. Out of turn and not an action."
 },
 {
  "id": "insight",
  "name": "Insight",
  "requirement": {
   "skills": [
    "Persuasion"
   ],
   "level": 12
  },
  "wp": 2,
  "timing": "downtime",
  "page": 37,
  "tags": [
   "social"
  ],
  "text": "After talking with someone for a while, roll Awareness to tell whether they are being truthful — though not what they're lying about."
 },
 {
  "id": "intuition",
  "name": "Intuition",
  "requirement": {
   "skills": [
    "Myths & Legends"
   ],
   "level": 12
  },
  "wp": 3,
  "timing": "free",
  "page": 37,
  "tags": [
   "utility"
  ],
  "text": "Facing a hard decision, ask the GM one question and get a helpful answer drawn from your broad learning — enough to guide you, not to reveal everything."
 },
 {
  "id": "iron-fist",
  "name": "Iron Fist",
  "requirement": {
   "skills": [
    "Brawling"
   ],
   "level": 12
  },
  "wp": 1,
  "timing": "free",
  "page": 38,
  "tags": [
   "damage"
  ],
  "damage": "D6",
  "text": "An unarmed attack deals one more D6 of damage. Activate as a free action after rolling the attack."
 },
 {
  "id": "iron-grip",
  "name": "Iron Grip",
  "requirement": {
   "skills": [
    "Brawling"
   ],
   "level": 12
  },
  "wp": 1,
  "timing": "free",
  "page": 38,
  "tags": [
   "attack"
  ],
  "text": "Boon on Brawling rolls to grapple someone or to stop them breaking free."
 },
 {
  "id": "lightning-fast",
  "name": "Lightning Fast",
  "requirement": {
   "skills": [
    "Evade"
   ],
   "level": 12
  },
  "wp": 2,
  "timing": "roundStart",
  "page": 38,
  "tags": [
   "initiative"
  ],
  "text": "When drawing initiative, draw two cards and keep the one you want. Once per round."
 },
 {
  "id": "lone-wolf",
  "name": "Lone Wolf",
  "requirement": {
   "skills": [
    "Bushcraft"
   ],
   "level": 12
  },
  "wp": null,
  "timing": "passive",
  "page": 38,
  "tags": [
   "travel"
  ],
  "text": "You can take a shift rest in the wild without first rolling Bushcraft to make camp. Only you benefit, even in a tent."
 },
 {
  "id": "magic-talent",
  "name": "Magic Talent",
  "requirement": null,
  "wp": null,
  "timing": "passive",
  "page": 38,
  "repeatable": true,
  "tags": [
   "magic"
  ],
  "text": "You have a gift for magic and can learn a new school (whether or not you know one already); spells must be learned separately. Take once per new school."
 },
 {
  "id": "massive-blow",
  "name": "Massive Blow",
  "requirement": {
   "any": "strMelee",
   "level": 12
  },
  "wp": 3,
  "timing": "free",
  "page": 38,
  "tags": [
   "damage"
  ],
  "damage": "D8",
  "text": "A hit with a two-handed melee weapon deals an extra D8 damage, but you can't move that round. Activate after the hit — not if you've already moved."
 },
 {
  "id": "master-blacksmith",
  "name": "Master Blacksmith",
  "requirement": {
   "skills": [
    "Crafting"
   ],
   "level": 12
  },
  "wp": "varies",
  "timing": "downtime",
  "page": 38,
  "tags": [
   "crafting"
  ],
  "text": "With blacksmith's tools: spend a stretch and 3 WP to sharpen a bladed or pointed weapon (armor counts one step lower against it until the end of a fight in which it attacks or parries). In a shift, forge a metal weapon or armor from the lists with a forge, anvil and iron (weight 1); WP cost equals its price in gold (rounded up) and can be spread over several shifts."
 },
 {
  "id": "master-carpenter",
  "name": "Master Carpenter",
  "requirement": {
   "skills": [
    "Crafting"
   ],
   "level": 12
  },
  "wp": "varies",
  "timing": "action",
  "page": 38,
  "tags": [
   "crafting"
  ],
  "text": "With carpentry tools: as an action, deal D12 damage per WP spent to a door, wall or other object, ignoring its armor. In a shift, build a wooden item from the lists (club, staff, shield…) from suitable wood; WP cost equals its price in gold (rounded up)."
 },
 {
  "id": "master-chef",
  "name": "Master Chef",
  "requirement": null,
  "wp": 1,
  "timing": "downtime",
  "page": 38,
  "tags": [
   "travel"
  ],
  "text": "Automatically succeed at cooking food without a Bushcraft roll."
 },
 {
  "id": "master-spellcaster",
  "name": "Master Spellcaster",
  "requirement": {
   "any": "magic",
   "level": 12
  },
  "wp": 3,
  "timing": "free",
  "page": 38,
  "tags": [
   "magic"
  ],
  "text": "On your turn in combat, cast two different spells as a single action. You may roll for the first spell before deciding to activate this."
 },
 {
  "id": "master-tanner",
  "name": "Master Tanner",
  "requirement": {
   "skills": [
    "Crafting"
   ],
   "level": 12
  },
  "wp": "varies",
  "timing": "downtime",
  "page": 38,
  "tags": [
   "crafting"
  ],
  "text": "With leatherworking tools, spend a shift turning an animal or monster hide into leather armor with half the beast's armor rating (rounded up, minimum 1). WP cost equals the armor rating."
 },
 {
  "id": "monster-hunter",
  "name": "Monster Hunter",
  "requirement": {
   "skills": [
    "Beast Lore"
   ],
   "level": 12
  },
  "wp": 3,
  "timing": "free",
  "page": 39,
  "tags": [
   "travel"
  ],
  "text": "At a crossroads of some kind, learn which way the most dangerous enemies lie."
 },
 {
  "id": "musician",
  "name": "Musician",
  "requirement": {
   "skills": [
    "Performance"
   ],
   "level": 12
  },
  "wp": 3,
  "timing": "action",
  "page": 39,
  "tags": [
   "support"
  ],
  "text": "Your playing or singing gives every ally within 10 m a boon on all rolls — or every enemy in range a bane (choose one) — until your turn next round. An action in combat. Instruments can lower the WP cost or extend the range."
 },
 {
  "id": "pathfinder",
  "name": "Pathfinder",
  "requirement": {
   "skills": [
    "Bushcraft"
   ],
   "level": 12
  },
  "wp": 1,
  "timing": "free",
  "page": 39,
  "tags": [
   "travel"
  ],
  "text": "Boon on Bushcraft rolls to find the way through the wild."
 },
 {
  "id": "quartermaster",
  "name": "Quartermaster",
  "requirement": {
   "skills": [
    "Bushcraft"
   ],
   "level": 12
  },
  "wp": 1,
  "timing": "downtime",
  "page": 39,
  "tags": [
   "travel"
  ],
  "text": "Automatically succeed at making camp on a journey."
 },
 {
  "id": "robust",
  "name": "Robust",
  "requirement": null,
  "wp": null,
  "timing": "passive",
  "page": 39,
  "repeatable": true,
  "tags": [
   "passive"
  ],
  "hpMax": 2,
  "text": "Your maximum HP increases by 2. Can be taken any number of times."
 },
 {
  "id": "sea-legs",
  "name": "Sea Legs",
  "requirement": {
   "skills": [
    "Swimming"
   ],
   "level": 12
  },
  "wp": 1,
  "timing": "free",
  "page": 39,
  "tags": [
   "utility"
  ],
  "text": "Activate (not an action) when acting in water, even waist-deep, to ignore every drawback of being in water for one round, including drowning."
 },
 {
  "id": "shield-block",
  "name": "Shield Block",
  "requirement": {
   "any": "strMelee",
   "level": 12
  },
  "wp": 2,
  "timing": "reaction",
  "page": 39,
  "tags": [
   "defense"
  ],
  "text": "Boon when parrying with a shield. With a shield you can also parry physical monster attacks (not area effects) that normally can't be parried, again with a boon. Combines with Defensive."
 },
 {
  "id": "throwing-arm",
  "name": "Throwing Arm",
  "requirement": {
   "any": "melee",
   "level": 12
  },
  "wp": 2,
  "timing": "free",
  "page": 39,
  "tags": [
   "attack"
  ],
  "text": "Hurl a one-handed melee weapon at an enemy up to your STR in metres away. Roll the attack normally; the target may parry or dodge. The weapon lands at their feet."
 },
 {
  "id": "treasure-hunter",
  "name": "Treasure Hunter",
  "requirement": {
   "skills": [
    "Bartering"
   ],
   "level": 12
  },
  "wp": 3,
  "timing": "free",
  "page": 39,
  "tags": [
   "travel"
  ],
  "text": "At a crossroads of some kind, learn which way the greatest treasures lie."
 },
 {
  "id": "twin-shot",
  "name": "Twin Shot",
  "requirement": {
   "skills": [
    "Bows"
   ],
   "level": 12
  },
  "wp": 3,
  "timing": "free",
  "page": 39,
  "tags": [
   "attack"
  ],
  "text": "Shooting a bow (not a crossbow), loose two arrows at once — one attack roll with a bane, damage rolled separately. They may hit one target or two."
 },
 {
  "id": "veteran",
  "name": "Veteran",
  "requirement": {
   "any": "weapon",
   "level": 12
  },
  "wp": 1,
  "timing": "roundStart",
  "page": 39,
  "tags": [
   "initiative"
  ],
  "text": "At the start of a round, keep last round's initiative card instead of drawing a new one. Not an action."
 },
 {
  "id": "weasel",
  "name": "Weasel",
  "requirement": {
   "skills": [
    "Evade"
   ],
   "level": 12
  },
  "wp": 3,
  "timing": "reaction",
  "page": 39,
  "tags": [
   "defense"
  ],
  "text": "When attacked with another player character within 2 m, make the attack hit them instead. Activate before any dodge or parry; no effect on area attacks. The new target may dodge or parry as normal."
 }
];

export const DB_JOURNEY = {
 "pace": {
  "foot": 15,
  "mounted": 30,
  "unit": "km per shift",
  "maxShifts": 2,
  "forcedMarch": "A third shift in a day makes you Exhausted; an Exhausted character can't, and nobody travels more than three shifts a day."
 },
 "pathfinder": "Off the road, a pathfinder rolls Bushcraft each shift — bane without a map, boon with a spyglass, an extra bane in very difficult terrain. Failure: a mishap. A Dragon finds a shortcut and doubles the distance.",
 "randomEncounter": "Roll once per shift, or whenever it suits the GM.",
 "camp": "Everyone rolls Bushcraft to find a resting place (bane without a sleeping fur). A tent gives a boon, and a success lets its occupants sleep without their own rolls. A failed roll means the shift neither counts as sleep nor as a shift rest. No camping in dangerous places.",
 "food": {
  "hunting": "Needs a ranged weapon or trap. Hunting & Fishing to track, then the hunting table and a second roll to kill.",
  "fishing": "Needs fishing gear: Hunting & Fishing gives D4 rations with a rod or D6 with a net.",
  "foraging": "Bushcraft (bane in winter, boon in autumn) finds D3 rations of plants.",
  "cooking": "Up to ten rations takes a shift and a Bushcraft roll (boon with a field kitchen or real kitchen). Raw meat or fish risks illness (virulence 10); raw plants are safe but take two rations to cover a day."
 },
 "hunger": "Eat a ration a day. A day without food: famished — no healing except by magic and 1 damage per day; at zero HP you starve a day later.",
 "cold": "Without enough shelter, roll Bushcraft (usually each shift; each stretch or round in extreme cold): bane without a blanket, boon with a fur. Failure: lose D6 HP and D6 WP and no healing until warm; at zero HP you die at the next roll.",
 "sleep": "Sleep a shift each day (not in armor). After three shifts awake, no WP or condition healing and lose D6 WP per further shift; at zero WP you collapse for at least a shift."
};

export const DB_KIN: DbKin[] = [
 {
  "id": "human",
  "name": "Human",
  "page": 10,
  "roll": [
   1,
   4
  ],
  "movement": 10,
  "text": "The youngest kin, now spread across most of the known world — farmers clustered around castles, the warriors sworn to guard them, and the bold few who seek gold, glory and knowledge in the unknown.",
  "abilities": [
   {
    "id": "adaptive",
    "name": "Adaptive",
    "wp": 3,
    "timing": "free",
    "text": "When rolling for a skill, you may roll a different skill of your choice instead, as long as you can justify how it applies. The GM decides, but should be generous."
   }
  ],
  "names": [
   "Joruna",
   "Tym",
   "Halvelda",
   "Garmander",
   "Verolun",
   "Lothar"
  ]
 },
 {
  "id": "halfling",
  "name": "Halfling",
  "page": 11,
  "roll": [
   5,
   7
  ],
  "movement": 8,
  "text": "Small, good-natured folk of the hilly farmlands who love home, hearth and a full larder — and old songs and tales, which now and then lure them out on adventures. Wary of the tall folk, they are good at hiding and slipping out of trouble.",
  "abilities": [
   {
    "id": "hard-to-catch",
    "name": "Hard to Catch",
    "wp": 3,
    "timing": "reaction",
    "text": "Activate when dodging an attack to get a boon on the Evade roll."
   }
  ],
  "names": [
   "Snappy",
   "Brine",
   "Cottar",
   "Bumble",
   "Perrywick",
   "Theoline"
  ]
 },
 {
  "id": "dwarf",
  "name": "Dwarf",
  "page": 11,
  "roll": [
   8,
   9
  ],
  "movement": 8,
  "text": "The oldest of the elder folk by their own reckoning — proud, traditional, bound to the bedrock and famed as smiths, stoneworkers and fierce wielders of axe and hammer.",
  "abilities": [
   {
    "id": "unforgiving",
    "name": "Unforgiving",
    "wp": 3,
    "timing": "free",
    "text": "Activate when attacking someone who has ever dealt you at least 1 point of damage to get a boon on the roll, no matter how long ago it happened. Keeping a list of names is wise."
   }
  ],
  "names": [
   "Tinderrock",
   "Halwyld",
   "Tymolana",
   "Traut",
   "Urd",
   "Fermer"
  ]
 },
 {
  "id": "elf",
  "name": "Elf",
  "page": 12,
  "roll": [
   10,
   10
  ],
  "movement": 10,
  "text": "Ancient wardens of the forests who look to the stars for guidance. Their inward, meditative ways can be hard for outsiders to follow, yet their warriors are praised in song for skill with sword and bow.",
  "abilities": [
   {
    "id": "inner-peace",
    "name": "Inner Peace",
    "wp": null,
    "timing": "rest",
    "text": "You can meditate deeply during a stretch rest, healing an extra D6 HP and D6 WP and recovering from one additional condition. While meditating you are completely unresponsive and can't be woken."
   }
  ],
  "names": [
   "Arasin",
   "Illyriana",
   "Galvander",
   "Tyrindelia",
   "Erwilnor",
   "Andremone"
  ]
 },
 {
  "id": "mallard",
  "name": "Mallard",
  "page": 12,
  "roll": [
   11,
   11
  ],
  "movement": 8,
  "text": "Feathered humanoids of mysterious origin — a sunken island realm, or a magical experiment gone wrong? Born traders whose quacking fills every marketplace, though some take up piracy or the sword, small but feared for their temper.",
  "abilities": [
   {
    "id": "ill-tempered",
    "name": "Ill-Tempered",
    "wp": 3,
    "timing": "free",
    "text": "Activate (no action) when making a skill roll to get a boon, and become Angry if you aren't already. Can't be used for rolls against INT or INT-based skills."
   },
   {
    "id": "webbed-feet",
    "name": "Webbed Feet",
    "wp": null,
    "timing": "passive",
    "text": "You get a boon on all Swimming rolls and always move at full speed in or under water."
   }
  ],
  "names": [
   "Qwucksum",
   "Splats",
   "Moggee",
   "Groddy",
   "Blisandina",
   "Hackleswell"
  ]
 },
 {
  "id": "wolfkin",
  "name": "Wolfkin",
  "page": 13,
  "roll": [
   12,
   12
  ],
  "movement": 12,
  "text": "The untamed fury of the wild — thoughtful and often brilliant, yet carrying ancient hunting instincts and old anger over wrongs done to wolves and the wilderness. Unmatched hunters and pathfinders.",
  "abilities": [
   {
    "id": "hunting-instincts",
    "name": "Hunting Instincts",
    "wp": 3,
    "timing": "action",
    "text": "Mark a creature you can see or smell as your prey (an action in combat). You can follow its scent for a full day, and spend 1 more WP (not an action) to get a boon on an attack against it."
   }
  ],
  "names": [
   "Wyld",
   "Wolfshadow",
   "Lunariem",
   "Obdurian",
   "Frostbite",
   "Wuldenhall"
  ]
 }
];

export const DB_MAGIC_RULES = {
 "schools": [
  "Animism",
  "Elementalism",
  "Mentalism"
 ],
 "wpPerPowerLevel": 2,
 "maxPowerLevel": 3,
 "fixedCost": 2,
 "trickCost": 1,
 "preparedLimit": "INT base chance (tricks don't count)",
 "powerFromBody": {
  "atOrBelowWp": 1,
  "dice": [
   "D4",
   "D6",
   "D8",
   "D10",
   "D12",
   "D20"
  ],
  "text": "With 1 or 0 WP left, roll a die of your choice before casting: you gain that many WP to spend at once and take the same in damage after the spell. Unused WP are lost. Not for healing spells."
 },
 "metal": "You can't cast while wearing metal armor or with a metal weapon at hand (axes, spears, studded leather and arrows count; staves, clubs and slings don't). Items in your Inventory don't count.",
 "grimoire": "Casting an unprepared spell from your grimoire takes twice as long (not reaction spells).",
 "dragon": [
  "Double the spell's damage or range",
  "The spell costs no WP",
  "Cast another spell at once, with a bane"
 ],
 "demon": "Can't be pushed; roll on the magical mishap table (optional rule).",
 "aoe": "Area spells can be dodged but not parried unless stated; leaving out targets gives a bane.",
 "durations": {
  "Instant": "Happens at once, no lasting effect.",
  "Round": "Until your turn next round.",
  "Stretch": "One stretch.",
  "Shift": "Until the end of the current shift.",
  "Concentration": "Ends if you take another action, take damage or fail a WIL roll against fear; a sudden disturbance calls for a WIL roll.",
  "Permanent": "Lasts until undone."
 }
};

export const DB_MAGIC_TRICKS: DbMagicTrick[] = [
 {
  "id": "fetch",
  "name": "Fetch",
  "school": "General",
  "page": 61,
  "text": "A loose object of weight 1 or less within 10 m floats to you."
 },
 {
  "id": "flick",
  "name": "Flick",
  "school": "General",
  "page": 61,
  "text": "Give an object or creature within 10 m a magical flick for 1 damage — enough to crack glass."
 },
 {
  "id": "light",
  "name": "Light",
  "school": "General",
  "page": 61,
  "text": "A focus of your choice shines with bright light in a 10 m radius for a shift; it goes out if you drop to zero HP."
 },
 {
  "id": "open-close",
  "name": "Open/Close",
  "school": "General",
  "page": 61,
  "text": "Open or shut an unlocked door you can see within 10 m."
 },
 {
  "id": "repair-clothes",
  "name": "Repair Clothes",
  "school": "General",
  "page": 61,
  "text": "Mend and clean the clothes of someone within 10 m, yourself included."
 },
 {
  "id": "sense-magic",
  "name": "Sense Magic",
  "school": "General",
  "page": 61,
  "text": "Sense whether your surroundings or an item you hold is touched by magic, and what kind."
 },
 {
  "id": "birdsong",
  "name": "Birdsong",
  "school": "Animism",
  "page": 63,
  "text": "Lovely birdsong surrounds you for a stretch, giving a boon to Awareness. Outdoors only."
 },
 {
  "id": "clean",
  "name": "Clean",
  "school": "Animism",
  "page": 63,
  "text": "The room you're in is swept clean and put in order."
 },
 {
  "id": "cook-food",
  "name": "Cook Food",
  "school": "Animism",
  "page": 63,
  "text": "Cook food instantly and automatically, with no Bushcraft roll (one action)."
 },
 {
  "id": "floral-trail",
  "name": "Floral Trail",
  "school": "Animism",
  "page": 63,
  "text": "Flowers spring up where you walk, wilting after a shift."
 },
 {
  "id": "hairstyle",
  "name": "Hairstyle",
  "school": "Animism",
  "page": 63,
  "text": "Change your hair's colour, length and style — sometimes worth a boon to Bluffing or Persuasion."
 },
 {
  "id": "heat-chill",
  "name": "Heat/Chill",
  "school": "Elementalism",
  "page": 65,
  "text": "Make the area within 10 m pleasantly warm or cool, protecting against cold for a shift."
 },
 {
  "id": "ignite",
  "name": "Ignite",
  "school": "Elementalism",
  "page": 65,
  "text": "Light or snuff a candle, torch or lantern within 10 m."
 },
 {
  "id": "puff-of-smoke",
  "name": "Puff of Smoke",
  "school": "Elementalism",
  "page": 65,
  "text": "A dramatic puff of smoke bursts in front of you — sometimes worth a boon to Sneaking."
 },
 {
  "id": "lock-unlock",
  "name": "Lock/Unlock",
  "school": "Mentalism",
  "page": 69,
  "text": "Your touch locks or unlocks a non-magical lock."
 },
 {
  "id": "magic-stool",
  "name": "Magic Stool",
  "school": "Mentalism",
  "page": 69,
  "text": "Create a round seat about half a metre wide and high that lasts until you leave."
 },
 {
  "id": "slow-fall",
  "name": "Slow Fall",
  "school": "Mentalism",
  "page": 69,
  "text": "Drift down and land as lightly as a feather from any height."
 }
];

export const DB_MASTERCRAFTED = {
 "costMultiplier": 10,
 "strReduction": 3,
 "durabilityBonus": 3,
 "text": "Costs ×10; STR requirement −3 and durability +3."
};

export const DB_MEMENTOS: DbRollEntry[] = [
 {
  "roll": 1,
  "text": "Your trusty old shoes"
 },
 {
  "roll": 2,
  "text": "A simple silver medallion"
 },
 {
  "roll": 3,
  "text": "A letter from an old friend or relative"
 },
 {
  "roll": 4,
  "text": "A ragged old journal"
 },
 {
  "roll": 5,
  "text": "A bracelet passed down in your family"
 },
 {
  "roll": 6,
  "text": "A wooden figurine you got as a child"
 },
 {
  "roll": 7,
  "text": "A strangely shaped stone"
 },
 {
  "roll": 8,
  "text": "A copper coin from a treasure sought by your mother or father"
 },
 {
  "roll": 9,
  "text": "An old pewter tankard"
 },
 {
  "roll": 10,
  "text": "A horn taken as a trophy from a monster"
 },
 {
  "roll": 11,
  "text": "A fang taken as a trophy from a beast"
 },
 {
  "roll": 12,
  "text": "A couple of simple dice made of bone"
 },
 {
  "roll": 13,
  "text": "A locket containing a lock of hair"
 },
 {
  "roll": 14,
  "text": "An ornate key"
 },
 {
  "roll": 15,
  "text": "A hand-drawn map you inherited"
 },
 {
  "roll": 16,
  "text": "A ring with an inscription"
 },
 {
  "roll": 17,
  "text": "A bone whistle"
 },
 {
  "roll": 18,
  "text": "Your mother's or father's ragged old hat"
 },
 {
  "roll": 19,
  "text": "A griffin feather"
 },
 {
  "roll": 20,
  "text": "A beautifully carved pipe"
 }
];

export const DB_MONSTERS: DbMonster[] = [
 {
  "id": "demon",
  "name": "Demon",
  "page": 85,
  "ferocity": 2,
  "size": "Large",
  "movement": 16,
  "armor": 4,
  "hp": 64,
  "text": "A terrifying being from the grim world beyond, born of the same ancient magic as dragons and their mortal enemy. Demons crave power and seek to break everything fixed — friendships, treaties, nations, even the laws of the cosmos. Their shapes vary; this is one example.",
  "traits": [],
  "attacks": [
   {
    "roll": 1,
    "name": "Demonic Dread",
    "damage": null,
    "type": null,
    "targets": "all player characters",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Hisses threats in an ancient tongue: every player character within 10 m suffers a fear attack."
   },
   {
    "roll": 2,
    "name": "Claw Attack",
    "damage": "2D10",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": true,
    "dodge": true,
    "text": "Slashes one character for 2D10 slashing damage. Can be parried."
   },
   {
    "roll": 3,
    "name": "Curse",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "curse": true,
    "text": "Points at a character within 10 m and chants a curse (can't be dodged); roll D6 on the curse list. All but #6 can be lifted with Dispel (power level 1).",
    "curses": [
     "Vomits a frog whenever they lie; roll D4 each morning, 1 ends it.",
     "Gold or silver they touch crumbles to dust; roll D4 each morning, 1 ends it.",
     "Blinded, as in total darkness; roll D4 each shift, 1 ends it.",
     "Forgets their own name and their companions (roleplay it); roll D4 each morning, 1 ends it.",
     "Turned into an animal (D6: cat, fox, goat, wolf, deer, bear) and can't speak; roll D4 each shift, 1 ends it.",
     "Ages one category (young→adult→old) with the attribute changes; permanent. The already old become frail: −2 STR and CON."
    ]
   },
   {
    "roll": 4,
    "name": "Unseen Ferocity",
    "damage": "2D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Hurls a victim within 10 m 2D8 m backwards for the same in bludgeoning damage; they land prone."
   },
   {
    "roll": 5,
    "name": "Scorpion Sting",
    "damage": "D12",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": true,
    "dodge": true,
    "poison": {
     "type": "paralyzing",
     "potency": 16
    },
    "text": "Stings for D12 piercing; anyone taking damage is injected with paralyzing poison (potency 16). Can be parried."
   },
   {
    "roll": 6,
    "name": "Possessed",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "text": "Seizes a character within 10 m: they roll WIL with a bane (not an action); on a failure they must move and act as the demon wishes (nothing costing WP) and lose their next turn."
   }
  ]
 },
 {
  "id": "dragon",
  "name": "Dragon",
  "page": 86,
  "ferocity": 3,
  "size": "Huge",
  "movement": 24,
  "flying": true,
  "armor": 6,
  "hp": 84,
  "text": "Cunning, vain reptilian masters of the mountains who lair in deep caves and old dwarven mines. Silver-tongued deceivers who are themselves weak to flattery — and to gold.",
  "traits": [
   {
    "name": "Wings",
    "text": "Flies freely through the air."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Dragon Roar",
    "damage": null,
    "type": null,
    "targets": "all player characters",
    "range": 20,
    "fear": "bane",
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A chilling roar: every player character within 20 m suffers a fear attack with a bane on the WIL roll."
   },
   {
    "roll": 2,
    "name": "Claw Attack",
    "damage": "2D10",
    "type": "slashing",
    "targets": "two",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Sweeps its claws at two characters for 2D10 slashing each."
   },
   {
    "roll": 3,
    "name": "Dragon Wind",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "A gale from its wings hurls everyone up to human size within 10 m 2D6 m, for the same bludgeoning damage; they land prone."
   },
   {
    "roll": 4,
    "name": "Tail Strike",
    "damage": "2D8",
    "type": "bludgeoning",
    "targets": "all within 6 m",
    "range": 6,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Its spiked tail hits every player character within 6 m for 2D8 bludgeoning and knocks them down."
   },
   {
    "roll": 5,
    "name": "Dragon Bite",
    "damage": "4D10",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Snaps up one victim for 4D10 slashing."
   },
   {
    "roll": 6,
    "name": "Fire Breath",
    "damage": "3D10",
    "type": "fire",
    "targets": "cone",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "ignoresArmor": true,
    "text": "A 10 m cone of fire (as wide as it is far from the mouth): everyone caught takes 3D10, armor doesn't help."
   }
  ]
 },
 {
  "id": "ghost",
  "name": "Ghost",
  "page": 87,
  "ferocity": 2,
  "size": "Normal",
  "movement": 12,
  "armor": null,
  "hp": 27,
  "persuadable": "bane",
  "text": "Restless dead bound to a place — usually their remains or the scene of their death — and to some unfinished business: revenge, a debt, a proper burial.",
  "traits": [
   {
    "name": "Immunity",
    "text": "Immaterial: immune to everything except magic and fire. Defeated, it returns after a shift unless Purged or its unfinished business is settled."
   },
   {
    "name": "Persuadable",
    "text": "Unlike most monsters it can be persuaded, with a bane."
   }
  ],
  "immunities": [
   "All damage except magic and fire"
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Ghost Strike",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Lunges at a character within 10 m, knocking them back 2D6 m for the same bludgeoning damage; they land prone."
   },
   {
    "roll": 2,
    "name": "Touch of Death",
    "damage": "2D10",
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [
     "Scared"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "ignoresArmor": true,
    "text": "Grips the victim's heart: 2D10 damage, armor doesn't help, and they become Scared."
   },
   {
    "roll": 3,
    "name": "Ghost Scream",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A soul-chilling scream: everyone within 10 m suffers a fear attack."
   },
   {
    "roll": 4,
    "name": "Death Stare",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": "bane",
    "conditions": [
     "Scared"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Stares into a character's soul: they become Scared and suffer a fear attack with a bane on the WIL roll."
   },
   {
    "roll": 5,
    "name": "Ghostly Embrace",
    "damage": "3D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [
     "Dazed"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Appears in front of someone within 10 m and smothers them: 3D6 bludgeoning and Dazed."
   },
   {
    "roll": 6,
    "name": "Cold Strike",
    "damage": "2D8",
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "ignoresArmor": true,
    "text": "The chill of death: 2D8 damage, armor doesn't help, and no HP or WP healing until they spend a shift somewhere warm."
   }
  ]
 },
 {
  "id": "giant",
  "name": "Giant",
  "page": 88,
  "ferocity": 1,
  "size": "Huge",
  "movement": 18,
  "armor": null,
  "hp": 74,
  "text": "Colossal, mostly shy humanoids of the mountains with a deep bond to the bedrock. Some are fiercely territorial.",
  "traits": [
   {
    "name": "Weapon",
    "text": "Usually carries a huge weapon; without it, attacks #1 and #4 are re-rolled."
   },
   {
    "name": "Weak Spot",
    "text": "Hits on the top of its head deal double damage — a ranged attack with a bane from above, or climb up first (Acrobatics with a bane, then Acrobatics each turn, not an action, or fall for 2D6)."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Crushing Blow",
    "damage": "4D10",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "weapon": true,
    "text": "Brings its weapon down on one character: 4D10 bludgeoning and knocked down."
   },
   {
    "roll": 2,
    "name": "Roar",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A bellow that makes every player character within 10 m suffer a fear attack."
   },
   {
    "roll": 3,
    "name": "Stomp Attack",
    "damage": "4D6",
    "type": "bludgeoning",
    "targets": "two within 4 m of each other",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Stomps at two characters within 4 m of each other: 4D6 bludgeoning each, knocked down."
   },
   {
    "roll": 4,
    "name": "Sweeping Blow",
    "damage": "2D10",
    "type": "bludgeoning",
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "weapon": true,
    "text": "Sweeps its weapon at everyone within 10 m: 2D10 bludgeoning, knocked down."
   },
   {
    "roll": 5,
    "name": "Forceful Throw",
    "damage": "4D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Grabs and throws someone: 4D8 bludgeoning and they fly that many metres in a random direction, landing prone."
   },
   {
    "roll": 6,
    "name": "Smash Attack",
    "damage": "3D6",
    "type": "bludgeoning",
    "targets": "all within 2 m",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "A frenzy of kicks, fists and weapon: everyone within 2 m takes 3D6 bludgeoning and is knocked down."
   }
  ]
 },
 {
  "id": "giant-spider",
  "name": "Giant Spider",
  "page": 89,
  "ferocity": 2,
  "size": "Normal",
  "movement": 24,
  "armor": null,
  "hp": 36,
  "text": "Cunning predators of dark, damp places — forests, caves, ruins, even the cellars beneath inns. Most are cow-sized; ancient females grow as large as a house and may be worshipped as oracles.",
  "traits": [],
  "attacks": [
   {
    "roll": 1,
    "name": "Mandibles",
    "damage": "2D8",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Serrated mandibles slice for 2D8 slashing."
   },
   {
    "roll": 2,
    "name": "Tearing Attack",
    "damage": "D8",
    "type": "piercing",
    "targets": "all within 2 m",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Thrashing barbed legs hit every player character within 2 m for D8 piercing."
   },
   {
    "roll": 3,
    "name": "Mesmerizing Eyes",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Its many eyes force everyone within 10 m to roll WIL against fear."
   },
   {
    "roll": 4,
    "name": "Poison Sting",
    "damage": "D10",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": true,
    "dodge": true,
    "poison": {
     "type": "paralyzing",
     "potency": 16
    },
    "text": "A stinger for D10 piercing; anyone damaged gets paralyzing poison (potency 16). Can be parried."
   },
   {
    "roll": 5,
    "name": "Web Attack",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "text": "Spits web at the character with the highest STR: they roll Evade (not an action) or are stuck fast; breaking free takes a STR roll with a bane (an action), and others may help."
   },
   {
    "roll": 6,
    "name": "Ramming Attack",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Leaps onto a character for 2D6 bludgeoning, knocking them down."
   }
  ]
 },
 {
  "id": "griffon",
  "name": "Griffon",
  "page": 91,
  "ferocity": 2,
  "size": "Large",
  "movement": 30,
  "flying": true,
  "armor": null,
  "hp": 38,
  "text": "Aggressive forest hunters that nest in tall trees or cliffs among the junk and treasure of past victims. Some knights tame them as mounts; griffons in turn love to eat horses.",
  "traits": [
   {
    "name": "Wings",
    "text": "Flies freely through the air."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Snapping Beak",
    "damage": "2D8",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Tears at a character with its beak for 2D8 piercing."
   },
   {
    "roll": 2,
    "name": "Rearing Strike",
    "damage": "D8",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": true,
    "dodge": true,
    "multi": "D6",
    "text": "Rears up and strikes D6 times, each for D8 slashing; each strike can be dodged or parried separately."
   },
   {
    "roll": 3,
    "name": "Sweeping Claws",
    "damage": "D8",
    "type": "slashing",
    "targets": "all within 2 m",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Sweeps its claws: everyone within 2 m takes D8 slashing and is knocked down."
   },
   {
    "roll": 4,
    "name": "Griffon Throw",
    "damage": "2D6",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Grabs a character in its beak and flings them: 2D6 piercing, thrown that many metres, landing prone."
   },
   {
    "roll": 5,
    "name": "Whirlwind",
    "damage": "D6",
    "type": "bludgeoning",
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Its wings blow every player character within 10 m D6 m away for the same bludgeoning damage."
   },
   {
    "roll": 6,
    "name": "High Drop",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Unless dodged, seizes a character and flies 2D6+6 m up, dropping them on its next turn (instead of attacking) for falling damage."
   }
  ]
 },
 {
  "id": "harpy",
  "name": "Harpy",
  "page": 92,
  "ferocity": 1,
  "ferocityPer": "harpy",
  "size": "Normal",
  "movement": 24,
  "flying": true,
  "armor": null,
  "hp": 12,
  "hpPer": "harpy",
  "flock": true,
  "text": "Raven-like birds of prey with human faces and fanged mouths, nesting in ruins in flocks. Cowardly but calculating, they circle with insults and cackles before diving in — and always outnumber their prey.",
  "traits": [
   {
    "name": "Flock",
    "text": "Harpies fight as a group: one monster attack is made by several of them but uses only one harpy's turn. When half the flock is dead, the rest flee, returning when the moment suits them."
   },
   {
    "name": "Wings",
    "text": "Attack from the air; can only be reached with ranged weapons or long melee weapons."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Threatening Cackle",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Gruesome promises: everyone within 10 m rolls WIL against fear."
   },
   {
    "roll": 2,
    "name": "Coordinated Attack",
    "damage": "2D6",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "The flock dives on whoever wears the most metal: 2D6 slashing, and if hit they are lifted and dropped from D3+3 m."
   },
   {
    "roll": 3,
    "name": "Death From Above",
    "damage": "D6",
    "type": "bludgeoning",
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A rain of rocks and junk: everyone within 10 m takes D6 bludgeoning."
   },
   {
    "roll": 4,
    "name": "Eye Gouge",
    "damage": "2D6",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Claws at a character's eyes: 2D6 piercing and blinded (as in total darkness) for a stretch."
   },
   {
    "roll": 5,
    "name": "Mass Attack",
    "damage": "D8",
    "type": "slashing",
    "targets": "one per harpy",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "The flock splits up and attacks as many characters within 10 m as there are harpies, D8 slashing each."
   },
   {
    "roll": 6,
    "name": "Excrement Attack",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": true,
    "dodge": true,
    "parryNote": "with a shield",
    "text": "A shower of vomit and filth: everyone within 10 m must choose a condition. A shield can parry it."
   }
  ]
 },
 {
  "id": "manticore",
  "name": "Manticore",
  "page": 93,
  "ferocity": 2,
  "size": "Large",
  "movement": 16,
  "armor": null,
  "hp": 44,
  "text": "A lion-bodied, human-faced horror with a maw of fangs and a spiked, swollen tail — some say a magical creation run wild, others a hunger-beast from the dawn of time.",
  "traits": [],
  "attacks": [
   {
    "roll": 1,
    "name": "Tail Strike",
    "damage": "D12",
    "type": "piercing",
    "targets": "one",
    "range": 20,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": true,
    "dodge": true,
    "ranged": true,
    "parryNote": "with a shield",
    "poison": {
     "type": "paralyzing",
     "potency": 12
    },
    "text": "Fires tail spikes at a character within 20 m: D12 piercing plus paralyzing poison (potency 12). A shield can parry it."
   },
   {
    "roll": 2,
    "name": "Razor Sharp Bite",
    "damage": "3D8",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Bites one character with its many fangs for 3D8 slashing."
   },
   {
    "roll": 3,
    "name": "Claw Attack",
    "damage": "2D8+D6",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Runs down a character, knocks them over and tears at them: 2D8 slashing plus D6 for being prone."
   },
   {
    "roll": 4,
    "name": "Sweeping Attack",
    "damage": "2D6",
    "type": "slashing",
    "targets": "two",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Lashes its tail at two characters: 2D6 slashing each and knocked down."
   },
   {
    "roll": 5,
    "name": "Crushing Charge",
    "damage": "3D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Charges the character with the highest STR within 10 m: 3D6 bludgeoning and knocked down."
   },
   {
    "roll": 6,
    "name": "Spike Rain",
    "damage": "D10",
    "type": "piercing",
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "poison": {
     "type": "paralyzing",
     "potency": 12
    },
    "text": "A volley of spikes: everyone within 10 m takes D10 piercing and paralyzing poison (potency 12)."
   }
  ]
 },
 {
  "id": "minotaur",
  "name": "Minotaur",
  "page": 94,
  "ferocity": 2,
  "size": "Large",
  "movement": 16,
  "armor": null,
  "hp": 32,
  "gear": [
   "Two-Handed Axe"
  ],
  "text": "Bull-headed, semi-intelligent warriors of tremendous strength, ruled by a barely-contained rage. They roam alone or hold chokepoints like passes and fords, demanding tolls and duels.",
  "traits": [
   {
    "name": "Typical Gear",
    "text": "Two-handed axe (2D10)."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Bull Fist",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [
     "Dazed"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A furred fist for 2D6 bludgeoning; the victim is Dazed even if armor stops the damage."
   },
   {
    "roll": 2,
    "name": "Hoof Kick",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Kicks a victim 2D6 m away for the same bludgeoning damage; they land prone."
   },
   {
    "roll": 3,
    "name": "Horn Rush",
    "damage": "2D8",
    "type": "piercing",
    "targets": "two within 2 m of each other",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Charges two characters within 2 m of each other: 2D8 piercing each, knocked down."
   },
   {
    "roll": 4,
    "name": "Cleaving Chop",
    "damage": "weapon+D10",
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": true,
    "dodge": true,
    "weapon": true,
    "text": "A full overhead chop: weapon damage plus D10. Can be parried."
   },
   {
    "roll": 5,
    "name": "Sweeping Attack",
    "damage": "weapon",
    "type": null,
    "targets": "all within 2 m",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "weapon": true,
    "text": "Sweeps its weapon around, hitting everyone within 2 m for weapon damage."
   },
   {
    "roll": 6,
    "name": "Stomping Attack",
    "damage": "2D10",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Leaps and crashes down on one adventurer: 2D10 bludgeoning, knocked down."
   }
  ]
 },
 {
  "id": "troll",
  "name": "Troll",
  "page": 97,
  "ferocity": 2,
  "size": "Large",
  "movement": 10,
  "armor": null,
  "hp": 38,
  "persuadable": "bane",
  "text": "Huge, tusked, yellow-eyed brutes of children's tales. Usually hungry and short-tempered rather than truly wicked — drawn steel enrages them, but food and kindness can win them over.",
  "traits": [
   {
    "name": "Regeneration",
    "text": "Heals D6 HP on each of its turns in combat."
   },
   {
    "name": "Sensitive to Sunlight",
    "text": "Takes D6 damage per round in direct sunlight and can't regenerate; a troll brought to zero HP this way turns to stone. Thick cloud or full-cover clothing protects it."
   },
   {
    "name": "Persuadable",
    "text": "Can usually be persuaded, with a bane."
   }
  ],
  "regeneration": "D6",
  "attacks": [
   {
    "roll": 1,
    "name": "Troll Vomit",
    "damage": null,
    "type": null,
    "targets": "all within 6 m",
    "range": 6,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Spews bile and swamp water: every adventurer within 6 m suffers a condition of their choice."
   },
   {
    "roll": 2,
    "name": "Rending Attack",
    "damage": "D10",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": true,
    "dodge": true,
    "disease": 10,
    "text": "Filthy claws for D10 slashing; anyone damaged contracts a disease (virulence 10). Can be parried."
   },
   {
    "roll": 3,
    "name": "Repulsive Bite",
    "damage": "2D8",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Bites for 2D8 piercing and holds on: the victim must make a STR roll (an action) each round to break free or take another 2D8."
   },
   {
    "roll": 4,
    "name": "Troll Throw",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Hurls a character 2D6 m in a random direction for the same bludgeoning damage; they land prone."
   },
   {
    "roll": 5,
    "name": "Sweeping Blow",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "all within 2 m",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Long arms sweep everyone within 2 m for 2D6 bludgeoning."
   },
   {
    "roll": 6,
    "name": "Mangling Smash",
    "damage": "2D8",
    "type": "bludgeoning",
    "targets": "two",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Grabs the nearest character and smashes them into another: both take 2D8 bludgeoning and are knocked down."
   }
  ]
 },
 {
  "id": "wight",
  "name": "Wight",
  "page": 98,
  "ferocity": 2,
  "size": "Normal",
  "movement": 10,
  "armor": "as worn",
  "armorValue": 4,
  "hp": 38,
  "gear": [
   "Morningstar",
   "Chainmail"
  ],
  "text": "The undead spirits of princes and great warriors — corporeal, wilful and full of hatred for the living, still armed with the arms and relics of their graves and usually bound to their burial mounds.",
  "traits": [
   {
    "name": "Resistance",
    "text": "Half damage from non-magical weapons; fire deals normal damage."
   },
   {
    "name": "Typical Gear",
    "text": "Morningstar (2D8), chainmail (armor 4)."
   }
  ],
  "resistances": [
   "Non-magical weapons (fire excepted)"
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Unholy Roar",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A ghastly scream: everyone within 10 m suffers a fear attack."
   },
   {
    "roll": 2,
    "name": "Dreadful Gaze",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": "bane",
    "conditions": [
     "Scared"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "One character meets its eyes: they become Scared and suffer a fear attack with a bane on the WIL roll."
   },
   {
    "roll": 3,
    "name": "Hand of the Dead",
    "damage": "2D4",
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": false,
    "text": "A gesture flings a character within 10 m 2D4 m away for the same damage; they land prone. Can't be dodged."
   },
   {
    "roll": 4,
    "name": "Sweeping Attack",
    "damage": "weapon",
    "type": null,
    "targets": "all within 2 m",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": true,
    "dodge": true,
    "weapon": true,
    "text": "A sudden sweep of its weapon hits every player character within 2 m for weapon damage. Can be parried."
   },
   {
    "roll": 5,
    "name": "Crippling Cold",
    "damage": "D6",
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "ignoresArmor": true,
    "text": "Grabs a character: D6 damage ignoring armor; on their next turn they must pass Evade (not an action) to act at all, retrying each turn. They are also cold and can't heal HP or WP until warm."
   },
   {
    "roll": 6,
    "name": "Power Attack",
    "damage": "weapon×2",
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": true,
    "dodge": true,
    "weapon": true,
    "text": "A mighty swing with double the weapon's damage dice that knocks the victim down. Can be parried."
   }
  ]
 },
 {
  "id": "vampiric-bats",
  "name": "Vampiric Bats",
  "page": 99,
  "ferocity": 2,
  "size": "Swarm",
  "movement": 24,
  "flying": true,
  "armor": null,
  "hp": 18,
  "text": "Metre-wide bats with a taste for human blood that hunt in flocks through burial chambers, feeding on grave robbers.",
  "traits": [
   {
    "name": "Resistance",
    "text": "A swarm counts as one creature; all physical weapon damage, even magical, is halved (rounded up). Fire works normally."
   }
  ],
  "resistances": [
   "All physical weapons (fire excepted)"
  ],
  "attackDie": "D6",
  "attackRolls": [
   [
    1,
    2
   ],
   [
    3,
    4
   ],
   [
    5,
    6
   ]
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Swirling Horror",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "rolls": [
     1,
     2
    ],
    "text": "A frantic swirl: everyone within 10 m suffers a fear attack."
   },
   {
    "roll": 3,
    "name": "Collective Attack",
    "damage": "2D6",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "rolls": [
     3,
     4
    ],
    "drain": true,
    "text": "The swarm mobs the character with the highest CON: 2D6 slashing, a fear attack, and the swarm heals as much HP as it dealt."
   },
   {
    "roll": 5,
    "name": "Mass Attack",
    "damage": "D8",
    "type": "slashing",
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "rolls": [
     5,
     6
    ],
    "drain": true,
    "text": "The bats split up and bite everyone within 10 m for D8 slashing each, healing as much as they deal."
   }
  ]
 }
];

export const DB_MONSTER_RULES = {
 "ferocity": "Draw one initiative card per point of Ferocity each round; one turn (movement + action) per card.",
 "attacks": "A monster attacks only with its monster attacks: roll or pick on its D6 table. They hit automatically. Never the same attack twice in a row — a repeat becomes the next entry (6 becomes 1).",
 "defense": "Monsters can dodge, and armed monsters can parry, rolling against 15; each dodge or parry uses one of its turns (flip a card).",
 "topple": "Topple vs EVADE 15 (bane against four or more legs). Monsters can't be disarmed, grappled or shoved.",
 "resistance": "Resistant: that damage is halved after armor (rounded up).",
 "other": "Monsters see in the dark, are immune to fear and Persuasion unless stated, and poison doesn't affect them.",
 "sizes": {
  "Small": "Under a metre tall; blocks no area; slips through tiny gaps.",
  "Normal": "About human size; blocks 2×2 m; passes a 0.5 m gap.",
  "Large": "Blocks 4×4 m; passes a 1 m gap.",
  "Huge": "Blocks 8×8 m; passes a 2 m gap.",
  "Swarm": "Normal to Huge; never blocks its area; passes tiny gaps."
 }
};

export const DB_NPCS: DbNpc[] = [
 {
  "id": "goblin-scout",
  "name": "Goblin Scout",
  "kind": "Goblin",
  "page": 90,
  "movement": 10,
  "damageBonus": null,
  "hp": 9,
  "wp": null,
  "armor": {
   "name": "Leather",
   "rating": 1
  },
  "skills": {
   "Awareness": 10,
   "Evade": 10,
   "Sneaking": 12
  },
  "abilities": [],
  "weapons": [
   {
    "name": "Short Bow",
    "skill": 12,
    "damage": "D10"
   },
   {
    "name": "Short Sword",
    "skill": 10,
    "damage": "D10"
   }
  ],
  "traits": [
   "Nocturnal"
  ]
 },
 {
  "id": "goblin-warrior",
  "name": "Goblin Warrior",
  "kind": "Goblin",
  "page": 90,
  "movement": 10,
  "damageBonus": null,
  "hp": 10,
  "wp": null,
  "armor": {
   "name": "Studded Leather",
   "rating": 2
  },
  "skills": {
   "Awareness": 10,
   "Evade": 10,
   "Sneaking": 12
  },
  "abilities": [],
  "weapons": [
   {
    "name": "Long Spear",
    "skill": 12,
    "damage": "2D8"
   }
  ],
  "traits": [
   "Nocturnal"
  ]
 },
 {
  "id": "orc-warrior",
  "name": "Orc Warrior",
  "kind": "Orc",
  "page": 95,
  "movement": 10,
  "damageBonus": {
   "STR": "D4"
  },
  "hp": 12,
  "wp": null,
  "armor": {
   "name": "Studded Leather",
   "rating": 2
  },
  "skills": {
   "Awareness": 10,
   "Evade": 8
  },
  "abilities": [],
  "weapons": [
   {
    "name": "Scimitar",
    "skill": 12,
    "damage": "2D6"
   }
  ],
  "traits": [
   "Nocturnal"
  ]
 },
 {
  "id": "orc-shaman",
  "name": "Orc Shaman",
  "kind": "Orc",
  "page": 95,
  "movement": 10,
  "damageBonus": null,
  "hp": 10,
  "wp": 16,
  "armor": null,
  "skills": {
   "Animism": 14,
   "Awareness": 12,
   "Evade": 8
  },
  "spells": [
   "Ensnaring Roots",
   "Lightning Flash",
   "Treat Wound"
  ],
  "abilities": [],
  "weapons": [
   {
    "name": "Staff",
    "skill": 10,
    "damage": "D8"
   }
  ],
  "traits": [
   "Nocturnal"
  ]
 },
 {
  "id": "orc-chieftain",
  "name": "Orc Chieftain",
  "kind": "Orc",
  "page": 95,
  "boss": true,
  "movement": 10,
  "damageBonus": {
   "STR": "D6"
  },
  "hp": 24,
  "wp": 15,
  "armor": {
   "name": "Chainmail",
   "rating": 4
  },
  "skills": {
   "Awareness": 14,
   "Evade": 12
  },
  "abilities": [
   "Veteran",
   "Defensive",
   "Dual Wield",
   "Robust ×4"
  ],
  "weapons": [
   {
    "name": "Scimitar",
    "qty": 2,
    "skill": 16,
    "damage": "2D6"
   }
  ],
  "traits": [
   "Nocturnal"
  ]
 },
 {
  "id": "skeleton-warrior",
  "name": "Skeleton Warrior",
  "kind": "Skeleton",
  "page": 96,
  "movement": 8,
  "damageBonus": null,
  "hp": 8,
  "wp": null,
  "armor": {
   "name": "Studded Leather",
   "rating": 2
  },
  "skills": {
   "Awareness": 8,
   "Evade": 6
  },
  "abilities": [],
  "weapons": [
   {
    "name": "Short Sword",
    "skill": 12,
    "damage": "D10"
   }
  ],
  "traits": [
   "Skeleton"
  ]
 },
 {
  "id": "skeleton-archer",
  "name": "Skeleton Archer",
  "kind": "Skeleton",
  "page": 96,
  "movement": 8,
  "damageBonus": null,
  "hp": 8,
  "wp": null,
  "armor": {
   "name": "Leather",
   "rating": 1
  },
  "skills": {
   "Awareness": 8,
   "Evade": 6
  },
  "abilities": [],
  "weapons": [
   {
    "name": "Dagger",
    "skill": 10,
    "damage": "D8"
   },
   {
    "name": "Crossbow, Light",
    "skill": 12,
    "damage": "2D6"
   }
  ],
  "traits": [
   "Skeleton"
  ]
 },
 {
  "id": "skeleton-champion",
  "name": "Skeleton Champion",
  "kind": "Skeleton",
  "page": 96,
  "boss": true,
  "movement": 10,
  "damageBonus": {
   "STR": "D6"
  },
  "hp": 24,
  "wp": 15,
  "armor": {
   "name": "Chainmail",
   "rating": 4
  },
  "skills": {
   "Awareness": 12,
   "Evade": 8
  },
  "abilities": [
   "Veteran",
   "Defensive",
   "Double Slash",
   "Robust ×4"
  ],
  "weapons": [
   {
    "name": "Longsword",
    "skill": 16,
    "damage": "2D8"
   },
   {
    "name": "Shield, Large",
    "skill": 16,
    "damage": "D8"
   }
  ],
  "traits": [
   "Skeleton"
  ]
 },
 {
  "id": "guard",
  "name": "Guard",
  "kind": "Typical",
  "page": 105,
  "damageBonus": {
   "STR": "D4"
  },
  "hp": 12,
  "wp": null,
  "skills": {
   "Awareness": 10,
   "Swords": 12
  },
  "abilities": [],
  "gear": [
   "Broadsword",
   "Studded Leather"
  ]
 },
 {
  "id": "cultist",
  "name": "Cultist",
  "kind": "Typical",
  "page": 105,
  "damageBonus": {
   "AGL": "D4"
  },
  "hp": 12,
  "wp": null,
  "skills": {
   "Evade": 14,
   "Knives": 14
  },
  "abilities": [],
  "gear": [
   "Dagger"
  ]
 },
 {
  "id": "thief",
  "name": "Thief",
  "kind": "Typical",
  "page": 105,
  "damageBonus": {
   "AGL": "D4"
  },
  "hp": 10,
  "wp": null,
  "skills": {
   "Evade": 12,
   "Knives": 12
  },
  "abilities": [],
  "gear": [
   "Knife"
  ]
 },
 {
  "id": "villager",
  "name": "Villager",
  "kind": "Typical",
  "page": 105,
  "damageBonus": null,
  "hp": 8,
  "wp": null,
  "skills": {
   "Brawling": 8
  },
  "abilities": [],
  "gear": [
   "Wooden Club, Small"
  ]
 },
 {
  "id": "hunter",
  "name": "Hunter",
  "kind": "Typical",
  "page": 105,
  "damageBonus": {
   "AGL": "D4"
  },
  "hp": 13,
  "wp": null,
  "skills": {
   "Awareness": 12,
   "Bows": 13
  },
  "abilities": [],
  "gear": [
   "Longbow",
   "Leather"
  ]
 },
 {
  "id": "bandit",
  "name": "Bandit",
  "kind": "Typical",
  "page": 105,
  "damageBonus": null,
  "hp": 12,
  "wp": null,
  "skills": {
   "Bows": 12,
   "Evade": 10,
   "Swords": 12
  },
  "abilities": [],
  "gear": [
   "Short Sword",
   "Short Bow"
  ]
 },
 {
  "id": "adventurer",
  "name": "Adventurer",
  "kind": "Typical",
  "page": 105,
  "damageBonus": {
   "STR": "D4"
  },
  "hp": 13,
  "wp": null,
  "skills": {
   "Awareness": 10,
   "Swords": 12
  },
  "abilities": [],
  "gear": [
   "Broadsword",
   "Studded Leather"
  ]
 },
 {
  "id": "scholar",
  "name": "Scholar",
  "kind": "Typical",
  "page": 105,
  "damageBonus": null,
  "hp": 7,
  "wp": null,
  "skills": {
   "Languages": 13,
   "Myths & Legends": 13,
   "Staves": 8
  },
  "abilities": [],
  "gear": [
   "Book"
  ]
 },
 {
  "id": "bandit-chief",
  "name": "Bandit Chief",
  "kind": "Typical",
  "page": 105,
  "boss": true,
  "damageBonus": {
   "STR": "D6"
  },
  "hp": 30,
  "wp": 16,
  "skills": {
   "Awareness": 12,
   "Brawling": 15,
   "Hammers": 15
  },
  "abilities": [
   "Berserker",
   "Robust ×6",
   "Veteran"
  ],
  "gear": [
   "Warhammer, Heavy",
   "Chainmail",
   "Open Helmet"
  ]
 },
 {
  "id": "knight-champion",
  "name": "Knight Champion",
  "kind": "Typical",
  "page": 105,
  "boss": true,
  "damageBonus": {
   "STR": "D6"
  },
  "hp": 28,
  "wp": 26,
  "skills": {
   "Brawling": 14,
   "Swords": 16
  },
  "abilities": [
   "Defensive",
   "Double Slash",
   "Focused ×6",
   "Robust ×6"
  ],
  "gear": [
   "Longsword",
   "Shield, Large",
   "Plate Armor",
   "Great Helm",
   "Combat Trained Horse"
  ]
 },
 {
  "id": "archmage",
  "name": "Archmage",
  "kind": "Typical",
  "page": 105,
  "boss": true,
  "damageBonus": null,
  "hp": 22,
  "wp": 30,
  "skills": {
   "Magic School": 15,
   "Staves": 13
  },
  "abilities": [
   "Focused ×6",
   "Master Spellcaster",
   "Robust ×4"
  ],
  "gear": [
   "Staff",
   "Grimoire"
  ]
 }
];

export const DB_NPC_ATTRIBUTES = {
 "STR": "From the damage bonus: +D6 → 17, +D4 → 14, none → 10.",
 "AGL": "From the damage bonus: +D6 → 17, +D4 → 14, none → 10.",
 "CON": "Max HP, −2 per Robust.",
 "WIL": "Max WP (−2 per Focused) if listed, otherwise 10.",
 "INT": "10",
 "CHA": "10",
 "minions": "Minions share stats, die at zero HP (unless the GM wants a last word), rarely use WP and often share an initiative card.",
 "bosses": "Bosses draw their own initiative card and use WP and heroic abilities like player characters."
};

export const DB_NPC_TRAITS = {
 "Nocturnal": "In direct sunlight they get a bane on all rolls and take D6 damage per stretch; thick cloud or full-cover clothing prevents it.",
 "Skeleton": "Piercing damage is halved (rounded up). Immune to fear and Persuasion."
};

export const DB_PROFESSIONS: DbProfession[] = [
 {
  "id": "artisan",
  "name": "Artisan",
  "page": 14,
  "roll": 1,
  "keyAttribute": "STR",
  "text": "Builders, smiths, wainwrights, tanners and coopers who bring order out of chaos — bridges and houses, weapons and tools, pots and barrels, armor from tanned hides. Every village needs them.",
  "skills": [
   "Axes",
   "Brawling",
   "Crafting",
   "Hammers",
   "Knives",
   "Sleight of Hand",
   "Spot Hidden",
   "Swords"
  ],
  "heroicAbilities": [
   "Master Blacksmith",
   "Master Carpenter",
   "Master Tanner"
  ],
  "heroicChoice": true,
  "kits": [
   {
    "items": [
     {
      "name": "Warhammer, Light"
     },
     {
      "name": "Leather"
     },
     {
      "name": "Blacksmithing Tools"
     },
     {
      "name": "Torch"
     },
     {
      "name": "Flint & Tinder"
     }
    ],
    "food": "D8",
    "silver": "D8"
   },
   {
    "items": [
     {
      "name": "Handaxe"
     },
     {
      "name": "Leather"
     },
     {
      "name": "Carpentry Tools"
     },
     {
      "name": "Torch"
     },
     {
      "name": "Rope, Hemp"
     },
     {
      "name": "Flint & Tinder"
     }
    ],
    "food": "D8",
    "silver": "D8"
   },
   {
    "items": [
     {
      "name": "Knife"
     },
     {
      "name": "Leather"
     },
     {
      "name": "Tanning Tools"
     },
     {
      "name": "Lantern"
     },
     {
      "name": "Lamp Oil"
     },
     {
      "name": "Flint & Tinder"
     }
    ],
    "food": "D8",
    "silver": "D8"
   }
  ],
  "nicknames": [
   "Stonehammer",
   "Woodcleaver",
   "Strongfist",
   "Barrelmaker",
   "Bridgebuilder",
   "Ironmaster"
  ]
 },
 {
  "id": "bard",
  "name": "Bard",
  "page": 15,
  "roll": 2,
  "keyAttribute": "CHA",
  "text": "Singers, musicians and storytellers who keep the memory of old deeds alive — in taverns and markets for their supper, or at noble courts. Always hunting for deeds worthy of an epic.",
  "skills": [
   "Acrobatics",
   "Bluffing",
   "Evade",
   "Knives",
   "Languages",
   "Myths & Legends",
   "Performance",
   "Persuasion"
  ],
  "heroicAbilities": [
   "Musician"
  ],
  "kits": [
   {
    "items": [
     {
      "name": "Lyre"
     },
     {
      "name": "Knife"
     },
     {
      "name": "Oil Lamp"
     },
     {
      "name": "Lamp Oil"
     },
     {
      "name": "Flint & Tinder"
     }
    ],
    "food": "D6",
    "silver": "D8"
   },
   {
    "items": [
     {
      "name": "Flute"
     },
     {
      "name": "Dagger"
     },
     {
      "name": "Rope, Hemp"
     },
     {
      "name": "Torch"
     },
     {
      "name": "Flint & Tinder"
     }
    ],
    "food": "D6",
    "silver": "D8"
   },
   {
    "items": [
     {
      "name": "Horn"
     },
     {
      "name": "Knife"
     },
     {
      "name": "Torch"
     },
     {
      "name": "Flint & Tinder"
     }
    ],
    "food": "D6",
    "silver": "D8"
   }
  ],
  "nicknames": [
   "Odemaker",
   "Talespinner",
   "Silvervoice",
   "Gildenclef",
   "Honeytongue",
   "Rhymesmith"
  ]
 },
 {
  "id": "fighter",
  "name": "Fighter",
  "page": 16,
  "roll": 3,
  "keyAttribute": "STR",
  "text": "Professionals of violence who follow the way of the sword, spear or crossbow. Some take pride in winning with little bloodshed; many are haunted by what they've seen and surprisingly soft-hearted.",
  "skills": [
   "Axes",
   "Bows",
   "Brawling",
   "Crossbows",
   "Evade",
   "Hammers",
   "Spears",
   "Swords"
  ],
  "heroicAbilities": [
   "Veteran"
  ],
  "kits": [
   {
    "items": [
     {
      "choice": [
       "Broadsword",
       "Battleaxe",
       "Morningstar"
      ]
     },
     {
      "name": "Shield, Small"
     },
     {
      "name": "Chainmail"
     },
     {
      "name": "Torch"
     },
     {
      "name": "Flint & Tinder"
     }
    ],
    "food": "D6",
    "silver": "D6"
   },
   {
    "items": [
     {
      "choice": [
       "Short Sword",
       "Handaxe",
       "Short Spear"
      ]
     },
     {
      "name": "Crossbow, Light"
     },
     {
      "name": "Quiver of Arrows, Iron Head"
     },
     {
      "name": "Leather"
     },
     {
      "name": "Torch"
     },
     {
      "name": "Flint & Tinder"
     }
    ],
    "food": "D6",
    "silver": "D6"
   },
   {
    "items": [
     {
      "name": "Long Spear"
     },
     {
      "name": "Studded Leather"
     },
     {
      "name": "Open Helmet"
     },
     {
      "name": "Torch"
     },
     {
      "name": "Flint & Tinder"
     }
    ],
    "food": "D6",
    "silver": "D6"
   }
  ],
  "nicknames": [
   "Gravemaker",
   "Grimjaw",
   "Windthaw",
   "Coldsteel",
   "The Fearless",
   "The Butcher"
  ]
 },
 {
  "id": "hunter",
  "name": "Hunter",
  "page": 17,
  "roll": 4,
  "keyAttribute": "AGL",
  "text": "Stalkers of the deep forest who live for the hunt and honour their prey by using every part of it. At home in the cruel, beautiful wild — and often awkward among people.",
  "skills": [
   "Acrobatics",
   "Awareness",
   "Bows",
   "Bushcraft",
   "Hunting & Fishing",
   "Knives",
   "Slings",
   "Sneaking"
  ],
  "heroicAbilities": [
   "Companion"
  ],
  "kits": [
   {
    "items": [
     {
      "name": "Dagger"
     },
     {
      "name": "Short Bow"
     },
     {
      "name": "Quiver of Arrows, Iron Head"
     },
     {
      "name": "Leather"
     },
     {
      "name": "Sleeping Fur"
     },
     {
      "name": "Torch"
     },
     {
      "name": "Flint & Tinder"
     },
     {
      "name": "Rope, Hemp"
     },
     {
      "name": "Snare"
     }
    ],
    "food": "D8",
    "silver": "D6"
   },
   {
    "items": [
     {
      "name": "Knife"
     },
     {
      "name": "Longbow"
     },
     {
      "name": "Quiver of Arrows, Iron Head"
     },
     {
      "name": "Leather"
     },
     {
      "name": "Sleeping Fur"
     },
     {
      "name": "Torch"
     },
     {
      "name": "Flint & Tinder"
     },
     {
      "name": "Rope, Hemp"
     },
     {
      "name": "Fishing Rod"
     }
    ],
    "food": "D8",
    "silver": "D6"
   },
   {
    "items": [
     {
      "name": "Dagger"
     },
     {
      "name": "Sling"
     },
     {
      "name": "Leather"
     },
     {
      "name": "Sleeping Fur"
     },
     {
      "name": "Torch"
     },
     {
      "name": "Flint & Tinder"
     },
     {
      "name": "Rope, Hemp"
     },
     {
      "name": "Snare"
     }
    ],
    "food": "D8",
    "silver": "D6"
   }
  ],
  "nicknames": [
   "Forest Fox",
   "Wolfbane",
   "Pathfinder",
   "The Weathered",
   "Bloodhunger",
   "Shadowbolt"
  ]
 },
 {
  "id": "knight",
  "name": "Knight",
  "page": 18,
  "roll": 5,
  "keyAttribute": "STR",
  "text": "Warriors sworn to a higher power — an order, a liege or a god — whose oath shapes every thought and deed. Some ride with an order; others guard a single person or place alone.",
  "skills": [
   "Beast Lore",
   "Hammers",
   "Myths & Legends",
   "Performance",
   "Persuasion",
   "Riding",
   "Spears",
   "Swords"
  ],
  "heroicAbilities": [
   "Guardian"
  ],
  "kits": [
   {
    "items": [
     {
      "choice": [
       "Broadsword",
       "Morningstar"
      ]
     },
     {
      "name": "Shield, Small"
     },
     {
      "name": "Plate Armor"
     },
     {
      "name": "Great Helm"
     },
     {
      "name": "Torch"
     },
     {
      "name": "Flint & Tinder"
     }
    ],
    "food": "D6",
    "silver": "D12"
   },
   {
    "items": [
     {
      "choice": [
       "Flail",
       "Warhammer, Light"
      ]
     },
     {
      "name": "Shield, Small"
     },
     {
      "name": "Chainmail"
     },
     {
      "name": "Open Helmet"
     },
     {
      "name": "Torch"
     },
     {
      "name": "Flint & Tinder"
     }
    ],
    "food": "D6",
    "silver": "D12"
   },
   {
    "items": [
     {
      "name": "Short Sword"
     },
     {
      "name": "Lance"
     },
     {
      "name": "Shield, Small"
     },
     {
      "name": "Chainmail"
     },
     {
      "name": "Open Helmet"
     },
     {
      "name": "Combat Trained Horse"
     }
    ],
    "food": "D6",
    "silver": "D12"
   }
  ],
  "nicknames": [
   "Dragonheart",
   "Goldlance",
   "Griffinclaw",
   "The Noble",
   "Gleamhelm",
   "Mourningcloak"
  ]
 },
 {
  "id": "mage",
  "name": "Mage",
  "page": 19,
  "roll": 6,
  "keyAttribute": "WIL",
  "text": "Headstrong individualists who command the old forces woven through the world. Animists borrow power from nature's spirits, elementalists work the four elements, and mentalists draw magic from a disciplined mind.",
  "skills": [],
  "schoolSkills": {
   "Animism": [
    "Animism",
    "Beast Lore",
    "Bushcraft",
    "Evade",
    "Healing",
    "Hunting & Fishing",
    "Sneaking",
    "Staves"
   ],
   "Elementalism": [
    "Elementalism",
    "Awareness",
    "Evade",
    "Healing",
    "Languages",
    "Myths & Legends",
    "Spot Hidden",
    "Staves"
   ],
   "Mentalism": [
    "Mentalism",
    "Acrobatics",
    "Awareness",
    "Brawling",
    "Evade",
    "Healing",
    "Languages",
    "Myths & Legends"
   ]
  },
  "heroicAbilities": [],
  "mage": true,
  "magic": {
   "startingSpells": 3,
   "startingRank": 1,
   "startingTricks": 3,
   "from": "your school or General Magic",
   "grimoire": true
  },
  "kits": [
   {
    "items": [
     {
      "name": "Staff"
     },
     {
      "name": "Orbuculum"
     },
     {
      "name": "Grimoire"
     },
     {
      "name": "Torch"
     },
     {
      "name": "Flint & Tinder"
     }
    ],
    "food": "D6",
    "silver": "D8"
   },
   {
    "items": [
     {
      "name": "Knife"
     },
     {
      "name": "Wand"
     },
     {
      "name": "Grimoire"
     },
     {
      "name": "Torch"
     },
     {
      "name": "Flint & Tinder"
     }
    ],
    "food": "D6",
    "silver": "D8"
   },
   {
    "items": [
     {
      "name": "Amulet"
     },
     {
      "name": "Grimoire"
     },
     {
      "name": "Sleeping Fur"
     },
     {
      "name": "Torch"
     },
     {
      "name": "Flint & Tinder"
     }
    ],
    "food": "D6",
    "silver": "D8"
   }
  ],
  "nicknames": [
   "Rootheart",
   "Crookback",
   "Graycape",
   "Stormhand",
   "Stafflimper",
   "Shadowbringer"
  ]
 },
 {
  "id": "mariner",
  "name": "Mariner",
  "page": 20,
  "roll": 7,
  "keyAttribute": "AGL",
  "text": "Sailors of seas, lakes and rivers bound to a particular stretch of water by love, respect and dread — pirates, ferrymen, whalers, explorers and trading captains alike.",
  "skills": [
   "Acrobatics",
   "Awareness",
   "Hunting & Fishing",
   "Knives",
   "Languages",
   "Seamanship",
   "Swimming",
   "Swords"
  ],
  "heroicAbilities": [
   "Sea Legs"
  ],
  "kits": [
   {
    "items": [
     {
      "name": "Dagger"
     },
     {
      "name": "Short Bow"
     },
     {
      "name": "Quiver of Arrows, Iron Head"
     },
     {
      "name": "Rope, Hemp"
     },
     {
      "name": "Grappling Hook"
     },
     {
      "name": "Sleeping Fur"
     },
     {
      "name": "Torch"
     },
     {
      "name": "Flint & Tinder"
     }
    ],
    "food": "D8",
    "silver": "D10"
   },
   {
    "items": [
     {
      "name": "Scimitar"
     },
     {
      "name": "Leather"
     },
     {
      "name": "Rope, Hemp"
     },
     {
      "name": "Grappling Hook"
     },
     {
      "name": "Torch"
     },
     {
      "name": "Flint & Tinder"
     }
    ],
    "food": "D8",
    "silver": "D10"
   },
   {
    "items": [
     {
      "name": "Trident"
     },
     {
      "name": "Spyglass"
     },
     {
      "name": "Rope, Hemp"
     },
     {
      "name": "Grappling Hook"
     },
     {
      "name": "Torch"
     },
     {
      "name": "Flint & Tinder"
     }
    ],
    "food": "D8",
    "silver": "D10"
   }
  ],
  "nicknames": [
   "Whitewater",
   "Waverider",
   "Foamborn",
   "Saltsplash",
   "Seadog",
   "Stormfarer"
  ]
 },
 {
  "id": "merchant",
  "name": "Merchant",
  "page": 21,
  "roll": 8,
  "keyAttribute": "CHA",
  "text": "Buy cheap, sell dear. Shopkeepers in town or traders travelling with caravans and adventuring companies, always after exotic goods, new customers and saleable relics.",
  "skills": [
   "Awareness",
   "Bartering",
   "Bluffing",
   "Evade",
   "Knives",
   "Persuasion",
   "Sleight of Hand",
   "Spot Hidden"
  ],
  "heroicAbilities": [
   "Treasure Hunter"
  ],
  "kits": [
   {
    "items": [
     {
      "name": "Dagger"
     },
     {
      "name": "Sleeping Fur"
     },
     {
      "name": "Torch"
     },
     {
      "name": "Flint & Tinder"
     },
     {
      "name": "Rope, Hemp"
     },
     {
      "name": "Donkey"
     }
    ],
    "food": "D6",
    "silver": "D12"
   },
   {
    "items": [
     {
      "name": "Knife"
     },
     {
      "name": "Sleeping Fur"
     },
     {
      "name": "Lantern"
     },
     {
      "name": "Lamp Oil"
     },
     {
      "name": "Flint & Tinder"
     },
     {
      "name": "Field Kitchen"
     },
     {
      "name": "Donkey"
     },
     {
      "name": "Cart"
     }
    ],
    "food": "D6",
    "silver": "D12"
   },
   {
    "items": [
     {
      "name": "Dagger"
     },
     {
      "name": "Sleeping Fur"
     },
     {
      "name": "Tent, Large"
     },
     {
      "name": "Oil Lamp"
     },
     {
      "name": "Lamp Oil"
     },
     {
      "name": "Flint & Tinder"
     },
     {
      "name": "Backpack"
     }
    ],
    "food": "D6",
    "silver": "D12"
   }
  ],
  "nicknames": [
   "Silvergrin",
   "Goldtooth",
   "Silktongue",
   "The Lisping and Truthful",
   "Lardbelly",
   "Skinflint"
  ]
 },
 {
  "id": "scholar",
  "name": "Scholar",
  "page": 22,
  "roll": 9,
  "keyAttribute": "INT",
  "text": "Seekers of truth about nature and the hidden history of the world — specialists in monsters, herbs or dead tongues, or generalists who study everything. Often well-versed in old lore and lost scripts.",
  "skills": [
   "Awareness",
   "Beast Lore",
   "Bushcraft",
   "Evade",
   "Healing",
   "Languages",
   "Myths & Legends",
   "Spot Hidden"
  ],
  "heroicAbilities": [
   "Intuition"
  ],
  "kits": [
   {
    "items": [
     {
      "name": "Staff"
     },
     {
      "name": "Notebook"
     },
     {
      "name": "Quill & Ink"
     },
     {
      "name": "Sleeping Fur"
     },
     {
      "name": "Torch"
     },
     {
      "name": "Flint & Tinder"
     }
    ],
    "food": "D6",
    "silver": "D10"
   },
   {
    "items": [
     {
      "name": "Knife"
     },
     {
      "name": "Book",
      "note": "any subject"
     },
     {
      "name": "Sleeping Fur"
     },
     {
      "name": "Oil Lamp"
     },
     {
      "name": "Lamp Oil"
     },
     {
      "name": "Flint & Tinder"
     }
    ],
    "food": "D6",
    "silver": "D10"
   },
   {
    "items": [
     {
      "name": "Short Sword"
     },
     {
      "name": "Bandages (10)"
     },
     {
      "name": "Poison, Sleeping",
      "note": "one dose"
     },
     {
      "name": "Sleeping Fur"
     },
     {
      "name": "Lantern"
     },
     {
      "name": "Lamp Oil"
     },
     {
      "name": "Flint & Tinder"
     }
    ],
    "food": "D6",
    "silver": "D10"
   }
  ],
  "nicknames": [
   "Clearmind",
   "Dustlung",
   "Farsight",
   "The Lettered",
   "The All-Knowing",
   "The Plump and Learned"
  ]
 },
 {
  "id": "thief",
  "name": "Thief",
  "page": 23,
  "roll": 10,
  "keyAttribute": "AGL",
  "text": "Professional acquirers of other people's property — burglars, pickpockets, con artists, highwaymen. Some swear by honour among thieves and their guilds; others work alone or rely on blades.",
  "skills": [
   "Acrobatics",
   "Awareness",
   "Bluffing",
   "Evade",
   "Knives",
   "Sleight of Hand",
   "Sneaking",
   "Spot Hidden"
  ],
  "heroicAbilities": [
   "Backstabbing"
  ],
  "kits": [
   {
    "items": [
     {
      "name": "Dagger"
     },
     {
      "name": "Sling"
     },
     {
      "name": "Rope, Hemp"
     },
     {
      "name": "Grappling Hook"
     },
     {
      "name": "Torch"
     },
     {
      "name": "Flint & Tinder"
     }
    ],
    "food": "D6",
    "silver": "D10"
   },
   {
    "items": [
     {
      "name": "Knife"
     },
     {
      "name": "Lockpicks, Simple"
     },
     {
      "name": "Torch"
     },
     {
      "name": "Flint & Tinder"
     }
    ],
    "food": "D6",
    "silver": "D10"
   },
   {
    "items": [
     {
      "name": "Dagger",
      "qty": 2
     },
     {
      "name": "Marbles"
     },
     {
      "name": "Rope, Hemp"
     },
     {
      "name": "Torch"
     },
     {
      "name": "Flint & Tinder"
     }
    ],
    "food": "D6",
    "silver": "D10"
   }
  ],
  "nicknames": [
   "Halffinger",
   "Blackrat",
   "Redeye",
   "Quickfoot",
   "Doubletongue",
   "Nightstabber"
  ]
 }
];

export const DB_SKILLS: DbSkill[] = [
 {
  "id": "acrobatics",
  "name": "Acrobatics",
  "attribute": "AGL",
  "type": "general",
  "page": 33,
  "text": "Jumping, climbing, balancing and similar feats of body control."
 },
 {
  "id": "awareness",
  "name": "Awareness",
  "attribute": "INT",
  "type": "general",
  "page": 33,
  "text": "Watching and listening for threats — opposed by Sneaking. Passive rolls can't be pushed, and others can't help."
 },
 {
  "id": "bartering",
  "name": "Bartering",
  "attribute": "CHA",
  "type": "general",
  "page": 33,
  "text": "Haggling: success moves the price 20% your way; a Dragon halves or doubles it; a Demon offends the other party and ends the deal."
 },
 {
  "id": "beast-lore",
  "name": "Beast Lore",
  "attribute": "INT",
  "type": "general",
  "page": 33,
  "text": "Identifying animals and monsters and recalling their habits, abilities and weaknesses."
 },
 {
  "id": "bluffing",
  "name": "Bluffing",
  "attribute": "CHA",
  "type": "general",
  "page": 34,
  "text": "Coming up with a convincing lie on the spot. A weak story earns a bane; an impossible one fails outright."
 },
 {
  "id": "bushcraft",
  "name": "Bushcraft",
  "attribute": "INT",
  "type": "general",
  "page": 34,
  "text": "Finding the way through the wild, making camp, cooking and keeping warm."
 },
 {
  "id": "crafting",
  "name": "Crafting",
  "attribute": "STR",
  "type": "general",
  "page": 34,
  "text": "Repairing and making gear — usually a shift of work with the right tools."
 },
 {
  "id": "evade",
  "name": "Evade",
  "attribute": "AGL",
  "type": "general",
  "page": 34,
  "text": "Dodging attacks and getting away from a fight."
 },
 {
  "id": "healing",
  "name": "Healing",
  "attribute": "INT",
  "type": "general",
  "page": 34,
  "text": "Saving the dying and tending wounds."
 },
 {
  "id": "hunting-fishing",
  "name": "Hunting & Fishing",
  "attribute": "AGL",
  "type": "general",
  "page": 34,
  "text": "Tracking game and catching food in the wild."
 },
 {
  "id": "languages",
  "name": "Languages",
  "attribute": "INT",
  "type": "general",
  "page": 34,
  "text": "Understanding foreign and ancient tongues. Everyone speaks the common tongue; non-human kin also know their own language."
 },
 {
  "id": "myths-legends",
  "name": "Myths & Legends",
  "attribute": "INT",
  "type": "general",
  "page": 34,
  "text": "Remembering old stories, far-off lands and links to the past."
 },
 {
  "id": "performance",
  "name": "Performance",
  "attribute": "CHA",
  "type": "general",
  "page": 34,
  "text": "Singing, reciting, joking — entertaining a crowd."
 },
 {
  "id": "persuasion",
  "name": "Persuasion",
  "attribute": "CHA",
  "type": "general",
  "page": 34,
  "text": "Winning people over by charm, threats or reason. Asking for something costly makes it opposed by the target's WIL. Monsters can't be persuaded unless noted."
 },
 {
  "id": "riding",
  "name": "Riding",
  "attribute": "AGL",
  "type": "general",
  "page": 34,
  "text": "Advanced manoeuvres on horseback; special rules apply in combat."
 },
 {
  "id": "seamanship",
  "name": "Seamanship",
  "attribute": "INT",
  "type": "general",
  "page": 34,
  "text": "Steering a vessel in hard conditions, and navigation."
 },
 {
  "id": "sleight-of-hand",
  "name": "Sleight of Hand",
  "attribute": "AGL",
  "type": "general",
  "page": 34,
  "text": "Stealing unnoticed, picking locks and other fiddly handwork."
 },
 {
  "id": "sneaking",
  "name": "Sneaking",
  "attribute": "AGL",
  "type": "general",
  "page": 34,
  "text": "Moving unseen. Opposed by Awareness when someone is searching. In a group, one failure gives everyone away."
 },
 {
  "id": "spot-hidden",
  "name": "Spot Hidden",
  "attribute": "INT",
  "type": "general",
  "page": 35,
  "text": "Searching for something concealed — about a stretch per search, one try per place."
 },
 {
  "id": "swimming",
  "name": "Swimming",
  "attribute": "AGL",
  "type": "general",
  "page": 35,
  "text": "Harder swimming and diving; see the swimming and drowning rules."
 },
 {
  "id": "axes",
  "name": "Axes",
  "attribute": "STR",
  "type": "weapon",
  "page": 35,
  "text": "Fighting with axes of all kinds, including throwing them."
 },
 {
  "id": "bows",
  "name": "Bows",
  "attribute": "AGL",
  "type": "weapon",
  "page": 35,
  "text": "Shooting bows of every kind except crossbows."
 },
 {
  "id": "brawling",
  "name": "Brawling",
  "attribute": "STR",
  "type": "weapon",
  "page": 35,
  "text": "Unarmed fighting with fists, feet, teeth or claws."
 },
 {
  "id": "crossbows",
  "name": "Crossbows",
  "attribute": "AGL",
  "type": "weapon",
  "page": 35,
  "text": "Shooting crossbows of all kinds."
 },
 {
  "id": "hammers",
  "name": "Hammers",
  "attribute": "STR",
  "type": "weapon",
  "page": 35,
  "text": "Warhammers and other blunt weapons such as clubs and maces."
 },
 {
  "id": "knives",
  "name": "Knives",
  "attribute": "AGL",
  "type": "weapon",
  "page": 35,
  "text": "Knives and daggers, including throwing them."
 },
 {
  "id": "slings",
  "name": "Slings",
  "attribute": "AGL",
  "type": "weapon",
  "page": 35,
  "text": "Attacking with a sling."
 },
 {
  "id": "spears",
  "name": "Spears",
  "attribute": "STR",
  "type": "weapon",
  "page": 35,
  "text": "Spears and tridents, thrown or held — and lances."
 },
 {
  "id": "staves",
  "name": "Staves",
  "attribute": "AGL",
  "type": "weapon",
  "page": 35,
  "text": "Fighting with a staff."
 },
 {
  "id": "swords",
  "name": "Swords",
  "attribute": "STR",
  "type": "weapon",
  "page": 35,
  "text": "All kinds of swords."
 },
 {
  "id": "animism",
  "name": "Animism",
  "attribute": "INT",
  "type": "secondary",
  "school": true,
  "page": 57,
  "text": "Magic lent by the spirits that dwell in all living things and places."
 },
 {
  "id": "elementalism",
  "name": "Elementalism",
  "attribute": "INT",
  "type": "secondary",
  "school": true,
  "page": 57,
  "text": "Magic of the four elements — wind, water, earth and fire."
 },
 {
  "id": "mentalism",
  "name": "Mentalism",
  "attribute": "INT",
  "type": "secondary",
  "school": true,
  "page": 57,
  "text": "Magic drawn from within through discipline of mind and body."
 }
];

export const DB_SKILL_GROUPS = {
 "melee": [
  "Axes",
  "Brawling",
  "Hammers",
  "Knives",
  "Spears",
  "Staves",
  "Swords"
 ],
 "strMelee": [
  "Axes",
  "Brawling",
  "Hammers",
  "Spears",
  "Swords"
 ],
 "weapon": [
  "Axes",
  "Bows",
  "Brawling",
  "Crossbows",
  "Hammers",
  "Knives",
  "Slings",
  "Spears",
  "Staves",
  "Swords"
 ],
 "magic": [
  "Animism",
  "Elementalism",
  "Mentalism"
 ]
};

export const DB_SPELLS: DbSpell[] = [
 {
  "id": "dispel",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Dispel",
  "school": "General",
  "rank": 1,
  "prerequisite": "Any school of magic",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Instant",
  "page": 61,
  "text": "End an ongoing spell whose power level is equal to or lower than this one. The GM or adventure may let it end other magical effects too."
 },
 {
  "id": "protector",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Protector",
  "school": "General",
  "rank": 1,
  "prerequisite": "Any school of magic",
  "requirements": [
   "gesture",
   "ingredient"
  ],
  "requirementDetail": "something to draw with",
  "castingTime": "action",
  "range": "Touch",
  "duration": "Shift",
  "page": 62,
  "self": true,
  "text": "Ward a person (yourself included) or a human-sized place against magic: spells cast at it lose power levels equal to this spell's power level. Against a monster's magical attack, each power level removes one damage die."
 },
 {
  "id": "magic-shield",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Magic Shield",
  "school": "General",
  "rank": 2,
  "prerequisite": "Protector or Dispel",
  "requirements": [
   "gesture"
  ],
  "castingTime": "reaction",
  "range": "10 meters",
  "duration": "Instant",
  "page": 62,
  "text": "Cast after an enemy mage's successful roll but before damage or effects: their spell loses power levels equal to this spell's; at zero or less it fizzles. Against a monster's magical attack, each power level removes one damage die. Doesn't use up your action."
 },
 {
  "id": "transfer",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Transfer",
  "school": "General",
  "rank": 3,
  "prerequisite": "Magic Shield",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "Touch",
  "duration": "Instant",
  "page": 62,
  "text": "Drain WP from a humanoid or give yours to someone — up to twice the casting cost (4 / 8 / 12 WP by power level). The casting WP is lost; nobody goes above max or below zero. A bane if the subject resists."
 },
 {
  "id": "magic-seal",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Magic Seal",
  "school": "General",
  "rank": 4,
  "prerequisite": "Transfer",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "shift",
  "range": "Touch",
  "duration": "Permanent",
  "page": 62,
  "text": "Bind a spell into an object at this spell's power level (power level 1 for a trick) and decide how it's triggered; whoever triggers it pays its WP. Using it dissolves the seal unless combined with Permanence. Can be paired with Charge."
 },
 {
  "id": "charge",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Charge",
  "school": "General",
  "rank": 4,
  "prerequisite": "Transfer",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "stretch",
  "range": "Touch",
  "duration": "Shift",
  "page": 62,
  "text": "Pour up to 10 WP per power level into an object that anyone touching it can draw on. The stored WP fade after a shift unless made permanent."
 },
 {
  "id": "permanence",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Permanence",
  "school": "General",
  "rank": 5,
  "prerequisite": "Magic Seal",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "shift",
  "range": "Touch",
  "duration": "Permanent",
  "page": 62,
  "text": "Make another spell (not an instant one) permanent; its power level must match. Costs you 1 WIL permanently (max WP drops by 1). With Magic Seal, the bound spell can be used any number of times."
 },
 {
  "id": "animal-whisperer",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Animal Whisperer",
  "school": "Animism",
  "rank": 1,
  "prerequisite": "Animism",
  "requirements": [
   "word"
  ],
  "castingTime": "stretch",
  "range": "2 meters",
  "duration": "Instant",
  "page": 63,
  "text": "Speak with a bird or mammal and ask as many questions as the power level. Animals never lie, but they see the world differently and their answers are hard to read."
 },
 {
  "id": "banish",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Banish",
  "school": "Animism",
  "rank": 1,
  "prerequisite": "Animism",
  "requirements": [
   "word",
   "gesture",
   "focus"
  ],
  "requirementDetail": "holy symbol",
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Instant",
  "page": 63,
  "damage": {
   "base": "2D8",
   "perLevel": "D8"
  },
  "target": "Demons and undead only",
  "ignoresArmor": true,
  "text": "Strike a demon or risen undead for 2D8 damage, +D8 per extra power level. Armor and natural armor don't help, and it can't be dodged or parried."
 },
 {
  "id": "ensnaring-roots",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Ensnaring Roots",
  "school": "Animism",
  "rank": 1,
  "prerequisite": "Animism",
  "requirements": [
   "gesture",
   "ingredient"
  ],
  "requirementDetail": "branches or roots nearby",
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Shift",
  "page": 64,
  "text": "Roots and branches hold the victim in place. Breaking free takes an Evade roll (an action, once per round; others may help) — with a boon at power level 1, normal at 2, with a bane at 3. No effect on monsters."
 },
 {
  "id": "lightning-flash",
  "powerLevels": true,
  "dodge": true,
  "parry": true,
  "name": "Lightning Flash",
  "school": "Animism",
  "rank": 1,
  "prerequisite": "Animism",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "30 meters",
  "duration": "Instant",
  "page": 64,
  "damage": {
   "base": "2D6",
   "perLevel": "D6",
   "chain": [
    "2D4"
   ]
  },
  "metalArmorNoEffect": true,
  "indoorsDoubleWp": true,
  "text": "Lightning hits the target for 2D6, then jumps to a random target within 2 m for 2D4; each extra power level adds a die to both. Metal armor doesn't protect; it can be dodged or parried like a ranged attack (stopping the chain). Costs double WP indoors."
 },
 {
  "id": "treat-wound",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Treat Wound",
  "school": "Animism",
  "rank": 1,
  "prerequisite": "Animism",
  "requirements": [
   "word"
  ],
  "castingTime": "action",
  "range": "Touch",
  "duration": "Instant",
  "page": 64,
  "self": true,
  "healing": {
   "base": "2D6",
   "perLevel": "D6"
  },
  "text": "Heal a living creature (or yourself) for 2D6 HP, +D6 per extra power level."
 },
 {
  "id": "engulfing-forest",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Engulfing Forest",
  "school": "Animism",
  "rank": 2,
  "prerequisite": "Ensnaring Roots",
  "requirements": [
   "gesture",
   "ingredient"
  ],
  "requirementDetail": "branches or roots nearby",
  "castingTime": "action",
  "range": "10 meters (sphere)",
  "duration": "Shift",
  "page": 64,
  "text": "Thorny thickets and roots erupt across the area, making it rough terrain and ensnaring everyone in it except you (not monsters). Breaking free as Ensnaring Roots; unensnared people can help."
 },
 {
  "id": "lightning-bolt",
  "powerLevels": true,
  "dodge": true,
  "parry": true,
  "name": "Lightning Bolt",
  "school": "Animism",
  "rank": 2,
  "prerequisite": "Lightning Flash",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "40 meters",
  "duration": "Instant",
  "page": 64,
  "damage": {
   "base": "2D8",
   "perLevel": "D8",
   "chain": [
    "2D6",
    "2D4"
   ]
  },
  "metalArmorNoEffect": true,
  "indoorsDoubleWp": true,
  "text": "A great bolt deals 2D8, then chains to a second target within 2 m for 2D6 and a third for 2D4; each extra power level adds a die to each. As Lightning Flash for armor, dodging and indoors cost."
 },
 {
  "id": "heal-wound",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Heal Wound",
  "school": "Animism",
  "rank": 2,
  "prerequisite": "Treat Wound",
  "requirements": [
   "word"
  ],
  "castingTime": "action",
  "range": "Touch",
  "duration": "Instant",
  "page": 64,
  "self": true,
  "healing": {
   "base": "2D8",
   "perLevel": "D8"
  },
  "text": "Heal 2D8 HP (+D8 per extra power level) and one non-permanent severe injury. Can target yourself."
 },
 {
  "id": "purge",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Purge",
  "school": "Animism",
  "rank": 2,
  "prerequisite": "Banish",
  "requirements": [
   "word",
   "gesture",
   "focus"
  ],
  "requirementDetail": "holy symbol",
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Instant",
  "page": 64,
  "damage": {
   "base": "2D10",
   "perLevel": "D10"
  },
  "target": "Demons and undead only",
  "ignoresArmor": true,
  "text": "Exorcise a demon or undead for 2D10 damage, +D10 per extra power level. Ignores armor; can't be dodged or parried."
 },
 {
  "id": "sleep",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Sleep",
  "school": "Animism",
  "rank": 2,
  "prerequisite": "Treat Wound",
  "requirements": [
   "word"
  ],
  "castingTime": "action",
  "range": "Touch",
  "duration": "Instant",
  "page": 65,
  "text": "The target must pass a WIL roll or fall into a deep sleep for a stretch (still Dazed on a success). Boon at power level 1, normal at 2, bane at 3. NPCs roll against max WP (−2 per Focused) or 10. Damage wakes them. Living creatures only, not monsters."
 },
 {
  "id": "restoration",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Restoration",
  "school": "Animism",
  "rank": 3,
  "prerequisite": "Heal Wound",
  "requirements": [
   "word"
  ],
  "castingTime": "action",
  "range": "Touch",
  "duration": "Instant",
  "page": 65,
  "self": true,
  "healing": {
   "base": "2D10",
   "perLevel": "D10"
  },
  "text": "Heal 2D10 HP (+D10 per extra power level) and any one severe injury. Can target yourself."
 },
 {
  "id": "resurrection",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Resurrection",
  "school": "Animism",
  "rank": 3,
  "prerequisite": "Heal Wound",
  "requirements": [
   "word",
   "gesture",
   "ingredient"
  ],
  "requirementDetail": "corpse",
  "castingTime": "shift",
  "range": "Touch",
  "duration": "Permanent",
  "page": 65,
  "text": "Bring a dead person truly back to life. Power level 1 within the same shift, 2 within a day, 3 within a week — after that it's too late. One attempt only. Costs you 1 WIL permanently; the returned lose D3 levels in every CHA-based skill (minimum 3)."
 },
 {
  "id": "thunderbolt",
  "powerLevels": true,
  "dodge": true,
  "parry": true,
  "name": "Thunderbolt",
  "school": "Animism",
  "rank": 3,
  "prerequisite": "Lightning Bolt",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "50 meters",
  "duration": "Instant",
  "page": 65,
  "damage": {
   "base": "2D10",
   "perLevel": "D10",
   "chain": [
    "2D8",
    "2D6",
    "2D4"
   ]
  },
  "metalArmorNoEffect": true,
  "indoorsDoubleWp": true,
  "text": "A mighty strike for 2D10 that leaps to up to three more targets within 2 m of each other (2D8, 2D6, 2D4); each extra power level adds a die to each. As Lightning Flash for armor, dodging and indoors cost."
 },
 {
  "id": "fireball",
  "powerLevels": true,
  "dodge": true,
  "parry": true,
  "name": "Fireball",
  "school": "Elementalism",
  "rank": 1,
  "prerequisite": "Elementalism",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Instant",
  "page": 66,
  "damage": {
   "base": "2D6",
   "perLevel": "D6"
  },
  "extraTargetPerLevel": true,
  "element": "fire",
  "text": "Hurl a fireball for 2D6 damage that sets flammables alight. Each extra power level adds D6 or sends another fireball at a second target in range. Dodge or parry as a ranged attack."
 },
 {
  "id": "frost",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Frost",
  "school": "Elementalism",
  "rank": 1,
  "prerequisite": "Elementalism",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "4 meters (sphere)",
  "duration": "Stretch",
  "page": 66,
  "text": "A wave of cold puts out natural fires; every living creature in the area loses D6 HP and D6 WP and becomes cold (no HP/WP healing until warm). Humanoids (not monsters) are frozen in place, unable to move or act, until they pass a STR roll on their turn. Water freezes. +4 m range per extra power level."
 },
 {
  "id": "gust-of-wind",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Gust of Wind",
  "school": "Elementalism",
  "rank": 1,
  "prerequisite": "Elementalism",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "10 meters (cone)",
  "duration": "Instant",
  "page": 66,
  "damage": {
   "base": "2D4",
   "perLevel": "D4"
  },
  "text": "Blow loose objects and up-to-human-sized creatures 2D4 m away, dealing the same in bludgeoning damage (2D6 against a swarm). +1 die per extra power level. No effect on Large or Huge monsters."
 },
 {
  "id": "pillar",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Pillar",
  "school": "Elementalism",
  "rank": 1,
  "prerequisite": "Elementalism",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Shift",
  "page": 66,
  "text": "Raise a stone pillar 3 m high and 1 m wide; anyone standing there needs an Acrobatics roll to stay on top (or takes 2D6 bludgeoning under a low ceiling). Each extra power level adds 3 m of height."
 },
 {
  "id": "shatter",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Shatter",
  "school": "Elementalism",
  "rank": 1,
  "prerequisite": "Elementalism",
  "requirements": [
   "word"
  ],
  "castingTime": "action",
  "range": "Touch",
  "duration": "Instant",
  "page": 66,
  "damage": {
   "base": "2D10",
   "perLevel": "D10"
  },
  "target": "Inanimate, non-magical objects",
  "ignoresArmor": true,
  "text": "Break the bonds holding matter together: 2D10 damage to a non-magical object, ignoring armor, +D10 per extra power level."
 },
 {
  "id": "fire-blast",
  "powerLevels": true,
  "dodge": true,
  "parry": true,
  "name": "Fire Blast",
  "school": "Elementalism",
  "rank": 2,
  "prerequisite": "Fireball",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "30 meters",
  "duration": "Instant",
  "page": 66,
  "damage": {
   "base": "2D8",
   "perLevel": "D8"
  },
  "extraTargetPerLevel": true,
  "element": "fire",
  "text": "A great blast of fire for 2D8 that sets flammables alight; +D8 or another blast per extra power level. Dodge or parry as a ranged attack."
 },
 {
  "id": "stone-shield",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Stone Shield",
  "school": "Elementalism",
  "rank": 2,
  "prerequisite": "Pillar",
  "requirements": [
   "gesture",
   "ingredient"
  ],
  "requirementDetail": "pebbles",
  "castingTime": "reaction",
  "range": "Personal",
  "duration": "Instant",
  "page": 66,
  "text": "Summon a shield of stone that reduces an incoming attack's damage by 2D6, +D6 per extra power level. Cast after the hit roll but before damage; stacks with armor."
 },
 {
  "id": "stonewall",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Stonewall",
  "school": "Elementalism",
  "rank": 2,
  "prerequisite": "Pillar",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Shift",
  "page": 67,
  "text": "Raise a wall 1 m thick, 2 m high and 3 m wide; each extra power level adds another section. Anyone on the spot needs an Acrobatics roll (or takes 2D6 bludgeoning under a low ceiling)."
 },
 {
  "id": "tidal-wave",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Tidal Wave",
  "school": "Elementalism",
  "rank": 2,
  "prerequisite": "Frost",
  "requirements": [
   "word",
   "gesture",
   "ingredient"
  ],
  "requirementDetail": "a water source",
  "castingTime": "action",
  "range": "20 meters (cone)",
  "duration": "Instant",
  "page": 67,
  "damage": {
   "base": "2D6",
   "perLevel": "D6"
  },
  "text": "A wave rises from a water source in range (the cone starts there), sweeping loose objects and creatures 2D6 m away and dealing the same bludgeoning damage; +1 die per extra power level."
 },
 {
  "id": "whirlwind",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Whirlwind",
  "school": "Elementalism",
  "rank": 2,
  "prerequisite": "Gust of Wind",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "4 meters (sphere)",
  "duration": "Instant",
  "page": 67,
  "damage": {
   "base": "2D4",
   "perLevel": "D4"
  },
  "text": "A whirlwind around you hurls up-to-human-sized objects and creatures 2D4 m, dealing the same bludgeoning damage and knocking them prone. Each extra power level adds 4 m of range and D4 damage. Take a bane to place one person where you like and choose whether they're hurt or prone."
 },
 {
  "id": "firebird",
  "powerLevels": true,
  "dodge": true,
  "parry": true,
  "name": "Firebird",
  "school": "Elementalism",
  "rank": 3,
  "prerequisite": "Fire Blast",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "40 meters",
  "duration": "Instant",
  "page": 67,
  "damage": {
   "base": "2D10",
   "perLevel": "D10"
  },
  "extraTargetPerLevel": true,
  "element": "fire",
  "text": "A bird of flame strikes for 2D10 and sets flammables alight; +D10 or another firebird per extra power level. Dodge or parry as a ranged attack."
 },
 {
  "id": "firestorm",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Firestorm",
  "school": "Elementalism",
  "rank": 3,
  "prerequisite": "Fire Blast and Whirlwind",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "4 meters (sphere)",
  "duration": "Instant",
  "page": 68,
  "damage": {
   "base": "2D6",
   "perLevel": "D6"
  },
  "element": "fire",
  "text": "A storm of fire around you deals 2D6 to everything in range; each extra power level adds 4 m of range and D6 damage."
 },
 {
  "id": "gnome",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Gnome",
  "school": "Elementalism",
  "rank": 3,
  "prerequisite": "Stonewall",
  "requirements": [
   "word",
   "gesture",
   "ingredient"
  ],
  "requirementDetail": "stone or soil",
  "castingTime": "stretch",
  "range": "4 meters",
  "duration": "Stretch",
  "page": 68,
  "summon": "Gnome",
  "text": "Summon an earth elemental of grey-brown clay that obeys your commands (free action), acts on its own initiative and must stay in your sight. Counts as a monster."
 },
 {
  "id": "salamander",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Salamander",
  "school": "Elementalism",
  "rank": 3,
  "prerequisite": "Fire Blast",
  "requirements": [
   "word",
   "gesture",
   "ingredient"
  ],
  "requirementDetail": "an open fire",
  "castingTime": "stretch",
  "range": "4 meters",
  "duration": "Stretch",
  "page": 68,
  "summon": "Salamander",
  "text": "Summon a fire elemental shaped like a burning lizard that obeys you (free action), acts on its own initiative and must stay in sight. Counts as a monster."
 },
 {
  "id": "sylph",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Sylph",
  "school": "Elementalism",
  "rank": 3,
  "prerequisite": "Whirlwind",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "stretch",
  "range": "4 meters",
  "duration": "Stretch",
  "page": 68,
  "summon": "Sylph",
  "text": "Summon a wind elemental like a bird-shaped storm cloud that obeys you (free action), acts on its own initiative and must stay in sight. Counts as a monster."
 },
 {
  "id": "undine",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Undine",
  "school": "Elementalism",
  "rank": 3,
  "prerequisite": "Tidal Wave",
  "requirements": [
   "word",
   "gesture",
   "ingredient"
  ],
  "requirementDetail": "water",
  "castingTime": "stretch",
  "range": "4 meters",
  "duration": "Stretch",
  "page": 69,
  "summon": "Undine",
  "text": "Summon a water elemental — a wave crested with a woman's shape — that obeys you (free action), acts on its own initiative and must stay in sight. Counts as a monster."
 },
 {
  "id": "farsight",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Farsight",
  "school": "Mentalism",
  "rank": 1,
  "prerequisite": "Mentalism",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "1 kilometer",
  "duration": "Concentration",
  "page": 69,
  "text": "See and hear a place you can see or have visited as if you were there. Range ×10 per extra power level (10 km, 100 km). Not into other dimensions."
 },
 {
  "id": "levitate",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Levitate",
  "school": "Mentalism",
  "rank": 1,
  "prerequisite": "Mentalism",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "6 meters",
  "duration": "Instant",
  "page": 69,
  "text": "Float yourself or another up-to-human-sized person or object up to 6 m in any direction, then set it down gently or drop it. Each extra power level adds 2 m or one more target. A bane against the unwilling."
 },
 {
  "id": "longstrider",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Longstrider",
  "school": "Mentalism",
  "rank": 1,
  "prerequisite": "Mentalism",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "Touch",
  "duration": "Stretch",
  "page": 69,
  "self": true,
  "text": "Double the target's Movement for the duration (yourself included); each extra power level adds another target."
 },
 {
  "id": "power-fist",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Power Fist",
  "school": "Mentalism",
  "rank": 1,
  "prerequisite": "Mentalism",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "Personal",
  "duration": "Stretch",
  "page": 70,
  "buff": {
   "unarmedDamage": "D6 per power level"
  },
  "text": "Your unarmed attacks deal +D6 damage per power level."
 },
 {
  "id": "stone-skin",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Stone Skin",
  "school": "Mentalism",
  "rank": 1,
  "prerequisite": "Mentalism",
  "requirements": [
   "word",
   "gesture",
   "ingredient"
  ],
  "requirementDetail": "stone",
  "castingTime": "action",
  "range": "Touch",
  "duration": "Stretch",
  "page": 70,
  "buff": {
   "armor": "4 + 2 per extra power level"
  },
  "text": "The target's skin turns hard and grey: armor rating 4, +2 per extra power level. With worn armor only the higher rating counts."
 },
 {
  "id": "divination",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Divination",
  "school": "Mentalism",
  "rank": 2,
  "prerequisite": "Farsight",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "100 meters",
  "duration": "Instant",
  "page": 70,
  "text": "Name a kind of item, substance, creature or phenomenon and learn the direction to the nearest one in range. Range doubles per extra power level (200 m, 400 m)."
 },
 {
  "id": "enchant-weapon",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Enchant Weapon",
  "school": "Mentalism",
  "rank": 2,
  "prerequisite": "Power Fist",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "Touch",
  "duration": "Stretch",
  "page": 70,
  "buff": {
   "dragonRange": "1–2, +1 per extra power level"
  },
  "text": "A weapon counts as magical, and rolls of 1–2 count as a Dragon when attacking or parrying with it (1–3 at power level 2, 1–4 at 3)."
 },
 {
  "id": "mental-strike",
  "powerLevels": true,
  "dodge": true,
  "parry": true,
  "name": "Mental Strike",
  "school": "Mentalism",
  "rank": 2,
  "prerequisite": "Power Fist",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Instant",
  "page": 70,
  "damage": {
   "base": "2D6",
   "perLevel": "D6"
  },
  "text": "Project your will as a physical blow that hurls the victim 2D6 m away and deals the same damage; +D6 per extra power level. Dodge or parry as a ranged attack."
 },
 {
  "id": "scrying",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Scrying",
  "school": "Mentalism",
  "rank": 2,
  "prerequisite": "Farsight",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Concentration",
  "page": 70,
  "text": "Glimpse past events in the place you're standing — up to a day back at power level 1, a year at 2, centuries at 3. Visions are fragmentary; the GM decides what you see."
 },
 {
  "id": "telepathy",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Telepathy",
  "school": "Mentalism",
  "rank": 2,
  "prerequisite": "Farsight",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Concentration",
  "page": 70,
  "text": "Read another person's surface thoughts or send them your own. Deeper or older memories need higher power levels; the GM decides."
 },
 {
  "id": "dominate",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Dominate",
  "school": "Mentalism",
  "rank": 3,
  "prerequisite": "Telepathy",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Instant",
  "page": 70,
  "text": "Opposed roll against the victim's WIL (NPCs: max WP −2 per Focused, or 10) — bane at power level 1, normal at 2, boon at 3. If you win, the victim immediately moves and takes an action of your choice (nothing costing WP) and loses their next turn. No effect on monsters."
 },
 {
  "id": "flight",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Flight",
  "school": "Mentalism",
  "rank": 3,
  "prerequisite": "Levitate",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "Touch",
  "duration": "Stretch",
  "page": 71,
  "self": true,
  "text": "You or another up-to-human-sized creature can fly freely, ignoring obstacles and terrain, at Movement 6 — 12 at power level 2, 24 at 3."
 },
 {
  "id": "teleport",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Teleport",
  "school": "Mentalism",
  "rank": 3,
  "prerequisite": "Farsight",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "Touch",
  "duration": "Instant",
  "page": 71,
  "text": "Teleport yourself up to 100 m to a place you can see or have visited. Each extra power level lets you bring another human-sized creature you touch, or doubles the range. Not between dimensions."
 }
];

export const DB_SUMMONS: DbSummon[] = [
 {
  "id": "gnome",
  "name": "Gnome",
  "spell": "Gnome",
  "movement": 8,
  "hpPerLevel": 5,
  "armor": 4,
  "attack": {
   "name": "Fists of stone",
   "damage": "D6 per power level",
   "type": "bludgeoning",
   "note": "Hits automatically in melee; can be dodged or parried."
  },
  "abilities": [
   "Can cast Pillar at its own power level using the mage's WP."
  ],
  "resistances": [],
  "immunities": []
 },
 {
  "id": "salamander",
  "name": "Salamander",
  "spell": "Salamander",
  "movement": 12,
  "hpPerLevel": 5,
  "armor": null,
  "attack": {
   "name": "Flaming grip",
   "damage": "D6 per power level",
   "type": "fire",
   "note": "Hits automatically in melee; can be dodged; armor doesn't help."
  },
  "abilities": [
   "Can cast Fire Blast at its own power level using the mage's WP."
  ],
  "resistances": [
   "Piercing damage halved"
  ],
  "immunities": [
   "Fire, including magical fire"
  ]
 },
 {
  "id": "sylph",
  "name": "Sylph",
  "spell": "Sylph",
  "movement": 24,
  "hpPerLevel": 5,
  "armor": null,
  "attack": {
   "name": "Howling winds",
   "damage": "D4 per power level",
   "type": "bludgeoning",
   "note": "Hits automatically in melee; can be dodged; hurls the victim D4 m per power level and deals the same damage."
  },
  "abilities": [
   "Can cast Gust of Wind at its own power level using the mage's WP."
  ],
  "resistances": [
   "Piercing damage halved"
  ],
  "immunities": []
 },
 {
  "id": "undine",
  "name": "Undine",
  "spell": "Undine",
  "movement": 12,
  "hpPerLevel": 5,
  "armor": null,
  "attack": {
   "name": "Wet embrace",
   "damage": "D6 per power level",
   "type": "bludgeoning",
   "note": "Hits automatically in melee; can be dodged; armor doesn't help."
  },
  "abilities": [
   "Can cast Tidal Wave at its own power level using the mage's WP."
  ],
  "resistances": [
   "Piercing damage halved"
  ],
  "immunities": []
 }
];

export const DB_SUPPLY = {
 "Common": "Available in any village or marketplace.",
 "Uncommon": "Usually only from the artisan who makes it — not in every village.",
 "Rare": "Generally has to be ordered specially from an artisan.",
 "Unique": "Only from treasure troves or whoever found it."
};

export const DB_TABLES = {
 "kinDie": "D12",
 "professionDie": "D10",
 "creationSteps": [
  "Choose or roll your kin",
  "Note your innate ability",
  "Choose or roll your profession",
  "Choose or roll your age",
  "Choose or roll your name",
  "Roll your attributes",
  "Calculate your derived ratings",
  "Choose your trained skills",
  "Note your heroic ability",
  "Choose or roll a weakness (optional)",
  "Choose or roll your gear",
  "Choose or roll a memento (optional)",
  "Choose or roll your appearance"
 ],
 "attributeRoll": {
  "dice": "4D6",
  "drop": "lowest",
  "min": 3,
  "max": 18,
  "swapTwo": true
 },
 "ages": [
  {
   "id": "young",
   "name": "Young",
   "roll": [
    1,
    3
   ],
   "trainedSkills": 8,
   "professionSkills": 6,
   "freeSkills": 2,
   "mods": {
    "AGL": 1,
    "CON": 1
   }
  },
  {
   "id": "adult",
   "name": "Adult",
   "roll": [
    4,
    5
   ],
   "trainedSkills": 10,
   "professionSkills": 6,
   "freeSkills": 4,
   "mods": {}
  },
  {
   "id": "old",
   "name": "Old",
   "roll": [
    6,
    6
   ],
   "trainedSkills": 12,
   "professionSkills": 6,
   "freeSkills": 6,
   "mods": {
    "STR": -2,
    "AGL": -2,
    "CON": -2,
    "INT": 1,
    "WIL": 1
   }
  }
 ],
 "attributeMax": 18,
 "baseChance": [
  {
   "min": 1,
   "max": 5,
   "value": 3
  },
  {
   "min": 6,
   "max": 8,
   "value": 4
  },
  {
   "min": 9,
   "max": 12,
   "value": 5
  },
  {
   "min": 13,
   "max": 15,
   "value": 6
  },
  {
   "min": 16,
   "max": 18,
   "value": 7
  }
 ],
 "trainedMultiplier": 2,
 "skillMax": 18,
 "movementAgl": [
  {
   "min": 1,
   "max": 6,
   "mod": -4
  },
  {
   "min": 7,
   "max": 9,
   "mod": -2
  },
  {
   "min": 10,
   "max": 12,
   "mod": 0
  },
  {
   "min": 13,
   "max": 15,
   "mod": 2
  },
  {
   "min": 16,
   "max": 18,
   "mod": 4
  }
 ],
 "damageBonus": [
  {
   "min": 1,
   "max": 12,
   "value": null
  },
  {
   "min": 13,
   "max": 16,
   "value": "D4"
  },
  {
   "min": 17,
   "max": 99,
   "value": "D6"
  }
 ],
 "hp": {
  "attribute": "CON",
  "perRobust": 2
 },
 "wp": {
  "attribute": "WIL",
  "perFocused": 2
 },
 "preparedSpells": "Equal to your INT base chance (magic tricks don't count).",
 "encumbrance": {
  "carry": "ceil(STR/2)",
  "backpack": 2,
  "weaponsAtHand": 3,
  "rationsPerItem": 4,
  "coinsPerItem": 100,
  "quiverItems": 1
 },
 "coins": {
  "copperPerSilver": 10,
  "silverPerGold": 10,
  "units": [
   "gold",
   "silver",
   "copper"
  ]
 },
 "time": [
  {
   "id": "round",
   "name": "Round",
   "length": "10 seconds",
   "use": "One combat action; a round rest."
  },
  {
   "id": "stretch",
   "name": "Stretch",
   "length": "15 minutes",
   "use": "Explore a room; a stretch rest."
  },
  {
   "id": "shift",
   "name": "Shift",
   "length": "6 hours",
   "use": "Hike about 15 km; a shift rest. Four per day: morning, day, evening, night."
  }
 ],
 "rolls": {
  "dragon": 1,
  "demon": 20,
  "defaultNpcSkill": 5,
  "monsterDefense": 15,
  "boon": "Roll an extra D20 and keep the lowest.",
  "bane": "Roll an extra D20 and keep the highest.",
  "boonsCancelBanes": true,
  "oneHelper": true
 },
 "rests": [
  {
   "id": "round",
   "name": "Round Rest",
   "length": "round",
   "hp": null,
   "wp": "D6",
   "conditions": 0,
   "perShift": 1,
   "note": "An action in combat."
  },
  {
   "id": "stretch",
   "name": "Stretch Rest",
   "length": "stretch",
   "hp": "D6",
   "hpTended": "2D6",
   "wp": "D6",
   "conditions": 1,
   "perShift": 1,
   "note": "2D6 HP if someone tends you with a successful Healing roll (they can't rest and can tend only one person)."
  },
  {
   "id": "shift",
   "name": "Shift Rest",
   "length": "shift",
   "hp": "all",
   "wp": "all",
   "conditions": "all",
   "perShift": null,
   "note": "Only in a safe place with no enemies near; interrupted by combat or hard work, it has no effect."
  }
 ],
 "death": {
  "deathRoll": "CON",
  "successes": 3,
  "failures": 3,
  "recoverHp": "D6",
  "dragonCounts": 2,
  "demonCounts": 2,
  "damageAtZero": "Counts as one failed death roll.",
  "rallyRange": 10,
  "rallySelf": "WIL with a bane",
  "saveLife": "Healing roll by someone adjacent (bane without bandages); success stops death rolls and restores D6 HP.",
  "instantDeath": "A single attack that takes you to negative HP equal to your maximum HP kills outright.",
  "severeInjury": "If you survive reaching zero HP, roll CON; on a failure roll on the severe injury table."
 },
 "light": [
  {
   "item": "Torch",
   "radius": 10,
   "die": "D6",
   "note": "Also roll when used as a weapon."
  },
  {
   "item": "Oil Lamp",
   "radius": 10,
   "die": "D6"
  },
  {
   "item": "Lantern",
   "radius": 10,
   "die": "D8"
  },
  {
   "item": "Tallow Candle",
   "radius": 4,
   "die": "D4",
   "note": "Also roll when the bearer attacks or is attacked."
  }
 ],
 "poisons": {
  "potency": {
   "weak": 9,
   "moderate": 12,
   "strong": 15
  },
  "types": [
   {
    "id": "lethal",
    "name": "Lethal",
    "full": "D6 damage each round on your turn until zero HP; an antidote stops it.",
    "limited": "D6 damage on your next turn."
   },
   {
    "id": "paralyzing",
    "name": "Paralyzing",
    "full": "Exhausted, and a CON roll each turn or you can't move or act that round; wears off after a stretch or with an antidote.",
    "limited": "Exhausted."
   },
   {
    "id": "sleeping",
    "name": "Sleeping",
    "full": "Dazed, and a CON roll each turn or you fall asleep for a shift; an antidote or any damage wakes you.",
    "limited": "Dazed."
   }
  ],
  "monsters": "Poison has no effect on monsters."
 },
 "fear": {
  "roll": "WIL",
  "table": "fear"
 },
 "falling": "D6 bludgeoning per full 2 m fallen (half the height, rounded down); a fall under 2 m does nothing. A successful Acrobatics roll halves the dice (rounded up). Armor doesn't help.",
 "combat": {
  "initiative": "Each round everyone draws an initiative card (1–10); lowest acts first. Monsters draw one card per point of Ferocity.",
  "turn": "On your turn you may move up to your Movement and perform one action, in either order (you may split movement around the action).",
  "freeActions": [
   "Draw, swap or put away a weapon at hand",
   "Drop prone or stand up",
   "Drop an item",
   "Shout a few words"
  ],
  "actions": [
   "Dash",
   "Melee Attack",
   "Ranged Attack",
   "Parry (reaction)",
   "Dodge (reaction)",
   "Pick Up Item",
   "Equip/Unequip Armor or Helmet",
   "First Aid",
   "Rally",
   "Break Down Door",
   "Pick Lock",
   "Use Item",
   "Activate Ability",
   "Cast Spell",
   "Help",
   "Round Rest"
  ],
  "meleeRange": 2,
  "longRange": 4,
  "squareSize": 2,
  "proneTarget": "Boon on the attack and +D6 damage.",
  "rangedTooClose": "Bane when the target is within 2 m.",
  "longRangeShot": "Up to twice the listed range with a bane."
 }
};

export const DB_WEAKNESSES: DbRollEntry[] = [
 {
  "roll": 1,
  "name": "Gullible",
  "text": "I believe whatever people tell me."
 },
 {
  "roll": 2,
  "name": "Greedy",
  "text": "I want more than my share of every treasure."
 },
 {
  "roll": 3,
  "name": "Thin-skinned",
  "text": "I never let a provocation slide."
 },
 {
  "roll": 4,
  "name": "Foolhardy",
  "text": "I'm always first into danger."
 },
 {
  "roll": 5,
  "name": "Fainthearted",
  "text": "I always hang back at the rear of the group."
 },
 {
  "roll": 6,
  "name": "Monster Slayer",
  "text": "Every monster is evil and must die."
 },
 {
  "roll": 7,
  "name": "Intolerant",
  "text": "Nightkin like orcs and goblins are evil and must be fought."
 },
 {
  "roll": 8,
  "name": "Slothful",
  "text": "I rest whenever I get the chance."
 },
 {
  "roll": 9,
  "name": "Gluttonous",
  "text": "I never pass up something tasty to eat."
 },
 {
  "roll": 10,
  "name": "Kleptomaniac",
  "text": "I can't help stealing valuables."
 },
 {
  "roll": 11,
  "name": "Vain",
  "text": "Flatter me and I'll help you with anything."
 },
 {
  "roll": 12,
  "name": "Reckless",
  "text": "I take big risks without thinking of the consequences."
 },
 {
  "roll": 13,
  "name": "Fearful of Magic",
  "text": "Magic is evil and mages can't be trusted."
 },
 {
  "roll": 14,
  "name": "Craving Knowledge",
  "text": "Knowledge matters more to me than my friends."
 },
 {
  "roll": 15,
  "name": "Child of the Wild",
  "text": "I never sleep under a roof."
 },
 {
  "roll": 16,
  "name": "Boastful",
  "text": "I always exaggerate what I've done."
 },
 {
  "roll": 17,
  "name": "Violent",
  "text": "Violence is my answer to every obstacle."
 },
 {
  "roll": 18,
  "name": "Overbearing",
  "text": "I'm always telling others what to do."
 },
 {
  "roll": 19,
  "name": "Pessimist",
  "text": "I always expect the worst."
 },
 {
  "roll": 20,
  "name": "Haughty",
  "text": "I look down on everyone I meet."
 }
];

export const DB_WEAPONS: DbWeapon[] = [
 {
  "id": "unarmed",
  "name": "Unarmed",
  "grip": null,
  "str": null,
  "range": 2,
  "damage": "D6",
  "durability": null,
  "cost": null,
  "supply": null,
  "features": [
   "Bludgeoning"
  ],
  "skill": "Brawling",
  "melee": true,
  "natural": true
 },
 {
  "id": "blunt-object-light",
  "name": "Blunt Object, Light",
  "grip": "1H",
  "str": null,
  "range": "STR",
  "damage": "D8",
  "durability": 3,
  "cost": null,
  "supply": null,
  "features": [
   "Bludgeoning",
   "Can be thrown"
  ],
  "skill": "Hammers",
  "melee": true,
  "improvised": true
 },
 {
  "id": "blunt-object-heavy",
  "name": "Blunt Object, Heavy",
  "grip": "2H",
  "str": 16,
  "range": 2,
  "damage": "2D8",
  "durability": 3,
  "cost": null,
  "supply": null,
  "features": [
   "Bludgeoning"
  ],
  "skill": "Hammers",
  "melee": true,
  "improvised": true
 },
 {
  "id": "knife",
  "name": "Knife",
  "grip": "1H",
  "str": null,
  "range": "STR",
  "damage": "D8",
  "durability": 6,
  "cost": {
   "amount": 5,
   "unit": "silver"
  },
  "supply": "Common",
  "features": [
   "Subtle",
   "Piercing",
   "Can be thrown"
  ],
  "skill": "Knives",
  "melee": true,
  "metal": true
 },
 {
  "id": "dagger",
  "name": "Dagger",
  "grip": "1H",
  "str": null,
  "range": "STR",
  "damage": "D8",
  "durability": 9,
  "cost": {
   "amount": 1,
   "unit": "gold"
  },
  "supply": "Common",
  "features": [
   "Subtle",
   "Piercing",
   "Slashing",
   "Can be thrown"
  ],
  "skill": "Knives",
  "melee": true,
  "metal": true
 },
 {
  "id": "parrying-dagger",
  "name": "Parrying Dagger",
  "grip": "1H",
  "str": null,
  "range": 2,
  "damage": "D6",
  "durability": 15,
  "cost": {
   "amount": 2,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "features": [
   "Subtle",
   "Piercing",
   "Slashing"
  ],
  "skill": "Knives",
  "melee": true,
  "metal": true
 },
 {
  "id": "short-sword",
  "name": "Short Sword",
  "grip": "1H",
  "str": 7,
  "range": 2,
  "damage": "D10",
  "durability": 12,
  "cost": {
   "amount": 8,
   "unit": "gold"
  },
  "supply": "Common",
  "features": [
   "Piercing",
   "Slashing"
  ],
  "skill": "Swords",
  "melee": true,
  "metal": true
 },
 {
  "id": "broadsword",
  "name": "Broadsword",
  "grip": "1H",
  "str": 10,
  "range": 2,
  "damage": "2D6",
  "durability": 15,
  "cost": {
   "amount": 12,
   "unit": "gold"
  },
  "supply": "Common",
  "features": [
   "Piercing",
   "Slashing"
  ],
  "skill": "Swords",
  "melee": true,
  "metal": true
 },
 {
  "id": "longsword",
  "name": "Longsword",
  "grip": "1H",
  "str": 13,
  "range": 2,
  "damage": "2D8",
  "durability": 15,
  "cost": {
   "amount": 25,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "features": [
   "Piercing",
   "Slashing"
  ],
  "skill": "Swords",
  "melee": true,
  "metal": true
 },
 {
  "id": "greatsword",
  "name": "Greatsword",
  "grip": "2H",
  "str": 16,
  "range": 2,
  "damage": "2D10",
  "durability": 15,
  "cost": {
   "amount": 50,
   "unit": "gold"
  },
  "supply": "Rare",
  "features": [
   "Piercing",
   "Slashing"
  ],
  "skill": "Swords",
  "melee": true,
  "metal": true
 },
 {
  "id": "scimitar",
  "name": "Scimitar",
  "grip": "1H",
  "str": 10,
  "range": 2,
  "damage": "2D6",
  "durability": 12,
  "cost": {
   "amount": 10,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "features": [
   "Toppling",
   "Slashing"
  ],
  "skill": "Swords",
  "melee": true,
  "metal": true
 },
 {
  "id": "handaxe",
  "name": "Handaxe",
  "grip": "1H",
  "str": 7,
  "range": "STR",
  "damage": "2D6",
  "durability": 9,
  "cost": {
   "amount": 2,
   "unit": "gold"
  },
  "supply": "Common",
  "features": [
   "Toppling",
   "Slashing",
   "Can be thrown"
  ],
  "skill": "Axes",
  "melee": true,
  "metal": true
 },
 {
  "id": "battleaxe",
  "name": "Battleaxe",
  "grip": "1H",
  "str": 13,
  "range": 2,
  "damage": "2D8",
  "durability": 9,
  "cost": {
   "amount": 10,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "features": [
   "Toppling",
   "Slashing"
  ],
  "skill": "Axes",
  "melee": true,
  "metal": true
 },
 {
  "id": "two-handed-axe",
  "name": "Two-Handed Axe",
  "grip": "2H",
  "str": 16,
  "range": 2,
  "damage": "2D10",
  "durability": 9,
  "cost": {
   "amount": 25,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "features": [
   "Toppling",
   "Slashing"
  ],
  "skill": "Axes",
  "melee": true,
  "metal": true
 },
 {
  "id": "mace",
  "name": "Mace",
  "grip": "1H",
  "str": 7,
  "range": 2,
  "damage": "2D4",
  "durability": 12,
  "cost": {
   "amount": 8,
   "unit": "gold"
  },
  "supply": "Common",
  "features": [
   "Bludgeoning"
  ],
  "skill": "Hammers",
  "melee": true,
  "metal": true
 },
 {
  "id": "morningstar",
  "name": "Morningstar",
  "grip": "1H",
  "str": 13,
  "range": 2,
  "damage": "2D8",
  "durability": 12,
  "cost": {
   "amount": 14,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "features": [
   "Bludgeoning"
  ],
  "skill": "Hammers",
  "melee": true,
  "metal": true
 },
 {
  "id": "flail",
  "name": "Flail",
  "grip": "1H",
  "str": 13,
  "range": 2,
  "damage": "2D8",
  "durability": null,
  "cost": {
   "amount": 16,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "features": [
   "Bludgeoning",
   "Toppling",
   "Cannot be used for parrying"
  ],
  "skill": "Hammers",
  "melee": true,
  "metal": true,
  "noParry": true
 },
 {
  "id": "warhammer-light",
  "name": "Warhammer, Light",
  "grip": "1H",
  "str": 10,
  "range": 2,
  "damage": "2D6",
  "durability": 12,
  "cost": {
   "amount": 10,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "features": [
   "Bludgeoning",
   "Toppling"
  ],
  "skill": "Hammers",
  "melee": true,
  "metal": true
 },
 {
  "id": "warhammer-heavy",
  "name": "Warhammer, Heavy",
  "grip": "2H",
  "str": 16,
  "range": 2,
  "damage": "2D10",
  "durability": 12,
  "cost": {
   "amount": 20,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "features": [
   "Bludgeoning",
   "Toppling"
  ],
  "skill": "Hammers",
  "melee": true,
  "metal": true
 },
 {
  "id": "wooden-club-small",
  "name": "Wooden Club, Small",
  "grip": "1H",
  "str": 7,
  "range": 2,
  "damage": "D8",
  "durability": 9,
  "cost": {
   "amount": 1,
   "unit": "silver"
  },
  "supply": "Common",
  "features": [
   "Bludgeoning"
  ],
  "skill": "Hammers",
  "melee": true
 },
 {
  "id": "wooden-club-large",
  "name": "Wooden Club, Large",
  "grip": "2H",
  "str": 16,
  "range": 2,
  "damage": "2D8",
  "durability": 12,
  "cost": {
   "amount": 2,
   "unit": "silver"
  },
  "supply": "Common",
  "features": [
   "Bludgeoning"
  ],
  "skill": "Hammers",
  "melee": true
 },
 {
  "id": "staff",
  "name": "Staff",
  "grip": "2H",
  "str": 7,
  "range": 2,
  "damage": "D8",
  "durability": 9,
  "cost": {
   "amount": 2,
   "unit": "silver"
  },
  "supply": "Common",
  "features": [
   "Bludgeoning",
   "Toppling"
  ],
  "skill": "Staves",
  "melee": true
 },
 {
  "id": "short-spear",
  "name": "Short Spear",
  "grip": "1H",
  "str": 7,
  "range": "STR×2",
  "damage": "D10",
  "durability": 9,
  "cost": {
   "amount": 5,
   "unit": "silver"
  },
  "supply": "Common",
  "features": [
   "Piercing",
   "Can be thrown"
  ],
  "skill": "Spears",
  "melee": true,
  "metal": true
 },
 {
  "id": "long-spear",
  "name": "Long Spear",
  "grip": "2H",
  "str": 10,
  "range": 4,
  "damage": "2D8",
  "durability": 9,
  "cost": {
   "amount": 1,
   "unit": "gold"
  },
  "supply": "Common",
  "features": [
   "Long",
   "Piercing"
  ],
  "skill": "Spears",
  "melee": true,
  "metal": true
 },
 {
  "id": "lance",
  "name": "Lance",
  "grip": "1H",
  "str": 13,
  "range": 4,
  "damage": "2D10",
  "durability": 12,
  "cost": {
   "amount": 12,
   "unit": "gold"
  },
  "supply": "Rare",
  "features": [
   "Long",
   "Piercing",
   "Requires combat trained mount"
  ],
  "skill": "Spears",
  "melee": true,
  "metal": true
 },
 {
  "id": "halberd",
  "name": "Halberd",
  "grip": "2H",
  "str": 13,
  "range": 4,
  "damage": "2D8",
  "durability": 12,
  "cost": {
   "amount": 20,
   "unit": "gold"
  },
  "supply": "Rare",
  "features": [
   "Long",
   "Toppling",
   "Piercing",
   "Slashing"
  ],
  "skill": "Spears",
  "melee": true,
  "metal": true,
  "skillNote": "The book doesn't name the skill; Spears is assumed (long, piercing pole-arm)."
 },
 {
  "id": "trident",
  "name": "Trident",
  "grip": "1H",
  "str": 10,
  "range": "STR",
  "damage": "2D6",
  "durability": 9,
  "cost": {
   "amount": 5,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "features": [
   "Toppling",
   "Piercing",
   "Can be thrown"
  ],
  "skill": "Spears",
  "melee": true,
  "metal": true
 },
 {
  "id": "shield-small",
  "name": "Shield, Small",
  "grip": "1H",
  "str": 7,
  "range": 2,
  "damage": "D8",
  "durability": 15,
  "cost": {
   "amount": 4,
   "unit": "gold"
  },
  "supply": "Common",
  "features": [
   "Bludgeoning"
  ],
  "skill": null,
  "melee": true,
  "shield": true,
  "skillAny": "strMelee",
  "skillNote": "No shield skill: parry (and strike) with any STR-based melee skill."
 },
 {
  "id": "shield-large",
  "name": "Shield, Large",
  "grip": "1H",
  "str": 13,
  "range": 2,
  "damage": "D8",
  "durability": 18,
  "cost": {
   "amount": 12,
   "unit": "gold"
  },
  "supply": "Common",
  "features": [
   "Bludgeoning"
  ],
  "skill": null,
  "melee": true,
  "shield": true,
  "skillAny": "strMelee",
  "skillNote": "No shield skill: parry (and strike) with any STR-based melee skill."
 },
 {
  "id": "sling",
  "name": "Sling",
  "grip": "1H",
  "str": null,
  "range": 20,
  "damage": "D8",
  "durability": null,
  "cost": {
   "amount": 1,
   "unit": "silver"
  },
  "supply": "Common",
  "features": [
   "Bludgeoning",
   "Tiny item"
  ],
  "skill": "Slings",
  "ranged": true
 },
 {
  "id": "short-bow",
  "name": "Short Bow",
  "grip": "2H",
  "str": 7,
  "range": 30,
  "damage": "D10",
  "durability": 3,
  "cost": {
   "amount": 25,
   "unit": "gold"
  },
  "supply": "Common",
  "features": [
   "Piercing",
   "Requires quiver"
  ],
  "skill": "Bows",
  "ranged": true
 },
 {
  "id": "longbow",
  "name": "Longbow",
  "grip": "2H",
  "str": 13,
  "range": 100,
  "damage": "D12",
  "durability": 6,
  "cost": {
   "amount": 50,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "features": [
   "Piercing",
   "Requires quiver"
  ],
  "skill": "Bows",
  "ranged": true
 },
 {
  "id": "crossbow-light",
  "name": "Crossbow, Light",
  "grip": "2H",
  "str": 7,
  "range": 40,
  "damage": "2D6",
  "durability": 6,
  "cost": {
   "amount": 75,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "features": [
   "Piercing",
   "Requires quiver",
   "No damage bonus"
  ],
  "skill": "Crossbows",
  "ranged": true,
  "noDamageBonus": true
 },
 {
  "id": "crossbow-heavy",
  "name": "Crossbow, Heavy",
  "grip": "2H",
  "str": 13,
  "range": 60,
  "damage": "2D8",
  "durability": 9,
  "cost": {
   "amount": 200,
   "unit": "gold"
  },
  "supply": "Rare",
  "features": [
   "Piercing",
   "Requires quiver",
   "No damage bonus"
  ],
  "skill": "Crossbows",
  "ranged": true,
  "noDamageBonus": true
 },
 {
  "id": "crossbow-hand",
  "name": "Crossbow, Hand",
  "grip": "1H",
  "str": 7,
  "range": 30,
  "damage": "2D6",
  "durability": 6,
  "cost": {
   "amount": 90,
   "unit": "gold"
  },
  "supply": "Rare",
  "features": [
   "Piercing",
   "Requires quiver",
   "No damage bonus"
  ],
  "skill": "Crossbows",
  "ranged": true,
  "noDamageBonus": true
 }
];

export const DB_WEAPON_FEATURES = {
 "Subtle": "Boon and one extra damage die on sneak attacks.",
 "Long": "Reaches enemies up to 4 m away, and past a friendly combatant.",
 "Toppling": "Boon when trying to topple an opponent.",
 "Piercing": "Piercing damage (matters for armor and Find Weak Spot; never damages a parrying weapon).",
 "Slashing": "Slashing damage. A weapon that is both slashing and piercing: choose before rolling.",
 "Bludgeoning": "Bludgeoning damage (matters for armor)."
};

