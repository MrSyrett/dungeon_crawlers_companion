"""Extract 'New Origins' from the expansion PDFs into origins.json, matching the
core origin schema (name/description/examples/tags/traits/occupation/powers/limitation).
Origin bodies carry inline labels (Examples:/Tags:/Suggested Tags:/Traits:/
Suggested Occupations:/Limitation:/Powers:) which we split out."""
import sys, re, json
sys.path.insert(0, 'data/mmrpg')
import pdfplumber
import build_exp_sections as S

PARTS = 'data/mmrpg/parts/'

ORIGINS = {
    'X-Men Expansion':        (150, ['New Traits', 'New Tags', 'New Powers']),
    'Spider-Verse Expansion': (138, ['New Traits', 'New Tags', 'New Powers']),
    'Secret Wars':            (192, ['New Traits', 'New Tags', 'New Powers']),
}

LABELS = ['Suggested Occupations', 'Suggested Tags', 'Suggested Traits', 'Suggested Powers',
          'Examples', 'Occupations', 'Occupation', 'Tags', 'Traits', 'Powers', 'Limitation', 'Ability Boost']
LABRE = re.compile(r'(' + '|'.join(re.escape(l) for l in LABELS) + r')\s*:')

def norm(n): return re.sub(r'\s+', ' ', n).strip().lower()

def parse_fields(body):
    """Split an origin body into {description, examples, tags, traits, occupation,
    powers, limitation} using the inline labels."""
    parts = []
    last = 0; lastlab = None
    for m in LABRE.finditer(body):
        seg = body[last:m.start()].strip()
        parts.append((lastlab, seg))
        lastlab = m.group(1); last = m.end()
    parts.append((lastlab, body[last:].strip()))
    fields = {'description': '', 'examples': '', 'tags': '', 'traits': '',
              'occupation': '', 'powers': '', 'limitation': ''}
    for lab, seg in parts:
        seg = seg.strip(' .;').strip()
        if lab is None:
            fields['description'] = seg
        elif lab == 'Examples':
            fields['examples'] = seg
        elif lab in ('Tags', 'Suggested Tags'):
            fields['tags'] = (fields['tags'] + ('; ' if fields['tags'] else '') + (('Suggested: ' + seg) if lab.startswith('Suggested') else seg)).strip()
        elif lab in ('Traits', 'Suggested Traits'):
            fields['traits'] = (fields['traits'] + ('; ' if fields['traits'] else '') + (('Suggested: ' + seg) if lab.startswith('Suggested') else seg)).strip()
        elif lab in ('Occupation', 'Occupations', 'Suggested Occupations'):
            fields['occupation'] = seg
        elif lab in ('Powers', 'Suggested Powers'):
            fields['powers'] = (fields['powers'] + ('; ' if fields['powers'] else '') + seg).strip()
        elif lab == 'Limitation':
            fields['limitation'] = seg
    # de-hyphenate & tidy
    for k in fields:
        fields[k] = re.sub(r'\s+', ' ', fields[k]).strip()
    return fields

def extract(book):
    page, stops = ORIGINS[book]
    with pdfplumber.open(S.BOOKS[book]) as pdf:
        idx = S.find_header_page(pdf, page, 'New Origins', window=6)
        if idx is None:
            print('  !! %s: New Origins not found' % book); return []
        items = S.name_items(pdf, idx, 'New Origins', stops, name_max_words=4)
        out = []
        for it in items:
            f = parse_fields(it['description'])
            if not f['description'] or len(f['description']) < 15:
                continue
            out.append({'name': it['name'], 'genre': 'core', **f, 'source': book})
        return out

def main(merge=False):
    core = json.load(open(PARTS + 'origins.json'))
    kept = [e for e in core if not e.get('source')]
    seen = {norm(e['name']) for e in kept}
    allnew = []
    for book in ORIGINS:
        got = extract(book)
        added = 0
        for e in got:
            k = norm(e['name'])
            if k in seen: continue
            seen.add(k); kept.append(e); allnew.append(e); added += 1
        print('%-24s origins %2d, new %2d' % (book, len(got), added))
    print('origins: kept %d + new %d = %d' % (len(kept) - len(allnew), len(allnew), len(kept)))
    if merge:
        json.dump(kept, open(PARTS + 'origins.json', 'w'), ensure_ascii=False, indent=1)
        print('merged -> origins.json')
    return allnew

if __name__ == '__main__':
    new = main('--merge' in sys.argv)
    if '--list' in sys.argv:
        for e in new:
            print('\n### %s [%s]' % (e['name'], e['source']))
            print('   desc:', e['description'][:80])
            print('   examples:', e['examples'][:60], '| tags:', e['tags'][:50], '| traits:', e['traits'][:40])
            print('   occ:', e['occupation'][:40], '| powers:', e['powers'][:50], '| lim:', e['limitation'][:50])
