// GENERATED FILE - do not edit by hand.
// Source: data/db/parts/*.mjs - regenerate with: node scripts/build-db-data.mjs
// Dragonbane (Free League Publishing). Mechanics and table values are game facts;
// descriptive text is original paraphrase written for this app.
(function(){
var DB_ADVANCEMENT = {
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
window.DB_ADVANCEMENT = DB_ADVANCEMENT;
var DB_ALCHEMY = {
 "rules": [
  {
   "name": "Substances, not spells",
   "text": "Alchemy makes magical substances (often potions) instead of casting spells on the surroundings. Unless the recipe says otherwise, a dose is consumed or applied as an action and takes effect at once."
  },
  {
   "name": "Preparation",
   "text": "Brewing normally takes one shift. Roll Alchemy and pay the WP at the end. Success yields one dose, plus one more per extra power level (if you have the ingredients). Each dose is a separate item."
  },
  {
   "name": "Power level",
   "text": "Except for poisons, substances have no power levels — the power level only sets how many doses you make."
  },
  {
   "name": "Ingredients",
   "text": "Each dose produced needs one dose of every listed ingredient. Ingredients are used up even if the roll fails."
  },
  {
   "name": "Laboratory",
   "text": "All recipes require an alchemical laboratory (cauldrons, mortars, flasks, vials…). A small field laboratory is a Rare item, weight 1, 50 gold; new alchemists start with one. An ordinary kitchen works with a bane on the Alchemy roll; a large room-sized laboratory (at least 500 gold) gives a boon."
  },
  {
   "name": "Shelf life",
   "text": "Substances keep effectively forever. Counter Ritual (p.12) neutralizes one; Dispel does not."
  },
  {
   "name": "Cost",
   "text": "Simpler substances can be bought at the listed cost per dose and supply. No listed price means it's too unique to have a set price."
  },
  {
   "name": "Ingredient doses",
   "text": "Ingredients are counted in doses; each dose is a tiny item."
  },
  {
   "name": "General herbs",
   "text": "The basic ingredient of many recipes; keep a supply in your pack."
  },
  {
   "name": "Finding herbs",
   "text": "After a shift of foraging (core p.103) with a successful Bushcraft roll, you may take D6 doses of general herbs instead of food. Rarer herbs at the GM's discretion, usually one dose per success."
  },
  {
   "name": "Extracting ingredients",
   "text": "Harvesting parts from a (usually dead) animal or monster takes a stretch and a Beast Lore roll: success gives D3 doses, a dragon gives D6. On a failure that creature can't be tried again."
  },
  {
   "name": "No magic tricks",
   "text": "Alchemy has no magic tricks."
  }
 ],
 "substances": [
  {
   "name": "Use",
   "action": "action",
   "text": "Consume or apply; effect is immediate unless stated."
  },
  {
   "name": "Doses per brew",
   "text": "1 dose + 1 per extra power level (WP as normal for the power level)."
  },
  {
   "name": "Brewing time",
   "time": "Shift",
   "roll": "Alchemy",
   "text": "Roll and pay WP at the end of the shift."
  },
  {
   "name": "Neutralize",
   "text": "Counter Ritual only; Dispel has no effect."
  }
 ],
 "extraction": {
  "time": "Stretch",
  "roll": "Beast Lore",
  "yield": "D3",
  "yieldDragon": "D6",
  "retryOnFail": false
 },
 "foraging": {
  "roll": "Bushcraft",
  "time": "Shift",
  "yield": "D6",
  "ingredient": "General Herbs"
 },
 "ingredients": [
  {
   "name": "Bat Blood",
   "cost": {
    "amount": 2,
    "unit": "silver"
   },
   "supply": "Uncommon",
   "extracted": true,
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Bear Tooth",
   "cost": {
    "amount": 4,
    "unit": "silver"
   },
   "supply": "Uncommon",
   "extracted": true,
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Boar Tusk",
   "cost": {
    "amount": 2,
    "unit": "silver"
   },
   "supply": "Uncommon",
   "extracted": true,
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Charcoal",
   "cost": {
    "amount": 5,
    "unit": "copper"
   },
   "supply": "Common",
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Deer Antler",
   "cost": {
    "amount": 2,
    "unit": "silver"
   },
   "supply": "Uncommon",
   "extracted": true,
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Demon Blood",
   "cost": {
    "amount": 10,
    "unit": "gold"
   },
   "supply": "Unique",
   "extracted": true,
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Dragon Blood",
   "cost": {
    "amount": 10,
    "unit": "gold"
   },
   "supply": "Unique",
   "extracted": true,
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Dragon Tooth",
   "cost": {
    "amount": 10,
    "unit": "gold"
   },
   "supply": "Unique",
   "extracted": true,
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Fairy Dust",
   "cost": {
    "amount": 8,
    "unit": "gold"
   },
   "supply": "Unique",
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "General Herbs",
   "cost": {
    "amount": 2,
    "unit": "silver"
   },
   "supply": "Common",
   "where": "Foraging (Bushcraft): D6 doses instead of food",
   "text": "Basic ingredient in many recipes.",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Ghoul Bone",
   "cost": {
    "amount": 1,
    "unit": "gold"
   },
   "supply": "Rare",
   "extracted": true,
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Giant Blood",
   "cost": {
    "amount": 3,
    "unit": "gold"
   },
   "supply": "Rare",
   "extracted": true,
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Griffon Feather",
   "cost": {
    "amount": 5,
    "unit": "gold"
   },
   "supply": "Rare",
   "extracted": true,
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Hobgoblin Blood",
   "cost": {
    "amount": 5,
    "unit": "silver"
   },
   "supply": "Uncommon",
   "extracted": true,
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Hydra Blood",
   "cost": {
    "amount": 6,
    "unit": "gold"
   },
   "supply": "Unique",
   "extracted": true,
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Iron Filings",
   "cost": {
    "amount": 1,
    "unit": "silver"
   },
   "supply": "Common",
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Manticore Spike",
   "cost": {
    "amount": 2,
    "unit": "gold"
   },
   "supply": "Rare",
   "extracted": true,
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Minotaur Horn",
   "cost": {
    "amount": 4,
    "unit": "gold"
   },
   "supply": "Rare",
   "extracted": true,
   "text": "Not used by any recipe in the book.",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Nymph Tears",
   "cost": {
    "amount": 3,
    "unit": "gold"
   },
   "supply": "Rare",
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Octopus Ink",
   "cost": {
    "amount": 5,
    "unit": "silver"
   },
   "supply": "Rare",
   "extracted": true,
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Saltpeter",
   "cost": {
    "amount": 1,
    "unit": "silver"
   },
   "supply": "Uncommon",
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Sea Serpent Bile",
   "cost": {
    "amount": 2,
    "unit": "gold"
   },
   "supply": "Rare",
   "extracted": true,
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Spider Venom",
   "cost": {
    "amount": 3,
    "unit": "gold"
   },
   "supply": "Rare",
   "extracted": true,
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Sulfur",
   "cost": {
    "amount": 3,
    "unit": "silver"
   },
   "supply": "Uncommon",
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Troll Bile",
   "cost": {
    "amount": 2,
    "unit": "gold"
   },
   "supply": "Rare",
   "extracted": true,
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Troll Blood",
   "cost": {
    "amount": 1,
    "unit": "gold"
   },
   "supply": "Rare",
   "extracted": true,
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Troll Tooth",
   "cost": {
    "amount": 1,
    "unit": "gold"
   },
   "supply": "Rare",
   "extracted": true,
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Vampire Blood",
   "cost": {
    "amount": 7,
    "unit": "gold"
   },
   "supply": "Unique",
   "extracted": true,
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Wolf Blood",
   "cost": {
    "amount": 3,
    "unit": "silver"
   },
   "supply": "Uncommon",
   "extracted": true,
   "text": "",
   "weight": 0,
   "source": "magic"
  },
  {
   "name": "Worg Tooth",
   "cost": {
    "amount": 5,
    "unit": "silver"
   },
   "supply": "Rare",
   "extracted": true,
   "text": "Not used by any recipe in the book.",
   "weight": 0,
   "source": "magic"
  }
 ],
 "masters": "See DB_MAGIC_SCHOOLS alchemy.masters",
 "recipes": [
  {
   "powerLevels": true,
   "name": "Focus Tonic",
   "rank": 1,
   "prerequisite": "Alchemy",
   "ingredients": [
    "General Herbs",
    "Wolf Blood"
   ],
   "cost": {
    "amount": 5,
    "unit": "gold"
   },
   "supply": "Rare",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 110,
   "effect": "Removes the Dazed condition.",
   "cures": [
    "Dazed"
   ],
   "use": "consume",
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Herbal Concoction",
   "rank": 1,
   "prerequisite": "Alchemy",
   "ingredients": [
    "General Herbs"
   ],
   "cost": {
    "amount": 1,
    "unit": "gold"
   },
   "supply": "Uncommon",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 110,
   "effect": "Boon on Healing rolls to treat someone with a disease (core p.53).",
   "boon": {
    "skill": "Healing",
    "when": "treating disease"
   },
   "coreGear": "Herbal Concoction",
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Invigorating Decoction",
   "rank": 1,
   "prerequisite": "Alchemy",
   "ingredients": [
    "General Herbs",
    "Boar Tusk"
   ],
   "cost": {
    "amount": 5,
    "unit": "gold"
   },
   "supply": "Rare",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 110,
   "effect": "Removes the Exhausted condition.",
   "cures": [
    "Exhausted"
   ],
   "use": "consume",
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Liquid Courage",
   "rank": 1,
   "prerequisite": "Alchemy",
   "ingredients": [
    "General Herbs",
    "Bear Tooth"
   ],
   "cost": {
    "amount": 5,
    "unit": "gold"
   },
   "supply": "Rare",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 110,
   "effect": "Removes the Scared condition.",
   "cures": [
    "Scared"
   ],
   "use": "consume",
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Medicinal Water",
   "rank": 1,
   "prerequisite": "Alchemy",
   "ingredients": [
    "General Herbs",
    "Deer Antler"
   ],
   "cost": {
    "amount": 5,
    "unit": "gold"
   },
   "supply": "Rare",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 110,
   "effect": "Removes the Sickly condition.",
   "cures": [
    "Sickly"
   ],
   "use": "consume",
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Sleeping Poison",
   "rank": 1,
   "prerequisite": "Alchemy",
   "ingredients": [
    "General Herbs",
    "Spider Venom"
   ],
   "cost": {
    "amount": 6,
    "unit": "silver",
    "note": "× potency"
   },
   "supply": "Uncommon",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 110,
   "effect": "Sleeping poison (core poison rules) — drink it or coat a weapon. Potency 12, +3 per power level above 1.",
   "poison": {
    "type": "sleeping",
    "potency": 12,
    "perExtraLevel": 3
   },
   "use": "ingest or weapon",
   "coreGear": "Poison, Sleeping",
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Soothing Brew",
   "rank": 1,
   "prerequisite": "Alchemy",
   "ingredients": [
    "General Herbs",
    "Mead"
   ],
   "cost": {
    "amount": 5,
    "unit": "gold"
   },
   "supply": "Rare",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 110,
   "effect": "Removes the Angry condition.",
   "cures": [
    "Angry"
   ],
   "use": "consume",
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Spiritlifter",
   "rank": 1,
   "prerequisite": "Alchemy",
   "ingredients": [
    "General Herbs",
    "Sulfur"
   ],
   "cost": {
    "amount": 5,
    "unit": "gold"
   },
   "supply": "Rare",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 110,
   "effect": "Removes the Disheartened condition.",
   "cures": [
    "Disheartened"
   ],
   "use": "consume",
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Stun Powder",
   "rank": 1,
   "prerequisite": "Alchemy",
   "ingredients": [
    "Saltpeter",
    "Sulfur"
   ],
   "cost": {
    "amount": 4,
    "unit": "gold"
   },
   "supply": "Uncommon",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 110,
   "effect": "Blow it in the face of someone within 4 m with a Brawling roll; on a hit they become Dazed.",
   "attack": {
    "skill": "Brawling",
    "range": 4,
    "inflicts": [
     "Dazed"
    ]
   },
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Antidote",
   "rank": 2,
   "prerequisite": "Focus Tonic, Invigorating Decoction, Medicinal Water or Soothing Brew",
   "ingredients": [
    "General Herbs",
    "Sea Serpent Bile"
   ],
   "cost": {
    "amount": 20,
    "unit": "gold"
   },
   "supply": "Rare",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 110,
   "effect": "Negates a poison's full effect (core p.52); any limited effect still applies.",
   "curesPoison": "full effect only",
   "use": "consume",
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Healing Draught",
   "rank": 2,
   "prerequisite": "Herbal Concoction",
   "ingredients": [
    "General Herbs",
    "Hobgoblin Blood"
   ],
   "cost": {
    "amount": 10,
    "unit": "gold"
   },
   "supply": "Rare",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 110,
   "effect": "Heals D6 HP at once.",
   "heal": {
    "hp": "D6"
   },
   "use": "consume",
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Lock Acid",
   "rank": 2,
   "prerequisite": "Spiritlifter",
   "ingredients": [
    "Sulfur",
    "Troll Bile"
   ],
   "cost": {
    "amount": 10,
    "unit": "gold"
   },
   "supply": "Rare",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 111,
   "effect": "Eats through and destroys a lock or other small metal object over one stretch.",
   "duration": "Stretch",
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Love Potion",
   "rank": 2,
   "prerequisite": "Liquid Courage",
   "ingredients": [
    "General Herbs",
    "Nymph Tears"
   ],
   "cost": {
    "amount": 20,
    "unit": "gold"
   },
   "supply": "Rare",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 111,
   "effect": "For one shift, CHA-based skill rolls aimed at the drinker get a boon.",
   "boon": {
    "skills": "CHA-based",
    "against": "drinker"
   },
   "duration": "Shift",
   "use": "consume",
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Paralyzing Poison",
   "rank": 2,
   "prerequisite": "Sleeping Poison",
   "ingredients": [
    "General Herbs",
    "Bat Blood"
   ],
   "cost": {
    "amount": 12,
    "unit": "silver",
    "note": "× potency"
   },
   "supply": "Uncommon",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 111,
   "effect": "Paralyzing poison (core poison rules) — drink it or coat a weapon. Potency 12, +3 per power level above 1.",
   "poison": {
    "type": "paralyzing",
    "potency": 12,
    "perExtraLevel": 3
   },
   "use": "ingest or weapon",
   "coreGear": "Poison, Paralyzing",
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Puff Bomb",
   "rank": 2,
   "prerequisite": "Stun Powder",
   "ingredients": [
    "Charcoal",
    "Saltpeter",
    "Sulfur"
   ],
   "cost": {
    "amount": 10,
    "unit": "gold"
   },
   "supply": "Rare",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 111,
   "effect": "Throw up to STR meters (Brawling roll): D8 fire damage on a hit. Also lights a campfire.",
   "attack": {
    "skill": "Brawling",
    "range": "STR",
    "damage": "D8",
    "type": "fire"
   },
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Smokescreen",
   "rank": 2,
   "prerequisite": "Stun Powder",
   "ingredients": [
    "Charcoal",
    "Saltpeter",
    "Sulfur",
    "Octopus Ink"
   ],
   "cost": {
    "amount": 10,
    "unit": "gold"
   },
   "supply": "Rare",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 111,
   "effect": "Smoke bomb thrown up to STR meters: a 4 m radius cloud blocks all sight; everyone inside acts as in total darkness (core p.52). Each round start roll D4 outdoors / D8 indoors — on a 1 it clears.",
   "area": {
    "range": "STR",
    "radius": 4
   },
   "dissipate": {
    "outdoors": "D4",
    "indoors": "D8",
    "on": 1
   },
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Corrosive Sludge",
   "rank": 3,
   "prerequisite": "Lock Acid",
   "ingredients": [
    "Sulfur",
    "Troll Bile",
    "Ghoul Bone"
   ],
   "cost": {
    "amount": 25,
    "unit": "gold"
   },
   "supply": "Rare",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 111,
   "effect": "Thick acid thrown up to STR meters (Brawling roll): D8 damage on a hit, and worn armor permanently loses that much armor rating (natural armor unaffected).",
   "attack": {
    "skill": "Brawling",
    "range": "STR",
    "damage": "D8"
   },
   "armorDamage": "equal to damage (worn armor, permanent)",
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Drops of Strength",
   "rank": 3,
   "prerequisite": "Antidote",
   "ingredients": [
    "General Herbs",
    "Giant Blood"
   ],
   "cost": {
    "amount": 60,
    "unit": "gold"
   },
   "supply": "Rare",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 112,
   "effect": "For one shift STR becomes 18 (damage bonus +D6, carrying capacity 9). Also removes Exhausted and gives a boon on all STR-based skill rolls (skill levels don't change).",
   "setAttribute": {
    "STR": 18
   },
   "damageBonus": {
    "STR": "D6"
   },
   "carryingCapacity": 9,
   "cures": [
    "Exhausted"
   ],
   "boon": {
    "skills": "STR-based"
   },
   "duration": "Shift",
   "use": "consume",
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Elixir of Wisdom",
   "rank": 3,
   "prerequisite": "Antidote",
   "ingredients": [
    "General Herbs",
    "Troll Tooth"
   ],
   "cost": {
    "amount": 60,
    "unit": "gold"
   },
   "supply": "Rare",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 112,
   "effect": "Boon on all INT-based skill rolls for one shift; also removes Angry.",
   "boon": {
    "skills": "INT-based"
   },
   "cures": [
    "Angry"
   ],
   "duration": "Shift",
   "use": "consume",
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Healing Potion",
   "rank": 3,
   "prerequisite": "Healing Draught",
   "ingredients": [
    "General Herbs",
    "Troll Blood"
   ],
   "cost": {
    "amount": 50,
    "unit": "gold"
   },
   "supply": "Rare",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 112,
   "effect": "Heals 2D6 HP at once.",
   "heal": {
    "hp": "2D6"
   },
   "use": "consume",
   "coreGear": "Healing Potion",
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Lethal Poison",
   "rank": 3,
   "prerequisite": "Paralyzing Poison",
   "ingredients": [
    "General Herbs",
    "Spider Venom"
   ],
   "cost": {
    "amount": 2,
    "unit": "gold",
    "note": "× potency"
   },
   "supply": "Uncommon",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 112,
   "effect": "Lethal poison (core poison rules) — drink it or coat a weapon. Potency 12, +3 per power level above 1.",
   "poison": {
    "type": "lethal",
    "potency": 12,
    "perExtraLevel": 3
   },
   "use": "ingest or weapon",
   "coreGear": "Poison, Lethal",
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Nimble Nectar",
   "rank": 3,
   "prerequisite": "Antidote",
   "ingredients": [
    "General Herbs",
    "Griffon Feather"
   ],
   "cost": {
    "amount": 60,
    "unit": "gold"
   },
   "supply": "Rare",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 112,
   "effect": "For one shift AGL becomes 18 (damage bonus +D6, movement adjusted per core p.25). Also removes Dazed and gives a boon on all AGL-based skill rolls (skill levels don't change).",
   "setAttribute": {
    "AGL": 18
   },
   "damageBonus": {
    "AGL": "D6"
   },
   "movementFromAgl": true,
   "cures": [
    "Dazed"
   ],
   "boon": {
    "skills": "AGL-based"
   },
   "duration": "Shift",
   "use": "consume",
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Sunflash",
   "rank": 3,
   "prerequisite": "Puff Bomb",
   "ingredients": [
    "Charcoal",
    "Saltpeter",
    "Sulfur",
    "Manticore Spike"
   ],
   "cost": {
    "amount": 30,
    "unit": "gold"
   },
   "supply": "Rare",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 112,
   "effect": "Thrown to the ground, it flashes: every unprepared creature within 10 m must pass an Evade roll (not an action) or be blinded, losing its next turn and unable to react until then. Nightkin also take D6 damage (armor doesn't help).",
   "area": {
    "radius": 10
   },
   "save": {
    "skill": "Evade",
    "notAction": true,
    "fail": "blinded; loses next turn; no reactions until then"
   },
   "extraDamage": {
    "vs": "Nightkin",
    "damage": "D6",
    "ignoresArmor": true
   },
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Tincture of Beauty",
   "rank": 3,
   "prerequisite": "Love Potion",
   "ingredients": [
    "General Herbs",
    "Vampire Blood"
   ],
   "cost": {
    "amount": 80,
    "unit": "gold"
   },
   "supply": "Rare",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 112,
   "effect": "Boon on all CHA-based skill rolls for one shift; also removes Disheartened.",
   "boon": {
    "skills": "CHA-based"
   },
   "cures": [
    "Disheartened"
   ],
   "duration": "Shift",
   "use": "consume",
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Battle Fumes",
   "rank": 4,
   "prerequisite": "Drops of Strength",
   "ingredients": [
    "General Herbs",
    "Saltpeter",
    "Sulfur",
    "Giant Blood"
   ],
   "cost": {
    "amount": 100,
    "unit": "gold"
   },
   "supply": "Unique",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 112,
   "effect": "A bubbling cauldron gives off fumes for a shift; anyone who takes a stretch rest within 4 m gets a boon on all melee attacks for the next shift.",
   "area": {
    "radius": 4
   },
   "duration": "Shift",
   "boon": {
    "skills": "melee attacks",
    "duration": "next shift",
    "trigger": "stretch rest within 4 m"
   },
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Explosive Orb",
   "rank": 4,
   "prerequisite": "Sunflash",
   "ingredients": [
    "Charcoal",
    "Saltpeter",
    "Sulfur",
    "Iron Filings"
   ],
   "cost": {
    "amount": 60,
    "unit": "gold"
   },
   "supply": "Rare",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 112,
   "effect": "Throw up to STR meters (Brawling roll): 3D6 bludgeoning damage to the target and everyone within 4 m of it.",
   "attack": {
    "skill": "Brawling",
    "range": "STR",
    "damage": "3D6",
    "type": "bludgeoning",
    "radius": 4
   },
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Healing Tincture",
   "rank": 4,
   "prerequisite": "Healing Potion",
   "ingredients": [
    "General Herbs",
    "Hydra Blood"
   ],
   "cost": {
    "amount": 80,
    "unit": "gold"
   },
   "supply": "Unique",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 112,
   "effect": "Heals 3D6 HP and 3D6 WP at once.",
   "heal": {
    "hp": "3D6",
    "wp": "3D6"
   },
   "use": "consume",
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Healing Vapors",
   "rank": 4,
   "prerequisite": "Healing Potion",
   "ingredients": [
    "General Herbs",
    "Saltpeter",
    "Sulfur",
    "Troll Blood"
   ],
   "cost": {
    "amount": 70,
    "unit": "gold"
   },
   "supply": "Rare",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 113,
   "effect": "A bubbling cauldron gives off healing vapors for a shift; anyone who takes a stretch rest within 4 m gets the full benefit of a shift rest.",
   "area": {
    "radius": 4
   },
   "duration": "Shift",
   "restUpgrade": "stretch rest counts as shift rest",
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Philosopher's Stone",
   "rank": 4,
   "prerequisite": "Elixir of Wisdom",
   "ingredients": [
    "Demon Blood",
    "Dragon Blood"
   ],
   "cost": null,
   "supply": "Unique",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 113,
   "effect": "Makes one dose of Philosopher's Stone, an ingredient for other recipes.",
   "producesIngredient": "Philosopher's Stone",
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Toxic Mist",
   "rank": 4,
   "prerequisite": "Lethal Poison",
   "ingredients": [
    "Charcoal",
    "Saltpeter",
    "Sulfur",
    "Spider Venom"
   ],
   "cost": {
    "amount": 50,
    "unit": "gold"
   },
   "supply": "Rare",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 113,
   "effect": "Poison bomb thrown up to STR meters: a 4 m radius mist hits everyone inside with paralyzing, sleeping or lethal poison (thrower's choice), potency 15.",
   "area": {
    "range": "STR",
    "radius": 4
   },
   "poison": {
    "type": "paralyzing|sleeping|lethal (choice)",
    "potency": 15
   },
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Create Gold",
   "rank": 5,
   "prerequisite": "Philosopher's Stone",
   "ingredients": [
    "Philosopher's Stone",
    "Iron Filings"
   ],
   "cost": null,
   "supply": null,
   "time": "Shift",
   "roll": "Alchemy",
   "page": 113,
   "effect": "Each dose turns the iron into gold worth D8 × 10 gold coins.",
   "goldPerDose": "D8×10",
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Elixir of Life",
   "rank": 5,
   "prerequisite": "Healing Tincture",
   "ingredients": [
    "General Herbs",
    "Philosopher's Stone",
    "Hydra Blood"
   ],
   "cost": null,
   "supply": "Unique",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 113,
   "effect": "Restores all lost HP and WP and cures every condition, disease, poison effect and severe injury. A drinker at 0 HP stops making death rolls.",
   "heal": {
    "hp": "all",
    "wp": "all"
   },
   "cures": [
    "Exhausted",
    "Sickly",
    "Dazed",
    "Angry",
    "Scared",
    "Disheartened"
   ],
   "curesAlso": [
    "diseases",
    "poison effects",
    "severe injuries"
   ],
   "stopsDeathRolls": true,
   "use": "consume",
   "source": "magic"
  },
  {
   "powerLevels": true,
   "name": "Homunculus",
   "rank": 5,
   "prerequisite": "Philosopher's Stone",
   "ingredients": [
    "Philosopher's Stone",
    "Ghoul Bone",
    "Fairy Dust"
   ],
   "cost": null,
   "supply": "Unique",
   "time": "Shift",
   "roll": "Alchemy",
   "page": 113,
   "effect": "Creates a ~30 cm humanoid that serves you like a familiar: 6 HP, Movement 8, Sneaking 15 and Evade 15, all familiar abilities (p.10) except Trained, plus Gather (p.106). It's disobedient — Persuade it every day or it runs off.",
   "creature": {
    "hp": 6,
    "movement": 8,
    "skills": {
     "Sneaking": 15,
     "Evade": 15
    },
    "familiarAbilities": "all except Trained, plus Gather",
    "dailyCheck": "Persuasion or it runs away"
   },
   "source": "magic"
  }
 ],
 "source": "magic"
};
window.DB_ALCHEMY = DB_ALCHEMY;
var DB_ANIMALS = [
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
  "page": 99,
  "source": "core"
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
  "page": 99,
  "source": "core"
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
  "page": 99,
  "source": "core"
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
  "page": 99,
  "source": "core"
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
  "page": 99,
  "source": "core"
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
  "page": 99,
  "source": "core"
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
  "page": 99,
  "source": "core"
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
  "page": 99,
  "source": "core"
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
  "page": 99,
  "source": "core"
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
  "page": 99,
  "source": "core"
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
  "page": 99,
  "source": "core"
 }
];
window.DB_ANIMALS = DB_ANIMALS;
var DB_APPEARANCES = [
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
window.DB_APPEARANCES = DB_APPEARANCES;
var DB_ARMOR = [
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
  "page": 73,
  "source": "core"
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
  "page": 73,
  "source": "core"
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
  "page": 73,
  "source": "core"
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
  "page": 73,
  "source": "core"
 }
];
window.DB_ARMOR = DB_ARMOR;
var DB_ATTRIBUTES = [
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
window.DB_ATTRIBUTES = DB_ATTRIBUTES;
var DB_BESTIARY_CHAPTERS = [
 {
  "category": "Trolls",
  "page": 51,
  "text": "Trolls are feared in nursery tales as child-snatching brutes, yet some — like mountain trolls — are majestic and uninterested in harming small folk, and may even be the true makers of ancient artifacts. They are secretive about their own history; at a troll-guarded ford, bargaining may be wiser than fighting.",
  "rules": [
   {
    "name": "Sensitive to Sunlight (all trolls)",
    "text": "Every troll in this chapter takes D6 damage per round in direct sunlight and can't regenerate meanwhile; one brought to zero HP this way turns to stone. Dense foliage, thick cloud or full-cover clothing prevents it. (Shared stat-block rule, not stated in the intro.)"
   },
   {
    "name": "Regeneration (all trolls)",
    "text": "Trolls heal HP on each of their turns in combat unless at zero HP: D6 for cave and forest trolls, D8 for mountain trolls (Healing Blood). (Shared stat-block rule.)"
   }
  ]
 },
 {
  "category": "Giants",
  "page": 59,
  "text": "Giants are diminished remnants of a kin that once tipped the balance in the wars between dragons and demons, often siding with the stronger to end the fighting sooner. Today they live as lone wanderers or small families in remote wilds, longing to rebuild their old communities — and their knowledge of the primal powers may be needed if that war flares again.",
  "rules": []
 },
 {
  "category": "Beasts",
  "page": 69,
  "text": "Beasts are wilderness predators and creatures that threaten travellers — some mindless, some semi-intelligent, many born of mages' experiments or demonic influence. They are driven by self-preservation rather than evil, are wary of strangers and see people and livestock as easy prey; underestimating them out of folklore and prejudice gets adventurers killed.",
  "rules": []
 },
 {
  "category": "Undead",
  "chapter": 7,
  "page": 105,
  "source": "bestiary",
  "text": "The undead mostly burn with hatred for the living, usually because someone used dark magic or curses to drag their souls back; a few linger on their own because of how they died, at first less hostile but drifting toward hatred over time. The original soul usually survives inside, aware of the harm it does but unable to stop — many undead welcome their final destruction.",
  "rules": []
 },
 {
  "category": "Dragons",
  "chapter": 8,
  "page": 123,
  "source": "bestiary",
  "text": "Dragons are a higher order of being rather than mere monsters — cruel, greedy hoarders who toy with foes like a cat with a mouse, and pale shadows of their forebears. They are sworn enemies of the demonic realm, their language can create, alter and destroy, and they will never tolerate having their will questioned.",
  "rules": [
   {
    "name": "Age and Temperament",
    "text": "Dragons grow more powerful but less predatory with age; smaller creatures can approach older dragons without automatically being treated as prey."
   },
   {
    "name": "Dragons and Demons",
    "text": "All dragons are sworn enemies of demons and the demonic realm."
   },
   {
    "name": "Lindworms",
    "text": "The lindworm is placed in this chapter though not technically a dragon."
   }
  ]
 },
 {
  "category": "Demons",
  "chapter": 9,
  "page": 135,
  "source": "bestiary",
  "text": "Demons arise spontaneously from the hostile demonic realm and slip into other worlds through rifts, some accidental, some opened by reckless mages who believe they can control them. Whatever their shape or size, all demons live to tear down order and structure, which draws rebellious cultists to them.",
  "rules": [
   {
    "name": "Not Only Demons",
    "text": "The chapter also covers golems — bodies of clay and stone bound to disembodied spirits summoned from the demonic realm."
   }
  ]
 }
];
window.DB_BESTIARY_CHAPTERS = DB_BESTIARY_CHAPTERS;
var DB_BESTIARY_TABLES = [
 {
  "id": "bestiary-index",
  "name": "Bestiary Index",
  "page": 148,
  "source": "bestiary",
  "text": "Alphabetical index of every creature entry with its printed page (includes inverted forms like \"Demon, Fire\" and the alias Onaqui).",
  "columns": [
   "name",
   "page"
  ],
  "rows": [
   {
    "name": "Adult Dragon",
    "page": 128
   },
   {
    "name": "Amoeba, Giant",
    "page": 78
   },
   {
    "name": "Ancient Dragon",
    "page": 130
   },
   {
    "name": "Ant People",
    "page": 44
   },
   {
    "name": "Basilisk",
    "page": 70
   },
   {
    "name": "Beetle Kin",
    "page": 46
   },
   {
    "name": "Blood Demon",
    "page": 136
   },
   {
    "name": "Brook Horse",
    "page": 72
   },
   {
    "name": "Calydon",
    "page": 74
   },
   {
    "name": "Cat People",
    "page": 16
   },
   {
    "name": "Cave Troll",
    "page": 52
   },
   {
    "name": "Centaur",
    "page": 18
   },
   {
    "name": "Chaos Demon",
    "page": 138
   },
   {
    "name": "Chimera",
    "page": 76
   },
   {
    "name": "Demon, Blood",
    "page": 136
   },
   {
    "name": "Demon, Chaos",
    "page": 138
   },
   {
    "name": "Demon, Fire",
    "page": 140
   },
   {
    "name": "Demon, Guardian",
    "page": 144
   },
   {
    "name": "Demon, Shadow",
    "page": 146
   },
   {
    "name": "Dragon, Adult",
    "page": 128
   },
   {
    "name": "Dragon, Ancient",
    "page": 130
   },
   {
    "name": "Dragon, Hatchling",
    "page": 124
   },
   {
    "name": "Dragon, Young",
    "page": 126
   },
   {
    "name": "Fairy",
    "page": 20
   },
   {
    "name": "Fire Demon",
    "page": 140
   },
   {
    "name": "Forest Giant",
    "page": 60
   },
   {
    "name": "Forest Troll",
    "page": 54
   },
   {
    "name": "Frog People",
    "page": 22
   },
   {
    "name": "Ghost",
    "page": 106
   },
   {
    "name": "Ghoul",
    "page": 108
   },
   {
    "name": "Giant Amoeba",
    "page": 78
   },
   {
    "name": "Giant, Forest",
    "page": 60
   },
   {
    "name": "Giant, Mountain",
    "page": 62
   },
   {
    "name": "Giant Octopus",
    "page": 80
   },
   {
    "name": "Giant, Sea",
    "page": 64
   },
   {
    "name": "Giant Spider",
    "page": 82
   },
   {
    "name": "Goblin",
    "page": 6
   },
   {
    "name": "Golem",
    "page": 142
   },
   {
    "name": "Griffon",
    "page": 84
   },
   {
    "name": "Guardian Demon",
    "page": 144
   },
   {
    "name": "Harpy",
    "page": 24
   },
   {
    "name": "Hatchling Dragon",
    "page": 124
   },
   {
    "name": "Hippogriff",
    "page": 86
   },
   {
    "name": "Hobgoblin",
    "page": 8
   },
   {
    "name": "Hydra",
    "page": 88
   },
   {
    "name": "Karkion",
    "page": 26
   },
   {
    "name": "Lindworm",
    "page": 132
   },
   {
    "name": "Living Dead",
    "page": 110
   },
   {
    "name": "Lizard People",
    "page": 28
   },
   {
    "name": "Manticore",
    "page": 90
   },
   {
    "name": "Medusa",
    "page": 92
   },
   {
    "name": "Mermaid",
    "page": 30
   },
   {
    "name": "Minotaur",
    "page": 32
   },
   {
    "name": "Mountain Giant",
    "page": 62
   },
   {
    "name": "Mountain Troll",
    "page": 56
   },
   {
    "name": "Mummy",
    "page": 112
   },
   {
    "name": "Naiad",
    "page": 34
   },
   {
    "name": "Octopus, Giant",
    "page": 80
   },
   {
    "name": "Ogre",
    "page": 10
   },
   {
    "name": "Onaqui",
    "page": 136
   },
   {
    "name": "Orc",
    "page": 12
   },
   {
    "name": "Pegasus",
    "page": 94
   },
   {
    "name": "Roc",
    "page": 96
   },
   {
    "name": "Satyr",
    "page": 36
   },
   {
    "name": "Sea Giant",
    "page": 64
   },
   {
    "name": "Sea Serpent",
    "page": 98
   },
   {
    "name": "Serpent, Sea",
    "page": 98
   },
   {
    "name": "Shadow Demon",
    "page": 146
   },
   {
    "name": "Skeleton",
    "page": 114
   },
   {
    "name": "Spider, Giant",
    "page": 82
   },
   {
    "name": "Spider Kin",
    "page": 48
   },
   {
    "name": "Swan Maiden",
    "page": 38
   },
   {
    "name": "Titan",
    "page": 66
   },
   {
    "name": "Tree Kin",
    "page": 40
   },
   {
    "name": "Troll, Cave",
    "page": 52
   },
   {
    "name": "Troll, Forest",
    "page": 54
   },
   {
    "name": "Troll, Mountain",
    "page": 56
   },
   {
    "name": "Vampire",
    "page": 116
   },
   {
    "name": "Werewolf",
    "page": 100
   },
   {
    "name": "Wight",
    "page": 118
   },
   {
    "name": "Will-o'-the-Wisp",
    "page": 120
   },
   {
    "name": "Worg",
    "page": 102
   },
   {
    "name": "Young Dragon",
    "page": 126
   }
  ]
 }
];
window.DB_BESTIARY_TABLES = DB_BESTIARY_TABLES;
var DB_CONDITIONS = [
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
window.DB_CONDITIONS = DB_CONDITIONS;
var DB_ENCHANTING = {
 "rules": [
  {
   "name": "Crafting magic items",
   "text": "Enchanters bind spells to items they make themselves (with Master Tanner, Master Blacksmith or Master Carpenter) or to existing items. Magic Seal isn't needed. See the Enchanting school rules for tools, casting time, duration, multiple spells, drawbacks and Permanence."
  },
  {
   "name": "Magical weapons",
   "text": "Any weapon carrying an enchanting spell counts as magical (matters for creatures only hurt by magic)."
  },
  {
   "name": "Identifying",
   "text": "Passive enchantments work without being identified. Activated ones (e.g. Hidden Weapon, Throwable) must be identified like Magic Seal items: a stretch and a Languages or magic-school roll, or a stretch being taught by someone who knows (no roll)."
  },
  {
   "name": "Wearing & WP",
   "text": "A magic item works only when used as intended — weapon at hand, cap on head, ring on finger; carrying it in the inventory isn't enough. Using an enchanted item costs no WP (unlike Magic Seal spells)."
  },
  {
   "name": "Destroying magic items",
   "text": "A broken item (e.g. a weapon or shield damaged past its durability) stops working, but its magic returns when repaired with a successful Crafting roll. An item with Permanence can only be destroyed for good with Counter Ritual (p.12)."
  },
  {
   "name": "Mages and metal",
   "text": "Enchanters may enchant metal items, but mages still can't cast while using metal weapons, shields or armor. Weapons of dragon glass or demonic matter don't hinder spellcasting."
  },
  {
   "name": "Dragon glass",
   "text": "Obsidian. Only bladed weapons and arrowheads; no armor. Rare supply, cost ×10 of the metal version, durability halved (round up). A Master Blacksmith must pass a Crafting roll to make one; on failure the glass shatters and the WP are lost. A mage who starts with a knife has a dragon glass knife."
  },
  {
   "name": "Demonic matter",
   "text": "Pitch-black matter from Chaos or other otherworldly realms. Weapons and armor of it have the same stats as metal ones and don't hinder spellcasting. Unique supply; forging it needs the special heroic ability Demonsmith."
  }
 ],
 "drawbacks": [
  {
   "name": "Cumbersome",
   "condition": "Dazed",
   "text": "While you carry the item (even in inventory) you are Dazed and can't remove it by any means, magic included."
  },
  {
   "name": "Dark Presence",
   "condition": "Disheartened",
   "text": "While you carry the item (even in inventory) you are Disheartened and can't remove it by any means, magic included."
  },
  {
   "name": "Death Wish",
   "condition": "Sickly",
   "text": "While you carry the item (even in inventory) you are Sickly and can't remove it by any means, magic included."
  },
  {
   "name": "Exhausting",
   "condition": "Exhausted",
   "text": "While you carry the item (even in inventory) you are Exhausted and can't remove it by any means, magic included."
  },
  {
   "name": "Infuriating",
   "condition": "Angry",
   "text": "While you carry the item (even in inventory) you are Angry and can't remove it by any means, magic included."
  },
  {
   "name": "Life Leech",
   "perUse": {
    "hp": 1
   },
   "notFor": [
    "armor"
   ],
   "text": "Lose 1 HP each time you use the item. Not allowed on armor."
  },
  {
   "name": "Mind Leech",
   "perUse": {
    "wp": 1
   },
   "text": "Lose 1 WP each time you use the item (including when armor absorbs damage). With no WP left its magic can't be used."
  },
  {
   "name": "Random",
   "text": "Only for items with two or more spells (enchantments or Magic Seal spells). Each use activates just one of them, chosen at random. Magic Seal and Permanence are unaffected."
  },
  {
   "name": "Terrifying",
   "text": "Each use (including when armor absorbs damage) requires a WIL roll (not an action); fail and roll on the Fear Table."
  },
  {
   "name": "Twin",
   "text": "The enchantment is split over two (usually matching) items and only works when both are held/worn as intended; separately they're mundane. Three or more items still count as one drawback."
  },
  {
   "name": "Unreliable",
   "text": "Roll D4 each use: on a 1 the magic fails. You can't take back the action."
  }
 ],
 "artifacts": [
  {
   "name": "The Scepter of Eledain",
   "page": 123,
   "base": "Mace (mastercrafted)",
   "material": "magic-infused jade",
   "text": "Jade mace of the dragon emperor Eledain, long mistaken for a scepter; wielded down the centuries by an orc chieftain, a king and a baroness.",
   "clues": "Either buried with Baron Komposta in barrow fields now crawling with undead, or retaken by the orc chieftain Bluthor Horn-Ear, now conquering in the north.",
   "powers": [
    "Epic Weapon power level 3 (damage 2D4+6)",
    "Enchanted Weapon power level 2 (Dragon on 1–3)",
    "Heavy Hitter (damaged foes become Dazed)",
    "Unbreakable power level 1 (durability 24)",
    "Luminous (glows red with a demon within 30 m)",
    "Permanence"
   ],
   "stats": {
    "damage": "2D4+6",
    "durability": 24,
    "dragonRange": "1–3"
   }
  },
  {
   "name": "Kyria's Stormcleavers",
   "page": 124,
   "base": "Battleaxe ×2 (mastercrafted)",
   "text": "Twin battleaxes with lightning-bolt-shaped beaks, said to be a dwarven gift to the shieldmaiden Kyria and to command the weather.",
   "clues": "Reliable recent sightings put them with an orc pirate captain called Boltman Blitz.",
   "powers": [
    "Thunderbolt (animism) power level 2 with Magic Seal",
    "Weather Mastery (animism) power level 2 with Magic Seal",
    "Unbreakable power level 1 (durability 21)",
    "Keen Edge power level 2 (armor −2 steps)",
    "Twin drawback (must be wielded together)",
    "Permanence"
   ],
   "stats": {
    "durability": 21,
    "armorPierce": 2
   },
   "drawbacks": [
    "Twin"
   ]
  },
  {
   "name": "The Short Bow of Thulor",
   "page": 124,
   "base": "Short Bow (mastercrafted)",
   "material": "giant's bone",
   "text": "Bone bow made from the giant Thulor's fibula, given to the dwarf Bolgo Bolgklint, later a famed spider hunter.",
   "clues": "Possibly carried by Alavain, the human-hating leader of the raiding elven warband A'lal Roac.",
   "powers": [
    "Enchanted Weapon power level 3 (Dragon on 1–4)",
    "Farshot power level 3 (range 120 m)",
    "Unbreakable power level 2 (durability 24)",
    "Seeking Arrow (attacks can't suffer banes)",
    "Mind Leech drawback (each attack costs 1 WP)",
    "Permanence"
   ],
   "stats": {
    "range": 120,
    "durability": 24,
    "dragonRange": "1–4"
   },
   "drawbacks": [
    "Mind Leech"
   ]
  },
  {
   "name": "Riselda's Stinger Belt",
   "page": 124,
   "base": "Leather belt",
   "text": "Engraved belt with a gold scorpion buckle and a ruby from which a scorpion tail lashes out on command — source of the Scorpion Princess legend.",
   "clues": "The artifact-collecting necromancer Nasamael the Dead reportedly threatened the Countess of Sturgard with a venomous tail.",
   "powers": [
    "Hidden Weapon power level 2 (damage D10)",
    "Poison Sting power level 2 (lethal poison, potency 15)",
    "Keen Edge power level 2 (armor −2 steps)",
    "Permanence"
   ],
   "stats": {
    "damage": "D10",
    "poison": {
     "type": "lethal",
     "potency": 15
    },
    "armorPierce": 2
   }
  },
  {
   "name": "The Throwing Staff of Eldinor",
   "page": 126,
   "base": "Staff",
   "material": "pearwood",
   "text": "Plain pearwood staff with a draconic rune and copper ferrule, carried by Eledain's monk son Eldinor against demon cults.",
   "clues": "Probably still lies in the fogs of Deathmire, where Eldinor fell.",
   "powers": [
    "Shockwave (mentalism) power level 2 with Magic Seal",
    "Enchanted Weapon power level 2 (Dragon on 1–3)",
    "Throwable power level 2 (thrown STR × 2 m)",
    "Unbreakable power level 1 (durability 18)",
    "Permanence"
   ],
   "stats": {
    "durability": 18,
    "dragonRange": "1–3",
    "thrownRange": "STR×2"
   }
  },
  {
   "name": "The Scale Armor of Arknarath",
   "page": 126,
   "base": "Plate Armor",
   "material": "archdragon scales",
   "text": "Unadorned indigo breastplate supposedly forged from seven of the archdragon Arknarath's scales for a nameless knight.",
   "clues": "A brutal northern tyrant called the Pansár wore indigo armor of 'otherworldly metal'; it may lie in a forgotten northern crypt or with a local ruler.",
   "powers": [
    "Longstrider (mentalism) power level 1 with Magic Seal",
    "Shield Rune (symbolism) power level 2 with Magic Seal",
    "Epic Armor power level 2 (armor rating 8)",
    "Supple Armor (no bane on Evade)",
    "Permanence"
   ],
   "stats": {
    "armor": 8
   }
  },
  {
   "name": "The Quiver of Galfingol",
   "page": 126,
   "base": "Quiver of arrows",
   "material": "dark hardwood arrows with elven steel heads",
   "text": "Elven heirloom quiver of the marksman Galfingol, whose arrows ensnared demonic warriors for King Ilvariel's troops.",
   "clues": "Rathvan Thundercloud, leader of the Red Bands mercenaries, is said to ensnare foes with his arrows.",
   "powers": [
    "Ensnaring Roots (animism) power level 2 with Magic Seal",
    "Enchanted Weapon power level 1 (Dragon on 1–2)",
    "Unreliable drawback (1 in 4 the magic fails)",
    "Permanence"
   ],
   "stats": {
    "dragonRange": "1–2"
   },
   "drawbacks": [
    "Unreliable"
   ]
  },
  {
   "name": "The Tongue of Bahlbadash",
   "page": 128,
   "base": "Whip",
   "text": "Oily, barbed whip dripping acid slime, made from the tongue of the archdemon general Bahlbadash and turned against his allies.",
   "clues": "The goblin queen Gumligum, ruling by terror around the ruined castle of Ridderdaal, is said to whip her slaves with acid.",
   "powers": [
    "Bloodsucker (steals WP equal to half the damage)",
    "Epic Weapon power level 3 (damage D8+6)",
    "Heavy Hitter (damaged foes become Dazed)",
    "Keen Edge power level 3 (armor −3 steps)",
    "Permanence"
   ],
   "stats": {
    "damage": "D8+6",
    "armorPierce": 3,
    "skill": "Brawling",
    "range": 4,
    "features": [
     "Slashing",
     "Toppling"
    ],
    "noParry": true
   }
  },
  {
   "name": "Bourdio's Grimoire",
   "page": 128,
   "base": "Book",
   "text": "Thick leather-bound grimoire by the eccentric inventor Master Bourdio that opens to a random page, granting spells without study.",
   "clues": "Owned by the wealthy merchant prince Volmer of Arkand, who won't sell; he might trade it for a risky secret favour — or it could be stolen.",
   "powers": [
    "Lightning Bolt (animism) power level 2 with Magic Seal",
    "Heal Wound (animism) power level 2 with Magic Seal",
    "Sleep (animism) power level 2 with Magic Seal",
    "Fire Blast (elementalism) power level 2 with Magic Seal",
    "Tidal Wave (elementalism) power level 2 with Magic Seal",
    "Whirlwind (elementalism) power level 2 with Magic Seal",
    "Permanence",
    "Random drawback (roll D6 for which spell is available)"
   ],
   "randomTable": {
    "die": "D6",
    "entries": [
     "Lightning Bolt",
     "Heal Wound",
     "Sleep",
     "Fire Blast",
     "Tidal Wave",
     "Whirlwind"
    ]
   },
   "drawbacks": [
    "Random"
   ]
  },
  {
   "name": "Valagunda's Magical Critters",
   "page": 128,
   "base": "Living-looking insect/worm/spider objects",
   "text": "Magical bugs made by the troll witch Valagunda that merge with the owner's body to give powers. Each has one spell (enchantment, or another spell with Magic Seal) plus Permanence. On command, or when the owner dies, the critter leaves the body and settles in the owner's palm.",
   "clues": "Some surface at curiosity auctions in big cities; many people may unknowingly carry one.",
   "powers": [
    "Each critter: one spell + Permanence"
   ],
   "variants": [
    {
     "name": "Valagunda's Lightning Bug",
     "powers": [
      "Fleet Step power level 2"
     ]
    },
    {
     "name": "Valagunda's Ember Mite",
     "powers": [
      "Fireproof power level 2"
     ]
    },
    {
     "name": "Valagunda's Heart Flea",
     "powers": [
      "Lifesaver power level 2"
     ]
    },
    {
     "name": "Valagunda's Omen Worm",
     "powers": [
      "Divination (mentalism) power level 2 with Magic Seal"
     ]
    },
    {
     "name": "Valagunda's Spitting Spider",
     "powers": [
      "Ensnaring Roots (animism) power level 2 with Magic Seal"
     ]
    }
   ]
  }
 ],
 "materials": [
  {
   "name": "Dragon Glass",
   "aka": [
    "obsidian",
    "volcanic glass"
   ],
   "page": 119,
   "supply": "Rare",
   "costMultiplier": 10,
   "durability": "half, rounded up",
   "allowed": "bladed weapons and arrowheads only; no armor",
   "metal": false,
   "craft": "Master Blacksmith + Crafting roll; failure shatters the glass and loses the WP",
   "text": "Mages can use it without hindering spellcasting. A mage who starts the game with a knife has a dragon glass one."
  },
  {
   "name": "Demonic Matter",
   "page": 119,
   "supply": "Unique",
   "costMultiplier": null,
   "durability": "as metal",
   "allowed": "weapons and armor (same stats as metal equivalents)",
   "metal": false,
   "craft": "Requires the heroic ability Demonsmith",
   "text": "Pitch-black otherworldly matter; extremely hard to find unwrought. Mages can use it without hindering spellcasting."
  }
 ],
 "source": "magic"
};
window.DB_ENCHANTING = DB_ENCHANTING;
var DB_FAMILIAR_RULES = {
 "spell": "Familiar",
 "greaterSpell": "Greater Familiar",
 "page": 9,
 "source": "magic",
 "text": "The Familiar ritual binds a willing spirit of the dead into a freshly dead vertebrate between mouse and cat/raven/dog size. It keeps the animal's stats, has no WP of its own (some abilities spend yours), must obey you, talks with you telepathically at any range, and acts on your turn before or after you (move + action). Duration: shift / week / rest of your life at power level 1/2/3. Only one familiar at a time; you can dismiss it to dust to make another. If it is killed (not dismissed) your max WP drops by 1 (Focused can restore it). Immune to Dispel; Counter Ritual expels the spirit, counting as killing it. It picks two abilities from the list (four for a Greater Familiar; an upgraded familiar keeps its two and gains two); one may be replaced by the familiar ability of a school you have a skill level in. Harmonists can't learn general magic.",
 "abilityCount": {
  "familiar": 2,
  "greaterFamiliar": 4,
  "upgradeAdds": 2,
  "schoolAbilityReplaces": 1
 },
 "wpLossOnDeath": 1,
 "abilities": [
  {
   "name": "Distract",
   "text": "Reaction: the familiar dashes or flies to an NPC within its Movement just as they make a skill roll, giving them a bane. Costs you 2 WP; uses no action for you or it. Not on monsters."
  },
  {
   "name": "Elusive",
   "text": "Works like the Fast Footwork heroic ability (Rulebook p.37): the familiar may dodge without spending an action, for 2 WP from you."
  },
  {
   "name": "Healer",
   "text": "During a round rest, the familiar removes one condition from you or a party member (cleaning, soothing, encouraging). Its action; costs you 1 WP."
  },
  {
   "name": "Magic Tricks",
   "text": "Through your link the familiar performs any magic trick you know: costs it an action (not you) and you the normal 1 WP."
  },
  {
   "name": "Shared Will",
   "text": "At a shift rest, assign up to half your max WP to the familiar; track yours and its WP separately. You can spend its WP while it lives and is in sight, and both pools recover separately (effectively double recovery). WP-draining effects hit each pool separately. If it dies, its max and current WP return to you at once; you may also take them back at a shift rest."
  },
  {
   "name": "Source of Will",
   "text": "Your max WP is +2 while the familiar lives and is within your sight."
  },
  {
   "name": "Trained",
   "text": "The familiar has one of BEAST LORE, BUSHCRAFT, HUNTING & FISHING, MYTHS & LEGENDS, PERFORMANCE or SPOT HIDDEN at skill level 15. Can be taken more than once."
  },
  {
   "name": "Trip",
   "text": "When another creature moves, the familiar dashes or flies at them: they must pass EVADE with a bane or fall prone, ending their movement. They must be within the familiar's normal Movement, measured to where the trip happens. Costs you 2 WP; no action for you or it. Not on monsters."
  }
 ],
 "creatures": [
  {
   "name": "Rat",
   "movement": 10,
   "hp": 3,
   "attack": "Bite (skill 8, D2)",
   "skills": "Awareness 14, Evade 16, Sneaking 14"
  },
  {
   "name": "Cat",
   "movement": 12,
   "hp": 4,
   "attack": "Bite (skill 8, D3)",
   "skills": "Awareness 12, Evade 14, Sneaking 16"
  },
  {
   "name": "Dog",
   "movement": 14,
   "hp": 8,
   "attack": "Bite (skill 12, D8)",
   "skills": "Awareness 14, Evade 10"
  },
  {
   "name": "Fox",
   "movement": 10,
   "hp": 6,
   "attack": "Bite (skill 12, D6)",
   "skills": "Awareness 12, Evade 10, Sneaking 14"
  },
  {
   "name": "Grass Snake",
   "movement": 8,
   "hp": 3,
   "attack": "Bite (skill 12, D3)",
   "skills": "Awareness 10, Evade 14, Sneaking 16"
  },
  {
   "name": "Raven",
   "movement": 18,
   "hp": 4,
   "attack": "Beak (skill 10, D4)",
   "skills": "Awareness 16, Evade 10"
  }
 ],
 "schoolAbilities": [
  {
   "school": "Animism",
   "name": "Heal Wound",
   "page": 16,
   "text": "The familiar can cast HEAL WOUND at skill level 15, once per round on your turn, paying with your WP."
  },
  {
   "school": "Demonology",
   "name": "Acid Slime",
   "page": 26,
   "text": "Once per shift the familiar spits a ball of corrosive slime at a foe within 2 m: hits automatically (can be EVADED), 2D6 damage at once plus D6 more on the victim's next turn unless they spend an action wiping it off."
  }
 ]
};
window.DB_FAMILIAR_RULES = DB_FAMILIAR_RULES;
var DB_GEAR = [
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
  "effect": "Protects against some journey mishaps.",
  "source": "core"
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
  "effect": "Protects against some journey mishaps.",
  "source": "core"
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
  "effect": "Boon on CHA-based skills when the GM finds it fitting.",
  "source": "core"
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
  "effect": "Boon on Bushcraft rolls to resist cold.",
  "source": "core"
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
  "effect": "Bane on CHA-based skills when the GM finds it fitting.",
  "source": "core"
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
  "effect": "Needed to avoid a bane on CHA-based skills. Every character starts with a set (not recorded).",
  "source": "core"
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
  },
  "source": "core"
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
  },
  "source": "core"
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
  },
  "source": "core"
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
  },
  "source": "core"
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
  },
  "source": "core"
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
  },
  "source": "core"
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
  "effect": "Boon on INT rolls for maths problems.",
  "source": "core"
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
  "effect": "Needed to avoid a bane on rolls against cold.",
  "source": "core"
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
  "effect": "Opposed INT roll decides the winner.",
  "source": "core"
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
  "effect": "Chance decides the winner.",
  "source": "core"
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
  "effect": "Boon on Bushcraft rolls for cooking.",
  "source": "core"
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
  "food": true,
  "source": "core"
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
  "effect": "Secures a rope; thrown and caught with an Acrobatics roll up to STR metres (STR×2 with a bane).",
  "source": "core"
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
  "effect": "Boon on Sleight of Hand to pick locks.",
  "source": "core"
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
  "effect": "Needed to avoid a bane on Sleight of Hand to pick locks.",
  "source": "core"
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
  "effect": "Boon on Spot Hidden.",
  "source": "core"
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
  "effect": "Needed to avoid a bane on Bushcraft when leading the way on a journey.",
  "source": "core"
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
  "usable": "action",
  "source": "core"
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
  "effect": "Locks a door or chest; 20 HP, armor 5.",
  "source": "core"
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
  "doses": 10,
  "source": "core"
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
  "effect": "Opposed Bluffing roll decides the winner.",
  "source": "core"
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
  "metal": true,
  "source": "core"
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
  "quiver": true,
  "source": "core"
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
  "effect": "10 metres. Boon on Acrobatics for climbing when secured.",
  "source": "core"
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
  "effect": "10 metres. Boon on Acrobatics for climbing when secured.",
  "source": "core"
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
  "effect": "Needed to avoid a bane when fighting on horseback.",
  "source": "core"
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
  "effect": "Needed to avoid a bane on Bushcraft when making camp. (Kits call it a sleeping pelt.)",
  "source": "core"
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
  "effect": "Boon on Bushcraft when leading the way on a journey.",
  "source": "core"
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
  "effect": "Sleeps two; boon on Bushcraft to make camp (one rolls, others may help).",
  "source": "core"
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
  "effect": "Sleeps six; boon on Bushcraft to make camp (one rolls, others may help).",
  "source": "core"
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
  "effect": "Heard up to 100 m away.",
  "source": "core"
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
  "focus": true,
  "source": "core"
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
  "effect": "Boon on skill rolls in its subject; price varies by subject.",
  "source": "core"
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
  "focus": true,
  "source": "core"
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
  "focus": true,
  "source": "core"
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
  "grimoire": true,
  "source": "core"
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
  "focus": true,
  "source": "core"
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
  "effect": "Blank; can serve as a grimoire.",
  "source": "core"
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
  "focus": true,
  "source": "core"
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
  "effect": "Spells can be written on it.",
  "source": "core"
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
  "effect": "Spells can be written on it.",
  "source": "core"
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
  "effect": "For writing down spells.",
  "source": "core"
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
  "focus": true,
  "source": "core"
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
  "focus": true,
  "source": "core"
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
  "effect": "Needed to light torches, candles and lanterns and to make fire.",
  "source": "core"
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
  "doses": 10,
  "source": "core"
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
  },
  "source": "core"
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
  },
  "source": "core"
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
  },
  "source": "core"
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
  },
  "source": "core"
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
  "effect": "2D6 damage to a door or wall, hitting automatically without risk to itself.",
  "source": "core"
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
  "effect": "2D4 damage to a door or wall, hitting automatically without risk to itself.",
  "source": "core"
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
  "effect": "Mends clothes with a Crafting roll.",
  "source": "core"
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
  "effect": "2D8 damage to a door or wall, hitting automatically without risk to itself.",
  "source": "core"
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
  "effect": "Cuts metal or wood in a stretch.",
  "source": "core"
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
  "effect": "Halves digging time.",
  "source": "core"
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
  "effect": "2D10 damage to a door or wall, hitting automatically without risk to itself.",
  "source": "core"
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
  "effect": "Used for Crafting (needed for Master Blacksmith).",
  "source": "core"
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
  "effect": "Used for Crafting (needed for Master Carpenter).",
  "source": "core"
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
  "effect": "Used for Crafting (needed for Master Tanner).",
  "source": "core"
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
  "capacity": 2,
  "source": "core"
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
  "effect": "Holds 15 weight units; 10 HP, armor 3.",
  "source": "core"
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
  "effect": "Holds 10 weight units.",
  "source": "core"
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
  "effect": "Holds 1 unit of liquid.",
  "source": "core"
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
  "effect": "Holds up to 5 units of liquid.",
  "source": "core"
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
  "effect": "Holds 20 weight units; 25 HP, armor 5.",
  "source": "core"
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
  "effect": "Holds 1 unit of liquid.",
  "source": "core"
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
  "effect": "An animal's carrying capacity +2; at most two per animal.",
  "source": "core"
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
  "poison": "lethal",
  "source": "core"
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
  "poison": "paralyzing",
  "source": "core"
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
  "poison": "sleeping",
  "source": "core"
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
  "consumable": true,
  "source": "core"
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
  "usable": "action",
  "source": "core"
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
  "doses": 10,
  "source": "core"
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
  "effect": "Boon on Healing rolls to save a life.",
  "source": "core"
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
  "effect": "Heals a condition of your choice in a stretch; once per day.",
  "source": "core"
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
  "effect": "Stats as a typical guard.",
  "source": "core"
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
  "effect": "Covers a day's food.",
  "source": "core"
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
  "effect": "Undoes the effect of torn clothes.",
  "source": "core"
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
  "effect": "Delivers a message.",
  "source": "core"
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
  "effect": "Covers a day's food.",
  "source": "core"
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
  "effect": "After two goblets in a shift, each further goblet gives a condition of your choice.",
  "source": "core"
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
  "effect": "Heals a chosen condition in a stretch; once per week.",
  "source": "core"
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
  "effect": "Healing rolls succeed automatically.",
  "source": "core"
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
  "effect": "A shift rest without a Bushcraft roll.",
  "source": "core"
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
  "effect": "A shift rest without a Bushcraft roll, but roll D4 each shift — on a 1 someone's snoring keeps the room awake.",
  "source": "core"
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
  "effect": "A shift rest without a Bushcraft roll.",
  "source": "core"
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
  "effect": "Covers a day's food.",
  "source": "core"
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
  "effect": "Lets you pass.",
  "source": "core"
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
  "effect": "Travel to a set destination.",
  "source": "core"
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
  "effect": "After three tankards in a shift, each further tankard gives a condition of your choice.",
  "source": "core"
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
  "effect": "A shift of teaching grants an extra advancement roll.",
  "source": "core"
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
  "effect": "Used for hunting.",
  "source": "core"
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
  "effect": "D4 food rations when fishing.",
  "source": "core"
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
  "effect": "D6 food rations when fishing.",
  "source": "core"
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
  "effect": "Used for hunting; one use only.",
  "source": "core"
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
  },
  "source": "core"
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
  },
  "source": "core"
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
  },
  "source": "core"
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
  },
  "source": "core"
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
  },
  "source": "core"
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
  "effect": "One ration of food when slaughtered (cook the meat).",
  "source": "core"
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
  "combatTrained": true,
  "source": "core"
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
  "effect": "D4 rations of milk a day, 2D10 rations when slaughtered (cook the meat).",
  "source": "core"
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
  },
  "source": "core"
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
  "effect": "Protects its owner (dog stats).",
  "source": "core"
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
  "effect": "Flies home to its dovecote when released.",
  "source": "core"
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
  "effect": "2D6 rations when slaughtered (cook the meat).",
  "source": "core"
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
  "mount": true,
  "source": "core"
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
  "effect": "2D4 rations when slaughtered (cook the meat).",
  "source": "core"
 },
 {
  "id": "small-field-laboratory",
  "category": "Studies & Magic",
  "name": "Small Field Laboratory",
  "cost": {
   "amount": 50,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 1,
  "effect": "Portable alchemy tools (cauldron, mortar, flasks, vials) — required to brew alchemical recipes. New alchemists start with one.",
  "alchemyLab": "field",
  "page": 108,
  "source": "magic"
 },
 {
  "id": "alchemical-laboratory",
  "category": "Studies & Magic",
  "name": "Alchemical Laboratory",
  "cost": {
   "amount": 500,
   "unit": "gold",
   "note": "at least"
  },
  "supply": null,
  "weight": null,
  "effect": "A fully equipped room-sized lab: boon on Alchemy rolls when brewing. Not portable.",
  "alchemyLab": "large",
  "boon": [
   "Alchemy"
  ],
  "page": 108,
  "source": "magic"
 },
 {
  "id": "bat-blood",
  "category": "Alchemy Ingredients",
  "name": "Bat Blood",
  "cost": {
   "amount": 2,
   "unit": "silver"
  },
  "supply": "Uncommon",
  "weight": 0,
  "effect": "Used in: Paralyzing Poison.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "bear-tooth",
  "category": "Alchemy Ingredients",
  "name": "Bear Tooth",
  "cost": {
   "amount": 4,
   "unit": "silver"
  },
  "supply": "Uncommon",
  "weight": 0,
  "effect": "Used in: Liquid Courage.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "boar-tusk",
  "category": "Alchemy Ingredients",
  "name": "Boar Tusk",
  "cost": {
   "amount": 2,
   "unit": "silver"
  },
  "supply": "Uncommon",
  "weight": 0,
  "effect": "Used in: Invigorating Decoction.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "charcoal",
  "category": "Alchemy Ingredients",
  "name": "Charcoal",
  "cost": {
   "amount": 5,
   "unit": "copper"
  },
  "supply": "Common",
  "weight": 0,
  "effect": "Used in: Puff Bomb, Smokescreen, Sunflash, Explosive Orb, Toxic Mist.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "deer-antler",
  "category": "Alchemy Ingredients",
  "name": "Deer Antler",
  "cost": {
   "amount": 2,
   "unit": "silver"
  },
  "supply": "Uncommon",
  "weight": 0,
  "effect": "Used in: Medicinal Water.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "demon-blood",
  "category": "Alchemy Ingredients",
  "name": "Demon Blood",
  "cost": {
   "amount": 10,
   "unit": "gold"
  },
  "supply": "Unique",
  "weight": 0,
  "effect": "Used in: Philosopher's Stone.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "dragon-blood",
  "category": "Alchemy Ingredients",
  "name": "Dragon Blood",
  "cost": {
   "amount": 10,
   "unit": "gold"
  },
  "supply": "Unique",
  "weight": 0,
  "effect": "Used in: Philosopher's Stone.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "dragon-tooth",
  "category": "Alchemy Ingredients",
  "name": "Dragon Tooth",
  "cost": {
   "amount": 10,
   "unit": "gold"
  },
  "supply": "Unique",
  "weight": 0,
  "effect": "Alchemy ingredient.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "fairy-dust",
  "category": "Alchemy Ingredients",
  "name": "Fairy Dust",
  "cost": {
   "amount": 8,
   "unit": "gold"
  },
  "supply": "Unique",
  "weight": 0,
  "effect": "Used in: Homunculus.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "general-herbs",
  "category": "Alchemy Ingredients",
  "name": "General Herbs",
  "cost": {
   "amount": 2,
   "unit": "silver"
  },
  "supply": "Common",
  "weight": 0,
  "effect": "Basic ingredient in many recipes. Used in: Focus Tonic, Herbal Concoction, Invigorating Decoction, Liquid Courage, Medicinal Water, Sleeping Poison, Soothing Brew, Spiritlifter, Antidote, Healing Draught, Love Potion, Paralyzing Poison, Drops of Strength, Elixir of Wisdom, Healing Potion, Lethal Poison, Nimble Nectar, Tincture of Beauty, Battle Fumes, Healing Tincture, Healing Vapors, Elixir of Life.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "ghoul-bone",
  "category": "Alchemy Ingredients",
  "name": "Ghoul Bone",
  "cost": {
   "amount": 1,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Used in: Corrosive Sludge, Homunculus.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "giant-blood",
  "category": "Alchemy Ingredients",
  "name": "Giant Blood",
  "cost": {
   "amount": 3,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Used in: Drops of Strength, Battle Fumes.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "griffon-feather",
  "category": "Alchemy Ingredients",
  "name": "Griffon Feather",
  "cost": {
   "amount": 5,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Used in: Nimble Nectar.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "hobgoblin-blood",
  "category": "Alchemy Ingredients",
  "name": "Hobgoblin Blood",
  "cost": {
   "amount": 5,
   "unit": "silver"
  },
  "supply": "Uncommon",
  "weight": 0,
  "effect": "Used in: Healing Draught.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "hydra-blood",
  "category": "Alchemy Ingredients",
  "name": "Hydra Blood",
  "cost": {
   "amount": 6,
   "unit": "gold"
  },
  "supply": "Unique",
  "weight": 0,
  "effect": "Used in: Healing Tincture, Elixir of Life.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "iron-filings",
  "category": "Alchemy Ingredients",
  "name": "Iron Filings",
  "cost": {
   "amount": 1,
   "unit": "silver"
  },
  "supply": "Common",
  "weight": 0,
  "effect": "Used in: Explosive Orb, Create Gold.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "manticore-spike",
  "category": "Alchemy Ingredients",
  "name": "Manticore Spike",
  "cost": {
   "amount": 2,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Used in: Sunflash.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "minotaur-horn",
  "category": "Alchemy Ingredients",
  "name": "Minotaur Horn",
  "cost": {
   "amount": 4,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Not used by any recipe in the book. Alchemy ingredient.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "nymph-tears",
  "category": "Alchemy Ingredients",
  "name": "Nymph Tears",
  "cost": {
   "amount": 3,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Used in: Love Potion.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "octopus-ink",
  "category": "Alchemy Ingredients",
  "name": "Octopus Ink",
  "cost": {
   "amount": 5,
   "unit": "silver"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Used in: Smokescreen.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "saltpeter",
  "category": "Alchemy Ingredients",
  "name": "Saltpeter",
  "cost": {
   "amount": 1,
   "unit": "silver"
  },
  "supply": "Uncommon",
  "weight": 0,
  "effect": "Used in: Stun Powder, Puff Bomb, Smokescreen, Sunflash, Battle Fumes, Explosive Orb, Healing Vapors, Toxic Mist.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "sea-serpent-bile",
  "category": "Alchemy Ingredients",
  "name": "Sea Serpent Bile",
  "cost": {
   "amount": 2,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Used in: Antidote.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "spider-venom",
  "category": "Alchemy Ingredients",
  "name": "Spider Venom",
  "cost": {
   "amount": 3,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Used in: Sleeping Poison, Lethal Poison, Toxic Mist.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "sulfur",
  "category": "Alchemy Ingredients",
  "name": "Sulfur",
  "cost": {
   "amount": 3,
   "unit": "silver"
  },
  "supply": "Uncommon",
  "weight": 0,
  "effect": "Used in: Spiritlifter, Stun Powder, Lock Acid, Puff Bomb, Smokescreen, Corrosive Sludge, Sunflash, Battle Fumes, Explosive Orb, Healing Vapors, Toxic Mist.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "troll-bile",
  "category": "Alchemy Ingredients",
  "name": "Troll Bile",
  "cost": {
   "amount": 2,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Used in: Lock Acid, Corrosive Sludge.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "troll-blood",
  "category": "Alchemy Ingredients",
  "name": "Troll Blood",
  "cost": {
   "amount": 1,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Used in: Healing Potion, Healing Vapors.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "troll-tooth",
  "category": "Alchemy Ingredients",
  "name": "Troll Tooth",
  "cost": {
   "amount": 1,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Used in: Elixir of Wisdom.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "vampire-blood",
  "category": "Alchemy Ingredients",
  "name": "Vampire Blood",
  "cost": {
   "amount": 7,
   "unit": "gold"
  },
  "supply": "Unique",
  "weight": 0,
  "effect": "Used in: Tincture of Beauty.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "wolf-blood",
  "category": "Alchemy Ingredients",
  "name": "Wolf Blood",
  "cost": {
   "amount": 3,
   "unit": "silver"
  },
  "supply": "Uncommon",
  "weight": 0,
  "effect": "Used in: Focus Tonic.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "worg-tooth",
  "category": "Alchemy Ingredients",
  "name": "Worg Tooth",
  "cost": {
   "amount": 5,
   "unit": "silver"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Not used by any recipe in the book. Alchemy ingredient.",
  "ingredient": true,
  "page": 109,
  "source": "magic"
 },
 {
  "id": "focus-tonic",
  "category": "Alchemical Substances",
  "name": "Focus Tonic",
  "cost": {
   "amount": 5,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Removes the Dazed condition.",
  "alchemy": true,
  "rank": 1,
  "page": 110,
  "source": "magic"
 },
 {
  "id": "invigorating-decoction",
  "category": "Alchemical Substances",
  "name": "Invigorating Decoction",
  "cost": {
   "amount": 5,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Removes the Exhausted condition.",
  "alchemy": true,
  "rank": 1,
  "page": 110,
  "source": "magic"
 },
 {
  "id": "liquid-courage",
  "category": "Alchemical Substances",
  "name": "Liquid Courage",
  "cost": {
   "amount": 5,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Removes the Scared condition.",
  "alchemy": true,
  "rank": 1,
  "page": 110,
  "source": "magic"
 },
 {
  "id": "medicinal-water",
  "category": "Alchemical Substances",
  "name": "Medicinal Water",
  "cost": {
   "amount": 5,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Removes the Sickly condition.",
  "alchemy": true,
  "rank": 1,
  "page": 110,
  "source": "magic"
 },
 {
  "id": "soothing-brew",
  "category": "Alchemical Substances",
  "name": "Soothing Brew",
  "cost": {
   "amount": 5,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Removes the Angry condition.",
  "alchemy": true,
  "rank": 1,
  "page": 110,
  "source": "magic"
 },
 {
  "id": "spiritlifter",
  "category": "Alchemical Substances",
  "name": "Spiritlifter",
  "cost": {
   "amount": 5,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Removes the Disheartened condition.",
  "alchemy": true,
  "rank": 1,
  "page": 110,
  "source": "magic"
 },
 {
  "id": "stun-powder",
  "category": "Alchemical Substances",
  "name": "Stun Powder",
  "cost": {
   "amount": 4,
   "unit": "gold"
  },
  "supply": "Uncommon",
  "weight": 0,
  "effect": "Blow it in the face of someone within 4 m with a Brawling roll; on a hit they become Dazed.",
  "alchemy": true,
  "rank": 1,
  "page": 110,
  "source": "magic"
 },
 {
  "id": "antidote",
  "category": "Alchemical Substances",
  "name": "Antidote",
  "cost": {
   "amount": 20,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Negates a poison's full effect (core p.52); any limited effect still applies.",
  "alchemy": true,
  "rank": 2,
  "page": 110,
  "source": "magic"
 },
 {
  "id": "healing-draught",
  "category": "Alchemical Substances",
  "name": "Healing Draught",
  "cost": {
   "amount": 10,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Heals D6 HP at once.",
  "alchemy": true,
  "rank": 2,
  "page": 110,
  "source": "magic"
 },
 {
  "id": "lock-acid",
  "category": "Alchemical Substances",
  "name": "Lock Acid",
  "cost": {
   "amount": 10,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Eats through and destroys a lock or other small metal object over one stretch.",
  "alchemy": true,
  "rank": 2,
  "page": 111,
  "source": "magic"
 },
 {
  "id": "love-potion",
  "category": "Alchemical Substances",
  "name": "Love Potion",
  "cost": {
   "amount": 20,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "For one shift, CHA-based skill rolls aimed at the drinker get a boon.",
  "alchemy": true,
  "rank": 2,
  "page": 111,
  "source": "magic"
 },
 {
  "id": "puff-bomb",
  "category": "Alchemical Substances",
  "name": "Puff Bomb",
  "cost": {
   "amount": 10,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Throw up to STR meters (Brawling roll): D8 fire damage on a hit. Also lights a campfire.",
  "alchemy": true,
  "rank": 2,
  "page": 111,
  "source": "magic"
 },
 {
  "id": "smokescreen",
  "category": "Alchemical Substances",
  "name": "Smokescreen",
  "cost": {
   "amount": 10,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Smoke bomb thrown up to STR meters: a 4 m radius cloud blocks all sight; everyone inside acts as in total darkness (core p.52). Each round start roll D4 outdoors / D8 indoors — on a 1 it clears.",
  "alchemy": true,
  "rank": 2,
  "page": 111,
  "source": "magic"
 },
 {
  "id": "corrosive-sludge",
  "category": "Alchemical Substances",
  "name": "Corrosive Sludge",
  "cost": {
   "amount": 25,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Thick acid thrown up to STR meters (Brawling roll): D8 damage on a hit, and worn armor permanently loses that much armor rating (natural armor unaffected).",
  "alchemy": true,
  "rank": 3,
  "page": 111,
  "source": "magic"
 },
 {
  "id": "drops-of-strength",
  "category": "Alchemical Substances",
  "name": "Drops of Strength",
  "cost": {
   "amount": 60,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "For one shift STR becomes 18 (damage bonus +D6, carrying capacity 9). Also removes Exhausted and gives a boon on all STR-based skill rolls (skill levels don't change).",
  "alchemy": true,
  "rank": 3,
  "page": 112,
  "source": "magic"
 },
 {
  "id": "elixir-of-wisdom",
  "category": "Alchemical Substances",
  "name": "Elixir of Wisdom",
  "cost": {
   "amount": 60,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Boon on all INT-based skill rolls for one shift; also removes Angry.",
  "alchemy": true,
  "rank": 3,
  "page": 112,
  "source": "magic"
 },
 {
  "id": "nimble-nectar",
  "category": "Alchemical Substances",
  "name": "Nimble Nectar",
  "cost": {
   "amount": 60,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "For one shift AGL becomes 18 (damage bonus +D6, movement adjusted per core p.25). Also removes Dazed and gives a boon on all AGL-based skill rolls (skill levels don't change).",
  "alchemy": true,
  "rank": 3,
  "page": 112,
  "source": "magic"
 },
 {
  "id": "sunflash",
  "category": "Alchemical Substances",
  "name": "Sunflash",
  "cost": {
   "amount": 30,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Thrown to the ground, it flashes: every unprepared creature within 10 m must pass an Evade roll (not an action) or be blinded, losing its next turn and unable to react until then. Nightkin also take D6 damage (armor doesn't help).",
  "alchemy": true,
  "rank": 3,
  "page": 112,
  "source": "magic"
 },
 {
  "id": "tincture-of-beauty",
  "category": "Alchemical Substances",
  "name": "Tincture of Beauty",
  "cost": {
   "amount": 80,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Boon on all CHA-based skill rolls for one shift; also removes Disheartened.",
  "alchemy": true,
  "rank": 3,
  "page": 112,
  "source": "magic"
 },
 {
  "id": "battle-fumes",
  "category": "Alchemical Substances",
  "name": "Battle Fumes",
  "cost": {
   "amount": 100,
   "unit": "gold"
  },
  "supply": "Unique",
  "weight": 0,
  "effect": "A bubbling cauldron gives off fumes for a shift; anyone who takes a stretch rest within 4 m gets a boon on all melee attacks for the next shift.",
  "alchemy": true,
  "rank": 4,
  "page": 112,
  "source": "magic"
 },
 {
  "id": "explosive-orb",
  "category": "Alchemical Substances",
  "name": "Explosive Orb",
  "cost": {
   "amount": 60,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Throw up to STR meters (Brawling roll): 3D6 bludgeoning damage to the target and everyone within 4 m of it.",
  "alchemy": true,
  "rank": 4,
  "page": 112,
  "source": "magic"
 },
 {
  "id": "healing-tincture",
  "category": "Alchemical Substances",
  "name": "Healing Tincture",
  "cost": {
   "amount": 80,
   "unit": "gold"
  },
  "supply": "Unique",
  "weight": 0,
  "effect": "Heals 3D6 HP and 3D6 WP at once.",
  "alchemy": true,
  "rank": 4,
  "page": 112,
  "source": "magic"
 },
 {
  "id": "healing-vapors",
  "category": "Alchemical Substances",
  "name": "Healing Vapors",
  "cost": {
   "amount": 70,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "A bubbling cauldron gives off healing vapors for a shift; anyone who takes a stretch rest within 4 m gets the full benefit of a shift rest.",
  "alchemy": true,
  "rank": 4,
  "page": 113,
  "source": "magic"
 },
 {
  "id": "philosophers-stone",
  "category": "Alchemical Substances",
  "name": "Philosopher's Stone",
  "cost": null,
  "supply": null,
  "weight": 0,
  "effect": "Makes one dose of Philosopher's Stone, an ingredient for other recipes.",
  "alchemy": true,
  "rank": 4,
  "page": 113,
  "source": "magic"
 },
 {
  "id": "toxic-mist",
  "category": "Alchemical Substances",
  "name": "Toxic Mist",
  "cost": {
   "amount": 50,
   "unit": "gold"
  },
  "supply": "Rare",
  "weight": 0,
  "effect": "Poison bomb thrown up to STR meters: a 4 m radius mist hits everyone inside with paralyzing, sleeping or lethal poison (thrower's choice), potency 15.",
  "alchemy": true,
  "rank": 4,
  "page": 113,
  "source": "magic"
 },
 {
  "id": "create-gold",
  "category": "Alchemical Substances",
  "name": "Create Gold",
  "cost": null,
  "supply": null,
  "weight": 0,
  "effect": "Each dose turns the iron into gold worth D8 × 10 gold coins.",
  "alchemy": true,
  "rank": 5,
  "page": 113,
  "source": "magic"
 },
 {
  "id": "elixir-of-life",
  "category": "Alchemical Substances",
  "name": "Elixir of Life",
  "cost": null,
  "supply": null,
  "weight": 0,
  "effect": "Restores all lost HP and WP and cures every condition, disease, poison effect and severe injury. A drinker at 0 HP stops making death rolls.",
  "alchemy": true,
  "rank": 5,
  "page": 113,
  "source": "magic"
 },
 {
  "id": "homunculus",
  "category": "Alchemical Substances",
  "name": "Homunculus",
  "cost": null,
  "supply": null,
  "weight": 0,
  "effect": "Creates a ~30 cm humanoid that serves you like a familiar: 6 HP, Movement 8, Sneaking 15 and Evade 15, all familiar abilities (p.10) except Trained, plus Gather (p.106). It's disobedient — Persuade it every day or it runs off.",
  "alchemy": true,
  "rank": 5,
  "page": 113,
  "source": "magic"
 },
 {
  "id": "the-seashell-horn",
  "category": "Magic Items",
  "name": "The Seashell Horn",
  "cost": null,
  "supply": "Unique",
  "weight": 1,
  "effect": "A horn carved from a 30 cm seashell — one of the three keys to the Gates of Power. The elven poem (“from the shell each season calls”) hints at its use; see the Gates of Power for how the keys open the gate.",
  "source": "pathofglory",
  "page": 35,
  "key": true
 },
 {
  "id": "the-white-pearl",
  "category": "Magic Items",
  "name": "The White Pearl",
  "cost": null,
  "supply": "Unique",
  "weight": 0,
  "effect": "A sparkling white pearl the size of a fist — the “moonshine bright” key to the Gates of Power named in the elven poem; see the Gates of Power for its use.",
  "source": "pathofglory",
  "page": 29,
  "key": true
 },
 {
  "id": "the-black-pearl",
  "category": "Magic Items",
  "name": "The Black Pearl",
  "cost": null,
  "supply": "Unique",
  "weight": 0,
  "effect": "A fist-sized pearl black as ebony — the “sleek ebony” key to the Gates of Power named in the elven poem; see the Gates of Power for its use.",
  "source": "pathofglory",
  "page": 49,
  "key": true
 },
 {
  "id": "the-elven-pendant",
  "category": "Magic Items",
  "name": "The Elven Pendant",
  "cost": null,
  "supply": "Unique",
  "weight": 0,
  "effect": "A golden pendant the elves forged for the key bearers, engraved with the four-line poem that explains how to use the three keys on the Gates of Power. Kept by the hermit Ulat-A'ar.",
  "source": "pathofglory",
  "page": 51
 },
 {
  "id": "silver-headband-of-the-consort",
  "category": "Magic Items",
  "name": "Silver Headband of the Consort",
  "cost": null,
  "supply": "Unique",
  "weight": 0,
  "effect": "Elven-inscribed silver headband imbued with PROTECTOR, MAGIC SEAL and PERMANENCE at power level 2: the wearer casts PROTECTOR from it without a roll (can't fail) for 4 WP per use.",
  "source": "pathofglory",
  "page": 31
 },
 {
  "id": "golden-headband-of-the-knight",
  "category": "Magic Items",
  "name": "Golden Headband of the Knight",
  "cost": null,
  "supply": "Unique",
  "weight": 0,
  "effect": "Solid gold headband set with gems, imbued with FARSIGHT, DIVINATION, SCRYING, MAGIC SEAL and PERMANENCE at power level 2: each of the three spells can be cast from it for 4 WP per use.",
  "source": "pathofglory",
  "page": 33
 },
 {
  "id": "elusias-ring",
  "category": "Magic Items",
  "name": "Elusia's Ring",
  "cost": null,
  "supply": "Unique",
  "weight": 0,
  "effect": "Gold ring set with a sparkling blue stone, holding 20 WP stored with CHARGE and PERMANENCE that its wearer can draw on for magic.",
  "source": "pathofglory",
  "page": 28
 },
 {
  "id": "the-unity-of-everything",
  "category": "Magic Items",
  "name": "The Unity of Everything",
  "cost": null,
  "supply": "Unique",
  "weight": 1,
  "effect": "A treatise on cosmic balance and harmony. A mage who studies it for at least a shift and passes a LANGUAGES roll gains the heroic ability Focused (+2 WP).",
  "source": "pathofglory",
  "page": 39
 },
 {
  "id": "stormhands-grimoire",
  "category": "Magic Items",
  "name": "Stormhand's Grimoire",
  "cost": null,
  "supply": "Unique",
  "weight": 1,
  "effect": "Stormhand's personal spellbook, holding every spell he knows (see his stat block). A mage can learn spells from it; Stormhand will defend it with his life.",
  "source": "pathofglory",
  "page": 39,
  "grimoire": true
 },
 {
  "id": "potion-of-animal-whisperer",
  "category": "Magic Items",
  "name": "Potion of Animal Whisperer",
  "cost": {
   "amount": 50,
   "unit": "gold"
  },
  "supply": "Unique",
  "weight": 1,
  "effect": "One dose; drinking it gives the effect of the ANIMAL WHISPERER spell. Elusia sells hers for 50 gold.",
  "source": "pathofglory",
  "page": 29,
  "consumable": true
 },
 {
  "id": "potion-of-levitation",
  "category": "Magic Items",
  "name": "Potion of Levitation",
  "cost": null,
  "supply": "Unique",
  "weight": 1,
  "effect": "One dose; drinking it gives the effect of the LEVITATE spell. Two are in Stormhand's laboratory.",
  "source": "pathofglory",
  "page": 39,
  "consumable": true
 },
 {
  "id": "lefaleth",
  "category": "Magic Items",
  "name": "Lefaleth",
  "cost": null,
  "supply": "Unique",
  "weight": 0,
  "source": "pathofglory",
  "page": 84,
  "effect": "Elven amulet of life: a drop-shaped sapphire in a golden rose holding Heal Wound (power level 2) with Magic Seal and Permanence. Runes explain its use (LANGUAGES, a stretch; boon for elves).",
  "spell": "Heal Wound",
  "powerLevel": 2
 },
 {
  "id": "wayfinder",
  "category": "Magic Items",
  "name": "Wayfinder",
  "cost": null,
  "supply": "Unique",
  "weight": 0,
  "source": "pathofglory",
  "page": 84,
  "effect": "Halfling ring of the road: red gold set with a pearl, holding Teleport (power level 2) with Magic Seal and Permanence. Runes explain its use (LANGUAGES, a stretch; boon for halflings).",
  "spell": "Teleport",
  "powerLevel": 2
 },
 {
  "id": "headband-of-farsight",
  "category": "Magic Items",
  "name": "Headband of Farsight",
  "cost": null,
  "supply": "Unique",
  "weight": 0,
  "source": "pathofglory",
  "page": 77,
  "effect": "White-gold headband set with sapphires (tiny item) holding Farsight (power level 2) with Magic Seal and Permanence. An Old High Dwarvish inscription reveals the magic (LANGUAGES).",
  "spell": "Farsight",
  "powerLevel": 2
 },
 {
  "id": "silver-staff-of-the-gnome",
  "category": "Magic Items",
  "name": "Silver Staff of the Gnome",
  "cost": null,
  "supply": "Unique",
  "weight": 1,
  "source": "pathofglory",
  "page": 77,
  "effect": "Half-metre silver staff holding Gnome (power level 3) with Magic Seal and Permanence. Winding runes along the shaft reveal the magic (LANGUAGES).",
  "spell": "Gnome",
  "powerLevel": 3
 },
 {
  "id": "dwarven-healing-draught",
  "category": "Magic Items",
  "name": "Dwarven Healing Draught",
  "cost": null,
  "supply": "Unique",
  "weight": 1,
  "source": "pathofglory",
  "page": 77,
  "effect": "Corked, wax-sealed bottle of milky pink, spicy-smelling liquid (HEALING identifies it). Drinking one heals 3D6 HP and as many WP. The chest in #29 holds one fewer than the number of heroes (at least one).",
  "consumable": true,
  "heal": "3D6"
 },
 {
  "id": "iron-tablet-of-fire-blast",
  "category": "Magic Items",
  "name": "Iron Tablet of Fire Blast",
  "cost": null,
  "supply": "Unique",
  "weight": 1,
  "source": "pathofglory",
  "page": 75,
  "effect": "Small iron tablet carved with dwarven symbols, hidden in the fire master's murals (#24). Works as a grimoire holding the Fire Blast spell.",
  "spell": "Fire Blast"
 },
 {
  "id": "dwarven-brandy",
  "category": "Magic Items",
  "name": "Dwarven Brandy",
  "cost": null,
  "supply": "Unique",
  "weight": 1,
  "source": "pathofglory",
  "page": 79,
  "effect": "Smoked or mushroom-spiced brandy from the beverage storeroom (#35). A dose heals one condition of choice except Dazed, then roll CON — failure means Dazed. More than one dose per shift: automatically Dazed and no benefit.",
  "consumable": true
 },
 {
  "id": "telvins-ringmail",
  "category": "Magic Items",
  "name": "Telvin's Ringmail",
  "cost": null,
  "supply": "Unique",
  "weight": 1,
  "page": 121,
  "source": "pathofglory",
  "effect": "Heirloom armor kept in Otag's armory. Counts as studded leather (armor 2), but its rating is 2 higher against slashing damage."
 },
 {
  "id": "spider-silk-tunic-with-winged-cloak",
  "category": "Magic Items",
  "name": "Spider Silk Tunic with Winged Cloak",
  "cost": null,
  "supply": "Unique",
  "weight": 1,
  "page": 107,
  "source": "pathofglory",
  "effect": "Ankh-Tah-Leh's assassin garb. Protects as chainmail (armor 4) without the bane on Sneaking and Evade; the attached winged cloak lets the wearer glide at double movement."
 },
 {
  "id": "the-heart-of-darkness",
  "category": "Magic Items",
  "name": "The Heart of Darkness",
  "cost": null,
  "supply": "Unique",
  "weight": 0,
  "source": "pathofglory",
  "page": 145,
  "effect": "Sathmog's shrunken, still-beating heart (a tiny item) kept in a black stone box. Its bearer gets a boon on every roll, is warded as by PROTECTOR at power level 2, and can draw on 24 WP stored in it, refilled each midnight. Touching the box first forces a WIL roll vs fear (success heals all conditions). Only a dagger holding a death wight's soul can destroy it, on the altar of the Temple of Winds."
 },
 {
  "id": "muriels-grimoire",
  "category": "Magic Items",
  "name": "Muriel's Grimoire",
  "cost": null,
  "supply": "Unique",
  "weight": 1,
  "source": "pathofglory",
  "page": 133,
  "grimoire": true,
  "effect": "Leather grimoire of the elven animist Muriel holding PURGE, HEAL WOUND, ENGULFING FOREST and SLEEP. Its pages are coated with a lethal contact poison (potency 15); leafing through it bare-handed exposes the reader — use tweezers or similar to read it safely."
 }
];
window.DB_GEAR = DB_GEAR;
var DB_GM_TABLES = {
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
window.DB_GM_TABLES = DB_GM_TABLES;
var DB_HELMETS = [
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
  "page": 73,
  "source": "core"
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
  "page": 73,
  "source": "core"
 }
];
window.DB_HELMETS = DB_HELMETS;
var DB_HEROIC_ABILITIES = [
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
  "text": "Your sneak attack deals an extra D8 damage. Activate after the attack roll hits, before rolling damage. Can be combined with Backstabbing.",
  "source": "core"
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
  "text": "When making a melee attack against an enemy who is also within 2 m of another player character, the attack counts as a sneak attack: it can't be dodged or parried, you get a boon, and the weapon rolls one extra damage die. Only with a subtle weapon. Not an action.",
  "source": "core"
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
  "text": "As your action in combat, let out a cry that lets every other player character within earshot heal a condition of their choice. Only usable in combat.",
  "source": "core"
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
  "text": "Become Angry (or take another condition if already Angry) and immediately attack the nearest foe in melee. You must fight on until every enemy in sight is defeated or you hit zero HP. You get a boon on melee attacks but can neither parry nor dodge, and you are Exhausted afterwards.",
  "source": "core"
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
  "text": "Each WP spent removes one D6 from the damage of a fall. You may roll Acrobatics first and then decide.",
  "source": "core"
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
  "text": "Spend a stretch to bond with a nearby animal (not a monster); you can have one companion at a time. It follows you while you stay in its natural surroundings and scouts for free; 3 more WP orders it to attack (a free action for you).",
  "source": "core"
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
  "text": "Slip free of bonds or squeeze through a narrow gap without rolling.",
  "source": "core"
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
  "text": "Parry an attack without using up your action for the round — at any point in the round, as many times as you have WP for. You can't parry the same attack twice or both dodge and parry it.",
  "source": "core"
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
  "text": "Parry a ranged attack with a melee weapon instead of a shield.",
  "source": "core"
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
  "text": "After a stretch of work you can take on the looks, voice and manner of another person of your kin. Anyone who knows that person and sees you within 10 m may roll Awareness to see through it.",
  "source": "core"
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
  "text": "With a slashing weapon, strike two enemies within 2 m with one attack roll. Each may parry or dodge separately and damage is rolled separately. Combines with Dual Wield.",
  "source": "core"
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
  "text": "An attack against a monster (not an ordinary NPC) deals an extra D8 damage. Activate after the hit, before rolling damage.",
  "source": "core"
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
  "text": "With a one-handed weapon in each hand, make an extra attack with the off-hand weapon on your turn, at a bane. The off-hand weapon's STR requirement rises by 3. Resolve the first attack (including damage) before the second. Combines with Double Slash.",
  "source": "core"
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
  "text": "See a person or object up to 200 m away in fine detail for a stretch. In combat you may also shoot past your weapon's effective range without a bane — activate again for each new target.",
  "source": "core"
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
  "text": "Dodge an attack without using up your action for the round — at any point, as many times as you have WP for. Not the same attack twice, and not both dodge and parry.",
  "source": "core"
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
  "text": "Heal an extra D6 HP during a stretch rest. Doesn't affect WP or conditions.",
  "source": "core"
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
  "text": "Resist a fear attack automatically, with no WIL roll.",
  "source": "core"
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
  "text": "Your maximum WP permanently increases by 2. Can be taken any number of times.",
  "source": "core"
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
  "text": "When you and another player character are both within 2 m of the same enemy and it attacks them, force it to attack you instead. Out of turn and not an action.",
  "source": "core"
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
  "text": "After talking with someone for a while, roll Awareness to tell whether they are being truthful — though not what they're lying about.",
  "source": "core"
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
  "text": "Facing a hard decision, ask the GM one question and get a helpful answer drawn from your broad learning — enough to guide you, not to reveal everything.",
  "source": "core"
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
  "text": "An unarmed attack deals one more D6 of damage. Activate as a free action after rolling the attack.",
  "source": "core"
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
  "text": "Boon on Brawling rolls to grapple someone or to stop them breaking free.",
  "source": "core"
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
  "text": "When drawing initiative, draw two cards and keep the one you want. Once per round.",
  "source": "core"
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
  "text": "You can take a shift rest in the wild without first rolling Bushcraft to make camp. Only you benefit, even in a tent.",
  "source": "core"
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
  "text": "You have a gift for magic and can learn a new school (whether or not you know one already); spells must be learned separately. Take once per new school.",
  "source": "core"
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
  "text": "A hit with a two-handed melee weapon deals an extra D8 damage, but you can't move that round. Activate after the hit — not if you've already moved.",
  "source": "core"
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
  "text": "With blacksmith's tools: spend a stretch and 3 WP to sharpen a bladed or pointed weapon (armor counts one step lower against it until the end of a fight in which it attacks or parries). In a shift, forge a metal weapon or armor from the lists with a forge, anvil and iron (weight 1); WP cost equals its price in gold (rounded up) and can be spread over several shifts.",
  "source": "core"
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
  "text": "With carpentry tools: as an action, deal D12 damage per WP spent to a door, wall or other object, ignoring its armor. In a shift, build a wooden item from the lists (club, staff, shield…) from suitable wood; WP cost equals its price in gold (rounded up).",
  "source": "core"
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
  "text": "Automatically succeed at cooking food without a Bushcraft roll.",
  "source": "core"
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
  "text": "On your turn in combat, cast two different spells as a single action. You may roll for the first spell before deciding to activate this.",
  "source": "core"
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
  "text": "With leatherworking tools, spend a shift turning an animal or monster hide into leather armor with half the beast's armor rating (rounded up, minimum 1). WP cost equals the armor rating.",
  "source": "core"
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
  "text": "At a crossroads of some kind, learn which way the most dangerous enemies lie.",
  "source": "core"
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
  "text": "Your playing or singing gives every ally within 10 m a boon on all rolls — or every enemy in range a bane (choose one) — until your turn next round. An action in combat. Instruments can lower the WP cost or extend the range.",
  "source": "core"
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
  "text": "Boon on Bushcraft rolls to find the way through the wild.",
  "source": "core"
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
  "text": "Automatically succeed at making camp on a journey.",
  "source": "core"
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
  "text": "Your maximum HP increases by 2. Can be taken any number of times.",
  "source": "core"
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
  "text": "Activate (not an action) when acting in water, even waist-deep, to ignore every drawback of being in water for one round, including drowning.",
  "source": "core"
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
  "text": "Boon when parrying with a shield. With a shield you can also parry physical monster attacks (not area effects) that normally can't be parried, again with a boon. Combines with Defensive.",
  "source": "core"
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
  "text": "Hurl a one-handed melee weapon at an enemy up to your STR in metres away. Roll the attack normally; the target may parry or dodge. The weapon lands at their feet.",
  "source": "core"
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
  "text": "At a crossroads of some kind, learn which way the greatest treasures lie.",
  "source": "core"
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
  "text": "Shooting a bow (not a crossbow), loose two arrows at once — one attack roll with a bane, damage rolled separately. They may hit one target or two.",
  "source": "core"
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
  "text": "At the start of a round, keep last round's initiative card instead of drawing a new one. Not an action.",
  "source": "core"
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
  "text": "When attacked with another player character within 2 m, make the attack hit them instead. Activate before any dodge or parry; no effect on area attacks. The new target may dodge or parry as normal.",
  "source": "core"
 }
];
window.DB_HEROIC_ABILITIES = DB_HEROIC_ABILITIES;
var DB_JOURNEY = {
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
window.DB_JOURNEY = DB_JOURNEY;
var DB_KIN = [
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
  ],
  "source": "core",
  "roll20": [
   1,
   4
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
  ],
  "source": "core",
  "roll20": [
   5,
   6
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
  ],
  "source": "core",
  "roll20": [
   7,
   8
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
  ],
  "source": "core",
  "roll20": [
   9,
   9
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
  ],
  "source": "core",
  "roll20": [
   10,
   10
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
  ],
  "source": "core",
  "roll20": [
   11,
   11
  ]
 },
 {
  "id": "orc",
  "name": "Orc",
  "page": 12,
  "source": "bestiary",
  "roll20": [
   12,
   12
  ],
  "movement": 10,
  "category": "Nightkin",
  "text": "Sun-shy nightkin long cast as villains by other peoples. The orcs themselves describe a history of being met with scorn and betrayed by supposed allies after promises of peace.",
  "abilities": [
   {
    "id": "tough",
    "name": "Tough",
    "wp": 3,
    "timing": "free",
    "text": "At zero HP, activate to rally automatically — no WIL roll and no one needs to persuade you (core p.50)."
   }
  ],
  "names": [
   "Mauga",
   "Muzorg",
   "Radbag",
   "Snagrat",
   "Ug-Gash",
   "Gor-Nakh"
  ],
  "pcNotes": "Orc stat box lists Nocturnal (sunlight: bane on all rolls, D6 damage per stretch; avoided by thick cloud, dense foliage or full-cover clothing). The book does not say outright whether it applies to PCs; it is printed as a kin trait beside the Player Character note, so treat it as applying unless the GM rules otherwise.",
  "traits": [
   "Nocturnal (foliage)"
  ]
 },
 {
  "id": "ogre",
  "name": "Ogre",
  "page": 10,
  "source": "bestiary",
  "roll20": [
   13,
   13
  ],
  "movement": 10,
  "category": "Nightkin",
  "text": "Big, burly humanlike folk with moods that swing from gentle to violent — worst when drunk, hungover or nursing a toothache. Most live as brigands or mercenaries, often adopted into goblin clans (who like them) or orc clans (who look down on them).",
  "abilities": [
   {
    "id": "body-slam",
    "name": "Body Slam",
    "wp": 3,
    "timing": "action",
    "text": "Unarmed melee attack with a boon dealing 2D6 bludgeoning plus damage bonus; it can't be parried. You may dash before it. Humanoids of Normal size or smaller who are hit are knocked down."
   }
  ],
  "names": [
   "Glorm",
   "Barg",
   "Arra",
   "Klog",
   "Orluk",
   "Urla"
  ],
  "pcNotes": "Ogres are Large creatures (core p.83: block 4×4 m, need a 1 m gap). Stat box also lists Nocturnal (bane on all rolls and D6 damage per stretch in direct sunlight; thick cloud, dense foliage or full-cover clothing prevents it). The book does not say explicitly whether these apply to PCs; both are listed as kin traits, so assume they do (GM call).",
  "traits": [
   "Nocturnal (foliage)",
   "Large"
  ],
  "size": "Large"
 },
 {
  "id": "goblin",
  "name": "Goblin",
  "page": 6,
  "source": "bestiary",
  "roll20": [
   14,
   14
  ],
  "movement": 10,
  "category": "Nightkin",
  "text": "Small, hardy nightkin who often band together in clans and have served — and turned on — would-be conquerors. Known for scouting, ambushes and surviving on very little.",
  "abilities": [
   {
    "id": "resilient",
    "name": "Resilient",
    "wp": 1,
    "timing": "free",
    "text": "Activate for a boon on a CON roll to resist poison or disease (core p.52–53), or to make camp without a Bushcraft roll (core p.103). Passive, no WP: you can always eat raw food without falling ill."
   }
  ],
  "names": [
   "Flifos",
   "Ilola",
   "Luts",
   "Trulli",
   "Luregg",
   "Soli"
  ],
  "pcNotes": "Stat box lists Nocturnal (direct sunlight: bane on all rolls, D6 damage per stretch; thick cloud, dense foliage or full-cover clothing avoids it). Not explicitly stated for PCs; listed as a kin trait, so assume it applies (GM call).",
  "traits": [
   "Nocturnal (foliage)"
  ]
 },
 {
  "id": "hobgoblin",
  "name": "Hobgoblin",
  "page": 8,
  "source": "bestiary",
  "roll20": [
   15,
   15
  ],
  "movement": 10,
  "category": "Nightkin",
  "text": "Tireless, loyal nightkin of forests and swamps who gather berries, fell timber, dig bog ore and hunt for sunken treasure at their clan leader's command — or raid settlements when that leader craves gold.",
  "abilities": [
   {
    "id": "fearless",
    "name": "Fearless",
    "wp": 2,
    "timing": "free",
    "text": "Activate before rolling to automatically succeed on a WIL roll to resist fear (core p.52)."
   }
  ],
  "names": [
   "Gruush",
   "Kloorg",
   "Feeger",
   "Aamash",
   "Haggra",
   "Ploot"
  ],
  "pcNotes": "Stat box lists Nocturnal (direct sunlight: bane on all rolls, D6 damage per stretch; thick cloud or full-cover clothing avoids it — dense foliage is NOT listed for hobgoblins). Not explicitly stated for PCs; assume it applies (GM call).",
  "traits": [
   "Nocturnal"
  ]
 },
 {
  "id": "frog-people",
  "name": "Frog People",
  "page": 22,
  "source": "bestiary",
  "roll20": [
   16,
   16
  ],
  "movement": 10,
  "category": "Rare Kin",
  "text": "Reclusive wetland dwellers of uncertain origin — one tale blames a witch's curse on a fleeing prince and his consort. They fish and hunt the marshes, know them better than anyone, and talk to outsiders mostly through gestures (among themselves, blinks and croaks).",
  "abilities": [
   {
    "id": "leaping",
    "name": "Leaping",
    "wp": 3,
    "timing": "free",
    "text": "Jump up to your Movement horizontally or half your Movement vertically with no Acrobatics roll. A melee attack made at the end of the jump gets a boon."
   }
  ],
  "names": [
   "Karkien",
   "Boll",
   "Papai",
   "Tianen",
   "Ribbiiti",
   "Hotia"
  ],
  "pcNotes": ""
 },
 {
  "id": "karkion",
  "name": "Karkion",
  "page": 26,
  "source": "bestiary",
  "roll20": [
   17,
   17
  ],
  "movement": 10,
  "category": "Rare Kin",
  "text": "Long-lived, bat-winged wanderers who travel alone gathering lore, above all about demons — the beings said to have destroyed their original world. They hope to keep this world from the same fate, but say little about themselves.",
  "abilities": [
   {
    "id": "wings",
    "name": "Wings",
    "wp": 1,
    "timing": "free",
    "text": "Fly freely at the same speed as on foot; costs 1 WP per round of flight."
   }
  ],
  "names": [
   "Absu",
   "Baatu",
   "Gaar",
   "Kibili",
   "Maastu",
   "Ubus"
  ],
  "pcNotes": "Flight costs 1 WP per round and uses normal Movement (no separate fly speed). No other PC restrictions given.",
  "flying": "wp"
 },
 {
  "id": "cat-people",
  "name": "Cat People",
  "page": 16,
  "source": "bestiary",
  "roll20": [
   18,
   18
  ],
  "movement": 10,
  "category": "Rare Kin",
  "text": "Secretive, solitary folk thought to come from warmer southern lands. Kind but guarded individualists who cooperate only on their own terms, expert at going unnoticed and able to fight when pressed.",
  "abilities": [
   {
    "id": "nine-lives",
    "name": "Nine Lives",
    "wp": "varies",
    "wpNote": "Varies: 2 WP for a death roll; 1–3 WP for falls",
    "timing": "free",
    "text": "Spend 2 WP for a boon on a death roll (core p.50). Or, after the Acrobatics roll to reduce fall damage (core p.53), spend 1 WP per D6 to roll one fewer damage die, up to three."
   }
  ],
  "names": [
   "Star",
   "Bast",
   "Esme",
   "Mira",
   "Lune",
   "Lapiz"
  ],
  "pcNotes": ""
 },
 {
  "id": "lizard-people",
  "name": "Lizard People",
  "page": 28,
  "source": "bestiary",
  "roll20": [
   19,
   19
  ],
  "movement": 10,
  "category": "Rare Kin",
  "text": "Water-bound folk of bogs, swamps and river deltas with a hiss-and-click language outsiders easily garble. Most tribes fish eels, farm mussels and trade peacefully; a few warlike clans raid and take slaves under shaman kings who demand sacrifices.",
  "abilities": [
   {
    "id": "camouflage",
    "name": "Camouflage",
    "wp": 2,
    "timing": "free",
    "text": "Activate for a boon on a Sneaking roll."
   }
  ],
  "names": [
   "[Cluck][hiss][hiss]",
   "[Click][grr][shh][cluck]",
   "[Hiss][click][click][hiss]",
   "[Cluck][grr][hiss][hiss]",
   "[Grr][grr]",
   "[Hiss][shh][cluck][click][grr]"
  ],
  "pcNotes": ""
 },
 {
  "id": "satyr",
  "name": "Satyr",
  "page": 36,
  "source": "bestiary",
  "roll20": [
   20,
   20
  ],
  "movement": 10,
  "category": "Rare Kin",
  "text": "Joy-worshipping forest folk who throw wild feasts of food, wine, song and dance in flowery glades, often with centaur and naiad friends. Any excuse will do for the next celebration.",
  "abilities": [
   {
    "id": "raise-spirits",
    "name": "Raise Spirits",
    "wp": 3,
    "timing": "action",
    "text": "With song or verse, remove one chosen condition from someone who can hear you within 10 m. Can't target yourself."
   }
  ],
  "names": [
   "Aeson",
   "Bartolome",
   "Dianys",
   "Priapos",
   "Xander",
   "Sebastian"
  ],
  "pcNotes": "Stat box lists Melancholy: a satyr who can't celebrate with friends every day gets a bane on all rolls until it can party again. Not explicitly stated for PCs; listed as a kin trait, so assume it applies (GM call).",
  "traits": [
   "Melancholy"
  ]
 }
];
window.DB_KIN = DB_KIN;
var DB_KIN_LORE = [
 {
  "kin": "Goblin",
  "page": 6,
  "category": "Nightkin",
  "text": "Clan-dwelling nightkin who once formed the core of the sorcerer Visimir's army against the Bloodfist orcs — until the scout Gutsy shot him for his treachery and led the surviving goblins into the forest.",
  "encounter": "A dying woman stumbles up, begging the characters to follow the blood trail and save her beloved before he is eaten. A Spot Hidden or Hunting & Fishing roll follows the trail to a clearing where five merry goblins (two scouts, three warriors) are about to roast a bound man on a spit.",
  "seed": "Goblin raiding bands from deep in a forest are robbing travelers of every station and growing bolder, sparing those who surrender but killing guards who resist. Behind them is the aging Gutsy, still bitter over Visimir's broken promise and spending the loot to arm a growing army that must be stopped before it threatens the whole region.",
  "source": "bestiary"
 },
 {
  "kin": "Hobgoblin",
  "page": 8,
  "category": "Nightkin",
  "text": "Hard-working, zealous nightkin who toil loyally for their clan leader in forests and swamps — though greedy lords may send them raiding.",
  "encounter": "On a successful Spot Hidden roll a character spots boots poking out of a thicket: a slain adventurer clutching a bloody map with three landmarks. The circled ruin holds the survivors of clan Phubarra (a scout, a thief and three warriors) among many dead hobgoblins, mad with grief and thirsting for revenge.",
  "seed": "A bog-ore mining village wants hobgoblins driven from the forest caves that now control the workings. The clan insists the land and mine were theirs first and the villagers stole them; old villagers may admit the truth if Persuaded, or neighboring settlements may know more. The characters must pick a side, broker peace, or walk away and let it come to blood.",
  "source": "bestiary"
 },
 {
  "kin": "Ogre",
  "page": 10,
  "category": "Nightkin",
  "text": "Massive, temperamental humanlike folk — mild one moment, belligerent the next, especially when drunk or in pain. Usually brigands or mercenaries, alone or within goblin or orc clans.",
  "encounter": "At night the drunken, starving ogre Gvorm crashes into camp. Characters may attack at once, but an Awareness roll shows he only wants food; he rummages through packs and, if allowed to eat, turns friendly and helpful. Communicating with him at all takes a Persuasion roll.",
  "seed": "Drunken ogres occupy a logging village, demanding all its beer and refusing to leave no matter how many barrels they get. Villagers beg the characters not to use force for fear the ogres will wreck everything; Persuasion might send them elsewhere (at a neighbor's expense), but the ogres soon tire of talk and start smashing the village.",
  "source": "bestiary"
 },
 {
  "kin": "Orc",
  "page": 12,
  "category": "Nightkin",
  "text": "Nightkin at constant war with other kin, who by their own telling have been met with arrogance and betrayed by every ally that promised them peace.",
  "encounter": "The orc warrior Ogder hangs upside down from a snare, cursing and ordering the characters to cut him down. If they help, he grudgingly thanks them and warns of a giant spider nearby before heading back to his clan.",
  "seed": "A badly wounded orc messenger collapses in the village square, gasping about a friend in a cave half a day west-northwest. Spot Hidden or Hunting & Fishing leads to a dead orc carrying Chieftain Grimner's letter warning that another orc clan will attack the village. Can the characters get back in time — and why did Grimner warn them? Only the feared chieftain can say.",
  "source": "bestiary"
 },
 {
  "kin": "Cat People",
  "page": 16,
  "category": "Rare Kin",
  "text": "Rare, solitary cat folk from the warm south who keep to the margins, cooperate only when it pays, and are masters of staying unseen.",
  "encounter": "Excited wolf howls lead to a pack circling a tree where the cat man Amiz is fending them off with his sling. If the wolves are killed or driven off he climbs down, thanks the characters and goes his way — unless they Persuade him to join them.",
  "seed": "The mage Haldur Grumble has lured the cat woman Inis to his tower and is magically interrogating her to learn about her kind, telling others he holds a demon so no one discovers he has unlawfully imprisoned a person. Her friend Feliz asks the characters to help break into the tower and free her.",
  "source": "bestiary"
 },
 {
  "kin": "Frog People",
  "page": 22,
  "category": "Rare Kin",
  "text": "Isolated marsh dwellers who live by fishing and hunting and know their wetlands better than anyone.",
  "encounter": "A loud croak in a swamp heralds two young frog folk, Kaarvia and Saartia, flush from a good catch and eager to trade with the characters. Any hint of hostility and they bolt into the swamp.",
  "seed": "The mage Ulvalf hires the characters to escort him to an ancient temple ruin now lost in a vast swamp, and is told to hire the frog woman Quaark as guide. First they must find her settlement; then she demands they kill a giant amoeba that has slain several of her friends before she will lead them to the ruin.",
  "source": "bestiary"
 },
 {
  "kin": "Karkion",
  "page": 26,
  "category": "Rare Kin",
  "text": "Lone, long-lived scholars from a world destroyed by demons, roaming to learn all they can — especially about demonic forces — so this world is spared.",
  "encounter": "Deep in a forest the karkion mage Sibili meditates beneath an ancient carved stone tablet, seeking demon lore. He invites the characters to share his camp and trades tales of the blood demon he hunts for stories of monsters they've slain. By morning he is gone without a trace.",
  "seed": "The mountain tower of the mage Siman is wrapped in fog and darkness. Before it fell she sent a mental call to her karkion friend Abas, who hires the characters as escort. At the tower they find a blood demon Siman summoned has broken free and now rules the tower and its people.",
  "source": "bestiary"
 },
 {
  "kin": "Lizard People",
  "page": 28,
  "category": "Rare Kin",
  "text": "Swamp and delta tribes deeply tied to water; mostly peaceful fishers, mussel farmers and traders, though some aggressive clans raid, take slaves and offer blood sacrifices.",
  "encounter": "The characters notice lizard folk watching from roadside bushes, hissing nervously but not hostile. If the characters wait or show peaceful intent, the merchant [Click][cluck] comes out to sell smoked eel, pickled clams and fine amber jewelry, preferring metal tools or weapons as payment but accepting silver or gold.",
  "seed": "The shaman [Shh][shh][grr][cluck] has turned twenty warriors of a once-peaceful clan into raiders who kill those who resist and seize those who surrender as sacrifices to the snake demon Sisisiss. She claims the demon speaks to her in dreams, but it's a lie to enrich herself; the characters must expose or stop her and free the captives in time.",
  "source": "bestiary"
 },
 {
  "kin": "Satyr",
  "page": 36,
  "category": "Rare Kin",
  "text": "Forest revelers who worship joy and celebrate constantly with feasting, potent satyr wine, dance and music.",
  "encounter": "Music and laughter lead to a forest feast of satyrs, centaurs and naiads that anyone may join. It lasts all night and breaks up by dawn; joining gives a wild break from adventuring, and Performance rolls can win satyr friends, while sourpuss guests earn no respect.",
  "seed": "A gaunt, melancholy satyr named Spiros, newly escaped from a traveling jester troupe that caged and exhibited him for years, asks for help finding his friends at the greatest feast in the forest. Cheered by the characters, he tries to turn the trip into a traveling party — but the jesters are tracking them to reclaim their 'property'.",
  "source": "bestiary"
 }
];
window.DB_KIN_LORE = DB_KIN_LORE;
var DB_KIN_RULES = {
 "page": 3,
 "table": "Roll D20 on DB_KIN_TABLE20 instead of the core D12 kin table when picking kin at random.",
 "pcGeneration": "The stats printed for these kin are typical NPCs; player characters of these kin are built with the normal creation rules.",
 "movement": "Every new kin has base Movement 10, adjusted for AGL as in the core table (core p.25).",
 "optIn": "Each new kin is playable only if the gaming group agrees.",
 "npcAbilities": "NPCs of these kin can also use the kin's innate ability."
};
window.DB_KIN_RULES = DB_KIN_RULES;
var DB_KIN_TABLE20 = [
 {
  "roll": [
   1,
   4
  ],
  "kin": "Human",
  "ability": "Adaptive"
 },
 {
  "roll": [
   5,
   6
  ],
  "kin": "Halfling",
  "ability": "Hard to Catch"
 },
 {
  "roll": [
   7,
   8
  ],
  "kin": "Dwarf",
  "ability": "Unforgiving"
 },
 {
  "roll": [
   9,
   9
  ],
  "kin": "Elf",
  "ability": "Inner Peace"
 },
 {
  "roll": [
   10,
   10
  ],
  "kin": "Mallard",
  "ability": "Ill-Tempered, Webbed Feet"
 },
 {
  "roll": [
   11,
   11
  ],
  "kin": "Wolfkin",
  "ability": "Hunting Instincts"
 },
 {
  "roll": [
   12,
   12
  ],
  "kin": "Orc",
  "ability": "Tough"
 },
 {
  "roll": [
   13,
   13
  ],
  "kin": "Ogre",
  "ability": "Body Slam"
 },
 {
  "roll": [
   14,
   14
  ],
  "kin": "Goblin",
  "ability": "Resilient"
 },
 {
  "roll": [
   15,
   15
  ],
  "kin": "Hobgoblin",
  "ability": "Fearless"
 },
 {
  "roll": [
   16,
   16
  ],
  "kin": "Frog People",
  "ability": "Leaping"
 },
 {
  "roll": [
   17,
   17
  ],
  "kin": "Karkion",
  "ability": "Wings"
 },
 {
  "roll": [
   18,
   18
  ],
  "kin": "Cat People",
  "ability": "Nine Lives"
 },
 {
  "roll": [
   19,
   19
  ],
  "kin": "Lizard People",
  "ability": "Camouflage"
 },
 {
  "roll": [
   20,
   20
  ],
  "kin": "Satyr",
  "ability": "Raise Spirits"
 }
];
window.DB_KIN_TABLE20 = DB_KIN_TABLE20;
var DB_MAGIC_RULES = {
 "schools": [
  "Animism",
  "Demonology",
  "Elementalism",
  "Harmonism",
  "Illusionism",
  "Mentalism",
  "Necromancy",
  "Symbolism",
  "Witchcraft",
  "Alchemy",
  "Enchanting",
  "Dracomancy"
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
 },
 "creationSchools": {
  "Mage": [
   "Animism",
   "Demonology",
   "Elementalism",
   "Illusionism",
   "Mentalism",
   "Necromancy",
   "Symbolism",
   "Witchcraft",
   "Alchemy",
   "Enchanting"
  ],
  "Bard": [
   "Harmonism"
  ]
 }
};
window.DB_MAGIC_RULES = DB_MAGIC_RULES;
var DB_MAGIC_RULES_EXTRA = {
 "source": "magic",
 "rules": [
  {
   "name": "New Schools of Magic",
   "page": 5,
   "text": "New schools are secondary skills based on INT like the core ones; harmonism isn't a skill but uses PERFORMANCE. A new mage (a bard for harmonism) may pick any school except Dracomancy, which can only be learned in play. Some schools have entry requirements, and necromancers and demonologists face suspicion or hostility in civilized lands."
  },
  {
   "name": "Spell Ranks",
   "page": 5,
   "text": "Every school's spells now run to rank 5; a per-school diagram shows which spells are prerequisites for which."
  },
  {
   "name": "Revised Spells",
   "page": 5,
   "text": "The book's versions of Dispel (p.9), Magic Seal (p.12), Permanence (p.13), Protector (p.9), Resurrection (p.23) and Sleep (p.21) replace the core rulebook versions."
  },
  {
   "name": "Opposed Rolls",
   "page": 5,
   "text": "When a spell is activated by an opposed roll of your school skill against a target attribute, that is the only roll made to cast it. Find unlisted NPC attributes per Rulebook p.106; for INT the GM may pick a sensible score instead of defaulting to 10."
  },
  {
   "name": "Touch",
   "page": 5,
   "text": "Some Touch spells work on unwilling targets: no roll is needed to touch them and they can't parry or dodge the touch. On a square grid, Touch reaches an adjacent square if nothing blocks the way."
  },
  {
   "name": "Magic and Metal",
   "page": 5,
   "text": "Mages still can't wear metal armor or use metal weapons (Rulebook p.58), but weapons of obsidian or rarer materials (p.118) get around this."
  },
  {
   "name": "Homebrew Magic",
   "page": 5,
   "text": "Players and GMs are encouraged to create their own spells, recipes and items; any unofficial magic needs GM approval."
  },
  {
   "name": "Permanent WP Loss",
   "page": 13,
   "text": "Some high-rank rituals permanently reduce max WP; performing several together (e.g. Permanence and Nexus) costs WP for each. Focused can restore reduced max WP."
  },
  {
   "name": "Magic Seal and Lightning",
   "page": 19,
   "text": "Lightning Flash, Lightning Bolt and Thunderbolt cost double WP indoors; if bound to an object with Magic Seal, their power level is instead halved (round up) indoors."
  }
 ]
};
window.DB_MAGIC_RULES_EXTRA = DB_MAGIC_RULES_EXTRA;
var DB_MAGIC_SCHOOLS = [
 {
  "id": "general",
  "name": "General Magic",
  "page": 7,
  "source": "magic",
  "existing": true,
  "skill": null,
  "attribute": "INT",
  "title": "Mage",
  "creation": true,
  "professions": [
   "Mage"
  ],
  "summary": "Basic spells any mage can learn whatever their school, often coloured by the caster's own training. Many deal with making magic items or protecting the caster; the most widespread are the rituals that create a familiar.",
  "prevalence": "Taught by masters of every school. Mages argue endlessly over which school is oldest; the few who claim general magic proves all magic shares one source keep quiet about it.",
  "types": [],
  "familiar": {
   "text": "General magic is where the Familiar and Greater Familiar rituals live: a spirit of the dead bound into a small vertebrate, with two abilities from the familiar list (see DB_FAMILIAR_RULES).",
   "creatures": [
    {
     "name": "Rat",
     "movement": 10,
     "hp": 3,
     "attack": "Bite (skill 8, D2)",
     "skills": "Awareness 14, Evade 16, Sneaking 14"
    },
    {
     "name": "Cat",
     "movement": 12,
     "hp": 4,
     "attack": "Bite (skill 8, D3)",
     "skills": "Awareness 12, Evade 14, Sneaking 16"
    },
    {
     "name": "Dog",
     "movement": 14,
     "hp": 8,
     "attack": "Bite (skill 12, D8)",
     "skills": "Awareness 14, Evade 10"
    },
    {
     "name": "Fox",
     "movement": 10,
     "hp": 6,
     "attack": "Bite (skill 12, D6)",
     "skills": "Awareness 12, Evade 10, Sneaking 14"
    },
    {
     "name": "Grass Snake",
     "movement": 8,
     "hp": 3,
     "attack": "Bite (skill 12, D3)",
     "skills": "Awareness 10, Evade 14, Sneaking 16"
    },
    {
     "name": "Raven",
     "movement": 18,
     "hp": 4,
     "attack": "Beak (skill 10, D4)",
     "skills": "Awareness 16, Evade 10"
    }
   ]
  },
  "study": {
   "ranks12": "As the school whose master teaches you (see each school chapter).",
   "ranks34": "As the teaching school.",
   "rank5": "As the teaching school.",
   "other": "Requires a skill level in any school of magic. Harmonism isn't a skill, so harmonists can't learn general magic."
  },
  "startingSkills": [],
  "rules": [
   {
    "name": "Requirement",
    "text": "Any skill level in a school of magic lets you learn general spells; harmonists can't."
   },
   {
    "name": "Enchanting branch",
    "text": "In the spell tree, any rank 3 Enchanting spell can substitute for Transfer as prerequisite for Magic Seal and Charge, and any rank 4 Enchanting spell for Magic Seal as prerequisite for Counter Ritual and Permanence."
   },
   {
    "name": "Permanent WP Loss",
    "text": "Some high-rank rituals permanently lower max WP. Cast several at once (e.g. Permanence and Nexus) and you lose WP for each. Focused can restore lost max WP."
   }
  ],
  "spellTree": [
   {
    "rank": 1,
    "spells": [
     "Alarm",
     "Protector",
     "Dispel"
    ]
   },
   {
    "rank": 2,
    "spells": [
     "Familiar",
     "Magic Shield"
    ]
   },
   {
    "rank": 3,
    "spells": [
     "Transfer",
     "Magic Ward"
    ],
    "also": [
     "Any Enchanting spell"
    ]
   },
   {
    "rank": 4,
    "spells": [
     "Magic Seal",
     "Charge",
     "Greater Familiar"
    ],
    "also": [
     "Any Enchanting spell"
    ]
   },
   {
    "rank": 5,
    "spells": [
     "Counter Ritual",
     "Permanence",
     "Nexus",
     "Rejuvenation"
    ]
   }
  ]
 },
 {
  "id": "animism",
  "name": "Animism",
  "page": 15,
  "source": "magic",
  "existing": true,
  "skill": "Animism",
  "attribute": "INT",
  "title": "Animist",
  "creation": true,
  "professions": [
   "Mage"
  ],
  "summary": "Animists sense and shape the life force (the Flame, or Soul) in all living things and natural phenomena — to heal, to commune with nature, and to destroy soulless demons and undead.",
  "prevalence": "Thought the oldest school, born among elves; it has spread to every kin though leading animists are mostly elves. Seasonal gatherings at solstices and equinoxes draw humans, halflings and mallards; dwarves and wolfkin are rarer.",
  "types": [
   {
    "name": "Warden",
    "text": "The most common: devoted to protecting and tending one environment, species or weather phenomenon."
   },
   {
    "name": "Champion",
    "text": "Fights for the natural order, ready to die battling the soulless and unnatural."
   },
   {
    "name": "Hermit",
    "text": "Has lost interest in everything but one place, phenomenon or group of animals."
   }
  ],
  "familiar": {
   "text": "Usually a bird tied to the nature the animist loves (woodpecker or dove for forests, falcon or pheasant for plains, magpie or raven in towns); occasionally a fox, cat or other four-legged animal. School ability: the familiar can cast HEAL WOUND at skill level 15, once per round on your turn, using your WP.",
   "creatures": []
  },
  "study": {
   "ranks12": "Easy to find a teacher (herbalist, gardener, shaman, circle leader); at least 5 gold per shift or equivalent service.",
   "ranks34": "Show dedication: coin or labour worth about 50 gold per shift, and usually skill level 15 in BEAST LORE, BUSHCRAFT or SEAMANSHIP.",
   "rank5": "Grandmasters rarely accept you without skill level 18 in one of BEAST LORE, BUSHCRAFT or SEAMANSHIP and at least 12 in the other two, plus their own demands (see Animist Masters).",
   "other": "Animists are welcoming teachers and rarely rivals, except e.g. wolfkin shamans competing for a chieftain's favour or two animists attached to the same grove or pack."
  },
  "startingSkills": [
   "Animism",
   "Beast Lore",
   "Bushcraft",
   "Evade",
   "Healing",
   "Hunting & Fishing",
   "Sneaking",
   "Staves"
  ],
  "rules": [],
  "masters": [
   {
    "name": "Alavain of Nightwood",
    "text": "Legendary elf animist who seems to live in several forests at once.",
    "requirements": "Always surrounded by apprentices; you must have risked your life to save a forest, and succeeded."
   },
   {
    "name": "Cycleona Orcana",
    "text": "Ancient master who can no longer walk and is carried by swirling winds.",
    "requirements": "Devoted to fighting demons: if you haven't slain a demon prince, she sends you to a rift about to open."
   },
   {
    "name": "\"Stump\"",
    "text": "Toothless, hunchbacked, spry hermit with mossy green skin.",
    "requirements": "Wants a worthy conversationalist: skill level 18 in BEAST LORE and MYTHS & LEGENDS, and a well-behaved FAMILIAR."
   }
  ],
  "spellTree": [
   {
    "rank": 1,
    "spells": [
     "Cure",
     "Banish",
     "Lightning Flash",
     "Treat Wound",
     "Nourish",
     "Animal Whisperer",
     "Ensnaring Roots"
    ]
   },
   {
    "rank": 2,
    "spells": [
     "Recovery",
     "Purge",
     "Lightning Bolt",
     "Heal Wound",
     "Sleep",
     "Reinvigorate",
     "Calm Animal",
     "Engulfing Forest"
    ]
   },
   {
    "rank": 3,
    "spells": [
     "Mass Purge",
     "Thunderbolt",
     "Restoration",
     "Daze",
     "Exhaust",
     "Command Animal",
     "Thorn Field"
    ]
   },
   {
    "rank": 4,
    "spells": [
     "Weather Mastery",
     "Healing Radiance",
     "Animalistic Influence"
    ]
   },
   {
    "rank": 5,
    "spells": [
     "Healing Aura",
     "Resurrection"
    ]
   }
  ]
 },
 {
  "id": "demonology",
  "name": "Demonology",
  "page": 25,
  "source": "magic",
  "skill": "Demonology",
  "attribute": "INT",
  "title": "Demonologist",
  "creation": true,
  "professions": [
   "Mage"
  ],
  "summary": "Magic drawn from demonic energies and pacts with the beings of Chaos: summoned vermin, chaos-tainted ground, possession by demon spirits, and the summoning and binding of demons. Its followers see demons as an alternative power against oppressive rulers.",
  "prevalence": "As old as the link between the world and the demonic realm. Rare among elves, mallards and halflings and distrusted or hated among humans and dwarves, so practitioners hide in secret cults; wolfkin shamans, by contrast, often make pacts and some clans worship demon lords.",
  "types": [
   {
    "name": "Scholar",
    "text": "Rare academics who use the spells to study demons and the mysteries of existence."
   },
   {
    "name": "Rebel",
    "text": "The most common: allies with demons against some authority that restricts their freedom."
   },
   {
    "name": "Worshiper",
    "text": "Rejects morality, law and order for the hedonistic, emotional excess of the demonic realm."
   },
   {
    "name": "Power Seeker",
    "text": "Often a loner who wants power for its own sake and sees demon pacts as the quick road to it."
   }
  ],
  "familiar": {
   "text": "Usually a puck — a minor demon that can take almost any shape — though some use a bat, a large spider or another demon-like beast. School ability: once per shift it hurls acid slime at an enemy within 2 m. Automatic hit (Evade allowed), 2D6 damage, and D6 more on the target's next turn unless they spend an action scraping it off.",
   "creatures": [
    {
     "name": "Spider",
     "movement": 8,
     "hp": 3,
     "attack": "Bite (skill 8, D2)",
     "skills": "Awareness 14, Evade 16, Sneaking 14",
     "note": "Bite carries paralyzing poison, potency 12."
    },
    {
     "name": "Bat",
     "movement": 16,
     "hp": 4,
     "attack": "Bite (skill 12, D4)",
     "skills": "Awareness 16, Evade 10"
    },
    {
     "name": "Puck",
     "movement": 10,
     "hp": 5,
     "attack": "Bite (skill 12, D3)",
     "skills": "Awareness 10, Evade 14, Sneaking 12"
    }
   ]
  },
  "study": {
   "ranks12": "Once a teacher trusts you they share gladly, for at least 5 gold per shift.",
   "ranks34": "The teacher must see you as an asset to the cult, and you must donate at least 50 gold per shift — or make a pact with a demon.",
   "rank5": "Practically only via a pact with a demon lord; mortal teachers at that level are too absorbed to teach.",
   "other": "Finding a teacher is the hard part: demonologists hide from the law. You usually must first join their cult (proving zeal in battle or enduring a repugnant initiation); any hint you're an enemy agent may get you sacrificed."
  },
  "startingSkills": [
   "Demonology",
   "Bartering",
   "Bluffing",
   "Evade",
   "Languages",
   "Myths & Legends",
   "Persuasion",
   "Sneaking"
  ],
  "rules": [
   {
    "name": "Pact With a Demon",
    "text": "Rank 3, 4 and 5 spells can be learned through a pact with a demon (rank 5 almost only from a demon lord). The demon sets a condition, usually to be met by the next full moon; failure brings a demonic punishment."
   },
   {
    "name": "Pact Examples — Rank 3",
    "text": "Sacrifice animals totalling 99 HP or more; bring 9 or more new followers into a cult (yours or another); or betray a rival demon's worshippers to the dragon knights or a similar power."
   },
   {
    "name": "Pact Examples — Rank 4",
    "text": "Ritually sacrifice a Huge monster captured alive; recruit a prince, warlord, powerful mage or similar to a cult; kill the leaders of a rival demon's cult."
   },
   {
    "name": "Demonic Servitude (punishment)",
    "text": "Two failed death rolls kill you — and instead of dying you are whisked to the demon's court to serve as a thrall for 99 years."
   },
   {
    "name": "Demonic Whispers (punishment)",
    "text": "Bane on every skill not used toward fulfilling the condition until it is fulfilled; constant hissing makes concentration and sleep nearly impossible."
   },
   {
    "name": "Demonic Mockery (punishment)",
    "text": "You can't spend WP except while actively working toward the condition, until it is fulfilled; the demon jeers at you day and night."
   },
   {
    "name": "Renegotiation",
    "text": "Instead of attacking over an unpaid pact, a demon may renegotiate: one more moon to pay, but the price rises to about a rank 4 pact example."
   }
  ],
  "demonLords": [
   {
    "name": "Albarlog",
    "text": "A tentacled, fanged monstrosity that loves expanding its realm in Chaos.",
    "requirements": "Infiltrate the cult of rival demon lord Youl and slay him when he is summoned to a major ceremony."
   },
   {
    "name": "Myrindon",
    "text": "An ever-growing, mildly corrosive mist seeking ways into the world.",
    "requirements": "Shatter the stone that seals an ancient rift, hidden in a cave under the dragon knights' small fort that watches over it."
   },
   {
    "name": "Blothander",
    "text": "A towering hulk of molten stone that devours the living world.",
    "requirements": "Kill the monster now lairing in the volcano Blothander used to manifest through."
   }
  ],
  "spellTree": [
   {
    "rank": 1,
    "spells": [
     "Abyssal Stench",
     "Demonic Gust",
     "Chaos Swamp",
     "Carbuncle"
    ]
   },
   {
    "rank": 2,
    "spells": [
     "Demon Face",
     "Bloodlust",
     "Chaos Mire",
     "Beetle Boil"
    ]
   },
   {
    "rank": 3,
    "spells": [
     "Dimensional Slip",
     "Rage",
     "Beetle Swarm",
     "Gutworm"
    ]
   },
   {
    "rank": 4,
    "spells": [
     "Demonic Exile",
     "Summon Champion",
     "Summon Guardians"
    ]
   },
   {
    "rank": 5,
    "spells": [
     "Dimensional Travel",
     "Bind Champion"
    ]
   }
  ]
 },
 {
  "id": "elementalism",
  "name": "Elementalism",
  "page": 35,
  "source": "magic",
  "existing": true,
  "skill": "Elementalism",
  "attribute": "INT",
  "title": "Elementalist",
  "creation": true,
  "professions": [
   "Mage"
  ],
  "summary": "Magic of the four material elements — fire, air, earth and water. Elementalists hold that matter, not spirit, is the foundation of reality, and their masters command matter itself: fire and ice attacks, walls and pillars of stone, winds, waves and summoned elementals.",
  "prevalence": "Said to have formed when four elder shamanic traditions merged; now one of the most widespread and influential schools across all kin, though elves and halflings rarely take it up. Coastal mages favour water and wind, mountain and underground folk fire and earth; fire magic is the most common overall.",
  "types": [
   {
    "name": "Battle mage",
    "text": "The archetypal fire-hurling war wizard who summons blazing beasts on the battlefield; the most common type."
   },
   {
    "name": "Academic",
    "text": "Pairs spellcraft with scholarly study of the nature of fire, wind, earth and water."
   },
   {
    "name": "Devotee",
    "text": "Dedicated to one or two elements, aloof from ordinary concerns, living in lava, seabed or mountain wind."
   }
  ],
  "familiar": {
   "text": "An elementalist may bind the familiar to an elemental form instead of an animal: a gust of wind, a flame, a small cloud or an earth spirit (it can also serve as a greater familiar, p.12). Besides the normal familiar abilities (p.10) it gains one ability by form. Gale (gust only, 3 WP): deflect one ranged-weapon projectile within 20 m of the familiar so the attack misses — activate before damage is rolled; also dries wet gear and people for free. Incinerate (flame only, 3 WP, takes an action): burn up a small non-magical flammable object (weight 1 max); also a free heat source that negates cold. Downpour (cloud only, 3 WP, takes an action): drench a foe, who must pass a CON roll or become Dazed; also gives drinking water for free. Guardian (earth spirit only, 2 WP): when you are attacked, the spirit appears beside you (if within its Movement) and takes the hit instead — activate before damage is rolled.",
   "creatures": [
    {
     "name": "Gust",
     "movement": 20,
     "hp": 3,
     "attack": "—",
     "skills": "—",
     "note": "Only harmed by fire, magic and magical weapons."
    },
    {
     "name": "Flame",
     "movement": 16,
     "hp": 4,
     "attack": "Spark (skill 12, D4)",
     "skills": "—",
     "note": "Hurt only by water, magic and magical attacks; even a splash of water does D4."
    },
    {
     "name": "Cloud",
     "movement": 12,
     "hp": 6,
     "attack": "—",
     "skills": "—",
     "note": "Only harmed by fire, magic and magical weapons."
    },
    {
     "name": "Earth Spirit",
     "movement": 8,
     "hp": 12,
     "armor": 6,
     "attack": "Fist (skill 12, D8)",
     "skills": "Awareness 10, Evade 8"
    }
   ]
  },
  "study": {
   "ranks12": "Academies admit applicants with good references or a prominent family for at least 5 gold per shift; rejected students can find bitter, cast-out tutors who teach for coin.",
   "ranks34": "You must at least appear to fit the elementalist ideal of grooming, manners and bearing (or be famous for a spectacular heroic deed), and pay at least 50 gold per shift.",
   "rank5": "Masters hold high posts (court archmage, army battle mage, academy head) and won't train a potential rival, but will teach someone who helps them bring down an enemy. Examples: Querulida the Subduer, Udu of the Depths, Kadirya Stormborne.",
   "other": "Academies expect students to be well-groomed, well-spoken, well-mannered and preferably wealthy; those who aren't get extra lessons in etiquette."
  },
  "startingSkills": [
   "Elementalism",
   "Awareness",
   "Evade",
   "Healing",
   "Languages",
   "Myths & Legends",
   "Spot Hidden",
   "Staves"
  ],
  "masters": [
   {
    "name": "Querulida",
    "text": "Short-tempered court archmage to Baron Guber II who always hides her face.",
    "requirement": "Help her rival, the illusionist court mage Brasimal Sturling of Baroness Gertrud XII, be replaced — by you."
   },
   {
    "name": "Udu of the Depths",
    "text": "Ancient, taciturn dwarf who hasn't been above ground in over a century.",
    "requirement": "Take revenge on Lord Plymer of Dask, the ex-general who dismissed her as battalion mage — he must die."
   },
   {
    "name": "Kadirya Stormborne",
    "text": "Absentee headmistress of the Sun of Wisdom academy, obsessed with mapping the world from the sky.",
    "requirement": "Run the academy for her, with its feuding faculty, alongside your studies."
   }
  ],
  "rules": [],
  "spellTree": [
   {
    "rank": 1,
    "spells": [
     "Fireball",
     "Pillar",
     "Shatter",
     "Frost",
     "Gust of Wind"
    ]
   },
   {
    "rank": 2,
    "spells": [
     "Fire Blast",
     "Stone Shield",
     "Stonewall",
     "Tidal Wave",
     "Whirlwind"
    ]
   },
   {
    "rank": 3,
    "spells": [
     "Firebird",
     "Firestorm",
     "Salamander",
     "Gnome",
     "Undine",
     "Sylph"
    ]
   },
   {
    "rank": 4,
    "spells": [
     "Firebomb",
     "Rock Tornado",
     "Scalding Shower",
     "Hailstorm"
    ]
   },
   {
    "rank": 5,
    "spells": [
     "Meteor Swarm",
     "Conjure",
     "Elemental Path"
    ]
   }
  ]
 },
 {
  "id": "harmonism",
  "name": "Harmonism",
  "page": 45,
  "source": "magic",
  "skill": "Performance",
  "attribute": "CHA",
  "title": "Harmonist",
  "creation": true,
  "professions": [
   "Bard"
  ],
  "summary": "Music magic: harmonists perceive the vibrations of every thing and creature as melodies within the World Symphony and alter them through song or instrument — inspiring allies, swaying emotions, mending or shattering objects, and controlling or harming foes.",
  "prevalence": "Popularly credited to elves, but evidence points to the trolls in primeval times. Practised today by bards of all kin: elves mostly sing, humans favour strings, halflings woodwinds, dwarves horns and the trudledrum (a tunable belly-harness kettledrum); mallards and wolfkin play various instruments, with the odd quacking or howling singer.",
  "types": [
   {
    "name": "Diva",
    "text": "Loves the spotlight and dazzles with musical and magical virtuosity."
   },
   {
    "name": "Charmer",
    "text": "Uses voice or strings to enchant and seduce everyone nearby."
   },
   {
    "name": "Artist",
    "text": "Introverted, often playing with their back to the crowd, devoted to art for its own sake."
   }
  ],
  "familiar": null,
  "study": {
   "ranks12": "Many tavern and roadside-inn musicians know the basics and teach on the side for at least 5 gold per shift. A capable instrumentalist can instead pay by touring with the teacher: five evenings warming up and entertaining the crowd per shift of instruction.",
   "ranks34": "Requires serious, retired instrumentalists focused on the magic — a few human conservatories (lyre, lute, strapped zither) or renowned teachers of other kin in remote places — for hard coin, often at least 50 gold per shift.",
   "rank5": "Top masters are hard to find and reluctant; help one with their predicament, or pay an exorbitant sum if you can reach them. Examples: Cidcil Stormlyre, Visyris, Radoman.",
   "other": "To be accepted you usually must be a close relative of the teacher or already an accomplished musician. Harmonist rivalry is fierce; a pupil who outshines their teacher can earn a lifelong enemy."
  },
  "startingSkills": [],
  "masters": [
   {
    "name": "Cidcil Stormlyre",
    "text": "Volatile master harmonist who never leaves his mountain keep.",
    "requirement": "He is stuck on his magnum opus, The Midnight Sonata, and needs inspiration."
   },
   {
    "name": "Visyris",
    "text": "Wine-loving, self-absorbed satyr gone missing in the north.",
    "requirement": "Rumoured captive of the Roughhides of Boarwood orc clan — rescue him."
   },
   {
    "name": "Radoman",
    "text": "Ancient dwarf from the crystal halls of the Glass Mountains.",
    "requirement": "The dragonhide on his trudledrum split and he has sunk into apathy; replace it."
   }
  ],
  "rules": [
   {
    "name": "Starting harmonists",
    "text": "Harmonism cannot be chosen by a starting mage, as it isn't a separate skill. Only bards may start with it: instead of the heroic ability Musician, the bard gets three rank 1 harmonism spells of their choice, three harmonism magic tricks, and a grimoire."
   },
   {
    "name": "Performance is the magic skill",
    "text": "Harmonism spells are cast with PERFORMANCE. Learning them uses advancement marks for Performance and requires Performance skill level 12 or higher plus a willing teacher. Every rank 1 spell has the prerequisite 'Skill level 12 in Performance'."
   },
   {
    "name": "No general magic",
    "text": "Because harmonism is not a magic school skill, harmonists cannot learn general magic spells."
   },
   {
    "name": "Learning during play",
    "text": "A character who didn't start as a bard with harmonism spells must first gain the heroic ability Magic Talent before learning harmonism spells in play."
   },
   {
    "name": "New requirement: Melody",
    "text": "A spell with the Melody requirement is activated by a sung or played melody (voice or instrument). All harmonism spells use Melody as their only requirement."
   }
  ],
  "spellTree": [
   {
    "rank": 1,
    "spells": [
     "Inspire",
     "Serenity",
     "Mend",
     "Protective Harmonies",
     "Tune Mood"
    ]
   },
   {
    "rank": 2,
    "spells": [
     "Encourage",
     "Doubt",
     "Paralyze",
     "Elude Senses",
     "Frenzy"
    ]
   },
   {
    "rank": 3,
    "spells": [
     "Rest",
     "Cacophony",
     "Placate Nature",
     "Dance"
    ]
   },
   {
    "rank": 4,
    "spells": [
     "Spiritual Solace",
     "Break",
     "Musical Blast",
     "Hypnotize Monster",
     "Mass Dance"
    ]
   },
   {
    "rank": 5,
    "spells": [
     "Raze",
     "Abyssal Resonance"
    ]
   }
  ]
 },
 {
  "id": "illusionism",
  "name": "Illusionism",
  "page": 55,
  "source": "magic",
  "skill": "Illusionism",
  "attribute": "INT",
  "title": "Illusionist",
  "creation": true,
  "professions": [
   "Mage"
  ],
  "summary": "Magic of perception: since reality is only what each mind perceives, illusionists manipulate or dictate what others see, hear and believe — apparitions and full-sense illusions, disguises, shadows, confusion, dreams and, at the highest level, illusions real enough to be physical.",
  "prevalence": "Commonly said to be invented by criminals, though perhaps really by rulers wanting to spy on and control their subjects. Found among all kin, maybe most among halflings; the street magicians folk associate with it are mostly human, and real mages are hard to tell from mere tricksters.",
  "types": [
   {
    "name": "Performer",
    "text": "The most visible type, entertaining in squares, banquets, inns and festivals."
   },
   {
    "name": "Court mage",
    "text": "Serves a ruler, helping them move unseen among subjects and keep control."
   },
   {
    "name": "Thief",
    "text": "Uses illusions for pickpocketing, forgery, burglary and elaborate cons."
   }
  ],
  "familiar": {
   "text": "Illusionists favour familiars that pass for ordinary animals or hide well — colour-shifting lizards most often, and birds for performers and thieves. Besides the normal familiar abilities (p.10) the familiar can have Shadow Shroud: for 2 WP it is cloaked in shadow and gets a boon on a SNEAKING roll.",
   "creatures": []
  },
  "study": {
   "ranks12": "Find an academy or a street conjurer willing to teach: 5 gold or more per shift, or work off the fee as their assistant. Many illusionists began as child apprentices.",
   "ranks34": "Learned at higher, pricier academies, often 50 gold per shift or more. Unless you are a relative or close friend, masters are hard to persuade — some prefer to keep you as an assistant, others want proof of strong moral character first.",
   "rank5": "Top masters are already rich and accept no coin or valuables, only deeds. Examples: Smilla Virtuosa, Brasobar Sakare, Mistress Rosa.",
   "other": "Most respectable academies employ an illusionist master or two, but experienced illusionists are fickle, impulsive and careless of agreements and courtesy."
  },
  "startingSkills": [
   "Bartering",
   "Bluffing",
   "Evade",
   "Illusionism",
   "Performance",
   "Persuasion",
   "Sleight of Hand",
   "Sneaking"
  ],
  "masters": [
   {
    "name": "Smilla Virtuosa",
    "text": "Travelling enchantress still as beautiful as a century ago (in public).",
    "requirement": "Help her secret illusionist network prove the merchant Mr. Krankle runs the penal colony in the woods of Marshpool."
   },
   {
    "name": "Brasobar Sakare",
    "text": "Court mage to Count Artoro of Wankleford; loves cheesy desserts, hates headwinds and hills.",
    "requirement": "Deal with the monster in the northern highlands before the county cheese festival while he finishes his cheesecake."
   },
   {
    "name": "Mistress Rosa",
    "text": "Former rose-petal burglar, now head of a big-city thieves' guild.",
    "requirement": "Unmask the true employer of a rival gang encroaching on the guild's turf and eliminate the threat."
   }
  ],
  "rules": [
   {
    "name": "Seeing through illusions",
    "text": "Illusions of creatures (Apparition, Illusion) are seen through with an AWARENESS roll that is not an action: the observer rolls with a boon at power level 1, normally at 2 and with a bane at 3, and may try again every round. Anyone who fails must act as if the illusion were real. A purely visual Apparition vanishes for everyone the moment someone touches it."
   },
   {
    "name": "Opposed mind effects",
    "text": "Mind-bending spells (Confusion, Amnesia, Waking Nightmare, Fatal Mistake) are opposed by the target's INT. Power level sets the target's roll: boon at 1, plain at 2, bane at 3. Area versions such as Mass Confusion give each victim an INT roll instead (no action, same scale), repeatable every turn."
   },
   {
    "name": "Disguises",
    "text": "Impersonate and Group Identity fool everyone at a distance. Fooling someone in conversation needs a BLUFFING or PERFORMANCE roll by the caster/spokesperson — with a bane at power level 1, normally at 2, with a boon at 3."
   },
   {
    "name": "Terrain illusions",
    "text": "False Terrain: an intelligent creature that physically interacts with it automatically sees through it; the illusion remains for others, but anyone who has seen through it may ignore it. Fata Morgana is so real that even those who know it is false are affected as if it were physical."
   },
   {
    "name": "Monsters and undead",
    "text": "Most illusionism spells that affect minds have no effect on monsters or undead (Trip and Fatal Mistake exclude monsters)."
   }
  ],
  "spellTree": [
   {
    "rank": 1,
    "spells": [
     "Long Shadows",
     "Apparition",
     "Confusion",
     "Mind Mask",
     "Send Dream"
    ]
   },
   {
    "rank": 2,
    "spells": [
     "Shadow Shroud",
     "Illusion",
     "Trip",
     "Impersonate",
     "Amnesia"
    ]
   },
   {
    "rank": 3,
    "spells": [
     "Shadow Leap",
     "Mirror Image",
     "Mass Confusion",
     "Group Identity",
     "Waking Nightmare"
    ]
   },
   {
    "rank": 4,
    "spells": [
     "Doppelganger",
     "False Terrain",
     "Fatal Mistake"
    ]
   },
   {
    "rank": 5,
    "spells": [
     "Fata Morgana",
     "Cheat Fate"
    ]
   }
  ]
 },
 {
  "id": "mentalism",
  "name": "Mentalism",
  "page": 65,
  "source": "magic",
  "existing": true,
  "skill": "Mentalism",
  "attribute": "INT",
  "title": "Mentalist",
  "creation": true,
  "professions": [
   "Mage"
  ],
  "summary": "Mentalists hold that consciousness, not spirit or life force, is the root of reality, so a trained mind can reshape the world. Their magic covers far-seeing, mind-reading and mind control, telekinetic force, flight and teleportation.",
  "prevalence": "A small school of loners, often seen as eccentric contrarians who in turn look down on ordinary folk. Mentalists reject the idea that the school is tied to any kin or region.",
  "types": [
   {
    "name": "Explorer",
    "text": "Studies the nature and limits of will and thought."
   },
   {
    "name": "Skeptic",
    "text": "Questions everything and argues with anyone who speaks of natural laws or objective facts."
   },
   {
    "name": "Nihilist",
    "text": "Sees morals and laws as fictions and uses magic for gain — manipulation, spying, blackmail and theft."
   }
  ],
  "familiar": {
   "text": "Rare and kept for practical reasons — a sounding board for a skeptic, or a snake, rat or bird for a criminal mentalist. Sensory Link (extra familiar ability): links the familiar to one of the master's senses (sight, hearing, smell or taste) for a stretch; the master must stay in meditation the whole time and perceives everything the familiar does with that sense.",
   "creatures": []
  },
  "study": {
   "ranks12": "Many academies have someone who, for 5 gold per shift, tests whether you have the talent and teaches the basic spells. Otherwise find a master through rumour and serve them around the clock as an apprentice.",
   "ranks34": "A few academies keep elderly, reluctant mentalists who teach for at least 50 gold per shift; the alternative is hard labour for a hermit.",
   "rank5": "Grandmasters are rare and unwilling; besides spell/skill prerequisites they demand a task or quest per spell (see masters).",
   "other": "Few teachers exist; best bet is an established academy, or becoming a hermit's assistant."
  },
  "masters": [
   {
    "name": "\"The White Cat\"",
    "requirement": "Must have mastered Bounce and have Sneaking 15+. Take part in a theft or spying mission for each spell taught."
   },
   {
    "name": "Linol the Doubter",
    "requirement": "Must have mastered Matter Control and have Myths & Legends 15+. Publicly help expose a compromising secret of someone in power for each spell taught."
   },
   {
    "name": "Raz Aldghul",
    "requirement": "Give away all possessions except three sets of clothes and coin for one week's stay; everything else goes to his mountain academy for the needy."
   }
  ],
  "startingSkills": [
   "Acrobatics",
   "Awareness",
   "Brawling",
   "Evade",
   "Healing",
   "Languages",
   "Mentalism",
   "Myths & Legends"
  ],
  "rules": [
   {
    "name": "Sensory Link",
    "text": "Familiar ability: share one sense (sight, hearing, smell or taste) with the familiar for a stretch while the mentalist meditates."
   }
  ],
  "spellTree": [
   {
    "rank": 1,
    "spells": [
     "Farsight",
     "Longstrider",
     "Stone Skin",
     "Power Fist",
     "Levitate"
    ]
   },
   {
    "rank": 2,
    "spells": [
     "Scrying",
     "Telepathy",
     "Divination",
     "Enchant Weapon",
     "Mental Strike"
    ]
   },
   {
    "rank": 3,
    "spells": [
     "Dominate",
     "Teleport",
     "True Sight",
     "Flight",
     "Shockwave"
    ]
   },
   {
    "rank": 4,
    "spells": [
     "Control Person",
     "Bounce",
     "Speed",
     "Matter Control"
    ]
   },
   {
    "rank": 5,
    "spells": [
     "Dominate Monster",
     "Invisibility"
    ]
   }
  ]
 },
 {
  "id": "necromancy",
  "name": "Necromancy",
  "page": 75,
  "source": "magic",
  "skill": "Necromancy",
  "attribute": "INT",
  "title": "Necromancer",
  "creation": true,
  "professions": [
   "Mage"
  ],
  "summary": "The magic of death, fear and pain: necromancers manipulate the energies that linger after death to terrify, wound and sap the living and to raise and command the dead. Many claim a scholarly interest in what makes life endurable; plenty simply crave the power.",
  "prevalence": "Feared and despised. No elf or halfling necromancers are known; dwarves, wolfkin and mallards have produced some, but it is most common among humans, especially descendants of mages of other schools.",
  "types": [
   {
    "name": "Corpse Inspector",
    "text": "An academic interested in death, pain and fear in theory; tolerated at academies but shunned."
   },
   {
    "name": "Tyrant",
    "text": "Uses death, fear and pain as tools to gain and expand power."
   },
   {
    "name": "Tormentor",
    "text": "Takes pleasure in inflicting suffering."
   }
  ],
  "familiar": {
   "text": "Usually a bullied cat, poodle, snake or owl that mimics its master's menacing look in public; the partnership is more equal when the familiar is bound to a reanimated carcass. Undead Familiar (extra familiar ability): the familiar takes half damage from piercing weapons and can make a fear attack against a living creature (not a monster) for 2 WP.",
   "creatures": []
  },
  "study": {
   "ranks12": "Pay 5 gold per shift plus one lunar cycle of labour for each spell taught.",
   "ranks34": "At least 50 gold per shift, plus the same lunar cycle of labour per spell.",
   "rank5": "Few have reached this level and they are busy darkening the world; it takes a significant incentive (see masters).",
   "other": "Taught master to apprentice. Masters are guarded by undead thralls or beasts: approach unarmed and grovel; expect one or more Persuasion rolls, with possibly fatal failure. Repeat attempts allowed."
  },
  "masters": [
   {
    "name": "Multras Orvinkel",
    "requirement": "Recover the Crotchet Hook of Necron from the tyrant sorcerer Lugash."
   },
   {
    "name": "Karoan of the Blind Crater",
    "requirement": "Convince him (Persuasion) that you share his worldview and join the invasion of Chieftain Wolfpaw's orc realm; Wolfpaw must be captured or killed."
   },
   {
    "name": "Zirazzia",
    "requirement": "Retrieve her stolen grimoire from master thieves protected by the pyromancer Fanandel."
   }
  ],
  "startingSkills": [
   "Awareness",
   "Bluffing",
   "Healing",
   "Languages",
   "Myths & Legends",
   "Necromancy",
   "Sneaking",
   "Spot Hidden"
  ],
  "rules": [
   {
    "name": "Undead Familiar",
    "text": "Familiar ability: half damage from piercing weapons; fear attack against a living non-monster for 2 WP."
   },
   {
    "name": "Raised Undead",
    "text": "Raise Skeleton, Raise Wight, Raise Mummy and Raise Skeletal Horde create undead servants you speak to telepathically at any range. Skeletons follow orders to the letter and have no gear unless given some. With a wight or mummy you pick whom it attacks, but its monster attack is rolled; only one wight, one mummy and one horde at a time. See DB_SUMMONS_EXTRA."
   },
   {
    "name": "Opposed Rolls",
    "text": "Most necromancy curses need an opposed roll vs the target's WIL or CON; the target gets a boon at power level 1, rolls normally at 2 and gets a bane at 3. Many have no effect on monsters and/or undead."
   }
  ],
  "spellTree": [
   {
    "rank": 1,
    "spells": [
     "Cadaverous Stench",
     "Fright",
     "Speak With Dead",
     "Pain",
     "Rigor Mortis",
     "Undead Aura"
    ]
   },
   {
    "rank": 2,
    "spells": [
     "Corrosive Darkness",
     "Dread",
     "Animate Carcass",
     "Injure",
     "Incapacitate",
     "Undead Resilience"
    ]
   },
   {
    "rank": 3,
    "spells": [
     "Terror",
     "Raise Skeleton",
     "Hand of Death"
    ]
   },
   {
    "rank": 4,
    "spells": [
     "Necrotic Chill",
     "Raise Wight",
     "Drain Life"
    ]
   },
   {
    "rank": 5,
    "spells": [
     "Raise Mummy",
     "Raise Skeletal Horde",
     "Defy Death"
    ]
   }
  ]
 },
 {
  "id": "symbolism",
  "name": "Symbolism",
  "page": 85,
  "source": "magic",
  "skill": "Symbolism",
  "attribute": "INT",
  "title": "Symbolist",
  "creation": true,
  "professions": [
   "Mage"
  ],
  "summary": "Symbolists cast by drawing, carving or tracing magical symbols that hold a spell for as long as they took to make. They see themselves as craftsfolk or artists, making wards, traps, compulsions and constructs that solve practical problems.",
  "prevalence": "Ancient, possibly as old as writing, and most common (though still rare) among elves and dwarves. Humans practise it mostly in rural or nomadic communities; mallard and wolfkin symbolists are very rare, and halflings weave symbols from plants, moss and fungi.",
  "types": [
   {
    "name": "Craftsman",
    "text": "Values the making itself — refining materials, size, weight and durability for years."
   },
   {
    "name": "Artist",
    "text": "Focuses on the beauty, balance and elegance of the symbols."
   },
   {
    "name": "Protector",
    "text": "Hired by the rich and powerful as a cheaper, more discreet guardian than other mages."
   }
  ],
  "familiar": {
   "text": "Uncommon, as symbol-crafting needs calm focus; cats and dogs are the usual choice. Mark (extra familiar ability): the symbolist can place symbol spells on the familiar's Mark, making them mobile, but their range drops to one fifth (e.g. 4 m instead of 20 m) and Personal-range spells affect only the familiar.",
   "creatures": []
  },
  "study": {
   "ranks12": "Easiest from an independent craftsman or artist found by asking around towns, villages and elven or halfling communities; usually 5 gold per shift, but you can haggle (Bartering).",
   "ranks34": "Often 50 gold per shift or more, haggling still possible; teachers are easy to find and refer you on if they lack the skill.",
   "rank5": "Grandmasters are approachable: a huge sum of gold, or more often a favour or errand (see masters).",
   "other": "Plenty of practitioners are willing to teach; the hermit Solitor Stonemake is the known exception."
  },
  "masters": [
   {
    "name": "Trulsa Rockstead",
    "requirement": "Recover enough sky-iron from a fallen comet in a wild forest for her to forge magical clappers for the Baroness of Elionor's copper gates."
   },
   {
    "name": "Dioneliel",
    "requirement": "Find the halfling Fjord, met about 120 years ago in a distant coastal village, and bring him to the island."
   },
   {
    "name": "Lergolda Two-Mind",
    "requirement": "Protect her from assassination — the goblin assassin clan \"Blood, Flour, Salt\" attacks the Runefire Academy. Who hired them?"
   }
  ],
  "startingSkills": [
   "Awareness",
   "Crafting",
   "Evade",
   "Myths & Legends",
   "Sleight of Hand",
   "Sneaking",
   "Spot Hidden",
   "Symbolism"
  ],
  "rules": [
   {
    "name": "Drawing and Carving",
    "text": "Symbolism spells (not tricks) are cast by carving a symbol (one shift), drawing it (one stretch) or tracing it in the air (an action). The effect starts at once and lasts as long as the casting time — a round for air-traced symbols. Symbols can be Dispelled like other spells. Spells whose casting time lacks \"action\" can't be traced in the air."
   },
   {
    "name": "Seeing a Symbol",
    "text": "Many symbols trigger when seen. An intelligent creature within range (usually 20 m) and facing an active symbol sees it at once; active symbols glow and are visible in darkness (GM rules on unclear cases). Those aware of it can try to look away with an Evade roll (not an action) each turn; on failure they glimpse it and are affected. A blindfold protects, but the wearer acts as in total darkness. The symbol fades when its duration ends."
   },
   {
    "name": "Permanent Symbols",
    "text": "Permanence can make a symbol permanent only if it is carved in durable material. Magic Seal and Nexus can't be used on symbolism spells (and aren't needed)."
   },
   {
    "name": "Large Symbols",
    "text": "Each extra stretch spent drawing (or shift carving) adds 5 m to the symbol's range. Decide the size before starting; roll for the spell when the symbol is finished."
   },
   {
    "name": "Symbol Requirement",
    "text": "All symbolism spells that follow these rules have the requirement \"symbol\" (instead of word/gesture)."
   },
   {
    "name": "Mark",
    "text": "Familiar ability: symbols placed on the familiar's Mark move with it at one fifth range; Personal spells affect only the familiar."
   }
  ],
  "spellTree": [
   {
    "rank": 1,
    "spells": [
     "Farscribe",
     "Hesitation",
     "Lure",
     "Shield Rune",
     "Sunder"
    ]
   },
   {
    "rank": 2,
    "spells": [
     "Warding Mark",
     "Halt",
     "Magic Armor",
     "Fortify"
    ]
   },
   {
    "rank": 3,
    "spells": [
     "Arcane Vortex",
     "Horrify",
     "Retribution Rune",
     "Power Source"
    ]
   },
   {
    "rank": 4,
    "spells": [
     "Portal",
     "Blind",
     "Reflect Magic",
     "Golem"
    ]
   },
   {
    "rank": 5,
    "spells": [
     "Runic Prison",
     "Petrify",
     "Raise Fortress"
    ]
   }
  ]
 },
 {
  "id": "witchcraft",
  "name": "Witchcraft",
  "page": 95,
  "source": "magic",
  "skill": "Witchcraft",
  "attribute": "INT",
  "title": "Witch",
  "creation": true,
  "professions": [
   "Mage"
  ],
  "summary": "A loose, uncoordinated craft with no academies, practised mostly by recluses who live close to plants and animals. Its spells deal in shapeshifting, divination, curses and control over others and over beasts and monsters.",
  "prevalence": "Kin to animism but focused on nature's tangible forms and patterns rather than its spirit; said to come from humans (or, some claim, from trolls). Most common among humans with nomadic or wilderness lives and among wolfkin clans; elves and halflings learn it more rarely.",
  "types": [
   {
    "name": "Wildling",
    "text": "The most common type: lives among plants and animals and only deals with civilized folk when asked for help or drawn into a conflict."
   },
   {
    "name": "Seer",
    "text": "Reads the future and also tries to steer it."
   },
   {
    "name": "Punisher",
    "text": "An embittered outcast who hates former kin and friends — unpredictable and very violent."
   }
  ],
  "familiar": {
   "text": "Often a raven or a (preferably black) cat; snakes, voles, boars and toads are also popular. Special ability — Predict: besides the standard familiar abilities (p.10), before making a skill roll that has one or more banes, the witch may spend 3 WP to cancel one bane.",
   "creatures": [],
   "ability": {
    "name": "Predict",
    "wp": 3,
    "timing": "before a skill roll with at least one bane",
    "text": "Spend 3 WP to cancel one bane on the roll."
   }
  },
  "study": {
   "ranks12": "Many witches take one or two apprentices. Coin is rarely accepted; instead each shift of instruction costs a week of service (cooking, cleaning, carpentry, tending the forest).",
   "ranks34": "Longer apprenticeship than other schools plus payment worth about 50 gold per shift in coin or goods. Each new spell takes a full day living with the witch, ending in practical tests.",
   "rank5": "Only a handful can teach it (see the Archwitches table): usually a great task or service plus a whole week living with the teacher.",
   "other": "Witches insist the craft is learned by living it and doing, not by theory — but in practice every aspiring witch still apprentices under a mentor."
  },
  "startingSkills": [
   "Witchcraft",
   "Awareness",
   "Beast Lore",
   "Bluffing",
   "Healing",
   "Myths & Legends",
   "Persuasion",
   "Sneaking"
  ],
  "rules": [
   {
    "name": "Opposed WIL spells",
    "text": "Curse, Hex, Compulsion and Polymorph are opposed by the target's WIL. Power level sets the target's roll: boon at 1, plain at 2, bane at 3."
   },
   {
    "name": "Stacking curses",
    "text": "A target can be under Curse and Hex at once (two banes); Doomsday Prophecy also stacks with both. None of these can be applied twice to the same target while active."
   }
  ],
  "masters": [
   {
    "name": "Damagus Asgus",
    "text": "Ancient hermit whose hut flies on huge vulture wings to places where great events are brewing.",
    "requirement": "Teaches powerful spells in return for help averting disasters — currently, finding and stopping cultists trying to open a rift into Chaos."
   },
   {
    "name": "Cruxhor",
    "text": "Forest troll guarding the Joyous Woods, often appearing as a mangy horned monster or a dire wolf.",
    "requirement": "Persuasion roll to convince her you're no threat, then help her drive out a violent ogre family from a forest cave."
   },
   {
    "name": "Rosia Ohl",
    "text": "Judgmental halfling exile living alone in an ever-blooming summer meadow.",
    "requirement": "Swear to adopt her worldview and wander as her apostle for at least a year; she likes patient listeners."
   }
  ],
  "spellTree": [
   {
    "rank": 1,
    "spells": [
     "Animal Sense",
     "Augury",
     "Helper",
     "Protective Aura",
     "Witch Mark"
    ]
   },
   {
    "rank": 2,
    "spells": [
     "Bestial Traits",
     "Soothsaying",
     "Fury of the Wild",
     "Curse"
    ]
   },
   {
    "rank": 3,
    "spells": [
     "Shapeshift",
     "Safe Travels",
     "Bestial Helper",
     "Hex"
    ]
   },
   {
    "rank": 4,
    "spells": [
     "Monster Whisperer",
     "Flattery",
     "Animate Object",
     "Compulsion"
    ]
   },
   {
    "rank": 5,
    "spells": [
     "Monster Form",
     "Monster Warden",
     "Polymorph",
     "Doomsday Prophecy"
    ]
   }
  ]
 },
 {
  "id": "alchemy",
  "name": "Alchemy",
  "page": 105,
  "source": "magic",
  "skill": "Alchemy",
  "attribute": "INT",
  "title": "Alchemist",
  "creation": true,
  "professions": [
   "Mage"
  ],
  "summary": "Instead of casting spells on the world, alchemists brew magical substances — potions, powders, bombs and poisons — from recipes and ingredients. A master can heal, harm, protect, empower and even make gold or prolong life.",
  "prevalence": "An old craft repackaged about 350 years ago by Democrito and his theory of 'primordial particles'. Found among all kin, though dwarves (who prefer metal) and elves (who revere untouched nature) seldom take it up; humans stress theory, while mallard, halfling and wolfkin alchemists lean more on practical craft.",
  "types": [
   {
    "name": "Philosopher",
    "text": "Seeks to understand and explain the nature of the world; little interest in practical brewing."
   },
   {
    "name": "Producer",
    "text": "Uses alchemical knowledge to make new substances, objects and effects — including the ubiquitous peddlers of ointments, creams and potions in towns and villages."
   }
  ],
  "familiar": {
   "text": "Usually a creature suited to the wilds — tracking, scouting, warning of danger — such as a dog-like canine or a small bird. Special ability — Gather: besides the standard familiar abilities (p.10), for 1 WP the familiar fetches up to D6 tiny items within 10 meters; using it gives a boon on Bushcraft rolls to gather herbs.",
   "creatures": [],
   "ability": {
    "name": "Gather",
    "wp": 1,
    "text": "Familiar collects up to D6 tiny items within 10 meters and brings them to you. Boon on Bushcraft rolls to gather herbs.",
    "range": "10 meters",
    "items": "D6"
   }
  },
  "study": {
   "ranks12": "Basic recipes can be bought for 5 gold each, with preparation instructions; learning one usually takes a shift. Ingredients (see the table) can be offered instead of coin.",
   "ranks34": "Mostly taught by the commercial (peddler) type, hoping you'll stay and help the business. Costs at least 50 gold; ingredients are accepted only if each item is worth at least 2 gold.",
   "rank5": "Top alchemists are wealthy and guard their secrets; money won't sway them — see the Alchemy Masters table for what they want.",
   "other": "Alchemy is a school of magic (and a secondary skill) learned like any other school. Its 'spells' are called recipes and are learned and prepared just like spells. Apprentices are common, mostly as foraging help and a captive audience."
  },
  "startingSkills": [
   "Alchemy",
   "Bartering",
   "Beast Lore",
   "Bushcraft",
   "Healing",
   "Myths & Legends",
   "Sleight of Hand",
   "Spot Hidden"
  ],
  "startingGear": [
   {
    "name": "Small Field Laboratory"
   },
   {
    "name": "General Herbs",
    "doses": "D6"
   },
   {
    "name": "Alchemical substances",
    "doses": 3,
    "note": "chosen from recipes you know"
   }
  ],
  "rules": [
   {
    "name": "Recipes instead of spells",
    "text": "Alchemy's spells are recipes: you brew substances rather than casting effects. Full rules in DB_ALCHEMY."
   },
   {
    "name": "Laboratory requirement",
    "text": "Every recipe needs an alchemical laboratory (not listed per recipe). Ordinary kitchen: bane on the Alchemy roll. Large room-sized laboratory (500+ gold): boon."
   },
   {
    "name": "No magic tricks",
    "text": "Alchemy has no magic tricks."
   }
  ],
  "masters": [
   {
    "name": "Mandolin Snufflewort",
    "text": "Rich, portly halfling shopkeeper on the town square with a love of brawn, pâtés and sausages.",
    "requirement": "Bored with ordinary food — teaches in return for exotic meat he hasn't processed yet, such as giant octopus, roc, chimera or giant amoeba."
   },
   {
    "name": "Baraka Ranhart",
    "text": "Wandering wolfkin philosopher chasing the 'fundamental laws of the universe'.",
    "requirement": "Wants Karilur Jungel's three-volume original 'The Significance of the Toenail Area to the Cosmic Mean' (volumes scattered); will teach in exchange."
   },
   {
    "name": "Methusel Gneiss",
    "text": "Fearsome old crone in a lonely hut between remote villages.",
    "requirement": "Secretly (and illegally) keeps a nymph captive for her tears. Finding the captive lets the PCs blackmail her into teaching a recipe; freeing the nymph afterwards makes her a mortal enemy."
   }
  ],
  "spellTree": [
   {
    "rank": 1,
    "spells": [
     "Stun Powder",
     "Focus Tonic",
     "Invigorating Decoction",
     "Medicinal Water",
     "Soothing Brew",
     "Sleeping Poison",
     "Herbal Concoction",
     "Liquid Courage",
     "Spiritlifter"
    ]
   },
   {
    "rank": 2,
    "spells": [
     "Puff Bomb",
     "Smokescreen",
     "Antidote",
     "Paralyzing Poison",
     "Healing Draught",
     "Love Potion",
     "Lock Acid"
    ]
   },
   {
    "rank": 3,
    "spells": [
     "Sunflash",
     "Drops of Strength",
     "Elixir of Wisdom",
     "Nimble Nectar",
     "Lethal Poison",
     "Healing Potion",
     "Tincture of Beauty",
     "Corrosive Sludge"
    ]
   },
   {
    "rank": 4,
    "spells": [
     "Explosive Orb",
     "Battle Fumes",
     "Philosopher's Stone",
     "Toxic Mist",
     "Healing Tincture",
     "Healing Vapors"
    ]
   },
   {
    "rank": 5,
    "spells": [
     "Create Gold",
     "Homunculus",
     "Elixir of Life"
    ]
   }
  ]
 },
 {
  "id": "enchanting",
  "name": "Enchanting",
  "page": 115,
  "source": "magic",
  "skill": "Enchanting",
  "attribute": "INT",
  "title": "Enchanter",
  "creation": true,
  "professions": [
   "Mage"
  ],
  "summary": "Enchanters bind magic into objects — weapons, armor, clothes, containers, wands — instead of casting at their surroundings. Their spells are passive item properties that last a shift, or forever with Permanence, and can be stacked on one item, optionally with drawbacks to pay for extra spells.",
  "prevalence": "An old craft-magic predating the Demon Wars, practised everywhere from village needleworkers to palace goldsmiths. Other mages often look down on it as workaday magic, but enchanters are proud of making magic available to ordinary folk.",
  "types": [
   {
    "name": "Toolmaker",
    "text": "Serves ordinary customers, either from a city workshop or travelling between villages."
   },
   {
    "name": "Court Purveyor",
    "text": "A showy, artistic enchanter who crafts beautiful items for nobles and kings."
   },
   {
    "name": "Venturer",
    "text": "Wants to use magic items as much as make them, and field-tests creations on adventures."
   }
  ],
  "familiar": {
   "text": "Enchanters pick host animals that can fetch, carry and work tools (often something big enough to pump bellows). Special familiar ability — Assistant: for 2 WP the familiar helps enchant an item, giving a boon on the roll. This is in addition to the general familiar abilities (p.10).",
   "abilities": [
    {
     "name": "Assistant",
     "wp": 2,
     "text": "The familiar helps you enchant an item: boon on the Enchanting roll."
    }
   ],
   "creatures": []
  },
  "study": {
   "ranks12": "Usually learned as an apprentice: hard labour for a small wage that can be traded for lessons at 5 gold per shift.",
   "ranks34": "Lessons cost around 50 gold per shift. Under a toolmaker you also keep half the profit of items/enchantments you sell, on top of your wage.",
   "rank5": "Great masters rarely share their top secrets; instruction usually has to be earned by helping a master (see Master Enchanters table).",
   "other": "Learning the Enchanting skill requires Crafting 12 or higher — also for new characters. High-rank enchanters may learn certain high-rank General spells (e.g. Permanence) without first learning the lower-rank General spells."
  },
  "startingSkills": [
   "Enchanting",
   "Bartering",
   "Crafting",
   "Hammers",
   "Knives",
   "Myths & Legends",
   "Sleight of Hand",
   "Spot Hidden"
  ],
  "startingGear": "Blacksmithing tools, carpentry tools or tanning tools. You may also have one starting item enchanted with a spell you know plus Permanence.",
  "noTricks": true,
  "teachers": [
   {
    "name": "Narvik Plum",
    "text": "Cheerful old travelling trinket-seller who also sells his own magic items.",
    "requirement": "Find his stolen chest (enchanted with Endless Capacity) taken from his wagon somewhere in the last three villages he visited; reward is a shift of instruction."
   },
   {
    "name": "Eldariel of Blue Lake Mountain",
    "text": "Vain elven mage selling marvellous, very expensive contraptions in big cities.",
    "requirement": "Wants the legendary Manacles of Baromorgos, said to be held by the wandering mountain giant Scula, to save his withering soul."
   },
   {
    "name": "Marlin Dunker",
    "text": "Adventurous dwarf who joins strangers' expeditions just to use his magic arsenal.",
    "requirement": "Teaches in exchange for information on a suitable dragon to kill and an escort to and from its lair."
   }
  ],
  "rules": [
   {
    "name": "Tools requirement",
    "text": "Every enchanting spell needs tools: blacksmithing, carpentry or tanning tools depending on the item. Magic Seal is not needed."
   },
   {
    "name": "Casting time & duration",
    "text": "Binding a spell takes a stretch; the effect starts at once and lasts a shift unless combined with Permanence. Can be Dispelled unless made permanent."
   },
   {
    "name": "No range",
    "text": "Spells are cast on items; any range in the effect is given in the spell."
   },
   {
    "name": "Power level",
    "text": "Most enchanting spells have one level; if a spell lists no power-level effects it costs a flat 2 WP."
   },
   {
    "name": "Multiple spells",
    "text": "Several enchanting spells can be cast on the same item at once in the same stretch. Pay WP and roll for each; if any roll fails, all fail."
   },
   {
    "name": "Drawbacks",
    "text": "Add one or more drawbacks when enchanting: each lets you add one extra spell at no WP cost and with no roll."
   },
   {
    "name": "Permanence",
    "text": "One casting of Permanence (rolled separately) makes every spell cast on the item at that time permanent — including its drawbacks."
   },
   {
    "name": "No magic tricks",
    "text": "Enchanting has no magic tricks."
   }
  ],
  "spellTree": [
   {
    "rank": 1,
    "spells": [
     "Warming",
     "Concealing",
     "Supple Armor",
     "Thinking Cap",
     "Luminous",
     "Farshot",
     "Keen Edge",
     "Unbreakable"
    ]
   },
   {
    "rank": 2,
    "spells": [
     "Fireproof",
     "Fleet Step",
     "Heroism",
     "Bane Weapon",
     "Dread Weapon",
     "Bleeding Weapon",
     "Poison Sting"
    ]
   },
   {
    "rank": 3,
    "spells": [
     "Resonant Plate",
     "Garment of Strength",
     "Magic Wand",
     "Enchanted Weapon",
     "Bloodsucker",
     "Hidden Weapon"
    ]
   },
   {
    "rank": 4,
    "spells": [
     "Lifesaver",
     "Endless Capacity",
     "Heavy Hitter",
     "Seeking Arrow",
     "Swift Swing",
     "Throwable"
    ]
   },
   {
    "rank": 5,
    "spells": [
     "Epic Armor",
     "Power Item",
     "Epic Weapon"
    ]
   }
  ]
 },
 {
  "id": "dracomancy",
  "name": "Dracomancy",
  "page": 131,
  "source": "magic",
  "skill": "Dracomancy",
  "attribute": "INT",
  "title": "Dracomancer",
  "creation": false,
  "professions": [
   "Mage"
  ],
  "summary": "The reality-bending magic of mature dragons, learnable by mortal archmages as a supplement to their own school. All its spells are rank 6 and extremely powerful — astral travel, creating and erasing matter, stopping or rewinding time — and cost triple WP.",
  "prevalence": "Practitioners are vanishingly few and come from any school or kin. Most keep it a hidden trump card; dragons see open use of it as an insult and a sign of weakness.",
  "types": [
   {
    "name": "Discreet dracomancer",
    "text": "The majority, who conceal their dracomantic spells."
   },
   {
    "name": "Dragonmaster",
    "text": "The rare few who openly flaunt the power and claim the title."
   }
  ],
  "familiar": {
   "text": "A dracomancer's familiar follows the rules of their primary school. Binding a familiar to a dragon hatchling is only legend, and would bring every dragon down on the mage.",
   "abilities": [],
   "creatures": []
  },
  "study": {
   "ranks12": "",
   "ranks34": "",
   "rank5": "",
   "other": "Only in play: you must have mastered another school (know at least one rank 5 spell, any school) before learning the Dracomancy skill or its spells. Teachers are extremely rare and demand extraordinary favours or payment (see Dracomancy Masters table)."
  },
  "startingSkills": [],
  "noTricks": true,
  "optionalRule": true,
  "teachers": [
   {
    "name": "Alvin Wineroot",
    "text": "Harmonist satyr held for decades as the entertaining 'guest' of the ancient dragon Karankion, who taught him dracomancy.",
    "requirement": "His friends hire rescuers; whoever frees him (by stealth or force) is taught dracomancy."
   },
   {
    "name": "Grimdira of Sunnan",
    "text": "Famous self-styled Dragonmaster living in a palace amid a dragon-like hoard.",
    "requirement": "Will teach anyone, but each dracomantic spell costs huge amounts of gold and jewels."
   },
   {
    "name": "Rafner the Devastator",
    "text": "Dying dragon exiled by his kind for atrocities, sulking in the Cinder Peaks.",
    "requirement": "Calm his rage and stay a month listening to his stories to be taught. Stay until he dies (2D6 months) and defend him from heroes to perhaps inherit his hoard."
   }
  ],
  "rules": [
   {
    "name": "Using Dracomancy",
    "text": "Dracomantic spells cost triple WP: 6 WP per power level. Rolled with the Dracomancy skill."
   },
   {
    "name": "Prerequisite",
    "text": "Every dracomantic spell is rank 6 with the prerequisite 'any rank 5 spell' from any school."
   },
   {
    "name": "A word of caution",
    "text": "Some dracomantic spells can upend a scenario; the group should agree beforehand whether dracomancy is allowed at the table."
   },
   {
    "name": "Dragons' view",
    "text": "Dragons regard blatant use of dracomancy as insulting and weak — flaunting it may provoke them."
   }
  ],
  "spellTree": [
   {
    "rank": 6,
    "spells": [
     "Astral Form",
     "Command Dragon",
     "Create",
     "Draconic Push",
     "Erase",
     "Force Field",
     "Freeze Time",
     "Reshape",
     "Reverse Time",
     "Translocate"
    ]
   }
  ]
 }
];
window.DB_MAGIC_SCHOOLS = DB_MAGIC_SCHOOLS;
var DB_MAGIC_TRICKS = [
 {
  "id": "fetch",
  "name": "Fetch",
  "school": "General",
  "page": 61,
  "text": "A loose object of weight 1 or less within 10 m floats to you.",
  "source": "core"
 },
 {
  "id": "flick",
  "name": "Flick",
  "school": "General",
  "page": 61,
  "text": "Give an object or creature within 10 m a magical flick for 1 damage — enough to crack glass.",
  "source": "core"
 },
 {
  "id": "light",
  "name": "Light",
  "school": "General",
  "page": 61,
  "text": "A focus of your choice shines with bright light in a 10 m radius for a shift; it goes out if you drop to zero HP.",
  "source": "core"
 },
 {
  "id": "open-close",
  "name": "Open/Close",
  "school": "General",
  "page": 61,
  "text": "Open or shut an unlocked door you can see within 10 m.",
  "source": "core"
 },
 {
  "id": "repair-clothes",
  "name": "Repair Clothes",
  "school": "General",
  "page": 61,
  "text": "Mend and clean the clothes of someone within 10 m, yourself included.",
  "source": "core"
 },
 {
  "id": "sense-magic",
  "name": "Sense Magic",
  "school": "General",
  "page": 8,
  "text": "Sense whether where you are, or an item you hold, is touched by magic — and if so, which spell and at what power level.",
  "source": "magic",
  "updated": true,
  "corePage": 61
 },
 {
  "id": "birdsong",
  "name": "Birdsong",
  "school": "Animism",
  "page": 63,
  "text": "Lovely birdsong surrounds you for a stretch, giving a boon to Awareness. Outdoors only.",
  "source": "core"
 },
 {
  "id": "clean",
  "name": "Clean",
  "school": "Animism",
  "page": 63,
  "text": "The room you're in is swept clean and put in order.",
  "source": "core"
 },
 {
  "id": "cook-food",
  "name": "Cook Food",
  "school": "Animism",
  "page": 63,
  "text": "Cook food instantly and automatically, with no Bushcraft roll (one action).",
  "source": "core"
 },
 {
  "id": "floral-trail",
  "name": "Floral Trail",
  "school": "Animism",
  "page": 63,
  "text": "Flowers spring up where you walk, wilting after a shift.",
  "source": "core"
 },
 {
  "id": "hairstyle",
  "name": "Hairstyle",
  "school": "Animism",
  "page": 63,
  "text": "Change your hair's colour, length and style — sometimes worth a boon to Bluffing or Persuasion.",
  "source": "core"
 },
 {
  "id": "heat-chill",
  "name": "Heat/Chill",
  "school": "Elementalism",
  "page": 65,
  "text": "Make the area within 10 m pleasantly warm or cool, protecting against cold for a shift.",
  "source": "core"
 },
 {
  "id": "ignite",
  "name": "Ignite",
  "school": "Elementalism",
  "page": 65,
  "text": "Light or snuff a candle, torch or lantern within 10 m.",
  "source": "core"
 },
 {
  "id": "puff-of-smoke",
  "name": "Puff of Smoke",
  "school": "Elementalism",
  "page": 65,
  "text": "A dramatic puff of smoke bursts in front of you — sometimes worth a boon to Sneaking.",
  "source": "core"
 },
 {
  "id": "lock-unlock",
  "name": "Lock/Unlock",
  "school": "Mentalism",
  "page": 69,
  "text": "Your touch locks or unlocks a non-magical lock.",
  "source": "core"
 },
 {
  "id": "magic-stool",
  "name": "Magic Stool",
  "school": "Mentalism",
  "page": 69,
  "text": "Create a round seat about half a metre wide and high that lasts until you leave.",
  "source": "core"
 },
 {
  "id": "slow-fall",
  "name": "Slow Fall",
  "school": "Mentalism",
  "page": 69,
  "text": "Drift down and land as lightly as a feather from any height.",
  "source": "core"
 },
 {
  "id": "summon-tweeg",
  "name": "Summon Tweeg",
  "school": "Demonology",
  "page": 28,
  "text": "Call up a tweeg — a rat-sized demon with no skills — that stays a shift and helps with everyday chores.",
  "source": "magic"
 },
 {
  "id": "stench",
  "name": "Stench",
  "school": "Demonology",
  "page": 28,
  "text": "Once per shift, fill a room with a reek so foul that everyone inside must leave or pass a CON roll or vomit. No effect in combat or similarly tense situations.",
  "source": "magic"
 },
 {
  "id": "slip-of-the-tongue",
  "name": "Slip of the Tongue",
  "school": "Demonology",
  "page": 28,
  "text": "Cut in on someone within 10 m mid-sentence and replace up to three of their words (ideally rude ones); bystanders hear it in their voice. Words beyond three come out in your voice. The victim can't be affected again for 24 hours.",
  "source": "magic"
 },
 {
  "id": "luring-song",
  "name": "Luring Song",
  "school": "Harmonism",
  "page": 48,
  "source": "magic",
  "text": "Draw a group of small mammals suited to the area (squirrels, hedgehogs, mice, rats…); they stay while you keep singing or playing."
 },
 {
  "id": "magical-melody",
  "name": "Magical Melody",
  "school": "Harmonism",
  "page": 48,
  "source": "magic",
  "text": "Give your voice or instrument a magical quality — a boon on PERFORMANCE where the GM finds it fitting, but not for spellcasting."
 },
 {
  "id": "voice-distortion",
  "name": "Voice Distortion",
  "school": "Harmonism",
  "page": 48,
  "source": "magic",
  "text": "Change your voice beyond recognition — sometimes worth a boon on BLUFFING (GM's call)."
 },
 {
  "id": "double-tongue",
  "name": "Double Tongue",
  "school": "Illusionism",
  "page": 58,
  "source": "magic",
  "text": "Speak aloud while one nearby person hears a different, secret message — e.g. a signal to flee, fight or keep quiet."
 },
 {
  "id": "embellish",
  "name": "Embellish",
  "school": "Illusionism",
  "page": 58,
  "source": "magic",
  "text": "Make colours, sounds, tastes and smells richer in a room-sized area for a stretch; it won't fool anyone unwilling to be fooled."
 },
 {
  "id": "phantasm",
  "name": "Phantasm",
  "school": "Illusionism",
  "page": 58,
  "source": "magic",
  "text": "Conjure fake objects and glowing orbs for show — a boon on BLUFFING or PERFORMANCE."
 },
 {
  "id": "shadow-play",
  "name": "Shadow Play",
  "school": "Illusionism",
  "page": 58,
  "source": "magic",
  "text": "Make shadows dance, take eerie shapes or crawl over your skin; anyone watching gets a bane on AWARENESS."
 },
 {
  "id": "blight",
  "name": "Blight",
  "school": "Necromancy",
  "page": 78,
  "source": "magic",
  "text": "Briefly sour your surroundings with grey hues, jarring sounds, foul tastes or stenches — a reminder that life is fleeting."
 },
 {
  "id": "preserve",
  "name": "Preserve",
  "school": "Necromancy",
  "page": 78,
  "source": "magic",
  "text": "A touch halts the decay of a recently dead body for a full day; can be renewed indefinitely."
 },
 {
  "id": "spectral-slap",
  "name": "Spectral Slap",
  "school": "Necromancy",
  "page": 78,
  "source": "magic",
  "text": "A stinging, humiliating slap from your gaze: 1 HP damage to a target within 10 m."
 },
 {
  "id": "taint",
  "name": "Taint",
  "school": "Necromancy",
  "page": 78,
  "source": "magic",
  "text": "Your presence spoils food, drink or a fresh corpse and spooks small animals nearby. Anyone who eats or drinks the tainted fare is exposed to a lethal poison of potency 9."
 },
 {
  "id": "cipher",
  "name": "Cipher",
  "school": "Symbolism",
  "page": 89,
  "source": "magic",
  "text": "Encode a text so only a named person you know can read it normally. Can be Dispelled. No symbol needed."
 },
 {
  "id": "dictation",
  "name": "Dictation",
  "school": "Symbolism",
  "page": 89,
  "source": "magic",
  "text": "A quill writes down everything you say, word for word, for a stretch. No symbol needed."
 },
 {
  "id": "erase",
  "name": "Erase",
  "school": "Symbolism",
  "page": 89,
  "source": "magic",
  "text": "Erase one page of text not carved into durable material just by looking at it. No symbol needed."
 },
 {
  "id": "speed-reading",
  "name": "Speed Reading",
  "school": "Symbolism",
  "page": 89,
  "source": "magic",
  "text": "Read a page per breath with full retention; learning from a book (e.g. a spell) takes a stretch instead of a shift. No symbol needed."
 },
 {
  "id": "broom-sweep",
  "name": "Broom Sweep",
  "school": "Witchcraft",
  "page": 98,
  "text": "A broom cleans and tidies the room you're in — dust and dirt gone, things put in order.",
  "source": "magic"
 },
 {
  "id": "itch",
  "name": "Itch",
  "school": "Witchcraft",
  "page": 98,
  "text": "Give a visible person within 20 m an annoying but harmless itch that lasts a stretch.",
  "source": "magic"
 },
 {
  "id": "read-stars",
  "name": "Read Stars",
  "school": "Witchcraft",
  "page": 98,
  "text": "Spend a stretch reading someone's future in the stars to gain a boon on Bluffing and Persuasion rolls against them.",
  "source": "magic"
 }
];
window.DB_MAGIC_TRICKS = DB_MAGIC_TRICKS;
var DB_MASTERCRAFTED = {
 "costMultiplier": 10,
 "strReduction": 3,
 "durabilityBonus": 3,
 "text": "Costs ×10; STR requirement −3 and durability +3."
};
window.DB_MASTERCRAFTED = DB_MASTERCRAFTED;
var DB_MEMENTOS = [
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
window.DB_MEMENTOS = DB_MEMENTOS;
var DB_MONSTERS = [
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
  ],
  "source": "core",
  "category": "Demons"
 },
 {
  "id": "dragon",
  "name": "Adult Dragon",
  "page": 128,
  "category": "Dragons",
  "ferocity": 3,
  "size": "Huge",
  "movement": 24,
  "armor": 6,
  "hp": 84,
  "flying": true,
  "coreEquivalent": "Dragon",
  "text": "A mature dragon with impulse control and an analytical mind, claiming a cave, valley or ruin as home. Its nest is a meticulously arranged hoard of gold and gems — every coin placed so any theft shows — reflecting a craving for order that fuels its hatred of chaotic demons.",
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
    "targets": "all within 20 m",
    "range": 20,
    "fear": "bane",
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A chilling roar: everyone within 20 m suffers a fear attack with a bane on the WIL roll."
   },
   {
    "roll": 2,
    "name": "Claw Attack",
    "damage": "2D10",
    "type": "slashing",
    "targets": "two within 4 m of each other",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Sweeps its claws at two foes within 4 m of each other: 2D10 slashing each."
   },
   {
    "roll": 3,
    "name": "Dragon Wind",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "all up to human size within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "A gale from its wings hurls every loose object and creature up to human size within 10 m 2D6 m, for the same bludgeoning damage; they land prone."
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
    "text": "Its spiked tail hits everyone within 6 m for 2D8 bludgeoning and knocks them down."
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
    "text": "A lightning-fast bite for 4D10 slashing."
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
    "text": "A 10 m cone of fire (as wide as it is far from the mouth): everyone hit takes 3D10 fire, armor doesn't help.",
    "ignoresArmor": true
   }
  ],
  "encounter": "A column of smoke rises ahead; the party finds a large escort wiped out by a dragon, reeking of sulfur and burnt flesh. Everything but a covered wagon is ash, and the wagon — perhaps carrying a bailiff's taxes — is empty.",
  "seed": "Clues lead to the lair of the dragon Scarge in an abandoned dwarven mine high in the mountains, riddled with passages — some big enough for her, many only for smaller folk — down to her vast nest at the bottom. Rivals want the hoard too: a dwarven band reclaiming the mine, elves after the Crown of Elderin atop the pile, and a small army sent by warlord Aknator. Alliances and betrayals follow.",
  "source": "bestiary",
  "corePage": 86
 },
 {
  "id": "ghost",
  "name": "Ghost",
  "page": 106,
  "category": "Undead",
  "ferocity": 2,
  "size": "Normal",
  "movement": 12,
  "armor": null,
  "hp": 27,
  "persuadable": "bane",
  "text": "A soul that has not found peace — clinging to a loved one, seeking justice or revenge, or holding knowledge it must pass on. Its mind is confused and prone to sudden rage, so helping it is risky.",
  "traits": [
   {
    "name": "Immunity",
    "text": "Immaterial: only magic and fire can hurt it. Beaten, it is merely driven off for a shift before coming back; Purge or settling its unfinished business ends it for good."
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
    "text": "Lunges at a player character within 10 m, hurling them 2D6 m back for the same bludgeoning damage; they land prone."
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
    "text": "Reaches into the victim's chest and grips the heart: 2D10 damage, armor doesn't help, and they become Scared.",
    "ignoresArmor": true
   },
   {
    "roll": 3,
    "name": "Ghost Scream",
    "damage": null,
    "type": null,
    "targets": "all player characters within 10 m",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A soul-chilling scream: every player character within 10 m rolls WIL against fear."
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
    "text": "Stares into one character's soul with visions of the dead: they become Scared and suffer a fear attack with a bane on the WIL roll."
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
    "text": "The chill of death: 2D8 damage, armor doesn't help, and no HP or WP healing until they spend a shift somewhere warm.",
    "ignoresArmor": true
   }
  ],
  "encounter": "A rickety rope bridge spans a ravine over a raging river. An old man on the bridge warns the party it is unsafe and urges them to climb down and find another crossing — he is the ghost of an adventurer who fell from it. His body lies in the river below; burying it lets him rest.",
  "seed": "Aimless, uncommunicative spirits haunt the streets of Willerby, and an adventurer named Bolta vanished the night it began. Catacombs reachable via a crack down the village well hold her body, killed by a trap, beside an open necromancy book glowing with ghostly energy. Closing the book ends the haunting, but Bolta's ghost rises to defend it from anyone who approaches.",
  "source": "bestiary",
  "corePage": 87
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
  ],
  "source": "core",
  "category": "Giants"
 },
 {
  "id": "giant-spider",
  "source": "bestiary",
  "name": "Giant Spider",
  "category": "Beasts",
  "page": 82,
  "ferocity": 2,
  "size": "Normal",
  "movement": 24,
  "armor": null,
  "hp": 36,
  "text": "Fast, strong, cunning web-spinning hunters that herd prey into prepared webs or drop on it from treetops and ledges. Their eyes can't stand light as bright as direct sunlight — a torch isn't enough.",
  "traits": [
   {
    "name": "Spider Web",
    "text": "Its web strands are thumb-thick and part only to slashing weapons, fire or magic. A strand has durability 8 (9 damage in one blow cuts it); a person-sized creature must cut 2D4 strands to pass."
   }
  ],
  "weaknesses": [
   "Light as bright as direct sunlight"
  ],
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
    "text": "Serrated mandibles slice one opponent for 2D8 slashing."
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
    "text": "Thrashing barbed legs hit every opponent within 2 m for D8 piercing."
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
    "text": "Its many eyes force everyone within 10 m to suffer a fear attack."
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
    "text": "Stinger for D10 piercing; anyone taking at least 1 damage gets paralyzing poison (potency 16). Can be parried."
   },
   {
    "roll": 5,
    "name": "Web Attack",
    "damage": null,
    "type": null,
    "targets": "opponent with the highest STR",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "text": "Spits web at the opponent with the highest STR: they roll EVADE (not an action) or are stuck, unable to move or take actions needing movement. Breaking free takes a STR roll with a bane (an action); others can help."
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
    "text": "Leaps onto an opponent: 2D6 bludgeoning, knocked down."
   }
  ],
  "encounter": "The hunter Deloriel, stuck for days in a giant spider's web, hears the party and calls weakly for help. Will they hear her — and will the spider come back for its meal?",
  "seed": "Krikelbik, an ancient giant spider who only ever hunted beasts, has been driven from her home by lumberjacks after its hardwood. Wounded and fleeing with her spiderkin servants, she reaches the party's camp and pleads by telepathic images, promising centuries of hoarded treasure — but they must also stop the lumber chief returning.",
  "corePage": 89
 },
 {
  "id": "griffon",
  "source": "bestiary",
  "name": "Griffon",
  "category": "Beasts",
  "page": 84,
  "ferocity": 2,
  "size": "Large",
  "movement": 30,
  "flying": true,
  "armor": null,
  "hp": 38,
  "text": "Majestic mountain fliers that swoop on travellers and their mounts. Elves raise war griffons from cubs, each bonded to a single rider, to patrol their realms — reportedly even dragons avoid their airspace.",
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
    "text": "Tears at a player character with its beak: 2D8 piercing."
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
    "text": "Rears and strikes D6 times, D8 slashing each; each strike must be dodged or parried separately."
   },
   {
    "roll": 3,
    "name": "Sweeping Claws",
    "damage": "D8",
    "type": "slashing",
    "targets": "all player characters within 2 m",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Sweeps its claws at every player character within 2 m: D8 slashing, knocked down."
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
    "text": "Grabs a player character in its beak and flings them: 2D6 piercing, thrown that many metres, landing prone."
   },
   {
    "roll": 5,
    "name": "Whirlwind",
    "damage": "D6",
    "type": "bludgeoning",
    "targets": "all player characters within 6 m",
    "range": 6,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Its wings blow every player character within 6 m D6 m away; they land prone and take the same in bludgeoning damage."
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
    "text": "Unless dodged, seizes a player character and flies 2D6+6 m up, dropping them on its next turn (instead of a new attack) for falling damage."
   }
  ],
  "encounter": "A shrieking griffon dives to distract the party and scatter their mounts while a second lands silently behind them, then both attack. They want easy prey: each retreats after taking more than 10 damage, and won't pursue if horses are left behind.",
  "seed": "Sir Griffonshield's beloved griffon Stormheart has vanished and suspicion falls on Haarpu's travelling jesters. Was it stolen, or did it tire of its ever-heavier knight and join the jesters willingly? The knight pays only if it comes home.",
  "corePage": 91
 },
 {
  "id": "harpy",
  "name": "Harpy",
  "page": 24,
  "category": "Rare Kin",
  "source": "bestiary",
  "ferocity": 1,
  "ferocityPer": "harpy",
  "size": "Normal",
  "movement": 24,
  "flying": true,
  "armor": null,
  "hp": 12,
  "hpPer": "harpy",
  "flock": true,
  "text": "Thieving, foul-mouthed flocks that rob anyone on the roads and will maim or kill for food or valuables. Rumor says answering their insults with even fouler ones can drive them off.",
  "traits": [
   {
    "name": "Flock",
    "text": "Harpies attack as a group but use only one harpy's turn per attack. When half the flock is dead the rest flee, returning when an opportunity arises."
   },
   {
    "name": "Wings",
    "text": "Attack from the air: melee attacks with weapons that aren't Long get a bane."
   }
  ],
  "attacks": [
   {
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 1,
    "name": "Threatening Cackle",
    "text": "Gruesome threats: everyone within 10 m rolls WIL against fear (core p.52)."
   },
   {
    "damage": "2D6",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 2,
    "name": "Coordinated Attack",
    "text": "The flock dives on the character wearing the most metal: 2D6 slashing; if hit, they're lifted and dropped from D3+3 m."
   },
   {
    "damage": "D6",
    "type": "bludgeoning",
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 3,
    "name": "Death From Above",
    "text": "Rocks and junk rain down: everyone within 10 m takes D6 bludgeoning."
   },
   {
    "damage": "2D6",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 4,
    "name": "Eye Gouge",
    "text": "Claws at a character's eyes: 2D6 piercing and blinded (as total darkness) for a stretch."
   },
   {
    "damage": "D8",
    "type": "slashing",
    "targets": "one per harpy",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 5,
    "name": "Mass Attack",
    "text": "The flock splits to attack as many characters within 10 m as there are harpies, D8 slashing each."
   },
   {
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": true,
    "dodge": true,
    "roll": 6,
    "name": "Excrement Attack",
    "parryNote": "with a shield",
    "text": "A rain of vomit and filth: everyone within 10 m must choose a condition. A shield can parry it."
   }
  ],
  "encounter": "The lone harpy Gadd waits in a tall tree for the characters to pass, then drops on whoever seems to carry the most food, grabs what she can and flies off hurling obscenities.",
  "seed": "A harpy flock has nested in the top of the temple tower in the village of Thornvale, stealing food, pelting children with filth and abusing passers-by. They've wrecked the tower stairs, so the characters must find another way up while the harpies harass them.",
  "corePage": 92
 },
 {
  "id": "manticore",
  "source": "bestiary",
  "name": "Manticore",
  "category": "Beasts",
  "page": 90,
  "ferocity": 2,
  "size": "Large",
  "movement": 16,
  "flying": true,
  "armor": null,
  "hp": 44,
  "text": "A rare, long-lived (200–400 years) and dwindling winged predator whose endless hunger drives it to devour everything in reach; it can't be scared or lured off. Its carcass is valuable to mages for potions, enchanted weapons and spell components.",
  "traits": [
   {
    "name": "Wings",
    "text": "Flies freely through the air."
   }
  ],
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
    "text": "Fires tail spikes at a player character within 20 m: D12 piercing and paralyzing poison (potency 12). A shield can parry it."
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
    "text": "Bites a player character with its many fangs: 3D8 slashing."
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
    "text": "Knocks an opponent down and claws them: 2D8 slashing plus D6 because they're prone."
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
    "text": "Whips its tail at two opponents: 2D6 slashing each, knocked down."
   },
   {
    "roll": 5,
    "name": "Crushing Charge",
    "damage": "3D6",
    "type": "bludgeoning",
    "targets": "player character with the highest STR within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Charges the player character with the highest STR within 10 m: 3D6 bludgeoning, knocked down."
   },
   {
    "roll": 6,
    "name": "Spike Rain",
    "damage": "D10",
    "type": "piercing",
    "targets": "all adventurers within 10 m",
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
    "text": "A volley of tail spikes: every adventurer within 10 m takes D10 piercing and paralyzing poison (potency 12)."
   }
  ],
  "encounter": "Everyone rolls AWARENESS; anyone succeeding spots incoming spikes and warns the rest, who then roll EVADE (if nobody succeeds, all are hit). The manticore fires once more (attack #6) and then climbs away in search of easier prey.",
  "seed": "The scholar Iblit Tilbi believes manticores are misunderstood and hires the party as escorts to prove it. At a mountain range he lays out a mound of smoked meat and recites poetry as three manticores land to feed peacefully — until the expedition leader steps closer and they catch the scent of fresh flesh. If Iblit survives, he soon decides the chimera must be tameable instead.",
  "corePage": 93
 },
 {
  "id": "minotaur",
  "name": "Minotaur",
  "page": 32,
  "category": "Rare Kin",
  "source": "bestiary",
  "ferocity": 2,
  "size": "Large",
  "movement": 16,
  "armor": null,
  "hp": 32,
  "gear": [
   "Two-Handed Axe"
  ],
  "text": "Bull-headed warriors who prize glory in battle above all, revering the legendary King Minas; many spend their lives seeking his axe, the Cleaver, said to restore his kingdom.",
  "traits": [
   {
    "name": "Typical Gear",
    "text": "Two-handed axe."
   }
  ],
  "attacks": [
   {
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
    "roll": 1,
    "name": "Bull Fist",
    "text": "A full-force punch: 2D6 bludgeoning and Dazed even if armor stops the damage."
   },
   {
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "roll": 2,
    "name": "Hoof Kick",
    "text": "Kicks the victim 2D6 m away for the same bludgeoning damage; they land prone."
   },
   {
    "damage": "2D8",
    "type": "piercing",
    "targets": "two within 2 m of each other",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "roll": 3,
    "name": "Horn Rush",
    "text": "Charges two enemies within 2 m of each other: 2D8 piercing each and knocked down."
   },
   {
    "damage": "weapon+D10",
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": true,
    "dodge": true,
    "roll": 4,
    "name": "Cleaving Chop",
    "weapon": true,
    "text": "An overhead chop for weapon damage plus D10. Can be parried."
   },
   {
    "damage": "weapon",
    "type": null,
    "targets": "all within 2 m",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 5,
    "name": "Sweeping Attack",
    "weapon": true,
    "text": "A wide sweep hits everyone within 2 m for weapon damage."
   },
   {
    "damage": "2D10",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "roll": 6,
    "name": "Stomping Attack",
    "text": "Leaps and lands on one adventurer: 2D10 bludgeoning and knocked down."
   }
  ],
  "encounter": "The minotaurs Gorm and Grong block a ford, demanding one gold coin's worth of goods per person to cross. They're touchy, and any argument escalates fast — can the characters Persuade them, or does it come to blows?",
  "seed": "The glory-seeking minotaur brothers Sigum and Moll are challenging every great fighter in the region. Merchants offer 10 gold per brother killed, but the jester king Haarpu will pay 50 gold for both delivered alive in chains for display.",
  "corePage": 94
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
  ],
  "source": "core",
  "category": "Trolls"
 },
 {
  "id": "wight",
  "name": "Wight",
  "page": 118,
  "category": "Undead",
  "ferocity": 2,
  "size": "Normal",
  "movement": 10,
  "armor": "as worn",
  "hp": 38,
  "armorValue": 4,
  "gear": [
   "Morningstar",
   "Chainmail"
  ],
  "text": "The most hateful of the undead, nursing centuries of grudges against a world it believes wronged it. Most are bound to their tomb or place of death, but some break free to take revenge or raise undead armies.",
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
    "text": "A ghastly scream: everyone within 10 m rolls WIL against fear."
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
    "text": "One victim meets its eyes: they become Scared and suffer a fear attack with a bane on the WIL roll."
   },
   {
    "roll": 3,
    "name": "Hand of the Dead",
    "damage": "2D4",
    "type": "bludgeoning",
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": false,
    "text": "A gesture flings a foe within 10 m 2D4 m away for the same bludgeoning damage; they land prone. Can't be dodged."
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
    "text": "A sudden sweep of its weapon hits every opponent within 2 m for weapon damage. Can be parried.",
    "weapon": true
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
    "text": "Grabs a victim: D6 damage ignoring armor; on their next turn they must pass Evade (not an action) to act at all, retrying each turn. They also become cold (Rulebook p.54) and can't heal HP or WP until warm.",
    "ignoresArmor": true
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
    "text": "A mighty swing rolling double the weapon's damage dice that knocks the victim down. Can be parried.",
    "weapon": true
   }
  ],
  "encounter": "A hill crowned with a crumbling, moss-grown stone circle; in its centre the ground has fallen in to reveal an empty burial chamber. The place reeks of hatred — anyone staying more than a stretch becomes Scared.",
  "seed": "The scholar Xeizial hires the party to find the marsh tomb of the trapped wight Gildraveth, guided by an old map and a book bound in basilisk skin. As they near it she stops eating, stares at the night sky and mutters over her book, refusing to explain. Under the wight's influence she has brought them as blood sacrifices to free it, and she stabs them in the back once they face Gildraveth.",
  "source": "bestiary",
  "corePage": 98
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
  ],
  "source": "core",
  "category": "Beasts"
 },
 {
  "id": "centaur",
  "name": "Centaur",
  "page": 18,
  "category": "Rare Kin",
  "source": "bestiary",
  "ferocity": 2,
  "size": "Large",
  "movement": 20,
  "armor": null,
  "hp": 28,
  "gear": [
   "Short Spear",
   "Longbow",
   "Quiver"
  ],
  "text": "Big, brash forest beings who love drunken revels (especially with satyrs) but turn wrathful on settlers, hunters and adventurers they think disrespect nature.",
  "traits": [
   {
    "name": "Alcohol Tolerance",
    "text": "Can drink huge amounts of wine and beer without getting very drunk."
   },
   {
    "name": "Typical Gear",
    "text": "Short spear, longbow and a quiver of arrows."
   }
  ],
  "attacks": [
   {
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "roll": 1,
    "name": "Horse Kick",
    "text": "Kicks backwards, throwing the victim 2D6 m for the same bludgeoning damage; they land prone."
   },
   {
    "damage": "2D10",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": true,
    "dodge": true,
    "roll": 2,
    "name": "Spear Thrust",
    "weapon": true,
    "text": "Thrusts its short spear for 2D10 piercing. Can be parried."
   },
   {
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "two within 2 m of each other",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 3,
    "name": "Crushing Hooves",
    "text": "Rears and stamps on two characters within 2 m of each other: 2D6 bludgeoning each."
   },
   {
    "damage": "D12",
    "type": "piercing",
    "targets": "one",
    "range": 30,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 4,
    "name": "Quick Shot",
    "ranged": true,
    "text": "Looses an arrow at someone within 30 m — preferably a mage or archer — for D12 piercing."
   },
   {
    "damage": "2D10",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "roll": 5,
    "name": "Ramming Attack",
    "text": "Slams its full weight into one foe: 2D10 bludgeoning and knocked down."
   },
   {
    "damage": null,
    "type": null,
    "targets": "all enemies within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [
     "Angry"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 6,
    "name": "Mocking Laughter",
    "text": "Deafening, scornful laughter: every enemy within 10 m rolls WIL or becomes Angry; anyone already Angry takes another condition of their choice."
   }
  ],
  "encounter": "The centaurs Atos and Atene confront the characters and demand to know their business. An obvious lie or any aim that threatens the local wilds makes them suspicious; if the characters can't talk their way out, Atos likely gallops off to fetch more centaurs.",
  "seed": "Dwarves have stolen a dozen barrels of the centaurs' strongest ale, and the trail vanishes where the forest meets the mountains. If the characters track down the dwarves and talk them into returning the barrels, they're invited to a magical all-night feast with many forest beings — waking with hazy memories, a pounding headache and valuable new friends."
 },
 {
  "id": "fairy",
  "name": "Fairy",
  "page": 20,
  "category": "Rare Kin",
  "source": "bestiary",
  "ferocity": 1,
  "ferocityPer": "fairy",
  "size": "Small",
  "movement": 16,
  "flying": true,
  "armor": null,
  "hp": 6,
  "hpPer": "fairy",
  "flock": true,
  "text": "Tiny elf-like pranksters of the forest who torment travelers for fun and enjoy it most when their tricks cause real harm.",
  "traits": [
   {
    "name": "Swarm",
    "text": "Fairies fight as a group; group attacks use only one fairy's turn. Once half of them have been damaged they flee, but likely return for revenge."
   },
   {
    "name": "Wings",
    "text": "Fly erratically and always attack from the air; can only be hit with ranged weapons or Long melee weapons."
   },
   {
    "name": "Invisibility",
    "text": "As an action, turns invisible except for its shadow. Any action affecting another creature makes it visible, and it can't vanish again for a stretch."
   }
  ],
  "attacks": [
   {
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [
     "Angry"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 1,
    "name": "Teasing",
    "text": "Insults and taunts: everyone within 10 m rolls WIL or becomes Angry; those already Angry take another condition of their choice."
   },
   {
    "damage": "D10",
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [
     "Dazed"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 2,
    "name": "Pinprick",
    "ignoresArmor": true,
    "text": "Several fairies jab one victim with needle daggers: D10 damage, armor doesn't help, and Dazed."
   },
   {
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "roll": 3,
    "name": "Blinding Dust",
    "text": "Glitter thrown in the air: everyone within 10 m rolls Evade (not an action) or acts as in total darkness for D6 rounds (core p.52)."
   },
   {
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 4,
    "name": "Sweet Dreams",
    "poison": {
     "type": "paralyzing",
     "potency": 12
    },
    "text": "Sneaks behind a foe and pricks them with an enchanted rose thorn: paralyzing poison (potency 12)."
   },
   {
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [
     "Disheartened"
    ],
    "prone": false,
    "parry": false,
    "dodge": false,
    "roll": 5,
    "name": "Enchanted Kiss",
    "text": "Blows a magic kiss: the victim rolls Evade (not an action) or becomes Disheartened; if already Disheartened, another condition of their choice."
   },
   {
    "damage": "D10",
    "type": "piercing",
    "targets": "one",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 6,
    "name": "Magic Arrow",
    "ranged": true,
    "text": "An enchanted arrow at someone within 10 m: D10 piercing and a fear attack (WIL roll)."
   }
  ],
  "encounter": "Passing through fairy territory, the characters suffer a string of pranks. If they take it all with good humor, the fairies may hand them a small parting gift once bored of the game.",
  "seed": "A dazed merchant wanders the road with no idea how she got there or where her horse and loaded wagon went, muttering about ghosts. Its tracks lead to the plundered wagon, and singing and laughter nearby reveal the fairy culprits. Can the characters get the goods back?"
 },
 {
  "id": "mermaid",
  "name": "Mermaid",
  "page": 30,
  "category": "Rare Kin",
  "source": "bestiary",
  "ferocity": 1,
  "size": "Normal",
  "movement": 14,
  "swimming": true,
  "armor": null,
  "hp": 16,
  "text": "Long-lived guardians of the sea who leave respectful sailors in peace — even rescue them — but hunt those who wantonly harm the waters, sometimes allying with sea giants against warships. Their sea lore is prized by mages and scholars.",
  "traits": [
   {
    "name": "Lifesaver",
    "text": "Can revive a drowned person with artificial respiration up to one stretch after death."
   },
   {
    "name": "Aquatic",
    "text": "Breathes underwater with gills. Can stay out of water for one stretch without trouble, then takes D6 damage per stretch on land."
   }
  ],
  "attacks": [
   {
    "damage": "2D6",
    "type": "piercing",
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 1,
    "name": "Harpoon Throw",
    "ranged": true,
    "text": "Hurls a whalebone harpoon at someone within 10 m: 2D6 piercing."
   },
   {
    "damage": "2D8",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "roll": 2,
    "name": "Spear Thrust",
    "text": "Thrusts its trident: 2D8 piercing and knocked down."
   },
   {
    "damage": null,
    "type": null,
    "targets": "all within 6 m",
    "range": 6,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "roll": 3,
    "name": "Fishing Fortune",
    "text": "Casts a net and circles everyone within 6 m: each rolls Evade (not an action) or is trapped, unable to move or act physically. Breaking free is a STR roll with a bane (an action); others can help."
   },
   {
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 4,
    "name": "Drowning Attack",
    "text": "Drags a victim into the water: they start drowning at once (core p.53) and can't move or act physically except to break free, a STR roll with a bane (an action); others can help."
   },
   {
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "cone",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 5,
    "name": "Wave Attack",
    "text": "Tail slaps raise a wave: every untethered object and creature in a 10 m cone is pushed 2D6 m and takes the same in bludgeoning."
   },
   {
    "damage": "2D4",
    "type": "bludgeoning",
    "targets": "all within 4 m",
    "range": 4,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 6,
    "name": "Whirlwind",
    "text": "A water whirlwind: every untethered object and creature up to human size within 4 m is thrown 2D4 m and takes the same in bludgeoning."
   }
  ],
  "encounter": "Sailing along, the characters hear cries for help from the mermaid Coralia, caught in a poacher's net. She begs to be freed and promises to return the favor if ever needed; once freed she thanks them and vanishes into the deep.",
  "seed": "The characters must recover a chest of documents from a ship wrecked on a rocky shore, but mermaids caused the wreck and won't let anyone near or take anything. If the characters win their trust, they learn the ship carried harpoons for the bloody whale hunt; helping dump that cargo lets them reach the captain's chest — but some sailors are still aboard."
 },
 {
  "id": "naiad",
  "name": "Naiad",
  "page": 34,
  "category": "Rare Kin",
  "source": "bestiary",
  "swimming": true,
  "ferocity": 2,
  "size": "Normal",
  "movement": 12,
  "armor": null,
  "hp": 24,
  "text": "Pale-green, impossibly beautiful beings of dark lakes and marshes who lure victims into the water and carry them to their caves, apparently feeding on their dreams and nightmares. Most victims die; a few are released, confused.",
  "traits": [
   {
    "name": "Enchant",
    "text": "If it can talk to a creature undisturbed, the target rolls WIL or is enchanted and follows the naiad until freed; a new roll at each sunrise, or Dispel breaks it."
   },
   {
    "name": "Invisibility",
    "text": "As an action, turns invisible. Any action affecting another creature makes it visible, and it can't vanish again until next sunrise."
   },
   {
    "name": "Aquatic",
    "text": "Lives underwater and can let a creature it touches breathe underwater."
   },
   {
    "name": "Beautiful",
    "text": "Anyone of the intelligent kin wanting to take a hostile action against it must first pass a WIL roll (not an action)."
   }
  ],
  "attacks": [
   {
    "damage": "D10",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 1,
    "name": "Strangulation",
    "ongoing": "D10",
    "text": "Grabs a victim's throat: D10 bludgeoning and D10 more on each of the victim's turns. They can't move or act physically except to break free, a STR roll with a bane (an action); others can help."
   },
   {
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": "bane",
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 2,
    "name": "Broken Heart",
    "text": "A dismissive wave at someone within 10 m who realizes their love is unrequited: fear attack with a bane on the WIL roll."
   },
   {
    "damage": "D8",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 3,
    "name": "Sharp Nails",
    "text": "Claws at the eyes: D8 slashing and the victim acts as in total darkness for D3 rounds."
   },
   {
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 4,
    "name": "Drowning Attack",
    "text": "Drags a victim into the water: they start drowning at once (core p.53) and can't move or act physically except to break free, a STR roll with a bane (an action); others can help."
   },
   {
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "roll": 5,
    "name": "Enchanting Song",
    "text": "A sweet song at someone within 10 m: they roll WIL or immediately take a movement and an action (no WP) of the GM's choosing, and lose their turn this round if they haven't acted."
   },
   {
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "cone",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 6,
    "name": "Tidal Wave",
    "text": "Raises a wave from water within 10 m: everything untethered in a 10 m cone from that source is pushed 2D6 m and takes the same in bludgeoning."
   }
  ],
  "encounter": "At a stream the characters see a breathtaking figure on the bank. The naiad tries to draw them in and enchant the character with the highest CHA; if that fails it flees, though it fights back if attacked.",
  "seed": "A young villager vanished by the lake — locals blame a sea serpent or brook horse, but investigation reveals a naiad newly settled there after being driven from its old home. Can the villagers live with so deadly a neighbor?"
 },
 {
  "id": "swan-maiden",
  "name": "Swan Maiden",
  "page": 38,
  "category": "Rare Kin",
  "source": "bestiary",
  "ferocity": 1,
  "size": "Normal",
  "movement": 14,
  "flying": true,
  "armor": null,
  "hp": 16,
  "text": "Rare female elves who can become white swans — a divine gift revered and feared by elves. They usually live alone near large waters; legend tells of male elves who gained a demonic black-swan form and are their bitter enemies.",
  "formNote": "Counts as an ordinary NPC in elf form and as a monster (these stats) in swan form; no separate NPC stat block is given.",
  "traits": [
   {
    "name": "Shapeshifter",
    "text": "Changes between elf and white swan (either way) as an action. In elf form she's an ordinary NPC; in swan form a monster that can still speak. Clothes and gear change with her unless metal or heavier than half her carrying capacity."
   },
   {
    "name": "Wings",
    "text": "In swan form she flies freely."
   }
  ],
  "attacks": [
   {
    "damage": "D8",
    "type": "bludgeoning",
    "targets": "all within 4 m",
    "range": 4,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "roll": 1,
    "name": "Wingbeat",
    "text": "A gust from her wings: every creature up to human size within 4 m is hurled D8 m, takes the same in bludgeoning and lands prone."
   },
   {
    "damage": "2D8",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 2,
    "name": "Pecking Attack",
    "text": "Repeated pecks: 2D8 slashing and a fear attack (WIL roll)."
   },
   {
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [
     "Disheartened"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 3,
    "name": "Swan Song",
    "text": "A lament for the fallen: everyone within 10 m becomes Disheartened, or takes another condition of their choice if already Disheartened."
   },
   {
    "damage": "2D4",
    "type": "slashing",
    "targets": "all enemies within 10 m",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 4,
    "name": "Flock of Swans",
    "text": "Summoned swans mob her foes: every enemy within 10 m takes 2D4 slashing and a fear attack."
   },
   {
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "roll": 5,
    "name": "Pleading Gaze",
    "text": "Begs someone within 10 m to stop fighting: they roll WIL or immediately take a movement and an action (no WP) of the GM's choosing, and lose their turn this round if they haven't acted."
   },
   {
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": "bane",
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "roll": 6,
    "name": "Gift of the Gods",
    "text": "Curses a foe within 10 m with chaotic visions of ancient times: fear attack with a bane on the WIL roll."
   }
  ],
  "encounter": "A wounded swan chased by a few harpies lands among the characters and becomes the young elf Laurinde — then the harpies attack. She helps fight them off and thanks the characters warmly if they succeed.",
  "seed": "Elven messengers report three swan maidens missing from their forest. The kidnapper is the human mage Alosie, who longs to fly and keeps them locked atop her tower to study and copy their power. Once the characters find the prisoners, someone has to free them."
 },
 {
  "id": "tree-kin",
  "name": "Tree Kin",
  "page": 40,
  "category": "Rare Kin",
  "source": "bestiary",
  "ferocity": 2,
  "size": "Large",
  "movement": 8,
  "armor": 6,
  "hp": 64,
  "text": "Legendary walking trees of the oldest forests — moss-grown, bark-skinned shepherds of the woods who speak with trees and animals, are as old and mighty as dragons, and distrust anyone carrying an axe.",
  "traits": [
   {
    "name": "Illusion",
    "text": "At any time can appear to be an ordinary tree; the illusion ends the next time it takes an action."
   },
   {
    "name": "Vulnerable to Fire",
    "text": "Fears fire above all: takes double damage from fire and does everything it can to stop foes using fire."
   },
   {
    "name": "Resistance",
    "text": "Piercing and bludgeoning damage are halved."
   },
   {
    "name": "Giant Stride",
    "text": "Over long distances can travel up to 60 km per shift; never tires and walks until it chooses to stop."
   }
  ],
  "resistances": [
   "piercing",
   "bludgeoning"
  ],
  "weaknesses": [
   "fire (double damage)"
  ],
  "attacks": [
   {
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 1,
    "name": "Command",
    "text": "Ancient words of power thunder out: everyone within 10 m suffers a fear attack."
   },
   {
    "damage": "D8",
    "type": null,
    "targets": "all enemies within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 2,
    "name": "Death From Above",
    "text": "A swarm of small birds dives on every foe within 10 m: D8 damage each, and they lose their next turn this round if they haven't acted."
   },
   {
    "damage": "2D10",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": true,
    "dodge": true,
    "roll": 3,
    "name": "Spear Thrust",
    "text": "Shapes a branch into a spear and thrusts: 2D10 piercing. Can be parried."
   },
   {
    "damage": "2D10",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "roll": 4,
    "name": "Crushing Blow",
    "text": "Slams its thickest branch onto a victim's head: 2D10 bludgeoning and knocked down."
   },
   {
    "damage": "2D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "roll": 5,
    "name": "Up, Up and Away",
    "text": "Grabs and hurls the victim 2D8 m for the same bludgeoning damage; they land prone."
   },
   {
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 6,
    "name": "Hang Them High",
    "ongoing": "2D6",
    "text": "Wraps a branch around a foe's neck: 2D6 bludgeoning and 2D6 more on each of the victim's turns. They can't move or act physically except to break free, a STR roll with a bane (an action); others can help."
   }
  ],
  "encounter": "A huge lone tree stands on a hilltop. When the characters approach it uproots itself and strides off into the forest; if followed, it vanishes, leaving them a message — a broken axe.",
  "seed": "A village is desperate: its woodcutters went into the deep forest and never returned. Their camp shows signs of a struggle. The tree kin Hommbom the Herder caught them felling his beloved trees and has shut them in a nearby cave to rethink their lives; he'll release them only if persuaded the characters' side will leave his part of the forest alone."
 },
 {
  "id": "ant-people",
  "name": "Ant People",
  "page": 44,
  "category": "Insectoids",
  "source": "bestiary",
  "ferocity": 1,
  "size": "Small",
  "movement": 14,
  "armor": 2,
  "hp": 8,
  "text": "Insectoid families of a few hundred ruled by a closely guarded queen, sharing senses telepathically within 10 km of her and using sign language with outsiders. Warriors scout and strike threats; workers set traps or collapse tunnels.",
  "traits": [
   {
    "name": "Coordinated",
    "text": "When not fighting alone, ant people choose their initiative cards freely before cards are drawn instead of drawing randomly."
   }
  ],
  "attacks": [
   {
    "damage": "D8",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 1,
    "name": "Painful Bite",
    "poison": {
     "type": "paralyzing",
     "potency": 9
    },
    "text": "A hard bite: D8 slashing and paralyzing poison (potency 9)."
   },
   {
    "damage": "D10",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 2,
    "name": "Sword of Bronze",
    "weapon": true,
    "text": "Swings its bronze sword for D10 slashing."
   },
   {
    "damage": "D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "roll": 3,
    "name": "Wrestling Attack",
    "ongoing": "D8",
    "text": "Pounces and wrestles the victim to the ground: D8 bludgeoning and D8 more on each of the victim's turns. They can't move or act physically except to break free, a STR roll (an action); others can help."
   },
   {
    "damage": "D8",
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 4,
    "name": "Electrocution",
    "ignoresArmor": true,
    "text": "Rubs its antennae to build a charge and shocks a foe: D8 damage, armor doesn't help, and they drop whatever they hold."
   },
   {
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [
     "Dazed"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 5,
    "name": "Confusing Dance",
    "text": "Scurries in circles round a foe: they roll WIL with a bane (not an action) or become Dazed."
   },
   {
    "damage": null,
    "type": null,
    "targets": "ally",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "roll": 6,
    "name": "Healing Kiss",
    "heal": "D8",
    "text": "Cleans a wounded family member's injuries with its mandibles: that ant heals up to D8 HP."
   }
  ],
  "encounter": "The young ant Xipst has stormed off from home over waxworms and blunders into the characters just as a search party arrives — which assumes he's been captured or attacked. Speech is useless: to avoid a fight the characters must drop weapons and raise their hands, or explain by gesture (Persuasion with a bane).",
  "seed": "The lonely, lost ant worker Sxzzt is the last of his family — a monster destroyed their home and killed the queen. If the characters take him in, he offers to lead them to the family's 'treasury' of coins and trinkets. Is the monster still there, what is it, and how will the world react to an ant traveling with them?"
 },
 {
  "id": "beetle-kin",
  "name": "Beetle Kin",
  "page": 46,
  "category": "Insectoids",
  "source": "bestiary",
  "ferocity": 1,
  "size": "Normal",
  "movement": 12,
  "armor": 6,
  "hp": 18,
  "text": "Human-sized, knight-armored insectoids living in dug burrows in groups of about a dozen under a domineering leader. Fierce but usually outnumbered, they prefer to move on rather than fight; some serve above ground as exotic mercenaries or bodyguards.",
  "traits": [
   {
    "name": "Digger",
    "text": "Always counts as having a shovel, halving digging time."
   }
  ],
  "attacks": [
   {
    "damage": "D10",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 1,
    "name": "Clobbering Blow",
    "text": "A rock-hard claw slams a foe: D10 bludgeoning."
   },
   {
    "damage": "D8",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 2,
    "name": "Double Strike",
    "multi": 2,
    "text": "Both claws lunge at one foe: two attacks of D8 slashing each."
   },
   {
    "damage": "2D6",
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 3,
    "name": "Bite",
    "poison": {
     "type": "paralyzing",
     "potency": 9
    },
    "text": "Strong mandibles bite: 2D6 damage and paralyzing poison (potency 9)."
   },
   {
    "damage": "D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "roll": 4,
    "name": "Surprise Kick",
    "text": "A sudden kick pushes a foe D6 m for the same bludgeoning damage and knocks them down."
   },
   {
    "damage": "D8",
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 5,
    "name": "Acid Spit",
    "ranged": true,
    "ignoresArmor": true,
    "text": "Spits corrosive poison at someone within 10 m: D8 damage, armor doesn't help."
   },
   {
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": true,
    "conditions": [
     "Dazed"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 6,
    "name": "Shattering Shriek",
    "text": "A shriek too high to hear: everyone within 10 m becomes Dazed and suffers a fear attack."
   }
  ],
  "encounter": "The ground starts to subside; a Spot Hidden roll notices in time to warn the others before a 10 m-wide area collapses. Everyone in it rolls Evade or falls 4 m into a freshly dug egg chamber, where as many beetle kin as there are characters rush in to defend their brood.",
  "seed": "Dwarven miners digging for iron and silver ask for help with a 'haunted' mine where miners keep vanishing. The real culprits are beetle kin picking off the dwarves to protect their homes; they can be talked into stopping if the dwarves promise to stay out of their territory."
 },
 {
  "id": "spider-kin",
  "name": "Spider Kin",
  "page": 48,
  "category": "Insectoids",
  "source": "bestiary",
  "ferocity": 2,
  "size": "Normal",
  "movement": 16,
  "armor": null,
  "hp": 28,
  "text": "The rarest and most enigmatic insectoids — literate, apparently highly magical spiders that dwell in dark webbed forests alongside giant spiders, weaving webs that catch prophecies rather than flies.",
  "traits": [
   {
    "name": "Many Eyed",
    "text": "Sees in all directions: can never be surprised, and all Sneaking rolls against it get a bane."
   },
   {
    "name": "Climber",
    "text": "Climbs any surface at full ground speed."
   },
   {
    "name": "Fate Weaver",
    "text": "Spins magic webs that catch dreams and prophecies, which it reads to foresee and steer the future; the GM decides what it learns. Others using the web get vague but useful hints. Often asks for magic items in exchange for its foresight."
   }
  ],
  "attacks": [
   {
    "damage": "D10",
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 1,
    "name": "Poison Bite",
    "poison": {
     "type": "paralyzing",
     "potency": 12
    },
    "text": "Strong mandibles bite: D10 damage and paralyzing poison (potency 12)."
   },
   {
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 2,
    "name": "Too Many Eyes",
    "text": "A stare from countless eyes: everyone within 10 m suffers a fear attack."
   },
   {
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": "bane",
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 3,
    "name": "Ominous Vision",
    "text": "Its eyes reflect a player character's dark future: one PC within 10 m suffers a fear attack with a bane on the WIL roll."
   },
   {
    "damage": "D8",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": true,
    "dodge": true,
    "roll": 4,
    "name": "Poison Sting",
    "poison": {
     "type": "paralyzing",
     "potency": 12
    },
    "text": "Whirls and stings with its rear: D8 piercing; anyone taking at least 1 damage also gets paralyzing poison (potency 12). Can be parried."
   },
   {
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 5,
    "name": "Sticky Web",
    "text": "Shoots web at a foe: they can't move or perform actions needing movement. Breaking free is a STR roll (an action); others can help."
   },
   {
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "roll": 6,
    "name": "Hypnotizing Eyes",
    "text": "The victim rolls WIL (not an action) or immediately takes a movement and an action (no WP) of the GM's choosing, and loses their turn this round if they haven't acted."
   }
  ],
  "encounter": "One character alone sees a large spider creature within 10 m, veiled by magic from everyone else, waving in welcome. If harmed it becomes visible and can be fought; if approached peacefully it hands over bark carved with a warning that the character has been chosen by the web of fate, should beware the darkness and must slay Ulugum the Destroyer. The GM decides what the prophecy means and whether it's true.",
  "seed": "A regent's firstborn is cursed to wither and die before his first birthday. The parents send the characters, laden with gifts, to the she-spider Sharlot, who can foresee and change fate — while the regent's enemies try to seize the gifts. The characters must win Sharlot over with fine words and magical offerings to break the curse."
 },
 {
  "id": "cave-troll",
  "source": "bestiary",
  "name": "Cave Troll",
  "category": "Trolls",
  "page": 52,
  "ferocity": 2,
  "size": "Large",
  "movement": 12,
  "armor": 2,
  "hp": 42,
  "regeneration": "D6",
  "text": "Cave-dwelling trolls even more sunlight-shy than the nightkin, leaving their caves only at night or in thick fog. Endlessly hungry, they treat everyone as food and can't be reasoned with; a few warlords keep them as war beasts by feeding them constantly.",
  "traits": [
   {
    "name": "Stubborn",
    "text": "Always finishes whatever it has started."
   },
   {
    "name": "Sensitive to Sunlight",
    "text": "Takes D6 damage per round in direct sunlight and can't regenerate; a troll brought to zero HP this way turns to stone. Dense foliage, thick cloud or full-cover clothing protects it."
   },
   {
    "name": "Regeneration",
    "text": "Heals D6 HP on each of its turns in combat, unless it is at zero HP."
   },
   {
    "name": "Treasure Eater",
    "text": "Eats gold coins and small gold items; its belly usually holds D12 gold coins."
   }
  ],
  "weaknesses": [
   "Sunlight"
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Rolling Attack",
    "damage": "2D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Curls into a boulder and rolls into one enemy: 2D8 bludgeoning, knocked down."
   },
   {
    "roll": 2,
    "name": "Cave Bats",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "summons": "Vampiric Bats",
    "text": "Stirs up a flock of cave bats that attack its enemies for D3 rounds (use the vampiric bats, Rulebook p.99)."
   },
   {
    "roll": 3,
    "name": "Head to Head",
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
    "helmetOnly": true,
    "text": "Headbutt: 2D6 bludgeoning and Dazed. Only a helmet reduces the damage."
   },
   {
    "roll": 4,
    "name": "Gobble",
    "damage": "2D8",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Bites for 2D8 piercing and holds the victim in its maw: they must roll STR (an action) each round to break free, taking another 2D8 on a failure."
   },
   {
    "roll": 5,
    "name": "Golden Spit",
    "damage": "D10",
    "type": "bludgeoning",
    "targets": "one",
    "range": 6,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "ranged": true,
    "text": "Spits a gold coin at someone within 6 m: D10 bludgeoning, a condition of the victim's choice — and they are 1 gold richer."
   },
   {
    "roll": 6,
    "name": "Troll Throw",
    "damage": "2D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Hurls a character 2D8 m in a random direction for the same bludgeoning damage; they land prone."
   }
  ],
  "encounter": "Iogulg, a half-blind cave troll who has just escaped goblin slavery, takes everyone he meets for a goblin and attacks in a berserk rage. A PERSUASION roll convinces him the party aren't goblins (any actual goblin also needs BLUFFING); a hearty meal can also calm him.",
  "seed": "A glint of tin in a ravine cave lures the party in, and the cave troll Ymor seals the entrance with a boulder to starve them out. They can trick him (BLUFFING) or find a crack-widened exit with SPOT HIDDEN — or delve deeper and find a hero's tomb guarded by skeleton warriors."
 },
 {
  "id": "forest-troll",
  "source": "bestiary",
  "name": "Forest Troll",
  "category": "Trolls",
  "page": 54,
  "ferocity": 2,
  "size": "Large",
  "movement": 12,
  "armor": null,
  "hp": 44,
  "regeneration": "D6",
  "text": "Foul-smelling, dim-witted woodland trolls that act like know-it-all children with enormous strength. They hunt in their forests and raid livestock when prey is scarce, but villages can keep a fragile peace with regular gifts of ale, game and cattle.",
  "traits": [
   {
    "name": "Impulsive",
    "text": "Draws an extra initiative card at the start of each round and keeps the two lowest. Never waits or dodges."
   },
   {
    "name": "Greedy",
    "text": "Hoards anything that glitters; may spare an opponent who offers gold (BARTERING roll)."
   },
   {
    "name": "Sensitive to Sunlight",
    "text": "Takes D6 damage per round in direct sunlight and can't regenerate; a troll brought to zero HP this way turns to stone. Dense foliage, thick cloud or full-cover clothing protects it."
   },
   {
    "name": "Regeneration",
    "text": "Heals D6 HP on each of its turns in combat, unless it is at zero HP."
   },
   {
    "name": "Illusion",
    "text": "In a forest it can blend in at any time, invisible while it stays still — it looks like a mossy boulder or fallen trunk."
   },
   {
    "name": "Overwhelming Stench",
    "text": "Anyone coming within 10 m must make a CON roll (not an action) or become Dazed."
   }
  ],
  "weaknesses": [
   "Sunlight"
  ],
  "noDodge": true,
  "attacks": [
   {
    "roll": 1,
    "name": "Uprooting",
    "damage": "3D6",
    "type": "bludgeoning",
    "targets": "two within 2 m of each other",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Rips up a tree and smashes two victims within 2 m of each other: 3D6 bludgeoning each, knocked down."
   },
   {
    "roll": 2,
    "name": "Troll Blade",
    "damage": "2D8",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "ignoresArmor": true,
    "text": "Slashes with a stone knife that always finds a gap: 2D8 slashing, armor doesn't help."
   },
   {
    "roll": 3,
    "name": "Rotten Breath",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 4,
    "fear": false,
    "conditions": [
     "Sickly"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Breathes on someone within 4 m: they become Sickly and must then pass a CON roll (with a bane from Sickly) or lose their turn this round if it hasn't passed."
   },
   {
    "roll": 4,
    "name": "Sinkhole",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Lures a victim within 10 m into a sinkhole that opens beneath them; climbing out takes an ACROBATICS roll (an action)."
   },
   {
    "roll": 5,
    "name": "Stomping Attack",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "all opponents within 2 m",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Stomps on every opponent within 2 m: 2D6 bludgeoning, knocked down.",
    "opponentsOnly": true
   },
   {
    "roll": 6,
    "name": "Bludgeoning Club",
    "damage": "4D6",
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
    "text": "Its hardest club blow: 4D6 bludgeoning and Dazed."
   }
  ],
  "encounter": "Panicked goats stampede past, chased by two hungry forest trolls. Let them pass and they keep hunting; block them and they grow angry, and unless calmed with food or gold they decide the party will do for supper.",
  "seed": "Forest trolls ambushed soldiers carrying a priceless crown, and the party is hired to recover it. The crown now sits between the horns of Hackla, the troll shaman, who is rallying trolls to raid the nobles' summer castle — the party must steal the crown back and/or stop the raid."
 },
 {
  "id": "mountain-troll",
  "source": "bestiary",
  "name": "Mountain Troll",
  "category": "Trolls",
  "page": 56,
  "ferocity": 1,
  "size": "Large",
  "movement": 10,
  "armor": null,
  "hp": 42,
  "regeneration": "D8",
  "text": "Solitary, mostly peaceful trolls of the high tundra who wander to sites of great historical events and carve what they learn into the rock. Desecrating such places rouses their fury, but stories, pipe weed and patient listening win their friendship.",
  "skills": {
   "Languages": 18,
   "Myths & Legends": 18
  },
  "spells": [
   "Divination",
   "Farsight",
   "Longstrider",
   "Scrying"
  ],
  "staffWp": 12,
  "traits": [
   {
    "name": "Sensitive to Sunlight",
    "text": "Takes D6 damage per round in direct sunlight and can't regenerate; a troll brought to zero HP this way turns to stone. Dense foliage, thick cloud or full-cover clothing protects it."
   },
   {
    "name": "Healing Blood",
    "text": "Its sweet, sap-like blood heals it D8 HP per turn in combat, unless it is at zero HP."
   },
   {
    "name": "Memories of Ages Past",
    "text": "Skill level 18 in LANGUAGES and MYTHS & LEGENDS."
   },
   {
    "name": "Troll Staff",
    "text": "The staff casts all general magic tricks plus DIVINATION, FARSIGHT, LONGSTRIDER and SCRYING, all at power level 3, from its own 12 WP, which refill every dawn. Bound to the troll's soul: taken from it, the staff no longer regains WP."
   }
  ],
  "weaknesses": [
   "Sunlight"
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "A Hundred Years of Solitude",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [
     "Disheartened"
    ],
    "prone": false,
    "parry": false,
    "dodge": false,
    "text": "Its gaze fills someone within 10 m with loneliness: they become Disheartened (or another condition if already) and must pass a WIL roll or lose their turn this round if it hasn't passed."
   },
   {
    "roll": 2,
    "name": "Horn Thrust",
    "damage": "2D10",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Rams with its horns: 2D10 bludgeoning, knocked down."
   },
   {
    "roll": 3,
    "name": "Entangling Roots",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Roots burst up and snare a player character within 10 m: they can't move or take actions needing movement until they pass a STR roll (an action). Others can help."
   },
   {
    "roll": 4,
    "name": "Memory Lapse",
    "damage": null,
    "type": null,
    "targets": "all enemies within 20 m in line of sight",
    "range": 20,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "text": "Draws a strange rune in the air: every enemy within 20 m who can see it rolls WIL to look away, or forgets what they were doing and loses their turn this round if it hasn't passed."
   },
   {
    "roll": 5,
    "name": "Terrifying Visions",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": "boon",
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Blows hallucinogenic mushroom powder at a player character, who suffers a fear attack with a boon on the WIL roll."
   },
   {
    "roll": 6,
    "name": "Sweeping Blow",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "all opponents within 2 m",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Sweeps its staff in a circle: every opponent within 2 m takes 2D6 bludgeoning and is knocked down.",
    "opponentsOnly": true
   }
  ],
  "encounter": "The mountain troll Jorma, resting with her pipe on the way to a battlefield where a dragon supposedly fell to demons, asks to hear the party's adventures. In exchange she tells a tale that leads them to hidden treasure nearby.",
  "seed": "An enraged mountain troll is flattening buildings in a settlement. The razed houses were all built with stones taken from a nearby castle ruin; restoring the ruin could end the attacks — though the troll may take the rebuilding as yet another desecration."
 },
 {
  "id": "forest-giant",
  "source": "bestiary",
  "name": "Forest Giant",
  "category": "Giants",
  "page": 60,
  "ferocity": 1,
  "size": "Large",
  "movement": 14,
  "armor": null,
  "hp": 56,
  "text": "The smallest giants, easily mistaken for trolls, who roam coniferous forests absorbed in the wonders of nature. The easiest giants to talk to, though easily distracted — and merciless to anyone who harms their woods.",
  "traits": [
   {
    "name": "Animal Friend",
    "text": "Friend to every forest animal; if one is hurt within a shift's walk, the giant senses it and comes to stop the culprit."
   },
   {
    "name": "Woodland Camouflage",
    "text": "In a forest it can blend in at any time, invisible while it stays still."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Gnawing Friends",
    "damage": "2D6",
    "type": "slashing",
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Small animals swarm out to defend it: everyone within 10 m of the giant takes 2D6 slashing and is knocked down."
   },
   {
    "roll": 2,
    "name": "Crushing Club",
    "damage": "4D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "An overhead club blow: 4D8 bludgeoning, knocked down."
   },
   {
    "roll": 3,
    "name": "Body Tackle",
    "damage": "4D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [
     "Dazed"
    ],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Charges and tackles one opponent: 4D6 bludgeoning, knocked down and Dazed."
   },
   {
    "roll": 4,
    "name": "Bear Hug",
    "damage": "3D6",
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "ignoresArmor": true,
    "text": "Crushes someone in a hug: 3D6 damage, armor doesn't help, and they lose their turn this round if it hasn't passed."
   },
   {
    "roll": 5,
    "name": "Forceful Throw",
    "damage": "2D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Tosses a victim 2D8 m over its shoulder for the same bludgeoning damage; they land prone."
   },
   {
    "roll": 6,
    "name": "Snaring Roots",
    "damage": "D6",
    "type": null,
    "targets": "all opponents within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "ignoresArmor": true,
    "text": "Roots grab every opponent within 10 m: D6 damage (armor doesn't help) and they can't move or take actions needing movement until they pass a STR roll (an action). Others can help.",
    "opponentsOnly": true
   }
  ],
  "encounter": "A wolf whimpers and growls in a deep pit trap. If the party rescue it, a forest giant steps out of the trees to thank them and leaves with the wolf; if they harm it, the giant intervenes and fights unless they leave at once.",
  "seed": "Birds lead the party to the injured forest giant Umrum, tended by forest animals in a cave. She asks for help against a demon that has seized the forest's ancient wellspring, poisoning the water to kill all life, and commands undead servants."
 },
 {
  "id": "mountain-giant",
  "source": "bestiary",
  "name": "Mountain Giant",
  "category": "Giants",
  "page": 62,
  "ferocity": 1,
  "size": "Huge",
  "movement": 16,
  "armor": null,
  "hp": 78,
  "text": "The giants most often met by ordinary folk: usually meek mountain herders who see small kin as just another kind of animal. Slow to anger but explosive once provoked, and clumsy and short-sighted enough to crush people by accident; some raid farms and kidnap youngsters as herders.",
  "traits": [
   {
    "name": "Short-Sighted",
    "text": "SNEAKING rolls to get past or hide from it get a boon."
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
    "text": "Fist or club with all its might: 4D10 bludgeoning, knocked down."
   },
   {
    "roll": 2,
    "name": "Where Did You Go?",
    "damage": null,
    "type": null,
    "targets": "all player characters",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "text": "Loses sight of the party: every player character rolls SNEAKING. If all succeed they may leave combat or make their next attack a sneak attack; the first to fail becomes its next target."
   },
   {
    "roll": 3,
    "name": "Stomping Attack",
    "damage": "3D6",
    "type": "bludgeoning",
    "targets": "all opponents within 2 m",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Stomps on every opponent within 2 m: 3D6 bludgeoning, knocked down.",
    "opponentsOnly": true
   },
   {
    "roll": 4,
    "name": "Sweeping Blow",
    "damage": "2D10",
    "type": "bludgeoning",
    "targets": "all opponents within 6 m",
    "range": 6,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Sweeps its club across every opponent within 6 m: 2D10 bludgeoning, knocked down.",
    "opponentsOnly": true
   },
   {
    "roll": 5,
    "name": "Enough is Enough",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Stuffs an annoying enemy into a sack: 2D6 bludgeoning and they can't move or take actions needing movement. Cutting them out needs a slashing weapon and a weapon-skill roll with a bane (an action), by the victim or someone else."
   },
   {
    "roll": 6,
    "name": "Stone Throw",
    "damage": "3D10",
    "type": "bludgeoning",
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "ranged": true,
    "text": "Hurls a boulder at an enemy within 10 m: 3D10 bludgeoning, knocked down."
   }
  ],
  "encounter": "A boulder flies at the party: a SPOT HIDDEN success lets someone warn the others; otherwise a random character suffers attack #6 (may roll EVADE). The thrower, Little Trull, charges roaring to scare them off but fights only in self-defence, so talking can win safe passage.",
  "seed": "Old Lord Brand sends the party into the mountains to ask two giant friends to defend his castle again. The family's new matriarch will only help in return for clearing demonic vermin from tunnels in her mountain too narrow for giants."
 },
 {
  "id": "sea-giant",
  "source": "bestiary",
  "name": "Sea Giant",
  "category": "Giants",
  "page": 64,
  "ferocity": 1,
  "size": "Huge",
  "movement": 20,
  "armor": null,
  "hp": 82,
  "swimming": true,
  "text": "The largest giants, eight to twelve times human height, who hunt whales and giant squid in the deep and ignore other folk. They turn on seafarers only when mermaids or others they respect convince them the sea is threatened.",
  "traits": [
   {
    "name": "Absent-Minded",
    "text": "Loses interest in small creatures quickly: it gives up pursuing them after about fifteen minutes."
   },
   {
    "name": "Sea Creature",
    "text": "Lives only in salt water and swims like a whale; holds its breath for hours but can't breathe underwater."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Thunder and Lightning",
    "damage": "2D10",
    "type": "lightning",
    "targets": "one",
    "range": 30,
    "fear": false,
    "conditions": [
     "Dazed"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "ranged": true,
    "ignoresMetalArmor": true,
    "text": "Calls a lightning bolt on an opponent within 30 m: 2D10 damage (metal armor doesn't help). The thunderclap then makes every opponent within 20 m Dazed."
   },
   {
    "roll": 2,
    "name": "Rock Throw",
    "damage": "3D10",
    "type": "bludgeoning",
    "targets": "one",
    "range": 20,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "ranged": true,
    "text": "Hurls a rock from the seabed at an opponent within 20 m: 3D10 bludgeoning; the wave knocks down the victim and everyone within 6 m of them."
   },
   {
    "roll": 3,
    "name": "Skewering Spear",
    "damage": "4D10",
    "type": "piercing",
    "targets": "one",
    "range": 50,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "ranged": true,
    "text": "Throws a broken-mast spear at an opponent within 50 m: 4D10 piercing, knocked down."
   },
   {
    "roll": 4,
    "name": "Whirling Flurry",
    "damage": "3D6",
    "type": "bludgeoning",
    "targets": "all opponents within 4 m",
    "range": 4,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Rains blows on every opponent within 4 m: 3D6 bludgeoning.",
    "opponentsOnly": true
   },
   {
    "roll": 5,
    "name": "Fishing Fortune",
    "damage": null,
    "type": null,
    "targets": "up to four within 4 m of each other",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Casts a net over up to four opponents within 4 m of each other and within 10 m of it: they can't move or take actions needing movement. Cutting free needs a slashing weapon and a weapon-skill roll with a bane (an action), by a victim or someone else."
   },
   {
    "roll": 6,
    "name": "Wave Attack",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "text": "Whips up waves: everyone within 10 m is flung 2D10 m and must roll SWIMMING to avoid drowning."
   }
  ],
  "encounter": "The sea boils ahead of the party's ship. On a failed SEAMANSHIP roll they sail into a fight between the sea giant Attia and a huge sea serpent; the hull is breached and Attia turns on them once the serpent flees. On a success they watch her surface roaring in triumph from a safe distance.",
  "seed": "A sea giant is sinking all shipping along a trading coast and the mariners' guild wants to know why. Poachers have taken over a small fishing village to catch every whale and squid they can; stop them and prove it, and the giant lets trade resume."
 },
 {
  "id": "titan",
  "source": "bestiary",
  "name": "Titan",
  "category": "Giants",
  "page": 66,
  "ferocity": 2,
  "size": "Huge",
  "movement": 14,
  "armor": 6,
  "hp": 64,
  "gear": [
   "Huge shield",
   "Huge mace or warhammer"
  ],
  "text": "Armoured, giant-kin champions from the dragon-demon wars, perhaps ritually forged into living weapons, that sleep as stone at around twenty known sites. When something wakes one it fights whoever it decides is the enemy until every last one is dead, then returns to slumber.",
  "traits": [
   {
    "name": "Hibernation",
    "text": "After completing a mission it withdraws and turns to stone until next called; it wakes if attacked or summoned by the ancient battle cries against dragons and demons."
   },
   {
    "name": "Resistance",
    "text": "Its iron heart halves damage from non-magical attacks."
   },
   {
    "name": "Shield",
    "text": "Parries one attack per round (ranged included) without using one of its turns, rolling against 15. The shield has durability 24."
   },
   {
    "name": "Heavy Footsteps",
    "text": "When it moves the ground shakes within 10 m: anyone there rolls WIL (not an action) or becomes Scared. Once per combat."
   }
  ],
  "resistances": [
   "Non-magical attacks"
  ],
  "shield": {
   "skill": 15,
   "durability": 24,
   "freeParries": 1
  },
  "attacks": [
   {
    "roll": 1,
    "name": "Hammer Blow",
    "damage": "D10",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "multi": 3,
    "text": "Three heavy blows at one opponent, D10 bludgeoning each; the victim is knocked down."
   },
   {
    "roll": 2,
    "name": "Battering Ram",
    "damage": "2D10",
    "type": "bludgeoning",
    "targets": "all in its path",
    "range": 2,
    "fear": false,
    "conditions": [
     "Dazed"
    ],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Charges behind its shield up to its Movement: everyone in the way takes 2D10 bludgeoning, is knocked down and Dazed."
   },
   {
    "roll": 3,
    "name": "Out of the Way",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Shoves a victim 2D6 m for the same bludgeoning damage; they land prone."
   },
   {
    "roll": 4,
    "name": "Ferocious Shake",
    "damage": "3D6",
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "ignoresArmor": true,
    "text": "Lifts a victim by the neck and shakes them: 3D6 damage, armor doesn't help, and they lose their turn this round if it hasn't passed."
   },
   {
    "roll": 5,
    "name": "Deafening Roar",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": "bane",
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A ground-shaking roar: everyone within 10 m suffers a fear attack with a bane on the WIL roll."
   },
   {
    "roll": 6,
    "name": "Earthquake",
    "damage": "D6",
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "ignoresArmor": true,
    "text": "Leaps and lands hard: everyone within 10 m takes D6 damage (armor doesn't help) and must roll AGL or fall prone. The titan is unaffected."
   }
  ],
  "encounter": "Beside an overgrown forest path stands a huge stone tablet. Cleaned, it shows a titan holding a dragon and a demon apart with shield and mace, a slain dragon and demon at its feet — leaving the party with the eerie sense of an ancient secret.",
  "seed": "A girl flees a village where a 'warrior monster' — a titan that has named the villagers its enemy — is hunting down everyone hiding there. The party can fight it, lure it away so survivors escape, or steer it toward a worthier foe such as the reputed demon cultist Gadim Dragonbane."
 },
 {
  "id": "basilisk",
  "source": "bestiary",
  "name": "Basilisk",
  "category": "Beasts",
  "page": 70,
  "ferocity": 2,
  "size": "Large",
  "movement": 16,
  "armor": 6,
  "hp": 38,
  "text": "A semi-intelligent reptilian predator with a rooster's head, huge claws, poisonous breath and a petrifying gaze. It prefers to hunt humans near settlements and even city catacombs.",
  "traits": [
   {
    "name": "Afraid of Chickens",
    "text": "Ferocity drops by one while a chicken is visible within 10 m, and it won't attack someone carrying a hen or rooster if other targets exist. A BEAST LORE roll recalls this."
   }
  ],
  "weaknesses": [
   "Chickens"
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Slash Attack",
    "damage": "2D8",
    "type": "slashing",
    "targets": "two within 4 m of each other",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Claws two player characters within 4 m of each other: 2D8 slashing each."
   },
   {
    "roll": 2,
    "name": "Peck",
    "damage": "3D8",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Pecks one player character with its beak: 3D8 piercing."
   },
   {
    "roll": 3,
    "name": "Cock-a-Doodle-Doo",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [
     "Dazed"
    ],
    "prone": true,
    "parry": false,
    "dodge": false,
    "text": "An ear-splitting crow: everyone within 10 m rolls CON (not an action); on a failure they fall prone, become Dazed and lose their turn this round if it hasn't passed."
   },
   {
    "roll": 4,
    "name": "Whip Attack",
    "damage": "D10",
    "type": "bludgeoning",
    "targets": "all within 4 m",
    "range": 4,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Lashes its tail at every adventurer within 4 m: D10 bludgeoning, knocked down."
   },
   {
    "roll": 5,
    "name": "Poison Cloud",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "poison": {
     "type": "lethal",
     "potency": 15
    },
    "text": "Spews a reeking cloud: everyone within 10 m is exposed to a lethal poison (potency 15)."
   },
   {
    "roll": 6,
    "name": "Petrifying Gaze",
    "damage": null,
    "type": null,
    "targets": "player character with the highest HP",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "petrify": true,
    "text": "Turns its gaze on the player character with the most HP. If they can see, they roll WIL (not an action) or turn to stone: unable to act but immune to damage. They die after 2D6 rounds unless they pass a WIL roll (one try per turn) to break free; DISPEL (power level 1) also reverses it while they live."
   }
  ],
  "encounter": "Around a bend stand three moss-covered statues, weapons raised to shield a fourth crouching figure — petrified decades ago. The basilisk responsible may still be nearby.",
  "seed": "Princess Qildara is slowly turning to stone; the mage Wyrrahn needs a basilisk's eyes for a cure. Cave trolls sabotage and then attack the party; captured trolls can be PERSUADED to name their employer — the princess's brother Qiamtor, who keeps a basilisk in a ruined wing of their castle to fuel the curse."
 },
 {
  "id": "brook-horse",
  "source": "bestiary",
  "name": "Brook Horse",
  "category": "Beasts",
  "page": 72,
  "ferocity": 2,
  "size": "Large",
  "movement": 24,
  "armor": null,
  "hp": 34,
  "swimming": true,
  "text": "A predator of rivers and rapids that looks like a large grey horse but has pointed teeth and a whiff of rotting seaweed. It breathes both air and water and nests in flooded caves full of its victims' bones.",
  "traits": [
   {
    "name": "Amphibious",
    "text": "Breathes both on land and underwater."
   },
   {
    "name": "Deceptive",
    "text": "Passes as an ordinary horse and lures victims into the water or onto its back, then gallops for the deepest water to throw them off and attack. Seeing through it takes a BEAST LORE roll."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Horse Kick",
    "damage": "2D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Kicks back, throwing a victim 2D8 m for the same bludgeoning damage; they land prone."
   },
   {
    "roll": 2,
    "name": "Ravenous Bite",
    "damage": "2D10",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Bites with sharp teeth: 2D10 slashing."
   },
   {
    "roll": 3,
    "name": "Crushing Hooves",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "two within 4 m of each other",
    "range": 2,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Rears and strikes two opponents within 4 m of each other: 2D6 bludgeoning each, and each suffers a fear attack."
   },
   {
    "roll": 4,
    "name": "Hateful Gaze",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": "bane",
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "text": "Fixes its hatred on a player character within 10 m: fear attack with a bane on the WIL roll."
   },
   {
    "roll": 5,
    "name": "Drowning",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Drags an opponent under. The victim starts drowning at once (core drowning rules, Rulebook p.53) and can't move or take actions needing movement except breaking free: STR roll with a bane. Others can help."
   },
   {
    "roll": 6,
    "name": "Wild Ride",
    "damage": "D6",
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [
     "Exhausted"
    ],
    "prone": false,
    "parry": false,
    "dodge": false,
    "ignoresArmor": true,
    "text": "Lures an opponent onto its back (resist with WIL with a bane). On a failure it bolts up to 48 m: the rider becomes Exhausted (or another condition) and takes D6 damage, armor doesn't help. It repeats this on its turn instead of a new attack until the rider hits zero HP or gets off; on their turn the rider may roll WIL to jump, taking 2D6 bludgeoning (armor doesn't help)."
   }
  ],
  "encounter": "A riderless grey horse stands mid-river, whinnying as if drowning. It is a brook horse luring the party into the water; one of its latest victims can be seen in the rapids.",
  "seed": "Log drivers keep vanishing near Timbercreek. Suspicion falls on a wolfkin tribe said to be touched by demonic madness and on fanged elves seen nearby, but the real killer is a brook horse nesting in the rapids."
 },
 {
  "id": "calydon",
  "source": "bestiary",
  "name": "Calydon",
  "category": "Beasts",
  "page": 74,
  "ferocity": 2,
  "size": "Large",
  "movement": 14,
  "armor": null,
  "hp": 52,
  "text": "A bull-sized, snow-white boar with spear-like tusks that breathes fire — likely an escaped magical experiment. Wildly aggressive, it charges much bigger foes or whole groups, so trappers can lure it into traps and sell it as a war beast.",
  "traits": [
   {
    "name": "Resistance",
    "text": "Takes half damage from fire."
   }
  ],
  "resistances": [
   "Fire"
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Charge",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Tackles an opponent 2D6 m backwards for the same bludgeoning damage; they're knocked down."
   },
   {
    "roll": 2,
    "name": "Skewering Tusks",
    "damage": "D12",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Thrusts its tusks: D12 piercing."
   },
   {
    "roll": 3,
    "name": "Crushing Hooves",
    "damage": "2D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Rears and kicks: 2D8 bludgeoning, knocked down."
   },
   {
    "roll": 4,
    "name": "Hurling Attack",
    "damage": "2D4",
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
    "ignoresArmor": true,
    "text": "Tosses a victim 2D4 m with its tusks: the same bludgeoning damage (armor doesn't help) and Dazed."
   },
   {
    "roll": 5,
    "name": "Hateful Grunt",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A hate-filled grunt: everyone within 10 m suffers a fear attack."
   },
   {
    "roll": 6,
    "name": "Breath of Fire",
    "damage": "2D10",
    "type": "fire",
    "targets": "cone",
    "range": 6,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "ignoresArmor": true,
    "text": "A 6 m cone of fire (as wide as it is far from the snout): everyone caught takes 2D10, armor doesn't help."
   }
  ],
  "encounter": "In a hollow, warriors trying to net a cornered calydon are being routed — only a few still stand. They badly need help, and hope the party doesn't side with the beast.",
  "seed": "Three calydons, sole survivors of a battle that wiped out two warlords' armies, lair in the castle ruin and raid travellers, crippling farming and trade. Only one has ever been seen at a time, so the party may be surprised to find three."
 },
 {
  "id": "chimera",
  "source": "bestiary",
  "name": "Chimera",
  "category": "Beasts",
  "page": 76,
  "ferocity": 3,
  "size": "Large",
  "movement": 14,
  "armor": null,
  "hp": 42,
  "text": "A magically fused predator with a lion's forebody, a goat's head and hindquarters, and a venomous snake for a tail. Feeding three creatures' appetites, it constantly hunts and ravages livestock — and shepherds.",
  "traits": [
   {
    "name": "Three Pairs of Eyes",
    "text": "Very hard to surprise: SNEAKING against it is rolled with a bane."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Claw Attack",
    "damage": "2D8",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Lunges and claws: 2D8 slashing, knocked down."
   },
   {
    "roll": 2,
    "name": "Lion Jaws",
    "damage": "2D10",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "The lion head bites: 2D10 slashing."
   },
   {
    "roll": 3,
    "name": "Goat Head",
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
    "text": "Butts with the goat head: 2D6 bludgeoning and Dazed."
   },
   {
    "roll": 4,
    "name": "Snakebite",
    "damage": "D8",
    "type": "piercing",
    "targets": "one",
    "range": 4,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "poison": {
     "type": "lethal",
     "potency": 15
    },
    "text": "The snake tail strikes someone within 4 m: D8 piercing; if damaged they also get lethal poison (potency 15)."
   },
   {
    "roll": 5,
    "name": "All at Once",
    "damage": "2D10",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "extraDamage": [
     {
      "damage": "2D6",
      "type": "bludgeoning"
     },
     {
      "damage": "D8",
      "type": "piercing"
     }
    ],
    "poison": {
     "type": "lethal",
     "potency": 15
    },
    "text": "Pounces with everything on one victim: 2D10 slashing, 2D6 bludgeoning and D8 piercing, armor applying to each separately. If the piercing gets through, lethal poison (potency 15)."
   },
   {
    "roll": 6,
    "name": "Cacophony",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Roars, bleats and hisses at once: everyone within 10 m suffers a fear attack."
   }
  ],
  "encounter": "Two dead minotaurs lie bitten, slashed and battered; a HEALING roll shows they were also poisoned. The chimera that killed them hid in the bushes when the party arrived and attacks when the moment is right.",
  "seed": "Something is taking a goat farmer's herd one by one. Tracking it leads to two chimeras feeding their helpless young — kill the parents and the cubs might fetch a fortune from a mage, warlord or noble."
 },
 {
  "id": "giant-amoeba",
  "source": "bestiary",
  "name": "Giant Amoeba",
  "category": "Beasts",
  "page": 78,
  "ferocity": 2,
  "size": "Large",
  "movement": 8,
  "armor": null,
  "hp": 64,
  "text": "A huge, corrosive mass of slime, probably an accident of ancient demon cultists, that lives to engulf and dissolve organic matter. It lurks in pits and cracks in swamps and deep caves, sometimes ruins, dark lakes or sewers.",
  "traits": [
   {
    "name": "Corrosive",
    "text": "Anyone touching it or damaged by its attacks is exposed to a paralyzing poison (potency 9)."
   },
   {
    "name": "Resistance",
    "text": "Half damage from non-magical weapons and attacks."
   },
   {
    "name": "Immunity",
    "text": "Immune to all piercing damage, magical or not."
   },
   {
    "name": "Vulnerable to Fire",
    "text": "Takes double damage from fire."
   }
  ],
  "resistances": [
   "Non-magical weapons and attacks"
  ],
  "immunities": [
   "Piercing"
  ],
  "weaknesses": [
   "Fire (double damage)"
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Tentacle Attack",
    "damage": "D10",
    "type": "bludgeoning",
    "targets": "all opponents within 2 m",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "poison": {
     "type": "paralyzing",
     "potency": 9
    },
    "text": "Tentacles lash every opponent within 2 m: D10 bludgeoning, and anyone damaged faces its corrosive poison (paralyzing, potency 9).",
    "opponentsOnly": true
   },
   {
    "roll": 2,
    "name": "Faces of the Dead",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Twisted faces swirl across its surface: every opponent within 10 m suffers a fear attack."
   },
   {
    "roll": 3,
    "name": "Theft",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 6,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "disarm": true,
    "text": "A tentacle snatches the weapon from an enemy within 6 m; it is absorbed and can only be recovered by killing the amoeba."
   },
   {
    "roll": 4,
    "name": "Slime Ball",
    "damage": "D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "ranged": true,
    "poison": {
     "type": "paralyzing",
     "potency": 9
    },
    "text": "Spits slime at someone within 10 m: D8 bludgeoning, and if damaged its corrosive poison (paralyzing, potency 9)."
   },
   {
    "roll": 5,
    "name": "Poison Cloud",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [
     "Dazed"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "poison": {
     "type": "paralyzing",
     "potency": 12
    },
    "text": "A stinking cloud: everyone within 10 m becomes Dazed and is exposed to paralyzing poison (potency 12)."
   },
   {
    "roll": 6,
    "name": "Absorption",
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
    "engulf": true,
    "poison": {
     "type": "paralyzing",
     "potency": 9
    },
    "text": "Pulls a victim inside: corrosive poison (paralyzing, potency 9) and D6 damage at once, armor doesn't help, then D6 more each turn. They can attack it from inside and get out when it dies."
   }
  ],
  "encounter": "A water-filled hole in the road has a horse's hindquarters sticking out, flies buzzing around it. A giant amoeba that strayed from its habitat has settled in the pit and eats passing travellers and their mounts.",
  "seed": "Servants vanish one by one from Castle Rosencrest and the nobles hire the party to investigate. Two giant amoebas in the cellar hunt by night; the castle's 'haunting' is the victims' ghosts, menacing in appearance but only trying to guide the party to the killers' lair."
 },
 {
  "id": "giant-octopus",
  "source": "bestiary",
  "name": "Giant Octopus",
  "category": "Beasts",
  "page": 80,
  "ferocity": 4,
  "size": "Large",
  "movement": 16,
  "armor": 3,
  "hp": 32,
  "swimming": true,
  "text": "A huge octopus of seas and great lakes, likely bred to guard moats and island waters. It senses anything near the water's edge, squeezes through tiny gaps, can chase prey onto land, and survives freezing solid in winter.",
  "traits": [
   {
    "name": "Three Hearts",
    "text": "Dragon rolls have no extra effect against it."
   },
   {
    "name": "Elastic",
    "text": "Squeezes through openings as narrow as 10 cm."
   },
   {
    "name": "Resistance",
    "text": "Takes half damage from bludgeoning attacks."
   }
  ],
  "resistances": [
   "Bludgeoning"
  ],
  "immuneToDragonRolls": true,
  "attacks": [
   {
    "roll": 1,
    "name": "Disarm",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 6,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "disarm": true,
    "text": "A tentacle snatches the weapon from an enemy within 6 m."
   },
   {
    "roll": 2,
    "name": "Crushing Embrace",
    "damage": "D10",
    "type": "bludgeoning",
    "targets": "one",
    "range": 6,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Squeezes an opponent within 6 m: D10 bludgeoning, plus D10 more at each of the victim's turns. They can't move or take actions needing movement except breaking free (STR with a bane). Others can help.",
    "ongoing": "D10"
   },
   {
    "roll": 3,
    "name": "Tentacle Slam",
    "damage": "2D6",
    "type": null,
    "targets": "one",
    "range": 6,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Slams a tentacle into an opponent within 6 m: 2D6 damage, knocked down."
   },
   {
    "roll": 4,
    "name": "Drowning",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 6,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Grabs a leg within 6 m and drags the victim under. The victim starts drowning at once (core drowning rules, Rulebook p.53) and can't move or take actions needing movement except breaking free: STR roll with a bane. Others can help."
   },
   {
    "roll": 5,
    "name": "Devour",
    "damage": "2D6",
    "type": "slashing",
    "targets": "one",
    "range": 6,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "engulf": true,
    "text": "Swallows an opponent within 6 m whole: 2D6 slashing. Inside it has no armor and they can keep attacking, but take D6 damage on each of their turns (armor doesn't help). They get out when it dies."
   },
   {
    "roll": 6,
    "name": "Black Fog",
    "damage": null,
    "type": null,
    "targets": "all adventurers within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "text": "Squirts ink: every adventurer within 10 m acts as in total darkness for D6 rounds."
   }
  ],
  "encounter": "An empty rowing boat drifts, with fading bubbles around it — someone has gone overboard. A giant octopus has the fisherman and won't let go.",
  "seed": "A fishing village hires the party to kill a giant octopus, hiding that they're hunting a sunken treasure the octopus is bound to guard along with undead warriors. If the party wins, armed villagers wait on shore hoping the weakened heroes will hand over the loot."
 },
 {
  "id": "hippogriff",
  "source": "bestiary",
  "name": "Hippogriff",
  "category": "Beasts",
  "page": 86,
  "ferocity": 2,
  "size": "Large",
  "movement": 24,
  "flying": true,
  "armor": null,
  "hp": 36,
  "text": "Half great bird of prey, half horse: proud, fearsome on land and in the air, and nearly impossible to tame. They live above the clouds on mountaintops; old bloodlines are gold-feathered and white-furred, younger ones mottled grey.",
  "traits": [
   {
    "name": "Craves Freedom",
    "text": "Captive wild hippogriffs always try to escape. One captured young can be tamed if it imprints on its rider for a year: the tamer must pass BEAST LORE, RIDING and PERSUASION in a row, all with a bane; after a failure, the next try is a year later."
   },
   {
    "name": "Dive",
    "text": "Opens combat by swooping with a shrill cry: every opponent within 20 m when it attacks in the first round suffers a fear attack."
   },
   {
    "name": "Wings",
    "text": "Flies freely through the air."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Horse Kick",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Kicks back: 2D6 bludgeoning and thrown that many metres, landing prone."
   },
   {
    "roll": 2,
    "name": "Razor Sharp Beak",
    "damage": "2D8",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Pecks with its sharp beak: 2D8 slashing."
   },
   {
    "roll": 3,
    "name": "Rearing Slash",
    "damage": "D8",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": true,
    "dodge": true,
    "multi": 2,
    "text": "Rears and claws twice at one opponent, D8 slashing each; each swipe must be dodged or parried separately."
   },
   {
    "roll": 4,
    "name": "Wingbeat",
    "damage": "D6",
    "type": "bludgeoning",
    "targets": "all opponents within 2 m",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Beats its wings at every opponent within 2 m: D6 bludgeoning, knocked down.",
    "opponentsOnly": true
   },
   {
    "roll": 5,
    "name": "Hunting Call",
    "damage": null,
    "type": null,
    "targets": "all within 20 m",
    "range": 20,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A ferocious shriek: every opponent within 20 m suffers a fear attack."
   },
   {
    "roll": 6,
    "name": "Long Drop",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Unless dodged, grabs a player character and leaps D6+6 m into the air, letting go on its next turn (instead of a new attack) for falling damage."
   }
  ],
  "encounter": "Panicked deer burst across the party's path, followed by a hunting hippogriff. It only wants a deer or two, but defends itself and its kill if attacked.",
  "seed": "In a mountain pass lies a hippogriff's days-old carcass; its starving foal cries from a hard-to-reach nest. Harpies watch the foal and attack anyone climbing to it; the alternative route through the mountain's caves risks the goblins living there. And what to do with the foal after?"
 },
 {
  "id": "hydra",
  "source": "bestiary",
  "name": "Hydra",
  "category": "Beasts",
  "page": 88,
  "ferocity": 1,
  "ferocityPer": "head",
  "size": "Large",
  "movement": 8,
  "armor": 3,
  "hp": 10,
  "hpPer": "head",
  "heads": "D3+1",
  "text": "A many-headed swamp reptile that hunts small game and scavenges carrion but will take bigger prey. Every severed head is replaced by two, so it takes cunning, courage and fire to kill one.",
  "traits": [
   {
    "name": "Many-Headed",
    "text": "Usually D3+1 heads, each with 10 HP and 1 Ferocity; every head must be severed or crushed to kill it. Each defeated head regrows as two at the start of the next round unless the stump is burned first (e.g. a torch, used as a club attack, or a spell). BEAST LORE reveals this."
   }
  ],
  "weaknesses": [
   "Fire (prevents head regrowth)"
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Swift Bite",
    "damage": "2D6",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "poison": {
     "type": "lethal",
     "potency": 12
    },
    "text": "A lightning-fast bite: 2D6 slashing and lethal poison (potency 12)."
   },
   {
    "roll": 2,
    "name": "Poison Spit",
    "damage": "D8",
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "ranged": true,
    "poison": {
     "type": "lethal",
     "potency": 12
    },
    "text": "Spits venom at someone within 10 m: D8 damage; if it exceeds their armor, lethal poison (potency 12)."
   },
   {
    "roll": 3,
    "name": "Rending Claws",
    "damage": "2D6",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Claws an opponent within 2 m: 2D6 slashing."
   },
   {
    "roll": 4,
    "name": "Tail Attack",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "all opponents within 4 m",
    "range": 4,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Sweeps its tail through every opponent within 4 m: 2D6 bludgeoning, knocked down.",
    "opponentsOnly": true
   },
   {
    "roll": 5,
    "name": "Crushing Slam",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "all opponents within 4 m",
    "range": 4,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Rears up and slams down on every opponent within 4 m: 2D6 bludgeoning, knocked down.",
    "opponentsOnly": true
   },
   {
    "roll": 6,
    "name": "Toxic Breath",
    "damage": null,
    "type": null,
    "targets": "cone",
    "range": 6,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "poison": {
     "type": "lethal",
     "potency": 12
    },
    "text": "Breathes a 6 m cone of poison (as wide as it is far from the mouth): everyone inside is exposed to lethal poison (potency 12)."
   }
  ],
  "encounter": "Boating through a swamp, the party sees a reptilian head surface, then a second and third. Left alone, the hydra sinks away; attacked, it fights until it has lost two heads, then leaves for easier prey.",
  "seed": "Halfling herb farmers at a swamp's edge are disappearing, and the village blames a curse from Jorma, an old forest troll hag. At her hut the party must first sort out wolves trying to free a pup she has adopted before learning she's innocent; the real culprit is a hydra that must be lured out and slain."
 },
 {
  "id": "medusa",
  "source": "bestiary",
  "name": "Medusa",
  "category": "Beasts",
  "page": 92,
  "ferocity": 2,
  "size": "Normal",
  "movement": 12,
  "flying": true,
  "armor": null,
  "hp": 36,
  "text": "Said to descend from a mighty witch cursed by dragons or demons with a petrifying gaze, whispering serpent hair, useless bronze hands and great wings, who later spread the curse to others.",
  "traits": [
   {
    "name": "Petrifying Gaze",
    "text": "Anyone within 30 m rolls WIL every turn (not an action) to avoid her eyes; on a failure they turn to stone — unable to act but immune to damage — and die after 2D6 rounds unless a WIL roll with a bane (one try per turn) breaks it; DISPEL (power level 1) also reverses it while they live. Averting your eyes while fighting means you can't parry or dodge her attacks; a blindfold avoids the gaze but you act as in total darkness."
   },
   {
    "name": "Resistance",
    "text": "Takes half damage from non-magical attacks."
   },
   {
    "name": "Wings",
    "text": "Flies freely through the air."
   }
  ],
  "resistances": [
   "Non-magical attacks"
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Snakebite",
    "damage": "D8",
    "type": "piercing",
    "targets": "all opponents within 2 m",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "poison": {
     "type": "lethal",
     "potency": 12
    },
    "text": "Her snakes strike every opponent within 2 m: D8 piercing; anyone whose armor is penetrated gets lethal poison (potency 12).",
    "opponentsOnly": true
   },
   {
    "roll": 2,
    "name": "Snake Tongues",
    "damage": null,
    "type": null,
    "targets": "all within 4 m",
    "range": 4,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "The snakes whisper ancient mockery: every opponent within 4 m suffers a fear attack."
   },
   {
    "roll": 3,
    "name": "Fists of Bronze",
    "damage": "2D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Pummels an opponent with bronze fists: 2D8 bludgeoning."
   },
   {
    "roll": 4,
    "name": "Up in the Air",
    "damage": null,
    "type": null,
    "targets": "the opponent she deems the greatest threat",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Seizes the opponent she deems the greatest threat, lifts them D6+3 m and drops them for falling damage."
   },
   {
    "roll": 5,
    "name": "Gust of Wind",
    "damage": "2D4",
    "type": "bludgeoning",
    "targets": "cone 10 m long, 10 m wide",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Conjures a gust: every opponent in a cone 10 m long and 10 m wide is thrown 2D4 m back for the same bludgeoning damage and lands prone."
   },
   {
    "roll": 6,
    "name": "Petrifying Gaze",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "petrify": true,
    "text": "Coaxes an opponent within 10 m to meet her eyes: they must immediately roll WIL with a bane or be petrified (see trait)."
   }
  ],
  "encounter": "The forest falls silent around a breathtakingly lifelike statue of a deer in mid-leap. The medusa who petrified it for its beauty hides in the trees beside the path and reveals herself if the party approaches the deer.",
  "seed": "A newly arrived sculptor's uncannily lifelike statues sell for hundreds of gold. She keeps a magically trapped medusa in her cellar and has her goons kidnap slum-dwellers to be petrified. A rival hires the party; once they uncover the truth they must decide whether to slay or free the medusa — and what to do about the sculptor's magic."
 },
 {
  "id": "pegasus",
  "source": "bestiary",
  "name": "Pegasus",
  "category": "Beasts",
  "page": 94,
  "ferocity": 2,
  "size": "Large",
  "movement": 30,
  "flying": true,
  "armor": null,
  "hp": 32,
  "text": "Shy, peaceful winged horses of legend that prefer flight to fighting and fear the undead, but fight to the death against demons and their champions. They can't be tamed, only befriended, and then help only on their own terms.",
  "traits": [
   {
    "name": "Peaceful",
    "text": "Always chooses flight over fight; fights only when it has no other choice."
   },
   {
    "name": "Wings",
    "text": "Flies freely through the air."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Horse Kick",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Kicks back: thrown 2D6 m for the same bludgeoning damage, landing prone."
   },
   {
    "roll": 2,
    "name": "Horse Bite",
    "damage": "D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [
     "Angry"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Bites an opponent: D8 bludgeoning and Angry (or another condition if already Angry)."
   },
   {
    "roll": 3,
    "name": "Crushing Hooves",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "two within 2 m of each other",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Rears and strikes two opponents within 2 m of each other: 2D6 bludgeoning each."
   },
   {
    "roll": 4,
    "name": "Whirlwind",
    "damage": "D6",
    "type": "bludgeoning",
    "targets": "all player characters within 6 m",
    "range": 6,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Its wings blow every player character within 6 m D6 m away; they land prone and take the same in bludgeoning damage."
   },
   {
    "roll": 5,
    "name": "Nosedive",
    "damage": null,
    "type": null,
    "targets": "all in an area 4 m wide, 30 m long",
    "range": 30,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Climbs and dives low over its enemies: every opponent in a 4 m × 30 m strip suffers a fear attack."
   },
   {
    "roll": 6,
    "name": "Mind Strike",
    "damage": null,
    "type": null,
    "targets": "opponent within 10 m who has dealt it the most damage",
    "range": 10,
    "fear": "bane",
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "text": "A psychic blast at whoever within 10 m has hurt it most: fear attack with a bane on the WIL roll."
   }
  ],
  "encounter": "A snow-white horse with a glittering mane and a strange bundle on its back paws the ground pleadingly: a pegasus fleeing monster hunters, its wings bound in a net. Freed, it flies off at once — but never forgets, and may one day save the party from certain death.",
  "seed": "Agonised whinnies lead to a ritual clearing of standing stones and a stone table: demon cultists have just summoned a greater demon, and a pegasus that tried to stop them lies badly wounded. Heal it and it can help find and defeat the cultists and demon hidden near the village the party just left."
 },
 {
  "id": "roc",
  "source": "bestiary",
  "name": "Roc",
  "category": "Beasts",
  "page": 96,
  "ferocity": 2,
  "size": "Huge",
  "movement": 28,
  "flying": true,
  "armor": null,
  "hp": 80,
  "text": "An enormous bird of prey that strips whole regions of livestock and nests on high peaks or giant pines. Ordinary-sized folk are barely worth its notice — unless they wear glittering gems — though its hatchlings will happily eat them.",
  "traits": [
   {
    "name": "Rocks From Above",
    "text": "Usually opens combat by dropping boulders: everyone within 10 m must pass EVADE or take 2D6 bludgeoning and be knocked down. It then lands among them."
   },
   {
    "name": "Wings",
    "text": "Flies freely through the air."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Claw Attack",
    "damage": "2D10",
    "type": "slashing",
    "targets": "two within 4 m of each other",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Sweeps its claws at two opponents within 4 m of each other: 2D10 slashing each."
   },
   {
    "roll": 2,
    "name": "Pecking Attack",
    "damage": "3D10",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Pecks with its huge beak: 3D10 slashing."
   },
   {
    "roll": 3,
    "name": "Piercing Shriek",
    "damage": null,
    "type": null,
    "targets": "all within 20 m",
    "range": 20,
    "fear": true,
    "conditions": [
     "Dazed"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A long, shrill scream: every opponent within 20 m becomes Dazed and suffers a fear attack."
   },
   {
    "roll": 4,
    "name": "Wing Attack",
    "damage": "2D8",
    "type": "bludgeoning",
    "targets": "all opponents within 4 m",
    "range": 4,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Heavy wings strike every opponent within 4 m: 2D8 bludgeoning, knocked down.",
    "opponentsOnly": true
   },
   {
    "roll": 5,
    "name": "Gust of Wind",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "all within 10 m in front",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "A wingbeat gust: every creature up to human size within 10 m in front of it is thrown 2D6 m for the same bludgeoning damage, landing prone."
   },
   {
    "roll": 6,
    "name": "High Drop",
    "damage": "D8",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Snatches an enemy in its talons (D8 slashing), flies D6+6 m up and drops them for falling damage on top."
   }
  ],
  "encounter": "A huge bird glides overhead, then a dragon sweeps by hunting it: the party witnesses a rare battle between roc and dragon. As the two break off and flee in opposite directions, something falls from the roc's talons.",
  "seed": "An old knight pays handsomely for a roc egg so his newborn grandson can grow up with the chick. The party must deal with two nesting rocs by force, guile or stealth — and survive the trip home with the egg."
 },
 {
  "id": "sea-serpent-normal",
  "source": "bestiary",
  "name": "Sea Serpent (Normal)",
  "variantOf": "Sea Serpent",
  "category": "Beasts",
  "page": 98,
  "ferocity": 2,
  "size": "Normal",
  "movement": 18,
  "armor": 1,
  "hp": 40,
  "swimming": true,
  "text": "Primitive, long-lived freshwater predators of lakes and rivers — and sometimes moats, flooded mines or deep wells where they wait for centuries. They range from eel-sized to big enough to crush boats and drawbridges; some lizard-folk clans worship the largest with sacrifices.",
  "traits": [
   {
    "name": "A Taste for Blood",
    "text": "If an attack on its tail (made with a bane) deals at least 1 slashing or piercing damage, roll D6 each time it attacks from then on: on 4–6 it attacks itself instead. BEAST LORE reveals this weakness."
   },
   {
    "name": "Varying Size",
    "text": "Comes in Normal, Large and Huge sizes, with different stats and attack damage."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Tail Swipe",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Swipes its tail at an opponent within 10 m: 2D6 bludgeoning, knocked down."
   },
   {
    "roll": 2,
    "name": "Devour",
    "damage": "2D4",
    "type": null,
    "targets": "opponent with the highest STR",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "engulf": true,
    "text": "Swallows the opponent with the highest STR: 2D4 damage. Inside it has no armor and they can keep attacking, but take D6 damage on each of their turns (armor doesn't help). They get out when it dies."
   },
   {
    "roll": 3,
    "name": "Ferocious Bite",
    "damage": "2D6",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Bites a player character: 2D6 slashing."
   },
   {
    "roll": 4,
    "name": "Drowning",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Pulls an opponent into the deep. The victim starts drowning at once (core drowning rules, Rulebook p.53) and can't move or take actions needing movement except breaking free: STR roll with a bane. Others can help."
   },
   {
    "roll": 5,
    "name": "Crushing Blow",
    "damage": "2D4",
    "type": "bludgeoning",
    "targets": "up to two within 2 m of each other",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Rears up and crashes down on up to two player characters within 2 m of each other: 2D4 bludgeoning each, knocked down."
   },
   {
    "roll": 6,
    "name": "Constriction",
    "damage": "2D4",
    "type": "bludgeoning",
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Coils its tail around an opponent within 10 m: 2D4 bludgeoning, and the same again at each of the victim's turns. They can't move or take actions needing movement except breaking free (STR with a bane). Others can help.",
    "ongoing": "2D4"
   }
  ],
  "encounter": "On a calm lake the party's boat suddenly rocks as a dark shape passes beneath — a sea serpent hungry for adventurers, trying to capsize them.",
  "seed": "A lakeside village holds a contest to catch a newly sighted sea serpent: the winner earns the title Kingfisher and a fine reward. Hunters and adventurers flock in and bets fly — and the serpent turns out to be an enormous one."
 },
 {
  "id": "sea-serpent-large",
  "source": "bestiary",
  "name": "Sea Serpent (Large)",
  "variantOf": "Sea Serpent",
  "category": "Beasts",
  "page": 98,
  "ferocity": 2,
  "size": "Large",
  "movement": 18,
  "armor": 3,
  "hp": 56,
  "swimming": true,
  "text": "Primitive, long-lived freshwater predators of lakes and rivers — and sometimes moats, flooded mines or deep wells where they wait for centuries. They range from eel-sized to big enough to crush boats and drawbridges; some lizard-folk clans worship the largest with sacrifices.",
  "traits": [
   {
    "name": "A Taste for Blood",
    "text": "If an attack on its tail (made with a bane) deals at least 1 slashing or piercing damage, roll D6 each time it attacks from then on: on 4–6 it attacks itself instead. BEAST LORE reveals this weakness."
   },
   {
    "name": "Varying Size",
    "text": "Comes in Normal, Large and Huge sizes, with different stats and attack damage."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Tail Swipe",
    "damage": "2D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Swipes its tail at an opponent within 10 m: 2D8 bludgeoning, knocked down."
   },
   {
    "roll": 2,
    "name": "Devour",
    "damage": "2D6",
    "type": null,
    "targets": "opponent with the highest STR",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "engulf": true,
    "text": "Swallows the opponent with the highest STR: 2D6 damage. Inside it has no armor and they can keep attacking, but take D6 damage on each of their turns (armor doesn't help). They get out when it dies."
   },
   {
    "roll": 3,
    "name": "Ferocious Bite",
    "damage": "2D8",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Bites a player character: 2D8 slashing."
   },
   {
    "roll": 4,
    "name": "Drowning",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Pulls an opponent into the deep. The victim starts drowning at once (core drowning rules, Rulebook p.53) and can't move or take actions needing movement except breaking free: STR roll with a bane. Others can help."
   },
   {
    "roll": 5,
    "name": "Crushing Blow",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "up to two within 4 m of each other",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Rears up and crashes down on up to two player characters within 4 m of each other: 2D6 bludgeoning each, knocked down."
   },
   {
    "roll": 6,
    "name": "Constriction",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Coils its tail around an opponent within 10 m: 2D6 bludgeoning, and the same again at each of the victim's turns. They can't move or take actions needing movement except breaking free (STR with a bane). Others can help.",
    "ongoing": "2D6"
   }
  ],
  "encounter": "On a calm lake the party's boat suddenly rocks as a dark shape passes beneath — a sea serpent hungry for adventurers, trying to capsize them.",
  "seed": "A lakeside village holds a contest to catch a newly sighted sea serpent: the winner earns the title Kingfisher and a fine reward. Hunters and adventurers flock in and bets fly — and the serpent turns out to be an enormous one."
 },
 {
  "id": "sea-serpent-huge",
  "source": "bestiary",
  "name": "Sea Serpent (Huge)",
  "variantOf": "Sea Serpent",
  "category": "Beasts",
  "page": 98,
  "ferocity": 2,
  "size": "Huge",
  "movement": 18,
  "armor": 5,
  "hp": 72,
  "swimming": true,
  "text": "Primitive, long-lived freshwater predators of lakes and rivers — and sometimes moats, flooded mines or deep wells where they wait for centuries. They range from eel-sized to big enough to crush boats and drawbridges; some lizard-folk clans worship the largest with sacrifices.",
  "traits": [
   {
    "name": "A Taste for Blood",
    "text": "If an attack on its tail (made with a bane) deals at least 1 slashing or piercing damage, roll D6 each time it attacks from then on: on 4–6 it attacks itself instead. BEAST LORE reveals this weakness."
   },
   {
    "name": "Varying Size",
    "text": "Comes in Normal, Large and Huge sizes, with different stats and attack damage."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Tail Swipe",
    "damage": "2D10",
    "type": "bludgeoning",
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Swipes its tail at an opponent within 10 m: 2D10 bludgeoning, knocked down."
   },
   {
    "roll": 2,
    "name": "Devour",
    "damage": "2D8",
    "type": null,
    "targets": "opponent with the highest STR",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "engulf": true,
    "text": "Swallows the opponent with the highest STR: 2D8 damage. Inside it has no armor and they can keep attacking, but take D6 damage on each of their turns (armor doesn't help). They get out when it dies."
   },
   {
    "roll": 3,
    "name": "Ferocious Bite",
    "damage": "2D10",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Bites a player character: 2D10 slashing."
   },
   {
    "roll": 4,
    "name": "Drowning",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Pulls an opponent into the deep. The victim starts drowning at once (core drowning rules, Rulebook p.53) and can't move or take actions needing movement except breaking free: STR roll with a bane. Others can help."
   },
   {
    "roll": 5,
    "name": "Crushing Blow",
    "damage": "2D8",
    "type": "bludgeoning",
    "targets": "up to two within 6 m of each other",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Rears up and crashes down on up to two player characters within 6 m of each other: 2D8 bludgeoning each, knocked down."
   },
   {
    "roll": 6,
    "name": "Constriction",
    "damage": "2D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Coils its tail around an opponent within 10 m: 2D8 bludgeoning, and the same again at each of the victim's turns. They can't move or take actions needing movement except breaking free (STR with a bane). Others can help.",
    "ongoing": "2D8"
   }
  ],
  "encounter": "On a calm lake the party's boat suddenly rocks as a dark shape passes beneath — a sea serpent hungry for adventurers, trying to capsize them.",
  "seed": "A lakeside village holds a contest to catch a newly sighted sea serpent: the winner earns the title Kingfisher and a fine reward. Hunters and adventurers flock in and bets fly — and the serpent turns out to be an enormous one."
 },
 {
  "id": "werewolf",
  "source": "bestiary",
  "name": "Werewolf",
  "category": "Beasts",
  "page": 100,
  "ferocity": 2,
  "size": "Normal",
  "movement": 16,
  "armor": null,
  "hp": 32,
  "text": "An ordinary-looking person by day who turns into an upright, clawed, bloodthirsty wolf under the moon, usually with no control and no memory afterwards. Legends tell of a darker few who change at will and remember everything.",
  "traits": [
   {
    "name": "Shapeshifter",
    "text": "Moonlight turns it into wolf form; it changes back at sunrise, and reverts to its true form if killed."
   },
   {
    "name": "Lycanthropy",
    "text": "Anyone taking at least 1 damage from its bite gets a paralyzing poison (potency 9); suffering its full effect means they contract lycanthropy and transform at the next full moon. Elves and wolfkin are immune. An infected player character in wolf form becomes a GM-controlled monster. Eating wolfsbane before the first change cures it, but wolfsbane is itself a lethal poison (potency 9); powerful rituals may also cure it."
   },
   {
    "name": "Resistance",
    "text": "Half damage from non-magical weapons, except fire and silver, which deal normal damage."
   },
   {
    "name": "Hates Silver",
    "text": "In wolf form it can't touch silver and flees places with a lot of it; in human form it avoids silver whenever possible."
   }
  ],
  "resistances": [
   "Non-magical weapons (fire and silver excepted)"
  ],
  "weaknesses": [
   "Silver"
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Furious Howl",
    "damage": null,
    "type": null,
    "targets": "all within 20 m",
    "range": 20,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "summons": "D3 wolves",
    "text": "Howls: everyone within 20 m suffers a fear attack. Outdoors, D3 wolves answer and join the fight after D3 rounds."
   },
   {
    "roll": 2,
    "name": "Rending Claws",
    "damage": "2D6",
    "type": "slashing",
    "targets": "all within 2 m",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Claws everyone within 2 m: 2D6 slashing."
   },
   {
    "roll": 3,
    "name": "Drooling Jaws",
    "damage": "2D10",
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
     "potency": 9
    },
    "lycanthropy": true,
    "text": "A deep bite: 2D10 piercing and risk of lycanthropy (paralyzing poison, potency 9 — see trait). Can be parried."
   },
   {
    "roll": 4,
    "name": "Surprise Attack",
    "damage": "2D8",
    "type": "slashing",
    "targets": "enemy within 10 m with the lowest HP",
    "range": 10,
    "fear": "bane",
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Leaps at the enemy within 10 m with the lowest HP: 2D8 slashing and a fear attack with a bane on the WIL roll."
   },
   {
    "roll": 5,
    "name": "Forceful Throw",
    "damage": "2D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [
     "Dazed"
    ],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Hurls an opponent 2D8 m: the same bludgeoning damage, Dazed, and they land prone."
   },
   {
    "roll": 6,
    "name": "Berserker",
    "damage": "2D10",
    "type": "slashing",
    "targets": "all opponents within 4 m",
    "range": 4,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Goes berserk on every opponent within 4 m: 2D10 slashing and a fear attack each. Afterwards it is spent and makes no attacks next round (or for the rest of this one); meanwhile a PERSUASION roll can calm it, and it flees.",
    "opponentsOnly": true
   }
  ],
  "encounter": "An exhausted adventurer with no memory of how she got there begs the party for help, then collapses. When the moon rises over camp she turns into a ravenous werewolf who doesn't recognise them.",
  "seed": "Brutal attacks hit a busy merchant village and an elderly couple hires the party to clear their wrongly accused son. Some victims survive unconscious, muttering of glowing eyes; when the full moon rises it's clear a werewolf is building a new pack — how many of the bitten will wake changed?"
 },
 {
  "id": "worg",
  "source": "bestiary",
  "name": "Worg",
  "category": "Beasts",
  "page": 102,
  "ferocity": 1,
  "size": "Normal",
  "movement": 20,
  "armor": null,
  "hp": 18,
  "text": "Red-eyed wolves larger and far more dangerous than normal ones, seeing perfectly in darkness and sensing even invisible creatures by their heat. Cunning pack hunters with a language of howls that carries complex messages over great distances.",
  "traits": [
   {
    "name": "Heat Vision",
    "text": "Sees body heat: SNEAKING rolls to hide from or slip past worgs get a bane."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Ravenous Howl",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A famished howl: everyone within 10 m suffers a fear attack."
   },
   {
    "roll": 2,
    "name": "Stinking Snort",
    "damage": null,
    "type": null,
    "targets": "all within 2 m",
    "range": 2,
    "fear": false,
    "conditions": [
     "Disheartened"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Snorts slime and rotten meat over everyone within 2 m: they become Disheartened (or another condition if already)."
   },
   {
    "roll": 3,
    "name": "Worg Bite",
    "damage": "2D6",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "disease": 12,
    "text": "A furious bite: 2D6 piercing; anyone damaged is exposed to a disease (virulence 12)."
   },
   {
    "roll": 4,
    "name": "Charge",
    "damage": "D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "followUp": {
     "damage": "2D8",
     "type": "piercing",
     "parry": true,
     "dodge": true
    },
    "text": "Charges an opponent: D6 bludgeoning, knocked down. If not dodged, it immediately bites as well for 2D8 piercing (this bite can be parried). Each part is dodged/parried separately."
   },
   {
    "roll": 5,
    "name": "Dash of Death",
    "damage": "D8",
    "type": "bludgeoning",
    "targets": "least armored opponent",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Drags its least-armored victim 20 m: D8 bludgeoning, and they can't take actions needing movement except breaking free (STR roll). It keeps dragging them each turn until they reach zero HP or break free."
   },
   {
    "roll": 6,
    "name": "Death Shake",
    "damage": "2D10",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Bites, shakes and flings a victim: 2D10 piercing, thrown 2D4 m, landing prone."
   }
  ],
  "encounter": "A starving worg cast out of its pack stalks the party's mounts — or the party themselves if on foot — through the forest, picking them off one by one in a grim game of cat and mouse.",
  "seed": "A worg pack led by the battle-wise One-Eye is warring with a wolfkin tribe for its forest. Chief Griff sends his youngest daughter Lupa to find help; ending the war means hunting down and killing One-Eye."
 },
 {
  "id": "ghoul",
  "name": "Ghoul",
  "page": 108,
  "category": "Undead",
  "ferocity": 1,
  "size": "Normal",
  "movement": 10,
  "armor": null,
  "hp": 16,
  "text": "A half-blind, grey, spongy-skinned corpse-eater — part undead, part living — thought to arise from a curse on cannibals. Haunts graveyards and fresh battlefields, sometimes trailing armies to feed on the fallen.",
  "traits": [
   {
    "name": "Half-Blind",
    "text": "Ghouls see so poorly that they can't dodge any attack."
   },
   {
    "name": "Cowards",
    "text": "Weak and cowardly, they attack in groups; when half the group is defeated, the rest flee."
   },
   {
    "name": "Nocturnal",
    "text": "Attacks at night or in dark caves and ruins; only in exceptional circumstances in daylight."
   }
  ],
  "noDodge": true,
  "attacks": [
   {
    "roll": 1,
    "name": "Vile Spit",
    "damage": "D4",
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [
     "Sickly"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Spits foul fluid at someone within 10 m: D4 damage (armor doesn't help), Sickly, and exposed to a disease (virulence 12).",
    "ignoresArmor": true,
    "disease": 12
   },
   {
    "roll": 2,
    "name": "Bone Club",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Swings a gnawed bone for 2D6 bludgeoning."
   },
   {
    "roll": 3,
    "name": "Scratching Claws",
    "damage": "D10",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": true,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Pins a victim and claws them: knocked down, a fear attack, and D10 slashing; if the damage gets through armor, disease (virulence 12).",
    "disease": 12,
    "diseaseIfPenetrates": true
   },
   {
    "roll": 4,
    "name": "Diseased Bite",
    "damage": "2D8",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Filthy fangs for 2D8 piercing; if it gets through armor, disease (virulence 12).",
    "disease": 12,
    "diseaseIfPenetrates": true
   },
   {
    "roll": 5,
    "name": "Tearing, Biting, Striking",
    "damage": "D8",
    "type": "slashing",
    "targets": "all within 2 m",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A frenzy against everyone within 2 m: D8 slashing each, and disease (virulence 12) for anyone whose armor it penetrates.",
    "disease": 12,
    "diseaseIfPenetrates": true
   },
   {
    "roll": 6,
    "name": "Scream of the Dead",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A death scream: everyone within 10 m suffers a fear attack, and another ghoul arrives and joins the fight next round.",
    "summons": "1 ghoul (joins next round)"
   }
  ],
  "encounter": "A battlefield a few days old, every mercenary dead and the stench overpowering — but instead of flies there is the sound of cracking bones and chewing. A pack of ghouls is feeding and fights savagely if disturbed.",
  "seed": "A temple head hires the party to catch grave robbers who have emptied several fresh graves of ordinary villagers' bodies — yet left silver jewelry behind. Suspicion falls on a reclusive mage rumoured to be a necromancer, but the culprits are ghouls raiding graves across several villages. The trail ends at an ancient, overgrown, half-ruined mausoleum.",
  "source": "bestiary"
 },
 {
  "id": "living-dead",
  "name": "Living Dead",
  "page": 110,
  "category": "Undead",
  "ferocity": 1,
  "size": "Normal",
  "movement": 6,
  "armor": null,
  "hp": 9,
  "text": "Victims of a disease that stops death and leaves a rotting body driven only to eat living flesh. They seem to keep fragments of memory — recognising old acquaintances, muttering words, using tools.",
  "traits": [
   {
    "name": "Resistance",
    "text": "Takes half damage from piercing weapons."
   },
   {
    "name": "Vulnerable Neck",
    "text": "An attack roll of a dragon against a living dead cuts off its head and kills it outright."
   },
   {
    "name": "Undead Disease",
    "text": "Victims it harms can catch its disease (virulence 12); anyone who dies of it rises as a living dead."
   }
  ],
  "resistances": [
   "piercing"
  ],
  "disease": {
   "name": "Undead disease",
   "virulence": 12,
   "effect": "Anyone who dies from it becomes a living dead."
  },
  "attacks": [
   {
    "roll": 1,
    "name": "Headbutt",
    "damage": "D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "text": "Grabs a foe's shoulders and headbutts them for D8 bludgeoning. Can't be dodged."
   },
   {
    "roll": 2,
    "name": "Clawing Attack",
    "damage": "D10",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Claws face and body for D10 slashing; if it gets through armor, exposure to the undead disease.",
    "disease": 12,
    "diseaseName": "Undead disease",
    "diseaseIfPenetrates": true
   },
   {
    "roll": 3,
    "name": "Diseased Bite",
    "damage": "D8",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [
     "Scared"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Bites for D8 piercing and the victim becomes Scared; exposure to the undead disease if it gets through armor.",
    "disease": 12,
    "diseaseName": "Undead disease",
    "diseaseIfPenetrates": true
   },
   {
    "roll": 4,
    "name": "Vile Vomit",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [
     "Sickly"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Retches rotten flesh and fluids: every opponent within 10 m becomes Sickly (already Sickly: choose another condition)."
   },
   {
    "roll": 5,
    "name": "Undead Embrace",
    "damage": "D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Hugs a foe tight for D8 bludgeoning; they can't move or take movement actions except to break free (STR roll). On its next turn, instead of another attack, it bites for 2D8 piercing (armor doesn't help) plus exposure to the undead disease, and keeps biting each turn until the victim hits zero HP.",
    "grapple": {
     "breakFree": "STR"
    },
    "followUp": {
     "damage": "2D8",
     "type": "piercing",
     "ignoresArmor": true,
     "disease": 12,
     "everyTurn": true
    }
   },
   {
    "roll": 6,
    "name": "Overpowering Hunger",
    "damage": "2D8",
    "type": "slashing",
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Lunges at the nearest foe within 10 m in a feeding frenzy: 2D8 slashing, knocked down, and they lose their turn this round if not yet taken; exposure to the undead disease if it gets through armor.",
    "losesTurn": true,
    "disease": 12,
    "diseaseName": "Undead disease",
    "diseaseIfPenetrates": true
   }
  ],
  "encounter": "Far off, figures wander slowly and aimlessly across a field. As the party draws near, the living dead catch the scent of flesh and shamble toward them.",
  "seed": "The party reaches a village strewn with mangled corpses. By the time they reach the well in the square, the dead begin to rise, hungry. They must escape — and stamp out the living dead before the infection spreads further, perhaps across the world.",
  "source": "bestiary"
 },
 {
  "id": "mummy",
  "name": "Mummy",
  "page": 112,
  "category": "Undead",
  "ferocity": 2,
  "size": "Normal",
  "movement": 6,
  "armor": null,
  "hp": 42,
  "text": "An embalmed ruler, hero or noble from the oldest times, organs removed and body treated with alchemy and magic, risen to guard its treasure-filled crypt in its burial shroud. Desecrators face potent curses.",
  "traits": [
   {
    "name": "Resistance",
    "text": "Having no internal organs, it takes half damage from piercing weapons."
   },
   {
    "name": "Flammable",
    "text": "Dry as tinder: takes double damage from fire."
   }
  ],
  "resistances": [
   "piercing"
  ],
  "weaknesses": [
   "fire (double damage)"
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Curse",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": "bane",
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Curses a foe within 10 m: they suffer a fear attack with a bane on the WIL roll."
   },
   {
    "roll": 2,
    "name": "Double Strike",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "up to two within 2 m of each other",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Swings both fists at up to two foes within 2 m of each other: 2D6 bludgeoning each, knocked down."
   },
   {
    "roll": 3,
    "name": "Swarm of Insects",
    "damage": "D8",
    "type": "piercing",
    "targets": "all opponents within 4 m",
    "range": 4,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "text": "Vomits a swarm of biting insects over every opponent within 4 m: D8 piercing each (armor doesn't help), and each rolls WIL or loses their turn this round if not yet taken. Can't be dodged.",
    "ignoresArmor": true,
    "losesTurn": "WIL",
    "opponentsOnly": true
   },
   {
    "roll": 4,
    "name": "Deadly Throw",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Hurls a foe 2D6 m; they land prone and take the same in bludgeoning damage."
   },
   {
    "roll": 5,
    "name": "Strangulation",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Grips a foe's throat: 2D6 bludgeoning (armor doesn't help) and D6 more bludgeoning on each mummy turn. The victim can't move or take movement actions except to break free (STR with a bane; others may help). The mummy makes no other monster attacks until the victim breaks free or hits zero HP.",
    "ignoresArmor": true,
    "grapple": {
     "breakFree": "STR",
     "bane": true,
     "help": true
    },
    "ongoing": "D6"
   },
   {
    "roll": 6,
    "name": "Heartbreak",
    "damage": "D10",
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Eyes blazing blue, it 'crushes' the heart of a foe within 10 m: D10 damage (armor doesn't help), a fear attack, and they lose their turn this round if not yet taken.",
    "ignoresArmor": true,
    "losesTurn": true
   }
  ],
  "encounter": "At a moonlit camp, the party hears shuffling: a rag-wrapped figure drags itself toward them. Freed from its sarcophagus by adventurers now dead, the mummy seeks vengeance on anyone in its way and won't stop until they die or it is laid to rest.",
  "seed": "A foreign antiques dealer announces a dawn auction of 'magical secrets and objects' in the town square — but at sunrise he is found strangled with a blackened tongue and his tent is empty. A mummy in one of the sarcophagi woke, killed him for desecrating its tomb, took the goods and shuffled into the catacombs beneath the local temple. A terrified witness may be hiding somewhere in town.",
  "source": "bestiary"
 },
 {
  "id": "vampire",
  "name": "Vampire",
  "page": 116,
  "category": "Undead",
  "ferocity": 2,
  "size": "Normal",
  "movement": 16,
  "armor": null,
  "hp": 32,
  "text": "Cunning, secretive blood-drinkers, harmed by sunlight, who lurk in cities or rule remote castles surrounded by living and undead thralls. The strongest can raise the dead as obedient new vampires. Slaying one means knocking it out and staking its heart before it escapes as mist, bats or ravens.",
  "traits": [
   {
    "name": "Resistance",
    "text": "Halves all damage except from silver, magic weapons and spells, which hurt it normally."
   },
   {
    "name": "Vulnerable",
    "text": "In direct sunlight it takes D6 damage per round and can't make monster attacks; if this brings it to zero HP it disintegrates."
   },
   {
    "name": "Escape Route",
    "text": "As an action it can turn into a swarm of vampiric bats (Rulebook p.99) and flee combat at once; only sealing off the fight's location stops this. It can't do so again until the next sunset."
   },
   {
    "name": "Immortal",
    "text": "At zero HP it falls paralyzed and turns to mist after D6 rounds, drifting to its tomb, where a shift of rest restores full HP. It truly dies only from sunlight or a piercing weapon driven through its heart while at zero HP and before it dissolves (requires a Spears roll)."
   }
  ],
  "resistances": [
   "All damage except silver weapons, magic weapons and spells"
  ],
  "weaknesses": [
   "sunlight (D6/round, no monster attacks)"
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Mocking Laughter",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A mocking laugh: everyone within 10 m rolls WIL against fear."
   },
   {
    "roll": 2,
    "name": "Forceful Throw",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Hurls a foe 2D6 m; they land prone and take the same in bludgeoning damage."
   },
   {
    "roll": 3,
    "name": "Corrosive Mist",
    "damage": "D6",
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [
     "Exhausted"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Becomes corrosive mist that coils round every foe within 10 m: D6 damage (armor doesn't help) and Exhausted (already Exhausted: choose another condition). Then it takes physical form again.",
    "ignoresArmor": true
   },
   {
    "roll": 4,
    "name": "Hypnotic Gaze",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Fixes its gaze on a foe within 10 m: they roll WIL with a bane or at once make a movement and an action of the vampire's (GM's) choosing (nothing costing WP), and they lose their turn this round if not yet taken.",
    "control": true,
    "losesTurn": true
   },
   {
    "roll": 5,
    "name": "Swarm of Bats",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Becomes a swarm of bats: roll on the Vampiric Bats attack table (Rulebook p.99). Damage to the swarm is dealt to the vampire as normal; it reverts to its true form on its next turn.",
    "refTable": "Vampiric Bats"
   },
   {
    "roll": 6,
    "name": "Bloodthirst",
    "damage": "D6",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Pounces and drinks: D6 piercing (armor doesn't help), healing the vampire as much (up to max HP), and the victim loses D6 WP. It keeps feeding for D6 HP and D6 WP each turn; the victim is paralyzed and can only try to break free (WIL with a bane), and the vampire makes no other monster attacks until the victim breaks free or hits zero HP. A victim drained of their last WP this way is exposed to vampiric disease (virulence 12); suffering its full effect turns them into a vampire the next night — a PC becomes a GM-controlled monster.",
    "ignoresArmor": true,
    "drain": true,
    "wpLoss": "D6",
    "grapple": {
     "breakFree": "WIL",
     "bane": true
    },
    "disease": 12,
    "diseaseName": "Vampiric disease"
   }
  ],
  "encounter": "A strange fog follows the party: a vampire that has lost its servants and wants new thralls. It strikes at night while whoever it judges weakest is on watch — and if nobody keeps watch, the party is in real trouble.",
  "seed": "A mysterious nobleman hires the party to recover an ancient tome of rituals from a ruined temple, which he believes can restore the undead. Rival adventurers hound them, convinced the nobleman is a bloodthirsty demon; parley or a captured rival reveals their side. Either way, once the book is delivered the vampire and his minions intend to kill the party.",
  "source": "bestiary"
 },
 {
  "id": "will-o-the-wisp",
  "name": "Will-o'-the-Wisp",
  "page": 120,
  "category": "Undead",
  "ferocity": 2,
  "size": "Small",
  "movement": 16,
  "armor": null,
  "hp": 12,
  "text": "The spectral remnant of a cruel person who died in a marsh, now nothing but malice. Carrying a beckoning light, it lures travellers into sinkholes and bogs, or simply terrifies them.",
  "traits": [
   {
    "name": "Immunity",
    "text": "Immaterial: immune to all damage except magic and fire."
   },
   {
    "name": "Restless",
    "text": "A defeated wisp is banished for only D6 days, then returns; it is gone for good only through Purge or by finding its remains and burying them with dignity."
   }
  ],
  "immunities": [
   "All damage except magic and fire"
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Sinkhole",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A bottomless, moss-covered bog-hole opens under a foe within 10 m: they must roll Swimming with a bane at once and again each turn (not an action) or drown (Rulebook p.53). Climbing out takes Acrobatics with a bane; others may help."
   },
   {
    "roll": 2,
    "name": "Nightmares",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [
     "Disheartened"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Flashes of its own death strike every enemy within 10 m: they become Disheartened (already Disheartened: choose another condition)."
   },
   {
    "roll": 3,
    "name": "Spectral Headbutt",
    "damage": "2D4",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "A psychic headbutt for 2D4 bludgeoning; the victim falls to the ground."
   },
   {
    "roll": 4,
    "name": "Blinding Light",
    "damage": null,
    "type": null,
    "targets": "all creatures within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Its eye sockets blaze: every creature within 10 m rolls Evade to look away; on a failure (or no roll) they are blinded, acting as in total darkness, for one round."
   },
   {
    "roll": 5,
    "name": "Death Rattle",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Wailing, unholy winds: everyone within 10 m suffers a fear attack."
   },
   {
    "roll": 6,
    "name": "Control",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Takes over a foe within 10 m who fails a WIL roll: they immediately make a movement and an action of the GM's choosing (nothing costing WP) and lose their next turn if not yet taken.",
    "control": true,
    "losesTurn": true
   }
  ],
  "encounter": "A distant light and a whispering voice promise lost treasure if the party follows — through the forest, over the marsh, to the lake. The wisp tries to lead them to the place it died so it can feed on their terror as they drown.",
  "seed": "Merchants and goods vanish on the road between two villages; the few survivors recall dancing lights promising riches. The culprits are will-o'-the-wisps, likely risen from one of three treasure-hunting expeditions that died recently in a ruin-strewn wetland. The party must work out which group, locate where its vilest members died, and bury the bodies properly.",
  "source": "bestiary"
 },
 {
  "id": "hatchling-dragon",
  "name": "Hatchling Dragon",
  "page": 124,
  "category": "Dragons",
  "ferocity": 1,
  "size": "Normal",
  "movement": 16,
  "armor": 2,
  "hp": 36,
  "text": "A newly hatched dragon from a rock-hard, boulder-like egg, guarded by a parent who leaves only to hunt. It can't fly or breathe fire yet, but its toxic, paralyzing smoke keeps it alive until it is grown enough to leave the nest.",
  "traits": [
   {
    "name": "Wings",
    "text": "Has wings but can't fly; it can use them to leap up to half its Movement with no roll."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Dragon Screech",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": "if already Scared",
    "conditions": [
     "Scared"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A loud screech: everyone within 10 m becomes Scared; anyone already Scared suffers a fear attack instead."
   },
   {
    "roll": 2,
    "name": "Claw Attack",
    "damage": "D8",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Clumsy claws for D8 slashing."
   },
   {
    "roll": 3,
    "name": "Ramming Attack",
    "damage": "D6",
    "type": "bludgeoning",
    "targets": "nearest",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Charges the nearest foe, knocking them D6 m back for the same bludgeoning damage."
   },
   {
    "roll": 4,
    "name": "Tail Strike",
    "damage": "D6",
    "type": "slashing",
    "targets": "all within 2 m",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Its sharp tail hits every foe within 2 m for D6 slashing; they are knocked down."
   },
   {
    "roll": 5,
    "name": "Dragon Bite",
    "damage": "2D6",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A big bite for 2D6 slashing."
   },
   {
    "roll": 6,
    "name": "Toxic Smoke",
    "damage": null,
    "type": null,
    "targets": "all player characters within 6 m",
    "range": 6,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Puffs poisonous smoke: every player character within 6 m is exposed to paralyzing poison (potency 12).",
    "poison": {
     "type": "paralyzing",
     "potency": 12
    }
   }
  ],
  "encounter": "Deep in a cave the party finds a broken dragon eggshell; a Beast Lore or Bushcraft roll shows it hatched years ago. No sign of the hatchling — but two or more dragons may lurk nearby.",
  "seed": "Nobleman Wilfrid Otterdale is set on owning a dragon and funds an expedition to the far northern mountains to steal an egg, hiring adventurers for a big payout. As one of several hunting parties, the characters must find a nest, take an egg and bring it to the expedition — then survive the trek back to his castle, perhaps with furious dragon parents in pursuit.",
  "source": "bestiary"
 },
 {
  "id": "young-dragon",
  "name": "Young Dragon",
  "page": 126,
  "category": "Dragons",
  "ferocity": 2,
  "size": "Large",
  "movement": 24,
  "armor": 4,
  "hp": 60,
  "flying": true,
  "text": "A slender dragon newly out on its own, learning to fly and hunt. For it the hunt is play, training and survival; greed is just waking, and it may start stashing gold and gems to gather into a hoard as an adult.",
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
    "targets": "all within 10 m",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A menacing roar: everyone within 10 m suffers a fear attack."
   },
   {
    "roll": 2,
    "name": "Claw Attack",
    "damage": "2D6",
    "type": "slashing",
    "targets": "two within 2 m of each other",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Sweeps its claws at two foes within 2 m of each other: 2D6 slashing each."
   },
   {
    "roll": 3,
    "name": "Gust of Wind",
    "damage": "D8",
    "type": "bludgeoning",
    "targets": "all up to human size within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Wingbeats hurl every loose object and creature up to human size within 10 m D8 m, for the same bludgeoning damage; they land prone."
   },
   {
    "roll": 4,
    "name": "Tail Strike",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "all within 4 m",
    "range": 4,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Its spiky tail hits every foe within 4 m for 2D6 bludgeoning and knocks them down."
   },
   {
    "roll": 5,
    "name": "Dragon Bite",
    "damage": "3D8",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Bites one foe for 3D8 slashing."
   },
   {
    "roll": 6,
    "name": "Fire Breath",
    "damage": "2D10",
    "type": "fire",
    "targets": "cone",
    "range": 6,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A 6 m cone of flame (as wide as it is far from the mouth): everyone hit takes 2D10 fire, armor doesn't help.",
    "ignoresArmor": true
   }
  ],
  "encounter": "A young dragon flies overhead and passes by unless the party draws its notice. If curious, it lands about 30 m away, already fed, studies them for a few rounds, then loses interest. If attacked, it happily toys with them for three rounds before flying off.",
  "seed": "Everyone is invited to the wedding feast uniting Houses Rosenbrand and Hammerfist at Rosenbrand Castle. At its height the young dragon Vreltir arrives, smashes the drawbridge and forces her way in. Someone must slay or drive her off before she slaughters the guests and steals the house treasure — a cat-and-mouse game for the party.",
  "source": "bestiary"
 },
 {
  "id": "ancient-dragon",
  "name": "Ancient Dragon",
  "page": 130,
  "category": "Dragons",
  "ferocity": 2,
  "size": "Huge",
  "movement": 20,
  "armor": 8,
  "hp": 108,
  "flying": true,
  "text": "One of perhaps five to ten surviving dragons from the Dragon Empire and the demon wars (among them Arknarath and Nielfrung), which can sleep for centuries on their hoards deep in the wilds. Wise, near-invulnerable masters of language; they seldom attack civilized kin and can be spoken with — if caught in a good mood.",
  "traits": [
   {
    "name": "Wings",
    "text": "Flies freely through the air. Its wingbeats also whip up winds that stop any other flying creature from approaching it while it flies."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Dragon Roar",
    "damage": null,
    "type": null,
    "targets": "all within 30 m",
    "range": 30,
    "fear": true,
    "conditions": [
     "Scared"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A chilling roar: everyone within 30 m becomes Scared and suffers a fear attack."
   },
   {
    "roll": 2,
    "name": "Claw Attack",
    "damage": "3D10",
    "type": "slashing",
    "targets": "two within 6 m of each other",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Sweeps its claws at two foes within 6 m of each other: 3D10 slashing each."
   },
   {
    "roll": 3,
    "name": "Dragon Storm",
    "damage": "3D6",
    "type": "bludgeoning",
    "targets": "all up to Normal size within 20 m",
    "range": 20,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "A storm from its wings hurls every loose object and creature up to Normal size within 20 m 3D6 m, for the same bludgeoning damage; they land prone."
   },
   {
    "roll": 4,
    "name": "Crushing Tail",
    "damage": "2D10",
    "type": "bludgeoning",
    "targets": "all player characters within 8 m",
    "range": 8,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Its huge spiked tail hits every player character within 8 m for 2D10 bludgeoning and knocks them down."
   },
   {
    "roll": 5,
    "name": "Dragon Bite",
    "damage": "5D10",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A lightning-fast bite for 5D10 slashing."
   },
   {
    "roll": 6,
    "name": "Inferno",
    "damage": "4D10",
    "type": "fire",
    "targets": "cone",
    "range": 20,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A 20 m cone of fire (as wide as it is far from the jaws): every player character hit takes 4D10 fire, armor doesn't help.",
    "ignoresArmor": true
   }
  ],
  "encounter": null,
  "seed": "Demon prince Beliel masses his armies in the south and total war looms. Elven elders name the dragon Nielfrung, who once banished Beliel for centuries; the party carries priceless gifts to her cave beside a subterranean lava lake to trade for the secret of banishing him again. The way down is beset by demon cultists, ever stronger demons and brigands after the gifts — and then they must persuade the dragon to join the fight.",
  "source": "bestiary"
 },
 {
  "id": "lindworm",
  "name": "Lindworm",
  "page": 132,
  "category": "Dragons",
  "ferocity": 2,
  "size": "Large",
  "movement": 18,
  "armor": 6,
  "hp": 64,
  "text": "A wingless, fireless, dim-witted dragon-like predator — possibly a relic of the dragons' earliest ancestors — that lives to eat, sleep and grow. Its lair is a central chamber with winding tunnels to the surface, where victims' gear often lies in corners.",
  "traits": [
   {
    "name": "Drawn to Glitter",
    "text": "If it sees someone wearing something shiny (metal armor, a hand mirror…), it attacks that person immediately."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Hissing Roar",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A terrifying hiss-roar: everyone within 10 m suffers a fear attack."
   },
   {
    "roll": 2,
    "name": "Claw Attack",
    "damage": "2D8",
    "type": "slashing",
    "targets": "two within 2 m of each other",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Rakes two foes within 2 m of each other: 2D8 slashing each."
   },
   {
    "roll": 3,
    "name": "Dorsal Spikes",
    "damage": "2D4",
    "type": "slashing",
    "targets": "all opponents within 6 m",
    "range": 6,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Rolls over every opponent within 6 m: 2D4 slashing from its back spikes, knocked down.",
    "opponentsOnly": true
   },
   {
    "roll": 4,
    "name": "Deadly Embrace",
    "damage": "2D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Coils round a foe: 2D8 bludgeoning, and the same again on each of the victim's turns. They can't move or take movement actions except to break free (STR with a bane; others may help).",
    "ongoing": "2D8",
    "grapple": {
     "breakFree": "STR",
     "bane": true,
     "help": true
    }
   },
   {
    "roll": 5,
    "name": "Ravenous Bite",
    "damage": "3D8",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": true,
    "dodge": true,
    "text": "A huge bite for 3D8 slashing. Can be parried."
   },
   {
    "roll": 6,
    "name": "Devouring Attack",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Swallows a foe whole for 2D6 bludgeoning. Inside, the victim can keep attacking it, where it has no armor, but takes D6 damage (armor doesn't help) on each of their turns. They get out once it dies.",
    "swallow": true
   }
  ],
  "encounter": "Hours earlier a lindworm passed the same way: its huge body has left deep tracks, and a bear's remains lie beside the trail. The party can follow the trail to its lair, if they dare.",
  "seed": "A huge creature nesting on an island in Lake Glintwater attacks anything on the water, starving the fishermen and log drivers, who offer a fine reward to be rid of it. The lindworm's nest has many land and underwater entrances and small holes from which she snatches the unwary. The party must brave the dark or lure her out with a clever plan.",
  "source": "bestiary"
 },
 {
  "id": "blood-demon",
  "name": "Blood Demon",
  "page": 136,
  "category": "Demons",
  "ferocity": 2,
  "size": "Large",
  "movement": 14,
  "armor": 2,
  "hp": 48,
  "aka": [
   "Onaqui"
  ],
  "flying": true,
  "text": "Also called onaqui after its roar: a bat-winged demon that served as scout for the ancient demon hosts. It drinks blood and devours hearts as they stop beating — once mistaken for an arch-vampire, and perhaps the source of vampirism.",
  "traits": [
   {
    "name": "Undead Minions",
    "text": "If corpses are at hand it can raise D6 living dead (p.110) per day under its full control. They drop dead at sunrise, but it can raise them again."
   },
   {
    "name": "Resistance",
    "text": "Half damage from non-magical weapons, except jade weapons."
   },
   {
    "name": "Strong Heartbeat",
    "text": "Its heart beats so loudly that Awareness rolls to detect it get a boon."
   },
   {
    "name": "Wings",
    "text": "Flies freely through the air."
   }
  ],
  "resistances": [
   "Non-magical weapons (jade excepted)"
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Bloodthirst",
    "damage": "D6",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [
     "Dazed"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Seizes a foe and drinks: D6 piercing (armor doesn't help), the victim loses D6 WP and becomes Dazed.",
    "ignoresArmor": true,
    "wpLoss": "D6"
   },
   {
    "roll": 2,
    "name": "Terrifying Roar",
    "damage": null,
    "type": null,
    "targets": "all within 20 m",
    "range": 20,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A roar heard far and wide: everyone within 20 m suffers a fear attack."
   },
   {
    "roll": 3,
    "name": "Venomous Claws",
    "damage": "2D6",
    "type": "slashing",
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Lunges at a foe within 10 m, knocks them down and claws them for 2D6 slashing; if damaged, paralyzing poison (potency 12).",
    "poison": {
     "type": "paralyzing",
     "potency": 12
    }
   },
   {
    "roll": 4,
    "name": "Deafening Scream",
    "damage": "2D8",
    "type": null,
    "targets": "cone",
    "range": 10,
    "fear": false,
    "conditions": [
     "Dazed"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "An ear-bursting shriek in a 10 m cone: 2D8 damage (armor doesn't help) and Dazed.",
    "ignoresArmor": true
   },
   {
    "roll": 5,
    "name": "Long Drop",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Unless dodged, grabs a foe and leaps D6+3 m into the air; on its next turn (instead of another monster attack) it lets go and the victim takes falling damage."
   },
   {
    "roll": 6,
    "name": "Boiling Blood",
    "damage": "2D10",
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": "bane",
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A curse makes the blood of a foe within 10 m boil: 2D10 damage (armor doesn't help) and a fear attack with a bane on the WIL roll.",
    "ignoresArmor": true,
    "curse": true
   }
  ],
  "encounter": "Screams near the night camp, then a huge bat-like shape crosses the moon and lurches away. Investigating, the party finds two hunters with their hearts torn out and bodies drained — and no blood on the ground. Whatever killed them drank it.",
  "seed": "After a run-in with demons or cultists, the party draws the interest of the demon Gahanz, who sends her blood demon servant Tizinican to shadow them and report. It leaves a trail of heartless, bloodless corpses in their wake that draws unwanted attention. Once they notice traces or glimpses of it, they must set a trap to be rid of their follower.",
  "source": "bestiary"
 },
 {
  "id": "chaos-demon",
  "name": "Chaos Demon",
  "page": 138,
  "category": "Demons",
  "ferocity": 2,
  "size": "Normal",
  "movement": 12,
  "armor": 2,
  "hp": 36,
  "flying": true,
  "flyingNote": "clumsy",
  "text": "Winged, horned and scorpion-tailed demons with black, life-draining runic swords — the backbone of the old demon armies, living only to smash order. Their refusal to obey demon princes or fire demons may be what let the dragons and their knights win.",
  "traits": [
   {
    "name": "Corrosive Blood",
    "text": "Whenever it takes piercing or slashing damage, everyone within 2 m takes D3 damage; an armored victim instead has their armor rating permanently reduced. The spatter can be dodged."
   },
   {
    "name": "Unnatural Aura",
    "text": "All vegetation within 10 m withers."
   },
   {
    "name": "Wings",
    "text": "Flies through the air, clumsily."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Runic Sword",
    "damage": "2D8",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Swings its black runic sword wildly: 2D8 slashing, and the victim loses D6 WP.",
    "wpLoss": "D6"
   },
   {
    "roll": 2,
    "name": "Horn Attack",
    "damage": "2D10",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Gores a foe with razor horns: 2D10 piercing, and they lose their turn this round if not yet taken.",
    "losesTurn": true
   },
   {
    "roll": 3,
    "name": "Threatening Hiss",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Hisses threats in an ancient tongue: every foe within 10 m suffers a fear attack."
   },
   {
    "roll": 4,
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
    "text": "A swift tail sting for D12 piercing; anyone taking at least 1 damage is injected with paralyzing poison (potency 15). Can be parried.",
    "poison": {
     "type": "paralyzing",
     "potency": 15
    }
   },
   {
    "roll": 5,
    "name": "Unseen Force",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Points at a foe within 10 m, pushing them 2D6 m back for the same bludgeoning damage; they land prone."
   },
   {
    "roll": 6,
    "name": "Acid Spit",
    "damage": "2D6",
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Spits acid at a foe within 10 m: 2D6 damage on impact and D6 more next round unless the victim spends an action wiping it off.",
    "ongoing": "D6"
   }
  ],
  "encounter": "An old battlefield of blackened earth and withered plants. Over a fallen band of elves, dwarves and wolfkin who tried to stop it, a winged demon raises a black longsword in triumph — then notices the party.",
  "seed": "In the city of Sankhara a famous gladiator — winged, fully armored, wielding a black runic sword — is a chaos demon bound by the mage Armarand, desperate for freedom. Aknator, owner of the city's biggest gladiator stable, pays handsomely for the party to steal the demon. Those who learn what hides under the great helm might Purge it instead, with both Armarand and Aknator trying to stop them.",
  "source": "bestiary"
 },
 {
  "id": "fire-demon",
  "name": "Fire Demon",
  "page": 140,
  "category": "Demons",
  "ferocity": 2,
  "size": "Large",
  "movement": 18,
  "armor": null,
  "hp": 64,
  "text": "The nearest thing the demon hordes have to commanders; lesser demons follow their lead. In our world they seek volcanoes, hot forges and other intense heat — or create it, leaving wildfires and burnt villages.",
  "traits": [
   {
    "name": "Scorching Body",
    "text": "Anyone touching it takes D6 damage (armor doesn't help). Its heat gives all opponents a bane on melee attacks against it."
   },
   {
    "name": "Immunity",
    "text": "Immune to fire damage."
   },
   {
    "name": "Vulnerability",
    "text": "Takes double damage from water-based magic. A thrown bucket of water deals D10, a tankard of ale or jug of wine D8, a gob of spit 1 point; use Brawling to see if such attacks hit."
   }
  ],
  "immunities": [
   "fire"
  ],
  "weaknesses": [
   "water (double damage from water magic; bucket D10, ale/wine D8, spit 1 — Brawling to hit)"
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Sweeping Staff",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "all within 2 m",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Sweeps its red-hot iron staff at every foe within 2 m: 2D6 bludgeoning plus D6 from the heat (armor doesn't help), and knocked down.",
    "extraDamage": {
     "dice": "D6",
     "ignoresArmor": true
    }
   },
   {
    "roll": 2,
    "name": "Imps",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [
     "Angry"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Summons a swarm of burning, jeering imps: everyone within 10 m becomes Angry."
   },
   {
    "roll": 3,
    "name": "Flaming Flail",
    "damage": "2D8",
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
    "text": "A flail blow for 2D8 bludgeoning plus D8 fire (armor doesn't help); the victim is Dazed.",
    "extraDamage": {
     "dice": "D8",
     "type": "fire",
     "ignoresArmor": true
    }
   },
   {
    "roll": 4,
    "name": "Fire Whirl",
    "damage": "2D8",
    "type": "fire",
    "targets": "all within 4 m",
    "range": 4,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Whirls its flail into a fire vortex: everyone within 4 m takes 2D8 fire (armor doesn't help) and is knocked down.",
    "ignoresArmor": true
   },
   {
    "roll": 5,
    "name": "Crushing Kick",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "A sudden kick flings a foe 2D6 m back for the same bludgeoning damage; they are knocked down."
   },
   {
    "roll": 6,
    "name": "Fire Breath",
    "damage": "2D10",
    "type": "fire",
    "targets": "cone",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A 10 m cone of fire (as wide as it is far from the demon): everyone hit takes 2D10 fire, armor doesn't help.",
    "ignoresArmor": true
   }
  ],
  "encounter": "A wall of fire sweeps toward the party with fleeing animals ahead of it — an AGL roll avoids being trampled and knocked down. The flames die just short of them, revealing a huge fire demon striding behind. It pauses to look at them; unless they act, it carries on up the mountain, with predictable results.",
  "seed": "Mining queen Hildebrand wants a monster cleared from her stalled mines and claims it is a young fire-breathing chimera escaped from a mage's menagerie. In truth the dwarves summoned and bound a fire demon to work their forges; it has broken free and seeks a way home to raise allies for revenge on all dwarves. Afterwards: who taught them the ritual, and where is the portal, and how can it be closed before he returns?",
  "source": "bestiary"
 },
 {
  "id": "golem",
  "name": "Golem",
  "page": 142,
  "category": "Demons",
  "ferocity": 2,
  "size": "Large",
  "movement": 8,
  "armor": 6,
  "hp": 64,
  "text": "A body of clay and stone shaped by a mage who summoned a disembodied spirit from the demonic realm and bound it inside; its eyes burn with that spirit's fire. It obeys its maker without question as bodyguard, sentry or labourer, and carries on forever after the maker dies.",
  "traits": [
   {
    "name": "Explosive",
    "text": "At zero HP the binding magic bursts out: everyone within 4 m takes 2D6 bludgeoning."
   },
   {
    "name": "Resistance",
    "text": "Half damage from piercing and slashing weapons."
   },
   {
    "name": "Rock Hard",
    "text": "No organs or blood, so rolling a dragon on an attack against it has no extra effect."
   }
  ],
  "resistances": [
   "piercing",
   "slashing"
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Wild Flurry",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "all within 2 m",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Flails its long arms at everyone within 2 m: 2D6 bludgeoning, knocked down."
   },
   {
    "roll": 2,
    "name": "Hard Head",
    "damage": "2D10",
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
    "text": "Grabs a foe and headbutts them for 2D10 bludgeoning; they are Dazed."
   },
   {
    "roll": 3,
    "name": "Stone Throw",
    "damage": "2D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Tears a rock from the ground and throws it at a foe within 10 m for 2D8 bludgeoning.",
    "ranged": true
   },
   {
    "roll": 4,
    "name": "Thunderclap",
    "damage": "D6",
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [
     "Dazed"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Claps its fists: everyone within 10 m takes D6 damage (armor doesn't help) and is Dazed.",
    "ignoresArmor": true
   },
   {
    "roll": 5,
    "name": "Power Punch",
    "damage": "3D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "A massive punch for 3D6 bludgeoning; the victim is knocked down."
   },
   {
    "roll": 6,
    "name": "Earthquake",
    "damage": "D10",
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "A stomp shakes the ground: everyone within 10 m takes D10 damage (armor doesn't help), is knocked down, and loses their turn this round if not yet taken.",
    "ignoresArmor": true,
    "losesTurn": true
   }
  ],
  "encounter": "A strange figure gazes out from a hilltop: a golem set centuries ago to guard a magic fountain through which one can speak with its long-dead creator. It lets no one near the fountain.",
  "seed": "A mage hires the party to haul a crude humanlike statue from an ancient temple ruin by cart — a golem dormant since the archmage it guarded died, which the client hopes to wake. The client's old schoolmate turned archenemy attacks en route with hired goblins to steal it, and a lightning bolt strikes the statue mid-fight and wakes it. Whom will the dazed golem choose to protect — a character or the enemy?",
  "source": "bestiary"
 },
 {
  "id": "guardian-demon",
  "name": "Guardian Demon",
  "page": 144,
  "category": "Demons",
  "ferocity": 1,
  "size": "Normal",
  "movement": 14,
  "armor": 2,
  "hp": 28,
  "gear": [
   "Iron spear",
   "Spiked large shield",
   "Weighted rope"
  ],
  "text": "Always present wherever a portal to the demonic realm opens, these calmer demons stay at their assigned post — perhaps for fear of greater demons — and are brutal to each other and to any prisoners in their care.",
  "traits": [
   {
    "name": "Keen Sense of Smell",
    "text": "Opponents get a bane on Sneaking rolls to slip past them."
   },
   {
    "name": "Coordinated",
    "text": "Drilled to fight together: unless fighting alone, guardian demons choose any initiative card they like (before cards are drawn) instead of drawing at random."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Spear Sweep",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [
     "Dazed"
    ],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Sweeps its iron spear at a foe's legs: they are knocked down and Dazed."
   },
   {
    "roll": 2,
    "name": "Shield Bash",
    "damage": "2D8",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Bashes a foe with its spiked shield: 2D8 piercing, knocked down."
   },
   {
    "roll": 3,
    "name": "Paralyzing Spear Thrust",
    "damage": "2D10",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Thrusts its spear for 2D10 piercing and injects paralyzing poison (potency 12).",
    "poison": {
     "type": "paralyzing",
     "potency": 12
    }
   },
   {
    "roll": 4,
    "name": "Impaling Horns",
    "damage": "2D10",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Impales a foe on its horns for 2D10 piercing."
   },
   {
    "roll": 5,
    "name": "Entangling Rope",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Throws a weighted rope at a foe within 10 m, tangling their legs: they fall and can't move or take movement actions except to break free (an action, AGL with a bane; others may help).",
    "grapple": {
     "breakFree": "AGL",
     "bane": true,
     "help": true,
     "action": true
    }
   },
   {
    "roll": 6,
    "name": "Teleportation",
    "damage": null,
    "type": null,
    "targets": "self",
    "range": 20,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Plants its spear in the ground and teleports anywhere within 20 m; this does not provoke a free attack."
   }
  ],
  "encounter": "Lightning strikes a nearby hilltop. In the smoke the party finds a shattered stone portal — Myths & Legends reveals it once led to the demonic realm — and two guardian demons step out, confused but set on defending it, open or not. Who broke it remains a mystery.",
  "seed": "A portal to the demon lands has opened in Barrowsby's graveyard, guarded by a handful of guardian demons, and the villagers have fled. Left alone, the demons will make the village an outpost for moving demons in and out of the world. The party must defeat them and close the portal by breaking its magic circle, reluctantly sustained by the trapped mage Zerzey — who can break it only if someone takes his hand and lends him courage and power.",
  "source": "bestiary"
 },
 {
  "id": "shadow-demon",
  "name": "Shadow Demon",
  "page": 146,
  "category": "Demons",
  "ferocity": 2,
  "size": "Large",
  "movement": 12,
  "armor": null,
  "hp": 54,
  "text": "An incorporeal demon that slips through rifts torn by grief, tragedy, magical accidents or terror, then preys on minds — sowing doubt and despair and feeding on misery.",
  "traits": [
   {
    "name": "Immunity",
    "text": "Has no solid form: immune to non-magical damage."
   },
   {
    "name": "Vulnerability",
    "text": "In direct sunlight it takes D6 damage per stretch; cloud cover negates this."
   },
   {
    "name": "Mind Reading",
    "text": "Reads the surface thoughts of creatures it touches, e.g. in combat."
   }
  ],
  "immunities": [
   "non-magical damage"
  ],
  "weaknesses": [
   "sunlight (D6/stretch)"
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Anxiety Attack",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 6,
    "fear": true,
    "conditions": [
     "Scared",
     "Disheartened"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Grabs a foe within 6 m with impossibly long arms and stares into their soul: they become Scared and Disheartened and suffer a fear attack."
   },
   {
    "roll": 2,
    "name": "Psychic Bite",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Bites a foe's mind: they lose 2D6 WP and are blinded (as in total darkness); roll D4 at the start of each shift, on a 1 it ends.",
    "wpLoss": "2D6"
   },
   {
    "roll": 3,
    "name": "Dark Embrace",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Envelops a foe in total darkness: they suffer a fear attack and become cold (Rulebook p.54)."
   },
   {
    "roll": 4,
    "name": "Doubt",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [
     "Disheartened"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Whispered put-downs reach every foe within 10 m: they become Disheartened (already Disheartened: choose another condition)."
   },
   {
    "roll": 5,
    "name": "Command",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 20,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Commands a foe within 20 m: they roll WIL with a bane or at once make a movement and an action of the demon's (GM's) choosing (nothing costing WP), and they lose their turn this round if not yet taken.",
    "control": true,
    "losesTurn": true
   },
   {
    "roll": 6,
    "name": "Visions of Stars",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": "bane",
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Fills the sky with demonic darkness and dying stars: everyone within 10 m loses D6 WP and rolls WIL with a bane against fear; those who fail also lose their turn this round if not yet taken.",
    "wpLoss": "D6",
    "losesTurn": "on failed fear roll"
   }
  ],
  "encounter": "The party camps in an ancient ruin; Myths & Legends reveals it was a stone circle for magic rituals. That night they all dream of a monster of darkness tearing at the world — their sleep doesn't count as rest, and they had best move on at once.",
  "seed": "Archmage Gabril of Berg lies in an unbreakable sleep, thrashing and muttering of monsters, stars and nameless gods. Exploring her tower, the party finds signs of a failed ritual that let something through from the demonic realm: a shadow demon hiding in the darkest corners, emerging at night to feed on her suffering. Only banishing it will save her.",
  "source": "bestiary"
 },
 {
  "id": "ketolus",
  "category": "Path of Glory",
  "source": "pathofglory",
  "name": "Ketolus",
  "page": 21,
  "ferocity": 2,
  "size": "Large",
  "movement": 20,
  "armor": null,
  "hp": 28,
  "gear": [
   "Short Spear",
   "Longbow",
   "Quiver"
  ],
  "text": "The Dead Forest's one and only centaur, a lonely hunter who brings game to the animist Elusia every dawn and is quietly in love with her. Wary of outsiders; knows the forest's paths and folk better than anyone and will ride to Elusia's defence in an instant.",
  "traits": [
   {
    "name": "Alcohol Tolerance",
    "text": "Can put away vast amounts of wine and beer without getting particularly drunk."
   },
   {
    "name": "Typical Gear",
    "text": "Short spear, longbow and a quiver of arrows."
   },
   {
    "name": "Suspicious",
    "text": "Strangers must pass PERSUASION or BLUFFING before he shares rumors or leads them to Elusia."
   }
  ],
  "attacks": [
   {
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "roll": 1,
    "name": "Horse Kick",
    "text": "Kicks backwards, throwing the victim 2D6 m for the same bludgeoning damage; they land prone."
   },
   {
    "damage": "2D10",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": true,
    "dodge": true,
    "roll": 2,
    "name": "Spear Thrust",
    "weapon": true,
    "text": "Thrusts its short spear for 2D10 piercing. Can be parried."
   },
   {
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "two within 2 m of each other",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 3,
    "name": "Crushing Hooves",
    "text": "Rears and stamps on two characters within 2 m of each other: 2D6 bludgeoning each."
   },
   {
    "damage": "D12",
    "type": "piercing",
    "targets": "one",
    "range": 30,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 4,
    "name": "Quick Shot",
    "ranged": true,
    "text": "Looses an arrow at someone within 30 m — preferably a mage or archer — for D12 piercing."
   },
   {
    "damage": "2D10",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "roll": 5,
    "name": "Ramming Attack",
    "text": "Slams its full weight into one foe: 2D10 bludgeoning and knocked down."
   },
   {
    "damage": null,
    "type": null,
    "targets": "all enemies within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [
     "Angry"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 6,
    "name": "Mocking Laughter",
    "text": "Deafening, scornful laughter: every enemy within 10 m rolls WIL or becomes Angry; anyone already Angry takes another condition of their choice."
   }
  ]
 },
 {
  "id": "grim",
  "category": "Path of Glory",
  "source": "pathofglory",
  "name": "Grim",
  "page": 22,
  "ferocity": 2,
  "size": "Large",
  "movement": 16,
  "armor": null,
  "hp": 32,
  "gear": [
   "Two-Handed Axe"
  ],
  "text": "One of the minotaur brothers Grim and Grum, the worst brutes of the Dead Forest, who live only to fight anyone able to put up the slightest resistance — bellowing their war cry “We get glory!” Usually met together with his brother Grum.",
  "traits": [
   {
    "name": "Glory Seeker",
    "text": "Once roused it can't be stopped — unless a target convinces it there's no honor in beating someone so feeble and pathetic (PERSUASION roll)."
   },
   {
    "name": "Gear",
    "text": "Two-handed axe."
   }
  ],
  "attacks": [
   {
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
    "roll": 1,
    "name": "Bull Fist",
    "text": "A full-force punch: 2D6 bludgeoning and Dazed even if armor stops the damage."
   },
   {
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "roll": 2,
    "name": "Hoof Kick",
    "text": "Kicks the victim 2D6 m away for the same bludgeoning damage; they land prone."
   },
   {
    "damage": "2D8",
    "type": "piercing",
    "targets": "two within 2 m of each other",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "roll": 3,
    "name": "Horn Rush",
    "text": "Charges two enemies within 2 m of each other: 2D8 piercing each and knocked down."
   },
   {
    "damage": "weapon+D10",
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": true,
    "dodge": true,
    "roll": 4,
    "name": "Cleaving Chop",
    "weapon": true,
    "text": "An overhead chop for weapon damage plus D10. Can be parried."
   },
   {
    "damage": "weapon",
    "type": null,
    "targets": "all within 2 m",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 5,
    "name": "Sweeping Attack",
    "weapon": true,
    "text": "A wide sweep hits everyone within 2 m for weapon damage."
   },
   {
    "damage": "2D10",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "roll": 6,
    "name": "Stomping Attack",
    "text": "Leaps and lands on one adventurer: 2D10 bludgeoning and knocked down."
   }
  ]
 },
 {
  "id": "grum",
  "category": "Path of Glory",
  "source": "pathofglory",
  "name": "Grum",
  "page": 22,
  "ferocity": 2,
  "size": "Large",
  "movement": 16,
  "armor": null,
  "hp": 32,
  "gear": [
   "Two-Handed Axe"
  ],
  "text": "One of the minotaur brothers Grim and Grum, the worst brutes of the Dead Forest, who live only to fight anyone able to put up the slightest resistance — bellowing their war cry “We get glory!” Usually met together with his brother Grim.",
  "traits": [
   {
    "name": "Glory Seeker",
    "text": "Once roused it can't be stopped — unless a target convinces it there's no honor in beating someone so feeble and pathetic (PERSUASION roll)."
   },
   {
    "name": "Gear",
    "text": "Two-handed axe."
   }
  ],
  "attacks": [
   {
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
    "roll": 1,
    "name": "Bull Fist",
    "text": "A full-force punch: 2D6 bludgeoning and Dazed even if armor stops the damage."
   },
   {
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "roll": 2,
    "name": "Hoof Kick",
    "text": "Kicks the victim 2D6 m away for the same bludgeoning damage; they land prone."
   },
   {
    "damage": "2D8",
    "type": "piercing",
    "targets": "two within 2 m of each other",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "roll": 3,
    "name": "Horn Rush",
    "text": "Charges two enemies within 2 m of each other: 2D8 piercing each and knocked down."
   },
   {
    "damage": "weapon+D10",
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": true,
    "dodge": true,
    "roll": 4,
    "name": "Cleaving Chop",
    "weapon": true,
    "text": "An overhead chop for weapon damage plus D10. Can be parried."
   },
   {
    "damage": "weapon",
    "type": null,
    "targets": "all within 2 m",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 5,
    "name": "Sweeping Attack",
    "weapon": true,
    "text": "A wide sweep hits everyone within 2 m for weapon damage."
   },
   {
    "damage": "2D10",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "roll": 6,
    "name": "Stomping Attack",
    "text": "Leaps and lands on one adventurer: 2D10 bludgeoning and knocked down."
   }
  ]
 },
 {
  "id": "the-knight-in-black",
  "category": "Path of Glory",
  "source": "pathofglory",
  "name": "The Knight in Black",
  "page": 25,
  "ferocity": 2,
  "size": "Large",
  "movement": 24,
  "armor": 6,
  "hp": 42,
  "gear": [
   "Lance",
   "Morningstar",
   "Black plate armor",
   "Armored black warhorse"
  ],
  "text": "A towering knight in black plate on a huge black warhorse, lance lowered at all he meets. Once a dragon knight of Emperor Eledain, his mind was twisted by the necromancer Dakoth, who sent him to the Dead Forest to slay anyone who might find or open the Gates of Power. He barely speaks and never heeds pleas for mercy.",
  "traits": [
   {
    "name": "Mounted",
    "text": "Fights as a monster and never leaves his horse; rider and steed are one stat block."
   },
   {
    "name": "Opening Charge",
    "text": "His first monster attack is always #1 (Lance Blow); after that roll randomly."
   },
   {
    "name": "Retreat",
    "text": "Tries to escape once he has lost half his HP. If he survives, he can return later at full HP."
   },
   {
    "name": "Merciless",
    "text": "Leaves defeated foes lying to die."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Lance Blow",
    "damage": "3D10",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": true,
    "dodge": true,
    "shieldOnly": true,
    "text": "Charges at full gallop and runs one character through with his lance: 3D10 piercing. Can be parried only with a shield, not a weapon."
   },
   {
    "roll": 2,
    "name": "Hissing Threat",
    "damage": null,
    "type": null,
    "targets": "all player characters",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Halts and calls on the horrors of the Outer Darkness in an alien tongue: every player character within 10 m rolls WIL against fear."
   },
   {
    "roll": 3,
    "name": "Strike From Above",
    "damage": "3D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": true,
    "dodge": true,
    "text": "Rides at one character and brings his heavy morningstar down from the saddle: 3D8 bludgeoning. Can be parried."
   },
   {
    "roll": 4,
    "name": "Horse Kick",
    "damage": "D10",
    "type": null,
    "targets": "two within 2 m of each other",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "The warhorse lashes out at two characters within 2 m of each other: D10 damage each, and both are knocked down."
   },
   {
    "roll": 5,
    "name": "Iron Grip",
    "damage": "2D10",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Seizes a character and drags them 2D10 m along the ground, dealing that many points of bludgeoning damage; they end up prone."
   },
   {
    "roll": 6,
    "name": "Escape",
    "damage": null,
    "type": null,
    "targets": "self",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "text": "He pauses as if scenting something on the wind, wheels his horse and gallops away. The fight ends."
   }
  ]
 },
 {
  "id": "the-knights-consort",
  "category": "Path of Glory",
  "source": "pathofglory",
  "name": "The Knight's Consort",
  "page": 31,
  "ferocity": 2,
  "size": "Normal",
  "movement": 12,
  "armor": null,
  "hp": 27,
  "text": "The vengeful ghost of the barrow knight's wife, buried beside him in the Old Barrow. She manifests the moment anyone touches her bones or grave goods and attacks at once; there's no reasoning with her.",
  "traits": [
   {
    "name": "Immunity",
    "text": "Immune to all damage except magic and fire. Defeating her only banishes her for a shift before she returns; only PURGE ends her for good."
   },
   {
    "name": "Implacable",
    "text": "Can't be persuaded or reasoned with."
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
    "text": "Lunges at a player character within 10 m, hurling them 2D6 m back for the same bludgeoning damage; they land prone."
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
    "text": "Reaches into the victim's chest and grips the heart: 2D10 damage, armor doesn't help, and they become Scared.",
    "ignoresArmor": true
   },
   {
    "roll": 3,
    "name": "Ghost Scream",
    "damage": null,
    "type": null,
    "targets": "all player characters within 10 m",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A soul-chilling scream: every player character within 10 m rolls WIL against fear."
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
    "text": "Stares into one character's soul with visions of the dead: they become Scared and suffer a fear attack with a bane on the WIL roll."
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
    "text": "The chill of death: 2D8 damage, armor doesn't help, and no HP or WP healing until they spend a shift somewhere warm.",
    "ignoresArmor": true
   }
  ]
 },
 {
  "id": "the-knight",
  "category": "Path of Glory",
  "source": "pathofglory",
  "name": "The Knight",
  "page": 33,
  "ferocity": 2,
  "size": "Normal",
  "movement": 10,
  "armor": "as worn",
  "armorValue": 4,
  "hp": 38,
  "gear": [
   "Longsword",
   "Chainmail"
  ],
  "text": "The ancient knight buried in the Old Barrow, his skull split from above and held together by a jeweled gold headband. Now a wight, he rises the instant anyone disturbs his coffin, his body or his treasure.",
  "traits": [
   {
    "name": "Resistance",
    "text": "Half damage from non-magical weapons; fire deals normal damage."
   },
   {
    "name": "Gear",
    "text": "Enchanted longsword (2D8) and rusted chainmail (armor 4). The sword's enchantment doesn't apply to his monster attacks."
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
    "text": "A ghastly scream: everyone within 10 m rolls WIL against fear."
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
    "text": "One victim meets its eyes: they become Scared and suffer a fear attack with a bane on the WIL roll."
   },
   {
    "roll": 3,
    "name": "Hand of the Dead",
    "damage": "2D4",
    "type": "bludgeoning",
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": false,
    "text": "A gesture flings a foe within 10 m 2D4 m away for the same bludgeoning damage; they land prone. Can't be dodged."
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
    "text": "A sudden sweep of its weapon hits every opponent within 2 m for weapon damage. Can be parried.",
    "weapon": true
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
    "text": "Grabs a victim: D6 damage ignoring armor; on their next turn they must pass Evade (not an action) to act at all, retrying each turn. They also become cold (Rulebook p.54) and can't heal HP or WP until warm.",
    "ignoresArmor": true
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
    "text": "A mighty swing rolling double the weapon's damage dice that knocks the victim down. Can be parried.",
    "weapon": true
   }
  ]
 },
 {
  "id": "laurinde-the-swan-maiden",
  "category": "Path of Glory",
  "source": "pathofglory",
  "name": "Laurinde the Swan Maiden",
  "page": 38,
  "ferocity": 1,
  "size": "Normal",
  "movement": 14,
  "flying": true,
  "armor": null,
  "hp": 16,
  "text": "An elf swan maiden whom Stormhand caught and caged in his lair for study. She stays in swan form and silent until sure her rescuers aren't the mage's servants, then demands her freedom and swears to aid them in need — or becomes their sworn enemy if they side with Stormhand.",
  "traits": [
   {
    "name": "Shapeshifter",
    "text": "Changes between elf and white swan (either way) as an action. In elf form she's an ordinary NPC; in swan form a monster that can still speak. Clothes and gear change with her unless metal or heavier than half her carrying capacity."
   },
   {
    "name": "Wings",
    "text": "In swan form she flies freely."
   },
   {
    "name": "Ally",
    "text": "Fighting beside the player characters in swan form she doesn't roll on her table — she always uses attack #1 or #2 against their enemies."
   }
  ],
  "attacks": [
   {
    "damage": "D8",
    "type": "bludgeoning",
    "targets": "all within 4 m",
    "range": 4,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "roll": 1,
    "name": "Wingbeat",
    "text": "A gust from her wings: every creature up to human size within 4 m is hurled D8 m, takes the same in bludgeoning and lands prone."
   },
   {
    "damage": "2D8",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 2,
    "name": "Pecking Attack",
    "text": "Repeated pecks: 2D8 slashing and a fear attack (WIL roll)."
   },
   {
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [
     "Disheartened"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 3,
    "name": "Swan Song",
    "text": "A lament for the fallen: everyone within 10 m becomes Disheartened, or takes another condition of their choice if already Disheartened."
   },
   {
    "damage": "2D4",
    "type": "slashing",
    "targets": "all enemies within 10 m",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "roll": 4,
    "name": "Flock of Swans",
    "text": "Summoned swans mob her foes: every enemy within 10 m takes 2D4 slashing and a fear attack."
   },
   {
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "roll": 5,
    "name": "Pleading Gaze",
    "text": "Begs someone within 10 m to stop fighting: they roll WIL or immediately take a movement and an action (no WP) of the GM's choosing, and lose their turn this round if they haven't acted."
   },
   {
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": "bane",
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "roll": 6,
    "name": "Gift of the Gods",
    "text": "Curses a foe within 10 m with chaotic visions of ancient times: fear attack with a bane on the WIL roll."
   }
  ]
 },
 {
  "id": "obald",
  "category": "Path of Glory",
  "source": "pathofglory",
  "name": "Obald",
  "page": 45,
  "ferocity": 2,
  "size": "Large",
  "movement": 12,
  "armor": 2,
  "hp": 42,
  "regeneration": "D6",
  "weaknesses": [
   "Sunlight"
  ],
  "text": "One of the two cave trolls (Obald and Stoka) living apart from the hobgoblins in the Chasm of Caves — ravenous brutes who see every creature as a meal, though a PERSUASION roll plus a gift of valuables can calm them. Hunts alone at night and may ambush travelers in the forest.",
  "traits": [
   {
    "name": "Sensitive to Sunlight",
    "text": "Takes D6 damage per round in direct sunlight and can't regenerate; a troll brought to zero HP this way turns to stone. Thick cloud or full-cover clothing protects it."
   },
   {
    "name": "Regeneration",
    "text": "Heals D6 HP each turn in combat, unless it is at zero HP."
   },
   {
    "name": "Treasure Eater",
    "text": "Craves gold coins and small gold items above all food; its belly usually holds D12 gold coins."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Rolling Attack",
    "damage": "2D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Curls into a boulder and rolls into one enemy: 2D8 bludgeoning, knocked down."
   },
   {
    "roll": 2,
    "name": "Cave Bats",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "summons": "Vampiric Bats",
    "text": "Stirs up a flock of cave bats that attack its enemies for D3 rounds (use the vampiric bats, Rulebook p.99)."
   },
   {
    "roll": 3,
    "name": "Head to Head",
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
    "helmetOnly": true,
    "text": "Headbutt: 2D6 bludgeoning and Dazed. Only a helmet reduces the damage."
   },
   {
    "roll": 4,
    "name": "Gobble",
    "damage": "2D8",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Bites for 2D8 piercing and holds the victim in its maw: they must roll STR (an action) each round to break free, taking another 2D8 on a failure."
   },
   {
    "roll": 5,
    "name": "Golden Spit",
    "damage": "D10",
    "type": "bludgeoning",
    "targets": "one",
    "range": 6,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "ranged": true,
    "text": "Spits a gold coin at someone within 6 m: D10 bludgeoning, a condition of the victim's choice — and they are 1 gold richer."
   },
   {
    "roll": 6,
    "name": "Troll Throw",
    "damage": "2D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Hurls a character 2D8 m in a random direction for the same bludgeoning damage; they land prone."
   }
  ]
 },
 {
  "id": "stoka",
  "category": "Path of Glory",
  "source": "pathofglory",
  "name": "Stoka",
  "page": 45,
  "ferocity": 2,
  "size": "Large",
  "movement": 12,
  "armor": 2,
  "hp": 42,
  "regeneration": "D6",
  "weaknesses": [
   "Sunlight"
  ],
  "text": "One of the two cave trolls (Obald and Stoka) living apart from the hobgoblins in the Chasm of Caves — ravenous brutes who see every creature as a meal, though a PERSUASION roll plus a gift of valuables can calm them. Sleeps in the troll lair by day and roams out at night.",
  "traits": [
   {
    "name": "Sensitive to Sunlight",
    "text": "Takes D6 damage per round in direct sunlight and can't regenerate; a troll brought to zero HP this way turns to stone. Thick cloud or full-cover clothing protects it."
   },
   {
    "name": "Regeneration",
    "text": "Heals D6 HP each turn in combat, unless it is at zero HP."
   },
   {
    "name": "Treasure Eater",
    "text": "Craves gold coins and small gold items above all food; its belly usually holds D12 gold coins."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Rolling Attack",
    "damage": "2D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Curls into a boulder and rolls into one enemy: 2D8 bludgeoning, knocked down."
   },
   {
    "roll": 2,
    "name": "Cave Bats",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "summons": "Vampiric Bats",
    "text": "Stirs up a flock of cave bats that attack its enemies for D3 rounds (use the vampiric bats, Rulebook p.99)."
   },
   {
    "roll": 3,
    "name": "Head to Head",
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
    "helmetOnly": true,
    "text": "Headbutt: 2D6 bludgeoning and Dazed. Only a helmet reduces the damage."
   },
   {
    "roll": 4,
    "name": "Gobble",
    "damage": "2D8",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Bites for 2D8 piercing and holds the victim in its maw: they must roll STR (an action) each round to break free, taking another 2D8 on a failure."
   },
   {
    "roll": 5,
    "name": "Golden Spit",
    "damage": "D10",
    "type": "bludgeoning",
    "targets": "one",
    "range": 6,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "ranged": true,
    "text": "Spits a gold coin at someone within 6 m: D10 bludgeoning, a condition of the victim's choice — and they are 1 gold richer."
   },
   {
    "roll": 6,
    "name": "Troll Throw",
    "damage": "2D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Hurls a character 2D8 m in a random direction for the same bludgeoning damage; they land prone."
   }
  ]
 },
 {
  "id": "mogdath",
  "category": "Path of Glory",
  "name": "Mogdath",
  "source": "pathofglory",
  "page": 59,
  "boss": true,
  "ferocity": 2,
  "size": "Normal",
  "movement": 10,
  "armor": 6,
  "hp": 64,
  "undead": true,
  "gear": [
   "Aleth-Kheloch",
   "Plate Armor",
   "Keys (#11, #17, #29 chest)"
  ],
  "text": "A death wight — once a power-hungry knight of Eledain, raised by Dakoth as a fully material knight of living darkness with ember-red eyes, black plate and a black cloak. Unlike common wights it is not tied to one place but goes where its master sends it. Paranoid, quick to rage, cowardly and terrified of fire.",
  "traits": [
   {
    "name": "Resistance",
    "text": "Non-magical weapons deal half damage; fire, magic and magical weapons deal full damage."
   },
   {
    "name": "Sensitive to Sunlight",
    "text": "Takes D6 damage per stretch in direct sunlight; cloud cover is enough to stop it, but Mogdath prefers to move at night above ground."
   },
   {
    "name": "Immortal",
    "text": "No ordinary means (magic included) can end him: at zero HP he rises again with full HP one shift later — unless his spirit is bound into Tefalas' Dagger."
   },
   {
    "name": "Wary of the Dagger",
    "text": "Knows Tefalas' Dagger on sight; whenever he has a turn left in the round he always parries its attacks, rolling against 15."
   },
   {
    "name": "Aleth-Kheloch",
    "text": "Mastercrafted two-handed sword with a permanent Enchant Weapon (power level 1); damage 2D10. A living wielder is automatically Disheartened in direct sunlight and can't shake it there."
   },
   {
    "name": "Farsight",
    "text": "Regularly spies on far parts of the realm with a form of Farsight, appearing there as a shimmering blue phantom of himself (run through random events)."
   },
   {
    "name": "Keys",
    "text": "Carries the keys to the spiral-stair doors (#10/#11), the council chamber doors (#16/#17) and the locked chest in the Lord Councilor's chamber (#29)."
   }
  ],
  "resistances": [
   "Non-magical weapons (fire, magic and magical weapons deal full damage)"
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Ghost Scream",
    "damage": null,
    "type": null,
    "targets": "all within 20 m",
    "range": 20,
    "fear": "bane",
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A shriek like a rusty blade through the soul: everyone within 20 m suffers a fear attack with a bane on the WIL roll."
   },
   {
    "roll": 2,
    "name": "Dreadful Gaze",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": "bane",
    "conditions": [
     "Scared"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A victim within 10 m is caught by the burning red eyes: they become Scared and suffer a fear attack with a bane on the WIL roll."
   },
   {
    "roll": 3,
    "name": "Domination",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A spell seizes a victim within 10 m: unless they pass a WIL roll with a bane (not an action) they immediately make a movement and an action of the GM's choosing, and lose their own turn this round if it hasn't come yet."
   },
   {
    "roll": 4,
    "name": "Sweeping Attack",
    "damage": "2D10",
    "type": null,
    "targets": "all within 2 m",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": true,
    "dodge": true,
    "text": "Sweeps through the party like a dark cloud: everyone within 2 m takes weapon damage (2D10). Can be parried.",
    "weapon": true
   },
   {
    "roll": 5,
    "name": "Life Drain",
    "damage": "D10",
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Grabs a victim and draws out their life: they lose D10 HP and the same amount of WP (armor doesn't help), and Mogdath heals that many HP.",
    "ignoresArmor": true,
    "drain": true,
    "wpDamage": "D10"
   },
   {
    "roll": 6,
    "name": "Power Attack",
    "damage": "4D10",
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": true,
    "dodge": true,
    "text": "A silent, crushing swing at one character for double weapon damage (4D10); the victim is knocked down. Can be parried.",
    "weapon": true
   }
  ]
 },
 {
  "id": "daz",
  "category": "Path of Glory",
  "name": "Daz",
  "source": "pathofglory",
  "page": 60,
  "ferocity": 2,
  "size": "Normal",
  "movement": 12,
  "armor": null,
  "hp": 32,
  "undead": true,
  "text": "A shadow wraith — a featureless, jet-black silhouette, tall, with a cloak that stirs in still air. Mogdath's second-in-command, a necromancer in life who still studies the Outer Darkness for Dakoth. Rules the forge orcs and mine ogres through fear; cold, calculating, fond of frost spells cast from ambush.",
  "traits": [
   {
    "name": "Resistance",
    "text": "Non-magical weapons and attacks deal half damage; fire deals full damage."
   },
   {
    "name": "Sensitive to Sunlight",
    "text": "Takes D6 damage per stretch in direct sunlight."
   },
   {
    "name": "Shadow Form",
    "text": "Half-material and hovering, but cannot pass through solid matter; moves objects by will alone."
   },
   {
    "name": "Variant",
    "text": "Daz's Frostbite deals 3D6; her Life Drain is D8 HP and D6 WP."
   }
  ],
  "resistances": [
   "Non-magical weapons and attacks (fire excepted)"
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Touch of Death",
    "damage": "2D10",
    "type": null,
    "targets": "one",
    "range": 4,
    "fear": false,
    "conditions": [
     "Scared"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Plunges a shadow hand into the chest of a victim within 4 m and squeezes the heart: 2D10 damage, armor doesn't help, and the victim becomes Scared.",
    "ignoresArmor": true
   },
   {
    "roll": 2,
    "name": "Ghost Scream",
    "damage": null,
    "type": null,
    "targets": "all within 20 m",
    "range": 20,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "The silhouette swells and shrieks: everyone within 20 m suffers a fear attack."
   },
   {
    "roll": 3,
    "name": "Crippling Cold",
    "damage": "D8",
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Seizes a victim and freezes them stiff: D8 damage ignoring armor; on their next turn they must pass EVADE (not an action) to act at all, retrying each turn. They are also cold (core p.54) and heal no HP or WP until warmed.",
    "ignoresArmor": true
   },
   {
    "roll": 4,
    "name": "Frostbite",
    "damage": "3D6",
    "type": "cold",
    "targets": "two within 2 m of each other",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A cold spell coats two characters within 10 m (no more than 2 m apart) in ice: 3D6 damage each, armor doesn't help.",
    "ignoresArmor": true
   },
   {
    "roll": 5,
    "name": "Life Drain",
    "damage": "D8",
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Grips a victim with both hands and feeds: they lose D8 HP and D6 WP (armor doesn't help) and the wraith heals the HP lost.",
    "ignoresArmor": true,
    "drain": true,
    "wpDamage": "D6"
   },
   {
    "roll": 6,
    "name": "Cloud of Darkness",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Dissolves into a black cloud covering everyone within 10 m: total darkness (core p.52) this round and the next that mundane light can't pierce. It can keep making monster attacks in this form."
   }
  ]
 },
 {
  "id": "gozar",
  "category": "Path of Glory",
  "name": "Gozar",
  "source": "pathofglory",
  "page": 60,
  "ferocity": 2,
  "size": "Normal",
  "movement": 12,
  "armor": null,
  "hp": 38,
  "undead": true,
  "text": "A shadow wraith — a short, stocky black silhouette. Once Daz's pupil, he chose death for magical insight and regretted it too late. Consumed by hatred for the living, he vents it on the orcs unless Mogdath or Daz rein him in, and loves draining victims to husks.",
  "traits": [
   {
    "name": "Resistance",
    "text": "Non-magical weapons and attacks deal half damage; fire deals full damage."
   },
   {
    "name": "Sensitive to Sunlight",
    "text": "Takes D6 damage per stretch in direct sunlight."
   },
   {
    "name": "Shadow Form",
    "text": "Half-material and hovering, but cannot pass through solid matter; moves objects by will alone."
   },
   {
    "name": "Variant",
    "text": "Gozar's Frostbite deals 2D6; his Life Drain is D10 HP and D10 WP."
   }
  ],
  "resistances": [
   "Non-magical weapons and attacks (fire excepted)"
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Touch of Death",
    "damage": "2D10",
    "type": null,
    "targets": "one",
    "range": 4,
    "fear": false,
    "conditions": [
     "Scared"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Plunges a shadow hand into the chest of a victim within 4 m and squeezes the heart: 2D10 damage, armor doesn't help, and the victim becomes Scared.",
    "ignoresArmor": true
   },
   {
    "roll": 2,
    "name": "Ghost Scream",
    "damage": null,
    "type": null,
    "targets": "all within 20 m",
    "range": 20,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "The silhouette swells and shrieks: everyone within 20 m suffers a fear attack."
   },
   {
    "roll": 3,
    "name": "Crippling Cold",
    "damage": "D8",
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Seizes a victim and freezes them stiff: D8 damage ignoring armor; on their next turn they must pass EVADE (not an action) to act at all, retrying each turn. They are also cold (core p.54) and heal no HP or WP until warmed.",
    "ignoresArmor": true
   },
   {
    "roll": 4,
    "name": "Frostbite",
    "damage": "2D6",
    "type": "cold",
    "targets": "two within 2 m of each other",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A cold spell coats two characters within 10 m (no more than 2 m apart) in ice: 2D6 damage each, armor doesn't help.",
    "ignoresArmor": true
   },
   {
    "roll": 5,
    "name": "Life Drain",
    "damage": "D10",
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Grips a victim with both hands and feeds: they lose D10 HP and D10 WP (armor doesn't help) and the wraith heals the HP lost.",
    "ignoresArmor": true,
    "drain": true,
    "wpDamage": "D10"
   },
   {
    "roll": 6,
    "name": "Cloud of Darkness",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Dissolves into a black cloud covering everyone within 10 m: total darkness (core p.52) this round and the next that mundane light can't pierce. It can keep making monster attacks in this form."
   }
  ]
 },
 {
  "id": "sharch",
  "category": "Path of Glory",
  "name": "Sharch",
  "source": "pathofglory",
  "page": 62,
  "ferocity": 3,
  "size": "Large",
  "movement": 16,
  "armor": 2,
  "hp": 58,
  "undead": true,
  "text": "A nightwarg — an undead, pitch-black two-headed wolf with glowing blue eyes, made by binding a spirit into two fused wolf bodies; one mind, two mouths. Mogdath's solitary, savage and rather dim hound, left to roam the halls and kill whatever lives.",
  "traits": [
   {
    "name": "Resistance",
    "text": "Non-magical weapons and attacks deal half damage; fire deals full damage."
   },
   {
    "name": "Sensitive to Sunlight",
    "text": "Takes D6 damage per stretch in direct sunlight."
   }
  ],
  "resistances": [
   "Non-magical weapons and attacks (fire excepted)"
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Dreadful Howl",
    "damage": null,
    "type": null,
    "targets": "all within 20 m",
    "range": 20,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "One head throws back and howls: every player character within 20 m rolls WIL against fear."
   },
   {
    "roll": 2,
    "name": "Focused Bite",
    "damage": "2D8",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Both heads bite the same character: two separate hits of 2D8 piercing, each with lethal poison (potency 13).",
    "hits": 2,
    "poison": {
     "type": "lethal",
     "potency": 13
    }
   },
   {
    "roll": 3,
    "name": "Double Bite",
    "damage": "2D8",
    "type": "piercing",
    "targets": "two within 2 m of each other",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Each head bites a different character (within 2 m of each other): 2D8 piercing and lethal poison (potency 13) for each.",
    "poison": {
     "type": "lethal",
     "potency": 13
    }
   },
   {
    "roll": 4,
    "name": "Warg Throw",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Snatches a character in its jaws and flings them: 2D6 bludgeoning, landing prone that many metres away."
   },
   {
    "roll": 5,
    "name": "Sudden Pounce",
    "damage": "2D8",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "A wild leap and raking claws: 2D8 slashing and the victim is knocked down."
   },
   {
    "roll": 6,
    "name": "Toxic Drool",
    "damage": null,
    "type": null,
    "targets": "all within 4 m in front",
    "range": 4,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Spits venomous slaver from both jaws: everyone within 4 m in front of it is exposed to lethal poison (potency 13).",
    "poison": {
     "type": "lethal",
     "potency": 13
    }
   }
  ]
 },
 {
  "id": "bone-golem",
  "category": "Path of Glory",
  "name": "Bone Golem",
  "source": "pathofglory",
  "page": 76,
  "ferocity": 3,
  "size": "Large",
  "movement": 6,
  "armor": null,
  "hp": 46,
  "regeneration": "3",
  "undead": true,
  "text": "A three-metre heap of creaking dwarven bones animated by Mogdath, with four or five arm-like limbs gripping broken swords and axes and three grinning skulls on top. Jerky and clumsy; it kills any living thing in the east parlor (#26) but never leaves the room. A dented white-gold crown (25 gold) sits on one skull.",
  "traits": [
   {
    "name": "Resistance",
    "text": "Piercing weapons deal half damage."
   },
   {
    "name": "Regeneration",
    "text": "Heals 3 HP at the start of every round."
   },
   {
    "name": "Bound to the Room",
    "text": "Wakes when a living creature comes within 2 m of the bone pile; never leaves the parlor."
   }
  ],
  "resistances": [
   "Piercing"
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Double Strike",
    "damage": "2D8",
    "type": "slashing",
    "targets": "two within 2 m of each other",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Strikes two opponents standing within 2 m of each other: 2D8 slashing each."
   },
   {
    "roll": 2,
    "name": "Bone Lance",
    "damage": "3D6",
    "type": "piercing",
    "targets": "one",
    "range": 6,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Shapes a spear of bone that shoots out at a foe within 6 m: 3D6 piercing."
   },
   {
    "roll": 3,
    "name": "Flurry of Bones",
    "damage": "2D6",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "A storm of swinging bone limbs: three hits of 2D6 slashing in a row on one opponent, who is then knocked down.",
    "hits": 3
   },
   {
    "roll": 4,
    "name": "Voice from the Grave",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "All three skulls screech like bone under a saw: every opponent within 10 m suffers a fear attack."
   },
   {
    "roll": 5,
    "name": "Death's Embrace",
    "damage": "D6",
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Engulfs a player character: on their turn they can only try to break free (STR roll, an action), and they take D6 damage, ignoring armor, each time the golem has a turn.",
    "ignoresArmor": true
   },
   {
    "roll": 6,
    "name": "Bone Storm",
    "damage": "2D6",
    "type": "slashing",
    "targets": "all within 4 m",
    "range": 4,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Whirls into a maelstrom of bone: every opponent within 4 m takes 2D6 slashing."
   }
  ]
 },
 {
  "id": "the-brandy-dragon",
  "category": "Path of Glory",
  "name": "The Brandy Dragon",
  "source": "pathofglory",
  "page": 78,
  "ferocity": 2,
  "size": "Large",
  "movement": 8,
  "armor": 3,
  "hp": 36,
  "text": "A horse-sized dragon with black-green scales and stubby flightless wings that crept down a brewery flue as a hatchling and grew too big to leave. Lazy, mildly clever and good-natured; speaks dragon tongue and some ancient Dwarvish (LANGUAGES to talk). Loves dwarves, fire and brandy; hates orcs and undead.",
  "traits": [
   {
    "name": "Wary Host",
    "text": "Attacks orcs and undead on sight. Others may pass with PERSUASION or BLUFFING — a boon for anyone carrying a torch, since it adores fire."
   },
   {
    "name": "Ally",
    "text": "Light its fireplaces and it stays awake and content for a shift, keeping Mogdath's forces out so the heroes can take a shift rest (once only)."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Claw Attack",
    "damage": "2D8",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A lightning-fast swipe at one character: 2D8 slashing."
   },
   {
    "roll": 2,
    "name": "Double Slash",
    "damage": "2D6",
    "type": "slashing",
    "targets": "two",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Rakes its claws across two opponents: 2D6 slashing each."
   },
   {
    "roll": 3,
    "name": "Tail Strike",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "all behind it",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Swings its spiked tail: everyone behind the dragon takes 2D6 bludgeoning and is knocked down."
   },
   {
    "roll": 4,
    "name": "Jaw Grip",
    "damage": "2D8",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Clamps a foe in its jaws and shakes them: 2D8 piercing, they drop a weapon in hand (GM's pick) and land prone."
   },
   {
    "roll": 5,
    "name": "Ramming Lunge",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Barrels into a foe, hurling them 2D6 m back (or into the nearest wall) for the same bludgeoning damage; they land prone."
   },
   {
    "roll": 6,
    "name": "Fire Breath",
    "damage": "2D10",
    "type": "fire",
    "targets": "all in a 4 m cone",
    "range": 4,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Breathes a 4 m cone of flame (as wide at each point as its distance from the mouth): everyone caught takes 2D10, armor doesn't help.",
    "ignoresArmor": true
   }
  ]
 },
 {
  "id": "stone-guardian",
  "category": "Path of Glory",
  "name": "Stone Guardian",
  "source": "pathofglory",
  "page": 84,
  "ferocity": 2,
  "size": "Large",
  "movement": 4,
  "armor": 6,
  "hp": 60,
  "text": "A three-metre statue of a rough, rock-grown dwarf-like figure — a variant of the earth elemental gnome, bound by stone magic to guard the treasure trove (#45). It questions intruders first (in ancient Dwarvish, then the common tongue) but attacks anyone who takes anything. Very slow; chases thieves but never leaves the City.",
  "traits": [
   {
    "name": "Guardian",
    "text": "Demands an explanation before fighting; immediately attacks anyone removing an item from the podium."
   },
   {
    "name": "Last Resort",
    "text": "At 30 HP or less it stops fighting and smashes one corner pillar per turn; that starts a chain reaction that brings the ceiling down on the southern City three rounds later (see #45)."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Crush",
    "damage": "2D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Hurls its bulk onto a character: 2D8 bludgeoning and knocked down."
   },
   {
    "roll": 2,
    "name": "Whirling Fists",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "all within 2 m",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Swings both fists around: every opponent within 2 m takes 2D6 bludgeoning."
   },
   {
    "roll": 3,
    "name": "Throw",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Grabs a foe and flings them 2D6 m for the same bludgeoning damage; they land prone."
   },
   {
    "roll": 4,
    "name": "Two in One Hit",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "two",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Grabs one opponent and smashes them into a companion: both take 2D6 bludgeoning and are knocked down."
   },
   {
    "roll": 5,
    "name": "Rock Storm",
    "damage": "3D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": "bane",
    "text": "Tries to pound a victim flat with its fists: 3D6 bludgeoning, and dodging it is rolled with a bane."
   },
   {
    "roll": 6,
    "name": "Recovery",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "text": "Kneels and half-merges with the floor, drawing strength from the stone: it heals D10 HP.",
    "heal": "D10"
   }
  ]
 },
 {
  "id": "azarizag",
  "category": "Path of Glory",
  "name": "Azarizag",
  "page": 111,
  "source": "pathofglory",
  "ferocity": 2,
  "size": "Large",
  "movement": 18,
  "armor": null,
  "hp": 64,
  "text": "A fire demon bound to the bitter old priest Gultrub; the two are united only by their loathing of Sathmog. She appears in smoke whenever Gultrub calls, or when anyone touches the warded trapdoor to his ritual cellar. Same profile as the Bestiary fire demon.",
  "traits": [
   {
    "name": "Scorching Body",
    "text": "Touching her deals D6 damage that armor doesn't stop; the heat gives every opponent a bane on melee attacks against her."
   },
   {
    "name": "Immunity",
    "text": "Fire damage has no effect on her."
   },
   {
    "name": "Vulnerability",
    "text": "Water-based magic deals double damage. A thrown bucket of water deals D10, a tankard of ale or jug of wine D8, spitting 1 point; roll Brawling to hit with these."
   }
  ],
  "immunities": [
   "fire"
  ],
  "weaknesses": [
   "water (double damage from water magic; bucket D10, ale/wine D8, spit 1 — Brawling to hit)"
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Sweeping Staff",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "all within 2 m",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "extraDamage": {
     "dice": "D6",
     "ignoresArmor": true
    },
    "text": "Her red-hot iron staff sweeps every foe within 2 m: 2D6 bludgeoning plus D6 heat damage that ignores armor; all are knocked down."
   },
   {
    "roll": 2,
    "name": "Imps",
    "damage": null,
    "type": null,
    "targets": "all within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [
     "Angry"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "A cloud of burning, jeering imps whirls out: everyone within 10 m becomes Angry."
   },
   {
    "roll": 3,
    "name": "Flaming Flail",
    "damage": "2D8",
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
    "extraDamage": {
     "dice": "D8",
     "type": "fire",
     "ignoresArmor": true
    },
    "text": "A flail strike on one foe: 2D8 bludgeoning plus D8 fire that ignores armor; the victim is Dazed."
   },
   {
    "roll": 4,
    "name": "Fire Whirl",
    "damage": "2D8",
    "type": "fire",
    "targets": "all within 4 m",
    "range": 4,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "ignoresArmor": true,
    "text": "She spins the flail into a column of fire: everyone within 4 m takes 2D8 fire (armor doesn't help) and is knocked down."
   },
   {
    "roll": 5,
    "name": "Crushing Kick",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "A sudden kick hurls a foe 2D6 m away for the same amount of bludgeoning damage; they land prone."
   },
   {
    "roll": 6,
    "name": "Fire Breath",
    "damage": "2D10",
    "type": "fire",
    "targets": "cone",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "ignoresArmor": true,
    "text": "A 10 m cone of flame (as wide as its distance from her): all caught take 2D10 fire, armor doesn't help."
   }
  ],
  "variantOf": "Fire Demon"
 },
 {
  "id": "pog-iskolde",
  "category": "Path of Glory",
  "source": "pathofglory",
  "name": "Iskolde",
  "page": 133,
  "ferocity": 2,
  "size": "Normal",
  "movement": 6,
  "armor": null,
  "hp": 48,
  "text": "The embalmed elven shieldmaiden who held the line against Sathmog's demons, wrapped tight in her tomb on Is-Hel. She rises in fury the moment anyone lays a hand on her shield.",
  "traits": [
   {
    "name": "Resistance",
    "text": "No internal organs: half damage from piercing weapons."
   },
   {
    "name": "Flammable",
    "text": "Tinder-dry: double damage from fire."
   },
   {
    "name": "The Battle Shield Iskolde",
    "text": "Her mastercrafted large shield (durability 18) holds a variant MAGIC SHIELD. Whoever bears it can parry an incoming spell with any weapon skill; on success the spell is fully blocked at no WP cost and the bearer gains WP equal to its power level. Iskolde spends actions on this against spells when she can. Heroes who take it must first decipher its inscriptions (Rulebook p.59)."
   }
  ],
  "resistances": [
   "piercing"
  ],
  "weaknesses": [
   "fire (double damage)"
  ],
  "gear": [
   "The Battle Shield Iskolde (mastercrafted large shield)"
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Curse",
    "damage": null,
    "type": null,
    "targets": "all player characters within 10 m",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Hisses a dread curse: every player character within 10 m must roll WIL against fear."
   },
   {
    "roll": 2,
    "name": "Shield Bash",
    "damage": "3D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Smashes a player character with her shield: 3D6 bludgeoning, knocked down."
   },
   {
    "roll": 3,
    "name": "Shield Throw",
    "damage": "2D8",
    "type": "bludgeoning",
    "targets": "player character with the lowest STR within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Flings her shield at the lowest-STR player character within 10 m for 2D8 bludgeoning, then walks over to retrieve it."
   },
   {
    "roll": 4,
    "name": "Shield Slam",
    "damage": null,
    "type": null,
    "targets": "all player characters within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [
     "Dazed"
    ],
    "prone": false,
    "parry": false,
    "dodge": false,
    "text": "Drives her shield into the floor: every player character within 10 m is dazed and must roll EVADE (no action) or lose their turn this round if not yet taken. Can't be dodged.",
    "losesTurn": "EVADE"
   },
   {
    "roll": 5,
    "name": "Deadly Throw",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Hurls a player character 2D6 m; they land prone and take the same in bludgeoning damage."
   },
   {
    "roll": 6,
    "name": "Strangulation",
    "damage": "D10",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Seizes a throat: D10 bludgeoning (armor doesn't help) and D10 more on each of her turns. The victim can't move or take movement actions except to break free (STR with a bane; others may help). She makes no other monster attacks until the victim breaks free or drops to zero HP.",
    "ignoresArmor": true,
    "ongoing": "D10",
    "grapple": {
     "breakFree": "STR",
     "bane": true,
     "help": true
    }
   }
  ]
 },
 {
  "id": "pog-demonic-seed-pods",
  "category": "Path of Glory",
  "source": "pathofglory",
  "name": "Demonic Seed Pods",
  "page": 139,
  "ferocity": 2,
  "size": "Swarm",
  "movement": 24,
  "armor": null,
  "hp": 38,
  "text": "A whirling cloud of winged, thorned seeds shed by the Ur-Fang of Fang-Forren, buzzing down on travelers like a hunting swarm.",
  "traits": [
   {
    "name": "Swarm",
    "text": "Treated as one monster. Physical damage other than fire is halved (rounded up)."
   }
  ],
  "resistances": [
   "All physical damage except fire"
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
    "name": "Swirling Attack",
    "damage": "D10",
    "type": "piercing",
    "targets": "all player characters within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Thorny pods spin around everyone within 10 m: D10 piercing each; anyone whose armor is penetrated is also injected with paralyzing poison (potency 12).",
    "rolls": [
     1,
     2
    ],
    "poison": {
     "type": "paralyzing",
     "potency": 12,
     "ifPenetrates": true
    }
   },
   {
    "roll": 3,
    "name": "Focused Attack",
    "damage": "2D8",
    "type": "piercing",
    "targets": "player character with the highest CON",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "The whole swarm converges on the highest-CON player character: 2D8 piercing, plus paralyzing poison (potency 12) if it gets through armor.",
    "rolls": [
     3,
     4
    ],
    "poison": {
     "type": "paralyzing",
     "potency": 12,
     "ifPenetrates": true
    }
   },
   {
    "roll": 5,
    "name": "Demonic Control",
    "damage": "D3",
    "type": null,
    "targets": "player character with the lowest WIL",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "The pods smother the lowest-WIL player character: D3 damage (armor doesn't help) and a WIL roll. On failure the victim must at once move to the nearest player character and make a melee attack, and loses their turn this round (or next round if it has passed).",
    "rolls": [
     5,
     6
    ],
    "ignoresArmor": true
   }
  ]
 },
 {
  "id": "pog-ur-fang",
  "category": "Path of Glory",
  "source": "pathofglory",
  "name": "Ur-Fang",
  "page": 140,
  "ferocity": 2,
  "size": "Large",
  "movement": 8,
  "armor": 6,
  "hp": 64,
  "text": "Demonic walking trees, the true masters of Fang-Forren. They string captives up in thorny vines and keep them alive until more of their kind arrive to drink their blood.",
  "traits": [
   {
    "name": "Flammable",
    "text": "Double damage from fire-based attacks; it does everything it can to stop foes using fire."
   },
   {
    "name": "Resistance",
    "text": "Half damage from piercing and bludgeoning weapons, after armor."
   },
   {
    "name": "Demonic",
    "text": "Counts as a demon for all rules purposes."
   }
  ],
  "resistances": [
   "piercing",
   "bludgeoning"
  ],
  "weaknesses": [
   "Fire (double damage)"
  ],
  "demon": true,
  "attacks": [
   {
    "roll": 1,
    "name": "Seed Pods",
    "damage": "D10",
    "type": "piercing",
    "targets": "all opponents within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Shakes loose a shower of seed pods over every foe within 10 m: D10 piercing each, plus paralyzing poison (potency 12) for anyone whose armor is penetrated.",
    "poison": {
     "type": "paralyzing",
     "potency": 12,
     "ifPenetrates": true
    }
   },
   {
    "roll": 2,
    "name": "Spear Thrust",
    "damage": "2D10",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": true,
    "dodge": true,
    "text": "Grows a branch into a spear and drives it at a foe: 2D10 piercing. Can be parried."
   },
   {
    "roll": 3,
    "name": "Crushing Blow",
    "damage": "2D10",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Brings its thickest bough down on a foe's head: 2D10 bludgeoning, knocked down."
   },
   {
    "roll": 4,
    "name": "Up, Up and Away",
    "damage": "2D8",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Grabs a foe and throws them 2D8 m; they take the same in bludgeoning damage and land prone."
   },
   {
    "roll": 5,
    "name": "Hang Them High",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Loops a branch round a foe's neck: 2D6 bludgeoning and 2D6 more on each of the victim's turns. They can't move or take movement actions except to break free (an action, STR with a bane; others may help). Ur-Fang can keep acting meanwhile.",
    "ongoing": "2D6",
    "grapple": {
     "breakFree": "STR",
     "bane": true,
     "help": true,
     "action": true
    }
   },
   {
    "roll": 6,
    "name": "Demonic Control",
    "damage": "D6",
    "type": null,
    "targets": "player character with the lowest WIL within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Stabs its roots into the lowest-WIL player character within 10 m: D6 damage (armor doesn't help), then WIL (with a bane); if that fails, the victim must at once move to the nearest player character and make a melee attack, and loses their turn this round (or next if it has passed).",
    "ignoresArmor": true
   }
  ]
 },
 {
  "id": "pog-morgasa",
  "category": "Path of Glory",
  "source": "pathofglory",
  "name": "Morgasa",
  "page": 146,
  "ferocity": 2,
  "size": "Large",
  "movement": 12,
  "armor": null,
  "hp": 44,
  "regeneration": "D6",
  "text": "Troll witch left by Sathmog to guard the Demon Tower and the Heart of Darkness. She spies through ravens and often wears the shape of a great blue-sheened raven herself; she loathes the undead.",
  "traits": [
   {
    "name": "Raven Form",
    "text": "Movement 24 and free flight while shaped as a raven."
   },
   {
    "name": "Regeneration",
    "text": "Heals D6 HP each turn in combat unless already at zero HP."
   },
   {
    "name": "Stench",
    "text": "Anyone coming within 10 m rolls CON (not an action) or becomes Dazed."
   },
   {
    "name": "Insensitive to Sunlight",
    "text": "Unlike other trolls, sunlight does not harm her."
   }
  ],
  "gear": [
   "Huge club"
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Hex",
    "damage": null,
    "type": null,
    "targets": "player character with the lowest WIL within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "text": "Curses the lowest-WIL player character within 10 m, who rolls WIL to resist; if cursed they lose D8 WP and suffer a bane on all rolls for a stretch. Can't be dodged.",
    "curse": true
   },
   {
    "roll": 2,
    "name": "Rotten Breath",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 4,
    "fear": false,
    "conditions": [
     "Sickly"
    ],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Breathes on a foe within 4 m: they become Sickly and must roll CON (with a bane) or lose their turn this round if not yet taken.",
    "losesTurn": "CON"
   },
   {
    "roll": 3,
    "name": "A Murder of Ravens",
    "damage": "D8",
    "type": "piercing",
    "targets": "all player characters within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Her raven flock descends on every player character within 10 m: D8 piercing each."
   },
   {
    "roll": 4,
    "name": "Stomping Attack",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "all opponents within 2 m",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Stamps wildly at every foe within 2 m: 2D6 bludgeoning and knocked down."
   },
   {
    "roll": 5,
    "name": "Beak and Talons",
    "damage": "3D8",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Turns raven and tears into a player character: 3D8 piercing, knocked down; then she returns to troll shape."
   },
   {
    "roll": 6,
    "name": "Bludgeoning Club",
    "damage": "4D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [
     "Dazed"
    ],
    "prone": false,
    "parry": true,
    "dodge": true,
    "text": "Her heaviest club blow: 4D6 bludgeoning and the victim is Dazed. Can be parried."
   }
  ]
 },
 {
  "id": "pog-karlak-ash-ark-afar",
  "category": "Path of Glory",
  "source": "pathofglory",
  "name": "Karlak Sol-Tar & Ash-Ark-Afar",
  "page": 150,
  "ferocity": 3,
  "size": "Huge",
  "movement": 24,
  "flying": true,
  "armor": 6,
  "hp": 84,
  "text": "A dragon knight of Immer-Drak beyond the Sea of Dreams, sworn to destroy the Heart of Darkness, riding the dragon Ash-Ark-Afar. He can be talked round — he can't actually burn the heart.",
  "traits": [
   {
    "name": "Rider and Mount",
    "text": "One monster with two HP pools. Ash-Ark-Afar: HP 84, armor 6, Movement 24. Karlak Sol-Tar: HP 48, armor 8, WP 24, Movement 10; while mounted he can only be hit by ranged attacks or long melee weapons. Players choose which to attack."
   },
   {
    "name": "Wings",
    "text": "The dragon flies freely."
   },
   {
    "name": "Heroic Abilities (rider)",
    "text": "Defensive, Robust ×15."
   },
   {
    "name": "If One Falls",
    "text": "If the dragon dies, Karlak fights on alone as a regular NPC to the death. If Karlak falls, the dragon stops fighting, picks him up and flies home east."
   }
  ],
  "gear": [
   "Longsword (mastercrafted)",
   "Plate armor",
   "Great helm",
   "Cloak",
   "Eight rations of food"
  ],
  "rider": {
   "name": "Karlak Sol-Tar",
   "hp": 48,
   "armor": 8,
   "wp": 24,
   "movement": 10,
   "abilities": [
    "Defensive",
    "Robust ×15"
   ]
  },
  "mount": {
   "name": "Ash-Ark-Afar",
   "hp": 84,
   "armor": 6,
   "movement": 24,
   "flying": true
  },
  "attacks": [
   {
    "roll": 1,
    "name": "Dragon Roar",
    "damage": null,
    "type": null,
    "targets": "everyone within 20 m",
    "range": 20,
    "fear": "bane",
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "text": "Ash-Ark-Afar roars: everyone within 20 m faces a fear attack, rolling WIL with a bane."
   },
   {
    "roll": 2,
    "name": "Sword Swing",
    "damage": "2D8+D6",
    "type": "slashing",
    "targets": "two opponents within 4 m of each other",
    "range": 4,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": true,
    "dodge": true,
    "text": "Karlak sweeps his blade across two foes within 4 m of each other: 2D8+D6 slashing each. Can be parried."
   },
   {
    "roll": 3,
    "name": "Dragon Wind",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "everyone within 10 m",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Wingbeats raise a gale over everyone within 10 m: human-sized or smaller creatures and loose objects fly 2D6 m, take that much bludgeoning damage and land prone. Someone about to go over the roof edge gets an EVADE roll (no action) to catch themselves; failing that, an ACROBATICS roll to grab hold, then another ACROBATICS roll to climb back up."
   },
   {
    "roll": 4,
    "name": "Tail Strike",
    "damage": "2D8",
    "type": "bludgeoning",
    "targets": "everyone within 6 m",
    "range": 6,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Ash-Ark-Afar lashes its spiked tail: everyone within 6 m takes 2D8 bludgeoning and is knocked down."
   },
   {
    "roll": 5,
    "name": "Mighty Blow",
    "damage": "4D8+D6",
    "type": "slashing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": true,
    "dodge": true,
    "text": "Karlak puts everything into one sword stroke at a player character: 4D8+D6 slashing. Can be parried."
   },
   {
    "roll": 6,
    "name": "Fire Breath",
    "damage": "3D10",
    "type": "fire",
    "targets": "everyone in a 10 m cone",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Ash-Ark-Afar exhales fire in a 10 m cone (as wide at each point as its distance from the mouth): 3D10 fire damage to everyone in it, armor doesn't help.",
    "ignoresArmor": true
   }
  ]
 }
];
window.DB_MONSTERS = DB_MONSTERS;
var DB_MONSTER_RULES = {
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
window.DB_MONSTER_RULES = DB_MONSTER_RULES;
var DB_NPCS = [
 {
  "id": "goblin-scout",
  "name": "Goblin Scout",
  "kind": "Goblin",
  "page": 6,
  "movement": 10,
  "damageBonus": null,
  "hp": 9,
  "wp": 8,
  "armor": {
   "name": "Leather",
   "rating": 1
  },
  "skills": {
   "Awareness": 10,
   "Evade": 10,
   "Sneaking": 12
  },
  "kinAbility": "Resilient",
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
   "Nocturnal (foliage)"
  ],
  "nonMonster": true,
  "source": "bestiary",
  "corePage": 90
 },
 {
  "id": "goblin-warrior",
  "name": "Goblin Warrior",
  "kind": "Goblin",
  "page": 6,
  "movement": 10,
  "damageBonus": null,
  "hp": 10,
  "wp": 8,
  "armor": {
   "name": "Studded Leather",
   "rating": 2
  },
  "skills": {
   "Awareness": 10,
   "Evade": 10,
   "Sneaking": 12
  },
  "kinAbility": "Resilient",
  "abilities": [],
  "weapons": [
   {
    "name": "Long Spear",
    "skill": 12,
    "damage": "2D8"
   }
  ],
  "traits": [
   "Nocturnal (foliage)"
  ],
  "nonMonster": true,
  "source": "bestiary",
  "corePage": 90
 },
 {
  "id": "orc-warrior",
  "name": "Orc Warrior",
  "kind": "Orc",
  "page": 12,
  "movement": 10,
  "damageBonus": {
   "STR": "D4"
  },
  "hp": 12,
  "wp": 9,
  "armor": {
   "name": "Studded Leather",
   "rating": 2
  },
  "skills": {
   "Awareness": 10,
   "Evade": 8
  },
  "kinAbility": "Tough",
  "abilities": [],
  "weapons": [
   {
    "name": "Scimitar",
    "skill": 12,
    "damage": "2D6"
   }
  ],
  "traits": [
   "Nocturnal (foliage)"
  ],
  "nonMonster": true,
  "source": "bestiary",
  "corePage": 95
 },
 {
  "id": "orc-shaman",
  "name": "Orc Shaman",
  "kind": "Orc",
  "page": 12,
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
  "kinAbility": "Tough",
  "abilities": [],
  "weapons": [
   {
    "name": "Staff",
    "skill": 10,
    "damage": "D8"
   }
  ],
  "traits": [
   "Nocturnal (foliage)"
  ],
  "nonMonster": true,
  "source": "bestiary",
  "corePage": 95
 },
 {
  "id": "orc-chieftain",
  "name": "Orc Chieftain",
  "kind": "Orc",
  "page": 12,
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
  "kinAbility": "Tough",
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
   "Nocturnal (foliage)"
  ],
  "nonMonster": true,
  "source": "bestiary",
  "corePage": 95
 },
 {
  "id": "skeleton-warrior",
  "name": "Skeleton Warrior",
  "kind": "Skeleton",
  "page": 114,
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
  ],
  "nonMonster": true,
  "source": "bestiary",
  "corePage": 96
 },
 {
  "id": "skeleton-archer",
  "name": "Skeleton Archer",
  "kind": "Skeleton",
  "page": 114,
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
  ],
  "nonMonster": true,
  "source": "bestiary",
  "corePage": 96
 },
 {
  "id": "skeleton-champion",
  "name": "Skeleton Champion",
  "kind": "Skeleton",
  "page": 114,
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
  ],
  "nonMonster": true,
  "source": "bestiary",
  "note": "The book gives no skill or damage for the large shield; the core Skeleton Champion's values (skill 16, D8) are used.",
  "corePage": 96
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
  ],
  "source": "core"
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
  ],
  "source": "core"
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
  ],
  "source": "core"
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
  ],
  "source": "core"
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
  ],
  "source": "core"
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
  ],
  "source": "core"
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
  ],
  "source": "core"
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
  ],
  "source": "core"
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
  ],
  "source": "core"
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
  ],
  "source": "core"
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
  ],
  "source": "core"
 },
 {
  "id": "hobgoblin-scout",
  "name": "Hobgoblin Scout",
  "kind": "Hobgoblin",
  "page": 8,
  "movement": 10,
  "damageBonus": null,
  "hp": 9,
  "wp": 8,
  "armor": {
   "name": "Leather",
   "rating": 1
  },
  "skills": {
   "Awareness": 12,
   "Evade": 12,
   "Sneaking": 14
  },
  "kinAbility": "Fearless",
  "abilities": [],
  "weapons": [
   {
    "name": "Short Bow",
    "skill": 10,
    "damage": "D10"
   },
   {
    "name": "Dagger",
    "skill": 8,
    "damage": "D8"
   }
  ],
  "traits": [
   "Nocturnal"
  ],
  "nonMonster": true,
  "source": "bestiary"
 },
 {
  "id": "hobgoblin-fighter",
  "name": "Hobgoblin Fighter",
  "kind": "Hobgoblin",
  "page": 8,
  "movement": 10,
  "damageBonus": null,
  "hp": 12,
  "wp": 8,
  "armor": {
   "name": "Studded Leather",
   "rating": 2
  },
  "skills": {
   "Awareness": 10,
   "Evade": 10,
   "Sneaking": 10
  },
  "kinAbility": "Fearless",
  "abilities": [],
  "weapons": [
   {
    "name": "Short Spear",
    "skill": 10,
    "damage": "D10"
   }
  ],
  "gear": [
   "Shield, Small"
  ],
  "traits": [
   "Nocturnal"
  ],
  "nonMonster": true,
  "source": "bestiary"
 },
 {
  "id": "hobgoblin-thief",
  "name": "Hobgoblin Thief",
  "kind": "Hobgoblin",
  "page": 8,
  "movement": 12,
  "damageBonus": {
   "AGL": "D4"
  },
  "hp": 7,
  "wp": 8,
  "armor": null,
  "skills": {
   "Awareness": 12,
   "Evade": 12,
   "Sneaking": 14,
   "Sleight of Hand": 12,
   "Spot Hidden": 10
  },
  "kinAbility": "Fearless",
  "abilities": [],
  "weapons": [
   {
    "name": "Dagger",
    "skill": 10,
    "damage": "D8"
   },
   {
    "name": "Sling",
    "skill": 8,
    "damage": "D8"
   }
  ],
  "traits": [
   "Nocturnal"
  ],
  "nonMonster": true,
  "source": "bestiary"
 },
 {
  "id": "ogre-fighter",
  "name": "Ogre Fighter",
  "kind": "Ogre",
  "page": 10,
  "movement": 10,
  "damageBonus": {
   "STR": "D6"
  },
  "hp": 16,
  "wp": 12,
  "armor": {
   "name": "Leather",
   "rating": 1
  },
  "skills": {
   "Awareness": 8,
   "Brawling": 12,
   "Evade": 6
  },
  "kinAbility": "Body Slam",
  "abilities": [],
  "weapons": [
   {
    "name": "Wooden Club, Large",
    "skill": 10,
    "damage": "2D8"
   }
  ],
  "traits": [
   "Nocturnal (foliage)",
   "Large"
  ],
  "size": "Large",
  "nonMonster": true,
  "source": "bestiary"
 },
 {
  "id": "ogre-chieftain",
  "name": "Ogre Chieftain",
  "kind": "Ogre",
  "page": 10,
  "boss": true,
  "movement": 10,
  "damageBonus": {
   "STR": "D6"
  },
  "hp": 24,
  "wp": 16,
  "armor": {
   "name": "Studded Leather",
   "rating": 2
  },
  "skills": {
   "Awareness": 12,
   "Brawling": 14,
   "Evade": 8
  },
  "kinAbility": "Body Slam",
  "abilities": [
   "Veteran",
   "Robust ×4"
  ],
  "weapons": [
   {
    "name": "Warhammer, Heavy",
    "skill": 12,
    "damage": "2D10"
   }
  ],
  "traits": [
   "Nocturnal (foliage)",
   "Large"
  ],
  "size": "Large",
  "nonMonster": true,
  "source": "bestiary"
 },
 {
  "id": "cat-people-hunter",
  "name": "Cat People Hunter",
  "kind": "Cat People",
  "page": 16,
  "movement": 12,
  "damageBonus": {
   "AGL": "D4"
  },
  "hp": 8,
  "wp": 9,
  "armor": {
   "name": "Leather",
   "rating": 1
  },
  "skills": {
   "Acrobatics": 14,
   "Awareness": 12,
   "Sneaking": 14
  },
  "kinAbility": "Nine Lives",
  "abilities": [],
  "weapons": [
   {
    "name": "Short Spear",
    "skill": 14,
    "damage": "D10"
   },
   {
    "name": "Short Bow",
    "skill": 12,
    "damage": "D10"
   }
  ],
  "nonMonster": true,
  "source": "bestiary"
 },
 {
  "id": "cat-people-thief",
  "name": "Cat People Thief",
  "kind": "Cat People",
  "page": 16,
  "movement": 12,
  "damageBonus": {
   "AGL": "D4"
  },
  "hp": 8,
  "wp": 9,
  "armor": null,
  "skills": {
   "Awareness": 14,
   "Evade": 12,
   "Sleight of Hand": 12,
   "Sneaking": 14
  },
  "kinAbility": "Nine Lives",
  "abilities": [],
  "weapons": [
   {
    "name": "Dagger",
    "skill": 14,
    "damage": "D8"
   },
   {
    "name": "Sling",
    "skill": 10,
    "damage": "D8"
   }
  ],
  "nonMonster": true,
  "source": "bestiary"
 },
 {
  "id": "frog-people-hunter",
  "name": "Frog People Hunter",
  "kind": "Frog People",
  "page": 22,
  "movement": 12,
  "damageBonus": {
   "AGL": "D4"
  },
  "hp": 8,
  "wp": 10,
  "armor": {
   "name": "Leather",
   "rating": 1
  },
  "skills": {
   "Acrobatics": 14,
   "Awareness": 8,
   "Sneaking": 10
  },
  "kinAbility": "Leaping",
  "abilities": [],
  "weapons": [
   {
    "name": "Short Spear",
    "skill": 10,
    "damage": "D10"
   },
   {
    "name": "Short Bow",
    "skill": 12,
    "damage": "D10"
   }
  ],
  "nonMonster": true,
  "source": "bestiary"
 },
 {
  "id": "frog-people-shaman",
  "name": "Frog People Shaman",
  "kind": "Frog People",
  "page": 22,
  "movement": 10,
  "damageBonus": null,
  "hp": 6,
  "wp": 12,
  "armor": null,
  "skills": {
   "Acrobatics": 12,
   "Animism": 12,
   "Evade": 8,
   "Healing": 10,
   "Sneaking": 8
  },
  "spells": [
   "Animal Whisperer",
   "Ensnaring Roots",
   "Lightning Flash",
   "Treat Wound",
   "Sleep"
  ],
  "kinAbility": "Leaping",
  "abilities": [],
  "weapons": [
   {
    "name": "Staff",
    "skill": 8,
    "damage": "D8"
   }
  ],
  "nonMonster": true,
  "source": "bestiary"
 },
 {
  "id": "karkion-scholar",
  "name": "Karkion Scholar",
  "kind": "Karkion",
  "page": 26,
  "movement": 12,
  "damageBonus": {
   "AGL": "D4"
  },
  "hp": 12,
  "wp": 14,
  "armor": null,
  "skills": {
   "Awareness": 14,
   "Beast Lore": 14,
   "Evade": 12,
   "Healing": 10,
   "Languages": 14,
   "Myths & Legends": 14,
   "Sneaking": 12,
   "Spot Hidden": 12
  },
  "kinAbility": "Wings",
  "abilities": [],
  "weapons": [
   {
    "name": "Short Sword",
    "skill": 12,
    "damage": "D10"
   },
   {
    "name": "Short Bow",
    "skill": 14,
    "damage": "D10"
   }
  ],
  "flying": true,
  "nonMonster": true,
  "source": "bestiary"
 },
 {
  "id": "karkion-mage",
  "name": "Karkion Mage",
  "kind": "Karkion",
  "page": 26,
  "movement": 12,
  "damageBonus": {
   "AGL": "D4"
  },
  "hp": 12,
  "wp": 16,
  "armor": null,
  "skills": {
   "Animism": 14,
   "Evade": 12,
   "Myths & Legends": 12,
   "Sneaking": 12
  },
  "tricks": [
   "Birdsong",
   "Cook Food"
  ],
  "spells": [
   "Animal Whisperer",
   "Banish",
   "Engulfing Forest",
   "Heal Wound",
   "Lightning Bolt",
   "Sleep"
  ],
  "kinAbility": "Wings",
  "abilities": [],
  "weapons": [
   {
    "name": "Staff",
    "skill": 12,
    "damage": "D8"
   }
  ],
  "flying": true,
  "nonMonster": true,
  "source": "bestiary"
 },
 {
  "id": "lizard-people-hunter",
  "name": "Lizard People Hunter",
  "kind": "Lizard People",
  "page": 28,
  "movement": 12,
  "damageBonus": {
   "AGL": "D4"
  },
  "hp": 9,
  "wp": 8,
  "armor": null,
  "skills": {
   "Awareness": 12,
   "Evade": 14,
   "Sneaking": 14
  },
  "kinAbility": "Camouflage",
  "abilities": [],
  "weapons": [
   {
    "name": "Short Bow",
    "skill": 12,
    "damage": "D10"
   },
   {
    "name": "Dagger",
    "skill": 10,
    "damage": "D8"
   }
  ],
  "nonMonster": true,
  "source": "bestiary"
 },
 {
  "id": "lizard-people-fighter",
  "name": "Lizard People Fighter",
  "kind": "Lizard People",
  "page": 28,
  "movement": 10,
  "damageBonus": {
   "STR": "D4"
  },
  "hp": 10,
  "wp": 8,
  "armor": null,
  "skills": {
   "Awareness": 12,
   "Evade": 12,
   "Sneaking": 10
  },
  "kinAbility": "Camouflage",
  "abilities": [],
  "weapons": [
   {
    "name": "Short Spear",
    "skill": 12,
    "damage": "D10"
   },
   {
    "name": "Sling",
    "skill": 10,
    "damage": "D8"
   }
  ],
  "gear": [
   "Shield, Small"
  ],
  "nonMonster": true,
  "source": "bestiary"
 },
 {
  "id": "lizard-people-mage",
  "name": "Lizard People Mage",
  "kind": "Lizard People",
  "page": 28,
  "movement": 10,
  "damageBonus": null,
  "hp": 8,
  "wp": 14,
  "armor": null,
  "skills": {
   "Animism": 12,
   "Evade": 12,
   "Healing": 10,
   "Sneaking": 12
  },
  "spells": [
   "Animal Whisperer",
   "Banish",
   "Engulfing Forest",
   "Lightning Flash",
   "Heal Wound",
   "Sleep"
  ],
  "kinAbility": "Camouflage",
  "abilities": [],
  "weapons": [
   {
    "name": "Knife",
    "skill": 10,
    "damage": "D8"
   }
  ],
  "nonMonster": true,
  "source": "bestiary"
 },
 {
  "id": "lizard-people-merchant",
  "name": "Lizard People Merchant",
  "kind": "Lizard People",
  "page": 28,
  "movement": 8,
  "damageBonus": null,
  "hp": 8,
  "wp": 8,
  "armor": null,
  "skills": {
   "Awareness": 10,
   "Bartering": 10,
   "Bluffing": 10,
   "Evade": 12,
   "Persuasion": 12
  },
  "kinAbility": "Camouflage",
  "abilities": [],
  "weapons": [
   {
    "name": "Knife",
    "skill": 8,
    "damage": "D8"
   }
  ],
  "nonMonster": true,
  "source": "bestiary"
 },
 {
  "id": "satyr-bard",
  "name": "Satyr Bard",
  "kind": "Satyr",
  "page": 36,
  "movement": 10,
  "damageBonus": null,
  "hp": 10,
  "wp": 12,
  "armor": null,
  "skills": {
   "Bluffing": 10,
   "Evade": 10,
   "Performance": 14,
   "Persuasion": 12
  },
  "kinAbility": "Raise Spirits",
  "abilities": [],
  "weapons": [
   {
    "name": "Short Spear",
    "skill": 10,
    "damage": "D10"
   }
  ],
  "traits": [
   "Melancholy"
  ],
  "nonMonster": true,
  "source": "bestiary"
 },
 {
  "id": "dregil",
  "source": "pathofglory",
  "abilities": [],
  "weapons": [
   {
    "name": "Knife",
    "skill": 12,
    "damage": "D8"
   }
  ],
  "name": "Dregil",
  "kind": "Path of Glory",
  "page": 14,
  "movement": 8,
  "damageBonus": null,
  "hp": 9,
  "wp": null,
  "armor": null,
  "skills": {
   "Bartering": 15
  },
  "notes": "Weepy wine merchant at the Hungry Hobgoblin. Hobgoblins robbed his caravan of wine and his black pearl (which he claims to have inherited — a lie; he found it in a forest stream)."
 },
 {
  "id": "ivil",
  "source": "pathofglory",
  "abilities": [
   "Fast Footwork"
  ],
  "weapons": [
   {
    "name": "Knife",
    "skill": 15,
    "damage": "D8"
   }
  ],
  "name": "Ivil",
  "kind": "Path of Glory",
  "page": 15,
  "movement": 12,
  "damageBonus": {
   "AGL": "D4"
  },
  "hp": 13,
  "wp": 12,
  "armor": null,
  "skills": {
   "Evade": 14
  },
  "notes": "Short, muscular crook; one of the two 'pathfinders' offering a treasure map to the Old Barrows. Plans to rob the party at night and flee; avoids fighting at all costs."
 },
 {
  "id": "filundrus",
  "source": "pathofglory",
  "abilities": [
   "Fast Footwork"
  ],
  "weapons": [
   {
    "name": "Knife",
    "skill": 15,
    "damage": "D8"
   }
  ],
  "name": "Filundrus",
  "kind": "Path of Glory",
  "page": 15,
  "movement": 12,
  "damageBonus": {
   "AGL": "D4"
  },
  "hp": 13,
  "wp": 12,
  "armor": null,
  "skills": {
   "Evade": 14
  },
  "notes": "Tall, lanky, pleasant-looking crook; one of the two 'pathfinders' offering a treasure map to the Old Barrows. Plans to rob the party at night and flee; avoids fighting at all costs."
 },
 {
  "id": "doriath",
  "source": "pathofglory",
  "abilities": [
   "Fast Footwork",
   "Focused ×10",
   "Lightning Fast",
   "Master Spellcaster",
   "Robust ×10"
  ],
  "weapons": [
   {
    "name": "Dagger",
    "skill": 13,
    "damage": "D8"
   }
  ],
  "name": "Doriath",
  "kind": "Path of Glory",
  "page": 17,
  "boss": true,
  "movement": 12,
  "damageBonus": {
   "AGL": "D4"
  },
  "hp": 34,
  "wp": 38,
  "armor": null,
  "skills": {
   "Brawling": 13,
   "Evade": 14,
   "Performance": 11,
   "Mentalism": 16
  },
  "tricks": [
   "Fetch",
   "Flick",
   "Light",
   "Open/Close",
   "Sense Magic",
   "Lock/Unlock",
   "Slow Fall"
  ],
  "spells": [
   "Magic Shield",
   "Transfer",
   "Levitate",
   "Longstrider",
   "Power Fist",
   "Stone Skin",
   "Mental Strike",
   "Telepathy",
   "Dominate",
   "Flight"
  ],
  "aliases": [
   "Tuvinel"
  ],
  "notes": "Dark sorceress (mentalist), sister of Dakoth, posing as the bard Tuvinel at the Hungry Hobgoblin. Wants Stormhand's seashell horn and every other key; allies only until she can betray."
 },
 {
  "id": "eldur",
  "source": "pathofglory",
  "abilities": [],
  "weapons": [
   {
    "name": "Broadsword",
    "skill": 14,
    "damage": "2D6"
   },
   {
    "name": "Longbow",
    "skill": 16,
    "damage": "D12"
   }
  ],
  "name": "Eldur",
  "kind": "Elf",
  "page": 24,
  "movement": 12,
  "damageBonus": {
   "AGL": "D4"
  },
  "hp": 13,
  "wp": 15,
  "armor": null,
  "skills": {
   "Evade": 14
  },
  "notes": "Elf fighter of the band of four journeying to the Temple of Winds. A stretch of their company heals each player character of one condition."
 },
 {
  "id": "fenor",
  "source": "pathofglory",
  "abilities": [],
  "weapons": [
   {
    "name": "Broadsword",
    "skill": 14,
    "damage": "2D6"
   },
   {
    "name": "Longbow",
    "skill": 16,
    "damage": "D12"
   }
  ],
  "name": "Fenor",
  "kind": "Elf",
  "page": 24,
  "movement": 12,
  "damageBonus": {
   "AGL": "D4"
  },
  "hp": 13,
  "wp": 15,
  "armor": null,
  "skills": {
   "Evade": 14
  },
  "notes": "Elf fighter of the band of four journeying to the Temple of Winds. A stretch of their company heals each player character of one condition."
 },
 {
  "id": "giljath",
  "source": "pathofglory",
  "abilities": [],
  "weapons": [
   {
    "name": "Broadsword",
    "skill": 14,
    "damage": "2D6"
   },
   {
    "name": "Longbow",
    "skill": 16,
    "damage": "D12"
   }
  ],
  "name": "Giljath",
  "kind": "Elf",
  "page": 24,
  "movement": 12,
  "damageBonus": {
   "AGL": "D4"
  },
  "hp": 13,
  "wp": 15,
  "armor": null,
  "skills": {
   "Evade": 14
  },
  "notes": "Elf fighter of the band of four journeying to the Temple of Winds. A stretch of their company heals each player character of one condition."
 },
 {
  "id": "tirinar",
  "source": "pathofglory",
  "abilities": [],
  "weapons": [],
  "name": "Tirinar",
  "kind": "Elf",
  "page": 24,
  "movement": 12,
  "damageBonus": {
   "AGL": "D4"
  },
  "hp": 13,
  "wp": 15,
  "armor": null,
  "skills": {
   "Animism": 15,
   "Evade": 14
  },
  "spells": [
   "Banish",
   "Ensnaring Roots",
   "Lightning Flash",
   "Treat Wound"
  ],
  "notes": "Elf mage of the band of four journeying to the Temple of Winds. Carries no weapons."
 },
 {
  "id": "tefalas",
  "source": "pathofglory",
  "abilities": [],
  "weapons": [
   {
    "name": "Staff",
    "skill": 12,
    "damage": "D8"
   }
  ],
  "name": "Tefalas",
  "kind": "Path of Glory",
  "page": 24,
  "movement": 8,
  "damageBonus": null,
  "hp": 8,
  "wp": null,
  "armor": null,
  "skills": {
   "Beast Lore": 15,
   "Healing": 15,
   "Languages": 16,
   "Myths & Legends": 17
  },
  "gear": [
   "Sleeping Pelt",
   "Bandages (10)"
  ],
  "notes": "Elderly monk of the Keepers of the Immaculate Flame (burgundy robe with Eledain's dragon). Knows what the keys are and of the hermit; warns of the Knight in Black. Must survive this adventure."
 },
 {
  "id": "elusia",
  "source": "pathofglory",
  "abilities": [],
  "weapons": [
   {
    "name": "Dagger (silvered)",
    "skill": 13,
    "damage": "D8"
   }
  ],
  "name": "Elusia",
  "kind": "Path of Glory",
  "page": 28,
  "movement": 10,
  "damageBonus": null,
  "hp": 13,
  "wp": 17,
  "armor": null,
  "skills": {
   "Animism": 18,
   "Evade": 12,
   "Healing": 17
  },
  "spells": [
   "Dispel",
   "Magic Shield",
   "Transfer",
   "Charge",
   "Permanence",
   "Animal Whisperer",
   "Engulfing Forest",
   "Sleep",
   "Restoration",
   "Resurrection"
  ],
  "gear": [
   "Herbal concoction",
   "Bandages (10)",
   "Elusia's Ring"
  ],
  "notes": "Reclusive animist of Little Lake who keeps the white pearl. Helps anyone in need; may give the pearl to worthy heroes. Her ring holds 20 WP."
 },
 {
  "id": "the-knights-squire",
  "source": "pathofglory",
  "abilities": [
   "Veteran",
   "Defensive",
   "Double Slash",
   "Robust ×6"
  ],
  "weapons": [
   {
    "name": "Two-Handed Axe (mastercrafted)",
    "skill": 16,
    "damage": "2D10"
   }
  ],
  "name": "The Knight's Squire",
  "kind": "Skeleton",
  "page": 32,
  "boss": true,
  "movement": 10,
  "damageBonus": {
   "STR": "D6"
  },
  "hp": 28,
  "wp": 15,
  "armor": {
   "name": "Chainmail",
   "rating": 4
  },
  "skills": {
   "Awareness": 12,
   "Evade": 8
  },
  "traits": [
   "Skeleton"
  ],
  "notes": "Skeleton of a big warrior in the Old Barrow; rises if his body or belongings are touched. Book lists Resistance: piercing damage halved (rounded up)."
 },
 {
  "id": "the-knights-servants",
  "source": "pathofglory",
  "abilities": [],
  "weapons": [
   {
    "name": "Short Sword (mastercrafted)",
    "skill": 12,
    "damage": "D10"
   }
  ],
  "name": "The Knight's Servants",
  "kind": "Skeleton",
  "page": 33,
  "movement": 8,
  "damageBonus": null,
  "hp": 8,
  "wp": null,
  "armor": null,
  "skills": {},
  "traits": [
   "Skeleton"
  ],
  "notes": "Four small skeletons in rotting silk in the Old Barrow; all rise together when one is disturbed. Resistance: piercing damage halved (rounded up)."
 },
 {
  "id": "stormhand",
  "source": "pathofglory",
  "abilities": [
   "Fast Footwork",
   "Focused ×10",
   "Lightning Fast",
   "Master Spellcaster",
   "Magic Talent",
   "Robust ×10"
  ],
  "weapons": [
   {
    "name": "Staff",
    "skill": 13,
    "damage": "D8"
   }
  ],
  "name": "Stormhand",
  "kind": "Path of Glory",
  "page": 35,
  "boss": true,
  "movement": 10,
  "damageBonus": null,
  "hp": 32,
  "wp": 37,
  "armor": null,
  "skills": {
   "Elementalism": 17,
   "Evade": 14,
   "Mentalism": 16
  },
  "tricks": [
   "Fetch",
   "Flick",
   "Light",
   "Open/Close",
   "Sense Magic",
   "Heat/Chill",
   "Ignite",
   "Puff of Smoke"
  ],
  "spells": [
   "Dispel",
   "Magic Shield",
   "Transfer",
   "Magic Seal",
   "Charge",
   "Permanence",
   "Gust of Wind",
   "Stone Shield",
   "Stonewall",
   "Tidal Wave",
   "Whirlwind",
   "Firebird",
   "Firestorm",
   "Gnome",
   "Salamander",
   "Sylph",
   "Undine",
   "Farsight",
   "Levitate",
   "Teleport"
  ],
  "gear": [
   "The Seashell Horn",
   "Key to the prison cells"
  ],
  "notes": "Bald, shrill, gesturing elementalist in a red robe and green slouch hat; holds the seashell horn. Teleports to escape; recharges WP at his pentagram (30 WP) or statue (20 WP). Not suicidal — negotiates, allies, betrays."
 },
 {
  "id": "undine",
  "source": "pathofglory",
  "abilities": [],
  "weapons": [
   {
    "name": "Wet Embrace (ignores armor)",
    "skill": "auto",
    "damage": "3D6"
   }
  ],
  "name": "Undine",
  "kind": "Elemental",
  "page": 37,
  "movement": 12,
  "damageBonus": null,
  "hp": 15,
  "wp": 6,
  "armor": null,
  "skills": {},
  "spells": [
   "Tidal Wave"
  ],
  "notes": "Water elemental bound by Stormhand's magic seal in his pond and tunnels. Wet embrace hits automatically in melee (can be dodged), 3D6, armor doesn't help. Can cast TIDAL WAVE once at power level 3 (its 6 WP). Resistance: piercing damage halved (rounded up)."
 },
 {
  "id": "hobgoblin-bodyguard",
  "source": "pathofglory",
  "abilities": [],
  "weapons": [
   {
    "name": "Long Spear",
    "skill": 13,
    "damage": "2D8"
   }
  ],
  "name": "Hobgoblin Bodyguard",
  "kind": "Hobgoblin",
  "page": 42,
  "movement": 10,
  "damageBonus": {
   "STR": "D4"
  },
  "hp": 16,
  "wp": null,
  "armor": {
   "name": "Studded Leather",
   "rating": 2
  },
  "skills": {
   "Awareness": 10,
   "Evade": 12,
   "Sneaking": 10
  },
  "traits": [
   "Nocturnal"
  ],
  "nonMonster": true,
  "notes": "Bloodhand's personal guard (Chasm of Caves, room 11). Wears full-cover clothing by day."
 },
 {
  "id": "bloodhand",
  "source": "pathofglory",
  "abilities": [
   "Defensive",
   "Double Slash",
   "Dual Wield",
   "Fast Footwork"
  ],
  "weapons": [
   {
    "name": "Scimitar",
    "qty": 2,
    "skill": 17,
    "damage": "2D6"
   }
  ],
  "name": "Bloodhand",
  "kind": "Hobgoblin",
  "page": 42,
  "boss": true,
  "movement": 12,
  "damageBonus": {
   "STR": "D4"
  },
  "hp": 17,
  "wp": 14,
  "armor": {
   "name": "Studded Leather",
   "rating": 2
  },
  "skills": {
   "Awareness": 14,
   "Evade": 15,
   "Sneaking": 10
  },
  "gear": [
   "Key to the chest in room 15"
  ],
  "traits": [
   "Nocturnal"
  ],
  "nonMonster": true,
  "notes": "Hobgoblin robber chief of the Chasm of Caves; owns the black pearl (taken from Dregil) and loves it as treasure without knowing its purpose. Flees with the pearl or surrenders and schemes if outmatched."
 },
 {
  "id": "ulat-aar",
  "source": "pathofglory",
  "abilities": [
   "Focused ×10"
  ],
  "weapons": [],
  "name": "Ulat-A'ar",
  "kind": "Path of Glory",
  "page": 51,
  "movement": 6,
  "damageBonus": null,
  "hp": 7,
  "wp": 36,
  "armor": null,
  "skills": {
   "Animism": 18,
   "Mentalism": 18
  },
  "spells": [
   "Dispel",
   "Magic Shield",
   "Transfer",
   "Restoration",
   "Resurrection",
   "Farsight",
   "Divination",
   "Scrying",
   "Dominate"
  ],
  "notes": "Ancient, sinister-looking but kindly hermit on a raft-tent in Deepmire. Keeper of the elven pendant; gives it to those who are not greedy (PERSUASION). Knows where the Gates of Power are."
 },
 {
  "id": "blacktooth",
  "name": "Blacktooth",
  "kind": "Path of Glory",
  "source": "pathofglory",
  "page": 86,
  "boss": true,
  "movement": 12,
  "damageBonus": {
   "STR": "D6"
  },
  "hp": 24,
  "wp": 16,
  "armor": {
   "name": "Chainmail",
   "rating": 4
  },
  "skills": {
   "Awareness": 15,
   "Brawling": 12,
   "Evade": 12
  },
  "abilities": [
   "Defensive",
   "Robust ×4",
   "Veteran"
  ],
  "weapons": [
   {
    "name": "Morningstar",
    "skill": 16,
    "damage": "2D8"
   }
  ],
  "gear": [
   "Shield, Large"
  ],
  "traits": [],
  "notes": "Burly orc commander in black scale mail with huge black fangs; Dakoth's man since youth and the only orc officer to survive the cave-ins. Terrified of Mogdath, so he tyrannizes his own troops. Holds the key to his room (#50); spies on #43/#49 through peepholes."
 },
 {
  "id": "orc-mercenary",
  "name": "Orc Mercenary",
  "kind": "Orc",
  "source": "pathofglory",
  "page": 81,
  "movement": 10,
  "damageBonus": {
   "STR": "D4"
  },
  "hp": 12,
  "wp": null,
  "armor": {
   "name": "Chainmail",
   "rating": 4
  },
  "skills": {
   "Awareness": 10,
   "Evade": 8
  },
  "abilities": [],
  "weapons": [
   {
    "name": "Scimitar",
    "skill": 14,
    "damage": "2D6"
   }
  ],
  "traits": [],
  "notes": "Dakoth's hired orcs in the Gates of Power (City, Forge). Armor and weapons as listed unless the location says otherwise (forge workers: leather or none, pickaxes and sledgehammers as light/heavy blunt objects). Hate the wraiths and Blacktooth; open to PERSUASION or BLUFFING."
 },
 {
  "id": "ogre-laborer",
  "name": "Ogre Laborer",
  "kind": "Ogre",
  "source": "pathofglory",
  "page": 87,
  "movement": 10,
  "damageBonus": {
   "STR": "D6"
  },
  "hp": 16,
  "wp": null,
  "armor": {
   "name": "Leather",
   "rating": 1
  },
  "skills": {
   "Awareness": 8,
   "Brawling": 12,
   "Evade": 6
  },
  "abilities": [],
  "weapons": [
   {
    "name": "Wooden Club, Large",
    "skill": 13,
    "damage": "2D8"
   }
  ],
  "traits": [
   "Large",
   "Nocturnal"
  ],
  "notes": "Ogres pressed into mining for Mogdath; moody, touchy, often hungover or toothsore."
 },
 {
  "id": "knight-of-eledain",
  "name": "Knight of Eledain",
  "kind": "Human",
  "page": 100,
  "movement": 10,
  "damageBonus": {
   "STR": "D4"
  },
  "hp": 15,
  "wp": 14,
  "armor": {
   "name": "Plate Armor",
   "rating": 6
  },
  "skills": {
   "Awareness": 10,
   "Brawling": 14,
   "Evade": 12
  },
  "abilities": [
   "Defensive",
   "Double Slash",
   "Veteran"
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
  "gear": [
   "Sleeping Pelt"
  ],
  "nonMonster": true,
  "notes": "Shared block for the knight-monks Anbel, Tylrod and Pilos (Keepers of the Immaculate Flame). Ride horses.",
  "source": "pathofglory"
 },
 {
  "id": "altfoss-dregel",
  "name": "Altfoss Dregel",
  "kind": "Path of Glory",
  "boss": true,
  "page": 101,
  "movement": 10,
  "damageBonus": {
   "STR": "D4"
  },
  "hp": 20,
  "wp": 12,
  "armor": {
   "name": "Chainmail",
   "rating": 4
  },
  "skills": {
   "Awareness": 14,
   "Evade": 16
  },
  "abilities": [
   "Defensive",
   "Robust ×4"
  ],
  "weapons": [
   {
    "name": "Broadsword",
    "skill": 16,
    "damage": "2D6"
   },
   {
    "name": "Dagger",
    "skill": 14,
    "damage": "D8"
   }
  ],
  "nonMonster": true,
  "notes": "Former mayor of burned Fossfirth, now leader of a guerrilla band against Dakoth.",
  "source": "pathofglory"
 },
 {
  "id": "dregels-fighter",
  "name": "Dregel's Fighter",
  "kind": "Human",
  "page": 101,
  "movement": 12,
  "damageBonus": {
   "STR": "D4"
  },
  "hp": 16,
  "wp": null,
  "armor": {
   "name": "Chainmail",
   "rating": 4
  },
  "skills": {
   "Awareness": 12,
   "Evade": 10
  },
  "weapons": [
   {
    "name": "Short Bow",
    "skill": 13,
    "damage": "D10"
   },
   {
    "name": "Short Spear",
    "skill": 14,
    "damage": "D10"
   },
   {
    "name": "Shield, Small",
    "skill": 14,
    "damage": "D8"
   }
  ],
  "nonMonster": true,
  "source": "pathofglory",
  "abilities": []
 },
 {
  "id": "orc-crossbowman",
  "name": "Orc Crossbowman",
  "kind": "Orc",
  "page": 106,
  "movement": 12,
  "damageBonus": {
   "AGL": "D4"
  },
  "hp": 10,
  "wp": null,
  "armor": {
   "name": "Leather",
   "rating": 1
  },
  "skills": {
   "Awareness": 10,
   "Evade": 12
  },
  "weapons": [
   {
    "name": "Crossbow, Light",
    "skill": 14,
    "damage": "2D6"
   },
   {
    "name": "Dagger",
    "skill": 12,
    "damage": "D8"
   }
  ],
  "gear": [
   "Horn"
  ],
  "traits": [
   "Nocturnal"
  ],
  "nonMonster": true,
  "notes": "Book lists 'crossbow' (mapped to Crossbow, Light); crossbows take no damage bonus.",
  "source": "pathofglory",
  "abilities": []
 },
 {
  "id": "ankh-tah-leh",
  "name": "Ankh-Tah-Leh",
  "kind": "Path of Glory",
  "boss": true,
  "page": 107,
  "movement": 12,
  "damageBonus": {
   "AGL": "D6"
  },
  "hp": 16,
  "wp": 12,
  "armor": {
   "name": "Spider Silk Tunic",
   "rating": 4
  },
  "skills": {
   "Acrobatics": 15,
   "Awareness": 17,
   "Bluffing": 12,
   "Evade": 16,
   "Sleight of Hand": 15,
   "Sneaking": 18,
   "Swimming": 18
  },
  "kinAbility": "Ill-Tempered, Webbed Feet",
  "abilities": [
   "Assassin",
   "Backstabbing",
   "Catlike",
   "Deflect Arrow",
   "Double Slash",
   "Dual Wield",
   "Eagle Eye",
   "Fast Footwork",
   "Fearless",
   "Lightning Fast",
   "Veteran"
  ],
  "weapons": [
   {
    "name": "Dagger",
    "qty": 2,
    "skill": 18,
    "damage": "D8"
   },
   {
    "name": "Crossbow, Hand",
    "skill": 16,
    "damage": "2D6"
   }
  ],
  "gear": [
   "Spider Silk Tunic with Winged Cloak",
   "Sleeping poison (potency 15)"
  ],
  "nonMonster": true,
  "notes": "Mallard assassin of the Ank-Tar guild. Spider silk tunic: armor 4 like chainmail but no bane on Sneaking or Evade; winged cloak lets her glide at double speed.",
  "source": "pathofglory"
 },
 {
  "id": "uhuluk",
  "name": "Uhuluk",
  "kind": "Path of Glory",
  "boss": true,
  "page": 109,
  "movement": 10,
  "damageBonus": {
   "STR": "D6"
  },
  "hp": 24,
  "wp": 15,
  "armor": {
   "name": "Plate Armor",
   "rating": 6
  },
  "skills": {
   "Awareness": 10,
   "Evade": 14
  },
  "abilities": [
   "Defensive",
   "Double Slash",
   "Veteran",
   "Robust ×4"
  ],
  "weapons": [
   {
    "name": "Scimitar",
    "skill": 16,
    "damage": "2D6"
   },
   {
    "name": "Shield, Large",
    "skill": 16,
    "damage": "D8"
   }
  ],
  "traits": [
   "Nocturnal"
  ],
  "nonMonster": true,
  "notes": "Rebel orc chieftain holding Stonemouth; tuskless jaw, metal plate in his skull.",
  "source": "pathofglory"
 },
 {
  "id": "fidelia",
  "name": "Fidelia",
  "kind": "Path of Glory",
  "boss": true,
  "page": 110,
  "movement": 12,
  "damageBonus": {
   "AGL": "D4"
  },
  "hp": 14,
  "wp": 18,
  "armor": null,
  "skills": {
   "Animism": 16,
   "Evade": 14,
   "Healing": 15
  },
  "spells": [
   "Ensnaring Roots",
   "Heal Wound",
   "Purge",
   "Sleep",
   "Resurrection"
  ],
  "weapons": [
   {
    "name": "Dagger",
    "skill": 15,
    "damage": "D8"
   }
  ],
  "nonMonster": true,
  "notes": "High priest of Sathmog in Stonemouth. Her 'Animism' is really commerce with demonic beings.",
  "source": "pathofglory",
  "abilities": []
 },
 {
  "id": "gultrub",
  "name": "Gultrub",
  "kind": "Path of Glory",
  "boss": true,
  "page": 110,
  "movement": 10,
  "damageBonus": null,
  "hp": 32,
  "wp": 38,
  "armor": null,
  "skills": {
   "Demonology": 17,
   "Evade": 14
  },
  "spells": [
   "Dispel",
   "Magic Shield",
   "Transfer",
   "Beetle Swarm",
   "Gutworm",
   "Summon Champion",
   "Demonic Exile"
  ],
  "abilities": [
   "Fast Footwork",
   "Focused ×10",
   "Master Spellcaster",
   "Robust ×10"
  ],
  "weapons": [
   {
    "name": "Staff",
    "skill": 14,
    "damage": "D8"
   }
  ],
  "nonMonster": true,
  "notes": "Senile dwarf ex-high priest, traitor to Dakoth. Book spell names: Gut Worm (= Gutworm, book version: D10 per round, no opposed roll, can't be dodged), Summon Demon (≈ Summon Champion), Demonic Displacement (≈ Demonic Exile: 2D10 on return). Allied with the fire demon Azarizag.",
  "source": "pathofglory"
 },
 {
  "id": "stonemouth-villager",
  "name": "Stonemouth Villager",
  "kind": "Human",
  "page": 110,
  "movement": 10,
  "damageBonus": null,
  "hp": 12,
  "wp": null,
  "armor": null,
  "skills": {
   "Awareness": 10,
   "Evade": 12
  },
  "weapons": [
   {
    "name": "Short Sword",
    "skill": 13,
    "damage": "D10"
   }
  ],
  "nonMonster": true,
  "notes": "Humans and dwarves of the Sathmog congregation.",
  "source": "pathofglory",
  "abilities": []
 },
 {
  "id": "stonemouth-wall-guard",
  "name": "Stonemouth Wall Guard",
  "kind": "Human",
  "page": 110,
  "movement": 10,
  "damageBonus": null,
  "hp": 12,
  "wp": null,
  "armor": {
   "name": "Studded Leather",
   "rating": 2
  },
  "skills": {
   "Awareness": 10,
   "Evade": 12
  },
  "weapons": [
   {
    "name": "Short Sword",
    "skill": 13,
    "damage": "D10"
   },
   {
    "name": "Short Bow",
    "skill": 13,
    "damage": "D10"
   }
  ],
  "nonMonster": true,
  "notes": "Villager block, as worn by the guards on the citadel walls.",
  "source": "pathofglory",
  "abilities": []
 },
 {
  "id": "balozar",
  "name": "Balozar",
  "kind": "Path of Glory",
  "boss": true,
  "page": 118,
  "movement": 10,
  "damageBonus": {
   "STR": "D6"
  },
  "hp": 36,
  "wp": 15,
  "armor": {
   "name": "Plate Armor",
   "rating": 6
  },
  "skills": {
   "Awareness": 6,
   "Evade": 8
  },
  "abilities": [
   "Berserker",
   "Defensive",
   "Double Slash",
   "Massive Blow",
   "Robust ×10"
  ],
  "weapons": [
   {
    "name": "Greatsword",
    "skill": 16,
    "damage": "2D10"
   }
  ],
  "gear": [
   "Key to Godvindel's cage"
  ],
  "traits": [
   "Skeleton"
  ],
  "nonMonster": true,
  "notes": "Skeleton champion left in command of Otag. Book gear says 'key to the cage in room #18' — the cage is in the temple hall (#25).",
  "source": "pathofglory"
 },
 {
  "id": "bunkh",
  "name": "Bunkh",
  "kind": "Path of Glory",
  "page": 122,
  "movement": 10,
  "damageBonus": {
   "STR": "D4"
  },
  "hp": 12,
  "wp": null,
  "armor": null,
  "skills": {
   "Awareness": 10,
   "Evade": 8
  },
  "weapons": [
   {
    "name": "Unarmed",
    "skill": 14,
    "damage": "D6"
   }
  ],
  "nonMonster": true,
  "notes": "Orc scout imprisoned at Otag; wants to rejoin Dakoth. (Block lists no Nocturnal rule.)",
  "source": "pathofglory",
  "abilities": []
 },
 {
  "id": "otis",
  "name": "Otis",
  "kind": "Path of Glory",
  "page": 125,
  "movement": 10,
  "damageBonus": null,
  "hp": 8,
  "wp": null,
  "armor": null,
  "skills": {
   "Acrobatics": 12,
   "Awareness": 8,
   "Seamanship": 14,
   "Sneaking": 10
  },
  "kinAbility": "Leaping",
  "abilities": [],
  "weapons": [
   {
    "name": "Short Spear",
    "skill": 10,
    "damage": "D10"
   }
  ],
  "traits": [
   "Non-Monster"
  ],
  "notes": "Old, nearly deaf frog-person fisherman of Pikewater; owns the two rowing boats on the west jetty. Leaping: jump horizontally up to Movement, vertically up to half.",
  "source": "pathofglory"
 },
 {
  "id": "voley",
  "name": "Voley",
  "kind": "Path of Glory",
  "page": 125,
  "movement": 10,
  "damageBonus": null,
  "hp": 8,
  "wp": null,
  "armor": null,
  "skills": {
   "Acrobatics": 12,
   "Awareness": 8,
   "Seamanship": 14,
   "Sneaking": 10
  },
  "kinAbility": "Leaping",
  "abilities": [],
  "weapons": [
   {
    "name": "Knife",
    "skill": 10,
    "damage": "D8"
   }
  ],
  "traits": [
   "Non-Monster"
  ],
  "notes": "Old, half-blind frog-person fisherman of Pikewater; owns the two sailing boats on the east jetty and hates Otis. Leaping: jump horizontally up to Movement, vertically up to half.",
  "source": "pathofglory"
 },
 {
  "id": "dakoth",
  "name": "Dakoth",
  "kind": "Path of Glory",
  "page": 148,
  "boss": true,
  "movement": 12,
  "damageBonus": null,
  "hp": 44,
  "wp": 48,
  "armor": null,
  "skills": {
   "Necromancy": 18,
   "Mentalism": 17,
   "Elementalism": 16,
   "Brawling": 14,
   "Evade": 15
  },
  "abilities": [
   "Fast Footwork",
   "Fearless",
   "Focused ×15",
   "Master Spellcaster",
   "Robust ×15",
   "Weasel"
  ],
  "spells": [
   "Terrify",
   "Hand of Death",
   "Drain Life",
   "Magic Shield",
   "Transfer",
   "Frost",
   "Stone Skin",
   "Dominate"
  ],
  "weapons": [],
  "gear": [
   "Dakoth's Staff (mastercrafted; CHARGE + PERMANENCE, 18 extra WP)"
  ],
  "notes": "Opens combat by casting STONE SKIN (power level 3) on himself; Master Spellcaster, two spells per turn; uses MAGIC SHIELD as a reaction against spells; saves DRAIN LIFE until he has been hurt. Book versions of his spells (p.148): Terrify — one target within 20 m rolls WIL vs fear (boon at PL1, normal PL2, bane PL3). Drain Life — parryable freezing grip, WIL or 2D6 damage (armor doesn't help) + Sickly, he heals the same, +D6 per PL above 1. Hand of Death — target within 20 m takes 2D6 + Sickly, no armor, no dodge or parry; each PL above 1 adds another round of 2D6 on his turn, even if he dies.",
  "source": "pathofglory"
 },
 {
  "id": "dakoths-bodyguards",
  "name": "Dakoth's Bodyguards",
  "kind": "Skeleton",
  "page": 149,
  "boss": true,
  "movement": 10,
  "damageBonus": {
   "STR": "D6"
  },
  "hp": 36,
  "wp": 15,
  "armor": {
   "name": "Plate",
   "rating": 6
  },
  "skills": {
   "Awareness": 6,
   "Evade": 8
  },
  "abilities": [
   "Berserker",
   "Defensive",
   "Double Slash",
   "Guardian",
   "Robust ×10"
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
  ],
  "notes": "Two tall armored skeletons who guard Dakoth: heroes can't easily reach him in melee and get a bane on ranged attacks at him. They use Guardian and their other abilities until out of WP. The shield's skill level is not printed (assumed equal to the longsword).",
  "source": "pathofglory"
 },
 {
  "id": "karlak-sol-tar",
  "name": "Karlak Sol-Tar",
  "kind": "Path of Glory",
  "page": 150,
  "boss": true,
  "movement": 10,
  "damageBonus": {
   "STR": "D6"
  },
  "hp": 48,
  "wp": 24,
  "armor": {
   "name": "Plate Armor + Great Helm",
   "rating": 8
  },
  "skills": {},
  "abilities": [
   "Defensive",
   "Robust ×15"
  ],
  "weapons": [],
  "gear": [
   "Longsword (mastercrafted, 2D8)",
   "Plate Armor",
   "Great Helm",
   "Cloak",
   "Rations ×8"
  ],
  "notes": "The dragon knight on foot, after Ash-Ark-Afar falls (then he fights to the death). The book gives no skill levels; his sword strikes in the monster table deal 2D8+D6 (two targets) and 4D8+D6 (Mighty Blow). Damage bonus D6 inferred from those.",
  "source": "pathofglory"
 }
];
window.DB_NPCS = DB_NPCS;
var DB_NPC_ATTRIBUTES = {
 "STR": "From the damage bonus: +D6 → 17, +D4 → 14, none → 10.",
 "AGL": "From the damage bonus: +D6 → 17, +D4 → 14, none → 10.",
 "CON": "Max HP, −2 per Robust.",
 "WIL": "Max WP (−2 per Focused) if listed, otherwise 10.",
 "INT": "10",
 "CHA": "10",
 "minions": "Minions share stats, die at zero HP (unless the GM wants a last word), rarely use WP and often share an initiative card.",
 "bosses": "Bosses draw their own initiative card and use WP and heroic abilities like player characters."
};
window.DB_NPC_ATTRIBUTES = DB_NPC_ATTRIBUTES;
var DB_NPC_GROUPS = [
 {
  "id": "skeleton-bestiary",
  "kind": "Skeleton",
  "page": 114,
  "category": "Undead",
  "source": "bestiary",
  "npcs": [
   "Skeleton Warrior",
   "Skeleton Archer",
   "Skeleton Champion"
  ],
  "traits": [
   "Skeleton"
  ],
  "nonMonster": true,
  "text": "Reanimated bones set by ancient rulers to guard tombs and shrines — tireless, loyal, and once a fashionable alternative to golems or pact-bound demons. Individually weak, but whole skeleton armies once marched on peasant levies.",
  "rules": [
   {
    "name": "Non-Monster",
    "text": "Skeletons fight as ordinary NPCs, not monsters."
   },
   {
    "name": "Resistance",
    "text": "All piercing damage is halved (rounded up)."
   },
   {
    "name": "Immunity",
    "text": "Immune to fear and Persuasion."
   }
  ],
  "encounter": "A rusty iron gate stands in the party's path, its wall long collapsed so it's easy to walk around. A skeleton sitting by the gatepost rises, opens the gate, waits for them to pass, then shuts it and sits down again. Locals say it has always been there and no one knows who made it.",
  "seed": "A dozen old graves have been robbed. The tracks lead onto a foggy moor, where the goblin death shaman Guralgolg is heaping bones into an army he plans to wake with a magic scroll and send against the region's chief town. Threatened, he reads the scroll early to raise 2D10 skeletons as a rearguard and slips away — and an escaped Guralgolg returns with a fresh plot."
 }
];
window.DB_NPC_GROUPS = DB_NPC_GROUPS;
var DB_NPC_TRAITS = {
 "Nocturnal": "In direct sunlight they get a bane on all rolls and take D6 damage per stretch; thick cloud or full-cover clothing prevents it.",
 "Skeleton": "Piercing damage is halved (rounded up). Immune to fear and Persuasion.",
 "Non-Monster": "Doesn't count as a monster in combat — acts as an ordinary NPC (initiative, skills, parry/dodge, can be persuaded, etc.).",
 "Large": "A Large creature (core p.83): blocks a 4×4 m area and needs a gap of at least 1 m to pass.",
 "Melancholy": "Without a daily celebration among friends, gets a bane on all rolls until able to party again.",
 "Nocturnal (foliage)": "In direct sunlight they get a bane on all rolls and take D6 damage per stretch; thick cloud, dense foliage or full-cover clothing prevents it."
};
window.DB_NPC_TRAITS = DB_NPC_TRAITS;
var DB_PROFESSIONS = [
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
  ],
  "source": "core"
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
  ],
  "source": "core"
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
  ],
  "source": "core"
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
  ],
  "source": "core"
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
  ],
  "source": "core"
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
    "Acrobatics",
    "Awareness",
    "Brawling",
    "Evade",
    "Healing",
    "Languages",
    "Mentalism",
    "Myths & Legends"
   ],
   "Demonology": [
    "Demonology",
    "Bartering",
    "Bluffing",
    "Evade",
    "Languages",
    "Myths & Legends",
    "Persuasion",
    "Sneaking"
   ],
   "Illusionism": [
    "Bartering",
    "Bluffing",
    "Evade",
    "Illusionism",
    "Performance",
    "Persuasion",
    "Sleight of Hand",
    "Sneaking"
   ],
   "Necromancy": [
    "Awareness",
    "Bluffing",
    "Healing",
    "Languages",
    "Myths & Legends",
    "Necromancy",
    "Sneaking",
    "Spot Hidden"
   ],
   "Symbolism": [
    "Awareness",
    "Crafting",
    "Evade",
    "Myths & Legends",
    "Sleight of Hand",
    "Sneaking",
    "Spot Hidden",
    "Symbolism"
   ],
   "Witchcraft": [
    "Witchcraft",
    "Awareness",
    "Beast Lore",
    "Bluffing",
    "Healing",
    "Myths & Legends",
    "Persuasion",
    "Sneaking"
   ],
   "Alchemy": [
    "Alchemy",
    "Bartering",
    "Beast Lore",
    "Bushcraft",
    "Healing",
    "Myths & Legends",
    "Sleight of Hand",
    "Spot Hidden"
   ],
   "Enchanting": [
    "Enchanting",
    "Bartering",
    "Crafting",
    "Hammers",
    "Knives",
    "Myths & Legends",
    "Sleight of Hand",
    "Spot Hidden"
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
  ],
  "source": "core"
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
  ],
  "source": "core"
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
  ],
  "source": "core"
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
  ],
  "source": "core"
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
  ],
  "source": "core"
 }
];
window.DB_PROFESSIONS = DB_PROFESSIONS;
var DB_SKILLS = [
 {
  "id": "acrobatics",
  "name": "Acrobatics",
  "attribute": "AGL",
  "type": "general",
  "page": 33,
  "text": "Jumping, climbing, balancing and similar feats of body control.",
  "source": "core"
 },
 {
  "id": "awareness",
  "name": "Awareness",
  "attribute": "INT",
  "type": "general",
  "page": 33,
  "text": "Watching and listening for threats — opposed by Sneaking. Passive rolls can't be pushed, and others can't help.",
  "source": "core"
 },
 {
  "id": "bartering",
  "name": "Bartering",
  "attribute": "CHA",
  "type": "general",
  "page": 33,
  "text": "Haggling: success moves the price 20% your way; a Dragon halves or doubles it; a Demon offends the other party and ends the deal.",
  "source": "core"
 },
 {
  "id": "beast-lore",
  "name": "Beast Lore",
  "attribute": "INT",
  "type": "general",
  "page": 33,
  "text": "Identifying animals and monsters and recalling their habits, abilities and weaknesses.",
  "source": "core"
 },
 {
  "id": "bluffing",
  "name": "Bluffing",
  "attribute": "CHA",
  "type": "general",
  "page": 34,
  "text": "Coming up with a convincing lie on the spot. A weak story earns a bane; an impossible one fails outright.",
  "source": "core"
 },
 {
  "id": "bushcraft",
  "name": "Bushcraft",
  "attribute": "INT",
  "type": "general",
  "page": 34,
  "text": "Finding the way through the wild, making camp, cooking and keeping warm.",
  "source": "core"
 },
 {
  "id": "crafting",
  "name": "Crafting",
  "attribute": "STR",
  "type": "general",
  "page": 34,
  "text": "Repairing and making gear — usually a shift of work with the right tools.",
  "source": "core"
 },
 {
  "id": "evade",
  "name": "Evade",
  "attribute": "AGL",
  "type": "general",
  "page": 34,
  "text": "Dodging attacks and getting away from a fight.",
  "source": "core"
 },
 {
  "id": "healing",
  "name": "Healing",
  "attribute": "INT",
  "type": "general",
  "page": 34,
  "text": "Saving the dying and tending wounds.",
  "source": "core"
 },
 {
  "id": "hunting-fishing",
  "name": "Hunting & Fishing",
  "attribute": "AGL",
  "type": "general",
  "page": 34,
  "text": "Tracking game and catching food in the wild.",
  "source": "core"
 },
 {
  "id": "languages",
  "name": "Languages",
  "attribute": "INT",
  "type": "general",
  "page": 34,
  "text": "Understanding foreign and ancient tongues. Everyone speaks the common tongue; non-human kin also know their own language.",
  "source": "core"
 },
 {
  "id": "myths-legends",
  "name": "Myths & Legends",
  "attribute": "INT",
  "type": "general",
  "page": 34,
  "text": "Remembering old stories, far-off lands and links to the past.",
  "source": "core"
 },
 {
  "id": "performance",
  "name": "Performance",
  "attribute": "CHA",
  "type": "general",
  "page": 34,
  "text": "Singing, reciting, joking — entertaining a crowd.",
  "source": "core"
 },
 {
  "id": "persuasion",
  "name": "Persuasion",
  "attribute": "CHA",
  "type": "general",
  "page": 34,
  "text": "Winning people over by charm, threats or reason. Asking for something costly makes it opposed by the target's WIL. Monsters can't be persuaded unless noted.",
  "source": "core"
 },
 {
  "id": "riding",
  "name": "Riding",
  "attribute": "AGL",
  "type": "general",
  "page": 34,
  "text": "Advanced manoeuvres on horseback; special rules apply in combat.",
  "source": "core"
 },
 {
  "id": "seamanship",
  "name": "Seamanship",
  "attribute": "INT",
  "type": "general",
  "page": 34,
  "text": "Steering a vessel in hard conditions, and navigation.",
  "source": "core"
 },
 {
  "id": "sleight-of-hand",
  "name": "Sleight of Hand",
  "attribute": "AGL",
  "type": "general",
  "page": 34,
  "text": "Stealing unnoticed, picking locks and other fiddly handwork.",
  "source": "core"
 },
 {
  "id": "sneaking",
  "name": "Sneaking",
  "attribute": "AGL",
  "type": "general",
  "page": 34,
  "text": "Moving unseen. Opposed by Awareness when someone is searching. In a group, one failure gives everyone away.",
  "source": "core"
 },
 {
  "id": "spot-hidden",
  "name": "Spot Hidden",
  "attribute": "INT",
  "type": "general",
  "page": 35,
  "text": "Searching for something concealed — about a stretch per search, one try per place.",
  "source": "core"
 },
 {
  "id": "swimming",
  "name": "Swimming",
  "attribute": "AGL",
  "type": "general",
  "page": 35,
  "text": "Harder swimming and diving; see the swimming and drowning rules.",
  "source": "core"
 },
 {
  "id": "axes",
  "name": "Axes",
  "attribute": "STR",
  "type": "weapon",
  "page": 35,
  "text": "Fighting with axes of all kinds, including throwing them.",
  "source": "core"
 },
 {
  "id": "bows",
  "name": "Bows",
  "attribute": "AGL",
  "type": "weapon",
  "page": 35,
  "text": "Shooting bows of every kind except crossbows.",
  "source": "core"
 },
 {
  "id": "brawling",
  "name": "Brawling",
  "attribute": "STR",
  "type": "weapon",
  "page": 35,
  "text": "Unarmed fighting with fists, feet, teeth or claws.",
  "source": "core"
 },
 {
  "id": "crossbows",
  "name": "Crossbows",
  "attribute": "AGL",
  "type": "weapon",
  "page": 35,
  "text": "Shooting crossbows of all kinds.",
  "source": "core"
 },
 {
  "id": "hammers",
  "name": "Hammers",
  "attribute": "STR",
  "type": "weapon",
  "page": 35,
  "text": "Warhammers and other blunt weapons such as clubs and maces.",
  "source": "core"
 },
 {
  "id": "knives",
  "name": "Knives",
  "attribute": "AGL",
  "type": "weapon",
  "page": 35,
  "text": "Knives and daggers, including throwing them.",
  "source": "core"
 },
 {
  "id": "slings",
  "name": "Slings",
  "attribute": "AGL",
  "type": "weapon",
  "page": 35,
  "text": "Attacking with a sling.",
  "source": "core"
 },
 {
  "id": "spears",
  "name": "Spears",
  "attribute": "STR",
  "type": "weapon",
  "page": 35,
  "text": "Spears and tridents, thrown or held — and lances.",
  "source": "core"
 },
 {
  "id": "staves",
  "name": "Staves",
  "attribute": "AGL",
  "type": "weapon",
  "page": 35,
  "text": "Fighting with a staff.",
  "source": "core"
 },
 {
  "id": "swords",
  "name": "Swords",
  "attribute": "STR",
  "type": "weapon",
  "page": 35,
  "text": "All kinds of swords.",
  "source": "core"
 },
 {
  "id": "animism",
  "name": "Animism",
  "attribute": "INT",
  "type": "secondary",
  "school": true,
  "page": 57,
  "text": "Magic lent by the spirits that dwell in all living things and places.",
  "source": "core"
 },
 {
  "id": "elementalism",
  "name": "Elementalism",
  "attribute": "INT",
  "type": "secondary",
  "school": true,
  "page": 57,
  "text": "Magic of the four elements — wind, water, earth and fire.",
  "source": "core"
 },
 {
  "id": "mentalism",
  "name": "Mentalism",
  "attribute": "INT",
  "type": "secondary",
  "school": true,
  "page": 57,
  "text": "Magic drawn from within through discipline of mind and body.",
  "source": "core"
 },
 {
  "id": "demonology",
  "name": "Demonology",
  "attribute": "INT",
  "type": "secondary",
  "school": true,
  "page": 25,
  "source": "magic",
  "text": "Magic drawn from demonic energies and pacts with the beings of Chaos: summoned vermin, chaos-tainted ground, possession by demon spirits, and the summoning and binding of demons. Its followers see demons as an alternative power against oppressive rulers."
 },
 {
  "id": "harmonism",
  "name": "Harmonism",
  "attribute": "CHA",
  "type": "secondary",
  "school": true,
  "page": 45,
  "rollsWith": "Performance",
  "source": "magic",
  "text": "Not a skill of its own: Harmonism spells are cast with Performance. Music magic: harmonists perceive the vibrations of every thing and creature as melodies within the World Symphony and alter them through song or instrument — inspiring allies, swaying emotions, mending or shattering objects, and controlling or harming foes."
 },
 {
  "id": "illusionism",
  "name": "Illusionism",
  "attribute": "INT",
  "type": "secondary",
  "school": true,
  "page": 55,
  "source": "magic",
  "text": "Magic of perception: since reality is only what each mind perceives, illusionists manipulate or dictate what others see, hear and believe — apparitions and full-sense illusions, disguises, shadows, confusion, dreams and, at the highest level, illusions real enough to be physical."
 },
 {
  "id": "necromancy",
  "name": "Necromancy",
  "attribute": "INT",
  "type": "secondary",
  "school": true,
  "page": 75,
  "source": "magic",
  "text": "The magic of death, fear and pain: necromancers manipulate the energies that linger after death to terrify, wound and sap the living and to raise and command the dead. Many claim a scholarly interest in what makes life endurable; plenty simply crave the power."
 },
 {
  "id": "symbolism",
  "name": "Symbolism",
  "attribute": "INT",
  "type": "secondary",
  "school": true,
  "page": 85,
  "source": "magic",
  "text": "Symbolists cast by drawing, carving or tracing magical symbols that hold a spell for as long as they took to make. They see themselves as craftsfolk or artists, making wards, traps, compulsions and constructs that solve practical problems."
 },
 {
  "id": "witchcraft",
  "name": "Witchcraft",
  "attribute": "INT",
  "type": "secondary",
  "school": true,
  "page": 95,
  "source": "magic",
  "text": "A loose, uncoordinated craft with no academies, practised mostly by recluses who live close to plants and animals. Its spells deal in shapeshifting, divination, curses and control over others and over beasts and monsters."
 },
 {
  "id": "alchemy",
  "name": "Alchemy",
  "attribute": "INT",
  "type": "secondary",
  "school": true,
  "page": 105,
  "source": "magic",
  "text": "Instead of casting spells on the world, alchemists brew magical substances — potions, powders, bombs and poisons — from recipes and ingredients. A master can heal, harm, protect, empower and even make gold or prolong life."
 },
 {
  "id": "enchanting",
  "name": "Enchanting",
  "attribute": "INT",
  "type": "secondary",
  "school": true,
  "page": 115,
  "source": "magic",
  "text": "Enchanters bind magic into objects — weapons, armor, clothes, containers, wands — instead of casting at their surroundings. Their spells are passive item properties that last a shift, or forever with Permanence, and can be stacked on one item, optionally with drawbacks to pay for extra spells."
 },
 {
  "id": "dracomancy",
  "name": "Dracomancy",
  "attribute": "INT",
  "type": "secondary",
  "school": true,
  "page": 131,
  "source": "magic",
  "text": "The reality-bending magic of mature dragons, learnable by mortal archmages as a supplement to their own school. All its spells are rank 6 and extremely powerful — astral travel, creating and erasing matter, stopping or rewinding time — and cost triple WP."
 }
];
window.DB_SKILLS = DB_SKILLS;
var DB_SKILL_GROUPS = {
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
window.DB_SKILL_GROUPS = DB_SKILL_GROUPS;
var DB_SPELLS = [
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
  "page": 9,
  "text": "End an ongoing spell (Protector included) of equal or lower power level; dispelling a ritual takes a stretch. The GM or adventure may let it end other magical effects. Useless against powerful rituals — Familiar, Nexus, Permanence and anything made permanent — which need Counter Ritual.",
  "castingTimeAlt": "stretch",
  "revised": true,
  "source": "magic",
  "corePage": 61
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
  "page": 9,
  "text": "Ward a person or object (up to human size, yourself included) against magic: every spell cast at it, Dispel included, loses power levels equal to this spell's. The ward ends at once if the target moves, willingly or not. Against a monster's magical attack (GM decides what counts), each power level removes one damage die.",
  "self": true,
  "revised": true,
  "source": "magic",
  "corePage": 62
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
  "text": "Cast after an enemy mage's successful roll but before damage or effects: their spell loses power levels equal to this spell's; at zero or less it fizzles. Against a monster's magical attack, each power level removes one damage die. Doesn't use up your action.",
  "source": "core"
 },
 {
  "id": "transfer",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Transfer",
  "school": "General",
  "rank": 3,
  "prerequisite": "Familiar or Magic Shield",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "Touch",
  "duration": "Instant",
  "page": 11,
  "text": "Drain WP from a humanoid or give yours to someone — up to twice the casting cost (4 / 8 / 12 WP by power level). The casting WP is lost; nobody goes above max or below zero. If the subject refuses, the spell is cast by an opposed roll against their WIL.",
  "opposed": "WIL",
  "source": "magic",
  "updated": true,
  "corePage": 62
 },
 {
  "id": "magic-seal",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Magic Seal",
  "school": "General",
  "rank": 4,
  "prerequisite": "Transfer or any rank 3 Enchanting spell",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "shift",
  "range": "Touch",
  "duration": "Until use",
  "page": 12,
  "text": "Bind a spell into an inanimate object: roll for the spell, then for the seal, both at the same power level (power level 1 for a trick); both must succeed. Set the trigger (usually an action). Whoever triggers it pays the WP (no WP, no effect); it succeeds automatically — no dragon or demon — and spells normally cast by opposed roll instead give the target a plain roll to resist. Using it breaks the seal unless Permanence was added at creation; Charge or Nexus can power it instead of the user. All these rituals can go on one object in a single shift, each rolled and paid separately. Can't bind alchemy recipes or Enchanting spells. Binding a ritual (stretch/shift casting time) costs you 1 max WP per power level (1 even on failure), and Permanence/Nexus add more loss. If the bound ritual itself lowers max WP (e.g. Rejuvenation), the activator takes that loss (Nexus can't prevent it). One seal per spell; likewise one Permanence per spell, but one Charge or Nexus can power several spells on the same object.",
  "revised": true,
  "source": "magic",
  "corePage": 62
 },
 {
  "id": "charge",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Charge",
  "school": "General",
  "rank": 4,
  "prerequisite": "Transfer or any rank 3 Enchanting spell",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "stretch",
  "range": "Touch",
  "duration": "Shift",
  "page": 12,
  "text": "Pour up to 10 WP per power level into an object; anyone touching it can spend those WP instead of their own. They fade after a shift unless made permanent with Permanence — then the item can be recharged with Charge alone. Can be paired with Magic Seal.",
  "source": "magic",
  "updated": true,
  "corePage": 62
 },
 {
  "id": "permanence",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Permanence",
  "school": "General",
  "rank": 5,
  "prerequisite": "Magic Seal or any rank 4 Enchanting spell",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "shift",
  "range": "Touch",
  "duration": "Permanent",
  "page": 13,
  "text": "Make another (non-instant) spell permanent; the same mage rolls both, at the same power level. Costs 1 max WP per power level permanently (1 even on failure). With Magic Seal the seal becomes permanent and the bound spell can be used again and again (user's WP, or via Charge/Nexus); if Magic Seal and Charge are on the same item, one Permanence covers both. Can't be dispelled; Counter Ritual undoes it.",
  "revised": true,
  "permanentWpLoss": "Max WP −1 per power level permanently; −1 even if the ritual fails.",
  "source": "magic",
  "corePage": 62
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
  "text": "Speak with a bird or mammal and ask as many questions as the power level. Animals never lie, but they see the world differently and their answers are hard to read.",
  "source": "core"
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
  "text": "Strike a demon or risen undead for 2D8 damage, +D8 per extra power level. Armor and natural armor don't help, and it can't be dodged or parried.",
  "source": "core"
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
  "text": "Roots and branches hold the victim in place. Breaking free takes an Evade roll (an action, once per round; others may help) — with a boon at power level 1, normal at 2, with a bane at 3. No effect on monsters.",
  "source": "core"
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
  "text": "Lightning hits the target for 2D6, then jumps to a random target within 2 m for 2D4; each extra power level adds a die to both. Metal armor doesn't protect; it can be dodged or parried like a ranged attack (stopping the chain). Costs double WP indoors.",
  "source": "core"
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
  "text": "Heal a living creature (or yourself) for 2D6 HP, +D6 per extra power level.",
  "source": "core"
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
  "text": "Thorny thickets and roots erupt across the area, making it rough terrain and ensnaring everyone in it except you (not monsters). Breaking free as Ensnaring Roots; unensnared people can help.",
  "source": "core"
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
  "text": "A great bolt deals 2D8, then chains to a second target within 2 m for 2D6 and a third for 2D4; each extra power level adds a die to each. As Lightning Flash for armor, dodging and indoors cost.",
  "source": "core"
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
  "text": "Heal 2D8 HP (+D8 per extra power level) and one non-permanent severe injury. Can target yourself.",
  "source": "core"
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
  "text": "Exorcise a demon or undead for 2D10 damage, +D10 per extra power level. Ignores armor; can't be dodged or parried.",
  "source": "core"
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
  "page": 21,
  "text": "Opposed roll against the target's WIL — they roll with a boon at power level 1, normally at 2, with a bane at 3. If you win they fall into a deep sleep for a stretch; very hard to wake, but damage wakes them. Living beings only; no effect on monsters.",
  "revised": true,
  "opposed": "WIL",
  "source": "magic",
  "corePage": 65
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
  "text": "Heal 2D10 HP (+D10 per extra power level) and any one severe injury. Can target yourself.",
  "source": "core"
 },
 {
  "id": "resurrection",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Resurrection",
  "school": "Animism",
  "rank": 5,
  "prerequisite": "Healing Radiance",
  "requirements": [
   "word",
   "gesture",
   "ingredient"
  ],
  "requirementDetail": "corpse",
  "castingTime": "shift",
  "range": "Touch",
  "duration": "Instant",
  "page": 23,
  "text": "Bring a dead person truly back to life (not as undead). Power level 1 within the same shift, 2 within a day, 3 within a week — after that the body is too far gone. One attempt only; failure means permanent death. Costs you 1 max WP permanently even on failure, but unlike the core rules Focused can raise it again. The returned lose D3 levels in every CHA-based skill (minimum 3). Counter Ritual can't undo it.",
  "revised": true,
  "permanentWpLoss": "Max WP −1 permanently, even if the ritual fails (Focused can restore it).",
  "source": "magic",
  "corePage": 65
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
  "text": "A mighty strike for 2D10 that leaps to up to three more targets within 2 m of each other (2D8, 2D6, 2D4); each extra power level adds a die to each. As Lightning Flash for armor, dodging and indoors cost.",
  "source": "core"
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
  "text": "Hurl a fireball for 2D6 damage that sets flammables alight. Each extra power level adds D6 or sends another fireball at a second target in range. Dodge or parry as a ranged attack.",
  "source": "core"
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
  "text": "A wave of cold puts out natural fires; every living creature in the area loses D6 HP and D6 WP and becomes cold (no HP/WP healing until warm). Humanoids (not monsters) are frozen in place, unable to move or act, until they pass a STR roll on their turn. Water freezes. +4 m range per extra power level.",
  "source": "core"
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
  "text": "Blow loose objects and up-to-human-sized creatures 2D4 m away, dealing the same in bludgeoning damage (2D6 against a swarm). +1 die per extra power level. No effect on Large or Huge monsters.",
  "source": "core"
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
  "text": "Raise a stone pillar 3 m high and 1 m wide; anyone standing there needs an Acrobatics roll to stay on top (or takes 2D6 bludgeoning under a low ceiling). Each extra power level adds 3 m of height.",
  "source": "core"
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
  "text": "Break the bonds holding matter together: 2D10 damage to a non-magical object, ignoring armor, +D10 per extra power level.",
  "source": "core"
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
  "text": "A great blast of fire for 2D8 that sets flammables alight; +D8 or another blast per extra power level. Dodge or parry as a ranged attack.",
  "source": "core"
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
  "text": "Summon a shield of stone that reduces an incoming attack's damage by 2D6, +D6 per extra power level. Cast after the hit roll but before damage; stacks with armor.",
  "source": "core"
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
  "text": "Raise a wall 1 m thick, 2 m high and 3 m wide; each extra power level adds another section. Anyone on the spot needs an Acrobatics roll (or takes 2D6 bludgeoning under a low ceiling).",
  "source": "core"
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
  "text": "A wave rises from a water source in range (the cone starts there), sweeping loose objects and creatures 2D6 m away and dealing the same bludgeoning damage; +1 die per extra power level.",
  "source": "core"
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
  "text": "A whirlwind around you hurls up-to-human-sized objects and creatures 2D4 m, dealing the same bludgeoning damage and knocking them prone. Each extra power level adds 4 m of range and D4 damage. Take a bane to place one person where you like and choose whether they're hurt or prone.",
  "source": "core"
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
  "text": "A bird of flame strikes for 2D10 and sets flammables alight; +D10 or another firebird per extra power level. Dodge or parry as a ranged attack.",
  "source": "core"
 },
 {
  "id": "firestorm",
  "powerLevels": true,
  "dodge": true,
  "parry": false,
  "name": "Firestorm",
  "school": "Elementalism",
  "rank": 3,
  "prerequisite": "Fire Blast",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "4 meters (sphere)",
  "duration": "Instant",
  "page": 40,
  "damage": {
   "base": "2D6",
   "perLevel": "D6"
  },
  "element": "fire",
  "source": "magic",
  "text": "A storm of fire whirls around you, dealing 2D6 to all targets in range; it can be dodged as a ranged attack. Each extra power level adds 4 m of range and D6 damage.",
  "updated": true,
  "corePage": 68
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
  "text": "Summon an earth elemental of grey-brown clay that obeys your commands (free action), acts on its own initiative and must stay in your sight. Counts as a monster.",
  "source": "core"
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
  "text": "Summon a fire elemental shaped like a burning lizard that obeys you (free action), acts on its own initiative and must stay in sight. Counts as a monster.",
  "source": "core"
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
  "text": "Summon a wind elemental like a bird-shaped storm cloud that obeys you (free action), acts on its own initiative and must stay in sight. Counts as a monster.",
  "source": "core"
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
  "text": "Summon a water elemental — a wave crested with a woman's shape — that obeys you (free action), acts on its own initiative and must stay in sight. Counts as a monster.",
  "source": "core"
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
  "text": "See and hear a place you can see or have visited as if you were there. Range ×10 per extra power level (10 km, 100 km). Not into other dimensions.",
  "source": "core"
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
  "text": "Float yourself or another up-to-human-sized person or object up to 6 m in any direction, then set it down gently or drop it. Each extra power level adds 2 m or one more target. A bane against the unwilling.",
  "source": "core"
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
  "text": "Double the target's Movement for the duration (yourself included); each extra power level adds another target.",
  "source": "core"
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
  "page": 69,
  "buff": {
   "unarmedDamage": "D6 per power level"
  },
  "text": "Your unarmed attacks deal +D6 damage per power level, and they count as magical attacks.",
  "magical": true,
  "source": "magic",
  "updated": true,
  "corePage": 70
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
  "text": "The target's skin turns hard and grey: armor rating 4, +2 per extra power level. With worn armor only the higher rating counts.",
  "source": "core"
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
  "text": "Name a kind of item, substance, creature or phenomenon and learn the direction to the nearest one in range. Range doubles per extra power level (200 m, 400 m).",
  "source": "core"
 },
 {
  "id": "enchant-weapon",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Enchant Weapon",
  "school": "Mentalism",
  "rank": 2,
  "prerequisite": "Longstrider or Power Fist or Stone Skin",
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
  "source": "magic",
  "text": "A weapon counts as magical, and rolls of 1–2 count as a Dragon when attacking or parrying with it (1–3 at power level 2, 1–4 at 3). Can't be used on unarmed attacks.",
  "updated": true,
  "corePage": 70
 },
 {
  "id": "mental-strike",
  "powerLevels": true,
  "dodge": true,
  "parry": false,
  "name": "Mental Strike",
  "school": "Mentalism",
  "rank": 2,
  "prerequisite": "Levitate or Power Fist",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Instant",
  "page": 71,
  "damage": {
   "base": "2D6",
   "perLevel": "D6"
  },
  "damageType": "bludgeoning",
  "source": "magic",
  "text": "A blow of pure will hurls the victim 2D6 m away and deals the same in bludgeoning damage; +D6 per extra power level. Dodge as a ranged attack. Large and Huge creatures take the damage but aren't moved.",
  "updated": true,
  "corePage": 70
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
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Concentration",
  "page": 71,
  "text": "Glimpse past events in the place you're standing — up to a day back at power level 1, a year at 2, centuries at 3. Visions are fragmentary; the GM decides what you see.",
  "source": "magic",
  "updated": true,
  "corePage": 70
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
  "page": 71,
  "text": "Read another person's surface thoughts, or send them your own. Reaching deeper memories takes power level 2 if they are up to a week old, power level 3 if older.",
  "source": "magic",
  "updated": true,
  "corePage": 70
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
  "text": "Opposed roll against the victim's WIL (NPCs: max WP −2 per Focused, or 10) — bane at power level 1, normal at 2, boon at 3. If you win, the victim immediately moves and takes an action of your choice (nothing costing WP) and loses their next turn. No effect on monsters.",
  "source": "core"
 },
 {
  "id": "flight",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Flight",
  "school": "Mentalism",
  "rank": 3,
  "prerequisite": "Mental Strike",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "Touch",
  "duration": "Stretch",
  "page": 71,
  "self": true,
  "source": "magic",
  "text": "You or another up-to-human-sized creature can fly freely, ignoring obstacles and terrain, at Movement 6 — 12 at power level 2, 24 at 3.",
  "updated": true,
  "corePage": 71
 },
 {
  "id": "teleport",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Teleport",
  "school": "Mentalism",
  "rank": 3,
  "prerequisite": "Divination",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "Touch",
  "duration": "Instant",
  "page": 72,
  "source": "magic",
  "text": "Teleport yourself up to 100 m to a place you can see or have visited. Each extra power level lets you bring another willing human-sized creature you touch, or doubles the range. Not between dimensions.",
  "updated": true,
  "corePage": 71
 },
 {
  "id": "alarm",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Alarm",
  "school": "General",
  "rank": 1,
  "prerequisite": "Any school of magic",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "Touch",
  "duration": "Shift",
  "page": 8,
  "text": "Place an invisible rune on a single non-organic object (door, floor tile, urn…) and set a trigger such as opening, stepping on or touching it. When it triggers you know at once, wherever you are. Lasts a shift, a week at power level 2, a year at 3.",
  "durationByLevel": [
   "Shift",
   "Week",
   "Year"
  ],
  "source": "magic"
 },
 {
  "id": "familiar",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Familiar",
  "school": "General",
  "rank": 2,
  "prerequisite": "Alarm or Protector",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "the animal",
  "castingTime": "stretch",
  "range": "Touch",
  "duration": "Shift",
  "page": 9,
  "text": "Bind a willing spirit of the dead into the fresh corpse of a small vertebrate (mouse- to cat/raven/dog-sized). It keeps the animal's stats, has no WP of its own, obeys you, talks with you telepathically at any range and acts on your turn (before or after you). Lasts a shift, a week at power level 2, the rest of your life at 3. One familiar at a time; you may dismiss it to dust. If it is killed (not dismissed) your max WP drops by 1. Immune to Dispel; Counter Ritual drives the spirit out (as if killed). It gets two abilities from the familiar list — one may be swapped for a school ability of a school you have.",
  "durationByLevel": [
   "Shift",
   "Week",
   "Rest of your life"
  ],
  "familiar": true,
  "source": "magic"
 },
 {
  "id": "magic-ward",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Magic Ward",
  "school": "General",
  "rank": 3,
  "prerequisite": "Magic Shield",
  "requirements": [
   "gesture"
  ],
  "castingTime": "reaction",
  "range": "10 meters",
  "duration": "Instant",
  "page": 11,
  "text": "A brief field of force around you or another creature cuts an incoming attack's damage by 2D4, plus D4 for each further power level. Cast once you know the attack hits, before damage is rolled. Stacks with armor.",
  "self": true,
  "damageReduction": {
   "base": "2D4",
   "perLevel": "D4"
  },
  "source": "magic"
 },
 {
  "id": "greater-familiar",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Greater Familiar",
  "school": "General",
  "rank": 4,
  "prerequisite": "Transfer",
  "requirements": [
   "word",
   "ingredient"
  ],
  "requirementDetail": "the animal",
  "castingTime": "shift",
  "range": "Touch",
  "duration": "Shift",
  "page": 12,
  "text": "As Familiar, but the spirit goes into a larger, stronger animal (Rulebook p.99), or moves an existing familiar's spirit into one. Lasts a shift, a week at power level 2, the rest of your life at 3. A greater familiar has four familiar abilities (one may be your school's ability); an upgraded familiar keeps its two and gains two more.",
  "durationByLevel": [
   "Shift",
   "Week",
   "Rest of your life"
  ],
  "familiar": true,
  "source": "magic"
 },
 {
  "id": "counter-ritual",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Counter Ritual",
  "school": "General",
  "rank": 5,
  "prerequisite": "Magic Seal or any rank 4 Enchanting spell",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "shift",
  "range": "4 meters",
  "duration": "Instant",
  "page": 12,
  "text": "Undo a powerful ritual such as Rejuvenation, Nexus or Permanence; power level must equal the ritual's. Costs 1 max WP per power level permanently (1 even on failure). A Counter Ritual can't be dispelled or reversed by another Counter Ritual. The GM or adventure may allow it to break other strong rituals and curses.",
  "permanentWpLoss": "Max WP −1 per power level permanently; −1 even if the ritual fails.",
  "source": "magic"
 },
 {
  "id": "nexus",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Nexus",
  "school": "General",
  "rank": 5,
  "prerequisite": "Charge",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "shift",
  "range": "Touch",
  "duration": "Permanent",
  "page": 13,
  "text": "Only on an object already holding a Magic Seal with Permanence (all can be done in one shift, each rolled and paid separately). Opens a tiny portal to Chaos that powers the sealed spell: it activates any number of times at no WP cost and with no roll. Power level must equal the Magic Seal's and Permanence's. Costs 1 max WP per power level permanently (1 even on failure). Can't be dispelled; Counter Ritual undoes it.",
  "permanentWpLoss": "Max WP −1 per power level permanently; −1 even if the ritual fails.",
  "source": "magic"
 },
 {
  "id": "rejuvenation",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Rejuvenation",
  "school": "General",
  "rank": 5,
  "prerequisite": "Charge",
  "requirements": [
   "word",
   "gesture",
   "focus"
  ],
  "castingTime": "shift",
  "range": "Personal",
  "duration": "Permanent",
  "page": 13,
  "text": "Make your body younger. Power level 1 restarts your ageing within your current age category; 2 moves you one category younger (old→adult, adult→young); 3 takes you from old to young. Attributes (and so max HP/WP) change to match; skills don't. Impossible if already young. Costs 1 max WP per power level permanently (1 even on failure). On a demon, no mishap roll: you age one category instead, or die outright if already old. Can't be dispelled; a Counter Ritual undoes it and kills a mage who is old despite the rejuvenation.",
  "permanentWpLoss": "Max WP −1 per power level permanently; −1 even if the ritual fails.",
  "source": "magic"
 },
 {
  "id": "cure",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Cure",
  "school": "Animism",
  "rank": 1,
  "prerequisite": "Animism",
  "requirements": [
   "word"
  ],
  "castingTime": "action",
  "range": "Touch",
  "duration": "Instant",
  "page": 19,
  "text": "End a natural disease or poison (Rulebook p.52–53) affecting you or another living creature at once. Magical diseases may need power level 2 or 3, and some can't be cured at all.",
  "self": true,
  "source": "magic"
 },
 {
  "id": "nourish",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Nourish",
  "school": "Animism",
  "rank": 1,
  "prerequisite": "Animism",
  "requirements": [
   "gesture"
  ],
  "castingTime": "stretch",
  "range": "Personal",
  "duration": "Instant",
  "page": 20,
  "text": "Grow fine roots from your hands and feet into the ground for a stretch; it covers your food and water needs for a full day. Power level needed depends on terrain: 1 in forest or fertile wilds, 2 in settlements or vegetated mountains, 3 in barren mountains or caves.",
  "source": "magic"
 },
 {
  "id": "calm-animal",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Calm Animal",
  "school": "Animism",
  "rank": 2,
  "prerequisite": "Animal Whisperer",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Instant",
  "page": 20,
  "text": "Pacify common mammals or birds, as many as the power level. Ends at once if they're attacked. No effect on monsters.",
  "source": "magic"
 },
 {
  "id": "recovery",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Recovery",
  "school": "Animism",
  "rank": 2,
  "prerequisite": "Cure",
  "requirements": [
   "word"
  ],
  "castingTime": "action",
  "range": "Touch",
  "duration": "Instant",
  "page": 21,
  "text": "Instantly clear conditions from yourself or another living being — one of your choice per power level.",
  "self": true,
  "removesConditions": "1 per power level",
  "source": "magic"
 },
 {
  "id": "reinvigorate",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Reinvigorate",
  "school": "Animism",
  "rank": 2,
  "prerequisite": "Nourish",
  "requirements": [
   "word"
  ],
  "castingTime": "stretch",
  "range": "Personal",
  "duration": "Instant",
  "page": 21,
  "text": "As Nourish (a stretch rooted in the ground, covering food and water for a day), and you are also healed of all conditions. Power level by terrain: 1 forest or fertile wilds, 2 settlements or vegetated mountains, 3 barren mountains or caves.",
  "removesConditions": "all",
  "source": "magic"
 },
 {
  "id": "command-animal",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Command Animal",
  "school": "Animism",
  "rank": 3,
  "prerequisite": "Calm Animal",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "stretch",
  "range": "20 meters",
  "duration": "Concentration",
  "page": 21,
  "text": "Control mammals or birds (familiar table p.10, Rulebook p.99), as many as the power level, while you concentrate. Telepathic orders at any range: track, carry messages, attack and so on. In combat they act on your turn, each moving and taking one action. No effect on monsters.",
  "source": "magic"
 },
 {
  "id": "daze",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Daze",
  "school": "Animism",
  "rank": 3,
  "prerequisite": "Sleep",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Instant",
  "page": 21,
  "text": "Up to your WIL base chance in targets within range roll WIL — with a boon at power level 1, normally at 2, with a bane at 3. Everyone who fails becomes Dazed. No effect on monsters.",
  "resistRoll": "WIL",
  "maxTargets": "WIL base chance",
  "source": "magic"
 },
 {
  "id": "exhaust",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Exhaust",
  "school": "Animism",
  "rank": 3,
  "prerequisite": "Sleep",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Instant",
  "page": 21,
  "text": "Up to your WIL base chance in targets within range roll WIL — with a boon at power level 1, normally at 2, with a bane at 3. Everyone who fails becomes Exhausted. No effect on monsters.",
  "resistRoll": "WIL",
  "maxTargets": "WIL base chance",
  "source": "magic"
 },
 {
  "id": "mass-purge",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Mass Purge",
  "school": "Animism",
  "rank": 3,
  "prerequisite": "Purge",
  "requirements": [
   "word",
   "gesture",
   "focus"
  ],
  "requirementDetail": "sacred symbol",
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Instant",
  "page": 22,
  "text": "Exorcise demons or undead in range, up to your WIL base chance in number: each takes 2D6 (rolled separately). Armor and natural armor don't help; can't be dodged or parried. Each extra power level adds either D6 damage or 10 m of range.",
  "damage": {
   "base": "2D6",
   "perLevel": "D6"
  },
  "target": "Demons and undead only",
  "ignoresArmor": true,
  "maxTargets": "WIL base chance",
  "source": "magic"
 },
 {
  "id": "thorn-field",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Thorn Field",
  "school": "Animism",
  "rank": 3,
  "prerequisite": "Engulfing Forest",
  "requirements": [
   "word",
   "gesture",
   "ingredient"
  ],
  "requirementDetail": "a handful of seeds",
  "castingTime": "action",
  "range": "10 meters (sphere)",
  "duration": "Shift",
  "page": 22,
  "text": "Scattered seeds root instantly, even on stone: the area becomes rough terrain and everyone in it but you (not monsters) is ensnared by thorns, can't move, and takes D8 piercing at the start of each turn. Breaking free: EVADE with a boon at power level 1, normal at 2, bane at 3; an action, one try per round; those not ensnared can help.",
  "damage": {
   "perTurn": "D8",
   "type": "piercing"
  },
  "source": "magic"
 },
 {
  "id": "animalistic-influence",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Animalistic Influence",
  "school": "Animism",
  "rank": 4,
  "prerequisite": "Command Animal",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "stretch",
  "range": "50 meters",
  "duration": "Shift",
  "page": 23,
  "text": "Fill an intelligent living creature with an animal's emotions (a boar's rage, a cat's sloth, a sparrow's skittishness); the GM decides how it behaves. Power level 2 affects up to your WIL base chance in creatures, 3 up to five times that. Targets still defend themselves if attacked. Not on monsters or undead.",
  "source": "magic"
 },
 {
  "id": "healing-radiance",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Healing Radiance",
  "school": "Animism",
  "rank": 4,
  "prerequisite": "Restoration",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Instant",
  "page": 23,
  "text": "Every ally within range heals 2D6 HP, +D6 per extra power level. Doesn't heal you.",
  "healing": {
   "base": "2D6",
   "perLevel": "D6"
  },
  "area": "all allies in range, not you",
  "source": "magic"
 },
 {
  "id": "weather-mastery",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Weather Mastery",
  "school": "Animism",
  "rank": 4,
  "prerequisite": "Thunderbolt",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "100 meters",
  "duration": "Shift",
  "page": 23,
  "text": "Change the weather around you. A minor shift (cloudy to rain, calm to breeze) is power level 1; unusual but seasonal weather (winter blizzard, summer heat, autumn storm) is 2; wholly unnatural weather (desert blizzard, midwinter heatwave) is 3.",
  "source": "magic"
 },
 {
  "id": "healing-aura",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Healing Aura",
  "school": "Animism",
  "rank": 5,
  "prerequisite": "Healing Radiance",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Instant",
  "page": 23,
  "text": "Every ally in range heals 2D8 HP and one non-permanent severe injury (optional rule, Rulebook p.51). Each extra power level adds either 10 m of range or D8 HP. Doesn't heal you.",
  "healing": {
   "base": "2D8",
   "perLevel": "D8"
  },
  "area": "all allies in range, not you",
  "source": "magic"
 },
 {
  "id": "abyssal-stench",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Abyssal Stench",
  "school": "Demonology",
  "rank": 1,
  "prerequisite": "Demonology",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "Personal",
  "duration": "Round",
  "page": 29,
  "text": "Your body exudes the stench of Chaos. Until your next turn, anyone making a melee attack on you must first pass a CON roll (not an action) — boon at power level 1, normal at 2, bane at 3. On a failure the attack is cancelled and their action is lost. No effect on demons, undead or monsters.",
  "resistRoll": "CON",
  "target": "Not demons, undead or monsters",
  "source": "magic"
 },
 {
  "id": "carbuncle",
  "powerLevels": true,
  "dodge": true,
  "parry": false,
  "name": "Carbuncle",
  "school": "Demonology",
  "rank": 1,
  "prerequisite": "Demonology",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Instant",
  "page": 29,
  "text": "A winged demon louse homes in on a foe and burrows in: D4 damage at once, then a bigger die each turn (D6, D8, D10) until it bursts — after the 2nd damage roll at power level 1, the 3rd at 2, the 4th at 3. Dodgeable like a ranged attack; armor doesn't help; keeps going if you're incapacitated. No effect on demons or undead.",
  "ignoresArmor": true,
  "target": "Not demons or undead",
  "damage": {
   "base": "D4",
   "escalating": [
    "D6",
    "D8",
    "D10"
   ],
   "burstsAfter": {
    "1": 2,
    "2": 3,
    "3": 4
   }
  },
  "source": "magic"
 },
 {
  "id": "chaos-swamp",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Chaos Swamp",
  "school": "Demonology",
  "rank": 1,
  "prerequisite": "Demonology",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "stretch",
  "range": "10 meters",
  "duration": "Shift",
  "page": 29,
  "text": "Taint the ground in a 10 m radius (you may leave a camp-sized safe zone in the middle): it turns hot, boggy and full of stinging fumes. Radius doubles per extra power level. Wild animals and beasts shun it; NPCs move at half speed; living creatures, monsters included, take D4 damage each turn they start in it. Flyers are unaffected.",
  "damage": {
   "perTurn": "D4"
  },
  "source": "magic"
 },
 {
  "id": "demonic-gust",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Demonic Gust",
  "school": "Demonology",
  "rank": 1,
  "prerequisite": "Demonology",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "10 meters (cone)",
  "duration": "Instant",
  "page": 30,
  "text": "A reeking blast of Chaos wind: every opponent in the cone must resist fear with a WIL roll (Rulebook p.53) — boon at power level 1, normal at 2, bane at 3.",
  "resistRoll": "WIL",
  "fear": true,
  "source": "magic"
 },
 {
  "id": "beetle-boil",
  "powerLevels": true,
  "dodge": true,
  "parry": false,
  "name": "Beetle Boil",
  "school": "Demonology",
  "rank": 2,
  "prerequisite": "Carbuncle",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Instant",
  "page": 30,
  "text": "A spawn-laden demon beetle homes in and bites in: D6 damage at once, then a bigger die each turn (D8, D10, D12) until the spawn die — after the 2nd damage roll at power level 1, the 3rd at 2, the 4th at 3. Dodgeable like a ranged attack; armor doesn't help; continues if you're incapacitated. No effect on demons or undead.",
  "ignoresArmor": true,
  "target": "Not demons or undead",
  "damage": {
   "base": "D6",
   "escalating": [
    "D8",
    "D10",
    "D12"
   ],
   "burstsAfter": {
    "1": 2,
    "2": 3,
    "3": 4
   }
  },
  "source": "magic"
 },
 {
  "id": "bloodlust",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Bloodlust",
  "school": "Demonology",
  "rank": 2,
  "prerequisite": "Demonic Gust",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "Touch",
  "duration": "Shift",
  "page": 30,
  "text": "Let a demon spirit into your mind or a willing target's. The target immediately rolls WIL or becomes Sickly. For the duration (one shift per power level) they get a boon on melee attacks and on WIL rolls against fear, but can't dodge or parry.",
  "self": true,
  "durationByLevel": [
   "Shift",
   "2 shifts",
   "3 shifts"
  ],
  "resistRoll": "WIL",
  "buff": {
   "boonMeleeAttacks": true,
   "boonFearResist": true,
   "noDodgeParry": true
  },
  "source": "magic"
 },
 {
  "id": "chaos-mire",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Chaos Mire",
  "school": "Demonology",
  "rank": 2,
  "prerequisite": "Chaos Swamp",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "30 meters",
  "duration": "Stretch",
  "page": 30,
  "text": "Turn the ground under one foe per power level into a 2×2 m patch of boiling chaos mire: they sink knee-deep and take D6 at the start of each later turn they stay in it, armor doesn't help. Escaping takes an action and an EVADE roll; others can help. No effect on Large or Huge creatures or immaterial beings such as ghosts; creatures immune to fire or heat take no damage.",
  "damage": {
   "perTurn": "D6"
  },
  "ignoresArmor": true,
  "extraTargetPerLevel": true,
  "source": "magic"
 },
 {
  "id": "demon-face",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Demon Face",
  "school": "Demonology",
  "rank": 2,
  "prerequisite": "Abyssal Stench",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "Personal",
  "duration": "Round",
  "page": 31,
  "text": "Your face becomes a stinking demon's. Until the start of your next turn, anyone making a melee attack on you must pass a WIL roll — boon at power level 1, normal at 2, bane at 3. On a failure the attack is cancelled and they roll on the Fear table (Rulebook p.53). No effect on demons, undead or monsters.",
  "resistRoll": "WIL",
  "target": "Not demons, undead or monsters",
  "source": "magic"
 },
 {
  "id": "beetle-swarm",
  "powerLevels": true,
  "dodge": true,
  "parry": true,
  "name": "Beetle Swarm",
  "school": "Demonology",
  "rank": 3,
  "prerequisite": "Beetle Boil",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "20 meters (sphere)",
  "duration": "Instant",
  "page": 31,
  "text": "A flesh-eating beetle swarm hits up to four targets in range, in the order you choose: 2D10, 2D8, 2D6, 2D4. Armor doesn't help. Can be dodged or parried as a ranged attack, which stops it moving on; victims get a boon to that at power level 1, roll normally at 2, a bane at 3. No effect on demons or undead.",
  "ignoresArmor": true,
  "target": "Not demons or undead",
  "damage": {
   "chain": [
    "2D10",
    "2D8",
    "2D6",
    "2D4"
   ]
  },
  "source": "magic"
 },
 {
  "id": "dimensional-slip",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Dimensional Slip",
  "school": "Demonology",
  "rank": 3,
  "prerequisite": "Demon Face",
  "requirements": [
   "gesture"
  ],
  "castingTime": "reaction",
  "range": "Personal",
  "duration": "Instant",
  "page": 31,
  "text": "When an attack hits you, before damage, slip briefly into Chaos: on a success you avoid all its damage and effects. Success or not, you may then move 2 m (+2 m per extra power level) without provoking a free attack.",
  "source": "magic"
 },
 {
  "id": "gutworm",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Gutworm",
  "school": "Demonology",
  "rank": 3,
  "prerequisite": "Beetle Boil",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Instant",
  "page": 31,
  "text": "Opposed roll against the victim's WIL. If you win, a demon worm appears in their gut: D8 damage at once, then D8 each turn for as many rounds as the power level. Armor doesn't help; continues even if you or the victim are incapacitated. No effect on demons or undead.",
  "opposed": "WIL",
  "ignoresArmor": true,
  "target": "Not demons or undead",
  "damage": {
   "base": "D8",
   "perTurn": "D8",
   "turns": "power level"
  },
  "source": "magic"
 },
 {
  "id": "rage",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Rage",
  "school": "Demonology",
  "rank": 3,
  "prerequisite": "Bloodlust",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "Touch",
  "duration": "Stretch",
  "page": 32,
  "text": "A rage demon possesses you or a willing target, who becomes Angry. For the duration they can't dodge or parry but get an extra action each turn usable only to attack. At power level 2 also a boon to resist fear; at 3 also a boon to resist mind-affecting magic. When it ends, roll CON or become Sickly.",
  "self": true,
  "buff": {
   "conditions": [
    "Angry"
   ],
   "noDodgeParry": true,
   "bonusAttackAction": true,
   "boonFearResistAt": 2,
   "boonVsMindMagicAt": 3
  },
  "source": "magic"
 },
 {
  "id": "demonic-exile",
  "powerLevels": true,
  "dodge": true,
  "parry": true,
  "name": "Demonic Exile",
  "school": "Demonology",
  "rank": 4,
  "prerequisite": "Dimensional Slip",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "Touch",
  "duration": "Round",
  "page": 32,
  "text": "Opposed roll against the target's WIL — they roll with a boon at power level 1, normally at 2, with a bane at 3. If you win they vanish into a demon realm and return on your turn next round, scorched and stinking, having taken 2D10 damage (armor doesn't help). Can be dodged or parried. Not usable on Large or Huge monsters.",
  "opposed": "WIL",
  "ignoresArmor": true,
  "damage": {
   "base": "2D10"
  },
  "target": "Not Large or Huge monsters",
  "source": "magic"
 },
 {
  "id": "summon-champion",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Summon Champion",
  "school": "Demonology",
  "rank": 4,
  "prerequisite": "Gutworm",
  "requirements": [
   "word",
   "gesture",
   "focus"
  ],
  "requirementDetail": "ritual circle",
  "castingTime": "stretch",
  "range": "4 meters",
  "duration": "Stretch",
  "page": 32,
  "text": "Draw a ritual circle on sand, earth or stone; on success a demon from the Rulebook or Bestiary appears and fights for you for a stretch at no price. It follows you and attacks targets you point out, but you can't direct its attacks (GM uses its monster attack table). When the spell ends, send it home with a DEMONOLOGY roll (an action, no WP) — bane at power level 1, normal at 2, boon at 3. On a failure it breaks free: D6 1–3 it attacks you and your allies at once; 4–6 it laughs and leaves to wreak havoc nearby unless you attack it immediately. Guardian demons always return obediently.",
  "summon": "Demonic Champion",
  "source": "magic"
 },
 {
  "id": "summon-guardians",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Summon Guardians",
  "school": "Demonology",
  "rank": 4,
  "prerequisite": "Gutworm",
  "requirements": [
   "word",
   "gesture",
   "focus"
  ],
  "requirementDetail": "ritual circle",
  "castingTime": "shift",
  "range": "4 meters",
  "duration": "Shift",
  "page": 33,
  "text": "Summon guardian demons (stats p.32), twice the power level in number, to guard a place or building up to 50 m across. They can't leave it and attack anyone but you approaching from outside.",
  "summon": "Guardian Demon",
  "summonCount": "2 × power level",
  "source": "magic"
 },
 {
  "id": "bind-champion",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Bind Champion",
  "school": "Demonology",
  "rank": 5,
  "prerequisite": "Summon Champion",
  "requirements": [
   "word",
   "gesture",
   "focus"
  ],
  "requirementDetail": "ritual circle",
  "castingTime": "shift",
  "range": "4 meters",
  "duration": "One day per power level",
  "page": 33,
  "text": "Like Summon Champion, but longer. On success the demon appears and bargains: it will serve and go home on command for a price the GM sets from the rank 3 demonic pact examples (p.27). You may use BARTERING to lower it, then accept or refuse (it leaves sneering). If accepted it serves for days equal to the power level, answering questions as best it can and attacking targets you name (GM uses its monster attack table). You then usually have until the next new or full moon to pay; it returns briefly to collect physical payment, and may return to take its due in flesh and blood if you don't pay. See Renegotiation.",
  "summon": "Demonic Champion",
  "source": "magic"
 },
 {
  "id": "dimensional-travel",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Dimensional Travel",
  "school": "Demonology",
  "rank": 5,
  "prerequisite": "Demonic Exile",
  "requirements": [
   "word",
   "gesture",
   "focus"
  ],
  "requirementDetail": "ritual circle",
  "castingTime": "stretch",
  "range": "Personal",
  "duration": "Instant",
  "page": 33,
  "text": "Travel yourself to Chaos or other worlds; what you find is up to the GM or adventure. At power level 2 bring one willing living creature up to human size; at 3 up to a dozen. Getting home needs another casting.",
  "source": "magic"
 },
 {
  "id": "firebomb",
  "powerLevels": true,
  "dodge": true,
  "parry": false,
  "name": "Firebomb",
  "school": "Elementalism",
  "rank": 4,
  "prerequisite": "Firebird or Firestorm",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "40 meters",
  "duration": "Instant",
  "page": 42,
  "dodgeBane": true,
  "damage": {
   "base": "2D8",
   "perLevel": "D8"
  },
  "element": "fire",
  "source": "magic",
  "text": "Throw a blazing sphere at a point in range; it explodes, dealing 2D8 fire damage to everyone within 4 m. Can be dodged as a ranged attack, with a bane. Each extra power level adds D8 damage and 4 m of blast radius."
 },
 {
  "id": "hailstorm",
  "powerLevels": true,
  "dodge": true,
  "parry": false,
  "name": "Hailstorm",
  "school": "Elementalism",
  "rank": 4,
  "prerequisite": "Sylph",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Instant",
  "page": 42,
  "dodgeBane": true,
  "damage": {
   "base": "2D10",
   "perLevel": "D10"
  },
  "damageType": "piercing",
  "extraTargetPerLevel": true,
  "source": "magic",
  "text": "An icy gale of razor-sharp shards hits one target for 2D10 piercing damage and makes them cold (Rulebook p.54). Leather armor worn by the target loses 1 armor rating. Can be dodged as a ranged attack, with a bane. Each extra power level adds D10 or another hailstorm at a second target in range."
 },
 {
  "id": "rock-tornado",
  "powerLevels": true,
  "dodge": true,
  "parry": false,
  "name": "Rock Tornado",
  "school": "Elementalism",
  "rank": 4,
  "prerequisite": "Gnome",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "4 meters (sphere)",
  "duration": "Instant",
  "page": 42,
  "dodgeBane": true,
  "damage": {
   "base": "2D8",
   "perLevel": "D8"
  },
  "damageType": "bludgeoning",
  "source": "magic",
  "text": "A vortex of sharp rock spins around you, dealing 2D8 bludgeoning damage to all targets in range. Can be dodged as a ranged attack, with a bane. Each extra power level adds 4 m of range and D8 damage."
 },
 {
  "id": "scalding-shower",
  "powerLevels": true,
  "dodge": true,
  "parry": false,
  "name": "Scalding Shower",
  "school": "Elementalism",
  "rank": 4,
  "prerequisite": "Undine",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Instant",
  "page": 42,
  "dodgeBane": true,
  "damage": {
   "base": "2D10",
   "perLevel": "D10",
   "splash": {
    "base": "2D4",
    "perLevel": "D4",
    "radius": "2 meters"
   }
  },
  "ignoresArmor": true,
  "source": "magic",
  "text": "A ball of boiling water drops on a target: 2D10 damage to the target and 2D4 to everyone within 2 m of it. Armor doesn't help, but it can be dodged with a bane. Each extra power level adds D10 to the target and D4 to those nearby."
 },
 {
  "id": "conjure",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Conjure",
  "school": "Elementalism",
  "rank": 5,
  "prerequisite": "Firebomb, Hailstorm, Scalding Shower or Rock Tornado",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "stretch",
  "range": "Touch",
  "duration": "Shift",
  "page": 43,
  "source": "magic",
  "text": "Create a generic inanimate object from nothing: power level 1 — a Common item (Rulebook ch.6) of weight 1 or less; 2 — an Uncommon item or one up to weight 4; 3 — a Rare item or something as big as a cart, rowboat or small hut. The GM may allow unlisted items, but nothing specific (e.g. no key to a particular lock). The object crumbles to dust after a shift unless combined with Permanence."
 },
 {
  "id": "elemental-path",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Elemental Path",
  "school": "Elementalism",
  "rank": 5,
  "prerequisite": "Firebomb, Hailstorm, Scalding Shower or Rock Tornado",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "Personal",
  "duration": "Stretch",
  "page": 43,
  "self": true,
  "source": "magic",
  "text": "Natural elements can't hurt you and magical elemental damage is halved (after armor, round up). You pass at full speed through lava, soil, rock, open air (floating) and water (breathing not needed) — though not ore-laden ground or solid bedrock. Each power level above 1 adds a stretch."
 },
 {
  "id": "meteor-swarm",
  "powerLevels": true,
  "dodge": true,
  "parry": false,
  "name": "Meteor Swarm",
  "school": "Elementalism",
  "rank": 5,
  "prerequisite": "Firebomb or Rock Tornado",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "100 meters",
  "duration": "Instant",
  "page": 43,
  "dodgeBane": true,
  "damage": {
   "base": "2D10",
   "perLevel": "D10"
  },
  "element": "fire",
  "source": "magic",
  "text": "Burning meteors rain down on a point in range: everyone within 6 m takes 2D10 fire damage. Can be dodged as a ranged attack, with a bane. Each extra power level adds D10 damage and 4 m of blast radius."
 },
 {
  "id": "inspire",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Inspire",
  "school": "Harmonism",
  "rank": 1,
  "prerequisite": "Skill level 12 in Performance",
  "requirements": [
   "melody"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Concentration",
  "page": 49,
  "buff": {
   "allies": "boon on all skill rolls"
  },
  "source": "magic",
  "text": "All allies within range get a boon on all skill rolls while you keep concentrating. Each power level after the first doubles the range. You can't inspire yourself."
 },
 {
  "id": "mend",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Mend",
  "school": "Harmonism",
  "rank": 1,
  "prerequisite": "Skill level 12 in Performance",
  "requirements": [
   "melody"
  ],
  "castingTime": "stretch",
  "range": "2 meters",
  "duration": "Permanent",
  "page": 49,
  "source": "magic",
  "text": "Restore a damaged, warped or broken object to a shape it once had. Power level 1: up to weight 1; 2: up to weight 4; 3: something as large as a cart, rowboat or small hut."
 },
 {
  "id": "protective-harmonies",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Protective Harmonies",
  "school": "Harmonism",
  "rank": 1,
  "prerequisite": "Skill level 12 in Performance",
  "requirements": [
   "melody"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Concentration",
  "page": 49,
  "self": true,
  "buff": {
   "damageReduction": "D6 per power level, before armor"
  },
  "source": "magic",
  "text": "Ward yourself or an ally in range: incoming attacks deal D6 less damage per power level, applied before armor. If you take damage anyway, your concentration breaks."
 },
 {
  "id": "serenity",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Serenity",
  "school": "Harmonism",
  "rank": 1,
  "prerequisite": "Skill level 12 in Performance",
  "requirements": [
   "melody"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Concentration",
  "page": 49,
  "resist": {
   "roll": "WIL",
   "opposed": true,
   "byLevel": [
    "boon",
    "normal",
    "bane"
   ]
  },
  "noEffectOn": [
   "monsters",
   "undead"
  ],
  "source": "magic",
  "text": "Calm another living creature: opposed roll vs its WIL (target has a boon at power level 1, normal at 2, bane at 3). If you win, it stops to listen while you concentrate, or until it is attacked or harmed in any way. No effect on monsters or undead."
 },
 {
  "id": "tune-mood",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Tune Mood",
  "school": "Harmonism",
  "rank": 1,
  "prerequisite": "Skill level 12 in Performance",
  "requirements": [
   "melody"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Stretch",
  "page": 49,
  "rangeByLevel": [
   "10 meters",
   "20 meters",
   "40 meters"
  ],
  "source": "magic",
  "text": "Set the mood (happy, sad, angry, afraid…) of all listeners in range except yourself for a stretch. BLUFFING or PERSUASION rolls to manipulate them in line with that mood get a boon. Range 20 m at power level 2, 40 m at 3."
 },
 {
  "id": "doubt",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Doubt",
  "school": "Harmonism",
  "rank": 2,
  "prerequisite": "Serenity",
  "requirements": [
   "melody"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Concentration",
  "page": 50,
  "resist": {
   "roll": "WIL",
   "opposed": false,
   "byLevel": [
    "boon",
    "normal",
    "bane"
   ]
  },
  "noEffectOn": [
   "monsters",
   "undead"
  ],
  "source": "magic",
  "text": "Every opponent in range makes a WIL roll, not an action (boon at power level 1, normal at 2, bane at 3). On a failure they have a bane on all skill rolls until your turn next round, when they may roll WIL again to shake it off, and so on. Ends if your concentration breaks. No effect on monsters or undead."
 },
 {
  "id": "elude-senses",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Elude Senses",
  "school": "Harmonism",
  "rank": 2,
  "prerequisite": "Protective Harmonies",
  "requirements": [
   "melody"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Concentration",
  "page": 50,
  "self": true,
  "source": "magic",
  "text": "Enemies in range can't see, hear or smell you, even with AWARENESS. Power level 1 affects living non-monsters, 2 also undead, 3 also monsters. A creature that touches you perceives you and the effect ends for it."
 },
 {
  "id": "encourage",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Encourage",
  "school": "Harmonism",
  "rank": 2,
  "prerequisite": "Inspire",
  "requirements": [
   "melody"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Concentration",
  "page": 50,
  "buff": {
   "allies": "boon on all skill rolls; immune to fear attacks"
  },
  "source": "magic",
  "text": "All allies in range get a boon on all skill rolls and are immune to fear attacks (Rulebook p.52) while you concentrate. Each power level after the first doubles the range. You can't encourage yourself."
 },
 {
  "id": "frenzy",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Frenzy",
  "school": "Harmonism",
  "rank": 2,
  "prerequisite": "Tune Mood",
  "requirements": [
   "melody"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Concentration",
  "page": 50,
  "resist": {
   "roll": "WIL",
   "opposed": true,
   "byLevel": [
    "boon",
    "normal",
    "bane"
   ]
  },
  "noEffectOn": [
   "monsters",
   "undead"
  ],
  "source": "magic",
  "text": "Drive a person berserk: opposed roll vs their WIL (target has a boon at power level 1, normal at 2, bane at 3). On a success they spend their next turn rushing the nearest person or creature (GM or random roll if unclear) and attacking in melee, and can't wait while the effect lasts (as long as you concentrate). Monsters and undead are immune."
 },
 {
  "id": "paralyze",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Paralyze",
  "school": "Harmonism",
  "rank": 2,
  "prerequisite": "Mend",
  "requirements": [
   "melody"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Concentration",
  "page": 51,
  "resist": {
   "roll": "WIL",
   "opposed": true,
   "byLevel": [
    "boon",
    "normal",
    "bane"
   ]
  },
  "noEffectOn": [
   "monsters",
   "undead"
  ],
  "source": "magic",
  "text": "Hypnotize a person: opposed roll vs their WIL (target has a boon at power level 1, normal at 2, bane at 3). If you win they can't move or act except for reactions while you concentrate. No effect on monsters or undead."
 },
 {
  "id": "cacophony",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Cacophony",
  "school": "Harmonism",
  "rank": 3,
  "prerequisite": "Paralyze",
  "requirements": [
   "melody"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Concentration",
  "page": 51,
  "rangeByLevel": [
   "10 meters",
   "20 meters",
   "40 meters"
  ],
  "resist": {
   "roll": "WIL",
   "opposed": false
  },
  "conditions": [
   "Dazed"
  ],
  "noEffectOn": [
   "monsters",
   "undead"
  ],
  "source": "magic",
  "text": "Grating noise leaves every foe in range Dazed; each rolls WIL (no action). On a failure they use their next turn to run until out of range, can't come back in and can't wait to put it off. Concentration; victims re-roll WIL each turn to shake it. Range rises to 20 m at power level 2 and 40 m at 3. No effect on monsters or undead."
 },
 {
  "id": "dance",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Dance",
  "school": "Harmonism",
  "rank": 3,
  "prerequisite": "Frenzy",
  "requirements": [
   "melody"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Concentration",
  "page": 51,
  "resist": {
   "roll": "WIL",
   "opposed": true,
   "byLevel": [
    "boon",
    "normal",
    "bane"
   ]
  },
  "noEffectOn": [
   "monsters",
   "undead"
  ],
  "source": "magic",
  "text": "Make a target dance wildly: opposed roll vs their WIL (target has a boon at power level 1, normal at 2, bane at 3). If you win they can take no actions or reactions and you control their movement — even off a cliff or into deep water — while you concentrate or until they take damage from an attack. No effect on monsters or undead."
 },
 {
  "id": "placate-nature",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Placate Nature",
  "school": "Harmonism",
  "rank": 3,
  "prerequisite": "Elude Senses",
  "requirements": [
   "melody"
  ],
  "castingTime": "action",
  "range": "Personal",
  "duration": "Concentration",
  "page": 51,
  "self": true,
  "source": "magic",
  "text": "While you play, natural forces can't harm or hinder you: immune to fire and cold, walk on and breathe under water, unaffected by strong winds (glide through the air at normal Movement instead), see in total darkness and aren't dazzled by bright light. Power level 2 adds one other person within 4 m, level 3 another. No protection against magically summoned effects."
 },
 {
  "id": "rest",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Rest",
  "school": "Harmonism",
  "rank": 3,
  "prerequisite": "Doubt or Encourage",
  "requirements": [
   "melody"
  ],
  "castingTime": "stretch",
  "range": "10 meters",
  "duration": "Instant",
  "page": 52,
  "source": "magic",
  "text": "Friendly creatures in range get shift-rest benefits in the time and conditions of a stretch rest. Power level 1: choose one of recover HP, recover WP, or heal all conditions (same choice for all); level 2: two of these; level 3: all three. You don't benefit yourself."
 },
 {
  "id": "break",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Break",
  "school": "Harmonism",
  "rank": 4,
  "prerequisite": "Cacophony",
  "requirements": [
   "melody"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Instant",
  "page": 52,
  "damage": {
   "base": "2D20",
   "perLevel": "D20"
  },
  "target": "Inanimate, non-magical objects (number = your WIL base chance)",
  "ignoresArmor": true,
  "source": "magic",
  "text": "A piercing note hits a number of non-magical inanimate objects in range (weapons, doors…) equal to your WIL base chance, each taking 2D20 damage ignoring armor rating; +D20 per extra power level. Objects without listed HP are usually simply destroyed (GM decides)."
 },
 {
  "id": "hypnotize-monster",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Hypnotize Monster",
  "school": "Harmonism",
  "rank": 4,
  "prerequisite": "Placate Nature",
  "requirements": [
   "melody"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Concentration",
  "page": 52,
  "source": "magic",
  "options": [
   "Ferocity −1 (minimum 1)",
   "Movement halved",
   "Rolls twice for monster attacks and you pick which applies (not the same attack twice in a row)"
  ],
  "text": "Disrupt even great monsters and demon lords: for each power level, choose one effect on a creature — reduce its Ferocity by 1 (min 1); halve its Movement; or make it roll twice for monster attacks with you choosing the result (never the same attack twice in a row). Lasts while you concentrate; you'll likely become its main target."
 },
 {
  "id": "mass-dance",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Mass Dance",
  "school": "Harmonism",
  "rank": 4,
  "prerequisite": "Dance",
  "requirements": [
   "melody"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Concentration",
  "page": 52,
  "rangeByLevel": [
   "10 meters",
   "20 meters",
   "40 meters"
  ],
  "resist": {
   "roll": "WIL",
   "opposed": false
  },
  "noEffectOn": [
   "monsters",
   "undead"
  ],
  "source": "magic",
  "text": "Any living creatures you choose in range make a WIL roll (not an action); those who fail can take no actions and you control their movement — even into danger — while you concentrate or until they take damage from an attack. Range 20 m at power level 2, 40 m at 3. No effect on monsters or undead."
 },
 {
  "id": "musical-blast",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Musical Blast",
  "school": "Harmonism",
  "rank": 4,
  "prerequisite": "Cacophony",
  "requirements": [
   "melody"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Concentration",
  "page": 52,
  "rangeByLevel": [
   "10 meters",
   "20 meters",
   "40 meters"
  ],
  "damage": {
   "base": "D8",
   "perTurn": "D8"
  },
  "ignoresArmor": true,
  "conditions": [
   "Dazed"
  ],
  "source": "magic",
  "text": "All opponents in range become Dazed and take D8 damage at once, then another D8 on each of your turns while they stay in range and you concentrate. Armor doesn't help. Range 20 m at power level 2, 40 m at 3."
 },
 {
  "id": "spiritual-solace",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Spiritual Solace",
  "school": "Harmonism",
  "rank": 4,
  "prerequisite": "Rest",
  "requirements": [
   "melody"
  ],
  "castingTime": "stretch",
  "range": "10 meters",
  "duration": "Instant",
  "page": 52,
  "source": "magic",
  "text": "All allies in range get every benefit of a shift rest in the time and conditions of a stretch rest. Power level 2 also removes negative effects on their souls — spells (unless made permanent with Permanence), fear effects and the like. Level 3 also heals severe injuries and fully restores bodies. You don't benefit yourself."
 },
 {
  "id": "abyssal-resonance",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Abyssal Resonance",
  "school": "Harmonism",
  "rank": 5,
  "prerequisite": "Musical Blast",
  "requirements": [
   "melody"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Concentration",
  "page": 53,
  "rangeByLevel": [
   "20 meters",
   "40 meters",
   "80 meters"
  ],
  "damage": {
   "base": "D12",
   "perTurn": "D12"
  },
  "ignoresArmor": true,
  "conditions": [
   "Dazed"
  ],
  "source": "magic",
  "text": "All enemies in range become Dazed and take D12 damage at once, then another D12 on each of your turns while they stay in range and you concentrate. Armor doesn't help. Range 40 m at power level 2, 80 m at 3."
 },
 {
  "id": "raze",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Raze",
  "school": "Harmonism",
  "rank": 5,
  "prerequisite": "Break",
  "requirements": [
   "melody"
  ],
  "castingTime": "stretch",
  "range": "100 meters",
  "duration": "Instant",
  "page": 53,
  "source": "magic",
  "text": "Demolish structures (GM rules the details). Power level 1: a small cottage or a 1 m breach in a stone wall; 2: a mansion or a whole section of stone wall; 3: an entire castle or tower."
 },
 {
  "id": "apparition",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Apparition",
  "school": "Illusionism",
  "rank": 1,
  "prerequisite": "Illusionism",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "30 meters",
  "duration": "Concentration",
  "page": 59,
  "resist": {
   "roll": "Awareness",
   "opposed": false,
   "byLevel": [
    "boon",
    "normal",
    "bane"
   ]
  },
  "source": "magic",
  "text": "Create a moving, purely visual (silent) image of a creature up to human size. Seeing through it takes an AWARENESS roll, not an action (boon at power level 1, normal at 2, bane at 3); those who fail act as if it's real and may roll again each round. It vanishes for everyone if anyone touches it."
 },
 {
  "id": "confusion",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Confusion",
  "school": "Illusionism",
  "rank": 1,
  "prerequisite": "Illusionism",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Concentration",
  "page": 59,
  "resist": {
   "roll": "INT",
   "opposed": true,
   "byLevel": [
    "boon",
    "normal",
    "bane"
   ]
  },
  "noEffectOn": [
   "monsters",
   "undead"
  ],
  "source": "magic",
  "table": [
   {
    "roll": 1,
    "text": "Stands confused and does nothing."
   },
   {
    "roll": 2,
    "text": "Attacks a random creature within range."
   },
   {
    "roll": 3,
    "text": "Attacks themselves (roll to hit and damage as normal)."
   },
   {
    "roll": 4,
    "text": "Runs in a random direction; hitting a wall knocks them prone for D6 bludgeoning damage."
   }
  ],
  "text": "Opposed roll vs the target's INT (target has a boon at power level 1, normal at 2, bane at 3). On a success the victim can't make reactions and acts randomly each turn (roll D4 on the table). A new opposed INT roll is made each of their turns; it ends when you lose one or break concentration. No effect on monsters or undead."
 },
 {
  "id": "long-shadows",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Long Shadows",
  "school": "Illusionism",
  "rank": 1,
  "prerequisite": "Illusionism",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Stretch",
  "page": 59,
  "rangeByLevel": [
   "10 meters",
   "30 meters",
   "100 meters"
  ],
  "source": "magic",
  "text": "Natural shadows in range deepen, giving a boon to SNEAKING rolls; no effect where there are no natural shadows. Range 30 m at power level 2, 100 m at 3."
 },
 {
  "id": "mind-mask",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Mind Mask",
  "school": "Illusionism",
  "rank": 1,
  "prerequisite": "Illusionism",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "Touch",
  "duration": "Stretch",
  "page": 59,
  "self": true,
  "source": "magic",
  "text": "Veil your mind: spells such as Divination and Magic Seal — and traps, places or monsters that tell creatures apart — can be fooled into reading you as a different creature or kind of creature (looks don't change). Spells affecting your mind, like Telepathy and Dominate, get a bane. Power level 2 adds one other person, 3 adds two. Can't be recast while active."
 },
 {
  "id": "send-dream",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Send Dream",
  "school": "Illusionism",
  "rank": 1,
  "prerequisite": "Illusionism",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "stretch",
  "range": "1 kilometer",
  "duration": "Concentration",
  "page": 59,
  "resist": {
   "roll": "INT",
   "opposed": false,
   "byLevel": [
    "boon",
    "normal",
    "bane"
   ]
  },
  "source": "magic",
  "text": "Send a dream to a sleeping person you have met — a message or a nightmare. A nightmare means the sleep doesn't count as rest and the target can't take a shift rest for a full day. The victim resists with an INT roll (boon at power level 1, normal at 2, bane at 3)."
 },
 {
  "id": "amnesia",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Amnesia",
  "school": "Illusionism",
  "rank": 2,
  "prerequisite": "Send Dream",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "4 meters",
  "duration": "Instant",
  "page": 60,
  "resist": {
   "roll": "INT",
   "opposed": true,
   "byLevel": [
    "boon",
    "normal",
    "bane"
   ]
  },
  "source": "magic",
  "text": "Meet the victim's eyes and erase their memory of the last stretch: opposed roll vs their INT (target has a boon at power level 1, normal at 2, bane at 3)."
 },
 {
  "id": "illusion",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Illusion",
  "school": "Illusionism",
  "rank": 2,
  "prerequisite": "Apparition",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "30 meters",
  "duration": "Concentration",
  "page": 60,
  "resist": {
   "roll": "Awareness",
   "opposed": false,
   "byLevel": [
    "boon",
    "normal",
    "bane"
   ]
  },
  "source": "magic",
  "illusionAttack": {
   "skill": 15,
   "damage": "D6",
   "type": "bludgeoning"
  },
  "text": "Create an illusion of a creature up to human size that fools all five senses — or only some (a ghostly voice, a noise). Seeing through it takes an AWARENESS roll, not an action (boon at power level 1, normal at 2, bane at 3), retried each round; those who fail treat it as real. It can fight: skill level 15, every attack D6 bludgeoning."
 },
 {
  "id": "impersonate",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Impersonate",
  "school": "Illusionism",
  "rank": 2,
  "prerequisite": "Mind Mask",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "Personal",
  "duration": "Stretch",
  "page": 61,
  "self": true,
  "resist": {
   "roll": "Bluffing or Performance",
   "caster": true,
   "byLevel": [
    "bane",
    "normal",
    "boon"
   ]
  },
  "source": "magic",
  "text": "Take on a specific person's voice and looks. Everyone at a distance is fooled; to fool someone who knows that person in conversation you need a BLUFFING or PERFORMANCE roll — with a bane at power level 1, normal at 2, boon at 3."
 },
 {
  "id": "shadow-shroud",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Shadow Shroud",
  "school": "Illusionism",
  "rank": 2,
  "prerequisite": "Long Shadows",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "Personal",
  "duration": "Stretch",
  "page": 61,
  "self": true,
  "source": "magic",
  "text": "Shadows wrap your body, giving a boon to SNEAKING rolls. Duration becomes a shift at power level 2 and a full day at 3."
 },
 {
  "id": "trip",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Trip",
  "school": "Illusionism",
  "rank": 2,
  "prerequisite": "Confusion",
  "requirements": [
   "gesture"
  ],
  "castingTime": "reaction",
  "range": "20 meters",
  "duration": "Instant",
  "page": 61,
  "resist": {
   "roll": "Evade",
   "opposed": true,
   "byLevel": [
    "boon",
    "normal",
    "bane"
   ]
  },
  "noEffectOn": [
   "monsters"
  ],
  "source": "magic",
  "text": "Cast when a two-legged creature is about to move: opposed roll vs its EVADE (target has a boon at power level 1, normal at 2, bane at 3). On a success it falls prone and its movement stops. Monsters are unaffected."
 },
 {
  "id": "group-identity",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Group Identity",
  "school": "Illusionism",
  "rank": 3,
  "prerequisite": "Impersonate",
  "requirements": [
   "gesture"
  ],
  "castingTime": "round",
  "range": "4 meters",
  "duration": "Stretch",
  "page": 61,
  "self": true,
  "resist": {
   "roll": "Bluffing or Performance",
   "caster": true,
   "byLevel": [
    "bane",
    "normal",
    "boon"
   ]
  },
  "source": "magic",
  "text": "Disguise yourself and willing, living, up-to-human-sized creatures in range (total no more than your WIL base chance) as a type of creature, not specific people. Everyone at a distance is fooled; in conversation your spokesperson must pass BLUFFING or PERFORMANCE — bane at power level 1, normal at 2, boon at 3."
 },
 {
  "id": "mass-confusion",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Mass Confusion",
  "school": "Illusionism",
  "rank": 3,
  "prerequisite": "Trip",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Concentration",
  "page": 61,
  "resist": {
   "roll": "INT",
   "opposed": false,
   "byLevel": [
    "boon",
    "normal",
    "bane"
   ]
  },
  "noEffectOn": [
   "monsters",
   "undead"
  ],
  "source": "magic",
  "table": [
   {
    "roll": 1,
    "text": "Stands confused and does nothing."
   },
   {
    "roll": 2,
    "text": "Attacks a random creature within range."
   },
   {
    "roll": 3,
    "text": "Attacks themselves (roll to hit and damage as normal)."
   },
   {
    "roll": 4,
    "text": "Runs in a random direction; hitting a wall knocks them prone for D6 bludgeoning damage."
   }
  ],
  "text": "Every opponent in range resists with an INT roll, not an action (boon at power level 1, normal at 2, bane at 3). The confused can't make reactions and act randomly each turn (roll D4 on the table); they may roll INT again each turn to break free. No effect on monsters or undead."
 },
 {
  "id": "mirror-image",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Mirror Image",
  "school": "Illusionism",
  "rank": 3,
  "prerequisite": "Illusion",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "Personal",
  "duration": "Stretch",
  "page": 62,
  "self": true,
  "source": "magic",
  "text": "Create illusory copies of yourself equal to the power level. Enemies can't tell which is real — the GM picks randomly which one an attack hits; a hit copy vanishes. Copies can't fight or interact with anything. Can't be recast while active."
 },
 {
  "id": "shadow-leap",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Shadow Leap",
  "school": "Illusionism",
  "rank": 3,
  "prerequisite": "Shadow Shroud",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "Touch",
  "duration": "Instant",
  "page": 62,
  "self": true,
  "source": "magic",
  "text": "Teleport from one shadow to another you can see within 30 m. Each extra power level lets you bring one more human-sized creature you touch, or doubles the range."
 },
 {
  "id": "waking-nightmare",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Waking Nightmare",
  "school": "Illusionism",
  "rank": 3,
  "prerequisite": "Amnesia",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Stretch",
  "page": 62,
  "resist": {
   "roll": "INT",
   "opposed": true,
   "byLevel": [
    "boon",
    "normal",
    "bane"
   ]
  },
  "noEffectOn": [
   "monsters",
   "undead"
  ],
  "source": "magic",
  "text": "Point at a living creature: opposed roll vs its INT (target has a boon at power level 1, normal at 2, bane at 3). On a success it can't act or move and loses D6 WP each turn. From its second turn on it may make an INT roll (not an action) each turn to break free. Monsters and undead are unaffected."
 },
 {
  "id": "doppelganger",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Doppelganger",
  "school": "Illusionism",
  "rank": 4,
  "prerequisite": "Mirror Image",
  "requirements": [
   "gesture"
  ],
  "castingTime": "stretch",
  "range": "30 meters",
  "duration": "Concentration",
  "page": 63,
  "rangeByLevel": [
   "30 meters",
   "100 meters",
   "500 meters"
  ],
  "source": "magic",
  "text": "Create an illusory double with your attributes, skills, abilities and gear, under your full control, free to move within range (100 m at power level 2, 500 m at 3). You can't move while it exists; it vanishes if your concentration breaks. It uses your WP. Each time it attacks, the target may roll AWARENESS to see through it, making it vanish. If it drops to zero HP it vanishes and you must roll on the fear table."
 },
 {
  "id": "false-terrain",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "False Terrain",
  "school": "Illusionism",
  "rank": 4,
  "prerequisite": "Mirror Image",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "stretch",
  "range": "30 meters",
  "duration": "Shift",
  "page": 63,
  "source": "magic",
  "text": "Cover what's really there with illusory terrain. Power level 1: a door or hole; 2: a wagon, small boat or cave mouth; 3: a house, ship or small ravine. An intelligent creature that physically touches it sees through it automatically; the illusion stays for others even if told, but anyone who has seen through it may ignore it."
 },
 {
  "id": "fatal-mistake",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Fatal Mistake",
  "school": "Illusionism",
  "rank": 4,
  "prerequisite": "Mass Confusion",
  "requirements": [
   "gesture"
  ],
  "castingTime": "reaction",
  "range": "20 meters",
  "duration": "Instant",
  "page": 63,
  "resist": {
   "roll": "INT",
   "opposed": true,
   "byLevel": [
    "boon",
    "normal",
    "bane"
   ]
  },
  "noEffectOn": [
   "monsters"
  ],
  "source": "magic",
  "text": "Cast when a creature is about to attack: opposed roll vs its INT (target has a boon at power level 1, normal at 2, bane at 3). On a success it attacks a random ally within reach instead, or itself if it has none. Monsters are unaffected."
 },
 {
  "id": "cheat-fate",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Cheat Fate",
  "school": "Illusionism",
  "rank": 5,
  "prerequisite": "Fatal Mistake",
  "requirements": [
   "gesture"
  ],
  "castingTime": "reaction",
  "range": "20 meters",
  "duration": "Instant",
  "page": 63,
  "source": "magic",
  "text": "Force a friend or foe (not yourself) to reroll a roll just made; the new result stands. Power level 1: a skill roll (after any push); 2: a damage roll (including damage bonus); 3: a monster attack roll. Must be cast at once, before any other roll."
 },
 {
  "id": "fata-morgana",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Fata Morgana",
  "school": "Illusionism",
  "rank": 5,
  "prerequisite": "False Terrain",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "stretch",
  "range": "100 meters",
  "duration": "Shift",
  "page": 63,
  "source": "magic",
  "text": "Create a static illusion so real it is effectively physical — even those who know it's false are affected. Power level 1: a small cottage or boat; 2: a mansion or ship; 3: a fortress or grand hunting lodge. When it ends it fades fast — dangerous for anyone upstairs or at sea in it."
 },
 {
  "id": "shockwave",
  "powerLevels": true,
  "dodge": true,
  "parry": false,
  "name": "Shockwave",
  "school": "Mentalism",
  "rank": 3,
  "prerequisite": "Mental Strike",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "4 meters (sphere)",
  "duration": "Instant",
  "page": 71,
  "damage": {
   "base": "2D6",
   "perLevel": "D6"
  },
  "damageType": "bludgeoning",
  "source": "magic",
  "text": "Strike the ground: everyone in range is hurled 2D6 m away from you and takes the same in bludgeoning damage. Dodge as a ranged attack. Each extra power level adds 2 m of range and D6. Large and Huge creatures take damage but aren't moved."
 },
 {
  "id": "true-sight",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "True Sight",
  "school": "Mentalism",
  "rank": 3,
  "prerequisite": "Divination",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "50 meters",
  "duration": "Stretch",
  "page": 72,
  "source": "magic",
  "text": "You automatically see through any spell of rank 3 or lower meant to deceive your senses; rank 4 too at power level 2, and rank 5 at power level 3."
 },
 {
  "id": "bounce",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Bounce",
  "school": "Mentalism",
  "rank": 4,
  "prerequisite": "Teleport",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Instant",
  "page": 72,
  "source": "magic",
  "text": "Teleport to a spot you can see in range, immediately take a normal action there, then teleport to another chosen spot in range. Each extra power level doubles the range."
 },
 {
  "id": "control-person",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Control Person",
  "school": "Mentalism",
  "rank": 4,
  "prerequisite": "Dominate",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Concentration",
  "page": 73,
  "source": "magic",
  "opposed": {
   "attribute": "WIL",
   "targetBoonAtLevel1": true
  },
  "text": "Opposed roll vs the target's WIL (target has a boon at power level 1, normal at 2, bane at 3). If you win, the creature acts on your turn and does exactly what you want; any WP its actions cost come from you. No effect on monsters or undead."
 },
 {
  "id": "matter-control",
  "powerLevels": true,
  "dodge": true,
  "parry": false,
  "name": "Matter Control",
  "school": "Mentalism",
  "rank": 4,
  "prerequisite": "Shockwave",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Instant",
  "page": 73,
  "damage": {
   "base": "2D8",
   "perLevel": "D8"
  },
  "damageType": "bludgeoning",
  "extraTargetPerLevel": true,
  "source": "magic",
  "text": "Lift and move a human-sized or smaller creature or object up to 12 m horizontally. As an attack (slam a creature into a wall or hurl an object) it deals 2D8 bludgeoning, dodgeable as a ranged attack. Each extra power level adds 6 m and D8, or one more target; with several targets roll once, but each dodges and takes damage separately."
 },
 {
  "id": "speed",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Speed",
  "school": "Mentalism",
  "rank": 4,
  "prerequisite": "Flight",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "Touch",
  "duration": "Stretch",
  "page": 73,
  "self": true,
  "source": "magic",
  "text": "Power level 1: you or a willing subject gains an extra reaction each round. Power level 2: instead, an extra action (not spellcasting or a round rest) or an extra move on their turn. Power level 3: both the extra action and the extra move. When it ends, the subject is Exhausted."
 },
 {
  "id": "dominate-monster",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Dominate Monster",
  "school": "Mentalism",
  "rank": 5,
  "prerequisite": "Control Person",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Instant",
  "page": 73,
  "source": "magic",
  "text": "Seize a monster with up to 20 HP (40 at power level 2, 60 at 3). It immediately makes one movement and one monster attack of your choice (not against itself or an inanimate object), then loses its next turn. No effect on dragons or demons."
 },
 {
  "id": "invisibility",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Invisibility",
  "school": "Mentalism",
  "rank": 5,
  "prerequisite": "Bounce",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "Personal/touch",
  "duration": "Stretch",
  "page": 73,
  "self": true,
  "source": "magic",
  "text": "You can't be perceived while still. Moving or acting, you get two boons on Sneaking, others get two banes on Awareness to notice you, ranged attacks can't hit you, and a melee attacker must first pass an Awareness roll with a double bane (no action). Power level 2: make another touched human-sized living being invisible instead of you; power level 3: both of you."
 },
 {
  "id": "cadaverous-stench",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Cadaverous Stench",
  "school": "Necromancy",
  "rank": 1,
  "prerequisite": "Necromancy",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "10 meters (cone)",
  "duration": "Instant",
  "page": 78,
  "source": "magic",
  "text": "Breathe a cone of rot: everyone in it makes a CON roll (not an action) — boon at power level 1, normal at 2, bane at 3. Those who fail retch and lose their next turn, and can't take reactions until then. No effect on monsters or undead."
 },
 {
  "id": "fright",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Fright",
  "school": "Necromancy",
  "rank": 1,
  "prerequisite": "Necromancy",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Instant",
  "page": 78,
  "source": "magic",
  "opposed": {
   "attribute": "WIL",
   "targetBoonAtLevel1": true
  },
  "text": "Opposed roll vs a living target's WIL (target has a boon at power level 1, normal at 2, bane at 3). If you win, they lose D6 WP and become Scared. No effect on monsters or undead."
 },
 {
  "id": "pain",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Pain",
  "school": "Necromancy",
  "rank": 1,
  "prerequisite": "Necromancy",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Instant",
  "page": 79,
  "ignoresArmor": true,
  "source": "magic",
  "opposed": {
   "attribute": "CON",
   "targetBoonAtLevel1": true
  },
  "text": "Opposed roll vs a living target's CON (target has a boon at power level 1, normal at 2, bane at 3). If you win, they lose D6 HP (armor doesn't help) and become Exhausted. No effect on monsters or undead."
 },
 {
  "id": "rigor-mortis",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Rigor Mortis",
  "school": "Necromancy",
  "rank": 1,
  "prerequisite": "Necromancy",
  "requirements": [
   "word",
   "focus"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Stretch",
  "page": 79,
  "source": "magic",
  "opposed": {
   "attribute": "CON",
   "targetBoonAtLevel1": true
  },
  "text": "Opposed roll vs the target's CON (target has a boon at power level 1, normal at 2, bane at 3). If you win, their Movement is halved and they become Dazed. No effect on monsters or undead."
 },
 {
  "id": "speak-with-dead",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Speak With Dead",
  "school": "Necromancy",
  "rank": 1,
  "prerequisite": "Necromancy",
  "requirements": [
   "word",
   "focus"
  ],
  "requirementDetail": "skull",
  "castingTime": "stretch",
  "range": "Touch",
  "duration": "Instant",
  "page": 79,
  "source": "magic",
  "text": "Call up a dead person's spirit (you need their head or skull) and ask as many questions as the power level. The dead don't lie but know only what they knew in life; an unknown answer wastes the question, and the GM may answer vaguely. Each spirit can be summoned only once."
 },
 {
  "id": "undead-aura",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Undead Aura",
  "school": "Necromancy",
  "rank": 1,
  "prerequisite": "Necromancy",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "Personal/touch",
  "duration": "Stretch",
  "page": 80,
  "self": true,
  "source": "magic",
  "text": "Undead treat you as one of them and won't attack unless you strike first, and you're immune to fear caused by undead. Power level 2: affect another willing touched human-sized living being instead of you; power level 3: both of you."
 },
 {
  "id": "animate-carcass",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Animate Carcass",
  "school": "Necromancy",
  "rank": 2,
  "prerequisite": "Speak With Dead",
  "requirements": [
   "word",
   "ingredient"
  ],
  "requirementDetail": "corpse",
  "castingTime": "stretch",
  "range": "Touch",
  "duration": "Shift",
  "page": 80,
  "summon": "Animated Carcass",
  "source": "magic",
  "text": "Reanimate a dead animal as a loyal thrall you can talk to telepathically: up to 8 HP at power level 1, 14 HP at 2, 20 HP at 3 (animal stats in the core rules)."
 },
 {
  "id": "corrosive-darkness",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Corrosive Darkness",
  "school": "Necromancy",
  "rank": 2,
  "prerequisite": "Cadaverous Stench",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "10 meters (cone)",
  "duration": "Instant",
  "page": 80,
  "ignoresArmor": true,
  "source": "magic",
  "damage": {
   "base": "D4",
   "perLevel": null
  },
  "text": "Cough out a cone of corrosive darkness that lingers for rounds equal to the power level. Anyone inside acts as in total darkness and takes D4 damage (armor doesn't help) at the start of each of their turns there."
 },
 {
  "id": "dread",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Dread",
  "school": "Necromancy",
  "rank": 2,
  "prerequisite": "Fright",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Instant",
  "page": 80,
  "source": "magic",
  "opposed": {
   "attribute": "WIL",
   "targetBoonAtLevel1": true
  },
  "fearTable": "D8 per power level, highest",
  "text": "Opposed roll vs the target's WIL (target has a boon at power level 1, normal at 2, bane at 3). If you win, they roll on the Fear Table using one D8 per power level and taking the highest. No effect on monsters or undead."
 },
 {
  "id": "incapacitate",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Incapacitate",
  "school": "Necromancy",
  "rank": 2,
  "prerequisite": "Rigor Mortis",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Stretch",
  "page": 80,
  "source": "magic",
  "opposed": {
   "attribute": "CON",
   "targetBoonAtLevel1": true
  },
  "text": "Opposed roll vs the target's CON (target has a boon at power level 1, normal at 2, bane at 3). If you win, they are paralysed and helpless — can't move, act, speak or make magic gestures. They may make a CON roll (straight roll, not an action) at the start of each of their turns, except the one right after casting, to break free. No effect on monsters or undead."
 },
 {
  "id": "injure",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Injure",
  "school": "Necromancy",
  "rank": 2,
  "prerequisite": "Pain",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Instant",
  "page": 81,
  "ignoresArmor": true,
  "source": "magic",
  "opposed": {
   "attribute": "CON"
  },
  "damage": {
   "base": "2D6",
   "perLevel": "D6"
  },
  "text": "Opposed roll vs the target's CON. If you win, internal bleeding deals 2D6 damage, +D6 per extra power level; ignores armor and can't be dodged. No effect on undead."
 },
 {
  "id": "undead-resilience",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Undead Resilience",
  "school": "Necromancy",
  "rank": 2,
  "prerequisite": "Undead Aura",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "Personal",
  "duration": "Stretch",
  "page": 81,
  "source": "magic",
  "text": "You're immune to cold and drowning. Power level 2: also immune to all fear. Power level 3: also take half damage (after armor, rounded up) from non-magical weapons — fire, magic and magical weapons still deal full damage."
 },
 {
  "id": "hand-of-death",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Hand of Death",
  "school": "Necromancy",
  "rank": 3,
  "prerequisite": "Incapacitate or Injure",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Concentration",
  "page": 81,
  "ignoresArmor": true,
  "source": "magic",
  "opposed": {
   "attribute": "CON"
  },
  "damage": {
   "base": "D8",
   "perTurn": true,
   "byLevel": [
    "D8",
    "D10",
    "D12"
   ]
  },
  "text": "Opposed roll vs the target's CON. If you win, an invisible claw deals D8 at once and D8 more each turn while you concentrate (D10 at power level 2, D12 at 3). Ignores armor, can't be dodged. No effect on monsters or undead."
 },
 {
  "id": "raise-skeleton",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Raise Skeleton",
  "school": "Necromancy",
  "rank": 3,
  "prerequisite": "Animate Carcass",
  "requirements": [
   "word",
   "gesture",
   "ingredient"
  ],
  "requirementDetail": "skeleton",
  "castingTime": "stretch",
  "range": "Touch",
  "duration": "Stretch",
  "page": 81,
  "summon": "Raised Skeleton",
  "source": "magic",
  "text": "Animate a standard skeleton from a human-sized humanoid. Power level 2: two skeletons, or one for a shift. Power level 3: three for a stretch, two for a shift, or one skeleton champion for a stretch. You talk to them telepathically at any range; they obey literally and have no gear unless you give them some."
 },
 {
  "id": "terror",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Terror",
  "school": "Necromancy",
  "rank": 3,
  "prerequisite": "Dread",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "10 meters (sphere)",
  "duration": "Instant",
  "page": 81,
  "source": "magic",
  "fearTable": "D8 per power level, highest",
  "text": "Everyone in range makes a WIL roll; those who fail roll on the Fear Table with one D8 per power level, taking the highest. No effect on monsters or undead."
 },
 {
  "id": "drain-life",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Drain Life",
  "school": "Necromancy",
  "rank": 4,
  "prerequisite": "Hand of Death",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Concentration",
  "page": 81,
  "ignoresArmor": true,
  "source": "magic",
  "opposed": {
   "attribute": "WIL"
  },
  "damage": {
   "base": "D8",
   "perTurn": true,
   "byLevel": [
    "D8",
    "D10",
    "D12"
   ]
  },
  "lifesteal": true,
  "text": "Opposed roll vs the target's WIL. If you win, they take D8 at once and D8 each turn while you concentrate (D10 at power level 2, D12 at 3), and you heal 1 HP per point dealt (up to max HP). Ignores armor, can't be dodged. No effect on monsters or undead."
 },
 {
  "id": "necrotic-chill",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Necrotic Chill",
  "school": "Necromancy",
  "rank": 4,
  "prerequisite": "Terror",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "20 meters (sphere)",
  "duration": "Instant",
  "page": 82,
  "ignoresArmor": true,
  "source": "magic",
  "damage": {
   "base": "D6",
   "perLevel": null
  },
  "fearTable": "D8 per power level, highest",
  "text": "Everyone in range takes D6 damage (armor doesn't help), becomes cold, and must pass a WIL roll or roll on the Fear Table with one D8 per power level, taking the highest. No effect on monsters or undead."
 },
 {
  "id": "raise-wight",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Raise Wight",
  "school": "Necromancy",
  "rank": 4,
  "prerequisite": "Raise Skeleton",
  "requirements": [
   "word",
   "gesture",
   "ingredient"
  ],
  "requirementDetail": "a dead ruler or mighty warrior",
  "castingTime": "shift",
  "range": "Touch",
  "duration": "Shift",
  "page": 82,
  "summon": "Raised Wight",
  "source": "magic",
  "text": "Raise a dead lord, lady or great warrior as a wight bound to you (core wight stats) for a shift — a day at power level 2, a week at 3. Finding such remains is up to the GM; they're often buried with arms and armor. Telepathic contact at any range; in combat you pick its target but its monster attack is rolled. Only one wight at a time."
 },
 {
  "id": "defy-death",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Defy Death",
  "school": "Necromancy",
  "rank": 5,
  "prerequisite": "Drain Life",
  "requirements": [
   "word",
   "gesture",
   "ingredient"
  ],
  "requirementDetail": "fresh corpse",
  "castingTime": "shift",
  "range": "Unlimited",
  "duration": "Instant",
  "page": 82,
  "source": "magic",
  "text": "Prepare an intact corpse dead no more than a day as a new vessel; embalmed, it stays preserved up to a year wherever you keep it. When you die, make a WIL roll (can't be pushed) — bane at power level 1, normal at 2, boon at 3. On success you wake in the new body a stretch after death with all memories and stats, except CHA and all CHA-based skill levels drop by D3 (minimum 3)."
 },
 {
  "id": "raise-mummy",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Raise Mummy",
  "school": "Necromancy",
  "rank": 5,
  "prerequisite": "Raise Wight",
  "requirements": [
   "word",
   "gesture",
   "ingredient"
  ],
  "requirementDetail": "corpse of a ruler or great warrior, plus embalming oils and linen",
  "castingTime": "shift",
  "range": "Touch",
  "duration": "Shift",
  "page": 83,
  "summon": "Mummy",
  "source": "magic",
  "text": "Anoint and wrap a dead lord, lady or great warrior to raise an obedient mummy for a shift — a day at power level 2, a week at 3. Telepathic contact at any range; in combat you pick its target but its monster attack is rolled. Only one mummy at a time."
 },
 {
  "id": "raise-skeletal-horde",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Raise Skeletal Horde",
  "school": "Necromancy",
  "rank": 5,
  "prerequisite": "Raise Wight",
  "requirements": [
   "word",
   "gesture",
   "ingredient"
  ],
  "requirementDetail": "skeletons",
  "castingTime": "stretch",
  "range": "50 meters",
  "duration": "Shift",
  "page": 83,
  "summon": "Skeletal Horde",
  "source": "magic",
  "text": "Raise a horde of standard skeletons that obey every command, up to your WIL base chance in number — doubled at power level 2, tripled at 3. The horde takes one turn per round but makes attacks equal to its skeletons ÷ 5 (round up). Each skeleton has its own HP and moves separately but must stay within 2 m of another where possible. Only one horde at a time."
 },
 {
  "id": "farscribe",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Farscribe",
  "school": "Symbolism",
  "rank": 1,
  "prerequisite": "Symbolism",
  "requirements": [
   "symbol"
  ],
  "castingTime": "stretch/shift",
  "range": "100 meters",
  "duration": "Stretch/shift",
  "page": 89,
  "source": "magic",
  "text": "Must be drawn or carved, not traced. Whatever you then write or draw on the symbol appears as glowing script, at the speed you write, on any flat surface in range that you've seen before (it needn't be in sight). Range 1 km at power level 2, 10 km at 3."
 },
 {
  "id": "hesitation",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Hesitation",
  "school": "Symbolism",
  "rank": 1,
  "prerequisite": "Symbolism",
  "requirements": [
   "symbol"
  ],
  "castingTime": "action/stretch/shift",
  "range": "20 meters",
  "duration": "Round/stretch/shift",
  "page": 90,
  "seeTrigger": true,
  "source": "magic",
  "text": "Anyone who sees it makes a WIL roll on their turn (not an action) — boon at power level 1, normal at 2, bane at 3. On failure they swap their initiative card for the worst available (in combat) and get a bane on all skill rolls. They may retry each turn; one success ends it for them."
 },
 {
  "id": "lure",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Lure",
  "school": "Symbolism",
  "rank": 1,
  "prerequisite": "Symbolism",
  "requirements": [
   "symbol"
  ],
  "castingTime": "action/stretch/shift",
  "range": "20 meters",
  "duration": "Round/stretch/shift",
  "page": 90,
  "seeTrigger": true,
  "source": "magic",
  "text": "Anyone who sees it makes a WIL roll on their turn (not an action) — boon at power level 1, normal at 2, bane at 3. On failure they must move toward the symbol at normal Movement and can't look away (bane on Awareness), though they can still fight. They may retry each turn; one success ends it for them."
 },
 {
  "id": "shield-rune",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Shield Rune",
  "school": "Symbolism",
  "rank": 1,
  "prerequisite": "Symbolism",
  "requirements": [
   "symbol"
  ],
  "castingTime": "action/stretch/shift",
  "range": "Touch",
  "duration": "Round/stretch/shift",
  "page": 90,
  "self": true,
  "source": "magic",
  "text": "An invisible shield gives a bane to all non-magical attacks against one person (you included). Each power level after the first doubles the duration."
 },
 {
  "id": "sunder",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Sunder",
  "school": "Symbolism",
  "rank": 1,
  "prerequisite": "Symbolism",
  "requirements": [
   "symbol"
  ],
  "castingTime": "action",
  "range": "Touch",
  "duration": "Instant",
  "page": 90,
  "ignoresArmor": true,
  "source": "magic",
  "damage": {
   "base": "2D10",
   "perLevel": "D10"
  },
  "target": "Inanimate, non-magical objects",
  "text": "A quickly drawn symbol on a non-magical object (weapon, door…) deals 2D10 damage ignoring armor, +D10 per extra power level."
 },
 {
  "id": "fortify",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Fortify",
  "school": "Symbolism",
  "rank": 2,
  "prerequisite": "Sunder",
  "requirements": [
   "symbol"
  ],
  "castingTime": "action/stretch/shift",
  "range": "Touch",
  "duration": "Round/stretch/shift",
  "page": 90,
  "source": "magic",
  "text": "Reinforce a door, wall, bridge or pillar: its armor rating rises by 10 per power level."
 },
 {
  "id": "halt",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Halt",
  "school": "Symbolism",
  "rank": 2,
  "prerequisite": "Hesitation or Lure",
  "requirements": [
   "symbol"
  ],
  "castingTime": "action/stretch/shift",
  "range": "20 meters",
  "duration": "Round/stretch/shift",
  "page": 90,
  "seeTrigger": true,
  "source": "magic",
  "text": "Anyone who sees it must pass a WIL roll to move toward it at all — boon at power level 1, normal at 2, bane at 3. They may retry each turn; one success ends it for them."
 },
 {
  "id": "magic-armor",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Magic Armor",
  "school": "Symbolism",
  "rank": 2,
  "prerequisite": "Shield Rune",
  "requirements": [
   "symbol"
  ],
  "castingTime": "action/stretch/shift",
  "range": "Touch",
  "duration": "Round/stretch/shift",
  "page": 90,
  "self": true,
  "source": "magic",
  "text": "Protect a person (you included) against magic: spells cast on them get one bane per power level."
 },
 {
  "id": "warding-mark",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Warding Mark",
  "school": "Symbolism",
  "rank": 2,
  "prerequisite": "Farscribe",
  "requirements": [
   "symbol"
  ],
  "castingTime": "action/stretch/shift",
  "range": "Touch",
  "duration": "Round/stretch/shift",
  "page": 91,
  "source": "magic",
  "text": "Block all teleportation and other magical travel to or from a place, and any magical spying on it. Power level 1 wards a room, 2 a building, 3 a whole city."
 },
 {
  "id": "arcane-vortex",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Arcane Vortex",
  "school": "Symbolism",
  "rank": 3,
  "prerequisite": "Warding Mark",
  "requirements": [
   "symbol"
  ],
  "castingTime": "action/stretch/shift",
  "range": "20 meters (sphere)",
  "duration": "Round/stretch/shift",
  "page": 91,
  "source": "magic",
  "text": "A vortex devours magic: anyone but you, friend or foe, loses D6 WP per power level when first entering it and gets one bane per power level on casting spells inside. Magical weapons inside don't count as magical (non-magical properties remain)."
 },
 {
  "id": "horrify",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Horrify",
  "school": "Symbolism",
  "rank": 3,
  "prerequisite": "Halt",
  "requirements": [
   "symbol"
  ],
  "castingTime": "action/stretch/shift",
  "range": "20 meters",
  "duration": "Round/stretch/shift",
  "page": 91,
  "seeTrigger": true,
  "source": "magic",
  "fearTable": "D8 per power level, highest",
  "text": "Anyone who sees it must pass a WIL roll with a bane or roll on the Fear Table with one D8 per power level, taking the highest. No effect on monsters or undead."
 },
 {
  "id": "power-source",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Power Source",
  "school": "Symbolism",
  "rank": 3,
  "prerequisite": "Fortify",
  "requirements": [
   "symbol"
  ],
  "castingTime": "action/stretch/shift",
  "range": "10 meters",
  "duration": "Round/stretch/shift",
  "page": 92,
  "source": "magic",
  "healing": {
   "wp": "D6",
   "conditionsPerLevel": 1
  },
  "text": "Everyone in range except you, friend or foe, recovers D6 WP and heals one condition per power level — when cast, or when they enter range while it's active. Once per person per shift."
 },
 {
  "id": "retribution-rune",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Retribution Rune",
  "school": "Symbolism",
  "rank": 3,
  "prerequisite": "Magic Armor",
  "requirements": [
   "symbol"
  ],
  "castingTime": "action/stretch/shift",
  "range": "Personal",
  "duration": "Round/stretch/shift",
  "page": 92,
  "self": true,
  "source": "magic",
  "text": "An invisible shield gives one bane per power level to non-magical attacks against a person (you included); an attack that misses them hits the attacker instead."
 },
 {
  "id": "blind",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Blind",
  "school": "Symbolism",
  "rank": 4,
  "prerequisite": "Horrify",
  "requirements": [
   "symbol"
  ],
  "castingTime": "action/stretch/shift",
  "range": "20 meters",
  "duration": "Round/stretch/shift",
  "page": 92,
  "seeTrigger": true,
  "source": "magic",
  "text": "Anyone who sees it must pass a WIL roll (not an action) — boon at power level 1, normal at 2, bane at 3 — or be blinded for a stretch, acting as in total darkness. Afterwards they're immune to that symbol. No effect on monsters or undead."
 },
 {
  "id": "golem",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Golem",
  "school": "Symbolism",
  "rank": 4,
  "prerequisite": "Power Source",
  "requirements": [
   "symbol"
  ],
  "castingTime": "stretch/shift",
  "range": "Touch",
  "duration": "Stretch/shift",
  "page": 92,
  "summon": "Golem",
  "source": "magic",
  "text": "Symbols drawn or carved on a clay figure or stone statue bring it to life as a golem bodyguard that obeys you (stats in DB_SUMMONS_EXTRA)."
 },
 {
  "id": "portal",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Portal",
  "school": "Symbolism",
  "rank": 4,
  "prerequisite": "Arcane Vortex",
  "requirements": [
   "symbol"
  ],
  "castingTime": "stretch/shift",
  "range": "1 kilometer",
  "duration": "Stretch/shift",
  "page": 92,
  "source": "magic",
  "text": "Open a portal to a place within 1 km that you can see or have visited; up-to-human-sized creatures pass through as a normal movement. Range 10 km at power level 2, 100 km at 3."
 },
 {
  "id": "reflect-magic",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Reflect Magic",
  "school": "Symbolism",
  "rank": 4,
  "prerequisite": "Retribution Rune",
  "requirements": [
   "symbol"
  ],
  "castingTime": "action/stretch/shift",
  "range": "Personal",
  "duration": "Round/stretch/shift",
  "page": 92,
  "self": true,
  "source": "magic",
  "text": "Spells cast on the protected person (you included) by another mage get one bane per power level; if such a spell fails, its caster suffers its effect instead (GM rules on unclear cases)."
 },
 {
  "id": "petrify",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Petrify",
  "school": "Symbolism",
  "rank": 5,
  "prerequisite": "Blind",
  "requirements": [
   "symbol"
  ],
  "castingTime": "action/stretch/shift",
  "range": "20 meters",
  "duration": "Round/stretch/shift",
  "page": 93,
  "seeTrigger": true,
  "source": "magic",
  "text": "Anyone but you who sees it must pass a WIL roll — boon at power level 1, normal at 2, bane at 3 — or turn to stone with their gear for the duration: no moving, acting or speaking, but armor rating 10. No effect on monsters or undead."
 },
 {
  "id": "raise-fortress",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Raise Fortress",
  "school": "Symbolism",
  "rank": 5,
  "prerequisite": "Golem",
  "requirements": [
   "symbol"
  ],
  "castingTime": "shift",
  "range": "Touch",
  "duration": "Shift",
  "page": 93,
  "source": "magic",
  "text": "Carve symbols into living rock to raise a stone structure: a small cottage at power level 1, a two-storey tower at 2, a walled castle at 3. Walls have armor rating 10 × power level and withstand 20 damage per power level before collapsing. It crumbles to sand when the spell ends."
 },
 {
  "id": "runic-prison",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Runic Prison",
  "school": "Symbolism",
  "rank": 5,
  "prerequisite": "Portal",
  "requirements": [
   "symbol"
  ],
  "castingTime": "stretch/shift",
  "range": "20 meters",
  "duration": "Stretch/shift",
  "page": 93,
  "seeTrigger": true,
  "source": "magic",
  "text": "Draw or carve a symbol containing a creature's name; if that creature sees it, it must pass a WIL roll — boon at power level 1, normal at 2, bane at 3 — or be drawn into the symbol with its gear for the duration. The symbol can be made on a portable object. Made permanent with Permanence, the prisoner doesn't age. No effect on monsters or undead."
 },
 {
  "id": "animal-sense",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Animal Sense",
  "school": "Witchcraft",
  "rank": 1,
  "prerequisite": "Witchcraft",
  "requirements": [
   "word"
  ],
  "castingTime": "action",
  "range": "30 meters",
  "duration": "Concentration",
  "page": 98,
  "text": "Take over the body of a common animal (core p.99) in range. It may roam 30 m from your body at power level 1, 300 m at 2, unlimited at 3. It won't act against its nature or fight for you. You can't speak or use your own skills — use the animal's stats. If the animal dies during the spell, you take damage equal to the power level.",
  "selfDamage": "power level (if the animal is killed)",
  "source": "magic"
 },
 {
  "id": "augury",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Augury",
  "school": "Witchcraft",
  "rank": 1,
  "prerequisite": "Witchcraft",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "stretch",
  "range": "Personal",
  "duration": "Instant",
  "page": 98,
  "text": "Ask the GM one question per power level about the coming day; each is answered truthfully with yes, no or uncertain.",
  "self": true,
  "questions": "power level",
  "source": "magic"
 },
 {
  "id": "helper",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Helper",
  "school": "Witchcraft",
  "rank": 1,
  "prerequisite": "Witchcraft",
  "requirements": [
   "word",
   "ingredient"
  ],
  "requirementDetail": "simple materials such as sticks, moss and candles",
  "castingTime": "action",
  "range": "Touch",
  "duration": "Stretch",
  "page": 98,
  "text": "Build a knee-high servant that obeys you and does simple tasks needing no skill rolls; it must stay within 50 m of you. Lasts a shift at power level 2, a day at 3. Only one at a time; it collapses into kindling when the spell ends.",
  "durationByLevel": {
   "1": "Stretch",
   "2": "Shift",
   "3": "Day"
  },
  "source": "magic"
 },
 {
  "id": "protective-aura",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Protective Aura",
  "school": "Witchcraft",
  "rank": 1,
  "prerequisite": "Witchcraft",
  "requirements": [
   "word"
  ],
  "castingTime": "action",
  "range": "Personal",
  "duration": "Round",
  "page": 98,
  "text": "A living creature wanting to attack you must first pass a WIL roll (not an action) or pick another target or not attack. Lasts a stretch at power level 2, a shift at 3. Demons, monsters and undead are unaffected.",
  "self": true,
  "durationByLevel": {
   "1": "Round",
   "2": "Stretch",
   "3": "Shift"
  },
  "source": "magic"
 },
 {
  "id": "witch-mark",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Witch Mark",
  "school": "Witchcraft",
  "rank": 1,
  "prerequisite": "Witchcraft",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Stretch",
  "page": 98,
  "text": "An invisible mark gives the target a bane on WIL rolls to resist fear. Power level 2: bane on all WIL rolls. Power level 3: also lasts a shift. Only one Witch Mark per victim.",
  "source": "magic"
 },
 {
  "id": "bestial-traits",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Bestial Traits",
  "school": "Witchcraft",
  "rank": 2,
  "prerequisite": "Animal Sense",
  "requirements": [
   "word"
  ],
  "castingTime": "action",
  "range": "Personal",
  "duration": "Stretch",
  "page": 99,
  "text": "Gain one animal trait per power level from the list. Can't be recast while active.",
  "self": true,
  "picks": "power level",
  "options": [
   {
    "name": "Claws",
    "text": "Unarmed attacks deal 2D6 slashing damage.",
    "unarmed": {
     "damage": "2D6",
     "type": "slashing"
    }
   },
   {
    "name": "Fangs",
    "text": "Unarmed attacks deal D8 piercing damage plus paralyzing poison (potency 12).",
    "unarmed": {
     "damage": "D8",
     "type": "piercing"
    },
    "poison": {
     "type": "paralyzing",
     "potency": 12
    }
   },
   {
    "name": "Fur or Feathers",
    "text": "Automatically resist cold (core p.54)."
   },
   {
    "name": "Gills and Webbing",
    "text": "Breathe underwater; boon on all Swimming rolls.",
    "boon": [
     "Swimming"
    ]
   },
   {
    "name": "Night Vision",
    "text": "Unaffected by total darkness (core p.52)."
   },
   {
    "name": "Scales",
    "text": "Armor rating 3; doesn't stack with worn armor.",
    "armor": 3
   }
  ],
  "source": "magic"
 },
 {
  "id": "curse",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Curse",
  "school": "Witchcraft",
  "rank": 2,
  "prerequisite": "Protective Aura or Witch Mark",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Stretch",
  "page": 100,
  "text": "Point and curse a creature. Opposed roll vs the target's WIL (target has a boon at power level 1, normal at 2, a bane at 3). On success the target has a bane on all skill rolls for a stretch. Can't be cursed again while cursed. No effect on monsters.",
  "opposed": {
   "attribute": "WIL",
   "targetRoll": {
    "1": "boon",
    "2": "normal",
    "3": "bane"
   }
  },
  "noMonsters": true,
  "source": "magic"
 },
 {
  "id": "fury-of-the-wild",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Fury of the Wild",
  "school": "Witchcraft",
  "rank": 2,
  "prerequisite": "Helper",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Stretch",
  "page": 100,
  "text": "Up to one common mammal or bird per power level turns aggressive and attacks the nearest enemy; you don't choose their targets. No effect on monsters.",
  "noMonsters": true,
  "source": "magic"
 },
 {
  "id": "soothsaying",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Soothsaying",
  "school": "Witchcraft",
  "rank": 2,
  "prerequisite": "Augury",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "stretch",
  "range": "Personal",
  "duration": "Instant",
  "page": 100,
  "text": "Ask the GM one question per power level about the current adventure, people or creatures you meet, or where you are. Answers may be cryptic but are true once understood.",
  "self": true,
  "questions": "power level",
  "source": "magic"
 },
 {
  "id": "bestial-helper",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Bestial Helper",
  "school": "Witchcraft",
  "rank": 3,
  "prerequisite": "Fury of the Wild",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "Personal",
  "duration": "Stretch",
  "page": 100,
  "text": "Bring forth a monstrous, animal-like servant from your own flesh and blood; casting costs D6 HP (armor doesn't help). It obeys you and fights for you, with dog stats at power level 1, boar at 2, bear at 3 (core p.99). Anyone it attacks suffers a fear attack. Only one at a time; it melts away when the spell ends.",
  "selfDamage": "D6",
  "ignoresArmor": true,
  "summon": {
   "1": "Dog",
   "2": "Boar",
   "3": "Bear"
  },
  "fearAttack": true,
  "source": "magic"
 },
 {
  "id": "hex",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Hex",
  "school": "Witchcraft",
  "rank": 3,
  "prerequisite": "Curse",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Stretch",
  "page": 100,
  "text": "Point and hex a creature. Opposed roll vs the target's WIL (target has a boon at power level 1, normal at 2, a bane at 3). On success the target loses 2D6 WP and has a bane on all skill rolls for a stretch. Can't be hexed twice at once, but Curse and Hex together give two banes. No effect on monsters.",
  "opposed": {
   "attribute": "WIL",
   "targetRoll": {
    "1": "boon",
    "2": "normal",
    "3": "bane"
   }
  },
  "wpDamage": "2D6",
  "noMonsters": true,
  "source": "magic"
 },
 {
  "id": "safe-travels",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Safe Travels",
  "school": "Witchcraft",
  "rank": 3,
  "prerequisite": "Soothsaying",
  "requirements": [
   "word"
  ],
  "castingTime": "stretch",
  "range": "Touch",
  "duration": "Instant",
  "page": 100,
  "text": "Wish someone a safe trip. Sincere: the GM rolls the next random encounter twice and takes the better result. Ironic: twice, taking the worse. Affects one encounter per power level. Cast on your own companions to help yourself.",
  "encounters": "power level",
  "source": "magic"
 },
 {
  "id": "shapeshift",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Shapeshift",
  "school": "Witchcraft",
  "rank": 3,
  "prerequisite": "Bestial Traits",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "Personal",
  "duration": "Stretch",
  "page": 101,
  "text": "Turn into a mammal from the core animal table (p.99): take its stats and attacks but keep your skill levels, heroic abilities and damage taken. You can't speak and INT-based skill rolls get a bane. Lasts a shift at power level 2, a week at 3. Ending it early means recasting at the same power level.",
  "self": true,
  "durationByLevel": {
   "1": "Stretch",
   "2": "Shift",
   "3": "Week"
  },
  "source": "magic"
 },
 {
  "id": "animate-object",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Animate Object",
  "school": "Witchcraft",
  "rank": 4,
  "prerequisite": "Hex",
  "requirements": [
   "word",
   "gesture",
   "focus"
  ],
  "castingTime": "action",
  "range": "Touch",
  "duration": "Stretch",
  "page": 101,
  "text": "Animate an object such as a broom so it carries you 20 m per movement, on your turn. Each power level above 1 adds one: it can fly; it carries up to four people; the duration becomes a shift.",
  "movement": 20,
  "perExtraLevel": [
   "The object can fly",
   "Carries up to four people",
   "Duration becomes a shift"
  ],
  "source": "magic"
 },
 {
  "id": "compulsion",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Compulsion",
  "school": "Witchcraft",
  "rank": 4,
  "prerequisite": "Hex",
  "requirements": [
   "word",
   "gesture",
   "ingredient"
  ],
  "requirementDetail": "a lock of hair or an item belonging to the victim",
  "castingTime": "stretch",
  "range": "100 meters",
  "duration": "Day",
  "page": 102,
  "text": "Speak a command. Opposed roll vs the target's WIL (target has a boon at power level 1, normal at 2, a bane at 3). On success the target must carry out the command during the coming day. Can't compel killing. No effect on monsters.",
  "opposed": {
   "attribute": "WIL",
   "targetRoll": {
    "1": "boon",
    "2": "normal",
    "3": "bane"
   }
  },
  "noMonsters": true,
  "source": "magic"
 },
 {
  "id": "flattery",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Flattery",
  "school": "Witchcraft",
  "rank": 4,
  "prerequisite": "Safe Travels",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Concentration",
  "page": 102,
  "text": "Shower a living creature with praise: it gets one boon per power level on all skill rolls while you keep concentrating and flattering.",
  "boons": "power level",
  "source": "magic"
 },
 {
  "id": "monster-whisperer",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Monster Whisperer",
  "school": "Witchcraft",
  "rank": 4,
  "prerequisite": "Shapeshift",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "10 meters",
  "duration": "Instant",
  "page": 102,
  "text": "Influence a monster's next attack: either choose its target (must be within the attack's reach) or have the GM reroll the monster attack (the reroll stands). Power level 2: both. Power level 3: two rerolls. Can't make it attack itself or an object.",
  "source": "magic"
 },
 {
  "id": "doomsday-prophecy",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Doomsday Prophecy",
  "school": "Witchcraft",
  "rank": 5,
  "prerequisite": "Compulsion",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Stretch",
  "page": 102,
  "text": "Call nature spirits' judgment on a creature; it can't resist except by magic. Power level 1: bane on all skill rolls. Power level 2: also takes double damage from all attacks (before armor). Power level 3: also can't roll dragons. Can't be stacked on itself but stacks with Curse and Hex. No effect on monsters.",
  "noResist": true,
  "noMonsters": true,
  "source": "magic"
 },
 {
  "id": "monster-form",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Monster Form",
  "school": "Witchcraft",
  "rank": 5,
  "prerequisite": "Monster Whisperer",
  "requirements": [
   "gesture"
  ],
  "castingTime": "action",
  "range": "Personal",
  "duration": "Permanent",
  "page": 102,
  "text": "Become a monster (with monster attacks) from the Rulebook or Bestiary: up to 20 HP at power level 1, 40 at 2, 60 at 3. Not dragons, demons, undead or humanoids. Damage taken carries over. Use the monster rules (core p.83) and its stats; pick monster attacks freely but never the same one twice in a row, or take other sensible actions. You keep INT-based skills, but if the monster can't speak you lose speech and those rolls get a bane. Recast to change back.",
  "self": true,
  "maxHpByLevel": {
   "1": 20,
   "2": 40,
   "3": 60
  },
  "source": "magic"
 },
 {
  "id": "monster-warden",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Monster Warden",
  "school": "Witchcraft",
  "rank": 5,
  "prerequisite": "Monster Whisperer",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "stretch",
  "range": "30 meters",
  "duration": "Shift",
  "page": 103,
  "text": "Bind a monster in range to guard a place you can see against intruders you define. Max monster HP 20 at power level 1, 40 at 2, 60 at 3. Bane if the place is its own lair. Ends at once if you or your companions harm it. No effect on demons, dragons or undead.",
  "maxHpByLevel": {
   "1": 20,
   "2": 40,
   "3": 60
  },
  "ritual": true,
  "source": "magic"
 },
 {
  "id": "polymorph",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Polymorph",
  "school": "Witchcraft",
  "rank": 5,
  "prerequisite": "Animate Object",
  "requirements": [
   "word",
   "gesture"
  ],
  "castingTime": "action",
  "range": "20 meters",
  "duration": "Shift",
  "page": 103,
  "text": "Turn a living humanoid into a small harmless critter (toad, snake, mouse, big insect…). Opposed roll vs the target's WIL (target has a boon at power level 1, normal at 2, a bane at 3). On success it has 1 HP, Movement 6, Sneaking 15 and Evade 15, can't speak or use other skills. At 0 HP it stays transformed and makes death rolls with its own CON. No effect on monsters or undead.",
  "opposed": {
   "attribute": "WIL",
   "targetRoll": {
    "1": "boon",
    "2": "normal",
    "3": "bane"
   }
  },
  "noMonsters": true,
  "transformedStats": {
   "hp": 1,
   "movement": 6,
   "skills": {
    "Sneaking": 15,
    "Evade": 15
   }
  },
  "source": "magic"
 },
 {
  "id": "concealing",
  "powerLevels": false,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Concealing",
  "rank": 1,
  "prerequisite": "Enchanting",
  "page": 119,
  "castOn": [
   "leather armor",
   "clothing"
  ],
  "buff": {
   "boon": [
    "Sneaking"
   ]
  },
  "text": "Leather armor or clothing only. The wearer gets a boon on Sneaking."
 },
 {
  "id": "farshot",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Farshot",
  "rank": 1,
  "prerequisite": "Enchanting",
  "page": 119,
  "castOn": [
   "sling",
   "bow",
   "crossbow",
   "quiver"
  ],
  "buff": {
   "rangeMultiplier": "×2 / ×3 / ×4 by power level"
  },
  "text": "Slings, bows, crossbows or quivers only. The weapon's range (or of arrows from the quiver) is doubled at power level 1, tripled at 2, quadrupled at 3."
 },
 {
  "id": "keen-edge",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Keen Edge",
  "rank": 1,
  "prerequisite": "Enchanting",
  "page": 119,
  "castOn": [
   "slashing weapon",
   "piercing weapon",
   "quiver"
  ],
  "buff": {
   "armorPierce": "1 step per power level"
  },
  "text": "Slashing or piercing weapons, or a quiver. Worn or natural armor hit by the weapon (or its arrows) counts as one step lower per power level, minimum zero."
 },
 {
  "id": "luminous",
  "powerLevels": false,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Luminous",
  "rank": 1,
  "prerequisite": "Enchanting",
  "page": 119,
  "castOn": [
   "any item"
  ],
  "text": "Choose a type of non-human creature (e.g. elves, dwarves, halflings, wolfkin, nightkin, undead, dragons, demons). The item glows brightly whenever one is within 30 meters."
 },
 {
  "id": "supple-armor",
  "powerLevels": false,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Supple Armor",
  "rank": 1,
  "prerequisite": "Enchanting",
  "page": 120,
  "castOn": [
   "metal armor"
  ],
  "buff": {
   "removeArmorBane": [
    "Evade"
   ]
  },
  "text": "Metal armor (chainmail, plate…) only. The wearer no longer suffers the armor's bane on Evade."
 },
 {
  "id": "thinking-cap",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Thinking Cap",
  "rank": 1,
  "prerequisite": "Enchanting",
  "page": 120,
  "castOn": [
   "helmet",
   "hat",
   "headwear"
  ],
  "buff": {
   "boonChoices": "one per power level",
   "options": [
    "Beast Lore",
    "Languages",
    "Myths & Legends",
    "any INT-based secondary skill (not magic schools)"
   ]
  },
  "text": "Cast on a hat, helmet or other headwear. Per power level, the wearer gains a boon on one skill chosen from Beast Lore, Languages, Myths & Legends or any INT-based secondary skill except a school of magic."
 },
 {
  "id": "unbreakable",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Unbreakable",
  "rank": 1,
  "prerequisite": "Enchanting",
  "page": 120,
  "castOn": [
   "weapon",
   "shield"
  ],
  "buff": {
   "durability": "+9 per power level"
  },
  "text": "Weapons and shields only. Durability +9 per power level."
 },
 {
  "id": "warming",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Warming",
  "rank": 1,
  "prerequisite": "Enchanting",
  "page": 120,
  "castOn": [
   "clothing",
   "armor"
  ],
  "buff": {
   "armorVs": {
    "cold": "6 per power level"
   },
   "immune": [
    "cold effects"
   ]
  },
  "text": "Clothing or armor only. The wearer gains armor rating 6 per power level against cold damage (magical cold too), on top of normal armor, and is immune to the effects of cold (Rulebook p.54)."
 },
 {
  "id": "bane-weapon",
  "powerLevels": false,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Bane Weapon",
  "rank": 2,
  "prerequisite": "Luminous",
  "page": 120,
  "castOn": [
   "weapon",
   "shield",
   "quiver"
  ],
  "buff": {
   "boonVsCreatureType": true
  },
  "text": "Weapons, shields or quivers. Choose a non-human creature type (elves, dwarves, halflings, wolfkin, nightkin, undead, dragons, demons…): all attacks and parries with the item against that type get a boon."
 },
 {
  "id": "bleeding-weapon",
  "powerLevels": false,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Bleeding Weapon",
  "rank": 2,
  "prerequisite": "Keen Edge",
  "page": 120,
  "castOn": [
   "slashing weapon",
   "piercing weapon",
   "quiver"
  ],
  "onHit": {
   "bleed": 1
  },
  "text": "Slashing or piercing weapons, or a quiver. A living target damaged by it bleeds for 1 damage on each of its turns until it reaches 0 HP or someone (even the victim) stanches it with a successful Healing roll."
 },
 {
  "id": "dread-weapon",
  "powerLevels": false,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Dread Weapon",
  "rank": 2,
  "prerequisite": "Farshot",
  "page": 120,
  "castOn": [
   "weapon",
   "quiver"
  ],
  "onHit": {
   "fear": "WIL roll or Fear Table"
  },
  "text": "Weapons or quivers. A living target damaged by it must pass a WIL roll or roll on the Fear Table (Rulebook p.53)."
 },
 {
  "id": "fireproof",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Fireproof",
  "rank": 2,
  "prerequisite": "Warming",
  "page": 120,
  "castOn": [
   "clothing",
   "armor"
  ],
  "buff": {
   "armorVs": {
    "fire": "6 per power level"
   }
  },
  "text": "Clothing or armor only. The wearer gains armor rating 6 per power level against fire and heat damage (magical fire too), on top of normal armor."
 },
 {
  "id": "fleet-step",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Fleet Step",
  "rank": 2,
  "prerequisite": "Concealing or Supple Armor",
  "page": 120,
  "castOn": [
   "clothing (usually shoes or boots)"
  ],
  "buff": {
   "movement": "+4 per power level"
  },
  "text": "Clothing, usually footwear. The wearer's Movement increases by 4 per power level."
 },
 {
  "id": "heroism",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Heroism",
  "rank": 2,
  "prerequisite": "Thinking Cap",
  "page": 120,
  "castOn": [
   "worn item"
  ],
  "buff": {
   "ignoreConditions": "one per power level"
  },
  "mustBeWorn": true,
  "text": "The wearer ignores the effects of one condition per power level — they can still have it, but suffer no penalty. Must be worn as intended (helmet on head, ring on finger)."
 },
 {
  "id": "poison-sting",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Poison Sting",
  "rank": 2,
  "prerequisite": "Unbreakable",
  "page": 120,
  "castOn": [
   "slashing weapon",
   "piercing weapon",
   "quiver"
  ],
  "onHit": {
   "poison": {
    "type": "chosen when cast",
    "potency": "12, +3 per extra power level"
   }
  },
  "text": "Slashing or piercing weapons, or a quiver. A living target damaged by it is poisoned with a type chosen at casting; potency 12, +3 per extra power level."
 },
 {
  "id": "bloodsucker",
  "powerLevels": false,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Bloodsucker",
  "rank": 3,
  "prerequisite": "Bleeding Weapon",
  "page": 121,
  "castOn": [
   "slashing melee weapon",
   "piercing melee weapon"
  ],
  "onHit": {
   "wpDrain": "half damage, rounded up"
  },
  "text": "Slashing or piercing melee weapons. When it damages a living target, the victim loses WP equal to half the damage (round up) and the wielder regains that much spent WP (up to max)."
 },
 {
  "id": "enchanted-weapon",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Enchanted Weapon",
  "rank": 3,
  "prerequisite": "Bane Weapon or Dread Weapon",
  "page": 121,
  "castOn": [
   "weapon",
   "shield",
   "quiver"
  ],
  "buff": {
   "dragonRange": "1–2, +1 per extra power level"
  },
  "text": "Weapons, shields or quivers. Attack or parry rolls of 1–2 with it count as a Dragon; 1–3 at power level 2, 1–4 at 3."
 },
 {
  "id": "garment-of-strength",
  "powerLevels": false,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Garment of Strength",
  "rank": 3,
  "prerequisite": "Fleet Step",
  "page": 121,
  "castOn": [
   "clothing",
   "armor"
  ],
  "buff": {
   "strSetTo": 18,
   "damageBonus": "D6",
   "carryingCapacity": 9
  },
  "text": "Clothing or armor. While worn, your STR counts as 18: damage bonus +D6 and carrying capacity 9. STR-based skills don't change."
 },
 {
  "id": "hidden-weapon",
  "powerLevels": true,
  "dodge": true,
  "parry": true,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Hidden Weapon",
  "rank": 3,
  "prerequisite": "Poison Sting",
  "page": 121,
  "activated": true,
  "castOn": [
   "non-weapon item (clothing, box, chest…)"
  ],
  "hiddenWeapon": [
   {
    "level": 1,
    "as": "Dagger",
    "damage": "D8"
   },
   {
    "level": 2,
    "as": "Short Spear",
    "damage": "D10"
   },
   {
    "level": 3,
    "as": "Short Bow",
    "damage": "D10",
    "range": 30
   }
  ],
  "text": "Non-weapon items only. On command (an action) a concealed weapon springs out and attacks, hitting automatically but dodgeable/parryable: dagger D8 at power level 1, short spear D10 at 2, short bow D10 range 30 m at 3. No damage bonus, can't parry, undetectable while hidden. Weapon enchantments can also be applied to the hidden weapon."
 },
 {
  "id": "magic-wand",
  "powerLevels": false,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Magic Wand",
  "rank": 3,
  "prerequisite": "Heroism",
  "page": 121,
  "castOn": [
   "staff",
   "wand"
  ],
  "buff": {
   "boonOnSchool": "chosen school of magic"
  },
  "text": "Staff or wand only. The user gets a boon on all rolls for one chosen school of magic."
 },
 {
  "id": "resonant-plate",
  "powerLevels": false,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Resonant Plate",
  "rank": 3,
  "prerequisite": "Fireproof",
  "page": 121,
  "castOn": [
   "plate armor"
  ],
  "text": "Plate armor only. When the wearer is hit in melee, the armor booms: everyone else within 6 meters becomes Dazed (if not already). Monsters are immune."
 },
 {
  "id": "endless-capacity",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Endless Capacity",
  "rank": 4,
  "prerequisite": "Magic Wand",
  "page": 121,
  "castOn": [
   "storage item (bottle, chest, barrel, backpack…)"
  ],
  "buff": {
   "capacity": "×10 per power level"
  },
  "text": "Containers only. Storage capacity is multiplied by 10 per power level."
 },
 {
  "id": "heavy-hitter",
  "powerLevels": false,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Heavy Hitter",
  "rank": 4,
  "prerequisite": "Enchanted Weapon",
  "page": 121,
  "castOn": [
   "bludgeoning weapon"
  ],
  "onHit": {
   "conditions": [
    "Dazed"
   ]
  },
  "text": "Bludgeoning weapons only. A living target damaged by it becomes Dazed."
 },
 {
  "id": "lifesaver",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Lifesaver",
  "rank": 4,
  "prerequisite": "Garment of Strength or Resonant Plate",
  "page": 121,
  "castOn": [
   "worn item"
  ],
  "buff": {
   "deathRollBoons": "one per power level"
  },
  "mustBeWorn": true,
  "text": "The wearer gets a boon per power level on death rolls (Rulebook p.50). Must be worn as intended (armor on body, amulet round neck)."
 },
 {
  "id": "seeking-arrow",
  "powerLevels": false,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Seeking Arrow",
  "rank": 4,
  "prerequisite": "Enchanted Weapon",
  "page": 121,
  "castOn": [
   "sling",
   "bow",
   "crossbow",
   "quiver"
  ],
  "buff": {
   "ignoreBanes": true
  },
  "text": "Slings, bows, crossbows or quivers. Attacks with it ignore banes; only boons apply."
 },
 {
  "id": "swift-swing",
  "powerLevels": false,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Swift Swing",
  "rank": 4,
  "prerequisite": "Enchanted Weapon",
  "page": 121,
  "castOn": [
   "weapon"
  ],
  "text": "Weapons only. When an attack with it drops a target to zero HP, the wielder may immediately make another attack."
 },
 {
  "id": "throwable",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Throwable",
  "rank": 4,
  "prerequisite": "Enchanted Weapon",
  "page": 122,
  "activated": true,
  "castOn": [
   "melee weapon"
  ],
  "buff": {
   "thrownRange": "STR × power level meters"
  },
  "text": "Melee weapons only. It can be thrown as a ranged attack up to STR × power level meters and flies back to the thrower's hand afterwards."
 },
 {
  "id": "epic-armor",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Epic Armor",
  "rank": 5,
  "prerequisite": "Lifesaver",
  "page": 122,
  "castOn": [
   "armor",
   "helmet"
  ],
  "buff": {
   "armor": "+1 per power level"
  },
  "text": "Armor and helmets only. Armor rating +1 per power level."
 },
 {
  "id": "epic-weapon",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Epic Weapon",
  "rank": 5,
  "prerequisite": "Heavy Hitter, Seeking Arrow, Swift Swing or Throwable",
  "page": 122,
  "castOn": [
   "weapon"
  ],
  "buff": {
   "damage": "+2 per power level"
  },
  "text": "Weapons only. All attacks with it deal +2 damage per power level."
 },
 {
  "id": "power-item",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "school": "Enchanting",
  "requirements": [
   "tools"
  ],
  "requirementDetail": "blacksmithing, carpentry or tanning tools, depending on the item",
  "castingTime": "stretch",
  "range": "Item",
  "duration": "Shift",
  "enchantment": true,
  "source": "magic",
  "name": "Power Item",
  "rank": 5,
  "prerequisite": "Lifesaver",
  "page": 122,
  "castOn": [
   "worn item (often headwear or jewelry)"
  ],
  "buff": {
   "maxWp": "+2 per power level"
  },
  "mustBeWorn": true,
  "text": "Usually headwear or jewelry. Max WP +2 per power level while worn as intended."
 },
 {
  "id": "astral-form",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "school": "Dracomancy",
  "rank": 6,
  "prerequisite": "Any rank 5 spell",
  "castingTime": "action",
  "wpPerPowerLevel": 6,
  "source": "magic",
  "name": "Astral Form",
  "requirements": [
   "word"
  ],
  "range": "Personal",
  "duration": "Shift",
  "page": 133,
  "self": true,
  "text": "Leave your body as an astral self that flies through air and solid matter at 20 m per round (double when dashing), doubling per power level beyond the first. You can see and hear and pass through anything but metal, but can't interact or communicate. Your body lies unconscious (you sense vaguely what happens to it); returning is an action. If your body dies meanwhile, you become a ghost (Rulebook p.87)."
 },
 {
  "id": "command-dragon",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "school": "Dracomancy",
  "rank": 6,
  "prerequisite": "Any rank 5 spell",
  "castingTime": "action",
  "wpPerPowerLevel": 6,
  "source": "magic",
  "name": "Command Dragon",
  "requirements": [
   "word",
   "gesture"
  ],
  "range": "20 meters",
  "duration": "Instant",
  "page": 133,
  "text": "Take brief control of a dragon: hatchling or young dragon at power level 1, adult at 2, ancient at 3. On success it immediately makes one move and one monster attack of your choice, then loses its next turn."
 },
 {
  "id": "create",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "school": "Dracomancy",
  "rank": 6,
  "prerequisite": "Any rank 5 spell",
  "castingTime": "action",
  "wpPerPowerLevel": 6,
  "source": "magic",
  "name": "Create",
  "requirements": [
   "word",
   "gesture"
  ],
  "range": "4 meters",
  "duration": "Permanent",
  "page": 134,
  "text": "Permanently conjure a generic inanimate object, weapons and tools included — not a specific item (like the key to a particular lock), gems, precious metals (copper, silver, gold) or anything of purely monetary value. Max size Normal at power level 1, Large at 2, Huge at 3 (Rulebook p.83)."
 },
 {
  "id": "draconic-push",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "school": "Dracomancy",
  "rank": 6,
  "prerequisite": "Any rank 5 spell",
  "castingTime": "action",
  "wpPerPowerLevel": 6,
  "source": "magic",
  "name": "Draconic Push",
  "requirements": [
   "word",
   "gesture"
  ],
  "range": "10 meters",
  "duration": "Instant",
  "page": 134,
  "damage": {
   "base": "2D8",
   "perLevel": "D8",
   "type": "bludgeoning"
  },
  "area": true,
  "affectsMonsters": true,
  "text": "A shockwave throws every creature within range — friend or foe, monsters included, any size — 2D8 meters (roll per target); they land prone and take bludgeoning damage equal to meters thrown. Can't be dodged. 3D8 at power level 2, 4D8 at 3."
 },
 {
  "id": "erase",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "school": "Dracomancy",
  "rank": 6,
  "prerequisite": "Any rank 5 spell",
  "castingTime": "action",
  "wpPerPowerLevel": 6,
  "source": "magic",
  "name": "Erase",
  "requirements": [
   "word",
   "gesture"
  ],
  "range": "4 meters",
  "duration": "Permanent",
  "page": 135,
  "opposed": "WIL (monsters WIL 15 unless stated)",
  "text": "A physical object or creature ceases to exist. A living creature needs an opposed roll vs its WIL (monsters WIL 15 unless stated); a magic item gives a bane. Max size Normal at power level 1, Large at 2, Huge at 3."
 },
 {
  "id": "force-field",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "school": "Dracomancy",
  "rank": 6,
  "prerequisite": "Any rank 5 spell",
  "castingTime": "action",
  "wpPerPowerLevel": 6,
  "source": "magic",
  "name": "Force Field",
  "requirements": [
   "word",
   "gesture"
  ],
  "range": "Personal",
  "duration": "Stretch",
  "page": 135,
  "text": "A stationary energy barrier surrounds you; no physical object (you included) can cross it, and it blocks teleportation. Covers a building at power level 2, a whole city at 3. One extra power level extends it to a shift. Only a dracomancer can undo it, with Counter Ritual and a Dracomancy roll."
 },
 {
  "id": "freeze-time",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "school": "Dracomancy",
  "rank": 6,
  "prerequisite": "Any rank 5 spell",
  "castingTime": "action",
  "wpPerPowerLevel": 6,
  "source": "magic",
  "name": "Freeze Time",
  "requirements": [
   "word",
   "gesture"
  ],
  "range": "Personal",
  "duration": "Two rounds",
  "page": 135,
  "self": true,
  "text": "Time all but stops around you: for two rounds nobody else may act, not even with reactions. Each extra power level either brings another person within 10 m into the bubble, or extends the duration — a stretch with one extra level, a shift with two."
 },
 {
  "id": "reshape",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "school": "Dracomancy",
  "rank": 6,
  "prerequisite": "Any rank 5 spell",
  "castingTime": "action",
  "wpPerPowerLevel": 6,
  "source": "magic",
  "name": "Reshape",
  "requirements": [
   "word",
   "gesture"
  ],
  "range": "Touch",
  "duration": "Permanent",
  "page": 135,
  "opposed": "WIL (monsters WIL 15 unless stated) if unwilling",
  "text": "Permanently transform an object or creature — e.g. change someone's looks or kin (innate ability included) or turn a sword into a shovel. Unwilling creatures get an opposed WIL roll (monsters WIL 15 unless stated). Max size Small at power level 1, Normal at 2, Large at 3. Result must be the same material and roughly the same size; GM rules on edge cases."
 },
 {
  "id": "reverse-time",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "school": "Dracomancy",
  "rank": 6,
  "prerequisite": "Any rank 5 spell",
  "castingTime": "action",
  "wpPerPowerLevel": 6,
  "source": "magic",
  "name": "Reverse Time",
  "requirements": [
   "word",
   "gesture"
  ],
  "range": "Personal",
  "duration": "Instant",
  "page": 135,
  "text": "Undo the last round entirely: the dead live, lost HP and WP return, everyone and everything goes back to its prior state, and play resumes from there. Rewinds a stretch at power level 2 and a shift at 3. The GM settles disputes about the earlier state."
 },
 {
  "id": "translocate",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "school": "Dracomancy",
  "rank": 6,
  "prerequisite": "Any rank 5 spell",
  "castingTime": "action",
  "wpPerPowerLevel": 6,
  "source": "magic",
  "name": "Translocate",
  "requirements": [
   "word",
   "gesture"
  ],
  "range": "10 meters",
  "duration": "Instant",
  "page": 135,
  "opposed": "WIL (monsters WIL 15 unless stated) if unwilling",
  "text": "Teleport another creature or object (up to Normal size) in range to any point within 1 km that you can see or have visited. Unwilling creatures need an opposed WIL roll (monsters WIL 15 unless stated). Each extra power level raises the size one step (Large, then Huge) or multiplies the range by 10."
 },
 {
  "id": "focus-tonic",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Focus Tonic",
  "school": "Alchemy",
  "rank": 1,
  "prerequisite": "Alchemy",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "General Herbs, Wolf Blood",
  "castingTime": "shift",
  "range": "—",
  "duration": "Until used",
  "page": 110,
  "text": "Removes the Dazed condition.",
  "recipe": true,
  "ingredients": [
   "General Herbs",
   "Wolf Blood"
  ],
  "product": "Focus Tonic",
  "source": "magic"
 },
 {
  "id": "herbal-concoction",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Herbal Concoction",
  "school": "Alchemy",
  "rank": 1,
  "prerequisite": "Alchemy",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "General Herbs",
  "castingTime": "shift",
  "range": "—",
  "duration": "Until used",
  "page": 110,
  "text": "Boon on Healing rolls to treat someone with a disease (core p.53).",
  "recipe": true,
  "ingredients": [
   "General Herbs"
  ],
  "product": "Herbal Concoction",
  "source": "magic"
 },
 {
  "id": "invigorating-decoction",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Invigorating Decoction",
  "school": "Alchemy",
  "rank": 1,
  "prerequisite": "Alchemy",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "General Herbs, Boar Tusk",
  "castingTime": "shift",
  "range": "—",
  "duration": "Until used",
  "page": 110,
  "text": "Removes the Exhausted condition.",
  "recipe": true,
  "ingredients": [
   "General Herbs",
   "Boar Tusk"
  ],
  "product": "Invigorating Decoction",
  "source": "magic"
 },
 {
  "id": "liquid-courage",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Liquid Courage",
  "school": "Alchemy",
  "rank": 1,
  "prerequisite": "Alchemy",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "General Herbs, Bear Tooth",
  "castingTime": "shift",
  "range": "—",
  "duration": "Until used",
  "page": 110,
  "text": "Removes the Scared condition.",
  "recipe": true,
  "ingredients": [
   "General Herbs",
   "Bear Tooth"
  ],
  "product": "Liquid Courage",
  "source": "magic"
 },
 {
  "id": "medicinal-water",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Medicinal Water",
  "school": "Alchemy",
  "rank": 1,
  "prerequisite": "Alchemy",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "General Herbs, Deer Antler",
  "castingTime": "shift",
  "range": "—",
  "duration": "Until used",
  "page": 110,
  "text": "Removes the Sickly condition.",
  "recipe": true,
  "ingredients": [
   "General Herbs",
   "Deer Antler"
  ],
  "product": "Medicinal Water",
  "source": "magic"
 },
 {
  "id": "sleeping-poison",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Sleeping Poison",
  "school": "Alchemy",
  "rank": 1,
  "prerequisite": "Alchemy",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "General Herbs, Spider Venom",
  "castingTime": "shift",
  "range": "—",
  "duration": "Until used",
  "page": 110,
  "text": "Sleeping poison (core poison rules) — drink it or coat a weapon. Potency 12, +3 per power level above 1.",
  "recipe": true,
  "ingredients": [
   "General Herbs",
   "Spider Venom"
  ],
  "product": "Poison, Sleeping",
  "source": "magic"
 },
 {
  "id": "soothing-brew",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Soothing Brew",
  "school": "Alchemy",
  "rank": 1,
  "prerequisite": "Alchemy",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "General Herbs, Mead",
  "castingTime": "shift",
  "range": "—",
  "duration": "Until used",
  "page": 110,
  "text": "Removes the Angry condition.",
  "recipe": true,
  "ingredients": [
   "General Herbs",
   "Mead"
  ],
  "product": "Soothing Brew",
  "source": "magic"
 },
 {
  "id": "spiritlifter",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Spiritlifter",
  "school": "Alchemy",
  "rank": 1,
  "prerequisite": "Alchemy",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "General Herbs, Sulfur",
  "castingTime": "shift",
  "range": "—",
  "duration": "Until used",
  "page": 110,
  "text": "Removes the Disheartened condition.",
  "recipe": true,
  "ingredients": [
   "General Herbs",
   "Sulfur"
  ],
  "product": "Spiritlifter",
  "source": "magic"
 },
 {
  "id": "stun-powder",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Stun Powder",
  "school": "Alchemy",
  "rank": 1,
  "prerequisite": "Alchemy",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "Saltpeter, Sulfur",
  "castingTime": "shift",
  "range": "—",
  "duration": "Until used",
  "page": 110,
  "text": "Blow it in the face of someone within 4 m with a Brawling roll; on a hit they become Dazed.",
  "recipe": true,
  "ingredients": [
   "Saltpeter",
   "Sulfur"
  ],
  "product": "Stun Powder",
  "source": "magic"
 },
 {
  "id": "antidote",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Antidote",
  "school": "Alchemy",
  "rank": 2,
  "prerequisite": "Focus Tonic, Invigorating Decoction, Medicinal Water or Soothing Brew",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "General Herbs, Sea Serpent Bile",
  "castingTime": "shift",
  "range": "—",
  "duration": "Until used",
  "page": 110,
  "text": "Negates a poison's full effect (core p.52); any limited effect still applies.",
  "recipe": true,
  "ingredients": [
   "General Herbs",
   "Sea Serpent Bile"
  ],
  "product": "Antidote",
  "source": "magic"
 },
 {
  "id": "healing-draught",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Healing Draught",
  "school": "Alchemy",
  "rank": 2,
  "prerequisite": "Herbal Concoction",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "General Herbs, Hobgoblin Blood",
  "castingTime": "shift",
  "range": "—",
  "duration": "Until used",
  "page": 110,
  "text": "Heals D6 HP at once.",
  "recipe": true,
  "ingredients": [
   "General Herbs",
   "Hobgoblin Blood"
  ],
  "product": "Healing Draught",
  "source": "magic"
 },
 {
  "id": "lock-acid",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Lock Acid",
  "school": "Alchemy",
  "rank": 2,
  "prerequisite": "Spiritlifter",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "Sulfur, Troll Bile",
  "castingTime": "shift",
  "range": "—",
  "duration": "Stretch",
  "page": 111,
  "text": "Eats through and destroys a lock or other small metal object over one stretch.",
  "recipe": true,
  "ingredients": [
   "Sulfur",
   "Troll Bile"
  ],
  "product": "Lock Acid",
  "source": "magic"
 },
 {
  "id": "love-potion",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Love Potion",
  "school": "Alchemy",
  "rank": 2,
  "prerequisite": "Liquid Courage",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "General Herbs, Nymph Tears",
  "castingTime": "shift",
  "range": "—",
  "duration": "Shift",
  "page": 111,
  "text": "For one shift, CHA-based skill rolls aimed at the drinker get a boon.",
  "recipe": true,
  "ingredients": [
   "General Herbs",
   "Nymph Tears"
  ],
  "product": "Love Potion",
  "source": "magic"
 },
 {
  "id": "paralyzing-poison",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Paralyzing Poison",
  "school": "Alchemy",
  "rank": 2,
  "prerequisite": "Sleeping Poison",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "General Herbs, Bat Blood",
  "castingTime": "shift",
  "range": "—",
  "duration": "Until used",
  "page": 111,
  "text": "Paralyzing poison (core poison rules) — drink it or coat a weapon. Potency 12, +3 per power level above 1.",
  "recipe": true,
  "ingredients": [
   "General Herbs",
   "Bat Blood"
  ],
  "product": "Poison, Paralyzing",
  "source": "magic"
 },
 {
  "id": "puff-bomb",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Puff Bomb",
  "school": "Alchemy",
  "rank": 2,
  "prerequisite": "Stun Powder",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "Charcoal, Saltpeter, Sulfur",
  "castingTime": "shift",
  "range": "—",
  "duration": "Until used",
  "page": 111,
  "text": "Throw up to STR meters (Brawling roll): D8 fire damage on a hit. Also lights a campfire.",
  "recipe": true,
  "ingredients": [
   "Charcoal",
   "Saltpeter",
   "Sulfur"
  ],
  "product": "Puff Bomb",
  "source": "magic"
 },
 {
  "id": "smokescreen",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Smokescreen",
  "school": "Alchemy",
  "rank": 2,
  "prerequisite": "Stun Powder",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "Charcoal, Saltpeter, Sulfur, Octopus Ink",
  "castingTime": "shift",
  "range": "—",
  "duration": "Until used",
  "page": 111,
  "text": "Smoke bomb thrown up to STR meters: a 4 m radius cloud blocks all sight; everyone inside acts as in total darkness (core p.52). Each round start roll D4 outdoors / D8 indoors — on a 1 it clears.",
  "recipe": true,
  "ingredients": [
   "Charcoal",
   "Saltpeter",
   "Sulfur",
   "Octopus Ink"
  ],
  "product": "Smokescreen",
  "source": "magic"
 },
 {
  "id": "corrosive-sludge",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Corrosive Sludge",
  "school": "Alchemy",
  "rank": 3,
  "prerequisite": "Lock Acid",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "Sulfur, Troll Bile, Ghoul Bone",
  "castingTime": "shift",
  "range": "—",
  "duration": "Until used",
  "page": 111,
  "text": "Thick acid thrown up to STR meters (Brawling roll): D8 damage on a hit, and worn armor permanently loses that much armor rating (natural armor unaffected).",
  "recipe": true,
  "ingredients": [
   "Sulfur",
   "Troll Bile",
   "Ghoul Bone"
  ],
  "product": "Corrosive Sludge",
  "source": "magic"
 },
 {
  "id": "drops-of-strength",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Drops of Strength",
  "school": "Alchemy",
  "rank": 3,
  "prerequisite": "Antidote",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "General Herbs, Giant Blood",
  "castingTime": "shift",
  "range": "—",
  "duration": "Shift",
  "page": 112,
  "text": "For one shift STR becomes 18 (damage bonus +D6, carrying capacity 9). Also removes Exhausted and gives a boon on all STR-based skill rolls (skill levels don't change).",
  "recipe": true,
  "ingredients": [
   "General Herbs",
   "Giant Blood"
  ],
  "product": "Drops of Strength",
  "source": "magic"
 },
 {
  "id": "elixir-of-wisdom",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Elixir of Wisdom",
  "school": "Alchemy",
  "rank": 3,
  "prerequisite": "Antidote",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "General Herbs, Troll Tooth",
  "castingTime": "shift",
  "range": "—",
  "duration": "Shift",
  "page": 112,
  "text": "Boon on all INT-based skill rolls for one shift; also removes Angry.",
  "recipe": true,
  "ingredients": [
   "General Herbs",
   "Troll Tooth"
  ],
  "product": "Elixir of Wisdom",
  "source": "magic"
 },
 {
  "id": "healing-potion",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Healing Potion",
  "school": "Alchemy",
  "rank": 3,
  "prerequisite": "Healing Draught",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "General Herbs, Troll Blood",
  "castingTime": "shift",
  "range": "—",
  "duration": "Until used",
  "page": 112,
  "text": "Heals 2D6 HP at once.",
  "recipe": true,
  "ingredients": [
   "General Herbs",
   "Troll Blood"
  ],
  "product": "Healing Potion",
  "source": "magic"
 },
 {
  "id": "lethal-poison",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Lethal Poison",
  "school": "Alchemy",
  "rank": 3,
  "prerequisite": "Paralyzing Poison",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "General Herbs, Spider Venom",
  "castingTime": "shift",
  "range": "—",
  "duration": "Until used",
  "page": 112,
  "text": "Lethal poison (core poison rules) — drink it or coat a weapon. Potency 12, +3 per power level above 1.",
  "recipe": true,
  "ingredients": [
   "General Herbs",
   "Spider Venom"
  ],
  "product": "Poison, Lethal",
  "source": "magic"
 },
 {
  "id": "nimble-nectar",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Nimble Nectar",
  "school": "Alchemy",
  "rank": 3,
  "prerequisite": "Antidote",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "General Herbs, Griffon Feather",
  "castingTime": "shift",
  "range": "—",
  "duration": "Shift",
  "page": 112,
  "text": "For one shift AGL becomes 18 (damage bonus +D6, movement adjusted per core p.25). Also removes Dazed and gives a boon on all AGL-based skill rolls (skill levels don't change).",
  "recipe": true,
  "ingredients": [
   "General Herbs",
   "Griffon Feather"
  ],
  "product": "Nimble Nectar",
  "source": "magic"
 },
 {
  "id": "sunflash",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Sunflash",
  "school": "Alchemy",
  "rank": 3,
  "prerequisite": "Puff Bomb",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "Charcoal, Saltpeter, Sulfur, Manticore Spike",
  "castingTime": "shift",
  "range": "—",
  "duration": "Until used",
  "page": 112,
  "text": "Thrown to the ground, it flashes: every unprepared creature within 10 m must pass an Evade roll (not an action) or be blinded, losing its next turn and unable to react until then. Nightkin also take D6 damage (armor doesn't help).",
  "recipe": true,
  "ingredients": [
   "Charcoal",
   "Saltpeter",
   "Sulfur",
   "Manticore Spike"
  ],
  "product": "Sunflash",
  "source": "magic"
 },
 {
  "id": "tincture-of-beauty",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Tincture of Beauty",
  "school": "Alchemy",
  "rank": 3,
  "prerequisite": "Love Potion",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "General Herbs, Vampire Blood",
  "castingTime": "shift",
  "range": "—",
  "duration": "Shift",
  "page": 112,
  "text": "Boon on all CHA-based skill rolls for one shift; also removes Disheartened.",
  "recipe": true,
  "ingredients": [
   "General Herbs",
   "Vampire Blood"
  ],
  "product": "Tincture of Beauty",
  "source": "magic"
 },
 {
  "id": "battle-fumes",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Battle Fumes",
  "school": "Alchemy",
  "rank": 4,
  "prerequisite": "Drops of Strength",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "General Herbs, Saltpeter, Sulfur, Giant Blood",
  "castingTime": "shift",
  "range": "—",
  "duration": "Shift",
  "page": 112,
  "text": "A bubbling cauldron gives off fumes for a shift; anyone who takes a stretch rest within 4 m gets a boon on all melee attacks for the next shift.",
  "recipe": true,
  "ingredients": [
   "General Herbs",
   "Saltpeter",
   "Sulfur",
   "Giant Blood"
  ],
  "product": "Battle Fumes",
  "source": "magic"
 },
 {
  "id": "explosive-orb",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Explosive Orb",
  "school": "Alchemy",
  "rank": 4,
  "prerequisite": "Sunflash",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "Charcoal, Saltpeter, Sulfur, Iron Filings",
  "castingTime": "shift",
  "range": "—",
  "duration": "Until used",
  "page": 112,
  "text": "Throw up to STR meters (Brawling roll): 3D6 bludgeoning damage to the target and everyone within 4 m of it.",
  "recipe": true,
  "ingredients": [
   "Charcoal",
   "Saltpeter",
   "Sulfur",
   "Iron Filings"
  ],
  "product": "Explosive Orb",
  "source": "magic"
 },
 {
  "id": "healing-tincture",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Healing Tincture",
  "school": "Alchemy",
  "rank": 4,
  "prerequisite": "Healing Potion",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "General Herbs, Hydra Blood",
  "castingTime": "shift",
  "range": "—",
  "duration": "Until used",
  "page": 112,
  "text": "Heals 3D6 HP and 3D6 WP at once.",
  "recipe": true,
  "ingredients": [
   "General Herbs",
   "Hydra Blood"
  ],
  "product": "Healing Tincture",
  "source": "magic"
 },
 {
  "id": "healing-vapors",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Healing Vapors",
  "school": "Alchemy",
  "rank": 4,
  "prerequisite": "Healing Potion",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "General Herbs, Saltpeter, Sulfur, Troll Blood",
  "castingTime": "shift",
  "range": "—",
  "duration": "Shift",
  "page": 113,
  "text": "A bubbling cauldron gives off healing vapors for a shift; anyone who takes a stretch rest within 4 m gets the full benefit of a shift rest.",
  "recipe": true,
  "ingredients": [
   "General Herbs",
   "Saltpeter",
   "Sulfur",
   "Troll Blood"
  ],
  "product": "Healing Vapors",
  "source": "magic"
 },
 {
  "id": "philosophers-stone",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Philosopher's Stone",
  "school": "Alchemy",
  "rank": 4,
  "prerequisite": "Elixir of Wisdom",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "Demon Blood, Dragon Blood",
  "castingTime": "shift",
  "range": "—",
  "duration": "Until used",
  "page": 113,
  "text": "Makes one dose of Philosopher's Stone, an ingredient for other recipes.",
  "recipe": true,
  "ingredients": [
   "Demon Blood",
   "Dragon Blood"
  ],
  "product": "Philosopher's Stone",
  "source": "magic"
 },
 {
  "id": "toxic-mist",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Toxic Mist",
  "school": "Alchemy",
  "rank": 4,
  "prerequisite": "Lethal Poison",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "Charcoal, Saltpeter, Sulfur, Spider Venom",
  "castingTime": "shift",
  "range": "—",
  "duration": "Until used",
  "page": 113,
  "text": "Poison bomb thrown up to STR meters: a 4 m radius mist hits everyone inside with paralyzing, sleeping or lethal poison (thrower's choice), potency 15.",
  "recipe": true,
  "ingredients": [
   "Charcoal",
   "Saltpeter",
   "Sulfur",
   "Spider Venom"
  ],
  "product": "Toxic Mist",
  "source": "magic"
 },
 {
  "id": "create-gold",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Create Gold",
  "school": "Alchemy",
  "rank": 5,
  "prerequisite": "Philosopher's Stone",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "Philosopher's Stone, Iron Filings",
  "castingTime": "shift",
  "range": "—",
  "duration": "Until used",
  "page": 113,
  "text": "Each dose turns the iron into gold worth D8 × 10 gold coins.",
  "recipe": true,
  "ingredients": [
   "Philosopher's Stone",
   "Iron Filings"
  ],
  "product": "Create Gold",
  "source": "magic"
 },
 {
  "id": "elixir-of-life",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Elixir of Life",
  "school": "Alchemy",
  "rank": 5,
  "prerequisite": "Healing Tincture",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "General Herbs, Philosopher's Stone, Hydra Blood",
  "castingTime": "shift",
  "range": "—",
  "duration": "Until used",
  "page": 113,
  "text": "Restores all lost HP and WP and cures every condition, disease, poison effect and severe injury. A drinker at 0 HP stops making death rolls.",
  "recipe": true,
  "ingredients": [
   "General Herbs",
   "Philosopher's Stone",
   "Hydra Blood"
  ],
  "product": "Elixir of Life",
  "source": "magic"
 },
 {
  "id": "homunculus",
  "powerLevels": true,
  "dodge": false,
  "parry": false,
  "name": "Homunculus",
  "school": "Alchemy",
  "rank": 5,
  "prerequisite": "Philosopher's Stone",
  "requirements": [
   "ingredient"
  ],
  "requirementDetail": "Philosopher's Stone, Ghoul Bone, Fairy Dust",
  "castingTime": "shift",
  "range": "—",
  "duration": "Until used",
  "page": 113,
  "text": "Creates a ~30 cm humanoid that serves you like a familiar: 6 HP, Movement 8, Sneaking 15 and Evade 15, all familiar abilities (p.10) except Trained, plus Gather (p.106). It's disobedient — Persuade it every day or it runs off.",
  "recipe": true,
  "ingredients": [
   "Philosopher's Stone",
   "Ghoul Bone",
   "Fairy Dust"
  ],
  "product": "Homunculus",
  "source": "magic"
 }
];
window.DB_SPELLS = DB_SPELLS;
var DB_SUMMONS = [
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
  "immunities": [],
  "source": "core"
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
  ],
  "source": "core"
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
  "immunities": [],
  "source": "core"
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
  "immunities": [],
  "source": "core"
 }
];
window.DB_SUMMONS = DB_SUMMONS;
var DB_SUMMONS_EXTRA = [
 {
  "name": "Guardian Demon",
  "page": 32,
  "source": "magic",
  "spell": [
   "Summon Guardians",
   "Summon Champion",
   "Bind Champion"
  ],
  "bestiaryPage": 146,
  "kind": "monster",
  "ferocity": 1,
  "size": "Normal",
  "movement": 14,
  "armor": 2,
  "hp": 28,
  "text": "Horned, spear-and-shield demon soldiers trained to fight as a unit. Loyal: when summoned with Summon Champion it always returns home obediently at the end.",
  "traits": [
   {
    "name": "Keen Sense of Smell",
    "text": "Opponents get a bane on SNEAKING rolls to get past them."
   },
   {
    "name": "Coordinated",
    "text": "When not fighting alone, guardian demons may choose any initiative card they like before cards are drawn instead of drawing at random."
   }
  ],
  "attacks": [
   {
    "roll": 1,
    "name": "Spear Sweep",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [
     "Dazed"
    ],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Sweeps the long iron spear at a foe's legs: knocked down and Dazed."
   },
   {
    "roll": 2,
    "name": "Shield Bash",
    "damage": "2D8",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Slams a foe with its spiked shield for 2D8 piercing; they are knocked down."
   },
   {
    "roll": 3,
    "name": "Paralyzing Spear Thrust",
    "damage": "2D10",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "poison": {
     "type": "paralyzing",
     "potency": 12
    },
    "text": "Thrusts the iron spear for 2D10 piercing and injects paralyzing poison (potency 12)."
   },
   {
    "roll": 4,
    "name": "Impaling Horns",
    "damage": "2D10",
    "type": "piercing",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Gores a foe with its horns for 2D10 piercing."
   },
   {
    "roll": 5,
    "name": "Entangling Rope",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Throws a weighted rope at a foe within 10 m who trips and falls: they can't move or take actions needing movement except trying to break free — an action and an AGL roll with a bane; others can help."
   },
   {
    "roll": 6,
    "name": "Teleportation",
    "damage": null,
    "type": null,
    "targets": "self",
    "range": 20,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "text": "Plants its spear in the ground and teleports anywhere within 20 m; this doesn't provoke a free attack."
   }
  ]
 },
 {
  "name": "Demonic Champion",
  "page": 32,
  "source": "magic",
  "spell": [
   "Summon Champion",
   "Bind Champion"
  ],
  "kind": "reference",
  "text": "Any demon from the Rulebook or the Bestiary, using its own stat block and monster attack table (the GM picks its attacks; it can't be micromanaged). Summon Champion: serves a stretch for free, then needs a DEMONOLOGY roll to send home (bane/normal/boon at power level 1/2/3); on failure D6 1–3 it attacks you and your allies, 4–6 it leaves to spread havoc unless attacked at once. Bind Champion: serves a day per power level for a negotiated price.",
  "breakFree": [
   {
    "roll": [
     1,
     3
    ],
    "text": "Attacks you and your allies immediately."
   },
   {
    "roll": [
     4,
     6
    ],
    "text": "Laughs and goes off to spread terror nearby unless you attack it at once."
   }
  ]
 },
 {
  "name": "Tweeg",
  "page": 28,
  "source": "magic",
  "trick": "Summon Tweeg",
  "kind": "servant",
  "text": "A rat-sized demon that stays one shift; it has no skills but helps with everyday chores."
 },
 {
  "name": "Puck",
  "page": 26,
  "source": "magic",
  "spell": [
   "Familiar",
   "Greater Familiar"
  ],
  "kind": "familiar",
  "movement": 10,
  "hp": 5,
  "attack": "Bite (skill 12, D3)",
  "skills": "Awareness 10, Evade 14, Sneaking 12",
  "text": "Lesser demon most demonologists bind as a familiar; any shape — winged, two to nine legs or a slime-gliding blob, with horns, claws, fangs, mandibles or fur."
 },
 {
  "name": "Animated Carcass",
  "spell": "Animate Carcass",
  "school": "Necromancy",
  "page": 80,
  "source": "magic",
  "statsFrom": "Core animal stat blocks (Rulebook p.99)",
  "maxHpByLevel": [
   8,
   14,
   20
  ],
  "duration": "Shift",
  "control": "Loyal thrall; you communicate with it telepathically.",
  "text": "A reanimated dead animal; the power level caps the animal's HP."
 },
 {
  "name": "Raised Skeleton",
  "spell": "Raise Skeleton",
  "school": "Necromancy",
  "page": 81,
  "source": "magic",
  "statsFrom": "Core standard skeleton (Rulebook p.96) — app NPC \"Skeleton Warrior\" minus gear; Skeleton Champion at power level 3",
  "options": [
   {
    "powerLevel": 1,
    "count": 1,
    "duration": "Stretch",
    "kind": "Skeleton"
   },
   {
    "powerLevel": 2,
    "count": 2,
    "duration": "Stretch",
    "kind": "Skeleton"
   },
   {
    "powerLevel": 2,
    "count": 1,
    "duration": "Shift",
    "kind": "Skeleton"
   },
   {
    "powerLevel": 3,
    "count": 3,
    "duration": "Stretch",
    "kind": "Skeleton"
   },
   {
    "powerLevel": 3,
    "count": 2,
    "duration": "Shift",
    "kind": "Skeleton"
   },
   {
    "powerLevel": 3,
    "count": 1,
    "duration": "Stretch",
    "kind": "Skeleton Champion"
   }
  ],
  "gear": "None unless the necromancer provides it.",
  "control": "Telepathic at any range; follows instructions to the letter.",
  "text": "Animated from the skeleton of a human-sized humanoid."
 },
 {
  "name": "Raised Wight",
  "spell": "Raise Wight",
  "school": "Necromancy",
  "page": 82,
  "source": "magic",
  "statsFrom": "Core Wight (Rulebook p.98) — app monster \"Wight\"",
  "durationByLevel": [
   "Shift",
   "Day",
   "Week"
  ],
  "limit": 1,
  "gear": "Often buried with weapons and armor.",
  "control": "Telepathic at any range. In combat you choose whom it attacks; its monster attack is rolled on its table.",
  "text": "A dead lord, lady or mighty warrior bound to your service."
 },
 {
  "name": "Mummy",
  "spell": "Raise Mummy",
  "school": "Necromancy",
  "page": 83,
  "source": "magic",
  "monster": true,
  "ferocity": 2,
  "size": "Normal",
  "movement": 6,
  "armor": null,
  "hp": 42,
  "durationByLevel": [
   "Shift",
   "Day",
   "Week"
  ],
  "limit": 1,
  "control": "Telepathic at any range. In combat you choose whom it attacks; its monster attack is rolled on its table.",
  "statsAlsoIn": "Bestiary p.112",
  "resistances": [
   "Piercing (half damage — no internal organs)"
  ],
  "weaknesses": [
   "Fire (double damage)"
  ],
  "traits": [
   {
    "name": "Resistance",
    "text": "No internal organs: half damage from piercing weapons."
   },
   {
    "name": "Flammable",
    "text": "Dry as tinder: double damage from fire."
   }
  ],
  "text": "An anointed, linen-wrapped corpse of a ruler or great warrior raised as an obedient undead servant.",
  "attacks": [
   {
    "roll": 1,
    "name": "Curse!",
    "damage": null,
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": "bane",
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "text": "Curses one opponent within 10 m: they suffer a fear attack with a bane on the WIL roll."
   },
   {
    "roll": 2,
    "name": "Double Strike!",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "two",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Fists hit up to two opponents within 2 m of each other for 2D6 bludgeoning and knock them down."
   },
   {
    "roll": 3,
    "name": "Swarm of Insects!",
    "damage": "D8",
    "type": "piercing",
    "targets": "all opponents within 4 m",
    "range": 4,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": false,
    "ignoresArmor": true,
    "text": "Spews biting insects at every opponent within 4 m: D8 piercing ignoring armor, and each must pass a WIL roll or lose their turn this round (if not taken yet). Can't be dodged."
   },
   {
    "roll": 4,
    "name": "Deadly Throw!",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": true,
    "parry": false,
    "dodge": true,
    "text": "Hurls an opponent 2D6 m; they land prone and take the same in bludgeoning damage."
   },
   {
    "roll": 5,
    "name": "Strangulation!",
    "damage": "2D6",
    "type": "bludgeoning",
    "targets": "one",
    "range": 2,
    "fear": false,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "ignoresArmor": true,
    "grapple": {
     "perTurn": "D6",
     "breakFree": "STR roll with a bane; others can help"
    },
    "text": "Grabs a throat: 2D6 bludgeoning ignoring armor, plus D6 bludgeoning on each of the mummy's turns. The victim can't move or take movement actions except breaking free (STR with a bane; others can help). The mummy makes no other attacks until the victim hits zero HP or escapes."
   },
   {
    "roll": 6,
    "name": "Heartbreak!",
    "damage": "D10",
    "type": null,
    "targets": "one",
    "range": 10,
    "fear": true,
    "conditions": [],
    "prone": false,
    "parry": false,
    "dodge": true,
    "ignoresArmor": true,
    "text": "Locks eyes with an opponent within 10 m: D10 damage ignoring armor, a fear attack, and they lose their turn this round (if not taken yet)."
   }
  ]
 },
 {
  "name": "Skeletal Horde",
  "spell": "Raise Skeletal Horde",
  "school": "Necromancy",
  "page": 83,
  "source": "magic",
  "statsFrom": "Core standard skeleton (Rulebook p.96) per member",
  "duration": "Shift",
  "limit": 1,
  "maxCount": "WIL base chance × power level (×1 / ×2 / ×3)",
  "rules": [
   "The horde takes a single turn per round.",
   "On its turn it makes attacks equal to its number of skeletons ÷ 5, rounded up.",
   "Each skeleton has its own HP and moves individually, but must stay within 2 m (adjacent square) of another member where possible."
  ],
  "control": "Blindly obeys every command.",
  "text": "A horde of raised skeletons acting as one unit."
 },
 {
  "name": "Golem",
  "spell": "Golem",
  "school": "Symbolism",
  "page": 92,
  "source": "magic",
  "movement": 8,
  "armor": 6,
  "hpPerLevel": 8,
  "duration": "Stretch/shift",
  "attack": {
   "name": "Stone fists",
   "damage": "D6 per power level",
   "type": "bludgeoning",
   "note": "Hits automatically in melee; can be dodged or parried."
  },
  "control": "Serves as your bodyguard and obeys your commands.",
  "abilities": [],
  "resistances": [],
  "immunities": [],
  "text": "A clay figure or stone statue animated by drawn or carved symbols."
 }
];
window.DB_SUMMONS_EXTRA = DB_SUMMONS_EXTRA;
var DB_SUPPLY = {
 "Common": "Available in any village or marketplace.",
 "Uncommon": "Usually only from the artisan who makes it — not in every village.",
 "Rare": "Generally has to be ordered specially from an artisan.",
 "Unique": "Only from treasure troves or whoever found it."
};
window.DB_SUPPLY = DB_SUPPLY;
var DB_TABLES = {
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
 },
 "kinDie20": "D20"
};
window.DB_TABLES = DB_TABLES;
var DB_WEAKNESSES = [
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
window.DB_WEAKNESSES = DB_WEAKNESSES;
var DB_WEAPONS = [
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
  "natural": true,
  "source": "core"
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
  "improvised": true,
  "source": "core"
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
  "improvised": true,
  "source": "core"
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
  "metal": true,
  "source": "core"
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
  "metal": true,
  "source": "core"
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
  "metal": true,
  "source": "core"
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
  "metal": true,
  "source": "core"
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
  "metal": true,
  "source": "core"
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
  "metal": true,
  "source": "core"
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
  "metal": true,
  "source": "core"
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
  "metal": true,
  "source": "core"
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
  "metal": true,
  "source": "core"
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
  "metal": true,
  "source": "core"
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
  "metal": true,
  "source": "core"
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
  "metal": true,
  "source": "core"
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
  "metal": true,
  "source": "core"
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
  "noParry": true,
  "source": "core"
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
  "metal": true,
  "source": "core"
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
  "metal": true,
  "source": "core"
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
  "melee": true,
  "source": "core"
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
  "melee": true,
  "source": "core"
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
  "melee": true,
  "source": "core"
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
  "metal": true,
  "source": "core"
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
  "metal": true,
  "source": "core"
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
  "metal": true,
  "source": "core"
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
  "skillNote": "The book doesn't name the skill; Spears is assumed (long, piercing pole-arm).",
  "source": "core"
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
  "metal": true,
  "source": "core"
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
  "skillNote": "No shield skill: parry (and strike) with any STR-based melee skill.",
  "source": "core"
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
  "skillNote": "No shield skill: parry (and strike) with any STR-based melee skill.",
  "source": "core"
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
  "ranged": true,
  "source": "core"
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
  "ranged": true,
  "source": "core"
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
  "ranged": true,
  "source": "core"
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
  "noDamageBonus": true,
  "source": "core"
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
  "noDamageBonus": true,
  "source": "core"
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
  "noDamageBonus": true,
  "source": "core"
 },
 {
  "id": "whip",
  "name": "Whip",
  "grip": "1H",
  "str": null,
  "range": 4,
  "damage": "D8",
  "durability": null,
  "cost": null,
  "supply": null,
  "features": [
   "Slashing",
   "Toppling",
   "Cannot be used for parrying"
  ],
  "skill": "Brawling",
  "melee": true,
  "noParry": true,
  "source": "magic",
  "page": 128,
  "note": "Stats given for the Tongue of Bahlbadash; grip, STR, cost and supply not stated (1H assumed)."
 },
 {
  "id": "the-knights-longsword",
  "name": "The Knight's Longsword",
  "grip": "1H",
  "str": 13,
  "range": 2,
  "damage": "2D8",
  "durability": 15,
  "cost": null,
  "supply": "Unique",
  "features": [
   "Piercing",
   "Slashing"
  ],
  "skill": "Swords",
  "melee": true,
  "metal": true,
  "magic": true,
  "effect": "Imbued with ENCHANT WEAPON and PERMANENCE at power level 1: a roll of 1–2 counts as a dragon when attacking or parrying with it.",
  "source": "pathofglory",
  "page": 33
 },
 {
  "id": "the-knights-gilded-shield",
  "name": "The Knight's Gilded Shield",
  "grip": "1H",
  "str": 7,
  "range": 2,
  "damage": "D8",
  "durability": 15,
  "cost": null,
  "supply": "Unique",
  "features": [
   "Bludgeoning"
  ],
  "skill": null,
  "melee": true,
  "metal": true,
  "magic": true,
  "effect": "Gilded small shield imbued with DISPEL, MAGIC SHIELD, MAGIC SEAL and PERMANENCE at power level 3: each spell can be cast from it for 6 WP per use. Works as a small shield in combat.",
  "source": "pathofglory",
  "page": 33,
  "shield": true,
  "skillAny": "strMelee"
 },
 {
  "id": "tefalas-dagger",
  "name": "Tefalas' Dagger",
  "grip": "1H",
  "str": null,
  "range": "STR",
  "damage": "D8",
  "durability": 12,
  "cost": null,
  "supply": "Unique",
  "features": [
   "Subtle",
   "Piercing",
   "Slashing",
   "Can be thrown"
  ],
  "skill": "Knives",
  "melee": true,
  "metal": true,
  "magic": true,
  "mastercrafted": true,
  "source": "pathofglory",
  "page": 56,
  "effect": "Godvindel's mastercrafted spirit-binding blade. Boon on all attacks against undead; the bearer is immune to undead fear attacks and undead magical attacks. The first hit that deals 1+ HP to a death wight severs its ties to the world and draws its spirit into the blade (one wight, once): the bearer loses D6 WP (no WP = no capture), then 1 WP each night, and can't recover WP except by magic. At 5 WP the bearer feels the wight creeping up their arm; at 0 WP the bearer's spirit is swapped into the blade and the wight takes their body. Letting go ends the drain, but the wight escapes after a shift; a new bearer loses D6 WP at once. Indestructible by the heroes."
 },
 {
  "id": "aleth-kheloch",
  "name": "Aleth-Kheloch",
  "grip": "2H",
  "str": 13,
  "range": 2,
  "damage": "2D10",
  "durability": 18,
  "cost": null,
  "supply": "Unique",
  "features": [
   "Piercing",
   "Slashing"
  ],
  "skill": "Swords",
  "melee": true,
  "metal": true,
  "magic": true,
  "mastercrafted": true,
  "source": "pathofglory",
  "page": 59,
  "effect": "Mogdath's mastercrafted two-handed sword (greatsword), permanently imbued with Enchant Weapon (power level 1). A living wielder is automatically Disheartened in direct sunlight and can't recover from it while in the sun."
 },
 {
  "id": "ish-taloch",
  "name": "Ish-Taloch",
  "grip": "1H",
  "str": 7,
  "range": 2,
  "damage": "2D6",
  "durability": 15,
  "cost": null,
  "supply": "Unique",
  "features": [
   "Toppling",
   "Slashing"
  ],
  "skill": "Swords",
  "melee": true,
  "metal": true,
  "magic": true,
  "mastercrafted": true,
  "source": "pathofglory",
  "page": 84,
  "effect": "Orcish sword of frost: a mastercrafted scimitar holding Frost (power level 2) with Magic Seal and Permanence. Runes explain its use (LANGUAGES, a stretch; boon for orcs)."
 },
 {
  "id": "absor",
  "name": "Absor",
  "grip": "1H",
  "str": 10,
  "range": 2,
  "damage": "D8",
  "durability": 21,
  "cost": null,
  "supply": "Unique",
  "features": [
   "Bludgeoning"
  ],
  "skill": null,
  "melee": true,
  "shield": true,
  "skillAny": "strMelee",
  "magic": true,
  "mastercrafted": true,
  "source": "pathofglory",
  "page": 84,
  "effect": "Dwarven shield of the mountain: a mastercrafted large oak shield with silvery fittings holding Stone Shield (power level 2) with Magic Seal and Permanence. Runes explain its use (LANGUAGES, a stretch; boon for dwarves)."
 },
 {
  "id": "the-battle-shield-iskolde",
  "name": "The Battle Shield Iskolde",
  "grip": "1H",
  "str": 10,
  "range": 2,
  "damage": "D8",
  "durability": 18,
  "cost": null,
  "supply": "Unique",
  "features": [
   "Bludgeoning",
   "Mastercrafted",
   "Magic"
  ],
  "skill": null,
  "melee": true,
  "shield": true,
  "skillAny": "strMelee",
  "magic": true,
  "source": "pathofglory",
  "page": 133,
  "effect": "Mastercrafted large shield bound with a version of MAGIC SHIELD. Parry an incoming spell with any weapon skill: on success the spell is blocked completely, no WP is spent, and the bearer gains WP equal to its power level. Its inscriptions must be read (Rulebook p.59) before a new owner can use it."
 },
 {
  "id": "mithrindel",
  "name": "Mithrindel",
  "grip": "2H",
  "str": 13,
  "range": 100,
  "damage": "D12",
  "durability": 6,
  "cost": null,
  "supply": "Unique",
  "features": [
   "Piercing",
   "Requires quiver",
   "Magic"
  ],
  "skill": "Bows",
  "ranged": true,
  "magic": true,
  "source": "pathofglory",
  "page": 131,
  "effect": "Elven longbow of Prince Gloriman, permanently enchanted with ENCHANT WEAPON (power level 1, PERMANENCE): counts as magical and rolls of 1–2 count as a Dragon when attacking or parrying with it. Elves recognise it and will demand its return to the tomb."
 },
 {
  "id": "eloril",
  "name": "Eloril",
  "grip": "1H",
  "str": 13,
  "range": 2,
  "damage": "2D8",
  "durability": null,
  "cost": null,
  "supply": "Unique",
  "features": [
   "Bludgeoning",
   "Toppling",
   "Cannot be used for parrying",
   "Magic"
  ],
  "skill": "Hammers",
  "melee": true,
  "metal": true,
  "noParry": true,
  "magic": true,
  "source": "pathofglory",
  "page": 131,
  "effect": "Elven flail of Princess Glorial, permanently enchanted with ENCHANT WEAPON (power level 1, PERMANENCE): counts as magical and rolls of 1–2 count as a Dragon when attacking with it. Elves recognise it and will demand its return to the tomb."
 },
 {
  "id": "garibalders-staff",
  "name": "Garibalder's Staff",
  "grip": "2H",
  "str": 4,
  "range": 2,
  "damage": "D8",
  "durability": 12,
  "cost": null,
  "supply": "Unique",
  "features": [
   "Bludgeoning",
   "Toppling",
   "Mastercrafted",
   "Magic"
  ],
  "skill": "Staves",
  "melee": true,
  "magic": true,
  "source": "pathofglory",
  "page": 145,
  "effect": "Wickedly carved mastercrafted wooden staff of the high priest Garibalder, imbued with CHARGE and PERMANENCE. Holds 20 WP that anyone holding it can draw on; once spent they are gone."
 },
 {
  "id": "dakoths-staff",
  "name": "Dakoth's Staff",
  "grip": "2H",
  "str": 4,
  "range": 2,
  "damage": "D8",
  "durability": 12,
  "cost": null,
  "supply": "Unique",
  "features": [
   "Bludgeoning",
   "Toppling",
   "Mastercrafted",
   "Magic"
  ],
  "skill": "Staves",
  "melee": true,
  "magic": true,
  "source": "pathofglory",
  "page": 148,
  "effect": "Black, skull-crowned mastercrafted staff imbued with CHARGE and PERMANENCE; holds 18 extra WP its wielder can draw on."
 }
];
window.DB_WEAPONS = DB_WEAPONS;
var DB_WEAPON_FEATURES = {
 "Subtle": "Boon and one extra damage die on sneak attacks.",
 "Long": "Reaches enemies up to 4 m away, and past a friendly combatant.",
 "Toppling": "Boon when trying to topple an opponent.",
 "Piercing": "Piercing damage (matters for armor and Find Weak Spot; never damages a parrying weapon).",
 "Slashing": "Slashing damage. A weapon that is both slashing and piercing: choose before rolling.",
 "Bludgeoning": "Bludgeoning damage (matters for armor)."
};
window.DB_WEAPON_FEATURES = DB_WEAPON_FEATURES;
})();
