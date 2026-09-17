// GENERATED FILE - do not edit by hand.
// Source: data/mmrpg/parts/*.json - regenerate with: node scripts/build-mmrpg-data.mjs

const MMRPG_EQUIPMENT = [
  {
    "name": "Adamantium Claws",
    "tier": "Iconic",
    "type": "Weapon",
    "category": "Weapon",
    "owner": "Wolverine",
    "weaponClass": "melee",
    "ability": "melee",
    "range": "Reach",
    "damageBonus": "+1",
    "multBonus": 1,
    "multAbilities": [
      "melee"
    ],
    "notes": "Wolverine's adamantium-laced bone claws.",
    "source": "core ch.8 (Characters)"
  },
  {
    "name": "Adamantium Claws (X-Men '97)",
    "tier": "Iconic",
    "type": "Weapon",
    "category": "Weapon",
    "owner": "Wolverine",
    "weaponClass": "melee",
    "ability": "melee",
    "range": "Reach",
    "damageBonus": "+1",
    "multBonus": 1,
    "multAbilities": [
      "melee"
    ],
    "special": "Ignores 1 level of the target's Damage Reduction.",
    "notes": "Wolverine's adamantium claws (X-Men '97).",
    "source": "X-Men '97"
  },
  {
    "name": "All-Black the Necrosword",
    "tier": "Iconic",
    "type": "Weapon",
    "category": "Weapon",
    "owner": "Gorr the God Butcher",
    "weaponClass": "melee",
    "ability": "melee",
    "range": "Reach",
    "damageBonus": "—",
    "multBonus": 0,
    "special": "The source of all Gorr's powers — without All-Black, Gorr is powerless.",
    "notes": "The first symbiote, a living blade forged from a god's shadow.",
    "source": "core ch.8 (Characters)"
  },
  {
    "name": "Bow",
    "tier": "Common",
    "type": "Weapon",
    "category": "Weapon",
    "weaponClass": "ranged",
    "ability": "agility",
    "range": "15",
    "damageBonus": "+1",
    "multBonus": 1,
    "notes": "Ammunition is assumed to be plentiful.",
    "source": "core p34"
  },
  {
    "name": "Captain America's Shield",
    "tier": "Iconic",
    "type": "Weapon",
    "category": "Weapon",
    "owner": "Captain America",
    "weaponClass": "melee",
    "ability": "melee",
    "range": "Reach (thrown 10)",
    "damageBonus": "+1",
    "multBonus": 1,
    "multAbilities": [
      "melee",
      "agility"
    ],
    "special": "Grants one extra level of the Shield power (up to Shield 4), usable without paying the additional level's Focus cost.",
    "notes": "A nigh-indestructible vibranium disc that can be thrown and bounces back.",
    "source": "core ch.8 (Characters)"
  },
  {
    "name": "Club",
    "tier": "Common",
    "type": "Weapon",
    "category": "Weapon",
    "weaponClass": "melee",
    "ability": "melee",
    "range": "Reach",
    "damageBonus": "+1",
    "multBonus": 1,
    "notes": "A simple bludgeon.",
    "source": "core p34"
  },
  {
    "name": "Crimson Gem of Cyttorak",
    "tier": "Iconic",
    "type": "Item",
    "category": "Item",
    "owner": "Juggernaut",
    "special": "Any attack that deals less than 30 points of damage to the wielder is instantly negated.",
    "notes": "The mystic ruby whose power transformed Cain Marko into the Juggernaut.",
    "source": "core ch.8 (Characters)"
  },
  {
    "name": "Daredevil's Billy Club",
    "tier": "Iconic",
    "type": "Weapon",
    "category": "Weapon",
    "owner": "Daredevil",
    "weaponClass": "melee",
    "ability": "melee",
    "range": "15",
    "damageBonus": "+1",
    "multBonus": 1,
    "multAbilities": [
      "melee",
      "agility"
    ],
    "grantsMovement": [
      {
        "mode": "Swingline",
        "mult": 3,
        "base": "run"
      }
    ],
    "special": "Can be thrown and instantly retrieved. The range of the club and the reach of the swingline both equal its Swingline Speed.",
    "notes": "A billy club on a de-cel cable that doubles as a grappling line.",
    "source": "core ch.8 (Characters)"
  },
  {
    "name": "Electrified Vibranium Claws",
    "tier": "Iconic",
    "type": "Weapon",
    "category": "Weapon",
    "owner": "Black Panther",
    "weaponClass": "melee",
    "ability": "melee",
    "range": "Reach",
    "damageBonus": "+1",
    "multBonus": 1,
    "multAbilities": [
      "melee"
    ],
    "notes": "Black Panther's iconic weapon — retractable vibranium claws that carry an electric charge.",
    "source": "core ch.8 (Characters)"
  },
  {
    "name": "Element Gun",
    "tier": "Iconic",
    "type": "Weapon",
    "category": "Weapon",
    "owner": "Star-Lord",
    "weaponClass": "ranged",
    "ability": "agility",
    "range": "10",
    "damageBonus": "—",
    "multBonus": 0,
    "special": "With each use, choose an elemental effect from air, earth, fire, water, or energy. Returns to the wielder when summoned.",
    "notes": "A Kree quad-blaster keyed to the elements.",
    "source": "core ch.8 (Characters)"
  },
  {
    "name": "Flash-Bang Grenade",
    "tier": "Common",
    "type": "Weapon",
    "category": "Weapon",
    "weaponClass": "ranged",
    "ability": "agility",
    "range": "10",
    "damageBonus": "—",
    "noDamage": true,
    "notes": "Deals no Health damage. Compare the attack vs the Vigilance defense of anyone within 2 spaces — on a success they are blinded for one round (Fantastic: stunned instead).",
    "source": "core p34"
  },
  {
    "name": "Frag Grenade",
    "tier": "Common",
    "type": "Weapon",
    "category": "Weapon",
    "weaponClass": "ranged",
    "ability": "agility",
    "range": "10",
    "damageBonus": "×2",
    "flatMult": 2,
    "notes": "Affects all within 2 spaces of where it lands. Uses its own ×2 damage multiplier instead of the attacker's; a Fantastic success does ×4 to the center space.",
    "source": "core p34"
  },
  {
    "name": "Gambit's Bo Staff",
    "tier": "Iconic",
    "type": "Weapon",
    "category": "Weapon",
    "owner": "Gambit",
    "weaponClass": "melee",
    "ability": "melee",
    "range": "Reach +1",
    "damageBonus": "+1",
    "multBonus": 1,
    "multAbilities": [
      "melee"
    ],
    "special": "Signature weapon — grants reach +1.",
    "notes": "A collapsible telescoping bo staff.",
    "source": "X-Men '97"
  },
  {
    "name": "Gambit's Charged Cards",
    "tier": "Iconic",
    "type": "Weapon",
    "category": "Weapon",
    "owner": "Gambit",
    "weaponClass": "ranged",
    "ability": "agility",
    "range": "5",
    "damageBonus": "+1",
    "multBonus": 1,
    "multAbilities": [
      "agility"
    ],
    "special": "Act as thrown knives. Using Elemental Infusion on them costs 0 Focus. The cards function only for Gambit.",
    "notes": "Ordinary playing cards charged with kinetic energy.",
    "source": "X-Men '97"
  },
  {
    "name": "Iron Man's Gloves",
    "tier": "Iconic",
    "type": "Item",
    "category": "Item",
    "owner": "Night Nurse",
    "special": "Grants the Elemental Burst power (Energy).",
    "notes": "A repurposed pair of Iron Man's gauntlets.",
    "source": "core ch.8 (Characters)"
  },
  {
    "name": "Knife",
    "tier": "Common",
    "type": "Weapon",
    "category": "Weapon",
    "weaponClass": "melee",
    "ability": "melee",
    "range": "Reach",
    "damageBonus": "+1",
    "multBonus": 1,
    "notes": "A close blade.",
    "source": "core p34"
  },
  {
    "name": "Knife, Thrown",
    "tier": "Common",
    "type": "Weapon",
    "category": "Weapon",
    "weaponClass": "ranged",
    "ability": "agility",
    "range": "5",
    "damageBonus": "+1",
    "multBonus": 1,
    "notes": "A thrown blade.",
    "source": "core p34"
  },
  {
    "name": "Mjolnir",
    "tier": "Iconic",
    "type": "Weapon",
    "category": "Weapon",
    "owner": "Thor",
    "weaponClass": "melee",
    "ability": "melee",
    "range": "Reach (thrown 10)",
    "damageBonus": "+1",
    "multBonus": 1,
    "multAbilities": [
      "melee",
      "agility"
    ],
    "special": "Returns to the thrower. Can only be wielded by the worthy.",
    "notes": "Thor's enchanted Uru hammer.",
    "source": "core ch.8 (Characters)"
  },
  {
    "name": "Pistol",
    "tier": "Common",
    "type": "Weapon",
    "category": "Weapon",
    "weaponClass": "ranged",
    "ability": "agility",
    "range": "10",
    "damageBonus": "+1",
    "multBonus": 1,
    "notes": "A handgun.",
    "source": "core p34"
  },
  {
    "name": "Rifle",
    "tier": "Common",
    "type": "Weapon",
    "category": "Weapon",
    "weaponClass": "ranged",
    "ability": "agility",
    "range": "20",
    "damageBonus": "+1",
    "multBonus": 1,
    "notes": "Attacks against targets 5 spaces away or fewer have trouble.",
    "source": "core p34"
  },
  {
    "name": "Shotgun",
    "tier": "Common",
    "type": "Weapon",
    "category": "Weapon",
    "weaponClass": "ranged",
    "ability": "agility",
    "range": "6",
    "damageBonus": "+1",
    "multBonus": 1,
    "notes": "Can attack up to two adjacent targets — one attack roll compared to both Agility defenses; split the damage equally.",
    "source": "core p34"
  },
  {
    "name": "Sniper Rifle",
    "tier": "Common",
    "type": "Weapon",
    "category": "Weapon",
    "weaponClass": "ranged",
    "ability": "agility",
    "range": "40",
    "damageBonus": "+1",
    "multBonus": 1,
    "notes": "A long-range firearm.",
    "source": "core p34"
  },
  {
    "name": "Submachine Gun",
    "tier": "Common",
    "type": "Weapon",
    "category": "Weapon",
    "weaponClass": "ranged",
    "ability": "agility",
    "range": "10",
    "damageBonus": "+1",
    "multBonus": 1,
    "notes": "Can attack up to three adjacent targets; split the damage equally. Attacks against targets 5 spaces away or fewer have trouble.",
    "source": "core p34"
  },
  {
    "name": "Sword",
    "tier": "Common",
    "type": "Weapon",
    "category": "Weapon",
    "weaponClass": "melee",
    "ability": "melee",
    "range": "Reach",
    "damageBonus": "+2",
    "multBonus": 2,
    "notes": "A bladed close weapon.",
    "source": "core p34"
  }
];
if (typeof window !== 'undefined') { window.MMRPG_EQUIPMENT = MMRPG_EQUIPMENT; }
