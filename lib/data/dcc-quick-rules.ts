// Quick-rules digest for the DCC reference page.
// TWIN of public/tools-data/dcc-quick-rules.js (the sheet loads that JS global);
// keep the two in sync. Hand-curated from Rules for Survival (page = printed page).

export type DccQuickRule = { title: string; text: string; page: number };

export const DCC_QUICK_RULES: DccQuickRule[] = [
  {
    "title": "Dice & rounding",
    "text": "The d20 resolves Success or Failure; roll high. Other dice (d2 through d12) are mostly for damage and effects, and a d2 is often used when helping. The GM never rolls a d20 for Mobs or effects. Whenever rounding is called for, round down.",
    "page": 9
  },
  {
    "title": "Stat Mods & Enhanced Stats",
    "text": "Stat Mod by score: 1–2 +1, 3–5 +2, 6–9 +3, 10–19 +4, 20–49 +5, 50–99 +6, 100+ +7 and up. The full Stat name (Intelligence) means the score; the abbreviation (Int) means the Mod. Unenhanced Stats are your base plus potions and level-ups; Enhanced adds gear, Spells, and Buffs.",
    "page": 10
  },
  {
    "title": "The core mechanic",
    "text": "Roll d20 + Stat Mod + Skill Rank, apply Buffs and Debuffs, and meet or beat the Difficulty to succeed. Untrained Attack or Utility Skill Checks are made with Disadvantage and no Ranks; on the Tutorial Floors, note untrained Skills and gain 1 Rank in one of them at the end of a 2-hour session. Spell Skills can't be used untrained (except via scroll), and Passive Skills never require a Check.",
    "page": 12
  },
  {
    "title": "Stat Checks",
    "text": "A Stat Check uses only the d20 + Stat Mod with no Skill Ranks, usually to resist an effect from the environment or a Mob. The Difficulty is 10 + Floor. Other crawlers cannot aid you on a Stat Check.",
    "page": 12
  },
  {
    "title": "Determining the Difficulty",
    "text": "Opposed (something is in your way, including all attacks and social Checks): 10 + antagonist's relevant Stat Mod + Floor. Unopposed (Climbing, Endurance, most survival Skills): 10 + (Floor × 2). Stat Check: 10 + Floor. Decide Opposed vs. Unopposed before the roll; the GM may simply assign a Difficulty instead.",
    "page": 13
  },
  {
    "title": "Party Skill Checks",
    "text": "When the whole party attempts one Action together, everyone rolls against the Difficulty; if half or more succeed, the party succeeds. No aiding each other. An Amazing Success or better flips one ally's Failure to Success; a Major Fail or worse flips one ally's Success to Failure.",
    "page": 14
  },
  {
    "title": "Advantage & Disadvantage",
    "text": "Advantage: roll an extra d20 and keep the higher; Disadvantage: keep the lower. Multiple instances don't stack, and one Advantage cancels one Disadvantage. Mobs don't roll, so Mob Advantage adds +5 to the Difficulty of its Action or Evade, and Mob Disadvantage subtracts 5 and grants targeted crawlers a free Evade Check (they may still spend an Action to Evade again if it fails).",
    "page": 14
  },
  {
    "title": "Degrees of Success",
    "text": "Natural 20 (Critical Hit): the best possible result. Success by 10+ (Amazing): extra impact, such as finishing quickly, quietly, or with less material. Success by 0–9 (Standard): it just works; a tie goes to the crawler. A Crit doesn't also trigger the by-10 effect; you get only the single highest degree.",
    "page": 15
  },
  {
    "title": "Degrees of Failure",
    "text": "Fail by 1–2 (Near Miss): the GM announces it so allies may Intervene; otherwise fail or succeed with complications. Fail by 3–9 (Standard Fail): a normal miss, or the GM may let you fail forward. Fail by 10+ (Major Fail): a consequence such as broken tools, embarrassment, or lost time. Natural 1 (Critical Fail): the worst outcome. After a Major or Critical Fail you can't retry that Skill in the scene.",
    "page": 15
  },
  {
    "title": "AI Favor",
    "text": "Earned by heroic, foolish, or showrunner-defying acts. Spend one to reroll a d20 once per Check before the GM announces the result (never on a Natural 1), or once per round to gain an extra non-Attack Action in combat.",
    "page": 16
  },
  {
    "title": "Time & cooldowns",
    "text": "In structured scenes each crawler gets two Actions per round, and a round lasts 10 seconds. A dungeon day is 30 hours; the First Floor lasts about five days and the Second about six. Cooldowns: once per round (not both Actions), once per scene, once per X hours, once per day (30 hours), once per X days (resets on a new floor), or once per floor.",
    "page": 17
  },
  {
    "title": "Actions & the Step",
    "text": "Every Action also lets you take a Step of up to 10 feet. Basic Actions: Make a Check, Cast a Spell, Move (default 20 ft), Help (add 1d2 untrained or 1d6 trained before an ally's non-combat roll), Use a Hotlist Item, and Retrieve. You can wait to act until after another crawler, but you can't hold an Action for a later round.",
    "page": 18
  },
  {
    "title": "Combat-specific Actions",
    "text": "Attack (drawing or swapping a Hotlist weapon is free), Call a Play (roll 2d6, keep the higher; add it to an ally's Check when they do the proposed Action, or to their damage if they already hit), Look for Clues (Boss fights only), and the Interrupts: Evade, Intervene (roll 1d6 and add it to an ally's d20 Check after the result is announced, not Stat Checks; great for Near Misses), Catcher (take a hit for an adjacent ally, no Evade), Heal, and Taunt (Int-Opposed Taunt Check redirects a Mob's attacks to you).",
    "page": 19
  },
  {
    "title": "Combat sequence",
    "text": "Mobs go first unless surprised: with Skills like Stealth or Ambush, a surprising party acts first with one free Action, once. Each round: 1) Mob Action Declaration, 2) Crawler Reaction Phase (Interrupts), 3) Mob Attack Resolution, 4) Crawler Action Phase (spend remaining Actions in any order, no initiative), 5) Clean Up (end-of-round effects, reset Actions).",
    "page": 32
  },
  {
    "title": "Evade",
    "text": "Spend an Action in the Reaction Phase to roll a separate Evade Check against each attack aimed at you; the Difficulty comes from the Mob's attack value. Evading an Area of Effect halves its damage (a quarter in the splash zone). Natural 20 or Amazing Success on an Evade grants Advantage on your next Attack against that Mob; a Major Fail adds bonus damage equal to Floor plus a Minor Injury after combat; a Natural 1 doubles the damage and adds a Major Injury.",
    "page": 33
  },
  {
    "title": "Attacks",
    "text": "Roll d20 + Skill Rank + Stat Mod against the Mob's Evade score of 10 + Dex Mod + Floor. Melee uses Str to hit and damage; physical ranged uses Dex to hit (some add Str to damage); Spells use Int for both. Ranged and Spell attacks within an enemy's melee reach suffer Disadvantage, and targets beyond a listed range automatically fail.",
    "page": 34
  },
  {
    "title": "Damage & criticals",
    "text": "On a hit, roll the Skill's base damage dice (higher Ranks add dice) plus the Stat Mod; unarmed attacks add one Damage Effect such as Iron Punch. A Natural 20 always hits and rolls twice as many base damage dice before adding the Mod. An Amazing Success adds bonus damage equal to the Floor Number. A Natural 1 always misses.",
    "page": 36
  },
  {
    "title": "Attack modifiers",
    "text": "Cover, darkness, severe weather, shifting ground, or attacking what you can't see: Disadvantage (melee ignores cover). High ground or attacking a target that can't see you: Advantage. Targets 4+ size classes smaller give Disadvantage (bigger melee attackers add their size to damage); 4+ larger give Advantage.",
    "page": 36
  },
  {
    "title": "Area of Effect",
    "text": "Make one attack roll against a chosen target in range; on a hit, roll damage once and apply it to everyone in the area, friend or foe. Types: Blast (from the target), Burst (from the caster), Line (5 ft wide), Cone (60°), plus optional Splash for half damage beyond the main area. Victims may spend an Action to Evade for half damage; a Step can't outrun an explosion.",
    "page": 34
  },
  {
    "title": "Movement & forced movement",
    "text": "Move is 20 ft per Move Action plus a 10-ft Step per Action, so two Move Actions cover 60 ft; the move can be split around other Actions. You can pass through allies but not enemies. Difficult terrain, climbing, crawling, and swimming cost 1 extra foot per foot. Dropping prone is free (Take Down Debuff); standing or picking something up costs 10 ft of Move, which your Step covers. Forced movement: Pull (toward the source), Push (away), Slide (any direction).",
    "page": 23
  },
  {
    "title": "Vision & light",
    "text": "Bright light (near a torch, lantern, or Torch Spell): no penalty. Dim light (lichen-lit Tutorial Floors, edge of a torch): Disadvantage on Investigation, Perception, and other vision-based Checks. Darkness: Disadvantage when the lack of light matters, and the ground counts as difficult terrain. A torch gives 20 ft of bright light and 20 ft of dim beyond that.",
    "page": 23
  },
  {
    "title": "Hiding & sneaking",
    "text": "Behind cover or in dim light or darkness, make an Opposed Hide in Shadows Check against nearby foes' Intelligence. On Success you gain the Invisible Buff until you come into view, fail a Hide in Shadows Check, or take an Attack Action. Invisible creatures can't be targeted by anything needing sight and attack as unseen attackers.",
    "page": 28
  },
  {
    "title": "Harsh conditions",
    "text": "Drowning: hold your breath for Con Mod rounds, then 1d6+F per round while submerged. Falling: 1d6 Bludgeoning per 10 ft (max 20d6) and you land prone. Thirst: each 30-hour day without water costs 3 HB slots and a stackable Fatigued. Hunger: at the end of each day without food, make a Survival Check or lose 3 HB slots and gain a stackable Fatigued.",
    "page": 28
  },
  {
    "title": "Health Bar",
    "text": "Your Health Bar has 10 slots, each worth your Con Mod. Damage is reduced by DR first, then halved by Elemental Resistance, then doubled by Vulnerability, then zeroed by Immunity. Apply what's left slot by slot: if it's less than one slot's value it does nothing, and any leftover that doesn't fill a slot is lost. Mark slots right to left.",
    "page": 41
  },
  {
    "title": "0% Health Bar & Dying",
    "text": "Losing your last slot gives the Dying Debuff: no Actions, Move, speech, or HUD. You have Con Mod rounds before death; subtract 1 at each Clean Up and each time you would take damage. Any healing of at least 1 slot ends Dying, and if healed in Step 4 of the same round you may use your remaining Actions. Mobs die instantly at 0%.",
    "page": 42
  },
  {
    "title": "Healing & rests",
    "text": "Healing is always by slots (the Heal Spell restores 20% HB, i.e. 2 slots) and can't exceed your bar. Short rest (2 hours): 5 HB slots and half your Mana. Long rest (8 hours): full HB and Mana, clears Fatigued. Full day's rest (30 hours): also clears long-term injuries. Mending: every calm hour outside combat restores 1 HB slot and 5 Mana.",
    "page": 43
  },
  {
    "title": "Mana & Spells",
    "text": "Mana Points equal your Intelligence score, and every crawler starts with the Heal Spell. Regain Mana by resting, mending, Mana Toast, or Mana Potions. Casting a non-scroll Spell spends its Mana cost; there's no limit on Spells per combat beyond Actions and Mana. Scrolls cast at a fixed Rank for no Mana and turn to dust.",
    "page": 46
  },
  {
    "title": "Buffs",
    "text": "Internal Buffs (Stat or Skill boosts, Invisible, Iron Skin) apply constantly or when activated. External Buffs trigger on a condition (Resistances, Damage Reflection, Safe Fall), you choose whether they fire, and they rarely cost an Action. Rule of Three: at most three External Buffs active at once, chosen at the start of the day or swapped on a short rest.",
    "page": 43
  },
  {
    "title": "Debuffs",
    "text": "Debuffs don't stack unless marked Stackable, and there's no cap on how many you can suffer. Debuff damage is dealt during Clean Up and bypasses DR (resistances and immunities still apply). If Debuff damage would drop you to 0%, make an automatic Con Stat Check vs. 10 + Floor at Clean Up; on Success the Debuff ends and the damage is avoided. On Mobs, Disadvantage or a Skill penalty lowers their Difficulty instead.",
    "page": 44
  },
  {
    "title": "Key Debuffs",
    "text": "Burned: 1d10+F Fire per round, 5 minutes; Dex Check vs. 10 + Floor as an Action to extinguish. Poisoned: 1d8+F per round, stackable, until an antidote. Blood Trail: 1d6+F per round until bandaged or First Aid. Held: no Move or Step, attacks on you have Advantage; escape with a Str-Opposed Dex Check or Escape Artist. Stunned: Disadvantage on your next Check. Fatigued: -1 to all Checks and half Move, stackable, until a long rest. Take Down: prone, attacks on you have Advantage.",
    "page": 45
  },
  {
    "title": "Injuries",
    "text": "Minor Injury: -2 to all Checks until a short rest; a second one becomes Long-Term Minor (-2 until a long rest). Major Injury: -5 until a long rest; a second becomes Long-Term Major (-5 until a full 30-hour day of rest). Injuries usually come from badly failed Evades and vicious Mob attacks, and land after combat ends.",
    "page": 46
  },
  {
    "title": "Inventory & Hotlist",
    "text": "Inventory items are weightless; outside combat you retrieve them at the speed of thought. You can't store living creatures (except in pet carriers), loose liquids, explosives within 3 seconds of detonating, or anything you can't lift (Strength × 15 lbs, held unaided for 4 seconds). The Hotlist holds 10 quick-access items and Spells; only gear in Gear Slots grants bonuses (Accessories slot holds up to 10).",
    "page": 47
  },
  {
    "title": "Potions",
    "text": "A potion in your Hotlist can be used without physically drinking it, as long as you're conscious and not Dying. In combat, drinking costs an Action (healing potions can be an Interrupt). Only one potion every other round; more causes Potion Sickness (Poisoned for 15 seconds).",
    "page": 48
  },
  {
    "title": "Crafting & salvage",
    "text": "Spend 1 Misc. Junk to produce any small household item on the spot. Uncommon items need Misc. Junk by size (Tiny 1, Small 4, Petite 16, Medium 32, Large 64, and doubling upward) and an Unopposed Fabricate Check (Engineering if it has moving parts), taking size × size hours. On a fail, salvage all Junk if missed by 1–2, half if by 3–9, nothing if by 10+.",
    "page": 50
  },
  {
    "title": "Social checks & fans",
    "text": "Deception, Detect Lies, Intimidate, Negotiation, and Persuasion back up roleplay as Opposed Checks against the NPC's relevant Stat; a Success can turn a suspicious NPC friendly. Viewers can watch live feeds after the First Floor, so standing out earns fans, and fans lead to show invitations and sponsorships on lower floors. On shows you lose your HUD, gear, and Spells and may be limited to Unenhanced Stats.",
    "page": 20
  }
];
