import json, re
def L(n): return json.load(open('data/mmrpg/parts/_%s.json'%n))
def strip_trail(s):
    s=(s or '').strip()
    s=re.sub(r'\s+',' ',s)
    return s
GEN='core'
# Origins
origins=[]
for o in L('origins'):
    origins.append({'name':o['name'],'genre':GEN,'description':strip_trail(o['description']),
      'examples':strip_trail(o.get('examples','')),'tags':strip_trail(o.get('tags','')),
      'traits':strip_trail(o.get('traits','')),'occupation':strip_trail(o.get('occupation','')).rstrip('.'),
      'powers':strip_trail(o.get('powers','')),'limitation':strip_trail(o.get('limitation',''))})
# Occupations
occs=[{'name':o['name'],'genre':GEN,'description':strip_trail(o['description']),
       'examples':strip_trail(o.get('examples','')),'tags':strip_trail(o.get('tags','')),
       'traits':strip_trail(o.get('traits',''))} for o in L('occupations')]
# Traits / Tags
traits=[{'name':t['name'],'genre':GEN,'description':strip_trail(t['description'])} for t in L('traits')]
tags=[{'name':t['name'],'genre':GEN,'description':strip_trail(t['description'])} for t in L('tags')]
# Powers
powers=[]
for p in L('powers'):
    ps=strip_trail(p.get('power_set',''))
    # drop obviously-truncated set fragments onto a best guess (leave name/effect intact)
    powers.append({'name':p['name'],'genre':GEN,'powerSet':ps,'prerequisites':strip_trail(p.get('prerequisites','')),
      'action':strip_trail(p.get('action','')),'trigger':strip_trail(p.get('trigger','')),
      'duration':strip_trail(p.get('duration','')),'range':strip_trail(p.get('range','')),
      'cost':strip_trail(p.get('cost','')),'effect':strip_trail(p.get('effect','')),
      'fantastic':strip_trail(p.get('fantastic','')),'description':strip_trail(p.get('description',''))})
for n,d in [('origins',origins),('occupations',occs),('traits',traits),('tags',tags),('powers',powers)]:
    json.dump(d, open('data/mmrpg/parts/%s.json'%n,'w'), indent=1, ensure_ascii=False)
    open('data/mmrpg/parts/%s.json'%n,'a').write('\n')
print('origins',len(origins),'occupations',len(occs),'traits',len(traits),'tags',len(tags),'powers',len(powers))
# spot-check
print(json.dumps(origins[0],ensure_ascii=False)[:300])
print(json.dumps(powers[100],ensure_ascii=False)[:300])
