"""Merge expansion New Power Descriptions + Narrative Powers into powers.json.
Reprints (a power already in the core list or an earlier expansion) are skipped;
across expansions the first occurrence wins and carries the source tag."""
import sys, re, json
sys.path.insert(0, 'data/mmrpg')
import pdfplumber
import build_exp_sections as S
import build_exp_powers as P

PARTS = 'data/mmrpg/parts/'
FIELDS = ['powerSet', 'prerequisites', 'action', 'trigger', 'duration', 'range', 'cost', 'effect', 'fantastic']

# (descriptions banner, desc book page), (narrative banner page)
DESC = {
    'X-Men Expansion':        ('New Power Descriptions', 158),
    'Spider-Verse Expansion': ('Power Descriptions', 141),
    'Avengers Expansion':     ('New Power Descriptions', 159),
    'Secret Wars':            ('New Power Descriptions', 196),
}
NARR = {
    'X-Men Expansion':        168,
    'Spider-Verse Expansion': 149,
    'Avengers Expansion':     160,
    'Secret Wars':            199,
}
STOPS = ['Narrative Powers', 'Random Encounters', 'CHARACTERS', 'Reliances']

def norm(n):
    return re.sub(r'\s+', ' ', n).strip().lower()

def to_schema(p, source):
    return {
        'name': p['name'], 'genre': 'core',
        'powerSet': p.get('power_set', '') or 'None',
        'prerequisites': p.get('prerequisites', '') or 'None',
        'action': p.get('action', ''), 'trigger': p.get('trigger', ''),
        'duration': p.get('duration', ''), 'range': p.get('range', ''),
        'cost': p.get('cost', ''), 'effect': p.get('effect', ''),
        'fantastic': p.get('fantastic', ''), 'description': p.get('description', ''),
        'source': source,
    }

def narr_schema(n):
    return {
        'name': n['name'], 'genre': 'core', 'powerSet': 'Narrative Power',
        'prerequisites': 'None', 'action': '', 'trigger': '', 'duration': '',
        'range': '', 'cost': '', 'effect': n.get('description', ''), 'fantastic': '',
        'description': ('Example: ' + n['example']) if n.get('example') else '',
        'source': n['source'],
    }

def extract_book(book):
    banner, dpage = DESC[book]
    got = []
    with pdfplumber.open(S.BOOKS[book]) as pdf:
        idx = S.find_header_page(pdf, dpage, banner, window=6)
        if idx is not None:
            lines = P.section_lines(pdf, idx, banner, STOPS)
            got = [to_schema(p, book) for p in P.parse_powers(lines)]
        nidx = S.find_header_page(pdf, NARR[book], 'Narrative Power', window=5)
        narr = P.parse_narrative(pdf, nidx, book) if nidx is not None else []
        got += [narr_schema(n) for n in narr]
    return got

def main(merge=False):
    core = json.load(open(PARTS + 'powers.json'))
    kept = [e for e in core if not e.get('source')]
    seen = {norm(e['name']) for e in kept}
    allnew = []
    for book in DESC:
        got = extract_book(book)
        added = 0
        for p in got:
            k = norm(p['name'])
            if k in seen:
                continue
            seen.add(k); kept.append(p); allnew.append(p); added += 1
        print('%-24s extracted %2d, new %2d' % (book, len(got), added))
    print('powers: core/kept %d + new %d = %d' % (len(kept) - len(allnew), len(allnew), len(kept)))
    if merge:
        json.dump(kept, open(PARTS + 'powers.json', 'w'), ensure_ascii=False, indent=1)
        print('merged -> powers.json')
    return allnew

if __name__ == '__main__':
    new = main('--merge' in sys.argv)
    if '--list' in sys.argv:
        for p in new:
            print('  •', p['name'], '['+p['source']+'] set=', p['powerSet'])
