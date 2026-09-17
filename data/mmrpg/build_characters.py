import pdfplumber, re, json, sys, unicodedata
F="/mnt/user-data/uploads/Marvel Multiverse RPG Core Rule Book.pdf"
LABELS=['MELEE','AGILITY','RESILIENCE','VIGILANCE','EGO','LOGIC']

def clean(s):
    if s is None: return ''
    s=unicodedata.normalize('NFC',s)
    s=s.replace('ﬁ','fi').replace('ﬂ','fl')
    s=re.sub(r'\bfl\s+aw','flaw',s)  # "fl aw" ligature split
    return re.sub(r'\s+',' ',s).strip()

def center(w): return (w['x0']+w['x1'])/2

def parse_page(pg):
    W=pg.extract_words(x_tolerance=1.5,y_tolerance=2,extra_attrs=['size'])
    lab={w['text']:w for w in W if w['text'] in LABELS}
    if len(lab)<6: return None

    # --- abilities: number whose center aligns with the label, 12-32px above ---
    ab={}
    for L in LABELS:
        l=lab[L]; cx=center(l); y=l['top']
        cands=[w for w in W if abs(center(w)-cx)<16 and (y-34)<w['top']<(y-4)
               and re.fullmatch(r'-?\d+',w['text'])]
        cands.sort(key=lambda w:w['top'])
        ab[L.lower()]=int(cands[-1]['text']) if cands else None

    # --- rank: the single very large digit (size ~35) ---
    rank=None
    big=[w for w in W if w.get('size',0)>=30 and re.fullmatch(r'\d+',w['text'])]
    if big: rank=int(big[0]['text'])

    # --- helper: value just below a small label, x-aligned ---
    def below_val(label, xr=22, yb=18, pat=r'-?[\d—-]+'):
        cand=[w for w in W if w['text']==label]
        if not cand: return None
        l=cand[0]; cx=center(l); y=l['top']
        rows=[w for w in W if abs(center(w)-cx)<xr and y<w['top']<y+yb and re.fullmatch(pat,w['text'])]
        rows.sort(key=lambda w:w['top'])
        return rows[0]['text'] if rows else None
    def as_int(s):
        if s is None: return None
        m=re.search(r'-?\d+',s); return int(m.group()) if m else None
    health=as_int(below_val('HEALTH'))
    focus=as_int(below_val('FOCUS'))
    kraw=below_val('KARMA')
    karma=None if kraw in (None,'—','-') else as_int(kraw)

    # --- codename: large title at top (size>=15), strip parenthetical ---
    title=[w for w in W if 50<=w['top']<=62 and w.get('size',0)>=15 and w['x0']<355]
    title.sort(key=lambda w:w['x0'])
    name=re.split(r'\s*\(',' '.join(w['text'] for w in title))[0].strip()

    # --- biography column: right side x>355, reconstruct lines then regex ---
    bio=[w for w in W if w['x0']>355 and w['top']>60]
    bio.sort(key=lambda w:(round(w['top']/6),w['x0']))
    blines=[]; cy=None; cur=None
    for w in bio:
        if cy is None or abs(w['top']-cy)>6: cur=[]; blines.append(cur); cy=w['top']
        cur.append(w['text'])
    btext=clean(' '.join(' '.join(l) for l in blines))
    # cut off History/Personality narrative
    btext=re.split(r'\bHistory\b|\bPersonality\b',btext)[0]
    def rx(p):
        m=re.search(p,btext); return clean(m.group(1)) if m else ''
    real=rx(r'Real Name:\s*(.+?)(?:\s*Height:|$)')
    occ=rx(r'Occupation:\s*(.+?)(?:\s*Origin:|\s*Teams:|\s*Base:|$)')
    origin=rx(r'Origin:\s*(.+?)(?:\s*Occupation:|\s*Teams:|\s*Base:|$)')
    teams=rx(r'Teams:\s*(.+?)(?:\s*Base:|\s*Origin:|\s*Occupation:|$)')
    base=rx(r'Base:\s*(.+?)(?:\s*Origin:|\s*Occupation:|\s*Teams:|$)')

    # --- speed: middle column under SPEED label ---
    speed={}
    sp=[w for w in W if w['text']=='SPEED']
    if sp:
        sy=sp[0]['top']; scx=center(sp[0])
        seg=[w for w in W if abs(center(w)-scx)<70 and sy<w['top']<sy+120]
        seg.sort(key=lambda w:(round(w['top']),w['x0']))
        stext=' '.join(w['text'] for w in seg)
        for k in ['Run','Climb','Swim','Flight','Jump','Glide','Swingline','Teleport','Levitate','Burrow']:
            m=re.search(k+r'\s*:?\s*(\d+)',stext)
            if m: speed[k.lower()]=int(m.group(1))

    # sanitize: strip any embedded "Label:" tail left by a scrambled reading order
    LBL=re.compile(r'\b(Origin|Teams|Base|Occupation|Height|Weight|Real Name|Gender|Eyes|Hair|Size|Distinguishing|Features)\b\s*:.*$')
    def san(v): return clean(LBL.sub('',v)) if v else v
    occ,origin,teams,base,real=map(san,(occ,origin,teams,base,real))

    # per-character overrides for pages whose reading order scrambled a field
    OV={'GHOST RIDER':{'realName':'Robbie Reyes','occupation':'Mechanic'}}
    if name in OV:
        for k,val in OV[name].items():
            if not locals().get(k): pass
        o=OV[name]
        real=o.get('realName',real) or real
        occ=o.get('occupation',occ) or occ

    return {'name':name,'realName':real,'rank':rank,'health':health,'focus':focus,'karma':karma,
            'abilities':ab,'speed':speed,'occupation':occ,'origin':origin,'teams':teams,'base':base}

if __name__=='__main__':
    if len(sys.argv)>2:
        lo,hi=int(sys.argv[1]),int(sys.argv[2])
        with pdfplumber.open(F) as pdf:
            for idx in range(lo-1,hi):
                r=parse_page(pdf.pages[idx])
                if r: print(json.dumps(r,ensure_ascii=False))
    else:
        # full Chapter 8 build: pages 135-262
        out=[]
        with pdfplumber.open(F) as pdf:
            for idx in range(134,262):
                r=parse_page(pdf.pages[idx])
                if r and r['name']: out.append(r)
        # assign ids/slugs (disambiguate duplicate codenames by real name), genre
        def slug(s):
            s=unicodedata.normalize('NFKD',s).encode('ascii','ignore').decode()
            return re.sub(r'-+','-',re.sub(r'[^a-z0-9]+','-',s.lower())).strip('-')
        names={}
        for r in out: names[r['name']]=names.get(r['name'],0)+1
        for r in out:
            base=slug(r['name'])
            r['id']= base if names[r['name']]==1 else base+'-'+slug(r['realName'] or '')
            r['genre']='core'
        json.dump(out,open('data/mmrpg/parts/characters.json','w'),ensure_ascii=False,indent=1)
        print("wrote",len(out),"characters")
