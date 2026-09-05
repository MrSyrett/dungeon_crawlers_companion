// GENERATED FILE - do not edit by hand.
// Source: data/d62e/parts/*.json - regenerate with: node scripts/build-d62e-data.mjs

import type { D62eVehicle } from "./d62e-types";

export const D62E_VEHICLES = [
  {
    "name": "Capital Ship",
    "kind": "Starship",
    "genre": "scifi",
    "scale": "5",
    "crew": "25",
    "speed": "4D",
    "maneuver": "1D",
    "body": "7D",
    "shields": "Heavy Shields 4D",
    "weapons": [
      {
        "name": "Heavy Laser Cannons",
        "damage": "4D"
      }
    ],
    "description": "A massive, heavily armed warship (Defense 35, Hull x5).",
    "page": 203
  },
  {
    "name": "Cargo Transport",
    "kind": "Starship",
    "genre": "scifi",
    "scale": "3",
    "crew": "2",
    "speed": "3D",
    "maneuver": "3D",
    "body": "6D",
    "shields": "Heavy Shields 4D",
    "weapons": [
      {
        "name": "Light Laser Cannons",
        "damage": "2D"
      }
    ],
    "description": "A sturdy hauler built to move goods (Defense 30, Hull x5).",
    "page": 203
  },
  {
    "name": "Fighter",
    "kind": "Starship",
    "genre": "scifi",
    "scale": "2",
    "crew": "1",
    "speed": "5D",
    "maneuver": "5D",
    "body": "2D",
    "shields": "Light Shields 2D",
    "weapons": [
      {
        "name": "Laser Cannons",
        "damage": "3D"
      }
    ],
    "description": "A nimble single-seat combat starship (Defense 10, Hull x5).",
    "page": 203
  },
  {
    "name": "Smuggler Transport",
    "kind": "Starship",
    "genre": "scifi",
    "scale": "4",
    "crew": "4",
    "speed": "4D",
    "maneuver": "4D",
    "body": "4D",
    "shields": "Heavy Shields 4D",
    "weapons": [
      {
        "name": "Light Laser Cannons",
        "damage": "2D"
      }
    ],
    "description": "A well-rounded transport favored by smugglers (Defense 20).",
    "page": 203
  }
] as unknown as D62eVehicle[];
