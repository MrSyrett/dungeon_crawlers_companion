// GENERATED FILE - do not edit by hand.
// Source: data/icrpg/parts/*.json - regenerate with: node scripts/build-icrpg-data.mjs

const ICRPG_SPELLS = [
  {
    "name": "Arcane Bomb",
    "school": "Alfheim",
    "desc": "An orb of light forms in one hand; once placed it explodes in 1D4 ROUNDS, inflicting 4D12 damage to everything within NEAR range.",
    "target": "NEAR range",
    "effort": "d12"
  },
  {
    "name": "Arcane Missile",
    "school": "Alfheim",
    "desc": "Hurl a shard of arcane energy at a target you can see. If it only does 1 damage, the missile ricochets and hits a second target.",
    "target": "Single visible",
    "effort": ""
  },
  {
    "name": "Arn's Hex",
    "school": "Alfheim",
    "desc": "Rot a living target from within with eldritch words. The rot inflicts MAGIC each ROUND for 1D4 ROUNDS.",
    "target": "Living target",
    "effort": "d10"
  },
  {
    "name": "Aazul's Conjuration",
    "school": "Alfheim",
    "desc": "Open a brimstone portal to summon 1D4 imps. The demons have 1 HP, bite for WEAPON damage, and mostly obey.",
    "target": "",
    "effort": ""
  },
  {
    "name": "Blade Aura",
    "school": "Alfheim",
    "desc": "Armor an ally you touch with daggers of energy; those harming that ally take WEAPON damage. Lasts until your next cast.",
    "target": "Touched ally",
    "effort": ""
  },
  {
    "name": "Control Machines",
    "school": "Alfheim",
    "desc": "Overcome a machine's HP with your EFFORT to take control of it. An aware machine can roll CHA each ROUND to break free.",
    "target": "A machine",
    "effort": ""
  },
  {
    "name": "Counter Spell",
    "school": "Alfheim",
    "desc": "Any time you see an INT SPELL cast, roll immediately to cancel it. If you fail, you are overwhelmed and take 1D8 damage.",
    "target": "",
    "effort": ""
  },
  {
    "name": "Create Device",
    "school": "Alfheim",
    "desc": "Describe a mechanical device of your mass or less and create it. Instant on a modified 12+, otherwise complete in 1 ROUND.",
    "target": "",
    "effort": ""
  },
  {
    "name": "Crystal Sanctuary",
    "school": "Alfheim",
    "desc": "Form a grid of hexagonal energy shields. All allies within NEAR range gain +3 DEFENSE. Lasts until you're harmed or your next cast.",
    "target": "Allies within NEAR range",
    "effort": ""
  },
  {
    "name": "Curse of Ord",
    "school": "Alfheim",
    "desc": "With a HARD INT roll and precise wording, place a curse on a target you touch. It is permanent until somehow dispelled.",
    "target": "Single touch (HARD INT)",
    "effort": ""
  },
  {
    "name": "Death Nova",
    "school": "Alfheim",
    "desc": "With no roll, overload and explode. Sacrifice any amount of HP and add it to 2D12 damage; all within FAR range roll DEFENSE to avoid.",
    "target": "FAR range",
    "effort": "d12"
  },
  {
    "name": "Destroy the Dead",
    "school": "Alfheim",
    "desc": "Give your own blood to annihilate an undead creature. Roll INT; for each 1 HP sacrificed, destroy 1 HEART of undead.",
    "target": "Undead creature",
    "effort": ""
  },
  {
    "name": "Detect Evil",
    "school": "Alfheim",
    "desc": "Detect evidence of despicable deeds or malevolence within your current location. A green glow reveals creatures, objects, or enchantments.",
    "target": "Current location",
    "effort": ""
  },
  {
    "name": "Dominate Monster",
    "school": "Alfheim",
    "desc": "Take total control of any monstrous creature in sight for 1D4 ROUNDS. If the cast fails, the monster is enraged at you until defeated.",
    "target": "Monster in sight",
    "effort": ""
  },
  {
    "name": "Doorway",
    "school": "Alfheim",
    "desc": "Create a magical doorway from your present location to any location you have been before. The door remains open 1D4 ROUNDS.",
    "target": "",
    "effort": ""
  },
  {
    "name": "Fireball",
    "school": "Alfheim",
    "desc": "Conjure an incendiary sphere; blast everything within NEAR range of a designated location you can see and ignite flammables.",
    "target": "NEAR range",
    "effort": ""
  },
  {
    "name": "Fire Missile",
    "school": "Alfheim",
    "desc": "Fire a precise bolt of flame at a target within FAR range, igniting flammable objects.",
    "target": "Single FAR",
    "effort": ""
  },
  {
    "name": "Growth Ray",
    "school": "Alfheim",
    "desc": "Increase one target to 3x its size for 1 ROUND, adding +3 to all its STATS but keeping its normal HP.",
    "target": "Single target",
    "effort": ""
  },
  {
    "name": "Hammer Stone",
    "school": "Alfheim",
    "desc": "Conjure a giant cube of stone above a location; in 1D4 ROUNDS it drops, crushing anything below with 3 HEARTS or less.",
    "target": "A location",
    "effort": ""
  },
  {
    "name": "Identify",
    "school": "Alfheim",
    "desc": "Cast on a creature, object, or feature of land or architecture to gain all available information about it.",
    "target": "Creature, object, or feature",
    "effort": ""
  },
  {
    "name": "Illusory Self",
    "school": "Alfheim",
    "desc": "Conjure a realistic mirror-clone of yourself for 1D4 ROUNDS. The clone has no mass and vanishes if touched.",
    "target": "Self",
    "effort": ""
  },
  {
    "name": "Levitation",
    "school": "Alfheim",
    "desc": "Enchant a target with touch to float up to 6 feet high for 1D4 ROUNDS (1D6 ROUNDS if cast on yourself).",
    "target": "Single touch",
    "effort": ""
  },
  {
    "name": "Lightning Bolt",
    "school": "Alfheim",
    "desc": "Unleash a crackling bolt with no roll; all targets in a straight line roll DEFENSE to avoid. Metal-clad foes take double damage.",
    "target": "Straight line",
    "effort": ""
  },
  {
    "name": "Mage Eye",
    "school": "Alfheim",
    "desc": "Conjure a hovering orb resembling a giant eye of energy; move it anywhere within one mile and see what it sees.",
    "target": "Within one mile",
    "effort": ""
  },
  {
    "name": "Mender",
    "school": "Alfheim",
    "desc": "Instantly repair an item, architectural feature, vehicle, or weapon, even when the target is mostly destroyed.",
    "target": "",
    "effort": ""
  },
  {
    "name": "Mind Trap",
    "school": "Alfheim",
    "desc": "Cripple a target you can see with endless looping thoughts. They are stunned for 1D4 ROUNDS or until they make an INT roll.",
    "target": "Single visible",
    "effort": ""
  },
  {
    "name": "Shrink Ray",
    "school": "Alfheim",
    "desc": "Reduce one target to 1/10th its size for 1 ROUND, giving it -3 on all rolls but keeping its HP.",
    "target": "Single target",
    "effort": ""
  },
  {
    "name": "Song of the Mountain",
    "school": "Alfheim",
    "desc": "Sing; all enemies within FAR range are enamored for 1D4 ROUNDS and cancel attacks or befriend you. Enemies with more than 3 HEARTS are immune.",
    "target": "FAR range",
    "effort": ""
  },
  {
    "name": "The Hidden",
    "school": "Alfheim",
    "desc": "Allies NEAR you become invisible for 1D4 ROUNDS, reappearing if they leave NEAR range. Ends if you're harmed or cast.",
    "target": "Allies within NEAR",
    "effort": ""
  },
  {
    "name": "Translocate",
    "school": "Alfheim",
    "desc": "Roll INT; a target you can see also rolls INT. If you beat their roll, you instantly swap places in a puff of smoke.",
    "target": "Target you can see",
    "effort": ""
  },
  {
    "name": "Vampiric Ray",
    "school": "Alfheim",
    "desc": "Extract life force from a living target within CLOSE range, transferring EFFORT rolled from their HP to yours.",
    "target": "Single CLOSE",
    "effort": "d10"
  },
  {
    "name": "Elemental Air",
    "school": "Alfheim",
    "desc": "Move a mass of air in powerful blasts. Foes or objects hit must roll STR above your WIS total or be pushed FAR.",
    "target": "Foes or objects",
    "effort": ""
  },
  {
    "name": "Elemental Earth",
    "school": "Alfheim",
    "desc": "Draw forth stone and soil that shoots from the ground to form a wall 5 feet thick, curved around you at NEAR range.",
    "target": "NEAR range",
    "effort": ""
  },
  {
    "name": "Elemental Fire",
    "school": "Alfheim",
    "desc": "Empower any open flame you see into a huge, rapidly spreading fire that behaves naturally but with terrible accelerant.",
    "target": "Any open flame you see",
    "effort": ""
  },
  {
    "name": "Elemental Ice",
    "school": "Alfheim",
    "desc": "Freeze water into solid ice, up to 10,000 gallons for each point rolled over the current TARGET. The ice melts naturally afterward.",
    "target": "Water",
    "effort": ""
  },
  {
    "name": "Elemental Beast",
    "school": "Alfheim",
    "desc": "Change an element you have magically affected into a semi-sentient creature at your command. It has 1 HEART and does MAGIC.",
    "target": "An affected element",
    "effort": "d10"
  },
  {
    "name": "Elemental Storm",
    "school": "Alfheim",
    "desc": "When outdoors, call forth a raging storm of hail, lightning, and fog. It rages on for 1D8 ROUNDS with many possible effects.",
    "target": "Outdoors",
    "effort": ""
  },
  {
    "name": "Elemental Vortex",
    "school": "Alfheim",
    "desc": "Stir the fabric of matter to draw in raw power. For each ROUND casting, store a D12 for any subsequent elemental SPELL outcome.",
    "target": "Self",
    "effort": ""
  },
  {
    "name": "Elemental Water",
    "school": "Alfheim",
    "desc": "Conjure a giant mass of water at a location you can see, materializing 10,000 gallons for each point rolled over the current TARGET.",
    "target": "A location you can see",
    "effort": ""
  },
  {
    "name": "Radiant Shield",
    "school": "Alfheim",
    "desc": "Imbue your shield with holy light that blinds all evil creatures that see it for 1D4 ROUNDS.",
    "target": "Self",
    "effort": ""
  },
  {
    "name": "Healing Nova",
    "school": "Alfheim",
    "desc": "With a HARD WIS roll, emit a burst of divine healing energy that heals your allies within FAR range.",
    "target": "Allies within FAR range (HARD WIS)",
    "effort": ""
  },
  {
    "name": "Healing Touch",
    "school": "Alfheim",
    "desc": "Touch an ally to heal them with holy magic. Make the roll HARD to heal two allies at once, one with each hand.",
    "target": "Single touch",
    "effort": ""
  },
  {
    "name": "Holy Bulwark",
    "school": "Alfheim",
    "desc": "Conjure a luminous shield of energy on an ally you can see; it absorbs the next HEART of incoming damage.",
    "target": "Ally you can see",
    "effort": ""
  },
  {
    "name": "Invulnerability",
    "school": "Alfheim",
    "desc": "Touch an ally or object to make it immune to all harm for the next ROUND. Make the roll HARD to earn 2 ROUNDS.",
    "target": "Single touch",
    "effort": ""
  },
  {
    "name": "Cleanse",
    "school": "Alfheim",
    "desc": "With a touch and a prayer, cure all negative effects, curses, poisons, or disease from a creature. Can be cast using WIS or CHA.",
    "target": "Single touch",
    "effort": ""
  },
  {
    "name": "Lion Heart",
    "school": "Alfheim",
    "desc": "Proclaim the righteous destiny of you and your allies; those who hear you are immune to fear for 4 ROUNDS.",
    "target": "Those who hear you",
    "effort": ""
  },
  {
    "name": "Regeneration",
    "school": "Alfheim",
    "desc": "Form a tiny spark of sunlight and give it to an ally; they automatically heal D8 HP on each of their next 4 TURNS.",
    "target": "An ally",
    "effort": "d8"
  },
  {
    "name": "Resurrection",
    "school": "Alfheim",
    "desc": "Focus all your soul on restoring life to a dead ally. This cannot be cast in combat or anywhere unsafe.",
    "target": "A dead ally",
    "effort": ""
  },
  {
    "name": "Yogi Stasis",
    "school": "Alfheim",
    "desc": "Assume a cross-legged posture and enter meditation. In this state you are immune to harm and require no food or air, with no duration limit.",
    "target": "Self",
    "effort": ""
  },
  {
    "name": "Far Seer",
    "school": "Alfheim",
    "desc": "Access the senses of any person you have met before, experiencing all they do for 1 ROUND.",
    "target": "A person you have met",
    "effort": ""
  },
  {
    "name": "Quickness",
    "school": "Alfheim",
    "desc": "Hasten your feet; once cast, move anywhere within the current location as if NEAR on your TURN for 1D4 ROUNDS.",
    "target": "Self / current location",
    "effort": ""
  },
  {
    "name": "Astral Connection",
    "school": "Alfheim",
    "desc": "Touch an ally to bind your souls. If that ally is harmed while connected, the two of you split the damage in any amounts desired.",
    "target": "Touched ally",
    "effort": ""
  },
  {
    "name": "Atom Palm",
    "school": "Alfheim",
    "desc": "Lift yourself from the ground with will, and when you descend your hand creates a seismic burst, doing ULTIMATE to all NEAR targets.",
    "target": "All NEAR targets",
    "effort": ""
  },
  {
    "name": "Astral Self",
    "school": "Alfheim",
    "desc": "Separate from your physical body. As long as the body is safe, you can function in astral form, except to acquire LOOT or be healed.",
    "target": "Self",
    "effort": ""
  },
  {
    "name": "Wild Growth",
    "school": "Alfheim",
    "desc": "Call upon dormant plant life within FAR range; it suddenly grows into a massive, tangled thicket of wood and vine.",
    "target": "FAR range",
    "effort": ""
  },
  {
    "name": "Vine Whip",
    "school": "Alfheim",
    "desc": "Use a thorned tendril as a melee weapon, or grapple lashed foes or objects and pull them with a STR roll after the cast.",
    "target": "",
    "effort": ""
  },
  {
    "name": "Enchant",
    "school": "Alfheim",
    "desc": "Place any SPELL you know into a weapon or usable item. You can create only 1 at a time, and once used it is dispelled.",
    "target": "A weapon or usable item",
    "effort": ""
  },
  {
    "name": "Animal Friend",
    "school": "Alfheim",
    "desc": "Use realistic calls and supernatural empathy to summon a fiercely loyal animal from the local environs that communicates with you.",
    "target": "",
    "effort": ""
  },
  {
    "name": "Woodshaper",
    "school": "Alfheim",
    "desc": "Bend wood into weapons, armor, or objects of comparable mass. Create far larger things with a natural 20.",
    "target": "",
    "effort": ""
  },
  {
    "name": "Dire Form",
    "school": "Alfheim",
    "desc": "Call upon your feral nature to transform into a dire animal, assuming its form and STATS for 1D4 ROUNDS.",
    "target": "Self",
    "effort": ""
  },
  {
    "name": "Forager",
    "school": "Alfheim",
    "desc": "Roll WIS outdoors to find specific fungus or plants for creating potions, poisons, or other tinctures; food can also be found.",
    "target": "Outdoors",
    "effort": ""
  },
  {
    "name": "Gathering Stone",
    "school": "Alfheim",
    "desc": "Mark a medium stone with a primeval rune; those who witness the cast can later call the rune's name to return instantly. Only 1 can be maintained at a time.",
    "target": "",
    "effort": ""
  },
  {
    "name": "Arc Arrow",
    "school": "Arcane",
    "desc": "Enhance one ordinary projectile so it skips like a rock; each hit lets you make another attack against an additional NEAR enemy, with no limit on ricochets.",
    "target": "Touch (1 ammunition/POWER)",
    "effort": ""
  },
  {
    "name": "Attractor",
    "school": "Arcane",
    "desc": "Conjure a localized gravity well; all NEAR must pass a STR save or be pulled toward it, and colliding creatures take 1D6 WEAPON per POWER. Any movement in the area requires a STR check.",
    "target": "NEAR radius at FAR range",
    "effort": "d6"
  },
  {
    "name": "Disruptor Ray",
    "school": "Arcane",
    "desc": "A vein of light agitates the cosmic field around your victim, cancelling all of their attacking and movement until the SPELL ends.",
    "target": "Single FAR",
    "effort": ""
  },
  {
    "name": "Fog",
    "school": "Arcane",
    "desc": "Form a mass of cool, opaque fog that conceals movement, stifles flames, and settles as damp condensation.",
    "target": "NEAR radius at FAR range (+1 category radius/POWER)",
    "effort": ""
  },
  {
    "name": "Mutagen",
    "school": "Arcane",
    "desc": "Create an unstable POTION that, when consumed, combines all a creature's STAT bonus points onto a single chosen STAT while dropping the rest to +0, with physical deformities. Spoils after 1 ROUND if unused.",
    "target": "Consumable, single",
    "effort": ""
  },
  {
    "name": "Oubliette",
    "school": "Arcane",
    "desc": "Conjure a small extra-dimensional stone chamber underground with a locking trapdoor opening to a 20-foot room. All contents are ejected and the hatch vanishes when the SPELL ends.",
    "target": "Touch",
    "effort": ""
  },
  {
    "name": "Phase",
    "school": "Arcane",
    "desc": "Your form briefly becomes astral: invisible, silent, and able to pass through objects, harmed only by MAGIC. If inside an object when it ends, you are ejected and take ULTIMATE damage.",
    "target": "Self",
    "effort": ""
  },
  {
    "name": "Raven Prism",
    "school": "Arcane",
    "desc": "Summon a soul-linked raven that flies FAR and moves in and out of the Astral Dimension. It has 1 HEART, and you may treat it as yourself when calculating SPELL range.",
    "target": "Self",
    "effort": ""
  },
  {
    "name": "Repeat",
    "school": "Arcane",
    "desc": "Choose a specific event; for the duration, if that event happens within range, it repeats itself each TURN.",
    "target": "A visible event",
    "effort": ""
  },
  {
    "name": "Swiftness",
    "school": "Arcane",
    "desc": "Create one use of a speed POTION; your movement blurs, letting you MOVE twice your normal distance and still make an ATTEMPT after a double MOVE.",
    "target": "Self",
    "effort": ""
  },
  {
    "name": "Unlock",
    "school": "Arcane",
    "desc": "Shift a padlock, bar, gate, or other locking mechanism to locked or unlocked. Larger locks like castle gates require a POWER 3 or higher cast.",
    "target": "Touch",
    "effort": ""
  },
  {
    "name": "Unravel",
    "school": "Arcane",
    "desc": "Accelerate wear, rot, rust, or decay on an object, aging it 25 years per POWER.",
    "target": "Single NEAR object under 50 pounds",
    "effort": ""
  },
  {
    "name": "Zeke's Last Dance",
    "school": "Arcane",
    "desc": "Dance with convulsive movements; those who see you roll CHA against your INT or be compelled to join in, unable to take other actions.",
    "target": "All those who can see",
    "effort": ""
  },
  {
    "name": "Ant Venom",
    "school": "Arcane",
    "desc": "Create 1 drop of potent poison per POWER; each drop, touched or ingested, inflicts 1D6 burning, itching damage. Can be applied to knives, arrows, or food.",
    "target": "Touch or ingest",
    "effort": "d6"
  },
  {
    "name": "Depths",
    "school": "Arcane",
    "desc": "Create a downward pull on any creature or object in water, dragging it down until it escapes with STR or hits the bottom.",
    "target": "200 pounds of mass/POWER",
    "effort": ""
  },
  {
    "name": "Duranium",
    "school": "Arcane",
    "desc": "Rearrange the atoms of a non-living object into pure duranium, a durable metal almost impossible to destroy by non-magical means.",
    "target": "Single touch (1 pound of mass/POWER)",
    "effort": ""
  },
  {
    "name": "Frogs",
    "school": "Arcane",
    "desc": "Create 100 normal pond frogs per POWER, which can pour from a crack, fall from the sky, or erupt from a bucket.",
    "target": "Eyesight",
    "effort": ""
  },
  {
    "name": "Growth",
    "school": "Arcane",
    "desc": "Accelerate time to grow one creature you can see, doubling its size per POWER for 1D4 ROUNDS. The process can be painful.",
    "target": "Single eyesight",
    "effort": ""
  },
  {
    "name": "Lock",
    "school": "Arcane",
    "desc": "Scratch an arcane rune into a door, padlock, or gate so it can only be released by an UNLOCK SPELL of equal or greater POWER; no physical means can free it.",
    "target": "Single touch",
    "effort": ""
  },
  {
    "name": "Olfan's Overture",
    "school": "Arcane",
    "desc": "Roll to cast once, then weave a song; while you continue, ignore 1D8 damage per POWER each ROUND. The effect ends if you speak or cast another SPELL.",
    "target": "Self",
    "effort": "d8"
  },
  {
    "name": "Phase Hold",
    "school": "Arcane",
    "desc": "Block interdimensional connections so all creatures you can see can no longer use Phase, Blip Modules, or similar means to move in and out of reality.",
    "target": "All in eyesight",
    "effort": ""
  },
  {
    "name": "Swarm Self",
    "school": "Arcane",
    "desc": "Separate at the molecular level into a dense swarm of insects, retaining your shape if desired and gaining swarm abilities. POWER prolongs the form or increases its mass.",
    "target": "Self",
    "effort": ""
  },
  {
    "name": "Grasp of the Ogdru",
    "school": "Arcane",
    "desc": "Tap the power of the Ogdru to conjure ravenous tree-like tentacles from water or rock, barely under your control. Treat as 1 GIANT TENTACLE per POWER.",
    "target": "Appearing randomly (1 tentacle/POWER)",
    "effort": ""
  },
  {
    "name": "Molok's Machines",
    "school": "Arcane",
    "desc": "A mutation SPELL fusing metal elements into a target's body; each machine feature, such as pincers, shields, or weapon shapes, grants matching abilities.",
    "target": "Self or single touch",
    "effort": ""
  },
  {
    "name": "Petrificatum",
    "school": "Arcane",
    "desc": "A concoction that, once ingested, slowly turns its victim to stone over 5 ROUNDS (hastened by 1 ROUND per extra POWER). There is no known cure.",
    "target": "Single ingest",
    "effort": ""
  },
  {
    "name": "Glyph of Teleport",
    "school": "Arcane",
    "desc": "Etch matching runes in two locations anywhere in the multiverse; with an INT roll, instantly travel between them. The runes last until erased.",
    "target": "Touch",
    "effort": ""
  },
  {
    "name": "Endless Spells",
    "school": "Arcane",
    "desc": "A passive attribute: any time you cast a SPELL with a modified 13 or higher, instantly cast it again, disregarding any time limits.",
    "target": "Spell dependent",
    "effort": ""
  },
  {
    "name": "Portal",
    "school": "Arcane",
    "desc": "Open a temporary gateway between dimensions or times, usable by anyone with no roll while open for 1 ROUND per POWER. Requires detailed knowledge of the destination.",
    "target": "Eyesight",
    "effort": ""
  },
  {
    "name": "Reactor",
    "school": "Arcane",
    "desc": "Change any form of matter into any other at your touch; the reaction spreads infectiously through the affected mass at NEAR per POWER each ROUND.",
    "target": "Touch",
    "effort": ""
  },
  {
    "name": "Time Warp",
    "school": "Arcane",
    "desc": "Bend time itself, altering 1 ROUND of time per POWER; that round can be rewound, skipped, or held still, with unpredictable effects.",
    "target": "Time fabric",
    "effort": ""
  },
  {
    "name": "Xarasanth Memoria",
    "school": "Arcane",
    "desc": "Become a memory walker: gain knowledge of infinite timelines and implant, remove, or enhance others' memories, working with 1 memory per POWER.",
    "target": "1 touch/POWER",
    "effort": ""
  },
  {
    "name": "Baffle",
    "school": "Holy",
    "desc": "Unleash a chaotic stream of gibberish into a mind; choose INT, WIS, or CHA and reduce the target's bonus in that STAT to 0. The target must roll WIS to realize it's under a spell.",
    "target": "Single close/POWER",
    "effort": ""
  },
  {
    "name": "Breath of Udin",
    "school": "Holy",
    "desc": "Create a controllable wall of blasting wind; a HARD STR roll is needed to penetrate or resist it, pushing objects and creatures away to NEAR distance.",
    "target": "NEAR radius at NEAR",
    "effort": ""
  },
  {
    "name": "Chain Reaction",
    "school": "Holy",
    "desc": "Charge a willing ally with magical momentum; for each successful attack they make, they may attempt another with no upper limit. Add +1 to those attacks per POWER.",
    "target": "Touched ally",
    "effort": ""
  },
  {
    "name": "Durandel's Blessing",
    "school": "Holy",
    "desc": "Seal a target's soul so it is immune to all harmful MAGIC, though it can still use its own MAGIC or SPELLS.",
    "target": "Single touch/POWER",
    "effort": ""
  },
  {
    "name": "Ice Barrage",
    "school": "Holy",
    "desc": "Hurl one volatile shard of ice per POWER into a NEAR surface; the shards explode on fuses you set, dealing MAGIC to all targets NEAR that location.",
    "target": "Visible surface, explode NEAR radius",
    "effort": "d10"
  },
  {
    "name": "Lightning Lash",
    "school": "Holy",
    "desc": "Conjure a whip of crackling energy with FAR range dealing 1D8 MAGIC per POWER; struck targets are pulled to CLOSE range with a STR contest.",
    "target": "1 within FAR/POWER",
    "effort": "d8"
  },
  {
    "name": "Painless",
    "school": "Holy",
    "desc": "Draft a brew granting temporary immunity to pain; a creature that drinks it also reduces damage taken by 4 per POWER.",
    "target": "Single touch (drink)",
    "effort": ""
  },
  {
    "name": "Repel",
    "school": "Holy",
    "desc": "Bend gravity into a repulsor sphere; nothing can get CLOSE to the focal point for the duration unless the SPELL is cancelled.",
    "target": "Sight / CLOSE radius sphere",
    "effort": ""
  },
  {
    "name": "Rest the Dead",
    "school": "Holy",
    "desc": "Carve the Skaradess glyph in a corpse to consecrate and release it; the deceased can never be raised as undead and their soul ascends at peace.",
    "target": "Single touch",
    "effort": ""
  },
  {
    "name": "Tongues",
    "school": "Holy",
    "desc": "Expand consciousness to access true intent beyond words; the target can fluently speak and understand any language.",
    "target": "Single touch",
    "effort": ""
  },
  {
    "name": "Unseen",
    "school": "Holy",
    "desc": "Cloud the minds of nearby creatures to hide allies, objects, or sounds; victims invent their own excuses for the blank spots.",
    "target": "Any 1 sound, ally, or object within FAR/POWER",
    "effort": ""
  },
  {
    "name": "Winged Spell Stone",
    "school": "Holy",
    "desc": "Store one guaranteed use of any SPELL you know in a small amber stone that hovers near you using no inventory space. Destroy it to cast.",
    "target": "Self only",
    "effort": ""
  },
  {
    "name": "Apocalyptica",
    "school": "Holy",
    "desc": "Implant visions of doom and catastrophic failure into a creature you can see; they may still act but are plagued by doubt.",
    "target": "Single eyesight",
    "effort": ""
  },
  {
    "name": "Cleanse the Cursed",
    "school": "Holy",
    "desc": "Place your hand on a cursed, diseased, poisoned, or afflicted creature and, with a WIS roll, cleanse up to 4 of its conditions (1 per POWER).",
    "target": "Single touch",
    "effort": ""
  },
  {
    "name": "Illusions and Wonders",
    "school": "Holy",
    "desc": "Create hallucinogenic illusions; add 1 ROUND or 1 target per POWER. Victims break the illusion on their TURN with a WIS roll.",
    "target": "Any 1 within FAR/POWER",
    "effort": ""
  },
  {
    "name": "Love and Lust",
    "school": "Holy",
    "desc": "Congeal love into a glowing red tincture; after the subject drinks it, the next person they see captures their heart utterly.",
    "target": "Single / consume elixir",
    "effort": ""
  },
  {
    "name": "Moon Changer",
    "school": "Holy",
    "desc": "Shift the time state of planets to change the moon's phase; the change is visible to all who look up and is no illusion.",
    "target": "A single moon",
    "effort": ""
  },
  {
    "name": "Ray of Souls",
    "school": "Holy",
    "desc": "Compress saved souls into an energy beam; for each point of normal and HOLY MASTERY, reduce one foe in a straight line to 0 HP. It cannot harm allies.",
    "target": "FAR, any in a straight line",
    "effort": ""
  },
  {
    "name": "Water Wonder",
    "school": "Holy",
    "desc": "Conjure a being of pure elemental water from any NEAR liquid; it grows a HEART each ROUND up to 4 HEARTS and fights for you at +2 on all rolls.",
    "target": "Any NEAR water",
    "effort": ""
  },
  {
    "name": "Again",
    "school": "Holy",
    "desc": "Re-fold time by saying 'it happens again'; for each POWER cast, during the following ROUND you can cause an event to repeat itself.",
    "target": "Eyesight",
    "effort": ""
  },
  {
    "name": "Astral Flight",
    "school": "Holy",
    "desc": "Transform into an incorporeal astral entity that flies at twice your MOVE, passes through matter, and is invisible and silent. Only energy or MAGIC attacks can harm you.",
    "target": "Self only",
    "effort": ""
  },
  {
    "name": "Life",
    "school": "Holy",
    "desc": "Speak the power word 'Life' to heal 1 HEART per POWER on a creature you can see; the target also adds their CON to the recovery.",
    "target": "Single eyesight",
    "effort": ""
  },
  {
    "name": "Mind of Metal",
    "school": "Holy",
    "desc": "Armor your or an ally's mind; make an EASY INT roll to ignore any ARCANE magic or fear effect used against you. Gain 1D4 ROUNDS per POWER.",
    "target": "Self or single touch",
    "effort": ""
  },
  {
    "name": "Murky Wood Melody",
    "school": "Holy",
    "desc": "Sing an ancient song that shows the way, serving as a navigational beacon, clearing darkness or fog, or dispelling confusing illusions.",
    "target": "All NEAR allies",
    "effort": ""
  },
  {
    "name": "Winter",
    "school": "Holy",
    "desc": "Open a micro-doorway to Frost Fall, surrounding yourself with a cloud of freezing cold that spreads as long as you concentrate.",
    "target": "Self / surrounding area",
    "effort": ""
  },
  {
    "name": "Enhance Spell",
    "school": "Holy",
    "desc": "Upgrade any SPELL you know into a new spell of greater effect. Each cast must be cleared with the GM and may require objects, reagents, or days of EFFORT.",
    "target": "Variable",
    "effort": ""
  },
  {
    "name": "Temporal Hold",
    "school": "Holy",
    "desc": "Halt time itself, freezing 1 ROUND of time per POWER while you move freely; objects and beings can be altered before time resumes.",
    "target": "Time itself",
    "effort": ""
  },
  {
    "name": "Zeke's Ascension",
    "school": "Holy",
    "desc": "Cast only with a BURN; its subject recovers full HP, gains +1 to all STATS until recast, and gains a temporary HEART. Emits a shaft of light seen for a mile.",
    "target": "Single ally touch or self",
    "effort": ""
  },
  {
    "name": "Animate Dead",
    "school": "Infernal",
    "desc": "Turn 1 lifeless body into an automaton under your control per POWER. They act on your turn, are very slow, have 1 HP, and crumble to dust at dawn.",
    "target": "1 corpse/POWER",
    "effort": ""
  },
  {
    "name": "Bat",
    "school": "Infernal",
    "desc": "Transform yourself and your gear into a bat that can fly and navigate in darkness with 1 HP. At 0 HP you revert to your former shape and HP; you may also revert at will.",
    "target": "Self",
    "effort": ""
  },
  {
    "name": "Bind with Fire",
    "school": "Infernal",
    "desc": "Fiery bindings restrain a foe so it can't move and takes 1D8 MAGIC per POWER. A target from another dimension (except Pyros) takes ULTIMATE damage instead.",
    "target": "Single NEAR",
    "effort": "d8"
  },
  {
    "name": "Blood Mist",
    "school": "Infernal",
    "desc": "Conjure a corrosive cloud that saps one creature's lifeblood; one target takes 1D8 MAGIC per POWER while another NEAR target in the cloud heals that amount.",
    "target": "Single NEAR",
    "effort": "d8"
  },
  {
    "name": "Wither",
    "school": "Infernal",
    "desc": "Extract the lifeblood of a creature with blood, deleting 1 STAT point per POWER. The points can be restored by any normal healing (STAT heal instead of HP heal).",
    "target": "Single FAR",
    "effort": ""
  },
  {
    "name": "Melt",
    "school": "Infernal",
    "desc": "Waves of heat liquify 100 pounds of non-living solid per POWER; the liquid emits searing heat at NEAR range for 1D4 ROUNDS before cooling into solid form.",
    "target": "Single NEAR",
    "effort": ""
  },
  {
    "name": "Molok's Mutation",
    "school": "Infernal",
    "desc": "Curse a creature with deformity; each ROUND it must pass a CON save or acquire a permanent hideous mutation. An odd casting roll forces a mercurial effect on you.",
    "target": "Single touch",
    "effort": ""
  },
  {
    "name": "Plague of Doubts",
    "school": "Infernal",
    "desc": "The afflicted can't tell illusion from reality, seeing their worst fears everywhere. Any roll the target makes is HARD, and any roll against it is EASY.",
    "target": "Single NEAR",
    "effort": ""
  },
  {
    "name": "Zeke's Immolation",
    "school": "Infernal",
    "desc": "Surround yourself in blazing fire; CLOSE enemies take MAGICAL damage, and any being still CLOSE on the GM's TURN takes 1D6 Ambient Heat damage. Ignites flammables.",
    "target": "Self",
    "effort": "d10"
  },
  {
    "name": "Bind Soul",
    "school": "Infernal",
    "desc": "Mark a creature so that when it dies its immortal soul becomes yours, usable as a RARE INGREDIENT, a bargain, or to cast any SOUL magic at no COST.",
    "target": "Single touch",
    "effort": ""
  },
  {
    "name": "Burning Arrows",
    "school": "Infernal",
    "desc": "Condense an open flame into arrowheads so the arrows now deal MAGIC and ignite flammables. They glow in the quiver and last until used.",
    "target": "1D8 arrows/POWER",
    "effort": "d10"
  },
  {
    "name": "Driven",
    "school": "Infernal",
    "desc": "Boil a subject's blood so it frantically attacks its current task disregarding all risk; its INT, WIS, and CHA rolls are HARD while STR, CON, and DEX rolls are EASY.",
    "target": "Any NEAR",
    "effort": ""
  },
  {
    "name": "Flame Blade",
    "school": "Infernal",
    "desc": "Bathe a melee weapon you can see in fire so it inflicts MAGIC, burns victims for an additional 1D6 the next ROUND, and ignites flammables.",
    "target": "Single eyesight",
    "effort": "d10"
  },
  {
    "name": "Garland's Sphere",
    "school": "Infernal",
    "desc": "Conjure a lightless hovering sphere sent up to FAR; those NEAR it who fail a DEX roll are engulfed in anti-magic corrosion that saps the magic from all magic equipment.",
    "target": "Propel to FAR / NEAR radius",
    "effort": ""
  },
  {
    "name": "Glyph of Fire",
    "school": "Infernal",
    "desc": "Etch a glowing rune on a surface with a command or condition; when met, it explodes for 1D12 ULTIMATE fire damage per POWER on anything NEAR it.",
    "target": "Touch",
    "effort": "d12"
  },
  {
    "name": "Incantation of Fear",
    "school": "Infernal",
    "desc": "Place a curse that in 1 ROUND fills a NEAR radius with crippling fear; anything entering the area uses its next maximum MOVE to flee.",
    "target": "Touch / NEAR radius",
    "effort": ""
  },
  {
    "name": "Possession",
    "school": "Infernal",
    "desc": "Place a lesser demonic spirit in a victim's mind. Removing it via EXORCISM can be impossible or fatal and requires equal or higher POWER; effects vary widely.",
    "target": "Single NEAR",
    "effort": ""
  },
  {
    "name": "Shadow Form",
    "school": "Infernal",
    "desc": "Take the form of a smoke-like shadow able to slide through tiny cracks, inhibited only by airtight spaces and sunlight. Attacks against you are HARD and you become hidden with no rolls.",
    "target": "Self",
    "effort": ""
  },
  {
    "name": "Skull",
    "school": "Infernal",
    "desc": "Hex a creature's skull using 1 POWER per its MAX HEARTS; while carried, rolls regarding that creature type are EASY and you add another damage die when harming that type.",
    "target": "Single deceased / touch",
    "effort": ""
  },
  {
    "name": "Summoning Circle",
    "school": "Infernal",
    "desc": "Draw a glyphic circle and speak the name of a creature you have seen; 1 of those appears per POWER in 1D4 ROUNDS. Only a LEY WALKER is immune.",
    "target": "Touch",
    "effort": ""
  },
  {
    "name": "Flame Vortex",
    "school": "Infernal",
    "desc": "Create a 30-foot tornado of fire that slides randomly, burning anything it touches for 1D8 MAGICAL heat per POWER. Only wind, rain, or lack of air dissipates it.",
    "target": "Moves randomly",
    "effort": "d8"
  },
  {
    "name": "Kill Unseen",
    "school": "Infernal",
    "desc": "Focus on a creature you have touched and whisper its name; it drops to 0 HP in 1D4 ROUNDS no matter where it is, killing 1 HEART per POWER.",
    "target": "Any known and touched, single",
    "effort": ""
  },
  {
    "name": "Learn by Blood",
    "school": "Infernal",
    "desc": "Etch new SPELLS into your soul with a drop of blood; when creating a SPELL, roll this instead of conventional creation rolls to do 1D12 creation EFFORT per POWER.",
    "target": "Spell being created",
    "effort": "d12"
  },
  {
    "name": "Magic Bane",
    "school": "Infernal",
    "desc": "Scratch a malevolent rune that cancels all magic in a FAR radius until it is destroyed or erased.",
    "target": "FAR radius",
    "effort": ""
  },
  {
    "name": "Scythe",
    "school": "Infernal",
    "desc": "Materialize a bladed weapon of pure darkness; any creature hit by a STR attack with it drops to 0 HP instantly and rolls CON or loses 1D6 STAT points. It dissipates on a miss.",
    "target": "Any melee",
    "effort": ""
  },
  {
    "name": "Sound of Silence",
    "school": "Infernal",
    "desc": "Suppress all sound in an area around you, 1 range category per POWER (1 CLOSE, 2 NEAR, 3 FAR, 4 EYESIGHT), which also suppresses spells that use words of power.",
    "target": "Range per POWER",
    "effort": ""
  },
  {
    "name": "Transfusion",
    "school": "Infernal",
    "desc": "Draw blood from one living creature and transfer it to another, both above 0 HP and NEAR each other. The donor absorbs 1D8 MAGICAL damage per POWER (unresistable); the receiver heals twice that.",
    "target": "Two eyesight, both NEAR each other",
    "effort": "d8"
  },
  {
    "name": "Death",
    "school": "Infernal",
    "desc": "Rob a target you can see of its blood, dropping 1 HEART to 0 HP per POWER. Cast on a creature already at 0 HP, it is killed utterly, leaving a desiccated shell.",
    "target": "Single eyesight",
    "effort": ""
  },
  {
    "name": "Fire Wonder",
    "school": "Infernal",
    "desc": "Immolate a living creature you can see into a horned juggernaut of flame with 1 HEART per POWER, +2 to rolls per POWER, and 6 feet of height per POWER. It cannot speak.",
    "target": "Single eyesight",
    "effort": ""
  },
  {
    "name": "Forge",
    "school": "Infernal",
    "desc": "Forge metal weapons and objects from a refined ingot with no anvil or hammer; the item gains +1 to any STAT per POWER, but the caster must wait that many days for their hands to cool.",
    "target": "Metal ingot",
    "effort": ""
  },
  {
    "name": "Horns",
    "school": "Infernal",
    "desc": "Imbue a creature with INFERNAL power; over 1D20 days it gains red skin, a spiked tail, claws, +3 to any 3 STATS, an extra HEART, and use of Fire Missile and Ray of Souls.",
    "target": "Single touch/POWER",
    "effort": ""
  },
  {
    "name": "Vampire",
    "school": "Infernal",
    "desc": "Cast only at POWER 4 to convert one living or dead creature you can see into a vampire. Learning this SPELL permanently curses you with vampiricism.",
    "target": "Self or single bite",
    "effort": ""
  }
];
if (typeof window !== "undefined") window.ICRPG_SPELLS = ICRPG_SPELLS;
