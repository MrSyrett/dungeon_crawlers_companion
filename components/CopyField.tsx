"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A read-only value with a copy button — used for the VTT access code and the
 * extension install link.
 *
 * With `absolute`, the value is a path that needs the current origin prefixed.
 * That's resolved on the client because the app is deployed to more than one
 * origin (localhost, previews, production) and hardcoding one would hand people
 * an install link that quietly points at the wrong place.
 *
 * The origin is written straight to the input via a ref rather than through
 * state: the server can't know it, and setting state in an effect would either
 * cause a hydration mismatch or trip react-hooks/set-state-in-effect.
 */
export default function CopyField({ value, absolute = false }: { value: string; absolute?: boolean }) {
  const ref = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (absolute && ref.current) ref.current.value = `${window.location.origin}${value}`;
  }, [absolute, value]);

  async function copy() {
    const text = ref.current?.value ?? value;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked (insecure context, permissions) — select it instead
      // so the value can still be copied by hand.
      ref.current?.select();
    }
  }

  return (
    <div className="mt-2 flex gap-2">
      <input
        ref={ref}
        readOnly
        defaultValue={value}
        onFocus={(e) => e.currentTarget.select()}
        className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 font-mono text-[13px] text-[var(--text)] outline-none"
      />
      <button
        type="button"
        onClick={copy}
        className="shrink-0 rounded border border-[var(--border)] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--gold)]"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
