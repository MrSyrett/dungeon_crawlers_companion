"""Extract the 'New Power Descriptions' (and 'Narrative Powers') sections of the
expansion PDFs into the powers.json schema, reusing the ligature-repairing reader.

Layout is exactly the Core Rulebook's power format: a size-13 NAME, an optional
flavour line, then labelled fields (Power Set / Prerequisites / Action / Trigger /
Duration / Range / Cost / Effect / Fantastic). We collect the section's lines in
reading order (col0 then col1, page after page), anchor on the 'Power Set:' lines
to find names, and slice each power's block between names — matching build_powers.
"""
import sys, re, json
sys.path.insert(0, 'data/mmrpg')
import pdfplumber
import expprose as XP
import build_exp_sections as S

LABELS = ['Power Set', 'Prerequisites', 'Action', 'Trigger', 'Duration', 'Range', 'Cost', 'Effect', 'Fantastic']
LABRE = re.compile(r'^\s*(%s)\s*:\s*(.*)$' % '|'.join(re.escape(l) for l in LABELS))
key = lambda L: L.lower().replace(' ', '_')

try:
    from wordfreq import zipf_frequency as _zf
except Exception:
    _zf = lambda w, l: 5.0

def fix_name(nm):
    """Title font inserts a spurious space before wide glyphs ('Cop y Psyche',
    'Evi l Eye', 'Let ’s Go'). Glue a stray 1-char lowercase fragment or a "’s"
    cluster back onto the previous token; also glue short fragments when the merge
    is a known word."""
    toks = nm.split()
    # leading spurious drop-cap / doubled initial ("L Lucky You" -> "Lucky You")
    if len(toks) >= 2 and len(toks[0]) == 1 and toks[0].isupper() and toks[1][:1] == toks[0]:
        toks = toks[1:]
    out = []
    for t in toks:
        if out:
            glue = False
            if len(t) == 1 and t.isalpha() and t.islower():
                glue = True
            elif re.fullmatch(r"[’'][a-z]{1,2}", t):
                glue = True
            elif len(t) <= 2 and _zf((out[-1] + t).lower(), 'en') >= 3.0:
                glue = True
            if glue:
                out[-1] = out[-1] + t
                continue
        out.append(t)
    return ' '.join(out)

def section_lines(pdf, start_idx, banner, stops, max_pages=14):
    """Reading-order text lines of a section (col0 then col1 per page), from the
    banner page until a stop banner."""
    want = S.caps_key(banner)
    stopset = [S.caps_key(s) for s in stops]
    out = []
    started = False
    for idx in range(start_idx, min(start_idx + max_pages, len(pdf.pages))):
        cols = XP.read_columns(pdf.pages[idx])
        for col in cols:
            for ln in col:
                if S.is_footer(ln.text):
                    continue
                k = S.caps_key(ln.text)
                if not started:
                    if ln.size >= S.BANNER_CAPS and want in k:
                        started = True
                    continue
                if ln.size >= S.BANNER_CAPS and any(st in k for st in stopset):
                    return out
                out.append((ln.size, ln.text))
    return out

STOPWORDS = {'The', 'A', 'An', 'This', 'That', 'They', 'Their', 'It', 'If', 'When', 'While',
             'For', 'With', 'In', 'At', 'As', 'Any', 'Each', 'Once', 'After', 'Before', 'On',
             'Roll', 'Make', 'Choose', 'Unless', 'Instead', 'Because', 'Also', 'Then', 'During',
             'Until', 'Whenever', 'Add', 'All', 'No', 'You', 'Your', 'Up', 'By', 'From', 'Here',
             'Every', 'Whether', 'Some', 'Most', 'Both', 'Even', 'These', 'Those', 'Now', 'Note'}

def is_name(size, t):
    if size < 12.0:
        return False
    if not t or len(t) > 40:
        return False
    w = t.split()
    if not (1 <= len(w) <= 6):
        return False
    if not t[0].isupper():
        return False
    if re.search(r'[.,;:!?)]$', t):
        return False
    if LABRE.match(t):
        return False
    if w[0] in STOPWORDS:
        return False
    return True

def parse_powers(lines):
    # name index = a size-13 name line at or just above each 'Power Set:' anchor
    idxs = []
    for i, (sz, l) in enumerate(lines):
        m = LABRE.match(l)
        if m and m.group(1) == 'Power Set':
            ni = None
            for j in range(i - 1, max(i - 6, -1), -1):
                if is_name(lines[j][0], lines[j][1]):
                    ni = j; break
            if ni is not None and (not idxs or idxs[-1] != ni):
                idxs.append(ni)
    idxs = sorted(set(idxs))
    powers = []
    for a in range(len(idxs)):
        i0 = idxs[a]; i1 = idxs[a + 1] if a + 1 < len(idxs) else len(lines)
        block = [l for _, l in lines[i0:i1]]
        p = {'name': fix_name(block[0]), 'description': '', **{key(l): '' for l in LABELS}}
        field = None
        for l in block[1:]:
            m = LABRE.match(l)
            if m:
                field = key(m.group(1)); p[field] = m.group(2).strip()
            elif field:
                p[field] = (p[field] + ' ' + l).strip()
            else:
                p['description'] = (p['description'] + ' ' + l).strip()
        if p.get('power_set', '').strip():
            powers.append(p)
    return powers

if __name__ == '__main__':
    book = sys.argv[1]; page = int(sys.argv[2])
    banner = sys.argv[3] if len(sys.argv) > 3 else 'New Power Descriptions'
    stops = sys.argv[4].split('|') if len(sys.argv) > 4 else ['Narrative Powers', 'Random Encounters', 'CHARACTERS']
    with pdfplumber.open(S.BOOKS[book]) as pdf:
        idx = S.find_header_page(pdf, page, banner, window=6)
        print('%s %r -> idx %s' % (book, banner, idx))
        lines = section_lines(pdf, idx, banner, stops)
        for p in parse_powers(lines):
            print('\n### %s  [Set: %s | Prereq: %s]' % (p['name'], p['power_set'], p['prerequisites']))
            print('   flavor:', p['description'][:80])
            print('   effect:', p['effect'][:120])


def parse_narrative(pdf, start_idx, source, banner='Narrative Power Descriptions',
                    stops=('Random Encounters', 'CHARACTERS', 'Narrative Limitations',
                           'Narrative Items'), max_pages=6):
    """Narrative powers are size~11 name headers + size-9 prose (no labelled fields).
    Collect them from the 'Narrative Power Descriptions' sub-header to the next
    major banner."""
    want = S.caps_key(banner)
    stopset = [S.caps_key(s) for s in stops]
    started = False
    cur = None
    out = []
    for idx in range(start_idx, min(start_idx + max_pages, len(pdf.pages))):
        for col in XP.read_columns(pdf.pages[idx]):
            for ln in col:
                if S.is_footer(ln.text):
                    continue
                k = S.caps_key(ln.text)
                if not started:
                    if 12.0 <= ln.size < 14.5 and want in k:
                        started = True
                    continue
                if ln.size >= 14.5 and any(st in k for st in stopset):
                    if cur: out.append(cur)
                    return out
                if 10.7 <= ln.size < 12.4 and is_name(12.5, ln.text if False else ln.text) or \
                   (10.7 <= ln.size < 12.4 and ln.text[:1].isupper() and not LABRE.match(ln.text)
                        and 1 <= len(ln.text.split()) <= 6 and not re.search(r'[.,;:!?]$', ln.text)):
                    if cur: out.append(cur)
                    cur = {'name': fix_name(ln.text), 'description': '',
                           'powerSet': 'Narrative Power', 'source': source}
                elif cur is not None:
                    t = ln.text.strip()
                    if t.startswith('Example:'):
                        cur['example'] = t[len('Example:'):].strip()
                    else:
                        cur['description'] = (cur['description'] + ' ' + t).strip()
    if cur: out.append(cur)
    return out
