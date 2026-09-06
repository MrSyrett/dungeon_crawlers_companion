#!/usr/bin/env python3
"""Generate a self-contained curation page from a baked (auto-reduced) FA bundle.

Reads <bundle>/fa-bundle.json + per-pack manifests + atlas sheets, and writes
<bundle>/curation.html — a SINGLE double-clickable file (thumbnails embedded as data
URLs, nothing external). Show every asset grouped by pack + category, toss what you
don't want, export a keep-list. No server, no install.

Usage: python3 make-curation.py <bundle dir> [out.html]
"""
import json, os, sys, io, base64
from PIL import Image

D = sys.argv[1] if len(sys.argv) > 1 else '.'
OUT = sys.argv[2] if len(sys.argv) > 2 else os.path.join(D, 'curation.html')
THUMB = 96      # embedded at 96px so the hover detail panel is crisp

idx = json.load(open(os.path.join(D, 'fa-bundle.json')))
_sheets = {}
def thumb(a):
    s = a['s']
    if s not in _sheets:
        _sheets[s] = Image.open(os.path.join(D, s)).convert('RGBA')
    im = _sheets[s].crop((a['x'], a['y'], a['x'] + a['w'], a['y'] + a['h']))
    im.thumbnail((THUMB, THUMB), Image.LANCZOS)
    b = io.BytesIO(); im.save(b, 'WEBP', quality=78)
    return 'data:image/webp;base64,' + base64.b64encode(b.getvalue()).decode()

packs = []
total = 0
for p in idx.get('packs', []):
    man = json.load(open(os.path.join(D, p['manifest'])))
    texs = []
    for t in man['textures']:
        texs.append({'id': t['id'], 'name': t['name'], 'img': thumb(t['atlas']),
                     'tm': t.get('tm', '')})     # '' plain | 'multiply' auto-tint | 'redmask' FA colorable
    packs.append({'id': p['id'], 'name': p['name'], 'textures': texs})
    total += len(texs)
    print(f'  {p["name"]}: {len(texs)} thumbs')
DATA = json.dumps({'packs': packs}, separators=(',', ':'))

HTML = r'''<!doctype html><html><head><meta charset="utf-8"><title>FA Curation</title>
<style>
*{box-sizing:border-box}
body{margin:0;background:#14151a;color:#e8e6df;font:13px/1.4 system-ui,Segoe UI,Arial}
header{position:sticky;top:0;z-index:10;background:#1d1f27;border-bottom:1px solid #31343f;
  padding:10px 14px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}
header h1{font-size:15px;margin:0;font-weight:600}
.count{color:#d9b25b;font-weight:600}
.btn{background:#262935;border:1px solid #3a3e4c;color:#e8e6df;border-radius:7px;padding:7px 11px;cursor:pointer;font:inherit}
.btn:hover{border-color:#d9b25b}
.btn.gold{background:#d9b25b;color:#1b1b1f;border-color:#d9b25b;font-weight:600}
input[type=search]{background:#14151a;border:1px solid #3a3e4c;color:#e8e6df;border-radius:7px;padding:7px 10px;min-width:180px;font:inherit}
#wrap{padding:12px 14px 60px}
.pack{margin:18px 0 4px;font-size:14px;font-weight:700;color:#d9b25b;border-bottom:1px solid #31343f;padding-bottom:4px}
.pack .n{font-size:11px;color:#9a9db0;font-weight:400;margin-left:8px}
.cat{margin:14px 0 6px;display:flex;align-items:center;gap:10px}
.cat h3{font-size:12px;margin:0;text-transform:uppercase;letter-spacing:.04em;color:#9a9db0}
.cat .n{color:#9a9db0;font-size:11px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(84px,1fr));gap:6px}
.cell{position:relative;background:#0f1014;border:2px solid #2a2d38;border-radius:7px;aspect-ratio:1;cursor:pointer;overflow:hidden;display:flex;align-items:center;justify-content:center}
.cell img{max-width:100%;max-height:100%;pointer-events:none}
#peek{position:fixed;z-index:50;pointer-events:none;background:#1d1f27;border:1px solid #d9b25b;border-radius:9px;padding:9px;display:none;box-shadow:0 8px 30px rgba(0,0,0,.6);max-width:300px}
#peek img{width:220px;height:220px;object-fit:contain;background:#0f1014;border-radius:6px;display:block}
#peek .pn{margin-top:7px;font-size:13px;color:#e8e6df;word-break:break-word;line-height:1.35}
#peek .pb{margin-top:5px;font-size:11px;font-weight:700;border-radius:3px;padding:1px 5px;display:inline-block}
#peek .pb.mul{background:#d9b25b;color:#1b1b1f}
#peek .pb.red{background:#4a86c4;color:#fff}
.cell.off{opacity:.22}
.cell.off::after{content:"\2717";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:26px;color:#ff6b6b;font-weight:700}
.cell.keep{border-color:#5a9a52}
.cell .tt{position:absolute;top:2px;left:2px;font-size:8px;font-weight:700;border-radius:3px;padding:1px 3px;line-height:1}
.cell .tt.mul{background:#d9b25b;color:#1b1b1f}
.cell .tt.red{background:#4a86c4;color:#fff}
.cell .tg{position:absolute;bottom:2px;right:2px;width:15px;height:15px;border-radius:4px;border:1px solid #556;
  background:rgba(20,21,26,.85);color:#c9ccd6;font-size:10px;line-height:13px;text-align:center;cursor:pointer;z-index:2}
.cell .tg:hover{border-color:#d9b25b;color:#d9b25b}
.cell .tg.on{background:#d9b25b;color:#1b1b1f;border-color:#d9b25b}
.cell .nm{position:absolute;left:0;right:0;bottom:0;background:rgba(0,0,0,.62);font-size:8px;padding:2px 3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mini{background:#262935;border:1px solid #3a3e4c;color:#c9ccd6;border-radius:5px;padding:2px 7px;cursor:pointer;font-size:11px}
.mini:hover{border-color:#d9b25b}
.hint{color:#9a9db0;font-size:12px}
.legend{display:flex;gap:12px;align-items:center;font-size:11px;color:#9a9db0}
.legend b{font-size:8px;font-weight:700;border-radius:3px;padding:1px 4px;line-height:1;margin-right:4px}
.legend b.mul{background:#d9b25b;color:#1b1b1f}
.legend b.red{background:#4a86c4;color:#fff}
</style></head><body>
<header>
  <h1>FA Curation</h1>
  <span class="count"><span id="kn">0</span> / <span id="tn">0</span> kept</span>
  <input type="search" id="q" placeholder="Filter by name...">
  <button class="mini" id="allOn">Keep all</button>
  <button class="mini" id="allOff">Toss all</button>
  <span class="legend"><span><b class="red">FA</b>FA colorable</span><span><b class="mul">TINT</b>auto tint-base</span>
    <span class="hint">Click a tile to toss/keep. The &#9680; corner toggles whether a tile recolours in the Map Maker.</span></span>
  <button class="btn gold" id="exp" style="margin-left:auto">Export keep-list</button>
</header>
<div id="wrap"></div>
<div id="peek"><img><div class="pn"></div><span class="pb"></span></div>
<script>
const DATA = /*__DATA__*/;
const peek=document.getElementById("peek"), peekImg=peek.querySelector("img"), peekNm=peek.querySelector(".pn"), peekB=peek.querySelector(".pb");
function showPeek(it){ peekImg.src=it.img; peekNm.textContent=it.name;
  const m=tint[it.id]; peekB.className="pb "+(m==="redmask"?"red":m==="multiply"?"mul":""); peekB.textContent=m==="redmask"?"FA colorable":m==="multiply"?"auto tint-base":"plain"; peekB.style.display="inline-block";
  peek.style.display="block"; }
function movePeek(e){ const w=peek.offsetWidth||300, h=peek.offsetHeight||300;
  let x=e.clientX+18, y=e.clientY+18;
  if(x+w>innerWidth) x=e.clientX-w-18; if(y+h>innerHeight) y=innerHeight-h-8;
  peek.style.left=x+"px"; peek.style.top=Math.max(8,y)+"px"; }
function hidePeek(){ peek.style.display="none"; }
const kept = new Set();
const tint = {};   // id -> 'multiply' | 'redmask' | '' (curator's final choice)
const items = [];
for(const p of DATA.packs) for(const t of p.textures){
  const cat = t.name.split(" ").slice(0,2).join(" ") || "Other";
  items.push({id:t.id, name:t.name, img:t.img, tm:t.tm||"", pack:p.name, cat});
  kept.add(t.id); tint[t.id]=t.tm||"";
}
document.getElementById("tn").textContent = items.length;
function updCount(){ document.getElementById("kn").textContent = kept.size; }
function toggle(cell){ const id=cell._id; if(kept.has(id)){ kept.delete(id); cell.classList.add("off"); cell.classList.remove("keep"); } else { kept.add(id); cell.classList.remove("off"); cell.classList.add("keep"); } updCount(); }
const wrap = document.getElementById("wrap");
function render(filter){
  wrap.innerHTML="";
  const f=(filter||"").toLowerCase();
  const byPack=new Map();
  for(const it of items){
    if(f && it.name.toLowerCase().indexOf(f)<0) continue;
    if(!byPack.has(it.pack)) byPack.set(it.pack,new Map());
    const cats=byPack.get(it.pack);
    if(!cats.has(it.cat)) cats.set(it.cat,[]);
    cats.get(it.cat).push(it);
  }
  for(const [pack,cats] of byPack){
    const ph=document.createElement("div"); ph.className="pack";
    const pn=[...cats.values()].reduce((s,a)=>s+a.length,0);
    ph.textContent=pack; const s=document.createElement("span"); s.className="n"; s.textContent="("+pn+")"; ph.appendChild(s);
    wrap.appendChild(ph);
    for(const [cat,list] of [...cats].sort((a,b)=>a[0].localeCompare(b[0]))){
      const ch=document.createElement("div"); ch.className="cat";
      const h=document.createElement("h3"); h.textContent=cat; ch.appendChild(h);
      const n=document.createElement("span"); n.className="n"; n.textContent="("+list.length+")"; ch.appendChild(n);
      const on=document.createElement("button"); on.className="mini"; on.textContent="keep row";
      const off=document.createElement("button"); off.className="mini"; off.textContent="toss row";
      ch.appendChild(on); ch.appendChild(off); wrap.appendChild(ch);
      const grid=document.createElement("div"); grid.className="grid"; wrap.appendChild(grid);
      const cells=[];
      for(const it of list){
        const cell=document.createElement("div"); cell.className="cell "+(kept.has(it.id)?"keep":"off"); cell._id=it.id;
        const im=document.createElement("img"); im.loading="lazy"; im.src=it.img; cell.appendChild(im);
        const badge=document.createElement("span"); badge.className="tt"; cell.appendChild(badge);
        const tg=document.createElement("span"); tg.className="tg"; tg.title="Toggle recolour (tint) for this asset"; tg.textContent="◐"; cell.appendChild(tg);
        const nm=document.createElement("span"); nm.className="nm"; nm.textContent=it.name; cell.appendChild(nm);
        function paintBadge(){ const m=tint[it.id];
          badge.className="tt "+(m==="redmask"?"red":m==="multiply"?"mul":"");
          badge.textContent = m==="redmask"?"FA":m==="multiply"?"TINT":"";
          badge.style.display = m?"":"none";
          tg.classList.toggle("on", !!m); }
        paintBadge();
        tg.onclick=(e)=>{ e.stopPropagation(); tint[it.id] = tint[it.id] ? "" : (it.tm==="redmask"?"redmask":"multiply"); paintBadge(); if(peek.style.display==="block") showPeek(it); };
        cell.onclick=()=>toggle(cell);
        cell.onmouseenter=(e)=>{ showPeek(it); movePeek(e); };
        cell.onmousemove=movePeek;
        cell.onmouseleave=hidePeek;
        grid.appendChild(cell); cells.push(cell);
      }
      on.onclick=()=>{ for(const c of cells){ kept.add(c._id); c.classList.remove("off"); c.classList.add("keep"); } updCount(); };
      off.onclick=()=>{ for(const c of cells){ kept.delete(c._id); c.classList.add("off"); c.classList.remove("keep"); } updCount(); };
    }
  }
  updCount();
}
document.getElementById("allOn").onclick=()=>{ for(const it of items) kept.add(it.id); render(document.getElementById("q").value); };
document.getElementById("allOff").onclick=()=>{ kept.clear(); render(document.getElementById("q").value); };
let qt; document.getElementById("q").oninput=(e)=>{ clearTimeout(qt); qt=setTimeout(()=>render(e.target.value),200); };
document.getElementById("exp").onclick=()=>{
  const t={}; for(const id of kept){ if(tint[id]) t[id]=tint[id]; }   // only kept ids, with their final tint mode
  const out={version:1, count:kept.size, keep:[...kept], tint:t};
  const blob=new Blob([JSON.stringify(out)],{type:"application/json"});
  const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="fa-keep-list.json"; a.click();
};
render("");
</script></body></html>'''

open(OUT, 'w').write(HTML.replace('/*__DATA__*/', DATA))
mb = os.path.getsize(OUT) / 1024 / 1024
print(f'wrote {OUT}  ({mb:.1f} MB, {total} assets across {len(packs)} packs)')
