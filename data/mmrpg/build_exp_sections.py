"""Extract the data-list sections (New Conditions / Traits / Tags / Powers /
Narrative Powers / Equipment / Vehicles) and the GM tables (Danger Room, Random
Encounters) from the four MMRPG expansion PDFs, using the ligature-repairing
prose reader (expprose).

Body pages here are 2-column, size-9 body with size >=11.5 sub-headers. We read
columns L->R, group each size>=HDR header with the size-9 lines beneath it into a
(header, body) block, then the per-section callers pick/curate the blocks.
"""
import re, sys, json, unicodedata
sys.path.insert(0, 'data/mmrpg')
import pdfplumber
import expprose as XP

BOOKS = {
    'X-Men Expansion':     '/mnt/user-data/uploads/Marvel Multiverse RPG X Men Expansion.pdf',
    'Spider-Verse Expansion': '/mnt/user-data/uploads/Marvel Multiverse RPG Spider verse Expansion.pdf',
    'Avengers Expansion':  '/mnt/user-data/uploads/Marvel Multiverse RPG Avengers Expansion.pdf',
    'Secret Wars':         '/mnt/user-data/uploads/Marvel Multiverse RPG Secret Wars.pdf',
}

HDR = 11.5  # min font size for a sub-header

def caps_key(s):
    """Space/'dup-glyph'-insensitive key for matching bold banners. Bold banner
    glyphs are drawn 2-3x ("NNNEEEWWW TTTAAAGGGSSS"); collapse consecutive dup
    letters (applied to BOTH sides, so real words still self-match)."""
    s = re.sub(r'[^A-Za-z]', '', s or '').upper()
    return re.sub(r'(.)\1+', r'\1', s)

FOOT = re.compile(r'Order #\d|Michael Syrett|^\s*/\d+\s*/|©\s*20\d\d', re.I)

def is_footer(t):
    t = t.strip()
    if not t: return True
    if FOOT.search(t): return True
    if re.fullmatch(r'\d{1,4}', t): return True
    if re.fullmatch(r'[A-Z /]{0,6}\d{1,4}[A-Z /]{0,6}', t): return True
    return False

def blocks(pdf, page_idx, gutters=None, hdr=HDR, body_min=6):
    """Return list of {'header','size','page','col','lines'[...]} for one page.
    A header is any line with size>=hdr that isn't ALL-CAPS banner-only; lines
    below it (size<hdr) accumulate as its body until the next header."""
    pg = pdf.pages[page_idx]
    cols = XP.read_columns(pg, ncols=(len(gutters) + 1) if gutters else 2, gutters=gutters)
    out = []
    for ci, col in enumerate(cols):
        cur = None
        for ln in col:
            if is_footer(ln.text):
                continue
            if ln.size >= hdr:
                if cur: out.append(cur)
                cur = {'header': ln.text, 'size': ln.size, 'page': page_idx, 'col': ci, 'lines': []}
            else:
                if cur is None:
                    cur = {'header': None, 'size': 0, 'page': page_idx, 'col': ci, 'lines': []}
                cur['lines'].append(ln.text)
        if cur: out.append(cur)
    return out

def join_body(lines):
    """Join wrapped body lines into paragraphs, de-hyphenating line breaks."""
    text = ''
    for ln in lines:
        ln = ln.strip()
        if not ln: continue
        if text.endswith('-') and not text.endswith('--'):
            text = text[:-1] + ln
        elif text:
            text += ' ' + ln
        else:
            text = ln
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def find_header_page(pdf, book_page, header_words, window=4):
    """Locate the PDF page index whose top area contains header_words (case-insens),
    searching book_page +/- window (front-matter offset varies per book)."""
    hw = caps_key(header_words)
    for d in range(0, window + 1):
        for idx in ([book_page] if d == 0 else [book_page + d, book_page - d]):
            if idx < 0 or idx >= len(pdf.pages): continue
            pg = pdf.pages[idx]
            # look at the whole page's reconstructed caps text
            txt = caps_key(XP.full_text(pg))
            if hw in txt:
                return idx
    return None

if __name__ == '__main__':
    # smoke test: dump curated blocks for a page
    b = sys.argv[1]; idx = int(sys.argv[2])
    with pdfplumber.open(BOOKS[b]) as pdf:
        for bl in blocks(pdf, idx):
            h = bl['header']
            body = join_body(bl['lines'])
            print('### [%s sz=%.0f col=%d] %s' % (h, bl['size'], bl['col'], (body[:160])))


def page_blocks_stitched(pdf, idx, gutters=None):
    """blocks() for a page, but fold col1's leading header-less lines into the last
    block of col0 (reading order continues bottom-of-col0 -> top-of-col1)."""
    bl = blocks(pdf, idx, gutters=gutters)
    out = []
    for b in bl:
        if b['header'] is None and out and b['col'] > out[-1]['col']:
            out[-1]['lines'] += b['lines']
        else:
            out.append(b)
    return out

BANNER_CAPS = 14.5  # a size>=this all-caps header starts/ends a major section

def slice_section(pdf, start_idx, start_header, stop_headers, max_pages=8, strict_stops=False):
    """Collect (header,size,body) item-blocks from the section whose banner is
    start_header (matched space-insensitively, size>=BANNER_CAPS) through pages.
    By default any new size>=BANNER_CAPS caps banner ends the section; with
    strict_stops=True only a banner in stop_headers ends it (so a big item-name
    sub-banner like "SPIDER-BOTS" doesn't cut the section short)."""
    want = caps_key(start_header)
    stops = [caps_key(s) for s in (stop_headers or [])]
    items = []
    started = False
    for idx in range(start_idx, min(start_idx + max_pages, len(pdf.pages))):
        for b in page_blocks_stitched(pdf, idx):
            h = (b['header'] or '')
            hk = caps_key(h)
            if not started:
                if b['size'] >= BANNER_CAPS and want in hk:
                    started = True
                continue
            if b['size'] >= BANNER_CAPS:
                if any(s in hk for s in stops):
                    return items
                if not strict_stops:
                    return items
                # strict: a big banner that isn't a stop is an item name — keep it
            items.append({'header': h, 'size': b['size'], 'body': join_body(b['lines']), 'page': idx})
    return items

BULLET = '▶▷•◆‣·'

def merge_bullets(items):
    """Fold bullet sub-headers (▶ ...) and header-less blocks into the description
    of the preceding real item. Bullets become '• '-prefixed clauses."""
    out = []
    for it in items:
        h = (it['header'] or '').strip()
        is_bullet = h[:1] in BULLET
        if (is_bullet or h == '') and out:
            frag = h.lstrip(BULLET + ' ').strip()
            piece = (frag + ' ' + it['body']).strip() if frag else it['body']
            if piece:
                out[-1]['body'] = (out[-1]['body'] + ' • ' + piece).strip() if out[-1]['body'] else piece
        else:
            out.append(dict(it))
    return out

def name_items(pdf, start_idx, banner, stops, drop=(), name_max_words=5, strict_stops=False):
    """High-level: slice a name+description section (traits/tags/conditions), fold
    bullets, drop rule headers, and return [{'name','description'}]."""
    raw = merge_bullets(slice_section(pdf, start_idx, banner, stops, strict_stops=strict_stops))
    dropset = {d.lower() for d in drop}
    res = []
    for it in raw:
        name = re.sub(r'\s+', ' ', (it['header'] or '')).strip().rstrip(':').strip()
        if not name or name.lower() in dropset:
            continue
        if len(name.split()) > name_max_words:
            continue
        if not name[0].isalpha():
            continue
        desc = re.sub(r'\s+', ' ', it['body']).strip()
        res.append({'name': name, 'description': desc})
    return res
