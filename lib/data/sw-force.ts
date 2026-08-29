// GENERATED FILE - do not edit by hand.
// Source: data/sw/parts/*.json - regenerate with: node scripts/build-sw-data.mjs

import type { SwForcePower } from "./sw-types";

export const SW_FORCE: SwForcePower[] = [
  {
    "name": "Control Pain",
    "attribute": "Control",
    "difficulty": "Very Easy for wounded characters; Easy for incapacitated (but conscious) characters; Difficult for mortally wounded (but conscious) characters. Stun damage: Easy if the character has not fallen unconscious, Moderate if he regained consciousness through a power.",
    "time": "one round; takes effect the following round",
    "description": "A wounded character who controls pain can act as if unwounded: starting with the round after his Control roll, his die codes are not reduced by 1D. The wound is not healed, just ignored; a wounded character who controls pain and is wounded again becomes incapacitated. Characters who were stunned and control pain eliminate the effects of the stun entirely. Pain from any other cause can likewise be ignored.",
    "book": "companion",
    "page": 57,
    "superseded": {
      "name": "Control Pain",
      "attribute": "Control",
      "difficulty": "5 for wounded characters; 10 for incapacitated but conscious characters; 20 for mortally wounded but conscious ones.",
      "time": "one combat round",
      "description": "A wounded character who controls pain can act as if unwounded — starting with the round after his control roll is made, his die codes are not reduced by 1D. The wound is not healed, just ignored; a wounded character who controls pain and is wounded again becomes incapacitated. Pain from other causes can likewise be ignored. If he remains conscious, an incapacitated or mortally wounded character can attempt to control pain and then act any number of times without lapsing into unconsciousness — but is treated as wounded (-1D). Mortally wounded characters must still roll each round to avoid dying.",
      "book": "core",
      "page": 71
    }
  },
  {
    "name": "Remain Conscious",
    "attribute": "Control",
    "difficulty": "Easy for incapacitated characters; Difficult for mortally wounded ones.",
    "time": "one round (the round after being incapacitated or mortally wounded)",
    "description": "On the round after a character is incapacitated or mortally wounded he may use this power to remain conscious; if he fails he falls unconscious as normal. A conscious incapacitated character acts as though wounded for one round and may take any number of actions (reduced by 1D). A mortally wounded character who remains conscious may do nothing but control pain. A character who remains conscious and then controls pain may act freely without lapsing into unconsciousness. A character knocked out by stun damage gets one round of action as if at '1 Stun' (all actions -1D). The power may not be used repeatedly: it grants a single extra round, during which remain conscious cannot be used again; consciousness is kept only by successfully controlling pain as an action.",
    "book": "companion",
    "page": 57,
    "superseded": {
      "name": "Remain Conscious",
      "attribute": "Control",
      "difficulty": "10 for incapacitated characters, 20 for mortally wounded ones.",
      "time": "one combat round",
      "description": "On the round after a character is incapacitated or mortally wounded, he may use this power to attempt to remain conscious; if he fails, he falls unconscious as usual. A conscious incapacitated character may take one action (at -1D) and then lapses into unconsciousness. A mortally wounded character who remains conscious may not perform any action other than attempting to control pain. A character who remains conscious and then controls pain may perform any number of actions without lapsing into unconsciousness.",
      "book": "core",
      "page": 72
    }
  },
  {
    "name": "Hibernation Trance",
    "attribute": "Control",
    "difficulty": "Difficult",
    "time": "one round to enter; lasts as long as the character states",
    "description": "The character falls into a trance: heartbeat slows to a few beats per minute, breathing drops to a minimum, and he is unconscious. Useful to play dead or when food or air is low. A hibernating character appears dead unless someone makes a point of testing him (a faint mist on a mirror, a very slow heartbeat over a minute with a stethoscope, a flicker on life sensors); a character with Sense can detect his Force and know he is alive. He consumes about one tenth the air of a sleeper, can hibernate a week in a dry atmosphere or a month in a wet one before dying of thirst (indefinitely on an intravenous drip), and three months before starving (a year on a sugar drip). On entering the trance the player states how long he will hibernate or what stimuli will wake him.",
    "book": "companion",
    "page": 58,
    "superseded": {
      "name": "Hibernation Trance",
      "attribute": "Control",
      "difficulty": "20.",
      "time": "one combat round",
      "description": "The character falls into a trance: heartbeat slows to a few beats per minute, breathing drops to a minimum, and he is unconscious and appears dead unless tested closely (a character with sense can detect his Force). Useful for playing dead or when food or air is low: he consumes about one tenth the air of a sleeper; can hibernate a week in a dry atmosphere or a month in a wet one before dying of thirst (indefinitely with an intravenous drip), and three months before starving (a year with a sugar drip). The player states what will wake him — a time or a stimulus. Waking him otherwise is tough and may take hours; another Force user can use place in hibernation trance in reverse to wake him in a few rounds.",
      "book": "core",
      "page": 72
    }
  },
  {
    "name": "Accelerate Healing",
    "attribute": "Control",
    "difficulty": "Easy for wounded; Moderate for incapacitated; Difficult for mortally wounded.",
    "time": "one round; affects the current day's healing",
    "description": "On success the character may do one of the following: make two natural healing rolls for the current day with +2 to each roll; or use two medpacs and make two rolls for the current day with +2 to each roll, with no difficulty increase for the second medpac (any medpac beyond the second does incur the multiple medpac penalty).",
    "book": "companion",
    "page": 58,
    "superseded": {
      "name": "Accelerate Healing",
      "attribute": "Control",
      "difficulty": "5.",
      "time": "one combat round",
      "description": "If successful, the character may make two natural healing rolls for the current day with +2 to each roll.",
      "book": "core",
      "page": 72
    }
  },
  {
    "name": "Contort/Escape",
    "attribute": "Control",
    "difficulty": "Loose bonds: Very Easy. Hand binders: Easy. Serious restraints: Moderate. Maximum security: Difficult. Houdini: Very Difficult.",
    "time": "one round",
    "description": "The character escapes his bonds by contorting in painful and difficult but physically possible ways - for example escaping hand binders by dislocating the thumb and pinky to narrow the hand. This is painful, but a trained Jedi can resist the pain and damage to muscles and ligaments with proper body control.",
    "book": "companion",
    "page": 58,
    "superseded": {
      "name": "Contort/Escape",
      "attribute": "Control",
      "difficulty": "Loose bonds: 5. Handcuffs: 10. Serious restraints: 15. Maximum security: 20. Houdini: 30.",
      "time": "one combat round",
      "description": "The character escapes his bonds by contorting in painful and difficult but physically possible ways — for example, dislocating the thumb and pinky to slip handcuffs. A trained Jedi can resist the pain and damage with proper bodily control; with enough time, training and will, it is possible to escape from virtually any set of restraints.",
      "book": "core",
      "page": 72
    }
  },
  {
    "name": "Detoxify Poison",
    "attribute": "Control",
    "difficulty": "Alcohol: Very Easy. Mild poison: Easy. Average poison: Moderate. Virulent poison: Difficult. Neurotoxin: Very Difficult.",
    "time": "one round",
    "description": "Allows the character to detoxify poisons or eject them from the body in a much shorter time than would normally be possible. If the character makes his skill roll, he is not affected by the poison.",
    "book": "companion",
    "page": 59,
    "superseded": {
      "name": "Detoxify Poison",
      "attribute": "Control",
      "difficulty": "Alcohol: 5. Mild poison: 10. Average poison: 15. Virulent poison: 20. Neurotoxin: 30.",
      "time": "one combat round",
      "description": "Allows the character to detoxify poisons or eject them from the body in a much shorter time than would normally be possible. If the character makes his skill roll, he is not affected by the poison. Alcohol is a mild poison, and one use of the power is to remain sober while drinking large quantities.",
      "book": "core",
      "page": 72
    }
  },
  {
    "name": "Control Disease",
    "attribute": "Control",
    "difficulty": "Mild infection (cold): Very Easy. High fever (bad flu): Easy. Serious sickness (gangrene): Moderate. Life-threatening disease (tuberculosis): Difficult. Massive long-standing disease (lung cancer): Very Difficult.",
    "time": "at least half an hour of meditation; serious diseases need repeated attempts over weeks or months",
    "description": "Allows the character to direct and control the antibodies and healing resources of his own body to throw off an infection or attack the diseased parts of his body. The character must spend at least half an hour meditating, and life-threatening or long-standing diseases may require repeated attempts over weeks or months to cure entirely. On a success he is no longer infectious if he so wills, even if the disease is not completely cured.",
    "book": "companion",
    "page": 59,
    "superseded": {
      "name": "Control Disease",
      "attribute": "Control",
      "difficulty": "Mild infection (cold): 5. High fever (bad flu): 10. Serious sickness (gangrene): 15. Life-threatening disease (tuberculosis): 20. Massive long-standing disease (lung cancer): 30.",
      "time": "at least half an hour; weeks or months for serious disease",
      "description": "Allows the character to direct and control the antibodies and healing resources of his body to throw off an infection or to attack the diseased parts of the body. The character must spend at least half an hour meditating while directing his body; if the disease is life-threatening or long-standing, repeated attempts over weeks or months may be required to cure it entirely.",
      "book": "core",
      "page": 77
    }
  },
  {
    "name": "Absorb/Dissipate Energy",
    "attribute": "Control",
    "difficulty": "Sunburn: Very Easy. Intense sun: Easy. Solar wind: Moderate. Radiation storm: Difficult. Blaster bolt: Moderate, plus the blaster's damage roll.",
    "time": "one round; may be kept up against continuous radiation",
    "description": "Absorbs or dissipates energy to which the character is subjected: light and heat, microwave or other electromagnetic radiation, hard radiation (alpha, beta, gamma) and blaster bolts. A successful Control roll means the energy is dissipated and does not injure the character; under continuous radiation he may keep the power up. It works like starship shields, except that if the Control roll exceeds the difficulty no damage at all is taken; once up it affects all attacks in a round, the skill cannot be blown as shields can, and the Control code is unaffected by attacks.",
    "book": "companion",
    "page": 59,
    "superseded": {
      "name": "Absorb/Dissipate Energy",
      "attribute": "Control",
      "difficulty": "Sunburn: 5. Intense sun: 10. Solar wind: 15. Radiation storm: 20. Blaster bolt: 15 plus the blaster's damage roll.",
      "time": "one combat round",
      "description": "Absorbs or dissipates energy to which the character is subjected — light and heat, microwave or other electromagnetic radiation, hard radiation, and blaster bolts. When used to absorb a blaster bolt, make a damage roll for the blaster; the control difficulty is 15 plus that roll. A successful roll means the energy is dissipated and does not injure the character. Against continuous radiation the power may be kept up.",
      "book": "core",
      "page": 77
    }
  },
  {
    "name": "Receptive Telepathy",
    "attribute": "Sense",
    "difficulty": "Very Easy if the target is friendly and does not resist, modified by proximity and relationship. If the target resists, make a Perception or Control roll for the target and add the proximity and relationship modifiers.",
    "time": "one round at a time; may be kept up to keep monitoring",
    "description": "If the user's roll equals or exceeds the difficulty he can read the target's thoughts and emotions - he hears what the target is thinking but cannot probe deeper. If the roll is at least double the difficulty he can rifle through the target's mind and memories for the information he wants. Each additional person read counts as a power use under the multiple skill rules. Works on creatures as well as sapients; alien emotions may be hard to interpret. It may not be used on Droids.",
    "book": "companion",
    "page": 59,
    "superseded": {
      "name": "Receptive Telepathy",
      "attribute": "Sense",
      "difficulty": "If the target is friendly and does not resist, base 5, modified by proximity and relationship. If the target resists, his perception (or control) roll, plus the modifiers for proximity and relationship.",
      "time": "one combat round",
      "description": "If the user's roll is equal to or greater than the difficulty, he can read the target's thoughts as well as emotions — he hears what the target is thinking, but cannot probe deeper. If the roll is at least double the difficulty, he can rifle through the target's mind and memories for the information he wants. Normally used one round at a time, but can be kept up to keep monitoring. Each person read counts as a separate power use. Works on animals as well as sapients; alien emotions may be hard to interpret. May not be used on Droids.",
      "book": "core",
      "page": 77
    }
  },
  {
    "name": "Magnify Senses",
    "attribute": "Sense",
    "difficulty": "Very Easy, modified by proximity.",
    "time": "one round",
    "description": "The character can sense something that would be impossible with unaided senses: hear something beyond the range of the human ear, see something that would normally require macrobinoculars, hear a very faint sound.",
    "book": "companion",
    "page": 59,
    "superseded": {
      "name": "Magnify Senses",
      "attribute": "Sense",
      "difficulty": "Base 5, modified by proximity.",
      "time": "one combat round",
      "description": "The character can sense something that would be impossible with unaided senses — hear something beyond the range of the human ear, see something that would normally require binoculars, read microfilm with the naked eye, hear a very faint sound.",
      "book": "core",
      "page": 77
    }
  },
  {
    "name": "Life Sense",
    "attribute": "Sense",
    "difficulty": "Very Easy, modified by target proximity and relationship. A target with Control may add his Control roll to the difficulty to hide from the senser.",
    "time": "one round; may be kept up to track a target",
    "description": "The user senses the presence and identity of the person he searches for, and how badly wounded, diseased or otherwise physically disturbed the target is. Kept up, the power can be used to track a target.",
    "book": "companion",
    "page": 59,
    "superseded": {
      "name": "Life Sense",
      "attribute": "Sense",
      "difficulty": "Base 5, modified by target proximity and relationship.",
      "time": "one combat round",
      "description": "The user can sense the presence and identity of the person for whom he searches, and how badly wounded, diseased or otherwise physically disturbed the target is. If the user keeps the power up, he can use it to track a target. If the target has the control skill, he may use it to hide from the senser; his control roll is added to the senser's difficulty number.",
      "book": "core",
      "page": 77
    }
  },
  {
    "name": "Instinctive Astrogation",
    "attribute": "Sense",
    "difficulty": "Moderate",
    "time": "as the astrogation roll",
    "description": "Normally astrogating a ship without a nav computer is Very Difficult for a standard duration trip. By using Sense to plot the trip through hyperspace, the character reduces the astrogation difficulty to Very Easy for a standard duration trip.",
    "book": "companion",
    "page": 60,
    "superseded": {
      "name": "Instinctive Astrogation",
      "attribute": "Sense",
      "difficulty": "15.",
      "time": "one combat round",
      "description": "Normally the difficulty for astrogating a ship without a nav computer is 30 for a standard duration trip. By using sense to plot his trip through hyperspace, a character can reduce the astrogation difficulty number to 5 for a standard duration trip.",
      "book": "core",
      "page": 77
    }
  },
  {
    "name": "Projective Telepathy",
    "attribute": "Control & Sense",
    "difficulty": "Control: Very Easy, modified by proximity; +5 if the user cannot verbalize the thoughts (gagged or wishing to be silent). Sense: Very Easy modified by relationship if the target is friendly and does not resist; otherwise a Perception or Control roll for the target, modified by relationship.",
    "time": "one round",
    "description": "The target hears the thoughts and feels the emotions of the user, and knows they are not his own but belong to the user of the power. The power is used to communicate, not to control minds.",
    "book": "companion",
    "page": 60,
    "superseded": {
      "name": "Projective Telepathy",
      "attribute": "Control & Sense",
      "difficulty": "Control: 5, modified by proximity; +5 if the user cannot verbalize the thoughts he is transmitting. Sense: if the target is friendly and does not resist, 5, modified by relationship; if the target resists, his perception (or control) roll, modified by relationship.",
      "time": "one combat round",
      "description": "The target hears the thoughts and feels the emotions of the user, and knows that they are not his own but belong to the user of the power. This power is not used to control minds, but to communicate.",
      "book": "core",
      "page": 78
    }
  },
  {
    "name": "Farseeing",
    "attribute": "Control & Sense",
    "difficulty": "Control: Very Easy, modified by proximity; +5 to see the past, +10 to see the future. Sense: Very Easy modified by relationship if the target is friendly; otherwise a Perception (or Control) roll for the target, modified by relationship.",
    "time": "a few minutes of calm; cannot be done in the face of danger",
    "description": "The user sees in his mind the place or person he wishes to see, as it appears now, with the immediate surroundings - knowing when a friend is in danger or what has happened to his home planet. Accuracy: a roll equal to the difficulty gives 75% of past/present information and 50% of the future; twice the difficulty gives all past/present and 75% of the future; three times gives all. The future is always in motion; the gamemaster reveals selected truths without giving away the whole story and need not force events to match a foretelling.",
    "book": "companion",
    "page": 60,
    "superseded": {
      "name": "Farseeing",
      "attribute": "Control & Sense",
      "difficulty": "Control: 5, modified by proximity; +5 to see the past, +10 to see the future. Sense: if the target is friendly and does not resist, 5, modified by relationship; if the target resists, his perception (or control) roll, modified by relationship.",
      "time": "one combat round",
      "description": "The user sees the place or person he wishes to see in his mind, as it appears now, along with the immediate surroundings — so he can know when a friend is in danger, or what has happened on his home planet in his absence. It can also be used to see the past or future; any vision of the future is of a possible future only, and the character's own actions can alter things. Farseeing is the only power usable at the +20 (same star system) and +30 (different star system) proximity ranges.",
      "book": "core",
      "page": 78
    }
  },
  {
    "name": "Telekinesis",
    "attribute": "Alter",
    "difficulty": "Very Easy for objects of one kilogram or less; Easy for one to 10 kg; Moderate for 11 to 100 kg; Difficult for 101 kg to one metric ton; +5 for each further factor of 10. Modified by proximity. An unwilling levitated character adds his Perception or Control roll to the difficulty.",
    "time": "one round; may be kept up to keep moving the object",
    "description": "Levitates and moves objects with the naked mind; the object moves as the user desires and continues to move while the power is kept up. It can levitate the user or other characters and even serve as a primitive space drive in emergencies. Using levitated objects to injure or attack other characters is possible, but anyone who does so gains a Dark Side Point.",
    "book": "companion",
    "page": 61,
    "superseded": {
      "name": "Telekinesis",
      "attribute": "Alter",
      "difficulty": "5 for objects of 1 kilogram or less; 10 for 1-10 kg; 15 for 11-100 kg; 20 for 101 kg to 1 metric ton; +5 for each additional factor of 10. Modified by proximity.",
      "time": "one combat round",
      "description": "Levitates and moves objects with the naked mind; the object moves as the user desires and continues to move if the power is kept up. Using levitated objects to injure or attack other characters is possible — but anyone who does so gains a Dark Side point. Can levitate oneself or others, or even serve as a primitive space drive in emergencies; an unwilling target adds his perception or control roll to the difficulty. Each object levitated at once is a separate power use.",
      "book": "core",
      "page": 78
    }
  },
  {
    "name": "Injure/Kill",
    "attribute": "Alter",
    "difficulty": "Make a Perception or Control roll for the target.",
    "time": "one round; requires touching the target (usually a successful brawling attack the same round)",
    "description": "Warning: the user immediately gains a Dark Side Point. The attacker must be touching the target, which in combat usually means a successful brawling attack in the same round. If successful, the Alter roll is the damage roll and the target's Perception or Control roll substitutes for the Strength roll; damage is determined normally, except that if the Alter roll is less than the difficulty the target is not affected.",
    "book": "companion",
    "page": 61,
    "superseded": {
      "name": "Injure/Kill",
      "attribute": "Alter",
      "difficulty": "The target's perception or control roll, modified by proximity.",
      "time": "one combat round",
      "description": "Warning: a character who uses this power immediately gains a Dark Side point. The user alters part of the target's body, intending to injure or kill. Roll alter dice like a combat skill: three times the difficulty mortally wounds the target; at least twice incapacitates; and so on. It never stuns — if the alter roll is less than the difficulty, the target is not affected.",
      "book": "core",
      "page": 79
    }
  },
  {
    "name": "Control Another's Pain",
    "attribute": "Control & Alter",
    "difficulty": "Control: Very Easy, modified by target proximity and relationship. Alter: Easy for wounded characters; Moderate for incapacitated; Difficult for mortally wounded.",
    "time": "one round",
    "description": "Has the same effect on the target as control pain has on its user: from the next round the target acts as if unwounded, though the wound is only ignored, not healed.",
    "book": "companion",
    "page": 61,
    "superseded": {
      "name": "Control Another's Pain",
      "attribute": "Control & Alter",
      "difficulty": "Control: 5, modified by target proximity and relationship. Alter: 5 for wounded characters; 10 for incapacitated ones; 20 for mortally wounded ones.",
      "time": "one combat round",
      "description": "Has the same effect on the target as control pain does on its user.",
      "book": "core",
      "page": 79
    }
  },
  {
    "name": "Inflict Pain",
    "attribute": "Control & Alter",
    "difficulty": "Control: Very Easy, modified by proximity. Alter: make a Perception or Control roll for the target, modified by proximity.",
    "time": "one round",
    "description": "Warning: the user immediately gains a Dark Side Point. The target experiences great agony. Damage is determined as for a stun attack with no separate damage roll: the Alter roll is the damage roll and the Alter difficulty substitutes for the Strength roll. Alter roll at or above the difficulty: 1 stun; at or above twice the difficulty: 2 stun; at or above three times: unconscious.",
    "book": "companion",
    "page": 61,
    "superseded": {
      "name": "Inflict Pain",
      "attribute": "Control & Alter",
      "difficulty": "Control: 5, modified by target proximity. Alter: the target's perception or control roll, modified by proximity, multiplied by two.",
      "time": "one combat round",
      "description": "Warning: a character who uses this power immediately gains a Dark Side point. The target experiences great agony. He is stunned for as long as the user keeps the power up, and two rounds thereafter. If the target has Force skills, he can use control pain to ignore the effects.",
      "book": "core",
      "page": 79
    }
  },
  {
    "name": "Return to Consciousness",
    "attribute": "Control & Alter",
    "difficulty": "Control: Easy, modified by target proximity. Alter: Easy for incapacitated characters; Difficult for mortally wounded ones.",
    "time": "one round",
    "description": "The target becomes conscious again (see remain conscious for what conscious incapacitated and mortally wounded characters can do). A character may use it on himself even while unconscious, but only to revive himself; he cannot revive others while unconscious. If a revived incapacitated or mortally wounded character fails to control pain he lapses into unconsciousness again.",
    "book": "companion",
    "page": 61,
    "superseded": {
      "name": "Return to Consciousness",
      "attribute": "Control & Alter",
      "difficulty": "Control: 5, modified by target proximity. Alter: 10 for incapacitated characters, 20 for mortally wounded ones.",
      "time": "one combat round",
      "description": "The target becomes conscious again. The description for remain conscious explains what conscious incapacitated and mortally wounded characters can do.",
      "book": "core",
      "page": 79
    }
  },
  {
    "name": "Place in Hibernation Trance",
    "attribute": "Control & Alter",
    "difficulty": "Control: Very Easy, modified by the target's relationship. Alter: Very Easy, modified by proximity.",
    "time": "one round; requires physical contact",
    "description": "Puts another character into a hibernation trance. The affected character must agree to be shut down - the power cannot be used as an attack to knock others unconscious - and must be in physical contact with the user.",
    "book": "companion",
    "page": 62,
    "superseded": {
      "name": "Place in Hibernation Trance",
      "attribute": "Control & Alter",
      "difficulty": "Control: 10, modified by the target's relationship. Alter: 10, modified by proximity.",
      "time": "one combat round",
      "description": "The user puts another character into a hibernation trance. The affected character must agree to be shut down — the power cannot be used as an attack to knock others unconscious — and must be in physical contact with the user of the power. Used in reverse, it wakes a hibernating character in a few rounds.",
      "book": "core",
      "page": 79
    }
  },
  {
    "name": "Accelerate Another's Healing",
    "attribute": "Control & Alter",
    "difficulty": "Control: Very Easy, modified by relationship. Alter: Very Easy, modified by proximity.",
    "time": "one round; affects the current day's healing",
    "description": "Follows the new rules for accelerate healing: the target may make either two natural healing rolls or two medpac rolls a day, in every case receiving +2 to the rolls.",
    "book": "companion",
    "page": 62,
    "superseded": {
      "name": "Accelerate Another's Healing",
      "attribute": "Control & Alter",
      "difficulty": "Control: 5, modified by relationship. Alter: 5, modified by proximity.",
      "time": "one combat round",
      "description": "The target may make two natural healing rolls for the current day each at +2.",
      "book": "core",
      "page": 79
    }
  },
  {
    "name": "Detoxify Poison in Another",
    "attribute": "Control & Alter",
    "difficulty": "Control: Very Easy, modified by relationship. Alter: as detoxify poison (alcohol Very Easy up to neurotoxin Very Difficult), modified by target proximity.",
    "time": "one round",
    "description": "Follows the same rules as detoxify poison, but affects a person other than the user.",
    "book": "companion",
    "page": 62,
    "superseded": {
      "name": "Detoxify Poison in Another",
      "attribute": "Control & Alter",
      "difficulty": "Control: 5, modified by relationship. Alter: same as detoxify poison, modified by target proximity.",
      "time": "one combat round",
      "description": "Follows the same rules as detoxify poison.",
      "book": "core",
      "page": 79
    }
  },
  {
    "name": "Control Another's Disease",
    "attribute": "Control & Alter",
    "difficulty": "Control: Very Easy, modified by relationship. Alter: as control disease (cold Very Easy up to lung cancer Very Difficult), modified by target proximity.",
    "time": "at least half an hour of meditation; serious diseases need repeated attempts",
    "description": "Works the same way as control disease but affects a person other than the user.",
    "book": "companion",
    "page": 62,
    "superseded": {
      "name": "Control Another's Disease",
      "attribute": "Control & Alter",
      "difficulty": "Control: 5, modified by relationship. Alter: same as control disease, modified by proximity.",
      "time": "at least half an hour; weeks or months for serious disease",
      "description": "Works in the same way as control disease.",
      "book": "core",
      "page": 79
    }
  },
  {
    "name": "Transfer Force",
    "attribute": "Control & Alter",
    "difficulty": "Control: Easy, modified by relationship. Alter: Moderate, modified by proximity.",
    "time": "one round; costs a Force Point (returned, as the use is heroic)",
    "description": "If both rolls succeed the user must spend a Force Point (regained, as the use is heroic) to transfer a portion of his own life force into the subject. Usually used on mortally wounded subjects to keep them alive: instead of the normal 2D roll each round for a mortally wounded character, the target goes into hibernation and will die only after hours or days - plenty of time to reach a rejuvenation tank.",
    "book": "companion",
    "page": 62,
    "superseded": {
      "name": "Transfer Force",
      "attribute": "Control & Alter",
      "difficulty": "Control: 5, modified by relationship. Alter: 5, modified by proximity.",
      "time": "one combat round",
      "description": "If both skill rolls succeed, the user must spend a Force point to use this power (he'll get it back; using the power is inherently heroic). The user transfers a portion of his own life force into the body of the subject, usually a mortally wounded one. Don't roll the 2D death check for a mortally wounded character to whom Force is transferred; the target goes into a hibernation and will die only after hours or days — plenty of time to get him to a rejuvenation tank.",
      "book": "core",
      "page": 79
    }
  },
  {
    "name": "Affect Mind",
    "attribute": "Control, Sense & Alter",
    "difficulty": "Control: Very Easy for perceptions, Easy for memories, Moderate for conclusions, modified by proximity. Sense: a Perception or Control roll for the target, modified by relationship. Alter: Very Easy for slight momentary misperceptions, minor changes to distant memories, or matters the target does not care about; Easy for brief visible phenomena, memories under a year old, or conclusions the target feels some emotion about; Moderate for short hallucinations, memories under a day old, or strict orders about the conclusion; Difficult for slight facial disguises, hallucinations sensed by two senses, or memories under a minute old or extremely important matters; Very Difficult for hallucinations sensed by all senses, major memory changes, or absolutely clear logic.",
    "time": "one round",
    "description": "Used to alter a character's perception so he senses an illusion or fails to see what the user hides; to alter his memories permanently; or to alter his conclusions so he decides incorrectly. The user must describe the exact effect before rolling; the Alter difficulty depends on it. Normally one target; more targets require more uses. A target hallucinating a blow would feel it but take no damage. Cannot affect Droids or recording devices.",
    "book": "companion",
    "page": 62,
    "superseded": {
      "name": "Affect Mind",
      "attribute": "Control, Sense & Alter",
      "difficulty": "Control: 5 for perceptions, 10 for memories, 15 for conclusions, modified by proximity. Sense: the target's perception or control roll, modified by relationship. Alter: 5 for slight momentary misperceptions, minor changes to distant memories, or a conclusion the target doesn't care about; 10 for brief visible phenomena, memories less than a year old, or a conclusion the target has some feeling about; 15 for short hallucinations, memories less than a day old, or strict orders about the conclusion; 20 for slight disguises to facial features or hallucinations sensed by two senses, memories less than a minute old, or an extremely important conclusion; 30 for hallucinations sensed by all senses, a major memory change (misremembering your own name), or a conclusion where the logic is absolutely clear.",
      "time": "one combat round",
      "description": "Used to alter a character's perception so that he senses an illusion or fails to see what the user does not want him to see; to alter his memories permanently so that he remembers incorrectly or fails to remember; or to alter his conclusions so that he comes to an incorrect decision (\"These aren't the Droids we're looking for\"). The user must describe the exact effect before rolling. Normally affects one target; two or more targets require the power to be used two or more times. A hallucination sensed by all senses can be felt, but causes no damage. Affect mind cannot fool Droids or recording devices.",
      "book": "core",
      "page": 79
    }
  },
  {
    "name": "Telekinetic Kill",
    "attribute": "Control, Sense & Alter",
    "difficulty": "Control: Easy, modified by proximity. Sense: Easy, modified by proximity. Alter: a Perception or Control roll for the target (the relationship modifier no longer applies to the Alter difficulty).",
    "time": "one round",
    "description": "Warning: the user immediately gains a Dark Side Point. If the Control and Sense rolls succeed, the Alter roll is the damage roll and the target's Perception or Control roll substitutes for the Strength roll; damage is determined normally, except that an Alter roll below the difficulty has no effect. The user injures or kills by telekinesis - stirring the brain, squeezing the heart or collapsing the trachea.",
    "book": "companion",
    "page": 63,
    "superseded": {
      "name": "Telekinetic Kill",
      "attribute": "Control, Sense & Alter",
      "difficulty": "Control: 5, modified by proximity. Sense: the target's perception or control roll. Alter: 10 for wound, 20 for incapacitation, 30 for mortal wound; subtract the target's relationship modifier, so killing a complete stranger is easier than killing a close relative.",
      "time": "one combat round",
      "description": "Warning: a character who uses this power immediately gains a Dark Side point. The user uses his telekinetic ability to injure or kill the target — stirring the brain, squeezing the heart, or (Darth Vader's favorite) collapsing the trachea.",
      "book": "core",
      "page": 80
    }
  },
  {
    "name": "Emptiness",
    "attribute": "Control",
    "difficulty": "Moderate to initiate the power; Difficult to break away from the emptiness.",
    "time": "hours; the player states the intended duration",
    "description": "New power. The user empties his mind and lets the Force flow through him; he resembles one in deep meditation, is oblivious to his surroundings and may take no action except trying to disengage. He may roll to come out when his allotted time has passed, once each hour beyond it, or when his body takes non-stun damage. He dehydrates and hungers normally; initiates weak in Control have died in emptiness. While empty he is hard to affect with the Force: add his emptiness roll to the Sense difficulty (or the Alter difficulty if no Sense is used) of any power used on him, whether he wishes to resist or not. Afterwards he receives +6 to all Force skill rolls for a period equal to the time spent in emptiness, reduced by one for every Dark Side Point he has. Characters consumed by evil may not go into emptiness.",
    "book": "companion",
    "page": 64
  },
  {
    "name": "Force of Will",
    "attribute": "Control",
    "difficulty": "Very Easy; the power may be kept up.",
    "time": "one round; may be kept up",
    "description": "New power. The character manipulates his Force to protect himself from hostile Force powers, creating a filtering aura as a manifestation of his will; it protects only the user and works like shielding on a starship. The power roll is added to the difficulty of any hostile power used against him; the sum is the protection number. An attack roll below the difficulty has no effect; at or above the protection number it has full effect; between the two the attack hits but force of will protects the target from harm. Each time it protects against a Force attack, lower the force of will code by 1D (this affects nothing else); each 1D is recovered with one day, or one hour in emptiness.",
    "book": "companion",
    "page": 65
  },
  {
    "name": "Postcognition",
    "attribute": "Sense",
    "difficulty": "Less than two hours into the past: Easy; two hours to a week: Moderate; a week to two years: Difficult; more than two years: Very Difficult.",
    "time": "one round; the object must be handled",
    "description": "New power. Investigates the tenuous imprints of the Force left on objects handled by living beings; the character must handle the object. If the roll is at least three times the difficulty he witnesses the event as if he were there; at least twice, he gains a good sensory impression with the primary sense (usually sight) wavery or obscured; simply greater than the difficulty, all impressions are muzzy - sight blurry, sound muffled, touch dulled, smells and tastes indistinct.",
    "book": "companion",
    "page": 65
  },
  {
    "name": "Sense Force",
    "attribute": "Sense",
    "difficulty": "Very Easy for an area; Difficult for sensing details or specific objects within the area, modified by proximity.",
    "time": "one round",
    "description": "New power. Senses the ambient Force within a place. It cannot detect sentient beings, but many life forms and regions are well intertwined with the Force and can be sensed. It tells the rough magnitude of the Force in an area or object and whether it tends toward the Dark Side or the light.",
    "book": "companion",
    "page": 65
  },
  {
    "name": "Shift Sense",
    "attribute": "Sense",
    "difficulty": "Moderate; the power may be kept up.",
    "time": "one round; may be kept up",
    "description": "New power. The character shifts his senses to detect phenomena of a different type than normal: shifting vision into the infrared or even radio waves, setting the olfactory nerves to detect specific chemical combinations, or improving hearing to frequencies above or below the normal range.",
    "book": "companion",
    "page": 65
  },
  {
    "name": "Dim Other's Senses",
    "attribute": "Sense & Alter",
    "difficulty": "Sense: Easy, modified by proximity. Alter: a Perception or Control roll for the target.",
    "time": "one round",
    "description": "New power. Greatly reduces the Perception of a character. On success reduce the target's Perception, hide/sneak and search skills: Alter roll at or above the difficulty -1D; at or above twice the difficulty -2D; at or above three times -3D.",
    "book": "companion",
    "page": 65
  }
];
