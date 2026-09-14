// GENERATED FILE - do not edit by hand.
// Source: data/icrpg/parts/*.json - regenerate with: node scripts/build-icrpg-data.mjs

import type { IcrpgEffortType } from "./icrpg-types";

export const ICRPG_EFFORT: IcrpgEffortType[] = [
  {
    "name": "Basic",
    "die": "d4",
    "desc": "Roll a D4 after a successful ATTEMPT when using only your bare hands or your wits, such as punching, bending bars, or deciphering coded writing."
  },
  {
    "name": "Weapons & Tools",
    "die": "d6",
    "desc": "Roll a D6 when using a standard melee or ranged weapon to do damage, or a tool to accomplish a task like prying a jammed door or bandaging a wound."
  },
  {
    "name": "Guns",
    "die": "d8",
    "desc": "Roll a D8 when using a firearm to attack an enemy and do damage; guns are deadly and come in many devastating forms."
  },
  {
    "name": "Magic & Energy",
    "die": "d10",
    "desc": "Roll a D10 when casting explosive magic or using arcane and energy effects such as particle beams, lasers, plasma, or magical healing."
  },
  {
    "name": "Ultimate",
    "die": "d12",
    "desc": "On a critical success (a natural 20 on your ATTEMPT), add a D12 on top of the EFFORT die that fits for ULTIMATE results."
  }
];
