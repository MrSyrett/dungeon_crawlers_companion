// GENERATED FILE - do not edit by hand.
// Source: data/ace/parts/*.json - regenerate with: node scripts/build-ace-data.mjs

const ACE_ROLES = [
  {
    "name": "Ape",
    "category": "Talking Animals",
    "setting": "core",
    "ability": "You're a walking, talking ape! You can jump 30 feet in the air with no effort. Also, when you throw things, you do an extra point of damage!",
    "page": 9
  },
  {
    "name": "Cat",
    "category": "Talking Animals",
    "setting": "core",
    "ability": "Agile and sneaky though you are, your main power is your nine lives! Roll a die; that's how many lives you have left. When you would normally be Knocked Out, instead you remain at 1 Health.",
    "page": 9
  },
  {
    "name": "Crow",
    "category": "Talking Animals",
    "setting": "core",
    "ability": "You can fly. That's good, isn't it? It doesn't have to be a crow; you can pick a different bird if you want.",
    "page": 9
  },
  {
    "name": "Dog",
    "category": "Talking Animals",
    "setting": "core",
    "ability": "A loyal companion, if there's something to smell you can always smell it. Also, sometimes you smell.",
    "page": 9
  },
  {
    "name": "Kangaroo",
    "category": "Talking Animals",
    "setting": "core",
    "ability": "Kangaroos pack one heck of a punch! Your punch does an extra point of damage. Most people try to ignore the boxing gloves.",
    "page": 9
  },
  {
    "name": "Turtle",
    "category": "Talking Animals",
    "setting": "core",
    "ability": "A hero in a half shell, you reduce all damage done to you by 1 point.",
    "page": 9
  },
  {
    "name": "Alien",
    "category": "Species",
    "setting": "core",
    "ability": "You have psychic powers! You have a Power stat, although you don't get extra points to distribute.",
    "power": true,
    "page": 10
  },
  {
    "name": "Dwarf",
    "category": "Species",
    "setting": "core",
    "ability": "Grumpy, and with a Scottish accent (if you want), you can appraise the value of things with a single glance.",
    "page": 10
  },
  {
    "name": "Elf",
    "category": "Species",
    "setting": "core",
    "ability": "You're very sneaky, and when in natural surroundings, you can be effectively invisible.",
    "page": 10
  },
  {
    "name": "Ghost",
    "category": "Species",
    "setting": "core",
    "ability": "You don't take damage unless it's from a holy source or some special sci-fi ecto-gadget. But you also can't pick things up. So there's that.",
    "page": 10
  },
  {
    "name": "Goblin",
    "category": "Species",
    "setting": "core",
    "ability": "Vicious little scrapper, you can snatch small items from your opponent instead of attacking.",
    "page": 10
  },
  {
    "name": "Golem",
    "category": "Species",
    "setting": "core",
    "ability": "You may be slow (you always go last in the turn) but you also take half damage (round up) because you're, like, made of stone or metal or something.",
    "page": 10
  },
  {
    "name": "Hobbit",
    "category": "Species",
    "setting": "core",
    "ability": "You're a brave little hobbit. Hobbits have tremendous reserves of courage, so you might be scared, but you are never affected by fear.",
    "page": 10
  },
  {
    "name": "Monster",
    "category": "Species",
    "setting": "core",
    "ability": "Grrr! I'm a monster! You're very scary. If you make a Style check against somebody's Style, they have to run away for a minute. You can only do it to them once though.",
    "page": 10
  },
  {
    "name": "Ogre",
    "category": "Species",
    "setting": "core",
    "ability": "Big, scary ogre. If you don't put loads of points into your Brawn Stat you're going wrong somewhere. Anyway, you get an extra +1 to your Brawn Stat, and an extra +2 Health.",
    "statMods": {
      "Brawn": 1
    },
    "healthBonus": 2,
    "page": 10
  },
  {
    "name": "Robot",
    "category": "Species",
    "setting": "core",
    "ability": "I AM A ROBOT! You're basically immune to fear and mental stuff. Cuz you're a robot.",
    "page": 10
  },
  {
    "name": "Vampire",
    "category": "Species",
    "setting": "core",
    "ability": "Creature of the night! When you make an unarmed melee attack, you gain 1 Health as you suck your victim's blood. But you can't go out in the sunlight.",
    "page": 10
  },
  {
    "name": "Werewolf",
    "category": "Species",
    "setting": "core",
    "ability": "You take double damage from silver weapons, but you do get to turn into a wolf at night. You have the same stats, but you're a wolf.",
    "page": 10
  },
  {
    "name": "Alchemist",
    "category": "Fantasy",
    "setting": "core",
    "ability": "You know potions and stuff. You can spend an hour to make a potion that cures any ailment, curse, or disease.",
    "page": 11
  },
  {
    "name": "Assassin",
    "category": "Fantasy",
    "setting": "core",
    "ability": "You're so good at killing people. You do double damage on your first attack against somebody.",
    "page": 11
  },
  {
    "name": "Barbarian",
    "category": "Fantasy",
    "setting": "core",
    "ability": "In tune with nature and good at smashing stuff. When outdoors, in a natural environment add 1 to all your damage scores.",
    "page": 11
  },
  {
    "name": "Cleric",
    "category": "Fantasy",
    "setting": "core",
    "ability": "You can turn the undead. Make a Style check vs. their Defence. If you succeed they can't come within 10 feet of you for an hour.",
    "page": 11
  },
  {
    "name": "Druid",
    "category": "Fantasy",
    "setting": "core",
    "ability": "You can speak to animals. That doesn't make them suddenly intelligent, though.",
    "page": 11
  },
  {
    "name": "Knight",
    "category": "Fantasy",
    "setting": "core",
    "ability": "Chivalry is your middle name. You can take damage for an adjacent ally.",
    "page": 11
  },
  {
    "name": "Ninja",
    "category": "Fantasy",
    "setting": "core",
    "ability": "You can turn invisible for a minute once a day.",
    "page": 11
  },
  {
    "name": "Outlaw",
    "category": "Fantasy",
    "setting": "core",
    "ability": "You're wanted by the law! Wait, that's not a useful ability. But you do have a free hideout where you can't be found.",
    "page": 11
  },
  {
    "name": "Pirate",
    "category": "Fantasy",
    "setting": "core",
    "ability": "Scourge of the Seven Seas! Aaar matey! You have either a hook hand (+1 unarmed damage) or a parrot. Or both, if you like.",
    "page": 11
  },
  {
    "name": "Ranger",
    "category": "Fantasy",
    "setting": "core",
    "ability": "You are amazing at tracking things. In outdoor environments you can stay on the trail of another person or creature as long as you are no more than a day behind.",
    "page": 11
  },
  {
    "name": "Samurai",
    "category": "Fantasy",
    "setting": "core",
    "ability": "You can spend a Karma point to use your Ki! When you do that, your attack with your deadly katana does double damage.",
    "page": 11
  },
  {
    "name": "Slayer",
    "category": "Fantasy",
    "setting": "core",
    "ability": "What do you slay? Vampires? Probably. You do double damage to the thing you slay. No, you can't choose humans.",
    "page": 11
  },
  {
    "name": "Wizard",
    "category": "Fantasy",
    "setting": "core",
    "ability": "You can do magic! You have a Power stat, although you don't get extra points to distribute.",
    "power": true,
    "page": 11
  },
  {
    "name": "Actor",
    "category": "Occupations",
    "setting": "core",
    "ability": "Star of stage and screen, you are great at pretending to be somebody else. Your disguises always work.",
    "page": 11
  },
  {
    "name": "Archaeologist",
    "category": "Occupations",
    "setting": "core",
    "ability": "You've raided tombs and lost arks. If there's a trap, you can spend a Karma point to circumvent it.",
    "page": 11
  },
  {
    "name": "Astronaut",
    "category": "Occupations",
    "setting": "core",
    "ability": "All that time in zero-g means you just don't get sick any more. You're immune to the feeling of nausea.",
    "page": 12
  },
  {
    "name": "Athlete",
    "category": "Occupations",
    "setting": "core",
    "ability": "You can move twice as far in your turn. Normally you can move 10 feet per point of Moves, but you're an Athlete — you can move 20 feet per point of Moves!",
    "page": 12
  },
  {
    "name": "Bounty Hunter",
    "category": "Occupations",
    "setting": "core",
    "ability": "You can spend a day, and at the end of it determine the location of any individual person or creature. Catching them might be another matter!",
    "page": 12
  },
  {
    "name": "Boxer",
    "category": "Occupations",
    "setting": "core",
    "ability": "With a quick One-Two, and swift K.O., you really know how to punch. Your unarmed damage increases by 1. And also, once per day, when you would normally be Knocked Out, you can choose to remain on 1 Health.",
    "page": 12
  },
  {
    "name": "Burglar",
    "category": "Occupations",
    "setting": "core",
    "ability": "Sneaky does it! Up that wall, through the window, crack the safe! Locks mean nothing to you.",
    "page": 12
  },
  {
    "name": "Chef",
    "category": "Occupations",
    "setting": "core",
    "ability": "You can cook up an amazing meal in an hour, which gives everybody 1 Health back. Plus you do +1 damage with knives.",
    "page": 12
  },
  {
    "name": "Con Artist",
    "category": "Occupations",
    "setting": "core",
    "ability": "Liar, liar, pants on fire! You have a collection of very convincing fake IDs, and can pull out any one you need at a moment's notice.",
    "page": 12
  },
  {
    "name": "Cowboy",
    "category": "Occupations",
    "setting": "core",
    "ability": "Yeehaw! Fastest gun in the West! When deciding who gets to go first, you get a quick shot in before it all kicks off.",
    "page": 12
  },
  {
    "name": "Detective",
    "category": "Occupations",
    "setting": "core",
    "ability": "Are there any clues? If there are, you spot them automatically. You don't even have to roll any dice!",
    "page": 12
  },
  {
    "name": "Doctor",
    "category": "Occupations",
    "setting": "core",
    "ability": "Medic! You can heal people. For every Karma point you spend, you heal somebody (or yourself) one point of damage. This takes you a minute, but you can spend as much Karma as you like.",
    "page": 12
  },
  {
    "name": "Engineer",
    "category": "Occupations",
    "setting": "core",
    "ability": "If something is broken, you can fix it within an hour. Well, within reason. Not like the Golden Gate Bridge or something, but a vending machine or a car.",
    "page": 12
  },
  {
    "name": "Gambler",
    "category": "Occupations",
    "setting": "core",
    "ability": "You rely on luck. Any time when there's equal chances of something, you can spend a Karma point and it works out in your favor.",
    "page": 12
  },
  {
    "name": "Gangster",
    "category": "Occupations",
    "setting": "core",
    "ability": "You know how to make someone an offer they can't refuse. You gain the Intimidation Focus for free, in addition to whatever other Focus you choose for your Brawn Stat.",
    "grantsFocus": [
      "Intimidating"
    ],
    "page": 12
  },
  {
    "name": "Hacker",
    "category": "Occupations",
    "setting": "core",
    "ability": "Breaking into computer systems is what you do. You can circumvent computer security. It usually takes you about an hour.",
    "page": 12
  },
  {
    "name": "Hermit",
    "category": "Occupations",
    "setting": "core",
    "ability": "You live alone. People aren't much use to you. When you're acting alone, without allies, you get an extra die.",
    "page": 13
  },
  {
    "name": "Inventor",
    "category": "Occupations",
    "setting": "core",
    "ability": "A gadget for every occasion. You can spend a Karma point to pull out a gadget which helps you with your next dice roll. You have to describe the gadget. Basically, you get double value from Karma points - two extra dice instead of one.",
    "page": 13
  },
  {
    "name": "Musician",
    "category": "Occupations",
    "setting": "core",
    "ability": "Sing me a song, oh music man! You can make music, and everyone who can hear it is affected. Roll your Style Stat vs. their Smarts Stat, or they are basically dazed for a minute. Unless you do something to snap them out of it like hit them or make a loud noise. After the minute they can't be affected again.",
    "page": 13
  },
  {
    "name": "Pilot",
    "category": "Occupations",
    "setting": "core",
    "ability": "You know how to fly planes. Or spaceships.",
    "page": 13
  },
  {
    "name": "Priest",
    "category": "Occupations",
    "setting": "core",
    "ability": "The undead cannot harm you. They're still pretty scary, though.",
    "page": 13
  },
  {
    "name": "Professor",
    "category": "Occupations",
    "setting": "core",
    "ability": "You know stuff. You get free Focuses in History, Languages, and Theology.",
    "grantsFocus": [
      "History",
      "Languages",
      "Theology"
    ],
    "page": 13
  },
  {
    "name": "Reporter",
    "category": "Occupations",
    "setting": "core",
    "ability": "Nothing can keep you from that scoop! You know how to ask the right question. Once per day, you can ask an Extra a question. You get the answer if they know it. Just the one question, mind, so choose wisely!",
    "page": 13
  },
  {
    "name": "Scientist",
    "category": "Occupations",
    "setting": "core",
    "ability": "If a monster has a weakness, you know it automatically. It's just a question of physics.",
    "page": 13
  },
  {
    "name": "Smuggler",
    "category": "Occupations",
    "setting": "core",
    "ability": "You're pretty good at hiding things. If you have something hidden about your person, or in your vehicle, or your spaceship, or your… well, you get the idea. Anyway, they won't find it.",
    "page": 13
  },
  {
    "name": "Soldier",
    "category": "Occupations",
    "setting": "core",
    "ability": "You are great at tactics. When deciding who goes first, it's you.",
    "page": 13
  },
  {
    "name": "Spy",
    "category": "Occupations",
    "setting": "core",
    "ability": "You know how to make the bad guy give you a monologue explaining their whole plan. Weirdly, time kinda freezes while they do it. Then they laugh manically, or something.",
    "page": 13
  },
  {
    "name": "Student",
    "category": "Occupations",
    "setting": "core",
    "ability": "Funny how heroes often seem to be high school kids! You have homework, and the principal is on your back. But you can pretty much get away with stuff because you're a kid. People just overlook you. More fool them!",
    "page": 13
  },
  {
    "name": "Stuntman",
    "category": "Occupations",
    "setting": "core",
    "ability": "You never seem to get injured. You take damage, but you always manage to get up again — you recover ALL your Health every day.",
    "page": 13
  },
  {
    "name": "Speedster",
    "category": "Superheroes",
    "setting": "core",
    "ability": "You go fast. Real fast. Each turn you get two actions instead of one.",
    "page": 14
  },
  {
    "name": "Vigilante",
    "category": "Superheroes",
    "setting": "core",
    "ability": "The criminals are all afraid of you, and rightly so. Once per day you can make a Style roll vs. a criminal's Smarts, and if you win they basically surrender and beg you not to hurt them. If you lose, they laugh and probably try to kill you, and you can't use this ability against them ever again.",
    "page": 14
  },
  {
    "name": "Demonologist",
    "category": "Ghostbreakers",
    "setting": "spirits",
    "ability": "You know how to hurt demons. You do an extra point of damage whenever you successfully attack a demon.",
    "page": 39
  },
  {
    "name": "Exorcist",
    "category": "Ghostbreakers",
    "setting": "spirits",
    "ability": "By chanting prayers and holding forth the symbol of your faith, you can make a Style attack against a ghost or demon’s Defence, and if you are successful you do 1 point of damage to them and they cannot approach you for one minute.",
    "page": 39
  },
  {
    "name": "Botanist",
    "category": "New Occupations",
    "setting": "montana",
    "ability": "You love plants. You can identify any plant without a roll, including substances made from plants (we're looking at you, poisons). Also, plant creatures won't attack you. Everyone else is fair game, though.",
    "page": 83
  },
  {
    "name": "Double-Agent",
    "category": "New Occupations",
    "setting": "montana",
    "ability": "You're a bit like a spy, only you enjoy dressing up in the uniform of the bad guys and gals. If you put on an enemy uniform to fool your foes, your disguise always works.",
    "page": 83
  },
  {
    "name": "Socialite",
    "category": "New Occupations",
    "setting": "montana",
    "ability": "You are one of the social elite, or perhaps your fame or notoriety means you get invited to all the top parties. Either way, your name is always on the guest list.",
    "page": 83
  },
  {
    "name": "Witch",
    "category": "New Occupations",
    "setting": "montana",
    "ability": "You made a deal with the devil. It cost you your soul, but you gained some supernatural gifts. You have a Power stat. You can also use your Evil Eye to steal Karma from others: make an opposed roll against a target's Smarts. If it succeeds, the target loses 1 Karma point and you gain 1. You still gain 1 Karma from Mooks and Extras even if they don't have any to lose. You can't use your Evil Eye on other Heroes, and you can only use it on each Mook or Extra once.",
    "power": true,
    "page": 83
  },
  {
    "name": "Brain",
    "category": "Strange Science",
    "setting": "strange",
    "ability": "You're clever and you know stuff. Usually the stuff you know is really nerdy. Sometimes it's actually useful. You can spend a Karma point to ask the Director a single 'yes/no' question which they will answer honestly. The question should be about the game, not the Director's personal life!",
    "page": 105
  },
  {
    "name": "Cheerleader",
    "category": "Strange Science",
    "setting": "strange",
    "ability": "Everybody loves you (or at least pretends to). Plus you can do acrobatics and stuff. But mainly, you can cheer people on to be their best selves. You are able to grant your Karma points to your friends.",
    "page": 105
  },
  {
    "name": "Outsider",
    "category": "Strange Science",
    "setting": "strange",
    "ability": "You don't fit in. Always a loner, you have learned to be very observant and you always know when somebody is lying.",
    "page": 105
  },
  {
    "name": "Protector",
    "category": "Strange Science",
    "setting": "strange",
    "ability": "You're in security. All you care about is helping others. If one of your fellow Heroes takes damage, you can choose to take it for them.",
    "page": 105
  },
  {
    "name": "Radio Presenter",
    "category": "Strange Science",
    "setting": "strange",
    "ability": "A face made for radio, eh? Your weapon of choice is your voice, and you know how to use it. You can make a Style check vs. Smarts to mesmerize somebody for one minute. If it doesn't work, though, they find you really annoying.",
    "page": 106
  },
  {
    "name": "Tycoon",
    "category": "Strange Science",
    "setting": "strange",
    "ability": "You're not just a businessperson, you're a successful businessperson! Choose $1,000,000 worth of property and gear and stuff. It's yours. You earned it.",
    "page": 106
  },
  {
    "name": "Captain",
    "category": "Starship Crew",
    "setting": "beam",
    "ability": "You command a starship. You are so inspiring that you have 10 Karma instead of 6. You can also spend your Karma on another Hero's behalf, granting them one of the Karma benefits from the core rules, although you can't do this if they've spent their own Karma in the same round.",
    "page": 139
  },
  {
    "name": "Chief Engineer",
    "category": "Starship Crew",
    "setting": "beam",
    "ability": "To you, starships are a living, breathing thing. Once per day if you are in the engineering section, you can spend a Karma point to cause a starship to regain 1 Health or 1 Shield without a roll, or to make your ship go one warp speed factor faster than the Owner's Manual says you should be able to. The warranty is voided if you do this.",
    "page": 139
  },
  {
    "name": "Comms Officer",
    "category": "Starship Crew",
    "setting": "beam",
    "ability": "Communication is key when you're out travelling the galaxy meeting new species, especially when there won't always be a universal translator to hand. You can understand and speak any language you encounter.",
    "page": 139
  },
  {
    "name": "Hologram",
    "category": "Starship Crew",
    "setting": "beam",
    "ability": "You are a hologram that manifests an advanced artificial intelligence to fulfil a specific role within the ship. You don't have a Health score and can't go unconscious or die, although destroying the synthesizer that lets you join away crews or the destruction of your starship will be pretty bad for you. You can't physically interact with anything, but you can talk and stuff.",
    "page": 139
  },
  {
    "name": "Gunner",
    "category": "Starship Crew",
    "setting": "beam",
    "ability": "Security might get to blaze hostile aliens but you get to go pew! pew! with a starship! If you're on the bridge and in control of the ship's weapons, increase any damage the weapons cause by 1.",
    "page": 139
  },
  {
    "name": "Ship Counsellor",
    "category": "Starship Crew",
    "setting": "beam",
    "ability": "You're not only a great listener but also know how to bring people around to a more positive outlook. Once per day per Hero, you can spend a minute listening to their problems and help them regain 1 Health. Also, you always know when somebody is lying.",
    "page": 140
  },
  {
    "name": "Pilot",
    "category": "Starship Crew",
    "setting": "beam",
    "ability": "You know how to fly starships, but you can also get them to do cool stuff! You can spend a Karma point to increase a starship's Defence by 2 for one round.",
    "page": 140
  },
  {
    "name": "Watch Captain",
    "category": "Orcs & Oubliettes",
    "setting": "orcs",
    "ability": "You've worked your way through the ranks and now look after your own merry band of constables and special investigators. Your badge gets you entrance into everywhere but the thieves' guilds—those are by appointment only—plus you can spend a Karma point once per scene to ask the Director for an important clue. Just the one mind. And if there aren't any clues, you don't spend the Karma point.",
    "page": 169
  },
  {
    "name": "Sprite",
    "category": "Orcs & Oubliettes",
    "setting": "orcs",
    "ability": "Thanks to faerie dust and a set of glimmering wings, you can fly for a number of rounds equal to three times your Moves. After that, you need to rest for the same number of rounds that you spent flying before being able to fly again. Or you can spend 1 Karma to refresh your flying to zero rounds. You can't ever have a Brawn higher than 2 but you do start the game with 2 extra Karma. You also never take falling damage but gently drift to the ground like a feather.",
    "page": 169
  },
  {
    "name": "Troll",
    "category": "Orcs & Oubliettes",
    "setting": "orcs",
    "ability": "You're massive, strong and generally only attractive to other members of your species. You gain the Tough Focus for free, in addition to whatever other Focus you choose for your Brawn Stat and you deal 1 extra damage with your fists or weapons in melee. You also eat a lot and you're not too fussy about flavour.",
    "grantsFocus": [
      "Tough"
    ],
    "page": 169
  },
  {
    "name": "Cyborg",
    "category": "Wasteland",
    "setting": "domes",
    "ability": "Part of your body is replaced with machinery, making you a tough opponent. You may spend a Karma point to make a Brawling attack and do double damage.",
    "page": 206
  },
  {
    "name": "Driver",
    "category": "Wasteland",
    "setting": "domes",
    "ability": "You are a wizard of the road, able to push vehicles long after their expiration date across the Waste. You gain the Driving focus for free, in addition to whatever other Focus you choose for your Moves stat.",
    "grantsFocus": [
      "Driving"
    ],
    "page": 206
  },
  {
    "name": "Entertainer",
    "category": "Wasteland",
    "setting": "domes",
    "ability": "In a world without smartphones, game consoles, and streaming services, entertainment is in short supply. All eyes are on you when you perform, granting the other Heroes a bonus circumstance die on their non-combat actions while you are performing.",
    "page": 206
  },
  {
    "name": "Gladiator",
    "category": "Wasteland",
    "setting": "domes",
    "ability": "You've toughened yourself up for blood sports. Basically, you're an Ogre. You get an extra +1 to your Brawn Stat, and an extra +2 Health.",
    "statMods": {
      "Brawn": 1
    },
    "healthBonus": 2,
    "page": 206
  },
  {
    "name": "Mechanic",
    "category": "Wasteland",
    "setting": "domes",
    "ability": "You keep the machines running, even when they are falling apart around you. For every Karma point you spend, you can scrounge up enough material to repair 1 point of Health to a vehicle. This takes you a round, but you can spend as much Karma as you like.",
    "page": 206
  },
  {
    "name": "Mutant",
    "category": "Wasteland",
    "setting": "domes",
    "ability": "The Boom has granted you special abilities. You have a Power stat, although you don't get extra points to distribute.",
    "power": true,
    "page": 206
  },
  {
    "name": "Survivalist",
    "category": "Wasteland",
    "setting": "domes",
    "ability": "You know your way through the wastes. You never get lost and you can always secure enough food and adequate shelter for you and your friends.",
    "page": 206
  },
  {
    "name": "Warrior",
    "category": "Wasteland",
    "setting": "domes",
    "ability": "Anyone that sees you knows that you are a true Wasteland Warrior. You gain the Armor focus for free, in addition to whatever other Focus you choose for your Moves stat.",
    "grantsFocus": [
      "Armor"
    ],
    "page": 206
  },
  {
    "name": "Fortune Teller",
    "category": "Occupations",
    "setting": "bite",
    "ability": "You are a well-intentioned practitioner of the occult (white witch, Wiccan, nose-twitcher…) with a knack for portents of the future. You gain the Power stat but no additional points to add to it. You also gain a bonus 1d6 when using a tarot deck and instinctively know if a spirit conversing via a Ouija board is a harmful one.",
    "power": true,
    "page": 239
  },
  {
    "name": "Paranormal Investigator",
    "category": "Occupations",
    "setting": "bite",
    "ability": "Creatures of Darkness are out there, you know it — you just need to find one to prove it, though every investigation so far has proven to be an elaborate hoax. You gain a bonus 1d6 when searching for clues and interacting with any local authorities. You also begin the game with a brightly coloured, mid-sized van called the Mystery Wagon.",
    "page": 239
  },
  {
    "name": "Ape",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "You're a walking, talking ape! You can jump 30 feet in the air with no effort. Also, when you throw things, you do an extra point of damage!",
    "page": 271
  },
  {
    "name": "Badger",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "Badgers are fierce and super angry. You regain +1 Karma every time you do melee damage in a fight.",
    "page": 271
  },
  {
    "name": "Bat",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "You can fly, and you can use your echolocation to see in the dark. And you're pretty good at hiding, getting +1 die when you try to be stealthy.",
    "page": 271
  },
  {
    "name": "Bear",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "You're big and tough and kinda cuddly. You get +3 Health.",
    "healthBonus": 3,
    "page": 271
  },
  {
    "name": "Cat",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "Agile and sneaky though you are, your main power is your nine lives! Roll a die; that's how many lives you have left. When you would normally be Knocked Out, instead you remain at 1 Health.",
    "page": 271
  },
  {
    "name": "Crocodile",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "Those big snapping teeth do 3 damage. Ouchy!",
    "page": 271
  },
  {
    "name": "Crow",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "You can fly. You don't have to be a crow; you can pick a different bird if you want.",
    "page": 271
  },
  {
    "name": "Dog",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "A loyal companion, if there's something to smell you can always smell it. Also, sometimes you smell, and you like fetching things. Good dog!",
    "page": 271
  },
  {
    "name": "Donkey",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "Stubborn as a mule. You cannot be mind controlled or mentally influenced in any way.",
    "page": 272
  },
  {
    "name": "Duck",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "Ducks can swim and fly and quack. Some of these things are more useful than others.",
    "page": 272
  },
  {
    "name": "Elephant",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "Elephants never forget. You can produce random useful pieces of knowledge from the recesses of your mind. Simply ask the Director, spend 1 Karma, and they'll tell you something super useful. Oh, also you get +1 Brawn.",
    "statMods": {
      "Brawn": 1
    },
    "page": 272
  },
  {
    "name": "Fox",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "You are oh so cunning! You'd make a great detective… or a great criminal! You get +2 Karma and your Smarts score increases by 1.",
    "statMods": {
      "Smarts": 1
    },
    "page": 272
  },
  {
    "name": "Frog",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "Bouncing and jumping all over the place with ease! You can scale great heights with your prodigious leap—heights and distances of up to 60 feet. You also have a sticky tongue which lets you grab things from about 15 feet away.",
    "page": 272
  },
  {
    "name": "Hamster",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "Hamsters store stuff in their cheeks. You can spend 1 Karma and automatically pull out an item with a target number of 10 or less.",
    "page": 272
  },
  {
    "name": "Hippo",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "Hippos are the most dangerous animal in the world, and super territorial. If anybody comes within 10 feet of you, you have to make a Smarts 10 check to avoid bopping them (making a melee attack).",
    "page": 272
  },
  {
    "name": "Jackal",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "Jackals are wily scavengers, which makes you really good at finding things. If you're looking for something and it's within 10 feet of you, you find it.",
    "page": 272
  },
  {
    "name": "Kangaroo",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "Kangaroos pack one heck of a punch! Your punch does an extra point of damage. Most people try to ignore the boxing gloves.",
    "page": 272
  },
  {
    "name": "Lion",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "You can roar really loudly. Make a Style check vs. the Style of anybody (except your friends) within sight who can hear you. Anybody you beat becomes afraid and cannot approach you for one minute.",
    "page": 272
  },
  {
    "name": "Lizard",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "You can change color. That makes it easy to hide, giving you a +1 die when you do, but it also makes you very stylish, giving you +1 Style.",
    "statMods": {
      "Style": 1
    },
    "page": 272
  },
  {
    "name": "Mole",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "You are very shortsighted and take a penalty of -1 die to ranged attacks, but you can dig! You can dig underground and move through the earth, under walls, and emerge wherever you wish.",
    "page": 273
  },
  {
    "name": "Monkey",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "You can climb, you can swing. As long as you are in an area with enough things to grab on, you are effectively able to fly. Plus, you get +2 Defence.",
    "page": 273
  },
  {
    "name": "Mouse",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "You are a master of stealth. You'd make a great secret agent! When you sneak you get an extra two dice to roll.",
    "page": 273
  },
  {
    "name": "Ostrich",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "You can ignore things, and when you ignore things they don't exist for you. You can designate a creature or object and choose to ignore it. That creature or object is unable to affect you, but you are unable to affect it. It's like it simply isn't there.",
    "page": 273
  },
  {
    "name": "Owl",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "Owls are wise and perceptive. You can see in the dark, and also you can fly. And you can swivel your head round.",
    "page": 273
  },
  {
    "name": "Pig",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "Pigs can eat anything. You gain 1 Health by spending a minute eating. Doesn't matter what.",
    "page": 273
  },
  {
    "name": "Platypus",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "You're such a ridiculous animal that everybody does a double take when they see you. You can make a Style vs. Smarts roll against a target nearby, and if you win they spend the next round gawping in bewilderment.",
    "page": 273
  },
  {
    "name": "Porcupine",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "You're covered in spiky quills. Whenever somebody makes a melee attack against you they automatically take 1 damage.",
    "page": 273
  },
  {
    "name": "Rabbit",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "You are great at running away. In any situation, as long as you're not trapped or restrained, you can run away easily.",
    "page": 273
  },
  {
    "name": "Rat",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "Rats can chew through anything. It takes you a minute, but you can bite through any restraints, and in an hour you can chew through a door.",
    "page": 273
  },
  {
    "name": "Rhino",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "When you charge at somebody within 30 feet, you deal double damage with any melee attack. If they're your size or smaller, you also knock them down.",
    "page": 274
  },
  {
    "name": "Skunk",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "You can emit a horrible smell. Anybody nearby (yes, that includes your friends!) must make a Brawn 15 roll or spend the next turn doubled over in disgust.",
    "page": 274
  },
  {
    "name": "Snake",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "You can sway back and forth and hypnotize your prey. Make a Style vs. Smarts roll. If you win, your target will do one thing you say, but they won't harm themselves. Then you can't hypnotize that target again.",
    "page": 274
  },
  {
    "name": "Squirrel",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "With your big bushy tail, you're so cute! You can run up trees to escape from dogs and supervillains alike. Also, you like nuts.",
    "page": 274
  },
  {
    "name": "Tiger",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "You're big and fierce, and everybody knows not to mess with you. You get +1 die when you attack and you do +1 damage with any melee attack. Rawwr!",
    "page": 274
  },
  {
    "name": "Turtle",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "A hero in a half shell, you reduce all damage done to you by 1 point.",
    "page": 274
  },
  {
    "name": "Velociraptor",
    "category": "Talking Animals",
    "setting": "aaah",
    "ability": "You live to hunt your prey—spend a Karma point to designate a prey that you can see. You get an extra die with any rolls against that target, but you cannot switch to a new prey until that target is reduced to 0 Health or a day has passed.",
    "page": 274
  }
];
