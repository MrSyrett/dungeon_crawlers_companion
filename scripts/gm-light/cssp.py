"""Tiny CSS parser good enough for gm_screen.html's own stylesheets."""
import re

def strip_comments(css):
    out=[];i=0;n=len(css);q=None
    while i<n:
        c=css[i]
        if q:
            out.append(c)
            if c=='\\' and i+1<n: out.append(css[i+1]); i+=2; continue
            if c==q: q=None
            i+=1; continue
        if c in '"\'': q=c; out.append(c); i+=1; continue
        if c=='/' and i+1<n and css[i+1]=='*':
            j=css.find('*/',i+2); i=n if j<0 else j+2; continue
        out.append(c); i+=1
    return ''.join(out)

def _scan_to(css,i,stops):
    """scan from i to first char in stops at paren depth 0 outside quotes; return index"""
    n=len(css);q=None;d=0
    while i<n:
        c=css[i]
        if q:
            if c=='\\': i+=2; continue
            if c==q: q=None
        elif c in '"\'': q=c
        elif c=='(': d+=1
        elif c==')': d-=1
        elif d==0 and c in stops: return i
        i+=1
    return n

def parse(css, i=0, top=True):
    """returns list of nodes: ('rule', selector, decltext) | ('at', prelude, children|None, raw)"""
    nodes=[];n=len(css)
    while i<n:
        while i<n and css[i] in ' \t\r\n;': i+=1
        if i>=n: break
        if css[i]=='}':
            return nodes,i+1
        j=_scan_to(css,i,'{;}')
        pre=css[i:j].strip()
        if j>=n: break
        if css[j]==';' or css[j]=='}':  # at-statement like @import
            nodes.append(('stmt',pre)); i=j+1 if css[j]==';' else j; continue
        # css[j]=='{'
        if pre.startswith('@'):
            name=pre.split()[0].lower() if pre.split() else pre
            if name in ('@media','@supports','@container','@layer','@document'):
                ch,k=parse(css,j+1,False); nodes.append(('at',pre,ch)); i=k; continue
            # opaque block (keyframes, font-face, page...)
            k=match_brace(css,j); nodes.append(('raw',pre,css[j+1:k])); i=k+1; continue
        k=_scan_to(css,j+1,'}')
        nodes.append(('rule',pre,css[j+1:k])); i=k+1
    return nodes,i

def match_brace(css,j):
    d=0;q=None;i=j;n=len(css)
    while i<n:
        c=css[i]
        if q:
            if c=='\\': i+=2; continue
            if c==q: q=None
        elif c in '"\'': q=c
        elif c=='{': d+=1
        elif c=='}':
            d-=1
            if d==0: return i
        i+=1
    return n

def decls(text):
    out=[];i=0;n=len(text)
    while i<n:
        j=_scan_to(text,i,';')
        d=text[i:j].strip()
        if d and ':' in d:
            p,v=d.split(':',1); out.append((p.strip(),v.strip()))
        i=j+1
    return out

def split_sel(sel):
    out=[];i=0
    while True:
        j=_scan_to(sel,i,',')
        out.append(sel[i:j].strip())
        if j>=len(sel): break
        i=j+1
    return [s for s in out if s]
