"""One dice tray for every d20 character sheet, modelled on the GM Screen's pool tray.

Rows:  pool readout ("Empty")  /  (Dragonbane: boons | banes)  /  dice  /  [x] [ADV] [DIS] [Roll]
Run once against the current sheets (it is idempotent: a sheet that already has the
unified tray has its tray, CSS and JS regenerated)."""
import os, re, sys
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'tools', 'templates'))

DICE = [2, 4, 6, 8, 10, 12, 20, 100]
ICON = ('<svg class="utr-ico" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true">'
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.2h14a1.8 1.8 0 0 1 1.8 1.8v14a1.8 1.8 0 0 1-1.8 1.8H5A1.8 1.8 0 0 1 3.2 19V5A1.8 1.8 0 0 1 5 3.2Zm3 3.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM12 10.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm-4 4.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg>')

# Per sheet: UI-role font, number-role font (the sheet's own tokens where it has them,
# otherwise the family the sheet itself uses for that role), accent + text on accent, hooks.
SHEETS = {
    'sd':  dict(ui="var(--f-ui, 'Montserrat', sans-serif)", num="var(--f-num, 'Montserrat', sans-serif)", acc='var(--gold)', on='var(--on-gold)',
                hook="get:function(){ return advState==='advantage'?'adv':advState==='disadvantage'?'dis':'none'; },\n"
                     "  set:function(m){ clearAdv(); if(m!=='none') toggleAdv(m==='adv'?'advantage':'disadvantage'); }"),
    'dcc': dict(ui="var(--f-ui, 'Barlow Condensed', sans-serif)", num="var(--f-num, 'Share Tech Mono', monospace)", acc='var(--red)', on='#fff',
                hook="get:function(){ return advState==='advantage'?'adv':advState==='disadvantage'?'dis':'none'; },\n"
                     "  set:function(m){ clearAdv(); if(m!=='none') toggleAdv(m==='adv'?'advantage':'disadvantage'); }"),
    'dnd': dict(ui="var(--f-ui, 'Barlow Condensed', sans-serif)", num="var(--f-num, 'Share Tech Mono', monospace)", acc='var(--dnd)', on='#fff',
                hook="get:function(){ return _adv==='adv'||_adv==='dis'?_adv:'none'; },\n"
                     "  set:function(m){ setAdv(m==='none'?'norm':m); },\n"
                     "  pre:function(){ return !rollsOff(); }"),
    'lotr': dict(ui='var(--f-ui)', num='var(--f-num)', acc='var(--acc)', on='var(--on-acc, #fff)',
                hook="get:function(){ return _adv==='adv'||_adv==='dis'?_adv:'none'; },\n"
                     "  set:function(m){ setAdv(m==='none'?'norm':m); },\n"
                     "  pre:function(){ return !rollsOff(); }"),
    'pb':  dict(ui='var(--f-ui)', num='var(--f-num)', acc='var(--acc)', on='#fff',
                hook="get:function(){ return _tadv==='adv'||_tadv==='dis'?_tadv:'none'; },\n"
                     "  set:function(m){ trayAdv(m==='none'?'norm':m); }"),
    'db':  dict(ui='var(--f-ui)', num='var(--f-num)', acc='var(--acc)', on='#fff', letter='D', bb=True,
                hook="letter:'D', noAdv:true,\n"
                     "  // Boons / banes go on the pool's first D20 (extra D20s, keep the lowest / highest).\n"
                     "  d20:function(){ var nb=TR.boon-TR.bane; if(!nb) return null; var p=d20Pool(nb); return { v:p.result, txt:p.n+'D20('+p.rolls.join(',')+') '+(nb>0?'keep lowest':'keep highest')+' → '+p.result }; },\n"
                     "  note:function(){ var m=[]; if(TR.boon) m.push(TR.boon+(TR.boon===1?' boon':' boons')); if(TR.bane) m.push(TR.bane+(TR.bane===1?' bane':' banes')); return m.join(', '); },\n"
                     "  lone:function(v){ return v===1?{word:'DRAGON!',type:'crit'}:v===20?{word:'DEMON!',type:'fumble'}:{type:'normal'}; },\n"
                     "  after:function(){ TR.boon=0; TR.bane=0; renderTray(); }"),
    'nimble': dict(ui="var(--f-ui, 'Barlow Condensed', sans-serif)", num="var(--f-num, 'Share Tech Mono', monospace)", acc='var(--nim)', on='#fff',
                hook="get:function(){ return advState===1?'adv':advState===-1?'dis':'none'; },\n"
                     "  set:function(m){ clearAdv(); if(m!=='none') setAdv(m==='adv'?1:-1); }"),
    # ICRPG and Kids on Bikes have no advantage rule and no d2 / d100: their own dice, no mode row.
    'icrpg': dict(ui="var(--f-ui, 'Barlow Condensed', sans-serif)", num="var(--f-num, 'Share Tech Mono', monospace)", acc='var(--icrpg)', on='#1a1a1a', hook='noAdv:true', dice=[4, 6, 8, 10, 12, 20], noadv=True),
    'kob': dict(ui="var(--f-ui, 'Barlow Condensed', sans-serif)", num="var(--f-num, 'Share Tech Mono', monospace)", acc='var(--kob)', on='#fff', hook='noAdv:true', dice=[4, 6, 8, 10, 12, 20], noadv=True),
    'jlu': dict(ui="var(--f-ui, 'Barlow Condensed', sans-serif)", num="var(--f-num, 'Share Tech Mono', monospace)", acc='var(--jlu)', on='#fff',
                hook="get:function(){ return _adv==='adv'||_adv==='dis'?_adv:'none'; },\n"
                     "  set:function(m){ setAdv(m); }"),
}

CSS = '''<style id="utr-css">
/* Dice tray: the GM Screen's pool tray, identical on every d20 sheet.
   Pool readout / dice d2–d100 / ADV · DIS (Dragonbane: boons · banes) / × · Roll.
   Labels use the sheet's UI font role, dice and the pool readout its number role. */
.dice-tray.utr{display:flex;flex-direction:column;gap:6px;padding:10px;--utr-bg:rgba(255,255,255,.05);--utr-bd:rgba(255,255,255,.16);--utr-fg:#e4e0d8;--utr-mut:#8d8983;%(vars)s}
.utr-pool{font-family:var(--utr-num);font-size:13px;font-weight:700;color:var(--utr-acc);min-height:18px;line-height:18px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-variant-numeric:tabular-nums;}
.utr-pool .utr-empty{color:var(--utr-mut);font-family:var(--utr-ui);font-weight:400;letter-spacing:.04em;}
.utr-dice{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:3px;}
.utr-die{position:relative;min-width:0;padding:8px 0;background:var(--utr-bg);color:var(--utr-fg);border:1px solid var(--utr-bd);border-radius:5px;cursor:pointer;font-family:var(--utr-num);font-size:11px;font-weight:700;letter-spacing:-.02em;text-transform:none;line-height:1.1;overflow:visible;font-variant-numeric:tabular-nums;}
.utr-die[data-d="100"]{font-size:9.5px;letter-spacing:-.06em;}
.utr-die:hover{border-color:var(--utr-acc);}
.utr-die:active{transform:scale(.94);}
.utr-die.has{border-color:var(--utr-acc);color:var(--utr-acc);}
.utr-cnt{position:absolute;top:-6px;right:-5px;min-width:15px;height:15px;line-height:15px;padding:0 3px;box-sizing:border-box;border-radius:8px;background:var(--utr-acc);color:var(--utr-on);font-family:var(--utr-num);font-size:10px;font-weight:700;text-align:center;}
.utr-mode{display:grid;grid-template-columns:1fr 1fr;gap:4px;}
.utr-adv{padding:6px 4px;background:var(--utr-bg);color:var(--utr-mut);border:1px solid var(--utr-bd);border-radius:5px;cursor:pointer;font-family:var(--utr-ui);font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;line-height:1.2;}
.utr-adv:hover{color:var(--utr-fg);}
.utr-adv.on-adv{background:#1a3a1a;border-color:#2d7a2d;color:#6dbf6d;}
.utr-adv.on-dis{background:#3a1a1a;border-color:#7a2d2d;color:#df6a6a;}
.utr-bb{display:flex;align-items:stretch;border:1px solid var(--utr-bd);border-radius:5px;overflow:hidden;min-width:0;}
.utr-bb button{flex:0 0 26px;background:var(--utr-bg);color:var(--utr-fg);border:none;cursor:pointer;font-family:var(--utr-ui);font-size:15px;line-height:1;padding:0;}
.utr-bb button:hover{color:var(--utr-acc);background:rgba(255,255,255,.1);}
.utr-bbv{flex:1;min-width:0;display:flex;align-items:center;justify-content:center;text-align:center;font-family:var(--utr-ui);font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:6px 2px;line-height:1.2;white-space:nowrap;overflow:hidden;}
.utr-bb.boon .utr-bbv{color:#9fdcae;} .utr-bb.bane .utr-bbv{color:#ff9d8a;}
.utr-act{display:flex;gap:4px;}
.utr-x{flex:0 0 auto;width:34px;padding:0;background:transparent;color:var(--utr-mut);border:1px solid var(--utr-bd);border-radius:5px;cursor:pointer;font-family:var(--utr-ui);font-size:17px;line-height:1;}
.utr-x:hover{color:#df6a6a;border-color:#7a2d2d;}
.utr-roll{flex:1;display:flex;align-items:center;justify-content:center;gap:6px;padding:7px 10px;background:var(--utr-acc);color:var(--utr-on);border:none;border-radius:5px;cursor:pointer;font-family:var(--utr-ui);font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;line-height:1.2;}
.utr-roll:hover{filter:brightness(1.12);}
.utr-act-adv .utr-adv{flex:1 1 0;min-width:0;padding:6px 2px;letter-spacing:.04em;white-space:nowrap;}
.utr-act-adv .utr-roll{flex:1.35 1 0;min-width:0;padding:7px 6px;}
.utr-ico{display:inline-block;flex:0 0 auto;}
@media (max-width:768px){.utr-die{min-height:40px;font-size:13px;}.utr-die[data-d="100"]{font-size:11px;}.utr-adv,.utr-bbv{min-height:36px;}.utr-x,.utr-roll{min-height:40px;}}
</style>
'''

JS = r'''<script>
// ═══ DICE TRAY — the GM Screen's pool tray (same rows, same controls on every d20 sheet) ═══
// Tap a die to add it to the pool (right-click removes one). ADV / DIS go on the
// pool's first d20 and are the sheet's own Advantage switch; × clears; Roll throws
// the pool, logs it, and clears the tray (pool, ADV / DIS, boons / banes).
var UTR_HOOK = {
  %(hook)s
};
var UTray = (function(){
  var H = UTR_HOOK, pool = {}, own = 'none', L = H.letter || 'd';
  function R(n){ return 1 + Math.floor(Math.random() * n); }
  function $u(id){ return document.getElementById(id); }
  function getAdv(){ if(H.noAdv) return 'none'; try { if(H.get) return H.get(); } catch(e){} return own; }
  function putAdv(m){ own = m; if(H.set) try { H.set(m); } catch(e){} }
  function sides(){ return Object.keys(pool).map(Number).filter(function(d){ return pool[d] > 0; }).sort(function(a, b){ return a - b; }); }
  function label(){ return sides().map(function(d){ return pool[d] + L + d; }).join(' + '); }
  function render(){
    var el = $u('utr-pool'); if(el){ var t = label(); el.innerHTML = t ? '' : '<span class="utr-empty">Empty</span>'; if(t) el.textContent = t; }
    [].forEach.call(document.querySelectorAll('.utr-die'), function(b){
      var n = pool[b.dataset.d] || 0, c = b.querySelector('.utr-cnt');
      b.classList.toggle('has', n > 0);
      if(n){ if(!c){ c = document.createElement('span'); c.className = 'utr-cnt'; b.appendChild(c); } c.textContent = n; } else if(c) c.remove();
    });
    var m = getAdv(), a = $u('utr-adv'), d = $u('utr-dis');
    if(a) a.classList.toggle('on-adv', m === 'adv'); if(d) d.classList.toggle('on-dis', m === 'dis');
  }
  function add(d){ pool[d] = (pool[d] || 0) + 1; render(); }
  function sub(e, d){ if(e && e.preventDefault) e.preventDefault(); if(pool[d]) pool[d]--; render(); return false; }
  function adv(m){ putAdv(getAdv() === m ? 'none' : m); render(); }
  function clear(){ pool = {}; putAdv('none'); if(H.after) try { H.after(); } catch(e){} render(); }
  function roll(){
    var ds = sides(); if(!ds.length) return;
    if(H.pre && H.pre() === false) return;
    var m = getAdv(), parts = [], tot = 0, nat = null, count = 0, has20 = pool[20] > 0;
    var note = has20 && H.note ? H.note() : '';
    ds.forEach(function(d){ count += pool[d]; });
    ds.forEach(function(d){
      var n = pool[d];
      if(d === 20){
        var sp = H.d20 ? H.d20() : null;
        if(!sp && m !== 'none'){ var a = R(20), b = R(20), k = m === 'adv' ? Math.max(a, b) : Math.min(a, b); sp = { v: k, txt: L + '20(' + a + ',' + b + ' ' + (m === 'adv' ? '▲' : '▼') + ' ' + k + ')' }; }
        if(sp){ tot += sp.v; nat = sp.v; parts.push(sp.txt); n--; }
        if(!n) return;
      }
      var r = []; for(var i = 0; i < n; i++) r.push(R(d));
      r.forEach(function(v){ tot += v; }); if(d === 20 && nat === null) nat = r[0];
      parts.push(n + L + d + '(' + r.join(',') + ')');
    });
    var lone = count === 1 && ds[0] === 20, res = { type: 'normal' };
    if(lone) res = H.lone ? H.lone(nat) : { type: nat === 20 ? 'crit' : nat === 1 ? 'fumble' : 'normal' };
    var lbl = label();
    pool = {}; putAdv('none'); if(H.after) try { H.after(); } catch(e){} render();   // every roll clears the tray
    addLog('Dice Pool: ' + lbl, String(tot) + (res.word ? ' · ' + res.word : ''), parts.join(' + ') + ' = ' + tot + (note ? ' · ' + note : ''), res.type);
  }
  function init(){
    render();
    // The sheet's own rolls spend its Advantage switch: keep ADV / DIS in step.
    var lg = document.querySelector('.dice-tray.utr .utr-legacy');
    if(lg && window.MutationObserver) new MutationObserver(render).observe(lg, { attributes: true, subtree: true, attributeFilter: ['class'] });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  return { add: add, sub: sub, adv: adv, clear: clear, roll: roll, render: render };
})();
</script>
'''


def tray_bounds(s):
    i = s.index('<div class="dice-tray')
    depth = 0
    for m in re.finditer(r'<(/?)div\b[^>]*>', s[i:]):
        depth += -1 if m.group(1) else 1
        if depth == 0:
            return i, i + m.end()
    raise Exception('unbalanced tray')


def div_block(s, start):
    depth = 0
    for m in re.finditer(r'<(/?)div\b[^>]*>', s[start:]):
        depth += -1 if m.group(1) else 1
        if depth == 0:
            return start, start + m.end()
    raise Exception('unbalanced')


def tray_html(cfg, legacy):
    L = cfg.get('letter', 'd')
    h = ['<div class="dice-tray utr">',
         '    <div class="utr-pool" id="utr-pool"><span class="utr-empty">Empty</span></div>',
         '    <div class="utr-dice"' + ('' if len(cfg.get('dice', DICE)) == 8 else ' style="grid-template-columns:repeat(%d,minmax(0,1fr))"' % len(cfg.get('dice', DICE))) + '>' + ''.join(
             '<button type="button" class="utr-die" data-d="%d" onclick="UTray.add(%d)" oncontextmenu="return UTray.sub(event,%d)" title="Add a %s%d (right-click removes one)">%s%d</button>'
             % (d, d, d, L, d, L, d) for d in cfg.get('dice', DICE)) + '</div>']
    if cfg.get('bb'):
        bb = lambda k, tip: ('<span class="utr-bb %s" title="%s"><button type="button" onclick="trayBB(\'%s\',-1)" aria-label="One fewer %s">−</button>'
                             '<span class="utr-bbv" id="tray-%s">0 %ss</span><button type="button" onclick="trayBB(\'%s\',1)" aria-label="One more %s">+</button></span>') % (k, tip, k, k, k, k, k, k)
        h.insert(2, '    <div class="utr-mode">' + bb('boon', 'Boons on the next D20: roll an extra D20 and keep the lowest')
                 + bb('bane', 'Banes on the next D20: roll an extra D20 and keep the highest') + '</div>')
    # ADV / DIS sit in the action row, between × and Roll (no row of their own).
    mid = '' if (cfg.get('bb') or cfg.get('noadv')) else (
        '<button type="button" class="utr-adv" id="utr-adv" onclick="UTray.adv(\'adv\')" title="Advantage (d20)">▲ Adv</button>'
        '<button type="button" class="utr-adv" id="utr-dis" onclick="UTray.adv(\'dis\')" title="Disadvantage (d20)">▼ Dis</button>')
    h.append('    <div class="utr-act' + (' utr-act-adv' if mid else '') + '"><button type="button" class="utr-x" onclick="UTray.clear()" title="Clear" aria-label="Clear">×</button>'
             + mid + '<button type="button" class="utr-roll" onclick="UTray.roll()" title="Roll the pool">' + ICON + '<span>Roll</span></button></div>')
    if legacy.strip():
        h.append('    <div class="utr-legacy" hidden>' + legacy + '</div>')
    h.append('  </div>')
    return '\n'.join(h)


def legacy_of(sysn, s, i, j):
    """Old controls the sheet's code still reads (adv switches, inputs): kept hidden."""
    old = s[i:j]
    if 'class="dice-tray utr"' in old:
        m = re.search(r'<div class="utr-legacy" hidden>', old)
        if not m: return ''
        a, b = div_block(old, m.start())
        return old[m.end():b - len('</div>')]
    inner = old[old.index('>') + 1:-len('</div>')]
    m = re.search(r'<div class="gmt-legacy" hidden>', inner)
    if m:
        a, b = div_block(inner, m.start())
        inner = inner[m.end():b - len('</div>')]
    if sysn == 'db':   # the boons / banes counters move into the tray's mode row
        k = inner.index('id="tray-boon"'); a = inner.rindex('<div class="tray-row">', 0, k)
        a, b = div_block(inner, a); inner = inner[:a] + inner[b:]
    if 'id=' not in inner: return ''
    return inner.rstrip() + '\n    '


changed = []
for sysn, cfg in SHEETS.items():
    f = sysn + '_character_sheet.html'
    s = open(f, encoding='utf8').read()
    i, j = tray_bounds(s)
    s = s[:i] + tray_html(cfg, legacy_of(sysn, s, i, j)) + s[j:]
    # CSS (regenerate)
    s = re.sub(r'<style id="utr-css">.*?</style>\n', '', s, flags=re.S)
    vars_ = '--utr-ui:%s;--utr-num:%s;--utr-acc:%s;--utr-on:%s;' % (cfg['ui'], cfg['num'], cfg['acc'], cfg['on'])
    k = s.index('</head>'); s = s[:k] + CSS % {'vars': vars_} + s[k:]
    # JS (regenerate) — last thing before </body>, after every other script
    s = re.sub(r'<script>\n// ═══ DICE TRAY — the GM Screen\'s pool tray.*?</script>\n', '', s, flags=re.S)
    k = s.rindex('</body>'); s = s[:k] + JS % {'hook': cfg['hook']} + s[k:]
    open(f, 'w', encoding='utf8').write(s)
    changed.append(f)
    print(f, len(s.encode('utf8')))
