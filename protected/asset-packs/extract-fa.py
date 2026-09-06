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
from PIL import Image, ImageStat

IN_DIR  = sys.argv[1] if len(sys.argv) > 1 else '.'
OUT     = sys.argv[2] if len(sys.argv) > 2 else './fa-bundle'
GLOBS   = sys.argv[3:] or ['*.dungeondraft_pack']

PX_PER_CELL = 256          # FA v3 draws every object at 256 px per grid cell (verified)
OBJ_PER_CELL = 96          # …downsampled to match the bundled 2MT objects
MAX_DIM     = 2048
# Big atlases keep the FILE COUNT low so the bundle is a handful of sheets to commit
# (a whole pack is ~5–10 sheets, not ~70). Thumbnails reuse the object sheet — the
# 96 px sprites are already palette-sized — so there are no separate thumb files.
ATLAS       = 4096

# Marketing renders / previews FA sometimes ships in the objects folder.
SKIP_OBJ = re.compile(r'(_preview|_demo|/preview|/demo)\b', re.I)
# Colour tokens (same set the Map Maker uses) — a colour-variant set collapses to one.
COLOR_WORDS = ("black white grey gray brown red orange yellow green blue teal cyan purple "
               "violet pink gold silver bronze copper crimson azure ivory tan dark light "
               "ashen rusty rust").split()

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
        try:
            _m = ImageStat.Stat(full.convert('RGB'), mask=full.getchannel('A')).mean
            lum = 0.299*_m[0] + 0.587*_m[1] + 0.114*_m[2]
            _mx, _mn = max(_m), min(_m)
            sat = (_mx - _mn) / _mx if _mx > 0 else 0        # 0 = neutral grey
        except Exception:
            lum, sat = 0, 0
        rec = {'id': f'fa:{pid}-obj-{slug(nice_name(fn))}', 'name': nice_name(fn),
               'kind': 'object', 'w': round(wc, 3), 'h': round(hc, 3),
               'img': full, '_pid': pid, 'lum': lum, 'sat': sat}
        if is_colorable(path): rec['colorable'] = True
        allobjs.append(rec); count += 1
    packs.append({'id': pid, 'name': meta['name'], 'credit': 'Forgotten Adventures',
                  'license': 'Personal use — admin-gated, not redistributed'})
    print(f'  {meta["name"]}: {count} objects')

if not allobjs:
    raise SystemExit('no objects found')

# ── AUTO-REDUCTION ──────────────────────────────────────────────────────────
# The packs carry far more than anyone uses (the same prop in 6 finishes, the same
# thing sculpted 35 times). Two automatic cuts get each pack toward ~10-20%, and a
# curation page does the final hand-trim:
#   1. FINISH COLLAPSE — a set of finish variants (colour OR material: Black/Bronze,
#      Slate/Sandstone/Volcanic, …) becomes ONE tintable base — the most NEUTRAL one,
#      which multiply-tints cleanly to any colour in the Map Maker.
#   2. SCULPT CAP — keep at most SCULPT_CAP of any "same thing, many variations" set.
# FA's own "Colorable" props are already single tintable bases (red-mask), kept as-is.
SCULPT_CAP = int(os.environ.get('FA_SCULPT_CAP', '8'))
_VAR_RE = re.compile(r' ([A-Za-z]?\d+)$')      # trailing variant token, e.g. " A10"

def _strip_variant(name):
    return _VAR_RE.sub('', name).strip()

def _split_head_idx(name):
    m = _VAR_RE.search(name)
    return (name[:m.start()], name[m.start():]) if m else (name, '')

# Data-driven FINISH detection: seed with the known colour words, then learn any token
# that appears as the varying last-word across 2+ different "sculpt families". Colours
# and materials (slate, sandstone, volcanic, oak, brass, …) recur that way; genuine
# shape words (tall, wide) usually don't, so they're left alone.
def detect_finishes(objs, seed):
    from collections import defaultdict
    lastby = defaultdict(set)
    for o in objs:
        toks = _strip_variant(o['name']).split()
        if len(toks) < 2: continue
        lastby[' '.join(toks[:-1]).lower()].add(toks[-1].lower())
    cnt = defaultdict(int)
    for lasts in lastby.values():
        if len(lasts) >= 2:
            for w in lasts: cnt[w] += 1
    fin = set(seed)
    for w, c in cnt.items():
        # Only learn real finish WORDS. Short letter-codes (a, b, ab, ac, a1…) are sculpt
        # VARIANT markers, not finishes — learning them collapsed every variant into one
        # base (beds → "Double Bed", stoves → 2). Skip anything ≤2 letters (+opt digits).
        if c >= 2 and not re.fullmatch(r'[a-z]{1,2}\d*', w): fin.add(w)
    return fin

# Materials that are FINISHES (a recolourable surface), NOT sculpt identity. These are
# removed wherever they appear so e.g. "Basin Stone Slate" and "Basin Stone Sandstone"
# collapse to one "Basin Stone". "Stone"/"Wood" themselves are categories — NOT removed.
MATERIAL_WORDS = ("earthy earthen slate sandstone volcanic redrock marble granite "
                  "oak pine birch walnut mahogany ebony ashen brass iron steel").split()
_STRIP = ('colorable', 'f')     # FA markers removed for grouping ('F' precedes 'Runner')

def reduce_objects(objs):
    # Michael's rule: NEVER remove anything colorable. FA colorable (redmask) sprites
    # bypass finish-collapse AND the sculpt-cap entirely — every distinct colorable file is
    # kept, so all pattern/blanket/base-colour variants (Double Bed A, A_AB, A_AC, B, …)
    # survive for curation. Only NON-colorable objects go through the reducer below.
    colorable = [o for o in objs if o.get('colorable')]
    for o in colorable:
        o['tintable'] = True; o['tintMode'] = 'redmask'
    objs = [o for o in objs if not o.get('colorable')]
    finishes = detect_finishes(objs, [w.lower() for w in COLOR_WORDS]) | set(MATERIAL_WORDS)
    def _tint_score(o):
        lg = min(1.0, o.get('lum', 0) / 150.0)
        return (1.0 - o.get('sat', 0)) * (0.4 + 0.6 * lg)     # neutral (low-sat) & light enough
    # 1) FINISH COLLAPSE. Key = name with every finish token removed (anywhere in the
    #    name), plus FA markers, keeping the variant index. Every colour/material variant
    #    of one sculpt+variant lands in the same group; a group of 2+ collapses to ONE
    #    tintable base. Pick order: FA colorable > Slate (Michael's stone rule) > most
    #    neutral. Names ending up finish-free read generically ("Basin Stone A1 Full").
    def _key(name):
        head, idx = _split_head_idx(name)
        kt = [t for t in head.split() if t.lower() not in finishes and t.lower() not in _STRIP]
        return (' '.join(kt) + idx).strip()
    groups = {}
    for o in objs:
        k = _key(o['name'])
        gk = (o['_pid'], k.lower())
        if gk not in groups: groups[gk] = {'key': k, 'm': []}
        groups[gk]['m'].append(o)
    kept = []
    for g in groups.values():
        members = g['m']
        if len(members) == 1:
            o = members[0]
            if o.get('colorable'): o['tintable'] = True; o['tintMode'] = 'redmask'
            kept.append(o); continue
        reds   = [o for o in members if o.get('colorable')]
        slates = [o for o in members if ' slate' in (' ' + o['name'].lower())]
        if reds:
            best, mode = reds[0], 'redmask'
        elif slates:
            best, mode = max(slates, key=_tint_score), 'multiply'
        else:
            best, mode = max(members, key=_tint_score), 'multiply'
        best['tintable'] = True; best['tintMode'] = mode
        best['name'] = g['key']
        best['id']   = f"fa:{best['_pid']}-obj-{slug(g['key'])}"
        kept.append(best)
    # 2) sculpt cap (lowest variant indices first). NEVER cap COLORABLE items — Michael's
    #    rule: don't remove anything colorable. FA colorable (redmask) bases always survive;
    #    only the non-colorable sculpt variants are capped at SCULPT_CAP.
    def _is_colorable(o):
        return o.get('tintMode') == 'redmask' or o.get('colorable')
    sgroups = {}
    for o in kept:
        sgroups.setdefault((o['_pid'], _strip_variant(o['name']).lower()), []).append(o)
    def _vnum(o):
        m = re.search(r'(\d+)$', o['name']); return int(m.group(1)) if m else 0
    final = []
    for members in sgroups.values():
        members.sort(key=_vnum)
        final.extend(members[:SCULPT_CAP])
    return colorable + final                  # colorable (all, uncapped) + reduced non-colorable

_before = len(allobjs)
allobjs = reduce_objects(allobjs)
print(f'auto-reduced {_before} -> {len(allobjs)} objects '
      f'({100*len(allobjs)/_before:.0f}%; finish-collapse + sculpt-cap {SCULPT_CAP})')

# ── CURATION KEEP-LIST ──────────────────────────────────────────────────────
# FA_KEEP=<keep-list.json> (exported by the curation page) bakes ONLY the assets
# you kept, and applies your per-asset tint choices: an id in `tint` gets that mode
# (multiply / redmask); a kept id NOT in `tint` had its tint toggled off → plain.
KEEP = os.environ.get('FA_KEEP')
if KEEP:
    kl = json.load(open(KEEP))
    keepset = set(kl.get('keep', []))
    tintmap = kl.get('tint', {})
    allobjs = [o for o in allobjs if o['id'] in keepset]
    for o in allobjs:
        mode = tintmap.get(o['id'])
        if mode:
            o['tintable'] = True; o['tintMode'] = mode
        else:
            o.pop('tintable', None); o.pop('tintMode', None)
    print(f'keep-list applied: {len(allobjs)} kept (of {len(keepset)} requested), '
          f'{sum(1 for o in allobjs if o.get("tintable"))} tintable')

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
    full = write_atlas(objs, pre + '-obj', 'img', ATLAS, 86)
    # SLIM per-texture entries (drop constant kind/sw/sh; thumb reuses the atlas rect
    # client-side) — the manifest would otherwise blow past the 20 MB commit limit.
    texs = []
    for o, f in zip(objs, full):
        e = {'id': o['id'], 'name': o['name'], 'w': o['w'], 'h': o['h'],
             'atlas': {'s': f['sheet'], 'x': f['x'], 'y': f['y'], 'w': f['w'], 'h': f['h']}}
        if o.get('tintable'):
            e['tintable'] = True
            e['tm'] = o.get('tintMode', 'multiply')     # 'multiply' (lightest base) | 'redmask' (FA Colorable)
        texs.append(e)
    texs.sort(key=lambda e: e['name'])
    # each pack's textures live in their OWN file — keeps every file small + scalable
    manfile = pre + '.json'
    json.dump({'textures': texs}, open(os.path.join(OUT, manfile), 'w'))
    new_recs[p['id']] = {'id': p['id'], 'name': p['name'], 'manifest': manfile,
                         'count': len(texs),
                         'colorable': sum(1 for e in texs if e.get('colorable'))}
    print(f'  atlased {p["name"]}: {len(objs)} objects, {len(set(f["sheet"] for f in full))} sheets')

# The INDEX (fa-bundle.json) just lists packs + their per-pack manifest files. Merge
# with packs from earlier runs (keep theirs, replace/add ours).
merged = {}
existing = os.path.join(OUT, 'fa-bundle.json')
if os.path.exists(existing):
    try:
        for p in json.load(open(existing)).get('packs', []):
            if 'manifest' in p: merged[p['id']] = p   # ignore any legacy embedded packs
    except Exception:
        pass
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
print(f'-> {OUT}  ({len(os.listdir(OUT))} files, {tot/1024/1024:.2f} MB, '
      f'{len(index["packs"])} packs total)')
