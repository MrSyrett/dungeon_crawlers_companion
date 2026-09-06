#!/usr/bin/env python3
"""Extract Forgotten Adventures (FA) v3 FLOOR + WALL textures into the gated bundle.

Companion to extract-fa.py (objects). Floors come from the seamless RGB `patterns/`
and `tilesets/` folders (the terrain/ RGBA versions have soft-alpha brush edges that
seam when tiled). Walls come from `walls/` — wide tileable strips.

Output goes into the SAME admin-gated bundle folder (protected/asset-packs/fa) and is
MERGED into fa-bundle.json as a pack marked {"tex": true}, so the Map Maker's
loadGatedFA can register them into the floor/wall pickers (no import needed).

Per texture we write:
  • a downsampled tileable webp  (floors capped at FLOOR_MAX px; walls at WALL_MAX wide)
  • a small thumb webp           (the picker swatch)
and a manifest entry:
  floor: {id,name,kind:"floor",file,thumb,cells}
  wall : {id,name,kind:"wall", file,thumb,thick,tile}

cells = round(origW/256)          (FA draws at 256 px/cell)
wall thick = croppedH/256, tile = origW/256   (matches the Map Maker's import path)

Usage: python3 extract-fa-tex.py <in_dir> <out_dir> [pack_glob…]
"""
import struct, io, json, os, re, sys, glob, hashlib, base64
from PIL import Image

def _thumb_data_url(im, q=82):
    buf = io.BytesIO(); im.save(buf, 'WEBP', quality=q, method=4)
    return 'data:image/webp;base64,' + base64.b64encode(buf.getvalue()).decode()

IN_DIR = sys.argv[1] if len(sys.argv) > 1 else '.'
OUT    = sys.argv[2] if len(sys.argv) > 2 else './fa'
GLOBS  = sys.argv[3:] or ['*.dungeondraft_pack']

PX_PER_CELL = 256
FLOOR_MAX   = 1024        # cap the stored tileable floor (keeps the bundle small)
WALL_MAX    = 1536        # cap stored wall strip width
THUMB       = 96
FLOOR_DIRS  = ('/textures/patterns/', '/textures/tilesets/')
WALL_DIRS   = ('/textures/walls/',)

os.makedirs(OUT, exist_ok=True)

def parse(path):
    d = open(path, 'rb').read()
    if d[:4] != b'GDPC': raise SystemExit(f'{path}: not a Godot pack')
    (fmt,) = struct.unpack_from('<I', d, 4); off = 20
    if fmt == 2: off += 12
    off += 16 * 4
    (count,) = struct.unpack_from('<I', d, off); off += 4
    files = []
    for _ in range(count):
        (plen,) = struct.unpack_from('<I', d, off); off += 4
        p = d[off:off+plen].rstrip(b'\x00').decode('utf-8', 'replace'); off += plen
        fo, fs = struct.unpack_from('<QQ', d, off); off += 16
        off += 16
        files.append((p, fo, fs))
    return d, files

def slug(s): return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')

def nice(fn):
    n = re.sub(r'\.(webp|png|jpe?g)$', '', fn.split('/')[-1], flags=re.I)
    n = n.replace('_', ' ').strip()
    return n[:1].upper() + n[1:] if n else n

def save_webp(im, path, q):
    im.save(path, 'WEBP', quality=q, method=4)

def floor_thumb(im):
    s = min(im.width, im.height)
    box = ((im.width-s)//2, (im.height-s)//2, (im.width+s)//2, (im.height+s)//2)
    return im.crop(box).resize((THUMB, THUMB), Image.LANCZOS)

def wall_thumb(im):
    # a representative slice of the strip, scaled to THUMB wide
    w = min(im.width, 256)
    x = (im.width - w)//2
    sl = im.crop((x, 0, x+w, im.height))
    h = max(1, round(sl.height * THUMB / sl.width))
    return sl.resize((THUMB, h), Image.LANCZOS)

paths = []
for g in GLOBS: paths += glob.glob(os.path.join(IN_DIR, g))
paths = sorted(set(paths))
print(f'{len(paths)} pack(s) to process')

new_recs = {}
for pth in paths:
    d, files = parse(pth)
    meta = {'name': os.path.basename(pth), 'id': slug(os.path.basename(pth))}
    j = next((f for f in files if f[0].endswith('/pack.json')), None)
    if j:
        try: meta.update(json.loads(d[j[1]:j[1]+j[2]].decode('utf-8', 'replace')))
        except Exception: pass
    pid = 'fa-tex-' + slug(meta['id'])
    texs = []; seen = set()

    # ── FLOORS ──────────────────────────────────────────────────────────────
    for path, fo, fs in files:
        if not any(k in path for k in FLOOR_DIRS): continue
        fn = path.split('/')[-1]; key = fn.lower()
        if key in seen: continue
        seen.add(key)
        try: im = Image.open(io.BytesIO(d[fo:fo+fs])).convert('RGB')
        except Exception: continue
        cells = max(1, round(im.width / PX_PER_CELL))
        base = im
        if max(im.size) > FLOOR_MAX:
            sc = FLOOR_MAX / max(im.size)
            base = im.resize((round(im.width*sc), round(im.height*sc)), Image.LANCZOS)
        sid = slug(nice(fn))
        ffile = f'{pid}-floor-{sid}.webp'
        save_webp(base, os.path.join(OUT, ffile), 80)
        texs.append({'id': f'fa:{pid}-floor-{sid}', 'name': nice(fn),
                     'kind': 'floor', 'file': ffile, 'thumb': _thumb_data_url(floor_thumb(base)),
                     'cells': cells})

    # ── WALLS ───────────────────────────────────────────────────────────────
    for path, fo, fs in files:
        if not any(k in path for k in WALL_DIRS): continue
        fn = path.split('/')[-1]; key = fn.lower()
        if key in seen: continue
        seen.add(key)
        try: im = Image.open(io.BytesIO(d[fo:fo+fs])).convert('RGBA')
        except Exception: continue
        origW = im.width
        # crop fully-transparent rows top/bottom (matches the client's wall import)
        alpha = im.getchannel('A')
        bbox = alpha.getbbox()
        if bbox: im = im.crop((0, bbox[1], im.width, bbox[3]))
        thick = round(im.height / PX_PER_CELL, 4)
        tile  = round(origW / PX_PER_CELL, 4)
        strip = im
        if im.width > WALL_MAX:
            sc = WALL_MAX / im.width
            strip = im.resize((WALL_MAX, max(1, round(im.height*sc))), Image.LANCZOS)
        sid = slug(nice(fn))
        wfile = f'{pid}-wall-{sid}.webp'
        save_webp(strip, os.path.join(OUT, wfile), 86)
        texs.append({'id': f'fa:{pid}-wall-{sid}', 'name': nice(fn),
                     'kind': 'wall', 'file': wfile, 'thumb': _thumb_data_url(wall_thumb(strip), 86),
                     'thick': thick, 'tile': tile})

    if not texs:
        print(f'  {meta["name"]}: no floor/wall textures found'); continue
    texs.sort(key=lambda e: (e['kind'], e['name']))
    manfile = pid + '.json'
    json.dump({'textures': texs}, open(os.path.join(OUT, manfile), 'w'))
    nf = sum(1 for e in texs if e['kind'] == 'floor'); nw = len(texs) - nf
    new_recs[pid] = {'id': pid, 'name': meta['name'], 'manifest': manfile,
                     'tex': True, 'count': len(texs)}
    print(f'  {meta["name"]}: {nf} floors, {nw} walls')

# merge into the shared index
existing = os.path.join(OUT, 'fa-bundle.json')
merged = {}
if os.path.exists(existing):
    try:
        for p in json.load(open(existing)).get('packs', []):
            if 'manifest' in p: merged[p['id']] = p
    except Exception: pass
merged.update(new_recs)
_h = hashlib.sha1()
for _f in sorted(os.listdir(OUT)):
    if _f.endswith('.webp'):
        _h.update(_f.encode()); _h.update(str(os.path.getsize(f'{OUT}/{_f}')).encode())
index = {'version': _h.hexdigest()[:10],
         'note': 'Forgotten Adventures — personal-use, admin-gated. Not for public serving.',
         'packs': sorted(merged.values(), key=lambda p: p['name'])}
json.dump(index, open(existing, 'w'))
tot = sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT))
print(f'-> {OUT}  ({len(os.listdir(OUT))} files, {tot/1024/1024:.2f} MB, {len(index["packs"])} packs total)')
