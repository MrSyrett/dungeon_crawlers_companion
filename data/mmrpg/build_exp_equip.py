"""Extract the 'New Equipment' named items (Adamantium, Cerebro, Anti-Telepathy
Helmet, Body Armor, Grenades, ...) from the expansion PDFs into equipment.json as
reference Items. Detailed weapon micro-tables and vehicle stat blocks are captured
as note text rather than fully modelled. Reprints and junk table-headers dropped."""
import sys, re, json
sys.path.insert(0, 'data/mmrpg')
import pdfplumber
import build_exp_sections as S

PARTS = 'data/mmrpg/parts/'

EQUIP = {   # book: (New Equipment book page, stop banners)
    'X-Men Expansion':        (134, ['Vehicles', 'New Conditions']),
    'Spider-Verse Expansion': (129, ['Vehicles', 'New Conditions', 'New Rules']),
    'Avengers Expansion':     (135, ['Vehicles', 'New Conditions']),
    'Secret Wars':            (173, ['Vehicles', 'New Tags', 'New Powers']),
}

# headers that are table/section furniture, not a pickable item
JUNK = {'melee weapons', 'ranged weapons', 'new ranged weapons', 'basic vehicles',
        'n w', 'additional weapon rules', 'vehicle profiles', 'operating a vehicle',
        'vehicular weaponry', 'defense and destruction', 'recalculating',
        'rate of advancement', 'new weapon', 'incapacitating attacks'}

def norm(n): return re.sub(r'\s+', ' ', n).strip().lower()

def classify(name, desc):
    tier = 'Narrative'
    typ = 'Item'
    special = ''
    m = re.search(r'Health Damage Reduction\s*[–-]?\s*(\d+)', desc)
    if m or re.search(r'\barmor\b|\bvest\b|\bshield\b', name, re.I):
        typ = 'Armor'
        if m: special = 'Health Damage Reduction –%s' % m.group(1)
    if re.search(r'\bgrenade\b|\bgun\b|\bstaff\b|\bblade\b|\bsword\b', name, re.I):
        typ = 'Weapon'
    return tier, typ, special

def extract(book):
    page, stops = EQUIP[book]
    with pdfplumber.open(S.BOOKS[book]) as pdf:
        idx = S.find_header_page(pdf, page, 'New Equipment', window=6)
        if idx is None:
            print('  !! %s: New Equipment banner not found' % book); return []
        items = S.name_items(pdf, idx, 'New Equipment', stops, drop=(), name_max_words=4)
        out = []
        for it in items:
            nm = it['name']; desc = it['description']
            if norm(nm) in JUNK: continue
            if len(nm) <= 3 and nm.isupper(): continue     # "N W" table banner
            if len(desc) < 40: continue                    # stray fragment / table row
            if re.match(r'^(Range|Weapon|Size|Vehicle|Speed)', nm): continue
            tier, typ, special = classify(nm, desc)
            e = {'name': nm, 'tier': tier, 'type': typ, 'category': typ,
                 'owner': '—', 'notes': desc, 'source': book}
            if special: e['special'] = special
            out.append(e)
        return out

def main(merge=False):
    core = json.load(open(PARTS + 'equipment.json'))
    # keep everything EXCEPT a prior New-Equipment import from these books (tier
    # Narrative/Common from a book source). Iconic character gear (tier Iconic,
    # book source) is preserved.
    kept = [e for e in core if not (e.get('source') in EQUIP and e.get('tier') != 'Iconic')]
    seen = {norm(e['name']) for e in kept}
    allnew = []
    for book in EQUIP:
        got = extract(book)
        added = 0
        for e in got:
            k = norm(e['name'])
            if k in seen: continue
            seen.add(k); kept.append(e); allnew.append(e); added += 1
        print('%-24s items %2d, new %2d' % (book, len(got), added))
    print('equipment: kept %d + new %d = %d' % (len(kept) - len(allnew), len(allnew), len(kept)))
    if merge:
        json.dump(kept, open(PARTS + 'equipment.json', 'w'), ensure_ascii=False, indent=1)
        print('merged -> equipment.json')
    return allnew

if __name__ == '__main__':
    new = main('--merge' in sys.argv)
    if '--list' in sys.argv:
        for e in new: print('  •', e['name'], '['+e['source']+'] type=', e['type'], '| ', e['notes'][:70])
