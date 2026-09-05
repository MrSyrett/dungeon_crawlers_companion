# D62e data extraction contract

D6 System: Second Edition (D62e), Gallant Knight Games 2024. One book, genre-agnostic:
a core backbone + genre modules (Fantasy, Science Fiction, Superheroes). We model it as
ONE data set, every row tagged with a `genre`. No book-layering/superseding (unlike SW).

Each extraction agent writes ONE file under `data/d62e/parts/<name>.json`. The build script
`scripts/build-d62e-data.mjs` concatenates the arrays across all parts into
`lib/data/d62e-*.ts` + `public/tools-data/d62e-*.js`.

## Global conventions

- **genre**: one of `"core"`, `"fantasy"`, `"scifi"`, `"superhero"`. Core = the genre-agnostic
  backbone that applies to every game. Tag each row with the genre section it comes from.
- **page**: printed page number (the number printed at the bottom of the page, NOT the PDF
  page index). PDF page ≈ printed page + 1, but always use the printed number.
- **Die codes as pips**: D62e die codes are `#D` or `#D+n` (e.g. `3D`, `4D+2`). Store any die
  code as an INTEGER number of pips where **1D = 3 pips** and each `+1` = 1 pip.
  So `3D` = 9, `3D+2` = 11, `4D` = 12, `2D+1` = 7. A helper `code(pips)` renders it back.
  Attribute/skill die codes on templates and creatures use pips. Weapon damage may be a die
  code string (store as text in `damage`) since some are "STR+1D" style — keep those as text.
- Keep descriptions concise but faithful — 1–3 sentences. Prefer completeness of the LIST
  (every skill, template, perk, power, creature) over exhaustive prose. Trim flavor.
- Every part file is a JSON object. Include only the arrays that section provides; omit the rest
  (the build tolerates missing arrays). Always valid JSON (no trailing commas, no comments).

## Entity arrays (put any subset in your part file)

### attributes  (D62eAttributeInfo)
The four core attributes and any additional-attributes module options.
```json
{ "name": "Agility", "core": true, "description": "Coordination, balance, speed, and manual dexterity.", "genre": "core", "page": 20 }
```

### skills  (D62eSkill)
```json
{ "name": "Brawling", "attribute": "Brawn", "genre": "core",
  "description": "Unarmed close combat — punches, kicks, grapples.",
  "specializations": ["Boxing", "Wrestling"], "time": "one round", "page": 39 }
```
`attribute` is the governing attribute NAME (a core attribute, or a genre attribute name).
`specializations` optional (sample specializations if the book lists them). `time` optional.

### templates  (D62eTemplate)  — "partially completed characters"
```json
{ "name": "Knight", "genre": "core", "archetype": "Warrior",
  "attributes": { "Agility": 9, "Brawn": 12, "Knowledge": 6, "Perception": 6 },
  "skills": [ { "name": "Melee Combat", "pips": 15 }, { "name": "Brawling", "pips": 12 } ],
  "perks": ["Tough"], "flaws": ["Code of Honor"], "talents": [],
  "equipment": ["Sword (STR+2D)", "Plate armor (+2D vs physical)"],
  "heroPoints": 1, "description": "A sworn protector...", "quote": "Honor above all.", "page": 138 }
```
`attributes` in pips (the 4 core, plus any genre attributes the template uses). `skills` optional
list of `{name, pips}` (pips = the skill's die code). perks/flaws/talents/quote/description optional.

### equipment  (D62eEquipment)  — weapons, armor, gear, by genre/era
```json
{ "name": "Longsword", "category": "weapon", "genre": "core", "era": "Medieval",
  "damage": "STR+2D", "range": "melee", "skill": "Melee Combat",
  "protection": null, "cost": "—", "description": "A knightly blade.", "page": 80 }
```
`category`: `"weapon" | "armor" | "gear"`. `damage` text die-code for weapons; `protection` text for armor
(e.g. `"+2D physical / +1D energy"`). `era` optional (Medieval, Modern, Sci-Fi, etc.). `range`/`skill`/`cost` optional.

### creatures  (D62eCreature)  — general foes + genre bestiaries
```json
{ "name": "Goblin", "genre": "fantasy", "kind": "Humanoid",
  "attributes": { "Agility": 9, "Brawn": 6, "Knowledge": 3, "Perception": 6 },
  "skills": ["brawling 3D", "melee combat 3D", "sneak 4D"],
  "talents": ["Pack Tactics"], "powers": [], "special": ["Darkvision"],
  "move": "10", "description": "Small, vicious raiders.", "page": 165 }
```
`attributes` in pips (partial ok). `skills` as printed text lines. talents/powers/special/move/description optional.

### perks  (D62ePerk)  — the Perks, Flaws & Talents module + Troubles & Assets
```json
{ "name": "Ambidextrous", "kind": "perk", "cost": "-2D", "description": "No off-hand penalty.", "genre": "core", "page": 102 }
```
`kind`: `"perk" | "flaw" | "talent" | "trouble" | "asset"`. `cost` the die/point value as printed
(perks cost dice, flaws give them back — keep the printed sign). description required.

### powers  (D62ePower)  — superpowers, psionics, magic effects
```json
{ "name": "Telekinesis", "kind": "psionic", "genre": "scifi", "skill": "Telekinesis",
  "difficulty": "Varies by mass", "cost": "10 pts", "description": "Move objects with the mind.",
  "options": ["Ranged", "Fine control"], "page": 185 }
```
`kind`: `"superpower" | "psionic" | "magic"`. skill/difficulty/cost/options optional.

### vehicles  (D62eVehicle)  — starships, vehicles
```json
{ "name": "Light Freighter", "kind": "Starship", "genre": "scifi", "scale": "Starfighter",
  "crew": "2", "passengers": "6", "speed": "8D", "maneuver": "2D", "body": "4D",
  "shields": "1D", "weapons": [ { "name": "Laser cannon", "damage": "5D" } ],
  "cost": "100,000", "description": "A rugged hauler.", "page": 177 }
```
Most fields optional/text. `weapons` array of `{name, damage, ...}`.

### modules  (D62eModule)  — the optional RULES modules (summaries for the Rules reference + GM screen)
```json
{ "name": "Chases", "category": "Core Module", "genre": "core",
  "summary": "Resolve pursuits as a series of opposed Agility/vehicle rolls; the gap is tracked in lengths...", "page": 73 }
```
`category`: e.g. `"Core Module"`, `"Fantasy Module"`, `"Science Fiction Module"`, `"Superhero Module"`.
2–4 sentence summary of what the module does and its key mechanic.

### tables  (object — ONLY the core-rules part writes this)
```json
"tables": {
  "difficulties": [ { "name": "Very Easy", "range": "1-5", "text": "Almost anyone succeeds." } ],
  "woundLevels":  [ { "name": "Stunned", "text": "-1D to all actions next round." } ],
  "damageResults":[ { "range": "0-3 over", "text": "Stunned." } ],
  "combatModifiers":[ { "name": "Point blank", "text": "+10 to hit." } ],
  "creation": { "attributeDice": "12D (1D-5D each)", "skillDice": "7D (max 2D/skill at creation)",
                "heroPoints": 1, "dodge": "5 x Perception dice", "parry": "5 x Agility dice",
                "note": "Add +3D attribute dice per extra attribute; +2D skill dice per skill module." },
  "heroPoints": [ { "name": "Double a roll", "text": "Spend 1 to double one die code." } ],
  "quickRules": [ { "title": "The Wild Die", "text": "One die in every code is the Wild Die; a 6 is an Advantage, a 1 a Complication." } ]
}
```
Include `attributes` table too if you like, but the `attributes` ARRAY above is the canonical source.
