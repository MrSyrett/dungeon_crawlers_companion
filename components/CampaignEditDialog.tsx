"use client";

import { useEffect, useRef, useState, useTransition } from "react";

// EVERYTHING YOU CAN CHANGE ABOUT A CAMPAIGN, IN ONE PLACE.
//
// The campaign card used to carry a rename field, a virtual-tabletop URL field,
// three paragraphs explaining them and a Delete button, all stacked under the
// row — so a page listing four campaigns was four blocks of settings you were
// not reading, and the two things you actually come here to do (open the VTT,
// open the GM Screen) were buried among them. The card is three buttons now and
// the settings live behind the third.
//
// It is a real <dialog>, not a div with a high z-index: the browser gives us the
// top layer, the backdrop, Escape-to-close and a focus trap for free, and all
// four are things a hand-rolled modal in this codebase would have to get right.
//
// The two fields save through the SAME Server Actions the inline fields used
// (renameCampaign / setCampaignVttUrl), so nothing about persistence changed —
// only when it happens. Inline they saved on blur, which meant a half-typed URL
// could be committed by a stray tap; here there is a Save button and a Cancel,
// and closing without saving changes nothing.

type Props = {
  id: string;
  name: string;
  code: string;
  vttUrl: string | null;
  /** Shown in the delete confirmation so the GM knows what they are breaking. */
  rolls: number;
  partyNames: string[];
  rename: (formData: FormData) => Promise<void>;
  setVttUrl: (formData: FormData) => Promise<void>;
  remove: (formData: FormData) => Promise<void>;
  className?: string;
};

export default function CampaignEditDialog({
  id,
  name,
  code,
  vttUrl,
  rolls,
  partyNames,
  rename,
  setVttUrl,
  remove,
  className,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [draftName, setDraftName] = useState(name);
  const [draftUrl, setDraftUrl] = useState(vttUrl ?? "");
  const [confirming, setConfirming] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  // Re-seed from the server whenever the campaign changes underneath us (a
  // revalidate after someone else's edit, or our own save landing). Only while
  // the dialog is CLOSED: doing it while open would wipe what the GM is typing.
  useEffect(() => {
    if (open) return;
    setDraftName(name);
    setDraftUrl(vttUrl ?? "");
  }, [name, vttUrl, open]);

  function show() {
    setErr(null);
    setConfirming(false);
    setDraftName(name);
    setDraftUrl(vttUrl ?? "");
    setOpen(true);
    ref.current?.showModal();
  }

  function hide() {
    setOpen(false);
    ref.current?.close();
  }

  function save() {
    const next = draftName.trim();
    // renameCampaign falls back to "New Campaign" on a blank, so a blank has to
    // be refused HERE rather than quietly renaming the table.
    if (!next) {
      setErr("A campaign needs a name.");
      return;
    }
    const url = draftUrl.trim();
    startTransition(async () => {
      try {
        if (next !== name) {
          const fd = new FormData();
          fd.set("id", id);
          fd.set("name", next);
          await rename(fd);
        }
        if (url !== (vttUrl ?? "")) {
          const fd = new FormData();
          fd.set("id", id);
          // Deliberately allowed to be empty: clearing this is how you go back to
          // the built-in VTT, so an empty value must be saved, not skipped.
          fd.set("vttUrl", url);
          await setVttUrl(fd);
        }
        hide();
      } catch {
        setErr("That didn't save. Check the link and try again.");
      }
    });
  }

  const field =
    "w-full rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--gold)]";
  const label = "block text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]";

  return (
    <>
      <button type="button" onClick={show} className={className} title={`Edit ${name}`}>
        Edit
      </button>

      {/* onClose fires for Escape and for the backdrop, so the open flag can
          never drift out of step with the element's own state. */}
      <dialog
        ref={ref}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        aria-label={`Edit ${name}`}
        className="w-[min(92vw,420px)] rounded-lg border border-[var(--border)] bg-[var(--panel)] p-0 text-[var(--text)] backdrop:bg-black/60"
      >
        <div className="flex flex-col gap-4 p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[var(--gold)]">
              Edit campaign
            </h2>
            <span className="text-[11px] font-bold tracking-[0.15em] text-[var(--muted)]">{code}</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={label} htmlFor={`camp-name-${id}`}>
              Name
            </label>
            <input
              id={`camp-name-${id}`}
              type="text"
              value={draftName}
              maxLength={60}
              onChange={(e) => setDraftName(e.target.value)}
              className={field}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={label} htmlFor={`camp-url-${id}`}>
              Owlbear room URL
            </label>
            <input
              id={`camp-url-${id}`}
              type="url"
              value={draftUrl}
              maxLength={500}
              placeholder="Leave empty to use the built-in VTT"
              onChange={(e) => setDraftUrl(e.target.value)}
              className={field}
            />
          </div>

          {err ? <p className="text-[12px] text-[var(--bad)]">{err}</p> : null}

          <div className="flex flex-wrap items-center justify-end gap-2">
            {/* Delete sits with the other actions but reads as the odd one out:
                it is the only control here that cannot be undone. */}
            {confirming ? (
              <form
                action={remove}
                className="mr-auto flex items-center gap-2"
                onSubmit={() => hide()}
              >
                <input type="hidden" name="id" value={id} />
                <span className="text-[11px] text-[var(--muted)]">
                  Delete {code}
                  {rolls > 0 ? ` and ${rolls} roll${rolls === 1 ? "" : "s"}` : ""}?
                  {partyNames.length > 0
                    ? ` ${partyNames.join(", ")} stop sharing rolls.`
                    : ""}
                </span>
                <button className="rounded border border-[var(--red)] bg-[var(--red)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white">
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  className="rounded border border-[var(--border)] px-3 py-1.5 text-[11px] uppercase tracking-[0.1em] text-[var(--muted)] hover:text-[var(--text)]"
                >
                  Keep
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setConfirming(true)}
                className="mr-auto rounded border border-[var(--border)] px-3 py-2 text-[11px] uppercase tracking-[0.1em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--bad)]"
              >
                Delete
              </button>
            )}

            <button
              type="button"
              onClick={hide}
              className="rounded border border-[var(--border)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--muted)] hover:text-[var(--text)]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={save}
              disabled={pending}
              className="rounded border border-[var(--gold)] bg-[var(--gold)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--on-accent)] hover:opacity-90 disabled:opacity-50"
            >
              {pending ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
