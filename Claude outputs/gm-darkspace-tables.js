/* DarkSpace GM Screen tables — sci-fi parallels to the Shadowdark generator
 * data in gm_screen.html. Exposed as window.DS_GM and used by the generators
 * whenever the bestiary source is 'ds', so a DarkSpace GM gets credits, tech
 * salvage, sci-fi NPCs, station locales and ship-scale hazards instead of gold,
 * spell scrolls, taverns and fantasy ancestries. Shapes mirror the SD tables. */
(function () {
  const DS_GM = {};

  // ── NPCs ──────────────────────────────────────────────────────────────────
  DS_GM.names = [
    'Vek Solari', 'Mara Tann', 'Oso Reyes', 'Lyra Voss', 'Dex Kalu', 'Nima Arden',
    'Cael Rho', 'Sable Quon', 'Juno Marsh', 'Orin Vale', 'Kess Drayl', 'Tovi Sarn',
    'Rhea Colm', 'Bexley Ard', 'Sun-Ho Pak', 'Ilya Neko', 'Garrick Voll', 'Ada Ixchel',
    'Zeph Aran', 'Mira Sol', 'Corvin Reyes', 'Tam Okoro', 'Wren Halix', 'Doc Sarris',
    'Nadia Crane', 'Boone Vega', 'Priya Ravel', 'Sixx', 'Unit-7 "Rusty"', 'Echo-9',
    'Halvar Stein', 'Yara N596', 'Cortez Vane', 'Lumen', 'Piotr Volkov', 'Sana Idris',
  ];
  DS_GM.occupations = [
    'Freighter pilot', 'Station dockworker', 'Blackmarket fixer', 'Corporate liaison',
    'Salvage diver', 'Med-tech', 'Cargo broker', 'Bounty hunter', 'Bartender (synth-ale)',
    'Datanet slicer', 'Drive mechanic', 'Colony administrator', 'Smuggler', 'Bio-engineer',
    'Ex-marine', 'Prospector', 'Cult recruiter', 'Ship chaplain', 'Arms dealer',
    'Cybernetics installer', 'Sensor operator', 'Xeno-linguist', 'Debt collector', 'Courier',
  ];
  DS_GM.demeanor = [
    'Twitchy and paranoid', 'Coolly professional', 'Overly friendly', 'Bored and dismissive',
    'Desperate', 'Smug', 'Exhausted', 'Suspicious of outsiders', 'Talks too much',
    'Deadpan', 'Nervously cheerful', 'Cold and calculating', 'Slurring, half-drunk', 'Zealous',
  ];
  DS_GM.quirks = [
    'Constantly cleans a sidearm', 'Refers to their ship like a lover', 'Distrusts all AI',
    'Chews stimsticks nonstop', 'Speaks in trade-pidgin', 'Has a twitchy ocular implant',
    'Names every drone', 'Keeps score of grudges out loud', 'Superstitious about jump-space',
    'Quotes corporate slogans', 'Flinches at loud noises', 'Collects planetary soil samples',
    'Never removes their helmet', 'Laughs at the wrong moments',
  ];
  DS_GM.wants = [
    'Passage off this rock, no questions', 'A rare drive component', 'Someone found and "dealt with"',
    'Protection from a syndicate', 'A data-core decrypted', 'Their debt cleared', 'A missing crewmate',
    'A cargo run nobody will scan', 'Revenge on a corp', 'A cure for a spreading infection',
    'Star-charts to an uncharted system', 'A witness silenced', 'Salvage rights to a derelict',
  ];
  DS_GM.secrets = [
    'Is an undercover corporate agent', 'Owes a fatal debt to a syndicate', 'Is a synthetic passing as human',
    'Sold out their last crew', 'Carries a smuggled alien artifact', 'Is dying and hiding it',
    'Has a bounty on their head', 'Sabotaged the last ship they served on', 'Is a cult sleeper agent',
    'Knows where a lost colony ship drifted', 'Their implants are illegal military tech',
    'Is not who their ID says they are',
  ];
  DS_GM.features = [
    'Chrome dental implants', 'A faded ship-crew tattoo', 'A cybernetic arm, poorly hidden',
    'Burn scars from a hull breach', 'Mismatched optical implants', 'A prosthetic leg that whirs',
    'Void-adapted pallor', 'A neural jack behind the ear', 'Grease permanently under the nails',
    'A holo-tattoo that shifts colour', 'One augmented eye that glows faintly', 'Radiation-bleached hair',
  ];
  DS_GM.clothing = {
    Poor: ['Patched vac-suit liner', 'Threadbare station coveralls', 'Salvaged flight jacket', 'Mismatched surplus gear'],
    Standard: ['Practical flight suit', 'Worn synthleather jacket', 'Corp-issue jumpsuit', 'Layered spacer’s kit'],
    Wealthy: ['Tailored smart-fabric suit', 'Designer exosuit liner', 'Gilded officer’s coat', 'Immaculate corp formalwear'],
  };
  // Credits on hand by wealth band (functions, like SD COIN[])
  DS_GM.coin = {
    Poor: () => `${Math.ceil(Math.random() * 8) + 2} cr`,
    Standard: () => `${(Math.ceil(Math.random() * 6) + 4) * 10} cr`,
    Wealthy: () => `${(Math.ceil(Math.random() * 10) + 10) * 25} cr`,
  };

  // ── Treasure / salvage ──────────────────────────────────────────────────────
  // Tiered credit + salvage results (parallels TREASURE_TIERS).
  DS_GM.treasureTiers = {
    '1': ['2d6 × 10 credits (chits)', '1d6 doses of stimpak', 'A spare energy cell (2)', 'Salvaged toolkit', 'A datachip with local star-charts', 'Ammo magazine ×2'],
    '4': ['4d6 × 10 credits', 'A working sidearm + magazine', 'An intact rebreather', 'Encrypted corporate datacore', 'A vial of rare compound (200 cr)', 'A functioning drone core'],
    '7': ['2d6 × 100 credits', 'A piece of Advanced Tech (roll on Tech)', 'A pristine drive component', 'Black-market cybernetic, boxed', 'An alien relic of unknown function', 'Weapon-grade energy cells ×4'],
    '10': ['1d6 × 1000 credits', 'A prototype weapon', 'A shard of derelict alien tech', 'Ship-grade component (jump-capable)', 'A sealed cryo-pod (occupied?)', 'Two pieces of Advanced Tech'],
  };
  // Tech salvage (parallels MAGIC_ITEM_POOLS entries: {name, desc}).
  DS_GM.techLoot = [
    { name: 'Beam Saber', desc: 'Energy-blade hilt. Light Edged weapon, d12, Armor Piercing. Runs on EC.' },
    { name: 'Dermal Plating', desc: 'Subdermal armour weave: +1 AC. Upgradeable once.' },
    { name: 'Datajack', desc: 'Internal interface; ACC/CTL/NET equal to your INT/WIS/CHA mods.' },
    { name: 'Ballistic Accelerator', desc: 'Projectile-weapon mod: range increases one increment.' },
    { name: 'Focusing Aperture', desc: 'Energy-weapon mod: range increases one increment.' },
    { name: 'Rebreather (mil-spec)', desc: 'Two hours per EC; filters toxins and radiation.' },
    { name: 'Cryotube (portable)', desc: 'Suspends a creature; pauses a death timer while powered.' },
    { name: 'Concussive Wave Emitter', desc: 'Projectile mod: alternate non-lethal Blast mode.' },
    { name: 'Haptic Radar', desc: 'Augmented spatial awareness; ADV to avoid being surprised.' },
    { name: 'Auditory Amplifier', desc: 'ADV on hearing-based checks; DisADV vs sonic damage.' },
    { name: 'Blink Drive (salvaged)', desc: 'Short experimental FTL hop to Far on an Astrogation check.' },
    { name: 'Vision Enhancer', desc: 'Digital binoculars with low-light and thermal modes.' },
  ];
  DS_GM.mundaneLoot = [
    'A crate of ration packs', 'Coil of polymer cable (60 ft)', 'A cracked but readable datapad',
    'Assorted ship fasteners and seals', 'A half-charged energy cell', 'A dead crewmember’s ID chit',
    'Corroded hull plating (scrap value)', 'A box of mismatched ammo', 'An empty medkit',
    'A bag of trade-goods (spices, off-world)', 'A malfunctioning cleaning drone', 'Sealed water reclaim canisters',
  ];
  DS_GM.valuables = [
    { name: 'Refined tritium cell', value: '150 cr' }, { name: 'Iridium ingot', value: '300 cr' },
    { name: 'Data crystal (encrypted)', value: '250 cr' }, { name: 'Cut void-diamond', value: '500 cr' },
    { name: 'Rare-earth spool', value: '120 cr' }, { name: 'Bio-sample vial', value: '400 cr' },
    { name: 'Antique circuit board', value: '90 cr' }, { name: 'Platinum credchit', value: '1000 cr' },
  ];

  // ── Shops / cantinas ────────────────────────────────────────────────────────
  DS_GM.shopNames = {
    Poor: ['Rusty Bolt Salvage', 'Backdeck Surplus', 'The Scrap Heap', 'Last-Chance Outfitters'],
    Standard: ['Orbital Outfitters', 'Tann & Sons Supply', 'Dockside Provisions', 'The Cargo Exchange'],
    Wealthy: ['Meridian Armaments', 'Helix Cybernetics', 'Solari Fine Tech', 'The Gilded Reactor'],
  };
  DS_GM.cantinaNames = {
    Poor: ['The Leaky Airlock', 'Bottom of the Barrel', 'The Rusted Hull', 'Vacuum & Ale'],
    Standard: ['The Drifter’s Rest', 'The Copper Coil', 'The Jump Point', 'The Long Haul'],
    Wealthy: ['The Orbital Lounge', 'The Silver Nebula', 'Zero-G Reserve', 'The Captain’s Table'],
  };
  DS_GM.shopStock = {
    Poor: ['Used energy cell — 3 cr', 'Patched rebreather — 12 cr', 'Ration packs (3) — 5 cr', 'Salvaged multitool — 6 cr', 'Ammo magazine — 3 cr', 'Glowrod — 8 cr', 'Roll of duct-seal — 2 cr'],
    Standard: ['Light pistol — 5 cr', 'Medkit — 20 cr', 'Scanner (handheld) — 50 cr', 'Light armor — 25 cr', 'Communicator — 20 cr', 'StimPak — 10 cr', 'Security kit — 35 cr'],
    Wealthy: ['Energy rifle — 45 cr', 'Energy armor — 100 cr', 'Datajack (install) — 200 cr', 'Hacking interface — 60 cr', 'Ion pistol — 30 cr', 'Vision enhancer — 30 cr', 'Cybernetic part — 250 cr'],
  };
  DS_GM.cantinaMenu = {
    Poor: ['Protein paste — 1 cr', 'Recycled water — free', 'Synth-ale (flat) — 2 cr', 'Nutrient bar — 1 cr', 'Stim-coffee — 2 cr'],
    Standard: ['Vat-grown steak — 6 cr', 'Hydroponic greens — 3 cr', 'Synth-ale (pint) — 4 cr', 'Off-world spirits — 6 cr', 'Fungal stew — 4 cr'],
    Wealthy: ['Real beef, imported — 2 sp equiv (20 cr)', 'Live-tank shellfish — 15 cr', 'Aged void-whiskey — 25 cr', 'Fresh fruit, planet-grown — 12 cr', 'Chef’s tasting flight — 40 cr'],
  };
  DS_GM.rumors = [
    'A freighter went dark near the belt — its transponder still pings.', 'The station AI has been rerouting people who ask about Deck 9.',
    'A syndicate is buying up salvage rights, no questions asked.', 'Someone’s selling military-grade cells cheap. Too cheap.',
    'A colony ship thought lost for decades just re-entered the system.', 'The docking authority is skimming, and one of them wants out.',
    'A derelict cruiser drifted in. Life signs. Nobody’s answering hails.', 'The med-bay had a "containment event" they’re not talking about.',
    'A bounty just tripled on a face you’ve seen at this very bar.', 'Jump-space near the third moon has been "acting wrong."',
  ];

  // ── Events / encounters ─────────────────────────────────────────────────────
  DS_GM.happens = [
    'A hull-breach klaxon blares — then cuts out, unexplained.', 'Gravity flickers off for three seconds, then slams back.',
    'A stranger presses a datachip into your hand and vanishes into the crowd.', 'A drone follows you, recording, and won’t answer.',
    'A firefight erupts two corridors over.', 'The lights die; emergency red bathes everything.',
    'A frantic voice on an open channel begs for help, then static.', 'A pressure door seals behind you with a hiss.',
    'You spot credits scattered across the deck plating.', 'A cloaked figure in a breather-mask is watching you.',
    'Something large thuds against the hull from outside.', 'A malfunctioning servitor bot fixates on your group.',
    'The station shudders — a docking collision, or worse.', 'A smell of ozone rises; a conduit is about to blow.',
    'Someone tries to lift a credchit from your pocket.', 'A quarantine warning strobes across every screen.',
    'An airlock cycles nearby with no one visible.', 'Your comm picks up a signal in no known language.',
    'A cargo container splits open, spilling something that moves.', 'A corp enforcer squad marches past, scanning faces.',
  ];
  DS_GM.secretsD1 = ['A hidden', 'A sealed', 'A forgotten', 'An abandoned', 'A booby-trapped', 'A pressurized', 'A shielded', 'A derelict'];
  DS_GM.secretsD2 = [
    'maintenance crawlspace holds smuggled cargo.', 'server closet still runs, guarding old data.',
    'escape pod is fueled and waiting.', 'lab has a specimen that should be dead.',
    'vault is keyed to a dead officer’s handprint.', 'compartment hides a stowaway.',
    'coolant duct leads past the security grid.', 'cache holds weapons the crew denied having.',
  ];
  // Sci-fi biome/locale encounter tables (parallels BIOME_ENC_TABLES keys).
  DS_GM.biomes = {
    'Docking Bay': ['Idling smugglers eye your cargo', 'A fuel leak nobody has reported', 'Dockhands on strike', 'A drone impound gone wrong', 'A crate that beeps'],
    'Station Corridor': ['A pickpocket working the crowd', 'A malfunctioning cleaning bot', 'A preacher of the Void', 'A flickering section of failing lights', 'Two factions in a standoff'],
    'Derelict Ship': ['Drifting debris in zero-G', 'A body, recently dead', 'A door welded shut from inside', 'Emergency power flickers on', 'Something breathing in the dark'],
    'Asteroid Belt': ['A prospector claim-jumper', 'A micro-meteor shower', 'A hollowed rock with a hidden dock', 'A drifting escape pod', 'Pirate sensor ping closing in'],
    'Colony Surface': ['A dust storm rolling in', 'Settlers barricaded against something', 'A crashed shuttle, still smoking', 'A dry well and desperate locals', 'An unmarked corporate convoy'],
    'Space Hulk': ['A pressure door that won’t hold', 'A nest of ship-vermin', 'A cargo hold flooded with coolant', 'An automated turret still armed', 'A distress beacon, decades old'],
    'Cyberdeck': ['An intrusion countermeasure wakes', 'A data-ghost of a dead user', 'A locked node begging to be cracked', 'A trace routine closing on you', 'A cache of stolen credentials'],
    'Orbital Market': ['A vendor selling stolen tech', 'A scan-sweep for contraband', 'A fixer with a job offer', 'A rigged game of chance', 'A crowd hiding a cutpurse'],
    'Engine Deck': ['A radiation flare warning', 'A coolant pipe about to burst', 'A jammed blast door', 'A stowaway in the machinery', 'A reactor readout in the red'],
    'Planet Wilds': ['Hostile local fauna', 'An electrical storm frying comms', 'An overgrown crash site', 'A predator stalking the party', 'A ravine only a grapple crosses'],
  };

  // ── Traps / hazards ─────────────────────────────────────────────────────────
  DS_GM.traps = [
    { trap: 'Automated turret', trigger: 'Motion sensor sweep', damage: '1d8 per round until disabled (DC 12 to hack)' },
    { trap: 'Decompression bolt', trigger: 'Tampered airlock panel', damage: 'Explosive bolt fires; DC 15 DEX or blown toward vacuum' },
    { trap: 'Electrified deck plate', trigger: 'Pressure on the plating', damage: '2d6 lightning, DC 12 CON or stunned 1 round' },
    { trap: 'Neurotoxin vent', trigger: 'Broken seal on a duct', damage: 'DC 13 CON or poisoned, DisADV until treated' },
    { trap: 'Blast door slam', trigger: 'Crossing a laser tripwire', damage: 'Doors seal; 1d6 crush if caught between' },
    { trap: 'Overloading conduit', trigger: 'Opening a maintenance panel', damage: '3d6 fire in a burst, DC 14 DEX for half' },
    { trap: 'Gravity plate spike', trigger: 'Weight on the section', damage: 'Grav spikes to 3×; DC 13 STR or pinned, 1d6/round' },
    { trap: 'Sentry drone swarm', trigger: 'Unauthorized biosign', damage: 'Drones deploy; 1d6 each, DC 12 to jam' },
    { trap: 'Coolant flood', trigger: 'Cutting the wrong line', damage: 'Cryo-coolant; 2d6 cold, DC 13 CON or slowed' },
    { trap: 'Data-lock feedback', trigger: 'Failed slice attempt', damage: 'Neural feedback; 1d8 to the hacker, marked to security' },
    { trap: 'Hull-charge fence', trigger: 'Touching a marked bulkhead', damage: '1d10 lightning, DC 14 CON or drop held items' },
    { trap: 'Vac-seal purge', trigger: 'Alarm state reached', damage: 'Section vents atmosphere over 3 rounds' },
  ];
  DS_GM.hazardsMov = ['Zero-G section', 'Spilled coolant slick', 'Loose deck grating', 'Grasping cargo netting', 'Steep access ladder', 'Magnetic floor (mag-boots only)', 'Debris field', 'Blowing engine wash', 'Shifting cargo', 'Vacuum gap'];
  DS_GM.hazardsDmg = ['Radiation flare', 'Ruptured coolant line', 'Plasma leak', 'Reactor heat wash', 'Micrometeor spray', 'Steam/pressure vent', 'Corrosive spill', 'Falling cargo', 'Arc-flash conduit', 'Fire suppression foam (smothering)'];
  DS_GM.hazardsWkn = ['Sensor-blinding static', 'Magnetic interference', 'Comm-jamming field', 'EMP dead-zone', 'Failing life-support (thin air)', 'Disorienting alarm', 'Strobing failure lights', 'Numbing cold', 'Toxic fumes', 'Neural-static (memory fog)'];

  // ── Procedural denizen (parallels MON_TABLE) ─────────────────────────────────
  DS_GM.monTable = [
    { quality: 'Feral', combat: 'PL-1', strength: 'Ambush from the dark', weakness: 'Bright light and noise' },
    { quality: 'Vermin', combat: 'PL-1', strength: 'Overwhelming numbers', weakness: 'Fire and area effects' },
    { quality: 'Scavenger', combat: 'PL', strength: 'Steals and flees', weakness: 'Cornered, it panics' },
    { quality: 'Mutated', combat: 'PL', strength: 'Unpredictable biology', weakness: 'Unstable — takes extra from AP' },
    { quality: 'Synthetic', combat: 'PL', strength: 'Immune to poison and fear', weakness: 'Disabling (D) weapons; EMP' },
    { quality: 'Armored', combat: 'PL+1', strength: 'Plated hide, hard to wound', weakness: 'Slow; Armor-Piercing ignores it' },
    { quality: 'Digital', combat: 'PL', strength: 'Attacks through the datanet (Interface)', weakness: 'Cut the node; physical isolation' },
    { quality: 'Void-adapted', combat: 'PL', strength: 'Fights in vacuum and zero-G', weakness: 'Pressure and heat' },
    { quality: 'Alpha', combat: 'PL+2', strength: 'Coordinates lesser creatures', weakness: 'Kill it and the pack scatters' },
    { quality: 'Aberrant', combat: 'PL+1', strength: 'Wrong-angled and terrifying', weakness: 'Its own instability; sustained fire' },
  ];
  DS_GM.monMut1 = ['Extra limbs', 'Chitin plating', 'Bioluminescence', 'Corrosive blood', 'Distended maw', 'Sensory tendrils', 'Vestigial wings', 'Fused cybernetics'];
  DS_GM.monMut2 = ['spits acid', 'phases briefly', 'emits an EMP pulse', 'regenerates', 'screams to stun', 'burrows through decking', 'splits when struck', 'drains power cells'];
  DS_GM.monMut3 = ['immune to cold/vacuum', 'sees in the dark', 'ignores the first hit each round', 'poisonous to touch', 'hard to detect on sensors', 'explodes on death', 'feeds on radiation', 'mimics comms chatter'];

  // ── Ship / station names (parallels dungeon name parts) ──────────────────────
  DS_GM.placeAdj = ['Derelict', 'Drifting', 'Abandoned', 'Silent', 'Shattered', 'Ghost', 'Forsaken', 'Burning', 'Frozen', 'Blacked-out', 'Quarantined', 'Lost', 'Haunted', 'Broken', 'Dead', 'Hollow', 'Cursed', 'Rusted', 'Fallen', 'Nameless'];
  DS_GM.placeNoun = ['Station', 'Freighter', 'Cruiser', 'Hulk', 'Outpost', 'Relay', 'Colony', 'Dreadnought', 'Habitat', 'Drydock', 'Refinery', 'Waystation', 'Carrier', 'Depot', 'Ark', 'Platform', 'Beacon', 'Foundry', 'Arcology', 'Wreck'];
  DS_GM.placeProper = ['Meridian', 'Icarus', 'Kepler', 'Perdition', 'Halcyon', 'Vostok', 'Chimera', 'Erebus', 'Tantalus', 'Prosperity', 'Absolution', 'Cassini', 'Odyssey', 'Nyx', 'Charon', 'Vesta', 'Hyperion', 'Tycho', 'Sable', 'Requiem'];

  // ── Rival crew (parallels RC_*) ──────────────────────────────────────────────
  DS_GM.rivalGoals = [
    'Beat you to the same salvage', 'Collect the same bounty', 'Reach a derelict before anyone else',
    'Corner the local tech market', 'Escape a syndicate debt', 'Map an uncharted jump route',
    'Recover a stolen data-core', 'Sell you out for the reward', 'Buy their ship back',
  ];
  DS_GM.rivalQuirks = [
    'Their AI navigator does the talking', 'They never take their helmets off', 'They mark territory with graffiti tags',
    'They owe everyone in the sector', 'They record everything for a stream', 'They pray before every jump',
    'Their ship is held together with tape and hope', 'They keep a mascot drone',
  ];
  DS_GM.rivalGear = [
    'Mismatched surplus weapons', 'One good energy rifle, shared', 'Cutting-edge corp loadout',
    'Jury-rigged tech that mostly works', 'Stolen military hardware', 'Nonlethal gear — they take prisoners',
  ];
  DS_GM.rivalDisposition = {
    Hostile: ['They open fire on sight', 'They’ve already called it in to a bigger crew', 'They want you gone — permanently'],
    Wary: ['Weapons drawn but talking', 'They’ll deal, but they don’t trust you', 'One wrong word ends it'],
    Neutral: ['Willing to split the score', 'They’ll trade information', 'Live and let live — for now'],
    Friendly: ['They offer a temporary alliance', 'They warn you of a shared threat', 'They’ll cover you for a cut'],
  };
  DS_GM.rivalSpecies = ['Human', 'Human', 'Android', 'Tech-augmented', 'Void-born', 'Mutant', 'Uplifted'];
  DS_GM.rivalArchetypes = ['Strong', 'Quick', 'Tough', 'Clever', 'Wise', 'Charming', 'Machine-Based'];

  if (typeof window !== 'undefined') window.DS_GM = DS_GM;
})();
