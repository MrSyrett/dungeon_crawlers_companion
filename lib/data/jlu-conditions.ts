// GENERATED FILE - do not edit by hand.
// Source: data/jlu/parts/*.json - regenerate with: node scripts/build-jlu-data.mjs

import type { JluCondition } from "./jlu-types";

export const JLU_CONDITIONS = [
  {
    "name": "Stable",
    "order": 0,
    "effect": "Unharmed. The default state, before any Condition is marked."
  },
  {
    "name": "Tired",
    "order": 1,
    "effect": "The fight is dragging on; you start to gasp and lose your breath. No mechanical penalty."
  },
  {
    "name": "Scratched",
    "order": 2,
    "effect": "It was just a scratch — there's still plenty of fuel left to burn. Apply -2 to all d20 rolls."
  },
  {
    "name": "Injured",
    "order": 3,
    "effect": "That hurt. Not enough to stop you, but it hurts. Apply -4 to all d20 rolls."
  },
  {
    "name": "Wounded",
    "order": 4,
    "effect": "Time to start worrying. Apply Disadvantage to all d20 rolls."
  },
  {
    "name": "Defeated",
    "order": 5,
    "effect": "The Hero is out of action and at the Editor's mercy. Their fate is decided by the story."
  }
] as unknown as JluCondition[];
