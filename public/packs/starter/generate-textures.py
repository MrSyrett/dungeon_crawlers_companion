"""Seamless, self-made floor/background tiles for Map Maker Advanced Mode.
Every tile is 512x512 = 4x4 grid cells (128 px per cell) and wraps on a torus.
Palette matches the tool: parchment floor #f4efe3, ink #14120d."""
import numpy as np
from PIL import Image, ImageFilter

S = 512; CELLS = 4
rng = np.random.default_rng(7)
YY, XX = np.mgrid[0:S, 0:S].astype(np.float32)

def hexc(h):
    h = h.lstrip('#'); return np.array([int(h[i:i+2], 16) for i in (0, 2, 4)], np.float32)

INK      = hexc('#14120d')
PARCH    = hexc('#f4efe3')

def torus_d(px, py):
    """distance from every pixel to point (px,py) with wrap-around"""
    dx = np.abs(XX - px); dx = np.minimum(dx, S - dx)
    dy = np.abs(YY - py); dy = np.minimum(dy, S - dy)
    return np.sqrt(dx*dx + dy*dy)

def voronoi(n, jitter=0.42, seed=0):
    """returns (d1, d2, owner) on the torus for an n x n jittered grid"""
    r = np.random.default_rng(seed)
    step = S / n
    pts = []
    for j in range(n):
        for i in range(n):
            pts.append(((i + 0.5 + r.uniform(-jitter, jitter)) * step,
                        (j + 0.5 + r.uniform(-jitter, jitter)) * step))
    d1 = np.full((S, S), 1e9, np.float32); d2 = np.full((S, S), 1e9, np.float32)
    own = np.zeros((S, S), np.int32)
    for k, (px, py) in enumerate(pts):
        d = torus_d(px, py)
        closer = d < d1
        d2 = np.where(closer, d1, np.minimum(d2, d))
        own = np.where(closer, k, own); d1 = np.where(closer, d, d1)
    return d1, d2, own, len(pts)

def tile3(a):
    """3x3 tiling of a SxS array"""
    return np.tile(a, (3, 3))

def center(a):
    """crop the middle SxS tile back out of a 3Sx3S array"""
    return a[S:2*S, S:2*S]

def fbm(octaves=4, base=6, seed=0, persist=0.5):
    """Seamless value noise. Each octave is generated at low res, tiled 3x3,
    upscaled, then centre-cropped — so the interpolation kernel sees the real
    wrapped neighbours and the tile joins itself exactly."""
    r = np.random.default_rng(seed)
    out = np.zeros((S, S), np.float32); amp = 1.0; tot = 0.0
    for o in range(octaves):
        n = base * (2 ** o)
        g = r.random((n, n)).astype(np.float32)
        big = Image.fromarray((tile3(g) * 255).astype(np.uint8)).resize((3*S, 3*S), Image.BICUBIC)
        out += center(np.asarray(big, np.float32) / 255) * amp
        tot += amp; amp *= persist
    out /= tot
    return (out - out.min()) / (np.ptp(out) + 1e-6)

def grain(strength, seed=0, blur=1.2):
    """Wrap-safe grain: blur across a 3x3 tiling so the blur kernel never sees
    a clamped edge, then centre-crop."""
    g = np.random.default_rng(seed).normal(0, 1, (S, S)).astype(np.float32)
    big = Image.fromarray((tile3(g) * 40 + 128).clip(0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(blur))
    return (center(np.asarray(big, np.float32)) - 128) / 128 * strength

def ink_lines(edge, softness=1.0):
    """edge: 0..1 where 1 = on a joint. returns alpha for the ink line"""
    a = np.clip(edge, 0, 1) ** softness
    return a

def compose(base_rgb, line_alpha, line_col=INK, line_str=0.85):
    img = base_rgb.copy()
    a = (line_alpha * line_str)[..., None]
    return img * (1 - a) + line_col * a

def save(name, arr):
    Image.fromarray(arr.clip(0, 255).astype(np.uint8)).save(f'/root/tex/{name}.png')
    print('  ', name)

def tint(owner, npts, seed, lo, hi):
    """per-cell brightness jitter"""
    r = np.random.default_rng(seed)
    lut = r.uniform(lo, hi, npts + 1).astype(np.float32)
    return lut[owner]

print('generating floors:')

# ── 1. Flagstone — big irregular slabs ────────────────────────────────
d1, d2, own, n = voronoi(6, 0.45, seed=11)
joint = np.clip(1 - (d2 - d1) / 7.0, 0, 1) ** 2.2
base = PARCH * (tint(own, n, 3, 0.90, 1.0)[..., None])
base = base * (1 + grain(0.05, 1)[..., None]) * (1 - 0.05 * fbm(4, 5, 21)[..., None])
save('floor-flagstone', compose(base, ink_lines(joint), line_str=0.8))

# ── 2. Cobble — small rounded stones ──────────────────────────────────
d1, d2, own, n = voronoi(11, 0.40, seed=5)
joint = np.clip(1 - (d2 - d1) / 4.0, 0, 1) ** 1.8
dome = np.clip(1 - d1 / 22.0, 0, 1)                    # slight rounding shade
base = PARCH * (tint(own, n, 9, 0.86, 1.0)[..., None]) * (0.93 + 0.10 * dome)[..., None]
base = base * (1 + grain(0.05, 2)[..., None])
save('floor-cobble', compose(base, ink_lines(joint), line_str=0.75))

# ── 3. Planks — long boards, half-cell wide, butt joints every 2 cells ─
board_h = S // (CELLS * 2)                              # 64 px = half a cell
row = (YY // board_h).astype(np.int32)
r = np.random.default_rng(17)
segw = S // 2                                           # 256 px = 2 cells per board
offs = (r.integers(0, 4, row.max() + 2) * (segw // 4))  # stagger, keeps the wrap
seam_x = ((XX + offs[row]) % S) % segw
joint = np.clip(1 - np.minimum(seam_x, segw - seam_x) / 2.0, 0, 1)
edge_y = YY % board_h
joint = np.maximum(joint, np.clip(1 - np.minimum(edge_y, board_h - edge_y) / 1.8, 0, 1))
WOOD = hexc('#c9ab7f')
# grain runs ALONG the board: stretch the noise horizontally
streak = np.asarray(Image.fromarray((tile3(np.random.default_rng(33).random((CELLS*2, 96)).astype(np.float32)) * 255)
                                    .astype(np.uint8)).resize((3*S, 3*S), Image.BICUBIC), np.float32)
streak = center(streak) / 255
base = WOOD * (0.86 + 0.24 * r.uniform(0, 1, row.max() + 2)[row])[..., None]
base = base * (1 - 0.13 * streak[..., None]) * (1 + grain(0.03, 3)[..., None])
save('floor-planks', compose(base, ink_lines(joint), line_str=0.7))

# ── 4. Tile — neat squares, half-cell, offset rows ────────────────────
t = S // (CELLS * 2)
ox = ((YY // t).astype(np.int32) % 2) * (t // 2)
fx = ((XX + ox) % S) % t; fy = YY % t
joint = np.maximum(np.clip(1 - np.minimum(fx, t - fx) / 2.0, 0, 1),
                   np.clip(1 - np.minimum(fy, t - fy) / 2.0, 0, 1))
idx = ((((XX + ox) % S) // t).astype(np.int32) * 31 + (YY // t).astype(np.int32) * 17) % 97
base = PARCH * (0.93 + 0.07 * np.random.default_rng(4).uniform(0, 1, 97)[idx])[..., None]
base = base * (1 + grain(0.035, 4)[..., None])
save('floor-tile', compose(base, ink_lines(joint), line_str=0.7))

# ── 5. Cavern — organic rock, no joints, just cracks ──────────────────
d1, d2, own, n = voronoi(9, 0.5, seed=23)
crack = np.clip(1 - (d2 - d1) / 3.0, 0, 1) ** 3.0
mott = fbm(5, 4, 41)
CAVE = hexc('#e7dfcc')
base = CAVE * (0.90 + 0.16 * mott)[..., None] * (1 + grain(0.06, 5)[..., None])
save('floor-cavern', compose(base, ink_lines(crack), line_str=0.45))

# ── 6. Sand — near-plain, just tooth ──────────────────────────────────
base = PARCH * (0.975 + 0.05 * fbm(5, 8, 51))[..., None] * (1 + grain(0.045, 6)[..., None])
save('floor-sand', base)

print('generating backgrounds:')
# ── bg: rough dark rock ───────────────────────────────────────────────
d1, d2, own, n = voronoi(7, 0.5, seed=61)
crack = np.clip(1 - (d2 - d1) / 3.5, 0, 1) ** 2.5
DARK = hexc('#232833')
base = DARK * (0.82 + 0.36 * fbm(5, 4, 62))[..., None] * (1 + grain(0.10, 7)[..., None])
save('bg-rock-dark', compose(base, ink_lines(crack), line_col=hexc('#0d1016'), line_str=0.55))

# ── bg: rough light rock (parchment-toned) ────────────────────────────
base = hexc('#efe8d7') * (0.88 + 0.20 * fbm(5, 4, 72))[..., None] * (1 + grain(0.07, 8)[..., None])
save('bg-rock-light', compose(base, ink_lines(crack), line_col=hexc('#8b8271'), line_str=0.42))
