// Runs `next build`, retrying ONLY the known-transient Google Fonts failure.
//
// WHY THIS EXISTS
// app/layout.tsx asks next/font/google for 28 families (111 faces) on every build.
// next/font fetches each family's CSS from fonts.googleapis.com at build time and
// rewrites the font URLs into a Turbopack-internal import. Google usually answers
// with `/s/<family>/<hash>.woff2`, but occasionally with extensionless
// `/l/font?kit=…&skey=…&v=…` URLs instead. Turbopack then parses its own options
// blob as a query string, those extra `&`s split it into more than one pair, and the
// build dies with:
//
//     next/font/google queries have exactly one entry
//     Can't resolve '@vercel/turbopack-next/internal/font/google/font'
//
// Open upstream bug: https://github.com/vercel/next.js/issues/99114 — still
// reproducing on every release through 16.4 canary, and `--webpack` fails on the
// same response (it trips on the missing file extension instead). So there is
// nothing to upgrade to and no bundler to switch to.
//
// It is per-family and per-response, so a rebuild almost always succeeds. With 28
// families one build has a meaningful chance of hitting it: it has already taken out
// two deploys in a day, first on IBM Plex Sans, then on Mulish.
//
// The retry is deliberately NARROW. Anything that is not this signature fails on the
// first attempt, so a genuine compile error is not punished with three full builds
// and is not hidden behind a "it passed the second time" result.
//
// THE REAL FIX is to self-host the faces with next/font/local so the build stops
// fetching from Google at all. public/fonts/ already holds six self-hosted woff2
// faces declared in app/globals.css, and next.config.ts already serves /fonts/*
// immutable, so the pattern is there — it is the ~100 font files that make it a job
// of its own. Until that happens, this wrapper is the stopgap.
import { spawn } from "node:child_process";

const ATTEMPTS = 3;
const SIGNATURE =
  /next\/font\/google queries have exactly one entry|@vercel\/turbopack-next\/internal\/font\/google\/font/;

function runBuild() {
  return new Promise((resolve) => {
    // `next` resolves from node_modules/.bin, which npm puts on PATH for scripts.
    const child = spawn("next", ["build"], { shell: true });
    let log = "";
    // Tee rather than just capture: Railway's build log should still stream.
    const tee = (from, to) =>
      from.on("data", (chunk) => {
        log += chunk;
        to.write(chunk);
      });
    tee(child.stdout, process.stdout);
    tee(child.stderr, process.stderr);
    child.on("error", (err) => resolve({ code: 1, log: log + String(err) }));
    child.on("close", (code) => resolve({ code: code ?? 1, log }));
  });
}

for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
  const { code, log } = await runBuild();
  if (code === 0) process.exit(0);

  if (!SIGNATURE.test(log)) {
    console.error(
      `\n[build] failed with exit ${code}. Not the Google Fonts flake, so not retrying.`,
    );
    process.exit(code);
  }
  if (attempt === ATTEMPTS) {
    console.error(
      `\n[build] Google Fonts returned an unparseable shape on ${ATTEMPTS} builds in a row.` +
        `\n        See https://github.com/vercel/next.js/issues/99114 — rerun the deploy, or` +
        `\n        self-host the faces with next/font/local to end this for good.`,
    );
    process.exit(code);
  }
  console.error(
    `\n[build] Google Fonts returned a response next/font can't parse` +
      ` (attempt ${attempt} of ${ATTEMPTS}) — retrying.`,
  );
}
