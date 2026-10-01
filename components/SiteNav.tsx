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
import { compendiumFor, systemForPath, TOOLS_NAV } from "./navConfig";
import { logout } from "@/app/actions/auth";

// The single site-wide top navbar.
//
//   [logo] [System ▾]   Characters · Adventures · Compendium ▾        Tools · [account ▾]
//
// System selection is client state (systemStore, localStorage) shared with the
// dashboard; the Characters/Adventures tabs drive the dashboard's view store.
// Compendium is a per-system dropdown of that system's reference pages (+ the
// Rulebooks shelf). Tools sit on the right. The bar hides itself on the auth
// screens, and the layout only mounts it for signed-in users.

type Menu = "system" | "compendium" | "tools" | "account" | "mobile" | null;

const HIDDEN_ON = ["/login", "/signup", "/forgot-password", "/reset-password"];

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

  // Persist the effective system so every reader (dashboard, other tabs) agrees:
  // land on /dcc/classes and the dropdown — and the dashboard — follow to DCC.
  useEffect(() => {
    if (effective !== storedSystem) setSystem(effective);
  }, [effective, storedSystem]);

  // Close any open menu on navigation.
  useEffect(() => { setMenu(null); }, [pathname]);

  if (HIDDEN_ON.includes(pathname)) return null;

  const sys = list.find((s) => s.key === effective) ?? list[0];
  const onDashboard = pathname === "/dashboard";
  const compendium = compendiumFor(effective);

  function chooseSystem(key: SystemKey) {
    setSystem(key);
    setMenu(null);
  }
  function openTab(v: "characters" | "adventures") {
    setView(v);
    setMenu(null);
    if (!onDashboard) router.push("/dashboard");
  }

  const tabBase = "rounded px-3 py-2 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors";
  const tabOn = "bg-[var(--panel-2)] text-[var(--text)]";
  const tabOff = "text-[var(--muted)] hover:text-[var(--text)]";

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--panel)]">
      {/* Click-away backdrop for any open dropdown. */}
      {menu ? <button aria-hidden="true" tabIndex={-1} className="fixed inset-0 z-0 cursor-default" onClick={() => setMenu(null)} /> : null}

      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center gap-2 px-3 py-2 sm:gap-3 sm:px-5">
        {/* Logo → home */}
        <Link href="/dashboard" className="flex shrink-0 items-center gap-2" title="Dungeon Crawler's Companion">
          <Image src="/logo-white.png" alt="" width={36} height={36} priority className="h-8 w-8" />
          <span className="hidden font-display text-sm font-black tracking-wide lg:inline">DCC</span>
        </Link>

        {/* System selector */}
        <div className="relative shrink-0">
          <button
            onClick={() => setMenu(menu === "system" ? null : "system")}
            aria-haspopup="true"
            aria-expanded={menu === "system"}
            className="flex items-center gap-1.5 rounded border border-[var(--border)] bg-[var(--panel-2)] px-2.5 py-2 text-[12px] font-bold uppercase tracking-[0.1em] sm:px-3"
            style={{ color: sys.accent }}
          >
            <span className="hidden sm:inline">{sys.name}</span>
            <span className="sm:hidden">{sys.short}</span>
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

        {/* System page tabs (desktop) */}
        <div className="hidden items-center gap-1 md:flex">
          <button className={`${tabBase} ${onDashboard && view === "characters" ? tabOn : tabOff}`} onClick={() => openTab("characters")}>
            Characters
          </button>
          <button className={`${tabBase} ${onDashboard && view === "adventures" ? tabOn : tabOff}`} onClick={() => openTab("adventures")}>
            Adventures
          </button>
          <div className="relative">
            <button
              onClick={() => setMenu(menu === "compendium" ? null : "compendium")}
              aria-haspopup="true"
              aria-expanded={menu === "compendium"}
              className={`${tabBase} ${tabOff} flex items-center gap-1`}
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
        </div>

        {/* Right side: Tools + account (desktop) */}
        <div className="ml-auto hidden items-center gap-1 md:flex">
          <div className="relative">
            <button
              onClick={() => setMenu(menu === "tools" ? null : "tools")}
              aria-haspopup="true"
              aria-expanded={menu === "tools"}
              className={`${tabBase} ${tabOff} flex items-center gap-1`}
            >
              Tools <Caret />
            </button>
            {menu === "tools" ? (
              <div className="absolute right-0 top-full mt-1 w-52 rounded-lg border border-[var(--border)] bg-[var(--panel)] p-1 shadow-xl">
                {TOOLS_NAV.map((t) => (
                  <a
                    key={t.href}
                    href={t.href}
                    onClick={() => setMenu(null)}
                    className="block rounded px-3 py-2 text-[13px] font-semibold text-[var(--muted)] transition-colors hover:bg-[var(--panel-2)] hover:text-[var(--text)]"
                  >
                    {t.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div className="relative">
            <button
              onClick={() => setMenu(menu === "account" ? null : "account")}
              aria-haspopup="true"
              aria-expanded={menu === "account"}
              className={`${tabBase} ${tabOff} flex items-center gap-1`}
            >
              Account <Caret />
            </button>
            {menu === "account" ? (
              <div className="absolute right-0 top-full mt-1 w-60 rounded-lg border border-[var(--border)] bg-[var(--panel)] p-2 shadow-xl">
                <p className="truncate px-2 pb-2 text-[12px] text-[var(--muted)]" title={email}>{email}</p>
                {isAdmin ? (
                  <Link href="/admin/users" onClick={() => setMenu(null)} className="block rounded px-3 py-2 text-[13px] font-semibold text-[var(--gold)] transition-colors hover:bg-[var(--panel-2)]">
                    Admin
                  </Link>
                ) : null}
                <Link href="/account" onClick={() => setMenu(null)} className="block rounded px-3 py-2 text-[13px] font-semibold text-[var(--muted)] transition-colors hover:bg-[var(--panel-2)] hover:text-[var(--text)]">
                  Account
                </Link>
                <form action={logout}>
                  <button className="mt-1 block w-full rounded px-3 py-2 text-left text-[13px] font-semibold text-[var(--muted)] transition-colors hover:bg-[var(--panel-2)] hover:text-[var(--text)]">
                    Sign out
                  </button>
                </form>
              </div>
            ) : null}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenu(menu === "mobile" ? null : "mobile")}
          aria-label="Menu"
          aria-expanded={menu === "mobile"}
          className="ml-auto flex items-center rounded border border-[var(--border)] bg-[var(--panel-2)] p-2 md:hidden"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      {menu === "mobile" ? (
        <div className="relative z-10 border-t border-[var(--border)] bg-[var(--panel)] px-3 py-3 md:hidden">
          <div className="flex gap-2">
            <button className={`${tabBase} flex-1 ${onDashboard && view === "characters" ? tabOn : tabOff} border border-[var(--border)]`} onClick={() => openTab("characters")}>Characters</button>
            <button className={`${tabBase} flex-1 ${onDashboard && view === "adventures" ? tabOn : tabOff} border border-[var(--border)]`} onClick={() => openTab("adventures")}>Adventures</button>
          </div>

          <p className="mt-3 px-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">Compendium</p>
          <div className="mt-1 grid grid-cols-2 gap-1">
            {compendium.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMenu(null)} className="rounded border border-[var(--border)] px-3 py-2 text-[12px] font-semibold text-[var(--muted)] hover:text-[var(--text)]">
                {l.label}
              </Link>
            ))}
          </div>

          <p className="mt-3 px-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">Tools</p>
          <div className="mt-1 grid grid-cols-2 gap-1">
            {TOOLS_NAV.map((t) => (
              <a key={t.href} href={t.href} onClick={() => setMenu(null)} className="rounded border border-[var(--border)] px-3 py-2 text-[12px] font-semibold text-[var(--muted)] hover:text-[var(--text)]">
                {t.label}
              </a>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between gap-2 border-t border-[var(--border)] pt-3">
            <span className="truncate text-[12px] text-[var(--muted)]">{email}</span>
            <div className="flex shrink-0 items-center gap-2">
              {isAdmin ? <Link href="/admin/users" onClick={() => setMenu(null)} className="rounded border border-[var(--gold)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--gold)]">Admin</Link> : null}
              <form action={logout}>
                <button className="rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] hover:border-[var(--muted)]">Sign out</button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
