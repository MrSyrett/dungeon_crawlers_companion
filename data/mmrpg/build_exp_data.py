"""Assemble the expansion data-list sections (New Traits / New Tags / New
Conditions) from all four expansion PDFs and merge them into the parts files.

Reprints: the expansions re-print several shared traits/tags/conditions. We drop
any whose name already exists in the core list, and across expansions keep the
first occurrence (recording that book as the source).
"""
import sys, json, re
sys.path.insert(0, 'data/mmrpg')
import pdfplumber
import build_exp_sections as S

PARTS = 'data/mmrpg/parts/'

# section start (book page from each TOC) + stop banners, per book.
# find_header_page tolerates a small page offset, so the book page is fine.
TRAITS = {
    'X-Men Expansion':        (152, ['New Tags']),
    'Spider-Verse Expansion': (138, ['New Tags']),
    'Avengers Expansion':     (158, ['New Tags']),
    'Secret Wars':            (193, ['New Tags']),
}
TAGS = {
    'X-Men Expansion':        (153, ['New Powers', 'Power Descriptions']),
    'Spider-Verse Expansion': (139, ['New Powers', 'Power Descriptions']),
    'Avengers Expansion':     (158, ['New Powers', 'Power Descriptions']),
    'Secret Wars':            (194, ['New Powers', 'Power Descriptions']),
}
CONDITIONS = {
    'X-Men Expansion':        (139, ['Mental Duels'],      ['Damage Reduction']),
    'Spider-Verse Expansion': (136, ['New Origins', 'New Traits', 'Clones'], ['Damage Reduction']),
    'Avengers Expansion':     (157, ['New Traits'],        ['Damage Reduction']),
}

def norm(n):
    return re.sub(r'\s+', ' ', n).strip().lower()

def load(part):
    try: return json.load(open(PARTS + part + '.json'))
    except Exception: return []

def extract(spec_map, banner, has_drop=False):
    out = []
    for book, spec in spec_map.items():
        page = spec[0]; stops = spec[1]; drop = spec[2] if has_drop else ()
        with pdfplumber.open(S.BOOKS[book]) as pdf:
            idx = S.find_header_page(pdf, page, banner, window=6)
            if idx is None:
                print('  !! %s: banner not found (book p%d)' % (book, page)); continue
            items = S.name_items(pdf, idx, banner, stops, drop=drop)
            for it in items:
                it['source'] = book
            print('  %-24s %2d from p%d' % (book, len(items), idx))
            out.extend(items)
    return out

def merge(kind, extracted):
    core = load(kind)
    core_names = {norm(e['name']) for e in core if e.get('genre') == 'core' or 'source' not in e}
    # existing expansion entries (idempotent re-run): drop them, we re-add
    kept = [e for e in core if not e.get('source')]
    seen = set(norm(e['name']) for e in kept)
    added = 0
    for it in extracted:
        k = norm(it['name'])
        if k in seen:
            continue
        seen.add(k)
        kept.append({'name': it['name'], 'genre': 'core', 'description': it['description'], 'source': it['source']})
        added += 1
    json.dump(kept, open(PARTS + kind + '.json', 'w'), ensure_ascii=False, indent=1)
    print('%s: %d core/kept + %d new expansion = %d' % (kind, len(kept) - added, added, len(kept)))
    return kept

if __name__ == '__main__':
    print('TRAITS:');     tr = extract(TRAITS, 'New Traits')
    print('TAGS:');       tg = extract(TAGS, 'New Tags')
    print('CONDITIONS:'); co = extract(CONDITIONS, 'New Conditions', has_drop=True)
    if '--merge' in sys.argv:
        merge('traits', tr)
        merge('tags', tg)
        # conditions has no parts file yet — write standalone
        conds = []
        seen = set()
        for it in co:
            k = norm(it['name'])
            if k in seen: continue
            seen.add(k)
            conds.append({'name': it['name'], 'genre': 'core', 'description': it['description'], 'source': it['source']})
        json.dump(conds, open(PARTS + 'conditions.json', 'w'), ensure_ascii=False, indent=1)
        print('conditions: %d written' % len(conds))
