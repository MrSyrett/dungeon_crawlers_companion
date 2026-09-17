"""Word reconstruction for the X-Men Expansion PDF, whose display font places
glyphs with large letter-spacing (pdftotext/pdfplumber default word-splitting
mangles it). The PDF DOES contain real space glyphs between words, so we group
each page's chars into lines and split each line at the actual space characters
(plus a generous gap fallback for the rare missing space). Display runs (RANK,
60, ANGEL) have no internal spaces and stay intact; body text splits correctly.
Returns word dicts (text, x0, x1, top, bottom, size) compatible with parse_page."""

def words(page, line_tol=3.5, gap_fallback=7.0):
    chars = [c for c in page.chars if c['text'] != '' and c['text'] != '\n']
    if not chars:
        return []
    chars.sort(key=lambda c: (round(c['top'] / line_tol), c['x0']))
    lines, cur, cy = [], [], None
    for c in chars:
        if cy is None or abs(c['top'] - cy) > line_tol:
            if cur: lines.append(cur)
            cur = [c]; cy = c['top']
        else:
            cur.append(c)
    if cur: lines.append(cur)
    out = []
    for ln in lines:
        ln.sort(key=lambda c: c['x0'])
        word = []
        prev = None
        for c in ln:
            is_space = (c['text'].strip() == '')
            big_gap = prev is not None and (c['x0'] - prev['x1']) > gap_fallback
            if is_space or big_gap:
                if word: out.append(_mk(word)); word = []
                if is_space:
                    prev = c; continue
            word.append(c); prev = c
        if word: out.append(_mk(word))
    return out

def _mk(word):
    return {
        'text': ''.join(c['text'] for c in word).strip(),
        'x0': min(c['x0'] for c in word),
        'x1': max(c['x1'] for c in word),
        'top': min(c['top'] for c in word),
        'bottom': max(c['bottom'] for c in word),
        'size': max((c.get('size', 0) for c in word), default=0),
    }
