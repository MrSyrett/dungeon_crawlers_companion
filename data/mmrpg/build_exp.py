"""Generalised character extractor for the Marvel Multiverse RPG *expansion* PDFs
(X-Men, Spider-Verse, Avengers, Secret Wars). Those books use a display font that
breaks pdftotext/pdfplumber word detection, so we reconstruct words from real
space glyphs (exp_words) and feed them to build_characters.parse_page. Two things
differ from the core/supplement layout and are handled here:
  * the RANK / POWERS banners are graphics (not text), so rank is read from the
    big top-centre digit and the POWERS region is found from the set headers;
  * power bullets are glued to their name ("◆Evasion"), so columns are detected
    from ◆-prefixed word x-positions.
Reuses build_xmen97's iconic/signature transform + power-name cleaning.
"""
import re, json, sys, unicodedata
sys.path.insert(0, 'data/mmrpg')
import exp_words as EW
import build_characters as BC
import build_xmen97 as X

def slug(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode()
    return re.sub(r'-+', '-', re.sub(r'[^a-z0-9]+', '-', s.lower())).strip('-')

try:
    from wordfreq import zipf_frequency as _zf
except Exception:                                    # pragma: no cover
    _zf = lambda w, l: 0.0
def _zfk(w):
    return _zf(w.lower(), 'en') >= 2.5               # a real-ish word (merge target)
def _zfreal(w):
    return len(w) >= 2 and _zf(w.lower(), 'en') >= 4.2   # a common standalone word

def _rank(W):
    # 1) an explicit rank digit in the rank box (centre-top). Some pages render it
    #    as a graphic instead, so fall back to the damage multiplier.
    cand = [w for w in W if re.fullmatch(r'\d', w['text']) and 60 < w['top'] < 110 and 288 < w['x0'] < 350 and w.get('size', 0) >= 15]
    if cand:
        cand.sort(key=lambda w: -w.get('size', 0))
        return int(cand[0]['text'])
    # 2) fallback: the base damage multiplier (rank) is the smallest of the four
    #    multiplier cells (left grid, x≈90-110); power/weapon bonuses only add.
    mults = [int(w['text']) for w in W if re.fullmatch(r'\d+', w['text']) and 86 < w['x0'] < 114 and 560 < w['top'] < 720]
    if mults:
        return max(1, min(6, min(mults)))
    return None

def _load_names(part):
    try: return [d['name'] for d in json.load(open('data/mmrpg/parts/%s.json' % part))]
    except Exception: return []
_TRAITS = _load_names('traits'); _TAGS = _load_names('tags'); _POWERS = _load_names('powers')
def _canon(name, names):
    # repair display-font letter-spacing / ligatures by matching the space-stripped
    # form against a known name list (e.g. "Combat R e fle x e s" -> "Combat Reflexes").
    key = re.sub(r'\s+', '', name).lower()
    if not key: return name
    for n in names:
        if re.sub(r'\s+', '', n).lower() == key: return n
    return re.sub(r'\s{2,}', ' ', name).strip()

def _clean_tt(lst, names):
    out = []
    for t in lst or []:
        t = re.sub(r'\s*PO\s*WERS?\s*$', '', t).strip()
        t = re.sub(r'\s*POWER\s*S?\s*$', '', t).strip()
        if not t or re.fullmatch(r'PO ?WERS?', t): continue
        # canonicalize the bare name; keep any "(parenthetical)" suffix as-is
        m = re.match(r'^(.*?)(\s*\(.*\))?$', t)
        base, paren = m.group(1).strip(), (m.group(2) or '')
        out.append((_canon(base, names) + paren).strip())
    return out

def _name(page):
    """Rebuild the all-caps character title. Word boundaries in this font are pure
    letter GAPS (no space glyph): measured across all four books, intra-word gaps
    stay <=2.0 while word boundaries are >=3.1, so we split at a ~2.6 gap. Bold
    titles are over-printed (each glyph drawn 2-3x), so we de-dupe first. The
    right-aligned rank number sits after a big (>14) gap and is dropped; a
    parenthetical like "(BUCKY BARNES)" is kept."""
    ch = [c for c in page.chars if 44 <= c['top'] <= 82 and c.get('size', 0) >= 15
          and c['x0'] < 430 and c['text'].strip() and c.get('upright', True)]
    if not ch:
        return None
    ch.sort(key=lambda c: c['x0'])
    # de-dupe over-printed bold glyphs (same char at ~same x)
    dd = []
    for c in ch:
        if dd and c['text'] == dd[-1]['text'] and abs(c['x0'] - dd[-1]['x0']) < max(1.2, (dd[-1]['x1'] - dd[-1]['x0']) * 0.6):
            continue
        dd.append(c)
    ch = dd
    # cut the right-aligned rank number: a big gap (>14) before a run of digits
    keep = [ch[0]]
    for i in range(1, len(ch)):
        gap = ch[i]['x0'] - ch[i - 1]['x1']
        if gap > 14 and ch[i]['text'].isdigit():
            break
        keep.append(ch[i])
    ch = keep
    # Title fonts differ by page type: the X-Men character pages use WIDE tracking
    # (intra-letter gaps ~5, word gaps ~9); the other books use TIGHT tracking
    # (intra ~0.5, word ~4). Detect which from the median letter gap and pick the
    # word-break threshold accordingly.
    gaps = [ch[i]['x0'] - ch[i - 1]['x1'] for i in range(1, len(ch))]
    # font detector: the TIGHT title font has mostly sub-1.0 intra gaps (median ~0.5)
    # with word gaps ~4; the WIDE X-Men-character font has intra gaps ~5 (median ~5)
    # with word gaps ~9. Use the median of ALL gaps to tell them apart.
    srt = sorted(gaps)
    med = srt[len(srt) // 2] if srt else 0
    wide = med > 3.0
    GAP = 7.5 if wide else 2.6
    words, cur = [], [ch[0]]
    for i in range(1, len(ch)):
        gap = ch[i]['x0'] - ch[i - 1]['x1']
        joinhyphen = ch[i]['text'] == '-' or ch[i - 1]['text'] == '-'
        if gap > GAP and not joinhyphen:
            words.append(''.join(c['text'] for c in cur)); cur = [ch[i]]
        else:
            cur.append(ch[i])
    words.append(''.join(c['text'] for c in cur))
    # Wide font: M/W carry extra leading space so words split mid-glyph
    # ("CHAMBER"->"CHA MBER", "DARWIN"->"DAR WIN"). Re-merge a split when the join
    # is a known word and the two fragments are NOT both real standalone words
    # (so "OLD MAN", "IRON MAN", "SCARLET WITCH" stay two words).
    if wide and len(words) > 1:
        merged = []
        for w in words:
            single = len(w) == 1 and w.isalpha()          # stray split letter ("GREYCRO W")
            combo = (merged[-1] + w) if merged else ''
            z = _zf(combo.lower(), 'en') if combo else 0
            do = single or (z >= 2.0 and not (_zfreal(merged[-1]) and _zfreal(w))) or z >= 3.0
            if merged and w and do:
                merged[-1] = combo
            else:
                merged.append(w)
        words = merged
    name = ' '.join(w for w in words if w.strip()).strip()
    name = re.sub(r'\s{2,}', ' ', name).strip()
    # a stray rank digit that landed inside a word ("HUDSO4N" -> "HUDSON")
    name = re.sub(r'(?<=[A-Z])\d(?=[A-Z])', '', name)
    # reformat a trailing reality designation "NAME EARTH 295" -> "NAME (Earth-295)"
    name = re.sub(r'\s+EARTH[\s-]*(\d[\d-]*)$', r' (Earth-\1)', name)
    # tidy spacing around parenthesis/hyphen
    name = re.sub(r'\(\s+', '(', name).replace(' )', ')')
    name = _NAME_OVERRIDES.get(name, name)
    return name or None

# a few wide-font titles the gap splitter can't resolve (wrong-position split at an
# M/W, or a proper noun wordfreq doesn't know) — corrected by hand.
_NAME_OVERRIDES = {
    'KIDO MEGA': 'KID OMEGA',
    'FANTO MEX': 'FANTOMEX',
    'OLD MANLOGAN (Earth-214923)': 'OLD MAN LOGAN (Earth-214923)',
    'FANG AKIHIRO': 'FANG (AKIHIRO)',
}

def _powers_region_top(W):
    cand = [w for w in W if 200 <= w['x0'] <= 490 and (w['text'] == 'Basic' or BC.is_set_header(w['text']))]
    cand = [w for w in cand if w['top'] > 250]
    return (min(w['top'] for w in cand) - 3) if cand else None

def powers_exp(W):
    ytop = _powers_region_top(W)
    if ytop is None: return None
    foot = 10**9
    bw = [w for w in W if w['top'] >= ytop and w['text'].startswith('◆')]
    if not bw: return None
    xs = sorted(w['x0'] for w in bw)
    cols = []
    for x in xs:
        if not cols or x - cols[-1][-1] > 45: cols.append([x])
        else: cols[-1].append(x)
    cen = [sum(c) / len(c) for c in cols]
    COLS = []
    for i in range(len(cen)):
        left = cen[i] - 14
        right = (cen[i + 1] - 14) if i + 1 < len(cen) else 560
        COLS.append((left, right))
    def col_lines(x0, x1):
        ws = [w for w in W if x0 <= w['x0'] < x1 and ytop < w['top'] < ytop + 260]
        ws.sort(key=lambda w: (round(w['top'] / 4), w['x0']))
        lines, cy, cur = [], None, None
        for w in ws:
            if cy is None or abs(w['top'] - cy) > 4: cur = []; lines.append(cur); cy = w['top']
            cur.append(w)
        return [BC.clean(' '.join(x['text'] for x in l)) for l in lines if l]
    groups = []
    for x0, x1 in COLS:
        for ln in col_lines(x0, x1):
            ln = re.sub(r'\s*©\s*20\d\d.*$', '', ln).strip()
            if not ln or ln in ('Powers',) or re.fullmatch(r'\d+', ln): continue
            if re.search(r'Michael Syrett|Order #', ln): continue
            if '◆' not in ln and (BC.is_set_header(ln) or BC.is_set_header(re.sub(r's$', '', ln))):
                groups.append({'set': ln, 'names': []}); continue
            segs = ln.split('◆')
            head = segs[0].strip()
            if head:
                if groups and groups[-1]['names']: groups[-1]['names'][-1] = (groups[-1]['names'][-1] + ' ' + head).strip()
                elif groups: groups[-1]['set'] = (groups[-1]['set'] + ' ' + head).strip()
            for s in segs[1:]:
                if not s.strip(): continue
                if not groups: groups.append({'set': '', 'names': []})
                groups[-1]['names'].append(s.strip())
    for g in groups:
        g['names'] = [re.sub(r'\s+is$', '', n).strip() for n in g['names']]
    return [g for g in groups if g['names']]

def parse_exp_page(page):
    W = EW.words(page)
    # need the six ability labels to consider this a stat block
    if sum(1 for w in W if w['text'] in BC.LABELS) < 6:
        return None
    # synthesize a POWERS header so parse_page bounds traits/tags correctly
    pt = _powers_region_top(W)
    if pt is not None:
        W = W + [{'text': 'POWERS', 'x0': 205.0, 'x1': 250.0, 'top': pt, 'bottom': pt + 10, 'size': 13}]
    r = BC.parse_page(page, W=W)
    if not r: return None
    nm = _name(page)
    if nm: r['name'] = nm
    r['rank'] = _rank(W) or r.get('rank') or 1
    r['traits'] = _clean_tt(r.get('traits'), _TRAITS)
    r['tags'] = _clean_tt(r.get('tags'), _TAGS)
    if r.get('origin'): r['origin'] = re.split(r'\s+Teams?:', r['origin'])[0].strip()
    p3 = powers_exp(W)
    if p3:
        for g in p3:
            g['names'] = [(_canon(re.match(r'^(.*?)(\s*\[.*)?$', n).group(1).strip(), _POWERS) + (re.match(r'^(.*?)(\s*\[.*)?$', n).group(2) or '')).strip() for n in g['names']]
        r['powers'] = p3
    return r

_WEAPON_KW = re.compile(r'\b(shield|blade|glaive|spear|axe|hammer|bite|claws?|bolts?|'
                        r'staff|sword|quiver|gun|whip|mjolnir|bloodaxe|stormbreaker|'
                        r'chain|dagger|lance|mace|bow|club|knuckles|katana|ring|rings)\b', re.I)
_RESTR = re.compile(r'\b(Worn|Carried|Concealed|Flashy|Large|Reduced Focus|Stackable|'
                    r'Alternate Form|Summonable|Returns When Thrown|Unkillable)\b')

def _titlecase(nm):
    # Title-case an ALL-CAPS name, capitalising each alphabetic run (so
    # "(EARTH-1610)" -> "(Earth-1610)", "MAR-VELL" -> "Mar-Vell"); keep lone-cap
    # words already mixed-case untouched.
    if not nm.isupper():
        return nm
    return re.sub(r'[A-Za-z]+', lambda m: m.group(0)[:1].upper() + m.group(0)[1:].lower(), nm)

_SMALL = {'of', 'the', 'a', 'an', 'and', 'or', 'to', 'in', 'with', 'for'}
def _clean_item_name(nm):
    """Iconic item names come through in mixed case ("Techno- organic wings"); tidy
    the hyphen spacing and Title-Case them for consistency with the core gear list."""
    nm = re.sub(r'\s*-\s*', '-', nm).strip()          # "Techno- organic" -> "Techno-organic"
    nm = re.sub(r'\s{2,}', ' ', nm)
    def cap(w, first):
        if w.isupper() and len(w) > 1:
            return w                                   # keep acronyms (CIWS, ISO-8)
        lw = w.lower()
        if lw in _SMALL and not first:
            return lw
        return '-'.join(p[:1].upper() + p[1:] if p else p for p in w.split('-'))
    parts = nm.split()
    return ' '.join(cap(w, i == 0) for i, w in enumerate(parts))

# ── auto iconic gear: pull the character's Iconic Item / Iconic Weapon / Armor /
# Battle Suit out of their power block into a full equipment entry (name, owner,
# type, range, damage bonus, restrictions, power value), and attach it. Handles
# the three stat-block forms: "Iconic Item: <name>", "Iconic Weapon: <name>", and
# "<Owner>'s Armor|Battle Suit Powers:". Returns the equipment dict (or None).
def extract_iconic(rec, source):
    flat = ' | '.join(n for g in rec.get('powers', []) for n in g.get('names', []))
    flat = re.sub(r'\bEff ect\b', 'Effect', flat)
    name = None; typ = 'Item'; inline_eff = ''; body_mult = 0; body_abils = []
    m = re.search(r"Iconic (Item|Weapon):\s*([^|]+?)\s*(?:\||$)", flat)
    if m:
        typ = 'Weapon' if m.group(1) == 'Weapon' else 'Item'
        body = m.group(2).strip()
        name = re.split(r'\s*[\(\[]', body, 1)[0].strip().rstrip('.').strip()
        pe = re.search(r'[\(\[](.+)[\)\]]', body)
        if pe:
            inline_eff = pe.group(1).strip()
            for mm in re.finditer(r'\+(\d+)\s+(?:to (?:their )?)?([A-Za-z]+)?\s*(?:Ego|Melee|Agility|Logic)?\s*damage multiplier', body):
                body_mult = max(body_mult, int(mm.group(1)))
            for ab in re.findall(r'\b(Melee|Agility|Ego|Logic)\b', body):
                body_abils.append(ab.lower())
    else:
        a = re.search(r"['’]s (Armor|Battle Suit) Powers:", flat)
        if a:
            # name the armour/suit after the character (owner), not the glued prefix;
            # keep any (variant) so different suits of one hero stay distinct.
            name = "%s’s %s" % (_titlecase(rec['name']).strip(), a.group(1))
            typ = 'Armor'
    if not name or len(name) < 2 or len(name) > 60:
        return None

    # weapon stat line: "Weapon: Range: <R>, Melee/Agility Damage Multiplier bonus: +N/+N"
    rng = ''; abils = []; mult = 0
    ws = re.search(r"Weapon:\s*Range:\s*([^,|]+),\s*([A-Za-z/ ]+?)\s*Damage\s*Multiplier bonus:\s*([+\d/ ]+)", flat)
    if ws:
        if typ == 'Item':
            typ = 'Weapon'
        rng = re.sub(r'\s*/\s*', '/', re.sub(r'\+\s+', '+', re.sub(r'\s+', ' ', ws.group(1)))).strip()
        for ab in re.findall(r'[A-Za-z]+', ws.group(2)):
            if ab.lower() in ('melee', 'agility', 'ego', 'logic'):
                abils.append(ab.lower())
        nums = [int(x) for x in re.findall(r'\d+', ws.group(3))]
        if nums:
            mult = max(nums)
    mult = max(mult, body_mult)
    if not abils and body_abils:
        abils = body_abils
    # type by name keyword if still generic
    if typ == 'Item' and _WEAPON_KW.search(name):
        typ = 'Weapon'
    if re.search(r'\b(armor|battle suit|suit)\b', name, re.I):
        typ = 'Armor'

    # restrictions & power value
    restr = []
    rs = re.search(r"Restrictions?:\s*(.+?)(?:Power Value:|$)", flat)
    if rs:
        restr = list(dict.fromkeys(_RESTR.findall(rs.group(1))))
    req = re.search(r"Requires?:\s*([^|]+?)(?:\s*Power Value:|\s*\||$)", flat)
    pv = re.search(r"Power Value:\s*(\d+)", flat)

    special_bits = []
    if inline_eff: special_bits.append(inline_eff)
    if restr: special_bits.append('Restrictions: ' + ', '.join(restr))
    if req: special_bits.append('Requires: ' + req.group(1).strip())
    if pv: special_bits.append('Power Value: ' + pv.group(1))
    # a short inline effect e.g. "Shield 2 (Shield 3 with Iconic Item)"
    eff = re.search(r"([A-Za-z][\w ]{0,24}\([^()|]*?with Iconic Item\))", flat)
    if eff: special_bits.insert(0, eff.group(1).strip())

    name = _clean_item_name(name)
    item = {'name': name, 'tier': 'Iconic', 'type': typ, 'category': typ,
            'owner': _titlecase(rec['name']), 'source': source,
            'notes': '', 'special': '; '.join(special_bits)}
    if typ == 'Weapon':
        item['ability'] = abils[0] if abils else 'melee'
        item['range'] = rng or 'Reach'
        item['damageBonus'] = ('+%d' % mult) if mult else '—'
        item['multBonus'] = mult
        if len(abils) > 1:
            item['multAbilities'] = sorted(set(abils))
    if pv:
        item['powerValue'] = int(pv.group(1))

    rec['equipment'] = [name]
    rec['powers'] = _clean_power_block(rec.get('powers', []))
    return item

# strip the iconic-item metadata noise out of a character's visible power list
_META = re.compile(r"^(?:Iconic (?:Item|Weapon):|Weapon:\s*Range:|Restrictions?:|"
                   r"Requires?:|Use:|Power Value:|Eff?ect Options)|"
                   r"['’]s (?:Armor|Battle Suit|Ball .*|Shield|Claws?|.*) Powers:$|"
                   r"\bPowers:$", re.I)
def _clean_power_block(groups):
    out = []
    for g in groups:
        names = []
        for n in g.get('names', []):
            n2 = re.sub(r"\s*Iconic (Item|Weapon):.*$", '', n).strip()
            n2 = re.sub(r"\s*[A-Z][\w'’.&-]*(?:\s+[\w'’.&-]+)*['’]s (?:Armor|Battle Suit|[\w'’.& -]+) Powers:.*$", '', n2).strip()
            n2 = re.sub(r"\s*Restrictions?:.*$", '', n2).strip()
            n2 = re.sub(r"\s*Power Value:.*$", '', n2).strip()
            n2 = re.sub(r"\s*Weapon:\s*Range:.*$", '', n2).strip()
            if not n2 or _META.match(n2):
                continue
            if n2 not in names:
                names.append(n2)
        if names:
            out.append({'set': g.get('set', ''), 'names': names})
    seen = set(); merged = []
    for g in out:
        k = (g['set'], tuple(g['names']))
        if k in seen: continue
        seen.add(k); merged.append(g)
    return merged

def build_book(pdf_path, source, pmin=0, pmax=None):
    import pdfplumber
    out = []; icons = {}
    with pdfplumber.open(pdf_path) as pdf:
        hi = pmax if pmax is not None else len(pdf.pages)
        for idx in range(pmin, min(hi, len(pdf.pages))):
            r = parse_exp_page(pdf.pages[idx])
            if not r or not r.get('name'): continue
            if len(r['name']) < 2 or len(r['name']) > 40: continue
            r['genre'] = 'core'; r['source'] = source
            it = extract_iconic(r, source)
            if it and it['name'] and it['name'] not in icons:
                icons[it['name']] = it
            out.append(r)
    # ids (disambiguate duplicate codenames by realName), slugged + source suffix
    sfx = '-' + slug(source)
    seen = {}
    for r in out:
        base = slug(r['name'])
        rid = base + sfx
        if rid in seen:
            rid = base + '-' + slug(r.get('realName') or str(seen.get(base, 0))) + sfx
        seen[rid] = seen.get(rid, 0) + 1
        r['id'] = rid
    return out, list(icons.values())
