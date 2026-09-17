#!/usr/bin/env python3
"""Collapse apostrophe/whitespace-variant duplicate iconic items across books,
preferring the authoritative Avengers/Secret Wars catalog version and inheriting
the signature owner from any character-derived stub. Dry-run unless --apply."""
import json, re, sys

CATALOG = {'Avengers Expansion', 'Secret Wars'}


def norm(s):
    s = s.replace('’', "'").replace('‘', "'").replace('`', "'")
    return re.sub(r'\s+', ' ', s).strip().lower()


def main(apply):
    d = json.load(open('parts/equipment.json'))
    groups = {}
    order = []
    for e in d:
        if e.get('tier') == 'Iconic':
            k = norm(e['name'])
            if k not in groups:
                groups[k] = []
                order.append(k)
            groups[k].append(e)

    dupes = {k: v for k, v in groups.items() if len(v) > 1}
    for k, v in dupes.items():
        print('  ', [(e['name'], e.get('source')) for e in v])
    if not apply:
        print('groups to collapse:', len(dupes))
        return

    # rebuild: non-iconic untouched; for each iconic group keep one winner
    winners = {}
    for k in order:
        v = groups[k]
        cat = [e for e in v if e.get('source') in CATALOG]
        winner = cat[0] if cat else v[0]
        owner = next((e['owner'] for e in v if e.get('owner') and e['owner'] != '—'), winner.get('owner'))
        if owner:
            winner['owner'] = owner
        winners[k] = winner

    out = []
    used = set()
    for e in d:
        if e.get('tier') == 'Iconic':
            k = norm(e['name'])
            if k in used:
                continue
            used.add(k)
            out.append(winners[k])
        else:
            out.append(e)
    json.dump(out, open('parts/equipment.json', 'w'), ensure_ascii=False, indent=1)
    print('removed', len(d) - len(out), 'duplicate iconic entries; total now', len(out))


if __name__ == '__main__':
    main('--apply' in sys.argv)
