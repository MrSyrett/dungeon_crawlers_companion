"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// The admin Library page's file management (app/admin/rulebooks/page.tsx):
//   • LibraryUploader — add PDFs to a game's Core Rules / Expansions / Adventures
//   • SeedButton      — one-time copy of the repo's bundled books onto the volume
//   • BookFileActions — move a book to another game/section, or delete it
// All talk to /api/admin/library/* (lib/library-admin.ts does the file work).

export type SystemOpt = { key: string; name: string };
const SECTIONS = ["Core Rules", "Expansions", "Adventures"] as const;

const field =
  "rounded border border-[var(--border)] bg-[var(--panel-2)] px-2.5 py-2 text-[13px] text-[var(--text)] outline-none focus:border-[var(--gold)]";
const btn =
  "rounded border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors disabled:cursor-default disabled:opacity-50";

// window.pdfjsLib is declared (as unknown) in RulebookReader.tsx, and a global
// can be declared only one way, so this file reads it through a typed view.
type PdfLib = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (src: { data: ArrayBuffer }) => { promise: Promise<PdfDoc> };
};
const pdfjs = () => (window as unknown as { pdfjsLib?: PdfLib }).pdfjsLib;
type PdfDoc = {
  getPage: (n: number) => Promise<{
    getViewport: (o: { scale: number }) => { width: number; height: number };
    render: (o: { canvasContext: CanvasRenderingContext2D; viewport: { width: number; height: number } }) => { promise: Promise<void> };
  }>;
  destroy: () => void;
};

let pdfjsLoading: Promise<void> | null = null;
function loadPdfjs(): Promise<void> {
  if (pdfjs()) return Promise.resolve();
  if (!pdfjsLoading) {
    pdfjsLoading = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "/vendor/pdfjs/pdf.min.js";
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("pdf.js"));
      document.head.appendChild(s);
    });
  }
  return pdfjsLoading;
}

/** Page 1 of a local PDF as a cover image (420px wide), drawn in the browser so
 *  the server never renders PDFs. Null when it can't be drawn. */
async function renderCover(file: File): Promise<Blob | null> {
  try {
    await loadPdfjs();
    const lib = pdfjs()!;
    if (!lib.GlobalWorkerOptions.workerSrc) lib.GlobalWorkerOptions.workerSrc = "/vendor/pdfjs/pdf.worker.min.js";
    const doc = await lib.getDocument({ data: await file.arrayBuffer() }).promise;
    const page = await doc.getPage(1);
    const v1 = page.getViewport({ scale: 1 });
    const vp = page.getViewport({ scale: 420 / v1.width });
    const c = document.createElement("canvas");
    c.width = Math.round(vp.width);
    c.height = Math.round(vp.height);
    await page.render({ canvasContext: c.getContext("2d")!, viewport: vp }).promise;
    doc.destroy();
    const webp = await new Promise<Blob | null>((r) => c.toBlob(r, "image/webp", 0.8));
    if (webp && webp.type === "image/webp") return webp;
    return await new Promise<Blob | null>((r) => c.toBlob(r, "image/jpeg", 0.82));
  } catch {
    return null;
  }
}

/** PUT-style upload with progress (fetch can't report upload progress). */
function upload(url: string, body: Blob, type: string, onProgress: (f: number) => void): Promise<{ status: number; json: Record<string, unknown> }> {
  return new Promise((resolve, reject) => {
    const x = new XMLHttpRequest();
    x.open("POST", url);
    x.setRequestHeader("content-type", type);
    x.upload.onprogress = (e) => { if (e.lengthComputable) onProgress(e.loaded / e.total); };
    x.onload = () => {
      let json: Record<string, unknown> = {};
      try { json = JSON.parse(x.responseText); } catch { /* not JSON */ }
      resolve({ status: x.status, json });
    };
    x.onerror = () => reject(new Error("Network error"));
    x.send(body);
  });
}

type Row = { name: string; state: "waiting" | "uploading" | "cover" | "done" | "error" | "exists"; pct: number; msg: string };

export function LibraryUploader({ systems, defaultSystem }: { systems: SystemOpt[]; defaultSystem: string }) {
  const router = useRouter();
  const [system, setSystem] = useState(defaultSystem);
  const [section, setSection] = useState<string>("Core Rules");
  const [replace, setReplace] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const patch = (i: number, p: Partial<Row>) => setRows((rs) => rs.map((r, j) => (j === i ? { ...r, ...p } : r)));

  async function go() {
    if (!files.length || busy) return;
    setBusy(true);
    const list = files.slice();
    setRows(list.map((f) => ({ name: f.name, state: "waiting", pct: 0, msg: "" })));
    let any = false;
    for (let i = 0; i < list.length; i++) {
      const f = list[i];
      patch(i, { state: "uploading" });
      const q = new URLSearchParams({ system, category: section, name: f.name });
      if (replace) q.set("replace", "1");
      try {
        const res = await upload(`/api/admin/library/upload?${q}`, f, "application/pdf", (p) => patch(i, { pct: p }));
        if (res.status !== 200) {
          patch(i, { state: res.json.exists ? "exists" : "error", msg: String(res.json.error || `Failed (${res.status})`) });
          continue;
        }
        any = true;
        const saved = String(res.json.file || f.name);
        patch(i, { state: "cover", pct: 1 });
        const cover = await renderCover(f);
        if (cover) await upload(`/api/admin/library/cover?file=${encodeURIComponent(saved)}`, cover, cover.type, () => {}).catch(() => null);
        patch(i, { state: "done", msg: cover ? String(res.json.rel || "") : "Uploaded — the shelf will draw its cover." });
      } catch (e) {
        patch(i, { state: "error", msg: e instanceof Error ? e.message : "Upload failed" });
      }
    }
    setBusy(false);
    setFiles([]);
    if (inputRef.current) inputRef.current.value = "";
    if (any) router.refresh();
  }

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">Add books</h2>
      <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">
          Game
          <select className={field} value={system} onChange={(e) => setSystem(e.target.value)} disabled={busy}>
            {systems.map((s) => <option key={s.key} value={s.key}>{s.name}</option>)}
            <option value="BOTH">All Systems (every shelf)</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">
          Section
          <select className={field} value={section} onChange={(e) => setSection(e.target.value)} disabled={busy}>
            {SECTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">
          PDFs
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,.pdf"
            multiple
            disabled={busy}
            onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
            className="text-[12px] normal-case tracking-normal text-[var(--text)] file:mr-2 file:rounded file:border file:border-[var(--border)] file:bg-[var(--panel-2)] file:px-2.5 file:py-1.5 file:text-[11px] file:font-semibold file:uppercase file:text-[var(--text)]"
          />
        </label>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button type="button" onClick={go} disabled={busy || !files.length} className={`${btn} border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--panel-2)]`}>
          {busy ? "Uploading…" : files.length > 1 ? `Upload ${files.length} books` : "Upload"}
        </button>
        <label className="flex items-center gap-2 text-[12px] text-[var(--muted)]">
          <input type="checkbox" checked={replace} onChange={(e) => setReplace(e.target.checked)} disabled={busy} />
          Replace a book with the same file name
        </label>
      </div>
      <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">
        The file name becomes the book&apos;s title and ID — keep it the same to keep its access settings. A cover is
        made from page 1 automatically.
      </p>
      {rows.length ? (
        <ul className="mt-3 flex flex-col gap-1.5">
          {rows.map((r, i) => (
            <li key={i} className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-[12px]">
              <div className="flex items-center justify-between gap-3">
                <span className="min-w-0 truncate text-[var(--text)]">{r.name}</span>
                <span className={`shrink-0 text-[11px] uppercase tracking-[0.1em] ${r.state === "done" ? "text-[var(--good)]" : r.state === "error" || r.state === "exists" ? "text-[var(--bad)]" : "text-[var(--muted)]"}`}>
                  {r.state === "uploading" ? `${Math.round(r.pct * 100)}%` : r.state === "cover" ? "Making cover…" : r.state === "exists" ? "Already there" : r.state}
                </span>
              </div>
              {r.state === "uploading" ? (
                <div className="mt-1.5 h-1 overflow-hidden rounded bg-[var(--border)]">
                  <div className="h-full bg-[var(--gold)] transition-[width]" style={{ width: `${Math.round(r.pct * 100)}%` }} />
                </div>
              ) : null}
              {r.msg ? <div className="mt-1 break-all text-[11px] text-[var(--muted)]">{r.msg}</div> : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

type Seed = { running: boolean; total: number; done: number; copiedBytes: number; current: string; error: string; finishedAt: number | null };

export function SeedButton({ count, bytes }: { count: number; bytes: number }) {
  const router = useRouter();
  const [st, setSt] = useState<Seed | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!st?.running) return;
    const t = window.setInterval(async () => {
      try {
        const r = await fetch("/api/admin/library/seed", { cache: "no-store" });
        const j = (await r.json()) as Seed;
        setSt(j);
        if (!j.running) { window.clearInterval(t); router.refresh(); }
      } catch { /* try again next tick */ }
    }, 1000);
    return () => window.clearInterval(t);
  }, [st?.running, router]);

  async function start() {
    setErr("");
    const r = await fetch("/api/admin/library/seed", { method: "POST" });
    const j = await r.json();
    if (!r.ok) { setErr(j.error || "Could not start the copy."); return; }
    setSt(j as Seed);
  }

  const mb = (n: number) => `${(n / 1048576).toFixed(0)} MB`;
  return (
    <div className="mt-3">
      <button type="button" onClick={start} disabled={!!st?.running} className={`${btn} border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--panel-2)]`}>
        {st?.running ? "Copying…" : `Copy ${count} bundled ${count === 1 ? "book" : "books"} (${mb(bytes)}) to the volume`}
      </button>
      {st ? (
        <div className="mt-2 text-[12px] text-[var(--muted)]">
          {st.running
            ? `${st.done} of ${st.total} · ${mb(st.copiedBytes)} copied${st.current ? ` · ${st.current}` : ""}`
            : st.error
              ? <span className="text-[var(--bad)]">Stopped: {st.error}</span>
              : `Done — ${st.done} checked, ${mb(st.copiedBytes)} copied.`}
        </div>
      ) : null}
      {err ? <div className="mt-2 text-[12px] text-[var(--bad)]">{err}</div> : null}
    </div>
  );
}

export function BookFileActions({
  file,
  system,
  category,
  systems,
  writable,
  stored,
}: {
  file: string;
  system: string;
  category: string;
  systems: SystemOpt[];
  writable: boolean;
  stored: "volume" | "bundled";
}) {
  const router = useRouter();
  const [sys, setSys] = useState(system);
  const [sec, setSec] = useState(category);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function post(url: string, body: unknown) {
    setBusy(true);
    setMsg("");
    try {
      const r = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) setMsg(j.error || "Failed.");
      else router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[var(--border)] pt-3">
      <span className={`rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] ${stored === "volume" ? "border-[var(--good)] text-[var(--good)]" : "border-[var(--border)] text-[var(--muted)]"}`}>
        {stored === "volume" ? "On volume" : "In repo"}
      </span>
      {writable ? (
        <>
          <select className={`${field} py-1.5 text-[12px]`} value={sys} onChange={(e) => setSys(e.target.value)} disabled={busy} aria-label="Move to game">
            {systems.map((s) => <option key={s.key} value={s.key}>{s.name}</option>)}
            <option value="BOTH">All Systems</option>
          </select>
          <select className={`${field} py-1.5 text-[12px]`} value={sec} onChange={(e) => setSec(e.target.value)} disabled={busy} aria-label="Move to section">
            {SECTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <button
            type="button"
            disabled={busy || (sys === system && sec === category)}
            onClick={() => post("/api/admin/library/move", { file, system: sys, category: sec })}
            className={`${btn} border-[var(--border)] py-1.5 text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)]`}
          >
            Move
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => { if (window.confirm(`Delete "${file}" from the Library? Its access settings are kept in case you upload it again.`)) post("/api/admin/library/delete", { file }); }}
            className={`${btn} ml-auto border-[var(--border)] py-1.5 text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--red)]`}
          >
            Delete
          </button>
        </>
      ) : null}
      {msg ? <span className="w-full text-[12px] text-[var(--bad)]">{msg}</span> : null}
    </div>
  );
}
