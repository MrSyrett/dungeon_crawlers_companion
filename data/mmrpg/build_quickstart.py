"""Extract the MMRPG Quick-Start (Thunderbolts) supplement characters and merge
them into data/mmrpg/parts/characters.json. Reuses the core stat-block parser
and the X-Men '97 3-column power reader; tags each with source "Quickstart".
Idempotent: drops existing Quickstart rows before re-adding.

The Quick-Start also prints full power-rules text (one detail page per character),
so any genuinely-new power (only ESP) is added to the powers pipeline separately.
"""
import pdfplumber, re, json, sys
sys.path.insert(0, 'data/mmrpg')
import build_characters as BC
import build_xmen97 as X

SUPP = "/root/.claude/uploads/849b60f5-fa5f-53cb-9c6f-bf458e91a685/312a150a-Marvel_Multiverse_RPG_Quickstart_with_Thunderbolts_Adventure.pdf"
SOURCE = "Quickstart"
CHARS = 'data/mmrpg/parts/characters.json'
# 0-based page indices of the seven stat-block pages (PDF pp. 58,60,63,65,67,69,71)
STAT_PAGES = [57, 59, 62, 64, 66, 68, 70]

# Iconic Weapon power → equipment name (Iconic tier, source Quickstart)
QS_ICONIC = {
  'THE DESTROYER': 'Energy Baton',
  'RED GUARDIAN': "Red Guardian's Shield",
  'U.S.AGENT': "U.S.Agent's Shield",
  'WHITE WIDOW': "Widow's Bite",
}
# Signature Weapon tag → equipment to also attach
QS_SIGNATURE = {
  'THE EXECUTIONER': "Skurge's Battle-Ax",
  'RED GUARDIAN': 'Red Boomerangs',
}

def slug(s):
    return X.slug(s)

def apply_iconic_qs(rec):
    up = (rec.get('name') or '').upper()
    item = QS_ICONIC.get(up)
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
    sig = QS_SIGNATURE.get(up)
    if sig and sig not in equip: equip.append(sig)
    if equip: rec['equipment'] = equip
    return rec

def build():
    out = []
    with pdfplumber.open(SUPP) as pdf:
        for idx in STAT_PAGES:
            page = pdf.pages[idx]
            r = BC.parse_page(page)
            if not (r and r.get('name')): continue
            p3 = X.powers_3col(page)
            if p3: r['powers'] = p3
            r['genre'] = 'core'
            r['source'] = SOURCE
            r['id'] = slug(r['name']) + '-quickstart'
            X.clean_power_names(r)
            apply_iconic_qs(r)
            out.append(r)
    return out

if __name__ == '__main__':
    qs = build()
    print('parsed %d Quickstart characters:' % len(qs))
    for r in qs:
        print('  %-18s r%s equip=%s' % (r['name'], r['rank'], r.get('equipment')))
    if '--merge' in sys.argv:
        allc = json.load(open(CHARS))
        allc = [c for c in allc if c.get('source') != SOURCE]
        allc += qs
        json.dump(allc, open(CHARS, 'w'), ensure_ascii=False, indent=1)
        print('merged -> characters.json now has %d' % len(allc))
