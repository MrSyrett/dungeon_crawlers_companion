// GENERATED FILE - do not edit by hand.
// Source: data/mmrpg/parts/*.json - regenerate with: node scripts/build-mmrpg-data.mjs

const MMRPG_EQUIPMENT = [
  {
    "name": "Bow",
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
    "name": "Club",
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
    "name": "Flash-Bang Grenade",
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
    "name": "Knife",
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
    "name": "Pistol",
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
