#!/usr/bin/env python3
"""Extract the tileable floor and wall textures from Creative-Commons Dungeondraft
packs into public/packs/bundled/ plus a manifest.

Only CC-licensed packs belong here — anything bundled is redistributed by the
site. Packs a user owns privately go through the Map Maker's in-browser import
instead, which keeps them in that browser only.

Usage: python3 extract.py <out_dir>
"""
import struct, io, json, os, re, sys
import numpy as np
from PIL import Image

OUT = sys.argv[1] if len(sys.argv) > 1 else '/root/dcc/public/packs/bundled'
PX_PER_CELL = 128        # floors are resampled to this; 2x the export resolution
OBJ_PER_CELL = 96        # objects a little leaner — they pack into shared atlases
MAX_DIM     = 2048       # …and capped, so a 15x15 tile can't blow up memory
THUMB       = 96         # palette thumbnails
ATLAS       = 2048       # atlas sheet size
# Objects are packed into a few ATLAS sheets rather than written one file each.
# 140 sprites + 140 thumbnails is 280 files, and GitHub's web uploader refuses
# more than 100 at a time — which is how the object art silently failed to ship.
# Atlases also mean one decode and one request instead of hundreds.

# Folders of LOOSE stock art (not Dungeondraft packs). These carry no grid
# metadata at all, so the scale has to be stated: `px_cell` is how many pixels of
# the source art make one grid square. `basic` marks a pack as the set offered in
# NORMAL mode — the Map Maker shows basic packs when Advanced Mode is off and
# every other pack when it is on, so the two sets never mix.
FOLDER_SOURCES = [
    # dir, pack id, display name, credit, px_cell, basic, licence
    ('axebane', 'axb', 'Axebane Fantasy Stock Art', 'Axebane Games', 100, True,
     'CC BY 4.0', 'https://creativecommons.org/licenses/by/4.0/'),
]

SOURCES = [
    # file, pack id, display name, credit   — CC BY-NC 4.0 packs ONLY (see the
    # licensing section of claude/map-maker-advanced-mode.md before adding one)
    ('welcome.pack',     '2mtw', '2MT Welcome',        '2-Minute Tabletop'),
    ('roombuilder.pack', '2mtd', '2MT Room Builder',   '2-Minute Tabletop'),
    ('traps.pack',       '2mtt', '2MT Trap Tokens',    '2-Minute Tabletop'),
    ('building.pack',    '2mtb', '2MT Basic Building', '2-Minute Tabletop'),
    ('cave.pack',        '2mtc', '2MT Cave Room Builder', '2-Minute Tabletop'),
    ('treasure.pack',    '2mtr', '2MT Treasure',       '2-Minute Tabletop'),
    ('furniture.pack',   '2mtf', '2MT Furniture',      '2-Minute Tabletop'),
]
# The same strips appear under BOTH textures/paths/ and textures/walls/ — take one.
# Dungeondraft also ships near-identical Concave/Convex variants of each wall
# (measured mean difference 0.4-2.7 of 255). Keep one.
SKIP_WALL = re.compile(r' - Concave_wall\.', re.I)
# Object sprites we don't want in the palette:
#   "- Colorable"  greyscale masks for Dungeondraft's colour picker, useless here
#   "- End"        wall/path end caps, consumed by the wall tool not placed by hand
#   "Demo"         the pack's marketing render
SKIP_OBJ = re.compile(r'( - Colorable| - End)\.(webp|png|jpe?g)$|Demo\.(webp|png|jpe?g)$', re.I)
# Packs ship their wall kit as loose sprites too — straight runs, inside/outside
# corners, half circles, ribbons, railings. The Map Maker's wall tool draws all
# of that properly from a strip, so these are 60 sprites of pure clutter in the
# object palette. Dropped by NAME because they sit in textures/objects/ like any
# other prop.
# Every pack names its wall kit differently: dungeon packs use "Wall - Straight",
# the cave pack uses "Inside bend"/"Outside bend"/"Wall, short". The separator
# after Wall/Rail is load-bearing — a plain `^Wall\b` also eats real props like
# "Wall buzzsaw", "Wall chomper" and "Wall spikes" from the trap pack.
# Always diff a candidate filter against the full name list before committing.
SKIP_WALL_OBJ = re.compile(r'^(Wall|Rail)\s*[-,]\s|^(Inside|Outside)\s+bend\b|Wall\s+End$', re.I)

def parse(path):
    d = open(path, 'rb').read()
    off = 20 + 16*4
    (count,) = struct.unpack_from('<I', d, off); off += 4
    files = []
    for _ in range(count):
        (plen,) = struct.unpack_from('<I', d, off); off += 4
        p = d[off:off+plen].rstrip(b'\x00').decode('utf-8', 'replace'); off += plen
        fo, fs = struct.unpack_from('<QQ', d, off); off += 16; off += 16
        files.append((p, fo, fs))
    return d, files

def folder_name(fn):
    """barrels1.png -> 'Barrels 1', table_and_chairs1.png -> 'Table and chairs 1'."""
    n = re.sub(r'\.(webp|png|jpe?g)$', '', fn)
    n = n.replace('_', ' ').strip()
    n = re.sub(r'(?<=[a-z])(\d+)$', r' \1', n)        # trailing index gets a space
    return (n[0].upper() + n[1:]) if n else n

def slug(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')

def clean(name, keep_size=False):
    n = re.sub(r'\.(webp|png|jpe?g)$', '', name.split('/')[-1])
    n = re.sub(r'^[a-z0-9]+_', '', n)                 # e.g. "basicbuilding_door - wide"
    if n and n[0].islower():
        n = n[0].upper() + n[1:]
    n = re.sub(r'^Texture\s*-\s*', '', n)
    n = re.sub(r'_wall$', '', n)
    n = re.sub(r'\s*-\s*Convex$', '', n)
    n = re.sub(r'^Dungeon Room Builder\s*-\s*', '', n)
    # Floors/walls drop the "- 15x15" size suffix; objects KEEP their "(4x3)"
    # because it's what tells two otherwise identically-named sprites apart.
    if not keep_size:
        n = re.sub(r'\s*[-(]\s*\d+x\d+\s*\)?$', '', n)
    return n.strip()

os.makedirs(OUT, exist_ok=True)

def pack_shelf(items, size, pad=2):
    """Shelf bin-packer: sort by height, lay rows left to right. Good enough for
    static art and dependency-free. Returns [(sheet_index, x, y), …]."""
    order = sorted(range(len(items)), key=lambda i: -items[i][1])
    places = [None]*len(items)
    sheet = x = y = shelf_h = 0
    for i in order:
        w, h = items[i]
        if w+pad > size or h+pad > size:
            raise SystemExit(f'sprite {w}x{h} does not fit a {size}px atlas')
        if x + w + pad > size:                     # next shelf
            x = 0; y += shelf_h + pad; shelf_h = 0
        if y + h + pad > size:                     # next sheet
            sheet += 1; x = y = shelf_h = 0
        places[i] = (sheet, x, y)
        x += w + pad
        shelf_h = max(shelf_h, h)
    return places

def write_atlas(objs, prefix, key, size, quality):
    """Pack objs[*][key] into `prefix-N.webp` sheets; returns rects per object."""
    boxes = [(o[key].width, o[key].height) for o in objs]
    places = pack_shelf(boxes, size)
    sheets = {}
    for o, (sh, x, y) in zip(objs, places):
        sheets.setdefault(sh, []).append((o, x, y))
    out = []
    for sh, members in sorted(sheets.items()):
        canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        for o, x, y in members:
            canvas.paste(o[key], (x, y))
        canvas.save(f'{OUT}/{prefix}-{sh}.webp', 'WEBP', quality=quality, method=4)
    for o, (sh, x, y) in zip(objs, places):
        out.append({'sheet': f'{prefix}-{sh}.webp', 'x': x, 'y': y,
                    'w': o[key].width, 'h': o[key].height,
                    'sw': size, 'sh': size})     # sheet dims, so CSS can scale a thumb
    return out

pending = []
pack_pending = []
packs = []
# The Welcome pack is a SAMPLER: 40 of its objects are byte-identical copies of
# sprites in the Furniture pack (verified pixel-equal). Bundling both would put 40
# duplicate cells in the palette. Dedupe by cleaned name, keeping the FIRST pack in
# SOURCES order — which is Welcome, so ids already referenced by saved maps
# (bundled:2mtw-obj-bed-pattern-1-d …) keep resolving. Dropping the earlier copy
# instead would silently break every map that used one.
seen_obj = set()
for fname, pid, pname, credit in SOURCES:
    d, files = parse(fname)
    entries = []
    seen_floor = set()
    for path, fo, fs in files:
        blob = d[fo:fo+fs]
        if ('/textures/terrain/' in path or '/textures/patterns/' in path) \
                and clean(path) not in seen_floor:                 # terrain and patterns/ duplicate
            seen_floor.add(clean(path))
            im = Image.open(io.BytesIO(blob)).convert('RGB')
            cells = max(1, round(im.width / 256))
            side = min(MAX_DIM, cells * PX_PER_CELL)
            im = im.resize((side, side), Image.LANCZOS)
            fid = f'{pid}-{slug(clean(path))}'
            im.save(f'{OUT}/{fid}.webp', 'WEBP', quality=88, method=6)
            # Picker swatch: a 2x2-CELL crop, not the whole tile shrunk. A 24x24
            # cell texture scaled into 96 px is unreadable mush; two cells of it
            # actually shows the pattern.
            cs = min(side, max(32, round(2 * side / max(1, cells))))
            sw = im.crop((0, 0, cs, cs)).resize((96, 96), Image.LANCZOS)
            entries.append({'id': f'bundled:{fid}', 'name': clean(path), 'kind': 'floor',
                            'file': f'{fid}.webp', 'cells': cells, '_sw': sw})
        elif '/textures/objects/' in path and not SKIP_OBJ.search(path) \
                and not SKIP_WALL_OBJ.search(clean(path, True)):
            oname = clean(path, True)
            if oname in seen_obj:
                continue                                  # sampler duplicate, see above
            im = Image.open(io.BytesIO(blob)).convert('RGBA')
            wc, hc = im.width/256, im.height/256          # native size in grid cells
            if wc < 0.15 or hc < 0.15:
                continue
            seen_obj.add(oname)
            sc = min(1.0, OBJ_PER_CELL*wc/im.width, MAX_DIM/im.width, MAX_DIM/im.height)
            full = im.resize((max(1,round(im.width*sc)), max(1,round(im.height*sc))), Image.LANCZOS)
            th = im.copy(); th.thumbnail((THUMB, THUMB), Image.LANCZOS)
            pending.append({'id': f'bundled:{pid}-obj-{slug(clean(path, True))}',
                            'name': clean(path, True), 'kind': 'object',
                            'w': round(wc, 3), 'h': round(hc, 3), 'img': full, 'th': th})
        elif '/textures/walls/' in path and re.search(r'\.(webp|png|jpe?g)$', path) \
                and not re.search(r'_end\.(webp|png|jpe?g)$', path) and not SKIP_WALL.search(path):
            im = Image.open(io.BytesIO(blob)).convert('RGBA')
            a = np.asarray(im)
            rows = np.where(a[:, :, 3].mean(axis=1) > 8)[0]     # crop the transparent padding
            if not len(rows):
                continue
            top, bot = int(rows.min()), int(rows.max())
            crop = im.crop((0, top, im.width, bot+1))
            fid = f'{pid}-wall-{slug(clean(path))}'
            crop.save(f'{OUT}/{fid}.webp', 'WEBP', quality=90, method=6)
            slice_w = min(crop.width, round(2.5 * 256))
            sw = crop.crop((0, 0, slice_w, crop.height))
            sw = sw.resize((96, max(6, round(96 * sw.height / sw.width))), Image.LANCZOS)
            entries.append({'id': f'bundled:{fid}', 'name': clean(path), 'kind': 'wall', '_sw': sw,
                            'file': f'{fid}.webp',
                            'thick': round(crop.height/256, 4),   # wall thickness in grid cells
                            'tile':  round(crop.width/256, 4)})   # length of one repeat, in cells
    entries.sort(key=lambda e: (e['kind'], e['name']))
    pack_pending.append((len(packs), pending)); pending = []
    packs.append({'id': pid, 'name': pname, 'credit': credit, 'textures': entries})
    n = lambda k: sum(1 for e in entries if e['kind']==k)
    print(f'{pname}: {n("floor")} floors, {n("wall")} walls, {n("object")} objects')

for folder, pid, pname, credit, px_cell, basic, lic, licurl in FOLDER_SOURCES:
    names = sorted(f for f in os.listdir(folder)
                   if re.search(r'\.(png|webp|jpe?g)$', f, re.I))
    for fn in names:
        im = Image.open(os.path.join(folder, fn)).convert('RGBA')
        wc, hc = im.width/px_cell, im.height/px_cell       # native size in grid cells
        if wc < 0.15 or hc < 0.15:
            continue
        sc = min(1.0, OBJ_PER_CELL*wc/im.width, MAX_DIM/im.width, MAX_DIM/im.height)
        full = im.resize((max(1,round(im.width*sc)), max(1,round(im.height*sc))), Image.LANCZOS)
        th = im.copy(); th.thumbnail((THUMB, THUMB), Image.LANCZOS)
        nice = folder_name(fn)
        pending.append({'id': f'bundled:{pid}-obj-{slug(nice)}', 'name': nice,
                        'kind': 'object', 'w': round(wc, 3), 'h': round(hc, 3),
                        'img': full, 'th': th})
    pack_pending.append((len(packs), pending)); pending = []
    packs.append({'id': pid, 'name': pname, 'credit': credit, 'basic': bool(basic),
                  'license': lic, 'licenseUrl': licurl, 'textures': []})
    print(f'{pname}: {len(names)} objects (loose art @ {px_cell}px/cell)')

# One atlas set across ALL packs, so sheets stay full.
allobjs = [o for _, lst in pack_pending for o in lst]
# Floor/wall swatches ride in the same thumb atlas, so opening a picker costs no
# extra decode — showing the real tiles would be ~85 MB of decoded bitmaps.
swatches = [{'id': e['id'], 'th': e.pop('_sw')}
            for p in packs for e in p['textures'] if '_sw' in e]
if allobjs or swatches:
    allobjs.sort(key=lambda o: o['id'])
    full  = write_atlas(allobjs, 'objects', 'img', ATLAS, 86) if allobjs else []
    thumb = write_atlas(allobjs + swatches, 'objthumbs', 'th', 1024, 82)
    sw_rects = dict(zip([o['id'] for o in allobjs + swatches], thumb))
    for p in packs:
        for e in p['textures']:
            if e['kind'] in ('floor', 'wall'):
                e['thumb'] = sw_rects[e['id']]
    thumb = thumb[:len(allobjs)]
    by_pack = {}
    for o, f, t in zip(allobjs, full, thumb):
        by_pack.setdefault(o['id'].split(':')[1].split('-obj-')[0], []).append(
            {'id': o['id'], 'name': o['name'], 'kind': 'object',
             'w': o['w'], 'h': o['h'], 'atlas': f, 'thumb': t})
    for p in packs:
        p['textures'] = [e for e in p['textures'] if e['kind'] != 'object'] + \
                        sorted(by_pack.get(p['id'], []), key=lambda e: e['name'])
    print(f'atlases: {len(set(f["sheet"] for f in full))} object sheets, '
          f'{len(set(t["sheet"] for t in thumb))} thumb sheets')

# A content hash over the emitted files. The tool appends it to every asset URL
# as ?v=…, so stable names (objects-0.webp never changes name) can't be served
# stale from a browser or CDN cache after a regeneration.
import hashlib
_h = hashlib.sha1()
for _f in sorted(os.listdir(OUT)):
    if _f.endswith('.webp'):
        _h.update(_f.encode()); _h.update(str(os.path.getsize(f'{OUT}/{_f}')).encode())
VERSION = _h.hexdigest()[:10]

manifest = {
    'version': VERSION,
    'note': 'Bundled Creative-Commons map assets. Attribution is REQUIRED and is '
            'rendered statically in the Map Maker sidebar, not from this file.',
    'credits': [{'name': '2-Minute Tabletop', 'url': 'https://2minutetabletop.com/',
                 'license': 'CC BY-NC 4.0',
                 'licenseUrl': 'https://creativecommons.org/licenses/by-nc/4.0/'},
                {'name': 'Axebane Games', 'url': 'https://axebane.com/',
                 'license': 'CC BY 4.0',
                 'licenseUrl': 'https://creativecommons.org/licenses/by/4.0/'}],
    'packs': packs,
}
json.dump(manifest, open(f'{OUT}/bundled.json', 'w'), indent=2)
tot = n = 0
for root, _, fs in os.walk(OUT):
    for f in fs:
        tot += os.path.getsize(os.path.join(root, f)); n += 1
print(f'-> {OUT}  ({n} files, {tot/1024/1024:.2f} MB)')
