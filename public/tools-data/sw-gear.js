// GENERATED FILE - do not edit by hand.
// Source: data/sw/parts/*.json - regenerate with: node scripts/build-sw-data.mjs

const SW_GEAR = [
  {
    "name": "Stormtrooper Armor",
    "category": "Armor",
    "description": "Standard Imperial stormtrooper armor. The armor code is added to the wearer's strength code for damage purposes only, and subtracted from the wearer's dexterity attribute and all dexterity skill codes for all purposes (a stormtrooper's 2D dexterity and 4D blaster become 1D and 3D). Not listed on the Cost Chart.",
    "book": "core",
    "page": 139,
    "stats": "Armor code 1D (3 pips)"
  },
  {
    "name": "Protective Helmet",
    "category": "Armor",
    "description": "Adds +1 to the wearer's strength code for damage purposes only, and subtracts +1 from dexterity and dexterity skill codes.",
    "book": "core",
    "page": 139,
    "cost": "300",
    "stats": "Armor code +1 (1 pip)"
  },
  {
    "name": "Protective Vest (Flak Vest)",
    "category": "Armor",
    "description": "Adds +1 to the wearer's strength code for damage purposes only, and subtracts +1 from dexterity and dexterity skill codes. Listed as 'Flak Vest' on the Cost Chart.",
    "book": "core",
    "page": 139,
    "cost": "300",
    "stats": "Armor code +1 (1 pip)"
  },
  {
    "name": "Bounty Hunter Armor",
    "category": "Armor",
    "description": "Heavy armor of the kind worn by bounty hunters such as Boba Fett. Adds 1D to the wearer's strength code for damage purposes only, and subtracts 1D from dexterity and dexterity skill codes.",
    "book": "core",
    "page": 139,
    "cost": "2500",
    "stats": "Armor code 1D (3 pips)"
  },
  {
    "name": "Medpac",
    "category": "Medical",
    "description": "A package of drugs, syntheflesh, coagulants and computerized diagnostics used for first-aid and emergency field care. Any character with medicine skill may make one skill roll per combat round spent treating an injured character: difficulty 10 for wounded, 15 for incapacitated, 20 for mortally wounded. Success reduces the wound status by one degree; a character can only be treated once per wound, and a wounded character healed by medpac cannot be treated again that day. A medpac is expended when used (p.53).",
    "book": "core",
    "page": 53,
    "cost": "100",
    "stats": "Difficulty 10/15/20 by wound level; one use"
  },
  {
    "name": "Rejuvenation Tank",
    "category": "Medical",
    "description": "Rejuve tanks are filled with bacta, a specially-formulated treatment liquid which promotes rapid healing and acts as a disinfectant. Anyone placed in a tank will be healed: wounded in 2D hours, incapacitated in 2D days, mortally wounded in 2D weeks (p.53, Healing Table p.140).",
    "book": "core",
    "page": 53,
    "stats": "Healing time: wounded 2D hours, incapacitated 2D days, mortally wounded 2D weeks"
  },
  {
    "name": "Comlink",
    "category": "Communication",
    "description": "Personal communicator. Headset comlinks (as issued by Rebel agents) let everyone wearing one talk within 10 kilometers on a special frequency.",
    "book": "core",
    "page": 141,
    "cost": "100"
  },
  {
    "name": "Macrobinoculars",
    "category": "Misc",
    "description": "Light intensifier viewers with primitive yet rugged image-enhancing chips for magnification, ranging and targeting information. They provide zoom capability for viewing far away images and line-of-sight sensors for determining distance. A Droid may be fitted with them (1D of building dice) only if it already has some form of vision.",
    "book": "companion",
    "page": 31,
    "superseded": {
      "name": "Macrobinoculars",
      "category": "Misc",
      "description": "Long-range viewing optics; standard personal gear characters may carry through Imperial checkpoints.",
      "book": "core",
      "page": 141,
      "cost": "100"
    }
  },
  {
    "name": "Pocket Computer",
    "category": "Misc",
    "description": "A portable computer.",
    "book": "core",
    "page": 141,
    "cost": "100"
  },
  {
    "name": "Rations, 1 week, concentrate",
    "category": "Survival",
    "description": "One week of concentrated food rations.",
    "book": "core",
    "page": 141,
    "cost": "200"
  },
  {
    "name": "Portable Fusion Generator",
    "category": "Tool",
    "description": "A portable power source.",
    "book": "core",
    "page": 141,
    "cost": "500"
  },
  {
    "name": "Autochef",
    "category": "Misc",
    "description": "An automatic cooking unit; programmed to produce simple fare from the limited foodstuffs available aboard small ships (p.55).",
    "book": "core",
    "page": 141,
    "cost": "500"
  },
  {
    "name": "Blaster Ammo Pack",
    "category": "Misc",
    "description": "A single blaster pack is good for hundreds of shots. Replacing a pack costs 1D from all die codes for the round but does not take an action segment, like drawing a weapon (p.51).",
    "book": "core",
    "page": 51
  },
  {
    "name": "Restraining Bolt",
    "category": "Droid",
    "description": "Fitted to a Droid when time does not permit reprogramming. Does not alter the Droid's allegiance, but allows the owner to immobilize or summon the Droid when needed, and can deliver a jolt to make the Droid obey (p.82).",
    "book": "core",
    "page": 82
  },
  {
    "name": "R2 Astromech Droid (unit)",
    "category": "Droid",
    "description": "Astromech Droid; see the character entry for full game data (skills, equipment).",
    "book": "core",
    "page": 141,
    "cost": "1000"
  },
  {
    "name": "3PO Human-Cyborg Relations Droid (unit)",
    "category": "Droid",
    "description": "Protocol Droid; see the character entry for full game data.",
    "book": "core",
    "page": 141,
    "cost": "2000"
  },
  {
    "name": "Glow rod",
    "category": "Tool",
    "description": "A small tube-like item, about the size of a computer screen stylus, that casts an intense and concentrated beam of light in a given direction. Provides limited illumination for about 50 hours before its power cell must be replaced.",
    "stats": "About 50 hours per power cell",
    "book": "companion",
    "page": 32,
    "superseded": {
      "name": "Glow Rod",
      "category": "Misc",
      "description": "A flashlight; each illuminates about 20 meters of tunnel. Standard personal gear (Rebel Breakout, p.101).",
      "book": "core",
      "page": 101
    }
  },
  {
    "name": "Rope with Grapple Hook (10 m)",
    "category": "Tool",
    "description": "Ten-meter rope with a removable grapple hook at one end; ropes can snap together, and each can support 1,000 kilograms (Rebel Breakout, p.101).",
    "book": "core",
    "page": 101
  },
  {
    "name": "Smoke Grenade",
    "category": "Misc",
    "description": "Fills 10 meters of tunnel with thick black smoke; nobody can see through it, so increase blaster difficulty numbers by 5 (Rebel Breakout, p.101).",
    "book": "core",
    "page": 101
  },
  {
    "name": "Flight Suit",
    "category": "Misc",
    "description": "Standard pilot's flight suit; useful as decoys, slings, nets, etc. (Rebel Breakout, p.101).",
    "book": "core",
    "page": 101
  },
  {
    "name": "Space Suit",
    "category": "Survival",
    "description": "Vacuum suit. When a ship is hulled, each character must make a survival skill roll (difficulty 10) to get into a space suit in time; another character can get an unconscious character into a suit with a survival roll of 15 (p.60).",
    "book": "core",
    "page": 60
  },
  {
    "name": "Droid Tool Attachments",
    "category": "Droid",
    "description": "Tools a Droid may be equipped with at a cost of 1D from its skill allotment each: blaster pistol (war and security Droids only), electric arc welder, buzz saw, electrobinoculars, autochef, jack hammer, trash compactor, comlink, radar, sonar, radiation sensor, barometer, spectrometer, fire extinguisher (p.84).",
    "book": "core",
    "page": 84
  },
  {
    "name": "Passage (starliner ticket)",
    "category": "Misc",
    "description": "Typical ticket prices: luxury liner 1000, 'no frills' liner 500, steerage 100, chartered ship 10,000. Multiply by x1 on a heavily-travelled route, x2 common, x3 rarely-travelled, x5 uncommon; 'You want to go where?' routes are chartered ships only (Cost Chart p.141).",
    "book": "core",
    "page": 141,
    "cost": "100-10,000 (see description)"
  },
  {
    "name": "Pocket computer (datapad)",
    "category": "Misc",
    "description": "An average pocket computer has a keyboard/memory unit, computer probe, and a touch-sensitive screen/scanner that can process only images within a few centimeters of the unit. Computing power and memory store several thousand volumes worth of information, retrieving any existing data in less than a second. Datapads also serve as interfaces for larger computer banks. Only one character can use a datapad at a time (no combined action).",
    "book": "companion",
    "page": 31
  },
  {
    "name": "Recording rod",
    "category": "Misc",
    "description": "Audio recorders with laminate-cylinder storage, enough for 100 hours of recording.",
    "stats": "100 hours of recording",
    "book": "companion",
    "page": 31
  },
  {
    "name": "Emergency space suit",
    "category": "Survival",
    "description": "Not built to stand extensive exposure. Emergency suits begin to leak after 72 hours of use; for game purposes such leaks are treated as a wound to the occupant. After 120 hours emergency suits no longer have significant pressurization effects and the occupant dies.",
    "stats": "Leaks (wound) after 72 hours; fatal after 120 hours",
    "book": "companion",
    "page": 31
  },
  {
    "name": "Utility space suit",
    "category": "Survival",
    "description": "Lasts for hundreds of hours of exposure without loss of pressurization or breakdown of radiation protection. Utility suits leak when the occupant is wounded by a sharp melee, projectile, blaster or other attack which can puncture the suit, giving the occupant an additional wound.",
    "stats": "Hundreds of hours; extra wound when punctured",
    "book": "companion",
    "page": 31
  },
  {
    "name": "High quality space suit",
    "category": "Survival",
    "description": "Lasts about as long as a utility suit, but can instantly seal far larger ruptures. High quality suits will not leak until the occupant takes a mortal wound.",
    "stats": "Hundreds of hours; leaks only on a mortal wound",
    "book": "companion",
    "page": 31
  },
  {
    "name": "Syntherope",
    "category": "Tool",
    "description": "A powerful coil of rope that is highly impervious to damage. It has a standard strength of 3D that holds up through incapacitating damage. Syntherope comes in 15 meter coils and is extremely light, making it easy to carry.",
    "stats": "Strength 3D; 15 meter coils",
    "book": "companion",
    "page": 32
  },
  {
    "name": "Chronometer",
    "category": "Misc",
    "description": "Chronometers come in all sizes, from those small enough to wear on the wrist or install on a starship control panel to large free-standing models used as dwelling decorations. They are usually set for a particular planet, with a dual setting that keeps Galactic Standard time.",
    "book": "companion",
    "page": 32
  },
  {
    "name": "Breath mask",
    "category": "Survival",
    "description": "In near-vacuum conditions characters can survive for limited amounts of time with breath masks, which provide life-sustaining gases through a cup that fits snugly over the mouth and nose. They offer no protection from the cold and do not allow survival in hard vacuum.",
    "book": "companion",
    "page": 32
  },
  {
    "name": "Medpac (revised use)",
    "category": "Medical",
    "description": "Medpacs may be used more than once a day. Each medpac used beyond the first has less chance of being effective, due to negative synergy of the drugs and diagnostics programmed on the assumption that only one medpac is used: each medpac beyond the first in a day increases the difficulty number by three. Difficulty scale: wounded 6-10, incapacitated 11-15, mortally wounded 16-20.",
    "stats": "+3 difficulty per additional medpac per day",
    "book": "companion",
    "page": 16
  },
  {
    "name": "Stormtrooper armor sensor/com gear",
    "category": "Armor",
    "description": "The sensor/com gear built into every stormtrooper's armor, integrated with their training and eerily well-meshed mindset, lets any group of stormtroopers who can see a target combine fire on it without limit, and instantly shifts lead-firer status to another firing trooper if the designated lead firer is wounded before firing.",
    "book": "companion",
    "page": 8
  },
  {
    "name": "Armor improvement",
    "category": "Armor",
    "description": "Armor may be improved like other equipment (an attribute-enhancing code: three extra skill points per pip). Every pip of increase in armor decreases the wearer's Dexterity by the same amount unless Dexterity enhancements are bought to offset it (also three extra points per pip, and purchasable only to cancel the armor penalty). Example: improving +1D armor to +1D+2 and erasing the Dexterity penalty costs 16 skill points. Installing a weapon in armor costs 150 credits or nine skill points.",
    "stats": "Improvement cost (1+3) skill points per pip; -1 pip Dexterity per pip of armor",
    "book": "companion",
    "page": 30
  },
  {
    "name": "Droid equipment (building dice)",
    "category": "Droid",
    "description": "When building a Droid, equipment costs 1D of building dice per item or tool (+1D per extra function or unusual feature): method of locomotion, electric arc welder, buzz saw, seismic sensors, photoreceptors, tactile surfaces, olfactory sensors, autochef, macrobinoculars (only with existing vision), trash compactor, fire extinguisher, comlink, radar, sonar, barometer, spectrometer, IDS data-connect for standard computer ports, audio membranes, or speakers. Security and war Droids may be equipped with blasters or other weaponry. Each 1D of Droid armor or speed code costs 3D of building dice. New Droid skills cost skill points plus 1,000 credits for chipburns, software and attachments.",
    "cost": "1D of building dice per item; 1,000 credits per new skill",
    "book": "companion",
    "page": 28
  },
  {
    "name": "Capital ship template",
    "category": "Misc",
    "description": "Record sheet for capital ship combat: vessel name, ship type, hull code and crew rating; the captain's command (starship tactics), pilot's starship piloting, chief gunnery officer's starship gunnery and chief shield officer's starship shields; weapon banks with damage and fire control pip boxes (black out boxes above the code); damage records for ship damage, shields, sublight, maneuver and command; and a 28-round evasion number / shield number (ionization) record.",
    "book": "companion",
    "page": 77
  }
];
