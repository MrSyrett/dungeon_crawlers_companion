// GENERATED FILE - do not edit by hand.
// Source: data/icrpg/parts/*.json - regenerate with: node scripts/build-icrpg-data.mjs

import type { IcrpgRule } from "./icrpg-types";

export const ICRPG_RULES: IcrpgRule[] = [
  {
    "title": "The Target",
    "text": "In one scene there is a single all-powerful number, the TARGET, and every roll must meet or beat it to succeed. The TARGET is usually somewhere between 10 and 18."
  },
  {
    "title": "Rolling to Succeed",
    "text": "Roll a D20, add the value of one relevant STAT, and meet or beat the TARGET. This simple process covers about 90% of all rolls in ICRPG."
  },
  {
    "title": "Hard & Easy",
    "text": "A HARD roll must meet or beat the TARGET +3 (for extraordinary or pushed actions), while an EASY roll only needs the TARGET -3 (when using helpful tools, being assisted, or retrying a failed action)."
  },
  {
    "title": "Simple Actions, Checks & Attempts",
    "text": "SIMPLE ACTIONS succeed automatically with no roll. CHECKS resolve an instant uncertain action with a single D20 roll. ATTEMPTS are larger tasks: succeed on the D20, then roll EFFORT to complete the task or destroy the foe."
  },
  {
    "title": "Roll for Effort",
    "text": "After a successful ATTEMPT, roll EFFORT to measure progress toward finishing a task or destroying an enemy. EFFORT covers all outcomes, not just damage, using die types by category: BASIC d4, WEAPONS & TOOLS d6, GUNS d8, MAGIC & ENERGY d10, ULTIMATE d12."
  },
  {
    "title": "Hearts & HP",
    "text": "HEARTS show how much EFFORT or damage something can take; one HEART equals 10 points. All characters start with 1 HEART (10 HP) and can gain more as they grow."
  },
  {
    "title": "Three Kinds of Turns",
    "text": "Each TURN takes one of three forms: ACTION ONLY (stay put and roll), MOVE NEAR + ACTION (move a bit then roll), or MOVE FAR (spend the whole TURN moving twice as far as normal)."
  },
  {
    "title": "Movement & Distance",
    "text": "Distances are CLOSE (arm's reach, no move needed), NEAR (a few steps, movable in a TURN with time left to act), FAR (takes the whole TURN to reach), or OUT OF RANGE (unreachable this TURN, beyond your effects and your allies' help)."
  },
  {
    "title": "Time: Turn, Round, Freeform",
    "text": "A TURN is 10-20 seconds of one player's action. A ROUND is when everyone (including the GM) has taken a TURN, used to measure lasting effects and countdowns. FREEFORM covers longer stretches where TURNS and exact measurement are relaxed."
  },
  {
    "title": "Who Goes First",
    "text": "When a new action scene begins, everyone at the table rolls a D20. The highest roll goes first, then play proceeds clockwise."
  },
  {
    "title": "Reaching 0 HP & Dying",
    "text": "At 0 HP you drop unconscious, all your effects vanish, and you begin bleeding out. On your next TURN roll a D4 for how many ROUNDS you have before you die without help or a MIRACLE."
  },
  {
    "title": "It's a Miracle",
    "text": "On each TURN while DYING, roll a D20; a natural 20 brings you back to consciousness with 1 HP. If all DYING ROUNDS pass with no help and no MIRACLE, your character is dead for real. Taking damage to -20 HP in one instant means you are BLOWN TO BITS."
  },
  {
    "title": "Recovery",
    "text": "Sacrifice a TURN to RECOVER: roll D20 + CON against the TARGET to instantly regain CON + 1 HP. An ally can heal you with magic (D10) or medical tools like bandages (D6)."
  },
  {
    "title": "Stabilize a Dying Ally",
    "text": "If an ally reaches an unconscious, bleeding-out character and makes a successful INT or WIS roll on the current TARGET, the DYING timer stops and the character becomes stable but unconscious."
  },
  {
    "title": "The Hero Coin",
    "text": "The GM grants a HERO COIN for inventive, sincere role-play. You may hold only one at a time; turn it in to re-roll any die or to add a D12 onto any roll, and you may give it to another player at any time."
  },
  {
    "title": "Calculating Defense",
    "text": "DEFENSE equals your CON plus all DEF gained from LOOT such as armor, and can never exceed +10 no matter the total. Roll D20 + DEFENSE against the TARGET to resist danger; enemy ATTEMPTS against you must meet or beat 10 + your DEFENSE."
  },
  {
    "title": "Assign Stats & Effort",
    "text": "Start by spending 6 STAT POINTS in any array across the 6 core STATS, then allot 4 POINTS across EFFORT types to represent training. No STAT may ever exceed +10."
  },
  {
    "title": "Loot Basics",
    "text": "Most of a character's power and progression comes from LOOT, which can be found, awarded, traded, or destroyed; even SPELLS are kept on scrolls. Inventory is limited to 10 CARRIED and 10 EQUIPPED items, and CARRIED items must be EQUIPPED to give benefit."
  },
  {
    "title": "Mastery",
    "text": "Each time you roll a natural 20, mark one MASTERY point; at 20 points you clear them and choose any MASTERY ABILITY for your TYPE (gaining its STARTING LOOT if required). This can be done 3 times per character, for 60 natural 20s in all."
  },
  {
    "title": "Progression: Milestone Rewards",
    "text": "Characters grow through MILESTONE REWARDS granted at key story moments rather than by earning XP. REWARDS can be chosen freely, purchased with COIN, or drawn from MILESTONE PATHS whose TIERs unlock as you earn REWARDS."
  },
  {
    "title": "Milestone Paths & Tiers",
    "text": "A MILESTONE PATH is a series of REWARDS earned across TIERS; to access a TIER you must first earn at least two REWARDS from the previous TIER. PATH REWARDS are bound to you and cannot be traded, and players may switch or mix PATHS freely."
  }
];
