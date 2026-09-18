// GENERATED FILE - do not edit by hand.
// Source: data/jlu/parts/*.json - regenerate with: node scripts/build-jlu-data.mjs

import type { JluOrigin } from "./jlu-types";

export const JLU_ORIGINS = [
  {
    "name": "Amazon",
    "summary": "A warrior of Themyscira, forged by the Olympian gods.",
    "description": "Amazons are trained from a young age in the arts of war — archery, swordsmanship, and hand-to-hand combat — and blessed with divine longevity.",
    "powerKit": [
      "Super Strength",
      "Enhanced Resistance",
      "Superhuman Speed",
      "Combat Training"
    ],
    "canBuyOutsideKit": true,
    "features": [
      {
        "name": "Amazon Equipment",
        "text": "You receive an Amazon Armor that grants DR equal to your Tier+1, and an Amazon Sword that grants +2 to Attack rolls and +1 Damage."
      },
      {
        "name": "Divine Longevity",
        "text": "Amazons are created by deities and can live forever if unharmed. Every Amazon receives the Perennial Trait."
      },
      {
        "name": "Sisters in Arms",
        "text": "You receive the Affiliation (Themyscira) Trait."
      }
    ],
    "freePower": "One Grade in a Power from the Amazon kit."
  },
  {
    "name": "Human",
    "summary": "No superhuman biology — just training, gear and grit.",
    "description": "Humans rely on skill and technology rather than powers. They are versatile and resourceful, but bounded by their Power Kit.",
    "powerKit": [
      "Martial Training",
      "Technology"
    ],
    "canBuyOutsideKit": false,
    "features": [
      {
        "name": "Only Human",
        "text": "Humans cannot purchase Powers outside their Power Kit."
      },
      {
        "name": "Versatility",
        "text": "Your Hero gains one Knowledge and one Simple Trait."
      }
    ],
    "freePower": "One Grade in a Power from the kit (Martial Training or Technology)."
  },
  {
    "name": "Kryptonian",
    "summary": "A survivor of Krypton, powered by a yellow sun.",
    "description": "Under a yellow sun, Kryptonians are among the mightiest beings on Earth — but green Kryptonite is their bane.",
    "powerKit": [
      "Energy Blast",
      "Invulnerability",
      "Enhanced Resistance",
      "Enhanced Senses",
      "Super Strength",
      "Super-Breath",
      "Superhuman Speed",
      "Flight"
    ],
    "canBuyOutsideKit": true,
    "features": [
      {
        "name": "Blood of Krypton",
        "text": "You gain a bonus to Potency and Damage Reduction equal to your Tier. Whenever your Tier increases, both the bonus and the Damage Reduction increase as well."
      }
    ],
    "limitation": "When exposed to green Kryptonite, Kryptonians lose access to all their powers and become Vulnerable. Unless under a yellow sun, Kryptonians lose their Powers.",
    "freePower": "One Grade in a Power from the Kryptonian kit."
  },
  {
    "name": "Meta-Human",
    "summary": "An Earthborn with the meta-gene — powers of nearly any kind.",
    "description": "Meta-Humans carry the meta-gene, a mutation granting a virtually limitless range of abilities. No two meta-genes are alike.",
    "powerKit": [
      "Any Superpower"
    ],
    "canBuyOutsideKit": true,
    "features": [
      {
        "name": "Limitless Potential",
        "text": "Meta-Humans do not receive a free Power. Instead, they may purchase any Superpower at its normal cost."
      }
    ],
    "freePower": "None — but any Superpower may be bought at normal cost."
  }
] as unknown as JluOrigin[];
