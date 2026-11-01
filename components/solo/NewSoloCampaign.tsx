"use client";

// SOLO PLAY — "+ Solo" on the Campaigns page: name it, pick a hero (optional —
// the solo page can link one later) and an adventure, then go straight in.
// Part of the removable Solo Play feature — see SOLO-REMOVAL.md.
import { useState } from "react";
import { createSoloCampaign } from "@/app/actions/solo";

export default function NewSoloCampaign({
  characters,
  className,
}: {
  characters: { id: string; name: string }[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const field =
    "w-full rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--gold)]";
  const label = "block text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]";
  if (!open)
    return (
      <button type="button" className={className} onClick={() => setOpen(true)} title="Start a solo campaign">
        + Solo
      </button>
    );
  return (
    <form action={createSoloCampaign} className="flex w-full flex-col gap-3 px-4 py-4">
      <div>
        <label className={label} htmlFor="solo-name">Name</label>
        <input id="solo-name" name="name" className={field} placeholder="Alone in Deepfall Breach" maxLength={80} />
      </div>
      <div>
        <label className={label} htmlFor="solo-module">Adventure</label>
        <select id="solo-module" name="module" className={field} defaultValue="db-deepfall">
          <option value="db-deepfall">Alone in Deepfall Breach (5 missions)</option>
        </select>
      </div>
      <div>
        <label className={label} htmlFor="solo-char">Hero</label>
        <select id="solo-char" name="character" className={field} defaultValue="">
          <option value="">Choose later</option>
          {characters.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <button className="rounded border border-[var(--gold)] bg-[var(--gold)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--on-accent)] hover:opacity-90">
          Start
        </button>
        <button type="button" onClick={() => setOpen(false)} className="rounded border border-[var(--border)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--muted)] hover:text-[var(--text)]">
          Cancel
        </button>
      </div>
    </form>
  );
}
