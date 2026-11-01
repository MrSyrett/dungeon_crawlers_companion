"use client";

// SOLO PLAY — "+ Solo" on the Campaigns page opens a dialog: name it, pick an
// adventure and a hero (optional — the solo page can link one later), then go
// straight in. Built like CampaignDialog: a real <dialog> portalled to <body>,
// with m-auto restoring the native centring that Tailwind's preflight removes.
// Part of the removable Solo Play feature — see SOLO-REMOVAL.md.
import { useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { createSoloCampaign } from "@/app/actions/solo";
import { SOLO_MODULES } from "@/lib/solo-modules";

const noopSubscribe = () => () => {};

export default function NewSoloCampaign({
  characters,
  className,
}: {
  characters: { id: string; name: string }[];
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [pending, setPending] = useState(false);
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const field =
    "w-full rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--gold)]";
  const label = "block text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]";

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => {
          setPending(false);
          ref.current?.showModal();
        }}
        title="Start a solo campaign"
      >
        + Solo
      </button>
      {mounted
        ? createPortal(
            <dialog
              ref={ref}
              aria-label="New solo campaign"
              className="m-auto max-h-[85vh] w-[min(92vw,420px)] overflow-auto rounded-lg border border-[var(--border)] bg-[var(--panel)] p-0 text-[var(--text)] backdrop:bg-black/60"
            >
              <form action={createSoloCampaign} onSubmit={() => setPending(true)} className="flex flex-col gap-4 p-5">
                <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[var(--gold)]">New solo campaign</h2>
                <div className="flex flex-col gap-1.5">
                  <label className={label} htmlFor="solo-name">Name</label>
                  <input id="solo-name" name="name" className={field} placeholder="Named after the adventure" maxLength={80} autoFocus />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={label} htmlFor="solo-module">Adventure</label>
                  <select id="solo-module" name="module" className={field} defaultValue={SOLO_MODULES[0]?.id}>
                    {SOLO_MODULES.map((m) => (
                      <option key={m.id} value={m.id}>{m.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={label} htmlFor="solo-char">Hero</label>
                  <select id="solo-char" name="character" className={field} defaultValue="">
                    <option value="">Choose later</option>
                    {characters.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => ref.current?.close()}
                    className="rounded border border-[var(--border)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--muted)] hover:text-[var(--text)]"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={pending}
                    className="rounded border border-[var(--gold)] bg-[var(--gold)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--on-accent)] hover:opacity-90 disabled:opacity-50"
                  >
                    {pending ? "Starting…" : "Start"}
                  </button>
                </div>
              </form>
            </dialog>,
            document.body,
          )
        : null}
    </>
  );
}
