// GENERATED FILE - do not edit by hand.
// Source: data/mmrpg/parts/*.json - regenerate with: node scripts/build-mmrpg-data.mjs

import type { MmrpgStarshipTrait } from "./mmrpg-types";

export const MMRPG_STARSHIP_TRAITS = [
  {
    "name": "Boarding Equipment",
    "genre": "core",
    "description": "Equipment (physical or force-field) that forms a passageway to another ship, as long as both ships are stationary relative to each other and within 10 spaces.",
    "downtime": "The character practices with the equipment and keeps it in top order, gaining an edge when trying to attach it.",
    "source": "Secret Wars"
  },
  {
    "name": "Mines",
    "genre": "core",
    "description": "A load of four mines that the ship can drop 12 spaces behind it as it moves. Mines are attracted to anything moving within 10 spaces of them, have Flight Speed 36, and deal dMarvel ×4 Health damage.",
    "downtime": "The character resupplies one load, adding up to four mines to the ship's inventory.",
    "stackable": true,
    "maxStack": 4,
    "source": "Secret Wars"
  },
  {
    "name": "Plasma Cannons",
    "genre": "core",
    "description": "A battery of plasma cannons the pilot or a gunner can fire. Range 40, Damage Multiplier ×3.",
    "downtime": "The character hones a battery of plasma cannons, giving attacks with it an edge until the next downtime.",
    "stackable": true,
    "maxStack": 4,
    "source": "Secret Wars"
  },
  {
    "name": "Shields",
    "genre": "core",
    "description": "Shields granting Elemental Protection (Force) 1 — protection against 10 points of Health damage — and preventing teleporting or phasing into or out of the ship.",
    "downtime": "The character improves the shields, adding +2 points of protection (up to a maximum bonus of +10).",
    "stackable": true,
    "maxStack": 4,
    "source": "Secret Wars"
  },
  {
    "name": "Star Drive",
    "genre": "core",
    "description": "A drive that lets the ship move through space. Requires the Mobile tag.",
    "downtime": "The character tunes the engine, giving the pilot an edge when making checks while piloting the ship.",
    "source": "Secret Wars"
  }
] as unknown as MmrpgStarshipTrait[];
