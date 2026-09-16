import sys, re, json
sys.path.insert(0,'data/mmrpg'); from parse_lib import sec_lines, is_title
LAB=['Power Set','Prerequisites','Action','Trigger','Duration','Range','Cost','Effect','Fantastic']
labre=re.compile(r'^(%s):\s*(.*)$'%'|'.join(re.escape(l) for l in LAB)); key=lambda L:L.lower().replace(' ','_')
lines=sec_lines(81,132,'POWER DESCRIPTIONS','APPENDIX')
# stop at CHARACTERS chapter if present
cut=[i for i,l in enumerate(lines) if l.strip() in ('CHARACTERS','THE MARVEL MULTIVERSE')]
if cut: lines=lines[:cut[0]]
started=False; ents=[]; cur=None; state='title'; last=None
blank=lambda:{'name':'','description':'',**{key(l):'' for l in LAB}}
done=lambda t: bool(re.search(r'[.\)!?]\s*$',t))
REP=[('rerequisites:','Prerequisites:'),('ower Set:','Power Set:'),('ffect:','Effect:'),('uration:','Duration:'),('ction:','Action:'),('ost:','Cost:'),('ange:','Range:'),('rigger:','Trigger:'),('antastic:','Fantastic:')]
def repair(l):
    for a,b in REP:
        if l.startswith(a): return b+l[len(a):]
    return l
lines=[repair(l) for l in lines]
for l in lines:
    if not started:
        if l.strip()=='Accuracy 1': started=True
        else: continue
    m=labre.match(l)
    if state=='title': cur=blank(); cur['name']=l.strip(); ents.append(cur); state='desc'; last=None; continue
    if state=='desc':
        if m: state='fields'; cur[key(m.group(1))]=m.group(2).strip(); last=key(m.group(1))
        else: cur['description']=(cur['description']+' '+l).strip()
        continue
    if m: cur[key(m.group(1))]=m.group(2).strip(); last=key(m.group(1))
    elif last and not done(cur[last]): cur[last]=(cur[last]+' '+l).strip()
    elif is_title(l): cur=blank(); cur['name']=l.strip(); ents.append(cur); state='desc'; last=None
    elif last: cur[last]=(cur[last]+' '+l).strip()
    else: cur['description']=(cur['description']+' '+l).strip()
# keep only real powers (have a power_set)
powers=[e for e in ents if e['power_set']]
json.dump(powers, open('data/mmrpg/parts/_powers.json','w'), indent=1, ensure_ascii=False)
sets=sorted(set(p['power_set'] for p in powers))
print('powers:',len(powers),'/ blocks',len(ents))
print('sets(%d):'%len(sets), ' | '.join(sets))
# sample
import random
for p in powers[:2]:
    print('--',p['name'],'| set',p['power_set'],'| action',p['action'],'| dur',p['duration'],'| cost',p['cost'][:20],'| eff', p['effect'][:60])
