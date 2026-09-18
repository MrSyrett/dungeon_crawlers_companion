// GENERATED FILE - do not edit by hand.
// Source: data/jlu/parts/*.json - regenerate with: node scripts/build-jlu-data.mjs

const JLU_TIERS = [
  {
    "key": "E",
    "name": "Ordinary",
    "label": "Ordinary Human",
    "value": 0,
    "playable": false,
    "description": "Ordinary human. A basic threat or danger, such as theft or assault with a bladed weapon."
  },
  {
    "key": "D",
    "name": "Year One",
    "label": "Beginning of Meta-Activity",
    "value": 1,
    "playable": true,
    "pax": 40,
    "resolve": 12,
    "defense": 15,
    "attackBonus": 1,
    "damageDie": "1d6",
    "attrLimit": 6,
    "powerLimit": 2,
    "description": "Beginning of meta-activity: novice vigilantes, incidents involving lower-scale powers."
  },
  {
    "key": "C",
    "name": "Local Hero",
    "label": "Urban Level",
    "value": 2,
    "playable": true,
    "pax": 60,
    "resolve": 15,
    "defense": 18,
    "attackBonus": 2,
    "damageDie": "1d6",
    "attrLimit": 9,
    "powerLimit": 2,
    "description": "Urban level: individuals capable of wreaking havoc on an entire city."
  },
  {
    "key": "B",
    "name": "National",
    "label": "Powerful Enough to Trouble a Nation",
    "value": 3,
    "playable": false,
    "description": "Heroes at this level face small armies and possess advanced abilities. (Not detailed in the Quickstart.)"
  },
  {
    "key": "A",
    "name": "Global",
    "label": "Global Level",
    "value": 4,
    "playable": false,
    "description": "Capable of interacting with and impacting the entire planet. (Not detailed in the Quickstart.)"
  },
  {
    "key": "S",
    "name": "Legendary",
    "label": "Legendary Level",
    "value": 5,
    "playable": false,
    "description": "The mere mention of the name is enough to shake the multiverse. (Not detailed in the Quickstart.)"
  }
];
if (typeof window !== 'undefined') { window.JLU_TIERS = JLU_TIERS; }
