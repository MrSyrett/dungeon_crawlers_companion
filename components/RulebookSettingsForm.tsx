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
      {pending ? "Saving…" : ""}
    </span>
  );
}

/**
 * The per-book settings on the admin Library page: "visible to everyone" and —
 * for a PDF that isn't in a system folder — which system's shelf shows it. Both
 * save the moment you change them — no Save button. A book filed in a system
 * folder shows that system read-only (`folderSystemLabel`); move the file to
 * change it.
 */
export function RulebookSettingsForm({
  file,
  everyone,
  system,
  folderSystemLabel,
  action,
}: {
  file: string;
  everyone: boolean;
  system: string;
  /** Set when the book's folder decides its system — the picker is replaced by this label. */
  folderSystemLabel?: string | null;
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
      {folderSystemLabel ? (
        <span className="text-[13px] text-[var(--text)]">
          Shown on <span className="font-semibold">{folderSystemLabel}</span>{" "}
          <span className="text-[11px] text-[var(--muted)]">(from its folder)</span>
        </span>
      ) : (
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
      )}
      <SaveHint />
    </form>
  );
}
