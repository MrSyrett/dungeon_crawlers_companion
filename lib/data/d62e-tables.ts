// GENERATED FILE - do not edit by hand.
// Source: data/d62e/parts/*.json - regenerate with: node scripts/build-d62e-data.mjs

import type { D62eTables } from "./d62e-types";

export const D62E_TABLES = {
  "difficulties": [
    {
      "name": "Very Easy",
      "range": "5",
      "text": "Difficulty Number 5."
    },
    {
      "name": "Easy",
      "range": "10",
      "text": "Difficulty Number 10."
    },
    {
      "name": "Average",
      "range": "15",
      "text": "Difficulty Number 15."
    },
    {
      "name": "Difficult",
      "range": "20",
      "text": "Difficulty Number 20."
    },
    {
      "name": "Very Difficult",
      "range": "25",
      "text": "Difficulty Number 25."
    },
    {
      "name": "Extremely Difficult",
      "range": "30",
      "text": "Difficulty Number 30."
    },
    {
      "name": "Near Impossible",
      "range": "35",
      "text": "Difficulty Number 35."
    },
    {
      "name": "Mythical",
      "range": "40",
      "text": "Difficulty Number 40."
    }
  ],
  "woundLevels": [
    {
      "name": "Staggered",
      "text": "-1D penalty on all die codes rolled (not Brawn rolls to resist damage). Goes away at the start of the next round. Being staggered again while staggered makes you stunned instead."
    },
    {
      "name": "Stunned",
      "text": "Can't do anything for the rest of the combat round. Goes away at the start of the next round. A Hero Point can be spent to avoid being stunned."
    },
    {
      "name": "Wounded",
      "text": "Fall prone and can't do anything for the rest of this round. All skill and attribute checks are reduced by 1D (not Brawn rolls to resist damage). Goes away after medical treatment or 24 hours' rest. A wounded character wounded again is incapacitated."
    },
    {
      "name": "Incapacitated",
      "text": "Fall prone and unconscious; can't do anything until healed. Goes away after 24 hours or medical treatment. An incapacitated character wounded again is mortally wounded."
    },
    {
      "name": "Mortally Wounded",
      "text": "Fall prone and unconscious; can't do anything until healed. At the end of every combat round, roll 2D; if the total is less than the number of rounds since being mortally wounded, the character dies. Only goes away after medical treatment."
    }
  ],
  "damageResults": [
    {
      "range": "Brawn Roll greater than Damage Roll",
      "text": "Staggered."
    },
    {
      "range": "Brawn Roll equal to or less than Damage Roll",
      "text": "Wounded."
    },
    {
      "range": "Brawn Roll equal to or less than Damage Roll, and Damage Roll invoked a Complication",
      "text": "Mortally Wounded."
    }
  ],
  "combatModifiers": [
    {
      "name": "Preparing",
      "text": "Spend a round doing nothing to aim/prepare: +1D to the skill roll next round (only when using a single skill)."
    },
    {
      "name": "Running",
      "text": "-1D to any skill rolls made in a round the character runs."
    },
    {
      "name": "Wounded",
      "text": "-1D to skill and attribute checks while wounded."
    },
    {
      "name": "Staggered",
      "text": "-1D to all die codes rolled while staggered."
    },
    {
      "name": "Extra action segment",
      "text": "Each action segment after the first applies -1D to any die codes used during that combat round (multiple skill uses stack)."
    },
    {
      "name": "Prone vs. melee",
      "text": "A prone character has a maximum Dodge and Parry of 10 against melee attacks."
    },
    {
      "name": "Prone vs. ranged",
      "text": "A prone character adds +10 to their Dodge score against ranged attacks."
    },
    {
      "name": "Crawling",
      "text": "A crawling (prone) character's die code is reduced by 1D, like a running character."
    }
  ],
  "creation": {
    "attributeDice": "12D (1D-5D each)",
    "skillDice": "7D (max 2D/skill at creation)",
    "heroPoints": 1,
    "dodge": "5 x Perception dice",
    "parry": "5 x Agility dice",
    "note": "Add +3D attribute dice for each additional attribute over four; add +2D skill dice per optional skill module the GM uses. Dice are assigned one-for-one; each attribute must be at least 1D and no higher than 5D at creation."
  },
  "heroPoints": [
    {
      "name": "Double a roll",
      "text": "Spend 1 Hero Point to double the Die Code of a single roll."
    },
    {
      "name": "Reroll",
      "text": "Spend 1 Hero Point to reroll a failed roll without doubling down."
    },
    {
      "name": "Avoid being stunned",
      "text": "Spend 1 Hero Point to avoid being stunned in combat."
    }
  ],
  "quickRules": [
    {
      "title": "The Wild Die",
      "text": "One die in every code is the Wild Die (a different color/size). A 6 grants an Advantage; a 1 causes a Complication. You must always include the Wild Die."
    },
    {
      "title": "Doubling Down",
      "text": "After a failed non-combat action, narrate a retry and reroll the entire die code. Failing the retry gives a Complication but no Hero Point."
    },
    {
      "title": "Opposed Rolls",
      "text": "Both sides roll the same attribute/skill; the higher score wins. On a tie, a PC beats an NPC; between PCs the highest Wild Die wins."
    },
    {
      "title": "Difficulty Numbers",
      "text": "The GM sets a Difficulty Number; a score greater than the DN succeeds. Equal or lower fails."
    },
    {
      "title": "Preparing",
      "text": "Do nothing for one round to gain +1D on next round's roll. Only works when you use a single skill that round."
    },
    {
      "title": "Running",
      "text": "A character who runs in a combat round has all skill rolls reduced by 1D that round. Walking moves 5m, running 10m."
    },
    {
      "title": "Wounds",
      "text": "A wounded character rolls skills and attributes at -1D (never affects Brawn rolls to resist damage)."
    },
    {
      "title": "Multiple Actions",
      "text": "You may use more than one skill in a round; every action segment after the first applies -1D to all die codes used that round."
    },
    {
      "title": "Cancelling Modifiers",
      "text": "Increases and reductions add together; e.g. a wounded character preparing (+1D) cancels the wound's -1D and uses the unmodified code."
    },
    {
      "title": "Defenses",
      "text": "Dodge (5 x Perception dice) resists ranged attacks, surprises, and traps; Parry (5 x Agility dice) blocks melee attacks."
    },
    {
      "title": "Damage",
      "text": "On a hit, roll weapon damage; the target rolls Brawn (plus armor). Brawn beats damage = staggered; Brawn equal/less = wounded; equal/less with a damage Complication = mortally wounded."
    },
    {
      "title": "Prone",
      "text": "Fall prone at the end of movement with no penalty. Prone characters crawl up to 2m/round at -1D, are harder to hit, and can drop prone when struck."
    }
  ]
} as unknown as D62eTables;
