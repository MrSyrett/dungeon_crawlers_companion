// GENERATED FILE - do not edit by hand.
// Source: data/nimble/parts/*.json - regenerate with: node scripts/build-nimble-data.mjs

import type { NimbleTables } from "./nimble-types";

export const NIMBLE_TABLES: NimbleTables = {
  "quickRules": [
    {
      "title": "Stats & KEY",
      "text": "4 stats: STR, DEX, INT, WIL (max typically +5). Each class has 2 Key Stats; “KEY” means use one of them. A stat before a die (e.g., “WIL d8”) means roll that many dice."
    },
    {
      "title": "Skill Checks",
      "text": "Roll 1d20 + skill (max +12) vs. the DC: Easy 8, Medium 12, Challenging 15, Very Difficult 18, Extremely Difficult 20+. A 1 always fails, a 20 always succeeds."
    },
    {
      "title": "Saves",
      "text": "Roll 1d20 + the relevant stat. 1 always fails, 20 always saves; you may choose to fail. Each hero has 1 advantaged save (+), 1 disadvantaged save (–), and 2 neutral. The DC for effects a hero causes is 10+KEY."
    },
    {
      "title": "Advantage & Disadvantage",
      "text": "Roll 1 additional die of the same type and remove the lowest (advantage) or highest (disadvantage). Multiple instances stack; each advantage cancels one disadvantage before you roll. Ties: remove dice left to right."
    },
    {
      "title": "HP, Dying & Wounds",
      "text": "At 0 HP gain 1 Wound and the Dying condition (1 action only, Concentration broken). Attacking/casting while Dying causes 1 Wound unless you pass a DC 10 STR save; taking damage causes 2 Wounds (3 on a crit). Die at 6 Wounds. Wounds heal 1 per Safe Rest. Temp HP is lost first, doesn’t stack, and expires after a Safe Rest."
    },
    {
      "title": "Hit Dice",
      "text": "Max Hit Dice = your level (start with 1). Spend them during Field Rests to regain HP (roll + STR; Make Camp = max value). All recovered on a Safe Rest."
    },
    {
      "title": "Actions",
      "text": "3 actions per turn, all recharge at the end of your turn. Attack, Move (up to Speed 6; Difficult Terrain halves it), Cast Spell (needs a free hand or focus and the ability to speak), Assess (DC 12 skill check to ask a question, create an opening, or anticipate danger). Simple free actions 1/turn."
    },
    {
      "title": "Attacks, Crits & Misses",
      "text": "Roll the weapon/spell dice; a 1 on the Primary (leftmost) Die misses. Rolling the max on the Primary Die is a crit: roll it again and add, repeating on each max. Crits ignore monster armor. Weapons used without proficiency cannot crit."
    },
    {
      "title": "Rushed Attacks",
      "text": "Additional attacks on the same turn are rushed: cumulative disadvantage for each attack after the first. For save-based abilities (e.g., Grappling), enemies instead roll with increasing advantage."
    },
    {
      "title": "Reactions",
      "text": "Cost 1 action, taken off-turn, each no more than 1/round. Defend: reduce one attack’s damage by your Armor. Interpose: swap into the space of a creature within 2 spaces to become the target. Opportunity Attack: melee attack with disadvantage on an adjacent enemy that willingly moves away (heroes only). Help: give an ally advantage on a roll if you explain how (one Help per roll)."
    },
    {
      "title": "Initiative",
      "text": "Roll 1d20 + Initiative (typically DEX). Single digit: start with 1 action; 2 digits: 2 actions; 20+ (or natural 20): all 3. Heroes go first by default (any order), monsters typically last. Everyone regains all 3 actions at the end of their turn."
    },
    {
      "title": "Mana & Upcasting",
      "text": "A spell’s mana cost equals its tier; cantrips are free. Upcast by spending extra mana (up to the highest tier you have unlocked) for the listed bonus per additional mana. Multi-target/AoE spells don’t miss or crit; one roll applies to all targets."
    },
    {
      "title": "Concentration",
      "text": "Only one thing at a time. When crit while concentrating, make a DC 10 STR save or lose it. Automatically broken at 0 HP or when Incapacitated."
    },
    {
      "title": "Cover & Hiding",
      "text": "Mostly obscured = Cover: attacks against you have disadvantage. Fully obscured = Full Cover: can’t normally be targeted. To hide in combat you need Cover, and an action for a DC 15 Stealth check (automatic with Full Cover). Your first attack while hidden has advantage, then you are revealed."
    },
    {
      "title": "Range & Reach",
      "text": "Default Reach 1. Ranged attacks have disadvantage if any enemy is adjacent (Reach attacks do not). Take disadvantage 1 to gain +2 Range (max +6)."
    },
    {
      "title": "Grappling",
      "text": "Need Reach and 1 free arm. Target makes a STR or DEX save (DC 10+STR or DEX): your size or smaller is Grappled; larger, you gain Riding. Ends by forced movement, incapacitation, or an action + successful STR/DEX save."
    },
    {
      "title": "Falling & Forced Movement",
      "text": "1d6 bludgeoning per space a forced move is shortened by an obstacle (split if it hits another creature). Falling: 1d6 per 10 ft. (2 spaces)."
    },
    {
      "title": "Armor",
      "text": "Unarmored, Armor = DEX. Armor applies when you Defend. Monsters with Medium Armor take only the dice (ignoring positive modifiers); Heavy Armor halves the dice. Crits and vulnerabilities ignore monster armor."
    },
    {
      "title": "Rests",
      "text": "Field Rest: Catch Breath (10 min, roll Hit Dice + STR) or Make Camp (8 hrs, max Hit Die value + STR). Safe Rest (inn or other GM-designated safe place): recover all HP, Hit Dice, mana and class resources, and heal 1 Wound."
    },
    {
      "title": "Leveling Up",
      "text": "Roll your Hit Die with advantage and add it to max HP; max Hit Dice +1; gain 1 skill point (and may move 1 point between skills; max +12); gain class features. Adjust anything affected by stat increases."
    },
    {
      "title": "Character Creation",
      "text": "Pick a class, ancestry, background (and optionally a motivation). Choose a stat array (Standard +2,+2,+0,–1; Balanced +2,+1,+1,+0; Min–Max +3,+1,–1,–1). Skills start at their stat, plus 4 skill points. Common plus 1 language per point of INT. Start with class/background gear or 50 gp (× level if starting higher). Speed 6, max Wounds 6, Hit Dice = level, Initiative = DEX."
    },
    {
      "title": "Inventory",
      "text": "10+STR slots. 1 slot: one-handed weapon, shield, worn armor, stack of javelins, 500 gp, or 2 potions. 2 slots: 2-handed weapon, unworn armor, or bulky items. Small related items can share a slot. Ammo need not be tracked."
    },
    {
      "title": "Equipment Swapping",
      "text": "Sheathe a weapon or shield you are proficient with and equip a different one for free 1/round. Potions take an action to drink or give to an adjacent willing creature."
    },
    {
      "title": "Minions",
      "text": "Die from any damage, move and attack at the same time, cannot crit, and their attacks can be Defended against as if they were a single attack. Overflow damage may spill to nearby minions at the GM’s discretion."
    },
    {
      "title": "Running Monsters",
      "text": "The GM controls the monsters during combat. Monsters do not use Heroic Actions/Reactions. They can move, use the actions listed on their stat block, and their turn ends. Monsters die when they reach 0 HP. (p.24)"
    },
    {
      "title": "Default Monster Stats",
      "text": "Unless otherwise noted, monsters are medium-sized, unarmored, have speed 6 (can replace an attack to move again, or replace either one of those to retry a save), attacks have Reach 1, and roll 1d20 for all saves (some monsters may have advantaged/disadvantaged saves or checks when appropriate)."
    },
    {
      "title": "Reading a Stat Block",
      "text": "Name, LVL and size; the number by the name is the creature's Hit Points; M or H is its Armor; a speed note (fly, burrow, etc.) if it differs from the default. E.g. a Goblin (LVL 1/3, 15 HP): if he ever takes a total of 15 or more damage he dies; LVL 1/3 means 3 goblins are about as strong as a level 1 hero."
    },
    {
      "title": "Medium Armor: Just the Dice",
      "text": "Monsters with Medium Armor (M) ignore all damage modifiers from stats and other effects, taking damage from the sum of the dice only."
    },
    {
      "title": "Heavy Armor: Half the Dice",
      "text": "Monsters with Heavy Armor (H) ignore damage modifiers and take half the sum of the dice (rounding up)."
    },
    {
      "title": "Dealing With Armor",
      "text": "Heroes' critical hits, some spells, and damage type vulnerabilities ignore monster armor altogether — certain weapons and spells are better or worse against armored foes. Remind players about the Assess action. Tell your players when a monster has armor — it shouldn't be a secret (that goblin is holding a shield: Medium Armor; a golem made of metal: Heavy Armor)."
    },
    {
      "title": "Monster vs Hero Armor",
      "text": "Why does it work differently? GMs have enough to juggle without deciding when to Defend against a dozen attacks each round. Heroes have only one character to focus on, so the added tactical depth is an enjoyable detail rather than a burden."
    },
    {
      "title": "Flunkies",
      "text": "Flunkies are like regular monsters, but with one key difference: they can't crit. Ideal opponents for new or low-level heroes."
    },
    {
      "title": "Minions",
      "text": "Minions are low-threat monsters that are easy to kill individually but dangerous in numbers. No HP to Track: any damage kills a minion. Easy Attacks: each minion attacks with a single damage die, cannot crit, and misses on a roll of 1. Simplified Defense: when multiple minions attack a single target, their damage is combined and counts as a single attack, so heroes can Defend or Interpose against them all at once."
    },
    {
      "title": "Minions Act Together!",
      "text": "Rather than moving minions one at a time, all minions attacking a particular hero should move and attack at the same time. E.g. 5 minions move next to Grudge and attack him: roll and add up 5d6 (ignoring any 1s)."
    },
    {
      "title": "Minion Die Size",
      "text": "Suggested minion die size by party level: 1–3 d4, 3–5 d6, 5–10 d8, 10–13 d10, 13–17 d12, 17–20 d20. Optionally use the die size as durability: excess damage from an attack can carry over to other minions in range."
    },
    {
      "title": "Encounter Difficulty",
      "text": "Add up the heroes' total levels. Monster levels < 50% of that: Easy. ~75%: Medium. 100%: Hard. 100–125%: Deadly. 150%+: Very Deadly. Use 1–4 monsters per hero (excluding minions); 2–5 encounters per session is typical."
    },
    {
      "title": "Armor Variety",
      "text": "Aim for roughly 60% unarmored, 30% Medium Armor, 10% Heavy Armor foes in a session — use armor to add flavor, not frustration."
    },
    {
      "title": "Building Monsters",
      "text": "Use the Monster Builder table; for each special ability added, lower HP or damage 1 step or treat the monster as 1 step stronger. Default to d8 damage dice (d4 undead, d6 goblins, d10 beasts, d12 giants, d20 the mightiest)."
    },
    {
      "title": "Legendary Monsters",
      "text": "Solo monsters should almost always be Legendary. Legendary monsters act after EACH hero's turn (not after minions, commoners or followers). They have saves like heroes (STR++ = advantage 2, WIL– = disadvantage), gain a Bloodied ability at half HP, and at 0 HP enter their Last Stand — dying, with dangerous new capabilities, until a small amount of additional damage finishes them."
    },
    {
      "title": "Legendary Optional Actions",
      "text": "Instead of a listed attack a legendary monster may: Wind Up/Breathe In (regain a single-use ability); Terrible Roar/Creepy Monologue/Taunt (WIL save or Frightened for 1 turn); Toss Around/Telekinetic Shove (STR save or moved, Prone, etc.); Size Up/Spot Weakness/Pin Down (DEX save; its next attack has advantage and cannot be Interposed)."
    },
    {
      "title": "Legendary Teams",
      "text": "\"Solo\" encounters need not be strictly solo: legendary creatures may have pets, summon minions, or come in groups. Have ALL of them attack after each hero, or take turns attacking."
    },
    {
      "title": "Family Traits",
      "text": "Each bestiary family shares a trait that applies to every member (e.g. Kobolds' Nooooo!, Goblins' Haha, Missed Me!, Bandits' Parry, Undead's Unliving, Undying). Sub-groups (Stirges, Mimics, Oozes, Gnolls, Briarbanes, Cultists) have their own trait."
    },
    {
      "title": "Release Valves",
      "text": "A TPK is sometimes the right outcome when heroes forge ahead heedless of telegraphed danger. When it's NOT the players' fault (unexpected, unfair, unintended), a TPK should NOT happen — keep a release valve (e.g. a Gem of Escape) so you have leeway in encounter design. (p.18)"
    },
    {
      "title": "Rewards",
      "text": "The most memorable magical items are a bit strange, have a trade-off, are temporary, require creativity, or create memorable moments — flat stat boosts are quickly forgotten. A simple item with a cool name and description can be just as exciting. Tailor rewards to your table and adjust challenge accordingly."
    },
    {
      "title": "Resting & Healing as Rewards",
      "text": "When a party rests is up to the GM. One-time healing or directions to a hidden oasis can be great quest rewards. Reward different classes: the Hunter spots rare herbs, the Stormshifter befriends an animal that shares a safe hideaway, the Shepherd or Oathsworn cleanses a holy site."
    }
  ],
  "statDescriptions": {
    "STR": "Strength. Your raw physical power and resilience, endurance, and resistance to harm. Affects STR weapon damage, resistance to Wounds, HP recovery, Concentration, STR saves, carrying capacity, Grappling, and the Might skill.",
    "DEX": "Dexterity. Your agility, reflexes, and precision with blades or bows. Affects DEX weapon damage, Initiative, DEX saves, Grappling, and can contribute to Armor, as well as the Stealth and Finesse skills.",
    "INT": "Intelligence. Reflects knowledge and reasoning across fields like the arcane, tactics, or street smarts. Affects languages, spellcasting, use of wands, spell scrolls, INT saves, as well as the Arcana, Examination, and Lore skills.",
    "WIL": "Will. Your force of personality, courage, and wisdom. Will shapes your interactions with both nature and society. Affects spellcasting and WIL saves, as well as the Insight, Influence, Naturecraft, and Perception skills."
  },
  "difficulties": [
    {
      "name": "Easy",
      "dc": "8",
      "example": "Spotting a large Ogre crouched behind a small bush might be a DC 8 Perception check."
    },
    {
      "name": "Medium",
      "dc": "12",
      "example": "A hidden doorway behind a bookcase might be a DC 12 Examination check."
    },
    {
      "name": "Challenging",
      "dc": "15",
      "example": "Calming an injured Owlbear stuck in a trap may be a DC 15 Naturecraft check."
    },
    {
      "name": "Very Difficult",
      "dc": "18",
      "example": "Intuiting the true intentions of a trained Spy may be a DC 18 Insight check."
    },
    {
      "name": "Extremely Difficult",
      "dc": "20+",
      "example": "Disarming an ancient legendary trap may be a DC 20+ Finesse check."
    }
  ],
  "statArrays": [
    {
      "name": "Standard",
      "values": [
        2,
        2,
        0,
        -1
      ]
    },
    {
      "name": "Balanced",
      "values": [
        2,
        1,
        1,
        0
      ]
    },
    {
      "name": "Min–Max",
      "values": [
        3,
        1,
        -1,
        -1
      ]
    }
  ],
  "languages": [
    {
      "name": "Common",
      "spokenBy": "Most intelligent creatures."
    },
    {
      "name": "Dwarvish",
      "spokenBy": "Dwarves, Gnomes, and Giants."
    },
    {
      "name": "Elvish",
      "spokenBy": "Elves, Fey, and Sylvan."
    },
    {
      "name": "Goblin",
      "spokenBy": "Goblins and Orcs."
    },
    {
      "name": "Infernal",
      "spokenBy": "Various Fiends and cultists."
    },
    {
      "name": "Thieves’ Cant",
      "spokenBy": "Scoundrels and rogues."
    },
    {
      "name": "Celestial",
      "spokenBy": "Celestials and priests."
    },
    {
      "name": "Draconic",
      "spokenBy": "Dragons, Dragonborn, and Kobolds."
    },
    {
      "name": "Primordial",
      "spokenBy": "Elementals and Ancient Beings."
    },
    {
      "name": "Deep Speak",
      "spokenBy": "Underworld dwellers."
    }
  ],
  "creation": {
    "skillPointsAtL1": 4,
    "inventorySlotsBase": 10,
    "maxWounds": 6,
    "speed": 6,
    "actions": 3,
    "startingGold": 50,
    "maxStat": 5,
    "maxSkill": 12
  },
  "sizes": [
    {
      "name": "Tiny",
      "text": "Can be carried in a typical pocket (many can comfortably fit in 1 space)."
    },
    {
      "name": "Small",
      "text": "Can be carried in a backpack (2 can comfortably fit in 1 space)."
    },
    {
      "name": "Medium",
      "text": "The average human size (1 can comfortably fit in 1 space)."
    },
    {
      "name": "Large",
      "text": "Roughly the size of a bear (1 can comfortably fit in a 2x2 area)."
    },
    {
      "name": "Huge",
      "text": "Roughly the size of a small house (1 can comfortably fit in a 3x3 area)."
    },
    {
      "name": "Gargantuan",
      "text": "Can be as large as a castle keep (1 can fill a 4x4 area or greater)."
    }
  ],
  "weaponProperties": [
    {
      "name": "2-handed",
      "text": "Can be held in a single hand, but must be wielded in 2 hands to attack with it."
    },
    {
      "name": "Load",
      "text": "Some weapons require extra actions to load before each shot."
    },
    {
      "name": "Reach",
      "text": "How close an enemy must be to be affected by this attack. If unspecified, Reach 1."
    },
    {
      "name": "Range",
      "text": "Attacks can be made from afar. If any enemy is adjacent to you, your Ranged attacks are made with disadvantage. Add 1 die of disadvantage to gain +2 Range (max +6)."
    },
    {
      "name": "Thrown",
      "text": "Treat a melee weapon as if it had Range. Once thrown, you no longer have it!"
    },
    {
      "name": "Vicious",
      "text": "Roll 1 additional die whenever you roll crit damage. Only the Primary Die (the leftmost one) is used for determining whether an attack crits; every time you roll crit damage, roll the additional Vicious die as well."
    },
    {
      "name": "Light",
      "text": "Heroes may wield 2 Light weapons at the same time. While dual wielding, you may gain advantage on an attack with those weapons, 1/round. You may dual wield 1-handed weapons without the Light property if your STR is 3 or greater, or 1 weapon without the Light property if your STR is 2. Dual wielding different weapons? Roll dice for both weapons and choose either result instead (the 1/round limit still applies). Attacking with advantage? Add an extra die for one of the weapons."
    },
    {
      "name": "Req. X STR",
      "text": "Requires the listed STR to use effectively. Heroes can use any equipment they like, but weapons used without proficiency cannot crit, and Defending while wearing armor without proficiency costs 1 additional action."
    }
  ],
  "rests": [
    {
      "name": "Catch Breath (Field Rest)",
      "text": "Requires at least 10 minutes to tend to your injuries. Expend any number of Hit Dice one at a time (roll them and add your STR to each), and regain that many HP. Negative STR? Subtract your STR from each HD you expend."
    },
    {
      "name": "Make Camp (Field Rest)",
      "text": "If you rest for at least 8 hours with food and sleep, take the maximum value for each Hit Die you expend instead of rolling. Add your STR to each Hit Die as usual."
    },
    {
      "name": "Safe Rest",
      "text": "Takes place in a safe location designated by your GM, typically lodging at an inn overnight—but could also be at a secret oasis, a well-stocked cabin in the woods, near a sacred shrine, or the like. Camping in the open wilderness or in a dungeon is not sufficient. After a Safe Rest, heroes recover all of their HP, Hit Dice, mana (and other class-specific resources), and heal 1 Wound. For a more realistic convalescence time, 1 week per wound recovered may make more sense."
    }
  ],
  "downtime": [
    {
      "name": "Retrain",
      "text": "Spend time doing activities to retrain any of your chosen abilities, features, or if it makes sense in the story, possibly even your subclass."
    },
    {
      "name": "Gather Information",
      "text": "Meet NPCs, pick up news, or collect rumors and job leads."
    },
    {
      "name": "Personal Goals",
      "text": "Pursue goals from your backstory or other smaller quests you’ve chosen."
    },
    {
      "name": "Buy & Sell",
      "text": "Get new equipment, and sell treasures you’ve collected while out adventuring."
    },
    {
      "name": "Perform",
      "text": "Play music, tell stories, compete, or perform in public to earn gold or fame."
    },
    {
      "name": "Craft",
      "text": "Create weapons, armor, or simple items using materials you’ve acquired."
    },
    {
      "name": "Socialize",
      "text": "Build alliances, make new friends, or make new enemies."
    },
    {
      "name": "Invest",
      "text": "Use your gold to invest in businesses or trade ventures for future profit."
    },
    {
      "name": "Mentor",
      "text": "Teach a skill or ability to another character or NPC."
    },
    {
      "name": "Research",
      "text": "Investigate a mystery, study ancient texts, or uncover hidden knowledge."
    },
    {
      "name": "Serve",
      "text": "Aid a patron or a deity in exchange for a favor, or perform charity for townsfolk."
    },
    {
      "name": "Build",
      "text": "Establish a home base, start a business, craft siege weapons, or build anything else you can imagine (GM and setting-permitting, of course)."
    }
  ],
  "lodging": [
    {
      "name": "Poor",
      "cost": "5 sp",
      "text": "The cheapest rooms at an inn save you money but may lead to complications. Price is per person/day."
    },
    {
      "name": "Comfortable",
      "cost": "2 gp",
      "text": "A standard room. Price is per person/day."
    },
    {
      "name": "Lavish",
      "cost": "10 gp",
      "text": "A premium room and amenities. Lavish inns allow players to gain one Temporary Boon the following day (see Lodging Boons table on pg. 22 of the GM’s Guide). Price is per person/day."
    }
  ],
  "boons": [
    {
      "kind": "Boons (overview)",
      "name": "Awarding Boons",
      "text": "Boons can be a great quest reward from a powerful patron (e.g., an elf queen, hearing of a hero's bravery, could bestow them with the Brave or Lionhearted Boon), a temporary buff (e.g., a tonic that gives Epic Speed for 1 hour), or you can allow players to take a Minor/Major Boon instead of a Secondary/Key stat increase. (p.22)"
    },
    {
      "kind": "Minor Boon",
      "name": "Alert",
      "text": "+1 to Initiative."
    },
    {
      "kind": "Minor Boon",
      "name": "Bright",
      "text": "+1 max mana."
    },
    {
      "kind": "Minor Boon",
      "name": "Experienced",
      "text": "+4 HP."
    },
    {
      "kind": "Minor Boon",
      "name": "Feisty",
      "text": "+1 max Hit Die."
    },
    {
      "kind": "Minor Boon",
      "name": "Fiery",
      "text": "+1 fire damage."
    },
    {
      "kind": "Minor Boon",
      "name": "Intrepid",
      "text": "+1 speed."
    },
    {
      "kind": "Minor Boon",
      "name": "Skilled",
      "text": "+1 skill point."
    },
    {
      "kind": "Minor Boon",
      "name": "Simple",
      "text": "+1 VS Charm effects."
    },
    {
      "kind": "Minor Boon",
      "name": "Stand Tall",
      "text": "+Height (slightly)."
    },
    {
      "kind": "Major Boon",
      "name": "Ancestry Trait",
      "text": "Selecting another Ancestry trait (if it makes sense) can make for a great Major Boon."
    },
    {
      "kind": "Major Boon",
      "name": "Aggressive",
      "text": "On your first round of combat you can spend 1 Action from your next turn."
    },
    {
      "kind": "Major Boon",
      "name": "Battle Hardened",
      "text": "+2 Armor."
    },
    {
      "kind": "Major Boon",
      "name": "Brave",
      "text": "+2 to damage while you have the most enemies adjacent to you."
    },
    {
      "kind": "Major Boon",
      "name": "Expansive Mind",
      "text": "+4 max mana."
    },
    {
      "kind": "Major Boon",
      "name": "Good Patient",
      "text": "Whenever you would receive healing, you heal an additional KEY HP."
    },
    {
      "kind": "Major Boon",
      "name": "Hardy",
      "text": "Whenever you would roll your Hit Dice to increase your max HP, roll with advantage 2 instead."
    },
    {
      "kind": "Major Boon",
      "name": "Honorable Protector",
      "text": "Gain LVL temp HP whenever you Interpose. Suffer LVL psychic damage whenever an ally within 2 spaces is attacked and you don't Interpose."
    },
    {
      "kind": "Major Boon",
      "name": "Lionhearted",
      "text": "+2 Armor while you have the most enemies adjacent to you."
    },
    {
      "kind": "Major Boon",
      "name": "Natural Talent",
      "text": "Learn 1 Cantrip in a school you don't know."
    },
    {
      "kind": "Major Boon",
      "name": "Resolute",
      "text": "When pushed, you are pushed 1 space less. Whenever you would be knocked Prone, you can instead be moved back 1 space. 1/turn."
    },
    {
      "kind": "Major Boon",
      "name": "Resilient",
      "text": "If you would take any Wounds, you may become immune to them this turn instead. 1/Safe Rest."
    },
    {
      "kind": "Major Boon",
      "name": "Smart, Not Book Smart",
      "text": "–KEY max mana. Gain 1d4 mana whenever you roll Initiative; this expires if unused at the end of combat."
    },
    {
      "kind": "Major Boon",
      "name": "Sniper",
      "text": "Advantage on attacks when no enemy is adjacent to you; disadvantage otherwise."
    },
    {
      "kind": "Major Boon",
      "name": "Stalwart",
      "text": "+1 max Hit Die, +2 Might."
    },
    {
      "kind": "Major Boon",
      "name": "Tenacious",
      "text": "+2 max Hit Dice."
    },
    {
      "kind": "Major Boon",
      "name": "Tough",
      "text": "Whenever you gain temp HP, gain 5 more."
    },
    {
      "kind": "Major Boon",
      "name": "Unflinching",
      "text": "Your focus is unbroken even in the face of danger. Advantage on Concentration checks."
    },
    {
      "kind": "Major Boon",
      "name": "Unnatural Talent",
      "text": "Learn any 1 Utility Spell."
    },
    {
      "kind": "Major Boon",
      "name": "Veteran",
      "text": "+10 HP."
    },
    {
      "kind": "EPIC Boon",
      "name": "Epic Agility",
      "text": "Gain 1 action. 1/encounter."
    },
    {
      "kind": "EPIC Boon",
      "name": "Epic Criticals",
      "text": "Whenever you roll for critical hit damage, you may replace one die with a d20."
    },
    {
      "kind": "EPIC Boon",
      "name": "Epic Defense",
      "text": "Your shields gain +3 Armor."
    },
    {
      "kind": "EPIC Boon",
      "name": "Epic Foresight",
      "text": "Gain +5 to Initiative rolls and advantage on your first attack each encounter."
    },
    {
      "kind": "EPIC Boon",
      "name": "Epic Knowledge",
      "text": "1/day, you can call upon a moment of profound insight to gain hidden knowledge about a legendary person or object."
    },
    {
      "kind": "EPIC Boon",
      "name": "Epic Mana",
      "text": "Whenever you are healed, you may instead recover 1 mana for every 5 HP you would have been healed."
    },
    {
      "kind": "EPIC Boon",
      "name": "Epic Mind",
      "text": "+8 mana."
    },
    {
      "kind": "EPIC Boon",
      "name": "Epic Stamina",
      "text": "Rolling 4 or higher on a Hit Die during a Field Rest heals 1 Wound."
    },
    {
      "kind": "EPIC Boon",
      "name": "Epic Speed",
      "text": "+4 Speed, +4 Initiative."
    },
    {
      "kind": "EPIC Boon",
      "name": "Epic Stats",
      "text": "Increase 3 different stats by 1."
    },
    {
      "kind": "EPIC Boon",
      "name": "Epic Senses",
      "text": "Gain Blindsight 6 or Darkvision 16."
    },
    {
      "kind": "EPIC Boon",
      "name": "Epic Resistance",
      "text": "1/encounter. Whenever you would suffer damage or fail a save you can choose not to instead."
    },
    {
      "kind": "Lodging Boon",
      "name": "Lodging Boons",
      "text": "Spending extra gold on lavish accommodations can provide valuable temporary benefits: quicker recovery, valuable contacts, additional resources, or unique opportunities. The specific benefits depend on the quality of the lodging and the amount spent. Roll 1d8 on the Temporary Boon table, or award a Minor, Major, or even EPIC Boon based on how much the heroes pay and where they rest. These Boons are temporary and last only until the heroes take another Safe Rest. Adjust the cost and impact to suit your campaign and the party's level of wealth. (p.21)"
    },
    {
      "kind": "Lodging Boon",
      "name": "A Minor Boon",
      "text": "Typically costs around 10 gp."
    },
    {
      "kind": "Lodging Boon",
      "name": "A Major Boon",
      "text": "Typically costs around 100 gp."
    },
    {
      "kind": "Lodging Boon",
      "name": "An EPIC Boon",
      "text": "Typically costs around 1,000 gp."
    },
    {
      "kind": "Temporary Boon (1d8)",
      "name": "1",
      "text": "Recover 2 additional Wounds"
    },
    {
      "kind": "Temporary Boon (1d8)",
      "name": "2",
      "text": "Gain LVL temp HP"
    },
    {
      "kind": "Temporary Boon (1d8)",
      "name": "3",
      "text": "Gain KEY temp Hit Dice"
    },
    {
      "kind": "Temporary Boon (1d8)",
      "name": "4",
      "text": "+1 Speed"
    },
    {
      "kind": "Temporary Boon (1d8)",
      "name": "5",
      "text": "Inspired (reroll any die, once)"
    },
    {
      "kind": "Temporary Boon (1d8)",
      "name": "6",
      "text": "Advantage vs. Fear/Charm/Etc."
    },
    {
      "kind": "Temporary Boon (1d8)",
      "name": "7",
      "text": "Learn an important rumor"
    },
    {
      "kind": "Temporary Boon (1d8)",
      "name": "8",
      "text": "+KEY mana"
    },
    {
      "kind": "Secret Spell",
      "name": "Secret Spells",
      "text": "These spells are either incredibly powerful and banned from common knowledge, or ancient and simply lost to the ravages of time. They may not be appropriate for heroes to wield freely but can make for excellent quest rewards when found on scrolls, imbued in wands, or taught by a rare NPC. The mere existence of these spells can drive entire storylines and enrich your game world. (p.20)"
    },
    {
      "kind": "Secret Spell",
      "name": "Revive",
      "text": "(Tier 3 Radiant spell, casting time: 1 hour.) Bring a dead creature back to life, provided they've been dead no more than 10 days and have not been revived by this spell before. Attempting to revive a creature already brought back with this spell risks raising a mindless, zombified husk instead. Why is this secret? Freely returning to life can lower the stakes and sap excitement from near-death encounters. On the flip side, it's a powerful tool to maintain momentum in a campaign struck by bad luck or to create dramatic story moments (such as reviving a villain)."
    },
    {
      "kind": "Secret Spell",
      "name": "Sparkfetch",
      "text": "(Lightning cantrip) Loudly teleport a tiny, unheld metal item you can see to yourself. Why is this secret? This seemingly harmless cantrip led to a wave of mysterious thefts, as stormy nights became prime time for mischievous first-year students pilfering coins and valuables. Quickly banned, it remains an infamous spell in magical academies."
    },
    {
      "kind": "Secret Spell",
      "name": "Lesser Windform",
      "text": "(Wind cantrip, Concentration: up to 10 minutes.) You are invisible and blinded for the duration of the spell."
    },
    {
      "kind": "Secret Spell",
      "name": "Greater Windform",
      "text": "(Tier 5 Wind spell, Concentration: up to 10 minutes.) Gain invisibility, a flying speed, and the ability to slip through any space that wind can pass through."
    },
    {
      "kind": "Secret Spell",
      "name": "Radiant Bond",
      "text": "(Tier 3 Radiant spell, Concentration: up to 10 minutes.) Telepathically communicate across any distance with a creature that holds a gift you have freely given."
    },
    {
      "kind": "Secret Spell",
      "name": "Speak With Dead",
      "text": "(Tier 4 Necrotic spell) Temporarily animate a corpse, allowing it to answer up to 3 questions before returning to rest. The corpse must answer, but it isn't required to be truthful if it dislikes the questioner or the questions."
    },
    {
      "kind": "Secret Spell",
      "name": "Hearth & Home",
      "text": "(Tier 3 Fire spell, casting time 10 minutes.) Conjure a welcoming inn, complete with sturdy wooden tables, plush chairs, and a soft rug underfoot. At its heart burns a cozy fire in a fireplace, filling the space with warmth and light. The inn lasts for 12 hours and vanishes without a trace afterward. Why is this secret? Safe resting anywhere is incredibly powerful. This spell is notoriously tricky to cast manually, so it is most often imbued in wands for wealthy travelers. Allow it cautiously, as it can easily break game balance."
    },
    {
      "kind": "Secret Spell",
      "name": "Teleport",
      "text": "(Tier 6 Lightning Spell, casting time: 10 minutes.) You and up to 10 willing creatures within 2 spaces are instantly teleported to a place of your choice that you have visited before."
    },
    {
      "kind": "Secret Spell",
      "name": "Cryotomb",
      "text": "(Tier 8 Ice Spell, 4 Actions.) Range: 12. A target must make a STR save or become incapacitated in an icy tomb and immune to harm. This lasts as long as you remain alive, or until the ice melts or is otherwise destroyed. The creature may repeat the save once every 10 days. Huge or larger creatures have advantage on the save. A Small or Tiny creature, disadvantage. Upcast: +5 spell save DC. Why is this secret? Being able to instantly trap any boss who fails a single roll is incredibly useful. Cryotomb is even more useful as a narrative linchpin though — the king may have a terrifying monster sealed in ice beneath the palace, and the tomb is beginning to crack…"
    },
    {
      "kind": "Secret Spell",
      "name": "Memory Veil",
      "text": "(Tier 3 Necrotic spell, Concentration: as long as the caster remains conscious.) Conceal or change all memories of an event for up to 12 creatures within 2 spaces on a failed WIL save for as long as this spell lasts. Why is this secret? This can have profound ethical and narrative implications. Often used by shadowy organizations or rulers to cover up secrets best left buried."
    },
    {
      "kind": "Gold",
      "name": "How Much Gold?",
      "text": "Gold is a versatile reward that gives heroes the freedom to choose their own rewards. The table outlines the average amount of gold each hero will typically gain per level. A quest for a noble cause or from a poor villager might pay modestly (one or two levels below average), while one from a wealthy noble with questionable motives may offer a more extravagant reward (one or two levels above average). On Buying Magical Items: most adventurers can save up enough to purchase uncommon or rare magical items, often found in specialty shops in large cities; very rare or legendary items are typically far too expensive to buy and must be earned through adventuring. (p.21)"
    },
    {
      "kind": "Gold per Level",
      "name": "Level 1",
      "text": "25 gp"
    },
    {
      "kind": "Gold per Level",
      "name": "Level 2",
      "text": "40 gp"
    },
    {
      "kind": "Gold per Level",
      "name": "Level 3",
      "text": "80 gp"
    },
    {
      "kind": "Gold per Level",
      "name": "Level 4",
      "text": "150 gp"
    },
    {
      "kind": "Gold per Level",
      "name": "Level 5",
      "text": "280 gp"
    },
    {
      "kind": "Gold per Level",
      "name": "Level 6",
      "text": "450 gp"
    },
    {
      "kind": "Gold per Level",
      "name": "Level 7",
      "text": "750 gp"
    },
    {
      "kind": "Gold per Level",
      "name": "Level 8",
      "text": "1,200 gp"
    },
    {
      "kind": "Gold per Level",
      "name": "Level 9",
      "text": "2,000 gp"
    },
    {
      "kind": "Gold per Level",
      "name": "Level 10",
      "text": "3,000 gp"
    },
    {
      "kind": "Gold per Level",
      "name": "Level 11",
      "text": "5,000 gp"
    },
    {
      "kind": "Gold per Level",
      "name": "Level 12",
      "text": "7,000 gp"
    },
    {
      "kind": "Gold per Level",
      "name": "Level 13",
      "text": "10,000 gp"
    },
    {
      "kind": "Gold per Level",
      "name": "Level 14",
      "text": "17,000 gp"
    },
    {
      "kind": "Gold per Level",
      "name": "Level 15",
      "text": "25,000 gp"
    },
    {
      "kind": "Gold per Level",
      "name": "Level 16",
      "text": "40,000 gp"
    },
    {
      "kind": "Gold per Level",
      "name": "Level 17",
      "text": "60,000 gp"
    },
    {
      "kind": "Gold per Level",
      "name": "Level 18",
      "text": "90,000 gp"
    },
    {
      "kind": "Gold per Level",
      "name": "Level 19",
      "text": "130,000 gp"
    },
    {
      "kind": "Gold per Level",
      "name": "Level 20",
      "text": "200,000 gp"
    },
    {
      "kind": "Gold",
      "name": "Too Much Gold?",
      "text": "An overabundance of gold has its challenges and it may attract unwanted attention: It's Cumbersome (large amounts must be transported via caravan or ship and safely stored). Bandits & Thieves (pickpockets, ambushers, organized crime). Jealousy (rival adventurers, \"old money\" nobles, resentful poor, debt collectors). Corruption (bribes, fake \"opportunities,\" suspicious authorities). Curses (a cache cursed by dark magic, greedy spirits, or treasure guardians). Fame (opportunists, sycophants, bounty hunters, warlords). People In Need (a destitute village, public works, beggars, allies in need). Greedy Monsters (dragons and other powerful beings are drawn to large hoards)."
    },
    {
      "kind": "Chaos Table",
      "name": "Chaos Table",
      "text": "Unless otherwise noted, ongoing effects last for up to 1 minute or until Chaos is triggered again. Roll 1d20. (p.115)"
    },
    {
      "kind": "Chaos Table",
      "name": "1. Elemental Eruption",
      "text": "Creatures within 6 spaces of you must make a DEX save or take INT d10 fire damage on a failure, half on save. You fail the save."
    },
    {
      "kind": "Chaos Table",
      "name": "2. Backfire",
      "text": "Suffer 1 Wound. The spell you just cast also targets you (or an enemy if it was a beneficial spell)."
    },
    {
      "kind": "Chaos Table",
      "name": "3. Aww, Nuts!",
      "text": "You polymorph into a cute squirrel until you take damage. Your TOP priority is to find acorns (squirrels can't cast spells)."
    },
    {
      "kind": "Chaos Table",
      "name": "4. Summon Aetherlings",
      "text": "At the end of each of your turns, summon INT hostile aetherling minions adjacent to you that act immediately after you (size: d6)."
    },
    {
      "kind": "Chaos Table",
      "name": "5. Graviturgical Grace",
      "text": "A random enemy is pulled adjacent to you at the end of each of your turns."
    },
    {
      "kind": "Chaos Table",
      "name": "6. Liquefy Legs",
      "text": "You fall Prone, cannot stand, and your speed becomes 0 while out of water."
    },
    {
      "kind": "Chaos Table",
      "name": "7. Elemental Entanglement",
      "text": "An enemy controls 1 Action for you at the start of each of your turns."
    },
    {
      "kind": "Chaos Table",
      "name": "8. Ethereal Cocoon",
      "text": "You are enveloped in a magical cocoon until the end of your next turn. You fall Prone, are unable to move or speak, and are immune to damage. You must spend all of your Actions casting cantrips at the nearest creature."
    },
    {
      "kind": "Chaos Table",
      "name": "9. Manastorm",
      "text": "The last spell you cast is cast again for free, against a random target."
    },
    {
      "kind": "Chaos Table",
      "name": "10. Reality Warp",
      "text": "Everywhere around you within 6 spaces is difficult terrain."
    },
    {
      "kind": "Chaos Table",
      "name": "11. Displacement",
      "text": "Teleport. 1d4: 1. The worst place! (GM's choice) 2. UP! 6 spaces (3d6 falling damage) 3. Player's choice, 6 spaces 4. Player's choice, 12 spaces."
    },
    {
      "kind": "Chaos Table",
      "name": "12. Chaos Step",
      "text": "Swap places with any creature you can see."
    },
    {
      "kind": "Chaos Table",
      "name": "13. Mindfire",
      "text": "The dumbest enemy within 16 spaces takes INT d6 psychic damage (ignoring armor), and gains the Smoldering condition."
    },
    {
      "kind": "Chaos Table",
      "name": "14. Emerge beautiful",
      "text": "You sprout butterfly wings from your back; gain a flying speed."
    },
    {
      "kind": "Chaos Table",
      "name": "15. Unbiggen",
      "text": "Your size is halved. Gain advantage on Stealth checks, and attacks against you are made with disadvantage."
    },
    {
      "kind": "Chaos Table",
      "name": "16. Embiggen",
      "text": "Your size is doubled. Gain INT d10 Temp HP and advantage on STR saves instead of disadvantage."
    },
    {
      "kind": "Chaos Table",
      "name": "17. Awakening",
      "text": "A 3rd eye appears on your forehead. Gain advantage on the Assess action and all attacks."
    },
    {
      "kind": "Chaos Table",
      "name": "18. Diamond Skin",
      "text": "Multiply your Armor by INT; you can Defend for free each round."
    },
    {
      "kind": "Chaos Table",
      "name": "19. Mighty Mana",
      "text": "Your spells (including the one that triggered this effect) are empowered and are cast as if you spent 2 additional mana on them (ignoring your natural max)."
    },
    {
      "kind": "Chaos Table",
      "name": "20. Elemental Overload",
      "text": "Enemies within 12 spaces of you take INT d8 lightning damage. You regain INT mana at the end of your turns (this mana expires at the end of combat if unused)."
    }
  ],
  "encounters": [
    {
      "name": "Monster Levels",
      "text": "Making encounters in Nimble is easy! Simply add up the total levels of the heroes (e.g., 3 level 2 heroes = 6). Monsters with a total level equal to that will be a hard but fair fight; less than that: medium or easy; greater than that: deadly, or very deadly. Example: a griffon is a level 4 monster, so a flock of 6 griffons (24 monster levels) would be a hard encounter for 6 level 4 heroes, 4 level 6 heroes, or 3 level 8 heroes. (p.25)"
    },
    {
      "name": "Monsters per Hero",
      "text": "Typical encounters should have 1–4 monsters per hero (excluding minions). For an epic fight against a single bad guy, use a legendary monster; for hordes, use minions. If the heroes or monsters greatly outnumber one another the encounter may be easier or harder than anticipated — 1–4 monsters per hero is the sweet spot."
    },
    {
      "name": "Encounters Per Rest",
      "text": "Typically, a session includes 2–5 combat encounters, but this is flexible. If your players are enjoying the game without combat, don't force it — especially if they've cleverly avoided it or it doesn't fit the story. If the story calls for more than five encounters, go ahead! Avoid encounters that are trivial, frustratingly difficult, or repetitive."
    },
    {
      "name": "Easy (< 50%)",
      "text": "If the monsters' total levels are less than half of the heroes', this is an easy encounter. Heroes will lose minimal HP and resources — great for testing new abilities, gauging progress, or whittling down resources. They help players feel powerful, especially after leveling up. Use 1–2 easy encounters in a typical session."
    },
    {
      "name": "Medium (~75%)",
      "text": "When the monsters' levels are around 75% of the heroes', expect some HP loss and moderate resource expenditure. Heroes will get hurt but shouldn't drop to 0 HP. Use 1–2 medium encounters in a typical session."
    },
    {
      "name": "Hard (100%)",
      "text": "When the monsters' levels equal the heroes', this encounter will be challenging but fair. Heroes must use significant resources; some may drop to 0 HP, but none should die, barring poor tactics or bad luck. Use 1 hard encounter in a typical session."
    },
    {
      "name": "Deadly (100–125%)",
      "text": "When monster levels are 100–125% of the heroes', this encounter requires strategic thinking and teamwork. Suitable for tough battles, well-equipped parties, or campaign bosses. Use sparingly!"
    },
    {
      "name": "Very Deadly (150%+)",
      "text": "At 150%+ monster levels, this encounter is extremely dangerous. Unless they are extremely well optimized (or are multiclassing) and play exquisitely, they will almost certainly need to retreat — or die. Use only when the heroes made a bad mistake: you telegraphed danger and they failed to heed."
    },
    {
      "name": "Resting and Recovery",
      "text": "It's common for heroes to return to a home base or town to rest after each session, but this isn't a rule. If your players are accumulating too many Wounds, consider introducing an opportunity for a Safe Rest, such as a friendly cleric or a hidden oasis. If a Safe Rest isn't an option, you can ease the encounter difficulty to keep the adventure moving."
    },
    {
      "name": "Armor Variety",
      "text": "Too many armored foes can bog down combat. Use armor to add flavor, not frustration. For a balanced session, aim for roughly: 60% Unarmored, 30% Medium Armor, 10% Heavy Armor."
    },
    {
      "name": "Fine Tuning: Start Easy",
      "text": "It's better to err on the side of \"too easy\" than \"too hard.\" As a GM, you have many ways to increase difficulty during play, but few ways to lower it without breaking immersion. (p.26)"
    },
    {
      "name": "Balancing With Tactics",
      "text": "Focus Fire: concentrating attacks on one or two heroes makes encounters feel harder; spreading out damage or sending monsters in waves makes them more manageable. Movement: monsters that move each turn force martial characters to reposition (and open up Opportunity Attacks); reduce monster movement to lower difficulty. Target Squishy Characters: make them use their actions to defend or run away and hide; let the tanks feel good about Defending and Interposing. Adjust Initiative: the sooner the monsters act in the round, the harder the encounter — if the bad guys are in for a trouncing, move some of them up in the initiative order. Relax! Heroes have plenty of tools to handle tough situations. Hero Death Isn't the End: encourage your group to make new characters and dive back in."
    },
    {
      "name": "Balancing with Minions",
      "text": "Minions excel as battlefield filler, allowing heroes to showcase their strengths. Armored defenders can hold off waves of attacks, while spellcasters can annihilate groups with a single spell. Waves of Minions: start with an easier encounter and introduce minions in waves (emerging from hidden positions or summoned mid-battle). 1 minion/hero: slightly more difficult, but greatly increases tactical options. 2–3 minions/hero: noticeably more difficult. 4 minions/hero: much more challenging."
    },
    {
      "name": "Overkill Damage (Minions)",
      "text": "While minions lack HP, you can optionally use their die size as a measure of durability. Excess damage from an attack can carry over to other minions in range. For example, a 20 damage attack could take down two d10 minions or five d4 minions."
    },
    {
      "name": "Minion Die Size by Party Level",
      "text": "Level 1–3: d4. Level 3–5: d6. Level 5–10: d8. Level 10–13: d10. Level 13–17: d12. Level 17–20: d20."
    },
    {
      "name": "Unique Encounters",
      "text": "Most encounters start with heroes and bad guys aware of each other, within one or two moves apart, and feature 1–4 level-appropriate enemies per hero who fight to the death. Changing it up from time to time can make for a more memorable encounter. Dessert, not main course: use these sparingly — there should still be baseline \"typical\" encounters more frequently. (pp.27–28)"
    },
    {
      "name": "Unique: Ambush (Bad Guys)!",
      "text": "An easy encounter becomes much more difficult and exciting when the bad guys get the drop on the heroes. Place hidden enemies close to the party, and let them act first (be careful there is a good story reason for the ambush or give them a chance to spot it!)."
    },
    {
      "name": "Unique: Ambush (Heroes)!",
      "text": "An extremely hard encounter, but the heroes get plenty of time to scout, research weaknesses, set up traps and obstacles, or even choose the battleground (on top of getting a full turn to act before the bad guys can act)."
    },
    {
      "name": "Unique: Backdraft",
      "text": "Heroes take damage whenever they take a certain action (e.g., cast spells, use weapons, move, or use special abilities)."
    },
    {
      "name": "Unique: Betrayal!",
      "text": "Have an allied NPC suddenly turn on the heroes mid-fight (temporarily or permanently)."
    },
    {
      "name": "Unique: Can't Reach Me!",
      "text": "A relatively weak group of bad guys are at an unfairly advantageous height, able to drop heavy things onto the heroes, or out of range of melee attacks and with excellent cover against range."
    },
    {
      "name": "Unique: Capture the Flag",
      "text": "The heroes must take (and keep) possession of an item that the bad guys desperately want."
    },
    {
      "name": "Unique: Charmed Allies",
      "text": "Enemies cast powerful charms or illusions on one or more party members, forcing the heroes to fight their own while trying to break the spell."
    },
    {
      "name": "Unique: Defend the Fort",
      "text": "Heroes must defend a location for a certain number of rounds until reinforcements arrive."
    },
    {
      "name": "Unique: Divided Loyalties",
      "text": "Two enemy factions are fighting each other when the heroes arrive. The party can sit back and let the factions weaken each other, manipulate the chaos to their advantage, or attack both sides."
    },
    {
      "name": "Unique: Environmental Ally",
      "text": "Heroes gain an advantage from the environment, a rampaging beast, a structure collapsing, or a natural disaster to help turn the tide. Properly foreshadow what is coming and allow them to set up a cool moment, otherwise they can feel cheated."
    },
    {
      "name": "Unique: Environmental Catastrophe",
      "text": "The environment itself is the main challenge: rivers of lava, throwable explosive mushrooms, collapsing caves, a sinking ship."
    },
    {
      "name": "Unique: Enraged Baddies",
      "text": "Each time something happens (a bad guy takes damage, they lose an ally, etc.) their damage increases."
    },
    {
      "name": "Unique: Ethereal Enemies",
      "text": "The bad guys are ghosts, shadows, or other ethereal beings that phase in and out of the material plane. They're immune to damage during certain phases, forcing the heroes to adapt their timing and tactics."
    },
    {
      "name": "Unique: Grudge Match",
      "text": "An otherwise easy encounter but all of the bad guys ONLY attack one hero (a bounty, an offended warlord, a curse?). Make sure your players know ahead of time so it doesn't feel unfair; they will have to greatly change up their typical tactics."
    },
    {
      "name": "Unique: Illusory Enemies",
      "text": "Bad guys that create illusions, making attacks miss more often, or that can redirect attacks against allies. Special care must be taken to see through the illusions and hit the right targets."
    },
    {
      "name": "Unique: Impending Doom",
      "text": "An encounter that would otherwise be far too difficult, but the heroes get an extra round or two before the enemies can properly engage: enemies with no ranged attacks starting very far away, enemies that need to wake up or \"charge up\" before acting."
    },
    {
      "name": "Unique: Interlopers",
      "text": "Another faction arrives while the heroes are already engaged in combat. The bad guys ask for assistance — the heroes could fight both sides or convince the newcomers to join their side instead."
    },
    {
      "name": "Unique: Manastorm",
      "text": "All spells have a reduced mana cost, even as low as 0 mana. Casting spells may damage the caster instead (e.g., 1d6/mana spent)."
    },
    {
      "name": "Unique: Mid-air Combat",
      "text": "Enemies that fly, heroes that don't is a great classic — particularly when the bad guys can pluck the heroes off the ground, fly high, and let gravity do the rest. Alternatively, give heroes flight and let them strafe and pick off the bad guys."
    },
    {
      "name": "Unique: Mounted Combat",
      "text": "Heroes fight while mounted on beasts that are running, climbing, flying, or swimming!"
    },
    {
      "name": "Unique: Moving Hazard",
      "text": "Heroes fight on a collapsing bridge, in a building that is burning down, or on a battlefield under attack by siege weapons. Heroes have to continually move — or die!"
    },
    {
      "name": "Unique: Non-combatants",
      "text": "Bad guys interspersed with innocent bystanders or other precious resources that must not be harmed."
    },
    {
      "name": "Unique: Oops, All Minions!",
      "text": "Heroes can face a TREMENDOUS amount of minions. This shines when heroes have access to AoE abilities and rewards players who position themselves strategically."
    },
    {
      "name": "Unique: Pitch Black",
      "text": "Monsters attack in the dark, heroes can't see, any light sources are magically snuffed out. Cannot Interpose or Defend against unseen attacks."
    },
    {
      "name": "Unique: Poor Tactics (Dumb Enemies)",
      "text": "A very hard encounter, but the enemies do their best to spread damage out equally across the heroes and otherwise make obvious tactical blunders."
    },
    {
      "name": "Unique: Push 'em Off!",
      "text": "Battle at very great heights; the most efficient way to win (or lose) is to push others off the edge, or where forced movement is otherwise greatly incentivized."
    },
    {
      "name": "Unique: Puzzle Combat",
      "text": "A puzzle that must be solved mid-fight: enemies that are invulnerable while standing in a certain place, or until a device is turned off or destroyed, or a ritual is disrupted."
    },
    {
      "name": "Unique: Reinforce!",
      "text": "Enemies run away for reinforcements when bloodied or half of their numbers are taken down."
    },
    {
      "name": "Unique: Split the Party!",
      "text": "Physically split the party in an interesting way: melee heroes on one side, ranged heroes on the other; make them fight in ways they normally don't."
    },
    {
      "name": "Unique: Stealthy Take Down",
      "text": "Loud noises attract more enemies!"
    },
    {
      "name": "Unique: Thorns",
      "text": "Enemies have very few HP; any overkill damage is dealt back at the heroes."
    },
    {
      "name": "Unique: Tight Quarters",
      "text": "Unusually small room/platform, or a location crowded with obstacles."
    },
    {
      "name": "Unique: Traps Abound!",
      "text": "A location filled with traps and environmental hazards that can be used against the heroes or bad guys."
    },
    {
      "name": "Unique: Turncoats",
      "text": "Bad guys (honestly or dishonestly) negotiate to aid the heroes against a common foe or threat."
    },
    {
      "name": "Unique: Vehicular Combat",
      "text": "Heroes fight bad guys while piloting a vehicle traveling at speed."
    },
    {
      "name": "Unique: Waves Upon Waves",
      "text": "Heroes can face FAR more bad guys if they appear over time rather than all at once. Add more enemies each round and watch your heroes rack up the kills! Have a good reason for the baddies to show up over time (summoning portals, spread throughout a hideout, an arena challenge)."
    },
    {
      "name": "Unique: We Give Up!",
      "text": "Enemies who give up and run away once their numbers are fewer than the heroes (they may or may not return during the next encounter)."
    },
    {
      "name": "Monster Builder",
      "text": "Use the Monster Builder table for your monster's stats; you can also mix and match stats from different levels. For each special ability added (e.g. the Kobold's \"Noooo!\"), lower the HP or damage 1 step or treat the monster as 1 step stronger. Example: for a glass cannon (mage or assassin), use damage from 1–5 rows higher and HP from an equal number of rows lower — a level 5 mage might have 34 HP and deal 26 damage per round; give it a teleport and it's as strong as a level 6 monster. For a tanky creature, lower the damage and increase the HP/Armor. Columns: HP (No Armor / M Armor / H Armor), Damage per round, Attack sample dice, Save DC, CR equivalent. (p.29)"
    },
    {
      "name": "Monster Level 1/4",
      "text": "HP 12 (no armor) / 9 (M) / 7 (H). Damage per round 3. Attack sample dice 1d4+1. Save DC 9. CR equiv. 1/8."
    },
    {
      "name": "Monster Level 1/3",
      "text": "HP 15 (no armor) / 11 (M) / 8 (H). Damage per round 5. Attack sample dice 1d6+2. Save DC 9. CR equiv. 1/4."
    },
    {
      "name": "Monster Level 1/2",
      "text": "HP 18 (no armor) / 15 (M) / 11 (H). Damage per round 7. Attack sample dice 1d6+3. Save DC 10. CR equiv. 1/4."
    },
    {
      "name": "Monster Level 1",
      "text": "HP 26 (no armor) / 20 (M) / 16 (H). Damage per round 11. Attack sample dice 2d8+2 or (2×) 1d8+1. Save DC 10. CR equiv. 1/2."
    },
    {
      "name": "Monster Level 2",
      "text": "HP 34 (no armor) / 27 (M) / 20 (H). Damage per round 13. Attack sample dice 2d8+4 or (2×) 1d8+3. Save DC 11. CR equiv. 1."
    },
    {
      "name": "Monster Level 3",
      "text": "HP 41 (no armor) / 33 (M) / 25 (H). Damage per round 15. Attack sample dice 2d8+6 or (2×) 1d8+4. Save DC 11. CR equiv. 1."
    },
    {
      "name": "Monster Level 4",
      "text": "HP 49 (no armor) / 39 (M) / 29 (H). Damage per round 18. Attack sample dice 2d8+9 or (2×) 1d8+5. Save DC 12. CR equiv. 2."
    },
    {
      "name": "Monster Level 5",
      "text": "HP 58 (no armor) / 46 (M) / 35 (H). Damage per round 19. Attack sample dice 2d8+10 or (2×) 1d8+6. Save DC 12. CR equiv. 2."
    },
    {
      "name": "Monster Level 6",
      "text": "HP 68 (no armor) / 54 (M) / 41 (H). Damage per round 21. Attack sample dice 2d8+12 or (2×) 1d8+7. Save DC 13. CR equiv. 3."
    },
    {
      "name": "Monster Level 7",
      "text": "HP 79 (no armor) / 63 (M) / 47 (H). Damage per round 24. Attack sample dice 3d8+10 or (2×) 2d8+4. Save DC 13. CR equiv. 3."
    },
    {
      "name": "Monster Level 8",
      "text": "HP 91 (no armor) / 73 (M) / 55 (H). Damage per round 26. Attack sample dice 3d8+12 or (2×) 2d8+5. Save DC 14. CR equiv. 4."
    },
    {
      "name": "Monster Level 9",
      "text": "HP 104 (no armor) / 83 (M) / 62 (H). Damage per round 28. Attack sample dice 4d8+10 or (2×) 2d8+6. Save DC 14. CR equiv. 4."
    },
    {
      "name": "Monster Level 10",
      "text": "HP 118 (no armor) / 94 (M) / 71 (H). Damage per round 30. Attack sample dice 4d8+12 or (2×) 2d8+7. Save DC 15. CR equiv. 5."
    },
    {
      "name": "Monster Level 11",
      "text": "HP 133 (no armor) / 106 (M) / 80 (H). Damage per round 33. Attack sample dice 5d8+11 or (2×) 3d8+3. Save DC 15. CR equiv. 6."
    },
    {
      "name": "Monster Level 12",
      "text": "HP 149 (no armor) / 119 (M) / 89 (H). Damage per round 35. Attack sample dice 5d8+13 or (2×) 3d8+4. Save DC 16. CR equiv. 7."
    },
    {
      "name": "Monster Level 13",
      "text": "HP 166 (no armor) / 132 (M) / 100 (H). Damage per round 38. Attack sample dice 6d8+11 or (2×) 3d8+6. Save DC 16. CR equiv. 8."
    },
    {
      "name": "Monster Level 14",
      "text": "HP 184 (no armor) / 147 (M) / 110 (H). Damage per round 40. Attack sample dice 6d8+13 or (2×) 3d8+7. Save DC 17. CR equiv. 9."
    },
    {
      "name": "Monster Level 15",
      "text": "HP 203 (no armor) / 162 (M) / 122 (H). Damage per round 43. Attack sample dice 7d8+11 or (2×) 3d8+8. Save DC 17. CR equiv. 9."
    },
    {
      "name": "Monster Level 16",
      "text": "HP 223 (no armor) / 178 (M) / 134 (H). Damage per round 45. Attack sample dice 7d8+13 or (2×) 4d8+5. Save DC 18. CR equiv. 10."
    },
    {
      "name": "Monster Level 17",
      "text": "HP 244 (no armor) / 195 (M) / 146 (H). Damage per round 48. Attack sample dice 8d8+12 or (2×) 4d8+6. Save DC 18. CR equiv. 11."
    },
    {
      "name": "Monster Level 18",
      "text": "HP 266 (no armor) / 213 (M) / 160 (H). Damage per round 50. Attack sample dice 8d8+14 or (2×) 4d8+7. Save DC 19. CR equiv. 12."
    },
    {
      "name": "Monster Level 19",
      "text": "HP 289 (no armor) / 231 (M) / 173 (H). Damage per round 52. Attack sample dice 9d8+12 or (2×) 4d8+8. Save DC 19. CR equiv. 13."
    },
    {
      "name": "Monster Level 20",
      "text": "HP 313 (no armor) / 250 (M) / 189 (H). Damage per round 54. Attack sample dice 9d8+13 or (2×) 4d8+9. Save DC 20. CR equiv. 14."
    },
    {
      "name": "Monster Die Size",
      "text": "Default to d8 for custom monsters — it offers a balanced chance of hitting, missing, and critting. Any die size is fine as long as overall damage per round stays consistent. d4: Undead (slow, with BIG bonus damage). d6: Goblins (small, chaotic, likely to miss or crit). d8: Humans (balanced and reliable attackers). d10: Beasts (stronger than humans). d12: Giants (superhumanly strong/accurate). d20: The mightiest creatures (massive damage)."
    },
    {
      "name": "Flavorful Monster Abilities",
      "text": "Once you have the base stats, you can optionally add a cool flavorful ability to make monsters feel and play differently. Abilities can be passive or trigger \"On Movement,\" \"On Attack,\" \"On Miss,\" \"On Hit,\" \"On Damage,\" \"On Crit,\" \"On Death,\" and more. (p.30)"
    },
    {
      "name": "Ability: Acid Blood",
      "text": "Melee attackers take half the HP lost in return as acid damage."
    },
    {
      "name": "Ability: Aggressive",
      "text": "+X speed if moving toward enemies."
    },
    {
      "name": "Ability: Blinding Spit",
      "text": "Spits a blinding substance at a target within range. The target must make a save or be blinded for 1 round."
    },
    {
      "name": "Ability: Bloodthirsty",
      "text": "Has advantage on attacks against Bloodied targets."
    },
    {
      "name": "Ability: Brute",
      "text": "Attacks also knockback a number of spaces equal to the primary die rolled."
    },
    {
      "name": "Ability: Brawler",
      "text": "Extra damage, can only attack in melee."
    },
    {
      "name": "Ability: Burning Aura",
      "text": "Creatures that start their turn adjacent to this monster take 1d6 fire damage."
    },
    {
      "name": "Ability: Climbing",
      "text": "Can traverse walls or ceilings normally."
    },
    {
      "name": "Ability: Controlling",
      "text": "Creates/immune to difficult terrain."
    },
    {
      "name": "Ability: Disgusting/Venomous/Heavy Blows",
      "text": "Attacks also Daze the target."
    },
    {
      "name": "Ability: Disintegrating Armor",
      "text": "Starts with Heavy Armor, on crit degrades to Medium, then to none."
    },
    {
      "name": "Ability: Doom",
      "text": "Attacks also Wound the target."
    },
    {
      "name": "Ability: Explosive Death",
      "text": "Explode on death, dealing 2d6 damage to creatures within reach."
    },
    {
      "name": "Ability: FAST",
      "text": "Reaction: 1/round. Force a reroll with disadvantage on an attack."
    },
    {
      "name": "Ability: Fearsome",
      "text": "Frighten enemies within Range on a failed WIL save. 1/encounter."
    },
    {
      "name": "Ability: Flying",
      "text": "Flying speed and immune to Opportunity Attacks. May FALL when crit (1d6 damage/10 ft. fallen, and lands Prone)."
    },
    {
      "name": "Ability: Formation",
      "text": "Armor increases 1 step for each adjacent ally (None, Med, Heavy)."
    },
    {
      "name": "Ability: Frenzied",
      "text": "Deals extra damage or has faster speed while damaged."
    },
    {
      "name": "Ability: Grappler",
      "text": "On hit: Grapples."
    },
    {
      "name": "Ability: Gravity Manipulator",
      "text": "Can pull or push enemies within reach."
    },
    {
      "name": "Ability: Hates the Light",
      "text": "Attacks the hero holding light."
    },
    {
      "name": "Ability: Hypnotic Gaze",
      "text": "Forces enemies to make a WIL save or be confused for 1 round."
    },
    {
      "name": "Ability: Invulnerable",
      "text": "Immune to damage until crit."
    },
    {
      "name": "Ability: Mounted",
      "text": "Faster movement and deals extra damage after moving toward an enemy."
    },
    {
      "name": "Ability: Obstinate",
      "text": "When attacking a target with disadvantage, treat the roll as if it had advantage instead."
    },
    {
      "name": "Ability: Pack Tactics",
      "text": "Advantage on attacks when an ally is adjacent to the target."
    },
    {
      "name": "Ability: Parry",
      "text": "Attacks against them miss on a 1 and 2."
    },
    {
      "name": "Ability: Ranged",
      "text": "Extra damage; can only attack at range."
    },
    {
      "name": "Ability: Retaliate",
      "text": "Attacks the first creature who attacks them in melee each round."
    },
    {
      "name": "Ability: Savage",
      "text": "Always crits Grappled creatures."
    },
    {
      "name": "Ability: Shifty",
      "text": "Can move after being attacked."
    },
    {
      "name": "Ability: Silencer",
      "text": "Attacks silence enemies (making them unable to cast spells or perform other actions that require the voice)."
    },
    {
      "name": "Ability: Sneak",
      "text": "Invisible until they attack."
    },
    {
      "name": "Ability: Spiked",
      "text": "When hit by a melee attack, the attacker takes 1d4 piercing damage in return."
    },
    {
      "name": "Ability: Standard Bearer",
      "text": "Buffs nearby allies, reducing the damage they take or increasing the damage they do (see Kobold Clanger or Doomsayer Cultist)."
    },
    {
      "name": "Ability: Sturdy/Undying",
      "text": "The first time the monster would die, they have 1 HP instead."
    },
    {
      "name": "Ability: Summoner",
      "text": "Calls minions to their aid each round."
    },
    {
      "name": "Ability: Tricky",
      "text": "Can swap places with allies or enemies."
    },
    {
      "name": "Ability: Vicious",
      "text": "Crits are Vicious (roll 1 additional die)."
    },
    {
      "name": "Ability: Warping Touch",
      "text": "On hit: teleport target X spaces."
    },
    {
      "name": "Ability: Webslinger",
      "text": "Can immobilize a target with webs when hit or crit."
    },
    {
      "name": "Legendary Monster Builder",
      "text": "Legendary monsters are balanced to last long enough for heroes to each get a chance to do something cool, and short enough to not drag on (roughly 15 hero turns to get to the Last Stand, then 2–4 additional turns). They typically have 2 actions to choose from: one that allows them to move (or has other utility) and deals a small amount of damage, and another that deals big damage if they're already in position. A good legendary monster feels almost puzzle-like, encouraging heroes to think differently, move, and use teamwork. Unlike normal encounters, the numbers are based off the Party Level and stay the same regardless of the number of heroes. For an easier encounter use the stats 1 or 2 levels lower; more challenging, 1 or 2 levels higher. Legendary monsters typically have at least Medium armor; if unarmored make sure they have some other defensive ability. (p.43)"
    },
    {
      "name": "Legendary Party Level 1",
      "text": "HP 50 (Med Armor) / 35 (Hev Armor). Last Stand 10. Save DC 10. Attack damage small 8 / big 16."
    },
    {
      "name": "Legendary Party Level 2",
      "text": "HP 75 (Med Armor) / 55 (Hev Armor). Last Stand 20. Save DC 11. Attack damage small 9 / big 18."
    },
    {
      "name": "Legendary Party Level 3",
      "text": "HP 100 (Med Armor) / 75 (Hev Armor). Last Stand 30. Save DC 11. Attack damage small 10 / big 20."
    },
    {
      "name": "Legendary Party Level 4",
      "text": "HP 125 (Med Armor) / 95 (Hev Armor). Last Stand 40. Save DC 12. Attack damage small 11 / big 22."
    },
    {
      "name": "Legendary Party Level 5",
      "text": "HP 150 (Med Armor) / 115 (Hev Armor). Last Stand 50. Save DC 12. Attack damage small 12 / big 24."
    },
    {
      "name": "Legendary Party Level 6",
      "text": "HP 175 (Med Armor) / 135 (Hev Armor). Last Stand 60. Save DC 13. Attack damage small 13 / big 26."
    },
    {
      "name": "Legendary Party Level 7",
      "text": "HP 200 (Med Armor) / 155 (Hev Armor). Last Stand 70. Save DC 13. Attack damage small 14 / big 28."
    },
    {
      "name": "Legendary Party Level 8",
      "text": "HP 225 (Med Armor) / 175 (Hev Armor). Last Stand 80. Save DC 14. Attack damage small 15 / big 30."
    },
    {
      "name": "Legendary Party Level 9",
      "text": "HP 250 (Med Armor) / 195 (Hev Armor). Last Stand 90. Save DC 14. Attack damage small 16 / big 32."
    },
    {
      "name": "Legendary Party Level 10",
      "text": "HP 275 (Med Armor) / 215 (Hev Armor). Last Stand 100. Save DC 15. Attack damage small 17 / big 34."
    },
    {
      "name": "Legendary Party Level 11",
      "text": "HP 300 (Med Armor) / 235 (Hev Armor). Last Stand 110. Save DC 15. Attack damage small 18 / big 36."
    },
    {
      "name": "Legendary Party Level 12",
      "text": "HP 325 (Med Armor) / 255 (Hev Armor). Last Stand 120. Save DC 16. Attack damage small 19 / big 38."
    },
    {
      "name": "Legendary Party Level 13",
      "text": "HP 350 (Med Armor) / 275 (Hev Armor). Last Stand 130. Save DC 16. Attack damage small 20 / big 40."
    },
    {
      "name": "Legendary Party Level 14",
      "text": "HP 375 (Med Armor) / 295 (Hev Armor). Last Stand 140. Save DC 17. Attack damage small 21 / big 42."
    },
    {
      "name": "Legendary Party Level 15",
      "text": "HP 400 (Med Armor) / 315 (Hev Armor). Last Stand 150. Save DC 17. Attack damage small 22 / big 44."
    },
    {
      "name": "Legendary Party Level 16",
      "text": "HP 425 (Med Armor) / 335 (Hev Armor). Last Stand 160. Save DC 18. Attack damage small 23 / big 46."
    },
    {
      "name": "Legendary Party Level 17",
      "text": "HP 450 (Med Armor) / 355 (Hev Armor). Last Stand 170. Save DC 18. Attack damage small 24 / big 48."
    },
    {
      "name": "Legendary Party Level 18",
      "text": "HP 475 (Med Armor) / 375 (Hev Armor). Last Stand 180. Save DC 19. Attack damage small 25 / big 50."
    },
    {
      "name": "Legendary Party Level 19",
      "text": "HP 500 (Med Armor) / 395 (Hev Armor). Last Stand 190. Save DC 19. Attack damage small 26 / big 52."
    },
    {
      "name": "Legendary Party Level 20",
      "text": "HP 525 (Med Armor) / 415 (Hev Armor). Last Stand 200. Save DC 20. Attack damage small 27 / big 54."
    }
  ]
};
