import { createHash, createHmac } from "node:crypto";

// ─────────────────────────────────────────────────────────────────────────────
// A small S3 client for the Railway Storage Bucket (S3-compatible), written
// against the AWS Signature V4 spec so the app needs no SDK dependency.
// It does exactly what the Sound Library needs: list, put, delete, and
// presigned GET links (the browser streams the file straight from the bucket —
// bucket egress is free, service egress isn't).
//
// Configuration comes from the bucket's credentials, added to the web service's
// Variables in Railway (Bucket → Credentials, or "Add variable reference"). Any
// of these names work, so whatever the bucket hands out can be used as-is:
//   bucket      SOUNDS_BUCKET | BUCKET | BUCKET_NAME | S3_BUCKET | AWS_S3_BUCKET_NAME
//   endpoint    SOUNDS_BUCKET_ENDPOINT | ENDPOINT | BUCKET_ENDPOINT | S3_ENDPOINT |
//               AWS_ENDPOINT_URL_S3 | AWS_ENDPOINT_URL      (e.g. https://t3.storageapi.dev)
//   key id      ACCESS_KEY_ID | BUCKET_ACCESS_KEY_ID | AWS_ACCESS_KEY_ID
//   secret      SECRET_ACCESS_KEY | BUCKET_SECRET_ACCESS_KEY | AWS_SECRET_ACCESS_KEY
//   region      REGION | BUCKET_REGION | AWS_REGION | AWS_DEFAULT_REGION   (default "auto")
//   path style  S3_FORCE_PATH_STYLE=1 (older buckets want https://host/bucket/key
//               instead of https://bucket.host/key)
// ─────────────────────────────────────────────────────────────────────────────

export type BucketConfig = {
  bucket: string;
  endpoint: URL;
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  pathStyle: boolean;
};

const pick = (...names: string[]) => {
  for (const n of names) {
    const v = process.env[n]?.trim();
    if (v) return v;
  }
  return "";
};

export function bucketConfig(): BucketConfig | null {
  const bucket = pick("SOUNDS_BUCKET", "BUCKET", "BUCKET_NAME", "S3_BUCKET", "AWS_S3_BUCKET_NAME");
  let endpoint = pick("SOUNDS_BUCKET_ENDPOINT", "ENDPOINT", "BUCKET_ENDPOINT", "S3_ENDPOINT", "AWS_ENDPOINT_URL_S3", "AWS_ENDPOINT_URL");
  const accessKeyId = pick("ACCESS_KEY_ID", "BUCKET_ACCESS_KEY_ID", "AWS_ACCESS_KEY_ID");
  const secretAccessKey = pick("SECRET_ACCESS_KEY", "BUCKET_SECRET_ACCESS_KEY", "AWS_SECRET_ACCESS_KEY");
  if (!bucket || !endpoint || !accessKeyId || !secretAccessKey) return null;
  if (!/^https?:\/\//i.test(endpoint)) endpoint = "https://" + endpoint;
  let url: URL;
  try { url = new URL(endpoint); } catch { return null; }
  const region = pick("REGION", "BUCKET_REGION", "AWS_REGION", "AWS_DEFAULT_REGION") || "auto";
  const pathStyle = /^(1|true|yes)$/i.test(pick("S3_FORCE_PATH_STYLE", "SOUNDS_BUCKET_PATH_STYLE"));
  return { bucket, endpoint: url, accessKeyId, secretAccessKey, region, pathStyle };
}

// RFC 3986 encoding as SigV4 wants it (everything but unreserved characters).
function enc(s: string): string {
  return encodeURIComponent(s).replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());
}
const encKey = (key: string) => key.split("/").map(enc).join("/");
const sha256hex = (s: string | Buffer) => createHash("sha256").update(s).digest("hex");
const hmac = (k: Buffer | string, s: string) => createHmac("sha256", k).update(s).digest();

function target(cfg: BucketConfig, key: string): { host: string; path: string; origin: string } {
  const ep = cfg.endpoint;
  const basePath = ep.pathname.replace(/\/+$/, "");
  const objPath = key ? "/" + encKey(key) : "/";
  if (cfg.pathStyle) {
    return { host: ep.host, path: `${basePath}/${enc(cfg.bucket)}${key ? objPath : "/"}`, origin: `${ep.protocol}//${ep.host}` };
  }
  const host = `${cfg.bucket}.${ep.host}`;
  return { host, path: `${basePath}${objPath}`, origin: `${ep.protocol}//${host}` };
}

function stamp(d = new Date()) {
  const iso = d.toISOString().replace(/[:-]|\.\d{3}/g, ""); // 20261016T224400Z
  return { amz: iso, day: iso.slice(0, 8) };
}

function signingKey(cfg: BucketConfig, day: string): Buffer {
  return hmac(hmac(hmac(hmac("AWS4" + cfg.secretAccessKey, day), cfg.region), "s3"), "aws4_request");
}

const canonicalQuery = (q: Record<string, string>) =>
  Object.keys(q)
    .sort()
    .map((k) => `${enc(k)}=${enc(q[k])}`)
    .join("&");

/** A presigned URL for `method` on `key`, valid for `expires` seconds. */
export function presign(cfg: BucketConfig, method: "GET" | "PUT" | "HEAD", key: string, expires: number, extra: Record<string, string> = {}): string {
  const { host, path, origin } = target(cfg, key);
  const { amz, day } = stamp();
  const scope = `${day}/${cfg.region}/s3/aws4_request`;
  const q: Record<string, string> = {
    ...extra,
    "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
    "X-Amz-Credential": `${cfg.accessKeyId}/${scope}`,
    "X-Amz-Date": amz,
    "X-Amz-Expires": String(Math.max(1, Math.min(604800, Math.floor(expires)))),
    "X-Amz-SignedHeaders": "host",
  };
  const cq = canonicalQuery(q);
  const creq = [method, path, cq, `host:${host}\n`, "host", "UNSIGNED-PAYLOAD"].join("\n");
  const sts = ["AWS4-HMAC-SHA256", amz, scope, sha256hex(creq)].join("\n");
  const sig = createHmac("sha256", signingKey(cfg, day)).update(sts).digest("hex");
  return `${origin}${path}?${cq}&X-Amz-Signature=${sig}`;
}

/** A signed request (Authorization header) — list / put / delete. */
async function signedFetch(
  cfg: BucketConfig,
  method: string,
  key: string,
  query: Record<string, string> = {},
  body?: Buffer,
  headers: Record<string, string> = {},
): Promise<Response> {
  const { host, path, origin } = target(cfg, key);
  const { amz, day } = stamp();
  const scope = `${day}/${cfg.region}/s3/aws4_request`;
  const payloadHash = body ? sha256hex(body) : sha256hex("");
  const h: Record<string, string> = { ...Object.fromEntries(Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v.trim()])), host, "x-amz-content-sha256": payloadHash, "x-amz-date": amz };
  const names = Object.keys(h).sort();
  const cq = canonicalQuery(query);
  const creq = [method, path, cq, names.map((n) => `${n}:${h[n]}\n`).join(""), names.join(";"), payloadHash].join("\n");
  const sts = ["AWS4-HMAC-SHA256", amz, scope, sha256hex(creq)].join("\n");
  const sig = createHmac("sha256", signingKey(cfg, day)).update(sts).digest("hex");
  const auth = `AWS4-HMAC-SHA256 Credential=${cfg.accessKeyId}/${scope}, SignedHeaders=${names.join(";")}, Signature=${sig}`;
  const send: Record<string, string> = { ...h, authorization: auth };
  delete send.host;
  return fetch(`${origin}${path}${cq ? "?" + cq : ""}`, { method, headers: send, body: body ? new Uint8Array(body) : undefined });
}

async function bucketError(res: Response, what: string): Promise<Error> {
  const text = await res.text().catch(() => "");
  const code = /<Code>([^<]+)<\/Code>/.exec(text)?.[1];
  const msg = /<Message>([^<]+)<\/Message>/.exec(text)?.[1];
  return new Error(`${what} failed (${res.status}${code ? " " + code : ""}${msg ? ": " + msg : ""})`);
}

const unxml = (s: string) =>
  s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n)).replace(/&amp;/g, "&");

export type BucketObject = { key: string; size: number; modified: string };

/** Every object under `prefix` (follows continuation tokens). */
export async function listObjects(cfg: BucketConfig, prefix: string): Promise<BucketObject[]> {
  const out: BucketObject[] = [];
  let token = "";
  for (let page = 0; page < 200; page++) {
    const q: Record<string, string> = { "list-type": "2", prefix, "max-keys": "1000" };
    if (token) q["continuation-token"] = token;
    const res = await signedFetch(cfg, "GET", "", q);
    if (!res.ok) throw await bucketError(res, "Listing the bucket");
    const xml = await res.text();
    for (const m of xml.matchAll(/<Contents>([\s\S]*?)<\/Contents>/g)) {
      const c = m[1];
      const key = unxml(/<Key>([\s\S]*?)<\/Key>/.exec(c)?.[1] ?? "");
      if (!key) continue;
      out.push({ key, size: +(/<Size>(\d+)<\/Size>/.exec(c)?.[1] ?? 0), modified: /<LastModified>([^<]+)<\/LastModified>/.exec(c)?.[1] ?? "" });
    }
    const truncated = /<IsTruncated>true<\/IsTruncated>/.test(xml);
    token = unxml(/<NextContinuationToken>([\s\S]*?)<\/NextContinuationToken>/.exec(xml)?.[1] ?? "");
    if (!truncated || !token) break;
  }
  return out;
}

export async function putObject(cfg: BucketConfig, key: string, body: Buffer, contentType: string): Promise<void> {
  const res = await signedFetch(cfg, "PUT", key, {}, body, { "content-type": contentType });
  if (!res.ok) throw await bucketError(res, "Uploading");
  await res.arrayBuffer().catch(() => null);
}

export async function deleteObject(cfg: BucketConfig, key: string): Promise<void> {
  const res = await signedFetch(cfg, "DELETE", key);
  if (!res.ok && res.status !== 404) throw await bucketError(res, "Deleting");
  await res.arrayBuffer().catch(() => null);
}
