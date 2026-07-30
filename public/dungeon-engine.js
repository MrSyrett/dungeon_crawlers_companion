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
      grid:"#8a8a8a", dot:"#8a8a8a", hatch:"#33302a",
      ink:"#14120d", doorFill:"#fbf8f0", shadow:"rgba(20,17,12,.18)", sel:"#c9a94a",
    },
  };
  // Dark mode changes ONLY the exterior background (rooms/walls/floors/etc. stay).
  THEMES.dark = Object.assign({}, THEMES.light, { bg:"#171a21", rockHi:"#232833" });

  // ── per-render state (module-scoped; (re)set before each render) ──
  let map = null, cam = {x:0,y:0,scale:1}, W = 0, H = 0, DPR = 1;
  let exporting = true, noRock = false, ctx = null;
  const C = Object.assign({}, THEMES.light);
  function oc(){ return document.createElement("canvas"); }
  const buf = { mask:oc(), tint:oc(), grid:oc(), wall:oc(), erode:oc() };
  function sizeBufs(){ for(const k in buf){ if(buf[k].width!==W||buf[k].height!==H){ buf[k].width=W; buf[k].height=H; } } }
  function setThemeColors(t){ Object.assign(C, THEMES[(t==="dark")?"dark":"light"]); }
  const clamp = (v,lo,hi)=> Math.max(lo, Math.min(hi, v));

  // ── coordinate helpers (world cells ↔ output px) ──
  function wpx(){ return CELL * cam.scale; }
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
    for(const w of map.walls){ pts.push([w.x1,w.y1],[w.x2,w.y2]); }
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
      const [x0,y0]=toScreen(sh.pts[0][0], sh.pts[0][1]); c.moveTo(x0,y0);
      for(let i=1;i<sh.pts.length;i++){ const [x,y]=toScreen(sh.pts[i][0], sh.pts[i][1]); c.lineTo(x,y); }
      c.closePath();
    }
  }

  // ════════════════════════════════ RENDER ════════════════════════════════
  function render(){
    ctx.setTransform(DPR,0,0,DPR,0,0);
    ctx.clearRect(0,0,W,H);
    if(!noRock){ ctx.fillStyle=C.rockHi; ctx.fillRect(0,0,W,H); drawDotGrid(); }

    const shapes = map.shapes;
    if(shapes.length){
      sizeBufs();
      // floor mask (white union)
      const m=buf.mask.getContext("2d"); m.setTransform(1,0,0,1,0,0);
      m.clearRect(0,0,W,H); m.fillStyle="#fff"; m.beginPath();
      for(const sh of shapes) shapePath(m, sh); m.fill("nonzero");
      // floor colour
      const tc=buf.tint.getContext("2d"); tc.setTransform(1,0,0,1,0,0);
      tc.clearRect(0,0,W,H); tc.globalCompositeOperation="source-over"; tc.drawImage(buf.mask,0,0);
      tc.globalCompositeOperation="source-in"; tc.fillStyle=C.floor; tc.fillRect(0,0,W,H);
      tc.globalCompositeOperation="source-over";
      ctx.drawImage(buf.tint,0,0);
      // grid inside floor
      if(map.grid!==false && wpx()>7){
        const gc=buf.grid.getContext("2d"); gc.setTransform(1,0,0,1,0,0);
        gc.clearRect(0,0,W,H); gc.globalCompositeOperation="source-over";
        gc.strokeStyle=C.grid; gc.lineWidth=Math.max(1,1.5*cam.scale); gc.globalAlpha=.85;
        const p=wpx(); const [ox,oy]=toScreen(0,0); gc.beginPath();
        for(let x=ox%p;x<=W;x+=p){ gc.moveTo(x+.5,0); gc.lineTo(x+.5,H); }
        for(let y=oy%p;y<=H;y+=p){ gc.moveTo(0,y+.5); gc.lineTo(W,y+.5); }
        gc.stroke(); gc.globalAlpha=1;
        gc.globalCompositeOperation="destination-in"; gc.drawImage(buf.mask,0,0);
        ctx.drawImage(buf.grid,0,0);
      }
      drawWalls();
    }
    drawInteriorWalls();
    for(const d of map.doors) drawDoor(d);
    for(const s of map.stairs) drawStair(s);
  }

  function drawDotGrid(){ const p=wpx(); if(p<13) return; ctx.save(); ctx.fillStyle=C.dot; ctx.globalAlpha=.8;
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

  function drawWalls(){
    if(!map.shapes.length) return;
    const halfW=Math.max(1.3,1.7*cam.scale);
    const wc=buf.wall.getContext("2d"); wc.setTransform(1,0,0,1,0,0); wc.clearRect(0,0,W,H);
    wc.globalCompositeOperation="source-over"; wc.fillStyle=C.ink;
    for(const sh of map.shapes) roughRing(wc, shapeOutline(sh), halfW);
    const ec=buf.erode.getContext("2d"); ec.setTransform(1,0,0,1,0,0); ec.clearRect(0,0,W,H);
    ec.globalCompositeOperation="source-over"; ec.fillStyle="#fff";
    const inset=(halfW+1.4)/wpx();
    for(const sh of map.shapes) fillInsetShape(ec, sh, inset);
    wc.globalCompositeOperation="destination-out"; wc.drawImage(buf.erode,0,0);
    for(const d of map.doors) punchDoorQuad(wc, d);
    if(!noRock){ const o=Math.min(2,cam.scale); ctx.save(); ctx.globalAlpha=.16;
      ctx.drawImage(buf.wall, 2.3*o, 2.9*o); ctx.restore(); }
    ctx.drawImage(buf.wall,0,0);
  }

  function drawInteriorWalls(){ if(!map.walls.length) return; ctx.save(); ctx.fillStyle=C.ink;
    const halfW=Math.max(1.3,1.7*cam.scale);
    for(const wl of map.walls) roughSeg(ctx, [wl.x1,wl.y1],[wl.x2,wl.y2],halfW);
    ctx.restore(); }

  function doorGeom(d){
    const a=d.a||0, stub=0.13, hl=(d.len||1)/2;
    return { cx:d.x, cy:d.y, alx:Math.cos(a), aly:Math.sin(a), acx:-Math.sin(a), acy:Math.cos(a),
             hl, rhl:Math.max(0.12, hl-stub), ht:0.15, stub };
  }
  function punchDoorQuad(wc, d){
    const g=doorGeom(d);
    const rect=(sl0,sl1,st)=>{ const c=(sl,s)=>toScreen(g.cx+g.alx*sl+g.acx*s, g.cy+g.aly*sl+g.acy*s);
      const p1=c(sl0,-st),p2=c(sl1,-st),p3=c(sl1,st),p4=c(sl0,st);
      wc.beginPath(); wc.moveTo(p1[0],p1[1]); wc.lineTo(p2[0],p2[1]); wc.lineTo(p3[0],p3[1]); wc.lineTo(p4[0],p4[1]); wc.closePath(); wc.fill(); };
    rect(-g.rhl, g.rhl, g.ht*1.1);
    const sh=Math.max(0.05, (1.7*cam.scale)/wpx());
    rect(-g.hl, -g.rhl, sh);
    rect( g.rhl, g.hl, sh);
  }
  function drawDoor(d){
    const g=doorGeom(d), halfW=Math.max(1.1,1.5*cam.scale);
    const w=(sl,st)=>[g.cx+g.alx*sl+g.acx*st, g.cy+g.aly*sl+g.acy*st];
    const s=(sl,st)=>toScreen(g.cx+g.alx*sl+g.acx*st, g.cy+g.aly*sl+g.acy*st);
    ctx.save();
    const A=s(-g.rhl,-g.ht),B=s(g.rhl,-g.ht),C2=s(g.rhl,g.ht),D=s(-g.rhl,g.ht);
    ctx.fillStyle=C.doorFill;
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
  function blankMap(){ return { version:1, name:"", grid:true, shapes:[], walls:[], doors:[], stairs:[], seedId:1 }; }
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
    render();
  }

  return { generate, toPNG, generateToPNG, renderTo, THEMES, CELL };
})();
