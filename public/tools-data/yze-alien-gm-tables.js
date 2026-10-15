// Alien RPG GM generator tables (Evolved Edition core rulebook).
// Chapter 11 "Campaign Play" (pp.234-258) and "Last Survivor" solo oracle (pp.293-297).
// D66 = roll two d6 as tens + ones (11-16, 21-26 ... 66). Grouped ranges use {roll,result}.
const ALIEN_GM_TABLES = {
  // ---- MAIN WORLD CREATION (pp.237-241) ----
  world: {
    // Planet Size (2D6). Modifiers: Ice planet -2, Gas giant moon -4.
    size: [
      { roll: "2 or less", result: "<1,000 km - Almost 0-G (Ceres and other asteroids)" },
      { roll: "3-4", result: "2,000 km - 0.1 G (Iapetus)" },
      { roll: "5-6", result: "4,000 km - 0.2 G (Luna, Europa)" },
      { roll: "7", result: "7,000 km - 0.5 G (Mars)" },
      { roll: "8", result: "10,000 km - 0.7 G" },
      { roll: "9-10", result: "12,500 km - 1.0 G (Earth, Venus)" },
      { roll: "11", result: "15,000 km - 1.3 G" },
      { roll: "12", result: "20,000 km - 2 G (Super-Earth)" }
    ],
    // Atmosphere (2D6). Modify roll by planet size: <=4,000km -2; 4,001-7,000km -4.
    atmosphere: [
      { roll: "<=3", result: "Thin" },
      { roll: "4-6", result: "Breathable" },
      { roll: "7-8", result: "Toxic" },
      { roll: "9", result: "Dense" },
      { roll: "10", result: "Corrosive" },
      { roll: "11", result: "Infiltrating" },
      { roll: "12", result: "Special" }
    ],
    // Temperature (2D6). Modify by atmosphere: Thin -4; Dense -1; Corrosive/Infiltrating +6; Special GM decides.
    temperature: [
      { roll: "<=3", result: "Frozen - -50 C or less (Titan, Pluto, Enceladus)" },
      { roll: "4-5", result: "Cold - -50 to 0 C (Alaska or Antarctica in winter)" },
      { roll: "6-7", result: "Temperate - 0 to 30 C (Boston or Paris)" },
      { roll: "8-10", result: "Hot - 31 to 80 C (Mojave or Sahara Deserts)" },
      { roll: "11+", result: "Burning - 80 C or more (Mercury, Venus)" }
    ],
    // Geosphere (2D6). Modifiers: Thin/Dense/Corrosive/Infiltrating atmosphere -4; Hot -2; Burning -4; Frozen -2; No atmosphere = Desert World.
    geosphere: [
      { roll: "<=4", result: "Desert World - No surface water" },
      { roll: "5-6", result: "Arid World - Global deserts and dry steppes, with some lakes and small seas" },
      { roll: "7-8", result: "Dry Temperate - Oceans cover 30-40% of the world's surface" },
      { roll: "9-10", result: "Wet Temperate - Oceans cover 60-70% of the world's surface" },
      { roll: "11", result: "Wet World - Global oceans with some islands and archipelagos" },
      { roll: "12", result: "Water World - No dry land" }
    ],
    // Terrestrial Planet Terrain (D66) - order 11,12,13,14,15,16,21...66.
    terrestrialTerrain: [
      "Huge impact crater",
      "Plains of silicon glass",
      "Disturbing wind-cut rock formations",
      "Permanent global dust-storm",
      "Eerily colored dust plains",
      "Active volcanic lava fields",
      "Extensive salt flats",
      "Dust-laden, permanent sunset sky",
      "Ancient, blackened lava plains",
      "Thermal springs and steam vents",
      "Tall, gravel-strewn mountains",
      "Howling winds that never stop",
      "Daily fog banks roll in",
      "Deep and wide rift valleys",
      "Bizarrely eroded, wind-cut badlands",
      "Steep-sided river gorges cut into soft rocks",
      "Huge moon dominates day/night sky",
      "World-spanning super canyon",
      "Impressive river of great length",
      "Oddly colored forests of alien vegetation",
      "Mountains cut by sky-blue lakes",
      "Sweeping plains of elephant grass",
      "Highly toxic, but beautiful, plant-life",
      "Small, bright, incredibly fast moons in orbit",
      "Vast and complex river delta",
      "Immense series of waterfalls",
      "Endless mudflats with twisting waterways",
      "Impressive coastline of fjords and cliffs",
      "Volcanoes, active & widespread",
      "Impenetrable jungle",
      "Dangerous tides - fast and loud",
      "Vast, permanent super storm",
      "Toxic sea creatures floating with the currents",
      "Volcanic island chains",
      "Permanently overcast with unrelenting rainfall",
      "Mildly acidic oceans and rainfall"
    ],
    // Ice Planet Terrain (2D6, 2-12 in order).
    icePlanetTerrain: [
      { roll: "2", result: "Huge impact crater" },
      { roll: "3", result: "Geysers spew water into low orbit from long fissures" },
      { roll: "4", result: "Deep fissures leading to a subsurface ocean" },
      { roll: "5", result: "Dramatically colored blue-green ice fissures" },
      { roll: "6", result: "Huge and active cryovolcano" },
      { roll: "7", result: "Vast range of ice mountains" },
      { roll: "8", result: "World-spanning super canyon" },
      { roll: "9", result: "Disturbing, wind-cut ice formations" },
      { roll: "10", result: "Black, dust-covered ice plains" },
      { roll: "11", result: "Impressive ice escarpment of great length" },
      { roll: "12", result: "Extensive dune-fields of methane sand grains" }
    ],
    // Colony Size (2D6). Modifiers: Breathable atmosphere +1; Corrosive/Infiltrating -2; Size 4,000km or less -3.
    colonySize: [
      { roll: "<=7", result: "Start-Up", population: "3D6 x 10", missions: "1" },
      { roll: "8-10", result: "Young", population: "3D6 x 100", missions: "D3-1" },
      { roll: "11+", result: "Established", population: "2D6 x 1000", missions: "D3" }
    ],
    // Colony Mission (2D6). Modifiers: Toxic/corrosive/infiltrating atmosphere +1; Start-up colony -1; Breathable atmosphere +1; Established colony +4.
    colonyMission: [
      { roll: "<=2", result: "Terraforming" },
      { roll: "3", result: "Research" },
      { roll: "4", result: "Surveying and prospecting" },
      { roll: "5", result: "Prison or exile" },
      { roll: "6", result: "Mining and refining" },
      { roll: "7", result: "Mineral drilling" },
      { roll: "8", result: "Communications relay" },
      { roll: "9", result: "Military" },
      { roll: "10", result: "Cattle ranching/logging" },
      { roll: "11", result: "Corporate HQ" },
      { roll: "12+", result: "Government HQ" }
    ],
    // Orbital Components (2D6). Modifiers: Young colony +1; Established colony +2.
    orbitalComponents: [
      { roll: "2-4", result: "Nothing" },
      { roll: "5", result: "Ring" },
      { roll: "6", result: "Abandoned or repurposed satellite or space station" },
      { roll: "7-8", result: "D3 moons" },
      { roll: "9", result: "Survey station" },
      { roll: "10", result: "Communications satellites" },
      { roll: "11", result: "Transfer station" },
      { roll: "12+", result: "Roll D6 times" }
    ],
    // Faction Type (D6). Roll D3 for number of factions, then D6 each for type.
    factionType: [
      "Newcomers",
      "Corporate representatives",
      "Scientists",
      "Workers",
      "Security/military",
      "Colonial leadership"
    ],
    // Colony Allegiance (3D6) - two location columns.
    colonyAllegiance: [
      { roll: "3-4", icsc: "Kelland Mining", americanAngloJapanese: "Kelland Mining" },
      { roll: "5", icsc: "GeoFund Investor", americanAngloJapanese: "GeoFund Investor" },
      { roll: "6", icsc: "Gustafsson Enterprise", americanAngloJapanese: "Gustafsson Enterprise" },
      { roll: "7-8", icsc: "Seegson", americanAngloJapanese: "Weyland-Yutani" },
      { roll: "9", icsc: "No allegiance (independent)", americanAngloJapanese: "Seegson" },
      { roll: "10-12", icsc: "Jingti Long Corporation", americanAngloJapanese: "Government representative" },
      { roll: "13", icsc: "Chigusa Corporation", americanAngloJapanese: "Chigusa Corporation" },
      { roll: "14", icsc: "Lasalle Bionational", americanAngloJapanese: "Lasalle Bionational" },
      { roll: "15", icsc: "Lorenz SysTech", americanAngloJapanese: "Jingti Long Corporation" },
      { roll: "16", icsc: "Gemini Exoplanet", americanAngloJapanese: "Gemini Exoplanet" },
      { roll: "17-18", icsc: "Farside Mining", americanAngloJapanese: "Farside Mining" }
    ],
    // Campaign Hooks (D66) - order 11..66.
    campaignHooks: [
      "Pilfering and thefts force security to search rooms and lockers.",
      "Incidents of sabotage are increasing - security suspects an organized campaign.",
      "Colonial Administration is investigating the colony for illegal practices.",
      "Colonists returning to base report sighting a 'monster' on the surface.",
      "Petty crime, thefts and sabotage are rife.",
      "Equipment failure has resulted in rationing at the colony. Tempers are frayed.",
      "A ship recently arrived with some kind of parasite that will soon spread through the colony.",
      "Stolen goods are on offer - cheap!",
      "Unbeknownst to you, an old friend/flame is at the colony.",
      "Unbeknownst to you, an old enemy/rival is at the colony.",
      "A minor dignitary/notable is visiting in the company of several aides or guards.",
      "Part of the colony is off-limits temporarily - no reason given.",
      "Sudden restriction on free movement, unless you can find a way to avoid it.",
      "An emergency means repair parts and vital supplies are being shipped in from a nearby colony.",
      "Local crisis about to hit (storm, earthquake, riot, fire, etc.).",
      "Period of solar flare - will cut communications for 2D6 hours (2D6 days if star type MV).",
      "Spies from a neighboring colony have been discovered and arrested.",
      "Operations manager and his deputy are in conflict; everyone is choosing sides.",
      "PCs are invited to a formal dinner, meeting or party.",
      "The local colonists are not what they seem.",
      "A military ship is in orbit and the landing party is searching for someone/something.",
      "A rival colony or corporation is about to carry out an act of sabotage.",
      "The spaceport is currently quarantined.",
      "Security situation at the colony.",
      "A bunch of asteroid miners causing trouble while on leave.",
      "Mystery ship landed at the spaceport.",
      "Civil unrest is about to break out.",
      "Colonists are trapped and need rescuing far from the settlement itself.",
      "Authorities have just locked down the colony after a riot.",
      "A religious leader is whipping up discontent.",
      "PCs will be harassed by angry locals. Why the anger? And why directed at off-world personnel?",
      "An expedition is being assembled for a trek overland - the PCs are invited.",
      "An important colonial official is murdered, only an hour after you arrive.",
      "Several colonists have gone missing - a search is underway.",
      "A lifeboat has crashed on planet and contained an interesting individual.",
      "The corporation or government paying for the colony keeps ordering teams out to search remote areas - but won't say what they are searching for."
    ]
  },

  // ---- STAR SYSTEM GENERATOR (p.243) ----
  starSystem: {
    // System Objects - how many of each body type. Roll the number formula, apply star modifiers.
    objects: [
      { object: "Gas Giants", number: "D6-1", modifiers: "-1 if subgiant, -4 if white dwarf" },
      { object: "Terrestrial Planets", number: "D6", modifiers: "-3 if red dwarf, -3 if white dwarf" },
      { object: "Ice Planets", number: "D6+1", modifiers: "-1 if subgiant, -1 if giant, -1 if white main sequence" },
      { object: "Asteroid Belts", number: "D6-3", modifiers: "-2 if white dwarf, -2 if subgiant" }
    ],
    // Gas Giant features (D6). A gas giant has D6+4 significant moons.
    gasGiants: [
      "Storms",
      "Single super storm",
      "Rings",
      "High winds",
      "Intense radiation fields",
      "Small gas giant"
    ],
    // Asteroid Belt features (D6).
    asteroidBelts: [
      "Bright and highly visible",
      "High orbital inclination",
      "Dust belt",
      "Contains several large dwarf planets",
      "Very wide - covering several orbits",
      "Intensely mineral rich asteroids"
    ]
  },

  // ---- JOB GENERATOR (pp.244-251) ----
  // Setup: System = D6-1 (distance in jumps; 0 = same system). Difficulty = D3 (number of complications).
  // Payment = (System + Difficulty) x number of PCs x $1,000.
  jobs: {
    // Cargo Runs (space trucker frame, pp.244-246)
    cargo: {
      employer: [
        { roll: "11-16", result: "Colony representative" },
        { roll: "21-24", result: "Colonial Administration" },
        { roll: "25-36", result: "Mining representative (D6: 1-2 Chigusa, 3 Weyland-Yutani, 4 Gorham, 5 Kelland Mining, 6 Farside Mining)" },
        { roll: "41-43", result: "Shipping Corporation" },
        { roll: "44-46", result: "USCMC Colonel or other military officer" },
        { roll: "51-52", result: "Wealthy Individual" },
        { roll: "53-56", result: "Geofund (or other group of investors)" },
        { roll: "61-66", result: "Major corporation (D66: 11-13 Alphatech, 14-16 Chigusa, 21-23 Gemba, 24-26 Jingti Long, 31-33 Lorenz, 34-36 Lockmart, 41-43 Seegson, 44-46 Lasalle Bionational, 51-53 Gemini Exoplanet, 54-66 Weyland-Yutani)" }
      ],
      bonusRewards: [
        { roll: "11-13", result: "Discount on new cargo" },
        { roll: "14-16", result: "New, guaranteed contract" },
        { roll: "21-46", result: "Additional financial bonus" },
        { roll: "51-53", result: "Ship module/feature" },
        { roll: "54-56", result: "Faction contact" },
        { roll: "61-66", result: "Debt cancellation (or credit granted)" }
      ],
      cargo: [
        { roll: "11-12", result: "Industrial Gases. Propylene, acetylene, propane, ethyl-formate, chlorofluorocarbon, ammonia, carbon monoxide, ethylene oxide, hydrogen chloride, sulfur dioxide, sulfur hexafluoride" },
        { roll: "13-14", result: "Metal Ingots Or Pellets. Gold, platinum, palladium, silver, tungsten, copper, iron, etc." },
        { roll: "15-16", result: "Colonists. Humans in stasis, ready to begin a colonization project" },
        { roll: "21", result: "Timber. Exotic alien tree products destined for Earth" },
        { roll: "22", result: "Ice/Water. Water, water ice or some other rare frozen solution" },
        { roll: "23", result: "Industrial Chemicals. Aluminum chloride, aluminum sulfate, calcium acetate, monosodium phosphate, ferric sulphate, sodium hydroxide, hydrochloric acid, sodium aluminate, polyaluminum chloride, ferrous chloride, borate, potassium acetate etc." },
        { roll: "24", result: "Fertilizer. Multi-nutrient fertilizer compounds made up of nitrogen, potassium and/or phosphate" },
        { roll: "25-26", result: "Oil. Crude oil, or liquid petroleum by-products" },
        { roll: "31-32", result: "Foodstuff. Bulk foods such as chickpeas, soybeans and other legumes, grains (corn, barley, rice, wheat) or refined versions thereof" },
        { roll: "33-36", result: "Ore. Bauxite (aluminum), galena (lead), pentlandite (nickel), gold-quartz, cassiterite (tin), malachite (copper), magnetite (iron), platinum-bearing sand, trimonite (tungsten)" },
        { roll: "41", result: "Medicinal Goods. Vaccines, medicines, disinfectants, surgical gear, scanning machines, hospital beds" },
        { roll: "42-43", result: "Technical Parts. Different makes and types, for suits, refineries, vehicles, power stations, hospitals, prospecting gear, factories, atmospheric processors, weaponry or life support systems" },
        { roll: "44-45", result: "Starship Technical Parts. Modules, features, parts for/from dismantled ships" },
        { roll: "46", result: "Pressure Suits. Space suits for delivery to the colonies" },
        { roll: "51", result: "Single Oversized Item. Wind turbines, power station generator, space station hull frame, solar panel assembly, drilling machinery, ore processing mill or furnace" },
        { roll: "52", result: "Vehicles. Diggers, tractors, quad-tracks, all-terrain vehicles, power loaders" },
        { roll: "53-54", result: "Weapons & Armor. Firearms, ammunition and armor for the colonies or remote stations" },
        { roll: "55-56", result: "Radioactives. Processed uranium cakes or uranium dioxide powder, or fusion plant fuel pellets such as deuterium, tritium, protium or helium-3" },
        { roll: "61-62", result: "Colony Construction. Beams, modules, airlocks, outer shells, roofing material, etc." },
        { roll: "63", result: "Animal Feed. Feed concentrates containing grains, high-protein oil meals and byproducts of sugar beet and sugarcane processing" },
        { roll: "64-65", result: "Livestock/Animals. Cattle in stasis, ready for rearing on an off-world colony" },
        { roll: "66", result: "Wreckage/Salvage. Shuttle, or escape/cargo pod requiring investigation and study" }
      ],
      destination: [
        { roll: "11-13", result: "Only Coordinates. Coordinates for an area in deep space." },
        { roll: "14-16", result: "Hostile Forest/Jungles/Desert. Landing site is planet-side wilderness, far from human habitation, or on an uninhabited world." },
        { roll: "21-26", result: "Mine. A mining facility, far from a colony or starport." },
        { roll: "31-33", result: "Spaceport. Spaceport on an asteroid or moon, or a landing field near a larger settlement." },
        { roll: "34-36", result: "Asteroid/Moon. The surface of an asteroid or a smaller moon. Vacuum or dangerous atmosphere." },
        { roll: "41-43", result: "Space Station. An orbiting space station." },
        { roll: "44-46", result: "Earth, Gateway Station. The busy hub of interstellar traffic and commerce." },
        { roll: "51-53", result: "Young Colony. A small colony with only a few hundred inhabitants." },
        { roll: "54-56", result: "Established Colony. A busy colony with several thousand people and a thriving, local industry." },
        { roll: "61-63", result: "Starship. A starship in orbit, awaiting your arrival (D6: 1 M-Class Starfreighter, 2 G-Class Deep Space Salvage Vessel, 3 M-Class Commercial Towing Vehicle, 4 M-Class Commercial Transport Ship, 5-6 Other type of vessel)." },
        { roll: "64-66", result: "Outpost. A small outpost, usually planet side. Commonly just a single complex with a specific function; corporate, military or scientific." }
      ],
      complications: [
        { roll: "11-13", result: "Embargo/Quarantine. The destination is placed under ICC quarantine or an embargo." },
        { roll: "14-16", result: "Intermission. MU/TH/UR brings the ship out of hyperspace early, and then wakes the crew." },
        { roll: "21-26", result: "Military. A Conestoga frigate, or other military ship, sends over a small search party for a 'routine' security check. Should the PCs be worried?" },
        { roll: "31-33", result: "Delay. There is a delay in lift-off/undocking; fuel or coolant cannot be pumped aboard, or there may be a strike, an administrative hold-up or loading equipment may have broken down." },
        { roll: "34-43", result: "Maintenance. A critical part (drive pump, plasma coil, coolant pump, water recycler, gravity compensator control unit, sensor gimbal motor, etc.) requires replacement before it fails, requiring most of the crew's participation." },
        { roll: "44-53", result: "Waiting Game. Problems at the destination mean they aren't ready to accept the cargo. Can the crew help speed things along?" },
        { roll: "54-56", result: "Cargo Mishap. There is a serious problem with the cargo, either moving, leaking, over-heating or catching fire." },
        { roll: "61-66", result: "Wreckage. A small piece of wreckage is spotted on the sensor scope - a cargo container, EEV, frozen corpse, part of a starship, etc." }
      ]
    },

    // Military Missions (colonial marines frame, pp.247-249)
    military: {
      // Bonus Rewards (D6) - for mercenary outfits, not employed USCMC personnel.
      bonusRewards: [
        { roll: "1", result: "Faction contact" },
        { roll: "2", result: "Ship module" },
        { roll: "3-4", result: "New gear" },
        { roll: "5-6", result: "New weapon" }
      ],
      mission: [
        { roll: "11-13", result: "Recon. Scout a location, gathering intelligence and then reporting back." },
        { roll: "14-15", result: "Assault. Attack and hold an objective by force." },
        { roll: "16-21", result: "Defense. Defend a location/person/group and repel any attack until relieved or until a set time." },
        { roll: "22-23", result: "Combat patrol. Patrol an area, looking for signs of the enemy - then attack." },
        { roll: "24-26", result: "Sabotage. Infiltrate an enemy location and destroy a key asset (bridge, uplink tower, radar dish, etc.)." },
        { roll: "31-32", result: "Raid. Create chaos and destruction by attacking targets of opportunity behind enemy lines." },
        { roll: "33-35", result: "Search And Rescue. Search for a downed pilot, lost colonists, etc." },
        { roll: "36-42", result: "Peacekeeping. Quell a riot, re-establish order and protect lines of communication and essential services until authority can be restored." },
        { roll: "43-46", result: "Bug Hunt. Exterminate local alien life that is threatening colonists on an off-world planet." },
        { roll: "51-52", result: "Civil Evacuation. A colonial or space station population needs immediate rescue from a crisis or natural catastrophe." },
        { roll: "53-54", result: "Space Assault. A space station, orbital platform or starship must be captured (or recaptured) by boarding and seizure." },
        { roll: "55", result: "Space Traffic Security. The marines are aboard a Conestoga frigate that makes customs and security checks on civilian ships in the area, looking for drugs, illegal goods, arms, workers being trafficked etc." },
        { roll: "56-62", result: "Snatch And Grab. Locate and seize an item, person or group from behind enemy lines. It may be hostages, POWs, an enemy commander or a piece of high technology." },
        { roll: "63-66", result: "Investigation. A station, colony or installation is not responding to Network communications. Investigate." }
      ],
      destination: [
        { roll: "11-23", result: "Colony. Either an established or young colony." },
        { roll: "24-26", result: "Isolated Outpost. A research station or remote military outpost." },
        { roll: "31-32", result: "Starship In Orbit. An enemy ship, or an abandoned ship." },
        { roll: "33-34", result: "Orbital Space Station. A transfer station, space colony or orbital survey platform." },
        { roll: "35-36", result: "Wilderness Location. Far from civilization, a remote spot on a planetary surface." },
        { roll: "41-43", result: "Planetary Warzone. An active warzone, fought between colonies, corporations or nation states, with ruined buildings, wrecked vehicles and fortifications." },
        { roll: "44-46", result: "Isolated Spaceport. A landing field far from any colony, owned by a corporation, individual or military." },
        { roll: "51-52", result: "Scattered Homesteads. Colonial farmsteads, remote from civilization and scattered across the planetary surface." },
        { roll: "53-55", result: "Mine And Refinery. A huge mining and refining complex, with hundreds of workers and executives." },
        { roll: "56-61", result: "Prison Complex. Remote penal colony, housing hardened and violent inmates." },
        { roll: "62-63", result: "Radar/Sensor Site. An automated sensor site, perhaps with its own defenses." },
        { roll: "64-66", result: "Impenetrable Area. Harsh, inhospitable wilderness location such as thick jungles, deep caverns or volcanic lava fields." }
      ],
      complications: [
        { roll: "11-12", result: "Role Reversal. The marines find out that the bad guys are actually good guys." },
        { roll: "13-15", result: "Passengers. During the mission, the marines may find themselves saddled with enemy prisoners or innocent civilians that they must now guard/protect." },
        { roll: "16", result: "Observer. The team is saddled with a senior officer or a reporter from The Colonial Times, who gets in the way and asks stupid questions." },
        { roll: "21-23", result: "Company Meddling. A corporate representative joins the team and is there to ensure the company's assets and interests are protected." },
        { roll: "24-25", result: "Civilian Advisor. Technical knowledge or on-site advice is provided by a civilian advisor who has little knowledge of military operations. They may get scared or panic easily." },
        { roll: "26-32", result: "Captured. An NPC or even a PC is captured by hostile forces." },
        { roll: "33-36", result: "Gear Problems. The team has faulty gear. It could be anything from ammo or weapons to sensors or vehicles." },
        { roll: "41-44", result: "Tough Resistance. The opponents are far tougher and more ruthless than expected." },
        { roll: "45-46", result: "Trapped. During the mission, the team discovers that it is completely trapped, either physically, or tactically." },
        { roll: "51-53", result: "Under Fire! The mission location is hit by an airstrike, mines, or heavy weapons - triggered by the enemy, or, if they are unlucky, by their own forces!" },
        { roll: "54-55", result: "Glory Hound. A new commanding officer, a lieutenant, is keen to get himself a medal or commendation, and pushes the marine squad into perilous situations. Someone is going to get killed!" },
        { roll: "56-62", result: "Traps. There are hidden dangers across the mission site, varying with the nature of the location. They may be mines, IEDs, predatory carnivorous plants or improvised booby traps." },
        { roll: "63-64", result: "Restrictions. There are tactical restrictions placed on the mission - how the squad acts, where it can go, what weapons it can use, etc." },
        { roll: "65-66", result: "Green Commander. A new platoon commander is a green, untested and untried lieutenant. He's read the books, survived the training and ran the simulations - but he'll go to pieces once the bullets start flying." }
      ]
    },

    // Expeditions (frontier colonists frame, pp.250-251)
    expedition: {
      sponsors: [
        { roll: "11-16", result: "Colonial Administration" },
        { roll: "21-26", result: "Scientist" },
        { roll: "31-36", result: "Geofund (or other group of investors)" },
        { roll: "41-46", result: "Major corporation (D66: 11-13 Alphatech, 14-16 Chigusa, 21-23 Gemba, 24-26 Jingti Long, 31-33 Lorenz, 34-36 Lockmart, 41-43 Seegson, 44-46 Lasalle Bionational, 51-53 Gemini Exoplanet, 54-66 Weyland-Yutani)" },
        { roll: "51-56", result: "Mining corporation (D6: 1 Chigusa, 2-3 Weyland-Yutani, 4 Gorham Mining, 5 Kelland Mining, 6 Farside Mining)" },
        { roll: "61-66", result: "Government representative (D6: 1-2 Three World Empire, 3-5 United Americas, 6 Independent Core Systems Colonies (ICSC))" }
      ],
      // Bonus Rewards (D6)
      bonusRewards: [
        { roll: "1-2", result: "Ship module" },
        { roll: "3-4", result: "Gear" },
        { roll: "5-6", result: "Knowledge to use or sell" }
      ],
      mission: [
        { roll: "11-16", result: "Salvage. Locate an abandoned or destroyed ship, station or planetary facility. Recover items of value and avoid the wreck's fate..." },
        { roll: "21-24", result: "Survey. Map a location or an area for the employer. Report back with sensor maps and other collected data." },
        { roll: "25-32", result: "Mining. Begin test-mining to determine the viability for later investors. The substance recovered may be cobalt, gold, tungsten, oil, natural gas, lead or something else." },
        { roll: "33-36", result: "Colony Assistance. Assist a start-up colony with gear, information or expert knowledge about surface exploration, medicine, prospecting, construction or something else." },
        { roll: "41-45", result: "Prospecting. Command a prospecting expedition or secure a claim somewhere. It could be mining, asteroid harvesting, logging or gas trawling." },
        { roll: "46-52", result: "Data Collection. Find a specific piece of information for the employer. Sometimes, the group does not know the intended use of the information." },
        { roll: "53-55", result: "Courier. Make sure sensitive information, resources or goods are delivered safely from the employer to the receiver - without delay." },
        { roll: "56-62", result: "Anomaly Exploration. A unique phenomenon requires speedy investigation - is it a threat, or something that can be exploited for profit? It may be a wormhole, gravity lens, powerful radiation emission or other anomaly." },
        { roll: "63-66", result: "Rescue Expedition. Rescue a group, colony, survey expedition or correspondents from an attack or some other peril. Often, the PCs will be unaware of the fate of the missing victims." }
      ],
      destination: [
        { roll: "11-14", result: "Abandoned Orbital Station. Forgotten, abandoned, barely operative, drifting." },
        { roll: "15-21", result: "Rogue Asteroid. A fast-moving interstellar asteroid or planet passing through a star system." },
        { roll: "22-24", result: "Abandoned Mine. A failed Kelland mining project with tunnels and buildings, now abandoned and decayed." },
        { roll: "25-31", result: "Moon. The rocky moon of a gas giant or planet." },
        { roll: "32-35", result: "Asteroid Belt. An asteroid that sits deep within a complex and dense asteroid belt." },
        { roll: "36", result: "Colonized World. The target area sits in wilderness on a world that already contains colonists." },
        { roll: "41-43", result: "Terrestrial Planet. The target area sits on an uninhabited terrestrial planet." },
        { roll: "44", result: "Abandoned Colony. A failed colony with buildings and structures abandoned and decaying." },
        { roll: "45-51", result: "Ice Planet. The target area sits on an uninhabited ice planet." },
        { roll: "52-63", result: "Wreckage. The smashed wreckage of a spacecraft (D6: 1 M-Class Starfreighter, 2 G-Class Deep Space Salvage Vessel, 3 M-Class Commercial Towing Vehicle, 4 M-Class Commercial Transport Ship, 5-6 Other type of vessel). Roll on the destination table again for its current location." },
        { roll: "64-66", result: "Outpost. A small outpost, usually planet side. Commonly just a single complex with a specific function; corporate, military or scientific." }
      ],
      complications: [
        { roll: "11-21", result: "Natural Phenomenon. Some severe natural event occurs during the mission: a rapid temperature change, forest fire, hurricane, tsunami, earthquake, mudslide, etc." },
        { roll: "22-32", result: "Survey Blues. The target area is either difficult to locate, or difficult to survey safely or efficiently." },
        { roll: "33-35", result: "Presumed Missing. If the PCs gained a permit to survey their target area, they may or may not realize it is inherited from a previous expedition that vanished without a trace." },
        { roll: "36-44", result: "Rival Expedition. A competing party has the same goal as the expedition and tries to get there first or stop the PCs. They have roughly the same gear as the PCs." },
        { roll: "45-52", result: "Quarantine. The target area is under quarantine or off-limits, possibly for reasons unknown. The expedition has no permit and will be breaking the law if they choose to proceed." },
        { roll: "53-62", result: "Deadly Treasure. Some terrible object(s) exist in the target area, unbeknownst to the PCs. This deadly find may be nuclear waste, a dump of biological weapons, a nest of xenomorph eggs or something equally horrific and life-threatening!" },
        { roll: "63-66", result: "Surveillance. The expedition is under surveillance by the military, government or some other party. They will not intervene, although they may communicate their presence to the team. Why are they watching? What do they really want?" }
      ]
    }
  },

  // ---- PLOT TWISTS (p.252) ----
  plotTwists: [
    { roll: "11-15", result: "Mayday. Before (or after) the starship is in hyperspace, the crew receive a distress signal and are obligated by law to assist. Alternatively, the call may come whilst on-planet." },
    { roll: "16-22", result: "Bad Intel. Key mission information will prove false or misleading." },
    { roll: "23-25", result: "Sabotage. MU/TH/UR malfunctions - there is a fire, or an explosive decompression. It soon turns out to be sabotage, but who is the saboteur?" },
    { roll: "26-35", result: "Secret Plot. NPCs or PCs in the game have another agenda that runs counter to that of the players and are busy working on it." },
    { roll: "36-43", result: "Murder. An NPC is suddenly murdered. Who did it? Why?" },
    { roll: "44-46", result: "Flare Event. A burst of stellar radiation reaches the PCs location from a red dwarf flare star, a distant neutron star or other phenomenon. This could cause power interruptions, or at the very least complete communications blackouts." },
    { roll: "51-55", result: "Malfunction. A key component to the mission fails when needed - an airlock or drive, a demolitions charge or diamond cutting drill. What now?" },
    { roll: "56-64", result: "Time Limit. The mission has a deadline; lives (perhaps their own) depend on it." },
    { roll: "65-66", result: "Xenomorph Outbreak. At the heart of this scenario is the presence of the Xenomorph XX121. It may be one egg or dozens, or the massacred remains of an unfortunate group of humans with a Xenomorph warrior still on the prowl. Good luck..." }
  ],

  // ---- ENCOUNTERS (pp.252-256) ----
  encounters: {
    // Star System Encounters (D66). Modify tens digit: Outer Rim/Frontier -3; Uncharted Space -5. 0 or less = no encounter.
    starSystem: [
      { roll: "<10", result: "No encounter" },
      { roll: "11", result: "Research vessel" },
      { roll: "12", result: "Asteroid drill ship" },
      { roll: "13", result: "Small survey ship" },
      { roll: "14", result: "M-class commercial starfreighter" },
      { roll: "15", result: "Military recon craft" },
      { roll: "16", result: "Private executive transport" },
      { roll: "21", result: "M-class commercial transport ship" },
      { roll: "22", result: "Light shuttle" },
      { roll: "23", result: "G-class deep space salvage vessel" },
      { roll: "24", result: "Liquefied gas transport" },
      { roll: "25", result: "M-class commercial towing vehicle (towing what?)" },
      { roll: "26", result: "G-class deep space salvage vessel" },
      { roll: "31", result: "M-class commercial starfreighter" },
      { roll: "32", result: "Colony supply vessel" },
      { roll: "33", result: "Refinery platform (automated)" },
      { roll: "34", result: "G-class deep space salvage vessel" },
      { roll: "35", result: "Conestoga frigate on patrol" },
      { roll: "36", result: "G-class deep space emergency response vessel" },
      { roll: "41", result: "Military heavy missile cruiser" },
      { roll: "42", result: "M-class commercial towing vehicle (not towing anything)" },
      { roll: "43", result: "Heavy shuttle" },
      { roll: "44", result: "Fast courier vessel" },
      { roll: "45", result: "M-class commercial transport ship" },
      { roll: "46", result: "Large space-station" },
      { roll: "51", result: "Light tugship" },
      { roll: "52", result: "Starcub shuttle" },
      { roll: "53", result: "M-class commercial transport ship" },
      { roll: "54", result: "Communications relay station" },
      { roll: "55", result: "UD-4 dropship in orbit" },
      { roll: "56", result: "Starcub shuttle" },
      { roll: "61", result: "Customs cutter" },
      { roll: "62", result: "Heavy shuttle" },
      { roll: "63", result: "Conestoga frigate on operations" },
      { roll: "64", result: "Corporate space-station" },
      { roll: "65", result: "Private security cutter" },
      { roll: "66", result: "Mobile construction rig" }
    ],
    // Ship Reactions (2D6)
    shipReactions: [
      { roll: "2", result: "Unusual. May be on an unusual trajectory, have the registration of a missing ship or simply refuse to respond to the PCs' signals." },
      { roll: "3-4", result: "Dismissive. If asked for information or assistance, the ship will decline." },
      { roll: "5-8", result: "Radio Silence. Ignores the PCs' ship, but polite if contacted." },
      { roll: "9-10", result: "Friendly. May pass on information or advice, if relevant." },
      { roll: "11", result: "Assistance. May request information, or ask for assistance or a spare part etc." },
      { roll: "12", result: "Familiar Vessel. The ship is known to you, you may even know the crew." }
    ],
    // Surface Encounters (3D6) - separate columns for uninhabited vs colonized worlds. "-" = no result.
    surface: [
      { roll: "3-5", uninhabited: "Temperature Swing. On a cold world, temperatures will drop dramatically. On a hot world they will rise.", colonized: "Temperature Swing. On a cold world, temperatures will drop dramatically. On a hot world they will rise." },
      { roll: "6-7", uninhabited: "Unstable Ground. Ice, soft sand, swamp or other tricky ground.", colonized: "Unstable Ground. Ice, soft sand, swamp or other tricky ground." },
      { roll: "8", uninhabited: "Diversion. An escarpment, canyon or other feature forces the PCs in an undesirable direction for a shift.", colonized: "Diversion. An escarpment, canyon or other feature forces the PCs in an undesirable direction for a shift." },
      { roll: "9", uninhabited: "Cross A Ravine/River. A ravine or river can be negotiated with great care, but it takes D6 hours and some tense moments.", colonized: "Cross A Ravine/River. A ravine or river can be negotiated with great care, but it takes D6 hours and some tense moments." },
      { roll: "10", uninhabited: "Rough Terrain. Rocky ground or thick vegetation slows travel to half speed for a shift.", colonized: "Rough Terrain. Rocky ground or thick vegetation slows travel to half speed for a shift." },
      { roll: "11", uninhabited: "-", colonized: "-" },
      { roll: "12", uninhabited: "-", colonized: "Wildcatters. Prospectors in a single tractor." },
      { roll: "13", uninhabited: "-", colonized: "Mining Operation. Temporary drilling or mining operation." },
      { roll: "14", uninhabited: "-", colonized: "Lone Colonist. On foot or in a vehicle." },
      { roll: "15", uninhabited: "-", colonized: "Scientists. In a vehicle, studying some natural phenomenon, plant-life or geology." },
      { roll: "16", uninhabited: "-", colonized: "Abandoned Kit. Useless, valuable or wrecked..." },
      { roll: "17-18", uninhabited: "-", colonized: "Explorers. In a vehicle, mapping the local area and cataloging what they find." }
    ],
    // General Colony Encounters (D66, extends to 76). Add +1 to the tens digit if the colony is established.
    colony: [
      { roll: "11", result: "Rowdy miners" },
      { roll: "12", result: "Technicians making repairs" },
      { roll: "13", result: "Exhausted workers arriving" },
      { roll: "14", result: "Workers preparing to leave" },
      { roll: "15", result: "Supplies being delivered" },
      { roll: "16", result: "Colony workers off-duty" },
      { roll: "21", result: "Family off-duty together" },
      { roll: "22", result: "Medical crisis" },
      { roll: "23", result: "Colony manager and deputy" },
      { roll: "24", result: "Loud argument" },
      { roll: "25", result: "Drunken revelers" },
      { roll: "26", result: "Kids playing" },
      { roll: "31", result: "Administrator making the rounds" },
      { roll: "32", result: "Colonial Marshal conducting an investigation" },
      { roll: "33", result: "Cocky shuttle pilot" },
      { roll: "34", result: "Unhappy off-world official" },
      { roll: "35", result: "Sly corporate representative" },
      { roll: "36", result: "Harassed chief engineer" },
      { roll: "41", result: "Scientists debating" },
      { roll: "42", result: "Drug deal in progress" },
      { roll: "43", result: "Overhear gossip" },
      { roll: "44", result: "Colonist threatening another" },
      { roll: "45", result: "Corporate investigator" },
      { roll: "46", result: "Miners relaxing" },
      { roll: "51", result: "Colony damage needing repair" },
      { roll: "52", result: "Operations team having a discussion" },
      { roll: "53", result: "Computer engineers at work" },
      { roll: "54", result: "Unattended supplies" },
      { roll: "55", result: "Maintenance crew" },
      { roll: "56", result: "Marshal searching or arresting a suspect" },
      { roll: "61", result: "Visitors from another colony" },
      { roll: "62", result: "Security cordon" },
      { roll: "63", result: "Mysterious scientist" },
      { roll: "64", result: "Management meeting" },
      { roll: "65", result: "Helpful android" },
      { roll: "66", result: "Cleaning crew" },
      { roll: "71", result: "Starship crew off-duty" },
      { roll: "72", result: "Thugs" },
      { roll: "73", result: "Security patrol" },
      { roll: "74", result: "Colonial official with entourage" },
      { roll: "75", result: "Accident in progress" },
      { roll: "76", result: "Colonists on strike or protesting" }
    ]
  },

  // ---- SHORE LEAVE (pp.257-258) ----
  shoreLeave: {
    // Shore Leave Events, Colonial Marines (D66)
    colonialMarines: [
      { roll: "11-13", result: "The gym on the base is quiet, the PCs have it all to themselves." },
      { roll: "14-16", result: "Asked to do a favor for a Marine in another platoon. They will pay the PC $300 but there might be a catch." },
      { roll: "21-23", result: "A fight breaks out and a PC is involved. What was it about?" },
      { roll: "24-26", result: "A base logistics sergeant is selling some officer's luxuries at a discount. Roll D6. 1-2: They got away with it. 3-4: Logistics are investigating the theft. 5-6: They stole it from one of the other companies, and they know." },
      { roll: "31-33", result: "There is an accident and a PC is hurt. How? Was it their fault?" },
      { roll: "34-36", result: "There is an official ceremony on the base, and everyone must wear their dress uniforms." },
      { roll: "41-44", result: "An old friend arrives. Roll D6. 1-2: They are in debt. 3-4: They are in trouble. 5-6: They offer the PCs a way to make some money." },
      { roll: "45-46", result: "The PCs' lieutenant might be replaced. Roll D6. 1-2: They are being promoted. 3-4: They are in big trouble (not their fault). 5-6: They're in big trouble (and it's definitely their own fault). What did they do?" },
      { roll: "51-53", result: "A senior NCO has got it in for the PCs' platoon and makes life difficult during shore leave." },
      { roll: "54-56", result: "The base commander cancels the PCs' platoon's shore leave, with immediate effect. What has your unit done to deserve this punishment?" },
      { roll: "61-63", result: "There is training scheduled, and as a reward for completion, the instructor gives out tickets for laser tag, a movie or a gym session at the base." },
      { roll: "64-66", result: "A member of the platoon is marking a special occasion and invited everyone to an informal dinner, with a speech. Roll for a social encounter." }
    ],
    // Shore Leave Events, Others (D66)
    others: [
      { roll: "11-13", result: "The PCs get a hotel upgrade, with executive-level luxury." },
      { roll: "14-16", result: "The PCs get offered a side job that will take a couple of days and pay D6 x $200, but is it legal?" },
      { roll: "21-23", result: "Asteroid miners are in port all week causing trouble for port officials, other travelers ... and the PCs." },
      { roll: "24-26", result: "There is a ceremony or celebration at the location." },
      { roll: "31-33", result: "Red tape - the PCs' papers contain irregularities. Can they negotiate or bribe their way out of this mess?" },
      { roll: "34-36", result: "One of the PCs' skills is recognized by a port employee. They have a problem that needs resolving - could the PC help them with it for D6 x $200?" },
      { roll: "41-44", result: "The PCs overhear some interesting scandal about a local official, leader, corporate executive or gangster. What do they do with that knowledge?" },
      { roll: "45-46", result: "A ship known to the PCs has limped into port this week with damage and crew casualties. What happened?" },
      { roll: "51-53", result: "A thief has targeted the PCs and unless spotted, will get away with their valuables (on their person, or from their room)." },
      { roll: "54-56", result: "The PCs find themselves with a group of locals and gain useful information." },
      { roll: "61-63", result: "The PCs are offered some local commodity, object or material that can be purchased for D6 x $400, and sold at any other world with a 50% profit. Roll a stress die - on a 1 or Panic symbol, this is a scam." },
      { roll: "64-66", result: "The PCs find some kind of haven - a local beauty spot, an unused lounge, a little-known bar or restaurant. This brings the PCs peace and tranquility and is a great place to hide away." }
    ]
  },

  // ---- MOTHER ANALYSIS & ANSWER MATRICES (Last Survivor solo oracle, pp.293-296) ----
  oracle: {
    // Binary Response Matrix. If yes is likely roll 2d6 keep highest; if no likely keep lowest; else 1d6.
    answers: [
      { roll: "1", result: "Strong no" },
      { roll: "2-3", result: "No" },
      { roll: "4-5", result: "Yes" },
      { roll: "6", result: "Strong yes" }
    ],
    // Complex Response Matrix - Directive column (D66, roll either/both columns).
    complexDirective: [
      "Abandon", "Aid", "Alert", "Ambush", "Attack", "Betray",
      "Breach", "Capture", "Command", "Construct", "Create", "Deliver",
      "Destroy", "Discover", "Escape", "Escort", "Explore", "Heal",
      "Hide", "Hunt", "Infest", "Investigate", "Isolate", "Preserve",
      "Protect", "Quarantine", "Reclaim", "Repair", "Sabotage", "Scavenge",
      "Secure", "Survive", "Threaten", "Transform", "Transport", "Unearth"
    ],
    // Complex Response Matrix - Subject column (D66).
    complexSubject: [
      "Alarm", "Alien", "Android", "Artifact", "Authority", "Cargo",
      "Company", "Computer", "Containment", "Darkness", "Data", "Death",
      "Device", "Environment", "Experiment", "Fear", "Focus", "Gravity",
      "Hostility", "Injury", "Machine", "Message", "Military", "Mission",
      "Organism", "Outbreak", "People", "Planet", "Settlement", "Ship",
      "Supplies", "Time", "Trap", "Violence", "Weapon", "Wreckage"
    ],
    // Danger Event Matrix (p.294). Roll D66 for focus, then 2D6 + danger level for the detail tier.
    danger: [
      { roll: "11", focus: "Adversary", low: "Adversary revealed", mid: "Adversary gains an advantage", high: "Adversary seizes an objective" },
      { roll: "12", focus: "Alarm", low: "Under surveillance", mid: "Security protocols activated", high: "Blaring alarms" },
      { roll: "13", focus: "Alien", low: "Biological evidence", mid: "First contact", high: "Major presence" },
      { roll: "14", focus: "Ally", low: "Ally in danger", mid: "Separated from each other", high: "True identity or motive revealed" },
      { roll: "15", focus: "Android", low: "Malfunctioning or damaged", mid: "Twitchy", high: "Corrupted or destructive" },
      { roll: "16", focus: "Clues", low: "Troubling data", mid: "False leads", high: "Distressing revelation" },
      { roll: "21", focus: "Command", low: "New orders", mid: "Incompetent leaders", high: "Left for dead" },
      { roll: "22", focus: "Comms", low: "Distress signal", mid: "Desperate plea", high: "Comms go quiet" },
      { roll: "23", focus: "Community", low: "Isolated community", mid: "Threatened habitat", high: "Abandoned or destroyed" },
      { roll: "24", focus: "Company", low: "Scheming influence", mid: "Company takes control", high: "True motivation revealed" },
      { roll: "25", focus: "Crew", low: "Squabbling crewmates", mid: "Infighting", high: "Betrayal or abandonment" },
      { roll: "26", focus: "Darkness", low: "Flickering lights", mid: "Hidden danger", high: "Total darkness" },
      { roll: "31", focus: "Enemies", low: "Lone enemy", mid: "Enemy group", high: "Swarming enemies" },
      { roll: "32", focus: "Environment", low: "Minor environmental hazard", mid: "Hostile environment", high: "Environmental disaster" },
      { roll: "33", focus: "Faction", low: "Antagonistic faction revealed", mid: "Faction exerts force or influence", high: "Factions at war" },
      { roll: "34", focus: "Fear", low: "Fears kindled", mid: "Fear overrides logic", high: "Panic takes hold" },
      { roll: "35", focus: "Gear", low: "Depleted or malfunctioning item", mid: "Lost or broken equipment", high: "Vital gear lost or broken" },
      { roll: "36", focus: "Gravity", low: "Zero-G", mid: "Orbital decay", high: "Crushing pressure" },
      { roll: "41", focus: "Infection", low: "Signs of infection", mid: "Quarantined", high: "Sudden outbreak" },
      { roll: "42", focus: "Isolation", low: "Cut off", mid: "Left behind", high: "Outnumbered" },
      { roll: "43", focus: "Machine", low: "Minor malfunction", mid: "Dangerous malfunction", high: "Total failure" },
      { roll: "44", focus: "Military", low: "Minor military presence", mid: "Major intervention", high: "Scorched earth" },
      { roll: "45", focus: "Mission", low: "Minor complication", mid: "Major complication", high: "Mission undone" },
      { roll: "46", focus: "Mutation", low: "Parasitic infestation", mid: "Emerging lifeforms", high: "Body remade" },
      { roll: "51", focus: "Pathway", low: "Treacherous path", mid: "Blocked or sealed path", high: "Deadly path" },
      { roll: "52", focus: "Power", low: "Power fluctuations", mid: "Power fails", high: "Reactor meltdown" },
      { roll: "53", focus: "Science", low: "Mysterious specimen or artifact", mid: "Dangerous experiment", high: "Containment breach" },
      { roll: "54", focus: "Sound", low: "Mysterious sound", mid: "Unsettling sound", high: "Horrifying sound" },
      { roll: "55", focus: "Space", low: "Oppressive void", mid: "Collision course", high: "Celestial catastrophe" },
      { roll: "56", focus: "Spaceship", low: "Damage or malfunction", mid: "Hull breach", high: "Impending destruction" },
      { roll: "61", focus: "Survivors", low: "Strange disappearances", mid: "Casualties", high: "Wiped out" },
      { roll: "62", focus: "Technology", low: "Failing technology", mid: "Sabotaged technology", high: "Rogue technology" },
      { roll: "63", focus: "Time", low: "Wasted time", mid: "Impending deadline", high: "Time runs out" },
      { roll: "64", focus: "Violence", low: "Signs of violence", mid: "Grisly remains", high: "Carnage" },
      { roll: "65", focus: "Weapon", low: "Low ammo", mid: "Ineffective against threat", high: "Lost or destroyed" },
      { roll: "66", focus: "Xenomorph", low: "Facehugger", mid: "Drone or stalker", high: "Queen" }
    ]
  },

  // ---- SCAVENGING MATRICES (Last Survivor, pp.297) ----
  salvage: {
    // Salvage Matrix (D66) - common and rare salvage columns.
    salvage: [
      { roll: "11", common: "Ammo", rare: "Weapon scope" },
      { roll: "12", common: "Bloody jumpsuit", rare: "Vintage watch" },
      { roll: "13", common: "Bolt gun", rare: "Survival suit" },
      { roll: "14", common: "Bottled water", rare: "Surgical kit" },
      { roll: "15", common: "Compression suit", rare: "Stun baton" },
      { roll: "16", common: "Cutting torch", rare: "Stash of recreational drugs" },
      { roll: "21", common: "Data disc", rare: "Stash of hard liquor" },
      { roll: "22", common: "Data tablet", rare: "Rifle" },
      { roll: "23", common: "Dog tags", rare: "Radiation detection kit" },
      { roll: "24", common: "E-series watch", rare: "Pressure suit" },
      { roll: "25", common: "Emergency respirator", rare: "Neuro visor" },
      { roll: "26", common: "Faded photograph", rare: "Muzzle suppressor" },
      { roll: "31", common: "Fire axe", rare: "Motion tracker" },
      { roll: "32", common: "Flares", rare: "Maintenance jack" },
      { roll: "33", common: "Flashlight", rare: "Incinerator unit" },
      { roll: "34", common: "Folded map", rare: "Hidden surveillance device" },
      { roll: "35", common: "Handwritten journal", rare: "Hidden corpse" },
      { roll: "36", common: "Hastily scrawled message", rare: "Hidden access hatch" },
      { roll: "41", common: "Improvised weapon", rare: "Heavy weapon" },
      { roll: "42", common: "Keycard", rare: "Hazmat suit" },
      { roll: "43", common: "Machine parts", rare: "Handwritten access code" },
      { roll: "44", common: "Magnetic tape recorder", rare: "Handheld x-ray" },
      { roll: "45", common: "Magnetic tape cassette", rare: "Grenade" },
      { roll: "46", common: "Medkit", rare: "Grappling gun" },
      { roll: "51", common: "Personal communicator", rare: "Geiger counter" },
      { roll: "52", common: "Personal data transmitter", rare: "Folding winch" },
      { roll: "53", common: "Pharmaceuticals", rare: "Folder of sensitive documents" },
      { roll: "54", common: "Pistol", rare: "Flare pistol" },
      { roll: "55", common: "Power cell", rare: "Explosive charges" },
      { roll: "56", common: "Prefab meal", rare: "Diagnostic device" },
      { roll: "61", common: "Religious symbol", rare: "Coolant canister" },
      { roll: "62", common: "Rope", rare: "Combat knife" },
      { roll: "63", common: "Stash of cigarettes", rare: "Body armor" },
      { roll: "64", common: "Toolkit", rare: "Biological specimen" },
      { roll: "65", common: "Utility knife", rare: "Binoculars" },
      { roll: "66", common: "Voice recorder", rare: "Alien artifact" }
    ],
    // Anomalous Environment Matrix (D66) - order 11..66.
    anomalousEnvironment: [
      "Abandoned gear",
      "Alien vegetation",
      "Altered gravity",
      "Ancient remains",
      "Biological growths",
      "Blood trail",
      "Chitinous surfaces",
      "Cocooned victims",
      "Confounding device",
      "Creeping mist",
      "Dark pit",
      "Discordant noise",
      "Dismantled technology",
      "Dripping ichor",
      "Eerie light",
      "Egg fragments",
      "Empty vessels",
      "Energy field",
      "Enigmatic machine",
      "Etched glyphs",
      "Extreme temperatures",
      "Flickering hologram",
      "Leathery eggs",
      "Mirrored surfaces",
      "Moving architecture",
      "Mutated remains",
      "Organism fused with machinery",
      "Ornate carvings",
      "Pooled liquids",
      "Radioactive hot spot",
      "Remains of intruders",
      "Rotting matter",
      "Sealed cylinders",
      "Strange altar",
      "Unknown tracks",
      "Unnerving shadows"
    ]
  }
};
if (typeof window !== 'undefined') window.ALIEN_GM_TABLES = ALIEN_GM_TABLES;
