"use client";

import { useEffect, useRef, useState, useTransition } from "react";

type Props = {
  id: string;
  /** The form field name the action reads (e.g. "name" or "vttUrl"). */
  field: string;
  value: string;
  action: (formData: FormData) => Promise<void>;
  type?: "text" | "url";
  maxLength?: number;
  placeholder?: string;
  ariaLabel?: string;
};

/**
 * A single campaign field that saves itself — on blur or Enter — with no Save
 * button. The value is controlled by local state and the Server Action is
 * invoked imperatively (not via `<form action>`, which resets its fields when
 * the action completes and flashed the field back to its old value). `desired`
 * holds the value we're persisting so a revalidated prop only overwrites the
 * field on an outside change, never clobbering the edit the GM just made.
 */
export function CampaignAutoField({
  id,
  field,
  value: initial,
  action,
  type = "text",
  maxLength,
  placeholder,
  ariaLabel,
}: Props) {
  const [value, setValue] = useState(initial ?? "");
  const [pending, startTransition] = useTransition();
  const desired = useRef<string | null>(null); // value we're saving; null = in sync with server

  useEffect(() => {
    const s = initial ?? "";
    if (desired.current === null) {
      setValue(s);
    } else if (s === desired.current) {
      desired.current = null;
    }
  }, [initial]);

  const commit = () => {
    const baseline = desired.current !== null ? desired.current : initial ?? "";
    if (value === baseline) return; // unchanged since the last save
    desired.current = value;
    const fd = new FormData();
    fd.set("id", id);
    fd.set(field, value);
    startTransition(() => action(fd));
  };

  return (
    <div className="mt-2 flex gap-2">
      <input
        type={type}
        name={field}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        aria-label={ariaLabel}
        onChange={(e) => setValue(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            e.currentTarget.blur();
          }
        }}
        className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--gold)]"
      />
      <span
        className="shrink-0 self-center text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]"
        aria-live="polite"
      >
        {pending ? "Saving…" : ""}
      </span>
    </div>
  );
}
