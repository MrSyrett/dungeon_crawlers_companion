#!/usr/bin/env node
/* ===========================================================================
 * split-pack.js — split oversized Forgotten Adventures .dungeondraft_pack files
 * into smaller valid sub-packs, so they can be transferred and baked.
 *
 * Pure Node, NO dependencies (uses only built-in fs/path) — nothing to install.
 * A .dungeondraft_pack is a Godot PCK archive; this reads it, then writes N
 * sub-packs each under a size cap, every sub-pack carrying the same pack.json id
 * so the baker re-merges them into one logical pack.
 *
 * Usage:  node split-pack.js "<FA folder>" "<out folder>" [maxMB]
 *   - splits every pack in <FA folder> larger than maxMB (default 380)
 *   - writes  <name>_partN.dungeondraft_pack  into <out folder>
 * =========================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const IN  = process.argv[2] || '.';
const OUT = process.argv[3] || path.join(IN, '_split');
const MAX = (Number(process.argv[4]) || 380) * 1024 * 1024;

function parse(buf) {
  if (buf.toString('ascii', 0, 4) !== 'GDPC') throw new Error('not a Godot pack (no GDPC header)');
  const fmt = buf.readUInt32LE(4);
  let off = 20;
  if (fmt === 2) off += 12;          // Godot 4: pack flags (u32) + file base (u64)
  off += 16 * 4;                     // reserved
  const count = buf.readUInt32LE(off); off += 4;
  const files = [];
  for (let i = 0; i < count; i++) {
    const plen = buf.readUInt32LE(off); off += 4;
    let p = buf.toString('utf8', off, off + plen); off += plen;
    p = p.replace(/\0+$/, '');
    const fo = Number(buf.readBigUInt64LE(off)); off += 8;
    const fsz = Number(buf.readBigUInt64LE(off)); off += 8;
    off += 16;                       // md5
    files.push({ path: p, off: fo, size: fsz });
  }
  return { fmt, files };
}

// Write a Godot-3 (fmt=1) PCK containing `entries` (each {path, off, size}
// referencing srcBuf). Layout matches what extract-fa.py reads.
function writePCK(outPath, entries, srcBuf) {
  const pad4 = (n) => (n + 3) & ~3;
  // directory size
  let dirSize = 0;
  const recs = entries.map((e) => {
    const pb = Buffer.from(e.path, 'utf8');
    const plen = pad4(pb.length);
    dirSize += 4 + plen + 8 + 8 + 16;
    return { pb, plen, size: e.size, srcOff: e.off };
  });
  const HEADER = 4 + 4 + 12 + 64 + 4;            // GDPC, fmt, ver(3), reserved(16), count
  const dataStart = HEADER + dirSize;
  const totalData = recs.reduce((s, r) => s + r.size, 0);
  const out = Buffer.alloc(dataStart + totalData);
  let o = 0;
  out.write('GDPC', o, 'ascii'); o += 4;
  out.writeUInt32LE(1, o); o += 4;               // format 1
  out.writeUInt32LE(3, o); o += 4;               // engine major
  out.writeUInt32LE(5, o); o += 4;               // minor
  out.writeUInt32LE(0, o); o += 4;               // rev
  o += 64;                                       // reserved (zeros)
  out.writeUInt32LE(recs.length, o); o += 4;
  // directory + data
  let dataOff = dataStart;
  for (const r of recs) {
    out.writeUInt32LE(r.plen, o); o += 4;
    r.pb.copy(out, o); o += r.plen;              // path (null-padded via alloc zeros)
    out.writeBigUInt64LE(BigInt(dataOff), o); o += 8;
    out.writeBigUInt64LE(BigInt(r.size), o); o += 8;
    o += 16;                                     // md5 (zeros — the baker doesn't check)
    srcBuf.copy(out, dataOff, r.srcOff, r.srcOff + r.size);
    dataOff += r.size;
  }
  fs.writeFileSync(outPath, out);
}

function splitOne(file) {
  const buf = fs.readFileSync(file);
  const { files } = parse(buf);
  const meta = files.find((f) => /pack\.json$/i.test(f.path));
  const rest = files.filter((f) => f !== meta);
  // greedily bin `rest` into chunks under MAX (reserve room for meta + directory)
  const budget = MAX - (meta ? meta.size : 0) - 256 * 1024;
  const chunks = [[]]; let cur = 0;
  for (const f of rest) {
    if (chunks[cur].reduce((s, x) => s + x.size, 0) + f.size > budget && chunks[cur].length) {
      chunks.push([]); cur++;
    }
    chunks[cur].push(f);
  }
  const base = path.basename(file).replace(/\.dungeondraft_pack$/i, '');
  fs.mkdirSync(OUT, { recursive: true });
  chunks.forEach((chunk, i) => {
    const entries = meta ? [meta, ...chunk] : chunk;
    const outPath = path.join(OUT, `${base}_part${i + 1}.dungeondraft_pack`);
    writePCK(outPath, entries, buf);
    const mb = (fs.statSync(outPath).size / 1024 / 1024).toFixed(0);
    console.log(`  ${path.basename(outPath)}  (${chunk.length} files, ${mb} MB)`);
  });
  return chunks.length;
}

function main() {
  const all = fs.readdirSync(IN).filter((f) => /\.dungeondraft_pack$/i.test(f));
  const big = all.filter((f) => fs.statSync(path.join(IN, f)).size > MAX);
  if (!big.length) {
    console.log(`No packs over ${(MAX / 1024 / 1024).toFixed(0)} MB in ${IN}.`);
    return;
  }
  console.log(`Splitting ${big.length} pack(s) over ${(MAX / 1024 / 1024).toFixed(0)} MB into ${OUT}\n`);
  for (const f of big) {
    console.log(path.basename(f) + ':');
    splitOne(path.join(IN, f));
  }
  console.log('\nDone. The _part files are in:', OUT);
}
main();
