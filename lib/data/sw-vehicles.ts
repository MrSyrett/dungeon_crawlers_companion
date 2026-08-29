// GENERATED FILE - do not edit by hand.
// Source: data/sw/parts/*.json - regenerate with: node scripts/build-sw-data.mjs

import type { SwVehicle } from "./sw-types";

export const SW_VEHICLES: SwVehicle[] = [
  {
    "name": "X-Wing Fighter",
    "kind": "Starfighter",
    "craft": "Incom T-65B X-wing",
    "scale": "Starship",
    "crew": "1 pilot plus 1 astromech Droid",
    "passengers": "None",
    "cargo": "110 kilograms",
    "consumables": "1 week's supply; can be extended with power and life support pods, but with a loss of speed and maneuverability",
    "hyperdrive": "x1",
    "nav": "None, uses astromech Droid (hyperdrive backup: none)",
    "speed": "4D",
    "maneuverability": "3D",
    "hull": "4D",
    "shields": "1D",
    "weapons": [
      {
        "name": "Laser Cannons",
        "count": "Four (fire linked)",
        "fireControl": "3D",
        "damage": "6D",
        "notes": "Combined damage. Taim & Bak KX9 long-barreled cannons, one on each S-foil tip; fire together or in sequence for a near-continuous barrage."
      },
      {
        "name": "Proton Torpedo Launchers",
        "count": "Two",
        "fireControl": "2D",
        "damage": "9D",
        "notes": "Each launcher draws from a three-torpedo magazine; fire together or separately."
      }
    ],
    "description": "Space superiority starfighter, 12.5 meters — the cutting edge of starfighter performance and only operated by the Rebel Alliance, whose commandos helped the Incom design team defect with the prototypes. Twin-split S-foils deploy in an 'X' for combat; shields can be angled forward or behind; an auxiliary generator keeps life support, shields, weapons or the subspace radio running even with total engine failure. Incom MKI hyperdrive modules but no astrogation computer — an astromech Droid (usually an R2) stores jump data, monitors all systems, reroutes circuitry and makes in-flight repairs, and is ejected automatically with the pilot. Handles much like the T-16 Skyhopper. The T-65C-A2 is the newest model; most Rebels fly the T-65B.",
    "book": "sourcebook",
    "page": 18,
    "superseded": {
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
    }
  },
  {
    "name": "TIE Fighter",
    "kind": "Starfighter",
    "craft": "Sienar Fleet Systems TIE/ln",
    "scale": "Starship",
    "crew": "1 pilot",
    "passengers": "None",
    "cargo": "110 kilograms",
    "consumables": "2 days",
    "hyperdrive": "None",
    "nav": "None (hyperdrive backup: none)",
    "speed": "5D",
    "maneuverability": "2D",
    "hull": "2D",
    "shields": "None",
    "weapons": [
      {
        "name": "Laser Cannons",
        "count": "Two (fire linked)",
        "fireControl": "2D",
        "damage": "5D",
        "notes": "Combined damage. Chin-mounted inside the spherical hull; the TIE/ln carries a separate power generator for its lasers, increasing range and lethality."
      }
    ],
    "description": "Space superiority starfighter, 6.3 meters — the standard fleet-based TIE fighter. Twin ion engines accelerate ionized gas to a fraction of lightspeed, giving high thrust with low mass and near-instant turns (but TIEs cannot stop quickly; reverse thrusting can damage the pylons). No hyperdrive, no deflector shields, and no atmospheric converter — the pilot's suit provides life support. Pilots compensate by shooting first, attacking in numbers and accepting losses. Most Star Destroyers carry six squadrons of 12 (flights of four, elements of two). Other models: T.I.E. (original), TIE (first upgrade), TIE/rc recon, TIE/fc fire control, TIE/gt ground attack.",
    "book": "sourcebook",
    "page": 25,
    "superseded": {
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
    }
  },
  {
    "name": "Millennium Falcon",
    "kind": "Space Transport",
    "craft": "The Millennium Falcon (modified Corellian YT-1300)",
    "scale": "Starship",
    "crew": "2 (minimum); one person can operate the ship from the cockpit or forward hold technical station if necessary",
    "passengers": "6",
    "cargo": "100 metric tons (plus several sensor-shielded hidden holds)",
    "consumables": "2 months",
    "hyperdrive": "x1/2",
    "nav": "Yes (hyperdrive backup: yes)",
    "speed": "4D",
    "maneuverability": "1D",
    "hull": "6D",
    "shields": "3D",
    "weapons": [
      {
        "name": "Quad Laser Cannons",
        "count": "Two (fire separately)",
        "fireControl": "3D",
        "damage": "6D",
        "notes": "Dorsal and ventral turrets; fired manually or remotely from the cockpit at reduced accuracy"
      },
      {
        "name": "Concussion Missile Tubes",
        "count": "Two (fire linked)",
        "fireControl": "3D",
        "damage": "9D",
        "notes": "Combined damage; mounted between the bow mandibles"
      },
      {
        "name": "Light Laser Cannon",
        "count": "One",
        "fireControl": "4D",
        "damage": "1D",
        "notes": "Auto-firing anti-personnel blaster cannon that drops from a concealed pod near the cockpit; fires only when the ship is on the ground"
      }
    ],
    "description": "Modified Corellian stock light freighter captained by Han Solo. Looks like a battered tramp freighter but is packed with unlicensed modifications: extensively rebuilt hyperdrive and sublight engines that outrun pickets, customs ships and many starfighters; star-cruiser-grade deflectors 'acquired' from Myomar (only sustainable for limited duration); scavenged duralloy armor; a transponder broadcasting several identity codes; hidden holds; a complete sensor package and a powerful (once self-jamming) sensor jammer. The Hanx-Wargel SuperFlow IV computer holds three bickering Droid brains, and breakdowns are chronic.",
    "book": "sourcebook",
    "page": 43,
    "superseded": {
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
    }
  },
  {
    "name": "Stock Light Freighter",
    "kind": "Space Transport",
    "craft": "Corellian YT-1300 Transport",
    "scale": "Starship",
    "crew": "2",
    "passengers": "6",
    "cargo": "100 metric tons",
    "consumables": "2 months",
    "hyperdrive": "x2",
    "nav": "Yes (hyperdrive backup: yes)",
    "speed": "2D",
    "maneuverability": "zero",
    "hull": "4D",
    "shields": "No combat shields",
    "weapons": [
      {
        "name": "Laser Cannon",
        "count": "One",
        "fireControl": "2D",
        "damage": "4D"
      }
    ],
    "description": "Stock light freighter, 26.7 meters. Corellian-built light freighters, once the backbone of galactic trade, are now most often seen plying the Outer Rim routes that the big bulk freighters and container ships disdain. Built around a command pod or bridge with sleeping/recreation section and storage holds, and almost always at least minimally armed. Owners are fanatically loyal and usually in debt up to their ocular receptors; no two are 'stock' any more. Cost 100,000 credits (used: 25,000) on the Equipment Cost Chart.",
    "cost": "100,000 (used: 25,000)",
    "book": "sourcebook",
    "page": 38,
    "superseded": {
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
    }
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
    "craft": "Koensayr BTL Y-wing Starfighter",
    "scale": "Starship",
    "crew": "1 pilot and 1 astromech Droid in BTL-A4; plus a weapons officer in BTL-S3",
    "passengers": "None",
    "cargo": "110 kilograms",
    "consumables": "1 week",
    "hyperdrive": "x1",
    "nav": "None; uses Droid for 10 jumps (hyperdrive backup: none)",
    "speed": "3D+2",
    "maneuverability": "2D",
    "hull": "4D+1",
    "shields": "1D",
    "weapons": [
      {
        "name": "Laser Cannons",
        "count": "Two (fire linked)",
        "fireControl": "2D",
        "damage": "5D",
        "notes": "Combined damage. Taim & Bak IX4 cannons in the nose, bore-sighted to the flight path."
      },
      {
        "name": "Proton Torpedo Launchers",
        "count": "Two",
        "fireControl": "2D",
        "damage": "9D",
        "notes": "Arakyd flex tube launchers fed from a central magazine of eight torpedoes."
      },
      {
        "name": "Light Ion Cannons",
        "count": "Two (fire linked)",
        "fireControl": "1D",
        "damage": "4D",
        "notes": "Combined damage. Twin-barrelled cannon on a pivot mount behind the cockpit; fixed position in the single-seat BTL-A4, operated by the aft-facing weapons officer in the BTL-S3 (360 degree pivot, 60 degree elevation)."
      }
    ],
    "description": "Attack fighter, 16 meters. Rugged fighter-bomber that bore the brunt of the Alliance's early battles; the Rebellion has lost more Y-wings than any other craft simply because it has flown more of them. Two Koensayr Ion Jet engines with disk vectrals that scatter emissions and serve as steering thrusters; closing the vectrals reverses thrust once, burning them off. Shields can be angled. An R2 unit stores data for 10 jumps; the simpler R4 handles only one. Sensors are often thrown out of alignment by engine vibration. Koensayr ballistic ejection seats (both fire together in the BTL-S3).",
    "book": "sourcebook",
    "page": 17,
    "superseded": {
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
    }
  },
  {
    "name": "Landspeeder",
    "kind": "Speeder",
    "craft": "SoroSuub XP-38 Landspeeder Ground Vehicle",
    "scale": "Repulsorcraft (speed, maneuverability, body strength and weapon codes are in scale to starfighter codes)",
    "crew": "1",
    "passengers": "1",
    "cargo": "10 kilograms",
    "speed": "2D",
    "maneuverability": "2D",
    "hull": "2D (body strength)",
    "atmosphere": "Flight ceiling 2 meters",
    "weapons": [],
    "description": "Light-duty surface transport on repulsorlift (often with turbothrust engines), hovering about a meter above the surface at up to 250 kilometers per hour — the most common personal planetary transport. The XP-38 is the most advanced and hottest-selling model: 320 kph, two-meter ceiling, optional sensor package, and an R2-shaped autopilot that 'gives you the feel of flying a starfighter'. Other popular makes: Bespin Motors Void-Spider TX-3, Ubrikkian 9000 Z001, Mobquet Deluxe. Some police forces and the Rebel Alliance armor-plate landspeeders and add blaster cannons. Cost 10,000 credits (used: 2,000).",
    "cost": "10,000 (used: 2,000)",
    "book": "sourcebook",
    "page": 59,
    "superseded": {
      "name": "Landspeeder",
      "kind": "Speeder",
      "weapons": [],
      "description": "Repulsorlift ground vehicle, operated with the repulsorlift craft operation skill. No stat block is printed in the core rulebook (the Star Wars Sourcebook provides speed codes for all vehicles); only the price is given on the Cost Chart. Ground vehicle hull codes are on a different scale from starships; damage: light (repair 10), heavy (speed -1D, repair 20), severe (stops, repair 30), destroyed (p.43).",
      "book": "core",
      "page": 141,
      "cost": "10,000 credits (used: 2,000)",
      "scale": "Ground vehicle"
    }
  },
  {
    "name": "Speeder Bike",
    "kind": "Speeder",
    "craft": "Aratech 74-Z Military Speeder Bike",
    "scale": "Repulsorcraft",
    "crew": "1",
    "passengers": "None",
    "cargo": "3 kilograms (personal gear)",
    "speed": "4D",
    "maneuverability": "3D+2",
    "hull": "2D (body strength)",
    "atmosphere": "Flight ceiling 25 meters",
    "weapons": [
      {
        "name": "Laser Cannon",
        "fireControl": "2D",
        "damage": "3D"
      }
    ],
    "description": "One- or two-man repulsorlift vehicle sacrificing altitude for low-altitude, high-speed maneuverability: rear-mounted engine, front outriggings with four directional vanes, handlebar and pedal controls, saddle with safety harness. Batteries need recharging every 600 kilometers or so; military versions are armored, armed with a small laser cannon and carry self-charging power. The Aratech 74-Z is Imperial military issue, used by garrisons for reconnaissance, courier and patrol work by specially trained scout troopers. Cost 5,000 credits (used: 1,000).",
    "cost": "5,000 (used: 1,000)",
    "book": "sourcebook",
    "page": 63,
    "superseded": {
      "name": "Speeder Bike",
      "kind": "Speeder",
      "weapons": [],
      "description": "One-man repulsorlift bike, operated with the repulsorlift craft operation skill. Only the price is printed on the Cost Chart; the chase example on p.35 gives speeder bikes a speed code of 2D. Support (repeating) blasters are frequently mounted on speeder bikes (p.52).",
      "book": "core",
      "page": 141,
      "cost": "5,000 credits (used: 1000)",
      "scale": "Ground vehicle",
      "speed": "2D (chase example, p.35)"
    }
  },
  {
    "name": "Z-95 Headhunter",
    "kind": "Starfighter",
    "craft": "Incom/Subpro Z-95 Headhunter Starfighter",
    "scale": "Starship",
    "crew": "1; 2 in Z-95XT and some other models",
    "passengers": "None",
    "cargo": "85 kilograms",
    "consumables": "1 day; some models equipped with larger stores (up to 4 weeks for the Z-95ER)",
    "hyperdrive": "None",
    "nav": "None (hyperdrive backup: none)",
    "speed": "3D+2",
    "maneuverability": "1D",
    "hull": "4D",
    "shields": "1D",
    "weapons": [
      {
        "name": "Triple Blasters",
        "count": "Two (fire linked)",
        "fireControl": "1D",
        "damage": "3D",
        "notes": "Combined damage"
      },
      {
        "name": "Concussion Missiles",
        "fireControl": "1D",
        "damage": "7D"
      }
    ],
    "description": "Multi-purpose space fighter, 11.8 meters; many variants (Z-95ER extended range, Z-95ML missile platform, Z-95C4d ground support bomber, Z-95XT twin-seat trainer). A generation out of date and no longer manufactured, but more Headhunters remain in service than any other starfighter — constabularies, customs, planetary defense forces, corporations and pirates. Swing-wing design, sensor jammers, Loan-chat 'slingshot' ejection seat; legendary for holding together despite severe damage. Incom built many of its systems into the T-65 X-wing.",
    "book": "sourcebook",
    "page": 13
  },
  {
    "name": "A-Wing Starfighter",
    "kind": "Starfighter",
    "craft": "Rebel A-wing Starfighter",
    "scale": "Starship",
    "crew": "1 pilot",
    "passengers": "None",
    "cargo": "40 kilograms",
    "consumables": "1 week",
    "hyperdrive": "x1",
    "nav": "Limited; two jumps (hyperdrive backup: none)",
    "speed": "6D",
    "maneuverability": "4D",
    "hull": "2D+2",
    "shields": "1D",
    "weapons": [
      {
        "name": "Laser Cannons",
        "count": "Two (fire linked)",
        "fireControl": "3D",
        "damage": "5D",
        "notes": "Combined damage. Each cannon can elevate and depress 60 degrees on a hydro-servo bearing, letting the A-wing engage from much wider angles; a few field-modified craft swivel them 360 degrees."
      }
    ],
    "description": "Interceptor and multi-purpose fighter, 9.6 meters, developed secretly by the Alliance. Two massive Novaldex J-77 'Event Horizon' engines and low mass give it the highest sublight speed of any known production starfighter, including the TIE interceptor. Carries a full sensor array and engine-powered jammers that can completely blind a small craft's sensors (fleet-ship arrays are too powerful to jam). Demands more skill than most pilots possess; a primary mission is defending bases and merchant ships against strike craft.",
    "book": "sourcebook",
    "page": 14
  },
  {
    "name": "B-Wing Assault Starfighter",
    "kind": "Starfighter",
    "craft": "Slayn & Korpil B-wing Assault Starfighter",
    "scale": "Starship",
    "crew": "1 pilot",
    "passengers": "None, though cockpit is large enough to fit a second person in an emergency — greatly reducing combat control",
    "cargo": "45 kilograms",
    "consumables": "1 week",
    "hyperdrive": "x2",
    "nav": "Limited, two jumps (hyperdrive backup: none)",
    "speed": "3D",
    "maneuverability": "1D+1",
    "hull": "3D",
    "shields": "2D",
    "weapons": [
      {
        "name": "Medium Ion Cannons",
        "count": "Three (fire linked)",
        "fireControl": "4D",
        "damage": "4D",
        "notes": "Combined damage"
      },
      {
        "name": "Proton Torpedo Launchers",
        "count": "Two",
        "fireControl": "3D",
        "damage": "9D"
      },
      {
        "name": "Laser Cannon",
        "count": "One",
        "fireControl": "1D",
        "damage": "7D"
      },
      {
        "name": "Auto-Blasters",
        "count": "Two",
        "fireControl": "2D",
        "damage": "3D"
      }
    ],
    "description": "Heavy assault starfighter, 16.9 meters — the most heavily-armed starfighter in the Rebel arsenal. A gyroscopically-stabilized command pod stays fixed while the rest of the fighter spins to evade fire; a ranging laser gives near-perfect targeting but reveals the approach vector. Single Quadex Kyromaster engine; slow but strongly shielded. A mechanic's nightmare, requiring more maintenance per flight hour than any other Rebel craft. Gamemaster notes: the ranging laser is built into the high fire control codes — if it is not operational, reduce fire control by 2D. When the gyro system fails from heavy damage, reduce all fire control codes by 1D and sublight speed by 2D.",
    "book": "sourcebook",
    "page": 15
  },
  {
    "name": "TIE Interceptor",
    "kind": "Starfighter",
    "craft": "Sienar Fleet Systems TIE Interceptor",
    "scale": "Starship",
    "crew": "1 pilot",
    "passengers": "None",
    "cargo": "110 kilograms",
    "consumables": "2 days",
    "hyperdrive": "None",
    "nav": "None (hyperdrive backup: none)",
    "speed": "5D+2",
    "maneuverability": "3D+2",
    "hull": "3D",
    "shields": "None",
    "weapons": [
      {
        "name": "Laser Cannons",
        "count": "Four (fire linked)",
        "fireControl": "3D",
        "damage": "6D",
        "notes": "Combined damage. Forward-mounted on the tips of the dagger-shaped solar panels; updated targeting software."
      }
    ],
    "description": "Space superiority starfighter, 9.6 meters — the Empire's newest TIE, developed after Yavin from Darth Vader's 'bent-wing' prototype. Larger twin ion engines and solar panels make it (by Imperial claim) the fastest starfighter in the galaxy, 25 percent faster than an X-wing; a new ion stream projection system with twin-port deflectors allows tighter turns and rolls. Still no hyperdrive or shields. Perhaps a complete squadron is ready to fly.",
    "book": "sourcebook",
    "page": 26
  },
  {
    "name": "TIE Bomber",
    "kind": "Starfighter",
    "craft": "Sienar Fleet Systems TIE Bomber",
    "scale": "Starship",
    "crew": "1 pilot",
    "passengers": "None",
    "cargo": "None in flight pod; 15,000 kilograms in bomb bay",
    "consumables": "2 days",
    "hyperdrive": "None",
    "nav": "None (hyperdrive backup: none)",
    "speed": "3D",
    "maneuverability": "zero",
    "hull": "4D+1",
    "shields": "None",
    "weapons": [
      {
        "name": "Laser Cannons",
        "count": "Two (fire linked)",
        "fireControl": "2D",
        "damage": "3D",
        "notes": "Combined damage"
      },
      {
        "name": "Concussion Missiles",
        "fireControl": "3D",
        "damage": "9D",
        "notes": "Port pod bomb bays also carry proton bombs, guided missiles, orbital mines and free-falling thermal detonators; ordnance is armed only near the target."
      }
    ],
    "description": "Dedicated light space bomber, 7.8 meters, developed from the TIE/gt. Twin-pod design: the pilot sits in the starboard pod, the port pod holds two bomb bays, a Nordoxicon bomb sight, targeting sensors and beam altimeter. Makes precise 'surgical strikes' against ground and space targets, letting the fleet capture ships and bases intact. One of the first Imperial starfighters with an ejection seat. Bent-wing solar panels power the extra systems. Missiles are susceptible to jamming and fast defensive guns.",
    "book": "sourcebook",
    "page": 28
  },
  {
    "name": "TIE Starfighter (original TIE)",
    "kind": "Starfighter",
    "craft": "Sienar Fleet Systems TIE",
    "scale": "Starship",
    "hyperdrive": "None",
    "speed": "4D",
    "maneuverability": "2D",
    "hull": "2D",
    "shields": "None",
    "weapons": [
      {
        "name": "Double Laser Cannon",
        "count": "One",
        "fireControl": "2D",
        "damage": "3D"
      }
    ],
    "description": "The first, modestly upgraded fighter manufactured by Sienar Fleet Systems under direct Imperial Navy control (the T.I.E. was the original Republic Sienar Systems starfighter). Early-model TIEs are still operated by a few planetary and local forces, whose pilots are less rigorously trained. Statistics from the Spacecraft Performance Data Chart; no full stat block is printed.",
    "book": "sourcebook",
    "page": 23
  },
  {
    "name": "TIE/rc Fighter",
    "kind": "Starfighter",
    "craft": "Sienar Fleet Systems TIE/rc",
    "scale": "Starship",
    "hyperdrive": "None",
    "speed": "5D",
    "maneuverability": "2D+2",
    "hull": "2D",
    "shields": "None",
    "weapons": [
      {
        "name": "Laser Cannon",
        "count": "One",
        "fireControl": "2D",
        "damage": "2D+2"
      }
    ],
    "description": "Special reconnaissance fighter with extra-sensitive sensors and long-range communications gear, armed with only one laser cannon. Each Star Destroyer wing always includes one recon squadron. Statistics from the Spacecraft Performance Data Chart.",
    "book": "sourcebook",
    "page": 23
  },
  {
    "name": "TIE/fc Starfighter",
    "kind": "Starfighter",
    "craft": "Sienar Fleet Systems TIE/fc",
    "scale": "Starship",
    "hyperdrive": "None",
    "speed": "4D",
    "maneuverability": "3D",
    "hull": "2D",
    "shields": "None",
    "weapons": [
      {
        "name": "Laser Cannon",
        "count": "One",
        "fireControl": "2D",
        "damage": "2D+2"
      }
    ],
    "description": "Fire-control fighter: provides accurate fire control and target designation for long-range naval bombardment of ground or space targets, maneuvering near the target and transmitting aiming adjustments to a fleet ship out of counter-fire range. Carries laser target designators and jam-resistant data comlinks. One or two flights in a fighter squadron are TIE/fc, often detached to assist TIE bombers or ground forces. Statistics from the Spacecraft Performance Data Chart.",
    "book": "sourcebook",
    "page": 23
  },
  {
    "name": "TIE/gt Starfighter",
    "kind": "Starfighter",
    "craft": "Sienar Fleet Systems TIE/gt",
    "scale": "Starship",
    "hyperdrive": "None",
    "speed": "2D",
    "maneuverability": "1D",
    "hull": "2D",
    "shields": "None",
    "weapons": [
      {
        "name": "Laser Cannon",
        "count": "One",
        "fireControl": "2D",
        "damage": "2D+2"
      },
      {
        "name": "Concussion Missiles",
        "fireControl": "1D",
        "damage": "8D"
      }
    ],
    "description": "An enlarged hull allows this ground-attack model to carry a wide range of torpedoes and bombs. Found mostly in ground support squadrons; gradually being replaced by the TIE bomber, though many Star Destroyers still carry TIE/gt models. Statistics from the Spacecraft Performance Data Chart.",
    "book": "sourcebook",
    "page": 23
  },
  {
    "name": "Standard Interplanetary Shuttle",
    "kind": "Space Transport",
    "scale": "Starship",
    "hyperdrive": "None",
    "speed": "2D+2",
    "maneuverability": "zero",
    "hull": "5D",
    "shields": "1D",
    "weapons": [
      {
        "name": "Laser Cannon",
        "count": "One",
        "fireControl": "2D",
        "damage": "4D"
      }
    ],
    "description": "Generic in-system shuttle without a hyperdrive. Statistics from the Spacecraft Performance Data Chart (p.23); no full stat block is printed.",
    "book": "sourcebook",
    "page": 23
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
    "page": 50,
    "superseded": {
      "name": "Corellian Corvette",
      "kind": "Capital",
      "craft": "Corellian Engineering Corporation Corvette",
      "scale": "Capital ship (no hull or shield ratings — small craft cannot significantly damage it)",
      "crew": "45-165, depending on function (military configuration about 165; cargo configuration 45-60). Crew skill codes 3D+2 to 8D in astrogation, starship gunnery and starship piloting",
      "passengers": "Up to 600, depending on function",
      "cargo": "3,000 metric tons",
      "consumables": "1 year",
      "hyperdrive": "x2",
      "nav": "Yes (hyperdrive backup: no)",
      "speed": "3D",
      "maneuverability": "2D",
      "weapons": [
        {
          "name": "Double Turbolaser Cannons",
          "count": "Six (fire separately)",
          "fireControl": "3D",
          "damage": "8D"
        }
      ],
      "description": "Mid-sized, multi-purpose starship, 150 meters. Modular interior reconfigures it as troop carrier, light escort, cargo transport, passenger liner or diplomatic courier; used by the Empire, Rebel blockade runners, pirates and privateers. Design flaw: the dorsal solar collector/stabilizer fin — repeated heavy hits there cause reactor vibration and heat build-up, forcing a shutdown; some are retrofitted with heavier fins, others refocus shields to protect it.",
      "book": "sourcebook",
      "page": 30
    }
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
    "page": 50,
    "superseded": {
      "name": "Escort Frigate",
      "kind": "Capital",
      "craft": "KDY's Nebulon-B Frigate",
      "scale": "Capital ship (no hull or shield ratings)",
      "crew": "920 (78 officers, 842 enlisted); troops: 75",
      "passengers": "Troops: 75; carries two TIE fighter squadrons (24 starfighters)",
      "cargo": "6,000 metric tons",
      "consumables": "2 years",
      "hyperdrive": "x2",
      "nav": "Yes (hyperdrive backup: yes)",
      "speed": "2D",
      "maneuverability": "1D",
      "weapons": [
        {
          "name": "Turbolaser Batteries",
          "count": "12 (fire separately)",
          "fireControl": "3D",
          "damage": "4D"
        },
        {
          "name": "Laser Cannons",
          "count": "12 (fire separately)",
          "fireControl": "2D",
          "damage": "2D"
        },
        {
          "name": "Tractor Beam Projectors",
          "count": "Two",
          "fireControl": "2D",
          "damage": "None; target captured if hit"
        }
      ],
      "description": "Escort starship, 300 meters — the Kuat Drive Yards Nebulon-B, the standard convoy escort for both the Empire and the Rebellion. Well armed, good shields and tractor beams, very good long-range sensors, and carries two TIE squadrons to handle anything too quick or small for the slow, unwieldy frigate. Several have defected to or been captured by the Rebellion and used to capture whole Imperial convoys.",
      "book": "sourcebook",
      "page": 31
    }
  },
  {
    "name": "Victory-class Star Destroyer",
    "kind": "Capital",
    "craft": "Rendili StarDrive's Victory I",
    "scale": "Capital ship (no hull or shield ratings)",
    "crew": "5,200 (610 officers, 4,590 enlisted); troops: 2,040",
    "passengers": "Troops: 2,040; carries two TIE fighter squadrons in Imperial service",
    "cargo": "8,100 metric tons",
    "consumables": "4 years",
    "hyperdrive": "x1",
    "nav": "Yes (hyperdrive backup: yes)",
    "speed": "2D",
    "maneuverability": "1D",
    "weapons": [
      {
        "name": "Quad Turbolaser Batteries",
        "count": "10 (fire separately)",
        "fireControl": "4D",
        "damage": "5D"
      },
      {
        "name": "Double Turbolaser Batteries",
        "count": "40 (fire separately)",
        "fireControl": "3D",
        "damage": "2D+2"
      },
      {
        "name": "Concussion Missile Tube Launchers",
        "count": "80 (fire separately)",
        "fireControl": "2D",
        "damage": "9D",
        "notes": "Main ground-attack weapon"
      },
      {
        "name": "Tractor Beam Projectors",
        "count": "10 (fire separately)",
        "fireControl": "3D",
        "damage": "None; target captured if hit"
      }
    ],
    "description": "Star Destroyer, 900 meters, designed by Walex Blissex and commissioned at the end of the Clone Wars. Now largely replaced by Imperial-class ships and relegated to planetary defense and assault. Can enter the upper atmosphere of planets (newer Star Destroyers cannot). Weak LF9 ion engines make it slow in realspace, but DeLuxFlux hyperdrive motivators give it rapid jumps. Its 10 high-intensity tractor beams compensate for its slow speed.",
    "book": "sourcebook",
    "page": 32
  },
  {
    "name": "Imperial Star Destroyer",
    "kind": "Capital",
    "craft": "KDY's Imperial I",
    "scale": "Capital ship (no hull or shield ratings)",
    "crew": "37,085 (9,235 officers, 27,850 enlisted); troops: 9,700. Crew skill codes up to 8D in astrogation, gunnery and piloting",
    "passengers": "Troops: 9,700 (a full stormtrooper division with assault craft); 20 AT-AT and 30 AT-ST walkers; 72 TIE starfighters (48 TIE fighters, 12 interceptors, 12 bombers); eight Lambda-class shuttles; 12 landing barges (four AT-ATs or eight AT-STs and 1,000 troops each)",
    "cargo": "36,000 metric tons",
    "consumables": "6 years",
    "hyperdrive": "x2",
    "nav": "Yes (hyperdrive backup: yes)",
    "speed": "3D",
    "maneuverability": "1D",
    "weapons": [
      {
        "name": "Turbolaser Batteries",
        "count": "60 (fire separately)",
        "fireControl": "4D",
        "damage": "5D",
        "notes": "Mounted in five-gun batteries of three turrets (two double, one single) that can concentrate on one target or engage several"
      },
      {
        "name": "Ion Cannon Batteries",
        "count": "60 (fire separately)",
        "fireControl": "2D+2",
        "damage": "3D"
      },
      {
        "name": "Tractor Beam Projectors",
        "count": "10 (fire separately)",
        "fireControl": "4D",
        "damage": "None; target captured if hit"
      }
    ],
    "description": "Star Destroyer, 1,600 meters — the mainstay of the Imperial fleet, with enough firepower to reduce a civilization to slag or take on an enemy fleet. Proposed by Lira Wessex; each fleet is built around one Imperial-class ship. Serves as weapons platform, space station, repair dock and heavy transport; not designed to enter atmospheres, so it carries landing barges, and many carry pre-fabricated garrison bases (800 troops, 2,200 support personnel, 10 AT-ATs, 10 AT-STs, 40 TIEs). Weakness: few overlapping fields of fire at close range against small, maneuverable ships. Lord Vader's squadron includes the Super-class Executor and the Imperial-class Devastator and Avenger.",
    "book": "sourcebook",
    "page": 34
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
    "page": 50,
    "superseded": {
      "name": "Mon Cal Cruiser",
      "kind": "Capital",
      "craft": "Mon Calamari MC80",
      "scale": "Capital ship (no hull or shield ratings)",
      "crew": "5,402 (668 officers, 4,734 enlisted); troops: 1,200",
      "passengers": "Troops: 1,200",
      "cargo": "20,000 metric tons",
      "consumables": "2 years",
      "hyperdrive": "x1",
      "nav": "Yes (hyperdrive backup: yes)",
      "speed": "3D",
      "maneuverability": "2D",
      "weapons": [
        {
          "name": "Turbolaser Batteries",
          "count": "48 (fire separately)",
          "fireControl": "2D",
          "damage": "4D"
        },
        {
          "name": "Ion Cannon Batteries",
          "count": "20 (fire separately)",
          "fireControl": "3D",
          "damage": "3D"
        },
        {
          "name": "Tractor Beam Projectors",
          "count": "Six (fire separately)",
          "fireControl": "2D+2",
          "damage": "None; target captured if hit"
        }
      ],
      "description": "Star Cruiser, 1,200 meters. MC80 passenger/exploration vessels converted for war by the Mon Calamari and now serving the Rebellion; each is hand-crafted and no two are alike, which pains non-Calamari mechanics. Almost organic in appearance, covered with pods holding sensors, recessed batteries, shield generators and observation decks; many viewports have been plated over. Triple-redundant shield generators, each weaker than an Imperial unit but re-channelable when one fails — an Imperial Star Destroyer that loses a shield simply loses it.",
      "book": "sourcebook",
      "page": 36
    }
  },
  {
    "name": "Space Barge",
    "kind": "Space Transport",
    "craft": "Incom X-23 StarWorker",
    "scale": "Starship",
    "crew": "2, plus Droid (pilot, co-pilot and fifth-degree laborer Droid; can be operated by one person)",
    "passengers": "None",
    "cargo": "2,000 cubic meters with a maximum mass of 5,000 metric tons",
    "consumables": "1 week",
    "hyperdrive": "None",
    "nav": "Yes (hyperdrive backup: no)",
    "speed": "1D",
    "maneuverability": "0",
    "hull": "3D",
    "shields": "No combat shields (limited shields against collisions and debris)",
    "weapons": [],
    "description": "Intra-system space barge, 38 meters — the workhorse of in-system commerce, shuttling cargo between large hyperspace-capable ships, orbiting warehouses and planetary spaceports. Most have both sublight and repulsorlift drives and standardized docking ports and airlocks. Unarmed and slow, so a tempting target for hit-and-run pirates just after it loads.",
    "book": "sourcebook",
    "page": 38
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
    "page": 50,
    "superseded": {
      "name": "Bulk Freighter",
      "kind": "Space Transport",
      "craft": "Corellian Action IV Transport",
      "scale": "Starship (no hull or shield ratings — vast size makes it immune to most small ship fire)",
      "crew": "8 (crew skill codes 2D to 6D)",
      "passengers": "None",
      "cargo": "30,000 cubic meters with a maximum mass of 75,000 metric tons in a variety of partial or fully pressurized and climate-controlled holds",
      "consumables": "3 months",
      "hyperdrive": "x3",
      "nav": "No (hyperdrive backup: no)",
      "speed": "1D",
      "maneuverability": "zero",
      "weapons": [],
      "description": "Medium bulk freighter, 100 meters. Bulk freighters haul the vast majority of interplanetary cargo — essentially a box with a hyperspace engine, bottom-of-the-line computers, limited sensors and often no nav computer (Port Authority computers sell jump coordinates for major routes). Extremely rugged and reliable; mostly independently or family-owned and mortgaged; often crewed by greenhorns working for room and board. Common conversions: tugs, salvage ships, fleet resuppliers, research vessels.",
      "book": "sourcebook",
      "page": 44
    }
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
    "page": 50,
    "superseded": {
      "name": "Container Ship",
      "kind": "Space Transport",
      "craft": "Kuat Drive Yards Super Transport XI",
      "scale": "Starship (no hull or shield ratings)",
      "crew": "100",
      "passengers": "None",
      "cargo": "10 million cubic meters (up to 40,000 standard containers) with a maximum mass of 25 million metric tons in 20 holds, some pressurized and with limited temperature control",
      "consumables": "500 days",
      "hyperdrive": "x3",
      "nav": "Yes (hyperdrive backup: yes)",
      "speed": "1D",
      "maneuverability": "zero",
      "weapons": [],
      "description": "Large container ship ('super transport'), 840 meters — among the largest commercial vessels in space. Hauls only standard sealed containers (smallest 500 cubic meters / 1,000 metric tons; standard sizes 10x10x10 m = 1,000 cubic meters, 20x10x10 = 2,000, 40x20x10 = 8,000) loaded by built-in tracks and lifters; cannot land on planets. Flagships of the great shipping corporations, often accompanied by guardships; the Imperial Navy uses them to resupply fleets.",
      "book": "sourcebook",
      "page": 45
    }
  },
  {
    "name": "Passenger Liner",
    "kind": "Space Transport",
    "craft": "Lady of Mindor",
    "scale": "Starship (no hull or shield ratings)",
    "crew": "117 (12 officers, 24 crewmen, and 81 stewards)",
    "passengers": "600 in staterooms",
    "cargo": "1,000 cubic meters",
    "consumables": "300 days",
    "hyperdrive": "x2",
    "nav": "Yes (hyperdrive backup: yes)",
    "speed": "3D+1",
    "maneuverability": "zero",
    "weapons": [
      {
        "name": "Twin Laser Cannons",
        "count": "Four (fire linked)",
        "fireControl": "1D",
        "damage": "4D",
        "notes": "Combined damage"
      }
    ],
    "description": "Luxury passenger liner, 310 meters. 'Luxury liner' covers non-military starships over 100 meters carrying over 250 passengers; smaller passenger ships (SSPs, under 100 meters and 500 passengers) are registered with a planetary governor. Massive drives, backup systems, powerful shields and several laser turrets. Cost of passage: luxury liner 1,000 credits and up, 'no frills' liner 500, steerage 100, chartered ship 10,000 and up; multiply by x1 heavily-travelled route, x2 common, x3 rarely-travelled, x5 uncommon (chartered ships to unusual destinations: gamemaster's choice). Shaky credentials cost about three times the fare.",
    "book": "sourcebook",
    "page": 47
  },
  {
    "name": "Airspeeder",
    "kind": "Airspeeder",
    "craft": "Incom's T-47 Airspeeder",
    "scale": "Repulsorcraft",
    "crew": "1",
    "passengers": "1",
    "cargo": "10 kilograms",
    "speed": "3D",
    "maneuverability": "3D",
    "hull": "2D (body strength)",
    "atmosphere": "Flight ceiling 250 kilometers",
    "weapons": [],
    "description": "Small wedge-shaped repulsorlift vehicle with a ceiling over 250 kilometers and top speed over 900 kilometers per hour. Mechanical control flaps brake and turn without losing speed, making airspeeders nearly impossible to track with flight-predictor sensors. Incom's T-47 and T-16 Skyhopper are the most popular; the T-16 adds ion afterburners (1,200 kph) and many X-wing pilots train in it. Sport and family transport, often hot-rodded; militias and the Rebellion convert them into weapon platforms. The Equipment Cost Chart prices a Skyhopper at 30,000 credits new (7,000 used) or 400/day to rent; the T-47 itself is not priced.",
    "book": "sourcebook",
    "page": 60
  },
  {
    "name": "Snowspeeder",
    "kind": "Airspeeder",
    "craft": "Rebel Alliance Combat Snowspeeder (converted airspeeder)",
    "scale": "Repulsorcraft",
    "crew": "2 (pilot forward, gunner facing rearward)",
    "passengers": "None",
    "cargo": "10 kilograms",
    "speed": "3D+2",
    "maneuverability": "3D",
    "hull": "3D (body strength)",
    "atmosphere": "Flight ceiling 175 kilometers",
    "weapons": [
      {
        "name": "Double Laser Cannon",
        "count": "One (fire linked)",
        "fireControl": "2D",
        "damage": "4D",
        "notes": "Combined damage; two forward-pointing heavy laser cannons"
      },
      {
        "name": "Power Harpoon",
        "fireControl": "2D",
        "damage": "3D or none if tow cable and fusion disc is used",
        "notes": "Harpoon cannon with high-tension tow cable and fusion discs"
      }
    ],
    "description": "Airspeeder refitted by the Rebellion for military service and hostile environments (nicknamed 'snowspeeder' or 'sandspeeder'): heavy angled armor plating, dust covers, insulation or cooling systems, and a modified Y-wing cockpit pod giving pilots familiar controls. Fast, agile and heavily armed, converted airspeeders are the Rebellion's major ground-support fighting craft.",
    "book": "sourcebook",
    "page": 60
  },
  {
    "name": "Cloud Car",
    "kind": "Airspeeder",
    "craft": "Bespin Motors Storm IV Twin-Pod Cloud Car",
    "scale": "Repulsorcraft",
    "crew": "1",
    "passengers": "1",
    "cargo": "10 kilograms",
    "speed": "3D",
    "maneuverability": "2D+2",
    "hull": "1D (body strength)",
    "atmosphere": "Flight ceiling 250 kilometers",
    "weapons": [
      {
        "name": "Double Blaster Cannon",
        "count": "One (fire linked)",
        "fireControl": "1D",
        "damage": "1D+2",
        "notes": "Combined damage; patrol craft only — fixed forward-firing cannon on each pod"
      }
    ],
    "description": "Twin-pod atmospheric vehicle with both repulsorlifts and a boom-mounted miniature Quadex Kyromaster ion engine (left exposed for cooling); pilot and passenger ride in separate pods. Cruises at 1,500 kph up to about 250 kilometers. Bespin Motors makes pleasure craft, air taxis and patrol models; used for traffic control, guiding landing craft and spot-checking cargo. Useless in combat — cloud cars fly apart when hit and cannot mount adequate shields, armor or heavy weapons.",
    "book": "sourcebook",
    "page": 60
  },
  {
    "name": "Sail Barge",
    "kind": "Speeder",
    "craft": "Ubrikkian Luxury Sail Barge",
    "scale": "Repulsorcraft",
    "crew": "26",
    "passengers": "500",
    "cargo": "2000 metric tons",
    "speed": "1D",
    "maneuverability": "0",
    "hull": "2D (body strength)",
    "atmosphere": "Flight ceiling 10 meters",
    "weapons": [
      {
        "name": "Heavy Blaster Cannon",
        "fireControl": "1D",
        "damage": "3D"
      }
    ],
    "description": "Huge antigravity vessel for crossing large flat surfaces — sand, water and ice seas — at up to 100 kph on repulsorlifts, or 30 kph under its massive sails alone. Usually a luxury touring craft, entertainment venue or vacation complex (Galaxy Tours sells sail barge packages) for the wealthy, planetary royalty and high Imperial officials. Skiffs serve as support and emergency vehicles aboard sail barges.",
    "book": "sourcebook",
    "page": 61
  },
  {
    "name": "Skiff",
    "kind": "Speeder",
    "craft": "Ubrikkian Bantha II Cargo Skiff",
    "scale": "Repulsorcraft",
    "crew": "1",
    "passengers": "16",
    "cargo": "120 metric tons",
    "speed": "1D",
    "maneuverability": "0",
    "hull": "1D (body strength)",
    "atmosphere": "Flight ceiling 50 meters",
    "weapons": [],
    "description": "Ten-meter open-topped antigravity utility craft steered from the rear by a tiller with two steering vanes; up to 250 kph and a 50-meter ceiling. Easily operated — even labor Droids can handle one. Used by shipping firms to move cargo between ports and warehouses (two electromagnetic load lifters and a boarding ramp), refitted for up to 16 passengers, or carried as support vehicles on sail barges.",
    "book": "sourcebook",
    "page": 62
  },
  {
    "name": "Civilian Speeder Bike (Ikas-Adno Starhawk)",
    "kind": "Speeder",
    "craft": "Ikas-Adno Starhawk",
    "scale": "Repulsorcraft",
    "crew": "1",
    "passengers": "1",
    "cargo": "3 kilograms",
    "speed": "3D",
    "maneuverability": "3D",
    "hull": "1D (body strength)",
    "atmosphere": "Flight ceiling 10 meters",
    "weapons": [],
    "description": "The best-selling civilian speeder bike: sleek, fast, relatively inexpensive and popular with the galaxy's youth. Competitors include Aratech's two-seat Yellow Demon 100 (QuietLift 1400 propulsion) and the Mobquet TrailMaker III (giant TurboToo repulsorlift engine, civilian and military versions). Cost 5,000 credits (used: 1,000).",
    "cost": "5,000 (used: 1,000)",
    "book": "sourcebook",
    "page": 63
  },
  {
    "name": "Swoop",
    "kind": "Speeder",
    "craft": "Mobquet Nebulon-Q Swoop Racer",
    "scale": "Repulsorcraft",
    "crew": "1",
    "passengers": "None",
    "cargo": "2 kilograms",
    "speed": "5D",
    "maneuverability": "4D",
    "hull": "1D (body strength)",
    "atmosphere": "Flight ceiling 350 kilometers",
    "weapons": [],
    "description": "Essentially a high-powered engine with a seat: a repulsorlift unit plus an advanced turbothrust engine reaching 600 kph with a 400-kilometer ceiling. Handlebar accelerators with separate lift, thrust and braking controls; knees tuck into control auxiliaries; riders must be belted on. Faster and more powerful than speeder bikes and much harder to operate — the Imperial Scouts chose speeder bikes instead. Swoop racing in huge domed 'swoop tracks' is a hugely popular, dangerous sport; Outer Rim swoop gangs such as the Nova Demons and Dark Star Hellions use them as raiding craft. Cost 5,000 credits (used: 1,000); 30/day to rent.",
    "cost": "5,000 (used: 1,000)",
    "book": "sourcebook",
    "page": 65
  },
  {
    "name": "AT-AT Walker",
    "kind": "Walker",
    "craft": "All Terrain Armored Transport",
    "scale": "Walker (speed code in scale to creatures; weapon codes in scale to repulsorcraft and starfighters — damage doubled against characters)",
    "crew": "3 (pilot, gunner, combat coordinator/commander); crew skill codes 4D to 8D in gunnery and piloting",
    "passengers": "40 (fully-armed stormtroopers)",
    "cargo": "400 kilograms",
    "speed": "2D",
    "hull": "6D (body strength)",
    "weapons": [
      {
        "name": "Heavy Laser Cannon",
        "count": "Two (fire linked)",
        "fireControl": "2D",
        "damage": "6D",
        "notes": "Combined damage; chin-mounted, forward-firing"
      },
      {
        "name": "Medium Blasters",
        "count": "Two (fire linked)",
        "fireControl": "2D",
        "damage": "3D",
        "notes": "Combined damage; one on each side of the head"
      }
    ],
    "description": "Over 15 meters tall, four-legged ground-assault vehicle and troop transport assembled at Kuat Drive Yards, designed to inspire fear. The armored head (elevates/depresses 30 degrees, turns 90) holds crew and weapons; the less-armored 'neck/tunnel' is the usual target. Thick armor absorbs heavy blaster fire; climbs sheer slopes up to eight meters; kneels to deploy troops by rear ramp. Deceptively fast strides. Dropped from shuttle barges. Rules: walker speed codes are in scale to creatures' speed codes — when walkers engage repulsorcraft or starfighters in atmosphere, double the flying vehicles' speed codes; walker damage codes are doubled against characters (rulebook p.65).",
    "book": "sourcebook",
    "page": 68
  },
  {
    "name": "AT-ST Walker",
    "kind": "Walker",
    "craft": "All Terrain Scout Transport",
    "scale": "Walker (speed code in scale to creatures; weapon damage doubled against characters)",
    "crew": "2",
    "passengers": "None",
    "cargo": "40 kilograms",
    "speed": "3D",
    "hull": "3D (body strength)",
    "weapons": [
      {
        "name": "Twin Blaster Cannon",
        "count": "One",
        "fireControl": "1D",
        "damage": "4D",
        "notes": "Swivel-mounted on the chin"
      },
      {
        "name": "Twin Light Blaster Cannon",
        "count": "One",
        "fireControl": "1D",
        "damage": "2D",
        "notes": "Swivel-mounted on the port-side sensor pod"
      },
      {
        "name": "Concussion Grenade Launcher",
        "fireControl": "1D",
        "damage": "3D",
        "notes": "Starboard pod"
      }
    ],
    "description": "Two-legged scout walker just over six meters tall, for reconnaissance and front-line support: faster and more maneuverable than the AT-AT but less armed and armored. Escorts stormtroopers, covers AT-AT flanks and mops up infantry attacking from underneath; steel foot claws cut trip wires and troops. Only heavy blaster or laser cannon fire pierces its hide, but balance is a problem — susceptible to trip wires, deadfalls, pits and explosive charges, so infantry now clears traps ahead of scout actions. Dropped from shuttle barges or carried inside AT-ATs.",
    "book": "sourcebook",
    "page": 69
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
