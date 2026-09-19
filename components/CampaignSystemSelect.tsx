"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { SYSTEMS } from "@/components/systemStore";

type Props = {
  id: string;
  system: string | null;
  action: (formData: FormData) => Promise<void>;
};

// A tiny "Saving… / Saved" hint that reads the parent form's pending state, so
// the auto-save gives feedback without a button.
function SaveHint() {
  const { pending } = useFormStatus();
  return (
    <span
      className="shrink-0 self-center text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]"
      aria-live="polite"
    >
      {pending ? "Saving…" : ""}
    </span>
  );
}

/**
 * The campaign's game system, saved the instant you change the dropdown — no
 * Save button. The GM Screen reads this when the board is linked and switches
 * its system automatically. Uncontrolled + auto-submit, so the chosen value
 * stays put after the save round-trips.
 */
export function CampaignSystemSelect({ id, system, action }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form ref={formRef} action={action} className="mt-2 flex gap-2">
      <input type="hidden" name="id" value={id} />
      <select
        name="system"
        defaultValue={system ?? ""}
        aria-label="Game system"
        onChange={() => formRef.current?.requestSubmit()}
        className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--gold)]"
      >
        <option value="">No system set</option>
        {SYSTEMS.map((s) => (
          <option key={s.key} value={s.key}>
            {s.name}
          </option>
        ))}
      </select>
      <SaveHint />
    </form>
  );
}
