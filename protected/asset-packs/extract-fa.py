#!/usr/bin/env python3
"""Extract Forgotten Adventures (FA) v3 Dungeondraft packs into a REFINED, atlased
asset bundle for the Map Maker — objects only (textures come later).

FA art is licensed for personal use, NOT redistribution, so the output is served
from the app's PRIVATE, admin-gated store (protected/asset-packs/fa, mirroring
protected/rulebooks) via /api/asset-packs — never from public/.

What "refined" means here:
  • objects are downsampled to OBJ_PER_CELL px/cell and packed into shared WebP atlases
    (one decode + one request for the whole palette, like the bundled 2MT set);
  • the colour word is KEPT in each sprite's name (e.g. "… Metal Black A1"), so the
    Map Maker's colour-variant grouping collapses the five colours of one prop into a
    single palette cell with swatches — no per-sprite metadata needed;
  • FA "Colorable" props (neutral bases meant to be tinted in Dungeondraft, which live
    in a colorable64/ folder) are flagged colorable:true for the runtime tint picker.

Run it on the packs you can process locally and drop the output into
protected/asset-packs/fa/ (merge — it's one shared atlas set per run, so re-run with
ALL packs you want bundled together, or keep per-batch subfolders and merge manifests).

Usage: python3 extract-fa.py <in_dir_of_.dungeondraft_pack> <out_dir> [pack_glob…]
       e.g. python3 extract-fa.py "S:/TTRPGS/.../Forgotten Adventures" ./fa "*Furniture*" "*Decor*"
"""
import struct, io, json, os, re, sys, glob, hashlib
from PIL import Image

IN_DIR  = sys.argv[1] if len(sys.argv) > 1 else '.'
OUT     = sys.argv[2] if len(sys.argv) > 2 else './fa-bundle'
GLOBS   = sys.argv[3:] or ['*.dungeondraft_pack']

PX_PER_CELL = 256          # FA v3 draws every object at 256 px per grid cell (verified)
OBJ_PER_CELL = 96          # …downsampled to match the bundled 2MT objects
MAX_DIM     = 2048
THUMB       = 96
ATLAS       = 2048

# Marketing renders / previews FA sometimes ships in the objects folder.
SKIP_OBJ = re.compile(r'(_preview|_demo|/preview|/demo)\b', re.I)

os.makedirs(OUT, exist_ok=True)

def parse(path):
    d = open(path, 'rb').read()
    if d[:4] != b'GDPC':
        raise SystemExit(f'{path}: not a Godot pack')
    (fmt,) = struct.unpack_from('<I', d, 4)
    off = 20
    if fmt == 2:
        off += 12                       # Godot 4: pack flags + file base
    off += 16 * 4                       # reserved
    (count,) = struct.unpack_from('<I', d, off); off += 4
    files = []
    for _ in range(count):
        (plen,) = struct.unpack_from('<I', d, off); off += 4
        p = d[off:off+plen].rstrip(b'\x00').decode('utf-8', 'replace'); off += plen
        fo, fs = struct.unpack_from('<QQ', d, off); off += 16
        off += 16                       # md5
        files.append((p, fo, fs))
    return d, files

def nice_name(fn):
    """Beast_Bone_Bloody_Pile_A10_1x2.webp -> 'Beast Bone Bloody Pile A10' (colour word kept)."""
    n = re.sub(r'\.(webp|png|jpe?g)$', '', fn.split('/')[-1])
    n = re.sub(r'_\d+x\d+$', '', n)                 # drop the grid-size suffix
    n = n.replace('_', ' ').strip()
    return n[:1].upper() + n[1:] if n else n

def is_colorable(path):
    return bool(re.search(r'(^|[ _/])colorable(\d*)([ _/]|$)', path, re.I))

def pack_shelf(items, size, pad=2):
    order = sorted(range(len(items)), key=lambda i: -items[i][1])
    places = [None]*len(items); sheet = x = y = shelf_h = 0
    for i in order:
        w, h = items[i]
        if w+pad > size or h+pad > size:
            raise SystemExit(f'sprite {w}x{h} does not fit a {size}px atlas')
        if x + w + pad > size: x = 0; y += shelf_h + pad; shelf_h = 0
        if y + h + pad > size: sheet += 1; x = y = shelf_h = 0
        places[i] = (sheet, x, y); x += w + pad; shelf_h = max(shelf_h, h)
    return places

def write_atlas(objs, prefix, key, size, quality):
    boxes = [(o[key].width, o[key].height) for o in objs]
    places = pack_shelf(boxes, size)
    sheets = {}
    for o, (sh, x, y) in zip(objs, places):
        sheets.setdefault(sh, []).append((o, x, y))
    for sh, members in sorted(sheets.items()):
        canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        for o, x, y in members:
            canvas.paste(o[key], (x, y))
        canvas.save(f'{OUT}/{prefix}-{sh}.webp', 'WEBP', quality=quality, method=4)
    out = []
    for o, (sh, x, y) in zip(objs, places):
        out.append({'sheet': f'{prefix}-{sh}.webp', 'x': x, 'y': y,
                    'w': o[key].width, 'h': o[key].height, 'sw': size, 'sh': size})
    return out

def slug(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')

packs = []
allobjs = []
paths = []
for g in GLOBS:
    paths += glob.glob(os.path.join(IN_DIR, g))
paths = sorted(set(paths))
print(f'{len(paths)} pack(s) to process')

for pth in paths:
    d, files = parse(pth)
    meta = {'name': os.path.basename(pth), 'id': slug(os.path.basename(pth))}
    j = next((f for f in files if f[0].endswith('/pack.json')), None)
    if j:
        try: meta.update(json.loads(d[j[1]:j[1]+j[2]].decode('utf-8', 'replace')))
        except Exception: pass
    pid = 'fa-' + slug(meta['id'])
    seen = set(); count = 0
    for path, fo, fs in files:
        if '/textures/objects/' not in path: continue
        if SKIP_OBJ.search(path): continue
        fn = path.split('/')[-1]
        key = fn.lower()
        if key in seen: continue
        seen.add(key)
        try:
            im = Image.open(io.BytesIO(d[fo:fo+fs])).convert('RGBA')
        except Exception:
            continue
        wc, hc = im.width/PX_PER_CELL, im.height/PX_PER_CELL
        if wc < 0.15 or hc < 0.15: continue
        sc = min(1.0, OBJ_PER_CELL*wc/im.width, MAX_DIM/im.width, MAX_DIM/im.height)
        full = im.resize((max(1, round(im.width*sc)), max(1, round(im.height*sc))), Image.LANCZOS)
        th = im.copy(); th.thumbnail((THUMB, THUMB), Image.LANCZOS)
        rec = {'id': f'fa:{pid}-obj-{slug(nice_name(fn))}', 'name': nice_name(fn),
               'kind': 'object', 'w': round(wc, 3), 'h': round(hc, 3),
               'img': full, 'th': th, '_pid': pid}
        if is_colorable(path): rec['colorable'] = True
        allobjs.append(rec); count += 1
    packs.append({'id': pid, 'name': meta['name'], 'credit': 'Forgotten Adventures',
                  'license': 'Personal use — admin-gated, not redistributed'})
    print(f'  {meta["name"]}: {count} objects')

if not allobjs:
    raise SystemExit('no objects found')

# INCREMENTAL & ADDITIVE. Each pack is atlased into its OWN sheets, prefixed by pack
# id, and MERGED into any existing fa-bundle.json — so you can bake pack-by-pack and
# just commit the new sheets + the updated manifest, without re-baking or disturbing
# packs already deployed. Texture ids are name-slug-stable, so saved maps keep resolving.
from collections import defaultdict
by_pid = defaultdict(dict)
for o in allobjs:
    by_pid[o['_pid']].setdefault(o['id'], o)     # dedupe by id within a pack

new_recs = {}
for p in packs:
    objs = sorted(by_pid[p['id']].values(), key=lambda o: o['id'])
    if not objs:
        continue
    pre = p['id']                                # e.g. fa-fa-objects-a-v3-51-07
    # clear this pack's old sheets so a re-bake never leaves orphans
    for _f in os.listdir(OUT):
        if _f.startswith(pre + '-obj-') or _f.startswith(pre + '-th-'):
            os.remove(os.path.join(OUT, _f))
    full  = write_atlas(objs, pre + '-obj', 'img', ATLAS, 86)
    thumb = write_atlas(objs, pre + '-th', 'th', 1024, 82)
    texs = []
    for o, f, t in zip(objs, full, thumb):
        e = {'id': o['id'], 'name': o['name'], 'kind': 'object', 'w': o['w'], 'h': o['h'],
             'atlas': f, 'thumb': t}
        if o.get('colorable'): e['colorable'] = True
        texs.append(e)
    p['textures'] = sorted(texs, key=lambda e: e['name'])
    new_recs[p['id']] = p
    print(f'  atlased {p["name"]}: {len(objs)} objects, {len(set(f["sheet"] for f in full))} sheets')

# Merge with packs from earlier runs (keep theirs, replace/add ours).
merged = {}
existing = os.path.join(OUT, 'fa-bundle.json')
if os.path.exists(existing):
    try:
        for p in json.load(open(existing)).get('packs', []):
            merged[p['id']] = p
    except Exception:
        pass
merged.update(new_recs)

_h = hashlib.sha1()
for _f in sorted(os.listdir(OUT)):
    if _f.endswith('.webp'):
        _h.update(_f.encode()); _h.update(str(os.path.getsize(f'{OUT}/{_f}')).encode())
manifest = {'version': _h.hexdigest()[:10],
            'note': 'Forgotten Adventures — personal-use, admin-gated. Not for public serving.',
            'packs': sorted(merged.values(), key=lambda p: p['name'])}
json.dump(manifest, open(existing, 'w'))
tot = sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT))
print(f'-> {OUT}  ({len(os.listdir(OUT))} files, {tot/1024/1024:.2f} MB, '
      f'{len(manifest["packs"])} packs total)')
