"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SOUND_CATEGORIES, SUBCATEGORY_GROUPS } from "@/lib/sounds";

// The admin Sound Library's "Stored on the site" panel: the Railway Storage
// Bucket the tracks live in (lib/sound-files.ts).
//   • Upload a folder — the PC's Audio folder (Ambiance / Music / Scenes, each with
//     its Location / Mood folders). Each file goes to the bucket and straight into
//     the library, placed by its folders. Choosing the folder again resumes: files
//     already in the bucket are skipped.
//   • Upload files — a few loose files, into a Category + Subcategory picked here.
//   • Add everything in the bucket — for files put there another way.

type Status = { configured: boolean; files: number; bytes: number; error?: string };
type PlanItem = { path: string; rel?: string; category?: string; subcategory?: string; skip: string | null };
type Job = { file: File; path: string; rel: string };

const btn =
  "rounded border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors disabled:cursor-default disabled:opacity-50";
const field =
  "rounded border border-[var(--border)] bg-[var(--panel)] px-2.5 py-2 text-[13px] text-[var(--text)] focus:border-[var(--gold)] focus:outline-none";

const gb = (n: number) => (n >= 1e9 ? (n / 1e9).toFixed(2) + " GB" : (n / 1e6).toFixed(n >= 1e8 ? 0 : 1) + " MB");

export function SoundStorage({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [prog, setProg] = useState<{ done: number; total: number; sent: number; bytes: number; current: string; skipped: number } | null>(null);
  const [cat, setCat] = useState<string>("Ambiance");
  const [sub, setSub] = useState<string>("");
  const stopRef = useRef(false);
  const folderRef = useRef<HTMLInputElement>(null);
  const filesRef = useRef<HTMLInputElement>(null);

  const refresh = useCallback(async () => {
    if (!configured) return;
    try {
      const r = await fetch("/api/admin/sounds/storage", { cache: "no-store" });
      setStatus(await r.json());
    } catch {
      setStatus({ configured: true, files: 0, bytes: 0, error: "Couldn't reach the bucket." });
    }
  }, [configured]);
  // Load the status once mounted (after the first paint, so no setState in the effect body).
  useEffect(() => { const t = setTimeout(refresh, 0); return () => clearTimeout(t); }, [refresh]);

  // webkitdirectory isn't in React's typings.
  useEffect(() => { folderRef.current?.setAttribute("webkitdirectory", ""); }, []);

  function sendOne(job: Job, onBytes: (n: number) => void): Promise<void> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/admin/sounds/upload?path=" + encodeURIComponent(job.path));
      xhr.setRequestHeader("content-type", job.file.type || "application/octet-stream");
      xhr.upload.onprogress = (e) => { if (e.lengthComputable) onBytes(e.loaded); };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) { onBytes(job.file.size); resolve(); return; }
        let m = "Upload failed (" + xhr.status + ")";
        try { m = JSON.parse(xhr.responseText).error || m; } catch { /* keep */ }
        reject(new Error(m));
      };
      xhr.onerror = () => reject(new Error("Network error"));
      xhr.send(job.file);
    });
  }

  async function upload(files: File[], pathOf: (f: File) => string) {
    if (!files.length || busy) return;
    setBusy(true); setErrors([]); setMsg("Checking what's already uploaded…"); stopRef.current = false;
    try {
      const listed = files.map((f) => ({ path: pathOf(f), size: f.size }));
      const r = await fetch("/api/admin/sounds/storage", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ files: listed }) });
      const d = (await r.json()) as { plan?: PlanItem[]; error?: string };
      if (!r.ok || !d.plan) throw new Error(d.error || "Couldn't plan the upload.");
      if (d.error) throw new Error(d.error);
      const jobs: Job[] = [];
      let skipped = 0;
      d.plan.forEach((p, i) => {
        if (p.skip || !p.rel) { if (p.skip === "already uploaded") skipped++; return; }
        jobs.push({ file: files[i], path: listed[i].path, rel: p.rel });
      });
      const totalBytes = jobs.reduce((n, j) => n + j.file.size, 0);
      const live = { done: 0, total: jobs.length, sent: 0, bytes: totalBytes, current: "", skipped };
      const inflight = new Map<Job, number>();
      const tick = () => setProg({ ...live, sent: live.sent + [...inflight.values()].reduce((a, b) => a + b, 0) });
      tick();
      setMsg(jobs.length ? "" : skipped ? "Everything in that folder is already uploaded." : "No audio files there.");
      let next = 0;
      const errs: string[] = [];
      const worker = async () => {
        while (!stopRef.current && next < jobs.length) {
          const job = jobs[next++];
          live.current = job.rel;
          inflight.set(job, 0);
          tick();
          let tries = 0;
          for (;;) {
            try {
              await sendOne(job, (n) => { inflight.set(job, n); tick(); });
              break;
            } catch (e) {
              if (++tries < 3 && !stopRef.current) { await new Promise((res) => setTimeout(res, 1500 * tries)); continue; }
              errs.push(job.rel + " — " + (e instanceof Error ? e.message : "failed"));
              setErrors([...errs]);
              break;
            }
          }
          inflight.delete(job);
          live.sent += job.file.size;
          live.done++;
          tick();
        }
      };
      await Promise.all([worker(), worker()]);
      live.current = "";
      tick();
      setMsg(stopRef.current ? "Stopped. Choose the folder again to carry on — finished files are skipped." : `Done — ${live.done - errs.length} uploaded${skipped ? `, ${skipped} already there` : ""}${errs.length ? `, ${errs.length} failed` : ""}.`);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
      refresh();
      router.refresh();
    }
  }

  async function importAll() {
    if (busy) return;
    setBusy(true); setMsg("Adding the bucket's files to the library…"); setErrors([]);
    try {
      const r = await fetch("/api/admin/sounds/import", { method: "POST" });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Import failed.");
      setMsg(`${d.files} file${d.files === 1 ? "" : "s"} in the bucket: ${d.added} added, ${d.swapped} switched from Dropbox, ${d.existing} already in the library.`);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Import failed.");
    } finally {
      setBusy(false);
      router.refresh();
    }
  }

  if (!configured) {
    return (
      <section className="mb-6 rounded-lg border border-dashed border-[var(--border)] p-5 text-[13px] leading-relaxed text-[var(--muted)]">
        <h2 className="mb-2 text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">Stored on the site</h2>
        No storage bucket is connected yet. In Railway, add a <span className="text-[var(--text)]">Storage Bucket</span> to the
        project and give this service its credentials (<code>BUCKET</code>, <code>ENDPOINT</code>, <code>ACCESS_KEY_ID</code>,{" "}
        <code>SECRET_ACCESS_KEY</code>, <code>REGION</code>) on its Variables tab. After the redeploy, this panel lets you upload the
        Audio folder.
      </section>
    );
  }

  const pct = prog && prog.bytes ? Math.min(100, Math.round((prog.sent / prog.bytes) * 100)) : 0;

  return (
    <section className="mb-6 rounded-lg border border-[var(--border)] bg-[var(--panel)]/40 p-5">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">Stored on the site</h2>
        <span className="text-[12px] text-[var(--muted)]">
          {status == null ? "Checking the bucket…" : status.error ? <span className="text-[var(--red)]">{status.error}</span> : `Bucket · ${status.files} file${status.files === 1 ? "" : "s"} · ${gb(status.bytes)}`}
        </span>
      </div>
      <p className="mb-4 text-[12.5px] leading-relaxed text-[var(--muted)]">
        Upload your <span className="text-[var(--text)]">Audio</span> folder — Ambiance, Music and Scenes, each with its Location or
        Mood folders. Every file is stored on the site and added to the library under those folders; a track already in the
        library from Dropbox is switched to the uploaded copy. If an upload stops, choose the folder again: finished files are skipped.
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <button type="button" disabled={busy} onClick={() => folderRef.current?.click()} className={`${btn} border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)] hover:bg-[var(--gold)]/20`}>
          Upload a folder
        </button>
        <input
          ref={folderRef}
          type="file"
          multiple
          hidden
          onChange={(e) => {
            const fs = Array.from(e.target.files || []);
            e.target.value = "";
            upload(fs, (f) => (f as File & { webkitRelativePath?: string }).webkitRelativePath || f.name);
          }}
        />
        <button type="button" disabled={busy} onClick={importAll} className={`${btn} border-[var(--border)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)]`}>
          Add everything in the bucket
        </button>
        {busy && prog ? (
          <button type="button" onClick={() => { stopRef.current = true; }} className={`${btn} border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]`}>
            Stop
          </button>
        ) : null}
      </div>

      <details className="mt-3">
        <summary className="cursor-pointer text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:text-[var(--text)]">
          Upload a few files instead
        </summary>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <select value={cat} onChange={(e) => setCat(e.target.value)} className={field} aria-label="Category">
            {SOUND_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={sub} onChange={(e) => setSub(e.target.value)} className={field} aria-label="Subcategory">
            <option value="">— none —</option>
            {Object.entries(SUBCATEGORY_GROUPS).map(([g, subs]) => (
              <optgroup key={g} label={g}>{subs.map((s) => <option key={s} value={s}>{s}</option>)}</optgroup>
            ))}
          </select>
          <button type="button" disabled={busy} onClick={() => filesRef.current?.click()} className={`${btn} border-[var(--border)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)]`}>
            Choose files
          </button>
          <input
            ref={filesRef}
            type="file"
            multiple
            accept="audio/*,.mp3,.m4a,.ogg,.opus,.wav,.flac"
            hidden
            onChange={(e) => {
              const fs = Array.from(e.target.files || []);
              e.target.value = "";
              upload(fs, (f) => [cat, sub.replace(/\//g, " & "), f.name].filter(Boolean).join("/"));
            }}
          />
        </div>
      </details>

      {prog && prog.total ? (
        <div className="mt-4">
          <div className="h-2 overflow-hidden rounded bg-[var(--panel-2)]">
            <div className="h-full bg-[var(--gold)] transition-[width]" style={{ width: pct + "%" }} />
          </div>
          <p className="mt-1.5 text-[12px] text-[var(--muted)]">
            {prog.done} of {prog.total} files · {gb(prog.sent)} of {gb(prog.bytes)}
            {prog.skipped ? ` · ${prog.skipped} already there` : ""}
            {prog.current ? <span className="block truncate text-[var(--text)]">{prog.current}</span> : null}
          </p>
        </div>
      ) : null}
      {msg ? <p className="mt-3 text-[12.5px] text-[var(--text)]">{msg}</p> : null}
      {errors.length ? (
        <ul className="mt-2 max-h-40 overflow-auto text-[12px] text-[var(--red)]">
          {errors.map((e) => <li key={e}>{e}</li>)}
        </ul>
      ) : null}
    </section>
  );
}
