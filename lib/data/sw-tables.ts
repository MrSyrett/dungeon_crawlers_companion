// GENERATED FILE - do not edit by hand.
// Source: data/sw/parts/*.json - regenerate with: node scripts/build-sw-data.mjs

import type { SwTables } from "./sw-types";

export const SW_TABLES: SwTables = {
  "quickRules": [
    {
      "title": "Dice and pips",
      "text": "A die code like 3D+2 means roll three six-sided dice and add 2. Codes go 2D, 2D+1, 2D+2, 3D. Skills start at the code of their attribute.",
      "book": "core"
    },
    {
      "title": "Skill rolls",
      "text": "Use a skill if one applies, otherwise the attribute. Roll equal to or higher than the difficulty number to succeed. Opposed rolls: the higher roll wins; ties go to the player character against NPCs.",
      "book": "core"
    },
    {
      "title": "Difficulty numbers",
      "text": "Very Easy 5, Easy 10, Moderate 15, Difficult 20, Very Difficult 30.",
      "book": "core"
    },
    {
      "title": "Multiple actions",
      "text": "Declare all non-reaction skill uses at the start of the round. Every skill use after the first costs 1D from all codes: two uses -1D, three -2D, four -3D. Reductions apply to every roll in the round.",
      "book": "core"
    },
    {
      "title": "Reaction skills",
      "text": "Dodge, brawling parry and melee parry (and piloting for evasion, starship shields) need not be declared and take no time. Each use counts as an extra action, penalizing only rolls made afterwards. Add the reaction roll to the attacker's difficulty.",
      "book": "core"
    },
    {
      "title": "Preparing",
      "text": "Spend a full round doing nothing, then use one skill next round at +1D. Lost if you use more than one skill or a reaction skill in either round.",
      "book": "core"
    },
    {
      "title": "Running",
      "text": "Walk 5 meters with any turn, no penalty. Run 10 meters with one 90-degree turn: all skill rolls that round at -1D. Crawl 2 meters while prone, also -1D. Modifiers are cumulative.",
      "book": "core"
    },
    {
      "title": "Combat rounds and segments",
      "text": "A round is five seconds. Decision, declaration, then action segments: each character performs one declared action (move, or a skill or attribute use) per segment, in the order declared, until all actions are done.",
      "book": "core"
    },
    {
      "title": "Initiative",
      "text": "Only matters when actions affect each other: both roll their skill (dexterity when moving); the higher roll acts first and the same roll decides success. Ties favor player characters; PC vs PC re-roll.",
      "book": "core"
    },
    {
      "title": "Shooting",
      "text": "Difficulty by range: point-blank (3 m) 5, short 10, medium 15, long 20, plus the target's dodge roll; +5 for cover, +5 for a prone target (not at point-blank). Ranges in meters vary by weapon.",
      "book": "core"
    },
    {
      "title": "Damage",
      "text": "Roll the weapon's damage against the target's strength (plus armor). Strength higher: stunned. Damage >= strength: wounded. >= 2x: incapacitated. >= 3x: mortally wounded. The strength roll is never penalized.",
      "book": "core"
    },
    {
      "title": "Wounds",
      "text": "Stunned: prone, lose the rest of the round. Wounded: -1D to everything until healed; wounded again becomes incapacitated. Incapacitated: unconscious. Mortally wounded: roll 2D each round; less than the rounds elapsed and the character dies.",
      "book": "core"
    },
    {
      "title": "Healing",
      "text": "Medpac (medicine roll 10/15/20) improves wound status one step, once. Bacta tank: 2D hours, days or weeks. Natural: daily strength roll — wounded heals on 12+, worsens on 2-6; incapacitated improves on 14+, dies on 2-8.",
      "book": "core"
    },
    {
      "title": "Hand-to-hand",
      "text": "Within two meters. Difficulty set by the weapon plus the defender's parry. Brawling damage is strength; melee weapons add their code to strength. Lightsabers use the lightsaber skill and do 5D plus the user's control dice.",
      "book": "core"
    },
    {
      "title": "Grenades",
      "text": "Roll grenade skill against range difficulty; a miss scatters (1D direction, 3D meters). Everyone within 10 m (20 m for a thermal detonator) is attacked by the grenade at 4D against range difficulty plus dodge; damage 5D/4D/3D/2D by distance. Dodging a grenade leaves you prone.",
      "book": "core"
    },
    {
      "title": "Force points",
      "text": "Spend one to double all codes for a round (and ignore stuns). Heroic use returns the point at the end of the adventure; heroic at the dramatic moment may earn an extra point; unheroic use loses it; evil use loses it and adds a Dark Side point.",
      "book": "core"
    },
    {
      "title": "Dark Side",
      "text": "On gaining a Dark Side point, the GM rolls 1D; less than the character's Dark Side total and the character is lost to the Dark Side. Jedi gain Dark Side points for any wrong act; each Dark Side point adds 1D to Force skills. Five sessions of clear atonement remove one point.",
      "book": "core"
    },
    {
      "title": "Force powers",
      "text": "Control, sense and alter are skills with no attribute. Each power lists a difficulty per skill; roll each and fail if any fails. Targets resist with perception or control. Proximity and relationship add to difficulties. A power can be kept up, counting as an ongoing action.",
      "book": "core"
    },
    {
      "title": "Skill points",
      "text": "Awarded at the end of an adventure (3-10, up to about 15). One pip costs the number before the D; a full D costs three times it. Attributes never rise. Force skills above the master's level cost double.",
      "book": "core"
    },
    {
      "title": "Character creation",
      "text": "Pick a template; attributes are fixed. Spread 7D across skills, at most 2D per skill. One Force point. Starting equipment and credits are on the card. Agree on a connection with at least one other character.",
      "book": "core"
    },
    {
      "title": "Movement and stance",
      "text": "Falling prone is free at the end of movement; getting up is an action. Prone targets are +5 to hit except at point-blank. Drawing a weapon, setting stun, or reloading costs 1D but no segment.",
      "book": "core"
    },
    {
      "title": "Starship combat",
      "text": "Gunner rolls gunnery plus fire control against range difficulty (5/10/15/20) plus the pilot's evasion (maneuverability plus piloting). Shields: one reaction roll per attack (10 long / 15 medium / 20 short) to add shield dice to hull. Damage -1D at medium, -2D at long range; compare to hull as for characters: light, heavy, severe, destroyed.",
      "book": "core"
    },
    {
      "title": "Starship pursuit",
      "text": "Both close: range drops a step. Both run: range opens; at long range the loser escapes. Otherwise roll speed dice (pilot may add piloting); the higher roll chooses.",
      "book": "core"
    },
    {
      "title": "Astrogation",
      "text": "Difficulty 15 for a standard-duration jump (30 with no nav computer); +1 per day cut, -1 per day added, x2 for a hasty jump, +5/+10 for light/heavy damage. Failure rolls 2D on the mishap table.",
      "book": "core"
    },
    {
      "title": "Repairs",
      "text": "Difficulty 10 light, 20 heavy, 30 severe (+10 without tools). Roll after 15 minutes, then a day, then two days; each failed roll reduces the remaining difficulty by the amount rolled.",
      "book": "core"
    },
    {
      "title": "Dice and pips",
      "text": "Every die is three pips. When improving a skill or equipment code, pips round up to dice (3D+2 to 4D; 1D+2 plus 2D+1 = 4D). In play, modifiers never round up: a character may roll 4D+6. Adding or subtracting pips always gives pips back (a doubled 5D+2 is 10D+4).",
      "book": "companion"
    },
    {
      "title": "Difficulty scale",
      "text": "Difficulty numbers are a scale, not absolutes: Very Easy 3-5, Easy 6-10, Moderate 11-15, Difficult 16-20, Very Difficult 21-30. Combat ranges, knowledge, general knowledge and medpac use have matching scales (medpac: wounded 6-10, incapacitated 11-15, mortally wounded 16-20). Be consistent from instance to instance and keep early adventures in the lower end of each scale.",
      "book": "companion"
    },
    {
      "title": "Combined actions",
      "text": "Two or more characters may combine on one task. One is the lead character and rolls his own code; add one pip for every full die of skill, attribute or fire control each supporting character has, and roll once. A combined action counts as one action for everyone involved (reduce codes for multiple actions as usual). Reaction skills, beast riding, repulsorlift operation, starship piloting, single-weapon gunnery, stamina and most Perception skills (except search and con) may not be combined. Exceeding the sensible limit for a task loses the bonus and costs -3 pips per extra character.",
      "book": "companion"
    },
    {
      "title": "Coordinating and combined fire",
      "text": "With ample time any number may combine. In combat or under time pressure, the maximum combining on a non-combat skill equals the highest participating skill die code; coordinating the work is itself an action. Command is the skill for combining fire: the maximum firers equals the coordinator's command code (reduced 1D per other action he takes); the coordinator may switch the lead firer. Any stormtroopers who can see a target may combine fire without limit, shifting lead firer automatically if he is wounded.",
      "book": "companion"
    },
    {
      "title": "Uncertainty dice (optional)",
      "text": "For non-combat skills where the character cannot be sure of the result, the gamemaster may add two to four uncertainty dice to the player's roll, then rolls the same number himself and subtracts them from the player's total. The gamemaster need not reveal the result; on average the dice cancel, but the player can never be sure.",
      "book": "companion"
    },
    {
      "title": "Movement actions",
      "text": "Replaces the core movement and chase rules. Four movement actions: speed, overspeed, maneuver and ramming; each is an action for the multiple action penalty. Declare all movement, including the number of speed actions (up to the base speed code, pips rounded up: Dexterity on land, swimming in water, speed or sublight code for vehicles). Roll the operator skill (dodge on land, swimming in water) plus the vehicle or mount speed code against the movement difficulty; failure means loss of control.",
      "book": "companion"
    },
    {
      "title": "Movement distances",
      "text": "Each successful speed action moves: character or creature 10 meters; AT-AT walker 100; repulsorlift vehicle 250; starfighter or capital ship 10,000. Walking (half speed - up to 5 meters, a walker 50, a landspeeder 125, a starfighter 5,000) costs no action. Prone characters crawl 2 meters per die. Operating outside the native medium drops one level (or to 2 meters per action on the character scale). Minimum full move: 1 meter for a character; for a vehicle, the full move of the level below.",
      "book": "companion"
    },
    {
      "title": "Movement difficulty",
      "text": "Very Easy: flat artificial ground, calm water, unobstructed terrain, straight flight in space. Easy: natural ground, city repulsorlifting, a busy spaceport. Moderate: broken ground, constricted swimming, maneuvering to avoid fire, a sandstorm. Difficult: a panicked crowd, turbulent water, speeder bike racing through the Endor forest, combat in debris. Very Difficult: a starship breaking apart, a dense asteroid field under fire. Regaining control after a failed roll is +5. Each overspeed action gives one extra speed action's distance that round, reduces all die codes by 1D and adds +3 to the difficulty.",
      "book": "companion"
    },
    {
      "title": "Maneuver and ramming",
      "text": "In a chase a maneuver action is an opposed roll of operator skill plus maneuver code (no speed code); the winner reserves speed actions to use after his opponent moves: beat the loser 1, double it 2, triple it 3. If the opponent does not maneuver, success is automatic (as 2x). Ramming (opponents less than a full move apart): opposed operator rolls plus hull or body Strength, using the Damage Scale Chart for scale differences. Beat the loser: +5 to his movement difficulty, failure wounds/heavily damages; 2x: +10, failure incapacitates/severely damages with collision damage for occupants; 3x: loser mortally wounded/destroyed.",
      "book": "companion"
    },
    {
      "title": "Collision damage",
      "text": "Replaces the core Falling and Collisions table. Damage dice by speed actions: characters 1D 2D, 2D-3D 3D, 4D-7D 5D, 8D-10D 6D; walkers 1D 6D, 2D 7D, 3D 8D, 4D 9D; speeders 1D 8D, 2D 9D, 3D 10D, 4D 11D, 5D 12D, 6D 14D; starfighters 1D+ 14D. Every three pips a movement roll is missed by is one speed action not taken; the first is where control was lost.",
      "book": "companion"
    },
    {
      "title": "Combat sequence",
      "text": "Each round has four segments: 1. Declare actions and full reaction skills, lowest Dexterity first (NPC first on ties). 2. Declare combat reaction skills (combat dodge, parry, evasion, shielding), highest Dexterity first; haste may be increased here but never decreased. 3. Roll actions and reactions in order of haste - non-movement actions first, then movement, at each degree of haste. 4. Calculate damage as hits occur. Haste declared in segment 1 applies to all actions; haste added in segment 2 applies to reactions only. Optionally, a character may degrade the haste of some of his actions to sequence them.",
      "book": "companion"
    },
    {
      "title": "Reaction skills: full and combat",
      "text": "A full dodge/parry/evasion (declared in segment 1) adds the reaction roll to the attacker's difficulty; the character may only add haste and movement (not ramming). It requires a speed action that does not reduce the reaction roll. A combat dodge (declared in segment 2) lets the defender substitute his dodge roll for the difficulty and counts as an action (-1D). One reaction roll covers all attacks of that type for the round, but dodge does not affect melee attacks. A reaction must be at a haste equal to or greater than the attack it counters.",
      "book": "companion"
    },
    {
      "title": "Preparation and stance",
      "text": "Preparing lets a character raise one skill code by 1D next round; he does nothing else in the preparing round, and only skills that take a round can be prepared. Characters are standing (including crouching or kneeling) or prone; falling prone is free and prone targets are +2 to hit, but rising counts as an action (-1D).",
      "book": "companion"
    },
    {
      "title": "Stun damage",
      "text": "Replaces the core stun rules. Setting a blaster on stun is an action. Stun results reduce all die codes except Strength by 1D per stun for the rest of this round and the next, cumulatively. If the stuns taken in one round equal the character's Dexterity dice he is immobile (no Dexterity actions); if total stuns equal his stamina dice he falls unconscious. 2xDR < SR is always no effect (also no ionization or shield loss for starships).",
      "book": "companion"
    },
    {
      "title": "Damage Summary (personal combat)",
      "text": "2xDR < SR: no effect. DR < SR: Stun -1D (stun weapon: no effect). DR >= SR: wound (stun weapon: -1D). DR >= 2xSR: incapacitated (stun weapon: -2D). DR >= 3xSR: mortally wounded (stun weapon: unconscious). Grenades scatter 1D meters at short range, 2D at medium, 3D at long. Surprise gives two free haste actions.",
      "book": "companion"
    },
    {
      "title": "Medpacs",
      "text": "Medpacs may be used more than once a day, but each medpac beyond the first in a day increases the difficulty by three (base: wounded 6-10, incapacitated 11-15, mortally wounded 16-20).",
      "book": "companion"
    },
    {
      "title": "Optional fire modifiers",
      "text": "Target prone +2; light cover +1, medium +2, heavy +5; firing through an aperture adjacent to the firer +1, otherwise door +2, window +3, slit +4. Target size (personal combat): under 1 cm +15, 1-10 cm +10, 11-50 cm +5, 51-99 cm +2, 1-3 m none, 3-9 m -3, 10-99 m -5, 100 m or more -10.",
      "book": "companion"
    },
    {
      "title": "Melee weapons",
      "text": "Replaces the bottom of the core Weapons Chart. Damage at point-blank range (difficulty): hands STR (3-5); club STR+1D (3-5); gaderffii STR+1D (3-5); spear STR+1D+1 (6-10); vibroaxe STR+2D (11-15); vibroblade STR+1D+2 (11-15); lightsaber 5D (16-20), and characters with Control add their skill code to lightsaber damage.",
      "book": "companion"
    },
    {
      "title": "Scale and die caps",
      "text": "Six scales: character, speeder, walker, starfighter, capital ship, Death Star. When scales differ, find the die cap on the To Hit, Damage or Maneuver scale chart; dice showing more than the cap are not counted. The damage cap applies to both the damage roll and the resisting roll. A character-scale weapon cannot damage a capital ship or the Death Star (cap 2 against starfighters); a starfighter shooting a character has a cap of 3.",
      "book": "companion"
    },
    {
      "title": "Starship combat revisions",
      "text": "Astrogation times are hours, not days (minimum one hour). Starship combat uses the four-segment sequence. Full evasion penalizes gunners aboard (add the evasion roll to their difficulty) and other actions (+5); combat evasion substitutes the pilot's roll for the difficulty and affects nobody else. Shielding is a reaction skill: shield roll + difficulty is the shield number; hits below it add shield dice to hull. Missiles and torpedoes are +1D to hit per speed action of the target. Tractor beams have a Strength code opposed by the target's sublight roll.",
      "book": "companion"
    },
    {
      "title": "Starship damage and ionization",
      "text": "Lightly damaged with no effective shields = ionized: all codes except hull -1D this round and next. Ion cannons cause only ionization, rolled against hull with no shield protection: DR<SR lose shield generator; DR>SR -1D; DR>2xSR -2D; DR>3xSR dead controls (nothing for one round, then -3D). Standard Y-wing: shields 3D+2, hull 2D+2.",
      "book": "companion"
    },
    {
      "title": "Capital ship combat",
      "text": "Declaration order is by command skill; a fifth segment records hits on the ship template. Guns are fired in groups: the Guns Modifier (2 guns +2 ... 12 guns +2D+1 ... 250 guns +5D+1) is added to fire control plus crew code to hit, and to weapon damage. Damage is recorded in pips: 3 pips heavily damaged (-1D), 6 severely (-2D), 9 destroyed; hull rolls never drop. Facing matters only when a shield facing is shut down. The commander must spend 1D of command on each of the pilot, gunnery and shields officers.",
      "book": "companion"
    },
    {
      "title": "Starship tactics and command",
      "text": "Starship tactics is a Knowledge skill: Moderate roll to anticipate the enemy (a free haste action), Difficult to deceive the enemy (redeclare after hearing the opponent). Command actions give subordinates +1 pip each, coordinate one extra ship's guns per action, or assign extra haste levels (-1D each). Advanced options: shut down a damaged shield facing (Moderate), double a facing by burning out another (Difficult), and targeted attacks on engines, maneuver, fire control, weapons, command or vital locations.",
      "book": "companion"
    },
    {
      "title": "Aliens and NPC templates",
      "text": "When adding 6D to a Sourcebook alien template to make a player character, 1D must go to each of the six attributes. NPC templates total 12D of attributes; player characters total 18D.",
      "book": "companion"
    },
    {
      "title": "Creating Droids",
      "text": "All Droid attributes start at 1D. NPC Droids get 35D of building dice, PC Droids 65D. Each 1D of attribute costs 5D; each 1D of speed code or armor costs 3D; each tool or piece of equipment costs 1D (+1D per extra feature); remaining dice go to skills 1 for 1. No Droid skill may exceed 13D and Droids never have Force skills. Droid skills improve with skill points; new skills also cost 1,000 credits.",
      "book": "companion"
    },
    {
      "title": "Improving equipment",
      "text": "Equipment die codes are raised with skill points like skills (0D codes cost one point per pip); attribute-enhancing codes (speed, fire control, maneuver, shields, armor) cost three more per pip, and every pip of armor lowers Dexterity by a pip unless offset. Costs by scale (time per pip / credits per skill point): character 1 day/10; speeder 3 days/100; walker 3 days/500; starfighter 1 week/500; capital 1 month/1,000,000. A technology roll follows: pip 1 Very Easy up to pip 5+ Very Difficult; failure wastes the points. Hyperdrive x4>x3 5 points, x3>x2 10, x2>x1 20, x1>x1/2 40.",
      "book": "companion"
    },
    {
      "title": "Equipment availability",
      "text": "Availability F requires a fee or permit, normally five percent of the price (one to 15 percent). Availability R is restricted: a license averaging 10 percent (five to 100 percent) with a background check; an NPC specialist finds anything on a Rebel with a Difficult bureaucracy or computer programming roll (Moderate if the Rebel is a little infamous, Easy if as well known as Han Solo).",
      "book": "companion"
    },
    {
      "title": "The Dark Side",
      "text": "Replaces the core Dark Side rules. Calling on the Dark Side is a free action: Perception or Control roll at difficulty 6, +3 per further call this adventure, +10 if no intended action harms a living being. Success gives a Force Point (use it this round) and a Dark Side Point. Each Dark Side Point gained: roll 1D; if it is less than or equal to the total, the character is consumed and becomes an NPC. Evil acts, with or without the Force, also earn points. Atone by spending a non-Dark-Side Force Point (returned later) - one point removed per adventure at most.",
      "book": "companion"
    },
    {
      "title": "Force training",
      "text": "A teacher (higher Force codes) is needed to improve or learn Force skills if the template started with them; otherwise a master (all three skills at 7D+). Control or Sense first, Alter last; ten weeks per skill, minus one week per skill point spent (minimum one week), starting at 1D. Self-training or exceeding the teacher costs double. Powers are mastered three per die plus one per pip of each skill (three fixed powers per die in traditional training); a week each, free from a teacher or one skill point alone. Unmastered powers may be used at +5 difficulty.",
      "book": "companion"
    },
    {
      "title": "Force power difficulties",
      "text": "Force power difficulties now use the difficulty scale: 5 is Very Easy (3-5), 10 Easy (6-10), 15 Moderate (11-15), 20 Difficult (16-20), 30 Very Difficult (21-30), modified by proximity and relationship as in the core rules. All skills in a power are rolled at once as multiple skill use (-1D per extra skill). Inflict pain, injure/kill, telekinetic kill and attacking with telekinesis give a Dark Side Point immediately.",
      "book": "companion"
    },
    {
      "title": "Space suits and syntherope",
      "text": "Emergency space suits leak after 72 hours (treat as a wound) and fail after 120 hours; utility suits last hundreds of hours but leak (an extra wound) when the wearer is wounded by a puncturing attack; high-quality suits only leak on a mortal wound. Syntherope has Strength 3D that holds through incapacitating damage, in 15 meter coils. Breath masks allow survival in near-vacuum but not cold or hard vacuum.",
      "book": "companion"
    }
  ],
  "superseded": {
    "difficulties": [
      {
        "name": "Very Easy",
        "range": "5",
        "text": "Firing a blaster at point-blank range. Knowing that Wookiees are called Wookiees. Putting a restraining bolt on a Droid."
      },
      {
        "name": "Easy",
        "range": "10",
        "text": "A little tougher, but most characters should be able to do it most of the time. Firing a blaster at short range. Knowing that Wookiees use bowcasters. Replacing a Droid's visual sensors."
      },
      {
        "name": "Moderate",
        "range": "15",
        "text": "Requires a little skill and effort. Firing a blaster at medium range. Knowing that Wookiees like to win. Fixing a Droid's servomotors."
      },
      {
        "name": "Difficult",
        "range": "20",
        "text": "Pretty tough — really requires a lot of skill and maybe a little luck. Firing a blaster at long range. Knowing the customs and eating habits of Wookiees. Reconditioning a badly-worn and damaged Droid."
      },
      {
        "name": "Very Difficult",
        "range": "30",
        "text": "Requires great expertise, real effort, and complete dedication. Firing a blaster at long range at someone dodging. Eating a meal with Wookiees while obeying all their customs. Rebuilding a Droid blown to smithereens."
      }
    ],
    "ranges": [
      {
        "name": "Point-Blank",
        "modifier": "5",
        "text": "Anything within 3 meters, regardless of weapon."
      },
      {
        "name": "Short",
        "modifier": "10",
        "text": "Up to the weapon's short range in meters (e.g. 10 m for a blaster pistol, 30 m for a blaster rifle). Most combat indoors."
      },
      {
        "name": "Medium",
        "modifier": "15",
        "text": "Up to the weapon's medium range. Most combat out of doors."
      },
      {
        "name": "Long",
        "modifier": "20",
        "text": "Up to the weapon's long range. Usually only when sniping from great distances."
      },
      {
        "name": "Grenade blast",
        "modifier": "5/10/15/20",
        "text": "When a grenade explodes, each character within 10 meters (20 for a thermal detonator) is at point-blank (3 m), short (3-4 m), medium (5-6 m) or long (7-10 m) range; roll 4D for the grenade against that difficulty plus any dodge. Damage 5D/4D/3D/2D by range."
      }
    ],
    "damageResults": [
      {
        "range": "Strength roll > damage roll",
        "text": "Stunned — falls prone, loses the rest of the round. Blaster set on stun: no effect."
      },
      {
        "range": "Damage roll >= strength roll, < 2x",
        "text": "Wounded — -1D to all rolls until healed. Blaster set on stun: stunned for two combat rounds."
      },
      {
        "range": "Damage roll >= 2x strength roll, < 3x",
        "text": "Incapacitated — unconscious until healed. Blaster set on stun: knocked unconscious."
      },
      {
        "range": "Damage roll >= 3x strength roll",
        "text": "Mortally wounded — unconscious, roll 2D each round to avoid death. Blaster set on stun: knocked unconscious."
      },
      {
        "range": "Vehicles and objects (hull code)",
        "text": "Stun = light damage (repair 10); wound = heavy damage, speed reduced 1D (repair 20); incapacitate = severe damage, vehicle stops and operator rolls to avoid a crash (repair 30); kill = destroyed. Objects: 1D hull if delicate, 2D normal, 3D+ armored."
      }
    ],
    "combatModifiers": [
      {
        "name": "Preparing",
        "text": "Spend one round doing nothing, then use a single skill in the next round at +1D. Lost if you use two or more skills or a reaction skill in either round; not available for skills that take longer than a round."
      },
      {
        "name": "Running",
        "text": "A running character (up to 10 meters, one 90-degree turn) reduces all skill codes by 1D. Walking (5 meters, any turn) has no penalty. Crawling (2 meters, prone) also -1D."
      },
      {
        "name": "Wounded",
        "text": "All skill and attribute codes reduced by 1D."
      },
      {
        "name": "Multiple actions",
        "text": "Every skill use after the first in a round costs 1D from all codes used that round: two uses -1D, three -2D, four -3D, and so on. Reaction skills (dodge, parries) count as extra uses but only affect rolls made after them."
      },
      {
        "name": "Dodge / parry",
        "text": "Add the dodge (or parry) roll to the attacker's difficulty number. One dodge affects all fire and grenade attacks in that segment. Melee parry works against melee and brawling attacks; brawling parry only against brawling; dodge doesn't affect hand-to-hand attacks."
      },
      {
        "name": "Cover",
        "text": "Target protected by a wall or other obstruction: +5 to the difficulty."
      },
      {
        "name": "Prone target",
        "text": "+5 to the difficulty, unless at point-blank range."
      },
      {
        "name": "Drawing a weapon / setting stun / reloading",
        "text": "Costs 1D from all skill and attribute codes that round, but does not take an action segment."
      },
      {
        "name": "Armor",
        "text": "Adds its code to strength for damage resistance only, and reduces dexterity (and dexterity skills) by the same amount."
      },
      {
        "name": "Hand-to-hand",
        "text": "Attacks only within two meters. Base difficulty is set by the weapon (Weapon Chart), plus the defender's parry roll. Brawling damage is strength; melee damage is the weapon's code plus strength."
      },
      {
        "name": "Lightsaber parry",
        "text": "A melee weapon that hits above its base difficulty but below the lightsaber-modified difficulty is cut in half; a brawler in the same case is wounded. Only a lightsaber can parry a lightsaber."
      },
      {
        "name": "Surprise (optional)",
        "text": "Ambushers get one action segment of surprise; targets cannot move, use skills, or dodge in it."
      },
      {
        "name": "Grenades in enclosed areas (optional)",
        "text": "+1D damage in an enclosed area; -1D through a door or window, -2D through a slit, -1D in vacuum; no effect through walls."
      },
      {
        "name": "Force point",
        "text": "All skill and attribute codes are doubled for the round; the character ignores being stunned that round."
      }
    ],
    "force": [
      {
        "name": "Force points",
        "text": "Every player character begins with one Force point. Spending one doubles all skill and attribute codes for that combat round, and the character ignores being stunned that round. A character cannot spend more Force points in an adventure than he possesses."
      },
      {
        "name": "Four results",
        "text": "Doing wrong (killing or injuring except in defense, gaining power, acting in anger or hate): the point is lost permanently and the character gains a Dark Side point. Unheroic (avoiding danger, saving your own butt, gaining money): the point is lost. Heroic (great danger, sacrifice for others, big risks for the Alliance): the point returns at the end of the adventure. Heroic at the dramatically appropriate moment: the point returns and the gamemaster may award another."
      },
      {
        "name": "Dark Side points",
        "text": "Whenever a character gains a Dark Side point, the gamemaster rolls 1D; if the roll is less than the character's total Dark Side points, he goes over to the Dark Side and becomes a gamemaster character. Always warn a player before he earns one."
      },
      {
        "name": "Atonement",
        "text": "A character who consciously attempts to atone — announcing it and clearly avoiding wrongful acts — for five sessions of play reduces his Dark Side total by one. Any questionable act restarts the count."
      },
      {
        "name": "The Jedi Code",
        "text": "There is no emotion; there is peace. There is no ignorance; there is knowledge. There is no passion; there is serenity. There is no death; there is the Force. A Jedi may not kill except in self-defense or the defense of others; may not act for personal gain of wealth or power; never acts from hatred, anger, fear or aggression. Characters with Force skills gain Dark Side points whenever they do wrong, not only when spending Force points."
      },
      {
        "name": "Force skills",
        "text": "Control, sense and alter are not governed by any attribute. The first skill learned is normally control, then sense, then alter; each takes a week with a master and starts at 1D. A master can only teach what he knows, may have one pupil at a time, and may not teach anyone with Dark Side points or who will not abide by the Jedi Code. Starting templates with Force skills: Alien Student (control, sense, alter), Failed Jedi (control, sense), Minor Jedi (control), Quixotic Jedi (sense — self-taught)."
      },
      {
        "name": "Using powers",
        "text": "Each power lists a difficulty number per skill required; make a separate roll for each skill, and failing any one means the power fails. Using a Force skill takes one combat round; a multi-skill power can be attempted in one round (with multiple-action penalties) or over several rounds. Using Force skills does not cost Force points."
      },
      {
        "name": "Dark Side modification",
        "text": "A character with Dark Side points adds 1D to his Force skill codes per Dark Side point — the Dark Side is the easier, more seductive path."
      },
      {
        "name": "Resisting powers",
        "text": "When a power is used against a character's will, roll the target's perception (or control, if he has it) against the Force skill roll; if perception is greater, the power fails."
      },
      {
        "name": "Keeping a power up",
        "text": "A player may announce before rolling that he will keep a power continuously operating. It stays up until dropped, or until the character is stunned or wounded or distracted. While a power is up, its skills count as being used for the purposes of multiple-action penalties on all other rolls."
      },
      {
        "name": "Proximity modifiers",
        "text": "User and target in physical contact: +0; in line of sight but not touching: +2; not in line of sight, 1-100 meters: +5; 101 m-10 km: +7; 11-1000 km: +10; same planet but more than 1000 km: +15; same star system but not the same planet: +20 (farseeing only); not in the same star system: +30 (farseeing only)."
      },
      {
        "name": "Relationship modifiers",
        "text": "Close relatives (married, siblings, parent and child): +0; close friends: +2; friends: +5; acquaintances: +7; slight acquaintances: +10; met once: +12; never met but know each other by reputation: +15; complete strangers: +20; complete strangers not of the same species: +30."
      },
      {
        "name": "Lightsabers",
        "text": "Anyone may use a lightsaber (damage 5D, lightsaber skill; strength is never added). A character with control adds his control dice to the damage. A character with sense may parry with sense instead of melee parry (sense is then a reaction skill), may parry blaster bolts by adding his sense roll to the firer's difficulty, and may reflect a missed bolt at another target with a second sense roll against the range difficulty of that blaster."
      }
    ],
    "starship": [
      {
        "name": "Ship codes",
        "text": "Speed (catching or escaping opponents), Maneuverability (evading fire), Hull (resisting damage, like strength), Shields (added to hull when the shield operator succeeds). Each weapon has Fire Control (added to the gunner's roll) and Damage."
      },
      {
        "name": "Sequence",
        "text": "Piloting segment: everyone declares actions. Speed segment: range changes. First fire segment: gunnery rolls, evasion, shields, damage. Second and subsequent fire segments for additional shots."
      },
      {
        "name": "Range and pursuit",
        "text": "Ships are at short, medium or long range. If both close, range drops one step; if both run, range opens one step (at long range the fight is over). If one closes and one runs, roll speed dice; the higher roller chooses. A pilot may add a piloting roll to the speed roll (a skill use). A ship doing nothing lets its opponent decide."
      },
      {
        "name": "Gunnery",
        "text": "Roll gunnery skill plus the weapon's fire control. Difficulty 5 point-blank, 10 short, 15 medium, 20 long, plus the target's evasion. A gunner may fire his weapon more than once, each a separate action."
      },
      {
        "name": "Evasion",
        "text": "The pilot (or copilot) rolls the ship's maneuverability plus his piloting skill and adds the total to every attacker's difficulty for that fire segment. Piloting is a reaction skill for this purpose; each evasion is a skill use."
      },
      {
        "name": "Shields",
        "text": "A reaction skill; one roll per attack, decided before the attacker rolls. Difficulty 10 at long range, 15 medium, 20 short. Success adds the ship's shield dice to its hull roll. Multiple skill uses reduce the operator's codes, never the ship's."
      },
      {
        "name": "Damage",
        "text": "Reduce weapon damage by 1D at medium range and 2D at long. Hull (plus shields) roll greater than damage: lightly damaged — controls ionized (no speed, maneuver, fire, piloting or gunnery rolls next round) or, if shields were used, shields blown (-1D shields until repaired). Damage >= hull, < 2x: heavily damaged — speed, maneuver, fire control and shields -1D. Damage >= 2x: severely damaged — as heavy plus a system knocked out (Starship System Damage Table). Damage >= 3x: destroyed. Heavily damaged again: severely damaged; severely damaged then heavily: dead in space; severely damaged twice: destroyed."
      },
      {
        "name": "Torpedoes and missiles",
        "text": "Short range only; add the target's speed roll to the fire difficulty; completely dissipated by a successful shield attempt."
      },
      {
        "name": "Multiship combat",
        "text": "One ship against several: it runs from all or closes with one; resolve each pursuer separately. Several against several: split into dogfights; extra ships may join any dogfight; a ship that destroys its opponent may join another fight at long range next round."
      },
      {
        "name": "Ships and characters",
        "text": "A ship firing at a character is at short range but difficulty 20; double the ship weapon's damage code against a character. A hand blaster hitting a ship does 1D (repeating blasters 2D) and has no effect if the roll is less than half the hull roll."
      },
      {
        "name": "Astrogation",
        "text": "Standard duration by route: major trade route 3 days, commonly travelled 7, lightly travelled 14, infrequently travelled 21, last travelled more than 3 years ago 30, never travelled 30+; +1-14 days through a gas cloud or star cluster or asteroid field; multiply by the ship's hyperdrive multiplier. Difficulty 15 (30 without a nav computer); +1 per day saved, -1 per extra day taken; x2 for hasty entry (one round, needs a 15 to enter hyperspace); +5 lightly damaged, +10 heavily damaged; severely damaged ships cannot jump. Trips take at least one day."
      },
      {
        "name": "Astrogation mishaps (2D)",
        "text": "2-3 hyperdrive cut-out, damage sustained (1 day lost, lightly damaged); 4 radiation fluctuations (lightly damaged, duration changes); 5-6 hyperdrive cut-out, no damage (1 day lost); 7 off course (1 day lost, new trip needed); 8 Mynocks (3D days longer unless removed); 9-10 close call (1 day lost, heavily damaged); 11-12 collision — heavy damage, ship hulled (survival rolls, difficulty 10, to suit up)."
      },
      {
        "name": "Repairs",
        "text": "Starship repair difficulty 10 light, 20 heavy, 30 severe (+10 without tools and parts). Roll after 15 minutes; failure subtracts the roll from the difficulty; roll again after a day, then after two more days; then only a repair facility can finish the job."
      }
    ]
  },
  "attributes": [
    {
      "name": "Dexterity",
      "description": "A measure of a character's coordination, balance, and physical finesse. A character with high dexterity is good at dodging blaster fire while balancing on a beam; a character with low dexterity is clumsy."
    },
    {
      "name": "Knowledge",
      "description": "A character's education and knowledge of facts and data. Used whenever you want to find out whether a character knows something; the difficulty depends on the obscurity of the information and the character's familiarity with the subject."
    },
    {
      "name": "Mechanical",
      "description": "Short for mechanical aptitude — the instinctive ability to control vehicles and other complex machines. A character with high mechanical makes a hot pilot."
    },
    {
      "name": "Perception",
      "description": "Measures the sharpness of a character's senses, his ability to interpret the behavior of others, and his powers of observation. Used when a character might overlook something he sees or hears, and when he attempts to persuade non-player characters."
    },
    {
      "name": "Strength",
      "description": "A measure of physical prowess including stamina, the ability to heal, and athletic abilities as well as raw physical strength. Rolled to resist damage."
    },
    {
      "name": "Technical",
      "description": "Short for technical aptitude — an instinctive feel for technology. Used whenever a character tries to figure out what something does, how it works, or how to fix it."
    }
  ],
  "difficulties": [
    {
      "name": "Very Easy",
      "range": "3-5",
      "text": "Companion revision: difficulty numbers are now a scale. Very Easy tasks (point-blank range; everyone knows it)."
    },
    {
      "name": "Easy",
      "range": "6-10",
      "text": "Companion revision. Easy tasks (short range; common knowledge; medpac on a wounded character)."
    },
    {
      "name": "Moderate",
      "range": "11-15",
      "text": "Companion revision. Moderate tasks (medium range; no secret but not widely known; medpac on an incapacitated character)."
    },
    {
      "name": "Difficult",
      "range": "16-20",
      "text": "Companion revision. Difficult tasks (long range; specialized knowledge; medpac on a mortally wounded character)."
    },
    {
      "name": "Very Difficult",
      "range": "21-30",
      "text": "Companion revision. Very Difficult tasks (expert or truly comprehensive knowledge). Reserve the top of the scale for exceptional circumstances; pick numbers consistently from instance to instance."
    }
  ],
  "woundLevels": [
    {
      "name": "Stunned",
      "text": "Strength roll greater than damage roll. The character falls prone and can't do anything for the rest of the combat round."
    },
    {
      "name": "Wounded",
      "text": "Damage roll equal to or greater than the strength roll, but less than twice it. The character falls prone and can't act for the rest of the round; all skill and attribute codes are reduced by 1D until healed. A wounded character who is wounded again is incapacitated."
    },
    {
      "name": "Incapacitated",
      "text": "Damage roll at least twice the strength roll, but less than three times. The character falls prone and is unconscious; he can't do anything until healed. Wounded or incapacitated again: mortally wounded."
    },
    {
      "name": "Mortally Wounded",
      "text": "Damage roll at least three times the strength roll. Unconscious and cannot be roused. At the end of every combat round roll 2D; if the roll is less than the number of rounds since the character was mortally wounded, he dies — unless he reaches a medical Droid, rejuvenation tank, or is treated with a medpac."
    },
    {
      "name": "Healing: medpac",
      "text": "Medicine roll, difficulty 10 (wounded), 15 (incapacitated), 20 (mortally wounded). Success reduces wound status by one degree; a character can only be treated once, and not again the same day. A wounded character treating himself rolls at -1D. The medpac is expended."
    },
    {
      "name": "Healing: rejuvenation tank",
      "text": "Bacta tank. Wounded: healed in 2D hours. Incapacitated: 2D days. Mortally wounded: 2D weeks."
    },
    {
      "name": "Healing: natural",
      "text": "Strength roll once per day starting the day after injury. Wounded: 2-6 incapacitated, 7-11 no change, 12+ healed. Incapacitated: 2-8 dead, 9-13 no change, 14+ wounded."
    }
  ],
  "damageResults": [
    {
      "range": "2xDR < SR",
      "text": "Companion revision (Damage Summary, Personal Combat): no effect. Escaping unscathed applies to all combat; for stun weapons also no effect."
    },
    {
      "range": "DR < SR",
      "text": "Stun -1D (all die codes except Strength reduced by 1D for the rest of this round and the next). Stun-set weapons: no effect."
    },
    {
      "range": "DR >= SR",
      "text": "Wounded. Stun-set weapons: 1 Stun (-1D)."
    },
    {
      "range": "DR >= 2xSR",
      "text": "Incapacitated. Stun-set weapons: 2 Stun (-2D)."
    },
    {
      "range": "DR >= 3xSR",
      "text": "Mortally wounded. Stun-set weapons: unconscious."
    }
  ],
  "ranges": [
    {
      "name": "Point-Blank",
      "modifier": "3-5",
      "text": "Companion revision: to-hit difficulty is a scale. Anything less than 3 meters away is point-blank for ranged weapons; melee weapons do listed damage at point-blank."
    },
    {
      "name": "Short",
      "modifier": "6-10",
      "text": "Companion revision. Grenade scatter at short range: 1D meters."
    },
    {
      "name": "Medium",
      "modifier": "11-15",
      "text": "Companion revision. Grenade scatter at medium range: 2D meters."
    },
    {
      "name": "Long",
      "modifier": "16-20",
      "text": "Companion revision. Grenade scatter at long range: 3D meters."
    }
  ],
  "combatModifiers": [
    {
      "name": "Target prone",
      "text": "Companion revision (Optional Fire Modifiers Chart): +2 to the to-hit difficulty. Rising from prone counts as an action (-1D to other actions); prone characters crawl 2 meters per declared die of speed."
    },
    {
      "name": "Light cover",
      "text": "+1 to the to-hit difficulty (optional fire modifier)."
    },
    {
      "name": "Medium cover",
      "text": "+2 to the to-hit difficulty (optional fire modifier)."
    },
    {
      "name": "Heavy cover",
      "text": "+5 to the to-hit difficulty (optional fire modifier)."
    },
    {
      "name": "Aperture adjacent to firer",
      "text": "+1 to the to-hit difficulty."
    },
    {
      "name": "Door (otherwise)",
      "text": "+2 to the to-hit difficulty when firing through a door."
    },
    {
      "name": "Window (otherwise)",
      "text": "+3 to the to-hit difficulty when firing through a window."
    },
    {
      "name": "Slit (otherwise)",
      "text": "+4 to the to-hit difficulty when firing through a slit."
    },
    {
      "name": "Target size (personal combat only)",
      "text": "Less than 1 cm tall +15; 1-10 cm +10; 11-50 cm +5; 51-99 cm +2; 1-3 m no modifier; 3-9 m -3; 10-99 m -5; 100 m or larger -10."
    },
    {
      "name": "Surprise",
      "text": "Surprise gives a character two free haste actions for the combat round; they do not lower any of his die codes."
    },
    {
      "name": "Setting a blaster on stun",
      "text": "Counts as an action (-1D to other actions this round). Weapons on stun keep their normal damage code but use the stun column of the Damage Summary."
    },
    {
      "name": "Combined fire",
      "text": "Lead firer rolls his skill; add one pip for every full die of skill each supporting character has. Command skill sets the maximum number who may combine fire (stormtroopers who can see the target have no limit)."
    }
  ],
  "creation": {
    "attributeDice": "Fixed by template (attribute codes cannot be changed)",
    "skillDice": 7,
    "templateNote": "Choose one of the 24 character templates. Every skill starts at the code of the attribute it is printed under. Allocate 7D among skills; no skill may be increased by more than 2D. Force skills printed on a template (1D) may also be raised with these dice. Fill in name, height, weight, sex, age and appearance; note starting equipment and credits. Work out a connection with at least one other character.",
    "forcePoints": 1,
    "skillPointsNote": "Skill points are awarded at the end of an adventure (usually 3 to 10 per character, at most about 15). Raising a skill one pip costs the number before the D (raising 5D+1 costs 5); 1D costs three times that number. Attributes can never be raised. Points can be saved."
  },
  "advancement": [
    {
      "name": "Skill point cost",
      "text": "To raise a skill by one pip, spend skill points equal to the number before the D: 2D to 2D+1 costs 2; 5D+1 to 5D+2 costs 5. +2 goes to the next full D. Raising a skill by a full D costs three times the number (4D to 5D = 12; 5D to 6D = 15)."
    },
    {
      "name": "Attributes",
      "text": "You can never increase your attribute codes."
    },
    {
      "name": "Saving points",
      "text": "Skill points may be saved and spent at the end of any session of play."
    },
    {
      "name": "Awards",
      "text": "Establish an average award of 3 to 10 points per character per adventure, plus bonuses for doing well, individual contribution, cooperation, entertaining the table, and playing in character — about 15 per adventure at the very most. Awards do not grow with skill level, so advancement slows as characters improve."
    },
    {
      "name": "Force points",
      "text": "A Force point spent heroically returns at the end of the adventure; spent heroically at the dramatically appropriate moment, the gamemaster may award another point as well. A character who starts with one point and loses it still gets one back."
    },
    {
      "name": "Force skills",
      "text": "Learned only from a master; each takes one week of intensive study and starts at 1D at no skill point cost. A pupil may raise a Force skill with skill points up to his master's level at normal cost; above it (or without a master) at double cost. Starting Force characters have learned all their masters can teach and pay double."
    },
    {
      "name": "New skills",
      "text": "Write a new specialized skill (an archaic weapon, a vehicle type, a field of knowledge) on the blank line under its attribute; it starts at the attribute code and may be raised with skill dice or skill points."
    },
    {
      "name": "Improving ships",
      "text": "A ship's owner may spend skill points to raise any ship code (speed, hull, maneuverability, shields, fire control, damage) at the same cost as a skill, plus either 100 credits per point at a spacedock (1 day per pip) or his own starship repair skill (1 week per pip, 10 credits per point, up to his repair code). Hyperdrive x2 to x1 costs 20 points; x1 to x1/2 costs 40. A new weapon at 1D/1D costs 6 points."
    }
  ],
  "force": [
    {
      "name": "Calling upon the Dark Side",
      "text": "Companion revision (replaces all core Dark Side rules). Any character may call on the Dark Side when angry, aggressive or desperate: make a Perception or Control roll at difficulty 6, +3 for each further call in the adventure (resets after the adventure); +10 if none of the intended actions would harm a living being. It is a free action resolved before other actions. Success grants one Force Point (which must be spent that round) and one Dark Side Point; failure grants nothing. Characters who refuse to believe in the Force cannot call on it."
    },
    {
      "name": "Dark Side Points",
      "text": "Whenever a character gains a Dark Side Point the gamemaster rolls one die; if the roll is less than or equal to the character's total Dark Side Points he is consumed by the Dark Side and becomes an NPC. Using the Force (powers or Force Points) immorally, or acting in an evil way even without the Force, earns a Dark Side Point. The gamemaster must warn the player before the action is resolved."
    },
    {
      "name": "Atonement",
      "text": "During a session in which a character genuinely atones (taking no tainted action) he may remove one Dark Side Point by spending a Force Point that was not gained from the Dark Side; the sacrifice is heroic, so the Force Point returns at the end of the adventure. No more than one Dark Side Point may be removed per adventure."
    },
    {
      "name": "Villains",
      "text": "An NPC who has turned to the Dark Side is a villain and may gain Force Points only by calling on the Dark Side. If a villain fails a Dark Side check he is briefly free of its thrall and may make a critical choice between good and evil."
    },
    {
      "name": "Training",
      "text": "Characters whose template has Force skills need a teacher (any Force user with higher Force skill codes) to improve or learn skills; characters without Force skills need a master (all three Force skills at 7D or better). The first skill learned is Control or Sense, the last is Alter. Learning a skill takes ten weeks of intensive training (each skill point spent shortens this by one week, minimum one week) and the new skill begins at 1D. Self-training in skills already acquired, or raising a skill above the teacher's, costs double skill points; a skill still at zero can never be raised without a teacher."
    },
    {
      "name": "Mastering powers",
      "text": "A character may master three powers per die of a Force skill plus one per pip (the power total). Each 1D learned with traditional training masters three powers: Control - control pain, remain conscious, force of will; Sense - life sense, magnify senses, receptive telepathy; Alter - control another's pain, shift senses, telekinesis. Learning a power from a teacher is free but takes a week; experimenting alone takes a week and one skill point per power. Multi-skill powers count against the power total of every skill used."
    },
    {
      "name": "Using powers not yet mastered",
      "text": "A power the character has not mastered may still be used, but all difficulty numbers are increased by five (added to the opponent's roll if the difficulty is opposed)."
    },
    {
      "name": "Powers as skills",
      "text": "Every power is composed of one or more of Control, Sense and Alter; all of a power's skills are rolled at once and this counts as multiple skill use (-1D per skill beyond the first). Some powers kept 'up' cannot be dropped voluntarily and need another roll to deactivate. Force power difficulties now use the new scale: 5 = Very Easy (3-5), 10 = Easy (6-10), 15 = Moderate (11-15), 20 = Difficult (16-20), 30 = Very Difficult (21-30)."
    },
    {
      "name": "Droids and the Force",
      "text": "Droids may never have Force skills. Droids that believe in the Force may use Force Points; all player character Droids begin with one Force Point."
    },
    {
      "name": "Force-using NPCs",
      "text": "Force users must be unknown to the Emperor and Vader; those serving the light are of modest power, and Force-using villains are either inconsequential or under the Emperor's control. Beings with any Force ability number perhaps in the hundreds galaxy-wide."
    }
  ],
  "starship": [
    {
      "name": "Astrogation correction",
      "text": "Companion revision: the Astrogation Gazetteer and Chart list times in hours, not days. Difficulty is +1 per hour saved and -1 per extra hour; every hyperspace journey takes at least one hour."
    },
    {
      "name": "Starship combat sequence",
      "text": "Four segments: 1. Declare actions and full reaction skills (lowest Dexterity first; NPC first on ties). 2. Declare combat reaction skills - combat evasion, shielding - highest Dexterity first; haste for reactions may be increased. 3. Roll actions and reactions in order of haste (non-movement actions, then movement, at each degree of haste). 4. Calculate damage as attacks hit. The same sequence is used for all vehicle combat."
    },
    {
      "name": "Full evasion",
      "text": "Pilot adds his evasion roll to the attacker's difficulty; may only add haste or movement actions. Requires a speed action which does not reduce the evasion roll (moving adds +1D, cancelled by the multiple action penalty); other movement actions are reduced 1D. Gunners aboard add the evasion roll to their difficulty; any other action aboard is +5 (or the evasion roll, whichever is less); shielding rolls are -5 (or the evasion roll)."
    },
    {
      "name": "Combat evasion",
      "text": "Works like a combat dodge: the pilot rolls skill plus maneuver and may substitute that roll for the attacker's difficulty number. It has no effect on gunners or other actions aboard."
    },
    {
      "name": "Shielding",
      "text": "Starship shields is a reaction skill declared in the reaction segment and rolled in order of haste. Shield roll + difficulty = the shield number. An attack roll above the difficulty but below the shield number hits, but shield dice are added to hull dice for damage; at or above the shield number only hull dice resist."
    },
    {
      "name": "Ionization",
      "text": "A ship without effective shields that is lightly damaged is ionized: all ship codes except hull are -1D for the rest of this round and the next; the ship may still act. Ion cannon hits cause ionization only, rolled against hull with no shield protection (see the Damage Summary)."
    },
    {
      "name": "Damage Summary (Starship Combat)",
      "text": "2xDR<SR: no effect. DR<SR: lightly damaged (lose shield generator or ionized -1D); ion cannons: lose generator. DR>SR: heavily damaged; ion: -1D ionization. DR>2xSR: severely damaged; ion: -2D ionization. DR>3xSR: destroyed; ion: dead controls (ship does nothing for one round, then is ionized -3D)."
    },
    {
      "name": "Missiles and torpedoes",
      "text": "The to-hit difficulty is increased by 1D for every speed action the target ship takes; this bonus costs the enemy pilot nothing."
    },
    {
      "name": "Tractor beams",
      "text": "Tractor beams have a Strength die code. Breaking free is an opposed roll: the trapped ship's sublight code against the beam's Strength, +1D per successful overspeed action. A much larger ship drags the smaller one with it."
    },
    {
      "name": "Scale die caps",
      "text": "Six scales: character, speeder, walker, starfighter, capital ship, Death Star. Cross-index the scale of the die code rolled with the target's scale on the To Hit, Damage or Maneuver scale chart to find the die cap; any die showing more than the cap is not counted. Damage caps apply to both the damage roll and the resisting Strength/hull roll. To Hit: character vs any 6; speeder vs character 5; walker vs character 4; starfighter vs char/spd/wlk 3/4/5; capital vs char/spd/wlk/star 1/3/4/5; Death Star only vs capital (5) or Death Star (6). Damage: character vs spd/wlk/star 3/2/2, cannot harm capital or Death Star; speeder vs wlk/star/cap 5/5/4; walker or starfighter vs capital 5; capital vs Death Star 1. Maneuver: character or speeder vs starfighter 4, vs capital 5; walker 5/5/6/3/4/6; capital vs starfighter 5; Death Star 3/3/4/1/2/6."
    },
    {
      "name": "Additional weapon ranges (meters)",
      "text": "Speeder-mounted: light (1-2D+) 50-300/301-500/501-1,000; medium (3D-4D+) 50-300/301-800/801-1,500; heavy (5D+) 50-400/401-900/901-2,000. Artillery: light 10-500/501-2,000/2,001-10,000; medium 20-600/601-3,000/3,001-16,000; heavy 50-600/601-5,000/5,001-25,000. Starfighter: blaster 200-10,000/10,001-20,000/20,001-35,000; missiles 250-4,000/4,001-17,000/17,001-30,000; laser cannon 200-5,000/5,001-25,000/25,001-50,000; ion cannon 5-5,000/5,001-15,000/15,001-75,000; proton torpedoes 500-15,000. Capital: missiles 3,000-25,000/25,001-60,500/60,001-125,000; turbolaser 5,000-30,000/30,001-70,000/70,001-150,000; ion cannon 2,000-20,000/20,001-50,000/50,001-100,000; tractor beam 1,000-10,000/10,001-30,000/30,001-60,000."
    },
    {
      "name": "Capital ship crews",
      "text": "Crew quality die codes (Imperial / Rebel): Recruit 3D / 2D-3D+2; Average 3D+1-4D / 4D-5D; Veteran 4D+1-5D+2 / 5D+1-6D; Elite 6D-6D+2 / 6D+1-7D; Hand-picked Elite 7D-8D / 7D+1 to PCs. Assume average crews in published adventures."
    },
    {
      "name": "Capital ship combat sequence",
      "text": "As starship combat with declaration order by command skill (lowest declares actions first, highest declares reactions first) and a fifth segment: hit results recorded on the ship template. Anticipate enemy (Moderate starship tactics) gives a free haste action; deceive enemy (Difficult) lets a commander redeclare after hearing the opponent. Shutting down shields must be declared in segment 1."
    },
    {
      "name": "Guns Modifier Chart",
      "text": "Instead of rolling each gun, add the to-hit/damage modifier for the number of guns fired to the weapon's fire control, plus the crew die code, to hit; add the same modifier to the weapon damage code (no crew dice). Guns: 1 +0; 2 +2; 3 +1D; 4 +1D+1; 6 +1D+2; 8 +2D; 12 +2D+1; 16 +2D+2; 24 +3D; 32 +3D+1; 48 +3D+2; 60 +4D; 90 +4D+1; 120 +4D+2; 180 +5D; 250 +5D+1. Attacks are grouped by weapon type."
    },
    {
      "name": "Capital ship damage",
      "text": "Damage is recorded in pips (ionization in whole dice). Each pip on the Ship Damage row reduces all ship operations by one pip; 3 pips = heavily damaged (-1D), 6 pips = severely damaged (-2D), 9 pips = destroyed. Hull rolls are never reduced by damage. Capital Ship Damage Summary (beam and missile / ion): 2xDR<HR no effect; DR<HR 1 shield pip / no effect; DR>=HR 1 pip / 1D; DR>=2xHR 2 pips / 2D, and so on up to DR>=9xHR 9 pips / 9D."
    },
    {
      "name": "Command and coordination",
      "text": "The commander must always allocate 1D of command to each of the pilot, chief gunnery officer and chief shields officer or that officer is -1D. Remaining command actions may: give a subordinate +1 pip per bonus action; add one more ship's guns to a single attack per coordination action (larger to-hit modifier only, ion and non-ion never combined); or order differing levels of haste to different batteries (-1D per haste order). Command may never be reduced below zero."
    },
    {
      "name": "Advanced shielding",
      "text": "On a Moderate starship shields roll (declared in segment 1, -1D to the operator) a damaged shield facing may be shut down instead of losing a pip of shield code. A Difficult shields roll doubles one facing's shield code for a round by burning out another facing (-1D to other shielding rolls); not possible with one facing left. Against starfighters the shield operator's roll is die-capped at 5."
    },
    {
      "name": "Advanced targeting",
      "text": "Hit / damage modifiers: hull 0/0; sublight engines -2D/0; maneuver -3D/+1D*; fire control -4D/+2D*; beam weapons -3D/0; missile tubes -2D/-1D; command -4D/0; vital location -2D/-1D (reduces target hull roll by 1D, cumulative and combinable). *Only if the attack penetrated the shields. Weapon damage pips x guns firing are spread over the targeted weapons: 1 point wounds (-1D fire control), 2 incapacitates, 3 destroys. Each pip of command damage gives opponents a free haste action."
    },
    {
      "name": "Ramming and starfighters vs capital ships",
      "text": "Ramming: the rammer's piloting roll must beat the defender's evasion; each ship rolls hull +1D per speed action taken that round against the other's hull plus shielding. A swarm of starfighters attacking a capital ship counts as guns on the Guns Modifier Chart; return fire is resolved as counter battery fire with damage points divided among the swarm (1 heavily damaged, 2 severely, 3 destroyed). Remember the scale die caps."
    },
    {
      "name": "Improving ships and equipment",
      "text": "Equipment die codes are raised with skill points as for skills (a 0D code costs one point per pip); codes that add to a character's own skill or attribute (speed, fire control, maneuver, shielding, armor) cost three more points per pip. Time per pip / credits per skill point by scale: character 1 day/10; speeder 3 days/100; walker 3 days/500; starfighter 1 week/500; capital ship 1 month/1,000,000; Death Star 2 months/1,000,000,000. A technology roll is needed after spending the points: pip 1 Very Easy, 2 Easy, 3 Moderate, 4 Difficult, 5+ Very Difficult. Hyperdrive x4 to x3 costs 5 points, x3 to x2 10, x2 to x1 20, x1 to x1/2 40. A new 1D/1D weapon costs 9 skill points, or buy it and pay installation (150 credits character scale, 1,500 speeder, 6,000 starfighter, 10,000,000 capital). NPC labor doubles credit costs."
    }
  ]
};
