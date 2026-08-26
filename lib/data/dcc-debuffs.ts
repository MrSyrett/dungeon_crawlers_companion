// GENERATED FILE - do not edit by hand.
// Source: data/dcc/debuffs.json - regenerate with: node scripts/build-dcc-data.mjs

import type { DccDebuff } from "./dcc-types";

export const DCC_DEBUFFS: DccDebuff[] = [
  {
    "name": "Blinded",
    "effect": "Sight-based Skill Checks at Disadvantage.",
    "duration": "End of next round.",
    "stackable": false
  },
  {
    "name": "Blood Trail",
    "effect": "1d6+F at end of each round.",
    "duration": "Until cured (bandage or First Aid Check).",
    "stackable": true
  },
  {
    "name": "Burned",
    "effect": "1d10+F Fire at end of each round. As an Action, a DEX Stat Check extinguishes it.",
    "duration": "End of combat or 5 minutes.",
    "stackable": false
  },
  {
    "name": "Drowning",
    "effect": "1d6+F at end of each round.",
    "duration": "Until head is above water.",
    "stackable": false
  },
  {
    "name": "Dying",
    "effect": "At 0% Health Bar. Your CON Mod is how many rounds you have; -1 at end of each round and -1 each time you would take damage. Cannot act, move, speak, or use the HUD.",
    "duration": "Until death or healing to at least 1 Health Bar slot.",
    "stackable": false
  },
  {
    "name": "Enraged",
    "effect": "Only Attack and Move Actions allowed.",
    "duration": "End of 2 rounds / 20 seconds.",
    "stackable": false
  },
  {
    "name": "Fatigued",
    "effect": "-1 to all Checks; Move halved.",
    "duration": "Until the end of a long rest.",
    "stackable": true
  },
  {
    "name": "Held",
    "effect": "No Move Actions or Steps; may still Evade. Attacks against you have Advantage.",
    "duration": "Until released, or escape with a STR-Opposed Escape Artist Check (Unopposed if not physically held).",
    "stackable": false
  },
  {
    "name": "Long-Term Major Injury",
    "effect": "-5 to all Checks.",
    "duration": "Until the end of a full day's rest (30 hours).",
    "stackable": false
  },
  {
    "name": "Long-Term Minor Injury",
    "effect": "-2 to all Checks.",
    "duration": "Until the end of a long rest.",
    "stackable": false
  },
  {
    "name": "Major Injury",
    "effect": "-5 to all Checks. A second Major Injury becomes Long-Term Major.",
    "duration": "Until the end of a long rest.",
    "stackable": false
  },
  {
    "name": "Minor Injury",
    "effect": "-2 to all Checks. A second Minor Injury becomes Long-Term Minor.",
    "duration": "Until the end of a short rest.",
    "stackable": false
  },
  {
    "name": "Muted",
    "effect": "Cannot speak or cast Spells.",
    "duration": "End of combat or 5 minutes.",
    "stackable": false
  },
  {
    "name": "Poisoned",
    "effect": "1d8+F Poison at end of each round.",
    "duration": "Until treated with an antidote.",
    "stackable": true
  },
  {
    "name": "Paralyzed",
    "effect": "No Actions.",
    "duration": "End of next round.",
    "stackable": false
  },
  {
    "name": "Queasy",
    "effect": "Next rolled Action at Disadvantage.",
    "duration": "End of the next Action taken.",
    "stackable": false
  },
  {
    "name": "Sepsis",
    "effect": "Staggered plus 1d10+F Poison at end of each round.",
    "duration": "As Staggered; damage until healed.",
    "stackable": false
  },
  {
    "name": "Shit-Faced",
    "effect": "All Checks at Disadvantage.",
    "duration": "End of 10 minutes.",
    "stackable": false
  },
  {
    "name": "Shocked",
    "effect": "Lose your next Action.",
    "duration": "Once that Action is forfeited.",
    "stackable": false
  },
  {
    "name": "Sore as Shit",
    "effect": "-1 to all rolls.",
    "duration": "End of 1 hour.",
    "stackable": false
  },
  {
    "name": "Staggered",
    "effect": "Next Action can't be Move; if it's an Attack, at Disadvantage; no 10 ft Step with that Action.",
    "duration": "End of the next Action taken.",
    "stackable": false
  },
  {
    "name": "Stiff Legs",
    "effect": "No 10 ft Steps.",
    "duration": "End of combat or 5 minutes.",
    "stackable": false
  },
  {
    "name": "Stunned",
    "effect": "Disadvantage on next Check.",
    "duration": "Once you make a Check.",
    "stackable": false
  },
  {
    "name": "Take Down",
    "effect": "Prone; all Attacks against you have Advantage.",
    "duration": "Use your 10 ft Step to stand.",
    "stackable": false
  },
  {
    "name": "Terrified",
    "effect": "No Move Actions or Steps; all your Attacks at Disadvantage.",
    "duration": "End of next round, or on taking at least 1 Health Bar slot of damage.",
    "stackable": false
  },
  {
    "name": "The Taint",
    "effect": "Cannot be healed.",
    "duration": "End of combat or 5 minutes.",
    "stackable": false
  },
  {
    "name": "Woozy",
    "effect": "Cannot add your DEX Mod to Attack or Evade Checks.",
    "duration": "End of next round.",
    "stackable": false
  }
];
