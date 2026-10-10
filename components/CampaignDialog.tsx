"use client";

import { useEffect, useRef, useState, useTransition } from "react";

// ONE DIALOG, TWO JOBS: creating a campaign and editing one.
//
// They were going to be two components. They are one because they are the same
// form — a name and an Owlbear room URL — and because the two things that are
// easy to get wrong here are things you only want to get right once: the
// centring trap below, and the rule that an empty URL must still be SAVED (it is
// how a GM goes back to the built-in VTT). A second copy would have drifted.
//
// It is a real <dialog>, not a div with a high z-index: the top layer, the
// backdrop, Escape-to-close and a focus trap all come free, and all four are
// things a hand-rolled modal has to get right.
//
// Editing saves through the SAME Server Actions the old inline fields used
// (renameCampaign / setCampaignVttUrl), so nothing about persistence changed —
// only when it happens. Inline they saved on blur, which meant a half-typed URL
// could be committed by a stray tap; here there is a Save and a Cancel, and
// closing without saving changes nothing.

type Common = {
  /** Classes for the trigger button. */
  className?: string;
};

type CreateProps = Common & {
  mode: "create";
  /** The system the page is showing. Set once, at creation, never editable. */
  system: string;
  create: (formData: FormData) => Promise<void>;
  /** For the heading: "Create a Shadowdark campaign". */
  systemLabel: string;
};

type EditProps = Common & {
  mode: "edit";
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
  clearRolls: (formData: FormData) => Promise<void>;
};

export default function CampaignDialog(props: CreateProps | EditProps) {
  const editing = props.mode === "edit";
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [draftName, setDraftName] = useState(editing ? props.name : "");
  const [draftUrl, setDraftUrl] = useState(editing ? props.vttUrl ?? "" : "");
  // Which destructive control is asking "are you sure?" — at most one at a time.
  const [confirming, setConfirming] = useState<null | "delete" | "clear">(null);
  const [err, setErr] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const seedName = editing ? props.name : "";
  const seedUrl = editing ? props.vttUrl ?? "" : "";

  // Re-seed from the server whenever the campaign changes underneath us (a
  // revalidate after someone else's edit, or our own save landing). Only while
  // the dialog is CLOSED: doing it while open would wipe what the GM is typing.
  useEffect(() => {
    if (open) return;
    setDraftName(seedName);
    setDraftUrl(seedUrl);
  }, [seedName, seedUrl, open]);

  function show() {
    setErr(null);
    setConfirming(null);
    setDraftName(seedName);
    setDraftUrl(seedUrl);
    setOpen(true);
    ref.current?.showModal();
  }

  function hide() {
    setOpen(false);
    ref.current?.close();
  }

  function submit() {
    const next = draftName.trim();
    const url = draftUrl.trim();

    if (!editing) {
      // Create needs a name; everything else about the campaign is generated.
      if (!next) {
        setErr("Give the campaign a name.");
        return;
      }
      const fd = new FormData();
      fd.set("system", props.system);
      fd.set("name", next);
      fd.set("vttUrl", url);
      startTransition(async () => {
        try {
          await props.create(fd);
          hide();
        } catch {
          setErr("That didn't save. Try again.");
        }
      });
      return;
    }

    // renameCampaign falls back to "New Campaign" on a blank, so a blank has to
    // be refused HERE rather than quietly renaming the table.
    if (!next) {
      setErr("A campaign needs a name.");
      return;
    }
    startTransition(async () => {
      try {
        if (next !== props.name) {
          const fd = new FormData();
          fd.set("id", props.id);
          fd.set("name", next);
          await props.rename(fd);
        }
        if (url !== (props.vttUrl ?? "")) {
          const fd = new FormData();
          fd.set("id", props.id);
          // Deliberately allowed to be empty: clearing this is how you go back to
          // the built-in VTT, so an empty value must be saved, not skipped.
          fd.set("vttUrl", url);
          await props.setVttUrl(fd);
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
  // Both inputs need ids unique on the page — the list renders one dialog per row.
  const uid = editing ? props.id : "new";

  return (
    <>
      <button
        type="button"
        onClick={show}
        className={props.className}
        title={editing ? `Edit ${props.name}` : `Create a ${props.systemLabel} campaign`}
      >
        {editing ? "Edit" : "+ New"}
      </button>

      {/* onClose fires for Escape and for the backdrop, so the open flag can
          never drift out of step with the element's own state.

          m-auto IS LOAD BEARING. The browser centres a modal <dialog> itself,
          with `position:fixed; inset:0; margin:auto` in the user-agent
          stylesheet — but app/globals.css opens with @import "tailwindcss", and
          Tailwind's preflight zeroes the margin on every element. An author rule
          beats the UA, so that reset silently turned `margin:auto` into
          `margin:0` and pinned this to the top-left corner, which is where
          Michael found it. Restoring the margin restores the native centring,
          including the part where it recentres as the content grows.

          The height cap and overflow come with it: once the dialog is centred it
          can run off a short screen (a laptop in landscape, a phone with the
          keyboard up), and the UA's own max-height only applies while the margin
          is doing its job. */}
      <dialog
        ref={ref}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        aria-label={editing ? `Edit ${props.name}` : "Create a campaign"}
        className={`${editing ? "edit-dlg" : "create-dlg"} m-auto max-h-[85vh] w-[min(92vw,420px)] overflow-auto rounded-lg border border-[var(--border)] bg-[var(--panel)] p-0 text-[var(--text)] backdrop:bg-black/60`}
      >
        <div className="flex flex-col gap-4 p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[var(--gold)]">
              {editing ? "Edit campaign" : `New ${props.systemLabel} campaign`}
            </h2>
            {editing ? (
              <span className="text-[11px] font-bold tracking-[0.15em] text-[var(--muted)]">
                {props.code}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={label} htmlFor={`camp-name-${uid}`}>
              Name
            </label>
            <input
              id={`camp-name-${uid}`}
              type="text"
              value={draftName}
              maxLength={60}
              autoFocus
              placeholder={editing ? undefined : "Campaign name…"}
              onChange={(e) => setDraftName(e.target.value)}
              className={field}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={label} htmlFor={`camp-url-${uid}`}>
              Owlbear room URL
            </label>
            <input
              id={`camp-url-${uid}`}
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
            {/* The two destructive controls sit left of Cancel/Save and share
                one confirm slot, so the dialog never asks two questions at
                once. Delete removes the campaign; Clear only empties its roll
                log (the GM's between-sessions tidy-up) and leaves everything
                else — code, party, URL — exactly as it was. Creating has
                nothing to delete or clear, so this whole corner is edit-only. */}
            {editing ? (
              confirming === "delete" ? (
                <form
                  action={props.remove}
                  className="mr-auto flex items-center gap-2"
                  onSubmit={() => hide()}
                >
                  <input type="hidden" name="id" value={props.id} />
                  <span className="text-[11px] text-[var(--muted)]">
                    Delete {props.code}
                    {props.rolls > 0 ? ` and ${props.rolls} roll${props.rolls === 1 ? "" : "s"}` : ""}?
                    {props.partyNames.length > 0
                      ? ` ${props.partyNames.join(", ")} stop sharing rolls.`
                      : ""}
                  </span>
                  <button className="rounded border border-[var(--red)] bg-[var(--red)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white">
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirming(null)}
                    className="rounded border border-[var(--border)] px-3 py-1.5 text-[11px] uppercase tracking-[0.1em] text-[var(--muted)] hover:text-[var(--text)]"
                  >
                    Keep
                  </button>
                </form>
              ) : confirming === "clear" ? (
                <form
                  action={props.clearRolls}
                  className="mr-auto flex items-center gap-2"
                  onSubmit={() => hide()}
                >
                  <input type="hidden" name="id" value={props.id} />
                  <span className="text-[11px] text-[var(--muted)]">
                    Clear {props.rolls} roll{props.rolls === 1 ? "" : "s"} from the log? Open sheets keep theirs until they reload.
                  </span>
                  <button className="rounded border border-[var(--red)] bg-[var(--red)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white">
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirming(null)}
                    className="rounded border border-[var(--border)] px-3 py-1.5 text-[11px] uppercase tracking-[0.1em] text-[var(--muted)] hover:text-[var(--text)]"
                  >
                    Keep
                  </button>
                </form>
              ) : (
                <div className="mr-auto flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setConfirming("delete")}
                    className="rounded border border-[var(--border)] px-3 py-2 text-[11px] uppercase tracking-[0.1em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--bad)]"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirming("clear")}
                    disabled={props.rolls === 0}
                    title={props.rolls === 0 ? "The roll log is already empty" : "Empty this campaign's roll log"}
                    className="rounded border border-[var(--border)] px-3 py-2 text-[11px] uppercase tracking-[0.1em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--bad)] disabled:cursor-default disabled:opacity-40 disabled:hover:border-[var(--border)] disabled:hover:text-[var(--muted)]"
                  >
                    Clear rolls
                  </button>
                </div>
              )
            ) : null}

            <button
              type="button"
              onClick={hide}
              className="rounded border border-[var(--border)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--muted)] hover:text-[var(--text)]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={submit}
              disabled={pending}
              className="rounded border border-[var(--gold)] bg-[var(--gold)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--on-accent)] hover:opacity-90 disabled:opacity-50"
            >
              {pending ? (editing ? "Saving…" : "Creating…") : editing ? "Save" : "Create"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
