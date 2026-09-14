// GENERATED FILE - do not edit by hand.
// Source: data/icrpg/parts/*.json - regenerate with: node scripts/build-icrpg-data.mjs

const ICRPG_TYPES = [
  {
    "name": "Warrior",
    "world": "alfheim",
    "desc": "A master of steel who can take a beating.",
    "statFocus": "STR",
    "startingLoot": [
      "Weapon Gem: Customize any 1 WEAPON with a special counterweight, giving it a +2 EFFORT bonus. The gem cannot be removed.",
      "Shield Glove: A strapped glove and belt harness for carrying shields; shields occupy no space in your INVENTORY.",
      "Battle Standard: A tabard or banner with your inspiring war insignia. Choose 1 ally per ROUND; their next roll is EASY."
    ],
    "abilities": [
      "Slayer",
      "Defender",
      "Pit Fighter"
    ]
  },
  {
    "name": "Hunter",
    "world": "alfheim",
    "desc": "A marksman with a knack for survival.",
    "statFocus": "DEX",
    "startingLoot": [
      "Crystal Scope: Attach to any 1 ranged WEAPON; never roll HARD to hit with that WEAPON.",
      "Arcane Cartridge: An enchanted steel sleeve imbues your ammunition with magic; your shots inflict ENERGY damage.",
      "Trap Launcher: A spring-loaded gadget; roll a ranged attack to place a trap anywhere you can see."
    ],
    "abilities": [
      "Quick Draw",
      "Dead Eye",
      "Trap Expert"
    ]
  },
  {
    "name": "Shadow",
    "world": "alfheim",
    "desc": "A master of stealth and subterfuge.",
    "statFocus": "DEX",
    "startingLoot": [
      "Dagger Kit: A set of three masterwork blades that score critical hits on natural 18, 19, or 20 rolls.",
      "Spider Claws: Special clawed gloves that let you move as normal on any surface, including ceilings.",
      "Pocket Cloak: A cloak with 2 versions: treat all CARRIED inventory spaces as EQUIPPED, or add 10 CARRIED spaces."
    ],
    "abilities": [
      "Assassin",
      "Thief",
      "Scout"
    ]
  },
  {
    "name": "Bard",
    "world": "alfheim",
    "desc": "An inspiring and devious tale-teller.",
    "statFocus": "CHA",
    "startingLoot": [
      "Fine Instrument: Your Battle Hymns grant each ally a D8 to boost any 1 roll.",
      "Heirloom: Your weapon is a treasure; always do ULTIMATE when dueling.",
      "Reverse Cloak: A modular costume cape; your fibs last 2D4 ROUNDS."
    ],
    "abilities": [
      "Battle Hymn",
      "Provoker",
      "Thespian"
    ]
  },
  {
    "name": "Mage",
    "world": "alfheim",
    "desc": "A collector and conduit of arcane secrets.",
    "statFocus": "INT",
    "startingLoot": [
      "Astral Grimoire: Your SPELL book is drawn to you by a subtle kinetic force. Gain any 3 INT SPELLS instantly; the book slides toward you if it can.",
      "Memory Ring: Gain any 3 INT SPELLS. On any TURN when not casting, roll 1D6 and keep it for later use on any 1 roll; store up to 6D6.",
      "The Master's Skull: A small demonic skull; fill with blood to store 10 HP, used to heal or as part of your Dark Pact ability."
    ],
    "abilities": [
      "Spell Scholar",
      "Wild Power",
      "Dark Pact"
    ]
  },
  {
    "name": "Priest",
    "world": "alfheim",
    "desc": "A righteous avatar of divine might.",
    "statFocus": "WIS",
    "startingLoot": [
      "Greenstaff: Store elemental magic in a wooden staff. Gain any 3 WIS SPELLS instantly; if lost, it comically turns up in 1D4 ROUNDS.",
      "Book of Truths: A tome of religious texts. Gain any 5 WIS SPELLS instantly, but if lost or destroyed the SPELLS are gone.",
      "Amber Beads: A necklace giving focus. Gain any 1 WIS SPELL that dwells within the beads and only fails on a natural 1."
    ],
    "abilities": [
      "Elemental",
      "Healer",
      "Monk"
    ]
  },
  {
    "name": "Pilot",
    "world": "warpshell",
    "desc": "A headstrong daredevil with rare skill.",
    "statFocus": "DEX",
    "startingLoot": [
      "Hot Rod: A super-compact starship seating up to 6, with no weapons or shields, just tiny and fast as hell.",
      "Speed Holster: Draw a pistol with impossible speed; if an enemy attacks you for the first time, roll 1 free pistol attack against them first.",
      "HUD Goggles: Hypertech optics track a target; the selected target cannot be lost until you designate a new one, across vast distance and even time."
    ],
    "abilities": [
      "Ace",
      "Smuggler",
      "Cap'n"
    ]
  },
  {
    "name": "Gunner",
    "world": "warpshell",
    "desc": "The one you call to blow things up.",
    "statFocus": "DEX",
    "startingLoot": [
      "Burst Module: Attack rolls of modified 15+ earn you another attack.",
      "Reflex Bipod: Your aimed shots only miss on a natural 1.",
      "Explosives Kit: Modify a single gun so its shots explode on contact, damaging a NEAR radius. If empty, lost, or destroyed, spend 1 ROUND to modify a new gun."
    ],
    "abilities": [
      "MG Specialist",
      "Sharpshooter",
      "Demolitions"
    ]
  },
  {
    "name": "Mechanic",
    "world": "warpshell",
    "desc": "An expert on every nut and bolt in space.",
    "statFocus": "INT",
    "startingLoot": [
      "Omnitool: An arc-welder that repairs any machine with ENERGY EFFORT.",
      "Lil Bob: Twin-stick controller and micro camera on a foldable drone; use the drone's location as your location for repair, tune, or jerry rig actions.",
      "Diagnostic Computer: Access lock codes, camera footage, computer files, and magnetic strip codes with an INT roll."
    ],
    "abilities": [
      "Repairman",
      "Jerry Rigger",
      "Tuner"
    ]
  },
  {
    "name": "Navigator",
    "world": "warpshell",
    "desc": "A psychic link to the cosmos.",
    "statFocus": "WIS",
    "startingLoot": [
      "Xevosian Starmap: A wrist-worn megacomputer that cuts all deep space travel times in half, even on a tiny scale such as a dogfight.",
      "Boost Helmet: Focus your will to use any STAT as STR.",
      "Psionic Knives: Make thought into energy at will, forming an ENERGY melee weapon that can never be lost, detected, or damaged; usable by you or your telekinetic presence."
    ],
    "abilities": [
      "Farseer",
      "Telekinetic",
      "Infiltrator"
    ]
  },
  {
    "name": "Scientist",
    "world": "warpshell",
    "desc": "A disciplined mind set on answers.",
    "statFocus": "INT",
    "startingLoot": [
      "Advanced Scan Unit: Use 1 TURN to run a scan, reducing the current TARGET by 1D4 for you and your allies.",
      "Extra Limb: A third arm for work; when doing non-damage EFFORT on machinery, repairs, or building, always roll ULTIMATE.",
      "Genome Taser: A NEAR range electrical weapon useful only against biological life; always roll ULTIMATE, but at 0 HP the target is stunned, not dead."
    ],
    "abilities": [
      "Analysis",
      "Engineering",
      "Xenobiology"
    ]
  },
  {
    "name": "Echo",
    "world": "warpshell",
    "desc": "The quantum results of time distortion.",
    "statFocus": "CON",
    "startingLoot": [
      "Divider Unit: When changing forms, you can also separate in half; both halves move and act, but your turn still only has 1 main ACTION.",
      "Pocket Door: When you move, choose to create a tiny wormhole; other creatures can use this doorway to make your same move for 1 ROUND.",
      "Relay Ray: Any time you use a starting ABILITY, gain 1D8 ENERGY stored."
    ],
    "abilities": [
      "Changer",
      "Blip",
      "Energy Star"
    ]
  },
  {
    "name": "Tracker",
    "world": "ghostmountain",
    "desc": "Keen-eyed masters of the wild and the hunt.",
    "statFocus": "WIS",
    "startingLoot": [
      "Carbine Rifle",
      "Longbow",
      "Trapper Gear",
      "Supplies",
      "Bush Blanket or Crystal Scope"
    ],
    "abilities": [
      "Shady Brady: all TRACKING attempts and checks are EASY"
    ]
  },
  {
    "name": "Wraith",
    "world": "ghostmountain",
    "desc": "Smoke-and-brimstone devils you can talk to, wielders of infernal magic.",
    "statFocus": "INT",
    "startingLoot": [
      "Fire Stone",
      "Bowie Knife",
      "Spell Book",
      "Pouch of 50 Coin",
      "Demon Glyph"
    ],
    "abilities": [
      "Demon Glyph: turn immaterial at will",
      "Cast INFERNAL (INT) spells"
    ]
  },
  {
    "name": "Brave",
    "world": "ghostmountain",
    "desc": "Fierce Hepawa warriors and the deadliest knife-fighters on the mountain.",
    "statFocus": "DEX",
    "startingLoot": [
      "Bowie Knife (2)",
      "Carbine Rifle",
      "Weapon Kit",
      "Trapper Gear",
      "Ammo Pouch"
    ],
    "abilities": [
      "Great Eagle Feather: knife attacks of 15+ earn another attack and a NEAR move"
    ]
  },
  {
    "name": "Gambler",
    "world": "ghostmountain",
    "desc": "Shrewd, lonely card-sharps with the Devil in their eyes.",
    "statFocus": "CHA",
    "startingLoot": [
      "Pouch of 50 Coin (2)",
      "Six Shooter (2)",
      "Supplies",
      "Armor Kit",
      "Devil's Deck, Bad Bet, or Lucky"
    ],
    "abilities": [
      "Lucky: replace any ATTEMPT or CHECK with a DRAW; high card wins, an ACE is a critical success"
    ]
  },
  {
    "name": "Shaman",
    "world": "ghostmountain",
    "desc": "Healers who draw power from the stones rather than holy or infernal spirits.",
    "statFocus": "WIS",
    "startingLoot": [
      "Meditation Beads",
      "Small Pet",
      "Walking Stick",
      "Supplies",
      "Dream Catcher"
    ],
    "abilities": [
      "Dream Catcher: speak with or use CHA to persuade animals and natural forces",
      "Cast WIS spells"
    ]
  },
  {
    "name": "Mariachi",
    "world": "ghostmountain",
    "desc": "Musicians who carry hope; a lucky posse always has one around.",
    "statFocus": "CHA",
    "startingLoot": [
      "Instrument (rare or unique)",
      "Bowie Knife",
      "Six-shooter",
      "Weapon Kit",
      "Embroidered Sombrero, Gun Case, or Cookin' Spit"
    ],
    "abilities": [
      "Perform Sheet Music (e.g. Red Rodeo, Pistolero!) to buff or command those who hear"
    ]
  },
  {
    "name": "Gunslinger",
    "world": "ghostmountain",
    "desc": "Anyone can carry a six-shooter, but a Gunslinger makes an art of the gun.",
    "statFocus": "DEX",
    "startingLoot": [
      "Weapons Kit",
      "Six Shooter (2)",
      "Ammo Pouch",
      "Wool Poncho",
      "Masterwork Revolver"
    ],
    "abilities": [
      "Masterwork Revolver: on a hit, roll 1D6 and fire that many bullets at that many targets"
    ]
  },
  {
    "name": "Old Timer",
    "world": "ghostmountain",
    "desc": "Rare survivors of old age who keep the mountain's secrets and channel holy power.",
    "statFocus": "WIS",
    "startingLoot": [
      "Heavy Jacket (+1 ARMOR)",
      "Six Shooter",
      "Oak Cross",
      "Medical Case",
      "Hallowed Book"
    ],
    "abilities": [
      "Hallowed Book: create and cast HOLY (WIS) spells",
      "Begin with two HOLY spells"
    ]
  }
];
if (typeof window !== "undefined") window.ICRPG_TYPES = ICRPG_TYPES;
