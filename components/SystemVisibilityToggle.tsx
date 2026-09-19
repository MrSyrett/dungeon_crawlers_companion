"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";

function SaveHint() {
  const { pending } = useFormStatus();
  return (
    <span
      className="text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]"
      aria-live="polite"
    >
      {pending ? "Saving…" : ""}
    </span>
  );
}

/**
 * Per-system "Visible" toggle on the admin Systems page. Saves the instant you
 * flip the checkbox — no Save button. Disabled for the last visible system so
 * one always stays on.
 */
export function SystemVisibilityToggle({
  systemKey,
  visible,
  disabled,
  action,
}: {
  systemKey: string;
  visible: boolean;
  disabled: boolean;
  action: (formData: FormData) => Promise<void>;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form ref={formRef} action={action} className="flex items-center gap-3">
      <input type="hidden" name="key" value={systemKey} />
      {/* An unchecked checkbox is omitted from the form data, so the action
          reads "visible present = show, absent = hide". */}
      <label className="flex items-center gap-2 text-[13px] text-[var(--text)]">
        <input
          type="checkbox"
          name="visible"
          value="on"
          defaultChecked={visible}
          disabled={disabled}
          onChange={() => formRef.current?.requestSubmit()}
          className="h-4 w-4"
        />
        Visible
      </label>
      <SaveHint />
    </form>
  );
}
