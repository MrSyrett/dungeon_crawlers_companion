// GENERATED FILE - do not edit by hand.
// Source: data/jlu/parts/*.json - regenerate with: node scripts/build-jlu-data.mjs

import type { JluStatus } from "./jlu-types";

export const JLU_STATUSES = [
  {
    "name": "Asleep",
    "effect": "Unconscious for 1 Round or until they take damage (e.g. from Sleep Gas)."
  },
  {
    "name": "Blinded",
    "effect": "Cannot see; sight-based Tests and attacks suffer sharply (e.g. -3 or Disadvantage)."
  },
  {
    "name": "Burned",
    "effect": "On fire (Fire element); ongoing element effect from a Splash Page or Elementalize."
  },
  {
    "name": "Engulfed",
    "effect": "Surrounded by the element (Fire/Toxic); suffers the element's ongoing effect."
  },
  {
    "name": "Frightened",
    "effect": "Overcome by fear; penalties on actions while the source persists (e.g. a Weakness Limitation)."
  },
  {
    "name": "Frozen",
    "effect": "Encased in ice (Ice element); movement and actions are locked."
  },
  {
    "name": "Immobilized",
    "effect": "You cannot move. Escaping typically requires an Opposed Potency Test against the effect's Resistance/value."
  },
  {
    "name": "Poisoned",
    "effect": "Afflicted by toxin (Toxic element); suffers ongoing harmful effects."
  },
  {
    "name": "Prone",
    "effect": "Knocked to the ground; must spend movement to stand."
  },
  {
    "name": "Slowed",
    "effect": "Your movement is hampered for the stated duration (often 1 Round)."
  },
  {
    "name": "Stunned",
    "effect": "Reeling and unable to act effectively until the end of your next turn."
  },
  {
    "name": "Vulnerable",
    "effect": "Exposed and easy to harm; attacks against you land harder. Taking 10+ while Vulnerable escalates consequences."
  }
] as unknown as JluStatus[];
