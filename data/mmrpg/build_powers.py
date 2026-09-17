import re, json, unicodedata
# Parse the Chapter 7 power descriptions from the clean, column-reconstructed
# cols.txt (pdftotext -layout + split_cols.py). Every power block is:
#   NAME / [flavor sentence] / Power Set: X / Prerequisites: / Action: / ... /
#   Effect: (multi-line) / [Fantastic: (multi-line)]
# We anchor on the "Power Set:" line (one per power), find the NAME just above,
# and read the labelled fields forward to the next power.
RAW = open('data/mmrpg/raw/cols.txt', encoding='utf-8').read()
LABELS = ['Power Set','Prerequisites','Action','Trigger','Duration','Range','Cost','Effect','Fantastic']
LABRE = re.compile(r'^\s*(%s)\s*:\s*(.*)$' % '|'.join(re.escape(l) for l in LABELS))
key = lambda L: L.lower().replace(' ', '_')
SETS = ['Elemental Control','Illusion','Magic','Martial Arts','Melee Weapons','Omniversal Travel',
        'Phasing','Plasticity','Power Control','Ranged Weapons','Resize','Shield Bearer','Spider-Powers',
        'Super-Speed','Super-Strength','Tactics','Telekinesis','Telepathy','Teleportation','Weather Control']

def clean(s):
    s = unicodedata.normalize('NFC', s or '')
    # ligature glyphs (proper Unicode)
    for a,b in [('ﬀ','ff'),('ﬁ','fi'),('ﬂ','fl'),('ﬃ','ffi'),('ﬄ','ffl'),('ﬅ','ft')]:
        s = s.replace(a,b)
    # this book renders the "ft" ligature as stray control/Latin-1 bytes
    for a in ('','','©'):
        s = s.replace(a, 'ft')
    s = re.sub(r'f([filt])\s+(?=[a-z])', r'f\1', s)
    return re.sub(r'\s+', ' ', s).strip()

# repair label lines whose first letter got dropped in extraction
REP=[('ower Set:','Power Set:'),('rerequisites:','Prerequisites:'),('ction:','Action:'),('rigger:','Trigger:'),
     ('uration:','Duration:'),('ange:','Range:'),('ost:','Cost:'),('ffect:','Effect:'),('antastic:','Fantastic:')]
def repair(l):
    for a,b in REP:
        if l.startswith(a): return b+l[len(a):]
    return l

# --- collect the powers-chapter lines (pdf pages 81-131 = PDFPAGE 82..132) ---
def section():
    out=[]; grab=False
    for raw in RAW.split('\n'):
        m=re.match(r'\x0c?===PDFPAGE (\d+)===', raw)
        if m:
            n=int(m.group(1)); grab = (82 <= n <= 132); continue
        if not grab: continue
        c=clean(repair(raw))
        if not c: continue
        # drop running headers / footers / page furniture
        if re.match(r'^/\d/\s*POWERS?$', c) or c in ('POWERS','POWER DESCRIPTIONS','POWER SETS'): continue
        if re.search(r'Michael Syrett|Order #', c): continue
        if re.match(r'^Art by', c): continue
        if re.fullmatch(r'\d{1,4}', c): continue
        if re.match(r'^/\d/', c): continue
        if c.isupper() and len(c) <= 30: continue          # set-name headers (MARTIAL ARTS…)
        out.append(c)
    return out

STOP={'The','A','An','This','That','These','Those','They','Their','It','Its','If','When','While','On','Onto',
      'For','With','Within','In','At','As','Any','Each','Once','After','Before','Roll','Make','Choose','Pick',
      'Unless','Instead','Because','But','And','Or','Also','Then','During','Until','Whenever','Treat','Add',
      'Compare','All','No','Not','Neither','Either','Both','Even','Some','Most','You','Your','Up','By','From',
      'While','Every','Whether','Whichever','Unlike','Whatever'}
def is_name(t):
    if not t or len(t) > 46: return False
    w=t.split()
    if not (1 <= len(w) <= 7): return False
    if not t[0].isupper(): return False
    if re.search(r'[.,;:!?)]$', t): return False
    if LABRE.match(t): return False
    if w[0] in STOP: return False
    return True

def build():
    lines=section()
    # name index = the title line just above each "Power Set:" anchor
    name_idx=[]
    for i,l in enumerate(lines):
        if LABRE.match(l) and LABRE.match(l).group(1)=='Power Set':
            ni=None
            for j in range(i-1, max(i-5, -1), -1):
                if is_name(lines[j]): ni=j; break
            if ni is not None and (not name_idx or name_idx[-1] != ni): name_idx.append(ni)
    name_idx=sorted(set(name_idx))
    powers=[]
    for a in range(len(name_idx)):
        i0=name_idx[a]; i1=name_idx[a+1] if a+1 < len(name_idx) else len(lines)
        block=lines[i0:i1]
        p={'name':block[0], 'description':'', **{key(l):'' for l in LABELS}}
        field=None
        for l in block[1:]:
            m=LABRE.match(l)
            if m: field=key(m.group(1)); p[field]=m.group(2).strip()
            elif field: p[field]=(p[field]+' '+l).strip()
            else: p['description']=(p['description']+' '+l).strip()
        if p.get('power_set','').strip(): powers.append(p)
    # normalise the power_set to a canonical set list (fixes header bleed)
    for p in powers:
        ps=p['power_set']
        cand=[s for s in SETS if s in ps]
        combo=re.findall(r'(Martial Arts|Shield Bearer|Spider-Powers|Super-Strength|Melee Weapons|Ranged Weapons)', ps)
        if ps.strip()=='None' or ps.startswith('None'): p['power_set']='None'
        elif len(combo)>=2: p['power_set']=', '.join(dict.fromkeys(combo))
        elif cand: p['power_set']=cand[0]
        else: p['power_set']=ps.strip()
    # dedupe by name (keep richest)
    seen={}
    for p in powers:
        k=p['name'].lower()
        if k not in seen or len(json.dumps(p,ensure_ascii=False))>len(json.dumps(seen[k],ensure_ascii=False)): seen[k]=p
    powers=list(seen.values())
    json.dump(powers, open('data/mmrpg/parts/_powers.json','w'), indent=1, ensure_ascii=False)
    return powers

if __name__=='__main__':
    P=build()
    sets=sorted(set(p['power_set'] for p in P))
    print('powers:', len(P))
    print('sets(%d): %s' % (len(sets), ' | '.join(sets)))
    print('missing effect:', [p['name'] for p in P if not p['effect'].strip()][:12])
    for nm in ['Do This All Day','Accuracy 1','Attack Stance','Sense Sins','Vicious Attack','Winds of Watoomb','Mighty 3']:
        p=[x for x in P if x['name']==nm]
        print(('OK  ' if p else 'MISS')+nm, ('| set '+p[0]['power_set']+' | eff '+p[0]['effect'][:55]) if p else '')
