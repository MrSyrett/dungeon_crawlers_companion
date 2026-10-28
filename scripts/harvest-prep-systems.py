#!/usr/bin/env python3
"""One-time harvest: pull each Adventure Prep builder's system-specific parts out of
its current HTML into scripts/prep-systems/<sys>/ so make-session-builders.mjs can
regenerate every builder from tools/templates/_prep_template.html.

Run it only to (re)capture a builder that was edited by hand. It is idempotent: it
overwrites the config folder for each system it reads.

  python3 scripts/harvest-prep-systems.py [sys ...]
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
T = os.path.join(ROOT, 'tools', 'templates')
OUT = os.path.join(ROOT, 'scripts', 'prep-systems')

# cfg key -> (file, system code used by lib/tools.ts and the GM Screen, display name)
SYSTEMS = {
    'dcc':    ('dcc_session_prep_builder.html',    'DCC',   'Dungeon Crawler Carl'),
    'ace':    ('ace_session_prep_builder.html',    'ACE',   'ACE!'),
    'kob':    ('kob_session_prep_builder.html',    'KOB',   'Kids on Bikes'),
    'nimble': ('nimble_session_prep_builder.html', 'NIM',   'Nimble'),
    'sw':     ('sw_session_prep_builder.html',     'SW',    'Star Wars'),
    'dnd':    ('dnd_session_prep_builder.html',    'DND',   'D&D'),
    'd62e':   ('d62e_session_prep_builder.html',   'D62E',  'D6 System 2e'),
    'icrpg':  ('icrpg_session_prep_builder.html',  'ICRPG', 'Index Card RPG'),
    'co':     ('co_session_prep_builder.html',     'CO',    'Candela Obscura'),
    'yze':    ('yze_session_prep_builder.html',    'YZE',   'Alien RPG'),
    'mmrpg':  ('mmrpg_session_prep_builder.html',  'MMRPG', 'Marvel Multiverse RPG'),
    'jlu':    ('jlu_session_prep_builder.html',    'JLU',   'Justice League Unlimited'),
    'gb':     ('gb_session_prep_builder.html',     'GB',    'Ghostbusters'),
    'myz':    ('myz_session_prep_builder.html',    'MYZ',   'Mutant: Year Zero'),
    'vae':    ('vae_session_prep_builder.html',    'VAE',   'Vaesen'),
    'twd':    ('twd_session_prep_builder.html',    'TWD',   'The Walking Dead'),
}


def between(s, a, b, start=0):
    i = s.index(a, start) + len(a)
    j = s.index(b, i)
    return s[i:j]


def one(rx, s, flags=0):
    m = re.search(rx, s, flags)
    if not m:
        raise SystemExit('harvest: no match for ' + rx[:70])
    return m.group(1)


def harvest(cfg):
    file, code, name = SYSTEMS[cfg]
    s = open(os.path.join(T, file), encoding='utf8').read()
    meta = {
        'cfg': cfg, 'file': file, 'code': code, 'name': name,
        'title': one(r'<title>(.*?)</title>', s),
        'sessionKey': one(r"window\.__ddState\['(\w+)'\]", s),
        'lsKey': one(r"localStorage\.getItem\('(\w+)'\)", s),
        'chapterLabel': one(r'<label class="field-label">([^<]*)</label><input type="text" id="f-floor"', s),
        'chapterPh': one(r'id="f-floor" placeholder="([^"]*)"', s),
        'chapterUpper': one(r"setText\('p-floor',state\.floor\?'([^']*): '\+state\.floor", s),
        'titlePh': one(r'id="f-title" placeholder="([^"]*)"', s),
        'subtitlePh': one(r'id="f-subtitle" placeholder="([^"]*)"', s),
        'castTab': one(r"""onclick="switchTab\('monsters'\)">([^<]*)</button>""", s),
        'castHeading': one(r"""border-bottom-color:#1a4a8a;">([^<]*)</div></div>'\);""", s),
        'mobLabel': one(r'value="mob" [^>]*> ([^\n<]*)\n', s).strip(),
        'bossLabel': one(r'value="boss" [^>]*> ([^\n<]*)\n', s).strip(),
        'randomLabel': one(r'onclick="mobRandom\(\)">.*?</svg> ([^<]*)</button>', s),
        'sessionLabel': one(r'<label class="field-label">([^<]*)</label><input type="text" id="f-session"', s),
        'pickerComment': one(r'(<!-- Shared dungeon-map engine[^\n]*-->)\n<script src="/dungeon-engine.js">', s),
    }
    root_vars = between(s, '  :root {\n', '\n  }\n  body {')
    body_line_end = s.index('\n', s.index('\n  body {', s.index('  :root {')) + 1)
    css_extra = s[body_line_end:s.index('  /* SIDEBAR */', body_line_end)]
    data = between(s, '<script src="/dungeon-engine.js"></script>\n', '\n\n<script>\n')
    sb = between(s, '/* SB_CONFIG_START */\n', '\n/* SB_CONFIG_END */')
    if cfg != 'dcc':
        # The old generator replaced only up to _DCC_SIZE_NAMES, so every clone also
        # carried the DCC size table and dccMobToCard as dead code. Drop it.
        k = sb.find('\nconst _DCC_SIZE_NAMES')
        if k >= 0:
            sb = sb[:k]
    # Masthead title CSS: everything between the .page-banner rule and the
    # .adventure-subtitle rule (one line normally; D&D adds its @font-face here).
    pb = s.index('\n', s.index('\n  .page-banner {')+1)+1
    title_css = s[pb:s.index('  .adventure-subtitle {', pb)]
    # Homebrew monsters in the picker (DCC, D&D, D6 2e, ICRPG, Nimble each load their own type).
    if 'let _hbMobs = [];' in s and 'loadHomebrewMobs();\n' in s:
        i = s.index('let _hbMobs = [];'); homebrew = s[i:s.index('loadHomebrewMobs();\n', i) + len('loadHomebrewMobs();')]
    else:
        homebrew = 'let _hbMobs = [];'
    d = os.path.join(OUT, cfg)
    os.makedirs(d, exist_ok=True)
    open(os.path.join(d, 'meta.json'), 'w', encoding='utf8').write(json.dumps(meta, indent=2, ensure_ascii=False) + '\n')
    open(os.path.join(d, 'root-vars.css'), 'w', encoding='utf8').write(root_vars + '\n')
    open(os.path.join(d, 'extra.css'), 'w', encoding='utf8').write(css_extra.strip('\n') + ('\n' if css_extra.strip() else ''))
    open(os.path.join(d, 'data.html'), 'w', encoding='utf8').write(data.strip('\n') + '\n')
    open(os.path.join(d, 'sb-config.js'), 'w', encoding='utf8').write(sb.rstrip() + '\n')
    open(os.path.join(d, 'title.css'), 'w', encoding='utf8').write(title_css)
    open(os.path.join(d, 'homebrew.js'), 'w', encoding='utf8').write(homebrew + '\n')
    print('harvested', cfg)


if __name__ == '__main__':
    for c in (sys.argv[1:] or list(SYSTEMS)):
        harvest(c)
