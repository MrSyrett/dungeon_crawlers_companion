// GENERATED FILE - do not edit by hand.
// Source: data/mmrpg/parts/*.json - regenerate with: node scripts/build-mmrpg-data.mjs

export type MmrpgPowerDetail = { name: string; set: string; effect: string; prereq: string; action: string; duration: string; range: string; cost: string };

export const MMRPG_POWER_DETAILS: readonly MmrpgPowerDetail[] = [
  {
    "name": "Absorption",
    "set": "Narrative Power",
    "effect": "The character can absorb the properties of anything that they touch and transform their body—and what they are wearing and carrying—into living versions of the same substance. This includes any form of matter or energy. Doing so requires a standard action or reaction. The change to the character lasts as long as the character wishes to maintain it and can even persist if they lose concentration or consciousness. The powers this transformation grants the character depend on the properties of the material they have touched. If they absorb any of the elements that work with Elemental Control powers, they get to use the special effects granted by that element when they get a Fantastic success on any of their Melee or Agility attacks. Art by CAFU & Frank D’Armata Jim Cheung, Dave Meikis & Justin Ponsor Outside of that, it’s up to the Narrator to rule what sorts of powers the character can absorb from the things around them. For example, if the Absorbing Man touches adamantium, he can ignore 1 level of Health Damage Reduction with his attacks and he would gain Health Damage Reduction –4 himself, making him nearly indestructible. He’d also look like he was made entirely of the silvery metal, which would give him the Extreme Appearance tag. If he absorbed the properties of glass, he would become transparent, giving him an edge when hiding or sneaking. However, he’d also become more fragile, so attacks against him would add +2 to their Health damage multiplier.",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Accuracy 1",
    "set": "Basic",
    "effect": "The character adds +1 to their Agility damage multiplier, and they gain a +1 bonus to Agility checks other than attacks.",
    "prereq": "",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Accuracy 2",
    "set": "Basic",
    "effect": "The character adds +2 to their Agility damage multiplier, and they gain a +2 bonus to Agility checks other than attacks.",
    "prereq": "Accuracy 1, Rank 2",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Accuracy 3",
    "set": "Basic",
    "effect": "The character adds +3 to their Agility damage multiplier, and they gain a +3 bonus to Agility checks other than attacks.",
    "prereq": "Accuracy 2, Rank 3",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Accuracy 4",
    "set": "Basic",
    "effect": "The character adds +4 to their Agility damage multiplier, and they gain a +4 bonus to Agility checks other than attacks.",
    "prereq": "Accuracy 3, Rank 4",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Additional Limbs",
    "set": "Basic",
    "effect": "The character has an additional prehensile appendage (like a tail) or a symmetrical pair of them (like arms) that can be used to liftobjects, use tools or otherwise take actions that normally require the use of a hand. This grants them an edge in Melee and Agility checks. A character can have as many additional limbs as they like—within reason—but they get no additional advantages for them.",
    "prereq": "",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Advance",
    "set": "Tactics",
    "effect": "Any allies in earshot can be affected, up to a number equal to the character’s Ego defense. Each affected ally can immediately use a free movement action to move toward the enemy that triggered the reaction.",
    "prereq": "Rally on Me, Scatter, Rank 4",
    "action": "Reaction",
    "duration": "1 round",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Always Ready",
    "set": "Martial Arts",
    "effect": "The character gains one additional reaction per round, which can be used only to activate a Martial Arts power.",
    "prereq": "Do This All Day, Rank 3",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Anger",
    "set": "Basic",
    "effect": "The character becomes angry and uses that anger to increase their strength. For every 10 points of Focus they spend, they add +15 to their Melee damage bonus and lose –2 from their Logic—and subsequently their Logic defense. While using this power, they cannot use any other powers that require concentration.",
    "prereq": "Mighty 3, Rank 4",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": "10 or more Focus"
  },
  {
    "name": "Animal Bond",
    "set": "Telepathy",
    "effect": "The character can communicate telepathically with one animal of their choice, and they must have befriended the animal before. They cannot switch to another animal unless the animal dies, but they can select this power multiple times if desired. The communication can be verbal, visual or even more complex, such as imparting location information. There is no limit to the distance of the communication, as long as the character and the animal are in the same dimension. Animals with a telepathic bond are generally willing to communicate, even if they aren’t friendly. Bonded animals often do whatever the character asks, even if it might put them in danger.",
    "prereq": "None es. Action: Standard",
    "action": "",
    "duration": "Concentration",
    "range": "",
    "cost": ""
  },
  {
    "name": "Animal Communication",
    "set": "Telepathy",
    "effect": "The character can communicate telepathically with one taxonomic order of animals, such as birds, mammals, fish, amphibians and so on. They can call out to them as a group up to 500 spaces per rank away, and they can communicate specifically with ones they have met or at least seen. They cannot switch to another taxonomic order, but they can select this power multiple times if desired. The communication with the animals can be verbal, visual or even more complex, such as imparting location information. There is no limit to the distance of the communication, as long as the character and the animals are in the same dimension. Friendly animals often do whatever the character asks, as long as it doesn’t put them in danger—and they may be willing to risk even that for one they consider a friend. Hostile animals simply ignore all such requests—which make them a poor choice for communication.",
    "prereq": "",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": ""
  },
  {
    "name": "Animated Illusion",
    "set": "Illusion",
    "effect": "The character creates a visual-only illusion anywhere in line of sight, within 50 spaces. The illusion can be anything up to four sizes larger than the character, and it can move freely within its limits. The character breaks concentration if they move beyond 50 spaces from the illusion or lose line of sight to it.",
    "prereq": "Static Illusion, Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Astral Form",
    "set": "Magic",
    "effect": "The character can project an avatar into the Astral Plane, leaving their physical body in a deep trance in the real world, where it is vulnerable to attack. While in the Astral Plane, they can interact with other characters in the Astral Plane, but they are intangible, invisible and generally undetectable in the real world. However, they can sense things in the real world. If the character is Rank 4 or higher, they can also take on a transparent form that can be seen in the real world. While in the Astral Plane, the character can fly, and in combat, their Flight Speed is equal to their rank times their Run Speed. Outside of combat, they can move 10 times as fast.",
    "prereq": "Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Attack Stance",
    "set": "Martial Arts",
    "effect": "The character doubles their Melee ability bonus to damage.",
    "prereq": "",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": ""
  },
  {
    "name": "Banging Heads",
    "set": "Martial Arts, Super-Strength",
    "effect": "The character makes one Melee check against the Melee defense scores of two enemies within reach. If the attack fails against either foe, it fails entirely. If the attack is a success against both foes, each enemy takes full damage. On a Fantastic success, each enemy is also knocked prone. //7/",
    "prereq": "",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Battle Plan",
    "set": "Tactics",
    "effect": "The character inspires one or more allies of their choice in earshot, up to the character’s Vigilance. Inspired allies gain an edge on all action checks until the start of the character’s next turn.",
    "prereq": "Inspiration, Rank 2",
    "action": "Standard",
    "duration": "1 round",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Blazing-Fast Fists",
    "set": "Super-Speed",
    "effect": "The character has an edge on all Melee attacks.",
    "prereq": "Rank 2",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Blink",
    "set": "Teleportation",
    "effect": "The character teleports into a clear space they can see or have been to, up to their rank in spaces away. If someone was about to attack them and they are now out of reach or line of sight, the attack automatically fails. If they are still within reach or line of sight, the attack has trouble instead.",
    "prereq": "",
    "action": "Standard, movement or reaction",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Blink Barrage",
    "set": "Teleportation",
    "effect": "The character teleports several times in quick succession and winds up in a clear space they can see or have been to, up to their rank in spaces away. Any attacks have trouble against them for one round.",
    "prereq": "Blink, Rank 2",
    "action": "Standard or movement",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Blink Defense",
    "set": "Teleportation",
    "effect": "The character pops away just as the attack reaches them and then pops back into the same space, leaving the projectile behind. The character makes an Ego check with an edge against the attacker’s Agility check result. On a success, the projectile from the attack is teleported away, someplace safe. On a Fantastic success, the attack is turned against the attacker, using the Ego check the character just made as the attack check.",
    "prereq": "Blink, Rank 3",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Blur",
    "set": "Super-Speed",
    "effect": "Any attacks against the character have trouble.",
    "prereq": "Speed Run 2, Rank 2",
    "action": "Standard or reaction",
    "duration": "1 round",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Body Sheet",
    "set": "Plasticity",
    "effect": "The character gains Health Damage Reduction 3, but they cannot make attacks. They gain a Glide Speed equal to double their Run Speed.",
    "prereq": "Flexible Bones 2, Extended Reach 2, Rank 4",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Body Sphere",
    "set": "Plasticity",
    "effect": "The character forms their body into a sphere, protecting up to one ally per rank, squeezed into the same space. Those inside the sphere gain Health Damage Reduction 3 against outside attacks, but they cannot move on their own until the character releases them. Alternatively, if the attacker is within the character’s reach, the character can make an Agility check against the target’s Agility defense. On a success, the character envelops the attacker, grabbing them. On a Fantastic success, the character closes the sphere enough to pin the attacker too.",
    "prereq": "Body Sheet, Rank 4",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Bolts of Balthakk",
    "set": "Magic",
    "effect": "The character makes an Ego check with an edge against the Agility defense of a target in their line of sight. For this attack, add +1 to the character’s Ego damage bonus for every 2 points of Focus they spend. On a success, an affected target takes that total damage. On a Fantastic success, an affected target takes double that total damage and is stunned for one round.",
    "prereq": "Sorcerous, Rank 2",
    "action": "Standard",
    "duration": "Instant",
    "range": "20 spaces",
    "cost": "5 or more Focus"
  },
  {
    "name": "Boost Powers",
    "set": "Power Control",
    "effect": "The character picks one character within 5 spaces and boosts all of their powers. If the powers have ranges or effective areas or durations, these are doubled. If the powers affect a damage multiplier, add 1 to the effects. Any effects that normally happen with a Fantastic successes automatically happen on any success, not just a Fantastic one. If the target’s powers have costs, the character must pay the highest of them or a minimum of 15 Focus.",
    "prereq": "Bump Power, Rank 4",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "15 or more Focus"
  },
  {
    "name": "Borrow Senses",
    "set": "Telepathy",
    "effect": "The character can use the full senses of someone or something with whom they have established a telepathic link or bond. While they do, they retain the use of their own senses too.",
    "prereq": "Telepathic Link, Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Bounce Back",
    "set": "Plasticity",
    "effect": "The fall doesn’t damage the character. If they are prone, they stand up. If they’d like, they can also jump a number of spaces, up to their Run Speed.",
    "prereq": "Flexible Bones 1, Slip Free, Rank 2",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Brace for Impact",
    "set": "Martial Arts, Shield Bearer",
    "effect": "For every point of Focus spent, the character can ignore 1 point of Health damage dealt by the attack.",
    "prereq": "Do This All Day, Rank 2",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "5 or more Focus"
  },
  {
    "name": "Brain Drain",
    "set": "Magic",
    "effect": "The character makes an Ego attack against the target’s Vigilance. If it succeeds, the target takes regular Focus damage, and the character heals half that much Focus for themselves. On a Fantastic success, the character heals their full Focus damage instead.",
    "prereq": "Rank 2",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Brawling",
    "set": "Basic",
    "effect": "The character can use their Melee defense score against Agility attacks too. //7/",
    "prereq": "",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Brilliance 1",
    "set": "Basic",
    "effect": "The character adds +1 to their Logic damage multiplier, and they gain a +1 bonus to Logic checks other than attacks.",
    "prereq": "",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Brilliance 2",
    "set": "Basic",
    "effect": "The character adds +2 to their Logic damage multiplier, and they gain a +2 bonus to Logic checks other than attacks.",
    "prereq": "Brilliance 1, Rank 2",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Brilliance 3",
    "set": "Basic",
    "effect": "The character adds +3 to their Logic damage multiplier, and they gain a +3 bonus to Logic checks other than attacks.",
    "prereq": "Brilliance 2, Rank 3",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Brilliance 4",
    "set": "Basic",
    "effect": "The character adds +4 to their Logic damage multiplier, and they gain a +4 bonus to Logic checks other than attacks.",
    "prereq": "Brilliance 3, Rank 4",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Bump Power",
    "set": "Power Control",
    "effect": "The character picks one power from another character within 5 spaces and boosts it. If the power has ranges or effective areas or durations, these are doubled. If the power affects a damage multiplier, add 1 to the effect. Any effects that normally happen with a Fantastic success automatically happen on any success, not just a Fantastic one. If the power has a cost, the character must pay it as well, with a minimum of 5 Focus.",
    "prereq": "Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 or more Focus"
  },
  {
    "name": "Cannot Lose",
    "set": "Narrative Power",
    "effect": "The character cannot lose any challenge or contest in which they participate. This is not the same as winning, so if there is a possibility that they neither win nor lose, that satisfies the conditions of not losing. The character must be careful about picking sides in any conflict. Their influence means the side they pick is the one most likely to prevail. However, their power may also compel them to switch sides so they don’t lose, even if that’s not how they would prefer events to transpire. This prevents the character from simply choosing a winner in any conflict. The character cannot shut off this power, so it can sometimes feel more like a curse than a blessing.",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Catch Bullets",
    "set": "Super-Speed",
    "effect": "The character makes an Agility check, using the attacker’s attack result as the target number. If the character’s check succeeds, the attack is nullified. On a Fantastic success, the character gets their reaction back.",
    "prereq": "Speed Run 2, Rank 3",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Chain Strikes",
    "set": "Martial Arts",
    "effect": "The character makes a close attack with an edge. If the attack is a success, the enemy takes regular damage. On a Fantastic success, the character can also make an additional Chain Strike.",
    "prereq": "Fast Strikes, Rank 2",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Change of Plans",
    "set": "Tactics",
    "effect": "The ally gains an edge on that action check.",
    "prereq": "Inspiration, Rank 2",
    "action": "Reaction",
    "duration": "1 round",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Charmed Life",
    "set": "Luck",
    "effect": "The character gains an edge on any single action check each round. This does not stack with any other edges.",
    "prereq": "Rank 4",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Cloak",
    "set": "Telepathy",
    "effect": "The character uses a mirage to block their presence from the minds of people within 20 spaces per rank. Cameras (for instance) can still record them, but when people look in the character’s direction, they see nothing there. The target number for anyone trying to detect the character is the character’s Logic defense.",
    "prereq": "Telepathic Link, Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Cloak Group",
    "set": "Telepathy",
    "effect": "Using a mirage, the character blocks their presence—and the presence of up to one other person per rank, within 10 spaces—from the minds of people within 20 spaces per rank. Cameras (for instance) can still record them, but when people look in the characters’ direction, they see nothing there. The target number for anyone trying to detect the character or the others protected is the character’s Logic defense.",
    "prereq": "Cloak, Rank 3",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Clobber",
    "set": "Super-Strength",
    "effect": "The character makes a close attack against an enemy. If the attack is a success, the enemy takes regular damage. On a Fantastic success, the enemy takes double damage and is knocked prone.",
    "prereq": "",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Clone Moves",
    "set": "Power Control",
    "effect": "The character picks another character within 10 spaces and in their line of sight and duplicates all their powers that could be selected with the Special Training origin. They can now use those powers as if they were always theirs. If the copied powers have costs, the character must pay the highest of them, or a minimum of 5 Focus. When the character uses a copied power, they must pay any cost normally as well.",
    "prereq": "Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 or more Focus"
  },
  {
    "name": "Clone Powers",
    "set": "Power Control",
    "effect": "The character picks another character within 10 spaces and duplicates all of their powers. They can now use those powers as if they were always theirs. If the target’s powers have costs, the character must pay the highest of them, or a minimum of 15 Focus. When the character uses a copied power, they must pay any cost normally as well.",
    "prereq": "Copy Power, Rank 4",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "15 or more Focus"
  },
  {
    "name": "Coiling Crush",
    "set": "Plasticity",
    "effect": "The character makes a Melee attack. On a success, the enemy is paralyzed. On a Fantastic success, the enemy also takes regular damage. During the character’s subsequent turns, they can spend their movement action to make a Melee check against the enemy's Resilience. If this succeeds, they inflict regular Health damage. On a Fantastic success, they do double damage instead. During the paralyzed enemy’s turn, they can make a Melee check against the character’s Melee defense to break free.",
    "prereq": "Extended Reach 1, Reverse Punch, Rank 3",
    "action": "Reaction //7/",
    "duration": "Concentration",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Combat Support",
    "set": "Tactics",
    "effect": "Once per battle, the character chooses an ally in earshot. If the ally makes an action check before the start of the character’s next turn, the ally automatically rolls a 1 on their Marvel die, and that die cannot be affected by trouble.",
    "prereq": "Change of Plans, Rank 3",
    "action": "Standard",
    "duration": "1 round",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Combat Trickery",
    "set": "Basic",
    "effect": "Once per battle, when the character is attacking targets of equal or higher rank, the character automatically rolls a 1 on their Marvel die, and that die cannot be affected by trouble. If the character is attacking multiple targets, all the targets must be of equal or higher rank.",
    "prereq": "Rank 2",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Command",
    "set": "Telepathy",
    "effect": "The character gives an order to a target with whom they’ve established a Telepathic Link. The character makes a Logic check against the target’s Logic defense. On a success, the target complies with the order. On a Fantastic success, the character gains an edge the next time they use this power against this same target. The command must be something that can be completed in a single action. If it involves harming someone, the character has trouble on the check. If it would cause the target to harm themselves, the character has double trouble on the check.",
    "prereq": "Telepathic Link, Rank 2",
    "action": "Standard",
    "duration": "1 round",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Control Emotion",
    "set": "Telepathy",
    "effect": "The character picks a target within range and line of sight and makes an Ego check vs. the target’s Ego defense. If they succeed, the target feels the emotions the character wants them to feel. These can be any kind of emotions, even ones the character would not normally feel. On a Fantastic success, the target must act on those emotions immediately, without regard for consequences. If the emotions the target is forced to feel might make them do something they would normally find reprehensible, they get to make an Ego check against the character’s Ego defense. If they succeed, they break free of the character’s influence. On a Fantastic success, they also know who affected their emotions and they are immune to further influence for a full day.",
    "prereq": "Sense Emotion, Sway Emotion, Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "10 spaces",
    "cost": "5 Focus"
  },
  {
    "name": "Control Fog",
    "set": "Weather Control",
    "effect": "The character creates a thick fog for up to 50 spaces per rank around them that blocks all line of sight beyond 10 spaces. They can also dispel any fog in a similar area.",
    "prereq": "",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": ""
  },
  {
    "name": "Control Group Emotion",
    "set": "Telepathy",
    "effect": "The character designates a space within their line of sight. The attack can affect every chosen target within 10 spaces of that. The character makes a single Ego check and compares it to each target’s Ego defense, applying the same results as the Control Emotion power would.",
    "prereq": "Control Emotion, Sense Emotion, Sway Emotion, Rank 4",
    "action": "Standard",
    "duration": "Concentration",
    "range": "10 spaces",
    "cost": "15 Focus"
  },
  {
    "name": "Control Weather 1",
    "set": "Weather Control",
    "effect": "It starts to rain in an area up to 5 miles across times the character’s rank, centered on the character. All ranges are cut in half. Movement is not affected.",
    "prereq": "Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": ""
  },
  {
    "name": "Control Weather 2",
    "set": "Weather Control",
    "effect": "It starts to storm in an area up to 5 miles across times the character’s rank, centered on the character. All ranges and all speeds are cut in half.",
    "prereq": "Control Weather 1, Rank 3",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Control Weather 3",
    "set": "Weather Control",
    "effect": "It starts to storm in an area up to 5 miles across times the character’s rank, centered on the character. All ranges and all speeds are cut in half. If the character also has the Elemental Blast (Electricity) power, they can use it as a reaction when attacked while this power is active.",
    "prereq": "Control Weather 2, Rank 4",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Control Weather 4",
    "set": "Weather Control",
    "effect": "It starts to storm in an area up to 5 miles across times the character’s rank, centered on the character. All ranges and all speeds are cut to one quarter normal, and flying is impossible. If the character also has the Elemental Barrage (Electricity) power, they can use it as a reaction when attacked while this power is active.",
    "prereq": "Control Weather 3, Rank 5",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "20 Focus"
  },
  {
    "name": "Copy Ability",
    "set": "Power Control",
    "effect": "The character picks one ability score of another character within 10 spaces and duplicates it. They now use that ability score in place of their own.",
    "prereq": "",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": ""
  },
  {
    "name": "Copy Power",
    "set": "Power Control",
    "effect": "The character picks one power a target within 10 spaces has and duplicates it. They can now use it as if it was always theirs. When the character uses such a power, they must pay any cost normally as well.",
    "prereq": "Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Copy Psyche",
    "set": "Telepathy",
    "effect": "The character can copy the mind of a person with whom they have established a telepathic link and store it in their own mind. This power can also be used to transmit a mind—either theirs or a stored copy of someone else’s—into the mind of another person with whom they’ve established a telepathic link. Additionally, it can be used to erase a copy of a mind from a person’s brain. Gang Hyuk Lim A character can hold up to one extra mind in their head for every rank the character has. The person whose mind was copied suffers no ill effects. The character can have conversations with the minds stored in their head, and the guest minds can try to influence the character’s decisions and actions. If the character wants to know something that’s in a guest mind, they can use the Mind Reading power on it. However, they don’t have to first establish a telepathic link to do so. At the end of every day that a character has more than one mind in their head, they must make a Resilience vs. TN 10 action check. If they fail, they lose 5 Focus. This Focus cannot be regained until the character gets rid of any extra minds. It may take a while, but eventually, the character is sure to wind up demoralized until they rid themselves of any extra minds. If a character with extra minds in their head wants to remove an extra mind, they can make a Logic check against the mind’s Logic defense. If they succeed, they permanently delete the copied mind from their brain. If they fail, they lose 5 Focus. When a character with extra minds in their head is demoralized, any mind inside them can attempt to take over their body. To do so, the mind must make a Logic check against the character’s Logic defense. On a success, the mind gains control of the character’s body. (If more than one mind tries this at once, the highest result prevails.) On a Fantastic success, the mind takes over the target’s body with the body’s Focus fully restored. If a target does not want to have an extra mind placed in their head in the first place, the target must first be demoralized before the attempt is made. Then the character using this power must make a Logic check against the target’s Logic defense. On a success, the new mind is copied over. On a Fantastic success, the mind takes over the target’s body with the body’s Focus fully restored. If a body is taken over in this way, the original mind remains and cannot be removed. It can try to take over its body again if the new controller of the body becomes demoralized. If a character with extra minds in their head is shattered, all extra minds in it are permanently lost, in addition to the regular effects. In the case of the Krakoan resurrection protocols, Cerebro is used to copy a character’s entire mind. It then stores the mind in a device designed by Forge. Any telepath with this power can copy a stored mind and transmit it into a fresh clone of the body from which it emerged, effectively resurrecting that character.",
    "prereq": "Information Upload, Rank 4",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Copy Trait",
    "set": "Power Control",
    "effect": "The character picks one trait another character within 10 spaces has and duplicates it. They can now use it as if it was always theirs.",
    "prereq": "",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": ""
  },
  {
    "name": "Corrupting Touch",
    "set": "Narrative Power",
    "effect": "With a touch, the character can corrupt a person and command their utter loyalty. In combat, this requires a successful Melee attack that inflicts at least 1 point of damage. The clothes of a corrupted target appear to be photographic negatives of their normal colors. If the target has the Heroic tag, replace that with the Villainous tag and remove their Karma. The target is completely dominated and will follow the corrupting character’s orders. If any order involves harming someone, the target gets to make an Ego action check vs. the corrupting character’s Ego defense to end the domination. If the target originally had the Heroic tag, they get an edge on the check. If the order would cause the target to harm themselves, they also get an edge on the check, and if they originally had the Heroic tag, they get a double edge. If a target with the Heroic tag breaks free from this power, their Karma instantly resets to its regular amount before being dominated.",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Cosmic Awareness",
    "set": "Sixth Sense",
    "effect": "The character can sense selected things at any distance from them, as long as they are in the same universe as what they are attempting to detect. This can include the location, relative velocity and overall emotional and physical status of any item, creature or group known to the character.",
    "prereq": "Microscopic Awareness, Rank 4",
    "action": "Standard",
    "duration": "Concentration",
    "range": "Unlimited",
    "cost": "15 Focus"
  },
  {
    "name": "Cosmic Hunger",
    "set": "Narrative Limitation",
    "effect": "The character must feed roughly once a month to live. They can only do so by consuming the life force of an entire planet. A er each full month that a character does not feed, their power diminishes, and this is reflected in the maximum size they can reach. For example, if the character can reach gargantuan size, a er one full month, they can only reach titanic size, and so on.",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Counterstrike Technique",
    "set": "Martial Arts",
    "effect": "The character deals half the attacker’s regular damage to the attacker.",
    "prereq": "Attack Stance, Rank 2",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Covering Fire",
    "set": "Ranged Weapons",
    "effect": "The character makes an Agility attack against a target’s Vigilance defense. If the attack is a success, apply Health Damage Reduction normally. The target takes any damage to their Focus. If it’s a Fantastic success, the damage is doubled, and if the target takes any Focus damage, they are stunned for one round.",
    "prereq": "Return Fire, Rank 3",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Create Herald",
    "set": "Narrative Power",
    "effect": "The character can lend another character a portion of their power. This gives the herald the Weird Science: Power Cosmic origin, makes the lending character their patron (as Patron, page 194) and elevates the herald to Rank 5 or 6. The character can strip their herald of any powers given in this way as well. They can remove any or all of them at their discretion. Art by Ron Lim & Israel Silva",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Crimson Bands of Cyttorak",
    "set": "Magic",
    "effect": "The character makes an Ego check with an edge against the Melee defense of a target in their line of sight. If the attack is a success, the crimson bands paralyze the target. On a Fantastic success, the target can be pinned too. Breaking out of the crimson bands requires a Melee check with target number 20.",
    "prereq": "Sorcerous, Rank 3",
    "action": "Standard",
    "duration": "Concentration",
    "range": "20",
    "cost": "10 Focus"
  },
  {
    "name": "Crushing Grip",
    "set": "Martial Arts, Super-Strength",
    "effect": "The character makes a Melee attack against the grabbed target’s Resilience defense. If it’s a success, the target takes regular damage. On a Fantastic success, the target takes double damage instead and is pinned.",
    "prereq": "Rank 2",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Cure-All",
    "set": "Healing",
    "effect": "With a touch, the character can cure any temporary ailments a target suffers from. The character makes an Ego vs. TN 12 action check. On a success, the effects of the ailment end immediately. On a Fantastic success, treat the result like a recovery check, and the target gains back that much of any Health and Focus lost to the condition. This can affect conditions including ablaze, bleeding, blinded, corroding, deafened, demoralized, paralyzed, poisoned and unconscious. If the target was demoralized, they now have 1 Focus, and if the target was unconscious, they now have 1 Health. (They can have more if the char- acter got a Fantastic success and recovered more for them.) Note that this only works on acute conditions and diseases, those the target has contracted recently and that would—under ideal circumstances—resolve soon, leaving them alive. It does not affect chronic or permanent diseases or serious diseases that are likely to be fatal. For instance, it can cure temporary deafness but not permanent deafness. It can stop an allergy attack but not the allergies themselves. It can cure poison but not cancer. It has no effect against the Techno-Organic virus, the Transmode virus, the Legacy virus or other such diseases.",
    "prereq": "Healing Hands, Rank 4",
    "action": "Standard",
    "duration": "Instant",
    "range": "Reach",
    "cost": "15 Focus"
  },
  {
    "name": "Dampen Power",
    "set": "Power Control",
    "effect": "The character picks one power from another character within 20 spaces and makes an Ego attack against them. On a success, they tamp the power down. If the power has ranges or effective areas or durations, these are halved. If the power affects a damage multiplier, subtract 1 from the effect. The power can no longer enjoy Fantastic successes. If the power has a Focus cost, the character must also pay that cost to dampen it.",
    "prereq": "",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "Varies"
  },
  {
    "name": "Dance of Death",
    "set": "Ranged Weapons",
    "effect": "The character makes an Agility check and compares that against the Agility defense of every enemy within 5 spaces and in their line of sight. Each success does half the regular damage. On a Fantastic success, each enemy takes full damage instead and is bleeding.",
    "prereq": "Slow-Motion Shoot-Dodge, Rank 3",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Danger Sense",
    "set": "Sixth Sense",
    "effect": "Even if the character doesn’t get a Fantastic result on their initiative check, they get a turn during the bonus round of any combat they are in. This works even if no one else in the combat can act in the bonus round.",
    "prereq": "Precognition 1, Rank 2",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Dark Side",
    "set": "Narrative Limitation",
    "effect": "The character runs the risk of turning into a darker, evil version of themself with no human morals to guide them. This usually happens in the early days a er a mortal character ascends to Rank X and the power overwhelms them. When tempted to do something horrible with their powers—o en for good reasons—the character must make a Challenging Ego check. If they fail, they gain the Villainous tag and begin doing horrible things—until someone figures out how to stop them. Each time the hero passes such a check, they gain an edge on future checks. Each time they fail such a check, they gain trouble. Once they get far enough down one path or the other, it becomes nearly impossible to turn back.",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Darkness",
    "set": "Illusion",
    "effect": "An area up to 5 spaces wide per the character’s rank—centered on anything the character wishes, within 50 spaces—is filled with inky darkness. Those inside it cannot see anything, and no lights work within it except those generated by powers. The character must remain within 50 spaces of the affected area to avoid breaking concentration.",
    "prereq": "Illumination, Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Dazzle",
    "set": "Illusion",
    "effect": "The character makes an Ego check against an enemy in their line of sight and compares that against the target’s Vigilance defense. If the attack is a success, the enemy is blinded for 1 turn. On a Fantastic success, it also inflicts regular damage. Alternatively, the character can blind the victim with darkness.",
    "prereq": "Illumination, Rank 2",
    "action": "Standard",
    "duration": "Instant",
    "range": "20 spaces",
    "cost": "5 Focus io F"
  },
  {
    "name": "Deafen",
    "set": "Illusion",
    "effect": "The character makes an Ego check against an enemy in their line of sight and compares that against the target’s Vigilance defense. If the attack is a success, the enemy is deafened for one turn. On a Fantastic success, it also inflicts regular damage.",
    "prereq": "Illumination, Rank 2",
    "action": "Standard",
    "duration": "Instant",
    "range": "20 spaces",
    "cost": "5 Focus"
  },
  {
    "name": "Defense Stance",
    "set": "Martial Arts",
    "effect": "Any close attacks made against the character have trouble until they are successfully attacked in this combat.",
    "prereq": "",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": ""
  },
  {
    "name": "Detect Lie",
    "set": "Translation",
    "effect": "When someone communicates in an active form the character can understand—verbally, telepathically, using sign language and so on—the character can make an Ego check against the communicator’s Ego defense. On a success, the character knows if the communicator is lying. On a Fantastic success, they also know (if possible) why the communicator is lying. This power does not allow the character to know the truth, although they may be able to figure it out by detecting lies. Also, it only works on communicators who know they are lying. If they believe what they are saying—even if it is wrong—no lie can be detected.",
    "prereq": "Understand Body Language, Rank 2",
    "action": "Standard or reaction",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Detect Supers",
    "set": "Sixth Sense",
    "effect": "The character can sense anyone within a certain distance of them who has super-powers. This reveals a count of the number of people who have powers and their rough distance and direction from the character. It doesn’t supply any other information, like name, appearance, the type of powers and so on. Note that powers that can be picked by someone with the Special Training origin are not considered super-powers. When the character picks this power, they have two options. They can take the power as it is, or they can limit it to detecting powers from a single origin, like Mutant or Alien (including all subtypes). If they take the regular power, its range is 5 miles. If they take a limited power, its range is 25 miles. For example, the character can have Detect Supers with a range of 5 miles or Detect Supers: Mutants with a range of 25 miles.",
    "prereq": "",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": ""
  },
  {
    "name": "Dimensional Portal",
    "set": "Omniversal Travel",
    "effect": "The character opens a glowing portal in a space next to them that moves anything that enters it between that space and its destination, which forms a matched glowing portal in the other place. The other end of the portal must be in a clear space in another dimension that the character has been to. Anything can move through the portal in either direction until it is closed, which the character can do at will.",
    "prereq": "Dimensional Travel Together, Rank 4",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Dimensional Travel",
    "set": "Omniversal Travel",
    "effect": "The character instantly moves from their current dimension to another dimension within the same universe. For instance: from Earth to Asgard, Limbo or K’un-Lun. When they move to the other dimension, they can arrive in any place they’ve been to before. Otherwise, they arrive at the most common entrance to that dimension.",
    "prereq": "Rank 3",
    "action": "Standard or movement",
    "duration": "Instant",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Dimensional Travel Other",
    "set": "Omniversal Travel",
    "effect": "The character makes an Ego check against the Vigilance defense of a target they have grabbed. If the check is successful, the character can send the target to another dimension. The target can be sent to any location in that dimension that the character has been to before. Otherwise, the target arrives at the most common entrance to that dimension.",
    "prereq": "Dimensional Travel, Rank 4",
    "action": "Standard, movement or reaction",
    "duration": "Instant",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Dimensional Travel Together",
    "set": "Omniversal Travel",
    "effect": "The character moves to a different dimension, taking any person they are touching with them. If the target does not wish to come along, the character must grab them first. When they move to the other dimension, they can arrive in any place they’ve been to before. Otherwise, they arrive at the most common entrance to that dimension.",
    "prereq": "Dimensional Travel, Rank 3",
    "action": "Standard, movement or reaction",
    "duration": "Instant",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Discipline 1",
    "set": "Basic",
    "effect": "The character adds +1 to their Ego damage multiplier, and they gain a +1 bonus to Ego checks other than attacks.",
    "prereq": "",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Discipline 2",
    "set": "Basic",
    "effect": "The character adds +2 to their Ego damage multiplier, and they gain a +2 bonus to Ego checks other than attacks.",
    "prereq": "Discipline 1, Rank 2",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Discipline 3",
    "set": "Basic",
    "effect": "The character adds +3 to their Ego damage multiplier, and they gain a +3 bonus to Ego checks other than attacks.",
    "prereq": "Discipline 2, Rank 3",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Discipline 4",
    "set": "Basic",
    "effect": "The character adds +4 to their Ego damage multiplier, and they gain a +4 bonus to Ego checks other than attacks.",
    "prereq": "Discipline 3, Rank 4",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Disguise",
    "set": "Basic",
    "effect": "The character instantly alters their appearance so that they appear to be someone else. The target number for anyone trying to see through the disguise is the character’s Ego defense. If the character is impersonating someone known to the other person, that person has an edge.",
    "prereq": "",
    "action": "Standard",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Disintegration Fields",
    "set": "Narrative Power",
    "effect": "The character can form impenetrable force-fields around themselves and their belongings that can, at their option, repel or disintegrate anything that touches them. They can make these fields large enough to encompass an entire planet.",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Dispel Spell",
    "set": "Magic",
    "effect": "The character makes an Ego check against the Ego defense of a target using a magic power that requires concentration. On a success, the target’s concentration on that power is broken. On a Fantastic success, the target’s concentration is broken entirely.",
    "prereq": "Sorcerous, Rank 4",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "15 Focus //7/ //7/ Ar t by Humbert o Ramos, Hecto r Olazaba & Edga r Delgado"
  },
  {
    "name": "Disrupt Electronics",
    "set": "Phasing",
    "effect": "When phasing through electronics, the character can scramble them, causing them to either shut down or crash. In the case of powers that are Tech Reliant (and feature electronics), they are unusable for one turn while they reboot.",
    "prereq": "Phase Self, Rank 2",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Disrupt Nerves",
    "set": "Phasing",
    "effect": "When phasing through a person, the character can attempt to scramble their nervous system. The character makes an Ego check against the target’s Resilience defense. On a success, the target is stunned for one round. On a Fantastic success, the target also falls prone.",
    "prereq": "Phase Self, Rank 2",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Disrupt Person",
    "set": "Phasing",
    "effect": "The character becomes the slightest bit solid while phasing themselves or a phased weapon through someone. They make a close attack. On a success, the attack does normal damage, ignoring any Health Damage Reduction. On a Fantastic success, the attack does double damage instead, ignoring any Health Damage Reduction, and the target is stunned for one round.",
    "prereq": "Phase Self, Rank 3",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "DNA Manipulation",
    "set": "Narrative Power",
    "effect": "The character is able to identify, copy and manipulate DNA in themselves and others. They can use this to create a body from scratch that they can then occupy by using the Copy Psyche power. In addition, the character can cause latent mutant powers to manifest upon command, both in their own body and in that of others. They can also copy DNA from other people and insert it into their body to fool security systems into thinking that they are members of a particular genetic group or family line.",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Do This All Day",
    "set": "Martial Arts, Shield Bearer",
    "effect": "The character heals 2 points of Health for every point of Focus they spend.",
    "prereq": "Rank 2",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "5 or more Focus"
  },
  {
    "name": "Domination",
    "set": "Telepathy",
    "effect": "The character dominates a target with whom they’ve established a Telepathic Link and who has no Focus left. The character makes a Logic check with trouble against the target’s Logic defense. On a success, the target is completely dominated and will follow the character’s orders. On a Fantastic success, the character gains an edge the next time they use this power against this same target. The result of the character’s check is the target number for any attempts by the target to end the domination. If any order involves harming someone, the target gets to make a Logic check to end the domination. If the target has the Heroic tag, they get an edge on the check. If the order would cause the target to harm themselves, the target gets an edge on the check. If they have the Heroic tag, they get a double edge.",
    "prereq": "Orders, Rank 5",
    "action": "Standard",
    "duration": "Permanent",
    "range": "",
    "cost": "20 Focus"
  },
  {
    "name": "Double Tap",
    "set": "Ranged Weapons",
    "effect": "The character makes a ranged attack against an enemy within 2 spaces. If the attack is a success, the enemy takes regular damage. On a Fantastic success, the enemy takes double damage and is bleeding.",
    "prereq": "",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Duplicate Self",
    "set": "Narrative Power",
    "effect": "With this power the character can make copies of themself. The duplicates are full-fledged, identical copies of the original person, including all of their current clothing. They are indistinguishable from the original, right down to the genetic level. Art by Pablo Raimondi & Brian Reber The number of duplicates a character can have is theoretically unlimited. As a practical matter, though, characters with this power prefer to keep track of their duplicates and don’t go to outrageous lengths with their numbers. While duplicates generally take orders from the character, they are independent people who may balk at doing things they would find painful or distasteful. Often, a duplicate highlights an aspect of the character’s personality, for good or bad, so they may act differently than the original would. There is no limit to the amount of time a duplicate can exist. They can operate entirely independently and can even have their own adventures throughout the Multiverse. The character has no direct control over their duplicates. They can generally trust them to work together, help the character and execute the character’s plans, but there can be exceptions. The character and the duplicates always know who the original character is, although others may have a hard time telling them apart. The character can absorb their duplicates back into their body. If the character or the duplicate has lost Health or Focus points, the original winds up with the average of their numbers when they absorb the duplicate. Absorbing injured duplicates can harm the character, but the converse is also true. Absorbing healthy duplicates can heal the character. When the character absorbs a duplicate, they gain all of the duplicate’s memories. This includes any tags the duplicate may have gained on their own. In the case of conflicting tags, the character’s tags normally take precedence over the duplicate’s, although it’s up to the Narrator to determine exactly how. On top of that, the character might have to deal with the consequences of their duplicate’s actions, for good or ill. The character cannot absorb the memories of a dead duplicate. Attempting to do so only traumatizes the character, knocking them down to 1 Focus. The duplicates can also make duplicates, but only the original character can absorb any of the duplicates, no matter their source. Duplicates usually don’t mind being absorbed, but some rare ones may refuse to go quietly and may even harbor deep resentment against the character and wish to harm them. Characters with this power have a trigger that activates it. When the trigger happens—and only when the trigger happens—the power automatically activates, whether they wish it to or not. Similarly, they must define their trigger to absorb duplicates. When this trigger happens, they must absorb the affected duplicate, whether they wish to or not. is taking Health damage from being struck. This can be as little as point of damage, and he can inflict it on himself by doing something like banging his hand on a table or wall. He sometimes wears a padded suit to keep this from happening when he does not intend it. The trigger for Multiple Man to absorb his duplicates is making skin-to-skin contact with a duplicate. He sometimes wears gloves to keep this from happening when he does not intend it.",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Eat Energy",
    "set": "Narrative Power",
    "effect": "The character can consume and survive on pure energy. This includes any energy powers used against them.",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Edit Memory",
    "set": "Telepathy",
    "effect": "The character alters the memory of a target with whom they’ve established a Telepathic Link. This can be as simple as erasing a chunk of the target’s memory or as complicated as implanting entirely new memories. The Narrator sets the target number based on how complex the new memory is and how hard it would be to integrate such memories into the character’s other memories. The character makes a Logic check against the target’s Logic defense. On a success, the memories are altered. On a Fantastic success, the target has trouble on checks to refute such memories in the future. Any time the target is given good reason to doubt the edited memory, they can make a Logic check to refute the new version of their memories and recover their original memories. If they succeed, they remember both the original memory and the edited one. On a Fantastic success, they know for sure who did this to them.",
    "prereq": "Memory Blip, Rank 4",
    "action": "Standard",
    "duration": "Permanent",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Elemental Barrage",
    "set": "Elemental Control",
    "effect": "The character designates a space within their line of sight. The attack can affect every enemy within 10 spaces of that. The character makes a single Ego check and compares it to each target’s Resilience defense. Affected enemies take half regular damage. On a Fantastic success, they take full regular damage and the elemental type’s special effect.",
    "prereq": "Elemental Blast, Rank 4",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Elemental Barrier",
    "set": "Elemental Control",
    "effect": "The character forms a wall of their element within their line of sight and up to 10 spaces away per rank. This covers up to 2 spaces across (vertically/horizontally) per their rank. The character makes an Agility check and compares the results against the Agility defense of any target in the affected spaces. On a success, the character chooses which side of the barrier the target winds up on. On a failure, the target chooses. On a Fantastic success, the target suffers the element’s special effect too. Attacks against the barrier are against the character’s Ego defense. Any attacks against it that do 10 points of damage or less are instantly absorbed, and the barrier continues. If an attack does more than 10 points of damage, it destroys the barrier. Either way, the attack leaves those behind the barrier unharmed.",
    "prereq": "Elemental Blast, Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Elemental Blast",
    "set": "Elemental Control",
    "effect": "The character makes a ranged attack with an edge at an enemy in line of sight. For this attack, add +1 to the character’s Agility damage bonus for every 2 points of Focus they spend. On a success, an affected target takes that total damage. On a Fantastic success, an affected target takes double that total damage and suffers the elemental type’s special effect.",
    "prereq": "Elemental Burst, Rank 2",
    "action": "Standard",
    "duration": "Instant",
    "range": "10 spaces",
    "cost": "5 or more Focus"
  },
  {
    "name": "Elemental Burst",
    "set": "Elemental Control",
    "effect": "The character makes a ranged attack against an enemy in line of sight. If the attack is a success, it inflicts regular damage. On a Fantastic success, the enemy takes double damage instead and the elemental type’s special effect.",
    "prereq": "",
    "action": "Standard",
    "duration": "Instant",
    "range": "10 spaces",
    "cost": ""
  },
  {
    "name": "Elemental Form",
    "set": "Elemental Control",
    "effect": "The character’s body is made entirely of their element, which gives them a steady supply of their element to use and makes them essentially unkillable. When they lose all their Health, their form loses its cohesion and falls apart. When they have at least 1 Health—which they can gain back over time, normally— they can re-form. If the character wishes to use their elemental body in unusual ways, they should pick Plasticity powers. If they wish to be able to be fully human at times, they should take the Shape-Shiftpower.",
    "prereq": "Elemental Reinforcement, Rank 3",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Elemental Grab",
    "set": "Elemental Control",
    "effect": "The character makes an Ego attack against a target’s Melee defense within 5 spaces times the character’s rank. If the attack is a success, the character grabs the target with their element. On a Fantastic success, the target can also be pinned and suffers the element’s special effect. Breaking free requires a successful Melee check against target number 20.",
    "prereq": "Elemental Burst, Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "Varies",
    "cost": "5 Focus"
  },
  {
    "name": "Elemental Infusion",
    "set": "Elemental Control",
    "effect": "The character infuses their energy into a handheld weapon in their grasp. When the character gets a Fantastic suc- cess attacking with the weapon, add the energy’s special effect.",
    "prereq": "Elemental Burst, Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Elemental Prison",
    "set": "Elemental Control",
    "effect": "The character picks a point within their line of sight and traps any chosen targets within up to 5 spaces times their rank—in a prison comprised of their element. When the Elemental Prison is formed, the character makes an Ego check and compares the results against the Agility defense of targets inside the enclosed spaces. On each success, the character traps the target within the prison’s perimeter. On a Fantastic success, such imprisoned people suffer full damage and the element’s special effect too. Attacks against the prison are against the character’s Ego defense. Any attacks against the prison are absorbed as if made against the character’s Elemental Protection power, and the prison continues. If an attack does more damage than the character’s Elemental Protection power can sustain, it destroys the prison, but no one inside is harmed.",
    "prereq": "Elemental Protection 1",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "Same as the character’s Elemental Protection power"
  },
  {
    "name": "Elemental Protection 1",
    "set": "Elemental Control",
    "effect": "The character protects themselves with their element. Any attacks against them that do 10 points of damage or less are instantly absorbed, and the protection continues. If an attack does more than 10 points of damage, it destroys the protection, allowing excess damage through.",
    "prereq": "Elemental Barrier, Rank 2",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Elemental Protection 2",
    "set": "Elemental Control",
    "effect": "The character protects themselves with their element. Any attacks against them that do 20 points of damage or less are instantly absorbed, and the protection continues. If an attack does more than 20 points of damage, it destroys the protection, allowing excess damage through.",
    "prereq": "Elemental Protection 1, Rank 3",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Elemental Protection 3",
    "set": "Elemental Control",
    "effect": "The character protects themselves with their element. Any attacks against them that do 30 points of damage or less are instantly absorbed, and the protection continues. If an attack does more than 30 points of damage, it destroys the protection, allowing excess damage through.",
    "prereq": "Elemental Protection 2, Rank 4",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Elemental Protection 4",
    "set": "Elemental Control",
    "effect": "The character protects themselves with their element. Any attacks against them that do 40 points of damage or less are instantly absorbed, and the protection continues. If an attack does more than 40 points of damage, it destroys the protection, allowing excess damage through.",
    "prereq": "Elemental Protection 3, Rank 5",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": "20 Focus"
  },
  {
    "name": "Elemental Push",
    "set": "Elemental Control",
    "effect": "The character makes an Ego attack against the target’s Agility defense. If the attack succeeds, the character can move the target in any direction, up to 1 space times the character’s rank. On a Fantastic success, the target also takes regular damage, is knocked prone and suffers the element’s special effect.",
    "prereq": "Elemental Burst, Rank 3",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Elemental Reinforcement",
    "set": "Elemental Control",
    "effect": "The character can transfer any Health damage that gets through an elemental power that grants damage protection to their Focus instead, leaving the protection intact.",
    "prereq": "Elemental Protection 1",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "Varies"
  },
  {
    "name": "Elemental Ricochet",
    "set": "Elemental Control",
    "effect": "The character makes a ranged attack against a target in line of sight. If the attack is a success, it inflicts regular damage. On a Fantastic success, energy also bounces offthe first target to another in line of sight, and the character can make a new attack against that target, adding the new range to the previous attack’s range. This can be repeated until an attack is not fantastic.",
    "prereq": "Elemental Burst, Rank 3",
    "action": "Standard",
    "duration": "Instant",
    "range": "10 spaces times the character’s rank",
    "cost": "10 Focus"
  },
  {
    "name": "Elemental Sphere",
    "set": "Elemental Control",
    "effect": "The character envelops themselves—and any chosen people within up to 5 spaces times their rank—in a protective sphere comprised of their element. When the sphere is formed, the character makes an Ego check and compares the results against the Agility defense of unwanted characters in the enclosed spaces. On a success, the character can move any unwanted people within the sphere’s perimeter to spaces outside of the sphere. On a Fantastic success, such moved people suffer full damage and the element’s special effect. Attacks against the sphere are against the character’s Ego defense. Any attacks against the sphere are absorbed as if made against the character’s Elemental Protection power, and the sphere continues. If an attack does more damage than the character’s Elemental Protection power can sustain, it destroys the sphere, but no one inside is harmed.",
    "prereq": "Elemental Protection 1",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": "Same as the character’s Elemental Protection power"
  },
  {
    "name": "Elemental Suffocation",
    "set": "Elemental Control",
    "effect": "The character makes an Ego attack against the grabbed target’s Resilience defense. If the attack is a success, the target takes regular damage. On a Fantastic success, the target can also be pinned and suffers the element’s special effect. With elements that aren’t suited to suffocation, this power chokes the target instead.",
    "prereq": "Elemental Grab, Rank 4",
    "action": "Standard or reaction",
    "duration": "Instant",
    "range": "Varies",
    "cost": "15 Focus"
  },
  {
    "name": "Energy Absorption",
    "set": "Basic",
    "effect": "The character can take any Health damage done to them (after applying any damage reduction), ignore it and add that number to their Focus instead. In this way, they can increase their Focus up to double their regular maximum Focus. Once the combat is over, any extra Focus over the character’s regular maximum Focus score fades away. This power cannot be used again until any Focus the character gained in this way is spent. //7/",
    "prereq": "Rank 4",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Environmental Protection",
    "set": "Telepathy",
    "effect": "The character can reach out with their mind to sense the presence of others within 100 spaces per rank. This tells them the person’s location and general status. It can also identify if they have super-powers or not. If a target or targets wish to remain undetected, the character must make a Logic check and compare it against each target’s Vigilance defense. If they succeed, they sense the target. On a Fantastic success, they can also identify the source of any powers the target has.",
    "prereq": "",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": ""
  },
  {
    "name": "ESP",
    "set": "Telepathy",
    "effect": "The character can reach out with their mind to sense the presence of others within 100 spaces per rank. This tells them the person’s location and general status. It can also identify if they have super-powers or not. If a target or targets wish to remain undetected, the character must make a Logic check and compare it against each target’s Vigilance defense. If they succeed, they sense the target. On a Fantastic success, they can also identify the source of any powers the target has.",
    "prereq": "",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": ""
  },
  {
    "name": "Evasion",
    "set": "Basic",
    "effect": "The character can use their Agility defense score against Melee attacks too.",
    "prereq": "",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Evil Eye",
    "set": "Luck",
    "effect": "The character picks a foe in their line of sight. That foe has trouble on all action checks made for the power’s duration. There is no limit on the range between the character and the foe once the power is activated. The character must pay the Focus cost at the start of each of their subsequent turns of concentration to keep the power working.",
    "prereq": "Jinx You, Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "5 spaces per rank",
    "cost": "5 Focus per turn"
  },
  {
    "name": "Exorcism",
    "set": "Magic",
    "effect": "The character attempts to remove the possessor from a possessed target. The character makes an Ego check against the possessor’s Ego defense. On a success, the possessor’s concentration is broken, ending the possession. On a Fantastic success, all of the possessor’s concentrations are broken, and the possessor is stunned for one round too.",
    "prereq": "Rank 4",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Exploit",
    "set": "Melee Weapons",
    "effect": "The character makes a Melee attack against the target’s Resilience defense score. If the attack is a success, the damage it does ignores Health Damage Reduction. On a Fantastic success, the target suffers double damage and the weapon’s special effect.",
    "prereq": "Vicious Attack, Rank 2",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Extend Invisibility",
    "set": "Illusion",
    "effect": "The character makes something—a single person or object—within reach invisible. This can be one size bigger than them for every rank they have.",
    "prereq": "Invisibility",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Extended Reach 1",
    "set": "Plasticity",
    "effect": "The character’s reach quadruples.",
    "prereq": "",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Extended Reach 2",
    "set": "Plasticity",
    "effect": "The character’s reach is 10 times normal.",
    "prereq": "Extended Reach 1, Rank 2",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Fast Attacks",
    "set": "Melee Weapons",
    "effect": "The character splits their attack to make two close attacks against separate targets within reach (or they can focus a single attack on a single target). Make a single Melee check and compare it to the targets’ Melee defenses. On a success, the affected target takes half regular damage. On a Fantastic success, the affected target takes full damage, and the character can make a bonus attack with this power against any target within reach, with the same effect.",
    "prereq": "",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Fast Hands",
    "set": "Ranged Weapons",
    "effect": "The character gains one additional reaction per round. This reaction can be used only to trigger a Ranged Weapons power.",
    "prereq": "Point-Blank Parry, Rank 3",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Fast Strikes",
    "set": "Martial Arts",
    "effect": "The character splits their attack to make two close attacks against separate targets within reach (or they can focus a single attack on a single target). Make a single Melee check and compare it to the targets’ Melee defenses. On a success, the affected target takes half regular damage. On a Fantastic success, the affected target takes full damage.",
    "prereq": "",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Flames of the Faltine",
    "set": "Magic",
    "effect": "The character makes an Ego check against the Agility defense of a target in their line of sight. If the attack is a success, it inflicts regular damage. On a Fantastic success, the target takes double damage and then suffers 5 points of damage at the end of every round until someone uses an action to put out the flames.",
    "prereq": "Sorcerous, Rank 2",
    "action": "Standard",
    "duration": "Instant",
    "range": "10 spaces",
    "cost": "5 Focus"
  },
  {
    "name": "Flare",
    "set": "Illusion",
    "effect": "The character makes an Ego check and compares that against the Vigilance defense of every enemy within 5 spaces. Each beaten enemy is blinded for one turn. On a Fantastic success, the flare inflicts regular damage too.",
    "prereq": "Illumination, Rank 3",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Flexible Bones 1",
    "set": "Plasticity",
    "effect": "The character gains Health Damage Reduction 1. They also have an edge on Agility checks for contortion and escape.",
    "prereq": "",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Flexible Bones 2",
    "set": "Plasticity",
    "effect": "The character gains Health Damage Reduction 2. They also have a double edge on Agility checks for contortion and escape.",
    "prereq": "Flexible Bones 1, Rank 2",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Flexible Fingers",
    "set": "Plasticity",
    "effect": "With a standard action, the character can automatically pick any lock that requires a physical key. They can also shape their hands to form almost any other kind of simple tool.",
    "prereq": "",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Flight 1",
    "set": "Basic",
    "effect": "The character can fly. Their combat Flight Speed is equal to their rank times their Run Speed. Outside of combat, they can move three times their Flight Speed.",
    "prereq": "Rank 2",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Flight 2",
    "set": "Basic",
    "effect": "Outside of combat, the character can fly up to 50 times their Flight Speed.",
    "prereq": "Flight 1, Rank 3",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Flying Double Kick",
    "set": "Martial Arts",
    "effect": "The character makes a close attack against two enemies within reach. If an attack is a success, the enemy takes regular damage. If an attack is a Fantastic success, the enemy takes double damage and is knocked prone.",
    "prereq": "Leg Sweep, Rank 3",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Focus Fire",
    "set": "Tactics",
    "effect": "The character calls out an enemy in line of sight and inspires one or more allies of their choice in earshot, up to the character’s Vigilance. They gain an edge on all action checks against that enemy.",
    "prereq": "Battle Plan, Rank 3",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Focused Fury",
    "set": "Melee Weapons",
    "effect": "The character makes a close attack with an edge. For this attack, add +1 to the character’s Melee damage bonus for every 2 points of Focus they spend. On a success, an affected target takes that total damage. On a Fantastic success, an affected target takes double that total damage and suffers the weapon’s special effect.",
    "prereq": "Exploit, Rank 3",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "5 or more Focus"
  },
  {
    "name": "Focused Strike",
    "set": "Martial Arts",
    "effect": "The character makes a close attack. Add +1 to the character’s Melee damage bonus for every 2 points of Focus they spend. On a success, an affected target takes that total damage. On a Fantastic success, an affected target takes double that total damage and is stunned for one round. .",
    "prereq": "Chain Strikes, Rank 3",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "10 or more Focus"
  },
  {
    "name": "Fool",
    "set": "Telepathy",
    "effect": "The character uses a mirage to alter their appearance in the minds of anyone within 20 spaces per rank. Cameras (for instance) can still record them normally, but when people look in the character’s direction, they see someone else. The target number for anyone trying to see through the mirage is the character’s Logic defense. If the character is impersonating someone known to the other person, that person has an edge.",
    "prereq": "Telepathic Link, Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "FTL Travel",
    "set": "Narrative Power",
    "effect": "The character can travel through space at faster-than-light speeds under their own power. They still move through space or Exo-Space when doing so (as opposed to teleporting from point to point).",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Furious Attacks",
    "set": "Melee Weapons",
    "effect": "The character splits their attack to make two close attacks against separate targets within reach (or they can focus a single attack on a single target). Make a single Melee check and compare it to the targets’ Melee defenses. For these attacks, add +1 to the character’s Melee damage bonus for every 2 points of Focus they spend. On a success, an affected target takes half that total damage. On a Fantastic success, an affected target takes full damage and suffers the weapon’s special effect.",
    "prereq": "Whirling Frenzy, Rank 3",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "10 or more Focus"
  },
  {
    "name": "Grand Fool",
    "set": "Telepathy",
    "effect": "The character uses a mirage to alter their appearance—and the appearance of up to one other person per rank, within 10 spaces—in the minds of people within 20 spaces per rank. Cameras (for instance) can still record them, but when people look in the characters’ direction, they see other people. The target number for anyone trying to see through the mirage is the character’s Logic defense. If the affected characters are impersonating people known to the other person, that person has an edge.",
    "prereq": "Fool, Rank 3",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Grand Illusion",
    "set": "Illusion",
    "effect": "The character creates a sound and sight illusion anywhere in line of sight, within 50 spaces. The illusion can be of anything up to five sizes larger than the character, and it can move freely within its limits. The character breaks concentration if they move beyond 50 spaces from the illusion or lose line of sight of it.",
    "prereq": "Animated Illusion, Rank 3",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Grand Mirage",
    "set": "Telepathy",
    "effect": "The character creates a full-sensory mirage that affects everyone in a Telepathic Network they set up who is also in the same locale. The mirage can be of anything the character desires, and it can move freely.",
    "prereq": "Mirage, Rank 4",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Grappling Technique",
    "set": "Martial Arts",
    "effect": "The character makes a close attack. If the attack is a success, the enemy takes regular damage and is grabbed. On a Fantastic success, the target takes double damage instead and is pinned too.",
    "prereq": "Rank 2",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Ground-Shaking Stomp",
    "set": "Super-Strength",
    "effect": "The character makes a Melee check and compares that against the Agility defense of every target within the character’s reach plus their rank in spaces. Any targets the attack succeeds against take half regular damage. On a Fantastic success, the targets take full damage and are knocked prone.",
    "prereq": "Smash, Rank 3",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Group Flight",
    "set": "Basic",
    "effect": "For every point of Ego the character has, they can hoist one ally into the air with them. The Flight Speed of the group is half the character’s, and all affected allies must remain within 5 spaces times the character’s rank. The character controls each ally’s speed and position during the character’s turn, but they can release any or all allies at any time.",
    "prereq": "Flight 1, Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Group Invisibility",
    "set": "Illusion",
    "effect": "For every point of Ego defense the character has, they can make one person or thing invisible, including themselves. Each of these can be one size bigger than them for every rank they have.",
    "prereq": "Extend Invisibility, Rank 4",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Group Levitation",
    "set": "Telekinesis",
    "effect": "The character can move up to one person per rank through the air in any direction at the character’s Run Speed. The levitated target(s) must remain within 5 spaces times the character’s rank. If any target does not wish to be moved like this, they must be telekinetically grabbed first.",
    "prereq": "Levitation, Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Grow 1",
    "set": "Resize",
    "effect": "The character can grow up to huge size. They can return to their normal size at will.",
    "prereq": "",
    "action": "Standard or reaction",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Grow 2",
    "set": "Resize",
    "effect": "The character can grow up to gigantic size. They can return to their normal size at will.",
    "prereq": "Grow 1",
    "action": "Standard or reaction",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Grow 3",
    "set": "Resize",
    "effect": "The character can grow up to titanic size. They can return to their normal size at will.",
    "prereq": "Grow 2",
    "action": "Standard or reaction",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Grow 4",
    "set": "Resize",
    "effect": "The character can grow up to gargantuan size. They can return to their normal size at will.",
    "prereq": "Grow 3",
    "action": "Standard or reaction",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Growing Attack",
    "set": "Resize",
    "effect": "The character makes a close attack with an edge. If the attack succeeds, they do regular damage for the size they are growing to. On a Fantastic success, they do double damage and stun the target.",
    "prereq": "Grow 1, Rank 2",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Headshot",
    "set": "Ranged Weapons",
    "effect": "The character makes a ranged attack with trouble on an enemy within the weapon’s range. If the attack is a success, the enemy takes double normal damage. On a Fantastic success, the enemy takes triple damage. Either way, if the enemy suffers any actual damage, they are also stunned for one round.",
    "prereq": "Stopping Power, Rank 3",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Healing Factor",
    "set": "Basic",
    "effect": "At the end of the character’s turn, they regain Health equal to their Resilience. (This works outside of combat too, quickly bringing them back to full Health.)",
    "prereq": "",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Healing Hands",
    "set": "Healing",
    "effect": "The character can heal a target creature with a touch. For every point of Focus the character spends, the target regains a point of Health, up to their maximum score. The character must spend at least 10 Focus to use the power. Any Health points that would have been healed beyond the target’s maximum Health are lost.",
    "prereq": "Let’s Go, Rank 3",
    "action": "Standard",
    "duration": "Instant",
    "range": "Reach",
    "cost": "10 or more Focus"
  },
  {
    "name": "Heightened Senses 1",
    "set": "Basic",
    "effect": "The character can sense things roughly twice as far away as normal. They also have an edge on Vigilance checks to perceive things, and enemies have trouble on checks they make to sneak past the character.",
    "prereq": "",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Heightened Senses 2",
    "set": "Basic",
    "effect": "The character can sense things roughly four times as far away as normal. Their senses are so sharp that they can use some of them to compensate for the loss of others (say, if blinded or deafened). They can even listen to the heartbeat of a person in the same room to see if they are lying—although this is as reliable as a traditional lie detector: far from 100% and not admissible in court. They also have a double edge on Vigilance checks to perceive things, and enemies have double trouble on checks they make to sneak past the character.",
    "prereq": "Heightened Senses 1",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Hellfire Chains",
    "set": "Magic",
    "effect": "The character summons chains covered in hellfire and can use them to bind or smash targets. They can attack anyone within 10 spaces per rank and line of sight. Make an Ego attack. On a success, the target takes regular Health damage. On a Fantastic success, the target is grabbed and paralyzed too. If a target is grabbed by the hellfire chains, on each subsequent round, the character can make an Ego check against the target’s Resilience Resilience defense to inflict regular Health damage and regular Focus damage. Breaking free from the hellfire chains requires a Melee check with a target number of 20.",
    "prereq": "Cursed, Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Hex Bolt",
    "set": "Magic",
    "effect": "The character fires a hex bolt at a foe. Make an Ego check against the target’s Agility defense. On a success, the attack does regular damage. On a Fantastic success, it does double damage and causes the target trouble for one round.",
    "prereq": "Chaotic, Rank 2",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "HiFi Design",
    "set": "Telekinesis",
    "effect": "The character’s personal telekinetic field protects them. Any attacks against them that do 10 points of damage or less are instantly absorbed, and the protection continues. If an attack does more than 10 points of damage, it destroys the protection, allowing excess damage through.",
    "prereq": "Telekinetic Barrier, Rank 2",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Hit & Run",
    "set": "Melee Weapons",
    "effect": "The character makes a close attack with an edge on an enemy. If the attack is a success, the enemy takes regular damage, and the character can make an additional movement up to half their Run Speed for free. On a Fantastic success, the enemy takes double damage and suffers the weapon’s special effect.",
    "prereq": "",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Hit the Dirt",
    "set": "Tactics",
    "effect": "All allies within earshot can fall prone if they wish and are able to. If falling prone makes the ally an ineligible target for the initial attack, the attack automatically fails. //7/ //7/",
    "prereq": "Keep Moving, Rank 2",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Home Universe",
    "set": "Narrative Limitation",
    "effect": "The character’s powers only function in their home universe. Because of this, they usually refuse to move to another universe, and if they do, they lose most (if not all) of their powers.",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Hurled Shield Bash",
    "set": "Shield Bearer",
    "effect": "The character makes a ranged attack on an enemy. If the attack is a success, the enemy takes regular damage. On a Fantastic success, the enemy takes double damage and is knocked prone. The shield then bounces back to the character.",
    "prereq": "Shield Bash, Rank 2",
    "action": "Standard",
    "duration": "Instant",
    "range": "10 spaces times the character’s rank",
    "cost": "5 Focus"
  },
  {
    "name": "Hurled Shield Block",
    "set": "Shield Bearer",
    "effect": "The ally gains Health Damage Reduction equal to the character’s Shield power against that attack. The shield then bounces back to the character.",
    "prereq": "Shield 1, Rank 2",
    "action": "Reaction",
    "duration": "Instant",
    "range": "5 spaces times the character’s rank",
    "cost": "5 Focus"
  },
  {
    "name": "Hurled Shield Deflection",
    "set": "Shield Bearer",
    "effect": "The enemy has trouble on the attack. The shield then bounces back to the character.",
    "prereq": "Shield Deflection, Rank 2",
    "action": "Reaction",
    "duration": "Instant",
    "range": "5 spaces times the character’s rank",
    "cost": "5 Focus"
  },
  {
    "name": "Iconic Item",
    "set": "Basic",
    "effect": "The character is known for owning and using a unique and powerful item, like Mjolnir or an AVENG.E.R.S. jacket. See the Iconic Items section of this book for a list of such items and rules on how to build them. The Narrator must approve the details of any new iconic item. This power can be taken more than once, but each time must be for a different item. This power can replace the Iconic Weapon power, if the player wishes.",
    "prereq": "",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Iconic Weapon",
    "set": "Basic",
    "effect": "The character is known for owning and using a unique and powerful weapon, like Mjolnir (Thor’s hammer) or Captain America’s shield. The Narrator must approve the details of this weapon. This power can be taken more than once, but each time must be with a different weapon.",
    "prereq": "",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Icy Tendrils of Ikthalon",
    "set": "Magic",
    "effect": "The character makes an Ego check against the Agility defense of a target in their line of sight. If the attack is a success, it inflicts regular damage. On a Fantastic success, the enemy takes double that total damage and is paralyzed by the ice.",
    "prereq": "Sorcerous, Rank 2",
    "action": "Standard",
    "duration": "Instant",
    "range": "10 spaces",
    "cost": "5 Focus"
  },
  {
    "name": "Illumination",
    "set": "Illusion",
    "effect": "The character illuminates one object or point in line of sight, within 50 spaces, with bright light. The character can maintain concentration on the effect even if they move out of range or line of sight.",
    "prereq": "",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": ""
  },
  {
    "name": "Images of Ikonn",
    "set": "Magic",
    "effect": "The character creates one sound and sight illusory duplicate per rank of one person they’ve met (including themselves). The duplicates look and sound exactly like the original and are under the character’s complete control. They start in the same space as the character and instantly move into any open space around them, up to 2 spaces away, during which time the character can swap places with any of the duplicates. If the character is duplicating themselves, the character’s player should secretly record which one is the actual character. The duplicates can move up to 10 spaces away from the character, and they can pretend to attack (and miss) opponents. Any attack that hits a duplicate instantly removes it. If the character successfully attacks someone or does something else to make the truth evident, the illusion ends. This spell can also be used to see through someone else’s illusion. When used in this way, it gives the character a double edge on their Ego check.",
    "prereq": "Sorcerous, Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Imbue Life",
    "set": "Narrative Power",
    "effect": "The character can imbue unliving matter with life. This can be an existing kind of life-form or, if they have the power to construct such things, a new one of their own creation. This power can also be used to bring an existing life-form back from the dead. In either case, the life-form must be able to function independently for it to continue to live. If it cannot—due to injuries, extant conditions or an unworkable design—the life-form is doomed to die again soon.",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Immortality",
    "set": "Narrative Power",
    "effect": "The character cannot be permanently killed by normal means. If they do die, they usually return within a short amount of time. They may return in the same form or in an altered form. Infinity), Galactus",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Immovable",
    "set": "Shield Bearer, Super-Strength",
    "effect": "For every point of Melee defense the character has, they can reduce knockback by 1 space.",
    "prereq": "",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Indecipherable",
    "set": "Translation",
    "effect": "The character has constructed an internal language that only they can understand. They think in this language entirely, and when they communicate with others, they are translating from that language. This effectively renders them immune to telepathic powers like Mind Reading or Mind Interrogation, as anyone trying to read their mind cannot understand this unique language.",
    "prereq": "Understand Spoken Language, Understand Unusual Communication, Rank 3",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Information Upload",
    "set": "Telepathy",
    "effect": "The character transmits a knowledge-based label (a trait or tag) of their own to a target with whom they have established a telepathic link—willing or not. The label lasts until the target sleeps. The character can also impart any other kind of knowledge they have to a target this way. The process is almost instantaneous.",
    "prereq": "Telepathic Link, Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Inspiration",
    "set": "Basic",
    "effect": "The character inspires an ally in earshot. The ally gains an edge on all action checks until the start of the character’s next turn.",
    "prereq": "",
    "action": "Standard",
    "duration": "1 round",
    "range": "",
    "cost": ""
  },
  {
    "name": "Instant Evolution",
    "set": "Narrative Power",
    "effect": "The character instantly adapts to any threats against them. They develop new powers or abilities that can protect them from the threat. However, they don’t have direct control over how this happens. For instance, if trapped in a dark room, they develop the ability to see in the dark. If being shot at, their power might give them bulletproof skin, allow them to turn intangible or perhaps break the gun. It’s up to the Narrator how the power works in any specific situation. The power always serves to save the character, but it doesn’t care about other people nearby, whether innocent bystanders or the character’s best friends. If a bomb is about to go offin a room, for example, this power might make the character bomb-proof or perhaps able to stop the bomb, or it might simply teleport them a safe distance away, leaving everyone else in danger. Once the specific danger to the character is over, the extra abilities disappear, as they are no longer needed. They never linger, no matter how much the character might want them to.",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Instant Replay",
    "set": "Omniversal Travel",
    "effect": "Once per battle, the character can make a second attempt at a check that they just failed, erasing and replacing the first attempt entirely.",
    "prereq": "Rank 3",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Integrity",
    "set": "Basic",
    "effect": "The character can use their Logic defense score against Ego attacks too.",
    "prereq": "",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Intuition",
    "set": "Sixth Sense",
    "effect": "When faced with a decision, the character can get a feeling about which choice would be best for them in the long run. When activating this power, the player presents the choice to the Narrator, and the Narrator tells them which choice the intuition is leading the character toward. Characters should take care when using this power. What is best for them might not be best for the rest of the team or anyone else they care about. Also, what’s best in the long run might not be best for the character in the short run. In fact, what’s best is often up for interpretation.",
    "prereq": "Rank 2",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Invisibility",
    "set": "Illusion",
    "effect": "The character becomes invisible. They have an edge on Agility checks to sneak past people, and enemies have trouble on Vigilance checks to perceive them. It’s even harder to spot things that are invisible but aren’t moving. Characters must be actively trying to do so to be able to make a Vigilance check.",
    "prereq": "Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Invulnerable Form",
    "set": "Narrative Power",
    "effect": "The character cannot be physically harmed—take Health damage—by normal means.",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Invulnerable Mind",
    "set": "Narrative Power",
    "effect": "The character cannot be telepathically harmed—take Focus damage—by normal means.",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Jinx",
    "set": "Magic",
    "effect": "The character makes an Ego check against the target’s Ego defense. If it succeeds, the target has trouble on all actions. On a Fantastic success, the target loses their next standard action.",
    "prereq": "Chaotic, Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Jinx You",
    "set": "Luck",
    "effect": "The character makes a Melee check to touch the target. On a success, the power takes effect, and that foe has trouble on all action checks made for the power’s duration. On a Fantastic success, the target also takes standard (not doubled) Melee damage. The character must pay the Focus cost at the start of each of their subsequent turns of concentration to keep the power working.",
    "prereq": "Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "Reach",
    "cost": "5 Focus per turn"
  },
  {
    "name": "Jinx You All",
    "set": "Luck",
    "effect": "The character picks up to one foe per rank in their line of sight. Those foes have trouble on all action checks made for the power’s duration. There is no limit on the range from the character to their foes once the power is activated. The character must pay the Focus cost at the start of each of their subsequent turns of concentration to keep the power working.",
    "prereq": "Evil Eye, Rank 3",
    "action": "Standard",
    "duration": "Concentration",
    "range": "5 spaces per rank",
    "cost": "10 Focus per turn"
  },
  {
    "name": "Jump 1",
    "set": "Spider-Powers, Super-Strength",
    "effect": "The character gains the Jump movement mode with a Jump Speed equal to their Run Speed. They can jump this distance in any direction, vertically as well as horizontally.",
    "prereq": "Rank 2",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Jump 2",
    "set": "Spider-Powers, Super-Strength",
    "effect": "The character’s Jump Speed is equal to their rank times their Run Speed. Outside of combat, they can move three times as fast.",
    "prereq": "Jump 1, Rank 3",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Jump 3",
    "set": "Spider-Powers, Super-Strength",
    "effect": "Outside of combat, the character can jump up to 50 times their Jump Speed.",
    "prereq": "Jump 2, Rank 4",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Keep Moving",
    "set": "Tactics",
    "effect": "The demoralized or stunned condition ends.",
    "prereq": "",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Kill Zone",
    "set": "Ranged Weapons",
    "effect": "The character makes a ranged attack on the enemy. If the attack is a success, the enemy takes normal damage. On a Fantastic success, the enemy takes double damage. Either way, the character regains their reaction. Each target can be affected by this attack by this character only once per round.",
    "prereq": "Covering Fire, Headshot, Rank 4",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Leaping Leglock",
    "set": "Martial Arts",
    "effect": "The character makes a close attack against an enemy. If the attack is a success, the enemy is grabbed and dealt regular damage. On a Fantastic success, the enemy takes double damage and is grabbed and stunned for one round. Either way, both the character and the enemy are knocked prone.",
    "prereq": "Flying Double Kick, Crushing Grip, Rank 4",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Leech Life",
    "set": "Magic",
    "effect": "The character makes an Ego attack against the target’s Resilience defense. If it succeeds, the target takes regular Health damage, and the character heals half that much Health for themselves. On a Fantastic success, the character heals the full Health damage instead.",
    "prereq": "Rank 2",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Leg Sweep",
    "set": "Martial Arts",
    "effect": "The character makes a close attack. If it succeeds, the enemy takes regular damage and is knocked prone. If it’s a Fantastic success, the enemy is stunned for one round too.",
    "prereq": "Fast Strikes, Rank 2",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Let’s Go",
    "set": "Healing",
    "effect": "The character can eliminate the effects of a target losing all of their Health. Rather than falling unconscious, the target remains awake and mobile. They can use movement actions but not reactions or standard actions. This does not protect a character from death. They can be killed normally, and this power cannot bring back a dead character. Once the power takes effect, the target does not have to remain within the character’s reach. When the effect ends, if the target has 0 Health or less, they become unconscious. If the target’s Health rises above 0 at any point, this power automatically ends.",
    "prereq": "Rank 2",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "Reach",
    "cost": "5 Focus"
  },
  {
    "name": "Levitation",
    "set": "Telekinesis",
    "effect": "The character can move through the air in any direction at their Run Speed.",
    "prereq": "",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Lightning Actions",
    "set": "Super-Speed",
    "effect": "Once per round, the character can use a standard action as a reaction or a reaction as a standard action. Additionally, they can turn their Marvel die to a Fantastic success when making an initiative check.",
    "prereq": "Rank 4",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Limited Omnipotence",
    "set": "Narrative Limitation",
    "effect": "The character’s omnipotence is limited to a number of powers or power sets rather than encompassing all standard powers. Sometimes, the powers or power sets they are not able to use are listed instead.",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Limited Timelines",
    "set": "Narrative Limitation",
    "effect": "The character (who o en also has the Timeless narrative power) can only exist in a limited number of related timelines. This may be due to the use of a Concordance Engine or for some other reason.",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Living Energy",
    "set": "Narrative Power",
    "effect": "The character is a being of pure energy and only takes on material form so that it can interact with material beings. O† en this is done by creating armor—as with the Celestials and Galactus—to house the character’s energy. Other times, the character creates a material avatar (a body) it can inhabit and use to interact with the material world.",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Lucky Me",
    "set": "Luck",
    "effect": "The character gains an edge on all action checks made while this power is in effect. The character must pay the Focus cost at the start of each of their subsequent turns of concentration to keep the power working.",
    "prereq": "Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus per turn"
  },
  {
    "name": "Lucky Us",
    "set": "Luck",
    "effect": "The character picks up to one ally in their line of sight per the character’s rank. The character and those allies gain an edge on all action checks made while this power is in effect. There is no limit on the range from the character to their allies once the power is activated. The character must pay the Focus cost at the start of each of their subsequent turns of concentration to keep the power working.",
    "prereq": "Wish You Luck, Rank 3",
    "action": "Standard",
    "duration": "Concentration",
    "range": "5 spaces per rank",
    "cost": "10 Focus per turn"
  },
  {
    "name": "Lucky You",
    "set": "Luck",
    "effect": "The character touches an ally. That ally gains an edge on all action checks made while this power is in effect.",
    "prereq": "Lucky Me, Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "Reach",
    "cost": "5 Focus per turn"
  },
  {
    "name": "Machine Telepathy",
    "set": "Telepathy",
    "effect": "The character can communicate telepathically with one machine at a time, and they must have met or seen the machine before. The communication can be verbal, visual or even more complex, such as imparting location information. There is no limit to the distance of the communication, as long as the character and the machine are in the same dimension. Simple machines do not have much to offer in the way of conversation, but they are also generally compliant with requests. Complex machines—like computers, smartphones and other electronics—are also often compliant, but if they are secured in any way, they usually refuse to communicate with strangers. A Logic check can get the character past such security, and the Narrator should set the target number according to the strength of the security.",
    "prereq": "",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": ""
  },
  {
    "name": "Macrodimensional Travel",
    "set": "Resize",
    "effect": "The character can grow enough to travel into the Macroverse, the Overspace or other dimensions of enlarged space. They can return to their normal size at will. Note that this is something that most characters would rarely want to do, as it removes them entirely from their regular universe and places them in a dimension in which the rules of time and space work differently. An hour in the Macroverse, for example, is roughly equivalent to a month in a regular universe. A trip to the Overspace is too overwhelming for most minds to handle.",
    "prereq": "Grow 4, Rank 4",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Magic Masks",
    "set": "Narrative Power",
    "effect": "The character has a satchel that carries several magic masks that give the wearer the traits, tags and powers associated with that mask, both good and bad. For example, a werewolf mask transforms the character into an actual werewolf. The character can wear only one mask at a time. Switching between them requires a standard action. Wearing a mask usually does not change the character’s size, even if the thing they would be like is usually a different size. Powers granted by the mask ignore all prerequisites. Masks can be created as required. Known masks include: Black Cat ◆Traits:Combat Reflexes, Monster ◆Tags:Extreme Appearance ◆Powers:Real Jinx, Vicious Attack (Sharp) ◆Claws: Add +1 to Melee damage multiplier. Devil ◆Traits:Dealmaker, Monster ◆Tags:Cursed, Extreme Appearance ◆Powers: Penance Stare, Possession, Sense Sins Evil Clown ◆Traits:Monster ◆Tags:Extreme Appearance ◆Powers: Penance Stare, Sense Sins ◆Fantastic success on attacks frightens target for one round. Frankenstein’s Monster ◆Traits:Monster ◆Tags:Extreme Appearance ◆Powers: Mighty 1, Sturdy 1 Ghost ◆Traits:Monster ◆Tags:Extreme Appearance ◆Powers: Disrupt Electronics, Invisibility, Phase Self ◆Fantastic success on attacks frightens target for one round. Gorilla ◆Traits:Free Running ◆Tags:Extreme Appearance ◆Powers: Brawling, Mighty 1, Vicious Attack (Blunt) Human Fly ◆Traits:Combat Reflexes, Monster ◆Tags:Extreme Appearance ◆Powers: Danger Sense, Evasion, Flight 1, Heightened Senses 1 Model ◆Traits:Beguiling, Presence Mummy ◆Traits:Monster ◆Tags:Deceased, Extreme Appearance ◆Powers: Additional Limbs (wrappings), Extended Reach 1 (wrappings), Mighty 1 Police Offi cer ◆Traits:Interrogation, Investigation ◆Tags:Authority Shark ◆Traits:Breathe Different, Monster ◆Tags:Amphibious, Extreme Appearance ◆Powers:Speed Swim, Vicious Attack (Sharp) ◆Teeth: Add +1 to Melee damage multiplier. Tiger ◆Traits:Combat Reflexes, Monster ◆Tags:Extreme Appearance ◆Powers:Brawling, Vicious Attack (Sharp) ◆Claws: Add +1 to Melee damage multiplier. Spider-Man ◆Traits: Combat Reflexes ◆Powers: Evasion, Mighty 1, Spider-Sense, Wallcrawling, Webcasting, Webslinging Vampire ◆Traits:Anathema: Garlic/Holy Symbols (including holy water)/Sunshine, Bloodthirsty, Monster, Weakness: Silver/Wood ◆Tags:Alternate Form: Bat/Mist/Wolf, Deceased, Imageless ◆Powers:Animal Communication: Bats/Rodents, Command, Healing Factor, Leech Life, Mighty 1, Sturdy 2, Telepathic Link Werewolf ◆Traits:Berserker, Monster, Weakness: Silver ◆Tags:Extreme Appearance, Lunar Transformation ◆Powers:Evasion, Healing Factor, Heightened Senses 1, Mighty 1, Sturdy 2 Witch ◆Traits:Dealmaker ◆Tags:Extreme Appearance ◆Powers: Hex Bolt, Jinx, Powerful Hex, Protection Hex, Sense Supernatural Other masks can be summoned from the satchel as needed. These can allow the character to emulate anything the mask represents. The character can put the masks on other people. If the character drops any masks, they can be picked up and worn by others too. The character can remove any such masks from another person with a successful Melee attack that does at least 1 point of damage—or if the wearer permits it.",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Manifestation",
    "set": "Narrative Power",
    "effect": "To any sentient observer, the character appears to have the form of a member of the observer’s species. The character might differ from the observer in certain ways, but to a human, for instance, they appear human-shaped.",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Matter Manipulation",
    "set": "Narrative Power",
    "effect": "The character can rearrange and reshape matter of any kind and can also transmute matter into different kinds of matter. This is o† en done with a single object at a time, but it is usually limited to a single object of gargantuan size—or a group of objects that would total gargantuan size.",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Memory Blip",
    "set": "Telepathy",
    "effect": "The character causes a target with whom they’ve established a Telepathic Link to forget something that’s happened in the past hour. This gap can be up to an hour in length. The character makes a Logic check against the target’s Logic defense. On a success, the memories are forgotten. On a Fantastic success, the target has trouble on checks to recover such memories in the future. //7/ Jeromy Cox Any time the target is given good reason to question the blank in their memory, they can make a Logic check to recover their memory. If they succeed, the original memory floods back. On a Fantastic success, they know for sure who did this to them.",
    "prereq": "Telepathic Link, Rank 2",
    "action": "Standard",
    "duration": "Permanent",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Mental Punch",
    "set": "Telepathy",
    "effect": "The character makes a Melee attack against a target. If the attack is a success, it inflicts regular Focus damage (instead of Health damage). On a Fantastic success, the target takes double damage instead and is stunned for one round.",
    "prereq": "",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Mental Shelter",
    "set": "Telepathy",
    "effect": "The character extends their mental defenses to protect any chosen people within up to 5 spaces times their rank. The protected targets are granted Focus Damage Reduction equal to the character’s Uncanny power.",
    "prereq": "Uncanny 1, Rank 3",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Microdimensional Travel",
    "set": "Resize",
    "effect": "The character can shrink enough to travel into subatomic realms. They can return to their normal size at will. Note that this is something that most characters would rarely want to do, as it removes them entirely from their regular universe and places them in a dimension in which the rules of time and space work differently. The Underspace, for example, might make a fine place to hide, but there’s little else of interest there.",
    "prereq": "Shrink 4, Rank 4",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Microscopic Awareness",
    "set": "Sixth Sense",
    "effect": "The character can see and identify items that would normally require a microscope to detect, much less comprehend. This includes things like fingerprints, a single strand of hair and even a person’s DNA. In the case of DNA, the character can use this to identify a person and link them to close relatives with similar DNA. mpidis Jim Charala el Shelfer & Micha d Baldeón, Art by Davi",
    "prereq": "Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "1 space per rank",
    "cost": "5 Focus"
  },
  {
    "name": "Mighty 1",
    "set": "Basic",
    "effect": "Treat the character as one size bigger for lifting, carrying, swinging and throwing things. They also add +1 to their Melee damage multiplier, and they gain a +1 bonus to Melee checks other than attacks.",
    "prereq": "",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Mighty 2",
    "set": "Basic",
    "effect": "Treat the character as two sizes bigger for lifting, carrying, swinging and throwing things. They also add +2 to their Melee damage multiplier, and they gain a +2 bonus to Melee checks other than attacks.",
    "prereq": "Mighty 1, Rank 2",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Mighty 3",
    "set": "Basic",
    "effect": "Treat the character as three sizes bigger for lifting, carrying, swinging and throwing things. They also add +3 to their Melee damage multiplier, and they gain a +3 bonus to Melee checks other than attacks.",
    "prereq": "Mighty 2, Rank 3",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Mighty 4",
    "set": "Basic",
    "effect": "Treat the character as four sizes bigger lifting, carrying, swinging and throwing things. They also add +4 to their Melee damage multiplier, and they gain a +4 bonus to Melee checks other than attacks.",
    "prereq": "Mighty 3, Rank 4",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Mind Interrogation",
    "set": "Telepathy",
    "effect": "The character can delve into the mind of a single person with whom they have established a telepathic link. This requires a Logic check against the target’s Logic defense. On a success, the character can ask a single simple question and get the answer from the target’s mind. On a Fantastic success, the character can get more complex information.",
    "prereq": "Mind Reading, Rank 2",
    "action": "Standard",
    "duration": "1 round",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Mind Reading",
    "set": "Telepathy",
    "effect": "The character can read the thoughts of a single person with whom they have established a Telepathic Link. This requires a Logic check against the target’s Logic defense. On a success, the character can read the target’s surface thoughts. On a Fantastic success, the character can ask a single simple question and get the answer from the target’s mind.",
    "prereq": "Telepathic Link",
    "action": "Standard",
    "duration": "1 round",
    "range": "",
    "cost": ""
  },
  {
    "name": "Mirage",
    "set": "Telepathy",
    "effect": "The character creates a full-sensory mirage that affects any target with whom they have established a link. The mirage can be of anything the character desires, and it can move freely.",
    "prereq": "Telepathic Link, Rank 3",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Mirror Images",
    "set": "Illusion",
    "effect": "The character creates one sound and sight illusory duplicate of themselves per rank. The duplicates look and sound exactly like them and are under their complete control. They start in the same space as the character and instantly move into any open space around them, up to 2 spaces away, during which time the character can swap places with any of the duplicates. The character’s player should secretly record which one is the actual character. The duplicates can move up to 10 spaces away from the character, and they can pretend to attack (and miss) opponents. Any attack that hits a duplicate instantly removes it. If the character successfully attacks someone or does something else to make the truth evident, the illusion ends.",
    "prereq": "Animated Illusion, Rank 3",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Mists of Morpheus",
    "set": "Magic",
    "effect": "The character makes an Ego check against the target’s Vigilance defense. On a success, the target is stunned and remains that way while the character concentrates. On a Fantastic success, the target falls asleep instead.",
    "prereq": "Sorcerous, Rank 3",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Mists of Munnopor",
    "set": "Magic",
    "effect": "The character creates a thick fog for up to 100 spaces per rank around them that blocks all line of sight beyond 10 spaces and keeps people or creatures inside it from flying, gliding or webslinging.",
    "prereq": "Sorcerous, Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Molecular Destabilization",
    "set": "Super-Speed",
    "effect": "The character makes a close attack against an object their size or smaller. If the attack is a success, the object explodes. All targets within 2 spaces of the object— other than the character—take regular damage. On a Fantastic success, double the damage and ignore any Health Damage Reduction.",
    "prereq": "Speed Run 2, Rank 4",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Multiversal",
    "set": "Narrative Power",
    "effect": "The character exists across multiple universes at once and can also exist in multiple places in each of those universes at once. In addition, the character is unique across the known Multiverse. Instances that exist in other universes are not variants of the character but the actual character in several places at once.",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Multiversal Portal",
    "set": "Omniversal Travel",
    "effect": "The character opens a glowing portal in a space next to them that moves anything that enters it between that space and its destination, which forms a matched glowing portal in the other place. The other end of the portal must be in a clear space in another universe that the character has been to. Anything can move through the portal in either direction until it is closed, which the character can do at will.",
    "prereq": "Multiversal Travel Together, Rank 4",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Multiversal Travel",
    "set": "Omniversal Travel",
    "effect": "The character instantly moves from their current universe to another universe. For instance: from Earth-616 to Earth-65. When they move to the other universe, they can arrive in any place they’ve been to before. Otherwise, they arrive at the closest available corresponding space in the other universe.",
    "prereq": "Rank 3",
    "action": "Standard or movement",
    "duration": "Instant",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Multiversal Travel Other",
    "set": "Omniversal Travel",
    "effect": "The character makes an Ego check against the Vigilance of a target they have grabbed. If the check is successful, the character can send the target to another universe. The target can be sent to any location in that universe that the character has been to before. Otherwise, the target arrives at the closest available corresponding space in the other universe.",
    "prereq": "Multiversal Travel, Rank 4",
    "action": "Standard, movement, or reaction",
    "duration": "Instant",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Multiversal Travel Together",
    "set": "Tactics",
    "effect": "All prone allies within earshot, who are able to, can immediately stand up for free. Allies currently unable to stand up for any reason are not affected.",
    "prereq": "Keep Moving, Rank 2",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Never Surrender",
    "set": "Healing",
    "effect": "The character can eliminate the effects of a target losing all of their Focus. Rather than becoming demoralized, the target can function normally without having trouble on all their actions due to their lack of Focus. They cannot spend more Focus, though, and they can still be shattered. Once the power takes effect, the target does not have to remain within the character’s reach. When the effect ends, if the target has 0 Focus or less, they become demoralized. If the target’s Focus rises above 0 at any point, this power automatically ends.",
    "prereq": "Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "Reach",
    "cost": "5 Focus"
  },
  {
    "name": "Operations Center",
    "set": "Tactics",
    "effect": "The character inspires one or more allies of their choice in earshot, up to the character’s Vigilance defense. Affected allies gain an edge on all action checks until the start of the character’s next turn. The character breaks concentration on this power if they use a movement action.",
    "prereq": "Combat Support, Focus Fire, Rank 4",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Orchestra of Overkill",
    "set": "Ranged Weapons",
    "effect": "The character makes an Agility check and compares that against the Agility defense of every enemy within 10 spaces and in their line of sight. Each success does half regular damage. On a Fantastic success, each enemy takes full damage instead and is bleeding.",
    "prereq": "Dance of Death, Fast Hands, Rank 4",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Orders",
    "set": "Telepathy",
    "effect": "The character gives an order to a target with whom they’ve established a Telepathic Link and who has no Focus left. The character makes a Logic check against the target’s Logic defense. On a success, the target complies with the orders. On a Fantastic success, the character gains an edge the next time they use this power against this same target. The command must be to do something that can be completed in an hour or less. If it involves harming someone, the character has trouble on the check. If it would cause the target to harm themselves, the character has double trouble on the check.",
    "prereq": "Command, Rank 4",
    "action": "Standard",
    "duration": "Permanent",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Partial Phase",
    "set": "Phasing",
    "effect": "The character has greater control over their phasing ability. They can make any portion of their body and clothing tangible or intangible, as they like.",
    "prereq": "Phase Self, Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Penance Stare",
    "set": "Magic",
    "effect": "The character makes an Ego attack against a target character within 3 spaces per rank. If it’s a success, the target takes Focus damage. On a Fantastic success, the target takes double damage and is paralyzed for one round. Characters with the Heroic tag take half the listed damage from this power in either case. If a target is shattered by this power, they can recover, but they come back in one of two ways. Either they are cleansed of their sins and ready to make a new start with a clean slate, or their emotions are drained from them permanently. How this works in each case is up to the Narrator.",
    "prereq": "Cursed",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Phase Object",
    "set": "Phasing",
    "effect": "The character can make any object they are touching intangible. The object (and things attached to or inside of it) can be up to their rank in sizes bigger than them. For example, if they are Rank 5, the object can be 5 sizes bigger than them. For an average person, this would be Gargantuan.",
    "prereq": "Phase Self, Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Phase Other",
    "set": "Phasing",
    "effect": "The character can make any person (and their clothing) they are touching intangible. The character can also phase any people the initial person is touching or grabbing. People the character has phased remain tangible to each other. If the target does not wish to be phased, the character must grab them first. When contact is broken, the phasing for those no longer in contact with the character (even indirectly) ends. //7/ Ar t by John Cassa day & Laura Marti n If a person is inside something when they stop phasing, they are automatically pushed out of it but take damage from the disruption equal to a standard action check. The damage multiplier is 1 for every space they must move to reach a clear area. If this kills them, their body is trapped inside the material they were phased into.",
    "prereq": "Phase Self, Rank 3",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Phase Self",
    "set": "Phasing",
    "effect": "The character (and their clothing) becomes intangible and can move through anything as if it wasn’t there. Nothing can physically affect them, nor can they affect anything else that is not phasing along with them.",
    "prereq": "",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": ""
  },
  {
    "name": "Phase Walk",
    "set": "Phasing",
    "effect": "When phasing, the character can move freely in any direction through anything—not just air, but also water, buildings and so on—at their Run Speed. The character can take anything or anyone they are phasing along with them.",
    "prereq": "Phase Self, Rank 2",
    "action": "",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Planetary Sized",
    "set": "Narrative Limitation",
    "effect": "The character is roughly the size of a planet or larger. They cannot travel to other planets or get too close to other planetary systems for fear of their mass disturbing the delicate dance of gravitational forces. Others can visit them, though, and land on their surface. O en, the character can create avatars to interact with other people, or they can communicate telepathically. t By Wellinton Alves, Geraldo Borges, Scott Hanna, Nelson Pereira, Anderson Silva & GURU-eFX",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Point-Blank Parry",
    "set": "Ranged Weapons",
    "effect": "The character makes a ranged attack against the enemy who missed them. If the attack is a success, the enemy takes regular damage. On a Fantastic success, the enemy takes double damage and is bleeding.",
    "prereq": "Rank 2",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Possess Vehicle",
    "set": "Magic",
    "effect": "The character takes magical control of a vehicle they are inside of or touching. Hellfire engulfs the outside of the vehicle, but it does no damage to it. Anyone that comes into contact with it, though, takes regular damage with a damage multiplier equal to the character’s rank. On a Fantastic success, it inflicts regular Health damage and regular Focus damage instead. The character controls the vehicle by will, as long as it is within 20 spaces times the character’s rank. They use their Ego for all checks to operate it, and they get an edge on all such checks. The vehicle’s speed doubles. It can climb walls at this speed and can even make jumps at that same speed.",
    "prereq": "Cursed, Rank 3",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Possession",
    "set": "Magic",
    "effect": "The character makes an Ego check with trouble against the Ego defense of a character who has no Focus left. On a success, the character takes over the target’s body completely. The character’s Ego defense is the target number for any checks to end the possession. If the character attempts to harm someone with the possessed body, the target gets to make an Ego check to end the possession. If the target has the Heroic tag, they get an edge on the check. If the character attempts to harm the possessed body, the target gets an edge on the check. If they have the Heroic tag, they get a double edge.",
    "prereq": "Cursed, Rank 5",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "20 Focus"
  },
  {
    "name": "Postcognition 1",
    "set": "Sixth Sense",
    "effect": "The character can sense what happened to a particular person, place or item within their reach— including themselves—in the past six hours. If using the power to analyze a person, they sense the events from the person’s point of view, using that person’s senses. If the person is unconscious, dead or otherwise senseless at any point during that time, the character cannot sense anything at those points either. If using the power to analyze a place, the character can sense everything that happened in that place over that period of time, using their own senses. It seems to the character as if they are standing in their current location and position. If using the power to analyze an item, the character senses how the item was affected or used over that period of time, no matter where it was located or how it moved. They can sense things as if the item had their senses. The character can fast-forward and rewind through the period of time and stop at interesting parts, allowing them to play out in real time.",
    "prereq": "Rank 2",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Postcognition 2",
    "set": "Sixth Sense",
    "effect": "The character can sense what happened to a particular person, place or item within their reach— including themselves—in the past 24 hours. Otherwise, this power works the same as Postcognition 1.",
    "prereq": "Postcognition 1, Rank 3",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Postcognition 3",
    "set": "Sixth Sense",
    "effect": "The character can sense what happened to a partic- ular person, place or item within their reach—including themselves—in any 24-hour period in the past year. Other- wise, this power works the same as Postcognition 1.",
    "prereq": "Postcognition 2, Rank 4",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Postcognition 4",
    "set": "Sixth Sense",
    "effect": "The character can sense what happened to a partic- ular person, place or item within their reach—including themselves—in any week-long period in the past century. Otherwise, this power works the same as Postcognition 1.",
    "prereq": "Postcognition 3, Rank 5",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "20 Focus"
  },
  {
    "name": "Power Cosmic",
    "set": "Basic",
    "effect": "The character’s access to the Power Cosmic allows them to use any other power that they have the rank to use, even if they would not normally meet its other prerequisites. They must pay whatever the regular Focus cost is for that power, plus 5 Focus. If the duration of the used power is permanent, it is concentration for the character instead. If the power is a numbered permanent power (like Mighty 3), the Focus cost is 5 times that number instead. (For example, Mighty 3 would cost 15 Focus.)",
    "prereq": "Rank 5, Weird Science: Power Cosmic origin",
    "action": "Standard",
    "duration": "Varies",
    "range": "",
    "cost": "5 or more Focus"
  },
  {
    "name": "Power Slider",
    "set": "Power Control",
    "effect": "The character has a single criterion that affects the strength of their powers on a spectrum. The character starts off normal, but they can become boosted or dampened from there. When things are going well for the character, all of their other powers are boosted. If the powers have ranges or effective areas or durations, these are doubled. If the powers affect damage multipliers, add 1 to the effects. Any effects that normally happen on a Fantastic success automatically happen on any success, not just a Fantastic one. Also, anything that would dampen their powers only brings them back to normal. When things are going poorly for the character, all of their other powers are dampened. If the powers have ranges or effective areas or durations, these are halved. If the powers affect damage multipliers, subtract 1 from the effects. The power can no longer enjoy Fantastic successes. Also, anything that would boost their powers only brings them back to normal. These effects last for a single combat or—if they happen outside of combat—a single day. Here are three criteria to pick from: confidence, faith and media popularity. With the Narrator’s consent, players can come up with others. ▶ Confidence: If the character gets a Fantastic success on an important action check, their confidence soars, and their powers are boosted. If the character fails an important action check, their confidence falls, and their powers are dampened. ▶ Faith: If something the character believes as a core part of their faith is shown to be true, their faith soars and their powers are boosted. If something the character believes as a core part of their faith is shown to be doubtful, their faith falls, and their powers are dampened. ▶ Media Popularity: If the character’s media ratings substantially rise (more people watch their shows), their powers are boosted. If the character’s media ratings substantially fall (fewer people watch their shows), their powers are dampened. The criteria in question may go up and down often, seeming to leave the character to the whims of fate, but ignore minor changes. Only something that feels like a special moment should cause a change. Players may be tempted to set up their characters to constantly succeed. If this happens, Narrators should remember that they can often tip matters in the other direction. The swinging back and forth makes things more fun than keeping them always on an even keel.",
    "prereq": "Rank 3",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Powerful Hex",
    "set": "Magic",
    "effect": "The character casts a hex that allows them to use any other power that they have the rank to use, even if they would not normally meet the power’s other prerequisites. They must pay whatever the regular Focus cost is for that power, plus 5 Focus. If the duration of the used power is permanent, it is concentration for the character instead. If the power is a numbered permanent power (like Mighty 3), the Focus cost is 5 times that number instead. (Mighty 3 would cost 15 Focus.)",
    "prereq": "Chaotic, Rank 2",
    "action": "Standard",
    "duration": "Varies",
    "range": "",
    "cost": "5 or more Focus"
  },
  {
    "name": "Precognition 1",
    "set": "Sixth Sense",
    "effect": "The character gains a sense of what is going to happen to a particular person, place or item within their reach—including themselves—in the next 24 hours. The further out any particular future is, the harder it is for the character to be certain about elements of that future. However, they can sense broad paths. Especially perilous or likely (or worse, both) possibilities often stand out like beacons in the night. The player can ask the Narrator a single question about the day ahead and get an honest answer based upon what the Narrator thinks is most likely to happen. The Narrator should give short and direct answers without detailed explanations. It is perfectly fine for the answer to be cryptic and to leave the player with more questions than they started with. These answers do not dictate what is fated to happen. They only give hints as to possible futures. The choices the players make and the chances they take have a tremendous impact upon these outcomes. Art by Giuseppe Camuncoli & Jesus Aburtov Terribly unlikely things happen all the time, which means that the character’s sense of the future is not infallible. However, they are rarely outright wrong. This is a great power for a character the Narrator controls. They can use it to lead the players around, give them guidance, and perhaps even set them up for a horrible betrayal. The characters, of course, don’t have to believe what a precognitive character tells them and might even openly defy their advice. However, this can be an incredibly challenging power to handle as a player. The Narrator shouldn’t spoon-feed details to the player. They should answer the player’s questions in generalities when possible and not offer extra details. If the player isn’t concerned enough about something to ask about it, then it doesn’t occur to the character to consider that particular aspect of the future either. If appropriate, the Narrator can state that the future is too uncertain to be determined at any particular moment. This often happens at climactic moments when there are too many possible futures to consider, or when the ones available are equally likely to happen. The Narrator should use this option judiciously, though. If the character can’t ever effectively use their power, that’s a sure road to frustration. The Narrator can also present the character with visions that the character didn’t ask for. These often happen when something vitally important is destined (or at least likely) to occur that can negatively affect the character or people they care about. This could be a personal crisis or a disaster that’s bound to catch the character up in it. Such visions still cost Focus. They drain the character, even if they were not requested.",
    "prereq": "Intuition, Rank 2",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Precognition 2",
    "set": "Sixth Sense",
    "effect": "The character gains a sense of what is going to happen to a particular person, place or item within their reach—including themselves—in the next week. Otherwise, this power works the same as Precognition 1. Alternatively, the character can consider the fate of something within a mile of their location (rather than within their reach) over the next 24 hours. The character simply closes their eyes and thinks about the thing in question, which must be something they already know about.",
    "prereq": "Precognition 1, Rank 3",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Precognition 3",
    "set": "Sixth Sense",
    "effect": "The character gains a sense of what is going to happen to a particular person, place or item within their reach—including themselves—in the next month. Otherwise, this power works the same as Precognition 1. Alternatively, the character can consider the fate of some- thing within a mile of their location (rather than within their reach) over the next week, or something within 100 miles of their location over the next 24 hours. The character simply closes their eyes and thinks about the thing in ques- tion, which must be something they already know about.",
    "prereq": "Precognition 2, Rank 4",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Precognition 4",
    "set": "Sixth Sense",
    "effect": "The character gains a sense of what is going to happen to a particular person, place or item within their reach—including themselves—in the next year. Otherwise, this power works the same as Precognition 1. Alternatively, the character can consider the fate of something within a mile of their location (rather than within their reach) over the next month, or something within 100 miles of their location over the next week, or something within 1,000 miles of their location over the next 24 hours. The character simply closes their eyes and thinks about the thing in question, which must be something they already know about.",
    "prereq": "Precognition 3, Rank 5",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "20 Focus"
  },
  {
    "name": "Probability-Manipulation Hex",
    "set": "Magic",
    "effect": "When an ally within 5 spaces times the character’s rank attempts a check on which they have trouble, this hex eliminates all trouble and gives them an edge instead.",
    "prereq": "Chaotic, Rank 3",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Protection Hex",
    "set": "Magic",
    "effect": "The character produces a hex to help protect themselves. Make an Ego check. The result is now the character’s defense against any attack. If the result isn’t as high as the character would like, they can end the hex and try again later. On a Fantastic success, the hex also grants Health Damage Reduction 1 for its duration.",
    "prereq": "Chaotic, Rank 3",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Quick Phase",
    "set": "Phasing",
    "effect": "The character and their clothing can instantly become intangible.",
    "prereq": "Phase Self, Rank 2",
    "action": "Reaction",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Quick Toss",
    "set": "Super-Strength",
    "effect": "The character throws the grabbed person at another target. The range is determined by the level of the character’s Mighty power and the grabbed person's size. The character makes a ranged attack against the target. A failure inflicts regular damage on the thrown person, who falls prone within 1 space of the target. If the attack is a success, the target takes regular damage too. On a Fantastic success, the target is knocked prone as well.",
    "prereq": "Crushing Grip, Mighty 1, Rank 3",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Rally on Me",
    "set": "Tactics",
    "effect": "Any allies in earshot can be affected, up to a number equal to the character’s Vigilance. Each affected ally can move toward the character at half speed. If they are within the character’s reach at the end of this move, they recover lost Focus equal to 5 times the character’s rank. The character can use this power once per battle.",
    "prereq": "On Your Feet, Rank 3",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Razorwebs",
    "set": "Spider-Powers",
    "effect": "The character makes an Agility attack on an enemy. If the attack is a success, the webbing does Health damage. On a Fantastic success, the attack also causes bleeding.",
    "prereq": "Webcasting",
    "action": "Standard",
    "duration": "Instant",
    "range": "10 spaces",
    "cost": ""
  },
  {
    "name": "Real Jinx",
    "set": "Luck",
    "effect": "All characters who attempt to harm the character by direct action have trouble on their action checks. This does not stack with any other trouble.",
    "prereq": "Rank 4",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Reality Manipulation",
    "set": "Narrative Power",
    "effect": "The character has the power to alter reality as they see fit, up to and including destroying the entire universe. They cannot affect the past or alter a person’s soul, but they can use their power to edit memories to make people think that the past was different. They could also create a distinct new version of a reality, although the original version would remain intact in its own universe. Otherwise, the only limits on this power are the imagination of its user and their ability to express it in a coherent way. In most cases, characters with this power prefer to make small changes so as to avoid any unforeseen consequences. Beyonders",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Regain Focus",
    "set": "Martial Arts",
    "effect": "The character recovers Focus equal to their Vigilance.",
    "prereq": "Unflappable Poise, Untouchable Position, Rank 4",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "None"
  },
  {
    "name": "Reinforced Skeleton",
    "set": "Basic",
    "effect": "The character gains Health Damage Reduction 1.",
    "prereq": "",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Repulse",
    "set": "Spider-Powers",
    "effect": "The character can force something touching them—or nearly touching them—away in the same way that the Stick Around power allows them to stick things together. A character attempting to avoid being repelled must make a non-combat Melee vs. TN 16 action check. If they succeed, they can act normally. In terms of the size of something being repelled and how far it can be repelled, this works just like if the character was throwing it. The use of the power is limited only by the character’s creativity. Examples include shoving away an attacker, propelling themself extra far with a jump, keeping something—or someone—hovering in the air and so on. If used to cause something to hover, the maximum altitude this li s the target is 1 space. If used to increase a jump, this adds 1 space to the character’s Jump Speed for each rank.",
    "prereq": "Stick Around, Rank 3",
    "action": "Standard, movement or reaction",
    "duration": "Instant",
    "range": "1 space",
    "cost": "5 Focus"
  },
  {
    "name": "Resize Object",
    "set": "Resize",
    "effect": "The character can make an object within reach grow or shrink. The character can resize the object as much as their own Grow or Shrink power would allow them to.",
    "prereq": "Grow 2 or Shrink 2, Rank 3",
    "action": "Standard",
    "duration": "Permanent",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Resize Other",
    "set": "Resize",
    "effect": "The character can resize any person (and their clothing) they are touching. The character can resize the object as much as their own Grow or Shrink power would allow them to. If the target does not wish to be resized, the character must grab them first.",
    "prereq": "Grow 2 or Shrink 2, Rank 3",
    "action": "Standard or reaction",
    "duration": "Permanent",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Restart",
    "set": "Narrative Power",
    "effect": "When the character dies, the entire timeline restarts from the moment of their first consciousness, and they retain the memories from their previous lives. This gives them the chance to start over multiple times, although they have to live through those years in real time. There may be a limit to the number of times the character can restart, but they might not know it. A character with precognition might be able to tell how many lives are ahead of them—or perhaps just give a range—but there’s no way to know for sure. It could be that they’ll restart their lives indefinitely, or their present life could be their last one. There’s only so much that one person can do when facing the grand sweep of history, but even one life’s knowledge can give a character a huge advantage for improving their personal situation. It’s easy to build wealth when you know what the future brings. This power should be used rarely, if at all. If the players go through an entire adventure only to have the timeline get reset out of the blue, they might feel like they’ve been cheated. On the other hand, if the point of an adventure is to reset a timeline to prevent a horrible thing from happening, that could transform it from a rug-pull into a moment of triumph. The Restart power supposedly demolishes the timeline that the previous life took place in. However, that doesn’t mean the old timelines no longer exist in the Multiverse. Every time a character with this power dies and restarts, there’s a universe out there somewhere in which the character didn’t have the power—or one in which the power finally failed—and such places can be reached by those traveling the Multiverse.",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Restore",
    "set": "Healing",
    "effect": "The character can bring a target back from being shattered. To attempt this, the character makes an Ego vs. TN 20 action check. On a success, the target is restored to 1 Focus. On a Fantastic success, the target is restored to full Focus. With any kind of success, the character using this power is then reduced to 1 Focus. On a failure, they only have to pay the minimum cost of 20 Focus..",
    "prereq": "Soothing Touch, Rank 5",
    "action": "Standard",
    "duration": "Instant",
    "range": "Reach",
    "cost": "20 Focus"
  },
  {
    "name": "Resurrect",
    "set": "Healing",
    "effect": "The character can try to bring a target back from the dead if they do so soon after the target’s death. To attempt this, they must be able to touch the dead target’s body, and that body must be relatively intact—at least enough so that if the person came back to life they wouldn’t instantly die again. The character makes an Ego check against a TN equal to 10 plus 1 for every hour the target has been dead. For exam- ple, if the target has been dead for four hours, the TN is 14. On a success, the target is restored to 1 Health. On a Fantastic success, the target is restored to full Health. With any kind of success, the character using this power is then reduced to 1 Focus. On a failure, they only have to pay the minimum cost of 20 Focus.",
    "prereq": "Healing Hands, Rank 5",
    "action": "Standard",
    "duration": "Instant",
    "range": "Reach",
    "cost": "20 or more Focus"
  },
  {
    "name": "Return Fire",
    "set": "Ranged Weapons",
    "effect": "The character makes an Agility attack against a target’s Vigilance defense. If the attack is a success, apply Health Damage Reduction normally. Any damage taken is then applied to the target’s Focus instead. If it’s a Fantastic success, the damage is doubled and, if the target takes any Focus damage, they are stunned for 1 round. Ar t by Alan Davis",
    "prereq": "Suppressive Fire, Rank 2",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Reverse Punch",
    "set": "Plasticity",
    "effect": "The character makes a close attack with an edge on an enemy. If the attack is a success, the enemy takes regular damage. On a Fantastic success, the enemy takes double damage and is stunned for one round.",
    "prereq": "Flexible Bones 1, Rank 2",
    "action": "Standard",
    "duration": "Instant Rob Schwager",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Reverse-Momentum Throw",
    "set": "Martial Arts",
    "effect": "The attacker is knocked prone and takes half the damage their attack would have inflicted if it had succeeded.",
    "prereq": "Defense Stance, Rank 2",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Rico-Shield",
    "set": "Shield Bearer",
    "effect": "The character makes a ranged attack on a target. If the attack is a success, the target takes regular damage. On a Fantastic success, the target is also knocked prone, and the character can make an extra attack on another target, adding the extra range between the two targets to the new attack roll. This can be repeated until an attack is not a Fantastic success. When the attacks are over, the shield then bounces back to the character.",
    "prereq": "Hurled Shield Bash, Rank 3",
    "action": "Standard",
    "duration": "Instant",
    "range": "10 spaces times the character’s rank",
    "cost": "10 Focus"
  },
  {
    "name": "Riposte",
    "set": "Melee Weapons",
    "effect": "The character makes a close attack on the enemy who just missed them. If the attack is a success, the enemy takes regular damage. On a Fantastic success, the enemy takes double damage and suffers the weapon’s special effect. //7/ g Rachelle Rosenber",
    "prereq": "",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Rubberneck",
    "set": "Plasticity",
    "effect": "The character can move their head away from their body, up to their reach, to establish a line of sight to a target.",
    "prereq": "Flexible Bones 1, Extended Reach 1",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Run on Water",
    "set": "Super-Speed",
    "effect": "The character can run so that their feet skip across the surface of water. As long as they keep running (even in place), they do not sink.",
    "prereq": "Speed Run 2, Rank 3",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Scatter",
    "set": "Tactics",
    "effect": "Any allies in earshot can be affected, up to a number equal to the character’s rank. Each affected ally can move away from you at half Speed and then fall prone. If this makes the ally an ineligible target for the initial attack, that attack automatically fails.",
    "prereq": "Hit the Dirt, Rank 3",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Self-Regulated",
    "set": "Narrative Limitation",
    "effect": "The character limits themself to acting as an average person of their kind, unless they or a loved one are in extreme danger. Whenever the character takes damage—or witnesses a loved one take damage—that would render them dead or unconscious, make a d616 roll. On a result of 12 or higher, they momentarily regain all their narrative powers until they can resolve the situation. The character can also place other contingencies on their limitations (or the removal of those limitations) if they like. For instance, the Molecule Man originally couldn’t affect organic molecules, but during the first Secret Wars, Doom explained that this was a mental block rather than an actual limit and removed it.",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Sense Emotion",
    "set": "Telepathy",
    "effect": "The character picks a target within range and line of sight and makes an Ego check vs. the target’s Ego defense. If they succeed, the character understands how the target is feeling. On a Fantastic success, they understand why.",
    "prereq": "",
    "action": "Standard",
    "duration": "Concentration",
    "range": "10 spaces",
    "cost": "None"
  },
  {
    "name": "Sense Sins",
    "set": "Magic",
    "effect": "The character looks into a target’s eyes and makes an Ego check against the target’s Ego defense. On a success, the character can sense what sorts of horrible things the target has done. On a Fantastic success, they can sense what sorts of horrible things the target intends to do in the immediate future.",
    "prereq": "Cursed",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Sense Supernatural",
    "set": "Magic",
    "effect": "The character can reach out with their mind to sense the presence of supernatural people, places or things within 100 spaces per rank. This tells them the location of the supernatural thing and its general status. If a target or targets wish to remain undetected, the character must make an Ego check and compare it against each target’s Vigilance defense. If they succeed, they sense the target. On a Fantastic success, they can also identify if the target is cursed or demonic.",
    "prereq": "",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": ""
  },
  {
    "name": "Shape-Shift",
    "set": "Basic",
    "effect": "The character can change into another form no more than one size bigger or smaller than their regular form. When in any form, the character has access to the natural abilities of that form. For instance, if they transformed into a bird, they could fly. When transformed into a fish, they can breathe water.",
    "prereq": "Disguise, Rank 3",
    "action": "Standard or reaction",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Shield 1",
    "set": "Shield Bearer",
    "effect": "The character gains Health Damage Reduction 1.",
    "prereq": "",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": ""
  },
  {
    "name": "Shield 2",
    "set": "Shield Bearer",
    "effect": "The character gains Health Damage Reduction 2.",
    "prereq": "Shield 1, Rank 2",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Shield 3",
    "set": "Shield Bearer",
    "effect": "The character gains Health Damage Reduction 3.",
    "prereq": "Shield 2, Rank 4",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Shield 4",
    "set": "Shield Bearer",
    "effect": "The character gains Health Damage Reduction 4.",
    "prereq": "Shield 3, Rank 6",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": "25 Focus"
  },
  {
    "name": "Shield Bash",
    "set": "Shield Bearer",
    "effect": "The character makes a close attack on an enemy within their reach. If the attack is a success, the enemy takes regular damage. On a Fantastic success, the enemy takes double damage and is knocked prone.",
    "prereq": "",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Shield Deflection",
    "set": "Shield Bearer",
    "effect": "The attack has trouble.",
    "prereq": "",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Shield of the Seraphim",
    "set": "Magic",
    "effect": "The character produces a magical shield that protects them from physical damage. Any attacks against them that do 20 points of damage or less are instantly absorbed, and the protection continues. If an attack does more than 20 points of damage, it destroys the protection, allowing excess damage through.",
    "prereq": "Sorcerous, Rank 3",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Shield Wall",
    "set": "Shield Bearer",
    "effect": "Attacks against the character have trouble. The character breaks concentration on this power if they use a movement action.",
    "prereq": "Brace for Impact, Rank 3",
    "action": "Movement",
    "duration": "Concentration",
    "range": "",
    "cost": ""
  },
  {
    "name": "Shrink 1",
    "set": "Resize",
    "effect": "The character can shrink down to little size. They can return to their normal size at will.",
    "prereq": "",
    "action": "Standard or reaction",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Shrink 2",
    "set": "Resize",
    "effect": "The character can shrink down to tiny size. They can return to their normal size at will.",
    "prereq": "Shrink 1",
    "action": "Standard or reaction",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Shrink 3",
    "set": "Resize",
    "effect": "The character can shrink down to miniature size. They can return to their normal size at will.",
    "prereq": "Shrink 2",
    "action": "Standard or reaction",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Shrink 4",
    "set": "Resize",
    "effect": "The character can shrink down to microscopic size. They can return to their normal size at will.",
    "prereq": "Shrink 3",
    "action": "Standard or Reaction",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Shrinking Dodge",
    "set": "Resize",
    "effect": "The attacker has trouble on the attack.",
    "prereq": "Shrink 1, Rank 2",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Shut Down Powers",
    "set": "Power Control",
    "effect": "The character picks another character within 20 spaces and makes an Ego attack against them. On a success, they remove all of a target’s powers. If the target’s powers have costs, the character must pay the highest of them, or a minimum of 15 Focus.",
    "prereq": "Dampen Power, Rank 4",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "15 or more Focus"
  },
  {
    "name": "Silence Area",
    "set": "Illusion",
    "effect": "An area up to 5 spaces wide per the character’s rank—centered on anything the character wishes, within 50 spaces—is filled with silence. Those inside the area cannot hear anything, and no one outside of it can hear any noises made inside it. The character must remain within 50 spaces of the area to avoid breaking concentration.",
    "prereq": "Illumination, Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Silence Self",
    "set": "Illusion",
    "effect": "The character makes no noise at all—unless they wish to. They have an edge on Agility checks to sneak past people, and enemies have trouble on Vigilance checks to perceive them.",
    "prereq": "Illumination, Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Slip Free",
    "set": "Plasticity",
    "effect": "The character is not grabbed or pinned.",
    "prereq": "",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Slow-Motion Dodge",
    "set": "Basic",
    "effect": "The enemy has trouble on the attack.",
    "prereq": "",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Slow-Motion Shoot-Dodge",
    "set": "Ranged Weapons",
    "effect": "The character splits their attack to make two ranged attacks against separate targets (or they can focus a single attack on a single target). Make a single Agility check and compare it to the targets’ Agility defenses. On a success, an affected target takes half regular damage. On a Fantastic success, an affected target takes full damage, and the character can make a bonus attack with this power against any available target, with the same effect. When the character moves, is moved or starts their next turn, they instantly fall prone. Until that happens, all attacks against their Agility defense have trouble.",
    "prereq": "Slow-Motion Dodge, Weapons Blazing, Rank 3",
    "action": "Standard",
    "duration": "Instant + 1 round",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Smash",
    "set": "Super-Strength",
    "effect": "The character makes a close attack with an edge. For this attack, add +1 to the character’s Melee damage bonus for every 2 points of Focus they spend. On a success, an affected target takes that total damage. On a Fantastic success, an affected target takes double that total damage and is stunned for one round. //7/",
    "prereq": "Clobber, Rank 2",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "5 or more Focus"
  },
  {
    "name": "Snap Shooting",
    "set": "Ranged Weapons",
    "effect": "The character splits their attack to make two ranged attacks against separate targets (or they can focus a single attack on a single target). Make a single Agility check and compare it to the targets’ Agility defenses. On a success, an affected target takes half regular damage. On a Fantastic success, an affected target takes full damage and is bleeding.",
    "prereq": "",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Sniping",
    "set": "Ranged Weapons",
    "effect": "The character makes a ranged attack against an enemy at least 20 spaces away. If the attack is a success, the enemy takes regular damage. On a Fantastic success, the enemy takes triple damage instead.",
    "prereq": "Rank 2",
    "action": "Both standard and movement (character cannot move this turn)",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Soothing Touch",
    "set": "Healing",
    "effect": "The character can restore a target creature’s Focus with a touch. For every point of Focus the character spends, the target regains a point of Focus, up to their maximum score. Art by Pepe Larraz & Marte Gracia The character must spend at least 10 Focus to use the power. Any Focus points that would have been restored beyond the target’s maximum Focus are lost.",
    "prereq": "Never Surrender, Rank 3",
    "action": "Standard",
    "duration": "Instant",
    "range": "Reach",
    "cost": "10 or more Focus"
  },
  {
    "name": "Speed Blast",
    "set": "Super-Speed",
    "effect": "The character makes a ranged attack. If it succeeds, the target is stunned for one round. On a Fantastic success, the character is knocked prone too.",
    "prereq": "Speed Run 2, Rank 2",
    "action": "Standard",
    "duration": "Instant",
    "range": "10",
    "cost": "5 Focus"
  },
  {
    "name": "Speed Run 1",
    "set": "Super-Speed",
    "effect": "Multiply the character’s regular Run Speed by their rank to get their new Run Speed. Outside of combat, they can move three times as fast.",
    "prereq": "Rank 2",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Speed Run 2",
    "set": "Super-Speed",
    "effect": "Outside of combat, the character can move up to 50 times as fast as their increased Run Speed.",
    "prereq": "Speed Run 1, Rank 3",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Speed Swim",
    "set": "Super-Speed",
    "effect": "Multiply the character’s regular Swim Speed by their rank to get their new Swim Speed. Outside of combat, they can move three times as fast.",
    "prereq": "Rank 2",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Spider-Dodge",
    "set": "Spider-Powers",
    "effect": "The attacker has trouble on the attack. If the attack misses, the character can leap in any direction at their Jump Speed.",
    "prereq": "",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Spider-Pheromones",
    "set": "Spider-Powers",
    "effect": "The character has an edge on Ego (intimidation) checks against people who are not attracted to their gender. They also have an edge on Ego (persuasion) checks against people who are attracted to their gender.",
    "prereq": "",
    "action": "Standard",
    "duration": "Concentration",
    "range": "5 spaces",
    "cost": ""
  },
  {
    "name": "Spider-Sense",
    "set": "Spider-Powers",
    "effect": "The character has an edge on initiative checks and on Vigilance checks to perceive danger. Enemies have trouble on Agility checks against the character’s Vigilance defense. The character also gains a permanent +2 bonus to their Agility defense.",
    "prereq": "",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Spider-Strike",
    "set": "Spider-Powers",
    "effect": "The character splits their attack to make two close attacks against separate targets within reach (or they can focus a single attack on a single target). Make a single Melee check and compare it to the targets’ Melee defenses. On a success, the affected target takes half regular damage. On a Fantastic success, the affected target takes full damage and is paralyzed by webbing. Breaking free from webbing requires a Melee check (target number 20). After the attacks, the character may run, jump or climb at half speed for free.",
    "prereq": "",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Spin & Throw",
    "set": "Martial Arts",
    "effect": "The character makes a Melee attack against the grabbed foe. If the attack is a success, the enemy takes regular damage and is knocked prone. On a Fantastic success, the enemy takes double damage and is knocked prone, pinned and stunned for one round. Either way, the character can move the enemy to any open space within reach.",
    "prereq": "Grappling Technique, Rank 2",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Static Illusion",
    "set": "Illusion",
    "effect": "The character creates a visual-only illusion anywhere in line of sight, within 50 spaces. The illusion can be of anything up to three sizes larger than the character, but it must be static. The character breaks concentration if they move beyond 50 spaces from the illusion or lose line of sight of it.",
    "prereq": "Illumination",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Steal Powers",
    "set": "Power Control",
    "effect": "The character makes an Ego attack against the grabbed target. On a success, they remove all of the target’s powers and take them for their own. They can now use those powers as if they were always theirs. If the target’s powers have costs, the character must pay the highest of them, or a minimum of 15 Focus. When the character uses a power, they must pay any cost normally as well.",
    "prereq": "Clone Powers, Shut Down Powers, Rank 4",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": "15 or more Focus"
  },
  {
    "name": "Stick Around",
    "set": "Spider-Powers",
    "effect": "The character can cause two things to be stuck to each other, in the same way that the Wallcrawling power allows a character to stick to surfaces. Breaking this con- nection requires a non-combat Melee vs. TN 16 action check, although the character can intentionally end it at any time. The use of the power is limited only by the character’s creativity. Examples include sticking a person to a floor so they can’t move or be taken away, sticking a door closed, sticking something to the character’s back so they can keep their hands free and so on.",
    "prereq": "Wallcrawling, Rank 2",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "1 space per rank",
    "cost": "10 Focus"
  },
  {
    "name": "Stilt Steps",
    "set": "Plasticity",
    "effect": "The character’s Run Speed doubles, as does their Climb Speed.",
    "prereq": "Extended Reach 1, Rank 2",
    "action": "Movement",
    "duration": "Concentration",
    "range": "",
    "cost": ""
  },
  {
    "name": "Stopping Power",
    "set": "Ranged Weapons",
    "effect": "The character makes a ranged attack on an enemy. If the attack is a success, the enemy takes regular damage. On a Fantastic success, the enemy takes double damage, and the character can make another regular ranged attack on the same target.",
    "prereq": "Double Tap, Rank 2",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Sturdy 1",
    "set": "Basic",
    "effect": "The character’s body is so sturdy that they have Health Damage Reduction 1. If this power stems from armor or anything else removable—like Iron Man’s armor—the character should apply the Tech Reliance trait to it.",
    "prereq": "",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Sturdy 2",
    "set": "Basic",
    "effect": "The character gains Health Damage Reduction 2.",
    "prereq": "Sturdy 1, Rank 2",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Sturdy 3",
    "set": "Basic",
    "effect": "The character gains Health Damage Reduction 3. & Marte Gracia",
    "prereq": "Sturdy 2, Rank 4",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Sturdy 4",
    "set": "Basic",
    "effect": "The character gains Health Damage Reduction 4.",
    "prereq": "Sturdy 3, Rank 6",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Summon Portal",
    "set": "Magic",
    "effect": "The character opens a glowing portal in a space next to them that teleports anything that enters it between that space and its destination, which forms a matched glowing portal in the other place. This can be between any two points in the Multiverse, as long as the character has seen the destination. Anything can move through the portal in either direction until it is closed, which the character can do at will.",
    "prereq": "Sorcerous, Rank 4",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Supernova",
    "set": "Elemental Control",
    "effect": "The character makes an Ego check and compares that against the Resilience defense of every enemy within 10 spaces. For these attacks, add +1 to the character’s Ego damage bonus for every 2 points of Focus they spend. On a success, an affected target takes half that total damage. On a Fantastic success, an affected target takes full damage and suffers the elemental type’s special effect.",
    "prereq": "Elemental Blast, Rank 4",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "15 or more Focus"
  },
  {
    "name": "Suppressive Fire",
    "set": "Ranged Weapons",
    "effect": "The character makes an Agility attack against a target’s Vigilance defense. If the attack is a success, apply Health Damage Reduction normally. Any damage taken is then applied to the target’s Focus instead. If it’s a Fantastic success, the damage is doubled, and if the target takes any Focus damage, they are stunned for one round.",
    "prereq": "",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Swap Items",
    "set": "Teleportation",
    "effect": "The character swaps items they possess with the items of another person they can see within 2 spaces per the character’s rank. These items can include weapons, clothing or anything else that is on the other person but not attached to them. When the effect ends, the swapped items return to the people who had them originally. The character can swap all of their possessions, or they can be as selective as they like. The items must generally be swapped on an equal basis, but it is possible to swap something for nothing. For instance, the character could swap what’s in their hands for what’s in the target’s hands. If they are holding nothing and the target has a pistol, they can swap the pistol for nothing. If the person being swapped with is unwilling, the character must make an Ego check against that person’s Vigilance defense to succeed.",
    "prereq": "Swap Places",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": ""
  },
  {
    "name": "Swap Places",
    "set": "Teleportation",
    "effect": "The character swaps places with another person they can see within 2 spaces per the character’s rank. When the effect ends, the character and the other person swap places again. If the person being swapped with is unwilling, the character must make an Ego check against that person’s Vigilance defense to succeed.",
    "prereq": "",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": ""
  },
  {
    "name": "Swap Powers",
    "set": "Power Control",
    "effect": "The character makes an Ego attack against a target they can see within 2 spaces per the character’s rank. If the target’s powers have costs, the character must pay the highest of them, or a minimum of 10 Focus. On a success, they swap all of their non-Swap powers with the target’s powers. Both characters can now use their new powers as if they had always had them. When either character uses a swapped power, they must pay any cost for it normally as well.",
    "prereq": "Rank 3",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": "10 or more Focus"
  },
  {
    "name": "Swap Status",
    "set": "Teleportation",
    "effect": "The character swaps status with a target they can see within 2 spaces per the character’s rank. The character can swap their entire status with the target, or they can be selective about it. Statuses they can swap include: ▶ Lost Health ▶ Lost Focus ▶ Any condition ▶ Occupation ▶ Traits ▶ Tags When swapping lost Health or Focus, the character and the target each take their maximum Health or Focus and subtract from it anything that the other person has lost at that moment. The same thing happens when the effect ends. This could potentially kill or shatter someone, so the character should be careful when doing this. Example: Escapade has taken points of Health damage, and she swaps her lost Health status with an A.I.M. agent who is unharmed. This brings Escapade’s Health back up to full, but the A.I.M. agent only has Health to start with. Taking on her lost Health would kill him. However, Escapade is Heroic, so the Holding Back rules on p. of the Core Rulebook would leave the A.I.M. agent with – Health instead, point away from dying. When swapping occupations, the character gains the target’s position, including their authority and their responsibilities. For instance, if the character swaps occupations with the ruler of a nation, others recognize them as being the ruler for as long as the effect continues. When the effect ends, any alterations that have happened to either character swap back to the other. For instance, if one of the characters is killed while the other lives, that would swap when the effect ends. For this reason alone, characters should take extreme care with this power.",
    "prereq": "Swap Items, Rank 2",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Sway Emotion",
    "set": "Telepathy",
    "effect": "The character picks a target within range and line of sight and makes an Ego check vs. the target’s Ego defense. If they succeed, the target feels the emotions the character wants them to feel. These are gentle emotions that can get the target to do something they might already be inclined to do. On a Fantastic success, the target is unaware that anyone has affected their emotions and believes that this is the way they always felt.",
    "prereq": "Sense Emotion",
    "action": "Standard",
    "duration": "Concentration",
    "range": "10 spaces",
    "cost": "None"
  },
  {
    "name": "Swipe Power",
    "set": "Power Control",
    "effect": "The character makes an Ego attack against the grabbed target. On a success, they remove one of the target’s powers and take it for their own. They can now use that power as if it was always theirs. If the power has a cost, the character must pay it or a minimum of 10 Focus. When the character uses the power, they must pay any cost normally as well.",
    "prereq": "Copy Powers, Dampen Power, Rank 3",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": "10 or more Focus"
  },
  {
    "name": "Telekinetic Attack",
    "set": "Telekinesis",
    "effect": "The character makes a Logic attack against the Melee defense of a target within 5 spaces times the character’s rank. If the attack is a success, it inflicts regular damage. On a Fantastic success, the damage is doubled instead, and the target is stunned for one round.",
    "prereq": "Telekinetic Manipulation, Rank 2",
    "action": "Standard",
    "duration": "Instant",
    "range": "Varies",
    "cost": "5 Focus"
  },
  {
    "name": "Telekinetic Barrier",
    "set": "Telekinesis",
    "effect": "The character forms an invisible barrier in their line of sight and up to 10 spaces away per rank. This covers up to 2 spaces across (vertically/horizontally) per their rank. The character makes a Logic check and compares the results against the Agility defense of any target in the affected spaces. On a success, the character chooses which side of the barrier the target winds up on. On a failure, the target chooses. On a Fantastic success, the target is paralyzed for one round too. Attacks on the barrier are against the character’s Logic defense. Any attacks on it that do 10 points of damage or less are instantly absorbed, and the barrier continues. If an attack does more than 10 points of damage, it destroys the barrier. Either way, the attack leaves those behind the barrier unharmed.",
    "prereq": "Telekinetic Grab, Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Telekinetic Crush",
    "set": "Telekinesis",
    "effect": "The character makes a Logic attack against the grabbed target’s Resilience defense. If it’s a success, the target takes regular damage. On a Fantastic success, the target takes double damage and is pinned.",
    "prereq": "Telekinetic Grab, Rank 3",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Telekinetic Grab",
    "set": "Telekinesis",
    "effect": "The character makes a Logic attack against the Melee defense of a target within 5 spaces times the character’s rank. If the attack is a success, the character grabs the target with their mind. On a Fantastic success, the target can also be pinned. Breaking free requires a successful Melee check against target number 20.",
    "prereq": "Telekinetic Manipulation, Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "Varies",
    "cost": "5 Focus"
  },
  {
    "name": "Telekinetic Manipulation",
    "set": "Telekinesis",
    "effect": "The character can manipulate objects in their line of sight with their mind. The maximum range for this is 5 spaces times the character’s rank. If someone tries to prevent the character from taking control of an object, the character makes a Logic check against the opponent’s Agility defense. Telekinetic Protection 1 The character uses their mind to physically",
    "prereq": "",
    "action": "Standard",
    "duration": "Concentration",
    "range": "Varies",
    "cost": ""
  },
  {
    "name": "Telekinetic Protection 2",
    "set": "Telekinesis",
    "effect": "The character’s personal telekinetic field protects them. Any attacks against them that do 20 points of damage or less are instantly absorbed, and the protection continues. If an attack does more than 20 points of damage, it destroys the protection, allowing excess damage through.",
    "prereq": "Telekinetic Protection 1, Rank 3",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Telekinetic Protection 3",
    "set": "Telekinesis",
    "effect": "The character’s personal telekinetic field protects them. Any attacks against them that do 30 points of damage or less are instantly absorbed, and the protection continues. If an attack does more than 30 points of damage, it destroys the protection, allowing excess damage through.",
    "prereq": "Telekinetic Protection 2, Rank 4",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Telekinetic Protection 4",
    "set": "Telekinesis",
    "effect": "The character’s personal telekinetic field grants them protection. Any attacks against them that do 40 points of damage or less are instantly absorbed, and the protection continues. If an attack does more than 40 points of damage, it destroys the protection, allowing excess damage through.",
    "prereq": "Telekinetic Protection 3, Rank 5",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": "20 Focus"
  },
  {
    "name": "Telekinetic Reinforcement",
    "set": "Telekinesis",
    "effect": "The character can transfer any Health damage that gets through a telekinetic power that grants damage protection to their Focus instead, leaving the protection intact.",
    "prereq": "Telekinetic Protection 1",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": "Varies"
  },
  {
    "name": "Telekinetic Sphere",
    "set": "Telekinesis",
    "effect": "The character envelops themselves—and any chosen people within up to 5 spaces times their rank—in a protective telekinetic sphere. When the sphere is formed, the character makes a Logic check and compares the results against the Agility defense of unwanted characters in the enclosed spaces. On a success, the character can move any unwanted people within the sphere’s perimeter to spaces outside of the sphere. On a Fantastic success, such moved people suffer full damage. Attacks on the sphere are against the character’s Logic defense. Any attacks on the sphere are absorbed as if made against the character’s Telekinetic Protection power, and the sphere continues. If an attack does more damage than the character’s Telekinetic Protection power can sustain, it destroys the sphere, but no one inside is harmed.",
    "prereq": "Telekinetic Protection 1",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": "Same as the character’s Telekinetic Protection power"
  },
  {
    "name": "Telekinetic Toss",
    "set": "Telekinesis",
    "effect": "The character can telekinetically throw a person that they’ve telekinetically grabbed at another target. The range for the throw is 5 spaces times the character’s rank. The character makes a Logic check against the target’s Agility defense. A failure inflicts regular damage on the thrown person, who falls prone within 1 space of the target. If the attack is a success, the target takes regular damage too. On a Fantastic success, the target is knocked prone as well.",
    "prereq": "Telekinetic Grab, Rank 3",
    "action": "Standard or reaction",
    "duration": "Instant",
    "range": "Varies",
    "cost": "10 Focus"
  },
  {
    "name": "Telepathic Blast",
    "set": "Telepathy",
    "effect": "The character makes a Logic attack against a target in line of sight. If the attack is a success, it inflicts regular Focus damage. On a Fantastic success, the target takes double damage instead and is stunned for one round.",
    "prereq": "Telepathic Link, Rank 2",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Telepathic Link",
    "set": "Telepathy",
    "effect": "The character can communicate telepathically with one person at a time, and they must have met or seen the other person before. The communication can be verbal, visual or even more complex, such as imparting location information. There is no limit to the distance of the communication, as long as the character and the target are in the same dimension. If the other person does not wish to speak with the character, the target can automatically tune them out. To force a telepathic link, the character can make a Logic check against the target’s Vigilance defense. On a failure, the character cannot attempt to communicate with the target in this way for the rest of the day. On a success, the character can communicate with the target for as long as the concentration lasts. On a Fantastic success, the target cannot shut the character out for the rest of the day.",
    "prereq": "",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": ""
  },
  {
    "name": "Telepathic Network",
    "set": "Telepathy",
    "effect": "The character can communicate telepathically with a group of willing, previously linked people, each of whom they have met or seen before. The communication can be verbal, visual or even more complex, such as imparting location information. The group can number up to five people per rank. There is no limit to the distance of the communication, as long as everyone involved is in the same dimension.",
    "prereq": "Telepathic Link, Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Telepathic Possession",
    "set": "Telepathy",
    "effect": "The character possesses a target with whom they’ve established a Telepathic Link and who has no Focus left. The character makes a Logic check with trouble against the target’s Logic defense. On a success, the character takes over the target’s body completely. The result of the character’s check is the target number for any attempts by the target to end the possession. If the character attempts to harm someone with the possessed body, the target gets to make a Logic check to end the possession. If the target has the Heroic tag, they get an edge on the check. If the character attempts to harm the possessed body, the target gets an edge on the check. If the target has the Heroic tag, they get a double edge. This power can also be used to transfer the character’s mind into an empty-minded target—like a fresh clone or android—permanently. This requires no check, as there is no one in the body to challenge the character’s action.",
    "prereq": "Orders, Rank 5",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "20 Focus"
  },
  {
    "name": "Teleport 1",
    "set": "Teleportation",
    "effect": "The character teleports into a clear space they can see or have been to, up to 10 times their rank in spaces away. Outside of combat, they can teleport up to 100 times their rank in spaces away.",
    "prereq": "Blink",
    "action": "Standard or movement",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Teleport 2",
    "set": "Teleportation",
    "effect": "Outside of combat, the character can teleport up to 1,000 times their rank in spaces away.",
    "prereq": "Teleport 1",
    "action": "Standard or movement",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Teleport Blind",
    "set": "Teleportation",
    "effect": "The character teleports to someplace they’ve never been and never seen, up to 10 times their rank in spaces away. Outside of combat, they can teleport up to 100 times their rank in spaces away. If the character teleports into something solid, they are automatically pushed out of it but take damage from the disruption equal to a standard action check. The damage multiplier is 1 for every space they must move to reach a clear area. If this kills them, their body is trapped inside the material they teleported into.",
    "prereq": "Teleport 1, Rank 3",
    "action": "Standard or movement",
    "duration": "Instant",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Teleport Object",
    "set": "Teleportation",
    "effect": "The character can teleport along with them an object within reach as far away as their Teleport power normally allows them. The object (and things attached to or inside of it) can be up to their rank in sizes bigger than them. For example, if they are Rank 4, the object can be up to four sizes bigger than them.",
    "prereq": "Teleport 1, Rank 3",
    "action": "Standard",
    "duration": "Permanent",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Teleport Other",
    "set": "Teleportation",
    "effect": "The character makes an Ego check against the Vigilance defense of a target they have grabbed. If the check is successful, the character can teleport the target as far away as their Teleport power normally allows them in combat. If the target winds up in something solid, they are automatically pushed out of it but take damage from the disruption equal to a standard action check. The damage multiplier is 1 for every space they must move to reach a clear area. If this kills them, their body is trapped inside the material they teleported into.",
    "prereq": "Teleport 2, Rank 4",
    "action": "Standard or reaction",
    "duration": "Instant",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Teleport Together",
    "set": "Teleportation",
    "effect": "The character teleports, taking any person they are touching with them, into clear spaces they can see or have been to, up to 10 times their rank in spaces away. Outside of combat, they can teleport up to 100 times their rank in spaces away. If the target does not wish to be teleported, the character must grab them first.",
    "prereq": "Teleport 1, Rank 3",
    "action": "Standard, movement or reaction",
    "duration": "Instant",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Teleportal",
    "set": "Teleportation",
    "effect": "The character opens a glowing portal in a space next to them that teleports anything that enters it between that space and its destination, which forms a matched glowing portal in the other place. The other end of the portal must be in a clear space the character can see or has been to, up to 10 times their rank in spaces away. Outside of combat, they can teleport up to 1,000 times their rank in spaces away. Anything can move through the portal in either direction until it is closed, which the character can do at will.",
    "prereq": "Teleport 1, Rank 4",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Telespot",
    "set": "Teleportation",
    "effect": "As a standard action, the character can deploy small teleportals through which they can attack or otherwise affect items within 10 times their rank in spaces using the same action. As a reaction, they can deploy a small teleportal against a physical attack, deflecting it away or redirecting it to another target. They can harmlessly deflect any such attack automatically that isn’t a Fantastic success. Redirecting an attack to another target requires the character to make an Agility check against the new target’s Agility defense. On a success, use the original attack’s damage against the new target. On a Fantastic success, double the damage. On a failure, the original attack hits the character instead.",
    "prereq": "Teleport 1, Rank 2",
    "action": "Standard or reaction",
    "duration": "Instant",
    "range": "10 spaces per rank",
    "cost": "5 Focus"
  },
  {
    "name": "Thunder",
    "set": "Weather Control",
    "effect": "The character makes an Ego check and compares that against the Resilience defense of every character within 10 spaces. Any character the attack succeeds against is deafened. On a Fantastic success, the character is also stunned for one round.",
    "prereq": "",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Time Portal",
    "set": "Omniversal Travel",
    "effect": "The character opens a glowing portal in a space next to them that moves anything that enters it between that space and its destination, which forms a matched glowing portal in the other place. The other end of the portal must be in a clear space in another period of time, in roughly the same place. Anything can move through the portal in either direction until it is closed, which the character can do at will.",
    "prereq": "Time Travel Together, Rank 4",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Time Travel",
    "set": "Omniversal Travel",
    "effect": "The character instantly moves from their current time to another time—for instance, from the present to 1962. When they move to the other time, they can arrive in any place they’ve been to before. Otherwise, they arrive at the closest available corresponding space in the other time.",
    "prereq": "Rank 3",
    "action": "Standard or movement",
    "duration": "Instant",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Time Travel Other",
    "set": "Omniversal Travel",
    "effect": "The character makes an Ego check against the Vigilance defense of a target they have grabbed. If the check is successful, the character can send the target to another time. The target can be sent to any location in that time that the character has been to before. Otherwise, the target arrives at the closest available corresponding space in the other time.",
    "prereq": "Time Travel, Rank 4",
    "action": "Standard, movement or reaction",
    "duration": "Instant",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Time Travel Together",
    "set": "Omniversal Travel",
    "effect": "The character moves to a different time, taking any person they are touching with them. If the target does not wish to come along, the character must grab them first. When they move to the other time, they can arrive in any place they’ve been to before. Otherwise, they arrive at the closest available corresponding space in the other time.",
    "prereq": "Time Travel, Rank 3",
    "action": "Standard, movement or reaction",
    "duration": "Instant",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Time-Out",
    "set": "Omniversal Travel",
    "effect": "The character freezes time for everyone but themselves. During this period, they can act normally while everyone else seems to be frozen in place. The character can choose to activate the power for the maximum duration or choose to stop at any time. However long, they must pay the Focus cost for each round. For example, a Rank 6 character uses Time-Out as an action and pays 30 Focus to activate it for two rounds. They can take their normal number of actions, reactions and move- ment, while the other characters cannot take any actions, reactions or movements until after the two rounds end.",
    "prereq": "Instant Replay, Rank 4",
    "action": "Standard or reaction",
    "duration": "1 round per rank.",
    "range": "",
    "cost": "15 Focus per round"
  },
  {
    "name": "Time-Out Bubble",
    "set": "Omniversal Travel",
    "effect": "The character creates a time bubble that affects themselves and any chosen allies within 1 space per rank. Within the bubble, the character and those allies can act normally while everyone else seems to be frozen in place. The character can choose to activate the power for the maximum duration or choose to stop at any time. However long, they must pay the Focus cost for each round.",
    "prereq": "Time-Out, Rank 4",
    "action": "Standard or reaction",
    "duration": "1 round per rank.",
    "range": "",
    "cost": "15 Focus per round"
  },
  {
    "name": "Time-Out Tag",
    "set": "Omniversal Travel",
    "effect": "The character freezes time for one person or thing within their reach. Everything and everyone else can act normally. If the target does not wish to be frozen, the character must grab them first. The character can choose to activate the power for the maximum duration or choose to stop at any time. However long, they must pay the Focus cost for each round.",
    "prereq": "Time-Out, Rank 4",
    "action": "Standard or reaction",
    "duration": "1 round per rank.",
    "range": "",
    "cost": "15 Focus per round"
  },
  {
    "name": "Timeless",
    "set": "Narrative Power",
    "effect": "The character exists across multiple universes at once and also exists in all times throughout each of those universes.",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Timestuck",
    "set": "Narrative Limitation",
    "effect": "The character cannot travel through time—or be made to travel through time—by any means. Ruairí Coleman, Adriano di Benedetto & Andrew Cramer CHARACTER The various Secret Wars feature characters from all around the Marvel Multiverse. This chapter details many of them for use in your game, including new profiles for henchmen and—for the first time—some of the most powerful beings in any cosmos: Rank X characters.",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Uncanny 1",
    "set": "Basic",
    "effect": "Any damage multiplier for attacks against the character’s Focus is reduced by 1. If this power is part of a battle suit, the power is integrated into a removable helmet. Otherwise, it’s a part of the character. If this power stems from armor or anything else removable—like Magneto’s helmet—the character should apply the Tech Reliance trait to it.",
    "prereq": "",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Uncanny 2",
    "set": "Basic",
    "effect": "Any damage multiplier for attacks against the character’s Focus is reduced by 2.",
    "prereq": "Uncanny 1, Rank 2",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Uncanny 3",
    "set": "Basic",
    "effect": "Any damage multiplier for attacks against the character’s Focus is reduced by 3.",
    "prereq": "Uncanny 2, Rank 4",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Uncanny 4",
    "set": "Basic",
    "effect": "Any damage multiplier for attacks against the character’s Focus is reduced by 4.",
    "prereq": "Uncanny 3, Rank 6",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Understand Body Language",
    "set": "Translation",
    "effect": "When the character encounters a culture for the first time, they can make a Logic vs. TN 13 action check to puzzle out its body language. If they already know any other version of the culture’s language, they have an edge. On a success, they understand and can emulate the body language. On a Fantastic success, they permanently understand and can use it and never need to make a check for it again. This covers not only any potential full-body language used by an alien species but also the body language of species that use other forms of communication. With such species, understanding their body language allows the character to understand more than the target’s words might communicate, such as whether a person is aggressive, shy, anxious, reckless and so on.",
    "prereq": "",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Understand Code",
    "set": "Translation",
    "effect": "When the character encounters an unknown code for the first time, they can make a Logic vs. TN 13 action check to puzzle it out. If they already know any other version of the language the code is based on, they have an edge. On a success, they understand and can communicate in the code. On a Fantastic success, they permanently understand and can use it and never need to make a check for it again. Digital data communication is considered a form of code, and the character can use this power to understand such data too.",
    "prereq": "Understand Written Language",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Understand Sign Language",
    "set": "Translation",
    "effect": "When the character encounters an unknown sign language for the first time, they can make a Logic vs. TN 13 action check to puzzle it out. If they already know any other version of the language, they have an edge. On a success, they understand and can sign in the language. On a Fantastic success, they permanently understand and can use it and never need to make a check for it again.",
    "prereq": "",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Understand Spoken Language",
    "set": "Translation",
    "effect": "When the character encounters an unknown spoken language for the first time, they can make a Logic vs. TN 13 action check to puzzle it out. If they already know any other version of the language, they have an edge. On a success, they understand and can speak the language. On a Fantastic success, they permanently understand and can speak it and never need to make a check for it again.",
    "prereq": "",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Understand Unusual Communication",
    "set": "Translation",
    "effect": "When the character encounters an unknown form of communication for the first time—one that doesn’t depend on hearing, vision or code—they can make a Logic vs. TN 13 action check to puzzle it out. If they already know any other version of the communication, they have an edge. On a success, they understand and can use that form of communication. On a Fantastic success, they permanently understand and can use it and never need to make a check for it again. This works with forms of communication that include other senses, like scent, touch, taste and so on.",
    "prereq": "Understand Body Language",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Understand Written Language",
    "set": "Translation",
    "effect": "When the character encounters an unknown written language for the first time, they can make a Logic vs. TN 13 action check to puzzle it out. If they already know any other version of the language, they have an edge. On a success, they can read and write the language. On a Fantastic success, they can permanently read and write it and never need to make a check for it again.",
    "prereq": "",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Unflappable Poise",
    "set": "Martial Arts",
    "effect": "Any close attacks against the character have trouble. While they use Defense Stance, such attacks have double trouble.",
    "prereq": "Defense Stance, Rank 3",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Universal Teleportation",
    "set": "Narrative Power",
    "effect": "The character can teleport to any point in the universe to which they have already been, or to any point that they can sense with Cosmic Awareness. They can also bring along any other objects or people they wish, up to an entire planet.",
    "prereq": "",
    "action": "",
    "duration": "",
    "range": "",
    "cost": ""
  },
  {
    "name": "Unrelenting Smash",
    "set": "Super-Strength",
    "effect": "The character makes a Melee check and compares it against the Melee defense of every enemy within their reach. Any enemy the attack succeeds against takes half regular damage. On a Fantastic success, those enemies take full regular damage and are knocked prone instead. The character may then pay 15 more Focus to do the same thing again—before which they can move up to half their speed with anything leftfrom their normal movement action. They can keep doing this until they run out of speed or Focus. Each target can be affected by this attack by this character only once per round.",
    "prereq": "Ground-Shaking Stomp, Mighty 2, Rank 4",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Unstoppable Assault",
    "set": "Melee Weapons",
    "effect": "The character makes a Melee check and compares that against the Melee defense of every enemy within their reach. Any enemy the attack succeeds against takes half regular damage. On a Fantastic success, those enemies take full regular damage instead and suffer the weapon’s special effect. The character may then pay 15 more Focus to do the same thing again—before which they can move up to half their Speed with whatever is leftfrom their normal movement action. They can keep doing this until they run out of Speed or Focus. Each target can only be affected by this attack by this character once per round.",
    "prereq": "Furious Attacks, Focused Fury, Rank 4",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "15 Focus"
  },
  {
    "name": "Untouchable Position",
    "set": "Martial Arts",
    "effect": "If the character is attacked, all other close attacks against them have trouble until the start of their next turn.",
    "prereq": "Counterstrike Technique, Rank 3",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Vapors of Valtorr",
    "set": "Magic",
    "effect": "The character creates an inky mist for up to 25 spaces per rank around them that blocks all line of sight beyond 5 spaces. On later turns, the character can have the mist attacks one target at a time. Make an Ego check against the target’s Vigilance defense. On a success, the attack does regular damage. On a Fantastic success, it does double damage and blinds the target for one turn.",
    "prereq": "Sorcerous, Rank 3",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Venom Bash",
    "set": "Spider-Powers",
    "effect": "The character makes a bare-handed Melee attack. If the attack is a success, it does Health damage. On a Fantastic success, it does double damage, and if the target takes at least 1 point of Health damage, they are also stunned for one round.",
    "prereq": "",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Venom Blast",
    "set": "Spider-Powers",
    "effect": "The character makes a ranged attack. If the attack is a success, it does regular damage. On a Fantastic success, the attack does double damage, and if the target suffers any actual damage, they are also stunned for one round.",
    "prereq": "",
    "action": "Standard",
    "duration": "Instant",
    "range": "5 spaces",
    "cost": ""
  },
  {
    "name": "Venom Burst",
    "set": "Spider-Powers",
    "effect": "The character pounds the ground, arcing bioelectricity all around. Make a single Melee check and compare it to the Melee defense scores of any foes within 5 spaces of the character. On a success, affected targets are knocked prone. On a Fantastic success, they also take half Health damage.",
    "prereq": "Venom Bash, Rank 3",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Venom Sword",
    "set": "Spider-Powers",
    "effect": "The character can create a sword from their own bioelectricity and wield it in combat. It can be used against any target within reach, and it adds +2 to the character’s Melee damage multiplier for attacks made with it. On a Fantastic success, the attack does double damage, and if the target suffers any actual damage, they are also stunned for one round. This does not stack with other such bonuses.",
    "prereq": "Venom Blast, Rank 2",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": "5 Focus per round"
  },
  {
    "name": "Vicious Attack",
    "set": "Melee Weapons",
    "effect": "The character makes a close attack. If the attack is a success, the enemy takes regular damage. On a Fantastic success, the enemy takes double damage and suffers the weapon’s special effect.",
    "prereq": "",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Wallcrawling",
    "set": "Spider-Powers",
    "effect": "The character can climb at a speed equal to their regular speed. Under normal conditions, they never lose their grip, no matter the angle of the surface.",
    "prereq": "",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Weapons Blazing",
    "set": "Ranged Weapons",
    "effect": "The character splits their attack to make two ranged attacks against separate targets (or they can focus a single attack on a single target). Make a single Agility check and compare it to the targets’ Agility defenses. On a success, the affected target takes half regular damage. On a Fantastic success, the affected target takes full damage, and the character can make a bonus attack with this power against any available target, with the same effect.",
    "prereq": "Snap Shooting",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Weather Chill",
    "set": "Weather Control",
    "effect": "The temperature in an area roughly a mile across falls as low as 0°F.",
    "prereq": "",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": ""
  },
  {
    "name": "Weather Warm",
    "set": "Weather Control",
    "effect": "The temperature in an area roughly a mile across climbs as high as 100°F.",
    "prereq": "",
    "action": "Standard",
    "duration": "Concentration",
    "range": "",
    "cost": ""
  },
  {
    "name": "Webcasting",
    "set": "Spider-Powers",
    "effect": "The character makes a ranged attack on an enemy. If the attack is a success, the web paralyzes the enemy. On a Fantastic success, the enemy is also pinned. Breaking free from webbing requires a Melee check (target number 20).",
    "prereq": "",
    "action": "Standard",
    "duration": "Instant",
    "range": "10 spaces",
    "cost": ""
  },
  {
    "name": "Webgliding",
    "set": "Spider-Powers",
    "effect": "The character gains the Glide movement mode, with a speed equal to double their Run Speed.",
    "prereq": "Webcasting, Rank 2",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Webgrabbing",
    "set": "Spider-Powers",
    "effect": "The character makes a ranged attack on an enemy. If the attack is a success, the character grabs the target with a web. On a Fantastic success, the target can also be pinned. Breaking free from webbing requires a Melee check (target number 20).",
    "prereq": "Webcasting, Rank 2",
    "action": "Standard",
    "duration": "Instant",
    "range": "10 spaces",
    "cost": "5 Focus"
  },
  {
    "name": "Webslinging",
    "set": "Spider-Powers",
    "effect": "The character gains the swingline movement mode, with a Speed equal to triple their Run Speed. The reach of their swingline is equal to their Swingline Speed.",
    "prereq": "Webcasting, Rank 2",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Webtrapping",
    "set": "Spider-Powers",
    "effect": "The character fills up to 5 spaces with sticky webs, and the affected spaces are considered difficult terrain. Any creature that starts its turn in or moves into an affected space must make an Agility check (target number 20) or be paralyzed by the webbing. Breaking free from webbing requires a Melee check (target number 20).",
    "prereq": "Webgrabbing, Rank 3",
    "action": "Standard",
    "duration": "The character’s rank times 15 minutes",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Whirling Frenzy",
    "set": "Melee Weapons",
    "effect": "The character makes a Melee check and compares it against the Melee defense of every enemy within their reach. If an attack is a success, the enemy takes half regular damage. On a Fantastic success, the enemy takes full damage and suffers the weapon’s special effect.",
    "prereq": "Fast Attacks, Rank 2",
    "action": "Standard",
    "duration": "Instant",
    "range": "",
    "cost": "5 Focus"
  },
  {
    "name": "Winds of Watoomb",
    "set": "Magic",
    "effect": "The character conjures swirling winds that they control. All movement by a foe within 10 spaces per the character’s rank is cut in half. The character can also use this spell to push away smoke, mist or fog. If such a thing was created by a power, the character makes an Ego check with an edge against the Ego defense of the opposing controller. On a success, the controller’s power ends. On a Fantastic success, the controller is knocked prone. Additionally, the Winds of Watoomb can be used to reinforce the Shield of the Seraphim. The character can transfer any Health damage that gets through the Shield of the Seraphim’s protection to their Focus instead, leaving the Shield of the Seraphim intact.",
    "prereq": "Sorcerous, Rank 2",
    "action": "Standard or reaction",
    "duration": "Concentration",
    "range": "",
    "cost": "10 Focus"
  },
  {
    "name": "Wisdom",
    "set": "Basic",
    "effect": "The character can use their Ego defense score against Logic attacks too.",
    "prereq": "",
    "action": "",
    "duration": "Permanent",
    "range": "",
    "cost": ""
  },
  {
    "name": "Wisecracker",
    "set": "Basic",
    "effect": "The character cracks a joke at the enemy’s expense. Make an Ego attack. On a success, it does regular Focus damage. On a Fantastic success, the damage is doubled, and the target is stunned for one round.",
    "prereq": "",
    "action": "Reaction",
    "duration": "Instant",
    "range": "",
    "cost": ""
  },
  {
    "name": "Wish You Luck",
    "set": "Luck",
    "effect": "The character picks an ally in line of sight. That ally gains an edge on all action checks made while this power is in effect. There is no limit on the range between the character and the ally once the power is activated. The character must pay the Focus cost at the start of each of their subsequent turns of concentration to keep the power working. Art by Lucas Werneck & David Curiel",
    "prereq": "Lucky You, Rank 2",
    "action": "Standard",
    "duration": "Concentration",
    "range": "5 spaces per rank",
    "cost": "5 Focus per turn"
  }
];
