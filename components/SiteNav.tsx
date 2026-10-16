"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  SYSTEMS,
  setSystem,
  subscribeSystem,
  getSystemSnapshot,
  serverSystem,
  subscribeView,
  setView,
  getViewSnapshot,
  serverView,
  type SystemKey,
  type DashView,
} from "./systemStore";
import {
  CHROME_PREFIXES,
  compendiumFor,
  homebrewFor,
  systemForPath,
  compendiumCounterpart,
  STAY_ON_SWITCH,
  TOOLS_NAV,
  CAMPAIGNS_LINK,
} from "./navConfig";

// The single site-wide top navbar.
//
//   [logo] Game Title   Games ▾ · Characters · Adventures · Campaigns ·   [Admin] [account]
//                       Compendium ▾ · Homebrew · <tools>
//   └── left zone ──┘   └────────── centred, fixed ──────────┘   └── right zone ──┘
//
// The selected game's name sits beside the logo in that game's own face and
// colour (.nav-sys-title in app/globals.css, the same identity tokens as the
// home page's game tiles); "Games" — styled like every other nav item — opens
// the list of games to switch to.
//
// System selection is client state (systemStore, localStorage) shared with the
// dashboard; the Characters/Adventures tabs drive the dashboard's view store.
// Compendium is a per-system dropdown of that system's reference pages (+ the
// Rulebooks shelf); Homebrew links to that system's homebrew hub. Tools are
// plain left-aligned links. The account block sits on the right (name, with
// Admin · Sign out beneath). The bar hides itself on the auth screens, and the
// layout only mounts it for signed-in users.

type Menu = "system" | "compendium" | "mobile" | null;

const HIDDEN_ON = ["/login", "/signup", "/forgot-password", "/reset-password"];

// Surfaces that belong to the APP rather than to one game: the Token Maker, your
// account and every admin screen. These keep the standard look — no system
// ground, no system faces — the same way the navbar does.
// Marked with data-chrome on <html>; app/globals.css skips its theme blocks
// whenever that's set. (The GM Screen and the Map Maker are standalone
// documents, not Next pages, so they never see those rules.)
//
// /vtt was here for the Owlbear setup page. That page is gone — its contents are
// the Owlbear Rodeo section of /account, which is already covered below — and
// nothing under /vtt is a page any more, only route handlers the extension calls
// and static assets, neither of which renders this navbar.
//
// /campaigns is deliberately NOT here. Campaigns are per-system now — the page
// shows one system's campaigns and is created in that system — so it wears that
// system's ground, faces and colours like the dashboard and the compendium do.
// (The list itself lives in navConfig.ts so the root layout's pre-paint theme
// script — a server component — can read it; a value exported from this
// "use client" module would reach the server as a client reference, not a list.)

// The home page is chrome too, but it CANNOT go in the list above: "/" is a prefix
// of every path, so `pathname.startsWith("/" + "/")` is a near miss away from
// matching the whole site. Matched exactly instead.
function isChromePath(pathname: string): boolean {
  if (pathname === "/") return true;
  return CHROME_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

// Two-colour wordmarks, as on the home page's game tiles (NAME_PARTS in
// components/HomeSystems.tsx): the parts must spell the system's name exactly.
const NAME_PARTS: Partial<Record<SystemKey, [string, string]>> = {
  DCC: ["Dungeon", "Crawler Carl"],
};

// useLayoutEffect warns during server rendering; this runs it only in the browser.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function Caret() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" className="shrink-0">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SiteNav({
  email,
  isAdmin,
  hiddenKeys = [],
  initialSystem,
  initialView,
}: {
  email: string;
  isAdmin: boolean;
  hiddenKeys?: SystemKey[];
  // What the server rendered (the cookie the store mirrors), so the system chip
  // and the Characters/Adventures tabs hydrate right instead of as Shadowdark.
  initialSystem?: SystemKey;
  initialView?: DashView;
}) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const storedSystem = useSyncExternalStore(subscribeSystem, getSystemSnapshot, serverSystem(initialSystem));
  const view = useSyncExternalStore(subscribeView, getViewSnapshot, serverView(initialView));
  const [menu, setMenu] = useState<Menu>(null);

  const hidden = new Set(hiddenKeys);
  const visible = SYSTEMS.filter((s) => !hidden.has(s.key));
  const list = visible.length ? visible : SYSTEMS;

  // If the URL points at a specific system's compendium page, that system wins
  // for display; otherwise use the stored choice, clamped to a visible system.
  const pathSystem = systemForPath(pathname);
  const storedVisible = list.some((s) => s.key === storedSystem);
  const effective: SystemKey = pathSystem && list.some((s) => s.key === pathSystem)
    ? pathSystem
    : storedVisible
      ? storedSystem
      : list[0].key;

  // `effective` is display-only (so the dropdown reflects the compendium page
  // you're on). We deliberately DON'T force the stored system to match the
  // path — that made picking a different system on a compendium page snap
  // straight back. Switching systems is an explicit choice (chooseSystem),
  // which jumps to that system's Characters page.

  // Close any open menu on navigation.
  useEffect(() => { setMenu(null); }, [pathname]);

  const sys = list.find((s) => s.key === effective) ?? list[0];

  // Fit the game's title to its zone. First on ONE line, stepping down from the
  // stylesheet's size to a readable floor; a name still too long then wraps to
  // TWO lines (.is-wrap) starting from a size whose two lines fit the bar's
  // height, so the bar never grows. Re-run when the game or the window changes.
  const titleRef = useRef<HTMLSpanElement>(null);
  useIsoLayoutEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const over = (size: number) =>
      el.scrollWidth > el.clientWidth ||
      // Display faces draw outside their line box; only a real third line counts.
      el.scrollHeight > el.clientHeight + size * 0.45;
    const fit = () => {
      el.classList.remove("is-wrap");
      el.style.fontSize = "";
      let size = parseFloat(getComputedStyle(el).fontSize) || 18;
      const floor = 14;
      let guard = 0;
      while (over(size) && size > floor && guard++ < 40) { size -= 0.5; el.style.fontSize = size + "px"; }
      if (!over(size)) return;
      el.classList.add("is-wrap");
      size = 15;
      el.style.fontSize = size + "px";
      guard = 0;
      while (over(size) && size > 10 && guard++ < 40) { size -= 0.5; el.style.fontSize = size + "px"; }
    };
    fit();
    let raf = 0;
    const onResize = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(fit); };
    window.addEventListener("resize", onResize);
    // Web fonts arriving late change the width — refit whenever one lands (the
    // game's display face is often fetched only once this title asks for it).
    const fonts = typeof document !== "undefined" ? document.fonts : undefined;
    try { fonts?.ready.then(fit); fonts?.addEventListener("loadingdone", onResize); } catch { /* no font loading API */ }
    return () => {
      window.removeEventListener("resize", onResize);
      try { fonts?.removeEventListener("loadingdone", onResize); } catch { /* ignore */ }
      cancelAnimationFrame(raf);
    };
  }, [sys.key]);

  // The selected system "dresses" the whole app: publish its accent as --sys on
  // <html> (plus data-system) so any page — dashboard heading, spinner, chips,
  // hover states — can tint itself with var(--sys) and follow the switch live.
  // Uses the *display* system, so a compendium page wears its own system's color.
  // On the app's own surfaces (Campaigns, OBR, Token Maker, admin) we still
  // publish the accent — the chips and buttons there use it — but flag the
  // page as chrome so the system's ground and faces stay out of it.
  const chrome = isChromePath(pathname);
  useEffect(() => {
    try {
      const root = document.documentElement;
      root.style.setProperty("--sys", sys.accent);
      root.dataset.system = sys.key;
      if (chrome) root.dataset.chrome = "1";
      else delete root.dataset.chrome;
    } catch {
      /* non-browser */
    }
  }, [sys.accent, sys.key, chrome]);

  if (HIDDEN_ON.includes(pathname)) return null;

  const onDashboard = pathname === "/dashboard";
  const compendium = compendiumFor(effective);
  const homebrewHref = homebrewFor(effective);

  function chooseSystem(key: SystemKey) {
    setSystem(key);
    setMenu(null);
    // Stay where it makes sense to stay:
    //  • a system-agnostic shelf (the Rulebooks page filters itself) → stay put;
    //  • a homebrew hub → that system's hub;
    //  • a compendium page → the new system's matching page (Classes → Classes);
    //  • the dashboard itself → stay, keeping the list you were looking at;
    //  • anywhere else → that system's Characters list on the dashboard.
    if (STAY_ON_SWITCH.has(pathname)) return;
    const curHub = homebrewFor(effective);
    if (curHub && pathname === curHub) {
      const nextHub = homebrewFor(key);
      router.push(nextHub ?? "/dashboard");
      return;
    }
    const counterpart = compendiumCounterpart(pathname, key);
    if (counterpart) { router.push(counterpart); return; }
    // ALREADY ON THE DASHBOARD: switch the system and leave the view alone. This
    // used to fall through to setView("characters"), so switching system while
    // looking at the Adventures list silently threw you back to Characters.
    if (onDashboard) return;
    setView("characters");
    router.push("/dashboard");
  }
  function openTab(v: "characters" | "adventures") {
    // From a compendium page the bar shows THAT page's system; clicking
    // Characters/Adventures should take you to that system's lists, not snap
    // the label back to whatever was stored.
    if (pathSystem && pathSystem !== storedSystem) setSystem(effective);
    setView(v);
    setMenu(null);
    if (!onDashboard) router.push("/dashboard");
  }

  // THREE FIXED ZONES at desktop width (≥1152px): logo + game title on the left,
  // the nav buttons centred, Admin + account on the right. A CSS grid with two
  // equal 1fr side columns keeps the middle group exactly centred whatever the
  // title's width, so the buttons never move when the game changes. Homebrew is
  // always present for the same reason (dimmed for a game that has no hub).
  // The title shrinks to fit its zone (fitTitle below) rather than pushing on
  // the buttons. Below 1152px the buttons live in the ☰ panel.
  const item = "rounded px-1.5 py-1.5 text-[11px] font-semibold uppercase transition-colors";
  const on = "bg-[var(--panel-2)] text-[var(--text)]";
  const off = "text-[var(--muted)] hover:text-[var(--text)]";

  return (
    <nav className="dcc-chrome sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--panel)]">
      {menu ? <button aria-hidden="true" tabIndex={-1} className="fixed inset-0 z-0 cursor-default" onClick={() => setMenu(null)} /> : null}

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] items-center gap-x-1.5 px-3 py-2 sm:px-5 min-[1152px]:grid min-[1152px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] min-[1152px]:gap-x-4">
        {/* LEFT: hamburger (narrow only), logo, the game's title */}
        <div className="flex min-w-0 flex-1 items-center gap-x-1.5 min-[1152px]:gap-x-2.5">
          <button
            onClick={() => setMenu(menu === "mobile" ? null : "mobile")}
            aria-label="Menu"
            aria-expanded={menu === "mobile"}
            className="flex shrink-0 items-center rounded border border-[var(--border)] bg-[var(--panel-2)] p-2 min-[1152px]:hidden"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          </button>

          {/* The mark alone — the title beside it names the game. */}
          <Link href="/" className="flex shrink-0 items-center" title="Dungeon Crawler's Companion">
            <Image src="/logo-white.png" alt="Dungeon Crawler's Companion — home" width={36} height={36} priority className="h-8 w-8" />
          </Link>

          {/* The selected game's title, in its own face and colour → its dashboard */}
          <Link
            href="/dashboard"
            onClick={() => { if (pathSystem && pathSystem !== storedSystem) setSystem(effective); }}
            className="flex min-w-0 flex-1 items-center"
            title={`${sys.name} — characters and adventures`}
          >
            <span ref={titleRef} data-sys={sys.key} className="nav-sys-title">
              {NAME_PARTS[sys.key] ? (
                <>
                  <span className="tn-1">{NAME_PARTS[sys.key]![0]}</span>{" "}
                  <span className="tn-2">{NAME_PARTS[sys.key]![1]}</span>
                </>
              ) : (
                sys.name
              )}
            </span>
          </Link>
        </div>

        {/* CENTRE (desktop): Games ▾ + the nav buttons, a fixed set in a fixed order */}
        <div className="hidden items-center gap-px min-[1152px]:flex">
          <div className="relative">
            <button
              onClick={() => setMenu(menu === "system" ? null : "system")}
              aria-haspopup="true"
              aria-expanded={menu === "system"}
              className={`${item} ${menu === "system" ? on : off} flex items-center gap-1`}
            >
              Games <Caret />
            </button>
            {menu === "system" ? (
              <div className="absolute left-0 top-full mt-1 max-h-[70vh] w-56 overflow-auto rounded-lg border border-[var(--border)] bg-[var(--panel)] p-1 shadow-xl">
                {list.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => chooseSystem(s.key)}
                    aria-current={s.key === effective ? "true" : undefined}
                    className={`block w-full rounded px-3 py-2 text-left text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors hover:bg-[var(--panel-2)] ${s.key === effective ? "bg-[var(--panel-2)]" : "text-[var(--muted)]"}`}
                    style={s.key === effective ? { color: s.accent } : undefined}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <button className={`${item} ${onDashboard && view === "characters" ? on : off}`} onClick={() => openTab("characters")}>
            Characters
          </button>
          <button className={`${item} ${onDashboard && view === "adventures" ? on : off}`} onClick={() => openTab("adventures")}>
            Adventures
          </button>
          {/* Per-system, like the two tabs above it — not a Tool. It is a real route
              rather than a dashboard view, hence a Link among the buttons. */}
          <Link href={CAMPAIGNS_LINK.href} className={`${item} ${pathname === CAMPAIGNS_LINK.href ? on : off}`}>
            {CAMPAIGNS_LINK.label}
          </Link>

          <div className="relative">
            <button
              onClick={() => setMenu(menu === "compendium" ? null : "compendium")}
              aria-haspopup="true"
              aria-expanded={menu === "compendium"}
              className={`${item} ${menu === "compendium" ? on : off} flex items-center gap-1`}
            >
              Compendium <Caret />
            </button>
            {menu === "compendium" ? (
              <div className="absolute left-0 top-full mt-1 w-56 rounded-lg border border-[var(--border)] bg-[var(--panel)] p-1 shadow-xl">
                {compendium.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenu(null)}
                    className="block rounded px-3 py-2 text-[13px] font-semibold text-[var(--muted)] transition-colors hover:bg-[var(--panel-2)] hover:text-[var(--text)]"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {/* Always in the row so nothing shifts; a game with no hub shows it dimmed. */}
          {homebrewHref ? (
            <Link href={homebrewHref} className={`${item} ${pathname === homebrewHref ? on : off}`}>
              Homebrew
            </Link>
          ) : (
            <span aria-disabled="true" title={`No homebrew hub for ${sys.name} yet`} className={`${item} cursor-default text-[var(--muted)] opacity-40`}>
              Homebrew
            </span>
          )}

          {/* Tools — individual links, always the same. Route-handler tools
              (`hard`) are plain <a>; Next pages get <Link> so they navigate
              client-side instead of a full white-flash reload. */}
          {TOOLS_NAV.map((t) =>
            t.hard ? (
              <a key={t.href} href={t.href} className={`${item} ${pathname === t.href ? on : off}`}>
                {t.label}
              </a>
            ) : (
              <Link key={t.href} href={t.href} className={`${item} ${pathname === t.href ? on : off}`}>
                {t.label}
              </Link>
            ),
          )}
        </div>

        {/* RIGHT: Admin + account. The account icon links to /account, which owns
            the theme preference, the password form and sign-out. */}
        <div className="flex shrink-0 items-center justify-end gap-2">
          {isAdmin ? (
            <Link href="/admin/users" className="hidden rounded border border-[var(--accent)] px-2.5 py-1 text-[10px] sm:inline-block font-semibold uppercase tracking-[0.06em] text-[var(--accent)] hover:bg-[var(--panel-2)]">
              Admin
            </Link>
          ) : null}
          <Link
            href="/account"
            title={`${email} — account settings`}
            aria-label={`Account settings for ${email}`}
            className={`flex shrink-0 items-center rounded border p-2 transition-colors ${
              pathname === "/account"
                ? "border-[var(--accent)] text-[var(--accent)]"
                : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)]"
            }`}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M4.5 20a7.5 7.5 0 0 1 15 0" strokeLinecap="round" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Mobile panel */}
      {menu === "mobile" ? (
        <div className="relative z-10 border-t border-[var(--border)] bg-[var(--panel)] px-3 py-3 min-[1152px]:hidden">
          {/* At phone width the Admin button lives here, so the bar has room for the game's title. */}
          {isAdmin ? (
            <Link href="/admin/users" onClick={() => setMenu(null)} className="mb-2 block rounded border border-[var(--accent)] px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--accent)] sm:hidden">
              Admin
            </Link>
          ) : null}
          {/* Games — on a narrow screen the system switcher is the home page's
              Choose a Game section (the tiles), so this jumps there. */}
          <Link
            href="/#home-systems"
            onClick={() => setMenu(null)}
            className={`${item} mb-3 block border border-[var(--border)] text-center ${off}`}
          >
            Games
          </Link>
          <div className="flex gap-2">
            <button className={`${item} flex-1 ${onDashboard && view === "characters" ? on : off} border border-[var(--border)]`} onClick={() => openTab("characters")}>Characters</button>
            <button className={`${item} flex-1 ${onDashboard && view === "adventures" ? on : off} border border-[var(--border)]`} onClick={() => openTab("adventures")}>Adventures</button>
            <Link href={CAMPAIGNS_LINK.href} onClick={() => setMenu(null)} className={`${item} flex-1 ${pathname === CAMPAIGNS_LINK.href ? on : off} border border-[var(--border)] text-center`}>{CAMPAIGNS_LINK.label}</Link>
          </div>

          <p className="mt-3 px-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">Compendium</p>
          <div className="mt-1 grid grid-cols-2 gap-1">
            {compendium.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMenu(null)} className="rounded border border-[var(--border)] px-3 py-2 text-[12px] font-semibold text-[var(--muted)] hover:text-[var(--text)]">
                {l.label}
              </Link>
            ))}
            {homebrewHref ? (
              <Link href={homebrewHref} onClick={() => setMenu(null)} className="rounded border border-[var(--border)] px-3 py-2 text-[12px] font-semibold text-[var(--muted)] hover:text-[var(--text)]">
                Homebrew
              </Link>
            ) : null}
          </div>

          <p className="mt-3 px-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">Tools</p>
          <div className="mt-1 grid grid-cols-2 gap-1">
            {TOOLS_NAV.map((t) => {
              const cls = "rounded border border-[var(--border)] px-3 py-2 text-[12px] font-semibold text-[var(--muted)] hover:text-[var(--text)]";
              return t.hard ? (
                <a key={t.href} href={t.href} onClick={() => setMenu(null)} className={cls}>{t.label}</a>
              ) : (
                <Link key={t.href} href={t.href} onClick={() => setMenu(null)} className={cls}>{t.label}</Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
