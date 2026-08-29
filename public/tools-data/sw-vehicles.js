// GENERATED FILE - do not edit by hand.
// Source: data/sw/parts/*.json - regenerate with: node scripts/build-sw-data.mjs

const SW_VEHICLES = [
  {
    "name": "X-Wing Fighter",
    "kind": "Starfighter",
    "weapons": [
      {
        "name": "Laser Cannons",
        "count": "Four (fire as one)",
        "fireControl": "3D",
        "damage": "6D"
      },
      {
        "name": "Proton Torpedoes",
        "fireControl": "2D",
        "damage": "9D"
      }
    ],
    "description": "The Rebel Alliance's main space superiority fighter. Equipped with a hyperdrive but no nav computer; its R2 unit stores pre-calculated coordinates for up to ten hyperdrive routes (p.58).",
    "book": "core",
    "page": 55,
    "scale": "Starship",
    "crew": "1 (plus R2 unit)",
    "passengers": "none",
    "cargo": "110 kilograms",
    "consumables": "1 week (can be mounted with pods carrying additional consumables for extended missions, at a cost in speed and maneuverability: reduce each by 1D for each additional week of consumables carried)",
    "hyperdrive": "x1",
    "nav": "none (hyperdrive backups: none)",
    "speed": "4D",
    "maneuverability": "3D",
    "hull": "4D",
    "shields": "1D"
  },
  {
    "name": "TIE Fighter",
    "kind": "Starfighter",
    "weapons": [
      {
        "name": "Laser Cannons",
        "count": "Two (fire as one)",
        "fireControl": "2D",
        "damage": "5D"
      }
    ],
    "description": "This is the TIE/ln model, a modest improvement on the earlier T.I.E., now the mainstay of Imperial starfighter forces. TIEs are not hyperspace capable, and generally operate from bases or Star Destroyers.",
    "book": "core",
    "page": 55,
    "scale": "Starship",
    "crew": "1",
    "passengers": "none",
    "cargo": "110 kilograms",
    "consumables": "1 day",
    "hyperdrive": "no hyperdrive carried",
    "nav": "none (hyperdrive backups: none)",
    "speed": "5D",
    "maneuverability": "2D",
    "hull": "2D",
    "shields": "none"
  },
  {
    "name": "Millennium Falcon",
    "kind": "Space Transport",
    "weapons": [
      {
        "name": "Quad Laser Cannons",
        "count": "Two, each",
        "fireControl": "3D",
        "damage": "6D"
      },
      {
        "name": "Concussion Missiles",
        "fireControl": "3D",
        "damage": "10D"
      }
    ],
    "description": "The ship of the infamous smuggler Solo, now vigorously sought by both Imperial forces and the nefarious crime boss Jabba the Hutt, to whom the smuggler reputedly owes heavy debts. The Falcon is basically a souped-up stock light freighter. It also mounts a smaller blaster (a heavy repeat blaster for use against ground troops) which is not used in starship combat.",
    "book": "core",
    "page": 56,
    "craft": "Modified stock light freighter",
    "scale": "Starship",
    "crew": "2",
    "passengers": "6",
    "cargo": "100 metric tons",
    "consumables": "2 months",
    "hyperdrive": "x1/2",
    "nav": "yes (hyperdrive backups: yes)",
    "speed": "4D",
    "maneuverability": "1D",
    "hull": "6D",
    "shields": "3D"
  },
  {
    "name": "Stock Light Freighter",
    "kind": "Space Transport",
    "weapons": [
      {
        "name": "Laser Cannon",
        "count": "One",
        "fireControl": "2D",
        "damage": "4D"
      }
    ],
    "description": "One of the most commonly-encountered small trading vessels; frequently seen in the galactic rim, where trade-routes are less intensively developed than in the core, and where small traders can still hope to compete with the giant shipping corporations. Widely available on the open market.",
    "book": "core",
    "page": 56,
    "cost": "100,000 credits (used: 25,000)",
    "scale": "Starship",
    "crew": "2",
    "passengers": "6",
    "cargo": "100 metric tons",
    "consumables": "2 months",
    "hyperdrive": "x2",
    "nav": "yes (hyperdrive backups: yes)",
    "speed": "2D",
    "maneuverability": "zero",
    "hull": "4D",
    "shields": "none"
  },
  {
    "name": "Imperial Customs Frigate",
    "kind": "Capital Ship",
    "weapons": [
      {
        "name": "Laser Cannons",
        "count": "Four, each",
        "fireControl": "2D",
        "damage": "5D"
      },
      {
        "name": "Proton Torpedoes",
        "fireControl": "2D",
        "damage": "9D"
      }
    ],
    "description": "As customs-enforcement vessels, these frigates are sufficiently well-armed to overawe most smugglers and pirates, but far too lightly armed to be of much use in regular naval actions. There aren't many merchant ships that outgun or can outrun one.",
    "book": "core",
    "page": 57,
    "scale": "Starship",
    "crew": "16",
    "passengers": "room for 6 prisoners in the brig",
    "cargo": "200 metric tons (for seizure of contraband)",
    "consumables": "6 months",
    "hyperdrive": "x1",
    "nav": "yes (hyperdrive backups: yes)",
    "speed": "4D",
    "maneuverability": "1D",
    "hull": "5D",
    "shields": "3D"
  },
  {
    "name": "Y-Wing Fighter",
    "kind": "Starfighter",
    "weapons": [
      {
        "name": "Double Laser Cannon",
        "count": "One",
        "fireControl": "2D",
        "damage": "5D"
      },
      {
        "name": "Double Ion Cannon (pivot mount)",
        "count": "One",
        "fireControl": "1D",
        "damage": "3D"
      },
      {
        "name": "Proton Torpedoes",
        "fireControl": "2D",
        "damage": "9D"
      }
    ],
    "description": "The Rebel Alliance's two-man starfighter. Each Y-wing seats two, a pilot and a gunner; the gunner controls a swivel ion cannon mounted on the canopy roof. Each has a Droid socket designed to hold an astromech Droid (Rebel Breakout).",
    "book": "core",
    "page": 108,
    "scale": "Starship",
    "crew": "2 (plus R2 unit)",
    "passengers": "none",
    "cargo": "110 kilograms",
    "consumables": "1 week",
    "hyperdrive": "x1",
    "nav": "none (hyperdrive backups: none)",
    "speed": "3D+2",
    "maneuverability": "2D",
    "hull": "4D+1",
    "shields": "1D"
  },
  {
    "name": "Landspeeder",
    "kind": "Speeder",
    "weapons": [],
    "description": "Repulsorlift ground vehicle, operated with the repulsorlift craft operation skill. No stat block is printed in the core rulebook (the Star Wars Sourcebook provides speed codes for all vehicles); only the price is given on the Cost Chart. Ground vehicle hull codes are on a different scale from starships; damage: light (repair 10), heavy (speed -1D, repair 20), severe (stops, repair 30), destroyed (p.43).",
    "book": "core",
    "page": 141,
    "cost": "10,000 credits (used: 2,000)",
    "scale": "Ground vehicle"
  },
  {
    "name": "Speeder Bike",
    "kind": "Speeder",
    "weapons": [],
    "description": "One-man repulsorlift bike, operated with the repulsorlift craft operation skill. Only the price is printed on the Cost Chart; the chase example on p.35 gives speeder bikes a speed code of 2D. Support (repeating) blasters are frequently mounted on speeder bikes (p.52).",
    "book": "core",
    "page": 141,
    "cost": "5,000 credits (used: 1000)",
    "scale": "Ground vehicle",
    "speed": "2D (chase example, p.35)"
  },
  {
    "name": "Corellian Corvette",
    "kind": "Capital Ship",
    "scale": "Capital Ship",
    "hyperdrive": "x2",
    "speed": "3D",
    "maneuverability": "2D",
    "hull": "4D",
    "shields": "2D",
    "weapons": [
      {
        "name": "Turbolaser",
        "count": "6",
        "fireControl": "2D",
        "damage": "4D+2"
      }
    ],
    "description": "Also described in the Star Wars Sourcebook (SB 30). Capital Ship Statistics chart; hull and shield codes work as for starfighters, damage is recorded in pips under the capital ship combat rules.",
    "book": "companion",
    "page": 50
  },
  {
    "name": "Escort Frigate",
    "kind": "Capital Ship",
    "scale": "Capital Ship",
    "hyperdrive": "x2",
    "speed": "2D",
    "maneuverability": "1D",
    "hull": "4D+2",
    "shields": "2D",
    "weapons": [
      {
        "name": "Turbolaser",
        "count": "12",
        "fireControl": "3D",
        "damage": "4D"
      },
      {
        "name": "Laser cannon",
        "count": "12",
        "fireControl": "2D",
        "damage": "2D"
      }
    ],
    "description": "Also described in the Star Wars Sourcebook (SB 31). Capital Ship Statistics chart; hull and shield codes work as for starfighters, damage is recorded in pips under the capital ship combat rules.",
    "book": "companion",
    "page": 50
  },
  {
    "name": "Mon Cal Cruiser",
    "kind": "Capital Ship",
    "scale": "Capital Ship",
    "hyperdrive": "x1",
    "speed": "3D",
    "maneuverability": "2D",
    "hull": "6D",
    "shields": "3D",
    "weapons": [
      {
        "name": "Turbolaser",
        "count": "48",
        "fireControl": "2D",
        "damage": "4D"
      },
      {
        "name": "Ion cannon",
        "count": "20",
        "fireControl": "3D",
        "damage": "3D"
      },
      {
        "name": "Tractor beam",
        "count": "6",
        "fireControl": "2D+2",
        "damage": "4D"
      }
    ],
    "description": "Mon Calamari star cruiser (SB 36). Capital Ship Statistics chart; hull and shield codes work as for starfighters, damage is recorded in pips under the capital ship combat rules.",
    "book": "companion",
    "page": 50
  },
  {
    "name": "Container Ship",
    "kind": "Capital Ship",
    "scale": "Capital Ship",
    "hyperdrive": "x3",
    "speed": "1D",
    "maneuverability": "zero",
    "hull": "2D+2",
    "shields": "1D",
    "weapons": [],
    "description": "Unarmed cargo vessel (SB 45). Capital Ship Statistics chart; hull and shield codes work as for starfighters, damage is recorded in pips under the capital ship combat rules.",
    "book": "companion",
    "page": 50
  },
  {
    "name": "Bulk Freighter",
    "kind": "Capital Ship",
    "scale": "Capital Ship",
    "hyperdrive": "x3",
    "speed": "1D",
    "maneuverability": "zero",
    "hull": "3D",
    "shields": "1D",
    "weapons": [],
    "description": "Unarmed bulk freighter (SB 44). Capital Ship Statistics chart; hull and shield codes work as for starfighters, damage is recorded in pips under the capital ship combat rules.",
    "book": "companion",
    "page": 50
  },
  {
    "name": "Luxury Liner",
    "kind": "Capital Ship",
    "scale": "Capital Ship",
    "hyperdrive": "x2",
    "speed": "3D+1",
    "maneuverability": "zero",
    "hull": "4D",
    "shields": "1D",
    "weapons": [],
    "description": "Unarmed passenger liner (SB 47). Capital Ship Statistics chart; hull and shield codes work as for starfighters, damage is recorded in pips under the capital ship combat rules.",
    "book": "companion",
    "page": 50
  },
  {
    "name": "Rebel Transport",
    "kind": "Capital Ship",
    "scale": "Capital Ship",
    "hyperdrive": "x2",
    "speed": "3D",
    "maneuverability": "1D",
    "hull": "5D+2",
    "shields": "2D",
    "weapons": [],
    "description": "Unarmed Alliance transport (listed twice in the Companion chart). Capital Ship Statistics chart; hull and shield codes work as for starfighters, damage is recorded in pips under the capital ship combat rules.",
    "book": "companion",
    "page": 50
  },
  {
    "name": "Assault Shuttle",
    "kind": "Capital Ship",
    "scale": "Capital Ship",
    "hyperdrive": "x2",
    "speed": "4D",
    "maneuverability": "2D",
    "hull": "3D+2",
    "shields": "4D+2",
    "weapons": [
      {
        "name": "Laser cannon",
        "count": "4",
        "fireControl": "3D",
        "damage": "2D"
      },
      {
        "name": "Tractor beam",
        "count": "1",
        "fireControl": "4D",
        "damage": "5D+2"
      }
    ],
    "description": "Imperial assault shuttle. Capital Ship Statistics chart; hull and shield codes work as for starfighters, damage is recorded in pips under the capital ship combat rules.",
    "book": "companion",
    "page": 50
  },
  {
    "name": "Lancer Frigate",
    "kind": "Capital Ship",
    "scale": "Capital Ship",
    "hyperdrive": "x2",
    "speed": "2D",
    "maneuverability": "1D",
    "hull": "4D",
    "shields": "2D+2",
    "weapons": [
      {
        "name": "Quad laser cannon",
        "count": "20",
        "fireControl": "4D",
        "damage": "4D"
      }
    ],
    "description": "Anti-starfighter frigate. Capital Ship Statistics chart; hull and shield codes work as for starfighters, damage is recorded in pips under the capital ship combat rules.",
    "book": "companion",
    "page": 50
  },
  {
    "name": "Carrack",
    "kind": "Capital Ship",
    "scale": "Capital Ship",
    "hyperdrive": "x1",
    "speed": "4D",
    "maneuverability": "2D",
    "hull": "5D",
    "shields": "2D+2",
    "weapons": [
      {
        "name": "Heavy turbolaser",
        "count": "10",
        "fireControl": "1D",
        "damage": "7D"
      },
      {
        "name": "Laser cannon",
        "count": "20",
        "fireControl": "3D",
        "damage": "2D"
      },
      {
        "name": "Tractor beam",
        "count": "5",
        "fireControl": "2D",
        "damage": "4D"
      }
    ],
    "description": "Carrack-class light cruiser. Capital Ship Statistics chart; hull and shield codes work as for starfighters, damage is recorded in pips under the capital ship combat rules.",
    "book": "companion",
    "page": 50
  },
  {
    "name": "Star Galleon",
    "kind": "Capital Ship",
    "scale": "Capital Ship",
    "hyperdrive": "x2",
    "speed": "1D+2",
    "maneuverability": "1D",
    "hull": "5D+2",
    "shields": "2D",
    "weapons": [
      {
        "name": "Turbolaser",
        "count": "10",
        "fireControl": "3D",
        "damage": "4D"
      },
      {
        "name": "Concussion missiles",
        "count": "10",
        "fireControl": "5D",
        "damage": "5D"
      }
    ],
    "description": "Armed Imperial cargo galleon. Capital Ship Statistics chart; hull and shield codes work as for starfighters, damage is recorded in pips under the capital ship combat rules.",
    "book": "companion",
    "page": 50
  },
  {
    "name": "Strike Cruiser",
    "kind": "Capital Ship",
    "scale": "Capital Ship",
    "hyperdrive": "x2",
    "speed": "3D",
    "maneuverability": "2D",
    "hull": "6D",
    "shields": "2D+2",
    "weapons": [
      {
        "name": "Turbolaser",
        "count": "20",
        "fireControl": "2D",
        "damage": "5D"
      },
      {
        "name": "Turbolaser battery",
        "count": "10",
        "fireControl": "1D",
        "damage": "7D"
      },
      {
        "name": "Ion cannon",
        "count": "10",
        "fireControl": "4D",
        "damage": "4D"
      },
      {
        "name": "Tractor beam",
        "count": "10",
        "fireControl": "2D",
        "damage": "4D"
      }
    ],
    "description": "Imperial strike cruiser. Capital Ship Statistics chart; hull and shield codes work as for starfighters, damage is recorded in pips under the capital ship combat rules.",
    "book": "companion",
    "page": 50
  },
  {
    "name": "Carrier",
    "kind": "Capital Ship",
    "scale": "Capital Ship",
    "hyperdrive": "x1",
    "speed": "2D",
    "maneuverability": "1D",
    "hull": "7D+1",
    "shields": "2D",
    "weapons": [
      {
        "name": "Twin laser cannon",
        "count": "10",
        "fireControl": "3D",
        "damage": "3D"
      }
    ],
    "description": "Starfighter carrier. Capital Ship Statistics chart; hull and shield codes work as for starfighters, damage is recorded in pips under the capital ship combat rules.",
    "book": "companion",
    "page": 50
  },
  {
    "name": "Interdictor",
    "kind": "Capital Ship",
    "scale": "Capital Ship",
    "hyperdrive": "x2",
    "speed": "3D",
    "maneuverability": "1D",
    "hull": "5D",
    "shields": "3D",
    "weapons": [
      {
        "name": "Quad laser cannon",
        "count": "20",
        "fireControl": "2D",
        "damage": "4D"
      },
      {
        "name": "Gravity well projector",
        "count": "4",
        "fireControl": "6D",
        "notes": "Gravity well projectors: no hyperspace escape"
      }
    ],
    "description": "Interdictor cruiser; its gravity wells prevent hyperspace travel nearby. Capital Ship Statistics chart; hull and shield codes work as for starfighters, damage is recorded in pips under the capital ship combat rules.",
    "book": "companion",
    "page": 50
  },
  {
    "name": "Dreadnought",
    "kind": "Capital Ship",
    "scale": "Capital Ship",
    "hyperdrive": "x2",
    "speed": "2D",
    "maneuverability": "1D",
    "hull": "5D+2",
    "shields": "2D+1",
    "weapons": [
      {
        "name": "Laser cannon",
        "count": "10",
        "fireControl": "3D",
        "damage": "2D"
      },
      {
        "name": "Quad laser cannon",
        "count": "20",
        "fireControl": "2D",
        "damage": "4D"
      },
      {
        "name": "Turbolaser battery",
        "count": "10",
        "fireControl": "1D",
        "damage": "7D"
      }
    ],
    "description": "Old Republic era heavy cruiser. Capital Ship Statistics chart; hull and shield codes work as for starfighters, damage is recorded in pips under the capital ship combat rules.",
    "book": "companion",
    "page": 50
  },
  {
    "name": "Victory I Star Destroyer",
    "kind": "Capital Ship",
    "scale": "Capital Ship",
    "hyperdrive": "x1",
    "speed": "2D",
    "maneuverability": "1D",
    "hull": "4D",
    "shields": "3D+1",
    "weapons": [
      {
        "name": "Quad turbolaser",
        "count": "10",
        "fireControl": "4D",
        "damage": "5D"
      },
      {
        "name": "Double turbolaser",
        "count": "40",
        "fireControl": "3D",
        "damage": "2D+2"
      },
      {
        "name": "Concussion missiles",
        "count": "80",
        "fireControl": "2D",
        "damage": "9D"
      },
      {
        "name": "Tractor beam",
        "count": "10",
        "fireControl": "3D",
        "damage": "6D"
      }
    ],
    "description": "Victory-class Star Destroyer, mark I (SB 32). Capital Ship Statistics chart; hull and shield codes work as for starfighters, damage is recorded in pips under the capital ship combat rules.",
    "book": "companion",
    "page": 50
  },
  {
    "name": "Victory II Star Destroyer",
    "kind": "Capital Ship",
    "scale": "Capital Ship",
    "hyperdrive": "x1",
    "speed": "3D",
    "maneuverability": "1D",
    "hull": "4D+2",
    "shields": "3D",
    "weapons": [
      {
        "name": "Turbolaser battery",
        "count": "20",
        "fireControl": "1D",
        "damage": "7D"
      },
      {
        "name": "Turbolaser",
        "count": "20",
        "fireControl": "2D",
        "damage": "5D"
      },
      {
        "name": "Ion cannon",
        "count": "10",
        "fireControl": "4D",
        "damage": "4D"
      },
      {
        "name": "Tractor beam",
        "count": "10",
        "fireControl": "2D",
        "damage": "6D"
      }
    ],
    "description": "Victory-class Star Destroyer, mark II (SB 32). Capital Ship Statistics chart; hull and shield codes work as for starfighters, damage is recorded in pips under the capital ship combat rules.",
    "book": "companion",
    "page": 50
  },
  {
    "name": "Imperial Star Destroyer I",
    "kind": "Capital Ship",
    "scale": "Capital Ship",
    "hyperdrive": "x2",
    "speed": "3D",
    "maneuverability": "1D",
    "hull": "7D",
    "shields": "3D",
    "weapons": [
      {
        "name": "Turbolaser battery",
        "count": "60",
        "fireControl": "4D",
        "damage": "5D"
      },
      {
        "name": "Ion cannon",
        "count": "60",
        "fireControl": "2D+2",
        "damage": "3D"
      },
      {
        "name": "Tractor beam",
        "count": "10",
        "fireControl": "4D",
        "damage": "6D"
      }
    ],
    "description": "Imperial-class Star Destroyer, mark I (SB 34). Capital Ship Statistics chart; hull and shield codes work as for starfighters, damage is recorded in pips under the capital ship combat rules.",
    "book": "companion",
    "page": 50
  },
  {
    "name": "Imperial Star Destroyer II",
    "kind": "Capital Ship",
    "scale": "Capital Ship",
    "hyperdrive": "x1",
    "speed": "3D",
    "maneuverability": "1D",
    "hull": "7D+1",
    "shields": "2D+2",
    "weapons": [
      {
        "name": "Heavy turbolaser",
        "count": "50",
        "fireControl": "0D",
        "damage": "10D"
      },
      {
        "name": "Heavy turbolaser",
        "count": "50",
        "fireControl": "1D",
        "damage": "7D"
      },
      {
        "name": "Ion cannon",
        "count": "20",
        "fireControl": "4D",
        "damage": "4D"
      },
      {
        "name": "Tractor beam",
        "count": "10",
        "fireControl": "4D",
        "damage": "6D"
      }
    ],
    "description": "Imperial-class Star Destroyer, mark II. Capital Ship Statistics chart; hull and shield codes work as for starfighters, damage is recorded in pips under the capital ship combat rules.",
    "book": "companion",
    "page": 50
  },
  {
    "name": "Torpedo Sphere",
    "kind": "Capital Ship",
    "scale": "Capital Ship",
    "hyperdrive": "x3",
    "speed": "1D",
    "maneuverability": "zero",
    "hull": "9D+2",
    "shields": "2D",
    "weapons": [
      {
        "name": "Turbolaser battery",
        "count": "10",
        "fireControl": "0D",
        "notes": "Damage: shield (used against planetary shields)"
      },
      {
        "name": "Concussion missiles",
        "count": "500",
        "fireControl": "2D",
        "damage": "9D",
        "notes": "Planetary shield short range; damage 9D"
      }
    ],
    "description": "Siege platform designed to breach planetary shields. Capital Ship Statistics chart; hull and shield codes work as for starfighters, damage is recorded in pips under the capital ship combat rules.",
    "book": "companion",
    "page": 50
  },
  {
    "name": "Super Star Destroyer",
    "kind": "Capital Ship",
    "scale": "Capital Ship",
    "hyperdrive": "x2",
    "speed": "2D",
    "maneuverability": "zero",
    "hull": "10D",
    "shields": "8D",
    "weapons": [
      {
        "name": "Turbolaser battery",
        "count": "250",
        "fireControl": "1D",
        "damage": "7D"
      },
      {
        "name": "Heavy turbolaser battery",
        "count": "250",
        "fireControl": "0D",
        "damage": "10D"
      },
      {
        "name": "Concussion missiles",
        "count": "250",
        "fireControl": "2D",
        "damage": "9D"
      },
      {
        "name": "Ion cannon",
        "count": "250",
        "fireControl": "4D",
        "damage": "4D"
      },
      {
        "name": "Enhanced tractor beam",
        "count": "40",
        "fireControl": "4D",
        "damage": "9D"
      }
    ],
    "description": "Executor-class Super Star Destroyer. Capital Ship Statistics chart; hull and shield codes work as for starfighters, damage is recorded in pips under the capital ship combat rules.",
    "book": "companion",
    "page": 50
  },
  {
    "name": "Loronar FSCV",
    "kind": "Capital Ship",
    "scale": "Capital Ship",
    "hyperdrive": "x2",
    "speed": "zero",
    "maneuverability": "zero",
    "hull": "8D",
    "shields": "none",
    "weapons": [],
    "description": "Loronar field secured container vessel; no sublight drive, no shields, no weapons. Capital Ship Statistics chart; hull and shield codes work as for starfighters, damage is recorded in pips under the capital ship combat rules.",
    "book": "companion",
    "page": 50
  },
  {
    "name": "TIE/rc Starfighter",
    "kind": "Starfighter",
    "scale": "Starfighter",
    "hyperdrive": "zero (none)",
    "speed": "5D",
    "atmosphere": "maneuverability reduced to 1D+2 in atmosphere",
    "maneuverability": "2D+2",
    "hull": "2D",
    "shields": "None",
    "weapons": [
      {
        "name": "Laser cannon",
        "count": "1",
        "fireControl": "2D",
        "damage": "2D+2"
      }
    ],
    "description": "TIE reconnaissance fighter flown by the Grehollo station patrols over the exile moon Captivity (To Free the Forgotten). Typical pilots: starship piloting 4D+2, starship gunnery 5D+2; combined fire not possible in the storm.",
    "book": "companion",
    "page": 75
  },
  {
    "name": "Y-wing (standard)",
    "kind": "Starfighter",
    "scale": "Starfighter",
    "hull": "2D+2",
    "shields": "3D+2",
    "weapons": [],
    "description": "The core rulebook gave the Y-wing longprobe, a deep reconnaissance version with a sturdier hull and less shielding. The standard Y-wing starfighter (Star Wars Sourcebook) has shields 3D+2 and hull 2D+2; all other statistics are the same as the core Y-wing longprobe.",
    "book": "companion",
    "page": 20
  }
];
