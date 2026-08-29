// GENERATED FILE - do not edit by hand.
// Source: data/nimble/parts/*.json - regenerate with: node scripts/build-nimble-data.mjs

const NIMBLE_FAMILIES = [
  {
    "name": "Kobolds",
    "blurb": "Small, maniacal dragonlings. Fiercely protective of their own.",
    "trait": "Nooooo! When an ally within 2 spaces dies, attack once for free.",
    "sampleEncounters": [
      "Sample Encounters (per hero). For an easier encounter use the line 1 or 2 levels lower. More challenging, 1 or 2 levels higher.",
      "Level 1: 3 Kobold Flunkies / 4 Minions",
      "Level 2: 6 Kobolds* / 4 Sneaks / 1 Clanger + 1 Trapper",
      "Level 3: 2 Clangers + 1 Trapper / 3 Trappers / 6 Sneaks*",
      "Level 4: 4 Trappers / 2 Denwardens + 4 Sneaks*",
      "*Remember! Even very weak monsters can be far more deadly than intended when they outnumber the heroes by more than 4 to 1. Between 1 and 4 monsters for each hero is ideal."
    ],
    "loot": "Honey, LOTS of twine, sandwiches (stolen), shiny objects, dragon painting (poorly—yet lovingly—made), rotting meats, a variety of traps (small cages, spikes, snapping).",
    "page": 32
  },
  {
    "name": "Goblins",
    "blurb": "Green, cunning, & thriving on the edge of chaos. Will mock you mercilessly if given the chance.",
    "trait": "Haha, Missed Me! Whenever an attack misses you, deal 1 psychic damage in return.",
    "sampleEncounters": [
      "Sample Goblin Encounters (per hero). For an easier encounter, use the line 1 or 2 levels lower. More challenging, 1 or 2 levels higher.",
      "Level 1: 1 Flunky / 2 Minions",
      "Level 2: 3 Goblins / 1 Bugbear / 1 Taskmaster / 1 Ratrider",
      "Level 3: 1 Goblin + 1 Bugbear/Taskmaster/Ratrider",
      "Level 4: 2 Goblins + 1 Bugbear/Taskmaster/Ratrider",
      "Level 5: 3 Goblins + 2 Ratrider / 2 Bugbears*",
      "Level 6: 3 Bugbears, 3 Ratriders, or 9 Goblins*"
    ],
    "loot": "Live mouse (a snack for later), moldy bread, smooth stones, sharp sticks, teeth (forcibly removed), arrows (surprisingly well-made), lots of blades (jagged, but effective), dead captive (forgot to feed him), shiny junk (random shiny bits of metal, broken glass, and buttons), slug farm (a jar of slimy, wriggling slugs), \"Potion\" (suspiciously colored liquid in a dirty bottle), unidentifiable jerky. A filthy notebook tracking bizarre trades and bets, boots (too big).",
    "page": 33
  },
  {
    "name": "Bandits",
    "blurb": "You've got money, they want money… a perfect match! (hand it over)",
    "trait": "Parry. Treat attacks against you that roll 2 as a miss.",
    "loot": "VERY valuable item (stolen; its owner may come looking for it, or reward you for its return), kidnapped person, leather armor, chipped blades, old food, fine art or clothes, wagon load of some commodity (salt, nails, wool, etc.), coded letter from a secretive client.",
    "page": 34
  },
  {
    "name": "Snakemen",
    "blurb": "*Aggressive Hissing Noises*",
    "trait": "Coiling Strike. On melee crit: Grapple (escape DC 10).",
    "page": 34
  },
  {
    "name": "Dungeon Denizens",
    "blurb": "For some creatures, YOU are the loot at the end of the dungeon.",
    "trait": "Stirges — Evasive Flier. Attacks against stirges are made with disadvantage. Latched On. You move where your target moves until either dies. Your attacks can't miss or be Defended/Interposed against. Attacks that miss you damage your target instead. Mimics — Ambusher. Mimics always start first and heroes roll Initiative with disadvantage. Sticky. Mimic hits also Grapple and can Grapple any number of creatures. When crit: release 1 creature (attacker's choice). Oozes — Digestive Touch. Contact with an ooze inflicts the Digested condition: they deal an additional X damage for each time the target has been Digested this encounter (X = the ooze's damage bonus).",
    "loot": "Tarnished coins (partially dissolved by acid), ancient bones with traces of gnaw marks, indigestible items (bones, gems, magical trinkets), a leather-bound journal (water-damaged pages), lockpicks, a treasure map (only half), boots (suspiciously untouched by corrosion).",
    "page": 35
  },
  {
    "name": "Hill & Field",
    "blurb": "Mighty brutes and cunning beasts, always on the lookout for easy prey.",
    "trait": "Gnolls — Frenzy. Advantage against Bloodied creatures.",
    "page": 36
  },
  {
    "name": "Undead",
    "blurb": "Hate the living for not being dead, hate themselves for not being living.",
    "trait": "Unliving, Undying. The first time this dies, reset to 1 HP instead (excluding minions).",
    "loot": "Tarnished silver locket containing a faded portrait (who is it?), bone fragments engraved with arcane symbols, a dark gemstone (emits a faint chill), vials of blood (long-dried), a diary written in an ancient hand, a macabre necklace (skeletal finger bones), a broken holy symbol smeared with ash, a signet ring from a lost noble house, moldy grave dirt (whispers when touched), shovel.",
    "page": 37
  },
  {
    "name": "Forest Denizens",
    "blurb": "Every shadow hides a predator, every branch and leaf conspires against you, the forest is alive—and you are not welcome.",
    "trait": "Briarbanes (soulless, thorny plant beings fertilized by blood) — Peeling Bark. Damage degrades Armor 1 step: Heavy » Medium » None.",
    "loot": "Briarbane Loot: 25 ft. of vines (usable as rope), glowing sap (minor healing properties), moss-covered coins from an ancient era, a brittle leaf with veins that spell out words in Druidic, a pouch of dried herbs, a cluster of rare mushrooms, a handful of acorns (they grow INSTANTLY when placed in water), a small flower that never wilts, flute overgrown with moss, a tattered map to a hidden grove, a dried flower crown.",
    "page": 38
  },
  {
    "name": "Cultists/Horrors",
    "blurb": "Driven by twisted beliefs, fanatical cultists perform dark rituals to awaken ancient evils, unleashing horrors that feast on fear and despair.",
    "trait": "Cultists — Fanatical Zeal. While not at max HP, make all rolls with advantage. Your crits also inflict Despair. (Despair: Disadvantage on the next attack you make this encounter.)",
    "loot": "Horrible Loot: Bloodstained dagger (engraved with dark symbols), a twisted idol (whispers terrible thoughts), vial of black ichor, a mask (carved, likeness of a fiend), a tattered robe (lined with hidden pockets), a scroll with summoning rituals (half-finished), shackles inscribed with infernal runes, fragment of a fiendish contract, black candles (cannot be extinguished).",
    "page": 39
  },
  {
    "name": "Underground",
    "blurb": "Nightmarish denizens of the deep, these monstrous beings lurk in dark tunnels and cavernous depths, ready to ensnare or devour any intruders.",
    "loot": "Chitinous plating, tunnel map (hastily scrawled), serrated teeth (as much as you can carry), spider silk, venom sac, partially digested meats, gemstones (uncut), pheromone gland, luminescent fungus, molted carapace, rusted tools, ancient coins, echo stones (faintly hum when tapped).",
    "page": 40
  },
  {
    "name": "Legendary",
    "blurb": "Solo monsters should almost always be Legendary. Heroes should know when they are fighting a Legendary creature; save these encounters for a particularly meaningful fight — THE SCARY DRAGON, the named boss, or the Big Bad Evil Guy. Legendary monsters act after EACH hero's turn (only after heroes' turns — not commoners, minions or followers). They have interesting mechanics and weaknesses that can be uncovered through research ahead of time or the Assess action. Saves: advantaged (+) or disadvantaged (–) saves, e.g. STR++, WIL– rolls STR saves with advantage 2 and WIL saves with disadvantage. Bloodied: they gain an additional dangerous ability as their HP drops to half. Last Stand: at 0 HP they are dying and gain dangerous new capabilities; they finally die once a small amount of additional damage is done. Legendary Teams: \"Solo\" encounters need not be strictly solo — legendary creatures may have pets, summon minions, or come in groups; have ALL of them attack after each hero, or take turns.",
    "trait": "Optional Actions. Each legendary monster can also use these default actions instead of its listed attacks (to add drama or tune down a too-hard encounter): Wind Up/Breathe In — regain the use of a single use ability. Terrible Roar/Creepy Monologue/Taunt — creatures who hear this make a WIL save or are Frightened for 1 turn. Toss Around/Telekinetic Shove — STR save or moved, Prone, etc. Size Up/Spot Weakness/Pin Down — DEX save, the next attack you make is with advantage and cannot be Interposed.",
    "page": 42
  }
];
