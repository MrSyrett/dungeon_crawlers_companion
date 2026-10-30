import json,re
T=json.load(open('gmtheme/tokens.json'))
TITLE={'SD':'"JSL Blackletter"','ICRPG':'"Permanent Marker"','NIM':'"Fraunces"','DND':'"DnDC","Cinzel"','LOTR':'"Ringbearer","EB Garamond"','DB':'"Hideout","EB Garamond"','PB':'"JSL Blackletter","EB Garamond"','DCC':'"Anton"','KOB':'"Dreadful"','CO':'"Cormorant Garamond"','MMRPG':'"Marvel","Oswald"','JLU':'"Russo One"','GB':'"Ghostbusters","Anton"','SW':'"Star Jedi","Archivo Black"','ACE':'"Lilita One"','D62E':'"Saira Condensed"','YZE':'"Archivo Narrow"','TWD':'"Dead Kansas","Oswald"','MYZ':'"Anton"','VAE':'"Fraunces"'}
LABEL={'SD':'"Old Newspaper"','DND':'"Cinzel"','PB':'"1651 Alchemy"'}
UI={'SD':'"Old Newspaper"','DND':'"Cinzel"','DCC':'"Barlow Condensed"','SW':'"Libre Franklin"','MMRPG':'"Oswald"','ACE':'"Nunito"','KOB':'"Mulish"','D62E':'"Saira Condensed"','GB':'"Asap"','CO':'"Lora"','NIM':'"Figtree"','ICRPG':'"Archivo"','YZE':'"Archivo Narrow"','TWD':'"Oswald"','MYZ':'"Barlow Condensed"','VAE':'"Cormorant Garamond"','LOTR':'"EB Garamond"','DB':'"EB Garamond"','PB':'"1651 Alchemy"','JLU':'"Rubik"'}
def lum(h):
    h=h.lstrip('#'); c=[int(h[i:i+2],16)/255 for i in (0,2,4)]
    c=[x/12.92 if x<=.03928 else ((x+.055)/1.055)**2.4 for x in c]
    return .2126*c[0]+.7152*c[1]+.0722*c[2]
SEC={'ACE':'#f4d84a','CO':'#d8b24a','DB':'#c9a14a','DND':'#e2b23a','JLU':'#e2b23a','KOB':'#3cc4c4','MMRPG':'#7fc0f5','MYZ':'#d9d3c6','NIM':'#8ab4f8','SW':'#30d5e8','TWD':'#d8cfbf','VAE':'#e7dec9','LOTR':'#9cc59a'}
TCOL={'DND':'#e2b23a','SW':'#f6d21e','CO':'#d8b24a','D62E':'#f0a050','DCC':'#f2c230','LOTR':'#e2c36b','NIM':'#7fd39a','DB':'#e42a32'}
def hx(c): return '#%02x%02x%02x'%tuple(round(x) for x in c)
def rgb(h): h=h.lstrip('#'); return [int(h[i:i+2],16) for i in (0,2,4)]
def ink(h, bg='#1a1d22', need=4.5):
    c=rgb(h); lb=lum(bg)
    for t in range(0,101,5):
        m=[x+(255-x)*t/100 for x in c]; L=lum(hx(m))
        if (L+.05)/(lb+.05)>=need: return hx(m)
    return '#ffffff'
LIGHT={}
out=['/* ── Campaign theme (set from the linked campaign: <html data-gm-theme="SYS">) ──',
 '   A hybrid: the top monitor bar, the bottom tools bar, the window headers, the accent',
 '   colour and the heading fonts follow the campaign\'s game (the same tokens its',
 '   Adventure Prep uses, from public/tokens.css); window backgrounds and content stay',
 '   neutral. With no campaign linked the screen keeps the app\'s neutral grey. Shadowdark, Pirate',
 '   Borg and D&D use their second face (the logo faces are hard to read at this size);',
 '   Vaesen\'s bars are its deep blue so the gold only marks accents. */']
for k,v in T.items():
    a=v['--banner-a'] or v['--ui-bg']; b=v['--banner-b'] or v['--ui-panel']
    if k=='VAE': a,b='#1b2a4a','#2f4772'
    L=max(lum(a),lum(b)); pa,pb=(70,55) if L<.2 else (55,40) if L<.35 else (45,30)
    head=LABEL.get(k,TITLE.get(k,'"Geist"'))
    txt=v['--sys-text'] or '"Geist", sans-serif'
    acc=v['--ui-accent']
    # User picks (2026-10-29): which colour letters the fonts and which marks the highlights.
    #   SW: yellow lettering, cyan highlights. DB: green/white lettering, gold highlights. MMRPG: white lettering.
    OVR={'SW':dict(acc='#30d5e8',title='#f6d21e',acci='#f0c020',sec='#f0c020',hl='#30d5e8'),
         'DB':dict(acc='#c9a14a',title='#ffffff',acci='#5cb894',sec='#5cb894',hl='#c9a14a'),
         'MMRPG':dict(title='#ffffff',acci='#ffffff',sec='#ffffff',hl='#7fc0f5'),
         # (29 Oct) White lettering: Shadowdark, Pirate Borg, Ghostbusters, TWD. DCC: magenta
         # highlights, gold lettering. ACE!: blue bars, yellow lettering, sky-blue highlights.
         'SD':dict(title='#ffffff',acci='#ffffff',sec='#ffffff'),
         'PB':dict(title='#ffffff',acci='#ffffff',sec='#ffffff'),
         'GB':dict(title='#ffffff',acci='#ffffff',sec='#ffffff'),
         'TWD':dict(title='#ffffff',acci='#ffffff',sec='#ffffff'),
         'DCC':dict(acc='#e0389a',hl='#e0389a',title='#f2c230',acci='#f2c230',sec='#f2c230'),
         'ACE':dict(bars=('#114c6a','#1d6f9a'),title='#f4d84a',acci='#f4d84a',sec='#f4d84a',hl='#3aa8e0')}.get(k,{})
    if 'bars' in OVR: a,b=OVR['bars']; L=max(lum(a),lum(b)); pa,pb=(70,55) if L<.2 else (55,40) if L<.35 else (45,30)
    acc=OVR.get('acc',acc)
    A_INK={'TWD':'#e8483a'}
    tcol=ink(TCOL.get(k,A_INK.get(k,acc))); sec=ink(SEC.get(k,acc)); acci=ink(A_INK.get(k,acc))
    tcol=OVR.get('title',tcol); acci=OVR.get('acci',acci); hl=ink(OVR.get('hl',SEC.get(k,acc))); sec=OVR.get('sec',sec)
    LIGHT[k]=dict(acc=acc,title=tcol,sec=sec,hl=hl,acci=acci,b=b)
    out.append(f':root[data-gm-theme="{k}"]{{--accent:{acc};--accent-2:color-mix(in srgb,{acc} 70%,#000);--accent-dim:color-mix(in srgb,{acc} 55%,#000);--glow:color-mix(in srgb,{acc} 45%,transparent);--glow-2:color-mix(in srgb,{acc} 34%,transparent);--gt-a:{a};--gt-b:{b};--gt-bg:{v["--ui-bg"]};--gt-panel:{v["--ui-panel"]};--gt-text:{v["--ui-text"]};--gt-head:{head},"Geist",sans-serif;--gt-ui:{UI[k]},"Geist",sans-serif;--gt-pa:{pa}%;--gt-pb:{pb}%;--gt-body:{txt};--gt-wh:{(UI[k] if k in ('MMRPG','KOB','TWD','GB') else head)},"Geist",sans-serif;--gt-title:{tcol};--gt-2:{sec};--gt-hl:{hl};--gt-acc:{acci}}}')
out.append(""":root[data-gm-theme] .topbar{background:linear-gradient(120deg,color-mix(in srgb,var(--gt-a) var(--gt-pa),#000),color-mix(in srgb,var(--gt-b) var(--gt-pb),var(--gt-bg)))!important;border-bottom-color:color-mix(in srgb,var(--accent) 40%,transparent)!important}
:root[data-gm-theme] .bottom-bar{background:linear-gradient(180deg,color-mix(in srgb,var(--gt-b) calc(var(--gt-pb) - 10%),var(--gt-bg)),color-mix(in srgb,var(--gt-a) calc(var(--gt-pa) - 10%),#000))!important;box-shadow:0 -2px 0 color-mix(in srgb,var(--accent) 30%,transparent),0 -6px 16px rgba(0,0,0,.4)!important}
:root[data-gm-theme] .cst-head{background:linear-gradient(180deg,color-mix(in srgb,var(--gt-panel) 92%,var(--gt-text)),var(--gt-panel))!important;box-shadow:0 1px 0 color-mix(in srgb,var(--accent) 35%,transparent)!important}
:root[data-gm-theme] .advh-title,:root[data-gm-theme] .advh-card-h,:root[data-gm-theme] .advh-row-name{font-family:var(--gt-head)!important;letter-spacing:.06em}
:root[data-gm-theme] .cst-title{font-family:var(--gt-wh)!important;letter-spacing:.1em}
:root[data-gm-theme] .qbtn,:root[data-gm-theme] .cm-name,:root[data-gm-theme] .bb-restore-btn{font-family:var(--gt-ui)!important;letter-spacing:.08em}
:root[data-gm-theme] .cst-title,:root[data-gm-theme] .advh-title{color:var(--gt-title)!important}
:root[data-gm-theme] .advh-sub,:root[data-gm-theme] .advh-scene-lbl{color:var(--gt-2)!important}
:root[data-gm-theme] .advh-card-h,:root[data-gm-theme] .advh-n,:root[data-gm-theme] .advh-troll{color:var(--gt-acc)!important}
:root[data-gm-theme] .topbar::after{background:linear-gradient(90deg,transparent,var(--accent) 25%,var(--gt-hl) 75%,transparent)!important}
:root[data-gm-theme] .cmode-tab.active::before{background:linear-gradient(90deg,var(--accent),var(--gt-hl))!important}
:root[data-gm-theme] .cst-head{border-bottom:1px solid color-mix(in srgb,var(--gt-hl) 30%,transparent)}
:root[data-gm-theme] .bb-restore-btn .qi,:root[data-gm-theme] .bottom-bar .qbtn .qi{color:var(--gt-hl)}
/* Star Jedi draws its Star Wars capitals on the LOWERCASE keys; uppercase letters are a different,
   plainer set, so a capitalised first letter came out in another style. Lowercase everything it sets. */
:root[data-gm-theme="SW"] :is(.cst-title,.advh-title,.advh-card-h,.advh-row-name){text-transform:lowercase!important}
:root[data-gm-theme] .qbtn,:root[data-gm-theme] .bb-restore-btn{color:color-mix(in srgb,var(--gt-text) 85%,#fff)!important}
:root[data-gm-theme] .advh-prose,:root[data-gm-theme] .advh-desc,:root[data-gm-theme] .advh-readaloud{font-family:var(--gt-body),"Geist",sans-serif}
:root[data-gm-theme] .cmode-tab:hover,:root[data-gm-theme] .qbtn:hover{background:color-mix(in srgb,var(--accent) 9%,transparent)!important}
:root[data-gm-theme] .cmode-tab.active{background:linear-gradient(180deg,color-mix(in srgb,var(--accent) 12%,transparent),transparent)!important}
:root[data-gm-theme] .bb-restore-btn{background:color-mix(in srgb,var(--accent) 8%,transparent)!important}""")
out.append('''
/* Readable text on the coloured bars: the screen's greys are tuned for its near-black panels and
   vanish on a red or green bar, so inside the two bars the text tokens are lifted to white-based
   values, and anything lettered in the accent uses a light tint of it (a red accent on a red bar
   would disappear). Fills, borders and the accent lines keep the true accent. */
:root[data-gm-theme] .topbar,:root[data-gm-theme] .bottom-bar{--dim:rgba(255,255,255,.66);--mid:rgba(255,255,255,.78);--light:#f1f2f4;--white:#fff;--border:rgba(255,255,255,.16);--gt-ink:color-mix(in srgb,var(--accent) 40%,#fff)}
:root[data-gm-theme] .topbar :is(.gmc-round-lbl,.tel-clbl,.party-empty,.io-btn,.cm-name,.cm-ico,.bb-lbl),:root[data-gm-theme] .bottom-bar :is(.cm-name,.cm-ico,.bb-lbl){text-shadow:0 1px 2px rgba(0,0,0,.55)}
:root[data-gm-theme] .party-empty{opacity:1}
:root[data-gm-theme] .gmc-round-num,:root[data-gm-theme] .tel-time,:root[data-gm-theme] .cmode-tab.active .cm-ico,:root[data-gm-theme] .cmode-tab.active .cm-name,:root[data-gm-theme] .bb-restore-btn .qi{color:var(--gt-ink)!important;text-shadow:0 1px 2px rgba(0,0,0,.55)}
:root[data-gm-theme] .cmode-tab.active{background:linear-gradient(180deg,rgba(255,255,255,.12),transparent)!important}
:root[data-gm-theme] .bottom-bar .qbtn,:root[data-gm-theme] .bottom-bar .bb-restore-btn{background:rgba(10,12,16,.55)!important;border-color:rgba(255,255,255,.16)!important}
:root[data-gm-theme] .bottom-bar .qbtn:hover,:root[data-gm-theme] .bottom-bar .bb-restore-btn:hover{background:rgba(10,12,16,.72)!important;border-color:var(--gt-ink)!important}''')

# ── Light mode (2026-10-29) ── tokens only (custom properties), keyed off <html data-mode="light">
# (set from localStorage.dd_theme). The bars keep their system colour and their dark-mode
# contents; panels, window headers and popups go light, so every colour that letters or marks
# something on a light surface is darkened here until it reads (>= 4.5:1 on the light header).
# The rules that USE these tokens in light mode live in the page's <style id="gm-light"> block
# (generated by the light-mode builder), which also restores the dark tokens inside the bars.
def mixc(h1,h2,t):
    a,b=rgb(h1),rgb(h2); return hx([a[i]+(b[i]-a[i])*t for i in range(3)])
def cr(h1,h2):
    a,b=lum(h1),lum(h2); a,b=max(a,b),min(a,b); return (a+.05)/(b+.05)
def dark_ink(h, bg, need=4.6):
    if lum(h)>.8: return '#1b1d22'          # white lettering in dark -> near-black ink in light
    for t in range(0,101,2):
        m=mixc(h,'#000000',t/100)
        if cr(m,bg)>=need: return m
    return '#000000'
out.append('/* ── Light mode: the same campaign colours, darkened where they letter a light surface ── */')
for k,L in LIGHT.items():
    hd=mixc(L['b'],'#ffffff',.91)                 # the light window-header tint (see gm-light)
    al=dark_ink(L['acc'],'#f8f9fa')
    t=dark_ink(L['title'],hd); s2=dark_ink(L['sec'],'#f8f9fa'); hl=dark_ink(L['hl'],'#f8f9fa'); ac=dark_ink(L['acci'],'#f8f9fa')
    out.append(f':root[data-mode="light"][data-gm-theme="{k}"]{{--accent:{al};--accent-2:color-mix(in srgb,{al} 75%,#000);--accent-dim:color-mix(in srgb,{al} 55%,#fff);--glow:color-mix(in srgb,{al} 30%,transparent);--glow-2:color-mix(in srgb,{al} 22%,transparent);--gt-title:{t};--gt-2:{s2};--gt-hl:{hl};--gt-acc:{ac}}}')
    # The bars (and the Adventure prep sheet, which draws its own light page) keep the dark-mode
    # values; the party / tracker cards sitting on the top bar are light cards again.
    out.append(f':root[data-mode="light"][data-gm-theme="{k}"] :is(.topbar,.bottom-bar,.advh-sheet){{--accent:{L["acc"]};--accent-2:color-mix(in srgb,{L["acc"]} 70%,#000);--accent-dim:color-mix(in srgb,{L["acc"]} 55%,#000);--glow:color-mix(in srgb,{L["acc"]} 45%,transparent);--glow-2:color-mix(in srgb,{L["acc"]} 34%,transparent);--gt-title:{L["title"]};--gt-2:{L["sec"]};--gt-hl:{L["hl"]};--gt-acc:{L["acci"]}}}')
    out.append(f':root[data-mode="light"][data-gm-theme="{k}"] .topbar :is(.bubble,.timer,.ticktrk){{--accent:{al};--accent-2:color-mix(in srgb,{al} 75%,#000);--accent-dim:color-mix(in srgb,{al} 55%,#fff);--glow:color-mix(in srgb,{al} 30%,transparent);--glow-2:color-mix(in srgb,{al} 22%,transparent);--gt-title:{t};--gt-2:{s2};--gt-hl:{hl};--gt-acc:{ac}}}')
open('gmtheme/theme.css','w').write('\n'.join(out)+'\n')
print(len(out))
