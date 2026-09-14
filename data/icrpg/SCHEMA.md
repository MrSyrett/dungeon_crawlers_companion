# ICRPG data schema (data/icrpg/parts/*.json)

Each part file is a JSON **object**. Include only the top-level keys your section
covers; each value is an array of the shapes below. The build script concatenates
each key across all part files. Keep descriptions faithful but concise (1–3
sentences); capture mechanically-relevant details (dice, bonuses, HEARTS, TARGET,
DEFENSE, EFFORT type). Use `world` values from: `alfheim`, `warpshell`,
`ghostmountain`, `vigilantecity`, `bloodandsnow`, or `core` (universal).

```
{
  "worlds":      [{ "key": "alfheim", "name": "Alfheim", "blurb": "…", "era": "fantasy" }],
  "coreStats":   [{ "name": "Strength", "abbr": "STR", "desc": "…" }],
  "effortTypes": [{ "name": "Weapons & Tools", "die": "d6", "desc": "…" }],
  "quickRules":  [{ "title": "The Target", "text": "…" }],
  "lifeForms":   [{ "name": "Elf", "world": "alfheim", "statBonus": "+1 DEX", "desc": "…" }],
  "types":       [{ "name": "Warrior", "world": "alfheim", "desc": "…", "statFocus": "STR",
                    "startingLoot": ["…"], "abilities": ["Ability name"] }],
  "abilities":   [{ "name": "…", "kind": "ability", "world": "alfheim", "desc": "…" }],
                 // kind = "ability" | "power" | "augment"
  "loot":        [{ "name": "…", "table": "Ancient", "roll": "3", "desc": "…", "effects": ["+1 DEF"] }],
                 // table = Ancient|Shabby|Cursed|SciFi|Epic|Bizarre|GhostMountain|Magic|AlfheimBasic|WarpShellBasic|GhostMountainGear|VigilanteGear|BloodSnowGear
  "gear":        [{ "name": "…", "world": "alfheim", "category": "weapon", "desc": "…", "effects": ["+d6 WEAPON"] }],
                 // category = weapon|armor|gear|tool|firearm
  "spells":      [{ "name": "…", "school": "Arcane", "desc": "…", "target": "…", "effort": "d10" }],
                 // school = Arcane|Holy|Infernal|Alfheim
  "monsters":    [{ "name": "…", "tier": "Grunt", "hearts": 1, "hp": 10, "defense": 0,
                    "stats": { "STR": 0, "DEX": 0, "CON": 0, "INT": 0, "WIS": 0, "CHA": 0 },
                    "attacks": ["Claw, d6 WEAPON"], "abilities": ["…"], "desc": "…", "world": "alfheim" }]
                 // hearts = number of HEARTS (10 HP each); hp = total HP if given; tier free text
}
```

Rules of thumb:
- Numbers stay numbers (hearts, hp, defense, stat bonuses in monster `stats`).
- Omit a field rather than guessing; omit `stats` entirely if the monster block has none.
- STAT/EFFORT/DEFENSE bonuses on loot/gear go in `effects` as short strings ("+1 STR", "+1 DEF", "+d8 GUN", "1 heal").
