// GENERATED FILE - do not edit by hand.
// Source: data/ace/parts/*.json - regenerate with: node scripts/build-ace-data.mjs

import type { AceExtra } from "./ace-types";

export const ACE_EXTRAS: AceExtra[] = [
  {
    "name": "Mook",
    "setting": "core",
    "type": "Mook",
    "smarts": 2,
    "moves": 2,
    "style": 2,
    "brawn": 2,
    "focuses": [],
    "health": 1,
    "defence": 8,
    "attacks": [
      {
        "name": "Brawling",
        "dice": 2,
        "damage": 1
      }
    ],
    "notes": [
      "Add any Focus in one Stat (rolls four dice when using it).",
      "Always has only 1 Health."
    ],
    "description": "Represents most civilians, workers, and peasants — fantasy, modern and sci-fi — who don't have a starring role (or often even a name) in your adventure.",
    "page": 28
  },
  {
    "name": "Assassin",
    "setting": "core",
    "type": "Person",
    "smarts": 3,
    "moves": 5,
    "style": 2,
    "brawn": 2,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Stealth"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 2,
    "defence": 16,
    "attacks": [
      {
        "name": "Knife",
        "dice": 4,
        "damage": 2,
        "note": "double on first strike"
      }
    ],
    "notes": [],
    "page": 29
  },
  {
    "name": "Barbarian",
    "setting": "core",
    "type": "Person",
    "smarts": 2,
    "moves": 4,
    "style": 2,
    "brawn": 4,
    "focuses": [
      {
        "stat": "Smarts",
        "name": "Nature"
      },
      {
        "stat": "Moves",
        "name": "Running"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 4,
    "defence": 12,
    "attacks": [
      {
        "name": "Battle-axe",
        "dice": 7,
        "damage": 3
      }
    ],
    "notes": [],
    "page": 29
  },
  {
    "name": "Bear",
    "setting": "core",
    "type": "Animal",
    "smarts": 1,
    "moves": 1,
    "style": 2,
    "brawn": 8,
    "focuses": [],
    "health": 8,
    "defence": 8,
    "attacks": [
      {
        "name": "Claws",
        "dice": 8,
        "damage": 2
      }
    ],
    "notes": [],
    "page": 29
  },
  {
    "name": "Blaster Turret",
    "setting": "core",
    "type": "Robot",
    "smarts": 1,
    "moves": 1,
    "style": 1,
    "brawn": 8,
    "focuses": [],
    "health": 2,
    "defence": 8,
    "attacks": [
      {
        "name": "Guns",
        "dice": 3,
        "damage": 2
      }
    ],
    "notes": [],
    "page": 29
  },
  {
    "name": "Carnivorous Plant",
    "setting": "core",
    "type": "Monster",
    "smarts": 1,
    "moves": 2,
    "style": 1,
    "brawn": 6,
    "focuses": [
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 6,
    "defence": 8,
    "attacks": [
      {
        "name": "Lashing vines",
        "dice": 8,
        "damage": 2,
        "note": "15-foot range, grabs target requiring a melee attack to escape"
      }
    ],
    "notes": [],
    "page": 29
  },
  {
    "name": "Cop",
    "setting": "core",
    "type": "Person",
    "smarts": 3,
    "moves": 3,
    "style": 2,
    "brawn": 3,
    "focuses": [
      {
        "stat": "Smarts",
        "name": "Perception"
      },
      {
        "stat": "Moves",
        "name": "Shooting"
      }
    ],
    "health": 3,
    "defence": 8,
    "attacks": [
      {
        "name": "Brawling",
        "dice": 3,
        "damage": 1
      },
      {
        "name": "Pistol",
        "dice": 5,
        "damage": 2
      }
    ],
    "notes": [],
    "page": 29
  },
  {
    "name": "Dark Lord",
    "setting": "core",
    "type": "Villain",
    "smarts": 5,
    "moves": 6,
    "style": 6,
    "brawn": 5,
    "power": 6,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Acrobatics"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      },
      {
        "stat": "Power",
        "name": "Telekinesis"
      }
    ],
    "health": 5,
    "defence": 18,
    "attacks": [
      {
        "name": "Laser sword",
        "dice": 7,
        "damage": 3
      },
      {
        "name": "Psychic choke",
        "dice": 8,
        "damage": 1,
        "note": "30-foot range"
      }
    ],
    "notes": [],
    "page": 30
  },
  {
    "name": "Dragon",
    "setting": "core",
    "type": "Monster",
    "smarts": 6,
    "moves": 3,
    "style": 6,
    "brawn": 12,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Flying"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 24,
    "defence": 9,
    "attacks": [
      {
        "name": "Bite",
        "dice": 14,
        "damage": 3
      },
      {
        "name": "Fire breath",
        "dice": 4,
        "damage": 2,
        "note": "to a 30 foot cone"
      }
    ],
    "notes": [],
    "page": 30
  },
  {
    "name": "Firemage",
    "setting": "core",
    "type": "Villain",
    "smarts": 6,
    "moves": 2,
    "style": 4,
    "brawn": 2,
    "power": 5,
    "focuses": [
      {
        "stat": "Power",
        "name": "Fire",
        "dice": 7
      }
    ],
    "health": 2,
    "defence": 8,
    "attacks": [
      {
        "name": "Firebolt",
        "dice": 7,
        "damage": 1,
        "note": "30' range"
      }
    ],
    "notes": [],
    "page": 30
  },
  {
    "name": "Ghostly Shrieker",
    "setting": "core",
    "type": "Ghost",
    "smarts": 2,
    "moves": 4,
    "style": 3,
    "brawn": null,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Flying"
      }
    ],
    "health": 3,
    "defence": 12,
    "attacks": [
      {
        "name": "Shriek",
        "dice": 3,
        "damage": 1,
        "note": "to all within 30 feet"
      }
    ],
    "notes": [
      "Incorporeal."
    ],
    "page": 30
  },
  {
    "name": "Giant Spider",
    "setting": "core",
    "type": "Monster",
    "smarts": 1,
    "moves": 6,
    "style": 1,
    "brawn": 5,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Webs"
      }
    ],
    "health": 5,
    "defence": 18,
    "attacks": [
      {
        "name": "Poison bite",
        "dice": 5,
        "damage": 2,
        "note": "makes target Sick"
      },
      {
        "name": "Sticky Web",
        "dice": 8,
        "damage": 0,
        "note": "30-foot range, restrains target, needs Brawn 10 check to escape"
      }
    ],
    "notes": [],
    "page": 30
  },
  {
    "name": "Goblin",
    "setting": "core",
    "type": "Monster",
    "smarts": 1,
    "moves": 5,
    "style": 1,
    "brawn": 1,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Thievery"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 1,
    "defence": 15,
    "attacks": [
      {
        "name": "Knife",
        "dice": 3,
        "damage": 2
      }
    ],
    "notes": [],
    "page": 31
  },
  {
    "name": "Hunter-Killer Cyborg",
    "setting": "core",
    "type": "Robot",
    "smarts": 4,
    "moves": 4,
    "style": 2,
    "brawn": 6,
    "focuses": [
      {
        "stat": "Smarts",
        "name": "Tracking"
      },
      {
        "stat": "Moves",
        "name": "Shooting"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 6,
    "defence": 12,
    "attacks": [
      {
        "name": "Brawling",
        "dice": 8,
        "damage": 2
      },
      {
        "name": "Uzi",
        "dice": 6,
        "damage": 3
      }
    ],
    "notes": [],
    "page": 31
  },
  {
    "name": "Necromancer",
    "setting": "core",
    "type": "Villain",
    "smarts": 6,
    "moves": 2,
    "style": 4,
    "brawn": 2,
    "power": 5,
    "focuses": [
      {
        "stat": "Power",
        "name": "Necromancy",
        "dice": 7
      }
    ],
    "health": 2,
    "defence": 8,
    "attacks": [
      {
        "name": "Chilling grasp",
        "dice": 2,
        "damage": 2
      }
    ],
    "notes": [
      "Use an action to summon one zombie within 30 feet. Can have up to three zombies at one time."
    ],
    "page": 31
  },
  {
    "name": "Ninja",
    "setting": "core",
    "type": "Person",
    "smarts": 2,
    "moves": 6,
    "style": 2,
    "brawn": 3,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Climbing"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 3,
    "defence": 18,
    "attacks": [
      {
        "name": "Sword",
        "dice": 5,
        "damage": 2
      }
    ],
    "notes": [
      "Turn invisible for up to one minute."
    ],
    "page": 31
  },
  {
    "name": "Orc",
    "setting": "core",
    "type": "Monster",
    "smarts": 2,
    "moves": 2,
    "style": 2,
    "brawn": 5,
    "focuses": [
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 5,
    "defence": 8,
    "attacks": [
      {
        "name": "Spiked club",
        "dice": 7,
        "damage": 2
      }
    ],
    "notes": [],
    "page": 31
  },
  {
    "name": "Soldier",
    "setting": "core",
    "type": "Person",
    "smarts": 2,
    "moves": 5,
    "style": 2,
    "brawn": 3,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Shooting"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 3,
    "defence": 9,
    "attacks": [
      {
        "name": "Brawling",
        "dice": 5,
        "damage": 2
      },
      {
        "name": "Rifle",
        "dice": 7,
        "damage": 3
      }
    ],
    "notes": [],
    "page": 31
  },
  {
    "name": "Troll",
    "setting": "core",
    "type": "Monster",
    "smarts": 1,
    "moves": 3,
    "style": 1,
    "brawn": 7,
    "power": 5,
    "focuses": [
      {
        "stat": "Power",
        "name": "Fire",
        "dice": 7
      }
    ],
    "health": 7,
    "defence": 9,
    "attacks": [
      {
        "name": "Brawling",
        "dice": 7,
        "damage": 2
      }
    ],
    "notes": [
      "Regenerate 1 Health each round.",
      "Killed by sunlight."
    ],
    "page": 32
  },
  {
    "name": "Tyrannosaur",
    "setting": "core",
    "type": "Monster",
    "smarts": 1,
    "moves": 1,
    "style": 2,
    "brawn": 10,
    "focuses": [
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 20,
    "defence": 8,
    "attacks": [
      {
        "name": "Bite",
        "dice": 12,
        "damage": 4
      }
    ],
    "notes": [],
    "page": 32
  },
  {
    "name": "Vampire",
    "setting": "core",
    "type": "Undead",
    "smarts": 6,
    "moves": 8,
    "style": 6,
    "brawn": 8,
    "focuses": [
      {
        "stat": "Style",
        "name": "Seduction"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 8,
    "defence": 24,
    "attacks": [
      {
        "name": "Bite",
        "dice": 10,
        "damage": 2,
        "note": "recover 1 Health"
      }
    ],
    "notes": [
      "Killed by sunlight.",
      "Can turn into a bat or a wolf."
    ],
    "page": 32
  },
  {
    "name": "Wolf",
    "setting": "core",
    "type": "Animal",
    "smarts": 1,
    "moves": 6,
    "style": 2,
    "brawn": 3,
    "focuses": [
      {
        "stat": "Smarts",
        "name": "Tracking"
      }
    ],
    "health": 3,
    "defence": 18,
    "attacks": [
      {
        "name": "Bite",
        "dice": 3,
        "damage": 1
      }
    ],
    "notes": [
      "When attacking in a group of 4 or more wolves, each gains +1 die to attacks."
    ],
    "page": 32
  },
  {
    "name": "Zombie",
    "setting": "core",
    "type": "Undead",
    "smarts": 1,
    "moves": 1,
    "style": 1,
    "brawn": 2,
    "focuses": [],
    "health": 2,
    "defence": 8,
    "attacks": [
      {
        "name": "Bite",
        "dice": 2,
        "damage": 1
      }
    ],
    "notes": [
      "Victim becomes a zombie if reduced to 0 Health."
    ],
    "page": 32
  },
  {
    "name": "Demonkin",
    "setting": "spirits",
    "type": "Monster",
    "smarts": 2,
    "moves": 3,
    "style": 2,
    "brawn": 3,
    "power": 3,
    "focuses": [],
    "health": 3,
    "defence": 9,
    "attacks": [
      {
        "name": "Claws",
        "dice": 3,
        "damage": 1
      }
    ],
    "notes": [
      "Demonkin possess the qualities noted in 'Demonic Properties'."
    ],
    "description": "Minor demonic minions and servants.",
    "page": 45
  },
  {
    "name": "Firemage",
    "setting": "spirits",
    "type": "Villain",
    "smarts": 6,
    "moves": 2,
    "style": 4,
    "brawn": 2,
    "power": 5,
    "focuses": [
      {
        "stat": "Power",
        "name": "Fire",
        "dice": 7
      }
    ],
    "health": 2,
    "defence": 8,
    "attacks": [
      {
        "name": "Firebolt",
        "dice": 7,
        "damage": 1,
        "note": "30' range"
      }
    ],
    "notes": [],
    "description": "Flame throwing sorcerers!",
    "page": 45
  },
  {
    "name": "Ghostly Creep",
    "setting": "spirits",
    "type": "Ghost",
    "smarts": 2,
    "moves": 4,
    "style": 2,
    "brawn": 0,
    "power": 3,
    "focuses": [],
    "health": 3,
    "defence": 12,
    "attacks": [
      {
        "name": "Sudden lurch",
        "dice": null,
        "damage": 1
      }
    ],
    "notes": [
      "The Ghostly Creep can turn invisible at-will.",
      "Possesses the qualities noted in 'Ghostly Properties'."
    ],
    "description": "Sneaky ghost which likes to haunt people.",
    "page": 45
  },
  {
    "name": "Gozarr the Devourer",
    "setting": "spirits",
    "type": "Villain",
    "smarts": 8,
    "moves": 3,
    "style": 6,
    "brawn": 10,
    "power": 10,
    "focuses": [],
    "health": 10,
    "defence": 9,
    "attacks": [
      {
        "name": "Claws & tail",
        "dice": null,
        "damage": 3
      }
    ],
    "notes": [
      "Gozarr possesses the qualities noted in 'Demonic Properties'.",
      "Roar as a Power attack vs Style; causes those affected to run away.",
      "Quake is a Power attack vs. Moves to all nearby; 1 damage and knocked down."
    ],
    "description": "Immensely powerful godlike demon from another dimension.",
    "page": 46
  },
  {
    "name": "Grim Reaper",
    "setting": "spirits",
    "type": "Ghost",
    "smarts": 5,
    "moves": 5,
    "style": 6,
    "brawn": 0,
    "power": 6,
    "focuses": [],
    "health": 6,
    "defence": 15,
    "attacks": [
      {
        "name": "Spectral scythe",
        "dice": null,
        "damage": 3
      }
    ],
    "notes": [
      "The Grim Reaper possesses the qualities noted in 'Ghostly Properties'.",
      "When the Grim Reaper reduces a target to 0 Health, it dies instantly. Scary!"
    ],
    "description": "A dark hooded figure with a wicked scythe.",
    "page": 46
  },
  {
    "name": "Napolitano Brothers",
    "setting": "spirits",
    "type": "Ghost",
    "smarts": 2,
    "moves": 5,
    "style": 3,
    "brawn": 0,
    "power": 4,
    "focuses": [],
    "health": 4,
    "defence": 15,
    "attacks": [
      {
        "name": "Electric blast",
        "dice": null,
        "damage": 1
      }
    ],
    "notes": [
      "The Napolitano Brothers possess the qualities noted in 'Ghostly Properties'."
    ],
    "description": "A pair of floating ghosts strapped into electric chairs.",
    "page": 46
  },
  {
    "name": "Phantasmal Drake",
    "setting": "spirits",
    "type": "Ghost",
    "smarts": 1,
    "moves": 6,
    "style": 2,
    "brawn": 0,
    "power": 8,
    "focuses": [],
    "health": 8,
    "defence": 18,
    "attacks": [
      {
        "name": "Claw",
        "dice": null,
        "damage": 2
      }
    ],
    "notes": [
      "The Phantasmal Drake possesses the qualities noted in 'Ghostly Properties'."
    ],
    "description": "A large phantasmal dragon.",
    "page": 46
  },
  {
    "name": "Phantasmal Horror",
    "setting": "spirits",
    "type": "Ghost",
    "smarts": 2,
    "moves": 2,
    "style": 3,
    "brawn": 0,
    "power": 5,
    "focuses": [],
    "health": 5,
    "defence": 8,
    "attacks": [
      {
        "name": "Manifest",
        "dice": 5,
        "damage": null,
        "note": "victim must run away"
      }
    ],
    "notes": [
      "The Phantasmal Horror possesses the qualities noted in 'Ghostly Properties'."
    ],
    "description": "A placid looking ghost which suddenly reveals its horrific nature.",
    "page": 46
  },
  {
    "name": "Shrieker",
    "setting": "spirits",
    "type": "Ghost",
    "smarts": 2,
    "moves": 3,
    "style": 3,
    "brawn": 0,
    "power": 4,
    "focuses": [],
    "health": 4,
    "defence": 9,
    "attacks": [
      {
        "name": "Shriek",
        "dice": null,
        "damage": 1,
        "note": "1 damage to everybody nearby"
      }
    ],
    "notes": [
      "Shriekers possess the qualities noted in 'Ghostly Properties'."
    ],
    "description": "A nasty little spirit with a big voice.",
    "page": 47
  },
  {
    "name": "Slime Bucket",
    "setting": "spirits",
    "type": "Ghost",
    "smarts": 1,
    "moves": 6,
    "style": 1,
    "brawn": 0,
    "power": 3,
    "focuses": [],
    "health": 4,
    "defence": 18,
    "attacks": [
      {
        "name": "Slimer",
        "dice": null,
        "damage": 1,
        "note": "victim is immobilized for 1 minute"
      }
    ],
    "notes": [
      "The Slime Bucket possesses the qualities noted in 'Ghostly Properties'."
    ],
    "description": "A nasty little spirit with a big voice (as printed).",
    "page": 47
  },
  {
    "name": "Terror Dog",
    "setting": "spirits",
    "type": "Monster",
    "smarts": 1,
    "moves": 4,
    "style": 3,
    "brawn": 6,
    "power": 4,
    "focuses": [],
    "health": 6,
    "defence": 12,
    "attacks": [
      {
        "name": "Fire breath",
        "dice": null,
        "damage": 2
      }
    ],
    "notes": [
      "Terror Dogs possess the qualities noted in 'Demonic Properties'."
    ],
    "description": "Demonic hellhounds which serve evil powers.",
    "page": 47
  },
  {
    "name": "Trickster Spirit",
    "setting": "spirits",
    "type": "Ghost",
    "smarts": 6,
    "moves": 5,
    "style": 6,
    "brawn": 0,
    "power": 6,
    "focuses": [],
    "health": 6,
    "defence": 15,
    "attacks": [
      {
        "name": "Telekinesis",
        "dice": null,
        "damage": 1
      }
    ],
    "notes": [
      "Tricksters possess the qualities noted in 'Ghostly Properties'.",
      "Tricksters can teleport to a location they can see nearby.",
      "Tricksters can make Power vs. Style checks to make a target charmed or angry."
    ],
    "description": "Cunning and manipulative ghosts.",
    "page": 47
  },
  {
    "name": "Emeline Holt",
    "setting": "spirits",
    "type": "Ghost",
    "smarts": 2,
    "moves": 3,
    "style": 3,
    "brawn": 0,
    "power": 4,
    "focuses": [],
    "health": 4,
    "defence": 9,
    "attacks": [
      {
        "name": "Shriek",
        "dice": null,
        "damage": 1,
        "note": "1 damage to everybody nearby; her scream can shatter glass"
      }
    ],
    "notes": [
      "Uses the stats of a Shrieker.",
      "Possesses the qualities noted in 'Ghostly Properties'.",
      "Harmless once trapped; a one-in-a-million glitch leaves her semi-corporeal and she offers to be the Ghostbreakers' receptionist."
    ],
    "description": "The ghost of a woman in 19th-century clothing haunting St. Peter's Chapel, still pining for her Edward who died over 200 years ago.",
    "page": 51
  },
  {
    "name": "Magoozer",
    "setting": "spirits",
    "type": "Ghost",
    "smarts": 2,
    "moves": 2,
    "style": 3,
    "brawn": 0,
    "power": 5,
    "focuses": [],
    "health": 5,
    "defence": 8,
    "attacks": [
      {
        "name": "Manifest",
        "dice": 5,
        "damage": null,
        "note": "victim must run away"
      }
    ],
    "notes": [
      "Uses the stats of a Phantasmal Horror.",
      "Possesses the qualities noted in 'Ghostly Properties'.",
      "Not violent unless disturbed: first a 'Shuuush', then red glowing eyes and a snarl, third time it transforms into a giant tentacle-faced nasty hurling books and ectoplasm.",
      "A minion of Gozarr that lies constantly; in the finale it may already be injured at the Director's option."
    ],
    "description": "Looks like a wizened old man about three feet tall with ridiculously oversized spectacles, shuffling through the library stacks in search of Zephron's Guide.",
    "page": 56
  },
  {
    "name": "Will Mapleton",
    "setting": "spirits",
    "type": "Ghost",
    "smarts": 2,
    "moves": 4,
    "style": 2,
    "brawn": 0,
    "power": 3,
    "focuses": [],
    "health": 3,
    "defence": 12,
    "attacks": [
      {
        "name": "Sudden lurch",
        "dice": null,
        "damage": 1
      },
      {
        "name": "Flashbulb",
        "dice": 5,
        "damage": null,
        "note": "no damage; victim is blinded for one minute"
      }
    ],
    "notes": [
      "Has the stats of a Ghostly Creep, but instead of its invisibility ability it has a Flashbulb attack.",
      "Possesses the qualities noted in 'Ghostly Properties'.",
      "Flees through walls and sinks through floors when attacked."
    ],
    "description": "The ghost of a sleazy tabloid photographer who fell from the 14th floor of the Glitzman Hotel; only appears when romance is in the offing.",
    "page": 62
  },
  {
    "name": "Stella Henderson",
    "setting": "spirits",
    "type": "Ghost",
    "smarts": 6,
    "moves": 5,
    "style": 6,
    "brawn": 0,
    "power": 6,
    "focuses": [],
    "health": 6,
    "defence": 15,
    "attacks": [
      {
        "name": "Telekinesis",
        "dice": null,
        "damage": 1,
        "note": "throws Heroes about, coils firehoses like snakes, fires jets of high pressure water"
      }
    ],
    "notes": [
      "Uses the stats of a Trickster Spirit.",
      "Possesses the qualities noted in 'Ghostly Properties'.",
      "Can teleport to a location she can see nearby; can make Power vs. Style checks to make a target charmed or angry.",
      "Will not attack unless the firefighters are put at risk, and will never try to kill the Ghostbreakers."
    ],
    "description": "Ghost of the chief of Engine 30 Fire Station, lost in a 1982 auto-shop blaze; now keeps her crew locked inside 'for their own safety'.",
    "page": 63
  },
  {
    "name": "Jess Hardacre",
    "setting": "spirits",
    "type": "Ghost",
    "smarts": 2,
    "moves": 3,
    "style": 3,
    "brawn": 0,
    "power": 4,
    "focuses": [],
    "health": 4,
    "defence": 9,
    "attacks": [
      {
        "name": "Shriek",
        "dice": null,
        "damage": 1,
        "note": "sonic attack; 1 damage to everybody nearby"
      },
      {
        "name": "Drumsticks",
        "dice": null,
        "damage": 1
      }
    ],
    "notes": [
      "Uses the stats of a Shrieker.",
      "Possesses the qualities noted in 'Ghostly Properties'.",
      "Not really a danger to the Heroes; a simple bag and tag."
    ],
    "description": "A drummer who exploded trying out pyrotechnics on his kit, now performing epic ten-minute drum solos over other bands at Heebie-Jeebies.",
    "page": 65
  },
  {
    "name": "Spectral Taxi",
    "setting": "spirits",
    "type": "Vehicle",
    "smarts": null,
    "moves": null,
    "style": null,
    "brawn": null,
    "power": null,
    "focuses": [],
    "health": 8,
    "defence": 15,
    "attacks": [],
    "notes": [
      "The cab is part of the ghostly apparition; the driver must make Moves checks to dodge obstacles and close the gap before passengers can open fire.",
      "At zero Health it crumbles to pieces, leaving the dazed cabbie Elroy McHale in the street ready to be captured.",
      "Passes through traffic as a ghost would through walls; appears at 11:57pm speeding the length of Broadway."
    ],
    "description": "A yellow cab glowing with spectral light, careening through traffic at high speed with its ghostly driver at the wheel.",
    "page": 71
  },
  {
    "name": "Elroy McHale",
    "setting": "spirits",
    "type": "Ghost",
    "smarts": 2,
    "moves": 2,
    "style": 3,
    "brawn": 0,
    "power": 5,
    "focuses": [],
    "health": 5,
    "defence": 8,
    "attacks": [
      {
        "name": "Manifest",
        "dice": 5,
        "damage": null,
        "note": "victim must run away"
      }
    ],
    "notes": [
      "Uses the stats of a Phantasmal Horror.",
      "Possesses the qualities noted in 'Ghostly Properties'.",
      "Only catchable after his Spectral Taxi has been blasted to pieces."
    ],
    "description": "Ghostly cabbie who crashed and died speeding to a pick-up and is still determined to get his passengers there on time.",
    "page": 71
  },
  {
    "name": "Patzarr (Patrick Dickens possessed by Gozarr)",
    "setting": "spirits",
    "type": "Villain",
    "smarts": 6,
    "moves": 2,
    "style": 4,
    "brawn": 2,
    "power": 5,
    "focuses": [
      {
        "stat": "Power",
        "name": "Fire",
        "dice": 7
      }
    ],
    "health": 2,
    "defence": 8,
    "attacks": [
      {
        "name": "Firebolt",
        "dice": 7,
        "damage": 1,
        "note": "30' range; blasts of green fire from his hands"
      }
    ],
    "notes": [
      "Uses the stats of a Firemage - only a fragment of Gozarr possesses him.",
      "When weakening he can shoot fireballs at the three possessed hosts to sever their ties.",
      "A few blasts take him down; an exorcism (holy water and a couple of bible passages) then removes Gozarr's presence."
    ],
    "description": "Nerdy business student Patrick Dickens as the living receptacle for Gozarr the Devourer, hair standing on end and suit glowing with energy.",
    "page": 74
  },
  {
    "name": "Callor The Keeper",
    "setting": "spirits",
    "type": "Ghost",
    "smarts": 2,
    "moves": 2,
    "style": 3,
    "brawn": 0,
    "power": 5,
    "focuses": [],
    "health": 5,
    "defence": 8,
    "attacks": [
      {
        "name": "Manifest",
        "dice": 5,
        "damage": null,
        "note": "victim must run away"
      }
    ],
    "notes": [
      "Uses the stats of a Phantasmal Horror once freed from inhabiting Gillian Templemere.",
      "Possesses the qualities noted in 'Ghostly Properties'."
    ],
    "description": "Guardian of the portal, an ever vigilant sentry from the Nether that took up residence in the head librarian.",
    "page": 74
  },
  {
    "name": "Liril The Purifier",
    "setting": "spirits",
    "type": "Ghost",
    "smarts": 6,
    "moves": 5,
    "style": 6,
    "brawn": 0,
    "power": 6,
    "focuses": [],
    "health": 6,
    "defence": 15,
    "attacks": [
      {
        "name": "Telekinesis",
        "dice": null,
        "damage": 1
      }
    ],
    "notes": [
      "Uses the stats of a Trickster Spirit once freed from inhabiting Emily Waterhouse.",
      "Possesses the qualities noted in 'Ghostly Properties'.",
      "Can teleport to a location it can see nearby; Power vs. Style checks to make a target charmed or angry."
    ],
    "description": "A violent and vengeful entity that thrives off the destruction of those unworthy to serve or feed Gozarr the Devourer.",
    "page": 74
  },
  {
    "name": "Unthag The Servant",
    "setting": "spirits",
    "type": "Ghost",
    "smarts": 2,
    "moves": 3,
    "style": 3,
    "brawn": 0,
    "power": 4,
    "focuses": [],
    "health": 4,
    "defence": 9,
    "attacks": [
      {
        "name": "Shriek",
        "dice": null,
        "damage": 1,
        "note": "1 damage to everybody nearby"
      }
    ],
    "notes": [
      "Uses the stats of a Shrieker once freed from inhabiting Dean Richard Anderson.",
      "Possesses the qualities noted in 'Ghostly Properties'."
    ],
    "description": "Gozarr's second in command and weasley little suck-up, who lives to bring his master through to our realm.",
    "page": 74
  },
  {
    "name": "Giant Gozarr Manifestation",
    "setting": "spirits",
    "type": "Villain",
    "smarts": 8,
    "moves": 3,
    "style": 6,
    "brawn": 10,
    "power": 10,
    "focuses": [],
    "health": 10,
    "defence": 9,
    "attacks": [
      {
        "name": "Claws & tail",
        "dice": null,
        "damage": 3
      }
    ],
    "notes": [
      "Stats are identical to Gozarr the Devourer whatever form it takes; only the appearance differs.",
      "Roar as a Power attack vs Style (those affected run away); Quake is a Power attack vs. Moves to all nearby, 1 damage and knocked down.",
      "The Ghostbreakers will not stand a chance in a stand-up fight. The only way to defeat it is to reverse the portal: flick the switch on the particle throwers to fire pure antimatter and make a normal roll to hit the portal, creating a miniature black hole."
    ],
    "description": "Gozarr manifests as a 100ft tall version of whatever the Heroes think of (Edgar Allan Poe by default), striding through the city towards the library.",
    "page": 76
  },
  {
    "name": "Desert Nomad",
    "setting": "montana",
    "type": "Mook",
    "smarts": 2,
    "moves": 2,
    "style": 2,
    "brawn": 2,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Shooting"
      }
    ],
    "health": 1,
    "defence": 8,
    "attacks": [
      {
        "name": "Brawling",
        "dice": 2,
        "damage": 1
      },
      {
        "name": "Rifle",
        "dice": 4,
        "damage": 3
      }
    ],
    "notes": [
      "Thirty or more surround the Heroes at Petra; if the Heroes fight, every Hero suffers 3 damage each round until everyone is unconscious."
    ],
    "description": "Mubtasim desert nomads of Petra, guardians of the Soldier Tomb, armed with bows and rifles and led by Eric Freeman.",
    "page": 90
  },
  {
    "name": "Eric Freeman",
    "setting": "montana",
    "type": "Villain",
    "smarts": 6,
    "moves": 3,
    "style": 6,
    "brawn": 2,
    "focuses": [
      {
        "stat": "Smarts",
        "name": "Occultism"
      },
      {
        "stat": "Style",
        "name": "Persuasion"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 2,
    "defence": 9,
    "attacks": [
      {
        "name": "Brawling",
        "dice": 4,
        "damage": 1
      },
      {
        "name": "Fencing Sabre",
        "dice": 4,
        "damage": 2
      }
    ],
    "notes": [
      "Eric gains +2 to his Defence when he's wearing the corselet of Mégês.",
      "Eric can use the witch's Evil Eye power when he's wearing the Cutty-sark (see p. 20).",
      "Eric's Power score is 3 when wearing the Cutty-sark."
    ],
    "description": "Eccentric tomb raider and unrepentant rival in artefact hunting; fellow former student of history at Oxford University with a smugly superior attitude. Slipperier than an eel.",
    "page": 90
  },
  {
    "name": "Giant Frog",
    "setting": "montana",
    "type": "Monster",
    "smarts": 1,
    "moves": 2,
    "style": 1,
    "brawn": 5,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Jumping"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 5,
    "defence": 8,
    "attacks": [
      {
        "name": "Sticky Tongue",
        "dice": 7,
        "damage": 0,
        "note": "15-foot range, restrains target and pulls them to the frog, needs Brawn 10 check to escape"
      },
      {
        "name": "Bite",
        "dice": 7,
        "damage": 2,
        "note": "only on targets caught by its sticky tongue"
      }
    ],
    "notes": [],
    "description": "A frog the size of a rhinoceros, its vocal sac expanding and contracting rhythmically before its ginormous tongue flicks out.",
    "page": 92
  },
  {
    "name": "Vinetacles",
    "setting": "montana",
    "type": "Monster",
    "smarts": 1,
    "moves": 2,
    "style": 1,
    "brawn": 4,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Dodging"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 4,
    "defence": 8,
    "attacks": [
      {
        "name": "Lash",
        "dice": 6,
        "damage": 2,
        "note": "20-foot range, needs Brawn 20 check to escape"
      }
    ],
    "notes": [
      "Once reduced to zero Health, a vinetacle gently slithers to the ground and releases its hold.",
      "Vinetacles don't squeeze further once they have a victim; they lift the target and hold them aloft, waiting.",
      "Fire axes reduce the Defence of each vinetacle by 2."
    ],
    "description": "Vines that have become tentacles, pulsating and gyrating like the limbs of some giant amorphous beast, gripping Halcyon Hall.",
    "page": 93
  },
  {
    "name": "Kufooloo",
    "setting": "montana",
    "type": "Monster",
    "smarts": 3,
    "moves": 4,
    "style": 3,
    "brawn": 6,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Acrobatics"
      },
      {
        "stat": "Brawn",
        "name": "Tough"
      }
    ],
    "health": 8,
    "defence": 12,
    "attacks": [
      {
        "name": "Claw",
        "dice": 6,
        "damage": 2
      }
    ],
    "notes": [
      "Award the Heroes a Karma point once the creature is defeated.",
      "The vinetacles throughout the school turn to mush as soon as the creature dies."
    ],
    "description": "A half-formed creature: eight stunted tentacles propel a stocky torso with half-formed wings jutting from its back, and a broad rubbery head with tentacles growing from its jawline.",
    "page": 95
  },
  {
    "name": "Nazi Agent",
    "setting": "montana",
    "type": "Mook",
    "smarts": 3,
    "moves": 4,
    "style": 2,
    "brawn": 3,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Shooting"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 3,
    "defence": 12,
    "attacks": [
      {
        "name": "Brawling",
        "dice": 5,
        "damage": 1
      },
      {
        "name": "Luger",
        "dice": 6,
        "damage": 3
      }
    ],
    "notes": [],
    "description": "Enemy agents of Operation: Scymitar, brought in by Eric Freeman to help recover the Cutty-Sark.",
    "page": 100
  },
  {
    "name": "Hell Hound",
    "setting": "montana",
    "type": "Monster",
    "smarts": 2,
    "moves": 3,
    "style": 1,
    "brawn": 5,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Shooting"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 7,
    "defence": 9,
    "attacks": [
      {
        "name": "Bite",
        "dice": 7,
        "damage": 1
      },
      {
        "name": "Fiery Breath",
        "dice": 5,
        "damage": 2,
        "note": "15' range"
      }
    ],
    "notes": [
      "A 'friend' called in by the witches Blair and Coira; ravages any it can get its jowls on and slinks away into the darkness once the enemy agents are dealt with."
    ],
    "page": 100
  },
  {
    "name": "Witch",
    "setting": "montana",
    "type": "Person",
    "smarts": 6,
    "moves": 2,
    "style": 4,
    "brawn": 5,
    "focuses": [
      {
        "stat": "Smarts",
        "name": "Occultism"
      }
    ],
    "health": 2,
    "defence": 8,
    "attacks": [
      {
        "name": "Evil Eye",
        "dice": 7,
        "damage": null,
        "note": "Opposed roll against a target's Smarts. If it succeeds, the target loses 1 Karma point, and the witch gains it."
      }
    ],
    "notes": [
      "The witch can use Karma stolen with the Evil Eye to fuel other magical effects, see \"Using Magic\", p. 22 of ACE!"
    ],
    "description": "The old crones Blair and Coira, who live in a crumbling cottage outside Ayr and hold the Cutty-Sark.",
    "page": 100
  },
  {
    "name": "Cherry Kilbourne, DJ",
    "setting": "strange",
    "type": "Person",
    "smarts": 3,
    "moves": 3,
    "style": 4,
    "brawn": 2,
    "focuses": [
      {
        "stat": "Smarts",
        "name": "Computers"
      },
      {
        "stat": "Moves",
        "name": "Driving"
      },
      {
        "stat": "Style",
        "name": "Music"
      },
      {
        "stat": "Brawn",
        "name": "Climbing"
      }
    ],
    "health": 2,
    "defence": 9,
    "attacks": [],
    "notes": [
      "Sultry Radio Presenter.",
      "Using her captivating voice, Cherry can make a Style check vs. Smarts to mesmerize somebody for one minute. If it doesn't work, though, they find her really annoying."
    ],
    "description": "KWF Radio's evening DJ, playing late night tunes and bringing all the local news to the town with her dulcet tones.",
    "page": 109
  },
  {
    "name": "Ian Peterson, Hotel Manager",
    "setting": "strange",
    "type": "Person",
    "smarts": 4,
    "moves": 3,
    "style": 3,
    "brawn": 2,
    "focuses": [
      {
        "stat": "Smarts",
        "name": "Accounting"
      },
      {
        "stat": "Moves",
        "name": "Stealth"
      },
      {
        "stat": "Style",
        "name": "Persuasion"
      },
      {
        "stat": "Brawn",
        "name": "Intimidating"
      }
    ],
    "health": 2,
    "defence": 9,
    "attacks": [],
    "notes": [
      "Greedy Tycoon.",
      "Ian has any property or equipment he needs."
    ],
    "description": "Business tycoon and owner of the Lookout Hotel, desperate to take over the Power & Utility company and acquire the land north of the hotel to profit from the planned hydro-electric dam.",
    "page": 109
  },
  {
    "name": "Amanda Lee, Hotel Security",
    "setting": "strange",
    "type": "Person",
    "smarts": 3,
    "moves": 4,
    "style": 2,
    "brawn": 3,
    "focuses": [
      {
        "stat": "Smarts",
        "name": "Perception"
      },
      {
        "stat": "Moves",
        "name": "Shooting"
      },
      {
        "stat": "Style",
        "name": "Animals"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 3,
    "defence": 12,
    "attacks": [],
    "notes": [
      "Honest Protector.",
      "If Ian Peterson takes damage, Amanda can choose to take it instead."
    ],
    "description": "Security at the Lookout Hotel.",
    "page": 109
  },
  {
    "name": "Dr Erik Dunwood",
    "setting": "strange",
    "type": "Person",
    "smarts": 5,
    "moves": 4,
    "style": 1,
    "brawn": 2,
    "focuses": [
      {
        "stat": "Smarts",
        "name": "Physics"
      },
      {
        "stat": "Smarts",
        "name": "Electronics"
      },
      {
        "stat": "Smarts",
        "name": "Quantum Theory"
      },
      {
        "stat": "Moves",
        "name": "Spot Welding"
      },
      {
        "stat": "Style",
        "name": "Science"
      },
      {
        "stat": "Brawn",
        "name": "Carrying"
      }
    ],
    "health": 2,
    "defence": 12,
    "attacks": [],
    "notes": [
      "Eccentric Scientist.",
      "If a monster has a weakness, Dr Dunwood knows it automatically. It's just a question of physics."
    ],
    "description": "Former research director of the Osterman Laboratories. After a falling out with the powers-that-be at the labs he relocated to Cygnet Island in the middle of the lake, building an extensive laboratory in the basement of his house. Distracted, brilliant, and thinks so far outside of the box that it's in another universe.",
    "page": 112
  },
  {
    "name": "Sheriff Harry Slater",
    "setting": "strange",
    "type": "Person",
    "smarts": 3,
    "moves": 4,
    "style": 2,
    "brawn": 3,
    "focuses": [
      {
        "stat": "Smarts",
        "name": "Investigation"
      },
      {
        "stat": "Moves",
        "name": "Driving"
      },
      {
        "stat": "Style",
        "name": "Persuasion"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 3,
    "defence": 12,
    "attacks": [],
    "notes": [
      "Dedicated Cop."
    ],
    "description": "Head of the Wilden Falls Sheriff's Department. His handful of deputies have little to do other than patrol during tourist season; they have two Chevy K5 Blazers and an old Ford Fairmont to drive around.",
    "page": 113
  },
  {
    "name": "Steve Twentyseven",
    "setting": "strange",
    "type": "Alien",
    "smarts": 3,
    "moves": 3,
    "style": 1,
    "brawn": 2,
    "focuses": [
      {
        "stat": "Smarts",
        "name": "Occultism"
      },
      {
        "stat": "Moves",
        "name": "Stealth"
      },
      {
        "stat": "Style",
        "name": "Disguise"
      },
      {
        "stat": "Brawn",
        "name": "Tough"
      }
    ],
    "health": 4,
    "defence": 9,
    "attacks": [],
    "notes": [
      "Childlike Pod-Person.",
      "Not real - a biological clone created by the pod-person scientists at Osterman Labs. If injured he bleeds like a human, except the blood is a strange, greenish goo.",
      "Doesn't talk much but gradually becomes more talkative as he learns from those around him. Only consumes the green health shake."
    ],
    "description": "The new kid at school. Plaid shirt, brown tie, beige pants, perfect blonde hair, perfect freckles, perfect teeth, and always smiling. Here to learn, observe, and start to infiltrate the town of Wilden Falls.",
    "page": 115
  },
  {
    "name": "Typical Steve",
    "setting": "strange",
    "type": "Mook",
    "smarts": 3,
    "moves": 3,
    "style": 3,
    "brawn": 3,
    "focuses": [
      {
        "stat": "Smarts",
        "name": "Occultism"
      },
      {
        "stat": "Moves",
        "name": "Running"
      },
      {
        "stat": "Style",
        "name": "Disguise"
      },
      {
        "stat": "Brawn",
        "name": "Tough"
      }
    ],
    "health": 5,
    "defence": 9,
    "attacks": [],
    "notes": [
      "Cheerful Cultist Pod-person.",
      "Pod-people are creepy plants, not actual people - you don't have to feel bad about killing Steve-joggers.",
      "Commanded by the subliminal signal in the evening radio commercials; when it broadcasts, every Steve leaves home in fitness gear and jogs around searching for threats.",
      "Any Steves caught in flooding soon lose functionality and become fertilizer to the forest."
    ],
    "description": "One of the perfect, identical pod-person clones that have replaced the Osterman Labs scientists. Perfect hair, perfect teeth, the same clothes, jogging first thing every morning. All of them are called Steve - Steve Radioshow, Steve Bakingsoda, Steve Feelgood, Steve Cowbell...",
    "page": 122
  },
  {
    "name": "Average Possessed Townsperson",
    "setting": "strange",
    "type": "Mook",
    "smarts": 2,
    "moves": 4,
    "style": 2,
    "brawn": 4,
    "focuses": [
      {
        "stat": "Smarts",
        "name": "Occultism"
      },
      {
        "stat": "Moves",
        "name": "Riding"
      },
      {
        "stat": "Style",
        "name": "Ritual Dance"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 4,
    "defence": 12,
    "attacks": [],
    "notes": [
      "Mindless Drone.",
      "In a trance, under the control of the ringleader Felicity McCallum; will try to protect her while she recites the ritual. Overpowered Heroes are carried to the pit to be hurled in as a sacrifice.",
      "A flood should wake them from their trance-like state."
    ],
    "description": "A townsperson of Wildenville in 1884, wandering aimlessly under the influence of the ancient interdimensional gods and preparing to summon Yogurt-Sothoth.",
    "page": 130
  },
  {
    "name": "FSS Brazen",
    "setting": "beam",
    "type": "Vehicle",
    "smarts": null,
    "moves": null,
    "style": null,
    "brawn": null,
    "focuses": [],
    "health": 8,
    "defence": 8,
    "attacks": [
      {
        "name": "Blazer",
        "dice": null,
        "damage": 2
      },
      {
        "name": "Boson Torpedo",
        "dice": null,
        "damage": 4
      }
    ],
    "notes": [
      "Science 3, Shields 3, Size 4, Warp 2.",
      "Starship weapons are rolled with the gunner's Moves (plus Shooting Focus); a Gunner on the bridge adds 1 to weapon damage.",
      "If the ship can't move, its Defence is zero."
    ],
    "description": "The Heroes' cutting-edge FLoP Spacefleet starship on its five-year exploratory mission.",
    "page": 142
  },
  {
    "name": "FSS Independent",
    "setting": "beam",
    "type": "Vehicle",
    "smarts": null,
    "moves": null,
    "style": null,
    "brawn": null,
    "focuses": [],
    "health": 6,
    "defence": 9,
    "attacks": [
      {
        "name": "Blazer",
        "dice": null,
        "damage": 2
      },
      {
        "name": "Boson Torpedo",
        "dice": 2,
        "damage": 4
      }
    ],
    "notes": [
      "Science 6, Shields 2, Size 3, Warp 3.",
      "Starship weapons are rolled with the gunner's Moves (plus Shooting Focus)."
    ],
    "description": "Armed deep space research vessel of the FLoP Spacefleet, designed to operate close to the League's frontier.",
    "page": 149
  },
  {
    "name": "Duchess Ali Cann",
    "setting": "beam",
    "type": "Villain",
    "smarts": 5,
    "moves": 6,
    "style": 5,
    "brawn": 6,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Dodging"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 6,
    "defence": 18,
    "attacks": [
      {
        "name": "Brawling",
        "dice": 8,
        "damage": 2
      },
      {
        "name": "Blazer Rifle",
        "dice": 6,
        "damage": 4
      }
    ],
    "notes": [
      "Cann has 3 Karma points. She can spend 1 Karma point to have a blow reduce her to 1 Health instead of Knocked Out."
    ],
    "description": "A genetically modified super soldier with claws from a secret, illegal program, banished with her crew when FLoP signed the truce with the Kulkans. She controls minds by placing parasitic Alpha Eels in her victims' ears.",
    "page": 151
  },
  {
    "name": "Super Soldier",
    "setting": "beam",
    "type": "Mook",
    "smarts": 4,
    "moves": 4,
    "style": 4,
    "brawn": 4,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Shooting"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 4,
    "defence": 12,
    "attacks": [
      {
        "name": "Brawling",
        "dice": 6,
        "damage": 2
      },
      {
        "name": "Blazer Rifle",
        "dice": 6,
        "damage": 4
      }
    ],
    "notes": [],
    "description": "Genetically modified soldiers from Duchess Ali Cann's crew, tough but not immortal.",
    "page": 151
  },
  {
    "name": "Kulkan Raptor",
    "setting": "beam",
    "type": "Vehicle",
    "smarts": null,
    "moves": null,
    "style": null,
    "brawn": null,
    "focuses": [],
    "health": 6,
    "defence": 8,
    "attacks": [
      {
        "name": "Blazer",
        "dice": 2,
        "damage": 2
      },
      {
        "name": "Boson Torpedo",
        "dice": 2,
        "damage": 4
      }
    ],
    "notes": [
      "Science 8, Shields 2, Size 3, Warp 3.",
      "The Kulkan Raptor can spend a round turning invisible. It can't fire its weapons when in this state but can move undetected and ambush its target in subsequent rounds. It needs to become visible to attack."
    ],
    "description": "A fearsome warship of the Kulkan Empire, commanded by Kulkan Commander Vetlok.",
    "page": 155
  },
  {
    "name": "Kulkan Champion",
    "setting": "beam",
    "type": "Alien",
    "smarts": 2,
    "moves": 3,
    "style": 1,
    "brawn": 7,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Dodging"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 7,
    "defence": 9,
    "attacks": [
      {
        "name": "Brawling",
        "dice": 9,
        "damage": 2
      }
    ],
    "notes": [
      "Fights hand-to-hand honour duels; beating the champion impresses the Kulkans enough to reduce the Style TN to make them back down from 30 to 20."
    ],
    "description": "The best fighter among the fanged, grizzly Kulkans, a martial, piratical-accented empire rivalling FLoP.",
    "page": 156
  },
  {
    "name": "Guardian Demon",
    "setting": "orcs",
    "type": "Demon",
    "smarts": 5,
    "moves": 3,
    "style": 5,
    "brawn": 8,
    "power": 5,
    "focuses": [
      {
        "stat": "Style",
        "name": "Persuasion"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      },
      {
        "stat": "Power",
        "name": "Fire",
        "dice": 7
      }
    ],
    "health": 8,
    "defence": 9,
    "attacks": [
      {
        "name": "Firebolt",
        "dice": 7,
        "damage": 2,
        "note": "30' range"
      },
      {
        "name": "Fiery Sword",
        "dice": 10,
        "damage": 3,
        "note": "plus a Moves 10 roll to avoid catching fire"
      }
    ],
    "notes": [
      "Bound to guard the Dragonseur; appears as soon as intruders set foot on its lava-ringed island and blocks the exit with roaring flames (leaping through the flames inflicts 6 damage).",
      "Prefers conversation to combat: offers the answer to one of the Oubliette's puzzles in exchange for a sliver of each Hero's soul (1 Karma each), then vanishes in a blaze of cinders.",
      "The dragonseur it guards is an illusion; the real one was stolen by the orcs of Salvation."
    ],
    "description": "A creature from the Abyss bound to guard an ancient weapon in the Orphic Oubliette. Bored and hungry, it greets fresh arrivals with 'Ah, how wonderful. Fresh meat for the barbecue'.",
    "page": 192
  },
  {
    "name": "Hercules Ferris",
    "setting": "domes",
    "type": "Person",
    "smarts": 2,
    "moves": 5,
    "style": 3,
    "brawn": 6,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Dodging"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 6,
    "defence": 21,
    "attacks": [
      {
        "name": "Unarmed",
        "dice": 8,
        "damage": 2
      }
    ],
    "notes": [],
    "description": "A fighter from Paradise City; overconfident and a bit full of himself.",
    "page": 218
  },
  {
    "name": "Shelby Hudson",
    "setting": "domes",
    "type": "Person",
    "smarts": 3,
    "moves": 4,
    "style": 3,
    "brawn": 6,
    "focuses": [
      {
        "stat": "Brawn",
        "name": "Tough"
      }
    ],
    "health": 8,
    "defence": 12,
    "attacks": [
      {
        "name": "Unarmed",
        "dice": 6,
        "damage": 2
      }
    ],
    "notes": [
      "Former fighter with a prosthetic leg, now Hercules' manager and trainer; drives an armored school bus with a turret (pump action shotgun, 6 shells)."
    ],
    "description": "Hercules' manager, bearing the weight of responsibility and regret that she can no longer compete.",
    "page": 218
  },
  {
    "name": "Tucker Welch",
    "setting": "domes",
    "type": "Villain",
    "smarts": 2,
    "moves": 2,
    "style": 4,
    "brawn": 5,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Armor"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 5,
    "defence": 12,
    "attacks": [
      {
        "name": "Unarmed",
        "dice": 7,
        "damage": 2
      }
    ],
    "notes": [
      "A mutant with a non-functional third eye hidden under a spiked leather cap; accompanied by one Mook per Hero.",
      "Carries a knife (2 damage) once banned from the restie; no knife attack line is printed."
    ],
    "description": "An obnoxious oaf of a fighter; a bully, but sympathetic.",
    "page": 218
  },
  {
    "name": "\"Su\" Sussudio",
    "setting": "domes",
    "type": "Person",
    "smarts": 3,
    "moves": 4,
    "style": 2,
    "brawn": 2,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Stealth"
      },
      {
        "stat": "Style",
        "name": "Empathy"
      },
      {
        "stat": "Style",
        "name": "Perception"
      }
    ],
    "health": 2,
    "defence": 12,
    "attacks": [
      {
        "name": "Knife",
        "dice": 2,
        "damage": 2
      }
    ],
    "notes": [
      "An elf (spy) for the Saint; use the same stats for Mickey, a young boy who is also an elf."
    ],
    "description": "Friendly and curious server at Jin's Restie who secretly works for the Saint.",
    "page": 218
  },
  {
    "name": "Howlers",
    "setting": "domes",
    "type": "Mook",
    "smarts": 2,
    "moves": 3,
    "style": 2,
    "brawn": 2,
    "focuses": [],
    "health": 1,
    "defence": 9,
    "attacks": [
      {
        "name": "Clawed Hands",
        "dice": 3,
        "damage": 1
      }
    ],
    "notes": [
      "Mutants resembling classic werewolves; not magical, regular weapons work and their bite is not contagious.",
      "Ride motorcycles, usually doubled up or with sidecars."
    ],
    "page": 218
  },
  {
    "name": "Alpha",
    "setting": "domes",
    "type": "Villain",
    "smarts": 3,
    "moves": 3,
    "style": 2,
    "brawn": 3,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Dodging"
      },
      {
        "stat": "Brawn",
        "name": "Tough"
      }
    ],
    "health": 5,
    "defence": 15,
    "attacks": [
      {
        "name": "Clawed Hands",
        "dice": 3,
        "damage": 1
      },
      {
        "name": "Machete",
        "dice": 3,
        "damage": 2
      }
    ],
    "notes": [
      "Leader of the Howlers; calls off the attack if the Howlers lose half their members.",
      "Drives a pickup truck."
    ],
    "description": "A large wolf-man with a jagged scar down one side of his face.",
    "page": 218
  },
  {
    "name": "Rosie",
    "setting": "domes",
    "type": "Person",
    "smarts": 3,
    "moves": 5,
    "style": 4,
    "brawn": 2,
    "power": 3,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Acrobatics"
      },
      {
        "stat": "Style",
        "name": "Stagecraft"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      },
      {
        "stat": "Power",
        "name": "Conjuration"
      }
    ],
    "health": 4,
    "defence": 21,
    "attacks": [
      {
        "name": "Baton",
        "dice": 4,
        "damage": 2
      }
    ],
    "notes": [
      "Master illusionist; her 'magic' is simply illusions and parlor tricks.",
      "Accomplished thief with a kind heart."
    ],
    "description": "'Rosie the Riveting', a traveling mutant magician with hare-like features.",
    "page": 228
  },
  {
    "name": "ORCS",
    "setting": "domes",
    "type": "Mook",
    "smarts": 2,
    "moves": 3,
    "style": 2,
    "brawn": 3,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Armor"
      }
    ],
    "health": 1,
    "defence": 15,
    "attacks": [
      {
        "name": "Sword",
        "dice": 3,
        "damage": 3
      },
      {
        "name": "Hand Crossbow",
        "dice": 3,
        "damage": 2
      },
      {
        "name": "Shotgun",
        "dice": 3,
        "damage": 3
      }
    ],
    "notes": [
      "The Saint's army, derived from mall security; wear leathers with a stylized ORC-on-a-shield badge."
    ],
    "page": 228
  },
  {
    "name": "Fighters",
    "setting": "domes",
    "type": "Person",
    "smarts": 2,
    "moves": 3,
    "style": 2,
    "brawn": 4,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Dodging"
      },
      {
        "stat": "Brawn",
        "name": "Tough"
      }
    ],
    "health": 6,
    "defence": 15,
    "attacks": [
      {
        "name": "Unarmed",
        "dice": 6,
        "damage": 2
      }
    ],
    "notes": [
      "Generic community fighters competing in the Lectric Buggalu."
    ],
    "page": 228
  },
  {
    "name": "The Saint (Nicole Last)",
    "setting": "domes",
    "type": "Villain",
    "smarts": 3,
    "moves": 4,
    "style": 5,
    "brawn": 3,
    "focuses": [
      {
        "stat": "Smarts",
        "name": "Empathy"
      },
      {
        "stat": "Moves",
        "name": "Shooting"
      },
      {
        "stat": "Style",
        "name": "Leadership"
      }
    ],
    "health": 3,
    "defence": 12,
    "attacks": [
      {
        "name": "Pistol",
        "dice": 6,
        "damage": 3
      }
    ],
    "notes": [
      "Warlord of the Saint's Compound (the old Odessa Retail Center); commands the ORCS, elf spies, a movable minigun and the Dragon helicopter."
    ],
    "description": "The Jolly Saint of the Wasteland, Checker of Lists, and General Manager for Life; wears a red cloak with white trim.",
    "page": 228
  },
  {
    "name": "Mr. Frost",
    "setting": "domes",
    "type": "Villain",
    "smarts": 2,
    "moves": 4,
    "style": 2,
    "brawn": 5,
    "focuses": [
      {
        "stat": "Smarts",
        "name": "Perception"
      },
      {
        "stat": "Moves",
        "name": "Dodging"
      },
      {
        "stat": "Brawn",
        "name": "Intimidating"
      }
    ],
    "health": 5,
    "defence": 18,
    "attacks": [
      {
        "name": "Unarmed",
        "dice": 5,
        "damage": 2
      },
      {
        "name": "Spiked Baseball Bat",
        "dice": 5,
        "damage": 3
      }
    ],
    "notes": [
      "The Saint's reigning champion; fears his age is catching up with him."
    ],
    "description": "A massive shirtless man in a black wool hat, covered in white powder like a snowman.",
    "page": 228
  },
  {
    "name": "Rudy",
    "setting": "domes",
    "type": "Villain",
    "smarts": 2,
    "moves": 5,
    "style": 4,
    "brawn": 2,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Acrobatics"
      },
      {
        "stat": "Style",
        "name": "Public Speaking"
      }
    ],
    "health": 2,
    "defence": 21,
    "attacks": [
      {
        "name": "Knife",
        "dice": 2,
        "damage": 2
      },
      {
        "name": "Thrown Knife",
        "dice": 5,
        "damage": 2
      }
    ],
    "notes": [
      "Runs the Workshop and its technicians; embraces the 'mad, giggling henchman' trope."
    ],
    "description": "The Saint's announcer, in a long brown coat, antler cap and red clown nose.",
    "page": 228
  },
  {
    "name": "The Dragon",
    "setting": "domes",
    "type": "Vehicle",
    "smarts": null,
    "moves": null,
    "style": null,
    "brawn": 4,
    "focuses": [],
    "health": 4,
    "defence": 15,
    "attacks": [
      {
        "name": "Flamethrower",
        "dice": 4,
        "damage": 4,
        "note": "bottom-mounted, relatively short-ranged; operated by the co-pilot"
      }
    ],
    "notes": [
      "Bash 4, Steering +1, Plating 3.",
      "A red helicopter once used to burn fire lines; carries a pilot, a co-pilot and 4-6 passengers.",
      "If the minigun (4 damage) was not taken or disabled, it is mounted on the left side and manned by a gunner.",
      "Can be fought by leaping aboard from a vehicle, disabling it from afar, or shooting the pilot through the exposed window."
    ],
    "page": 232
  },
  {
    "name": "Dune Buggy",
    "setting": "domes",
    "type": "Vehicle",
    "smarts": null,
    "moves": null,
    "style": null,
    "brawn": 3,
    "focuses": [],
    "health": 5,
    "defence": null,
    "attacks": [
      {
        "name": "Ram",
        "dice": null,
        "damage": 3,
        "note": "driver uses the vehicle's Bash when ramming or running over pedestrians"
      }
    ],
    "notes": [
      "Bash 3, Steering +1, Plating 2. Cost 20.",
      "Or any largely open air vehicle, including sedans with missing roofs or doors."
    ],
    "page": 209
  },
  {
    "name": "Cycle",
    "setting": "domes",
    "type": "Vehicle",
    "smarts": null,
    "moves": null,
    "style": null,
    "brawn": 3,
    "focuses": [],
    "health": 2,
    "defence": null,
    "attacks": [
      {
        "name": "Ram",
        "dice": null,
        "damage": 3,
        "note": "driver uses the vehicle's Bash when ramming or running over pedestrians"
      }
    ],
    "notes": [
      "Bash 3, Steering +2, Plating 2. Cost 25.",
      "Also works for trikes and ATVs. Riders are not covered and do not benefit from Plating."
    ],
    "page": 209
  },
  {
    "name": "Sedan",
    "setting": "domes",
    "type": "Vehicle",
    "smarts": null,
    "moves": null,
    "style": null,
    "brawn": 4,
    "focuses": [],
    "health": 15,
    "defence": null,
    "attacks": [
      {
        "name": "Ram",
        "dice": null,
        "damage": 4,
        "note": "driver uses the vehicle's Bash when ramming or running over pedestrians"
      }
    ],
    "notes": [
      "Bash 4, Steering 0, Plating 3. Cost 30.",
      "Really any car."
    ],
    "page": 209
  },
  {
    "name": "Truck",
    "setting": "domes",
    "type": "Vehicle",
    "smarts": null,
    "moves": null,
    "style": null,
    "brawn": 5,
    "focuses": [],
    "health": 25,
    "defence": null,
    "attacks": [
      {
        "name": "Ram",
        "dice": null,
        "damage": 5,
        "note": "driver uses the vehicle's Bash when ramming or running over pedestrians"
      }
    ],
    "notes": [
      "Bash 5, Steering 0, Plating 3. Cost 35.",
      "Also works for vans."
    ],
    "page": 209
  },
  {
    "name": "Bus",
    "setting": "domes",
    "type": "Vehicle",
    "smarts": null,
    "moves": null,
    "style": null,
    "brawn": 6,
    "focuses": [],
    "health": 25,
    "defence": null,
    "attacks": [
      {
        "name": "Ram",
        "dice": null,
        "damage": 6,
        "note": "driver uses the vehicle's Bash when ramming or running over pedestrians"
      }
    ],
    "notes": [
      "Bash 6, Steering -2, Plating 3. Cost 50.",
      "Also works for RVs."
    ],
    "page": 209
  },
  {
    "name": "Semi",
    "setting": "domes",
    "type": "Vehicle",
    "smarts": null,
    "moves": null,
    "style": null,
    "brawn": 6,
    "focuses": [],
    "health": 30,
    "defence": null,
    "attacks": [
      {
        "name": "Ram",
        "dice": null,
        "damage": 6,
        "note": "driver uses the vehicle's Bash when ramming or running over pedestrians"
      }
    ],
    "notes": [
      "Bash 6, Steering -2, Plating 3. Cost 50.",
      "Without a trailer, the Semi only has -1 Steering."
    ],
    "page": 209
  },
  {
    "name": "Crooked Property Developer",
    "setting": "bite",
    "type": "Person",
    "smarts": 4,
    "moves": 2,
    "style": 3,
    "brawn": 2,
    "focuses": [
      {
        "stat": "Style",
        "name": "Disguise"
      }
    ],
    "health": 2,
    "defence": 6,
    "attacks": [
      {
        "name": "Fisticuffs",
        "dice": 4,
        "damage": 1
      }
    ],
    "notes": [],
    "page": 241
  },
  {
    "name": "Cultist",
    "setting": "bite",
    "type": "Mook",
    "smarts": 2,
    "moves": 2,
    "style": 1,
    "brawn": 3,
    "focuses": [
      {
        "stat": "Smarts",
        "name": "Occultism"
      }
    ],
    "health": 3,
    "defence": 6,
    "attacks": [
      {
        "name": "Sacrificial Dagger",
        "dice": 5,
        "damage": 2
      }
    ],
    "notes": [],
    "page": 241
  },
  {
    "name": "Devil",
    "setting": "bite",
    "type": "Monster",
    "smarts": 6,
    "moves": 4,
    "style": 6,
    "brawn": 8,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Flying"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 8,
    "defence": 12,
    "attacks": [
      {
        "name": "Flaming Trident",
        "dice": 10,
        "damage": 3
      },
      {
        "name": "Fire blast",
        "dice": 6,
        "damage": 3,
        "note": "30' range"
      }
    ],
    "notes": [
      "Takes double damage from silver weapons.",
      "Smells of sulphur."
    ],
    "page": 241
  },
  {
    "name": "Ghost",
    "setting": "bite",
    "type": "Ghost",
    "smarts": 3,
    "moves": 3,
    "style": 3,
    "brawn": null,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Flying"
      }
    ],
    "health": 3,
    "defence": 9,
    "attacks": [
      {
        "name": "Ghostly Chill",
        "dice": 5,
        "damage": 2
      }
    ],
    "notes": [
      "When first seen a Ghost causes characters to be Spooked! unless they succeed on a Smarts 20 or Style 20 roll.",
      "Spirits can't pick things up and are only harmed by holy, magical, or sci-fi ecto-gadgetry damage."
    ],
    "page": 241
  },
  {
    "name": "Mummy",
    "setting": "bite",
    "type": "Undead",
    "smarts": 6,
    "moves": 2,
    "style": 4,
    "brawn": 6,
    "focuses": [
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 8,
    "defence": 6,
    "attacks": [
      {
        "name": "Throttling grasp",
        "dice": 8,
        "damage": 3
      }
    ],
    "notes": [
      "A mummy takes double damage from fire-based weapons."
    ],
    "page": 241
  },
  {
    "name": "Hex Master",
    "setting": "bite",
    "type": "Villain",
    "smarts": 6,
    "moves": 3,
    "style": 5,
    "brawn": 3,
    "power": 5,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Rituals"
      },
      {
        "stat": "Power",
        "name": "Necromancy"
      }
    ],
    "health": 3,
    "defence": 9,
    "attacks": [
      {
        "name": "Hex Doll",
        "dice": 7,
        "damage": 4,
        "note": "Target has to be able to see the doll and the Hex Master needs to be able to see the target and have an appropriate doll prepared"
      }
    ],
    "notes": [],
    "page": 242
  },
  {
    "name": "Pirate Ghost",
    "setting": "bite",
    "type": "Ghost",
    "smarts": 2,
    "moves": 4,
    "style": 3,
    "brawn": null,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Climbing"
      }
    ],
    "health": 3,
    "defence": 12,
    "attacks": [
      {
        "name": "Spectral Cutlass",
        "dice": 6,
        "damage": 3
      }
    ],
    "notes": [
      "When first seen, a ghost causes characters to be Spooked! unless they succeed on a Smarts 10 or Style 10 roll.",
      "Spirits can't pick things up and are only harmed by holy, magical, or sci-fi ecto-gadgetry damage."
    ],
    "page": 242
  },
  {
    "name": "Poltergeist",
    "setting": "bite",
    "type": "Ghost",
    "smarts": 1,
    "moves": 5,
    "style": 1,
    "brawn": null,
    "power": 5,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Flying"
      },
      {
        "stat": "Power",
        "name": "Telekinesis"
      }
    ],
    "health": 3,
    "defence": 15,
    "attacks": [
      {
        "name": "Ghostly Fling",
        "dice": 7,
        "damage": 2,
        "note": "to all within 10'"
      }
    ],
    "notes": [
      "Spirits can't pick things up and are only harmed by holy, magical, or sci-fi ecto-gadgetry damage."
    ],
    "page": 242
  },
  {
    "name": "Wolfman",
    "setting": "bite",
    "type": "Monster",
    "smarts": 3,
    "moves": 4,
    "style": 2,
    "brawn": 6,
    "focuses": [
      {
        "stat": "Smarts",
        "name": "Tracking"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 6,
    "defence": 12,
    "attacks": [
      {
        "name": "Claws and bite",
        "dice": 8,
        "damage": 2
      }
    ],
    "notes": [
      "Takes double damage from silver weapons.",
      "Regenerates 1 Health per round unless at zero Health."
    ],
    "page": 242
  },
  {
    "name": "The Park Poltergeist",
    "setting": "bite",
    "type": "Villain",
    "smarts": 3,
    "moves": 3,
    "style": 3,
    "brawn": 2,
    "focuses": [
      {
        "stat": "Style",
        "name": "Intimidate"
      }
    ],
    "health": 2,
    "defence": 9,
    "attacks": [
      {
        "name": "Fling Debris",
        "dice": 5,
        "damage": 2,
        "note": "to all within 10'"
      }
    ],
    "notes": [
      "A fake ghost: a skull-faced apparition glowing green, actually a man in a costume of old Halloween pieces and luminous paint, using radio-controlled rides and spring-loaded debris launchers."
    ],
    "description": "A skull-faced spectral apparition glowing green with ghostly energy, issuing a dreadful moaning wail as fairground debris whirls around it.",
    "page": 249
  },
  {
    "name": "Mr Stephen Scribbens",
    "setting": "bite",
    "type": "Person",
    "smarts": 3,
    "moves": 2,
    "style": 2,
    "brawn": 1,
    "focuses": [
      {
        "stat": "Smarts",
        "name": "Accounting"
      }
    ],
    "health": 1,
    "defence": 6,
    "attacks": [],
    "notes": [],
    "description": "Crooked Real Estate Developer. A scrawny middle-aged man with dark, thinning, greasy hair, a pencil moustache, and a sharp hooked nose.",
    "page": 250
  },
  {
    "name": "Quentin Braddock",
    "setting": "bite",
    "type": "Person",
    "smarts": 2,
    "moves": 2,
    "style": 2,
    "brawn": 2,
    "focuses": [
      {
        "stat": "Smarts",
        "name": "Office Work"
      }
    ],
    "health": 2,
    "defence": 6,
    "attacks": [],
    "notes": [],
    "description": "A hassled young secretary and \"junior developer\", hamster-like in both features and demeanour, completely in the dark and out of his depth.",
    "page": 252
  },
  {
    "name": "Madame Rosmerta",
    "setting": "bite",
    "type": "Person",
    "smarts": 4,
    "moves": 2,
    "style": 5,
    "brawn": 2,
    "power": 3,
    "focuses": [
      {
        "stat": "Smarts",
        "name": "Occultism"
      },
      {
        "stat": "Style",
        "name": "Fortune Telling"
      },
      {
        "stat": "Power",
        "name": "Fortune Telling and Séance"
      }
    ],
    "health": 2,
    "defence": 6,
    "attacks": [],
    "notes": [
      "Can perform tarot readings for the Heroes: on a Style 20 roll, a Hero may ask a single yes or no question (answered truthfully, if cryptically)."
    ],
    "description": "A tarot reader and fortune teller who runs a small New Age bookshop; dresses for the part in embroidered scarves, a long shawl and lots of costume jewellery.",
    "page": 253
  },
  {
    "name": "Adam",
    "setting": "bite",
    "type": "Monster",
    "smarts": 1,
    "moves": 3,
    "style": 2,
    "brawn": 5,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Jumping"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      },
      {
        "stat": "Brawn",
        "name": "Tough"
      }
    ],
    "health": 7,
    "defence": 9,
    "attacks": [
      {
        "name": "Brawling",
        "dice": 7,
        "damage": 2
      }
    ],
    "notes": [
      "Regenerates 1 Health each round. Cannot regenerate once reduced to zero Health."
    ],
    "description": "A huge flesh golem; a creature built from the parts of other human beings. Not a great conversationalist.",
    "page": 254
  },
  {
    "name": "Open-Minded Eve",
    "setting": "bite",
    "type": "Monster",
    "smarts": 3,
    "moves": 4,
    "style": 3,
    "brawn": 5,
    "power": 5,
    "focuses": [
      {
        "stat": "Style",
        "name": "Hideous Allure"
      },
      {
        "stat": "Power",
        "name": "Lightning"
      }
    ],
    "health": 5,
    "defence": 12,
    "attacks": [
      {
        "name": "Brawling",
        "dice": 5,
        "damage": 2
      },
      {
        "name": "Shocking Blast",
        "dice": 7,
        "damage": 2,
        "note": "20ft range"
      }
    ],
    "notes": [],
    "description": "Adam's shrewd and cunning partner. The top of her skull is missing, leaving her brain on view.",
    "page": 258
  },
  {
    "name": "Little Minion Monsters",
    "setting": "bite",
    "type": "Mook",
    "smarts": 1,
    "moves": 3,
    "style": 1,
    "brawn": 1,
    "focuses": [
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 1,
    "defence": 9,
    "attacks": [
      {
        "name": "Brawling",
        "dice": 3,
        "damage": 1
      }
    ],
    "notes": [],
    "description": "A family of infant flesh golems.",
    "page": 258
  },
  {
    "name": "Hell Hound",
    "setting": "bite",
    "type": "Monster",
    "smarts": 2,
    "moves": 3,
    "style": 1,
    "brawn": 5,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Shooting"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 7,
    "defence": 9,
    "attacks": [
      {
        "name": "Bite",
        "dice": 7,
        "damage": 1
      },
      {
        "name": "Fiery Breath",
        "dice": 5,
        "damage": 2,
        "note": "15' range"
      }
    ],
    "notes": [
      "Takes double damage from silver weapons.",
      "Supernatural senses: cannot be avoided by sneaking."
    ],
    "page": 263
  },
  {
    "name": "Dark Master",
    "setting": "bite",
    "type": "Villain",
    "smarts": 7,
    "moves": 7,
    "style": 6,
    "brawn": 8,
    "power": 6,
    "focuses": [
      {
        "stat": "Style",
        "name": "Seduction"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 8,
    "defence": 21,
    "attacks": [
      {
        "name": "Bite",
        "dice": 10,
        "damage": 2,
        "note": "Dark Master recovers 1 Health"
      }
    ],
    "notes": [
      "Killed by sunlight, vulnerable to Holy Water and Garlic.",
      "Can turn into a hellhound or a ghost."
    ],
    "description": "That most deadly (and gorgeous) of vampires… a true prince of darkness. When defeated he dissolves into a pile of ash from which a red mist dissipates with a blood-curdling shriek.",
    "page": 265
  },
  {
    "name": "Banjo",
    "setting": "aaah",
    "type": "Villain",
    "smarts": 2,
    "moves": 2,
    "style": 2,
    "brawn": 6,
    "focuses": [
      {
        "stat": "Brawn",
        "name": "Lifting"
      }
    ],
    "health": 6,
    "defence": 6,
    "attacks": [
      {
        "name": "Horn",
        "dice": 6,
        "damage": 2,
        "note": "charging does double damage"
      }
    ],
    "notes": [],
    "description": "Tough but dumb rhino henchman. Leads the Whistler's warthog mooks in the Museum of Natural Art robbery.",
    "page": 289
  },
  {
    "name": "Jerry",
    "setting": "aaah",
    "type": "Villain",
    "smarts": 3,
    "moves": 5,
    "style": 1,
    "brawn": 3,
    "focuses": [],
    "health": 3,
    "defence": 15,
    "attacks": [
      {
        "name": "Leaping kick",
        "dice": 3,
        "damage": 1
      }
    ],
    "notes": [
      "Jerry can leap heights and distances of up to 60 feet.",
      "He has a sticky tongue which lets him grab things from about 15 feet away."
    ],
    "description": "Greedy frog henchman. Raids the safety deposit boxes at First Bristol Bank with wolf mooks armed with tommy guns.",
    "page": 290
  },
  {
    "name": "Sliver",
    "setting": "aaah",
    "type": "Villain",
    "smarts": 5,
    "moves": 4,
    "style": 4,
    "brawn": 3,
    "focuses": [],
    "health": 3,
    "defence": 12,
    "attacks": [
      {
        "name": "Pistol",
        "dice": 4,
        "damage": 2
      }
    ],
    "notes": [
      "Sliver can chew through anything. It takes him a minute to chew through restraints and an hour to chew through a door."
    ],
    "description": "Clever rat henchman. Leads four turtle ninja mooks (Mikey, Leo, Donny, and Ralph) in the NBTV Studios robbery.",
    "page": 291
  },
  {
    "name": "Roller Coaster Cart",
    "setting": "aaah",
    "type": "Vehicle",
    "smarts": null,
    "moves": null,
    "style": null,
    "brawn": null,
    "focuses": [],
    "health": 5,
    "defence": 10,
    "attacks": [],
    "notes": [
      "When reduced to 0 Health, the cart crashes off the roller coaster, leaving its occupants bruised and dazed with 0 Health.",
      "Each turn of the chase, roll a die: 1 Upside down loop (Moves 10 or fall off for 1 damage); 2 Tunnel (a 1 on the Calamity Die with a ranged attack hits an ally); 3 Jump (Moves 10 or drop what is held); 4 Corkscrew (Style 15 or miss the turn); 5-6 Fork (melee attacks possible this turn)."
    ],
    "description": "Sliver's cart on the NBTV soundstage roller coaster; Heroes may target the cart instead of the occupants.",
    "page": 291
  },
  {
    "name": "Velociraptor",
    "setting": "aaah",
    "type": "Animal",
    "smarts": 1,
    "moves": 5,
    "style": 2,
    "brawn": 4,
    "focuses": [
      {
        "stat": "Smarts",
        "name": "Tracking"
      }
    ],
    "health": 4,
    "defence": 15,
    "attacks": [
      {
        "name": "Pistol",
        "dice": 4,
        "damage": 1
      }
    ],
    "notes": [
      "When attacking in a group of 3 or more velociraptors, each gains +1 die to attacks."
    ],
    "description": "Experimental velociraptors loose in MOON LABS. They're mad and will attack anybody and everybody, including the Heroes.",
    "page": 294
  },
  {
    "name": "Giant Spider",
    "setting": "aaah",
    "type": "Monster",
    "smarts": 1,
    "moves": 6,
    "style": 1,
    "brawn": 5,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Webs"
      }
    ],
    "health": 5,
    "defence": 18,
    "attacks": [
      {
        "name": "Poison bite",
        "dice": 5,
        "damage": 2,
        "note": "makes target Sick"
      },
      {
        "name": "Sticky Web",
        "dice": 8,
        "damage": 0,
        "note": "30-foot range, restrains target, needs Brawn 10 check to escape"
      }
    ],
    "notes": [],
    "description": "A pair of giant spiders lair in the cargo hold of the buried Viking ship Ormurin Langi.",
    "page": 295
  },
  {
    "name": "Crow Mobster",
    "setting": "aaah",
    "type": "Mook",
    "smarts": 3,
    "moves": 3,
    "style": 3,
    "brawn": 3,
    "focuses": [],
    "health": 3,
    "defence": 9,
    "attacks": [
      {
        "name": "Pistol",
        "dice": 3,
        "damage": 2
      },
      {
        "name": "Baseball bat",
        "dice": 3,
        "damage": 2
      }
    ],
    "notes": [
      "These crows can fly.",
      "If two of the three are defeated, the third flees."
    ],
    "description": "Trilby-wearing crow mobsters staking out Rocky Rocco's apartment building over his gambling debts.",
    "page": 296
  },
  {
    "name": "Tango",
    "setting": "aaah",
    "type": "Villain",
    "smarts": 3,
    "moves": 4,
    "style": 3,
    "brawn": 4,
    "focuses": [],
    "health": 4,
    "defence": 12,
    "attacks": [
      {
        "name": "Claws",
        "dice": 4,
        "damage": 2
      }
    ],
    "notes": [],
    "description": "Fierce but loyal tiger henchman. Guards the 1st floor foyer of the World State Tower with his mooks.",
    "page": 298
  },
  {
    "name": "Burt",
    "setting": "aaah",
    "type": "Villain",
    "smarts": 2,
    "moves": 2,
    "style": 2,
    "brawn": 6,
    "focuses": [],
    "health": 6,
    "defence": 6,
    "attacks": [
      {
        "name": "Bearhug",
        "dice": 6,
        "damage": 2
      }
    ],
    "notes": [],
    "description": "Really a nice bear underneath. Guards the 35th floor maintenance level of the World State Tower with his mooks.",
    "page": 298
  },
  {
    "name": "Jacko",
    "setting": "aaah",
    "type": "Villain",
    "smarts": 4,
    "moves": 4,
    "style": 4,
    "brawn": 2,
    "focuses": [],
    "health": 2,
    "defence": 12,
    "attacks": [
      {
        "name": "Uzi",
        "dice": 4,
        "damage": 2
      }
    ],
    "notes": [],
    "description": "Sly, mean-spirited jackal henchman. Guards the 86th floor observatory of the World State Tower with his mooks.",
    "page": 298
  },
  {
    "name": "Whistler",
    "setting": "aaah",
    "type": "Villain",
    "smarts": 6,
    "moves": 5,
    "style": 6,
    "brawn": 4,
    "power": 4,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Dodging"
      }
    ],
    "health": 4,
    "defence": 21,
    "attacks": [
      {
        "name": "Bite",
        "dice": 2,
        "damage": 1,
        "note": "target is poisoned, losing 1 more Health on their next turn"
      }
    ],
    "notes": [
      "Whistle. The Whistler makes a Power vs Smarts check against a target within sight who can hear him. If he succeeds, that target will do anything he says for 1 minute.",
      "Not much of a physical threat; he will try to turn the strongest Hero against their allies."
    ],
    "description": "Sinister evil snake genius—a hooded cobra who can control the weak-minded by whistling. Archvillain of New Bristol, hiding out on the 100th floor top deck of the World State Tower with his ninja guard.",
    "page": 299
  },
  {
    "name": "Ninja",
    "setting": "aaah",
    "type": "Mook",
    "smarts": 2,
    "moves": 6,
    "style": 2,
    "brawn": 3,
    "focuses": [
      {
        "stat": "Moves",
        "name": "Climbing"
      },
      {
        "stat": "Brawn",
        "name": "Brawling"
      }
    ],
    "health": 3,
    "defence": 18,
    "attacks": [
      {
        "name": "Sword",
        "dice": 5,
        "damage": 2
      }
    ],
    "notes": [],
    "description": "The Whistler's personal guard of ninjas (one for each Hero) on the top deck of the World State Tower.",
    "page": 299
  }
];
