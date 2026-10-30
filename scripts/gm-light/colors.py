import re, math
NAMED={'white':(255,255,255,1.0),'black':(0,0,0,1.0)}
COLRE=re.compile(r'#[0-9a-fA-F]{8}\b|#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{4}\b|#[0-9a-fA-F]{3}\b|rgba?\([^)]*\)|(?<![\w-])(?:white|black)(?![\w-])')
def parse(s):
    s=s.strip(); sl=s.lower()
    if sl in NAMED: return NAMED[sl]
    if s.startswith('#'):
        h=s[1:]
        if len(h) in (3,4): h=''.join(c*2 for c in h)
        r,g,b=int(h[0:2],16),int(h[2:4],16),int(h[4:6],16); a=int(h[6:8],16)/255 if len(h)==8 else 1.0
        return (r,g,b,a)
    m=re.match(r'rgba?\((.*)\)',s,re.I)
    parts=re.split(r'[\s,/]+',m.group(1).strip())
    v=[]
    for p in parts:
        if p.endswith('%'): v.append(float(p[:-1])*2.55 if len(v)<3 else float(p[:-1])/100)
        else: v.append(float(p))
    if len(v)==3: v.append(1.0)
    return (v[0],v[1],v[2],v[3])
def fmt(c):
    r,g,b,a=c; r,g,b=[max(0,min(255,round(x))) for x in (r,g,b)]
    if a>=0.999: return '#%02x%02x%02x'%(r,g,b)
    return 'rgba(%d,%d,%d,%s)'%(r,g,b,('%.3f'%a).rstrip('0').rstrip('.') or '0')
def _lin(x):
    x/=255; return x/12.92 if x<=0.04045 else ((x+0.055)/1.055)**2.4
def _gam(x):
    x=max(0,min(1,x)); return 255*(12.92*x if x<=0.0031308 else 1.055*x**(1/2.4)-0.055)
def to_oklch(c):
    r,g,b=[_lin(x) for x in c[:3]]
    l=0.4122214708*r+0.5363325363*g+0.0514459929*b
    m=0.2119034982*r+0.6806995451*g+0.1073969566*b
    s=0.0883024619*r+0.2817188376*g+0.6299787005*b
    l,m,s=[math.copysign(abs(x)**(1/3),x) for x in (l,m,s)]
    L=0.2104542553*l+0.7936177850*m-0.0040720468*s
    A=1.9779984951*l-2.4285922050*m+0.4505937099*s
    B=0.0259040371*l+0.7827717662*m-0.8086757660*s
    return L, math.hypot(A,B), math.atan2(B,A)
def from_oklch(L,C,h,a=1.0):
    def conv(C):
        A=C*math.cos(h); B=C*math.sin(h)
        l=L+0.3963377774*A+0.2158037573*B; m=L-0.1055613458*A-0.0638541728*B; s=L-0.0894841775*A-1.2914855480*B
        l,m,s=l**3,m**3,s**3
        r=4.0767416621*l-3.3077115913*m+0.2309699292*s
        g=-1.2684380046*l+2.6097574011*m-0.3413193965*s
        b=-0.0041960863*l-0.7034186147*m+1.7076147010*s
        return r,g,b
    # reduce chroma until in gamut
    for k in range(40):
        r,g,b=conv(C)
        if min(r,g,b)>=-1e-4 and max(r,g,b)<=1+1e-4: break
        C*=0.92
    return (_gam(r),_gam(g),_gam(b),a)
def lum(c):
    r,g,b=[_lin(x) for x in c[:3]]; return 0.2126*r+0.7152*g+0.0722*b
def contrast(c1,c2):
    a,b=lum(c1),lum(c2); a,b=max(a,b),min(a,b); return (a+0.05)/(b+0.05)
def over(c,bg):
    a=c[3]; return tuple(c[i]*a+bg[i]*(1-a) for i in range(3))+(1.0,)
def darken_for(c, bg=(255,255,255,1), need=4.6):
    L,C,h=to_oklch(c); x=from_oklch(L,C,h)
    while contrast(x,bg)<need and L>0.05:
        L-=0.01; x=from_oklch(L,C,h)
    return x
