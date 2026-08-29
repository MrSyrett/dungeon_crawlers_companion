// GENERATED FILE - do not edit by hand.
// Source: data/nimble/parts/*.json - regenerate with: node scripts/build-nimble-data.mjs

import type { NimbleCondition } from "./nimble-types";

export const NIMBLE_CONDITIONS: NimbleCondition[] = [
  {
    "name": "Blinded",
    "text": "Can’t see. Attacks against you have advantage, and your attacks have disadvantage."
  },
  {
    "name": "Bloodied",
    "text": "At half HP or less."
  },
  {
    "name": "Charmed",
    "text": "Sees the charmer as an ally. Charmer has advantage on social interactions with you."
  },
  {
    "name": "Dazed",
    "text": "Heroes: lose 1 action; monsters: can perform one less action on their next turn."
  },
  {
    "name": "Dying",
    "text": "At 0 HP. Taking damage while dying causes 2 Wounds, a crit causes 3 instead. While Dying, actions are limited to 1, Concentration is broken, and attacking/casting spells causes 1 Wound unless you make a DC 10 STR save."
  },
  {
    "name": "Frightened",
    "text": "Disadvantage on rolls when source of fear is nearby; speed halved when moving closer to it."
  },
  {
    "name": "Grappled",
    "text": "Cannot move. Attacks against you have advantage. Forced movement (pushing a grappler away), incapacitation, or spending an action and succeeding on a STR or DEX save can end it."
  },
  {
    "name": "Restrained",
    "text": "Functions like Grappled (cannot move; attacks against you have advantage), but is caused by objects (e.g., chains, rope, roots) and ignores size restrictions. It can also be ended through any logical means, such as picking a lock or cutting/burning rope."
  },
  {
    "name": "Hampered",
    "text": "Any creature with their actions or movement reduced (e.g., Dazed, Slowed, Grappled, Restrained, Prone, Difficult Terrain)."
  },
  {
    "name": "Incapacitated",
    "text": "Can’t do anything. Attacks against you have advantage, and melee attacks that hit, crit. (Paralyzed, Stunned, and Unconscious all mean Incapacitated.)"
  },
  {
    "name": "Invisible",
    "text": "Cannot be seen. Your attacks have advantage, and attacks against you have disadvantage."
  },
  {
    "name": "Petrified",
    "text": "Incapacitated. You have all the benefits and drawbacks of being a rock! Immune to most damage except from large explosions, picks, or similar tools."
  },
  {
    "name": "Poisoned",
    "text": "Disadvantage on rolls."
  },
  {
    "name": "Prone",
    "text": "Movement costs twice as much, and disadvantage on attacks. Melee attacks against you have advantage; Ranged have disadvantage. Spend 3 spaces of your Speed to stand up."
  },
  {
    "name": "Riding",
    "text": "You move with the creature you are riding. Any attacks that miss you, strike them."
  },
  {
    "name": "Slowed",
    "text": "Speed halved during your next turn."
  },
  {
    "name": "Taunted",
    "text": "Disadvantage on attacks except against the most recent taunter."
  },
  {
    "name": "Wounded",
    "text": "Has any Wounds (typically 6 Wounds and a hero is dead)."
  },
  {
    "name": "Smoldering",
    "text": "Minor status. Does nothing on its own, though some fire spells and abilities have additional effects against Smoldering creatures. Ends when combat does."
  },
  {
    "name": "Charged",
    "text": "Minor status. Whenever you take lightning damage, you are Charged for 1 minute. Does nothing on its own; some lightning spells require or consume it. Ends when combat does."
  },
  {
    "name": "Distracted",
    "text": "Minor status. A target is distracted if it is adjacent to or Taunted by an ally, or if it cannot see you. Does nothing on its own; some abilities have additional effects against such targets. Ends when combat does."
  }
];
