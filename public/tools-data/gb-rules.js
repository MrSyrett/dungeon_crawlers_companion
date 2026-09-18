// GENERATED FILE - do not edit by hand.
// Source: data/gb/parts/*.json - regenerate with: node scripts/build-gb-data.mjs

const GB_RULES = [
  {
    "key": "task",
    "title": "Doing Things (the Task Roll)",
    "order": 1,
    "body": "When your Ghostbuster wants to do something that could fail, the Ghostmaster assigns a Difficulty number and names the Trait or talent that applies. Roll a number of six-sided dice equal to your points in that Trait (or the talent). Add the dice up; if the total equals or beats the Difficulty, you succeed. Things you can't fail (opening beer cans, watching TV, sending out for pizza) need no roll. One of the dice you roll must always be the Ghost Die."
  },
  {
    "key": "traits",
    "title": "Traits",
    "order": 2,
    "body": "Every Ghostbuster has four Traits: Brains, Muscles, Moves and Cool. The Traits number is how many dice you roll for a related task — more dice, better odds. At creation, assign at least 1 point to each Trait and no more than 5 to any one, for 12 points total (famous Ghostbusters sometimes break these limits). Traits can be temporarily reduced (the 'Current' value) by getting slimed, getting hurt, or carrying too much gear."
  },
  {
    "key": "talents",
    "title": "Talents",
    "order": 3,
    "body": "A Talent is an area of special ability within a Trait. Each Ghostbuster has one talent per Trait. When a task falls under one of your talents, you roll 3 extra dice. (Egon's Brains talent is Physics, so designing a solar-powered flashlight lets him roll 10 dice instead of 7.) When a Trait is reduced, its talent drops by the same amount."
  },
  {
    "key": "ghost-die",
    "title": "The Ghost Die",
    "order": 4,
    "body": "One of the dice you roll is always the Ghost Die. If it shows a number, add it in as normal. If it shows the Ghost, Something Bad Has Happened: the Ghost counts as a zero, and the Ghostmaster introduces a complication. You can still succeed (if the other dice meet the Difficulty) — you'll just also suffer some niggling annoyance; if you also fell short, you fail AND something bad happens. For ghosts (extras), the Ghost Die works in their favor: mishaps rebound to the spook's benefit."
  },
  {
    "key": "brownie-points",
    "title": "Brownie Points",
    "order": 5,
    "body": "New Ghostbusters start with 20 Brownie Points. Before you roll, spend Brownie Points to roll one extra die each (you can't spend them to re-roll). You lose them when you're injured or fined. Best of all, spend them to rewrite the script — describe (colorfully!) how your star pulls off an incredible feat or escapes certain doom, and the Ghostmaster sets the cost. You earn them back for completing jobs, acting in character and fulfilling your Goal. With 30 to spare you can buy +1 to a Trait; in a pinch you can trade a Trait point for 20 Brownie Points."
  },
  {
    "key": "opposed",
    "title": "Opposed Rolls",
    "order": 6,
    "body": "When someone is actively trying to stop you, it's an Opposed Roll: each side rolls its relevant Trait or talent dice and the higher total wins. Ties can stand or be re-rolled at the Ghostmaster's call."
  },
  {
    "key": "sequence",
    "title": "Play Sequence",
    "order": 7,
    "body": "In hectic scenes, players announce actions in order of lowest Moves first (ties broken by lower Cool). Actions then resolve in reverse — highest Moves goes first — so the quick get to react to everyone else's plan. On your turn you may move and take one other action (fire a proton pack, read a PKE meter, and so on)."
  },
  {
    "key": "combat",
    "title": "Combat",
    "order": 8,
    "body": "Combat is just a task. Hand-to-hand uses Muscles (brawl, grapple); a weapon like a club adds a few dice. Ranged combat uses Moves (fire weapon). Range sets the Difficulty: Point-Blank (10 m or less) is 1–3 and the defender may grapple or fire back; Normal (~30 m pistols/proton packs, ~90 m bazookas) is 9–13 and the defender must fire back or take cover; Long (beyond normal) is 14+, up to 30 at extreme range. Knives and pistols generally don't work on ghosts — that's what the proton pack is for."
  },
  {
    "key": "hurt",
    "title": "Getting Hurt (UHM)",
    "order": 9,
    "body": "Ghostbusters don't ordinarily die — they get hurt, slimed, and banged up, and their equipment gets toasted. The Ghostmaster resolves harm with the UHM (Universal How-Much) system: the more a roll beats the Difficulty, the greater the effect. Injury temporarily lowers Traits/talents (track the 'Current' values), costs hospital time, and docks Brownie Points. Only reckless, repeatedly-warned stars ever actually die — and then they come back as a ghost the Ghostmaster runs."
  },
  {
    "key": "equipment",
    "title": "Carrying Equipment",
    "order": 10,
    "body": "Each item has a Hands rating (how bulky — a '1½ hands' item is carried in one hand but used with two) and a Muscles rating (how heavy). You have two hands, two 'hands' worth on your belt, two on your back, and one on your head. Try not to carry more Muscles points of gear than your Muscles Trait, or you'll start to slow down — set up an equipment dump (usually ECTO-1) near the action."
  },
  {
    "key": "ectopresence",
    "title": "Busting Ghosts",
    "order": 11,
    "body": "Ghosts and monsters (all 'extras') use the same four Traits plus a Power rating with supernatural abilities. A ghost's Ectopresence is what you whittle down: a proton pack on ATTACK reduces it by 1 per hit. Once Ectopresence hits 0, two Ghostbusters use the CONTAINMENT stream to cage it and pop a Ghost Trap. Beware Proton Immunity — some beings shrug off the stream and must be beaten with weird science or their specific weakness."
  },
  {
    "key": "creation",
    "title": "Creating a Ghostbuster",
    "order": 12,
    "body": "Fill out a Personnel File: Name & Alias, description and Tags (a physical tag and a personality tag), a Goal (Sex, Wealth, Fame, Soulless Science, Serving Humanity…), your four Traits (12 points, 1–5 each), one Talent per Trait, gear, and 20 Brownie Points. Then give some thought to who your star actually is — the point of the game is to tell a funny, satisfying story, so a distinctive voice and manner matter as much as the numbers."
  }
];
if (typeof window !== 'undefined') { window.GB_RULES = GB_RULES; }
