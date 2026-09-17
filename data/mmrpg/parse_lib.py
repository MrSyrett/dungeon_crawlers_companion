import re
# Only unambiguous NON-WORD fragments (never real English/proper-noun words) get ft-restored.
FT = {'oen':'often','Oen':'Often','aer':'after','Aer':'After','aerlife':'afterlife',
 'aermath':'aftermath','cra':'craft','cras':'crafts','craed':'crafted','craing':'crafting',
 'cras':'crafts','swi':'swift','swily':'swiftly','dri':'drift','shapeshi':'shapeshift',
 'shape-shi':'shape-shift','oentimes':'oftentimes'}
def clean(s):
    if not s: return s
    s=s.replace('◆','').replace('ﬀ','ff').replace('ﬁ','fi').replace('ﬂ','fl').replace('ﬃ','ffi').replace('ﬄ','ffl').replace('ﬅ','ft')
    # this book renders the "ft" ligature as stray control/Latin-1 bytes; map them
    # to 'ft' (byte + spurious space before a word continuation → 'ft' with no gap).
    s=re.sub(r'[©] (?=[a-z])', 'ft', s)
    s=re.sub(r'[©]', 'ft', s)
    s=re.sub(r'([A-Za-z]*(?:ffi|ffl|ff|fi|fl)) ([a-z])', r'\1\2', s)
    s=re.sub(r'\b([A-Za-z]+)\b', lambda m: FT.get(m.group(1), m.group(1)), s)
    s=re.sub(r'[ \t]+',' ',s).strip()
    return s
def load_pages(path='data/mmrpg/raw/cols.txt'):
    txt=open(path,encoding='utf-8').read(); pages={}
    for chunk in txt.split('\f===PDFPAGE ')[1:]:
        num,rest=chunk.split('===',1); pages[int(num)]=rest
    return pages
FOOT=re.compile(r'Michael Syrett|Order #|Art by |/\d/|BACKSTORIES|^POWERS$|^\d{1,4}$|^===|CHAPTER|eFX$|Vecchio|López|Rodrígu|GURU|Tartaglia|Acuña')
def sec_lines(p0,p1,startkey=None,endkey=None):
    buf=[]
    for p in range(p0,p1+1):
        for l in load_pages().get(p,'').split('\n'):
            c=clean(l).strip()
            if c and not FOOT.search(c): buf.append(c)
    t='\n'.join(buf)
    if startkey and startkey in t: t=t.split(startkey,1)[1]
    if endkey and endkey in t: t=t.split(endkey,1)[0]
    return [x for x in t.split('\n') if x.strip()]
STOP=set('The They This That These Those A An If It Its On Onto When While With As By In Into For From Each Any Some Most Many Other Others Add Restriction Logic Melee Agility Ego Vigilance Resilience You Your Their His Her He She At To Of Or And But So Also Both All Pick Choose Make Made Roll Note See Damage Whenever After Once During Unless Because Only Even Then Than Where Who What Such No Not Do Does Doing Additionally Instead Example Examples Tags Traits Powers Suggested'.split())
def is_title(t):
    if re.fullmatch(r'(?:[A-Z]\.){2,}', t): return True
    w=t.split()
    if not (1<=len(w)<=5): return False
    if not t[:1].isupper(): return False
    if re.search(r'[.,;!?:]$', t): return False
    if w[0] in STOP: return False
    if ':' in t: return False
    return True
def parse_name_desc(lines, first_title):
    # skip until first_title
    out=[]; started=False; cur=None
    for l in lines:
        if not started:
            if l.strip()==first_title: started=True
            else: continue
        if is_title(l):
            cur={'name':l.strip(),'description':''}; out.append(cur)
        elif cur is not None:
            cur['description']=(cur['description']+' '+l).strip()
    return out
