import re
raw=open('data/mmrpg/raw/full_layout.txt',encoding='utf-8').read()
pages=raw.split('\f')
out=[]
for idx,pg in enumerate(pages):
    lines=[ln.rstrip() for ln in pg.split('\n')]
    maxw=max((len(l) for l in lines), default=0)
    # find dominant gutter column in the middle band
    best_c=None; best=0
    for c in range(int(maxw*0.40), int(maxw*0.62)+1) if maxw else []:
        cnt=0
        for l in lines:
            if len(l)>c and l[c]==' ' and l[:c].strip() and l[c:].strip(): cnt+=1
        if cnt>best: best=cnt; best_c=c
    # count body lines (with content both sides at best_c)
    two=0
    if best_c:
        for l in lines:
            if len(l)>best_c and l[:best_c].strip() and l[best_c:].strip(): two+=1
    if best_c and two>=6:
        L=[]; R=[]
        for l in lines:
            left=l[:best_c].rstrip(); right=l[best_c:].strip()
            if left.strip(): L.append(left)
            if right: R.append(right)
        body='\n'.join([x for x in L if x.strip()]+[x for x in R if x.strip()])
    else:
        body='\n'.join(x for x in lines if x.strip())
    out.append('\f===PDFPAGE %d===\n%s'%(idx+1,body))
open('data/mmrpg/raw/cols.txt','w').write('\n'.join(out))
print('pages:',len(out))
