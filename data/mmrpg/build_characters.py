import pdfplumber, re, json, sys, unicodedata
F="/mnt/user-data/uploads/Marvel Multiverse RPG Core Rule Book.pdf"
LABELS=['MELEE','AGILITY','RESILIENCE','VIGILANCE','EGO','LOGIC']

def clean(s):
    if s is None: return ''
    s=unicodedata.normalize('NFC',s)
    s=s.replace('ﬁ','fi').replace('ﬂ','fl')
    s=re.sub(r'f([il])\s+(?=[a-z])',r'f\1',s)  # ligature split: "Refl exes"->"Reflexes", "Sacrifi ce"->"Sacrifice"
    return re.sub(r'\s+',' ',s).strip()

# Canonical power-set names (from powers.json) — used to tell a set header from a
# wrapped power name in the two-column POWERS block.
SET_NAMES=['Elemental Control','Illusion','Magic','Martial Arts','Melee Weapons',
    'Omniversal Travel','Phasing','Plasticity','Power Control','Ranged Weapons','Resize',
    'Shield Bearer','Spider-Powers','Super-Speed','Super-Strength','Tactics','Telekinesis',
    'Telepathy','Teleportation','Weather Control']
def is_set_header(t):
    t=t.strip()
    if t=='Basic': return True
    if re.search(r'\(.*Set\)', t): return True   # "Magic (Sorcery Set)"
    return any(t==s or t.startswith(s+' ') or t.startswith(s+',') for s in SET_NAMES)

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
    title=[w for w in W if 44<=w['top']<=62 and w.get('size',0)>=15 and w['x0']<355]
    title.sort(key=lambda w:w['x0'])
    name=re.split(r'\s*\(',' '.join(w['text'] for w in title))[0].strip()

    # --- biography column: right side x>355, reconstruct lines then regex ---
    bio=[w for w in W if w['x0']>355 and w['top']>60]
    bio.sort(key=lambda w:(round(w['top']/6),w['x0']))
    blines=[]; cy=None; cur=None
    for w in bio:
        if cy is None or abs(w['top']-cy)>6: cur=[]; blines.append(cur); cy=w['top']
        cur.append(w['text'])
    blns=[clean(' '.join(l)) for l in blines]
    # header bio text = everything before the History narrative starts
    def line_is_head(s,name): return s.strip()==name or s.strip().startswith(name+' ')
    def first_idx(pred,start=0):
        for i in range(start,len(blns)):
            if pred(blns[i]): return i
        return -1
    iHist=first_idx(lambda s:line_is_head(s,'History'))
    iPers=first_idx(lambda s:line_is_head(s,'Personality'), iHist+1 if iHist>=0 else 0)
    def is_powers_line(s):
        s=s.strip()
        return ('◆' in s) or bool(re.search(r'Set\)', s)) or s in ('POWERS','POWER SETS') or bool(re.fullmatch(r'\d+', s)) or is_set_header(s)
    headEnd=iHist if iHist>=0 else (iPers if iPers>=0 else len(blns))
    btext=clean(' '.join(blns[:headEnd]))
    def rx(p):
        m=re.search(p,btext); return clean(m.group(1)) if m else ''
    real=rx(r'Real Name:\s*(.+?)(?:\s*Height:|$)')
    occ=rx(r'Occupation:\s*(.+?)(?:\s*Origin:|\s*Teams:|\s*Base:|$)')
    origin=rx(r'Origin:\s*(.+?)(?:\s*Occupation:|\s*Teams:|\s*Base:|$)')
    teams=rx(r'Teams:\s*(.+?)(?:\s*Base:|\s*Origin:|\s*Occupation:|$)')
    base=rx(r'Base:\s*(.+?)(?:\s*Origin:|\s*Occupation:|\s*Teams:|$)')
    features=rx(r'Distinguishing Features:\s*(.+?)(?:\s*Occupation:|\s*Origin:|\s*Teams:|\s*Base:|$)')
    if features.strip() in ('None','—','-'): features=''
    # narrative sections: History (until Personality) and Personality (until powers)
    def join_prose(lns):
        out=''
        for ln in lns:
            ln=ln.strip()
            if not ln or is_powers_line(ln): break
            if out.endswith('-') and not out.endswith(('- ',)): out=out[:-1]+ln
            else: out=(out+' '+ln) if out else ln
        return clean(out)
    def section(i0,i1):
        if i0<0: return ''
        seg=blns[i0+1 : (i1 if i1>=0 else len(blns))]
        # cut at first powers line
        cut=[]
        for ln in seg:
            if is_powers_line(ln): break
            cut.append(ln)
        return join_prose(cut)
    history=section(iHist, iPers)
    personality=section(iPers, first_idx(is_powers_line, iPers+1 if iPers>=0 else 0))

    # --- speed: middle column under SPEED label ---
    speed={}
    sp=[w for w in W if w['text']=='SPEED']
    if sp:
        sy=sp[0]['top']; scx=center(sp[0])
        seg=[w for w in W if abs(center(w)-scx)<70 and sy<w['top']<sy+120]
        seg.sort(key=lambda w:(round(w['top']),w['x0']))
        stext=' '.join(w['text'] for w in seg)
        for k in ['Run','Climb','Swim','Flight','Jump','Glide','Swingline','Teleport','Levitation','Levitate','Burrow']:
            m=re.search(k+r'\s*:?\s*(\d+)',stext)
            if m: speed[k.lower()]=int(m.group(1))

    # --- TRAITS / TAGS / POWERS: bulleted (◆) columns on the right of the block ---
    def hdr(t):
        h=[w for w in W if w['text']==t]; return h[0] if h else None
    def col_lines(x0, x1, ytop, ybot):
        ws=[w for w in W if x0<=w['x0']<x1 and ytop<w['top']<ybot]
        ws.sort(key=lambda w:(round(w['top']/5),w['x0']))
        lines=[]; cy=None; cur=None
        for w in ws:
            if cy is None or abs(w['top']-cy)>5: cur=[]; lines.append(cur); cy=w['top']
            cur.append(w['text'])
        return [clean(' '.join(l)) for l in lines if l]
    def bullet_list(lines, drop={'Traits','Tags','Powers'}):
        out=[]
        for ln in lines:
            if not ln or ln in drop or re.fullmatch(r'\d+',ln): continue
            segs=ln.split('◆')  # interior bullets split too
            head=segs[0].strip()
            if head and out: out[-1]=(out[-1]+' '+head).strip()  # wrap continuation
            for s in segs[1:]:
                if s.strip(): out.append(s.strip())
        return [o for o in out if o]
    Tr=hdr('TRAITS'); Tg=hdr('TAGS'); Po=hdr('POWERS')
    traits=tags=[]; powers=[]
    if Tr and Po:
        traits=bullet_list(col_lines(Tr['x0']-4, (Tg['x0'] if Tg else Tr['x0']+58), Tr['top']+8, Po['top']-2))
    if Tg and Po:
        tags=bullet_list(col_lines(Tg['x0']-4, Tg['x0']+72, Tg['top']+8, Po['top']-2))
    if Po:
        groups=[]
        for cx0,cx1 in [(Po['x0']-4, Po['x0']+95),(Po['x0']+95, Po['x0']+230)]:
            for ln in col_lines(cx0, cx1, Po['top']+8, Po['top']+270):
                if not ln or ln in ('Powers',) or re.fullmatch(r'\d+',ln): continue
                if '◆' not in ln and is_set_header(ln):
                    groups.append({'set':ln,'names':[]}); continue
                segs=ln.split('◆')
                head=segs[0].strip()
                if head:
                    if groups and groups[-1]['names']:      # wrapped power name
                        groups[-1]['names'][-1]=(groups[-1]['names'][-1]+' '+head).strip()
                    elif groups:                            # wrapped set header
                        groups[-1]['set']=(groups[-1]['set']+' '+head).strip()
                for s in segs[1:]:
                    if not s.strip(): continue
                    if not groups: groups.append({'set':'','names':[]})
                    groups[-1]['names'].append(s.strip())
        powers=[g for g in groups if g['names']]

    # sanitize: strip any embedded "Label:" tail left by a scrambled reading order
    LBL=re.compile(r'\b(Origin|Teams|Base|Occupation|Height|Weight|Real Name|Gender|Eyes|Hair|Size|Distinguishing|Features)\b\s*:.*$')
    def san(v): return clean(LBL.sub('',v)) if v else v
    occ,origin,teams,base,real,features=map(san,(occ,origin,teams,base,real,features))

    # per-character overrides for pages whose reading order scrambled a field
    OV={'GHOST RIDER':{'realName':'Robbie Reyes','occupation':'Mechanic'}}
    if name in OV:
        for k,val in OV[name].items():
            if not locals().get(k): pass
        o=OV[name]
        real=o.get('realName',real) or real
        occ=o.get('occupation',occ) or occ

    return {'name':name,'realName':real,'rank':rank,'health':health,'focus':focus,'karma':karma,
            'abilities':ab,'speed':speed,'occupation':occ,'origin':origin,'teams':teams,'base':base,
            'features':features,'history':history,'personality':personality,
            'traits':traits,'tags':tags,'powers':powers}

# ── Iconic weapons/items: the pregens list their signature gear inline in the
# "Iconic Weapon: <full text>" power. Move that to the Equipment list (see
# data/mmrpg/parts/equipment.json, Iconic tier) and leave just the "Iconic
# Weapon"/"Iconic Item" power on the character, with the item attached as
# starting equipment. Also collapses power names duplicated by column reads.
ICONIC={
  'BLACK PANTHER':'Electrified Vibranium Claws',
  'CAPTAIN AMERICA':"Captain America's Shield",
  'DAREDEVIL':"Daredevil's Billy Club",
  'GORR THE GOD BUTCHER':'All-Black the Necrosword',
  'JUGGERNAUT':'Crimson Gem of Cyttorak',
  'NIGHT NURSE':"Iron Man's Gloves",
  'STAR-LORD':'Element Gun',
  'THOR':'Mjolnir',
  'WOLVERINE':'Adamantium Claws',
}
def apply_iconic(rec):
    item=ICONIC.get((rec.get('name') or '').upper())
    equip=[]
    newgroups=[]
    for g in rec.get('powers',[]):
        names=[]
        for n in g.get('names',[]):
            m=re.match(r'^\s*Iconic (Weapon|Item)\b',n)
            if m:
                lbl='Iconic '+m.group(1)
                if lbl not in names: names.append(lbl)
                if item and item not in equip: equip.append(item)
            elif n not in names:
                names.append(n)
        if names: newgroups.append({'set':g.get('set',''),'names':names})
    # collapse groups that became identical after the rewrite
    seen=set(); merged=[]
    for g in newgroups:
        key=(g['set'],tuple(g['names']))
        if key in seen: continue
        seen.add(key); merged.append(g)
    rec['powers']=merged
    if equip: rec['equipment']=equip
    return rec

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
            for g in r.get('powers',[]):
                g['names']=[re.sub(r'\s+is$','',n).strip() for n in g['names']]
            base=slug(r['name'])
            r['id']= base if names[r['name']]==1 else base+'-'+slug(r['realName'] or '')
            r['genre']='core'
            apply_iconic(r)
        json.dump(out,open('data/mmrpg/parts/characters.json','w'),ensure_ascii=False,indent=1)
        print("wrote",len(out),"characters")
