"use client";

// Mobile pull-to-refresh for the app's content pages (dashboard, reference pages,
// campaigns, option pages). Mounted once in the root layout. When you drag down
// while already scrolled to the very top, it shows a spinner and does a SOFT
// refresh (router.refresh() re-runs the server components — no full reload), so
// the page re-pulls its data without losing scroll or flashing white.
//
// It only takes over the gesture while genuinely pulling down at the top, so
// normal scrolling is untouched. It's a touch-only enhancement — no effect with
// a mouse. The interactive tools (GM Screen, sheets, Adventure Prep builders)
// are served as their own HTML documents and never mount this, by design.

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const THRESHOLD = 70; // px of pull needed to trigger a refresh
const MAX_PULL = 130; // px cap on how far the indicator travels
const RESIST = 0.5; // drag-distance → travel damping (rubber-band feel)

export default function PullToRefresh() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pull, setPull] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const pullRef = useRef(0);
  const busyRef = useRef(false);
  const gesture = useRef({ startY: 0, active: false, pulling: false });

  const setPullBoth = (v: number) => {
    pullRef.current = v;
    setPull(v);
  };

  useEffect(() => {
    busyRef.current = refreshing;
  }, [refreshing]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const touchCapable =
      "ontouchstart" in window || (navigator.maxTouchPoints ?? 0) > 0;
    if (!touchCapable) return;

    const atTop = () =>
      (window.scrollY || document.documentElement.scrollTop || 0) <= 0;

    const onStart = (e: TouchEvent) => {
      const g = gesture.current;
      if (busyRef.current || e.touches.length !== 1 || !atTop()) {
        g.active = false;
        return;
      }
      g.startY = e.touches[0].clientY;
      g.active = true;
      g.pulling = false;
    };

    const onMove = (e: TouchEvent) => {
      const g = gesture.current;
      if (!g.active || busyRef.current) return;
      const dy = e.touches[0].clientY - g.startY;
      // Pulling up, or no longer at the top → this isn't a pull-to-refresh.
      if (dy <= 0 || !atTop()) {
        if (g.pulling) {
          g.pulling = false;
          setPullBoth(0);
        }
        g.active = false;
        return;
      }
      // Genuine downward pull at the top: take over the gesture.
      g.pulling = true;
      if (e.cancelable) e.preventDefault();
      setPullBoth(Math.min(MAX_PULL, dy * RESIST));
    };

    const onEnd = () => {
      const g = gesture.current;
      if (!g.active) return;
      g.active = false;
      const wasPulling = g.pulling;
      g.pulling = false;
      if (wasPulling && pullRef.current >= THRESHOLD) {
        setRefreshing(true);
        busyRef.current = true;
        setPullBoth(THRESHOLD); // hold the spinner at the threshold
        startTransition(() => router.refresh());
      } else {
        setPullBoth(0);
      }
    };

    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onEnd, { passive: true });
    window.addEventListener("touchcancel", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
      window.removeEventListener("touchcancel", onEnd);
    };
  }, [router]);

  // Clear the spinner when the soft refresh finishes.
  useEffect(() => {
    if (refreshing && !isPending) {
      const t = setTimeout(() => {
        setRefreshing(false);
        setPullBoth(0);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [refreshing, isPending]);

  // Safety: never let the spinner hang if a refresh stalls.
  useEffect(() => {
    if (!refreshing) return;
    const safety = setTimeout(() => {
      setRefreshing(false);
      setPullBoth(0);
    }, 6000);
    return () => clearTimeout(safety);
  }, [refreshing]);

  const active = gesture.current.active;
  const visible = pull > 0 || refreshing;
  const progress = Math.min(1, pull / THRESHOLD);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 9999,
        transform: `translateY(${visible ? pull : 0}px)`,
        transition: active ? "none" : "transform 0.2s ease",
      }}
    >
      <div
        style={{
          marginTop: "calc(8px + env(safe-area-inset-top, 0px))",
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: "var(--panel-2, #161618)",
          border: "1px solid var(--border, #26262a)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
          display: visible ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          opacity: refreshing ? 1 : 0.4 + progress * 0.6,
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          style={{
            color: "var(--gold, #c8a020)",
            transform: refreshing ? undefined : `rotate(${progress * 270}deg)`,
            animation: refreshing ? "ptr-spin 0.7s linear infinite" : "none",
          }}
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            d="M12 4 A8 8 0 1 1 4 12"
          />
        </svg>
      </div>
    </div>
  );
}
