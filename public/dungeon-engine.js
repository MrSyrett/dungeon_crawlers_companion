/* ════════════════════════════════════════════════════════════════════
   DUNGEON ENGINE — shared random-dungeon generator + hand-drawn renderer.
   Extracted from tools/templates/dungeon_map_maker.html so the GM Screen
   and the Session Prep builder produce the SAME maps as the Map Maker.

   UI-agnostic: no DOM controls, no persistence, no interactivity. It only
   needs a <canvas> (created internally) to rasterise.

   API (window.DungeonEngine):
     generate(opts) -> mapData
       opts: { rooms=8, size=3 (1..5), layout=3 (1..5), entrances=2,
               corridors=true, roundRooms=false, theme='light'|'dark',
               seed?=uint }
     toPNG(mapData, { theme, transparent=false, pad=1.5, res=2 }) -> dataURL
     generateToPNG(opts) -> { png, mapData, width, height }

   ⚠ Keep in sync with dungeon_map_maker.html — the generator + render
   primitives are copied from it verbatim (that tool stays self-contained).
   ════════════════════════════════════════════════════════════════════ */
window.DungeonEngine = (function(){
  "use strict";

  const CELL = 32;                       // world px per grid cell at scale 1
  const SIZE_MAP = {1:[3,4],2:[4,6],3:[5,8],4:[7,11],5:[9,15]};

  const THEMES = {
    light: {
      bg:"#d9d0bd", rockHi:"#efe8d7", floor:"#f4efe3",
      grid:"#1b2028", dot:"#8a8a8a", hatch:"#33302a",   // grid = near-black blue-grey
      ink:"#14120d", doorFill:"#fbf8f0", doorWood:"#8b5e3c", shadow:"rgba(20,17,12,.18)", sel:"#c9a94a",
    },
  };
  // Dark mode changes ONLY the exterior background (rooms/walls/floors/etc. stay).
  THEMES.dark = Object.assign({}, THEMES.light, { bg:"#171a21", rockHi:"#232833" });

  // ── per-render state (module-scoped; (re)set before each render) ──
  let map = null, cam = {x:0,y:0,scale:1}, W = 0, H = 0, DPR = 1;
  let exporting = true, noRock = false, ctx = null;
  // Advanced-Mode textures. The HOST (Map Maker) owns loading/caching and hands
  // in ready <img> elements; the engine only turns them into aligned patterns.
  // Absent ⇒ classic flat-colour render, which is what GM Screen / Session Prep
  // get since they never pass any.
  let tex = null;
  const C = Object.assign({}, THEMES.light);
  function oc(){ return document.createElement("canvas"); }
  const buf = { mask:oc(), tint:oc(), grid:oc(), wall:oc(), erode:oc(), deco:oc(), decoClip:oc(),
                 light:oc(), ltint:oc(), wsh:oc() };
  function sizeBufs(){ for(const k in buf){ if(buf[k].width!==W||buf[k].height!==H){ buf[k].width=W; buf[k].height=H; } } }
  function setThemeColors(t){ Object.assign(C, THEMES[(t==="dark")?"dark":"light"]); }
  const clamp = (v,lo,hi)=> Math.max(lo, Math.min(hi, v));

  // ── coordinate helpers (world cells ↔ output px) ──
  function wpx(){ return CELL * cam.scale; }

  // A repeating world-aligned pattern for a texture tile that is `cells` grid
  // cells wide: scaled so one tile spans exactly that many cells at the current
  // zoom, and translated so the tile grid lines up with world (0,0) — the same
  // origin the square grid uses, so texture and grid never drift apart.
  function patFor(c, t){
    if(!t || !t.img) return null;
    const img=t.img; if(!img.complete || !img.naturalWidth) return null;
    let p; try { p=c.createPattern(img, "repeat"); } catch(e){ return null; }
    if(!p || !p.setTransform || typeof DOMMatrix==="undefined") return null;
    const s=(wpx()*(t.cells||4))/img.naturalWidth, o=toScreen(0,0);
    try { p.setTransform(new DOMMatrix([s,0,0,s,o[0],o[1]])); } catch(e){ return null; }
    return p;
  }
  function toScreen(wx, wy){ return [ (wx - cam.x)*wpx() + W/2, (wy - cam.y)*wpx() + H/2 ]; }

  // ── geometry / hit test ──
  function pointInShape(wx,wy,sh){
    if(sh.type==="rect") return wx>=sh.x&&wx<=sh.x+sh.w&&wy>=sh.y&&wy<=sh.y+sh.h;
    if(sh.type==="circle") return Math.hypot(wx-sh.cx,wy-sh.cy)<=sh.r;
    if(sh.type==="polygon"){ let c=false,pts=sh.pts;
      for(let i=0,j=pts.length-1;i<pts.length;j=i++){
        if(((pts[i][1]>wy)!=(pts[j][1]>wy)) &&
           (wx<(pts[j][0]-pts[i][0])*(wy-pts[i][1])/(pts[j][1]-pts[i][1])+pts[i][0])) c=!c; }
      return c; }
    return false;
  }
  function pointInAny(wx,wy){ const S=map.shapes; for(let i=0;i<S.length;i++) if(pointInShape(wx,wy,S[i])) return true; return false; }
  function bounds(o,kind){
    if(kind==="shape"){
      if(o.type==="rect") return {x:o.x,y:o.y,w:o.w,h:o.h};
      if(o.type==="circle") return {x:o.cx-o.r,y:o.cy-o.r,w:o.r*2,h:o.r*2};
      if(o.type==="polygon"){ const xs=o.pts.map(p=>p[0]),ys=o.pts.map(p=>p[1]);
        const x=Math.min(...xs),y=Math.min(...ys); return {x,y,w:Math.max(...xs)-x,h:Math.max(...ys)-y}; }
    }
    return null;
  }
  function contentBounds(){
    const pts=[];
    for(const s of map.shapes){ const b=bounds(s,"shape"); if(b){pts.push([b.x,b.y],[b.x+b.w,b.y+b.h]);} }
    for(const w of map.walls){ pts.push([w.x1,w.y1],[w.x2,w.y2]);
      if(w.cx!==undefined) for(const p of wallSamples(w)) pts.push(p); }   // arc can bow past its ends
    for(const o of (map.objects||[])){ const b=objBox(o); pts.push([b.x,b.y],[b.x+b.w,b.y+b.h]); }
    for(const d of map.doors) pts.push([d.x,d.y]);
    for(const s of map.stairs){ if(s.ax!==undefined){ pts.push([s.ax,s.ay],[s.bx,s.by],[s.tx,s.ty]); }
      else if(s.x1!==undefined){ pts.push([s.x1,s.y1],[s.x2,s.y2]); } else pts.push([s.x,s.y]); }
    if(!pts.length) return null;
    const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);
    return {x:Math.min(...xs),y:Math.min(...ys),X:Math.max(...xs),Y:Math.max(...ys)};
  }

  // stable pseudo-random from a world position — keeps the rough edge from shimmering
  function seeded(x,y){ let s=(Math.floor(x*8191)^Math.floor(y*131071))>>>0; s=(s^0x9e3779b9)>>>0;
    return function(){ s=(s*1664525+1013904223)>>>0; return s/4294967296; }; }

  // draw a single floor shape's path into a 2d context (output space)
  function shapePath(c, sh){
    const p = wpx();
    if(sh.type==="rect"){ const [x,y]=toScreen(sh.x, sh.y); c.rect(x, y, sh.w*p, sh.h*p); }
    else if(sh.type==="circle"){ const [x,y]=toScreen(sh.cx, sh.cy); c.moveTo(x+sh.r*p, y); c.arc(x, y, sh.r*p, 0, Math.PI*2); }
    else if(sh.type==="polygon" && sh.pts.length>1){
      // Emit with the SAME winding as rect()/arc() (positive shoelace). These
      // subpaths are unioned via fill/clip "nonzero"; a polygon the user happened
      // to click the other way round winds −1, cancels against its neighbour and
      // punches a HOLE in the floor wherever two rooms overlap.
      const pts=sh.pts, n=pts.length; let a2=0;
      for(let i=0;i<n;i++){ const q=pts[(i+1)%n]; a2 += pts[i][0]*q[1] - q[0]*pts[i][1]; }
      const rev = a2 < 0;
      for(let i=0;i<n;i++){ const q = pts[rev ? n-1-i : i];
        const [x,y]=toScreen(q[0], q[1]); if(i===0) c.moveTo(x,y); else c.lineTo(x,y); }
      c.closePath();
    }
  }

  // ════════════════════════════════ RENDER ════════════════════════════════
  function render(){
    ctx.setTransform(DPR,0,0,DPR,0,0);
    doorHalf=null;                      // per-door wall thickness, recomputed per frame
    lightSegs=null;                     // light occluders, likewise
    ctx.clearRect(0,0,W,H);
    if(!noRock){
      const bgPat = patFor(ctx, tex && tex.bg), bgCol = tex && tex.bgColor;
      ctx.fillStyle = bgPat || bgCol || C.rockHi; ctx.fillRect(0,0,W,H);
      if(!bgPat && !bgCol) drawDotGrid();   // dots would just fight a rock texture
    }

    const shapes = map.shapes;
    if(shapes.length){
      sizeBufs();
      // floor mask (white union)
      const m=buf.mask.getContext("2d"); m.setTransform(1,0,0,1,0,0);
      m.clearRect(0,0,W,H); m.fillStyle="#fff"; m.beginPath();
      for(const sh of shapes){ if(sh.deco) continue; shapePath(m, sh); } m.fill("nonzero");
      // Floors are PER-SHAPE. Walk the shapes in z-order and batch CONSECUTIVE
      // runs that share a fill: the common single-floor map still costs one pass
      // (and renders byte-identically to before), while a mixed map stays correct
      // — a later shape paints over an earlier one exactly as it was drawn.
      const runs=[];
      for(const sh of shapes){ if(sh.deco) continue;
        const ft=shapeFloorTex(sh), last=runs[runs.length-1];
        if(last && last.t===ft) last.list.push(sh); else runs.push({t:ft, list:[sh]});
      }
      const tc=buf.tint.getContext("2d"); tc.setTransform(1,0,0,1,0,0);
      tc.clearRect(0,0,W,H); tc.globalCompositeOperation="source-over";
      // Untextured floors keep the original mask + `source-in` path so the classic
      // render stays byte-identical. Anything with a texture — one run or twenty —
      // goes through the clipped-fill path below, which is both faster and the
      // only way mixed floors can be composited cheaply.
      if(runs.length<=1 && !(runs.length && runs[0].t)){
        tc.drawImage(buf.mask,0,0);
        tc.globalCompositeOperation="source-in";
        tc.fillStyle = patFor(tc, runs.length?runs[0].t:null) || C.floor; tc.fillRect(0,0,W,H);
        tc.globalCompositeOperation="source-over";
      } else {
        // One CLIPPED pattern fill per run — no composite modes, no scratch
        // buffers. The obvious mask + `source-in` approach is a trap here:
        // source-in is defined over the WHOLE canvas (everything outside the
        // source is cleared), so it costs a full-canvas pass per run even when
        // the fill is tiny — ~180 ms on an 18-room, four-style map. Clipping
        // costs only the run's own box.
        for(const r of runs){
          const bb=runBox(r.list); if(!bb) continue;
          tc.save();
          tc.beginPath(); for(const sh of r.list) shapePath(tc, sh); tc.clip("nonzero");
          tc.fillStyle = patFor(tc, r.t) || C.floor;
          tc.fillRect(bb.x,bb.y,bb.w,bb.h);
          tc.restore();
        }
      }
      ctx.drawImage(buf.tint,0,0);
      // grid inside floor
      if(map.grid!==false && gridOp()>0 && wpx()>7){
        const gc=buf.grid.getContext("2d"); gc.setTransform(1,0,0,1,0,0);
        gc.clearRect(0,0,W,H); gc.globalCompositeOperation="source-over";
        gc.strokeStyle=C.grid; gc.lineWidth=Math.max(1,1.5*cam.scale); gc.globalAlpha=.85*gridOp();
        const p=wpx(); const [ox,oy]=toScreen(0,0); gc.beginPath();
        for(let x=ox%p;x<=W;x+=p){ gc.moveTo(x+.5,0); gc.lineTo(x+.5,H); }
        for(let y=oy%p;y<=H;y+=p){ gc.moveTo(0,y+.5); gc.lineTo(W,y+.5); }
        gc.stroke(); gc.globalAlpha=1;
        gc.globalCompositeOperation="destination-in"; gc.drawImage(buf.mask,0,0);
        ctx.drawImage(buf.grid,0,0);
      }
      drawWallInnerShadow();
      drawWalls();
    }
    drawInteriorWalls();
    drawDecoShapes();
    for(const d of map.doors) drawDoor(d);
    for(const s of map.stairs) drawStair(s);
    drawShadows();
    drawObjects();
    drawLights();
  }

  // ── WALL SHADOW ────────────────────────────────────────────────────
  // A soft dark band hugging the INSIDE of every room wall — the trick that
  // makes a room read as a room rather than a texture swatch. Rides with the
  // Shadows switch; `map.wallShadow` (0..1) is its strength, 0 turns it off.
  // Drawn under the wall art so the band tucks beneath the stonework.
  const WALL_SHADOW_CELLS = 0.35;                 // band depth, between a quarter and a half square
  function drawWallInnerShadow(){
    if(!map || !map.shadowsOn) return;
    const amt = map.wallShadow==null ? 0.55 : Math.max(0, Math.min(1, map.wallShadow));
    if(amt<=0) return;
    const px = WALL_SHADOW_CELLS*wpx();
    if(px < 1.5) return;                          // too zoomed out to read as anything
    let any=false;
    for(const sh of map.shapes) if(!sh.deco){ any=true; break; }
    if(!any) return;
    sizeBufs();
    const c=buf.wsh.getContext("2d");
    c.setTransform(1,0,0,1,0,0); c.globalAlpha=1; c.filter="none";
    c.globalCompositeOperation="source-over"; c.clearRect(0,0,W,H);
    c.fillStyle="rgba(8,10,16,"+(0.78*amt).toFixed(3)+")"; c.fillRect(0,0,W,H);
    c.globalCompositeOperation="destination-in"; c.drawImage(buf.mask,0,0);   // floors only
    // …then carve the middle of the room back out with a blurred inset fill,
    // which leaves exactly the feathered band along the boundary.
    c.globalCompositeOperation="destination-out";
    c.filter="blur("+(px*0.38).toFixed(2)+"px)";
    c.fillStyle="#fff";
    // Inset by the WALL's own half-thickness as well, so the band is measured from
    // the wall's inner face inward. Insetting by the band alone puts most of it
    // underneath the stonework and only a sliver survives — and a thick cave wall
    // would swallow it entirely.
    for(const sh of map.shapes){ if(sh.deco) continue;
      fillInsetShape(c, sh, halfCellsFor(shapeWallTex(sh)) + WALL_SHADOW_CELLS); }
    c.filter="none"; c.globalCompositeOperation="source-over";
    ctx.save(); ctx.globalCompositeOperation="multiply"; ctx.drawImage(buf.wsh,0,0); ctx.restore();
  }

  // ══════════════════════ SHADOWS (Advanced Mode) ══════════════════════
  // Hand-placed contact shadows — soft ellipses drawn UNDER the objects so a
  // barrel reads as standing on the floor instead of floating on it.
  //   map.shadows[] = { id, x, y, w, h, rot, soft (0..1), strength (0..1) }
  // STATIC by design: they do not track the lights. See claude/map-maker-lights.md.
  // Composited with `multiply` so the floor texture darkens instead of being
  // greyed out by a flat black wash — a 60% black ellipse over stone reads as a
  // hole punched in the floor, the same trap the door leaf hit in classic mode.
  // Deliberately NOT clipped to the floor mask: clipping would cut a hard edge
  // along every room boundary, which looks far worse than a little spill.
  function drawShadows(){
    // v41: master switch, mirroring map.lit. Only an explicit false hides them, so
    // a caller that never sets the flag (or a map saved before v41) still draws.
    if(!map || map.shadowsOn===false) return;       // works in classic mode too (v39)
    const list=map.shadows||[]; if(!list.length) return;
    ctx.save(); ctx.globalCompositeOperation="multiply";
    for(let i=0;i<list.length;i++){
      const s=list[i];
      const a=Math.max(0, Math.min(1, s.strength==null ? 0.6 : s.strength));
      if(a<=0) continue;
      const rx=Math.max(0.05, s.w||1.6)/2*wpx(), ry=Math.max(0.05, s.h||1.1)/2*wpx();
      if(rx<0.4 || ry<0.4) continue;
      const soft=Math.max(0, Math.min(1, s.soft==null ? 0.55 : s.soft));
      const core=0.92*(1-soft);                     // fully opaque out to here, then fade
      const p=toScreen(s.x,s.y);
      ctx.save();
      ctx.translate(p[0],p[1]); ctx.rotate(s.rot||0); ctx.scale(rx,ry);
      const g=ctx.createRadialGradient(0,0,0,0,0,1);
      g.addColorStop(0, "rgba(6,8,14,"+a+")");
      if(core>0.001) g.addColorStop(core, "rgba(6,8,14,"+a+")");
      g.addColorStop(core+(1-core)*0.55, "rgba(6,8,14,"+(a*0.35).toFixed(4)+")");
      g.addColorStop(1, "rgba(6,8,14,0)");
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(0,0,1,0,6.2832); ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }

  // ══════════════════════ LIGHTS (Advanced Mode) ══════════════════════
  // A darkness wash laid over the finished map that every light carves a pool
  // out of, plus an additive colour tint on top. `map.darkness` (0..1) is the
  // one control: at 0 this is pure coloured glow on a fully lit map, at 1 it is
  // near-black outside the lights.
  //
  //   map.lit       — master switch, nothing here runs when it is off
  //   map.darkness  — 0..1 wash strength
  //   map.lights[]  — { id, x, y, r (cells), color, bright (0..1) }
  //
  // Shadows: each light gets a VISIBILITY POLYGON ray-marched against room
  // outlines and interior walls, which is then blurred so the shadow edges are
  // soft rather than geometric. Doors are deliberately NOT cut out of the
  // occluders — a door is closed, so it contains the light in its room.
  let lightSegs = null;                       // occluder cache, rebuilt per render
  // ⚠ A room edge that lies INSIDE another room is not a wall. The interior punch
  // (the union of per-shape inset fills) erases it so the two rooms read as one
  // space — a corridor meeting a room, two overlapping rooms. Blocking light on
  // those buried edges casts shadows off walls that are not on the map. Each edge
  // is therefore walked in short steps and only the runs that stay OUTSIDE every
  // other room survive, so a half-buried edge still occludes along the half you
  // can see. Interior walls (map.walls) always draw on top, so they are kept whole.
  function lightOccluders(){
    if(lightSegs) return lightSegs;
    lightSegs=[];
    const rooms=[], rb=[];
    for(const sh of map.shapes){ if(sh.deco) continue; rooms.push(sh); rb.push(bounds(sh,"shape")); }
    const hits=(bx0,by0,bx1,by1,i)=>{ const b=rb[i];
      return !!b && bx0<=b.x+b.w && bx1>=b.x && by0<=b.y+b.h && by1>=b.y; };
    for(let si=0; si<rooms.length; si++){
      const sh=rooms[si], o=shapeOutline(sh);
      for(let i=0;i<o.length;i++){
        const a=o[i], b=o[(i+1)%o.length];
        const dx=b[0]-a[0], dy=b[1]-a[1], len=Math.hypot(dx,dy);
        if(len<1e-6) continue;
        // Only edges overlapping another room's box can be buried — skip the walk
        // entirely otherwise, which is the common case.
        const ex0=Math.min(a[0],b[0]), ex1=Math.max(a[0],b[0]);
        const ey0=Math.min(a[1],b[1]), ey1=Math.max(a[1],b[1]);
        const cand=[];
        for(let j=0;j<rooms.length;j++) if(j!==si && hits(ex0,ey0,ex1,ey1,j)) cand.push(rooms[j]);
        if(!cand.length){ lightSegs.push([a[0],a[1],b[0],b[1]]); continue; }
        const n=Math.max(1, Math.min(64, Math.ceil(len/0.35)));
        let s0=null;
        const at=t=>[a[0]+dx*t, a[1]+dy*t];
        for(let k=0;k<n;k++){
          const tm=(k+0.5)/n, m=at(tm);
          let vis=true;
          for(let j=0;j<cand.length;j++) if(pointInShape(m[0],m[1],cand[j])){ vis=false; break; }
          if(vis && s0===null) s0=k/n;
          else if(!vis && s0!==null){ const p=at(s0), q=at(k/n);
            lightSegs.push([p[0],p[1],q[0],q[1]]); s0=null; }
        }
        if(s0!==null){ const p=at(s0); lightSegs.push([p[0],p[1],b[0],b[1]]); }
      }
    }
    for(const w of map.walls){
      const s=(w.cx!==undefined&&w.cy!==undefined) ? wallSamples(w) : [[w.x1,w.y1],[w.x2,w.y2]];
      for(let i=0;i<s.length-1;i++) lightSegs.push([s[i][0],s[i][1],s[i+1][0],s[i+1][1]]); }
    return lightSegs;
  }
  // Distance from the ray origin to a segment, or -1. Parametric solve; `u` is
  // the position ALONG the segment so it must stay inside [0,1].
  function rayHitT(px,py,dx,dy,s){
    const ax=s[0], ay=s[1], bx=s[2]-s[0], by=s[3]-s[1];
    const den=dx*by - dy*bx; if(den>-1e-12 && den<1e-12) return -1;
    const t=((ax-px)*by - (ay-py)*bx)/den; if(t<=1e-9) return -1;
    const u=((ax-px)*dy - (ay-py)*dx)/den;
    return (u>=0 && u<=1) ? t : -1;
  }
  function segNear(s,px,py,r){
    const dx=s[2]-s[0], dy=s[3]-s[1], l2=dx*dx+dy*dy;
    let t=l2 ? ((px-s[0])*dx+(py-s[1])*dy)/l2 : 0; t=t<0?0:(t>1?1:t);
    const qx=px-(s[0]+t*dx), qy=py-(s[1]+t*dy);
    return qx*qx+qy*qy <= r*r;
  }
  // A uniform angular sweep (degrades gracefully, never misses a caster) PLUS
  // three rays at every occluder endpoint (so the shadow boundary lands exactly
  // on the corner that cast it instead of being rounded off by the sweep).
  function visPoly(L){
    const R=Math.max(0.4, L.r||6), near=lightOccluders().filter(s=>segNear(s,L.x,L.y,R));
    const N=Math.max(64, Math.min(288, Math.round(R*22)));
    const angs=new Array(N);
    for(let i=0;i<N;i++) angs[i]=i/N*Math.PI*2 - Math.PI;
    for(const s of near){
      for(let k=0;k<4;k+=2){
        const dx=s[k]-L.x, dy=s[k+1]-L.y;
        if(dx*dx+dy*dy > R*R) continue;
        const a=Math.atan2(dy,dx);
        angs.push(a-2e-4, a, a+2e-4);
      }
    }
    angs.sort(function(a,b){ return a-b; });
    const pts=[];
    for(let i=0;i<angs.length;i++){
      const a=angs[i], dx=Math.cos(a), dy=Math.sin(a);
      let t=R;
      for(let j=0;j<near.length;j++){ const h=rayHitT(L.x,L.y,dx,dy,near[j]); if(h>0 && h<t) t=h; }
      pts.push([L.x+dx*t, L.y+dy*t]);
    }
    return pts;
  }
  // Three falloff PROFILES (L.pattern), modelled on Dungeondraft's:
  //   soft      — smooth even wash, the original
  //   hard      — a small intense core, a sharp shoulder, then a long steady
  //                plateau; reads as a focused lamp rather than a glow
  //   textured  — the soft curve with concentric rings over it, like light
  //                through ribbed glass; broken up further by lightMottle()
  function lightFalloff(c, cx, cy, rpx, a, pat){
    const g=c.createRadialGradient(cx,cy,0,cx,cy,Math.max(1,rpx));
    const S=(t,v)=>g.addColorStop(t, "rgba(255,255,255,"+Math.max(0,Math.min(1,v)).toFixed(4)+")");
    if(pat==="hard"){
      S(0,a); S(0.15,a); S(0.23,a*0.40); S(0.55,a*0.29); S(0.86,a*0.14); S(1,0);
    } else {
      S(0,a); S(0.42,a*0.78); S(0.72,a*0.36); S(1,0);
    }
    return g;
  }
  // ── PATTERNED LIGHT PROFILES ───────────────────────────────────────
  // `textured` and `energy` can't be expressed as a radial gradient — they need
  // ANGULAR structure — so they are painted into a scratch canvas and applied to
  // the mask with destination-in, exactly where the gradient would have gone.
  const lprofCv = oc();
  // A closed circle whose radius wanders with angle: three harmonics, so the edge
  // reads as flame licks rather than a wavy ellipse. Seeded per light per ring.
  function wobblyCircle(c, cx, cy, R, seed, amp){
    // High harmonics carry the "fire" — with only 3/7/13 the edge undulates like
    // a wobbly balloon. 5/11/19/31 with weight kept on the fast terms gives the
    // licked, spiky boundary. N must out-resolve the fastest term or it aliases.
    const N=192;
    c.beginPath();
    for(let i=0;i<=N;i++){
      const t=i/N*Math.PI*2;
      const w = 1 + amp*(0.40*Math.sin(5*t+seed)
                       + 0.26*Math.sin(11*t+seed*1.7)
                       + 0.20*Math.sin(19*t+seed*2.3)
                       + 0.14*Math.sin(31*t+seed*3.1));
      const r=R*w, x=cx+Math.cos(t)*r, y=cy+Math.sin(t)*r;
      if(i===0) c.moveTo(x,y); else c.lineTo(x,y);
    }
    c.closePath();
  }
  function lightProfile(mw, mh, cx, cy, rpx, a, pat, seed){
    if(lprofCv.width!==mw || lprofCv.height!==mh){ lprofCv.width=mw; lprofCv.height=mh; }
    const c=lprofCv.getContext("2d");
    c.setTransform(1,0,0,1,0,0); c.globalAlpha=1; c.filter="none";
    c.globalCompositeOperation="source-over"; c.clearRect(0,0,mw,mh);
    c.fillStyle="#fff";
    if(pat==="textured"){
      // Three TERRACES, each strictly dimmer going out — never brighter again.
      // (The first attempt modulated the falloff with a cosine, which alternated
      // light and dark and read as a bullseye. Steps only ever step down.)
      const R=[1.0, 0.62, 0.33], L=[0.26, 0.60, 1.0], AMP=[0.135, 0.125, 0.115];
      // Painted as overlapping DISCS from the outside in, with each alpha solved
      // so the composite lands exactly on the target level. Annuli would leave
      // anti-aliased seams at every shared boundary.
      let acc=0;
      for(let i=0;i<3;i++){
        const target=a*L[i];
        const alpha = acc>=1 ? 0 : (target-acc)/(1-acc);
        if(alpha>0.001){
          c.globalAlpha=Math.min(1,alpha);
          wobblyCircle(c, cx, cy, rpx*R[i], seed*1.3 + i*2.1, AMP[i]);
          c.fill();
        }
        acc=target;
      }
      c.globalAlpha=1;
    } else if(pat==="energy"){
      // A dim halo, jagged filaments crackling out of the middle, and a hot core.
      const g=c.createRadialGradient(cx,cy,0,cx,cy,Math.max(1,rpx));
      g.addColorStop(0,    "rgba(255,255,255,"+(a*0.44).toFixed(4)+")");
      g.addColorStop(0.38, "rgba(255,255,255,"+(a*0.20).toFixed(4)+")");
      g.addColorStop(1,    "rgba(255,255,255,0)");
      c.fillStyle=g; c.fillRect(0,0,mw,mh);
      const rnd=seeded(seed*13.7+1, seed*7.3+1);
      c.globalCompositeOperation="lighter";
      c.lineCap="round"; c.lineJoin="round";
      const N=9;
      for(let k=0;k<N;k++){
        let ang=(k/N)*Math.PI*2 + rnd()*0.6;
        const len=rpx*(0.5+rnd()*0.5), steps=5;
        let px=cx, py=cy;
        for(let s=1;s<=steps;s++){
          ang += (rnd()-0.5)*0.6;
          const r=len*s/steps, x=cx+Math.cos(ang)*r, y=cy+Math.sin(ang)*r;
          const f=1-(s-1)/steps;                       // taper outward
          c.strokeStyle="rgba(255,255,255,"+(a*0.45*f).toFixed(4)+")";
          c.lineWidth=Math.max(0.8, rpx*0.055*f);
          c.beginPath(); c.moveTo(px,py); c.lineTo(x,y); c.stroke();
          px=x; py=y;
        }
      }
      const cg=c.createRadialGradient(cx,cy,0,cx,cy,Math.max(1,rpx*0.2));
      cg.addColorStop(0,"rgba(255,255,255,"+a.toFixed(4)+")");
      cg.addColorStop(1,"rgba(255,255,255,0)");
      c.fillStyle=cg; c.fillRect(0,0,mw,mh);
      c.globalCompositeOperation="source-over";
    }
    return lprofCv;
  }
  const LMASK_MAX = 192;        // per-light mask resolution cap (see drawLights)
  const lmaskCv = oc();
  function drawLights(){
    if(!map || !map.lit) return;          // works in classic mode too (v39)
    const lights=map.lights||[];
    const dark=Math.max(0, Math.min(1, map.darkness==null ? 0 : map.darkness));
    if(!lights.length && dark<=0) return;
    sizeBufs();
    const lc=buf.light.getContext("2d"), gc=buf.ltint.getContext("2d"), mc=lmaskCv.getContext("2d");
    for(let i=0;i<2;i++){ const c=[lc,gc][i];
      c.setTransform(1,0,0,1,0,0); c.globalAlpha=1; c.filter="none"; c.globalCompositeOperation="source-over"; }
    lc.clearRect(0,0,W,H); gc.clearRect(0,0,W,H);
    if(dark>0){ lc.fillStyle="rgba(5,7,13,"+dark+")"; lc.fillRect(0,0,W,H); }
    // Feather scales with zoom so shadows stay equally soft at any scale.
    const blur=Math.max(2.5, Math.min(22, 0.18*wpx()));
    let ux0=Infinity, uy0=Infinity, ux1=-Infinity, uy1=-Infinity;   // union of lit boxes
    for(let li=0; li<lights.length; li++){
      const L=lights[li]; if(L.on===false) continue;
      const R=Math.max(0.4, L.r||6);
      const a=Math.max(0, Math.min(1, L.bright==null ? 0.85 : L.bright));
      if(a<=0) continue;
      const cs=toScreen(L.x,L.y), cx=cs[0], cy=cs[1], rpx=R*wpx();
      // Everything stays inside the light's own box — a full-canvas pass per
      // light is the same trap that made the mixed-floor composite slow.
      const pad=blur*2+6;
      const bx=Math.max(0,Math.floor(cx-rpx-pad)), by=Math.max(0,Math.floor(cy-rpx-pad));
      const bw=Math.min(W,Math.ceil(cx+rpx+pad))-bx, bh=Math.min(H,Math.ceil(cy+rpx+pad))-by;
      if(bw<=0 || bh<=0) continue;                       // entirely off-screen
      // ⚠ PERF: the mask is a soft blob, so it is built at REDUCED resolution and
      // scaled back up. Canvas blur costs per pixel — a 540 px light box blurred
      // at full size was ~36 ms EACH (5 lights = 200 ms/frame); capped at 192 px
      // it is a few. Upscaling a blurred mask is visually free.
      const k=Math.min(1, LMASK_MAX/Math.max(bw,bh));
      const mw=Math.max(1,Math.round(bw*k)), mh=Math.max(1,Math.round(bh*k));
      if(lmaskCv.width!==mw || lmaskCv.height!==mh){ lmaskCv.width=mw; lmaskCv.height=mh; }
      else mc.clearRect(0,0,mw,mh);
      mc.setTransform(1,0,0,1,0,0); mc.globalAlpha=1; mc.globalCompositeOperation="source-over";
      // 1 — the visibility polygon, feathered into soft shadow edges
      const poly=visPoly(L);
      mc.save(); mc.filter="blur("+(blur*k).toFixed(2)+"px)"; mc.fillStyle="#fff"; mc.beginPath();
      for(let i=0;i<poly.length;i++){ const p=toScreen(poly[i][0],poly[i][1]);
        const mx=(p[0]-bx)*k, my=(p[1]-by)*k;
        if(i===0) mc.moveTo(mx,my); else mc.lineTo(mx,my); }
      mc.closePath(); mc.fill(); mc.restore();
      // 2 — multiply in the radial falloff
      mc.globalCompositeOperation="destination-in";
      if(L.pattern==="textured" || L.pattern==="energy"){
        // Painted profile — it carries angular structure a gradient cannot. The
        // blur here softens the terrace edges just enough that they read as
        // ragged rather than vector-cut; too much and the steps disappear.
        lightProfile(mw, mh, (cx-bx)*k, (cy-by)*k, rpx*k, a, L.pattern, (L.id||li)+1);
        mc.filter="blur("+(L.pattern==="energy" ? 1.0 : 0.9).toFixed(2)+"px)";
        mc.drawImage(lprofCv,0,0);
        mc.filter="none";
      } else {
        mc.fillStyle=lightFalloff(mc,(cx-bx)*k,(cy-by)*k,rpx*k,a,L.pattern); mc.fillRect(0,0,mw,mh);
      }
      // 3 — punch the lit pool out of the darkness
      lc.globalCompositeOperation="destination-out";
      lc.drawImage(lmaskCv, 0,0,mw,mh, bx,by,bw,bh);
      lc.globalCompositeOperation="source-over";
      // 4 — recolour the same mask and accumulate it as additive tint
      mc.globalCompositeOperation="source-in";
      mc.fillStyle=L.color||"#ffb457"; mc.fillRect(0,0,mw,mh);
      mc.globalCompositeOperation="source-over";
      gc.globalCompositeOperation="lighter"; gc.globalAlpha=0.5;
      gc.drawImage(lmaskCv, 0,0,mw,mh, bx,by,bw,bh);
      gc.globalAlpha=1; gc.globalCompositeOperation="source-over";
      if(bx<ux0)ux0=bx; if(by<uy0)uy0=by;
      if(bx+bw>ux1)ux1=bx+bw; if(by+bh>uy1)uy1=by+bh;
    }
    if(dark>0){
      // A transparent PNG should not come back as a sheet of dark grey — keep
      // the wash inside the floors, which is the only thing being exported.
      if(noRock && map.shapes.length){
        lc.globalCompositeOperation="destination-in"; lc.drawImage(buf.mask,0,0);
        lc.globalCompositeOperation="source-over";
      }
      ctx.drawImage(buf.light,0,0);
    }
    // The tint only exists inside the lit boxes; compositing the rest is waste.
    if(ux1>ux0){ ctx.save(); ctx.globalCompositeOperation="lighter";
      ctx.drawImage(buf.ltint, ux0,uy0,ux1-ux0,uy1-uy0, ux0,uy0,ux1-ux0,uy1-uy0);
      ctx.restore(); }
  }
  function drawDotGrid(){ const p=wpx(); if(p<13) return; const go=gridOp(); if(go<=0) return;
    ctx.save(); ctx.fillStyle=C.dot; ctx.globalAlpha=.8*go;
    const [ox,oy]=toScreen(0,0); const r=Math.max(0.6,0.85*Math.min(2,cam.scale));
    for(let x=ox%p;x<W;x+=p) for(let y=oy%p;y<H;y+=p){ ctx.beginPath(); ctx.arc(x,y,r,0,6.283); ctx.fill(); }
    ctx.restore(); }

  function roughSeg(c, aw, bw, halfW){
    const [ax,ay]=toScreen(aw[0],aw[1]), [bx,by]=toScreen(bw[0],bw[1]);
    const dx=bx-ax, dy=by-ay; const len=Math.hypot(dx,dy); if(len<0.5) return;
    const nx=-dy/len, ny=dx/len;
    const steps=Math.max(2, Math.round(len/Math.max(3,4*cam.scale)));
    c.beginPath();
    for(let k=0;k<=steps;k++){ const f=k/steps;
      const wx=aw[0]+(bw[0]-aw[0])*f, wy=aw[1]+(bw[1]-aw[1])*f;
      const amp=halfW*(0.7 + seeded(wx*29, wy*29)()*0.7);
      const px=ax+dx*f + nx*amp, py=ay+dy*f + ny*amp;
      if(k===0) c.moveTo(px,py); else c.lineTo(px,py);
    }
    for(let k=steps;k>=0;k--){ const f=k/steps;
      const wx=aw[0]+(bw[0]-aw[0])*f, wy=aw[1]+(bw[1]-aw[1])*f;
      const amp=halfW*(0.7 + seeded(wx*29+13, wy*29+7)()*0.7);
      const px=ax+dx*f - nx*amp, py=ay+dy*f - ny*amp;
      c.lineTo(px,py);
    }
    c.closePath(); c.fill();
    c.beginPath(); c.arc(ax,ay,halfW*1.02,0,6.2832); c.fill();
    c.beginPath(); c.arc(bx,by,halfW*1.02,0,6.2832); c.fill();
  }

  function roughRing(c, pts, halfW){
    const dp=[]; const n=pts.length;
    for(let i=0;i<n;i++){ const a=pts[i], b=pts[(i+1)%n];
      const dx=b[0]-a[0], dy=b[1]-a[1]; const len=Math.hypot(dx,dy); if(len<1e-6) continue;
      const steps=Math.max(1, Math.round(len/0.16));
      for(let k=0;k<steps;k++){ const f=k/steps; dp.push([a[0]+dx*f, a[1]+dy*f]); } }
    const m=dp.length; if(m<3) return;
    const outer=[], inner=[];
    for(let i=0;i<m;i++){
      const p=dp[i], pa=dp[(i-1+m)%m], pb=dp[(i+1)%m];
      const ex=pb[0]-pa[0], ey=pb[1]-pa[1]; const l=Math.hypot(ex,ey)||1; const nx=-ey/l, ny=ex/l;
      const ao=halfW*(0.72 + seeded(p[0]*29, p[1]*29)()*0.66);
      const ai=halfW*(0.72 + seeded(p[0]*29+11, p[1]*29+5)()*0.66);
      const [sx,sy]=toScreen(p[0],p[1]);
      outer.push([sx+nx*ao, sy+ny*ao]); inner.push([sx-nx*ai, sy-ny*ai]);
    }
    c.beginPath();
    c.moveTo(outer[0][0],outer[0][1]); for(let i=1;i<m;i++) c.lineTo(outer[i][0],outer[i][1]); c.closePath();
    c.moveTo(inner[0][0],inner[0][1]); for(let i=1;i<m;i++) c.lineTo(inner[i][0],inner[i][1]); c.closePath();
    c.fill("evenodd");
  }
  function shapeOutline(sh){
    if(sh.type==="rect") return [[sh.x,sh.y],[sh.x+sh.w,sh.y],[sh.x+sh.w,sh.y+sh.h],[sh.x,sh.y+sh.h]];
    if(sh.type==="circle"){ const K=Math.max(28, Math.round(sh.r*8)); const o=[];
      for(let i=0;i<K;i++){ const a=i/K*Math.PI*2; o.push([sh.cx+Math.cos(a)*sh.r, sh.cy+Math.sin(a)*sh.r]); } return o; }
    if(sh.type==="polygon") return sh.pts.slice();
    return [];
  }
  function fillInsetShape(c, sh, e){
    if(sh.type==="rect"){ if(sh.w>2*e && sh.h>2*e){ const [x,y]=toScreen(sh.x+e, sh.y+e);
      c.fillRect(x, y, (sh.w-2*e)*wpx(), (sh.h-2*e)*wpx()); } }
    else if(sh.type==="circle"){ const rr=sh.r-e; if(rr>0){ const [x,y]=toScreen(sh.cx,sh.cy);
      c.beginPath(); c.arc(x,y, rr*wpx(), 0, 6.2832); c.fill(); } }
    else if(sh.type==="polygon"){ const pts=sh.pts; if(pts.length<3) return;
      let cx=0,cy=0; for(const p of pts){ cx+=p[0]; cy+=p[1]; } cx/=pts.length; cy/=pts.length;
      c.beginPath();
      for(let i=0;i<pts.length;i++){ let dx=pts[i][0]-cx, dy=pts[i][1]-cy; const l=Math.hypot(dx,dy)||1;
        const [sx,sy]=toScreen(pts[i][0]-dx/l*e, pts[i][1]-dy/l*e); if(i===0)c.moveTo(sx,sy); else c.lineTo(sx,sy); }
      c.closePath(); c.fill(); }
  }


  // ── textured walls (Advanced Mode) ────────────────────────────────
  // Per-object styling: a shape/wall may carry its own `floor`/`wall` texture id.
  //   undefined ⇒ inherit the map default (so a generated dungeon restyles wholesale)
  //   ""        ⇒ explicitly classic ink / parchment
  //   an id     ⇒ that texture, resolved through the host-supplied tex.byId table
  function texOf(id, dflt){
    if(id===undefined || id===null) return dflt || null;
    if(id==="") return null;
    return (tex && tex.byId && tex.byId[id]) || null;
  }
  // `tex` is also handed in for OBJECT sprites alone — objects work in normal
  // mode, where floors/walls/background stay classic ink — so a non-null `tex`
  // no longer means "textured map". The host says which it is with `objectsOnly`.
  // Do NOT infer it from tex.floor/tex.wall being set: per-shape styling leaves
  // both empty on a fully textured map, and doors lose their wood leaf.
  function textured(){ return !!(tex && !tex.objectsOnly); }
  function shapeFloorTex(sh){ return tex ? texOf(sh.floor, tex.floor) : null; }
  function shapeWallTex(sh){  return tex ? texOf(sh.wall,  tex.wall)  : null; }

  // Wall half-thickness for a given wall texture, in SCREEN px. With no texture
  // this returns exactly the classic ink value, so classic stays byte-identical.
  // User-controllable grid opacity (map.gridOpacity, 0..1, default 1). It scales
  // BOTH the in-floor grid and the exterior dot grid, so the default of 1 leaves
  // the classic render untouched.
  function gridOp(){ const v = map && map.gridOpacity; return (v==null) ? 1 : Math.max(0, Math.min(1, v)); }
  // Screen-space bounding box of a group of shapes, clamped to the canvas.
  function runBox(list){
    let x0=Infinity,y0=Infinity,x1=-Infinity,y1=-Infinity;
    for(const sh of list){ const b=bounds(sh,"shape"); if(!b) continue;
      const p=toScreen(b.x,b.y), q=toScreen(b.x+b.w,b.y+b.h);
      if(p[0]<x0)x0=p[0]; if(p[1]<y0)y0=p[1]; if(q[0]>x1)x1=q[0]; if(q[1]>y1)y1=q[1]; }
    if(!isFinite(x0)) return null;
    x0=Math.max(0,Math.floor(x0-6)); y0=Math.max(0,Math.floor(y0-6));
    x1=Math.min(W,Math.ceil(x1+6));  y1=Math.min(H,Math.ceil(y1+6));
    return (x1<=x0||y1<=y0) ? null : {x:x0,y:y0,w:x1-x0,h:y1-y0};
  }
  function halfPxFor(t){ return t ? Math.max(1, 0.5*(t.thick||0.4)*wpx()) : Math.max(1.3,1.7*cam.scale); }
  // …and in world cells, or 0 for classic ink (also used as a "textured?" test).
  function halfCellsFor(t){ return t ? 0.5*(t.thick||0.4) : 0; }
  function wallHalfPx(){ return halfPxFor(tex && tex.wall); }

  // How thick is the wall a door actually sits in? (nearest room outline). The
  // door LEAF no longer uses this — it is a fixed DOOR_HALF — but the OPENING
  // still cuts the full depth of the wall, so a door in a thick wall reads as a
  // real gap with the leaf hung in it. Memoised, rebuilt once per render.
  let doorHalf = null;
  function segDist(px,py,x1,y1,x2,y2){
    const dx=x2-x1, dy=y2-y1, l2=dx*dx+dy*dy;
    let t = l2 ? ((px-x1)*dx+(py-y1)*dy)/l2 : 0; t = t<0?0:(t>1?1:t);
    return Math.hypot(px-(x1+t*dx), py-(y1+t*dy));
  }
  function wallHalfCellsAt(d){
    if(!tex) return 0;
    if(!doorHalf){
      doorHalf = new Map();
      for(const dd of map.doors){
        let best=null, bd=Infinity;
        for(const sh of map.shapes){ if(sh.deco) continue;
          const o=shapeOutline(sh);
          for(let i=0;i<o.length;i++){ const a=o[i], b=o[(i+1)%o.length];
            const q=segDist(dd.x,dd.y,a[0],a[1],b[0],b[1]);
            if(q<bd){ bd=q; best=sh; } } }
        doorHalf.set(dd, halfCellsFor(best ? shapeWallTex(best) : (tex && tex.wall)));
      }
    }
    return doorHalf.get(d) || 0;
  }

  // Lay a wall strip along a world polyline. One rotated, clipped quad per
  // segment, with a running distance `s` so the texture flows continuously
  // around corners instead of restarting at every vertex. Each quad is extended
  // by the half-thickness at both ends, so neighbouring quads overlap and fill
  // the notch on the outside of a turn — no mitre maths needed.
  // Tiles alternate normal / mirrored: pack wall strips are NOT pixel-seamless
  // end-to-end (2MT's Dark strip differs by ~66/255 across the join), and
  // mirroring makes every repeat boundary exact by construction.
  // Insert points so no gap along a screen-space polyline exceeds `maxPx`. Used
  // to smooth curved interior walls for the strip renderer WITHOUT touching
  // wallSamples(), whose sampling the ink renderer's roughness is seeded from.
  function densify(pts, maxPx){
    const out=[]; const px=wpx();
    for(let i=0;i<pts.length-1;i++){
      const a=pts[i], b=pts[i+1];
      const d=Math.hypot(b[0]-a[0], b[1]-a[1])*px;
      const n=Math.max(1, Math.min(64, Math.ceil(d/maxPx)));
      for(let k=0;k<n;k++) out.push([a[0]+(b[0]-a[0])*k/n, a[1]+(b[1]-a[1])*k/n]);
    }
    out.push(pts[pts.length-1]);
    return out;
  }
  // A shape outline sampled by SCREEN arc length — a vertex roughly every 5 px —
  // so a round room's textured wall stays smooth at any zoom. The ink renderer
  // keeps shapeOutline()'s fixed sampling, so classic output is unchanged.
  function outlineDense(sh){
    if(sh.type!=="circle") return shapeOutline(sh);
    const K=Math.max(32, Math.min(400, Math.round(2*Math.PI*sh.r*wpx()/5)));
    const o=[];
    for(let i=0;i<K;i++){ const a=i/K*Math.PI*2; o.push([sh.cx+Math.cos(a)*sh.r, sh.cy+Math.sin(a)*sh.r]); }
    return o;
  }

  function stripPath(c, pts, closed, t, halfPx){
    if(!t || !t.img || !t.img.complete || !t.img.naturalWidth) return false;
    const P=pts.map(p=>toScreen(p[0],p[1]));
    let n=P.length;
    if(closed && n>1 && P[0][0]===P[n-1][0] && P[0][1]===P[n-1][1]){ P.pop(); n--; }
    if(n<2) return false;
    const segN = closed ? n : n-1;
    const dir=[], len=[];
    for(let i=0;i<segN;i++){
      const a=P[i], b=P[(i+1)%n];
      const dx=b[0]-a[0], dy=b[1]-a[1], L=Math.hypot(dx,dy);
      dir.push(L>1e-6 ? [dx/L,dy/L] : null); len.push(L);
    }
    // MITRE JOINS. Each segment is clipped by the angle bisector at both ends, so
    // neighbouring quads tile the ribbon exactly — no notch on the outside of a
    // turn and no double-drawn overlap on the inside (the old code extended every
    // quad by the half-width and let them overlap, which left a visible mismatch
    // where the two rotations met). `k` is the cut line's slope in the segment's
    // own frame: local x = k*y, so the cut corners sit at (∓k·h, ∓h).
    const ML=4;                                     // miter limit, in half-widths
    // The mitre line through a vertex is the bisector of (−incoming) and
    // (outgoing) — one line, shared by both segments that meet there. `frame` is
    // the segment we're expressing it FOR, and it must be that segment's own
    // direction: a segment's END cut measured in the NEXT segment's frame comes
    // out sign-flipped (the frames differ by the turn angle), which cuts every
    // corner backwards — outer edge pulling back, inner edge overhanging.
    const cutK=(prev,next,frame)=>{
      if(!prev || !next) return 0;                  // open end ⇒ square cap
      let wx=next[0]-prev[0], wy=next[1]-prev[1];
      const wl=Math.hypot(wx,wy); if(wl<1e-6) return 0;
      wx/=wl; wy/=wl;
      const nx=-frame[1], ny=frame[0];
      const ly=wx*nx+wy*ny; if(Math.abs(ly)<1e-6) return 0;
      const k=(wx*frame[0]+wy*frame[1])/ly;
      return Math.max(-ML, Math.min(ML, k));
    };
    const tileW=Math.max(8,(t.tile||6)*wpx()), per=2*tileW;
    let s=0;
    for(let i=0;i<segN;i++){
      const u=dir[i], L=len[i];
      if(!u || L<0.01) continue;
      const prev = closed ? dir[(i-1+segN)%segN] : (i>0 ? dir[i-1] : null);
      const next = closed ? dir[(i+1)%segN]      : (i<segN-1 ? dir[i+1] : null);
      let kS=cutK(prev,u,u), kE=cutK(u,next,u);   // both in THIS segment's frame
      // Guard against a bow-tie when the segment is short relative to its cuts.
      const spread=Math.abs(kS-kE)*halfPx;
      if(spread > L*0.95 && spread>0){ const f=(L*0.95)/spread; kS*=f; kE*=f; }
      const h=halfPx, ext=(Math.abs(kS)+Math.abs(kE))*h+2;
      c.save();
      c.translate(P[i][0],P[i][1]); c.rotate(Math.atan2(u[1],u[0]));
      c.beginPath();
      c.moveTo(-kS*h,-h); c.lineTo(L-kE*h,-h); c.lineTo(L+kE*h,h); c.lineTo(kS*h,h);
      c.closePath(); c.clip();
      let x=-(s%per); while(x>-ext) x-=per;
      for(; x<L+ext; x+=per){
        c.drawImage(t.img, x, -h, tileW, 2*h);
        c.save(); c.translate(x+per,0); c.scale(-1,1);
        c.drawImage(t.img, 0, -h, tileW, 2*h); c.restore();
      }
      c.restore();
      s+=L;
    }
    return true;
  }

  function drawWalls(){
    if(!map.shapes.length) return;
    const wc=buf.wall.getContext("2d"); wc.setTransform(1,0,0,1,0,0); wc.clearRect(0,0,W,H);
    wc.globalCompositeOperation="source-over"; wc.fillStyle=C.ink;
    // Per-shape outlines (exact circles) stroked with THAT shape's wall texture,
    // then the inset-union erase below drops wall that lies inside another room —
    // same merge rule as the ink renderer.
    for(const sh of map.shapes){ if(sh.deco) continue;
      const wt=shapeWallTex(sh), hp=halfPxFor(wt);
      if(wt && stripPath(wc, outlineDense(sh), true, wt, hp)) continue;
      roughRing(wc, shapeOutline(sh), hp); }
    const ec=buf.erode.getContext("2d"); ec.setTransform(1,0,0,1,0,0); ec.clearRect(0,0,W,H);
    ec.globalCompositeOperation="source-over"; ec.fillStyle="#fff";
    for(const sh of map.shapes){ if(sh.deco) continue;
      fillInsetShape(ec, sh, (halfPxFor(shapeWallTex(sh))+1.4)/wpx()); }
    wc.globalCompositeOperation="destination-out"; wc.drawImage(buf.erode,0,0);
    for(const d of map.doors) punchDoorQuad(wc, d);   // opening cuts the full wall depth
    if(!noRock){ const o=Math.min(2,cam.scale); ctx.save(); ctx.globalAlpha=.16;
      ctx.drawImage(buf.wall, 2.3*o, 2.9*o); ctx.restore(); }
    ctx.drawImage(buf.wall,0,0);
  }

  // Sample a curved wall into world points as a HALF-ELLIPSE: the chord is the full
  // major axis and the clicked apex sets the minor axis. `cx,cy` is stored
  // Bézier-style (C = 2Q − midpoint) so the apex is Q = (C + midpoint)/2.
  // Why an ellipse and not the circle through the 3 points: an ellipse leaves the
  // curve PERPENDICULAR to the chord at BOTH ends for any apex depth, so two
  // mirrored walls on the same two endpoints meet tangent-to-tangent and close into
  // one smooth oval — a half circle when the apex depth equals half the chord.
  function wallSamples(wl){
    const x1=wl.x1,y1=wl.y1,x2=wl.x2,y2=wl.y2;
    const mx=(x1+x2)/2, my=(y1+y2)/2;
    const qx=(wl.cx+mx)/2, qy=(wl.cy+my)/2;              // the apex the wall bows through
    const dx=x2-x1, dy=y2-y1, L=Math.hypot(dx,dy);
    if(L<1e-9) return [[x1,y1],[x2,y2]];
    const a=L/2, ux=dx/L, uy=dy/L, nx=-uy, ny=ux;        // semi-chord + unit chord/normal axes
    const h=(qx-mx)*nx + (qy-my)*ny;                     // signed apex depth (either side)
    if(Math.abs(h)<1e-9) return [[x1,y1],[x2,y2]];       // apex on the chord ⇒ straight
    // Half-ellipse: semi-axis `a` along the chord, `h` along the normal, swept
    // t = π → 0 so it runs start → apex → end.
    const N=Math.max(12, Math.min(160, Math.round((a+Math.abs(h))*14)));
    const pts=[];
    for(let i=0;i<=N;i++){ const t=Math.PI*(1-i/N), c=Math.cos(t), s=Math.sin(t);
      pts.push([mx + a*c*ux + h*s*nx, my + a*c*uy + h*s*ny]); }
    return pts;
  }
  // A rough-edged ribbon along an open world polyline (curved walls / shape lines).
  function roughCurve(c, worldPts, halfW){
    const n=worldPts.length; if(n<2) return;
    const S=worldPts.map(p=>toScreen(p[0],p[1]));
    const top=[], bot=[];
    for(let i=0;i<n;i++){
      const a=S[Math.max(0,i-1)], b=S[Math.min(n-1,i+1)];
      const dx=b[0]-a[0], dy=b[1]-a[1]; const l=Math.hypot(dx,dy)||1; const nx=-dy/l, ny=dx/l;
      const w=worldPts[i];
      const at=halfW*(0.7+seeded(w[0]*29,w[1]*29)()*0.7), ab=halfW*(0.7+seeded(w[0]*29+13,w[1]*29+7)()*0.7);
      top.push([S[i][0]+nx*at, S[i][1]+ny*at]); bot.push([S[i][0]-nx*ab, S[i][1]-ny*ab]);
    }
    c.beginPath(); c.moveTo(top[0][0],top[0][1]);
    for(let i=1;i<n;i++) c.lineTo(top[i][0],top[i][1]);
    for(let i=n-1;i>=0;i--) c.lineTo(bot[i][0],bot[i][1]);
    c.closePath(); c.fill();
    c.beginPath(); c.arc(S[0][0],S[0][1],halfW*1.02,0,6.2832); c.fill();
    c.beginPath(); c.arc(S[n-1][0],S[n-1][1],halfW*1.02,0,6.2832); c.fill();
  }
  function drawInteriorWalls(){ if(!map.walls.length) return; ctx.save(); ctx.fillStyle=C.ink;
    const normal=Math.max(1.3,1.7*cam.scale), thin=Math.max(0.6,0.85*cam.scale);
    for(const wl of map.walls){
      const wt = tex ? texOf(wl.wall, tex.wall) : null;
      const pts = (wl.cx===undefined || wl.cy===undefined) ? [[wl.x1,wl.y1],[wl.x2,wl.y2]] : wallSamples(wl);
      if(wt && stripPath(ctx, densify(pts,5), false, wt, halfPxFor(wt)*(wl.thin?0.5:1))) continue;
      const hw = wl.thin ? thin : normal;
      if(wl.cx===undefined || wl.cy===undefined) roughSeg(ctx, [wl.x1,wl.y1],[wl.x2,wl.y2], hw);
      else roughCurve(ctx, pts, hw); }
    ctx.restore(); }

  // Interior "shapes" (deco: pillars, dais, tables, pits) — drawn as thin rough
  // OUTLINES on top of the floor, never as rooms: they add no floor, no rock wall
  // ring, no interior punch. shapeOutline samples circles as true arcs ⇒ round.
  // ── objects (Advanced Mode) ───────────────────────────────────────
  // map.objects[] = { id, tex, x, y, w, h, rot, flip }
  //   x,y = CENTRE in world cells · w,h = size in cells · rot = radians
  // Drawn last, on top of floors, walls, doors and stairs — a prop sits on the
  // map. Resolved through tex.byId like every other texture, so objects appear
  // only in Advanced Mode and classic output stays pure ink by construction.
  function drawObjects(){
    if(!tex || !map.objects || !map.objects.length) return;
    for(const o of map.objects){
      const t=texOf(o.tex, null);
      if(!t || !t.img || !t.img.complete || !t.img.naturalWidth) continue;
      const p=toScreen(o.x,o.y), w=(o.w||1)*wpx(), h=(o.h||1)*wpx();
      ctx.save();
      ctx.translate(p[0],p[1]);
      if(o.rot) ctx.rotate(o.rot);
      if(o.flip) ctx.scale(-1,1);
      const a=t.atlas;
      if(a) ctx.drawImage(t.img, a.x, a.y, a.w, a.h, -w/2, -h/2, w, h);  // bundled: atlas sub-rect
      else  ctx.drawImage(t.img, -w/2, -h/2, w, h);                      // imported: whole file
      ctx.restore();
    }
  }
  // World-space AABB of a (possibly rotated) object.
  function objBox(o){
    const hw=(o.w||1)/2, hh=(o.h||1)/2, r=o.rot||0, c=Math.cos(r), s=Math.sin(r);
    const xs=[], ys=[];
    for(const [dx,dy] of [[-hw,-hh],[hw,-hh],[hw,hh],[-hw,hh]]){
      xs.push(o.x+dx*c-dy*s); ys.push(o.y+dx*s+dy*c); }
    const x=Math.min.apply(null,xs), y=Math.min.apply(null,ys);
    return {x, y, w:Math.max.apply(null,xs)-x, h:Math.max.apply(null,ys)-y};
  }

  // A Shapes-mode outline follows the shape's WALL texture, at half thickness —
  // the same treatment the thin Wall tool gets, so a pillar or dais reads as a
  // thin course of the same masonry rather than an ink line on a textured map.
  // Falls back to the rough ink ring when there's no texture.
  function drawDecoRing(c, sh, inkHalf){
    const wt=shapeWallTex(sh);
    if(wt && stripPath(c, outlineDense(sh), true, wt, Math.max(1, halfPxFor(wt)*0.5))) return;
    roughRing(c, shapeOutline(sh), inkHalf);
  }

  function drawDecoShapes(){
    let any=false, floor=false;
    for(const s of map.shapes){ if(s.deco) any=true; else floor=true; }
    if(!any) return;
    const thin=Math.max(0.6,0.85*cam.scale);
    // No rooms at all ⇒ nothing to clip against, draw the outlines as-is.
    if(!floor){ ctx.save(); ctx.fillStyle=C.ink;
      for(const sh of map.shapes){ if(sh.deco) drawDecoRing(ctx, sh, thin); }
      ctx.restore(); return; }
    // Otherwise a deco shape is CLIPPED to the dungeon interior: draw the thin
    // outlines to a scratch buffer, then keep only the pixels that land on the
    // floor union (inset by the room-wall half-width, so an outline stops at the
    // wall's inner edge instead of bleeding across it). Half a circle placed on an
    // exterior wall therefore shows only the half that is inside the room.
    sizeBufs();
    const dc=buf.deco.getContext("2d"); dc.setTransform(1,0,0,1,0,0); dc.clearRect(0,0,W,H);
    dc.globalCompositeOperation="source-over"; dc.fillStyle=C.ink;
    for(const sh of map.shapes){ if(!sh.deco) continue; drawDecoRing(dc, sh, thin); }
    const cc=buf.decoClip.getContext("2d"); cc.setTransform(1,0,0,1,0,0); cc.clearRect(0,0,W,H);
    cc.globalCompositeOperation="source-over"; cc.fillStyle="#fff";
    for(const sh of map.shapes){ if(sh.deco) continue;
      fillInsetShape(cc, sh, (halfPxFor(shapeWallTex(sh))+1.4)/wpx()); }
    dc.globalCompositeOperation="destination-in"; dc.drawImage(buf.decoClip,0,0);
    ctx.drawImage(buf.deco,0,0); }

  // Door LEAF half-thickness, in world cells — CONSTANT. It deliberately does not
  // follow the wall it sits in: a 1.5-cell cave wall used to grow a door leaf five
  // times fatter than the same door in a railing. Only `len` varies now.
  const DOOR_HALF = 0.15;
  function doorGeom(d){
    const a=d.a||0, stub=0.13, hl=(d.len||1)/2;
    // `ht` = the leaf (drawDoor), FIXED. `wt` = how deep the opening is cut through
    // the wall (punchDoorQuad), which still tracks wall thickness so the doorway is
    // a real full-depth gap — the leaf just hangs in the middle of it.
    return { cx:d.x, cy:d.y, alx:Math.cos(a), aly:Math.sin(a), acx:-Math.sin(a), acy:Math.cos(a),
             hl, rhl:Math.max(0.12, hl-stub), ht:DOOR_HALF,
             wt:Math.max(DOOR_HALF, wallHalfCellsAt(d)), stub };
  }
  function punchDoorQuad(wc, d){
    const g=doorGeom(d);
    const rect=(sl0,sl1,st)=>{ const c=(sl,s)=>toScreen(g.cx+g.alx*sl+g.acx*s, g.cy+g.aly*sl+g.acy*s);
      const p1=c(sl0,-st),p2=c(sl1,-st),p3=c(sl1,st),p4=c(sl0,st);
      wc.beginPath(); wc.moveTo(p1[0],p1[1]); wc.lineTo(p2[0],p2[1]); wc.lineTo(p3[0],p3[1]); wc.lineTo(p4[0],p4[1]); wc.closePath(); wc.fill(); };
    rect(-g.rhl, g.rhl, g.wt*1.1);
    const sh=Math.max(0.05, wallHalfCellsAt(d) || (1.7*cam.scale)/wpx());
    rect(-g.hl, -g.rhl, sh);
    rect( g.rhl, g.hl, sh);
  }
  function drawDoor(d){
    const g=doorGeom(d), halfW=Math.max(1.1,1.5*cam.scale);
    const w=(sl,st)=>[g.cx+g.alx*sl+g.acx*st, g.cy+g.aly*sl+g.acy*st];
    const s=(sl,st)=>toScreen(g.cx+g.alx*sl+g.acx*st, g.cy+g.aly*sl+g.acy*st);
    ctx.save();
    const A=s(-g.rhl,-g.ht),B=s(g.rhl,-g.ht),C2=s(g.rhl,g.ht),D=s(-g.rhl,g.ht);
    // Advanced Mode gets a wood-brown leaf; the near-white classic fill reads as a
    // hole punched in the wall once everything around it is textured stone.
    // `tex` is only set in textured mode, so classic output is untouched.
    ctx.fillStyle = textured() ? C.doorWood : C.doorFill;
    ctx.beginPath(); ctx.moveTo(A[0],A[1]); ctx.lineTo(B[0],B[1]); ctx.lineTo(C2[0],C2[1]); ctx.lineTo(D[0],D[1]); ctx.closePath(); ctx.fill();
    ctx.fillStyle=C.ink;
    roughSeg(ctx, w(-g.rhl,-g.ht), w( g.rhl,-g.ht), halfW);
    roughSeg(ctx, w(-g.rhl, g.ht), w( g.rhl, g.ht), halfW);
    roughSeg(ctx, w(-g.rhl,-g.ht), w(-g.rhl, g.ht), halfW);
    roughSeg(ctx, w( g.rhl,-g.ht), w( g.rhl, g.ht), halfW);
    roughSeg(ctx, w(-g.rhl,0), w(-g.hl,0), halfW);
    roughSeg(ctx, w( g.rhl,0), w( g.hl,0), halfW);
    ctx.restore();
  }
  function drawStair(s){
    let a,b,tip;
    if(s.ax!==undefined){ a=[s.ax,s.ay]; b=[s.bx,s.by]; tip=[s.tx,s.ty]; }
    else if(s.x1!==undefined){
      const dx=s.x2-s.x1, dy=s.y2-s.y1, len=Math.hypot(dx,dy)||1, nx=-dy/len, ny=dx/len, hw=(s.w||2)/2;
      a=[s.x1+nx*hw, s.y1+ny*hw]; b=[s.x1-nx*hw, s.y1-ny*hw]; tip=[s.x2,s.y2];
    } else return;
    const mx=(a[0]+b[0])/2, my=(a[1]+b[1])/2;
    const travel=Math.hypot(tip[0]-mx, tip[1]-my);
    const steps=Math.max(2, Math.round(travel/0.18));
    const halfW=Math.max(0.7,1.0*cam.scale);
    ctx.save(); ctx.fillStyle=C.ink;
    for(let i=0;i<=steps;i++){ const t=i/steps;
      const la=[a[0]+(tip[0]-a[0])*t, a[1]+(tip[1]-a[1])*t];
      const lb=[b[0]+(tip[0]-b[0])*t, b[1]+(tip[1]-b[1])*t];
      if(Math.hypot(lb[0]-la[0], lb[1]-la[1])<0.06) continue;
      roughSeg(ctx, la, lb, halfW);
    }
    ctx.restore(); }

  // ════════════════════════════════ GENERATOR ════════════════════════════════
  let rngState = 0;
  function rng(){ rngState=(rngState*1664525+1013904223)>>>0; return rngState/4294967296; }
  function ri(a,b){ return a+Math.floor(rng()*(b-a+1)); }
  function blankMap(){ return { version:1, name:"", grid:true, shapes:[], walls:[], doors:[], stairs:[], objects:[], seedId:1 }; }
  function uid(){ return map.seedId++; }

  function generate(opts){
    opts = opts || {};
    const nRooms = clamp(opts.rooms!=null?+opts.rooms:8, 2, 40);
    const sizeIdx = clamp(opts.size!=null?+opts.size:3, 1, 5);
    const [smin,smax] = SIZE_MAP[sizeIdx];
    const spread = clamp(opts.layout!=null?+opts.layout:3, 1, 5);
    const doCorr = opts.corridors !== false;
    const roundOk = !!opts.roundRooms;
    const nEntrances = clamp(opts.entrances!=null?+opts.entrances:2, 0, 20);
    const th = (opts.theme==="dark") ? "dark" : "light";
    rngState = (opts.seed!=null) ? (opts.seed>>>0)
                                 : ((Date.now() ^ (Math.floor(Math.random()*1e9))) >>> 0);

    map = blankMap(); map.theme = th;

    const avg=(smin+smax)/2;
    const density=[0.5,0.4,0.32,0.25,0.18][spread-1];
    const field=Math.max(avg, Math.round(avg*Math.sqrt(nRooms/density)/2));
    const rooms=[];
    if(!doCorr){
      placeAdjacentRooms(rooms, nRooms, smin, smax);
    } else {
      let tries=0, guard=nRooms*220;
      while(rooms.length<nRooms && tries++<guard){
        const round = roundOk && rng()<0.28;
        const w=ri(smin,smax), h=round?w:ri(smin,smax);
        const x=ri(-field, field), y=ri(-field, field);
        const gap=1;
        const nb={x:x-gap,y:y-gap,w:w+gap*2,h:h+gap*2};
        if(rooms.some(r=>rectsOverlap(nb,{x:r.x,y:r.y,w:r.w,h:r.h}))) continue;
        rooms.push({x,y,w,h,round,cx:x+w/2,cy:y+h/2});
      }
    }
    for(const r of rooms){
      if(r.round){ const rad=Math.max(r.w,r.h)/2; map.shapes.push({id:uid(),type:"circle",cx:r.cx,cy:r.cy,r:Math.round(rad)}); }
      else map.shapes.push({id:uid(),type:"rect",x:r.x,y:r.y,w:r.w,h:r.h});
    }
    if(doCorr && rooms.length>1){
      const connected=[0], pending=rooms.map((_,i)=>i).slice(1);
      while(pending.length){
        let bi=-1,bj=-1,bd=1e9;
        for(const ci of connected) for(const pj of pending){
          const d=Math.hypot(rooms[ci].cx-rooms[pj].cx, rooms[ci].cy-rooms[pj].cy);
          if(d<bd){ bd=d; bi=ci; bj=pj; } }
        carveCorridor(rooms[bi], rooms[bj]);
        connected.push(bj); pending.splice(pending.indexOf(bj),1);
      }
      const extra=Math.floor(rooms.length*0.15);
      for(let k=0;k<extra;k++){ const a=ri(0,rooms.length-1),b=ri(0,rooms.length-1);
        if(a!==b && Math.hypot(rooms[a].cx-rooms[b].cx,rooms[a].cy-rooms[b].cy)<avg*5) carveCorridor(rooms[a],rooms[b]); }
    }
    else if(rooms.length>1){ addAdjacencyDoors(rooms); }
    map.doors = finalizeDoors();
    placeEntrances(nEntrances);
    return map;
  }

  function finalizeDoors(){
    const s2=v=>Math.round(v*2)/2;
    const cross=(x,y,vx,vy)=> pointInAny(x+vx*0.5,y+vy*0.5) && pointInAny(x-vx*0.5,y-vy*0.5);
    const fitted=[];
    for(const d of map.doors){
      const a=d.a||0, ux=Math.cos(a),uy=Math.sin(a), vx=-Math.sin(a),vy=Math.cos(a);
      if(d._adj){ fitted.push({id:d.id, x:d.x, y:d.y, a, len:d.len||1}); continue; }
      let cx=d.x, cy=d.y;
      if(!cross(cx,cy,vx,vy)){
        let found=false;
        for(let t=0.25;t<=1.5 && !found;t+=0.25){
          if(cross(cx+ux*t,cy+uy*t,vx,vy)){ cx+=ux*t; cy+=uy*t; found=true; }
          else if(cross(cx-ux*t,cy-uy*t,vx,vy)){ cx-=ux*t; cy-=uy*t; found=true; }
        }
        if(!found) continue;
      }
      let lo=0; for(let t=-0.15;t>=-2.4;t-=0.15){ if(cross(cx+ux*t,cy+uy*t,vx,vy)) lo=t; else break; }
      let hi=0; for(let t=0.15;t<=2.4;t+=0.15){ if(cross(cx+ux*t,cy+uy*t,vx,vy)) hi=t; else break; }
      const width=hi-lo, mid=(lo+hi)/2;
      if(width<0.6 || width>2.4) continue;
      let mx=cx+ux*mid, my=cy+uy*mid;
      if(Math.abs(ux)>=Math.abs(uy)) mx=s2(mx); else my=s2(my);
      const len=Math.min(2,Math.max(1,Math.round(width))), hl=len/2;
      if(cross(mx+ux*(hl+0.35),my+uy*(hl+0.35),vx,vy)) continue;
      if(cross(mx-ux*(hl+0.35),my-uy*(hl+0.35),vx,vy)) continue;
      fitted.push({id:d.id, x:mx, y:my, a, len});
    }
    return dedupeDoors(fitted);
  }
  function dedupeDoors(arr){
    const out=[];
    for(const d of arr){ const dl=(d.len||1)/2;
      const dup=out.some(o=>{ const dist=Math.hypot(o.x-d.x,o.y-d.y), ol=(o.len||1)/2;
        const parallel=Math.abs(Math.sin((o.a||0)-(d.a||0)))<0.4;
        return dist < (parallel ? Math.max(0.6,(dl+ol)*0.85) : 0.4); });
      if(!dup) out.push(d); }
    return out;
  }
  function placeEntrances(n){
    if(n<=0) return;
    const floor=(x,y)=>pointInAny(x,y), empty=(x,y)=>!pointInAny(x,y);
    const cand=[];
    for(const sh of map.shapes){
      if(sh.corridor) continue;
      const room=sh.id;
      if(sh.type==="rect"){
        for(let x=sh.x+0.5; x<=sh.x+sh.w-0.5; x+=1){
          if(floor(x,sh.y+0.5)      && empty(x-0.5,sh.y-0.5)      && empty(x+0.5,sh.y-0.5))
            cand.push({x, y:sh.y, a:0, room});
          if(floor(x,sh.y+sh.h-0.5) && empty(x-0.5,sh.y+sh.h+0.5) && empty(x+0.5,sh.y+sh.h+0.5))
            cand.push({x, y:sh.y+sh.h, a:0, room});
        }
        for(let y=sh.y+0.5; y<=sh.y+sh.h-0.5; y+=1){
          if(floor(sh.x+0.5,y)      && empty(sh.x-0.5,y-0.5)      && empty(sh.x-0.5,y+0.5))
            cand.push({x:sh.x, y, a:Math.PI/2, room});
          if(floor(sh.x+sh.w-0.5,y) && empty(sh.x+sh.w+0.5,y-0.5) && empty(sh.x+sh.w+0.5,y+0.5))
            cand.push({x:sh.x+sh.w, y, a:Math.PI/2, room});
        }
      } else if(sh.type==="circle"){
        const r=sh.r, s2=v=>Math.round(v*2)/2;
        const ext=[[sh.cx+r,sh.cy,Math.PI/2,1,0],[sh.cx-r,sh.cy,Math.PI/2,-1,0],
                   [sh.cx,sh.cy+r,0,0,1],[sh.cx,sh.cy-r,0,0,-1]];
        for(const [px,py,a,ox,oy] of ext){
          if(empty(px+ox*0.6,py+oy*0.6) && floor(px-ox*0.5,py-oy*0.5))
            cand.push(a===0 ? {x:s2(px), y:py, a, room} : {x:px, y:s2(py), a, room});
        }
      }
    }
    let pool=cand.filter(c=> !map.doors.some(d=>Math.hypot(d.x-c.x,d.y-c.y)<1.2));
    let placed=0;
    while(placed<n && pool.length){
      const c=pool.splice(Math.floor(rng()*pool.length),1)[0];
      map.doors.push({id:uid(), x:c.x, y:c.y, a:c.a, len:1});
      pool=pool.filter(o=> o.room!==c.room && Math.hypot(o.x-c.x,o.y-c.y)>3);
      placed++;
    }
  }
  function rectsOverlap(a,b){ return a.x<b.x+b.w && a.x+a.w>b.x && a.y<b.y+b.h && a.y+a.h>b.y; }
  function placeAdjacentRooms(rooms, nRooms, smin, smax){
    const w0=ri(smin,smax), h0=ri(smin,smax);
    rooms.push({x:0,y:0,w:w0,h:h0,round:false,cx:w0/2,cy:h0/2});
    let tries=0, guard=nRooms*500;
    while(rooms.length<nRooms && tries++<guard){
      const base=rooms[ri(0,rooms.length-1)];
      const w=ri(smin,smax), h=ri(smin,smax);
      let nx,ny;
      switch(ri(0,3)){
        case 0: nx=base.x+base.w;  ny=base.y+ri(-(h-2), base.h-2); break;
        case 1: nx=base.x-w;       ny=base.y+ri(-(h-2), base.h-2); break;
        case 2: ny=base.y+base.h;  nx=base.x+ri(-(w-2), base.w-2); break;
        default:ny=base.y-h;       nx=base.x+ri(-(w-2), base.w-2); break;
      }
      const cand={x:nx,y:ny,w,h,round:false,cx:nx+w/2,cy:ny+h/2};
      if(rooms.some(r=>rectsOverlap(cand,r))) continue;
      rooms.push(cand);
    }
  }
  function addAdjacencyDoors(rooms){
    const s2=v=>Math.round(v*2)/2, EPS=1e-6;
    for(let i=0;i<rooms.length;i++) for(let j=i+1;j<rooms.length;j++){
      const a=rooms[i], b=rooms[j]; let door=null;
      if(Math.abs((a.x+a.w)-b.x)<EPS || Math.abs((b.x+b.w)-a.x)<EPS){
        const y0=Math.max(a.y,b.y), y1=Math.min(a.y+a.h,b.y+b.h);
        if(y1-y0>=2){ const x=Math.abs((a.x+a.w)-b.x)<EPS ? a.x+a.w : a.x;
          door={x, y:s2((y0+y1)/2), a:Math.PI/2}; }
      } else if(Math.abs((a.y+a.h)-b.y)<EPS || Math.abs((b.y+b.h)-a.y)<EPS){
        const x0=Math.max(a.x,b.x), x1=Math.min(a.x+a.w,b.x+b.w);
        if(x1-x0>=2){ const y=Math.abs((a.y+a.h)-b.y)<EPS ? a.y+a.h : a.y;
          door={x:s2((x0+x1)/2), y, a:0}; }
      }
      if(door){ door.id=uid(); door.len=(rng()<0.5?1:2); door._adj=true; map.doors.push(door); }
    }
  }
  function carveCorridor(A,B){
    const ax=Math.round(A.cx),ay=Math.round(A.cy),bx=Math.round(B.cx),by=Math.round(B.cy);
    const horizFirst=rng()<0.5;
    const cw=rng()<0.5?1:2;
    if(horizFirst){
      map.shapes.push(hall(Math.min(ax,bx),ay,Math.abs(bx-ax)+cw,cw));
      map.shapes.push(hall(bx,Math.min(ay,by),cw,Math.abs(by-ay)+cw));
      addDoor(A,"h",ay+cw/2,Math.sign(bx-ax)||1, bx,ay, cw);
      addDoor(B,"v",bx+cw/2,Math.sign(ay-by)||1, bx,ay, cw);
    } else {
      map.shapes.push(hall(ax,Math.min(ay,by),cw,Math.abs(by-ay)+cw));
      map.shapes.push(hall(Math.min(ax,bx),by,Math.abs(bx-ax)+cw,cw));
      addDoor(A,"v",ax+cw/2,Math.sign(by-ay)||1, ax,by, cw);
      addDoor(B,"h",by+cw/2,Math.sign(ax-bx)||1, ax,by, cw);
    }
  }
  function hall(x,y,w,h){ return {id:uid(),type:"rect",x,y,w:Math.max(1,w),h:Math.max(1,h),corridor:true}; }
  function addDoor(room, axis, line, side, tcx, tcy, len){
    len = len || 1; const m=len/2;
    if(room.round){
      const cx=room.cx, cy=room.cy, r=Math.max(room.w,room.h)/2;
      if(axis==="h"){
        const y=Math.max(cy-r+0.4, Math.min(cy+r-0.4, line));
        const off=Math.sqrt(Math.max(0.04, r*r-(y-cy)*(y-cy)));
        map.doors.push({id:uid(), x:cx+(side>0?off:-off), y, a:Math.PI/2, len});
      } else {
        const x=Math.max(cx-r+0.4, Math.min(cx+r-0.4, line));
        const off=Math.sqrt(Math.max(0.04, r*r-(x-cx)*(x-cx)));
        map.doors.push({id:uid(), x, y:cy+(side>0?off:-off), a:0, len});
      }
      return;
    }
    if(axis==="h"){ const x=side>0?room.x+room.w:room.x, y=Math.min(room.y+room.h-m,Math.max(room.y+m,line));
      map.doors.push({id:uid(), x, y, a:Math.PI/2, len}); }
    else { const y=side>0?room.y+room.h:room.y, x=Math.min(room.x+room.w-m,Math.max(room.x+m,line));
      map.doors.push({id:uid(), x, y, a:0, len}); }
  }

  // ════════════════════════════════ PUBLIC API ════════════════════════════════
  function toPNG(mapData, opts){
    opts = opts || {};
    const pad = (opts.pad!=null) ? opts.pad : 1.5;
    const res = opts.res || 2;
    setThemeColors(opts.theme || mapData.theme || "light");
    map = mapData;
    const b = contentBounds();
    if(!b) return null;
    const cw=(b.X-b.x+pad*2), ch=(b.Y-b.y+pad*2);
    W = Math.round(cw*CELL*res); H = Math.round(ch*CELL*res); DPR = 1;
    const cv = document.createElement("canvas"); cv.width=W; cv.height=H;
    ctx = cv.getContext("2d");
    cam = { x:(b.x+b.X)/2, y:(b.y+b.Y)/2, scale:res };
    exporting = true; noRock = !!opts.transparent;
    tex = opts.tex || null;
    render();
    return cv.toDataURL("image/png");
  }

  function generateToPNG(opts){
    opts = opts || {};
    const m = generate(opts);
    const png = toPNG(m, { theme: opts.theme, transparent: opts.transparent, pad: opts.pad, res: opts.res });
    return { png, mapData: m, width: W, height: H };
  }

  // Draw a map onto a caller-supplied canvas/context using the caller's camera.
  // Used by the interactive Map Maker so its live canvas and this engine share
  // one renderer. Draws only the MAP (floors/walls/doors/stairs/grid/dots); the
  // Map Maker layers its own tool-preview / selection overlays on top afterwards.
  //   target : a <canvas> or a CanvasRenderingContext2D
  //   opts   : { cam:{x,y,scale}, W, H, DPR=1, theme, transparent=false }
  function renderTo(target, mapData, opts){
    opts = opts || {};
    ctx = (target && typeof target.getContext === "function") ? target.getContext("2d") : target;
    map = mapData;
    cam = opts.cam || cam;
    W = (opts.W != null) ? opts.W : ((target && target.width) || W);
    H = (opts.H != null) ? opts.H : ((target && target.height) || H);
    DPR = (opts.DPR != null) ? opts.DPR : 1;
    setThemeColors(opts.theme || mapData.theme || "light");
    exporting = true;                 // never draw preview/selection here
    noRock = !!opts.transparent;
    tex = opts.tex || null;           // Advanced-Mode textures, host-supplied
    render();
  }

  return { generate, toPNG, generateToPNG, renderTo, THEMES, CELL };
})();
