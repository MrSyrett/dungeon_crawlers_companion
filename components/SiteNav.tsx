"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  SYSTEMS,
  setSystem,
  subscribeSystem,
  getSystemSnapshot,
  getSystemServerSnapshot,
  subscribeView,
  setView,
  getViewSnapshot,
  getViewServerSnapshot,
  type SystemKey,
} from "./systemStore";
import {
  compendiumFor,
  homebrewFor,
  systemForPath,
  compendiumCounterpart,
  STAY_ON_SWITCH,
  TOOLS_NAV,
} from "./navConfig";

// The single site-wide top navbar.
//
//   [logo] [System ▾]  Characters · Adventures · Compendium ▾ · Homebrew ·
//                      OBR · Token Maker · Map Maker · Campaigns · GM Screen
//                                                            … [Admin] [account]
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

// Surfaces that belong to the APP rather than to one game: the campaign list,
// the Owlbear (OBR) page, the Token Maker and every admin screen. These keep
// the standard look — no system ground, no system faces — the same way the
// navbar does. Marked with data-chrome on <html>; app/globals.css skips its
// theme blocks whenever that's set. (The GM Screen and the Map Maker are
// standalone documents, not Next pages, so they never see those rules.)
const CHROME_PREFIXES = ["/campaigns", "/vtt", "/admin", "/token-maker", "/account"];

function isChromePath(pathname: string): boolean {
  return CHROME_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

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
}: {
  email: string;
  isAdmin: boolean;
  hiddenKeys?: SystemKey[];
}) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const storedSystem = useSyncExternalStore(subscribeSystem, getSystemSnapshot, getSystemServerSnapshot);
  const view = useSyncExternalStore(subscribeView, getViewSnapshot, getViewServerSnapshot);
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

  // Measured, not guessed: with Geist (not condensed, as Barlow Condensed was)
  // nine uppercase links plus the logo, the full-name system chip and the
  // account icon come to 1119px at "Justice League Unlimited" — so the row is
  // gated at 1152px rather than lg/1024, and any more size, padding or
  // tracking pushes it past that too. A system name longer than that one is
  // what would wrap it next.
  const item = "rounded px-1.5 py-1.5 text-[11px] font-semibold uppercase transition-colors";
  const on = "bg-[var(--panel-2)] text-[var(--text)]";
  const off = "text-[var(--muted)] hover:text-[var(--text)]";

  return (
    <nav className="dcc-chrome sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--panel)]">
      {menu ? <button aria-hidden="true" tabIndex={-1} className="fixed inset-0 z-0 cursor-default" onClick={() => setMenu(null)} /> : null}

      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center gap-x-1.5 gap-y-1 px-3 py-2 sm:px-5">
        {/* Mobile hamburger — left of the logo, reveals the nav links panel */}
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

        {/* Logo → home */}
        {/* The mark alone — no wordmark. The title attribute carries the name
            for anyone who hovers, and the alt text for screen readers. */}
        <Link href="/dashboard" className="flex shrink-0 items-center" title="Dungeon Crawler's Companion">
          <Image src="/logo-white.png" alt="Dungeon Crawler's Companion — home" width={36} height={36} priority className="h-8 w-8" />
        </Link>

        {/* System selector */}
        <div className="relative shrink-0">
          <button
            onClick={() => setMenu(menu === "system" ? null : "system")}
            aria-haspopup="true"
            aria-expanded={menu === "system"}
            className="flex items-center gap-1 rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 py-1.5 text-[11px] font-bold uppercase tracking-[0.03em]"
            style={{ color: sys.accent }}
          >
            <span>{sys.name}</span>
            <Caret />
          </button>
          {menu === "system" ? (
            <div className="absolute left-0 top-full mt-1 max-h-[70vh] w-56 overflow-auto rounded-lg border border-[var(--border)] bg-[var(--panel)] p-1 shadow-xl">
              {list.map((s) => (
                <button
                  key={s.key}
                  onClick={() => chooseSystem(s.key)}
                  className={`block w-full rounded px-3 py-2 text-left text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors hover:bg-[var(--panel-2)] ${s.key === effective ? "bg-[var(--panel-2)]" : "text-[var(--muted)]"}`}
                  style={s.key === effective ? { color: s.accent } : undefined}
                >
                  {s.name}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {/* Left nav group (desktop): tabs + Compendium + Homebrew + Tools */}
        <div className="hidden min-w-0 flex-wrap items-center gap-px min-[1152px]:flex">
          <button className={`${item} ${onDashboard && view === "characters" ? on : off}`} onClick={() => openTab("characters")}>
            Characters
          </button>
          <button className={`${item} ${onDashboard && view === "adventures" ? on : off}`} onClick={() => openTab("adventures")}>
            Adventures
          </button>

          <div className="relative">
            <button
              onClick={() => setMenu(menu === "compendium" ? null : "compendium")}
              aria-haspopup="true"
              aria-expanded={menu === "compendium"}
              className={`${item} ${off} flex items-center gap-1`}
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

          {homebrewHref ? (
            <Link href={homebrewHref} className={`${item} ${pathname === homebrewHref ? on : off}`}>
              Homebrew
            </Link>
          ) : null}

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

        {/* Account block — an icon the size of the hamburger, linking to
            /account, which owns the theme preference, the password form and
            sign-out. The email it used to print is on the page itself and in
            this control's tooltip; printing it here cost up to 190px of a row
            that has nine links to fit. */}
        <div className="ml-auto flex shrink-0 items-center gap-2">
          {isAdmin ? (
            <Link href="/admin/users" className="rounded border border-[var(--accent)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--accent)] hover:bg-[var(--panel-2)]">
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
          <div className="flex gap-2">
            <button className={`${item} flex-1 ${onDashboard && view === "characters" ? on : off} border border-[var(--border)]`} onClick={() => openTab("characters")}>Characters</button>
            <button className={`${item} flex-1 ${onDashboard && view === "adventures" ? on : off} border border-[var(--border)]`} onClick={() => openTab("adventures")}>Adventures</button>
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
