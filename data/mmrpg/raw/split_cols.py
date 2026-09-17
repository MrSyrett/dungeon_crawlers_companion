import re
raw=open('data/mmrpg/raw/full_layout.txt',encoding='utf-8').read()
pages=raw.split('\f')

def split_page(lines):
    """Return reconstructed body text for one -layout page.
    A page is two-column only when there is a genuine blank GUTTER band near
    the centre with substantial inked text on BOTH sides. Otherwise it is a
    single column (this avoids the old bug where a wide-left-margin single
    column got a false gutter cut mid-text)."""
    body=[l for l in lines if l.strip()]
    if not body:
        return ''
    maxw=max(len(l) for l in lines)
    # ink[c] = number of body lines with a non-space char at column c
    ink=[0]*(maxw+1)
    for l in body:
        for c,ch in enumerate(l):
            if ch!=' ': ink[c]+=1
    n=len(body)
    lo=int(maxw*0.33); hi=int(maxw*0.63)
    # a gutter column: (almost) no ink across body lines
    thresh=max(1, n*0.06)
    # longest run of low-ink columns inside the central band
    best_run=(0,0,0)  # (length, start, end)
    c=lo
    while c<=hi:
        if ink[c]<=thresh:
            s=c
            while c<=hi and ink[c]<=thresh: c+=1
            if c-s>best_run[0]: best_run=(c-s, s, c)
        else:
            c+=1
    runlen,gs,ge=best_run
    two=False
    if runlen>=2:
        gut=(gs+ge)//2
        # need real text on both sides
        left_ink=sum(ink[:gs]); right_ink=sum(ink[ge:])
        left_lines=sum(1 for l in body if l[:gs].strip())
        right_lines=sum(1 for l in body if len(l)>ge and l[ge:].strip())
        if left_lines>=6 and right_lines>=6 and left_ink>0 and right_ink>0:
            two=True
    if two:
        gut=(gs+ge)//2
        L=[l[:gut].rstrip() for l in lines if l[:gut].strip()]
        R=[l[gut:].rstrip() for l in lines if len(l)>gut and l[gut:].strip()]
        return '\n'.join([x for x in L if x.strip()]+[x for x in R if x.strip()])
    return '\n'.join(body)

out=[]
for idx,pg in enumerate(pages):
    lines=[ln.rstrip() for ln in pg.split('\n')]
    out.append('\f===PDFPAGE %d===\n%s'%(idx+1, split_page(lines)))
open('data/mmrpg/raw/cols.txt','w').write('\n'.join(out))
print('pages:',len(out))
