"""Seamless horizontal wall strips for Map Maker Advanced Mode.
Each strip is 1024 x 64 and tiles along X. It is drawn as the wall band ONLY
(no transparent padding) so the renderer can stretch it to whatever world
thickness the manifest declares."""
import numpy as np
from PIL import Image, ImageFilter

Wd, Ht = 1024, 64
YY, XX = np.mgrid[0:Ht, 0:Wd].astype(np.float32)

def hexc(h):
    h=h.lstrip('#'); return np.array([int(h[i:i+2],16) for i in (0,2,4)], np.float32)

def wgrain(strength, seed, blur=1.0):
    """wrap-safe on X (tile 3x horizontally), clamped on Y (edges are the faces)"""
    g = np.random.default_rng(seed).normal(0,1,(Ht,Wd)).astype(np.float32)
    big = Image.fromarray((np.tile(g,(1,3))*40+128).clip(0,255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(blur))
    return (np.asarray(big,np.float32)[:, Wd:2*Wd]-128)/128*strength

def courses(course_h, block_w, stagger, seed, joint_px=2.0):
    """brick joints: returns (joint alpha, per-block index)"""
    r = np.random.default_rng(seed)
    row = (YY//course_h).astype(np.int32)
    nrows = int(np.ceil(Ht/course_h))+1
    off = (r.integers(0,4,nrows)*(block_w//4))[row] if stagger else 0
    bx = ((XX+off) % Wd) % block_w
    j = np.clip(1-np.minimum(bx, block_w-bx)/joint_px, 0, 1)
    ey = YY % course_h
    j = np.maximum(j, np.clip(1-np.minimum(ey, course_h-ey)/(joint_px*0.9), 0, 1))
    idx = ((((XX+off)%Wd)//block_w).astype(np.int32)*37 + row*13) % 101
    return j, idx, r

def edges(outer_px=7.0, inner_px=5.0):
    """darken the two long faces: the OUTER face (top) heavier than the inner"""
    top = np.clip(1-YY/outer_px, 0, 1)
    bot = np.clip(1-(Ht-1-YY)/inner_px, 0, 1)
    return top, bot

def build(name, base_hex, course_h, block_w, seed, tone=(0.88,1.06), joint=0.8, warm=False):
    j, idx, r = courses(course_h, block_w, True, seed)
    base = hexc(base_hex) * r.uniform(tone[0], tone[1], 101)[idx][...,None]
    base = base * (1 + wgrain(0.05, seed+1)[...,None])
    if warm:   # timber: lengthwise streaks instead of speckle
        st = np.asarray(Image.fromarray((np.tile(np.random.default_rng(seed+2).random((6,160)).astype(np.float32),(1,3))*255)
                        .astype(np.uint8)).resize((3*Wd,Ht), Image.BICUBIC), np.float32)[:, Wd:2*Wd]/255
        base = base*(1-0.14*st[...,None])
    ink = hexc('#14120d')
    a = (np.clip(j,0,1)*joint)[...,None]
    img = base*(1-a) + ink*a
    top, bot = edges()
    # Both faces get a firm ink edge. At play zoom a wall is only ~15 px thick,
    # so without this it reads as a pale band rather than a wall.
    img = img*(1-0.85*top[...,None]) + ink*(0.85*top[...,None])          # heavy outer face
    img = img*(1-0.60*bot[...,None]) + ink*(0.60*bot[...,None])          # inner face
    Image.fromarray(img.clip(0,255).astype(np.uint8)).save(f'/root/tex/{name}.png')
    a=np.asarray(Image.open(f'/root/tex/{name}.png').convert('RGB')).astype(float)
    wrap=np.abs(a[:,0]-a[:,-1]).mean(); nb=np.abs(a[:,1:]-a[:,:-1]).mean()
    print(f'  {name:<16} seam ratio {wrap/nb:.2f}')

print('wall strips:')
build('wall-stone',  '#b5b0a0', 32, 128, 101, tone=(0.84,1.10))   # cut stone, 2 courses
build('wall-dark',   '#5d6470', 32, 128, 202, tone=(0.82,1.10))  # dark slate
build('wall-rubble', '#aaa491', 22, 64,  303, tone=(0.78,1.14), joint=0.95)
build('wall-timber', '#b08a55', 21, 256, 404, tone=(0.88,1.08), joint=0.75, warm=True)
