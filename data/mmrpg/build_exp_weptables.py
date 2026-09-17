"""Extract the generic weapon TABLES from the expansion New-Rules chapters
(Avengers Melee + Ranged Weapons, Secret Wars New Ranged Weapons) into equipment
as Common weapons. Rows are glued: melee "Ball and chainReach +1Blunt+1",
ranged "Bow15+1" / "Frag grenade10×2". Descriptions (where present) come from the
"Additional Weapon Rules" prose (\"Name: ...\")."""
import sys, re, json
sys.path.insert(0, 'data/mmrpg')
import pdfplumber
import expprose as XP
import build_exp_sections as S

PARTS = 'data/mmrpg/parts/'

TABLES = [
    ('Avengers Expansion', 'melee',  135, 136),
    ('Avengers Expansion', 'ranged', 136, 137),
    ('Secret Wars',        'ranged', 173, 175),
]

MELEE = re.compile(r'^([A-Za-z][A-Za-z \'\-]+?)(Reach(?: \+\d)?)(Blunt|Sharp)([+×]\d+)$')
RANGED = re.compile(r'^([A-Za-z][A-Za-z \'\-]+?)(\d{1,3})([+×]\d+)$')

def norm(n): return re.sub(r'\s+', ' ', n).strip().lower()

def rules_descs(pdf, a, b):
    """Map weapon name -> description from an 'Additional Weapon Rules' block
    ('Name: This is ...')."""
    out = {}
    for idx in range(a, min(b + 2, len(pdf.pages))):
        for ln in XP.read_columns(pdf.pages[idx], ncols=1, gutters=[])[0]:
            m = re.match(r'^([A-Z][A-Za-z \'\-]{2,28}):\s+(.{15,})$', ln.text.strip())
            if m:
                out[norm(m.group(1))] = re.sub(r'\s+', ' ', m.group(2)).strip()
    return out

def parse_table(pdf, kind, a, b):
    rows = []
    for idx in range(a, b):
        for ln in XP.read_columns(pdf.pages[idx], ncols=1, gutters=[])[0]:
            t = ln.text.strip()
            if not (9 <= ln.size <= 11.5) or len(t) > 46:
                continue
            m = MELEE.match(t) if kind == 'melee' else RANGED.match(t)
            if not m:
                continue
            name = m.group(1).strip()
            if kind == 'melee':
                rng, dtype, bonus = m.group(2), m.group(3), m.group(4)
            else:
                rng, dtype, bonus = m.group(2), '', m.group(3)
            rows.append((name, rng, dtype, bonus))
    return rows

def build(merge=False):
    eq = json.load(open(PARTS + 'equipment.json'))
    seen = {norm(e['name']) for e in eq}
    added = []
    for book, kind, a, b in TABLES:
        with pdfplumber.open(S.BOOKS[book]) as pdf:
            descs = rules_descs(pdf, a, b)
            for name, rng, dtype, bonus in parse_table(pdf, kind, a, b):
                if norm(name) in seen:
                    continue
                seen.add(norm(name))
                e = {'name': name, 'tier': 'Common', 'type': 'Weapon', 'category': 'Weapon',
                     'weaponClass': 'melee' if kind == 'melee' else 'ranged',
                     'ability': 'melee' if kind == 'melee' else 'agility',
                     'range': rng.replace('Reach', 'Reach').strip(),
                     'owner': '—', 'notes': descs.get(norm(name), ''),
                     'special': ('%s weapon.' % dtype) if dtype else '', 'source': book}
                if bonus.startswith('×'):
                    e['flatMult'] = int(bonus[1:]); e['damageBonus'] = bonus
                else:
                    e['multBonus'] = int(bonus[1:]); e['damageBonus'] = bonus
                added.append(e); eq.append(e)
    print('weapon-table weapons added: %d' % len(added))
    for e in added:
        print('  %-18s [%s] %-9s %s %s' % (e['name'][:18], e['source'][:8], e['weaponClass'], e['range'], e['damageBonus']))
    if merge:
        json.dump(eq, open(PARTS + 'equipment.json', 'w'), ensure_ascii=False, indent=1)
        print('merged -> equipment.json (%d)' % len(eq))
    return added

if __name__ == '__main__':
    build('--merge' in sys.argv)
