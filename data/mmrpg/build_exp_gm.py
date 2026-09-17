"""Extract GM-Screen tables from the expansion PDFs:
  * Random Encounter tables (d6 result tables) — X-Men, Spider-Verse, Avengers
  * Danger Room tables (settings / threats / environments) — X-Men
Emits data/mmrpg/gm/mmrpg-gm-tables.json consumed by the GM screen.

The tables are full-width (read single-column). Each d6 row's result wraps over
2-3 lines; the die number (1-6) is a size-10 digit in a left cell (x~92) sitting at
the row's vertical centre. We anchor rows on those digit centres."""
import sys, re, json
sys.path.insert(0, 'data/mmrpg')
import pdfplumber
import expprose as XP
import build_exp_sections as S

def clean(t):
    t = re.sub(r'Marvel(?=[A-Za-z])', ' ', t)        # glued watermark ("Marvelto"/"MarvelEvil")
    t = re.sub(r'\bMarvel\b', ' ', t)               # standalone watermark
    t = re.sub(r'^[1-6](?=[A-Za-z])', '', t)               # leading die digit
    t = re.sub(r'(?<=\s)[1-6](?=[a-z]{2})', '', t)         # stray die digit glued mid-line
    t = re.sub(r'\s+', ' ', t).strip()
    return t

def die_anchors(pg, y0, y1):
    """centres (top) of the die-roll digits 1-6 in the left cell (x~88-100)."""
    a = {}
    for c in pg.chars:
        if c['text'] in '123456' and c.get('upright', True) and 76 <= c["x0"] <= 112 \
                and y0 <= c['top'] <= y1 and 9 <= c.get('size', 0) <= 13:
            a.setdefault(c['text'], c['top'])
    return a

def d6_table(pg, header_top, end_top):
    """Assemble a 6-row result table between header_top and end_top."""
    lines = [ln for ln in XP.read_columns(pg, ncols=1, gutters=[])[0]
             if header_top < ln.top < end_top and 9 <= ln.size <= 11 and not S.is_footer(ln.text)]
    lines = [ln for ln in lines if ln.text.strip() not in ('', 'Marvel')
             and not re.search(r'Die\s*Roll', ln.text)]
    anchors = die_anchors(pg, header_top, end_top)          # dict digit->top
    centres = {}
    for d in '23456':
        if d in anchors:
            centres[int(d)] = anchors[d]
    if not centres:
        return None
    row_h = 0
    keys = sorted(centres)
    if len(keys) >= 2:
        row_h = (centres[keys[-1]] - centres[keys[0]]) / (keys[-1] - keys[0])
    centres[1] = centres.get(1, centres[keys[0]] - row_h)   # infer row 1 centre
    order = sorted(centres.items(), key=lambda kv: kv[1])   # by vertical pos
    bounds = []
    for i, (d, top) in enumerate(order):
        lo = -1e9 if i == 0 else (order[i - 1][1] + top) / 2
        hi = 1e9 if i == len(order) - 1 else (order[i + 1][1] + top) / 2
        bounds.append((d, lo, hi))
    rows = {}
    for ln in lines:
        for d, lo, hi in bounds:
            if lo <= ln.top < hi:
                rows.setdefault(d, []).append(ln.text); break
    out = []
    for d in sorted(rows):
        out.append({'roll': d, 'result': clean(' '.join(rows[d]))})
    return out if len(out) >= 5 else None

def find_table(pdf, page, title_key, window=4):
    """find the PDF page + the 'Die Roll/Result' header top for a table, by scanning
    for the header near the given book page."""
    for idx in range(max(0, page - window), page + window + 1):
        if idx >= len(pdf.pages): continue
        col = XP.read_columns(pdf.pages[idx], ncols=1, gutters=[])[0]
        for i, ln in enumerate(col):
            if re.match(r'^Die\s*Roll', ln.text):
                # confirm title proximity by checking a header above with title_key
                above = ' '.join(x.text for x in col[max(0, i - 3):i])
                yield idx, ln.top


def extract_page_tables(pdf, idx, titles):
    """Find each 'Die Roll/Result' table on a page and return [{title,rows}], mapping
    titles by order."""
    pg = pdf.pages[idx]
    col = XP.read_columns(pg, ncols=1, gutters=[])[0]
    heads = [ln.top for ln in col if re.search(r'Die\s*Roll', ln.text)]
    heads.sort()
    out = []
    for i, htop in enumerate(heads):
        end = heads[i + 1] - 20 if i + 1 < len(heads) else 1e9
        # actual end should be the next table's TITLE, a bit above next Die Roll header
        rows = d6_table(pg, htop, end if end < 1e8 else 760)
        if rows:
            out.append({'title': titles[i] if i < len(titles) else 'Table %d' % (i + 1),
                        'rows': rows})
    return out

def build_danger_tables():
    """The X-Men Expansion Danger Room generator tables (p143-144). These short d6
    tables are interleaved with prose in the PDF, so they are transcribed here
    (verified against the book) rather than machine-parsed."""
    return {
        'source': 'X-Men Expansion',
        'tnByRank': {'formula': 'Challenging TN = 10 + rank',
                     'rows': [{'rank': r, 'tn': 10 + r} for r in range(1, 7)]},
        'tnModifiers': [
            {'adjective': 'Trivial', 'mod': -6}, {'adjective': 'Easy', 'mod': -4},
            {'adjective': 'Routine', 'mod': -2}, {'adjective': 'Challenging', 'mod': 0},
            {'adjective': 'Difficult', 'mod': 2}, {'adjective': 'Ridiculous', 'mod': 4},
            {'adjective': 'Absurd', 'mod': 6},
        ],
        'tables': [
            {'title': 'Random Danger Room Setting', 'die': 'd6', 'rows': [
                {'roll': 1, 'result': 'The Arena, Krakoa'},
                {'roll': 2, 'result': 'Central Park, New York City'},
                {'roll': 3, 'result': 'Lowtown, Madripoor'},
                {'roll': 4, 'result': 'Circle Perilous, Arakko'},
                {'roll': 5, 'result': 'Utopia'},
                {'roll': 6, 'result': 'Genosha/Necrosha* (Genosha if the setting TN is Challenging or below; Necrosha if Difficult or above)'},
            ]},
            {'title': 'Random Danger Room Threats', 'die': 'd6', 'rows': [
                {'roll': 1, 'result': 'Missile attack'},
                {'roll': 2, 'result': 'Hydraulic press'},
                {'roll': 3, 'result': 'Tangling net'},
                {'roll': 4, 'result': 'Close attack'},
                {'roll': 5, 'result': 'Ranged attack'},
                {'roll': 6, 'result': 'Environment change'},
            ]},
            {'title': 'Random Danger Room Environment (Modern)', 'die': 'd6', 'rows': [
                {'roll': 1, 'result': 'Standard (no effect).'},
                {'roll': 2, 'result': 'Foggy. Blocks sight beyond 10 spaces.'},
                {'roll': 3, 'result': 'Storming. Ranges and speeds cut in half.'},
                {'roll': 4, 'result': 'Windy. Ranged attacks have trouble, and characters cannot fly or swingline.'},
                {'roll': 5, 'result': 'Kaleidoscopic flashing. All Focus costs for powers are doubled.'},
                {'roll': 6, 'result': 'Lights out. Characters are blinded, but the Danger Room is not.'},
            ]},
            {'title': 'Random Danger Room Environment (Classic)', 'die': 'd6', 'rows': [
                {'roll': 1, 'result': 'Standard (no effect).'},
                {'roll': 2, 'result': 'Roof lowers. Characters cannot fly.'},
                {'roll': 3, 'result': 'Walls close in. Close attacks have trouble in such tight quarters.'},
                {'roll': 4, 'result': 'Giant fan blows. Ranged attacks have trouble.'},
                {'roll': 5, 'result': 'Sonic disruption. All Focus costs for powers are doubled.'},
                {'roll': 6, 'result': 'Lights out. Characters are blinded, but the Danger Room is not.'},
            ]},
        ],
    }

ENCOUNTERS = [
    ('X-Men Expansion', 171, ['Krakoa Encounters', 'New York City Encounters', 'Mutant School Encounters']),
    ('Spider-Verse Expansion', 152, ['Empire State University Encounters', 'New York City Encounters', 'Multiversal Encounters']),
    ('Avengers Expansion', 163, ['New York City Encounters', 'West Coast Encounters']),
]

def build_encounter_tables():
    out = []
    for book, page, titles in ENCOUNTERS:
        with pdfplumber.open(S.BOOKS[book]) as pdf:
            tabs = extract_page_tables(pdf, page, titles)
            for t in tabs:
                t['source'] = book; t['die'] = 'd6'; t['kind'] = 'encounter'
                out.append(t)
            print('%-24s %d encounter tables' % (book, len(tabs)))
    return out

if __name__ == '__main__':
    import os
    enc = build_encounter_tables()
    danger = build_danger_tables() if 'build_danger_tables' in dir() else []
    data = {'encounters': enc, 'dangerRoom': danger}
    if '--write' in sys.argv:
        os.makedirs('data/mmrpg/gm', exist_ok=True)
        json.dump(data, open('data/mmrpg/gm/mmrpg-gm-tables.json', 'w'), ensure_ascii=False, indent=1)
        print('wrote data/mmrpg/gm/mmrpg-gm-tables.json')
        banner = ("// GENERATED FILE - do not edit by hand.\n"
                  "// Source: data/mmrpg/gm/*.json - regenerate with: python3 data/mmrpg/build_exp_gm.py --write")
        js = ("%s\n\nconst MMRPG_GM_TABLES = %s;\n"
              "if (typeof window !== 'undefined') { window.MMRPG_GM_TABLES = MMRPG_GM_TABLES; }\n"
              % (banner, json.dumps(data, ensure_ascii=False, indent=2)))
        open('public/tools-data/mmrpg-gm-tables.js', 'w').write(js)
        print('wrote public/tools-data/mmrpg-gm-tables.js')
    if '--show' in sys.argv:
        for t in enc:
            print('\n=== %s [%s] ===' % (t['title'], t['source']))
            for r in t['rows']:
                print('  %d) %s' % (r['roll'], r['result']))
