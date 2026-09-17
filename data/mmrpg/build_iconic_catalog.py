#!/usr/bin/env python3
"""Extract the Avengers Expansion 'Iconic Item Descriptions' + 'Battle Suits'
catalog (PDF pages 109-118) directly, rather than scraping items out of
character stat blocks. This is the authoritative list of iconic items.

Two-column layout: split at x=MID, read left column top-to-bottom then right.
Item titles are AptiferSlabLTPro-Bold at size ~10; field labels (Origin:,
Powers:, Restrictions:, Power Value:) are size ~8, so size disambiguates.
"""
import re, json, sys

MID = 310
# Each expansion that adopted the 'Iconic Item Descriptions' catalog (the
# renamed, expanded successor to the core book's 'Iconic Weapons'). Item type
# (Weapon / Armor / Item) is decided from each item's own content, so the page
# list is just the catalog span, battle suits included.
BOOKS = [
    dict(source='Avengers Expansion',
         pdf='/mnt/user-data/uploads/Marvel Multiverse RPG Avengers Expansion.pdf',
         pages=range(109, 119)),   # p109-118
    dict(source='Secret Wars',
         pdf='/mnt/user-data/uploads/Marvel Multiverse RPG Secret Wars.pdf',
         pages=range(167, 170)),   # p167-169
]


def _lines(words):
    """Group words into visual lines keyed by rounded top; return list of
    (top, [words]) sorted top-to-bottom, each word-list sorted left-to-right."""
    from collections import defaultdict
    buckets = defaultdict(list)
    for w in words:
        buckets[round(w['top'] / 3)].append(w)
    out = []
    for k in sorted(buckets):
        wl = sorted(buckets[k], key=lambda w: w['x0'])
        out.append((min(w['top'] for w in wl), wl))
    return out


def _is_title(wl):
    """A line is an item title if it's dominated by bold slab size ~10."""
    big = [w for w in wl if 'Bold' in w['fontname'] and 9.3 < w['size'] < 11 and 'Sans' not in w['fontname']]
    return len(big) >= 1 and len(big) >= len(wl) - 1


def _col_blocks(page):
    """Return [(title, body_text)] for one page, reading col0 then col1."""
    ws = page.extract_words(extra_attrs=['size', 'fontname'])
    blocks = []
    for col in (0, 1):
        cw = [w for w in ws if (w['x0'] < MID) == (col == 0)]
        # drop the running header band (top < 45) and page-number/section chrome
        cw = [w for w in cw if w['top'] > 45]
        lines = _lines(cw)
        cur_title = None
        cur_body = []
        for top, wl in lines:
            txt = ' '.join(w['text'] for w in wl)
            if _is_title(wl):
                if cur_title:
                    blocks.append((cur_title, ' '.join(cur_body)))
                cur_title = txt
                cur_body = []
            elif cur_title:
                cur_body.append(txt)
        if cur_title:
            blocks.append((cur_title, ' '.join(cur_body)))
    return blocks


def slug(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')


ABILITY_ORDER = ['Melee', 'Agility', 'Resilience', 'Vigilance', 'Ego', 'Logic']
RESTR_WORDS = {'Flashy', 'Large', 'Loud', 'Menacing', 'Awkward', 'Worn', 'Carried', 'Driven', 'Unkillable', 'Unmovable'}


def _clean_body(body):
    b = body
    # unmapped-glyph artifacts in the Secret Wars dump: (cid:1)/(cid:20) = 'ft'
    b = re.sub(r'\(cid:(?:1|20)\)', 'ft', b)
    b = re.sub(r'\(cid:\d+\)', '', b)
    # PDF watermark + page chrome
    b = re.sub(r'Michael Syrett \(Order #\d+\)', ' ', b)
    b = re.sub(r'\bArt by [^◆]*?(?=(Origin:|Powers:|Restrictions:|Power Value:|◆|$))', ' ', b)
    # vertical section band "/ 8 / N E W R U L E S" fragments bleeding in
    b = re.sub(r'/?\s*8\s*/?\s*(?:N\s*E\s*W\s*R\s*U\s*L\s*E\s*S)', ' ', b)
    b = re.sub(r'\bN\s+E\s+W\s+R\s+U\s+L\s+E\s+S\b', ' ', b)
    # a lone section-band letter can split a phrase, e.g. "Damage N Multiplier"
    b = re.sub(r'Damage\s+[NEWRULS]\s+Multiplier', 'Damage Multiplier', b)
    b = b.replace('◆', ' ◆ ')
    b = re.sub(r'\s+', ' ', b)
    # ligature repairs common in this font dump
    for a, c in [('eff ect', 'effect'), ('Eff ect', 'Effect'), ('fi ve', 'five'), ('fi re', 'fire'),
                 ('fl échettes', 'flechettes'), ('fi st', 'fist'), ('diff erent', 'different'),
                 ('fi ts', 'fits'), ('profi le', 'profile'), ('a˜ er', 'after'), ('fi ve', 'five'),
                 ('Hellfi re', 'Hellfire'), ('hellfi re', 'hellfire'), ('infl icts', 'inflicts'),
                 ('electrifi ed', 'electrified'), ('Silen', 'Silence')]:
        b = b.replace(a, c)
    return b.strip()


def _between(b, start, ends):
    m = re.search(re.escape(start), b)
    if not m:
        return ''
    tail = b[m.end():]
    cut = len(tail)
    for e in ends:
        mm = re.search(re.escape(e), tail)
        if mm:
            cut = min(cut, mm.start())
    return tail[:cut].strip()


def _powers(seg):
    """Split a ◆-bulleted region into individual power names, dropping the
    inline weapon stat and any Tony-Stark ability-score sidebar lines."""
    items = [p.strip() for p in seg.split('◆') if p.strip()]
    out = []
    for p in items:
        p = re.split(r'\bWhen worn by\b', p)[0].strip()
        if not p:
            continue
        if re.match(r'^(Weapon|Ranged Weapon|Melee Weapon)\b', p) or re.search(r'Multiplier|Bonus:|Range:\s*[A-Za-z0-9]', p):
            continue
        if re.match(r'^(%s)\s*:?\s*[-(\d]' % '|'.join(ABILITY_ORDER), p):
            continue  # ability-score sidebar line e.g. "Melee: 8 (+7)"
        # an access requirement ("Requires: Logic 2 or more") is kept whole
        if re.match(r'^Requires\b', p):
            out.append(re.split(r'\.\s', p)[0].strip()[:40])
            continue
        # a granted nested iconic item keeps its item name ("Iconic Item: Energy Whips")
        if re.match(r'^Iconic Item\b', p):
            out.append(re.split(r'\s*\(', p)[0].strip())
            continue
        # trim a trailing rules gloss ("Adamantium: Ignores…") to the name only
        name = re.split(r':\s', p)[0].strip()
        name = name.strip('/ ').rstrip(':').strip()
        # drop a trailing shatter/points parenthetical ("(20 points to shatter)")
        name = re.sub(r'\s*\(\d+\s*points[^)]*\)\s*$', '', name).strip()
        # strip a trailing section-band char/digit glued on (">6" rank or N/E/W…)
        name = re.sub(r'\s+([7-9]|\d{2,})$', '', name).strip()
        name = re.sub(r'\s+[NEWRULS]$', '', name).strip()
        if not name or name in {'/'} or re.fullmatch(r'\d+', name):
            continue
        # drop leaked sentence fragments: lowercase start or narrative openers
        if name[:1].islower():
            continue
        if re.match(r'^(Once|On a|On the|If |These |The |This |Unlike|When |Also|Their |They |Made |Craft)', name):
            continue
        if len(name) > 42:
            continue
        out.append(name)
    return out


def _weapon(body):
    if 'Weapon:' not in body and 'Damage Multiplier' not in body:
        return None
    rng = re.search(r'Range:\s*([A-Za-z0-9 /+]+?)(?:[,;]|\s+(?:Melee|Agility|Ego|Logic|Damage))', body)
    ab = re.search(r'\b(Melee|Agility|Ego|Logic)(?:/(Melee|Agility|Ego|Logic))?\s*Damage Multiplier', body)
    # bonus may be reordered ("Damage Multiplier Weapon: Bonus: +1") and the label
    # varies: Avengers "Multiplier Bonus: +2", Secret Wars "Multiplier: +2".
    bo = None
    dm = re.search(r'Damage\s*Multiplier', body)
    if dm:
        bo = re.search(r'(?:\s*(?:bonus|Bonus))?\s*:\s*([+\d/]+)', body[dm.end():])
    if not (rng or bo):
        return None
    w = {}
    if rng:
        w['range'] = rng.group(1).strip().rstrip(';,').strip()
    if ab:
        abs_ = [ab.group(1).lower()] + ([ab.group(2).lower()] if ab.group(2) else [])
        w['abilities'] = abs_
    if bo:
        w['bonus'] = bo.group(1).strip()
    return w


def _owner_from_name(name):
    m = re.match(r"^(.*?)['’]s\b", name)
    if m:
        return m.group(1).strip()
    return '—'


# Items whose in-book layout defeats a linear parse: the four Iron Man display
# suits (a 3-way interleaved powers / restrictions / worn-ability sidebar) and
# the two "See <other item>" cross-references. Curated straight from the PDF.
OVERRIDES = {
    'Hulkbuster Armor': dict(
        powers=['Summonable', 'Clobber', 'Crushing Grip', 'Elemental Barrage (Energy)', 'Elemental Barrier (Energy)',
                'Elemental Blast (Energy)', 'Elemental Burst (Energy)', 'Elemental Push (Energy)', 'Environmental Protection',
                'Flight 2', 'Immovable', 'Mighty 4', 'Salvation', 'Sturdy 4'],
        restrictions=['Large', 'Worn'],
        note='When worn by Tony Stark his rank increases to 6 (Melee 8, Agility 2, Resilience 9, Vigilance 4, Ego 5, Logic 5) and he gains the Big, Smash and Presence traits.'),
    'Iron Man’s Standard Armor': dict(
        powers=['Summonable', 'Elemental Barrage (Energy)', 'Elemental Barrier (Energy)', 'Elemental Blast (Energy)',
                'Elemental Burst (Energy)', 'Elemental Push (Energy)', 'Environmental Protection', 'Flight 2',
                'Mighty 1', 'Salvation', 'Sturdy 2'],
        restrictions=['Flashy', 'Worn'],
        note='When worn by Tony Stark his rank increases to 4 (Melee 3, Agility 4, Resilience 3, Vigilance 3, Ego 5, Logic 5).'),
    'Iron Man’s Model Nil Armor': dict(
        powers=['Summonable', 'Wallcrawling', 'Elemental Barrage (Energy)', 'Elemental Blast (Energy)',
                'Elemental Burst (Energy)', 'Environmental Protection', 'Flight 1', 'Illumination', 'Invisibility',
                'Mighty 1', 'Salvation', 'Silence Self', 'Sturdy 1'],
        restrictions=['Menacing', 'Worn'],
        note='When worn by Tony Stark his rank increases to 4 (Melee 2, Agility 4, Resilience 2, Vigilance 3, Ego 5, Logic 5).'),
    'Iron Man’s Mysterium Armor': dict(
        powers=['Accuracy 1', 'Elemental Barrage (Energy)', 'Elemental Barrier (Energy)', 'Elemental Blast (Energy)',
                'Elemental Burst (Energy)', 'Elemental Push (Energy)', 'Elemental Ricochet (Energy)', 'Environmental Protection',
                'Flight 2', 'Mighty 2', 'Mysterium', 'Salvation', 'Sturdy 3', 'Summonable', 'Supernova'],
        restrictions=['Flashy', 'Worn'],
        note='When worn by Tony Stark his rank increases to 5 (Melee 3, Agility 4, Resilience 6, Vigilance 4, Ego 5, Logic 5) and he gains the Fearless trait.'),
    'Thunderstrike': dict(origin='Mythic: Asgardian', type='Item', powers=[], restrictions=[],
        note='Functionally identical to Mjolnir in all but shape (see Mjolnir).'),
    'Stormbreaker': dict(origin='Mythic: Asgardian', type='Item', powers=[], restrictions=[],
        note='Functionally identical to Mjolnir in all but shape (see Mjolnir).'),
    'U.S.Agent’s Shield': dict(origin='Weird Science', type='Weapon', powers=['Shield 1', 'Stackable'], restrictions=['Carried', 'Flashy'],
        note='Functionally identical to Captain America’s Shield in all but coloration (see Captain America’s Shield).',
        range='Reach/10', ability='melee', multAbilities=['melee', 'agility'], damageBonus='+1', multBonus=1, pv=1),
    'Tormod': dict(origin='Mythic: Asgardian', type='Weapon',
        powers=['Adamantium (equivalent)', 'Elemental Barrage (Electricity)'],
        restrictions=['Can only be used by the wise', 'Carried'],
        range='Reach/5', ability='melee', multAbilities=['melee', 'agility'], damageBonus='+2', multBonus=2, pv=6),
    'Mjolnir (Earth-1610)': dict(origin='High-Tech', type='Weapon',
        powers=['Thunder', 'Control Weather 4', 'Elemental Barrage (Electricity)', 'Elemental Blast (Electricity)',
                'Elemental Burst (Electricity)', 'Elemental Push (Electricity)', 'Weather Chill', 'Weather Warm'],
        restrictions=['Carried', 'Flashy'],
        range='Reach/5', ability='melee', multAbilities=['melee', 'agility'], damageBonus='+1', multBonus=1, pv=11),
    'Nemesis’ Scell': dict(origin='Magic: Sorcery', type='Weapon',
        powers=['Blink', 'Flight 1', 'Leech Life', 'Mighty 2', 'Sturdy 2', 'Sacrifice', 'Teleport 2', 'Teleport Together'],
        restrictions=['Carried'],
        range='Reach', ability='melee', multAbilities=['melee', 'agility'], damageBonus='+2', multBonus=2, pv=9),
    'Night Nurse’s Gauntlet': dict(origin='High-Tech: Battle Suit', type='Item',
        powers=['Elemental Burst (Energy)', 'Summonable'], restrictions=['Carried'],
        note='Night Nurse is only borrowing the gauntlet, so there’s no need to change her origin.', pv=1),
    # Secret Wars — two-column power lists that defeat a linear read.
    'Nega-Bands': dict(origin='Weird Science', type='Item',
        powers=['Allspeak', 'Attunable', 'Cosmic Awareness', 'Elemental Blast (Energy)', 'Elemental Burst (Energy)',
                'Elemental Grab (Energy)', 'Elemental Protection 3 (Energy)', 'Elemental Sphere (Energy)', 'Entangled',
                'Environmental Protection', 'Flight 2', 'Healing Factor', 'Illumination', 'Mighty 3', 'Postcognition 1',
                'Precognition 1', 'Sturdy 2', 'Supernova (Energy)', 'Warp Portal'],
        restrictions=['Flashy', 'Paired Item', 'Worn'], pv=22),
    'Starbrand': dict(origin='Weird Science', type='Item',
        powers=['Ground-Shaking Stomp', 'Heightened Senses 2', 'Illumination', 'Accuracy 4', 'Clobber', 'Immovable',
                'Discipline 3', 'Mighty 4', 'Disguise', 'Smash', 'Sturdy 3', 'Elemental Barrage (Energy)',
                'Supernova (Energy)', 'Unrelenting Smash', 'Elemental Blast (Energy)', 'Elemental Burst (Energy)',
                'Elemental Push (Energy)', 'Environmental Protection', 'Flight 2'],
        restrictions=['Flashy'], pv=30),
    # Avengers — two-column power/restriction lists that defeat a linear read.
    'Mjolnir': dict(origin='Mythic: Asgardian', type='Weapon',
        powers=['Summon Portal', 'Asgardian Transformation', 'Summonable', 'Control Fog', 'Thunder', 'Control Weather 4',
                'Uru', 'Discipline 1', 'Elemental Barrage (Electricity)', 'Elemental Blast (Electricity)',
                'Elemental Burst (Electricity)', 'Elemental Push (Electricity)', 'Elemental Ricochet (Electricity)'],
        restrictions=['Can only be used by the worthy', 'Carried', 'Flashy'],
        range='Reach/Unlimited', ability='melee', multAbilities=['melee', 'agility'], damageBonus='+1', multBonus=1, pv=22,
        note='Adds the Summon Portal power to the wielder even when they are not holding the hammer.'),
    'Doctor Octopus’ Ocktoid Tentacles': dict(origin='High-Tech', type='Item',
        powers=['Psychic Link', 'Additional Limbs', 'Quick-Toss', 'Salvation', 'Banging Heads', 'Clobber',
                'Spider-Dodge', 'Crushing Grip', 'Wallcrawling', 'Extended Reach', 'Jump 1', 'Mighty 2'],
        restrictions=['Flashy'], pv=12),
}


def parse_item(title, body, source):
    name = re.sub(r'\s+', ' ', title).strip()
    b = _clean_body(body)
    origin = _between(b, 'Origin:', ['Powers:', 'Restrictions:', 'Power Value:', 'Note:', 'Tags:'])
    origin = re.sub(r'◆.*$', '', origin).strip()  # strip any glued power
    if re.match(r'High-Tech:\s*Battle\s*$', origin) or origin == 'High-Tech: Battle':
        origin = 'High-Tech: Battle Suit'
    powers_seg = _between(b, 'Powers:', ['Restrictions:', 'Power Value:', 'Note:', 'Tags:'])
    powers = _powers(powers_seg)
    restr_seg = _between(b, 'Restrictions:', ['Power Value:', 'Note:', 'Tags:', 'Art by'])
    restrictions = [r for r in _powers(restr_seg)]
    # power value: ignore nested "(... Power Value: N)"
    pv_body = re.sub(r'\([^()]*Power Value:\s*\d+[^()]*\)', ' ', b)
    pvm = re.findall(r'Power Value:\s*(\d+)', pv_body)
    pv = int(pvm[-1]) if pvm else None
    weap = _weapon(b)
    note = _between(b, 'Note:', ['Art by'])
    ov = OVERRIDES.get(name)
    if ov:
        if 'origin' in ov:
            origin = ov['origin']
        if 'powers' in ov:
            powers = ov['powers']
        if 'restrictions' in ov:
            restrictions = ov['restrictions']
        if 'note' in ov:
            note = ov['note']
        if 'pv' in ov:
            pv = ov['pv']
        if ov.get('range'):
            weap = {'range': ov['range'], 'abilities': ov.get('multAbilities', [ov.get('ability', 'melee')]),
                    'bonus': ov.get('damageBonus', '')}
    if ov and ov.get('type'):
        typ = ov['type']
    elif 'Battle Suit' in origin:
        typ = 'Armor'
    elif weap:
        typ = 'Weapon'
    elif re.search(r'\b(Armor|Suit)\b', name):
        typ = 'Armor'
    else:
        typ = 'Item'
    # Origin / granted powers / power value are structured fields rendered on
    # their own; `special` keeps only the restrictions and any rules note.
    special_bits = []
    if restrictions:
        special_bits.append('Restrictions: ' + ', '.join(restrictions))
    if note:
        special_bits.append('Note: ' + note)
    rec = {
        'name': name, 'tier': 'Iconic', 'type': typ, 'category': typ,
        'owner': _owner_from_name(name), 'source': source, 'notes': '',
        'special': '; '.join(special_bits),
    }
    if origin:
        rec['grantsOrigin'] = origin
    if powers:
        rec['grantsPowers'] = ', '.join(powers)
    if weap:
        rec['ability'] = (weap.get('abilities') or ['melee'])[0]
        if weap.get('abilities') and len(weap['abilities']) > 1:
            rec['multAbilities'] = weap['abilities']
        rng = weap.get('range', 'Reach')
        rec['range'] = rng + (' spaces' if re.fullmatch(r'\d+', rng or '') else '')
        b_ = weap.get('bonus', '')
        rec['damageBonus'] = b_ or '—'
        mb = re.search(r'\d+', b_ or '')
        rec['multBonus'] = int(mb.group()) if mb else 0
    if pv is not None:
        rec['powerValue'] = pv
    return rec


def extract():
    import pdfplumber
    out = []
    for bk in BOOKS:
        pdf = pdfplumber.open(bk['pdf'])
        for i in bk['pages']:
            for title, body in _col_blocks(pdf.pages[i]):
                out.append(parse_item(title, body, bk['source']))
    return out


if __name__ == '__main__':
    items = extract()
    if len(sys.argv) > 1 and sys.argv[1] == '--json':
        json.dump(items, open('/tmp/av_catalog.json', 'w'), ensure_ascii=False, indent=1)
        print('wrote', len(items), 'items to /tmp/av_catalog.json')
    else:
        for it in items:
            print('•', it['name'], '|', it['type'], '| PV', it.get('powerValue'),
                  '| own', it['owner'], '|', it.get('grantsOrigin', ''))
            print('     grants:', it.get('grantsPowers', '')[:120])
            if it['type'] == 'Weapon':
                print('     wpn: range', it.get('range'), 'ab', it.get('ability'), 'dmg', it.get('damageBonus'))
        print('TOTAL', len(items))
