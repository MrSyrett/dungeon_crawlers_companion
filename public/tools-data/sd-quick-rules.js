// Shadowdark quick rules for the character sheet's "? Rules" panel.
// Hand-curated from the core rulebook (page = printed page). Edit here.
const SD_QUICK_RULES = [
  {
    title: "Checks & difficulty class",
    text: "Roll a d20 + the stat modifier the GM names; equal or beat the DC to succeed. Easy DC 9, Normal DC 12, Hard DC 15, Extreme DC 18. You usually succeed without rolling at things you're trained in or have time to do carefully; the GM asks for a check when failure has a consequence, the action requires skill, or there's time pressure.",
    page: 81
  },
  {
    title: "Contested checks",
    text: "When creatures work against each other, each rolls a relevant stat check at the same time (even off-turn). Highest result wins; reroll ties.",
    page: 81
  },
  {
    title: "Advantage & disadvantage",
    text: "Advantage: roll the same die twice and use the better result. Disadvantage: roll twice and use the worse. If you have both on one roll, they cancel out.",
    page: 78
  },
  {
    title: "Natural 20 & natural 1",
    text: "A natural 20 succeeds to your maximum capacity: an attack automatically hits and is a critical hit. A natural 1 fails to your maximum capacity: an attack automatically misses and might even strike an ally.",
    page: 78
  },
  {
    title: "Initiative & turn order",
    text: "Everyone rolls a d20 + DEX modifier (the GM uses the highest DEX modifier of the monsters). Highest goes first and turns move clockwise from that person. The game runs in initiative order from the very start, not just in combat; a new initiative is rolled when combat breaks out, after any surprise turns.",
    page: 83
  },
  {
    title: "Your turn",
    text: "Count down your personal timers, then take one action and move up to near, splitting the movement however you like. If you skip your action you can move near again. Small parallel tasks (standing up, speaking, activating a magic item, quaffing a potion) don't typically use your action.",
    page: 88
  },
  {
    title: "Distances",
    text: "Close = 5 feet. Near = up to 30 feet. Far = within sight during the encounter or scene. Weapon and spell ranges use these same three bands.",
    page: 85
  },
  {
    title: "Attack rolls",
    text: "Melee: 1d20 + STR modifier + talent bonuses. Ranged: 1d20 + DEX modifier + talent bonuses. You hit if the total equals or beats the target's AC. Thrown weapons make ranged attacks using Strength; finesse weapons let you use STR or DEX.",
    page: 88
  },
  {
    title: "Damage & knockout",
    text: "On a hit, roll the weapon or spell's damage dice + relevant bonuses and subtract it from the target's HP. If you reduce a creature to 0 HP you may choose to knock it unconscious instead of killing it.",
    page: 89
  },
  {
    title: "Critical hits",
    text: "A natural 20 on an attack roll or spellcasting check is a critical hit. For a weapon, double its damage dice. For a spell, you may double one of its numerical effects.",
    page: 89
  },
  {
    title: "Terrain & cover",
    text: "Attacking or casting at a creature with at least half its body behind interposing terrain has disadvantage. If you can't see a creature at all, you can't target it. Hampering terrain such as ice or deep mud halves movement.",
    page: 89
  },
  {
    title: "Moving through creatures",
    text: "You move freely through allies. To move through an enemy's space you must pass a Strength or Dexterity check.",
    page: 85
  },
  {
    title: "Armor class",
    text: "Base AC is 10 + DEX modifier. Leather armor: 11 + DEX (1 slot). Chainmail: 13 + DEX (2 slots; disadvantage on stealth and swim). Plate mail: 15 (3 slots; disadvantage on stealth, can't swim). A shield adds +2 AC, takes 1 slot, and occupies one hand. Mithral costs x4, weighs 1 slot less, and removes the stealth/swim penalty.",
    page: 36
  },
  {
    title: "Weapon properties",
    text: "Two-handed (2H): must be wielded in both hands. Versatile (V): one or two hands; use the higher damage die with two. Finesse (F): attack with STR or DEX. Thrown (Th): can be thrown as a ranged attack using STR. Loading (L): you must forgo moving to reload.",
    page: 37
  },
  {
    title: "Dying & the death timer",
    text: "At 0 HP you fall unconscious and are dying. On your turn roll 1d4 + CON modifier (minimum 1): you die in that many rounds unless healed or stabilized. On each later turn roll a d20; a natural 20 means you rise with 1 HP. Going above 0 HP wakes you. A dead character is retired from play.",
    page: 89
  },
  {
    title: "Stabilizing",
    text: "An intelligent being can give first aid to a dying creature at close range. On a successful DC 15 Intelligence check the target stops dying but stays unconscious.",
    page: 89
  },
  {
    title: "Resting & healing",
    text: "To rest, consume a ration and sleep for 8 hours (light tasks like a turn on watch are fine). A successful rest restores all lost HP and recovers all stat damage, and refreshes talents, spells, and items that recharge on a rest. Each stressful interruption (including combat) forces a DC 12 CON check; on a failure the ration is spent but you gain no benefit.",
    page: 86
  },
  {
    title: "Light sources & real time",
    text: "A torch or a flask of lantern oil burns for one hour of real time (if you can't track real time, one hour = 10 rounds). A torch lights out to near; a lantern lights double near and has a shutter. Lighting a new source either rides along on the current timer or you extinguish the old ones and start a fresh timer. Three torches can be combined into an immovable campfire lasting up to 8 hours.",
    page: 84
  },
  {
    title: "Total darkness",
    text: "Anything outside a light source's illumination is in total darkness. A creature that is not darkness-adapted has disadvantage on tasks requiring sight, and the GM checks for a random encounter every crawling round.",
    page: 84
  },
  {
    title: "Luck tokens",
    text: "The GM awards a luck token for exceptional roleplaying, heroism, or plain coolness, whether or not the action succeeded. You can hold only one at a time. Spend it to reroll any roll you just made (you must use the new result), or give it to a companion.",
    page: 79
  },
  {
    title: "Gear slots",
    text: "You can carry a number of items equal to your Strength stat or 10, whichever is higher. Unless noted, every item besides ordinary clothing fills one slot; bulky gear may fill more. Fighters add their CON modifier (if positive) to their slots.",
    page: 35
  },
  {
    title: "Coins & free slots",
    text: "1 gold piece (gp) = 10 silver pieces (sp) = 100 copper pieces (cp). The first 100 coins are free to carry; each further 100 coins fills one gear slot. Your first backpack is also free to carry. Arrows and bolts stack 20 per slot, gems 10, rations 3, iron spikes 10.",
    page: 35
  },
  {
    title: "Spellcasting checks",
    text: "Casting a spell takes your action. Wizards roll 1d20 + INT modifier; priests roll 1d20 + WIS modifier. The DC is 10 + the spell's tier. On a success the spell takes effect; on a failure it does not, and you can't cast that spell again until you complete a rest.",
    page: 44
  },
  {
    title: "Spell criticals",
    text: "Natural 20: you may double one of the spell's numerical effects (on a focus spell this lasts until your next focus check). Natural 1: the spell fails and a focus spell ends immediately. A wizard also loses the spell until after a rest and rolls on the Wizard Mishap table for that tier. A priest's deity revokes the spell until the priest completes penance and a rest.",
    page: 45
  },
  {
    title: "Focus spells",
    text: "You can't cast another focus spell while focusing, and you can end focus at any time. At the start of each turn make a spellcasting check as if casting the spell: success keeps it going until your next turn, failure ends it (without losing the spell). Taking damage or being distracted forces an immediate check to maintain focus.",
    page: 50
  },
  {
    title: "Scrolls & wands",
    text: "A spellcaster can cast a scroll or wand's spell if it's on their class list, even if they don't know it, with a spellcasting check at DC 10 + the spell's tier. Failing doesn't affect your known spells. A scroll is consumed after any attempt. A wand stops working until you rest on a failure, and breaks permanently on a natural 1; casters with mishap tables roll a mishap on a critical failure either way.",
    page: 49
  },
  {
    title: "XP & leveling up",
    text: "XP comes from treasure and boons: poor 0, normal 1, fabulous 3, legendary 10, and every PC gets the full value of each find. You need your current level x 10 XP to gain a level (10 at level 1, 20 at level 2, ...). On leveling, XP resets to zero, roll your class hit die and add it to max HP, and gain any new title, spells, and talent roll.",
    page: 39
  },
  {
    title: "Talents",
    text: "You get a roll on your class's talent table at 1st level and at every odd level (3, 5, 7, 9). Duplicate talents stack unless noted; the benefits of class, ancestry, and rolled talents combine.",
    page: 39
  },
  {
    title: "Morale",
    text: "Enemies reduced to half their number (or half HP for a solo enemy) flee if they fail a DC 15 Wisdom check. For large groups the GM makes one check using the leader's modifier.",
    page: 89
  },
  {
    title: "Conditions",
    text: "Effects like blindness or being tangled in a web impose conditions. Apply advantage, disadvantage, and common sense: a blinded character has disadvantage on tasks requiring sight, and a character stuck in a giant web can't move until freed. Stat damage is temporary unless stated otherwise and recovers on a rest.",
    page: 85
  },
  {
    title: "Climbing, falling & swimming",
    text: "Climbing: STR or DEX check to climb at half speed; fall if you fail by 5 or more. Falling: 1d6 damage per 10 feet. Swimming: half speed (STR check in rough water). Make a CON check each round you hold your breath; on a failure take 1d6 damage a round until you leave the hazard.",
    page: 85
  },
  {
    title: "Traps & hazards",
    text: "Searching a specific area or object for a trap finds it automatically; otherwise you typically get a relevant stat check to avoid a trap's effects. Thieves and trained characters can describe how they disable a trap and succeed given time and a sensible method. Hazards are usually obvious and can restrict movement, deal ongoing damage, or weaken you; caltrops deal 1 damage and halve speed for 10 rounds.",
    page: 114
  },
  {
    title: "Hiding, sneaking & surprise",
    text: "Hiding or sneaking creatures must succeed on DEX checks to stay undetected; you can't hide while others can see you. A searcher who looks in the right place finds you automatically, otherwise needs a WIS check. A creature that starts its turn undetected has surprise: it takes one turn before combat initiative is rolled and has advantage on attacks against surprised targets. Attacking from hiding gives away your position.",
    page: 87
  },
  {
    title: "Time & random encounters",
    text: "Game time passes at the same pace as real time. When minutes pass, round-based effects expire and the GM rolls one encounter check (1-3 on a d6). When hours or days pass, the GM uses the overland cadence: Unsafe every 3 hours, Risky every 2, Deadly every hour. You can go three days without a ration, then take 1 CON damage per day.",
    page: 82
  },
  {
    title: "Carousing",
    text: "Between adventures you may spend one downtime activity carousing to turn coin into XP. Each participant pays the event cost (30 gp at +0 up to 1,800 gp at +6) and rolls 1d8 + the event bonus on the outcome table, gaining 2-6 XP plus allies, enemies, fines, luck tokens, or loot.",
    page: 92
  }
];
