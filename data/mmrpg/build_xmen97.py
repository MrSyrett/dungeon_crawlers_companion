"""Extract the X-Men '97 supplement characters and merge them into
data/mmrpg/parts/characters.json. Reuses the core stat-block parser
(build_characters.parse_page); tags each with source "X-Men '97" and applies
the iconic-weapon transform (their signature gear lives in equipment.json).
Idempotent: drops any existing X-Men '97 entries before re-adding.
"""
import pdfplumber, re, json, sys, unicodedata
sys.path.insert(0, 'data/mmrpg')
import build_characters as BC

SUPP = "/root/.claude/uploads/849b60f5-fa5f-53cb-9c6f-bf458e91a685/607f5ea7-MMRPG_XMen97_20240517.pdf"
SOURCE = "X-Men '97"
CHARS = 'data/mmrpg/parts/characters.json'

# X-Men '97 signature gear → canonical equipment name (see equipment.json, Iconic tier)
XM_ICONIC = {
  'GAMBIT': "Gambit's Charged Cards",
  'WOLVERINE': "Adamantium Claws (X-Men '97)",
}
# Signature Weapon (a tag, not the Iconic Weapon power) → equipment to also attach
XM_SIGNATURE = {
  'GAMBIT': "Gambit's Bo Staff",
}

def center(w): return (w['x0'] + w['x1']) / 2.0

def powers_3col(page, W=None):
    """The supplement lays powers out in THREE full-width columns below the
    POWERS banner (x≈60 / 310 / 440), unlike the core's 2-column right block.
    Read each column top-to-bottom, then build set-header/bulleted groups."""
    if W is None:
        W = page.extract_words(x_tolerance=1.5, y_tolerance=2, extra_attrs=['size'])
    po = [w for w in W if w['text'] == 'POWERS']
    if not po: return None
    ytop = po[0]['top'] + 8
    # Detect the power columns from the ◆ bullet x-positions (they vary per
    # character: col1 ≈220, col2 ≈298-314, col3 ≈413-417). Cluster the bullet
    # x0s, then split the page into bands at the midpoints between column centres.
    bx = sorted(w['x0'] for w in W if w['text'] == '◆' and 198 < w['x0'] < 555 and w['top'] > ytop)
    centres = []
    for x in bx:
        if not centres or x - centres[-1][-1] > 40: centres.append([x])
        else: centres[-1].append(x)
    cen = [sum(c) / len(c) for c in centres]
    if not cen: cen = [220.0]
    # A column owns everything from just left of its own bullet up to just left
    # of the NEXT column's bullet (col1 entries like "Brilliance 1" are wider than
    # half the gap, so splitting at the midpoint would strand the trailing number).
    COLS = []
    for i in range(len(cen)):
        left = cen[i] - 12
        right = (cen[i + 1] - 12) if i + 1 < len(cen) else 555.0
        COLS.append((left, right))
    def col_lines(x0, x1):
        ws = [w for w in W if x0 <= w['x0'] < x1 and ytop < w['top'] < ytop + 260]
        ws.sort(key=lambda w: (round(w['top'] / 5), w['x0']))
        lines = []; cy = None; cur = None
        for w in ws:
            if cy is None or abs(w['top'] - cy) > 5: cur = []; lines.append(cur); cy = w['top']
            cur.append(w['text'])
        return [BC.clean(' '.join(l)) for l in lines if l]
    groups = []
    for x0, x1 in COLS:
        for ln in col_lines(x0, x1):
            ln = re.sub(r'\s*©\s*20\d\d\s*MARVEL\s*$', '', ln).strip()  # drop page-footer bleed
            if not ln or ln in ('Powers',) or re.fullmatch(r'\d+', ln): continue
            if re.search(r'©\s*20\d\d|MARVEL$', ln): continue
            if '◆' not in ln and (BC.is_set_header(ln) or BC.is_set_header(re.sub(r's$', '', ln))):
                groups.append({'set': ln, 'names': []}); continue
            segs = ln.split('◆')
            head = segs[0].strip()
            if head:
                if groups and groups[-1]['names']:
                    groups[-1]['names'][-1] = (groups[-1]['names'][-1] + ' ' + head).strip()
                elif groups:
                    groups[-1]['set'] = (groups[-1]['set'] + ' ' + head).strip()
            for s in segs[1:]:
                if not s.strip(): continue
                if not groups: groups.append({'set': '', 'names': []})
                groups[-1]['names'].append(s.strip())
    # strip a trailing " is"/wrap artifact like the core build does
    for g in groups:
        g['names'] = [re.sub(r'\s+is$', '', n).strip() for n in g['names']]
    return [g for g in groups if g['names']]

def slug(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode()
    return re.sub(r'-+', '-', re.sub(r'[^a-z0-9]+', '-', s.lower())).strip('-')

def apply_iconic_xm(rec):
    """Like build_characters.apply_iconic but with the X-Men '97 gear map, and
    also attaches a Signature Weapon item when present."""
    up = (rec.get('name') or '').upper()
    item = XM_ICONIC.get(up)
    equip = []
    newgroups = []
    for g in rec.get('powers', []):
        names = []
        for n in g.get('names', []):
            m = re.match(r'^\s*Iconic (Weapon|Item)\b', n)
            if m:
                lbl = 'Iconic ' + m.group(1)
                if lbl not in names: names.append(lbl)
                if item and item not in equip: equip.append(item)
            elif n not in names:
                names.append(n)
        if names: newgroups.append({'set': g.get('set', ''), 'names': names})
    seen = set(); merged = []
    for g in newgroups:
        key = (g['set'], tuple(g['names']))
        if key in seen: continue
        seen.add(key); merged.append(g)
    rec['powers'] = merged
    sig = XM_SIGNATURE.get(up)
    if sig and sig not in equip: equip.append(sig)
    if equip: rec['equipment'] = equip
    return rec

def build():
    out = []
    with pdfplumber.open(SUPP) as pdf:
        for i, page in enumerate(pdf.pages):
            r = BC.parse_page(page)
            if r and r.get('name'):
                p3 = powers_3col(page)   # override with the correct 3-column read
                if p3: r['powers'] = p3
                out.append(r)
    for r in out:
        r['genre'] = 'core'
        r['source'] = SOURCE
        r['id'] = slug(r['name']) + '-xmen97'
        clean_power_names(r)
        apply_iconic_xm(r)
    return out

def clean_power_names(rec):
    """Drop the book's inline 'Note:' paragraph (not a power) and strip the
    '(TR)' Tech-Reliance restriction marker so names match the core power list."""
    for g in rec.get('powers', []):
        names = []
        for n in g['names']:
            if re.match(r'^Note:', n): continue
            n = re.sub(r'\s*\(TR\)\s*$', '', n).strip()
            n = n.replace('Slow-Motion Shoot Dodge', 'Slow-Motion Shoot-Dodge')  # extraction dropped the hyphen
            if n: names.append(n)
        g['names'] = names
    rec['powers'] = [g for g in rec['powers'] if g['names']]
    return rec

if __name__ == '__main__':
    xm = build()
    print('parsed %d X-Men 97 characters:' % len(xm))
    for r in xm:
        print('  %-14s rank %s  equip=%s' % (r['name'], r['rank'], r.get('equipment')))
    if '--merge' in sys.argv:
        allc = json.load(open(CHARS))
        allc = [c for c in allc if c.get('source') != SOURCE]
        allc += xm
        json.dump(allc, open(CHARS, 'w'), ensure_ascii=False, indent=1)
        print('merged -> characters.json now has %d' % len(allc))
