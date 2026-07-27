// GENERATED FILE — do not edit by hand.
// Source: tools/templates/sd_character_sheet.html (SD_WEAPONS, SHOP_WEAPONS, SHOP_ARMOR, SHOP_BASIC, SHOP_MAGIC)
// Regenerate with: node scripts/extract-game-data.mjs

export type GearItem = {
  name: string;
  category: "basic" | "weapon" | "armor" | "magic" | "ammo";
  cost: string;
  qty?: string;
  weaponType?: string;
  range?: string;
  damage?: string;
  props?: string;
  magicType?: string;
  desc: string;
};

export const GEAR: GearItem[] = [
  {
    "name": "Arrows",
    "category": "ammo",
    "cost": "1 gp",
    "desc": "Ammo for bows",
    "qty": "20"
  },
  {
    "name": "Backpack",
    "category": "basic",
    "cost": "2 gp",
    "desc": "First one free to carry"
  },
  {
    "name": "Ball bearing",
    "category": "basic",
    "cost": "1 gp",
    "desc": "DC 12 DEX to roll it a near distance in a straight line. Triggers traps as if an adult human stepped there; lost once it does."
  },
  {
    "name": "Caltrops",
    "category": "basic",
    "cost": "5 sp",
    "desc": "One bag"
  },
  {
    "name": "Candle",
    "category": "basic",
    "cost": "5 cp",
    "desc": "Close light for 20 real minutes. Can be hidden behind a cloak or hand.",
    "qty": "3"
  },
  {
    "name": "Charcoal, jar",
    "category": "basic",
    "cost": "1 gp",
    "desc": "One use. Leeches the poison out of an edible item, making it safe."
  },
  {
    "name": "Crossbow bolts",
    "category": "ammo",
    "cost": "1 gp",
    "desc": "Ammo for crossbows",
    "qty": "20"
  },
  {
    "name": "Crawling Kit",
    "category": "basic",
    "cost": "7 gp",
    "desc": "Backpack, flint & steel, 2 torches, 3 rations, 10 iron spikes, grappling hook, rope"
  },
  {
    "name": "Crowbar",
    "category": "basic",
    "cost": "5 sp",
    "desc": ""
  },
  {
    "name": "Flash seed",
    "category": "basic",
    "cost": "1 gp",
    "desc": "Sulfurous seed that bursts in a flash of light on impact. Dark-adapted creatures in near who see it: DC 12 CON or blinded 1 round."
  },
  {
    "name": "Flask or bottle",
    "category": "basic",
    "cost": "3 sp",
    "desc": "Holds one draught"
  },
  {
    "name": "Flint & Steel",
    "category": "basic",
    "cost": "5 sp",
    "desc": "Routine fire-lighting succeeds"
  },
  {
    "name": "Glow paste, jar",
    "category": "basic",
    "cost": "2 gp",
    "desc": "Five uses. Sticky paste glows faintly green when exposed to air, leaving a subtle mark for one day."
  },
  {
    "name": "Grappling Hook",
    "category": "basic",
    "cost": "1 gp",
    "desc": ""
  },
  {
    "name": "Holy water, flask",
    "category": "basic",
    "cost": "5 sp",
    "desc": "Deals 2d4 damage to an undead creature."
  },
  {
    "name": "Iron Spikes",
    "category": "basic",
    "cost": "1 gp",
    "desc": "",
    "qty": "10"
  },
  {
    "name": "Lantern",
    "category": "basic",
    "cost": "5 gp",
    "desc": "Casts light like torch, shutter, 1 hr/oil"
  },
  {
    "name": "Lantern hook",
    "category": "basic",
    "cost": "5 sp",
    "desc": "Connects to a belt, allowing hands-free use of a lantern."
  },
  {
    "name": "Miner's putty, jar",
    "category": "basic",
    "cost": "5 sp",
    "desc": "Three uses of tacky putty. One glob bonds 500 lbs. of weight; dries and flakes off in a day."
  },
  {
    "name": "Mirror",
    "category": "basic",
    "cost": "10 gp",
    "desc": ""
  },
  {
    "name": "Net",
    "category": "basic",
    "cost": "5 sp",
    "desc": "Close range, one target. DC 15 DEX to entrap a human-sized or smaller creature. It escapes on a DC 12 DEX check on its turn."
  },
  {
    "name": "Oil, flask",
    "category": "basic",
    "cost": "5 sp",
    "desc": "Fuel or thrown weapon, 1d4/round"
  },
  {
    "name": "Pole",
    "category": "basic",
    "cost": "5 sp",
    "desc": "Wooden, 10' long"
  },
  {
    "name": "Rations",
    "category": "basic",
    "cost": "5 sp",
    "desc": "Food + water, one day each",
    "qty": "3"
  },
  {
    "name": "Rope (60 ft)",
    "category": "basic",
    "cost": "1 gp",
    "desc": "Hemp"
  },
  {
    "name": "Rope, morzo silk",
    "category": "basic",
    "cost": "50 gp",
    "desc": "Pencil-thin 60' rope of morzo worm silk. Immune to all damage except from a silvered or magical source."
  },
  {
    "name": "Tallow, jar",
    "category": "basic",
    "cost": "5 sp",
    "desc": "One application. Greases a door-sized object, a person, or a close area, making it absurdly slippery for a day."
  },
  {
    "name": "Torch",
    "category": "basic",
    "cost": "5 sp",
    "desc": "Near light, 1 hour"
  },
  {
    "name": "Traveler's lamp",
    "category": "basic",
    "cost": "10 gp",
    "desc": "Burns one flask of oil a day. Enough light to see during hex travel in darkness, but not in combat or crawling rounds."
  },
  {
    "name": "Bastard Sword",
    "category": "weapon",
    "cost": "10 gp",
    "weaponType": "M",
    "range": "Close",
    "damage": "1d8/1d10",
    "props": "Versatile, 2 slots",
    "desc": ""
  },
  {
    "name": "Club",
    "category": "weapon",
    "cost": "5 cp",
    "weaponType": "M",
    "range": "Close",
    "damage": "1d4",
    "props": "",
    "desc": ""
  },
  {
    "name": "Strikes",
    "category": "weapon",
    "cost": "",
    "weaponType": "M",
    "range": "Close",
    "damage": "1d4",
    "props": "Finesse, Unarmed",
    "desc": ""
  },
  {
    "name": "Crossbow",
    "category": "weapon",
    "cost": "8 gp",
    "weaponType": "R",
    "range": "Far",
    "damage": "1d6",
    "props": "Two-handed, Loading",
    "desc": ""
  },
  {
    "name": "Dagger",
    "category": "weapon",
    "cost": "1 gp",
    "weaponType": "M/R",
    "range": "Close/Near",
    "damage": "1d4",
    "props": "Finesse, Thrown",
    "desc": ""
  },
  {
    "name": "Greataxe",
    "category": "weapon",
    "cost": "10 gp",
    "weaponType": "M",
    "range": "Close",
    "damage": "1d8/1d10",
    "props": "Versatile, 2 slots",
    "desc": ""
  },
  {
    "name": "Greatsword",
    "category": "weapon",
    "cost": "12 gp",
    "weaponType": "M",
    "range": "Close",
    "damage": "1d12",
    "props": "Two-handed, 2 slots",
    "desc": ""
  },
  {
    "name": "Javelin",
    "category": "weapon",
    "cost": "5 sp",
    "weaponType": "M/R",
    "range": "Close/Far",
    "damage": "1d4",
    "props": "Thrown",
    "desc": ""
  },
  {
    "name": "Longbow",
    "category": "weapon",
    "cost": "8 gp",
    "weaponType": "R",
    "range": "Far",
    "damage": "1d8",
    "props": "Two-handed",
    "desc": ""
  },
  {
    "name": "Longsword",
    "category": "weapon",
    "cost": "9 gp",
    "weaponType": "M",
    "range": "Close",
    "damage": "1d8",
    "props": "",
    "desc": ""
  },
  {
    "name": "Mace",
    "category": "weapon",
    "cost": "5 gp",
    "weaponType": "M",
    "range": "Close",
    "damage": "1d6",
    "props": "",
    "desc": ""
  },
  {
    "name": "Shortbow",
    "category": "weapon",
    "cost": "6 gp",
    "weaponType": "R",
    "range": "Far",
    "damage": "1d4",
    "props": "Two-handed",
    "desc": ""
  },
  {
    "name": "Shortsword",
    "category": "weapon",
    "cost": "7 gp",
    "weaponType": "M",
    "range": "Close",
    "damage": "1d6",
    "props": "",
    "desc": ""
  },
  {
    "name": "Spear",
    "category": "weapon",
    "cost": "5 sp",
    "weaponType": "M/R",
    "range": "Close/Near",
    "damage": "1d6",
    "props": "Thrown",
    "desc": ""
  },
  {
    "name": "Staff",
    "category": "weapon",
    "cost": "5 sp",
    "weaponType": "M",
    "range": "Close",
    "damage": "1d4",
    "props": "Two-handed",
    "desc": ""
  },
  {
    "name": "Warhammer",
    "category": "weapon",
    "cost": "10 gp",
    "weaponType": "M",
    "range": "Close",
    "damage": "1d10",
    "props": "Two-handed",
    "desc": ""
  },
  {
    "name": "Blowgun",
    "category": "weapon",
    "cost": "5 gp",
    "weaponType": "R",
    "range": "Near",
    "damage": "1",
    "props": "Firing from hiding does not reveal your position",
    "desc": ""
  },
  {
    "name": "Bolas",
    "category": "weapon",
    "cost": "2 gp",
    "weaponType": "R",
    "range": "Near",
    "damage": "—",
    "props": "On a hit vs. a legged creature horse-sized or smaller, its speed drops to close until it frees itself (DC 15 STR or DEX)",
    "desc": ""
  },
  {
    "name": "Morningstar",
    "category": "weapon",
    "cost": "5 gp",
    "weaponType": "M",
    "range": "Close",
    "damage": "1d6/1d8",
    "props": "Versatile",
    "desc": ""
  },
  {
    "name": "Pike",
    "category": "weapon",
    "cost": "10 gp",
    "weaponType": "M",
    "range": "Close",
    "damage": "1d10",
    "props": "Reach (double close), Two-handed, 2 slots",
    "desc": ""
  },
  {
    "name": "Razor Chain",
    "category": "weapon",
    "cost": "12 gp",
    "weaponType": "M/R",
    "range": "Close/Near",
    "damage": "1d6",
    "props": "Finesse, Lash",
    "desc": ""
  },
  {
    "name": "Scimitar",
    "category": "weapon",
    "cost": "8 gp",
    "weaponType": "M",
    "range": "Close",
    "damage": "1d6",
    "props": "Finesse",
    "desc": ""
  },
  {
    "name": "Shuriken",
    "category": "weapon",
    "cost": "1 gp",
    "weaponType": "R",
    "range": "Near",
    "damage": "1d4",
    "props": "Can be strewn on the ground: living creatures who step on it take 1 damage and move at half speed for 10 rounds",
    "desc": ""
  },
  {
    "name": "Sling",
    "category": "weapon",
    "cost": "5 sp",
    "weaponType": "R",
    "range": "Far",
    "damage": "1d4",
    "props": "",
    "desc": ""
  },
  {
    "name": "Whip",
    "category": "weapon",
    "cost": "10 gp",
    "weaponType": "M/R",
    "range": "Close/Near",
    "damage": "1d4",
    "props": "Finesse, Lash",
    "desc": ""
  },
  {
    "name": "Leather armor",
    "category": "armor",
    "cost": "10 gp",
    "desc": "AC 11 + DEX"
  },
  {
    "name": "Chainmail",
    "category": "armor",
    "cost": "60 gp",
    "desc": "AC 13 + DEX, disadv. stealth/swim, 2 slots"
  },
  {
    "name": "Plate mail",
    "category": "armor",
    "cost": "130 gp",
    "desc": "AC 15, no swim, disadv. stealth, 3 slots"
  },
  {
    "name": "Shield",
    "category": "armor",
    "cost": "10 gp",
    "desc": "+2 AC, occupies one hand"
  },
  {
    "name": "Magic Wand",
    "category": "magic",
    "cost": "",
    "magicType": "Potions, Scrolls & Wands",
    "desc": "A wand containing a single spell — choose which when adding"
  },
  {
    "name": "Potion of Extirpation",
    "category": "magic",
    "cost": "",
    "magicType": "Potions, Scrolls & Wands",
    "desc": "An acrid, tarry substance in an iron flask with a lead stopper. Benefit. You can pour the potion on one object or creature filling up to a close area. The target is utterly removed from reality and cannot be returned by anything short of a wish spell. Personality. Chaotic. Protests loudly while being used and never agrees that the target is the right choice for extirpation."
  },
  {
    "name": "Potion of Flying",
    "category": "magic",
    "cost": "",
    "magicType": "Potions, Scrolls & Wands",
    "desc": "A sunny liquid with bubbles that flash and pop like tiny stars. Benefit. You can fly a near distance for 10 rounds when you drink this potion."
  },
  {
    "name": "Potion of Forgetfulness",
    "category": "magic",
    "cost": "",
    "magicType": "Potions, Scrolls & Wands",
    "desc": "A pink draught that swirls with a counter-clockwise current. Benefit. If you serve this potion to an intelligent being and that being drinks it, the imbiber permanently forgets one memory of your choosing."
  },
  {
    "name": "Potion of Giant Strength",
    "category": "magic",
    "cost": "",
    "magicType": "Potions, Scrolls & Wands",
    "desc": "A clay jar holding a stew of green, leafy sludge. Benefit. Your Strength becomes 18 (+4) and you deal x2 damage on melee attacks for 10 rounds."
  },
  {
    "name": "Potion of Healing",
    "category": "magic",
    "cost": "",
    "magicType": "Potions, Scrolls & Wands",
    "desc": "A glass bottle with a fizzy, lemon-vanilla liquid inside. Benefit. The imbiber of this potion regains hit points based on its level. LV 0-3: 1d6 hit points. LV 4-6: 2d8 hit points. LV 7-9: 3d10 hit points. LV 10+: 4d12 hit points."
  },
  {
    "name": "Potion of Invisibility",
    "category": "magic",
    "cost": "",
    "magicType": "Potions, Scrolls & Wands",
    "desc": "This glass vial appears to be empty, but a liquid audibly splashes around inside it. Benefit. When you drink this potion, you become invisible for 10 rounds or until you attack or cast a spell."
  },
  {
    "name": "Potion of Legendary Deeds",
    "category": "magic",
    "cost": "",
    "magicType": "Potions, Scrolls & Wands",
    "desc": "A golden elixir that resonates with a faint, angelic chord. Benefit. When you drink this potion, you gain one level and your XP total resets to zero."
  },
  {
    "name": "Potion of Polymorph",
    "category": "magic",
    "cost": "",
    "magicType": "Potions, Scrolls & Wands",
    "desc": "A pickled newt floats in this lavender flask of clear liquid. Benefit. When you drink this potion, it casts the polymorph spell (pg. 67) on you with a duration of 1 hour instead of 10 rounds."
  },
  {
    "name": "Potion of Vitality",
    "category": "magic",
    "cost": "",
    "magicType": "Potions, Scrolls & Wands",
    "desc": "A crimson elixir that gently thumps with a heartbeat. Benefit. When you drink this potion, roll your class's hit points die. You permanently gain that many HP. Curse. If you drink more than one Potion of Vitality in your lifetime, you must pass a DC 18 Constitution check each time or die instantly."
  },
  {
    "name": "Spell Scroll",
    "category": "magic",
    "cost": "",
    "magicType": "Potions, Scrolls & Wands",
    "desc": "A scroll inscribed with a single spell — choose which when adding"
  },
  {
    "name": "Enchanted Weapon",
    "category": "magic",
    "cost": "",
    "magicType": "Weapons",
    "desc": "A magic weapon — choose the weapon type and bonus when adding"
  },
  {
    "name": "Blade of Vengeance",
    "category": "magic",
    "cost": "",
    "magicType": "Weapons",
    "desc": "A gray blade with a diamond- cut ruby in the pommel. It whistles sharply with each slice. Bonus. +2 bastard sword. Cannot be wielded by undead. Benefit. You have advantage on attacks against undead creatures with this sword. You can use the sword to cast turn undead once per day (+4 bonus). Personality. Lawful. Grim, suspicious. Forged as a failsafe against the Witch-Kings if they should fall to darkness, which they did. Demands they be slain."
  },
  {
    "name": "Dagger of the Goblin Hero",
    "category": "magic",
    "cost": "",
    "magicType": "Weapons",
    "desc": "A curved dagger with a half- moon notch at the blade's base. Bonus. +1 dagger. Benefit. You can speak Goblin. All goblinoid creatures react to you with a friendly attitude."
  },
  {
    "name": "Greataxe of the Horde",
    "category": "magic",
    "cost": "",
    "magicType": "Weapons",
    "desc": "A jagged greataxe carved from a weighty dragon bone. Bonus. +2 greataxe. Benefit. Once per day, you can turn a regular hit with this weapon into a critical hit. Curse. Each time you go below half your hit points, make a DC 12 Charisma check. On a failure, you enter a battle rage for 1d4 rounds and must attack the nearest creature."
  },
  {
    "name": "Longbow of the Elven Kings",
    "category": "magic",
    "cost": "",
    "magicType": "Weapons",
    "desc": "A deeply curved longbow with deer antler reinforcements. Bonus. +1 longbow. Benefit. You have advantage on attacks with this bow against unnatural creatures and outsiders. Personality. Neutral. Proud, timeless. Believes protecting the natural order is the highest calling. Demands all unnatural creatures be found and slain."
  },
  {
    "name": "Memnon's Blazing Javelin",
    "category": "magic",
    "cost": "",
    "magicType": "Weapons",
    "desc": "This golden javelin occasionally blinks and wavers, briefly turning into a bolt of lightning. Bonus. +1 javelin. Can only be wielded by a chaotic being. If you also wield Memnon's Discordant Blade and Memnon's Entropic Armor, it becomes a +3 javelin. Benefit. The javelin always returns to your hand after being thrown. Once per day, when you throw this javelin, you can turn it into lightning as per the lightning bolt spell (no spellcasting check)."
  },
  {
    "name": "Memnon's Discordant Blade",
    "category": "magic",
    "cost": "",
    "magicType": "Weapons",
    "desc": "This barbed greatsword's red blade trails a shower of sparks when swung to strike. Bonus. +1 greatsword. Can only be wielded by a chaotic being. If you also wield Memnon's Entropic Armor and Memnon's Blazing Javelin, it becomes a +3 greatsword. Benefit. Once per day, you can utterly annihilate one creature of level 9 or less that you damage with this blade. The creature can pass a DC 18 Constitution check to take 3d8 damage instead. Curse. You cannot relinquish ownership of this blade unless it is taken from you by a creature that defeats you in combat. For each day you do not slay a LV 2 or greater creature with this sword, you lose 1d6 hit points. These are restored only when you kill a LV 2 or greater creature with the sword."
  },
  {
    "name": "Necrotic Mace of Withering",
    "category": "magic",
    "cost": "",
    "magicType": "Weapons",
    "desc": "A wrought iron mace tipped with a heavy, screaming skull. Black ichor runs from the skull's eyes when the mace is used to channel necrotic energy. Bonus. +1 mace. Can only be wielded by a chaotic priest. Benefit. While holding the mace, you can turn cure wounds spells you cast into harmful magic that instead inflicts the same amount of damage it would heal. Curse. If you use the mace to cast an inverted cure wounds spell, you are haunted by nightmares that night. You must pass a DC 12 Wisdom check during your next rest or gain no benefit from resting."
  },
  {
    "name": "Obsidian Witchknife",
    "category": "magic",
    "cost": "",
    "magicType": "Weapons",
    "desc": "A glinting, obsidian blade that trails black smoke in thin curls. Bonus. +2 dagger. Cannot be wielded by a lawful being. Benefit. When you cast a spell while holding this dagger, you may wound yourself with it. Add the amount of damage you take to your spellcasting check."
  },
  {
    "name": "Scimitar of the Ash Moon",
    "category": "magic",
    "cost": "",
    "magicType": "Weapons",
    "desc": "This wide, curved blade has a snarling efreeti head on the bronze pommel. Bonus. +3 greatsword. Benefit. If you roll a critical hit with this weapon, the target is beheaded. It dies instantly if decapitation would kill it."
  },
  {
    "name": "Shortsword of the Thief",
    "category": "magic",
    "cost": "",
    "magicType": "Weapons",
    "desc": "A stubby, gray blade riddled with notches and scars. Bonus. +1 shortsword. +2 if wielded by a halfling or thief. Benefit. Once per day, regain a luck token you just spent."
  },
  {
    "name": "Silver Mace of Wrath",
    "category": "magic",
    "cost": "",
    "magicType": "Weapons",
    "desc": "A tarnished, silver mace with seven flanges in the shape of crescent moons. Bonus. +1 mace. Benefit. This weapon deals double damage against creatures with lycanthropy."
  },
  {
    "name": "Sword of the Ancients",
    "category": "magic",
    "cost": "",
    "magicType": "Weapons",
    "desc": "A chipped and rusting blade with an oiled leather grip. Bonus. +2 longsword. Benefit. The sword is unbreakable and can carve through any material. The owner can summon the sword to their hand if it's on the same plane."
  },
  {
    "name": "Thrice-Blessed Sword",
    "category": "magic",
    "cost": "",
    "magicType": "Weapons",
    "desc": "A lustrous, golden-handled blade anointed with blessed tears, incense, and prayers. Bonus. +3 longsword. Only a lawful priest who has achieved the Templar title or higher can wield this sword. Benefit. You deal double damage against demons, devils, and undead. Personality. Lawful. Virtuous, naive. Refuses to be wielded against worshippers of lawful gods, especially self-proclaimed converts. Demands each foe be given the chance to convert before being slain."
  },
  {
    "name": "Trident of the Seas",
    "category": "magic",
    "cost": "",
    "magicType": "Weapons",
    "desc": "A three-pronged, mithral harpoon studded with pearls. Bonus. +2 spear. Benefit. You can breathe underwater, as well as speak to and understand wild sea creatures. Once per day, you can cast control water (pg. 57) with a +4 bonus."
  },
  {
    "name": "Warhammer of the Dwarf Lords",
    "category": "magic",
    "cost": "",
    "magicType": "Weapons",
    "desc": "A boxy hammer with a stout handle and leather throwing strap. It hums with a baritone resonance when spun. Bonus. +1 warhammer. +2 if wielded by a dwarf. Benefit. This weapon has the thrown property (pg. 37) to a near distance. It always returns to your hand after being thrown. Your attacks with this weapon deal double damage against giants."
  },
  {
    "name": "Enchanted Armor",
    "category": "magic",
    "cost": "",
    "magicType": "Armor & Shields",
    "desc": "A magic armor or shield — choose the type and bonus when adding"
  },
  {
    "name": "Armor of Saint Terragnis",
    "category": "magic",
    "cost": "",
    "magicType": "Armor & Shields",
    "desc": "Golden plate mail carved from head to toe with warrior angels. Bonus. +3 plate mail. Only a lawful worshipper of Saint Terragnis can wear this armor. Benefit. Hostile spells that target you are DC 18 to cast. Once per month, you can summon an Avatar of Saint Terragnis (treat as an archangel) to fight by your side for 10 rounds. r to fight the Legion of the that day; so will we.” orc priest"
  },
  {
    "name": "Armor of the Oni",
    "category": "magic",
    "cost": "",
    "magicType": "Armor & Shields",
    "desc": "Black plate mail of lacquered, ironwood panels. The helm's visor is the face of a snarling oni. Bonus. +1 plate mail. Benefit. You can speak and understand Diabolic. Your melee weapon attacks deal +1 damage. Curse. You have disadvantage on attacks and spellcasting checks against demons."
  },
  {
    "name": "Memnon's Entropic Armor",
    "category": "magic",
    "cost": "",
    "magicType": "Armor & Shields",
    "desc": "Deep blue plate mail traced with gold lightning motifs and red gems arrayed into the shape of flames. Bonus. +1 plate mail. Can only be worn by a chaotic being. If you also wield Memnon's Discordant Blade and Memnon's Blazing Javelin, it becomes +3 plate mail. Benefit. Once per day, you can speak the armor's command word. Until your next turn, all non-magical weapons that strike you are instantly unmade, shattering into dust. You take no damage from them."
  },
  {
    "name": "Moonwrought Chainmail",
    "category": "magic",
    "cost": "",
    "magicType": "Armor & Shields",
    "desc": "A luminous jacket of chainmail as lightweight as a silk shirt. Bonus. +1 mithral chainmail. Benefit. Once per day, you can speak the armor's command word. You gain a +1 bonus to your next spellcasting check or ranged attack."
  },
  {
    "name": "Nightcloak Armor",
    "category": "magic",
    "cost": "",
    "magicType": "Armor & Shields",
    "desc": "Matte black leathers enchanted to deepen and darken shadows. Bonus. +1 leather armor. Benefit. Once per day, you may choose to automatically pass a Dexterity check to hide."
  },
  {
    "name": "Ophidian Armor",
    "category": "magic",
    "cost": "",
    "magicType": "Armor & Shields",
    "desc": "Glistening, smooth leather of dappled emerald scales. Bonus. +1 leather armor. Benefit. You have advantage on checks to avoid the effects of poison."
  },
  {
    "name": "Shield of the Crusader",
    "category": "magic",
    "cost": "",
    "magicType": "Armor & Shields",
    "desc": "A weighty kite shield painted with a faded, crimson cross. Bonus. +1 shield. Can only be wielded by a lawful being. Benefit. Once per day, you can speak a prayer to wreathe the shield in holy flames, granting +2 to your AC for 3 rounds."
  },
  {
    "name": "Shield of the Lion",
    "category": "magic",
    "cost": "",
    "magicType": "Armor & Shields",
    "desc": "This shield is carved as a roaring lion's face with a flowing mane. Bonus. +1 shield. Benefit. Once per day, you can command the lion to animate and bellow a ferocious roar. All hostile creatures within near range must immediately make a morale check."
  },
  {
    "name": "Shield of the Witch-King",
    "category": "magic",
    "cost": "",
    "magicType": "Armor & Shields",
    "desc": "A jagged triangle of black steel with spiny, armored plates. Bonus. +2 shield. Can only be wielded by a chaotic being. Benefit. You take half damage from undead creatures. Curse. If you go to 0 HP, the spirit of Ix-Natheer tries to steal your body. He blocks healing magic from affecting you. If you die, Ix-Natheer possesses you. Personality. Chaotic. The spirit of the witch-king Ix-Natheer animates this shield. He pounces on opportunities to betray his wielder so he can try to take over their body and return to unlife."
  },
  {
    "name": "Wraith Chain",
    "category": "magic",
    "cost": "",
    "magicType": "Armor & Shields",
    "desc": "A chainmail shirt of black, mithral links that trails a long cloak of writhing shadows. Bonus. +1 mithral chainmail. Benefit. Once per day, you may cause an attack that hits you to miss instead."
  },
  {
    "name": "Amulet of Secrecy",
    "category": "magic",
    "cost": "",
    "magicType": "Apparel",
    "desc": "A heavy, flat pendant carved with a lidded eye. Benefit. You can't be detected by divination magic such as the scrying spell or a Crystal Ball while wearing this amulet. Curse. You constantly have the sensation of being watched."
  },
  {
    "name": "Amulet of Vitality",
    "category": "magic",
    "cost": "",
    "magicType": "Apparel",
    "desc": "A gold amulet with a red ruby teardrop at its center. Benefit. Your Constitution stat becomes 18 (+4) while wearing this amulet."
  },
  {
    "name": "Boots of Dancing",
    "category": "magic",
    "cost": "",
    "magicType": "Apparel",
    "desc": "Fine, supple boots of sheepskin. Curse. As soon as you don these boots, you begin cavorting and dancing uncontrollably. You move randomly each turn and must pass a DC 15 Dexterity check to remove the boots."
  },
  {
    "name": "Boots of Hovering",
    "category": "magic",
    "cost": "",
    "magicType": "Apparel",
    "desc": "Brown, sturdy boots polished to a sheen. Small, silver wings adorn the heels. Benefit. You can walk on an insubstantial surface for 1 turn at a time. You fall through the surface if you end your turn on it."
  },
  {
    "name": "Boots of the Cat",
    "category": "magic",
    "cost": "",
    "magicType": "Apparel",
    "desc": "Gray, doeskin boots as thin and soft as slippers. Benefit. You can jump up to a near distance from a standstill. Your checks to move silently are always easy (DC 9)."
  },
  {
    "name": "Bracers of Archery",
    "category": "magic",
    "cost": "",
    "magicType": "Apparel",
    "desc": "Leather bracers embossed with soaring hawks. Benefit. You deal +1 damage with ranged weapons."
  },
  {
    "name": "Bracers of Defense",
    "category": "magic",
    "cost": "",
    "magicType": "Apparel",
    "desc": "Steel bracers traced with dwarvish runes of protection. Benefit. You get a +1 bonus to your armor class."
  },
  {
    "name": "Circlet of Wisdom",
    "category": "magic",
    "cost": "",
    "magicType": "Apparel",
    "desc": "A thin, silver circlet set with a shimmering, blue pearl. Benefit. Your Wisdom stat becomes 18 (+4) while wearing this circlet."
  },
  {
    "name": "Cloak of Elvenkind",
    "category": "magic",
    "cost": "",
    "magicType": "Apparel",
    "desc": "A hooded, billowing cloak that shifts colors to match its surroundings. Benefit. Your checks to hide are always easy (DC 9). Once per day, you can become invisible for 5 rounds. The invisibility ends if you attack or cast a spell."
  },
  {
    "name": "Cloak of the Bat",
    "category": "magic",
    "cost": "",
    "magicType": "Apparel",
    "desc": "A leathery, black cloak that has a ragged hem and a hood with pointed ears. Benefit. You can fly a near distance as your movement while in a shadowy area. Curse. Each time you use the cloak to fly, roll a d20. On a result of 1, you and your gear turn into a small bat for 3 rounds."
  },
  {
    "name": "Gauntlets of Might",
    "category": "magic",
    "cost": "",
    "magicType": "Apparel",
    "desc": "Heavy, bronze gauntlets with engravings of Herculean giants. Benefit. Your Strength stat becomes 18 (+4) while wearing these gauntlets."
  },
  {
    "name": "Gloves of Agility",
    "category": "magic",
    "cost": "",
    "magicType": "Apparel",
    "desc": "Thin, leather gloves that seem to meld with the wearer's hands. Benefit. Your Dexterity stat becomes 18 (+4) while wearing these gloves."
  },
  {
    "name": "Hat of Intellect",
    "category": "magic",
    "cost": "",
    "magicType": "Apparel",
    "desc": "A floppy, pointed hat with a wide brim. Benefit. Your Intelligence stat becomes 18 (+4) while wearing this hat."
  },
  {
    "name": "Hat of the Hound",
    "category": "magic",
    "cost": "",
    "magicType": "Apparel",
    "desc": "A rounded, jaunty bowler hat. Benefit. You can transform into a mastiff each day for up to 10 rounds total. Your clothing and possessions transform with you."
  },
  {
    "name": "Helm of Mind Reading",
    "category": "magic",
    "cost": "",
    "magicType": "Apparel",
    "desc": "A helm carved with brain ridges, a spinal neck-guard, and octopus-like tentacles. Benefit. You can cast the detect thoughts spell (pg. 58) three times per day (+4 bonus)."
  },
  {
    "name": "Horned Helm of Ramlaat",
    "category": "magic",
    "cost": "",
    "magicType": "Apparel",
    "desc": "A bloodstained helm made of a ram's skull. Benefit. This helm grants you a +1 bonus to your armor class. You have advantage on any check you make to knock down creatures or objects. Curse. You feel compelled to headbutt delicate objects."
  },
  {
    "name": "Necklace of Charm",
    "category": "magic",
    "cost": "",
    "magicType": "Apparel",
    "desc": "A gold, fishbone chain that shimmers with subtle beauty. Benefit. Your Charisma stat becomes 18 (+4) while wearing this necklace."
  },
  {
    "name": "Ring of Feather Falling",
    "category": "magic",
    "cost": "",
    "magicType": "Apparel",
    "desc": "A pearly ring carved in the likeness of an owl feather. Benefit. Once per day, the ring can cast feather fall (pg. 60) on you when you fall. Personality. Neutral. Fearful of heights. Mentally hoots in an owl-like voice to stay away from the edge of cliffs and pits."
  },
  {
    "name": "Ring of Fireballs",
    "category": "magic",
    "cost": "",
    "magicType": "Apparel",
    "desc": "A bronze loop with claws holding a red marble. A fiery miasma swirls inside the glass. Benefit. You can pluck the glass marble from the ring and throw it up to a far distance, causing a fireball spell (pg. 60) to bloom at the site of impact. The glass marble regrows after you successfully complete a rest."
  },
  {
    "name": "Ring of Invisibility",
    "category": "magic",
    "cost": "",
    "magicType": "Apparel",
    "desc": "A simple, gold band polished to a warm shine. Benefit. Once per day, the ring can cast the invisibility spell (pg. 63) on you. Curse. There is a cumulative 1% chance each time you rest that your sleep is ruined by apocalyptic nightmares, and you gain no benefit from resting. This resets to a 1% chance each time it triggers."
  },
  {
    "name": "Ring of Ramlaat",
    "category": "magic",
    "cost": "",
    "magicType": "Apparel",
    "desc": "A bone-carved ring with a ram skull. Its horns twist forward and red lights glow in its eye sockets. Benefit. Once per day, you can enter a rage where you deal double damage for 5 rounds. During the rage, you can't cast spells and enemies have advantage on melee attacks against you. Personality. Chaotic. Aggressive, overconfident. Seeks to provoke you and your enemies into battle."
  },
  {
    "name": "Robe of the Archmage",
    "category": "magic",
    "cost": "",
    "magicType": "Apparel",
    "desc": "A red silk robe with a wide, gold- hemmed mantle. Golden eyes and moons dust its sleeves. Benefit. Only a wizard with the Archmage title can wear this robe. Your unarmored AC becomes 15 plus your Dexterity modifier. Choose three spells you know. Their spellcasting DC is always 11. You have advantage on casting the disintegrate spell."
  },
  {
    "name": "Robe of the Druid",
    "category": "magic",
    "cost": "",
    "magicType": "Apparel",
    "desc": "A green velvet robe with a deep hood and hems embroidered with silver leaves and vines. Benefit. Only a wizard with the Druid title can wear this robe. Your unarmored AC becomes 15 plus your Dexterity modifier. Twice per day, you can regain the ability to cast one lost spell. You have advantage on casting the shapechange spell. When you cast it, its duration is 1 hour instead of focus."
  },
  {
    "name": "Robe of the Sorcerer",
    "category": "magic",
    "cost": "",
    "magicType": "Apparel",
    "desc": "A black leather robe with a shadowed cowl and clawed clasps on thin, mithral chains. Benefit. Only a wizard with the Sorcerer title can wear this robe. Your unarmored AC becomes 15 plus your Dexterity modifier. When you cast a spell that deals damage, add your Intelligence modifier to the total. You have advantage on casting the power word kill spell."
  },
  {
    "name": "Scarab of Protection",
    "category": "magic",
    "cost": "",
    "magicType": "Apparel",
    "desc": "A brooch made from a horned scarab beetle dipped in gold. Benefit. If you die, make a DC 18 Constitution check. If you succeed, you are unconscious instead of dead."
  },
  {
    "name": "Alabaster Destrier",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A smooth, pearly statuette of a running horse. Benefit. Once per day, the wielder can speak the command word to turn the statuette into a pegasus that accepts neutral or lawful riders. The statuette remains in this form for 1 hour."
  },
  {
    "name": "Bag of Badgers",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A gray, fraying sack matted with white, bristly hair. Benefit. Once per day, you can reach inside the bag and pull out an angry badger. You can throw the badger up to a near distance. The badger attacks the nearest creature for 3 rounds before waddling away."
  },
  {
    "name": "Bag of Devouring",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A worn, leather pouch with tight drawstrings. Curse. This bag devours and destroys anything placed inside it in 1d6 rounds."
  },
  {
    "name": "Bag of Holding",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A worn, leather pouch with tight drawstrings. Benefit. This bag has an interdimensional space inside that can hold up to 10 gear slots. Curse. Placing this item inside another Bag of Holding or a Portable Hole destroys both items and all held inside them."
  },
  {
    "name": "Bead of Force",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A marble with a blue ring of light glowing softly inside it. Benefit. You can throw this bead at one target up to a near distance. If you hit, the target becomes caught in a resilient sphere spell (pg. 69)."
  },
  {
    "name": "Brak's Book of Misspells",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A tome bound in ratskin that bears a jagged, glowing rune. Curse. This spellbook contains one scroll each of acid arrow (pg. 54), fireball (pg. 60), and sleep (pg. 71). When a wizard tries to cast or learn a spell from these scrolls, the spell targets the caster on a success."
  },
  {
    "name": "Brak's Cube of Perfection",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A tiny cube with paintings of goblins on each face, each one depicting transcendence in a physical or mental trait. Benefit. Roll the cube by rolling a d6. Your corresponding stat permanently increases to 18 (+4). 1. Strength. 2. Dexterity. 3. Constitution. 4. Intelligence. 5. Wisdom. 6. Charisma. After being rolled, Brak's Cube of Perfection teleports to a random location in the multiverse."
  },
  {
    "name": "Crystal Ball",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A flawless glass orb with roiling images swirling inside it. Benefit. Only wizards can use a Crystal Ball. You can use it to cast the scrying spell (pg. 70). If you fail the spellcasting check to cast scrying, the Crystal Ball ceases to function for a day."
  },
  {
    "name": "Egg of the Cockatrice",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A blue, hard egg as big as a coconut and heavy as a stone. Benefit. Once per week, you can speak a command word that causes a cockatrice to hatch and follow your commands for 5 rounds before flying away. The egg repairs itself over one week."
  },
  {
    "name": "Flying Carpet",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A richly woven, red carpet with gold tassels. Benefit. The carpet fits two riders (one is the driver). It can fly double near on the driver's turn. Personality. Neutral. Playful, mischievous. Enjoys visiting new places and gets restless without a frequent change in location."
  },
  {
    "name": "Genie Lamp",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A tarnished, brass oil lamp. Benefit. Rubbing the lamp causes its resident djinni (50% chance) or efreeti (50% chance) to emerge. A djinni grants its summoner one wish spell (pg. 73) before disappearing. An efreeti does the same, but only after being defeated in combat."
  },
  {
    "name": "Goblin Bomb",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A preserved rat stuffed with an explosive charge and a fuse. Benefit. You can light the bomb's fuse and throw it a near distance. It explodes in 1d4 rounds, dealing 2d8 damage to everything in near range."
  },
  {
    "name": "Hourglass of the Black Sands",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "An ancient hourglass running with obsidian sand. Benefit. Once per day, you can turn the hourglass when you cast a spell. The spell's effects last 1d4 rounds longer."
  },
  {
    "name": "Immovable Rod",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A short, iron rod with a button on one end. Benefit. When you click the button, the rod becomes fixed in space (holds 5,000 lbs). Clicking the button again ends the effect."
  },
  {
    "name": "Jewel of Barbalt",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A coconut-sized ruby cut with a thousand facets. Benefit. You roll a critical success on an 18-20. Curse. You roll a critical failure on a 1-3."
  },
  {
    "name": "Kytherian Cog",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A coin-sized, toothed wheel buffed to a silvery shine. Benefit. You start every session with a luck token."
  },
  {
    "name": "Magic Ink",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A pot of glossy, black ink that disappears as it dries. Benefit. The ink's writing is invisible when cool and can only be seen when warmed up by a nearby source of strong heat. There's enough for 1d4 uses."
  },
  {
    "name": "Mirror of Mischief",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A full-length mirror polished to a gleaming shine. Grinning, silver demons grasp the mirror, their claws forming its frame. Curse. The first time a humanoid creature looks into this mirror, the mirror creates an evil and malicious duplicate of them. The duplicate can step from the mirror and is an exact copy of the subject (except for magical gear, which looks identical but is mundane in nature). The evil duplicate can live indefinitely outside the mirror. It attempts to sow chaos in the life of the creature it duplicated."
  },
  {
    "name": "Onyx Destrier",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A polished, ebony statuette of a running horse. Benefit. Once per day, the wielder can speak the command word to turn the statuette into a nightmare that accepts neutral or chaotic riders. The statuette remains in this form for 1 hour."
  },
  {
    "name": "Pearl of Power",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A fat, opalescent pearl glowing with an inner radiance. Benefit. Once per day, you may regain the ability to cast a spell you have lost. This cannot restore a spell lost due to a critical spellcasting failure."
  },
  {
    "name": "Pipe of the Rolling Hills",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "Up to three times per day, regain 1d4 hit points when you smoke this pipe. “There's nothing better than a -Ralina, halfling…"
  },
  {
    "name": "Pipes of the Sewers",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A set of tarnished, brass pan pipes with seven cylinders. Benefit. Once per day, you can play these pipes to summon 2d6 giant rats. The rats obey you for d6 rounds, and then they scatter and flee. Curse. If you stop playing while the rats are present, they turn on you and attack."
  },
  {
    "name": "Portable Hole",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A black, velvet square of cloth that unfolds into a wide circle. Benefit. The Portable Hole folds open on a flat surface into a 6-foot wide, 6-foot deep hole. It has 20 gear slots of storage. The hole closes when you fold the cloth into a small square. Curse. Placing this item inside a Bag of Holding or another Portable Hole destroys both items and all held inside them. cheese, a pipe, and a story.” elating a halfling saying"
  },
  {
    "name": "Sphere of Annihilation",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A three-foot, spherical void of pure darkness that hovers above the ground. Benefit. This sphere utterly destroys all matter it touches. Intelligent beings can move the flying sphere a near distance by passing a DC 18 Intelligence check. If multiple creatures vie for control of the sphere, it is a contested Intelligence check instead. Wizards have advantage on this check. The winner moves the sphere a near distance. If the sphere moves into a space occupied by a creature, the being controlling the sphere makes an attack roll against that creature with a +7 bonus. On a hit, the creature is obliterated."
  },
  {
    "name": "Spyglass of True Sight",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A brass, telescoping lens with magical runes carved on it. Benefit. When you look through the spyglass, you can see invisible creatures and objects. Curse. The wielder feels a compulsion to look at everything through the spyglass."
  },
  {
    "name": "Staff of Healing",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A knotted, oak stave with a heavy knurl on one end. Bonus. +1 staff. Benefit. Once per day, you can touch a creature with the staff to heal it for 1d6 hit points."
  },
  {
    "name": "Staff of Ord",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A tapered, mithral staff that resonates with arcane power. The tip features an upward- looking eye in a circle of runes. Bonus. +3 staff. Can only be wielded by a wizard. Benefit. Functions as a wand of dimension door (pg. 59), fireball (pg. 60), sending (pg. 70), and telekinesis (pg. 72). Unlike a wand, the staff remains intact if you roll a 1 on your spellcasting checks. Hostile spells targeting you are DC 18 to cast."
  },
  {
    "name": "Staff of the Cobra",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A curved scepter tipped with a ruby-eyed, flaring cobra head. Bonus. +1 staff. Benefit. All snakes regard you with a friendly attitude unless you do something to upset them. Once per day, you can throw the staff to the ground. It becomes a giant snake for 5 rounds that obeys your mental commands. If the giant snake goes to 0 HP, it reverts into a staff. Curse. You have disadvantage on attacks and casting hostile spells targeting snakes."
  },
  {
    "name": "The Kytherian Mechanism",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A towering, brass platform mounted with countless cogs and gears speckled in blue- green rust. Benefit. A handle turns The Kytherian Mechanism's mighty wheels, but it doesn't function until its seven missing Kytherian Cogs are replaced. Once functional, activating the mechanism allows the operator to undo one event of their choosing from history. Then, the seven Kytherian Cogs magically scatter to far-flung locations."
  },
  {
    "name": "The Malediction Infernal",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A black, leatherbound tome with a grinning demon face embossed on the cover. Benefit. A chaotic being who reads this tome gains a level and learns the Diabolic language. A non-chaotic being who reads this book must pass a DC 18 Wisdom check or lose one level. After being read, the tome teleports to a far-flung location."
  },
  {
    "name": "Tome Mordanticus",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A hand-drawn bestiary of the multiverse's most notable creatures and people. Benefit. When you read the tome, you learn three True Names (pg. 319) of three beings you choose. Your True Name also appears in the book after reading it. Personality. Neutral. Pedantic, fussy. The book constantly tries to escape its owner and can telepathically reach out a near distance to any creature."
  },
  {
    "name": "Tome of Gehemna",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A sturdy, russet volume held by metal clasps. A golden eye in a circle adorns the cover. Benefit. Each day, a random wizard spell scroll appears inside the tome, replacing the spell scroll from the prior day. Personality. Neutral. Instructive, technical. Drones on about the obscure points of spellcasting and has an opinion on every wizard's technique."
  },
  {
    "name": "Tome of Hadebe",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A brass-plated book with pages of etched copper leaf. Benefit. The tome contains one each of the following scrolls: burning hands (pg. 56), fireball (pg. 60), and prismatic orb (pg. 67)."
  },
  {
    "name": "True Name",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "The secret, unique name borne by a creature and documented in The Covenant. Few creatures know their own True Names. Benefit. You have advantage on attack rolls and spellcasting checks targeting a creature whose True Name you utter."
  },
  {
    "name": "Wand of Unlife",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "The knobby finger-bone of a swamp troll steeped in acrid embalming fluid. Benefit. This wand contains the spells animate dead (pg. 54) and create undead (pg. 58). Curse. Each time you use the wand to cast a spell, you take 1d4 points of Constitution damage. If you reach 0 Constitution from this effect, you die and turn into a zombie."
  },
  {
    "name": "Wand of Warding",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A thin, weighty rod of dark iron inscribed with spiraling runes. Benefit. This wand contains the spells dispel magic (pg. 59) and protection from energy (pg. 68). Curse. Each time you fail a spellcasting check with this wand, you also lose the ability to cast a random spell you know until you complete a rest. WAR HORN OF THE ANGELS An opalescent ox horn capped with a golden mouthpiece. Benefit. Only a lawful being can wield the horn. Once per day, you can blow the horn to cast rebuke unholy (pg. 69) with a +4 bonus. A demon or devil who hears the horn has disadvantage on its Charisma check vs. your rebuke unholy spellcasting check."
  },
  {
    "name": "Well of Many Worlds",
    "category": "magic",
    "cost": "",
    "magicType": "Wondrous",
    "desc": "A dark circle of cloth that seems to create a tunnel through the surface it lies upon. Benefit. The Well of Many Worlds folds open on a flat surface into a 6-foot wide hole. Creatures can jump into the hole once per day each to be transported to a random plane of existence."
  }
];
