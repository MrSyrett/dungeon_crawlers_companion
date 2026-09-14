// GENERATED FILE - do not edit by hand.
// Source: data/icrpg/parts/*.json - regenerate with: node scripts/build-icrpg-data.mjs

const ICRPG_ABILITIES = [
  {
    "name": "Abilities",
    "kind": "ability",
    "world": "core",
    "desc": "An ABILITY is an intrinsic feature of your character that can never be lost or removed. You begin with 1 chosen from your TYPE and gain more at MILESTONES, up to a maximum of 5; some ABILITIES combine with others for powerful synergy."
  },
  {
    "name": "Powers",
    "kind": "power",
    "world": "core",
    "desc": "POWERS are rarer than ABILITIES and set superhuman heroes apart, used in VIGILANTE CITY or by any superhuman character. Like ABILITIES they can never be taken away, but they are nearly unlimited in potential and only upgrade over time rather than accumulating; a superhero starts by choosing any 3."
  },
  {
    "name": "Augments",
    "kind": "augment",
    "world": "core",
    "desc": "AUGMENTS are technology, digital or arcane, integrated into a living body, such as cybernetic implants, mechanical limbs, or eerie crystal eyes. They are most common in cyberpunk worlds but any genre can feature them."
  },
  {
    "name": "Slayer",
    "kind": "ability",
    "world": "alfheim",
    "desc": "If attacking an enemy you have already harmed, do ULTIMATE damage."
  },
  {
    "name": "Defender",
    "kind": "ability",
    "world": "alfheim",
    "desc": "Allies within CLOSE range of you may use your DEFENSE STAT."
  },
  {
    "name": "Pit Fighter",
    "kind": "ability",
    "world": "alfheim",
    "desc": "When you take damage, add the amount of the last hit against you to the next hit you make."
  },
  {
    "name": "Quick Draw",
    "kind": "ability",
    "world": "alfheim",
    "desc": "On a ranged attack roll of modified 15+, fire again."
  },
  {
    "name": "Dead Eye",
    "kind": "ability",
    "world": "alfheim",
    "desc": "Use one TURN to aim; your next successful hit deals max damage."
  },
  {
    "name": "Trap Expert",
    "kind": "ability",
    "world": "alfheim",
    "desc": "Your traps damage all victims NEAR the trap when tripped."
  },
  {
    "name": "Assassin",
    "kind": "ability",
    "world": "alfheim",
    "desc": "If a target doesn't know you're there, your first attack cannot miss."
  },
  {
    "name": "Thief",
    "kind": "ability",
    "world": "alfheim",
    "desc": "Your stealth rolls are always EASY."
  },
  {
    "name": "Scout",
    "kind": "ability",
    "world": "alfheim",
    "desc": "When using WIS to seek out details or hidden truths, roll EASY."
  },
  {
    "name": "Battle Hymn",
    "kind": "ability",
    "world": "alfheim",
    "desc": "Provide music with a CHA roll to reduce allies' TARGET by 2."
  },
  {
    "name": "Provoker",
    "kind": "ability",
    "world": "alfheim",
    "desc": "Hurl insults at any 1 enemy; they cannot resist dueling with you."
  },
  {
    "name": "Thespian",
    "kind": "ability",
    "world": "alfheim",
    "desc": "With a CHA roll, convince subjects of even wildly ridiculous fibs; their belief lasts 1D4 ROUNDS per roll made."
  },
  {
    "name": "Spell Scholar",
    "kind": "power",
    "world": "alfheim",
    "desc": "If you find a written SPELL, gain an extra SPELL."
  },
  {
    "name": "Wild Power",
    "kind": "power",
    "world": "alfheim",
    "desc": "Any time you roll a max die, roll it again."
  },
  {
    "name": "Dark Pact",
    "kind": "power",
    "world": "alfheim",
    "desc": "Sacrifice any amount of your HP to boost any 1 roll."
  },
  {
    "name": "Elemental",
    "kind": "power",
    "world": "alfheim",
    "desc": "Nature or weather magic is always EASY to cast."
  },
  {
    "name": "Healer",
    "kind": "power",
    "world": "alfheim",
    "desc": "Any healing magic you cast does ULTIMATE EFFORT."
  },
  {
    "name": "Monk",
    "kind": "power",
    "world": "alfheim",
    "desc": "Use your WIS STAT when making unarmed attacks."
  },
  {
    "name": "Ace",
    "kind": "ability",
    "world": "warpshell",
    "desc": "Only crash a small or medium ship on a natural 1 piloting roll."
  },
  {
    "name": "Smuggler",
    "kind": "ability",
    "world": "warpshell",
    "desc": "Your carried LOOT is undetectable and cannot be lost or stolen."
  },
  {
    "name": "Cap'n",
    "kind": "ability",
    "world": "warpshell",
    "desc": "Invent and execute maneuvers with a huge or capital starship, even without crew; with crew present, only fail on a natural 1."
  },
  {
    "name": "MG Specialist",
    "kind": "ability",
    "world": "warpshell",
    "desc": "Attacks unleash 1D4 shots, but guns empty on a natural 5 or less."
  },
  {
    "name": "Sharpshooter",
    "kind": "ability",
    "world": "warpshell",
    "desc": "Use a TURN to take aim; your next shot does ULTIMATE."
  },
  {
    "name": "Demolitions",
    "kind": "ability",
    "world": "warpshell",
    "desc": "Double all damage against vehicles, objects, or structures."
  },
  {
    "name": "Repairman",
    "kind": "ability",
    "world": "warpshell",
    "desc": "Any roll involving repair is always EASY."
  },
  {
    "name": "Jerry Rigger",
    "kind": "ability",
    "world": "warpshell",
    "desc": "Combine two machines to perform a hybrid function reliably with an INT roll; the gadget functions for 1D6 ROUNDS."
  },
  {
    "name": "Tuner",
    "kind": "ability",
    "world": "warpshell",
    "desc": "Adjust any machine to do 1 category of EFFORT better than it currently does, once per machine, with an INT roll."
  },
  {
    "name": "Farseer",
    "kind": "power",
    "world": "warpshell",
    "desc": "With a WIS roll, locate any critical destination."
  },
  {
    "name": "Telekinetic",
    "kind": "power",
    "world": "warpshell",
    "desc": "With an INT roll, extend your STR up to FAR range."
  },
  {
    "name": "Infiltrator",
    "kind": "power",
    "world": "warpshell",
    "desc": "Become invisible by winning a WIS roll against those who would detect you; those who fail cannot detect you for the entire encounter."
  },
  {
    "name": "Analysis",
    "kind": "ability",
    "world": "warpshell",
    "desc": "When you use a Scan Unit for an investigate action, use no time."
  },
  {
    "name": "Engineering",
    "kind": "ability",
    "world": "warpshell",
    "desc": "Any time you work on machines, the roll is EASY."
  },
  {
    "name": "Xenobiology",
    "kind": "ability",
    "world": "warpshell",
    "desc": "Identify the properties of any creature with an INT roll."
  },
  {
    "name": "Changer",
    "kind": "power",
    "world": "warpshell",
    "desc": "With a CON roll, change your form into any solid shape, liquid, or gas."
  },
  {
    "name": "Blip",
    "kind": "power",
    "world": "warpshell",
    "desc": "When you move, you don't pass through the space between locations."
  },
  {
    "name": "Energy Star",
    "kind": "power",
    "world": "warpshell",
    "desc": "Roll CON to harvest 1D10 ENERGY from any NEAR source and deliver it as healing EFFORT or as a bonus to any roll in the following ROUND."
  },
  {
    "name": "Blip Module",
    "kind": "augment",
    "world": "warpshell",
    "desc": "A phase-movement augment: when you move, you do not pass through the space between the two locations."
  },
  {
    "name": "Cybernetics Loadout",
    "kind": "augment",
    "world": "warpshell",
    "desc": "Your limbs and skeleton are augmented with nano fibers and duranium scaffolds; all forms of blunt impact inflict no damage."
  },
  {
    "name": "Zurin Symbiote",
    "kind": "augment",
    "world": "warpshell",
    "desc": "The Zurin primordial form, a tiny organism that binds to the spinal cord and enhances subtle empathy; 'Don't Die on me, man!' rolls are always EASY."
  },
  {
    "name": "Jump Pack",
    "kind": "augment",
    "world": "warpshell",
    "desc": "A miniaturized ion thruster worn as a small backpack; move twice on your TURN, even when taking an action or making an attack."
  },
  {
    "name": "Acrobat",
    "kind": "power",
    "world": "vigilantecity",
    "desc": "Superhuman DEX maneuvers: swing, flip and tumble across terrain to move FAR unharmed (1 SP), instantly evade an attack (2 SP), or pull off any described stunt (3 SP)."
  },
  {
    "name": "Blink",
    "kind": "power",
    "world": "vigilantecity",
    "desc": "Flexible teleportation: zap NEAR or FAR with no roll (1 SP), open a linked portal pair (2 SP), or create and interlink up to six portals within a mile (3 SP)."
  },
  {
    "name": "Energy Blast",
    "kind": "power",
    "world": "vigilantecity",
    "desc": "Release destructive energy: a single ULTIMATE FAR blast ignoring armor (1 SP), an unstoppable half-mile linear beam (2 SP), or a 3D12 area burst (3 SP)."
  },
  {
    "name": "Flight",
    "kind": "power",
    "world": "vigilantecity",
    "desc": "Fly with speed and precision (no SP for normal moves): burst DOUBLE FAR through obstacles (1 SP), pull a wild maneuver (2 SP), or hold supersonic flight (3 SP)."
  },
  {
    "name": "Gadgets",
    "kind": "power",
    "world": "vigilantecity",
    "desc": "Master of machines: instantly fix anything mechanical (1 SP), build LOOT-grade gadgets from scraps (2 SP), or remote-control modified machines (3 SP), all via INT rolls."
  },
  {
    "name": "Immunity",
    "kind": "power",
    "world": "vigilantecity",
    "desc": "Impervious to one chosen damage type (blades, bullets, fire, ice, energy, stun, etc.); pay 1 SP to negate that damage when hit."
  },
  {
    "name": "Invisible",
    "kind": "power",
    "world": "vigilantecity",
    "desc": "Incredible stealth by degrees: vanish for 1 round (1 SP), become heat-only-visible for 1D4 rounds (2 SP), or hold true invisibility for you and CLOSE allies (3 SP)."
  },
  {
    "name": "Killshot",
    "kind": "power",
    "world": "vigilantecity",
    "desc": "The world's best shot with one chosen ranged weapon: auto-hit (1 SP), hit 1D8 targets in one motion (2 SP), or drop a target to 0 HP ignoring HEARTS (3 SP)."
  },
  {
    "name": "Lucky",
    "kind": "power",
    "world": "vigilantecity",
    "desc": "A knack for walking away from explosions: re-roll any roll (1 SP), turn a mishap to advantage (2 SP), or narrowly escape otherwise lethal harm (3 SP)."
  },
  {
    "name": "Martial Arts",
    "kind": "power",
    "world": "vigilantecity",
    "desc": "Superhuman melee: land a crushing critical (1 SP), unleash 1D8 hits (2 SP), or a CLOSE smash reducing all to 0 HP that shatters structures and can deal CHUNK damage (3 SP)."
  },
  {
    "name": "Mega Brain",
    "kind": "power",
    "world": "vigilantecity",
    "desc": "Super-intelligence and mind control: no-roll INT/WIS insight (1 SP), read or resist thoughts (2 SP), or mass mind-reading and thought-implanting within a mile (3 SP)."
  },
  {
    "name": "Mind > Matter",
    "kind": "power",
    "world": "vigilantecity",
    "desc": "Telekinesis: move small objects (1 SP), lift or hurl car-sized masses including self-flight (2 SP), or sustain wild feats like crumpling a tank (3 SP)."
  },
  {
    "name": "Phase",
    "kind": "power",
    "world": "vigilantecity",
    "desc": "Become immaterial: NEAR move through solids (1 SP), phase to dodge an attack (2 SP), or phase another person or object; an enemy phased into matter takes ULTIMATE damage (3 SP)."
  },
  {
    "name": "Plastic",
    "kind": "power",
    "world": "vigilantecity",
    "desc": "Rubbery body chemistry: stretch a limb 10x (1 SP), extend your whole body 50x (2 SP), or morph into a described object for CON rounds (3 SP)."
  },
  {
    "name": "Regeneration",
    "kind": "power",
    "world": "vigilantecity",
    "desc": "Heal and regrow tissue: shrug off last round's HP or SP (1 SP), recover to full (2 SP), or regrow from near-death in 1D6 rounds if you have 3 SP (3 SP)."
  },
  {
    "name": "Sonic",
    "kind": "power",
    "world": "vigilantecity",
    "desc": "Manipulate sound, especially for STUN: focused NEAR blast (1 SP), omni-directional FAR wave (2 SP), or a delayed explosion that levels 1D8 structures (3 SP)."
  },
  {
    "name": "Super Senses",
    "kind": "power",
    "world": "vigilantecity",
    "desc": "See, smell or hear for miles: 5-mile senses (1 SP), read trace evidence by touch (2 SP), or sense through solid matter and vast distances (3 SP), via WIS rolls."
  },
  {
    "name": "Super Speed",
    "kind": "power",
    "world": "vigilantecity",
    "desc": "Mind-bending speed: ignore movement distance limits (1 SP), take TWO actions per turn (2 SP), or describe catastrophic high-speed effects with a DEX roll (3 SP)."
  },
  {
    "name": "Super Strength",
    "kind": "power",
    "world": "vigilantecity",
    "desc": "Exponential strength: ULTIMATE+STR melee (1 SP), throw cars or stop trains (2 SP), or catch jetliners and topple buildings (3 SP)."
  },
  {
    "name": "Transform",
    "kind": "power",
    "world": "vigilantecity",
    "desc": "Change into an alternate form with its own powers and stats: for 1D4 rounds (1 SP), until 0 SP (2 SP), or until 0 HP (3 SP); reverting is not under your control."
  },
  {
    "name": "Archer",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "On a successful EASY bow attack, roll DOUBLE EFFORT."
  },
  {
    "name": "Chief",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "Non-player characters will always hear you out, or stop to listen."
  },
  {
    "name": "Cook",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "Double the benefits of any FOOD ITEMS you create."
  },
  {
    "name": "Craftsman",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "Create WOOD or ANTLER items in 1 hour with an INT or WIS roll."
  },
  {
    "name": "Delver",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "Rolls to navigate or survive tunnels or caves are always EASY."
  },
  {
    "name": "Dreamer",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "Visualize revolutionary technology every 1D4 days."
  },
  {
    "name": "Fisherman",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "Yield twice the FOOD or SUPPLY gained from fishing as others."
  },
  {
    "name": "Flamekeeper",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "You always keep a small firepot going, no matter what."
  },
  {
    "name": "Forager",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "Double the outcome of any successful FORAGE roll."
  },
  {
    "name": "Herbalist",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "Use a FORAGE roll to find specific plants, roots or fungi."
  },
  {
    "name": "Mason",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "Building with STONE is never HARD."
  },
  {
    "name": "Mender",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "Make REPAIR rolls on any EQUIPMENT."
  },
  {
    "name": "Metalurgist",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "Create METAL implements in 1 hour with an INT or WIS roll."
  },
  {
    "name": "Naturalist",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "Use INT or WIS to recall facts about any BEAST or LANDSCAPE."
  },
  {
    "name": "Navigator",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "Ignore BAD WEATHER when making NAVIGATION rolls."
  },
  {
    "name": "Runic",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "Read TEACHER stones with an INT roll."
  },
  {
    "name": "Runner",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "Travel twice the distance per day trekking."
  },
  {
    "name": "Seer",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "Speak of OMENS or GHOSTS; listeners must roll to disbelieve."
  },
  {
    "name": "Shapeshift",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "Use hide and bone to disguise yourself as a large animal."
  },
  {
    "name": "Slayer",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "Roll ULTIMATE EFFORT on any target you have already injured."
  },
  {
    "name": "Spearman",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "No roll with a SPEAR is ever HARD."
  },
  {
    "name": "Survivor",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "When DYING, add 1 to your roll."
  },
  {
    "name": "Swimmer",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "Never take damage from deep water; swim twice as fast."
  },
  {
    "name": "Tracker",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "Pursuing BEASTS, tracking is EASY."
  },
  {
    "name": "Warrior",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "When fighting other humans, roll DOUBLE EFFORT."
  },
  {
    "name": "Wild",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "When rolling HAZARDS, roll twice and choose."
  },
  {
    "name": "Wise",
    "kind": "ability",
    "world": "bloodandsnow",
    "desc": "Aid an ally on a WIS or INT roll, making it EASY."
  }
];
if (typeof window !== "undefined") window.ICRPG_ABILITIES = ICRPG_ABILITIES;
