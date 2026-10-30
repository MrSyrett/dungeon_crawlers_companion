import re
def style_blocks(h):
    """(start,end,attrs,css) for <style> elements that are real document styles (not inside <script>)."""
    res=[];i=0;n=len(h)
    tag=re.compile(r'<(/?)(script|style)\b([^>]*)>',re.I)
    in_script=False
    pos=0
    while True:
        m=tag.search(h,pos)
        if not m: break
        close,name,attrs=m.group(1),m.group(2).lower(),m.group(3)
        if name=='script' and not close:
            if re.search(r'\bsrc=',attrs): 
                e=h.find('</script>',m.end()); pos=e+9; continue
            e=h.find('</script>',m.end()); pos=e+9; continue
        if name=='style' and not close:
            e=h.find('</style>',m.end())
            res.append((m.start(),e+8,attrs,h[m.end():e])); pos=e+8; continue
        pos=m.end()
    return res
