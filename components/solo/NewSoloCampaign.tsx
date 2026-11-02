"use client";

// SOLO PLAY — "+ Solo" on the Campaigns page opens a dialog: name it, pick an
// adventure and the party (1–4 heroes, fixed for the whole campaign), then go
// straight in. Built like CampaignDialog: a real <dialog> portalled to <body>,
// with m-auto restoring the native centring that Tailwind's preflight removes.
// Part of the removable Solo Play feature — see SOLO-REMOVAL.md.
import { useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { createSoloCampaign } from "@/app/actions/solo";
import { SOLO_MODULES } from "@/lib/solo-modules";

const noopSubscribe = () => () => {};
const MAX_PARTY = 4;

export default function NewSoloCampaign({
  characters,
  className,
}: {
  characters: { id: string; name: string }[];
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [pending, setPending] = useState(false);
  const [party, setParty] = useState<string[]>([]);
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const field =
    "w-full rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--gold)]";
  const label = "block text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]";
  const toggle = (id: string) =>
    setParty((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length >= MAX_PARTY ? p : [...p, id]));

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => {
          setPending(false);
          setParty([]);
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
                <fieldset className="flex flex-col gap-1.5">
                  <legend className={`${label} mb-1.5 flex w-full justify-between`}>
                    <span>Party</span>
                    <span className="normal-case tracking-normal">{party.length} of {MAX_PARTY}</span>
                  </legend>
                  {characters.length ? (
                    <div className="flex max-h-56 flex-col gap-1 overflow-auto">
                      {characters.map((c) => {
                        const on = party.includes(c.id);
                        const full = !on && party.length >= MAX_PARTY;
                        return (
                          <label
                            key={c.id}
                            className={`flex cursor-pointer items-center gap-2.5 rounded border px-3 py-2 text-sm ${
                              on ? "border-[var(--gold)] bg-[var(--panel-2)]" : "border-[var(--border)]"
                            } ${full ? "cursor-not-allowed opacity-50" : ""}`}
                          >
                            <input
                              type="checkbox"
                              name="character"
                              value={c.id}
                              checked={on}
                              disabled={full}
                              onChange={() => toggle(c.id)}
                              className="accent-[var(--gold)]"
                            />
                            <span className="flex-1">{c.name}</span>
                            {on ? <span className="text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">{party.indexOf(c.id) === 0 ? "Leader" : `#${party.indexOf(c.id) + 1}`}</span> : null}
                          </label>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-[var(--muted)]">You have no Dragonbane characters yet. Create one from the Characters page first.</p>
                  )}
                  <p className="text-[11px] text-[var(--muted)]">One hero plays by the solo rules; a party of up to four plays like the book. The party is set for the whole campaign.</p>
                </fieldset>
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => ref.current?.close()}
                    className="rounded border border-[var(--border)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--muted)] hover:text-[var(--text)]"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={pending || !party.length}
                    title={party.length ? undefined : "Choose at least one hero"}
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
