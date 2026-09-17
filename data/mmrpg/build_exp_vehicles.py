"""Extract vehicle profiles + the Basic Vehicles table from the expansion PDFs into
data/mmrpg/parts/vehicles.json (a new data type).

Named-profile stat block layout (per vehicle): a size-16 NAME, big Health / Damage
Reduction numbers, then labelled scalars (Flight/Ground/Swim Speed:, Size:,
Passengers:), a PROFILE prose blurb, and POWERS/NOTES/WEAPONS bullet columns. The
POWERS and NOTES columns are printed glued as "◆<power>◆<note>", so each bullet
line splits on ◆ into [power, note]."""
import sys, re, json
sys.path.insert(0, 'data/mmrpg')
import pdfplumber
import expprose as XP
import build_exp_sections as S
import build_exp_powers as P

PARTS = 'data/mmrpg/parts/'

# book -> page range to scan for vehicle profiles
PAGES = {
    'X-Men Expansion':        (137, 139),
    'Spider-Verse Expansion': (133, 134),
    'Avengers Expansion':     (139, 141),
    'Secret Wars':            (180, 182),
}
BASIC_PAGE = {   # page holding the "Basic Vehicles" table
    'X-Men Expansion': 137, 'Spider-Verse Expansion': 132,
    'Avengers Expansion': 138, 'Secret Wars': 180,
}
SIZES = ['Gigantic', 'Huge', 'Big', 'Average', 'Small', 'Tiny']

def norm(n): return re.sub(r'\s+', ' ', n).strip().lower()

def clean(t):
    t = re.sub(r'\bMarvel\b', ' ', t)
    t = re.sub(r'(?<=[a-z])\d{1,4}$', '', t)      # trailing page-number footer glued on
    return re.sub(r'\s+', ' ', t).strip()

def profile_blocks(pdf, idx):
    """Split a page's single-column lines into vehicle blocks keyed by size-16 names."""
    lines = [ln for ln in XP.read_columns(pdf.pages[idx], ncols=1, gutters=[])[0] if not S.is_footer(ln.text)]
    blocks = []
    cur = None
    STAT = re.compile(r'REDUCTION|HEALTH|DAMAGE|SPEED|SIZE|PASSENGER|PROFILE|POWERS|NOTES|WEAPON|VEHICLE')
    for ln in lines:
        nm = re.sub(r'\s+', ' ', ln.text).strip()
        if (ln.size >= 15.0 and nm and re.search(r'[A-Za-z]', nm)
                and not re.search(r'\d', nm) and not STAT.search(nm.upper())
                and len(nm.split()) <= 5):
            is_banner = (nm.upper() == nm) or (len(nm) <= 30 and nm[:1].isupper())
            if is_banner:
                if cur: blocks.append(cur)
                cur = {'name': _title(nm), 'lines': []}
                continue
        if cur is not None:
            cur['lines'].append(ln)
    if cur: blocks.append(cur)
    return blocks

def _title(nm):
    # "BLACKBIRD" -> "Blackbird"; keep acronyms (S.H.I.E.L.D., E.V.A., MK), roman
    # numerals and hyphenated parts readable; Title-case inside parentheses.
    def cap_word(w):
        if '.' in w and re.fullmatch(r'(?:[A-Z]\.)+[A-Z]?\.?', w):
            return w                                   # S.H.I.E.L.D., E.V.A.
        if re.fullmatch(r'M[Kk]\.?|[IVXLC]{1,4}|CIWS|VTOL', w):
            return w.upper() if w.upper() in ('MK', 'CIWS', 'VTOL') else w
        return '-'.join(p.capitalize() for p in w.split('-'))
    out = ' '.join(cap_word(w) for w in nm.split())
    # Title-case a trailing "(classic)" / "(modern)" style parenthetical
    out = re.sub(r'\(([a-z])', lambda m: '(' + m.group(1).upper(), out)
    return out

def parse_block(name, lines):
    text_all = ' '.join(l.text for l in lines)
    v = {'name': name, 'size': '', 'speed': '', 'health': '', 'damageReduction': '',
         'passengers': '', 'description': '', 'powers': '', 'notes': '', 'weapons': ''}
    # speed type from any line's label; speed VALUE only if it sits on the same
    # physical line as the label (X-Men). Otherwise it comes from the big-number line.
    stype = ''
    for l in lines:
        lm = re.search(r'(Flight|Ground|Swim|Water|Air)\s*Speed:\s*([0-9,]*)', l.text)
        if lm:
            stype = lm.group(1)
            if lm.group(2):
                v['speed'] = '%s Speed: %s' % (stype, lm.group(2))
            break
    m = re.search(r'Size:\s*([A-Za-z]+)', text_all)
    if m: v['size'] = m.group(1)
    m = re.search(r'Passengers:\s*([0-9,]+\+?)', text_all)
    if m: v['passengers'] = m.group(1)
    # health / speed come from the big (size>=17) number line(s). A line "200 36"
    # is health then speed; a lone "200" is health, speed from the Speed: label.
    for l in lines:
        if l.size >= 17:
            two = re.match(r'\s*([0-9][0-9,]{1,5})\s+([0-9][0-9,]{1,5})\s*$', l.text)
            if two:
                if not v['health']: v['health'] = two.group(1)
                if 'Speed:' not in v['speed']:
                    v['speed'] = ('%s Speed: %s' % (stype, two.group(2))) if stype else two.group(2)
            else:
                hm = re.match(r'\s*([0-9][0-9,]{1,5})', l.text)
                if hm and not v['health']:
                    v['health'] = hm.group(1)
            dm = re.search(r'(-\d(?:/-?\d)?|—|–)', l.text)
            if dm and not v['damageReduction']:
                v['damageReduction'] = dm.group(1)
    # sections: PROFILE prose, POWERS/NOTES bullets, WEAPONS bullets
    section = None
    powers, notes, weapons, desc = [], [], [], []
    for l in lines:
        t = l.text.strip()
        head = re.sub(r'[^A-Z]', '', t.upper())
        if l.size >= 12.5 and 'PROFILE' in t.upper(): section = 'profile'; continue
        if l.size >= 12.5 and 'WEAPON' in t.upper(): section = 'weapons'; continue
        if l.size >= 12.5 and ('POWERS' in t.upper() or 'NOTES' in t.upper()): section = 'pn'; continue
        if not t: continue
        if section == 'profile':
            # profile prose stops when bullets start
            if t.startswith('◆'): section = 'pn'
            else:
                desc.append(re.sub(r'(Flight|Ground|Swim).*Speed:.*$', '', t)); continue
        if section == 'pn':
            if '◆' in t:
                segs = [s.strip() for s in t.split('◆') if s.strip()]
                if segs: powers.append(segs[0])
                if len(segs) > 1: notes.append(' '.join(segs[1:]))
            elif powers:
                powers[-1] = (powers[-1] + ' ' + t).strip()
        elif section == 'weapons':
            if '◆' in t:
                for s in t.split('◆'):
                    if s.strip(): weapons.append(s.strip())
            elif weapons:
                weapons[-1] = (weapons[-1] + ' ' + t).strip()
    drop = lambda s: s and s.strip().lower() not in ('none', 'none.', '—', '–', '')
    v['description'] = clean(' '.join(desc))[:600]
    v['powers'] = '; '.join(dict.fromkeys(clean(p) for p in powers if drop(clean(p))))
    v['notes'] = clean(' '.join(n for n in notes if drop(n)))[:400]
    v['weapons'] = '; '.join(clean(w) for w in weapons if drop(clean(w)))[:400]
    return v

def parse_basic(pdf, book):
    """The 'Basic Vehicles' table: rows like 'Boat1280HugeSturdy 1, Speed Swim'."""
    idx = BASIC_PAGE[book]
    rows = []
    for ln in XP.read_columns(pdf.pages[idx], ncols=1, gutters=[])[0]:
        t = ln.text.strip()
        m = re.match(r'^([A-Z][a-zA-Z ]+?)(\d{2})(\d{2,4})(' + '|'.join(SIZES) + r')(.*)$', t)
        if m and 9 <= ln.size <= 11:
            name, speed, health, size, powers = m.groups()
            rows.append({'name': name.strip(), 'genre': 'core', 'tier': 'Basic',
                         'size': size, 'speed': speed, 'health': health,
                         'damageReduction': '', 'passengers': '', 'description': '',
                         'powers': clean(powers), 'notes': '', 'weapons': '', 'source': book})
    return rows

def extract(book):
    out = []
    with pdfplumber.open(S.BOOKS[book]) as pdf:
        a, b = PAGES[book]
        for idx in range(a, min(b + 1, len(pdf.pages))):
            for blk in profile_blocks(pdf, idx):
                if not blk['name'] or len(blk['name']) < 2:
                    continue
                v = parse_block(blk['name'], blk['lines'])
                if not (v['health'] or v['speed'] or v['passengers']):
                    continue
                v['genre'] = 'core'; v['tier'] = 'Named'; v['source'] = book
                out.append(v)
        out += parse_basic(pdf, book)
    return out

def main(merge=False):
    allv = []
    seen = set()
    for book in PAGES:
        got = extract(book)
        kept = 0
        for v in got:
            k = (norm(v['name']), v.get('tier'))
            if k in seen: continue
            seen.add(k); allv.append(v); kept += 1
        print('%-24s vehicles %d' % (book, kept))
    # order fields consistently
    FIELD = ['name', 'genre', 'tier', 'size', 'speed', 'health', 'damageReduction',
             'passengers', 'description', 'powers', 'notes', 'weapons', 'source']
    allv = [{k: v.get(k, '') for k in FIELD} for v in allv]
    print('vehicles total %d' % len(allv))
    if merge:
        json.dump(allv, open(PARTS + 'vehicles.json', 'w'), ensure_ascii=False, indent=1)
        print('wrote vehicles.json')
    return allv

if __name__ == '__main__':
    vs = main('--merge' in sys.argv)
    if '--list' in sys.argv:
        for v in vs:
            print('\n### %s [%s/%s]  HP %s  DR %s  %s  Size %s  Pass %s' % (
                v['name'], v['tier'], v['source'], v['health'], v['damageReduction'],
                v['speed'], v['size'], v['passengers']))
            if v['powers']: print('   powers:', v['powers'][:90])
            if v['weapons']: print('   weapons:', v['weapons'][:90])
