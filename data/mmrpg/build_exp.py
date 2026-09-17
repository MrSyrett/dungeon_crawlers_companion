"""Generalised character extractor for the Marvel Multiverse RPG *expansion* PDFs
(X-Men, Spider-Verse, Avengers, Secret Wars). Those books use a display font that
breaks pdftotext/pdfplumber word detection, so we reconstruct words from real
space glyphs (exp_words) and feed them to build_characters.parse_page. Two things
differ from the core/supplement layout and are handled here:
  * the RANK / POWERS banners are graphics (not text), so rank is read from the
    big top-centre digit and the POWERS region is found from the set headers;
  * power bullets are glued to their name ("◆Evasion"), so columns are detected
    from ◆-prefixed word x-positions.
Reuses build_xmen97's iconic/signature transform + power-name cleaning.
"""
import re, json, sys, unicodedata
sys.path.insert(0, 'data/mmrpg')
import exp_words as EW
import build_characters as BC
import build_xmen97 as X

def slug(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode()
    return re.sub(r'-+', '-', re.sub(r'[^a-z0-9]+', '-', s.lower())).strip('-')

def _rank(W):
    # 1) an explicit rank digit in the rank box (centre-top). Some pages render it
    #    as a graphic instead, so fall back to the damage multiplier.
    cand = [w for w in W if re.fullmatch(r'\d', w['text']) and 60 < w['top'] < 110 and 288 < w['x0'] < 350 and w.get('size', 0) >= 15]
    if cand:
        cand.sort(key=lambda w: -w.get('size', 0))
        return int(cand[0]['text'])
    # 2) fallback: the base damage multiplier (rank) is the smallest of the four
    #    multiplier cells (left grid, x≈90-110); power/weapon bonuses only add.
    mults = [int(w['text']) for w in W if re.fullmatch(r'\d+', w['text']) and 86 < w['x0'] < 114 and 560 < w['top'] < 720]
    if mults:
        return max(1, min(6, min(mults)))
    return None

def _load_names(part):
    try: return [d['name'] for d in json.load(open('data/mmrpg/parts/%s.json' % part))]
    except Exception: return []
_TRAITS = _load_names('traits'); _TAGS = _load_names('tags'); _POWERS = _load_names('powers')
def _canon(name, names):
    # repair display-font letter-spacing / ligatures by matching the space-stripped
    # form against a known name list (e.g. "Combat R e fle x e s" -> "Combat Reflexes").
    key = re.sub(r'\s+', '', name).lower()
    if not key: return name
    for n in names:
        if re.sub(r'\s+', '', n).lower() == key: return n
    return re.sub(r'\s{2,}', ' ', name).strip()

def _clean_tt(lst, names):
    out = []
    for t in lst or []:
        t = re.sub(r'\s*PO\s*WERS?\s*$', '', t).strip()
        t = re.sub(r'\s*POWER\s*S?\s*$', '', t).strip()
        if not t or re.fullmatch(r'PO ?WERS?', t): continue
        # canonicalize the bare name; keep any "(parenthetical)" suffix as-is
        m = re.match(r'^(.*?)(\s*\(.*\))?$', t)
        base, paren = m.group(1).strip(), (m.group(2) or '')
        out.append((_canon(base, names) + paren).strip())
    return out

def _name(page):
    # The all-caps title font puts a small space before wide glyphs (M/W), which
    # the space-splitter turns into false breaks ("GA MBIT"). Rebuild the name from
    # the title chars: merge gaps below the word threshold, stop at the big gap that
    # precedes the (right-aligned) rank number.
    ch = [c for c in page.chars if 44 <= c['top'] <= 82 and c.get('size', 0) >= 15 and c['x0'] < 400 and c['text'].strip()]
    if not ch: return None
    ch.sort(key=lambda c: c['x0'])
    # cut off the right-aligned rank number (a big gap precedes it)
    keep = [ch[0]]
    for i in range(1, len(ch)):
        if ch[i]['x0'] - ch[i - 1]['x1'] > 22: break
        keep.append(ch[i])
    ch = keep
    # Wide glyphs (M, W) carry extra leading space, so a split before an M/W needs
    # a much bigger gap than before a normal letter (measured: W intra-word ≈ 9.6,
    # M intra ≈ 7.6, real word boundaries ≈ 7.8-10, W word boundary ≈ 13).
    words, cur = [], [ch[0]]
    for i in range(1, len(ch)):
        gap = ch[i]['x0'] - ch[i - 1]['x1']
        nxt = ch[i]['text'][:1].upper()
        thr = 11.0 if nxt in ("M", "W") else 7.0
        if gap > thr:
            words.append(''.join(c['text'] for c in cur)); cur = [ch[i]]
        else:
            cur.append(ch[i])
    words.append(''.join(c['text'] for c in cur))
    name = ' '.join(w for w in words if w.strip()).strip()
    name = re.split(r'\s*\(', name)[0].strip()
    name = re.sub(r'(?<=[A-Za-z])\d(?=[A-Za-z])', '', name)   # stray rank digit inside a word
    name = re.sub(r'\s{2,}', ' ', name).strip()
    return name or None

def _powers_region_top(W):
    cand = [w for w in W if 200 <= w['x0'] <= 490 and (w['text'] == 'Basic' or BC.is_set_header(w['text']))]
    cand = [w for w in cand if w['top'] > 250]
    return (min(w['top'] for w in cand) - 3) if cand else None

def powers_exp(W):
    ytop = _powers_region_top(W)
    if ytop is None: return None
    foot = 10**9
    bw = [w for w in W if w['top'] >= ytop and w['text'].startswith('◆')]
    if not bw: return None
    xs = sorted(w['x0'] for w in bw)
    cols = []
    for x in xs:
        if not cols or x - cols[-1][-1] > 45: cols.append([x])
        else: cols[-1].append(x)
    cen = [sum(c) / len(c) for c in cols]
    COLS = []
    for i in range(len(cen)):
        left = cen[i] - 14
        right = (cen[i + 1] - 14) if i + 1 < len(cen) else 560
        COLS.append((left, right))
    def col_lines(x0, x1):
        ws = [w for w in W if x0 <= w['x0'] < x1 and ytop < w['top'] < ytop + 260]
        ws.sort(key=lambda w: (round(w['top'] / 4), w['x0']))
        lines, cy, cur = [], None, None
        for w in ws:
            if cy is None or abs(w['top'] - cy) > 4: cur = []; lines.append(cur); cy = w['top']
            cur.append(w)
        return [BC.clean(' '.join(x['text'] for x in l)) for l in lines if l]
    groups = []
    for x0, x1 in COLS:
        for ln in col_lines(x0, x1):
            ln = re.sub(r'\s*©\s*20\d\d.*$', '', ln).strip()
            if not ln or ln in ('Powers',) or re.fullmatch(r'\d+', ln): continue
            if re.search(r'Michael Syrett|Order #', ln): continue
            if '◆' not in ln and (BC.is_set_header(ln) or BC.is_set_header(re.sub(r's$', '', ln))):
                groups.append({'set': ln, 'names': []}); continue
            segs = ln.split('◆')
            head = segs[0].strip()
            if head:
                if groups and groups[-1]['names']: groups[-1]['names'][-1] = (groups[-1]['names'][-1] + ' ' + head).strip()
                elif groups: groups[-1]['set'] = (groups[-1]['set'] + ' ' + head).strip()
            for s in segs[1:]:
                if not s.strip(): continue
                if not groups: groups.append({'set': '', 'names': []})
                groups[-1]['names'].append(s.strip())
    for g in groups:
        g['names'] = [re.sub(r'\s+is$', '', n).strip() for n in g['names']]
    return [g for g in groups if g['names']]

def parse_exp_page(page):
    W = EW.words(page)
    # need the six ability labels to consider this a stat block
    if sum(1 for w in W if w['text'] in BC.LABELS) < 6:
        return None
    # synthesize a POWERS header so parse_page bounds traits/tags correctly
    pt = _powers_region_top(W)
    if pt is not None:
        W = W + [{'text': 'POWERS', 'x0': 205.0, 'x1': 250.0, 'top': pt, 'bottom': pt + 10, 'size': 13}]
    r = BC.parse_page(page, W=W)
    if not r: return None
    nm = _name(page)
    if nm: r['name'] = nm
    r['rank'] = _rank(W) or r.get('rank') or 1
    r['traits'] = _clean_tt(r.get('traits'), _TRAITS)
    r['tags'] = _clean_tt(r.get('tags'), _TAGS)
    if r.get('origin'): r['origin'] = re.split(r'\s+Teams?:', r['origin'])[0].strip()
    p3 = powers_exp(W)
    if p3:
        for g in p3:
            g['names'] = [(_canon(re.match(r'^(.*?)(\s*\[.*)?$', n).group(1).strip(), _POWERS) + (re.match(r'^(.*?)(\s*\[.*)?$', n).group(2) or '')).strip() for n in g['names']]
        r['powers'] = p3
    return r

# ── auto iconic weapons: pull "Iconic Weapon: <name> [effects]" out of a
# character's powers into an equipment entry, collapse the power to "Iconic
# Weapon", and attach the item. Returns the equipment dict (or None).
def extract_iconic(rec, source):
    item = None
    newgroups = []
    for g in rec.get('powers', []):
        names = []
        for n in g['names']:
            m = re.match(r'^\s*Iconic (Weapon|Item)\s*:\s*(.+)$', n)
            if m and item is None:
                body = m.group(2).strip()
                nm = re.split(r'\s*[\[(]', body, 1)[0].strip().rstrip('.').strip()
                sp = ''
                mb = re.search(r'[\[(](.+)[\])]\s*$', body)
                if mb: sp = mb.group(1).strip()
                mult = 0; abils = []
                for mm in re.finditer(r'\+(\d+)\s+(?:to (?:their )?)?([A-Za-z]+)?\s*damage multiplier', body):
                    mult = max(mult, int(mm.group(1)))
                    if mm.group(2) and mm.group(2).lower() in ('melee','agility','ego','logic'): abils.append(mm.group(2).lower())
                item = {'name': nm, 'tier': 'Iconic', 'type': 'Weapon', 'category': 'Weapon',
                        'owner': _titlecase(rec['name']), 'ability': 'melee', 'range': 'Reach',
                        'damageBonus': ('+%d' % mult) if mult else '—', 'multBonus': mult,
                        'special': sp, 'notes': '', 'source': source}
                if abils: item['multAbilities'] = sorted(set(abils))
                names.append('Iconic ' + m.group(1))
            elif n not in names:
                names.append(n)
        if names: newgroups.append({'set': g['set'], 'names': names})
    # collapse duplicate groups
    seen = set(); merged = []
    for g in newgroups:
        k = (g['set'], tuple(g['names']))
        if k in seen: continue
        seen.add(k); merged.append(g)
    rec['powers'] = merged
    if item:
        rec['equipment'] = [item['name']]
    return item

def _titlecase(nm):
    return ' '.join(w.capitalize() if w.isupper() else w for w in nm.split())

def build_book(pdf_path, source, pmin=0, pmax=None):
    import pdfplumber
    out = []; icons = {}
    with pdfplumber.open(pdf_path) as pdf:
        hi = pmax if pmax is not None else len(pdf.pages)
        for idx in range(pmin, min(hi, len(pdf.pages))):
            r = parse_exp_page(pdf.pages[idx])
            if not r or not r.get('name'): continue
            if len(r['name']) < 2 or len(r['name']) > 40: continue
            r['genre'] = 'core'; r['source'] = source
            it = extract_iconic(r, source)
            if it and it['name'] and it['name'] not in icons:
                icons[it['name']] = it
            out.append(r)
    # ids (disambiguate duplicate codenames by realName), slugged + source suffix
    sfx = '-' + slug(source)
    seen = {}
    for r in out:
        base = slug(r['name'])
        rid = base + sfx
        if rid in seen:
            rid = base + '-' + slug(r.get('realName') or str(seen.get(base, 0))) + sfx
        seen[rid] = seen.get(rid, 0) + 1
        r['id'] = rid
    return out, list(icons.values())
