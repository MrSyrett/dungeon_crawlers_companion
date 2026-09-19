"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { SYSTEMS } from "@/components/systemStore";

function SaveHint() {
  const { pending } = useFormStatus();
  return (
    <span
      className="ml-auto text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]"
      aria-live="polite"
    >
      {pending ? "Saving…" : "Auto-saved"}
    </span>
  );
}

/**
 * The per-rulebook visibility settings on the admin Rulebooks page: "visible to
 * everyone" and which system it's shown on. Both save the moment you change
 * them — no Save button.
 */
export function RulebookSettingsForm({
  file,
  everyone,
  system,
  action,
}: {
  file: string;
  everyone: boolean;
  system: string;
  action: (formData: FormData) => Promise<void>;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const submit = () => formRef.current?.requestSubmit();
  return (
    <form
      ref={formRef}
      action={action}
      className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[var(--border)] pt-3"
    >
      <input type="hidden" name="file" value={file} />
      <label className="flex items-center gap-2 text-[13px] text-[var(--text)]">
        <input
          type="checkbox"
          name="everyone"
          defaultChecked={everyone}
          onChange={submit}
          className="h-4 w-4"
        />
        Visible to everyone signed in
      </label>
      <label className="flex items-center gap-2 text-[13px] text-[var(--text)]">
        Shown on
        <select
          name="system"
          defaultValue={system}
          onChange={submit}
          className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 py-1.5 text-[13px] text-[var(--text)] outline-none focus:border-[var(--gold)]"
        >
          <option value="BOTH">All systems</option>
          {SYSTEMS.map((s) => (
            <option key={s.key} value={s.key}>
              {s.name}
            </option>
          ))}
        </select>
      </label>
      <SaveHint />
    </form>
  );
}
