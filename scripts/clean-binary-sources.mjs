// Pre-build guard.
// The type-checker scans every .ts/.tsx in the project (tsconfig include
// "**/*.tsx"). If a binary file (e.g. a PNG) is mistakenly committed with a
// .ts/.tsx extension, `next build` dies with "File appears to be binary."
// This removes any such impostor before the build so a stray asset can't break
// the deploy. Real source files (valid UTF-8) are always left untouched.
import { readdirSync, statSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";

const SKIP_DIRS = new Set([
  "node_modules", ".next", ".git", "generated", ".turbo", "dist", "build",
]);
const CODE_EXT = /\.(ts|tsx|mts|cts|js|jsx|mjs|cjs)$/;

function isProbablyBinary(buf) {
  // A NUL byte never appears in valid UTF-8 source; it's the clearest signal.
  if (buf.includes(0)) return true;
  try {
    // Strict UTF-8 decode: throws on invalid byte sequences (e.g. PNG data).
    new TextDecoder("utf-8", { fatal: true }).decode(buf);
    return false;
  } catch {
    return true;
  }
}

function walk(dir, removed) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") && entry.isDirectory() && !SKIP_DIRS.has(entry.name)) {
      // allow scanning dot-dirs we don't explicitly skip? keep it simple: skip all dot-dirs
      continue;
    }
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(full, removed);
    } else if (CODE_EXT.test(entry.name)) {
      let buf;
      try { buf = readFileSync(full); } catch { continue; }
      if (isProbablyBinary(buf)) {
        rmSync(full, { force: true });
        removed.push(full);
      }
    }
  }
}

const removed = [];
walk(process.cwd(), removed);
if (removed.length) {
  console.warn(
    "[clean-binary-sources] Removed binary file(s) masquerading as source:\n  " +
      removed.join("\n  ")
  );
} else {
  console.log("[clean-binary-sources] No binary source impostors found.");
}
