"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { SYSTEMS } from "@/components/systemStore";

type Props = {
  id: string;
  system: string | null;
  action: (formData: FormData) => Promise<void>;
};

/**
 * The campaign's game system, saved the instant you change the dropdown — no
 * Save button. The GM Screen reads this when the board is linked and switches
 * its system automatically.
 *
 * The value is controlled by local state and the Server Action is invoked
 * imperatively from `onChange` (per the Next.js event-handler pattern) rather
 * than through a `<form action>`. A `<form action>` resets its fields when the
 * action completes, which flashed the select back to its old value; and a naive
 * "sync state from the prop" effect would clobber the fresh choice if the
 * revalidated prop arrived stale. Here `desired` holds the value we're
 * persisting, so a prop update only moves the select when it's an outside change
 * (desired === null) or once the server has caught up to our choice.
 */
export function CampaignSystemSelect({ id, system, action }: Props) {
  const [value, setValue] = useState(system ?? "");
  const [pending, startTransition] = useTransition();
  const desired = useRef<string | null>(null); // value we're saving; null = in sync with server

  useEffect(() => {
    const s = system ?? "";
    if (desired.current === null) {
      setValue(s); // no pending edit → follow the server
    } else if (s === desired.current) {
      desired.current = null; // server caught up to our choice → back in sync
    }
    // else: server value is still stale — keep showing the chosen value
  }, [system]);

  return (
    <div className="mt-2 flex gap-2">
      <select
        name="system"
        value={value}
        aria-label="Game system"
        onChange={(e) => {
          const v = e.target.value;
          setValue(v);
          desired.current = v;
          const fd = new FormData();
          fd.set("id", id);
          fd.set("system", v);
          startTransition(() => action(fd));
        }}
        className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--gold)]"
      >
        <option value="">No system set</option>
        {SYSTEMS.map((s) => (
          <option key={s.key} value={s.key}>
            {s.name}
          </option>
        ))}
      </select>
      <span
        className="shrink-0 self-center text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]"
        aria-live="polite"
      >
        {pending ? "Saving…" : ""}
      </span>
    </div>
  );
}
