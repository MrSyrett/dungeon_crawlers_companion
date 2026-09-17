"""Prose reader for the Marvel Multiverse RPG *expansion* PDFs.

Those books use a display font that inserts a real space glyph on either side of
every ligature glyph (ﬀ ﬁ ﬂ ﬃ ﬄ ﬅ, plus a couple of stray control bytes the
"ft" ligature renders as). A naive read therefore yields "a ﬀect", "di ﬀerent",
"su ﬀers", "therea ﬅer". We rebuild words at the character level: a space that
sits immediately next to a ligature glyph is spurious and dropped, so the word is
kept whole. That over-merges the rare case where a word legitimately *begins*
with a fi/fl ligature right after a short word ("on ﬁre" -> "onfire"); a
wordfreq-backed re-split pass repairs those ("onfire" -> "on fire") while leaving
real words ("affect", "different") intact.

Public API:
  words_line(chars)      -> list[str]         (one text line's reconstructed words)
  read_columns(page, n)  -> list[list[line]]  (n columns, each a list of Line)
  Line = namedtuple(top, size, x0, text)
"""
import re, unicodedata
from collections import namedtuple

LIG = {'ﬀ': 'ff', 'ﬁ': 'fi', 'ﬂ': 'fl', 'ﬃ': 'ffi', 'ﬄ': 'ffl', 'ﬅ': 'ft',
       '\x9c': 'ft', '\x97': 'ft', '\x9d': 'fi', '\x9e': 'fl', '�': 'ft', '\x8c': 'ft'}
LIGSET = set(LIG)
# Some ligatures are encoded not as a single Unicode glyph but as a char object
# whose .text is the 2-3 letter combo ("ft", "fi", ...) drawn as one glyph.
LIGSTR = {'ff', 'fi', 'fl', 'ffi', 'ffl', 'ft'}


def _is_lig_char(t):
    return (len(t) == 1 and t in LIGSET) or t in LIGSTR or t == '(cid:3)'


# A handful of Secret Wars glyphs come through as unmapped (cid:N); the common one
# is the "ft" ligature. Map that; drop the rest (rare, in description text only).
CID = {'(cid:3)': 'ft'}


def _expand_char(t):
    if t.startswith('(cid:'):
        return CID.get(t, '')
    if len(t) == 1:
        return LIG.get(t, t)
    return t                                        # multi-char ligature already expanded

try:
    from wordfreq import zipf_frequency as _zf
    def _known(w, thr=2.3):
        w = w.strip("'’.,;:!?()[]\"").lower()
        return len(w) <= 2 or _zf(w, 'en') >= thr
except Exception:                                   # pragma: no cover
    def _known(w, thr=2.3):
        return True

Line = namedtuple('Line', 'top size x0 text')


def _expand(tok):
    return ''.join(LIG.get(ch, ch) for ch in tok)


def _resplit(tok):
    """If tok is not a known word but splitting at an internal f-cluster yields two
    known words, split it (repairs word-boundary fi/fl over-merges like 'onfire')."""
    core = tok.strip("'’.,;:!?()[]\"—-")
    if not core or _known(core) or not core.isalpha():
        return tok
    for m in re.finditer(r'f{1,2}', core):
        i = m.start()
        if i == 0:
            continue
        a, b = core[:i], core[i:]
        if _known(a, 3.0) and _known(b, 3.0):
            # preserve any trailing punctuation from tok
            tail = tok[len(tok.rstrip("'’.,;:!?()[]\"—-")):]
            return a + ' ' + b + tail
    return tok


def _dedupe(chars):
    """Bold text in these books is over-printed: each glyph drawn 2-3x at nearly the
    same x ("TThhee"). Drop a char that repeats the previous one at essentially the
    same x on the same line (legit double letters sit a full advance apart)."""
    out = []
    for c in chars:
        if out:
            p = out[-1]
            if (c['text'] == p['text'] and abs(c['top'] - p['top']) < 2
                    and abs(c['x0'] - p['x0']) < max(1.2, (p['x1'] - p['x0']) * 0.6)):
                continue
        out.append(c)
    return out


def words_line(chars):
    """chars: iterable of pdfplumber char dicts on ONE text line. Returns list of
    reconstructed, ligature-expanded, re-split words in reading order."""
    chars = _dedupe(sorted(chars, key=lambda c: c['x0']))
    # units: (expanded_text, is_ligature, is_space)
    units = []
    for c in chars:
        t = c['text']
        if t.strip() == '':
            units.append((' ', False, True))
        else:
            units.append((_expand_char(t), _is_lig_char(t), False))
    toks, cur = [], ''
    n = len(units)
    for i, (txt, lig, sp) in enumerate(units):
        if sp:
            prev_lig = bool(cur) and units[i - 1][1]
            next_lig = False
            for j in range(i + 1, n):
                if not units[j][2]:
                    next_lig = units[j][1]
                    break
            if prev_lig or next_lig:
                continue                            # spurious ligature-adjacent space
            if cur:
                toks.append(cur); cur = ''
        else:
            cur += txt
    if cur:
        toks.append(cur)
    return [_resplit(t) for t in toks]


def _lines_from_chars(chars, ltol=3.2):
    chars = [c for c in chars if c['text'] not in ('', '\n')]
    if not chars:
        return []
    chars.sort(key=lambda c: (round(c['top'] / ltol), c['x0']))
    lines, cur, cy = [], [], None
    for c in chars:
        if cy is None or abs(c['top'] - cy) > ltol:
            if cur:
                lines.append(cur)
            cur = [c]; cy = c['top']
        else:
            cur.append(c)
    if cur:
        lines.append(cur)
    res = []
    for ln in lines:
        txt = ' '.join(words_line(ln))
        txt = re.sub(r'\s+', ' ', txt).strip()
        top = min(c['top'] for c in ln)
        size = max((c.get('size', 0) for c in ln), default=0)
        x0 = min(c['x0'] for c in ln)
        res.append(Line(top, round(size, 1), round(x0, 1), txt))
    return res


def read_columns(page, ncols=2, gutters=None, xmax=600):
    """Split page chars into columns and return [ [Line,...] per column ].
    gutters: list of x cut points (len ncols-1). Defaults tuned for these books
    (2-col body at ~311)."""
    chars = [c for c in page.chars if c['text'] not in ('', '\n') and c.get('upright', True)]
    if gutters is None:
        gutters = [311] if ncols == 2 else []
    bounds = [40] + list(gutters) + [xmax]
    cols = []
    for i in range(ncols):
        lo, hi = bounds[i], bounds[i + 1]
        cc = [c for c in chars if lo <= c['x0'] < hi]
        cols.append(_lines_from_chars(cc))
    return cols


def full_text(page, ncols=2, gutters=None):
    cols = read_columns(page, ncols, gutters)
    return '\n'.join(ln.text for col in cols for ln in col)
