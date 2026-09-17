"""Merge Narrative Items (Avengers, Secret Wars) into equipment.json and Narrative
Limitations (Secret Wars) into powers.json (as powerSet 'Narrative Limitation')."""
import sys, re, json
sys.path.insert(0, 'data/mmrpg')
import pdfplumber
import build_exp_sections as S
import build_exp_powers as P

PARTS = 'data/mmrpg/parts/'

ITEMS = {   # book: (Narrative Items book page, stop banners)
    'Avengers Expansion': (119, ['Getting Schooled', 'New Equipment', 'RANDOM ENCOUNTERS', 'New Conditions', 'CHARACTERS']),
    'Secret Wars':        (170, ['New Equipment', 'Vehicles', 'RANDOM', 'New Origins', 'New Tags', 'Werewolves', 'Spider-Virus', 'Iconic Items', 'CHARACTERS']),
}
DROP_ITEM = ('Using Narrative Items', 'Narrative Power Descriptions', 'Narrative Items')

def norm(n): return re.sub(r'\s+', ' ', n).strip().lower()

def extract_items(book):
    page, stops = ITEMS[book]
    with pdfplumber.open(S.BOOKS[book]) as pdf:
        idx = S.find_header_page(pdf, page, 'Narrative Items', window=6)
        if idx is None:
            print('  !! %s: Narrative Items not found' % book); return []
        raw = S.name_items(pdf, idx, 'Narrative Items', stops, drop=DROP_ITEM, name_max_words=4)
        out = []
        for it in raw:
            nm = P.fix_name(it['name'])
            if len(it['description']) < 30:
                continue
            out.append({'name': nm, 'tier': 'Narrative', 'type': 'Item', 'category': 'Item',
                        'owner': '—', 'notes': it['description'], 'source': book})
        return out

def extract_limitations():
    with pdfplumber.open(S.BOOKS['Secret Wars']) as pdf:
        idx = S.find_header_page(pdf, 200, 'Narrative Limitations', window=4)
        if idx is None:
            return []
        lims = P.parse_narrative(pdf, idx, 'Secret Wars', banner='Narrative Limitations',
                                 stops=('CHARACTERS', 'GLOSSARY', 'APPENDIX', 'INDEX'), max_pages=5)
        out = []
        for n in lims:
            out.append({'name': n['name'], 'genre': 'core', 'powerSet': 'Narrative Limitation',
                        'prerequisites': 'None', 'action': '', 'trigger': '', 'duration': '',
                        'range': '', 'cost': '', 'effect': n.get('description', ''), 'fantastic': '',
                        'description': ('Example: ' + n['example']) if n.get('example') else '',
                        'source': 'Secret Wars'})
        return out

def merge_equipment(new):
    core = json.load(open(PARTS + 'equipment.json'))
    kept = [e for e in core if not (e.get('tier') == 'Narrative' and e.get('type') == 'Item'
                                     and e.get('source') in ITEMS and e.get('name') in {n['name'] for n in new})]
    seen = {norm(e['name']) for e in kept}
    added = 0
    for e in new:
        if norm(e['name']) in seen: continue
        seen.add(norm(e['name'])); kept.append(e); added += 1
    json.dump(kept, open(PARTS + 'equipment.json', 'w'), ensure_ascii=False, indent=1)
    print('equipment: +%d narrative items -> %d' % (added, len(kept)))

def merge_powers(new):
    core = json.load(open(PARTS + 'powers.json'))
    kept = [e for e in core if e.get('powerSet') != 'Narrative Limitation']
    seen = {norm(e['name']) for e in kept}
    added = 0
    for e in new:
        if norm(e['name']) in seen: continue
        seen.add(norm(e['name'])); kept.append(e); added += 1
    json.dump(kept, open(PARTS + 'powers.json', 'w'), ensure_ascii=False, indent=1)
    print('powers: +%d narrative limitations -> %d' % (added, len(kept)))

if __name__ == '__main__':
    items = []
    for b in ITEMS:
        got = extract_items(b); items += got
        print('%-20s narrative items %d' % (b, len(got)))
    lims = extract_limitations()
    print('Secret Wars           narrative limitations %d' % len(lims))
    if '--list' in sys.argv:
        for e in items: print('  ITEM', e['name'], '::', e['notes'][:60])
        for e in lims: print('  LIM ', e['name'], '::', e['effect'][:60])
    if '--merge' in sys.argv:
        merge_equipment(items)
        merge_powers(lims)
