#!/usr/bin/env node
/*
 * Notify IndexNow (Bing, Yandex, Seznam, Naver...) of the URLs in sitemap.xml.
 * Zero dependencies (Node 18+ for fetch). Run from the repo root AFTER a deploy:
 *
 *   node scripts/indexnow.mjs              # submit every sitemap URL
 *   node scripts/indexnow.mjs --dry-run    # print the payload, send nothing
 *   node scripts/indexnow.mjs /contacto /  # submit only these paths
 *
 * The key file (<key>.txt at the site root, containing only the key) must be
 * live at https://bcnproreforma.com/<key>.txt before submitting.
 */
import {readdirSync, readFileSync} from 'node:fs';
import {join} from 'node:path';

const ROOT = process.cwd();
const HOST = 'bcnproreforma.com';
const SITE = `https://${HOST}`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const keyFile = readdirSync(ROOT).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) {
  console.error('No IndexNow key file (<32 hex>.txt) at the repo root.');
  process.exit(1);
}
const key = readFileSync(join(ROOT, keyFile), 'utf8').trim();
if (`${key}.txt` !== keyFile) {
  console.error(`${keyFile} must contain exactly its own name without .txt`);
  process.exit(1);
}

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const paths = args.filter((a) => a.startsWith('/'));
const sitemap = readFileSync(join(ROOT, 'sitemap.xml'), 'utf8');
const urlList = paths.length
  ? paths.map((p) => SITE + (p === '/' ? '/' : p.replace(/\/$/, '')))
  : [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => u.startsWith(SITE));

if (!urlList.length) {
  console.error('No URLs to submit.');
  process.exit(1);
}

const body = {host: HOST, key, keyLocation: `${SITE}/${keyFile}`, urlList};
if (dryRun) {
  console.log(JSON.stringify(body, null, 2));
  process.exit(0);
}

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: {'Content-Type': 'application/json; charset=utf-8'},
  body: JSON.stringify(body),
});
// 200 OK and 202 Accepted both mean the submission was received.
console.log(`IndexNow: ${res.status} ${res.statusText} · ${urlList.length} URLs`);
if (res.status !== 200 && res.status !== 202) {
  console.log(await res.text());
  process.exit(1);
}
