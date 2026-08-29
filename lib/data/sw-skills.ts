// GENERATED FILE - do not edit by hand.
// Source: data/sw/parts/*.json - regenerate with: node scripts/build-sw-data.mjs

import type { SwSkill } from "./sw-types";

export const SW_SKILLS: SwSkill[] = [
  {
    "name": "Blaster",
    "attribute": "Dexterity",
    "description": "Used to fire blasters. A successful skill roll means you've hit your target. This skill can be used with blaster pistols, blaster rifles, heavy blasters, and anything in between. It doesn't apply to fixed or multi-crew blaster weapons (use the heavy weapons skill instead), or to weapons mounted on starships (use the gunnery skill).",
    "time": "one combat round",
    "book": "core",
    "page": 31
  },
  {
    "name": "Brawling Parry",
    "attribute": "Dexterity",
    "description": "A reaction skill against brawling attacks, used exactly like melee parry: a full brawling parry adds the roll to the attacker's difficulty (haste and movement only), while a combat brawling parry substitutes the roll for the difficulty at -1D to other actions. An attack and a parry with the same degree of haste are resolved simultaneously. The parry must be at a haste equal to or greater than the attack. Reaction skills may not be combined.",
    "time": "one round",
    "book": "companion",
    "reaction": true,
    "page": 14,
    "superseded": {
      "name": "Brawling Parry",
      "attribute": "Dexterity",
      "description": "Used to parry another character's attack in hand-to-hand combat without weapons. This is a reaction skill. Brawling parry only works against brawling attacks, not melee attacks.",
      "time": "instantaneous",
      "book": "core",
      "page": 31,
      "reaction": true
    }
  },
  {
    "name": "Dodge",
    "attribute": "Dexterity",
    "description": "A reaction skill with two options. Full dodge, declared in the Declare Actions segment: add the dodge roll to the attacker's difficulty number; the character may only add haste and movement actions (including maneuver or overspeed but not ramming). A speed action is required, but it does not reduce the dodge roll. Combat dodge, declared in the Declare Reaction Skills segment: the defender rolls dodge and then chooses either his dodge roll or the original difficulty as the attacker's difficulty; it lowers the character's other skill codes by 1D. One dodge roll affects all attacks of the appropriate type for the round, but a dodge does not affect a melee attacker. A dodge must be at a haste equal to or greater than the attack being dodged. Dodge is also the operator skill for a character moving on land: roll dodge (plus nothing, since characters have no speed code) against the movement difficulty. Dodge may not be combined.",
    "time": "one round",
    "book": "companion",
    "reaction": true,
    "page": 14,
    "superseded": {
      "name": "Dodge",
      "attribute": "Dexterity",
      "description": "Used to dodge blaster fire, other fire weapons, and grenades. This is a reaction skill. When someone fires at you, roll your dodge dice; the number rolled is added to the firer's difficulty number. A dodge affects all fire and grenade attacks in the same action segment. Dodge doesn't affect brawling or melee attacks.",
      "time": "instantaneous",
      "book": "core",
      "page": 31,
      "reaction": true
    }
  },
  {
    "name": "Grenade",
    "attribute": "Dexterity",
    "description": "Make a skill roll when a character throws a grenade. Success means the grenade has hit its target; failure means it scatters (roll one die on the scatter diagram for direction and 3D for meters).",
    "time": "one combat round",
    "book": "core",
    "page": 31
  },
  {
    "name": "Heavy Weapons",
    "attribute": "Dexterity",
    "description": "Used to fire vehicle-mounted blasters (such as those on speeder bikes), turbolasers, lasercannon, and the like — any weapon which is not hand-held, and not fired in space. For hand-held weapons, use the blaster skill; for those fired in space, use gunnery.",
    "time": "one combat round",
    "book": "core",
    "page": 31
  },
  {
    "name": "Melee Parry",
    "attribute": "Dexterity",
    "description": "A reaction skill against melee attacks, with the same full and combat options as dodge: a full parry (declared with actions) adds the parry roll to the attacker's difficulty and restricts the character to haste and movement; a combat parry (declared in the reaction segment) lets the character substitute his parry roll for the attacker's difficulty at a cost of 1D to other actions. One parry roll covers all melee attacks that round; a character attacked by both blaster and sword must both dodge and parry. A parry must be at a haste equal to or greater than the attack. Reaction skills may not be combined.",
    "time": "one round",
    "book": "companion",
    "reaction": true,
    "page": 14,
    "superseded": {
      "name": "Melee Parry",
      "attribute": "Dexterity",
      "description": "Used to parry with a melee weapon. This is a reaction skill. Only characters carrying melee weapons can use melee parry; it can parry melee attacks and brawling attacks.",
      "time": "instantaneous",
      "book": "core",
      "page": 31,
      "reaction": true
    }
  },
  {
    "name": "Melee Weapons",
    "attribute": "Dexterity",
    "description": "This skill is used when a character uses a weapon in hand-to-hand combat — whether a blaster butt, a gaderffii, a bayonet — whatever. Damage is the weapon's code plus the character's strength.",
    "time": "one combat round",
    "book": "core",
    "page": 31
  },
  {
    "name": "Lightsaber",
    "attribute": "Dexterity",
    "description": "An archaic weapon skill printed on some templates. Lightsabers are used with the lightsaber skill, not melee weapons. A lightsaber's damage does not depend on strength; a character with the control skill adds his control dice to its 5D damage. Only another lightsaber can parry a lightsaber. Characters can learn archaic or unusual weapons during the game by writing the weapon on the blank Dexterity skill line; the starting code equals dexterity.",
    "time": "one combat round",
    "book": "core",
    "page": 31
  },
  {
    "name": "Wookiee Bowcaster",
    "attribute": "Dexterity",
    "description": "Archaic weapon skill printed on the Wookiee template. Used in the same way as other weapon skills, but applies only to the bowcaster. Reloading (after six shots) costs 1D from all die codes but does not take an action segment.",
    "time": "one combat round",
    "book": "core",
    "page": 31
  },
  {
    "name": "Black-Powder Pistol",
    "attribute": "Dexterity",
    "description": "Archaic weapon skill printed on the Tough Native template. Used in the same way as other weapon skills, but applies only to the black-powder pistol. Reloading takes a full combat round.",
    "time": "one combat round",
    "book": "core",
    "page": 31
  },
  {
    "name": "Alien Races",
    "attribute": "Knowledge",
    "description": "Knowledge of non-human sapient species (or, for alien characters, knowledge of humans and other aliens). Includes knowledge of customs and societies as well as physical appearance, modes of thought and the like. Knowledge difficulties: Very Easy 5, Easy (common knowledge) 10, Moderate (no secret, but not widely known) 15, Difficult (specialized knowledge) 20, Very Difficult (only an expert would know) 30.",
    "time": "one combat round",
    "book": "core",
    "page": 32
  },
  {
    "name": "Bureaucracy",
    "attribute": "Knowledge",
    "description": "Knowledge of bureaucracies and their procedures. Used as a knowledge skill (how to get the right form), or as a persuasion skill to obtain cooperation from a bureaucracy. Base difficulty by how restricted the request is: available to all 5; to almost anyone 10; to anyone who qualifies 15; somewhat restricted 20; extremely restricted 30. Modify +10 for extremely unusual requests, +10 for a poorly funded or mismanaged bureaucracy, +10 if officials have reason to distrust the character. Success means the character gets what he wants in short order.",
    "time": "one combat round as knowledge; one day as persuasion",
    "book": "core",
    "page": 32
  },
  {
    "name": "Cultures",
    "attribute": "Knowledge",
    "description": "Knowledge of the customs, histories, arts and politics of various human cultures within the Empire. It is used like other knowledge skills.",
    "time": "one combat round",
    "book": "core",
    "page": 33
  },
  {
    "name": "Languages",
    "attribute": "Knowledge",
    "description": "Used to determine whether a character can understand what someone says in a language other than Basic. Realistic method — difficulty by language: dialect or slang of Basic 5; common language related to Basic 10; common language 15; obscure language (Wookiee) 20; extremely obscure or unpronounceable language 30; a success means the character knows the language. Simple method — difficulty by complexity of the statement: very simple 5; simple 10; average 15; complex 20; complex technical terms 30; anyone who rolls higher understands the statement.",
    "time": "one combat round",
    "book": "core",
    "page": 33
  },
  {
    "name": "Planetary Systems",
    "attribute": "Knowledge",
    "description": "Knowledge of the geography, weather, life forms, trade products, and so on of different planets and systems. Used like other knowledge skills.",
    "time": "one combat round",
    "book": "core",
    "page": 33
  },
  {
    "name": "Streetwise",
    "attribute": "Knowledge",
    "description": "Used to make a contact in the criminal underworld, purchase illegal goods or services, or find someone to do anything illegal. Difficulty by how common the goods or skills are: very common (a lawyer, a blaster) 5; common (a petty thief, drugs) 10; moderate (a good pickpocket, rare drugs) 15; difficult (an expert safecracker, heavy weapons) 20; very difficult (a renowned jewel thief, unregistered spacecraft) 30. Modify +10 for strict local law enforcement, +10 if the character has no contacts in the area, +10 if the underworld distrusts him. Success finds what he wants — getting it still requires bargaining.",
    "time": "one combat round to one day",
    "book": "core",
    "page": 33
  },
  {
    "name": "Survival",
    "attribute": "Knowledge",
    "description": "Knowing how to survive in hostile environments — deserts, jungles, oceans, asteroid belts, etc. Used as a knowledge skill about the natural world; to see whether a character immediately makes the right move when threatened by nature; and to find the necessities of life. Difficulty by familiarity with the environment: intimately familiar 5; familiar 10; somewhat familiar 15; unfamiliar 20; completely unfamiliar 30. Let players use their own knowledge when their plan is plausible.",
    "time": "one combat round for knowledge or reacting to danger; one hour when searching for necessities",
    "book": "core",
    "page": 33
  },
  {
    "name": "Technology",
    "attribute": "Knowledge",
    "description": "Used to improve equipment. After spending the skill points and credits to raise a piece of equipment's die code, the improving character makes a technology roll: the first pip of improvement on a die code is Very Easy, the second Easy, the third Moderate, the fourth Difficult, the fifth and all subsequent pips Very Difficult. On a failure the skill points are wasted, though the equipment still works as before. Standard NPC specialists have 4D; NPCs with more than 4D technology are rare.",
    "time": "character scale 1 day per pip; speeder or walker 3 days; starfighter 1 week; capital ship 1 month; Death Star 2 months",
    "book": "companion",
    "page": 30,
    "superseded": {
      "name": "Technology",
      "attribute": "Knowledge",
      "description": "Knowledge of different kinds of equipment — capabilities, model numbers, fair-market prices, etc. Used like other knowledge skills.",
      "time": "one combat round",
      "book": "core",
      "page": 34
    }
  },
  {
    "name": "Astrogation",
    "attribute": "Mechanical",
    "description": "Used to plot a course for a starship from one star system to another. A standard-duration trip is difficulty 15 (30 without a nav computer); +1 per day saved, -1 per extra day taken; doubled for hasty entry; +5 if the ship is lightly damaged, +10 if heavily damaged. Failure means a mishap.",
    "time": "a minute on a common route with known coordinates (one round in emergencies); a few hours for a new destination; one day if the ship's position must first be fixed",
    "book": "core",
    "page": 35
  },
  {
    "name": "Beast Riding",
    "attribute": "Mechanical",
    "description": "Used to ride animals. Each riding animal has an orneriness code. When a character mounts a riding animal, roll the animal's orneriness dice and the character's skill dice; if the character's roll is equal or greater, he establishes control. If the animal's roll is higher, it runs away or bucks him off. Roll again whenever something spooks the beast. Also used to retain control, like vehicle operation skills; the animal's speed code is used in chases.",
    "time": "one combat round",
    "book": "core",
    "page": 35
  },
  {
    "name": "Repulsorlift Craft Operation",
    "attribute": "Mechanical",
    "description": "Used to operate all kinds of repulsorlift craft — landspeeders, speeder bikes, sail barges, and all sorts of air, ground and water vehicles that use repulsorlift (antigravity) technology. Call for a roll only for dangerous, risky or difficult maneuvers: very easy 5 (tight corner at moderate speed); easy 10 (tight corner at high speed); moderate 15 (following another vehicle around a corner at top speed); difficult 20 (following a speeder bike through the forests of Endor); very difficult 30 (the Falcon through an asteroid field while evading fire). In chases, add the vehicle's speed roll to the driver's skill roll each round.",
    "time": "one combat round",
    "book": "core",
    "page": 36
  },
  {
    "name": "Starship Gunnery",
    "attribute": "Mechanical",
    "description": "Used to fire a starship's guns in combat. The operator rolls his gunnery dice plus the weapon's fire control dice against a difficulty of 5 at point-blank, 10 short, 15 medium, 20 long range, modified by the target's evasion.",
    "time": "one combat round",
    "book": "core",
    "page": 36
  },
  {
    "name": "Starship Piloting",
    "attribute": "Mechanical",
    "description": "Besides moving the ship (roll starship piloting plus the sublight code against the movement difficulty), the pilot uses this skill for evasion, the starship reaction skill. Full evasion (declared with actions) adds the evasion roll to the attacker's difficulty; the pilot may only add haste or movement actions, needs a speed action which does not reduce the evasion, and every gunner aboard adds the evasion roll to his difficulty while other actions aboard are +5 (or the evasion roll, whichever is less) and shielding rolls are -5 (or the evasion roll). Combat evasion works like a combat dodge: the pilot's skill plus maneuver roll may be substituted for the attacker's difficulty and it affects nobody else aboard. Full evasion may have its haste increased in the reaction segment so the pilot can still open or close the range. Starship piloting may not be combined.",
    "time": "one round",
    "book": "companion",
    "reaction": true,
    "page": 17,
    "superseded": {
      "name": "Starship Piloting",
      "attribute": "Mechanical",
      "description": "Used to operate starships. In combat, the pilot can add his piloting roll to the ship's speed roll, and can evade enemy fire by rolling the ship's maneuverability dice plus his piloting dice and adding the total to the firer's difficulty number. For purposes of evasion, piloting is a reaction skill.",
      "time": "one combat round",
      "book": "core",
      "page": 36,
      "reaction": true
    }
  },
  {
    "name": "Starship Shields",
    "attribute": "Mechanical",
    "description": "Shielding is a reaction skill, declared during the Declare Combat Reaction Skills segment and rolled in order of haste. The shields roll is added to the attacker's difficulty number; the sum is the shield number. An attacker who rolls above the difficulty but below the shield number hits the ship, but the shield dice are added to the hull dice against damage; at or above the shield number only the hull resists. Shields may be combined only on a ship with more than one shield and an operator for each. In capital ship combat the operator may declare a shutdown of a damaged shield facing (Moderate; -1D for the declaration) or increase power to one facing by burning out another (Difficult; -1D to other shielding rolls); against starfighters the shields roll is die-capped at 5.",
    "time": "one round",
    "book": "companion",
    "reaction": true,
    "page": 18,
    "superseded": {
      "name": "Starship Shields",
      "attribute": "Mechanical",
      "description": "Used to operate a starship's shields in combat. Starship shields is a reaction skill; a separate roll is needed for each attack shielded against. Difficulty is 10 at long range, 15 at medium, 20 at short. Success adds the ship's shield dice to its hull roll against that attack.",
      "time": "one combat round",
      "book": "core",
      "page": 36,
      "reaction": true
    }
  },
  {
    "name": "Bargain",
    "attribute": "Perception",
    "description": "Persuasion skill used when a player character bargains with an NPC — haggling over a price, diplomatic negotiations, bribes. Resolved as an opposed roll of bargain skills; the higher roller gets the better part of the deal. Price: PC roll at least three times the NPC's — half of average cost; at least twice — three-quarters; higher — up to 10% off; tied — average; NPC higher — up to 10% more; NPC at least double — 50% more; NPC at least triple — double. For bribes, use a difficulty by the target's honesty (5 corrupt judge, 10 maitre d', 15 planetary official, 20 Imperial official, 30 Imperial Naval officer), modified by the size of the bribe (1,000,000 credits -20; 100,000 -15; 10,000 -10; 1,000 -5; 100 0; 10 +5; 1 +15). Stormtroopers cannot be bribed. Not used against player characters.",
    "time": "a minute",
    "book": "core",
    "page": 36
  },
  {
    "name": "Command",
    "attribute": "Perception",
    "description": "Command is the skill used to combine fire. The maximum number of characters who may combine fire equals the command skill of the character coordinating the attack; he may do other things, such as fire or dodge, but these lower his command code by 1D for every action beyond the first. Taking a command action also lets the lead firer be switched. In capital ship combat the commander must allocate 1D of command to each of the pilot, chief gunnery officer and chief shields officer (or that officer suffers -1D), and may spend further command actions to give a subordinate +1 pip, coordinate the guns of one additional ship, or order differing levels of haste to different batteries (-1D each). Command determines declaration order in capital ship combat and may never be reduced below zero.",
    "time": "one round",
    "book": "companion",
    "page": 7,
    "superseded": {
      "name": "Command",
      "attribute": "Perception",
      "description": "Persuasion skill used to make an NPC do what the user wants — by ordering him in a persuasive and authentic tone. Difficulty: NPCs have every reason to obey 5; some reason to obey 10; no reason to disobey 15; skeptical or suspicious 20; every reason to be suspicious 30. A roll equal to or higher than the difficulty means the targets do as requested. Not used against player characters.",
      "time": "one combat round",
      "book": "core",
      "page": 41
    }
  },
  {
    "name": "Con",
    "attribute": "Perception",
    "description": "Persuasion skill used to persuade an NPC to do something that isn't in the NPC's best interests, by reasoned argument, false logic, or a verbal smokescreen. Difficulty by how likely the target is to believe the character: your own grandmother 5; a naive teenager 10; a stormtrooper without contrary orders 15; a customs inspector 20; Jabba the Hutt 30. Modify +10 if the target distrusts or hates the character, +10 if what they are asked to do risks their lives. Stormtroopers can be conned.",
    "time": "one combat round to several minutes",
    "book": "core",
    "page": 41
  },
  {
    "name": "Gambling",
    "attribute": "Perception",
    "description": "Used to increase your odds of winning at gambling if playing honestly — and to cheat. Purely random games are decided randomly. In a skill game played honestly, roll each participant's gambling dice; the highest wins. A cheater automatically wins; anyone who rolls higher than the cheater on a gambling roll knows he's cheating. If several cheat, the highest cheater wins.",
    "time": "one minute",
    "book": "core",
    "page": 41
  },
  {
    "name": "Hide/Sneak",
    "attribute": "Perception",
    "description": "Roll when a character tries to hide himself, camouflage something, sneak past someone, or disguise himself — any time he is trying to avoid detection. If no one is actively looking, difficulty: very easy 5 (a prepared shelter in the forests of Endor); easy 10 (from sand people in a canyon); moderate 15 (a doorway in Mos Eisley); difficult 20 (behind a power pylon on the Death Star while searched for); very difficult 30 (the icy wastes of Hoth on a clear day). If someone is searching, the hide roll is added to the searcher's difficulty number, like a dodge.",
    "time": "one round",
    "book": "core",
    "page": 42
  },
  {
    "name": "Search",
    "attribute": "Perception",
    "description": "Used when trying to locate someone or something. If the target is not actively hidden, difficulty: exact location known 5; approximate location known 10; information a few days old 15; a cold trail of weeks or months 20; nobody has seen it in years 30. If the target is hidden, the hider's hide/sneak roll increases the searcher's difficulty number.",
    "time": "one round in the immediate vicinity; minutes for a computer search or days of detective work",
    "book": "core",
    "page": 42
  },
  {
    "name": "Brawling",
    "attribute": "Strength",
    "description": "Combat skill used when a character fights another hand-to-hand without any weapons. When a brawling character hits, use his strength code in lieu of a damage code.",
    "time": "one combat round",
    "book": "core",
    "page": 42
  },
  {
    "name": "Climbing/Jumping",
    "attribute": "Strength",
    "description": "Roll when a character tries to leap a wide gap; climb a tree, wall or cliff; or jump up and grab something. Difficulty: very easy 5 (Ewok rope walkways); easy 10 (jumping between rooftops); moderate 15 (grabbing a rising entry ramp); difficult 20 (swinging across a Death Star shaft with a princess in your arms); very difficult 30 (springing from the carbon freeze pit).",
    "time": "one combat round",
    "book": "core",
    "page": 42
  },
  {
    "name": "Lifting",
    "attribute": "Strength",
    "description": "Used when a character tries to lift or carry a heavy object. Difficulty: very easy 5 (putting on a 20 kilogram pack); easy 10 (picking up a 3PO unit); moderate 15 (carrying a 20 kilogram pack for 10 kilometers); difficult 20 (carrying a buddy's body for a kilometer); very difficult 30 (moving an X-wing off your foot).",
    "time": "one combat round",
    "book": "core",
    "page": 43
  },
  {
    "name": "Stamina",
    "attribute": "Strength",
    "description": "When a character exerts himself for a long time, roll stamina to see whether he tires. Difficulty: very easy 5 (running 100 meters, a day's normal work); easy 10 (running 1 kilometer, a hard day's work); moderate 15 (running 10 kilometers, a day's hard labor); difficult 20 (recovering from carbon freeze); very difficult 30 (swimming for hours in icy water). Also rolled for extreme cold or heat. A character who fails becomes fatigued: all skill and attribute rolls are reduced by 1D. Only call for stamina rolls when a character does something out of the ordinary.",
    "time": "one combat round to one day",
    "book": "core",
    "page": 43
  },
  {
    "name": "Swimming",
    "attribute": "Strength",
    "description": "Swimming is both a character's speed code and his operator skill in water. Declare up to as many speed actions as the swimming code (pips rounded up) and roll swimming against the movement difficulty (Very Easy in clear, calm water; Easy through a widely spaced reef; Moderate in constricted spaces; Difficult in violently turbulent water). A human moves better on land: each successful swimming action moves him two meters. Failing the roll means he flounders and loses control.",
    "time": "one round",
    "book": "companion",
    "page": 10,
    "superseded": {
      "name": "Swimming",
      "attribute": "Strength",
      "description": "Roll when a character swims. Difficulty: very easy 5 (a calm lake on a good day); easy 10 (calm ocean); moderate 15 (riptides or other dangers); difficult 20 (a storm); very difficult 30 (a gale). If the roll is less than the difficulty, the character begins to drown — roll 2D each round as for a mortally wounded character. A rescuer makes two rolls, one to swim and one (difficulty 15) to rescue the drowner.",
      "time": "one combat round",
      "book": "core",
      "page": 43
    }
  },
  {
    "name": "Computer Programming/Repair",
    "attribute": "Technical",
    "description": "Used to repair and program computers, and to defeat computer security. Difficulty for access: public data 5; easy to access 10; private data 15; secret data 20; top-secret data 30. Success gets the data; a roll of half the difficulty or less means the intrusion is detected. Repairs follow the general repair rules: difficulty 10 for light damage, 20 heavy, 30 severe; +10 without tools or spare parts; a failed roll reduces the remaining difficulty by the amount rolled.",
    "time": "repair: fifteen minutes, then one day, then two days; data access: one minute (one combat round at double difficulty)",
    "book": "core",
    "page": 44
  },
  {
    "name": "Demolition",
    "attribute": "Technical",
    "description": "Used to set and blow explosives; the user needs explosives and a detonator (wire, timer, or communicator). Difficulty by the barrier or object: very flimsy (plywood door) 5; flimsy (hard wooden door) 10; average (bolted steel door) 15; lightly armored (blast door) 20; heavily armored (the hull of the Millennium Falcon) 30. Failure means the charge blew without enough power to breach. A cube of detonite does 1D damage, as for grenades.",
    "time": "about a minute (one combat round at double difficulty)",
    "book": "core",
    "page": 44
  },
  {
    "name": "Droid Programming/Repair",
    "attribute": "Technical",
    "description": "Used to repair Droids (normal repair rules) and to reprogram them from scratch, which wipes the Droid's personality and memory and requires a linked computer. Reprogramming difficulty: very simple Droid 5; simple Droid 10; sapient Droid 15; sophisticated Droid (medical Droid, 3PO or R2 unit) 20; Droid of unknown origin 30.",
    "time": "repair: fifteen minutes, then one day, then two days; reprogramming: one day",
    "book": "core",
    "page": 44
  },
  {
    "name": "Medicine",
    "attribute": "Technical",
    "description": "Few humans have in-depth medical knowledge; this skill is used primarily for first aid and emergency care — chiefly the operation of medpacs. Medpac difficulty is 10 for a wounded character, 15 incapacitated, 20 mortally wounded; success reduces the wound status by one degree (once per character per day).",
    "time": "one combat round",
    "book": "core",
    "page": 45
  },
  {
    "name": "Repulsorlift Repair",
    "attribute": "Technical",
    "description": "Used to repair repulsor ground, water and air vehicles, including individual, multi-passenger and freight craft. Repair difficulty: light damage 10, heavy 20, severe 30; +10 without proper tools and parts.",
    "time": "fifteen minutes, then one day, then two days",
    "book": "core",
    "page": 45
  },
  {
    "name": "Security",
    "attribute": "Technical",
    "description": "Knowledge of security locks and how to jigger them, and alarm systems and how to defeat them. Difficulty: standard lock 5; regular security lock or civilian alarm 10; high-quality lock or sophisticated alarm 15; bank vault lock or high-security alarm 20; top-secret base locks 30. A roll of half the difficulty or lower sets off an alarm.",
    "time": "normally one minute (one combat round at double difficulty)",
    "book": "core",
    "page": 45
  },
  {
    "name": "Starship Repair",
    "attribute": "Technical",
    "description": "Used to repair starships. Repair difficulty: light damage 10, heavy 20, severe 30; +10 without proper tools and parts. The starship repair skill can also be used to increase a ship's codes, up to the repairer's skill code, at one week per pip.",
    "time": "fifteen minutes, then one day, then two days",
    "book": "core",
    "page": 45
  },
  {
    "name": "Starship Tactics",
    "attribute": "Knowledge",
    "description": "A specialized Knowledge skill (formerly listed under Mechanical for Adar Tallon in Tatooine Manhunt). Used in capital ship combat: a Moderate roll to anticipate the enemy gives the commander's ship a free haste action with no penalty; a Difficult roll to deceive the enemy lets the commander redeclare his actions after hearing what his opponent has declared. Both rolls are made at the start of the Declare Actions segment. The captain's starship tactics code is recorded in parentheses after his command skill on the ship template.",
    "time": "one round (made before declaring actions)",
    "book": "companion",
    "page": 45
  }
];
