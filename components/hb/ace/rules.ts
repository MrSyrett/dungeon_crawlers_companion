// ── ACE! (Awfully Cheerful Engine) homebrew rules — pure, no React ───────────
// Shared by the components/hb/ace/* builders AND lib/homebrew.ts (the server
// normalisers), so the preview and the stored data always agree.
//
// ACE! vocabulary (core omnibus): Stats Smarts / Moves / Style / Brawn (+ the
// optional Power, which costs 1 Karma per use). Roll a pool of d6 equal to the
// Stat (+2 dice with a matching Focus), sixes explode, beat the Target Number
// (Normal 10 / Hard 20 / Herculean 30 / Impossible 40). Attacks beat Defence
// (Moves × 3, +6 with Dodging, min 8) and deal FLAT damage; unarmed damage is
// 1 per 5 Brawn. Health = Brawn (+2 with Tough); Mooks always have 1 Health.
// Gear is bought with a Style roll against its tier's TN.
//
// Storage stays in the book shapes (lib/data/ace-types.ts). New, optional fields:
//   role  · startingGear: string[]           (the creation wizard pre-ticks it)
//   gear  · attack: "melee" | "ranged"       (the sheet's attack row kind)
//   extra · attackRows, auto {health, defence} (the server composes `attacks`,
//           `health` and `defence` from them)
//   focus · health, defence                  (flat bonuses the sheet adds while
//           the Focus is on the sheet; composed into `note` when it's blank)

export const ACE_STATS = ["Smarts", "Moves", "Style", "Brawn", "Power"] as const;
export type AceStat = (typeof ACE_STATS)[number];
export const STAT_KEY: Record<AceStat, "smarts" | "moves" | "style" | "brawn" | "power"> = {
  Smarts: "smarts", Moves: "moves", Style: "style", Brawn: "brawn", Power: "power",
};

export const ACE_SETTINGS: [string, string][] = [
  ["core", "Core rules"], ["spirits", "Spirits of Manhattan"], ["montana", "Montana Drones"], ["strange", "Strange Science"],
  ["beam", "Beam Me Up"], ["orcs", "Orcs & Oubliettes"], ["domes", "Domes of Thunder"], ["bite", "Bite Me!"], ["aaah", "AAAH!"],
];
export const SETTING_KEYS = ACE_SETTINGS.map(([k]) => k);
export const settingLabel = (k: string) => ACE_SETTINGS.find(([v]) => v === k)?.[1] ?? k;

export const ROLE_CATEGORIES = ["Talking Animals", "Species", "Fantasy", "Occupations", "Superheroes", "Ghostbreakers", "New Occupations", "Strange Science", "Starship Crew", "Orcs & Oubliettes", "Wasteland"];
export const GEAR_CATEGORIES = ["Weapon", "Armor", "Gadget", "Consumable", "Magic Item", "Mount", "Vehicle", "Starship Weapon", "Kit", "Service", "Property"];
export const EXTRA_TYPES = ["Mook", "Person", "Animal", "Robot", "Monster", "Villain", "Ghost", "Undead", "Vehicle", "Alien", "Demon"];

// ── Gear tiers (purchase difficulty) ─────────────────────────────────────────
export const ACE_TIERS = ["Free", "Normal", "Hard", "Herculean", "Impossible"] as const;
export type AceTier = (typeof ACE_TIERS)[number];
export const TIER_TN: Record<AceTier, number | null> = { Free: null, Normal: 10, Hard: 20, Herculean: 30, Impossible: 40 };
export const TIER_BUY: Record<AceTier, string> = { Free: "up to 10 — no roll", Normal: "up to 1,000", Hard: "up to 10,000", Herculean: "up to 100,000", Impossible: "up to 1,000,000" };
export const GEAR_ATTACKS = ["melee", "ranged"] as const;

/** The core weapon damage table (ACE_TABLES.weapons). */
export const BOOK_WEAPONS: { name: string; damage: number; ranged: boolean }[] = [
  { name: "Bazooka", damage: 5, ranged: true }, { name: "Bow", damage: 2, ranged: true }, { name: "Club", damage: 2, ranged: false },
  { name: "Grenade", damage: 4, ranged: true }, { name: "Knife", damage: 2, ranged: false }, { name: "Machine Gun", damage: 4, ranged: true },
  { name: "Pistol", damage: 3, ranged: true }, { name: "Rifle", damage: 3, ranged: true }, { name: "Spear", damage: 2, ranged: false },
  { name: "Sword", damage: 3, ranged: false },
];

// ── Derived numbers ──────────────────────────────────────────────────────────
/** Unarmed damage: 1 per 5 points of Brawn (1–5 → 1, 6–10 → 2 …). */
export const unarmedDamage = (brawn: number | null | undefined) => Math.max(1, Math.ceil((brawn ?? 0) / 5));
export const defenceOf = (moves: number | null | undefined, dodging: boolean) => Math.max(8, (moves ?? 0) * 3 + (dodging ? 6 : 0));

const s = (v: unknown) => (typeof v === "string" ? v : v == null ? "" : String(v)).trim();
const int = (v: unknown): number | null => { const n = parseInt(String(v ?? "").trim().replace(/^[−–]/, "-"), 10); return Number.isFinite(n) ? n : null; };
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const nInt = (v: unknown, lo: number, hi: number): number | null => { const n = int(v); return n == null ? null : clamp(n, lo, hi); };
const isStat = (v: unknown): v is AceStat => (ACE_STATS as readonly string[]).includes(s(v));

// ═══ ROLE ════════════════════════════════════════════════════════════════════
/** Role effects as badges: stat mods, Health bonus, the Power stat, free Focuses. */
export type RoleBadge = { kind: string; target?: string; amount?: number };
export type RoleFx = { power: boolean; statMods: Partial<Record<AceStat, number>>; healthBonus: number; grantsFocus: string[] };
export function roleBadges(fx: RoleFx): RoleBadge[] {
  const out: RoleBadge[] = [];
  if (fx.power) out.push({ kind: "power" });
  for (const st of ACE_STATS) { const n = fx.statMods[st]; if (n) out.push({ kind: "stat", target: st, amount: n }); }
  if (fx.healthBonus) out.push({ kind: "health", amount: fx.healthBonus });
  for (const f of fx.grantsFocus) out.push({ kind: "focus", target: f });
  return out;
}
export function roleFx(badges: RoleBadge[]): RoleFx {
  const fx: RoleFx = { power: false, statMods: {}, healthBonus: 0, grantsFocus: [] };
  for (const b of badges) {
    if (b.kind === "power") fx.power = true;
    else if (b.kind === "stat" && isStat(b.target) && b.amount) fx.statMods[b.target] = clamp((fx.statMods[b.target] ?? 0) + b.amount, -3, 3);
    else if (b.kind === "health" && b.amount) fx.healthBonus = clamp(fx.healthBonus + b.amount, -5, 10);
    else if (b.kind === "focus" && s(b.target) && !fx.grantsFocus.some((x) => x.toLowerCase() === s(b.target).toLowerCase())) fx.grantsFocus.push(s(b.target).slice(0, 60));
  }
  return fx;
}
/** Server: stat mods from the builder's `statMods` object or the legacy mod<Stat> fields. */
export function cleanStatMods(o: Record<string, unknown>): Partial<Record<AceStat, number>> {
  const src = o.statMods && typeof o.statMods === "object" ? (o.statMods as Record<string, unknown>) : null;
  const out: Partial<Record<AceStat, number>> = {};
  for (const st of ACE_STATS) {
    const n = nInt(src ? src[st] : o["mod" + st], -3, 3);
    if (n) out[st] = n;
  }
  return out;
}

// ═══ FOCUS ═══════════════════════════════════════════════════════════════════
/** "+2 Health." / "+6 Defence." — the book's wording for Tough and Dodging. */
export function focusNote(health: number | null, defence: number | null): string {
  const p: string[] = [];
  const sg = (n: number) => (n >= 0 ? "+" : "−") + Math.abs(n);
  if (health) p.push(`${sg(health)} Health.`);
  if (defence) p.push(`${sg(defence)} Defence.`);
  return p.join(" ");
}
/** A legacy note that is exactly a bonus phrase → its numbers (else null). */
export function parseFocusNote(note: string): { health: number | null; defence: number | null } | null {
  const m = note.trim().match(/^(?:([+−-]\d+) Health\.)?\s*(?:([+−-]\d+) Defence\.)?$/);
  if (!m || (!m[1] && !m[2])) return null;
  const h = m[1] ? int(m[1].replace("−", "-")) : null, d = m[2] ? int(m[2].replace("−", "-")) : null;
  return focusNote(h, d) === note.trim() ? { health: h, defence: d } : null;
}

// ═══ EXTRA (NPC / monster / minion) ═════════════════════════════════════════
export type ExFocus = { stat: AceStat; name: string; dice: number | null };
export type ExStats = { smarts: number | null; moves: number | null; style: number | null; brawn: number | null; power: number | null };
/** One attack: dice pool (auto from a Stat + Focus, or typed), flat damage, range in feet, rider. */
export type AceAtkRow = { name: string; stat: AceStat | ""; focus: string; auto: boolean; dice: number | null; damage: number | null; range: number | null; special: string };
export type AceAttack = { name: string; dice: number | null; damage: number | null; note?: string };

const statVal = (st: ExStats, k: AceStat) => st[STAT_KEY[k]] ?? 0;
const findFocus = (focuses: ExFocus[], stat: string, name: string) => focuses.find((f) => f.stat === stat && f.name.toLowerCase() === name.toLowerCase());
/** Dice a Focus rolls: its printed total, else Stat + 2. */
export const focusDice = (st: ExStats, f: ExFocus) => f.dice ?? statVal(st, f.stat) + 2;
export const hasFocusLike = (focuses: ExFocus[], stat: AceStat, re: RegExp) => focuses.some((f) => f.stat === stat && re.test(f.name));
/** The dice an attack row rolls (auto rows follow the Stat / Focus). */
export function rowDice(r: AceAtkRow, st: ExStats, focuses: ExFocus[]): number | null {
  if (!r.auto || !r.stat) return r.dice;
  const f = r.focus ? findFocus(focuses, r.stat, r.focus) : undefined;
  return f ? focusDice(st, f) : statVal(st, r.stat);
}
export const deriveHealth = (type: string, st: ExStats, focuses: ExFocus[]) =>
  type === "Mook" ? 1 : (st.brawn ?? 0) + (hasFocusLike(focuses, "Brawn", /^tough/i) ? 2 : 0);
export const deriveDefence = (st: ExStats, focuses: ExFocus[]) => defenceOf(st.moves, hasFocusLike(focuses, "Moves", /^dodg/i));

export function composeNote(r: Pick<AceAtkRow, "range" | "special">): string {
  return [r.range ? `${r.range}' range` : "", r.special.trim()].filter(Boolean).join(", ");
}
export function composeAttack(r: AceAtkRow, st: ExStats, focuses: ExFocus[]): AceAttack {
  const a: AceAttack = { name: r.name.trim(), dice: rowDice(r, st, focuses), damage: r.damage };
  const note = composeNote(r);
  if (note) a.note = note;
  return a;
}
/** A book / legacy attack → a row. Picks the Stat (+Focus) whose dice match so the row stays in step. */
export function attackToRow(a: Record<string, unknown>, st: ExStats, focuses: ExFocus[]): AceAtkRow {
  const note = s(a.note);
  const m = note.match(/^(\d{1,4})' range(?:, ([\s\S]+))?$/);
  const range = m ? int(m[1]) : null, special = m ? (m[2] ?? "") : note;
  const dice = int(a.dice), damage = int(a.damage);
  const row: AceAtkRow = { name: s(a.name), stat: "", focus: "", auto: false, dice, damage, range, special };
  if (dice != null) {
    outer: for (const stat of ["Brawn", "Moves", "Power", "Smarts", "Style"] as AceStat[]) {
      const opts = ["", ...focuses.filter((f) => f.stat === stat).map((f) => f.name)];
      for (const fo of opts) {
        if (rowDice({ ...row, stat, focus: fo, auto: true }, st, focuses) === dice && (stat !== "Power" || st.power != null)) {
          if (statVal(st, stat) <= 0 && !fo) continue;
          Object.assign(row, { stat, focus: fo, auto: true });
          break outer;
        }
      }
    }
  }
  return row;
}
export const blankAtkRow = (d: Partial<AceAtkRow> = {}): AceAtkRow => ({ name: "", stat: "Brawn", focus: "", auto: true, dice: null, damage: 1, range: null, special: "", ...d });

/** Server: sanitise rows (clamps, trims, whitelists). */
export function cleanAtkRows(v: unknown): AceAtkRow[] {
  if (!Array.isArray(v)) return [];
  return v.slice(0, 20).map((raw) => {
    const o = (raw ?? {}) as Record<string, unknown>;
    const stat: AceStat | "" = isStat(o.stat) ? (s(o.stat) as AceStat) : "";
    return {
      name: s(o.name).slice(0, 60), stat, focus: s(o.focus).slice(0, 60), auto: !!stat && (o.auto === true || o.auto === "true"),
      dice: nInt(o.dice, 0, 30), damage: nInt(o.damage, 0, 20), range: nInt(o.range, 0, 999) || null, special: s(o.special).slice(0, 200),
    };
  }).filter((r) => r.name);
}
export function cleanFocuses(v: unknown): ExFocus[] {
  if (!Array.isArray(v)) return [];
  return v.slice(0, 20).map((raw) => {
    const f = (raw ?? {}) as Record<string, unknown>;
    return { stat: isStat(f.stat) ? (s(f.stat) as AceStat) : "Brawn", name: s(f.name).slice(0, 60), dice: nInt(f.dice, 0, 30) };
  }).filter((f) => f.name);
}
export const cleanStats = (o: Record<string, unknown>): ExStats => ({
  smarts: nInt(o.smarts, 0, 30), moves: nInt(o.moves, 0, 30), style: nInt(o.style, 0, 30), brawn: nInt(o.brawn, 0, 30), power: nInt(o.power, 0, 30),
});
