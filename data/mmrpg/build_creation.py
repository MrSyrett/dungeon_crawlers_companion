import sys, re, json
sys.path.insert(0,'data/mmrpg'); from parse_lib import sec_lines, parse_name_desc, is_title, STOP
def is_otitle(t):
    w=t.split()
    if not (1<=len(w)<=6): return False
    if not t[:1].isupper(): return False
    if re.search(r'[.,;!?]$', t): return False
    if t.endswith(':'): return False
    if w[0] in STOP: return False
    return True
def parse_blocks(lines, labels, first_title, title_fn=is_title):
    labre=re.compile(r'^(%s):\s*(.*)$'%'|'.join(re.escape(l) for l in labels)); key=lambda L:L.lower().replace(' ','_')
    started=False; ents=[]; cur=None; state='title'; last=None
    blank=lambda:{'name':'','description':'',**{key(l):'' for l in labels}}
    done=lambda t: bool(re.search(r'[.\)!?]\s*$',t))
    for l in lines:
        if not started:
            if l.strip()==first_title: started=True
            else: continue
        m=labre.match(l)
        if state=='title': cur=blank(); cur['name']=l.strip(); ents.append(cur); state='desc'; last=None; continue
        if state=='desc':
            if m: state='fields'; cur[key(m.group(1))]=m.group(2).strip(); last=key(m.group(1))
            else: cur['description']=(cur['description']+' '+l).strip()
            continue
        if m: cur[key(m.group(1))]=m.group(2).strip(); last=key(m.group(1))
        elif last and not done(cur[last]): cur[last]=(cur[last]+' '+l).strip()
        elif title_fn(l): cur=blank(); cur['name']=l.strip(); ents.append(cur); state='desc'; last=None
        elif last: cur[last]=(cur[last]+' '+l).strip()
        else: cur['description']=(cur['description']+' '+l).strip()
    return ents
# Origins
origins=parse_blocks(sec_lines(52,58,'ORIGINS','OCCUPATIONS'),['Examples','Tags','Traits','Suggested Occupation','Powers','Limitation'],'Alien',title_fn=is_otitle)
# Occupations
occs=parse_blocks(sec_lines(57,60,'OCCUPATIONS','TRAITS'),['Examples','Tags','Traits'],'Adventurer')
# Traits & Tags
traits=parse_name_desc(sec_lines(59,64,None,'TAGS'),'Abrasive')
tags=parse_name_desc(sec_lines(64,68,None,'Powers are what make'),'A.I.')
for name,data in [('origins',origins),('occupations',occs),('traits',traits),('tags',tags)]:
    json.dump(data, open('data/mmrpg/parts/_%s.json'%name,'w'), indent=1, ensure_ascii=False)
    print('%s: %d'%(name,len(data)))
print('trait names:', ' | '.join(t['name'] for t in traits))
print('occ names:', ' | '.join(o['name'] for o in occs))
