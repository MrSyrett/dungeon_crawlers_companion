"""Light mode for the GM Screen.

Reads tools/templates/gm_screen.html, (re)generates two things and writes it back:
  1. <script id="gm-mode-boot"> at the top of <head>: data-mode from localStorage.dd_theme
     before first paint, and a `storage` listener that flips it live.
  2. <style id="gm-light"> at the end of <head>: the hand-tuned light tokens (light.css) and a
     generated "light twin" of every rule that sets a colour.

Light twins: for each rule `SEL { … colour declarations … }` in the page's own stylesheets we
emit `:root[data-mode="light"] SEL { … }` with every literal colour mapped to its light
equivalent (by role: background / text / border / shadow).  Every twin gains exactly (0,2,0)
specificity and keeps the original's !important, so the twins reproduce the dark cascade
one-for-one: whichever rule wins in dark, its twin wins in light.  Dark mode is untouched.
Run it again after editing the page's CSS (it replaces its own previous output).
"""
import re, sys, os, json
HERE=os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0,HERE)
from cssp import strip_comments, parse, decls, split_sel
from blocks import style_blocks
import colors as K

SRC=sys.argv[1]; DST=sys.argv[2] if len(sys.argv)>2 else SRC
h=open(SRC,encoding='utf-8').read()

# ── campaign theme block: re-inject the generator's output (authoritative) ──
GEN=os.path.join(os.path.dirname(HERE),'gmtheme','theme.css')
if os.path.exists(GEN):
    a=h.index('<style id="gm-sys-theme">\n')+len('<style id="gm-sys-theme">\n'); b=h.index('</style>',a)
    h=h[:a]+open(GEN,encoding='utf-8').read()+h[b:]
# ── remove previous output ──
h=re.sub(r'<script id="gm-mode-boot">.*?</script>\n?','',h,flags=re.S)
h=re.sub(r'<style id="gm-light">.*?</style>\n?','',h,flags=re.S)

COLOR_PROPS={'color','background','background-color','background-image','border','border-top','border-right','border-bottom','border-left',
 'border-color','border-top-color','border-right-color','border-bottom-color','border-left-color','border-block','border-inline',
 'border-block-start','border-block-end','border-inline-start','border-inline-end','outline','outline-color','box-shadow','text-shadow',
 'fill','stroke','caret-color','accent-color','text-decoration','text-decoration-color','column-rule','-webkit-text-stroke',
 '-webkit-text-fill-color','scrollbar-color','filter','-webkit-tap-highlight-color'}
def role(p):
    if p.startswith('background'): return 'bg'
    if p in ('box-shadow','filter'): return 'sh'
    if p=='text-shadow': return 'tsh'
    if p.startswith('border') or p.startswith('outline') or p=='column-rule' or p=='stroke': return 'bd'
    if p=='scrollbar-color': return 'bg'
    return 'fg'

PANEL=(20,22,26,1.0)
def clamp(x,a,b): return max(a,min(b,x))
def neutral(C): return C<0.035

def map_bg(c):
    r,g,b,a=c; L,C,hh=K.to_oklch(c)
    if a<0.7:
        if L<0.45:
            return (0,0,0,round(a*(0.45 if a>=0.5 else 0.2),3)) if neutral(C) else (r,g,b,round(a*0.4,3))
        if neutral(C): return (0,0,0,round(min(a*0.8,0.12),3))
        return c
    if L<0.5:
        if C>=0.09: return c                         # a saturated fill (button, badge)
        nL=clamp(0.99-(L-0.13)*0.55,0.82,0.99)
        return K.from_oklch(nL,min(C*0.6,0.03),hh,a)
    return c
def map_fg(c):
    r,g,b,a=c
    cc=K.over(c,PANEL) if a<1 else c
    L,C,hh=K.to_oklch(cc)
    if L<0.3: return c                               # already dark ink: it sits on a light fill
    if neutral(C):
        nL=clamp(1.07-0.95*L,0.16,0.50)
        return K.from_oklch(nL,C,hh,1.0)
    if K.contrast(cc,(228,230,233,1))>=4.5: return cc
    return K.darken_for(cc,(228,230,233,1),4.5)
def map_bd(c):
    r,g,b,a=c; L,C,hh=K.to_oklch(c)
    if a<0.7:
        if L<0.45: return (0,0,0,round(min(a*0.35,0.2),3)) if neutral(C) else (r,g,b,a)
        if neutral(C): return (0,0,0,round(min(a*1.0,0.25),3))
        return c
    if L<0.5 and C<0.09:
        nL=clamp(0.98-0.5*L,0.72,0.92)
        return K.from_oklch(nL,min(C*0.8,0.05),hh,a)
    return c
def map_sh(c, text=False):
    r,g,b,a=c; L,C,hh=K.to_oklch(c)
    if L<0.35 and neutral(C): return (0,0,0,round(a*(0.15 if text else 0.3),3))
    return c
MAP={'bg':map_bg,'fg':map_fg,'bd':map_bd,'sh':map_sh,'tsh':lambda c:map_sh(c,True)}

ACCENT_FILL=re.compile(r'^\s*(?:linear-gradient\([^,]*,\s*)?var\(--(accent|gold|signal|gt-hl|gt-acc|accent-2)\b')
COLOR_FILL=re.compile(r'^\s*(?:color-mix\(in srgb,\s*)?var\(--(red|red-light|npc-blue|green|green-light|boss)\b(?![^;]*transparent)')
def fill_kind(ds):
    bg=''
    for p,v in ds:
        if p in ('background','background-color'): bg=v
    if not bg: return None
    if ACCENT_FILL.match(bg) and 'transparent' not in bg.split(')')[0]: return 'accent'
    if COLOR_FILL.match(bg): return 'color'
    m=K.COLRE.search(re.sub(r'url\([^)]*\)','',bg))
    if m and 'transparent' not in bg:
        c=K.parse(m.group(0)); L,C,hh=K.to_oklch(c)
        if c[3]>=0.7 and (C>=0.08 or L>=0.7): return 'color'
    return None

def map_value(v, rl, fill, stats):
    # leave url(...) alone
    # url(...) is left alone, and so is a shade of a colour: color-mix(<colour> p%, #000/#fff)
    parts=re.split(r'(url\([^)]*\)|color-mix\(in srgb,\s*(?:var\(--[\w-]+(?:,\s*#[0-9a-fA-F]+)?\)|#[0-9a-fA-F]{6})\s*\d+%,\s*(?:#000|#fff|#000000|#ffffff|black|white)\s*\))',v)
    out=[]
    for i,pt in enumerate(parts):
        if i%2: out.append(pt); continue
        def rep(m):
            c=K.parse(m.group(0))
            if rl=='fg' and fill:
                L=K.to_oklch(K.over(c,PANEL) if c[3]<1 else c)[0]
                if fill=='accent' and L<0.4: n=(255,255,255,1.0)
                else: n=c
            else: n=MAP[rl](c)
            stats['n']+=1
            return K.fmt(n) if n!=c else m.group(0)
        out.append(K.COLRE.sub(rep,pt))
    return ''.join(out)

LM=':root[data-mode="light"]'
# Twins never reach inside the Adventure prep sheet (it styles its own light page) nor the
# campaign-coloured bars (they keep their dark furniture), except the cards on the top bar.
# All twins are nested in ONE rule whose selector is that exclusion, and each twin carries `&`
# on its subject: & counts as the :not()'s most specific argument whether or not it matches,
# so every twin gains the same specificity and the dark cascade order is preserved.
EXCL=':not(.advh-sheet,.advh-sheet *,:root[data-gm-theme] :is(.topbar,.bottom-bar),:root[data-gm-theme] :is(.topbar,.bottom-bar) :not(.bubble,.bubble *,.timer,.timer *,.ticktrk,.ticktrk *))'
PSEUDO=re.compile(r'(::?(?:before|after|placeholder|selection|marker|first-line|first-letter|backdrop|-webkit-[\w-]+|-moz-[\w-]+)(?:\([^)]*\))?(?::[\w-]+(?:\([^)]*\))?)*)$')
def add_excl(s):
    m=PSEUDO.search(s)
    if m: return s[:m.start()]+'&'+s[m.start():]
    return s+'&'
def twin_sel(sel):
    out=[]
    for s in split_sel(sel):
        if s.startswith(':root'): t=LM+s
        elif re.match(r'html\b',s): t='html'+LM+s[4:]
        else: t=LM+' '+s
        out.append(add_excl(t))
    return ','.join(out)

def walk(nodes,ctx):
    for nd in nodes:
        if nd[0]=='rule': yield ctx,nd[1],nd[2]
        elif nd[0]=='at': yield from walk(nd[2],ctx+[nd[1]])

IDENTITY_SEL=re.compile(r"(?!x)x")
stats={'n':0,'rules':0}
out=[EXCL+'{']; cur_ctx=None
blocks=style_blocks(h)
for s,e,attrs,css in blocks:
    ident_block='gm-sys-theme' in attrs
    nodes,_=parse(strip_comments(css))
    for ctx,sel,body in walk(nodes,[]):
        ds=decls(body)
        cds=[(p,v) for p,v in ds if p.lower() in COLOR_PROPS]
        if not cds: continue
        ident=ident_block or bool(IDENTITY_SEL.search(sel))
        fill=fill_kind(ds)
        nd=[]
        for p,v in cds:
            imp=''
            mm=re.search(r'\s*!\s*important\s*$',v,re.I)
            if mm: imp='!important'; v=v[:mm.start()]
            nv=v if ident else map_value(v,role(p.lower()),fill,stats)
            nd.append(f'{p}:{nv}{imp}')
        stats['rules']+=1
        rule=twin_sel(sel)+'{'+';'.join(nd)+'}'
        if ctx!=cur_ctx:
            if cur_ctx: out.append('}'*len(cur_ctx))
            if ctx: out.append(''.join(c+'{' for c in ctx))
            cur_ctx=ctx
        out.append(rule)
if cur_ctx: out.append('}'*len(cur_ctx)); cur_ctx=None
out.append('/* light-only rules */')
for ctx,sel,body in walk(parse(strip_comments(open(os.path.join(HERE,'light-rules.css'),encoding='utf-8').read()))[0],[]):
    if ctx: out.append(''.join(c+'{' for c in ctx))
    out.append(twin_sel(sel)+'{'+';'.join(p+':'+v for p,v in decls(body))+'}')
    if ctx: out.append('}'*len(ctx))
out.append('}')
twins='\n'.join(out)

hand=open(os.path.join(HERE,'light.css'),encoding='utf-8').read().strip()
boot=open(os.path.join(HERE,'boot.js'),encoding='utf-8').read().strip()
style=('<style id="gm-light">\n/* ═══ LIGHT MODE ═══ Generated — see the header comment of light.css below. Dark mode never matches\n'
       '   anything here (every selector starts :root[data-mode="light"]). */\n'+hand+'\n/* ── Light twins (generated) ── */\n'+twins+'\n</style>\n')
# insert style at end of head, boot script right after <head>
i=h.index('</head>'); h=h[:i]+style+h[i:]
m=re.search(r'<head[^>]*>\n?',h); h=h[:m.end()]+'<script id="gm-mode-boot">'+boot+'</script>\n'+h[m.end():]
open(DST,'w',encoding='utf-8').write(h)
print('twin rules',stats['rules'],'literals',stats['n'],'style bytes',len(style.encode()),'file',len(h.encode()))
