// Dragonbane Book of Magic (Free League, 2026) — expansion data.
// Mechanics and table values are game facts from the Book of Magic; all
// descriptive text is original paraphrase written for this app. Page numbers
// refer to the printed Book of Magic.
// Merged by scripts/build-db-data.mjs: DB_SPELLS_EXPANSION records marked revised:true
// replace the core spell of that name (core page kept as corePage); the rest are new.
// School records (DB_MAGIC_SCHOOLS) drive the schools list, the new school skills and the
// Mage's school skill lists. Alchemy has recipes (DB_ALCHEMY) instead of spells.
export const DB_ALCHEMY = {
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

export const DB_ENCHANTING = {
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

export const DB_FAMILIAR_RULES = {
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

export const DB_GEAR_EXPANSION = [
  {"category":"Studies & Magic","name":"Small Field Laboratory","cost":{"amount":50,"unit":"gold"},"supply":"Rare","weight":1,"effect":"Portable alchemy tools (cauldron, mortar, flasks, vials) — required to brew alchemical recipes. New alchemists start with one.","alchemyLab":"field","page":108,"source":"magic"},
  {"category":"Studies & Magic","name":"Alchemical Laboratory","cost":{"amount":500,"unit":"gold","note":"at least"},"supply":null,"weight":null,"effect":"A fully equipped room-sized lab: boon on Alchemy rolls when brewing. Not portable.","alchemyLab":"large","boon":["Alchemy"],"page":108,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Bat Blood","cost":{"amount":2,"unit":"silver"},"supply":"Uncommon","weight":0,"effect":"Used in: Paralyzing Poison.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Bear Tooth","cost":{"amount":4,"unit":"silver"},"supply":"Uncommon","weight":0,"effect":"Used in: Liquid Courage.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Boar Tusk","cost":{"amount":2,"unit":"silver"},"supply":"Uncommon","weight":0,"effect":"Used in: Invigorating Decoction.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Charcoal","cost":{"amount":5,"unit":"copper"},"supply":"Common","weight":0,"effect":"Used in: Puff Bomb, Smokescreen, Sunflash, Explosive Orb, Toxic Mist.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Deer Antler","cost":{"amount":2,"unit":"silver"},"supply":"Uncommon","weight":0,"effect":"Used in: Medicinal Water.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Demon Blood","cost":{"amount":10,"unit":"gold"},"supply":"Unique","weight":0,"effect":"Used in: Philosopher's Stone.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Dragon Blood","cost":{"amount":10,"unit":"gold"},"supply":"Unique","weight":0,"effect":"Used in: Philosopher's Stone.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Dragon Tooth","cost":{"amount":10,"unit":"gold"},"supply":"Unique","weight":0,"effect":"Alchemy ingredient.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Fairy Dust","cost":{"amount":8,"unit":"gold"},"supply":"Unique","weight":0,"effect":"Used in: Homunculus.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"General Herbs","cost":{"amount":2,"unit":"silver"},"supply":"Common","weight":0,"effect":"Basic ingredient in many recipes. Used in: Focus Tonic, Herbal Concoction, Invigorating Decoction, Liquid Courage, Medicinal Water, Sleeping Poison, Soothing Brew, Spiritlifter, Antidote, Healing Draught, Love Potion, Paralyzing Poison, Drops of Strength, Elixir of Wisdom, Healing Potion, Lethal Poison, Nimble Nectar, Tincture of Beauty, Battle Fumes, Healing Tincture, Healing Vapors, Elixir of Life.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Ghoul Bone","cost":{"amount":1,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Used in: Corrosive Sludge, Homunculus.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Giant Blood","cost":{"amount":3,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Used in: Drops of Strength, Battle Fumes.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Griffon Feather","cost":{"amount":5,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Used in: Nimble Nectar.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Hobgoblin Blood","cost":{"amount":5,"unit":"silver"},"supply":"Uncommon","weight":0,"effect":"Used in: Healing Draught.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Hydra Blood","cost":{"amount":6,"unit":"gold"},"supply":"Unique","weight":0,"effect":"Used in: Healing Tincture, Elixir of Life.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Iron Filings","cost":{"amount":1,"unit":"silver"},"supply":"Common","weight":0,"effect":"Used in: Explosive Orb, Create Gold.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Manticore Spike","cost":{"amount":2,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Used in: Sunflash.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Minotaur Horn","cost":{"amount":4,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Not used by any recipe in the book. Alchemy ingredient.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Nymph Tears","cost":{"amount":3,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Used in: Love Potion.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Octopus Ink","cost":{"amount":5,"unit":"silver"},"supply":"Rare","weight":0,"effect":"Used in: Smokescreen.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Saltpeter","cost":{"amount":1,"unit":"silver"},"supply":"Uncommon","weight":0,"effect":"Used in: Stun Powder, Puff Bomb, Smokescreen, Sunflash, Battle Fumes, Explosive Orb, Healing Vapors, Toxic Mist.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Sea Serpent Bile","cost":{"amount":2,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Used in: Antidote.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Spider Venom","cost":{"amount":3,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Used in: Sleeping Poison, Lethal Poison, Toxic Mist.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Sulfur","cost":{"amount":3,"unit":"silver"},"supply":"Uncommon","weight":0,"effect":"Used in: Spiritlifter, Stun Powder, Lock Acid, Puff Bomb, Smokescreen, Corrosive Sludge, Sunflash, Battle Fumes, Explosive Orb, Healing Vapors, Toxic Mist.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Troll Bile","cost":{"amount":2,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Used in: Lock Acid, Corrosive Sludge.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Troll Blood","cost":{"amount":1,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Used in: Healing Potion, Healing Vapors.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Troll Tooth","cost":{"amount":1,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Used in: Elixir of Wisdom.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Vampire Blood","cost":{"amount":7,"unit":"gold"},"supply":"Unique","weight":0,"effect":"Used in: Tincture of Beauty.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Wolf Blood","cost":{"amount":3,"unit":"silver"},"supply":"Uncommon","weight":0,"effect":"Used in: Focus Tonic.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemy Ingredients","name":"Worg Tooth","cost":{"amount":5,"unit":"silver"},"supply":"Rare","weight":0,"effect":"Not used by any recipe in the book. Alchemy ingredient.","ingredient":true,"page":109,"source":"magic"},
  {"category":"Alchemical Substances","name":"Focus Tonic","cost":{"amount":5,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Removes the Dazed condition.","alchemy":true,"rank":1,"page":110,"source":"magic"},
  {"category":"Alchemical Substances","name":"Invigorating Decoction","cost":{"amount":5,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Removes the Exhausted condition.","alchemy":true,"rank":1,"page":110,"source":"magic"},
  {"category":"Alchemical Substances","name":"Liquid Courage","cost":{"amount":5,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Removes the Scared condition.","alchemy":true,"rank":1,"page":110,"source":"magic"},
  {"category":"Alchemical Substances","name":"Medicinal Water","cost":{"amount":5,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Removes the Sickly condition.","alchemy":true,"rank":1,"page":110,"source":"magic"},
  {"category":"Alchemical Substances","name":"Soothing Brew","cost":{"amount":5,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Removes the Angry condition.","alchemy":true,"rank":1,"page":110,"source":"magic"},
  {"category":"Alchemical Substances","name":"Spiritlifter","cost":{"amount":5,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Removes the Disheartened condition.","alchemy":true,"rank":1,"page":110,"source":"magic"},
  {"category":"Alchemical Substances","name":"Stun Powder","cost":{"amount":4,"unit":"gold"},"supply":"Uncommon","weight":0,"effect":"Blow it in the face of someone within 4 m with a Brawling roll; on a hit they become Dazed.","alchemy":true,"rank":1,"page":110,"source":"magic"},
  {"category":"Alchemical Substances","name":"Antidote","cost":{"amount":20,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Negates a poison's full effect (core p.52); any limited effect still applies.","alchemy":true,"rank":2,"page":110,"source":"magic"},
  {"category":"Alchemical Substances","name":"Healing Draught","cost":{"amount":10,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Heals D6 HP at once.","alchemy":true,"rank":2,"page":110,"source":"magic"},
  {"category":"Alchemical Substances","name":"Lock Acid","cost":{"amount":10,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Eats through and destroys a lock or other small metal object over one stretch.","alchemy":true,"rank":2,"page":111,"source":"magic"},
  {"category":"Alchemical Substances","name":"Love Potion","cost":{"amount":20,"unit":"gold"},"supply":"Rare","weight":0,"effect":"For one shift, CHA-based skill rolls aimed at the drinker get a boon.","alchemy":true,"rank":2,"page":111,"source":"magic"},
  {"category":"Alchemical Substances","name":"Puff Bomb","cost":{"amount":10,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Throw up to STR meters (Brawling roll): D8 fire damage on a hit. Also lights a campfire.","alchemy":true,"rank":2,"page":111,"source":"magic"},
  {"category":"Alchemical Substances","name":"Smokescreen","cost":{"amount":10,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Smoke bomb thrown up to STR meters: a 4 m radius cloud blocks all sight; everyone inside acts as in total darkness (core p.52). Each round start roll D4 outdoors / D8 indoors — on a 1 it clears.","alchemy":true,"rank":2,"page":111,"source":"magic"},
  {"category":"Alchemical Substances","name":"Corrosive Sludge","cost":{"amount":25,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Thick acid thrown up to STR meters (Brawling roll): D8 damage on a hit, and worn armor permanently loses that much armor rating (natural armor unaffected).","alchemy":true,"rank":3,"page":111,"source":"magic"},
  {"category":"Alchemical Substances","name":"Drops of Strength","cost":{"amount":60,"unit":"gold"},"supply":"Rare","weight":0,"effect":"For one shift STR becomes 18 (damage bonus +D6, carrying capacity 9). Also removes Exhausted and gives a boon on all STR-based skill rolls (skill levels don't change).","alchemy":true,"rank":3,"page":112,"source":"magic"},
  {"category":"Alchemical Substances","name":"Elixir of Wisdom","cost":{"amount":60,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Boon on all INT-based skill rolls for one shift; also removes Angry.","alchemy":true,"rank":3,"page":112,"source":"magic"},
  {"category":"Alchemical Substances","name":"Nimble Nectar","cost":{"amount":60,"unit":"gold"},"supply":"Rare","weight":0,"effect":"For one shift AGL becomes 18 (damage bonus +D6, movement adjusted per core p.25). Also removes Dazed and gives a boon on all AGL-based skill rolls (skill levels don't change).","alchemy":true,"rank":3,"page":112,"source":"magic"},
  {"category":"Alchemical Substances","name":"Sunflash","cost":{"amount":30,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Thrown to the ground, it flashes: every unprepared creature within 10 m must pass an Evade roll (not an action) or be blinded, losing its next turn and unable to react until then. Nightkin also take D6 damage (armor doesn't help).","alchemy":true,"rank":3,"page":112,"source":"magic"},
  {"category":"Alchemical Substances","name":"Tincture of Beauty","cost":{"amount":80,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Boon on all CHA-based skill rolls for one shift; also removes Disheartened.","alchemy":true,"rank":3,"page":112,"source":"magic"},
  {"category":"Alchemical Substances","name":"Battle Fumes","cost":{"amount":100,"unit":"gold"},"supply":"Unique","weight":0,"effect":"A bubbling cauldron gives off fumes for a shift; anyone who takes a stretch rest within 4 m gets a boon on all melee attacks for the next shift.","alchemy":true,"rank":4,"page":112,"source":"magic"},
  {"category":"Alchemical Substances","name":"Explosive Orb","cost":{"amount":60,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Throw up to STR meters (Brawling roll): 3D6 bludgeoning damage to the target and everyone within 4 m of it.","alchemy":true,"rank":4,"page":112,"source":"magic"},
  {"category":"Alchemical Substances","name":"Healing Tincture","cost":{"amount":80,"unit":"gold"},"supply":"Unique","weight":0,"effect":"Heals 3D6 HP and 3D6 WP at once.","alchemy":true,"rank":4,"page":112,"source":"magic"},
  {"category":"Alchemical Substances","name":"Healing Vapors","cost":{"amount":70,"unit":"gold"},"supply":"Rare","weight":0,"effect":"A bubbling cauldron gives off healing vapors for a shift; anyone who takes a stretch rest within 4 m gets the full benefit of a shift rest.","alchemy":true,"rank":4,"page":113,"source":"magic"},
  {"category":"Alchemical Substances","name":"Philosopher's Stone","cost":null,"supply":null,"weight":0,"effect":"Makes one dose of Philosopher's Stone, an ingredient for other recipes.","alchemy":true,"rank":4,"page":113,"source":"magic"},
  {"category":"Alchemical Substances","name":"Toxic Mist","cost":{"amount":50,"unit":"gold"},"supply":"Rare","weight":0,"effect":"Poison bomb thrown up to STR meters: a 4 m radius mist hits everyone inside with paralyzing, sleeping or lethal poison (thrower's choice), potency 15.","alchemy":true,"rank":4,"page":113,"source":"magic"},
  {"category":"Alchemical Substances","name":"Create Gold","cost":null,"supply":null,"weight":0,"effect":"Each dose turns the iron into gold worth D8 × 10 gold coins.","alchemy":true,"rank":5,"page":113,"source":"magic"},
  {"category":"Alchemical Substances","name":"Elixir of Life","cost":null,"supply":null,"weight":0,"effect":"Restores all lost HP and WP and cures every condition, disease, poison effect and severe injury. A drinker at 0 HP stops making death rolls.","alchemy":true,"rank":5,"page":113,"source":"magic"},
  {"category":"Alchemical Substances","name":"Homunculus","cost":null,"supply":null,"weight":0,"effect":"Creates a ~30 cm humanoid that serves you like a familiar: 6 HP, Movement 8, Sneaking 15 and Evade 15, all familiar abilities (p.10) except Trained, plus Gather (p.106). It's disobedient — Persuade it every day or it runs off.","alchemy":true,"rank":5,"page":113,"source":"magic"}
];

export const DB_MAGIC_RULES_EXTRA = {
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

export const DB_MAGIC_SCHOOLS = [
  {"id":"general","name":"General Magic","page":7,"source":"magic","existing":true,"skill":null,"attribute":"INT","title":"Mage","creation":true,"professions":["Mage"],"summary":"Basic spells any mage can learn whatever their school, often coloured by the caster's own training. Many deal with making magic items or protecting the caster; the most widespread are the rituals that create a familiar.","prevalence":"Taught by masters of every school. Mages argue endlessly over which school is oldest; the few who claim general magic proves all magic shares one source keep quiet about it.","types":[],"familiar":{"text":"General magic is where the Familiar and Greater Familiar rituals live: a spirit of the dead bound into a small vertebrate, with two abilities from the familiar list (see DB_FAMILIAR_RULES).","creatures":[{"name":"Rat","movement":10,"hp":3,"attack":"Bite (skill 8, D2)","skills":"Awareness 14, Evade 16, Sneaking 14"},{"name":"Cat","movement":12,"hp":4,"attack":"Bite (skill 8, D3)","skills":"Awareness 12, Evade 14, Sneaking 16"},{"name":"Dog","movement":14,"hp":8,"attack":"Bite (skill 12, D8)","skills":"Awareness 14, Evade 10"},{"name":"Fox","movement":10,"hp":6,"attack":"Bite (skill 12, D6)","skills":"Awareness 12, Evade 10, Sneaking 14"},{"name":"Grass Snake","movement":8,"hp":3,"attack":"Bite (skill 12, D3)","skills":"Awareness 10, Evade 14, Sneaking 16"},{"name":"Raven","movement":18,"hp":4,"attack":"Beak (skill 10, D4)","skills":"Awareness 16, Evade 10"}]},"study":{"ranks12":"As the school whose master teaches you (see each school chapter).","ranks34":"As the teaching school.","rank5":"As the teaching school.","other":"Requires a skill level in any school of magic. Harmonism isn't a skill, so harmonists can't learn general magic."},"startingSkills":[],"rules":[{"name":"Requirement","text":"Any skill level in a school of magic lets you learn general spells; harmonists can't."},{"name":"Enchanting branch","text":"In the spell tree, any rank 3 Enchanting spell can substitute for Transfer as prerequisite for Magic Seal and Charge, and any rank 4 Enchanting spell for Magic Seal as prerequisite for Counter Ritual and Permanence."},{"name":"Permanent WP Loss","text":"Some high-rank rituals permanently lower max WP. Cast several at once (e.g. Permanence and Nexus) and you lose WP for each. Focused can restore lost max WP."}],"spellTree":[{"rank":1,"spells":["Alarm","Protector","Dispel"]},{"rank":2,"spells":["Familiar","Magic Shield"]},{"rank":3,"spells":["Transfer","Magic Ward"],"also":["Any Enchanting spell"]},{"rank":4,"spells":["Magic Seal","Charge","Greater Familiar"],"also":["Any Enchanting spell"]},{"rank":5,"spells":["Counter Ritual","Permanence","Nexus","Rejuvenation"]}]},
  {"id":"animism","name":"Animism","page":15,"source":"magic","existing":true,"skill":"Animism","attribute":"INT","title":"Animist","creation":true,"professions":["Mage"],"summary":"Animists sense and shape the life force (the Flame, or Soul) in all living things and natural phenomena — to heal, to commune with nature, and to destroy soulless demons and undead.","prevalence":"Thought the oldest school, born among elves; it has spread to every kin though leading animists are mostly elves. Seasonal gatherings at solstices and equinoxes draw humans, halflings and mallards; dwarves and wolfkin are rarer.","types":[{"name":"Warden","text":"The most common: devoted to protecting and tending one environment, species or weather phenomenon."},{"name":"Champion","text":"Fights for the natural order, ready to die battling the soulless and unnatural."},{"name":"Hermit","text":"Has lost interest in everything but one place, phenomenon or group of animals."}],"familiar":{"text":"Usually a bird tied to the nature the animist loves (woodpecker or dove for forests, falcon or pheasant for plains, magpie or raven in towns); occasionally a fox, cat or other four-legged animal. School ability: the familiar can cast HEAL WOUND at skill level 15, once per round on your turn, using your WP.","creatures":[]},"study":{"ranks12":"Easy to find a teacher (herbalist, gardener, shaman, circle leader); at least 5 gold per shift or equivalent service.","ranks34":"Show dedication: coin or labour worth about 50 gold per shift, and usually skill level 15 in BEAST LORE, BUSHCRAFT or SEAMANSHIP.","rank5":"Grandmasters rarely accept you without skill level 18 in one of BEAST LORE, BUSHCRAFT or SEAMANSHIP and at least 12 in the other two, plus their own demands (see Animist Masters).","other":"Animists are welcoming teachers and rarely rivals, except e.g. wolfkin shamans competing for a chieftain's favour or two animists attached to the same grove or pack."},"startingSkills":["Animism","Beast Lore","Bushcraft","Evade","Healing","Hunting & Fishing","Sneaking","Staves"],"rules":[],"masters":[{"name":"Alavain of Nightwood","text":"Legendary elf animist who seems to live in several forests at once.","requirements":"Always surrounded by apprentices; you must have risked your life to save a forest, and succeeded."},{"name":"Cycleona Orcana","text":"Ancient master who can no longer walk and is carried by swirling winds.","requirements":"Devoted to fighting demons: if you haven't slain a demon prince, she sends you to a rift about to open."},{"name":"\"Stump\"","text":"Toothless, hunchbacked, spry hermit with mossy green skin.","requirements":"Wants a worthy conversationalist: skill level 18 in BEAST LORE and MYTHS & LEGENDS, and a well-behaved FAMILIAR."}],"spellTree":[{"rank":1,"spells":["Cure","Banish","Lightning Flash","Treat Wound","Nourish","Animal Whisperer","Ensnaring Roots"]},{"rank":2,"spells":["Recovery","Purge","Lightning Bolt","Heal Wound","Sleep","Reinvigorate","Calm Animal","Engulfing Forest"]},{"rank":3,"spells":["Mass Purge","Thunderbolt","Restoration","Daze","Exhaust","Command Animal","Thorn Field"]},{"rank":4,"spells":["Weather Mastery","Healing Radiance","Animalistic Influence"]},{"rank":5,"spells":["Healing Aura","Resurrection"]}]},
  {"id":"demonology","name":"Demonology","page":25,"source":"magic","skill":"Demonology","attribute":"INT","title":"Demonologist","creation":true,"professions":["Mage"],"summary":"Magic drawn from demonic energies and pacts with the beings of Chaos: summoned vermin, chaos-tainted ground, possession by demon spirits, and the summoning and binding of demons. Its followers see demons as an alternative power against oppressive rulers.","prevalence":"As old as the link between the world and the demonic realm. Rare among elves, mallards and halflings and distrusted or hated among humans and dwarves, so practitioners hide in secret cults; wolfkin shamans, by contrast, often make pacts and some clans worship demon lords.","types":[{"name":"Scholar","text":"Rare academics who use the spells to study demons and the mysteries of existence."},{"name":"Rebel","text":"The most common: allies with demons against some authority that restricts their freedom."},{"name":"Worshiper","text":"Rejects morality, law and order for the hedonistic, emotional excess of the demonic realm."},{"name":"Power Seeker","text":"Often a loner who wants power for its own sake and sees demon pacts as the quick road to it."}],"familiar":{"text":"Usually a puck — a minor demon that can take almost any shape — though some use a bat, a large spider or another demon-like beast. School ability: once per shift it hurls acid slime at an enemy within 2 m. Automatic hit (Evade allowed), 2D6 damage, and D6 more on the target's next turn unless they spend an action scraping it off.","creatures":[{"name":"Spider","movement":8,"hp":3,"attack":"Bite (skill 8, D2)","skills":"Awareness 14, Evade 16, Sneaking 14","note":"Bite carries paralyzing poison, potency 12."},{"name":"Bat","movement":16,"hp":4,"attack":"Bite (skill 12, D4)","skills":"Awareness 16, Evade 10"},{"name":"Puck","movement":10,"hp":5,"attack":"Bite (skill 12, D3)","skills":"Awareness 10, Evade 14, Sneaking 12"}]},"study":{"ranks12":"Once a teacher trusts you they share gladly, for at least 5 gold per shift.","ranks34":"The teacher must see you as an asset to the cult, and you must donate at least 50 gold per shift — or make a pact with a demon.","rank5":"Practically only via a pact with a demon lord; mortal teachers at that level are too absorbed to teach.","other":"Finding a teacher is the hard part: demonologists hide from the law. You usually must first join their cult (proving zeal in battle or enduring a repugnant initiation); any hint you're an enemy agent may get you sacrificed."},"startingSkills":["Demonology","Bartering","Bluffing","Evade","Languages","Myths & Legends","Persuasion","Sneaking"],"rules":[{"name":"Pact With a Demon","text":"Rank 3, 4 and 5 spells can be learned through a pact with a demon (rank 5 almost only from a demon lord). The demon sets a condition, usually to be met by the next full moon; failure brings a demonic punishment."},{"name":"Pact Examples — Rank 3","text":"Sacrifice animals totalling 99 HP or more; bring 9 or more new followers into a cult (yours or another); or betray a rival demon's worshippers to the dragon knights or a similar power."},{"name":"Pact Examples — Rank 4","text":"Ritually sacrifice a Huge monster captured alive; recruit a prince, warlord, powerful mage or similar to a cult; kill the leaders of a rival demon's cult."},{"name":"Demonic Servitude (punishment)","text":"Two failed death rolls kill you — and instead of dying you are whisked to the demon's court to serve as a thrall for 99 years."},{"name":"Demonic Whispers (punishment)","text":"Bane on every skill not used toward fulfilling the condition until it is fulfilled; constant hissing makes concentration and sleep nearly impossible."},{"name":"Demonic Mockery (punishment)","text":"You can't spend WP except while actively working toward the condition, until it is fulfilled; the demon jeers at you day and night."},{"name":"Renegotiation","text":"Instead of attacking over an unpaid pact, a demon may renegotiate: one more moon to pay, but the price rises to about a rank 4 pact example."}],"demonLords":[{"name":"Albarlog","text":"A tentacled, fanged monstrosity that loves expanding its realm in Chaos.","requirements":"Infiltrate the cult of rival demon lord Youl and slay him when he is summoned to a major ceremony."},{"name":"Myrindon","text":"An ever-growing, mildly corrosive mist seeking ways into the world.","requirements":"Shatter the stone that seals an ancient rift, hidden in a cave under the dragon knights' small fort that watches over it."},{"name":"Blothander","text":"A towering hulk of molten stone that devours the living world.","requirements":"Kill the monster now lairing in the volcano Blothander used to manifest through."}],"spellTree":[{"rank":1,"spells":["Abyssal Stench","Demonic Gust","Chaos Swamp","Carbuncle"]},{"rank":2,"spells":["Demon Face","Bloodlust","Chaos Mire","Beetle Boil"]},{"rank":3,"spells":["Dimensional Slip","Rage","Beetle Swarm","Gutworm"]},{"rank":4,"spells":["Demonic Exile","Summon Champion","Summon Guardians"]},{"rank":5,"spells":["Dimensional Travel","Bind Champion"]}]},
  {"id":"elementalism","name":"Elementalism","page":35,"source":"magic","existing":true,"skill":"Elementalism","attribute":"INT","title":"Elementalist","creation":true,"professions":["Mage"],"summary":"Magic of the four material elements — fire, air, earth and water. Elementalists hold that matter, not spirit, is the foundation of reality, and their masters command matter itself: fire and ice attacks, walls and pillars of stone, winds, waves and summoned elementals.","prevalence":"Said to have formed when four elder shamanic traditions merged; now one of the most widespread and influential schools across all kin, though elves and halflings rarely take it up. Coastal mages favour water and wind, mountain and underground folk fire and earth; fire magic is the most common overall.","types":[{"name":"Battle mage","text":"The archetypal fire-hurling war wizard who summons blazing beasts on the battlefield; the most common type."},{"name":"Academic","text":"Pairs spellcraft with scholarly study of the nature of fire, wind, earth and water."},{"name":"Devotee","text":"Dedicated to one or two elements, aloof from ordinary concerns, living in lava, seabed or mountain wind."}],"familiar":{"text":"An elementalist may bind the familiar to an elemental form instead of an animal: a gust of wind, a flame, a small cloud or an earth spirit (it can also serve as a greater familiar, p.12). Besides the normal familiar abilities (p.10) it gains one ability by form. Gale (gust only, 3 WP): deflect one ranged-weapon projectile within 20 m of the familiar so the attack misses — activate before damage is rolled; also dries wet gear and people for free. Incinerate (flame only, 3 WP, takes an action): burn up a small non-magical flammable object (weight 1 max); also a free heat source that negates cold. Downpour (cloud only, 3 WP, takes an action): drench a foe, who must pass a CON roll or become Dazed; also gives drinking water for free. Guardian (earth spirit only, 2 WP): when you are attacked, the spirit appears beside you (if within its Movement) and takes the hit instead — activate before damage is rolled.","creatures":[{"name":"Gust","movement":20,"hp":3,"attack":"—","skills":"—","note":"Only harmed by fire, magic and magical weapons."},{"name":"Flame","movement":16,"hp":4,"attack":"Spark (skill 12, D4)","skills":"—","note":"Hurt only by water, magic and magical attacks; even a splash of water does D4."},{"name":"Cloud","movement":12,"hp":6,"attack":"—","skills":"—","note":"Only harmed by fire, magic and magical weapons."},{"name":"Earth Spirit","movement":8,"hp":12,"armor":6,"attack":"Fist (skill 12, D8)","skills":"Awareness 10, Evade 8"}]},"study":{"ranks12":"Academies admit applicants with good references or a prominent family for at least 5 gold per shift; rejected students can find bitter, cast-out tutors who teach for coin.","ranks34":"You must at least appear to fit the elementalist ideal of grooming, manners and bearing (or be famous for a spectacular heroic deed), and pay at least 50 gold per shift.","rank5":"Masters hold high posts (court archmage, army battle mage, academy head) and won't train a potential rival, but will teach someone who helps them bring down an enemy. Examples: Querulida the Subduer, Udu of the Depths, Kadirya Stormborne.","other":"Academies expect students to be well-groomed, well-spoken, well-mannered and preferably wealthy; those who aren't get extra lessons in etiquette."},"startingSkills":["Elementalism","Awareness","Evade","Healing","Languages","Myths & Legends","Spot Hidden","Staves"],"masters":[{"name":"Querulida","text":"Short-tempered court archmage to Baron Guber II who always hides her face.","requirement":"Help her rival, the illusionist court mage Brasimal Sturling of Baroness Gertrud XII, be replaced — by you."},{"name":"Udu of the Depths","text":"Ancient, taciturn dwarf who hasn't been above ground in over a century.","requirement":"Take revenge on Lord Plymer of Dask, the ex-general who dismissed her as battalion mage — he must die."},{"name":"Kadirya Stormborne","text":"Absentee headmistress of the Sun of Wisdom academy, obsessed with mapping the world from the sky.","requirement":"Run the academy for her, with its feuding faculty, alongside your studies."}],"rules":[],"spellTree":[{"rank":1,"spells":["Fireball","Pillar","Shatter","Frost","Gust of Wind"]},{"rank":2,"spells":["Fire Blast","Stone Shield","Stonewall","Tidal Wave","Whirlwind"]},{"rank":3,"spells":["Firebird","Firestorm","Salamander","Gnome","Undine","Sylph"]},{"rank":4,"spells":["Firebomb","Rock Tornado","Scalding Shower","Hailstorm"]},{"rank":5,"spells":["Meteor Swarm","Conjure","Elemental Path"]}]},
  {"id":"harmonism","name":"Harmonism","page":45,"source":"magic","skill":"Performance","attribute":"CHA","title":"Harmonist","creation":true,"professions":["Bard"],"summary":"Music magic: harmonists perceive the vibrations of every thing and creature as melodies within the World Symphony and alter them through song or instrument — inspiring allies, swaying emotions, mending or shattering objects, and controlling or harming foes.","prevalence":"Popularly credited to elves, but evidence points to the trolls in primeval times. Practised today by bards of all kin: elves mostly sing, humans favour strings, halflings woodwinds, dwarves horns and the trudledrum (a tunable belly-harness kettledrum); mallards and wolfkin play various instruments, with the odd quacking or howling singer.","types":[{"name":"Diva","text":"Loves the spotlight and dazzles with musical and magical virtuosity."},{"name":"Charmer","text":"Uses voice or strings to enchant and seduce everyone nearby."},{"name":"Artist","text":"Introverted, often playing with their back to the crowd, devoted to art for its own sake."}],"familiar":null,"study":{"ranks12":"Many tavern and roadside-inn musicians know the basics and teach on the side for at least 5 gold per shift. A capable instrumentalist can instead pay by touring with the teacher: five evenings warming up and entertaining the crowd per shift of instruction.","ranks34":"Requires serious, retired instrumentalists focused on the magic — a few human conservatories (lyre, lute, strapped zither) or renowned teachers of other kin in remote places — for hard coin, often at least 50 gold per shift.","rank5":"Top masters are hard to find and reluctant; help one with their predicament, or pay an exorbitant sum if you can reach them. Examples: Cidcil Stormlyre, Visyris, Radoman.","other":"To be accepted you usually must be a close relative of the teacher or already an accomplished musician. Harmonist rivalry is fierce; a pupil who outshines their teacher can earn a lifelong enemy."},"startingSkills":[],"masters":[{"name":"Cidcil Stormlyre","text":"Volatile master harmonist who never leaves his mountain keep.","requirement":"He is stuck on his magnum opus, The Midnight Sonata, and needs inspiration."},{"name":"Visyris","text":"Wine-loving, self-absorbed satyr gone missing in the north.","requirement":"Rumoured captive of the Roughhides of Boarwood orc clan — rescue him."},{"name":"Radoman","text":"Ancient dwarf from the crystal halls of the Glass Mountains.","requirement":"The dragonhide on his trudledrum split and he has sunk into apathy; replace it."}],"rules":[{"name":"Starting harmonists","text":"Harmonism cannot be chosen by a starting mage, as it isn't a separate skill. Only bards may start with it: instead of the heroic ability Musician, the bard gets three rank 1 harmonism spells of their choice, three harmonism magic tricks, and a grimoire."},{"name":"Performance is the magic skill","text":"Harmonism spells are cast with PERFORMANCE. Learning them uses advancement marks for Performance and requires Performance skill level 12 or higher plus a willing teacher. Every rank 1 spell has the prerequisite 'Skill level 12 in Performance'."},{"name":"No general magic","text":"Because harmonism is not a magic school skill, harmonists cannot learn general magic spells."},{"name":"Learning during play","text":"A character who didn't start as a bard with harmonism spells must first gain the heroic ability Magic Talent before learning harmonism spells in play."},{"name":"New requirement: Melody","text":"A spell with the Melody requirement is activated by a sung or played melody (voice or instrument). All harmonism spells use Melody as their only requirement."}],"spellTree":[{"rank":1,"spells":["Inspire","Serenity","Mend","Protective Harmonies","Tune Mood"]},{"rank":2,"spells":["Encourage","Doubt","Paralyze","Elude Senses","Frenzy"]},{"rank":3,"spells":["Rest","Cacophony","Placate Nature","Dance"]},{"rank":4,"spells":["Spiritual Solace","Break","Musical Blast","Hypnotize Monster","Mass Dance"]},{"rank":5,"spells":["Raze","Abyssal Resonance"]}]},
  {"id":"illusionism","name":"Illusionism","page":55,"source":"magic","skill":"Illusionism","attribute":"INT","title":"Illusionist","creation":true,"professions":["Mage"],"summary":"Magic of perception: since reality is only what each mind perceives, illusionists manipulate or dictate what others see, hear and believe — apparitions and full-sense illusions, disguises, shadows, confusion, dreams and, at the highest level, illusions real enough to be physical.","prevalence":"Commonly said to be invented by criminals, though perhaps really by rulers wanting to spy on and control their subjects. Found among all kin, maybe most among halflings; the street magicians folk associate with it are mostly human, and real mages are hard to tell from mere tricksters.","types":[{"name":"Performer","text":"The most visible type, entertaining in squares, banquets, inns and festivals."},{"name":"Court mage","text":"Serves a ruler, helping them move unseen among subjects and keep control."},{"name":"Thief","text":"Uses illusions for pickpocketing, forgery, burglary and elaborate cons."}],"familiar":{"text":"Illusionists favour familiars that pass for ordinary animals or hide well — colour-shifting lizards most often, and birds for performers and thieves. Besides the normal familiar abilities (p.10) the familiar can have Shadow Shroud: for 2 WP it is cloaked in shadow and gets a boon on a SNEAKING roll.","creatures":[]},"study":{"ranks12":"Find an academy or a street conjurer willing to teach: 5 gold or more per shift, or work off the fee as their assistant. Many illusionists began as child apprentices.","ranks34":"Learned at higher, pricier academies, often 50 gold per shift or more. Unless you are a relative or close friend, masters are hard to persuade — some prefer to keep you as an assistant, others want proof of strong moral character first.","rank5":"Top masters are already rich and accept no coin or valuables, only deeds. Examples: Smilla Virtuosa, Brasobar Sakare, Mistress Rosa.","other":"Most respectable academies employ an illusionist master or two, but experienced illusionists are fickle, impulsive and careless of agreements and courtesy."},"startingSkills":["Bartering","Bluffing","Evade","Illusionism","Performance","Persuasion","Sleight of Hand","Sneaking"],"masters":[{"name":"Smilla Virtuosa","text":"Travelling enchantress still as beautiful as a century ago (in public).","requirement":"Help her secret illusionist network prove the merchant Mr. Krankle runs the penal colony in the woods of Marshpool."},{"name":"Brasobar Sakare","text":"Court mage to Count Artoro of Wankleford; loves cheesy desserts, hates headwinds and hills.","requirement":"Deal with the monster in the northern highlands before the county cheese festival while he finishes his cheesecake."},{"name":"Mistress Rosa","text":"Former rose-petal burglar, now head of a big-city thieves' guild.","requirement":"Unmask the true employer of a rival gang encroaching on the guild's turf and eliminate the threat."}],"rules":[{"name":"Seeing through illusions","text":"Illusions of creatures (Apparition, Illusion) are seen through with an AWARENESS roll that is not an action: the observer rolls with a boon at power level 1, normally at 2 and with a bane at 3, and may try again every round. Anyone who fails must act as if the illusion were real. A purely visual Apparition vanishes for everyone the moment someone touches it."},{"name":"Opposed mind effects","text":"Mind-bending spells (Confusion, Amnesia, Waking Nightmare, Fatal Mistake) are opposed by the target's INT. Power level sets the target's roll: boon at 1, plain at 2, bane at 3. Area versions such as Mass Confusion give each victim an INT roll instead (no action, same scale), repeatable every turn."},{"name":"Disguises","text":"Impersonate and Group Identity fool everyone at a distance. Fooling someone in conversation needs a BLUFFING or PERFORMANCE roll by the caster/spokesperson — with a bane at power level 1, normally at 2, with a boon at 3."},{"name":"Terrain illusions","text":"False Terrain: an intelligent creature that physically interacts with it automatically sees through it; the illusion remains for others, but anyone who has seen through it may ignore it. Fata Morgana is so real that even those who know it is false are affected as if it were physical."},{"name":"Monsters and undead","text":"Most illusionism spells that affect minds have no effect on monsters or undead (Trip and Fatal Mistake exclude monsters)."}],"spellTree":[{"rank":1,"spells":["Long Shadows","Apparition","Confusion","Mind Mask","Send Dream"]},{"rank":2,"spells":["Shadow Shroud","Illusion","Trip","Impersonate","Amnesia"]},{"rank":3,"spells":["Shadow Leap","Mirror Image","Mass Confusion","Group Identity","Waking Nightmare"]},{"rank":4,"spells":["Doppelganger","False Terrain","Fatal Mistake"]},{"rank":5,"spells":["Fata Morgana","Cheat Fate"]}]},
  {"id":"mentalism","name":"Mentalism","page":65,"source":"magic","existing":true,"skill":"Mentalism","attribute":"INT","title":"Mentalist","creation":true,"professions":["Mage"],"summary":"Mentalists hold that consciousness, not spirit or life force, is the root of reality, so a trained mind can reshape the world. Their magic covers far-seeing, mind-reading and mind control, telekinetic force, flight and teleportation.","prevalence":"A small school of loners, often seen as eccentric contrarians who in turn look down on ordinary folk. Mentalists reject the idea that the school is tied to any kin or region.","types":[{"name":"Explorer","text":"Studies the nature and limits of will and thought."},{"name":"Skeptic","text":"Questions everything and argues with anyone who speaks of natural laws or objective facts."},{"name":"Nihilist","text":"Sees morals and laws as fictions and uses magic for gain — manipulation, spying, blackmail and theft."}],"familiar":{"text":"Rare and kept for practical reasons — a sounding board for a skeptic, or a snake, rat or bird for a criminal mentalist. Sensory Link (extra familiar ability): links the familiar to one of the master's senses (sight, hearing, smell or taste) for a stretch; the master must stay in meditation the whole time and perceives everything the familiar does with that sense.","creatures":[]},"study":{"ranks12":"Many academies have someone who, for 5 gold per shift, tests whether you have the talent and teaches the basic spells. Otherwise find a master through rumour and serve them around the clock as an apprentice.","ranks34":"A few academies keep elderly, reluctant mentalists who teach for at least 50 gold per shift; the alternative is hard labour for a hermit.","rank5":"Grandmasters are rare and unwilling; besides spell/skill prerequisites they demand a task or quest per spell (see masters).","other":"Few teachers exist; best bet is an established academy, or becoming a hermit's assistant."},"masters":[{"name":"\"The White Cat\"","requirement":"Must have mastered Bounce and have Sneaking 15+. Take part in a theft or spying mission for each spell taught."},{"name":"Linol the Doubter","requirement":"Must have mastered Matter Control and have Myths & Legends 15+. Publicly help expose a compromising secret of someone in power for each spell taught."},{"name":"Raz Aldghul","requirement":"Give away all possessions except three sets of clothes and coin for one week's stay; everything else goes to his mountain academy for the needy."}],"startingSkills":["Acrobatics","Awareness","Brawling","Evade","Healing","Languages","Mentalism","Myths & Legends"],"rules":[{"name":"Sensory Link","text":"Familiar ability: share one sense (sight, hearing, smell or taste) with the familiar for a stretch while the mentalist meditates."}],"spellTree":[{"rank":1,"spells":["Farsight","Longstrider","Stone Skin","Power Fist","Levitate"]},{"rank":2,"spells":["Scrying","Telepathy","Divination","Enchant Weapon","Mental Strike"]},{"rank":3,"spells":["Dominate","Teleport","True Sight","Flight","Shockwave"]},{"rank":4,"spells":["Control Person","Bounce","Speed","Matter Control"]},{"rank":5,"spells":["Dominate Monster","Invisibility"]}]},
  {"id":"necromancy","name":"Necromancy","page":75,"source":"magic","skill":"Necromancy","attribute":"INT","title":"Necromancer","creation":true,"professions":["Mage"],"summary":"The magic of death, fear and pain: necromancers manipulate the energies that linger after death to terrify, wound and sap the living and to raise and command the dead. Many claim a scholarly interest in what makes life endurable; plenty simply crave the power.","prevalence":"Feared and despised. No elf or halfling necromancers are known; dwarves, wolfkin and mallards have produced some, but it is most common among humans, especially descendants of mages of other schools.","types":[{"name":"Corpse Inspector","text":"An academic interested in death, pain and fear in theory; tolerated at academies but shunned."},{"name":"Tyrant","text":"Uses death, fear and pain as tools to gain and expand power."},{"name":"Tormentor","text":"Takes pleasure in inflicting suffering."}],"familiar":{"text":"Usually a bullied cat, poodle, snake or owl that mimics its master's menacing look in public; the partnership is more equal when the familiar is bound to a reanimated carcass. Undead Familiar (extra familiar ability): the familiar takes half damage from piercing weapons and can make a fear attack against a living creature (not a monster) for 2 WP.","creatures":[]},"study":{"ranks12":"Pay 5 gold per shift plus one lunar cycle of labour for each spell taught.","ranks34":"At least 50 gold per shift, plus the same lunar cycle of labour per spell.","rank5":"Few have reached this level and they are busy darkening the world; it takes a significant incentive (see masters).","other":"Taught master to apprentice. Masters are guarded by undead thralls or beasts: approach unarmed and grovel; expect one or more Persuasion rolls, with possibly fatal failure. Repeat attempts allowed."},"masters":[{"name":"Multras Orvinkel","requirement":"Recover the Crotchet Hook of Necron from the tyrant sorcerer Lugash."},{"name":"Karoan of the Blind Crater","requirement":"Convince him (Persuasion) that you share his worldview and join the invasion of Chieftain Wolfpaw's orc realm; Wolfpaw must be captured or killed."},{"name":"Zirazzia","requirement":"Retrieve her stolen grimoire from master thieves protected by the pyromancer Fanandel."}],"startingSkills":["Awareness","Bluffing","Healing","Languages","Myths & Legends","Necromancy","Sneaking","Spot Hidden"],"rules":[{"name":"Undead Familiar","text":"Familiar ability: half damage from piercing weapons; fear attack against a living non-monster for 2 WP."},{"name":"Raised Undead","text":"Raise Skeleton, Raise Wight, Raise Mummy and Raise Skeletal Horde create undead servants you speak to telepathically at any range. Skeletons follow orders to the letter and have no gear unless given some. With a wight or mummy you pick whom it attacks, but its monster attack is rolled; only one wight, one mummy and one horde at a time. See DB_SUMMONS_EXTRA."},{"name":"Opposed Rolls","text":"Most necromancy curses need an opposed roll vs the target's WIL or CON; the target gets a boon at power level 1, rolls normally at 2 and gets a bane at 3. Many have no effect on monsters and/or undead."}],"spellTree":[{"rank":1,"spells":["Cadaverous Stench","Fright","Speak With Dead","Pain","Rigor Mortis","Undead Aura"]},{"rank":2,"spells":["Corrosive Darkness","Dread","Animate Carcass","Injure","Incapacitate","Undead Resilience"]},{"rank":3,"spells":["Terror","Raise Skeleton","Hand of Death"]},{"rank":4,"spells":["Necrotic Chill","Raise Wight","Drain Life"]},{"rank":5,"spells":["Raise Mummy","Raise Skeletal Horde","Defy Death"]}]},
  {"id":"symbolism","name":"Symbolism","page":85,"source":"magic","skill":"Symbolism","attribute":"INT","title":"Symbolist","creation":true,"professions":["Mage"],"summary":"Symbolists cast by drawing, carving or tracing magical symbols that hold a spell for as long as they took to make. They see themselves as craftsfolk or artists, making wards, traps, compulsions and constructs that solve practical problems.","prevalence":"Ancient, possibly as old as writing, and most common (though still rare) among elves and dwarves. Humans practise it mostly in rural or nomadic communities; mallard and wolfkin symbolists are very rare, and halflings weave symbols from plants, moss and fungi.","types":[{"name":"Craftsman","text":"Values the making itself — refining materials, size, weight and durability for years."},{"name":"Artist","text":"Focuses on the beauty, balance and elegance of the symbols."},{"name":"Protector","text":"Hired by the rich and powerful as a cheaper, more discreet guardian than other mages."}],"familiar":{"text":"Uncommon, as symbol-crafting needs calm focus; cats and dogs are the usual choice. Mark (extra familiar ability): the symbolist can place symbol spells on the familiar's Mark, making them mobile, but their range drops to one fifth (e.g. 4 m instead of 20 m) and Personal-range spells affect only the familiar.","creatures":[]},"study":{"ranks12":"Easiest from an independent craftsman or artist found by asking around towns, villages and elven or halfling communities; usually 5 gold per shift, but you can haggle (Bartering).","ranks34":"Often 50 gold per shift or more, haggling still possible; teachers are easy to find and refer you on if they lack the skill.","rank5":"Grandmasters are approachable: a huge sum of gold, or more often a favour or errand (see masters).","other":"Plenty of practitioners are willing to teach; the hermit Solitor Stonemake is the known exception."},"masters":[{"name":"Trulsa Rockstead","requirement":"Recover enough sky-iron from a fallen comet in a wild forest for her to forge magical clappers for the Baroness of Elionor's copper gates."},{"name":"Dioneliel","requirement":"Find the halfling Fjord, met about 120 years ago in a distant coastal village, and bring him to the island."},{"name":"Lergolda Two-Mind","requirement":"Protect her from assassination — the goblin assassin clan \"Blood, Flour, Salt\" attacks the Runefire Academy. Who hired them?"}],"startingSkills":["Awareness","Crafting","Evade","Myths & Legends","Sleight of Hand","Sneaking","Spot Hidden","Symbolism"],"rules":[{"name":"Drawing and Carving","text":"Symbolism spells (not tricks) are cast by carving a symbol (one shift), drawing it (one stretch) or tracing it in the air (an action). The effect starts at once and lasts as long as the casting time — a round for air-traced symbols. Symbols can be Dispelled like other spells. Spells whose casting time lacks \"action\" can't be traced in the air."},{"name":"Seeing a Symbol","text":"Many symbols trigger when seen. An intelligent creature within range (usually 20 m) and facing an active symbol sees it at once; active symbols glow and are visible in darkness (GM rules on unclear cases). Those aware of it can try to look away with an Evade roll (not an action) each turn; on failure they glimpse it and are affected. A blindfold protects, but the wearer acts as in total darkness. The symbol fades when its duration ends."},{"name":"Permanent Symbols","text":"Permanence can make a symbol permanent only if it is carved in durable material. Magic Seal and Nexus can't be used on symbolism spells (and aren't needed)."},{"name":"Large Symbols","text":"Each extra stretch spent drawing (or shift carving) adds 5 m to the symbol's range. Decide the size before starting; roll for the spell when the symbol is finished."},{"name":"Symbol Requirement","text":"All symbolism spells that follow these rules have the requirement \"symbol\" (instead of word/gesture)."},{"name":"Mark","text":"Familiar ability: symbols placed on the familiar's Mark move with it at one fifth range; Personal spells affect only the familiar."}],"spellTree":[{"rank":1,"spells":["Farscribe","Hesitation","Lure","Shield Rune","Sunder"]},{"rank":2,"spells":["Warding Mark","Halt","Magic Armor","Fortify"]},{"rank":3,"spells":["Arcane Vortex","Horrify","Retribution Rune","Power Source"]},{"rank":4,"spells":["Portal","Blind","Reflect Magic","Golem"]},{"rank":5,"spells":["Runic Prison","Petrify","Raise Fortress"]}]},
  {"id":"witchcraft","name":"Witchcraft","page":95,"source":"magic","skill":"Witchcraft","attribute":"INT","title":"Witch","creation":true,"professions":["Mage"],"summary":"A loose, uncoordinated craft with no academies, practised mostly by recluses who live close to plants and animals. Its spells deal in shapeshifting, divination, curses and control over others and over beasts and monsters.","prevalence":"Kin to animism but focused on nature's tangible forms and patterns rather than its spirit; said to come from humans (or, some claim, from trolls). Most common among humans with nomadic or wilderness lives and among wolfkin clans; elves and halflings learn it more rarely.","types":[{"name":"Wildling","text":"The most common type: lives among plants and animals and only deals with civilized folk when asked for help or drawn into a conflict."},{"name":"Seer","text":"Reads the future and also tries to steer it."},{"name":"Punisher","text":"An embittered outcast who hates former kin and friends — unpredictable and very violent."}],"familiar":{"text":"Often a raven or a (preferably black) cat; snakes, voles, boars and toads are also popular. Special ability — Predict: besides the standard familiar abilities (p.10), before making a skill roll that has one or more banes, the witch may spend 3 WP to cancel one bane.","creatures":[],"ability":{"name":"Predict","wp":3,"timing":"before a skill roll with at least one bane","text":"Spend 3 WP to cancel one bane on the roll."}},"study":{"ranks12":"Many witches take one or two apprentices. Coin is rarely accepted; instead each shift of instruction costs a week of service (cooking, cleaning, carpentry, tending the forest).","ranks34":"Longer apprenticeship than other schools plus payment worth about 50 gold per shift in coin or goods. Each new spell takes a full day living with the witch, ending in practical tests.","rank5":"Only a handful can teach it (see the Archwitches table): usually a great task or service plus a whole week living with the teacher.","other":"Witches insist the craft is learned by living it and doing, not by theory — but in practice every aspiring witch still apprentices under a mentor."},"startingSkills":["Witchcraft","Awareness","Beast Lore","Bluffing","Healing","Myths & Legends","Persuasion","Sneaking"],"rules":[{"name":"Opposed WIL spells","text":"Curse, Hex, Compulsion and Polymorph are opposed by the target's WIL. Power level sets the target's roll: boon at 1, plain at 2, bane at 3."},{"name":"Stacking curses","text":"A target can be under Curse and Hex at once (two banes); Doomsday Prophecy also stacks with both. None of these can be applied twice to the same target while active."}],"masters":[{"name":"Damagus Asgus","text":"Ancient hermit whose hut flies on huge vulture wings to places where great events are brewing.","requirement":"Teaches powerful spells in return for help averting disasters — currently, finding and stopping cultists trying to open a rift into Chaos."},{"name":"Cruxhor","text":"Forest troll guarding the Joyous Woods, often appearing as a mangy horned monster or a dire wolf.","requirement":"Persuasion roll to convince her you're no threat, then help her drive out a violent ogre family from a forest cave."},{"name":"Rosia Ohl","text":"Judgmental halfling exile living alone in an ever-blooming summer meadow.","requirement":"Swear to adopt her worldview and wander as her apostle for at least a year; she likes patient listeners."}],"spellTree":[{"rank":1,"spells":["Animal Sense","Augury","Helper","Protective Aura","Witch Mark"]},{"rank":2,"spells":["Bestial Traits","Soothsaying","Fury of the Wild","Curse"]},{"rank":3,"spells":["Shapeshift","Safe Travels","Bestial Helper","Hex"]},{"rank":4,"spells":["Monster Whisperer","Flattery","Animate Object","Compulsion"]},{"rank":5,"spells":["Monster Form","Monster Warden","Polymorph","Doomsday Prophecy"]}]},
  {"id":"alchemy","name":"Alchemy","page":105,"source":"magic","skill":"Alchemy","attribute":"INT","title":"Alchemist","creation":true,"professions":["Mage"],"summary":"Instead of casting spells on the world, alchemists brew magical substances — potions, powders, bombs and poisons — from recipes and ingredients. A master can heal, harm, protect, empower and even make gold or prolong life.","prevalence":"An old craft repackaged about 350 years ago by Democrito and his theory of 'primordial particles'. Found among all kin, though dwarves (who prefer metal) and elves (who revere untouched nature) seldom take it up; humans stress theory, while mallard, halfling and wolfkin alchemists lean more on practical craft.","types":[{"name":"Philosopher","text":"Seeks to understand and explain the nature of the world; little interest in practical brewing."},{"name":"Producer","text":"Uses alchemical knowledge to make new substances, objects and effects — including the ubiquitous peddlers of ointments, creams and potions in towns and villages."}],"familiar":{"text":"Usually a creature suited to the wilds — tracking, scouting, warning of danger — such as a dog-like canine or a small bird. Special ability — Gather: besides the standard familiar abilities (p.10), for 1 WP the familiar fetches up to D6 tiny items within 10 meters; using it gives a boon on Bushcraft rolls to gather herbs.","creatures":[],"ability":{"name":"Gather","wp":1,"text":"Familiar collects up to D6 tiny items within 10 meters and brings them to you. Boon on Bushcraft rolls to gather herbs.","range":"10 meters","items":"D6"}},"study":{"ranks12":"Basic recipes can be bought for 5 gold each, with preparation instructions; learning one usually takes a shift. Ingredients (see the table) can be offered instead of coin.","ranks34":"Mostly taught by the commercial (peddler) type, hoping you'll stay and help the business. Costs at least 50 gold; ingredients are accepted only if each item is worth at least 2 gold.","rank5":"Top alchemists are wealthy and guard their secrets; money won't sway them — see the Alchemy Masters table for what they want.","other":"Alchemy is a school of magic (and a secondary skill) learned like any other school. Its 'spells' are called recipes and are learned and prepared just like spells. Apprentices are common, mostly as foraging help and a captive audience."},"startingSkills":["Alchemy","Bartering","Beast Lore","Bushcraft","Healing","Myths & Legends","Sleight of Hand","Spot Hidden"],"startingGear":[{"name":"Small Field Laboratory"},{"name":"General Herbs","doses":"D6"},{"name":"Alchemical substances","doses":3,"note":"chosen from recipes you know"}],"rules":[{"name":"Recipes instead of spells","text":"Alchemy's spells are recipes: you brew substances rather than casting effects. Full rules in DB_ALCHEMY."},{"name":"Laboratory requirement","text":"Every recipe needs an alchemical laboratory (not listed per recipe). Ordinary kitchen: bane on the Alchemy roll. Large room-sized laboratory (500+ gold): boon."},{"name":"No magic tricks","text":"Alchemy has no magic tricks."}],"masters":[{"name":"Mandolin Snufflewort","text":"Rich, portly halfling shopkeeper on the town square with a love of brawn, pâtés and sausages.","requirement":"Bored with ordinary food — teaches in return for exotic meat he hasn't processed yet, such as giant octopus, roc, chimera or giant amoeba."},{"name":"Baraka Ranhart","text":"Wandering wolfkin philosopher chasing the 'fundamental laws of the universe'.","requirement":"Wants Karilur Jungel's three-volume original 'The Significance of the Toenail Area to the Cosmic Mean' (volumes scattered); will teach in exchange."},{"name":"Methusel Gneiss","text":"Fearsome old crone in a lonely hut between remote villages.","requirement":"Secretly (and illegally) keeps a nymph captive for her tears. Finding the captive lets the PCs blackmail her into teaching a recipe; freeing the nymph afterwards makes her a mortal enemy."}],"spellTree":[{"rank":1,"spells":["Stun Powder","Focus Tonic","Invigorating Decoction","Medicinal Water","Soothing Brew","Sleeping Poison","Herbal Concoction","Liquid Courage","Spiritlifter"]},{"rank":2,"spells":["Puff Bomb","Smokescreen","Antidote","Paralyzing Poison","Healing Draught","Love Potion","Lock Acid"]},{"rank":3,"spells":["Sunflash","Drops of Strength","Elixir of Wisdom","Nimble Nectar","Lethal Poison","Healing Potion","Tincture of Beauty","Corrosive Sludge"]},{"rank":4,"spells":["Explosive Orb","Battle Fumes","Philosopher's Stone","Toxic Mist","Healing Tincture","Healing Vapors"]},{"rank":5,"spells":["Create Gold","Homunculus","Elixir of Life"]}]},
  {"id":"enchanting","name":"Enchanting","page":115,"source":"magic","skill":"Enchanting","attribute":"INT","title":"Enchanter","creation":true,"professions":["Mage"],"summary":"Enchanters bind magic into objects — weapons, armor, clothes, containers, wands — instead of casting at their surroundings. Their spells are passive item properties that last a shift, or forever with Permanence, and can be stacked on one item, optionally with drawbacks to pay for extra spells.","prevalence":"An old craft-magic predating the Demon Wars, practised everywhere from village needleworkers to palace goldsmiths. Other mages often look down on it as workaday magic, but enchanters are proud of making magic available to ordinary folk.","types":[{"name":"Toolmaker","text":"Serves ordinary customers, either from a city workshop or travelling between villages."},{"name":"Court Purveyor","text":"A showy, artistic enchanter who crafts beautiful items for nobles and kings."},{"name":"Venturer","text":"Wants to use magic items as much as make them, and field-tests creations on adventures."}],"familiar":{"text":"Enchanters pick host animals that can fetch, carry and work tools (often something big enough to pump bellows). Special familiar ability — Assistant: for 2 WP the familiar helps enchant an item, giving a boon on the roll. This is in addition to the general familiar abilities (p.10).","abilities":[{"name":"Assistant","wp":2,"text":"The familiar helps you enchant an item: boon on the Enchanting roll."}],"creatures":[]},"study":{"ranks12":"Usually learned as an apprentice: hard labour for a small wage that can be traded for lessons at 5 gold per shift.","ranks34":"Lessons cost around 50 gold per shift. Under a toolmaker you also keep half the profit of items/enchantments you sell, on top of your wage.","rank5":"Great masters rarely share their top secrets; instruction usually has to be earned by helping a master (see Master Enchanters table).","other":"Learning the Enchanting skill requires Crafting 12 or higher — also for new characters. High-rank enchanters may learn certain high-rank General spells (e.g. Permanence) without first learning the lower-rank General spells."},"startingSkills":["Enchanting","Bartering","Crafting","Hammers","Knives","Myths & Legends","Sleight of Hand","Spot Hidden"],"startingGear":"Blacksmithing tools, carpentry tools or tanning tools. You may also have one starting item enchanted with a spell you know plus Permanence.","noTricks":true,"teachers":[{"name":"Narvik Plum","text":"Cheerful old travelling trinket-seller who also sells his own magic items.","requirement":"Find his stolen chest (enchanted with Endless Capacity) taken from his wagon somewhere in the last three villages he visited; reward is a shift of instruction."},{"name":"Eldariel of Blue Lake Mountain","text":"Vain elven mage selling marvellous, very expensive contraptions in big cities.","requirement":"Wants the legendary Manacles of Baromorgos, said to be held by the wandering mountain giant Scula, to save his withering soul."},{"name":"Marlin Dunker","text":"Adventurous dwarf who joins strangers' expeditions just to use his magic arsenal.","requirement":"Teaches in exchange for information on a suitable dragon to kill and an escort to and from its lair."}],"rules":[{"name":"Tools requirement","text":"Every enchanting spell needs tools: blacksmithing, carpentry or tanning tools depending on the item. Magic Seal is not needed."},{"name":"Casting time & duration","text":"Binding a spell takes a stretch; the effect starts at once and lasts a shift unless combined with Permanence. Can be Dispelled unless made permanent."},{"name":"No range","text":"Spells are cast on items; any range in the effect is given in the spell."},{"name":"Power level","text":"Most enchanting spells have one level; if a spell lists no power-level effects it costs a flat 2 WP."},{"name":"Multiple spells","text":"Several enchanting spells can be cast on the same item at once in the same stretch. Pay WP and roll for each; if any roll fails, all fail."},{"name":"Drawbacks","text":"Add one or more drawbacks when enchanting: each lets you add one extra spell at no WP cost and with no roll."},{"name":"Permanence","text":"One casting of Permanence (rolled separately) makes every spell cast on the item at that time permanent — including its drawbacks."},{"name":"No magic tricks","text":"Enchanting has no magic tricks."}],"spellTree":[{"rank":1,"spells":["Warming","Concealing","Supple Armor","Thinking Cap","Luminous","Farshot","Keen Edge","Unbreakable"]},{"rank":2,"spells":["Fireproof","Fleet Step","Heroism","Bane Weapon","Dread Weapon","Bleeding Weapon","Poison Sting"]},{"rank":3,"spells":["Resonant Plate","Garment of Strength","Magic Wand","Enchanted Weapon","Bloodsucker","Hidden Weapon"]},{"rank":4,"spells":["Lifesaver","Endless Capacity","Heavy Hitter","Seeking Arrow","Swift Swing","Throwable"]},{"rank":5,"spells":["Epic Armor","Power Item","Epic Weapon"]}]},
  {"id":"dracomancy","name":"Dracomancy","page":131,"source":"magic","skill":"Dracomancy","attribute":"INT","title":"Dracomancer","creation":false,"professions":["Mage"],"summary":"The reality-bending magic of mature dragons, learnable by mortal archmages as a supplement to their own school. All its spells are rank 6 and extremely powerful — astral travel, creating and erasing matter, stopping or rewinding time — and cost triple WP.","prevalence":"Practitioners are vanishingly few and come from any school or kin. Most keep it a hidden trump card; dragons see open use of it as an insult and a sign of weakness.","types":[{"name":"Discreet dracomancer","text":"The majority, who conceal their dracomantic spells."},{"name":"Dragonmaster","text":"The rare few who openly flaunt the power and claim the title."}],"familiar":{"text":"A dracomancer's familiar follows the rules of their primary school. Binding a familiar to a dragon hatchling is only legend, and would bring every dragon down on the mage.","abilities":[],"creatures":[]},"study":{"ranks12":"","ranks34":"","rank5":"","other":"Only in play: you must have mastered another school (know at least one rank 5 spell, any school) before learning the Dracomancy skill or its spells. Teachers are extremely rare and demand extraordinary favours or payment (see Dracomancy Masters table)."},"startingSkills":[],"noTricks":true,"optionalRule":true,"teachers":[{"name":"Alvin Wineroot","text":"Harmonist satyr held for decades as the entertaining 'guest' of the ancient dragon Karankion, who taught him dracomancy.","requirement":"His friends hire rescuers; whoever frees him (by stealth or force) is taught dracomancy."},{"name":"Grimdira of Sunnan","text":"Famous self-styled Dragonmaster living in a palace amid a dragon-like hoard.","requirement":"Will teach anyone, but each dracomantic spell costs huge amounts of gold and jewels."},{"name":"Rafner the Devastator","text":"Dying dragon exiled by his kind for atrocities, sulking in the Cinder Peaks.","requirement":"Calm his rage and stay a month listening to his stories to be taught. Stay until he dies (2D6 months) and defend him from heroes to perhaps inherit his hoard."}],"rules":[{"name":"Using Dracomancy","text":"Dracomantic spells cost triple WP: 6 WP per power level. Rolled with the Dracomancy skill."},{"name":"Prerequisite","text":"Every dracomantic spell is rank 6 with the prerequisite 'any rank 5 spell' from any school."},{"name":"A word of caution","text":"Some dracomantic spells can upend a scenario; the group should agree beforehand whether dracomancy is allowed at the table."},{"name":"Dragons' view","text":"Dragons regard blatant use of dracomancy as insulting and weak — flaunting it may provoke them."}],"spellTree":[{"rank":6,"spells":["Astral Form","Command Dragon","Create","Draconic Push","Erase","Force Field","Freeze Time","Reshape","Reverse Time","Translocate"]}]}
];

export const DB_MAGIC_TRICKS_EXPANSION = [
  {"name":"Sense Magic","school":"General","page":8,"text":"Sense whether where you are, or an item you hold, is touched by magic — and if so, which spell and at what power level.","source":"magic","updated":true},
  {"name":"Summon Tweeg","school":"Demonology","page":28,"text":"Call up a tweeg — a rat-sized demon with no skills — that stays a shift and helps with everyday chores.","source":"magic"},
  {"name":"Stench","school":"Demonology","page":28,"text":"Once per shift, fill a room with a reek so foul that everyone inside must leave or pass a CON roll or vomit. No effect in combat or similarly tense situations.","source":"magic"},
  {"name":"Slip of the Tongue","school":"Demonology","page":28,"text":"Cut in on someone within 10 m mid-sentence and replace up to three of their words (ideally rude ones); bystanders hear it in their voice. Words beyond three come out in your voice. The victim can't be affected again for 24 hours.","source":"magic"},
  {"name":"Luring Song","school":"Harmonism","page":48,"source":"magic","text":"Draw a group of small mammals suited to the area (squirrels, hedgehogs, mice, rats…); they stay while you keep singing or playing."},
  {"name":"Magical Melody","school":"Harmonism","page":48,"source":"magic","text":"Give your voice or instrument a magical quality — a boon on PERFORMANCE where the GM finds it fitting, but not for spellcasting."},
  {"name":"Voice Distortion","school":"Harmonism","page":48,"source":"magic","text":"Change your voice beyond recognition — sometimes worth a boon on BLUFFING (GM's call)."},
  {"name":"Double Tongue","school":"Illusionism","page":58,"source":"magic","text":"Speak aloud while one nearby person hears a different, secret message — e.g. a signal to flee, fight or keep quiet."},
  {"name":"Embellish","school":"Illusionism","page":58,"source":"magic","text":"Make colours, sounds, tastes and smells richer in a room-sized area for a stretch; it won't fool anyone unwilling to be fooled."},
  {"name":"Phantasm","school":"Illusionism","page":58,"source":"magic","text":"Conjure fake objects and glowing orbs for show — a boon on BLUFFING or PERFORMANCE."},
  {"name":"Shadow Play","school":"Illusionism","page":58,"source":"magic","text":"Make shadows dance, take eerie shapes or crawl over your skin; anyone watching gets a bane on AWARENESS."},
  {"name":"Blight","school":"Necromancy","page":78,"source":"magic","text":"Briefly sour your surroundings with grey hues, jarring sounds, foul tastes or stenches — a reminder that life is fleeting."},
  {"name":"Preserve","school":"Necromancy","page":78,"source":"magic","text":"A touch halts the decay of a recently dead body for a full day; can be renewed indefinitely."},
  {"name":"Spectral Slap","school":"Necromancy","page":78,"source":"magic","text":"A stinging, humiliating slap from your gaze: 1 HP damage to a target within 10 m."},
  {"name":"Taint","school":"Necromancy","page":78,"source":"magic","text":"Your presence spoils food, drink or a fresh corpse and spooks small animals nearby. Anyone who eats or drinks the tainted fare is exposed to a lethal poison of potency 9."},
  {"name":"Cipher","school":"Symbolism","page":89,"source":"magic","text":"Encode a text so only a named person you know can read it normally. Can be Dispelled. No symbol needed."},
  {"name":"Dictation","school":"Symbolism","page":89,"source":"magic","text":"A quill writes down everything you say, word for word, for a stretch. No symbol needed."},
  {"name":"Erase","school":"Symbolism","page":89,"source":"magic","text":"Erase one page of text not carved into durable material just by looking at it. No symbol needed."},
  {"name":"Speed Reading","school":"Symbolism","page":89,"source":"magic","text":"Read a page per breath with full retention; learning from a book (e.g. a spell) takes a stretch instead of a shift. No symbol needed."},
  {"name":"Broom Sweep","school":"Witchcraft","page":98,"text":"A broom cleans and tidies the room you're in — dust and dirt gone, things put in order.","source":"magic"},
  {"name":"Itch","school":"Witchcraft","page":98,"text":"Give a visible person within 20 m an annoying but harmless itch that lasts a stretch.","source":"magic"},
  {"name":"Read Stars","school":"Witchcraft","page":98,"text":"Spend a stretch reading someone's future in the stars to gain a boon on Bluffing and Persuasion rolls against them.","source":"magic"}
];

export const DB_SPELLS_EXPANSION = [
  {"name":"Alarm","school":"General","rank":1,"prerequisite":"Any school of magic","requirements":["gesture"],"castingTime":"action","range":"Touch","duration":"Shift","page":8,"text":"Place an invisible rune on a single non-organic object (door, floor tile, urn…) and set a trigger such as opening, stepping on or touching it. When it triggers you know at once, wherever you are. Lasts a shift, a week at power level 2, a year at 3.","powerLevels":true,"dodge":false,"parry":false,"durationByLevel":["Shift","Week","Year"],"source":"magic"},
  {"name":"Dispel","school":"General","rank":1,"prerequisite":"Any school of magic","requirements":["word","gesture"],"castingTime":"action","range":"10 meters","duration":"Instant","page":9,"text":"End an ongoing spell (Protector included) of equal or lower power level; dispelling a ritual takes a stretch. The GM or adventure may let it end other magical effects. Useless against powerful rituals — Familiar, Nexus, Permanence and anything made permanent — which need Counter Ritual.","powerLevels":true,"dodge":false,"parry":false,"castingTimeAlt":"stretch","revised":true,"source":"magic"},
  {"name":"Protector","school":"General","rank":1,"prerequisite":"Any school of magic","requirements":["gesture","ingredient"],"requirementDetail":"something to draw with","castingTime":"action","range":"Touch","duration":"Shift","page":9,"text":"Ward a person or object (up to human size, yourself included) against magic: every spell cast at it, Dispel included, loses power levels equal to this spell's. The ward ends at once if the target moves, willingly or not. Against a monster's magical attack (GM decides what counts), each power level removes one damage die.","powerLevels":true,"dodge":false,"parry":false,"self":true,"revised":true,"source":"magic"},
  {"name":"Familiar","school":"General","rank":2,"prerequisite":"Alarm or Protector","requirements":["ingredient"],"requirementDetail":"the animal","castingTime":"stretch","range":"Touch","duration":"Shift","page":9,"text":"Bind a willing spirit of the dead into the fresh corpse of a small vertebrate (mouse- to cat/raven/dog-sized). It keeps the animal's stats, has no WP of its own, obeys you, talks with you telepathically at any range and acts on your turn (before or after you). Lasts a shift, a week at power level 2, the rest of your life at 3. One familiar at a time; you may dismiss it to dust. If it is killed (not dismissed) your max WP drops by 1. Immune to Dispel; Counter Ritual drives the spirit out (as if killed). It gets two abilities from the familiar list — one may be swapped for a school ability of a school you have.","powerLevels":true,"dodge":false,"parry":false,"durationByLevel":["Shift","Week","Rest of your life"],"familiar":true,"source":"magic"},
  {"name":"Magic Ward","school":"General","rank":3,"prerequisite":"Magic Shield","requirements":["gesture"],"castingTime":"reaction","range":"10 meters","duration":"Instant","page":11,"text":"A brief field of force around you or another creature cuts an incoming attack's damage by 2D4, plus D4 for each further power level. Cast once you know the attack hits, before damage is rolled. Stacks with armor.","powerLevels":true,"dodge":false,"parry":false,"self":true,"damageReduction":{"base":"2D4","perLevel":"D4"},"source":"magic"},
  {"name":"Transfer","school":"General","rank":3,"prerequisite":"Familiar or Magic Shield","requirements":["gesture"],"castingTime":"action","range":"Touch","duration":"Instant","page":11,"text":"Drain WP from a humanoid or give yours to someone — up to twice the casting cost (4 / 8 / 12 WP by power level). The casting WP is lost; nobody goes above max or below zero. If the subject refuses, the spell is cast by an opposed roll against their WIL.","powerLevels":true,"dodge":false,"parry":false,"opposed":"WIL","source":"magic","updated":true},
  {"name":"Charge","school":"General","rank":4,"prerequisite":"Transfer or any rank 3 Enchanting spell","requirements":["word","gesture"],"castingTime":"stretch","range":"Touch","duration":"Shift","page":12,"text":"Pour up to 10 WP per power level into an object; anyone touching it can spend those WP instead of their own. They fade after a shift unless made permanent with Permanence — then the item can be recharged with Charge alone. Can be paired with Magic Seal.","powerLevels":true,"dodge":false,"parry":false,"source":"magic","updated":true},
  {"name":"Greater Familiar","school":"General","rank":4,"prerequisite":"Transfer","requirements":["word","ingredient"],"requirementDetail":"the animal","castingTime":"shift","range":"Touch","duration":"Shift","page":12,"text":"As Familiar, but the spirit goes into a larger, stronger animal (Rulebook p.99), or moves an existing familiar's spirit into one. Lasts a shift, a week at power level 2, the rest of your life at 3. A greater familiar has four familiar abilities (one may be your school's ability); an upgraded familiar keeps its two and gains two more.","powerLevels":true,"dodge":false,"parry":false,"durationByLevel":["Shift","Week","Rest of your life"],"familiar":true,"source":"magic"},
  {"name":"Magic Seal","school":"General","rank":4,"prerequisite":"Transfer or any rank 3 Enchanting spell","requirements":["word","gesture"],"castingTime":"shift","range":"Touch","duration":"Until use","page":12,"text":"Bind a spell into an inanimate object: roll for the spell, then for the seal, both at the same power level (power level 1 for a trick); both must succeed. Set the trigger (usually an action). Whoever triggers it pays the WP (no WP, no effect); it succeeds automatically — no dragon or demon — and spells normally cast by opposed roll instead give the target a plain roll to resist. Using it breaks the seal unless Permanence was added at creation; Charge or Nexus can power it instead of the user. All these rituals can go on one object in a single shift, each rolled and paid separately. Can't bind alchemy recipes or Enchanting spells. Binding a ritual (stretch/shift casting time) costs you 1 max WP per power level (1 even on failure), and Permanence/Nexus add more loss. If the bound ritual itself lowers max WP (e.g. Rejuvenation), the activator takes that loss (Nexus can't prevent it). One seal per spell; likewise one Permanence per spell, but one Charge or Nexus can power several spells on the same object.","powerLevels":true,"dodge":false,"parry":false,"revised":true,"source":"magic"},
  {"name":"Counter Ritual","school":"General","rank":5,"prerequisite":"Magic Seal or any rank 4 Enchanting spell","requirements":["word","gesture"],"castingTime":"shift","range":"4 meters","duration":"Instant","page":12,"text":"Undo a powerful ritual such as Rejuvenation, Nexus or Permanence; power level must equal the ritual's. Costs 1 max WP per power level permanently (1 even on failure). A Counter Ritual can't be dispelled or reversed by another Counter Ritual. The GM or adventure may allow it to break other strong rituals and curses.","powerLevels":true,"dodge":false,"parry":false,"permanentWpLoss":"Max WP −1 per power level permanently; −1 even if the ritual fails.","source":"magic"},
  {"name":"Nexus","school":"General","rank":5,"prerequisite":"Charge","requirements":["word","gesture"],"castingTime":"shift","range":"Touch","duration":"Permanent","page":13,"text":"Only on an object already holding a Magic Seal with Permanence (all can be done in one shift, each rolled and paid separately). Opens a tiny portal to Chaos that powers the sealed spell: it activates any number of times at no WP cost and with no roll. Power level must equal the Magic Seal's and Permanence's. Costs 1 max WP per power level permanently (1 even on failure). Can't be dispelled; Counter Ritual undoes it.","powerLevels":true,"dodge":false,"parry":false,"permanentWpLoss":"Max WP −1 per power level permanently; −1 even if the ritual fails.","source":"magic"},
  {"name":"Permanence","school":"General","rank":5,"prerequisite":"Magic Seal or any rank 4 Enchanting spell","requirements":["word","gesture"],"castingTime":"shift","range":"Touch","duration":"Permanent","page":13,"text":"Make another (non-instant) spell permanent; the same mage rolls both, at the same power level. Costs 1 max WP per power level permanently (1 even on failure). With Magic Seal the seal becomes permanent and the bound spell can be used again and again (user's WP, or via Charge/Nexus); if Magic Seal and Charge are on the same item, one Permanence covers both. Can't be dispelled; Counter Ritual undoes it.","powerLevels":true,"dodge":false,"parry":false,"revised":true,"permanentWpLoss":"Max WP −1 per power level permanently; −1 even if the ritual fails.","source":"magic"},
  {"name":"Rejuvenation","school":"General","rank":5,"prerequisite":"Charge","requirements":["word","gesture","focus"],"castingTime":"shift","range":"Personal","duration":"Permanent","page":13,"text":"Make your body younger. Power level 1 restarts your ageing within your current age category; 2 moves you one category younger (old→adult, adult→young); 3 takes you from old to young. Attributes (and so max HP/WP) change to match; skills don't. Impossible if already young. Costs 1 max WP per power level permanently (1 even on failure). On a demon, no mishap roll: you age one category instead, or die outright if already old. Can't be dispelled; a Counter Ritual undoes it and kills a mage who is old despite the rejuvenation.","powerLevels":true,"dodge":false,"parry":false,"permanentWpLoss":"Max WP −1 per power level permanently; −1 even if the ritual fails.","source":"magic"},
  {"name":"Cure","school":"Animism","rank":1,"prerequisite":"Animism","requirements":["word"],"castingTime":"action","range":"Touch","duration":"Instant","page":19,"text":"End a natural disease or poison (Rulebook p.52–53) affecting you or another living creature at once. Magical diseases may need power level 2 or 3, and some can't be cured at all.","powerLevels":true,"dodge":false,"parry":false,"self":true,"source":"magic"},
  {"name":"Nourish","school":"Animism","rank":1,"prerequisite":"Animism","requirements":["gesture"],"castingTime":"stretch","range":"Personal","duration":"Instant","page":20,"text":"Grow fine roots from your hands and feet into the ground for a stretch; it covers your food and water needs for a full day. Power level needed depends on terrain: 1 in forest or fertile wilds, 2 in settlements or vegetated mountains, 3 in barren mountains or caves.","powerLevels":true,"dodge":false,"parry":false,"source":"magic"},
  {"name":"Calm Animal","school":"Animism","rank":2,"prerequisite":"Animal Whisperer","requirements":["word","gesture"],"castingTime":"action","range":"20 meters","duration":"Instant","page":20,"text":"Pacify common mammals or birds, as many as the power level. Ends at once if they're attacked. No effect on monsters.","powerLevels":true,"dodge":false,"parry":false,"source":"magic"},
  {"name":"Recovery","school":"Animism","rank":2,"prerequisite":"Cure","requirements":["word"],"castingTime":"action","range":"Touch","duration":"Instant","page":21,"text":"Instantly clear conditions from yourself or another living being — one of your choice per power level.","powerLevels":true,"dodge":false,"parry":false,"self":true,"removesConditions":"1 per power level","source":"magic"},
  {"name":"Reinvigorate","school":"Animism","rank":2,"prerequisite":"Nourish","requirements":["word"],"castingTime":"stretch","range":"Personal","duration":"Instant","page":21,"text":"As Nourish (a stretch rooted in the ground, covering food and water for a day), and you are also healed of all conditions. Power level by terrain: 1 forest or fertile wilds, 2 settlements or vegetated mountains, 3 barren mountains or caves.","powerLevels":true,"dodge":false,"parry":false,"removesConditions":"all","source":"magic"},
  {"name":"Sleep","school":"Animism","rank":2,"prerequisite":"Treat Wound","requirements":["word"],"castingTime":"action","range":"Touch","duration":"Instant","page":21,"text":"Opposed roll against the target's WIL — they roll with a boon at power level 1, normally at 2, with a bane at 3. If you win they fall into a deep sleep for a stretch; very hard to wake, but damage wakes them. Living beings only; no effect on monsters.","powerLevels":true,"dodge":false,"parry":false,"revised":true,"opposed":"WIL","source":"magic"},
  {"name":"Command Animal","school":"Animism","rank":3,"prerequisite":"Calm Animal","requirements":["word","gesture"],"castingTime":"stretch","range":"20 meters","duration":"Concentration","page":21,"text":"Control mammals or birds (familiar table p.10, Rulebook p.99), as many as the power level, while you concentrate. Telepathic orders at any range: track, carry messages, attack and so on. In combat they act on your turn, each moving and taking one action. No effect on monsters.","powerLevels":true,"dodge":false,"parry":false,"source":"magic"},
  {"name":"Daze","school":"Animism","rank":3,"prerequisite":"Sleep","requirements":["word","gesture"],"castingTime":"action","range":"10 meters","duration":"Instant","page":21,"text":"Up to your WIL base chance in targets within range roll WIL — with a boon at power level 1, normally at 2, with a bane at 3. Everyone who fails becomes Dazed. No effect on monsters.","powerLevels":true,"dodge":false,"parry":false,"resistRoll":"WIL","maxTargets":"WIL base chance","source":"magic"},
  {"name":"Exhaust","school":"Animism","rank":3,"prerequisite":"Sleep","requirements":["word","gesture"],"castingTime":"action","range":"10 meters","duration":"Instant","page":21,"text":"Up to your WIL base chance in targets within range roll WIL — with a boon at power level 1, normally at 2, with a bane at 3. Everyone who fails becomes Exhausted. No effect on monsters.","powerLevels":true,"dodge":false,"parry":false,"resistRoll":"WIL","maxTargets":"WIL base chance","source":"magic"},
  {"name":"Mass Purge","school":"Animism","rank":3,"prerequisite":"Purge","requirements":["word","gesture","focus"],"requirementDetail":"sacred symbol","castingTime":"action","range":"10 meters","duration":"Instant","page":22,"text":"Exorcise demons or undead in range, up to your WIL base chance in number: each takes 2D6 (rolled separately). Armor and natural armor don't help; can't be dodged or parried. Each extra power level adds either D6 damage or 10 m of range.","powerLevels":true,"dodge":false,"parry":false,"damage":{"base":"2D6","perLevel":"D6"},"target":"Demons and undead only","ignoresArmor":true,"maxTargets":"WIL base chance","source":"magic"},
  {"name":"Thorn Field","school":"Animism","rank":3,"prerequisite":"Engulfing Forest","requirements":["word","gesture","ingredient"],"requirementDetail":"a handful of seeds","castingTime":"action","range":"10 meters (sphere)","duration":"Shift","page":22,"text":"Scattered seeds root instantly, even on stone: the area becomes rough terrain and everyone in it but you (not monsters) is ensnared by thorns, can't move, and takes D8 piercing at the start of each turn. Breaking free: EVADE with a boon at power level 1, normal at 2, bane at 3; an action, one try per round; those not ensnared can help.","powerLevels":true,"dodge":false,"parry":false,"damage":{"perTurn":"D8","type":"piercing"},"source":"magic"},
  {"name":"Animalistic Influence","school":"Animism","rank":4,"prerequisite":"Command Animal","requirements":["word","gesture"],"castingTime":"stretch","range":"50 meters","duration":"Shift","page":23,"text":"Fill an intelligent living creature with an animal's emotions (a boar's rage, a cat's sloth, a sparrow's skittishness); the GM decides how it behaves. Power level 2 affects up to your WIL base chance in creatures, 3 up to five times that. Targets still defend themselves if attacked. Not on monsters or undead.","powerLevels":true,"dodge":false,"parry":false,"source":"magic"},
  {"name":"Healing Radiance","school":"Animism","rank":4,"prerequisite":"Restoration","requirements":["word","gesture"],"castingTime":"action","range":"10 meters","duration":"Instant","page":23,"text":"Every ally within range heals 2D6 HP, +D6 per extra power level. Doesn't heal you.","powerLevels":true,"dodge":false,"parry":false,"healing":{"base":"2D6","perLevel":"D6"},"area":"all allies in range, not you","source":"magic"},
  {"name":"Weather Mastery","school":"Animism","rank":4,"prerequisite":"Thunderbolt","requirements":["word","gesture"],"castingTime":"action","range":"100 meters","duration":"Shift","page":23,"text":"Change the weather around you. A minor shift (cloudy to rain, calm to breeze) is power level 1; unusual but seasonal weather (winter blizzard, summer heat, autumn storm) is 2; wholly unnatural weather (desert blizzard, midwinter heatwave) is 3.","powerLevels":true,"dodge":false,"parry":false,"source":"magic"},
  {"name":"Healing Aura","school":"Animism","rank":5,"prerequisite":"Healing Radiance","requirements":["word","gesture"],"castingTime":"action","range":"10 meters","duration":"Instant","page":23,"text":"Every ally in range heals 2D8 HP and one non-permanent severe injury (optional rule, Rulebook p.51). Each extra power level adds either 10 m of range or D8 HP. Doesn't heal you.","powerLevels":true,"dodge":false,"parry":false,"healing":{"base":"2D8","perLevel":"D8"},"area":"all allies in range, not you","source":"magic"},
  {"name":"Resurrection","school":"Animism","rank":5,"prerequisite":"Healing Radiance","requirements":["word","gesture","ingredient"],"requirementDetail":"corpse","castingTime":"shift","range":"Touch","duration":"Instant","page":23,"text":"Bring a dead person truly back to life (not as undead). Power level 1 within the same shift, 2 within a day, 3 within a week — after that the body is too far gone. One attempt only; failure means permanent death. Costs you 1 max WP permanently even on failure, but unlike the core rules Focused can raise it again. The returned lose D3 levels in every CHA-based skill (minimum 3). Counter Ritual can't undo it.","powerLevels":true,"dodge":false,"parry":false,"revised":true,"permanentWpLoss":"Max WP −1 permanently, even if the ritual fails (Focused can restore it).","source":"magic"},
  {"name":"Abyssal Stench","school":"Demonology","rank":1,"prerequisite":"Demonology","requirements":["word","gesture"],"castingTime":"action","range":"Personal","duration":"Round","page":29,"text":"Your body exudes the stench of Chaos. Until your next turn, anyone making a melee attack on you must first pass a CON roll (not an action) — boon at power level 1, normal at 2, bane at 3. On a failure the attack is cancelled and their action is lost. No effect on demons, undead or monsters.","powerLevels":true,"dodge":false,"parry":false,"resistRoll":"CON","target":"Not demons, undead or monsters","source":"magic"},
  {"name":"Carbuncle","school":"Demonology","rank":1,"prerequisite":"Demonology","requirements":["word","gesture"],"castingTime":"action","range":"10 meters","duration":"Instant","page":29,"text":"A winged demon louse homes in on a foe and burrows in: D4 damage at once, then a bigger die each turn (D6, D8, D10) until it bursts — after the 2nd damage roll at power level 1, the 3rd at 2, the 4th at 3. Dodgeable like a ranged attack; armor doesn't help; keeps going if you're incapacitated. No effect on demons or undead.","powerLevels":true,"dodge":true,"parry":false,"ignoresArmor":true,"target":"Not demons or undead","damage":{"base":"D4","escalating":["D6","D8","D10"],"burstsAfter":{"1":2,"2":3,"3":4}},"source":"magic"},
  {"name":"Chaos Swamp","school":"Demonology","rank":1,"prerequisite":"Demonology","requirements":["word","gesture"],"castingTime":"stretch","range":"10 meters","duration":"Shift","page":29,"text":"Taint the ground in a 10 m radius (you may leave a camp-sized safe zone in the middle): it turns hot, boggy and full of stinging fumes. Radius doubles per extra power level. Wild animals and beasts shun it; NPCs move at half speed; living creatures, monsters included, take D4 damage each turn they start in it. Flyers are unaffected.","powerLevels":true,"dodge":false,"parry":false,"damage":{"perTurn":"D4"},"source":"magic"},
  {"name":"Demonic Gust","school":"Demonology","rank":1,"prerequisite":"Demonology","requirements":["word","gesture"],"castingTime":"action","range":"10 meters (cone)","duration":"Instant","page":30,"text":"A reeking blast of Chaos wind: every opponent in the cone must resist fear with a WIL roll (Rulebook p.53) — boon at power level 1, normal at 2, bane at 3.","powerLevels":true,"dodge":false,"parry":false,"resistRoll":"WIL","fear":true,"source":"magic"},
  {"name":"Beetle Boil","school":"Demonology","rank":2,"prerequisite":"Carbuncle","requirements":["word","gesture"],"castingTime":"action","range":"20 meters","duration":"Instant","page":30,"text":"A spawn-laden demon beetle homes in and bites in: D6 damage at once, then a bigger die each turn (D8, D10, D12) until the spawn die — after the 2nd damage roll at power level 1, the 3rd at 2, the 4th at 3. Dodgeable like a ranged attack; armor doesn't help; continues if you're incapacitated. No effect on demons or undead.","powerLevels":true,"dodge":true,"parry":false,"ignoresArmor":true,"target":"Not demons or undead","damage":{"base":"D6","escalating":["D8","D10","D12"],"burstsAfter":{"1":2,"2":3,"3":4}},"source":"magic"},
  {"name":"Bloodlust","school":"Demonology","rank":2,"prerequisite":"Demonic Gust","requirements":["word","gesture"],"castingTime":"action","range":"Touch","duration":"Shift","page":30,"text":"Let a demon spirit into your mind or a willing target's. The target immediately rolls WIL or becomes Sickly. For the duration (one shift per power level) they get a boon on melee attacks and on WIL rolls against fear, but can't dodge or parry.","powerLevels":true,"dodge":false,"parry":false,"self":true,"durationByLevel":["Shift","2 shifts","3 shifts"],"resistRoll":"WIL","buff":{"boonMeleeAttacks":true,"boonFearResist":true,"noDodgeParry":true},"source":"magic"},
  {"name":"Chaos Mire","school":"Demonology","rank":2,"prerequisite":"Chaos Swamp","requirements":["word","gesture"],"castingTime":"action","range":"30 meters","duration":"Stretch","page":30,"text":"Turn the ground under one foe per power level into a 2×2 m patch of boiling chaos mire: they sink knee-deep and take D6 at the start of each later turn they stay in it, armor doesn't help. Escaping takes an action and an EVADE roll; others can help. No effect on Large or Huge creatures or immaterial beings such as ghosts; creatures immune to fire or heat take no damage.","powerLevels":true,"dodge":false,"parry":false,"damage":{"perTurn":"D6"},"ignoresArmor":true,"extraTargetPerLevel":true,"source":"magic"},
  {"name":"Demon Face","school":"Demonology","rank":2,"prerequisite":"Abyssal Stench","requirements":["word","gesture"],"castingTime":"action","range":"Personal","duration":"Round","page":31,"text":"Your face becomes a stinking demon's. Until the start of your next turn, anyone making a melee attack on you must pass a WIL roll — boon at power level 1, normal at 2, bane at 3. On a failure the attack is cancelled and they roll on the Fear table (Rulebook p.53). No effect on demons, undead or monsters.","powerLevels":true,"dodge":false,"parry":false,"resistRoll":"WIL","target":"Not demons, undead or monsters","source":"magic"},
  {"name":"Beetle Swarm","school":"Demonology","rank":3,"prerequisite":"Beetle Boil","requirements":["word","gesture"],"castingTime":"action","range":"20 meters (sphere)","duration":"Instant","page":31,"text":"A flesh-eating beetle swarm hits up to four targets in range, in the order you choose: 2D10, 2D8, 2D6, 2D4. Armor doesn't help. Can be dodged or parried as a ranged attack, which stops it moving on; victims get a boon to that at power level 1, roll normally at 2, a bane at 3. No effect on demons or undead.","powerLevels":true,"dodge":true,"parry":true,"ignoresArmor":true,"target":"Not demons or undead","damage":{"chain":["2D10","2D8","2D6","2D4"]},"source":"magic"},
  {"name":"Dimensional Slip","school":"Demonology","rank":3,"prerequisite":"Demon Face","requirements":["gesture"],"castingTime":"reaction","range":"Personal","duration":"Instant","page":31,"text":"When an attack hits you, before damage, slip briefly into Chaos: on a success you avoid all its damage and effects. Success or not, you may then move 2 m (+2 m per extra power level) without provoking a free attack.","powerLevels":true,"dodge":false,"parry":false,"source":"magic"},
  {"name":"Gutworm","school":"Demonology","rank":3,"prerequisite":"Beetle Boil","requirements":["word","gesture"],"castingTime":"action","range":"10 meters","duration":"Instant","page":31,"text":"Opposed roll against the victim's WIL. If you win, a demon worm appears in their gut: D8 damage at once, then D8 each turn for as many rounds as the power level. Armor doesn't help; continues even if you or the victim are incapacitated. No effect on demons or undead.","powerLevels":true,"dodge":false,"parry":false,"opposed":"WIL","ignoresArmor":true,"target":"Not demons or undead","damage":{"base":"D8","perTurn":"D8","turns":"power level"},"source":"magic"},
  {"name":"Rage","school":"Demonology","rank":3,"prerequisite":"Bloodlust","requirements":["word","gesture"],"castingTime":"action","range":"Touch","duration":"Stretch","page":32,"text":"A rage demon possesses you or a willing target, who becomes Angry. For the duration they can't dodge or parry but get an extra action each turn usable only to attack. At power level 2 also a boon to resist fear; at 3 also a boon to resist mind-affecting magic. When it ends, roll CON or become Sickly.","powerLevels":true,"dodge":false,"parry":false,"self":true,"buff":{"conditions":["Angry"],"noDodgeParry":true,"bonusAttackAction":true,"boonFearResistAt":2,"boonVsMindMagicAt":3},"source":"magic"},
  {"name":"Demonic Exile","school":"Demonology","rank":4,"prerequisite":"Dimensional Slip","requirements":["word","gesture"],"castingTime":"action","range":"Touch","duration":"Round","page":32,"text":"Opposed roll against the target's WIL — they roll with a boon at power level 1, normally at 2, with a bane at 3. If you win they vanish into a demon realm and return on your turn next round, scorched and stinking, having taken 2D10 damage (armor doesn't help). Can be dodged or parried. Not usable on Large or Huge monsters.","powerLevels":true,"dodge":true,"parry":true,"opposed":"WIL","ignoresArmor":true,"damage":{"base":"2D10"},"target":"Not Large or Huge monsters","source":"magic"},
  {"name":"Summon Champion","school":"Demonology","rank":4,"prerequisite":"Gutworm","requirements":["word","gesture","focus"],"requirementDetail":"ritual circle","castingTime":"stretch","range":"4 meters","duration":"Stretch","page":32,"text":"Draw a ritual circle on sand, earth or stone; on success a demon from the Rulebook or Bestiary appears and fights for you for a stretch at no price. It follows you and attacks targets you point out, but you can't direct its attacks (GM uses its monster attack table). When the spell ends, send it home with a DEMONOLOGY roll (an action, no WP) — bane at power level 1, normal at 2, boon at 3. On a failure it breaks free: D6 1–3 it attacks you and your allies at once; 4–6 it laughs and leaves to wreak havoc nearby unless you attack it immediately. Guardian demons always return obediently.","powerLevels":true,"dodge":false,"parry":false,"summon":"Demonic Champion","source":"magic"},
  {"name":"Summon Guardians","school":"Demonology","rank":4,"prerequisite":"Gutworm","requirements":["word","gesture","focus"],"requirementDetail":"ritual circle","castingTime":"shift","range":"4 meters","duration":"Shift","page":33,"text":"Summon guardian demons (stats p.32), twice the power level in number, to guard a place or building up to 50 m across. They can't leave it and attack anyone but you approaching from outside.","powerLevels":true,"dodge":false,"parry":false,"summon":"Guardian Demon","summonCount":"2 × power level","source":"magic"},
  {"name":"Bind Champion","school":"Demonology","rank":5,"prerequisite":"Summon Champion","requirements":["word","gesture","focus"],"requirementDetail":"ritual circle","castingTime":"shift","range":"4 meters","duration":"One day per power level","page":33,"text":"Like Summon Champion, but longer. On success the demon appears and bargains: it will serve and go home on command for a price the GM sets from the rank 3 demonic pact examples (p.27). You may use BARTERING to lower it, then accept or refuse (it leaves sneering). If accepted it serves for days equal to the power level, answering questions as best it can and attacking targets you name (GM uses its monster attack table). You then usually have until the next new or full moon to pay; it returns briefly to collect physical payment, and may return to take its due in flesh and blood if you don't pay. See Renegotiation.","powerLevels":true,"dodge":false,"parry":false,"summon":"Demonic Champion","source":"magic"},
  {"name":"Dimensional Travel","school":"Demonology","rank":5,"prerequisite":"Demonic Exile","requirements":["word","gesture","focus"],"requirementDetail":"ritual circle","castingTime":"stretch","range":"Personal","duration":"Instant","page":33,"text":"Travel yourself to Chaos or other worlds; what you find is up to the GM or adventure. At power level 2 bring one willing living creature up to human size; at 3 up to a dozen. Getting home needs another casting.","powerLevels":true,"dodge":false,"parry":false,"source":"magic"},
  {"name":"Firestorm","school":"Elementalism","rank":3,"prerequisite":"Fire Blast","requirements":["word","gesture"],"castingTime":"action","range":"4 meters (sphere)","duration":"Instant","page":40,"powerLevels":true,"dodge":true,"parry":false,"damage":{"base":"2D6","perLevel":"D6"},"element":"fire","source":"magic","text":"A storm of fire whirls around you, dealing 2D6 to all targets in range; it can be dodged as a ranged attack. Each extra power level adds 4 m of range and D6 damage.","updated":true},
  {"name":"Firebomb","school":"Elementalism","rank":4,"prerequisite":"Firebird or Firestorm","requirements":["word","gesture"],"castingTime":"action","range":"40 meters","duration":"Instant","page":42,"powerLevels":true,"dodge":true,"dodgeBane":true,"parry":false,"damage":{"base":"2D8","perLevel":"D8"},"element":"fire","source":"magic","text":"Throw a blazing sphere at a point in range; it explodes, dealing 2D8 fire damage to everyone within 4 m. Can be dodged as a ranged attack, with a bane. Each extra power level adds D8 damage and 4 m of blast radius."},
  {"name":"Hailstorm","school":"Elementalism","rank":4,"prerequisite":"Sylph","requirements":["word","gesture"],"castingTime":"action","range":"20 meters","duration":"Instant","page":42,"powerLevels":true,"dodge":true,"dodgeBane":true,"parry":false,"damage":{"base":"2D10","perLevel":"D10"},"damageType":"piercing","extraTargetPerLevel":true,"source":"magic","text":"An icy gale of razor-sharp shards hits one target for 2D10 piercing damage and makes them cold (Rulebook p.54). Leather armor worn by the target loses 1 armor rating. Can be dodged as a ranged attack, with a bane. Each extra power level adds D10 or another hailstorm at a second target in range."},
  {"name":"Rock Tornado","school":"Elementalism","rank":4,"prerequisite":"Gnome","requirements":["word","gesture"],"castingTime":"action","range":"4 meters (sphere)","duration":"Instant","page":42,"powerLevels":true,"dodge":true,"dodgeBane":true,"parry":false,"damage":{"base":"2D8","perLevel":"D8"},"damageType":"bludgeoning","source":"magic","text":"A vortex of sharp rock spins around you, dealing 2D8 bludgeoning damage to all targets in range. Can be dodged as a ranged attack, with a bane. Each extra power level adds 4 m of range and D8 damage."},
  {"name":"Scalding Shower","school":"Elementalism","rank":4,"prerequisite":"Undine","requirements":["word","gesture"],"castingTime":"action","range":"20 meters","duration":"Instant","page":42,"powerLevels":true,"dodge":true,"dodgeBane":true,"parry":false,"damage":{"base":"2D10","perLevel":"D10","splash":{"base":"2D4","perLevel":"D4","radius":"2 meters"}},"ignoresArmor":true,"source":"magic","text":"A ball of boiling water drops on a target: 2D10 damage to the target and 2D4 to everyone within 2 m of it. Armor doesn't help, but it can be dodged with a bane. Each extra power level adds D10 to the target and D4 to those nearby."},
  {"name":"Conjure","school":"Elementalism","rank":5,"prerequisite":"Firebomb, Hailstorm, Scalding Shower or Rock Tornado","requirements":["word","gesture"],"castingTime":"stretch","range":"Touch","duration":"Shift","page":43,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","text":"Create a generic inanimate object from nothing: power level 1 — a Common item (Rulebook ch.6) of weight 1 or less; 2 — an Uncommon item or one up to weight 4; 3 — a Rare item or something as big as a cart, rowboat or small hut. The GM may allow unlisted items, but nothing specific (e.g. no key to a particular lock). The object crumbles to dust after a shift unless combined with Permanence."},
  {"name":"Elemental Path","school":"Elementalism","rank":5,"prerequisite":"Firebomb, Hailstorm, Scalding Shower or Rock Tornado","requirements":["gesture"],"castingTime":"action","range":"Personal","duration":"Stretch","page":43,"powerLevels":true,"dodge":false,"parry":false,"self":true,"source":"magic","text":"Natural elements can't hurt you and magical elemental damage is halved (after armor, round up). You pass at full speed through lava, soil, rock, open air (floating) and water (breathing not needed) — though not ore-laden ground or solid bedrock. Each power level above 1 adds a stretch."},
  {"name":"Meteor Swarm","school":"Elementalism","rank":5,"prerequisite":"Firebomb or Rock Tornado","requirements":["word","gesture"],"castingTime":"action","range":"100 meters","duration":"Instant","page":43,"powerLevels":true,"dodge":true,"dodgeBane":true,"parry":false,"damage":{"base":"2D10","perLevel":"D10"},"element":"fire","source":"magic","text":"Burning meteors rain down on a point in range: everyone within 6 m takes 2D10 fire damage. Can be dodged as a ranged attack, with a bane. Each extra power level adds D10 damage and 4 m of blast radius."},
  {"name":"Inspire","school":"Harmonism","rank":1,"prerequisite":"Skill level 12 in Performance","requirements":["melody"],"castingTime":"action","range":"10 meters","duration":"Concentration","page":49,"powerLevels":true,"dodge":false,"parry":false,"buff":{"allies":"boon on all skill rolls"},"source":"magic","text":"All allies within range get a boon on all skill rolls while you keep concentrating. Each power level after the first doubles the range. You can't inspire yourself."},
  {"name":"Mend","school":"Harmonism","rank":1,"prerequisite":"Skill level 12 in Performance","requirements":["melody"],"castingTime":"stretch","range":"2 meters","duration":"Permanent","page":49,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","text":"Restore a damaged, warped or broken object to a shape it once had. Power level 1: up to weight 1; 2: up to weight 4; 3: something as large as a cart, rowboat or small hut."},
  {"name":"Protective Harmonies","school":"Harmonism","rank":1,"prerequisite":"Skill level 12 in Performance","requirements":["melody"],"castingTime":"action","range":"10 meters","duration":"Concentration","page":49,"powerLevels":true,"dodge":false,"parry":false,"self":true,"buff":{"damageReduction":"D6 per power level, before armor"},"source":"magic","text":"Ward yourself or an ally in range: incoming attacks deal D6 less damage per power level, applied before armor. If you take damage anyway, your concentration breaks."},
  {"name":"Serenity","school":"Harmonism","rank":1,"prerequisite":"Skill level 12 in Performance","requirements":["melody"],"castingTime":"action","range":"20 meters","duration":"Concentration","page":49,"powerLevels":true,"dodge":false,"parry":false,"resist":{"roll":"WIL","opposed":true,"byLevel":["boon","normal","bane"]},"noEffectOn":["monsters","undead"],"source":"magic","text":"Calm another living creature: opposed roll vs its WIL (target has a boon at power level 1, normal at 2, bane at 3). If you win, it stops to listen while you concentrate, or until it is attacked or harmed in any way. No effect on monsters or undead."},
  {"name":"Tune Mood","school":"Harmonism","rank":1,"prerequisite":"Skill level 12 in Performance","requirements":["melody"],"castingTime":"action","range":"10 meters","duration":"Stretch","page":49,"powerLevels":true,"dodge":false,"parry":false,"rangeByLevel":["10 meters","20 meters","40 meters"],"source":"magic","text":"Set the mood (happy, sad, angry, afraid…) of all listeners in range except yourself for a stretch. BLUFFING or PERSUASION rolls to manipulate them in line with that mood get a boon. Range 20 m at power level 2, 40 m at 3."},
  {"name":"Doubt","school":"Harmonism","rank":2,"prerequisite":"Serenity","requirements":["melody"],"castingTime":"action","range":"10 meters","duration":"Concentration","page":50,"powerLevels":true,"dodge":false,"parry":false,"resist":{"roll":"WIL","opposed":false,"byLevel":["boon","normal","bane"]},"noEffectOn":["monsters","undead"],"source":"magic","text":"Every opponent in range makes a WIL roll, not an action (boon at power level 1, normal at 2, bane at 3). On a failure they have a bane on all skill rolls until your turn next round, when they may roll WIL again to shake it off, and so on. Ends if your concentration breaks. No effect on monsters or undead."},
  {"name":"Elude Senses","school":"Harmonism","rank":2,"prerequisite":"Protective Harmonies","requirements":["melody"],"castingTime":"action","range":"20 meters","duration":"Concentration","page":50,"powerLevels":true,"dodge":false,"parry":false,"self":true,"source":"magic","text":"Enemies in range can't see, hear or smell you, even with AWARENESS. Power level 1 affects living non-monsters, 2 also undead, 3 also monsters. A creature that touches you perceives you and the effect ends for it."},
  {"name":"Encourage","school":"Harmonism","rank":2,"prerequisite":"Inspire","requirements":["melody"],"castingTime":"action","range":"10 meters","duration":"Concentration","page":50,"powerLevels":true,"dodge":false,"parry":false,"buff":{"allies":"boon on all skill rolls; immune to fear attacks"},"source":"magic","text":"All allies in range get a boon on all skill rolls and are immune to fear attacks (Rulebook p.52) while you concentrate. Each power level after the first doubles the range. You can't encourage yourself."},
  {"name":"Frenzy","school":"Harmonism","rank":2,"prerequisite":"Tune Mood","requirements":["melody"],"castingTime":"action","range":"20 meters","duration":"Concentration","page":50,"powerLevels":true,"dodge":false,"parry":false,"resist":{"roll":"WIL","opposed":true,"byLevel":["boon","normal","bane"]},"noEffectOn":["monsters","undead"],"source":"magic","text":"Drive a person berserk: opposed roll vs their WIL (target has a boon at power level 1, normal at 2, bane at 3). On a success they spend their next turn rushing the nearest person or creature (GM or random roll if unclear) and attacking in melee, and can't wait while the effect lasts (as long as you concentrate). Monsters and undead are immune."},
  {"name":"Paralyze","school":"Harmonism","rank":2,"prerequisite":"Mend","requirements":["melody"],"castingTime":"action","range":"20 meters","duration":"Concentration","page":51,"powerLevels":true,"dodge":false,"parry":false,"resist":{"roll":"WIL","opposed":true,"byLevel":["boon","normal","bane"]},"noEffectOn":["monsters","undead"],"source":"magic","text":"Hypnotize a person: opposed roll vs their WIL (target has a boon at power level 1, normal at 2, bane at 3). If you win they can't move or act except for reactions while you concentrate. No effect on monsters or undead."},
  {"name":"Cacophony","school":"Harmonism","rank":3,"prerequisite":"Paralyze","requirements":["melody"],"castingTime":"action","range":"10 meters","duration":"Concentration","page":51,"powerLevels":true,"dodge":false,"parry":false,"rangeByLevel":["10 meters","20 meters","40 meters"],"resist":{"roll":"WIL","opposed":false},"conditions":["Dazed"],"noEffectOn":["monsters","undead"],"source":"magic","text":"Grating noise leaves every foe in range Dazed; each rolls WIL (no action). On a failure they use their next turn to run until out of range, can't come back in and can't wait to put it off. Concentration; victims re-roll WIL each turn to shake it. Range rises to 20 m at power level 2 and 40 m at 3. No effect on monsters or undead."},
  {"name":"Dance","school":"Harmonism","rank":3,"prerequisite":"Frenzy","requirements":["melody"],"castingTime":"action","range":"20 meters","duration":"Concentration","page":51,"powerLevels":true,"dodge":false,"parry":false,"resist":{"roll":"WIL","opposed":true,"byLevel":["boon","normal","bane"]},"noEffectOn":["monsters","undead"],"source":"magic","text":"Make a target dance wildly: opposed roll vs their WIL (target has a boon at power level 1, normal at 2, bane at 3). If you win they can take no actions or reactions and you control their movement — even off a cliff or into deep water — while you concentrate or until they take damage from an attack. No effect on monsters or undead."},
  {"name":"Placate Nature","school":"Harmonism","rank":3,"prerequisite":"Elude Senses","requirements":["melody"],"castingTime":"action","range":"Personal","duration":"Concentration","page":51,"powerLevels":true,"dodge":false,"parry":false,"self":true,"source":"magic","text":"While you play, natural forces can't harm or hinder you: immune to fire and cold, walk on and breathe under water, unaffected by strong winds (glide through the air at normal Movement instead), see in total darkness and aren't dazzled by bright light. Power level 2 adds one other person within 4 m, level 3 another. No protection against magically summoned effects."},
  {"name":"Rest","school":"Harmonism","rank":3,"prerequisite":"Doubt or Encourage","requirements":["melody"],"castingTime":"stretch","range":"10 meters","duration":"Instant","page":52,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","text":"Friendly creatures in range get shift-rest benefits in the time and conditions of a stretch rest. Power level 1: choose one of recover HP, recover WP, or heal all conditions (same choice for all); level 2: two of these; level 3: all three. You don't benefit yourself."},
  {"name":"Break","school":"Harmonism","rank":4,"prerequisite":"Cacophony","requirements":["melody"],"castingTime":"action","range":"20 meters","duration":"Instant","page":52,"powerLevels":true,"dodge":false,"parry":false,"damage":{"base":"2D20","perLevel":"D20"},"target":"Inanimate, non-magical objects (number = your WIL base chance)","ignoresArmor":true,"source":"magic","text":"A piercing note hits a number of non-magical inanimate objects in range (weapons, doors…) equal to your WIL base chance, each taking 2D20 damage ignoring armor rating; +D20 per extra power level. Objects without listed HP are usually simply destroyed (GM decides)."},
  {"name":"Hypnotize Monster","school":"Harmonism","rank":4,"prerequisite":"Placate Nature","requirements":["melody"],"castingTime":"action","range":"20 meters","duration":"Concentration","page":52,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","options":["Ferocity −1 (minimum 1)","Movement halved","Rolls twice for monster attacks and you pick which applies (not the same attack twice in a row)"],"text":"Disrupt even great monsters and demon lords: for each power level, choose one effect on a creature — reduce its Ferocity by 1 (min 1); halve its Movement; or make it roll twice for monster attacks with you choosing the result (never the same attack twice in a row). Lasts while you concentrate; you'll likely become its main target."},
  {"name":"Mass Dance","school":"Harmonism","rank":4,"prerequisite":"Dance","requirements":["melody"],"castingTime":"action","range":"10 meters","duration":"Concentration","page":52,"powerLevels":true,"dodge":false,"parry":false,"rangeByLevel":["10 meters","20 meters","40 meters"],"resist":{"roll":"WIL","opposed":false},"noEffectOn":["monsters","undead"],"source":"magic","text":"Any living creatures you choose in range make a WIL roll (not an action); those who fail can take no actions and you control their movement — even into danger — while you concentrate or until they take damage from an attack. Range 20 m at power level 2, 40 m at 3. No effect on monsters or undead."},
  {"name":"Musical Blast","school":"Harmonism","rank":4,"prerequisite":"Cacophony","requirements":["melody"],"castingTime":"action","range":"10 meters","duration":"Concentration","page":52,"powerLevels":true,"dodge":false,"parry":false,"rangeByLevel":["10 meters","20 meters","40 meters"],"damage":{"base":"D8","perTurn":"D8"},"ignoresArmor":true,"conditions":["Dazed"],"source":"magic","text":"All opponents in range become Dazed and take D8 damage at once, then another D8 on each of your turns while they stay in range and you concentrate. Armor doesn't help. Range 20 m at power level 2, 40 m at 3."},
  {"name":"Spiritual Solace","school":"Harmonism","rank":4,"prerequisite":"Rest","requirements":["melody"],"castingTime":"stretch","range":"10 meters","duration":"Instant","page":52,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","text":"All allies in range get every benefit of a shift rest in the time and conditions of a stretch rest. Power level 2 also removes negative effects on their souls — spells (unless made permanent with Permanence), fear effects and the like. Level 3 also heals severe injuries and fully restores bodies. You don't benefit yourself."},
  {"name":"Abyssal Resonance","school":"Harmonism","rank":5,"prerequisite":"Musical Blast","requirements":["melody"],"castingTime":"action","range":"20 meters","duration":"Concentration","page":53,"powerLevels":true,"dodge":false,"parry":false,"rangeByLevel":["20 meters","40 meters","80 meters"],"damage":{"base":"D12","perTurn":"D12"},"ignoresArmor":true,"conditions":["Dazed"],"source":"magic","text":"All enemies in range become Dazed and take D12 damage at once, then another D12 on each of your turns while they stay in range and you concentrate. Armor doesn't help. Range 40 m at power level 2, 80 m at 3."},
  {"name":"Raze","school":"Harmonism","rank":5,"prerequisite":"Break","requirements":["melody"],"castingTime":"stretch","range":"100 meters","duration":"Instant","page":53,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","text":"Demolish structures (GM rules the details). Power level 1: a small cottage or a 1 m breach in a stone wall; 2: a mansion or a whole section of stone wall; 3: an entire castle or tower."},
  {"name":"Apparition","school":"Illusionism","rank":1,"prerequisite":"Illusionism","requirements":["gesture"],"castingTime":"action","range":"30 meters","duration":"Concentration","page":59,"powerLevels":true,"dodge":false,"parry":false,"resist":{"roll":"Awareness","opposed":false,"byLevel":["boon","normal","bane"]},"source":"magic","text":"Create a moving, purely visual (silent) image of a creature up to human size. Seeing through it takes an AWARENESS roll, not an action (boon at power level 1, normal at 2, bane at 3); those who fail act as if it's real and may roll again each round. It vanishes for everyone if anyone touches it."},
  {"name":"Confusion","school":"Illusionism","rank":1,"prerequisite":"Illusionism","requirements":["gesture"],"castingTime":"action","range":"20 meters","duration":"Concentration","page":59,"powerLevels":true,"dodge":false,"parry":false,"resist":{"roll":"INT","opposed":true,"byLevel":["boon","normal","bane"]},"noEffectOn":["monsters","undead"],"source":"magic","table":[{"roll":1,"text":"Stands confused and does nothing."},{"roll":2,"text":"Attacks a random creature within range."},{"roll":3,"text":"Attacks themselves (roll to hit and damage as normal)."},{"roll":4,"text":"Runs in a random direction; hitting a wall knocks them prone for D6 bludgeoning damage."}],"text":"Opposed roll vs the target's INT (target has a boon at power level 1, normal at 2, bane at 3). On a success the victim can't make reactions and acts randomly each turn (roll D4 on the table). A new opposed INT roll is made each of their turns; it ends when you lose one or break concentration. No effect on monsters or undead."},
  {"name":"Long Shadows","school":"Illusionism","rank":1,"prerequisite":"Illusionism","requirements":["gesture"],"castingTime":"action","range":"10 meters","duration":"Stretch","page":59,"powerLevels":true,"dodge":false,"parry":false,"rangeByLevel":["10 meters","30 meters","100 meters"],"source":"magic","text":"Natural shadows in range deepen, giving a boon to SNEAKING rolls; no effect where there are no natural shadows. Range 30 m at power level 2, 100 m at 3."},
  {"name":"Mind Mask","school":"Illusionism","rank":1,"prerequisite":"Illusionism","requirements":["gesture"],"castingTime":"action","range":"Touch","duration":"Stretch","page":59,"powerLevels":true,"dodge":false,"parry":false,"self":true,"source":"magic","text":"Veil your mind: spells such as Divination and Magic Seal — and traps, places or monsters that tell creatures apart — can be fooled into reading you as a different creature or kind of creature (looks don't change). Spells affecting your mind, like Telepathy and Dominate, get a bane. Power level 2 adds one other person, 3 adds two. Can't be recast while active."},
  {"name":"Send Dream","school":"Illusionism","rank":1,"prerequisite":"Illusionism","requirements":["word","gesture"],"castingTime":"stretch","range":"1 kilometer","duration":"Concentration","page":59,"powerLevels":true,"dodge":false,"parry":false,"resist":{"roll":"INT","opposed":false,"byLevel":["boon","normal","bane"]},"source":"magic","text":"Send a dream to a sleeping person you have met — a message or a nightmare. A nightmare means the sleep doesn't count as rest and the target can't take a shift rest for a full day. The victim resists with an INT roll (boon at power level 1, normal at 2, bane at 3)."},
  {"name":"Amnesia","school":"Illusionism","rank":2,"prerequisite":"Send Dream","requirements":["gesture"],"castingTime":"action","range":"4 meters","duration":"Instant","page":60,"powerLevels":true,"dodge":false,"parry":false,"resist":{"roll":"INT","opposed":true,"byLevel":["boon","normal","bane"]},"source":"magic","text":"Meet the victim's eyes and erase their memory of the last stretch: opposed roll vs their INT (target has a boon at power level 1, normal at 2, bane at 3)."},
  {"name":"Illusion","school":"Illusionism","rank":2,"prerequisite":"Apparition","requirements":["gesture"],"castingTime":"action","range":"30 meters","duration":"Concentration","page":60,"powerLevels":true,"dodge":false,"parry":false,"resist":{"roll":"Awareness","opposed":false,"byLevel":["boon","normal","bane"]},"source":"magic","illusionAttack":{"skill":15,"damage":"D6","type":"bludgeoning"},"text":"Create an illusion of a creature up to human size that fools all five senses — or only some (a ghostly voice, a noise). Seeing through it takes an AWARENESS roll, not an action (boon at power level 1, normal at 2, bane at 3), retried each round; those who fail treat it as real. It can fight: skill level 15, every attack D6 bludgeoning."},
  {"name":"Impersonate","school":"Illusionism","rank":2,"prerequisite":"Mind Mask","requirements":["gesture"],"castingTime":"action","range":"Personal","duration":"Stretch","page":61,"powerLevels":true,"dodge":false,"parry":false,"self":true,"resist":{"roll":"Bluffing or Performance","caster":true,"byLevel":["bane","normal","boon"]},"source":"magic","text":"Take on a specific person's voice and looks. Everyone at a distance is fooled; to fool someone who knows that person in conversation you need a BLUFFING or PERFORMANCE roll — with a bane at power level 1, normal at 2, boon at 3."},
  {"name":"Shadow Shroud","school":"Illusionism","rank":2,"prerequisite":"Long Shadows","requirements":["gesture"],"castingTime":"action","range":"Personal","duration":"Stretch","page":61,"powerLevels":true,"dodge":false,"parry":false,"self":true,"source":"magic","text":"Shadows wrap your body, giving a boon to SNEAKING rolls. Duration becomes a shift at power level 2 and a full day at 3."},
  {"name":"Trip","school":"Illusionism","rank":2,"prerequisite":"Confusion","requirements":["gesture"],"castingTime":"reaction","range":"20 meters","duration":"Instant","page":61,"powerLevels":true,"dodge":false,"parry":false,"resist":{"roll":"Evade","opposed":true,"byLevel":["boon","normal","bane"]},"noEffectOn":["monsters"],"source":"magic","text":"Cast when a two-legged creature is about to move: opposed roll vs its EVADE (target has a boon at power level 1, normal at 2, bane at 3). On a success it falls prone and its movement stops. Monsters are unaffected."},
  {"name":"Group Identity","school":"Illusionism","rank":3,"prerequisite":"Impersonate","requirements":["gesture"],"castingTime":"round","range":"4 meters","duration":"Stretch","page":61,"powerLevels":true,"dodge":false,"parry":false,"self":true,"resist":{"roll":"Bluffing or Performance","caster":true,"byLevel":["bane","normal","boon"]},"source":"magic","text":"Disguise yourself and willing, living, up-to-human-sized creatures in range (total no more than your WIL base chance) as a type of creature, not specific people. Everyone at a distance is fooled; in conversation your spokesperson must pass BLUFFING or PERFORMANCE — bane at power level 1, normal at 2, boon at 3."},
  {"name":"Mass Confusion","school":"Illusionism","rank":3,"prerequisite":"Trip","requirements":["gesture"],"castingTime":"action","range":"10 meters","duration":"Concentration","page":61,"powerLevels":true,"dodge":false,"parry":false,"resist":{"roll":"INT","opposed":false,"byLevel":["boon","normal","bane"]},"noEffectOn":["monsters","undead"],"source":"magic","table":[{"roll":1,"text":"Stands confused and does nothing."},{"roll":2,"text":"Attacks a random creature within range."},{"roll":3,"text":"Attacks themselves (roll to hit and damage as normal)."},{"roll":4,"text":"Runs in a random direction; hitting a wall knocks them prone for D6 bludgeoning damage."}],"text":"Every opponent in range resists with an INT roll, not an action (boon at power level 1, normal at 2, bane at 3). The confused can't make reactions and act randomly each turn (roll D4 on the table); they may roll INT again each turn to break free. No effect on monsters or undead."},
  {"name":"Mirror Image","school":"Illusionism","rank":3,"prerequisite":"Illusion","requirements":["gesture"],"castingTime":"action","range":"Personal","duration":"Stretch","page":62,"powerLevels":true,"dodge":false,"parry":false,"self":true,"source":"magic","text":"Create illusory copies of yourself equal to the power level. Enemies can't tell which is real — the GM picks randomly which one an attack hits; a hit copy vanishes. Copies can't fight or interact with anything. Can't be recast while active."},
  {"name":"Shadow Leap","school":"Illusionism","rank":3,"prerequisite":"Shadow Shroud","requirements":["gesture"],"castingTime":"action","range":"Touch","duration":"Instant","page":62,"powerLevels":true,"dodge":false,"parry":false,"self":true,"source":"magic","text":"Teleport from one shadow to another you can see within 30 m. Each extra power level lets you bring one more human-sized creature you touch, or doubles the range."},
  {"name":"Waking Nightmare","school":"Illusionism","rank":3,"prerequisite":"Amnesia","requirements":["word","gesture"],"castingTime":"action","range":"10 meters","duration":"Stretch","page":62,"powerLevels":true,"dodge":false,"parry":false,"resist":{"roll":"INT","opposed":true,"byLevel":["boon","normal","bane"]},"noEffectOn":["monsters","undead"],"source":"magic","text":"Point at a living creature: opposed roll vs its INT (target has a boon at power level 1, normal at 2, bane at 3). On a success it can't act or move and loses D6 WP each turn. From its second turn on it may make an INT roll (not an action) each turn to break free. Monsters and undead are unaffected."},
  {"name":"Doppelganger","school":"Illusionism","rank":4,"prerequisite":"Mirror Image","requirements":["gesture"],"castingTime":"stretch","range":"30 meters","duration":"Concentration","page":63,"powerLevels":true,"dodge":false,"parry":false,"rangeByLevel":["30 meters","100 meters","500 meters"],"source":"magic","text":"Create an illusory double with your attributes, skills, abilities and gear, under your full control, free to move within range (100 m at power level 2, 500 m at 3). You can't move while it exists; it vanishes if your concentration breaks. It uses your WP. Each time it attacks, the target may roll AWARENESS to see through it, making it vanish. If it drops to zero HP it vanishes and you must roll on the fear table."},
  {"name":"False Terrain","school":"Illusionism","rank":4,"prerequisite":"Mirror Image","requirements":["word","gesture"],"castingTime":"stretch","range":"30 meters","duration":"Shift","page":63,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","text":"Cover what's really there with illusory terrain. Power level 1: a door or hole; 2: a wagon, small boat or cave mouth; 3: a house, ship or small ravine. An intelligent creature that physically touches it sees through it automatically; the illusion stays for others even if told, but anyone who has seen through it may ignore it."},
  {"name":"Fatal Mistake","school":"Illusionism","rank":4,"prerequisite":"Mass Confusion","requirements":["gesture"],"castingTime":"reaction","range":"20 meters","duration":"Instant","page":63,"powerLevels":true,"dodge":false,"parry":false,"resist":{"roll":"INT","opposed":true,"byLevel":["boon","normal","bane"]},"noEffectOn":["monsters"],"source":"magic","text":"Cast when a creature is about to attack: opposed roll vs its INT (target has a boon at power level 1, normal at 2, bane at 3). On a success it attacks a random ally within reach instead, or itself if it has none. Monsters are unaffected."},
  {"name":"Cheat Fate","school":"Illusionism","rank":5,"prerequisite":"Fatal Mistake","requirements":["gesture"],"castingTime":"reaction","range":"20 meters","duration":"Instant","page":63,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","text":"Force a friend or foe (not yourself) to reroll a roll just made; the new result stands. Power level 1: a skill roll (after any push); 2: a damage roll (including damage bonus); 3: a monster attack roll. Must be cast at once, before any other roll."},
  {"name":"Fata Morgana","school":"Illusionism","rank":5,"prerequisite":"False Terrain","requirements":["word","gesture"],"castingTime":"stretch","range":"100 meters","duration":"Shift","page":63,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","text":"Create a static illusion so real it is effectively physical — even those who know it's false are affected. Power level 1: a small cottage or boat; 2: a mansion or ship; 3: a fortress or grand hunting lodge. When it ends it fades fast — dangerous for anyone upstairs or at sea in it."},
  {"name":"Enchant Weapon","school":"Mentalism","rank":2,"prerequisite":"Longstrider or Power Fist or Stone Skin","requirements":["word","gesture"],"castingTime":"action","range":"Touch","duration":"Stretch","page":70,"powerLevels":true,"dodge":false,"parry":false,"buff":{"dragonRange":"1–2, +1 per extra power level"},"source":"magic","text":"A weapon counts as magical, and rolls of 1–2 count as a Dragon when attacking or parrying with it (1–3 at power level 2, 1–4 at 3). Can't be used on unarmed attacks.","updated":true},
  {"name":"Mental Strike","school":"Mentalism","rank":2,"prerequisite":"Levitate or Power Fist","requirements":["word","gesture"],"castingTime":"action","range":"10 meters","duration":"Instant","page":71,"powerLevels":true,"dodge":true,"parry":false,"damage":{"base":"2D6","perLevel":"D6"},"damageType":"bludgeoning","source":"magic","text":"A blow of pure will hurls the victim 2D6 m away and deals the same in bludgeoning damage; +D6 per extra power level. Dodge as a ranged attack. Large and Huge creatures take the damage but aren't moved.","updated":true},
  {"name":"Flight","school":"Mentalism","rank":3,"prerequisite":"Mental Strike","requirements":["word","gesture"],"castingTime":"action","range":"Touch","duration":"Stretch","page":71,"powerLevels":true,"dodge":false,"parry":false,"self":true,"source":"magic","text":"You or another up-to-human-sized creature can fly freely, ignoring obstacles and terrain, at Movement 6 — 12 at power level 2, 24 at 3.","updated":true},
  {"name":"Teleport","school":"Mentalism","rank":3,"prerequisite":"Divination","requirements":["word","gesture"],"castingTime":"action","range":"Touch","duration":"Instant","page":72,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","text":"Teleport yourself up to 100 m to a place you can see or have visited. Each extra power level lets you bring another willing human-sized creature you touch, or doubles the range. Not between dimensions.","updated":true},
  {"name":"Shockwave","school":"Mentalism","rank":3,"prerequisite":"Mental Strike","requirements":["word","gesture"],"castingTime":"action","range":"4 meters (sphere)","duration":"Instant","page":71,"powerLevels":true,"dodge":true,"parry":false,"damage":{"base":"2D6","perLevel":"D6"},"damageType":"bludgeoning","source":"magic","text":"Strike the ground: everyone in range is hurled 2D6 m away from you and takes the same in bludgeoning damage. Dodge as a ranged attack. Each extra power level adds 2 m of range and D6. Large and Huge creatures take damage but aren't moved."},
  {"name":"True Sight","school":"Mentalism","rank":3,"prerequisite":"Divination","requirements":["word","gesture"],"castingTime":"action","range":"50 meters","duration":"Stretch","page":72,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","text":"You automatically see through any spell of rank 3 or lower meant to deceive your senses; rank 4 too at power level 2, and rank 5 at power level 3."},
  {"name":"Bounce","school":"Mentalism","rank":4,"prerequisite":"Teleport","requirements":["word","gesture"],"castingTime":"action","range":"20 meters","duration":"Instant","page":72,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","text":"Teleport to a spot you can see in range, immediately take a normal action there, then teleport to another chosen spot in range. Each extra power level doubles the range."},
  {"name":"Control Person","school":"Mentalism","rank":4,"prerequisite":"Dominate","requirements":["word","gesture"],"castingTime":"action","range":"20 meters","duration":"Concentration","page":73,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","opposed":{"attribute":"WIL","targetBoonAtLevel1":true},"text":"Opposed roll vs the target's WIL (target has a boon at power level 1, normal at 2, bane at 3). If you win, the creature acts on your turn and does exactly what you want; any WP its actions cost come from you. No effect on monsters or undead."},
  {"name":"Matter Control","school":"Mentalism","rank":4,"prerequisite":"Shockwave","requirements":["gesture"],"castingTime":"action","range":"20 meters","duration":"Instant","page":73,"powerLevels":true,"dodge":true,"parry":false,"damage":{"base":"2D8","perLevel":"D8"},"damageType":"bludgeoning","extraTargetPerLevel":true,"source":"magic","text":"Lift and move a human-sized or smaller creature or object up to 12 m horizontally. As an attack (slam a creature into a wall or hurl an object) it deals 2D8 bludgeoning, dodgeable as a ranged attack. Each extra power level adds 6 m and D8, or one more target; with several targets roll once, but each dodges and takes damage separately."},
  {"name":"Speed","school":"Mentalism","rank":4,"prerequisite":"Flight","requirements":["word","gesture"],"castingTime":"action","range":"Touch","duration":"Stretch","page":73,"powerLevels":true,"dodge":false,"parry":false,"self":true,"source":"magic","text":"Power level 1: you or a willing subject gains an extra reaction each round. Power level 2: instead, an extra action (not spellcasting or a round rest) or an extra move on their turn. Power level 3: both the extra action and the extra move. When it ends, the subject is Exhausted."},
  {"name":"Dominate Monster","school":"Mentalism","rank":5,"prerequisite":"Control Person","requirements":["word","gesture"],"castingTime":"action","range":"20 meters","duration":"Instant","page":73,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","text":"Seize a monster with up to 20 HP (40 at power level 2, 60 at 3). It immediately makes one movement and one monster attack of your choice (not against itself or an inanimate object), then loses its next turn. No effect on dragons or demons."},
  {"name":"Invisibility","school":"Mentalism","rank":5,"prerequisite":"Bounce","requirements":["gesture"],"castingTime":"action","range":"Personal/touch","duration":"Stretch","page":73,"powerLevels":true,"dodge":false,"parry":false,"self":true,"source":"magic","text":"You can't be perceived while still. Moving or acting, you get two boons on Sneaking, others get two banes on Awareness to notice you, ranged attacks can't hit you, and a melee attacker must first pass an Awareness roll with a double bane (no action). Power level 2: make another touched human-sized living being invisible instead of you; power level 3: both of you."},
  {"name":"Cadaverous Stench","school":"Necromancy","rank":1,"prerequisite":"Necromancy","requirements":["gesture"],"castingTime":"action","range":"10 meters (cone)","duration":"Instant","page":78,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","text":"Breathe a cone of rot: everyone in it makes a CON roll (not an action) — boon at power level 1, normal at 2, bane at 3. Those who fail retch and lose their next turn, and can't take reactions until then. No effect on monsters or undead."},
  {"name":"Fright","school":"Necromancy","rank":1,"prerequisite":"Necromancy","requirements":["word","gesture"],"castingTime":"action","range":"20 meters","duration":"Instant","page":78,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","opposed":{"attribute":"WIL","targetBoonAtLevel1":true},"text":"Opposed roll vs a living target's WIL (target has a boon at power level 1, normal at 2, bane at 3). If you win, they lose D6 WP and become Scared. No effect on monsters or undead."},
  {"name":"Pain","school":"Necromancy","rank":1,"prerequisite":"Necromancy","requirements":["word","gesture"],"castingTime":"action","range":"10 meters","duration":"Instant","page":79,"powerLevels":true,"dodge":false,"parry":false,"ignoresArmor":true,"source":"magic","opposed":{"attribute":"CON","targetBoonAtLevel1":true},"text":"Opposed roll vs a living target's CON (target has a boon at power level 1, normal at 2, bane at 3). If you win, they lose D6 HP (armor doesn't help) and become Exhausted. No effect on monsters or undead."},
  {"name":"Rigor Mortis","school":"Necromancy","rank":1,"prerequisite":"Necromancy","requirements":["word","focus"],"castingTime":"action","range":"20 meters","duration":"Stretch","page":79,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","opposed":{"attribute":"CON","targetBoonAtLevel1":true},"text":"Opposed roll vs the target's CON (target has a boon at power level 1, normal at 2, bane at 3). If you win, their Movement is halved and they become Dazed. No effect on monsters or undead."},
  {"name":"Speak With Dead","school":"Necromancy","rank":1,"prerequisite":"Necromancy","requirements":["word","focus"],"requirementDetail":"skull","castingTime":"stretch","range":"Touch","duration":"Instant","page":79,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","text":"Call up a dead person's spirit (you need their head or skull) and ask as many questions as the power level. The dead don't lie but know only what they knew in life; an unknown answer wastes the question, and the GM may answer vaguely. Each spirit can be summoned only once."},
  {"name":"Undead Aura","school":"Necromancy","rank":1,"prerequisite":"Necromancy","requirements":["word","gesture"],"castingTime":"action","range":"Personal/touch","duration":"Stretch","page":80,"powerLevels":true,"dodge":false,"parry":false,"self":true,"source":"magic","text":"Undead treat you as one of them and won't attack unless you strike first, and you're immune to fear caused by undead. Power level 2: affect another willing touched human-sized living being instead of you; power level 3: both of you."},
  {"name":"Animate Carcass","school":"Necromancy","rank":2,"prerequisite":"Speak With Dead","requirements":["word","ingredient"],"requirementDetail":"corpse","castingTime":"stretch","range":"Touch","duration":"Shift","page":80,"powerLevels":true,"dodge":false,"parry":false,"summon":"Animated Carcass","source":"magic","text":"Reanimate a dead animal as a loyal thrall you can talk to telepathically: up to 8 HP at power level 1, 14 HP at 2, 20 HP at 3 (animal stats in the core rules)."},
  {"name":"Corrosive Darkness","school":"Necromancy","rank":2,"prerequisite":"Cadaverous Stench","requirements":["word","gesture"],"castingTime":"action","range":"10 meters (cone)","duration":"Instant","page":80,"powerLevels":true,"dodge":false,"parry":false,"ignoresArmor":true,"source":"magic","damage":{"base":"D4","perLevel":null},"text":"Cough out a cone of corrosive darkness that lingers for rounds equal to the power level. Anyone inside acts as in total darkness and takes D4 damage (armor doesn't help) at the start of each of their turns there."},
  {"name":"Dread","school":"Necromancy","rank":2,"prerequisite":"Fright","requirements":["word","gesture"],"castingTime":"action","range":"20 meters","duration":"Instant","page":80,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","opposed":{"attribute":"WIL","targetBoonAtLevel1":true},"fearTable":"D8 per power level, highest","text":"Opposed roll vs the target's WIL (target has a boon at power level 1, normal at 2, bane at 3). If you win, they roll on the Fear Table using one D8 per power level and taking the highest. No effect on monsters or undead."},
  {"name":"Incapacitate","school":"Necromancy","rank":2,"prerequisite":"Rigor Mortis","requirements":["word","gesture"],"castingTime":"action","range":"20 meters","duration":"Stretch","page":80,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","opposed":{"attribute":"CON","targetBoonAtLevel1":true},"text":"Opposed roll vs the target's CON (target has a boon at power level 1, normal at 2, bane at 3). If you win, they are paralysed and helpless — can't move, act, speak or make magic gestures. They may make a CON roll (straight roll, not an action) at the start of each of their turns, except the one right after casting, to break free. No effect on monsters or undead."},
  {"name":"Injure","school":"Necromancy","rank":2,"prerequisite":"Pain","requirements":["word","gesture"],"castingTime":"action","range":"10 meters","duration":"Instant","page":81,"powerLevels":true,"dodge":false,"parry":false,"ignoresArmor":true,"source":"magic","opposed":{"attribute":"CON"},"damage":{"base":"2D6","perLevel":"D6"},"text":"Opposed roll vs the target's CON. If you win, internal bleeding deals 2D6 damage, +D6 per extra power level; ignores armor and can't be dodged. No effect on undead."},
  {"name":"Undead Resilience","school":"Necromancy","rank":2,"prerequisite":"Undead Aura","requirements":["word","gesture"],"castingTime":"action","range":"Personal","duration":"Stretch","page":81,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","text":"You're immune to cold and drowning. Power level 2: also immune to all fear. Power level 3: also take half damage (after armor, rounded up) from non-magical weapons — fire, magic and magical weapons still deal full damage."},
  {"name":"Hand of Death","school":"Necromancy","rank":3,"prerequisite":"Incapacitate or Injure","requirements":["gesture"],"castingTime":"action","range":"20 meters","duration":"Concentration","page":81,"powerLevels":true,"dodge":false,"parry":false,"ignoresArmor":true,"source":"magic","opposed":{"attribute":"CON"},"damage":{"base":"D8","perTurn":true,"byLevel":["D8","D10","D12"]},"text":"Opposed roll vs the target's CON. If you win, an invisible claw deals D8 at once and D8 more each turn while you concentrate (D10 at power level 2, D12 at 3). Ignores armor, can't be dodged. No effect on monsters or undead."},
  {"name":"Raise Skeleton","school":"Necromancy","rank":3,"prerequisite":"Animate Carcass","requirements":["word","gesture","ingredient"],"requirementDetail":"skeleton","castingTime":"stretch","range":"Touch","duration":"Stretch","page":81,"powerLevels":true,"dodge":false,"parry":false,"summon":"Raised Skeleton","source":"magic","text":"Animate a standard skeleton from a human-sized humanoid. Power level 2: two skeletons, or one for a shift. Power level 3: three for a stretch, two for a shift, or one skeleton champion for a stretch. You talk to them telepathically at any range; they obey literally and have no gear unless you give them some."},
  {"name":"Terror","school":"Necromancy","rank":3,"prerequisite":"Dread","requirements":["word","gesture"],"castingTime":"action","range":"10 meters (sphere)","duration":"Instant","page":81,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","fearTable":"D8 per power level, highest","text":"Everyone in range makes a WIL roll; those who fail roll on the Fear Table with one D8 per power level, taking the highest. No effect on monsters or undead."},
  {"name":"Drain Life","school":"Necromancy","rank":4,"prerequisite":"Hand of Death","requirements":["gesture"],"castingTime":"action","range":"20 meters","duration":"Concentration","page":81,"powerLevels":true,"dodge":false,"parry":false,"ignoresArmor":true,"source":"magic","opposed":{"attribute":"WIL"},"damage":{"base":"D8","perTurn":true,"byLevel":["D8","D10","D12"]},"lifesteal":true,"text":"Opposed roll vs the target's WIL. If you win, they take D8 at once and D8 each turn while you concentrate (D10 at power level 2, D12 at 3), and you heal 1 HP per point dealt (up to max HP). Ignores armor, can't be dodged. No effect on monsters or undead."},
  {"name":"Necrotic Chill","school":"Necromancy","rank":4,"prerequisite":"Terror","requirements":["word","gesture"],"castingTime":"action","range":"20 meters (sphere)","duration":"Instant","page":82,"powerLevels":true,"dodge":false,"parry":false,"ignoresArmor":true,"source":"magic","damage":{"base":"D6","perLevel":null},"fearTable":"D8 per power level, highest","text":"Everyone in range takes D6 damage (armor doesn't help), becomes cold, and must pass a WIL roll or roll on the Fear Table with one D8 per power level, taking the highest. No effect on monsters or undead."},
  {"name":"Raise Wight","school":"Necromancy","rank":4,"prerequisite":"Raise Skeleton","requirements":["word","gesture","ingredient"],"requirementDetail":"a dead ruler or mighty warrior","castingTime":"shift","range":"Touch","duration":"Shift","page":82,"powerLevels":true,"dodge":false,"parry":false,"summon":"Raised Wight","source":"magic","text":"Raise a dead lord, lady or great warrior as a wight bound to you (core wight stats) for a shift — a day at power level 2, a week at 3. Finding such remains is up to the GM; they're often buried with arms and armor. Telepathic contact at any range; in combat you pick its target but its monster attack is rolled. Only one wight at a time."},
  {"name":"Defy Death","school":"Necromancy","rank":5,"prerequisite":"Drain Life","requirements":["word","gesture","ingredient"],"requirementDetail":"fresh corpse","castingTime":"shift","range":"Unlimited","duration":"Instant","page":82,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","text":"Prepare an intact corpse dead no more than a day as a new vessel; embalmed, it stays preserved up to a year wherever you keep it. When you die, make a WIL roll (can't be pushed) — bane at power level 1, normal at 2, boon at 3. On success you wake in the new body a stretch after death with all memories and stats, except CHA and all CHA-based skill levels drop by D3 (minimum 3)."},
  {"name":"Raise Mummy","school":"Necromancy","rank":5,"prerequisite":"Raise Wight","requirements":["word","gesture","ingredient"],"requirementDetail":"corpse of a ruler or great warrior, plus embalming oils and linen","castingTime":"shift","range":"Touch","duration":"Shift","page":83,"powerLevels":true,"dodge":false,"parry":false,"summon":"Mummy","source":"magic","text":"Anoint and wrap a dead lord, lady or great warrior to raise an obedient mummy for a shift — a day at power level 2, a week at 3. Telepathic contact at any range; in combat you pick its target but its monster attack is rolled. Only one mummy at a time."},
  {"name":"Raise Skeletal Horde","school":"Necromancy","rank":5,"prerequisite":"Raise Wight","requirements":["word","gesture","ingredient"],"requirementDetail":"skeletons","castingTime":"stretch","range":"50 meters","duration":"Shift","page":83,"powerLevels":true,"dodge":false,"parry":false,"summon":"Skeletal Horde","source":"magic","text":"Raise a horde of standard skeletons that obey every command, up to your WIL base chance in number — doubled at power level 2, tripled at 3. The horde takes one turn per round but makes attacks equal to its skeletons ÷ 5 (round up). Each skeleton has its own HP and moves separately but must stay within 2 m of another where possible. Only one horde at a time."},
  {"name":"Farscribe","school":"Symbolism","rank":1,"prerequisite":"Symbolism","requirements":["symbol"],"castingTime":"stretch/shift","range":"100 meters","duration":"Stretch/shift","page":89,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","text":"Must be drawn or carved, not traced. Whatever you then write or draw on the symbol appears as glowing script, at the speed you write, on any flat surface in range that you've seen before (it needn't be in sight). Range 1 km at power level 2, 10 km at 3."},
  {"name":"Hesitation","school":"Symbolism","rank":1,"prerequisite":"Symbolism","requirements":["symbol"],"castingTime":"action/stretch/shift","range":"20 meters","duration":"Round/stretch/shift","page":90,"powerLevels":true,"dodge":false,"parry":false,"seeTrigger":true,"source":"magic","text":"Anyone who sees it makes a WIL roll on their turn (not an action) — boon at power level 1, normal at 2, bane at 3. On failure they swap their initiative card for the worst available (in combat) and get a bane on all skill rolls. They may retry each turn; one success ends it for them."},
  {"name":"Lure","school":"Symbolism","rank":1,"prerequisite":"Symbolism","requirements":["symbol"],"castingTime":"action/stretch/shift","range":"20 meters","duration":"Round/stretch/shift","page":90,"powerLevels":true,"dodge":false,"parry":false,"seeTrigger":true,"source":"magic","text":"Anyone who sees it makes a WIL roll on their turn (not an action) — boon at power level 1, normal at 2, bane at 3. On failure they must move toward the symbol at normal Movement and can't look away (bane on Awareness), though they can still fight. They may retry each turn; one success ends it for them."},
  {"name":"Shield Rune","school":"Symbolism","rank":1,"prerequisite":"Symbolism","requirements":["symbol"],"castingTime":"action/stretch/shift","range":"Touch","duration":"Round/stretch/shift","page":90,"powerLevels":true,"dodge":false,"parry":false,"self":true,"source":"magic","text":"An invisible shield gives a bane to all non-magical attacks against one person (you included). Each power level after the first doubles the duration."},
  {"name":"Sunder","school":"Symbolism","rank":1,"prerequisite":"Symbolism","requirements":["symbol"],"castingTime":"action","range":"Touch","duration":"Instant","page":90,"powerLevels":true,"dodge":false,"parry":false,"ignoresArmor":true,"source":"magic","damage":{"base":"2D10","perLevel":"D10"},"target":"Inanimate, non-magical objects","text":"A quickly drawn symbol on a non-magical object (weapon, door…) deals 2D10 damage ignoring armor, +D10 per extra power level."},
  {"name":"Fortify","school":"Symbolism","rank":2,"prerequisite":"Sunder","requirements":["symbol"],"castingTime":"action/stretch/shift","range":"Touch","duration":"Round/stretch/shift","page":90,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","text":"Reinforce a door, wall, bridge or pillar: its armor rating rises by 10 per power level."},
  {"name":"Halt","school":"Symbolism","rank":2,"prerequisite":"Hesitation or Lure","requirements":["symbol"],"castingTime":"action/stretch/shift","range":"20 meters","duration":"Round/stretch/shift","page":90,"powerLevels":true,"dodge":false,"parry":false,"seeTrigger":true,"source":"magic","text":"Anyone who sees it must pass a WIL roll to move toward it at all — boon at power level 1, normal at 2, bane at 3. They may retry each turn; one success ends it for them."},
  {"name":"Magic Armor","school":"Symbolism","rank":2,"prerequisite":"Shield Rune","requirements":["symbol"],"castingTime":"action/stretch/shift","range":"Touch","duration":"Round/stretch/shift","page":90,"powerLevels":true,"dodge":false,"parry":false,"self":true,"source":"magic","text":"Protect a person (you included) against magic: spells cast on them get one bane per power level."},
  {"name":"Warding Mark","school":"Symbolism","rank":2,"prerequisite":"Farscribe","requirements":["symbol"],"castingTime":"action/stretch/shift","range":"Touch","duration":"Round/stretch/shift","page":91,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","text":"Block all teleportation and other magical travel to or from a place, and any magical spying on it. Power level 1 wards a room, 2 a building, 3 a whole city."},
  {"name":"Arcane Vortex","school":"Symbolism","rank":3,"prerequisite":"Warding Mark","requirements":["symbol"],"castingTime":"action/stretch/shift","range":"20 meters (sphere)","duration":"Round/stretch/shift","page":91,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","text":"A vortex devours magic: anyone but you, friend or foe, loses D6 WP per power level when first entering it and gets one bane per power level on casting spells inside. Magical weapons inside don't count as magical (non-magical properties remain)."},
  {"name":"Horrify","school":"Symbolism","rank":3,"prerequisite":"Halt","requirements":["symbol"],"castingTime":"action/stretch/shift","range":"20 meters","duration":"Round/stretch/shift","page":91,"powerLevels":true,"dodge":false,"parry":false,"seeTrigger":true,"source":"magic","fearTable":"D8 per power level, highest","text":"Anyone who sees it must pass a WIL roll with a bane or roll on the Fear Table with one D8 per power level, taking the highest. No effect on monsters or undead."},
  {"name":"Power Source","school":"Symbolism","rank":3,"prerequisite":"Fortify","requirements":["symbol"],"castingTime":"action/stretch/shift","range":"10 meters","duration":"Round/stretch/shift","page":92,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","healing":{"wp":"D6","conditionsPerLevel":1},"text":"Everyone in range except you, friend or foe, recovers D6 WP and heals one condition per power level — when cast, or when they enter range while it's active. Once per person per shift."},
  {"name":"Retribution Rune","school":"Symbolism","rank":3,"prerequisite":"Magic Armor","requirements":["symbol"],"castingTime":"action/stretch/shift","range":"Personal","duration":"Round/stretch/shift","page":92,"powerLevels":true,"dodge":false,"parry":false,"self":true,"source":"magic","text":"An invisible shield gives one bane per power level to non-magical attacks against a person (you included); an attack that misses them hits the attacker instead."},
  {"name":"Blind","school":"Symbolism","rank":4,"prerequisite":"Horrify","requirements":["symbol"],"castingTime":"action/stretch/shift","range":"20 meters","duration":"Round/stretch/shift","page":92,"powerLevels":true,"dodge":false,"parry":false,"seeTrigger":true,"source":"magic","text":"Anyone who sees it must pass a WIL roll (not an action) — boon at power level 1, normal at 2, bane at 3 — or be blinded for a stretch, acting as in total darkness. Afterwards they're immune to that symbol. No effect on monsters or undead."},
  {"name":"Golem","school":"Symbolism","rank":4,"prerequisite":"Power Source","requirements":["symbol"],"castingTime":"stretch/shift","range":"Touch","duration":"Stretch/shift","page":92,"powerLevels":true,"dodge":false,"parry":false,"summon":"Golem","source":"magic","text":"Symbols drawn or carved on a clay figure or stone statue bring it to life as a golem bodyguard that obeys you (stats in DB_SUMMONS_EXTRA)."},
  {"name":"Portal","school":"Symbolism","rank":4,"prerequisite":"Arcane Vortex","requirements":["symbol"],"castingTime":"stretch/shift","range":"1 kilometer","duration":"Stretch/shift","page":92,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","text":"Open a portal to a place within 1 km that you can see or have visited; up-to-human-sized creatures pass through as a normal movement. Range 10 km at power level 2, 100 km at 3."},
  {"name":"Reflect Magic","school":"Symbolism","rank":4,"prerequisite":"Retribution Rune","requirements":["symbol"],"castingTime":"action/stretch/shift","range":"Personal","duration":"Round/stretch/shift","page":92,"powerLevels":true,"dodge":false,"parry":false,"self":true,"source":"magic","text":"Spells cast on the protected person (you included) by another mage get one bane per power level; if such a spell fails, its caster suffers its effect instead (GM rules on unclear cases)."},
  {"name":"Petrify","school":"Symbolism","rank":5,"prerequisite":"Blind","requirements":["symbol"],"castingTime":"action/stretch/shift","range":"20 meters","duration":"Round/stretch/shift","page":93,"powerLevels":true,"dodge":false,"parry":false,"seeTrigger":true,"source":"magic","text":"Anyone but you who sees it must pass a WIL roll — boon at power level 1, normal at 2, bane at 3 — or turn to stone with their gear for the duration: no moving, acting or speaking, but armor rating 10. No effect on monsters or undead."},
  {"name":"Raise Fortress","school":"Symbolism","rank":5,"prerequisite":"Golem","requirements":["symbol"],"castingTime":"shift","range":"Touch","duration":"Shift","page":93,"powerLevels":true,"dodge":false,"parry":false,"source":"magic","text":"Carve symbols into living rock to raise a stone structure: a small cottage at power level 1, a two-storey tower at 2, a walled castle at 3. Walls have armor rating 10 × power level and withstand 20 damage per power level before collapsing. It crumbles to sand when the spell ends."},
  {"name":"Runic Prison","school":"Symbolism","rank":5,"prerequisite":"Portal","requirements":["symbol"],"castingTime":"stretch/shift","range":"20 meters","duration":"Stretch/shift","page":93,"powerLevels":true,"dodge":false,"parry":false,"seeTrigger":true,"source":"magic","text":"Draw or carve a symbol containing a creature's name; if that creature sees it, it must pass a WIL roll — boon at power level 1, normal at 2, bane at 3 — or be drawn into the symbol with its gear for the duration. The symbol can be made on a portable object. Made permanent with Permanence, the prisoner doesn't age. No effect on monsters or undead."},
  {"name":"Animal Sense","school":"Witchcraft","rank":1,"prerequisite":"Witchcraft","requirements":["word"],"castingTime":"action","range":"30 meters","duration":"Concentration","page":98,"text":"Take over the body of a common animal (core p.99) in range. It may roam 30 m from your body at power level 1, 300 m at 2, unlimited at 3. It won't act against its nature or fight for you. You can't speak or use your own skills — use the animal's stats. If the animal dies during the spell, you take damage equal to the power level.","powerLevels":true,"dodge":false,"parry":false,"selfDamage":"power level (if the animal is killed)","source":"magic"},
  {"name":"Augury","school":"Witchcraft","rank":1,"prerequisite":"Witchcraft","requirements":["word","gesture"],"castingTime":"stretch","range":"Personal","duration":"Instant","page":98,"text":"Ask the GM one question per power level about the coming day; each is answered truthfully with yes, no or uncertain.","powerLevels":true,"dodge":false,"parry":false,"self":true,"questions":"power level","source":"magic"},
  {"name":"Helper","school":"Witchcraft","rank":1,"prerequisite":"Witchcraft","requirements":["word","ingredient"],"requirementDetail":"simple materials such as sticks, moss and candles","castingTime":"action","range":"Touch","duration":"Stretch","page":98,"text":"Build a knee-high servant that obeys you and does simple tasks needing no skill rolls; it must stay within 50 m of you. Lasts a shift at power level 2, a day at 3. Only one at a time; it collapses into kindling when the spell ends.","powerLevels":true,"dodge":false,"parry":false,"durationByLevel":{"1":"Stretch","2":"Shift","3":"Day"},"source":"magic"},
  {"name":"Protective Aura","school":"Witchcraft","rank":1,"prerequisite":"Witchcraft","requirements":["word"],"castingTime":"action","range":"Personal","duration":"Round","page":98,"text":"A living creature wanting to attack you must first pass a WIL roll (not an action) or pick another target or not attack. Lasts a stretch at power level 2, a shift at 3. Demons, monsters and undead are unaffected.","powerLevels":true,"dodge":false,"parry":false,"self":true,"durationByLevel":{"1":"Round","2":"Stretch","3":"Shift"},"source":"magic"},
  {"name":"Witch Mark","school":"Witchcraft","rank":1,"prerequisite":"Witchcraft","requirements":["word","gesture"],"castingTime":"action","range":"20 meters","duration":"Stretch","page":98,"text":"An invisible mark gives the target a bane on WIL rolls to resist fear. Power level 2: bane on all WIL rolls. Power level 3: also lasts a shift. Only one Witch Mark per victim.","powerLevels":true,"dodge":false,"parry":false,"source":"magic"},
  {"name":"Bestial Traits","school":"Witchcraft","rank":2,"prerequisite":"Animal Sense","requirements":["word"],"castingTime":"action","range":"Personal","duration":"Stretch","page":99,"text":"Gain one animal trait per power level from the list. Can't be recast while active.","powerLevels":true,"dodge":false,"parry":false,"self":true,"picks":"power level","options":[{"name":"Claws","text":"Unarmed attacks deal 2D6 slashing damage.","unarmed":{"damage":"2D6","type":"slashing"}},{"name":"Fangs","text":"Unarmed attacks deal D8 piercing damage plus paralyzing poison (potency 12).","unarmed":{"damage":"D8","type":"piercing"},"poison":{"type":"paralyzing","potency":12}},{"name":"Fur or Feathers","text":"Automatically resist cold (core p.54)."},{"name":"Gills and Webbing","text":"Breathe underwater; boon on all Swimming rolls.","boon":["Swimming"]},{"name":"Night Vision","text":"Unaffected by total darkness (core p.52)."},{"name":"Scales","text":"Armor rating 3; doesn't stack with worn armor.","armor":3}],"source":"magic"},
  {"name":"Curse","school":"Witchcraft","rank":2,"prerequisite":"Protective Aura or Witch Mark","requirements":["word","gesture"],"castingTime":"action","range":"20 meters","duration":"Stretch","page":100,"text":"Point and curse a creature. Opposed roll vs the target's WIL (target has a boon at power level 1, normal at 2, a bane at 3). On success the target has a bane on all skill rolls for a stretch. Can't be cursed again while cursed. No effect on monsters.","powerLevels":true,"dodge":false,"parry":false,"opposed":{"attribute":"WIL","targetRoll":{"1":"boon","2":"normal","3":"bane"}},"noMonsters":true,"source":"magic"},
  {"name":"Fury of the Wild","school":"Witchcraft","rank":2,"prerequisite":"Helper","requirements":["word","gesture"],"castingTime":"action","range":"20 meters","duration":"Stretch","page":100,"text":"Up to one common mammal or bird per power level turns aggressive and attacks the nearest enemy; you don't choose their targets. No effect on monsters.","powerLevels":true,"dodge":false,"parry":false,"noMonsters":true,"source":"magic"},
  {"name":"Soothsaying","school":"Witchcraft","rank":2,"prerequisite":"Augury","requirements":["word","gesture"],"castingTime":"stretch","range":"Personal","duration":"Instant","page":100,"text":"Ask the GM one question per power level about the current adventure, people or creatures you meet, or where you are. Answers may be cryptic but are true once understood.","powerLevels":true,"dodge":false,"parry":false,"self":true,"questions":"power level","source":"magic"},
  {"name":"Bestial Helper","school":"Witchcraft","rank":3,"prerequisite":"Fury of the Wild","requirements":["gesture"],"castingTime":"action","range":"Personal","duration":"Stretch","page":100,"text":"Bring forth a monstrous, animal-like servant from your own flesh and blood; casting costs D6 HP (armor doesn't help). It obeys you and fights for you, with dog stats at power level 1, boar at 2, bear at 3 (core p.99). Anyone it attacks suffers a fear attack. Only one at a time; it melts away when the spell ends.","powerLevels":true,"dodge":false,"parry":false,"selfDamage":"D6","ignoresArmor":true,"summon":{"1":"Dog","2":"Boar","3":"Bear"},"fearAttack":true,"source":"magic"},
  {"name":"Hex","school":"Witchcraft","rank":3,"prerequisite":"Curse","requirements":["word","gesture"],"castingTime":"action","range":"20 meters","duration":"Stretch","page":100,"text":"Point and hex a creature. Opposed roll vs the target's WIL (target has a boon at power level 1, normal at 2, a bane at 3). On success the target loses 2D6 WP and has a bane on all skill rolls for a stretch. Can't be hexed twice at once, but Curse and Hex together give two banes. No effect on monsters.","powerLevels":true,"dodge":false,"parry":false,"opposed":{"attribute":"WIL","targetRoll":{"1":"boon","2":"normal","3":"bane"}},"wpDamage":"2D6","noMonsters":true,"source":"magic"},
  {"name":"Safe Travels","school":"Witchcraft","rank":3,"prerequisite":"Soothsaying","requirements":["word"],"castingTime":"stretch","range":"Touch","duration":"Instant","page":100,"text":"Wish someone a safe trip. Sincere: the GM rolls the next random encounter twice and takes the better result. Ironic: twice, taking the worse. Affects one encounter per power level. Cast on your own companions to help yourself.","powerLevels":true,"dodge":false,"parry":false,"encounters":"power level","source":"magic"},
  {"name":"Shapeshift","school":"Witchcraft","rank":3,"prerequisite":"Bestial Traits","requirements":["gesture"],"castingTime":"action","range":"Personal","duration":"Stretch","page":101,"text":"Turn into a mammal from the core animal table (p.99): take its stats and attacks but keep your skill levels, heroic abilities and damage taken. You can't speak and INT-based skill rolls get a bane. Lasts a shift at power level 2, a week at 3. Ending it early means recasting at the same power level.","powerLevels":true,"dodge":false,"parry":false,"self":true,"durationByLevel":{"1":"Stretch","2":"Shift","3":"Week"},"source":"magic"},
  {"name":"Animate Object","school":"Witchcraft","rank":4,"prerequisite":"Hex","requirements":["word","gesture","focus"],"castingTime":"action","range":"Touch","duration":"Stretch","page":101,"text":"Animate an object such as a broom so it carries you 20 m per movement, on your turn. Each power level above 1 adds one: it can fly; it carries up to four people; the duration becomes a shift.","powerLevels":true,"dodge":false,"parry":false,"movement":20,"perExtraLevel":["The object can fly","Carries up to four people","Duration becomes a shift"],"source":"magic"},
  {"name":"Compulsion","school":"Witchcraft","rank":4,"prerequisite":"Hex","requirements":["word","gesture","ingredient"],"requirementDetail":"a lock of hair or an item belonging to the victim","castingTime":"stretch","range":"100 meters","duration":"Day","page":102,"text":"Speak a command. Opposed roll vs the target's WIL (target has a boon at power level 1, normal at 2, a bane at 3). On success the target must carry out the command during the coming day. Can't compel killing. No effect on monsters.","powerLevels":true,"dodge":false,"parry":false,"opposed":{"attribute":"WIL","targetRoll":{"1":"boon","2":"normal","3":"bane"}},"noMonsters":true,"source":"magic"},
  {"name":"Flattery","school":"Witchcraft","rank":4,"prerequisite":"Safe Travels","requirements":["word","gesture"],"castingTime":"action","range":"20 meters","duration":"Concentration","page":102,"text":"Shower a living creature with praise: it gets one boon per power level on all skill rolls while you keep concentrating and flattering.","powerLevels":true,"dodge":false,"parry":false,"boons":"power level","source":"magic"},
  {"name":"Monster Whisperer","school":"Witchcraft","rank":4,"prerequisite":"Shapeshift","requirements":["word","gesture"],"castingTime":"action","range":"10 meters","duration":"Instant","page":102,"text":"Influence a monster's next attack: either choose its target (must be within the attack's reach) or have the GM reroll the monster attack (the reroll stands). Power level 2: both. Power level 3: two rerolls. Can't make it attack itself or an object.","powerLevels":true,"dodge":false,"parry":false,"source":"magic"},
  {"name":"Doomsday Prophecy","school":"Witchcraft","rank":5,"prerequisite":"Compulsion","requirements":["word","gesture"],"castingTime":"action","range":"20 meters","duration":"Stretch","page":102,"text":"Call nature spirits' judgment on a creature; it can't resist except by magic. Power level 1: bane on all skill rolls. Power level 2: also takes double damage from all attacks (before armor). Power level 3: also can't roll dragons. Can't be stacked on itself but stacks with Curse and Hex. No effect on monsters.","powerLevels":true,"dodge":false,"parry":false,"noResist":true,"noMonsters":true,"source":"magic"},
  {"name":"Monster Form","school":"Witchcraft","rank":5,"prerequisite":"Monster Whisperer","requirements":["gesture"],"castingTime":"action","range":"Personal","duration":"Permanent","page":102,"text":"Become a monster (with monster attacks) from the Rulebook or Bestiary: up to 20 HP at power level 1, 40 at 2, 60 at 3. Not dragons, demons, undead or humanoids. Damage taken carries over. Use the monster rules (core p.83) and its stats; pick monster attacks freely but never the same one twice in a row, or take other sensible actions. You keep INT-based skills, but if the monster can't speak you lose speech and those rolls get a bane. Recast to change back.","powerLevels":true,"dodge":false,"parry":false,"self":true,"maxHpByLevel":{"1":20,"2":40,"3":60},"source":"magic"},
  {"name":"Monster Warden","school":"Witchcraft","rank":5,"prerequisite":"Monster Whisperer","requirements":["word","gesture"],"castingTime":"stretch","range":"30 meters","duration":"Shift","page":103,"text":"Bind a monster in range to guard a place you can see against intruders you define. Max monster HP 20 at power level 1, 40 at 2, 60 at 3. Bane if the place is its own lair. Ends at once if you or your companions harm it. No effect on demons, dragons or undead.","powerLevels":true,"dodge":false,"parry":false,"maxHpByLevel":{"1":20,"2":40,"3":60},"ritual":true,"source":"magic"},
  {"name":"Polymorph","school":"Witchcraft","rank":5,"prerequisite":"Animate Object","requirements":["word","gesture"],"castingTime":"action","range":"20 meters","duration":"Shift","page":103,"text":"Turn a living humanoid into a small harmless critter (toad, snake, mouse, big insect…). Opposed roll vs the target's WIL (target has a boon at power level 1, normal at 2, a bane at 3). On success it has 1 HP, Movement 6, Sneaking 15 and Evade 15, can't speak or use other skills. At 0 HP it stays transformed and makes death rolls with its own CON. No effect on monsters or undead.","powerLevels":true,"dodge":false,"parry":false,"opposed":{"attribute":"WIL","targetRoll":{"1":"boon","2":"normal","3":"bane"}},"noMonsters":true,"transformedStats":{"hp":1,"movement":6,"skills":{"Sneaking":15,"Evade":15}},"source":"magic"},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Concealing","rank":1,"prerequisite":"Enchanting","page":119,"powerLevels":false,"castOn":["leather armor","clothing"],"buff":{"boon":["Sneaking"]},"text":"Leather armor or clothing only. The wearer gets a boon on Sneaking."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Farshot","rank":1,"prerequisite":"Enchanting","page":119,"powerLevels":true,"castOn":["sling","bow","crossbow","quiver"],"buff":{"rangeMultiplier":"×2 / ×3 / ×4 by power level"},"text":"Slings, bows, crossbows or quivers only. The weapon's range (or of arrows from the quiver) is doubled at power level 1, tripled at 2, quadrupled at 3."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Keen Edge","rank":1,"prerequisite":"Enchanting","page":119,"powerLevels":true,"castOn":["slashing weapon","piercing weapon","quiver"],"buff":{"armorPierce":"1 step per power level"},"text":"Slashing or piercing weapons, or a quiver. Worn or natural armor hit by the weapon (or its arrows) counts as one step lower per power level, minimum zero."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Luminous","rank":1,"prerequisite":"Enchanting","page":119,"powerLevels":false,"castOn":["any item"],"text":"Choose a type of non-human creature (e.g. elves, dwarves, halflings, wolfkin, nightkin, undead, dragons, demons). The item glows brightly whenever one is within 30 meters."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Supple Armor","rank":1,"prerequisite":"Enchanting","page":120,"powerLevels":false,"castOn":["metal armor"],"buff":{"removeArmorBane":["Evade"]},"text":"Metal armor (chainmail, plate…) only. The wearer no longer suffers the armor's bane on Evade."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Thinking Cap","rank":1,"prerequisite":"Enchanting","page":120,"powerLevels":true,"castOn":["helmet","hat","headwear"],"buff":{"boonChoices":"one per power level","options":["Beast Lore","Languages","Myths & Legends","any INT-based secondary skill (not magic schools)"]},"text":"Cast on a hat, helmet or other headwear. Per power level, the wearer gains a boon on one skill chosen from Beast Lore, Languages, Myths & Legends or any INT-based secondary skill except a school of magic."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Unbreakable","rank":1,"prerequisite":"Enchanting","page":120,"powerLevels":true,"castOn":["weapon","shield"],"buff":{"durability":"+9 per power level"},"text":"Weapons and shields only. Durability +9 per power level."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Warming","rank":1,"prerequisite":"Enchanting","page":120,"powerLevels":true,"castOn":["clothing","armor"],"buff":{"armorVs":{"cold":"6 per power level"},"immune":["cold effects"]},"text":"Clothing or armor only. The wearer gains armor rating 6 per power level against cold damage (magical cold too), on top of normal armor, and is immune to the effects of cold (Rulebook p.54)."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Bane Weapon","rank":2,"prerequisite":"Luminous","page":120,"powerLevels":false,"castOn":["weapon","shield","quiver"],"buff":{"boonVsCreatureType":true},"text":"Weapons, shields or quivers. Choose a non-human creature type (elves, dwarves, halflings, wolfkin, nightkin, undead, dragons, demons…): all attacks and parries with the item against that type get a boon."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Bleeding Weapon","rank":2,"prerequisite":"Keen Edge","page":120,"powerLevels":false,"castOn":["slashing weapon","piercing weapon","quiver"],"onHit":{"bleed":1},"text":"Slashing or piercing weapons, or a quiver. A living target damaged by it bleeds for 1 damage on each of its turns until it reaches 0 HP or someone (even the victim) stanches it with a successful Healing roll."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Dread Weapon","rank":2,"prerequisite":"Farshot","page":120,"powerLevels":false,"castOn":["weapon","quiver"],"onHit":{"fear":"WIL roll or Fear Table"},"text":"Weapons or quivers. A living target damaged by it must pass a WIL roll or roll on the Fear Table (Rulebook p.53)."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Fireproof","rank":2,"prerequisite":"Warming","page":120,"powerLevels":true,"castOn":["clothing","armor"],"buff":{"armorVs":{"fire":"6 per power level"}},"text":"Clothing or armor only. The wearer gains armor rating 6 per power level against fire and heat damage (magical fire too), on top of normal armor."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Fleet Step","rank":2,"prerequisite":"Concealing or Supple Armor","page":120,"powerLevels":true,"castOn":["clothing (usually shoes or boots)"],"buff":{"movement":"+4 per power level"},"text":"Clothing, usually footwear. The wearer's Movement increases by 4 per power level."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Heroism","rank":2,"prerequisite":"Thinking Cap","page":120,"powerLevels":true,"castOn":["worn item"],"buff":{"ignoreConditions":"one per power level"},"mustBeWorn":true,"text":"The wearer ignores the effects of one condition per power level — they can still have it, but suffer no penalty. Must be worn as intended (helmet on head, ring on finger)."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Poison Sting","rank":2,"prerequisite":"Unbreakable","page":120,"powerLevels":true,"castOn":["slashing weapon","piercing weapon","quiver"],"onHit":{"poison":{"type":"chosen when cast","potency":"12, +3 per extra power level"}},"text":"Slashing or piercing weapons, or a quiver. A living target damaged by it is poisoned with a type chosen at casting; potency 12, +3 per extra power level."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Bloodsucker","rank":3,"prerequisite":"Bleeding Weapon","page":121,"powerLevels":false,"castOn":["slashing melee weapon","piercing melee weapon"],"onHit":{"wpDrain":"half damage, rounded up"},"text":"Slashing or piercing melee weapons. When it damages a living target, the victim loses WP equal to half the damage (round up) and the wielder regains that much spent WP (up to max)."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Enchanted Weapon","rank":3,"prerequisite":"Bane Weapon or Dread Weapon","page":121,"powerLevels":true,"castOn":["weapon","shield","quiver"],"buff":{"dragonRange":"1–2, +1 per extra power level"},"text":"Weapons, shields or quivers. Attack or parry rolls of 1–2 with it count as a Dragon; 1–3 at power level 2, 1–4 at 3."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Garment of Strength","rank":3,"prerequisite":"Fleet Step","page":121,"powerLevels":false,"castOn":["clothing","armor"],"buff":{"strSetTo":18,"damageBonus":"D6","carryingCapacity":9},"text":"Clothing or armor. While worn, your STR counts as 18: damage bonus +D6 and carrying capacity 9. STR-based skills don't change."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":true,"parry":true,"enchantment":true,"source":"magic","name":"Hidden Weapon","rank":3,"prerequisite":"Poison Sting","page":121,"powerLevels":true,"activated":true,"castOn":["non-weapon item (clothing, box, chest…)"],"hiddenWeapon":[{"level":1,"as":"Dagger","damage":"D8"},{"level":2,"as":"Short Spear","damage":"D10"},{"level":3,"as":"Short Bow","damage":"D10","range":30}],"text":"Non-weapon items only. On command (an action) a concealed weapon springs out and attacks, hitting automatically but dodgeable/parryable: dagger D8 at power level 1, short spear D10 at 2, short bow D10 range 30 m at 3. No damage bonus, can't parry, undetectable while hidden. Weapon enchantments can also be applied to the hidden weapon."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Magic Wand","rank":3,"prerequisite":"Heroism","page":121,"powerLevels":false,"castOn":["staff","wand"],"buff":{"boonOnSchool":"chosen school of magic"},"text":"Staff or wand only. The user gets a boon on all rolls for one chosen school of magic."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Resonant Plate","rank":3,"prerequisite":"Fireproof","page":121,"powerLevels":false,"castOn":["plate armor"],"text":"Plate armor only. When the wearer is hit in melee, the armor booms: everyone else within 6 meters becomes Dazed (if not already). Monsters are immune."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Endless Capacity","rank":4,"prerequisite":"Magic Wand","page":121,"powerLevels":true,"castOn":["storage item (bottle, chest, barrel, backpack…)"],"buff":{"capacity":"×10 per power level"},"text":"Containers only. Storage capacity is multiplied by 10 per power level."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Heavy Hitter","rank":4,"prerequisite":"Enchanted Weapon","page":121,"powerLevels":false,"castOn":["bludgeoning weapon"],"onHit":{"conditions":["Dazed"]},"text":"Bludgeoning weapons only. A living target damaged by it becomes Dazed."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Lifesaver","rank":4,"prerequisite":"Garment of Strength or Resonant Plate","page":121,"powerLevels":true,"castOn":["worn item"],"buff":{"deathRollBoons":"one per power level"},"mustBeWorn":true,"text":"The wearer gets a boon per power level on death rolls (Rulebook p.50). Must be worn as intended (armor on body, amulet round neck)."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Seeking Arrow","rank":4,"prerequisite":"Enchanted Weapon","page":121,"powerLevels":false,"castOn":["sling","bow","crossbow","quiver"],"buff":{"ignoreBanes":true},"text":"Slings, bows, crossbows or quivers. Attacks with it ignore banes; only boons apply."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Swift Swing","rank":4,"prerequisite":"Enchanted Weapon","page":121,"powerLevels":false,"castOn":["weapon"],"text":"Weapons only. When an attack with it drops a target to zero HP, the wielder may immediately make another attack."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Throwable","rank":4,"prerequisite":"Enchanted Weapon","page":122,"powerLevels":true,"activated":true,"castOn":["melee weapon"],"buff":{"thrownRange":"STR × power level meters"},"text":"Melee weapons only. It can be thrown as a ranged attack up to STR × power level meters and flies back to the thrower's hand afterwards."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Epic Armor","rank":5,"prerequisite":"Lifesaver","page":122,"powerLevels":true,"castOn":["armor","helmet"],"buff":{"armor":"+1 per power level"},"text":"Armor and helmets only. Armor rating +1 per power level."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Epic Weapon","rank":5,"prerequisite":"Heavy Hitter, Seeking Arrow, Swift Swing or Throwable","page":122,"powerLevels":true,"castOn":["weapon"],"buff":{"damage":"+2 per power level"},"text":"Weapons only. All attacks with it deal +2 damage per power level."},
  {"school":"Enchanting","requirements":["tools"],"requirementDetail":"blacksmithing, carpentry or tanning tools, depending on the item","castingTime":"stretch","range":"Item","duration":"Shift","dodge":false,"parry":false,"enchantment":true,"source":"magic","name":"Power Item","rank":5,"prerequisite":"Lifesaver","page":122,"powerLevels":true,"castOn":["worn item (often headwear or jewelry)"],"buff":{"maxWp":"+2 per power level"},"mustBeWorn":true,"text":"Usually headwear or jewelry. Max WP +2 per power level while worn as intended."},
  {"school":"Dracomancy","rank":6,"prerequisite":"Any rank 5 spell","castingTime":"action","powerLevels":true,"wpPerPowerLevel":6,"dodge":false,"parry":false,"source":"magic","name":"Astral Form","requirements":["word"],"range":"Personal","duration":"Shift","page":133,"self":true,"text":"Leave your body as an astral self that flies through air and solid matter at 20 m per round (double when dashing), doubling per power level beyond the first. You can see and hear and pass through anything but metal, but can't interact or communicate. Your body lies unconscious (you sense vaguely what happens to it); returning is an action. If your body dies meanwhile, you become a ghost (Rulebook p.87)."},
  {"school":"Dracomancy","rank":6,"prerequisite":"Any rank 5 spell","castingTime":"action","powerLevels":true,"wpPerPowerLevel":6,"dodge":false,"parry":false,"source":"magic","name":"Command Dragon","requirements":["word","gesture"],"range":"20 meters","duration":"Instant","page":133,"text":"Take brief control of a dragon: hatchling or young dragon at power level 1, adult at 2, ancient at 3. On success it immediately makes one move and one monster attack of your choice, then loses its next turn."},
  {"school":"Dracomancy","rank":6,"prerequisite":"Any rank 5 spell","castingTime":"action","powerLevels":true,"wpPerPowerLevel":6,"dodge":false,"parry":false,"source":"magic","name":"Create","requirements":["word","gesture"],"range":"4 meters","duration":"Permanent","page":134,"text":"Permanently conjure a generic inanimate object, weapons and tools included — not a specific item (like the key to a particular lock), gems, precious metals (copper, silver, gold) or anything of purely monetary value. Max size Normal at power level 1, Large at 2, Huge at 3 (Rulebook p.83)."},
  {"school":"Dracomancy","rank":6,"prerequisite":"Any rank 5 spell","castingTime":"action","powerLevels":true,"wpPerPowerLevel":6,"dodge":false,"parry":false,"source":"magic","name":"Draconic Push","requirements":["word","gesture"],"range":"10 meters","duration":"Instant","page":134,"damage":{"base":"2D8","perLevel":"D8","type":"bludgeoning"},"area":true,"affectsMonsters":true,"text":"A shockwave throws every creature within range — friend or foe, monsters included, any size — 2D8 meters (roll per target); they land prone and take bludgeoning damage equal to meters thrown. Can't be dodged. 3D8 at power level 2, 4D8 at 3."},
  {"school":"Dracomancy","rank":6,"prerequisite":"Any rank 5 spell","castingTime":"action","powerLevels":true,"wpPerPowerLevel":6,"dodge":false,"parry":false,"source":"magic","name":"Erase","requirements":["word","gesture"],"range":"4 meters","duration":"Permanent","page":135,"opposed":"WIL (monsters WIL 15 unless stated)","text":"A physical object or creature ceases to exist. A living creature needs an opposed roll vs its WIL (monsters WIL 15 unless stated); a magic item gives a bane. Max size Normal at power level 1, Large at 2, Huge at 3."},
  {"school":"Dracomancy","rank":6,"prerequisite":"Any rank 5 spell","castingTime":"action","powerLevels":true,"wpPerPowerLevel":6,"dodge":false,"parry":false,"source":"magic","name":"Force Field","requirements":["word","gesture"],"range":"Personal","duration":"Stretch","page":135,"text":"A stationary energy barrier surrounds you; no physical object (you included) can cross it, and it blocks teleportation. Covers a building at power level 2, a whole city at 3. One extra power level extends it to a shift. Only a dracomancer can undo it, with Counter Ritual and a Dracomancy roll."},
  {"school":"Dracomancy","rank":6,"prerequisite":"Any rank 5 spell","castingTime":"action","powerLevels":true,"wpPerPowerLevel":6,"dodge":false,"parry":false,"source":"magic","name":"Freeze Time","requirements":["word","gesture"],"range":"Personal","duration":"Two rounds","page":135,"self":true,"text":"Time all but stops around you: for two rounds nobody else may act, not even with reactions. Each extra power level either brings another person within 10 m into the bubble, or extends the duration — a stretch with one extra level, a shift with two."},
  {"school":"Dracomancy","rank":6,"prerequisite":"Any rank 5 spell","castingTime":"action","powerLevels":true,"wpPerPowerLevel":6,"dodge":false,"parry":false,"source":"magic","name":"Reshape","requirements":["word","gesture"],"range":"Touch","duration":"Permanent","page":135,"opposed":"WIL (monsters WIL 15 unless stated) if unwilling","text":"Permanently transform an object or creature — e.g. change someone's looks or kin (innate ability included) or turn a sword into a shovel. Unwilling creatures get an opposed WIL roll (monsters WIL 15 unless stated). Max size Small at power level 1, Normal at 2, Large at 3. Result must be the same material and roughly the same size; GM rules on edge cases."},
  {"school":"Dracomancy","rank":6,"prerequisite":"Any rank 5 spell","castingTime":"action","powerLevels":true,"wpPerPowerLevel":6,"dodge":false,"parry":false,"source":"magic","name":"Reverse Time","requirements":["word","gesture"],"range":"Personal","duration":"Instant","page":135,"text":"Undo the last round entirely: the dead live, lost HP and WP return, everyone and everything goes back to its prior state, and play resumes from there. Rewinds a stretch at power level 2 and a shift at 3. The GM settles disputes about the earlier state."},
  {"school":"Dracomancy","rank":6,"prerequisite":"Any rank 5 spell","castingTime":"action","powerLevels":true,"wpPerPowerLevel":6,"dodge":false,"parry":false,"source":"magic","name":"Translocate","requirements":["word","gesture"],"range":"10 meters","duration":"Instant","page":135,"opposed":"WIL (monsters WIL 15 unless stated) if unwilling","text":"Teleport another creature or object (up to Normal size) in range to any point within 1 km that you can see or have visited. Unwilling creatures need an opposed WIL roll (monsters WIL 15 unless stated). Each extra power level raises the size one step (Large, then Huge) or multiplies the range by 10."},
  {"powerLevels":true,"dodge":false,"parry":false,"name":"Scrying","school":"Mentalism","rank":2,"prerequisite":"Farsight","requirements":["word","gesture"],"castingTime":"action","range":"10 meters","duration":"Concentration","page":71,"text":"Glimpse past events in the place you're standing — up to a day back at power level 1, a year at 2, centuries at 3. Visions are fragmentary; the GM decides what you see.","source":"magic","updated":true},
  {"powerLevels":true,"dodge":false,"parry":false,"name":"Power Fist","school":"Mentalism","rank":1,"prerequisite":"Mentalism","requirements":["word","gesture"],"castingTime":"action","range":"Personal","duration":"Stretch","page":69,"buff":{"unarmedDamage":"D6 per power level"},"text":"Your unarmed attacks deal +D6 damage per power level, and they count as magical attacks.","magical":true,"source":"magic","updated":true},
  {"powerLevels":true,"dodge":false,"parry":false,"name":"Telepathy","school":"Mentalism","rank":2,"prerequisite":"Farsight","requirements":["word","gesture"],"castingTime":"action","range":"10 meters","duration":"Concentration","page":71,"text":"Read another person's surface thoughts, or send them your own. Reaching deeper memories takes power level 2 if they are up to a week old, power level 3 if older.","source":"magic","updated":true}
];

export const DB_SUMMONS_EXTRA = [
  {"name":"Guardian Demon","page":32,"source":"magic","spell":["Summon Guardians","Summon Champion","Bind Champion"],"bestiaryPage":146,"kind":"monster","ferocity":1,"size":"Normal","movement":14,"armor":2,"hp":28,"text":"Horned, spear-and-shield demon soldiers trained to fight as a unit. Loyal: when summoned with Summon Champion it always returns home obediently at the end.","traits":[{"name":"Keen Sense of Smell","text":"Opponents get a bane on SNEAKING rolls to get past them."},{"name":"Coordinated","text":"When not fighting alone, guardian demons may choose any initiative card they like before cards are drawn instead of drawing at random."}],"attacks":[{"roll":1,"name":"Spear Sweep","damage":null,"type":null,"targets":"one","range":2,"fear":false,"conditions":["Dazed"],"prone":true,"parry":false,"dodge":true,"text":"Sweeps the long iron spear at a foe's legs: knocked down and Dazed."},{"roll":2,"name":"Shield Bash","damage":"2D8","type":"piercing","targets":"one","range":2,"fear":false,"conditions":[],"prone":true,"parry":false,"dodge":true,"text":"Slams a foe with its spiked shield for 2D8 piercing; they are knocked down."},{"roll":3,"name":"Paralyzing Spear Thrust","damage":"2D10","type":"piercing","targets":"one","range":2,"fear":false,"conditions":[],"prone":false,"parry":false,"dodge":true,"poison":{"type":"paralyzing","potency":12},"text":"Thrusts the iron spear for 2D10 piercing and injects paralyzing poison (potency 12)."},{"roll":4,"name":"Impaling Horns","damage":"2D10","type":"piercing","targets":"one","range":2,"fear":false,"conditions":[],"prone":false,"parry":false,"dodge":true,"text":"Gores a foe with its horns for 2D10 piercing."},{"roll":5,"name":"Entangling Rope","damage":null,"type":null,"targets":"one","range":10,"fear":false,"conditions":[],"prone":true,"parry":false,"dodge":true,"text":"Throws a weighted rope at a foe within 10 m who trips and falls: they can't move or take actions needing movement except trying to break free — an action and an AGL roll with a bane; others can help."},{"roll":6,"name":"Teleportation","damage":null,"type":null,"targets":"self","range":20,"fear":false,"conditions":[],"prone":false,"parry":false,"dodge":false,"text":"Plants its spear in the ground and teleports anywhere within 20 m; this doesn't provoke a free attack."}]},
  {"name":"Demonic Champion","page":32,"source":"magic","spell":["Summon Champion","Bind Champion"],"kind":"reference","text":"Any demon from the Rulebook or the Bestiary, using its own stat block and monster attack table (the GM picks its attacks; it can't be micromanaged). Summon Champion: serves a stretch for free, then needs a DEMONOLOGY roll to send home (bane/normal/boon at power level 1/2/3); on failure D6 1–3 it attacks you and your allies, 4–6 it leaves to spread havoc unless attacked at once. Bind Champion: serves a day per power level for a negotiated price.","breakFree":[{"roll":[1,3],"text":"Attacks you and your allies immediately."},{"roll":[4,6],"text":"Laughs and goes off to spread terror nearby unless you attack it at once."}]},
  {"name":"Tweeg","page":28,"source":"magic","trick":"Summon Tweeg","kind":"servant","text":"A rat-sized demon that stays one shift; it has no skills but helps with everyday chores."},
  {"name":"Puck","page":26,"source":"magic","spell":["Familiar","Greater Familiar"],"kind":"familiar","movement":10,"hp":5,"attack":"Bite (skill 12, D3)","skills":"Awareness 10, Evade 14, Sneaking 12","text":"Lesser demon most demonologists bind as a familiar; any shape — winged, two to nine legs or a slime-gliding blob, with horns, claws, fangs, mandibles or fur."},
  {"name":"Animated Carcass","spell":"Animate Carcass","school":"Necromancy","page":80,"source":"magic","statsFrom":"Core animal stat blocks (Rulebook p.99)","maxHpByLevel":[8,14,20],"duration":"Shift","control":"Loyal thrall; you communicate with it telepathically.","text":"A reanimated dead animal; the power level caps the animal's HP."},
  {"name":"Raised Skeleton","spell":"Raise Skeleton","school":"Necromancy","page":81,"source":"magic","statsFrom":"Core standard skeleton (Rulebook p.96) — app NPC \"Skeleton Warrior\" minus gear; Skeleton Champion at power level 3","options":[{"powerLevel":1,"count":1,"duration":"Stretch","kind":"Skeleton"},{"powerLevel":2,"count":2,"duration":"Stretch","kind":"Skeleton"},{"powerLevel":2,"count":1,"duration":"Shift","kind":"Skeleton"},{"powerLevel":3,"count":3,"duration":"Stretch","kind":"Skeleton"},{"powerLevel":3,"count":2,"duration":"Shift","kind":"Skeleton"},{"powerLevel":3,"count":1,"duration":"Stretch","kind":"Skeleton Champion"}],"gear":"None unless the necromancer provides it.","control":"Telepathic at any range; follows instructions to the letter.","text":"Animated from the skeleton of a human-sized humanoid."},
  {"name":"Raised Wight","spell":"Raise Wight","school":"Necromancy","page":82,"source":"magic","statsFrom":"Core Wight (Rulebook p.98) — app monster \"Wight\"","durationByLevel":["Shift","Day","Week"],"limit":1,"gear":"Often buried with weapons and armor.","control":"Telepathic at any range. In combat you choose whom it attacks; its monster attack is rolled on its table.","text":"A dead lord, lady or mighty warrior bound to your service."},
  {"name":"Mummy","spell":"Raise Mummy","school":"Necromancy","page":83,"source":"magic","monster":true,"ferocity":2,"size":"Normal","movement":6,"armor":null,"hp":42,"durationByLevel":["Shift","Day","Week"],"limit":1,"control":"Telepathic at any range. In combat you choose whom it attacks; its monster attack is rolled on its table.","statsAlsoIn":"Bestiary p.112","resistances":["Piercing (half damage — no internal organs)"],"weaknesses":["Fire (double damage)"],"traits":[{"name":"Resistance","text":"No internal organs: half damage from piercing weapons."},{"name":"Flammable","text":"Dry as tinder: double damage from fire."}],"text":"An anointed, linen-wrapped corpse of a ruler or great warrior raised as an obedient undead servant.","attacks":[{"roll":1,"name":"Curse!","damage":null,"type":null,"targets":"one","range":10,"fear":"bane","conditions":[],"prone":false,"parry":false,"dodge":true,"text":"Curses one opponent within 10 m: they suffer a fear attack with a bane on the WIL roll."},{"roll":2,"name":"Double Strike!","damage":"2D6","type":"bludgeoning","targets":"two","range":2,"fear":false,"conditions":[],"prone":true,"parry":false,"dodge":true,"text":"Fists hit up to two opponents within 2 m of each other for 2D6 bludgeoning and knock them down."},{"roll":3,"name":"Swarm of Insects!","damage":"D8","type":"piercing","targets":"all opponents within 4 m","range":4,"fear":false,"conditions":[],"prone":false,"parry":false,"dodge":false,"ignoresArmor":true,"text":"Spews biting insects at every opponent within 4 m: D8 piercing ignoring armor, and each must pass a WIL roll or lose their turn this round (if not taken yet). Can't be dodged."},{"roll":4,"name":"Deadly Throw!","damage":"2D6","type":"bludgeoning","targets":"one","range":2,"fear":false,"conditions":[],"prone":true,"parry":false,"dodge":true,"text":"Hurls an opponent 2D6 m; they land prone and take the same in bludgeoning damage."},{"roll":5,"name":"Strangulation!","damage":"2D6","type":"bludgeoning","targets":"one","range":2,"fear":false,"conditions":[],"prone":false,"parry":false,"dodge":true,"ignoresArmor":true,"grapple":{"perTurn":"D6","breakFree":"STR roll with a bane; others can help"},"text":"Grabs a throat: 2D6 bludgeoning ignoring armor, plus D6 bludgeoning on each of the mummy's turns. The victim can't move or take movement actions except breaking free (STR with a bane; others can help). The mummy makes no other attacks until the victim hits zero HP or escapes."},{"roll":6,"name":"Heartbreak!","damage":"D10","type":null,"targets":"one","range":10,"fear":true,"conditions":[],"prone":false,"parry":false,"dodge":true,"ignoresArmor":true,"text":"Locks eyes with an opponent within 10 m: D10 damage ignoring armor, a fear attack, and they lose their turn this round (if not taken yet)."}]},
  {"name":"Skeletal Horde","spell":"Raise Skeletal Horde","school":"Necromancy","page":83,"source":"magic","statsFrom":"Core standard skeleton (Rulebook p.96) per member","duration":"Shift","limit":1,"maxCount":"WIL base chance × power level (×1 / ×2 / ×3)","rules":["The horde takes a single turn per round.","On its turn it makes attacks equal to its number of skeletons ÷ 5, rounded up.","Each skeleton has its own HP and moves individually, but must stay within 2 m (adjacent square) of another member where possible."],"control":"Blindly obeys every command.","text":"A horde of raised skeletons acting as one unit."},
  {"name":"Golem","spell":"Golem","school":"Symbolism","page":92,"source":"magic","movement":8,"armor":6,"hpPerLevel":8,"duration":"Stretch/shift","attack":{"name":"Stone fists","damage":"D6 per power level","type":"bludgeoning","note":"Hits automatically in melee; can be dodged or parried."},"control":"Serves as your bodyguard and obeys your commands.","abilities":[],"resistances":[],"immunities":[],"text":"A clay figure or stone statue animated by drawn or carved symbols."}
];

export const DB_WEAPONS_EXPANSION = [
  {"name":"Whip","grip":"1H","str":null,"range":4,"damage":"D8","durability":null,"cost":null,"supply":null,"features":["Slashing","Toppling","Cannot be used for parrying"],"skill":"Brawling","melee":true,"noParry":true,"source":"magic","page":128,"note":"Stats given for the Tongue of Bahlbadash; grip, STR, cost and supply not stated (1H assumed)."}
];

